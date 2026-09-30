import { business } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { TextLink } from "@/components/ui/Button";
import { SignVisual } from "@/components/art/SignVisual";
import { LawyerProfile } from "@/components/home/LawyerProfile";

/** "La asesoría". Sin biografía inventada. */
export function About({ showLink = true }: { showLink?: boolean }) {
  return (
    <section aria-labelledby="about-title" className="section-y">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <SignVisual className="lg:col-span-5" />
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            id="about-title"
            eyebrow={business.name}
            lines={["Extranjería", "con un trato", "más cercano."]}
          />
          <TextReveal delay={120}>
            <p className="lead mt-8 max-w-xl text-graphite">
              Asesoría Sefoz centra su actividad en extranjería y legalización, ayudando a comprender
              procedimientos que muchas veces resultan complejos para quien los afronta por primera
              vez.
            </p>
          </TextReveal>
          <TextReveal delay={180}>
            <p className="mt-6 max-w-xl text-ink-muted">
              Nuestro foco es uno: la extranjería. Esa especialización nos permite escuchar cada caso
              con atención y explicarlo con claridad.
            </p>
          </TextReveal>
          <LawyerProfile />
          {showLink && (
            <TextReveal delay={220} className="mt-10">
              <TextLink to="/asesoria">Conocer la asesoría</TextLink>
            </TextReveal>
          )}
        </div>
      </div>
    </section>
  );
}
