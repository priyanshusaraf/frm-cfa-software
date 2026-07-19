/* Ported verbatim from site/assets/app.js WIDGETS.* (lines ~717-1338). */
import { register, svgEl, shell, rng as mulberry32, npdf, ncdf, ninv } from "./index.js";

/* --- VaR / ES on a normal curve --- */
register("quantile", function (el) {
  var svg = shell(el, "VaR vs Expected Shortfall — drag the confidence level",
    '<label>Confidence <input type="range" min="90" max="99.5" step="0.5" value="95"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 240,
    "The line is VaR: the loss threshold. The shaded region beyond it is what ES averages. Notice ES moves deeper than VaR as confidence rises — and the gap is what fat tails widen.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  function draw() {
    var c = parseFloat(slider.value) / 100;
    val.textContent = (c * 100).toFixed(1) + "%";
    var z = ninv(1 - c); /* negative */
    var es = npdf(ninv(c)) / (1 - c);
    out.textContent = "VaR = " + (-z).toFixed(2) + "σ · ES = " + es.toFixed(2) + "σ";
    svg.innerHTML = "";
    var W = 640, H = 240, x0 = 30, x1 = W - 20, y0 = H - 30;
    function X(x) { return x0 + (x + 4) / 8 * (x1 - x0); }
    function Y(p) { return y0 - p / 0.42 * (H - 60); }
    /* tail fill */
    var d2 = "M" + X(-4) + "," + Y(0);
    for (var x = -4; x <= z; x += 0.05) d2 += " L" + X(x) + "," + Y(npdf(x));
    d2 += " L" + X(z) + "," + Y(0) + " Z";
    svgEl("path", { d: d2, fill: "var(--red)", opacity: 0.35 }, svg);
    /* curve */
    var d = "";
    for (var x2 = -4; x2 <= 4; x2 += 0.05) d += (d ? " L" : "M") + X(x2) + "," + Y(npdf(x2));
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
    /* VaR line */
    svgEl("line", { x1: X(z), x2: X(z), y1: Y(0.40), y2: Y(0), stroke: "var(--red)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
    var t1 = svgEl("text", { x: X(z), y: Y(0.40) - 6, "text-anchor": "middle", "font-size": 12, fill: "var(--red)" }, svg);
    t1.textContent = "VaR (" + (-z).toFixed(2) + "σ)";
    /* ES marker */
    svgEl("line", { x1: X(-es), x2: X(-es), y1: Y(0.12), y2: Y(0), stroke: "var(--amber)", "stroke-width": 2 }, svg);
    var t2 = svgEl("text", { x: X(-es), y: Y(0.12) - 6, "text-anchor": "middle", "font-size": 12, fill: "var(--amber)" }, svg);
    t2.textContent = "ES (avg of tail)";
    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t3 = svgEl("text", { x: x1 - 4, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
    t3.textContent = "P&L (σ units) →";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- age-weighted decay --- */
register("decay", function (el) {
  var svg = shell(el, "Age-weighted historical simulation — the λ dial",
    '<label>λ (decay) <input type="range" min="0.90" max="0.999" step="0.001" value="0.98"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 200,
    "Each bar is one day's weight in the VaR calculation (most recent on the left). λ→1 flattens to plain historical simulation (all equal); small λ makes VaR react fast but forget fast. Ghost effects disappear because weights fade smoothly instead of falling off a cliff at the window edge.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  function draw() {
    var lam = parseFloat(slider.value), n = 100;
    val.textContent = lam.toFixed(3);
    svg.innerHTML = "";
    var W = 640, H = 200, x0 = 30, y0 = H - 26, bw = (W - 60) / 60;
    var denom = (1 - Math.pow(lam, n)) / (1 - lam);
    var w1 = 1 / denom;
    out.textContent = "day-1 weight = " + (w1 * 100).toFixed(2) + "% · day-60 = " + (Math.pow(lam, 59) / denom * 100).toFixed(3) + "%";
    for (var i = 0; i < 60; i++) {
      var w = Math.pow(lam, i) / denom;
      var hh = Math.min(1, w / 0.05) * (H - 55);
      svgEl("rect", { x: x0 + i * bw, y: y0 - hh, width: bw - 1.5, height: hh, fill: i === 0 ? "var(--accent)" : "var(--cyan)", opacity: i === 0 ? 1 : 0.7 }, svg);
    }
    svgEl("line", { x1: x0, x2: W - 25, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t = svgEl("text", { x: x0, y: y0 + 16, "font-size": 11 }, svg);
    t.textContent = "← today · observation age · 60 days →";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- EVT threshold picker --- */
register("evt", function (el) {
  var svg = shell(el, "Peaks-over-threshold — the u trade-off",
    '<label>Threshold u <input type="range" min="1" max="3.2" step="0.05" value="1.8"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 220,
    "Only points above the line are used to fit the Generalized Pareto tail. Raise u: the theory fits better but you starve the estimator of data. Lower u: plenty of data, but many points aren't genuinely 'extreme', so the GP approximation degrades. There is no free lunch — this bias-variance trade-off IS the exam question.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  var rnd = mulberry32(42), pts = [];
  for (var i = 0; i < 300; i++) {
    /* fat-tailed-ish losses via |t|-like draw */
    var u1 = rnd(), u2 = rnd();
    var zz = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
    var loss = Math.abs(zz) * (rnd() < 0.06 ? 2.4 : 1);
    pts.push({ x: i / 300, y: Math.min(loss, 4) });
  }
  function draw() {
    var u = parseFloat(slider.value);
    val.textContent = u.toFixed(2) + "σ";
    svg.innerHTML = "";
    var W = 640, H = 220, x0 = 34, y0 = H - 26;
    function Y(v) { return y0 - v / 4 * (H - 50); }
    var nu = 0;
    pts.forEach(function (p) {
      var above = p.y > u; if (above) nu++;
      svgEl("circle", { cx: x0 + p.x * (W - 60), cy: Y(p.y), r: above ? 3.2 : 2, fill: above ? "var(--red)" : "var(--text-faint)", opacity: above ? 0.95 : 0.4 }, svg);
    });
    svgEl("line", { x1: x0, x2: W - 25, y1: Y(u), y2: Y(u), stroke: "var(--amber)", "stroke-width": 2, "stroke-dasharray": "5 4" }, svg);
    out.textContent = "Nᵤ = " + nu + " of 300 exceedances";
    svgEl("line", { x1: x0, x2: W - 25, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t = svgEl("text", { x: x0, y: 16, "font-size": 11 }, svg);
    t.textContent = "loss size (each dot = one day)";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- Basel traffic light --- */
register("traffic", function (el) {
  var svg = shell(el, "Basel backtesting traffic lights — 250 days, 99% VaR",
    '<label>Exceptions <input type="range" min="0" max="14" step="1" value="3"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 120,
    "Expected exceptions at 99% over 250 days ≈ 2.5. Green (0–4): consistent with an accurate model. Yellow (5–9): supervisor judgment, k rises 3.40→3.85. Red (10+): automatic penalty, k = 4. A correct model still lands in yellow ~10.8% of the time — that's the Type I error regulators accept to catch bad models.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  function draw() {
    var x = parseInt(slider.value, 10);
    val.textContent = x + " exceptions";
    var zone = x <= 4 ? "GREEN" : x <= 9 ? "YELLOW" : "RED";
    var k = x <= 4 ? 3.0 : x >= 10 ? 4.0 : [3.40, 3.50, 3.65, 3.75, 3.85][x - 5];
    out.textContent = zone + " zone · capital multiplier k = " + k.toFixed(2);
    svg.innerHTML = "";
    var W = 640, x0 = 30, bw = (W - 60) / 15;
    for (var i = 0; i <= 14; i++) {
      var col = i <= 4 ? "var(--green)" : i <= 9 ? "var(--amber)" : "var(--red)";
      svgEl("rect", { x: x0 + i * bw, y: 40, width: bw - 3, height: 34, rx: 5, fill: col, opacity: i === x ? 1 : 0.22 }, svg);
      var t = svgEl("text", { x: x0 + i * bw + bw / 2 - 1.5, y: 62, "text-anchor": "middle", "font-size": 12, fill: i === x ? "#fff" : "var(--text-dim)", "font-weight": i === x ? 700 : 400 }, svg);
      t.textContent = i;
    }
    var lbl = svgEl("text", { x: x0, y: 24, "font-size": 11 }, svg);
    lbl.textContent = "number of days actual loss exceeded VaR";
    var mk = svgEl("text", { x: x0 + 2.5 * bw, y: 96, "text-anchor": "middle", "font-size": 10, fill: "var(--text-faint)" }, svg);
    mk.textContent = "↑ expected ≈ 2.5";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- two-asset diversification --- */
register("divers", function (el) {
  var svg = shell(el, "Diversification vs correlation — the only free lunch, rationed",
    '<label>ρ <input type="range" min="-1" max="1" step="0.05" value="0.6"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 210,
    "Two assets, 50/50, σ = 20% each. Portfolio volatility (and hence VaR) falls smoothly as ρ falls — the benefit does NOT appear only near ρ = −1. At ρ = 1 there is no diversification at all: σP = 20%. This one curve is behind portfolio VaR, credit portfolio tails, and factor investing alike.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  function sigP(rho) { return Math.sqrt(0.25 * 0.04 + 0.25 * 0.04 + 2 * 0.25 * 0.04 * rho) * 100; }
  function draw() {
    var rho = parseFloat(slider.value);
    val.textContent = rho.toFixed(2);
    out.textContent = "σP = " + sigP(rho).toFixed(1) + "%";
    svg.innerHTML = "";
    var W = 640, H = 210, x0 = 40, y0 = H - 30;
    function X(r) { return x0 + (r + 1) / 2 * (W - 70); }
    function Y(s) { return y0 - s / 22 * (H - 60); }
    var d = "";
    for (var r = -1; r <= 1.001; r += 0.02) d += (d ? " L" : "M") + X(r) + "," + Y(sigP(r));
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2.2 }, svg);
    svgEl("circle", { cx: X(rho), cy: Y(sigP(rho)), r: 5.5, fill: "var(--amber)" }, svg);
    svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    svgEl("line", { x1: x0, x2: x0, y1: 20, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t1 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
    t1.textContent = "correlation ρ →";
    var t2 = svgEl("text", { x: x0 + 4, y: 16, "font-size": 11 }, svg);
    t2.textContent = "portfolio σ (%)";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- binomial rate tree with drift / mean reversion --- */
register("tree", function (el) {
  var svg = shell(el, "Short-rate tree — add drift, then mean reversion",
    '<label>drift λ (bp/period) <input type="range" min="-40" max="40" step="5" value="0" data-k="lam"><span class="w-value" data-v="lam"></span></label>' +
    '<label>mean reversion k <input type="range" min="0" max="0.6" step="0.05" value="0" data-k="mr"><span class="w-value" data-v="mr"></span></label>',
    680, 260,
    "Start rate 6%, volatility 50bp/period, long-run mean θ = 5%. With k = 0 and λ = 0 you have Model 1 (symmetric, recombining). Add drift: the whole tree tilts (Model 2 / Ho-Lee). Add mean reversion: high nodes get pulled down and low nodes pulled up toward θ — the tree squeezes and no longer recombines naturally (Vasicek).");
  var sliders = el.querySelectorAll("input");
  function draw() {
    var lam = parseFloat(el.querySelector('[data-k="lam"]').value) / 100;
    var k = parseFloat(el.querySelector('[data-k="mr"]').value);
    el.querySelector('[data-v="lam"]').textContent = (lam * 100).toFixed(0) + "bp";
    el.querySelector('[data-v="mr"]').textContent = k.toFixed(2);
    svg.innerHTML = "";
    var r0 = 6, theta = 5, vol = 0.5, W = 680, H = 260;
    /* build 4 periods of paths (non-recombining if k>0) */
    var levels = [[{ r: r0, y: 0 }]];
    for (var t = 1; t <= 3; t++) {
      var prev = levels[t - 1], next = [];
      prev.forEach(function (nd) {
        var drift = lam + k * (theta - nd.r);
        next.push({ r: nd.r + drift + vol, parent: nd });
        next.push({ r: nd.r + drift - vol, parent: nd });
      });
      levels.push(next);
    }
    var minR = 3, maxR = 9;
    function Y(r) { return 230 - (r - minR) / (maxR - minR) * 200; }
    function X(t) { return 60 + t * 190; }
    /* edges */
    levels.forEach(function (lvl, t) {
      if (t === 0) return;
      lvl.forEach(function (nd) {
        svgEl("line", { x1: X(t - 1), y1: Y(nd.parent.r), x2: X(t), y2: Y(nd.r), stroke: "var(--border-strong)", "stroke-width": 1 }, svg);
      });
    });
    levels.forEach(function (lvl, t) {
      var seen = {};
      lvl.forEach(function (nd) {
        var key = nd.r.toFixed(3);
        if (seen[key]) return; seen[key] = 1;
        svgEl("circle", { cx: X(t), cy: Y(nd.r), r: 4, fill: "var(--accent)" }, svg);
        var tx = svgEl("text", { x: X(t) + 8, y: Y(nd.r) + 4, "font-size": 11, fill: "var(--text)" }, svg);
        tx.textContent = nd.r.toFixed(2) + "%";
      });
    });
    svgEl("line", { x1: 40, x2: W - 20, y1: Y(theta), y2: Y(theta), stroke: "var(--amber)", "stroke-dasharray": "4 4", opacity: 0.7 }, svg);
    var t0 = svgEl("text", { x: W - 22, y: Y(theta) - 5, "text-anchor": "end", "font-size": 10, fill: "var(--amber)" }, svg);
    t0.textContent = "θ = 5%";
  }
  sliders.forEach(function (s) { s.addEventListener("input", draw); });
  draw();
});

/* --- volatility smile shapes --- */
register("smile", function (el) {
  var svg = shell(el, "Smile · skew · frown — read the market's mind",
    '<span class="seg"><button data-m="smile" class="on">FX: smile</button><button data-m="skew">Equity: skew</button><button data-m="frown">Jump: frown</button></span>' +
    '<span class="w-value" data-out></span>', 640, 220, "");
  var out = el.querySelector("[data-out]"), cap = el.querySelector(".w-caption") || (function () {
    var c = document.createElement("div"); c.className = "w-caption"; el.appendChild(c); return c;
  })();
  var mode = "smile";
  var captions = {
    smile: "Both wings priced above ATM: the market believes extreme moves in EITHER direction are more likely than lognormal admits (fat tails both sides). Classic for currencies.",
    skew: "OTM puts (low strikes) priced far above OTM calls: down-crashes are feared more than up-melts. Causes: leverage effect (falling price → higher leverage → higher vol) + crashophobia (post-1987 protection premium). Classic for equities.",
    frown: "ATM priced ABOVE the wings: an anticipated jump (earnings, ruling, merger) makes the outcome bimodal — big move likely, small move unlikely. The inverse of the smile."
  };
  function f(x) {
    if (mode === "smile") return 18 + 9 * x * x;
    if (mode === "skew") return 20 - 7 * x + 2.2 * x * x;
    return 24 - 7 * x * x;
  }
  function draw() {
    svg.innerHTML = "";
    var W = 640, H = 220, x0 = 42, y0 = H - 30;
    function X(x) { return x0 + (x + 1.6) / 3.2 * (W - 72); }
    function Y(v) { return y0 - (v - 8) / 30 * (H - 60); }
    var d = "";
    for (var x = -1.6; x <= 1.6; x += 0.04) d += (d ? " L" : "M") + X(x) + "," + Y(f(x));
    svgEl("path", { d: d, fill: "none", stroke: "var(--purple)", "stroke-width": 2.4 }, svg);
    svgEl("line", { x1: X(0), x2: X(0), y1: 18, y2: y0, stroke: "var(--border-strong)", "stroke-dasharray": "4 4" }, svg);
    svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t1 = svgEl("text", { x: X(0), y: y0 + 16, "text-anchor": "middle", "font-size": 11 }, svg);
    t1.textContent = "ATM (K/S = 1)";
    var t2 = svgEl("text", { x: x0, y: y0 + 16, "font-size": 11 }, svg);
    t2.textContent = "low strike (OTM puts)";
    var t3 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
    t3.textContent = "high strike (OTM calls)";
    var t4 = svgEl("text", { x: x0, y: 16, "font-size": 11 }, svg);
    t4.textContent = "implied volatility";
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

/* --- counterparty exposure profiles --- */
register("exposure", function (el) {
  var svg = shell(el, "Exposure profiles by product — shape is the answer",
    '<span class="seg"><button data-m="swap" class="on">IR swap</button><button data-m="fx">FX forward</button><button data-m="xccy">Cross-ccy swap</button><button data-m="opt">Long option</button></span>',
    640, 220, "");
  var cap = document.createElement("div"); cap.className = "w-caption"; el.appendChild(cap);
  var mode = "swap";
  var captions = {
    swap: "Interest-rate swap: two forces fight. Diffusion (more time = more rate drift) pushes exposure UP; amortization (fewer remaining payments) pulls it DOWN. Result: hump peaking around 1/3–1/2 of maturity, then decay to zero.",
    fx: "FX forward: one exchange at maturity, so nothing amortizes — diffusion wins the whole way. Exposure grows monotonically (≈ √t) and peaks AT maturity.",
    xccy: "Cross-currency swap: periodic coupons + a large notional exchange at the end. Looks like a swap early but keeps climbing — the final FX notional exchange dominates. Highest of the profiles shown.",
    opt: "Long option (premium paid upfront): you have no obligation left, only a claim. Exposure = current option value, always ≥ 0, growing with time value/moneyness — and never a liability, so no negative exposure."
  };
  function f(t, m) {
    if (m === "swap") return Math.sqrt(t) * (1 - t) * 2.4;
    if (m === "fx") return Math.sqrt(t) * 1.3;
    if (m === "xccy") return Math.sqrt(t) * (1 - 0.35 * t) * 2.1;
    return 0.5 + Math.sqrt(t) * 0.85;
  }
  function draw() {
    svg.innerHTML = "";
    var W = 640, H = 220, x0 = 42, y0 = H - 30;
    function X(t) { return x0 + t * (W - 72); }
    function Y(v) { return y0 - v / 1.7 * (H - 60); }
    ["swap", "fx", "xccy", "opt"].forEach(function (m) {
      if (m === mode) return;
      var d = "";
      for (var t = 0.001; t <= 1; t += 0.01) d += (d ? " L" : "M") + X(t) + "," + Y(f(t, m));
      svgEl("path", { d: d, fill: "none", stroke: "var(--text-faint)", "stroke-width": 1, opacity: 0.35 }, svg);
    });
    var d2 = "";
    for (var t2 = 0.001; t2 <= 1; t2 += 0.01) d2 += (d2 ? " L" : "M") + X(t2) + "," + Y(f(t2, mode));
    svgEl("path", { d: d2, fill: "none", stroke: "var(--green)", "stroke-width": 2.6 }, svg);
    svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t3 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
    t3.textContent = "time → maturity";
    var t4 = svgEl("text", { x: x0, y: 16, "font-size": 11 }, svg);
    t4.textContent = "expected exposure";
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

/* --- tranche losses vs default correlation (large-pool Vasicek) --- */
register("tranche", function (el) {
  var svg = shell(el, "Who eats the losses? Correlation reshapes the tranche stack",
    '<label>default correlation ρ <input type="range" min="0.01" max="0.9" step="0.01" value="0.15"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 230,
    "Large homogeneous pool, PD = 5%, LGD = 100%. Low ρ: losses cluster tightly near expected loss — equity is toast, senior is bulletproof. High ρ: the distribution grows a fat right tail AND more mass near zero — senior tranches start dying (systemic scenarios), while equity's expected loss actually falls (many scenarios now have almost no defaults). Correlation moves value BETWEEN tranches; it barely changes total pool loss.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  function draw() {
    var rho = parseFloat(slider.value), pd = 0.05;
    val.textContent = rho.toFixed(2);
    svg.innerHTML = "";
    var W = 640, H = 230, x0 = 42, y0 = H - 42;
    function X(l) { return x0 + l * (W - 72); }
    /* density of large-pool loss via derivative approx on grid */
    var grid = [], maxd = 0;
    var prev = 0;
    for (var i = 1; i <= 200; i++) {
      var L = i / 200 * 0.4; /* show 0..40% loss */
      var cdf = ncdf((Math.sqrt(1 - rho) * ninv(Math.min(L, 0.9999)) - ninv(pd)) / Math.sqrt(rho));
      var dens = Math.max(0, cdf - prev); prev = cdf;
      grid.push({ L: L, d: dens }); if (dens > maxd) maxd = dens;
    }
    function Y(d) { return y0 - Math.pow(d / maxd, 0.5) * (H - 78); }
    /* tranche bands: equity 0-5%, mezz 5-15%, senior 15%+ */
    svgEl("rect", { x: X(0), y: 18, width: X(0.05) - X(0), height: y0 - 18, fill: "var(--red)", opacity: 0.10 }, svg);
    svgEl("rect", { x: X(0.05), y: 18, width: X(0.15) - X(0.05), height: y0 - 18, fill: "var(--amber)", opacity: 0.10 }, svg);
    svgEl("rect", { x: X(0.15), y: 18, width: X(0.4) - X(0.15), height: y0 - 18, fill: "var(--green)", opacity: 0.10 }, svg);
    var d = "";
    grid.forEach(function (g) { d += (d ? " L" : "M") + X(g.L) + "," + Y(g.d); });
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2.2 }, svg);
    var labels = [["equity 0–5%", 0.025, "var(--red)"], ["mezzanine 5–15%", 0.10, "var(--amber)"], ["senior 15%+", 0.27, "var(--green)"]];
    labels.forEach(function (l) {
      var t = svgEl("text", { x: X(l[1]), y: y0 + 16, "text-anchor": "middle", "font-size": 11, fill: l[2] }, svg);
      t.textContent = l[0];
    });
    /* P(senior hit) */
    var pSen = 1 - ncdf((Math.sqrt(1 - rho) * ninv(0.15) - ninv(pd)) / Math.sqrt(rho));
    out.textContent = "P(pool loss > 15%) = " + (pSen * 100).toFixed(2) + "%";
    var t5 = svgEl("text", { x: x0, y: 14, "font-size": 11 }, svg);
    t5.textContent = "probability density of pool loss";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- liquidity-adjusted VaR --- */
register("lvar", function (el) {
  var svg = shell(el, "Liquidity-adjusted VaR — the spread tax on exit",
    '<label>bid-ask spread <input type="range" min="0" max="4" step="0.1" value="1"><span class="w-value"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 130,
    "VaR assumes you can exit at mid. Reality: you sell at the bid. The constant-spread add-on is ½ × spread × position value — trivial for liquid large caps (spread ≈ 0.05%), dominant for distressed credit (spread can exceed the VaR itself). Exogenous spread = market-wide; if YOUR size moves the price, that's endogenous liquidity and needs the elasticity approach instead.");
  var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
  function draw() {
    var s = parseFloat(slider.value); /* % */
    val.textContent = s.toFixed(1) + "%";
    var varBase = 3.3, lc = 0.5 * s;
    out.textContent = "LVaR = VaR + LC = " + varBase.toFixed(1) + "% + " + lc.toFixed(2) + "% = " + (varBase + lc).toFixed(2) + "%";
    svg.innerHTML = "";
    var W = 640, x0 = 40, bh = 34, y = 40;
    var scale = (W - 80) / 6;
    svgEl("rect", { x: x0, y: y, width: varBase * scale, height: bh, rx: 6, fill: "var(--accent)", opacity: 0.8 }, svg);
    svgEl("rect", { x: x0 + varBase * scale, y: y, width: lc * scale, height: bh, rx: 6, fill: "var(--red)", opacity: 0.85 }, svg);
    var t1 = svgEl("text", { x: x0 + varBase * scale / 2, y: y + 21, "text-anchor": "middle", "font-size": 12, fill: "#fff" }, svg);
    t1.textContent = "market VaR";
    if (lc > 0.3) {
      var t2 = svgEl("text", { x: x0 + (varBase + lc / 2) * scale, y: y + 21, "text-anchor": "middle", "font-size": 11, fill: "#fff" }, svg);
      t2.textContent = "+LC";
    }
  }
  slider.addEventListener("input", draw);
  draw();
});

/* --- ALM repricing gap --- */
register("gap", function (el) {
  var svg = shell(el, "Repricing gap — which way does the income bet point?",
    '<label>Δ rates <input type="range" min="-3" max="3" step="0.25" value="1" data-k="dr"><span class="w-value" data-v="dr"></span></label>' +
    '<label>GAP (RSA − RSL, $M) <input type="range" min="-200" max="200" step="10" value="-100" data-k="gap"><span class="w-value" data-v="gap"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 120,
    "ΔNII ≈ GAP × Δr. Negative gap (more rate-sensitive liabilities than assets — the classic bank) profits when rates FALL and bleeds when rates rise. Positive gap is the mirror image. Note this is the near-term income effect only; the economic-value effect works through duration gap and can point the opposite way.");
  var out = el.querySelector("[data-out]");
  function draw() {
    var dr = parseFloat(el.querySelector('[data-k="dr"]').value);
    var gap = parseFloat(el.querySelector('[data-k="gap"]').value);
    el.querySelector('[data-v="dr"]').textContent = (dr > 0 ? "+" : "") + dr.toFixed(2) + "%";
    el.querySelector('[data-v="gap"]').textContent = (gap > 0 ? "+" : "") + gap + "M";
    var dnii = gap * dr / 100;
    out.textContent = "ΔNII ≈ " + (dnii >= 0 ? "+$" : "−$") + Math.abs(dnii).toFixed(2) + "M";
    svg.innerHTML = "";
    var W = 640, cx = W / 2, y = 46, bh = 30;
    var w = Math.min(240, Math.abs(dnii) * 120);
    svgEl("line", { x1: cx, x2: cx, y1: 24, y2: y + bh + 8, stroke: "var(--border-strong)" }, svg);
    svgEl("rect", { x: dnii >= 0 ? cx : cx - w, y: y, width: Math.max(w, 1), height: bh, rx: 6, fill: dnii >= 0 ? "var(--green)" : "var(--red)", opacity: 0.85 }, svg);
    var t = svgEl("text", { x: cx, y: 18, "text-anchor": "middle", "font-size": 11 }, svg);
    t.textContent = "net interest income impact";
  }
  el.querySelectorAll("input").forEach(function (s) { s.addEventListener("input", draw); });
  draw();
});

/* --- security market line vs low-risk anomaly --- */
register("sml", function (el) {
  var svg = shell(el, "The low-risk anomaly — CAPM's line vs reality",
    '<span class="seg"><button data-m="capm" class="on">CAPM says</button><button data-m="real">Data says</button></span>',
    640, 220, "");
  var cap = document.createElement("div"); cap.className = "w-caption"; el.appendChild(cap);
  var mode = "capm";
  var captions = {
    capm: "CAPM: expected return rises linearly with β. Take more market risk, earn more — the security market line.",
    real: "Empirically the line is nearly FLAT (even downward at the top): high-β stocks earn little more — sometimes less — than low-β stocks, and low-β stocks earn far more than CAPM predicts. Candidate causes: leverage constraints (investors who can't lever buy high-β instead, overpricing it), benchmark-hugging institutions, lottery preferences."
  };
  function draw() {
    svg.innerHTML = "";
    var W = 640, H = 220, x0 = 46, y0 = H - 34;
    function X(b) { return x0 + b / 2 * (W - 80); }
    function Y(r) { return y0 - r / 14 * (H - 66); }
    svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    svgEl("line", { x1: x0, x2: x0, y1: 18, y2: y0, stroke: "var(--border-strong)" }, svg);
    /* CAPM line */
    svgEl("line", { x1: X(0), y1: Y(3), x2: X(2), y2: Y(13), stroke: "var(--text-faint)", "stroke-width": 1.4, "stroke-dasharray": mode === "capm" ? "" : "5 4" }, svg);
    if (mode === "real") {
      var d = "M" + X(0.2) + "," + Y(5.6);
      [[0.5, 7.0], [0.8, 7.8], [1.0, 8.1], [1.3, 8.3], [1.6, 8.2], [1.9, 7.6]].forEach(function (p) { d += " L" + X(p[0]) + "," + Y(p[1]); });
      svgEl("path", { d: d, fill: "none", stroke: "var(--purple)", "stroke-width": 2.6 }, svg);
      var rnd2 = mulberry32(7);
      [[0.3, 6.4], [0.55, 7.4], [0.75, 7.5], [0.95, 8.4], [1.15, 8.0], [1.35, 8.6], [1.55, 7.9], [1.75, 8.0], [1.95, 7.2]].forEach(function (p) {
        svgEl("circle", { cx: X(p[0]), cy: Y(p[1] + (rnd2() - 0.5)), r: 3, fill: "var(--purple)", opacity: 0.55 }, svg);
      });
    }
    var t1 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
    t1.textContent = "beta →";
    var t2 = svgEl("text", { x: x0 + 4, y: 14, "font-size": 11 }, svg);
    t2.textContent = "average return (%)";
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

/* --- generic bar comparison, data via data-bars JSON --- */
register("bars", function (el) {
  var data;
  try { data = JSON.parse(el.getAttribute("data-bars")); } catch (e) { return; }
  var svg = shell(el, el.getAttribute("data-title") || "", "", 640, 40 + data.items.length * 38, el.getAttribute("data-caption") || "");
  var maxv = 0;
  data.items.forEach(function (it) { if (it.v > maxv) maxv = it.v; });
  var y = 14;
  data.items.forEach(function (it) {
    var w = it.v / maxv * 380;
    svgEl("rect", { x: 200, y: y, width: w, height: 24, rx: 5, fill: it.c || "var(--accent)", opacity: 0.85 }, svg);
    var t = svgEl("text", { x: 194, y: y + 16, "text-anchor": "end", "font-size": 11.5 }, svg);
    t.textContent = it.l;
    var t2 = svgEl("text", { x: 206 + w, y: y + 16, "font-size": 11.5, fill: "var(--text)" }, svg);
    t2.textContent = it.d || it.v;
    y += 38;
  });
});

/* --- Merton structural model: distance to default & PD (r25) --- */
register("merton", function (el) {
  var svg = shell(el, "Merton model — distance to default & PD",
    '<label>Asset volatility σ<sub>A</sub> <input type="range" min="0.08" max="0.60" step="0.01" value="0.25"><span class="w-value" data-vol></span></label>' +
    '<label>Leverage D/V<sub>0</sub> <input type="range" min="0.30" max="0.97" step="0.01" value="0.70"><span class="w-value" data-lev></span></label>' +
    '<span class="w-value" data-out></span>', 640, 250,
    "Terminal asset value is lognormal; the firm defaults if it lands left of the debt threshold ln(D/V₀). Distance to default (DD) is how many standard deviations the mean sits above that threshold; PD = N(−DD) is the shaded tail. Raise volatility or leverage and watch the threshold slide into the distribution — PD climbs non-linearly.");
  var sliders = el.querySelectorAll("input"), volS = sliders[0], levS = sliders[1];
  var volO = el.querySelector("[data-vol]"), levO = el.querySelector("[data-lev]"), out = el.querySelector("[data-out]");
  function draw() {
    var sig = parseFloat(volS.value), L = parseFloat(levS.value), T = 1;
    volO.textContent = (sig * 100).toFixed(0) + "%";
    levO.textContent = L.toFixed(2);
    var s = sig * Math.sqrt(T), m = -0.5 * sig * sig * T;   // mean/sd of ln(V_T/V0), μ=0
    var xd = Math.log(L);                                   // default threshold (log space)
    var DD = (-Math.log(L) - 0.5 * sig * sig * T) / s;
    var PD = ncdf(-DD);
    out.textContent = "DD = " + DD.toFixed(2) + " · PD = " + (PD * 100).toFixed(PD < 0.01 ? 2 : 1) + "%";
    svg.innerHTML = "";
    var W = 640, H = 250, x0 = 20, x1 = W - 16, y0 = H - 30;
    var lo = Math.min(m - 4 * s, xd - 0.06), hi = m + 4 * s;
    function X(x) { return x0 + (x - lo) / (hi - lo) * (x1 - x0); }
    var pmax = npdf(0) / s;
    function Y(p) { return y0 - p / pmax * (H - 74); }
    function pdf(x) { return npdf((x - m) / s) / s; }
    /* default-region fill (x <= xd) */
    var df = "M" + X(lo) + "," + Y(0);
    for (var x = lo; x <= xd; x += (hi - lo) / 400) df += " L" + X(x) + "," + Y(pdf(x));
    df += " L" + X(xd) + "," + Y(0) + " Z";
    svgEl("path", { d: df, fill: "var(--red)", opacity: 0.4 }, svg);
    /* curve */
    var d = "";
    for (var x2 = lo; x2 <= hi; x2 += (hi - lo) / 400) d += (d ? " L" : "M") + X(x2) + "," + Y(pdf(x2));
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
    /* threshold line */
    svgEl("line", { x1: X(xd), x2: X(xd), y1: Y(pmax * 1.02), y2: Y(0), stroke: "var(--red)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
    var t1 = svgEl("text", { x: X(xd), y: Y(pmax * 1.02) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--red)" }, svg);
    t1.textContent = "default point ln(D/V₀)";
    /* mean line + DD bracket */
    svgEl("line", { x1: X(m), x2: X(m), y1: Y(pmax), y2: Y(0), stroke: "var(--cyan)", "stroke-width": 1.5, "stroke-dasharray": "2 2" }, svg);
    var t2 = svgEl("text", { x: X(m), y: Y(pmax) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--cyan)" }, svg);
    t2.textContent = "E[ln V]";
    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var t3 = svgEl("text", { x: x1 - 4, y: y0 + 17, "text-anchor": "end", "font-size": 11 }, svg);
    t3.textContent = "ln(V_T / V₀) →";
  }
  volS.addEventListener("input", draw);
  levS.addEventListener("input", draw);
  draw();
});

/* --- Credit VaR: expected vs unexpected loss on the Vasicek loss distribution (r26) --- */
register("creditvar", function (el) {
  var svg = shell(el, "Credit VaR — expected vs unexpected loss",
    '<label>PD <input type="range" min="0.005" max="0.10" step="0.005" value="0.02"><span class="w-value" data-pd></span></label>' +
    '<label>Correlation ρ <input type="range" min="0.04" max="0.40" step="0.01" value="0.15"><span class="w-value" data-rho></span></label>' +
    '<label>Confidence <input type="range" min="0.99" max="0.9995" step="0.0005" value="0.999"><span class="w-value" data-conf></span></label>' +
    '<span class="w-value" data-out></span>', 640, 250,
    "The portfolio loss distribution is right-skewed (Vasicek). Expected loss (EL) is the mean — priced in, covered by provisions. Credit VaR is the high quantile; the gap between it and EL is Unexpected Loss, the economic capital a bank must hold. Raise correlation ρ and the tail fattens dramatically — same EL, far more capital.");
  var sl = el.querySelectorAll("input"), pdS = sl[0], rhoS = sl[1], cfS = sl[2];
  var pdO = el.querySelector("[data-pd]"), rhoO = el.querySelector("[data-rho]"), cfO = el.querySelector("[data-conf]"), out = el.querySelector("[data-out]");
  function draw() {
    var pd = parseFloat(pdS.value), rho = parseFloat(rhoS.value), conf = parseFloat(cfS.value);
    pdO.textContent = (pd * 100).toFixed(1) + "%"; rhoO.textContent = rho.toFixed(2); cfO.textContent = (conf * 100).toFixed(2) + "%";
    var b = ninv(pd);
    var wcdr = ncdf((b + Math.sqrt(rho) * ninv(conf)) / Math.sqrt(1 - rho));
    out.textContent = "EL = " + (pd * 100).toFixed(1) + "% · CreditVaR = " + (wcdr * 100).toFixed(1) + "% · UL = " + ((wcdr - pd) * 100).toFixed(1) + "%";
    function f(x) { if (x <= 0 || x >= 1) return 0; var a = ninv(x); return Math.sqrt((1 - rho) / rho) * Math.exp(0.5 * (a * a - Math.pow(Math.sqrt(1 - rho) * a - b, 2) / rho)); }
    svg.innerHTML = "";
    var W = 640, H = 250, x0 = 20, x1 = W - 16, y0 = H - 30;
    var xmax = Math.min(0.9995, Math.max(wcdr * 1.25, pd * 5));
    function X(x) { return x0 + x / xmax * (x1 - x0); }
    var fmax = 0, N = 500, i, xx;
    for (i = 1; i < N; i++) { xx = i / N * xmax; fmax = Math.max(fmax, f(xx)); }
    function Y(p) { return y0 - Math.min(p, fmax) / fmax * (H - 74); }
    function region(a2, bb, fill, op) { var d = "M" + X(a2) + "," + Y(0); for (var x = a2; x <= bb; x += xmax / N) d += " L" + X(x) + "," + Y(f(x)); d += " L" + X(bb) + "," + Y(0) + " Z"; svgEl("path", { d: d, fill: fill, opacity: op }, svg); }
    region(pd, wcdr, "var(--amber)", 0.35);        // unexpected loss / economic capital
    region(wcdr, xmax, "var(--red)", 0.35);         // stress tail beyond Credit VaR
    var d = "";
    for (i = 1; i <= N; i++) { xx = i / N * xmax; d += (d ? " L" : "M") + X(xx) + "," + Y(f(xx)); }
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
    svgEl("line", { x1: X(pd), x2: X(pd), y1: Y(fmax), y2: Y(0), stroke: "var(--green)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
    var tEL = svgEl("text", { x: X(pd), y: Y(fmax) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--green)" }, svg); tEL.textContent = "EL";
    svgEl("line", { x1: X(wcdr), x2: X(wcdr), y1: Y(fmax * 0.75), y2: Y(0), stroke: "var(--red)", "stroke-width": 2 }, svg);
    var tV = svgEl("text", { x: X(wcdr), y: Y(fmax * 0.75) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--red)" }, svg); tV.textContent = "Credit VaR";
    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var tx = svgEl("text", { x: x1 - 4, y: y0 + 17, "text-anchor": "end", "font-size": 11 }, svg); tx.textContent = "portfolio loss rate →";
  }
  pdS.addEventListener("input", draw); rhoS.addEventListener("input", draw); cfS.addEventListener("input", draw);
  draw();
});

/* --- FRTB: VaR(99%) vs ES(97.5%) + liquidity-horizon scaling (r16) --- */
register("frtb", function (el) {
  var svg = shell(el, "FRTB — why ES(97.5%) replaced VaR(99%)",
    '<label>Liquidity horizon <input type="range" min="0" max="4" step="1" value="0"><span class="w-value" data-lh></span></label>' +
    '<span class="w-value" data-out></span>', 640, 250,
    "Under a normal distribution ES(97.5%) ≈ 2.34σ lands almost exactly on VaR(99%) = 2.33σ — that is why the Basel Committee chose 97.5%. But ES averages the whole tail beyond the 97.5% point (shaded), so it still rises when tails are fat, where VaR is blind. FRTB then scales each risk factor by its liquidity horizon: charge ∝ √(LH/10 days).");
  var slider = el.querySelector("input"), lhO = el.querySelector("[data-lh]"), out = el.querySelector("[data-out]");
  var LHS = [10, 20, 40, 60, 120];
  function draw() {
    var lh = LHS[parseInt(slider.value, 10)];
    lhO.textContent = lh + " days";
    var zVaR = ninv(0.99);                 // 2.326
    var esFactor = npdf(ninv(0.975)) / 0.025; // 2.337
    var scale = Math.sqrt(lh / 10);
    out.textContent = "VaR(99%)=" + zVaR.toFixed(2) + "σ · ES(97.5%)=" + esFactor.toFixed(2) + "σ · LH-scaled ES=" + (esFactor * scale).toFixed(2) + "σ";
    svg.innerHTML = "";
    var W = 640, H = 250, x0 = 24, x1 = W - 16, y0 = H - 30;
    function X(x) { return x0 + (x + 4) / 8 * (x1 - x0); }
    function Y(p) { return y0 - p / 0.42 * (H - 78); }
    var q975 = ninv(0.975);
    /* tail beyond 97.5% (what ES averages) */
    var df = "M" + X(q975) + "," + Y(0);
    for (var x = q975; x <= 4; x += 0.04) df += " L" + X(x) + "," + Y(npdf(x));
    df += " L" + X(4) + "," + Y(0) + " Z";
    svgEl("path", { d: df, fill: "var(--amber)", opacity: 0.4 }, svg);
    var d = "";
    for (var x2 = -4; x2 <= 4; x2 += 0.04) d += (d ? " L" : "M") + X(x2) + "," + Y(npdf(x2));
    svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
    /* VaR 99% line */
    svgEl("line", { x1: X(zVaR), x2: X(zVaR), y1: Y(0.30), y2: Y(0), stroke: "var(--red)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
    var t1 = svgEl("text", { x: X(zVaR), y: Y(0.30) - 4, "text-anchor": "end", "font-size": 11, fill: "var(--red)" }, svg); t1.textContent = "VaR 99%";
    /* ES 97.5% line (avg of amber tail) */
    svgEl("line", { x1: X(esFactor), x2: X(esFactor), y1: Y(0.19), y2: Y(0), stroke: "var(--amber)", "stroke-width": 2 }, svg);
    var t2 = svgEl("text", { x: X(esFactor), y: Y(0.19) - 4, "text-anchor": "start", "font-size": 11, fill: "var(--amber)" }, svg); t2.textContent = "ES 97.5%";
    /* LH-scaled ES line */
    var sc = esFactor * scale;
    if (sc <= 3.98) {
      svgEl("line", { x1: X(sc), x2: X(sc), y1: Y(0.09), y2: Y(0), stroke: "var(--purple)", "stroke-width": 2 }, svg);
      var t3 = svgEl("text", { x: X(sc), y: Y(0.09) - 4, "text-anchor": "middle", "font-size": 11, fill: "var(--purple)" }, svg); t3.textContent = "LH-scaled";
    }
    svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
    var tx = svgEl("text", { x: x1 - 4, y: y0 + 17, "text-anchor": "end", "font-size": 11 }, svg); tx.textContent = "loss (σ units) →";
  }
  slider.addEventListener("input", draw);
  draw();
});

/* =====================================================================
   Counterparty risk vs lending risk (R32)
   Lending: one direction, known amount. Counterparty (swap): either
   direction, amount set by where the market moves.
   ===================================================================== */
register("counterparty-vs-lending", function (el) {
  var caption = el.getAttribute("data-caption") ||
    "Lending risk (one direction, known amount) vs. counterparty risk (either direction, uncertain amount) as rates move.";
  var svg = shell(el, "Lending risk vs counterparty risk — move the market",
    '<label>Rates move <input type="range" min="-200" max="200" step="10" value="80" data-k="bp"><span class="w-value" data-v="bp"></span></label>' +
    '<span class="w-value" data-out></span>',
    640, 300, caption);
  var bpIn = el.querySelector('[data-k="bp"]');
  var bpV = el.querySelector('[data-v="bp"]');
  var out = el.querySelector("[data-out]");

  function draw() {
    var bp = parseFloat(bpIn.value);
    bpV.textContent = (bp > 0 ? "+" : "") + bp + " bp";
    /* swap MTM to the fixed-rate payer: ~4% of notional per 100bp */
    var swapVal = (bp / 100) * 4;

    svg.innerHTML = "";
    var W = 640, H = 300, midY = 168, barMax = 74;

    /* ---- left panel: loan ---- */
    var lx = 46, lw = 240;
    var t1 = svgEl("text", { x: lx + lw / 2, y: 30, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "var(--text)" }, svg);
    t1.textContent = "Loan (lending risk)";
    /* fixed exposure bar — never moves with the slider */
    svgEl("rect", { x: lx + lw / 2 - 34, y: midY - barMax, width: 68, height: barMax, rx: 5, fill: "var(--accent)", opacity: 0.85 }, svg);
    var l1 = svgEl("text", { x: lx + lw / 2, y: midY - barMax - 10, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "var(--accent)" }, svg);
    l1.textContent = "$100M — fixed";
    var l2 = svgEl("text", { x: lx + lw / 2, y: midY + 22, "text-anchor": "middle", "font-size": 11, fill: "var(--text-dim)" }, svg);
    l2.textContent = "Borrower always owes lender";
    var l3 = svgEl("text", { x: lx + lw / 2, y: midY + 40, "text-anchor": "middle", "font-size": 11, fill: "var(--text-faint)" }, svg);
    l3.textContent = "one direction · known amount";

    /* ---- right panel: swap ---- */
    var rx = 352, rw = 240;
    var t2 = svgEl("text", { x: rx + rw / 2, y: 30, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "var(--text)" }, svg);
    t2.textContent = "Interest rate swap (counterparty risk)";
    /* zero line */
    svgEl("line", { x1: rx + 16, x2: rx + rw - 16, y1: midY, y2: midY, stroke: "var(--border-strong)", "stroke-dasharray": "4 3" }, svg);
    var h = Math.min(barMax, Math.abs(swapVal) / 8 * barMax);
    var pos = swapVal >= 0;
    svgEl("rect", {
      x: rx + rw / 2 - 34, y: pos ? midY - h : midY, width: 68, height: Math.max(h, 1), rx: 5,
      fill: pos ? "var(--green)" : "var(--red)", opacity: 0.85,
    }, svg);
    var r1 = svgEl("text", {
      x: rx + rw / 2, y: pos ? midY - h - 10 : midY + h + 16, "text-anchor": "middle",
      "font-size": 12, "font-weight": 700, fill: pos ? "var(--green)" : "var(--red)",
    }, svg);
    r1.textContent = (pos ? "+" : "−") + "$" + Math.abs(swapVal).toFixed(1) + "M MTM";
    var r2 = svgEl("text", { x: rx + rw / 2, y: midY + barMax + 22, "text-anchor": "middle", "font-size": 11, fill: "var(--text-dim)" }, svg);
    r2.textContent = pos ? "Counterparty owes YOU — you carry the risk" : "YOU owe counterparty — they carry the risk";
    var r3 = svgEl("text", { x: rx + rw / 2, y: midY + barMax + 40, "text-anchor": "middle", "font-size": 11, fill: "var(--text-faint)" }, svg);
    r3.textContent = "either direction · amount set by the market";

    out.textContent = bp === 0
      ? "At-the-money: swap worth ~0 to both sides — but future exposure is still there."
      : "Loan exposure unchanged; swap exposure " + (pos ? "flipped to you (+$" : "flipped away from you (−$") + Math.abs(swapVal).toFixed(1) + "M).";
  }
  bpIn.addEventListener("input", draw);
  draw();
});
