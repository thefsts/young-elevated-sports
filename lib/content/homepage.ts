/**
 * Homepage content for sections 06–12.
 *
 * Kept separate from `lib/i18n/dictionaries.ts` because these sections are
 * long-form marketing copy that changes independently of the UI chrome. The
 * shape is `{ en, es }` so a server component can pick a locale without
 * threading a translator through every card.
 *
 * INTEGRITY RULES OBSERVED HERE
 * - No testimonial, rating, client name, endorsement or athlete achievement is
 *   invented. `testimonials` is an empty, typed array and the UI renders an
 *   explicit "coming soon" state until real, approved reviews are supplied.
 * - No performance statistic or promised result appears anywhere.
 * - Pricing figures are imported from `lib/content/classes.ts`, never retyped.
 * - FAQ answers restate only approved facts (75-minute sessions, package rules,
 *   the guardian requirement in the intake form) or explicitly say that
 *   something is arranged with the coach / not yet enabled.
 */

import type { Locale } from "@/lib/i18n/config";

export type ProgramCopy = {
  slug: string;
  index: string;
  title: string;
  blurb: string;
  benefits: string[];
  imageCategory:
    | "sprinting"
    | "vertical-jump"
    | "agility-footwork"
    | "strength";
};

export type WhyItem = { title: string; body: string };

export type DevelopmentStep = { index: string; title: string; body: string };

export type GalleryItem = {
  category:
    | "sprinting"
    | "strength"
    | "agility-footwork"
    | "vertical-jump"
    | "coach-instruction"
    | "facility";
  caption: string;
  alt: string;
};

export type FaqItem = { q: string; a: string };

/**
 * A real, approved testimonial. The array below is intentionally empty.
 * When the client supplies reviews, add entries here — the section switches
 * from the "coming soon" state to the review grid automatically.
 */
export type Testimonial = {
  id: string;
  /** Athlete or parent name, exactly as the client approved it for publication. */
  name: string;
  /** "Athlete" or "Parent" — how the person should be described. */
  role: "Athlete" | "Parent";
  /** Sport or program, e.g. "Football · Speed & Agility". */
  context: string;
  quote: string;
  /** ISO date of the verified review, if one exists. */
  date?: string;
  /** Optional authorized photograph. Omit when not authorized. */
  image?: string;
  /** True only when the client has confirmed the review is genuine. */
  verified: boolean;
};

export const testimonials: Testimonial[] = [];

type HomepageCopy = {
  programs: {
    eyebrow: string;
    title: string;
    intro: string;
    link: string;
    items: ProgramCopy[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    sessionNote: string;
    flexLabel: string;
    monthlyLabel: string;
    cta: string;
    ctaSecondary: string;
  };
  why: {
    eyebrow: string;
    title: string;
    intro: string;
    items: WhyItem[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    intro: string;
    emptyTitle: string;
    emptyBody: string;
    /** What every published review will show. Describes the card, not a review. */
    fields: { label: string; detail: string }[];
    cta: string;
  };
  development: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: DevelopmentStep[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    disclosure: string;
    items: GalleryItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: FaqItem[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
};

export const homepageCopy: Record<Locale, HomepageCopy> = {
  en: {
    programs: {
      eyebrow: "Our training programs",
      title: "Four tracks. One athlete.",
      intro:
        "Each track targets a specific quality, and every session is programmed against the athlete's assessment rather than applied as a generic workout. Sessions run 75 minutes.",
      link: "View this program",
      items: [
        {
          slug: "speed-agility",
          index: "01",
          title: "Speed & Agility",
          blurb:
            "Sprint mechanics, acceleration, and the ability to change speed on demand — built from the first step outward.",
          benefits: [
            "Acceleration and first-step quickness",
            "Sprint mechanics and posture",
            "Top-speed control and efficiency",
          ],
          imageCategory: "sprinting",
        },
        {
          slug: "explosive-force-vertical-jump",
          index: "02",
          title: "Explosive Force & Vertical Jump Mechanics",
          blurb:
            "Jump mechanics, landing control, and force production trained with intent — technique before load, every time.",
          benefits: [
            "Jump and landing mechanics",
            "Force production and rate of development",
            "Lower-body power with technical control",
          ],
          imageCategory: "vertical-jump",
        },
        {
          slug: "multi-directional-agility-deceleration",
          index: "03",
          title: "Multi-Directional Agility & Deceleration",
          blurb:
            "Cutting, braking, and re-acceleration — the movements that decide plays and reduce avoidable risk.",
          benefits: [
            "Change-of-direction technique",
            "Deceleration and braking control",
            "Balance and body control under speed",
          ],
          imageCategory: "agility-footwork",
        },
        {
          slug: "athletic-strength-conditioning",
          index: "04",
          title: "Athletic Strength & Conditioning",
          blurb:
            "Progressive strength and conditioning that supports sport performance and builds durable, resilient athletes.",
          benefits: [
            "Progressive strength development",
            "Posterior-chain and core strength",
            "Conditioning that supports the sport",
          ],
          imageCategory: "strength",
        },
      ],
    },
    pricing: {
      eyebrow: "Classes & membership packages",
      title: "Approved pricing.",
      intro:
        "Every session is 75 minutes and any class track can be used inside a package. Choose a single session, a prepaid Flex bundle, or a monthly membership.",
      sessionNote: "All sessions are 75 minutes.",
      flexLabel: "Flex bundles",
      monthlyLabel: "Monthly membership",
      cta: "Start registration",
      ctaSecondary: "See all classes",
    },
    why: {
      eyebrow: "Why train with YESP",
      title: "Coaching that holds a standard.",
      intro:
        "Young & Elevated Sports Performance is built around the individual athlete — their sport, their season, and the habits that carry them past the next level.",
      items: [
        {
          title: "Coaching experience",
          body: "Led by a former Division I football player who moved from competing into athlete development, with coaching grounded in technique and accountability.",
        },
        {
          title: "Athlete-specific development",
          body: "Programming starts from the individual assessment. Two athletes in the same session are not running the same plan.",
        },
        {
          title: "Speed, strength and movement",
          body: "Speed, power, strength, and movement quality are developed together rather than treated as separate workouts.",
        },
        {
          title: "Measurable progress",
          body: "Objective tools record what changes over time, so decisions are based on a trend line instead of a feeling.",
        },
        {
          title: "Discipline and winning habits",
          body: "The habits that separate consistent competitors from occasional ones are coached deliberately, session after session.",
        },
        {
          title: "Training for the next level",
          body: "The environment is designed to prepare athletes for the demands that come after high school and club sport.",
        },
      ],
    },
    reviews: {
      eyebrow: "What athletes and parents say",
      title: "Athlete Reviews & Testimonials",
      intro:
        "Real feedback from YESP athletes and their families, published only after it has been collected and approved for release.",
      emptyTitle: "Athlete stories coming soon.",
      emptyBody:
        "We will not invent testimonials, star ratings, client names, or athlete achievements. When verified reviews are available, each one will appear here with the athlete or parent's name, their sport or program, and the date of the review.",
      fields: [
        {
          label: "Athlete or parent name",
          detail: "Published only with written permission from the person named.",
        },
        {
          label: "Sport or program",
          detail: "The class or training program the review relates to.",
        },
        {
          label: "Verified date",
          detail: "When the review was collected, so nothing is undated or anonymous.",
        },
      ],
      cta: "Learn about training",
    },
    development: {
      eyebrow: "Athlete development & results",
      title: "A process, not a workout.",
      intro:
        "Every athlete moves through the same five stages. The content of each stage is individual; the structure is not.",
      steps: [
        {
          index: "01",
          title: "Assessment",
          body: "Movement quality, speed, and power are measured before programming begins, so the starting point is objective.",
        },
        {
          index: "02",
          title: "Training plan",
          body: "A plan is built around the athlete's sport, season, and assessment results — not a template.",
        },
        {
          index: "03",
          title: "Coaching",
          body: "Technique is coached directly, with hands-on instruction and correction in every session.",
        },
        {
          index: "04",
          title: "Progress tracking",
          body: "Repeat measurements show what is changing, and the plan adjusts to the trend.",
        },
        {
          index: "05",
          title: "Continued development",
          body: "As the athlete advances, the work progresses with them rather than repeating the same block.",
        },
      ],
    },
    gallery: {
      eyebrow: "Training in action",
      title: "Inside the work.",
      intro:
        "Sprint work, strength, agility, jump training, and direct coach-to-athlete instruction.",
      disclosure:
        "Imagery on this page is brand-directed placeholder photography, not YESP athletes, clients, or facilities. It will be replaced with real training photography when available.",
      items: [
        {
          category: "sprinting",
          caption: "Sprint and acceleration work",
          alt: "Athlete exploding out of a starting position on an indoor track under warm gold light.",
        },
        {
          category: "strength",
          caption: "Strength and conditioning",
          alt: "Athlete mid-lift with a loaded bar in a dark performance gym.",
        },
        {
          category: "agility-footwork",
          caption: "Agility and footwork drills",
          alt: "Athlete moving low through a cone and ladder drill on dark turf.",
        },
        {
          category: "vertical-jump",
          caption: "Vertical jump training",
          alt: "Athlete at the peak of a vertical jump test with measuring vanes below.",
        },
        {
          category: "coach-instruction",
          caption: "Coach-to-athlete instruction",
          alt: "Coach kneeling beside an athlete giving hands-on technical instruction.",
        },
        {
          category: "facility",
          caption: "Indoor training facility",
          alt: "Indoor athletic training facility with turf, racks, and warm directional lighting.",
        },
      ],
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Before you register.",
      intro:
        "Short answers to the questions we are asked most. Anything not covered here is best answered directly by the coach.",
      items: [
        {
          q: "Who can register?",
          a: "Registration is open to athletes from elementary grades through college and adult athletes. The intake form asks for current grade level so training can be matched to the athlete's stage of development.",
        },
        {
          q: "Which sports are supported?",
          a: "Training is built around athletic qualities — speed, power, strength, and movement — rather than a single sport. Athletes from any sport can train, and the intake form asks for primary sport and position so the plan reflects it.",
        },
        {
          q: "How long is each session?",
          a: "Every session is 75 minutes, across all class tracks and all packages.",
        },
        {
          q: "How do class packages work?",
          a: "You can book a single session, buy a prepaid Flex bundle, or choose a monthly membership. Flex bundles are four or eight sessions and expire 60 days after purchase. Monthly memberships provide a fixed number of sessions each month. Any class track can be used inside a package.",
        },
        {
          q: "Do parents need to complete registration for minors?",
          a: "Yes. The intake form includes a required parent or guardian section with relationship, phone, email, and an emergency contact. A guardian signature is also part of the agreement step.",
        },
        {
          q: "What should athletes bring?",
          a: "Water, athletic clothing, and shoes appropriate for turf or court work. Ask the coach about anything sport-specific, such as cleats or a mouthguard.",
        },
        {
          q: "How do scheduling and availability work?",
          a: "Scheduling is arranged directly with the coach. This site does not display live class availability or confirm bookings.",
        },
        {
          q: "What happens after submitting an inquiry?",
          a: "Online submission is not yet enabled. The intake form can be completed and reviewed, but nothing you enter is transmitted, stored, or logged. When submission opens, a coach will follow up to confirm placement and scheduling.",
        },
      ],
    },
    finalCta: {
      eyebrow: "The next level starts here",
      title: "Ready to elevate your game?",
      body: "Develop the athletic skills, discipline, and confidence that carry into competition — and past it.",
      primary: "Start Training",
      secondary: "Explore Classes",
      tertiary: "Contact YESP",
    },
  },

  es: {
    programs: {
      eyebrow: "Nuestros programas de entrenamiento",
      title: "Cuatro rutas. Un atleta.",
      intro:
        "Cada ruta trabaja una cualidad específica, y cada sesión se programa a partir de la evaluación del atleta en lugar de aplicarse como un entrenamiento genérico. Las sesiones duran 75 minutos.",
      link: "Ver este programa",
      items: [
        {
          slug: "speed-agility",
          index: "01",
          title: "Velocidad y agilidad",
          blurb:
            "Mecánica de carrera, aceleración y capacidad de cambiar de velocidad a demanda, construidas desde el primer paso.",
          benefits: [
            "Aceleración y rapidez del primer paso",
            "Mecánica de carrera y postura",
            "Control y eficiencia en velocidad máxima",
          ],
          imageCategory: "sprinting",
        },
        {
          slug: "explosive-force-vertical-jump",
          index: "02",
          title: "Fuerza explosiva y mecánica del salto vertical",
          blurb:
            "Mecánica de salto, control de aterrizaje y producción de fuerza entrenados con intención: primero la técnica, luego la carga.",
          benefits: [
            "Mecánica de salto y aterrizaje",
            "Producción de fuerza y velocidad de desarrollo",
            "Potencia del tren inferior con control técnico",
          ],
          imageCategory: "vertical-jump",
        },
        {
          slug: "multi-directional-agility-deceleration",
          index: "03",
          title: "Agilidad multidireccional y desaceleración",
          blurb:
            "Cambios de dirección, frenado y reaceleración: los movimientos que deciden jugadas y reducen riesgos evitables.",
          benefits: [
            "Técnica de cambio de dirección",
            "Control de desaceleración y frenado",
            "Equilibrio y control corporal a velocidad",
          ],
          imageCategory: "agility-footwork",
        },
        {
          slug: "athletic-strength-conditioning",
          index: "04",
          title: "Fuerza y acondicionamiento atlético",
          blurb:
            "Fuerza y acondicionamiento progresivos que apoyan el rendimiento deportivo y forman atletas resistentes y duraderos.",
          benefits: [
            "Desarrollo progresivo de fuerza",
            "Fuerza de cadena posterior y core",
            "Acondicionamiento que apoya al deporte",
          ],
          imageCategory: "strength",
        },
      ],
    },
    pricing: {
      eyebrow: "Clases y paquetes de membresía",
      title: "Precios aprobados.",
      intro:
        "Cada sesión dura 75 minutos y cualquier clase puede usarse dentro de un paquete. Elige una sesión individual, un paquete flexible prepagado o una membresía mensual.",
      sessionNote: "Todas las sesiones duran 75 minutos.",
      flexLabel: "Paquetes flexibles",
      monthlyLabel: "Membresía mensual",
      cta: "Comenzar registro",
      ctaSecondary: "Ver todas las clases",
    },
    why: {
      eyebrow: "Por qué entrenar con YESP",
      title: "Un entrenamiento con estándar.",
      intro:
        "Young & Elevated Sports Performance se construye alrededor del atleta individual: su deporte, su temporada y los hábitos que lo llevan más allá del siguiente nivel.",
      items: [
        {
          title: "Experiencia de entrenamiento",
          body: "Dirigido por un exjugador de fútbol americano de División I que pasó de competir al desarrollo de atletas, con un enfoque basado en técnica y responsabilidad.",
        },
        {
          title: "Desarrollo específico del atleta",
          body: "La programación parte de la evaluación individual. Dos atletas en la misma sesión no siguen el mismo plan.",
        },
        {
          title: "Velocidad, fuerza y movimiento",
          body: "Velocidad, potencia, fuerza y calidad de movimiento se desarrollan juntos, no como entrenamientos separados.",
        },
        {
          title: "Progreso medible",
          body: "Herramientas objetivas registran lo que cambia con el tiempo, para decidir con datos y no con impresiones.",
        },
        {
          title: "Disciplina y hábitos ganadores",
          body: "Los hábitos que separan a los competidores constantes de los ocasionales se entrenan de forma deliberada, sesión tras sesión.",
        },
        {
          title: "Entrenamiento para el siguiente nivel",
          body: "El entorno está diseñado para preparar atletas para las exigencias que llegan después del deporte escolar y de club.",
        },
      ],
    },
    reviews: {
      eyebrow: "Lo que dicen atletas y padres",
      title: "Reseñas y testimonios de atletas",
      intro:
        "Comentarios reales de atletas de YESP y sus familias, publicados solo después de recopilarlos y aprobar su publicación.",
      emptyTitle: "Historias de atletas muy pronto.",
      emptyBody:
        "No inventaremos testimonios, calificaciones, nombres de clientes ni logros de atletas. Cuando existan reseñas verificadas, cada una aparecerá aquí con el nombre del atleta o del padre, su deporte o programa y la fecha de la reseña.",
      fields: [
        {
          label: "Nombre del atleta o del padre",
          detail: "Se publica solo con permiso escrito de la persona nombrada.",
        },
        {
          label: "Deporte o programa",
          detail: "La clase o el programa de entrenamiento al que se refiere la reseña.",
        },
        {
          label: "Fecha verificada",
          detail: "Cuándo se recopiló la reseña, para que ninguna quede sin fecha.",
        },
      ],
      cta: "Conocer el entrenamiento",
    },
    development: {
      eyebrow: "Desarrollo y resultados del atleta",
      title: "Un proceso, no una rutina.",
      intro:
        "Cada atleta pasa por las mismas cinco etapas. El contenido de cada etapa es individual; la estructura no.",
      steps: [
        {
          index: "01",
          title: "Evaluación",
          body: "La calidad de movimiento, la velocidad y la potencia se miden antes de programar, para que el punto de partida sea objetivo.",
        },
        {
          index: "02",
          title: "Plan de entrenamiento",
          body: "El plan se construye alrededor del deporte, la temporada y los resultados de la evaluación, no de una plantilla.",
        },
        {
          index: "03",
          title: "Entrenamiento",
          body: "La técnica se entrena directamente, con instrucción y corrección en cada sesión.",
        },
        {
          index: "04",
          title: "Seguimiento del progreso",
          body: "Las mediciones repetidas muestran qué está cambiando y el plan se ajusta a la tendencia.",
        },
        {
          index: "05",
          title: "Desarrollo continuo",
          body: "A medida que el atleta avanza, el trabajo progresa con él en lugar de repetir el mismo bloque.",
        },
      ],
    },
    gallery: {
      eyebrow: "Entrenamiento en acción",
      title: "Dentro del trabajo.",
      intro:
        "Trabajo de velocidad, fuerza, agilidad, salto e instrucción directa del entrenador al atleta.",
      disclosure:
        "Las imágenes de esta página son fotografías de relleno dirigidas por la marca, no atletas, clientes ni instalaciones de YESP. Se reemplazarán con fotografía real de entrenamiento cuando esté disponible.",
      items: [
        {
          category: "sprinting",
          caption: "Trabajo de velocidad y aceleración",
          alt: "Atleta saliendo explosivamente de una posición de salida en una pista interior con luz dorada cálida.",
        },
        {
          category: "strength",
          caption: "Fuerza y acondicionamiento",
          alt: "Atleta a mitad de un levantamiento con barra cargada en un gimnasio oscuro.",
        },
        {
          category: "agility-footwork",
          caption: "Ejercicios de agilidad y pies",
          alt: "Atleta moviéndose bajo por un circuito de conos y escalera en césped oscuro.",
        },
        {
          category: "vertical-jump",
          caption: "Entrenamiento de salto vertical",
          alt: "Atleta en el punto más alto de una prueba de salto vertical con paletas de medición debajo.",
        },
        {
          category: "coach-instruction",
          caption: "Instrucción del entrenador al atleta",
          alt: "Entrenador arrodillado junto a un atleta dando instrucción técnica directa.",
        },
        {
          category: "facility",
          caption: "Instalación de entrenamiento interior",
          alt: "Instalación de entrenamiento atlético interior con césped, racks e iluminación cálida.",
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Antes de registrarte.",
      intro:
        "Respuestas breves a las preguntas más comunes. Cualquier otra cosa se responde mejor directamente con el entrenador.",
      items: [
        {
          q: "¿Quién puede registrarse?",
          a: "El registro está abierto a atletas desde grados de primaria hasta universidad y atletas adultos. El formulario pide el grado actual para adaptar el entrenamiento a la etapa del atleta.",
        },
        {
          q: "¿Qué deportes se apoyan?",
          a: "El entrenamiento se construye alrededor de cualidades atléticas —velocidad, potencia, fuerza y movimiento— más que de un solo deporte. Atletas de cualquier deporte pueden entrenar, y el formulario pide deporte y posición principales para reflejarlo en el plan.",
        },
        {
          q: "¿Cuánto dura cada sesión?",
          a: "Cada sesión dura 75 minutos, en todas las clases y todos los paquetes.",
        },
        {
          q: "¿Cómo funcionan los paquetes de clases?",
          a: "Puedes reservar una sesión individual, comprar un paquete flexible prepagado o elegir una membresía mensual. Los paquetes flexibles son de cuatro u ocho sesiones y vencen 60 días después de la compra. Las membresías mensuales dan un número fijo de sesiones cada mes. Cualquier clase puede usarse dentro de un paquete.",
        },
        {
          q: "¿Los padres deben completar el registro de los menores?",
          a: "Sí. El formulario incluye una sección obligatoria de padre o tutor con relación, teléfono, correo y un contacto de emergencia. La firma del tutor también forma parte del paso de acuerdos.",
        },
        {
          q: "¿Qué deben llevar los atletas?",
          a: "Agua, ropa deportiva y calzado adecuado para césped o cancha. Pregunta al entrenador por cualquier cosa específica del deporte, como tacos o protector bucal.",
        },
        {
          q: "¿Cómo funcionan los horarios y la disponibilidad?",
          a: "Los horarios se coordinan directamente con el entrenador. Este sitio no muestra disponibilidad en vivo ni confirma reservas.",
        },
        {
          q: "¿Qué pasa después de enviar una consulta?",
          a: "El envío en línea aún no está habilitado. El formulario puede completarse y revisarse, pero nada de lo que escribes se transmite, almacena ni registra. Cuando el envío se habilite, un entrenador dará seguimiento para confirmar la colocación y los horarios.",
        },
      ],
    },
    finalCta: {
      eyebrow: "El siguiente nivel empieza aquí",
      title: "¿Listo para elevar tu juego?",
      body: "Desarrolla las habilidades atléticas, la disciplina y la confianza que se llevan a la competencia, y más allá.",
      primary: "Comenzar entrenamiento",
      secondary: "Explorar clases",
      tertiary: "Contactar a YESP",
    },
  },
};
