/* Progress derived from the optional cfa.fsa store slice plus the static
   content. Pure functions so the pages stay thin. */
import { runScenario } from "./engine/ledger.js";
import { practiceRounds } from "./engine/practice.js";
import { scenariosFor, SCENARIOS } from "./scenarios/index.js";

const roundsCache = {};
export function roundsFor(moduleId) {
  if (!roundsCache[moduleId]) {
    roundsCache[moduleId] = scenariosFor(moduleId).flatMap((s) => {
      try { return practiceRounds(runScenario(s)); } catch { return []; }
    });
  }
  return roundsCache[moduleId];
}

export function allRounds() {
  const mods = [...new Set(SCENARIOS.map((s) => s.module))];
  return mods.flatMap((m) => roundsFor(m));
}

export function moduleProgress(mod, fsa) {
  const read = (fsa.read && fsa.read[mod.id]) || {};
  const secDone = mod.sections.filter((s) => read[s.id]).length;
  const rounds = roundsFor(mod.id);
  const pr = fsa.practice || {};
  const stars = rounds.reduce((s, r) => s + ((pr[r.key] && pr[r.key].stars) || 0), 0);
  const played = rounds.filter((r) => pr[r.key]).length;
  return {
    secDone, secTotal: mod.sections.length,
    rounds: rounds.length, played, stars, maxStars: rounds.length * 3,
    pct: mod.sections.length + rounds.length === 0 ? 0 : (secDone + played) / (mod.sections.length + rounds.length),
  };
}
