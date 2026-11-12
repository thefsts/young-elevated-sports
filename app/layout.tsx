import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/content/site";

const display = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/BarlowCondensed-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const sans = localFont({
  src: [
    { path: "./fonts/Barlow-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Barlow-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Barlow-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Young & Elevated Sports Performance | Dallas–Fort Worth Athletic Training",
    template: "%s | Young & Elevated Sports Performance",
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "sports performance training",
    "athletic development",
    "Dallas Fort Worth",
    "speed training",
    "strength and conditioning",
    "youth athlete training",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: "Young & Elevated Sports Performance",
    description: site.description,
    url: site.url,
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "Young & Elevated Sports Performance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Young & Elevated Sports Performance",
    description: site.description,
    images: ["/brand/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/favicon-192.png", sizes: "192x192" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:font-sans focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-ink"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
