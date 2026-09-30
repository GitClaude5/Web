import type { CSSProperties } from "react";
import { business, telHref } from "@/data/business";
import { consultPath } from "@/data/navigation";
import { serviceNumber, type Service } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OpeningStatusBadge } from "@/components/ui/OpeningStatusBadge";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function ServiceHero({ service, crumbs }: { service: Service; crumbs: Crumb[] }) {
  return (
    <section aria-labelledby="service-title" className="grid-lines relative border-b border-navy/10">
      <div className="container-x pb-20 pt-8 md:pt-12 lg:pb-28">
        <div className="hero-fade" style={d(50)}>
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="hero-in" style={d(150)}>
              <Eyebrow>
                Servicio {serviceNumber(service)} · Extranjería · {business.city}
              </Eyebrow>
            </div>
            <h1 id="service-title" className="display-1 hero-in mt-7 text-navy" style={d(250)}>
              {service.heroTitle}
            </h1>
            <p className="lead hero-in mt-8 max-w-xl text-ink-muted" style={d(400)}>
              {service.shortDescription}
            </p>
            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(550)}>
              <ButtonLink
                to={consultPath(service.formSubject)}
                arrow
                onClick={() => trackEvent("click_consult_case", { location: "service_hero", service: service.slug })}
              >
                {service.ctaLabel}
              </ButtonLink>
              <TextLink
                to={telHref}
                className="justify-center sm:ml-4"
                onClick={() => trackEvent("click_phone", { location: "service_hero", service: service.slug })}
              >
                <span className="tabular-nums">{business.phoneDisplay}</span>
              </TextLink>
            </div>
          </div>

          <aside
            aria-label="Contacto rápido"
            className="hero-in self-end rounded-lg bg-navy p-8 text-ivory lg:col-span-4 lg:col-start-9 md:p-10"
            style={d(650)}
          >
            <p className="micro text-gold">¿Dudas sobre tu caso?</p>
            <p className="mt-5 font-serif text-[1.9rem] leading-[1.05] font-semibold">
              Cada expediente requiere valoración individual.
            </p>
            <p className="mt-4 text-[0.95rem] text-ivory/70">
              Cuéntanos tu situación y te orientaremos sobre las opciones disponibles.
            </p>
            <a
              href={telHref}
              onClick={() => trackEvent("click_phone", { location: "service_aside", service: service.slug })}
              className="mt-8 block font-serif text-[2rem] leading-none font-semibold lining-nums tabular-nums transition-colors hover:text-gold"
            >
              {business.phoneDisplay}
            </a>
            <OpeningStatusBadge tone="light" className="mt-5" />
          </aside>
        </div>
      </div>
    </section>
  );
}
