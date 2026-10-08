/* Every scenario on the platform must obey double entry. If this fails, a
   student would be shown statements that do not add up. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { runScenario, checksFor } from "./ledger.js";
import { SCENARIOS } from "../scenarios/index.js";

const DASH = /[–—]/;

for (const scn of SCENARIOS) {
  test("scenario " + scn.id, () => {
    const run = runScenario(scn);
    run.snaps.forEach((snap, i) => {
      run.columns.forEach((c) => {
        const st = snap.cols[c.id].stmts;
        const where = scn.id + " / " + c.id + " / snapshot " + i;
        assert.ok(Math.abs(st.bs.ta - st.bs.tle) < 0.005, where + ": A != L + E (" + st.bs.ta + " vs " + st.bs.tle + ")");
        assert.ok(Math.abs(st.cf.end - st.cf.cashBS) < 0.005, where + ": cash does not tie");
      });
    });
    (scn.steps || []).forEach((step, i) => {
      run.base.forEach((c) => {
        const ps = run.entriesFor(step, c.id);
        const chk = checksFor(run.snaps[i + 1].cols[c.id].stmts, ps).find((x) => x.id === "drcr");
        assert.ok(chk.ok, scn.id + " step " + (i + 1) + " col " + c.id + ": debits != credits " + chk.detail);
      });
    });
    assert.ok(!DASH.test(JSON.stringify(scn)), scn.id + ": contains an em or en dash");
    assert.ok(scn.module && scn.title && scn.steps && scn.steps.length, scn.id + ": missing module/title/steps");
  });
}

test("scenario ids are unique", () => {
  const ids = SCENARIOS.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});
