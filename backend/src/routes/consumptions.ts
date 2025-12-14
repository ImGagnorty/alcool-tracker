import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken, AuthRequest, requirePremium } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schema
const createConsumptionSchema = z.object({
  alcoholId: z.string().uuid(),
  quantity: z.number().min(0.1),
  volumeConsumed: z.number().min(0).optional(), // Volume réel consommé en mL
  format: z.string().optional(), // Format choisi (ex: "Demi", "Pinte", "Shot 2cl")
  date: z.string().datetime().optional(),
  barId: z.string().uuid().optional(),
  photoUrl: z.string().url().optional(),
  notes: z.string().optional()
});

// Get user's consumptions
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    console.log('Get consumptions request received');
    console.log('User ID:', req.userId);
    
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User ID not found in request' });
    }

    const {
      startDate,
      endDate,
      alcoholId,
      page = '1',
      limit = '50'
    } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      userId: req.userId
    };

    if (startDate) where.date = { gte: new Date(startDate as string) };
    if (endDate) {
      where.date = {
        ...where.date,
        lte: new Date(endDate as string)
      };
    }
    if (alcoholId) where.alcoholId = alcoholId;

    console.log('Query where clause:', JSON.stringify(where));

    const [consumptions, total] = await Promise.all([
      prisma.consumption.findMany({
        where,
        include: {
          alcohol: true,
          bar: true
        },
        orderBy: { date: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.consumption.count({ where })
    ]);

    console.log(`Found ${consumptions.length} consumptions for user ${req.userId}`);

    res.json({
      consumptions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('=== GET CONSUMPTIONS ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    try {
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } catch (e) {
      console.error('Could not stringify error:', e);
    }
    console.error('=== GET CONSUMPTIONS ERROR END ===');
    
    // Check for Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any;
      if (prismaError.code === 'P1001' || prismaError.code === 'P1000' || prismaError.name === 'PrismaClientInitializationError') {
        return res.status(500).json({ 
          error: 'Database connection failed',
          message: 'Cannot reach database server. Please check DATABASE_URL configuration.'
        });
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch consumptions',
      message: process.env.NODE_ENV !== 'production' ? (error instanceof Error ? error.message : String(error)) : 'Failed to fetch consumptions'
    });
  }
});

// Get consumption by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const consumption = await prisma.consumption.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!
      },
      include: {
        alcohol: true,
        bar: true
      }
    });

    if (!consumption) {
      return res.status(404).json({ error: 'Consumption not found' });
    }

    res.json(consumption);
  } catch (error) {
    console.error('Get consumption error:', error);
    res.status(500).json({ error: 'Failed to fetch consumption' });
  }
});

// Create consumption
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const data = createConsumptionSchema.parse(req.body);
    
    // Check if alcohol exists
    const alcohol = await prisma.alcohol.findUnique({
      where: { id: data.alcoholId }
    });

    if (!alcohol) {
      return res.status(404).json({ error: 'Alcohol not found' });
    }

    // Check premium features
    if ((data.barId || data.photoUrl) && !req.user?.isPremium) {
      return res.status(403).json({ error: 'Premium subscription required for this feature' });
    }

    // Check if bar exists (if provided)
    if (data.barId) {
      const bar = await prisma.bar.findUnique({
        where: { id: data.barId }
      });
      if (!bar) {
        return res.status(404).json({ error: 'Bar not found' });
      }
    }

    const consumption = await prisma.consumption.create({
      data: {
        userId: req.userId!,
        alcoholId: data.alcoholId,
        quantity: data.quantity,
        volumeConsumed: data.volumeConsumed || null,
        format: data.format || null,
        date: data.date ? new Date(data.date) : new Date(),
        barId: data.barId || null,
        photoUrl: data.photoUrl || null,
        notes: data.notes || null
      },
      include: {
        alcohol: true,
        bar: true
      }
    });

    res.status(201).json(consumption);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create consumption error:', error);
    res.status(500).json({ error: 'Failed to create consumption' });
  }
});

// Update consumption
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const consumption = await prisma.consumption.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!
      }
    });

    if (!consumption) {
      return res.status(404).json({ error: 'Consumption not found' });
    }

    const updateData: any = {};
    if (req.body.quantity !== undefined) updateData.quantity = req.body.quantity;
    if (req.body.volumeConsumed !== undefined) updateData.volumeConsumed = req.body.volumeConsumed;
    if (req.body.format !== undefined) updateData.format = req.body.format;
    if (req.body.date !== undefined) updateData.date = new Date(req.body.date);
    if (req.body.notes !== undefined) updateData.notes = req.body.notes;
    
    // Premium features
    if (req.body.barId !== undefined) {
      if (!req.user?.isPremium) {
        return res.status(403).json({ error: 'Premium subscription required' });
      }
      updateData.barId = req.body.barId;
    }
    if (req.body.photoUrl !== undefined) {
      if (!req.user?.isPremium) {
        return res.status(403).json({ error: 'Premium subscription required' });
      }
      updateData.photoUrl = req.body.photoUrl;
    }

    const updated = await prisma.consumption.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        alcohol: true,
        bar: true
      }
    });

    res.json(updated);
  } catch (error) {
    console.error('Update consumption error:', error);
    res.status(500).json({ error: 'Failed to update consumption' });
  }
});

// Delete consumption
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const consumption = await prisma.consumption.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!
      }
    });

    if (!consumption) {
      return res.status(404).json({ error: 'Consumption not found' });
    }

    await prisma.consumption.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Consumption deleted successfully' });
  } catch (error) {
    console.error('Delete consumption error:', error);
    res.status(500).json({ error: 'Failed to delete consumption' });
  }
});

export default router;

