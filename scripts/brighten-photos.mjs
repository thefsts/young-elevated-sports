#!/usr/bin/env node
/**
 * Photography brightness correction — Checkpoint 005.
 *
 * The client approved the homepage design but reported that photographs read
 * too dark. Two causes compounded:
 *
 *   1. Several shipped derivatives have a low mean luminance (hero 32/255,
 *      strength 32/255, group sessions 38/255).
 *   2. Layout overlays stacked on top of them (PageHero renders the photo at
 *      40% opacity, then lays two full-bleed gradients over it).
 *
 * This script fixes cause 1 only: it lifts the shipped derivatives with a
 * gamma-weighted curve that opens the shadows and midtones without clipping
 * highlights. Overlay reduction is handled in the components so the two
 * changes stay independently reviewable.
 *
 * Originals are copied to assets/media/pre-brighten/ once, so the operation is
 * idempotent and reversible. Running it twice does not double-brighten.
 */
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, renameSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const MEDIA = join(ROOT, "public/media");
const BACKUP = join(ROOT, "assets/media/pre-brighten");

/**
 * Shadow-lift strength. The curve is
 *   out = in + A * (1 - in/255)^2 * 255
 * which moves deep shadows the most and leaves highlights almost untouched, so
 * skin tones and gold accents do not blow out while the frame opens up.
 */
const LIFT_STRENGTH = 0.20;

/** Build the 256-entry lookup table once. */
const LUT = (() => {
  const table = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    const n = i / 255;
    const lifted = n + LIFT_STRENGTH * Math.pow(1 - n, 2);
    table[i] = Math.round(Math.min(1, lifted) * 255);
  }
  return table;
})();

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png)$/i.test(entry)) out.push(full);
  }
  return out;
}

function meanLuma(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
  return sum / data.length;
}

const files = walk(MEDIA);
mkdirSync(BACKUP, { recursive: true });

const report = [];

for (const file of files) {
  const rel = relative(MEDIA, file);
  const backup = join(BACKUP, rel);

  // First run preserves the true original; later runs reuse it so the lift is
  // always applied once to the original rather than compounding.
  if (!existsSync(backup)) {
    mkdirSync(dirname(backup), { recursive: true });
    copyFileSync(file, backup);
  }

  const source = backup;
  const isPng = /\.png$/i.test(file);

  const before = await sharp(source)
    .resize({ width: 200 })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Read the original as raw RGBA (or RGB), apply the LUT to colour channels
  // only, and copy the alpha channel through untouched. The coach cut-out is a
  // transparent PNG; flattening it would turn the background black.
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.allocUnsafe(data.length);
  for (let i = 0; i < data.length; i += 4) {
    out[i] = LUT[data[i]];
    out[i + 1] = LUT[data[i + 1]];
    out[i + 2] = LUT[data[i + 2]];
    out[i + 3] = data[i + 3];
  }

  let pipeline = sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  if (isPng) {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({
      quality: 84,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    });
  }

  const tmp = file + ".tmp";
  await pipeline.toFile(tmp);

  const after = await sharp(tmp)
    .resize({ width: 200 })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  renameSync(tmp, file);

  report.push({
    file: rel,
    before: Number(meanLuma(before.data).toFixed(1)),
    after: Number(meanLuma(after.data).toFixed(1)),
  });
}

console.log("file".padEnd(34), "before", "->", "after");
for (const r of report.sort((a, b) => a.before - b.before)) {
  console.log(r.file.padEnd(34), String(r.before).padStart(6), "->", String(r.after).padStart(5));
}

const avgBefore = report.reduce((s, r) => s + r.before, 0) / report.length;
const avgAfter = report.reduce((s, r) => s + r.after, 0) / report.length;
console.log(`\n${report.length} files · mean luminance ${avgBefore.toFixed(1)} -> ${avgAfter.toFixed(1)}`);
