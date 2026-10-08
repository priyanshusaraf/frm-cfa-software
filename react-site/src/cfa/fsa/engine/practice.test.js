import { test } from "node:test";
import assert from "node:assert/strict";
import { runScenario, fmt } from "./ledger.js";
import { practiceSpec, practiceRounds, parseNum, gradeRound1, gradeRound2, confirmationRuns, starsFor } from "./practice.js";
import { SCENARIOS } from "../scenarios/index.js";

test("parseNum reads statement-style numbers", () => {
  assert.equal(parseNum("1,040"), 1040);
  assert.equal(parseNum("(30)"), -30);
  assert.equal(parseNum("-30"), -30);
  assert.equal(parseNum(" 30.5 "), 30.5);
  assert.equal(parseNum("abc"), null);
  assert.equal(parseNum(""), null);
});

test("every practice round: perfect answers pass every confirmation run", () => {
  let n = 0;
  for (const scn of SCENARIOS) {
    const run = runScenario(scn);
    for (const r of practiceRounds(run)) {
      const spec = practiceSpec(run, r.colId, r.stepIdx);
      assert.ok(spec.hitKeys.length > 0, r.key + ": no lines change");
      const inputs = {};
      spec.inputKeys.forEach((k) => { inputs[k] = fmt(spec.after[k] || 0); });
      assert.ok(gradeRound2(spec, inputs).allRight, r.key + ": perfect inputs not graded right");
      const g1 = gradeRound1(spec, new Set(spec.hitKeys));
      assert.ok(g1.perfect, r.key + ": perfect picks not graded perfect");
      for (const c of confirmationRuns(spec, inputs)) assert.ok(c.ok, r.key + ": confirmation run '" + c.label + "' failed on perfect input: " + c.detail);
      n++;
    }
  }
  assert.ok(n > 10, "expected a healthy number of practice rounds, got " + n);
});

test("a wrong total fails the balance check", () => {
  const run = runScenario(SCENARIOS.find((s) => s.id === "lm10-equity-method"));
  const spec = practiceSpec(run, "main", 2);
  assert.ok(spec.inputKeys.includes("BS:TA"));
  const inputs = {};
  spec.inputKeys.forEach((k) => { inputs[k] = String(spec.after[k] || 0); });
  inputs["BS:TA"] = String((spec.after["BS:TA"] || 0) + 100);
  const runs = confirmationRuns(spec, inputs);
  assert.ok(runs.some((c) => !c.ok));
});

test("stars", () => {
  assert.equal(starsFor({ r1Perfect: true, r2FirstTry: true }), 3);
  assert.equal(starsFor({ r1Perfect: false, r2FirstTry: true }), 2);
  assert.equal(starsFor({ r1Perfect: true, r2FirstTry: true, hintUsed: true }), 2);
  assert.equal(starsFor({ revealed: true }), 1);
});
