# 🔧 Correction des erreurs 403 (Forbidden)

## Problème

Les erreurs 403 sur les routes API (`/api/statistics`, `/api/consumptions`, etc.) indiquent que les requêtes sont bloquées.

## Causes possibles

### 1. Frontend et Backend sur des projets Vercel séparés

Si le frontend et le backend sont déployés sur des projets Vercel différents :
- Frontend : `alcool-tracker.vercel.app`
- Backend : `alcool-tracker-backend.vercel.app` (ou autre)

**Solution** : Configurer `VITE_API_URL` dans les variables d'environnement Vercel du frontend :

```
VITE_API_URL=https://alcool-tracker-backend.vercel.app/api
```

### 2. Frontend et Backend sur le même projet Vercel

Si les deux sont sur le même projet, Vercel doit router les requêtes `/api` vers le backend.

**Vérification** :
1. Dans Vercel, vérifiez que le backend est configuré avec `backend` comme root directory
2. Vérifiez que `backend/api/index.ts` existe
3. Les requêtes `/api/*` devraient être automatiquement routées vers le backend

### 3. Problème CORS

Si les requêtes sont bloquées par CORS, vérifiez :
1. Que `NODE_ENV=production` est défini dans Vercel
2. Que l'origine du frontend est bien autorisée dans `backend/src/index.ts`
3. Les logs Vercel pour voir les messages "CORS blocked origin"

## Configuration recommandée

### Option A : Projets séparés (recommandé)

**Frontend Vercel** :
- Root Directory : `frontend`
- Variables d'environnement :
  ```
  VITE_API_URL=https://alcool-tracker-backend.vercel.app/api
  ```

**Backend Vercel** :
- Root Directory : `backend`
- Variables d'environnement : (automatiques via intégration Supabase)

### Option B : Même projet

**Vercel** :
- Root Directory : (racine du projet)
- Build Command : `cd backend && npm run build && cd ../frontend && npm run build`
- Les requêtes `/api/*` sont automatiquement routées vers `backend/api/`

## Vérification

1. **Testez l'endpoint backend directement** :
   ```bash
   curl https://alcool-tracker-backend.vercel.app/api/health
   ```
   Devrait retourner : `{"status":"ok",...}`

2. **Vérifiez les logs Vercel** :
   - Regardez les logs de runtime pour voir les erreurs CORS
   - Cherchez "CORS blocked origin" dans les logs

3. **Testez avec un token** :
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        https://alcool-tracker-backend.vercel.app/api/statistics
   ```

## Correction appliquée

Le code a été mis à jour pour :
- Améliorer la gestion des erreurs 403 dans le frontend
- Détecter automatiquement l'environnement de production
- Rediriger vers login si l'utilisateur n'est pas authentifié

