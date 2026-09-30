import { featuredServices, secondaryServices } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { useConsultHref } from "@/hooks/useConsultHref";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceCard, ServiceRow } from "@/components/services/ServiceCard";

/**
 * Servicios: 4 entradas principales grandes + lista premium en dos columnas.
 * No se afirma que sean "los más demandados".
 */
export function Services({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const consultHref = useConsultHref("no-lo-se");

  return (
    <section id="servicios" aria-labelledby="services-title" className="section-y bg-ivory">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="services-title"
            as={headingAs}
            eyebrow="Extranjería"
            lines={["Un procedimiento", "para cada situación."]}
            className="lg:col-span-7"
          />
          <TextReveal className="lg:col-span-4 lg:col-start-9">
            <p className="lead text-ink-muted">
              Conoce los principales servicios de Asesoría Sefoz. Cada procedimiento se valora según
              las circunstancias de la persona.
            </p>
          </TextReveal>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-2 md:gap-5 lg:mt-20">
          {featuredServices.map((s, i) => (
            <TextReveal as="li" key={s.id} delay={(i % 2) * 90}>
              <ServiceCard service={s} className="h-full" />
            </TextReveal>
          ))}
        </ul>

        <div className="mt-16 lg:mt-24">
          <p className="micro text-steel">Otros procedimientos</p>
          <div className="mt-6 grid gap-x-14 border-t border-navy/12 md:grid-cols-2">
            <ul>
              {secondaryServices.slice(0, Math.ceil(secondaryServices.length / 2)).map((s) => (
                <ServiceRow key={s.id} service={s} />
              ))}
            </ul>
            <ul>
              {secondaryServices.slice(Math.ceil(secondaryServices.length / 2)).map((s) => (
                <ServiceRow key={s.id} service={s} />
              ))}
            </ul>
          </div>
        </div>

        {/* CTA intermedio tras servicios */}
        <TextReveal className="mt-16 flex flex-col gap-6 rounded-lg border border-navy/12 bg-paper p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-serif text-[1.75rem] leading-tight font-semibold text-navy md:text-[2rem]">
              ¿No encuentras tu caso en la lista?
            </p>
            <p className="mt-2 text-ink-muted">
              Explícanos tu situación y estudiaremos qué vías conviene revisar.
            </p>
          </div>
          <ButtonLink
            to={consultHref}
            arrow
            className="shrink-0"
            onClick={() => trackEvent("click_consult_case", { location: "services" })}
          >
            Consultar mi caso
          </ButtonLink>
        </TextReveal>
      </div>
    </section>
  );
}
