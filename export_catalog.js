const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('./server/node_modules/@prisma/client');

const prisma = new PrismaClient();

async function run() {
  console.log('Reading categories and products from SQLite...');
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  });

  const rawProducts = await prisma.product.findMany({
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      }
    }
  });

  const products = rawProducts.map(p => {
    let images = [];
    try { images = JSON.parse(p.images); } catch(e) { images = [p.images]; }
    let specs = {};
    try { specs = JSON.parse(p.specs); } catch(e) { specs = {}; }

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.price,
      discountPrice: p.discountPrice,
      stock: p.stock,
      rating: p.rating,
      reviewCount: 28,
      categoryId: p.categoryId,
      category: p.category,
      images,
      specs,
      isFeatured: p.isFeatured || false,
      createdAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString()
    };
  });

  const fileContent = `// Arceus Gear Offline & Cloud Fallback Hardware Catalog
// 100 Authentic Products across 6 Categories
import { Category, Product } from '../types';

export const INITIAL_CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

  const targetPath = path.join(__dirname, 'client', 'src', 'data', 'catalog.ts');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log(`✓ Successfully exported ${categories.length} categories and ${products.length} products to ${targetPath}`);
}

run()
  .catch(err => {
    console.error('Export failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
