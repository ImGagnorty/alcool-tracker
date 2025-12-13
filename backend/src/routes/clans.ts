import express from 'express';
import { PrismaClient, ClanRole } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const createClanSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  imageUrl: z.string().url().optional()
});

const inviteSchema = z.object({
  inviteeUsername: z.string().min(1)
});

// Get all clans
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const clans = await prisma.clan.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                blurUsername: true
              }
            }
          }
        },
        _count: {
          select: { members: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(clans);
  } catch (error) {
    console.error('Get clans error:', error);
    res.status(500).json({ error: 'Failed to fetch clans' });
  }
});

// Get user's clan
router.get('/my-clan', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const member = await prisma.clanMember.findFirst({
      where: { userId: req.userId! },
      include: {
        clan: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    blurUsername: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!member) {
      return res.json(null);
    }

    res.json(member.clan);
  } catch (error) {
    console.error('Get my clan error:', error);
    res.status(500).json({ error: 'Failed to fetch clan' });
  }
});

// Create clan
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    // Check if user already has a clan
    const existingMember = await prisma.clanMember.findFirst({
      where: { userId: req.userId! }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'You already belong to a clan' });
    }

    const data = createClanSchema.parse(req.body);

    // Create clan with user as leader
    const clan = await prisma.clan.create({
      data: {
        ...data,
        members: {
          create: {
            userId: req.userId!,
            role: ClanRole.LEADER
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                blurUsername: true
              }
            }
          }
        }
      }
    });

    res.status(201).json(clan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create clan error:', error);
    res.status(500).json({ error: 'Failed to create clan' });
  }
});

// Update clan (leader only)
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const member = await prisma.clanMember.findFirst({
      where: {
        clanId: req.params.id,
        userId: req.userId!
      }
    });

    if (!member || member.role !== ClanRole.LEADER) {
      return res.status(403).json({ error: 'Only the leader can update the clan' });
    }

    const data = createClanSchema.partial().parse(req.body);

    const updated = await prisma.clan.update({
      where: { id: req.params.id },
      data,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                blurUsername: true
              }
            }
          }
        }
      }
    });

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Update clan error:', error);
    res.status(500).json({ error: 'Failed to update clan' });
  }
});

// Invite user by username
router.post('/:id/invite', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const member = await prisma.clanMember.findFirst({
      where: {
        clanId: req.params.id,
        userId: req.userId!
      }
    });

    if (!member || (member.role !== ClanRole.LEADER && member.role !== ClanRole.MODERATOR)) {
      return res.status(403).json({ error: 'Only leaders and moderators can invite' });
    }

    const { inviteeUsername } = inviteSchema.parse(req.body);

    // Find user by name
    const invitee = await prisma.user.findFirst({
      where: { name: inviteeUsername }
    });

    if (!invitee) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is already in a clan
    const existingMember = await prisma.clanMember.findFirst({
      where: { userId: invitee.id }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'User already belongs to a clan' });
    }

    // Check if invitation already exists
    const existingInvitation = await prisma.clanInvitation.findFirst({
      where: {
        clanId: req.params.id,
        inviteeId: invitee.id,
        status: 'pending'
      }
    });

    if (existingInvitation) {
      return res.status(400).json({ error: 'Invitation already sent' });
    }

    const invitation = await prisma.clanInvitation.create({
      data: {
        clanId: req.params.id,
        inviterId: req.userId!,
        inviteeId: invitee.id,
        inviteeUsername: inviteeUsername
      }
    });

    res.status(201).json(invitation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Invite user error:', error);
    res.status(500).json({ error: 'Failed to invite user' });
  }
});

// Accept invitation
router.post('/invitations/:id/accept', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const invitation = await prisma.clanInvitation.findUnique({
      where: { id: req.params.id }
    });

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    if (invitation.inviteeId !== req.userId!) {
      return res.status(403).json({ error: 'This invitation is not for you' });
    }

    if (invitation.status !== 'pending') {
      return res.status(400).json({ error: 'Invitation already processed' });
    }

    // Check if user is already in a clan
    const existingMember = await prisma.clanMember.findFirst({
      where: { userId: req.userId! }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'You already belong to a clan' });
    }

    // Create member and update invitation
    await prisma.$transaction([
      prisma.clanMember.create({
        data: {
          userId: req.userId!,
          clanId: invitation.clanId,
          role: ClanRole.MEMBER
        }
      }),
      prisma.clanInvitation.update({
        where: { id: invitation.id },
        data: { status: 'accepted' }
      })
    ]);

    res.json({ message: 'Invitation accepted' });
  } catch (error) {
    console.error('Accept invitation error:', error);
    res.status(500).json({ error: 'Failed to accept invitation' });
  }
});

// Reject invitation
router.post('/invitations/:id/reject', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const invitation = await prisma.clanInvitation.findUnique({
      where: { id: req.params.id }
    });

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    if (invitation.inviteeId !== req.userId!) {
      return res.status(403).json({ error: 'This invitation is not for you' });
    }

    await prisma.clanInvitation.update({
      where: { id: invitation.id },
      data: { status: 'rejected' }
    });

    res.json({ message: 'Invitation rejected' });
  } catch (error) {
    console.error('Reject invitation error:', error);
    res.status(500).json({ error: 'Failed to reject invitation' });
  }
});

// Get user's invitations
router.get('/invitations', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const invitations = await prisma.clanInvitation.findMany({
      where: {
        inviteeId: req.userId!,
        status: 'pending'
      },
      include: {
        clan: true,
        inviter: {
          select: {
            id: true,
            name: true,
            blurUsername: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(invitations);
  } catch (error) {
    console.error('Get invitations error:', error);
    res.status(500).json({ error: 'Failed to fetch invitations' });
  }
});

// Remove member (leader or moderator)
router.delete('/:id/members/:userId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const member = await prisma.clanMember.findFirst({
      where: {
        clanId: req.params.id,
        userId: req.userId!
      }
    });

    if (!member || (member.role !== ClanRole.LEADER && member.role !== ClanRole.MODERATOR)) {
      return res.status(403).json({ error: 'Only leaders and moderators can remove members' });
    }

    // Leader cannot remove themselves
    if (req.params.userId === req.userId! && member.role === ClanRole.LEADER) {
      return res.status(400).json({ error: 'Leader cannot remove themselves' });
    }

    await prisma.clanMember.delete({
      where: {
        userId_clanId: {
          userId: req.params.userId,
          clanId: req.params.id
        }
      }
    });

    res.json({ message: 'Member removed' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

// Leave clan
router.delete('/:id/leave', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const member = await prisma.clanMember.findFirst({
      where: {
        clanId: req.params.id,
        userId: req.userId!
      }
    });

    if (!member) {
      return res.status(404).json({ error: 'You are not a member of this clan' });
    }

    // Leader cannot leave (must transfer leadership first or delete clan)
    if (member.role === ClanRole.LEADER) {
      return res.status(400).json({ error: 'Leader cannot leave. Transfer leadership or delete clan first' });
    }

    await prisma.clanMember.delete({
      where: {
        userId_clanId: {
          userId: req.userId!,
          clanId: req.params.id
        }
      }
    });

    res.json({ message: 'Left clan successfully' });
  } catch (error) {
    console.error('Leave clan error:', error);
    res.status(500).json({ error: 'Failed to leave clan' });
  }
});

// Delete clan (leader only)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const member = await prisma.clanMember.findFirst({
      where: {
        clanId: req.params.id,
        userId: req.userId!
      }
    });

    if (!member || member.role !== ClanRole.LEADER) {
      return res.status(403).json({ error: 'Only the leader can delete the clan' });
    }

    await prisma.clan.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Clan deleted' });
  } catch (error) {
    console.error('Delete clan error:', error);
    res.status(500).json({ error: 'Failed to delete clan' });
  }
});

// Get clan leaderboard
router.get('/:id/leaderboard', authenticateToken, async (req: AuthRequest, res) => {
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

    // Get clan members
    const members = await prisma.clanMember.findMany({
      where: { clanId: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            blurUsername: true
          }
        }
      }
    });

    const memberIds = members.map(m => m.userId);

    // Get consumptions
    const consumptions = await prisma.consumption.findMany({
      where: {
        userId: { in: memberIds },
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

    // Calculate stats per user
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
      leaderboard
    });
  } catch (error) {
    console.error('Get clan leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch clan leaderboard' });
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

export default router;

