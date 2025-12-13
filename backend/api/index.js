// Point d'entrée serverless pour Vercel
// Ce fichier est automatiquement détecté par Vercel dans le dossier api/

const app = require('../dist/index.js');

// Vercel attend un handler par défaut
module.exports = app.default || app;

