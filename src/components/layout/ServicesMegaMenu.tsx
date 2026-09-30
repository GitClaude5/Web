import { Link } from "react-router";
import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { menuColumn, servicePath, type Service } from "@/data/services";
import { consultPath } from "@/data/navigation";
import { business, telHref } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";

function ServiceItem({ service, onNavigate }: { service: Service; onNavigate: () => void }) {
  return (
    <li>
      <Link
        to={servicePath(service)}
        onClick={onNavigate}
        className="group flex min-h-[52px] items-baseline gap-4 border-b border-navy/8 py-3.5 transition-colors hover:text-bronze"
      >
        <span aria-hidden="true" className="h-px w-4 shrink-0 self-center bg-gold" />
        <span className="font-serif text-[1.35rem] leading-tight font-semibold text-navy transition-colors group-hover:text-bronze">
          {service.title}
        </span>
        <ArrowRight
          aria-hidden="true"
          className="ml-auto h-4 w-4 shrink-0 -translate-x-1 self-center text-gold-dark opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          strokeWidth={1.6}
        />
      </Link>
    </li>
  );
}

export function ServicesMegaMenu({
  id,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: {
  id: string;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  return (
    <m.div
      id={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="on-light absolute inset-x-0 top-full border-b border-navy/10 bg-ivory shadow-[0_24px_48px_-24px_rgba(16,26,41,0.25)]"
    >
      <div className="container-x grid grid-cols-12 gap-10 py-12">
        <div className="col-span-8">
          <div className="flex items-baseline justify-between">
            <p className="micro text-steel">Servicios de extranjería</p>
            <Link
              to="/servicios"
              onClick={onNavigate}
              className="micro nav-underline text-navy transition-colors hover:text-bronze"
            >
              Ver todos los servicios
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-12">
            {([1, 2] as const).map((col) => (
              <ul key={col} className="border-t border-navy/8">
                {menuColumn(col).map((s) => (
                  <ServiceItem key={s.id} service={s} onNavigate={onNavigate} />
                ))}
              </ul>
            ))}
          </div>
        </div>

        <aside className="col-span-4 flex flex-col justify-between rounded-lg bg-navy p-9 text-ivory">
          <div>
            <p className="micro text-gold">Empieza por tu situación</p>
            <p className="mt-5 font-serif text-[2rem] leading-[1.02] font-semibold">
              ¿No sabes qué trámite necesitas?
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/75">
              Cuéntanos tu situación y estudiaremos qué opciones pueden corresponder a tu caso.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <ButtonLink
              to={consultPath("no-lo-se")}
              variant="gold"
              arrow
              onClick={() => {
                trackEvent("click_consult_case", { location: "megamenu" });
                onNavigate();
              }}
            >
              Explicar mi caso
            </ButtonLink>
            <a
              href={telHref}
              onClick={() => trackEvent("click_phone", { location: "megamenu" })}
              className="micro inline-flex min-h-[44px] items-center justify-center text-ivory/80 transition-colors hover:text-gold"
            >
              O llama al {business.phoneDisplay}
            </a>
          </div>
        </aside>
      </div>
    </m.div>
  );
}
