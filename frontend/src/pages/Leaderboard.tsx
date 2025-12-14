import { useEffect, useState } from 'react';
import { leaderboardService, LeaderboardResponse, ClanLeaderboardResponse, LeaderboardEntry, ClanLeaderboardEntry } from '../services/leaderboardService';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import './Leaderboard.css';

export default function Leaderboard() {
  const { user } = useAuthStore();
  const [mode, setMode] = useState<'solo' | 'clans'>('solo');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [type, setType] = useState<'volume' | 'spent' | 'consumptions'>('volume');
  const [soloLeaderboard, setSoloLeaderboard] = useState<LeaderboardResponse | null>(null);
  const [clanLeaderboard, setClanLeaderboard] = useState<ClanLeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  useEffect(() => {
    loadLeaderboard();
  }, [mode, period, type]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      if (mode === 'solo') {
        const data = await leaderboardService.getLeaderboard(period, type);
        setSoloLeaderboard(data);
      } else {
        const data = await leaderboardService.getClansLeaderboard(period, type);
        setClanLeaderboard(data);
      }
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur lors du chargement', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case 'volume':
        return `${(value / 1000).toFixed(2)} L`;
      case 'spent':
        return `${value.toFixed(2)} €`;
      case 'consumptions':
        return `${value.toFixed(0)}`;
      default:
        return value.toString();
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'volume':
        return 'Volume (L)';
      case 'spent':
        return 'Dépensé (€)';
      case 'consumptions':
        return 'Consommations';
      default:
        return type;
    }
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'week':
        return 'Semaine';
      case 'month':
        return 'Mois';
      case 'year':
        return 'Année';
      default:
        return period;
    }
  };

  const leaderboard: (LeaderboardEntry | ClanLeaderboardEntry)[] | undefined = mode === 'solo' ? soloLeaderboard?.leaderboard : clanLeaderboard?.leaderboard;

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>🏆 Classement</h1>
        <p>Comparez vos performances avec les autres utilisateurs</p>
      </div>

      <div className="leaderboard-controls">
        <div className="mode-toggle">
          <button
            className={mode === 'solo' ? 'active' : ''}
            onClick={() => setMode('solo')}
          >
            👤 Solo
          </button>
          <button
            className={mode === 'clans' ? 'active' : ''}
            onClick={() => setMode('clans')}
          >
            👥 Clans
          </button>
        </div>

        <div className="filters">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'week' | 'month' | 'year')}
            className="filter-select"
          >
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="year">Année</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'volume' | 'spent' | 'consumptions')}
            className="filter-select"
          >
            <option value="volume">Volume</option>
            <option value="spent">Dépensé</option>
            <option value="consumptions">Consommations</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" text="Chargement du classement..." />
      ) : (
        <div className="leaderboard-content">
          <div className="leaderboard-info">
            <span>Période : {getPeriodLabel(period)}</span>
            <span>Type : {getTypeLabel(type)}</span>
          </div>

          <div className="leaderboard-list">
            {leaderboard && leaderboard.length > 0 ? (
              leaderboard.map((entry: LeaderboardEntry | ClanLeaderboardEntry, index: number) => {
                if (mode === 'clans') {
                  const clanEntry = entry as any;
                  return (
                    <div
                      key={clanEntry.clanId}
                      className="leaderboard-entry"
                    >
                      <div className="rank">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `#${index + 1}`}
                      </div>
                      <div className="user-info">
                        <div className="user-name">
                          👥 {clanEntry.clanName}
                        </div>
                      </div>
                      <div className="user-stats">
                        <div className="stat-value">
                          {formatValue(
                            type === 'volume' ? clanEntry.volume : type === 'spent' ? clanEntry.spent : clanEntry.consumptions,
                            type
                          )}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  const soloEntry = entry as any;
                  const isCurrentUser = soloEntry.userId === user?.id;
                  return (
                    <div
                      key={soloEntry.userId}
                      className={`leaderboard-entry ${isCurrentUser ? 'current-user' : ''}`}
                    >
                      <div className="rank">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `#${index + 1}`}
                      </div>
                      <div className="user-info">
                        <div className="user-name">
                          {soloEntry.name || 'Anonyme'}
                          {isCurrentUser && <span className="you-badge">Vous</span>}
                        </div>
                      </div>
                      <div className="user-stats">
                        <div className="stat-value">
                          {formatValue(
                            type === 'volume' ? soloEntry.volume : type === 'spent' ? soloEntry.spent : soloEntry.consumptions,
                            type
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div className="empty-leaderboard">
                <p>Aucun résultat pour cette période</p>
              </div>
            )}
          </div>
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

