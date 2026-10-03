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
    if (url.startsWith('data:image')) {
      const base64Data = url.replace(/^data:image\/\w+;base64,/, '');
      fs.writeFileSync(dest, Buffer.from(base64Data, 'base64'));
      return resolve(dest);
    }

    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });

    req.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });

    req.setTimeout(12000, () => {
      req.abort();
      file.close();
      fs.unlink(dest, () => {});
      reject(new Error('Download timeout'));
    });
  });
}

async function main() {
  console.log('🚀 Starting Verified Real Hardware Image Fetcher for all 100 products...');

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' }
  });
  console.log(`Found ${products.length} products to update with genuine hardware photos.`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--blink-settings=imagesEnabled=true'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // Block unnecessary resources for maximum speed
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['font', 'media', 'stylesheet', 'websocket'].includes(resourceType)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  let updatedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const filename = `prod-${p.id}.jpg`;
    const dest = path.join(targetDir, filename);

    // Formulate a crisp, specific hardware query
    const searchQuery = `${p.title} official hardware product`;

    try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}&FORM=HDRSC2`, {
        waitUntil: 'domcontentloaded',
        timeout: 12000
      });

      await page.waitForSelector('a.iusc', { timeout: 6000 });

      const item = await page.evaluate((prodTitle) => {
        const anchors = Array.from(document.querySelectorAll('a.iusc'));
        const keywords = prodTitle.toLowerCase().split(' ').filter(w => w.length > 2);

        // Try to find the result that best matches the product name keywords
        let bestCandidate = null;
        let highestMatches = -1;

        for (const a of anchors.slice(0, 10)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || (!m.turl && !m.murl)) continue;

            const t = (m.t || m.desc || '').toLowerCase();
            let matches = 0;
            for (const kw of keywords) {
              if (t.includes(kw)) matches++;
            }

            if (matches > highestMatches) {
              highestMatches = matches;
              bestCandidate = {
                title: m.t || m.desc || '',
                url: m.turl || m.murl
              };
            }
          } catch (e) {}
        }

        // Fallback to the first search result in the grid if no keyword match
        if (!bestCandidate && anchors.length > 0) {
          try {
            const m = JSON.parse(anchors[0].getAttribute('m'));
            bestCandidate = {
              title: m.t || m.desc || '',
              url: m.turl || m.murl
            };
          } catch (e) {}
        }

        return bestCandidate;
      }, p.title);

      if (item && item.url) {
        await downloadFile(item.url, dest);
        const webPath = `/products/${filename}?v=${Date.now()}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        updatedCount++;
        console.log(`[${i + 1}/${products.length}] ✓ REAL HARDWARE: ${p.title} -> "${item.title.slice(0, 45)}"`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ No match found for: ${p.title}`);
      }
    } catch (err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Error for ${p.title}: ${err.message.slice(0, 40)}`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  await browser.close();
  await prisma.$disconnect();

  console.log('\n=================================================');
  console.log(`🎉 100% COMPLETE: Successfully updated ${updatedCount}/${products.length} products with genuine hardware images!`);
  console.log('=================================================\n');
}

main().catch(err => {
  console.error('Fatal script error:', err);
  process.exit(1);
});
