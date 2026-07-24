import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buildBlocks } from "../lib/studyPath.js";
import { composeBlockReview } from "../lib/blockReview.js";
import { throughlines } from "../data/blockThroughlines.js";
import { useAllReadings } from "../lib/readings.js";
import { gradeCard, markBlockReviewSeen } from "../lib/store.js";
import { bookOf, rpath } from "../lib/meta.js";
import { stars } from "../lib/html.js";
import Html from "../components/Html.jsx";
import Button from "../components/ui/button.jsx";
import SectionLabel from "../components/chapter/SectionLabel.jsx";

const LETTERS = ["A", "B", "C", "D"];

/* Flatten the three composed atom kinds into one ordered stepper: recall
   cards first (these graduate into SRS), then quiz items, then trap checks
   (both in-session only). Each entry keeps its own kind so renderItem() below
   knows which UI to draw. */
function buildRoundItems(review) {
  if (!review) return [];
  return [
    ...review.recallCards.map((c) => ({ kind: "recall", key: "r:" + c.id, ...c })),
    ...review.quizItems.map((c) => ({ kind: "quiz", key: "q:" + c.rn, ...c })),
    ...review.trapChecks.map((c) => ({ kind: "trap", key: "t:" + c.rn, ...c })),
  ];
}

export default function BlockReview() {
  const { blockId } = useParams();
  useEffect(() => { document.title = "Block review — FRM Part II"; }, []);

  // buildBlocks() is pure/cheap (studyPath.js) — safe to call per blockId change.
  const block = useMemo(() => buildBlocks().find((b) => b.id === blockId), [blockId]);
  const book = block ? bookOf(block.readings[0]) : null;

  const readingsMap = useAllReadings(); // null while loading

  const review = useMemo(() => {
    if (!block || !readingsMap) return null;
    return composeBlockReview(block, readingsMap, throughlines);
  }, [block, readingsMap]);

  const roundItems = useMemo(() => buildRoundItems(review), [review]);

  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [quizPick, setQuizPick] = useState(null);
  const seenFiredRef = useRef(false);

  const roundDone = roundItems.length > 0 ? step >= roundItems.length : !!review;

  // Fire markBlockReviewSeen exactly once per mount, when the round is finished
  // (or there was nothing to review) — guarded so re-renders never re-fire it.
  useEffect(() => {
    if (!block || !roundDone) return;
    if (seenFiredRef.current) return;
    seenFiredRef.current = true;
    markBlockReviewSeen(block.id, Date.now());
  }, [block, roundDone]);

  function next() {
    setStep((s) => s + 1);
    setRevealed(false);
    setQuizPick(null);
  }

  function gradeAndNext(cardId, g) {
    gradeCard(cardId, g); // THE graduation into the existing SRS queue (Review.jsx reads this same srs map)
    next();
  }

  function renderItem(item) {
    if (item.kind === "recall") {
      return (
        <div>
          <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.6rem" }}>
            <Html as="span" html={item.q} />
          </div>
          {!revealed ? (
            <Button variant="default" onClick={() => setRevealed(true)}>Show answer</Button>
          ) : (
            <>
              <div style={{ fontSize: "0.92rem", color: "var(--text-dim)", margin: "0.5rem 0 1rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                <Html as="span" html={item.a} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Button variant="danger" onClick={() => gradeAndNext(item.id, 0)}>Again</Button>
                <Button variant="outline" onClick={() => gradeAndNext(item.id, 1)}>Hard</Button>
                <Button variant="outline" onClick={() => gradeAndNext(item.id, 2)}>Good</Button>
                <Button variant="default" onClick={() => gradeAndNext(item.id, 3)}>Easy</Button>
              </div>
            </>
          )}
        </div>
      );
    }

    if (item.kind === "quiz") {
      const answered = quizPick != null;
      return (
        <div>
          <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.6rem" }}>
            <Html as="span" html={item.q} />
          </div>
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {(item.options || []).map((opt, oi) => {
              let border = "var(--border)";
              let color = "var(--text-dim)";
              if (answered) {
                if (oi === item.answer) { border = "var(--green)"; color = "var(--text)"; }
                else if (oi === quizPick) { border = "var(--red)"; color = "var(--text)"; }
              }
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={answered}
                  onClick={() => setQuizPick(oi)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "0.5rem 0.75rem", borderRadius: "8px",
                    border: "1px solid " + border, background: "var(--bg-inset)",
                    color, fontSize: "0.88rem", cursor: answered ? "default" : "pointer",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.78rem", color: "var(--text-faint)", marginRight: "0.5rem" }}>
                    {LETTERS[oi]}
                  </span>
                  <Html as="span" html={opt} />
                </button>
              );
            })}
          </div>
          {answered && (
            <>
              {item.why ? (
                <div style={{ fontSize: "0.88rem", color: "var(--text-dim)", margin: "0.7rem 0" }}>
                  <Html as="span" html={item.why} />
                </div>
              ) : null}
              <Button variant="default" onClick={next}>Continue</Button>
            </>
          )}
        </div>
      );
    }

    // trap check
    return (
      <div>
        <div style={{ fontSize: "0.78rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
          Spot the trap
        </div>
        <div style={{ fontSize: "0.98rem", fontWeight: 600, marginBottom: "0.6rem" }}>
          <Html as="span" html={item.wrong} />
        </div>
        {!revealed ? (
          <Button variant="default" onClick={() => setRevealed(true)}>Reveal</Button>
        ) : (
          <>
            <div style={{ fontSize: "0.92rem", color: "var(--green)", margin: "0.5rem 0 1rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
              <Html as="span" html={item.right} />
            </div>
            <Button variant="default" onClick={next}>Continue</Button>
          </>
        )}
      </div>
    );
  }

  if (!block) {
    return (
      <main className="page">
        <h1>Block review</h1>
        <p style={{ color: "var(--text-dim)", fontSize: "0.92rem" }}>
          This block is not ready to review yet. Finish its readings first.
        </p>
        <Link to="/planner" className="chip">Back to planner</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="kicker" style={{ color: book ? book.color : "var(--accent)" }}>Block review</div>
      <h1>{block.name}</h1>
      <p className="lead">
        Block review: consolidate these {block.readings.length} reading{block.readings.length === 1 ? "" : "s"}.
      </p>

      {!readingsMap || !review ? (
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      ) : (
        <>
          <SectionLabel txt="Overview" color={book ? book.color : undefined} />
          <Html
            as="p"
            html={review.throughLine.text}
            style={{ color: "var(--text-dim)", fontSize: "0.92rem", margin: "0.5rem 0 1.1rem" }}
          />

          {review.overview.map((o) => (
            <div className="card" key={o.rn} style={{ marginBottom: "0.75rem" }}>
              <Link to={rpath(o.rn)} style={{ color: book ? book.color : "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>
                R{o.rn} · {o.title}
              </Link>
              {o.tagline ? (
                <Html as="p" html={o.tagline} style={{ fontSize: "0.88rem", color: "var(--text-dim)", margin: "0.45rem 0" }} />
              ) : null}
              {o.summary ? (
                <Html as="div" html={o.summary} style={{ fontSize: "0.86rem", color: "var(--text-dim)", margin: "0.45rem 0" }} />
              ) : null}
              {o.topHighYield.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                  {o.topHighYield.map((h, i) => (
                    <span key={i} className="chip" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                      <Html as="span" html={stars(h.stars)} />
                      <Html as="span" html={h.what} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          <SectionLabel txt="Active recall" color={book ? book.color : undefined} />

          {roundItems.length === 0 ? (
            <div className="card">
              <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: 0 }}>
                No recall material is available for this block yet.
              </p>
            </div>
          ) : roundDone ? (
            <div className="card accent">
              <h3 style={{ margin: 0 }}>Block review complete</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", margin: "0.5rem 0 1rem" }}>
                These cards are now in your spaced-repetition queue.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Link to="/review" className="chip">Go to review queue →</Link>
                <Link to="/planner" className="chip">Back to planner</Link>
              </div>
            </div>
          ) : (
            <div className="card">
              <div style={{ fontSize: "0.76rem", color: "var(--text-faint)", marginBottom: "0.6rem", fontFamily: "var(--font-mono, monospace)" }}>
                {step + 1} / {roundItems.length}
              </div>
              {renderItem(roundItems[step])}
            </div>
          )}
        </>
      )}
    </main>
  );
}
