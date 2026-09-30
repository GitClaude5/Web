import { useNow } from "@/hooks/useNow";
import { getOpeningStatus } from "@/lib/openingStatus";
import { cn } from "@/lib/cn";

/**
 * Estado abierto/cerrado calculado en Europe/Madrid.
 * Se renderiza solo en cliente; en SSR reserva el espacio (sin CLS).
 */
export function OpeningStatusBadge({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const now = useNow();
  const status = now ? getOpeningStatus(now) : null;

  return (
    <p
      aria-live="polite"
      className={cn(
        "flex min-h-[36px] flex-wrap items-center gap-x-4 gap-y-2",
        !status && "invisible",
        className,
      )}
    >
      <span
        className={cn(
          "micro inline-flex min-h-[34px] items-center gap-2.5 whitespace-nowrap rounded-full border px-4",
          tone === "dark" ? "border-navy/12 bg-white/60 text-navy" : "border-ivory/15 text-ivory",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-2 w-2 rounded-full",
            status?.isOpen ? "bg-[#3f8f5f]" : tone === "dark" ? "bg-muted" : "bg-ivory/40",
          )}
        />
        {status?.label ?? "Horario"}
      </span>
      {status?.detail && (
        <span className={cn("micro whitespace-nowrap", tone === "dark" ? "text-ink-muted" : "text-ivory/70")}>
          {status.detail}
        </span>
      )}
    </p>
  );
}
