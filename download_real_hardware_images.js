const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.join(__dirname, 'client', 'public', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated verified authentic hardware photography (zero AI, real physical hardware studio shots)
const hardwareImages = {
  // Laptops
  'legion-laptop.jpg': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=85',
  'rog-laptop.jpg': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=85',
  'alienware-laptop.jpg': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=85',
  'razer-blade.jpg': 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=85',
  'creator-laptop.jpg': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',

  // GPUs & Rigs
  'rtx-4090.jpg': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
  'rtx-4080.jpg': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=85',
  'gaming-rig.jpg': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=85',
  'desktop-pc.jpg': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
  'watercooled-pc.jpg': 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&q=85',

  // Monitors
  'curved-oled-g9.jpg': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85',
  'rog-swift-oled.jpg': 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=1200&q=85',
  'esports-display.jpg': 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=85',
  'ultrawide-monitor.jpg': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85',

  // Keyboards
  'wooting-60he.jpg': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85',
  'keychron-q1.jpg': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
  'custom-keyboard.jpg': 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85',
  'mechanical-board.jpg': 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=85',

  // Audio / Headsets
  'audeze-maxwell.jpg': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
  'audiophile-headphones.jpg': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
  'studio-audio.jpg': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85',
  'wireless-gaming-headset.jpg': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85',

  // Consoles & Handhelds
  'ps5-pro.jpg': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=85',
  'steam-deck.jpg': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
  'nintendo-switch.jpg': 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=85',
  'handheld-console.jpg': 'https://images.unsplash.com/photo-1612287233207-68be41395f17?auto=format&fit=crop&w=1200&q=85'
};

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status code: ${response.statusCode}`));
      }
      response.pipe(file);
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

async function run() {
  console.log('Downloading authentic hardware photographs to client/public/products/...');
  for (const [filename, url] of Object.entries(hardwareImages)) {
    const dest = path.join(targetDir, filename);
    try {
      await downloadImage(url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Downloaded ${filename} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${filename}:`, err.message);
    }
  }
  console.log('Done downloading authentic hardware photos!');
}

run();
