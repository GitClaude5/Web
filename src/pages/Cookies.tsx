import { Link } from "react-router";
import { ANALYTICS_ID } from "@/data/site";
import { LegalDocument, LegalSection } from "@/components/ui/LegalDocument";

export default function Cookies() {
  return (
    <LegalDocument
      title="Política de cookies"
      description="Información sobre el uso de cookies y tecnologías similares en la web de Asesoría Sefoz."
      path="/cookies"
    >
      <LegalSection title="Qué utilizamos">
        {ANALYTICS_ID ? (
          <p>Este sitio utiliza cookies analíticas únicamente si las aceptas en el aviso de cookies. Sin tu consentimiento no se carga ninguna herramienta de medición.</p>
        ) : (
          <p>Actualmente este sitio no utiliza cookies de análisis, publicidad ni seguimiento. No se cargan herramientas de terceros que rastreen tu navegación.</p>
        )}
      </LegalSection>
      <LegalSection title="Almacenamiento técnico">
        <p>Si en el futuro se activa la analítica, se guardará en tu navegador tu elección sobre las cookies para no volver a preguntarte.</p>
      </LegalSection>
      <LegalSection title="Enlaces externos">
        <p>El enlace a nuestra página de Facebook te lleva a un sitio de terceros con su propia política de cookies. No incrustamos contenido de redes sociales en esta web.</p>
      </LegalSection>
      <LegalSection title="Más información">
        <p>Consulta nuestra <Link to="/privacidad">Política de privacidad</Link> para conocer cómo tratamos tus datos.</p>
      </LegalSection>
    </LegalDocument>
  );
}
