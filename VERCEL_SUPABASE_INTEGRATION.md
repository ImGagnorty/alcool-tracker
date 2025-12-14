# 🔗 Intégration Vercel-Supabase - Configuration

Ce document explique comment l'application est configurée pour utiliser l'intégration automatique Vercel-Supabase.

## 📋 Variables d'environnement créées automatiquement

L'intégration Vercel-Supabase crée automatiquement les variables suivantes :

### Variables PostgreSQL
- `POSTGRES_URL` - URL de connexion principale
- `POSTGRES_PRISMA_URL` - URL optimisée pour Prisma avec connection pooling (recommandé)
- `POSTGRES_URL_NON_POOLING` - URL sans pooling (fallback)
- `POSTGRES_USER` - Nom d'utilisateur
- `POSTGRES_HOST` - Hôte de la base de données
- `POSTGRES_PASSWORD` - Mot de passe (sensible)
- `POSTGRES_DATABASE` - Nom de la base de données

### Variables Supabase
- `SUPABASE_URL` - URL de l'instance Supabase
- `SUPABASE_ANON_KEY` - Clé anonyme Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Clé de service (sensible)
- `SUPABASE_JWT_SECRET` - Secret JWT Supabase (peut être utilisé pour l'authentification)
- `SUPABASE_PUBLISHABLE_KEY` - Clé publique
- `SUPABASE_SECRET_KEY` - Clé secrète (sensible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé anonyme publique (pour frontend)
- `NEXT_PUBLIC_SUPABASE_URL` - URL publique Supabase

## 🔧 Mapping automatique

Le fichier `backend/src/config/env.ts` mappe automatiquement les variables créées par l'intégration vers les noms utilisés par l'application :

### DATABASE_URL
L'application utilise `DATABASE_URL` pour Prisma. Le mapping se fait dans cet ordre :
1. `POSTGRES_PRISMA_URL` (priorité - optimisé pour Prisma)
2. `POSTGRES_URL` (fallback)
3. `POSTGRES_URL_NON_POOLING` (dernier recours)

### JWT_SECRET
L'application utilise `JWT_SECRET` pour signer les tokens. Le mapping se fait ainsi :
1. `JWT_SECRET` (si défini manuellement)
2. `SUPABASE_JWT_SECRET` (utilisé automatiquement si JWT_SECRET n'est pas défini)

## ✅ Validation

Au démarrage, l'application valide que toutes les variables requises sont présentes :
- `DATABASE_URL` (ou une des variables POSTGRES_*)
- `JWT_SECRET` (ou SUPABASE_JWT_SECRET)

Si des variables manquent, l'application affiche un message d'erreur détaillé avec la liste des variables disponibles.

## 🚀 Déploiement

### Configuration Vercel

1. **Root Directory** : Si votre backend est dans un sous-dossier, configurez `backend` comme root directory dans Vercel

2. **Build Command** : `npm run build` (s'exécute dans le dossier backend)

3. **Install Command** : `npm install` (s'exécute dans le dossier backend)

4. **Output Directory** : Laissé vide (Vercel gère automatiquement)

### Variables d'environnement

Les variables sont automatiquement synchronisées depuis Supabase via l'intégration Vercel-Supabase. Vous n'avez **pas besoin** de les configurer manuellement.

Cependant, si vous devez ajouter des variables supplémentaires :

- `FRONTEND_URL` : URL du frontend (optionnel, par défaut: http://localhost:3000)
- `JWT_EXPIRES_IN` : Durée de validité des tokens JWT (optionnel, par défaut: 7d)
- `PORT` : Port du serveur (optionnel, par défaut: 3001)

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Vérifiez les logs Vercel** : Les logs de build doivent afficher :
   ```
   ✅ Configuration des variables d'environnement validée
     - DATABASE_URL: ✓ configuré
     - JWT_SECRET: ✓ configuré
   ```

2. **Testez l'endpoint de santé** : 
   ```
   GET https://votre-backend.vercel.app/api/health
   ```
   Devrait retourner : `{"status":"ok","message":"Alcool Tracker API is running"}`

3. **Testez l'authentification** :
   ```
   POST https://votre-backend.vercel.app/api/auth/register
   ```

## 🐛 Dépannage

### Erreur : "DATABASE_URL is not configured"

**Cause** : Aucune variable PostgreSQL n'est disponible.

**Solution** :
1. Vérifiez que l'intégration Vercel-Supabase est bien activée
2. Vérifiez dans le dashboard Vercel que les variables `POSTGRES_*` sont présentes
3. Si nécessaire, reconnectez l'intégration Supabase dans Vercel

### Erreur : "JWT_SECRET is not configured"

**Cause** : Aucune variable JWT n'est disponible.

**Solution** :
1. Vérifiez que `SUPABASE_JWT_SECRET` est présent dans Vercel
2. Ou ajoutez manuellement `JWT_SECRET` dans les variables d'environnement Vercel

### Erreur 500 sur toutes les routes

**Causes possibles** :
1. Variables d'environnement manquantes (voir ci-dessus)
2. Prisma Client non généré (vérifiez que `postinstall` s'exécute)
3. Problème de connexion à la base de données (vérifiez les logs Vercel)

**Solution** :
1. Vérifiez les logs de déploiement Vercel
2. Vérifiez les logs de runtime dans le dashboard Vercel
3. Testez la connexion à la base de données avec Prisma Studio localement

## 📝 Notes importantes

- **Ne commitez jamais** les variables d'environnement dans Git
- Les variables sensibles sont automatiquement masquées dans Vercel
- L'intégration Vercel-Supabase synchronise automatiquement les variables
- Le mapping automatique permet de ne pas modifier le code si les noms de variables changent

## 🔗 Ressources

- [Documentation Vercel - Variables d'environnement](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentation Supabase - Intégration Vercel](https://supabase.com/docs/guides/integrations/vercel)
- [Documentation Prisma - Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)

