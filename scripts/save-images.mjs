import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const outDir = path.resolve('public/img');
fs.mkdirSync(outDir, { recursive: true });

const remote = {
  'hero-farmer.webp': 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
  'field-sunrise.webp': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
  'drone.webp': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80',
  'tractor.webp': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80',
  'soil.webp': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  'greenhouse.webp': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
  'machinery.webp': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
  'water.webp': 'https://images.unsplash.com/photo-1437252611977-07f74518abd7?auto=format&fit=crop&w=1200&q=80',
  'farmer-field.webp': 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
  'contact-woman.webp': 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1400&q=80',
};

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location).then(resolve, reject);
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

for (const [name, url] of Object.entries(remote)) {
  const buf = await download(url);
  const file = path.join(outDir, name);
  await sharp(buf).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 68 }).toFile(file);
  const size = fs.statSync(file).size;
  console.log(name, Math.round(size / 1024) + 'kb');
}

for (const [src, dest] of [
  ['public/img/about.png', 'public/img/about.webp'],
  ['public/img/about2.png', 'public/img/about2.webp'],
  ['public/logo/logo.png', 'public/logo/logo.webp'],
  ['public/logo/white-logo.png', 'public/logo/white-logo.webp'],
]) {
  if (!fs.existsSync(src)) {
    console.log('missing', src);
    continue;
  }
  await sharp(src).webp({ quality: 72 }).toFile(dest);
  console.log(dest, Math.round(fs.statSync(dest).size / 1024) + 'kb');
}
