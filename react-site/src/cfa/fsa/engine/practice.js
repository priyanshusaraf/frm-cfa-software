/* Pure logic for the "Reconstruct the statements" game, kept React-free so the
   grading rules are unit-tested (practice.test.js). */
import { buildLayout } from "./layout.js";
import { fmt } from "./ledger.js";

const EPS = 0.005;
const TOTAL_INPUTS = ["IS:NI", "IS:NIP", "OCI:TOT", "BS:TA", "BS:TL", "BS:TE", "CF:CFO", "CF:CFI", "CF:CFF", "CF:END"];

export function practiceSpec(run, colId, stepIdx) {
  const layout = buildLayout(run, [colId]);
  const before = run.snaps[stepIdx - 1].cols[colId].flat;
  const after = run.snaps[stepIdx].cols[colId].flat;
  const changed = (k) => Math.abs((after[k] || 0) - (before[k] || 0)) > EPS;

  const lineRows = [
    ...layout.is, ...layout.oci, ...layout.bs[0].rows, ...layout.bs[1].rows, ...layout.cf,
  ].filter((r) => r.kind === "line" && r.key !== "CF:BEG");
  const candidates = lineRows.map((r) => r.key);
  const hitKeys = candidates.filter(changed);
  const inputKeys = [...hitKeys, ...TOTAL_INPUTS.filter((k) => changed(k) && !hitKeys.includes(k))];
  return { layout, before, after, candidates, hitKeys, inputKeys, colId, stepIdx };
}

/* Accepts what a person actually types into a statement: "1,040", "(30)",
   "-30", "30.5". Returns null for anything that is not a number. */
export function parseNum(str) {
  if (str == null) return null;
  let s = String(str).trim().replace(/,/g, "").replace(/\s/g, "");
  if (!s) return null;
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith("-") || s.startsWith("−")) { neg = !neg; s = s.slice(1); }
  if (s.startsWith("+")) s = s.slice(1);
  if (!/^\d*\.?\d+$/.test(s)) return null;
  const n = parseFloat(s);
  return neg ? -n : n;
}

export function gradeRound1(spec, picks) {
  const truth = new Set(spec.hitKeys);
  const res = {};
  spec.candidates.forEach((k) => {
    const p = picks.has(k), t = truth.has(k);
    res[k] = p && t ? "right" : p && !t ? "wrong" : !p && t ? "missed" : null;
  });
  const right = spec.candidates.filter((k) => res[k] === "right").length;
  const errors = spec.candidates.filter((k) => res[k] === "wrong" || res[k] === "missed").length;
  return { res, right, errors, perfect: errors === 0 };
}

export function gradeRound2(spec, inputs, tol = 0.5) {
  const res = {};
  spec.inputKeys.forEach((k) => {
    const n = parseNum(inputs[k]);
    res[k] = n == null ? "empty" : Math.abs(n - (spec.after[k] || 0)) <= tol ? "right" : "wrong";
  });
  const allRight = spec.inputKeys.every((k) => res[k] === "right");
  return { res, allRight };
}

/* The confirmation runs: integrity tests applied to the STUDENT's own numbers.
   A wrong cell can still pass a run (if the error is consistent), and a
   student who gets every cell right sees every run pass, which is the
   point: these are the cross-checks an accountant runs before signing off. */
export function confirmationRuns(spec, inputs) {
  const { layout, before, after } = spec;
  const user = (k) => {
    if (spec.inputKeys.includes(k)) {
      const n = parseNum(inputs[k]);
      return n == null ? NaN : n;
    }
    return after[k] || 0;
  };
  const sumRows = (rows, kind) => rows.filter((r) => r.kind === kind || (kind === "line" && r.kind === "line")).reduce((s, r) => s + user(r.key), 0);
  const runs = [];
  const okEq = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 0.5;

  const aRows = layout.bs[0].rows.filter((r) => r.kind === "line");
  const sumA = aRows.reduce((s, r) => s + user(r.key), 0);
  runs.push({ id: "foot-a", label: "Your asset lines add up to your total assets", ok: okEq(sumA, user("BS:TA")), detail: fmt(sumA) + " vs " + fmt(user("BS:TA")) });

  const leRows = layout.bs[1].rows;
  const lStart = leRows.findIndex((r) => r.key === "BS:TL");
  const lLines = leRows.slice(0, lStart).filter((r) => r.kind === "line");
  const eLines = leRows.slice(lStart + 1).filter((r) => r.kind === "line");
  const sumL = lLines.reduce((s, r) => s + user(r.key), 0);
  const sumE = eLines.reduce((s, r) => s + user(r.key), 0);
  runs.push({ id: "foot-l", label: "Your liability lines add up to your total liabilities", ok: okEq(sumL, user("BS:TL")), detail: fmt(sumL) + " vs " + fmt(user("BS:TL")) });
  runs.push({ id: "foot-e", label: "Your equity lines add up to your total equity", ok: okEq(sumE, user("BS:TE")), detail: fmt(sumE) + " vs " + fmt(user("BS:TE")) });
  runs.push({
    id: "ale", label: "Your balance sheet balances (A = L + E)",
    ok: okEq(user("BS:TA"), user("BS:TL") + user("BS:TE")),
    detail: fmt(user("BS:TA")) + " vs " + fmt(user("BS:TL")) + " + " + fmt(user("BS:TE")),
  });

  if (layout.is.length) {
    const isLines = layout.is.filter((r) => r.kind === "line" && r.key !== "IS:NCI");
    const sumIS = isLines.reduce((s, r) => s + user(r.key), 0);
    runs.push({ id: "ni", label: "Your income statement lines add up to your net income", ok: okEq(sumIS, user("IS:NI")), detail: fmt(sumIS) + " vs " + fmt(user("IS:NI")) });
  }

  const reRow = layout.bs[1].rows.find((r) => r.key === "BS:re");
  if (reRow) {
    const nipKey = "IS:NIP" in after ? "IS:NIP" : "IS:NI";
    const trueOther = ((after["BS:re"] || 0) - (before["BS:re"] || 0)) - ((after[nipKey] || 0) - (before[nipKey] || 0));
    const dNI = user(nipKey) - (before[nipKey] || 0);
    const expected = (before["BS:re"] || 0) + dNI + trueOther;
    runs.push({
      id: "re", label: "Retained earnings rolls forward from your net income",
      ok: okEq(expected, user("BS:re")),
      detail: fmt(before["BS:re"] || 0) + " + " + fmt(dNI) + (Math.abs(trueOther) > EPS ? " + " + fmt(trueOther) + " other" : "") + " = " + fmt(expected) + " vs your " + fmt(user("BS:re")),
    });
  }

  if (layout.cf.length) {
    const cashKey = "BS:cash";
    const dSec = ["CF:CFO", "CF:CFI", "CF:CFF"].reduce((s, k) => s + (user(k) - (before[k] || 0)), 0);
    const expected = (before[cashKey] || 0) + dSec;
    runs.push({
      id: "cash", label: "Cash on your balance sheet ties to your cash flow statement",
      ok: okEq(expected, user(cashKey)) && okEq(user("CF:END"), user(cashKey)),
      detail: fmt(before[cashKey] || 0) + " + " + fmt(dSec) + " = " + fmt(expected) + " vs your " + fmt(user(cashKey)),
    });
  }
  return runs;
}

export function starsFor({ r1Perfect, r2FirstTry, hintUsed, revealed }) {
  if (revealed) return 1;
  let s = 3;
  if (!r1Perfect) s--;
  if (!r2FirstTry) s--;
  if (hintUsed) s = Math.min(s, 2);
  return Math.max(1, s);
}

export function practiceKey(scnId, colId, stepIdx) { return scnId + "|" + colId + "|" + stepIdx; }

/* All practice-able rounds of a scenario: every step except closing steps,
   steps marked practice:false, and steps that change nothing in a column. */
export function practiceRounds(run) {
  const out = [];
  (run.scn.steps || []).forEach((st, i) => {
    if (st.close || st.practice === false) return;
    run.base.forEach((c) => {
      const d = run.deltas[i + 1][c.id];
      if (!d || !Object.keys(d).length) return;
      out.push({ scn: run.scn, colId: c.id, colLabel: c.label, stepIdx: i + 1, title: st.title, key: practiceKey(run.scn.id, c.id, i + 1) });
    });
  });
  return out;
}
