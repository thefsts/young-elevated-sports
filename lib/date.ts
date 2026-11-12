/**
 * Calendar-date helpers.
 *
 * `new Date("2025-02-31")` silently rolls forward to 3 March. That is not
 * acceptable for a date of birth or a requested session date, so every date
 * that reaches a schema is round-tripped through the calendar before use.
 */

export const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Age band accepted for athlete-facing forms. Guardian-led below 18. */
export const ATHLETE_MIN_AGE = 5;
export const ATHLETE_MAX_AGE = 99;
export const ADULT_AGE = 18;

export type ParsedDate = { year: number; month: number; day: number };

/**
 * Parse a strict `YYYY-MM-DD` string into its parts, returning null unless the
 * date genuinely exists in the Gregorian calendar.
 */
export function parseIsoDate(value: string): ParsedDate | null {
  const match = ISO_DATE.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < 1900 || year > 2200) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1) return null;

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day > daysInMonth) return null;

  return { year, month, day };
}

/** True only for a real, existing calendar date in `YYYY-MM-DD` form. */
export function isRealCalendarDate(value: string): boolean {
  return parseIsoDate(value) !== null;
}

/** Convert a validated date to a UTC midnight Date. */
export function toUtcDate(value: string): Date | null {
  const parts = parseIsoDate(value);
  if (!parts) return null;
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
}

/** Whole years elapsed between `value` and `now`. Null when unusable. */
export function ageOn(value: string, now: Date = new Date()): number | null {
  const parts = parseIsoDate(value);
  if (!parts) return null;

  let age = now.getUTCFullYear() - parts.year;
  const monthDelta = now.getUTCMonth() + 1 - parts.month;
  if (monthDelta < 0 || (monthDelta === 0 && now.getUTCDate() < parts.day)) {
    age -= 1;
  }
  if (age < 0 || age > 130) return null;
  return age;
}

/** True when the date is strictly after the reference day (UTC). */
export function isFutureDate(value: string, now: Date = new Date()): boolean {
  const date = toUtcDate(value);
  if (!date) return false;
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return date.getTime() > today;
}

/** True when the date is on or before the reference day (UTC). */
export function isPastOrToday(value: string, now: Date = new Date()): boolean {
  const date = toUtcDate(value);
  if (!date) return false;
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return date.getTime() <= today;
}

/** Age-band check used by registration and class-interest schemas. */
export function isWithinAthleteAgeBand(
  value: string,
  now: Date = new Date(),
  min = ATHLETE_MIN_AGE,
  max = ATHLETE_MAX_AGE,
): boolean {
  const age = ageOn(value, now);
  if (age === null) return false;
  return age >= min && age <= max;
}

/** True when the athlete is a minor on the reference day. */
export function isMinor(value: string, now: Date = new Date()): boolean {
  const age = ageOn(value, now);
  return age !== null && age < ADULT_AGE;
}
