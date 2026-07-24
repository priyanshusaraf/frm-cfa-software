// Pure composition: turn a study-path block + a readings map into everything the
// Block Review page needs (overview, active-recall atoms, through-line). No store,
// no React, no Date.now(). Callers supply all data so this stays deterministic and
// unit-testable in isolation (see blockReview.test.js).
//
// Defensive by design (house orphan-safe standard, lib/highlights.js): a reading
// number in `block.readings` that is missing from the `readings` map, or present but
// missing an atom array (`recall`/`quiz`/`misconceptions`/`highYield`) or a string
// field (`title`/`tagline`/`summary`), must never throw. Missing atoms are simply
// skipped for that reading; nothing is invented.

import { readingArc } from "./readingArc.js";

const QUIZ_TOTAL_CAP = 6;
const PREREQ_CAP = 5;

function safeArr(v) {
  return Array.isArray(v) ? v : [];
}

/* External prerequisites of a block: readings some block reading builds on (its
   deps) that are NOT themselves in the block. Same ReadingArc/deps machinery as
   9-B, so an arbitrary planner block with no authored through-line still gets a
   real, metadata-composed orientation. readingArc() returns null for reading
   numbers not in META (e.g. synthetic test data), which is skipped safely. */
function externalPrereqs(rns) {
  const inBlock = new Set(rns);
  const prereqs = new Set();
  rns.forEach((rn) => {
    const arc = readingArc(rn);
    if (!arc) return;
    arc.buildsOn.forEach((x) => {
      if (!inBlock.has(x.n)) prereqs.add(x.n);
    });
  });
  return [...prereqs].sort((a, b) => a - b);
}

function composeThroughLine(block, readings, throughlines) {
  const authored = throughlines && throughlines[block.id];
  if (authored) return { text: authored, source: "authored" };

  const rns = safeArr(block.readings);
  const firstTitle = (readings[rns[0]] && readings[rns[0]].title) || "";
  const lastTitle = (readings[rns[rns.length - 1]] && readings[rns[rns.length - 1]].title) || "";
  const n = rns.length;
  let text =
    firstTitle && lastTitle && firstTitle !== lastTitle
      ? `${block.name}: ${n} readings, from ${firstTitle} to ${lastTitle}.`
      : `${block.name}: ${n} readings.`;

  const prereqs = externalPrereqs(rns);
  if (prereqs.length) {
    const shown = prereqs.slice(0, PREREQ_CAP);
    const suffix = prereqs.length > PREREQ_CAP ? " and earlier readings" : "";
    text += ` It assumes R${shown.join(", R")}${suffix}.`;
  }
  return { text, source: "composed" };
}

export function composeBlockReview(block, readings, throughlines) {
  const rns = safeArr(block && block.readings);
  const map = readings || {};

  const overview = [];
  const recallCards = [];
  const quizItems = [];
  const trapChecks = [];

  rns.forEach((rn) => {
    const r = map[rn];
    if (!r) return; // reading missing from the map: skip this atom entirely, never throw

    const topHighYield = safeArr(r.highYield)
      .filter((h) => h && h.stars >= 4)
      .slice(0, 2)
      .map((h) => ({ stars: h.stars, what: h.what }));

    overview.push({
      rn,
      title: r.title,
      tagline: r.tagline,
      summary: r.summary,
      topHighYield,
    });

    safeArr(r.recall).forEach((c, i) => {
      if (!c) return;
      recallCards.push({ id: rn + ":" + i, rn, q: c.q, a: c.a });
    });

    if (quizItems.length < QUIZ_TOTAL_CAP) {
      const firstQuiz = safeArr(r.quiz)[0];
      if (firstQuiz) {
        quizItems.push({
          rn,
          q: firstQuiz.q,
          options: firstQuiz.options,
          answer: firstQuiz.answer,
          why: firstQuiz.why,
        });
      }
    }

    const firstMisconception = safeArr(r.misconceptions)[0];
    if (firstMisconception) {
      trapChecks.push({ rn, wrong: firstMisconception.wrong, right: firstMisconception.right });
    }
  });

  return {
    id: block.id,
    name: block.name,
    throughLine: composeThroughLine(block, map, throughlines),
    overview,
    recallCards,
    quizItems,
    trapChecks,
  };
}
