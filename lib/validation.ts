import { z } from "zod";
import { ATHLETE_MAX_AGE, ATHLETE_MIN_AGE, ageOn, isFutureDate, parseIsoDate } from "./date";

/* ------------------------------------------------------------------ messages */

/**
 * Every user-facing validation string lives in a message pack so the same
 * schema can validate an English or Spanish submission without duplicating
 * business rules. English is the authoritative pack.
 */
export type ValidationMessages = {
  nameMin: string;
  nameMax: string;
  nameChars: string;
  emailRequired: string;
  emailMax: string;
  emailInvalid: string;
  phoneMax: string;
  phoneChars: string;
  messageMin: string;
  messageMax: string;
  consent: string;
  honeypot: string;
  dobFormat: string;
  dobInvalid: string;
  dobFuture: string;
  dobAge: string;
  ageGroupRequired: string;
  sportRequired: string;
  relationshipRequired: string;
  phoneRequired: string;
  emergencyName: string;
  emergencyPhone: string;
  objectives: string;
  signature: string;
  participation: string;
  roleRequired: string;
  organizationRequired: string;
  servicesRequired: string;
  groupSize: string;
  authority: string;
  classRequired: string;
  experienceRequired: string;
  sessionWindowRequired: string;
  guardianNameRequired: string;
  guardianContactRequired: string;
  athleteCountRequired: string;
  privacyRequired: string;
  preferredDatesInvalid: string;
};

export const enValidation: ValidationMessages = {
  nameMin: "Please enter at least 2 characters.",
  nameMax: "Please keep this under 80 characters.",
  nameChars: "Please use letters, spaces, hyphens, or apostrophes only.",
  emailRequired: "Please enter an email address.",
  emailMax: "Please keep this under 160 characters.",
  emailInvalid: "Please enter a valid email address.",
  phoneMax: "Please keep this under 32 characters.",
  phoneChars: "Please use digits and standard phone symbols only.",
  messageMin: "Please add a little more detail (at least 10 characters).",
  messageMax: "Please keep this under 2,000 characters.",
  consent: "Please confirm we may respond to your inquiry.",
  honeypot: "This field must be left empty.",
  dobFormat: "Please use the date picker or YYYY-MM-DD.",
  dobInvalid: "That date does not exist. Please check the day and month.",
  dobFuture: "Date of birth cannot be in the future.",
  dobAge: `Athletes must be between ${ATHLETE_MIN_AGE} and ${ATHLETE_MAX_AGE} years old.`,
  ageGroupRequired: "Please select an age group.",
  sportRequired: "Please enter a primary sport.",
  relationshipRequired: "Please select a relationship.",
  phoneRequired: "Please enter a contactable phone number.",
  emergencyName: "Please provide an emergency contact.",
  emergencyPhone: "Please enter an emergency phone number.",
  objectives: "Please describe the athlete's training objectives.",
  signature: "A guardian signature is required.",
  participation: "Participation acknowledgment is required.",
  roleRequired: "Please enter your role.",
  organizationRequired: "Please enter the school or organization.",
  servicesRequired: "Please indicate the services requested.",
  groupSize: "Please enter an approximate group size.",
  authority: "Please confirm you are authorized to inquire on behalf of this organization.",
  classRequired: "Please choose a class.",
  experienceRequired: "Please select an experience level.",
  sessionWindowRequired: "Please choose a preferred session window.",
  guardianNameRequired: "A parent or guardian name is required for a minor athlete.",
  guardianContactRequired: "A parent or guardian contact is required for a minor athlete.",
  athleteCountRequired: "Please enter an estimated athlete count.",
  privacyRequired: "Please acknowledge the privacy notice to continue.",
  preferredDatesInvalid: "Please describe your preferred dates in plain text.",
};

export const esValidation: ValidationMessages = {
  nameMin: "Ingrese al menos 2 caracteres.",
  nameMax: "Mantenga este campo por debajo de 80 caracteres.",
  nameChars: "Use solo letras, espacios, guiones o apóstrofes.",
  emailRequired: "Ingrese un correo electrónico.",
  emailMax: "Mantenga este campo por debajo de 160 caracteres.",
  emailInvalid: "Ingrese un correo electrónico válido.",
  phoneMax: "Mantenga este campo por debajo de 32 caracteres.",
  phoneChars: "Use solo dígitos y símbolos telefónicos estándar.",
  messageMin: "Agregue un poco más de detalle (al menos 10 caracteres).",
  messageMax: "Mantenga este campo por debajo de 2.000 caracteres.",
  consent: "Confirme que podemos responder a su consulta.",
  honeypot: "Este campo debe quedar vacío.",
  dobFormat: "Use el selector de fecha o el formato AAAA-MM-DD.",
  dobInvalid: "Esa fecha no existe. Revise el día y el mes.",
  dobFuture: "La fecha de nacimiento no puede estar en el futuro.",
  dobAge: `Los atletas deben tener entre ${ATHLETE_MIN_AGE} y ${ATHLETE_MAX_AGE} años.`,
  ageGroupRequired: "Seleccione un grupo de edad.",
  sportRequired: "Indique un deporte principal.",
  relationshipRequired: "Seleccione un parentesco.",
  phoneRequired: "Ingrese un número de teléfono de contacto.",
  emergencyName: "Indique un contacto de emergencia.",
  emergencyPhone: "Ingrese un teléfono de emergencia.",
  objectives: "Describa los objetivos de entrenamiento del atleta.",
  signature: "Se requiere la firma de un tutor.",
  participation: "Se requiere el reconocimiento de participación.",
  roleRequired: "Indique su cargo.",
  organizationRequired: "Indique la escuela u organización.",
  servicesRequired: "Indique los servicios solicitados.",
  groupSize: "Indique un tamaño de grupo aproximado.",
  authority: "Confirme que está autorizado para consultar en nombre de esta organización.",
  classRequired: "Elija una clase.",
  experienceRequired: "Seleccione un nivel de experiencia.",
  sessionWindowRequired: "Elija una franja horaria preferida.",
  guardianNameRequired: "Se requiere el nombre de un padre o tutor para un atleta menor de edad.",
  guardianContactRequired: "Se requiere el contacto de un padre o tutor para un atleta menor de edad.",
  athleteCountRequired: "Indique una cantidad estimada de atletas.",
  privacyRequired: "Reconozca el aviso de privacidad para continuar.",
  preferredDatesInvalid: "Describa sus fechas preferidas en texto simple.",
};

/* ------------------------------------------------------------------- builders */

const NAME_RE = /^[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff' .-]+$/;

function nameField(m: ValidationMessages) {
  return z
    .string()
    .trim()
    .min(2, m.nameMin)
    .max(80, m.nameMax)
    .regex(NAME_RE, m.nameChars);
}

function emailField(m: ValidationMessages) {
  return z.string().trim().min(5, m.emailRequired).max(160, m.emailMax).email(m.emailInvalid);
}

function phoneField(m: ValidationMessages) {
  return z
    .string()
    .trim()
    .max(32, m.phoneMax)
    .regex(/^[0-9+()\-.\s]*$/, m.phoneChars);
}

/** A required ISO date of birth that exists on the calendar and is not future. */
function dateOfBirthField(m: ValidationMessages) {
  return z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, m.dobFormat)
    .superRefine((value, ctx) => {
      if (!parseIsoDate(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: m.dobInvalid });
        return;
      }
      if (isFutureDate(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: m.dobFuture });
        return;
      }
      const age = ageOn(value);
      if (age === null || age < ATHLETE_MIN_AGE || age > ATHLETE_MAX_AGE) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: m.dobAge });
      }
    });
}

/** Optional free-text date window. */
function preferredDatesField(m: ValidationMessages) {
  return z
    .string()
    .trim()
    .max(160, m.preferredDatesInvalid)
    .optional()
    .or(z.literal(""));
}

/* ------------------------------------------------------------------ inquiries */

export const INQUIRY_TYPES = ["contact", "training", "school", "partner", "class"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export function createInquirySchema(m: ValidationMessages = enValidation) {
  return z.object({
    type: z.enum(INQUIRY_TYPES),
    firstName: nameField(m),
    lastName: nameField(m),
    email: emailField(m),
    phone: phoneField(m).optional().or(z.literal("")),
    /** Guardian/organization context — never medical information. */
    organization: z.string().trim().max(120).optional().or(z.literal("")),
    role: z.string().trim().max(80).optional().or(z.literal("")),
    athleteName: z.string().trim().max(80).optional().or(z.literal("")),
    athleteAge: z
      .string()
      .trim()
      .regex(/^\d{0,2}$/, m.groupSize)
      .optional()
      .or(z.literal("")),
    sport: z.string().trim().max(60).optional().or(z.literal("")),
    interest: z.string().trim().max(80).optional().or(z.literal("")),
    groupSize: z
      .string()
      .trim()
      .regex(/^\d{0,4}$/, m.groupSize)
      .optional()
      .or(z.literal("")),
    preferredDates: preferredDatesField(m),
    message: z.string().trim().min(10, m.messageMin).max(2000, m.messageMax),
    /** Explicit consent to be contacted about this inquiry. */
    contactConsent: z.literal(true, {
      errorMap: () => ({ message: m.consent }),
    }),
    /** Honeypot — must stay empty. */
    website: z.string().max(0).optional().or(z.literal("")),
    /** Opaque client timestamp used for the fill-time abuse check. */
    startedAt: z.union([z.number(), z.string()]).optional(),
  });
}

export const inquirySchema = createInquirySchema(enValidation);
export type InquiryInput = z.infer<typeof inquirySchema>;

/* ------------------------------------------------- athlete registration (draft) */

export function createAthleteRegistrationSchema(m: ValidationMessages = enValidation) {
  return z.object({
    athleteFirstName: nameField(m),
    athleteLastName: nameField(m),
    dateOfBirth: dateOfBirthField(m),
    gender: z.string().trim().max(40).optional().or(z.literal("")),
    sport: z.string().trim().min(2, m.sportRequired).max(60),
    position: z.string().trim().max(60).optional().or(z.literal("")),
    school: z.string().trim().max(120).optional().or(z.literal("")),
    grade: z.string().trim().max(20).optional().or(z.literal("")),
    guardianFirstName: nameField(m),
    guardianLastName: nameField(m),
    guardianRelationship: z.string().trim().min(2, m.relationshipRequired).max(40),
    guardianPhone: phoneField(m).min(10, m.phoneRequired),
    guardianEmail: emailField(m),
    emergencyName: z.string().trim().min(2, m.emergencyName).max(120),
    emergencyPhone: phoneField(m).min(10, m.emergencyPhone),
    objectives: z.string().trim().min(10, m.objectives).max(1200),
    injuries: z.string().trim().max(1200).optional().or(z.literal("")),
    surgeries: z.string().trim().max(1200).optional().or(z.literal("")),
    allergies: z.string().trim().max(1200).optional().or(z.literal("")),
    physician: z.string().trim().max(200).optional().or(z.literal("")),
    participationAcknowledged: z.literal(true, {
      errorMap: () => ({ message: m.participation }),
    }),
    guardianSignature: z.string().trim().min(2, m.signature).max(120),
    athleteSignature: z.string().trim().max(120).optional().or(z.literal("")),
    staffSignature: z.string().trim().max(120).optional().or(z.literal("")),
  });
}

export const athleteRegistrationSchema = createAthleteRegistrationSchema(enValidation);
export type AthleteRegistrationInput = z.infer<typeof athleteRegistrationSchema>;

/* --------------------------------------------------------- school inquiry form */

export function createSchoolInquirySchema(m: ValidationMessages = enValidation) {
  return z.object({
    representativeFirstName: nameField(m),
    representativeLastName: nameField(m),
    role: z.string().trim().min(2, m.roleRequired).max(80),
    organization: z.string().trim().min(2, m.organizationRequired).max(120),
    email: emailField(m),
    phone: phoneField(m).min(10, m.phoneRequired),
    services: z.string().trim().min(2, m.servicesRequired).max(200),
    groupSize: z.string().trim().regex(/^\d{1,4}$/, m.groupSize),
    proposedDates: preferredDatesField(m),
    message: z.string().trim().min(10, m.messageMin).max(2000, m.messageMax),
    authorityConfirmed: z.literal(true, {
      errorMap: () => ({ message: m.authority }),
    }),
    contactConsent: z.literal(true, {
      errorMap: () => ({ message: m.consent }),
    }),
    website: z.string().max(0).optional().or(z.literal("")),
    startedAt: z.union([z.number(), z.string()]).optional(),
  });
}

export const schoolInquirySchema = createSchoolInquirySchema(enValidation);
export type SchoolInquiryInput = z.infer<typeof schoolInquirySchema>;

/* ------------------------------------------------------- class interest (Class A) */

export const CLASS_AUDIENCES = ["adult", "minor", "school"] as const;
export type ClassAudience = (typeof CLASS_AUDIENCES)[number];

/**
 * Class-interest requests reuse the Class A inquiry architecture: no medical
 * history, no signatures, no payment data. Enrollment remains disabled.
 */
export function createClassInterestSchema(m: ValidationMessages = enValidation) {
  return z
    .object({
      audience: z.enum(CLASS_AUDIENCES),
      classSlug: z.string().trim().min(1, m.classRequired).max(80),
      /** Required for adult/minor audiences; not applicable to school/team. */
      athleteFirstName: z.string().trim().max(60).optional().or(z.literal("")),
      athleteLastName: z.string().trim().max(60).optional().or(z.literal("")),
      athleteAgeGroup: z.string().trim().max(40).optional().or(z.literal("")),
      sport: z.string().trim().max(60).optional().or(z.literal("")),
      experience: z.string().trim().max(40).optional().or(z.literal("")),
      goals: z.string().trim().max(1200).optional().or(z.literal("")),
      sessionWindow: z.string().trim().max(120).optional().or(z.literal("")),
      contactFirstName: nameField(m),
      contactLastName: nameField(m),
      contactEmail: emailField(m),
      contactPhone: phoneField(m).min(10, m.phoneRequired),
      relationship: z.string().trim().max(40).optional().or(z.literal("")),
      /** School/team only. */
      organization: z.string().trim().max(120).optional().or(z.literal("")),
      athleteCount: z
        .string()
        .trim()
        .regex(/^\d{0,4}$/, m.athleteCountRequired)
        .optional()
        .or(z.literal("")),
      preferredDates: preferredDatesField(m),
      schedulingNotes: z.string().trim().max(600).optional().or(z.literal("")),
      contactConsent: z.literal(true, { errorMap: () => ({ message: m.consent }) }),
      privacyAcknowledged: z.literal(true, { errorMap: () => ({ message: m.privacyRequired }) }),
      website: z.string().max(0).optional().or(z.literal("")),
      startedAt: z.union([z.number(), z.string()]).optional(),
    })
    .superRefine((value, ctx) => {
      if (value.audience === "adult" || value.audience === "minor") {
        if (!value.athleteFirstName || value.athleteFirstName.trim().length < 2) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["athleteFirstName"], message: m.nameMin });
        }
        if (!value.athleteLastName || value.athleteLastName.trim().length < 2) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["athleteLastName"], message: m.nameMin });
        }
        if (!value.athleteAgeGroup) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["athleteAgeGroup"], message: m.ageGroupRequired });
        }
        if (!value.experience) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["experience"], message: m.experienceRequired });
        }
        if (!value.goals || value.goals.trim().length < 10) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["goals"], message: m.objectives });
        }
        if (!value.sessionWindow) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["sessionWindow"], message: m.sessionWindowRequired });
        }
      }
      if (value.audience === "minor") {
        if (!value.relationship || value.relationship.trim().length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["relationship"],
            message: m.relationshipRequired,
          });
        }
      }
      if (value.audience === "school") {
        if (!value.organization || value.organization.trim().length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["organization"],
            message: m.organizationRequired,
          });
        }
        if (!value.athleteCount || !/^\d{1,4}$/.test(value.athleteCount)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["athleteCount"],
            message: m.athleteCountRequired,
          });
        }
      }
    });
}

export const classInterestSchema = createClassInterestSchema(enValidation);
export type ClassInterestInput = z.infer<typeof classInterestSchema>;

/* -------------------------------------------------------------------- helpers */

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
  return ageOn(iso, now);
}
