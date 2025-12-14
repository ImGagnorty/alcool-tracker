import express from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest, requirePremium } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Validation schema
const createBarSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().optional(),
  country: z.string().default('France')
});

const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional()
});

// Get all bars
router.get('/', async (req, res) => {
  try {
    const { city, search, page = '1', limit = '50' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (city) where.city = { contains: city as string, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { address: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [bars, total] = await Promise.all([
      prisma.bar.findMany({
        where,
        include: {
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        }
      }),
      prisma.bar.count({ where })
    ]);

    // Calculate average rating for each bar
    const barsWithRating = bars.map(bar => {
      const avgRating = bar.reviews.length > 0
        ? bar.reviews.reduce((sum, r) => sum + r.rating, 0) / bar.reviews.length
        : 0;
      return {
        ...bar,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: bar._count.reviews,
        reviews: undefined,
        _count: undefined
      };
    });

    res.json({
      bars: barsWithRating,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get bars error:', error);
    res.status(500).json({ error: 'Failed to fetch bars' });
  }
});

// Get bar by ID
router.get('/:id', async (req, res) => {
  try {
    const bar = await prisma.bar.findUnique({
      where: { id: req.params.id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            reviews: true,
            consumptions: true
          }
        }
      }
    });

    if (!bar) {
      return res.status(404).json({ error: 'Bar not found' });
    }

    const avgRating = bar.reviews.length > 0
      ? bar.reviews.reduce((sum, r) => sum + r.rating, 0) / bar.reviews.length
      : 0;

    res.json({
      ...bar,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: bar._count.reviews
    });
  } catch (error) {
    console.error('Get bar error:', error);
    res.status(500).json({ error: 'Failed to fetch bar' });
  }
});

// Create bar (Premium only)
router.post('/', authenticateToken, requirePremium, async (req: AuthRequest, res) => {
  try {
    const data = createBarSchema.parse(req.body);
    const bar = await prisma.bar.create({ data });
    res.status(201).json(bar);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create bar error:', error);
    res.status(500).json({ error: 'Failed to create bar' });
  }
});

// Create or update review (Premium only)
router.post('/:id/reviews', authenticateToken, requirePremium, async (req: AuthRequest, res) => {
  try {
    const { rating, comment } = createReviewSchema.parse(req.body);
    const barId = req.params.id;

    // Check if bar exists
    const bar = await prisma.bar.findUnique({
      where: { id: barId }
    });

    if (!bar) {
      return res.status(404).json({ error: 'Bar not found' });
    }

    // Upsert review (create or update)
    const review = await prisma.barReview.upsert({
      where: {
        userId_barId: {
          userId: req.userId!,
          barId: barId
        }
      },
      update: {
        rating,
        comment: comment || null
      },
      create: {
        userId: req.userId!,
        barId: barId,
        rating,
        comment: comment || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.status(201).json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Get user's visited bars (Premium only)
router.get('/user/visited', authenticateToken, requirePremium, async (req: AuthRequest, res) => {
  try {
    const bars = await prisma.bar.findMany({
      where: {
        consumptions: {
          some: {
            userId: req.userId!
          }
        }
      },
      include: {
        reviews: {
          where: {
            userId: req.userId!
          }
        },
        _count: {
          select: {
            consumptions: {
              where: {
                userId: req.userId!
              }
            }
          }
        }
      }
    });

    res.json(bars);
  } catch (error) {
    console.error('Get visited bars error:', error);
    res.status(500).json({ error: 'Failed to fetch visited bars' });
  }
});

export default router;

