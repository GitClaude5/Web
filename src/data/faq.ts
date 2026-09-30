import { business } from "./business";

export type FaqItem = { question: string; answer: string };

/** FAQ general (home). Revisar con Asesoría Sefoz antes de publicar. */
export const faq: FaqItem[] = [
  {
    question: "¿En qué trámites podéis ayudarme?",
    answer:
      "Asesoría Sefoz trabaja en diferentes procedimientos de extranjería, entre ellos nacionalidad, residencia, arraigo, reagrupación familiar, permisos de trabajo, renovaciones y otros procedimientos relacionados.",
  },
  {
    question: "No sé qué trámite necesito. ¿Puedo consultar igualmente?",
    answer:
      "No es necesario que conozcas previamente el nombre del procedimiento. Puedes explicarnos tu situación para que podamos estudiar qué opciones conviene valorar.",
  },
  {
    question: "¿Trabajáis nacionalidad?",
    answer: "Sí. La nacionalidad forma parte de los servicios indicados por Asesoría Sefoz.",
  },
  {
    question: "¿Lleváis arraigo?",
    answer: "Sí. Puedes consultar tu situación para valorar las opciones que puedan corresponder.",
  },
  {
    question: "¿Hacéis reagrupación familiar?",
    answer:
      "Sí. Asesoría Sefoz ofrece asesoramiento relacionado con procedimientos de reagrupación familiar.",
  },
  {
    question: "¿Puedo consultar por teléfono?",
    answer: `Puedes contactar en el ${business.phoneDisplay} dentro del horario de atención.`,
  },
  {
    question: "¿Cuánto tarda mi trámite?",
    answer:
      "Los plazos dependen del procedimiento, de las circunstancias del expediente y de los organismos competentes. Para obtener una orientación más útil es necesario valorar el caso concreto.",
  },
  {
    question: "¿Podéis garantizar que me lo aprueben?",
    answer:
      "No es posible garantizar el resultado de un procedimiento administrativo o jurídico. El objetivo del asesoramiento es valorar el caso, preparar adecuadamente la tramitación y acompañar el proceso contratado.",
  },
];
