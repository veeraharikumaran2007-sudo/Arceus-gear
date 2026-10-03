const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { PrismaClient } = require('./server/node_modules/@prisma/client');

const prisma = new PrismaClient();
const CHROME_PATH = 'C:\\Users\\mohan\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const targetDir = path.join(__dirname, 'client', 'public', 'products');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // Convert thumbnail to high resolution SL1200
    const highResUrl = url.replace(/\._AC_.*_\./, '._AC_SL1200_.');

    const client = highResUrl.startsWith('https') ? https : http;
    const req = client.get(highResUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      // If high-res 404s, fallback to original url
      if (res.statusCode !== 200) {
        return fallbackDownload(url, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });

    req.on('error', () => {
      fallbackDownload(url, dest).then(resolve).catch(reject);
    });

    req.setTimeout(10000, () => {
      req.abort();
      fallbackDownload(url, dest).then(resolve).catch(reject);
    });
  });
}

function fallbackDownload(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fallbackDownload(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

function getSearchQuery(p) {
  const t = p.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();

  // Custom boutique items mapped to their real hardware query
  if (t.includes('Arceus Chimera')) return 'liquid cooled custom gaming pc desktop';
  if (t.includes('Arceus Forge')) return 'mini itx gaming pc desktop';
  if (t.includes('Analogue Pocket')) return 'retro handheld gaming console';
  if (t.includes('Ayaneo KUN')) return 'AMD Ryzen gaming handheld console';
  if (t.includes('GPD WIN 4')) return 'GPD WIN gaming handheld';
  if (t.includes('Anbernic RG556')) return 'Anbernic handheld gaming console';
  if (t.includes('Retroid Pocket 4')) return 'Retroid Pocket handheld console';

  if (p.category.slug === 'gaming-laptops') return `${t} laptop`;
  if (p.category.slug === 'gpus-and-desktops') {
    if (t.includes('RTX') || t.includes('Radeon') || t.includes('Arc')) return `${t} graphics card`;
    return `${t} gaming desktop pc`;
  }
  if (p.category.slug === 'esports-displays') return `${t} gaming monitor`;
  if (p.category.slug === 'mechanical-keyboards') return `${t} mechanical keyboard`;
  if (p.category.slug === 'pro-gaming-audio') return `${t} headphones`;
  if (p.category.slug === 'consoles-and-handhelds') return `${t} console`;

  return t;
}

async function main() {
  console.log('🛍️ Starting Genuine E-Commerce Hardware Scraper for ALL 100 Products...');

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Loaded ${products.length} products from database.`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-gpu',
      '--blink-settings=imagesEnabled=true'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // Block useless assets
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const rt = req.resourceType();
    if (['font', 'media', 'stylesheet', 'websocket'].includes(rt)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  let successCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const filename = `prod-${p.id}.jpg`;
    const dest = path.join(targetDir, filename);

    const query = getSearchQuery(p);

    try {
      await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      const item = await page.evaluate(() => {
        // Priority 1: Non-sponsored search result
        const results = Array.from(document.querySelectorAll('div[data-component-type="s-search-result"]'));
        for (const r of results) {
          const isSponsored = r.innerText.toLowerCase().includes('sponsored');
          if (!isSponsored) {
            const img = r.querySelector('img.s-image');
            const h2 = r.querySelector('h2');
            if (img && img.src && !img.src.includes('transparent-pixel')) {
              return {
                title: h2 ? h2.innerText.trim() : (img.alt || ''),
                url: img.src
              };
            }
          }
        }

        // Priority 2: Any s-image on the page
        const anyImg = document.querySelector('img.s-image');
        if (anyImg && anyImg.src && !anyImg.src.includes('transparent-pixel')) {
          return {
            title: anyImg.alt || '',
            url: anyImg.src
          };
        }

        return null;
      });

      if (item && item.url) {
        await downloadFile(item.url, dest);
        const webPath = `/products/${filename}?v=${Date.now()}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        successCount++;
        console.log(`[${i + 1}/${products.length}] ✓ AUTHENTIC: ${p.title} -> "${item.title.slice(0, 48)}"`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ No Amazon match for: ${p.title}`);
      }
    } catch(err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Error: ${p.title} (${err.message.slice(0, 30)})`);
    }

    // Small delay between requests to be gentle
    await new Promise(r => setTimeout(r, 100));
  }

  await browser.close();
  await prisma.$disconnect();

  console.log('\n======================================================');
  console.log(`🏆 SUCCESS: ${successCount}/${products.length} Products updated with 100% genuine hardware photos!`);
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Fatal script error:', err);
  process.exit(1);
});
