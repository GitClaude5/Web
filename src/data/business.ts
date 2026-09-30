/**
 * Datos centrales del negocio. Única fuente de verdad para teléfono, redes,
 * ubicación y funcionalidades opcionales.
 *
 * REGLA: no inventar datos. Todo lo que esté vacío o en `null` está pendiente
 * de confirmación por Asesoría Sefoz y la web lo oculta automáticamente.
 */

export type PostalAddress = {
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
};

export const business = {
  name: "Asesoría Sefoz",
  descriptor: "Extranjería & Legalización",
  tagline: "Tu situación merece una respuesta clara.",
  positioning: "Abogado especialista en derecho de extranjería en Madrid.",

  phoneDisplay: "646 406 788",
  phoneHref: "+34646406788",

  city: "Madrid",
  region: "Comunidad de Madrid",
  country: "ES",

  /** Pendiente de confirmación. Mantener `null`: no se muestra ni se añade al schema. */
  address: null as PostalAddress | null,

  facebook:
    "https://www.facebook.com/p/Asesor%C3%ADa-Sefoz-61564037977597/?locale=es_ES",

  /** URL de un calendario real de reservas. Vacío → "Solicitar cita" abre el formulario. */
  bookingUrl: "",
  /** No confirmado. No mostrar WhatsApp hasta que el negocio lo valide. */
  whatsappEnabled: false,
  whatsappNumber: "",
  /** El mapa solo puede activarse cuando exista `address`. */
  mapsEnabled: false,
  /** Solo reseñas reales y verificadas. */
  reviewsEnabled: false,

  /** Datos profesionales pendientes. El bloque de perfil no se muestra hasta completarlos. */
  lawyer: {
    name: "",
    role: "",
    barAssociation: "",
    barNumber: "",
    bio: "",
    photo: "",
  },

  /**
   * Logotipo. `official: false` indica que se está usando la reproducción
   * digital provisional del sello. Cuando se reciba el archivo oficial,
   * colocarlo en /public/brand/ y rellenar `src`.
   */
  logo: {
    official: false,
    src: "", // p. ej. "/brand/logo-sefoz.svg"
  },
} as const;

export const telHref = `tel:${business.phoneHref}`;

/** El mapa solo se renderiza si hay dirección confirmada Y está activado. */
export const canShowMap = () => business.mapsEnabled && business.address !== null;

/** Reseñas: desactivadas hasta disponer de reseñas reales verificadas. */
export const REVIEWS_ENABLED = business.reviewsEnabled;
export const WHATSAPP_ENABLED = business.whatsappEnabled;
export const MAPS_ENABLED = business.mapsEnabled;
export const BOOKING_URL = business.bookingUrl;
