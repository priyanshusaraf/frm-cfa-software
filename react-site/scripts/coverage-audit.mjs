#!/usr/bin/env node
/* Coverage audit: does a reading actually teach everything its source section
   teaches?

   Why this exists (owner-reported 2026-07-26): the content run's mandate is a
   closed list of STYLE fixes and the Opus-A gate checks sense, dashes and
   render. Nothing in the pipeline ever asked whether material was MISSING, so
   R35 passed a gate while omitting the margin period of risk entirely, a
   testable concept the source names, bolds and asks a module-quiz question
   about. Omissions are invisible to a reviewer reading only the data file:
   the prose that IS there reads fine. They are only visible against the source.

   The signal this leans on: Schweser bolds its key terms (**macro-hedging**,
   **margin period of risk (MPoR)**, **rights of assessment**). Those bolded
   terms are close to a ground-truth list of what the section wants a student to
   know, and they are mechanically extractable. Learning objectives are bolded
   the same way and are extracted separately, because an LO that no field of the
   reading addresses is the most serious kind of gap.

   This tool REPORTS, it does not judge. A term can be legitimately absent (a
   synonym is used, or it belongs to a neighbouring reading). The output is a
   worklist for a human or an Opus reviewer, not a pass/fail gate.

   Usage:
     node scripts/coverage-audit.mjs 35            # one reading
     node scripts/coverage-audit.mjs 61 62 63      # several
     node scripts/coverage-audit.mjs --all         # every reading with a data file
     node scripts/coverage-audit.mjs --all --json  # machine-readable
*/

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = join(ROOT, "..");

/* Terms that are bolded for emphasis or structure rather than as key concepts. */
const STOP = new Set([
  "exam focus", "module quiz", "key concepts", "answer key", "warm-up",
  "professor's note", "video", "example", "answer", "solution", "figure",
  "note", "important", "reading", "module", "topic", "book",
]);

function bookOf(rn) {
  const n = Number(rn);
  if (n <= 16) return 1;
  if (n <= 39) return 2;
  if (n <= 62) return 3;
  if (n <= 80) return 4;
  return 5;
}

function dataPath(rn) {
  return join(ROOT, "src", "data", `book${bookOf(rn)}`, `r${String(rn).padStart(2, "0")}.js`);
}

const bookCache = new Map();
function sourceFor(bn) {
  if (!bookCache.has(bn)) bookCache.set(bn, readFileSync(join(REPO, `Book ${bn} (1).md`), "utf8"));
  return bookCache.get(bn);
}

/* Sections are located by TITLE, never by the source's own reading number.

   The two numbering schemes diverge: the Schweser source carries 24 readings in
   Book 3 where the app carries 23, and by Book 5 the offset has grown to two, so
   the app's r63 is the source's READING 64 and the app's r101 is READING 103.
   An earlier version of this script matched on the number and cheerfully audited
   most of Books 3 to 5 against the wrong chapter. Titles are the only stable key.

   Book 1 heads its readings at #### and the others at ###, so depth is matched
   loosely. Each book repeats its reading list once in front matter; the real
   section is the LAST occurrence, and the front-matter copies carry no body. */
const sectionCache = new Map();
function sectionsOf(bn) {
  if (sectionCache.has(bn)) return sectionCache.get(bn);
  const lines = sourceFor(bn).split("\n");
  const heads = [];
  lines.forEach((l, i) => {
    if (/^#{3,6}\s*\*\*READING\s+\d+\*\*/.test(l)) {
      /* The title is the next heading line after the READING marker. */
      let title = "";
      for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
        const m = lines[j].match(/^#{1,4}\s*\*\*([^*]+)\*\*\s*$/);
        if (m) { title = clean(m[1]); break; }
        if (lines[j].trim()) break;
      }
      heads.push({ line: i, title });
    }
  });
  const out = heads.map((h, k) => ({
    title: h.title,
    text: lines.slice(h.line, k + 1 < heads.length ? heads[k + 1].line : lines.length).join("\n"),
  })).filter((s) => s.title);
  sectionCache.set(bn, out);
  return out;
}

/* Title similarity on content words, so "Financial Correlation Modeling:
   Copulas" still finds "FINANCIAL CORRELATION MODELING-BOTTOM-UP APPROACHES"
   when nothing matches exactly. */
/* Two numbers, because one cannot do both jobs. `score` normalizes by the
   SHORTER title, which is what lets a subtitle difference still match; it also
   saturates at 1 for any candidate whose words are a strict subset of the
   other's. `overlap` normalizes by the LONGER one, so a subset scores low. The
   scorer ranks on `score` and breaks ties on `overlap`. */
function titleMatch(a, b) {
  /* Short titles ("CVA") have no words long enough to survive the content-word
     filter, so they are compared whole. */
  if (norm(a) === norm(b)) return { score: 1, overlap: 1 };
  const wa = new Set(norm(a).split(" ").filter((w) => w.length > 3));
  const wb = new Set(norm(b).split(" ").filter((w) => w.length > 3));
  if (!wa.size || !wb.size) return { score: 0, overlap: 0 };
  let hit = 0;
  for (const w of wa) if (wb.has(w)) hit++;
  return { score: hit / Math.min(wa.size, wb.size), overlap: hit / Math.max(wa.size, wb.size) };
}

function sectionFor(rn, title) {
  const secs = sectionsOf(bookOf(rn));
  /* An exact title match is never a guess and must win outright, ahead of the
     fuzzy scorer. Found 2026-07-26: the source's "LIQUIDITY RISK" scored a
     perfect 1 against "Intraday Liquidity Risk Management" (subset saturation,
     above) and, sitting earlier in the book, took the `>` comparison, so r68
     was audited against r63's chapter and reported seventeen phantom gaps. */
  const exact = secs.find((s) => norm(s.title) === norm(title));
  if (exact) return { text: exact.text, matchedTitle: exact.title, score: 1 };

  let best = null, bestScore = 0, bestOverlap = 0;
  for (const s of secs) {
    const { score, overlap } = titleMatch(title, s.title);
    if (score > bestScore || (score === bestScore && overlap > bestOverlap)) {
      bestScore = score; bestOverlap = overlap; best = s;
    }
  }
  /* Below this the match is a guess, and auditing against the wrong chapter is
     worse than reporting nothing. */
  if (bestScore < 0.5) return null;
  return { text: best.text, matchedTitle: best.title, score: bestScore };
}

/* Every **bolded** run in the section, minus structural noise. */
/* Two different signals, deliberately kept apart.

   INLINE bold is Schweser saying "this is a term you must know". A SECTION
   heading is Schweser saying "this is a topic the reading covers". Both are
   worth auditing, and an early version of this script filtered headings out as
   noise, which threw away the very signal it was written to catch: the margin
   period of risk is a heading in R35, and heading-filtering hid the gap. */
function extract(section) {
  const terms = new Map();
  const topics = new Map();
  const headingLines = new Set();
  for (const line of section.split("\n")) {
    const h = line.match(/^#{1,6}\s*\*\*([^*]+)\*\*\s*$/);
    if (h) headingLines.add(clean(h[1]).toLowerCase());
  }

  const re = /\*\*([^*\n]{3,90})\*\*/g;
  let m;
  while ((m = re.exec(section))) {
    let t = clean(m[1]);
    if (!t) continue;
    /* "Example: Calculating Risk-Weighted Assets" is a worked example heading;
       what matters for coverage is the concept after the colon, not the word
       "Example". */
    t = t.replace(/^example\s*:\s*/i, "").replace(/\s*\(continued\)$/i, "").trim();
    if (t.length < 3) continue;
    if (/^(figure|table|study session|exhibit|module quiz)\b/i.test(t)) continue;
    if (/^LO\s/i.test(t)) continue;                       // handled separately
    if (/^(READING|MODULE|TOPIC|BOOK)\b/i.test(t)) continue;
    if (/^[A-D]$/i.test(t)) continue;                     // module-quiz answer keys
    if (/^\d+[.)]?$/.test(t)) continue;
    if (STOP.has(t.toLowerCase())) continue;
    if (!/[a-z]/.test(t)) continue;                       // ALL-CAPS module titles
    const key = t.toLowerCase();
    const bucket = headingLines.has(key) ? topics : terms;
    bucket.set(key, (bucket.get(key) || 0) + 1);
  }
  return { terms, topics };
}

/* Schweser italicizes inside bold (**_Rights of Assessment_**); the underscores
   are markup, not part of the term. */
function clean(s) {
  return s.trim().replace(/^_+|_+$/g, "").replace(/[.:;,]+$/, "").replace(/\s+/g, " ").trim();
}

function learningObjectives(section) {
  const out = [];
  const re = /\*\*LO\s+([\d.]+[a-z]?):?\s*([^*]+)\*\*/gi;
  let m;
  while ((m = re.exec(section))) out.push({ id: m[1], text: m[2].trim().replace(/\s+/g, " ") });
  return out;
}

/* Normalizes for matching: the reading may write "margin period of risk" where
   the source writes "margin period of risk (MPoR)", and hyphenation drifts. */
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[-‐-―]/g, " ")
    .replace(/[^a-z0-9'() ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* Words too common in this domain to carry evidence that a term is covered.
   Without this, "ratings are biased upward" matches on "ratings" alone. */
const GENERIC = new Set([
  "risk", "risks", "credit", "market", "bank", "banks", "value", "rate", "rates",
  "loss", "losses", "capital", "model", "models", "management", "managing",
  "financial", "measure", "measures", "approach", "approaches", "method",
  "methods", "process", "level", "levels", "type", "types", "factor", "factors",
  "using", "used", "versus", "with", "that", "this", "from", "into", "their",
  "which", "when", "what", "have", "been", "more", "less", "than", "the",
]);

function words(s) {
  return norm(s).split(" ").filter(Boolean);
}

/* Phrase-level matching alone is far too strict: r24 teaches every one of the
   source's bolded sovereign-rating shortcomings, in its own words, and a
   literal matcher called all of them missing. Proximity is the fix. A term
   counts as covered when its DISTINCTIVE words (generic domain vocabulary
   removed) all appear inside a short window of the reading, which is what
   paraphrase looks like, while leaving a genuinely absent concept
   ("margin period of risk") unmatched because one of its words never shows up
   near the others. */
function coveredByProximity(term, hayWords, index) {
  /* Length 3 and up, so the abbreviations that carry most of the meaning in this
     domain (IRB, CVA, VaR, LGD) count as distinctive rather than being dropped
     as noise. Dropping them made "advanced IRB approach" reduce to the single
     word "advanced" and report as missing. */
  let key = words(term).filter((w) => w.length >= 3 && !GENERIC.has(w));
  /* When almost every word is generic ("internal models approach"), dropping
     them leaves too little to judge on and a bare single-word test passes on
     any reading that says "internal" anywhere. Keep the generic words and let
     proximity do the work instead: the phrase's words still have to appear
     TOGETHER, which a reading that never discusses the concept will fail. */
  if (key.length < 2) key = words(term).filter((w) => w.length >= 3);
  if (key.length < 2) return null;                 // genuinely too thin to judge
  const posLists = key.map((w) => index.get(w));
  if (posLists.some((l) => !l)) return false;      // a distinctive word never appears
  /* Smallest window containing one occurrence of every distinctive word. */
  const cursors = new Array(posLists.length).fill(0);
  let best = Infinity;
  for (;;) {
    let lo = Infinity, hi = -Infinity, loIdx = 0;
    for (let i = 0; i < posLists.length; i++) {
      const v = posLists[i][cursors[i]];
      if (v < lo) { lo = v; loIdx = i; }
      if (v > hi) hi = v;
    }
    best = Math.min(best, hi - lo);
    cursors[loIdx]++;
    if (cursors[loIdx] >= posLists[loIdx].length) break;
  }
  return best <= 30;
}

/* A term counts as covered if its full phrase appears, or if its parenthetical
   abbreviation does, or if the phrase outside the parens does. */
function covered(term, hay) {
  const t = norm(term);
  if (!t) return true;
  if (hay.includes(t)) return true;
  const paren = term.match(/\(([^)]{2,12})\)/);
  if (paren) {
    const abbr = norm(paren[1]);
    const bare = norm(term.replace(/\s*\([^)]*\)/, ""));
    if (abbr && abbr.length >= 2 && hay.includes(abbr)) return true;
    if (bare && hay.includes(bare)) return true;
  }
  /* Inflection drift on the last word: the source bolds "auctioning" where the
     reading writes "auction". Only the suffix is varied, never the stem. */
  const head = t.replace(/\S+$/, "");
  const tail = t.split(" ").pop();
  const stem = tail.replace(/(ing|ed|es|s)$/, "");
  if (stem.length >= 4) {
    for (const suf of ["", "s", "es", "ed", "ing"]) {
      if (hay.includes((head + stem + suf).trim())) return true;
    }
  }
  return false;
}

async function auditOne(rn) {
  const p = dataPath(rn);
  if (!existsSync(p)) return { rn, error: "no data file" };
  const mod0 = await import("file://" + p);
  const section = sectionFor(rn, mod0.default.title || "");
  if (!section) return { rn, error: `no source section matched title "${mod0.default.title}"` };

  const mod = await import("file://" + p);
  const hay = norm(JSON.stringify(mod.default));
  const hayWords = words(hay);
  const index = new Map();
  hayWords.forEach((w, i) => { let l = index.get(w); if (!l) index.set(w, (l = [])); l.push(i); });
  const isCovered = (t) => {
    if (covered(t, hay)) return true;
    const prox = coveredByProximity(t, hayWords, index);
    return prox === true;
  };
  const { terms, topics } = extract(section.text);
  const missing = [];
  for (const [term, count] of terms) if (!isCovered(term)) missing.push({ term, count });
  /* A term the source bolds repeatedly is more likely to be examinable, so the
     worklist leads with those. */
  missing.sort((a, b) => b.count - a.count || a.term.localeCompare(b.term));
  const missingTopics = [];
  for (const [t] of topics) if (!isCovered(t)) missingTopics.push(t);
  missingTopics.sort();

  const los = learningObjectives(section.text).map((lo) => {
    /* An LO is "addressed" if a decent share of its content words appear. */
    const words = norm(lo.text).split(" ").filter((w) => w.length > 4);
    const hit = words.filter((w) => hay.includes(w)).length;
    return { ...lo, coverage: words.length ? hit / words.length : 1 };
  });

  return {
    rn,
    sourceTitle: section.matchedTitle,
    matchScore: Number(section.score.toFixed(2)),
    sourceLines: section.text.split("\n").length,
    terms: terms.size,
    topics: topics.size,
    missing,
    missingTopics,
    weakLOs: los.filter((l) => l.coverage < 0.6),
  };
}

const args = process.argv.slice(2);
const json = args.includes("--json");
const list = args.includes("--all")
  ? Array.from({ length: 101 }, (_, i) => i + 1).filter((n) => existsSync(dataPath(n)))
  : args.filter((a) => /^\d+$/.test(a)).map(Number);

if (!list.length) {
  console.error("usage: coverage-audit.mjs <reading numbers> | --all [--json]");
  process.exit(2);
}

const results = [];
for (const rn of list) results.push(await auditOne(rn));

if (json) {
  console.log(JSON.stringify(results, null, 1));
} else {
  let totalMissing = 0;
  for (const r of results) {
    if (r.error) { console.log(`r${r.rn}: ${r.error}`); continue; }
    totalMissing += r.missing.length + r.missingTopics.length;
    const gaps = r.missing.length + r.missingTopics.length;
    const flag = gaps > 6 ? "  <-- REVIEW" : "";
    console.log(`\nr${r.rn}  ${r.terms} key terms + ${r.topics} topics in source; ${gaps} not found in the reading${flag}`);
    for (const t of r.missingTopics) console.log(`   TOPIC NOT COVERED  ${t}`);
    for (const m of r.missing.slice(0, 25)) {
      console.log(`   MISSING${m.count > 1 ? ` (x${m.count})` : "     "}  ${m.term}`);
    }
    if (r.missing.length > 25) console.log(`   ... and ${r.missing.length - 25} more`);
    for (const lo of r.weakLOs) {
      console.log(`   WEAK LO ${lo.id} (${Math.round(lo.coverage * 100)}%): ${lo.text.slice(0, 100)}`);
    }
  }
  if (results.length > 1) {
    console.log(`\n${results.length} readings audited, ${totalMissing} missing terms total`);
    const worst = results.filter((r) => !r.error)
      .sort((a, b) => (b.missing.length + b.missingTopics.length) - (a.missing.length + a.missingTopics.length))
      .slice(0, 15);
    console.log("worst: " + worst.map((r) => `r${r.rn}(${r.missing.length + r.missingTopics.length})`).join(" "));
  }
}
