/**
 * Registro de imágenes. Cada slot admite una fotografía real o, mientras
 * no exista, una composición gráfica editorial (sin personas de stock).
 *
 * status:
 *  - "PENDING_REAL_ASSET": se espera fotografía real de Asesoría Sefoz.
 *  - "TEMPORARY_STOCK": imagen de stock con licencia, sustituir cuando haya fotos reales.
 *  - "FINAL": imagen definitiva.
 *
 * Para activar una foto: colocar el archivo optimizado (AVIF/WebP) en
 * /public/images/ y rellenar `src` (+ `srcSet` si hay variantes).
 * Nunca etiquetar a una persona de stock como "nuestro abogado".
 */
export type ImageSlot = {
  src: string | null;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  status: "PENDING_REAL_ASSET" | "TEMPORARY_STOCK" | "FINAL";
};

export const imagery = {
  hero: {
    src: null,
    width: 1200,
    height: 1500,
    alt: "Consulta de extranjería en Asesoría Sefoz",
    status: "PENDING_REAL_ASSET",
  },
  /** Fotografía real del rótulo circular del despacho (sección "La asesoría"). */
  sign: {
    src: null,
    width: 1200,
    height: 1200,
    alt: "Rótulo retroiluminado de Asesoría Sefoz, Extranjería & Legalización",
    status: "PENDING_REAL_ASSET",
  },
} satisfies Record<string, ImageSlot>;
