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
