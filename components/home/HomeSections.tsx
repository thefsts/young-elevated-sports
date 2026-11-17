import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Eyebrow } from "@/components/ui";
import { media } from "@/lib/content/media";
import { classes, formatPrice, pricing, pricingPolicy } from "@/lib/content/classes";
import {
  homepageCopy,
  testimonials,
  type FaqItem,
  type Testimonial,
} from "@/lib/content/homepage";
import type { Locale } from "@/lib/i18n/config";

/**
 * Homepage sections 06–12.
 *
 * All components are server components: they receive the resolved locale and a
 * `path()` helper for localized links. No hooks, no client state, no network
 * I/O. Copy comes from `lib/content/homepage.ts`; prices come from the approved
 * catalog in `lib/content/classes.ts`.
 */

type Common = { locale: Locale; path: (href: string) => string };

/* ------------------------------------------------- 06 · training programs */

export function ProgramsSection({ locale, path }: Common) {
  const c = homepageCopy[locale].programs;

  return (
    <section id="programs" className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(214,167,59,0.10),transparent_55%)]"
      />
      <div className="shell-wide relative py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
              {c.title}
            </h2>
            <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-silver/85 lg:text-[1.0625rem]">
              {c.intro}
            </p>
          </div>
          <ArrowLink href={path("/classes")} className="text-gold hover:text-gold-bright">
            {locale === "es" ? "Ver todas las clases" : "See all classes"}
          </ArrowLink>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.items.map((item) => {
            const photo = media[item.imageCategory];
            return (
              <li key={item.slug} className="group flex flex-col border border-white/12 bg-graphite/60 transition-colors duration-300 hover:border-gold/60">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-0 top-0 bg-ink/85 px-2.5 py-1.5 font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold">
                    {item.index}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.12rem] uppercase leading-[1.15] text-white lg:text-[1.2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[0.92rem] leading-[1.55] text-silver/80">
                    {item.blurb}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                    {item.benefits.map((b) => (
                      <li key={b} className="flex gap-2 font-sans text-[0.86rem] leading-[1.45] text-silver/75">
                        <span aria-hidden="true" className="mt-[0.45rem] block h-1 w-1 shrink-0 bg-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-1">
                    <Link
                      href={path(`/classes/${item.slug}`)}
                      className="inline-flex items-center gap-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-bright"
                    >
                      {c.link}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------- 07 · classes & membership pricing */

export function PricingSection({ locale, path }: Common) {
  const c = homepageCopy[locale].pricing;
  const flex = pricing.find((g) => g.id === "flex")!;
  const monthly = pricing.find((g) => g.id === "monthly")!;
  const single = pricing.find((g) => g.id === "single")!.options[0];

  return (
    <section id="pricing" className="border-t border-white/10 bg-[#0d0c0b]">
      <div className="shell-wide py-16 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
            {c.title}
          </h2>
          <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-silver/85 lg:text-[1.0625rem]">
            {c.intro}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 border border-gold/40 bg-gold/[0.07] px-3 py-1.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            <span aria-hidden="true">◷</span>
            {c.sessionNote}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {/* single session */}
          <div className="flex flex-col border border-white/12 bg-graphite/50 p-6">
            <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold">
              {single.label}
            </h3>
            <p className="mt-4 font-display text-[2.6rem] leading-none text-white">
              {formatPrice(single.price)}
            </p>
            <p className="mt-1.5 font-sans text-[0.82rem] uppercase tracking-[0.16em] text-silver/70">
              {single.unit}
            </p>
            <p className="mt-4 border-t border-white/10 pt-4 font-sans text-[0.9rem] leading-[1.55] text-silver/75">
              {pricingPolicy.mixing[locale]}
            </p>
          </div>

          {/* flex bundles */}
          <div className="flex flex-col border border-gold/55 bg-gold/[0.05] p-6">
            <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold">
              {c.flexLabel}
            </h3>
            <ul className="mt-4 space-y-4">
              {flex.options.map((o) => (
                <li key={o.id} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-sans text-[0.95rem] font-semibold text-white">
                      {locale === "es" ? o.labelEs : o.label}
                    </p>
                    <p className="mt-0.5 font-sans text-[0.78rem] uppercase tracking-[0.12em] text-silver/60">
                      {locale === "es" ? o.unitEs : o.unit}
                    </p>
                  </div>
                  <p className="font-display text-[1.9rem] leading-none text-gold-bright">
                    {formatPrice(o.price)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-4 font-sans text-[0.84rem] leading-[1.5] text-silver/70">
              {locale === "es" ? flex.introEs : flex.intro}
            </p>
          </div>

          {/* monthly */}
          <div className="flex flex-col border border-white/12 bg-graphite/50 p-6">
            <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold">
              {c.monthlyLabel}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {monthly.options.map((o) => (
                <li key={o.id} className="flex items-baseline justify-between gap-3">
                  <p className="font-sans text-[0.9rem] text-silver/85">
                    {locale === "es" ? o.labelEs : o.label}
                  </p>
                  <p className="font-display text-[1.35rem] leading-none text-white">
                    {formatPrice(o.price)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-4 font-sans text-[0.84rem] leading-[1.5] text-silver/70">
              {locale === "es" ? monthly.introEs : monthly.intro}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl font-sans text-[0.86rem] leading-[1.6] text-silver/65">
          {pricingPolicy.payment[locale]}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={path("/classes/register")} className="btn-primary">
            {c.cta}
          </Link>
          <Link href={path("/classes")} className="btn-ghost">
            {c.ctaSecondary}
          </Link>
        </div>

        <p className="mt-4 font-sans text-[0.78rem] leading-[1.5] text-silver/70">
          {classes.length} {locale === "es" ? "rutas de clase disponibles" : "class tracks available"} ·{" "}
          {pricingPolicy.sessionLength} {locale === "es" ? "minutos por sesión" : "minutes per session"}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 08 · why train */

export function WhySection({ locale }: Common) {
  const c = homepageCopy[locale].why;
  return (
    <section id="why" className="relative overflow-hidden border-t border-white/10 bg-[#121110]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(214,167,59,0.14),transparent_60%)]"
      />
      <div className="shell-wide relative py-16 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
            {c.title}
          </h2>
          <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-silver/85 lg:text-[1.0625rem]">
            {c.intro}
          </p>
        </div>

        <ul className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <li key={item.title} className="bg-[#121110] p-6">
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.24em] text-gold/85">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-[1.15rem] uppercase leading-[1.2] text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 font-sans text-[0.92rem] leading-[1.6] text-silver/75">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------- 09 · reviews & testimonials */

export function ReviewsSection({ locale, path }: Common) {
  const c = homepageCopy[locale].reviews;
  const hasReviews = testimonials.length > 0;

  return (
    <section id="reviews" className="border-t border-white/10 bg-ink">
      <div className="shell-wide py-16 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
            {c.title}
          </h2>
          <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-silver/85 lg:text-[1.0625rem]">
            {c.intro}
          </p>
        </div>

        {hasReviews ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </ul>
        ) : (
          <div className="mt-10 grid items-center gap-8 border border-dashed border-gold/35 bg-gold/[0.035] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-10">
            <div>
              <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold">
                {c.emptyTitle}
              </p>
              <p className="mt-3 max-w-xl font-sans text-[0.98rem] leading-[1.65] text-silver/85">
                {c.emptyBody}
              </p>
              <div className="mt-6">
                <ArrowLink href={path("/training")}>{c.cta}</ArrowLink>
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden border border-white/12">
              <Image
                src={media["group-sessions"].src}
                alt={media["group-sessions"].alt}
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 font-sans text-[0.68rem] uppercase leading-[1.4] tracking-[0.12em] text-white/70">
                {media["group-sessions"].credit}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <li className="flex flex-col border border-white/12 bg-graphite/50 p-6">
      <blockquote className="flex-1 font-sans text-[0.98rem] leading-[1.65] text-silver/90">
        “{review.quote}”
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        {review.image ? (
          <span className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={review.image} alt="" fill sizes="40px" className="object-cover" />
          </span>
        ) : null}
        <div>
          <p className="font-sans text-[0.9rem] font-semibold text-white">{review.name}</p>
          <p className="font-sans text-[0.76rem] uppercase tracking-[0.14em] text-silver/60">
            {review.role} · {review.context}
          </p>
          {review.date ? (
            <p className="mt-1 font-sans text-[0.72rem] text-silver/70">{review.date}</p>
          ) : null}
        </div>
      </footer>
    </li>
  );
}

/* ------------------------------------- 10 · athlete development & results */

export function DevelopmentSection({ locale }: Common) {
  const c = homepageCopy[locale].development;
  return (
    <section id="development" className="border-t border-white/10 bg-[#ece9e4] text-ink">
      <div className="shell-wide py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#6d5316]">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-ink lg:text-[clamp(2rem,2.8vw,2.75rem)]">
            {c.title}
          </h2>
          <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-ink/75 lg:text-[1.0625rem]">
            {c.intro}
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {c.steps.map((s, i) => (
            <li key={s.index} className="relative flex flex-col border border-ink/15 bg-white/60 p-5">
              <span className="font-display text-[1.6rem] leading-none text-[#7a5d18]">{s.index}</span>
              <h3 className="mt-3 font-display text-[1.02rem] uppercase leading-[1.2] text-ink">
                {s.title}
              </h3>
              <p className="mt-2 font-sans text-[0.88rem] leading-[1.55] text-ink/70">{s.body}</p>
              {i < c.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-sans text-[1rem] text-ink/30 lg:block"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl border-l-2 border-[#7a5d18]/60 pl-4 font-sans text-[0.86rem] leading-[1.6] text-ink/65">
          {locale === "es"
            ? "El progreso individual varía. No se promete ningún resultado, beca, reclutamiento o contrato profesional."
            : "Individual progress varies. No training outcome, scholarship, recruiting result, or professional contract is promised."}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 11 · gallery */

export function GallerySection({ locale }: Common) {
  const c = homepageCopy[locale].gallery;
  return (
    <section id="gallery" className="border-t border-white/10 bg-ink">
      <div className="shell-wide py-16 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
            {c.title}
          </h2>
          <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-silver/85 lg:text-[1.0625rem]">
            {c.intro}
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => {
            const photo = media[item.category];
            return (
              <li
                key={item.caption}
                className={`group relative overflow-hidden border border-white/12 ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className={`relative ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={photo.src}
                    alt={item.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 92vw, 60vw" : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/90">
                    {item.caption}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-5 max-w-3xl font-sans text-[0.76rem] leading-[1.55] text-silver/70">
          {c.disclosure}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- 12 · FAQ */

export function FaqSection({ locale }: Common) {
  const c = homepageCopy[locale].faq;
  return (
    <section id="faq" className="border-t border-white/10 bg-[#0d0c0b]">
      <div className="shell-wide py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
              {c.title}
            </h2>
            <p className="mt-4 font-sans text-[1rem] leading-[1.6] text-silver/85">{c.intro}</p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {c.items.map((item) => (
              <FaqRow key={item.q} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-sans text-[0.98rem] font-semibold leading-[1.5] text-white marker:hidden [&::-webkit-details-marker]:hidden">
        <span>{item.q}</span>
        <span
          aria-hidden="true"
          className="mt-0.5 shrink-0 font-sans text-[1.1rem] leading-none text-gold transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-2.5 max-w-2xl font-sans text-[0.92rem] leading-[1.65] text-silver/75">{item.a}</p>
    </details>
  );
}

/* --------------------------------------------------------- 13 · final CTA */

export function FinalCtaSection({ locale, path }: Common) {
  const c = homepageCopy[locale].finalCta;
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-ink">
      <Image
        src={media.sprinting.src}
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-[50%_35%] opacity-30"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="shell-wide relative py-20 lg:py-28">
        <div className="max-w-3xl">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.9] text-white sm:text-[3.2rem] lg:text-[clamp(3rem,5vw,4.75rem)]">
            {c.title}
          </h2>
          <p className="mt-5 max-w-xl font-sans text-[1.02rem] leading-[1.65] text-silver/90 lg:text-[1.125rem]">
            {c.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={path("/start-training")} className="btn-primary">
              {c.primary}
            </Link>
            <Link href={path("/classes")} className="btn-ghost">
              {c.secondary}
            </Link>
            <Link href={path("/contact")} className="btn-ghost">
              {c.tertiary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
