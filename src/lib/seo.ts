import { business } from "@/data/business";
import { DAY_ORDER, SCHEMA_DAYS, openingHours } from "@/data/openingHours";
import { OG_IMAGE, SITE_URL, absoluteUrl } from "@/data/site";

export type Crumb = { name: string; path: string };

export type HeadData = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: object[];
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** JSON seguro dentro de <script>. */
const json = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export function legalServiceSchema() {
  const hoursSpec = DAY_ORDER.flatMap((day) =>
    openingHours[day].map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAYS[day],
      opens,
      closes,
    })),
  );

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: business.name,
    description:
      "Asesoría especializada en derecho de extranjería en Madrid: nacionalidad, arraigo, residencia, reagrupación familiar, permisos de trabajo, renovaciones y otros procedimientos.",
    telephone: business.phoneHref,
    areaServed: { "@type": "City", name: business.city },
    sameAs: [business.facebook],
    openingHoursSpecification: hoursSpec,
    knowsAbout: [
      "Derecho de extranjería",
      "Nacionalidad española",
      "Arraigo",
      "Residencia",
      "Reagrupación familiar",
      "Permisos de trabajo",
      "Protección internacional",
    ],
    inLanguage: "es-ES",
  };

  if (SITE_URL) {
    schema.url = SITE_URL;
    schema["@id"] = `${SITE_URL}/#legalservice`;
    schema.image = absoluteUrl(OG_IMAGE);
  }

  // PostalAddress solo con dirección confirmada. Nunca inventar streetAddress.
  if (business.address) {
    schema.address = { "@type": "PostalAddress", ...business.address };
  }

  // Sin aggregateRating ni review: no hay reseñas verificadas.
  return schema;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/** Genera las etiquetas <head> de una página (compartido por SSR y cliente). */
export function renderHeadTags(head: HeadData): string {
  const url = absoluteUrl(head.path);
  const image = absoluteUrl(head.ogImage ?? OG_IMAGE);
  const tags = [
    `<title data-seo>${esc(head.title)}</title>`,
    `<meta data-seo name="description" content="${esc(head.description)}">`,
    `<link data-seo rel="canonical" href="${esc(url)}">`,
    head.noindex ? `<meta data-seo name="robots" content="noindex, follow">` : "",
    `<meta data-seo property="og:type" content="${head.ogType ?? "website"}">`,
    `<meta data-seo property="og:site_name" content="${esc(business.name)}">`,
    `<meta data-seo property="og:locale" content="es_ES">`,
    `<meta data-seo property="og:title" content="${esc(head.title)}">`,
    `<meta data-seo property="og:description" content="${esc(head.description)}">`,
    `<meta data-seo property="og:url" content="${esc(url)}">`,
    `<meta data-seo property="og:image" content="${esc(image)}">`,
    `<meta data-seo property="og:image:width" content="1200">`,
    `<meta data-seo property="og:image:height" content="630">`,
    `<meta data-seo name="twitter:card" content="summary_large_image">`,
    `<meta data-seo name="twitter:title" content="${esc(head.title)}">`,
    `<meta data-seo name="twitter:description" content="${esc(head.description)}">`,
    `<meta data-seo name="twitter:image" content="${esc(image)}">`,
    ...[legalServiceSchema(), ...(head.jsonLd ?? [])].map(
      (d) => `<script data-seo type="application/ld+json">${json(d)}</script>`,
    ),
  ];
  return tags.filter(Boolean).join("\n    ");
}
