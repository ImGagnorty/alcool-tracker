import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [blurUsername, setBlurUsername] = useState(user?.blurUsername || false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBlurUsername(user.blurUsername || false);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.put('/auth/me', {
        name,
        blurUsername
      });
      const updatedUser = response.data;
      updateUser(updatedUser);
      setMessage('Profil mis à jour avec succès');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordMessage('Les mots de passe ne correspondent pas');
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage('Le mot de passe doit contenir au moins 6 caractères');
      setPasswordLoading(false);
      return;
    }

    try {
      await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setPasswordMessage('Mot de passe changé avec succès');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordMessage(error.response?.data?.error || 'Erreur lors du changement de mot de passe');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Mon Profil</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Informations personnelles</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user.email} disabled />
              <small>L'email ne peut pas être modifié</small>
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group toggle-group">
              <div className="toggle-container">
                <div className="toggle-content">
                  <div className="toggle-header">
                    <span className="toggle-text">Flouter mon pseudo dans les classements</span>
                    <label className="toggle-switch-wrapper">
                      <input
                        type="checkbox"
                        className="toggle-switch-input"
                        checked={blurUsername}
                        onChange={(e) => setBlurUsername(e.target.checked)}
                        disabled={loading}
                      />
                      <span className="toggle-switch-slider"></span>
                    </label>
                  </div>
                  <small className="toggle-help">Votre nom apparaîtra flouté dans les classements publics</small>
                </div>
              </div>
            </div>
            {message && (
              <div className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </form>
        </div>

        <div className="profile-card">
          <h2>Changer le mot de passe</h2>
          <form onSubmit={handleChangePassword} className="password-form">
            <div className="form-group">
              <label>Mot de passe actuel</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={passwordLoading}
                required
              />
            </div>
            <div className="form-group">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={passwordLoading}
                required
                minLength={6}
              />
              <small>Minimum 6 caractères</small>
            </div>
            <div className="form-group">
              <label>Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={passwordLoading}
                required
              />
            </div>
            {passwordMessage && (
              <div className={`message ${passwordMessage.includes('succès') ? 'success' : 'error'}`}>
                {passwordMessage}
              </div>
            )}
            <button type="submit" disabled={passwordLoading} className="submit-btn">
              {passwordLoading ? 'Changement...' : 'Changer le mot de passe'}
            </button>
          </form>
        </div>

        <div className="profile-card">
          <h2>Historique des consommations</h2>
          <div className="history-section">
            <p className="history-description">
              Consultez l'historique complet de toutes vos consommations enregistrées.
            </p>
            <Link to="/history" className="history-link">
              Voir l'historique →
            </Link>
          </div>
        </div>

        <div className="profile-card">
          <h2>Abonnement</h2>
          {user.isPremium ? (
            <div className="premium-status">
              <div className="premium-badge-large">⭐ Premium</div>
              <p>Vous bénéficiez de toutes les fonctionnalités Premium !</p>
              {user.premiumUntil && (
                <p className="premium-date">
                  Valide jusqu'au {new Date(user.premiumUntil).toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>
          ) : (
            <div className="free-status">
              <p>Vous utilisez la version gratuite.</p>
              <Link to="/premium" className="upgrade-btn">
                Passer à Premium →
              </Link>
            </div>
          )}
        </div>

        <div className="profile-card">
          <h2>Fonctionnalités Premium</h2>
          <ul className="features-list">
            <li className={user.isPremium ? 'enabled' : 'disabled'}>
              <span className="feature-icon">{user.isPremium ? '✅' : '❌'}</span>
              <span>Ajout de photos pour les consommations</span>
            </li>
            <li className={user.isPremium ? 'enabled' : 'disabled'}>
              <span className="feature-icon">{user.isPremium ? '✅' : '❌'}</span>
              <span>Carte des bars avec localisation</span>
            </li>
            <li className={user.isPremium ? 'enabled' : 'disabled'}>
              <span className="feature-icon">{user.isPremium ? '✅' : '❌'}</span>
              <span>Notation et avis sur les bars</span>
            </li>
            <li className={user.isPremium ? 'enabled' : 'disabled'}>
              <span className="feature-icon">{user.isPremium ? '✅' : '❌'}</span>
              <span>Statistiques avancées</span>
            </li>
            <li className={user.isPremium ? 'enabled' : 'disabled'}>
              <span className="feature-icon">{user.isPremium ? '✅' : '❌'}</span>
              <span>Mode sans publicité</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

