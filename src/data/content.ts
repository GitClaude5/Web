/** Contenido editorial reutilizable (proceso y pilares). */

export const processSteps = [
  {
    number: "01",
    title: "Cuéntanos tu situación",
    text: "Explícanos qué necesitas y en qué punto te encuentras.",
  },
  {
    number: "02",
    title: "Analizamos el caso",
    text: "Revisamos las circunstancias y la información disponible.",
  },
  {
    number: "03",
    title: "Te explicamos las opciones",
    text: "Te orientamos sobre las alternativas y siguientes pasos que convenga estudiar.",
  },
  {
    number: "04",
    title: "Tramitación y seguimiento",
    text: "Cuando proceda, te acompañamos en la preparación y seguimiento del procedimiento contratado.",
  },
] as const;

/**
 * Pilares de confianza.
 * `needsConfirmation`: claim que Asesoría Sefoz debe confirmar antes de publicar.
 */
export const pillars = [
  {
    title: "Claridad",
    text: "Explicaciones comprensibles sobre el procedimiento y los próximos pasos.",
    needsConfirmation: false,
  },
  {
    title: "Atención personalizada",
    text: "Cada consulta parte de la situación concreta de la persona.",
    needsConfirmation: false,
  },
  {
    title: "Especialización",
    text: "Enfoque centrado en extranjería y regularización.",
    needsConfirmation: false,
  },
  {
    title: "Seguimiento",
    text: "Acompañamiento durante las fases del servicio contratado.",
    needsConfirmation: true,
  },
] as const;

export const trustItems = ["Extranjería", "Nacionalidad", "Residencia", "Arraigo", "Madrid"] as const;
