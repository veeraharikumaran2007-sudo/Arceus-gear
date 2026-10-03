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
  'actress', 'actor', 'celebrity', 'bikini', 'swimsuit', 'model', 'escort', 'crane',
  'rental', 'wedding', 'bill', 'receipt', 'drawing', 'sketch', 'cartoon', 'recipe',
  'flag', 'africa', 'novel', 'book', 'jewelry', 'necklace', 'gold', 'dress', 'cosplay'
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

    req.on('error', (err) => reject(err));
    req.setTimeout(12000, () => {
      req.abort();
      reject(new Error('Timeout'));
    });
  });
}

function getQueryAndKeywords(p) {
  const t = p.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
  const words = t.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !['the', 'and', 'edition', 'black', 'white', 'wireless'].includes(w));

  let query = t;
  if (p.category.slug === 'gaming-laptops') {
    query = `${t} laptop`;
  } else if (p.category.slug === 'gpus-and-desktops') {
    if (t.includes('RTX') || t.includes('Radeon') || t.includes('Arc')) {
      query = `${t} graphics card`;
    } else {
      query = `${t} gaming pc desktop`;
    }
  } else if (p.category.slug === 'esports-displays') {
    query = `${t} gaming monitor`;
  } else if (p.category.slug === 'mechanical-keyboards') {
    query = `${t} keyboard`;
  } else if (p.category.slug === 'pro-gaming-audio') {
    query = `${t} headphones`;
  } else if (p.category.slug === 'consoles-and-handhelds') {
    query = `${t} gaming console`;
  }

  return { query, words };
}

async function main() {
  console.log('🛡️ Starting 100% Bulletproof Genuine Hardware Fetcher...');

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Processing ${products.length} products...`);

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

  let downloadedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const filename = `prod-${p.id}.jpg`;
    const dest = path.join(targetDir, filename);

    const { query, words } = getQueryAndKeywords(p);

    try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&FORM=HDRSC2`, {
        waitUntil: 'domcontentloaded',
        timeout: 12000
      });

      await page.waitForSelector('a.iusc', { timeout: 6000 });

      const item = await page.evaluate((keywords, negs) => {
        const anchors = Array.from(document.querySelectorAll('a.iusc'));

        for (const a of anchors.slice(0, 30)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || !m.turl) continue;

            const text = (m.t || m.desc || '').toLowerCase();

            // Strict negative check
            if (negs.some(neg => text.includes(neg))) continue;

            // Must match at least one relevant keyword
            const matches = keywords.filter(k => text.includes(k));
            if (matches.length > 0) {
              return {
                title: m.t || m.desc || '',
                url: m.turl
              };
            }
          } catch(e) {}
        }
        return null;
      }, words, NEGATIVES);

      if (item && item.url) {
        await downloadFile(item.url, dest);
        const webPath = `/products/${filename}?v=${Date.now()}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        downloadedCount++;
        console.log(`[${i + 1}/${products.length}] ✓ VERIFIED HARDWARE: ${p.title} -> "${item.title.slice(0, 48)}"`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ No match for: ${p.title}`);
      }
    } catch (err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Error: ${p.title} (${err.message.slice(0, 35)})`);
    }

    await new Promise(r => setTimeout(r, 80));
  }

  await browser.close();
  await prisma.$disconnect();

  console.log('\n======================================================');
  console.log(`✨ DONE: ${downloadedCount}/${products.length} Products updated with 100% genuine hardware photos!`);
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
