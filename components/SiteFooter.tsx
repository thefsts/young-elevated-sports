import Link from "next/link";
import { footerNavigation, site } from "@/lib/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Young & Elevated Sports Performance — home">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs font-sans text-sm leading-6 text-silver">
              Elite athletic development in {site.region}. Built on speed, strength, discipline, and
              measurable performance.
            </p>
            <p className="mt-6 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-white/40">
              Serving {site.region}
            </p>
          </div>

          <FooterColumn title="Train" links={footerNavigation.train} />
          <FooterColumn title="Register" links={footerNavigation.register} />
          <FooterColumn title="Policies" links={footerNavigation.legal} />
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-4xl font-sans text-xs leading-6 text-white/40">
            <strong className="font-semibold text-white/60">Draft notice:</strong> Legal documents on
            this site are unapproved templates marked{" "}
            <span className="text-gold/80">DRAFT — LEGAL REVIEW REQUIRED</span>. They are provided for
            review and are not binding agreements. Athletic training involves inherent risk and is not
            medical treatment. No training outcome, scholarship, recruiting result, or professional
            contract is promised.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-xs text-white/40">
              © {year} {site.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-5 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-white/50">
              <Link href="/privacy" className="hover:text-gold">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gold">
                Terms
              </Link>
              <Link href="/accessibility" className="hover:text-gold">
                Accessibility
              </Link>
              <Link href="/waivers" className="hover:text-gold">
                Waivers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
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
