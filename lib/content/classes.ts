/**
 * Training classes — CONFIRMED CATALOG (Checkpoint 005).
 *
 * The client has approved exactly four small-group class tracks and an official
 * price sheet. Everything in `classes` and `pricing` below is approved content.
 *
 * What is still NOT approved, and therefore still absent:
 *   - a weekly schedule (no dates, no times, no capacity)
 *   - live enrollment (class interest remains an inquiry only)
 *   - age-band placement (confirmed with the coach on inquiry)
 *
 * Nothing in this file may be used to imply a confirmed session time, a
 * confirmed seat, or a completed registration. See
 * docs/operon-integration-contract.md for how real schedules will arrive.
 *
 * The ten previously *proposed* class categories have been removed from this
 * catalog at the client's direction. Other established training services
 * (private training, team training, camps, school partnerships, assessments)
 * live in `programs.ts` and are untouched.
 */

import type { MediaCategory } from "./media";

export const CLASS_STATUSES = [
  "coming-soon",
  "interest-open",
  "schedule-pending",
  "enrollment-open",
] as const;

export type ClassStatus = (typeof CLASS_STATUSES)[number];

export type TrainingLevel = "foundational" | "developmental" | "advanced" | "mixed";

export type ClassAudience = "adult" | "minor" | "school";

/* ------------------------------------------------------------------ pricing */

export type PriceOption = {
  id: string;
  label: string;
  labelEs: string;
  /** Whole US dollars. Approved figures — never computed or inferred. */
  price: number;
  unit: string;
  unitEs: string;
  note?: string;
  noteEs?: string;
};

export type PriceGroup = {
  id: "single" | "flex" | "monthly";
  title: string;
  titleEs: string;
  intro: string;
  introEs: string;
  options: PriceOption[];
};

/** Approved price sheet. Every figure here came from the client in writing. */
export const pricing: PriceGroup[] = [
  {
    id: "single",
    title: "Single session",
    titleEs: "Sesión individual",
    intro: "One 75-minute session, any class track.",
    introEs: "Una sesión de 75 minutos, en cualquier clase.",
    options: [
      {
        id: "single-1",
        label: "Single session",
        labelEs: "Sesión individual",
        price: 35,
        unit: "per session",
        unitEs: "por sesión",
      },
    ],
  },
  {
    id: "flex",
    title: "Flex bundles",
    titleEs: "Paquetes flexibles",
    intro:
      "Prepaid sessions you can use at your own pace. Flex bundles expire 60 days after purchase.",
    introEs:
      "Sesiones prepagadas que puedes usar a tu ritmo. Los paquetes flexibles vencen 60 días después de la compra.",
    options: [
      {
        id: "flex-4",
        label: "Four-session flex",
        labelEs: "Paquete flexible de cuatro sesiones",
        price: 130,
        unit: "four sessions",
        unitEs: "cuatro sesiones",
        note: "Expires 60 days after purchase.",
        noteEs: "Vence 60 días después de la compra.",
      },
      {
        id: "flex-8",
        label: "Eight-session flex",
        labelEs: "Paquete flexible de ocho sesiones",
        price: 230,
        unit: "eight sessions",
        unitEs: "ocho sesiones",
        note: "Expires 60 days after purchase.",
        noteEs: "Vence 60 días después de la compra.",
      },
    ],
  },
  {
    id: "monthly",
    title: "Monthly training",
    titleEs: "Entrenamiento mensual",
    intro: "A fixed number of sessions each month, billed monthly.",
    introEs: "Un número fijo de sesiones cada mes, facturado mensualmente.",
    options: [
      {
        id: "monthly-4",
        label: "Monthly — 4 sessions",
        labelEs: "Mensual — 4 sesiones",
        price: 120,
        unit: "per month",
        unitEs: "por mes",
      },
      {
        id: "monthly-8",
        label: "Monthly — 8 sessions",
        labelEs: "Mensual — 8 sesiones",
        price: 200,
        unit: "per month",
        unitEs: "por mes",
      },
      {
        id: "monthly-12",
        label: "Monthly — 12 sessions",
        labelEs: "Mensual — 12 sesiones",
        price: 250,
        unit: "per month",
        unitEs: "por mes",
      },
      {
        id: "monthly-16",
        label: "Monthly — 16 sessions",
        labelEs: "Mensual — 16 sesiones",
        price: 300,
        unit: "per month",
        unitEs: "por mes",
      },
    ],
  },
];

/** Approved policy statements that accompany the price sheet. */
export const pricingPolicy = {
  sessionLength: 75,
  flexExpiryDays: 60,
  mixing: {
    en: "You may mix class tracks within any purchased package.",
    es: "Puedes combinar clases dentro de cualquier paquete comprado.",
  },
  family: {
    en: "Family and sibling discounts are available on inquiry. Ask about them when you submit a class interest request.",
    es: "Los descuentos para familias y hermanos están disponibles al consultar. Pregunta por ellos cuando envíes una solicitud de interés.",
  },
  payment: {
    en: "Online payment is not enabled on this site. Pricing is shown for review; payment is arranged directly with the coach.",
    es: "El pago en línea no está habilitado en este sitio. Los precios se muestran para revisión; el pago se coordina directamente con el entrenador.",
  },
};

export function formatPrice(value: number): string {
  return `$${value}`;
}

/* ------------------------------------------------------------------ classes */

export type ClassTemplate = {
  slug: string;
  index: string;
  title: string;
  titleEs: string;
  shortTitle: string;
  summary: string;
  summaryEs: string;
  description: string;
  descriptionEs: string;
  focus: string[];
  focusEs: string[];
  level: TrainingLevel;
  audience: ClassAudience[];
  /** Approved session length. */
  durationMinutes: number;
  /** Age placement is confirmed with the coach on inquiry — never assumed. */
  ageGroup: null;
  /** Approved: these four tracks are official offerings. */
  approved: true;
  /** Enrollment is still closed; interest requests only. */
  status: ClassStatus;
  interestEnabled: boolean;
  image: MediaCategory;
};

export const classes: ClassTemplate[] = [
  {
    slug: "speed-agility",
    index: "01",
    title: "Speed & Agility",
    titleEs: "Velocidad y agilidad",
    shortTitle: "Speed & Agility",
    summary:
      "Sprint mechanics, first-step quickness, and the change-of-direction control that turns straight-line speed into usable speed.",
    summaryEs:
      "Mecánica de sprint, rapidez del primer paso y el control de cambio de dirección que convierte la velocidad lineal en velocidad útil.",
    description:
      "Speed is a skill before it is a quality. This class breaks sprinting into its component positions — posture, shin angle, ground contact, and rhythm — then rebuilds them under progressively faster conditions. Athletes work on acceleration out of athletic stances, top-speed exposure with full recovery, and the mechanics that let them repeat quality efforts instead of accumulating fatigue.",
    descriptionEs:
      "La velocidad es una habilidad antes que una cualidad. Esta clase descompone el sprint en sus posiciones fundamentales — postura, ángulo de la espinilla, contacto con el suelo y ritmo — y las reconstruye bajo condiciones progresivamente más rápidas. Los atletas trabajan la aceleración desde posturas atléticas, la exposición a velocidad máxima con recuperación completa y la mecánica que les permite repetir esfuerzos de calidad en lugar de acumular fatiga.",
    focus: ["Sprint mechanics", "First-step quickness", "Acceleration", "Top-speed exposure"],
    focusEs: ["Mecánica de sprint", "Rapidez del primer paso", "Aceleración", "Velocidad máxima"],
    level: "mixed",
    audience: ["minor", "adult"],
    durationMinutes: 75,
    ageGroup: null,
    approved: true,
    status: "interest-open",
    interestEnabled: true,
    image: "sprinting",
  },
  {
    slug: "explosive-force-vertical-jump",
    index: "02",
    title: "Explosive Force & Vertical Jump Mechanics",
    titleEs: "Fuerza explosiva y mecánica del salto vertical",
    shortTitle: "Explosive Force",
    summary:
      "Jump progressions, loaded explosive work, and the approach mechanics that decide how high an athlete actually gets.",
    summaryEs:
      "Progresiones de salto, trabajo explosivo con carga y la mecánica de aproximación que determina qué tan alto salta realmente un atleta.",
    description:
      "Power is force expressed quickly. This class combines jump progressions, medicine-ball throws, and loaded explosive work to improve rate of force development, with landing mechanics treated as seriously as takeoff. Approach rhythm, penultimate-step timing, arm swing, and takeoff angle are coached alongside the strength qualities that support them. Jump testing is used to measure change, not to promise a specific number of inches.",
    descriptionEs:
      "La potencia es fuerza expresada rápidamente. Esta clase combina progresiones de salto, lanzamientos con balón medicinal y trabajo explosivo con carga para mejorar la tasa de desarrollo de fuerza, tratando la mecánica de aterrizaje con la misma seriedad que el despegue. Se entrenan el ritmo de aproximación, el tiempo del penúltimo paso, el balanceo de brazos y el ángulo de despegue junto con las cualidades de fuerza que los sostienen. Las pruebas de salto sirven para medir cambios, no para prometer un número específico de pulgadas.",
    focus: ["Rate of force development", "Jump progressions", "Approach mechanics", "Landing mechanics"],
    focusEs: ["Tasa de desarrollo de fuerza", "Progresiones de salto", "Mecánica de aproximación", "Mecánica de aterrizaje"],
    level: "developmental",
    audience: ["minor", "adult"],
    durationMinutes: 75,
    ageGroup: null,
    approved: true,
    status: "interest-open",
    interestEnabled: true,
    image: "vertical-jump",
  },
  {
    slug: "multi-directional-agility-deceleration",
    index: "03",
    title: "Multi-Directional Agility & Deceleration",
    titleEs: "Agilidad multidireccional y desaceleración",
    shortTitle: "Multi-Directional",
    summary:
      "Stopping, cutting, and re-accelerating under control — the qualities that decide who wins the space between two cones.",
    summaryEs:
      "Detenerse, cortar y volver a acelerar con control: las cualidades que deciden quién gana el espacio entre dos conos.",
    description:
      "Most athletes can accelerate. Fewer can stop, redirect, and accelerate again without losing position. This class trains deceleration control, cutting mechanics, and reactive footwork in patterns that mirror game chaos, with an emphasis on body positions athletes can repeat at speed rather than choreographed ladder drills that never appear in competition. Deceleration is coached as a skill in its own right, because it is where most non-contact injuries begin.",
    descriptionEs:
      "La mayoría de los atletas pueden acelerar. Menos pueden detenerse, redirigirse y volver a acelerar sin perder la posición. Esta clase entrena el control de la desaceleración, la mecánica de corte y el trabajo de pies reactivo en patrones que reflejan el caos del juego, con énfasis en posiciones corporales que los atletas pueden repetir a velocidad en lugar de ejercicios coreografiados de escalera que nunca aparecen en la competencia. La desaceleración se entrena como una habilidad propia, porque es donde comienzan la mayoría de las lesiones sin contacto.",
    focus: ["Deceleration control", "Cutting mechanics", "Reactive agility", "Body control"],
    focusEs: ["Control de desaceleración", "Mecánica de corte", "Agilidad reactiva", "Control corporal"],
    level: "developmental",
    audience: ["minor", "adult"],
    durationMinutes: 75,
    ageGroup: null,
    approved: true,
    status: "interest-open",
    interestEnabled: true,
    image: "agility-footwork",
  },
  {
    slug: "athletic-strength-conditioning",
    index: "04",
    title: "Athletic Strength & Conditioning",
    titleEs: "Fuerza y acondicionamiento atlético",
    shortTitle: "Strength & Conditioning",
    summary:
      "Progressive resistance training built around fundamental movement patterns and long-term athletic development.",
    summaryEs:
      "Entrenamiento de resistencia progresivo basado en patrones de movimiento fundamentales y desarrollo atlético a largo plazo.",
    description:
      "Strength is the foundation that makes speed, power, and durability possible. This class teaches the squat, hinge, push, pull, and carry patterns with technique quality treated as the gate for adding load. Programming progresses deliberately across a training block rather than being chased session to session, with an emphasis on positions an athlete can own under fatigue.",
    descriptionEs:
      "La fuerza es la base que hace posibles la velocidad, la potencia y la durabilidad. Esta clase enseña los patrones de sentadilla, bisagra de cadera, empuje, tracción y carga, tratando la calidad técnica como el requisito para añadir carga. La programación progresa de forma deliberada a lo largo de un bloque de entrenamiento en lugar de perseguirse sesión a sesión, con énfasis en posiciones que el atleta puede dominar bajo fatiga.",
    focus: ["Squat pattern", "Hinge pattern", "Upper-body push & pull", "Trunk control"],
    focusEs: ["Patrón de sentadilla", "Patrón de bisagra", "Empuje y tracción del tren superior", "Control del tronco"],
    level: "foundational",
    audience: ["minor", "adult"],
    durationMinutes: 75,
    ageGroup: null,
    approved: true,
    status: "interest-open",
    interestEnabled: true,
    image: "strength",
  },
];

export function getClass(slug: string): ClassTemplate | undefined {
  return classes.find((c) => c.slug === slug);
}

export function classSlugs(): string[] {
  return classes.map((c) => c.slug);
}

/** Locale-aware accessors so the catalog reads correctly in Spanish. */
export function classTitle(c: ClassTemplate, locale: string): string {
  return locale === "es" ? c.titleEs : c.title;
}
export function classSummary(c: ClassTemplate, locale: string): string {
  return locale === "es" ? c.summaryEs : c.summary;
}
export function classDescription(c: ClassTemplate, locale: string): string {
  return locale === "es" ? c.descriptionEs : c.description;
}
export function classFocus(c: ClassTemplate, locale: string): string[] {
  return locale === "es" ? c.focusEs : c.focus;
}

export const classCategories = [
  { value: "speed", label: "Speed & Agility", labelEs: "Velocidad y agilidad", slugs: ["speed-agility"] },
  {
    value: "power",
    label: "Explosive Force",
    labelEs: "Fuerza explosiva",
    slugs: ["explosive-force-vertical-jump"],
  },
  {
    value: "agility",
    label: "Multi-Directional",
    labelEs: "Multidireccional",
    slugs: ["multi-directional-agility-deceleration"],
  },
  {
    value: "strength",
    label: "Strength & Conditioning",
    labelEs: "Fuerza y acondicionamiento",
    slugs: ["athletic-strength-conditioning"],
  },
] as const;

export const classLevels: { value: TrainingLevel; label: string; labelEs: string }[] = [
  { value: "foundational", label: "Foundational", labelEs: "Fundacional" },
  { value: "developmental", label: "Developmental", labelEs: "De desarrollo" },
  { value: "advanced", label: "Advanced", labelEs: "Avanzado" },
  { value: "mixed", label: "Mixed level", labelEs: "Nivel mixto" },
];

export const classStatusLabels: Record<ClassStatus, string> = {
  "coming-soon": "Coming Soon",
  "interest-open": "Registration Interest Open",
  "schedule-pending": "Schedule Pending",
  "enrollment-open": "Enrollment Open",
};

/**
 * Schedule preview.
 *
 * DESIGN-PREVIEW DATA ONLY. It demonstrates the schedule layout and filters.
 * It is not a bookable schedule and does not represent confirmed sessions;
 * every entry is flagged `preview: true` / `bookable: false`.
 */
export type ScheduleEntry = {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  start: string;
  end: string;
  classSlug: string;
  category: string;
  level: TrainingLevel;
  ageGroup: string;
  location: string;
  preview: true;
  bookable: false;
};

export const schedulePreview: ScheduleEntry[] = [
  { id: "pv-01", day: "Mon", start: "4:00 PM", end: "5:15 PM", classSlug: "speed-agility", category: "speed", level: "mixed", ageGroup: "all", location: "Performance floor", preview: true, bookable: false },
  { id: "pv-02", day: "Mon", start: "5:30 PM", end: "6:45 PM", classSlug: "athletic-strength-conditioning", category: "strength", level: "foundational", ageGroup: "all", location: "Strength bay", preview: true, bookable: false },
  { id: "pv-03", day: "Tue", start: "4:00 PM", end: "5:15 PM", classSlug: "multi-directional-agility-deceleration", category: "agility", level: "developmental", ageGroup: "all", location: "Turf lane", preview: true, bookable: false },
  { id: "pv-04", day: "Tue", start: "5:30 PM", end: "6:45 PM", classSlug: "explosive-force-vertical-jump", category: "power", level: "developmental", ageGroup: "all", location: "Jump zone", preview: true, bookable: false },
  { id: "pv-05", day: "Wed", start: "4:00 PM", end: "5:15 PM", classSlug: "speed-agility", category: "speed", level: "mixed", ageGroup: "all", location: "Performance floor", preview: true, bookable: false },
  { id: "pv-06", day: "Wed", start: "5:30 PM", end: "6:45 PM", classSlug: "athletic-strength-conditioning", category: "strength", level: "foundational", ageGroup: "all", location: "Strength bay", preview: true, bookable: false },
  { id: "pv-07", day: "Thu", start: "4:00 PM", end: "5:15 PM", classSlug: "multi-directional-agility-deceleration", category: "agility", level: "developmental", ageGroup: "all", location: "Turf lane", preview: true, bookable: false },
  { id: "pv-08", day: "Thu", start: "5:30 PM", end: "6:45 PM", classSlug: "explosive-force-vertical-jump", category: "power", level: "developmental", ageGroup: "all", location: "Jump zone", preview: true, bookable: false },
  { id: "pv-09", day: "Fri", start: "4:00 PM", end: "5:15 PM", classSlug: "speed-agility", category: "speed", level: "mixed", ageGroup: "all", location: "Performance floor", preview: true, bookable: false },
  { id: "pv-10", day: "Sat", start: "9:00 AM", end: "10:15 AM", classSlug: "athletic-strength-conditioning", category: "strength", level: "foundational", ageGroup: "all", location: "Strength bay", preview: true, bookable: false },
];

export const scheduleDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const sessionWindows = [
  "Weekday afternoons (3–6 PM)",
  "Weekday evenings (6–8 PM)",
  "Saturday mornings",
  "Flexible / not sure yet",
] as const;

export const experienceLevels = [
  "New to structured training",
  "Some training experience",
  "Experienced — currently training",
  "Competitive / varsity athlete",
] as const;
