#!/usr/bin/env node
/**
 * Verifies that every required route from the Batch 001 directive has a page file,
 * and that special files (not-found, error, sitemap, robots) exist.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const pageRoutes = [
  "/",
  "/about",
  "/training",
  "/performance-technology",
  "/athletes",
  "/results",
  "/media",
  "/contact",
  "/start-training",
  "/registration",
  "/registration/athlete",
  "/registration/parent",
  "/registration/school",
  "/registration/partner",
  "/waivers",
  "/policies",
  "/privacy",
  "/terms",
  "/accessibility",
];

const specialFiles = [
  "app/not-found.tsx",
  "app/error.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
];

function pagePath(route) {
  return route === "/" ? join(ROOT, "app/page.tsx") : join(ROOT, "app", route.slice(1), "page.tsx");
}

const missing = [];
for (const route of pageRoutes) {
  if (!existsSync(pagePath(route))) missing.push(route);
}
for (const file of specialFiles) {
  if (!existsSync(join(ROOT, file))) missing.push(file);
}
if (!existsSync(join(ROOT, "app/waivers/[slug]/page.tsx"))) missing.push("app/waivers/[slug]/page.tsx");

console.log(`Checked ${pageRoutes.length} routes + ${specialFiles.length} special files.`);
if (missing.length) {
  console.error("Missing:");
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}
console.log("All required routes and special files exist.");
