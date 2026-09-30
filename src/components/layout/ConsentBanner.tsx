import { useEffect, useState } from "react";
import { Link } from "react-router";
import { analyticsEnabled, getConsent, loadAnalytics, setConsent } from "@/lib/analytics";

/**
 * Aviso de cookies analíticas. Solo aparece si hay ANALYTICS_ID configurado.
 * Sin consentimiento no se carga ningún tracker. No es un popup intrusivo.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    const consent = getConsent();
    if (consent === "granted") loadAnalytics();
    else if (consent === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-3 bottom-[84px] z-50 rounded-lg border border-navy/10 bg-paper p-5 text-graphite shadow-[0_20px_40px_-20px_rgba(16,26,41,0.35)] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md lg:bottom-6"
    >
      <p className="text-[0.92rem] leading-relaxed">
        Utilizamos cookies analíticas solo si las aceptas, para entender cómo se usa la web.{" "}
        <Link to="/cookies" className="underline underline-offset-2">Más información</Link>.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("granted")} className="min-h-[44px] flex-1 rounded-md bg-navy px-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ivory">
          Aceptar
        </button>
        <button type="button" onClick={() => choose("denied")} className="min-h-[44px] flex-1 rounded-md border border-navy/25 px-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy">
          Rechazar
        </button>
      </div>
    </div>
  );
}
