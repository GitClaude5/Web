/**
 * Horario confirmado por el cliente. Usar únicamente estos datos
 * (no los de directorios externos) hasta nueva confirmación.
 */

export const TIMEZONE = "Europe/Madrid";

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TimeRange = [open: string, close: string];

export const openingHours: Record<DayKey, TimeRange[]> = {
  monday: [["11:00", "19:00"]],
  tuesday: [["11:00", "19:00"]],
  wednesday: [["11:00", "19:00"]],
  thursday: [["11:00", "19:00"]],
  friday: [["11:00", "19:00"]],
  saturday: [["11:00", "14:00"]],
  sunday: [],
};

export const DAY_ORDER: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

/** Formato compacto para footer y bloques de contacto. */
export const HOURS_SUMMARY = [
  { label: "L–V", value: "11:00–19:00" },
  { label: "S", value: "11:00–14:00" },
  { label: "D", value: "Cerrado" },
] as const;

/** schema.org day names */
export const SCHEMA_DAYS: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};
