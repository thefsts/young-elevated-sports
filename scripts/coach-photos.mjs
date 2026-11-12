/**
 * Coach photography pipeline (Checkpoint 003).
 *
 * Reads the untouched client originals from assets/coach/originals/ (never
 * served publicly) and writes:
 *
 *   public/media/coach/…        cleared, EXIF-stripped public exports
 *   review/coach-photos/…       EXIF-stripped private review copies
 *
 * sharp strips all metadata (including GPS) unless withMetadata() is called,
 * so every export below is location-free by construction.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "assets/coach/originals");
const PUB = path.join(ROOT, "public/media/coach");
const REVIEW = path.join(ROOT, "review/coach-photos");

// Face box for Young2.jpg measured with OpenCV YuNet (normalised 0-1).
const FACE = { x: 0.486, y: 0.08, w: 0.107, h: 0.124 };

async function portraitCrop() {
  const src = path.join(SRC, "Young2.jpg");
  const meta = await sharp(src).metadata();
  const W = meta.width;
  const H = meta.height;

  // 4:5 head-and-shoulders portrait: the face occupies ~26% of the frame
  // height, centred horizontally, with a small amount of headroom.
  const faceH = FACE.h * H;
  const cropH = Math.round(faceH / 0.26);
  const cropW = Math.round(cropH * 0.8);
  const faceCx = (FACE.x + FACE.w / 2) * W;
  let left = Math.round(faceCx - cropW / 2);
  left = Math.max(0, Math.min(left, W - cropW));
  const top = Math.max(0, Math.round(FACE.y * H - cropH * 0.06));

  return { src, region: { left, top, width: cropW, height: cropH } };
}

async function main() {
  await mkdir(PUB, { recursive: true });
  await mkdir(REVIEW, { recursive: true });

  const { src, region } = await portraitCrop();

  // --- 1. Portrait crop, responsive variants -------------------------------
  const sizes = [
    ["coach-young-portrait.jpg", 1200, 1500, 86],
    ["coach-young-portrait-md.jpg", 800, 1000, 84],
    ["coach-young-portrait-sm.jpg", 400, 500, 82],
  ];
  const report = [];
  for (const [name, w, h, q] of sizes) {
    const out = path.join(PUB, name);
    const info = await sharp(src)
      .extract(region)
      .resize(w, h, { fit: "cover", position: "top" })
      .jpeg({ quality: q, mozjpeg: true, progressive: true, chromaSubsampling: "4:4:4" })
      .toFile(out);
    report.push({ name, bytes: info.size, width: info.width, height: info.height });
  }

  // --- 2. Black-and-gold branded treatment --------------------------------
  const brandOut = path.join(PUB, "coach-young-portrait-brand.jpg");
  const brandInfo = await sharp(src)
    .extract(region)
    .resize(1200, 1500, { fit: "cover", position: "top" })
    .grayscale()
    .linear(1.12, -14) // restrained contrast lift
    .tint({ r: 214, g: 178, b: 106 }) // warm gold duotone
    .composite([
      {
        input: Buffer.from(
          `<svg width="1200" height="1500" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <radialGradient id="v" cx="50%" cy="38%" r="78%">
                 <stop offset="55%" stop-color="#000" stop-opacity="0"/>
                 <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
               </radialGradient>
             </defs>
             <rect width="1200" height="1500" fill="url(#v)"/>
           </svg>`,
        ),
        blend: "over",
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true, progressive: true })
    .toFile(brandOut);
  report.push({
    name: "coach-young-portrait-brand.jpg",
    bytes: brandInfo.size,
    width: brandInfo.width,
    height: brandInfo.height,
  });

  // --- 3. Transparent-background cutout (rembg) ---------------------------
  // Handled by a separate Python step (scripts/cutout.py) because rembg is
  // Python-only; this script only records the expected output path.

  // --- 4. Private review copies of the group photographs ------------------
  // These contain multiple identifiable people and are NOT published until
  // media releases are confirmed by the client.
  const groups = [
    ["IMG_3643.jpeg", "review-3643.jpg"],
    ["IMG_1652.jpg", "review-1652.jpg"],
    ["IMG_0232.jpeg", "review-0232.jpg"],
    ["IMG_8097.jpeg", "review-8097.jpg"],
  ];
  const reviewReport = [];
  for (const [file, outName] of groups) {
    const out = path.join(REVIEW, outName);
    const info = await sharp(path.join(SRC, file))
      .rotate()
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    reviewReport.push({ source: file, name: outName, bytes: info.size, width: info.width, height: info.height });
  }

  await writeFile(
    path.join(ROOT, "review/coach-photos/asset-report.json"),
    JSON.stringify({ publicExports: report, reviewCopies: reviewReport }, null, 2),
  );
  console.log(JSON.stringify({ publicExports: report, reviewCopies: reviewReport }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
