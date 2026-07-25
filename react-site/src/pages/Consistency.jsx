import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../lib/store.js";
import { activityByDay, streakInfo, heatmapGrid } from "../lib/consistency.js";

/* Study-consistency dashboard (learning-coherence §4): a GitHub-style activity
   heatmap + streak/pace tiles, derived from existing store timestamps plus the
   optional `activity` counter. Read-only; no new persistence beyond touchActivity. */
export default function Consistency() {
  useEffect(() => { document.title = "Consistency · FRM Part II"; }, []);

  // raw slices (stable identities, per the #185 rule); build derived data in useMemo
  const activity = useStore((s) => s.activity);
  const quiz = useStore((s) => s.quiz);
  const notes = useStore((s) => s.notes);
  const highlights = useStore((s) => s.highlights);
  const mocks = useStore((s) => s.mocks);
  const bookmarks = useStore((s) => s.bookmarks);
  const lastVisited = useStore((s) => s.lastVisited);
  const done = useStore((s) => s.done);

  const { counts, stats, grid, doneCount } = useMemo(() => {
    const state = { activity, quiz, notes, highlights, mocks, bookmarks, lastVisited };
    const counts = activityByDay(state);
    return {
      counts,
      stats: streakInfo(counts),
      grid: heatmapGrid(counts),
      doneCount: Object.keys(done || {}).length,
    };
  }, [activity, quiz, notes, highlights, mocks, bookmarks, lastVisited, done]);

  const total = counts && Object.values(counts).reduce((a, b) => a + b, 0);
  const pace = stats.activeDays ? (doneCount / stats.activeDays).toFixed(1) : "0";

  /* Four REAL levels. This used to return var(--accent) for both the >=8 and the
     >=4 tier, with only a 0.7 opacity between them, so a 26-week grid had two
     visible states (nothing / something) and read as a dead board. Green, not
     accent-blue, because the caption has always said "green square" and because
     green means "you showed up" rather than "this is a link". */
  const LEVELS = [
    "color-mix(in srgb, var(--green) 22%, var(--bg-inset))",
    "color-mix(in srgb, var(--green) 45%, var(--bg-inset))",
    "color-mix(in srgb, var(--green) 72%, var(--bg-inset))",
    "var(--green)",
  ];
  const levelOf = (c) => (c >= 8 ? 3 : c >= 4 ? 2 : c >= 2 ? 1 : 0);
  const cellColor = (count, inFuture) => {
    if (inFuture) return "transparent";
    if (!count) return "var(--bg-inset)";
    return LEVELS[levelOf(count)];
  };

  const CELL = 12, GAP = 3, STEP = CELL + GAP;
  const GUTTER = 26, HEADER = 16;   // weekday labels on the left, months on top
  const DOW = ["", "Mon", "", "Wed", "", "Fri", ""];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  /* A month label sits above the first column whose week introduces a new month,
     which is what makes 26 anonymous columns readable as a timeline. */
  const monthMarks = useMemo(() => {
    const out = [];
    let last = -1;
    grid.forEach((col, w) => {
      const d = new Date(col[0].key + "T00:00:00");
      if (isNaN(d)) return;
      const m = d.getMonth();
      if (m !== last) { out.push({ w, label: MONTHS[m] }); last = m; }
    });
    return out;
  }, [grid]);

  const fmtDay = (key) => {
    const d = new Date(key + "T00:00:00");
    return isNaN(d) ? key : d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  };

  return (
    <main className="page">
      <div className="crumbs"><Link to="/">Home</Link> / Consistency</div>
      <h1>Consistency</h1>
      <p className="lead">
        Studying a little every day beats cramming. This tracks the days you showed up, derived from
        your activity across readings, quizzes, notes, highlights, and mock exams.
      </p>

      {/* Equal-width grid rather than flex + minWidth: the tiles used to size to
          their own content, so four tiles of different label lengths came out
          ragged. Centred content keeps the numbers on a common axis. */}
      <div className="consistency-tiles">
        {[
          { n: stats.current, l: "day streak" },
          { n: stats.longest, l: "longest streak" },
          { n: stats.activeDays, l: "active days" },
          { n: doneCount, l: "readings done" },
        ].map((t) => (
          <div className="card consistency-tile" key={t.l}>
            <div className="ct-n">{t.n}</div>
            <div className="ct-l">{t.l}</div>
          </div>
        ))}
      </div>

      <div className="section-label" style={{ color: "var(--accent)" }}>Last 26 weeks</div>
      <div className="card" style={{ overflowX: "auto" }}>
        {total ? (<>
          <svg
            width={GUTTER + grid.length * STEP}
            height={HEADER + 7 * STEP}
            style={{ display: "block" }}
            role="img"
            aria-label="Study activity over the last 26 weeks"
          >
            {monthMarks.map((m) => (
              <text
                key={m.w + m.label}
                x={GUTTER + m.w * STEP}
                y={HEADER - 5}
                fontSize={9.5}
                fill="var(--text-faint)"
              >
                {m.label}
              </text>
            ))}
            {DOW.map((d, i) => d && (
              <text
                key={d}
                x={0}
                y={HEADER + i * STEP + CELL - 2}
                fontSize={9.5}
                fill="var(--text-faint)"
              >
                {d}
              </text>
            ))}
            {grid.map((col, w) =>
              col.map((cell, d) => (
                <rect
                  key={cell.key}
                  x={GUTTER + w * STEP}
                  y={HEADER + d * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={cellColor(cell.count, cell.inFuture)}
                  stroke={cell.inFuture ? "none" : "var(--border)"}
                  strokeWidth={0.5}
                >
                  {!cell.inFuture && (
                    <title>{fmtDay(cell.key)}: {cell.count || "no"} action{cell.count === 1 ? "" : "s"}</title>
                  )}
                </rect>
              ))
            )}
          </svg>
          <div className="heat-legend">
            <span>Less</span>
            <span className="hl-sq" style={{ background: "var(--bg-inset)" }} />
            {LEVELS.map((c) => <span className="hl-sq" key={c} style={{ background: c }} />)}
            <span>More</span>
          </div>
        </>) : (
          <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: 0 }}>
            No activity yet. Open a reading, take a quiz, or add a note, and your streak starts here.
          </p>
        )}
      </div>

      {/* The pace sentence reads as broken at zero ("About 0 readings per active day"),
          so with no activity yet only the encouragement half is worth showing. */}
      <p style={{ fontSize: "0.82rem", color: "var(--text-faint)", marginTop: "0.7rem" }}>
        {pace > 0 && <>About {pace} readings marked done per active day. </>}
        Aim for a green square every day; consistency compounds far better than a weekend of cramming.
      </p>
    </main>
  );
}
