"use client";

import Link from "next/link";
import { footerNavigation, site } from "@/lib/content/site";
import { useI18n } from "@/lib/i18n/client";
import { openCookiePreferences } from "@/lib/consent";
import { FullLogo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { t, path } = useI18n();

  return (
    <footer className="border-t border-white/10 bg-ink">
      {/* full approved logo, including the Dallas skyline and DFW line */}
      <div className="shell pt-14 lg:pt-16">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <Link href={path("/")} className="inline-block w-[190px] max-w-full shrink-0 sm:w-[220px] lg:w-[240px]">
            <FullLogo className="h-auto w-full max-w-full object-contain" />
          </Link>
          <p className="max-w-sm font-sans text-sm leading-6 text-silver">
            Elite athletic development in {site.region}. Built on speed, strength, discipline, and
            measurable performance.
          </p>
        </div>
      </div>

      <div className="shell py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <FooterColumn title={t("footer.train")} links={footerNavigation.train} path={path} />
          <FooterColumn title={t("footer.register")} links={footerNavigation.register} path={path} />
          <FooterColumn title={t("footer.policies")} links={footerNavigation.legal} path={path} />
        </div>

        <p className="mt-12 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-white/60">
          {t("footer.serving")} {site.region}
        </p>

        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="max-w-4xl font-sans text-xs leading-6 text-white/60">
            <strong className="font-semibold text-white/60">{t("legal.draft")}:</strong>{" "}
            {t("footer.draftNotice")} Athletic training involves inherent risk and is not medical
            treatment. No training outcome, scholarship, recruiting result, or professional contract is
            promised.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-xs text-white/60">
              © {year} {site.legalName}. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap gap-5 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-white/65">
              <Link href={path("/privacy")} className="hover:text-gold">
                {t("footer.privacy")}
              </Link>
              <Link href={path("/terms")} className="hover:text-gold">
                {t("footer.terms")}
              </Link>
              <Link href={path("/accessibility")} className="hover:text-gold">
                {t("footer.accessibility")}
              </Link>
              <Link href={path("/waivers")} className="hover:text-gold">
                {t("footer.waivers")}
              </Link>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="uppercase tracking-[0.18em] hover:text-gold"
              >
                {t("cookies.reopen")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  path,
}: {
  title: string;
  links: { label: string; href: string }[];
  path: (href: string) => string;
}) {
  return (
    <div>
      <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={path(link.href)}
              className="font-sans text-sm text-white/65 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
