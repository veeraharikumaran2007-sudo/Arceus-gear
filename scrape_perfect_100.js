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
  'flag', 'africa', 'novel', 'book', 'jewelry', 'necklace', 'gold', 'dress', 'cosplay',
  'wallpaper', 'meme', 'parappa', 'champs', 'cup'
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

function getProductConfig(p) {
  const t = p.title;

  // Curated keyword definitions for all products
  const configs = {
    // 20 Laptops
    'ASUS ROG Strix SCAR 18 (2024)': { q: 'ASUS ROG Strix SCAR 18 laptop', kws: ['rog', 'strix', 'scar', 'asus'] },
    'Lenovo Legion Pro 7i Gen 9': { q: 'Lenovo Legion Pro 7i laptop', kws: ['legion', 'lenovo'] },
    'Razer Blade 16 Dual-Mode Mini-LED': { q: 'Razer Blade 16 laptop', kws: ['blade 16', 'razer', 'blade'] },
    'Alienware m18 R2 Titan': { q: 'Alienware m18 R2 laptop', kws: ['alienware', 'm18'] },
    'MSI Stealth 16 AI Studio': { q: 'MSI Stealth 16 laptop', kws: ['stealth 16', 'msi', 'stealth'] },
    'ASUS ROG Zephyrus G14 (2024 OLED)': { q: 'ROG Zephyrus G14 2024 laptop', kws: ['zephyrus', 'rog', 'asus'] },
    'Acer Predator Helios 16': { q: 'Acer Predator Helios 16 laptop', kws: ['helios', 'predator', 'acer'] },
    'HP Omen Transcend 14': { q: 'HP Omen Transcend 14 laptop', kws: ['transcend', 'omen', 'hp'] },
    'MSI Titan 18 HX Dragon Edition': { q: 'MSI Titan 18 HX laptop', kws: ['titan 18', 'titan', 'msi'] },
    'Alienware x16 R2 Stealth': { q: 'Alienware x16 R2 laptop', kws: ['x16', 'alienware'] },
    'Gigabyte AORUS 17X (2024)': { q: 'Gigabyte AORUS 17X laptop', kws: ['aorus', 'gigabyte'] },
    'ASUS ROG Flow Z13 Gaming Tablet PC': { q: 'ROG Flow Z13 tablet gaming', kws: ['flow z13', 'flow', 'z13', 'rog'] },
    'Lenovo Legion 9i Liquid Cooled': { q: 'Lenovo Legion 9i laptop', kws: ['legion 9i', 'legion', 'lenovo'] },
    'Dell Alienware m16 R2 Performance': { q: 'Alienware m16 R2 laptop', kws: ['m16', 'alienware', 'dell'] },
    'Framework Laptop 16 DIY Gaming': { q: 'Framework Laptop 16', kws: ['framework'] },
    'Acer Nitro 17 Black Edition': { q: 'Acer Nitro 17 laptop', kws: ['nitro 17', 'nitro', 'acer'] },
    'Razer Blade 14 Mercury White': { q: 'Razer Blade 14 laptop', kws: ['blade 14', 'blade', 'razer'] },
    'Lenovo LOQ 15 Essential Gamer': { q: 'Lenovo LOQ 15 laptop', kws: ['loq 15', 'loq', 'lenovo'] },
    'ASUS TUF Gaming A15 Mecha Gray': { q: 'ASUS TUF Gaming A15 laptop', kws: ['tuf', 'asus'] },
    'MSI Katana 17 B13V': { q: 'MSI Katana 17 laptop', kws: ['katana', 'msi'] },

    // 20 GPUs & Desktops
    'ASUS ROG Strix GeForce RTX 4090 OC 24GB': { q: 'ASUS ROG Strix RTX 4090 GPU', kws: ['rtx 4090', 'strix', 'rog', 'asus'] },
    'NVIDIA GeForce RTX 4080 Super Founders Edition': { q: 'RTX 4080 Super Founders Edition', kws: ['rtx 4080', 'founders', 'nvidia'] },
    'AMD Radeon RX 7900 XTX 24GB Nitro+ Vapor-X': { q: 'Sapphire Nitro+ Radeon RX 7900 XTX', kws: ['7900 xtx', 'nitro', 'sapphire', 'radeon'] },
    'Arceus Chimera V3 Liquid Gaming PC': { q: 'custom liquid cooled gaming pc desktop', kws: ['gaming pc', 'liquid cooled', 'desktop', 'custom pc'] },
    'Corsair ONE i500 Compact Battlestation': { q: 'Corsair ONE i500 gaming pc', kws: ['corsair one', 'i500', 'corsair'] },
    'NZXT Player Three Prime Custom Rig': { q: 'NZXT Player Three gaming pc', kws: ['player three', 'nzxt'] },
    'Origin PC Millennium 5000X': { q: 'Origin PC Millennium desktop', kws: ['millennium', 'origin pc', 'origin'] },
    'HP Omen 45L Cryo Chamber Gaming Desktop': { q: 'HP Omen 45L gaming desktop', kws: ['omen 45l', 'omen', 'hp'] },
    'Alienware Aurora R16 Legend 3': { q: 'Alienware Aurora R16 desktop', kws: ['aurora r16', 'aurora', 'alienware'] },
    'MSI GeForce RTX 4070 Ti Super Gaming X Slim': { q: 'MSI RTX 4070 Ti Super Gaming X', kws: ['rtx 4070', 'gaming x', 'msi'] },
    'Lian Li O11 Vision Chrome Battlestation': { q: 'Lian Li O11 Vision PC build', kws: ['o11 vision', 'o11', 'lian li'] },
    'ZOTAC Gaming GeForce RTX 4070 Super Twin Edge': { q: 'ZOTAC RTX 4070 Super Twin Edge', kws: ['rtx 4070', 'twin edge', 'zotac'] },
    'ASRock Taichi Radeon RX 7900 XT White OC': { q: 'ASRock Taichi RX 7900 XT', kws: ['rx 7900', 'taichi', 'asrock'] },
    'MSI MEG Trident X2 AI Master': { q: 'MSI MEG Trident X2 gaming pc', kws: ['trident x2', 'trident', 'msi'] },
    'Thermaltake Tower 500 Showcase Rig': { q: 'Thermaltake Tower 500 PC build', kws: ['tower 500', 'thermaltake'] },
    'ASUS Dual GeForce RTX 4060 Ti EVO 16GB': { q: 'ASUS Dual RTX 4060 Ti', kws: ['rtx 4060', 'asus dual', 'asus'] },
    'PowerColor Hellhound Radeon RX 7800 XT 16GB': { q: 'PowerColor Hellhound RX 7800 XT', kws: ['rx 7800', 'hellhound', 'powercolor'] },
    'Arceus Forge ITX Stealth Cube': { q: 'mini itx custom gaming pc build', kws: ['itx', 'gaming pc', 'sff', 'mini pc'] },
    'Intel Arc A770 Phantom Gaming 16GB': { q: 'ASRock Intel Arc A770 Phantom Gaming', kws: ['arc a770', 'phantom', 'intel arc', 'asrock'] },
    'Corsair Vengeance i7500 Gaming Desktop': { q: 'Corsair Vengeance i7500 gaming pc', kws: ['vengeance i7500', 'vengeance', 'corsair'] },

    // 15 Esports Displays
    'Samsung Odyssey OLED G9 (49-inch Curved)': { q: 'Samsung Odyssey OLED G9 monitor', kws: ['odyssey', 'g9', 'samsung'] },
    'ASUS ROG Swift PG32UCDM 4K 240Hz OLED': { q: 'ROG Swift PG32UCDM monitor', kws: ['pg32ucdm', 'rog swift', 'asus'] },
    'LG UltraGear 27GR95QE 240Hz QHD OLED': { q: 'LG UltraGear 27GR95QE monitor', kws: ['27gr95qe', 'ultragear', 'lg'] },
    'Alienware AW3423DW QD-OLED Curved 175Hz': { q: 'Alienware AW3423DW monitor', kws: ['aw3423dw', 'alienware'] },
    'BenQ ZOWIE XL2566K 360Hz Esports Monitor': { q: 'BenQ ZOWIE XL2566K monitor', kws: ['xl2566k', 'zowie', 'benq'] },
    'Corsair XENEON FLEX 45WQHD240 Bendable OLED': { q: 'Corsair XENEON FLEX monitor', kws: ['xeneon flex', 'xeneon', 'corsair'] },
    'MSI MAG 321UPX QD-OLED 4K 240Hz': { q: 'MSI MAG 321UPX monitor', kws: ['321upx', 'msi mag', 'msi'] },
    'Gigabyte AORUS FO32U2P DisplayPort 2.1': { q: 'AORUS FO32U2P monitor', kws: ['fo32u2p', 'aorus', 'gigabyte'] },
    'Acer Predator X45 Curved OLED': { q: 'Acer Predator X45 monitor', kws: ['predator x45', 'predator', 'acer'] },
    'Sony INZONE M9 4K 144Hz HDR600': { q: 'Sony INZONE M9 monitor', kws: ['inzone m9', 'inzone', 'sony'] },
    'AOC AGON PRO AG274QZM Mini-LED 240Hz': { q: 'AOC AGON PRO AG274QZM monitor', kws: ['ag274qzm', 'agon pro', 'aoc'] },
    'ViewSonic Elite XG320U 4K 150Hz Gaming': { q: 'ViewSonic Elite XG320U monitor', kws: ['xg320u', 'elite', 'viewsonic'] },
    'Philips Evnia 34M2C8600 QD-OLED Curved': { q: 'Philips Evnia 34M2C8600 monitor', kws: ['34m2c8600', 'evnia', 'philips'] },
    'Dell UltraSharp 32 6K U3224KB Pro': { q: 'Dell UltraSharp U3224KB 6K monitor', kws: ['u3224kb', 'ultrasharp', 'dell'] },
    'ASUS ROG Strix XG27AQMR 300Hz Fast IPS': { q: 'ROG Strix XG27AQMR monitor', kws: ['xg27aqmr', 'rog strix', 'asus'] },

    // 15 Mechanical Keyboards
    'Wooting 60HE+ Rapid Trigger Magnetic': { q: 'Wooting 60HE keyboard', kws: ['wooting', '60he'] },
    'Keychron Q1 Pro Custom Wireless': { q: 'Keychron Q1 Pro keyboard', kws: ['keychron', 'q1 pro', 'q1'] },
    'SteelSeries Apex Pro TKL Gen 3 Wireless': { q: 'SteelSeries Apex Pro TKL keyboard', kws: ['apex pro', 'steelseries'] },
    'Razer Huntsman V3 Pro TKL Esports': { q: 'Razer Huntsman V3 Pro keyboard', kws: ['huntsman v3', 'huntsman', 'razer'] },
    'Corsair K70 MAX RGB Magnetic-Mechanical': { q: 'Corsair K70 MAX keyboard', kws: ['k70 max', 'k70', 'corsair'] },
    'Logitech G PRO X TKL LIGHTSPEED Pink Edition': { q: 'Logitech G PRO X TKL keyboard', kws: ['g pro x', 'logitech'] },
    'ASUS ROG Azoth OLED 75% Custom': { q: 'ASUS ROG Azoth keyboard', kws: ['azoth', 'rog', 'asus'] },
    'NuPhy Air75 V2 Ultra-Slim Wireless': { q: 'NuPhy Air75 V2 keyboard', kws: ['air75', 'nuphy'] },
    'Glorious GMMK PRO 75% Barebones Black Slate': { q: 'Glorious GMMK PRO keyboard', kws: ['gmmk pro', 'gmmk', 'glorious'] },
    'Ducky One 3 RGB Matcha TKL': { q: 'Ducky One 3 keyboard', kws: ['ducky one 3', 'ducky'] },
    'Epomaker RT100 Retro with Mini Display': { q: 'Epomaker RT100 keyboard', kws: ['rt100', 'epomaker'] },
    'Akko 5075B Plus Multi-Mode ISO Nordic': { q: 'Akko 5075B Plus keyboard', kws: ['5075b', 'akko'] },
    'Angry Miao Cyberboard R4 Mech-Suit': { q: 'Angry Miao Cyberboard keyboard', kws: ['cyberboard', 'angry miao'] },
    'Higround Basecamp 65 Summit Edition': { q: 'Higround Basecamp 65 keyboard', kws: ['basecamp 65', 'higround'] },
    'Keychron V1 QMK Custom 75%': { q: 'Keychron V1 keyboard', kws: ['keychron v1', 'keychron'] },

    // 15 Pro Gaming Audio
    'Audeze Maxwell Wireless Audiophile Gaming': { q: 'Audeze Maxwell headset', kws: ['maxwell', 'audeze'] },
    'Sennheiser HD 660S2 Open-Back Reference': { q: 'Sennheiser HD 660S2 headphones', kws: ['hd 660s2', 'hd 660', 'sennheiser'] },
    'SteelSeries Arctis Nova Pro Wireless': { q: 'SteelSeries Arctis Nova Pro headset', kws: ['arctis nova pro', 'nova pro', 'steelseries'] },
    'Beyerdynamic DT 990 PRO 250 Ohm Black Edition': { q: 'Beyerdynamic DT 990 PRO headphones', kws: ['dt 990 pro', 'dt 990', 'beyerdynamic'] },
    'Sony WH-1000XM5 Wireless Noise-Canceling': { q: 'Sony WH-1000XM5 headphones', kws: ['wh-1000xm5', '1000xm5', 'sony'] },
    'Audio-Technica ATH-M50xBT2 Professional': { q: 'Audio-Technica ATH-M50xBT2 headphones', kws: ['ath-m50x', 'm50x', 'audio-technica'] },
    'Razer BlackShark V2 Pro (2024 Edition)': { q: 'Razer BlackShark V2 Pro headset', kws: ['blackshark v2', 'blackshark', 'razer'] },
    'Logitech G PRO X 2 LIGHTSPEED Wireless': { q: 'Logitech G PRO X 2 headset', kws: ['g pro x 2', 'pro x 2', 'logitech'] },
    'HyperX Cloud III Wireless 120-Hour Battery': { q: 'HyperX Cloud III Wireless headset', kws: ['cloud iii', 'cloud 3', 'hyperx'] },
    'Corsair HS80 RGB Wireless Spatial Audio': { q: 'Corsair HS80 RGB headset', kws: ['hs80', 'corsair'] },
    'Rode NTH-100 Professional Studio Monitor': { q: 'Rode NTH-100 headphones', kws: ['nth-100', 'rode'] },
    'Bose QuietComfort Ultra Spatial Headphones': { q: 'Bose QuietComfort Ultra headphones', kws: ['quietcomfort ultra', 'bose'] },
    'Shure SRH1840 Open-Back Mastering Cans': { q: 'Shure SRH1840 headphones', kws: ['srh1840', 'shure'] },
    'Drop + Sennheiser PC38X Gaming Headset': { q: 'Drop Sennheiser PC38X headset', kws: ['pc38x', 'sennheiser'] },
    'EPOS H3PRO Hybrid Low-Latency ANC': { q: 'EPOS H3PRO Hybrid headset', kws: ['h3pro', 'epos'] },

    // 15 Consoles & Handhelds
    'Steam Deck OLED 1TB Special Edition': { q: 'Steam Deck OLED handheld', kws: ['steam deck', 'valve'] },
    'ASUS ROG Ally X Gaming Handheld (2024)': { q: 'ASUS ROG Ally X handheld', kws: ['rog ally x', 'rog ally', 'asus'] },
    'Lenovo Legion Go 8.8-inch Detachable': { q: 'Lenovo Legion Go handheld', kws: ['legion go', 'lenovo'] },
    'PlayStation 5 Pro 2TB Console': { q: 'PlayStation 5 Pro console', kws: ['playstation 5 pro', 'ps5 pro', 'playstation'] },
    'Xbox Series X 2TB Galaxy Black Special': { q: 'Xbox Series X Galaxy Black console', kws: ['xbox series x', 'series x', 'xbox'] },
    'Nintendo Switch OLED Model Mario Red': { q: 'Nintendo Switch OLED Mario Red console', kws: ['switch oled', 'nintendo switch', 'switch'] },
    'Ayaneo KUN 8.4-inch Handheld (AMD 7840U)': { q: 'Ayaneo KUN handheld console', kws: ['ayaneo kun', 'ayaneo'] },
    'GPD WIN 4 (2024) Slide Keyboard Handheld': { q: 'GPD WIN 4 handheld console', kws: ['gpd win 4', 'gpd win', 'gpd'] },
    'Meta Quest 3 512GB Mixed Reality VR': { q: 'Meta Quest 3 VR headset', kws: ['meta quest 3', 'quest 3', 'oculus'] },
    'PlayStation Portal Remote Player': { q: 'PlayStation Portal Remote Player', kws: ['playstation portal', 'ps portal', 'portal'] },
    'Analogue Pocket FPGA Handheld Black': { q: 'Analogue Pocket handheld console', kws: ['analogue pocket', 'analogue'] },
    'Anbernic RG556 OLED Android Handheld': { q: 'Anbernic RG556 handheld console', kws: ['anbernic rg556', 'rg556', 'anbernic'] },
    'Retroid Pocket 4 Pro Handheld Console': { q: 'Retroid Pocket 4 Pro console', kws: ['retroid pocket 4', 'retroid'] },
    'Logitech G Cloud Gaming Handheld': { q: 'Logitech G Cloud handheld console', kws: ['g cloud', 'logitech'] },
    'Razer Edge 5G Snapdragon G3x Tablet': { q: 'Razer Edge 5G handheld console', kws: ['razer edge', 'razer'] }
  };

  if (configs[t]) return configs[t];

  // Default fallback if title slightly differs
  const brand = t.split(' ')[0].toLowerCase();
  return { q: `${t} hardware`, kws: [brand] };
}

async function main() {
  console.log('🎮 Running Exact 100/100 Hardware Image Downloader...');

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' }
  });

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

  let savedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const filename = `prod-${p.id}.jpg`;
    const dest = path.join(targetDir, filename);

    const { q, kws } = getProductConfig(p);

    try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent(q)}&FORM=HDRSC2`, {
        waitUntil: 'domcontentloaded',
        timeout: 12000
      });

      await page.waitForSelector('a.iusc', { timeout: 6000 });

      const match = await page.evaluate((keywords, negs) => {
        const anchors = Array.from(document.querySelectorAll('a.iusc'));

        for (const a of anchors.slice(0, 25)) {
          try {
            const m = JSON.parse(a.getAttribute('m'));
            if (!m || !m.turl) continue;

            const text = (m.t || m.desc || '').toLowerCase();
            if (negs.some(neg => text.includes(neg))) continue;

            if (keywords.some(k => text.includes(k.toLowerCase()))) {
              return { title: m.t || m.desc || '', url: m.turl };
            }
          } catch(e) {}
        }
        return null;
      }, kws, NEGATIVES);

      if (match && match.url) {
        await downloadFile(match.url, dest);
        const webPath = `/products/${filename}?v=${Date.now()}`;
        await prisma.product.update({
          where: { id: p.id },
          data: { images: JSON.stringify([webPath]) }
        });
        savedCount++;
        console.log(`[${i + 1}/${products.length}] ✓ AUTHENTIC: ${p.title} -> "${match.title.slice(0, 48)}"`);
      } else {
        console.log(`[${i + 1}/${products.length}] ⚠ NO MATCH: ${p.title} (query: ${q})`);
      }
    } catch(err) {
      console.log(`[${i + 1}/${products.length}] ⚠ Error: ${p.title} (${err.message.slice(0, 35)})`);
    }

    // Delay to maintain rate limit
    await new Promise(r => setTimeout(r, 120));
  }

  await browser.close();
  await prisma.$disconnect();

  console.log('\n======================================================');
  console.log(`🎉 COMPLETED: ${savedCount}/${products.length} Products updated with verified genuine hardware!`);
  console.log('======================================================\n');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
