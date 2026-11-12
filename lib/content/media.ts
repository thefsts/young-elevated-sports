/**
 * Photography registry.
 *
 * Every image in this file is an AI-generated, brand-directed placeholder
 * commissioned for this build. None of the people depicted are YESP athletes,
 * coaches, employees, or clients, and no image should be presented as a
 * testimonial or as evidence of a real training result.
 *
 * Licensing and provenance are recorded in docs/media-inventory.md. When the
 * client supplies real photography, replace the `src` and `alt` values here and
 * retire the placeholder — nothing else in the codebase needs to change.
 */

export type MediaCategory =
  | "sprinting"
  | "strength"
  | "agility-footwork"
  | "football"
  | "basketball"
  | "female-athletes"
  | "youth-development"
  | "coach-instruction"
  | "vertical-jump"
  | "assessment-equipment"
  | "group-sessions"
  | "dfw-skyline";

export type MediaAsset = {
  category: MediaCategory;
  src: string;
  srcMedium: string;
  srcSmall: string;
  alt: string;
  /** Short caption used in the gallery and class cards. */
  caption: string;
  width: number;
  height: number;
  /** True while the image is a brand-directed placeholder. */
  placeholder: true;
  credit: string;
};

const CREDIT = "AI-generated placeholder — not a YESP athlete or client";

function asset(category: MediaCategory, alt: string, caption: string): MediaAsset {
  return {
    category,
    src: `/media/${category}.jpg`,
    srcMedium: `/media/${category}-md.jpg`,
    srcSmall: `/media/${category}-sm.jpg`,
    alt,
    caption,
    width: 1536,
    height: 1024,
    placeholder: true,
    credit: CREDIT,
  };
}

export const media: Record<MediaCategory, MediaAsset> = {
  sprinting: asset(
    "sprinting",
    "Athlete exploding out of a starting block on an indoor track under warm gold light",
    "Acceleration mechanics from the first step",
  ),
  strength: asset(
    "strength",
    "Athlete mid-lift with a loaded trap bar in a dark performance gym",
    "Loaded strength work with technical intent",
  ),
  "agility-footwork": asset(
    "agility-footwork",
    "Athlete moving low through a cone and ladder footwork drill on dark turf",
    "Change-of-direction and footwork",
  ),
  football: asset(
    "football",
    "Football athlete cutting sharply on indoor turf with turf particles kicked up",
    "Football-specific movement quality",
  ),
  basketball: asset(
    "basketball",
    "Basketball athlete driving toward the rim in a dim gym with gold reflections",
    "First-step quickness and control",
  ),
  "female-athletes": asset(
    "female-athletes",
    "Female athlete driving a weighted sled across dark turf under gold rim light",
    "Sled work and posterior-chain power",
  ),
  "youth-development": asset(
    "youth-development",
    "Two young athletes performing a hurdle drill on dark turf with a coach in the background",
    "Age-appropriate athletic development",
  ),
  "coach-instruction": asset(
    "coach-instruction",
    "Coach kneeling beside an athlete giving hands-on technical instruction",
    "Direct coach-to-athlete instruction",
  ),
  "vertical-jump": asset(
    "vertical-jump",
    "Athlete at the peak of a vertical jump test with measuring vanes below",
    "Vertical jump testing and measurement",
  ),
  "assessment-equipment": asset(
    "assessment-equipment",
    "Force plates, timing gates, and a tablet with a gold data graph in a dark lab",
    "Assessment equipment and performance data",
  ),
  "group-sessions": asset(
    "group-sessions",
    "Small group of athletes performing a synchronized sprint-start drill on dark turf",
    "Small-group training sessions",
  ),
  "dfw-skyline": asset(
    "dfw-skyline",
    "Dallas–Fort Worth skyline at blue hour with warm gold city lights",
    "Dallas–Fort Worth, Texas",
  ),
};

export const mediaList: MediaAsset[] = Object.values(media);

/** Placeholder disclosure used wherever imagery is shown to the client. */
export const MEDIA_DISCLOSURE =
  "Photography on this preview is brand-directed placeholder imagery. The people shown are not YESP athletes, coaches, employees, or clients.";
