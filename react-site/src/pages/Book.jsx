import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, FileText } from "lucide-react";
import { META, rpath } from "../lib/meta.js";
import Html from "../components/Html.jsx";
import { slugify } from "../lib/html.js";
import { useStore, toggleDone } from "../lib/store.js";
import Progress from "../components/ui/progress.jsx";

function SectionLabel({ text, color }) {
  return (
    <div className="section-label" id={slugify(text)}>
      <span className="dot" style={{ background: color || "var(--accent)" }} />
      {text}
    </div>
  );
}

export default function Book() {
  const { bn } = useParams();
  const bnNum = Number(bn);
  const b = META.books.find((x) => x.n === bnNum);
  const done = useStore((s) => s.done);

  useEffect(() => {
    if (b) document.title = "Book " + b.n + " — " + b.title;
  }, [b]);

  if (!b) return <Navigate to="/" replace />;

  const doneCount = b.readings.filter((r) => done[r.n]).length;
  const pct = b.readings.length ? Math.round((doneCount / b.readings.length) * 100) : 0;

  return (
    <main className="page">
      <div className="crumbs"><Link to="/">Home</Link> / Book {b.n}</div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="kicker" style={{ color: b.color }}>Book {b.n} · {b.readings.length} readings</div>
          <h1>{b.title}</h1>
        </div>
        <div className="flex min-w-[11rem] shrink-0 flex-col items-end gap-1 pt-1">
          <span className="font-mono text-[0.8rem] text-dim">{doneCount}/{b.readings.length} done</span>
          <Progress value={pct} color={b.color} className="w-44" />
          <Link
            to={"/pdf/" + b.n}
            className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-faint hover:text-accent"
          >
            <FileText size={12} /> Read source PDF
          </Link>
        </div>
      </div>
      <Html as="p" className="lead" html={b.blurb} />
      <div className="grid2">
        <div className="card">
          <h3>Why this book exists</h3>
          <Html as="p" style={{ fontSize: "0.93rem" }} html={b.why} />
        </div>
        <div className="card">
          <h3>Before you start / after you finish</h3>
          <p style={{ fontSize: "0.93rem" }}><strong>You should already know:</strong> <Html as="span" html={b.prereqs} /></p>
          <p style={{ fontSize: "0.93rem" }}><strong>This book feeds:</strong> <Html as="span" html={b.feeds} /></p>
        </div>
      </div>

      <SectionLabel text="Learning roadmap — follow the order, the dependencies are real" color={b.color} />
      <p style={{ fontSize: "0.88rem", color: "var(--text-dim)" }}>
        Stars = exam priority. Pills show which earlier readings each one builds on — click a pill
        to jump straight there, or the checkmark to mark it done.
      </p>
      {b.sessions.map((ss) => {
        const ssReadings = b.readings.filter((r) => r.n >= ss.from && r.n <= ss.to);
        const ssDone = ssReadings.filter((r) => done[r.n]).length;
        return (
          <div className="roadmap-session" key={ss.name}>
            <div className="ss-title flex items-baseline justify-between gap-3">
              <span>{ss.name} · R{ss.from}–{ss.to}</span>
              <span className="font-mono normal-case tracking-normal text-faint">{ssDone}/{ssReadings.length}</span>
            </div>
            <div className="rail">
              {ssReadings.map((r) => {
                const hasDeps = r.deps && r.deps.length;
                const isDone = !!done[r.n];
                return (
                  <div className="rail-item" key={r.n}>
                    <span
                      className={"rail-dot" + (hasDeps ? "" : " start")}
                      style={hasDeps ? undefined : { background: b.color, borderColor: b.color }}
                    />
                    <div className={"reading-row" + (isDone ? " opacity-70" : "")} style={{ display: "flex" }}>
                      <button
                        type="button"
                        onClick={() => toggleDone(r.n)}
                        title={isDone ? "Mark as not done" : "Mark as done"}
                        className={
                          "mr-2.5 flex shrink-0 items-center self-center rounded-full border-0 bg-transparent p-0 " +
                          (isDone ? "text-green" : "text-faint hover:text-ink")
                        }
                      >
                        <CheckCircle2 size={17} strokeWidth={isDone ? 2.4 : 1.6} fill={isDone ? "var(--green-soft)" : "none"} />
                      </button>
                      <Link className="flex flex-1 items-center no-underline hover:no-underline" to={rpath(r.n)}>
                        <span className="r-num">R{r.n}</span>
                        <span className="r-title">
                          {r.t}
                          <br />
                          <span style={{ fontWeight: 400, fontSize: "0.82rem", color: "var(--text-dim)" }}>{r.tag}</span>
                        </span>
                        <span className="r-hy">{"★".repeat(r.hy)}</span>
                      </Link>
                    </div>
                    <div className="r-deps">
                      {hasDeps ? (
                        <>
                          <span className="dep-arrow">↳ builds on</span>
                          <span className="dep-pills">
                            {r.deps.map((d) => (
                              <Link className="dep-pill" to={rpath(d)} key={d}>R{d}</Link>
                            ))}
                          </span>
                        </>
                      ) : (
                        <span className="dep-start" style={{ color: b.color }}>✦ start here</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
