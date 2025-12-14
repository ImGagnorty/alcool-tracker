import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Get user statistics
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { period = 'all' } = req.query; // all, year, month, week, day

    const now = new Date();
    let startDate: Date | undefined;

    switch (period) {
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'day':
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        break;
      default:
        startDate = undefined;
    }

    const where: any = { userId: req.userId! };
    if (startDate) {
      where.date = { gte: startDate };
    }

    // Get all consumptions with alcohol data
    const consumptions = await prisma.consumption.findMany({
      where,
      include: {
        alcohol: true
      }
    });

    // Calculate statistics
    let totalVolume = 0; // mL
    let totalAlcohol = 0; // g
    let totalSugar = 0; // g
    let totalSpent = 0; // euros
    const byType: Record<string, { count: number; volume: number; alcohol: number; sugar: number; spent: number }> = {};

    consumptions.forEach(consumption => {
      // Utiliser volumeConsumed si disponible, sinon calculer depuis quantity * volume standard
      const volume = consumption.volumeConsumed 
        ? consumption.volumeConsumed * consumption.quantity
        : consumption.quantity * consumption.alcohol.volume;
      const alcoholGrams = (volume * consumption.alcohol.alcoholRate) / 100;
      const sugarGrams = consumption.alcohol.sugarRate 
        ? (volume * consumption.alcohol.sugarRate) / 1000
        : 0;
      
      totalVolume += volume;
      totalAlcohol += alcoholGrams;
      totalSugar += sugarGrams;
      
      if (consumption.alcohol.price) {
        totalSpent += consumption.quantity * consumption.alcohol.price;
      }

      const type = consumption.alcohol.type;
      if (!byType[type]) {
        byType[type] = { count: 0, volume: 0, alcohol: 0, sugar: 0, spent: 0 };
      }
      byType[type].count += consumption.quantity;
      byType[type].volume += volume;
      byType[type].alcohol += alcoholGrams;
      byType[type].sugar += sugarGrams;
      if (consumption.alcohol.price) {
        byType[type].spent += consumption.quantity * consumption.alcohol.price;
      }
    });

    // Calculate average alcohol rate
    const averageAlcoholRate = consumptions.length > 0
      ? consumptions.reduce((sum, c) => sum + c.alcohol.alcoholRate, 0) / consumptions.length
      : 0;

    // Convert alcohol grams to standard drinks (1 drink = 10g pure alcohol)
    const standardDrinks = totalAlcohol / 10;

    res.json({
      period,
      summary: {
        totalConsumptions: consumptions.length,
        totalVolume: Math.round(totalVolume), // mL
        totalVolumeLiters: Math.round(totalVolume / 10) / 100, // L
        totalAlcoholGrams: Math.round(totalAlcohol * 10) / 10, // g
        totalSugarGrams: Math.round(totalSugar * 10) / 10, // g
        standardDrinks: Math.round(standardDrinks * 10) / 10,
        averageAlcoholRate: Math.round(averageAlcoholRate * 10) / 10,
        totalSpent: Math.round(totalSpent * 100) / 100,
        byType
      },
      health: {
        // Estimations basées sur les recommandations de santé publique
        riskLevel: standardDrinks > 14 ? 'high' : standardDrinks > 7 ? 'moderate' : 'low',
        weeklyAverage: (() => {
          if (period === 'all') {
            const firstDate = consumptions.length > 0 ? consumptions[0].date.getTime() : now.getTime();
            const daysDiff = Math.ceil((now.getTime() - firstDate) / (1000 * 60 * 60 * 24));
            const weeks = Math.max(1, Math.ceil(daysDiff / 7));
            return Math.round((standardDrinks / weeks) * 10) / 10;
          }
          return standardDrinks;
        })()
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get consumption timeline (for charts)
router.get('/timeline', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { period = 'month', groupBy = 'day' } = req.query; // groupBy: day, week, month

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const consumptions = await prisma.consumption.findMany({
      where: {
        userId: req.userId!,
        date: { gte: startDate }
      },
      include: {
        alcohol: true
      },
      orderBy: { date: 'asc' }
    });

    // Group by period
    const timeline: Record<string, { date: string; volume: number; alcohol: number; count: number }> = {};

      consumptions.forEach(consumption => {
        const date = new Date(consumption.date);
        let key: string;

        if (groupBy === 'day') {
          key = date.toISOString().split('T')[0];
        } else if (groupBy === 'week') {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
        } else {
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }

        if (!timeline[key]) {
          timeline[key] = { date: key, volume: 0, alcohol: 0, count: 0 };
        }

        // Utiliser volumeConsumed si disponible
        const volume = consumption.volumeConsumed 
          ? consumption.volumeConsumed * consumption.quantity
          : consumption.quantity * consumption.alcohol.volume;
        const alcoholGrams = (volume * consumption.alcohol.alcoholRate) / 100;

        timeline[key].volume += volume;
        timeline[key].alcohol += alcoholGrams;
        timeline[key].count += consumption.quantity;
      });

    res.json({
      timeline: Object.values(timeline).map(item => ({
        ...item,
        volume: Math.round(item.volume),
        alcohol: Math.round(item.alcohol * 10) / 10
      }))
    });
  } catch (error) {
    console.error('Get timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

// Get most consumed alcohols
router.get('/most-consumed', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { limit = '5' } = req.query;
    const limitNum = parseInt(limit as string, 10) || 5;

    const consumptions = await prisma.consumption.findMany({
      where: {
        userId: req.userId!
      },
      include: {
        alcohol: true
      }
    });

    // Group by alcohol and count
    const alcoholCounts: Record<string, { alcohol: any; count: number }> = {};

    consumptions.forEach(consumption => {
      const alcoholId = consumption.alcoholId;
      if (!alcoholCounts[alcoholId]) {
        alcoholCounts[alcoholId] = {
          alcohol: consumption.alcohol,
          count: 0
        };
      }
      alcoholCounts[alcoholId].count += consumption.quantity;
    });

    // Sort by count and get top
    const mostConsumed = Object.values(alcoholCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, limitNum)
      .map(item => ({
        ...item.alcohol,
        consumptionCount: item.count
      }));

    res.json({ alcohols: mostConsumed });
  } catch (error) {
    console.error('Get most consumed error:', error);
    res.status(500).json({ error: 'Failed to fetch most consumed alcohols' });
  }
});

export default router;

