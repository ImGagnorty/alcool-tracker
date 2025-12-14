// Point d'entrée serverless pour Vercel
const app = require('../dist/index.js');

// Vercel attend un handler par défaut
// Gère les exports CommonJS et ES modules
module.exports = app.default || app;

