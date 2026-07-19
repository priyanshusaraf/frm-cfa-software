import { useEffect, useRef } from "react";
import { WIDGETS } from "../widgets/index.js";

/* Mounts an imperative widget draw function into a React-managed div.
   `name` is the registry key; `data` becomes data-* JSON attributes the
   draw function reads (same contract as the original data-widget divs). */
export default function Widget({ name, data, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const fn = WIDGETS[name];
    if (!el) return;
    if (!fn) {
      el.innerHTML = '<div class="w-title">widget failed: unknown "' + name + '"</div>';
      return;
    }
    try {
      fn(el);
    } catch (e) {
      el.innerHTML = '<div class="w-title">widget failed: ' + name + "</div>";
    }
    return () => { el.innerHTML = ""; };
  }, [name, data]);

  const dataAttrs = {};
  if (data) for (const k in data) dataAttrs["data-" + k] = typeof data[k] === "string" ? data[k] : JSON.stringify(data[k]);

  return <div ref={ref} className={("widget " + className).trim()} data-widget={name} {...dataAttrs} />;
}
