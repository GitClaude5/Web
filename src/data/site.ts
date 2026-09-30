/**
 * Configuración técnica del sitio (SEO, analítica, idiomas).
 */

/** Dominio público sin barra final. Se define en VITE_SITE_URL al desplegar. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

/** Vacío → no se carga ningún script de analítica ni se muestra aviso de cookies. */
export const ANALYTICS_ID = "";

/**
 * Idiomas disponibles. Solo español. Preparado para "en", "fr", "ar"
 * únicamente si el negocio decide ofrecer atención en esos idiomas.
 * Con un solo idioma no se muestra selector.
 */
export const SUPPORTED_LANGUAGES = ["es"] as const;
export const DEFAULT_LANGUAGE = "es";

export const OG_IMAGE = "/og-image.png";

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
