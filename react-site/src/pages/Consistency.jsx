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

  // colour a cell by intensity using theme accent opacity tiers
  const cellColor = (count, inFuture) => {
    if (inFuture) return "transparent";
    if (!count) return "var(--bg-inset)";
    if (count >= 8) return "var(--accent)";
    if (count >= 4) return "var(--accent)";
    return "var(--accent-soft)";
  };
  const cellOpacity = (count) => (count >= 8 ? 1 : count >= 4 ? 0.7 : 1);

  const CELL = 12, GAP = 3;

  return (
    <main className="page">
      <div className="crumbs"><Link to="/">Home</Link> / Consistency</div>
      <h1>Consistency</h1>
      <p className="lead">
        Studying a little every day beats cramming. This tracks the days you showed up, derived from
        your activity across readings, quizzes, notes, highlights, and mock exams.
      </p>

      <div className="stat-row" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", margin: "1rem 0 1.4rem" }}>
        <div className="stat card" style={{ minWidth: 120 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-mono, monospace)" }}>{stats.current}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>day streak</div>
        </div>
        <div className="stat card" style={{ minWidth: 120 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-mono, monospace)" }}>{stats.longest}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>longest streak</div>
        </div>
        <div className="stat card" style={{ minWidth: 120 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-mono, monospace)" }}>{stats.activeDays}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>active days</div>
        </div>
        <div className="stat card" style={{ minWidth: 120 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-mono, monospace)" }}>{doneCount}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>readings done</div>
        </div>
      </div>

      <div className="section-label" style={{ color: "var(--accent)" }}>Last 26 weeks</div>
      <div className="card" style={{ overflowX: "auto" }}>
        {total ? (
          <svg
            width={grid.length * (CELL + GAP)}
            height={7 * (CELL + GAP) + 4}
            style={{ display: "block" }}
            role="img"
            aria-label="Study activity heatmap"
          >
            {grid.map((col, w) =>
              col.map((cell, d) => (
                <rect
                  key={cell.key}
                  x={w * (CELL + GAP)}
                  y={d * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={cellColor(cell.count, cell.inFuture)}
                  fillOpacity={cell.inFuture ? 0 : cellOpacity(cell.count)}
                  stroke={cell.inFuture ? "none" : "var(--border)"}
                  strokeWidth={0.5}
                >
                  {!cell.inFuture && <title>{cell.key}: {cell.count} action{cell.count === 1 ? "" : "s"}</title>}
                </rect>
              ))
            )}
          </svg>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: 0 }}>
            No activity yet. Open a reading, take a quiz, or add a note, and your streak starts here.
          </p>
        )}
      </div>

      {/* The pace sentence reads as broken at zero ("About 0 readings per active day"),
          so with no activity yet only the encouragement half is worth showing. */}
      <p style={{ fontSize: "0.82rem", color: "var(--text-faint)", marginTop: "0.6rem" }}>
        {pace > 0 && <>About {pace} readings marked done per active day. </>}
        Aim for a green square every day; consistency compounds far better than a weekend of cramming.
      </p>
    </main>
  );
}
