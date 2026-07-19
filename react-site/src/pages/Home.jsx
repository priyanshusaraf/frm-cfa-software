import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ListChecks, BarChart3, Sigma, ArrowUpRight } from "lucide-react";
import { META, rpath, bpath, readingMeta, bookOf } from "../lib/meta.js";
import Html from "../components/Html.jsx";
import { slugify } from "../lib/html.js";
import { useStore } from "../lib/store.js";
import Progress from "../components/ui/progress.jsx";
import { MindMapGraph } from "./MindMap.jsx";

/* Matches app.js's label() helper: a section heading with a colored dot. */
function SectionLabel({ text, color }) {
  return (
    <div className="section-label" id={slugify(text)}>
      <span className="dot" style={{ background: color || "var(--accent)" }} />
      {text}
    </div>
  );
}

const ENTRY_POINTS = [
  { to: "/review", label: "Review queue", desc: "Cards due today", Icon: ListChecks },
  { to: "/progress", label: "Progress", desc: "Track by book", Icon: BarChart3 },
  { to: "/formulas", label: "Formula sheet", desc: "Every formula, one page", Icon: Sigma },
];

export default function Home() {
  useEffect(() => { document.title = "FRM Part II — Interactive Curriculum"; }, []);

  const books = META.books;
  const allReadings = [];
  books.forEach((b) => b.readings.forEach((r) => allReadings.push({ r, book: b })));
  const totalReadings = allReadings.length;
  const hy5 = allReadings.filter((x) => x.r.hy === 5);
  const foundations = allReadings.filter((x) => !x.r.deps || x.r.deps.length === 0);
  const combos = allReadings.filter((x) => x.r.deps && x.r.deps.length >= 3);

  const lastVisited = useStore((s) => s.lastVisited);
  const lastRead = lastVisited ? readingMeta(lastVisited.rn) : null;
  const lastBook = lastRead ? bookOf(lastVisited.rn) : null;

  const done = useStore((s) => s.done);
  const doneCount = allReadings.filter((x) => done[x.r.n]).length;
  const bookProgress = (b) => {
    const d = b.readings.filter((r) => done[r.n]).length;
    return { done: d, total: b.readings.length, pct: b.readings.length ? Math.round((d / b.readings.length) * 100) : 0 };
  };

  const nodeById = (id) => META.graph.nodes.find((n) => n.id === id);

  return (
    <main className="page">
      {/* ---- hero ---- */}
      <div className="hero">
        <h1>FRM Part II</h1>
        <p className="lead">
          The complete Part II curriculum — 5 books, {totalReadings} readings — rebuilt as an
          interactive learning system. Not documentation: every page is built to transform the
          source material into intuition, connections, and exam-ready recall.
        </p>
        <div className="stat-row">
          <div className="stat"><div className="n">{books.length}</div><div className="l">Books</div></div>
          <div className="stat"><div className="n">{totalReadings}</div><div className="l">Readings</div></div>
          <div className="stat"><div className="n">{hy5.length}</div><div className="l">5-star high-yield</div></div>
          <div className="stat"><div className="n">{META.threads.length}</div><div className="l">Cross-book threads</div></div>
          <div className="stat"><div className="n">{META.graph.nodes.length}</div><div className="l">Mind-map concepts</div></div>
          {doneCount > 0 && (
            <div className="stat"><div className="n text-accent">{doneCount}</div><div className="l">Marked done</div></div>
          )}
        </div>
        <div className="mt-1 flex flex-wrap gap-2">
          {ENTRY_POINTS.map(({ to, label, desc, Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-2.5 rounded-el border border-line bg-raised px-3.5 py-2 transition-colors hover:border-linestrong hover:bg-hovered"
            >
              <Icon size={16} className="shrink-0 text-accent" />
              <span className="flex flex-col leading-tight">
                <span className="text-[0.85rem] font-semibold text-ink">{label}</span>
                <span className="text-[0.72rem] text-faint">{desc}</span>
              </span>
              <ArrowUpRight size={13} className="ml-1 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>

      {/* ---- continue studying ---- */}
      {lastRead && lastBook && (
        <Link
          to={rpath(lastVisited.rn)}
          className="card group flex items-center justify-between gap-3 mt-4"
          style={{ borderLeft: "3px solid " + lastBook.color, textDecoration: "none" }}
        >
          <div>
            <div className="text-[0.72rem] font-mono uppercase tracking-wide text-faint mb-1">
              Continue studying
            </div>
            <h3 className="mb-0.5">
              R{lastVisited.rn} · {lastRead.t}
            </h3>
            <div className="text-[0.82rem] text-dim">
              {lastBook.n} · {lastBook.short}
              {lastRead.hy ? <span className="ml-2" style={{ color: "var(--amber)" }}>{"★".repeat(lastRead.hy)}</span> : null}
            </div>
          </div>
          <ArrowUpRight size={16} className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </Link>
      )}

      {/* ---- course overview ---- */}
      <SectionLabel text="Course overview — why these 5 books exist, in this order" color="var(--accent)" />
      <p className="prose">
        Books 1–4 build one risk-measurement toolkit each, in the order a bank actually needs them:
        first a general way to measure loss (Book 1: VaR/ES), then the largest single risk most
        banks carry (Book 2: credit), then the risk of the firm itself failing operationally — plus
        the capital framework that prices every risk type onto one balance sheet (Book 3), then the
        dimension that turns solvent firms into failed ones anyway: timing and funding (Book 4:
        liquidity). Book 5 changes seats — from the bank managing risk to the investor allocating
        capital — then closes with GARP’s rolling window onto today’s risks. Each book explicitly
        consumes the one(s) before it; the chips below trace that dependency chain using each book’s
        own "feeds forward" description.
      </p>
      <div className="pill-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
        {books.map((b, i) => (
          <span key={b.n} style={{ display: "contents" }}>
            <Link className="chip" style={{ borderColor: b.color, color: b.color }} to={bpath(b.n)}>
              {b.n} · {b.short}
            </Link>
            {i < books.length - 1 && <span style={{ color: "var(--text-faint)" }}>→</span>}
          </span>
        ))}
      </div>
      <div className="grid2" style={{ marginTop: "1rem" }}>
        {books.map((b) => {
          const p = bookProgress(b);
          return (
            <div className="card" key={b.n} style={{ borderTop: "3px solid " + b.color }}>
              <div className="flex items-baseline justify-between gap-3">
                <h3><Link to={bpath(b.n)}>{b.n} · {b.short}</Link></h3>
                <span className="shrink-0 font-mono text-[0.74rem] text-faint">{p.done}/{p.total} done</span>
              </div>
              <Progress value={p.pct} color={b.color} className="mb-2.5 mt-0.5" />
              <p style={{ fontSize: "0.88rem" }}><strong>Why it exists:</strong> <Html as="span" html={b.why} /></p>
              <p style={{ fontSize: "0.88rem", color: "var(--text-dim)" }}>
                <strong>Feeds forward:</strong> <Html as="span" html={b.feeds || "Nothing downstream — terminal book."} />
              </p>
            </div>
          );
        })}
      </div>

      {/* ---- visual learning path ---- */}
      <SectionLabel text="Visual learning path — read in this order" color="var(--green)" />
      <p className="lead" style={{ fontSize: "0.92rem" }}>
        Every book both needs and is needed. Skipping ahead means hitting formulas and vocabulary
        from a book you haven’t read yet.
      </p>
      {books.map((b) => (
        <div className="path-step" key={b.n}>
          <div className="path-dot" style={{ background: b.colorSoft, color: b.color, borderColor: b.color }}>{b.n}</div>
          <div className="path-body">
            <h3><Link to={bpath(b.n)}>{b.title}</Link></h3>
            <Html as="p" html={b.blurb} />
            <div className="path-why">
              <b>Needs:</b> <Html as="span" html={b.prereqs} /><br />
              <b>Feeds:</b> <Html as="span" html={b.feeds || "Nothing downstream — this is the terminal book."} />
            </div>
          </div>
        </div>
      ))}

      {/* ---- interactive global mind map (preview) ---- */}
      <SectionLabel text="Global mind map — every concept, clickable" color="var(--cyan)" />
      <p className="lead" style={{ fontSize: "0.92rem" }}>
        Drag to pan, scroll to zoom, hover a node to trace its connections, click to jump to the
        chapter. <Link to="/mindmap">Open full-screen →</Link>
      </p>
      <MindMapGraph compact />

      {/* ---- big picture ---- */}
      <SectionLabel text="Big picture — the ideas that never go away" color="var(--purple)" />
      <p className="lead" style={{ fontSize: "0.92rem" }}>
        These threads resurface across every book. Recognizing the repeat is worth more than
        memorizing any one instance of it.
      </p>
      <div className="grid2">
        {META.threads.map((t) => (
          <div className="card" key={t.name}>
            <h3>{t.name}</h3>
            <p style={{ fontSize: "0.9rem" }}>{t.desc}</p>
            <div className="pill-row">
              {t.nodes.map((nid) => {
                const node = nodeById(nid);
                if (!node) return null;
                return <Link className="chip" key={nid} to={rpath(node.r)}>{node.label}</Link>;
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="grid2" style={{ marginTop: "1rem" }}>
        <div className="callout tip">
          <div className="callout-title">Foundation readings ({foundations.length})</div>
          No prerequisites within their own book — safe starting points, and the readings
          everything else in that book builds on:{" "}
          {foundations.slice(0, 8).map((x, i) => (
            <span key={x.r.n}>{i > 0 && ", "}<Link to={rpath(x.r.n)}>R{x.r.n}</Link></span>
          ))}
          {foundations.length > 8 ? ", …" : ""}.
        </div>
        <div className="callout warn">
          <div className="callout-title">Combination readings ({combos.length})</div>
          Depend on 3+ earlier readings — these are where the exam likes to combine ideas, and
          where confusion compounds if an earlier reading was skimmed:{" "}
          {combos.slice(0, 8).map((x, i) => (
            <span key={x.r.n}>{i > 0 && ", "}<Link to={rpath(x.r.n)}>R{x.r.n}</Link></span>
          ))}
          {combos.length > 8 ? ", …" : ""}.
        </div>
      </div>

      {/* ---- global high-yield ---- */}
      <SectionLabel text="Global high-yield — the 30 minutes before the exam" color="var(--amber)" />
      <p className="lead" style={{ fontSize: "0.92rem" }}>
        Every 5-star reading across all five books, in one list. If you only have half an hour
        left, this is what to reread.
      </p>
      {books.map((b) => {
        const fives = b.readings.filter((r) => r.hy === 5);
        if (!fives.length) return null;
        return (
          <div className="roadmap-session" key={b.n}>
            <div className="ss-title" style={{ color: b.color }}>{b.n} · {b.short}</div>
            {fives.map((r) => (
              <Link className="reading-row" to={rpath(r.n)} key={r.n}>
                <span className="r-num">R{r.n}</span>
                <span className="r-title">{r.t}<br /><span style={{ fontWeight: 400, fontSize: "0.82rem", color: "var(--text-dim)" }}>{r.tag}</span></span>
                <span className="r-hy">{"★".repeat(r.hy)}</span>
              </Link>
            ))}
          </div>
        );
      })}
    </main>
  );
}
