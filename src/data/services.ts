/**
 * Servicios de Asesoría Sefoz.
 *
 * Las denominaciones proceden del material real del negocio (`sourceName`).
 * El contenido es deliberadamente general: NO incluye requisitos, plazos,
 * documentos ni modalidades concretas. Antes de producción, un profesional
 * de Asesoría Sefoz debe revisar cada servicio y rellenar `reviewedAt`.
 */

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  id: string;
  slug: string;
  /** Denominación original facilitada por el cliente. */
  sourceName: string;
  /** Título de interfaz (mayúsculas vía CSS). */
  title: string;
  /** H1 de la página del servicio. */
  heroTitle: string;
  shortDescription: string;
  longDescription: string[];
  /** Nota prudente sobre requisitos (sin detallarlos). */
  requirementsNote: string;
  situations: string[];
  reviewPoints: string[];
  faqs: ServiceFaq[];
  ctaLabel: string;
  /** Valor del campo "Tipo de consulta" del formulario. */
  formSubject: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  menuColumn: 1 | 2;
  seoTitle: string;
  seoDescription: string;
  /** ISO date. `null` = pendiente de revisión jurídica. */
  reviewedAt: string | null;
  reviewedBy: string | null;
};

const REQUIREMENTS_NOTE =
  "Los requisitos dependen de la situación personal y del procedimiento aplicable.";

const TIMING_FAQ: ServiceFaq = {
  question: "¿Cuánto tarda el procedimiento?",
  answer:
    "Los plazos dependen del procedimiento, de las circunstancias del expediente y de los organismos competentes. Para obtener una orientación más útil es necesario valorar el caso concreto.",
};

const GUARANTEE_FAQ: ServiceFaq = {
  question: "¿Podéis garantizar el resultado?",
  answer:
    "No es posible garantizar el resultado de un procedimiento administrativo o jurídico. El objetivo del asesoramiento es valorar el caso, preparar adecuadamente la tramitación y acompañar el proceso contratado.",
};

export const services: Service[] = [
  {
    id: "nacionalidad",
    slug: "nacionalidad",
    sourceName: "Nacionalidad",
    title: "Nacionalidad",
    heroTitle: "Nacionalidad española",
    shortDescription:
      "Asesoramiento y acompañamiento en procedimientos relacionados con la adquisición de la nacionalidad española.",
    longDescription: [
      "La adquisición de la nacionalidad española puede plantearse por distintas vías, y cada una responde a circunstancias personales diferentes. Antes de iniciar cualquier trámite conviene saber qué procedimiento puede resultar aplicable a tu caso.",
      "En Asesoría Sefoz estudiamos tu situación, te explicamos con claridad las opciones que conviene valorar y, cuando proceda, te acompañamos en la preparación y el seguimiento del procedimiento.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Llevas tiempo viviendo en España y quieres saber si puedes plantear la solicitud.",
      "Tienes vínculos familiares con España y no sabes si influyen en tu caso.",
      "Has empezado a informarte, pero encuentras información contradictoria.",
      "Ya presentaste una solicitud y quieres entender en qué punto se encuentra.",
    ],
    reviewPoints: [
      "Tu situación administrativa y de residencia actual.",
      "Tus circunstancias personales y familiares.",
      "La documentación de la que ya dispones.",
      "El procedimiento que pueda resultar aplicable y sus fases.",
    ],
    faqs: [
      {
        question: "¿Qué requisitos necesito para solicitar la nacionalidad?",
        answer: `${REQUIREMENTS_NOTE} Para darte una orientación útil necesitamos conocer tu caso concreto.`,
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar nacionalidad",
    formSubject: "nacionalidad",
    image: null,
    featured: true,
    published: true,
    menuColumn: 1,
    seoTitle: "Nacionalidad Española en Madrid | Asesoría Sefoz",
    seoDescription:
      "Asesoramiento en procedimientos de nacionalidad española en Madrid. Analizamos tu caso y te orientamos sobre las opciones disponibles. Consulta tu situación.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "arraigo",
    slug: "arraigo",
    sourceName: "Arraigo",
    title: "Arraigo",
    heroTitle: "Arraigo",
    shortDescription:
      "Estudio de las posibilidades de regularización mediante las modalidades de arraigo aplicables a cada situación.",
    longDescription: [
      "El arraigo agrupa distintas modalidades de autorización vinculadas a la situación de la persona en España. Cuál puede corresponder, y en qué condiciones, depende de las circunstancias concretas de cada caso y de la normativa vigente.",
      "Estudiamos tu situación para valorar si alguna vía de arraigo puede resultar aplicable y, cuando proceda, preparamos y acompañamos la tramitación.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Vives en España y quieres saber si existe una vía para regularizar tu situación.",
      "Has oído hablar del arraigo, pero no sabes qué modalidad podría encajar contigo.",
      "Tu situación laboral, formativa o familiar ha cambiado y quieres saber si afecta a tus opciones.",
      "Has recibido información contradictoria y necesitas aclararla.",
    ],
    reviewPoints: [
      "Tu situación administrativa actual.",
      "Tu trayectoria en España.",
      "Tus circunstancias personales, familiares y laborales.",
      "La documentación de la que dispones.",
    ],
    faqs: [
      {
        question: "¿Qué tipos de arraigo existen?",
        answer:
          "La normativa contempla distintas modalidades de arraigo y su regulación puede cambiar. En la consulta revisamos cuál puede resultar aplicable según tu situación.",
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar arraigo",
    formSubject: "arraigo",
    image: null,
    featured: true,
    published: true,
    menuColumn: 1,
    seoTitle: "Arraigo en Madrid | Asesoría Sefoz",
    seoDescription:
      "Estudiamos tus posibilidades de regularización mediante arraigo en Madrid. Valoración individual de cada caso por una asesoría especializada en extranjería.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "residencia",
    slug: "residencia",
    sourceName: "Residencia",
    title: "Residencia",
    heroTitle: "Residencia",
    shortDescription:
      "Asesoramiento sobre autorizaciones y procedimientos de residencia según las circunstancias personales del solicitante.",
    longDescription: [
      "Las autorizaciones de residencia responden a situaciones muy distintas: personales, familiares, laborales o de otro tipo. Identificar la vía adecuada es el primer paso para plantear bien el procedimiento.",
      "Analizamos tus circunstancias, te explicamos qué opciones conviene estudiar y te acompañamos en la preparación de la solicitud cuando proceda.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Quieres residir en España y necesitas saber qué autorización puede corresponderte.",
      "Tu situación personal o laboral ha cambiado y quieres saber si afecta a tu autorización.",
      "Tienes una autorización y quieres conocer tus próximos pasos.",
      "Necesitas ordenar tu documentación antes de iniciar un trámite.",
    ],
    reviewPoints: [
      "Tu situación administrativa actual.",
      "Tus circunstancias personales, familiares y laborales.",
      "Las autorizaciones que hayas tenido o tengas en vigor.",
      "La documentación disponible.",
    ],
    faqs: [
      {
        question: "¿Qué autorización de residencia me corresponde?",
        answer: `${REQUIREMENTS_NOTE} En la consulta revisamos tus circunstancias para orientarte sobre las opciones que conviene valorar.`,
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar residencia",
    formSubject: "residencia",
    image: null,
    featured: true,
    published: true,
    menuColumn: 1,
    seoTitle: "Permisos de Residencia en Madrid | Asesoría Sefoz",
    seoDescription:
      "Asesoramiento sobre autorizaciones de residencia para extranjeros en Madrid. Analizamos tu situación y te orientamos sobre los procedimientos disponibles.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "reagrupacion-familiar",
    slug: "reagrupacion-familiar",
    sourceName: "Reagrupación Familiar",
    title: "Reagrupación familiar",
    heroTitle: "Reagrupación familiar",
    shortDescription:
      "Orientación sobre procedimientos para reunir a determinados familiares conforme a los requisitos legalmente aplicables.",
    longDescription: [
      "Reunir a la familia es, para muchas personas, una de las decisiones más importantes. El procedimiento depende del vínculo familiar, de la situación de quien reside en España y de los requisitos legalmente aplicables en cada momento.",
      "Revisamos tu situación familiar y tu autorización actual, te explicamos las opciones disponibles y te acompañamos en la preparación del expediente cuando proceda.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Resides en España y quieres que un familiar se reúna contigo.",
      "No sabes si el vínculo con tu familiar permite plantear este procedimiento.",
      "Quieres saber qué conviene preparar antes de iniciar el trámite.",
      "Tienes un procedimiento en curso y quieres entender su estado.",
    ],
    reviewPoints: [
      "Tu autorización actual y su situación.",
      "El vínculo familiar y cómo puede acreditarse.",
      "Tus circunstancias personales en España.",
      "La documentación disponible aquí y en el país de origen.",
    ],
    faqs: [
      {
        question: "¿A qué familiares puedo reagrupar?",
        answer: `${REQUIREMENTS_NOTE} Revisamos tu caso para orientarte sobre las opciones que puedan corresponder.`,
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar sobre reagrupación",
    formSubject: "reagrupacion-familiar",
    image: null,
    featured: true,
    published: true,
    menuColumn: 2,
    seoTitle: "Reagrupación Familiar en Madrid | Asesoría Sefoz",
    seoDescription:
      "Orientación sobre reagrupación familiar en Madrid. Revisamos tu situación familiar y tu autorización actual para valorar las opciones disponibles.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "asilo-y-refugio",
    slug: "asilo-y-refugio",
    sourceName: "Asilo y Refugio",
    title: "Asilo y refugio",
    heroTitle: "Asilo y refugio",
    shortDescription:
      "Orientación jurídica sobre procedimientos de protección internacional y las circunstancias particulares de cada caso.",
    longDescription: [
      "La protección internacional es un ámbito especialmente delicado, en el que cada historia personal requiere un estudio atento, respetuoso y confidencial.",
      "Te orientamos sobre el procedimiento, sus fases y las circunstancias particulares de tu caso, explicándote cada paso de forma comprensible.",
    ],
    requirementsNote:
      "Cada procedimiento de protección internacional depende de circunstancias personales que deben valorarse de forma individual.",
    situations: [
      "Te encuentras en España y necesitas información sobre protección internacional.",
      "Has iniciado un procedimiento y quieres entender en qué situación está.",
      "Necesitas orientación en una situación personal compleja.",
      "Quieres conocer qué alternativas conviene valorar en tu caso.",
    ],
    reviewPoints: [
      "Tu situación personal y las circunstancias de tu caso.",
      "El estado de cualquier procedimiento ya iniciado.",
      "La documentación disponible.",
      "Las alternativas que puedan valorarse.",
    ],
    faqs: [
      {
        question: "¿Qué información debo facilitar en el primer contacto?",
        answer:
          "Basta con una explicación breve de tu situación. La documentación y los detalles personales se revisan después, a través de un canal adecuado y confidencial.",
      },
      {
        question: "¿Podéis asegurar que se conceda la protección?",
        answer: GUARANTEE_FAQ.answer,
      },
      TIMING_FAQ,
    ],
    ctaLabel: "Consultar sobre protección internacional",
    formSubject: "asilo-y-refugio",
    image: null,
    featured: false,
    published: true,
    menuColumn: 2,
    seoTitle: "Asilo y Refugio en Madrid | Asesoría Sefoz",
    seoDescription:
      "Orientación jurídica sobre protección internacional (asilo y refugio) en Madrid. Estudio individual y confidencial de cada caso.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "permisos-de-trabajo",
    slug: "permisos-de-trabajo",
    sourceName: "Permisos de trabajo",
    title: "Permisos de trabajo",
    heroTitle: "Permisos de trabajo",
    shortDescription:
      "Asesoramiento sobre autorizaciones relacionadas con residencia y trabajo.",
    longDescription: [
      "Trabajar legalmente en España puede requerir distintas autorizaciones según la situación administrativa de cada persona y el tipo de actividad que quiera desarrollar.",
      "Estudiamos tu caso para explicarte qué autorizaciones conviene valorar y te acompañamos en la preparación del procedimiento cuando proceda.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Tienes una oferta de trabajo y quieres saber qué autorización puede ser necesaria.",
      "Quieres trabajar por cuenta propia o ajena y no sabes por dónde empezar.",
      "Tu autorización actual tiene limitaciones y quieres conocer tus opciones.",
      "Tu situación laboral ha cambiado y quieres saber si afecta a tu autorización.",
    ],
    reviewPoints: [
      "Tu situación administrativa actual.",
      "El tipo de actividad o empleo que quieres desarrollar.",
      "Las autorizaciones que tengas o hayas tenido.",
      "La documentación disponible.",
    ],
    faqs: [
      {
        question: "¿Qué autorización necesito para trabajar?",
        answer: `${REQUIREMENTS_NOTE} En la consulta revisamos tu situación para orientarte.`,
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar permisos de trabajo",
    formSubject: "permisos-de-trabajo",
    image: null,
    featured: false,
    published: true,
    menuColumn: 1,
    seoTitle: "Permisos de Trabajo para Extranjeros en Madrid | Asesoría Sefoz",
    seoDescription:
      "Asesoramiento sobre autorizaciones de residencia y trabajo para extranjeros en Madrid. Consulta tu caso con una asesoría especializada en extranjería.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "familiar-comunitario",
    slug: "familiar-comunitario",
    // Mapping interno con el servicio original. Validar denominación jurídica vigente.
    sourceName: "Tarjeta de Familiar de Comunitario",
    title: "Familiar de ciudadano comunitario",
    heroTitle: "Familiar de ciudadano comunitario",
    shortDescription:
      "Asesoramiento sobre la documentación de familiares de ciudadanos de la Unión Europea y los procedimientos relacionados.",
    longDescription: [
      "Los familiares de ciudadanos comunitarios pueden quedar sujetos, en determinados casos, a un régimen específico. Saber si es tu caso y qué implica es fundamental antes de iniciar el trámite.",
      "Revisamos tu situación familiar y administrativa, te explicamos el procedimiento que pueda corresponder y te acompañamos en su preparación cuando proceda.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Tienes un familiar con nacionalidad de un país de la Unión Europea y resides en España.",
      "No sabes qué procedimiento corresponde a tu situación familiar.",
      "Tu tarjeta o documentación necesita revisarse o renovarse.",
      "Tu situación familiar ha cambiado y quieres saber cómo te afecta.",
    ],
    reviewPoints: [
      "El vínculo familiar y cómo puede acreditarse.",
      "La situación del familiar comunitario en España.",
      "Tu documentación actual.",
      "El procedimiento que pueda resultar aplicable.",
    ],
    faqs: [
      {
        question: "¿Este procedimiento es el adecuado para mi caso?",
        answer: `${REQUIREMENTS_NOTE} Revisamos tu situación familiar para orientarte sobre el procedimiento que pueda corresponder.`,
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar mi caso",
    formSubject: "familiar-comunitario",
    image: null,
    featured: false,
    published: true,
    menuColumn: 2,
    seoTitle: "Familiar de Ciudadano Comunitario en Madrid | Asesoría Sefoz",
    seoDescription:
      "Asesoramiento para familiares de ciudadanos de la Unión Europea en Madrid. Revisamos tu situación y te orientamos sobre el procedimiento aplicable.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "circunstancias-excepcionales",
    slug: "circunstancias-excepcionales",
    sourceName: "Circunstancias Excepcionales",
    title: "Circunstancias excepcionales",
    heroTitle: "Circunstancias excepcionales",
    shortDescription:
      "Valoración de procedimientos que puedan corresponder cuando concurren circunstancias contempladas por la normativa.",
    longDescription: [
      "La normativa de extranjería contempla situaciones en las que pueden concurrir circunstancias excepcionales. Su valoración exige un análisis individual, cuidadoso y bien documentado.",
      "Estudiamos las circunstancias de tu caso para valorar si algún procedimiento de este tipo puede corresponder y te acompañamos en su preparación cuando proceda.",
    ],
    requirementsNote:
      "Estos procedimientos dependen de circunstancias concretas que deben valorarse de forma individual.",
    situations: [
      "Atraviesas una situación personal especial y no sabes si puede tener relevancia administrativa.",
      "Te han hablado de este tipo de autorizaciones y quieres saber si pueden aplicarse a tu caso.",
      "Ninguna otra vía parece encajar con tu situación.",
      "Necesitas una valoración prudente antes de dar ningún paso.",
    ],
    reviewPoints: [
      "Tus circunstancias personales concretas.",
      "Tu situación administrativa actual.",
      "Cómo pueden acreditarse las circunstancias alegadas.",
      "Las alternativas que conviene valorar.",
    ],
    faqs: [
      {
        question: "¿Qué se considera una circunstancia excepcional?",
        answer:
          "La normativa contempla supuestos concretos, y su aplicación depende de cada caso. Por eso es imprescindible una valoración individual antes de plantear cualquier solicitud.",
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar mi caso",
    formSubject: "circunstancias-excepcionales",
    image: null,
    featured: false,
    published: true,
    menuColumn: 2,
    seoTitle: "Circunstancias Excepcionales en Madrid | Asesoría Sefoz",
    seoDescription:
      "Valoración individual de procedimientos por circunstancias excepcionales en extranjería. Asesoría especializada en Madrid.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "renovaciones",
    slug: "renovaciones",
    sourceName: "Renovaciones",
    title: "Renovaciones",
    heroTitle: "Renovaciones",
    shortDescription:
      "Asesoramiento para revisar la continuidad o renovación de autorizaciones cuando corresponda.",
    longDescription: [
      "Cuando una autorización se acerca a su vencimiento, conviene revisar con antelación la situación para plantear la renovación o la vía de continuidad que corresponda.",
      "Revisamos tu autorización actual y tus circunstancias, te explicamos las opciones y te acompañamos en la preparación de la solicitud cuando proceda.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Tu autorización está próxima a vencer y quieres preparar la renovación.",
      "Tus circunstancias han cambiado desde que obtuviste la autorización.",
      "No tienes claro si corresponde renovar o plantear otro procedimiento.",
      "Tienes una renovación en curso y quieres entender su estado.",
    ],
    reviewPoints: [
      "Tu autorización actual y su vigencia.",
      "Los cambios en tu situación personal o laboral.",
      "La documentación disponible.",
      "La vía de continuidad que pueda corresponder.",
    ],
    faqs: [
      {
        question: "¿Cuándo debo empezar a preparar la renovación?",
        answer:
          "Los plazos dependen del tipo de autorización y de la normativa aplicable. Conviene consultar con antelación para revisar tu caso con margen suficiente.",
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar sobre renovación",
    formSubject: "renovaciones",
    image: null,
    featured: false,
    published: true,
    menuColumn: 1,
    seoTitle: "Renovación de Residencia en Madrid | Asesoría Sefoz",
    seoDescription:
      "Asesoramiento para la renovación de autorizaciones de residencia y trabajo en Madrid. Revisamos tu autorización actual y las opciones de continuidad.",
    reviewedAt: null,
    reviewedBy: null,
  },
  {
    id: "autorizacion-de-regreso",
    slug: "autorizacion-de-regreso",
    sourceName: "Autorización de Regreso",
    title: "Autorización de regreso",
    heroTitle: "Autorización de regreso",
    shortDescription:
      "Información y asistencia en la tramitación cuando las circunstancias permitan solicitar una autorización de regreso.",
    longDescription: [
      "La autorización de regreso está vinculada a situaciones en las que una persona necesita salir temporalmente de España mientras determinados trámites se encuentran en curso.",
      "Antes de planificar un viaje conviene revisar tu caso. Te informamos sobre si puede corresponder esta autorización y te asistimos en su tramitación cuando proceda.",
    ],
    requirementsNote: REQUIREMENTS_NOTE,
    situations: [
      "Necesitas viajar y tienes un trámite de extranjería en curso.",
      "Tu autorización está en proceso de renovación y te surge un viaje.",
      "No sabes si puedes salir de España sin afectar a tu procedimiento.",
      "Quieres planificar un viaje con la información correcta.",
    ],
    reviewPoints: [
      "El trámite que tienes en curso y su estado.",
      "Tu autorización actual.",
      "Las fechas y el motivo del viaje.",
      "La documentación disponible.",
    ],
    faqs: [
      {
        question: "¿Puedo viajar mientras tengo un trámite en curso?",
        answer:
          "Depende del procedimiento y de tu situación concreta. Antes de planificar el viaje conviene revisar tu caso para valorar las opciones.",
      },
      TIMING_FAQ,
      GUARANTEE_FAQ,
    ],
    ctaLabel: "Consultar sobre autorización de regreso",
    formSubject: "autorizacion-de-regreso",
    image: null,
    featured: false,
    published: true,
    menuColumn: 2,
    seoTitle: "Autorización de Regreso en Madrid | Asesoría Sefoz",
    seoDescription:
      "Información y asistencia en la tramitación de la autorización de regreso en Madrid. Revisamos tu caso antes de que planifiques el viaje.",
    reviewedAt: null,
    reviewedBy: null,
  },
];

export const publishedServices = services.filter((s) => s.published);
export const featuredServices = publishedServices.filter((s) => s.featured);
export const secondaryServices = publishedServices.filter((s) => !s.featured);

export const getService = (slug: string) =>
  publishedServices.find((s) => s.slug === slug);

export const serviceNumber = (service: Service) =>
  String(publishedServices.indexOf(service) + 1).padStart(2, "0");

/** Orden del megamenú (sección 46 del brief). */
const MENU_ORDER: Record<1 | 2, string[]> = {
  1: ["nacionalidad", "arraigo", "residencia", "permisos-de-trabajo", "renovaciones"],
  2: [
    "asilo-y-refugio",
    "reagrupacion-familiar",
    "familiar-comunitario",
    "circunstancias-excepcionales",
    "autorizacion-de-regreso",
  ],
};

export const menuColumn = (column: 1 | 2) =>
  MENU_ORDER[column]
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));

export const servicePath = (service: Pick<Service, "slug">) => `/${service.slug}`;
