import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Registration",
  description:
    "Registration pathways for Young & Elevated Sports Performance: individual athletes, parents and guardians, schools and teams, and coach partnerships.",
  path: "/registration",
});

const pathways = [
  {
    n: "A",
    t: "Individual Athlete",
    b: "The full athlete intake: identity, sport, guardian, emergency contact, objectives, and medical disclosure.",
    href: "/registration/athlete",
    cta: "Athlete registration",
    status: "Preview only — submission disabled",
  },
  {
    n: "B",
    t: "Parent / Guardian",
    b: "Guardian-led consent, medical disclosure, emergency authorization, and required waivers for a minor athlete.",
    href: "/registration/parent",
    cta: "Parent / guardian",
    status: "Preview only — submission disabled",
  },
  {
    n: "C",
    t: "School / Team / Organization",
    b: "A scoped inquiry for school partnerships, team blocks, and on-site performance sessions.",
    href: "/registration/school",
    cta: "School / team inquiry",
    status: "Inquiry form active",
  },
  {
    n: "D",
    t: "Coach / Trainer Partnership",
    b: "A partnership inquiry for coaches and trainers exploring a collaboration with Young & Elevated.",
    href: "/registration/partner",
    cta: "Partnership inquiry",
    status: "Inquiry form active",
  },
];

export default function RegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration"
        title={
          <>
            Four pathways.
            <br />
            One standard.
          </>
        }
        intro="Registration is guardian-led for athletes under 18. Sensitive registration and waiver submission remain disabled until secure storage, consent records, and legal review are approved."
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Choose a pathway"
            title="Where are you starting from?"
            intro="Public inquiries are live. Sensitive athlete and guardian registration is built but intentionally not accepting submissions yet."
          />

          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {pathways.map((pathway) => (
              <article key={pathway.n} className="flex flex-col bg-ink p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl leading-none text-gold-bright">{pathway.n}</span>
                  <h3 className="font-display text-xl uppercase tracking-wide text-white">{pathway.t}</h3>
                </div>
                <p className="mt-4 flex-1 font-sans text-sm leading-6 text-silver">{pathway.b}</p>
                <p className="mt-5 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
                  {pathway.status}
                </p>
                <Link
                  href={pathway.href}
                  className="mt-4 inline-flex items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold hover:text-gold-bright"
                >
                  {pathway.cta} <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Notice tone="locked" title="Why sensitive submission is disabled">
              Athlete and guardian registration collects health information about minors. It cannot go
              live until approved secure storage, role-based access, versioned waiver acceptance,
              signature audit records, retention and deletion controls, and a completed privacy review
              exist. The forms are fully built so the workflow can be reviewed.
            </Notice>
            <Notice tone="info" title="Before you begin">
              Have the athlete&rsquo;s date of birth, sport and position, guardian contact, emergency
              contact, and training objectives ready. Medical details are collected only through the
              approved secure process — never by email or a public form.
            </Notice>
          </div>
        </div>
      </section>
    </>
  );
}
