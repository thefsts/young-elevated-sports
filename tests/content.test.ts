import { describe, it, expect } from "vitest";
import { waiverDocuments, getWaiver } from "@/lib/content/waivers";
import { programs } from "@/lib/content/programs";
import { site } from "@/lib/content/site";

describe("waiver documents", () => {
  it("contains thirteen documents W01–W13", () => {
    expect(waiverDocuments).toHaveLength(13);
    const ids = waiverDocuments.map((w) => w.id);
    expect(ids).toEqual([
      "W01", "W02", "W03", "W04", "W05", "W06", "W07",
      "W08", "W09", "W10", "W11", "W12", "W13",
    ]);
  });

  it("marks every document as DRAFT — LEGAL REVIEW REQUIRED", () => {
    for (const waiver of waiverDocuments) {
      expect(waiver.status).toBe("DRAFT — LEGAL REVIEW REQUIRED");
    }
  });

  it("leaves effective dates unset until approval", () => {
    for (const waiver of waiverDocuments) {
      expect(waiver.effectiveDate).toBeNull();
    }
  });

  it("has unique slugs", () => {
    const slugs = waiverDocuments.map((w) => w.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves a document by slug", () => {
    expect(getWaiver("parent-guardian-consent")?.id).toBe("W02");
    expect(getWaiver("does-not-exist")).toBeUndefined();
  });

  it("gives every document at least one section and review note", () => {
    for (const waiver of waiverDocuments) {
      expect(waiver.sections.length).toBeGreaterThan(0);
      expect(waiver.reviewNotes.length).toBeGreaterThan(0);
    }
  });
});

describe("training programs", () => {
  it("lists eight disciplines", () => {
    expect(programs).toHaveLength(8);
  });

  it("has unique slugs", () => {
    const slugs = programs.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("site content guardrails", () => {
  it("does not invent contact details", () => {
    expect(site.contact.email).toBeNull();
    expect(site.contact.phone).toBeNull();
    expect(site.contact.address).toBeNull();
    expect(site.contact.hours).toBeNull();
  });
});
