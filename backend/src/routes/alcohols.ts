import express from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Validation schema
const createAlcoholSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  type: z.enum(['BEER', 'WINE', 'VODKA', 'WHISKY', 'RUM', 'GIN', 'TEQUILA', 'CHAMPAGNE', 'COGNAC', 'LIQUEUR', 'CIDER', 'OTHER']),
  alcoholRate: z.number().min(0).max(100),
  sugarRate: z.number().min(0).optional(),
  price: z.number().min(0).optional(),
  volume: z.number().min(0),
  imageUrl: z.string().url().optional(),
  description: z.string().optional()
});

// Get all alcohols with filters
router.get('/', async (req, res) => {
  try {
    const {
      type,
      brand,
      minAlcoholRate,
      maxAlcoholRate,
      minPrice,
      maxPrice,
      search,
      page = '1',
      limit = '50'
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (type) where.type = type;
    if (brand) where.brand = { contains: brand as string, mode: 'insensitive' };
    if (minAlcoholRate) where.alcoholRate = { gte: parseFloat(minAlcoholRate as string) };
    if (maxAlcoholRate) {
      where.alcoholRate = {
        ...where.alcoholRate,
        lte: parseFloat(maxAlcoholRate as string)
      };
    }
    if (minPrice) where.price = { gte: parseFloat(minPrice as string) };
    if (maxPrice) {
      where.price = {
        ...where.price,
        lte: parseFloat(maxPrice as string)
      };
    }
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { brand: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [alcohols, total] = await Promise.all([
      prisma.alcohol.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { name: 'asc' }
      }),
      prisma.alcohol.count({ where })
    ]);

    res.json({
      alcohols,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('=== GET ALCOHOLS ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    try {
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } catch (e) {
      console.error('Could not stringify error:', e);
    }
    console.error('=== GET ALCOHOLS ERROR END ===');
    
    res.status(500).json({ 
      error: 'Failed to fetch alcohols',
      message: process.env.NODE_ENV !== 'production' ? (error instanceof Error ? error.message : String(error)) : 'Failed to fetch alcohols'
    });
  }
});

// Get alcohol by ID
router.get('/:id', async (req, res) => {
  try {
    const alcohol = await prisma.alcohol.findUnique({
      where: { id: req.params.id }
    });

    if (!alcohol) {
      return res.status(404).json({ error: 'Alcohol not found' });
    }

    res.json(alcohol);
  } catch (error) {
    console.error('Get alcohol error:', error);
    res.status(500).json({ error: 'Failed to fetch alcohol' });
  }
});

// Create alcohol (admin only - for now, allow authenticated users)
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const data = createAlcoholSchema.parse(req.body);
    const alcohol = await prisma.alcohol.create({ data });
    res.status(201).json(alcohol);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create alcohol error:', error);
    res.status(500).json({ error: 'Failed to create alcohol' });
  }
});

export default router;

