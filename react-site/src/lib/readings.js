/* All 101 readings, loaded LAZILY so the main bundle doesn't carry ~4MB of
   curriculum data. Each data file `export default`s the same object it used to
   pass to FRM.register.

   Two access patterns:
   - useReading(rn)      — one reading (Chapter); loads its chunk on demand.
   - useAllReadings()    — the full map (Search/Glossary/Formulas/Review/...);
                           kicks off loading every chunk, returns null until done.
   getReading(rn) stays as a synchronous cache read for code that only runs
   after a reading is already on screen (MiniMap, Highlighter). */
import { useEffect, useState } from "react";

const loaders = import.meta.glob("../data/book*/r*.js");

/* reading number -> module path, derived from the filename */
const pathByRn = {};
for (const path in loaders) {
  const m = /r(\d+)\.js$/.exec(path);
  if (m) pathByRn[parseInt(m[1], 10)] = path;
}

export const readings = {}; // rn -> reading object, filled as chunks arrive
let allPromise = null;
let allDone = false;

export function getReading(rn) {
  return readings[rn] || null;
}

export function loadReading(rn) {
  if (readings[rn]) return Promise.resolve(readings[rn]);
  const path = pathByRn[rn];
  if (!path) return Promise.resolve(null);
  return loaders[path]().then((mod) => {
    const r = mod.default;
    readings[r.reading] = r;
    return r;
  });
}

export function loadAll() {
  if (!allPromise) {
    allPromise = Promise.all(Object.keys(pathByRn).map((rn) => loadReading(parseInt(rn, 10))))
      .then(() => { allDone = true; return readings; });
  }
  return allPromise;
}

/* ---- hooks ---- */

export function useReading(rn) {
  const [d, setD] = useState(() => getReading(rn));
  useEffect(() => {
    const cached = getReading(rn);
    setD(cached);
    if (cached) return undefined;
    let on = true;
    loadReading(rn).then((r) => { if (on) setD(r); });
    return () => { on = false; };
  }, [rn]);
  return d;
}

/* Returns the full readings map once every chunk has loaded, null before. */
export function useAllReadings() {
  const [all, setAll] = useState(() => (allDone ? readings : null));
  useEffect(() => {
    let on = true;
    loadAll().then((r) => { if (on) setAll(r); });
    return () => { on = false; };
  }, []);
  return all;
}
