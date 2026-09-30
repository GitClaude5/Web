import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useReveal } from "@/hooks/useReveal";

/** Línea champagne: scaleX 0→1, 600ms. */
export function LineReveal({
  delay = 0,
  className,
  tone = "gold",
}: {
  delay?: number;
  className?: string;
  tone?: "gold" | "navy" | "ivory";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useReveal(ref);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-reveal="line"
      className={cn(
        "block h-px",
        tone === "gold" && "bg-gold",
        tone === "navy" && "bg-navy/15",
        tone === "ivory" && "bg-ivory/15",
        className,
      )}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    />
  );
}
