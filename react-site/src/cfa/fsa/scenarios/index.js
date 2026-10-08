/* Scenario registry. Each module file default-exports an array of scenarios;
   ids are globally unique and are what content blocks and practice rounds
   reference ({ t: "theater", scenario: "lm10-equity-method" }). */
import lm10 from "./lm10.js";
import lm11 from "./lm11.js";
import lm12 from "./lm12.js";
import lm13 from "./lm13.js";
import lm14 from "./lm14.js";
import lm15 from "./lm15.js";

export const SCENARIOS = [...lm10, ...lm11, ...lm12, ...lm13, ...lm14, ...lm15];

const BY_ID = {};
SCENARIOS.forEach((s) => { BY_ID[s.id] = s; });

export function scenarioById(id) { return BY_ID[id] || null; }
export function scenariosFor(moduleId) { return SCENARIOS.filter((s) => s.module === moduleId); }
