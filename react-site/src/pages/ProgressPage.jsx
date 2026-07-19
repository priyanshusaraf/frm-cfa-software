import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore, exportState, importState } from "../lib/store.js";
import { META, readingMeta, rpath, bpath } from "../lib/meta.js";
import Progress from "../components/ui/progress.jsx";
import Badge from "../components/ui/badge.jsx";
import Button from "../components/ui/button.jsx";

export default function ProgressPage() {
  const done = useStore((s) => s.done);
  const quiz = useStore((s) => s.quiz);
  const notes = useStore((s) => s.notes);
  const highlightsRaw = useStore((s) => s.highlights);
  const fileRef = useRef(null);

  const highlights = highlightsRaw || {};
  const highlightsCount = useMemo(
    () => Object.values(highlights).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0),
    [highlights]
  );

  const allReadings = META.books.flatMap((b) => b.readings.map((r) => ({ r, book: b })));
  const totalReadings = allReadings.length;
  const doneCount = Object.keys(done).filter((rn) => done[rn]).length;

  const quizEntries = Object.values(quiz);
  const quizzesAttempted = quizEntries.length;
  const avgBest = quizzesAttempted
    ? Math.round(quizEntries.reduce((sum, q) => sum + (q.best || 0), 0) / quizzesAttempted)
    : null;

  const notesCount = notes.length;

  function bookStats(b) {
    const total = b.readings.length;
    const bDone = b.readings.filter((r) => done[r.n]).length;
    const bQuiz = b.readings.map((r) => quiz[r.n]).filter(Boolean);
    const bAvg = bQuiz.length
      ? Math.round(bQuiz.reduce((sum, q) => sum + (q.best || 0), 0) / bQuiz.length)
      : null;
    return { total, bDone, bAvg };
  }

  const weakQuiz = allReadings
    .filter(({ r }) => quiz[r.n] && quiz[r.n].best < 70)
    .map(({ r, book }) => ({ r, book, reason: "quiz " + quiz[r.n].best + "%", tone: "red" }));

  const weakUnstarted = allReadings
    .filter(({ r }) => r.hy >= 4 && !done[r.n])
    .map(({ r, book }) => ({ r, book, reason: r.hy + "★ not started", tone: "amber" }));

  const weakAreas = [...weakQuiz, ...weakUnstarted];

  function handleExport() {
    const json = exportState();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frm2-backup.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importState(String(reader.result));
      } catch (err) {
        alert("Import failed: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (!window.confirm("Reset ALL data — progress, quiz scores, notes, highlights, review history, mock exams and your exam date? This cannot be undone.")) return;
    importState(JSON.stringify({ v: 1, done: {}, quiz: {}, notes: [], srs: {} }));
  }

  return (
    <main className="page">
      <div className="kicker" style={{ color: "var(--accent)" }}>Your progress</div>
      <h1>Progress</h1>
      <p className="lead">Track completion, quiz performance, and where to focus review.</p>

      <div className="stat-row">
        <div className="stat"><div className="n">{doneCount}/{totalReadings}</div><div className="l">Readings done</div></div>
        <div className="stat"><div className="n">{avgBest == null ? "—" : avgBest + "%"}</div><div className="l">Avg best quiz score</div></div>
        <div className="stat"><div className="n">{quizzesAttempted}</div><div className="l">Quizzes attempted</div></div>
        <div className="stat"><div className="n">{notesCount}</div><div className="l">Notes</div></div>
        <div className="stat"><div className="n">{highlightsCount}</div><div className="l">Highlights</div></div>
      </div>

      <div className="section-label"><span className="dot" style={{ background: "var(--accent)" }} />By book</div>
      <div className="grid2">
        {META.books.map((b) => {
          const { total, bDone, bAvg } = bookStats(b);
          return (
            <Link key={b.n} to={bpath(b.n)} className="card" style={{ display: "block", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: b.color, display: "inline-block" }} />
                <strong style={{ color: "var(--text)" }}>Book {b.n} · {b.short}</strong>
              </div>
              <Progress value={total ? (bDone / total) * 100 : 0} color={b.color} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "var(--text-dim)", marginTop: "0.45rem" }}>
                <span>{bDone}/{total} readings</span>
                <span>{bAvg == null ? "no quizzes yet" : "avg " + bAvg + "%"}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="section-label"><span className="dot" style={{ background: "var(--red)" }} />Weak areas</div>
      {weakAreas.length === 0 ? (
        <p style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>Nothing flagged — no low quiz scores and no high-yield readings left untouched.</p>
      ) : (
        <div>
          {weakAreas.map(({ r, book, reason, tone }, i) => (
            <Link key={r.n + "-" + i} to={rpath(r.n)} className="reading-row">
              <span className="r-num" style={{ color: book.color }}>R{r.n}</span>
              <span className="r-title">{r.t}</span>
              <Badge tone={tone}>{reason}</Badge>
            </Link>
          ))}
        </div>
      )}

      <div className="section-label"><span className="dot" style={{ background: "var(--purple)" }} />Data</div>
      <div className="card">
        <h3>Backup &amp; reset</h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-dim)" }}>
          Your progress lives only in this browser. Export a backup to keep it safe, or import one to restore.
        </p>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
          <Button variant="default" onClick={handleExport}>Export backup</Button>
          <Button variant="outline" onClick={() => fileRef.current && fileRef.current.click()}>Import backup</Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={handleImportFile}
          />
          <Button variant="danger" onClick={handleReset}>Reset all progress</Button>
        </div>
      </div>
    </main>
  );
}
