"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";

/**
 * Visible language selector for desktop and mobile headers.
 *
 * Switching navigates to the same page in the other locale, so the visitor does
 * not lose their place. The choice is also written to the locale cookie so the
 * middleware can honour it on unprefixed URLs.
 */
export function LanguageSelector({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(target: Locale) {
    if (target === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const { path } = stripLocale(pathname);
    const href = localizedPath(target, path);
    startTransition(() => {
      router.push(href);
      router.refresh();
    });
  }

  const base =
    variant === "desktop"
      ? "flex items-center gap-0.5 rounded-full border border-white/15 p-0.5"
      : "flex items-center gap-1 rounded-full border border-white/20 p-1";

  return (
    <div className={base} role="group" aria-label={t("nav.language")} data-pending={pending ? "true" : "false"}>
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => choose(code)}
            aria-pressed={active}
            lang={LOCALE_LABELS[code].htmlLang}
            className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition ${
              active
                ? "bg-gold text-ink"
                : "text-white/70 hover:text-white"
            } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright`}
            title={LOCALE_LABELS[code].long}
          >
            {LOCALE_LABELS[code].short}
            <span className="sr-only"> — {LOCALE_LABELS[code].long}</span>
          </button>
        );
      })}
    </div>
  );
}
