import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PWAInstallPrompt from './PWAInstallPrompt';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Accueil', icon: '🏠', shortLabel: 'Accueil' },
    { path: '/catalogue', label: 'Catalogue', icon: '🍺', shortLabel: 'Catalogue' },
    { path: '/leaderboard', label: 'Classement', icon: '🏆', shortLabel: 'Classement' },
    { path: '/clans', label: 'Clans', icon: '👥', shortLabel: 'Clans' },
    { path: '/statistics', label: 'Statistiques', icon: '📈', shortLabel: 'Stats' },
    { path: '/profile', label: 'Profil', icon: '👤', shortLabel: 'Profil' }
  ];

  return (
    <div className="layout">
      {/* Header Desktop */}
      <header className="header desktop-header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/" className="logo">
              <span className="logo-icon">🍷</span>
              <span className="logo-text">AlcoolTracker</span>
            </Link>
          </div>
          
          <nav className="header-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="header-right">
            {user?.isPremium && (
              <span className="premium-badge">
                <span className="premium-icon">⭐</span>
                <span className="premium-text">Premium</span>
              </span>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Header Mobile */}
      <header className="header mobile-header">
        <div className="mobile-header-container">
          <Link to="/" className="mobile-logo">
            <span className="logo-icon">🍷</span>
            <span className="logo-text">AlcoolTracker</span>
          </Link>
        </div>
      </header>

      {/* Bottom Navigation Mobile */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.shortLabel}</span>
          </Link>
        ))}
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <PWAInstallPrompt />
    </div>
  );
}
