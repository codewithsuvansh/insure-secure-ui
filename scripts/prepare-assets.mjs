// Generates logo variants, favicon assets, the social image and optimised photos.
// Run with: node scripts/prepare-assets.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const logoPath = path.join(root, 'src/assets-source/logo-original.jpg');

const photos = {
  family: 'photo-1659352787906-f809a3b9e86e',
  health: 'photo-1612349317150-e413f6a5b16d',
  car: 'photo-1748215041497-fdf9c4727681',
  home: 'photo-1657302157898-eda546941dde',
  business: 'photo-1741275273537-e172e1411b3a',
  workshop: 'photo-1764115424737-25aca6f47835',
  travel: 'photo-1532968899863-5b52ef155913',
  generations: 'photo-1780314501266-0158179ba545',
  farm: 'photo-1714466630463-877cef3f8a28',
  mother: 'photo-1589169011402-8b2cbd1ee593',
  planning: 'photo-1683107695974-98a9fddb249a',
  couple: 'photo-1625463006115-09f08489f591',
  retired: 'photo-1595142062395-98e89b1ad216',
  coins: 'photo-1565373679107-344d38dbf734',
};
const widths = [480, 800, 1200];

/** Regions as fractions of the source image. */
const edits = {
  // The source shows a real vehicle's registration plate, so it is blurred before anything else.
  car: {
    blur: { x: 0.725, y: 0.694, w: 0.128, h: 0.04 },
    crop: { y: 0.22, h: 0.78 },
  },
};

/** Removes only the white background connected to the image edge, keeping white inside the shield. */
async function transparentCrop({ left, top, width, height }) {
  const { data, info } = await sharp(logoPath)
    .extract({ left, top, width, height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const out = Buffer.alloc(w * h * 4);
  const isLight = (i) => Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) > 226;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop();
    if (seen[i] || !isLight(i)) continue;
    seen[i] = 1;
    const x = i % w;
    const y = (i - x) / w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - w);
    if (y < h - 1) stack.push(i + w);
  }
  const nearBg = (x, y, r) => {
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && seen[ny * w + nx]) return true;
      }
    return false;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      let [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
      let a = 255;
      if (seen[i]) a = 0;
      else if (nearBg(x, y, 2)) {
        // Soft edge: treat the pixel as a blend with white and recover its colour.
        a = Math.min(255, Math.round(((255 - Math.min(r, g, b)) / 110) * 255));
        if (a > 0) {
          const k = a / 255;
          r = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - k)) / k)));
          g = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - k)) / k)));
          b = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - k)) / k)));
        }
      }
      out[i * 4] = r;
      out[i * 4 + 1] = g;
      out[i * 4 + 2] = b;
      out[i * 4 + 3] = a;
    }
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } }).png();
}

async function logos() {
  const emblem = await transparentCrop({ left: 212, top: 102, width: 438, height: 310 });
  const emblemPng = await emblem.toBuffer();
  const emblemTrim = await sharp(emblemPng).trim().png().toBuffer();
  await sharp(emblemTrim).resize({ width: 260 }).webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(path.join(root, 'public/brand/emblem.webp'));

  // The browser favicon is the hand-drawn src/app/icon.svg; the logo emblem is used for the Apple icon.
  const appleInner = await sharp(emblemTrim).resize(148, 148, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
    .composite([{ input: appleInner, top: 16, left: 16 }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(root, 'src/app/apple-icon.png'));
  await sharp(logoPath).extract({ left: 80, top: 90, width: 710, height: 590 }).webp({ quality: 90 }).toFile(path.join(root, 'public/brand/logo-full.webp'));

  // Social sharing image.
  const emblemSocial = await sharp(emblemTrim).resize({ width: 330 }).toBuffer();
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f7f5ee"/>
    <rect y="600" width="1200" height="30" fill="#0d3656"/>
    <text x="90" y="350" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#0d3656">Insure <tspan fill="#48801b">Secure</tspan></text>
    <text x="90" y="412" font-family="Arial, sans-serif" font-size="30" fill="#0d3656">Financial Services, Jalandhar</text>
    <text x="90" y="484" font-family="Arial, sans-serif" font-size="30" fill="#40566b">Insurance, mutual funds and SIPs, explained in plain language</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: emblemSocial, top: 50, left: 80 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public/og.png'));
}

async function photoSet() {
  for (const [name, id] of Object.entries(photos)) {
    const res = await fetch(`https://images.unsplash.com/${id}?fm=jpg&q=85&w=2200`);
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    let buf = Buffer.from(await res.arrayBuffer());
    const edit = edits[name];
    if (edit) {
      const { width: W, height: H } = await sharp(buf).metadata();
      const box = {
        left: Math.round(edit.blur.x * W),
        top: Math.round(edit.blur.y * H),
        width: Math.round(edit.blur.w * W),
        height: Math.round(edit.blur.h * H),
      };
      const patch = await sharp(buf).extract(box).blur(22).toBuffer();
      buf = await sharp(buf).composite([{ input: patch, left: box.left, top: box.top }]).jpeg({ quality: 92 }).toBuffer();
      buf = await sharp(buf)
        .extract({ left: 0, top: Math.round(edit.crop.y * H), width: W, height: Math.round(edit.crop.h * H) })
        .jpeg({ quality: 90 })
        .toBuffer();
    }
    for (const width of widths) {
      await sharp(buf).resize({ width, withoutEnlargement: true }).webp({ quality: 62, effort: 6 }).toFile(path.join(root, `public/images/${name}-${width}.webp`));
    }
    const meta = await sharp(buf).metadata();
    console.log(name, meta.width, meta.height);
  }
}

await logos();
if (!process.argv.includes('--logos-only')) await photoSet();
