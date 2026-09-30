import { Link } from "react-router";
import { Check } from "lucide-react";
import { business } from "@/data/business";
import { processSteps } from "@/data/content";
import type { Service } from "@/data/services";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}

/** Explicación general · Situaciones habituales · Qué conviene revisar · Cómo trabaja Sefoz. */
export function ServiceContent({ service }: { service: Service }) {
  return (
    <>
      {/* Aviso interno: solo visible en desarrollo */}
      {import.meta.env.DEV && !service.reviewedAt && (
        <div className="border-b border-bronze/30 bg-gold-soft">
          <p className="container-x py-3 text-[0.82rem] font-medium text-bronze">
            [Solo desarrollo] Contenido pendiente de revisión jurídica por Asesoría Sefoz.
          </p>
        </div>
      )}

      <section aria-labelledby="explicacion" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <TextReveal>
              <Eyebrow>Explicación general</Eyebrow>
            </TextReveal>
            <TextReveal delay={80}>
              <h2 id="explicacion" className="display-3 mt-6 text-navy">
                Qué debes saber sobre {service.title.toLowerCase()}
              </h2>
            </TextReveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {service.longDescription.map((p, i) => (
              <TextReveal key={i} delay={i * 80}>
                <p className={i === 0 ? "lead text-graphite" : "mt-6 text-[1.05rem] leading-relaxed text-ink-muted"}>
                  {p}
                </p>
              </TextReveal>
            ))}
            <TextReveal delay={200}>
              <p className="mt-8 border-l-2 border-gold pl-5 font-serif text-[1.35rem] leading-snug font-semibold text-navy">
                {service.requirementsNote}
              </p>
            </TextReveal>
            {service.reviewedAt && (
              <p className="mt-6 text-[0.85rem] text-ink-muted">
                Última revisión: {formatDate(service.reviewedAt)}
                {service.reviewedBy && ` · Revisado por: ${service.reviewedBy}`}
              </p>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="situaciones" className="section-y bg-paper">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-10">
          <div>
            <TextReveal>
              <Eyebrow>Situaciones habituales</Eyebrow>
            </TextReveal>
            <TextReveal delay={80}>
              <h2 id="situaciones" className="display-3 mt-6 max-w-md text-navy">
                Consultas que recibimos con frecuencia
              </h2>
            </TextReveal>
            <ul className="mt-10 border-t border-navy/12">
              {service.situations.map((s, i) => (
                <TextReveal as="li" key={s} delay={i * 70} className="flex gap-5 border-b border-navy/12 py-5">
                  <span className="micro mt-1 w-6 shrink-0 text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.02rem] leading-relaxed text-graphite">{s}</span>
                </TextReveal>
              ))}
            </ul>
          </div>

          <div className="lg:pl-10">
            <TextReveal>
              <Eyebrow>Qué conviene revisar</Eyebrow>
            </TextReveal>
            <TextReveal delay={80}>
              <h2 className="display-3 mt-6 max-w-md text-navy">Lo que analizamos antes de proponer un paso</h2>
            </TextReveal>
            <ul className="mt-10 space-y-4">
              {service.reviewPoints.map((p, i) => (
                <TextReveal as="li" key={p} delay={i * 70} className="flex items-start gap-4 rounded-md border border-navy/10 bg-ivory p-5">
                  <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[1.02rem] leading-relaxed text-graphite">{p}</span>
                </TextReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="como-trabaja" className="section-y">
        <div className="container-x">
          <TextReveal>
            <Eyebrow>Cómo trabaja {business.name}</Eyebrow>
          </TextReveal>
          <TextReveal delay={80}>
            <h2 id="como-trabaja" className="display-2 mt-6 max-w-3xl text-navy">
              Un proceso claro, de principio a fin.
            </h2>
          </TextReveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <li key={step.number}>
                <LineReveal delay={i * 100} className="w-full" />
                <TextReveal delay={i * 100 + 80}>
                  <p className="micro mt-6 text-bronze">{step.number}</p>
                  <h3 className="mt-3 font-serif text-[1.55rem] leading-tight font-semibold text-navy">{step.title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted">{step.text}</p>
                </TextReveal>
              </li>
            ))}
          </ol>
          <TextReveal className="mt-12">
            <Link to="/#como-trabajamos" className="micro nav-underline text-navy">
              Más sobre nuestro método
            </Link>
          </TextReveal>
        </div>
      </section>
    </>
  );
}
