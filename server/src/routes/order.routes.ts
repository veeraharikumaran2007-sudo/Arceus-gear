import { Router, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateToken, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Create Order (Simulated Checkout)
router.post('/', optionalAuth, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      items, // [{ productId, quantity }]
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !items.length) {
      return res.status(400).json({ error: 'Missing required order fields or items' });
    }

    // Step 1: Validate stock & fetch live product details
    const productIds = items.map((i: any) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for "${product.title}". Only ${product.stock} available.`,
        });
      }
    }

    // Step 2: Calculate total amount and prepare line items
    let totalAmount = 0;
    const orderItemsData = items.map((item: any) => {
      const p = productMap.get(item.productId)!;
      const effectivePrice = p.discountPrice || p.price;
      totalAmount += effectivePrice * item.quantity;
      const images = JSON.parse(p.images || '[]');
      return {
        productId: p.id,
        title: p.title,
        price: effectivePrice,
        quantity: item.quantity,
        image: images[0] || '',
      };
    });

    const orderNumber = `AG-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    // Step 3: Run in transaction: create order and decrement stock
    const newOrder = await prisma.$transaction(async (tx) => {
      // Decrement stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Create order
      return await tx.order.create({
        data: {
          orderNumber,
          userId: req.user ? req.user.id : null,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress),
          status: 'Confirmed', // Automatically confirmed after simulated payment!
          paymentMethod: paymentMethod || 'UPI_SIMULATED',
          paymentStatus: 'PAID',
          totalAmount,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

// Customer: Get My Orders
router.get('/my-orders', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { userId: req.user!.id },
          { customerEmail: req.user!.email }
        ]
      },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(orders);
  } catch (error) {
    console.error('Fetch my-orders error:', error);
    return res.status(500).json({ error: 'Failed to fetch your orders' });
  }
});

// Admin: Get All Orders
router.get('/', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response): Promise<any> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(orders);
  } catch (error) {
    console.error('Admin fetch orders error:', error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get Single Order Details by ID or OrderNumber
router.get('/:idOrNumber', async (req, res): Promise<any> => {
  try {
    const { idOrNumber } = req.params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: idOrNumber }, { orderNumber: idOrNumber }],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Fetch order detail error:', error);
    return res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

// Admin: Update Order Status
// Flow: Pending -> Confirmed -> Processing -> Shipped -> Delivered
router.patch('/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    return res.json(updated);
  } catch (error) {
    console.error('Update order status error:', error);
    return res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
