import type { CSSProperties, ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { Eyebrow } from "./Eyebrow";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Cabecera de páginas interiores. */
export function PageHero({
  crumbs,
  eyebrow,
  lines,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  lines: string[];
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="grid-lines relative border-b border-navy/10">
      <div className="container-x pb-20 pt-8 md:pt-12 lg:pb-28">
        <div className="hero-fade" style={d(50)}>
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-14 max-w-4xl lg:mt-20">
          <div className="hero-in" style={d(150)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-title" className="display-1 mt-7 text-navy">
            {lines.map((line, i) => (
              <span key={i} className="hero-in block" style={d(250 + i * 100)}>
                {line}
                {i < lines.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          {children && (
            <div className="hero-in mt-8" style={d(300 + lines.length * 100)}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
