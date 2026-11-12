export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "yesp_locale";
export const LOCALE_HEADER = "x-yesp-locale";

export const LOCALE_LABELS: Record<Locale, { short: string; long: string; htmlLang: string }> = {
  en: { short: "EN", long: "English", htmlLang: "en-US" },
  es: { short: "ES", long: "Español", htmlLang: "es-US" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Prefix a root-relative path for a locale. English stays unprefixed. */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Remove a leading locale segment from a pathname. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    const rest = `/${segments.slice(1).join("/")}`;
    return { locale: segments[0], path: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** Absolute URL for a locale + path, used for canonical and hreflang tags. */
export function absoluteLocalized(siteUrl: string, locale: Locale, path: string): string {
  return `${siteUrl.replace(/\/$/, "")}${localizedPath(locale, path)}`;
}
