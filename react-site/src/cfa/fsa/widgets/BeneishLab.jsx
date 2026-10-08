import React, { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTween, prefersReducedMotion } from "../components/motion.js";

/* Beneish M-score and Altman Z-score lab (LM14, LOS c and d).
   Every index, contribution, score and probability is computed from the raw
   inputs on screen; nothing is typed in. Coefficients are Beneish (1999) as
   the curriculum reproduces them; the -1.78 cutoff is the one the curriculum
   uses. AQI follows Beneish (1999): soft assets = 1 - (current assets +
   net PP&E) / total assets, with no securities term. Altman zone lines
   (1.81 / 2.99) are the commonly cited original thresholds and are
   labelled as such. */

const FIELDS = [
  { k: "sales", label: "Sales (revenue)" },
  { k: "cogs", label: "Cost of sales" },
  { k: "rec", label: "Accounts receivable" },
  { k: "ca", label: "Current assets" },
  { k: "ppe", label: "PP&E (net)" },
  { k: "ta", label: "Total assets" },
  { k: "dep", label: "Depreciation expense" },
  { k: "sga", label: "SG&A expense" },
  { k: "ni", label: "Net income (continuing operations)" },
  { k: "cfo", label: "Cash from operations" },
  { k: "cl", label: "Current liabilities" },
  { k: "ltd", label: "Long-term debt" },
];

const PRESETS = [
  {
    id: "vantor",
    name: "Vantor Systems",
    note: "fast growth, slipping margins, slow collections",
    p: { sales: 1000, cogs: 600, rec: 100, ca: 400, ppe: 450, ta: 1000, dep: 50, sga: 150, ni: 80, cfo: 90, cl: 200, ltd: 300 },
    t: { sales: 1300, cogs: 832, rec: 195, ca: 560, ppe: 600, ta: 1400, dep: 48, sga: 180, ni: 110, cfo: 40, cl: 300, ltd: 450 },
  },
  {
    id: "clear",
    name: "Clearwater Supplies",
    note: "steady growth, every ratio stable",
    p: { sales: 1000, cogs: 600, rec: 100, ca: 400, ppe: 450, ta: 1000, dep: 50, sga: 150, ni: 80, cfo: 95, cl: 200, ltd: 300 },
    t: { sales: 1080, cogs: 648, rec: 108, ca: 432, ppe: 486, ta: 1080, dep: 54, sga: 162, ni: 86, cfo: 100, cl: 216, ltd: 324 },
  },
];

const VARS = [
  { k: "DSRI", name: "Days sales in receivables index", coef: 0.92, neutral: 1, signal: "Above 1: receivables grew faster than sales. Possible revenue inflation (aggressive recognition, channel stuffing) or slower collection." },
  { k: "GMI", name: "Gross margin index", coef: 0.528, neutral: 1, signal: "Above 1: gross margin deteriorated (last year's margin over this year's). Companies with weakening prospects have more reason to manipulate." },
  { k: "AQI", name: "Asset quality index", coef: 0.404, neutral: 1, signal: "Above 1: a larger share of assets is neither current assets nor net PP&E, i.e. soft assets. Possible capitalization or deferral of costs. (Some sources also count securities as hard assets; this lab follows Beneish (1999) and excludes them.)" },
  { k: "SGI", name: "Sales growth index", coef: 0.892, neutral: 1, signal: "Above 1: sales grew. Growth is not manipulation, but high-growth companies face pressure to keep the growth story going." },
  { k: "DEPI", name: "Depreciation index", coef: 0.115, neutral: 1, signal: "Above 1: the depreciation rate fell (last year's rate over this year's). Possibly longer useful lives or other income-increasing estimates." },
  { k: "SGAI", name: "SG&A expense index", coef: -0.172, neutral: 1, signal: "Above 1: selling, general and administrative costs rose as a share of sales. The coefficient is negative in Beneish's model." },
  { k: "TATA", name: "Total accruals to total assets", coef: 4.679, neutral: 0, signal: "Above 0: net income exceeds cash from operations. Higher accruals mean less cash behind the earnings." },
  { k: "LVGI", name: "Leverage index", coef: -0.327, neutral: 1, signal: "Above 1: leverage rose, which raises debt covenant pressure. The coefficient is negative in Beneish's model." },
];

const INTERCEPT = -4.84;
const CUTOFF = -1.78;

/* Standard normal CDF via the Abramowitz and Stegun 7.1.26 erf approximation
   (absolute error below 1.5e-7). */
export function normCdf(z) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y);
}

function safeDiv(a, b) { return Math.abs(b) > 1e-12 ? a / b : NaN; }

export function beneish(p, t) {
  const gm = (d) => safeDiv(d.sales - d.cogs, d.sales);
  const soft = (d) => 1 - safeDiv(d.ca + d.ppe, d.ta);
  const depRate = (d) => safeDiv(d.dep, d.dep + d.ppe);
  const v = {
    DSRI: safeDiv(safeDiv(t.rec, t.sales), safeDiv(p.rec, p.sales)),
    GMI: safeDiv(gm(p), gm(t)),
    AQI: safeDiv(soft(t), soft(p)),
    SGI: safeDiv(t.sales, p.sales),
    DEPI: safeDiv(depRate(p), depRate(t)),
    SGAI: safeDiv(safeDiv(t.sga, t.sales), safeDiv(p.sga, p.sales)),
    TATA: safeDiv(t.ni - t.cfo, t.ta),
    LVGI: safeDiv(safeDiv(t.cl + t.ltd, t.ta), safeDiv(p.cl + p.ltd, p.ta)),
  };
  const contrib = {};
  let m = INTERCEPT;
  VARS.forEach((x) => { contrib[x.k] = x.coef * v[x.k]; m += contrib[x.k]; });
  return { v, contrib, m, prob: Number.isFinite(m) ? normCdf(m) : NaN };
}

const ALT = [
  { k: "wc", label: "Working capital", coef: 1.2, ratio: "Working capital / total assets", den: "ta" },
  { k: "re", label: "Retained earnings", coef: 1.4, ratio: "Retained earnings / total assets", den: "ta" },
  { k: "ebit", label: "EBIT", coef: 3.3, ratio: "EBIT / total assets", den: "ta" },
  { k: "mve", label: "Market value of equity", coef: 0.6, ratio: "Market value of equity / book value of liabilities", den: "liab" },
  { k: "sales", label: "Sales", coef: 1.0, ratio: "Sales / total assets", den: "ta" },
];
const ALT_DEFAULT = { wc: 260, re: 300, ebit: 170, mve: 900, liab: 750, sales: 1300, ta: 1400 };

const f2 = (x, dp = 3) => (Number.isFinite(x) ? x.toFixed(dp) : "n/a");

function Tw({ v, dp = 3, pct }) {
  const t = useTween(Number.isFinite(v) ? v : 0, 600);
  if (!Number.isFinite(v)) return <span>n/a</span>;
  return <span style={{ fontFamily: "var(--mono)" }}>{pct ? (t * 100).toFixed(1) + "%" : t.toFixed(dp)}</span>;
}

function NumIn({ value, onChange, label }) {
  const [txt, setTxt] = useState(String(value));
  useEffect(() => { setTxt(String(value)); }, [value]);
  return (
    <input className="fsa-in" type="number" aria-label={label} value={txt}
      onChange={(e) => { setTxt(e.target.value); const n = parseFloat(e.target.value); onChange(Number.isFinite(n) ? n : 0); }} />
  );
}

const cell = { padding: "0.2rem 0.45rem", borderTop: "1px solid var(--border)", background: "transparent" };
const capS = { fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", fontWeight: 650 };

const ease = (props) => (prefersReducedMotion() ? "none" : props);

/* A horizontal bar for a signed contribution, centred on zero. */
function Bar({ value, scale, tone }) {
  const w = Number.isFinite(value) ? Math.min(50, (Math.abs(value) / scale) * 50) : 0;
  const left = value >= 0 ? 50 : 50 - w;
  return (
    <div style={{ position: "relative", height: "0.85rem", background: "var(--bg-inset)", borderRadius: "99px", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "var(--border-strong)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: left + "%", width: w + "%", background: tone, borderRadius: "99px", transition: ease("left .6s cubic-bezier(.3,.7,.2,1), width .6s cubic-bezier(.3,.7,.2,1)") }} />
    </div>
  );
}

/* A number line with a moving marker and labelled reference lines. */
function Gauge({ value, min, max, marks, tone, label }) {
  const pos = (x) => Math.max(0, Math.min(100, ((x - min) / (max - min)) * 100));
  return (
    <div style={{ margin: "1.4rem 0 1.8rem" }}>
      <div style={{ position: "relative", height: "0.6rem", borderRadius: "99px", background: "var(--bg-inset)", border: "1px solid var(--border)" }}>
        {marks.map((m) => (
          <div key={m.at} style={{ position: "absolute", left: pos(m.at) + "%", top: "-0.5rem", bottom: "-0.5rem", width: "2px", background: m.tone || "var(--text-dim)" }}>
            <div style={{ position: "absolute", top: "1.4rem", left: "50%", transform: "translateX(-50%)", fontSize: "0.68rem", color: m.tone || "var(--text-dim)", whiteSpace: "nowrap" }}>{m.label}</div>
          </div>
        ))}
        <div style={{ position: "absolute", left: pos(value) + "%", top: "50%", width: "1.05rem", height: "1.05rem", borderRadius: "50%", background: tone, border: "2px solid var(--bg)", transform: "translate(-50%, -50%)", transition: ease("left .7s cubic-bezier(.3,.7,.2,1), background .3s"), boxShadow: "var(--shadow)" }} aria-label={label} />
      </div>
    </div>
  );
}

function MScoreTab() {
  const [preset, setPreset] = useState(PRESETS[0].id);
  const [p, setP] = useState(() => ({ ...PRESETS[0].p }));
  const [t, setT] = useState(() => ({ ...PRESETS[0].t }));
  const load = (id) => { const pr = PRESETS.find((x) => x.id === id); setPreset(id); setP({ ...pr.p }); setT({ ...pr.t }); };
  const r = useMemo(() => beneish(p, t), [p, t]);
  const flagged = Number.isFinite(r.m) && r.m > CUTOFF;
  const scale = Math.max(1.5, ...VARS.map((x) => Math.abs(r.contrib[x.k]) || 0));
  const tone = flagged ? "var(--red)" : "var(--green)";

  return (
    <div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center", marginBottom: "0.7rem" }}>
        <span className="fsa-dim" style={{ fontSize: "0.8rem" }}>Demo company:</span>
        {PRESETS.map((pr) => (
          <button key={pr.id} type="button" className={"fsa-btn" + (preset === pr.id ? " fsa-btn-primary" : "")} onClick={() => load(pr.id)} title={pr.note}>{pr.name}</button>
        ))}
        <button type="button" className="fsa-btn" onClick={() => load(preset)}><RotateCcw size={14} /> Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem", alignItems: "start" }}>
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)" }}>
          <table style={{ margin: 0, fontSize: "0.8rem", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ ...cell, borderTop: "none", textAlign: "left" }}>Raw data</th>
                <th style={{ ...cell, borderTop: "none", textAlign: "right" }}>Prior year (t-1)</th>
                <th style={{ ...cell, borderTop: "none", textAlign: "right" }}>Current year (t)</th>
              </tr>
            </thead>
            <tbody>
              {FIELDS.map((f) => (
                <tr key={f.k}>
                  <td style={cell}>{f.label}</td>
                  <td style={{ ...cell, textAlign: "right" }}><NumIn label={f.label + " prior year"} value={p[f.k]} onChange={(n) => setP((x) => ({ ...x, [f.k]: n }))} /></td>
                  <td style={{ ...cell, textAlign: "right" }}><NumIn label={f.label + " current year"} value={t[f.k]} onChange={(n) => setT((x) => ({ ...x, [f.k]: n }))} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid " + tone, borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.7rem 0.9rem" }}>
            <div style={capS}>M-score</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "1.9rem", fontWeight: 750, color: tone }}><Tw v={r.m} dp={2} /></span>
              <span style={{ fontSize: "0.86rem" }}>probability of manipulation N(M) = <b><Tw v={r.prob} pct /></b></span>
            </div>
            <div style={{ fontSize: "0.84rem", color: tone, fontWeight: 600 }}>
              {Number.isFinite(r.m) ? (flagged ? "Above the -1.78 cutoff: screen flags this company as a likely manipulator." : "Below the -1.78 cutoff: not flagged by the screen.") : "Enter non-zero sales, total assets and margins to compute."}
            </div>
            <Gauge value={Number.isFinite(r.m) ? r.m : -4} min={-4} max={0} tone={tone} label="M-score marker"
              marks={[{ at: CUTOFF, label: "cutoff -1.78 (N = " + (normCdf(CUTOFF) * 100).toFixed(1) + "%)", tone: "var(--red)" }, { at: -4, label: "-4" }, { at: 0, label: "0" }]} />
          </div>

          <div style={{ marginTop: "0.8rem" }}>
            <div style={capS}>Contribution of each variable to M (coefficient x value)</div>
            {VARS.map((x) => {
              const val = r.v[x.k];
              const red = Number.isFinite(val) && (x.k === "TATA" ? val > 0 : val > 1);
              return (
                <div key={x.k} style={{ display: "grid", gridTemplateColumns: "3.2rem 4.2rem 1fr 4.2rem", gap: "0.45rem", alignItems: "center", fontSize: "0.78rem", padding: "0.18rem 0" }} title={x.name}>
                  <b style={{ fontFamily: "var(--mono)" }}>{x.k}</b>
                  <span style={{ textAlign: "right", color: red ? "var(--red)" : "var(--text-dim)" }}><Tw v={val} /></span>
                  <Bar value={r.contrib[x.k]} scale={scale} tone={r.contrib[x.k] >= 0 ? "var(--red)" : "var(--green)"} />
                  <span style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{(r.contrib[x.k] >= 0 ? "+" : "") + f2(r.contrib[x.k])}</span>
                </div>
              );
            })}
            <div style={{ display: "grid", gridTemplateColumns: "3.2rem 4.2rem 1fr 4.2rem", gap: "0.45rem", fontSize: "0.78rem", padding: "0.25rem 0", borderTop: "1px solid var(--border)", marginTop: "0.2rem" }}>
              <b>Const.</b><span /><span className="fsa-dim">intercept</span><span style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{INTERCEPT.toFixed(3)}</span>
            </div>
            <div className="fsa-dim" style={{ fontSize: "0.72rem" }}>Red bars push M up (toward 'manipulator'); green bars pull it down.</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1rem", overflowX: "auto" }}>
        <table style={{ margin: 0, fontSize: "0.79rem", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ ...cell, textAlign: "left" }}>Variable</th>
              <th style={{ ...cell, textAlign: "right" }}>Value</th>
              <th style={{ ...cell, textAlign: "left" }}>What a high value signals</th>
            </tr>
          </thead>
          <tbody>
            {VARS.map((x) => {
              const val = r.v[x.k];
              const red = Number.isFinite(val) && (x.k === "TATA" ? val > 0 : val > 1);
              return (
                <tr key={x.k}>
                  <td style={cell}><b>{x.k}</b> <span className="fsa-dim">{x.name}</span></td>
                  <td style={{ ...cell, textAlign: "right", fontFamily: "var(--mono)", color: red ? "var(--red)" : "var(--text)" }}>{f2(val)}</td>
                  <td style={{ ...cell, color: "var(--text-dim)" }}>{x.signal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ZScoreTab() {
  const [d, setD] = useState(() => ({ ...ALT_DEFAULT }));
  const ratios = ALT.map((a) => safeDiv(d[a.k], d[a.den]));
  const contribs = ALT.map((a, i) => a.coef * ratios[i]);
  const z = contribs.reduce((s, c) => s + c, 0);
  const tone = !Number.isFinite(z) ? "var(--text-dim)" : z < 1.81 ? "var(--red)" : z < 2.99 ? "var(--amber)" : "var(--green)";
  const scale = Math.max(1, ...contribs.map((c) => Math.abs(c) || 0));
  const inputs = [...ALT.map((a) => ({ k: a.k, label: a.label })), { k: "liab", label: "Book value of total liabilities" }, { k: "ta", label: "Total assets" }];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem", alignItems: "start" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", overflowX: "auto" }}>
          <table style={{ margin: 0, fontSize: "0.8rem", width: "100%" }}>
            <tbody>
              {inputs.map((f) => (
                <tr key={f.k}>
                  <td style={cell}>{f.label}</td>
                  <td style={{ ...cell, textAlign: "right" }}><NumIn label={f.label} value={d[f.k]} onChange={(n) => setD((x) => ({ ...x, [f.k]: n }))} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "0.4rem 0.6rem" }}>
            <button type="button" className="fsa-btn" onClick={() => setD({ ...ALT_DEFAULT })}><RotateCcw size={14} /> Reset</button>
          </div>
        </div>
        <div>
          <div style={{ border: "1px solid var(--border)", borderLeft: "3px solid " + tone, borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.7rem 0.9rem" }}>
            <div style={capS}>Altman Z-score (higher is safer)</div>
            <div style={{ fontSize: "1.9rem", fontWeight: 750, color: tone }}><Tw v={z} dp={2} /></div>
            <Gauge value={Number.isFinite(z) ? z : 0} min={0} max={5} tone={tone} label="Z-score marker"
              marks={[{ at: 1.81, label: "1.81", tone: "var(--red)" }, { at: 2.99, label: "2.99", tone: "var(--green)" }, { at: 0, label: "0" }, { at: 5, label: "5" }]} />
            <div className="fsa-dim" style={{ fontSize: "0.74rem" }}>
              Zone lines are the commonly cited original thresholds from Altman (1968): below 1.81 distress, 1.81 to 2.99 grey zone, above 2.99 safe. Treat them as a convention, not a curriculum rule; the curriculum's point is that a higher Z means a lower probability of bankruptcy.
            </div>
          </div>
          <div style={{ marginTop: "0.8rem" }}>
            {ALT.map((a, i) => (
              <div key={a.k} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 4rem 7rem 3.6rem", gap: "0.45rem", alignItems: "center", fontSize: "0.78rem", padding: "0.2rem 0" }}>
                <span>{a.coef.toFixed(1)} x {a.ratio}</span>
                <span style={{ textAlign: "right", fontFamily: "var(--mono)", color: "var(--text-dim)" }}>{f2(ratios[i])}</span>
                <Bar value={contribs[i]} scale={scale * 2} tone={contribs[i] >= 0 ? "var(--green)" : "var(--red)"} />
                <span style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{f2(contribs[i])}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fsa-dim" style={{ fontSize: "0.78rem", marginTop: "0.8rem" }}>
        Limitations: a single-period, static model. It does not capture how the ratios are trending, it was estimated on manufacturing companies decades ago, and it takes the accounting numbers at face value, so a company that manipulates them can also flatter its Z-score.
      </div>
    </div>
  );
}

export default function BeneishLab({ tab: startTab = "m" }) {
  const [tab, setTab] = useState(startTab);
  return (
    <div className="fsa-theater">
      <div className="fsa-th-head">
        <div className="fsa-th-std">Quantitative screens</div>
        <h3>{tab === "m" ? "Beneish M-score: is this company a likely manipulator?" : "Altman Z-score: how close is this company to bankruptcy?"}</h3>
        <div className="fsa-th-sum">
          {tab === "m"
            ? "Edit two years of raw data. The eight indexes, their contributions, the M-score and the probability N(M) are all recomputed from your inputs."
            : "Edit the inputs. Each ratio, its weighted contribution and the Z-score are recomputed from your numbers."}
        </div>
      </div>
      <div className="fsa-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "m"} className={"fsa-btn" + (tab === "m" ? " fsa-btn-primary" : "")} onClick={() => setTab("m")}>Beneish M-score</button>
        <button type="button" role="tab" aria-selected={tab === "z"} className={"fsa-btn" + (tab === "z" ? " fsa-btn-primary" : "")} onClick={() => setTab("z")}>Altman Z-score</button>
      </div>
      {tab === "m" ? <MScoreTab /> : <ZScoreTab />}
    </div>
  );
}
