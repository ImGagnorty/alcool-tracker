// Point d'entrée serverless pour Vercel
// Vercel détecte automatiquement les fichiers dans api/ comme fonctions serverless
// @vercel/node transpile automatiquement le TypeScript
import app from '../src/index';

// Vercel attend un handler Express
export default app;

