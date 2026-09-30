import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** opacity 0→1, y 20px→0, 650ms. */
export function TextReveal({ as: Tag = "div", delay = 0, className, children, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal="text"
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
