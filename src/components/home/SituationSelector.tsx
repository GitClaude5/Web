import { useId, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { situations } from "@/data/situations";
import { getService, servicePath } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { useConsultHref } from "@/hooks/useConsultHref";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Selector "No sé qué trámite necesito".
 * No realiza conclusiones jurídicas automáticas: solo orienta sobre qué
 * conviene revisar y lleva a contar el caso con el tipo preseleccionado.
 */
export function SituationSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const current = situations.find((s) => s.id === selected) ?? null;
  const consultHref = useConsultHref(current?.subject);

  return (
    <section id="orientacion" aria-labelledby="selector-title" className="section-y bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="selector-title"
            eyebrow="No sé por dónde empezar"
            lines={["No necesitas", "saber el nombre", "del trámite."]}
          >
            <p className="lead mt-8 max-w-md text-ink-muted">
              Explícanos qué quieres resolver. Te indicaremos qué conviene revisar y podrás contarnos
              tu caso.
            </p>
          </SectionHeading>
        </div>

        <div className="lg:col-span-7">
          <TextReveal>
            <fieldset>
              <legend className="micro text-navy">¿Qué necesitas resolver?</legend>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {situations.map((s) => {
                  const active = s.id === selected;
                  const inputId = `sit-${uid}-${s.id}`;
                  return (
                    <div key={s.id}>
                      <input
                        type="radio"
                        id={inputId}
                        name={`situacion-${uid}`}
                        value={s.id}
                        checked={active}
                        onChange={() => {
                          setSelected(s.id);
                          trackEvent("select_situation", { situation: s.id });
                        }}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={inputId}
                        className={cn(
                          "flex min-h-[64px] cursor-pointer items-center justify-between gap-4 rounded-lg border px-5 py-4 text-[0.95rem] font-medium transition-colors duration-300",
                          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-gold-dark",
                          active
                            ? "border-navy bg-navy text-ivory"
                            : "border-navy/12 bg-ivory text-navy hover:border-navy/40",
                        )}
                      >
                        <span>{s.label}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                            active ? "border-gold bg-gold text-navy" : "border-navy/20",
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" strokeWidth={2.4} />}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </TextReveal>

          <div aria-live="polite" className="mt-6 min-h-[260px] sm:min-h-[230px]">
            <AnimatePresence mode="wait" initial={false}>
              {current ? (
                <m.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg border-l-2 border-gold bg-ivory p-7 md:p-9"
                >
                  <p className="micro text-steel">Orientación inicial</p>
                  <p className="mt-4 font-serif text-[1.55rem] leading-[1.2] font-semibold text-navy md:text-[1.8rem]">
                    {current.result}
                  </p>
                  {current.related.length > 0 && (
                    <p className="mt-5 text-[0.92rem] text-ink-muted">
                      Información general relacionada:{" "}
                      {current.related.map((slug, i) => {
                        const svc = getService(slug);
                        if (!svc) return null;
                        return (
                          <span key={slug}>
                            {i > 0 && ", "}
                            <Link
                              to={servicePath(svc)}
                              className="font-medium text-navy underline decoration-gold underline-offset-4 transition-colors hover:text-bronze"
                            >
                              {svc.title}
                            </Link>
                          </span>
                        );
                      })}
                      .
                    </p>
                  )}
                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <ButtonLink
                      to={consultHref}
                      arrow
                      onClick={() => trackEvent("click_consult_case", { location: "selector", situation: current.id })}
                    >
                      {current.ctaLabel}
                    </ButtonLink>
                  </div>
                  <p className="mt-6 text-[0.8rem] text-ink-muted">
                    Esta orientación es general y no sustituye la valoración individual de tu caso.
                  </p>
                </m.div>
              ) : (
                <m.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[inherit] flex-col justify-center rounded-lg border border-dashed border-navy/20 p-7 md:p-9"
                >
                  <p className="font-serif text-[1.45rem] leading-snug font-semibold text-navy/80">
                    Selecciona la opción que mejor describa tu situación.
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-[0.92rem] text-ink-muted">
                    Te explicaremos qué conviene revisar
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
