import { useMemo } from "react";
import { Link } from "react-router-dom";
import { rpath } from "../lib/meta.js";
import { useStore, setExamDate, setStartDate } from "../lib/store.js";
import { stars } from "../lib/html.js";
import Html from "../components/Html.jsx";
import { orderedReadings, buildBlocks, scheduleBlocks } from "../lib/studyPath.js";
import { blockEligibility } from "../lib/blockEligibility.js";

const DAY = 86400e3;

function todayStr() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + day;
}

function dayMs(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function fmtDay(t) {
  return new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const inputStyle = {
  padding: "0.4rem 0.6rem",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  background: "var(--bg-inset)",
  color: "var(--text)",
  font: "inherit",
  fontSize: "0.88rem",
};
const monoNote = { fontSize: "0.85rem", color: "var(--text-dim)", fontFamily: "var(--font-mono, monospace)" };

export default function Planner() {
  const examDate = useStore((s) => (s.planner && s.planner.examDate) || "");
  const startDate = useStore((s) => (s.planner && s.planner.startDate) || "");
  const done = useStore((s) => s.done);

  const effStart = startDate || todayStr();

  /* Reading lookup (study order carries book color + title + stars). */
  const byN = useMemo(() => {
    const m = new Map();
    orderedReadings().forEach((r) => m.set(r.n, r));
    return m;
  }, []);
  const total = byN.size;
  const doneCount = Object.keys(done).length;

  const plan = useMemo(
    () => (examDate ? scheduleBlocks({ startDate: effStart, examDate, done }) : null),
    [examDate, effStart, done]
  );

  const startMs = useMemo(() => dayMs(effStart), [effStart]);

  /* Block Review: surface a CTA for every block whose readings are all done.
     buildBlocks() and blockEligibility() are both pure/cheap. */
  const finishedBlocks = useMemo(
    () => blockEligibility(buildBlocks(), done).filter((e) => e.allDone),
    [done]
  );

  const remainingCount = plan ? plan.scheduled.reduce(
    (s, x) => s + x.block.readings.filter((n) => !done[n]).length, 0) : 0;

  return (
    <main className="page">
      <h1>Study planner</h1>
      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: "0.25rem 0 1rem" }}>
        The planner groups every reading into cohesive blocks, one idea to learn and consolidate
        together, and packs whole blocks into the days before your exam, weighted by exam priority
        (a ★★★★★ block gets more of the window than a ★★). Each block stays contiguous, never split
        across a long gap. The last stretch is reserved for full revision. Mark readings done and the
        plan re-balances.
      </p>

      <div className="card" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
        <label style={{ fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Start
          <input type="date" value={startDate} max={examDate || undefined}
            onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Exam date
          <input type="date" value={examDate} min={effStart}
            onChange={(e) => setExamDate(e.target.value)} style={inputStyle} />
        </label>
        <span style={monoNote}>{doneCount}/{total} readings done</span>
        {plan && plan.daysToExam > 0 && (
          <span style={monoNote}>
            {plan.daysToExam} days · {plan.scheduled.length} block{plan.scheduled.length === 1 ? "" : "s"} left · {remainingCount} readings
          </span>
        )}
      </div>

      {finishedBlocks.length > 0 && (
        <div className="card" style={{ marginBottom: "1.25rem" }}>
          <div className="section-label"><span className="dot" />Ready to review</div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", margin: "0.35rem 0 0.6rem" }}>
            Every reading in these blocks is marked done. Run a Block Review to consolidate them.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {finishedBlocks.map((e) => (
              <Link key={e.block.id} className="chip" to={"/block-review/" + e.block.id}>
                Review this block: {e.block.name} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {!examDate && (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          Pick your exam date above to generate a block-by-block plan. The start date defaults to today.
        </div>
      )}

      {plan && examDate && plan.daysToExam <= 0 && (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          That exam date is on or before your start date. Set a later exam date.
        </div>
      )}

      {plan && plan.daysToExam > 0 && plan.scheduled.length === 0 && (
        <div className="card" style={{ fontSize: "0.95rem" }}>
          🎉 Every reading is marked done. Spend the remaining {plan.daysToExam} days on the{" "}
          <Link to="/review">review queue</Link>, <Link to="/drills">calculation drills</Link> and the{" "}
          <Link to="/formulas">formula sheet</Link>.
        </div>
      )}

      {plan && plan.daysToExam > 0 && plan.scheduled.length > 0 && (
        <>
          {plan.scheduled.map(({ block, startDay, endDay }, i) => {
            const isFirst = i === 0;
            const from = startMs + startDay * DAY;
            const to = startMs + endDay * DAY;
            const bookColor = (byN.get(block.readings[0]) || {}).book?.color;
            const allDone = block.readings.every((n) => done[n]);
            return (
              <div key={block.id} className="card"
                style={{ marginBottom: "0.6rem", borderLeft: isFirst ? "3px solid var(--accent)" : (bookColor ? "3px solid " + bookColor : undefined) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "0.9rem", color: isFirst ? "var(--accent)" : undefined }}>
                    {isFirst ? "Start here · " : ""}{block.name}
                    {block.kind === "curated-cluster" && (
                      <span className="chip" style={{ marginLeft: "0.5rem", fontSize: "0.7rem", verticalAlign: "middle" }}>cluster</span>
                    )}
                  </strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
                    {fmtDay(from)}{endDay > startDay ? " to " + fmtDay(to) : ""} · {block.readings.length} reading{block.readings.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul style={{ margin: "0.4rem 0 0", paddingLeft: "1.1rem" }}>
                  {block.readings.map((n) => {
                    const r = byN.get(n);
                    if (!r) return null;
                    return (
                      <li key={n} style={{ fontSize: "0.88rem", margin: "0.2rem 0", opacity: done[n] ? 0.5 : 1, textDecoration: done[n] ? "line-through" : undefined }}>
                        <Link to={rpath(n)} style={{ color: r.book.color }}>R{n} · {r.t}</Link>{" "}
                        <Html as="span" html={stars(r.hy || 3)} />
                      </li>
                    );
                  })}
                </ul>
                {allDone && (
                  <Link className="chip" to={"/block-review/" + block.id} style={{ marginTop: "0.5rem", display: "inline-block" }}>
                    Block done: review it →
                  </Link>
                )}
              </div>
            );
          })}
          <div className="card" style={{ marginTop: "0.75rem", borderLeft: "3px solid var(--amber)" }}>
            <strong style={{ fontSize: "0.9rem" }}>Final {plan.reviewDays} day{plan.reviewDays === 1 ? "" : "s"}: revision block</strong>
            <p style={{ fontSize: "0.86rem", color: "var(--text-dim)", margin: "0.35rem 0 0" }}>
              No new readings. Work the <Link to="/review">spaced-repetition queue</Link>, retake the
              quizzes on your weakest readings (see <Link to="/progress">Progress</Link>), run{" "}
              <Link to="/drills">calculation drills</Link>, and read the <Link to="/formulas">formula sheet</Link> end to end.
            </p>
          </div>
        </>
      )}
    </main>
  );
}
