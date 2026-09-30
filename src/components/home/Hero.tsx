import type { CSSProperties } from "react";
import { business, telHref } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { useConsultHref } from "@/hooks/useConsultHref";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroVisual } from "@/components/art/HeroVisual";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Hero. Entrada escalonada con CSS (no depende de la hidratación → mejor LCP):
 * 100 visual · 250 eyebrow · 350/450/550 líneas H1 · 750 texto · 900 CTA.
 */
export function Hero() {
  const consultHref = useConsultHref();

  return (
    <section aria-labelledby="hero-title" className="grid-lines relative">
      <div className="container-x grid items-center gap-16 pb-24 pt-8 md:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-14">
        <div className="lg:col-span-7 lg:pr-6">
          <div className="hero-in" style={d(250)}>
            <Eyebrow>Derecho de extranjería · Madrid</Eyebrow>
          </div>

          <h1 id="hero-title" className="display-1 mt-7 text-navy">
            <span className="hero-in block" style={d(350)}>
              Tu situación{" "}
            </span>
            <span className="hero-in block" style={d(450)}>
              merece una{" "}
            </span>
            <span className="hero-in block" style={d(550)}>
              respuesta <span className="text-steel">clara.</span>
            </span>
          </h1>

          <p className="hero-in lead mt-8 max-w-xl text-ink-muted" style={d(750)}>
            <strong className="font-semibold text-navy">
              Abogado especialista en derecho de extranjería en Madrid.
            </strong>{" "}
            Asesoramiento especializado en nacionalidad, residencia, arraigo, reagrupación familiar y
            otros procedimientos de extranjería.
          </p>

          <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={d(900)}>
            <ButtonLink
              to={consultHref}
              arrow
              className="w-full sm:w-auto"
              onClick={() => trackEvent("click_consult_case", { location: "hero" })}
            >
              Consultar mi caso
            </ButtonLink>
            <ButtonLink to="/servicios" variant="secondary" className="w-full sm:w-auto">
              Ver servicios
            </ButtonLink>
            <TextLink
              to={telHref}
              className="justify-center sm:ml-3"
              onClick={() => trackEvent("click_phone", { location: "hero" })}
            >
              <span className="tabular-nums">{business.phoneDisplay}</span>
            </TextLink>
          </div>

          <div className="mt-14 hidden items-center gap-5 md:flex">
            <span aria-hidden="true" className="hero-line h-px w-24 bg-gold" style={d(950)} />
            <p className="hero-fade micro text-steel" style={d(1000)}>
              Sefoz / Madrid / Extranjería
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
