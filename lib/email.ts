import { Resend } from "resend";
import type { ClassInterestInput, InquiryInput, SchoolInquiryInput } from "@/lib/validation";

/**
 * Email delivery for Class A public inquiries.
 *
 * Environment variables (see .env.example):
 *   RESEND_API_KEY      - required to actually send
 *   INQUIRY_FROM_EMAIL  - verified sender on the Resend domain
 *   INQUIRY_TO_EMAIL    - internal inbox that receives notifications
 *
 * No sender address is invented. If the configuration is absent, the route
 * returns a controlled error rather than pretending to send.
 */

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.INQUIRY_FROM_EMAIL;
const toEmail = process.env.INQUIRY_TO_EMAIL;

export function emailConfigured(): boolean {
  return Boolean(apiKey && fromEmail && toEmail);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#080808;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#D6A73B;margin:0 0 8px;">
        Young &amp; Elevated Sports Performance
      </p>
      <h1 style="font-size:22px;line-height:1.25;margin:0 0 20px;color:#ffffff;">${escapeHtml(title)}</h1>
      <div style="font-size:14px;line-height:1.7;color:#C5C8CE;">${body}</div>
      <hr style="border:none;border-top:1px solid #232323;margin:28px 0;" />
      <p style="font-size:11px;line-height:1.6;color:#6b6f77;margin:0;">
        This is an automated message. Do not reply with medical, injury, or health information.
        Young &amp; Elevated Sports Performance &middot; Dallas&ndash;Fort Worth, Texas.
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

function inquiryRows(input: InquiryInput): string {
  const rows: [string, string | undefined][] = [
    ["Inquiry type", TYPE_LABEL[input.type] ?? input.type],
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
  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8b8f97;white-space:nowrap;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#ffffff;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");
}

export async function sendInquiryEmails(input: InquiryInput) {
  if (!emailConfigured()) {
    throw new Error("Email is not configured.");
  }
  const resend = new Resend(apiKey);
  const rows = inquiryRows(input);
  const message = escapeHtml(input.message).replace(/\n/g, "<br />");

  // Internal notification
  const internal = await resend.emails.send({
    from: fromEmail!,
    to: toEmail!,
    replyTo: input.email,
    subject: `[YESP] ${TYPE_LABEL[input.type] ?? input.type} — ${input.firstName} ${input.lastName}`,
    html: shell(
      "New inquiry received",
      `<table style="border-collapse:collapse;font-size:14px;">${rows}</table>
       <p style="margin:18px 0 6px;color:#8b8f97;">Message</p>
       <p style="margin:0;color:#ffffff;">${message}</p>`,
    ),
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  // Acknowledgment to the sender
  const ack = await resend.emails.send({
    from: fromEmail!,
    to: input.email,
    subject: "We received your message — Young & Elevated Sports Performance",
    html: shell(
      "Your message is in.",
      `<p style="margin:0 0 12px;">Hi ${escapeHtml(input.firstName)},</p>
       <p style="margin:0 0 12px;">Thank you for reaching out to Young &amp; Elevated Sports Performance.
       This is an automated acknowledgment &mdash; it is not a confirmed training booking or enrollment.</p>
       <p style="margin:0 0 12px;">A member of the team will follow up using the contact details you provided.
       If you need to add information, reply to this email.</p>
       <p style="margin:0;">For your privacy, please do not send medical, injury, or health details by email.</p>`,
    ),
  });

  // A failed acknowledgment should not lose the inquiry; log and continue.
  if (ack.error) {
    console.error("Inquiry acknowledgment failed:", ack.error.message);
  }

  return { internalId: internal.data?.id ?? null };
}

export async function sendSchoolInquiryEmails(input: SchoolInquiryInput) {
  if (!emailConfigured()) {
    throw new Error("Email is not configured.");
  }
  const resend = new Resend(apiKey);

  const internal = await resend.emails.send({
    from: fromEmail!,
    to: toEmail!,
    replyTo: input.email,
    subject: `[YESP] School/team inquiry — ${input.organization}`,
    html: shell(
      "New school / team inquiry",
      `<table style="border-collapse:collapse;font-size:14px;">
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Contact</td><td style="color:#fff;">${escapeHtml(
           `${input.representativeFirstName} ${input.representativeLastName}`,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Role</td><td style="color:#fff;">${escapeHtml(
           input.role,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Organization</td><td style="color:#fff;">${escapeHtml(
           input.organization,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Email</td><td style="color:#fff;">${escapeHtml(
           input.email,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Phone</td><td style="color:#fff;">${escapeHtml(
           input.phone,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Services</td><td style="color:#fff;">${escapeHtml(
           input.services,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Group size</td><td style="color:#fff;">${escapeHtml(
           input.groupSize,
         )}</td></tr>
         <tr><td style="padding:4px 12px 4px 0;color:#8b8f97;">Proposed dates</td><td style="color:#fff;">${escapeHtml(
           input.proposedDates || "—",
         )}</td></tr>
       </table>
       <p style="margin:18px 0 6px;color:#8b8f97;">Message</p>
       <p style="margin:0;color:#ffffff;">${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>`,
    ),
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  const ack = await resend.emails.send({
    from: fromEmail!,
    to: input.email,
    subject: "We received your school / team inquiry — Young & Elevated Sports Performance",
    html: shell(
      "Your inquiry is in.",
      `<p style="margin:0 0 12px;">Hi ${escapeHtml(input.representativeFirstName)},</p>
       <p style="margin:0 0 12px;">Thank you for contacting Young &amp; Elevated Sports Performance on behalf of
       ${escapeHtml(input.organization)}. This is an automated acknowledgment &mdash; it is not a confirmed
       services agreement or booking.</p>
       <p style="margin:0;">A member of the team will follow up to discuss scope, scheduling, and any required
       school or district agreements.</p>`,
    ),
  });

  if (ack.error) {
    console.error("School inquiry acknowledgment failed:", ack.error.message);
  }

  return { internalId: internal.data?.id ?? null };
}

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

  const rows: [string, string][] = [
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

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8b8f97;white-space:nowrap;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#ffffff;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const internal = await resend.emails.send({
    from: fromEmail!,
    to: toEmail!,
    replyTo: input.contactEmail,
    subject: `[YESP] Class interest — ${input.classSlug} — ${contactName}`,
    html: shell(
      "New class-interest request",
      `<table style="border-collapse:collapse;font-size:14px;">${table}</table>
       <p style="margin:18px 0 6px;color:#8b8f97;">Goals / notes</p>
       <p style="margin:0;color:#ffffff;">${escapeHtml(input.goals || "—").replace(/\n/g, "<br />")}</p>
       <p style="margin:18px 0 6px;color:#8b8f97;">Scheduling notes</p>
       <p style="margin:0;color:#ffffff;">${escapeHtml(input.schedulingNotes || "—").replace(/\n/g, "<br />")}</p>
       <p style="margin:18px 0 0;color:#d6a73b;font-size:12px;">This is an inquiry only. It is not a confirmed booking, enrollment, or payment.</p>`,
    ),
  });

  if (internal.error) {
    throw new Error(internal.error.message);
  }

  const ack = await resend.emails.send({
    from: fromEmail!,
    to: input.contactEmail,
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
  });

  if (ack.error) {
    console.error("Class interest acknowledgment failed:", ack.error.message);
  }

  return { internalId: internal.data?.id ?? null };
}
