import { Router, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all categories with product counts
router.get('/', async (_req, res): Promise<any> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });
    return res.json(categories);
  } catch (error) {
    console.error('Fetch categories error:', error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Admin: Create category
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { name, slug, description, image } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const category = await prisma.category.create({
      data: { name, slug, description, image }
    });
    return res.status(201).json(category);
  } catch (error: any) {
    console.error('Create category error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Category name or slug already exists' });
    }
    return res.status(500).json({ error: 'Failed to create category' });
  }
});

export default router;
