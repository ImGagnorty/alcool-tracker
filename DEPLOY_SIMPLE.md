
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
   - `NODE_ENV` = `production` ⚠️ **TRÈS IMPORTANT pour le CORS !**
   - `FRONTEND_URL` = L'URL de votre frontend (ex: `https://alcool-tracker-frontend.vercel.app`)
   - `FRONTEND_VERCEL_URL` = L'URL de votre frontend (ex: `https://alcool-tracker-frontend.vercel.app`)
   - `DATABASE_URL` = Votre URL PostgreSQL
   - `JWT_SECRET` = Votre secret JWT
4. Cochez : ✅ Production, ✅ Preview, ✅ Development pour toutes les variables
5. Cliquez sur **"Save"**
6. Vercel redéploiera automatiquement le backend

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

