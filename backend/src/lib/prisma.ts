import { PrismaClient } from '@prisma/client';

// Singleton pattern pour PrismaClient
// Important pour Vercel serverless : réutilise les connexions entre les invocations
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// S'assurer que DATABASE_URL est défini (peut venir de POSTGRES_PRISMA_URL via config/env.ts)
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured. Please set DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL');
}

// Configuration optimisée pour Vercel serverless et Supabase
const prismaClientOptions = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  // Configuration pour réduire les connexions
  // En serverless, on veut des connexions courtes
  __internal: {
    engine: {
      // Réduire le timeout pour libérer les connexions plus rapidement
      connectTimeout: 10000,
    },
  },
} as any;

// En production (Vercel), on crée une nouvelle instance à chaque fois
// En développement, on réutilise l'instance globale pour éviter les connexions multiples
export const prisma =
  global.prisma ||
  new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Fermeture propre des connexions après chaque requête en serverless
if (process.env.VERCEL === '1') {
  // En serverless, on ferme la connexion après un délai pour libérer le pool
  let disconnectTimer: NodeJS.Timeout | null = null;
  
  const scheduleDisconnect = () => {
    if (disconnectTimer) {
      clearTimeout(disconnectTimer);
    }
    // Attendre 5 secondes d'inactivité avant de fermer
    disconnectTimer = setTimeout(async () => {
      try {
        await prisma.$disconnect();
      } catch (e) {
        // Ignore les erreurs de déconnexion
      }
    }, 5000);
  };
  
  // Réinitialiser le timer après chaque requête
  const originalQuery = prisma.$connect.bind(prisma);
  prisma.$connect = async () => {
    scheduleDisconnect();
    return originalQuery();
  };
}

// Fermeture propre des connexions
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

