const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.join(__dirname, 'client', 'public', 'products');

// Clean, authentic, official-grade product studio photography with zero neon synthwave lighting
const cleanImages = {
  // Real clean Nintendo Switch OLED (Studio product shot)
  'switch-clean.jpg': 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=85',
  
  // Real clean PS5 Pro / Slim Console
  'ps5-clean.jpg': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=85',

  // Real clean Controller / Handheld Studio Shots
  'gamepad-clean.jpg': 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=85',
  'vr-clean.jpg': 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=1200&q=85',
  'handheld-clean.jpg': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
  
  // High-end clean real gaming gear
  'rog-laptop-clean.jpg': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
  'desk-rig-clean.jpg': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=85'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with ${res.statusCode}`));
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

async function run() {
  console.log('Downloading clean studio hardware images...');
  for (const [name, url] of Object.entries(cleanImages)) {
    const dest = path.join(targetDir, name);
    try {
      await download(url, dest);
      console.log(`✓ Saved ${name}`);
    } catch (e) {
      console.error(`✗ ${name}:`, e.message);
    }
  }
}

run();
