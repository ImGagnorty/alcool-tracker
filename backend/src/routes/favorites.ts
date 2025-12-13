import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's favorites
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const favorites = await prisma.userFavorite.findMany({
      where: { userId: req.userId! },
      include: {
        alcohol: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add to favorites
router.post('/:alcoholId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const alcoholId = req.params.alcoholId;

    // Check if alcohol exists
    const alcohol = await prisma.alcohol.findUnique({
      where: { id: alcoholId }
    });

    if (!alcohol) {
      return res.status(404).json({ error: 'Alcohol not found' });
    }

    // Check if already favorite
    const existing = await prisma.userFavorite.findUnique({
      where: {
        userId_alcoholId: {
          userId: req.userId!,
          alcoholId: alcoholId
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Already in favorites' });
    }

    const favorite = await prisma.userFavorite.create({
      data: {
        userId: req.userId!,
        alcoholId: alcoholId
      },
      include: {
        alcohol: true
      }
    });

    res.status(201).json(favorite.alcohol);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Already in favorites' });
    }
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// Remove from favorites
router.delete('/:alcoholId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const alcoholId = req.params.alcoholId;

    const favorite = await prisma.userFavorite.findUnique({
      where: {
        userId_alcoholId: {
          userId: req.userId!,
          alcoholId: alcoholId
        }
      }
    });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    await prisma.userFavorite.delete({
      where: {
        userId_alcoholId: {
          userId: req.userId!,
          alcoholId: alcoholId
        }
      }
    });

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

// Check if alcohol is favorite
router.get('/:alcoholId/check', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const alcoholId = req.params.alcoholId;

    const favorite = await prisma.userFavorite.findUnique({
      where: {
        userId_alcoholId: {
          userId: req.userId!,
          alcoholId: alcoholId
        }
      }
    });

    res.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({ error: 'Failed to check favorite' });
  }
});

export default router;

