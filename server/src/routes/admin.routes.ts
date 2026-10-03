import { Router, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Admin Dashboard Analytics
router.get('/dashboard', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response): Promise<any> => {
  try {
    const [
      totalProducts,
      totalUsers,
      totalOrders,
      ordersAggregate,
      lowStockProducts,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
      prisma.product.findMany({
        where: { stock: { lte: 5 } },
        select: {
          id: true,
          title: true,
          stock: true,
          price: true,
          images: true,
        },
        orderBy: { stock: 'asc' },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
        },
      }),
    ]);

    const formattedLowStock = lowStockProducts.map((p) => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
    }));

    return res.json({
      metrics: {
        totalRevenue: ordersAggregate._sum.totalAmount || 0,
        totalOrders,
        totalProducts,
        totalUsers,
        lowStockCount: lowStockProducts.length,
      },
      lowStockProducts: formattedLowStock,
      recentOrders,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
});

// Admin: View all registered users
router.get('/users', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Admin: Update user role
router.patch('/users/:id/role', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['ADMIN', 'CUSTOMER'].includes(role)) {
      return res.status(400).json({ error: 'Role must be ADMIN or CUSTOMER' });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    return res.json(updated);
  } catch (error) {
    console.error('Update role error:', error);
    return res.status(500).json({ error: 'Failed to update user role' });
  }
});

export default router;
