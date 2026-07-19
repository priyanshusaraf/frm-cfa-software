import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { META, readingMeta, rpath } from "../lib/meta.js";
import { useAllReadings } from "../lib/readings.js";
import { useStore, dueCards, gradeCard } from "../lib/store.js";
import Html from "../components/Html.jsx";
import Button from "../components/ui/button.jsx";

/* Build every recall card id ("rn:i") once, across all readings. */
function useAllCards(readingsMap) {
  return useMemo(() => {
    if (!readingsMap) return [];
    const cards = [];
    for (const b of META.books) {
      for (const r of b.readings) {
        const d = readingsMap[r.n];
        if (!d || !d.recall || !d.recall.length) continue;
        d.recall.forEach((c, i) => {
          cards.push({ id: r.n + ":" + i, rn: r.n, book: b, meta: readingMeta(r.n), q: c.q, a: c.a });
        });
      }
    }
    return cards;
  }, [readingsMap]);
}

export default function Review() {
  useEffect(() => { document.title = "Review — FRM Part II"; }, []);

  const readingsMap = useAllReadings();
  const allCards = useAllCards(readingsMap);
  const srs = useStore((s) => s.srs);
  const [bookFilter, setBookFilter] = useState([]); // array of book numbers, empty = all
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [cursor, setCursor] = useState(0); // forces re-pick after grading

  const filteredCards = useMemo(() => {
    if (!bookFilter.length) return allCards;
    return allCards.filter((c) => bookFilter.includes(c.book.n));
  }, [allCards, bookFilter]);

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

  return (
    <main className="page">
      <div className="kicker" style={{ color: "var(--accent)" }}>Spaced repetition</div>
      <h1>Review</h1>
      <p className="lead">Active recall over every card in the curriculum, scheduled by how well you know it.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "1rem 0" }}>
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
          <div className="kicker" style={{ color: current.book.color }}>
            <Link to={rpath(current.rn)} style={{ color: current.book.color }}>
              R{current.rn} · {current.meta ? current.meta.t : ""}
            </Link>
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
