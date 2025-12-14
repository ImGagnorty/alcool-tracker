/**
 * Configuration des variables d'environnement
 * Compatible avec l'intégration automatique Vercel-Supabase
 */

// Mapper les variables d'environnement créées par l'intégration Vercel-Supabase
// vers les noms utilisés par l'application

// DATABASE_URL : Utilise POSTGRES_PRISMA_URL (recommandé pour Prisma avec pooling)
// ou POSTGRES_URL en fallback
if (!process.env.DATABASE_URL) {
  if (process.env.POSTGRES_PRISMA_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
  } else if (process.env.POSTGRES_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL;
  } else if (process.env.POSTGRES_URL_NON_POOLING) {
    // Utiliser NON_POOLING seulement si les autres ne sont pas disponibles
    process.env.DATABASE_URL = process.env.POSTGRES_URL_NON_POOLING;
  }
}

// JWT_SECRET : Utilise SUPABASE_JWT_SECRET si disponible, sinon utilise JWT_SECRET
if (!process.env.JWT_SECRET) {
  if (process.env.SUPABASE_JWT_SECRET) {
    process.env.JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
  }
}

// Validation des variables requises
export function validateEnv() {
  const errors: string[] = [];

  if (!process.env.DATABASE_URL) {
    errors.push('DATABASE_URL (ou POSTGRES_PRISMA_URL/POSTGRES_URL) est requis');
  }

  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET (ou SUPABASE_JWT_SECRET) est requis');
  }

  if (errors.length > 0) {
    console.error('❌ Variables d\'environnement manquantes:');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nVariables disponibles:');
    console.error('  - POSTGRES_URL:', process.env.POSTGRES_URL ? '✓' : '✗');
    console.error('  - POSTGRES_PRISMA_URL:', process.env.POSTGRES_PRISMA_URL ? '✓' : '✗');
    console.error('  - POSTGRES_URL_NON_POOLING:', process.env.POSTGRES_URL_NON_POOLING ? '✓' : '✗');
    console.error('  - SUPABASE_JWT_SECRET:', process.env.SUPABASE_JWT_SECRET ? '✓' : '✗');
    console.error('  - JWT_SECRET:', process.env.JWT_SECRET ? '✓' : '✗');
    throw new Error('Configuration invalide: variables d\'environnement manquantes');
  }

  console.log('✅ Configuration des variables d\'environnement validée');
  console.log('  - DATABASE_URL:', process.env.DATABASE_URL ? '✓ configuré' : '✗');
  console.log('  - JWT_SECRET:', process.env.JWT_SECRET ? '✓ configuré' : '✗');
}

// Exporter les variables configurées
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3001',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  VERCEL: process.env.VERCEL === '1',
  VERCEL_URL: process.env.VERCEL_URL,
  FRONTEND_VERCEL_URL: process.env.FRONTEND_VERCEL_URL,
};

