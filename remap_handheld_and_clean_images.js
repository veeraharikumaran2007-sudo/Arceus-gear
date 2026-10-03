const { PrismaClient } = require('./server/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Remapping Consoles & Handhelds to clean real studio images...');
  
  const products = await prisma.product.findMany({
    where: {
      category: { slug: 'consoles-and-handhelds' }
    }
  });

  for (const p of products) {
    const title = p.title.toLowerCase();
    let img = '/products/portable-handheld.jpg';

    if (title.includes('switch') || title.includes('nintendo')) {
      img = '/products/switch-clean.jpg';
    } else if (title.includes('ps5') || title.includes('playstation 5')) {
      img = '/products/ps5-clean.jpg';
    } else if (title.includes('vr') || title.includes('quest') || title.includes('meta')) {
      img = '/products/vr-headset-clean.jpg';
    } else if (title.includes('portal')) {
      img = '/products/gamepad-clean.jpg';
    } else if (title.includes('deck') || title.includes('steam')) {
      img = '/products/portable-handheld.jpg';
    } else if (title.includes('analogue')) {
      img = '/products/gamepad-clean.jpg';
    } else {
      img = '/products/portable-handheld.jpg';
    }

    await prisma.product.update({
      where: { id: p.id },
      data: {
        images: JSON.stringify([img])
      }
    });
    console.log(`✓ ${p.title} -> ${img}`);
  }

  console.log('Consoles & Handhelds successfully updated with clean real hardware photos!');
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
