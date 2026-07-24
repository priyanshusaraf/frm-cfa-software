/* Usage: node scripts/preview-concept-links.mjs [rn ...]
   With no arguments: a coverage table over all 101 readings.
   With reading numbers: the exact matched phrase and its surrounding sentence,
   which is what the Phase 3 wave verification reads to judge false positives.

   This is a string-level PREVIEW of what src/lib/conceptLinks.js will do in the
   DOM. It runs the same matcher over the same prose fields, so a match here is a
   link there, minus the DOM-only skips (math, widgets, headings). It exists so a
   wave can check 5 readings without 5 headless renders. */
import { readdirSync } from "node:fs";
import { candidatesFor, findLinkMatches } from "../src/lib/conceptLinks.js";
import { conceptLinkTable as table } from "../src/data/conceptLinkTable.js";

const dataDir = new URL("../src/data/", import.meta.url);
const want = process.argv.slice(2).map(Number).filter(Boolean);

/* The prose fields the chapter renders as running text. Deliberately excludes
   formulas[].math and widget markup, which the DOM pass skips too. */
function proseOf(d) {
  const out = [];
  const push = (label, html) => { if (html) out.push([label, String(html)]); };
  push("tagline", d.tagline); push("teaches", d.teaches); push("why", d.why);
  push("intuition", d.intuition); push("eli5", d.eli5); push("thinkLike", d.thinkLike);
  (d.breakdown || []).forEach((b, i) => (b.points || []).forEach((p, j) =>
    push(`breakdown[${i}].points[${j}]`, typeof p === "string" ? p : p && p.point)));
  (d.formulas || []).forEach((f, i) => { push(`formulas[${i}].plain`, f.plain); push(`formulas[${i}].note`, f.note); });
  (d.concepts || []).forEach((c, i) => { push(`concepts[${i}].def`, c.def); push(`concepts[${i}].intuition`, c.intuition); });
  (d.misconceptions || []).forEach((m, i) => { push(`misconceptions[${i}].wrong`, m.wrong); push(`misconceptions[${i}].right`, m.right); });
  (d.highYield || []).forEach((h, i) => push(`highYield[${i}].what`, h.what));
  push("summary", d.summary);
  return out;
}

const strip = (s) => String(s).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const rows = [];
for (const bookDir of readdirSync(dataDir).filter((d) => /^book\d+$/.test(d)).sort()) {
  for (const file of readdirSync(new URL(bookDir + "/", dataDir)).filter((f) => /^r\d+\.js$/.test(f)).sort()) {
    const d = (await import(new URL(bookDir + "/" + file, dataDir))).default;
    if (!d || !d.reading) continue;
    const rn = d.reading;
    if (want.length && !want.includes(rn)) continue;
    const candidates = candidatesFor(table, rn);
    const used = new Set();
    const found = [];
    for (const [label, html] of proseOf(d)) {
      const text = strip(html);
      for (const m of findLinkMatches(text, candidates, used)) {
        used.add(m.slug);
        found.push({ label, slug: m.slug, text: m.text, ctx: text.slice(Math.max(0, m.start - 60), m.end + 60) });
      }
    }
    rows.push({ rn, title: d.title, found });
  }
}

if (want.length) {
  for (const r of rows) {
    console.log(`\n--- r${r.rn} ${r.title} (${r.found.length} link${r.found.length === 1 ? "" : "s"})`);
    for (const f of r.found) console.log(`  [${f.slug}] "${f.text}" in ${f.label}\n     ...${f.ctx}...`);
  }
} else {
  const linked = rows.filter((r) => r.found.length);
  for (const r of rows) {
    console.log(String(r.rn).padStart(3) + "  " + String(r.found.length).padStart(2) + "  " +
      (r.found.map((f) => f.slug).join(", ") || "-"));
  }
  console.log(`\n${linked.length}/${rows.length} readings carry at least one inline concept link.`);
}
