export type NavItem = { label: string; to: string; kind?: "services" };

export const mainNav: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios", kind: "services" },
  { label: "Cómo trabajamos", to: "/#como-trabajamos" },
  { label: "Asesoría", to: "/asesoria" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contacto", to: "/contacto" },
];

/** Menú móvil (sección 48 del brief). */
export const mobileNav = [
  { label: "Servicios", to: "/servicios" },
  { label: "Nacionalidad", to: "/nacionalidad" },
  { label: "Arraigo", to: "/arraigo" },
  { label: "Residencia", to: "/residencia" },
  { label: "Reagrupación", to: "/reagrupacion-familiar" },
  { label: "Contacto", to: "/contacto" },
];

export const mobileSecondaryNav = [
  { label: "Cómo trabajamos", to: "/#como-trabajamos" },
  { label: "Asesoría", to: "/asesoria" },
  { label: "FAQ", to: "/#faq" },
];

export const footerServices = [
  "nacionalidad",
  "arraigo",
  "residencia",
  "reagrupacion-familiar",
  "permisos-de-trabajo",
  "renovaciones",
];

/** Enlace de consulta con tipo preseleccionado. */
export const consultPath = (subject?: string) =>
  subject ? `/contacto?consulta=${subject}#formulario` : "/contacto#formulario";
