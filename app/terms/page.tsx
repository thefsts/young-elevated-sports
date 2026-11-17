import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Terms",
  description:
    "Terms for using the Young & Elevated Sports Performance website. Draft terms pending legal review.",
  path: "/terms",
});

const sections = [
  {
    h: "1. Acceptance of terms",
    p: [
      "By using youngelevatedsports.com you agree to these website terms. If you do not agree, please do not use the site. These terms are a draft and are subject to legal review before they are final.",
    ],
  },
  {
    h: "2. Informational purpose",
    p: [
      "This website provides information about athletic performance training services. Content is informational and does not constitute medical advice, diagnosis, treatment, or a guarantee of any athletic result.",
      "Nothing on this site creates a coach-athlete, therapist-patient, or other professional relationship. Any training relationship begins only through a completed registration and signed agreement.",
    ],
  },
  {
    h: "3. No performance guarantees",
    p: [
      "Athletic development depends on many factors outside our control. We do not guarantee speed, strength, recruitment, scholarship, or competitive outcomes. Any examples or descriptions of training are illustrative, not promises.",
    ],
  },
  {
    h: "4. Inquiries are not agreements",
    p: [
      "Submitting an inquiry does not create a booking, enrollment, or contract. Pricing, scheduling, and scope are confirmed separately and in writing where applicable.",
    ],
  },
  {
    h: "5. Acceptable use",
    p: [
      "You agree not to misuse the site, attempt to access systems without authorization, submit false information, or interfere with the site's operation. You agree not to submit another person's sensitive information without authorization.",
    ],
  },
  {
    h: "6. Intellectual property",
    p: [
      "The Young & Elevated name, monogram, and brand assets, along with site content and design, are owned by or licensed to Young & Elevated Sports Performance and may not be used without permission.",
    ],
  },
  {
    h: "7. Third-party links and services",
    p: [
      "The site may reference third-party tools or services. We are not responsible for third-party content or practices. References to equipment or technology do not imply endorsement by those manufacturers.",
    ],
  },
  {
    h: "8. Disclaimers and limitation of liability",
    p: [
      "The site is provided on an as-is basis to the extent permitted by law. To the extent permitted by law, we disclaim liability for indirect or consequential damages arising from use of the site. Some limitations may not apply where prohibited by law.",
    ],
  },
  {
    h: "9. Governing law",
    p: [
      "These terms are intended to be governed by the laws of the State of Texas, without regard to conflict-of-law rules. Specific venue and dispute-resolution provisions require legal review.",
    ],
  },
  {
    h: "10. Changes",
    p: [
      "We may update these terms as the site and services evolve. Continued use after changes means you accept the updated terms, once those terms are finalized.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal · Terms"
        title={
          <>
            Website
            <br />
            terms.
          </>
        }
        intro="The conditions for using this website. These terms are a draft pending legal review."
      />

      <section className="py-16 lg:py-24">
        <div className="shell max-w-3xl">
          <div className="mb-10">
            <Notice tone="draft" title="DRAFT — LEGAL REVIEW REQUIRED">
              These website terms are a draft. They are not final, are not legal advice, and must be
              reviewed by qualified counsel before adoption. No enforceability is claimed.
            </Notice>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.18em] text-white/60">
            {site.legalName} · {site.contact.serviceArea}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.h}>
                <h2 className="font-display text-xl uppercase tracking-wide text-white">{section.h}</h2>
                {section.p.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-3 font-sans text-sm leading-7 text-silver">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/privacy" className="btn-ghost">
              Privacy policy
            </Link>
            <Link href="/accessibility" className="btn-ghost">
              Accessibility
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
