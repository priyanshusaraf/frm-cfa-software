import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCoreConcepts, findConcept, listConcepts } from "./coreConcepts.js";

/* A synthetic readings map: "Sharpe ratio" recurs in two readings (so it is a
   core concept); "One-off" appears once (so it is not). */
const MAP = {
  1: { formulas: [{ name: "Sharpe ratio" }], concepts: [{ name: "One-off" }] },
  2: { formulas: [{ name: "Sharpe ratio" }], concepts: [] },
};

test("buildCoreConcepts tags auto-detected concepts as layer 'core'", () => {
  const list = buildCoreConcepts(MAP);
  const sharpe = list.find((c) => c.slug === "sharpe-ratio");
  assert.ok(sharpe, "recurring name is promoted");
  assert.equal(sharpe.layer, "core");
  assert.equal(sharpe.homeReading, 1);
  assert.ok(!list.some((c) => c.slug === "one-off"), "single-use name is not promoted");
});

test("findConcept: an authored entry shadows the auto concept of the same slug", () => {
  const authored = [{ slug: "sharpe-ratio", name: "Sharpe ratio", layer: "core", sections: [{ label: "X", html: "<p>hi</p>" }] }];
  const c = findConcept(MAP, "sharpe-ratio", authored);
  assert.equal(c.authored, true);
  assert.equal(c.layer, "core");
  assert.equal(c.sections.length, 1);
});

test("findConcept: authored layer defaults to 'revision' and slug derives from name", () => {
  const authored = [{ name: "Securitization from first principles" }];
  const c = findConcept(MAP, "securitization-from-first-principles", authored);
  assert.ok(c);
  assert.equal(c.layer, "revision");
  assert.equal(c.homeReading, null);
  assert.deepEqual(c.refs, []);
});

test("findConcept falls back to the auto core concept when nothing authored matches", () => {
  const c = findConcept(MAP, "sharpe-ratio", []);
  assert.ok(c);
  assert.equal(c.layer, "core");
  assert.equal(c.authored, undefined);
});

test("listConcepts puts authored entries first and drops shadowed autos", () => {
  const authored = [
    { name: "Securitization", layer: "revision" },
    { slug: "sharpe-ratio", name: "Sharpe ratio", layer: "core" },
  ];
  const list = listConcepts(MAP, authored);
  assert.equal(list[0].slug, "securitization", "authored first");
  // "sharpe-ratio" appears exactly once (the authored one shadows the auto one).
  assert.equal(list.filter((c) => c.slug === "sharpe-ratio").length, 1);
});
