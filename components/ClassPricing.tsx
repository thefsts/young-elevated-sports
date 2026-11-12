import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { formatPrice, pricing, pricingPolicy } from "@/lib/content/classes";
import type { Locale } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/dictionaries";

type Translator = (key: TranslationKey, vars?: Record<string, string | number>) => string;

/**
 * Shared price sheet renderer.
 *
 * Every figure comes from the approved `pricing` constant in
 * `lib/content/classes.ts` — nothing here is computed. The policy callouts read
 * from `pricingPolicy` so the English and Spanish statements can never drift
 * from the approved wording.
 *
 * Pricing is presented for review only. There is no cart, no checkout and no
 * payment surface anywhere in this component.
 */
export function ClassPricing({
  locale,
  t,
  withHeading = true,
}: {
  locale: Locale;
  t: Translator;
  withHeading?: boolean;
}) {
  const es = locale === "es";

  return (
    <div>
      {withHeading ? (
        <SectionHeading
          index="02"
          eyebrow={t("classes.pricing.eyebrow")}
          title={t("classes.pricing.title")}
          intro={t("classes.pricing.intro")}
        />
      ) : (
        <h2 className="font-display text-2xl uppercase leading-none text-white">
          {t("classes.pricing.title")}
        </h2>
      )}

      <div className={`grid gap-6 lg:grid-cols-3 ${withHeading ? "mt-12" : "mt-8"}`}>
        {pricing.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 40}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-graphite/40 p-6">
              <h3 className="font-display text-xl uppercase leading-none text-white">
                {es ? group.titleEs : group.title}
              </h3>
              <p className="mt-3 font-sans text-xs leading-5 text-silver/80">
                {es ? group.introEs : group.intro}
              </p>

              <ul className="mt-6 flex-1 space-y-4">
                {group.options.map((opt) => (
                  <li
                    key={opt.id}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-sans text-sm font-medium text-white">
                        {es ? opt.labelEs : opt.label}
                      </p>
                      <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-white/50">
                        {es ? opt.unitEs : opt.unit}
                      </p>
                    </div>
                    <p className="font-display text-2xl leading-none text-gold">
                      {formatPrice(opt.price)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <p className="rounded-xl border border-white/10 bg-ink/60 p-5 font-sans text-xs leading-6 text-silver/85">
          {t("classes.pricing.flexExpiry")} {pricingPolicy.mixing[locale]}
        </p>
        <p className="rounded-xl border border-gold/30 bg-gold/[0.05] p-5 font-sans text-xs leading-6 text-silver/85">
          {pricingPolicy.family[locale]}
        </p>
      </div>

      <p className="mt-6 max-w-3xl font-sans text-[0.68rem] leading-5 text-white/50">
        {pricingPolicy.payment[locale]}
      </p>
    </div>
  );
}
