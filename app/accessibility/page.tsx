import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description:
    "Young & Elevated Sports Performance's accessibility commitment, conformance target (WCAG 2.2 AA), and how to report an accessibility barrier.",
  path: "/accessibility",
});

const measures = [
  {
    t: "Semantic structure",
    b: "Pages use landmark regions, a single primary heading, ordered heading levels, and descriptive link text so screen-reader navigation is predictable.",
  },
  {
    t: "Keyboard operability",
    b: "Interactive elements are reachable and operable by keyboard, with a visible focus indicator and a skip link to the main content.",
  },
  {
    t: "Color and contrast",
    b: "Text and interface colors are chosen for contrast against the dark brand background, and information is never conveyed by color alone.",
  },
  {
    t: "Motion",
    b: "Entrance animations respect the prefers-reduced-motion setting and are disabled when a visitor requests reduced motion.",
  },
  {
    t: "Forms",
    b: "Form fields have associated labels, programmatic error messages, and clear instructions. Required fields are identified in text, not only by color.",
  },
  {
    t: "Responsive and zoom",
    b: "Layouts are built mobile-first and are intended to remain usable when text is enlarged and at narrow viewport widths.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal · Accessibility"
        title={
          <>
            Access for
            <br />
            every athlete.
          </>
        }
        intro="We aim to meet WCAG 2.2 Level AA across this website. Accessibility is treated as an ongoing commitment, not a one-time checkbox."
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Conformance target"
            title="WCAG 2.2 Level AA"
            intro="This site is designed and built toward WCAG 2.2 AA and the accessibility expectations of the ADA. Conformance is a target we test against, not a claim of certification."
          />

          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {measures.map((measure) => (
              <div key={measure.t} className="bg-ink p-7">
                <p className="font-display text-lg uppercase tracking-wide text-white">{measure.t}</p>
                <p className="mt-2 font-sans text-sm leading-6 text-silver">{measure.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Notice tone="info" title="Known limitations">
              Automated checks cannot catch every barrier. Some third-party content or embedded media
              may not fully meet the target, and we address issues as they are identified. We do not
              claim perfect conformance.
            </Notice>
            <Notice tone="draft" title="Report a barrier">
              If you encounter an accessibility barrier, please tell us through the contact form and
              describe the page and the difficulty. A dedicated accessibility contact will be
              published once verified business contact details are confirmed.
            </Notice>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Report a barrier
            </Link>
            <Link href="/policies" className="btn-ghost">
              Policy index
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
