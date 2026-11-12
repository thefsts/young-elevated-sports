/**
 * Training class templates.
 *
 * IMPORTANT — these are PROPOSED categories, not confirmed offerings.
 * Coach Reggie Young must approve every class, age range, capacity, schedule,
 * and price before any of it is presented as bookable. Until then every
 * template carries `proposed: true`, `price: null`, `schedule: null`, and a
 * status that never claims live enrollment.
 *
 * Nothing in this file may be used to imply confirmed availability, confirmed
 * dates, or confirmed pricing. See docs/operon-integration-contract.md for how
 * real schedules and capacity will be supplied once approved.
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

export type ClassTemplate = {
  slug: string;
  index: string;
  title: string;
  /** Short label used on cards and in navigation breadcrumbs. */
  shortTitle: string;
  summary: string;
  description: string;
  focus: string[];
  level: TrainingLevel;
  /** Proposed age band — NOT confirmed. */
  proposedAgeGroup: string;
  audience: ClassAudience[];
  /** Proposed session format — NOT confirmed. */
  proposedFormat: string;
  /** Proposed session length in minutes — NOT confirmed. */
  proposedDuration: string;
  /** Always null until Reggie approves pricing. Never invent a number. */
  price: null;
  /** Always null until a real schedule is supplied. Never invent dates. */
  schedule: null;
  status: ClassStatus;
  /** True while the class-interest form may accept an inquiry for this class. */
  interestEnabled: boolean;
  /** True for every template in this build — nothing is confirmed. */
  proposed: true;
  image: MediaCategory;
};

export const classes: ClassTemplate[] = [
  {
    slug: "speed-acceleration",
    index: "01",
    title: "Speed & Acceleration",
    shortTitle: "Speed",
    summary:
      "Sprint mechanics, first-step quickness, and acceleration patterns built through structured, repeatable drills rather than random conditioning.",
    description:
      "Speed is a skill before it is a quality. This proposed class would break sprinting into its component positions — posture, shin angle, ground contact, and rhythm — then rebuild them under progressively faster conditions. Athletes would work on acceleration out of athletic stances, top-speed exposure with full recovery, and the mechanics that let them repeat quality efforts instead of accumulating fatigue.",
    focus: ["Sprint mechanics", "First-step quickness", "Acceleration mechanics", "Top-speed exposure"],
    level: "mixed",
    proposedAgeGroup: "Ages 12–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "60 minutes (proposed)",
    price: null,
    schedule: null,
    status: "interest-open",
    interestEnabled: true,
    proposed: true,
    image: "sprinting",
  },
  {
    slug: "strength-conditioning",
    index: "02",
    title: "Strength & Conditioning",
    shortTitle: "Strength",
    summary:
      "Progressive resistance training built around fundamental movement patterns and long-term athletic development.",
    description:
      "Strength is the foundation that makes speed, power, and durability possible. This proposed class would teach the squat, hinge, push, pull, and carry patterns with technique quality treated as the gate for adding load. Programming would be progressed deliberately across a training block rather than chased session to session, with an emphasis on positions an athlete can own under fatigue.",
    focus: ["Squat pattern", "Hinge pattern", "Upper-body push & pull", "Trunk control"],
    level: "foundational",
    proposedAgeGroup: "Ages 13–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "60 minutes (proposed)",
    price: null,
    schedule: null,
    status: "interest-open",
    interestEnabled: true,
    proposed: true,
    image: "strength",
  },
  {
    slug: "agility-footwork",
    index: "03",
    title: "Agility & Footwork",
    shortTitle: "Agility",
    summary:
      "Deceleration, re-acceleration, and cutting mechanics that reflect the chaotic demands of field and court sport.",
    description:
      "Most athletes can accelerate. Fewer can stop, redirect, and accelerate again without losing position. This proposed class would train deceleration control, cutting mechanics, and reactive footwork in patterns that mirror game chaos, with an emphasis on body positions athletes can repeat at speed rather than choreographed ladder drills that never appear in competition.",
    focus: ["Deceleration control", "Cutting mechanics", "Reactive agility", "Body control"],
    level: "developmental",
    proposedAgeGroup: "Ages 11–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "45–60 minutes (proposed)",
    price: null,
    schedule: null,
    status: "interest-open",
    interestEnabled: true,
    proposed: true,
    image: "agility-footwork",
  },
  {
    slug: "explosive-power",
    index: "04",
    title: "Explosive Power",
    shortTitle: "Power",
    summary:
      "Jumping, throwing, and loaded explosive work designed to improve the rate at which an athlete can produce force.",
    description:
      "Power is force expressed quickly. This proposed class would combine jump progressions, medicine-ball throws, and loaded explosive work to improve rate of force development, with landing mechanics treated as seriously as takeoff. Complexity and load would be added only when an athlete demonstrates control, so the class stays a development tool rather than a performance shortcut.",
    focus: ["Rate of force development", "Jump progressions", "Med-ball power", "Landing mechanics"],
    level: "advanced",
    proposedAgeGroup: "Ages 14–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "45 minutes (proposed)",
    price: null,
    schedule: null,
    status: "schedule-pending",
    interestEnabled: true,
    proposed: true,
    image: "vertical-jump",
  },
  {
    slug: "vertical-jump-development",
    index: "05",
    title: "Vertical Jump Development",
    shortTitle: "Vertical",
    summary:
      "A focused block on approach mechanics, penultimate-step timing, and the force expression that drives a higher jump.",
    description:
      "A higher vertical is the visible result of a chain of mechanical decisions. This proposed class would work backward from the jump — approach rhythm, penultimate step, arm swing, and takeoff angle — while building the strength and power qualities that support it. Jump testing would be used to measure change, not to make promises about a specific number of inches.",
    focus: ["Approach mechanics", "Penultimate step", "Force expression", "Jump testing"],
    level: "developmental",
    proposedAgeGroup: "Ages 13–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "45 minutes (proposed)",
    price: null,
    schedule: null,
    status: "schedule-pending",
    interestEnabled: true,
    proposed: true,
    image: "vertical-jump",
  },
  {
    slug: "football-performance",
    index: "06",
    title: "Football Performance",
    shortTitle: "Football",
    summary:
      "Position-aware speed, strength, and contact preparation for football athletes, built around the demands of the sport.",
    description:
      "Football rewards athletes who can produce force in tight spaces, absorb contact, and repeat high-intensity efforts. This proposed class would blend acceleration work, lower-body strength, neck and trunk preparation, and position-specific movement patterns. It is a performance class, not a medical or rehabilitation service, and it makes no guarantee about injury outcomes.",
    focus: ["Position-specific speed", "Lower-body strength", "Contact preparation", "Repeat-effort capacity"],
    level: "mixed",
    proposedAgeGroup: "Ages 13–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "60–75 minutes (proposed)",
    price: null,
    schedule: null,
    status: "interest-open",
    interestEnabled: true,
    proposed: true,
    image: "football",
  },
  {
    slug: "basketball-performance",
    index: "07",
    title: "Basketball Performance",
    shortTitle: "Basketball",
    summary:
      "Lateral quickness, first-step burst, and landing control for basketball athletes who live in small spaces.",
    description:
      "Basketball is played in a phone booth. This proposed class would emphasize lateral quickness, first-step burst, deceleration on contact, and the single-leg strength and landing control that support repeated jumps and closeouts. Conditioning would be structured around the sport's intermittent rhythm rather than generic running.",
    focus: ["Lateral quickness", "First-step burst", "Single-leg strength", "Landing control"],
    level: "developmental",
    proposedAgeGroup: "Ages 12–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "60 minutes (proposed)",
    price: null,
    schedule: null,
    status: "interest-open",
    interestEnabled: true,
    proposed: true,
    image: "basketball",
  },
  {
    slug: "youth-athletic-development",
    index: "08",
    title: "Youth Athletic Development",
    shortTitle: "Youth",
    summary:
      "Movement literacy, coordination, and confidence for younger athletes — built on play, not on max-effort testing.",
    description:
      "Young athletes need broad movement experience before they need specialized training. This proposed class would focus on coordination, balance, landing, and fundamental strength through age-appropriate games and progressions. The goal is a confident, physically literate athlete who enjoys training — not a miniature version of an adult strength program.",
    focus: ["Movement literacy", "Coordination", "Balance & landing", "Confidence"],
    level: "foundational",
    proposedAgeGroup: "Ages 7–11 (proposed)",
    audience: ["minor"],
    proposedFormat: "Small-group session",
    proposedDuration: "45 minutes (proposed)",
    price: null,
    schedule: null,
    status: "coming-soon",
    interestEnabled: true,
    proposed: true,
    image: "youth-development",
  },
  {
    slug: "small-group-performance",
    index: "09",
    title: "Small-Group Performance Training",
    shortTitle: "Small Group",
    summary:
      "A blended performance session for athletes across sports who want coached speed, strength, and power work together.",
    description:
      "Not every athlete wants a single-sport lane. This proposed class would bring a small group of athletes together for a blended session covering speed, strength, and power, with individual loads and progressions adjusted within the group. It is designed for athletes who want consistent coached training with peers rather than a one-on-one model.",
    focus: ["Blended speed work", "Strength progressions", "Power development", "Group accountability"],
    level: "mixed",
    proposedAgeGroup: "Ages 12–18 (proposed)",
    audience: ["minor", "adult"],
    proposedFormat: "Small-group session",
    proposedDuration: "60 minutes (proposed)",
    price: null,
    schedule: null,
    status: "interest-open",
    interestEnabled: true,
    proposed: true,
    image: "group-sessions",
  },
  {
    slug: "team-school-training",
    index: "10",
    title: "Team & School Training",
    shortTitle: "Team / School",
    summary:
      "On-site or facility-based performance training for school teams, clubs, and organizations, scoped around the group's needs.",
    description:
      "Teams have different constraints than individuals — roster size, season timing, facility access, and coaching staff. This proposed offering would be scoped with a school or organization's authorized representative, then delivered around the group's schedule and goals. Every engagement would start with a conversation about logistics, group size, and what the program is actually for.",
    focus: ["Team speed & strength", "Season-aware programming", "Group logistics", "Coach collaboration"],
    level: "mixed",
    proposedAgeGroup: "Middle school through college (proposed)",
    audience: ["school"],
    proposedFormat: "Team / organization engagement",
    proposedDuration: "Scoped per engagement (proposed)",
    price: null,
    schedule: null,
    status: "schedule-pending",
    interestEnabled: true,
    proposed: true,
    image: "coach-instruction",
  },
];

export function getClass(slug: string): ClassTemplate | undefined {
  return classes.find((c) => c.slug === slug);
}

export function classSlugs(): string[] {
  return classes.map((c) => c.slug);
}

export const classCategories = [
  { value: "speed", label: "Speed", slugs: ["speed-acceleration"] },
  { value: "strength", label: "Strength", slugs: ["strength-conditioning"] },
  { value: "agility", label: "Agility", slugs: ["agility-footwork"] },
  { value: "power", label: "Power", slugs: ["explosive-power", "vertical-jump-development"] },
  { value: "sport", label: "Sport-Specific", slugs: ["football-performance", "basketball-performance"] },
  { value: "youth", label: "Youth", slugs: ["youth-athletic-development"] },
  { value: "group", label: "Group", slugs: ["small-group-performance"] },
  { value: "team", label: "Team / School", slugs: ["team-school-training"] },
] as const;

export const classAgeGroups = [
  { value: "youth", label: "Youth (7–11)", slugs: ["youth-athletic-development"] },
  { value: "middle", label: "Middle school (11–14)", slugs: ["agility-footwork", "basketball-performance", "speed-acceleration", "small-group-performance"] },
  { value: "high", label: "High school (14–18)", slugs: ["speed-acceleration", "strength-conditioning", "explosive-power", "vertical-jump-development", "football-performance", "basketball-performance", "small-group-performance"] },
  { value: "team", label: "Team / organization", slugs: ["team-school-training"] },
] as const;

export const classLevels: { value: TrainingLevel; label: string }[] = [
  { value: "foundational", label: "Foundational" },
  { value: "developmental", label: "Developmental" },
  { value: "advanced", label: "Advanced" },
  { value: "mixed", label: "Mixed level" },
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
 * This is DESIGN-PREVIEW DATA ONLY. It exists to demonstrate the schedule
 * layout, filters, and session-detail surfaces. It is not a bookable schedule,
 * it does not represent confirmed sessions, and every entry is explicitly
 * flagged `preview: true` / `bookable: false` so no component can accidentally
 * present it as real availability.
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
  /** Literal — preview data is never bookable. */
  preview: true;
  /** Literal — preview data is never bookable. */
  bookable: false;
};

export const schedulePreview: ScheduleEntry[] = [
  { id: "pv-01", day: "Mon", start: "4:00 PM", end: "5:00 PM", classSlug: "speed-acceleration", category: "speed", level: "mixed", ageGroup: "high", location: "Performance floor", preview: true, bookable: false },
  { id: "pv-02", day: "Mon", start: "5:15 PM", end: "6:15 PM", classSlug: "strength-conditioning", category: "strength", level: "foundational", ageGroup: "high", location: "Strength bay", preview: true, bookable: false },
  { id: "pv-03", day: "Tue", start: "4:00 PM", end: "4:45 PM", classSlug: "agility-footwork", category: "agility", level: "developmental", ageGroup: "middle", location: "Turf lane", preview: true, bookable: false },
  { id: "pv-04", day: "Tue", start: "5:00 PM", end: "5:45 PM", classSlug: "vertical-jump-development", category: "power", level: "developmental", ageGroup: "high", location: "Jump zone", preview: true, bookable: false },
  { id: "pv-05", day: "Wed", start: "4:00 PM", end: "5:00 PM", classSlug: "basketball-performance", category: "sport", level: "developmental", ageGroup: "middle", location: "Court side", preview: true, bookable: false },
  { id: "pv-06", day: "Wed", start: "5:15 PM", end: "6:15 PM", classSlug: "football-performance", category: "sport", level: "mixed", ageGroup: "high", location: "Performance floor", preview: true, bookable: false },
  { id: "pv-07", day: "Thu", start: "4:00 PM", end: "4:45 PM", classSlug: "youth-athletic-development", category: "youth", level: "foundational", ageGroup: "youth", location: "Movement studio", preview: true, bookable: false },
  { id: "pv-08", day: "Thu", start: "5:00 PM", end: "6:00 PM", classSlug: "small-group-performance", category: "group", level: "mixed", ageGroup: "high", location: "Performance floor", preview: true, bookable: false },
  { id: "pv-09", day: "Fri", start: "4:00 PM", end: "4:45 PM", classSlug: "explosive-power", category: "power", level: "advanced", ageGroup: "high", location: "Power rack bay", preview: true, bookable: false },
  { id: "pv-10", day: "Sat", start: "9:00 AM", end: "10:30 AM", classSlug: "team-school-training", category: "team", level: "mixed", ageGroup: "team", location: "Full facility", preview: true, bookable: false },
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
