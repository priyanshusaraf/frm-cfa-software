/* Ported verbatim from site/assets/widgets-book5.js (Book 5 — Risk Management & Investment Management; Current Issues). */
import { register, svgEl, shell } from "./index.js";

/* =====================================================================
   1. frontier — efficient frontier, tangency portfolio & the CAL
   data-frontier (optional) JSON: { rf: number, assets: [{label, risk, ret}] }
   risk/ret in percent. Defaults are illustrative (no fabricated reading numbers).
   ===================================================================== */
register("frontier", function (el) {
  var data = {};
  try { data = JSON.parse(el.getAttribute("data-frontier") || "{}"); } catch (e) { data = {}; }
  var rf = typeof data.rf === "number" ? data.rf : 2;
  var assets = (data.assets && data.assets.length) ? data.assets : [
    { label: "Bonds", risk: 6, ret: 4 },
    { label: "Value stocks", risk: 15, ret: 9 },
    { label: "Growth stocks", risk: 19, ret: 9.5 },
    { label: "Small caps", risk: 23, ret: 11 },
    { label: "EM equities", risk: 26, ret: 10.5 }
  ];

  var svg = shell(el, "Efficient frontier, tangency portfolio & the Capital Allocation Line",
    '<label>Allocation to tangency portfolio <input type="range" min="0" max="150" step="5" value="60"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 300,
    "Diversification bows the frontier: combinations of imperfectly-correlated assets (the curve) dominate any single asset held alone (dots sit inside/below it). The tangency portfolio — where a line from the risk-free rate is just tangent to the curve — maximizes the Sharpe ratio of any risky combination. Mixing it with the risk-free asset (the Capital Allocation Line, dashed) lets an investor dial risk up or down while always holding the SAME optimal risky mix.");
  var slider = el.querySelector("input"), out = el.querySelector("[data-out]");

  /* stylized concave frontier: sigma_min at the minimum-variance point, then a sqrt bow */
  var minRisk = 5, minRet = 3.2, kCurve = 2.55, maxRisk = 28;
  function frontierRet(risk) { return minRet + kCurve * Math.sqrt(Math.max(0, risk - minRisk)); }

  /* tangency portfolio = point on the curve maximizing (ret - rf) / risk */
  var tanRisk = minRisk, bestSharpe = -Infinity;
  for (var r = minRisk + 0.1; r <= maxRisk; r += 0.1) {
    var s = (frontierRet(r) - rf) / r;
    if (s > bestSharpe) { bestSharpe = s; tanRisk = r; }
  }
  var tanRet = frontierRet(tanRisk);
  var retScale = Math.max(frontierRet(maxRisk), rf + 1.6 * (tanRet - rf)) * 1.15;

  function draw() {
    var w = parseFloat(slider.value) / 100;
    var compRisk = w * tanRisk, compRet = rf + w * (tanRet - rf);
    out.textContent = w.toFixed(2) + "x tangency → E(R) = " + compRet.toFixed(2) + "%, σ = " + compRisk.toFixed(2) +
      "% (tangency Sharpe = " + bestSharpe.toFixed(3) + ")";
    svg.innerHTML = "";
    var Wd = 640, H = 300, x0 = 52, y0 = H - 36, x1 = Wd - 24, y1t = 20;
    function X(risk) { return x0 + risk / (maxRisk + 4) * (x1 - x0); }
    function Y(ret) { return y0 - ret / retScale * (y0 - y1t); }

    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    svgEl("line", { x1: x0, x2: x0, y1: y1t, y2: y0, stroke: "var(--border-strong)" }, svg);
    var lx = svgEl("text", { x: x1, y: y0 + 18, "text-anchor": "end", "font-size": 11 }, svg);
    lx.textContent = "risk σ (%) →";
    var ly = svgEl("text", { x: x0, y: 14, "font-size": 11 }, svg);
    ly.textContent = "expected return (%)";

    /* frontier curve */
    var d = "";
    for (var rr = minRisk; rr <= maxRisk; rr += 0.5) d += (d ? " L" : "M") + X(rr) + "," + Y(frontierRet(rr));
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2.4 }, svg);

    /* Capital Allocation Line: (0, rf) through the tangency portfolio, extended */
    var calEndRisk = maxRisk * 1.05;
    var calEndRet = rf + (calEndRisk / tanRisk) * (tanRet - rf);
    svgEl("line", { x1: X(0), y1: Y(rf), x2: X(calEndRisk), y2: Y(calEndRet), stroke: "var(--amber)", "stroke-width": 2, "stroke-dasharray": "6 4" }, svg);
    var call = svgEl("text", { x: X(calEndRisk) - 4, y: Y(calEndRet) - 8, "text-anchor": "end", "font-size": 10.5, fill: "var(--amber)" }, svg);
    call.textContent = "CAL";

    /* individual assets, dominated by the frontier */
    assets.forEach(function (a) {
      svgEl("circle", { cx: X(a.risk), cy: Y(a.ret), r: 4.5, fill: "var(--text-faint)" }, svg);
      var lt = svgEl("text", { x: X(a.risk) + 7, y: Y(a.ret) + 4, "font-size": 10.5, fill: "var(--text-dim)" }, svg);
      lt.textContent = a.label;
    });

    /* risk-free point */
    svgEl("circle", { cx: X(0), cy: Y(rf), r: 4.5, fill: "var(--green)" }, svg);
    var rfl = svgEl("text", { x: X(0) + 7, y: Y(rf) - 6, "font-size": 10.5, fill: "var(--green)" }, svg);
    rfl.textContent = "R_F = " + rf.toFixed(1) + "%";

    /* tangency (max-Sharpe) portfolio */
    svgEl("circle", { cx: X(tanRisk), cy: Y(tanRet), r: 6, fill: "var(--red)" }, svg);
    var tl = svgEl("text", { x: X(tanRisk) + 8, y: Y(tanRet) - 8, "font-size": 11, fill: "var(--red)", "font-weight": 700 }, svg);
    tl.textContent = "Tangency (max Sharpe)";

    /* investor's chosen complete portfolio along the CAL */
    svgEl("circle", { cx: X(compRisk), cy: Y(compRet), r: 5.5, fill: "var(--purple)" }, svg);
  }
  slider.addEventListener("input", draw);
  draw();
});

/* =====================================================================
   2. perfmeas — Sharpe (total risk) vs Treynor/Jensen (systematic risk)
   data-perf (optional) JSON: array of {label, ret, risk, beta, market?:true}
   data-rf (optional): risk-free rate in percent (default 2)
   ===================================================================== */
register("perfmeas", function (el) {
  var list;
  try { list = JSON.parse(el.getAttribute("data-perf") || "null"); } catch (e) { list = null; }
  var rf = parseFloat(el.getAttribute("data-rf"));
  if (isNaN(rf)) rf = 2;
  if (!list || !list.length) {
    list = [
      { label: "Market", ret: 8, risk: 15, beta: 1.0, market: true },
      { label: "Fund A (diversified)", ret: 10, risk: 12, beta: 1.1 },
      { label: "Fund B (concentrated)", ret: 11, risk: 22, beta: 0.9 },
      { label: "Fund C (index-hugger)", ret: 8.2, risk: 15.2, beta: 1.0 },
      { label: "Fund D (low-beta skill)", ret: 9, risk: 10, beta: 0.6 }
    ];
  }
  var market = null;
  list.forEach(function (p) { if (p.market) market = p; });
  if (!market) market = list[0];

  var svg = shell(el, "Sharpe vs Treynor/Jensen — the same managers, a different ranking",
    '<span class="seg"><button data-m="total" class="on">Total risk (σ) → Sharpe</button><button data-m="sys">Systematic risk (β) → Treynor/Jensen</button></span>' +
    '<span class="w-value" data-out></span>', 640, 340, "");
  var cap = document.createElement("div"); cap.className = "w-caption"; el.appendChild(cap);
  var out = el.querySelector("[data-out]");
  var mode = "total";
  var captions = {
    total: "Sharpe = (R−R_F)/σ ranks by TOTAL risk — it punishes volatility whether it's diversified away or not. The Capital Market Line (R_F through the market) is the Sharpe benchmark: points above it beat the market per unit of total risk.",
    sys: "Treynor = (R−R_F)/β and Jensen's α = R−[R_F+β(R_M−R_F)] rank by SYSTEMATIC risk only — a concentrated, poorly-diversified fund gets no penalty here for the extra risk Sharpe would punish. The Security Market Line (CAPM) is the benchmark: points above it have positive Jensen's alpha. Watch a fund's RANK change between the two tabs — that gap is itself a diversification signal."
  };

  function sharpe(p) { return (p.ret - rf) / p.risk; }
  function treynor(p) { return (p.ret - rf) / p.beta; }

  function draw() {
    svg.innerHTML = "";
    var Wd = 640, H = 340, x0 = 56, y0 = H - 78, x1 = Wd - 24, y1t = 20;
    var xMax = mode === "total"
      ? Math.max.apply(null, list.map(function (p) { return p.risk; })) * 1.15
      : Math.max.apply(null, list.map(function (p) { return p.beta; })) * 1.3;
    var yMax = Math.max.apply(null, list.map(function (p) { return p.ret; })) * 1.2;
    function X(v) { return x0 + v / xMax * (x1 - x0); }
    function Y(v) { return y0 - v / yMax * (y0 - y1t); }

    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    svgEl("line", { x1: x0, x2: x0, y1: y1t, y2: y0, stroke: "var(--border-strong)" }, svg);
    var lx = svgEl("text", { x: x1, y: y0 + 18, "text-anchor": "end", "font-size": 11 }, svg);
    lx.textContent = mode === "total" ? "total risk σ (%) →" : "systematic risk β →";
    var lyx = svgEl("text", { x: x0, y: 14, "font-size": 11 }, svg);
    lyx.textContent = "expected return (%)";

    /* reference line: CML in total-risk mode, SML in systematic-risk mode */
    if (mode === "total") {
      var slope = (market.ret - rf) / market.risk;
      svgEl("line", { x1: X(0), y1: Y(rf), x2: X(xMax), y2: Y(rf + slope * xMax), stroke: "var(--cyan)", "stroke-width": 2, "stroke-dasharray": "6 4" }, svg);
      var cl = svgEl("text", { x: X(xMax) - 4, y: Y(rf + slope * xMax) - 8, "text-anchor": "end", "font-size": 10.5, fill: "var(--cyan)" }, svg);
      cl.textContent = "CML";
    } else {
      var slopeB = market.ret - rf; /* beta_market = 1 */
      svgEl("line", { x1: X(0), y1: Y(rf), x2: X(xMax), y2: Y(rf + slopeB * xMax), stroke: "var(--cyan)", "stroke-width": 2, "stroke-dasharray": "6 4" }, svg);
      var sl = svgEl("text", { x: X(xMax) - 4, y: Y(rf + slopeB * xMax) - 8, "text-anchor": "end", "font-size": 10.5, fill: "var(--cyan)" }, svg);
      sl.textContent = "SML";
    }

    /* portfolios */
    list.forEach(function (p) {
      var xv = mode === "total" ? p.risk : p.beta;
      var col = p.market ? "var(--text-dim)" : "var(--purple)";
      svgEl("circle", { cx: X(xv), cy: Y(p.ret), r: p.market ? 5 : 5.5, fill: col }, svg);
      var t = svgEl("text", { x: X(xv) + 7, y: Y(p.ret) + 4, "font-size": 10.5, fill: "var(--text-dim)" }, svg);
      t.textContent = p.label;
    });

    /* ranking readout */
    var ranked = list.filter(function (p) { return !p.market; }).slice().sort(function (a, b) {
      return mode === "total" ? sharpe(b) - sharpe(a) : treynor(b) - treynor(a);
    });
    out.textContent = (mode === "total" ? "Sharpe" : "Treynor") + " ranking (best→worst): " +
      ranked.map(function (p) { return p.label.replace(/\s*\(.*\)$/, ""); }).join(" > ");
    cap.textContent = captions[mode];
  }
  el.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      el.querySelectorAll(".seg button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); mode = b.getAttribute("data-m"); draw();
    });
  });
  draw();
});

/* =====================================================================
   3. compvar — component VaR decomposition (additive, unlike standalone VaR)
   data-compvar (optional) JSON: array of {label, cvar} — cvar may be negative
   (a diversifier/hedge). data-unit (optional): display unit, default "$M".
   ===================================================================== */
register("compvar", function (el) {
  var items;
  try { items = JSON.parse(el.getAttribute("data-compvar") || "null"); } catch (e) { items = null; }
  if (!items || !items.length) {
    items = [
      { label: "Equities book", cvar: 6.2 },
      { label: "Credit book", cvar: 3.8 },
      { label: "Rates hedge overlay (diversifier)", cvar: -1.4 }
    ];
  }
  var unit = el.getAttribute("data-unit") || "$M";
  var total = 0;
  items.forEach(function (it) { total += it.cvar; });

  var H = 140 + items.length * 24;
  var svg = shell(el, "Component VaR — the slices add up EXACTLY to the whole", "", 640, H,
    "Component VaR (= marginal VaR × position) is ADDITIVE: Σ component VaR = portfolio VaR, exactly — unlike standalone VaRs, which over-count risk because they ignore diversification. A negative component (red, dropped below the axis) is a genuine diversifier or hedge: it REDUCES portfolio VaR even though every other component here is positive.");

  var Wd = 640, x0 = 60, x1 = Wd - 40;
  var pos = 0, neg = 0;
  items.forEach(function (it) { if (it.cvar >= 0) pos += it.cvar; else neg += -it.cvar; });
  var span = Math.max(pos, total) + neg || 1;
  function Xw(v) { return v / span * (x1 - x0); }

  var barY = 40, barH = 34;
  var colors = ["var(--accent)", "var(--cyan)", "var(--green)", "var(--purple)", "var(--pink)"];

  /* positive components, stacked left to right */
  var cx = x0, ci = 0;
  items.forEach(function (it) {
    if (it.cvar >= 0) {
      var w = Xw(it.cvar);
      svgEl("rect", { x: cx, y: barY, width: Math.max(w, 1), height: barH, fill: colors[ci % colors.length], opacity: 0.85 }, svg);
      if (w > 26) {
        var t = svgEl("text", { x: cx + w / 2, y: barY + barH / 2 + 4, "text-anchor": "middle", "font-size": 10.5, fill: "#fff" }, svg);
        t.textContent = (it.cvar >= 0 ? "+" : "") + it.cvar.toFixed(2);
      }
      cx += w;
    }
    ci++;
  });

  /* negative components, hatched, dropped below the axis at the right edge of the stack */
  var negX = cx;
  items.forEach(function (it) {
    if (it.cvar < 0) {
      var w = Xw(-it.cvar);
      negX -= w;
      svgEl("rect", { x: negX, y: barY + barH, width: Math.max(w, 1), height: 20, fill: "var(--red)", opacity: 0.55 }, svg);
      if (w > 26) {
        var t2 = svgEl("text", { x: negX + w / 2, y: barY + barH + 14, "text-anchor": "middle", "font-size": 9.5, fill: "#fff" }, svg);
        t2.textContent = it.cvar.toFixed(2);
      }
    }
  });

  /* portfolio VaR marker at the net total */
  var totalX = x0 + Xw(total);
  svgEl("line", { x1: totalX, x2: totalX, y1: barY - 14, y2: barY + barH + 26, stroke: "var(--amber)", "stroke-width": 2.4 }, svg);
  var tt = svgEl("text", { x: totalX, y: barY - 18, "text-anchor": "middle", "font-size": 11.5, fill: "var(--amber)", "font-weight": 700 }, svg);
  tt.textContent = "Portfolio VaR = " + total.toFixed(2) + " " + unit;

  /* legend */
  var ly = barY + barH + 46;
  items.forEach(function (it, i) {
    svgEl("rect", { x: x0, y: ly - 10, width: 14, height: 14, fill: it.cvar >= 0 ? colors[i % colors.length] : "var(--red)", opacity: it.cvar >= 0 ? 0.85 : 0.55 }, svg);
    var lt = svgEl("text", { x: x0 + 20, y: ly + 1, "font-size": 11.5, fill: "var(--text)" }, svg);
    lt.textContent = it.label + ": " + (it.cvar >= 0 ? "+" : "") + it.cvar.toFixed(2) + " " + unit;
    ly += 24;
  });
});
