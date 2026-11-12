import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, GoldRule, SectionHeading, StatStrip, ArrowLink } from "@/components/ui";
import { programs, trainingPrinciples } from "@/lib/content/programs";
import { technology } from "@/lib/content/technology";
import { stats } from "@/lib/content/site";
import { JsonLd, organizationSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink">
        <Image
          src="/media/hero-track.jpg"
          alt="Illustrative image: a lone athlete silhouette sprinting on a floodlit track at night."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.92)_0%,rgba(8,8,8,0.55)_45%,rgba(8,8,8,0.1)_100%)]" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="shell relative w-full pb-14 pt-32 lg:pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 fade-in">
              <GoldRule />
              <Eyebrow>Dallas–Fort Worth · Athletic Development</Eyebrow>
            </div>

            <h1 className="mt-7 fade-in" style={{ animationDelay: "80ms" }}>
              <span className="display-xl block text-white">Build winning</span>
              <span className="display-xl block text-white">habits.</span>
              <span className="display-xl mt-2 block text-sheen">Reach your</span>
              <span className="display-xl block text-sheen">next level.</span>
            </h1>

            <p
              className="mt-8 max-w-xl font-sans text-base leading-7 text-silver sm:text-lg fade-in"
              style={{ animationDelay: "160ms" }}
            >
              Elite athletic development built on speed, strength, discipline, and measurable
              performance. Train with purpose. Compete with confidence.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3 fade-in"
              style={{ animationDelay: "240ms" }}
            >
              <Link href="/start-training" className="btn-primary">
                Start Training
              </Link>
              <Link href="/about" className="btn-ghost">
                Meet Coach Young
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- ticker */}
      <section
        aria-label="Training qualities"
        className="overflow-hidden border-y border-white/10 bg-graphite/60"
      >
        <div className="flex whitespace-nowrap py-4">
          <ul className="ticker flex shrink-0 items-center gap-10 pr-10 font-display text-sm uppercase tracking-[0.28em] text-silver/70">
            {[
              "Speed",
              "Strength",
              "Agility",
              "Explosive Power",
              "Injury Prevention",
              "Vertical Jump",
              "Mobility",
              "Conditioning",
            ].map((item) => (
              <li key={item} className="flex items-center gap-10">
                <span>{item}</span>
                <span aria-hidden="true" className="text-gold">
                  /
                </span>
              </li>
            ))}
          </ul>
          <ul
            aria-hidden="true"
            className="ticker flex shrink-0 items-center gap-10 pr-10 font-display text-sm uppercase tracking-[0.28em] text-silver/70"
          >
            {[
              "Speed",
              "Strength",
              "Agility",
              "Explosive Power",
              "Injury Prevention",
              "Vertical Jump",
              "Mobility",
              "Conditioning",
            ].map((item) => (
              <li key={item} className="flex items-center gap-10">
                <span>{item}</span>
                <span className="text-gold">/</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- stats */}
      <section aria-label="At a glance" className="border-b border-white/10 bg-graphite/40">
        <div className="shell py-2">
          <StatStrip items={stats} />
        </div>
      </section>

      {/* ---------------------------------------------------------- manifesto */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <Eyebrow>The standard</Eyebrow>
              <h2 className="display-lg mt-6 text-white">
                Development is
                <br />
                not a workout.
                <br />
                <span className="text-gold">It is a system.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-6 font-sans text-base leading-7 text-silver sm:text-lg">
                <p>
                  Young &amp; Elevated Sports Performance exists to give athletes an environment that
                  prepares them for the next level. Not a random collection of drills — a structured
                  process built around the individual athlete, their sport, and their season.
                </p>
                <p>
                  Every athlete is assessed, coached, and measured. Technique is treated as the
                  prerequisite for load. Progress is tracked with objective tools, and the habits that
                  separate consistent competitors from occasional ones are coached deliberately.
                </p>
                <p className="border-l-2 border-gold/60 pl-6 font-display text-xl uppercase leading-tight text-white">
                  &ldquo;Expose athletes to an environment that prepares them for the next level.&rdquo;
                  <span className="mt-3 block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                    Reggie Young, Founder
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- programs */}
      <section className="border-t border-white/10 bg-graphite/30 py-24 lg:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              index="01"
              eyebrow="Training disciplines"
              title={
                <>
                  Eight qualities.
                  <br />
                  One athlete.
                </>
              }
              intro="Speed, power, strength, and movement quality are developed together. Each discipline is programmed against the athlete's assessment — not applied as a standalone workout."
            />
            <div className="shrink-0">
              <ArrowLink href="/training">View all programs</ArrowLink>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 40}>
                <Link
                  href={`/training#${program.slug}`}
                  className="group flex h-full flex-col justify-between bg-ink p-7 transition-colors hover:bg-graphite"
                >
                  <div>
                    <span className="font-sans text-[0.66rem] font-semibold tracking-[0.28em] text-gold/70">
                      {program.index}
                    </span>
                    <h3 className="mt-5 font-display text-2xl uppercase leading-none text-white">
                      {program.title}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-6 text-silver/80">{program.summary}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-8 block h-px w-8 bg-white/20 transition-all duration-300 group-hover:w-16 group-hover:bg-gold"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- coach */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[620px]">
            <Image
              src="/media/facility.jpg"
              alt="Illustrative image: an empty indoor training facility with turf and overhead lighting."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-ink/10" />
            <div className="absolute bottom-6 left-6 border border-white/15 bg-ink/70 px-4 py-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/50 backdrop-blur">
              Illustrative imagery — replace with licensed client photography
            </div>
          </div>

          <div className="flex items-center bg-ink px-6 py-20 sm:px-12 lg:px-16">
            <Reveal>
              <Eyebrow>Meet the founder</Eyebrow>
              <h2 className="display-lg mt-6 text-white">
                Reggie
                <br />
                Young
              </h2>
              <p className="mt-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
                Founder · CSCS · Dallas–Fort Worth
              </p>
              <div className="mt-7 space-y-4 font-sans text-base leading-7 text-silver">
                <p>
                  A former Division I football player at Liberty University and the University of
                  Colorado, Reggie retired from football in 2023 and moved into athletic development.
                </p>
                <p>
                  His coaching is built on winning habits, physical resilience, competitive mindset, and
                  an individual connection with every athlete he works with.
                </p>
              </div>
              <div className="mt-9">
                <ArrowLink href="/about">Read the full story</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- method */}
      <section className="border-t border-white/10 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="The method"
            title={
              <>
                How the work
                <br />
                gets done.
              </>
            }
          />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {trainingPrinciples.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="border-t border-white/15 pt-6">
                  <span className="font-sans text-[0.66rem] font-semibold tracking-[0.28em] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-6 text-silver/80">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- technology */}
      <section className="relative overflow-hidden border-t border-white/10 bg-graphite/40 py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow="Performance technology"
                title={
                  <>
                    Measured,
                    <br />
                    not guessed.
                  </>
                }
                intro="Objective measurement turns training into a trend line. Velocity, jump output, and movement quality are recorded so decisions are based on data — and coaching judgment still leads."
              />
              <div className="mt-9">
                <ArrowLink href="/performance-technology">Explore the technology</ArrowLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {technology.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-6 py-5">
                    <div>
                      <p className="font-display text-xl uppercase text-white">{item.name}</p>
                      <p className="mt-1 font-sans text-sm text-silver/70">{item.role}</p>
                    </div>
                    <span className="shrink-0 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold/70">
                      {item.category}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- tech pillars */}
      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <Eyebrow>Data-driven training</Eyebrow>
            <h2 className="display-lg mt-6 max-w-3xl text-white">
              Data-driven training for <span className="text-gold">measurable results.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Movement Analysis", body: "Screening how the athlete moves before loading it." },
              { title: "Performance Tracking", body: "Repeatable metrics recorded across the training block." },
              { title: "Recovery & Readiness", body: "Load and readiness considered before intensity is assigned." },
              { title: "Sports Technology", body: "Velocity, jump, and output tools used with coaching judgment." },
              { title: "Training Intelligence", body: "Assessment data translated into the next program." },
            ].map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 50}>
                <div className="h-full bg-ink p-6">
                  <span className="font-sans text-[0.62rem] font-semibold tracking-[0.28em] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg uppercase leading-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-6 text-silver/75">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- DFW */}
      <section className="relative overflow-hidden border-t border-white/10 bg-graphite/40 py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(214,167,59,0.10),transparent_60%)]"
        />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>Training in</Eyebrow>
            <h2 className="display-xl mt-5 text-white">
              Dallas<span className="text-gold">–</span>Fort Worth
            </h2>
            <p className="lede mt-6 max-w-2xl">
              Built for athletes across the metroplex. Sessions are programmed around the sport,
              the season, and the individual — with objective measurement guiding the work.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              { label: "Elite Training", body: "Structured, coached sessions — not open gym time." },
              { label: "Elite Facility", body: "A performance environment built for speed, strength, and power." },
              { label: "DFW Athletes", body: "Serving Dallas–Fort Worth and the surrounding communities." },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <h3 className="font-display text-2xl uppercase leading-none text-gold">
                  {item.label}
                </h3>
                <p className="mt-3 font-sans text-sm leading-6 text-silver/80">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-ink py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,167,59,0.14),transparent_65%)]"
        />
        <div className="shell relative text-center">
          <Eyebrow className="justify-center">Next step</Eyebrow>
          <h2 className="display-xl mx-auto mt-6 max-w-4xl text-white">
            Ready to <span className="text-gold">elevate?</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            Tell us about the athlete, the sport, and the goal. We will follow up with next steps,
            availability, and the registration process.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/start-training" className="btn-primary">
              Start Training
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
