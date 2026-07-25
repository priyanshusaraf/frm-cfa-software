#!/usr/bin/env node
/* Regenerates PROJECT-STATUS.html at the repo root.
 *
 *   npm run dashboard
 *
 * Everything countable is DERIVED from the repo (the run ledger, git log, the
 * source tree), so the numbers cannot drift from reality the way a hand-written
 * status page does. The one hand-maintained part is ROADMAP below: goals and
 * "what is left" are judgement calls no script can infer. When a roadmap item
 * lands, flip its status here in the same commit.
 *
 * Run this at the END of a session, after committing, so the "recent work"
 * section includes that session's commits.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(SITE, "..");
const OUT = join(ROOT, "PROJECT-STATUS.html");

/* ------------------------------------------------------------------ *
 * HAND-MAINTAINED: the goals and the backlog. Keep in sync with
 * react-site/CLAUDE.md sections 6-9, which stay the authoritative prose.
 * status: done | active | next | later
 * ------------------------------------------------------------------ */
const ROADMAP = [
  { status: "active", area: "Content", title: "Content-quality pass over all 101 readings",
    detail: "Em-dash purge, tone humanization, why-depth, and formula/number correctness, in one pass per file. CLAUDE.md section 8. This is the top priority above any new feature: content is what makes the product worth paying for.", ref: "CLAUDE.md §8" },
  { status: "active", area: "UI", title: "UI sweep over built surfaces",
    detail: "Polish and bug pass across planner, block review, case study, consistency. The current active phase in the run ledger.", ref: "ledger: ui-sweep" },
  { status: "next", area: "Content", title: "Securitization / structured-finance family",
    detail: "Covered bonds to pass-through MBS to CMO to CDO/CLO, built to the problem-first doctrine, with the CMO-vs-CDO tranching distinction as the centrepiece. Needs both a Revision page and a Core-Concept page.", ref: "CLAUDE.md §8.5" },
  { status: "next", area: "Learning", title: "Learning-coherence build",
    detail: "Planner as the study spine (hybrid dependency sequencing), narrative orientation breadcrumbs, list exposition, and visual builders (balance-sheet stepper, correlation matrix widget).", ref: "CLAUDE.md §9" },
  { status: "later", area: "Content", title: "Revision pages v2",
    detail: "Dedicated re-teaching pages for assumed Part I prerequisites, rather than the current one-line refresher banner.", ref: "CLAUDE.md §7.1" },
  { status: "later", area: "Business", title: "Paid-access device licensing",
    detail: "Account plus device binding, one computer and one phone slot, 4-hour windows for new devices, one primary reassignment per week. Needs a backend this repo does not have yet.", ref: "CLAUDE.md §7.3" },
  { status: "later", area: "Mobile", title: "Phone-first card-deck slate",
    detail: "Flashcard engine, trap-check game, story mode, streaks, two-minute sprint. Deliberately deferred by the owner until content retention is solved.", ref: "CLAUDE.md §8.6" },
  { status: "done", area: "Comfort", title: "Study nudges, mascot and Pomodoro", detail: "Rotating encouragement toasts with an animated brain mascot, customisable interval, and a Pomodoro timer with a persistent corner countdown.", ref: "CLAUDE.md §7.7" },
  { status: "done", area: "Reading", title: "PDF viewer: stable zoom, fullscreen peek nav", detail: "Page-anchored zoom and resize, a nav that parks off-screen and peeks, and split/dock controls in the navbar.", ref: "CLAUDE.md §7.6" },
  { status: "done", area: "Learning", title: "Core-concept hover linking (phase 3)", detail: "54 linkable concepts auto-detected; 68 of 101 readings carry at least one hover-linked concept. No reading was hand-edited.", ref: "CLAUDE.md §6" },
  { status: "done", area: "Reading", title: "Reading focus and source anchoring", detail: "Scroll anchoring across every reflow, the PDF anchor ladder, fullscreen mode, and 'Read in source' from a text selection.", ref: "CLAUDE.md §7.5" },
  { status: "done", area: "Reading", title: "Split-view source material", detail: "Free-form resizable source and condensed PDF panes beside the reading, with per-pane zoom and a left/right dock toggle.", ref: "CLAUDE.md §7.4" },
];

const sh = (cmd, fallback = "") => {
  try { return execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim(); } catch { return fallback; }
};
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------------- derived: the run ledger ---------------- */
function ledger() {
  const p = join(SITE, "docs/superpowers/content-run-ledger.md");
  if (!existsSync(p)) return null;
  const txt = readFileSync(p, "utf8");
  const phase = (txt.match(/## ACTIVE PHASE\s*\n+\s*([a-z0-9-]+)/i) || [])[1] || "unknown";
  const rows = [];
  for (const line of txt.split("\n")) {
    // | rn | bk | title | p3 | content | wave | opusA | notes |
    const m = /^\|\s*(\d+)\s*\|\s*(\d+)\s*\|([^|]*)\|([^|]*)\|([^|]*)\|([^|]*)\|/.exec(line);
    if (!m) continue;
    rows.push({
      rn: +m[1], bk: +m[2], title: m[3].trim(),
      p3: m[4].trim(), content: m[5].trim(), wave: m[6].trim(),
    });
  }
  const count = (key, val) => rows.filter((r) => r[key] === val).length;
  return {
    phase, rows,
    p3Done: count("p3", "done"),
    contentDone: count("content", "done"),
    contentWip: count("content", "wip"),
    contentBlocked: count("content", "blocked"),
  };
}

/* ---------------- derived: source-tree metrics ---------------- */
function countFiles(dir, re) {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((f) => re.test(f)).length;
}

function dashesIn(dir) {
  const out = sh(`grep -roh '[—–]' '${dir}' 2>/dev/null | wc -l`, "0");
  return parseInt(out, 10) || 0;
}

function books() {
  const base = join(SITE, "src/data");
  if (!existsSync(base)) return [];
  return readdirSync(base)
    .filter((d) => /^book\d+$/.test(d))
    .sort()
    .map((d) => ({
      name: "Book " + d.replace("book", ""),
      readings: countFiles(join(base, d), /^r\d+\.js$/),
      dashes: dashesIn(join(base, d)),
    }));
}

function testCount() {
  const out = sh(`cd '${SITE}' && npm test 2>/dev/null | grep -E '^# (pass|fail)'`, "");
  const pass = (out.match(/# pass (\d+)/) || [])[1];
  const fail = (out.match(/# fail (\d+)/) || [])[1];
  return pass == null ? null : { pass: +pass, fail: +fail || 0 };
}

/* ---------------- derived: git ---------------- */
const TYPE_LABEL = {
  feat: "Feature", fix: "Fix", style: "Style", docs: "Docs",
  refactor: "Refactor", test: "Tests", chore: "Chore", perf: "Performance",
};

function commits(n = 12) {
  const raw = sh(`git log -${n} --pretty=format:'%h%x1f%ad%x1f%s%x1e' --date=short`, "");
  return raw.split("\x1e").map((c) => c.trim()).filter(Boolean).map((c) => {
    const [hash, date, subject] = c.split("\x1f");
    const m = /^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/.exec(subject || "");
    return {
      hash, date,
      type: m ? (TYPE_LABEL[m[1]] || m[1]) : "Change",
      scope: m ? m[2] || "" : "",
      subject: m ? m[3] : subject,
    };
  });
}

/* ---------------- render ---------------- */
function bar(pct, tone) {
  return `<div class="bar"><span class="bar-fill ${tone}" style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>`;
}

function build() {
  const L = ledger();
  const B = books();
  const T = testCount();
  const C = commits();
  const totalReadings = B.reduce((a, b) => a + b.readings, 0);
  const totalDashes = B.reduce((a, b) => a + b.dashes, 0);
  const totalCommits = parseInt(sh("git rev-list --count HEAD", "0"), 10) || 0;
  const branch = sh("git rev-parse --abbrev-ref HEAD", "main");
  const lastCommitDate = sh("git log -1 --pretty=format:%ad --date=format:'%d %b %Y'", "");
  const generated = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

  const metrics = [
    { n: totalReadings, l: "readings" },
    { n: countFiles(join(SITE, "src/pages"), /\.jsx$/), l: "pages" },
    { n: countFiles(join(SITE, "src/components"), /\.jsx$/), l: "components" },
    { n: countFiles(join(SITE, "src/lib"), /^(?!.*\.test\.).*\.js$/), l: "lib modules" },
    { n: sh(`grep -rho 'register("[a-z0-9-]*"' '${join(SITE, "src/widgets")}' 2>/dev/null | sort -u | wc -l`).trim(), l: "widgets" },
    { n: T ? T.pass : "?", l: "tests passing", tone: T && T.fail ? "red" : "green" },
    { n: totalCommits, l: "commits" },
    { n: countFiles(join(SITE, "docs/superpowers/specs"), /\.md$/), l: "design specs" },
  ];

  const groups = [
    ["active", "In flight"],
    ["next", "Up next"],
    ["later", "Later"],
    ["done", "Shipped"],
  ];

  const html = `<title>FRM Part II: project status</title>
<style>
  :root {
    --bg:#0e1014; --raised:#161920; --inset:#101319; --line:#252a34; --line2:#333a47;
    --text:#e6e9ef; --dim:#a4acbb; --faint:#6f7889;
    --accent:#7aa2ff; --green:#5fc98b; --amber:#e8b45a; --red:#ef7b7b; --purple:#b18cff; --cyan:#5fd4d0;
    --radius:12px;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg:#f7f8fa; --raised:#fff; --inset:#f0f2f6; --line:#e2e5ec; --line2:#cdd3de;
      --text:#1a1d24; --dim:#535c6c; --faint:#828b9c;
      --accent:#3a6ee0; --green:#1f9459; --amber:#b07c1e; --red:#cc4949; --purple:#7a4fd6; --cyan:#148a86;
    }
  }
  :root[data-theme="dark"] {
    --bg:#0e1014; --raised:#161920; --inset:#101319; --line:#252a34; --line2:#333a47;
    --text:#e6e9ef; --dim:#a4acbb; --faint:#6f7889;
    --accent:#7aa2ff; --green:#5fc98b; --amber:#e8b45a; --red:#ef7b7b; --purple:#b18cff; --cyan:#5fd4d0;
  }
  :root[data-theme="light"] {
    --bg:#f7f8fa; --raised:#fff; --inset:#f0f2f6; --line:#e2e5ec; --line2:#cdd3de;
    --text:#1a1d24; --dim:#535c6c; --faint:#828b9c;
    --accent:#3a6ee0; --green:#1f9459; --amber:#b07c1e; --red:#cc4949; --purple:#7a4fd6; --cyan:#148a86;
  }
  * { box-sizing:border-box; }
  body {
    margin:0; background:var(--bg); color:var(--text); line-height:1.55;
    font-variant-numeric:tabular-nums;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif;
    font-size:15px; padding:0 1.2rem 5rem;
  }
  .wrap { max-width:980px; margin:0 auto; }
  header { padding:3rem 0 1.6rem; border-bottom:1px solid var(--line); margin-bottom:2rem; }
  .eyebrow { font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); font-weight:700; }
  h1 { font-size:2rem; margin:.35rem 0 .5rem; letter-spacing:-.02em; }
  .sub { color:var(--dim); font-size:.92rem; margin:0; }
  .meta { margin-top:1rem; display:flex; gap:.5rem; flex-wrap:wrap; font-size:.74rem; }
  .tag { border:1px solid var(--line2); color:var(--dim); border-radius:99px; padding:.16rem .6rem; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  h2 { font-size:.74rem; letter-spacing:.13em; text-transform:uppercase; color:var(--faint); font-weight:700;
       margin:2.8rem 0 .9rem; display:flex; align-items:center; gap:.5rem; }
  h2::before { content:""; width:6px; height:6px; border-radius:50%; background:var(--accent); }
  .card { background:var(--raised); border:1px solid var(--line); border-radius:var(--radius); padding:1.15rem 1.3rem; }
  .card + .card { margin-top:.7rem; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(115px,1fr)); gap:.7rem; }
  .metric { background:var(--raised); border:1px solid var(--line); border-radius:var(--radius); padding:.85rem .95rem; }
  .metric .n { font-size:1.55rem; font-weight:750; letter-spacing:-.03em; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  .metric .l { font-size:.7rem; text-transform:uppercase; letter-spacing:.07em; color:var(--faint); margin-top:.1rem; }
  .n.green { color:var(--green); } .n.red { color:var(--red); }
  .bar { height:6px; background:var(--inset); border-radius:99px; overflow:hidden; margin:.45rem 0 .2rem; }
  .bar-fill { display:block; height:100%; border-radius:99px; background:var(--accent); }
  .bar-fill.green { background:var(--green); } .bar-fill.amber { background:var(--amber); }
  .bar-fill.purple { background:var(--purple); }
  .prow { display:flex; justify-content:space-between; align-items:baseline; gap:1rem; font-size:.86rem; }
  .prow + .prow { margin-top:1rem; }
  .prow .v { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.8rem; color:var(--dim); white-space:nowrap; }
  .note { font-size:.8rem; color:var(--faint); margin:.35rem 0 0; }
  ul.plain { list-style:none; padding:0; margin:0; }
  .item { display:flex; gap:.8rem; padding:.8rem 0; border-top:1px solid var(--line); }
  .item:first-child { border-top:0; padding-top:.2rem; }
  .item .body { min-width:0; flex:1; }
  .item .t { font-weight:620; font-size:.93rem; }
  .item .d { color:var(--dim); font-size:.85rem; margin-top:.15rem; }
  .item .r { color:var(--faint); font-size:.74rem; margin-top:.3rem; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  .pill { flex:none; align-self:flex-start; font-size:.68rem; text-transform:uppercase; letter-spacing:.06em;
          font-weight:700; border-radius:99px; padding:.16rem .55rem; border:1px solid; white-space:nowrap; }
  .pill.active { color:var(--amber); border-color:var(--amber); }
  .pill.next   { color:var(--accent); border-color:var(--accent); }
  .pill.later  { color:var(--faint); border-color:var(--line2); }
  .pill.done   { color:var(--green); border-color:var(--green); }
  .pill.area   { color:var(--purple); border-color:var(--purple); }
  .commit { display:flex; gap:.75rem; align-items:baseline; padding:.5rem 0; border-top:1px solid var(--line); font-size:.87rem; }
  .commit:first-child { border-top:0; }
  .commit .h { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.76rem; color:var(--faint); flex:none; width:4.6rem; }
  .commit .ty { flex:none; font-size:.68rem; text-transform:uppercase; letter-spacing:.05em; font-weight:700;
                color:var(--cyan); width:5.2rem; }
  .commit .s { flex:1; min-width:0; }
  .commit .dt { flex:none; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.72rem; color:var(--faint); }
  .callout { border-left:3px solid var(--amber); background:var(--raised); border-radius:0 var(--radius) var(--radius) 0;
             padding:1rem 1.2rem; }
  .callout .t { font-weight:700; font-size:.9rem; margin-bottom:.25rem; }
  .callout p { margin:0; color:var(--dim); font-size:.87rem; }
  footer { margin-top:3.5rem; padding-top:1.2rem; border-top:1px solid var(--line); color:var(--faint); font-size:.78rem; }
  code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.85em; background:var(--inset);
         padding:.1em .35em; border-radius:4px; }
  @media (max-width:620px) {
    .commit { flex-wrap:wrap; gap:.4rem .7rem; }
    .commit .s { flex-basis:100%; }
    h1 { font-size:1.6rem; }
  }
</style>

<div class="wrap">
<header>
  <div class="eyebrow">Project status</div>
  <h1>FRM Part II: interactive learning site</h1>
  <p class="sub">An interactive study product for the FRM Part II exam: ${totalReadings} readings across ${B.length} books,
  built as a local-first React app. This page is generated from the repo, so every number below is real.</p>
  <div class="meta">
    <span class="tag">branch ${esc(branch)}</span>
    <span class="tag">${totalCommits} commits</span>
    <span class="tag">last commit ${esc(lastCommitDate)}</span>
    <span class="tag">generated ${esc(generated)}</span>
  </div>
</header>

<h2>Where we are right now</h2>
<div class="callout">
  <div class="t">Active phase: ${esc(L ? L.phase : "unknown")}</div>
  <p>${L ? `Hover-linking is complete across all ${L.p3Done} readings. The current phase is the UI and
  functionality sweep; the big content-quality run over all ${totalReadings} readings comes after it, by
  owner directive. Position lives in <code>content-run-ledger.md</code>, procedure in
  <code>content-run-protocol.md</code>. Saying "continue" resumes that run.`
  : "No run ledger found."}</p>
</div>

<h2>By the numbers</h2>
<div class="grid">
${metrics.map((m) => `  <div class="metric"><div class="n ${m.tone || ""}">${esc(m.n)}</div><div class="l">${esc(m.l)}</div></div>`).join("\n")}
</div>

<h2>Progress</h2>
<div class="card">
${L ? `  <div class="prow"><span>Concept hover-linking reviewed</span><span class="v">${L.p3Done} / ${L.rows.length}</span></div>
  ${bar((L.p3Done / Math.max(1, L.rows.length)) * 100, "green")}
  <div class="prow"><span>Content-quality clearance</span><span class="v">${L.contentDone} / ${L.rows.length}${L.contentWip ? " (" + L.contentWip + " in flight)" : ""}</span></div>
  ${bar((L.contentDone / Math.max(1, L.rows.length)) * 100, "amber")}` : ""}
  <div class="prow"><span>Em-dash purge (the "reads as AI" tell)</span><span class="v">${totalDashes.toLocaleString()} left</span></div>
  ${bar(0, "amber")}
  <p class="note">The dash purge and the content clearance are the same per-file pass: one visit per reading
  handles dashes, tone, why-depth and formula correctness together. A blind find-and-replace is forbidden,
  every dash needs a context-appropriate rewrite.</p>
</div>

<h2>Content by book</h2>
<div class="card">
${B.map((b) => `  <div class="prow"><span>${esc(b.name)}</span><span class="v">${b.readings} readings &nbsp;·&nbsp; ${b.dashes.toLocaleString()} dashes</span></div>
  ${bar(totalDashes ? (b.dashes / totalDashes) * 100 : 0, "purple")}`).join("\n")}
  <p class="note">Bars show each book's share of the remaining dash debt, i.e. roughly how much rewriting each one still owes.</p>
</div>

<h2>What landed recently</h2>
<div class="card">
${C.map((c) => `  <div class="commit"><span class="h">${esc(c.hash)}</span><span class="ty">${esc(c.type)}</span><span class="s">${esc(c.subject)}</span><span class="dt">${esc(c.date)}</span></div>`).join("\n")}
</div>

${groups.map(([key, label]) => {
  const items = ROADMAP.filter((r) => r.status === key);
  if (!items.length) return "";
  return `<h2>${label}</h2>
<div class="card">
  <ul class="plain">
${items.map((r) => `    <li class="item">
      <span class="pill ${r.status}">${esc(r.status === "active" ? "in flight" : r.status)}</span>
      <div class="body">
        <div class="t">${esc(r.title)}</div>
        <div class="d">${esc(r.detail)}</div>
        <div class="r">${esc(r.area)} &nbsp;·&nbsp; ${esc(r.ref)}</div>
      </div>
    </li>`).join("\n")}
  </ul>
</div>`;
}).join("\n\n")}

<h2>How to work on this</h2>
<div class="card">
  <p class="sub" style="margin:0 0 .6rem">Read in this order. Each file exists so the next session does not
  re-derive what has already been decided.</p>
  <ul class="plain">
    <li class="item"><div class="body"><div class="t">PROGRESS.md</div><div class="d">The single resume point: where development stands and what is next.</div></div></li>
    <li class="item"><div class="body"><div class="t">react-site/CLAUDE.md</div><div class="d">The binding guide: teaching doctrine, content schema, code conventions, UI rules, verification.</div></div></li>
    <li class="item"><div class="body"><div class="t">docs/superpowers/content-run-ledger.md</div><div class="d">Per-reading position of the active run. Saying "continue" resumes from here.</div></div></li>
    <li class="item"><div class="body"><div class="t">docs/superpowers/content-guidelines.md</div><div class="d">Durable style playbook plus the per-reading review ledger. Read before editing any content.</div></div></li>
  </ul>
</div>

<footer>
  Generated by <code>npm run dashboard</code> (<code>react-site/scripts/build-dashboard.mjs</code>).
  Counts come from the repo; the goals and backlog are hand-maintained in that script's ROADMAP block.
  Re-run it at the end of a session, after committing.
</footer>
</div>
`;

  writeFileSync(OUT, html);
  console.log("wrote " + OUT);
  console.log(`  ${totalReadings} readings, ${totalCommits} commits, ${totalDashes} dashes left` +
    (T ? `, ${T.pass} tests passing${T.fail ? ", " + T.fail + " FAILING" : ""}` : ""));
}

build();
