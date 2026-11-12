import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  coachPhotos,
  coachPhotoQueue,
  coachPortrait,
  coachPortraitCutout,
  coachPortraitBrand,
  isAuthentic,
  media,
  mediaList,
} from "@/lib/content/media";

const ROOT = process.cwd();
const pub = (src: string) => path.join(ROOT, "public", src.replace(/^\//, ""));

describe("checkpoint 003 — coach photography registry", () => {
  it("publishes exactly one cleared client photograph", () => {
    expect(coachPhotos).toHaveLength(1);
    expect(coachPhotos[0].id).toBe("coach-young-portrait");
    expect(coachPhotos[0].status).toBe("cleared");
  });

  it("marks authentic photography as non-placeholder", () => {
    expect(coachPortrait.placeholder).toBe(false);
    expect(coachPortraitCutout.placeholder).toBe(false);
    expect(coachPortraitBrand.placeholder).toBe(false);
    expect(isAuthentic(coachPortrait)).toBe(true);
    expect(isAuthentic(media.strength)).toBe(false);
  });

  it("keeps every placeholder asset flagged as a placeholder", () => {
    expect(mediaList).toHaveLength(12);
    for (const asset of mediaList) {
      expect(asset.placeholder).toBe(true);
      expect(asset.credit).toMatch(/placeholder/i);
    }
  });

  it("ships every referenced public file", () => {
    const paths = [
      coachPortrait.src,
      coachPortrait.srcMedium,
      coachPortrait.srcSmall,
      coachPortraitCutout.src,
      coachPortraitCutout.srcSmall,
      coachPortraitBrand.src,
    ];
    for (const p of paths) {
      expect(existsSync(pub(p)), `${p} should exist`).toBe(true);
    }
  });

  it("never exposes a public path for an uncleared photograph", () => {
    for (const item of coachPhotoQueue) {
      expect(item.status).not.toBe("cleared");
      expect(item).not.toHaveProperty("src");
      expect(item.identifiableFaces).toBeGreaterThan(1);
    }
  });

  it("records the duplicate group frame as a single queue entry", () => {
    const sources = coachPhotoQueue.map((q) => q.source);
    expect(sources).not.toContain("IMG_0232 (1).jpeg");
    expect(sources).toContain("IMG_0232.jpeg");
  });

  it("does not ship the untouched originals in the public tree", () => {
    expect(existsSync(path.join(ROOT, "public/media/coach/originals"))).toBe(false);
    expect(existsSync(path.join(ROOT, "assets/coach/originals/Young2.jpg"))).toBe(true);
  });
});

describe("checkpoint 003 — photo addendum", () => {
  const ADDENDUM = [
    ["IMG_5608.jpeg", 20],
    ["IMG_1468.jpeg", 5],
    ["IMG_7389.jpeg", 2],
    ["IMG_0244.jpeg", 30],
  ] as const;

  it("registers every addendum frame in the review queue", () => {
    const bySource = new Map(coachPhotoQueue.map((q) => [q.source, q]));
    for (const [source, faces] of ADDENDUM) {
      const entry = bySource.get(source);
      expect(entry, `${source} should be queued`).toBeDefined();
      expect(entry?.identifiableFaces).toBe(faces);
      expect(entry?.status).toBe("pending-release");
      expect(entry).not.toHaveProperty("src");
    }
  });

  it("keeps the whole review queue unpublished", () => {
    expect(coachPhotoQueue).toHaveLength(8);
    const totalFaces = coachPhotoQueue.reduce((n, q) => n + q.identifiableFaces, 0);
    expect(totalFaces).toBe(82);
    for (const item of coachPhotoQueue) {
      expect(item.status).toBe("pending-release");
    }
  });

  it("holds addendum review copies outside the public tree", () => {
    for (const [source] of ADDENDUM) {
      const name = source.replace(/\.jpe?g$/i, "");
      expect(
        existsSync(path.join(ROOT, "review/coach-photos", `review-${name}.jpg`)),
        `review copy for ${source}`,
      ).toBe(true);
      expect(existsSync(pub(`/media/coach/review-${name}.jpg`))).toBe(false);
    }
    expect(existsSync(path.join(ROOT, "review/coach-photos/addendum-report.json"))).toBe(true);
  });

  it("preserves an EXIF-stripped master for each addendum frame", () => {
    for (const [source] of ADDENDUM) {
      expect(existsSync(path.join(ROOT, "assets/coach/originals", source))).toBe(true);
    }
  });
});
