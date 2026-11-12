"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/client";
import {
  CONSENT_CHANGED,
  CONSENT_EVENT,
  CONSENT_VERSION,
  DEFAULT_CONSENT,
  OPTIONAL_CATEGORIES,
  readConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentState,
} from "@/lib/consent";

/**
 * Cookie consent.
 *
 * First-visit banner with three equally prominent choices (accept optional,
 * reject optional, customize). Optional categories are never pre-checked and
 * nothing optional is enabled until the visitor says so. The same panel can be
 * reopened from the footer. No marketing or analytics tags are installed, and
 * the panel says so rather than implying otherwise.
 */
export function CookieConsent() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stored = readConsent();
    setMounted(true);
    if (stored) {
      setDraft(stored);
    } else {
      setBannerOpen(true);
    }

    function onOpenRequest() {
      lastTrigger.current = document.activeElement as HTMLElement | null;
      setDraft(readConsent() ?? DEFAULT_CONSENT);
      setPanelOpen(true);
      setBannerOpen(false);
    }
    window.addEventListener(CONSENT_EVENT, onOpenRequest);
    return () => window.removeEventListener(CONSENT_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("button, input, a[href]");
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panelOpen]);

  function closePanel() {
    setPanelOpen(false);
    lastTrigger.current?.focus();
  }

  function commit(state: ConsentState) {
    const next: ConsentState = { ...state, version: CONSENT_VERSION, essential: true, updatedAt: new Date().toISOString() };
    writeConsent(next);
    setDraft(next);
    setBannerOpen(false);
    setPanelOpen(false);
    if (lastTrigger.current) lastTrigger.current.focus();
  }

  function acceptOptional() {
    commit({ ...draft, functional: true, analytics: true, marketing: true });
  }

  function rejectOptional() {
    commit({ ...draft, functional: false, analytics: false, marketing: false });
  }

  if (!mounted) return null;

  const categories: { key: ConsentCategory; label: string; body: string }[] = [
    { key: "essential", label: t("cookies.essential"), body: t("cookies.essentialBody") },
    { key: "functional", label: t("cookies.functional"), body: t("cookies.functionalBody") },
    { key: "analytics", label: t("cookies.analytics"), body: t("cookies.analyticsBody") },
    { key: "marketing", label: t("cookies.marketing"), body: t("cookies.marketingBody") },
  ];

  return (
    <>
      {bannerOpen && !panelOpen && (
        <div
          role="region"
          aria-label={t("cookies.title")}
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-gold/30 bg-[#0b0b0b]/98 backdrop-blur"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl text-xs leading-relaxed text-silver/85">
              {t("cookies.bannerText")}{" "}
              <a href="/privacy" className="text-gold underline underline-offset-2 hover:text-gold-bright">
                {t("cookies.policyLink")}
              </a>
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={rejectOptional}
                className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {t("cookies.rejectAll")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(readConsent() ?? DEFAULT_CONSENT);
                  setPanelOpen(true);
                  setBannerOpen(false);
                }}
                className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {t("cookies.customize")}
              </button>
              <button
                type="button"
                onClick={acceptOptional}
                className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ink hover:bg-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {t("cookies.acceptAll")}
              </button>
            </div>
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-6">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="w-full max-w-lg rounded-2xl border border-gold/40 bg-[#0d0d0d] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="font-display text-xl uppercase tracking-wide text-gold">
                {t("cookies.title")}
              </h2>
              <button
                type="button"
                onClick={closePanel}
                aria-label={t("a11y.close")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-silver hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <p id={descId} className="mt-2 text-xs leading-relaxed text-silver/80">
              {t("cookies.intro")}
            </p>

            <div className="mt-5 space-y-2">
              {categories.map((cat) => {
                const isEssential = cat.key === "essential";
                const checked = isEssential ? true : Boolean(draft[cat.key]);
                return (
                  <div key={cat.key} className="rounded-xl border border-white/10 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{cat.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-silver/75">{cat.body}</p>
                      </div>
                      {isEssential ? (
                        <span className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-silver/70">
                          {t("cookies.alwaysOn")}
                        </span>
                      ) : (
                        <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={checked}
                            onChange={(event) =>
                              setDraft((prev) => ({ ...prev, [cat.key]: event.target.checked }))
                            }
                          />
                          <span
                            aria-hidden="true"
                            className="h-6 w-11 rounded-full border border-white/25 bg-white/10 transition peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-bright"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5 peer-checked:bg-ink"
                          />
                          <span className="sr-only">{cat.label}</span>
                        </label>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[0.68rem] leading-relaxed text-silver/60">
              {t("cookies.noPrechecked")} {t("cookies.notInstalled")}
            </p>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => commit({ ...draft, functional: false, analytics: false, marketing: false })}
                className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {t("cookies.rejectAll")}
              </button>
              <button
                type="button"
                onClick={() => commit(draft)}
                className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ink hover:bg-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {t("cookies.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Renders children only when the visitor has granted the given optional
 * category. No optional scripts are installed today; this gate exists so any
 * future tag cannot load before consent.
 */
export function ConsentGate({
  category,
  children,
}: {
  category: Exclude<ConsentCategory, "essential">;
  children: React.ReactNode;
}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function sync() {
      const state = readConsent();
      setAllowed(Boolean(state && state[category]));
    }
    sync();
    window.addEventListener(CONSENT_CHANGED, sync);
    return () => window.removeEventListener(CONSENT_CHANGED, sync);
  }, [category]);

  if (!allowed) return null;
  return <>{children}</>;
}

export { OPTIONAL_CATEGORIES };
