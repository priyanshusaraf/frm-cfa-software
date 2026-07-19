/* Ported verbatim from site/assets/widgets-book3.js (Book 3 — Operational Risk & Capital). */
import { register, svgEl, shell, rng, ninv } from "./index.js";

function fmtMoney(v) {
  var sign = v < 0 ? "-" : "";
  v = Math.abs(v);
  if (v >= 1e6) return sign + "$" + (v / 1e6).toFixed(2) + "M";
  if (v >= 1e3) return sign + "$" + (v / 1e3).toFixed(1) + "K";
  return sign + "$" + v.toFixed(0);
}

/* =====================================================================
   1) RAROC vs hurdle rate
   data-raroc = {revenue, cost, expectedLoss, capital, hurdle}
   RAROC = (revenue - cost - expectedLoss) / capital
   ===================================================================== */
register("raroc", function (el) {
  var d;
  try { d = JSON.parse(el.getAttribute("data-raroc")); } catch (e) { d = null; }
  d = d || {};
  var revenue = typeof d.revenue === "number" ? d.revenue : 100;
  var cost = typeof d.cost === "number" ? d.cost : 55;
  var baseEL = typeof d.expectedLoss === "number" ? d.expectedLoss : 15;
  var baseCap = typeof d.capital === "number" ? d.capital : 150;
  var hurdle = typeof d.hurdle === "number" ? d.hurdle : 0.15;

  var capMin = Math.max(1, Math.round(baseCap * 0.4));
  var capMax = Math.round(baseCap * 2.5);
  var elMax = Math.max(1, Math.round(baseEL * 4));

  var svg = shell(el, "RAROC vs the hurdle rate — does this activity clear the bar?",
    '<label>Economic capital ($M) <input type="range" min="' + capMin + '" max="' + capMax + '" step="1" value="' + baseCap + '" data-k="cap"><span class="w-value" data-v="cap"></span></label>' +
    '<label>Expected loss ($M) <input type="range" min="0" max="' + elMax + '" step="0.5" value="' + baseEL + '" data-k="el"><span class="w-value" data-v="el"></span></label>' +
    '<span class="w-value" data-out></span>',
    640, 260,
    "RAROC = (revenue − costs − expected loss) / economic capital. Economic capital is the denominator, not an afterthought: drag it up (or let expected losses grow) and an unchanged revenue stream can fall below the hurdle rate — the activity stops creating shareholder value even though nothing about the P&amp;L line itself moved. Only RAROC ≥ hurdle rate adds value; below it, the capital is better deployed elsewhere."
  );
  var capIn = el.querySelector('[data-k="cap"]'), elIn = el.querySelector('[data-k="el"]');
  var capV = el.querySelector('[data-v="cap"]'), elV = el.querySelector('[data-v="el"]');
  var out = el.querySelector("[data-out]");

  function draw() {
    var cap = parseFloat(capIn.value), el2 = parseFloat(elIn.value);
    capV.textContent = "$" + cap.toFixed(0) + "M";
    elV.textContent = "$" + el2.toFixed(1) + "M";
    var raroc = (revenue - cost - el2) / cap;
    var above = raroc >= hurdle;
    out.textContent = "RAROC = (" + revenue.toFixed(1) + " − " + cost.toFixed(1) + " − " + el2.toFixed(1) + ") / " + cap.toFixed(0) +
      " = " + (raroc * 100).toFixed(2) + "% vs hurdle " + (hurdle * 100).toFixed(1) + "% → " + (above ? "creates value" : "destroys value");

    svg.innerHTML = "";
    var Wd = 640, H = 260, x0 = 64, x1 = Wd - 40, y0 = H - 44, y1 = 26;
    var vMin = Math.min(0, raroc, -0.02);
    var vMax = Math.max(hurdle, raroc, 0.05) * 1.3;
    function Y(v) { return y0 - (v - vMin) / (vMax - vMin) * (y0 - y1); }

    svgEl("line", { x1: x0, x2: x1, y1: Y(0), y2: Y(0), stroke: "var(--border-strong)" }, svg);
    svgEl("line", { x1: x0, x2: x0, y1: y1, y2: y0, stroke: "var(--border-strong)" }, svg);

    /* hurdle dashed line */
    svgEl("line", { x1: x0, x2: x1, y1: Y(hurdle), y2: Y(hurdle), stroke: "var(--amber)", "stroke-width": 2, "stroke-dasharray": "5 4" }, svg);
    var hl = svgEl("text", { x: x1, y: Y(hurdle) - 6, "text-anchor": "end", "font-size": 11, fill: "var(--amber)" }, svg);
    hl.textContent = "hurdle rate " + (hurdle * 100).toFixed(1) + "%";

    /* RAROC bar */
    var bw = 130, bx = (x0 + x1) / 2 - bw / 2;
    var barY = Y(Math.max(raroc, 0));
    var barH = Math.abs(Y(raroc) - Y(0));
    svgEl("rect", { x: bx, y: raroc >= 0 ? barY : Y(0), width: bw, height: Math.max(barH, 1), fill: above ? "var(--green)" : "var(--red)", opacity: 0.85, rx: 5 }, svg);
    var lbl = svgEl("text", { x: bx + bw / 2, y: (raroc >= 0 ? barY : Y(0)) - 8, "text-anchor": "middle", "font-size": 14, "font-weight": 700, fill: above ? "var(--green)" : "var(--red)" }, svg);
    lbl.textContent = (raroc * 100).toFixed(1) + "%";
    var t3 = svgEl("text", { x: bx + bw / 2, y: y0 + 18, "text-anchor": "middle", "font-size": 11 }, svg);
    t3.textContent = "RAROC";
  }
  capIn.addEventListener("input", draw);
  elIn.addEventListener("input", draw);
  draw();
});

/* =====================================================================
   2) Basel III capital stack
   data-stack = {cet1, at1, t2, ccb, ccyb, gsib}  (percent of RWA)
   ===================================================================== */
register("capitalstack", function (el) {
  var d;
  try { d = JSON.parse(el.getAttribute("data-stack")); } catch (e) { d = null; }
  d = d || {};
  var cet1 = typeof d.cet1 === "number" ? d.cet1 : 4.5;
  var at1 = typeof d.at1 === "number" ? d.at1 : 1.5;
  var t2 = typeof d.t2 === "number" ? d.t2 : 2.0;
  var ccb = typeof d.ccb === "number" ? d.ccb : 2.5;
  var ccyb = typeof d.ccyb === "number" ? d.ccyb : 0;
  var gsib = typeof d.gsib === "number" ? d.gsib : 0;

  var tier1min = cet1 + at1;
  var totalmin = tier1min + t2;
  var buffertop = totalmin + ccb + ccyb + gsib;

  var svg = shell(el, "Basel III capital stack — minimums, then buffers on top",
    '<label>Bank\'s current CET1+Tier1+Tier2 ratio (%) <input type="range" min="' + cet1.toFixed(1) + '" max="' + (buffertop + 2).toFixed(1) + '" step="0.1" value="' + totalmin.toFixed(1) + '" data-k="cur"><span class="w-value" data-v="cur"></span></label>' +
    '<span class="w-value" data-out></span>',
    640, 340,
    "The 8% total minimum (CET1 " + cet1.toFixed(1) + "% + AT1 + T2) is a hard floor — breach it and the bank is undercapitalized. The capital conservation buffer sits ABOVE that floor: falling into the shaded buffer zone is not a breach of the minimum, but it automatically restricts dividends, buybacks, and discretionary bonus payouts until the buffer is rebuilt. Countercyclical and G-SIB add-ons (when they apply) stack on top of the same buffer logic."
  );
  var curIn = el.querySelector('[data-k="cur"]'), curV = el.querySelector('[data-v="cur"]');
  var out = el.querySelector("[data-out]");

  function draw() {
    var cur = parseFloat(curIn.value);
    curV.textContent = cur.toFixed(1) + "%";

    var zone, retain;
    if (cur < totalmin) { zone = "BELOW MINIMUM — undercapitalized"; retain = 100; }
    else if (cur >= buffertop) { zone = "fully inside buffer — no distribution restriction"; retain = 0; }
    else {
      var frac = (cur - totalmin) / (buffertop - totalmin);
      retain = Math.round((1 - frac) * 100);
      zone = "inside conservation buffer — must retain ≥" + retain + "% of earnings";
    }
    out.textContent = "Current ratio " + cur.toFixed(1) + "% → " + zone;

    svg.innerHTML = "";
    var Wd = 640, H = 340, x0 = 220, x1 = Wd - 60, y0 = H - 30, y1 = 26;
    var vMax = buffertop + 2;
    function Y(v) { return y0 - v / vMax * (y0 - y1); }
    var barX = x0, barW = 140;

    /* minimum stack segments, bottom-up: CET1, AT1, T2 */
    var segs = [
      { v0: 0, v1: cet1, label: "CET1 " + cet1.toFixed(1) + "%", color: "var(--accent)" },
      { v0: cet1, v1: tier1min, label: "AT1 " + at1.toFixed(1) + "%", color: "var(--cyan)" },
      { v0: tier1min, v1: totalmin, label: "T2 " + t2.toFixed(1) + "%", color: "var(--purple)" }
    ];
    segs.forEach(function (s) {
      svgEl("rect", { x: barX, y: Y(s.v1), width: barW, height: Y(s.v0) - Y(s.v1), fill: s.color, opacity: 0.85 }, svg);
      var t = svgEl("text", { x: barX + barW / 2, y: (Y(s.v0) + Y(s.v1)) / 2 + 4, "text-anchor": "middle", "font-size": 11, fill: "#fff" }, svg);
      t.textContent = s.label;
    });

    /* buffer zone(s) above the minimum, shaded */
    var bufSegs = [];
    var acc = totalmin;
    if (ccb > 0) { bufSegs.push({ v0: acc, v1: acc + ccb, label: "CCB " + ccb.toFixed(1) + "%", color: "var(--amber)" }); acc += ccb; }
    if (ccyb > 0) { bufSegs.push({ v0: acc, v1: acc + ccyb, label: "CCyB " + ccyb.toFixed(1) + "%", color: "var(--red)" }); acc += ccyb; }
    if (gsib > 0) { bufSegs.push({ v0: acc, v1: acc + gsib, label: "G-SIB " + gsib.toFixed(1) + "%", color: "var(--green)" }); acc += gsib; }
    bufSegs.forEach(function (s) {
      svgEl("rect", { x: barX, y: Y(s.v1), width: barW, height: Y(s.v0) - Y(s.v1), fill: s.color, opacity: 0.35, stroke: s.color, "stroke-dasharray": "3 2" }, svg);
      var t = svgEl("text", { x: barX + barW + 10, y: (Y(s.v0) + Y(s.v1)) / 2 + 4, "font-size": 11, fill: s.color }, svg);
      t.textContent = s.label;
    });

    /* reference dashed lines */
    [[cet1, "CET1 " + cet1.toFixed(1) + "%"], [tier1min, "Tier 1 " + tier1min.toFixed(1) + "%"], [totalmin, "Total " + totalmin.toFixed(1) + "%"]].forEach(function (r) {
      svgEl("line", { x1: 40, x2: barX + barW, y1: Y(r[0]), y2: Y(r[0]), stroke: "var(--text-faint)", "stroke-width": 1, "stroke-dasharray": "2 3" }, svg);
      var t = svgEl("text", { x: 36, y: Y(r[0]) + 3, "text-anchor": "end", "font-size": 10, fill: "var(--text-dim)" }, svg);
      t.textContent = r[1];
    });

    /* current-ratio marker */
    var my = Y(cur);
    svgEl("line", { x1: barX - 8, x2: barX + barW + 8, y1: my, y2: my, stroke: "var(--text)", "stroke-width": 2 }, svg);
    svgEl("circle", { cx: barX + barW + 8, cy: my, r: 4, fill: "var(--text)" }, svg);
    var mt = svgEl("text", { x: barX + barW + 16, y: my - 8, "font-size": 11, "font-weight": 700, fill: "var(--text)" }, svg);
    mt.textContent = "bank is here → " + cur.toFixed(1) + "%";

    var t0 = svgEl("text", { x: barX, y: 16, "font-size": 11 }, svg);
    t0.textContent = "% of risk-weighted assets";
  }
  curIn.addEventListener("input", draw);
  draw();
});

/* =====================================================================
   3) Operational-risk aggregate loss distribution
   data-lossdist = {lambda, mu, sigma, seed}
   Frequency ~ Poisson(lambda); severity ~ lognormal(mu, sigma)
   ===================================================================== */
register("lossdist", function (el) {
  var d;
  try { d = JSON.parse(el.getAttribute("data-lossdist")); } catch (e) { d = null; }
  d = d || {};
  var lambda0 = typeof d.lambda === "number" ? d.lambda : 12;
  var mu0 = typeof d.mu === "number" ? d.mu : 8.5;
  var sigma0 = typeof d.sigma === "number" ? d.sigma : 1.3;
  var seed0 = typeof d.seed === "number" ? d.seed : 7;

  var svg = shell(el, "Aggregate operational loss distribution — frequency × severity",
    '<label>Frequency λ (events/yr) <input type="range" min="2" max="40" step="1" value="' + lambda0 + '" data-k="lam"><span class="w-value" data-v="lam"></span></label>' +
    '<label>Severity shape σ <input type="range" min="0.5" max="2.5" step="0.1" value="' + sigma0 + '" data-k="sig"><span class="w-value" data-v="sig"></span></label>' +
    '<span class="w-value" data-out></span>',
    680, 300,
    "Regulatory operational risk capital ≈ the 99.9% one-year quantile of this simulated aggregate loss distribution, MINUS the expected loss (the mean) — capital covers the unexpected loss, not the whole tail. Notice how far the 99.9% mark sits beyond the mean and beyond the visible histogram body: that gap is exactly why op-risk capital can dwarf a bank's average annual loss experience."
  );
  var lamIn = el.querySelector('[data-k="lam"]'), sigIn = el.querySelector('[data-k="sig"]');
  var lamV = el.querySelector('[data-v="lam"]'), sigV = el.querySelector('[data-v="sig"]');
  var out = el.querySelector("[data-out]");

  function simulate(lambda, sigma) {
    var seed = Math.round(seed0 * 977 + lambda * 31 + sigma * 1009);
    var rnd = rng(seed);
    var N = 4000;
    var losses = [];
    for (var i = 0; i < N; i++) {
      var L = Math.exp(-lambda), k = -1, p = 1;
      do { k++; p *= rnd(); } while (p > L);
      var total = 0;
      for (var j = 0; j < k; j++) {
        var u = rnd();
        if (u <= 0 || u >= 1) u = 0.5;
        total += Math.exp(mu0 + sigma * ninv(u));
      }
      losses.push(total);
    }
    losses.sort(function (a, b) { return a - b; });
    return losses;
  }

  function draw() {
    var lambda = parseFloat(lamIn.value), sigma = parseFloat(sigIn.value);
    lamV.textContent = lambda.toFixed(0);
    sigV.textContent = sigma.toFixed(1);
    var losses = simulate(lambda, sigma);
    var n = losses.length;
    var sum = 0;
    for (var i = 0; i < n; i++) sum += losses[i];
    var mean = sum / n;
    var q999idx = Math.min(n - 1, Math.ceil(0.999 * n) - 1);
    var q999 = losses[q999idx];
    var ul = Math.max(0, q999 - mean);
    out.textContent = "Expected loss (mean) = " + fmtMoney(mean) + " · 99.9% VaR = " + fmtMoney(q999) + " · capital (unexpected loss) ≈ " + fmtMoney(ul);

    svg.innerHTML = "";
    var Wd = 680, H = 300, x0 = 46, x1 = Wd - 24, y0 = H - 40, y1 = 26;
    var capIdx = Math.min(n - 1, Math.ceil(0.985 * n) - 1);
    var capShow = Math.max(losses[capIdx] * 1.15, mean * 1.5, 1);
    var bins = 40, counts = [];
    for (var bi = 0; bi < bins; bi++) counts.push(0);
    losses.forEach(function (v) {
      var idx = Math.min(bins - 1, Math.floor(v / capShow * bins));
      counts[idx]++;
    });
    var maxc = 0;
    for (var ci = 0; ci < bins; ci++) if (counts[ci] > maxc) maxc = counts[ci];
    function X(v) { return x0 + Math.min(v, capShow) / capShow * (x1 - x0); }
    var bw = (x1 - x0) / bins;
    for (var b = 0; b < bins; b++) {
      var h = maxc ? (counts[b] / maxc) * (y0 - y1) : 0;
      var binVal = (b + 0.5) / bins * capShow;
      var col = binVal > q999 ? "var(--red)" : "var(--accent)";
      svgEl("rect", { x: x0 + b * bw, y: y0 - h, width: Math.max(bw - 1, 0.5), height: h, fill: col, opacity: binVal > q999 ? 0.85 : 0.7 }, svg);
    }
    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);

    /* mean marker */
    var mx = X(mean);
    svgEl("line", { x1: mx, x2: mx, y1: y1, y2: y0, stroke: "var(--green)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
    var t1 = svgEl("text", { x: mx, y: y1 - 6, "text-anchor": "middle", "font-size": 11, fill: "var(--green)" }, svg);
    t1.textContent = "EL (mean)";

    /* 99.9% quantile marker */
    var clipped = q999 > capShow;
    var qx = X(q999);
    svgEl("line", { x1: qx, x2: qx, y1: y1, y2: y0, stroke: "var(--red)", "stroke-width": 2 }, svg);
    var t2 = svgEl("text", { x: qx, y: y1 - 6, "text-anchor": clipped ? "end" : "middle", "font-size": 11, fill: "var(--red)" }, svg);
    t2.textContent = "99.9% VaR" + (clipped ? " (off-scale →)" : "");

    var t3 = svgEl("text", { x: x0, y: 14, "font-size": 11 }, svg);
    t3.textContent = "simulated annual aggregate loss — histogram of " + n + " years";
    var t4 = svgEl("text", { x: x1, y: y0 + 18, "text-anchor": "end", "font-size": 10, fill: "var(--text-faint)" }, svg);
    t4.textContent = "loss size →";
  }
  lamIn.addEventListener("input", draw);
  sigIn.addEventListener("input", draw);
  draw();
});

/* =====================================================================
   The "reporting cake" (R45) — three tiers of op-risk reporting.
   Click a tier to see who reads it, what it contains, how often.
   ===================================================================== */
register("reportingcake", function (el) {
  var TIERS = [
    { name: "Tier 3 — Executive / board risk committee", who: "Board risk committee, ExCo",
      what: "High-level trends, risk appetite vs actual, strategic progress only", freq: "Quarterly", w: 220 },
    { name: "Tier 2 — Operational risk committee", who: "Op risk committee, central op-risk function",
      what: "Aggregated KRIs, large events, items needing a decision", freq: "Monthly / quarterly", w: 380 },
    { name: "Tier 1 — Business line managers", who: "Business line managers (1st line)",
      what: "Full raw data set — every loss, every KRI; monitoring = reporting here", freq: "Daily", w: 540 },
  ];
  var svg = shell(el, "The reporting cake — detail shrinks as seniority rises", "",
    640, 250,
    "Same underlying data, three altitudes. Detail (layer width) shrinks going up because the cost of reading noise scales with how much else the reader is responsible for; a board fed Tier-1 detail is as badly served as a desk fed Tier-3 summaries.");
  var detail = document.createElement("div");
  detail.className = "w-caption";
  detail.style.marginTop = "0.4rem";
  el.appendChild(detail);

  var selected = 2;
  function draw() {
    svg.innerHTML = "";
    var W = 640, layerH = 56, gap = 10, topY = 26;
    TIERS.forEach(function (t, i) {
      var y = topY + i * (layerH + gap);
      var x = (W - t.w) / 2;
      var on = selected === i;
      var g = svgEl("g", { cursor: "pointer" }, svg);
      svgEl("rect", {
        x: x, y: y, width: t.w, height: layerH, rx: 9,
        fill: on ? "var(--accent-soft, rgba(108,157,255,0.18))" : "var(--bg-raised)",
        stroke: on ? "var(--accent)" : "var(--border-strong)", "stroke-width": on ? 2 : 1.2,
      }, g);
      var tx = svgEl("text", { x: W / 2, y: y + 24, "text-anchor": "middle", "font-size": 12.5, "font-weight": 700, fill: on ? "var(--accent)" : "var(--text)" }, g);
      tx.textContent = t.name;
      var fx = svgEl("text", { x: W / 2, y: y + 42, "text-anchor": "middle", "font-size": 11, fill: "var(--text-dim)" }, g);
      fx.textContent = t.freq + " · " + (i === 0 ? "least detail" : i === 2 ? "full detail" : "decision-relevant detail");
      g.addEventListener("click", function () { selected = i; draw(); });
    });
    var t = TIERS[selected];
    detail.innerHTML = "<b>" + t.name + "</b> — read by: " + t.who + ". Contains: " + t.what + ". Frequency: " + t.freq + ".";
  }
  draw();
});
