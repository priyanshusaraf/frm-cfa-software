// Pure keyword-overlap "related material" finder for a highlighted passage.
// No React, no DOM — safe to import from lib or components.

import { slugify } from "./html.js";

const STOPWORDS = new Set([
  "the", "and", "that", "this", "with", "from", "have", "has", "had",
  "for", "are", "was", "were", "will", "would", "could", "should",
  "which", "when", "where", "what", "while", "than", "then", "them",
  "their", "there", "these", "those", "into", "onto", "over", "under",
  "about", "after", "before", "because", "being", "been", "does",
  "each", "some", "such", "only", "also", "more", "most", "very",
  "your", "you", "his", "her", "its", "our", "who", "whom", "not",
  "but", "can", "may", "might", "must", "shall", "just", "like",
  "used", "using", "use", "into", "upon", "same", "other", "both",
  "any", "all", "own", "how", "why",
]);

/** Strip HTML tags to plain text. */
function stripHtml(html) {
  return String(html || "").replace(/<[^>]*>/g, " ");
}

/**
 * Tokenize a string into lowercase word tokens, length >= 4, with a small
 * stopword list removed. Deterministic, no external deps.
 */
export function tokenize(text) {
  const raw = String(text || "")
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .match(/[a-z0-9]+/g);
  if (!raw) return [];
  return raw.filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}

function excerpt(text, max = 140) {
  const s = String(text || "").trim();
  if (s.length <= max) return s;
  return s.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/** Overlap score between the highlighted text's tokens and a candidate string. */
function score(sourceTokenSet, candidateText) {
  const candTokens = tokenize(candidateText);
  if (!candTokens.length) return 0;
  const candSet = new Set(candTokens);
  let overlap = 0;
  for (const t of candSet) {
    if (sourceTokenSet.has(t)) overlap++;
  }
  if (!overlap) return 0;
  // Normalize by candidate length so short, tightly-matching candidates
  // (e.g. a concept name) aren't drowned out by long ones.
  return overlap / Math.sqrt(candSet.size);
}

// Minimum normalized score for a candidate to be considered "related" —
// tuned so a couple of shared generic words on an otherwise unrelated
// candidate doesn't qualify.
const THRESHOLD = 0.35;

/**
 * Find quiz questions, concepts, eli5 sentences and formulas in `readingData`
 * that relate to a highlighted `text` passage, via stopword-stripped
 * keyword-overlap scoring.
 *
 * @param {object} readingData - a reading's registered data object.
 * @param {string} text - the highlighted passage.
 * @param {number} max - max number of results to return.
 * @returns {Array<{type:string,label:string,snippet?:string,sectionId:string,_score:number}>}
 */
export function findRelated(readingData, text, max = 4) {
  const d = readingData || {};
  const sourceTokens = tokenize(text);
  if (!sourceTokens.length) return [];
  const sourceSet = new Set(sourceTokens);

  const candidates = [];

  // (a) quiz questions: q + why
  if (Array.isArray(d.quiz)) {
    const sectionId = slugify("Test yourself");
    for (const item of d.quiz) {
      if (!item || !item.q) continue;
      const combined = `${item.q} ${item.why || ""}`;
      const sc = score(sourceSet, combined);
      if (sc >= THRESHOLD) {
        candidates.push({
          type: "quiz",
          label: "Quiz: " + excerpt(item.q, 60),
          snippet: excerpt(item.why || item.q, 140),
          sectionId,
          _score: sc,
        });
      }
    }
  }

  // (b) concepts: name + def
  if (Array.isArray(d.concepts)) {
    const sectionId = slugify("Concept hierarchy — click to expand");
    for (const c of d.concepts) {
      if (!c || !c.name) continue;
      const combined = `${c.name} ${c.def || ""}`;
      const sc = score(sourceSet, combined);
      if (sc >= THRESHOLD) {
        candidates.push({
          type: "concept",
          label: c.name,
          snippet: excerpt(c.def || "", 140),
          sectionId,
          _score: sc,
        });
      }
    }
  }

  // (c) eli5: strip HTML tags, match by sentence
  if (d.eli5) {
    const sectionId = slugify("Explain it simply");
    const plain = stripHtml(d.eli5);
    const sentences = plain
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    let best = null;
    for (const sentence of sentences) {
      const sc = score(sourceSet, sentence);
      if (sc >= THRESHOLD && (!best || sc > best._score)) {
        best = {
          type: "eli5",
          label: "Explain it simply",
          snippet: excerpt(sentence, 140),
          sectionId,
          _score: sc,
        };
      }
    }
    if (best) candidates.push(best);
  }

  // (d) formulas: name + plain
  if (Array.isArray(d.formulas)) {
    const sectionId = slugify("Formula box");
    for (const f of d.formulas) {
      if (!f || !f.name) continue;
      const combined = `${f.name} ${f.plain || ""}`;
      const sc = score(sourceSet, combined);
      if (sc >= THRESHOLD) {
        candidates.push({
          type: "formula",
          label: f.name,
          sectionId,
          _score: sc,
        });
      }
    }
  }

  candidates.sort((a, b) => b._score - a._score);
  return candidates.slice(0, max).map(({ _score, ...rest }) => rest);
}
