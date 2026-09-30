import { publishedServices } from "@/data/services";
import { publishedGuides } from "@/data/guides";

/** Rutas a prerenderizar. `sitemap: false` para páginas noindex. */
export const staticRoutes: { path: string; sitemap: boolean; priority: number }[] = [
  { path: "/", sitemap: true, priority: 1.0 },
  { path: "/servicios", sitemap: true, priority: 0.9 },
  ...publishedServices.map((s) => ({ path: `/${s.slug}`, sitemap: true, priority: 0.8 })),
  { path: "/asesoria", sitemap: true, priority: 0.6 },
  { path: "/contacto", sitemap: true, priority: 0.7 },
  { path: "/guias", sitemap: publishedGuides.length > 0, priority: 0.5 },
  ...publishedGuides.map((g) => ({ path: `/guias/${g.slug}`, sitemap: true, priority: 0.6 })),
  { path: "/aviso-legal", sitemap: false, priority: 0.1 },
  { path: "/privacidad", sitemap: false, priority: 0.1 },
  { path: "/cookies", sitemap: false, priority: 0.1 },
];
