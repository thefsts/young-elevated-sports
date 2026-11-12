export type Program = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  focus: string[];
  athleteBenefit: string;
};

export const programs: Program[] = [
  {
    slug: "speed-acceleration",
    index: "01",
    title: "Speed & Acceleration",
    summary:
      "Sprint mechanics, first-step quickness, and acceleration patterns developed through structured, repeatable drills rather than random conditioning.",
    focus: ["Sprint mechanics", "First-step quickness", "Acceleration mechanics", "Top-speed exposure"],
    athleteBenefit:
      "Athletes learn how to produce force into the ground efficiently and how to repeat quality efforts with intent.",
  },
  {
    slug: "explosive-power",
    index: "02",
    title: "Explosive Power",
    summary:
      "Jumping, throwing, and loaded explosive work designed to improve the rate at which an athlete can produce force.",
    focus: ["Rate of force development", "Jump progressions", "Med-ball power", "Landing mechanics"],
    athleteBenefit:
      "Power work is progressed deliberately, with technique quality treated as the gate for adding load or complexity.",
  },
  {
    slug: "agility-change-of-direction",
    index: "03",
    title: "Agility & Change of Direction",
    summary:
      "Deceleration, re-acceleration, and cutting mechanics that reflect the chaotic demands of field and court sport.",
    focus: ["Deceleration control", "Cutting mechanics", "Reactive agility", "Body control"],
    athleteBenefit:
      "Athletes practice changing direction under control, with an emphasis on positions they can repeat at speed.",
  },
  {
    slug: "strength-development",
    index: "04",
    title: "Strength Development",
    summary:
      "Progressive resistance training built around fundamental movement patterns and long-term athletic development.",
    focus: ["Squat pattern", "Hinge pattern", "Upper-body pushing & pulling", "Core stability"],
    athleteBenefit:
      "Strength is built as a foundation for sport performance — not as an end in itself — with technique prioritized over load.",
  },
  {
    slug: "injury-risk-reduction",
    index: "05",
    title: "Injury Prevention / Risk Reduction",
    summary:
      "Targeted preparation of commonly undertrained areas, including hamstrings, adductors, calves, and trunk control.",
    focus: ["Hamstring preparation", "Adductor strength", "Ankle & calf capacity", "Trunk control"],
    athleteBenefit:
      "Risk-reduction work is a training emphasis, not a medical service or a guarantee against injury.",
  },
  {
    slug: "sport-specific-conditioning",
    index: "06",
    title: "Sport-Specific Conditioning",
    summary:
      "Work-capacity development shaped around the intermittent, high-intensity demands of competitive sport.",
    focus: ["Repeat-effort capacity", "Interval design", "Position demands", "Recovery awareness"],
    athleteBenefit:
      "Conditioning is programmed around the athlete's sport and season rather than a single universal workout.",
  },
  {
    slug: "vertical-jump",
    index: "07",
    title: "Vertical Jump Enhancement",
    summary:
      "A combined approach to jump performance: force production, elastic qualities, and landing and takeoff mechanics.",
    focus: ["Approach mechanics", "Takeoff positions", "Elastic strength", "Measured jump testing"],
    athleteBenefit:
      "Jump work is measured with objective tools so athletes can see change over time rather than rely on feel alone.",
  },
  {
    slug: "mobility-flexibility",
    index: "08",
    title: "Mobility & Flexibility",
    summary:
      "Joint-specific range-of-motion work that supports positions an athlete actually needs in their sport.",
    focus: ["Hip range", "Ankle range", "Thoracic position", "Dynamic warm-up design"],
    athleteBenefit:
      "Mobility is trained as a usable quality — range the athlete can control — not as passive stretching alone.",
  },
];

export type Format = {
  slug: string;
  title: string;
  summary: string;
  availability: string;
};

/** Service formats are configurable placeholders — no prices or schedules are published. */
export const formats: Format[] = [
  {
    slug: "private-training",
    title: "Private Training",
    summary: "One-on-one coaching built around an individual athlete's assessment, goals, and season.",
    availability: "Availability, pricing, and location confirmed on inquiry.",
  },
  {
    slug: "small-group",
    title: "Small-Group Training",
    summary: "Small cohorts that keep individual attention while adding a competitive training environment.",
    availability: "Group sizes, pricing, and schedule confirmed on inquiry.",
  },
  {
    slug: "team-training",
    title: "Team Training",
    summary: "Programmed sessions for a school or club team, coordinated with the coaching staff.",
    availability: "Scope and scheduling confirmed on inquiry.",
  },
  {
    slug: "sports-camps",
    title: "Sports Camps",
    summary: "Short-format performance camps focused on speed, power, and movement quality.",
    availability: "Camp dates and formats announced when confirmed.",
  },
  {
    slug: "school-partnerships",
    title: "School Partnerships",
    summary: "Structured performance support delivered in partnership with a school or athletic program.",
    availability: "Subject to a separate school services agreement.",
  },
  {
    slug: "assessments",
    title: "Athlete Performance Assessments",
    summary: "A measured baseline across speed, jump, and movement qualities to guide programming.",
    availability: "Assessment protocol and scheduling confirmed on inquiry.",
  },
];

export const trainingPrinciples = [
  {
    title: "Assess before prescribing",
    body: "Programming starts from what an athlete can currently do, not from a template. Baseline testing informs the plan.",
  },
  {
    title: "Technique earns load",
    body: "Position and control come first. Load, speed, and complexity are added when an athlete has earned them.",
  },
  {
    title: "Measure what matters",
    body: "Speed, jump, and output data are tracked so progress is a recorded trend rather than a feeling.",
  },
  {
    title: "Build the whole athlete",
    body: "Habits, recovery, confidence, and communication are coached alongside physical qualities.",
  },
];

/* ------------------------------------------------------------------ Spanish
 * Spanish copy for the eight training disciplines and the service formats.
 * English remains the source of truth for structure; this overlay only swaps
 * display strings, so slugs, ordering, and anchors stay identical across
 * locales. Reviewed as marketing copy, not as legal text.
 */

type ProgramEs = { title: string; summary: string; focus: string[]; athleteBenefit: string };

const programEs: Record<string, ProgramEs> = {
  "speed-acceleration": {
    title: "Velocidad y aceleración",
    summary:
      "Mecánica de carrera, rapidez del primer paso y patrones de aceleración desarrollados con ejercicios estructurados y repetibles, no con acondicionamiento aleatorio.",
    focus: ["Mecánica de carrera", "Rapidez del primer paso", "Mecánica de aceleración", "Exposición a velocidad máxima"],
    athleteBenefit:
      "Los atletas aprenden a aplicar fuerza al suelo de forma eficiente y a repetir esfuerzos de calidad con intención.",
  },
  "explosive-power": {
    title: "Potencia explosiva",
    summary:
      "Trabajo de salto, lanzamiento y potencia con carga dise\u00f1ado para mejorar la velocidad con la que un atleta produce fuerza.",
    focus: ["Tasa de desarrollo de fuerza", "Progresiones de salto", "Potencia con balón medicinal", "Mecánica de aterrizaje"],
    athleteBenefit:
      "El trabajo de potencia avanza de forma deliberada, con la calidad t\u00e9cnica como requisito para a\u00f1adir carga o complejidad.",
  },
  "agility-change-of-direction": {
    title: "Agilidad y cambio de direcci\u00f3n",
    summary:
      "Desaceleraci\u00f3n, reaceleraci\u00f3n y mec\u00e1nica de corte que reflejan las exigencias cambiantes de los deportes de campo y cancha.",
    focus: ["Control de desaceleraci\u00f3n", "Mec\u00e1nica de corte", "Agilidad reactiva", "Control corporal"],
    athleteBenefit:
      "Los atletas practican cambios de direcci\u00f3n con control, con \u00e9nfasis en posiciones que pueden repetir a velocidad.",
  },
  strength: {
    title: "Desarrollo de fuerza",
    summary:
      "Fuerza progresiva construida sobre t\u00e9cnica s\u00f3lida, con movimientos b\u00e1sicos y variaciones que apoyan la velocidad y la potencia en el deporte.",
    focus: ["Patrones b\u00e1sicos", "Progresi\u00f3n de carga", "Fuerza unilateral", "Estabilidad del tronco"],
    athleteBenefit:
      "La fuerza se entrena como base del rendimiento deportivo, no como un objetivo aislado de levantamiento.",
  },
  "injury-prevention": {
    title: "Prevenci\u00f3n y reducci\u00f3n de riesgos",
    summary:
      "Trabajo de control, movilidad y tolerancia a la carga que apoya la disponibilidad del atleta a lo largo de la temporada.",
    focus: ["Control de rodilla y cadera", "Tolerancia a la carga", "Preparaci\u00f3n de tejidos", "Conciencia de posici\u00f3n"],
    athleteBenefit:
      "El objetivo es reducir riesgos evitables en el entrenamiento, no prometer la prevenci\u00f3n de lesiones.",
  },
  conditioning: {
    title: "Acondicionamiento espec\u00edfico del deporte",
    summary:
      "Capacidad de trabajo construida con intervalos y patrones que se parecen a las demandas reales de la competici\u00f3n.",
    focus: ["Capacidad aer\u00f3bica", "Repetici\u00f3n de sprints", "Recuperaci\u00f3n entre esfuerzos", "Densidad de trabajo"],
    athleteBenefit:
      "El acondicionamiento se programa seg\u00fan el deporte y la temporada, no como castigo ni como carrera gen\u00e9rica.",
  },
  "vertical-jump": {
    title: "Mejora del salto vertical",
    summary:
      "Fuerza, potencia y mec\u00e1nica de salto trabajadas juntas para mejorar la capacidad de salto de forma medible.",
    focus: ["Mec\u00e1nica de salto", "Potencia de piernas", "Aterrizaje y control", "Medici\u00f3n del salto"],
    athleteBenefit:
      "El progreso del salto se mide con herramientas objetivas y se revisa a lo largo del bloque de entrenamiento.",
  },
  mobility: {
    title: "Movilidad y flexibilidad",
    summary:
      "Rango de movimiento utilizable que el atleta puede controlar, integrado en el entrenamiento en lugar de tratarse como estiramiento pasivo aislado.",
    focus: ["Movilidad de cadera", "Movilidad de tobillo", "Control del rango", "Preparaci\u00f3n de movimiento"],
    athleteBenefit:
      "La movilidad se entrena como una cualidad \u00fatil \u2014rango que el atleta puede controlar\u2014 y no solo como estiramiento pasivo.",
  },
};

const formatEs: Record<string, { title: string; summary: string; availability: string }> = {
  "private-training": {
    title: "Entrenamiento privado",
    summary: "Entrenamiento individual dise\u00f1ado en torno a la evaluaci\u00f3n, los objetivos y la temporada de cada atleta.",
    availability: "Disponibilidad, precio y ubicaci\u00f3n se confirman al consultar.",
  },
  "small-group": {
    title: "Entrenamiento en grupos peque\u00f1os",
    summary: "Grupos reducidos que mantienen la atenci\u00f3n individual y a\u00f1aden un entorno competitivo.",
    availability: "Tama\u00f1os de grupo, precios y horarios se confirman al consultar.",
  },
  "team-training": {
    title: "Entrenamiento de equipo",
    summary: "Sesiones programadas para un equipo escolar o de club, coordinadas con el cuerpo t\u00e9cnico.",
    availability: "Alcance y programaci\u00f3n se confirman al consultar.",
  },
  "sports-camps": {
    title: "Campamentos deportivos",
    summary: "Campamentos de formato corto centrados en velocidad, potencia y calidad de movimiento.",
    availability: "Las fechas y formatos se anuncian cuando est\u00e1n confirmados.",
  },
  "school-partnerships": {
    title: "Alianzas escolares",
    summary: "Apoyo de rendimiento estructurado en alianza con una escuela o programa atl\u00e9tico.",
    availability: "Sujeto a un acuerdo separado de servicios escolares.",
  },
  assessments: {
    title: "Evaluaciones de rendimiento",
    summary: "Una base medida de velocidad, salto y calidad de movimiento para guiar la programaci\u00f3n.",
    availability: "El protocolo y la programaci\u00f3n se confirman al consultar.",
  },
};

const principleEs = [
  {
    title: "Evaluar antes de prescribir",
    body: "La programaci\u00f3n parte de lo que el atleta puede hacer hoy, no de una plantilla. Las pruebas iniciales informan el plan.",
  },
  {
    title: "La t\u00e9cnica gana la carga",
    body: "Primero la posici\u00f3n y el control. La carga, la velocidad y la complejidad se a\u00f1aden cuando el atleta las ha ganado.",
  },
  {
    title: "Medir lo que importa",
    body: "Los datos de velocidad, salto y potencia se registran para que el progreso sea una tendencia registrada y no una sensaci\u00f3n.",
  },
  {
    title: "Formar al atleta completo",
    body: "Los h\u00e1bitos, la recuperaci\u00f3n, la confianza y la comunicaci\u00f3n se entrenan junto con las cualidades f\u00edsicas.",
  },
];

/** Programs with Spanish display copy applied when the locale is `es`. */
export function localizedPrograms(locale: string): Program[] {
  if (locale !== "es") return programs;
  return programs.map((p) => {
    const es = programEs[p.slug];
    return es ? { ...p, ...es } : p;
  });
}

export function localizedFormats(locale: string): Format[] {
  if (locale !== "es") return formats;
  return formats.map((f) => {
    const es = formatEs[f.slug];
    return es ? { ...f, ...es } : f;
  });
}

export function localizedTrainingPrinciples(locale: string) {
  return locale === "es" ? principleEs : trainingPrinciples;
}
