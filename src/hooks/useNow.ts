import { useEffect, useState } from "react";

/**
 * Hora actual solo en cliente (null durante SSR y la primera renderización)
 * para evitar desajustes de hidratación. Se actualiza cada minuto.
 */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}
