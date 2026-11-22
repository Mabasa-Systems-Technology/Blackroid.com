import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { Reveal } from "./ui/Reveal";
import meeting from "../../public/images/enterprise-meeting.webp";
import engineering from "../../public/images/enterprise-engineering.webp";

/**
 * Enterprise Technology & Transformation, laid out on its own: capabilities as an open grid
 * beside two photographs, instead of the accordion used for the managed services.
 */
export function EnterpriseSection({ service, title, intro }: { service: Service; title: string; intro: string }) {
  return (
    <section className="bg-paper py-20 lg:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="text-headline font-light text-balance">{title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-10">
              {service.capabilities.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 border-b border-line-strong py-4 text-[1.0625rem] text-ink"
                >
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex h-12 items-center rounded-[3px] bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-accent-deep"
              >
                Learn more
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent"
              >
                Contact us
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Two photographs: a wide one with a tall one overlapping its corner. */}
        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="relative pb-16 sm:pb-24">
            <div className="relative ml-auto aspect-[3/2] w-[88%] overflow-hidden rounded-[4px] rounded-tr-[56px] bg-navy-900">
              <Image
                src={meeting}
                alt="A team meeting around a conference table"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 aspect-[2/3] w-[38%] overflow-hidden rounded-[4px] border-[6px] border-paper bg-navy-900 sm:border-8">
              <Image
                src={engineering}
                alt="Two engineers reviewing code on a laptop"
                fill
                sizes="(min-width: 1024px) 18vw, 35vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
