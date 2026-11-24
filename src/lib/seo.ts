import type { Metadata } from "next";
import { site } from "./site";

/**
 * One place that builds a page's search and sharing metadata, so every page gets its own
 * canonical address, share title and description (a page that sets openGraph replaces the
 * site-wide one, so it has to be complete).
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const full = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: full,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
