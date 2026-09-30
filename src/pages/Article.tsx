import { useParams } from "react-router";
import { getGuide } from "@/data/guides";
import { breadcrumbSchema } from "@/lib/seo";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { Disclaimer } from "@/components/ui/Disclaimer";
import NotFound from "./NotFound";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

/** Plantilla de guía. Solo se renderizan guías publicadas (revisadas). */
export default function Article() {
  const { slug = "" } = useParams();
  const guide = getGuide(slug);
  if (!guide) return <NotFound />;

  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Guías", path: "/guias" },
    { name: guide.title, path: `/guias/${guide.slug}` },
  ];

  return (
    <>
      <Seo
        title={guide.seoTitle}
        description={guide.seoDescription}
        path={`/guias/${guide.slug}`}
        ogType="article"
        jsonLd={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.excerpt,
            inLanguage: "es-ES",
            ...(guide.lastReviewedAt ? { dateModified: guide.lastReviewedAt } : {}),
            publisher: { "@type": "LegalService", name: "Asesoría Sefoz" },
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow="Guía" lines={[guide.title]}>
        <p className="text-[0.9rem] text-ink-muted">
          {guide.lastReviewedAt && <>Última revisión: {formatDate(guide.lastReviewedAt)}</>}
          {guide.reviewedBy && <> · Revisado por: {guide.reviewedBy}</>}
        </p>
      </PageHero>
      <article className="section-y">
        <div className="container-x max-w-3xl">
          {guide.body.map((block, i) => {
            if (block.type === "h2")
              return <h2 key={i} className="display-3 mt-14 text-navy first:mt-0">{block.text}</h2>;
            if (block.type === "ul")
              return (
                <ul key={i} className="mt-6 list-disc space-y-2 pl-6 text-[1.05rem] text-graphite marker:text-gold-dark">
                  {block.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              );
            return <p key={i} className="mt-6 text-[1.08rem] leading-relaxed text-graphite">{block.text}</p>;
          })}
          <Disclaimer className="mt-14" />
        </div>
      </article>
      <ConversionCTA subject={guide.relatedService} />
    </>
  );
}
