"use client";

import { useId, useRef, useState } from "react";
import { inquirySchema, fieldErrors, type InquiryType } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "number";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  help?: string;
  half?: boolean;
};

const BASE_FIELDS: FieldConfig[] = [
  { name: "firstName", label: "First name", required: true, autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", required: true, autoComplete: "family-name", half: true },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
  { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel", half: true },
];

const TYPE_FIELDS: Record<InquiryType, FieldConfig[]> = {
  contact: [
    { name: "organization", label: "Organization (optional)", half: true },
    { name: "role", label: "Role (optional)", half: true },
  ],
  training: [
    { name: "athleteName", label: "Athlete name (optional)", half: true },
    { name: "athleteAge", label: "Athlete age (optional)", type: "number", half: true },
    { name: "sport", label: "Primary sport (optional)", half: true },
    { name: "interest", label: "Program of interest (optional)", half: true },
    { name: "preferredDates", label: "Preferred days or times (optional)", half: true },
  ],
  partner: [
    { name: "organization", label: "Organization or team (optional)", half: true },
    { name: "role", label: "Your role (optional)", half: true },
    { name: "groupSize", label: "Approximate group size (optional)", type: "number", half: true },
  ],
  school: [
    { name: "organization", label: "School or organization", required: true, half: true },
    { name: "role", label: "Your role", required: true, half: true },
    { name: "groupSize", label: "Approximate group size (optional)", type: "number", half: true },
    { name: "preferredDates", label: "Proposed dates (optional)", half: true },
  ],
  class: [
    { name: "interest", label: "Class of interest (optional)", half: true },
    { name: "athleteName", label: "Athlete name (optional)", half: true },
    { name: "athleteAge", label: "Athlete age (optional)", type: "number", half: true },
    { name: "sport", label: "Primary sport (optional)", half: true },
    { name: "preferredDates", label: "Preferred session window (optional)", half: true },
  ],
};

export function InquiryForm({
  type,
  submitLabel = "Send inquiry",
  messageLabel = "How can we help?",
  messagePlaceholder = "Tell us about your athlete, goals, and timeline. Please do not include medical details here.",
}: {
  type: InquiryType;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const fields = [...BASE_FIELDS, ...(TYPE_FIELDS[type] ?? [])];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload: Record<string, string> = { type };
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("error");
      setFormMessage("Please review the highlighted fields and try again.");
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFormMessage(
          data.message ??
            "We could not send your message just now. Please try again, or email us directly once contact details are published.",
        );
        return;
      }

      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setFormMessage(
        "A network error prevented your message from sending. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-gold/40 bg-gold/[0.06] px-6 py-10"
      >
        <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
          Inquiry received
        </p>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-white">
          Thank you &mdash; we have your message.
        </h3>
        <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-silver">
          A confirmation has been sent to the email address you provided. This is an automated
          acknowledgment, not a confirmed training booking. A member of the team will follow up
          directly.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {formMessage ? (
        <div role="alert" className="border-l-2 border-red-400/70 bg-red-500/10 px-5 py-4">
          <p className="font-sans text-sm text-red-200">{formMessage}</p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${uid}-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name} className={field.half ? "" : "sm:col-span-2"}>
              <label htmlFor={id} className="field-label">
                {field.label}
                {field.required ? <span className="text-gold"> *</span> : null}
              </label>
              <input
                id={id}
                name={field.name}
                type={field.type === "number" ? "text" : field.type ?? "text"}
                inputMode={field.type === "number" ? "numeric" : undefined}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required={field.required}
                aria-required={field.required || undefined}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : field.help ? `${id}-help` : undefined}
                className="field-input"
              />
              {field.help ? (
                <p id={`${id}-help`} className="mt-1.5 font-sans text-xs text-white/60">
                  {field.help}
                </p>
              ) : null}
              {error ? (
                <p id={`${id}-error`} className="field-error">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="field-label">
          {messageLabel}
          <span className="text-gold"> *</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          required
          aria-required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          placeholder={messagePlaceholder}
          className="field-input resize-y"
        />
        {errors.message ? (
          <p id={`${uid}-message-error`} className="field-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from users and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={`${uid}-consent`} className="flex items-start gap-3">
          <input
            id={`${uid}-consent`}
            name="contactConsent"
            type="checkbox"
            value="true"
            aria-invalid={errors.contactConsent ? true : undefined}
            aria-describedby={errors.contactConsent ? `${uid}-consent-error` : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
          />
          <span className="font-sans text-sm leading-6 text-silver">
            I agree that Young &amp; Elevated Sports Performance may contact me about this inquiry.
            <span className="text-gold"> *</span>
          </span>
        </label>
        {errors.contactConsent ? (
          <p id={`${uid}-consent-error`} className="field-error ml-7">
            {errors.contactConsent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
          {status === "submitting" ? "Sending\u2026" : submitLabel}
        </button>
        <p className="font-sans text-xs leading-5 text-white/60">
          Please do not include medical, injury, or health details in this form. Those are collected
          only through the secure registration process.
        </p>
      </div>
    </form>
  );
}
