#!/usr/bin/env node
/**
 * Verifies that every local asset referenced in source exists on disk.
 * Scans app/, components/, lib/ for "/media/..." and "/brand/..." strings.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "lib"];
const PUBLIC = join(ROOT, "public");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if ([".ts", ".tsx"].includes(extname(full))) files.push(full);
  }
  return files;
}

const references = new Set();
const pattern = /["'`](\/(?:media|brand)\/[^"'`\s]+)["'`]/g;

for (const dir of SCAN_DIRS) {
  const base = join(ROOT, dir);
  if (!existsSync(base)) continue;
  for (const file of walk(base)) {
    const source = readFileSync(file, "utf8");
    let match;
    while ((match = pattern.exec(source)) !== null) {
      references.add(match[1]);
    }
  }
}

const missing = [];
for (const ref of [...references].sort()) {
  // Template-literal stems (e.g. `/media/${category}.jpg`) are resolved by the
  // media registry check below rather than as literal file names.
  if (ref.includes("${")) continue;
  const path = join(PUBLIC, ref.replace(/^\//, ""));
  if (!existsSync(path)) missing.push(ref);
}

// Verify every category in the media registry has its three derivatives.
const mediaSource = readFileSync(join(ROOT, "lib/content/media.ts"), "utf8");
const categoryBlock = mediaSource.match(/export type MediaCategory =([\s\S]*?);/);
if (categoryBlock) {
  const categories = [...categoryBlock[1].matchAll(/"([a-z-]+)"/g)].map((m) => m[1]);
  for (const category of categories) {
    for (const suffix of ["", "-md", "-sm"]) {
      const file = `/media/${category}${suffix}.jpg`;
      if (!existsSync(join(PUBLIC, file.replace(/^\//, "")))) missing.push(file);
    }
  }
}

console.log(`Checked ${references.size} local asset reference(s).`);
if (missing.length) {
  console.error("Missing assets:");
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}
console.log("All referenced assets exist.");
