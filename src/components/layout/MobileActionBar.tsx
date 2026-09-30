import { Link } from "react-router";
import { LayoutGrid, MessageSquareText, Phone } from "lucide-react";
import { telHref } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { useConsultHref } from "@/hooks/useConsultHref";

/** Barra fija inferior (solo móvil/tablet): Consultar · Llamar · Servicios. */
export function MobileActionBar() {
  const consultHref = useConsultHref();
  const item =
    "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition-colors";

  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-navy text-ivory lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-2 py-2">
        <Link
          to={consultHref}
          onClick={() => trackEvent("click_consult_case", { location: "mobile_bar" })}
          className={`${item} flex-[1.6] rounded-md bg-gold text-navy hover:bg-ivory`}
        >
          <MessageSquareText aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.6} />
          Consultar
        </Link>
        <a
          href={telHref}
          onClick={() => trackEvent("click_phone", { location: "mobile_bar" })}
          className={`${item} rounded-md hover:text-gold`}
        >
          <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.6} />
          Llamar
        </a>
        <Link to="/servicios" className={`${item} rounded-md hover:text-gold`}>
          <LayoutGrid aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.6} />
          Servicios
        </Link>
      </div>
    </nav>
  );
}
