#!/usr/bin/env node
/**
 * Approved-artwork lock.
 *
 * The client supplied two authoritative files that supersede every earlier
 * logo interpretation:
 *
 *   assets/brand/approved/ye-full-logo-approved.png  — the full brand lockup
 *   assets/brand/approved/ye-icon-approved.png       — the runner icon / favicon
 *
 * This script proves that the artwork actually shipped in `public/brand/` is
 * the approved artwork and not a redraw, a substitute, or a creative
 * reinterpretation. It rasterises both the approved master and the shipped
 * vector at the same width, reduces each to an ink mask, and compares them
 * with intersection-over-union.
 *
 * A redraw or a substituted mark scores far below the threshold; a faithful
 * re-render of the same artwork scores well above it. If this check fails the
 * brand has drifted and the build must stop.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const APPROVED = join(ROOT, "assets/brand/approved");
const BRAND = join(ROOT, "public/brand");

/** Minimum ink-mask IoU before we consider the artwork the same drawing. */
const MIN_IOU = 0.8;

/** Ink threshold on a 0-255 greyscale canvas composited over black. */
const INK = 40;

const failures = [];
const notes = [];

/**
 * Reduce an image to a normalised ink mask.
 * @param {string} input path to a raster or vector file
 * @param {number} width normalised width in pixels
 * @returns {Promise<{mask: Uint8Array, width: number, height: number}>}
 */
async function inkMask(input, width = 700) {
  // 1. Flatten onto black and read raw greyscale so we can find the ink bbox.
  //    SVGs are rendered at a high density so a 64 px favicon still yields a
  //    detailed mask instead of a blocky one.
  const density = input.toLowerCase().endsWith(".svg") ? 400 : 72;
  const { data, info } = await sharp(input, { density })
    .flatten({ background: "#000000" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < info.height; y += 1) {
    const row = y * info.width;
    for (let x = 0; x < info.width; x += 1) {
      if (data[row + x] > INK) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) throw new Error(`${input} rendered blank — no ink found`);

  // 2. Crop to the ink, then normalise onto a square canvas. "contain" keeps
  //    the aspect ratio, so a 1-2% aspect difference between a vector render
  //    and a raster export does not skew the comparison.
  const cropped = await sharp(input, { density })
    .flatten({ background: "#000000" })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .resize({ width, height: width, fit: "contain", background: "#000000" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mask = new Uint8Array(cropped.info.width * cropped.info.height);
  for (let i = 0; i < mask.length; i += 1) {
    mask[i] = cropped.data[i] > INK ? 1 : 0;
  }
  return { mask, width: cropped.info.width, height: cropped.info.height };
}

/**
 * Intersection-over-union of two ink masks, truncated to the shorter height.
 */
function iou(a, b) {
  if (a.width !== b.width) throw new Error("mask widths differ");
  const height = Math.min(a.height, b.height);
  let intersection = 0;
  let union = 0;
  for (let y = 0; y < height; y += 1) {
    const row = y * a.width;
    for (let x = 0; x < a.width; x += 1) {
      const av = a.mask[row + x];
      const bv = b.mask[row + x];
      if (av || bv) {
        union += 1;
        if (av && bv) intersection += 1;
      }
    }
  }
  return union === 0 ? 0 : intersection / union;
}

async function compare({ approved, shipped, label }) {
  if (!existsSync(approved)) {
    failures.push(`${label}: approved master missing at ${approved}`);
    return;
  }
  if (!existsSync(shipped)) {
    failures.push(`${label}: shipped asset missing at ${shipped}`);
    return;
  }
  const a = await inkMask(approved);
  const b = await inkMask(shipped);
  const score = iou(a, b);
  const pct = (score * 100).toFixed(1);
  if (score < MIN_IOU) {
    failures.push(
      `${label}: shipped artwork is NOT the approved artwork (IoU ${pct}%, minimum ${(MIN_IOU * 100).toFixed(0)}%)`,
    );
  } else {
    notes.push(`${label}: shipped artwork matches approved master (IoU ${pct}%)`);
  }
}

async function main() {
  // The full lockup, as vector and as the 2400 px raster export.
  await compare({
    label: "full logo (vector)",
    approved: join(APPROVED, "ye-full-logo-approved.png"),
    shipped: join(BRAND, "ye-runner-lockup.svg"),
  });
  await compare({
    label: "full logo (raster)",
    approved: join(APPROVED, "ye-full-logo-approved.png"),
    shipped: join(BRAND, "ye-runner-lockup-2400.png"),
  });

  // The runner icon, as the bare mark and as the square favicon composition.
  await compare({
    label: "icon mark (vector)",
    approved: join(APPROVED, "ye-icon-approved.png"),
    shipped: join(BRAND, "ye-runner-mark.svg"),
  });
  await compare({
    label: "icon mark (raster)",
    approved: join(APPROVED, "ye-icon-approved.png"),
    shipped: join(BRAND, "ye-runner-mark-1200.png"),
  });
  await compare({
    label: "favicon composition",
    approved: join(APPROVED, "ye-icon-approved.png"),
    shipped: join(BRAND, "favicon.svg"),
  });

  for (const note of notes) console.log(`  ok  ${note}`);
  for (const failure of failures) console.error(`  FAIL  ${failure}`);

  if (failures.length > 0) {
    console.error(`\nApproved-artwork lock failed (${failures.length} issue(s)).`);
    process.exit(1);
  }
  console.log(`\nApproved-artwork lock passed (${notes.length} checks).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
