/**
 * Two core services: managed operational outcomes (insurance and financial services) and enterprise
 * engineering (across industries). Older service addresses redirect here (see next.config.ts).
 *
 * Do not describe any of this as regulated, authorised or certified, and do not claim results or
 * client work that cannot be verified.
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
    title: "Managed Operational Outcomes",
    intro: "We improve defined operational processes, and take on more as value is shown.",
    note: "We begin with a focused engagement and expand as results are shown.",
  },
  technology: {
    title: "Enterprise Engineering",
    intro: "We engineer the systems your operations run on.",
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
      "Claims backlogs and slow administration raise cost and delay settlements. Defined operational improvements can reduce both, with your claims decisions staying with you.",
    short:
      "Claims backlog reduction, assessment coordination and administration efficiency for insurers and claims administrators.",
    intro:
      "We improve how claims operations run, to cut cost and turnaround time. Your systems, customer relationships and claims decisions stay with you.",
    capabilities: [
      "Claims backlog reduction",
      "Claims assessment coordination",
      "Claims administration efficiency",
      "Claims recovery process improvement",
    ],
    image: "/images/insurance-operations.webp",
    imageAlt: "A smiling specialist standing beside a whiteboard with the word insurance written on it",
    pitch: "Lower claims costs and faster turnaround, with decisions staying with you.",
    offerings: [
      { title: "Claims backlog reduction", text: "Work through the queue against clear, measurable targets." },
      { title: "Claims assessment coordination", text: "Keep assessments moving and everyone informed." },
      { title: "Claims administration efficiency", text: "Cut the manual effort in processing and follow-up." },
      { title: "Claims recovery improvement", text: "Improve how recoveries are identified and pursued." },
    ],
    gallery: ["/images/insurance-team.webp", "/images/insurance-review.webp"],
    galleryAlt: "Colleagues reviewing a case together at a laptop",
  },
  {
    slug: "financial-operations",
    number: "02",
    group: "managed",
    title: "Financial Operations",
    industry: "Financial Services",
    plain:
      "Reconciliation and exceptions consume skilled time and leave discrepancies unresolved. Defined improvements can raise accuracy and speed, with funds and approvals staying with you.",
    short:
      "Financial reconciliation, exception resolution and reporting workflow efficiency for lenders, fund administrators and finance providers.",
    intro:
      "We improve how financial operations run, for accuracy and speed. You keep responsibility for funds, approvals and your existing systems.",
    capabilities: [
      "Financial reconciliation",
      "Transaction and repayment exception resolution",
      "Financial reporting workflow efficiency",
      "Operational processing accuracy",
    ],
    image: "/images/financial-operations.webp",
    imageAlt: "A finance specialist reviewing documents beside a finance review board",
    pitch: "Fewer unresolved discrepancies, with funds and approvals staying with you.",
    offerings: [
      {
        title: "Financial reconciliation",
        text: "Match records across accounts and systems, and flag what does not agree.",
      },
      { title: "Transaction and repayment exceptions", text: "Work exceptions through to resolution." },
      { title: "Reporting workflow efficiency", text: "Make reporting faster to produce and easier to rely on." },
      { title: "Processing accuracy", text: "Reduce errors and unresolved discrepancies at source." },
    ],
    gallery: ["/images/financial-operations.webp", "/images/finance-charts.webp"],
    galleryAlt: "A finance specialist reviewing documents beside a finance review board",
    galleryPortrait: true,
  },
  {
    slug: "enterprise-engineering",
    number: "03",
    group: "technology",
    title: "Enterprise Engineering",
    industry: "Enterprise Engineering",
    plain:
      "Legacy systems and disconnected processes slow organisations down. Engineering, integration and modernisation turn them into measurable improvements.",
    short:
      "Enterprise software development, systems integration, legacy modernisation and infrastructure engineering across industries.",
    intro: "We design, build, connect and modernise the systems businesses depend on, across industries.",
    capabilities: [
      "Enterprise software development",
      "Systems integration",
      "Legacy systems modernisation",
      "Enterprise infrastructure engineering",
      "Business systems development and maintenance",
      "Custom technical project delivery",
    ],
    image: "/images/enterprise-transformation.webp",
    imageAlt: "Engineers at their desks working through a system problem together",
    related: { label: "Outsource a team", href: "/outsourced-development" },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
