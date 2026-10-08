#!/usr/bin/env node
/* Per-module gate for the CFA FSA platform:  node scripts/fsa-check.mjs lm11
   Checks ONE module's scenarios, content and widgets in isolation, so parallel
   authors are never blocked by each other's work in progress. The full
   suite is `npm test`. */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { runScenario, checksFor, fmt } from "../src/cfa/fsa/engine/ledger.js";
import { practiceRounds, practiceSpec, gradeRound2, confirmationRuns } from "../src/cfa/fsa/engine/practice.js";
import { curriculumModule } from "../src/cfa/fsa/content/curriculum.js";

const id = process.argv[2];
if (!/^lm1[0-5]$/.test(id || "")) { console.error("usage: node scripts/fsa-check.mjs lm11"); process.exit(2); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DASH = /[–—]/;
const errs = [];
const err = (m) => errs.push(m);

const scenarios = (await import("../src/cfa/fsa/scenarios/" + id + ".js")).default;
const lm10 = id === "lm10" ? [] : (await import("../src/cfa/fsa/scenarios/lm10.js")).default;
const byId = Object.fromEntries([...lm10, ...scenarios].map((s) => [s.id, s]));
const mod = (await import("../src/cfa/fsa/content/" + id + ".js")).default;
const cur = curriculumModule(id);

let rounds = 0;
for (const scn of scenarios) {
  try {
    if (!scn.id.startsWith(id + "-")) err(scn.id + ": scenario id must start with '" + id + "-'");
    if (DASH.test(JSON.stringify(scn))) err(scn.id + ": contains an em or en dash");
    const run = runScenario(scn);
    run.snaps.forEach((snap, i) => run.columns.forEach((c) => {
      const st = snap.cols[c.id].stmts;
      if (Math.abs(st.bs.ta - st.bs.tle) > 0.005) err(scn.id + "/" + c.id + " snapshot " + i + ": A " + st.bs.ta + " != L+E " + st.bs.tle);
      if (Math.abs(st.cf.end - st.cf.cashBS) > 0.005) err(scn.id + "/" + c.id + " snapshot " + i + ": cash does not tie");
    }));
    scn.steps.forEach((step, i) => run.base.forEach((c) => {
      const ck = checksFor(run.snaps[i + 1].cols[c.id].stmts, run.entriesFor(step, c.id)).find((x) => x.id === "drcr");
      if (!ck.ok) err(scn.id + " step " + (i + 1) + "/" + c.id + ": debits != credits (" + ck.detail + ")");
    }));
    for (const r of practiceRounds(run)) {
      const spec = practiceSpec(run, r.colId, r.stepIdx);
      const inputs = {};
      spec.inputKeys.forEach((k) => { inputs[k] = fmt(spec.after[k] || 0); });
      if (!gradeRound2(spec, inputs).allRight) err(r.key + ": perfect inputs not graded right");
      for (const c of confirmationRuns(spec, inputs)) if (!c.ok) err(r.key + ": confirmation run failed on perfect input: " + c.label + " " + c.detail);
      rounds++;
    }
  } catch (e) { err(scn.id + ": " + e.message); }
}

if (DASH.test(JSON.stringify(mod))) err(id + " content: contains an em or en dash");
const losIds = new Set(cur.los.map((l) => l.id));
const KNOWN = new Set(["p", "h", "callout", "table", "formula", "steps", "compare", "theater", "widget", "check", "sort", "tree"]);
const widgets = new Set();
for (const s of mod.sections || []) {
  for (const l of s.los || []) if (!losIds.has(l)) err(id + "/" + s.id + ": unknown LOS " + l);
  for (const b of s.blocks || []) {
    const w = id + "/" + s.id + " " + b.t;
    if (!KNOWN.has(b.t)) err(w + ": unknown block type");
    if (b.t === "theater" && !byId[b.scenario]) err(w + ": missing scenario " + b.scenario);
    if (b.t === "widget") { widgets.add(b.name); if (!fs.existsSync(path.join(root, "src/cfa/fsa/widgets", b.name + ".jsx"))) err(w + ": missing widget file " + b.name); }
    if (b.t === "check" && (b.options.length !== 3 || b.answer < 0 || b.answer > 2)) err(w + ": check needs 3 options and answer 0..2");
    if (b.t === "sort") for (const it of b.items) if (!b.buckets.some((x) => x.id === it.bucket)) err(w + ": item bucket missing");
    if (b.t === "tree") { if (!b.nodes[b.root]) err(w + ": missing root"); for (const n of Object.values(b.nodes)) for (const o of n.options || []) if (!b.nodes[o.next]) err(w + ": dangling edge " + o.next); }
  }
}
for (const l of cur.los) if (!(mod.sections || []).some((s) => (s.los || []).includes(l.id))) err(id + ": LOS " + l.id + " is taught by no section");
for (const set of mod.itemSets || []) for (const q of set.questions) if (q.options.length !== 3 || q.answer < 0 || q.answer > 2) err(set.id + ": item-set question needs 3 options and answer 0..2");

const esbuild = path.join(root, "node_modules/.bin/esbuild");
for (const w of widgets) {
  const f = path.join(root, "src/cfa/fsa/widgets", w + ".jsx");
  if (!fs.existsSync(f)) continue;
  try { execFileSync(esbuild, [f, "--loader:.jsx=jsx", "--jsx=automatic", "--format=esm", "--log-level=error"], { stdio: ["ignore", "ignore", "pipe"] }); }
  catch (e) { err("widget " + w + ": syntax error\n" + String(e.stderr || e.message)); }
  const src = fs.readFileSync(f, "utf8");
  if (/#[0-9a-fA-F]{3,8}\b/.test(src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, ""))) err("widget " + w + ": hex color literal (use CSS variables)");
  if (DASH.test(src)) err("widget " + w + ": contains an em or en dash");
}

console.log(id + ": " + scenarios.length + " scenarios, " + rounds + " practice rounds, " + (mod.sections || []).length + " sections, " + widgets.size + " widgets");
if (errs.length) { console.log(errs.length + " problem(s):\n - " + errs.join("\n - ")); process.exit(1); }
console.log("OK");
