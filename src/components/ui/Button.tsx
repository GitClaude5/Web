import type { ReactNode, MouseEventHandler } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "gold" | "ghost-light" | "outline-light";

const base =
  "group/btn inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md px-7 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-[background-color,color,border-color] duration-300 ease-[var(--ease-out)] select-none";

const variants: Record<Variant, string> = {
  // Navy → gold (texto navy para mantener contraste AA).
  primary: "bg-navy text-ivory hover:bg-gold hover:text-navy",
  secondary: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-ivory",
  gold: "bg-gold text-navy hover:bg-ivory",
  "ghost-light": "border border-ivory/25 text-ivory hover:border-gold hover:text-gold",
  "outline-light": "border border-ivory/30 text-ivory hover:bg-ivory hover:text-navy",
};

type Props = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
};

const isExternal = (to: string) => /^(https?:|tel:|mailto:)/.test(to);

export function ButtonLink({
  to,
  children,
  variant = "primary",
  arrow = false,
  className,
  onClick,
  ariaLabel,
}: Props) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={1.6}
        />
      )}
    </>
  );

  if (isExternal(to)) {
    const external = to.startsWith("http");
    return (
      <a
        href={to}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Enlace de texto con flecha (p. ej. "646 406 788 →"). */
export function TextLink({
  to,
  children,
  className,
  onClick,
  tone = "dark",
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  tone?: "dark" | "light";
}) {
  const classes = cn(
    "group/tl inline-flex min-h-[44px] items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
    tone === "dark" ? "text-navy hover:text-bronze" : "text-ivory hover:text-gold",
    className,
  );
  const inner = (
    <>
      <span className="border-b border-current/30 pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover/tl:translate-x-1"
        strokeWidth={1.6}
      />
    </>
  );
  if (isExternal(to)) {
    const external = to.startsWith("http");
    return (
      <a
        href={to}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
