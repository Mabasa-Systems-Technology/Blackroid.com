import { Gauge, Target, Timer } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export const benefits = [
  { icon: Gauge, title: "Lower cost", text: "Less spend on complex, manual processes." },
  { icon: Timer, title: "Faster turnaround", text: "Work moves through instead of queuing." },
  { icon: Target, title: "Measurable results", text: "Targets agreed up front, then tracked." },
];

export function WhyMst() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="container-site">
        <SectionHeading title="What you gain." />

        <ol className="mt-14 grid border-t border-ink sm:grid-cols-3 lg:mt-20">
          {benefits.map((b, i) => (
            <li key={b.title} className="border-b border-line-strong sm:border-r sm:border-b-0 sm:last:border-r-0">
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col gap-10 px-0 py-10 transition-colors duration-500 sm:px-8 sm:py-12 sm:first:pl-0 sm:last:pr-0 lg:gap-14 lg:px-10">
                  {/* A thin accent line draws across the top on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-px hidden h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 sm:block"
                  />
                  <div className="flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-full border border-line-strong text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <b.icon aria-hidden="true" strokeWidth={1.5} className="size-6" />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-light tracking-tight lg:text-4xl">{b.title}</h3>
                    <p className="mt-3 text-lg text-ink-soft">{b.text}</p>
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
