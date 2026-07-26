#!/usr/bin/env node
/* Detects the prose patterns that read as machine-written.

   Owner-reported 2026-07-26 against R36's thinkLike, quoted in full:

     "Two practical habits follow. First, when you meet a new product, do not
      reach for a formula. Ask which of the four factors are switched on. Single
      payout at the end? Exposure climbs. Regular settlement? It gets capped.
      Two risk factors stacked? Add two shapes. An exercise decision pending?
      Add its value until the decision is made. ... Being able to say in words
      why the shape or the formula behaves as it does is what turns a slow
      reconstruction into a fast answer."

   The verdict was "it just screams AI". The em-dash purge already removed the
   most visible tell; these are the next layer, and unlike dashes they cannot be
   found by grepping one character. Each pattern below is a STRUCTURAL habit, so
   it is matched structurally.

   Owner calibration 2026-07-26: of the four habits first identified, the
   "almost always one of two templates" construction was judged acceptable
   writing and its pattern was removed. Announcing structure, chaining
   rhetorical questions, and the aphoristic closer are the real tells.

   Enforcement note: the coverage incident taught that a rule nothing checks is
   not a rule. This runs as a warn-level check so the run cannot quietly drift
   back into the voice, but it is advisory: every pattern here has legitimate
   uses, and a flagged line needs a human read, not a reflex rewrite.

   Usage:
     node scripts/ai-tells.mjs 36           # one reading
     node scripts/ai-tells.mjs --all        # whole corpus, ranked
*/

import { readdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Fields whose text is prose the student reads. Structured fields (quiz
   options, formula math) are excluded: a fragment is correct there. */
const PROSE = ["teaches", "why", "intuition", "eli5", "thinkLike", "summary", "tagline"];

const PATTERNS = [
  {
    id: "structure-announcement",
    what: "announces its own structure instead of just teaching",
    // "Two practical habits follow." / "Three things matter here."
    re: /\b(Two|Three|Four|Five|Six)\s+(?:\w+\s+){0,2}(habits?|things?|rules?|moves?|lessons?|takeaways?|points?|questions?)\s+(follow|matter|stand out|are worth)\b/gi,
  },
  {
    id: "rhetorical-chain",
    what: "chains rhetorical questions with fragment answers",
    // "Single payout at the end? Exposure climbs. Regular settlement? It gets capped."
    re: /\?\s+[A-Z][^.?!]{2,50}\.\s+[A-Z][^.?!]{2,60}\?/g,
  },
  {
    id: "aphoristic-closer",
    what: "closes on an aphorism (X is what turns Y into Z)",
    /* Narrowed after measuring: a bare "the collateral is what makes repos
       safer" is an ordinary causal claim, not a flourish. The tell is the
       transformation pivot, X into Y or X from Y, which is what the flagged
       R36 sentence used ("turns a slow reconstruction into a fast answer"). */
    re: /\bis\s+what\s+(turns|separates|converts|divides|distinguishes)\s+[^.;]{3,60}\s(into|from)\s/gi,
  },
  {
    id: "not-x-but-y",
    what: "the 'it is not X, it is Y' reversal, used as filler",
    re: /\bis\s+not\s+(?:about\s+)?\w[^.,;]{2,40},\s+it\s+is\b/gi,
  },
  {
    id: "enumerated-prose",
    what: "numbers prose that did not need numbering (First, ... Second, ...)",
    re: /(?:^|[.!?]\s)First,\s[^.!?]{15,}[.!?]\s(?:[^.!?]{0,200}[.!?]\s)?Second,\s/g,
  },
];

function stripTags(s) {
  return String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/* Prose lives in nested fields too (concepts[].intuition, breakdown explains),
   so the whole object is walked and only prose-ish string leaves are read. */
function proseChunks(obj, path = "", out = []) {
  if (typeof obj === "string") {
    if (obj.length > 60) out.push({ path, text: stripTags(obj) });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => proseChunks(v, `${path}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (k === "math" || k === "options" || k === "url") continue;
      proseChunks(v, path ? `${path}.${k}` : k, out);
    }
  }
  return out;
}

function scan(data) {
  const hits = [];
  for (const chunk of proseChunks(data)) {
    for (const p of PATTERNS) {
      p.re.lastIndex = 0;
      let m;
      while ((m = p.re.exec(chunk.text))) {
        hits.push({
          id: p.id,
          what: p.what,
          field: chunk.path,
          quote: chunk.text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 40).trim(),
        });
        if (!p.re.global) break;
      }
    }
  }
  return hits;
}

function pathFor(rn) {
  for (const b of [1, 2, 3, 4, 5]) {
    const p = join(ROOT, "src", "data", `book${b}`, `r${String(rn).padStart(2, "0")}.js`);
    if (existsSync(p)) return p;
  }
  return null;
}

const args = process.argv.slice(2);
const all = args.includes("--all");
const list = all
  ? readdirSync(join(ROOT, "src", "data"))
      .filter((d) => d.startsWith("book"))
      .flatMap((d) => readdirSync(join(ROOT, "src", "data", d)).filter((f) => /^r\d+\.js$/.test(f)).map((f) => Number(f.slice(1, -3))))
      .sort((a, b) => a - b)
  : args.filter((a) => /^\d+$/.test(a)).map(Number);

if (!list.length) {
  console.error("usage: ai-tells.mjs <reading numbers> | --all");
  process.exit(2);
}

const rows = [];
for (const rn of list) {
  const p = pathFor(rn);
  if (!p) continue;
  const data = (await import("file://" + p)).default;
  rows.push({ rn, hits: scan(data) });
}

const byId = new Map();
let total = 0;
for (const r of rows) {
  total += r.hits.length;
  for (const h of r.hits) byId.set(h.id, (byId.get(h.id) || 0) + 1);
  if (!r.hits.length) continue;
  if (!all || r.hits.length) {
    console.log(`\nr${r.rn}  ${r.hits.length} tell${r.hits.length > 1 ? "s" : ""}`);
    for (const h of r.hits.slice(0, all ? 3 : 20)) {
      console.log(`   [${h.id}] ${h.field}`);
      console.log(`      ...${h.quote}...`);
    }
    if (all && r.hits.length > 3) console.log(`   ... and ${r.hits.length - 3} more`);
  }
}

console.log(`\n${rows.filter((r) => r.hits.length).length}/${rows.length} readings flagged, ${total} tells`);
for (const [id, n] of [...byId].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${id}`);
