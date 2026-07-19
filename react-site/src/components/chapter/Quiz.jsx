import { useEffect, useMemo, useRef, useState } from "react";
import Html from "../Html.jsx";
import Button from "../ui/button.jsx";
import { useStore, recordQuiz, addNote } from "../../lib/store.js";

const LETTERS = ["A", "B", "C", "D"];

function strip(html) {
  const d = document.createElement("div");
  d.innerHTML = html || "";
  return d.textContent || "";
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Builds a shuffled question order, and per-question shuffled options with
// the correct-answer index tracked through the shuffle.
function buildRound(quiz) {
  const order = shuffle(quiz.map((_, i) => i));
  return order.map((qi) => {
    const q = quiz[qi];
    const optOrder = shuffle(q.options.map((_, i) => i));
    const answerPos = optOrder.indexOf(q.answer);
    return {
      qi,
      q: q.q,
      why: q.why,
      options: optOrder.map((oi) => q.options[oi]),
      answer: answerPos,
    };
  });
}

// Builds a round restricted to a subset of original question indices (for
// "retake wrong only"), keeping their original qi so error logging / re-scoring
// still maps back correctly.
function buildPartialRound(quiz, qis) {
  const order = shuffle(qis);
  return order.map((qi) => {
    const q = quiz[qi];
    const optOrder = shuffle(q.options.map((_, i) => i));
    const answerPos = optOrder.indexOf(q.answer);
    return {
      qi,
      q: q.q,
      why: q.why,
      options: optOrder.map((oi) => q.options[oi]),
      answer: answerPos,
    };
  });
}

export default function Quiz({ rn, quiz }) {
  const scoreInfo = useStore((s) => s.quiz[rn]);
  const [round, setRound] = useState(() => buildRound(quiz));
  const [isPartial, setIsPartial] = useState(false);
  const [picks, setPicks] = useState({}); // index in round -> chosen option index
  const [logged, setLogged] = useState({}); // original question index (qi) -> true once sent to error log
  const recordedRef = useRef(false);
  const cardRefs = useRef([]);

  const answeredCount = Object.keys(picks).length;
  const total = round.length;
  const allAnswered = total > 0 && answeredCount === total;

  const correctCount = useMemo(
    () => round.reduce((n, item, i) => n + (picks[i] === item.answer ? 1 : 0), 0),
    [round, picks]
  );
  const pct = total ? Math.round((correctCount / total) * 100) : 0;

  const wrongQis = useMemo(
    () => round.filter((item, i) => picks[i] != null && picks[i] !== item.answer).map((item) => item.qi),
    [round, picks]
  );

  useEffect(() => {
    // Only full-quiz rounds (not "retake wrong only" partial rounds) ever
    // overwrite the recorded best/last score.
    if (allAnswered && !isPartial && !recordedRef.current) {
      recordedRef.current = true;
      recordQuiz(rn, pct);
    }
  }, [allAnswered, isPartial, pct, rn]);

  function choose(itemIndex, optIndex) {
    setPicks((prev) => {
      if (prev[itemIndex] != null) return prev;
      return { ...prev, [itemIndex]: optIndex };
    });
  }

  function retake() {
    setRound(buildRound(quiz));
    setIsPartial(false);
    setPicks({});
    recordedRef.current = false;
  }

  function retakeWrongOnly() {
    if (!wrongQis.length) return;
    setRound(buildPartialRound(quiz, wrongQis));
    setIsPartial(true);
    setPicks({});
    recordedRef.current = false;
  }

  function logError(item, picked) {
    addNote({
      rn,
      section: "Quiz",
      quote: strip(item.q),
      text:
        "I picked “" + strip(item.options[picked]) + "”; correct is “" +
        strip(item.options[item.answer]) + "”. " + strip(item.why || ""),
      kind: "error",
    });
    setLogged((prev) => ({ ...prev, [item.qi]: true }));
  }

  useEffect(() => {
    function onKey(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const idx = "1234abcd".indexOf(e.key.toLowerCase());
      if (idx === -1) return;
      const optIndex = idx % 4;
      const firstUnanswered = round.findIndex((_, i) => picks[i] == null);
      if (firstUnanswered === -1) return;
      choose(firstUnanswered, optIndex);
      cardRefs.current[firstUnanswered]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, picks]);

  if (!quiz || !quiz.length) return null;

  return (
    <div className="pb-16">
      <div className="flex flex-col gap-3">
        {round.map((item, i) => {
          const picked = picks[i];
          const isAnswered = picked != null;
          return (
            <div
              key={item.qi}
              ref={(el) => (cardRefs.current[i] = el)}
              className="card border border-line rounded-card bg-raised p-4"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-faint text-[0.78rem] font-mono">{i + 1}.</span>
                <Html as="span" html={item.q} className="text-ink text-[0.95rem] leading-snug" />
              </div>
              <div className="grid gap-1.5">
                {item.options.map((opt, oi) => {
                  let state = "idle";
                  if (isAnswered) {
                    if (oi === item.answer) state = "correct";
                    else if (oi === picked) state = "wrong";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => choose(i, oi)}
                      className={
                        "flex items-start gap-2 text-left rounded-el border px-3 py-2 text-[0.88rem] transition-colors " +
                        (state === "correct"
                          ? "border-green bg-green-soft text-ink"
                          : state === "wrong"
                          ? "border-red bg-red-soft text-ink"
                          : isAnswered
                          ? "border-line text-faint"
                          : "border-line text-dim hover:border-linestrong hover:bg-hovered hover:text-ink cursor-pointer")
                      }
                    >
                      <span className="font-mono text-[0.78rem] text-faint shrink-0">{LETTERS[oi]}</span>
                      <Html as="span" html={opt} />
                    </button>
                  );
                })}
              </div>
              {isAnswered && item.why && (
                <div className="mt-2.5 pt-2.5 border-t border-line text-[0.85rem] text-dim">
                  <Html as="span" html={item.why} />
                </div>
              )}
              {isAnswered && picked !== item.answer && (
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={!!logged[item.qi]}
                    onClick={() => logError(item, picked)}
                    className={
                      "rounded-el border px-2.5 py-1 text-[0.78rem] transition-colors " +
                      (logged[item.qi]
                        ? "border-line text-faint cursor-default"
                        : "border-red text-red hover:bg-red-soft cursor-pointer")
                    }
                  >
                    {logged[item.qi] ? "✓ In error log" : "Log to error log"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 bg-raised border border-line rounded-card shadow-card px-4 py-2 my-3">
          <span className="text-[0.8rem] text-dim font-mono">
            answered {answeredCount}/{total}
          </span>
          {allAnswered && (
            <span className="text-[0.8rem] font-semibold text-accent">score {pct}%</span>
          )}
          {scoreInfo && (
            <span className="text-[0.75rem] text-faint">
              Best {scoreInfo.best}% · Last {scoreInfo.last}%
            </span>
          )}
          {allAnswered && (
            <Button size="sm" variant="outline" onClick={retake}>
              Retake
            </Button>
          )}
          {allAnswered && wrongQis.length > 0 && (
            <Button size="sm" variant="outline" onClick={retakeWrongOnly}>
              Retake wrong only ({wrongQis.length})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
