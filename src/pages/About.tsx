import { breadcrumbSchema } from "@/lib/seo";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { About as AboutBlock } from "@/components/home/About";
import { TrustSection } from "@/components/home/TrustSection";
import { Process } from "@/components/home/Process";
import { ConversionCTA } from "@/components/home/ConversionCTA";

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "La asesoría", path: "/asesoria" },
];

export default function About() {
  return (
    <>
      <Seo
        title="La Asesoría | Asesoría Sefoz, Extranjería en Madrid"
        description="Asesoría Sefoz centra su actividad en extranjería y legalización en Madrid. Claridad, atención personalizada y especialización en cada consulta."
        path="/asesoria"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="La asesoría" lines={["Especialistas", "en extranjería."]}>
        <p className="lead max-w-xl text-ink-muted">
          Claridad para cada paso: escuchamos tu caso, lo analizamos y te explicamos las opciones de
          forma comprensible.
        </p>
      </PageHero>
      <AboutBlock showLink={false} />
      <TrustSection />
      <Process />
      <ConversionCTA />
    </>
  );
}
