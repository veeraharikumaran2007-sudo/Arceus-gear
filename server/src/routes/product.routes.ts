import { Router, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateToken, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// GET all products with filtering, search, and sorting
router.get('/', async (req, res): Promise<any> => {
  try {
    const { category, search, minPrice, maxPrice, inStock, sort, featured } = req.query;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = {
        slug: String(category),
      };
    }

    if (search) {
      const q = String(search).trim();
      where.OR = [
        { title: { contains: q } },
        { description: { contains: q } },
        { specs: { contains: q } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(String(minPrice));
      if (maxPrice) where.price.lte = parseFloat(String(maxPrice));
    }

    if (inStock === 'true') {
      where.stock = { gt: 0 };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy,
    });

    // Parse JSON fields safely
    const formatted = products.map((p) => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      specs: JSON.parse(p.specs || '{}'),
    }));

    return res.json(formatted);
  } catch (error) {
    console.error('Fetch products error:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product by slug or ID
router.get('/:slugOrId', async (req, res): Promise<any> => {
  try {
    const { slugOrId } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
      include: {
        category: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({
      ...product,
      images: JSON.parse(product.images || '[]'),
      specs: JSON.parse(product.specs || '{}'),
    });
  } catch (error) {
    console.error('Fetch product detail error:', error);
    return res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

// Admin: Create Product
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const {
      title,
      slug,
      description,
      price,
      discountPrice,
      stock,
      categoryId,
      images,
      specs,
      isFeatured,
    } = req.body;

    if (!title || !slug || !price || !categoryId) {
      return res.status(400).json({ error: 'Title, slug, price, and category are required' });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug,
        description: description || '',
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        stock: parseInt(stock) || 0,
        categoryId,
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        specs: typeof specs === 'string' ? specs : JSON.stringify(specs || {}),
        isFeatured: Boolean(isFeatured),
      },
      include: { category: true },
    });

    return res.status(201).json({
      ...newProduct,
      images: JSON.parse(newProduct.images || '[]'),
      specs: JSON.parse(newProduct.specs || '{}'),
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Product with this slug already exists' });
    }
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

// Admin: Update Product (price, stock, specs, etc.)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      price,
      discountPrice,
      stock,
      categoryId,
      images,
      specs,
      isFeatured,
    } = req.body;

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = parseFloat(price);
    if (discountPrice !== undefined) data.discountPrice = discountPrice ? parseFloat(discountPrice) : null;
    if (stock !== undefined) data.stock = parseInt(stock);
    if (categoryId !== undefined) data.categoryId = categoryId;
    if (images !== undefined) data.images = typeof images === 'string' ? images : JSON.stringify(images);
    if (specs !== undefined) data.specs = typeof specs === 'string' ? specs : JSON.stringify(specs);
    if (isFeatured !== undefined) data.isFeatured = Boolean(isFeatured);

    const updated = await prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });

    return res.json({
      ...updated,
      images: JSON.parse(updated.images || '[]'),
      specs: JSON.parse(updated.specs || '{}'),
    });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin: Delete Product
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Customer: Add review
router.post('/:id/reviews', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }

    const review = await prisma.review.create({
      data: {
        productId: id,
        userId: req.user!.id,
        userName: req.user!.name,
        rating: Math.min(5, Math.max(1, parseInt(rating))),
        comment,
      },
    });

    // Update product average rating
    const allReviews = await prisma.review.findMany({
      where: { productId: id },
    });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.product.update({
      where: { id },
      data: {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewCount: allReviews.length,
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error('Review error:', error);
    return res.status(500).json({ error: 'Failed to post review' });
  }
});

export default router;
