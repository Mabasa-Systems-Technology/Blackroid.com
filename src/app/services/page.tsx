import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { ServicesList } from "@/components/ServicesList";
import { Reveal } from "@/components/ui/Reveal";
import { serviceGroups, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Managed business services for insurance, healthcare and financial operations, and enterprise technology and transformation, delivered with AI-powered infrastructure and specialist expertise.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const managed = serviceGroups.managed;
  const technology = serviceGroups.technology;

  return (
    <>
      <PageHero title="Services." compact />

      <section className="bg-white py-16 lg:py-28">
        <div className="container-site">
          <Reveal className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:gap-16">
            <h2 className="text-headline font-light text-balance lg:col-span-6">{managed.title}</h2>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="text-lg leading-relaxed text-ink-soft">{managed.intro}</p>
              {managed.note && <p className="mt-4 text-sm text-muted">{managed.note}</p>}
            </div>
          </Reveal>
          <ServicesList items={services.filter((s) => s.group === "managed")} />
        </div>
      </section>

      {services
        .filter((s) => s.group === "technology")
        .map((s) => (
          <EnterpriseSection key={s.slug} service={s} title={technology.title} intro={technology.intro} />
        ))}

      <CtaBand />
    </>
  );
}
