#!/usr/bin/env node
// Words-per-sentence density for a prose content field, across the whole corpus.
//
// Why this imports the modules instead of regex-slicing the source: the earlier
// hand-rolled measurements sliced from `eli5:` to an ASSUMED next key, which
// over-reads on any file where another key sits in between (r58 measured 51 when
// it was 13). Importing the default export removes that failure mode entirely.
//
//   node scripts/prose-density.mjs thinkLike            # whole corpus, worst first
//   node scripts/prose-density.mjs intuition 45         # only those above 45
//   node scripts/prose-density.mjs thinkLike 0 65 33    # specific readings
import { readdirSync } from "node:fs";

var field = process.argv[2] || "thinkLike";
var floor = Number(process.argv[3] || 0);
var only = process.argv.slice(4).map(Number);

function text(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function density(html) {
  var t = text(html);
  if (!t) return null;
  // A sentence ends at . ! ? followed by whitespace or end of string. Decimals
  // (0.5) and abbreviations with no following space do not split.
  var sentences = t.split(/(?<=[.!?])\s+/).filter(function (s) {
    return /\w/.test(s);
  });
  var words = t.split(/\s+/).filter(Boolean).length;
  if (!sentences.length) return null;
  return { wps: words / sentences.length, words: words, sentences: sentences.length };
}

var rows = [];
for (var bk of readdirSync("src/data").filter((d) => /^book\d$/.test(d))) {
  for (var f of readdirSync("src/data/" + bk).filter((x) => /^r\d+\.js$/.test(x))) {
    var rn = Number(f.match(/\d+/)[0]);
    if (only.length && !only.includes(rn)) continue;
    var mod = await import("../src/data/" + bk + "/" + f);
    var d = density(mod.default[field]);
    if (!d) continue;
    rows.push({ rn: rn, bk: bk, wps: d.wps, words: d.words, sentences: d.sentences });
  }
}

rows.sort(function (a, b) {
  return b.wps - a.wps;
});
var shown = rows.filter(function (r) {
  return r.wps >= floor;
});
for (var r of shown) {
  console.log(
    "r" + String(r.rn).padStart(3) + "  " + r.wps.toFixed(1).padStart(6) + " w/s   " +
      String(r.words).padStart(4) + "w  " + String(r.sentences).padStart(3) + "s"
  );
}
var avg = rows.reduce(function (s, r) { return s + r.wps; }, 0) / (rows.length || 1);
console.log("--");
console.log(field + ": " + rows.length + " readings, corpus avg " + avg.toFixed(1) +
  " w/s, " + shown.length + " at or above " + floor);
