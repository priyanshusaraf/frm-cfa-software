/* Curated ordering/clustering overrides. The single place a human tunes the study
   path. Keep it SMALL: only clusters that are genuinely confusing in curriculum
   order. Anything not listed keeps its automatic position. No em/en dashes in copy. */
export const overrides = [
  {
    cluster: [27, 28, 29],
    name: "Portfolio credit and copulas",
    why: "R27 single-factor, R28 tranche correlation, and R29 default intensity are one story; study them as a block.",
  },
  {
    move: 29,
    near: 37,
    why: "R29's spread/hazard material is a running start for the CVA family around R37; keep them adjacent.",
  },
];
