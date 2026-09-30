import { breadcrumbSchema } from "@/lib/seo";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { Services as ServicesGrid } from "@/components/home/Services";
import { SituationSelector } from "@/components/home/SituationSelector";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { Disclaimer } from "@/components/ui/Disclaimer";

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Servicios de Extranjería en Madrid | Asesoría Sefoz"
        description="Nacionalidad, arraigo, residencia, reagrupación familiar, asilo y refugio, permisos de trabajo, renovaciones y más. Asesoría especializada en extranjería en Madrid."
        path="/servicios"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Servicios · Extranjería · Madrid" lines={["Extranjería,", "paso a paso."]}>
        <p className="lead max-w-xl text-ink-muted">
          Consulta los principales procedimientos en los que puede ayudarte Asesoría Sefoz.
        </p>
      </PageHero>
      <ServicesGrid />
      <SituationSelector />
      <ConversionCTA />
      <div className="container-x py-10">
        <Disclaimer />
      </div>
    </>
  );
}
