import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSummaryOutline } from "./summaryOutline.js";

test("splits sentence-starting bold labels into points", () => {
  const r = parseSummaryOutline(
    "<p><strong>Alpha</strong> is the first idea. <strong>Beta</strong> is the second. <strong>Gamma</strong> is the third.</p>"
  );
  assert.equal(r.items.length, 3);
  assert.deepEqual(r.items.map((i) => i.head), ["Alpha", "Beta", "Gamma"]);
  assert.equal(r.items[0].body, "is the first idea.");
  assert.equal(r.lead, "");
});

test("mid-sentence bold stays inline instead of opening a point (r56 shape)", () => {
  const r = parseSummaryOutline(
    "<p><strong>Economic capital</strong> = risk capital. Three judgment calls: " +
      "<strong>time horizon</strong> (1yr default), <strong>default probability</strong> (PIT for pricing), " +
      "<strong>confidence level</strong> (tied to rating). <strong>RAROC</strong> ignores systematic risk. " +
      "<strong>Stand-alone</strong> capital serves incentive pay.</p>"
  );
  /* The three inline labels are NOT siblings of the real points. */
  assert.deepEqual(r.items.map((i) => i.head), ["Economic capital", "RAROC", "Stand-alone"]);
  /* They became sub-points under the sentence that introduces them. */
  assert.equal(r.items[0].subs.length, 3);
  assert.match(r.items[0].body, /Three judgment calls$/);
  assert.match(r.items[0].subs[0], /^<strong>time horizon<\/strong> \(1yr default\)$/);
});

test("a bold label after a semicolon is not a new point", () => {
  const r = parseSummaryOutline(
    "<p><strong>One</strong> alpha; <strong>Two</strong> beta. <strong>Three</strong> gamma. <strong>Four</strong> delta.</p>"
  );
  assert.deepEqual(r.items.map((i) => i.head), ["One", "Three", "Four"]);
  assert.match(r.items[0].body, /<strong>Two<\/strong> beta\./);
});

test("semicolon list becomes sub-points and outranks commas (r89 shape)", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> first. <strong>Strategies</strong>: managed futures (trend-following, asset allocation); " +
      "merger arb (deal risk); distressed (long credit risk). <strong>C</strong> third.</p>"
  );
  const s = r.items[1];
  assert.equal(s.body, "");
  assert.deepEqual(s.subs, [
    "managed futures (trend-following, asset allocation)",
    "merger arb (deal risk)",
    "distressed (long credit risk)",
  ]);
});

test("comma list splits only at paren depth zero (r63 shape)", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> first. <strong>Six sources</strong>: cash, deposits (surprisingly unstable), " +
      "trading book liquidation, securitization. <strong>C</strong> third.</p>"
  );
  assert.deepEqual(r.items[1].subs, [
    "cash",
    "deposits (surprisingly unstable)",
    "trading book liquidation",
    "securitization",
  ]);
});

test("two comma-separated clauses stay one body, not a list", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> first. <strong>Benefit</strong>: continuous, not step-like. <strong>C</strong> third.</p>"
  );
  assert.equal(r.items[1].subs.length, 0);
  assert.equal(r.items[1].body, "continuous, not step-like.");
});

test("a colon introducing a clause with a later sentence break does not split", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> first. <strong>B</strong>: alpha, beta, gamma. And then a whole further sentence. <strong>C</strong> third.</p>"
  );
  assert.equal(r.items[1].subs.length, 0);
});

test("commas inside prose math do not split", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> first. <strong>Terms</strong>: \\(f(x, y, z)\\), the payoff, the notional. <strong>C</strong> third.</p>"
  );
  assert.deepEqual(r.items[1].subs, ["\\(f(x, y, z)\\)", "the payoff", "the notional"]);
});

test("an abbreviation period does not open a point", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> one, e.g. <strong>B</strong> two. <strong>C</strong> three. <strong>D</strong> four.</p>"
  );
  assert.deepEqual(r.items.map((i) => i.head), ["A", "C", "D"]);
});

test("leading prose before the first label is kept as a lead-in", () => {
  const r = parseSummaryOutline(
    "<p>Read this first. <strong>A</strong> one. <strong>B</strong> two. <strong>C</strong> three.</p>"
  );
  assert.equal(r.lead, "Read this first.");
  assert.equal(r.items.length, 3);
});

test("returns null rather than a thin outline", () => {
  assert.equal(parseSummaryOutline("<p>Just prose with no labels at all.</p>"), null);
  assert.equal(parseSummaryOutline("<p><strong>A</strong> one. <strong>B</strong> two.</p>"), null);
  assert.equal(parseSummaryOutline(""), null);
  assert.equal(parseSummaryOutline(null), null);
});

test("already-structured summaries are left alone", () => {
  assert.equal(
    parseSummaryOutline("<ul><li><strong>A</strong> one.</li><li><strong>B</strong> two.</li><li><strong>C</strong> c.</li></ul>"),
    null
  );
});

test("every emitted fragment is balanced HTML", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> holds <em>emphasis</em> inside. <strong>B</strong> two. <strong>C</strong> three.</p>"
  );
  assert.equal(r.items[0].body, "holds <em>emphasis</em> inside.");
});

test("a long multi-sentence body becomes sentence sub-lines", () => {
  const long =
    "The first sentence carries a real clause of explanation about the mechanism. " +
    "The second sentence carries another distinct clause worth its own line here. " +
    "The third sentence closes the point off with its own separate observation.";
  const r = parseSummaryOutline(
    `<p><strong>A</strong> ${long} <strong>B</strong> two. <strong>C</strong> three.</p>`
  );
  assert.equal(r.items[0].kind, "sentences");
  assert.equal(r.items[0].subs.length, 3);
  assert.equal(r.items[0].body, "");
  /* Short bodies stay inline rather than gaining a pointless second level. */
  assert.equal(r.items[1].kind, null);
  assert.equal(r.items[1].body, "two.");
});

test("a colon list outranks sentence splitting", () => {
  const r = parseSummaryOutline(
    "<p><strong>A</strong> first. <strong>Sources</strong>: the first source of funding here; " +
      "the second source of funding here; the third source of funding listed here. <strong>C</strong> third.</p>"
  );
  assert.equal(r.items[1].kind, "list");
  assert.equal(r.items[1].subs.length, 3);
});
