import type { SVGProps } from "react";

/**
 * Line-art training icon set.
 *
 * Every icon is drawn on the same 24x24 grid with the same 1.35 stroke weight
 * and round caps so the five hero disciplines and the eight training objectives
 * read as one family. Icons are decorative: the adjacent label always carries
 * the meaning, so each icon is `aria-hidden` and has no title element.
 */

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...rest }: IconProps) {
  return (
    <svg {...BASE} {...rest}>
      {children}
    </svg>
  );
}

/** Speed - forward motion chevrons. */
export function IconSpeed(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 8h9M3 12h12M3 16h7" />
      <path d="M15.5 7.5 20 12l-4.5 4.5" />
    </Svg>
  );
}

/** Strength - loaded bar. */
export function IconStrength(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </Svg>
  );
}

/** Agility - change of direction between markers. */
export function IconAgility(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 18 8 9l5 6 3-5 5 8" />
      <circle cx="8" cy="9" r="1.1" />
      <circle cx="16" cy="10" r="1.1" />
    </Svg>
  );
}

/** Explosive power - upward burst. */
export function IconPower(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21V8" />
      <path d="m7.5 12.5 4.5-4.5 4.5 4.5" />
      <path d="M5 5.5 7.5 3M19 5.5 16.5 3M12 3V1" />
    </Svg>
  );
}

/** Injury prevention - protective shield with a check. */
export function IconShield(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 5.5v5.9c0 4.2 2.9 7.4 7 8.6 4.1-1.2 7-4.4 7-8.6V5.5L12 3Z" />
      <path d="m9 11.8 2.1 2.1 4-4" />
    </Svg>
  );
}

/** Sport-specific conditioning - whistle. */
export function IconConditioning(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10.5h9.5a3.5 3.5 0 1 0-3.5-3.5" />
      <path d="M12.5 10.5v2.2a4.3 4.3 0 1 1-8.6 0v-2.2" />
      <circle cx="8.2" cy="12.7" r="1.5" />
      <path d="M18 6.5c1.6 1.2 2.6 3 2.6 5" />
    </Svg>
  );
}

/** Vertical jump - jump arc over a ground line. */
export function IconJump(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 20h20" />
      <path d="M6.5 20c0-4.6 2.5-8.2 5.5-8.2s5.5 3.6 5.5 8.2" />
      <path d="M12 11.8V4.5" />
      <path d="m9.4 7 2.6-2.6L14.6 7" />
    </Svg>
  );
}

/** Mobility and flexibility - range-of-motion arcs. */
export function IconMobility(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.2 20a9 9 0 0 1 15.6 0" />
      <path d="M8.2 20a5 5 0 0 1 7.6 0" />
      <path d="M12 4v6" />
      <path d="m9.6 7.6 2.4 2.4 2.4-2.4" />
    </Svg>
  );
}

/** Ordered to match the five hero disciplines. */
export const DISCIPLINE_ICONS = [
  IconSpeed,
  IconStrength,
  IconAgility,
  IconPower,
  IconShield,
] as const;

/** Ordered to match the eight training objectives. */
export const OBJECTIVE_ICONS = [
  IconSpeed,
  IconPower,
  IconAgility,
  IconStrength,
  IconShield,
  IconConditioning,
  IconJump,
  IconMobility,
] as const;
