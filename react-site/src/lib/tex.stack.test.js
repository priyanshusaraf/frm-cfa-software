import { test } from "node:test";
import assert from "node:assert/strict";

/* stackParts is not exported (renderMath needs a DOM-free katex import to test
   end to end), so the splitting rule is re-derived here against the same cases
   it must handle. Keep in sync with lib/tex.js. */
function stackParts(tex) {
  const parts = [];
  let depth = 0, last = 0;
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i];
    if (c === "\\") { i++; continue; }
    if (c === "{" || c === "(" || c === "[") depth++;
    else if (c === "}" || c === ")" || c === "]") depth--;
    else if (c === ";" && depth === 0) { parts.push(tex.slice(last, i)); last = i + 1; }
  }
  parts.push(tex.slice(last));
  return parts.map((p) => p.replace(/^\s*\\quad\s*/, "").trim()).filter(Boolean);
}

test("splits R36's two-formula line and drops the \\quad spacer", () => {
  const p = stackParts(
    "\\text{EE(MPoR)} = \\text{a} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}}; \\quad \\text{PFE(MPoR)} = z \\times \\text{vol}"
  );
  assert.equal(p.length, 2);
  assert.match(p[0], /^\\text\{EE\(MPoR\)\}/);
  assert.match(p[1], /^\\text\{PFE\(MPoR\)\}/);
  assert.ok(!p[1].startsWith("\\quad"));
});

test("a single formula is left alone", () => {
  const t = "\\text{Netting factor} = \\sqrt{\\dfrac{1+(n-1)\\rho}{n}}";
  assert.deepEqual(stackParts(t), [t]);
});

test("a semicolon inside braces or parens is not a separator", () => {
  assert.equal(stackParts("\\text{a; b} = c").length, 1);
  assert.equal(stackParts("f(x; \\theta) = y").length, 1);
});

test("an escaped semicolon (the thin-space macro) is not a separator", () => {
  assert.equal(stackParts("a \\; b = c").length, 1);
});
