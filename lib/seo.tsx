import type { Metadata } from "next";
import { site } from "./content/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/brand/og-image.png",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${site.url}${path}`,
      siteName: site.legalName,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Local business structured data. Only verified facts are included: no street
 * address, telephone number, opening hours, or aggregate rating is published,
 * because none has been supplied by the client.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.legalName,
  alternateName: "Young & Elevated",
  url: site.url,
  description: site.description,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Dallas–Fort Worth, Texas",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "TX",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Reggie Young",
    jobTitle: "Founder",
  },
  knowsAbout: [
    "Speed and acceleration training",
    "Explosive power development",
    "Strength and conditioning",
    "Athletic performance assessment",
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Data is authored in-repo and contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
