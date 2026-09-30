import { business } from "@/data/business";
import { LEGAL_EMAIL, LEGAL_NAME, NIF_CIF, REGISTERED_ADDRESS } from "@/data/legal";
import { LegalDocument, LegalSection, LegalValue } from "@/components/ui/LegalDocument";

/** Política de privacidad (RGPD / LOPDGDD). Revisar por profesional antes de publicar. */
export default function Privacy() {
  return (
    <LegalDocument
      title="Política de privacidad"
      description="Cómo trata Asesoría Sefoz los datos personales enviados a través de su web."
      path="/privacidad"
    >
      <LegalSection title="Responsable del tratamiento">
        <ul>
          <li>Titular: <LegalValue value={LEGAL_NAME} /></li>
          <li>NIF/CIF: <LegalValue value={NIF_CIF} /></li>
          <li>Domicilio: <LegalValue value={REGISTERED_ADDRESS} /></li>
          <li>Email de contacto: <LegalValue value={LEGAL_EMAIL} /></li>
          <li>Teléfono: {business.phoneDisplay}</li>
        </ul>
      </LegalSection>
      <LegalSection title="Qué datos tratamos">
        <p>A través del formulario de consulta solo recogemos: nombre, teléfono, email (opcional), tipo de consulta, mensaje, preferencia de contacto y la fecha en que aceptas esta política.</p>
        <p>El formulario no está pensado para enviar documentación ni datos especialmente sensibles. Te pedimos que no incluyas números de documento, expedientes ni datos de terceros. Si tu caso requiere revisar documentación, te indicaremos un canal adecuado.</p>
      </LegalSection>
      <LegalSection title="Finalidad y base jurídica">
        <p>Tratamos tus datos para atender tu consulta y contactar contigo. La base jurídica es tu consentimiento, que puedes retirar en cualquier momento.</p>
      </LegalSection>
      <LegalSection title="Conservación">
        <p>Conservaremos los datos el tiempo necesario para atender la consulta y, después, durante los plazos legalmente exigibles. Si no se contrata ningún servicio, se suprimirán cuando dejen de ser necesarios.</p>
      </LegalSection>
      <LegalSection title="Destinatarios">
        <p>No se cederán datos a terceros salvo obligación legal. Los proveedores tecnológicos que alojan el sitio y almacenan las consultas actúan como encargados del tratamiento con las garantías exigidas por la normativa.</p>
      </LegalSection>
      <LegalSection title="Tus derechos">
        <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad dirigiéndote al responsable a través de los datos de contacto indicados. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).</p>
      </LegalSection>
    </LegalDocument>
  );
}
