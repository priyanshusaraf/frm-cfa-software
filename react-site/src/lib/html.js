export function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

export function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/* Star rating markup (matches original FRM.stars). Render with <Html>. */
export function stars(k) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= k ? "★" : '<span class="off">★</span>';
  return '<span class="hy-stars">' + s + "</span>";
}
