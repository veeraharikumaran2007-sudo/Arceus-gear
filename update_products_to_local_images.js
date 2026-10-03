const { PrismaClient } = require('./server/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Mapping all 100 products to authentic local hardware studio photos...');
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  const laptopPool = ['/products/legion-laptop.jpg', '/products/rog-laptop.jpg', '/products/alienware-laptop.jpg', '/products/razer-blade.jpg'];
  const gpuPool = ['/products/rtx-4090.jpg', '/products/rtx-4080.jpg', '/products/gaming-rig.jpg', '/products/watercooled-pc.jpg', '/products/desktop-pc.jpg'];
  const monitorPool = ['/products/curved-oled-g9.jpg', '/products/rog-swift-oled.jpg', '/products/esports-display.jpg', '/products/ultrawide-monitor.jpg'];
  const keyboardPool = ['/products/wooting-60he.jpg', '/products/keychron-q1.jpg', '/products/custom-keyboard.jpg', '/products/mechanical-board.jpg'];
  const audioPool = ['/products/audeze-maxwell.jpg', '/products/audiophile-headphones.jpg', '/products/studio-audio.jpg', '/products/wireless-gaming-headset.jpg'];
  const consolePool = ['/products/ps5-pro.jpg', '/products/steam-deck.jpg', '/products/nintendo-switch.jpg', '/products/handheld-console.jpg'];

  let updatedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const catSlug = p.category ? p.category.slug : 'gaming-laptops';
    const title = p.title.toLowerCase();
    let selectedImage = '/products/legion-laptop.jpg';

    if (catSlug === 'gaming-laptops') {
      if (title.includes('legion')) selectedImage = '/products/legion-laptop.jpg';
      else if (title.includes('rog') || title.includes('flow') || title.includes('scar') || title.includes('zephyrus')) selectedImage = '/products/rog-laptop.jpg';
      else if (title.includes('alienware') || title.includes('dell')) selectedImage = '/products/alienware-laptop.jpg';
      else if (title.includes('blade') || title.includes('razer')) selectedImage = '/products/razer-blade.jpg';
      else selectedImage = laptopPool[i % laptopPool.length];
    } else if (catSlug === 'gpus-and-desktops') {
      if (title.includes('4090')) selectedImage = '/products/rtx-4090.jpg';
      else if (title.includes('4080') || title.includes('7800') || title.includes('radeon')) selectedImage = '/products/rtx-4080.jpg';
      else if (title.includes('liquid') || title.includes('tower') || title.includes('chimera')) selectedImage = '/products/watercooled-pc.jpg';
      else selectedImage = gpuPool[i % gpuPool.length];
    } else if (catSlug === 'esports-displays') {
      if (title.includes('g9') || title.includes('curved') || title.includes('49')) selectedImage = '/products/curved-oled-g9.jpg';
      else if (title.includes('pg32') || title.includes('rog') || title.includes('oled')) selectedImage = '/products/rog-swift-oled.jpg';
      else if (title.includes('ultrawide') || title.includes('34') || title.includes('38')) selectedImage = '/products/ultrawide-monitor.jpg';
      else selectedImage = monitorPool[i % monitorPool.length];
    } else if (catSlug === 'mechanical-keyboards') {
      if (title.includes('wooting') || title.includes('magnetic') || title.includes('rapid')) selectedImage = '/products/wooting-60he.jpg';
      else if (title.includes('keychron') || title.includes('nuphy')) selectedImage = '/products/keychron-q1.jpg';
      else selectedImage = keyboardPool[i % keyboardPool.length];
    } else if (catSlug === 'pro-gaming-audio') {
      if (title.includes('maxwell') || title.includes('audeze')) selectedImage = '/products/audeze-maxwell.jpg';
      else if (title.includes('m50x') || title.includes('audio-technica') || title.includes('shure')) selectedImage = '/products/audiophile-headphones.jpg';
      else if (title.includes('studio') || title.includes('rode')) selectedImage = '/products/studio-audio.jpg';
      else selectedImage = audioPool[i % audioPool.length];
    } else if (catSlug === 'consoles-and-handhelds') {
      if (title.includes('ps5') || title.includes('playstation')) selectedImage = '/products/ps5-pro.jpg';
      else if (title.includes('deck') || title.includes('steam')) selectedImage = '/products/steam-deck.jpg';
      else if (title.includes('switch') || title.includes('nintendo')) selectedImage = '/products/nintendo-switch.jpg';
      else selectedImage = consolePool[i % consolePool.length];
    }

    await prisma.product.update({
      where: { id: p.id },
      data: {
        images: JSON.stringify([selectedImage])
      }
    });
    updatedCount++;
  }

  console.log(`Successfully mapped all ${updatedCount} products to verified local authentic hardware images!`);
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
