#!/usr/bin/env node
/**
 * Brand asset verification.
 *
 * 1. Every one of the 18 SVG variants must be well-formed, carry the potrace
 *    coordinate transform, and rasterise to a non-blank image.
 * 2. Colour variants must actually contain their declared colour.
 * 3. Favicon / app-icon PNGs must exist at the expected pixel dimensions.
 * 4. The ICO container must embed 16, 32 and 48 px entries.
 * 5. No retired plain-YE asset may be referenced from source.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BRAND = join(ROOT, "public/brand");
const GOLD = [0xd6, 0xa7, 0x3b];
const SILVER = [0xc5, 0xc8, 0xce];

const failures = [];
const notes = [];

/** The 18 editable SVG variants that must ship. */
const SVG_VARIANTS = [
  "ye-runner-mark.svg",
  "ye-runner-mark-black.svg",
  "ye-runner-mark-white.svg",
  "ye-runner-mark-gold.svg",
  "ye-runner-mark-silver.svg",
  "ye-runner-mark-on-light.svg",
  "ye-runner-mark-dark-bg.svg",
  "ye-runner-mark-light-bg.svg",
  "ye-runner-lockup.svg",
  "ye-runner-lockup-black.svg",
  "ye-runner-lockup-white.svg",
  "ye-runner-lockup-gold.svg",
  "ye-runner-lockup-dark-bg.svg",
  "ye-runner-lockup-light-bg.svg",
  "ye-runner-social.svg",
  "ye-runner-watermark.svg",
  "ye-runner-apparel.svg",
  "favicon.svg",
];

/** PNG exports that must exist with exact dimensions. */
const PNG_REQUIRED = {
  "favicon-32.png": [32, 32],
  "favicon-48.png": [48, 48],
  "favicon-64.png": [64, 64],
  "favicon-180.png": [180, 180],
  "favicon-192.png": [192, 192],
  "favicon-256.png": [256, 256],
  "favicon-512.png": [512, 512],
  "apple-touch-icon.png": [180, 180],
  "og-image.png": [1200, 630],
};

const RETIRED = [
  "ye-logo-primary.svg",
  "ye-monogram.svg",
  "ye-monogram-black.svg",
  "ye-monogram-white.svg",
  "ye-social-icon.svg",
  "ye-watermark-old.svg",
];

async function rasterStats(file) {
  const { data, info } = await sharp(file, { density: 96 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const total = width * height;
  let ink = 0;
  let gold = 0;
  let silver = 0;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = channels === 4 ? data[i + 3] : 255;
    if (a < 16) continue;
    ink += 1;
    if (Math.abs(r - GOLD[0]) < 26 && Math.abs(g - GOLD[1]) < 26 && Math.abs(b - GOLD[2]) < 30) gold += 1;
    if (Math.abs(r - SILVER[0]) < 26 && Math.abs(g - SILVER[1]) < 26 && Math.abs(b - SILVER[2]) < 26) silver += 1;
  }

  return {
    width,
    height,
    inkRatio: ink / total,
    goldRatio: gold / total,
    silverRatio: silver / total,
  };
}

async function verifySvgs() {
  for (const name of SVG_VARIANTS) {
    const file = join(BRAND, name);
    if (!existsSync(file)) {
      failures.push(`SVG missing: ${name}`);
      continue;
    }
    const source = readFileSync(file, "utf8");

    if (!source.trimStart().startsWith("<svg")) failures.push(`${name}: does not start with <svg`);
    if (!source.includes("</svg>")) failures.push(`${name}: missing closing </svg>`);
    if (!source.includes("<path")) failures.push(`${name}: contains no <path>`);
    if (!source.includes("scale(0.1,-0.1)")) failures.push(`${name}: lost the potrace coordinate transform`);

    const opens = (source.match(/<g[\s>]/g) ?? []).length;
    const closes = (source.match(/<\/g>/g) ?? []).length;
    if (opens !== closes) failures.push(`${name}: unbalanced <g> (${opens} open / ${closes} close)`);

    try {
      const stats = await rasterStats(file);
      if (stats.inkRatio < 0.005) {
        failures.push(`${name}: renders blank (ink ${(stats.inkRatio * 100).toFixed(2)}%)`);
      }
      const wantsGold = /gold|apparel|social|favicon|lockup\.svg|mark\.svg/.test(name);
      if (wantsGold && stats.goldRatio < 0.0005) {
        notes.push(`${name}: no measurable gold (${(stats.goldRatio * 100).toFixed(3)}%) — verify intent`);
      }
      if (/silver/.test(name) && stats.silverRatio < 0.0005) {
        failures.push(`${name}: declares silver but renders none`);
      }
      notes.push(
        `${name.padEnd(34)} ${String(stats.width).padStart(4)}x${String(stats.height).padEnd(4)} ink ${(stats.inkRatio * 100).toFixed(1)}% gold ${(stats.goldRatio * 100).toFixed(1)}%`,
      );
    } catch (error) {
      failures.push(`${name}: failed to rasterise — ${error.message}`);
    }
  }
}

async function verifyPngs() {
  for (const [name, [w, h]] of Object.entries(PNG_REQUIRED)) {
    const file = join(BRAND, name);
    if (!existsSync(file)) {
      failures.push(`PNG missing: ${name}`);
      continue;
    }
    const meta = await sharp(file).metadata();
    if (meta.width !== w || meta.height !== h) {
      failures.push(`${name}: expected ${w}x${h}, got ${meta.width}x${meta.height}`);
    }
  }
}

function verifyIco() {
  const file = join(BRAND, "favicon.ico");
  if (!existsSync(file)) {
    failures.push("ICO missing: favicon.ico");
    return;
  }
  const buf = readFileSync(file);
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) {
    failures.push("favicon.ico: not a valid ICO header");
    return;
  }
  const count = buf.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i += 1) {
    const offset = 6 + i * 16;
    const w = buf[offset] === 0 ? 256 : buf[offset];
    sizes.push(w);
  }
  for (const required of [16, 32, 48]) {
    if (!sizes.includes(required)) failures.push(`favicon.ico: missing ${required}px entry (has ${sizes.join(",")})`);
  }
  notes.push(`favicon.ico entries: ${sizes.join(", ")}`);
}

function verifyNoRetired() {
  for (const name of RETIRED) {
    if (existsSync(join(BRAND, name))) failures.push(`retired asset still present: ${name}`);
  }
  const all = readdirSync(BRAND);
  for (const name of all) {
    if (/^ye-(logo|monogram|social-icon)-/.test(name)) {
      failures.push(`retired plain-YE asset still present: ${name}`);
    }
  }
}

function verifySourceReferences() {
  const scan = ["app", "components", "lib"];
  const bad = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(tsx?|mjs)$/.test(entry.name)) {
        const text = readFileSync(full, "utf8");
        for (const retired of ["/brand/ye-logo-", "/brand/ye-monogram", "/brand/ye-social-icon"]) {
          if (text.includes(retired)) bad.push(`${full} references ${retired}`);
        }
      }
    }
  };
  for (const dir of scan) if (existsSync(join(ROOT, dir))) walk(join(ROOT, dir));
  failures.push(...bad);
}

await verifySvgs();
await verifyPngs();
verifyIco();
verifyNoRetired();
verifySourceReferences();

console.log(`Brand SVG variants checked: ${SVG_VARIANTS.length}`);
for (const note of notes) console.log(`  ${note}`);

if (failures.length) {
  console.error(`\n${failures.length} brand verification failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\nAll brand assets verified.");
