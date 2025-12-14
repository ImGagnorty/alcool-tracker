# 🔐 Explication de la Configuration JWT

## Configuration actuelle

Votre application utilise **`SUPABASE_JWT_SECRET`** comme secret pour signer et vérifier les tokens JWT de l'application.

## Comment ça fonctionne

### 1. Secret de signature (JWT_SECRET)

Le `SUPABASE_JWT_SECRET` est utilisé comme **secret de signature** pour :
- **Signer** les tokens lors de la connexion/inscription
- **Vérifier** les tokens lors des requêtes authentifiées

**C'est correct** ✅ - Vous utilisez le même secret que Supabase, ce qui permet une cohérence si vous utilisez Supabase Auth ailleurs.

### 2. Tokens générés par l'application

L'application génère ses **propres tokens** avec un payload personnalisé :

```typescript
{
  userId: string,      // ID de l'utilisateur dans votre base de données
  email: string,       // Email de l'utilisateur
  isPremium: boolean   // Statut premium
}
```

Ces tokens sont **différents** des tokens Supabase Auth (access tokens, refresh tokens).

## Pourquoi cette approche ?

✅ **Avantages** :
- Contrôle total sur le contenu du token (userId, isPremium, etc.)
- Pas de dépendance à Supabase Auth
- Tokens légers avec seulement les données nécessaires
- Compatible avec votre système d'authentification personnalisé

## Alternative : Utiliser Supabase Auth directement

Si vous voulez utiliser **directement les tokens Supabase Auth**, il faudrait :

1. Intégrer le SDK Supabase dans le frontend
2. Utiliser `supabase.auth.getSession()` pour obtenir les tokens
3. Modifier le backend pour vérifier les tokens Supabase au lieu de générer les vôtres

**Mais ce n'est pas nécessaire** si votre système d'authentification actuel fonctionne.

## Vérification

Pour vérifier que tout fonctionne correctement :

1. **Le secret est bien configuré** :
   - `SUPABASE_JWT_SECRET` est mappé vers `JWT_SECRET` dans `backend/src/config/env.ts`
   - Vérifiez dans les logs Vercel : `✅ Configuration des variables d'environnement validée`

2. **Les tokens sont générés correctement** :
   - Lors de `/api/auth/register` ou `/api/auth/login`, un token est retourné
   - Le token contient `userId`, `email`, `isPremium`

3. **Les tokens sont vérifiés correctement** :
   - Les requêtes avec `Authorization: Bearer <token>` sont acceptées
   - Les requêtes sans token ou avec un token invalide retournent 401/403

## Conclusion

**Votre configuration actuelle est correcte** ✅

Vous utilisez `SUPABASE_JWT_SECRET` comme secret de signature, ce qui est parfait. L'application génère ses propres tokens avec les données nécessaires (userId, email, isPremium), ce qui est la bonne approche pour votre cas d'usage.

**Pas besoin de changer quoi que ce soit** - continuez à utiliser cette configuration !

