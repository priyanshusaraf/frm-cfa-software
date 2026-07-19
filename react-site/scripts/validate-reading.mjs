/* Usage (from react-site/): node scripts/validate-reading.mjs book4/r67.js 67
   Validates the enriched reading schema. Exits 1 with FAIL <reason> on any miss. */
const [, , rel, rnArg] = process.argv;
const rn = parseInt(rnArg, 10);
const fail = (msg) => { console.error("FAIL " + msg); process.exit(1); };

let d;
try {
  d = (await import(new URL("../src/data/" + rel, import.meta.url))).default;
} catch (e) { fail("import error: " + e.message); }

if (!d || d.reading !== rn) fail("reading number mismatch");
const str = (k, min = 1) => { if (typeof d[k] !== "string" || d[k].length < min) fail(k + " missing/short"); };
str("title"); str("teaches", 50); str("why", 50); str("intuition", 100);
str("eli5", 150); str("thinkLike", 150); str("summary", 50);

if (!Array.isArray(d.breakdown)) fail("breakdown missing");
for (const b of d.breakdown) if (!b.title || !Array.isArray(b.points) || !b.points.length) fail("breakdown item malformed");

if (!Array.isArray(d.quiz) || d.quiz.length < 5) fail("quiz needs >=5 questions");
for (const q of d.quiz) {
  if (!q.q || !Array.isArray(q.options) || q.options.length !== 4) fail("quiz options must be 4");
  if (!(q.answer >= 0 && q.answer < 4)) fail("quiz answer index");
  if (!q.why) fail("quiz why missing");
}

if (!Array.isArray(d.sources) || d.sources.length < 2) fail("sources needs >=2");
for (const s of d.sources) if (!s.title || !/^https?:\/\//.test(s.url || "")) fail("source url malformed");

if (!d.pdf || !d.pdf.book || !d.pdf.query || d.pdf.query.split(/\s+/).length < 4) fail("pdf locator missing/short");

if (!Array.isArray(d.formulas)) fail("formulas missing");
for (const f of d.formulas) {
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
console.log("OK " + rel);
