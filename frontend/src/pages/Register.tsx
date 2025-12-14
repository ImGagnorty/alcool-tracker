import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation côté client
    if (!dateOfBirth) {
      setError('Veuillez entrer votre date de naissance');
      return;
    }

    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      setError('Vous devez avoir au moins 18 ans pour utiliser cette application');
      return;
    }

    if (!acceptedTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    if (!acceptedRules) {
      setError('Vous devez accepter les règles et consignes d\'utilisation');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password,
        dateOfBirth,
        acceptedTerms,
        acceptedRules
      });
      const { user, token } = response.data;
      setAuth(user, token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🍷 Alcool Tracker</h1>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Nom (optionnel)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Mot de passe (min. 6 caractères)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Date de naissance *</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
              disabled={loading}
            />
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
              Vous devez avoir au moins 18 ans pour utiliser cette application
            </small>
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={loading}
                required
              />
              <span>J'accepte les <Link to="/terms" target="_blank" style={{ color: 'var(--primary)' }}>conditions d'utilisation</Link> *</span>
            </label>
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedRules}
                onChange={(e) => setAcceptedRules(e.target.checked)}
                disabled={loading}
                required
              />
              <span>J'accepte les <Link to="/rules" target="_blank" style={{ color: 'var(--primary)' }}>règles et consignes d'utilisation</Link> *</span>
            </label>
          </div>
          <button type="submit" disabled={loading || !acceptedTerms || !acceptedRules} className="submit-btn">
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>
        <p className="auth-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

