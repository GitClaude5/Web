import {
  DAY_LABELS,
  DAY_ORDER,
  TIMEZONE,
  openingHours,
  type DayKey,
} from "@/data/openingHours";

export type OpeningStatus = {
  isOpen: boolean;
  /** Texto principal del badge: "Abierto ahora" | "Cerrado ahora". */
  label: string;
  /** Texto secundario: "Cerramos a las 19:00" | "Abrimos a las 11:00" | ... */
  detail: string;
  today: DayKey;
};

const JS_DAY_TO_KEY: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Día y minuto actuales en Europe/Madrid, independientemente de la zona del usuario. */
export function madridNow(date: Date): { day: DayKey; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    day: JS_DAY_TO_KEY[weekdayIndex === -1 ? 0 : weekdayIndex],
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getOpeningStatus(date: Date): OpeningStatus {
  const { day, minutes } = madridNow(date);
  const ranges = openingHours[day];

  for (const [open, close] of ranges) {
    if (minutes >= toMinutes(open) && minutes < toMinutes(close)) {
      return { isOpen: true, label: "Abierto ahora", detail: `Cerramos a las ${close}`, today: day };
    }
  }

  const laterToday = ranges.find(([open]) => minutes < toMinutes(open));
  if (laterToday) {
    return {
      isOpen: false,
      label: "Cerrado ahora",
      detail: `Abrimos a las ${laterToday[0]}`,
      today: day,
    };
  }

  // Próximo día con horario.
  const start = DAY_ORDER.indexOf(day);
  for (let offset = 1; offset <= 7; offset++) {
    const next = DAY_ORDER[(start + offset) % 7];
    const first = openingHours[next][0];
    if (first) {
      const when = offset === 1 ? "mañana" : `el ${DAY_LABELS[next].toLowerCase()}`;
      return {
        isOpen: false,
        label: "Cerrado ahora",
        detail: `Abrimos ${when} a las ${first[0]}`,
        today: day,
      };
    }
  }

  return { isOpen: false, label: "Cerrado ahora", detail: "", today: day };
}
