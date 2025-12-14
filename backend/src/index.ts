import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth';
import alcoholRoutes from './routes/alcohols';
import consumptionRoutes from './routes/consumptions';
import statisticsRoutes from './routes/statistics';
import barRoutes from './routes/bars';
import favoriteRoutes from './routes/favorites';
import leaderboardRoutes from './routes/leaderboard';
import clanRoutes from './routes/clans';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware CORS - Autoriser plusieurs origines en production
const allowedOrigins: string[] = process.env.NODE_ENV === 'production'
  ? [
      FRONTEND_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
      process.env.FRONTEND_VERCEL_URL
    ].filter((url): url is string => url !== undefined)
  : [FRONTEND_URL, 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Autoriser les requêtes sans origine (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Alcool Tracker API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alcohols', alcoholRoutes);
app.use('/api/consumptions', consumptionRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/bars', barRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/clans', clanRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server (seulement si pas sur Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

// Export pour Vercel serverless
// Vercel utilise @vercel/node qui attend un handler Express
// Export ES module
export default app;

// Export CommonJS pour compatibilité (nécessaire pour api/index.js)
module.exports = app;

