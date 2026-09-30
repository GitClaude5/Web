import { business } from "@/data/business";
import { breadcrumbSchema } from "@/lib/seo";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { ContactSection } from "@/components/home/ContactSection";
import { Hours } from "@/components/home/Hours";
import { FacebookBand } from "@/components/home/FacebookBand";

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Contacto", path: "/contacto" },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contacto | Asesoría Sefoz, Abogado de Extranjería en Madrid"
        description={`Consulta tu caso de extranjería con Asesoría Sefoz en Madrid. Llámanos al ${business.phoneDisplay} o envíanos tu consulta.`}
        path="/contacto"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Contacto · Madrid" lines={["Tu caso empieza", "por contarlo."]}>
        <p className="lead max-w-xl text-ink-muted">
          Explícanos brevemente tu situación y contactaremos contigo para valorar cómo podemos ayudarte.
        </p>
      </PageHero>
      <ContactSection />
      <Hours />
      <FacebookBand />
    </>
  );
}
