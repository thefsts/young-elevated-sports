import { describe, it, expect } from "vitest";
import {
  inquirySchema,
  schoolInquirySchema,
  athleteRegistrationSchema,
  fieldErrors,
  ageFromDate,
} from "@/lib/validation";

const validInquiry = {
  type: "contact" as const,
  firstName: "Reggie",
  lastName: "Young",
  email: "coach@example.com",
  phone: "2145550100",
  message: "I would like to learn more about training options for my athlete.",
  contactConsent: true as const,
  website: "",
};

describe("inquirySchema", () => {
  it("accepts a valid inquiry", () => {
    expect(inquirySchema.safeParse(validInquiry).success).toBe(true);
  });

  it("rejects a missing consent", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, contactConsent: false });
    expect(result.success).toBe(false);
  });

  it("rejects a too-short message", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, message: "hi" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, website: "spam" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("flattens errors to a field map", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, email: "x", firstName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = fieldErrors(result.error);
      expect(errors.email).toBeTruthy();
      expect(errors.firstName).toBeTruthy();
    }
  });
});

describe("schoolInquirySchema", () => {
  const valid = {
    representativeFirstName: "Dana",
    representativeLastName: "Coach",
    role: "Athletic Director",
    organization: "Northside High School",
    email: "ad@school.edu",
    phone: "2145550100",
    services: "Team speed and strength block",
    groupSize: "40",
    message: "We would like to discuss a six-week team training block.",
    authorityConfirmed: true as const,
    contactConsent: true as const,
    website: "",
  };

  it("accepts a valid school inquiry", () => {
    expect(schoolInquirySchema.safeParse(valid).success).toBe(true);
  });

  it("requires authority confirmation", () => {
    expect(schoolInquirySchema.safeParse({ ...valid, authorityConfirmed: false }).success).toBe(false);
  });

  it("requires a numeric group size", () => {
    expect(schoolInquirySchema.safeParse({ ...valid, groupSize: "many" }).success).toBe(false);
  });
});

describe("athleteRegistrationSchema", () => {
  const valid = {
    athleteFirstName: "Jordan",
    athleteLastName: "Young",
    dateOfBirth: "2010-05-01",
    gender: "Female",
    sport: "Track",
    position: "Sprinter",
    school: "Northside HS",
    grade: "9",
    guardianFirstName: "Reggie",
    guardianLastName: "Young",
    guardianRelationship: "Parent",
    guardianPhone: "2145550100",
    guardianEmail: "guardian@example.com",
    emergencyName: "Alex Young",
    emergencyPhone: "2145550111",
    objectives: "Improve acceleration and top-end speed for the spring season.",
    injuries: "",
    surgeries: "",
    allergies: "",
    physician: "",
    participationAcknowledged: true as const,
    guardianSignature: "Reggie Young",
    athleteSignature: "Jordan Young",
    staffSignature: "",
  };

  it("accepts a complete registration", () => {
    expect(athleteRegistrationSchema.safeParse(valid).success).toBe(true);
  });

  it("requires participation acknowledgment", () => {
    expect(
      athleteRegistrationSchema.safeParse({ ...valid, participationAcknowledged: false }).success,
    ).toBe(false);
  });

  it("requires a guardian signature", () => {
    expect(athleteRegistrationSchema.safeParse({ ...valid, guardianSignature: "" }).success).toBe(false);
  });

  it("rejects a malformed date of birth", () => {
    expect(athleteRegistrationSchema.safeParse({ ...valid, dateOfBirth: "05/01/2010" }).success).toBe(
      false,
    );
  });
});

describe("ageFromDate", () => {
  const now = new Date("2025-06-15T00:00:00Z");

  it("computes age before birthday", () => {
    expect(ageFromDate("2010-12-01", now)).toBe(14);
  });

  it("computes age on/after birthday", () => {
    expect(ageFromDate("2010-06-15", now)).toBe(15);
  });

  it("returns null for bad input", () => {
    expect(ageFromDate("not-a-date", now)).toBeNull();
  });
});
