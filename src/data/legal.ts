import { business } from "./business";

/**
 * Datos legales del titular. No facilitados todavía: NO inventar.
 * Mientras estén vacíos, las páginas legales muestran el campo como pendiente.
 */
export const LEGAL_NAME = "";
export const NIF_CIF = "";
export const REGISTERED_ADDRESS = "";
export const LEGAL_EMAIL = "";
export const LAWYER_NAME = business.lawyer.name;
export const BAR_ASSOCIATION = business.lawyer.barAssociation;
export const BAR_NUMBER = business.lawyer.barNumber;

/** Fecha de la última revisión profesional de los textos legales (ISO). */
export const LEGAL_TEXTS_REVIEWED_AT: string | null = null;

export const GENERAL_DISCLAIMER =
  "La información de esta web es de carácter general. Cada caso requiere una valoración individual según las circunstancias y normativa aplicable.";
