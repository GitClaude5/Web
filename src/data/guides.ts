/**
 * Guías (SEO). NO generar contenido legal con IA: cada guía debe redactarse
 * o revisarse por un profesional y mostrar su fecha de revisión.
 * Mientras `published` sea false, la guía aparece como "En preparación".
 */
export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  relatedService: string;
  published: boolean;
  lastReviewedAt: string | null;
  reviewedBy: string | null;
  seoTitle: string;
  seoDescription: string;
  body: GuideBlock[];
};

const planned = (
  slug: string,
  title: string,
  excerpt: string,
  relatedService: string,
): Guide => ({
  slug,
  title,
  excerpt,
  relatedService,
  published: false,
  lastReviewedAt: null,
  reviewedBy: null,
  seoTitle: `${title} | Guías Asesoría Sefoz`,
  seoDescription: excerpt,
  body: [],
});

export const guides: Guide[] = [
  planned("nacionalidad", "Nacionalidad", "Cómo plantear un procedimiento de nacionalidad española y qué conviene revisar antes de empezar.", "nacionalidad"),
  planned("arraigo", "Arraigo", "Qué es el arraigo y por qué cada situación requiere una valoración individual.", "arraigo"),
  planned("residencia", "Residencia", "Una visión general de las autorizaciones de residencia y cómo orientarse.", "residencia"),
  planned("reagrupacion", "Reagrupación", "Qué conviene preparar antes de plantear un procedimiento de reagrupación familiar.", "reagrupacion-familiar"),
  planned("renovaciones", "Renovaciones", "Por qué conviene revisar con antelación la renovación de una autorización.", "renovaciones"),
  planned("autorizacion-de-regreso", "Autorización de regreso", "Qué revisar antes de viajar si tienes un trámite de extranjería en curso.", "autorizacion-de-regreso"),
];

export const publishedGuides = guides.filter((g) => g.published);
export const getGuide = (slug: string) => publishedGuides.find((g) => g.slug === slug);
