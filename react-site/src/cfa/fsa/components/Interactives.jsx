import React, { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight } from "lucide-react";
import Html from "../../../components/Html.jsx";
import { recordFsaCheck } from "../../../lib/store.js";

/* Small interactive blocks that live inside module prose. All are
   self-contained, keyboard reachable, and grade instantly. CFA Level II item
   sets use THREE options (A, B, C), so every multiple-choice block here does
   too; options are NOT shuffled, so a `why` may never refer to a letter. */

export function ConceptCheck({ id, q, options, answer, why }) {
  const [pick, setPick] = useState(null);
  const done = pick != null;
  return (
    <div className="fsa-check-q">
      <div className="fsa-cq-tag">Check yourself</div>
      <Html className="fsa-cq-q" html={q} />
      <div className="fsa-cq-opts">
        {options.map((o, i) => {
          const st = !done ? "" : i === answer ? " ok" : i === pick ? " bad" : " dim";
          return (
            <button
              type="button"
              key={i}
              className={"fsa-cq-opt" + st}
              disabled={done}
              onClick={() => { setPick(i); if (id) recordFsaCheck(id, i === answer, Date.now()); }}
            >
              <span className="fsa-cq-letter">{"ABC"[i]}</span>
              <Html as="span" html={o} />
            </button>
          );
        })}
      </div>
      {done && (
        <div className={"fsa-cq-why " + (pick === answer ? "ok" : "bad")}>
          <b>{pick === answer ? "Correct." : "Not quite."}</b> <Html as="span" html={why} />
          <button type="button" className="fsa-link" onClick={() => setPick(null)}>Try again</button>
        </div>
      )}
    </div>
  );
}

/* Tap an item, then tap the bucket it belongs in. Works on touch, needs no
   drag library, and every placement explains itself. */
export function Sorter({ prompt, buckets, items }) {
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(null);
  const order = useMemo(() => items.map((_, i) => i), [items]);
  const unplaced = order.filter((i) => placed[i] == null);
  const correct = order.filter((i) => placed[i] === items[i].bucket).length;
  const doneAll = unplaced.length === 0;

  const place = (b) => {
    if (sel == null) return;
    setPlaced((p) => ({ ...p, [sel]: b }));
    setSel(null);
  };

  return (
    <div className="fsa-sorter">
      <div className="fsa-cq-tag">Sort it</div>
      {prompt && <Html className="fsa-cq-q" html={prompt} />}
      <div className="fsa-sort-pool">
        {unplaced.length === 0 ? (
          <span className="fsa-dim">All placed. {correct} of {items.length} correct.</span>
        ) : (
          unplaced.map((i) => (
            <button type="button" key={i} className={"fsa-sort-item" + (sel === i ? " is-sel" : "")} onClick={() => setSel(sel === i ? null : i)}>
              <Html as="span" html={items[i].text} />
            </button>
          ))
        )}
      </div>
      <div className="fsa-sort-buckets" style={{ gridTemplateColumns: "repeat(" + Math.min(buckets.length, 4) + ", minmax(0,1fr))" }}>
        {buckets.map((b) => (
          <div
            key={b.id}
            className={"fsa-bucket" + (sel != null ? " is-armed" : "")}
            role="button"
            tabIndex={0}
            onClick={() => place(b.id)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); place(b.id); } }}
          >
            <div className="fsa-bucket-h">{b.label}</div>
            {order.filter((i) => placed[i] === b.id).map((i) => {
              const ok = items[i].bucket === b.id;
              return (
                <div key={i} className={"fsa-placed " + (ok ? "ok" : "bad")}>
                  {ok ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                  <div>
                    <Html as="span" html={items[i].text} />
                    {items[i].why && <Html className="fsa-placed-why" html={(ok ? "" : "Belongs in " + (buckets.find((x) => x.id === items[i].bucket) || {}).label + ". ") + items[i].why} />}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {doneAll && (
        <button type="button" className="fsa-link" onClick={() => { setPlaced({}); setSel(null); }}><RotateCcw size={12} /> Reset</button>
      )}
    </div>
  );
}

/* A decision tree you walk by answering questions. Nodes are either
   { q, options:[{label, next}] } or { result, html, tone }. */
export function DecisionTree({ title, root, nodes }) {
  const [path, setPath] = useState([root]);
  const cur = nodes[path[path.length - 1]];
  const go = (next) => setPath((p) => [...p, next]);
  return (
    <div className="fsa-tree">
      <div className="fsa-cq-tag">Decision tree{title ? ": " + title : ""}</div>
      <ol className="fsa-tree-trail">
        {path.slice(0, -1).map((id, i) => {
          const n = nodes[id];
          const chosen = n.options && n.options.find((o) => o.next === path[i + 1]);
          return (
            <li key={i}>
              <button type="button" className="fsa-link" onClick={() => setPath(path.slice(0, i + 1))}>{n.q}</button>
              <ChevronRight size={12} /> <b>{chosen && chosen.label}</b>
            </li>
          );
        })}
      </ol>
      {cur && cur.q && (
        <div className="fsa-tree-node" key={path.length}>
          <Html className="fsa-tree-q" html={cur.q} />
          {cur.help && <Html className="fsa-tree-help" html={cur.help} />}
          <div className="fsa-tree-opts">
            {cur.options.map((o, i) => (
              <button type="button" key={i} className="fsa-btn" onClick={() => go(o.next)}>{o.label}</button>
            ))}
          </div>
        </div>
      )}
      {cur && cur.result && (
        <div className={"fsa-tree-result tone-" + (cur.tone || "insight")} key={path.length}>
          <div className="fsa-tree-res-t">{cur.result}</div>
          {cur.html && <Html html={cur.html} />}
          <button type="button" className="fsa-link" onClick={() => setPath([root])}><RotateCcw size={12} /> Start again</button>
        </div>
      )}
    </div>
  );
}

/* A CFA Level II style item set: a vignette, then three-option questions. */
export function ItemSet({ set }) {
  const [picks, setPicks] = useState({});
  const [shown, setShown] = useState(false);
  const answered = Object.keys(picks).length;
  const score = set.questions.filter((q, i) => picks[i] === q.answer).length;
  return (
    <div className="fsa-itemset">
      <div className="fsa-is-head">
        <div className="fsa-cq-tag">Item set</div>
        <h4>{set.title}</h4>
      </div>
      <Html className="fsa-vignette" html={set.vignette} />
      {set.questions.map((q, i) => (
        <div key={i} className="fsa-is-q">
          <div className="fsa-is-qn">Question {i + 1}</div>
          <Html className="fsa-cq-q" html={q.q} />
          <div className="fsa-cq-opts">
            {q.options.map((o, j) => {
              const st = !shown ? (picks[i] === j ? " is-picked" : "") : j === q.answer ? " ok" : picks[i] === j ? " bad" : " dim";
              return (
                <button type="button" key={j} className={"fsa-cq-opt" + st} disabled={shown} onClick={() => setPicks((p) => ({ ...p, [i]: j }))}>
                  <span className="fsa-cq-letter">{"ABC"[j]}</span>
                  <Html as="span" html={o} />
                </button>
              );
            })}
          </div>
          {shown && <div className={"fsa-cq-why " + (picks[i] === q.answer ? "ok" : "bad")}><Html as="span" html={q.why} /></div>}
        </div>
      ))}
      <div className="fsa-pr-bar">
        {!shown ? (
          <>
            <span className="fsa-dim">{answered} of {set.questions.length} answered</span>
            <button type="button" className="fsa-btn fsa-btn-primary" disabled={answered < set.questions.length} onClick={() => setShown(true)}>Grade the set</button>
          </>
        ) : (
          <>
            <span className={score === set.questions.length ? "fsa-good" : "fsa-warn"}>{score} / {set.questions.length}</span>
            <button type="button" className="fsa-btn" onClick={() => { setPicks({}); setShown(false); }}><RotateCcw size={14} /> Retake</button>
          </>
        )}
      </div>
    </div>
  );
}
