# Alcool Tracker - Application de Suivi de Consommation

Application mobile + Web permettant de répertorier les alcools vendus en France et de suivre sa consommation.

## 🚀 Fonctionnalités

### Version Gratuite
- 📚 Catalogue complet des alcools (bière, vodka, whisky, etc.)
- 📊 Suivi de consommation avec historique détaillé
- 📈 Statistiques personnelles (quantité, taux d'alcool, argent dépensé)
- 🎯 Analyse des effets et impacts sur la santé
- 📱 Interface responsive (Web + Mobile)

### Version Premium
- 📸 Ajout de photos pour les consommations
- 🗺️ Carte des bars avec localisation et avis
- 📊 Statistiques avancées et projections
- 🔔 Alertes personnalisées
- 🚫 Mode sans publicité

## 🛠️ Technologies

- **Backend**: Node.js + Express + TypeScript + PostgreSQL
- **Frontend**: React + TypeScript
- **Mobile**: React Native (à venir)
- **ORM**: Prisma
- **Auth**: JWT

## 📦 Installation

```bash
# Installer toutes les dépendances
npm run install:all

# Configurer la base de données
cd backend
npx prisma migrate dev

# Lancer le backend
npm run dev:backend

# Dans un autre terminal, lancer le frontend
npm run dev:frontend
```

## 📁 Structure du Projet

```
.
├── backend/          # API Node.js/Express
├── frontend/         # Application React Web
├── mobile/           # Application React Native (à venir)
└── README.md
```

## 🔐 Variables d'Environnement

Créer un fichier `.env` dans le dossier `backend/` :

```
DATABASE_URL="postgresql://user:password@localhost:5432/alcool_tracker"
JWT_SECRET="your-secret-key"
PORT=3001
```

## 📝 License

MIT

