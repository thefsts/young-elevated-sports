import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Young & Elevated Sports Performance handles personal information, including information about minors, in line with Texas and federal privacy requirements.",
  path: "/privacy",
});

const sections = [
  {
    h: "1. Scope of this policy",
    p: [
      "This policy explains how Young & Elevated Sports Performance collects, uses, shares, and protects personal information through youngelevatedsports.com and through program participation. It is a draft prepared for legal review and does not yet represent a finalized or legally adopted policy.",
      "Where this site serves athletes who are minors, additional protections apply and are described in section 6.",
    ],
  },
  {
    h: "2. Information we collect",
    p: [
      "Through public inquiry forms, we collect the information you choose to provide: name, email address, phone number, organization or role, and the content of your message. We do not ask for medical or health information through public forms.",
      "Through athlete registration (not yet open), we intend to collect athlete identity and sport information, guardian contact details, emergency contact details, training objectives, and medical disclosure needed to train safely. That collection is not active.",
      "We may collect limited technical information necessary to operate the site securely, such as request metadata used for rate limiting and abuse prevention.",
    ],
  },
  {
    h: "3. How we use information",
    p: [
      "We use inquiry information to respond to your message and to discuss training or partnership options. We use registration information, once collection is approved, to enroll athletes, train safely, communicate with guardians, and meet legal and safety obligations.",
      "We do not sell personal information. We do not use information about minors for targeted advertising, and we do not place advertising trackers on pages intended for minors.",
    ],
  },
  {
    h: "4. Legal bases and Texas privacy law",
    p: [
      "Where the Texas Data Privacy and Security Act (TDPSA) applies, we process personal data to respond to requests, perform services, and meet legal obligations. Certain TDPSA obligations depend on thresholds and business classification that require legal determination; this policy does not assert a definitive classification.",
      "Texas law also imposes specific protections for children's data, including requirements related to the SCOPE Act for covered platforms. Whether those provisions apply to this site requires legal review and is tracked in the compliance matrix.",
    ],
  },
  {
    h: "5. Sharing and service providers",
    p: [
      "We may share information with service providers that help us operate, such as email delivery and hosting. Those providers are expected to process information only as needed to provide their service.",
      "We may disclose information where required by law, to protect safety, or in connection with a legal proceeding. We do not share medical information with marketing or analytics tools.",
    ],
  },
  {
    h: "6. Minors and guardian consent",
    p: [
      "The site is intended for athletes and their families, and many athletes are under 18. Registration for a minor is guardian-led: a parent or legal guardian provides consent and completes required documents.",
      "We do not knowingly collect personal information from a child under 13 through a public form before the applicable children's privacy requirements are addressed. Registration that would involve an athlete under 13 remains disabled until that review is complete.",
      "Medical and health information is kept out of analytics, URLs, logs, and marketing email. It is intended to be collected only through an approved secure channel with guardian consent.",
    ],
  },
  {
    h: "7. Retention and deletion",
    p: [
      "We retain inquiry information only as long as needed to respond and maintain a record of the conversation. Registration and waiver records would be retained according to a documented schedule that accounts for legal, insurance, and safety requirements.",
      "You may request access to, correction of, or deletion of your information by contacting us through the inquiry form once a verified contact channel is published.",
    ],
  },
  {
    h: "8. Security",
    p: [
      "We apply technical and organizational measures appropriate to the sensitivity of the information, including encrypted transport, access controls, and separation of sensitive data from public systems. No system is perfectly secure, and we do not claim otherwise.",
      "Sensitive registration and waiver submission remain disabled until an approved secure storage and records process is in place.",
    ],
  },
  {
    h: "9. Your choices",
    p: [
      "You can choose not to submit an inquiry. Where consent is requested, it is separated into required and optional purposes, so optional consent such as photo or video use is never bundled with participation.",
      "You may withdraw optional consent at any time by contacting us, subject to legal and safety recordkeeping obligations.",
    ],
  },
  {
    h: "10. Changes and contact",
    p: [
      "We will update this policy as the program and its data practices develop, and we will date material changes. Because a verified business contact channel is not yet published, contact is currently handled through the inquiry form.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal · Privacy"
        title={
          <>
            Privacy
            <br />
            policy.
          </>
        }
        intro="How we handle personal information, with particular care for information about minors. This is a draft pending legal review."
      />

      <section className="py-16 lg:py-24">
        <div className="shell max-w-3xl">
          <div className="mb-10 space-y-4">
            <Notice tone="draft" title="DRAFT — LEGAL REVIEW REQUIRED">
              This privacy policy is a draft. It does not yet constitute a final or legally adopted
              policy, and it makes no claim of compliance certification. Texas and federal
              applicability is tracked in the compliance matrix and requires legal determination.
            </Notice>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.18em] text-white/40">
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
            <Link href="/terms" className="btn-ghost">
              Website terms
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
