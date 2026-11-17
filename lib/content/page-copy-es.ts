/**
 * Spanish body copy for the public pages that were still English-only after
 * Checkpoint 002: About, Performance Technology, Athletes, Contact, Results and
 * Media.
 *
 * Legal documents (terms, privacy, policies, waivers) are deliberately NOT
 * translated here. They remain in their existing English draft / legal-review
 * state, with a Spanish informational notice pointing to the authoritative
 * English text. That is a compliance decision, not an omission.
 *
 * English remains the source of truth in the page files; this module supplies
 * the `es` variant. `pageCopy(locale)` returns null for English, and pages fall
 * back to their inline English copy.
 */

export type AboutCopy = {
  eyebrow: string;
  titleLines: [string, string];
  meta: string[];
  missionEyebrow: string;
  emphasisEyebrow: string;
  education: string;
  certifications: string;
  certNote: string;
  accomplishments: string;
  verificationEyebrow: string;
  verificationTitle: string;
  verificationIntro: string;
  pendingTitle: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  illustrative: string;
  imageAlt: string;
};

export type TechCopy = {
  eyebrow: string;
  titleLines: [string, string];
  intro: string;
  imageAlt: string;
  s1Eyebrow: string;
  s1Title: string;
  s1Intro: string;
  s2Eyebrow: string;
  s2Title: string;
  s2Intro: string;
  verificationLabel: string;
  noticeTitle: string;
  noticeBody: string;
  dataEyebrow: string;
  dataTitleLines: [string, string];
  dataBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type AthletesCopy = {
  eyebrow: string;
  titleLines: [string, string];
  intro: string;
  imageAlt: string;
  ctaPrimary: string;
  ctaSecondary: string;
  s1Eyebrow: string;
  s1Title: string;
  s1Intro: string;
  learnEyebrow: string;
  learnTitleLines: [string, string];
  guardianTitle: string;
  guardianBody: string;
  regCta: string;
  waiverCta: string;
};

export type ContactCopy = {
  eyebrow: string;
  titleLines: [string, string];
  intro: string;
  imageAlt: string;
  s1Eyebrow: string;
  s1Title: string;
  s1Intro: string;
  submitLabel: string;
  messageLabel: string;
  channelsEyebrow: string;
  serviceEyebrow: string;
  serviceNote: string;
  privacyTitle: string;
  privacyBody: string;
};

export type ResultsCopy = {
  eyebrow: string;
  titleLines: [string, string];
  intro: string;
  imageAlt: string;
  s1Eyebrow: string;
  s1Title: string;
  s1Intro: string;
  emptyTitle: string;
  emptyBody1: string;
  emptyBody2: string;
  emptyCta: string;
  s2Eyebrow: string;
  s2Title: string;
  includeTitle: string;
  includeBody: string;
  guaranteeTitle: string;
  guaranteeBody: string;
  nextEyebrow: string;
  nextTitle: string;
  nextBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type MediaCopy = {
  eyebrow: string;
  titleLines: [string, string];
  intro: string;
  s1Eyebrow: string;
  s1Title: string;
  s1Intro: string;
  statusTitle: string;
  statusBody: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
};

export type PageCopy = {
  about: AboutCopy;
  technology: TechCopy;
  athletes: AthletesCopy;
  contact: ContactCopy;
  results: ResultsCopy;
  media: MediaCopy;
  stages: { label: string; ages: string; title: string; body: string; focus: string[] }[];
  learn: { t: string; b: string }[];
  channels: { t: string; b: string; href: string; cta: string }[];
  reportingStandards: { t: string; b: string }[];
  gallery: { caption: string; meta: string }[];
  techItems: { category: string; role: string; detail: string; verification: string }[];
  principles: { title: string; body: string }[];
  bio: {
    intro: string;
    mission: string;
    paragraphs: string[];
    emphasis: { title: string; body: string }[];
    education: { credential: string; institution: string; year: string }[];
    certifications: string[];
    accomplishments: string[];
    pendingVerification: string[];
  };
};

const es: PageCopy = {
  about: {
    eyebrow: "Nosotros · Fundador",
    titleLines: ["Conoce a", "Reggie Young"],
    meta: ["Fundador", "CSCS", "RCP y DEA", "Dallas–Fort Worth, Texas"],
    missionEyebrow: "La misión",
    emphasisEyebrow: "Enfoque de entrenamiento",
    education: "Formación académica",
    certifications: "Certificaciones",
    certNote:
      "Las insignias de certificación y los logotipos de las entidades emisoras no se muestran hasta contar con permiso escrito y verificación del estado vigente.",
    accomplishments: "Logros",
    verificationEyebrow: "Estado de verificación",
    verificationTitle: "Lo que no hemos publicado",
    verificationIntro:
      "Los siguientes detalles no fueron proporcionados ni verificados, por lo que se omiten intencionalmente en esta página en lugar de inventarlos.",
    pendingTitle: "Pendiente de verificación del cliente",
    ctaTitle: "Entrena con el Coach Young.",
    ctaBody:
      "Comienza con una consulta. Hablaremos del atleta, del deporte y del siguiente paso.",
    ctaPrimary: "Comenzar a entrenar",
    ctaSecondary: "Programas de entrenamiento",
    illustrative:
      "Imagen ilustrativa — no es una foto del cliente. Se reemplazará con fotografía autorizada.",
    imageAlt:
      "Imagen ilustrativa: una instalación de entrenamiento atlético techada y vacía, con césped artificial e iluminación superior.",
  },
  technology: {
    eyebrow: "Tecnología · Medición",
    titleLines: ["Medido.", "No adivinado."],
    intro:
      "Los datos objetivos hacen visible el entrenamiento. La velocidad, la potencia de salto y la calidad de movimiento se registran para ajustar la programación con base en evidencia y no en suposiciones.",
    imageAlt:
      "Imagen ilustrativa: equipo de medición de entrenamiento sobre césped artificial oscuro bajo iluminación dorada.",
    s1Eyebrow: "El papel de la medición",
    s1Title: "Por qué evaluamos",
    s1Intro:
      "La medición no es un truco. Responde una pregunta simple: ¿el entrenamiento está produciendo el cambio que el atleta necesita? La evaluación establece una línea base, orienta la carga y muestra la tendencia a lo largo del tiempo.",
    s2Eyebrow: "Equipamiento",
    s2Title: "Herramientas del programa",
    s2Intro:
      "El siguiente equipamiento se utiliza en el entrenamiento. Las descripciones son intencionalmente prudentes; las afirmaciones técnicas específicas se retienen hasta verificarlas con el fabricante y el cliente.",
    verificationLabel: "Verificación pendiente:",
    noticeTitle: "No se implica respaldo del fabricante",
    noticeBody:
      "Los nombres de los equipos se usan de forma descriptiva para identificar las herramientas del programa de entrenamiento. Su inclusión no implica patrocinio, asociación, respaldo ni certificación por parte del fabricante. No se muestran logotipos de fabricantes.",
    dataEyebrow: "Datos con contexto",
    dataTitleLines: ["Los números apoyan el entrenamiento.", "No lo reemplazan."],
    dataBody:
      "Una lectura de velocidad o una medición de salto es un dato entre varios. La técnica, la disposición, el historial de entrenamiento y la opinión del propio atleta moldean la siguiente sesión. Los datos se usan para hacer mejores preguntas — no para automatizar el entrenamiento.",
    ctaPrimary: "Comenzar a entrenar",
    ctaSecondary: "Desarrollo del atleta",
  },
  athletes: {
    eyebrow: "Atletas · Desarrollo",
    titleLines: ["El juego largo", "del desarrollo."],
    intro:
      "Los atletas no son productos terminados. El desarrollo es una progresión construida etapa por etapa, donde la edad, el historial de entrenamiento y el deporte del atleta dan forma al trabajo.",
    imageAlt:
      "Imagen ilustrativa: una instalación de entrenamiento techada y vacía con césped artificial e iluminación superior.",
    ctaPrimary: "Comenzar a entrenar",
    ctaSecondary: "Resultados de atletas",
    s1Eyebrow: "Trayectoria",
    s1Title: "Etapas, no atajos",
    s1Intro:
      "Cada etapa tiene una prioridad distinta. El objetivo no es apresurar al atleta hacia un trabajo avanzado, sino construir las cualidades que harán productivo ese trabajo más adelante.",
    learnEyebrow: "Lo que aprenden los atletas",
    learnTitleLines: ["Los hábitos llegan", "más lejos que el talento."],
    guardianTitle: "Guiado por el tutor para menores",
    guardianBody:
      "El registro para atletas menores de 18 años está diseñado para completarse con un padre, madre o tutor legal. El consentimiento del tutor, la divulgación médica y la aceptación de la exención forman parte del proceso de registro. Los envíos sensibles no están habilitados hasta que exista un flujo seguro y aprobado de gestión de registros.",
    regCta: "Opciones de registro",
    waiverCta: "Información de exenciones",
  },
  contact: {
    eyebrow: "Contacto",
    titleLines: ["Comencemos", "la conversación."],
    intro:
      "Cuéntanos sobre el atleta, el objetivo y el plazo. Te responderemos con los siguientes pasos — sin presión y sin secuencias de venta automatizadas.",
    imageAlt:
      "Imagen ilustrativa: una instalación de entrenamiento de rendimiento con poca luz, con racks y césped artificial.",
    s1Eyebrow: "Enviar un mensaje",
    s1Title: "Cuéntanos qué necesitas",
    s1Intro:
      "Este formulario es solo para preguntas generales. No incluyas datos médicos, de lesiones o de salud — esos datos se recopilan únicamente a través del proceso de registro seguro.",
    submitLabel: "Enviar mensaje",
    messageLabel: "Tu mensaje",
    channelsEyebrow: "Canales directos",
    serviceEyebrow: "Zona de servicio",
    serviceNote:
      "La ubicación de entrenamiento, el horario y una línea telefónica directa se publicarán una vez verificados. Mientras tanto, el formulario de consulta es el canal de contacto confirmado.",
    privacyTitle: "Nota de privacidad",
    privacyBody:
      "Los mensajes enviados a través de este formulario se usan solo para responder a tu consulta. No envíes historiales médicos, antecedentes de lesiones ni otra información de salud sensible por este medio.",
  },
  results: {
    eyebrow: "Resultados · Reporte",
    titleLines: ["Resultados reales.", "Contexto real."],
    intro:
      "Los resultados de los atletas se publicarán aquí a medida que se verifiquen y se cuente con consentimiento. Esta página explica el estándar que exigimos antes de que aparezca cualquier cifra.",
    imageAlt:
      "Imagen ilustrativa: la silueta de un atleta solitario esprintando en una pista iluminada de noche.",
    s1Eyebrow: "Estado actual",
    s1Title: "Aún no hay resultados verificados publicados",
    s1Intro:
      "La Fase 001 establece el estándar de reporte y la estructura de la página. Los resultados de atletas requieren consentimiento documentado y datos de medición verificados antes de su publicación.",
    emptyTitle: "Resultados pendientes de verificación",
    emptyBody1:
      "No hemos publicado resultados de atletas porque no se ha entregado ningún conjunto de resultados con consentimiento documentado y un protocolo de evaluación verificado. Cuando esa información sea aprobada, los resultados aparecerán aquí — con el permiso del atleta y el método de medición indicado.",
    emptyBody2:
      "Ningún testimonio, estadística o afirmación de mejora en este sitio es inventado. Es un estándar deliberado, no una omisión.",
    emptyCta: "Comenzar a entrenar",
    s2Eyebrow: "Estándar de reporte",
    s2Title: "Qué debe cumplirse antes de publicar un resultado",
    includeTitle: "Qué incluirán los resultados",
    includeBody:
      "Un resultado publicado identificará la prueba (por ejemplo, salto vertical o una distancia de sprint), el método de medición, la fecha o el periodo de evaluación y el punto de partida del atleta. Cuando un resultado sea específico de un atleta, se presentará como el resultado registrado de ese atleta — no como un resultado típico o garantizado para otros.",
    guaranteeTitle: "Sin garantías de rendimiento",
    guaranteeBody:
      "Los resultados del entrenamiento varían según el historial, la constancia, las exigencias del deporte, el crecimiento y otros factores fuera del control del entrenador. Nada en esta página debe interpretarse como una promesa de mejora, prevención de lesiones, beca, resultado de reclutamiento o contrato profesional.",
    nextEyebrow: "Siguiente paso",
    nextTitle: "Comienza con una línea base.",
    nextBody:
      "La medición comienza con una evaluación. Consulta para hablar del atleta y del punto de partida adecuado.",
    ctaPrimary: "Comenzar a entrenar",
    ctaSecondary: "Tecnología",
  },
  media: {
    eyebrow: "Medios · Galería",
    titleLines: ["Dentro del", "entorno."],
    intro:
      "El entrenamiento se construye con repetición, detalle e intensidad. Esta galería muestra el entorno y el trabajo — y se reemplazará con fotografía autorizada del cliente a medida que esté disponible.",
    s1Eyebrow: "Galería",
    s1Title: "El trabajo",
    s1Intro:
      "Las imágenes a continuación son imágenes de relleno con dirección de arte creadas para esta versión. No muestran al cliente, a atletas reales ni una instalación real.",
    statusTitle: "Estado de las imágenes",
    statusBody:
      "No se ha proporcionado fotografía ni video auténticos del cliente para la Fase 001. Las imágenes de esta página son rellenos ilustrativos generados con fines de diseño y están etiquetadas como tales. Deben reemplazarse con fotografía autorizada del cliente o de archivo antes del lanzamiento a producción, y cualquier atleta mostrado en medios publicados requiere consentimiento documentado.",
    ctaTitle: "¿Quieres entrenar aquí?",
    ctaBody:
      "Comienza con una consulta y te compartiremos la disponibilidad actual y los siguientes pasos.",
    ctaPrimary: "Comenzar a entrenar",
  },
  stages: [
    {
      label: "Base",
      ages: "Atletas juveniles",
      title: "Primero el movimiento",
      body: "Coordinación, control corporal y confianza. Las sesiones introducen el sprint, el salto y las posiciones básicas de fuerza con énfasis en el juego, la seguridad y la técnica.",
      focus: ["Alfabetización motriz", "Control corporal", "Fundamentos de velocidad", "Confianza"],
    },
    {
      label: "Desarrollo",
      ages: "Secundaria inicial",
      title: "Construir capacidad",
      body: "Trabajo estructurado de velocidad y fuerza con énfasis creciente en la constancia. Los atletas aprenden a calentar, entrenar y recuperarse con intención.",
      focus: ["Mecánica de sprint", "Posiciones de fuerza", "Capacidad de trabajo", "Hábitos de entrenamiento"],
    },
    {
      label: "Rendimiento",
      ages: "Preparatoria",
      title: "Competir a velocidad",
      body: "Programación alineada con la temporada competitiva, con objetivos medibles de velocidad, potencia y fuerza. Énfasis en la resiliencia y el rendimiento repetible.",
      focus: ["Aceleración", "Desarrollo de potencia", "Fuerza", "Gestión de temporada"],
    },
    {
      label: "Siguiente nivel",
      ages: "Preparación universitaria",
      title: "Prepararse para el salto",
      body: "Preparación física para las exigencias del deporte universitario, incluida la densidad de entrenamiento, la recuperación y los estándares que los atletas encontrarán en el siguiente nivel.",
      focus: ["Densidad de entrenamiento", "Estándares físicos", "Recuperación", "Preparación competitiva"],
    },
  ],
  learn: [
    {
      t: "Cómo prepararse",
      b: "El calentamiento no es una formalidad. Los atletas aprenden una rutina de preparación repetible que pueden usar en cualquier entorno.",
    },
    {
      t: "Cómo entrenar",
      b: "La intención, el tempo, el descanso y la técnica se entrenan de forma explícita. Los atletas entienden cómo se ve el trabajo de calidad.",
    },
    {
      t: "Cómo recuperarse",
      b: "El sueño, los fundamentos de nutrición y la gestión de la carga se abordan como parte del rendimiento — no como algo secundario.",
    },
    {
      t: "Cómo competir",
      b: "El entrenamiento incluye momentos de presión y medición para que los atletas practiquen competir, no solo ejercitarse.",
    },
  ],
  channels: [
    {
      t: "Consulta de entrenamiento",
      b: "Pregunta por el entrenamiento individual, en grupos pequeños o en equipo y cuál es el siguiente paso.",
      href: "/start-training",
      cta: "Iniciar una consulta de entrenamiento",
    },
    {
      t: "Escuela o equipo",
      b: "Conversa sobre una asociación escolar, un bloque de equipo o una sesión de rendimiento en sitio.",
      href: "/registration/school",
      cta: "Consulta para escuela / equipo",
    },
    {
      t: "Asociación con entrenadores",
      b: "Explora una colaboración de entrenamiento o preparación física con Young & Elevated.",
      href: "/registration/partner",
      cta: "Consulta de asociación",
    },
  ],
  reportingStandards: [
    {
      t: "Consentimiento antes de publicar",
      b: "No se publica ningún nombre, fotografía o resultado de un atleta sin permiso documentado del atleta o, si es menor, de un padre, madre o tutor legal.",
    },
    {
      t: "Protocolo consistente",
      b: "Los resultados solo son comparables cuando el protocolo de prueba es el mismo. Los resultados publicados indicarán el método de medición y las condiciones de la prueba.",
    },
    {
      t: "Registrado, no redondeado",
      b: "Los resultados se reportan tal como se midieron. Ningún resultado se ajusta por efecto de marketing y no se insinúa una mejora donde no se registró ninguna.",
    },
    {
      t: "Contexto incluido",
      b: "Una cifra sin contexto es engañosa. Los resultados publicados indicarán el periodo de entrenamiento, el punto de partida y cualquier limitación relevante.",
    },
  ],
  gallery: [
    { caption: "Trabajo de velocidad", meta: "Pista · Sesión nocturna" },
    { caption: "Trabajo de fuerza", meta: "Barra · Patrones con carga" },
    { caption: "El entorno", meta: "Césped · Instalación techada" },
    { caption: "Medición", meta: "Evaluación · Datos objetivos" },
  ],
  techItems: [
    {
      category: "Entrenamiento basado en velocidad",
      role: "Seguimiento de velocidad de barra",
      detail:
        "El seguimiento de velocidad ofrece una lectura a nivel de sesión de qué tan rápido se mueve una carga. Esa información puede usarse para orientar la selección de carga y hacer visible la intención en lugar de suponerla.",
      verification:
        "Confirmar el modelo específico del sensor, las métricas capturadas y cualquier afirmación del fabricante antes de publicar especificaciones técnicas.",
    },
    {
      category: "Equipamiento de entrenamiento",
      role: "Equipo de fuerza y acondicionamiento",
      detail:
        "El equipamiento Valor respalda el lado de entrenamiento de resistencia de la programación, incluidos los patrones básicos de fuerza y el trabajo accesorio.",
      verification:
        "Confirmar los modelos exactos de equipamiento en uso y si se puede mostrar algún logotipo o asociación del fabricante.",
    },
    {
      category: "Movimiento resistido",
      role: "Trabajo de velocidad y salto resistidos",
      detail:
        "Los sistemas de movimiento resistido añaden carga a los patrones de aceleración y salto, permitiendo a los atletas entrenar la aplicación de fuerza en posiciones propias del deporte.",
      verification:
        "Confirmar el modelo específico de VertiMax y la descripción aprobada de su uso.",
    },
    {
      category: "Medición de salto",
      role: "Medición de salto vertical",
      detail:
        "El Vertec proporciona una medida directa y repetible del alcance del salto vertical. Los resultados registrados crean una línea base que puede compararse a lo largo de un bloque de entrenamiento.",
      verification:
        "Confirmar el protocolo de medición (con carrera o de pie) para que los resultados publicados se describan de forma consistente.",
    },
  ],
  principles: [
    {
      title: "Primero la línea base",
      body: "Una medición inicial establece dónde está realmente el atleta. La programación se escribe contra esa línea base y no contra un estándar genérico.",
    },
    {
      title: "Protocolo consistente",
      body: "La evaluación solo es útil si es repetible. Se usa el mismo protocolo, superficie y calentamiento para que las comparaciones tengan sentido.",
    },
    {
      title: "Los datos informan el entrenamiento",
      body: "Los números apoyan el criterio del entrenador. No reemplazan la revisión técnica, la opinión del atleta ni la observación profesional.",
    },
    {
      title: "Reporte honesto",
      body: "Los resultados se reportan tal como se registraron. No se promete ninguna mejora y no se publica ningún resultado de un atleta sin consentimiento.",
    },
  ],
  bio: {
    intro:
      "Reggie Young es un exjugador de fútbol americano de la División I que compitió en Liberty University y la University of Colorado. Tras retirarse del fútbol americano en 2023, pasó al desarrollo atlético, trabajando con atletas de distintas edades y deportes.",
    mission:
      "Su misión es exponer a los atletas a un entorno que los prepare para el siguiente nivel — uno construido sobre hábitos ganadores, resiliencia física y una mentalidad competitiva.",
    paragraphs: [
      "El enfoque de Reggie comienza con la persona. Cada atleta llega con un historial de entrenamiento distinto, un deporte distinto y un conjunto distinto de limitaciones. El trabajo empieza por entender dónde está ese atleta, qué necesita y sobre qué puede construir de forma realista.",
      "A partir de ahí, el entrenamiento es deliberado. Las sesiones están estructuradas, la técnica se entrena en detalle y el progreso se mide en lugar de suponerse. El objetivo no es simplemente un entrenamiento más duro — es un atleta que se mueve mejor, entrena con constancia y entiende por qué importa el trabajo.",
      "Ese estándar se extiende más allá de la sesión. Los hábitos ganadores se construyen en cómo se prepara un atleta, cómo se recupera, cómo responde a la corrección y cómo compite cuando las cosas se ponen difíciles.",
    ],
    emphasis: [
      { title: "Hábitos ganadores", body: "La constancia, la preparación y la responsabilidad se tratan como cualidades entrenables." },
      { title: "Resiliencia física", body: "Construir capacidad para que los atletas puedan afrontar las exigencias de su deporte y su temporada." },
      { title: "Desarrollo atlético", body: "Velocidad, potencia, fuerza y calidad de movimiento desarrolladas juntas, no de forma aislada." },
      { title: "Mentalidad competitiva", body: "Un entrenamiento que pide a los atletas competir con intención y responder a la adversidad." },
      { title: "Conexión individual", body: "Un entrenamiento moldeado en torno a la persona, no a una plantilla genérica." },
      { title: "Maximizar el potencial", body: "Una visión de desarrollo a largo plazo en lugar de una solución rápida a corto plazo." },
    ],
    education: [
      { credential: "B.S.", institution: "Liberty University", year: "2023" },
      { credential: "A.A. Administración de Empresas", institution: "Iowa Central Community College", year: "2021" },
    ],
    certifications: [
      "Especialista Certificado en Fuerza y Acondicionamiento (CSCS)",
      "RCP y DEA",
    ],
    accomplishments: [
      "Campeón estatal LHSAA 2018",
      "All-American de la División I de la NJCAA 2021",
      "Top 100 de ESPN",
      "Primera generación en graduarse de la universidad",
    ],
    pendingVerification: [
      "Especialidad(s) del título — no proporcionada por el cliente",
      "Entidades emisoras de certificación y fechas de vencimiento — no proporcionadas por el cliente",
      "Insignias de certificación y logotipos de terceros — requieren permiso escrito",
      "Detalles del evento de campeonato más allá del dato proporcionado",
    ],
  },
};

export function pageCopy(locale: string): PageCopy | null {
  return locale === "es" ? es : null;
}

export const spanishPageCopy = es;
