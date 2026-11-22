import { Gauge, Layers, Target } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export const benefits = [
  {
    icon: Gauge,
    title: "Operational Efficiency",
    text: "Reduce time spent managing repetitive and complex business processes.",
  },
  {
    icon: Layers,
    title: "Specialist Execution",
    text: "Combine intelligent infrastructure with professional expertise to deliver dependable services.",
  },
  {
    icon: Target,
    title: "Business Outcomes",
    text: "Focus on completed work, service quality, and measurable operational improvements.",
  },
];

export function WhyMst() {
  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading title="What you gain." />
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line lg:col-span-7">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="h-full">
              <article className="group flex h-full items-start gap-6 bg-white p-8 transition-colors duration-500 hover:bg-accent-wash/60 lg:gap-8 lg:p-10">
                <b.icon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-8 shrink-0 text-accent transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                />
                <div>
                  <h3 className="text-2xl font-light tracking-tight">{b.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{b.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
