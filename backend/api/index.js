// Point d'entrée serverless pour Vercel
const app = require('../dist/index.js');

// Vercel attend un handler par défaut
module.exports = app.default || app;

