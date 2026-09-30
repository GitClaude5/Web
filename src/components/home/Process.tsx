import { useRef } from "react";
import { m, useScroll, useSpring, useReducedMotion } from "motion/react";
import { processSteps } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { useConsultHref } from "@/hooks/useConsultHref";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";

/** Proceso en 4 pasos. Línea champagne que crece 0→100% con el scroll. */
export function Process({ withCta = true }: { withCta?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const consultHref = useConsultHref();

  return (
    <section id="como-trabajamos" aria-labelledby="process-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="process-title"
            eyebrow="Cómo trabajamos"
            lines={["Menos incertidumbre.", "Más claridad."]}
            className="lg:col-span-8"
          />
          <TextReveal className="lg:col-span-4">
            <p className="lead text-ink-muted">
              Un método sencillo para que sepas en todo momento en qué punto está tu consulta.
            </p>
          </TextReveal>
        </div>

        <ol ref={ref} className="relative mt-16 grid gap-10 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          {/* Línea base + progreso (horizontal en desktop, vertical en móvil) */}
          <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-navy/10 lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" />
          <m.span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gold lg:hidden"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          <m.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gold lg:block"
            style={{ scaleX: reduce ? 1 : progress }}
          />

          {processSteps.map((step, i) => (
            <TextReveal as="li" key={step.number} delay={i * 110} className="relative pl-10 lg:pl-0 lg:pt-14">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-gold bg-ivory lg:top-0"
              >
                <span className="absolute inset-[4px] rounded-full bg-gold" />
              </span>
              <p className="micro text-bronze">{step.number}</p>
              <h3 className="mt-3 font-serif text-[1.7rem] leading-[1.08] font-semibold text-navy md:text-[1.9rem]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-[0.98rem] leading-relaxed text-ink-muted">{step.text}</p>
            </TextReveal>
          ))}
        </ol>

        {withCta && (
          <TextReveal className="mt-16 lg:mt-20">
            <ButtonLink
              to={consultHref}
              arrow
              onClick={() => trackEvent("click_consult_case", { location: "process" })}
            >
              Empezar por el paso 01
            </ButtonLink>
          </TextReveal>
        )}
      </div>
    </section>
  );
}
