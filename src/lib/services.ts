/**
 * Two complementary capabilities: managed business services for defined operational processes,
 * and enterprise technology and transformation. Older service addresses redirect here (see next.config.ts).
 *
 * The managed services are areas Blackroid is developing and exploring commercially.
 * Do not describe them as regulated, authorised or already operating at scale until that is verified.
 */
export type ServiceGroup = "managed" | "technology";

export type Service = {
  slug: string;
  number: string;
  group: ServiceGroup;
  title: string;
  /** The industry this area serves, shown on the home page cards. */
  industry: string;
  /** A business problem and a potential outcome, in two short sentences. */
  plain: string;
  /** Used for page descriptions and search data. */
  short: string;
  intro: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  /** A one-line promise for the services page. */
  pitch?: string;
  /** What we do, one benefit-led line each, shown as a checklist on the services page. */
  offerings?: { title: string; text: string }[];
  /** Two photographs for the fuller services-page layout. */
  gallery?: [string, string];
  galleryAlt?: string;
  /** True when the second photograph is upright (portrait) rather than wide. */
  galleryPortrait?: boolean;
  /** A related page that belongs to this area. */
  related?: { label: string; href: string };
};

export const serviceGroups: Record<ServiceGroup, { title: string; intro: string; note?: string }> = {
  managed: {
    title: "Managed Business Services",
    intro: "We handle defined operational processes on your behalf.",
    note: "Areas we are developing with organisations.",
  },
  technology: {
    title: "Enterprise Technology & Transformation",
    intro: "We improve the systems your operations run on.",
  },
};

export const services: Service[] = [
  {
    slug: "insurance-operations",
    number: "01",
    group: "managed",
    title: "Insurance Operations",
    industry: "Insurance",
    plain:
      "Manual claims checking is slow and costly. Intelligent infrastructure and specialist review can speed up verification and keep every decision documented.",
    short: "Claims verification, assessment support and exception management for insurers.",
    intro:
      "Blackroid combines intelligent infrastructure and specialist expertise to handle defined insurance operations on behalf of organisations.",
    capabilities: [
      "Claims verification",
      "Claims assessment support",
      "Documentation and evidence review",
      "Claims exception management",
    ],
    image: "/images/insurance-operations.webp",
    imageAlt: "A smiling specialist standing beside a whiteboard with the word insurance written on it",
    pitch: "Faster claims decisions, with a clear record behind every one.",
    offerings: [
      { title: "Claims verification", text: "Check each claim against the policy and the evidence before it is paid." },
      { title: "Claims assessment support", text: "Hand your assessors organised files that are ready to decide." },
      { title: "Documentation and evidence review", text: "Review documents for completeness and consistency." },
      { title: "Claims exception management", text: "Take the disputed and unusual claims off your team's desk." },
    ],
    gallery: ["/images/insurance-team.webp", "/images/insurance-review.webp"],
    galleryAlt: "Colleagues reviewing a case together at a laptop",
  },
  {
    slug: "healthcare-operations",
    number: "02",
    group: "managed",
    title: "Healthcare Operations",
    industry: "Healthcare",
    plain:
      "Rejected and underpaid claims quietly drain revenue. Reconciliation and exception management can recover payments that would otherwise be lost.",
    short: "Medical-aid claims reconciliation, billing exception resolution and payment recovery support.",
    intro:
      "Blackroid combines intelligent infrastructure and specialist expertise to handle defined healthcare billing and claims operations on behalf of organisations.",
    capabilities: [
      "Medical-aid claims reconciliation",
      "Billing exception resolution",
      "Underpaid and rejected claims management",
      "Payment recovery support",
    ],
    image: "/images/healthcare-operations.webp",
    imageAlt: "A doctor and a nurse reviewing a patient file together",
    pitch: "Recover the revenue lost between billing and payment.",
    offerings: [
      { title: "Medical-aid claims reconciliation", text: "Match what was billed to what was paid, claim by claim." },
      {
        title: "Billing exception resolution",
        text: "Resolve billing errors and mismatches before they become losses.",
      },
      {
        title: "Underpaid and rejected claims",
        text: "Find, challenge and follow up claims that were short-paid or rejected.",
      },
      { title: "Payment recovery support", text: "Help bring money that is owed back into the business." },
    ],
    gallery: ["/images/healthcare-team.webp", "/images/healthcare-clinic.webp"],
    galleryAlt: "A doctor and a colleague going through patient records on a laptop",
  },
  {
    slug: "financial-operations",
    number: "03",
    group: "managed",
    title: "Financial Operations",
    industry: "Financial Services",
    plain:
      "Reconciliation and reporting consume skilled time. Intelligent processes and expert oversight can make financial operations faster and more accurate.",
    short: "Financial reconciliation, fund administration support, reporting and exception management.",
    intro:
      "Blackroid combines intelligent infrastructure and specialist expertise to handle defined financial operations on behalf of organisations.",
    capabilities: [
      "Financial reconciliation",
      "Fund administration support",
      "Financial reporting",
      "Investment operations and exception management",
    ],
    image: "/images/financial-operations.webp",
    imageAlt: "A finance specialist reviewing documents beside a finance review board",
    pitch: "Accurate financial operations, without the manual workload.",
    offerings: [
      {
        title: "Financial reconciliation",
        text: "Match records across accounts and systems, and flag what does not agree.",
      },
      { title: "Fund administration support", text: "Take on the routine administration that keeps a fund running." },
      { title: "Financial reporting", text: "Produce reporting your leadership and investors can rely on." },
      { title: "Investment operations", text: "Resolve breaks and exceptions before they reach your clients." },
    ],
    gallery: ["/images/financial-operations.webp", "/images/finance-charts.webp"],
    galleryAlt: "A finance specialist reviewing documents beside a finance review board",
    galleryPortrait: true,
  },
  {
    slug: "enterprise-technology-and-transformation",
    number: "04",
    group: "technology",
    title: "Enterprise Technology & Transformation",
    industry: "Enterprise Technology",
    plain:
      "Legacy systems and disconnected processes slow organisations down. Integration, modernisation and AI can turn them into measurable operational improvements.",
    short:
      "Enterprise software engineering, systems integration, legacy modernisation, digital transformation and AI integration.",
    intro:
      "We help organisations solve business problems by improving the systems and infrastructure that support their operations.",
    capabilities: [
      "Enterprise software engineering",
      "Systems integration",
      "Legacy systems modernisation",
      "Digital transformation",
      "Business process digitisation",
      "AI integration into existing business systems",
    ],
    image: "/images/enterprise-transformation.webp",
    imageAlt: "Engineers at their desks working through a system problem together",
    related: { label: "Outsource a team", href: "/outsourced-development" },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
