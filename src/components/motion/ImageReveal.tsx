import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/** clip-path inset(0 0 100% 0) → inset(0), 750ms. */
export function ImageReveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div
      ref={ref}
      data-reveal="image"
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
