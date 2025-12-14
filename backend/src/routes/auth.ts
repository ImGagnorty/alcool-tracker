import express from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

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
      if (prismaError.code === 'P1001' || prismaError.code === 'P1000') {
        console.error('Database connection error - DATABASE_URL might be incorrect or database is unreachable');
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
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '7d';

    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const payload = { userId: user.id, email: user.email, isPremium: user.isPremium };
    const options: jwt.SignOptions = { expiresIn: jwtExpiresIn as jwt.SignOptions['expiresIn'] };
    const token = jwt.sign(payload, jwtSecret, options);

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
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
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

