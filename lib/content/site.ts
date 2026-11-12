export const site = {
  name: "Young & Elevated",
  descriptor: "Sports Performance",
  legalName: "Young & Elevated Sports Performance",
  shortName: "YESP",
  domain: "youngelevatedsports.com",
  url: "https://youngelevatedsports.com",
  region: "Dallas–Fort Worth, Texas",
  founder: "Reggie Young",
  tagline: "Build winning habits. Reach your next level.",
  description:
    "Elite athletic development in Dallas–Fort Worth built on speed, strength, discipline, and measurable performance. Train with purpose. Compete with confidence.",
  /**
   * Contact details are intentionally unset. The directive prohibits inventing a
   * phone number, street address, or business hours. The public inquiry form is
   * the only verified contact channel at this stage.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    hours: null as string | null,
    serviceArea: "Dallas–Fort Worth, Texas",
  },
  social: [] as { label: string; href: string }[],
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Training", href: "/training" },
  { label: "Technology", href: "/performance-technology" },
  { label: "Athletes", href: "/athletes" },
  { label: "Results", href: "/results" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  train: [
    { label: "Training Programs", href: "/training" },
    { label: "Performance Technology", href: "/performance-technology" },
    { label: "Athlete Development", href: "/athletes" },
    { label: "Athlete Results", href: "/results" },
    { label: "Training Gallery", href: "/media" },
  ],
  register: [
    { label: "Start Training", href: "/start-training" },
    { label: "Registration", href: "/registration" },
    { label: "Athlete Registration", href: "/registration/athlete" },
    { label: "Parent / Guardian", href: "/registration/parent" },
    { label: "School / Team Inquiry", href: "/registration/school" },
    { label: "Coach Partnership", href: "/registration/partner" },
  ],
  legal: [
    { label: "Waiver Information", href: "/waivers" },
    { label: "Policy Index", href: "/policies" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Website Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

export const stats = [
  { value: "D1", label: "Football background" },
  { value: "CSCS", label: "Certified strength & conditioning" },
  { value: "8", label: "Training disciplines" },
  { value: "DFW", label: "Dallas–Fort Worth, Texas" },
];
