import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { guides, publishedGuides } from "@/data/guides";
import { getService, servicePath } from "@/data/services";
import { breadcrumbSchema } from "@/lib/seo";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { TextReveal } from "@/components/motion/TextReveal";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { Disclaimer } from "@/components/ui/Disclaimer";

const crumbs = [
  { name: "Inicio", path: "/" },
  { name: "Guías", path: "/guias" },
];

/**
 * Guías de extranjería. Mientras no haya guías revisadas y publicadas,
 * la página muestra los temas en preparación y no se indexa.
 */
export default function Guides() {
  const hasPublished = publishedGuides.length > 0;

  return (
    <>
      <Seo
        title="Guías de Extranjería | Asesoría Sefoz"
        description="Guías claras y revisadas sobre nacionalidad, arraigo, residencia, reagrupación familiar, renovaciones y autorización de regreso."
        path="/guias"
        noindex={!hasPublished}
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Guías" lines={["Información clara,", "revisada y actual."]}>
        <p className="lead max-w-xl text-ink-muted">
          Preparamos guías sobre los procedimientos más habituales. Cada una se publica tras su
          revisión profesional e indica su fecha de actualización.
        </p>
      </PageHero>

      <section aria-label="Listado de guías" className="section-y">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => {
              const service = getService(g.relatedService);
              return (
                <TextReveal as="li" key={g.slug} delay={(i % 3) * 80}>
                  <article className="flex h-full flex-col justify-between rounded-lg border border-navy/12 bg-paper p-8">
                    <div>
                      <p className="micro text-bronze">
                        {g.published ? "Guía" : "En preparación"}
                      </p>
                      <h2 className="display-3 mt-5 text-navy">{g.title}</h2>
                      <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-muted">{g.excerpt}</p>
                    </div>
                    <div className="mt-8">
                      {g.published ? (
                        <Link to={`/guias/${g.slug}`} className="micro inline-flex min-h-[44px] items-center gap-2 text-navy hover:text-bronze">
                          Leer guía <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                        </Link>
                      ) : (
                        service && (
                          <Link to={servicePath(service)} className="micro inline-flex min-h-[44px] items-center gap-2 text-navy hover:text-bronze">
                            Ver el servicio <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                          </Link>
                        )
                      )}
                    </div>
                  </article>
                </TextReveal>
              );
            })}
          </ul>
          <Disclaimer className="mt-14" />
        </div>
      </section>
      <ConversionCTA />
    </>
  );
}
