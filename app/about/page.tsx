import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, GoldRule, Notice, PageHero, SectionHeading } from "@/components/ui";
import { bio } from "@/lib/content/bio";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meet Reggie Young",
  description:
    "Reggie Young is the founder of Young & Elevated Sports Performance in Dallas–Fort Worth — a former Division I football player and Certified Strength and Conditioning Specialist.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About · Founder"
        title={
          <>
            Meet
            <br />
            Reggie Young
          </>
        }
        intro={bio.intro}
        image="/media/facility.jpg"
        imageAlt="Illustrative image: an empty indoor athletic training facility with turf and overhead lighting."
        meta={
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-white/60">
            <span>Founder</span>
            <span className="text-gold">CSCS</span>
            <span>CPR &amp; AED</span>
            <span>{bio.location}</span>
          </div>
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>The mission</Eyebrow>
              <p className="mt-6 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                {bio.mission}
              </p>
              <div className="mt-8 space-y-5 font-sans text-base leading-7 text-silver">
                {bio.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-16">
                <Eyebrow>Coaching emphasis</Eyebrow>
                <div className="mt-7 grid gap-px bg-white/10 sm:grid-cols-2">
                  {bio.emphasis.map((item) => (
                    <div key={item.title} className="bg-ink p-6">
                      <h2 className="font-display text-lg uppercase text-white">{item.title}</h2>
                      <p className="mt-2 font-sans text-sm leading-6 text-silver/80">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-10">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <Image
                src="/media/barbell.jpg"
                alt="Illustrative image: a loaded barbell on a rubber gym floor under warm side lighting."
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 font-sans text-[0.58rem] uppercase leading-4 tracking-[0.16em] text-white/50">
                Illustrative imagery — not a photo of the client. Replace with licensed photography.
              </p>
            </div>

            <div className="border border-white/10 bg-graphite/50 p-6">
              <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold">
                Education
              </h2>
              <ul className="mt-5 space-y-4">
                {bio.education.map((item) => (
                  <li key={item.credential}>
                    <p className="font-display text-lg uppercase text-white">{item.credential}</p>
                    <p className="font-sans text-sm text-silver/80">
                      {item.institution} · {item.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-graphite/50 p-6">
              <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold">
                Certifications
              </h2>
              <ul className="mt-5 space-y-3">
                {bio.certifications.map((item) => (
                  <li key={item.name} className="flex items-start gap-3 font-sans text-sm text-silver">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                    {item.name}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-sans text-[0.7rem] leading-5 text-white/35">
                Certification badges and issuing-body logos are not displayed pending written
                permission and verification of current status.
              </p>
            </div>

            <div className="border border-white/10 bg-graphite/50 p-6">
              <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold">
                Accomplishments
              </h2>
              <ul className="mt-5 space-y-3">
                {bio.accomplishments.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-silver">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Verification status"
            title="What we have not published"
            intro="The following details were not supplied or verified, so they are intentionally absent from this page rather than invented."
          />
          <div className="mt-10 max-w-3xl">
            <Notice tone="info" title="Pending client verification">
              <ul className="mt-1 space-y-2">
                {bio.pendingVerification.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </Notice>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <GoldRule />
            <h2 className="display-md mt-5 text-white">Train with Coach Young.</h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-6 text-silver">
              Start with an inquiry. We will discuss the athlete, the sport, and the next step.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/start-training" className="btn-primary">
              Start Training
            </Link>
            <Link href="/training" className="btn-ghost">
              Training Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
