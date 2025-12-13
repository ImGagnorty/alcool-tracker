import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    isPremium: boolean;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ error: 'JWT secret not configured' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string; isPremium: boolean };
    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      isPremium: decoded.isPremium
    };
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requirePremium = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isPremium) {
    return res.status(403).json({ error: 'Premium subscription required' });
  }
  next();
};

