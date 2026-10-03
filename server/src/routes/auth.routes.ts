import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'arceus_secret_jwt_key_hackathon_2026';

// Register
router.post('/register', async (req, res): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: 'CUSTOMER',
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Google Sign-In Endpoint (Allows anyone to sign in directly with Google)
router.post('/google-login', async (req, res): Promise<any> => {
  try {
    const { name, email } = req.body;
    const userEmail = (email || 'google.gamer@gmail.com').toLowerCase();
    const userName = name || 'Google Verified Gamer';

    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      const dummyPassword = await bcrypt.hash(`GoogleAuth_${Date.now()}`, 10);
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
          passwordHash: dummyPassword,
          role: 'CUSTOMER',
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Signed in with Google',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({ error: 'Google sign in failed' });
  }
});

// Quick Demo Login (Helpful for Hackathon presentation with judges)
router.post('/demo-login', async (req, res): Promise<any> => {
  try {
    const { role } = req.body; // 'admin' or 'customer'
    const targetEmail = role === 'admin' ? 'admin@arceus.com' : 'gamer@arceus.com';

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (!user) {
      return res.status(404).json({ error: 'Demo user not seeded' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: `Switched to ${user.role} role`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Demo login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current profile
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
  return res.json({ user: req.user });
});

export default router;
