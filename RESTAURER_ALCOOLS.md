# 🍷 Guide : Restaurer la Liste d'Alcools

## Problème
La liste d'alcool a été perdue de la base de données. Il faut réinitialiser les données.

## Solution : Exécuter le Script de Seed

### Option 1 : Via Vercel (Recommandé pour Production)

Le script de seed ne peut pas être exécuté directement sur Vercel. Vous devez l'exécuter localement ou créer un endpoint API temporaire.

### Option 2 : Exécution Locale (Recommandé)

1. **Assurez-vous d'avoir la bonne DATABASE_URL** :
   ```bash
   cd backend
   # Vérifiez votre .env ou utilisez la variable d'environnement
   ```

2. **Exécutez le script de seed** :
   ```bash
   npm run seed
   ```

   Ou directement :
   ```bash
   npx tsx src/scripts/seed.ts
   ```

3. **Vérifiez le résultat** :
   Le script va :
   - Créer ~800+ alcools (bières, vins, champagnes, spiritueux, cocktails)
   - Afficher un résumé des alcools créés
   - Ignorer les alcools qui existent déjà

### Option 3 : Créer un Endpoint API Temporaire

Si vous ne pouvez pas exécuter le script localement, je peux créer un endpoint API temporaire pour exécuter le seed via une requête HTTP.

## Contenu du Seed

Le script crée :
- **Bières** : 100+ références (Kronenbourg, Leffe, Grimbergen, etc.)
- **Vins** : Vins rouges, blancs, rosés
- **Champagnes** : Dom Pérignon, Moët, Veuve Clicquot, etc.
- **Spiritueux** : Vodka, Whisky, Rhum, Gin, Tequila, Cognac
- **Liqueurs** : Diverses liqueurs
- **Cocktails** : Mojito, Margarita, etc.

## Vérification

Après avoir exécuté le seed, vérifiez :
1. Allez sur votre site
2. Page Catalogue
3. Vous devriez voir tous les alcools

## Commandes Utiles

```bash
# Compter les alcools dans la DB
npx prisma studio
# Puis vérifier la table "alcohols"

# Ou via une requête directe
# Dans Prisma Studio ou votre interface DB
SELECT COUNT(*) FROM alcohols;
```

## ⚠️ Important

- Le script ne supprime PAS les alcools existants
- Il ajoute seulement les alcools manquants
- Vous pouvez l'exécuter plusieurs fois sans problème

