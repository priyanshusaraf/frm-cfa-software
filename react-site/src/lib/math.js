/* Numeric helpers shared by widgets (verbatim from the original app.js). */
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function npdf(x) { return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI); }

export function ncdf(x) { /* Zelen & Severo approximation */
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = npdf(x);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

export function ninv(p) { /* Beasley-Springer-Moro */
  const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
  const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
  const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209, 0.0276438810333863,
    0.0038405729373609, 0.0003951896511919, 0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
  const y = p - 0.5;
  let r, x;
  if (Math.abs(y) < 0.42) {
    r = y * y;
    x = y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) / ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
  } else {
    r = p; if (y > 0) r = 1 - p;
    r = Math.log(-Math.log(r));
    x = c[0]; for (let i = 1; i < 9; i++) x += c[i] * Math.pow(r, i);
    if (y < 0) x = -x;
  }
  return x;
}
