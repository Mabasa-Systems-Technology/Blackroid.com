import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, PackageCheck, Plug, RefreshCw, Server, Wrench } from "lucide-react";
import type { Service } from "@/lib/services";
import { Reveal } from "./ui/Reveal";
import meeting from "../../public/images/enterprise-meeting.webp";
import engineering from "../../public/images/enterprise-engineering.webp";

/** Short labels with an icon each, so the section can be scanned in a few seconds. */
const highlights = [
  { icon: Code, label: "Enterprise software development" },
  { icon: Plug, label: "Systems integration" },
  { icon: RefreshCw, label: "Legacy modernisation" },
  { icon: Server, label: "Infrastructure engineering" },
  { icon: Wrench, label: "Business systems maintenance" },
  { icon: PackageCheck, label: "Custom project delivery" },
];

/**
 * Enterprise Engineering, laid out on its own: a selling heading, six icon tiles
 * and two photographs, instead of the accordion used for the managed services.
 */
export function EnterpriseSection({ service, label, heading }: { service: Service; label: string; heading: string }) {
  return (
    <section className="bg-paper py-20 lg:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-accent uppercase">{label}</p>
            <h2 className="mt-4 text-headline font-light text-balance">{heading}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {highlights.map((h) => (
                <li
                  key={h.label}
                  className="flex flex-col gap-4 rounded-[4px] border border-line bg-white p-5 transition-colors duration-300 hover:border-accent/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent-wash text-accent">
                    <h.icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-ink">{h.label}</span>
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
