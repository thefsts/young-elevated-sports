import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { waiverDocuments } from "@/lib/content/waivers";

export const metadata: Metadata = pageMetadata({
  title: "Parent & Guardian Registration",
  description:
    "Guardian-led registration for minor athletes at Young & Elevated Sports Performance: consent, medical disclosure, emergency authorization, and required waivers.",
  path: "/registration/parent",
});

const guardianSteps = [
  {
    t: "Confirm authority",
    b: "The parent or legal guardian confirms they are authorized to enroll the athlete and consent to participation.",
  },
  {
    t: "Disclose medical needs",
    b: "Relevant injuries, surgeries, restrictions, allergies, and emergency contacts are collected through an approved secure channel.",
  },
  {
    t: "Review waivers",
    b: "Each required waiver is presented with its version and effective date, then signed and recorded with a timestamp.",
  },
  {
    t: "Give separate consents",
    b: "Participation, medical authorization, and optional photo/video consent are presented separately — never bundled.",
  },
];

export default function ParentRegistrationPage() {
  const requiredWaivers = waiverDocuments.filter((w) => w.requirement === "Required");

  return (
    <>
      <PageHero
        eyebrow="Registration · B"
        title={
          <>
            Parent &amp;
            <br />
            guardian.
          </>
        }
        intro="For athletes under 18, registration is guardian-led. Consent, medical disclosure, and waivers are handled with the care a minor's information requires."
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Guardian-led process"
            title="What guardians complete"
            intro="This pathway is built but not yet accepting submissions. It opens only when secure storage, consent records, and legal review are approved."
          />
          <ol className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {guardianSteps.map((step, index) => (
              <li key={step.t} className="bg-ink p-7">
                <span className="font-display text-3xl leading-none text-gold-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">{step.t}</p>
                <p className="mt-2 font-sans text-sm leading-6 text-silver">{step.b}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_20rem]">
            <div>
              <SectionHeading
                index="02"
                eyebrow="Required documents"
                title="Waivers presented to guardians"
                intro="Every required waiver is shown with its document ID, version, and status. All are currently drafts pending legal review."
              />
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {requiredWaivers.map((waiver) => (
                  <li key={waiver.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div>
                      <p className="font-sans text-sm text-white">
                        <span className="mr-3 font-display text-gold">{waiver.id}</span>
                        {waiver.title}
                      </p>
                      <p className="mt-1 font-sans text-xs text-white/40">
                        v{waiver.version} · {waiver.status}
                      </p>
                    </div>
                    <Link
                      href={`/waivers/${waiver.slug}`}
                      className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold hover:text-gold-bright"
                    >
                      View draft &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-6">
              <Notice tone="locked" title="Not accepting submissions">
                Guardian registration and e-signature are disabled until the secure submission
                pipeline, signature audit trail, and legal review are complete.
              </Notice>
              <Notice tone="draft" title="Draft documents">
                All waivers are marked DRAFT — LEGAL REVIEW REQUIRED. Nothing here is binding and no
                enforceability is claimed.
              </Notice>
              <Link href="/waivers" className="btn-ghost w-full justify-center">
                View all waiver documents
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
