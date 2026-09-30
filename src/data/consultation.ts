/**
 * Opciones del campo "Tipo de consulta" y "Preferencia de contacto".
 * Los valores coinciden con `Service.formSubject`.
 */
export const consultationTypes = [
  { value: "nacionalidad", label: "Nacionalidad" },
  { value: "asilo-y-refugio", label: "Asilo y Refugio" },
  { value: "arraigo", label: "Arraigo" },
  { value: "residencia", label: "Residencia" },
  { value: "reagrupacion-familiar", label: "Reagrupación Familiar" },
  { value: "permisos-de-trabajo", label: "Permiso de trabajo" },
  { value: "familiar-comunitario", label: "Familiar comunitario" },
  { value: "circunstancias-excepcionales", label: "Circunstancias excepcionales" },
  { value: "renovaciones", label: "Renovación" },
  { value: "autorizacion-de-regreso", label: "Autorización de regreso" },
  { value: "no-lo-se", label: "No sé qué trámite necesito" },
] as const;

export type ConsultationType = (typeof consultationTypes)[number]["value"];

export const consultationValues = consultationTypes.map((c) => c.value) as [
  ConsultationType,
  ...ConsultationType[],
];

export const isConsultationType = (v: string | null): v is ConsultationType =>
  consultationValues.includes(v as ConsultationType);

export const contactPreferences = [
  { value: "telefono", label: "Llamada" },
  { value: "email", label: "Email" },
  { value: "indiferente", label: "Indiferente" },
] as const;

export type ContactPreference = (typeof contactPreferences)[number]["value"];
