import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { formats, programs, trainingPrinciples } from "@/lib/content/programs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Training Programs",
  description:
    "Speed and acceleration, explosive power, agility, strength, injury risk reduction, conditioning, vertical jump, and mobility — structured athletic development in Dallas–Fort Worth.",
  path: "/training",
});

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training · Programs"
        title={
          <>
            Built for the
            <br />
            demands of sport.
          </>
        }
        intro="Eight training disciplines, programmed together around one athlete. Each quality is developed with intent — and progressed only when technique earns it."
        image="/media/barbell.jpg"
        imageAlt="Illustrative image: a loaded barbell on a rubber gym floor under warm side lighting."
        actions={
          <>
            <Link href="/start-training" className="btn-primary">
              Start Training
            </Link>
            <Link href="/registration" className="btn-ghost">
              Registration
            </Link>
          </>
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Disciplines"
            title="What we train"
            intro="Descriptions below explain the training emphasis. They are not promises of a specific result, and training is not medical treatment or physical therapy."
          />

          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 30}>
                <article id={program.slug} className="scroll-mt-28 py-10 lg:py-12">
                  <div className="grid gap-8 lg:grid-cols-[0.16fr_0.84fr_1fr] lg:gap-12">
                    <div className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-gold/70">
                      {program.index}
                    </div>

                    <div>
                      <h2 className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">
                        {program.title}
                      </h2>
                      <p className="mt-5 font-sans text-base leading-7 text-silver">{program.summary}</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                          Focus
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {program.focus.map((f) => (
                            <li key={f} className="flex items-start gap-2 font-sans text-sm text-silver/85">
                              <span aria-hidden="true" className="mt-2 h-px w-2.5 shrink-0 bg-gold" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                          Why it matters
                        </h3>
                        <p className="mt-3 font-sans text-sm leading-6 text-silver/85">
                          {program.athleteBenefit}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Formats"
            title="How athletes train"
            intro="Service formats are configurable. Pricing, schedules, and locations are confirmed directly on inquiry — they are not published here."
          />

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map((format, i) => (
              <Reveal key={format.slug} delay={i * 40}>
                <div className="flex h-full flex-col bg-ink p-7">
                  <h3 className="font-display text-2xl uppercase leading-none text-white">
                    {format.title}
                  </h3>
                  <p className="mt-4 flex-1 font-sans text-sm leading-6 text-silver/80">
                    {format.summary}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-4 font-sans text-[0.66rem] uppercase leading-5 tracking-[0.16em] text-gold/70">
                    {format.availability}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Training principles</Eyebrow>
            <div className="mt-8 space-y-8">
              {trainingPrinciples.map((p) => (
                <div key={p.title} className="border-l border-gold/40 pl-6">
                  <h2 className="font-display text-xl uppercase text-white">{p.title}</h2>
                  <p className="mt-2 font-sans text-sm leading-6 text-silver/85">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Notice tone="draft" title="Important limitations">
              <p>
                Athletic training involves inherent risk. Young &amp; Elevated Sports Performance does
                not guarantee improvement, injury prevention, scholarship offers, recruiting outcomes,
                or professional contracts.
              </p>
              <p className="mt-3">
                Training is not medical treatment, physical therapy, or rehabilitation. Athletes with
                injuries or medical restrictions should consult a qualified healthcare provider.
              </p>
            </Notice>
            <Notice tone="info" title="Pricing & scheduling">
              <p>
                No prices or session schedules are published at this stage. Availability, pricing, and
                location are confirmed on inquiry so that each athlete receives accurate information.
              </p>
            </Notice>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/start-training" className="btn-primary">
                Start Training
              </Link>
              <Link href="/performance-technology" className="btn-ghost">
                Technology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
