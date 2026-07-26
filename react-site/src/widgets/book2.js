/* Book 2 widgets — the counterparty-exposure figure family (R36).

   R36 is built entirely out of graphs: fourteen figures, and the prose only
   works if you can already see the shapes. The reading shipped with one widget,
   so the app was re-describing pictures in words, which is the failure mode the
   owner named: this is the reading where the book is weakest and the software
   therefore has the most to add.

   Every profile here is generated from an explicit model rather than traced by
   hand, so a student can move a control and watch the mechanism, not a cartoon.
   The shared model: mark-to-market at time t is Normal(0, sigma(t)), and
     EE(t)  = E[max(V,0)] = sigma(t) / sqrt(2*pi)      (zero-mean normal)
     PFE(t) = sigma(t) * z_alpha
   sigma(t) is where the product lives: diffusion grows it as sqrt(t), while
   amortization shrinks it as payments roll off. */
import { register, svgEl, shell, ncdf, ninv } from "./index.js";

var SQRT2PI = Math.sqrt(2 * Math.PI);

/* sigma(t) per product, t in [0,1] as a fraction of maturity. The shapes follow
   the source's figures: bonds/loans/repos sit near notional, swaps peak, FX and
   cross-currency climb into the final notional exchange, options only accrete. */
function sigmaOf(kind, t) {
  switch (kind) {
    case "bond":  return 0.9 + 0.28 * Math.sqrt(t);          // near notional, rate risk on top
    case "loan":  return 0.9 * (1 - 0.55 * t) + 0.2 * Math.sqrt(t); // prepayment amortizes it
    case "swap":  return 2.4 * Math.sqrt(t) * (1 - t);       // diffusion vs roll-off: a hump
    case "fx":    return 1.35 * Math.sqrt(t);                // one exchange at maturity
    case "xccy":  return 2.0 * Math.sqrt(t) * (1 - 0.3 * t) + 0.9 * t * t; // + final notional
    case "opt":   return 0.55 + 0.9 * Math.sqrt(t);          // a claim, never an obligation
    case "cds":   return 0.35 + 0.35 * Math.sqrt(t) + 0.55 * Math.pow(t, 3); // spread widening, then credit event
    default:      return Math.sqrt(t);
  }
}

function axes(svg, W, H, x0, y0, xlab, ylab) {
  svgEl("line", { x1: x0, x2: W - 18, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
  svgEl("line", { x1: x0, x2: x0, y1: 14, y2: y0, stroke: "var(--border-strong)" }, svg);
  var a = svgEl("text", { x: W - 18, y: y0 + 16, "text-anchor": "end", "font-size": 11, fill: "var(--text-faint)" }, svg);
  a.textContent = xlab;
  var b = svgEl("text", { x: x0 - 4, y: 11, "font-size": 11, fill: "var(--text-faint)" }, svg);
  b.textContent = ylab;
}

function pathOf(fn, X, Y, step) {
  var d = "";
  for (var t = 0; t <= 1.0001; t += (step || 0.01)) d += (d ? " L" : "M") + X(t) + "," + Y(fn(Math.min(t, 1)));
  return d;
}

/* --- Figures 36.1-36.4: the metric family on one picture ------------------ */
register("exposure-metrics", function (el) {
  var svg = shell(el, "Exposure metrics: EE, PFE, EPE and effective EE on one profile",
    '<span class="seg"><button data-k="swap" class="on">IR swap</button><button data-k="fx">FX forward</button><button data-k="loan">Loan</button></span>' +
    '<label>confidence <input type="range" min="0.90" max="0.99" step="0.01" value="0.95"><span class="w-value"></span></label>' +
    '<label><input type="checkbox" data-eff checked> show effective EE</label>',
    660, 250, " ");
  var cap = el.querySelector(".w-caption");
  var seg = el.querySelectorAll(".seg button");
  var slider = el.querySelector('input[type="range"]');
  var val = el.querySelector(".w-value");
  var effBox = el.querySelector("[data-eff]");
  var kind = "swap";

  function draw() {
    var alpha = parseFloat(slider.value), z = ninv(alpha);
    val.textContent = (alpha * 100).toFixed(0) + "%";
    svg.innerHTML = "";
    var W = 660, H = 250, x0 = 44, y0 = H - 34;
    var EE = function (t) { return sigmaOf(kind, t) / SQRT2PI; };
    var PFE = function (t) { return sigmaOf(kind, t) * z; };

    /* Scale to the tallest curve on screen so the shape always fills the box. */
    var max = 0;
    for (var s = 0; s <= 1; s += 0.01) max = Math.max(max, PFE(s));
    max *= 1.12;
    var X = function (t) { return x0 + t * (W - x0 - 22); };
    var Y = function (v) { return y0 - (v / max) * (y0 - 20); };

    /* EPE is the time-average of EE; effective EE is EE's running maximum, and
       effective EPE the average of that. Computing them here rather than
       drawing them by eye is the whole point: the student can see effective EE
       refuse to fall while ordinary EE rolls off. */
    var n = 200, sum = 0, esum = 0, peak = 0, effPts = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, e = EE(t);
      peak = Math.max(peak, e);
      effPts.push(peak);
      sum += e; esum += peak;
    }
    var epe = sum / (n + 1), eepe = esum / (n + 1);

    svgEl("path", { d: pathOf(PFE, X, Y), fill: "none", stroke: "var(--red)", "stroke-width": 2.2 }, svg);
    svgEl("path", { d: pathOf(EE, X, Y), fill: "none", stroke: "var(--accent)", "stroke-width": 2.6 }, svg);
    if (effBox.checked) {
      var d = "";
      for (var j = 0; j <= n; j++) d += (d ? " L" : "M") + X(j / n) + "," + Y(effPts[j]);
      svgEl("path", { d: d, fill: "none", stroke: "var(--amber)", "stroke-width": 2, "stroke-dasharray": "5 3" }, svg);
      svgEl("line", { x1: x0, x2: W - 22, y1: Y(eepe), y2: Y(eepe), stroke: "var(--amber)", "stroke-width": 1, opacity: 0.55 }, svg);
    }
    svgEl("line", { x1: x0, x2: W - 22, y1: Y(epe), y2: Y(epe), stroke: "var(--green)", "stroke-width": 1.4, "stroke-dasharray": "2 3" }, svg);
    axes(svg, W, H, x0, y0, "time → maturity", "exposure");

    /* Label each curve where it is actually tall, not at t=1: a swap's PFE has
       decayed to nothing by maturity, so anchoring there piled every label into
       the bottom-right corner on top of each other. */
    function tag(text, xt, v, color, anchor) {
      var t2 = svgEl("text", {
        x: X(xt), y: Math.max(Y(v) - 6, 12), "text-anchor": anchor || "middle",
        "font-size": 10.5, fill: color
      }, svg);
      t2.textContent = text;
    }
    var pkT = 0, pk = 0;
    for (var q = 0; q <= 1; q += 0.01) { if (PFE(q) > pk) { pk = PFE(q); pkT = q; } }
    tag("PFE " + (alpha * 100).toFixed(0) + "%", pkT, pk, "var(--red)");
    tag("EE", pkT, EE(pkT), "var(--accent)");
    tag("EPE", 0.06, epe, "var(--green)", "start");
    if (effBox.checked) tag("effective EPE", 0.99, eepe, "var(--amber)", "end");

    cap.innerHTML = "<strong>EE</strong> is the mean of the in-your-favour outcomes at each date; <strong>PFE</strong> is the same date's tail at " +
      (alpha * 100).toFixed(0) + "%. Raising confidence lifts PFE and leaves EE untouched, because EE is an average and PFE is a quantile. " +
      "<strong>EPE</strong> (" + epe.toFixed(3) + ") flattens the EE curve into one number. " +
      "<strong>Effective EE</strong> carries EE's running peak forward instead of letting it fall, so effective EPE (" + eepe.toFixed(3) +
      ") is always the larger figure: that gap is exactly the rollover risk a short, rolled trade would otherwise hide. Watch it open up on the loan, whose exposure amortizes away.";
  }
  seg.forEach(function (b) {
    b.addEventListener("click", function () {
      seg.forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); kind = b.getAttribute("data-k"); draw();
    });
  });
  slider.addEventListener("input", draw);
  effBox.addEventListener("change", draw);
  draw();
});

/* --- Figures 36.5-36.9: every product profile, side by side --------------- */
register("exposure-shapes", function (el) {
  var PRODUCTS = [
    { k: "bond", n: "Bond", why: "A bond's PFE sits close to notional the whole way: the principal is at risk from day one. The extra bulge is interest-rate risk, since a fixed coupon gains value when rates fall." },
    { k: "loan", n: "Loan", why: "A loan starts near notional like the bond, but amortizes downward as it is repaid, and a floating rate plus prepayments pull the exposure down faster than the schedule alone would." },
    { k: "swap", n: "IR swap", why: "The signature hump. Two forces fight: diffusion widens the distribution of future rates (up), while each payment made removes a future cash flow (down). The peak lands between a third and a half of maturity." },
    { k: "fx", n: "FX forward", why: "One exchange, at maturity, and nothing amortizes. Diffusion wins unopposed, so exposure climbs roughly with the square root of time and peaks at the very end." },
    { k: "xccy", n: "Cross-currency swap", why: "Coupons make it look like an interest-rate swap early on, but the notional is exchanged at maturity too. That final FX payment dominates, so it keeps climbing instead of decaying: the largest profile of the family." },
    { k: "opt", n: "Long option", why: "Premium paid up front, so you hold a claim and never an obligation. Exposure is just the option's value: it cannot go negative, and it grows with time value and moneyness." },
    { k: "cds", n: "Long-protection CDS", why: "Early exposure grows as the credit spread widens. The spike is the credit event itself, where you are owed notional less recovery. This is where wrong-way risk bites: the counterparty is most likely to fail in exactly the states that make this claim large." }
  ];
  var svg = shell(el, "Exposure profile shapes: read the cash flows, not a formula",
    '<span class="seg">' + PRODUCTS.map(function (p, i) {
      return '<button data-k="' + p.k + '"' + (i === 2 ? ' class="on"' : "") + ">" + p.n + "</button>";
    }).join("") + "</span><label><input type='checkbox' data-ghost checked> compare against the others</label>",
    660, 240, " ");
  var cap = el.querySelector(".w-caption");
  var ghost = el.querySelector("[data-ghost]");
  var kind = "swap";

  function draw() {
    svg.innerHTML = "";
    var W = 660, H = 240, x0 = 44, y0 = H - 34;
    var max = 0;
    PRODUCTS.forEach(function (p) {
      for (var s = 0; s <= 1; s += 0.02) max = Math.max(max, sigmaOf(p.k, s));
    });
    max *= 1.1;
    var X = function (t) { return x0 + t * (W - x0 - 22); };
    var Y = function (v) { return y0 - (v / max) * (y0 - 20); };
    if (ghost.checked) {
      PRODUCTS.forEach(function (p) {
        if (p.k === kind) return;
        svgEl("path", {
          d: pathOf(function (t) { return sigmaOf(p.k, t); }, X, Y),
          fill: "none", stroke: "var(--text-faint)", "stroke-width": 1, opacity: 0.32
        }, svg);
      });
    }
    svgEl("path", {
      d: pathOf(function (t) { return sigmaOf(kind, t); }, X, Y),
      fill: "none", stroke: "var(--green)", "stroke-width": 2.8
    }, svg);
    axes(svg, W, H, x0, y0, "time → maturity", "potential future exposure");
    var p = PRODUCTS.filter(function (q) { return q.k === kind; })[0];
    cap.textContent = p.why;
  }
  el.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      el.querySelectorAll(".seg button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); kind = b.getAttribute("data-k"); draw();
    });
  });
  ghost.addEventListener("change", draw);
  draw();
});

/* --- The four factors, as switches --------------------------------------- */
register("exposure-factors", function (el) {
  var svg = shell(el, "Build a profile: switch each factor on and watch the shape move",
    '<label><input type="checkbox" data-f="bullet"> single payout at maturity</label>' +
    '<label><input type="checkbox" data-f="settle" checked> periodic settlement</label>' +
    '<label><input type="checkbox" data-f="second"> second risk factor</label>' +
    '<label><input type="checkbox" data-f="exercise"> exercise decision at 1/3</label>',
    660, 240, " ");
  var cap = el.querySelector(".w-caption");
  var boxes = {};
  el.querySelectorAll("[data-f]").forEach(function (b) { boxes[b.getAttribute("data-f")] = b; });

  function profile(t) {
    var v = Math.sqrt(t);                       // diffusion is always present
    if (boxes.settle.checked) v *= (1 - t);     // payments roll off
    if (boxes.bullet.checked) v += 0.85 * t * t; // a notional lands at the end
    if (boxes.second.checked) v += 0.55 * Math.sqrt(t); // a second shape stacks on
    if (boxes.exercise.checked && t < 1 / 3) v += 0.5 * (1 / 3 - t) * 3 * 0.8; // option value until the decision
    return Math.max(v, 0);
  }
  function draw() {
    svg.innerHTML = "";
    var W = 660, H = 240, x0 = 44, y0 = H - 34;
    var max = 0;
    for (var s = 0; s <= 1; s += 0.01) max = Math.max(max, profile(s));
    max = Math.max(max, 0.6) * 1.12;
    var X = function (t) { return x0 + t * (W - x0 - 22); };
    var Y = function (v) { return y0 - (v / max) * (y0 - 20); };
    svgEl("path", { d: pathOf(profile, X, Y, 0.005), fill: "none", stroke: "var(--green)", "stroke-width": 2.8 }, svg);
    if (boxes.exercise.checked) {
      svgEl("line", { x1: X(1 / 3), x2: X(1 / 3), y1: 20, y2: y0, stroke: "var(--amber)", "stroke-width": 1, "stroke-dasharray": "3 3" }, svg);
    }
    axes(svg, W, H, x0, y0, "time → maturity", "exposure");
    var on = [];
    if (boxes.bullet.checked) on.push("a single payout at maturity means nothing settles along the way, so the profile keeps climbing into it");
    if (boxes.settle.checked) on.push("periodic settlement removes a future cash flow each time it pays, which drags the profile back down and caps it");
    if (boxes.second.checked) on.push("a second risk factor lays its own shape on top of the first rather than replacing it");
    if (boxes.exercise.checked) on.push("an undecided exercise right carries the option's value inside the exposure until the decision date, then drops out");
    cap.textContent = on.length
      ? "Switched on: " + on.join("; ") + "."
      : "Nothing switched on but diffusion, which alone grows with the square root of time. Turn a factor on to see what it does.";
  }
  el.querySelectorAll("[data-f]").forEach(function (b) { b.addEventListener("change", draw); });
  draw();
});

/* --- Figures 36.12-36.13: netting and correlation ------------------------- */
register("netting-corr", function (el) {
  var svg = shell(el, "Netting: what correlation between two trades actually buys you",
    '<label>correlation ρ <input type="range" min="-0.99" max="0.99" step="0.01" value="0"><span class="w-value"></span></label>' +
    '<label>trades n <input type="range" min="2" max="20" step="1" value="2"><span class="w-value" data-n></span></label>',
    660, 240, " ");
  var cap = el.querySelector(".w-caption");
  var rs = el.querySelectorAll('input[type="range"]');
  var vals = el.querySelectorAll(".w-value");

  function draw() {
    var rho = parseFloat(rs[0].value), n = parseInt(rs[1].value, 10);
    var floor = -1 / (n - 1);
    var eff = Math.max(rho, floor);
    vals[0].textContent = rho.toFixed(2) + (rho < floor ? " (below the floor)" : "");
    vals[1].textContent = n;
    var nf = Math.sqrt((1 + (n - 1) * eff) / n);
    svg.innerHTML = "";
    var W = 660, H = 240, x0 = 44, y0 = H - 34;
    var X = function (t) { return x0 + t * (W - x0 - 22); };
    var Y = function (v) { return y0 - (v / 2.6) * (y0 - 20); };
    var one = function (t) { return sigmaOf("swap", t); };
    /* Gross exposure adds the trades; net exposure scales by the netting factor. */
    svgEl("path", { d: pathOf(function (t) { return one(t) * n / 2; }, X, Y), fill: "none", stroke: "var(--text-faint)", "stroke-width": 1.6, "stroke-dasharray": "4 3" }, svg);
    svgEl("path", { d: pathOf(function (t) { return one(t) * n / 2 * nf; }, X, Y), fill: "none", stroke: "var(--green)", "stroke-width": 2.8 }, svg);
    axes(svg, W, H, x0, y0, "time → maturity", "exposure");
    var lab = svgEl("text", { x: W - 24, y: 26, "text-anchor": "end", "font-size": 11, fill: "var(--text-dim)" }, svg);
    lab.textContent = "dashed = no netting";
    cap.innerHTML = "Netting factor = <strong>" + nf.toFixed(3) + "</strong>. At ρ = 1 the trades move together, nothing offsets, and the factor is 1: netting buys you nothing. " +
      "At ρ = 0 it falls to 1/√n. Negative correlation is the real prize, not zero, because trades that reliably move opposite each other cancel. " +
      "The catch is the floor at −1/(n−1) = <strong>" + floor.toFixed(3) + "</strong> here: with " + n + " trades they cannot all be mutually opposed, so the factor bottoms out at 0 rather than going negative.";
  }
  rs.forEach(function (r) { r.addEventListener("input", draw); });
  draw();
});

/* --- Figure 36.14: the margin period of risk timeline --------------------- */
register("mpor-line", function (el) {
  var svg = shell(el, "Margin period of risk: where the exposure actually accumulates",
    '<span class="seg"><button data-k="otc" class="on">OTC derivative</button><button data-k="repo">Repo</button></span>',
    660, 190, " ");
  var cap = el.querySelector(".w-caption");
  var kind = "otc";
  var STEPS = [
    { n: "Valuation / margin call", w: 1 },
    { n: "Grace period", w: 1.4 },
    { n: "Default declared", w: 0.8 },
    { n: "Macro-hedging", w: 1.5 },
    { n: "Auction / close-out", w: 2.3 }
  ];
  function draw() {
    svg.innerHTML = "";
    var W = 660, H = 190, x0 = 24, y = 74;
    var total = STEPS.reduce(function (a, s) { return a + s.w; }, 0);
    var avail = W - x0 * 2, x = x0;
    STEPS.forEach(function (s, i) {
      var w = (s.w / total) * avail;
      svgEl("rect", {
        x: x, y: y, width: w - 3, height: 30, rx: 4,
        fill: i >= 3 ? "var(--accent-soft)" : "var(--bg-inset)",
        stroke: i >= 3 ? "var(--accent)" : "var(--border)"
      }, svg);
      var t = svgEl("text", { x: x + (w - 3) / 2, y: y + 19, "text-anchor": "middle", "font-size": 10, fill: "var(--text)" }, svg);
      t.textContent = s.n;
      x += w;
    });
    var mn = kind === "otc" ? 10 : 5;
    svgEl("line", { x1: x0, x2: x0 + avail, y1: y + 48, y2: y + 48, stroke: "var(--red)", "stroke-width": 2 }, svg);
    var lab = svgEl("text", { x: x0 + avail / 2, y: y + 66, "text-anchor": "middle", "font-size": 11, fill: "var(--red)" }, svg);
    lab.textContent = "margin period of risk: Basel minimum " + mn + " business days for " + (kind === "otc" ? "OTC derivatives" : "repos");
    var h = svgEl("text", { x: x0, y: 30, "font-size": 11, fill: "var(--text-dim)" }, svg);
    h.textContent = "Collateral you called for has not arrived, but the exposure keeps moving.";
    cap.textContent = kind === "otc"
      ? "The margin period of risk runs from the last time collateral actually changed hands to the moment the position is finally closed out, and every stage in it is time during which the market moves while you are under-collateralized. OTC derivatives and repos are separated because they are governed by different documentation, and Basel sets a longer minimum for OTC derivatives."
      : "Repos settle and re-margin faster than OTC derivatives and are covered by different documentation, so the assumed minimum period is shorter. The shape of the risk is identical: it is the gap between the last good margin exchange and the final close-out.";
  }
  el.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      el.querySelectorAll(".seg button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); kind = b.getAttribute("data-k"); draw();
    });
  });
  draw();
});
