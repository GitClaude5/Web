import { Link } from "react-router";
import { business, telHref } from "@/data/business";
import { HOURS_SUMMARY } from "@/data/openingHours";
import { footerServices } from "@/data/navigation";
import { getService, servicePath } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { BrandSeal } from "@/components/brand/BrandSeal";
import { Disclaimer } from "@/components/ui/Disclaimer";

const linkClass =
  "inline-flex min-h-[40px] items-center text-[0.95rem] text-ivory/75 transition-colors hover:text-gold";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="micro text-gold">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-ivory">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label={`${business.name}, ir al inicio`} className="inline-flex items-center gap-4">
              <BrandSeal decorative className="h-16 w-16" />
              <span>
                <span className="block font-serif text-[1.75rem] leading-none font-semibold">{business.name}</span>
                <span className="micro mt-2 block text-gold">{business.descriptor}</span>
              </span>
            </Link>
            <p className="mt-8 max-w-sm font-serif text-[1.6rem] leading-[1.15] font-semibold text-ivory/90">
              Especialistas en extranjería. Claridad para cada paso.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:col-span-8">
            <Column title="Servicios">
              <ul>
                {footerServices.map((slug) => {
                  const s = getService(slug);
                  return s ? (
                    <li key={slug}>
                      <Link to={servicePath(s)} className={linkClass}>
                        {s.title}
                      </Link>
                    </li>
                  ) : null;
                })}
                <li>
                  <Link to="/servicios" className={`${linkClass} text-gold/90`}>
                    Todos los servicios
                  </Link>
                </li>
              </ul>
            </Column>

            <Column title="Asesoría">
              <ul>
                <li><Link to="/" className={linkClass}>Inicio</Link></li>
                <li><Link to="/#como-trabajamos" className={linkClass}>Cómo trabajamos</Link></li>
                <li><Link to="/asesoria" className={linkClass}>La asesoría</Link></li>
                <li><Link to="/guias" className={linkClass}>Guías</Link></li>
                <li><Link to="/#faq" className={linkClass}>FAQ</Link></li>
                <li><Link to="/contacto" className={linkClass}>Contacto</Link></li>
              </ul>
            </Column>

            <Column title="Contacto">
              <ul>
                <li>
                  <a
                    href={telHref}
                    onClick={() => trackEvent("click_phone", { location: "footer" })}
                    className={`${linkClass} font-semibold text-ivory tabular-nums`}
                  >
                    {business.phoneDisplay}
                  </a>
                </li>
                <li className="flex min-h-[40px] items-center text-[0.95rem] text-ivory/75">{business.city}</li>
                <li>
                  <a
                    href={business.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_facebook", { location: "footer" })}
                    className={linkClass}
                  >
                    Facebook<span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              </ul>
            </Column>

            <Column title="Horario">
              <dl className="space-y-2.5 text-[0.95rem]">
                {HOURS_SUMMARY.map((h) => (
                  <div key={h.label} className="flex gap-3">
                    <dt className="w-9 text-ivory/50">{h.label}</dt>
                    <dd className="tabular-nums text-ivory/80">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </Column>
          </div>
        </div>

        <div className="mt-20 border-t border-ivory/10 pt-8">
          <Disclaimer tone="light" />
          <div className="mt-8 flex flex-col gap-4 text-[0.85rem] text-ivory/55 md:flex-row md:items-center md:justify-between">
            <p>© {year} {business.name}. Todos los derechos reservados.</p>
            <ul className="flex flex-wrap gap-x-7">
              <li><Link to="/aviso-legal" className="inline-flex min-h-[44px] items-center transition-colors hover:text-gold">Aviso legal</Link></li>
              <li><Link to="/privacidad" className="inline-flex min-h-[44px] items-center transition-colors hover:text-gold">Privacidad</Link></li>
              <li><Link to="/cookies" className="inline-flex min-h-[44px] items-center transition-colors hover:text-gold">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
