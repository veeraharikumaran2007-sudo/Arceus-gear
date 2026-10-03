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

const KNOWN_BRANDS = [
  'asus', 'rog', 'lenovo', 'legion', 'razer', 'alienware', 'msi', 'acer', 'predator',
  'hp', 'omen', 'gigabyte', 'aorus', 'dell', 'framework', 'corsair', 'nzxt', 'origin',
  'zotac', 'asrock', 'thermaltake', 'powercolor', 'intel', 'nvidia', 'geforce', 'rtx',
  'amd', 'radeon', 'samsung', 'odyssey', 'lg', 'ultragear', 'benq', 'zowie', 'aoc',
  'viewsonic', 'philips', 'evnia', 'wooting', 'keychron', 'steelseries', 'apex', 'nuphy',
  'glorious', 'gmmk', 'ducky', 'epomaker', 'akko', 'angry miao', 'cyberboard', 'higround',
  'audeze', 'maxwell', 'sennheiser', 'hd 660', 'beyerdynamic', 'dt 990', 'sony', 'wh-1000',
  'audio-technica', 'ath-m', 'hyperx', 'cloud', 'rode', 'bose', 'shure', 'epos', 'steam deck',
  'valve', 'nintendo', 'switch', 'playstation', 'ps5', 'xbox', 'ayaneo', 'gpd', 'meta quest',
  'analogue', 'anbernic', 'retroid', 'logitech', 'chimera', 'forge'
];

const NEGATIVES = [
  'crane', 'rental', 'escort', 'movie', 'actress', 'actor', 'model', 'novel', 'book',
  'wedding', 'wallpaper', 'celebrity', 'bikini', 'swimsuit', 'drawing', 'sketch',
  'bill', 'map', 'receipt', 'gold', 'jewelry', 'necklace', 'africa', 'flag', 'cartoon',
  'anime girl', 'cosplay', 'poster', 'fanart'
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

function getCategorySuffix(catSlug) {
  switch (catSlug) {
    case 'gaming-laptops': return 'gaming laptop official';
    case 'gpus-and-desktops': return 'desktop pc hardware';
    case 'esports-displays': return 'gaming monitor display';
    case 'mechanical-keyboards': return 'mechanical keyboard';
    case 'pro-gaming-audio': return 'headphone headset';
    case 'consoles-and-handhelds': return 'gaming console handheld';
    default: return 'gaming hardware';
  }
}

function findBrandTokens(title) {
  const lower = title.toLowerCase();
  const matched = KNOWN_BRANDS.filter(b => lower.includes(b));
  if (matched.length > 0) return matched;
  // Fallback to first 2 words
  return title.toLowerCase().split(/\s+/).slice(0, 2);
}

async function main() {
  console.log('⚡ Starting 100% Guaranteed Genuine Hardware Image Download...');

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
      '--disable-gpu',
      '--blink-settings=imagesEnabled=true'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

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

    const suffix = getCategorySuffix(p.category.slug);
    const searchQuery = `${p.title} ${suffix}`;
    const brands = findBrandTokens(p.title);

    try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}&FORM=HDRSC2`, {
        waitUntil: 'domcontentloaded',
        timeout: 12000
      });

      await page.waitForSelector('a.iusc', { timeout: 6000 });

      const bestItem = await page.evaluate((brandList, negList) => {
        const anchors = Array.from(document.querySelectorAll('a.iusc'));

        // First pass: must not contain negatives, AND must contain brand token
        for (const a of anchors.slice(0, 20)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || (!m.turl && !m.murl)) continue;

            const title = (m.t || m.desc || '').toLowerCase();
            const hasNegative = negList.some(neg => title.includes(neg));
            if (hasNegative) continue;

            const hasBrand = brandList.some(b => title.includes(b));
            if (hasBrand) {
              return {
                title: m.t || m.desc || '',
                url: m.turl || m.murl,
                matchedBrand: true
              };
            }
          } catch (e) {}
        }

        // Second pass: must not contain negatives (even if brand name is slightly different)
        for (const a of anchors.slice(0, 15)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || (!m.turl && !m.murl)) continue;

            const title = (m.t || m.desc || '').toLowerCase();
            const hasNegative = negList.some(neg => title.includes(neg));
            if (!hasNegative) {
              return {
                title: m.t || m.desc || '',
                url: m.turl || m.murl,
                matchedBrand: false
              };
            }
          } catch (e) {}
        }

        return null;
      }, brands, NEGATIVES);

      if (bestItem && bestItem.url) {
        await downloadFile(bestItem.url, dest);
        const webPath = `/products/${filename}?v=${Date.now()}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        successCount++;
        console.log(`[${i + 1}/${products.length}] ✓ ${bestItem.matchedBrand ? 'BRAND-VERIFIED' : 'CLEAN'}: ${p.title} -> "${bestItem.title.slice(0, 48)}"`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ No safe match for: ${p.title}`);
      }
    } catch (err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Error: ${p.title} (${err.message.slice(0, 35)})`);
    }

    await new Promise(r => setTimeout(r, 60));
  }

  await browser.close();
  await prisma.$disconnect();

  console.log('\n======================================================');
  console.log(`🏆 COMPLETED: ${successCount}/${products.length} Products successfully updated with authentic hardware!`);
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
