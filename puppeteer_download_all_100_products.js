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

    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
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
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting automated Puppeteer Chrome browser to fetch 100 unique real hardware images...');
  
  const products = await prisma.product.findMany();
  console.log(`Loaded ${products.length} products from database.`);

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
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Prevent downloading useless fonts/media during search navigation to be ultra-fast
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['font', 'media', 'websocket'].includes(resourceType)) {
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

    const searchQuery = `${p.title} official product`;

    try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}&FORM=HDRSC2`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      await page.waitForSelector('.mimg', { timeout: 6000 });

      const imgUrl = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.mimg'));
        for (const img of imgs) {
          const src = img.src || img.getAttribute('data-src') || img.getAttribute('src');
          if (src && (src.startsWith('http') || src.startsWith('data:image'))) {
            return src;
          }
        }
        return null;
      });

      if (imgUrl) {
        await downloadFile(imgUrl, dest);
        const webPath = `/products/${filename}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        successCount++;
        console.log(`[${i + 1}/${products.length}] ✓ Fetched & Saved: ${p.title}`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ No img selector for: ${p.title} (keeping fallback)`);
      }
    } catch (err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Fallback for: ${p.title} (${err.message.slice(0, 30)})`);
    }

    // Small delay to prevent bot throttling
    await new Promise(r => setTimeout(r, 120));
  }

  await browser.close();
  await prisma.$disconnect();
  console.log(`\n========================================`);
  console.log(`SUCCESS: Fetched ${successCount}/${products.length} UNIQUE real hardware product images via Puppeteer!`);
  console.log(`========================================\n`);
}

main().catch(err => {
  console.error('Fatal Puppeteer Error:', err);
  process.exit(1);
});
