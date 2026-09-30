import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/seo";
import { Seo } from "@/components/seo/Seo";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Introduction } from "@/components/home/Introduction";
import { Services } from "@/components/home/Services";
import { SituationSelector } from "@/components/home/SituationSelector";
import { Process } from "@/components/home/Process";
import { TrustSection } from "@/components/home/TrustSection";
import { About } from "@/components/home/About";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { Hours } from "@/components/home/Hours";
import { FAQ } from "@/components/home/FAQ";
import { ContactSection } from "@/components/home/ContactSection";
import { FacebookBand } from "@/components/home/FacebookBand";

export default function Home() {
  return (
    <>
      <Seo
        title="Asesoría Sefoz | Abogado de Extranjería en Madrid"
        description="Asesoría especializada en extranjería en Madrid: nacionalidad, arraigo, residencia, reagrupación familiar, permisos de trabajo, renovaciones y más. Consulta tu caso."
        path="/"
        jsonLd={[faqSchema(faq)]}
      />
      <Hero />
      <TrustStrip />
      <Introduction />
      <Services />
      <SituationSelector />
      <Process />
      <TrustSection />
      <About />
      <ConversionCTA />
      <Hours />
      <FAQ />
      <ContactSection />
      <FacebookBand />
    </>
  );
}
