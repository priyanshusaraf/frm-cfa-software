import { useMemo } from "react";
import { Link } from "react-router-dom";
import { META, rpath } from "../lib/meta.js";
import { useStore, setExamDate } from "../lib/store.js";
import { stars } from "../lib/html.js";
import Html from "../components/Html.jsx";

/* Curriculum order, with the priority stars used as an effort weight:
   a 5-star reading gets ~2.5x the study time of a 2-star one. */
function allReadingsOrdered() {
  const out = [];
  META.books.forEach((b) => b.readings.forEach((r) => out.push({ ...r, book: b })));
  out.sort((a, b) => a.n - b.n);
  return out;
}

const DAY = 86400e3;

function midnight(t) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/* Distribute the not-done readings (curriculum order) over the study window so
   every day carries roughly equal star-weight. The final stretch before the exam
   is reserved for full-curriculum revision, not first passes. */
function buildPlan({ examDate, done }) {
  const today = midnight(Date.now());
  const exam = midnight(new Date(examDate + "T00:00:00").getTime());
  const daysToExam = Math.round((exam - today) / DAY);
  if (isNaN(exam) || daysToExam <= 0) return { daysToExam: isNaN(exam) ? 0 : daysToExam, days: [], reviewDays: 0, remaining: [] };

  const remaining = allReadingsOrdered().filter((r) => !done[r.n]);
  const reviewDays = Math.min(10, Math.max(1, Math.floor(daysToExam * 0.15)));
  const studyDays = Math.max(1, daysToExam - reviewDays);

  const totalW = remaining.reduce((s, r) => s + (r.hy || 3), 0);
  const perDay = totalW / studyDays;

  const days = [];
  let queue = remaining.slice();
  for (let i = 0; i < studyDays; i++) {
    const date = today + i * DAY;
    const target = perDay * (i + 1);
    const doneW = remaining.slice(0, remaining.length - queue.length).reduce((s, r) => s + (r.hy || 3), 0);
    let w = doneW;
    const todays = [];
    while (queue.length && (w < target || todays.length === 0)) {
      // stop rather than overshoot badly, but never leave a day empty while work remains
      if (todays.length > 0 && w + (queue[0].hy || 3) > target + (queue[0].hy || 3) / 2) break;
      const r = queue.shift();
      w += r.hy || 3;
      todays.push(r);
    }
    days.push({ date, readings: todays });
    if (!queue.length) break;
  }
  // Anything the loop didn't place (rounding) goes on the last study day.
  if (queue.length && days.length) days[days.length - 1].readings.push(...queue);

  return { daysToExam, days, reviewDays, remaining };
}

function fmtDay(t) {
  return new Date(t).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function Planner() {
  const examDate = useStore((s) => (s.planner && s.planner.examDate) || "");
  const done = useStore((s) => s.done);

  const plan = useMemo(() => (examDate ? buildPlan({ examDate, done }) : null), [examDate, done]);

  const total = useMemo(() => allReadingsOrdered().length, []);
  const doneCount = Object.keys(done).length;

  const status = useMemo(() => {
    if (!plan || !plan.days.length) return null;
    return { pace: (plan.remaining.length / Math.max(1, plan.daysToExam - plan.reviewDays)).toFixed(1) };
  }, [plan]);

  return (
    <main className="page">
      <h1>Study planner</h1>
      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: "0.25rem 0 1rem" }}>
        Set your exam date and the planner spreads every reading you haven&rsquo;t marked done across the
        days remaining — weighted by exam priority (a ★★★★★ reading gets more of a day than a ★★).
        The last stretch is reserved for full revision. Mark readings done and the plan re-balances.
      </p>

      <div className="card" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
        <label style={{ fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Exam date
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={{
              padding: "0.4rem 0.6rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-inset)",
              color: "var(--text)",
              font: "inherit",
              fontSize: "0.88rem",
            }}
          />
        </label>
        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontFamily: "var(--font-mono, monospace)" }}>
          {doneCount}/{total} readings done
        </span>
        {plan && plan.daysToExam > 0 && (
          <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontFamily: "var(--font-mono, monospace)" }}>
            {plan.daysToExam} days to exam · {plan.remaining.length} readings left
            {status ? <> · ~{status.pace} readings/day</> : null}
          </span>
        )}
      </div>

      {!examDate && (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          Pick your exam date above to generate a day-by-day plan.
        </div>
      )}

      {plan && examDate && plan.daysToExam <= 0 && (
        <div className="card" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
          That date is today or in the past — set a future exam date.
        </div>
      )}

      {plan && plan.daysToExam > 0 && plan.remaining.length === 0 && (
        <div className="card" style={{ fontSize: "0.95rem" }}>
          🎉 Every reading is marked done. Spend the remaining {plan.daysToExam} days on the{" "}
          <Link to="/review">review queue</Link>, <Link to="/drills">calculation drills</Link> and the{" "}
          <Link to="/formulas">formula sheet</Link>.
        </div>
      )}

      {plan && plan.daysToExam > 0 && plan.remaining.length > 0 && (
        <>
          {plan.days.map((d, i) => {
            const isToday = i === 0;
            return (
              <div
                key={d.date}
                className="card"
                style={{
                  marginBottom: "0.6rem",
                  borderLeft: isToday ? "3px solid var(--accent)" : undefined,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem" }}>
                  <strong style={{ fontSize: "0.9rem", color: isToday ? "var(--accent)" : undefined }}>
                    {isToday ? "Today — " : ""}{fmtDay(d.date)}
                  </strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
                    {d.readings.length} reading{d.readings.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul style={{ margin: "0.4rem 0 0", paddingLeft: "1.1rem" }}>
                  {d.readings.map((r) => (
                    <li key={r.n} style={{ fontSize: "0.88rem", margin: "0.2rem 0" }}>
                      <Link to={rpath(r.n)} style={{ color: r.book.color }}>R{r.n} · {r.t}</Link>{" "}
                      <Html as="span" html={stars(r.hy || 3)} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="card" style={{ marginTop: "0.75rem", borderLeft: "3px solid var(--amber, #d97706)" }}>
            <strong style={{ fontSize: "0.9rem" }}>Final {plan.reviewDays} day{plan.reviewDays === 1 ? "" : "s"} — revision block</strong>
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
