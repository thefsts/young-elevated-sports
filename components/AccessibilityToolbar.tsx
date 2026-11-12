"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/client";

/**
 * Floating accessibility system.
 *
 * Real, working controls only — every switch below changes the document. The
 * panel is a keyboard-trapped dialog with visible focus, screen-reader labels,
 * Escape-to-close, and focus returned to the launcher. The launcher can be
 * dragged with a pointer or repositioned with the arrow keys while focused,
 * and it respects mobile safe areas. Preferences are non-sensitive and stored
 * locally; the site remains fully usable when the panel is closed.
 */

type Prefs = {
  textScale: 0 | 1 | 2;
  contrast: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
  textSpacing: boolean;
  largerPointer: boolean;
};

const STORAGE_KEY = "yesp_a11y_prefs_v1";
const POSITION_KEY = "yesp_a11y_pos_v1";

const DEFAULTS: Prefs = {
  textScale: 0,
  contrast: false,
  reducedMotion: false,
  underlineLinks: false,
  textSpacing: false,
  largerPointer: false,
};

const TEXT_ATTRS = ["normal", "large", "xlarge"] as const;

function readPrefs(): Prefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      textScale: parsed.textScale === 1 || parsed.textScale === 2 ? parsed.textScale : 0,
      contrast: Boolean(parsed.contrast),
      reducedMotion: Boolean(parsed.reducedMotion),
      underlineLinks: Boolean(parsed.underlineLinks),
      textSpacing: Boolean(parsed.textSpacing),
      largerPointer: Boolean(parsed.largerPointer),
    };
  } catch {
    return DEFAULTS;
  }
}

function applyPrefs(prefs: Prefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.a11yText = TEXT_ATTRS[prefs.textScale];
  root.dataset.a11yContrast = prefs.contrast ? "on" : "off";
  root.dataset.a11yMotion = prefs.reducedMotion ? "reduced" : "normal";
  root.dataset.a11yLinks = prefs.underlineLinks ? "on" : "off";
  root.dataset.a11ySpacing = prefs.textSpacing ? "on" : "off";
  root.dataset.a11yPointer = prefs.largerPointer ? "on" : "off";
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AccessibilityToolbar() {
  const { t } = useI18n();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number; moved: boolean } | null>(null);
  const titleId = useId();
  const descId = useId();

  // Hydrate preferences and saved launcher position.
  useEffect(() => {
    const stored = readPrefs();
    setPrefs(stored);
    applyPrefs(stored);
    try {
      const rawPos = window.localStorage.getItem(POSITION_KEY);
      if (rawPos) {
        const parsed = JSON.parse(rawPos) as { left: number; top: number };
        if (typeof parsed.left === "number" && typeof parsed.top === "number") {
          setPosition(clamp(parsed.left, parsed.top));
        }
      }
    } catch {
      /* ignore malformed stored position */
    }
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      applyPrefs(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage may be unavailable — preferences still apply for this visit */
      }
      return next;
    });
  }, []);

  // Keep a dragged launcher inside the viewport on resize.
  useEffect(() => {
    if (!position) return;
    function onResize() {
      setPosition((prev) => (prev ? clamp(prev.left, prev.top) : prev));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [position]);

  // Focus management + Escape + focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        launcherRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(panel!.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function clamp(left: number, top: number) {
    if (typeof window === "undefined") return { left, top };
    const margin = 8;
    const size = 56;
    const maxLeft = window.innerWidth - size - margin;
    const maxTop = window.innerHeight - size - margin;
    return {
      left: Math.min(Math.max(margin, left), Math.max(margin, maxLeft)),
      top: Math.min(Math.max(margin, top), Math.max(margin, maxTop)),
    };
  }

  function persistPosition(next: { left: number; top: number }) {
    setPosition(next);
    try {
      window.localStorage.setItem(POSITION_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const state = dragState.current;
    if (!state) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) state.moved = true;
    setPosition(clamp(state.originX + dx, state.originY + dy));
  }

  function onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const state = dragState.current;
    dragState.current = null;
    if (!state) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (state.moved) {
      const rect = event.currentTarget.getBoundingClientRect();
      persistPosition(clamp(rect.left, rect.top));
    } else {
      setOpen((prev) => !prev);
    }
  }

  function onLauncherKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const step = event.shiftKey ? 32 : 12;
    const current = position ?? currentRect();
    let next: { left: number; top: number } | null = null;
    if (event.key === "ArrowUp") next = clamp(current.left, current.top - step);
    else if (event.key === "ArrowDown") next = clamp(current.left, current.top + step);
    else if (event.key === "ArrowLeft") next = clamp(current.left - step, current.top);
    else if (event.key === "ArrowRight") next = clamp(current.left + step, current.top);
    if (next) {
      event.preventDefault();
      persistPosition(next);
    }
  }

  function currentRect() {
    const rect = launcherRef.current?.getBoundingClientRect();
    return rect ? { left: rect.left, top: rect.top } : { left: 0, top: 0 };
  }

  function resetAll() {
    applyPrefs(DEFAULTS);
    setPrefs(DEFAULTS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAnnouncement(t("a11y.reset"));
  }

  const launcherStyle = position
    ? { left: position.left, top: position.top, right: "auto", bottom: "auto" }
    : undefined;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="a11y-launcher flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ink text-gold shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
        style={launcherStyle}
        aria-label={t("a11y.open")}
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        aria-haspopup="dialog"
        title={t("a11y.dragHint")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onLauncherKeyDown}
        data-ready={ready ? "true" : "false"}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <circle cx="12" cy="4.4" r="1.9" fill="currentColor" />
          <path
            d="M4.6 8.6l4.2-1.5 3.2 1.1 3.2-1.1 4.2 1.5M12 8.2v5.1m0 0l-3 6.4m3-6.4l3 6.4M8.8 11.4l3.2.9 3.2-.9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="a11y-panel rounded-2xl border border-gold/40 bg-[#0d0d0d] p-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
          style={
            position
              ? {
                  left: Math.min(position.left, (typeof window !== "undefined" ? window.innerWidth : 9999) - 360),
                  top: Math.min(position.top + 64, (typeof window !== "undefined" ? window.innerHeight : 9999) - 420),
                  right: "auto",
                  bottom: "auto",
                }
              : { right: "max(1rem, env(safe-area-inset-right))", bottom: "max(5.25rem, calc(env(safe-area-inset-bottom) + 5rem))" }
          }
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id={titleId} className="font-display text-lg uppercase tracking-wide text-gold">
                {t("a11y.title")}
              </h2>
              <p id={descId} className="mt-1 text-xs leading-relaxed text-silver/80">
                {t("a11y.intro")}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label={t("a11y.minimize")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-silver hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label={t("a11y.close")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-silver hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-2.5">
              <span className="text-sm">{t("a11y.textSize")}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => update({ textScale: Math.max(0, prefs.textScale - 1) as Prefs["textScale"] })}
                  disabled={prefs.textScale === 0}
                  aria-label={t("a11y.decrease")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 text-sm font-semibold disabled:opacity-40 hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
                >
                  A−
                </button>
                <span className="min-w-[2.2rem] text-center text-xs text-silver" aria-live="polite">
                  {["100%", "112%", "125%"][prefs.textScale]}
                </span>
                <button
                  type="button"
                  onClick={() => update({ textScale: Math.min(2, prefs.textScale + 1) as Prefs["textScale"] })}
                  disabled={prefs.textScale === 2}
                  aria-label={t("a11y.increase")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 text-sm font-semibold disabled:opacity-40 hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
                >
                  A+
                </button>
              </div>
            </div>

            <Toggle
              label={t("a11y.contrast")}
              checked={prefs.contrast}
              onChange={(v) => update({ contrast: v })}
            />
            <Toggle
              label={t("a11y.reducedMotion")}
              checked={prefs.reducedMotion}
              onChange={(v) => update({ reducedMotion: v })}
            />
            <Toggle
              label={t("a11y.underlineLinks")}
              checked={prefs.underlineLinks}
              onChange={(v) => update({ underlineLinks: v })}
            />
            <Toggle
              label={t("a11y.textSpacing")}
              checked={prefs.textSpacing}
              onChange={(v) => update({ textSpacing: v })}
            />
            <Toggle
              label={t("a11y.largerPointer")}
              checked={prefs.largerPointer}
              onChange={(v) => update({ largerPointer: v })}
            />
          </div>

          <button
            type="button"
            onClick={resetAll}
            className="mt-4 w-full rounded-xl border border-gold/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            {t("a11y.reset")}
          </button>

          <p className="mt-3 text-[0.68rem] leading-relaxed text-silver/60">{t("a11y.dragHint")}</p>
          <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
        </div>
      )}
    </>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-2.5 hover:border-white/25">
      <span className="text-sm">{label}</span>
      <span className="relative inline-flex shrink-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span
          aria-hidden="true"
          className="h-6 w-11 rounded-full border border-white/25 bg-white/10 transition peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-bright"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5 peer-checked:bg-ink"
        />
      </span>
    </label>
  );
}
