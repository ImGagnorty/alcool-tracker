import express from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  name: z.string().optional(),
  dateOfBirth: z.string().refine((date) => {
    if (!date) return false;
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }, 'Vous devez avoir au moins 18 ans pour utiliser cette application'),
  acceptedTerms: z.boolean().refine((val) => val === true, 'Vous devez accepter les conditions d\'utilisation'),
  acceptedRules: z.boolean().refine((val) => val === true, 'Vous devez accepter les règles et consignes d\'utilisation')
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Register request received');
    
    // Check environment variables first
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ error: 'Server configuration error: JWT_SECRET missing' });
    }
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not configured');
      return res.status(500).json({ error: 'Server configuration error: DATABASE_URL missing' });
    }
    
    const { email, password, name, dateOfBirth, acceptedTerms, acceptedRules } = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        acceptedTerms,
        acceptedRules,
        termsAcceptedAt: acceptedTerms ? new Date() : null
      },
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        blurUsername: true,
        createdAt: true
      }
    });

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '7d';

    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const payload = { userId: user.id, email: user.email, isPremium: user.isPremium };
    const options: jwt.SignOptions = { expiresIn: jwtExpiresIn as jwt.SignOptions['expiresIn'] };
    const token = jwt.sign(payload, jwtSecret, options);

    res.status(201).json({
      user,
      token
    });
  } catch (error) {
    // Log the full error first for debugging
    console.error('=== REGISTER ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Try to stringify the error for more details
    try {
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } catch (e) {
      console.error('Could not stringify error:', e);
    }
    console.error('=== REGISTER ERROR END ===');
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return res.status(400).json({ 
        error: 'Invalid input', 
        message: errorMessages,
        details: error.errors 
      });
    }
    
    // Check for specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any;
      
      // Unique constraint violation (email already exists)
      if (prismaError.code === 'P2002') {
        const field = prismaError.meta?.target?.[0] || 'field';
        return res.status(400).json({ 
          error: `${field === 'email' ? 'Email' : 'Field'} already exists`,
          message: 'This email is already registered'
        });
      }
      
      // Database connection errors
      if (prismaError.code === 'P1001' || prismaError.code === 'P1000' || prismaError.name === 'PrismaClientInitializationError') {
        console.error('Database connection error - DATABASE_URL might be incorrect or database is unreachable');
        console.error('Error details:', prismaError.message);
        
        // Check for max clients error (Supabase pool exhaustion)
        if (prismaError.message?.includes('MaxClientsInSessionMode') || prismaError.message?.includes('max clients reached')) {
          return res.status(500).json({ 
            error: 'Database connection pool exhausted',
            message: 'Too many database connections. Please: 1) Use Transaction mode instead of Session mode in Supabase Connection Pooling, 2) Wait a few seconds and try again, 3) Consider using Prisma Data Proxy or Prisma Accelerate for better connection management.'
          });
        }
        
        // Check if it's a Supabase connection issue
        const isSupabase = prismaError.message?.includes('supabase') || process.env.DATABASE_URL?.includes('supabase');
        if (isSupabase) {
          return res.status(500).json({ 
            error: 'Database connection failed',
            message: 'Cannot reach Supabase database. Please check: 1) DATABASE_URL uses connection pooling (port 6543 or ?pgbouncer=true), 2) Use Transaction mode instead of Session mode, 3) Database is running, 4) IP restrictions allow Vercel IPs.'
          });
        }
        
        return res.status(500).json({ 
          error: 'Database connection failed',
          message: 'Cannot reach database server. Please check DATABASE_URL configuration and ensure the database is accessible.'
        });
      }
      
      // Table/column doesn't exist (migration not run)
      if (prismaError.code === 'P2021' || prismaError.code === 'P2025') {
        console.error('Database schema error - migrations might not be applied');
        return res.status(500).json({ 
          error: 'Database schema error',
          message: 'Database schema is not up to date. Please run migrations.'
        });
      }
    }
    
    // Return more detailed error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    res.status(500).json({ 
      error: 'Registration failed',
      message: isDevelopment ? errorMessage : 'Registration failed. Please check server logs for details.',
      ...(isDevelopment && { 
        stack: error instanceof Error ? error.stack : undefined,
        details: error instanceof Error ? error.toString() : String(error)
      })
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received');
    
    // Check environment variables first
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ error: 'Server configuration error: JWT_SECRET missing' });
    }
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not configured');
      return res.status(500).json({ error: 'Server configuration error: DATABASE_URL missing' });
    }
    
    const { email, password } = loginSchema.parse(req.body);
    console.log('Login attempt for email:', email);

    // Find user
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
    } catch (dbError: any) {
      console.error('Database error during user lookup:', dbError);
      if (dbError.code === 'P1001' || dbError.code === 'P1000' || dbError.name === 'PrismaClientInitializationError') {
        return res.status(500).json({ 
          error: 'Database connection failed',
          message: 'Cannot reach database server. Please check DATABASE_URL configuration.'
        });
      }
      throw dbError;
    }

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User found, checking password...');

    // Check password
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.password);
    } catch (bcryptError) {
      console.error('Bcrypt error:', bcryptError);
      return res.status(500).json({ error: 'Password verification failed' });
    }

    if (!isValidPassword) {
      console.log('Invalid password for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Password valid, generating token...');

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '7d';

    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const payload = { userId: user.id, email: user.email, isPremium: user.isPremium };
    const options: jwt.SignOptions = { expiresIn: jwtExpiresIn as jwt.SignOptions['expiresIn'] };
    let token;
    try {
      token = jwt.sign(payload, jwtSecret, options);
    } catch (jwtError) {
      console.error('JWT signing error:', jwtError);
      return res.status(500).json({ error: 'Token generation failed' });
    }

    console.log('Login successful for user:', user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        premiumUntil: user.premiumUntil,
        blurUsername: user.blurUsername || false
      },
      token
    });
  } catch (error) {
    console.error('=== LOGIN ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    try {
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } catch (e) {
      console.error('Could not stringify error:', e);
    }
    console.error('=== LOGIN ERROR END ===');
    
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return res.status(400).json({ 
        error: 'Invalid input', 
        message: errorMessages,
        details: error.errors 
      });
    }
    
    // Check for Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any;
      if (prismaError.code === 'P1001' || prismaError.code === 'P1000' || prismaError.name === 'PrismaClientInitializationError') {
        // Check for max clients error (Supabase pool exhaustion)
        if (prismaError.message?.includes('MaxClientsInSessionMode') || prismaError.message?.includes('max clients reached')) {
          return res.status(500).json({ 
            error: 'Database connection pool exhausted',
            message: 'Too many database connections. Please: 1) Use Transaction mode instead of Session mode in Supabase Connection Pooling, 2) Wait a few seconds and try again.'
          });
        }
        return res.status(500).json({ 
          error: 'Database connection failed',
          message: 'Cannot reach database server. Please check DATABASE_URL configuration.'
        });
      }
    }
    
    res.status(500).json({ 
      error: 'Login failed',
      message: process.env.NODE_ENV !== 'production' ? (error instanceof Error ? error.message : String(error)) : 'Login failed. Please check server logs for details.'
    });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        premiumUntil: true,
        blurUsername: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Update user profile
router.put('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const updateSchema = z.object({
      name: z.string().optional(),
      blurUsername: z.boolean().optional()
    });

    const data = updateSchema.parse(req.body);

    const updated = await prisma.user.update({
      where: { id: req.userId! },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        premiumUntil: true,
        blurUsername: true,
        createdAt: true
      }
    });

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const changePasswordSchema = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(6)
    });

    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.userId! }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: req.userId! },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

export default router;

