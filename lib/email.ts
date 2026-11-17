import { Resend } from "resend";
import type { ClassInterestInput, InquiryInput, SchoolInquiryInput } from "@/lib/validation";

/**
 * Email delivery for approved Class A public inquiries.
 *
 * Environment variables (see .env.example):
 *   RESEND_API_KEY      - required to actually send
 *   INQUIRY_FROM_EMAIL  - verified sender address on the Resend domain
 *   INQUIRY_TO_EMAIL    - internal inbox that receives notifications
 *
 * No sender address is invented. If the configuration is absent, the route
 * returns a controlled error rather than pretending to send.
 *
 * Scope guard: this module is only ever handed Class A inquiry payloads —
 * contact details and non-sensitive training preferences. It must never be
 * used for medical histories, minor athlete intake records, signed waivers or
 * payment data. Those flows stay disabled until a secure backend is approved.
 */

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.INQUIRY_FROM_EMAIL;
const toEmail = process.env.INQUIRY_TO_EMAIL;

/** Display name shown in the recipient's mail client. */
const FROM_NAME = "Young & Elevated Sports Performance";

export function emailConfigured(): boolean {
  return Boolean(apiKey && fromEmail && toEmail);
}

/**
 * RFC 5322 sender header: `Display Name <address>`.
 *
 * The address itself stays in the environment so the sending identity can be
 * changed without a code edit; only the display name is fixed, because it is
 * part of the approved brand.
 */
function fromHeader(): string {
  return `${FROM_NAME} <${fromEmail}>`;
}

/**
 * Reply-To for automated acknowledgments.
 *
 * The sender address is a *sending* identity and is not assumed to have a
 * receiving mailbox. Routing replies to the monitored internal inbox means a
 * visitor who hits "reply" reaches a human instead of a black hole.
 */
function replyToInbox(): string | undefined {
  return toEmail || undefined;
}

/**
 * Human-readable submission time in the business's own timezone, with the UTC
 * instant alongside it so the record is unambiguous.
 */
function submittedAt(date = new Date()): string {
  const central = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
  const utc = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return `${central} (Central) — ${utc} UTC`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;")
    .replace(/'/g, "\u0026#39;");
}

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#080808;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#D6A73B;margin:0 0 8px;">
        Young \u0026amp; Elevated Sports Performance
      </p>
      <h1 style="font-size:22px;line-height:1.25;margin:0 0 20px;color:#ffffff;">${escapeHtml(title)}</h1>
      <div style="font-size:14px;line-height:1.7;color:#C5C8CE;">${body}</div>
      <hr style="border:none;border-top:1px solid #232323;margin:28px 0;" />
      <p style="font-size:11px;line-height:1.6;color:#6b6f77;margin:0;">
        This is an automated message. Do not reply with medical, injury, or health information.
        Young \u0026amp; Elevated Sports Performance \u0026middot; Dallas\u0026ndash; Fort Worth, Texas.
      </p>
    </div>
  </body>
</html>`;
}

const TYPE_LABEL: Record<string, string> = {
  contact: "General contact",
  training: "Training inquiry",
  school: "School / team inquiry",
  partner: "Coach / partner inquiry",
};

/** One `[label, value]` row, rendered to HTML and to plain text. */
type Row = [string, string | undefined];

function htmlTable(rows: Row[]): string {
  return `<table style="border-collapse:collapse;font-size:14px;">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8b8f97;white-space:nowrap;vertical-align:top;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#ffffff;">${escapeHtml(String(value ?? "—"))}</td></tr>`,
    )
    .join("")}</table>`;
}

function htmlParagraph(label: string, value: string): string {
  return `<p style="margin:18px 0 6px;color:#8b8f97;">${escapeHtml(label)}</p>
       <p style="margin:0;color:#ffffff;">${escapeHtml(value || "—").replace(/\n/g, "<br />")}</p>`;
}

/**
 * Plain-text alternative.
 *
 * Every message ships a text part as well as HTML: it is the fallback for
 * clients that block HTML, and it is materially better for accessibility.
 */
function plainText(title: string, rows: Row[], sections: Row[] = []): string {
  const lines = [
    "YOUNG & ELEVATED SPORTS PERFORMANCE",
    "",
    title,
    "",
    ...rows.map(([label, value]) => `${label}: ${value ?? "—"}`),
  ];
  for (const [label, value] of sections) {
    lines.push("", `${label}:`, value || "—");
  }
  lines.push(
    "",
    "---",
    "This is an automated message. Do not reply with medical, injury, or health information.",
    "Young & Elevated Sports Performance · Dallas–Fort Worth, Texas.",
  );
  return lines.join("\n");
}

/* ------------------------------------------------------------- general inquiry */

function inquiryRows(input: InquiryInput, when: string): Row[] {
  return [
    ["Inquiry category", TYPE_LABEL[input.type] ?? input.type],
    ["Submitted", when],
    ["Name", `${input.firstName} ${input.lastName}`],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Organization", input.organization || "—"],
    ["Role", input.role || "—"],
    ["Athlete name", input.athleteName || "—"],
    ["Athlete age", input.athleteAge || "—"],
    ["Sport", input.sport || "—"],
    ["Interest", input.interest || "—"],
    ["Group size", input.groupSize || "—"],
    ["Preferred dates", input.preferredDates || "—"],
  ];
}

export async function sendInquiryEmails(input: InquiryInput) {
  if (!emailConfigured()) {
    throw new Error("Email is not configured.");
  }
  const resend = new Resend(apiKey);
  const when = submittedAt();
  const rows = inquiryRows(input, when);
  const category = TYPE_LABEL[input.type] ?? input.type;

  // Internal notification
  const internal = await resend.emails.send({
    from: fromHeader(),
    to: toEmail!,
    replyTo: input.email,
    subject: `[YESP] ${category} — ${input.firstName} ${input.lastName}`,
    html: shell(
      "New inquiry received",
      `${htmlTable(rows)}${htmlParagraph("Message", input.message)}`,
    ),
    text: plainText("New inquiry received", rows, [["Message", input.message]]),
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  // Acknowledgment to the sender. Replies route to the monitored inbox.
  const ack = await resend.emails.send({
    from: fromHeader(),
    to: input.email,
    replyTo: replyToInbox(),
    subject: "We received your message — Young & Elevated Sports Performance",
    html: shell(
      "Your message is in.",
      `<p style="margin:0 0 12px;">Hi ${escapeHtml(input.firstName)},</p>
       <p style="margin:0 0 12px;">Thank you for reaching out to Young \u0026amp; Elevated Sports Performance.
       This is an automated acknowledgment &mdash; it is not a confirmed training booking or enrollment.</p>
       <p style="margin:0 0 12px;">A member of the team will follow up using the contact details you provided.
       If you need to add information, reply to this email.</p>
       <p style="margin:0;">For your privacy, please do not send medical, injury, or health details by email.</p>`,
    ),
    text: [
      `Hi ${input.firstName},`,
      "",
      "Thank you for reaching out to Young & Elevated Sports Performance. This is an automated",
      "acknowledgment — it is not a confirmed training booking or enrollment.",
      "",
      "A member of the team will follow up using the contact details you provided. If you need to",
      "add information, reply to this email.",
      "",
      "For your privacy, please do not send medical, injury, or health details by email.",
      "",
      "---",
      "Young & Elevated Sports Performance · Dallas–Fort Worth, Texas.",
    ].join("\n"),
  });

  // A failed acknowledgment should not lose the inquiry; log and continue.
  if (ack.error) {
    console.error("Inquiry acknowledgment failed:", ack.error.message);
  }

  return { internalId: internal.data?.id ?? null };
}

/* --------------------------------------------------------------- school inquiry */

export async function sendSchoolInquiryEmails(input: SchoolInquiryInput) {
  if (!emailConfigured()) {
    throw new Error("Email is not configured.");
  }
  const resend = new Resend(apiKey);
  const when = submittedAt();

  const rows: Row[] = [
    ["Inquiry category", "School / team inquiry"],
    ["Submitted", when],
    ["Contact", `${input.representativeFirstName} ${input.representativeLastName}`],
    ["Role", input.role],
    ["Organization", input.organization],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Services", input.services],
    ["Group size", input.groupSize],
    ["Proposed dates", input.proposedDates || "—"],
  ];

  const internal = await resend.emails.send({
    from: fromHeader(),
    to: toEmail!,
    replyTo: input.email,
    subject: `[YESP] School/team inquiry — ${input.organization}`,
    html: shell(
      "New school / team inquiry",
      `${htmlTable(rows)}${htmlParagraph("Message", input.message)}`,
    ),
    text: plainText("New school / team inquiry", rows, [["Message", input.message]]),
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  const ack = await resend.emails.send({
    from: fromHeader(),
    to: input.email,
    replyTo: replyToInbox(),
    subject: "We received your school / team inquiry — Young & Elevated Sports Performance",
    html: shell(
      "Your inquiry is in.",
      `<p style="margin:0 0 12px;">Hi ${escapeHtml(input.representativeFirstName)},</p>
       <p style="margin:0 0 12px;">Thank you for contacting Young \u0026amp; Elevated Sports Performance on behalf of
       ${escapeHtml(input.organization)}. This is an automated acknowledgment &mdash; it is not a confirmed
       services agreement or booking.</p>
       <p style="margin:0;">A member of the team will follow up to discuss scope, scheduling, and any required
       school or district agreements.</p>`,
    ),
    text: [
      `Hi ${input.representativeFirstName},`,
      "",
      `Thank you for contacting Young & Elevated Sports Performance on behalf of ${input.organization}.`,
      "This is an automated acknowledgment — it is not a confirmed services agreement or booking.",
      "",
      "A member of the team will follow up to discuss scope, scheduling, and any required school or",
      "district agreements.",
      "",
      "---",
      "Young & Elevated Sports Performance · Dallas–Fort Worth, Texas.",
    ].join("\n"),
  });

  if (ack.error) {
    console.error("School inquiry acknowledgment failed:", ack.error.message);
  }

  return { internalId: internal.data?.id ?? null };
}

/* -------------------------------------------------------------- class interest */

/**
 * Class-interest request delivery.
 *
 * This is a Class A inquiry flow: it carries only contact details and
 * non-sensitive training preferences. It never carries medical history,
 * signatures, payment data, or government identifiers, and it explicitly tells
 * the recipient that the request is not a confirmed booking.
 */
export async function sendClassInterestEmail(input: ClassInterestInput) {
  if (!emailConfigured()) {
    throw new Error("Email is not configured.");
  }
  const resend = new Resend(apiKey);
  const contactName = `${input.contactFirstName} ${input.contactLastName}`.trim();
  const athleteName = `${input.athleteFirstName} ${input.athleteLastName}`.trim();
  const when = submittedAt();

  const rows: Row[] = [
    ["Inquiry category", "Class interest"],
    ["Submitted", when],
    ["Audience", input.audience],
    ["Class", input.classSlug],
    ["Contact", contactName],
    ["Email", input.contactEmail],
    ["Phone", input.contactPhone || "—"],
    ["Athlete", athleteName || "—"],
    ["Age group", input.athleteAgeGroup || "—"],
    ["Sport", input.sport || "—"],
    ["Experience", input.experience || "—"],
    ["Session window", input.sessionWindow || "—"],
    ["Relationship", input.relationship || "—"],
    ["Organization", input.organization || "—"],
    ["Athlete count", input.athleteCount ? String(input.athleteCount) : "—"],
    ["Preferred dates", input.preferredDates || "—"],
  ];

  const internal = await resend.emails.send({
    from: fromHeader(),
    to: toEmail!,
    replyTo: input.contactEmail,
    subject: `[YESP] Class interest — ${input.classSlug} — ${contactName}`,
    html: shell(
      "New class-interest request",
      `${htmlTable(rows)}
       ${htmlParagraph("Goals / notes", input.goals || "—")}
       ${htmlParagraph("Scheduling notes", input.schedulingNotes || "—")}
       <p style="margin:18px 0 0;color:#d6a73b;font-size:12px;">This is an inquiry only. It is not a confirmed booking, enrollment, or payment.</p>`,
    ),
    text: plainText("New class-interest request", rows, [
      ["Goals / notes", input.goals || "—"],
      ["Scheduling notes", input.schedulingNotes || "—"],
      ["Note", "This is an inquiry only. It is not a confirmed booking, enrollment, or payment."],
    ]),
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  const ack = await resend.emails.send({
    from: fromHeader(),
    to: input.contactEmail,
    replyTo: replyToInbox(),
    subject: "We received your class-interest request — Young & Elevated Sports Performance",
    html: shell(
      "Your request is in.",
      `<p style="margin:0 0 12px;">Hi ${escapeHtml(input.contactFirstName)},</p>
       <p style="margin:0 0 12px;">Thank you for your interest in ${escapeHtml(
         input.classSlug,
       )}. This is an automated acknowledgment. It is <strong>not</strong> a confirmed booking,
       enrollment, or payment.</p>
       <p style="margin:0;">A coach will follow up to confirm whether the class, schedule, and age group
       fit. Please do not reply with medical, injury, or health information.</p>`,
    ),
    text: [
      `Hi ${input.contactFirstName},`,
      "",
      `Thank you for your interest in ${input.classSlug}. This is an automated acknowledgment.`,
      "It is NOT a confirmed booking, enrollment, or payment.",
      "",
      "A coach will follow up to confirm whether the class, schedule, and age group fit.",
      "Please do not reply with medical, injury, or health information.",
      "",
      "---",
      "Young & Elevated Sports Performance · Dallas–Fort Worth, Texas.",
    ].join("\n"),
  });

  if (ack.error) {
    console.error("Class interest acknowledgment failed:", ack.error.message);
  }

  return { internalId: internal.data?.id ?? null };
}
