import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function GoldRule({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`gold-rule block ${className}`} />;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {(index || eyebrow) && (
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
          {index ? (
            <span className="font-sans text-[0.68rem] font-semibold tracking-[0.3em] text-white/60">
              {index}
            </span>
          ) : null}
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        </div>
      )}
      <Tag className="display-lg mt-5 text-white">{title}</Tag>
      {intro ? <div className="lede mt-6">{intro}</div> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  actions,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink pt-[4.5rem] lg:pt-20">
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            fetchPriority="high"
          />
          {/* Left-weighted scrim keeps headline contrast; the right side is left
              open so the photograph is actually visible. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/50 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/25" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,167,59,0.12),transparent_60%)]" />
      )}

      <div className="shell relative py-20 lg:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display-xl mt-6 max-w-5xl text-white">{title}</h1>
        {intro ? <div className="lede mt-7 max-w-2xl">{intro}</div> : null}
        {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
        {meta ? <div className="mt-12">{meta}</div> : null}
      </div>
    </section>
  );
}

export function ArrowLink({
  href,
  children,
  className = "text-gold hover:text-gold-bright",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function Notice({
  tone = "draft",
  title,
  children,
}: {
  tone?: "draft" | "info" | "locked";
  title: string;
  children: ReactNode;
}) {
  const styles = {
    draft: "border-gold/40 bg-gold/[0.06]",
    info: "border-white/15 bg-white/[0.03]",
    locked: "border-white/20 bg-graphite",
  }[tone];

  return (
    <div className={`border-l-2 ${styles} px-5 py-4`}>
      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
        {title}
      </p>
      <div className="mt-2 font-sans text-sm leading-6 text-silver">{children}</div>
    </div>
  );
}

export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-ink px-5 py-7">
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="block font-display text-3xl leading-none text-gold-bright">{item.value}</span>
            <span className="mt-2 block font-sans text-[0.66rem] uppercase leading-4 tracking-[0.18em] text-white/65">
              {item.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-white/15 bg-white/[0.015] px-6 py-14 text-center">
      <p className="font-display text-xl uppercase tracking-wide text-white/80">{title}</p>
      <div className="mx-auto mt-3 max-w-xl font-sans text-sm leading-6 text-silver">{children}</div>
      {action ? <div className="mt-7 flex justify-center">{action}</div> : null}
    </div>
  );
}
