# 🚀 Guide de Déploiement Ultra-Simple - AlcoolTracker

Guide pas à pas pour déployer votre application en 15 minutes, même si vous n'êtes pas doué en déploiement !

## 📋 Ce que vous allez faire

1. ✅ Créer une base de données (5 min)
2. ✅ Déployer le backend (3 min)
3. ✅ Déployer le frontend (3 min)
4. ✅ Tester (2 min)

**Total : ~15 minutes**

---

## ÉTAPE 1 : Créer la Base de Données (5 minutes)

### 1.1 Créer un compte Supabase

1. Allez sur : **https://supabase.com**
2. Cliquez sur **"Start your project"** (en haut à droite)
3. Connectez-vous avec **GitHub** (le plus simple)
4. Autorisez Supabase à accéder à votre compte GitHub

### 1.2 Créer un projet

1. Cliquez sur **"New Project"** (bouton vert)
2. Remplissez le formulaire :
   - **Name** : `alcool-tracker` (ou ce que vous voulez)
   - **Database Password** : ⚠️ **IMPORTANT** - Notez ce mot de passe quelque part ! (ex: `MonMotDePasse123!`)
   - **Region** : Choisissez `West Europe` (ou la plus proche)
3. Cliquez sur **"Create new project"**
4. ⏳ Attendez 2-3 minutes que le projet soit créé

### 1.3 Récupérer la connection string

1. Dans votre projet Supabase, cliquez sur **"Settings"** (icône ⚙️ en bas à gauche)
2. Cliquez sur **"Database"** dans le menu
3. Scrollez jusqu'à **"Connection string"**
4. Cliquez sur l'onglet **"URI"** (pas les autres)
5. Vous verrez quelque chose comme :
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Copiez cette connection string** (bouton 📋)
7. ⚠️ **Remplacez `[YOUR-PASSWORD]`** par votre vrai mot de passe

**Exemple** : Si votre mot de passe est `MonMotDePasse123!` et votre connection string est :
```
postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
```

Alors votre connection string finale sera :
```
postgresql://postgres:MonMotDePasse123!@db.abcdefghijklmnop.supabase.co:5432/postgres?sslmode=require
```

⚠️ **Ajoutez `?sslmode=require` à la fin !**

### 1.4 Configurer la connection string localement

**IMPORTANT** : Avant de tester, vous devez créer un fichier `.env` dans le dossier `backend` avec votre connection string.

1. **Créez un fichier `.env`** dans le dossier `backend/` :
   - Ouvrez le dossier `backend` dans votre explorateur de fichiers
   - Créez un nouveau fichier texte
   - Renommez-le en `.env` (sans extension)
   - ⚠️ Si Windows vous demande de confirmer, dites "Oui"

2. **Ouvrez le fichier `.env`** avec un éditeur de texte (Notepad, VS Code, etc.)

3. **Collez ceci dans le fichier** (remplacez par vos vraies valeurs) :
   ```env
   DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
   JWT_SECRET="générez-un-secret-aléatoire"
   PORT=3001
   FRONTEND_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

4. **Remplacez** :
   - `VOTRE_MOT_DE_PASSE` par votre vrai mot de passe Supabase
   - `xxxxx` par votre vrai host Supabase
   - Pour `JWT_SECRET`, ouvrez un terminal et tapez :
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
     Copiez le résultat et collez-le entre les guillemets

**Exemple de fichier `.env` complet** :
```env
DATABASE_URL="postgresql://postgres:MonMotDePasse123!@db.abcdefghijklmnop.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
PORT=3001
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

### 1.5 Exécuter les migrations (OBLIGATOIRE)

Les tables n'existent pas encore dans votre base de données. Il faut les créer avec Prisma :

1. **Ouvrez un terminal** dans le dossier `backend`

2. **Générez le client Prisma** :
   ```bash
   cd backend
   npx prisma generate
   ```

3. **Exécutez les migrations** (crée les tables) :
   ```bash
   npx prisma migrate deploy
   ```

   Vous devriez voir :
   ```
   ✅ Applied migration: 20251213003506_alcool_gag
   ✅ Applied migration: 20251213012039_add_format_and_favorites
   ✅ Applied migration: 20251213020254_add_clans_and_blur_username
   ```

4. **Tester la connexion** :
   ```bash
   npx prisma studio
   ```

   Si une page s'ouvre dans votre navigateur avec vos tables, c'est que ça fonctionne ! 🎉

⚠️ **Si vous avez une erreur** :
- Vérifiez que votre `DATABASE_URL` est correcte dans le fichier `.env`
- Vérifiez que vous avez bien ajouté `?sslmode=require` à la fin
- Vérifiez que votre mot de passe est correct

---

## ÉTAPE 2 : Déployer le Backend (3 minutes)

### 2.1 Se connecter à Vercel

1. Allez sur : **https://vercel.com**
2. Cliquez sur **"Sign Up"** (en haut à droite)
3. Connectez-vous avec **GitHub** (le plus simple)
4. Autorisez Vercel à accéder à votre compte GitHub

### 2.2 Créer le projet backend

1. Dans Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Si votre code n'est pas sur GitHub :
   - Cliquez sur **"Import Git Repository"**
   - Autorisez Vercel à accéder à vos repos
   - Sélectionnez votre repository
3. **Configuration du projet** :
   - **Project Name** : `alcool-tracker-backend` (ou ce que vous voulez)
   - **Root Directory** : Cliquez sur **"Edit"** et tapez : `backend`
   - **Framework Preset** : Laissez **"Other"** (ou sélectionnez-le)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

### 2.3 Ajouter les variables d'environnement

Avant de cliquer sur "Deploy", cliquez sur **"Environment Variables"** et ajoutez :

**Variable 1** :
- **Name** : `DATABASE_URL`
- **Value** : Collez votre connection string complète (avec le mot de passe et `?sslmode=require`)
- Cochez : ✅ Production, ✅ Preview, ✅ Development

**Variable 2** :
- **Name** : `JWT_SECRET`
- **Value** : Générez un secret aléatoire (voir ci-dessous)
- Cochez : ✅ Production, ✅ Preview, ✅ Development

**Pour générer JWT_SECRET** :
- Ouvrez un terminal et tapez :
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Copiez le résultat et collez-le dans la valeur de `JWT_SECRET`

**Variable 3** :
- **Name** : `FRONTEND_URL`
- **Value** : Pour l'instant, mettez `http://localhost:3000` (on le changera après)
- Cochez : ✅ Production, ✅ Preview, ✅ Development

**Variable 4** :
- **Name** : `NODE_ENV`
- **Value** : `production`
- Cochez : ✅ Production, ✅ Preview, ✅ Development

### 2.4 Déployer

1. Cliquez sur **"Deploy"** (bouton en bas)
2. ⏳ Attendez 2-3 minutes
3. ✅ Quand c'est terminé, vous verrez une URL comme : `https://alcool-tracker-backend-xxxxx.vercel.app`
4. **Copiez cette URL** - vous en aurez besoin pour le frontend !

### 2.5 Tester le backend

Ouvrez cette URL dans votre navigateur :
```
https://votre-backend.vercel.app/api/health
```

Vous devriez voir :
```json
{"status":"ok","message":"Alcool Tracker API is running"}
```

✅ Si vous voyez ça, le backend fonctionne !

⚠️ **Si vous avez une erreur 404** :

1. **Vérifiez les logs de build** :
   - Allez dans votre projet Vercel → "Deployments"
   - Cliquez sur le dernier déploiement
   - Regardez les "Build Logs" pour voir s'il y a des erreurs
   - Vérifiez que `npm run build` s'est exécuté sans erreur

2. **Vérifiez que le build a créé les fichiers** :
   - Dans les logs, vous devriez voir que `dist/index.js` a été créé
   - Si vous voyez des erreurs Prisma, vérifiez que `DATABASE_URL` est bien configurée

3. **Vérifiez l'URL** :
   - L'URL doit être : `https://votre-backend.vercel.app/api/health`
   - ⚠️ **Important** : N'oubliez pas `/api/health` à la fin !
   - Pas juste `https://votre-backend.vercel.app` (ça donnera 404)

4. **Redéployez si nécessaire** :
   - Allez dans "Deployments"
   - Cliquez sur les "..." du dernier déploiement
   - Cliquez sur "Redeploy"

---

## ÉTAPE 3 : Déployer le Frontend (3 minutes)

### 3.1 Créer le projet frontend

1. Dans Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez le **même repository** que pour le backend
3. **Configuration du projet** :
   - **Project Name** : `alcool-tracker-frontend` (ou ce que vous voulez)
   - **Root Directory** : Cliquez sur **"Edit"** et tapez : `frontend`
   - **Framework Preset** : Sélectionnez **"Vite"** (Vercel le détectera peut-être automatiquement)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

### 3.2 Ajouter les variables d'environnement

Avant de cliquer sur "Deploy", cliquez sur **"Environment Variables"** et ajoutez :

**Variable 1** :
- **Name** : `VITE_API_URL`
- **Value** : L'URL de votre backend (ex: `https://alcool-tracker-backend-xxxxx.vercel.app`)
- ⚠️ **IMPORTANT** : Pas de `/api` à la fin, juste l'URL de base !
- Cochez : ✅ Production, ✅ Preview, ✅ Development

### 3.3 Déployer

1. Cliquez sur **"Deploy"** (bouton en bas)
2. ⏳ Attendez 2-3 minutes
3. ✅ Quand c'est terminé, vous verrez une URL comme : `https://alcool-tracker-frontend-xxxxx.vercel.app`

### 3.4 Mettre à jour le backend

Maintenant, il faut dire au backend quelle est l'URL du frontend :

1. Retournez dans votre projet **backend** sur Vercel
2. Allez dans **Settings** → **Environment Variables**
3. Trouvez `FRONTEND_URL` et modifiez-la :
   - Remplacez `http://localhost:3000` par l'URL de votre frontend (ex: `https://alcool-tracker-frontend-xxxxx.vercel.app`)
4. Cliquez sur **"Save"**
5. Vercel redéploiera automatiquement le backend

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

