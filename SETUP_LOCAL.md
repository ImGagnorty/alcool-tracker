# 🔧 Configuration Locale - AlcoolTracker

Guide pour configurer votre environnement local avant de déployer.

## 📋 Prérequis

- Node.js installé (v18 ou supérieur)
- Un compte Supabase créé
- Une base de données Supabase créée

## 🚀 Configuration en 3 étapes

### Étape 1 : Créer le fichier .env

1. **Ouvrez le dossier `backend`** dans votre explorateur de fichiers

2. **Créez un nouveau fichier** nommé `.env` (sans extension)

   ⚠️ **Sur Windows** :
   - Créez un fichier texte normal
   - Renommez-le en `.env`
   - Windows vous demandera de confirmer → Cliquez "Oui"
   - Si vous ne voyez pas l'extension, allez dans Affichage → Afficher les extensions de fichiers

3. **Ouvrez le fichier `.env`** avec un éditeur de texte (Notepad, VS Code, etc.)

4. **Copiez-collez ceci** dans le fichier :

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@db.xxxxx.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="générez-un-secret-aléatoire"
PORT=3001
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

5. **Remplacez les valeurs** :

   **Pour `DATABASE_URL`** :
   - Récupérez votre connection string depuis Supabase (voir `DEPLOY_SIMPLE.md` étape 1.3)
   - Remplacez `[YOUR-PASSWORD]` par votre vrai mot de passe
   - Ajoutez `?sslmode=require` à la fin si ce n'est pas déjà fait
   - Exemple : `postgresql://postgres:MonMotDePasse123!@db.abcdefghijklmnop.supabase.co:5432/postgres?sslmode=require`

   **Pour `JWT_SECRET`** :
   - Ouvrez un terminal
   - Tapez : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Copiez le résultat (une longue chaîne de caractères)
   - Collez-le entre les guillemets de `JWT_SECRET`

### Étape 2 : Installer les dépendances

Ouvrez un terminal dans le dossier `backend` et tapez :

```bash
cd backend
npm install
```

### Étape 3 : Exécuter les migrations

Les migrations créent les tables dans votre base de données.

1. **Générez le client Prisma** :
   ```bash
   npx prisma generate
   ```

2. **Exécutez les migrations** :
   ```bash
   npx prisma migrate deploy
   ```

   Vous devriez voir :
   ```
   ✅ Applied migration: 20251213003506_alcool_gag
   ✅ Applied migration: 20251213012039_add_format_and_favorites
   ✅ Applied migration: 20251213020254_add_clans_and_blur_username
   ```

3. **Testez la connexion** :
   ```bash
   npx prisma studio
   ```

   Si une page s'ouvre dans votre navigateur avec vos tables, c'est que ça fonctionne ! 🎉

## ✅ Vérification

Votre fichier `.env` devrait ressembler à ça :

```env
DATABASE_URL="postgresql://postgres:MonMotDePasse123!@db.abcdefghijklmnop.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2"
PORT=3001
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

⚠️ **Important** :
- Ne partagez JAMAIS ce fichier
- Ne le commitez JAMAIS dans Git (il est déjà dans `.gitignore`)
- Gardez-le secret !

## 🐛 Problèmes courants

### Erreur : "Can't reach database server"

- Vérifiez que votre `DATABASE_URL` est correcte
- Vérifiez que vous avez bien ajouté `?sslmode=require` à la fin
- Vérifiez que votre mot de passe est correct

### Erreur : "The table `public.bars` does not exist"

- Vous n'avez pas exécuté les migrations !
- Exécutez : `npx prisma migrate deploy`

### Erreur : "password authentication failed"

- Vérifiez que votre mot de passe est correct
- Si votre mot de passe contient des caractères spéciaux (`.`, `@`, `#`, etc.), vous devez les encoder :
  - `.` → `%2E`
  - `@` → `%40`
  - `#` → `%23`
  - Exemple : `Gkc2408vlo.` → `Gkc2408vlo%2E`

### Le fichier .env n'est pas reconnu

- Vérifiez que le fichier s'appelle bien `.env` (pas `.env.txt`)
- Vérifiez qu'il est dans le dossier `backend/` (pas à la racine)
- Sur Windows, vérifiez que les extensions de fichiers sont visibles

## 🎉 C'est prêt !

Une fois que Prisma Studio s'ouvre correctement, vous pouvez continuer avec le déploiement sur Vercel !

Retournez à `DEPLOY_SIMPLE.md` pour la suite.

