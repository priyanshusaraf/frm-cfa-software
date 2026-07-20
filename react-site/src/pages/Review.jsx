import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { META, readingMeta, rpath } from "../lib/meta.js";
import { useAllReadings } from "../lib/readings.js";
import { useStore, dueCards, gradeCard } from "../lib/store.js";
import Html from "../components/Html.jsx";
import Button from "../components/ui/button.jsx";

export const SOURCE_KINDS = [
  { key: "recall", label: "Recall Q&A" },
  { key: "highYield", label: "High-yield facts" },
  { key: "lists", label: "List order (why?)" },
  { key: "foundations", label: "Foundational prerequisites" },
];

/* Build every reviewable card, across all readings and every enabled source
   kind. IDs are namespaced per kind ("rn:i" recall, "rn:hy:i" highYield,
   "rn:list:id" lists) so SRS state (keyed on cardId) never collides across
   kinds — `srs`/`gradeCard` are already id-agnostic strings. */
function useAllCards(readingsMap, sources) {
  return useMemo(() => {
    if (!readingsMap) return [];
    const cards = [];
    for (const b of META.books) {
      for (const r of b.readings) {
        const d = readingsMap[r.n];
        if (!d) continue;
        const meta = readingMeta(r.n);
        const tags = d.topicTags || [];
        if (sources.includes("recall") && d.recall) {
          d.recall.forEach((c, i) => {
            cards.push({ id: r.n + ":" + i, rn: r.n, book: b, meta, tags, kind: "recall", q: c.q, a: c.a });
          });
        }
        if (sources.includes("highYield") && d.highYield) {
          d.highYield.forEach((y, i) => {
            cards.push({
              id: r.n + ":hy:" + i, rn: r.n, book: b, meta, tags, kind: "highYield",
              q: y.what, a: y.why || "",
            });
          });
        }
        if (sources.includes("lists") && d.lists) {
          d.lists.forEach((l) => {
            cards.push({
              id: r.n + ":list:" + l.id, rn: r.n, book: b, meta, tags, kind: "lists",
              q: `Why is "${l.title}" ordered this way?`, a: l.axis,
            });
          });
        }
        /* Foundational-prerequisite cards (CLAUDE.md §7.1): reuse each reading's
           existing connections.from entries verbatim (already-authored, sourced
           `why` text) rather than authoring new prerequisite content — a reading
           already declares what earlier reading it assumes and why. */
        if (sources.includes("foundations") && d.connections && d.connections.from) {
          d.connections.from.forEach((c, i) => {
            if (!c.r) return;
            const prereqMeta = readingMeta(c.r);
            cards.push({
              id: r.n + ":prereq:" + i, rn: r.n, book: b, meta, tags, kind: "foundations",
              prereqRn: c.r, prereqMeta,
              q: `Before R${r.n} (${meta ? meta.t : ""}), what should you already remember from R${c.r}${prereqMeta ? " (" + prereqMeta.t + ")" : ""}?`,
              a: c.why,
            });
          });
        }
      }
    }
    return cards;
  }, [readingsMap, sources]);
}

export default function Review() {
  useEffect(() => { document.title = "Review — FRM Part II"; }, []);

  const readingsMap = useAllReadings();
  const [sourceFilter, setSourceFilter] = useState(["recall", "highYield", "lists", "foundations"]);
  const allCards = useAllCards(readingsMap, sourceFilter);
  const srs = useStore((s) => s.srs);
  const [bookFilter, setBookFilter] = useState([]); // array of book numbers, empty = all
  const [tagFilter, setTagFilter] = useState([]); // array of topicTags, empty = all
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [cursor, setCursor] = useState(0); // forces re-pick after grading

  const allTags = useMemo(() => {
    const s = new Set();
    for (const c of allCards) for (const t of c.tags) s.add(t);
    return [...s].sort();
  }, [allCards]);

  const filteredCards = useMemo(() => {
    return allCards.filter((c) => {
      if (bookFilter.length && !bookFilter.includes(c.book.n)) return false;
      if (tagFilter.length && !c.tags.some((t) => tagFilter.includes(t))) return false;
      return true;
    });
  }, [allCards, bookFilter, tagFilter]);

  const allIds = useMemo(() => filteredCards.map((c) => c.id), [filteredCards]);
  const dueIds = useMemo(() => dueCards(allIds), [allIds, srs, cursor]);

  const current = dueIds.length ? filteredCards.find((c) => c.id === dueIds[0]) : null;

  const soonestDue = useMemo(() => {
    if (dueIds.length) return null;
    let min = null;
    for (const id of allIds) {
      const c = srs[id];
      if (c && c.due && (min === null || c.due < min)) min = c.due;
    }
    return min;
  }, [allIds, srs, dueIds]);

  const grade = useCallback((g) => {
    if (!current) return;
    gradeCard(current.id, g);
    setReviewed((n) => n + 1);
    setRevealed(false);
    setCursor((n) => n + 1);
  }, [current]);

  useEffect(() => {
    function onKey(e) {
      if (!current) return;
      if (e.code === "Space") {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && ["1", "2", "3", "4"].includes(e.key)) {
        grade(Number(e.key) - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, revealed, grade]);

  function toggleBook(n) {
    setBookFilter((f) => (f.includes(n) ? f.filter((x) => x !== n) : [...f, n]));
    setRevealed(false);
  }
  function toggleTag(t) {
    setTagFilter((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));
    setRevealed(false);
  }
  function toggleSource(key) {
    setSourceFilter((f) => {
      const next = f.includes(key) ? f.filter((x) => x !== key) : [...f, key];
      return next.length ? next : f; // never let it go empty
    });
    setRevealed(false);
    setCursor((n) => n + 1);
  }

  return (
    <main className="page">
      <div className="kicker" style={{ color: "var(--accent)" }}>Spaced repetition</div>
      <h1>Review</h1>
      <p className="lead">Active recall over every card in the curriculum, scheduled by how well you know it.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "1rem 0 0.5rem" }}>
        <span style={{ fontSize: "0.82rem", color: "var(--text-dim)", alignSelf: "center" }}>Card types:</span>
        {SOURCE_KINDS.map((s) => (
          <button
            key={s.key}
            className="chip"
            style={{
              cursor: "pointer",
              border: "1px solid " + (sourceFilter.includes(s.key) ? "var(--accent)" : "var(--border)"),
              color: sourceFilter.includes(s.key) ? "var(--accent)" : "var(--text-dim)",
            }}
            onClick={() => toggleSource(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0 0 0.5rem" }}>
        <span style={{ fontSize: "0.82rem", color: "var(--text-dim)", alignSelf: "center" }}>Filter to books:</span>
        {META.books.map((b) => (
          <button
            key={b.n}
            className="chip"
            style={{
              cursor: "pointer",
              border: "1px solid " + (bookFilter.includes(b.n) ? b.color : "var(--border)"),
              color: bookFilter.includes(b.n) ? b.color : "var(--text-dim)",
            }}
            onClick={() => toggleBook(b.n)}
          >
            B{b.n} {b.short}
          </button>
        ))}
      </div>

      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "0 0 1rem" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-dim)", alignSelf: "center" }}>Topics:</span>
          {allTags.map((t) => (
            <button
              key={t}
              className="chip"
              style={{
                cursor: "pointer",
                border: "1px solid " + (tagFilter.includes(t) ? "var(--purple)" : "var(--border)"),
                color: tagFilter.includes(t) ? "var(--purple)" : "var(--text-dim)",
              }}
              onClick={() => toggleTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <p style={{ fontSize: "0.88rem", color: "var(--text-dim)" }}>
        {dueIds.length} card{dueIds.length === 1 ? "" : "s"} due today · {reviewed} reviewed this session
      </p>

      {!readingsMap ? (
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      ) : !current ? (
        <div className="card">
          <h3>All caught up</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>
            {soonestDue
              ? "Next cards due " + new Date(soonestDue).toLocaleString()
              : "No cards scheduled yet — reviewing will start building your queue."}
          </p>
        </div>
      ) : (
        <div className="card">
          <div className="kicker" style={{ color: current.book.color, display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {current.kind === "foundations" ? (
              <Link to={rpath(current.prereqRn)} style={{ color: current.book.color }}>
                R{current.prereqRn} · {current.prereqMeta ? current.prereqMeta.t : ""}
              </Link>
            ) : (
              <Link to={rpath(current.rn)} style={{ color: current.book.color }}>
                R{current.rn} · {current.meta ? current.meta.t : ""}
              </Link>
            )}
            <span style={{ fontSize: "0.72rem", color: "var(--text-faint)", textTransform: "none" }}>
              {SOURCE_KINDS.find((s) => s.key === current.kind)?.label}
            </span>
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 600, margin: "0.6rem 0" }}>
            <Html as="span" html={current.q} />
          </div>

          {!revealed ? (
            <Button variant="default" onClick={() => setRevealed(true)}>Show answer</Button>
          ) : (
            <>
              <div style={{ fontSize: "0.95rem", color: "var(--text-dim)", margin: "0.6rem 0 1rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border)" }}>
                <Html as="span" html={current.a} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Button variant="danger" onClick={() => grade(0)}>Again</Button>
                <Button variant="outline" onClick={() => grade(1)}>Hard</Button>
                <Button variant="default" onClick={() => grade(2)}>Good</Button>
                <Button variant="solid" onClick={() => grade(3)}>Easy</Button>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
