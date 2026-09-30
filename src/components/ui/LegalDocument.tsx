import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/seo";
import { LEGAL_TEXTS_REVIEWED_AT } from "@/data/legal";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "./PageHero";

/** Valor legal o marcador de pendiente (nunca inventar datos). */
export function LegalValue({ value }: { value: string }) {
  return value ? (
    <>{value}</>
  ) : (
    <span className="rounded bg-gold-soft px-1.5 py-0.5 text-[0.9em] text-bronze">pendiente de completar</span>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="font-serif text-[1.9rem] leading-tight font-semibold text-navy">{title}</h2>
      <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-graphite [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </section>
  );
}

export function LegalDocument({
  title,
  description,
  path,
  children,
}: {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}) {
  const crumbs: Crumb[] = [
    { name: "Inicio", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <Seo
        title={`${title} | Asesoría Sefoz`}
        description={description}
        path={path}
        noindex
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Información legal" lines={[title]} />
      <div className="section-y">
        <div className="container-x max-w-3xl">
          {children}
          <p className="mt-16 border-t border-navy/12 pt-6 text-[0.85rem] text-ink-muted">
            {LEGAL_TEXTS_REVIEWED_AT
              ? `Última actualización: ${new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(LEGAL_TEXTS_REVIEWED_AT))}`
              : "Texto pendiente de revisión legal y de los datos del titular."}
          </p>
        </div>
      </div>
    </>
  );
}
