import { useAuthStore } from '../store/authStore';
import './Premium.css';

export default function Premium() {
  const { user } = useAuthStore();

  if (user?.isPremium) {
    return (
      <div className="premium-page">
        <div className="premium-header">
          <div className="premium-badge-hero">⭐ Premium</div>
          <h1>Vous êtes déjà Premium !</h1>
          <p>Profitez de toutes les fonctionnalités exclusives</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-page">
      <div className="premium-header">
        <h1>Passez à Premium</h1>
        <p>Débloquez toutes les fonctionnalités avancées</p>
      </div>

      <div className="premium-features">
        <div className="feature-card">
          <div className="feature-icon">📸</div>
          <h3>Photos</h3>
          <p>Ajoutez des photos à vos consommations pour garder des souvenirs</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3>Carte des Bars</h3>
          <p>Localisez et notez les bars que vous visitez</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Avis et Notes</h3>
          <p>Notez vos bars préférés et partagez vos expériences</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Statistiques Avancées</h3>
          <p>Analyses détaillées, projections et comparaisons</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>Alertes Personnalisées</h3>
          <p>Recevez des notifications et rappels personnalisés</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🚫</div>
          <h3>Sans Publicité</h3>
          <p>Profitez d'une expérience sans interruption</p>
        </div>
      </div>

      <div className="pricing-section">
        <div className="pricing-card">
          <div className="pricing-header">
            <h2>Premium</h2>
            <div className="price">
              <span className="price-amount">9,99 €</span>
              <span className="price-period">/ mois</span>
            </div>
          </div>
          <ul className="pricing-features">
            <li>✅ Toutes les fonctionnalités Premium</li>
            <li>✅ Support prioritaire</li>
            <li>✅ Mises à jour en avant-première</li>
            <li>✅ Annulation à tout moment</li>
          </ul>
          <button className="subscribe-btn" disabled>
            Bientôt disponible
          </button>
          <p className="pricing-note">
            Le système de paiement sera bientôt intégré. Pour l'instant, vous pouvez tester Premium en modifiant votre statut dans la base de données.
          </p>
        </div>
      </div>
    </div>
  );
}

