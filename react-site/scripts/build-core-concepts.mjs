/* Usage: node scripts/build-core-concepts.mjs
   Writes src/data/coreConcepts.json — the cross-reading core-concept table
   (CLAUDE.md §6, Phase 1). Runs at content-edit time (not app runtime, not a Vite
   build step) so Chapter.jsx can consult the table on every page without pulling
   in all 101 reading chunks the way useAllReadings() would (see the code-split
   rationale in CLAUDE.md §2 — this script is what keeps that intact). Re-run this
   whenever formulas[]/concepts[] names change across readings, same as any other
   generated-from-source artifact. */
import { readdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";

function normalize(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const dataDir = new URL("../src/data/", import.meta.url);
const bookDirs = readdirSync(dataDir).filter((d) => /^book\d+$/.test(d)).sort();

const byNorm = new Map();
const proseByReading = new Map(); // rn -> flattened plain-text prose, for the Phase 3 pass

function flattenProse(d) {
  const parts = [d.tagline, d.teaches, d.why, d.intuition, d.eli5, d.thinkLike, d.summary];
  (d.breakdown || []).forEach((b) => (b.points || []).forEach((p) => parts.push(typeof p === "string" ? p : p && p.point)));
  (d.formulas || []).forEach((f) => parts.push(f.plain, f.note));
  (d.concepts || []).forEach((c) => parts.push(c.def, c.intuition, c.example, c.pitfall));
  (d.misconceptions || []).forEach((m) => parts.push(m.wrong, m.right));
  (d.highYield || []).forEach((h) => parts.push(h.what, h.why));
  return parts.filter(Boolean).join(" \n ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
}

for (const bookDir of bookDirs) {
  const files = readdirSync(new URL(bookDir + "/", dataDir)).filter((f) => /^r\d+\.js$/.test(f)).sort();
  for (const file of files) {
    const mod = await import(new URL(bookDir + "/" + file, dataDir));
    const d = mod.default;
    if (!d || !d.reading) continue;
    const rn = d.reading;
    const seenThisReading = new Set();
    const consider = (rawName, kind, blurb) => {
      const n = normalize(rawName);
      if (!n || n.length < 3) return;
      if (seenThisReading.has(n)) return;
      seenThisReading.add(n);
      let entry = byNorm.get(n);
      if (!entry) {
        entry = { name: rawName, kind, blurb: blurb || "", refs: [] };
        byNorm.set(n, entry);
      }
      entry.refs.push(rn);
    };
    (d.formulas || []).forEach((f) => f && f.name && consider(f.name, "formula", f.plain || f.note));
    (d.concepts || []).forEach((c) => c && c.name && consider(c.name, "concept", c.def || c.intuition));
    proseByReading.set(rn, flattenProse(d));
  }
}

const out = [];
for (const entry of byNorm.values()) {
  if (entry.refs.length < 2) continue;
  const refs = entry.refs.sort((a, b) => a - b);
  out.push({
    slug: slugify(entry.name), name: entry.name, kind: entry.kind,
    homeReading: refs[0], refs, blurb: entry.blurb,
  });
}
out.sort((a, b) => b.refs.length - a.refs.length || a.name.localeCompare(b.name));

await writeFile(
  new URL("coreConcepts.json", dataDir),
  JSON.stringify(out.map(({ blurb, ...rest }) => rest), null, 2) + "\n",
);
console.log(out.length + " core concepts written to src/data/coreConcepts.json");

/* --- Phase 3: the inline hover-link table -----------------------------------
   Same detection, plus the authored concept pages, plus a short plain-text
   snippet for the hover card. Kept as its own generated file (not merged into
   coreConcepts.json) because it is consumed on EVERY chapter render, so it must
   stay small: names, match phrases, one snippet, no sections. */
const { authoredConcepts } = await import(new URL("authoredConcepts.js", dataDir));
const { conceptPhrases, isAbbrev } = await import(new URL("../src/lib/conceptLinks.js", import.meta.url));

function plainText(html, max = 220) {
  const s = String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\\\(|\\\)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= max) return s;
  return s.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

/* The DISPLAY name for a concept whose authored name carries a disambiguating
   tail ("Operational risk (as an outsourcing risk)", "Central counterparty (CCP)
   - roles, benefits, shortfalls"). The original `name` is kept for matching and
   for the concept page's base-layer lookup, which finds the entry by exact name;
   `display` is what the hover card and page heading show. */
function displayName(name) {
  let s = String(name).split(/\s+[—–]\s+/)[0].trim();
  s = s.replace(/\s*\(([^)]*)\)/g, (full, inner) => (isAbbrev(inner) ? full : " "));
  return s.replace(/\s+/g, " ").trim() || String(name);
}

const linkRows = [];
const claimed = new Set();
for (const a of authoredConcepts || []) {
  const slug = a.slug || slugify(a.name);
  claimed.add(slug);
  linkRows.push({
    slug, name: a.name, display: displayName(a.name), layer: a.layer || "revision",
    homeReading: a.homeReading != null ? a.homeReading : null,
    linkPhrases: a.linkPhrases || [],
    snippet: plainText(a.lead || (a.sections && a.sections[0] && a.sections[0].html)),
  });
}
for (const c of out) {
  if (claimed.has(c.slug)) continue;
  claimed.add(c.slug);
  linkRows.push({
    slug: c.slug, name: c.name, display: displayName(c.name), layer: "core",
    kind: c.kind, homeReading: c.homeReading, refs: c.refs, linkPhrases: [],
    snippet: plainText(c.blurb),
  });
}

/* Prose promotion. The exact-name detector above only fires when two readings
   independently NAME the same formula/concept, which on this corpus is five
   concepts. Most reuse is a prose name-drop instead: R26 defines the Vasicek
   WCDR in formulas[], and a dozen later readings just say "WCDR" mid-sentence.
   PROGRESS.md flags closing that gap as exactly what Phase 3 is for, so a
   concept defined ONCE also qualifies when its name turns up in the running
   prose of at least MIN_MENTIONS other readings.

   Two guards keep this from turning paragraphs into link farms: the name must
   be specific enough to be worth a page (multi-word, or a short all-caps
   abbreviation), and it must clear the mention bar in readings other than its
   own. */
const MIN_MENTIONS = 2;

/* Acronyms that mean something else somewhere in the corpus. The concept keeps
   its full-name phrase, so it still links where it is unambiguous. */
const EXCLUDE_PHRASES = {
  "credit-support-annex-csa": ["CSA"], // R47: Singapore's Cyber Security Agency
  /* "equity value" means a bank's net worth in R79's duration gap and a
     tranche's residual in R28, neither of which is equity-as-a-call-option. */
  "equity-value-black-scholes-merton": ["equity value"],
};

function isSpecificEnough(name) {
  /* A concept whose NAME is a sentence ("Why the basis opened and why it has not
     closed") is a section heading, not a term, and never appears verbatim in
     another reading's prose. Judge the name with its parenthetical qualifier
     stripped, which is the phrase that actually gets matched. */
  const bare = name.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const words = normalize(bare).split(" ").filter(Boolean);
  if (words.length >= 2 && words.length <= 5) return true;
  return /^[A-Z][A-Za-z]*[A-Z]$/.test(bare) && bare.length >= 3 && bare.length <= 6; // CVA, WCDR, LCR
}

const candidates = [];
for (const entry of byNorm.values()) {
  const slug = slugify(entry.name);
  if (claimed.has(slug)) continue;
  if (!entry.blurb) continue;
  if (!isSpecificEnough(entry.name)) continue;
  const phrases = conceptPhrases({ name: entry.name });
  const home = entry.refs[0];
  const refs = new Set(entry.refs);
  for (const [rn, prose] of proseByReading) {
    if (rn === home) continue;
    const hit = phrases.some((p) => new RegExp("(^|[^A-Za-z0-9])" + p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![A-Za-z0-9])", "i").test(prose));
    if (hit) refs.add(rn);
  }
  const mentions = refs.size - 1;
  if (mentions < MIN_MENTIONS) continue;
  candidates.push({
    slug, name: entry.name, display: displayName(entry.name), layer: "core",
    kind: entry.kind, homeReading: home, refs: [...refs].sort((a, b) => a - b),
    linkPhrases: [], snippet: plainText(entry.blurb), mentions, phrases,
  });
}

/* Two concepts can reduce to the same match phrase ("Expected loss (single
   asset)" and "Expected loss (portfolio)" both match the words "expected
   loss"). Only one of them can own that phrase, so the most-referenced wins and
   the rest are dropped: a link that lands on an arbitrary one of two pages is
   worse than no link. Phrases already owned by an authored or exact-name entry
   are off limits too. */
const ownedPhrases = new Set();
const ownedTopics = [];
for (const r of linkRows) {
  conceptPhrases(r).forEach((p) => ownedPhrases.add(normalize(p)));
  ownedTopics.push(normalize(r.display || r.name));
}
/* Near-duplicates are the other failure mode: "Wrong-way risk (introduced via
   the CDS example)" and "Wrong-way risk (WWR) in CDS" are two entries for one
   idea, and both fired in the same sentence of R35. Treat one display name
   containing another as the same topic and keep only the most-referenced. */
const sameTopic = (a, b) => a === b || a.startsWith(b + " ") || b.startsWith(a + " ");

candidates.sort((a, b) => b.mentions - a.mentions || a.name.localeCompare(b.name));
const promoted = [];
for (const c of candidates) {
  if (c.phrases.some((p) => ownedPhrases.has(normalize(p)))) continue;
  const topic = normalize(c.display);
  if (ownedTopics.some((t) => sameTopic(topic, t))) continue;
  c.phrases.forEach((p) => ownedPhrases.add(normalize(p)));
  ownedTopics.push(topic);
  promoted.push(c);
}
linkRows.push(...promoted.map(({ mentions, phrases, ...rest }) => rest));
console.log(promoted.length + " concepts promoted by prose mentions (top: " +
  promoted.slice(0, 8).map((p) => p.name + " x" + p.mentions).join(", ") + ")");
/* Drop anything with no phrases or no snippet: a hover card with nothing in it
   is worse than no link at all. */
for (const r of linkRows) {
  if (EXCLUDE_PHRASES[r.slug]) r.excludePhrases = EXCLUDE_PHRASES[r.slug];
}
const linkTable = linkRows.filter((r) => r.snippet && conceptPhrases(r).length);
const banner = `/* GENERATED by scripts/build-core-concepts.mjs. Do not edit by hand.
   The Phase 3 inline-link table (CLAUDE.md §6): every concept that can be linked
   from chapter prose, with its match phrases and hover snippet. Emitted as JS
   rather than JSON so node:test can import it without an import attribute. */
export const conceptLinkTable = `;
await writeFile(new URL("conceptLinkTable.js", dataDir), banner + JSON.stringify(linkTable, null, 2) + ";\n");
console.log(linkTable.length + " link targets written to src/data/conceptLinkTable.js");
