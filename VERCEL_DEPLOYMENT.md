
**Méthode 1 : Via Prisma Studio (le plus simple)**

```bash
cd backend

# Vérifier que DATABASE_URL est bien dans .env
# Puis lancer Prisma Studio
npx prisma studio
```

Si Prisma Studio s'ouvre dans votre navigateur, c'est que la connexion fonctionne ! 🎉

**Méthode 2 : Via psql (terminal)**

```bash
# Installer psql (si pas déjà installé)
# Windows: Télécharger depuis postgresql.org ou utiliser Git Bash
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql-client

# Tester la connexion (remplacez par votre connection string complète)
psql "postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres"
```

Si la connexion fonctionne, vous verrez :
```
psql (version...)
Type "help" for help.

postgres=#
```

Tapez `\q` pour quitter.

#### 🐛 Dépannage - Erreur de connexion psql (Windows)

Si vous obtenez une erreur comme :
```
psql: erreur : la connexion au serveur sur « db.xxxxx.supabase.co », port 5432 a échoué : Connect 274C/10060
```

**Solutions à essayer** :

**Solution 1 : Ajouter SSL à la connection string** (Recommandé)

Supabase nécessite souvent SSL. Ajoutez `?sslmode=require` à la fin :

```bash
psql "postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
```

**Solution 2 : Encoder les caractères spéciaux dans le mot de passe**

Si votre mot de passe contient des caractères spéciaux (comme `.`, `@`, `#`, etc.), vous devez les encoder en URL :

- `.` devient `%2E`
- `@` devient `%40`
- `#` devient `%23`
- `%` devient `%25`
- etc.

**Exemple** : Si votre mot de passe est `Gkc2408vlo.`, utilisez :
```bash
psql "postgresql://postgres:Gkc2408vlo%2E@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
```

**Solution 3 : Utiliser le port 6543 avec Connection Pooling**

Supabase recommande d'utiliser le port 6543 pour les connexions avec pooling :

```bash
# Récupérez la connection string "Connection pooling" dans Supabase
# Elle utilise généralement le port 6543
psql "postgresql://postgres.[PROJECT-REF]:VOTRE_MOT_DE_PASSE@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require"
```

**Solution 4 : Vérifier le firewall Windows**

Le port 5432 peut être bloqué. Essayez :
1. Ouvrir PowerShell en administrateur
2. Exécuter : `New-NetFirewallRule -DisplayName "PostgreSQL" -Direction Outbound -LocalPort 5432 -Protocol TCP -Action Allow`

**Solution 5 : Utiliser Prisma Studio à la place** (Plus simple)

Si psql ne fonctionne pas, utilisez Prisma Studio qui gère automatiquement SSL et l'encodage :

```bash
cd backend
npx prisma studio
```

**Solution 6 : Tester avec un outil graphique**

Utilisez [DBeaver](https://dbeaver.io/) ou [pgAdmin](https://www.pgadmin.org/) qui gèrent mieux les connexions SSL et les caractères spéciaux.

**Méthode 3 : Via un outil graphique**

- **[DBeaver](https://dbeaver.io/)** (gratuit, multiplateforme) - Recommandé
- **[pgAdmin](https://www.pgadmin.org/)** (gratuit, open source)
- **[TablePlus](https://tableplus.com/)** (payant mais excellent)

Dans ces outils, créez une nouvelle connexion PostgreSQL et utilisez :
- **Host** : `db.xxxxx.supabase.co` (extrait de votre connection string)
- **Port** : `5432`
- **Database** : `postgres`
- **User** : `postgres`
- **Password** : Votre mot de passe

#### ⚠️ Important - Sécurité

- **Ne partagez JAMAIS votre connection string** publiquement
- **Ne commitez JAMAIS** votre `.env` dans Git
- Utilisez les **variables d'environnement** dans Vercel (voir section dédiée)
- Le mot de passe est visible dans la connection string - gardez-la secrète !

#### 📸 Aide visuelle - Où trouver la connection string dans Supabase

**Navigation dans l'interface Supabase** :

```
┌─────────────────────────────────────────┐
│  Supabase Dashboard                      │
├─────────────────────────────────────────┤
│  [🏠] Home                               │
│  [📊] Table Editor                       │
│  [🔐] Authentication                     │
│  [🗄️] Database                           │
│  [📝] SQL Editor                         │
│  ...                                     │
│  [⚙️] Settings  ← CLIQUEZ ICI           │
└─────────────────────────────────────────┘

Puis dans Settings :
┌─────────────────────────────────────────┐
│  Settings                                │
├─────────────────────────────────────────┤
│  General                                 │
│  API                                     │
│  Database  ← CLIQUEZ ICI                 │
│  Auth                                    │
│  Storage                                 │
└─────────────────────────────────────────┘

Dans Database Settings, scrollez jusqu'à :
┌─────────────────────────────────────────┐
│  Connection string                      │
├─────────────────────────────────────────┤
│  [URI] [Session] [Transaction]          │
│                                         │
│  postgresql://postgres:[YOUR-PASSWORD]  │
│  @db.xxxxx.supabase.co:5432/postgres   │
│                                         │
│  [📋] Copy  ← CLIQUEZ POUR COPIER      │
└─────────────────────────────────────────┘
```

**💡 Astuce** : Si vous ne voyez pas "Database" dans Settings, cherchez "Connection string" ou "Connection pooling" dans la page Database.

### Option 2 : Neon (Gratuit)

#### Étape 1 : Créer un compte et un projet

1. **Aller sur Neon** : [neon.tech](https://neon.tech)
2. **Cliquer sur "Sign Up"** et créer un compte (GitHub recommandé)
3. **Créer un nouveau projet** :
   - Cliquer sur "Create a project"
   - **Nom du projet** : `alcool-tracker`
   - **Region** : Choisissez la région la plus proche
   - **PostgreSQL version** : Laissez la version par défaut (15 ou 16)
   - Cliquer sur "Create project"
   - ⏳ Attendez quelques secondes que le projet soit créé

#### Étape 2 : Récupérer la connection string

1. **Dans votre projet Neon**, vous verrez automatiquement la connection string
2. **Ou allez dans "Connection Details"** dans le menu de gauche
3. **Copier la "Connection string"** - Elle ressemble à :
   ```
   postgresql://username:password@ep-xxxxx-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   
   ⚠️ **Notez le mot de passe** affiché - vous ne pourrez plus le voir après !

**Alternative - Connection string avec mot de passe** :
Si vous avez besoin de mettre le mot de passe dans l'URL :
```
postgresql://username:VOTRE_MOT_DE_PASSE@ep-xxxxx-xxxxx.region.aws.neon.tech/neondb?sslmode=require
```

#### ⚠️ Important

- Neon utilise **SSL par défaut** (`sslmode=require`) - c'est bien pour la sécurité
- Le mot de passe n'est affiché qu'une seule fois - notez-le !
- Vous pouvez réinitialiser le mot de passe dans les paramètres si nécessaire

### 3. Exécuter les migrations

Une fois la base de données créée et la connection string récupérée, exécutez les migrations Prisma :

#### Étape 1 : Configurer le fichier .env

1. **Créer un fichier `.env`** dans le dossier `backend/` (si pas déjà existant)
2. **Ajouter la connection string** :

**Pour Supabase** (avec SSL - recommandé) :
```env
# backend/.env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
```

**Pour Supabase** (avec Connection Pooling - encore mieux) :
```env
# Utilisez la connection string "Connection pooling" depuis Supabase
# Elle utilise généralement le port 6543 et fonctionne mieux
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:VOTRE_MOT_DE_PASSE@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require"
```

**Pour Neon** :
```env
DATABASE_URL="postgresql://username:VOTRE_MOT_DE_PASSE@ep-xxxxx-xxxxx.region.aws.neon.tech/neondb?sslmode=require"
```

⚠️ **Remplacez** :
- `VOTRE_MOT_DE_PASSE` par votre vrai mot de passe
- `xxxxx` par les valeurs de votre connection string

⚠️ **Important - Caractères spéciaux dans le mot de passe** :

Si votre mot de passe contient des caractères spéciaux (`.`, `@`, `#`, `%`, etc.), vous devez les encoder en URL dans la connection string :

| Caractère | Encodage URL |
|-----------|--------------|
| `.` | `%2E` |
| `@` | `%40` |
| `#` | `%23` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| ` ` (espace) | `%20` |

**Exemple** : Si votre mot de passe est `Gkc2408vlo.`, utilisez :
```env
DATABASE_URL="postgresql://postgres:Gkc2408vlo%2E@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
```

💡 **Astuce** : Utilisez un outil en ligne pour encoder votre mot de passe : [URL Encoder](https://www.urlencoder.org/)

#### Étape 2 : Exécuter les migrations

```bash
cd backend

# 1. Générer le client Prisma (nécessaire avant les migrations)
npx prisma generate

# 2. Exécuter les migrations (crée les tables dans la base de données)
npx prisma migrate deploy

# 3. (Optionnel) Remplir avec des données de test
npm run seed
```

#### Vérifier que ça fonctionne

Si tout s'est bien passé, vous devriez voir :
```
✅ Applied migration: 20251213003506_alcool_gag
✅ Applied migration: 20251213012039_add_format_and_favorites
✅ Applied migration: 20251213020254_add_clans_and_blur_username
```

#### 🐛 Problèmes courants

**Erreur : "Can't reach database server"**
- Vérifiez que la connection string est correcte
- Vérifiez que vous avez bien remplacé `[YOUR-PASSWORD]` par votre mot de passe
- Pour Supabase : Vérifiez que le projet est bien créé et actif
- Pour Neon : Vérifiez que le projet n'est pas en pause (gratuit = pause après inactivité)

**Erreur : "SSL connection required"**
- Ajoutez `?sslmode=require` à la fin de votre connection string
- Exemple : `postgresql://...@host:5432/db?sslmode=require`

**Erreur : "password authentication failed"**
- Vérifiez que le mot de passe est correct
- Pour Supabase : Le mot de passe est celui défini lors de la création du projet
- Pour Neon : Réinitialisez le mot de passe dans les paramètres si nécessaire

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

