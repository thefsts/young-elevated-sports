import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(2, "Please enter at least 2 characters.")
  .max(80, "Please keep this under 80 characters.")
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' .-]+$/, "Please use letters, spaces, hyphens, or apostrophes only.");

const email = z
  .string()
  .trim()
  .min(5, "Please enter an email address.")
  .max(160, "Please keep this under 160 characters.")
  .email("Please enter a valid email address.");

const phone = z
  .string()
  .trim()
  .max(32, "Please keep this under 32 characters.")
  .regex(/^[0-9+()\-.\s]*$/, "Please use digits and standard phone symbols only.");

/* ------------------------------------------------------------------ inquiries */

export const INQUIRY_TYPES = ["contact", "training", "school", "partner"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const inquirySchema = z.object({
  type: z.enum(INQUIRY_TYPES),
  firstName: name,
  lastName: name,
  email,
  phone: phone.optional().or(z.literal("")),
  /** Guardian/organization context — never medical information. */
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(80).optional().or(z.literal("")),
  athleteName: z.string().trim().max(80).optional().or(z.literal("")),
  athleteAge: z
    .string()
    .trim()
    .regex(/^\d{0,2}$/, "Please enter an age as a number.")
    .optional()
    .or(z.literal("")),
  sport: z.string().trim().max(60).optional().or(z.literal("")),
  interest: z.string().trim().max(80).optional().or(z.literal("")),
  groupSize: z
    .string()
    .trim()
    .regex(/^\d{0,4}$/, "Please enter a number.")
    .optional()
    .or(z.literal("")),
  preferredDates: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (at least 10 characters).")
    .max(2000, "Please keep this under 2,000 characters."),
  /** Explicit consent to be contacted about this inquiry. */
  contactConsent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm we may respond to your inquiry." }),
  }),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/* ------------------------------------------------- athlete registration (draft) */

export const athleteRegistrationSchema = z.object({
  athleteFirstName: name,
  athleteLastName: name,
  dateOfBirth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please use the date picker or YYYY-MM-DD."),
  gender: z.string().trim().max(40).optional().or(z.literal("")),
  sport: z.string().trim().min(2, "Please enter a primary sport.").max(60),
  position: z.string().trim().max(60).optional().or(z.literal("")),
  school: z.string().trim().max(120).optional().or(z.literal("")),
  grade: z.string().trim().max(20).optional().or(z.literal("")),
  guardianFirstName: name,
  guardianLastName: name,
  guardianRelationship: z.string().trim().min(2, "Please select a relationship.").max(40),
  guardianPhone: phone.min(10, "Please enter a contactable phone number."),
  guardianEmail: email,
  emergencyName: z.string().trim().min(2, "Please provide an emergency contact.").max(120),
  emergencyPhone: phone.min(10, "Please enter an emergency phone number."),
  objectives: z
    .string()
    .trim()
    .min(10, "Please describe the athlete's training objectives.")
    .max(1200),
  injuries: z.string().trim().max(1200).optional().or(z.literal("")),
  surgeries: z.string().trim().max(1200).optional().or(z.literal("")),
  allergies: z.string().trim().max(1200).optional().or(z.literal("")),
  physician: z.string().trim().max(200).optional().or(z.literal("")),
  participationAcknowledged: z.literal(true, {
    errorMap: () => ({ message: "Participation acknowledgment is required." }),
  }),
  guardianSignature: z.string().trim().min(2, "A guardian signature is required.").max(120),
  athleteSignature: z.string().trim().max(120).optional().or(z.literal("")),
  staffSignature: z.string().trim().max(120).optional().or(z.literal("")),
});

export type AthleteRegistrationInput = z.infer<typeof athleteRegistrationSchema>;

/* --------------------------------------------------------- school inquiry form */

export const schoolInquirySchema = z.object({
  representativeFirstName: name,
  representativeLastName: name,
  role: z.string().trim().min(2, "Please enter your role.").max(80),
  organization: z.string().trim().min(2, "Please enter the school or organization.").max(120),
  email,
  phone: phone.min(10, "Please enter a contactable phone number."),
  services: z.string().trim().min(2, "Please indicate the services requested.").max(200),
  groupSize: z.string().trim().regex(/^\d{1,4}$/, "Please enter an approximate group size."),
  proposedDates: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a little more detail.").max(2000),
  authorityConfirmed: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you are authorized to inquire on behalf of this organization." }),
  }),
  contactConsent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm we may respond to your inquiry." }),
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type SchoolInquiryInput = z.infer<typeof schoolInquirySchema>;

/** Flatten a ZodError into a field -> message map for accessible rendering. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Age in years from an ISO date, or null when the date is unusable. */
export function ageFromDate(iso: string, now = new Date()): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  let age = now.getUTCFullYear() - d.getUTCFullYear();
  const m = now.getUTCMonth() - d.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < d.getUTCDate())) age -= 1;
  if (age < 0 || age > 120) return null;
  return age;
}
