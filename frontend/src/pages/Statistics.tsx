import { useEffect, useState } from 'react';
import { statisticsService, Statistics as StatisticsType } from '../services/statisticsService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import './Statistics.css';

export default function Statistics() {
  const [stats7d, setStats7d] = useState<StatisticsType | null>(null);
  const [stats1m, setStats1m] = useState<StatisticsType | null>(null);
  const [stats1y, setStats1y] = useState<StatisticsType | null>(null);
  const [timeline7d, setTimeline7d] = useState<any>(null);
  const [timeline1m, setTimeline1m] = useState<any>(null);
  const [timeline1y, setTimeline1y] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState<'7d' | '1m' | '1y'>('1m');

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const [stats7dData, stats1mData, stats1yData, timeline7dData, timeline1mData, timeline1yData] = await Promise.all([
        statisticsService.getStatistics('week'),
        statisticsService.getStatistics('month'),
        statisticsService.getStatistics('year'),
        statisticsService.getTimeline('week', 'day'),
        statisticsService.getTimeline('month', 'day'),
        statisticsService.getTimeline('year', 'month')
      ]);
      setStats7d(stats7dData);
      setStats1m(stats1mData);
      setStats1y(stats1yData);
      setTimeline7d(timeline7dData);
      setTimeline1m(timeline1mData);
      setTimeline1y(timeline1yData);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentStats = activePeriod === '7d' ? stats7d : activePeriod === '1m' ? stats1m : stats1y;
  const currentTimeline = activePeriod === '7d' ? timeline7d : activePeriod === '1m' ? timeline1m : timeline1y;

  if (loading) {
    return (
      <div className="statistics-loading">
        <LoadingSpinner size="lg" text="Chargement des statistiques..." />
      </div>
    );
  }

  if (!currentStats) {
    return <div className="statistics-error">Erreur lors du chargement des statistiques</div>;
  }

  // Get total sugar from stats
  const totalSugar = currentStats.summary.totalSugarGrams || 0;

  // Prepare chart data
  const chartData = currentTimeline?.timeline?.map((item: any) => ({
    date: formatDate(item.date, activePeriod),
    volume: Math.round(item.volume / 1000 * 10) / 10, // Convert to L
    alcohol: Math.round(item.alcohol * 10) / 10, // g
    spent: Math.round((item.volume / 1000) * 2 * 10) / 10 // Rough estimate
  })) || [];

  return (
    <div className="statistics">
      <div className="stats-header">
        <h1>📊 Statistiques</h1>
        <p>Vue d'ensemble de votre consommation</p>
      </div>

      <div className="period-tabs">
        <button
          className={activePeriod === '7d' ? 'active' : ''}
          onClick={() => setActivePeriod('7d')}
        >
          7 jours
        </button>
        <button
          className={activePeriod === '1m' ? 'active' : ''}
          onClick={() => setActivePeriod('1m')}
        >
          1 mois
        </button>
        <button
          className={activePeriod === '1y' ? 'active' : ''}
          onClick={() => setActivePeriod('1y')}
        >
          1 an
        </button>
      </div>

      <div className="stats-totals">
        <div className="total-card">
          <div className="total-icon">💧</div>
          <div className="total-content">
            <div className="total-value">{currentStats.summary.totalVolumeLiters.toFixed(2)}</div>
            <div className="total-label">Litres</div>
          </div>
        </div>

        <div className="total-card">
          <div className="total-icon">🍺</div>
          <div className="total-content">
            <div className="total-value">{currentStats.summary.totalAlcoholGrams?.toFixed(1) || '0'}</div>
            <div className="total-label">Grammes d'alcool</div>
          </div>
        </div>

        <div className="total-card">
          <div className="total-icon">💰</div>
          <div className="total-content">
            <div className="total-value">{currentStats.summary.totalSpent.toFixed(2)}</div>
            <div className="total-label">Euros</div>
          </div>
        </div>

        <div className="total-card">
          <div className="total-icon">🍬</div>
          <div className="total-content">
            <div className="total-value">{totalSugar.toFixed(1)}</div>
            <div className="total-label">Grammes de sucre</div>
          </div>
        </div>

        <div className="total-card">
          <div className="total-icon">🍺</div>
          <div className="total-content">
            <div className="total-value">{currentStats.summary.totalConsumptions}</div>
            <div className="total-label">Consommations</div>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="chart-section">
          <h2>Évolution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--text-secondary)"
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  stroke="var(--text-secondary)"
                  style={{ fontSize: '0.75rem' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--text)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#6366f1" 
                  name="Volume (L)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="alcohol" 
                  stroke="#10b981" 
                  name="Alcool (g)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="spent" 
                  stroke="#f59e0b" 
                  name="Dépensé (€)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="chart-section">
          <h2>Répartition</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--text-secondary)"
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  stroke="var(--text-secondary)"
                  style={{ fontSize: '0.75rem' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--text)'
                  }}
                />
                <Legend />
                <Bar dataKey="volume" fill="#6366f1" name="Volume (L)" />
                <Bar dataKey="alcohol" fill="#10b981" name="Alcool (g)" />
                <Bar dataKey="spent" fill="#f59e0b" name="Dépensé (€)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string, period: '7d' | '1m' | '1y'): string {
  const date = new Date(dateStr);
  if (period === '7d' || period === '1m') {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  } else {
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  }
}
