/**
 * Cookie / storage consent model.
 *
 * Honest inventory — this file documents exactly what the site stores today.
 * We do NOT claim to run analytics or marketing tags, because none are
 * installed. The functional / analytics / marketing categories exist so that
 * any future tag can be gated behind real consent rather than added silently.
 *
 * Current storage (all first-party, no third-party trackers):
 *   yesp_consent_v1        localStorage   essential   — records this choice
 *   yesp_cookie_notice_v1  localStorage   essential   — banner dismissed state
 *   yesp_a11y_prefs_v1     localStorage   essential   — accessibility prefs
 *   yesp_a11y_pos_v1       localStorage   essential   — launcher position
 *   yesp_locale            cookie         functional  — language preference
 *
 * Why the accessibility keys are essential rather than functional: they are
 * written only when a visitor actively uses the accessibility toolbar, and they
 * are the mechanism that delivers the accommodation the visitor asked for. If
 * they were gated behind optional consent, rejecting optional cookies would
 * switch off a disability accommodation. That is not a permissible trade, so
 * they are treated as strictly necessary and always honoured.
 *
 * The only genuinely optional preference is `yesp_locale`. It is written with a
 * one-year expiry only when the visitor grants `functional`; otherwise the
 * language selector writes a session-only cookie and the locale-prefixed URL
 * carries the choice. See components/LanguageSelector.tsx.
 *
 * See docs/cookie-inventory.md for the maintained table.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = "yesp_consent_v1";
export const CONSENT_EVENT = "yesp:open-cookie-preferences";
export const CONSENT_CHANGED = "yesp:consent-changed";

export const CONSENT_CATEGORIES = ["essential", "functional", "analytics", "marketing"] as const;
export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

export type ConsentState = {
  version: number;
  essential: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const DEFAULT_CONSENT: ConsentState = {
  version: CONSENT_VERSION,
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

/** Categories a visitor may turn on or off. Essential is always on. */
export const OPTIONAL_CATEGORIES: ConsentCategory[] = ["functional", "analytics", "marketing"];

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      essential: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: state }));
  } catch {
    /* storage unavailable — consent still applies for this page view */
  }
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essential") return true;
  const state = readConsent();
  return Boolean(state && state[category]);
}

/** Fire the footer "Cookie preferences" control from anywhere. */
export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}
