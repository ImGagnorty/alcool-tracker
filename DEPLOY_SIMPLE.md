
# ÉTAPE 3 : Déployer le Frontend (3 minutes)

### 3.1 Créer le projet frontend

1. Dans Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez le **même repository** que pour le backend
3. **Configuration du projet** :
   - **Project Name** : `alcool-tracker-frontend` (ou ce que vous voulez)
   - **Root Directory** : Cliquez sur **"Edit"** et tapez : `frontend`
   - **Framework Preset** : Sélectionnez **"Vite"** (Vercel le détectera peut-être automatiquement)
   - **Build Command** : `npm run build` ⚠️ **ATTENTION** : Vérifiez bien que c'est `npm` et pas `nom` !
   - **Output Directory** : `dist`
   - **Install Command** : `npm install` ⚠️ **ATTENTION** : Vérifiez bien que c'est `npm` et pas `nom` !

### 3.2 Ajouter les variables d'environnement

Avant de cliquer sur "Deploy", cliquez sur **"Environment Variables"** et ajoutez :

**Variable 1** :
- **Name** : `VITE_API_URL`
- **Value** : L'URL de votre backend avec `/api` à la fin (ex: `https://alcool-tracker.vercel.app/api`)
- ⚠️ **IMPORTANT** : L'URL doit se terminer par `/api` !
- Cochez : ✅ Production, ✅ Preview, ✅ Development

### 3.3 Déployer

1. Cliquez sur **"Deploy"** (bouton en bas)
2. ⏳ Attendez 2-3 minutes
3. ✅ Quand c'est terminé, vous verrez une URL comme : `https://alcool-tracker-frontend-xxxxx.vercel.app`

⚠️ **IMPORTANT - Quelle URL utiliser ?**

Vercel génère **2 types d'URLs** :

1. **URL de Production (à utiliser)** : `https://alcool-tracker-frontend.vercel.app`
   - ✅ URL principale, stable, ne change jamais
   - ✅ Pointe toujours vers le dernier déploiement en production
   - ✅ **C'est celle-ci que vous devez utiliser dans vos configurations !**

2. **URL de Déploiement spécifique** : `https://alcool-tracker-frontend-9ybdurao7-gagnortys-projects.vercel.app`
   - ⚠️ URL temporaire d'un déploiement spécifique
   - ⚠️ Change à chaque nouveau déploiement
   - ⚠️ **Ne PAS utiliser pour la configuration** (sauf pour tester un déploiement spécifique)

**Pour trouver votre URL de production** :
- Allez dans votre projet Vercel → **Settings** → **Domains**
- Vous verrez l'URL de production principale (sans le hash)

⚠️ **Note sur les warnings npm** : Pendant le déploiement, vous pouvez voir des warnings comme :
- `npm warn deprecated eslint@8.57.1`
- `npm warn deprecated rimraf@3.0.2`
- etc.

**Ces warnings sont normaux et n'empêchent PAS le déploiement de fonctionner.** Ce sont juste des avertissements sur des dépendances obsolètes qui seront mises à jour dans le futur. Votre application fonctionnera parfaitement malgré ces warnings.

### 3.4 Mettre à jour le backend

Maintenant, il faut configurer les variables d'environnement du backend :

1. Retournez dans votre projet **backend** sur Vercel
2. Allez dans **Settings** → **Environment Variables**
3. Vérifiez/ajoutez ces variables :
   - ⚠️ **NODE_ENV** : Ne définissez PAS cette variable dans Environment Variables ! Elle est définie automatiquement dans `vercel.json`
   - `FRONTEND_URL` = L'URL de votre frontend (ex: `https://alcool-tracker-frontend.vercel.app`)
   - `FRONTEND_VERCEL_URL` = L'URL de votre frontend (ex: `https://alcool-tracker-frontend.vercel.app`)
   - `DATABASE_URL` = Votre URL PostgreSQL
     - ⚠️ **POUR SUPABASE - TRÈS IMPORTANT** : 
       - ❌ **NE PAS utiliser** : `db.xxxxx.supabase.co:5432` (port direct - ne fonctionne pas avec Vercel)
       - ✅ **UTILISER** : L'URL du **Session Pooler** avec le port **6543**
       - **Comment obtenir l'URL du pooler** :
         1. Dans Supabase → **Settings** → **Database** → **Connection Pooling**
         2. Changez **"Method"** de **"Direct connection"** à **"Session mode"**
         3. Copiez l'URL qui s'affiche (elle contiendra `pooler.supabase.com:6543`)
         4. Format attendu : `postgresql://postgres.xxxxx:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
       - ⚠️ **Si vous voyez encore `:5432` dans votre URL, c'est la mauvaise URL !**
   - `JWT_SECRET` = Votre secret JWT
4. Cochez : ✅ Production, ✅ Preview, ✅ Development pour toutes les variables
   
   ⚠️ **IMPORTANT** : Si vous avez déjà défini `NODE_ENV` comme variable d'environnement, **SUPPRIMEZ-LA** ! Elle est maintenant définie dans `vercel.json` pour éviter les conflits avec le build.
5. Cliquez sur **"Save"**
6. Vercel redéploiera automatiquement le backend

---

## 🐛 Dépannage : Erreur "Command exited with 127"

Si vous avez l'erreur `Command "npm run build" exited with 127` dans le backend :

### Solution 1 : Vérifier la configuration Vercel

1. Allez dans votre projet **backend** sur Vercel
2. **Settings** → **General**
3. Section **"Build and Development Settings"**
4. Vérifiez **EXACTEMENT** ces valeurs :
   - **Root Directory** : `backend` (sans slash, sans point)
   - **Build Command** : `npm run build` (vérifiez qu'il n'y a pas de faute de frappe comme "nom")
   - **Output Directory** : ⚠️ **LAISSEZ COMPLÈTEMENT VIDE** (rien du tout)
   - **Install Command** : `npm install` (vérifiez qu'il n'y a pas de faute de frappe)
   - **Framework Preset** : `Other`
5. Cliquez sur **"Save"**
6. Redéployez : **Deployments** → **...** → **Redeploy**

### Solution 2 : Supprimer et recréer le projet

Si ça ne fonctionne toujours pas :

1. **Settings** → **General** → Scrollez en bas
2. Cliquez sur **"Delete Project"**
3. Recréez le projet :
   - **Add New** → **Project**
   - Importez le même repository
   - **Root Directory** : `backend`
   - **Build Command** : `npm run build`
   - **Output Directory** : ⚠️ **VIDE**
   - **Install Command** : `npm install`
   - **Framework Preset** : `Other`
4. Ajoutez vos variables d'environnement
5. Déployez

### Solution 3 : Vérifier les logs de build

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Cliquez sur **"Build Logs"**
4. Regardez les premières lignes pour voir quelle commande est exécutée
5. Vérifiez s'il y a des erreurs avant l'exécution de `npm run build`

---

## 🐛 Dépannage : Erreur 500 lors de l'inscription

Si vous avez une erreur `500 (Internal Server Error)` lors de l'inscription :

### Étape 1 : Vérifier les logs Vercel

1. Allez dans votre projet **backend** sur Vercel
2. **Deployments** → Cliquez sur le dernier déploiement
3. Cliquez sur **"Runtime Logs"** (ou "Function Logs")
4. Essayez de vous inscrire depuis le frontend
5. Regardez les logs qui apparaissent - vous devriez voir l'erreur exacte

### Étape 2 : Vérifier les variables d'environnement

Dans **Settings** → **Environment Variables**, vérifiez que vous avez **EXACTEMENT** :

- ✅ `DATABASE_URL` = Votre URL PostgreSQL complète (ex: `postgresql://user:pass@host:5432/db?sslmode=require`)
- ✅ `JWT_SECRET` = Une chaîne aléatoire (générez-en une avec : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- ✅ `FRONTEND_URL` = `https://alcool-tracker-frontend.vercel.app`
- ✅ `FRONTEND_VERCEL_URL` = `https://alcool-tracker-frontend.vercel.app`

⚠️ **IMPORTANT** : Toutes ces variables doivent être cochées pour **Production, Preview, ET Development**

### Étape 3 : Vérifier les migrations Prisma

Les migrations doivent être exécutées sur votre base de données. Si ce n'est pas fait :

1. Connectez-vous à votre base de données PostgreSQL (via Supabase, Neon, etc.)
2. Ou exécutez les migrations via Prisma :
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

### Étape 4 : Erreurs courantes dans les logs

**Si vous voyez "JWT_SECRET missing"** :
- Ajoutez `JWT_SECRET` dans les variables d'environnement Vercel

**Si vous voyez "DATABASE_URL missing"** :
- Ajoutez `DATABASE_URL` dans les variables d'environnement Vercel

**Si vous voyez "Can't reach database server" (Supabase)** :
- ⚠️ **PROBLÈME COURANT** : Vous utilisez le port direct (5432) qui n'est pas compatible IPv4 pour Vercel
- **Solution** : Utilisez le **Session Pooler** de Supabase (port 6543)
  
  **Étapes détaillées :**
  1. Dans la fenêtre Supabase que vous voyez, cliquez sur le bouton **"Pooler settings"** (en bas à droite de l'avertissement IPv4)
  2. OU allez dans Supabase → **Settings** → **Database** → **Connection Pooling**
  3. Changez le dropdown **"Method"** de **"Direct connection"** à **"Session mode"** ou **"Transaction mode"**
  4. Copiez la nouvelle URL qui s'affiche (elle utilisera le port **6543** au lieu de 5432)
  5. Format attendu : `postgresql://postgres.xxxxx:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  6. Dans Vercel → **Settings** → **Environment Variables** → Mettez à jour `DATABASE_URL` avec cette nouvelle URL
  7. Redéployez votre backend
  
  ⚠️ **Important** : Le port doit être **6543** (pooler) et non **5432** (direct)

**Si vous voyez "relation 'users' does not exist"** :
- Les migrations Prisma n'ont pas été exécutées
- Exécutez `npx prisma migrate deploy`

---

## ⚠️ IMPORTANT : Migration de la base de données

Après avoir déployé le backend avec les nouvelles fonctionnalités d'inscription, **vous devez exécuter la migration Prisma** :

### Option 1 : Via Vercel (Recommandé pour production)

1. Allez dans votre projet backend sur Vercel
2. **Settings** → **Environment Variables**
3. Vérifiez que `DATABASE_URL` est bien configuré
4. Dans votre terminal local, connectez-vous à votre base de données et exécutez :
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

### Option 2 : Via votre interface de base de données

Si vous utilisez Supabase, Neon, ou une autre plateforme :
1. Connectez-vous à votre interface de base de données
2. Exécutez manuellement cette migration SQL :
   ```sql
   ALTER TABLE "users" 
   ADD COLUMN "acceptedRules" BOOLEAN NOT NULL DEFAULT false,
   ADD COLUMN "acceptedTerms" BOOLEAN NOT NULL DEFAULT false,
   ADD COLUMN "dateOfBirth" TIMESTAMP(3),
   ADD COLUMN "termsAcceptedAt" TIMESTAMP(3);
   ```

⚠️ **Sans cette migration, l'inscription retournera une erreur 500 !**

---

## ÉTAPE 4 : Tester (2 minutes)

### 4.1 Tester le frontend

1. Ouvrez l'URL de votre frontend dans votre navigateur
2. Ouvrez la **Console** (F12 → Console)
3. Vérifiez qu'il n'y a pas d'erreurs rouges
4. Essayez de vous inscrire avec un compte de test

### 4.2 Tester le PWA

1. Sur **Android** : Le prompt d'installation devrait apparaître automatiquement
2. Sur **iOS** : 
   - Ouvrez dans Safari (pas Chrome)
   - Cliquez sur le bouton de partage (□↑)
   - Sélectionnez "Sur l'écran d'accueil"
3. Sur **Desktop** : Une icône d'installation devrait apparaître dans la barre d'adresse

---

## ✅ C'est terminé !

Votre application est maintenant en ligne ! 🎉

**URLs** :
- Frontend : `https://alcool-tracker-frontend-xxxxx.vercel.app`
- Backend : `https://alcool-tracker-backend-xxxxx.vercel.app`

---

## 🐛 Si quelque chose ne fonctionne pas

### Le backend ne démarre pas

1. Vérifiez les **logs** dans Vercel :
   - Allez dans votre projet backend
   - Cliquez sur **"Deployments"**
   - Cliquez sur le dernier déploiement
   - Regardez les **"Build Logs"** et **"Function Logs"**

2. Vérifiez que `DATABASE_URL` est correcte :
   - Doit contenir votre mot de passe
   - Doit se terminer par `?sslmode=require`

### Le frontend ne peut pas se connecter au backend

1. Vérifiez que `VITE_API_URL` est correcte :
   - Doit être l'URL complète du backend (sans `/api` à la fin)
   - Exemple : `https://alcool-tracker-backend-xxxxx.vercel.app`

2. Vérifiez que `FRONTEND_URL` dans le backend correspond au frontend

3. Ouvrez la console du navigateur (F12) et regardez les erreurs

### La base de données ne fonctionne pas

1. Vérifiez que la connection string est correcte :
   - Testez avec `npx prisma studio` en local
   - Vérifiez que le mot de passe est correct

2. Vérifiez que les migrations sont exécutées :
   - En local : `cd backend && npx prisma migrate deploy`

---

## 📞 Besoin d'aide ?

Si vous êtes bloqué, vérifiez :
1. Les logs dans Vercel (Deployments → Logs)
2. La console du navigateur (F12)
3. Le guide détaillé : `VERCEL_DEPLOYMENT.md`

---

**Félicitations ! Votre application est maintenant en ligne ! 🚀**

