#!/usr/bin/env node
/**
 * Imports a client-supplied photograph and generates the three responsive
 * derivatives the site expects.
 *
 * The original file is never modified: it is copied into
 * `assets/photos/originals/<slug>.<ext>` first, and every derivative is written
 * from that copy.
 *
 * Output (matching `lib/content/media.ts`):
 *   public/media/<slug>.jpg     1600 px wide
 *   public/media/<slug>-md.jpg  1200 px wide
 *   public/media/<slug>-sm.jpg   800 px wide
 *
 * Usage:
 *   node scripts/import-photo.mjs <source> <slug> [--focus=0.5,0.4] [--ratio=1.5]
 *
 *   --focus   focal point as x,y in 0..1 of the source image. The crop window is
 *             positioned so this point stays as close to centre as possible.
 *             Use it to keep faces and equipment in frame.
 *   --ratio   target aspect ratio (width / height). Default 1.5 (3:2 landscape).
 *             Pass 0 to keep the source aspect ratio and only resize.
 *
 * Colour: no tint is applied. Only a mild exposure lift is applied when the
 * source is genuinely dark, so photographs keep natural skin tones and the
 * approved black/gold grade is not baked into the file.
 */
import { existsSync, mkdirSync, copyFileSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ORIGINALS = join(ROOT, "assets/photos/originals");
const OUT = join(ROOT, "public/media");

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith("--")).map((a) => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  }),
);

const [source, slug] = positional;
if (!source || !slug) {
  console.error("Usage: node scripts/import-photo.mjs <source> <slug> [--focus=x,y] [--ratio=1.5]");
  process.exit(1);
}
if (!existsSync(source)) {
  console.error(`missing source: ${source}`);
  process.exit(1);
}

const [fx, fy] = (flags.focus || "0.5,0.5").split(",").map(Number);
const ratio = flags.ratio === undefined ? 1.5 : Number(flags.ratio);

mkdirSync(ORIGINALS, { recursive: true });
mkdirSync(OUT, { recursive: true });

const ext = extname(source) || ".jpg";
const originalTarget = join(ORIGINALS, `${slug}${ext}`);
if (!existsSync(originalTarget)) {
  copyFileSync(source, originalTarget);
  console.log(`original preserved -> ${originalTarget}`);
} else {
  console.log(`original already preserved -> ${originalTarget}`);
}

const meta = await sharp(originalTarget).metadata();
const W = meta.width;
const H = meta.height;
console.log(`source ${W}x${H} ${meta.format}`);

// Crop window that keeps the focal point as centred as the ratio allows.
let cropW = W;
let cropH = H;
if (ratio > 0) {
  if (W / H > ratio) {
    cropW = Math.round(H * ratio);
    cropH = H;
  } else {
    cropW = W;
    cropH = Math.round(W / ratio);
  }
}
const left = Math.max(0, Math.min(W - cropW, Math.round(fx * W - cropW / 2)));
const top = Math.max(0, Math.min(H - cropH, Math.round(fy * H - cropH / 2)));

const WIDTHS = [
  { suffix: "", width: 1600 },
  { suffix: "-md", width: 1200 },
  { suffix: "-sm", width: 800 },
];

// Mild exposure lift only for genuinely dark sources.
const stats = await sharp(originalTarget).stats();
const mean = stats.channels.slice(0, 3).reduce((a, c) => a + c.mean, 0) / 3;
const brighten = mean < 70 ? 1.12 : 1;
if (brighten > 1) console.log(`source is dark (mean luma ${mean.toFixed(1)}); applying ${brighten}x exposure lift`);

for (const { suffix, width } of WIDTHS) {
  const target = join(OUT, `${slug}${suffix}.jpg`);
  await sharp(originalTarget)
    .extract({ left, top, width: cropW, height: cropH })
    .resize({ width, withoutEnlargement: true })
    .modulate({ brightness: brighten })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(target);
  const kb = (statSync(target).size / 1024).toFixed(0);
  console.log(`  ${basename(target)}  ${width}w  ${kb} kB`);
}

console.log(`
Next steps:
  1. In lib/content/media.ts set the asset's src/srcMedium/srcSmall to /media/${slug}*.jpg
  2. Replace alt and caption with meaningful descriptions of the actual scene
  3. Set placeholder: false and credit to the photographer or "Supplied by YESP"
  4. Record the release in docs/photo-replacement-inventory.md
`);
