import { business } from "@/data/business";
import {
  BAR_ASSOCIATION,
  BAR_NUMBER,
  GENERAL_DISCLAIMER,
  LEGAL_EMAIL,
  LEGAL_NAME,
  NIF_CIF,
  REGISTERED_ADDRESS,
} from "@/data/legal";
import { LegalDocument, LegalSection, LegalValue } from "@/components/ui/LegalDocument";

export default function Legal() {
  return (
    <LegalDocument
      title="Aviso legal"
      description="Aviso legal de Asesoría Sefoz: datos identificativos del titular y condiciones de uso del sitio web."
      path="/aviso-legal"
    >
      <LegalSection title="Datos identificativos">
        <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se facilitan los siguientes datos:</p>
        <ul>
          <li>Titular: <LegalValue value={LEGAL_NAME} /></li>
          <li>Nombre comercial: {business.name}</li>
          <li>NIF/CIF: <LegalValue value={NIF_CIF} /></li>
          <li>Domicilio: <LegalValue value={REGISTERED_ADDRESS} /></li>
          <li>Email: <LegalValue value={LEGAL_EMAIL} /></li>
          <li>Teléfono: {business.phoneDisplay}</li>
          <li>Colegio profesional: <LegalValue value={BAR_ASSOCIATION} /></li>
          <li>Número de colegiación: <LegalValue value={BAR_NUMBER} /></li>
        </ul>
      </LegalSection>
      <LegalSection title="Objeto">
        <p>Este sitio web ofrece información sobre los servicios de asesoramiento en extranjería de {business.name} y permite contactar para solicitar una consulta.</p>
      </LegalSection>
      <LegalSection title="Carácter de la información">
        <p>{GENERAL_DISCLAIMER} La información publicada no constituye asesoramiento jurídico ni crea relación profesional alguna hasta la contratación del servicio.</p>
      </LegalSection>
      <LegalSection title="Propiedad intelectual e industrial">
        <p>Los contenidos, la marca y los elementos gráficos de este sitio son titularidad de {business.name} o se utilizan con autorización. Queda prohibida su reproducción sin permiso.</p>
      </LegalSection>
      <LegalSection title="Responsabilidad">
        <p>{business.name} procura mantener la información actualizada, pero la normativa de extranjería puede cambiar. No se garantiza que los contenidos generales se ajusten a cada caso concreto.</p>
      </LegalSection>
    </LegalDocument>
  );
}
