import type { ConsultationType } from "./consultation";

/**
 * Selector "No sé qué trámite necesito".
 * REGLA: nunca concluir qué procedimiento corresponde. Solo orientar sobre
 * qué conviene revisar y llevar al usuario a contar su caso.
 */
export type Situation = {
  id: string;
  label: string;
  result: string;
  ctaLabel: string;
  subject: ConsultationType;
  /** Información general relacionada (no implica elegibilidad). */
  related: string[];
};

export const situations: Situation[] = [
  {
    id: "regularizar",
    label: "Quiero regularizar mi situación",
    result:
      "Este tipo de situación puede requerir revisar diferentes procedimientos. Necesitamos conocer tu situación actual y tus circunstancias personales para orientarte.",
    ctaLabel: "Contarnos mi caso",
    subject: "no-lo-se",
    related: ["arraigo", "residencia", "circunstancias-excepcionales"],
  },
  {
    id: "nacionalidad",
    label: "Quiero solicitar nacionalidad",
    result:
      "Podemos revisar tu situación personal y el procedimiento que podría resultar aplicable antes de que des ningún paso.",
    ctaLabel: "Consultar sobre nacionalidad",
    subject: "nacionalidad",
    related: ["nacionalidad"],
  },
  {
    id: "familiar",
    label: "Quiero traer a un familiar",
    result:
      "Podemos revisar tu situación familiar, tu autorización actual y las opciones disponibles.",
    ctaLabel: "Consultar sobre reagrupación",
    subject: "reagrupacion-familiar",
    related: ["reagrupacion-familiar", "familiar-comunitario"],
  },
  {
    id: "renovar",
    label: "Necesito renovar",
    result:
      "Podemos revisar tu autorización actual, su vigencia y las opciones de continuidad que puedan corresponder.",
    ctaLabel: "Consultar sobre renovación",
    subject: "renovaciones",
    related: ["renovaciones"],
  },
  {
    id: "trabajar",
    label: "Quiero trabajar legalmente",
    result:
      "Podemos estudiar tu situación administrativa actual y qué autorizaciones relacionadas con el trabajo conviene valorar.",
    ctaLabel: "Consultar sobre permisos de trabajo",
    subject: "permisos-de-trabajo",
    related: ["permisos-de-trabajo", "residencia"],
  },
  {
    id: "viajar",
    label: "Necesito viajar",
    result:
      "Si tienes un trámite en curso o una autorización en renovación, conviene revisar tu caso antes de planificar el viaje.",
    ctaLabel: "Consultar sobre autorización de regreso",
    subject: "autorizacion-de-regreso",
    related: ["autorizacion-de-regreso"],
  },
  {
    id: "proteccion",
    label: "Busco protección internacional",
    result:
      "Las situaciones de protección internacional requieren un estudio cuidadoso y personalizado. Podemos orientarte sobre el procedimiento y sus circunstancias.",
    ctaLabel: "Consultar sobre asilo y refugio",
    subject: "asilo-y-refugio",
    related: ["asilo-y-refugio"],
  },
  {
    id: "no-claro",
    label: "No lo tengo claro",
    result:
      "No pasa nada. Explícanos lo que ocurre con tus propias palabras y estudiaremos qué vías conviene revisar.",
    ctaLabel: "Contarnos mi caso",
    subject: "no-lo-se",
    related: [],
  },
];
