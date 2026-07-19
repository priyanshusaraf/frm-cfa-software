/* Usage (from react-site/): node scripts/validate-reading.mjs book4/r67.js 67
   Optional flags:
     --json    machine-readable report (used by the fix-pass tooling)
     --prose   ONLY run the prose/style rules (fast pre/post check on an edit pass)

   Validates the enriched reading schema. Unlike the original version this
   collects EVERY failure rather than exiting on the first one: the content
   fix-pass needs a complete defect list per file, not just the first offender. */
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const [rel, rnArg] = argv.filter((a) => !a.startsWith("--"));
const rn = parseInt(rnArg, 10);

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

let d;
try {
  d = (await import(new URL("../src/data/" + rel, import.meta.url))).default;
} catch (e) {
  console.error("FAIL import error: " + e.message);
  process.exit(1);
}

/* ---------- helpers ---------- */

const isStr = (v) => typeof v === "string";
const text = (v) => (isStr(v) ? v : "");

/* Prose fields only. `breakdown` points, `concepts[].related` labels and
   `sources[].title` legitimately use "Term — gloss" and are excluded from the
   em-dash budget; counting them would punish a deliberate convention. */
function proseStrings() {
  const out = [];
  for (const k of ["teaches", "why", "intuition", "eli5", "thinkLike", "summary"]) {
    if (isStr(d[k])) out.push([k, d[k]]);
  }
  for (const [i, c] of (d.concepts || []).entries()) {
    for (const k of ["def", "intuition", "example", "counter", "pitfall", "memory"]) {
      if (isStr(c[k])) out.push([`concepts[${i}].${k}`, c[k]]);
    }
  }
  for (const [i, m] of (d.misconceptions || []).entries()) {
    if (isStr(m.wrong)) out.push([`misconceptions[${i}].wrong`, m.wrong]);
    if (isStr(m.right)) out.push([`misconceptions[${i}].right`, m.right]);
  }
  for (const [i, h] of (d.highYield || []).entries()) if (isStr(h.why)) out.push([`highYield[${i}].why`, h.why]);
  for (const [i, q] of (d.quiz || []).entries()) if (isStr(q.why)) out.push([`quiz[${i}].why`, q.why]);
  for (const [i, h] of (d.hooks || []).entries()) if (isStr(h.text)) out.push([`hooks[${i}].text`, h.text]);
  return out;
}

/* Split on sentence enders that are followed by whitespace + a capital, so
   "$1.5 million" and "e.g." don't split. Good enough for a dash budget. */
function sentences(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z(])/)
    .filter((x) => x.trim());
}

/* ---------- prose / style rules (the 2026-07-20 pass) ---------- */

const PROSE_EMDASH_MAX = 15; // target from the content audit
let emTotal = 0;
const chainOffenders = [];

for (const [where, s] of proseStrings()) {
  const plain = s.replace(/<[^>]+>/g, " ");
  emTotal += (plain.match(/—/g) || []).length;
  for (const sent of sentences(s)) {
    const n = (sent.match(/—/g) || []).length;
    if (n >= 3) chainOffenders.push(`${where}: ${n} em-dashes in one sentence`);
  }
}
if (emTotal > PROSE_EMDASH_MAX) {
  fail(`prose em-dashes: ${emTotal} (max ${PROSE_EMDASH_MAX}) — rewrite, do not regex-replace`);
}
for (const c of chainOffenders) fail("em-dash chain — " + c);

/* Schweser's own module-quiz scaffolding must never reach the student. */
for (const [where, s] of proseStrings()) {
  if (/MODULE QUIZ|Module Quiz \d/.test(s)) fail(`source-guide leakage in ${where}: "MODULE QUIZ" reference`);
}

/* Teaching fields are rendered through <Html>; a plain string with no markup
   renders as one unbroken wall of text. */
for (const k of ["teaches", "why", "intuition", "eli5", "thinkLike", "summary"]) {
  const v = text(d[k]);
  if (v.length > 400 && !/<(p|ul|ol|li|strong|em|br)\b/i.test(v)) {
    fail(`${k} is a ${v.length}-char plain string with no HTML — needs <p> structure`);
  }
}

/* A `def` that enumerates a list already present in `breakdown` is the single
   biggest duplication source in the corpus. */
for (const [i, c] of (d.concepts || []).entries()) {
  const def = text(c.def);
  const words = def.split(/\s+/).filter(Boolean).length;
  if (words > 120) fail(`concepts[${i}] (${c.name || "?"}) def is ${words} words — move the enumeration to breakdown`);
  else if (words > 70) warn(`concepts[${i}] (${c.name || "?"}) def is ${words} words`);
}

if (flags.has("--prose")) {
  report();
}

/* ---------- schema rules ---------- */

if (!d || d.reading !== rn) fail("reading number mismatch");
const str = (k, min = 1) => { if (typeof d[k] !== "string" || d[k].length < min) fail(k + " missing/short"); };
str("title"); str("teaches", 50); str("why", 50); str("intuition", 100);
str("eli5", 150); str("thinkLike", 150); str("summary", 50);

if (!Array.isArray(d.breakdown)) fail("breakdown missing");
else for (const b of d.breakdown) if (!b.title || !Array.isArray(b.points) || !b.points.length) fail("breakdown item malformed");

if (!Array.isArray(d.quiz) || d.quiz.length < 5) fail("quiz needs >=5 questions");
else for (const q of d.quiz) {
  if (!q.q || !Array.isArray(q.options) || q.options.length !== 4) fail("quiz options must be 4");
  if (!(q.answer >= 0 && q.answer < 4)) fail("quiz answer index");
  if (!q.why) fail("quiz why missing");
  // Quiz.jsx reshuffles options every round, so letter references point at random options.
  for (const o of q.options || []) {
    if (/^(none|both|all) of the above/i.test(String(o).replace(/<[^>]+>/g, "").trim())) {
      fail("position-dependent option: " + o);
    }
  }
  if (/\bOption [A-D]\b|\([A-D]\)\s|(^|\s)[A-D] and [A-D]\b/.test(String(q.why))) {
    fail("quiz why references an option letter: " + String(q.why).slice(0, 60));
  }
}

if (!Array.isArray(d.sources) || d.sources.length < 2) fail("sources needs >=2");
else for (const s of d.sources) if (!s.title || !/^https?:\/\//.test(s.url || "")) fail("source url malformed");

if (!d.pdf || !d.pdf.book || !d.pdf.query || d.pdf.query.split(/\s+/).length < 4) fail("pdf locator missing/short");

if (!Array.isArray(d.formulas)) fail("formulas missing");
else for (const f of d.formulas) {
  if (!f.name || !f.math) fail("formula malformed");
  if (!f.plain) fail("formula '" + f.name + "' missing plain intuition");
  // bare multi-letter words in TeX math outside \text{}/commands = broken rendering
  if (/\\/.test(f.math)) {
    const stripped = f.math.replace(/\\[a-zA-Z]+/g, " ").replace(/\\./g, " ").replace(/\{[^{}]*\}/g, " ");
    if (/[a-zA-Z]{12,}/.test(stripped.replace(/\s/g, ""))) fail("formula '" + f.name + "' has bare words in math mode — wrap in \\text{}");
  }
}

for (const arr of ["misconceptions", "highYield", "recall", "concepts", "hooks"]) {
  if (!Array.isArray(d[arr]) || !d[arr].length) fail(arr + " missing/empty");
}

/* Concept fields must be absent or non-empty — never `null`, which renders as a
   blank labelled section in the chapter body. */
for (const [i, c] of (d.concepts || []).entries()) {
  if (!c.name || !c.def) fail(`concepts[${i}] missing name/def`);
  for (const k of ["def", "intuition", "example", "counter", "pitfall", "memory"]) {
    if (k in c && (c[k] === null || (isStr(c[k]) && !c[k].trim()))) {
      fail(`concepts[${i}] (${c.name || "?"}) .${k} is null/empty — omit the key or fill it`);
    }
  }
  // related refs are {r, label}; a {r, why} renders a chip with no text.
  for (const rr of c.related || []) {
    if (rr && typeof rr === "object" && !isStr(rr)) {
      if (rr.r == null) fail(`concepts[${i}] related ref missing r`);
      if (!isStr(rr.label) || !rr.label.trim()) fail(`concepts[${i}] related ref {r:${rr.r}} missing label (found keys: ${Object.keys(rr).join(",")})`);
    }
  }
}

/* connections.from/to entries are {r, why} OR {label, why} for external prereqs. */
for (const side of ["from", "to"]) {
  for (const [i, c] of ((d.connections || {})[side] || []).entries()) {
    if (c.r == null && !isStr(c.label)) fail(`connections.${side}[${i}] has neither r nor label`);
    if (!c.why) fail(`connections.${side}[${i}] missing why`);
  }
}

for (const [i, h] of (d.highYield || []).entries()) {
  if (!(h.stars >= 1 && h.stars <= 5)) fail(`highYield[${i}] stars out of range`);
  if (!h.what || !h.why) fail(`highYield[${i}] missing what/why`);
}

report();

function report() {
  if (flags.has("--json")) {
    console.log(JSON.stringify({ file: rel, reading: rn, ok: !errors.length, errors, warnings, emDashes: emTotal }));
  } else if (errors.length) {
    for (const e of errors) console.error("FAIL " + e);
    for (const w of warnings) console.error("warn " + w);
  } else {
    for (const w of warnings) console.error("warn " + w);
    console.log("OK " + rel + (emTotal ? ` (${emTotal} prose em-dashes)` : ""));
  }
  process.exit(errors.length ? 1 : 0);
}
