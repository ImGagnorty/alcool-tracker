import { PrismaClient } from '@prisma/client';

// Singleton pattern pour PrismaClient
// Important pour Vercel serverless : réutilise les connexions entre les invocations
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// En production (Vercel), on crée une nouvelle instance à chaque fois
// En développement, on réutilise l'instance globale pour éviter les connexions multiples
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Fermeture propre des connexions
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

