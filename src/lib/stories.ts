import type { StaticImageData } from "next/image";
import { site } from "./site";
import freightshiftThumb from "../../public/images/stories/freightshift-ceo.webp";
import techxmThumb from "../../public/images/stories/techxm-brian.webp";

/** Customer stories. The landing-page cards and the story pages read from here. */
export type Story = {
  slug: string;
  href: string;
  title: string;
  date: string;
  dateISO: string;
  client: string;
  sector: string;
  region: string;
  url: string;
  /** Landing-page card image. All cards share one 3:2 frame. */
  thumbnail: StaticImageData;
  thumbnailAlt: string;
  /** CSS object-position, so each photo is framed around the people in it. */
  thumbnailPosition: string;
};

export const freightshiftStory: Story = {
  slug: "freightshift",
  href: "/customer-stories/freightshift",
  title: "Helping FreightShift simplify the operations behind international logistics",
  date: "29 October 2026",
  dateISO: "2026-10-29",
  client: "FreightShift International Logistics",
  sector: "Logistics & Supply Chain",
  region: "South Africa",
  url: "https://www.freightshiftlogistics.co.za/",
  thumbnail: freightshiftThumb,
  thumbnailAlt: "Jack Maluleke, CEO and Founder of FreightShift",
  thumbnailPosition: "50% 40%",
};

export const techxmStory: Story = {
  slug: "techxm",
  href: "/customer-stories/techxm",
  title: "Helping TechXM expand its engineering capacity for more complex client projects",
  date: "29 October 2026",
  dateISO: "2026-10-29",
  client: "TechXM",
  sector: "Technology & Software Engineering",
  region: "South Africa",
  url: "https://techxm.co.za",
  thumbnail: techxmThumb,
  thumbnailAlt: "Brian Motsweni, CTO of TechXM, with a colleague",
  // Trim the empty curtain above their heads; keep both faces and shoulders.
  thumbnailPosition: "50% 72%",
};

export const stories: Story[] = [freightshiftStory, techxmStory];

/** Article and breadcrumb data, so search engines understand each story page. */
export function storyJsonLd(story: Story, description: string) {
  const url = `${site.url}${story.href}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: story.title,
        description,
        url,
        mainEntityOfPage: url,
        datePublished: story.dateISO,
        dateModified: story.dateISO,
        image: `${site.url}${story.thumbnail.src}`,
        inLanguage: "en-ZA",
        about: { "@type": "Organization", name: story.client, url: story.url },
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Customer stories", item: `${site.url}/#story-heading` },
          { "@type": "ListItem", position: 3, name: story.title, item: url },
        ],
      },
    ],
  };
}
