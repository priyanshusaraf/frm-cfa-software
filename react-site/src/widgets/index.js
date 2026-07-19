/* Widget registry. Each widget is an imperative draw function (el) => void that
   fills `el` (a div.widget) with its own controls + SVG, exactly as in the
   original site. Widget modules call register() at import time. */
import { esc } from "../lib/html.js";
import { npdf, ncdf, ninv, mulberry32 } from "../lib/math.js";

export const WIDGETS = {};

export function register(name, fn) {
  WIDGETS[name] = fn;
}

/* Helpers shared by widget draw functions (same API as FRM.widgetHelpers). */
export function svgEl(tag, attrs, parent) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

export function shell(el, title, controlsHtml, svgW, svgH, caption) {
  el.innerHTML = '<div class="w-title">' + title + "</div>" +
    (controlsHtml ? '<div class="w-controls">' + controlsHtml + "</div>" : "") +
    '<svg viewBox="0 0 ' + svgW + " " + svgH + '"></svg>' +
    (caption ? '<div class="w-caption">' + caption + "</div>" : "");
  return el.querySelector("svg");
}

export const rng = mulberry32;
export { esc, npdf, ncdf, ninv };

/* Scan a rendered subtree for [data-widget] divs (from reading `visual` HTML
   strings) and instantiate each — same contract as the original FRM.initWidgets. */
export function initWidgets(root) {
  (root || document).querySelectorAll("[data-widget]").forEach((el) => {
    const name = el.getAttribute("data-widget");
    const fn = WIDGETS[name];
    if (!fn) { el.innerHTML = '<div class="w-title">widget failed: unknown "' + esc(name) + '"</div>'; return; }
    try { fn(el); }
    catch (e) { el.innerHTML = '<div class="w-title">widget failed: ' + esc(name) + "</div>"; }
  });
}
