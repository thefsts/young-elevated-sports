#!/usr/bin/env node
/**
 * Converts generated source PNGs into web-ready responsive JPEGs.
 *
 * Output per category:  {slug}.jpg (1600w), {slug}-md.jpg (1200w), {slug}-sm.jpg (800w)
 * All are re-encoded at quality 82 with mozjpeg, progressive, and stripped metadata.
 *
 * Usage: node scripts/optimize-media.mjs <manifest.json>
 * The manifest maps source file -> slug.
 */
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = join(ROOT, "public/media");
const manifestPath = process.argv[2];

if (!manifestPath || !existsSync(manifestPath)) {
  console.error("Usage: node scripts/optimize-media.mjs <manifest.json>");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
mkdirSync(OUT, { recursive: true });

const WIDTHS = [
  { suffix: "", width: 1600 },
  { suffix: "-md", width: 1200 },
  { suffix: "-sm", width: 800 },
];

for (const { source, slug } of manifest) {
  if (!existsSync(source)) {
    console.error(`missing source: ${source}`);
    process.exit(1);
  }
  for (const { suffix, width } of WIDTHS) {
    const target = join(OUT, `${slug}${suffix}.jpg`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(target);
    const meta = await sharp(target).metadata();
    console.log(`${basename(target).padEnd(34)} ${meta.width}x${meta.height}`);
  }
}

console.log(`\nOptimised ${manifest.length} categories x ${WIDTHS.length} sizes.`);
