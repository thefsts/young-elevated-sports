export type WaiverStatus = "DRAFT — LEGAL REVIEW REQUIRED" | "APPROVED";

export type WaiverSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type WaiverDocument = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  version: string;
  effectiveDate: string | null;
  status: WaiverStatus;
  signer: string;
  requirement: "Required" | "Optional" | "Conditional";
  purpose: string;
  sections: WaiverSection[];
  /** Items counsel must confirm before this template can be published as binding. */
  reviewNotes: string[];
};

const DRAFT = "DRAFT — LEGAL REVIEW REQUIRED" as const;

export const waiverDocuments: WaiverDocument[] = [
  {
    id: "W01",
    slug: "athletic-participation-assumption-of-risk",
    title: "Athletic Participation & Assumption of Risk",
    shortTitle: "Participation & Assumption of Risk",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) and/or parent/legal guardian for a minor",
    requirement: "Required",
    purpose:
      "Describe the physical demands of sports-performance training and record that the participant understands and accepts the foreseeable risks of voluntary participation.",
    sections: [
      {
        heading: "1. Nature of the activity",
        body: [
          "Young & Elevated Sports Performance provides athletic development coaching. Sessions may include sprinting, jumping, change-of-direction work, resistance training, conditioning, and sport-specific movement.",
          "Participation is voluntary. Training is not a medical service, physical therapy, or rehabilitation program, and it is not a substitute for evaluation or treatment by a licensed healthcare provider.",
        ],
      },
      {
        heading: "2. Foreseeable risks",
        body: [
          "Athletic training involves inherent risks that cannot be eliminated by supervision or equipment. Participants should understand that the following may occur:",
        ],
        bullets: [
          "Muscle soreness, strains, sprains, and overuse irritation",
          "Falls, collisions, and contact with equipment or the training surface",
          "Heat-related stress and fatigue",
          "More serious injury, including joint, bone, or head injury",
        ],
      },
      {
        heading: "3. Participant acknowledgment",
        body: [
          "The participant acknowledges that they have been informed of the nature of the activities and the risks described above, that they are participating voluntarily, and that they may stop or ask questions at any time.",
          "The participant agrees to disclose relevant medical conditions, injuries, and restrictions to coaching staff before participation and to follow any stated restrictions.",
        ],
      },
      {
        heading: "4. Limitations",
        body: [
          "This document does not waive rights that cannot lawfully be waived, and it does not release any party from liability for gross negligence, willful misconduct, or any other liability that applicable law does not permit to be released.",
          "Nothing in this document is intended to be a substitute for insurance. The scope and enforceability of any release must be determined by qualified Texas counsel.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm compliance with Texas liability-waiver requirements, including conspicuousness and clarity of any release language.",
      "Confirm treatment of minors and the limits of a parent/guardian signature.",
      "Confirm whether a separate acknowledgment is required for each program format.",
    ],
  },
  {
    id: "W02",
    slug: "parent-guardian-consent",
    title: "Parent / Legal Guardian Consent",
    shortTitle: "Parent / Guardian Consent",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Parent or legal guardian",
    requirement: "Required",
    purpose:
      "Document that a parent or legal guardian has authority to consent to a minor's participation and has reviewed the participation, medical, and media documents.",
    sections: [
      {
        heading: "1. Guardian authority",
        body: [
          "The signer represents that they are the parent or legal guardian of the named minor athlete and have the legal authority to consent to the athlete's participation in training.",
          "If legal authority is shared or restricted, the signer is responsible for ensuring that consent is consistent with any applicable custody or guardianship order.",
        ],
      },
      {
        heading: "2. Consent to participate",
        body: [
          "The guardian consents to the minor's participation in athletic development activities and acknowledges receipt of the participation and assumption-of-risk document.",
          "The guardian confirms that the athlete is physically able to participate in athletic activity, subject to any restrictions disclosed in the medical disclosure document.",
        ],
      },
      {
        heading: "3. Emergency contact and communication",
        body: [
          "The guardian agrees to keep emergency contact information current and to respond to communications from coaching staff regarding the athlete's participation.",
        ],
      },
      {
        heading: "4. Separate optional consents",
        body: [
          "Consent to participate is separate from optional consent for photography, video, or promotional use. A decision about media consent does not affect the athlete's ability to participate.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm guardian verification method appropriate for a digital workflow.",
      "Confirm handling of shared-custody situations.",
      "Confirm whether a separate acknowledgment is required for each minor athlete in a household.",
    ],
  },
  {
    id: "W03",
    slug: "medical-disclosure-emergency-authorization",
    title: "Medical Disclosure & Emergency Authorization",
    shortTitle: "Medical Disclosure & Emergency Authorization",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) or parent/legal guardian",
    requirement: "Required",
    purpose:
      "Collect the minimum health information needed to train an athlete safely and to authorize emergency response when a guardian cannot be reached.",
    sections: [
      {
        heading: "1. Disclosure",
        body: [
          "The participant or guardian discloses known medical conditions, allergies, current or prior injuries, surgeries, and any activity restrictions relevant to training.",
          "Disclosure is limited to information reasonably necessary for safe participation. Medical information is treated as sensitive and is not used for marketing.",
        ],
      },
      {
        heading: "2. Emergency authorization",
        body: [
          "In an emergency, staff may call emergency services and take reasonable steps to obtain care for the participant. Staff may share disclosed medical information with emergency responders to the extent necessary.",
          "The guardian is responsible for any costs associated with emergency care, subject to applicable insurance coverage.",
        ],
      },
      {
        heading: "3. Medical clearance",
        body: [
          "Where an athlete is returning from injury, surgery, or a concussion, coaching staff may require written clearance from a qualified healthcare provider before allowing participation. The website does not issue medical clearance.",
        ],
      },
      {
        heading: "4. Data handling",
        body: [
          "Medical disclosures are stored only in an approved secure system once one is authorized. They are not sent through ordinary notification email and are not stored in browser local storage.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm whether any collected health information triggers additional obligations under Texas or federal law.",
      "Confirm retention period and deletion procedure for medical disclosures.",
      "Confirm emergency authorization language with counsel.",
    ],
  },
  {
    id: "W04",
    slug: "cancellation-rescheduling",
    title: "Cancellation & Rescheduling Agreement",
    shortTitle: "Cancellation & Rescheduling",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Client (athlete 18+ or parent/guardian)",
    requirement: "Required",
    purpose:
      "Set expectations for notice periods, late cancellations, no-shows, weather closures, illness, and schedule changes.",
    sections: [
      {
        heading: "1. Notice periods",
        body: [
          "Notice periods for cancellation or rescheduling are not yet finalized. Placeholder terms must not be published as binding until approved.",
        ],
      },
      {
        heading: "2. Late cancellations and no-shows",
        body: [
          "Treatment of late cancellations and no-shows, including whether a session is forfeited or charged, will be defined in the approved final version of this agreement.",
        ],
      },
      {
        heading: "3. Weather and facility closures",
        body: [
          "Sessions affected by weather, facility closure, or circumstances outside the control of either party will be handled according to the approved final policy.",
        ],
      },
      {
        heading: "4. Illness",
        body: [
          "Athletes should not attend training while ill. The approved final policy will define how missed sessions due to illness are handled.",
        ],
      },
    ],
    reviewNotes: [
      "Client must supply final notice periods and fee treatment.",
      "Confirm consumer-protection disclosure requirements for prepaid sessions in Texas.",
      "Confirm how weather and facility closures are credited.",
    ],
  },
  {
    id: "W05",
    slug: "refund-policy-acknowledgment",
    title: "Refund Policy Acknowledgment",
    shortTitle: "Refund Policy",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Client (athlete 18+ or parent/guardian)",
    requirement: "Required",
    purpose:
      "Disclose refund eligibility, treatment of unused sessions, package expiration, credits, and cancellations.",
    sections: [
      {
        heading: "1. Refund eligibility",
        body: [
          "Refund eligibility has not been finalized. No refund terms are published as binding in this draft.",
        ],
      },
      {
        heading: "2. Unused sessions and expiration",
        body: [
          "Treatment of unused sessions and any package expiration window will be defined in the approved final version.",
        ],
      },
      {
        heading: "3. Credits",
        body: [
          "Whether and how credits are issued will be defined in the approved final version.",
        ],
      },
      {
        heading: "4. Consumer protections",
        body: [
          "Final terms must be reviewed against applicable Texas consumer-protection requirements before publication.",
        ],
      },
    ],
    reviewNotes: [
      "Client must supply final refund, expiration, and credit terms.",
      "Confirm Texas consumer-protection disclosures for prepaid services.",
      "Confirm how refund terms are presented at point of sale.",
    ],
  },
  {
    id: "W06",
    slug: "insurance-disclosure-responsibility",
    title: "Insurance Disclosure & Responsibility",
    shortTitle: "Insurance Disclosure",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Client (athlete 18+ or parent/guardian)",
    requirement: "Required",
    purpose:
      "Record participant insurance status and clarify responsibility for emergency expenses and coverage limitations.",
    sections: [
      {
        heading: "1. Participant insurance",
        body: [
          "Participants are asked to disclose whether they carry medical insurance. Providing policy details is optional unless required by the approved final policy.",
        ],
      },
      {
        heading: "2. Emergency expenses",
        body: [
          "The participant or guardian is responsible for expenses associated with emergency or medical care, subject to their own coverage.",
        ],
      },
      {
        heading: "3. Business coverage",
        body: [
          "No statement is made in this draft about the insurance coverage maintained by Young & Elevated Sports Performance. Any such statement requires verification of active coverage.",
          "A signed participant form does not replace commercial general liability or professional liability coverage, and it does not itself provide insurance to any party.",
        ],
      },
    ],
    reviewNotes: [
      "Verify whether YESP holds active general liability and/or professional liability coverage before any coverage statement is published.",
      "Confirm required insurance disclosures for school and team contracts.",
      "Confirm whether certificates of insurance must be provided to partner schools.",
    ],
  },
  {
    id: "W07",
    slug: "photo-video-media-release",
    title: "Photo / Video Media Release",
    shortTitle: "Photo / Video Release",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) or parent/legal guardian",
    requirement: "Optional",
    purpose:
      "Obtain separate, optional permission for photography, video, website publication, and promotional use — with a clear refusal option.",
    sections: [
      {
        heading: "1. Optional permission",
        body: [
          "Permission for photography and video is optional. Declining does not affect registration, scheduling, or the quality of coaching an athlete receives.",
        ],
      },
      {
        heading: "2. Scope of use",
        body: [
          "If permission is granted, images and video may be used for website content, social media, and promotional materials describing training activities.",
          "Permission does not extend to endorsements, paid advertising featuring the athlete, or commercial name, image, and likeness agreements. Those require a separate agreement.",
        ],
      },
      {
        heading: "3. Refusal and withdrawal",
        body: [
          "The signer may decline permission or withdraw permission for future use by contacting Young & Elevated Sports Performance. Withdrawal does not require removal of materials already printed or published where removal is not reasonably practicable, subject to applicable law.",
        ],
      },
      {
        heading: "4. No compensation",
        body: [
          "No payment is provided for optional media participation unless a separate written agreement states otherwise.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm minor consent and withdrawal mechanics.",
      "Confirm whether school or team media policies override this release.",
      "Confirm interaction with Texas NIL rules for UIL-eligible athletes.",
    ],
  },
  {
    id: "W08",
    slug: "nil-name-image-likeness",
    title: "Name, Image & Likeness (NIL) Information & Consent",
    shortTitle: "NIL Information & Consent",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) or parent/legal guardian, where eligible",
    requirement: "Conditional",
    purpose:
      "Provide age-appropriate information about name, image, and likeness and record consent only where legally and athletically eligible.",
    sections: [
      {
        heading: "1. Separate from media release",
        body: [
          "A promotional photo or video release is not an NIL commercial agreement. This document addresses NIL separately and does not authorize paid commercial use on its own.",
        ],
      },
      {
        heading: "2. Eligibility",
        body: [
          "NIL eligibility depends on the athlete's age, amateur status, and governing-body rules. For Texas UIL-eligible high-school athletes, paid NIL activity may affect eligibility and requires appropriate legal and eligibility review before any agreement is offered.",
        ],
      },
      {
        heading: "3. No current NIL offers",
        body: [
          "Young & Elevated Sports Performance does not currently offer paid NIL agreements through this website. This template exists to prepare an approved process for the future.",
        ],
      },
      {
        heading: "4. Guardian involvement",
        body: [
          "Any NIL agreement involving a minor requires parent or legal guardian involvement and separate written terms reviewed by counsel.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm current Texas NIL statute and UIL eligibility rules before enabling any NIL workflow.",
      "Confirm whether NIL consent should be disabled entirely for high-school athletes.",
      "Confirm separate compensation and disclosure requirements.",
    ],
  },
  {
    id: "W09",
    slug: "code-of-conduct-athlete-safety",
    title: "Code of Conduct & Athlete Safety",
    shortTitle: "Code of Conduct & Safety",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete and parent/legal guardian",
    requirement: "Required",
    purpose:
      "Set behavior expectations, supervision standards, prohibited harassment, safeguarding practices, reporting channels, and disciplinary procedures.",
    sections: [
      {
        heading: "1. Expectations",
        body: [
          "Athletes are expected to arrive prepared, follow instructions, treat staff and peers with respect, and take reasonable care for their own safety and the safety of others.",
        ],
      },
      {
        heading: "2. Prohibited conduct",
        body: [
          "Harassment, bullying, hazing, discrimination, and any form of physical or sexual misconduct are prohibited. Concerns may be reported to coaching staff or through the contact channel on this website.",
        ],
      },
      {
        heading: "3. Supervision and safeguarding",
        body: [
          "Training is supervised by coaching staff. Where a minor athlete is dropped off, the guardian is responsible for confirming pickup arrangements. Staff will not release a minor to an unauthorized person.",
        ],
      },
      {
        heading: "4. Discipline",
        body: [
          "Responses to conduct concerns may include a conversation, a written warning, removal from a session, or suspension from the program, depending on severity. Serious concerns may be referred to appropriate authorities.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm mandatory reporting obligations for staff in Texas.",
      "Confirm background-check policy for staff and contractors.",
      "Confirm safeguarding language with counsel.",
    ],
  },
  {
    id: "W10",
    slug: "concussion-return-to-training",
    title: "Concussion / Return-to-Training Acknowledgment",
    shortTitle: "Concussion Acknowledgment",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) or parent/legal guardian",
    requirement: "Required",
    purpose:
      "Describe concussion signs, reporting expectations, stop-participation procedures, and the requirement for appropriate medical clearance.",
    sections: [
      {
        heading: "1. Signs to report",
        body: [
          "Athletes and guardians should report headache, dizziness, nausea, confusion, sensitivity to light or noise, unusual fatigue, or any blow to the head or body that causes symptoms.",
        ],
      },
      {
        heading: "2. Stop participation",
        body: [
          "An athlete with suspected concussion will be removed from participation for the remainder of the session. Removal is not a diagnosis and is not a penalty.",
        ],
      },
      {
        heading: "3. Medical clearance",
        body: [
          "Return to training after a suspected or diagnosed concussion requires written clearance from a qualified healthcare provider. Coaching staff do not diagnose concussions and this website does not issue medical clearance.",
        ],
      },
      {
        heading: "4. Acknowledgment",
        body: [
          "The participant and guardian acknowledge that symptoms must be reported honestly and that withholding information may increase risk.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm alignment with Texas youth-sports concussion requirements, including any required training or removal-from-play language.",
      "Confirm return-to-play protocol with counsel and a qualified medical advisor.",
    ],
  },
  {
    id: "W11",
    slug: "school-team-services-agreement",
    title: "School / Team Services Agreement",
    shortTitle: "School / Team Services",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Authorized school or organization representative",
    requirement: "Conditional",
    purpose:
      "Define scope of services, authorized signatory, scheduling, supervision, insurance allocation, cancellation, and school-specific requirements.",
    sections: [
      {
        heading: "1. Scope of services",
        body: [
          "Services, session counts, locations, and deliverables are defined in a written scope attached to the executed agreement. No scope is created by this website template.",
        ],
      },
      {
        heading: "2. Authorized representative",
        body: [
          "The signer represents that they are authorized to bind the school or organization. Verification of authority may be requested.",
        ],
      },
      {
        heading: "3. Supervision and facilities",
        body: [
          "Supervision responsibilities, facility access, equipment use, and emergency procedures are allocated in the executed agreement and must comply with school district policy.",
        ],
      },
      {
        heading: "4. Insurance and risk allocation",
        body: [
          "Insurance requirements, additional-insured status, and indemnification terms must be negotiated and verified before services begin. No coverage is represented by this draft.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm school district contracting, procurement, and background-check requirements.",
      "Confirm insurance limits and certificate requirements.",
      "Confirm student-data handling obligations for any school-provided information.",
    ],
  },
  {
    id: "W12",
    slug: "privacy-data-consent",
    title: "Privacy & Data Consent",
    shortTitle: "Privacy & Data Consent",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) or parent/legal guardian",
    requirement: "Required",
    purpose:
      "Explain data categories, purposes, service providers, retention, rights requests, guardian controls, and contact information.",
    sections: [
      {
        heading: "1. Data categories",
        body: [
          "The registration experience collects identity and contact details, sport and school information, training objectives, and health information needed for safe participation.",
        ],
      },
      {
        heading: "2. Purpose and minimization",
        body: [
          "Information is used to deliver training, respond to inquiries, meet safety obligations, and maintain required records. Only information reasonably necessary for those purposes is requested.",
        ],
      },
      {
        heading: "3. Service providers",
        body: [
          "Approved service providers will be listed here once selected. No sensitive registration data is transmitted to a CRM or marketing platform in this batch.",
        ],
      },
      {
        heading: "4. Retention and rights",
        body: [
          "Retention periods and the process for access, correction, and deletion requests are pending approval and will be published before sensitive submissions are enabled.",
        ],
      },
      {
        heading: "5. Guardian controls",
        body: [
          "For athletes under 18, the parent or legal guardian manages consent and may request access, correction, or deletion on the athlete's behalf.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm Texas Data Privacy and Security Act applicability and required disclosures.",
      "Confirm COPPA approach for any user under 13.",
      "Confirm retention schedule and deletion workflow.",
    ],
  },
  {
    id: "W13",
    slug: "electronic-signature-records-consent",
    title: "Electronic Signature & Records Consent",
    shortTitle: "Electronic Signature Consent",
    version: "0.1",
    effectiveDate: null,
    status: DRAFT,
    signer: "Athlete (18+) or parent/legal guardian",
    requirement: "Required",
    purpose:
      "Obtain consent to electronic records and signatures, describe signature attribution, and provide access to signed copies.",
    sections: [
      {
        heading: "1. Consent to electronic records",
        body: [
          "The signer agrees to receive and sign documents electronically and confirms that they can access and retain a copy.",
        ],
      },
      {
        heading: "2. Signature attribution",
        body: [
          "An electronic signature is attributed to the signer through the identity and contact information provided, together with a recorded timestamp and document version.",
        ],
      },
      {
        heading: "3. Copies",
        body: [
          "A copy of each signed document will be made available to the signer through the approved record-delivery process once implemented.",
        ],
      },
      {
        heading: "4. Withdrawal",
        body: [
          "The signer may request a paper process or withdraw consent to electronic records, subject to the approved final procedure.",
        ],
      },
    ],
    reviewNotes: [
      "Confirm compliance with the Texas Uniform Electronic Transactions Act and the federal ESIGN Act.",
      "Confirm signature audit-record requirements.",
      "Confirm document-version retention and delivery method.",
    ],
  },
];

export const getWaiver = (slug: string) => waiverDocuments.find((d) => d.slug === slug);

export const waiverStatusLabel = DRAFT;
