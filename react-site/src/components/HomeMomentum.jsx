import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../lib/store.js";
import { activityByDay, streakInfo, heatmapGrid } from "../lib/consistency.js";
import { META } from "../lib/meta.js";
import Progress from "./ui/progress.jsx";

/* The two motivating views (streak + per-book completion) surfaced on the home
   page, so opening the app shows you where you stand instead of making you go
   look for it. Deliberately a SUMMARY, not a copy of either page: 13 weeks
   rather than 26, no legend, and both halves link through to the real page.

   It renders even at zero, because "0 day streak" with a line telling you how to
   start is the motivating case, not an empty one worth hiding. */

const CELL = 10, GAP = 3, STEP = CELL + GAP, WEEKS = 13;

const LEVELS = [
  "color-mix(in srgb, var(--green) 22%, var(--bg-inset))",
  "color-mix(in srgb, var(--green) 45%, var(--bg-inset))",
  "color-mix(in srgb, var(--green) 72%, var(--bg-inset))",
  "var(--green)",
];
const levelOf = (c) => (c >= 8 ? 3 : c >= 4 ? 2 : c >= 2 ? 1 : 0);

export default function HomeMomentum() {
  // #185-safe: raw slices out of the store, derived data inside useMemo.
  const activity = useStore((s) => s.activity);
  const quiz = useStore((s) => s.quiz);
  const notes = useStore((s) => s.notes);
  const highlights = useStore((s) => s.highlights);
  const mocks = useStore((s) => s.mocks);
  const bookmarks = useStore((s) => s.bookmarks);
  const lastVisited = useStore((s) => s.lastVisited);
  const done = useStore((s) => s.done);

  const { stats, grid, total, perBook } = useMemo(() => {
    const counts = activityByDay({ activity, quiz, notes, highlights, mocks, bookmarks, lastVisited });
    const d = done || {};
    return {
      stats: streakInfo(counts),
      grid: heatmapGrid(counts).slice(-WEEKS),
      total: Object.values(counts).reduce((a, b) => a + b, 0),
      perBook: META.books.map((b) => {
        const n = b.readings.length;
        return { b, n, done: b.readings.filter((r) => d[r.n]).length };
      }),
    };
  }, [activity, quiz, notes, highlights, mocks, bookmarks, lastVisited, done]);

  return (
    <div className="momentum">
      <section className="card momentum-streak">
        <div className="momentum-head">
          <span className="momentum-title">Consistency</span>
          <Link to="/consistency" className="momentum-more">Open ↗</Link>
        </div>
        <div className="momentum-nums">
          <div><span className="mn">{stats.current}</span><span className="ml">day streak</span></div>
          <div><span className="mn">{stats.longest}</span><span className="ml">longest</span></div>
          <div><span className="mn">{stats.activeDays}</span><span className="ml">active days</span></div>
        </div>
        <svg
          width={WEEKS * STEP}
          height={7 * STEP}
          role="img"
          aria-label={"Study activity over the last " + WEEKS + " weeks"}
          className="momentum-heat"
        >
          {grid.map((col, w) =>
            col.map((cell, d) => (
              <rect
                key={cell.key}
                x={w * STEP} y={d * STEP} width={CELL} height={CELL} rx={2}
                fill={cell.inFuture ? "transparent" : (cell.count ? LEVELS[levelOf(cell.count)] : "var(--bg-inset)")}
                stroke={cell.inFuture ? "none" : "var(--border)"}
                strokeWidth={0.5}
              />
            ))
          )}
        </svg>
        <p className="momentum-note">
          {total
            ? "Every square is a day you showed up."
            : "Open a reading or take a quiz and your first square lands today."}
        </p>
      </section>

      <section className="card momentum-progress">
        <div className="momentum-head">
          <span className="momentum-title">Progress</span>
          <Link to="/progress" className="momentum-more">Open ↗</Link>
        </div>
        <div className="momentum-books">
          {perBook.map(({ b, n, done: bd }) => (
            <Link key={b.n} to={"/book/" + b.n} className="momentum-book">
              <div className="mb-row">
                <span className="mb-name" style={{ color: b.color }}>{b.short || b.title}</span>
                <span className="mb-count">{bd}/{n}</span>
              </div>
              <Progress value={n ? (bd / n) * 100 : 0} color={b.color} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
