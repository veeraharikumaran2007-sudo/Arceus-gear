const fs = require('fs');

async function main() {
  const content = fs.readFileSync('prisma/seed.ts', 'utf8');
  const urls = [...new Set([...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[^"'`\s\\]+/g)].map(m => m[0]))];
  console.log('Total unique URLs found in seed.ts:', urls.length);

  const bad = [];
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      if (res.status >= 400) {
        bad.push({ url: u, status: res.status });
      }
    } catch (e) {
      bad.push({ url: u, error: e.message });
    }
  }

  console.log('Broken URLs count:', bad.length);
  if (bad.length > 0) {
    console.log('Broken URLs list:');
    bad.forEach(b => console.log(b.url, b.status));
  }
}

main();
