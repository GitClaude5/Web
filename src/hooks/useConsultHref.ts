import { useLocation } from "react-router";
import { consultPath } from "@/data/navigation";

/**
 * En la home, "Consultar mi caso" baja al formulario de la propia página
 * (menos fricción). En el resto, lleva a /contacto con el tipo preseleccionado.
 */
export function useConsultHref(subject?: string) {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return subject ? `/?consulta=${subject}#consulta` : "/#consulta";
  }
  return consultPath(subject);
}
