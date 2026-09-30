import { faq } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { Accordion } from "@/components/ui/Accordion";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="Preguntas frecuentes" lines={["Respuestas", "claras."]}>
            <p className="lead mt-8 max-w-sm text-ink-muted">
              Las dudas más habituales antes de consultar un caso de extranjería.
            </p>
          </SectionHeading>
        </div>
        <TextReveal className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faq} />
          <Disclaimer className="mt-10" />
        </TextReveal>
      </div>
    </section>
  );
}
