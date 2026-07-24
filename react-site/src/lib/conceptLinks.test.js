import { test } from "node:test";
import assert from "node:assert/strict";
import { conceptPhrases, candidatesFor, findLinkMatches } from "./conceptLinks.js";

const WCDR = { slug: "wcdr", name: "Vasicek worst-case default rate (WCDR)", homeReading: 26 };
const SEC = {
  slug: "securitization", name: "Securitization, from first principles", homeReading: 39, layer: "revision",
  linkPhrases: ["securitization", "structured finance"],
};

test("conceptPhrases splits a parenthetical abbreviation out of the name", () => {
  const p = conceptPhrases(WCDR);
  assert.ok(p.includes("Vasicek worst-case default rate (WCDR)"));
  assert.ok(p.includes("Vasicek worst-case default rate"));
  assert.ok(p.includes("WCDR"));
  assert.equal(p[0], "Vasicek worst-case default rate (WCDR)", "longest first");
});

test("conceptPhrases keeps authored linkPhrases", () => {
  assert.ok(conceptPhrases(SEC).includes("structured finance"));
});

test("candidatesFor never links a concept inside its own home reading", () => {
  assert.ok(!candidatesFor([WCDR], 26).length);
  assert.ok(!candidatesFor([{ ...SEC, layer: "revision" }], 39).length);
});

test("candidatesFor links a core concept forward only, a revision page anywhere", () => {
  const core = { ...WCDR, layer: "core" };
  const revision = { ...SEC, layer: "revision" };
  assert.equal(candidatesFor([core], 12).length, 0, "R12 precedes the definition in R26");
  assert.equal(candidatesFor([core], 29).length, 1, "R29 follows it");
  assert.equal(candidatesFor([revision], 12).length, 1, "a prerequisite refresher is useful anywhere");
});

test("findLinkMatches matches an abbreviation at word boundaries only", () => {
  const c = candidatesFor([WCDR], 30); // a reading after WCDR's home
  const hit = findLinkMatches("The WCDR sets capital.", c, new Set());
  assert.equal(hit.length, 1);
  assert.equal(hit[0].text, "WCDR");
  assert.equal(findLinkMatches("Nothing about WCDRs here.", c, new Set()).length, 0);
});

test("findLinkMatches prefers the longest phrase for a concept", () => {
  const c = candidatesFor([WCDR], 30); // a reading after WCDR's home
  const hit = findLinkMatches("Use the Vasicek worst-case default rate (WCDR) here.", c, new Set());
  assert.equal(hit.length, 1, "one link per concept, not one per spelling");
  assert.equal(hit[0].text, "Vasicek worst-case default rate (WCDR)");
});

test("findLinkMatches is case-insensitive and skips already-used slugs", () => {
  const c = candidatesFor([SEC], 12); // revision layer: in scope anywhere
  const used = new Set();
  assert.equal(findLinkMatches("Structured finance pools loans.", c, used).length, 1);
  used.add("securitization");
  assert.equal(findLinkMatches("More structured finance here.", c, used).length, 0);
});

test("findLinkMatches returns non-overlapping ranges in document order", () => {
  const a = { slug: "a", name: "credit risk", homeReading: 1 };
  const b = { slug: "b", name: "risk", homeReading: 1 };
  const hits = findLinkMatches("credit risk matters", candidatesFor([a, b], 9), new Set());
  assert.equal(hits.length, 1, "the overlapping shorter match is dropped");
  assert.equal(hits[0].slug, "a");
});
