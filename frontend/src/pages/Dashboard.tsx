import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { statisticsService, Statistics, MostConsumedAlcohol } from '../services/statisticsService';
import { consumptionService } from '../services/consumptionService';
import { favoriteService } from '../services/favoriteService';
import { Alcohol } from '../services/alcoholService';
import { getFormatsForType } from '../utils/alcoholFormats';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [recentConsumptions, setRecentConsumptions] = useState<any[]>([]);
  const [mostConsumed, setMostConsumed] = useState<MostConsumedAlcohol[]>([]);
  const [favoriteBeers, setFavoriteBeers] = useState<Alcohol[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickAdding, setQuickAdding] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, consumptionsData, mostConsumedData, favoritesData] = await Promise.all([
        statisticsService.getStatistics('month'),
        consumptionService.getAll({ limit: 5 }),
        statisticsService.getMostConsumed(2),
        favoriteService.getAll()
      ]);
      setStats(statsData);
      setRecentConsumptions(consumptionsData.consumptions || []);
      setMostConsumed(mostConsumedData);
      
      // Get favorite beers (limit 2)
      const favoriteBeers = favoritesData
        .filter(f => f.alcohol && f.alcohol.type === 'BEER')
        .slice(0, 2)
        .map(f => f.alcohol);
      
      setFavoriteBeers(favoriteBeers);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = async (alcohol: MostConsumedAlcohol) => {
    setQuickAdding(alcohol.id);
    try {
      const formats = getFormatsForType(alcohol.type);
      if (formats.length > 0) {
        await consumptionService.create({
          alcoholId: alcohol.id,
          quantity: 1,
          volumeConsumed: formats[0].volume,
          format: formats[0].name
        });
        setToast({ message: `${alcohol.name} ajouté !`, type: 'success' });
        // Recharger les données
        loadData();
      }
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
    } finally {
      setQuickAdding(null);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner size="lg" text="Chargement de votre tableau de bord..." />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bienvenue{user?.name ? `, ${user.name}` : ''} !</h1>
        <p className="dashboard-subtitle">Votre tableau de bord de consommation</p>
      </div>

      {favoriteBeers.length > 0 && (
        <div className="quick-access-section">
          <h2 className="section-title">⭐ Bières favorites</h2>
          <p className="section-subtitle">Vos bières préférées</p>
          <div className="quick-access-grid">
            {favoriteBeers.map((beer) => (
              <div key={beer.id} className="quick-access-card">
                <div className="quick-access-header">
                  <div className="quick-access-info">
                    <h3>{beer.name}</h3>
                    <span className="quick-access-brand">{beer.brand}</span>
                  </div>
                  <span className="quick-access-badge">⭐</span>
                </div>
                <div className="quick-access-stats">
                  <div className="quick-stat">
                    <span className="quick-stat-label">Alcool</span>
                    <span className="quick-stat-value">{beer.alcoholRate}%</span>
                  </div>
                  {beer.price && (
                    <div className="quick-stat">
                      <span className="quick-stat-label">Prix</span>
                      <span className="quick-stat-value">{beer.price.toFixed(2)} €</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={async () => {
                    setQuickAdding(beer.id);
                    try {
                      const formats = getFormatsForType(beer.type);
                      if (formats.length > 0) {
                        await consumptionService.create({
                          alcoholId: beer.id,
                          quantity: 1,
                          volumeConsumed: formats[0].volume,
                          format: formats[0].name
                        });
                        setToast({ message: `${beer.name} ajouté !`, type: 'success' });
                        loadData();
                      }
                    } catch (error: any) {
                      setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
                    } finally {
                      setQuickAdding(null);
                    }
                  }}
                  className="quick-add-button"
                  disabled={quickAdding === beer.id}
                >
                  {quickAdding === beer.id ? (
                    <>⏳ Ajout...</>
                  ) : (
                    <>⚡ Ajouter maintenant</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {mostConsumed.length > 0 && (
        <div className="quick-access-section">
          <h2 className="section-title">⚡ Accès rapide</h2>
          <p className="section-subtitle">Vos alcools les plus consommés</p>
          <div className="quick-access-grid">
            {mostConsumed.map((alcohol) => (
              <div key={alcohol.id} className="quick-access-card">
                <div className="quick-access-header">
                  <div className="quick-access-info">
                    <h3>{alcohol.name}</h3>
                    <span className="quick-access-brand">{alcohol.brand}</span>
                  </div>
                  <span className="quick-access-badge">{alcohol.consumptionCount}x</span>
                </div>
                <div className="quick-access-stats">
                  <div className="quick-stat">
                    <span className="quick-stat-label">Alcool</span>
                    <span className="quick-stat-value">{alcohol.alcoholRate}%</span>
                  </div>
                  {alcohol.price && (
                    <div className="quick-stat">
                      <span className="quick-stat-label">Prix</span>
                      <span className="quick-stat-value">{alcohol.price.toFixed(2)} €</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleQuickAdd(alcohol)}
                  className="quick-add-button"
                  disabled={quickAdding === alcohol.id}
                >
                  {quickAdding === alcohol.id ? (
                    <>⏳ Ajout...</>
                  ) : (
                    <>⚡ Ajouter maintenant</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🍺</div>
            <div className="stat-content">
              <div className="stat-value">{stats.summary.totalConsumptions}</div>
              <div className="stat-label">Consommations ce mois</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.summary.standardDrinks.toFixed(1)}</div>
              <div className="stat-label">Verres standards</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-content">
              <div className="stat-value">{stats.summary.totalVolumeLiters.toFixed(2)} L</div>
              <div className="stat-label">Volume total</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-value">{stats.summary.totalSpent.toFixed(2)} €</div>
              <div className="stat-label">Dépensé</div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <Link to="/catalogue" className="action-card">
          <div className="action-icon">➕</div>
          <div className="action-content">
            <h3>Ajouter une consommation</h3>
            <p>Enregistrer un nouveau verre</p>
          </div>
        </Link>

        <Link to="/statistics" className="action-card">
          <div className="action-icon">📈</div>
          <div className="action-content">
            <h3>Voir les statistiques</h3>
            <p>Analyse détaillée de votre consommation</p>
          </div>
        </Link>
      </div>

      {stats && (
        <div className="health-alert">
          <div className={`health-badge ${stats.health.riskLevel}`}>
            {stats.health.riskLevel === 'low' && '✅ Faible risque'}
            {stats.health.riskLevel === 'moderate' && '⚠️ Risque modéré'}
            {stats.health.riskLevel === 'high' && '🔴 Risque élevé'}
          </div>
          <p>
            Consommation moyenne hebdomadaire : {stats.health.weeklyAverage.toFixed(1)} verres standards
          </p>
        </div>
      )}

      {recentConsumptions.length > 0 && (
        <div className="recent-section">
          <h2>Consommations récentes</h2>
          <div className="recent-list">
            {recentConsumptions.map((consumption) => (
              <div key={consumption.id} className="recent-item">
                <div className="recent-icon">🍺</div>
                <div className="recent-content">
                  <div className="recent-name">
                    {consumption.alcohol?.name || 'Alcool inconnu'}
                  </div>
                  <div className="recent-meta">
                    {consumption.quantity} verre(s) • {format(new Date(consumption.date), 'd MMM yyyy à HH:mm')}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/history" className="view-all-link">
            Voir tout l'historique →
          </Link>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

