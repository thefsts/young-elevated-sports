/**
 * Checkpoint 003 photo addendum pipeline.
 *
 * Four additional client photographs arrived with the photo addendum. All four
 * are multi-person frames, so none of them may be published until the people
 * in them have signed releases — particularly the children. This script does
 * the two things that are safe to do without a release:
 *
 *   1. Preserves an EXIF-stripped master in assets/coach/originals/ (never
 *      served publicly, and git-ignored for the IMG_* pattern).
 *   2. Writes a private, EXIF-stripped review derivative to
 *      review/coach-photos/ so the PM and the client can decide which frames
 *      are worth clearing.
 *
 * Nothing here writes into public/. Publication is a separate, deliberate act
 * that happens only after a release is recorded against the frame.
 *
 * sharp strips all metadata (including GPS) unless withMetadata() is called,
 * so every file written below is location-free by construction.
 */
import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const UPLOADS = path.join(ROOT, "..");
const SRC = path.join(ROOT, "assets/coach/originals");
const REVIEW = path.join(ROOT, "review/coach-photos");

/**
 * Face counts measured with OpenCV YuNet (score threshold 0.6) on the
 * full-resolution original. Recorded here so the review copies and the media
 * registry agree with the actual pixels.
 */
const FRAMES = [
  { file: "IMG_5608.jpeg", faces: 20, note: "Large group session; twenty faces detected." },
  { file: "IMG_1468.jpeg", faces: 5, note: "Small group; five faces detected." },
  { file: "IMG_7389.jpeg", faces: 2, note: "Two people; second face detected at 0.91 confidence." },
  { file: "IMG_0244.jpeg", faces: 30, note: "Camp-scale group; thirty faces detected." },
];

/** Review derivative width. Large enough to judge, small enough to email. */
const REVIEW_WIDTH = 1600;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(SRC, { recursive: true });
  await mkdir(REVIEW, { recursive: true });

  const report = [];

  for (const frame of FRAMES) {
    const upload = path.join(UPLOADS, frame.file);
    const master = path.join(SRC, frame.file);

    if (!(await exists(upload)) && !(await exists(master))) {
      console.warn(`  skip  ${frame.file} — not found`);
      continue;
    }

    // 1. Preserve an EXIF-stripped master. Re-encode at high quality so the
    //    archive copy stays faithful while losing camera and GPS metadata.
    if (await exists(upload)) {
      await sharp(upload)
        .rotate() // honour the EXIF orientation before the tag is dropped
        .jpeg({ quality: 95, chromaSubsampling: "4:4:4", mozjpeg: true })
        .toFile(master);
    }

    // 2. Private review derivative with a restrained exposure lift.
    const reviewName = `review-${frame.file.replace(/\.jpe?g$/i, "")}.jpg`;
    const reviewPath = path.join(REVIEW, reviewName);
    const info = await sharp(master)
      .rotate()
      .resize({ width: REVIEW_WIDTH, withoutEnlargement: true })
      .modulate({ brightness: 1.04 })
      .linear(1.03, -4)
      .jpeg({ quality: 84, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toFile(reviewPath);

    const masterMeta = await sharp(master).metadata();
    const reviewMeta = await sharp(reviewPath).metadata();

    report.push({
      source: frame.file,
      faces: frame.faces,
      note: frame.note,
      master: path.relative(ROOT, master),
      masterSize: [masterMeta.width, masterMeta.height],
      review: path.relative(ROOT, reviewPath),
      reviewSize: [reviewMeta.width, reviewMeta.height],
      reviewBytes: info.size,
      exifStripped: !masterMeta.exif && !reviewMeta.exif,
      publicationStatus: "pending-release",
    });

    console.log(
      `  ok    ${frame.file} → ${reviewName} (${reviewMeta.width}×${reviewMeta.height}, ${frame.faces} faces)`,
    );
  }

  await writeFile(
    path.join(REVIEW, "addendum-report.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), frames: report }, null, 2)}\n`,
  );
  console.log(`\nWrote ${report.length} review derivative(s). Nothing published.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
