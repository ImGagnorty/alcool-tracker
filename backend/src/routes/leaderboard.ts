import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Get leaderboard
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { period = 'month', type = 'volume' } = req.query; // period: week, month, year | type: volume, spent, consumptions

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get all consumptions in period
    const consumptions = await prisma.consumption.findMany({
      where: {
        date: { gte: startDate }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            blurUsername: true
          }
        },
        alcohol: true
      }
    });

    // Group by user and calculate stats
    const userStats: Record<string, {
      userId: string;
      name: string | null;
      blurUsername: boolean;
      volume: number;
      spent: number;
      consumptions: number;
    }> = {};

    consumptions.forEach(consumption => {
      const userId = consumption.userId;
      if (!userStats[userId]) {
        userStats[userId] = {
          userId,
          name: consumption.user.name,
          blurUsername: consumption.user.blurUsername || false,
          volume: 0,
          spent: 0,
          consumptions: 0
        };
      }

      const volume = consumption.volumeConsumed 
        ? consumption.volumeConsumed * consumption.quantity
        : consumption.quantity * consumption.alcohol.volume;
      
      userStats[userId].volume += volume;
      userStats[userId].consumptions += consumption.quantity;

      if (consumption.alcohol.price) {
        userStats[userId].spent += consumption.quantity * consumption.alcohol.price;
      }
    });

    // Convert to array and sort
    let leaderboard = Object.values(userStats);

    switch (type) {
      case 'volume':
        leaderboard.sort((a, b) => b.volume - a.volume);
        break;
      case 'spent':
        leaderboard.sort((a, b) => b.spent - a.spent);
        break;
      case 'consumptions':
        leaderboard.sort((a, b) => b.consumptions - a.consumptions);
        break;
    }

    // Apply blur if needed
    leaderboard = leaderboard.map(user => ({
      ...user,
      name: user.blurUsername ? blurUsername(user.name || 'Anonyme') : user.name
    }));

    res.json({
      period,
      type,
      leaderboard: leaderboard.slice(0, 100) // Top 100
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Helper function to blur username
function blurUsername(username: string): string {
  if (username.length <= 2) return '**';
  if (username.length <= 4) {
    return username[0] + '*'.repeat(username.length - 1);
  }
  const visible = Math.ceil(username.length / 3);
  return username.slice(0, visible) + '*'.repeat(username.length - visible);
}

// Get clans leaderboard
router.get('/clans', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { period = 'month', type = 'volume' } = req.query;

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get all clans
    const clans = await prisma.clan.findMany({
      include: {
        members: {
          include: {
            user: true
          }
        }
      }
    });

    // Calculate stats per clan
    const clanStats: Record<string, {
      clanId: string;
      clanName: string;
      volume: number;
      spent: number;
      consumptions: number;
    }> = {};

    for (const clan of clans) {
      const memberIds = clan.members.map(m => m.userId);

      const consumptions = await prisma.consumption.findMany({
        where: {
          userId: { in: memberIds },
          date: { gte: startDate }
        },
        include: {
          alcohol: true
        }
      });

      if (!clanStats[clan.id]) {
        clanStats[clan.id] = {
          clanId: clan.id,
          clanName: clan.name,
          volume: 0,
          spent: 0,
          consumptions: 0
        };
      }

      consumptions.forEach(consumption => {
        const volume = consumption.volumeConsumed 
          ? consumption.volumeConsumed * consumption.quantity
          : consumption.quantity * consumption.alcohol.volume;
        
        clanStats[clan.id].volume += volume;
        clanStats[clan.id].consumptions += consumption.quantity;

        if (consumption.alcohol.price) {
          clanStats[clan.id].spent += consumption.quantity * consumption.alcohol.price;
        }
      });
    }

    // Convert to array and sort
    let leaderboard = Object.values(clanStats);

    switch (type) {
      case 'volume':
        leaderboard.sort((a, b) => b.volume - a.volume);
        break;
      case 'spent':
        leaderboard.sort((a, b) => b.spent - a.spent);
        break;
      case 'consumptions':
        leaderboard.sort((a, b) => b.consumptions - a.consumptions);
        break;
    }

    res.json({
      period,
      type,
      leaderboard: leaderboard.slice(0, 100)
    });
  } catch (error) {
    console.error('Get clans leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch clans leaderboard' });
  }
});

export default router;

