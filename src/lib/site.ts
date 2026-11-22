export const site = {
  name: "Blackroid",
  legalName: "Blackroid (Pty) Ltd",
  tagline: "Complex Operations. Handled.",
  description:
    "Blackroid is a South African AI-native business services company. AI-powered infrastructure and specialist expertise, delivering measurable business outcomes.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_ZA",
  country: "South Africa",
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@blackroid.com",
  phone: "+27712233272",
  phoneDisplay: "+27 71 223 3272",
  /** Public profiles. WhatsApp opens a chat with the phone number above; the rest take their address from env. */
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    whatsapp: "https://wa.me/27712233272",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    x: process.env.NEXT_PUBLIC_X_URL || "#",
  },
  /** The client portal, which handles its own sign-in. Nothing is collected on this website. */
  clientPortalUrl: process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || "https://portal.blackroid.com",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Outsource", href: "/outsourced-development" },
  { label: "Contact", href: "/contact" },
] as const;

/** Builds a remote Unsplash URL (images are free-licence, served via next/image). */
export function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`;
}
