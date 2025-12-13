# 🚀 Guide de Déploiement sur Vercel - AlcoolTracker

Guide complet étape par étape pour déployer AlcoolTracker (Frontend + Backend) sur Vercel.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Préparation](#préparation)
3. [Déploiement du Backend](#déploiement-du-backend)
4. [Déploiement du Frontend](#déploiement-du-frontend)
5. [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
6. [Configuration de la base de données](#configuration-de-la-base-de-données)
7. [Vérification et tests](#vérification-et-tests)
8. [Dépannage](#dépannage)

---

## 📋 Prérequis

- ✅ Un compte GitHub (gratuit)
- ✅ Un compte Vercel (gratuit) : [vercel.com](https://vercel.com)
- ✅ Un compte pour la base de données PostgreSQL (gratuit) :
  - [Supabase](https://supabase.com) (recommandé)
  - [Neon](https://neon.tech)
  - [Railway](https://railway.app)
  - [Render](https://render.com)

---

## 🔧 Préparation

### 1. Créer les icônes PWA

Avant de déployer, créez les icônes nécessaires :

1. Utilisez `frontend/public/icon.svg` comme base
2. Générez les fichiers PNG :
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)
3. Placez-les dans `frontend/public/`

**Outils en ligne** :
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)

### 2. Créer les fichiers .env.example (optionnel mais recommandé)

Créez `backend/.env.example` :
```env
DATABASE_URL=postgresql://user:password@localhost:5432/alcool_tracker
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Créez `frontend/.env.example` :
```env
VITE_API_URL=
```

### 3. Préparer le repository GitHub

Si ce n'est pas déjà fait, créez un repository GitHub :

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Initial commit"

# Créer un repository sur GitHub, puis :
git remote add origin https://github.com/votre-username/alcool-tracker.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Configuration de la Base de Données

### Option 1 : Supabase (Recommandé - Gratuit)

1. **Créer un compte** sur [supabase.com](https://supabase.com)
2. **Créer un nouveau projet**
3. **Récupérer la connection string** :
   - Allez dans Settings → Database
   - Copiez la "Connection string" (URI)
   - Format : `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### Option 2 : Neon (Gratuit)

1. **Créer un compte** sur [neon.tech](https://neon.tech)
2. **Créer un nouveau projet**
3. **Récupérer la connection string** depuis le dashboard

### 3. Exécuter les migrations

Une fois la base de données créée, exécutez les migrations Prisma :

```bash
cd backend

# Mettre à jour DATABASE_URL dans .env
# DATABASE_URL="postgresql://..."

# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate deploy

# (Optionnel) Remplir avec des données de test
npm run seed
```

---

## 🔙 Déploiement du Backend

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. **Se connecter à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub

2. **Créer un nouveau projet** :
   - Cliquez sur "Add New" → "Project"
   - Importez votre repository GitHub
   - Sélectionnez le dossier `backend`

3. **Configurer le projet** :
   - **Framework Preset** : Other
   - **Root Directory** : `backend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
   - **Development Command** : `npm run dev`

4. **Variables d'environnement** (voir section dédiée ci-dessous)

5. **Déployer** :
   - Cliquez sur "Deploy"
   - Attendez la fin du déploiement
   - Notez l'URL générée (ex: `https://alcool-tracker-backend.vercel.app`)

### Méthode 2 : Via CLI

1. **Installer Vercel CLI** :
```bash
npm install -g vercel
```

2. **Se connecter** :
```bash
vercel login
```

3. **Déployer le backend** :
```bash
cd backend
vercel
```

4. **Suivre les instructions** :
   - Link to existing project? → No
   - Project name? → `alcool-tracker-backend`
   - Directory? → `./`
   - Override settings? → No

5. **Déployer en production** :
```bash
vercel --prod
```

### Créer vercel.json pour le backend

Créez `backend/vercel.json` :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 🎨 Déploiement du Frontend

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. **Créer un nouveau projet** :
   - Dans Vercel, cliquez sur "Add New" → "Project"
   - Importez le même repository GitHub
   - Sélectionnez le dossier `frontend`

2. **Configurer le projet** :
   - **Framework Preset** : Vite
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

3. **Variables d'environnement** :
   - `VITE_API_URL` : L'URL de votre backend Vercel
     - Exemple : `https://alcool-tracker-backend.vercel.app`

4. **Déployer** :
   - Cliquez sur "Deploy"
   - Attendez la fin du déploiement
   - Votre app est en ligne ! 🎉

### Méthode 2 : Via CLI

```bash
cd frontend
vercel
```

Suivez les instructions, puis :
```bash
vercel --prod
```

---

## 🔐 Configuration des Variables d'Environnement

### Backend (dans Vercel Dashboard)

Allez dans votre projet backend → Settings → Environment Variables :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret pour signer les JWT | `votre-secret-super-securise-123` |
| `NODE_ENV` | Environnement | `production` |
| `PORT` | Port (optionnel, Vercel gère automatiquement) | `3001` |

**Générer un JWT_SECRET sécurisé** :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend (dans Vercel Dashboard)

Allez dans votre projet frontend → Settings → Environment Variables :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de votre backend Vercel | `https://alcool-tracker-backend.vercel.app` |

**Important** : Les variables Vite doivent commencer par `VITE_` pour être accessibles dans le code.

### Mettre à jour api.ts

Assurez-vous que `frontend/src/services/api.ts` utilise la variable d'environnement :

```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

## 🔄 Configuration des Routes API

### Option 1 : Proxy via Vercel (Recommandé)

Créez `frontend/vercel.json` :

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://alcool-tracker-backend.vercel.app/:path*"
    }
  ]
}
```

Ainsi, vous pouvez garder `/api` dans votre code frontend.

### Option 2 : Utiliser directement l'URL du backend

Dans `frontend/src/services/api.ts`, utilisez directement :
```typescript
baseURL: import.meta.env.VITE_API_URL || 'https://alcool-tracker-backend.vercel.app'
```

---

## ✅ Vérification et Tests

### 1. Vérifier le backend

1. Testez l'endpoint de santé (si vous en avez un) :
   ```
   https://alcool-tracker-backend.vercel.app/api/health
   ```

2. Testez l'inscription :
   ```bash
   curl -X POST https://alcool-tracker-backend.vercel.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","name":"Test"}'
   ```

### 2. Vérifier le frontend

1. Ouvrez votre site frontend
2. Ouvrez DevTools (F12)
3. Vérifiez la console pour les erreurs
4. Testez l'inscription/connexion

### 3. Vérifier le PWA

1. **DevTools → Application → Manifest** :
   - Vérifiez que le manifest est chargé
   - Vérifiez les icônes

2. **DevTools → Application → Service Workers** :
   - Vérifiez que le Service Worker est actif

3. **Test Lighthouse** :
   - DevTools → Lighthouse → PWA
   - Score minimum : 90+

### 4. Tester l'installation

- **Android** : Le prompt d'installation devrait apparaître
- **iOS** : Menu Safari → "Sur l'écran d'accueil"
- **Desktop** : Icône d'installation dans la barre d'adresse

---

## 🐛 Dépannage

### Le backend ne démarre pas

**Erreur** : `Cannot find module` ou erreurs de build

**Solution** :
1. Vérifiez que `package.json` a bien un script `build`
2. Vérifiez que `dist/index.js` existe après le build
3. Vérifiez les logs de build dans Vercel

### Le frontend ne peut pas se connecter au backend

**Erreur** : `CORS error` ou `Network error`

**Solutions** :
1. Vérifiez que `VITE_API_URL` est bien configuré
2. Vérifiez que le backend autorise les requêtes CORS depuis votre domaine frontend
3. Vérifiez les logs du backend dans Vercel

### La base de données ne fonctionne pas

**Erreur** : `Can't reach database server`

**Solutions** :
1. Vérifiez que `DATABASE_URL` est correct
2. Vérifiez que la base de données accepte les connexions externes
3. Pour Supabase : Vérifiez les paramètres de sécurité (Settings → Database → Connection Pooling)

### Les migrations Prisma ne s'exécutent pas

**Solution** : Exécutez les migrations manuellement avant le déploiement :

```bash
cd backend
npx prisma migrate deploy
```

Ou ajoutez un script de build qui les exécute automatiquement dans `package.json` :

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && tsc",
    "postbuild": "prisma generate"
  }
}
```

### Le PWA ne s'installe pas

**Vérifications** :
1. ✅ HTTPS est activé (automatique sur Vercel)
2. ✅ `manifest.json` est accessible
3. ✅ Les icônes existent et sont accessibles
4. ✅ Le Service Worker est actif
5. ✅ Pas d'erreurs dans la console

---

## 🔄 Déploiements automatiques

Vercel déploie automatiquement à chaque push sur GitHub !

1. **Push sur `main`** → Déploiement en production
2. **Push sur une autre branche** → Déploiement en preview

Pour désactiver les déploiements automatiques :
- Settings → Git → Ignore Build Step

---

## 📱 Domaines personnalisés

### Ajouter un domaine

1. Allez dans votre projet → Settings → Domains
2. Ajoutez votre domaine
3. Suivez les instructions DNS

### Configuration HTTPS

HTTPS est automatiquement activé par Vercel (gratuit) !

---

## 🎯 Checklist de déploiement

- [ ] Base de données PostgreSQL créée et configurée
- [ ] Migrations Prisma exécutées
- [ ] Icônes PWA créées (`icon-192.png`, `icon-512.png`)
- [ ] Backend déployé sur Vercel
- [ ] Variables d'environnement backend configurées
- [ ] Frontend déployé sur Vercel
- [ ] Variable `VITE_API_URL` configurée dans le frontend
- [ ] Tests de connexion backend/frontend réussis
- [ ] PWA testé et fonctionnel
- [ ] Installation testée sur mobile

---

## 🎉 C'est terminé !

Votre application AlcoolTracker est maintenant en ligne et accessible partout dans le monde ! 

Les utilisateurs peuvent :
- ✅ Accéder à l'application via le navigateur
- ✅ Installer l'application sur leur appareil (PWA)
- ✅ Utiliser l'application hors ligne (partiellement)

**URLs** :
- Frontend : `https://alcool-tracker-frontend.vercel.app`
- Backend : `https://alcool-tracker-backend.vercel.app`

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Vercel + Node.js](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Vercel + Vite](https://vercel.com/docs/frameworks/vite)
- [Prisma + Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

## 💡 Astuces

1. **Environnements multiples** : Créez des projets séparés pour dev/staging/prod
2. **Preview deployments** : Testez chaque PR avant de merger
3. **Analytics** : Activez Vercel Analytics pour suivre les performances
4. **Logs** : Consultez les logs en temps réel dans le dashboard Vercel

Bon déploiement ! 🚀

