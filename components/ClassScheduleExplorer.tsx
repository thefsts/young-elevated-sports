"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  classAgeGroups,
  classCategories,
  classLevels,
  classes,
  scheduleDays,
  schedulePreview,
} from "@/lib/content/classes";
import { useI18n } from "@/lib/i18n/client";

/**
 * Schedule explorer.
 *
 * The data here is explicitly design-preview data (`preview: true`,
 * `bookable: false` on every entry). The UI labels it as a preview and never
 * offers a "book" action — only a class-interest request.
 */
export function ClassScheduleExplorer() {
  const { t, path } = useI18n();
  const [category, setCategory] = useState("all");
  const [age, setAge] = useState("all");
  const [level, setLevel] = useState("all");
  const [view, setView] = useState<"week" | "list">("week");

  const classTitle = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of classes) map[c.slug] = c.title;
    return map;
  }, []);

  const filtered = useMemo(() => {
    return schedulePreview.filter((entry) => {
      if (category !== "all") {
        const cat = classCategories.find((c) => c.value === category);
        if (!cat || !(cat.slugs as readonly string[]).includes(entry.classSlug)) return false;
      }
      if (age !== "all") {
        const group = classAgeGroups.find((a) => a.value === age);
        if (!group || !(group.slugs as readonly string[]).includes(entry.classSlug)) return false;
      }
      if (level !== "all" && entry.level !== level) return false;
      return true;
    });
  }, [category, age, level]);

  const selectClass =
    "rounded-lg border border-white/20 bg-ink px-3 py-2 text-xs text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright";

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-graphite/40 p-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/65">
              {t("classes.filter.category")}
            </span>
            <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">{t("classes.filter.all")}</option>
              {classCategories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/65">
              {t("classes.filter.age")}
            </span>
            <select className={selectClass} value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="all">{t("classes.filter.all")}</option>
              {classAgeGroups.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/65">
              {t("classes.filter.level")}
            </span>
            <select className={selectClass} value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="all">{t("classes.filter.all")}</option>
              {classLevels.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-white/15 p-0.5" role="group" aria-label="View">
            <button
              type="button"
              onClick={() => setView("week")}
              aria-pressed={view === "week"}
              className={`rounded-md px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
                view === "week" ? "bg-gold text-ink" : "text-white/70"
              }`}
            >
              {t("classes.weekView")}
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`rounded-md px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
                view === "list" ? "bg-gold text-ink" : "text-white/70"
              }`}
            >
              {t("classes.mobileList")}
            </button>
          </div>
          <span className="rounded-full border border-gold/50 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold">
            {t("classes.previewBadge")}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-xl border border-white/10 p-6 text-center text-sm text-silver/70">
          {t("classes.schedulePending")}
        </p>
      ) : view === "week" ? (
        <div className="mt-6 hidden gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6">
          {scheduleDays.map((day) => {
            const entries = filtered.filter((e) => e.day === day);
            return (
              <div key={day} className="min-w-[9rem]">
                <h3 className="mb-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  {day}
                </h3>
                <div className="space-y-2">
                  {entries.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-white/10 p-3 text-center text-[0.6rem] text-white/60">
                      —
                    </p>
                  ) : (
                    entries.map((entry) => (
                      <div key={entry.id} className="rounded-lg border border-white/10 bg-graphite/60 p-3">
                        <p className="text-[0.62rem] font-semibold text-white/70">
                          {entry.start}–{entry.end}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-white">{classTitle[entry.classSlug]}</p>
                        <p className="mt-1 text-[0.6rem] text-silver/60">{entry.location}</p>
                        <Link
                          href={`${path("/classes/register")}?class=${entry.classSlug}`}
                          className="mt-2 inline-block text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-gold hover:text-gold-bright"
                        >
                          {t("classes.cta")} →
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Mobile list view is also the fallback for the week grid on small screens. */}
      <ul className={`mt-6 space-y-2 ${view === "week" ? "lg:hidden" : ""}`}>
        {filtered.map((entry) => (
          <li
            key={entry.id}
            className="flex flex-col gap-2 rounded-xl border border-white/10 bg-graphite/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold">
                {entry.day} · {entry.start}–{entry.end}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{classTitle[entry.classSlug]}</p>
              <p className="text-[0.65rem] text-silver/60">
                {entry.location} · {entry.level} · {entry.ageGroup}
              </p>
            </div>
            <Link
              href={`${path("/classes/register")}?class=${entry.classSlug}`}
              className="shrink-0 self-start rounded-full border border-white/20 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white hover:border-gold hover:text-gold sm:self-auto"
            >
              {t("classes.cta")}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.65rem] leading-relaxed text-white/60">
        {t("classes.scheduleIntro")} {t("classes.notBooking")}
      </p>
    </div>
  );
}
