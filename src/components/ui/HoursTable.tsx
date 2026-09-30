import { DAY_LABELS, DAY_ORDER, openingHours } from "@/data/openingHours";
import { useNow } from "@/hooks/useNow";
import { madridNow } from "@/lib/openingStatus";
import { cn } from "@/lib/cn";

export function HoursTable({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const now = useNow();
  const today = now ? madridNow(now).day : null;

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Horario de atención (hora de Madrid)</caption>
      <tbody>
        {DAY_ORDER.map((day) => {
          const ranges = openingHours[day];
          const isToday = day === today;
          return (
            <tr
              key={day}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "border-b transition-colors",
                tone === "dark" ? "border-navy/10" : "border-ivory/12",
                isToday && (tone === "dark" ? "bg-white" : "bg-ivory/5"),
              )}
            >
              <th
                scope="row"
                className={cn(
                  "py-4 pl-4 pr-6 font-medium",
                  tone === "dark" ? "text-navy" : "text-ivory",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn("h-4 w-px", isToday ? "bg-gold" : "bg-transparent")}
                  />
                  {DAY_LABELS[day]}
                  {isToday && (
                    <span className={cn("micro", tone === "dark" ? "text-bronze" : "text-gold")}>Hoy</span>
                  )}
                </span>
              </th>
              <td
                className={cn(
                  "py-4 pr-4 text-right tabular-nums",
                  ranges.length === 0
                    ? tone === "dark"
                      ? "text-ink-muted"
                      : "text-ivory/50"
                    : tone === "dark"
                      ? "text-graphite"
                      : "text-ivory/85",
                )}
              >
                {ranges.length === 0
                  ? "Cerrado"
                  : ranges.map(([o, c]) => `${o} – ${c}`).join(" · ")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
