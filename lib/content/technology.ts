export type TechItem = {
  name: string;
  category: string;
  role: string;
  detail: string;
  /** Claims that must be verified with the manufacturer/client before publication. */
  verification: string;
};

/**
 * Equipment names are client-supplied. Capability descriptions are written
 * conservatively and deliberately avoid manufacturer endorsement claims.
 */
export const technology: TechItem[] = [
  {
    name: "Output Sports",
    category: "Velocity-based training",
    role: "Barbell velocity tracking",
    detail:
      "Velocity tracking gives a session-level read on how fast a load is moving. That information can be used to guide load selection and to make intent visible rather than assumed.",
    verification:
      "Confirm the specific sensor model, metrics captured, and any manufacturer claims before publishing technical specifications.",
  },
  {
    name: "Valor",
    category: "Training equipment",
    role: "Strength and conditioning equipment",
    detail:
      "Valor equipment supports the resistance-training side of programming, including foundational strength patterns and accessory work.",
    verification:
      "Confirm exact equipment models in use and whether any manufacturer logo or partnership may be displayed.",
  },
  {
    name: "VertiMax",
    category: "Resisted movement",
    role: "Resisted speed and jump work",
    detail:
      "Resisted movement systems add load to acceleration and jump patterns, allowing athletes to train force application in sport-like positions.",
    verification:
      "Confirm the specific VertiMax model and approved description of its use.",
  },
  {
    name: "Vertec",
    category: "Jump measurement",
    role: "Vertical jump measurement",
    detail:
      "The Vertec provides a direct, repeatable measure of vertical jump reach. Recorded results create a baseline that can be compared across a training block.",
    verification:
      "Confirm measurement protocol (approach vs. standing) so published results are described consistently.",
  },
];

export const measurementPrinciples = [
  {
    title: "Baseline first",
    body: "An initial measurement establishes where an athlete actually is. Programming is written against that baseline rather than a generic standard.",
  },
  {
    title: "Consistent protocol",
    body: "Testing is only useful if it is repeatable. The same protocol, surface, and warm-up are used so comparisons mean something.",
  },
  {
    title: "Data informs coaching",
    body: "Numbers support coaching judgment. They do not replace technique review, athlete feedback, or professional observation.",
  },
  {
    title: "Honest reporting",
    body: "Results are reported as recorded. No improvement is promised, and no result is published for an athlete without consent.",
  },
];
