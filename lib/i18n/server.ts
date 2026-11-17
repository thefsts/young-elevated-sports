import { headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_HEADER, isLocale, type Locale } from "./config";
import { getDictionary, type TranslationKey } from "./dictionaries";

/** Resolve the active locale for a server component. */
export async function getLocale(): Promise<Locale> {
  const store = await headers();
  const value = store.get(LOCALE_HEADER);
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Server-side translator bound to the active locale. */
export async function getTranslator() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return {
    locale,
    dict,
    t: (key: TranslationKey, vars?: Record<string, string | number>) => {
      let value = dict[key] ?? key;
      if (vars) {
        for (const [name, replacement] of Object.entries(vars)) {
          value = value.replace(new RegExp(`\\{${name}\\}`, "g"), String(replacement));
        }
      }
      return value;
    },
  };
}
