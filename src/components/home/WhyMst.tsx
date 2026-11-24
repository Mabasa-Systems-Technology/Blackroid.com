import { Gauge, Layers, Target } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export const benefits = [
  {
    icon: Gauge,
    title: "Operational Efficiency",
    text: "Less time and cost spent on repetitive, complex processes, so your people can focus on the work that grows the business.",
  },
  {
    icon: Layers,
    title: "Specialist Execution",
    text: "Intelligent infrastructure and professional expertise working together, so the work is done properly and reliably.",
  },
  {
    icon: Target,
    title: "Business Outcomes",
    text: "Work that is completed, consistent quality, and operational improvements you can measure.",
  },
];

export function WhyMst() {
  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              title="What you gain."
              lead="What changes when the work is handed to a specialist partner."
            />
          </div>
        </div>

        <ol className="border-t border-ink lg:col-span-7">
          {benefits.map((b, i) => (
            <li key={b.title} className="border-b border-line-strong">
              <Reveal delay={i * 0.08}>
                <article className="group grid gap-5 py-9 transition-colors duration-500 sm:grid-cols-[auto_1fr] sm:gap-8 lg:py-12">
                  <div className="flex items-center gap-5 sm:block">
                    <span className="flex size-14 items-center justify-center rounded-full bg-accent-wash text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                      <b.icon aria-hidden="true" strokeWidth={1.5} className="size-6" />
                    </span>
                    <span className="font-mono text-xs text-muted sm:mt-5 sm:block">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light tracking-tight lg:text-3xl">{b.title}</h3>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-soft">{b.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
