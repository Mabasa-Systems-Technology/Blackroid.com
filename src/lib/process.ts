export type Stage = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  activities: string[];
  deliverables: string[];
  fromYou: string[];
};

export const stages: Stage[] = [
  {
    number: "01",
    title: "Understand",
    summary: "Identify the operational challenge, its business impact and the limits of existing processes.",
    detail:
      "We start with how the work is done today and what it costs: the delays, the manual effort and the impact on the business.",
    activities: [
      "Process walkthroughs and stakeholder conversations",
      "Review of volumes, turnaround times and costs",
      "Identification of constraints, risks and dependencies",
      "Agreement on what needs to improve",
    ],
    deliverables: ["Summary of findings", "Operational challenge and business impact", "Initial options"],
    fromYou: ["Access to key people and process information", "Context on priorities and constraints"],
  },
  {
    number: "02",
    title: "Establish Value",
    summary: "Define measurable improvements and begin with a focused assessment or commercial engagement.",
    detail:
      "Before anything scales, we agree what will be measured and what it is worth. We start small, with a scope and a price to match.",
    activities: [
      "Definition of measurable improvements",
      "Focused assessment or pilot engagement",
      "Agreement on scope, boundaries and approvals",
      "Commercial terms and success measures",
    ],
    deliverables: [
      "Measurable improvement targets",
      "Scoped engagement proposal",
      "Agreed security and governance boundaries",
    ],
    fromYou: ["Feedback on priorities", "Sign-off on scope and boundaries"],
  },
  {
    number: "03",
    title: "Deliver",
    summary: "Execute the agreed work within clearly defined operational, security and governance boundaries.",
    detail:
      "We deliver in visible stages, within the access, data protection and approval limits agreed with you. You see results as they arrive.",
    activities: [
      "Delivery against the agreed scope and targets",
      "Work within agreed security, data protection and approval boundaries",
      "Regular progress and performance reporting",
      "Handover and documentation",
    ],
    deliverables: ["Delivered improvements", "Performance against agreed measures", "Documentation and handover"],
    fromYou: ["Regular reviews", "Timely decisions and approvals"],
  },
  {
    number: "04",
    title: "Scale",
    summary:
      "Expand into recurring managed operations once performance, trust and delivery requirements have been demonstrated.",
    detail:
      "Where the results justify it, we take on more: a wider scope, or a recurring managed operation. Responsibility is earned in steps, not requested up front.",
    activities: [
      "Review of results against agreed measures",
      "Agreement on extended or recurring scope",
      "Capacity and governance planning",
      "Ongoing performance reporting",
    ],
    deliverables: ["Outcome review", "Proposal for extended or recurring operations"],
    fromYou: ["Feedback on results", "Decision on expanding scope"],
  },
];
