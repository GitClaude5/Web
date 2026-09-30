import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "./Eyebrow";

/**
 * Encabezado de sección. `lines` permite controlar los saltos editoriales
 * del H2 (se unen con espacios para lectores de pantalla y SEO).
 */
export function SectionHeading({
  eyebrow,
  lines,
  as: Tag = "h2",
  tone = "dark",
  className,
  id,
  children,
}: {
  eyebrow: string;
  lines: string[];
  as?: "h1" | "h2";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <TextReveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </TextReveal>
      <TextReveal delay={80}>
        <Tag
          id={id}
          className={cn(
            Tag === "h1" ? "display-1" : "display-2",
            "mt-6",
            tone === "dark" ? "text-navy" : "text-ivory",
          )}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
              {i < lines.length - 1 ? " " : ""}
            </span>
          ))}
        </Tag>
      </TextReveal>
      {children && <TextReveal delay={160}>{children}</TextReveal>}
    </div>
  );
}
