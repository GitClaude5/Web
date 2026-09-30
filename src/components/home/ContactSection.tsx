import { MapPin, Phone, Clock } from "lucide-react";
import { BOOKING_URL, business, telHref } from "@/data/business";
import { TextLink } from "@/components/ui/Button";
import { HOURS_SUMMARY } from "@/data/openingHours";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { OpeningStatusBadge } from "@/components/ui/OpeningStatusBadge";
import { CaseConsultationForm } from "@/components/forms/CaseConsultationForm";

/** Contacto: teléfono, horario, Madrid y formulario. Sin mapa hasta confirmar dirección. */
export function ContactSection({
  id = "consulta",
  headingAs = "h2",
}: {
  id?: string;
  headingAs?: "h1" | "h2";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y bg-navy text-ivory">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id={`${id}-title`}
            as={headingAs}
            tone="light"
            eyebrow="Contacto"
            lines={["Empieza", "contándonos", "tu situación."]}
          >
            <p className="lead mt-8 max-w-md text-ivory/75">
              Rellena el formulario o llámanos. Revisaremos tu consulta y contactaremos contigo.
            </p>
          </SectionHeading>

          <TextReveal delay={200}>
            <dl className="mt-12 space-y-7 border-t border-ivory/12 pt-10">
              <div className="flex gap-5">
                <dt className="sr-only">Teléfono</dt>
                <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <dd>
                  <a
                    href={telHref}
                    onClick={() => trackEvent("click_phone", { location: "contact" })}
                    className="font-serif text-[2rem] leading-none font-semibold lining-nums tabular-nums transition-colors hover:text-gold"
                  >
                    {business.phoneDisplay}
                  </a>
                  <p className="mt-2 text-[0.9rem] text-ivory/60">Atención telefónica en horario de apertura.</p>
                </dd>
              </div>
              <div className="flex gap-5">
                <dt className="sr-only">Horario</dt>
                <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <dd>
                  <ul className="space-y-1 text-ivory/85">
                    {HOURS_SUMMARY.map((h) => (
                      <li key={h.label} className="tabular-nums">
                        <span className="inline-block w-10 text-ivory/50">{h.label}</span>
                        {h.value}
                      </li>
                    ))}
                  </ul>
                  <OpeningStatusBadge tone="light" className="mt-4" />
                </dd>
              </div>
              <div className="flex gap-5">
                <dt className="sr-only">Ubicación</dt>
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <dd className="text-ivory/85">{business.city}</dd>
              </div>
            </dl>
            {/* Sin calendario real (BOOKING_URL vacío) → "Solicitar cita" abre el formulario. */}
            <TextLink
              tone="light"
              to={BOOKING_URL || "#formulario"}
              className="mt-8"
              onClick={() => BOOKING_URL && trackEvent("click_booking", { location: "contact" })}
            >
              Solicitar cita
            </TextLink>
          </TextReveal>
        </div>

        <div id="formulario" className="lg:col-span-6 lg:col-start-7">
          <TextReveal>
            <CaseConsultationForm />
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
