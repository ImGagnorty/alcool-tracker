import { useEffect, useState } from 'react';
import { consumptionService, Consumption } from '../services/consumptionService';
import { format } from 'date-fns';
import './ConsumptionHistory.css';

export default function ConsumptionHistory() {
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsumptions();
  }, []);

  const loadConsumptions = async () => {
    try {
      const data = await consumptionService.getAll({ limit: 100 });
      setConsumptions(data.consumptions || []);
    } catch (error) {
      console.error('Error loading consumptions:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="history-loading">Chargement de l'historique...</div>;
  }

  // Group by date
  const groupedByDate: Record<string, Consumption[]> = {};
  consumptions.forEach(consumption => {
    const dateKey = format(new Date(consumption.date), 'yyyy-MM-dd');
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }
    groupedByDate[dateKey].push(consumption);
  });

  return (
    <div className="history">
      <div className="history-header">
        <h1>Historique des Consommations</h1>
        <p>{consumptions.length} consommation(s) enregistrée(s)</p>
      </div>

      {consumptions.length === 0 ? (
        <div className="empty-history">
          <p>Vous n'avez pas encore enregistré de consommation.</p>
          <p>Commencez par ajouter une consommation depuis le catalogue !</p>
        </div>
      ) : (
        <div className="history-list">
          {Object.entries(groupedByDate)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([date, items]) => (
              <div key={date} className="history-day">
                <div className="day-header">
                  <h2>{format(new Date(date), 'EEEE d MMMM yyyy')}</h2>
                  <span className="day-count">{items.length} consommation(s)</span>
                </div>
                <div className="day-items">
                  {items.map((consumption) => (
                    <div key={consumption.id} className="history-item">
                      <div className="item-icon">🍺</div>
                      <div className="item-content">
                        <div className="item-name">
                          {consumption.alcohol?.name || 'Alcool inconnu'}
                        </div>
                        <div className="item-details">
                          {consumption.quantity} verre(s) • {consumption.alcohol?.alcoholRate}% d'alcool
                          {consumption.alcohol?.volume && ` • ${consumption.alcohol.volume} mL`}
                        </div>
                        <div className="item-time">
                          {format(new Date(consumption.date), 'HH:mm')}
                        </div>
                        {consumption.notes && (
                          <div className="item-notes">{consumption.notes}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

