"use client";

import { useId, useMemo, useRef, useState } from "react";
import { classInterestSchema, fieldErrors, type ClassInterestInput } from "@/lib/validation";
import { classes, experienceLevels, sessionWindows } from "@/lib/content/classes";
import { useI18n } from "@/lib/i18n/client";

type Status = "idle" | "submitting" | "success" | "error";
type Audience = "adult" | "minor" | "school";

const AGE_GROUPS = ["Youth (7–11)", "Middle school (11–14)", "High school (14–18)", "College / adult (18+)"];

export function ClassInterestForm({ initialClass = "" }: { initialClass?: string }) {
  const { t } = useI18n();
  const uid = useId();
  const startedAt = useRef(Date.now());
  const [audience, setAudience] = useState<Audience>("adult");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({
    classSlug: initialClass,
    audience: "adult",
  });

  const set = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const selectedClass = useMemo(() => classes.find((c) => c.slug === values.classSlug), [values.classSlug]);

  function buildPayload(): Record<string, unknown> {
    return {
      ...values,
      audience,
      contactConsent: values.contactConsent === "on" ? true : undefined,
      privacyAcknowledged: values.privacyAcknowledged === "on" ? true : undefined,
      website: values.website ?? "",
      startedAt: startedAt.current,
    };
  }

  function onReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormMessage(null);
    const parsed = classInterestSchema.safeParse(buildPayload());
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setFormMessage(t("form.errorBody"));
      // Move focus to the first invalid field for keyboard and screen-reader users.
      const firstKey = Object.keys(fieldErrors(parsed.error))[0];
      if (firstKey) {
        document.getElementById(`${uid}-${firstKey}`)?.focus();
      }
      return;
    }
    setReviewing(true);
  }

  async function onSubmit() {
    setStatus("submitting");
    setErrors({});
    setFormMessage(null);
    const parsed = classInterestSchema.safeParse(buildPayload());
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("error");
      setFormMessage(t("form.errorBody"));
      setReviewing(false);
      return;
    }
    try {
      const response = await fetch("/api/class-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data satisfies ClassInterestInput),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (!response.ok || !data.ok) {
        setStatus("error");
        if (data.errors) setErrors(data.errors);
        setFormMessage(data.message ?? t("form.errorDelivery"));
        setReviewing(false);
        return;
      }
      // Success is shown only after the server confirmed delivery.
      setStatus("success");
    } catch {
      setStatus("error");
      setFormMessage(t("form.errorDelivery"));
      setReviewing(false);
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-gold/40 bg-gold/[0.06] p-8">
        <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
          {t("form.successTitle")}
        </p>
        <h2 className="mt-3 font-display text-3xl uppercase text-white">{t("form.successTitle")}</h2>
        <p className="mt-4 max-w-xl font-sans text-sm leading-6 text-silver">{t("form.successBody")}</p>
        <p className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-gold/80">{t("form.notConfirmed")}</p>
      </div>
    );
  }

  if (reviewing) {
    return (
      <div className="rounded-2xl border border-white/15 bg-graphite/40 p-6">
        <h2 className="font-display text-2xl uppercase text-white">{t("form.reviewTitle")}</h2>
        <dl className="mt-5 space-y-2 text-sm">
          <ReviewRow label={t("classes.audience.label")} value={t(`classes.audience.${audience}`)} />
          <ReviewRow label={t("form.class")} value={selectedClass?.title ?? values.classSlug} />
          <ReviewRow label={t("form.email")} value={values.contactEmail ?? ""} />
          <ReviewRow label={t("form.phone")} value={values.contactPhone ?? ""} />
          {audience !== "school" ? (
            <>
              <ReviewRow
                label={t("form.athleteFirstName")}
                value={`${values.athleteFirstName ?? ""} ${values.athleteLastName ?? ""}`.trim()}
              />
              <ReviewRow label={t("form.ageGroup")} value={values.athleteAgeGroup ?? ""} />
              <ReviewRow label={t("form.sessionWindow")} value={values.sessionWindow ?? ""} />
            </>
          ) : (
            <>
              <ReviewRow label={t("form.organization")} value={values.organization ?? ""} />
              <ReviewRow label={t("form.athleteCount")} value={values.athleteCount ?? ""} />
            </>
          )}
        </dl>
        <p className="mt-5 rounded-xl border border-gold/30 bg-gold/[0.05] p-3 text-[0.7rem] leading-relaxed text-silver">
          {t("form.notConfirmed")}
        </p>
        {formMessage ? (
          <p role="alert" className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
            {formMessage}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={status === "submitting"}
            className="btn-primary disabled:opacity-60"
          >
            {status === "submitting" ? t("form.submitting") : t("form.submit")}
          </button>
          <button type="button" onClick={() => setReviewing(false)} className="btn-ghost">
            {t("form.reviewEdit")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onReview} noValidate className="rounded-2xl border border-white/15 bg-graphite/30 p-6 lg:p-8">
      <fieldset className="mb-6">
        <legend className="mb-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
          {t("classes.audience.label")}
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {(["adult", "minor", "school"] as Audience[]).map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm ${
                audience === option ? "border-gold bg-gold/[0.08] text-white" : "border-white/15 text-silver"
              }`}
            >
              <input
                type="radio"
                name="audience"
                value={option}
                checked={audience === option}
                onChange={() => setAudience(option)}
                className="accent-gold"
              />
              {t(`classes.audience.${option}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-classSlug`} label={t("form.class")} error={errors.classSlug} required>
          <select
            id={`${uid}-classSlug`}
            value={values.classSlug}
            onChange={(e) => set("classSlug", e.target.value)}
            aria-invalid={Boolean(errors.classSlug)}
            className="field"
          >
            <option value="">{t("classes.filter.all")}</option>
            {classes.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </Field>

        {audience !== "school" ? (
          <>
            <Field id={`${uid}-athleteFirstName`} label={t("form.athleteFirstName")} error={errors.athleteFirstName} required>
              <input id={`${uid}-athleteFirstName`} className="field" value={values.athleteFirstName ?? ""} onChange={(e) => set("athleteFirstName", e.target.value)} autoComplete="off" aria-invalid={Boolean(errors.athleteFirstName)} />
            </Field>
            <Field id={`${uid}-athleteLastName`} label={t("form.athleteLastName")} error={errors.athleteLastName} required>
              <input id={`${uid}-athleteLastName`} className="field" value={values.athleteLastName ?? ""} onChange={(e) => set("athleteLastName", e.target.value)} autoComplete="off" aria-invalid={Boolean(errors.athleteLastName)} />
            </Field>
            <Field id={`${uid}-athleteAgeGroup`} label={t("form.ageGroup")} error={errors.athleteAgeGroup} required>
              <select id={`${uid}-athleteAgeGroup`} className="field" value={values.athleteAgeGroup ?? ""} onChange={(e) => set("athleteAgeGroup", e.target.value)} aria-invalid={Boolean(errors.athleteAgeGroup)}>
                <option value="">—</option>
                {AGE_GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={`${uid}-sport`} label={t("form.sport")} error={errors.sport}>
              <input id={`${uid}-sport`} className="field" value={values.sport ?? ""} onChange={(e) => set("sport", e.target.value)} />
            </Field>
            <Field id={`${uid}-experience`} label={t("form.experience")} error={errors.experience} required>
              <select id={`${uid}-experience`} className="field" value={values.experience ?? ""} onChange={(e) => set("experience", e.target.value)} aria-invalid={Boolean(errors.experience)}>
                <option value="">—</option>
                {experienceLevels.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={`${uid}-sessionWindow`} label={t("form.sessionWindow")} error={errors.sessionWindow} required>
              <select id={`${uid}-sessionWindow`} className="field" value={values.sessionWindow ?? ""} onChange={(e) => set("sessionWindow", e.target.value)} aria-invalid={Boolean(errors.sessionWindow)}>
                <option value="">—</option>
                {sessionWindows.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </Field>
          </>
        ) : (
          <>
            <Field id={`${uid}-organization`} label={t("form.organization")} error={errors.organization} required>
              <input id={`${uid}-organization`} className="field" value={values.organization ?? ""} onChange={(e) => set("organization", e.target.value)} aria-invalid={Boolean(errors.organization)} />
            </Field>
            <Field id={`${uid}-athleteCount`} label={t("form.athleteCount")} error={errors.athleteCount} required>
              <input id={`${uid}-athleteCount`} className="field" inputMode="numeric" value={values.athleteCount ?? ""} onChange={(e) => set("athleteCount", e.target.value)} aria-invalid={Boolean(errors.athleteCount)} />
            </Field>
            <Field id={`${uid}-preferredDates`} label={t("form.preferredDates")} error={errors.preferredDates}>
              <input id={`${uid}-preferredDates`} className="field" value={values.preferredDates ?? ""} onChange={(e) => set("preferredDates", e.target.value)} />
            </Field>
            <Field id={`${uid}-schedulingNotes`} label={t("form.schedulingNotes")} error={errors.schedulingNotes} full>
              <textarea id={`${uid}-schedulingNotes`} className="field min-h-[5rem]" value={values.schedulingNotes ?? ""} onChange={(e) => set("schedulingNotes", e.target.value)} />
            </Field>
          </>
        )}

        <Field id={`${uid}-contactFirstName`} label={audience === "minor" ? t("form.guardianName") : t("form.firstName")} error={errors.contactFirstName} required>
          <input id={`${uid}-contactFirstName`} className="field" value={values.contactFirstName ?? ""} onChange={(e) => set("contactFirstName", e.target.value)} autoComplete="given-name" aria-invalid={Boolean(errors.contactFirstName)} />
        </Field>
        <Field id={`${uid}-contactLastName`} label={t("form.lastName")} error={errors.contactLastName} required>
          <input id={`${uid}-contactLastName`} className="field" value={values.contactLastName ?? ""} onChange={(e) => set("contactLastName", e.target.value)} autoComplete="family-name" aria-invalid={Boolean(errors.contactLastName)} />
        </Field>
        {audience === "minor" ? (
          <Field id={`${uid}-relationship`} label={t("form.guardianRelationship")} error={errors.relationship} required>
            <input id={`${uid}-relationship`} className="field" value={values.relationship ?? ""} onChange={(e) => set("relationship", e.target.value)} aria-invalid={Boolean(errors.relationship)} />
          </Field>
        ) : null}
        <Field id={`${uid}-contactEmail`} label={t("form.email")} error={errors.contactEmail} required>
          <input id={`${uid}-contactEmail`} type="email" className="field" value={values.contactEmail ?? ""} onChange={(e) => set("contactEmail", e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.contactEmail)} />
        </Field>
        <Field id={`${uid}-contactPhone`} label={t("form.phone")} error={errors.contactPhone} required>
          <input id={`${uid}-contactPhone`} type="tel" className="field" value={values.contactPhone ?? ""} onChange={(e) => set("contactPhone", e.target.value)} autoComplete="tel" aria-invalid={Boolean(errors.contactPhone)} />
        </Field>

        {audience !== "school" ? (
          <Field id={`${uid}-goals`} label={t("form.goals")} error={errors.goals} required full>
            <textarea id={`${uid}-goals`} className="field min-h-[6rem]" value={values.goals ?? ""} onChange={(e) => set("goals", e.target.value)} aria-invalid={Boolean(errors.goals)} placeholder="Please do not include medical or injury details here." />
          </Field>
        ) : null}
      </div>

      {/* Honeypot: hidden from assistive tech and never focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={values.website ?? ""} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-6 space-y-3">
        <Checkbox id={`${uid}-contactConsent`} label={t("form.contactConsent")} checked={values.contactConsent === "on"} onChange={(v) => set("contactConsent", v ? "on" : "")} error={errors.contactConsent} />
        <Checkbox id={`${uid}-privacyAcknowledged`} label={t("form.privacy")} checked={values.privacyAcknowledged === "on"} onChange={(v) => set("privacyAcknowledged", v ? "on" : "")} error={errors.privacyAcknowledged} />
      </div>

      {formMessage ? (
        <p role="alert" className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {formMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary">
          {t("form.reviewTitle")}
        </button>
        <p className="text-[0.68rem] uppercase tracking-[0.14em] text-white/60">{t("form.notConfirmed")}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  full,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/60">
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-gold">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-[0.7rem] text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Checkbox({
  id,
  label,
  checked,
  onChange,
  error,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2 text-xs leading-relaxed text-silver/85">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 accent-gold" aria-invalid={Boolean(error)} />
        {label}
      </label>
      {error ? <p className="mt-1 text-[0.7rem] text-red-300">{error}</p> : null}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
      <dt className="text-white/65">{label}</dt>
      <dd className="text-right text-silver">{value || "—"}</dd>
    </div>
  );
}
