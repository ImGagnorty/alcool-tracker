// Point d'entrée serverless pour Vercel
// Vercel détecte automatiquement les fichiers dans api/ comme fonctions serverless
const app = require('../dist/index.js');

// Vercel attend un handler Express
// Le fichier dist/index.js exporte avec exports.default et module.exports
module.exports = app.default || app;

