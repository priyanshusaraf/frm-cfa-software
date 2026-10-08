/* Module registry. Titles come from curriculum.js so a module still in
   progress shows its real name. Content files are imported eagerly here but
   this whole folder is only reached through lazy routes, so none of it is in
   the main bundle. */
import { CURRICULUM } from "./curriculum.js";
import lm10 from "./lm10.js";
import lm11 from "./lm11.js";
import lm12 from "./lm12.js";
import lm13 from "./lm13.js";
import lm14 from "./lm14.js";
import lm15 from "./lm15.js";

const RAW = { lm10, lm11, lm12, lm13, lm14, lm15 };

export const MODULES = CURRICULUM.modules.map((cm) => {
  const m = RAW[cm.id] || {};
  return { ...m, id: cm.id, num: cm.num, title: m.title || cm.title, los: cm.los, sections: m.sections || [] };
});

export function moduleById(id) {
  return MODULES.find((m) => m.id === id) || null;
}

/* LOS coverage: which sections claim each LOS. */
export function coverage(mod) {
  return mod.los.map((l) => ({ ...l, sections: mod.sections.filter((s) => (s.los || []).includes(l.id)) }));
}
