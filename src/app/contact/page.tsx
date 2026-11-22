import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Reveal } from "@/components/ui/Reveal";
import { site, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Blackroid to discuss your organisation's needs.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { title: "We read your enquiry", text: "The team reviews what you've shared." },
  { title: "We talk", text: "A short call to understand your goals." },
  { title: "You get a clear approach", text: "Next steps, scope and cost." },
];

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const initialService = Array.isArray(service) ? service[0] : service;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={unsplash("photo-1517245386807-bb43f82c33c4")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/55 to-navy-950/40" />
        </div>
        <div className="container-site pt-36 pb-32 lg:pt-44 lg:pb-44">
          <h1 className="rise max-w-4xl text-display font-light text-balance">Contact us.</h1>
        </div>
      </section>

      <section className="relative z-10 bg-paper pb-24 lg:pb-32">
        <div className="container-site -mt-20 grid gap-10 lg:-mt-28 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={0.05} className="lg:col-span-7">
            <ContactForm initialService={initialService} publicEmail={site.publicEmail || undefined} />
          </Reveal>

          <aside className="lg:col-span-4 lg:col-start-9 lg:pt-36">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-xl font-light tracking-tight text-ink">What happens next</h2>
              <ol className="mt-6 border-t border-line-strong">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-5 border-b border-line-strong py-5">
                    <span className="font-mono text-xs leading-7 text-accent">0{i + 1}</span>
                    <div>
                      <h3 className="text-ink">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10">
                <h2 className="text-xl font-light tracking-tight text-ink">Prefer to talk?</h2>
                <ul className="mt-6 border-t border-line-strong">
                  <li className="border-b border-line-strong">
                    <a href={`tel:${site.phone}`} className="group flex items-center gap-4 py-4">
                      <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 text-accent" />
                      <span className="text-ink transition-colors group-hover:text-accent">{site.phoneDisplay}</span>
                    </a>
                  </li>
                  <li className="border-b border-line-strong">
                    <a
                      href={site.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-4"
                    >
                      <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 text-accent" />
                      <span className="text-ink transition-colors group-hover:text-accent">Chat on WhatsApp</span>
                    </a>
                  </li>
                  {site.publicEmail && (
                    <li className="border-b border-line-strong">
                      <a href={`mailto:${site.publicEmail}`} className="group flex items-center gap-4 py-4">
                        <Mail aria-hidden="true" strokeWidth={1.5} className="size-5 text-accent" />
                        <span className="text-ink transition-colors group-hover:text-accent">{site.publicEmail}</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* "Recognise the problem?": each item pre-selects the matching service in the form above. */}
      <div className="border-t border-line-strong">
        <SelectedWork />
      </div>
    </>
  );
}
