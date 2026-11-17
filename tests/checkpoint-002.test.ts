import { describe, it, expect } from "vitest";
import {
  classes,
  classSlugs,
  schedulePreview,
  classStatusLabels,
  CLASS_STATUSES,
  pricing,
  pricingPolicy,
  formatPrice,
} from "@/lib/content/classes";
import {
  classInterestSchema,
  createClassInterestSchema,
  esValidation,
  fieldErrors,
} from "@/lib/validation";
import {
  isRealCalendarDate,
  parseIsoDate,
  ageOn,
  isWithinAthleteAgeBand,
  isMinor,
  ATHLETE_MIN_AGE,
  ATHLETE_MAX_AGE,
} from "@/lib/date";
import { en, es } from "@/lib/i18n/dictionaries";
import { DEFAULT_CONSENT, OPTIONAL_CATEGORIES } from "@/lib/consent";
import { screenSubmission, checkBodySize, checkContentType, MAX_BODY_BYTES } from "@/lib/abuse";

/* ------------------------------------------------------------------- classes */

describe("class templates", () => {
  it("defines exactly four approved class tracks with unique slugs", () => {
    expect(classes).toHaveLength(4);
    expect(new Set(classSlugs()).size).toBe(4);
  });

  it("publishes approved 75-minute sessions with no confirmed schedule", () => {
    for (const cls of classes) {
      expect(cls.approved).toBe(true);
      expect(cls.durationMinutes).toBe(75);
      // Age band is confirmed with the coach on inquiry, never published.
      expect(cls.ageGroup).toBeNull();
      expect("schedule" in cls).toBe(false);
    }
  });

  it("only uses approved status labels", () => {
    for (const cls of classes) {
      expect(CLASS_STATUSES).toContain(cls.status);
      expect(classStatusLabels[cls.status]).toBeTruthy();
    }
  });

  it("marks every schedule preview entry as non-bookable", () => {
    expect(schedulePreview.length).toBeGreaterThan(0);
    for (const entry of schedulePreview) {
      expect(entry.preview).toBe(true);
      expect(entry.bookable).toBe(false);
    }
  });

  it("keeps enrollment closed unless a class is genuinely active", () => {
    const open = classes.filter((c) => c.status === "enrollment-open");
    // No class is approved for enrollment at this checkpoint.
    expect(open).toHaveLength(0);
  });
});

/* -------------------------------------------------------------- price sheet */

describe("approved price sheet", () => {
  it("exposes exactly the seven approved price points", () => {
    const figures = pricing.flatMap((g) => g.options.map((o) => o.price)).sort((a, b) => a - b);
    expect(figures).toEqual([35, 120, 130, 200, 230, 250, 300]);
  });

  it("keeps English and Spanish price figures identical", () => {
    for (const group of pricing) {
      expect(group.titleEs).toBeTruthy();
      expect(group.introEs).toBeTruthy();
      for (const opt of group.options) {
        expect(opt.labelEs).toBeTruthy();
        expect(opt.unitEs).toBeTruthy();
        // The figure is a single shared number, so both locales render it.
        expect(formatPrice(opt.price)).toMatch(/^\$\d+$/);
      }
    }
  });

  it("states the 75-minute session length and 60-day flex expiry", () => {
    expect(pricingPolicy.sessionLength).toBe(75);
    expect(pricingPolicy.flexExpiryDays).toBe(60);
  });

  it("mentions family/sibling discounts as inquiry-only, with no invented amount", () => {
    for (const locale of ["en", "es"] as const) {
      const text = pricingPolicy.family[locale];
      expect(text.toLowerCase()).toMatch(/family|familia/);
      expect(text).not.toMatch(/\$\d/);
    }
  });

  it("confirms online payment is not enabled", () => {
    expect(pricingPolicy.payment.en.toLowerCase()).toContain("not enabled");
    expect(pricingPolicy.payment.es.toLowerCase()).toContain("no est");
  });
});

/* ------------------------------------------------------- class interest form */

const base = {
  classSlug: "speed-acceleration",
  contactFirstName: "Reggie",
  contactLastName: "Young",
  contactEmail: "coach@example.com",
  contactPhone: "2145550100",
  contactConsent: true as const,
  privacyAcknowledged: true as const,
  website: "",
  startedAt: Date.now(),
};

const adult = {
  ...base,
  audience: "adult" as const,
  athleteFirstName: "Jordan",
  athleteLastName: "Reed",
  athleteAgeGroup: "High school (14–18)",
  sport: "Football",
  experience: "Some training experience",
  goals: "Improve first-step quickness and top-end speed this off-season.",
  sessionWindow: "Weekday evenings",
};

const minor = {
  ...adult,
  audience: "minor" as const,
  relationship: "Parent",
};

const school = {
  ...base,
  audience: "school" as const,
  organization: "North Dallas High School",
  athleteCount: "24",
  preferredDates: "June–July",
  schedulingNotes: "Prefer mornings before summer workouts.",
};

describe("classInterestSchema", () => {
  it("accepts an adult athlete request", () => {
    expect(classInterestSchema.safeParse(adult).success).toBe(true);
  });

  it("accepts a guardian-led minor request with a relationship", () => {
    expect(classInterestSchema.safeParse(minor).success).toBe(true);
  });

  it("rejects a minor request without a guardian relationship", () => {
    const result = classInterestSchema.safeParse({ ...minor, relationship: "" });
    expect(result.success).toBe(false);
    expect(fieldErrors(result.error as never).relationship).toBeTruthy();
  });

  it("accepts a school request without athlete-specific fields", () => {
    const { athleteFirstName, athleteLastName, athleteAgeGroup, experience, goals, sessionWindow, ...rest } =
      school as Record<string, unknown>;
    expect(classInterestSchema.safeParse(rest).success).toBe(true);
  });

  it("requires an organization and athlete count for school requests", () => {
    const result = classInterestSchema.safeParse({ ...school, organization: "", athleteCount: "" });
    expect(result.success).toBe(false);
    const errors = fieldErrors(result.error as never);
    expect(errors.organization).toBeTruthy();
    expect(errors.athleteCount).toBeTruthy();
  });

  it("requires athlete details for adult requests", () => {
    const result = classInterestSchema.safeParse({ ...adult, athleteFirstName: "", goals: "short" });
    expect(result.success).toBe(false);
    const errors = fieldErrors(result.error as never);
    expect(errors.athleteFirstName).toBeTruthy();
    expect(errors.goals).toBeTruthy();
  });

  it("requires contact consent and privacy acknowledgement", () => {
    const result = classInterestSchema.safeParse({ ...adult, contactConsent: false });
    expect(result.success).toBe(false);
    const result2 = classInterestSchema.safeParse({ ...adult, privacyAcknowledged: false });
    expect(result2.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(classInterestSchema.safeParse({ ...adult, website: "http://spam.example" }).success).toBe(
      false,
    );
  });

  it("returns Spanish validation messages when the Spanish pack is used", () => {
    const schema = createClassInterestSchema(esValidation);
    const result = schema.safeParse({ ...adult, contactEmail: "not-an-email" });
    expect(result.success).toBe(false);
    const message = fieldErrors(result.error as never).contactEmail;
    expect(message).toMatch(/correo|válido|valido/i);
  });
});

/* --------------------------------------------------------------- date + age */

describe("calendar date validation", () => {
  it("rejects impossible calendar days", () => {
    expect(isRealCalendarDate("2025-02-31")).toBe(false);
    expect(isRealCalendarDate("2025-04-31")).toBe(false);
    expect(isRealCalendarDate("2025-13-01")).toBe(false);
    expect(parseIsoDate("2025-02-31")).toBeNull();
  });

  it("handles leap years correctly", () => {
    expect(isRealCalendarDate("2024-02-29")).toBe(true);
    expect(isRealCalendarDate("2025-02-29")).toBe(false);
    expect(isRealCalendarDate("2000-02-29")).toBe(true);
    expect(isRealCalendarDate("1900-02-29")).toBe(false);
  });

  it("computes age on the exact birthday", () => {
    const today = new Date(Date.UTC(2025, 5, 15));
    const dayBefore = new Date(Date.UTC(2025, 5, 14));
    expect(ageOn("2010-06-15", today)).toBe(15);
    expect(ageOn("2010-06-15", dayBefore)).toBe(14);
  });

  it("enforces the athlete age band boundaries", () => {
    const today = new Date(Date.UTC(2025, 5, 15));
    const minDob = `${2025 - ATHLETE_MIN_AGE}-06-15`;
    const maxDob = `${2025 - ATHLETE_MAX_AGE}-06-15`;
    const tooYoung = `${2025 - (ATHLETE_MIN_AGE - 1)}-06-15`;
    const tooOld = `${2025 - (ATHLETE_MAX_AGE + 1)}-06-15`;
    expect(isWithinAthleteAgeBand(minDob, today)).toBe(true);
    expect(isWithinAthleteAgeBand(maxDob, today)).toBe(true);
    expect(isWithinAthleteAgeBand(tooYoung, today)).toBe(false);
    expect(isWithinAthleteAgeBand(tooOld, today)).toBe(false);
  });

  it("treats athletes under 18 as minors", () => {
    const today = new Date(Date.UTC(2025, 5, 15));
    expect(isMinor("2008-06-15", today)).toBe(true);
    expect(isMinor("2007-06-15", today)).toBe(false);
  });
});

/* ------------------------------------------------------------------ i18n */

describe("translation dictionaries", () => {
  it("has a Spanish string for every English key", () => {
    const missing = Object.keys(en).filter((key) => !(key in es));
    expect(missing).toEqual([]);
  });

  it("has no empty strings", () => {
    for (const [key, value] of Object.entries(es)) {
      expect(value.trim().length, key).toBeGreaterThan(0);
    }
  });

  it("keeps Spanish strings actually translated for core navigation", () => {
    expect(es["nav.classes"]).not.toBe(en["nav.classes"]);
    expect(es["classes.cta"]).not.toBe(en["classes.cta"]);
    expect(es["a11y.title"]).not.toBe(en["a11y.title"]);
  });
});

/* ------------------------------------------------------------------ consent */

describe("cookie consent defaults", () => {
  it("defaults every optional category to false", () => {
    for (const category of OPTIONAL_CATEGORIES) {
      expect(DEFAULT_CONSENT[category]).toBe(false);
    }
  });

  it("treats essential storage as always available", () => {
    expect(DEFAULT_CONSENT.essential).toBe(true);
  });
});

/* -------------------------------------------------------------------- abuse */

describe("abuse protection", () => {
  it("rejects oversized bodies", () => {
    expect(checkBodySize("x".repeat(MAX_BODY_BYTES + 1)).ok).toBe(false);
    expect(checkBodySize("x".repeat(512)).ok).toBe(true);
  });

  it("rejects non-JSON content types", () => {
    const plain = new Request("https://example.com/api", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "hi",
    });
    const json = new Request("https://example.com/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
    expect(checkContentType(plain).ok).toBe(false);
    expect(checkContentType(json).ok).toBe(true);
  });

  it("flags spammy submissions", () => {
    const verdict = screenSubmission({
      message: "Buy cheap followers now http://a.example http://b.example http://c.example",
      email: "promo@mailinator.com",
    });
    expect(verdict.ok).toBe(false);
  });

  it("accepts a normal submission", () => {
    const verdict = screenSubmission({
      message: "My son would like to train for football this summer.",
      email: "parent@example.com",
    });
    expect(verdict.ok).toBe(true);
  });
});
