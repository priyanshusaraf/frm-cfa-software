import { useEffect, useRef, useState } from "react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { readingMeta, bookOf, rpath, bpath, META } from "../lib/meta.js";
import { useReading } from "../lib/readings.js";
import { renderMath, isTex, fitMath } from "../lib/tex.js";
import { stars, slugify } from "../lib/html.js";
import { initWidgets } from "../widgets/index.js";
import Html from "../components/Html.jsx";
import SectionLabel from "../components/chapter/SectionLabel.jsx";
import ConceptCard from "../components/chapter/ConceptCard.jsx";
import ConnList from "../components/chapter/ConnList.jsx";
import ChapterTOC from "../components/chapter/ChapterTOC.jsx";
import Quiz from "../components/chapter/Quiz.jsx";
import MiniMap from "../components/chapter/MiniMap.jsx";
import Highlighter from "../components/chapter/Highlighter.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion.jsx";
import Button from "../components/ui/button.jsx";
import Badge from "../components/ui/badge.jsx";
import { useStore, toggleDone, touchVisited } from "../lib/store.js";
import KeyPoints from "../components/chapter/KeyPoints.jsx";

/* flat reading order across all books, for prev/next nav */
const FLAT = META.books.flatMap((b) => b.readings.map((r) => r.n));

export default function Chapter() {
  const { rn: rnParam } = useParams();
  const rn = parseInt(rnParam, 10);
  const rootRef = useRef(null);
  const [openRecall, setOpenRecall] = useState({});
  const isDone = useStore((s) => !!s.done[rn]);
  const quizScore = useStore((s) => s.quiz[rn]);

  const meta = rn ? readingMeta(rn) : null;
  const book = rn ? bookOf(rn) : null;
  const d = useReading(meta ? rn : 0);

  useEffect(() => {
    if (meta) document.title = "R" + rn + " — " + meta.t;
  }, [rn, meta]);

  useEffect(() => {
    setOpenRecall({});
    window.scrollTo(0, 0);
    if (rn) touchVisited(rn);
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

  useEffect(() => {
    if (!rootRef.current || !d) return;
    initWidgets(rootRef.current);
    fitMath(rootRef.current);
  }, [rn, d]);

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

  /* section list for the sticky TOC — must mirror the conditions below exactly */
  const sections = [];
  const pushSec = (txt) => { sections.push({ id: slugify(txt), txt }); return txt; };
  if (d.teaches) pushSec("What this chapter teaches");
  if (d.why) pushSec("Why it matters");
  if (d.intuition) pushSec("Core intuition");
  if (d.eli5) pushSec("Explain it simply");
  if (d.thinkLike) pushSec("Think like a risk manager");
  if (d.visual) pushSec("See it");
  if (d.breakdown && d.breakdown.length) pushSec("At a glance — the lists that matter");
  if (d.formulas && d.formulas.length) pushSec("Formula box");
  if (d.concepts && d.concepts.length) pushSec("Concept hierarchy — click to expand");
  if (d.connections) pushSec("Connections");
  if (d.misconceptions && d.misconceptions.length) pushSec("Common misconceptions & exam traps");
  if (d.highYield && d.highYield.length) pushSec("High yield — what to prioritize");
  if (d.quiz && d.quiz.length) pushSec("Test yourself");
  if (d.recall && d.recall.length) pushSec("Active recall — answer before revealing");
  if (d.hooks && d.hooks.length) pushSec("Memory hooks");
  if (d.sources && d.sources.length) pushSec("Go deeper — external reading");
  if (d.summary) pushSec("One-page summary");

  const idx = FLAT.indexOf(rn);
  const prevRn = idx > 0 ? FLAT[idx - 1] : null;
  const nextRn = idx >= 0 && idx < FLAT.length - 1 ? FLAT[idx + 1] : null;

  function toggleRecall(i) {
    setOpenRecall((s) => ({ ...s, [i]: !s[i] }));
  }

  return (
    <main className="page" ref={rootRef}>
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

      <div className="flex flex-wrap items-center gap-2 mt-2 mb-1">
        <Button size="sm" variant={isDone ? "default" : "outline"} onClick={() => toggleDone(rn)}>
          {isDone ? "✓ Completed" : "Mark as done"}
        </Button>
        {d.pdf && (
          <Link to={`/pdf/${d.pdf.book}?q=${encodeURIComponent(d.pdf.query)}`} state={{ from: `/chapter/${rn}` }}>
            <Button size="sm" variant="outline">Open source PDF ↗</Button>
          </Link>
        )}
        {quizScore && <Badge tone={quizScore.best >= 70 ? "green" : "amber"}>Quiz best {quizScore.best}%</Badge>}
      </div>

      {d.teaches && (<>
        <SectionLabel txt="What this chapter teaches" color={book.color} />
        <div className="prose"><Html html={d.teaches} /></div>
      </>)}
      {d.why && (<>
        <SectionLabel txt="Why it matters" color={book.color} />
        <div className="prose"><Html html={d.why} /></div>
      </>)}
      {d.intuition && (<>
        <SectionLabel txt="Core intuition" color={book.color} />
        <div className="prose"><Html html={d.intuition} /></div>
      </>)}
      {d.eli5 && (<>
        <SectionLabel txt="Explain it simply" color="var(--green)" />
        <div className="card accent"><Html html={d.eli5} /></div>
      </>)}
      {d.thinkLike && (<>
        <SectionLabel txt="Think like a risk manager" color={book.color} />
        <div className="prose"><Html html={d.thinkLike} /></div>
      </>)}
      {d.visual && (<>
        <SectionLabel txt="See it" color={book.color} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: d.visual }} />
      </>)}
      {d.breakdown && d.breakdown.length > 0 && (<>
        <SectionLabel txt="At a glance — the lists that matter" color={book.color} />
        <div className="grid2">
          {d.breakdown.map((b, i) => (
            <div className="card" key={i}>
              <h3><Html as="span" html={b.title} /></h3>
              <ol style={{ margin: "0.4rem 0 0", paddingLeft: "1.2rem" }}>
                {(b.points || []).map((p, j) => (
                  <li key={j} style={{ fontSize: "0.92rem", margin: "0.25rem 0" }}><Html as="span" html={p} /></li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </>)}

      {d.formulas && d.formulas.length > 0 && (<>
        <SectionLabel txt="Formula box" color={book.color} />
        {d.formulas.map((f, i) => {
          const mathCls = "f-math" + (isTex(f.math) ? " f-tex" : "");
          return (
            <div className="formula-block" key={i}>
              <div className="f-name">{f.name}</div>
              <div className={mathCls} dangerouslySetInnerHTML={{ __html: renderMath(f.math, true) }} />
              {f.plain && <p style={{ fontStyle: "italic", fontSize: "0.86rem", margin: "0.4rem 0 0" }}><Html as="span" html={f.plain} /></p>}
              {f.note && <div className="f-note"><Html as="span" html={f.note} /></div>}
              {f.derivation && (
                <Accordion type="single" collapsible style={{ marginTop: "0.5rem" }}>
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

      {d.concepts && d.concepts.length > 0 && (<>
        <SectionLabel txt="Concept hierarchy — click to expand" color={book.color} />
        {d.concepts.map((c, i) => <ConceptCard key={i} c={c} open={i === 0} />)}
      </>)}

      {d.connections && (<>
        <SectionLabel txt="Connections" color={book.color} />
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
        <SectionLabel txt="Common misconceptions & exam traps" color="var(--red)" />
        {d.misconceptions.map((m, i) => (
          <div className="misc-row" key={i}>
            <div className="wrong"><span className="tag">Looks true / trap</span><Html as="span" html={m.wrong} /></div>
            <div className="right"><span className="tag">Actually</span><Html as="span" html={m.right} /></div>
          </div>
        ))}
      </>)}

      {d.highYield && d.highYield.length > 0 && (<>
        <SectionLabel txt="High yield — what to prioritize" color="var(--amber)" />
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
        <SectionLabel txt="Test yourself" color={book.color} />
        <Quiz rn={rn} quiz={d.quiz} />
      </>)}

      {d.recall && d.recall.length > 0 && (<>
        <SectionLabel txt="Active recall — answer before revealing" color="var(--purple)" />
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
        <SectionLabel txt="Memory hooks" color="var(--pink)" />
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
        <SectionLabel txt="Go deeper — external reading" color={book.color} />
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
        <SectionLabel txt="One-page summary" color={book.color} />
        <div className="card accent"><Html html={d.summary} /></div>
      </>)}

      <div className="chapter-nav">
        {prevRn ? (
          <Link to={rpath(prevRn)}>
            <div className="dir">← Previous</div>
            <div className="t">R{prevRn} · {readingMeta(prevRn).t}</div>
          </Link>
        ) : <span style={{ flex: 1 }} />}
        {nextRn ? (
          <Link className="next" to={rpath(nextRn)}>
            <div className="dir">Next →</div>
            <div className="t">R{nextRn} · {readingMeta(nextRn).t}</div>
          </Link>
        ) : <span style={{ flex: 1 }} />}
      </div>

      <ChapterTOC sections={sections} />
      <KeyPoints items={d.highYield} color={book.color} />
      <Highlighter rn={rn} book={book.n} containerRef={rootRef} />
    </main>
  );
}
