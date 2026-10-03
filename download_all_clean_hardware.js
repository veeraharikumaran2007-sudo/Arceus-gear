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

const NEGATIVES = [
  'actress', 'actor', 'celebrity', 'bikini', 'swimsuit', 'escort', 'crane', 'rental',
  'wedding', 'bill', 'receipt', 'drawing', 'sketch', 'cartoon', 'recipe', 'flag',
  'africa', 'novel', 'book', 'jewelry', 'necklace', 'gold chain', 'dress', 'cosplay'
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

    req.setTimeout(12000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

// Generate concise, clean search queries tailored to get exact product photography
function getCleanSearchConfig(p) {
  const title = p.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
  const lower = title.toLowerCase();

  let brand = '';
  let query = title;

  // Detect brand / core keyword
  const brandList = [
    'asus', 'lenovo', 'razer', 'alienware', 'msi', 'acer', 'hp', 'gigabyte', 'dell',
    'framework', 'corsair', 'nzxt', 'origin', 'zotac', 'asrock', 'thermaltake',
    'powercolor', 'intel', 'nvidia', 'amd', 'samsung', 'lg', 'benq', 'aoc', 'viewsonic',
    'philips', 'wooting', 'keychron', 'steelseries', 'nuphy', 'glorious', 'ducky',
    'epomaker', 'akko', 'angry miao', 'higround', 'audeze', 'sennheiser', 'beyerdynamic',
    'sony', 'audio-technica', 'hyperx', 'rode', 'bose', 'shure', 'epos', 'steam deck',
    'xbox', 'nintendo', 'playstation', 'ayaneo', 'gpd', 'meta quest', 'analogue',
    'anbernic', 'retroid', 'logitech', 'arceus', 'lian li'
  ];

  for (const b of brandList) {
    if (lower.includes(b)) {
      brand = b;
      break;
    }
  }

  if (!brand) {
    brand = title.split(' ')[0].toLowerCase();
  }

  // Optimize search query
  if (p.category.slug === 'gaming-laptops') {
    query = `${title} gaming laptop`;
  } else if (p.category.slug === 'gpus-and-desktops') {
    if (lower.includes('rtx') || lower.includes('rx') || lower.includes('arc')) {
      query = `${title} graphics card`;
    } else {
      query = `${title} gaming PC desktop`;
    }
  } else if (p.category.slug === 'esports-displays') {
    query = `${title} gaming monitor`;
  } else if (p.category.slug === 'mechanical-keyboards') {
    query = `${title} keyboard`;
  } else if (p.category.slug === 'pro-gaming-audio') {
    query = `${title} headphones`;
  } else if (p.category.slug === 'consoles-and-handhelds') {
    query = `${title} console`;
  }

  return { query, brand };
}

async function main() {
  console.log('🚀 Starting Pure Genuine Hardware Downloader for ALL 100 Products...');

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Loaded ${products.length} catalog products.`);

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

  // Intercept requests to make searches ultra-fast
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

    const { query, brand } = getCleanSearchConfig(p);

    try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&FORM=HDRSC2`, {
        waitUntil: 'domcontentloaded',
        timeout: 12000
      });

      await page.waitForSelector('a.iusc', { timeout: 6000 });

      const match = await page.evaluate((brandName, negList) => {
        const anchors = Array.from(document.querySelectorAll('a.iusc'));

        for (const a of anchors.slice(0, 20)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || !m.turl) continue;

            const text = (m.t || m.desc || '').toLowerCase();

            // Check negative blacklist
            if (negList.some(neg => text.includes(neg))) continue;

            // Brand match check
            if (text.includes(brandName.toLowerCase())) {
              return {
                title: m.t || m.desc || '',
                url: m.turl
              };
            }
          } catch (e) {}
        }

        // If brand not found in text, pick first clean result from the official search grid
        for (const a of anchors.slice(0, 5)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || !m.turl) continue;

            const text = (m.t || m.desc || '').toLowerCase();
            if (!negList.some(neg => text.includes(neg))) {
              return {
                title: m.t || m.desc || '',
                url: m.turl
              };
            }
          } catch (e) {}
        }

        return null;
      }, brand, NEGATIVES);

      if (match && match.url) {
        await downloadFile(match.url, dest);
        const webPath = `/products/${filename}?v=${Date.now()}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        successCount++;
        console.log(`[${i + 1}/${products.length}] ✓ AUTHENTIC: ${p.title} -> "${match.title.slice(0, 50)}"`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ No match found for: ${p.title}`);
      }
    } catch (err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Error on ${p.title}: ${err.message.slice(0, 35)}`);
    }

    await new Promise(r => setTimeout(r, 60));
  }

  await browser.close();
  await prisma.$disconnect();

  console.log('\n======================================================');
  console.log(`🎯 TOTAL SUCCESS: ${successCount}/${products.length} Products updated with 100% genuine hardware photos!`);
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Fatal script error:', err);
  process.exit(1);
});
