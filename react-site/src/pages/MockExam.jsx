/* Timed mock exam assembled from the per-reading quiz banks (~600 MCQs across
   all 101 readings). No sourced papers needed: questions are sampled across the
   selected books, options shuffled per sitting (same rules as Quiz.jsx — the
   stored answer index is remapped through the shuffle). Real-exam pacing is
   3 min/question (FRM Part II: 80 questions / 4 hours). */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { META, rpath, readingMeta, bookOf } from "../lib/meta.js";
import { useAllReadings } from "../lib/readings.js";
import { useStore, addMockResult, addNote } from "../lib/store.js";
import Html from "../components/Html.jsx";
import Button from "../components/ui/button.jsx";
import Progress from "../components/ui/progress.jsx";

const LETTERS = ["A", "B", "C", "D"];
const SIZES = [10, 25, 40, 80];
const MIN_PER_Q = 3;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function strip(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
}

/* Pool every quiz question from the selected books, then sample n spread
   proportionally across books (round-robin over shuffled per-book pools) so an
   all-books mock isn't accidentally 40% one book. */
function buildExam(all, bookNs, n) {
  const pools = new Map(); // bn -> shuffled questions
  for (const b of META.books) {
    if (!bookNs.includes(b.n)) continue;
    const pool = [];
    for (const r of b.readings) {
      const d = all[r.n];
      if (!d || !d.quiz) continue;
      d.quiz.forEach((q, qi) => {
        if (q && q.q && Array.isArray(q.options)) pool.push({ rn: r.n, bn: b.n, qi, q });
      });
    }
    if (pool.length) pools.set(b.n, shuffle(pool));
  }
  const picked = [];
  const order = shuffle([...pools.keys()]);
  let guard = 0;
  while (picked.length < n && guard++ < 10000) {
    let took = false;
    for (const bn of order) {
      const pool = pools.get(bn);
      if (pool && pool.length && picked.length < n) {
        picked.push(pool.pop());
        took = true;
      }
    }
    if (!took) break;
  }
  return shuffle(picked).map((item) => {
    const optOrder = shuffle(item.q.options.map((_, i) => i));
    return {
      rn: item.rn,
      bn: item.bn,
      q: item.q.q,
      why: item.q.why,
      options: optOrder.map((oi) => item.q.options[oi]),
      answer: optOrder.indexOf(item.q.answer),
    };
  });
}

function fmtClock(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m + ":" + String(s).padStart(2, "0");
}

export default function MockExam() {
  useEffect(() => { document.title = "Mock exam — FRM Part II"; }, []);
  const all = useAllReadings();
  const mocks = useStore((s) => s.mocks);

  const [phase, setPhase] = useState("setup"); // setup | exam | result
  const [bookNs, setBookNs] = useState([1, 2, 3, 4, 5]);
  const [size, setSize] = useState(25);
  const [timed, setTimed] = useState(true);
  const [exam, setExam] = useState([]);
  const [picks, setPicks] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [logged, setLogged] = useState({});
  const startedAt = useRef(null);
  const submittedRef = useRef(false);

  const poolSize = useMemo(() => {
    if (!all) return 0;
    let count = 0;
    for (const b of META.books) {
      if (!bookNs.includes(b.n)) continue;
      for (const r of b.readings) {
        const d = all[r.n];
        if (d && d.quiz) count += d.quiz.length;
      }
    }
    return count;
  }, [all, bookNs]);

  function toggleBook(n) {
    setBookNs((cur) => {
      const next = cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n];
      return next.length ? next : cur; // never allow zero books
    });
  }

  function start() {
    if (!all) return;
    const n = Math.min(size, poolSize);
    const ex = buildExam(all, bookNs, n);
    if (!ex.length) return;
    setExam(ex);
    setPicks({});
    setLogged({});
    submittedRef.current = false;
    startedAt.current = Date.now();
    setSecondsLeft(ex.length * MIN_PER_Q * 60);
    setPhase("exam");
    window.scrollTo(0, 0);
  }

  function submit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const perBook = {};
    let correct = 0;
    exam.forEach((item, i) => {
      const pb = perBook[item.bn] || (perBook[item.bn] = { total: 0, correct: 0 });
      pb.total++;
      if (picks[i] === item.answer) { correct++; pb.correct++; }
    });
    const minutes = startedAt.current ? Math.round((Date.now() - startedAt.current) / 60000) : null;
    addMockResult({ total: exam.length, correct, perBook, minutes });
    setPhase("result");
    window.scrollTo(0, 0);
  }

  /* countdown — auto-submits at zero */
  useEffect(() => {
    if (phase !== "exam" || !timed) return undefined;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(t); submit(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timed]);

  function logError(item, i) {
    addNote({
      rn: item.rn,
      section: "Mock exam",
      quote: strip(item.q),
      text:
        "I picked “" + strip(picks[i] != null ? item.options[picks[i]] : "(blank)") +
        "”; correct is “" + strip(item.options[item.answer]) + "”. " + strip(item.why || ""),
      kind: "error",
    });
    setLogged((prev) => ({ ...prev, [i]: true }));
  }

  const answered = Object.keys(picks).length;
  const correctCount = exam.reduce((n, item, i) => n + (picks[i] === item.answer ? 1 : 0), 0);
  const pct = exam.length ? Math.round((correctCount / exam.length) * 100) : 0;

  /* ------------------------------------------------ setup ---- */
  if (phase === "setup") {
    return (
      <main className="page">
        <div className="kicker" style={{ color: "var(--accent)" }}>Exam simulation</div>
        <h1>Mock exam</h1>
        <p className="lead">
          A timed exam assembled from the quiz banks of all 101 readings — options reshuffled every
          sitting, real-exam pacing ({MIN_PER_Q} min/question), per-book score breakdown at the end.
        </p>

        {!all ? (
          <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading question banks…</p>
        ) : (
          <div className="card" style={{ marginTop: "1rem" }}>
            <h3>Build your paper</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0.75rem 0" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", alignSelf: "center" }}>Books:</span>
              {META.books.map((b) => (
                <button
                  key={b.n}
                  className="chip"
                  onClick={() => toggleBook(b.n)}
                  style={bookNs.includes(b.n)
                    ? { cursor: "pointer", borderColor: b.color, color: b.color, background: "var(--bg-hover)" }
                    : { cursor: "pointer", opacity: 0.55 }}
                >
                  B{b.n} {b.short}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0.75rem 0" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", alignSelf: "center" }}>Questions:</span>
              {SIZES.map((n) => (
                <button
                  key={n}
                  className="chip"
                  onClick={() => setSize(n)}
                  style={size === n ? { cursor: "pointer", borderColor: "var(--accent)", color: "var(--accent)" } : { cursor: "pointer" }}
                >
                  {n}{n === 80 ? " (full paper)" : ""}
                </button>
              ))}
              <label style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.35rem", marginLeft: "0.75rem", cursor: "pointer" }}>
                <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
                Timed ({fmtClock(Math.min(size, poolSize) * MIN_PER_Q * 60)})
              </label>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-faint)", margin: "0.25rem 0 0.9rem" }}>
              {poolSize} questions available in this selection.
            </p>
            <Button onClick={start} disabled={!poolSize}>Start mock exam</Button>
          </div>
        )}

        {mocks && mocks.length > 0 && (
          <>
            <div className="section-label"><span className="dot" style={{ background: "var(--purple)" }} />Past sittings</div>
            {mocks.slice(0, 8).map((m, i) => {
              const p = m.total ? Math.round((m.correct / m.total) * 100) : 0;
              return (
                <div className="card" key={m.ts + "-" + i} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <strong style={{ fontSize: "0.95rem", color: p >= 70 ? "var(--green)" : "var(--amber)" }}>{p}%</strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>{m.correct}/{m.total} correct</span>
                  {m.minutes != null && <span style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{m.minutes} min</span>}
                  <span style={{ fontSize: "0.78rem", color: "var(--text-faint)", marginLeft: "auto" }}>{new Date(m.ts).toLocaleString()}</span>
                </div>
              );
            })}
          </>
        )}
      </main>
    );
  }

  /* ------------------------------------------------- exam ---- */
  if (phase === "exam") {
    return (
      <main className="page">
        <div className="sticky top-[3.1rem] z-20 -mx-2 mb-4 flex flex-wrap items-center gap-3 rounded-el border border-line bg-raised px-3 py-2">
          <strong style={{ fontSize: "0.9rem" }}>Mock exam</strong>
          <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontFamily: "var(--font-mono, monospace)" }}>
            {answered}/{exam.length} answered
          </span>
          {timed && (
            <span style={{
              fontSize: "0.9rem", fontFamily: "var(--font-mono, monospace)",
              color: secondsLeft < 300 ? "var(--red)" : "var(--text)",
            }}>
              ⏱ {fmtClock(secondsLeft)}
            </span>
          )}
          <span style={{ flex: 1 }} />
          <Button size="sm" onClick={submit}>Submit{answered < exam.length ? " (" + (exam.length - answered) + " blank)" : ""}</Button>
        </div>

        {exam.map((item, i) => (
          <div className="card" key={i} style={{ marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", marginBottom: "0.6rem" }}>
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.78rem", color: "var(--text-faint)" }}>{i + 1}.</span>
              <Html as="span" html={item.q} style={{ fontSize: "0.95rem" }} />
            </div>
            <div style={{ display: "grid", gap: "0.35rem" }}>
              {item.options.map((opt, oi) => {
                const on = picks[i] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                    style={{
                      display: "flex", gap: "0.6rem", alignItems: "baseline", textAlign: "left",
                      padding: "0.5rem 0.7rem", borderRadius: "8px",
                      border: "1px solid " + (on ? "var(--accent)" : "var(--border)"),
                      background: on ? "var(--accent-soft, rgba(108,157,255,0.12))" : "transparent",
                      color: "var(--text)", font: "inherit", fontSize: "0.9rem", cursor: "pointer",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.78rem", color: on ? "var(--accent)" : "var(--text-faint)" }}>
                      {LETTERS[oi]}
                    </span>
                    <Html as="span" html={opt} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0 2rem" }}>
          <Button onClick={submit}>Submit exam</Button>
        </div>
      </main>
    );
  }

  /* ----------------------------------------------- result ---- */
  const perBook = {};
  exam.forEach((item, i) => {
    const pb = perBook[item.bn] || (perBook[item.bn] = { total: 0, correct: 0 });
    pb.total++;
    if (picks[i] === item.answer) pb.correct++;
  });

  return (
    <main className="page">
      <div className="kicker" style={{ color: "var(--accent)" }}>Exam simulation</div>
      <h1>Result: {pct}%</h1>
      <p className="lead">{correctCount} of {exam.length} correct{answered < exam.length ? " (" + (exam.length - answered) + " left blank)" : ""}.</p>

      <div className="grid2" style={{ margin: "1rem 0" }}>
        {META.books.filter((b) => perBook[b.n]).map((b) => {
          const pb = perBook[b.n];
          const p = pb.total ? Math.round((pb.correct / pb.total) * 100) : 0;
          return (
            <div className="card" key={b.n}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <strong style={{ fontSize: "0.9rem", color: b.color }}>Book {b.n} · {b.short}</strong>
                <span style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono, monospace)" }}>{pb.correct}/{pb.total}</span>
              </div>
              <Progress value={p} color={b.color} />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "0.6rem", margin: "0 0 1.25rem" }}>
        <Button onClick={() => setPhase("setup")}>New mock</Button>
      </div>

      <div className="section-label"><span className="dot" style={{ background: "var(--red)" }} />Review — every question, wrong ones first</div>
      {exam
        .map((item, i) => ({ item, i, wrong: picks[i] !== item.answer }))
        .sort((a, b) => Number(b.wrong) - Number(a.wrong))
        .map(({ item, i, wrong }) => {
          const meta = readingMeta(item.rn);
          const book = bookOf(item.rn);
          return (
            <div className="card" key={i} style={{ marginBottom: "0.75rem", borderLeft: "3px solid " + (wrong ? "var(--red)" : "var(--green)") }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <Html as="span" html={item.q} style={{ fontSize: "0.92rem" }} />
                <Link to={rpath(item.rn)} style={{ fontSize: "0.76rem", whiteSpace: "nowrap", color: book ? book.color : undefined }}>
                  R{item.rn}{meta ? " · " + meta.t : ""} →
                </Link>
              </div>
              <div style={{ display: "grid", gap: "0.3rem" }}>
                {item.options.map((opt, oi) => {
                  const isAns = oi === item.answer;
                  const isPick = picks[i] === oi;
                  return (
                    <div key={oi} style={{
                      display: "flex", gap: "0.6rem", alignItems: "baseline",
                      padding: "0.35rem 0.6rem", borderRadius: "6px", fontSize: "0.86rem",
                      border: "1px solid " + (isAns ? "var(--green)" : isPick ? "var(--red)" : "var(--border)"),
                      color: isAns || isPick ? "var(--text)" : "var(--text-faint)",
                    }}>
                      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.74rem" }}>{LETTERS[oi]}</span>
                      <Html as="span" html={opt} />
                      {isAns && <span style={{ marginLeft: "auto", color: "var(--green)", fontSize: "0.76rem" }}>correct</span>}
                      {isPick && !isAns && <span style={{ marginLeft: "auto", color: "var(--red)", fontSize: "0.76rem" }}>your pick</span>}
                    </div>
                  );
                })}
              </div>
              {item.why && (
                <div style={{ marginTop: "0.6rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border)", fontSize: "0.85rem", color: "var(--text-dim)" }}>
                  <Html as="span" html={item.why} />
                </div>
              )}
              {wrong && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    className="chip"
                    disabled={!!logged[i]}
                    onClick={() => logError(item, i)}
                    style={logged[i] ? undefined : { borderColor: "var(--red)", color: "var(--red)", cursor: "pointer" }}
                  >
                    {logged[i] ? "✓ In error log" : "Log to error log"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </main>
  );
}
