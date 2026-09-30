import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Microtexto uppercase con guion champagne. */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "micro flex items-center gap-3",
        tone === "dark" ? "text-steel" : "text-gold",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}
