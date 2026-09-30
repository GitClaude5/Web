import { useEffect } from "react";
import { useParams } from "react-router";
import { getService } from "@/data/services";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { Seo } from "@/components/seo/Seo";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceContent } from "@/components/services/ServiceContent";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { RelatedServices } from "@/components/services/RelatedServices";
import NotFound from "./NotFound";

export default function Service() {
  const { slug = "" } = useParams();
  const service = getService(slug);

  useEffect(() => {
    if (service) trackEvent("view_service", { service: service.slug });
  }, [service]);

  if (!service) return <NotFound />;

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: service.title, path: `/${service.slug}` },
  ];

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        path={`/${service.slug}`}
        jsonLd={[
          breadcrumbSchema(crumbs),
          faqSchema(service.faqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.heroTitle,
            serviceType: service.sourceName,
            description: service.shortDescription,
            areaServed: { "@type": "City", name: "Madrid" },
            provider: { "@type": "LegalService", name: "Asesoría Sefoz" },
          },
        ]}
      />
      <ServiceHero service={service} crumbs={crumbs} />
      <ServiceContent service={service} />
      <ServiceFAQ service={service} />
      <ConversionCTA subject={service.formSubject} />
      <RelatedServices current={service} />
    </>
  );
}
