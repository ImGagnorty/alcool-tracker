# 🚀 Guide de Configuration - Glouglou (Alcool Tracker)

Ce guide vous aidera à configurer votre environnement de développement local après avoir cloné le projet depuis GitHub.

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- PostgreSQL (via Supabase ou local)
- Git

## 🔧 Configuration

### 1. Variables d'Environnement

#### Backend

Le fichier `.env.example` dans `backend/` contient toutes les variables nécessaires. 

**Si vous n'avez pas encore de fichier `.env` dans `backend/`**, copiez l'exemple :

```bash
cd backend
cp .env.example .env
```

Puis éditez `.env` avec vos valeurs :

- **DATABASE_URL** : Votre connection string Supabase PostgreSQL
  - Format Supabase : `postgresql://user:password@host:5432/database?connection_limit=1`
  - Pour le pooling : utilisez le port 6543 ou ajoutez `?pgbouncer=true`
  
- **JWT_SECRET** : Une clé secrète pour signer les tokens JWT
  - Générez-en une avec : `openssl rand -base64 32`

- **PORT** : Port du serveur backend (par défaut: 3001)

- **FRONTEND_URL** : URL du frontend en développement (par défaut: http://localhost:3000)

#### Frontend

Le fichier `.env.example` dans `frontend/` est optionnel en développement car Vite utilise un proxy.

En production, créez un `.env` avec :
```
VITE_API_URL="https://votre-backend.vercel.app/api"
```

### 2. Installation des Dépendances

```bash
# Depuis la racine du projet
npm run install:all
```

Ou manuellement :

```bash
# Installer les dépendances racine
npm install

# Installer les dépendances backend
cd backend
npm install

# Installer les dépendances frontend
cd ../frontend
npm install
```

### 3. Configuration de la Base de Données

```bash
cd backend

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations (si vous utilisez une nouvelle base de données)
npx prisma migrate dev

# (Optionnel) Ouvrir Prisma Studio pour visualiser la base de données
npx prisma studio
```

### 4. Lancer l'Application

#### Terminal 1 - Backend
```bash
npm run dev:backend
# ou
cd backend && npm run dev
```

Le backend sera accessible sur `http://localhost:3001`

#### Terminal 2 - Frontend
```bash
npm run dev:frontend
# ou
cd frontend && npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 🏗️ Structure du Projet

```
.
├── backend/              # API Node.js/Express/TypeScript
│   ├── src/
│   │   ├── routes/      # Routes API
│   │   ├── middleware/  # Middleware (auth, etc.)
│   │   └── lib/         # Utilitaires (Prisma, etc.)
│   ├── prisma/          # Schéma et migrations Prisma
│   └── .env             # Variables d'environnement (à créer)
│
├── frontend/            # Application React/TypeScript
│   ├── src/
│   │   ├── pages/       # Pages de l'application
│   │   ├── components/  # Composants réutilisables
│   │   ├── services/    # Services API
│   │   └── store/       # State management (Zustand)
│   └── .env             # Variables d'environnement (optionnel)
│
└── package.json         # Scripts racine
```

## 🔍 Vérification

1. **Backend** : Visitez `http://localhost:3001/api` - vous devriez voir `{"status":"ok",...}`
2. **Frontend** : Visitez `http://localhost:3000` - l'application devrait se charger

## 🐛 Dépannage

### Erreur de connexion à la base de données

- Vérifiez que `DATABASE_URL` est correct dans `backend/.env`
- Pour Supabase, assurez-vous d'utiliser la connection string avec pooling
- Vérifiez que votre base de données est accessible

### Erreur CORS

- Le backend autorise automatiquement `localhost:3000` en développement
- Vérifiez que `FRONTEND_URL` est correct dans `backend/.env`

### Erreur Prisma

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

## 📚 Ressources

- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)

## 🚀 Déploiement

Le projet est configuré pour Vercel :
- Backend : `backend/vercel.json`
- Frontend : `frontend/vercel.json`

Les variables d'environnement doivent être configurées dans le dashboard Vercel.

