import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { waiverDocuments } from "@/lib/content/waivers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const routes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/training", priority: 0.9 },
    { path: "/performance-technology", priority: 0.7 },
    { path: "/athletes", priority: 0.8 },
    { path: "/results", priority: 0.6 },
    { path: "/media", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/start-training", priority: 0.9 },
    { path: "/registration", priority: 0.8 },
    { path: "/registration/athlete", priority: 0.5 },
    { path: "/registration/parent", priority: 0.5 },
    { path: "/registration/school", priority: 0.6 },
    { path: "/registration/partner", priority: 0.5 },
    { path: "/waivers", priority: 0.5 },
    { path: "/policies", priority: 0.5 },
    { path: "/privacy", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
    { path: "/accessibility", priority: 0.4 },
  ];

  const waiverRoutes = waiverDocuments.map((waiver) => ({
    path: `/waivers/${waiver.slug}`,
    priority: 0.3,
  }));

  return [...routes, ...waiverRoutes].map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
