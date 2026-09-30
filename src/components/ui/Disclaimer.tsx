import { Info } from "lucide-react";
import { GENERAL_DISCLAIMER } from "@/data/legal";
import { cn } from "@/lib/cn";

/** Advertencia editorial discreta (no alarmista). */
export function Disclaimer({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <p
      className={cn(
        "flex max-w-3xl items-start gap-3 text-[0.85rem] leading-relaxed",
        tone === "dark" ? "text-ink-muted" : "text-ivory/60",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={1.6} />
      <span>{GENERAL_DISCLAIMER}</span>
    </p>
  );
}
