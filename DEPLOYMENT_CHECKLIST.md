# ✅ Checklist de Déploiement Vercel - AlcoolTracker

Checklist complète pour vérifier que tout est prêt avant le déploiement.

## 🔍 Vérifications Pré-Déploiement

### 📦 Backend

- [ ] **backend/package.json**
  - [x] Script `build` inclut `prisma generate && tsc`
  - [x] Script `postinstall` pour générer Prisma automatiquement
  - [x] Script `start` pointe vers `dist/index.js`

- [ ] **backend/vercel.json**
  - [x] Configuration correcte pour Vercel
  - [x] Routes pointent vers `dist/index.js`
  - [x] Build command configuré

- [ ] **backend/src/index.ts**
  - [x] Exporte `app` pour Vercel serverless
  - [x] Ne démarre le serveur que si pas sur Vercel
  - [x] CORS configuré pour production

- [ ] **backend/prisma/schema.prisma**
  - [x] Datasource utilise `env("DATABASE_URL")`
  - [x] Toutes les migrations sont à jour

- [ ] **Variables d'environnement backend** (à configurer dans Vercel)
  - [ ] `DATABASE_URL` - Connection string PostgreSQL (avec SSL)
  - [ ] `JWT_SECRET` - Secret pour signer les JWT
  - [ ] `FRONTEND_URL` - URL du frontend Vercel
  - [ ] `NODE_ENV` - `production`

### 🎨 Frontend

- [ ] **frontend/package.json**
  - [x] Script `build` : `tsc && vite build`
  - [x] `vite-plugin-pwa` installé

- [ ] **frontend/vite.config.ts**
  - [x] Plugin PWA configuré
  - [x] Manifest configuré
  - [x] Service Worker configuré

- [ ] **frontend/vercel.json**
  - [x] Headers pour PWA configurés
  - [x] Rewrites pour API (si nécessaire)

- [ ] **frontend/src/services/api.ts**
  - [x] Utilise `VITE_API_URL` en production
  - [x] Fallback sur `/api` en développement

- [ ] **frontend/public/**
  - [ ] `icon-192.png` existe (192x192 pixels)
  - [ ] `icon-512.png` existe (512x512 pixels)
  - [ ] `manifest.json` existe (généré automatiquement par Vite PWA)

- [ ] **Variables d'environnement frontend** (à configurer dans Vercel)
  - [ ] `VITE_API_URL` - URL complète du backend Vercel
    - Exemple : `https://alcool-tracker-backend.vercel.app`

### 🗄️ Base de Données

- [ ] **Base de données créée**
  - [ ] Compte Supabase/Neon créé
  - [ ] Projet créé
  - [ ] Connection string récupérée

- [ ] **Migrations exécutées**
  ```bash
  cd backend
  npx prisma generate
  npx prisma migrate deploy
  ```

- [ ] **Connection string testée**
  - [ ] Test avec Prisma Studio : `npx prisma studio`
  - [ ] Ou test avec psql (avec SSL et encodage)

### 📁 Fichiers de Configuration

- [ ] **.gitignore**
  - [ ] `node_modules/` ignoré
  - [ ] `.env` ignoré
  - [ ] `dist/` ignoré (backend)
  - [ ] `.vercel/` ignoré

- [ ] **Repository GitHub**
  - [ ] Code poussé sur GitHub
  - [ ] Pas de fichiers sensibles commités (.env, etc.)

## 🚀 Étapes de Déploiement

### 1. Déployer le Backend

1. [ ] Aller sur [vercel.com](https://vercel.com)
2. [ ] Cliquer sur "Add New" → "Project"
3. [ ] Importer le repository GitHub
4. [ ] **Configuration** :
   - Root Directory : `backend`
   - Framework Preset : Other
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`
5. [ ] **Variables d'environnement** :
   - Ajouter toutes les variables (voir ci-dessus)
6. [ ] Cliquer sur "Deploy"
7. [ ] Noter l'URL générée (ex: `https://alcool-tracker-backend.vercel.app`)

### 2. Déployer le Frontend

1. [ ] Dans Vercel, créer un nouveau projet
2. [ ] Importer le même repository GitHub
3. [ ] **Configuration** :
   - Root Directory : `frontend`
   - Framework Preset : Vite
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`
4. [ ] **Variables d'environnement** :
   - `VITE_API_URL` : URL du backend (ex: `https://alcool-tracker-backend.vercel.app`)
5. [ ] Cliquer sur "Deploy"
6. [ ] Noter l'URL générée (ex: `https://alcool-tracker-frontend.vercel.app`)

### 3. Mettre à jour les URLs

1. [ ] **Backend** : Mettre à jour `FRONTEND_URL` avec l'URL du frontend
2. [ ] **Frontend** : Vérifier que `VITE_API_URL` pointe vers le bon backend
3. [ ] Redéployer si nécessaire

## ✅ Tests Post-Déploiement

### Backend

- [ ] **Health check** :
  ```
  https://votre-backend.vercel.app/api/health
  ```
  Devrait retourner : `{"status":"ok","message":"Alcool Tracker API is running"}`

- [ ] **Test d'inscription** :
  ```bash
  curl -X POST https://votre-backend.vercel.app/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test123","name":"Test"}'
  ```

### Frontend

- [ ] **Site accessible** :
  - Ouvrir l'URL du frontend
  - Vérifier qu'il charge sans erreur

- [ ] **Console navigateur** :
  - Ouvrir DevTools (F12)
  - Vérifier qu'il n'y a pas d'erreurs
  - Vérifier que les requêtes API fonctionnent

- [ ] **PWA** :
  - DevTools → Application → Manifest : Vérifier le manifest
  - DevTools → Application → Service Workers : Vérifier le SW actif
  - Test Lighthouse → PWA : Score minimum 90+

- [ ] **Test d'installation** :
  - Android : Le prompt d'installation devrait apparaître
  - iOS : Menu Safari → "Sur l'écran d'accueil"
  - Desktop : Icône d'installation dans la barre d'adresse

## 🐛 Problèmes Courants

### Backend ne démarre pas

- [ ] Vérifier que `prisma generate` s'exécute avant le build
- [ ] Vérifier que `DATABASE_URL` est correcte (avec SSL)
- [ ] Vérifier les logs dans Vercel Dashboard

### Frontend ne peut pas se connecter au backend

- [ ] Vérifier que `VITE_API_URL` est correcte
- [ ] Vérifier CORS dans le backend
- [ ] Vérifier que `FRONTEND_URL` dans le backend correspond au frontend

### Base de données ne fonctionne pas

- [ ] Vérifier que `DATABASE_URL` contient `?sslmode=require`
- [ ] Vérifier que les caractères spéciaux dans le mot de passe sont encodés
- [ ] Vérifier que les migrations sont exécutées

### PWA ne s'installe pas

- [ ] Vérifier que les icônes existent (`icon-192.png`, `icon-512.png`)
- [ ] Vérifier que HTTPS est activé (automatique sur Vercel)
- [ ] Vérifier que le manifest est accessible
- [ ] Vérifier que le Service Worker est actif

## 📝 Notes Importantes

1. **Ne jamais commiter** :
   - Fichiers `.env`
   - `node_modules/`
   - Secrets ou tokens

2. **URLs dynamiques** :
   - Vercel génère des URLs automatiquement
   - Vous pouvez ajouter un domaine personnalisé plus tard

3. **Variables d'environnement** :
   - Configurées dans Vercel Dashboard → Settings → Environment Variables
   - Différentes pour Production, Preview, Development

4. **Redéploiements automatiques** :
   - Chaque push sur `main` → Production
   - Chaque push sur autre branche → Preview

## 🎉 C'est prêt !

Une fois toutes les cases cochées, votre application est prête à être déployée !

---

**Besoin d'aide ?** Consultez `VERCEL_DEPLOYMENT.md` pour le guide détaillé.


