import type { Service } from "@/data/services";
import { Accordion } from "@/components/ui/Accordion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function ServiceFAQ({ service }: { service: Service }) {
  return (
    <section aria-labelledby="service-faq" className="section-y bg-paper">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <TextReveal>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
          </TextReveal>
          <TextReveal delay={80}>
            <h2 id="service-faq" className="display-3 mt-6 text-navy">
              Dudas sobre {service.title.toLowerCase()}
            </h2>
          </TextReveal>
        </div>
        <TextReveal className="lg:col-span-7 lg:col-start-6">
          <Accordion items={service.faqs} />
          <Disclaimer className="mt-10" />
        </TextReveal>
      </div>
    </section>
  );
}
