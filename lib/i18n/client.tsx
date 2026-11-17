"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, localizedPath, stripLocale, type Locale } from "./config";
import { getDictionary, type TranslationKey } from "./dictionaries";

type I18nValue = {
  locale: Locale;
  /** Translate a key for the active locale. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** Prefix a root-relative path for the active locale. */
  path: (path: string) => string;
  /** The same path in the other locale, for the language switcher. */
  alternatePath: (pathname: string, target: Locale) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => {
    const dict = getDictionary(locale);
    return {
      locale,
      t: (key, vars) => {
        let text = dict[key] ?? key;
        if (vars) {
          for (const [name, replacement] of Object.entries(vars)) {
            text = text.replace(new RegExp(`\\{${name}\\}`, "g"), String(replacement));
          }
        }
        return text;
      },
      path: (path) => localizedPath(locale, path),
      alternatePath: (pathname, target) => {
        const { path } = stripLocale(pathname || "/");
        return localizedPath(target, path);
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    // A component rendered outside the provider still gets usable English
    // strings rather than throwing and blanking the page.
    const dict = getDictionary(DEFAULT_LOCALE);
    return {
      locale: DEFAULT_LOCALE,
      t: (key) => dict[key] ?? key,
      path: (path) => localizedPath(DEFAULT_LOCALE, path),
      alternatePath: (pathname) => pathname,
    };
  }
  return value;
}
