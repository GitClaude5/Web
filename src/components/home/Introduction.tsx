import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextLink } from "@/components/ui/Button";

export function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="section-y pb-0 md:pb-0">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          id="intro-title"
          eyebrow="Asesoría Sefoz"
          lines={["Cuando el trámite", "es complejo,", "la información", "debe ser clara."]}
          className="lg:col-span-7"
        />
        <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
          <LineReveal className="mb-10 w-16" />
          <TextReveal>
            <p className="lead text-graphite">
              Cada caso es diferente. Analizamos tu situación y te orientamos sobre las opciones y
              próximos pasos que conviene valorar.
            </p>
          </TextReveal>
          <TextReveal delay={100}>
            <p className="mt-6 text-ink-muted">
              Sin promesas vacías ni tecnicismos innecesarios: una explicación comprensible de tu
              situación y de lo que puede hacerse.
            </p>
          </TextReveal>
          <TextReveal delay={160} className="mt-8">
            <TextLink to="/#como-trabajamos">Cómo trabajamos</TextLink>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
