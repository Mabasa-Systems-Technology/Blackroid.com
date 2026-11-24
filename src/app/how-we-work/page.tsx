import { pageMetadata } from "@/lib/seo";
import { Plus } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { stages } from "@/lib/process";

export const metadata = pageMetadata({
  title: "How We Work: Understand, Establish Value, Deliver, Scale",
  description:
    "Four stages: understand, establish value, deliver, then scale into managed operations as trust and results grow.",
  path: "/how-we-work",
});

const models = [
  {
    title: "Focused assessment",
    text: "A short engagement to find the problem and size the improvement.",
  },
  {
    title: "Defined-scope project",
    text: "A clearly specified outcome delivered against an agreed scope, timeline and budget.",
  },
  {
    title: "Recurring managed operations",
    text: "A continuing arrangement, once results and trust have been established.",
  },
  {
    title: "Engineering project",
    text: "Enterprise software, integration and modernisation, delivered as a project.",
  },
];

const faqs = [
  {
    q: "How does an engagement usually start?",
    a: "With a conversation about the operation. If there is a fit, we propose a focused assessment to establish the problem, its cost and what a measurable improvement would look like, before committing to a wider scope.",
  },
  {
    q: "Can you work alongside our internal teams?",
    a: "Yes. Engagements can be structured so our specialists work alongside your people, with clear ownership and defined points of accountability.",
  },
  {
    q: "Can you work on an existing system someone else built?",
    a: "Yes. We typically begin with a technical review of the codebase and infrastructure, then recommend whether to improve, extend, stabilise or gradually replace it.",
  },
  {
    q: "How do you price engagements?",
    a: "Pricing depends on scope and engagement model. A focused assessment or defined-scope engagement is usually quoted as a fixed or phased price. Recurring managed operations are agreed once results are shown, on an arrangement that suits both sides.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "That depends entirely on scope. We would rather give a realistic estimate after understanding the challenge than a quick number that proves wrong. Larger programmes are phased so value arrives early.",
  },
  {
    q: "How do you handle confidential information and personal data?",
    a: "We are happy to sign a non-disclosure agreement before detailed discussions. Every engagement runs within agreed contractual, security, data protection and approval boundaries, and we only access what the work needs.",
  },
].slice(0, 4);

export default function HowWeWorkPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero title="We earn responsibility, step by step." />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-site">
          {stages.map((s) => (
            <article
              key={s.number}
              id={`stage-${s.number}`}
              className="relative grid scroll-mt-28 gap-10 border-t border-line py-16 first:border-t-0 lg:grid-cols-12 lg:py-24"
            >
              <Reveal className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <p className="text-[clamp(4rem,9vw,8rem)] leading-none font-light tracking-tight text-accent">
                    {s.number}
                  </p>
                  <h2 className="mt-6 text-headline font-light">{s.title}</h2>
                </div>
              </Reveal>
              <div className="space-y-12 lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <h3 className="eyebrow text-accent">Activities</h3>
                  <ul className="mt-5 border-t border-line">
                    {s.activities.slice(0, 3).map((a) => (
                      <li key={a} className="border-b border-line py-4 text-lg font-light text-ink">
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal>
                  <div>
                    <h3 className="eyebrow text-muted">Deliverables</h3>
                    <ul className="mt-5 space-y-3">
                      {s.deliverables.slice(0, 2).map((d) => (
                        <li key={d} className="flex gap-3 text-ink-soft">
                          <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-900 py-24 text-white lg:py-36">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="text-headline font-light text-balance">Structured around how you want to invest.</h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06} className="h-full">
                <div className="h-full bg-navy-900 p-8 transition-colors duration-500 hover:bg-navy-800">
                  <p className="font-mono text-xs text-accent-soft">0{i + 1}</p>
                  <h3 className="mt-10 text-xl font-light">{m.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-paper py-24 lg:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-title font-light">Frequently asked.</h2>
          </Reveal>
          <div className="border-t border-line-strong lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line-strong">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
