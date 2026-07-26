import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { readingMeta, bookOf, rpath, bpath, META } from "../lib/meta.js";
import { useReading } from "../lib/readings.js";
import { renderMath, isTex, fitMath } from "../lib/tex.js";
import { stars, slugify } from "../lib/html.js";
import { initWidgets } from "../widgets/index.js";
import Html from "../components/Html.jsx";
import SectionLabel from "../components/chapter/SectionLabel.jsx";
import NavSplitControls from "../components/NavSplitControls.jsx";
import ConceptCard from "../components/chapter/ConceptCard.jsx";
import ConnList from "../components/chapter/ConnList.jsx";
import ChapterTOC from "../components/chapter/ChapterTOC.jsx";
import Quiz from "../components/chapter/Quiz.jsx";
import MiniMap from "../components/chapter/MiniMap.jsx";
import Highlighter from "../components/chapter/Highlighter.jsx";
import ConceptHover from "../components/chapter/ConceptHover.jsx";
import { linkifyRoot } from "../lib/conceptLinks.js";
import { conceptLinkTable } from "../data/conceptLinkTable.js";
import ListBuilder from "../components/chapter/ListBuilder.jsx";
import MatchPairs from "../components/chapter/MatchPairs.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion.jsx";
import Button from "../components/ui/button.jsx";
import Badge from "../components/ui/badge.jsx";
import { useStore, toggleDone, touchVisited, touchActivity, setPageWidth, setSplitPane, setSplitQuery, setActiveReading, getState } from "../lib/store.js";
import { buildBlocks, nextInPlan } from "../lib/studyPath.js";
import { blockEligibility, blockForReading } from "../lib/blockEligibility.js";
import coreConceptsTable from "../data/coreConcepts.json";
import KeyPoints from "../components/chapter/KeyPoints.jsx";
import ReadingArc from "../components/chapter/ReadingArc.jsx";
import CaseStudyHook from "../components/chapter/CaseStudyHook.jsx";
import SummaryOutline from "../components/chapter/SummaryOutline.jsx";
import { keyPointAnchor } from "../lib/keyPointAnchor.js";
import Resizable from "../components/chapter/Resizable.jsx";
import SplitView from "../components/chapter/SplitView.jsx";
import { useEdgeResize } from "../lib/useEdgeResize.js";
import { useScrollAnchor } from "../lib/scrollAnchor.js";

/* flat reading order across all books, for prev/next nav */
const FLAT = META.books.flatMap((b) => b.readings.map((r) => r.n));
const EMPTY_QUERIES = []; // stable identity, so an empty ladder never re-triggers a search

export default function Chapter() {
  const { rn: rnParam } = useParams();
  const rn = parseInt(rnParam, 10);
  const rootRef = useRef(null);
  const resumeRef = useRef({ y: 0, scrollTo: null });
  const [openRecall, setOpenRecall] = useState({});
  const isDone = useStore((s) => !!s.done[rn]);
  const doneMap = useStore((s) => s.done); // raw slice (stable identity) — see CLAUDE.md #185 note
  /* Block Review pilot (ADDITIVE, not a nav change): is `rn` the LAST reading of
     its study-path block, and is every reading in that block done? buildBlocks()
     is pure/cheap so recomputing it here is fine; blockForReading()/blockEligibility()
     are pure too. This never touches prevRn/nextRn or the [/] handler below. */
  const completedBlock = useMemo(() => {
    if (!rn) return null;
    const blocks = buildBlocks();
    const block = blockForReading(blocks, rn);
    if (!block) return null;
    const { allDone, lastReading } = blockEligibility([block], doneMap)[0];
    return allDone && lastReading === rn ? block : null;
  }, [rn, doneMap]);

  /* "Next in your plan": the next not-done reading in PLAN (study) order. Purely
     additive, only shown when it differs from the curriculum-order Next so it
     never duplicates or hijacks the prev/next nav or the [/] shortcuts. */
  const planNextRn = useMemo(() => (rn ? nextInPlan(rn, doneMap) : null), [rn, doneMap]);
  const quizScore = useStore((s) => s.quiz[rn]);
  const pageWidth = useStore((s) => (s.layout && s.layout.pageWidth) || null);
  /* raw booleans (not an object) so the selector returns a stable primitive each
     render, per the useSyncExternalStore #185 rule in CLAUDE.md */
  const splitSource = useStore((s) => !!(s.layout && s.layout.split && s.layout.split.panes && s.layout.split.panes.source));
  const splitCondensed = useStore((s) => !!(s.layout && s.layout.split && s.layout.split.panes && s.layout.split.panes.condensed));
  const splitOpen = splitSource || splitCondensed;
  /* raw slice — .q is an OBJECT, so a `|| {}` default inside the selector would
     hand useSyncExternalStore a fresh identity every call (React #185) */
  const splitQ = useStore((s) => s.layout && s.layout.split && s.layout.split.q);
  const splitQRn = splitQ ? splitQ.rn : null;
  const splitQText = splitQ ? splitQ.text : "";
  const { width: dragWidth, onPointerDown: onResizeDown, onDoubleClick: onResizeReset } = useEdgeResize({
    targetRef: rootRef, min: 720, factor: 2,
    onCommit: (px) => setPageWidth(px),
    onReset: () => setPageWidth(null),
  });
  const appliedWidth = dragWidth ?? pageWidth;

  /* keeps the paragraph under the nav bar pinned across every reflow: window
     resize, reading-column drag, split-pane drag, font-scale change */
  const resetScrollAnchor = useScrollAnchor(rootRef);

  const meta = rn ? readingMeta(rn) : null;
  const book = rn ? bookOf(rn) : null;
  const d = useReading(meta ? rn : 0);
  const location = useLocation();

  useEffect(() => {
    if (meta) document.title = "R" + rn + " — " + meta.t;
  }, [rn, meta]);

  useEffect(() => {
    /* capture resume intent BEFORE touchVisited(rn) resets y for a freshly-opened reading */
    const st = getState().lastVisited || {};
    resumeRef.current = {
      y: (location.state && location.state.resume && st.rn === rn) ? (st.y || 0) : 0,
      scrollTo: (location.state && location.state.scrollTo) || null,
    };
    setOpenRecall({});
    /* an ad-hoc "Read in source" anchor belongs to the reading it was selected
       in; drop it the moment we move to another one */
    setSplitQuery(null);
    if (rn) touchVisited(rn);
    if (rn) touchActivity(); // one study-activity tick per chapter open (for /consistency)
    if (rn && !getState().done[rn]) setActiveReading(rn);
  }, [rn]);

  /* [ / ] keyboard nav between readings (skipped while typing) */
  const navigate = useNavigate();
  useEffect(() => {
    function onKey(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const i = FLAT.indexOf(rn);
      if (e.key === "[" && i > 0) navigate(rpath(FLAT[i - 1]));
      else if (e.key === "]" && i >= 0 && i < FLAT.length - 1) navigate(rpath(FLAT[i + 1]));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rn, navigate]);

  /* Foundational-prerequisite reminder (CLAUDE.md §7.1): connections.from already
     declares which earlier reading each reading assumes and why; surface the ones
     the student hasn't marked done yet as a just-in-time nudge instead of a new
     authored field. Also reviewable later via /review's "Foundational
     prerequisites" card source (Review.jsx). */
  const unstudiedPrereqs = useMemo(() => {
    if (!d || !d.connections || !d.connections.from) return [];
    return d.connections.from.filter((c) => c.r && !doneMap[c.r]);
  }, [d, doneMap]);

  /* Cross-reading core concepts this reading's own formulas/concepts qualify for
     (CLAUDE.md §6, Phase 1) — coreConcepts.json is generated by
     scripts/build-core-concepts.mjs, not computed at runtime, so this stays free
     (no useAllReadings() fan-out) on the highest-traffic page in the app. */
  const readingCoreConcepts = useMemo(() => {
    if (!d) return [];
    const names = new Set([...(d.formulas || []).map((f) => f.name), ...(d.concepts || []).map((c) => c.name)]);
    const auto = coreConceptsTable.filter((c) => names.has(c.name));
    /* Authored pages (securitization, the CMO/CDO comparison, the sequenced CVA
       assembly) are never in coreConcepts.json, which is name-matched against
       this reading's own fields. They declare their contributing readings
       instead, and a reading that contributes to one should offer it: R37 is
       CVA's home and would otherwise have no route to its own concept page,
       since the inline linker deliberately skips a page's home reading. */
    const claimed = new Set(auto.map((c) => c.slug));
    const authored = conceptLinkTable.filter(
      (c) => c.authored && !claimed.has(c.slug) && Array.isArray(c.refs) && c.refs.includes(rn),
    );
    return [...auto, ...authored];
  }, [d, rn]);

  /* Anchor ladders for the two split panes (spec: PDF anchor ladder). `pdf.query`
     is authored against the FULL book, so it is the right first guess there but
     almost never appears in the condensed companion; the reading title does. Both
     must be memoized or PdfCore re-searches on every render. */
  const sourceQueries = useMemo(() => {
    if (!d || !d.pdf) return EMPTY_QUERIES;
    const base = [d.pdf.query, d.title].filter(Boolean);
    return splitQText && splitQRn === rn ? [splitQText, ...base] : base;
  }, [d, rn, splitQText, splitQRn]);
  const condensedQueries = useMemo(() => {
    if (!d || !d.pdf) return EMPTY_QUERIES;
    return [d.title, d.pdf.query].filter(Boolean);
  }, [d]);

  /* section list for the sticky TOC — must mirror the conditions in the JSX below exactly.
     Computed with d-optional guards (not a hook) so it's stable to include as an effect dep
     whether or not the reading chunk has finished loading yet. */
  const sections = [];
  const pushSec = (txt) => { sections.push({ id: slugify(txt), txt }); return txt; };
  if (d) {
    if (d.teaches) pushSec("What this chapter teaches");
    if (d.why) pushSec("Why it matters");
    if (d.intuition) pushSec("Core intuition");
    if (d.eli5) pushSec("Explain it simply");
    if (d.thinkLike) pushSec("Think like a risk manager");
    if (d.visual) pushSec("See it");
    /* Explanation before consolidation (owner directive, 2026-07-26): the
       breakdown lists are a SUMMARY, and they used to run before the concepts
       that explain them, so a reading read intro, intuition, summary,
       explanation, summary again. Concepts and their formulas now come first;
       the lists consolidate afterwards. Keep this order identical to the JSX
       below or the TOC lies about the page. */
    if (d.concepts && d.concepts.length) pushSec("Concepts");
    if (d.formulas && d.formulas.length) pushSec("Formulas");
    if (d.breakdown && d.breakdown.length) pushSec("Consolidate: the lists to memorize");
    if (d.lists && d.lists.length) pushSec("Build the list — memorize the order");
    if (d.pairs && d.pairs.length) pushSec("Match names to scope");
    if (d.connections) pushSec("Connections");
    if (d.misconceptions && d.misconceptions.length) pushSec("Common misconceptions & exam traps");
    if (d.highYield && d.highYield.length) pushSec("High yield — what to prioritize");
    if (d.quiz && d.quiz.length) pushSec("Test yourself");
    if (d.recall && d.recall.length) pushSec("Active recall — answer before revealing");
    if (d.hooks && d.hooks.length) pushSec("Memory hooks");
    if (d.sources && d.sources.length) pushSec("Go deeper — external reading");
    if (d.summary) pushSec("One-page summary");
  }

  useEffect(() => {
    if (!rootRef.current || !d) return;
    /* Discard any anchor useScrollAnchor's own mount effect may have just
       captured synchronously against a stale (pre-navigation) scrollY — see the
       resetAnchor() comment in scrollAnchor.js. Without this, the ResizeObserver's
       unconditional initial notification can restore that stale anchor moments
       after the rAF below sets the real position, yanking the reader back down. */
    resetScrollAnchor();
    initWidgets(rootRef.current);
    fitMath(rootRef.current);
    /* Inline core-concept links run AFTER fitMath so the math subtrees they must
       not touch are already built and carry their .katex/.f-tex markers. */
    linkifyRoot(rootRef.current, conceptLinkTable, rn);
    requestAnimationFrame(() => {
      const r = resumeRef.current;
      if (r.scrollTo) {
        const el = document.getElementById(r.scrollTo);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
        else window.scrollTo(0, 0);
      } else if (r.y > 0) {
        window.scrollTo(0, r.y);
      } else {
        window.scrollTo(0, 0);
      }
      resumeRef.current = { y: 0, scrollTo: null }; // consume once
    });
  }, [rn, d]);

  /* throttled scroll-position save, so reopening this reading later can resume exactly here */
  useEffect(() => {
    if (!d) return;
    let last = 0;
    function onScroll() {
      const now = Date.now();
      if (now - last < 500) return;
      last = now;
      const y = window.scrollY;
      let sec = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) sec = s.txt; else break;
      }
      touchVisited(rn, { y, section: sec });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rn, d, sections]);

  if (!rn || !meta) return <Navigate to="/" replace />;

  if (!d) {
    /* reading chunk still loading (all 101 exist, so this is transient) */
    return (
      <main className="page">
        <div className="crumbs">
          <Link to="/">Home</Link> / <Link to={bpath(book.n)}>{book.short}</Link>
        </div>
        <h1>Reading {rn} — {meta.t}</h1>
        <p className="lead">{meta.tag}</p>
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      </main>
    );
  }

  const idx = FLAT.indexOf(rn);
  const prevRn = idx > 0 ? FLAT[idx - 1] : null;
  const nextRn = idx >= 0 && idx < FLAT.length - 1 ? FLAT[idx + 1] : null;

  /* bottom "Next" clears the reading just finished (toggleDone, so progress/
     streaks/planner all update consistently) before advancing; the done-guard
     on setActiveReading mirrors the mount effect above (only a NOT-done
     reading is ever "active") so landing on an already-completed next
     reading doesn't mark it active. */
  function goNext() {
    if (nextRn == null) return;
    if (!getState().done[rn]) toggleDone(rn);
    if (!getState().done[nextRn]) setActiveReading(nextRn);
    navigate(rpath(nextRn));
  }

  function toggleRecall(i) {
    setOpenRecall((s) => ({ ...s, [i]: !s[i] }));
  }

  /* Split view is desktop-only and its toggles now live in the navbar
     (NavSplitControls), which is itself hidden below the breakpoint. Narrow
     viewports reach the source material through the "Open source PDF ↗" link in
     the action row, which is always visible (CLAUDE.md §7.4). */
  function closeSplitPane(kind) {
    setSplitPane(kind, false);
    if (kind === "source") setSplitQuery(null);
  }

  const readingContent = (
    /* --book carries this book's identity colour down to everything inside the
       reading (concept run-in labels, formula names) so the page reads as one
       book rather than a spread of unrelated accents. CLAUDE.md §3. */
    <main
      className="page"
      ref={rootRef}
      style={{
        ...(!splitOpen && appliedWidth ? { maxWidth: appliedWidth } : null),
        "--book": book.color,
      }}
    >
      <div
        className="page-resize"
        onPointerDown={onResizeDown}
        onDoubleClick={onResizeReset}
        title="Drag to resize · double-click to reset"
      />
      <div className="crumbs">
        <Link to="/">Home</Link> / <Link to={bpath(book.n)}>Book {book.n} · {book.short}</Link> / Reading {rn}
      </div>
      <div className="kicker" style={{ color: book.color }}>
        {d.session} · Reading {rn}
        {meta.hy > 0 && (
          <span className="r-hy" title={`Exam priority: ${meta.hy}/5`} style={{ marginLeft: "0.6rem" }}>
            {"★".repeat(meta.hy)}<span style={{ opacity: 0.35 }}>{"★".repeat(5 - meta.hy)}</span>
          </span>
        )}
      </div>
      <h1>{d.title}</h1>
      {d.tagline && <p className="lead"><Html as="span" html={d.tagline} /></p>}
      <ReadingArc rn={rn} />

      <div className="flex flex-wrap items-center gap-2 mt-2 mb-1">
        <Button size="sm" variant={isDone ? "default" : "outline"} onClick={() => toggleDone(rn)}>
          {isDone ? "✓ Completed" : "Mark as done"}
        </Button>
        {d.pdf && (
          <Link
            to={`/pdf/${d.pdf.book}?q=${encodeURIComponent(d.pdf.query)}&q2=${encodeURIComponent(d.title)}`}
            state={{ from: `/chapter/${rn}` }}
          >
            <Button size="sm" variant="outline">Open source PDF ↗</Button>
          </Link>
        )}
        {/* Also rendered in the navbar (Nav -> NavSplitControls) so the toggles stay
            reachable while scrolled deep into a reading or in fullscreen. Kept here
            too because the navbar cluster is easy to miss: this is where the owner
            looks for them when opening a reading. Same component, one behaviour. */}
        <NavSplitControls rn={rn} />
        {quizScore && <Badge tone={quizScore.best >= 70 ? "green" : "amber"}>Quiz best {quizScore.best}%</Badge>}
      </div>

      {unstudiedPrereqs.length > 0 && (
        <div className="card" style={{ borderLeft: "3px solid var(--amber)", marginBottom: "1.2rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 750, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--amber)", marginBottom: "0.4rem" }}>
            Refresher — this reading assumes you remember
          </div>
          {unstudiedPrereqs.map((c, i) => {
            const pm = readingMeta(c.r);
            return (
              <p key={i} style={{ fontSize: "0.9rem", margin: i === 0 ? 0 : "0.5rem 0 0" }}>
                <Link to={rpath(c.r)}><strong>R{c.r}{pm ? " · " + pm.t : ""}</strong></Link>
                {" — "}
                <Html as="span" html={c.why} />
              </p>
            );
          })}
        </div>
      )}

      {d.teaches && (<>
        <SectionLabel txt="What this chapter teaches" color={book.color} rn={rn} />
        <div className="prose"><Html html={d.teaches} /></div>
      </>)}
      {d.why && (<>
        <SectionLabel txt="Why it matters" color={book.color} rn={rn} />
        <div className="prose"><Html html={d.why} /></div>
      </>)}
      {d.intuition && (<>
        <SectionLabel txt="Core intuition" color={book.color} rn={rn} />
        <div className="prose"><Html html={d.intuition} /></div>
      </>)}
      {d.eli5 && (<>
        <SectionLabel txt="Explain it simply" color="var(--green)" rn={rn} />
        <div className="card accent"><Html html={d.eli5} /></div>
      </>)}
      {d.thinkLike && (<>
        <SectionLabel txt="Think like a risk manager" color={book.color} rn={rn} />
        <div className="prose"><Html html={d.thinkLike} /></div>
      </>)}
      {d.visual && (<>
        <SectionLabel txt="See it" color={book.color} rn={rn} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: d.visual }} />
      </>)}
      {d.concepts && d.concepts.length > 0 && (<>
        <SectionLabel txt="Concepts" color={book.color} rn={rn} />
        {d.concepts.map((c, i) => <ConceptCard key={i} c={c} open={i === 0} id={"concept-" + slugify(c.name)} />)}
      </>)}
      {readingCoreConcepts.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", margin: "0 0 1.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>Core concepts in this reading:</span>
          {readingCoreConcepts.map((c) => (
            <Link
              key={c.slug}
              to={`/concept/${c.slug}`}
              className="chip"
              style={{ textDecoration: "none" }}
              title={`Reused in ${c.refs.length} readings — deep-dive page`}
            >
              {c.name} ↗
            </Link>
          ))}
        </div>
      )}

      {d.formulas && d.formulas.length > 0 && (<>
        <SectionLabel txt="Formulas" color={book.color} rn={rn} />
        {d.formulas.map((f, i) => {
          const mathCls = "f-math" + (isTex(f.math) ? " f-tex" : "");
          return (
            <div className="formula-block" key={i}>
              <div className="f-name">{f.name}</div>
              <div className={mathCls} dangerouslySetInnerHTML={{ __html: renderMath(f.math, true) }} />
              {f.plain && <p className="f-plain"><Html as="span" html={f.plain} /></p>}
              {f.note && <div className="f-note"><Html as="span" html={f.note} /></div>}
              {f.derivation && (
                <Accordion type="single" collapsible className="f-deeper">
                  <AccordionItem value={"derivation-" + i}>
                    <AccordionTrigger>Show the math</AccordionTrigger>
                    <AccordionContent>
                      <Html html={f.derivation} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          );
        })}
      </>)}

      {d.breakdown && d.breakdown.length > 0 && (<>
        <SectionLabel txt="Consolidate: the lists to memorize" color={book.color} rn={rn} />
        <div className="breakdown-grid">
          {d.breakdown.map((b, i) => (
            <Resizable key={i} blockKey={`${rn}:bd:${i}`} className="card">
              <h3><Html as="span" html={b.title} /></h3>
              <ol style={{ margin: "0.4rem 0 0", paddingLeft: "1.2rem" }}>
                {(b.points || []).map((p, j) => {
                  // §9-C list exposition: a point may be a plain string or
                  // { point, explain }, where explain renders as an always-visible
                  // dimmer sub-line. Plain strings stay backward-compatible.
                  const isObj = p && typeof p === "object";
                  const text = isObj ? p.point : p;
                  const explain = isObj ? p.explain : null;
                  return (
                    <li key={j} style={{ fontSize: "0.92rem", margin: "0.25rem 0" }}>
                      <Html as="span" html={text} />
                      {explain && (
                        <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>
                          <Html as="span" html={explain} />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </Resizable>
          ))}
        </div>
      </>)}

      {d.lists && d.lists.length > 0 && (<>
        <SectionLabel txt="Build the list — memorize the order" color={book.color} rn={rn} />
        <ListBuilder lists={d.lists} color={book.color} />
      </>)}

      {d.pairs && d.pairs.length > 0 && (<>
        <SectionLabel txt="Match names to scope" color={book.color} rn={rn} />
        <MatchPairs pairs={d.pairs} color={book.color} />
      </>)}

      {d.connections && (<>
        <SectionLabel txt="Connections" color={book.color} rn={rn} />
        <div className="grid2">
          <ConnList title="Where this came from" arr={d.connections.from} />
          <ConnList title="Where you'll use it next" arr={d.connections.to} />
        </div>
        {d.connections.confused && d.connections.confused.length > 0 && (
          <div className="card accent">
            <h3>Commonly confused with</h3>
            {d.connections.confused.map((x, i) => (
              <p key={i}><strong><Html as="span" html={x.what} /></strong> — <Html as="span" html={x.how} /></p>
            ))}
          </div>
        )}
        <MiniMap rn={rn} />
      </>)}

      {d.misconceptions && d.misconceptions.length > 0 && (<>
        <SectionLabel txt="Common misconceptions & exam traps" color="var(--red)" rn={rn} />
        {d.misconceptions.map((m, i) => (
          <div className="misc-row" key={i}>
            <div className="wrong"><span className="tag">Looks true / trap</span><Html as="span" html={m.wrong} /></div>
            <div className="right"><span className="tag">Actually</span><Html as="span" html={m.right} /></div>
          </div>
        ))}
      </>)}

      {d.highYield && d.highYield.length > 0 && (<>
        <SectionLabel txt="High yield — what to prioritize" color="var(--amber)" rn={rn} />
        {d.highYield.map((y, i) => {
          const tier = y.stars >= 5 ? " hy-5" : y.stars >= 4 ? " hy-4" : "";
          return (
            <div className={"hy-item" + tier} key={i}>
              <Html as="span" html={stars(y.stars)} />
              <div className="hy-body">
                <div className="hy-what"><Html as="span" html={y.what} /></div>
                <div className="hy-why"><Html as="span" html={y.why || ""} /></div>
              </div>
            </div>
          );
        })}
      </>)}

      {d.quiz && d.quiz.length > 0 && (<>
        <SectionLabel txt="Test yourself" color={book.color} rn={rn} />
        <Quiz key={rn} rn={rn} quiz={d.quiz} />
      </>)}

      {d.recall && d.recall.length > 0 && (<>
        <SectionLabel txt="Active recall — answer before revealing" color="var(--purple)" rn={rn} />
        {d.recall.map((q, i) => (
          <div className={"recall-card" + (openRecall[i] ? " open" : "")} key={i}>
            <div
              className="recall-q"
              role="button"
              tabIndex={0}
              aria-expanded={!!openRecall[i]}
              onClick={() => toggleRecall(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleRecall(i); } }}
            ><Html as="span" html={q.q} /></div>
            <div className="recall-a"><Html as="span" html={q.a} /></div>
          </div>
        ))}
      </>)}

      {d.hooks && d.hooks.length > 0 && (<>
        <SectionLabel txt="Memory hooks" color="var(--pink)" rn={rn} />
        <div className="grid2">
          {d.hooks.map((k, i) => (
            <div className="card" key={i}>
              <h3>{k.title}</h3>
              <p style={{ fontSize: "0.92rem" }}><Html as="span" html={k.text} /></p>
            </div>
          ))}
        </div>
      </>)}

      {d.sources && d.sources.length > 0 && (<>
        <SectionLabel txt="Go deeper — external reading" color={book.color} rn={rn} />
        <div className="grid2">
          {d.sources.map((s, i) => (
            <a className="card" key={i} href={s.url} target="_blank" rel="noopener noreferrer"
               style={{ display: "block", textDecoration: "none" }}>
              <h3 style={{ margin: 0 }}>{s.title} ↗</h3>
              {s.note && <p style={{ fontSize: "0.88rem", margin: "0.35rem 0 0" }}><Html as="span" html={s.note} /></p>}
            </a>
          ))}
        </div>
      </>)}

      {d.summary && (<>
        <SectionLabel txt="One-page summary" color={book.color} rn={rn} />
        <SummaryOutline html={d.summary} color={book.color} />
      </>)}

      <CaseStudyHook rn={rn} />

      <div className="chapter-nav">
        {prevRn ? (
          <Link to={rpath(prevRn)}>
            <div className="dir">← Previous</div>
            <div className="t">R{prevRn} · {readingMeta(prevRn).t}</div>
          </Link>
        ) : <span style={{ flex: 1 }} />}
        {nextRn ? (
          <button className="next" onClick={goNext}>
            <div className="dir">Next →</div>
            <div className="t">R{nextRn} · {readingMeta(nextRn).t}</div>
          </button>
        ) : <span style={{ flex: 1 }} />}
      </div>

      {planNextRn != null && planNextRn !== nextRn && (
        <div style={{ marginTop: "0.6rem", textAlign: "center" }}>
          <Link to={rpath(planNextRn)} state={{ resume: false }} style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>
            Next in your plan: R{planNextRn} · {readingMeta(planNextRn).t} →
          </Link>
        </div>
      )}

      {completedBlock && (
        <div className="card accent" style={{ marginTop: "0.6rem", textAlign: "center" }}>
          <Link to={"/block-review/" + completedBlock.id} style={{ fontSize: "0.88rem", fontWeight: 600 }}>
            Block complete: review it → {completedBlock.name}
          </Link>
        </div>
      )}

      <ChapterTOC sections={sections} rn={rn} />
      <KeyPoints items={d.highYield} color={book.color} resolve={(t) => keyPointAnchor(t, d.concepts, sections)} />
      <Highlighter rn={rn} book={book.n} containerRef={rootRef} />
      <ConceptHover containerRef={rootRef} />
    </main>
  );

  if (splitOpen && d.pdf) {
    return (
      <SplitView
        source={splitSource}
        condensed={splitCondensed}
        bn={d.pdf.book}
        rn={rn}
        sourceQueries={sourceQueries}
        condensedQueries={condensedQueries}
        onClosePane={closeSplitPane}
      >
        {readingContent}
      </SplitView>
    );
  }
  return readingContent;
}
