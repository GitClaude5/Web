import { Link } from "react-router";
import { business } from "@/data/business";
import { cn } from "@/lib/cn";
import { BrandSeal } from "./BrandSeal";

/** Lockup horizontal: sello + nombre + descriptor. */
export function Logo({
  tone = "dark",
  className,
  compact = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex min-w-0 items-center gap-2.5 sm:gap-3", className)}
    >
      <BrandSeal
        decorative
        className={cn(
          "shrink-0 transition-[width,height] duration-300",
          compact ? "h-10 w-10" : "h-11 w-11 md:h-12 md:w-12",
        )}
      />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={cn(
            "font-serif text-[1.3rem] font-semibold tracking-[0.01em] md:text-[1.5rem]",
            tone === "dark" ? "text-navy" : "text-ivory",
          )}
        >
          {business.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.13em] sm:text-[0.6rem] sm:tracking-[0.2em]",
            tone === "dark" ? "text-steel" : "text-gold",
          )}
        >
          {business.descriptor}
        </span>
      </span>
    </Link>
  );
}
