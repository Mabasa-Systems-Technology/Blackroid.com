import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { ServicesList } from "@/components/ServicesList";
import { serviceGroups, services } from "@/lib/services";

export const metadata = pageMetadata({
  title: "Operational Services and Enterprise Engineering",
  description:
    "Managed operational outcomes for insurance and financial services, plus enterprise engineering across industries. We begin with a focused engagement and expand as results are shown.",
  path: "/services",
});

export default function ServicesPage() {
  const managed = serviceGroups.managed;
  const technology = serviceGroups.technology;

  return (
    <>
      <PageHero title="Your operations. Our responsibility." compact />

      <section className="bg-white py-16 lg:py-28">
        <div className="container-site">
          <ServicesList items={services.filter((s) => s.group === "managed")} />
          {managed.note && <p className="mt-6 text-sm text-muted">{managed.note}</p>}
        </div>
      </section>

      {services
        .filter((s) => s.group === "technology")
        .map((s) => (
          <EnterpriseSection
            key={s.slug}
            service={s}
            label={technology.title}
            heading="Need it built, connected or modernised? We engineer it."
          />
        ))}

      <CtaBand />
    </>
  );
}
