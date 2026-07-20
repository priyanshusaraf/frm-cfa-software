import { useEffect } from "react";
import { useStore } from "../lib/store.js";

/* Mirrors the store's layout.fontScale onto the --font-scale CSS variable so every
   subsequent Settings change takes effect without a reload (index.html applies the
   same value pre-paint on load to avoid a flash). */
export default function FontScaleSync() {
  const fontScale = useStore((s) => (s.layout && s.layout.fontScale) || 1);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
  }, [fontScale]);
  return null;
}
