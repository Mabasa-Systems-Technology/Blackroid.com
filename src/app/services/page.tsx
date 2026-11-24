import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { ServicesList } from "@/components/ServicesList";
import { serviceGroups, services } from "@/lib/services";

export const metadata = pageMetadata({
  title: "Business Services and Enterprise Technology",
  description:
    "Managed services for insurance, healthcare and finance operations, plus enterprise technology and transformation, powered by AI and specialist expertise.",
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
            heading="Old systems holding you back? We modernise them."
          />
        ))}

      <CtaBand />
    </>
  );
}
