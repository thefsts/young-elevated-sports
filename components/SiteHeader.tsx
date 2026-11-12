"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content/site";
import { stripLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";

export function SiteHeader() {
  const rawPathname = usePathname();
  const pathname = stripLocale(rawPathname || "/").path;
  const { t, path } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [rawPathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/95 backdrop-blur"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link href={path("/")} aria-label={`${t("nav.home")} — Young & Elevated Sports Performance`} className="shrink-0">
          <Logo compact />
        </Link>

        <nav aria-label={t("nav.primary")} className="hidden items-center gap-6 xl:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={path(item.href)}
                aria-current={active ? "page" : undefined}
                className={`font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-gold-bright" : "text-white/75 hover:text-white"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSelector />
          <Link href={path("/start-training")} className="btn-primary !min-h-[2.75rem] !px-5">
            {t("nav.startTraining")}
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSelector variant="mobile" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center border border-white/20 text-white"
          >
            <span className="sr-only">{open ? t("nav.closeMenu") : t("nav.openMenu")}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-current transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[2px] w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-current transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 bg-ink xl:hidden">
          <nav aria-label={t("nav.mobile")} className="shell flex flex-col py-4">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={path(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-white/5 py-4 font-display text-2xl uppercase tracking-wide ${
                    active ? "text-gold-bright" : "text-white"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <Link href={path("/start-training")} className="btn-primary mt-5">
              {t("nav.startTraining")}
            </Link>
            <Link href={path("/registration")} className="btn-ghost mt-3">
              {t("nav.registration")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
