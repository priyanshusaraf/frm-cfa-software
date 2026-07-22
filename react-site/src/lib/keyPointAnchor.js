import { slugify } from "./html.js";

/* Resolve a "Key point" (a highYield item) to the in-page anchor where its
   concept is actually explained, so clicking the point jumps there. No new
   authored data: we match the point's text against the reading's own concept
   names first (the concept card IS the explanation surface), then fall back to
   section labels. Heuristic, defensive — returns null when nothing matches
   well, and never throws. */

const STOP = new Set([
  "the", "and", "for", "with", "that", "this", "from", "into", "when", "what",
  "how", "why", "are", "was", "not", "but", "its", "his", "her", "their", "them",
  "which", "each", "over", "under", "than", "then", "also", "such", "risk", "risks",
]);

function stripHtml(s) {
  return String(s || "").replace(/<[^>]+>/g, " ");
}
function words(s) {
  return stripHtml(s)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4 && !STOP.has(w));
}
function acronym(name) {
  const caps = String(name || "").match(/[A-Z]/g);
  return caps ? caps.join("") : "";
}

/* score how strongly a candidate name is referenced by the key-point text */
function scoreName(name, kpRaw, kpLower) {
  const nameLower = String(name || "").toLowerCase().trim();
  if (!nameLower) return 0;
  if (kpLower.includes(nameLower)) return 100 + nameLower.length; // whole name present
  let score = 0;
  const nameWords = words(nameLower);
  for (const w of nameWords) if (kpLower.includes(w)) score += 1;
  const acr = acronym(name);
  if (acr.length >= 2 && new RegExp("\\b" + acr + "\\b").test(kpRaw)) score += 4; // e.g. CPBP, CVA
  return score;
}

/* Acronyms / all-caps codes a key point leans on (CPBP, EDPM, ORM, CVA, WCDR…),
   length >=3 to skip noise like US/UK. These are the strongest "where is this
   explained" signal, and they usually live in a concept card's BODY (e.g. CPBP
   is defined inside the "seven Basel categories" card), not its title. */
function keyAcronyms(kpRaw) {
  const out = [];
  const seen = new Set();
  const m = kpRaw.match(/\b[A-Z][A-Z0-9]{2,5}\b/g) || [];
  for (const a of m) if (!seen.has(a)) { seen.add(a); out.push(a); }
  return out;
}

/* Full-concept score: name match (title) PLUS acronym matches anywhere in the
   card body, so a point jumps to the card that actually explains its term even
   when the term never appears in the card's title. */
function scoreConcept(c, kpRaw, kpLower, acrs) {
  if (!c || !c.name) return 0;
  let score = scoreName(c.name, kpRaw, kpLower);
  if (acrs.length) {
    const hay = [c.name, c.def, c.intuition, c.example, c.counter, c.pitfall, c.memory]
      .map(stripHtml).join(" ");
    for (const a of acrs) if (new RegExp("\\b" + a + "\\b").test(hay)) score += 5;
  }
  return score;
}

/* concepts: [{name,...}], sections: [{id, txt}] (from Chapter's sections list).
   Returns { id, expand } or null. expand=true means the target is a <details>
   concept card that should be opened before scrolling. */
export function keyPointAnchor(kpText, concepts, sections) {
  try {
    const raw = stripHtml(kpText);
    const lower = raw.toLowerCase();
    if (!lower.trim()) return null;

    let best = null;
    let bestScore = 1; // require at least a real signal (>1)
    const acrs = keyAcronyms(raw);

    for (const c of concepts || []) {
      const s = scoreConcept(c, raw, lower, acrs);
      if (s > bestScore) {
        bestScore = s;
        best = { id: "concept-" + slugify(c.name), expand: true };
      }
    }
    if (best) return best;

    // fall back to a section label whose title is echoed by the point
    for (const sec of sections || []) {
      const s = scoreName(sec && sec.txt, raw, lower);
      if (s > bestScore) {
        bestScore = s;
        best = { id: sec.id, expand: false };
      }
    }
    return best;
  } catch {
    return null;
  }
}
