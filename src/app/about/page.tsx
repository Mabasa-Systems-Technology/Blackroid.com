import type { Metadata } from "next";
import Image from "next/image";
import {
  BarChart3,
  Cpu,
  Gauge,
  HeartPulse,
  Landmark,
  PackageCheck,
  ShieldCheck,
  Target,
  UserCheck,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
// import { Leadership } from "@/components/Leadership"; // hidden for now: "The people behind the work."
import { Principles } from "@/components/Principles";
import { Reveal } from "@/components/ui/Reveal";
import { unsplash } from "@/lib/site";
import markLight from "../../../public/brand/mark-light.png";
import aboutHero from "../../../public/images/about-hero.webp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Blackroid is a South African AI-native services company combining AI-powered infrastructure with specialist expertise to deliver complete business services.",
  alternates: { canonical: "/about" },
};

const principles = [
  { icon: Target, label: "Business outcomes before technology" },
  { icon: PackageCheck, label: "Complete service delivery" },
  { icon: Gauge, label: "Operational efficiency and accountability" },
  { icon: UserCheck, label: "Specialist expertise supported by AI" },
  { icon: BarChart3, label: "Reliable and measurable results" },
];

const focus = [
  { icon: ShieldCheck, label: "Insurance" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Landmark, label: "Finance" },
  { icon: Cpu, label: "Technology" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={aboutHero}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/55" />
        </div>
        <div className="container-site grid items-center gap-12 pt-40 pb-16 lg:min-h-[72svh] lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <h1 className="rise text-headline font-light text-balance">We take responsibility for the work.</h1>
          </div>
          {/* The official B monogram, large, to balance the text column. */}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <Image src={markLight} alt="" priority className="h-[22rem] w-auto" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-36">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <h2 className="text-headline font-light text-balance">About.</h2>
            </Reveal>
            <Reveal
              delay={0.1}
              className="space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7"
            >
              <p>
                Blackroid is a South African AI-native services company helping businesses operate more efficiently,
                reduce costs, and achieve better outcomes.
              </p>
              <p>
                We combine AI-powered infrastructure with specialist expertise to take on complex business operations,
                manage critical processes, and deliver complete services.
              </p>
              <p>
                Our clients focus on growing their businesses while we take responsibility for the work behind them.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2">
            {[
              { title: "Our principles", items: principles },
              { title: "Where we focus", items: focus },
            ].map((panel, i) => (
              <Reveal key={panel.title} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-[4px] border border-line bg-paper p-8 lg:p-12">
                  <h3 className="text-2xl font-light tracking-tight lg:text-3xl">{panel.title}</h3>
                  <ul className="mt-8 space-y-5">
                    {panel.items.map((item) => (
                      <li key={item.label} className="flex items-center gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-accent">
                          <item.icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                        </span>
                        <span className="text-lg text-ink">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden for now ("The people behind the work."); restore by uncommenting this and the import above. */}
      {/* <Leadership /> */}

      <section className="relative isolate -mt-20 overflow-hidden rounded-t-[3rem] bg-navy-950 lg:-mt-28 lg:rounded-t-[6rem]">
        <div className="relative aspect-[16/9] max-h-[640px] w-full sm:aspect-[21/9]">
          <Image
            src={unsplash("photo-1636706519609-988babca3dd5")}
            alt="Aerial view of the Johannesburg skyline"
            fill
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"
          />
          <div className="container-site absolute inset-x-0 bottom-0 pb-10">
            <p className="max-w-xl text-xl font-light text-white lg:text-2xl">Based in South Africa.</p>
          </div>
        </div>
      </section>

      <Principles />
      <CtaBand />
    </>
  );
}
