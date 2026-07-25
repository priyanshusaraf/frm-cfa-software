# content-guidelines.md — the durable, self-improving content playbook

**Read this before touching ANY reading's content.** This is the permanent
mistakes-and-fixes + per-reading review ledger for the whole product (roadmap
§5.1). It exists so that later, cheaper models can approach every reading
correctly on the first pass without re-deriving the owner's teaching style or
repeating past mistakes. That is the token-efficiency mechanism: the expensive
thinking is done once, written here, and reused.

Scope: this pilot is FRM Part II. The product is planned to grow to **all levels
of FRM and CFA, roughly 20+ books.** Every rule and per-reading note here is
written to transfer to that future corpus. Spend tokens now to write good
guidance; save far more later by not re-litigating it 20 books deep.

## How future agents use this file

1. **Before editing a reading**, read its per-reading entry below (if one
   exists) plus the "Durable style rules" section. Do what "Good" says to keep,
   fix what "Weak" flags, and follow "Guidance".
2. **After working a reading**, add or update its entry: what is genuinely good
   (so nobody rewrites it), what is weak (with the concrete fix), and any guidance
   that would help the next model. Keep it specific and short.
3. `content-flags.md` is the **transient** per-item worklist consumed by the
   Phase 5 pass; **this file is durable** and survives past Phase 5 into the next
   level. When a flag is resolved, fold the lasting lesson into the style rules or
   the reading's entry here, then drop the flag.
4. The owner reviews readings too. Owner-caught issues are authoritative; record
   them here verbatim in intent so they are never reintroduced.

## Durable style rules (learned from the owner; extend as more are learned)

These are HARD preferences on top of `react-site/CLAUDE.md` §1/§1a. Violating one
reads as AI-generated or wrong and costs customer trust.

1. **No meta-references to the source or the exam.** Never write "named in the
   source", "the exam candidate", "as the source states", "GARP tests this",
   "the reading says". Write as a tutor talking to a student, not as a compiler
   summarizing a book. (Fixed instances 2026-07-25: R32 "exam candidate" x2, R33
   "named in the source".)
2. **Explain WHY a thing exists, not just what it is.** When a structure or entity
   is introduced (monolines, CDPCs, SPVs, CVA desks), give the reason it was
   created and the problem it solved before defining it. A definition without a
   motive gets memorized, not understood (CLAUDE.md §1a stage 1).
3. **Get the counterparty-risk DIRECTION right (recurring correctness trap).**
   Counterparty (credit) risk to you bites when the trade is **in your favour**:
   positive mark-to-market to you means the counterparty owes you, so their
   default hurts you. "Moves against me" means I owe them, and it is MY default
   that matters to them. Always phrase it as "if it moves in my favour and the
   counterparty owes me..." (Fixed 2026-07-25: R31 thinkLike had this inverted.)
4. **Quizzes must be genuinely tricky, like real FRM and CFA.** Current quizzes
   are too easy. Use subtle, plausible distractors that punish a shallow read.
   Do NOT over-capitalize or emphasize the answer OPTIONS (emphasis inside the
   QUESTION stem is fine); real exams keep option wording flat so the trap is in
   the meaning, not the formatting. Never reference option letters (Quiz.jsx
   shuffles them).
5. **Reuse examples naturally across readings.** When an example carries over
   from an earlier reading (the rain-bet, Ondine/Scarbo), say "continuing our
   example from the previous reading" so it reads as a deliberate thread, not a
   coincidence. Where a prior example or concept is invoked, add a small
   refresher link (or a reminder widget) so a reader who forgot it is not lost.
6. **Prefer vivid, real framings.** A "zero-sum game" framing for counterparty
   risk, or a real trader's experience (naked calls need large margin; the same
   view as a defined-risk spread nets down and slashes margin) teaches better than
   an abstract restatement. Add them where they fit.
7. **Cut repetition; balance coverage.** Repetitive prose makes the repeated point
   over-learnable while starving the other testable material in the same reading,
   which is where surprise exam points come from. Condense repeats and give the
   thinner-but-testable parts their due.
8. **Richer "Go deeper"/sources where thin.** Flagged where a reading's external
   depth is sparse (R30, R32).

## Per-reading review ledger

Format per reading: **Good** (keep), **Weak** (fix), **Guidance** (for the next
model). Absence of an entry means "not yet reviewed", not "clean". Populate as
readings are worked; the Phase 5 pass and the owner+Opus overview process fill the
rest.

### R31 — Derivatives (Counterparty Risk Intro)
- **Good:** the two-questions framing (market move vs will-they-pay), the rain-bet
  ELI5, the four-way trade classification (exchange / cleared / collateralized /
  uncollateralized) with the correct emphasis that the collateral axis, not the
  venue axis, drives surviving counterparty risk.
- **Weak (FIXED 2026-07-25):** thinkLike inverted the counterparty-risk direction
  ("if it moves against me and my counterparty owes me"). Now "if it moves in my
  favour and my counterparty owes me". See style rule 3.
- **Weak (OPEN, Phase 5):** monolines and CDPCs are named but not motivated.
  Add WHY they existed: monolines were insurers that "wrapped" bonds/CDS to lend
  their AAA rating so issuers could borrow cheaply; CDPCs were vehicles set up to
  sell credit protection with an AAA structure WITHOUT posting bank-style
  collateral. Both were cheap-credit-protection / rating-uplift plays, and both
  broke in 2007-2009 when the wrapped risk turned out correlated with their own
  solvency. See style rule 2.

### R32 — Counterparty Risk and Beyond
- **Good:** the lending-vs-counterparty intuition, the rain-bet ELI5, the
  thinkLike "two independent gates" habit (CVA and credit limits as separate
  checks), the Ondine/Scarbo walkaway scenario.
- **Weak (FIXED 2026-07-25):** "no counterparty risk to the exam candidate" (x2)
  was nonsense; now "to the trading parties" / "to either party". Style rule 1.
- **Weak (OPEN, Phase 5):** (a) the intro could add a **zero-sum game** framing,
  which makes counterparty risk more intuitive and vivid; (b) the rain-bet example
  continues from R31, so open it with "continuing our example from the previous
  reading" (style rule 5); (c) the **CVA vs credit-limits** distinction is
  important but thin. Make it explicit: CVA is a PRICE, a per-trade charge that
  marks the trade down for expected counterparty loss and aggregates across the
  netting set; a credit limit is a hard CAP on total exposure to a counterparty, a
  gate not a price. A trade can be CVA-cheap yet breach the limit, or within the
  limit yet CVA-expensive, which is exactly the trap; (d) the Ondine example
  should carry a refresher link/widget (style rule 5). Go-deeper section is thin.

### R33 — Netting, Close-Out, and Related Aspects
- **Good:** netting-set mechanics and why netting compresses exposure below the
  sum of positive legs.
- **Weak (FIXED 2026-07-25):** "TriOptima is named in the source as..." AI-ism;
  now "TriOptima is a real trade-compression service...". Style rule 1.
- **Weak (OPEN, Phase 5):** (a) the reading is **repetitive**; condense the
  repeated portions so the thinner-but-testable material is not starved (style
  rule 7); (b) add the **real trader example** of netting cutting margin: selling
  naked calls requires large margin, but expressing the same view as a
  defined-risk spread nets the positions and slashes the margin required, a thing
  traders feel directly. Style rule 6.

### R30 — Credit Derivatives
- **Weak (OPEN, Phase 5):** Go-deeper / external depth is thin; enrich. (Owner
  flagged the R30-R33 cluster's go-deeper sections generally.)

### R34 — Margin (Collateral) and Settlement, R35 — Central Clearing
- Not yet reviewed line-by-line. R34 is a natural home for the spread-vs-naked
  margin example if it does not fit R33. R35's CCP loss-waterfall now has the
  `waterfall-flow` widget (Phase 1).

### Wave 1 (R01-R05, Book 1, 2026-07-25) and what the gate learned

**Book 1 is in much better shape than CLAUDE.md §8.1 claims.** All five files already
passed the validator and carried only 1 to 13 dashes each. The stale 7,614-dash figure
should not set expectations: the live count is 7,293 across 97 files and it is
concentrated in Books 2 through 5. Wave 1 was mostly abbreviations, meta-references and
two real math defects. Budget accordingly, and do not assume a reading is broken because
the backlog says the corpus is.

**Two defect classes the gate caught that a Sonnet pass will keep producing:**

1. **A directional fix can introduce a NEW inversion one clause later.** R04's `eli5`
   smoke-detector analogy had "too many exceptions" mapped to overstating risk, which is
   backwards. The agent fixed that half correctly and then wrote that a detector which
   "almost never goes off" is "set to trigger on the faintest wisp of smoke", which would
   make it go off constantly. **When an agent reports a directional fix, re-read the whole
   surrounding passage, not the clause it changed.** Both halves of a comparison have to
   be re-derived, because the writer's mental model was wrong when they wrote both.
2. **An `example` field can contradict the formula it sits under.** R03's peaks-over-
   threshold concept told students to compute \((N_u/n)/(1-c)\), the reciprocal of the
   \((n/N_u)\times(1-c)\) used by the formula, the derivation and the quiz in the same
   file. It read fine. The only way to catch it is to plug numbers in.

**How to verify a formula orientation cheaply:** Schweser's own module-quiz answer keys
are worked numbers with known results. Reproducing one settles an orientation question in
a minute. The POT VaR orientation was confirmed by reproducing the source's
\(\beta=0.9, \xi=0.15, u=2\%, N_u/n=4\%, c=95\% \to 1.8025\%\) exactly; the wrong
orientation does not land anywhere near it. Do this rather than reasoning about it.

**Source-internal inconsistency is real and needs a stated rule.** R04's 1.24x capital
ratio is tied to a 97% confidence level at Book 1 lines 1331 and 1489, and to 97.5% at
line 1493. The file had shipped both. Rule applied, and to apply again: **pick the reading
where the figure is actually derived (here 1489, the passage that states the 1.24x), use
it everywhere in the file, and flag the discrepancy rather than silently averaging.**

**Per reading, briefly:**
- **R01 (Estimating Market Risk Measures):** clean going in. All 12 dashes were in
  `related` labels ("R# : label" now). Math was already right throughout.
- **R02 (Non-Parametric Approaches):** genuinely good as written, ghost-effect mechanism
  and the filtered-historical-simulation explanation both already carry their why. Only
  abbreviations and three GARP attributions needed work. Do not rewrite this one.
- **R03 (Extreme Value Theory):** the reciprocal defect above. Also standardized GP/GPD,
  which had been floating as three different names for one distribution.
- **R04 (Backtesting VaR):** the two defects above. Everything else (z-tests, Kupiec
  3.84 = 1.96 squared, Basel zone boundaries) recomputed correct.
- **R05 (VaR Mapping):** every worked number matches the source, and the counterintuitive
  claims (more mapping precision usually LOWERS VaR; a low-VaR barbell can carry the
  highest tracking error) already carry their mechanism. Leave the substance alone.

### R36 — Future Value and Exposure (PILOT of the content-sonnet-clearance run, 2026-07-25)

Owner called this one "horribly written" and picked it as the pilot precisely because
it was the sharpest test. Full rewrite pass, per the flag. What the rewrite did, and
why, is the template for the rest of the run:

- **Good (keep):** the fantasy-football `eli5` (it earns the "only the weeks you are
  ahead can hurt you" asymmetry rather than asserting it, and reaches EE/PFE/EPE
  through the frame). The four-silhouettes framing. The netting-factor derivation,
  which is genuinely correct including the \(-1/(n-1)\) floor.
- **Weak (FIXED):** (a) `intuition` opened on a roster of definitions. It now opens on
  the loan-versus-swap problem ("a loan tells you your exposure, a swap does not"), so
  every metric arrives as the answer to a question already asked. §1a stage 1.
  (b) Three `def`s were enumerations wearing a definition's clothes, and the SAME
  enumerations already sat in `breakdown`. Deleting the list from `def` fixed the
  validator AND the duplication in one move. **This is the single highest-yield edit
  shape in the corpus: check `breakdown` before rewriting a long `def`, the list is
  usually already there.** (c) `concepts[6].example` held the funding-vs-credit
  material, unrelated to its own concept; it became its own concept.
  (d) Meta-references purged: "tested visually and verbally", "a question format GARP
  favors", "the source's Figure 36.7", "worked example from the source", "the standard
  tested answer". (e) 96 em/en-dashes to 0.
- **Math correctness (FIXED, and this is the class of defect §8.4 exists for):**
  the PFE worked example printed `2.33 × 0.07 × 0.2 = 3.27%`. That arithmetic gives
  **3.26%**; 3.27% is the number Schweser's own worked version prints. The app now
  says "about 3.3% of notional" throughout, so a student who checks the multiplication
  is not told they got it wrong. **Rule: when a source's rounded figure disagrees with
  the arithmetic you just showed, do not print the source's figure at the end of your
  own equation chain.** Also: the EE(MPoR) and PFE(MPoR) formulas have different units
  (EE scales a money amount, PFE returns a percentage), and the old `plain` glossed
  both as the same operation. A `plain` must match its own equation term by term.
- **Quiz (FIXED):** Q1 was indeterminate. It asked for EE given expected MtM of
  −$2m, keyed $0, and the `why` itself admitted the answer was not determinate
  ("$0 reflects that a negative-mean position typically has EE close to zero"). A quiz
  whose `why` argues with its own key is worse than no quiz. Replaced with a
  determinate version (EE is non-negative, and strictly positive whenever the positive
  tail is non-empty) whose distractors are the three real misreadings. A seventh
  question was added on collateral volatility, where the counterintuitive result
  (9.43% > either input) had no assessment attached to it.
- **Abbreviations (§1 rule):** expanded on first use in this FILE: value at risk (VaR),
  credit default swap (CDS), credit value adjustment (CVA), minimum transfer amount.
  Dropped "RR", "ITM" and "WWR", each used two or three times, per the "do not
  abbreviate the harder object" rule. The PFE/EPE look-alike pair now names the
  distinguishing word (FUTURE vs POSITIVE) in the sentence that introduces it, in
  `intuition`, in `connections.confused`, and in a hook.
- **Guidance for the next wave:** budget for a `breakdown`-versus-`def` reconciliation
  on every reading, not just the flagged ones. And read `concepts[].example` fields
  suspiciously: the enrichment run parked overflow content in them, so an `example`
  that does not exemplify its own concept is a recurring defect, not a one-off.

## Durable learnings from the Phase 3 linking run (2026-07-25)

Phase 3 turns concept NAMES into links automatically, which made one thing
obvious: **a concept's `name` is now user-facing machinery, not just a label.**
Rules for anyone adding or renaming a `formulas[]`/`concepts[]` entry:

1. **Name the concept, not the section.** "Why the basis opened (demand) and why
   it has not closed (limits to arbitrage)" is a heading; "Covered interest
   parity" is a concept. Only the latter can be matched, linked, or looked up.
2. **A parenthetical is either an acronym or a disambiguator, and they behave
   differently.** "Value at Risk (VaR)" gains "VaR" as a match phrase; "Expected
   loss (single asset)" does not gain "single asset", and the qualifier is
   stripped from the page heading. Acronyms match case-sensitively, so "VaR"
   never fires on the variance function `var(m)`.
3. **Two entries for one idea cost you the link.** "Wrong-way risk (introduced
   via the CDS example)" and "Wrong-way risk (WWR) in CDS" were two names for one
   concept; the generator now keeps only the most-referenced. If a reading needs
   its own angle on a shared concept, put it in that reading's prose, not in a
   near-duplicate concept name.
4. **Watch for words that mean two things across books.** Caught in the run and
   fixed at the source: "pass-through" (MBS vs a control's failure probability,
   R43), "CSA" (Credit Support Annex vs Singapore's Cyber Security Agency, R47),
   "tranching" (credit/prepayment vs deposit maturity buckets, R77), "equity
   value" (Black-Scholes-Merton vs a bank's net worth, R79), "risk contribution"
   (portfolio measure vs "systemic-risk contribution", R68). When the content run
   introduces a term that is already loaded elsewhere, say which sense you mean
   in the sentence.
5. **Rerun the generator after renaming anything.**
   `node scripts/build-core-concepts.mjs`, then
   `node scripts/preview-concept-links.mjs <rn...>` to see what changed.

### Wave 2 (R06-R10, Book 1, 2026-07-26) and what the gate learned

**A wave can be interrupted mid-file, and a dash-clean file is NOT proof the wave ran.**
This wave was resumed from a killed session: r06/r08/r10 were dash-clean and committed to
nothing, r07 still had 19 dashes and r09 two. Before assuming an uncommitted wave is done,
run the dash grep per file, and read the diff of the "finished" files for mandate items the
agent had not reached yet (this one had left GARP attributions in three of the five).

**The defect class this wave adds: a date/label attached to the wrong event.** R07 called
the CDO tranche blowup "the 2008 tranche trade" in ten places (breakdown title, concept name,
misconception, high-yield item, recall, hook, quiz stem, thinkLike, teaches, summary) while
its own body correctly said the trigger was the May 2005 GM/Ford downgrade. Book 1 line 2385
puts the trade "just prior to the financial crisis"; the 2007-2009 systemic-correlation
material is a genuinely separate story that the same reading also covers, which is exactly
how the two got merged. **Rule: when a reading covers an event AND a later crisis, check that
every label naming a year is attached to the event it actually describes.** A student who
memorized the hook would have answered "2008" to a date question and been wrong.

**Second defect: a qualitative gloss that contradicts the numbers in its own file.** R08's
`thinkLike` said recession-period correlation is "comparatively stable", while the same file
correctly prints recession correlation volatility at 80.5% against 83.0% in normal periods
(second-highest of three, not stable). The numbers were right everywhere; only the adjective
was wrong. **When a reading's punchline is a near-tie between two regimes, the prose must
carry the actual gap, not round it into a qualitative contrast.**

**Verified-correct, do not rewrite:** R09's copula derivations (the percentile mapping, the
7,750 pairwise correlations, the Gaussian default-time copula) are all right and well
explained; R10's regression hedge has the direction right (dependent = nominal yield,
independent = real yield, beta rescales the naive DV01 face amount), confirmed against Book 1
lines 3111-3131; R06's BCBS Working Paper No. 19 (Jan 2011) attribution matches line 281.

**Renaming a concept costs a generator run.** R07's "Correlation and the 2008 crisis: the CDO
tranche mechanism" became "The CDO tranche trade of May 2005", which changes a link target.
`node scripts/build-core-concepts.mjs` after any concept rename, and commit the regenerated
`conceptLinkTable.js` in the same commit.

### Wave 3 (R11-R15, Book 1, 2026-07-26) and what the gate learned

**The term-structure cluster is mathematically sound. Do not go looking for defects here.**
Every worked number was reproduced: R11's backward induction and OAS direction (market below
model implies positive OAS implies trading cheap), R12's convexity example (0.92624 vs
0.92593, \(z_2=7.9816\%\), the 1.84bp gap), R13's Vasicek chain (\(\theta=18\%\) from
\(6\%+0.36\%/0.03\), the 10-year forecast of 9.26%, the 23.1-year half-life), R14's CIR step
(0.06% drift + 0.07% shock = 0.13%), R15's minimum variance delta sitting BELOW the
Black-Scholes-Merton delta (Book 1 line 4789). This wave was almost entirely dashes: 125 of
them across five files, plus a scattering of GARP attributions.

**The one real defect: an approximation printed as if it were the exact value.** R14 wrote
the lognormal up-node as \(r_0e^{0.20}\approx r_0(1.20)\) in two places. \(e^{0.20}=1.2214\),
so a student checking it on a calculator gets a different number than the app prints. The
\(1+\sigma\) approximation is legitimate teaching (it is what makes "multiplicative" click),
but it has to be LABELLED as the approximation and shown next to the exact value. **Same rule
as R36's 3.26/3.27: never print a rounded figure at the end of your own equation chain
without showing what the arithmetic actually gives.**

**Where the source's own wording will make a correct app statement look wrong.** Schweser's
LO 14.e wrap-up says "the CIR mean-reverting model has constant volatility (σ)", which reads
as if CIR's yield volatility were constant. It is not: σ is a fixed parameter, but CIR yield
volatility works out to \(\sigma/\sqrt r\) and falls as rates rise, which is exactly why the
lognormal model (constant yield volatility σ) is the contrast case. R14's pitfall now says
this explicitly rather than just asserting "CIR has NEITHER constant". **When the app is
right and a source summary line is loose, spell out the reconciliation in the file. A student
comparing the two will otherwise assume the app is wrong.**

**Dash-purge shapes that recur, so reach for them first:** a leading label ("Step 1 —",
"Setup —", "Model 1 — no drift") becomes a colon or a comma; a mid-sentence aside bracketed
by two dashes becomes parentheses; a trailing dash clause becomes a full stop plus a
connective ("so", "and", "which"). Concept NAMES containing dashes ("Model 2 — constant
drift") are link targets: rename them to colons and re-run
`node scripts/build-core-concepts.mjs` in the same commit.

### Wave 4 (R16-R20, 2026-07-26): the bulk dash pass, and why it needs a paren audit

Book 2 starts here and the dash density triples: 302 across five files versus 125 in wave 3.
A per-instance hand rewrite at that density is not affordable, so this wave used a
pattern-assisted pass, then reviewed every rewritten site. **The pattern rules that are safe**
(and should be reused, in this order): a paired aside `X — clause — Y` becomes parentheses;
a leading label `"Setup — text` becomes `"Setup: text`; a numeric range `3–7%` becomes
`3% to 7%`; whatever is left of a standalone ` — ` becomes a comma.

**The failure mode this introduced, and the audit that catches it: the paired-dash rule can
match ACROSS a string boundary.** Two `related` arrays came out as
`label: "R30 (protection buyers..." }, { r: 28, label: "R28) reinsurance..."`, and R18's
summary turned `1st (business owners — originate/manage), 2nd (...)` into nested garbage.
Both are invisible to the validator and to the dash grep. **Always run this after a bulk
pass:** count `(` versus `)` per double-quoted string, and diff the total paren count against
`git show HEAD:<file>`. A per-string imbalance is a guaranteed break; a large total delta is
worth eyeballing. Then re-read every inserted parenthetical span (list them by finding
`\([^()]{3,95}\)` matches present in the new file and absent from the old).

**Comma splices are the second cost of the mechanical pass.** ` — ` joining two independent
clauses becomes a splice when replaced by a comma. Fix those to a colon (when the second
clause explains the first) or a full stop. Caught here: "Neither implies the other, a solvent
company can default", "you don't just shrug, you follow steps".

**Verified correct against Book 1, do not re-check:** R16's FRTB arithmetic (99% VaR
\(\mu+2.326\sigma\) versus 97.5% ES \(\mu+2.338\sigma\), the five liquidity horizons
10/20/40/60/120 days, the \(ES_1\) to \(ES_5\) nested waterfall, the 12-at-99% / 30-at-97.5%
backtesting exception limits). R20's EL/UL algebra and its \(\rho=1\) boundary quiz are also
right: portfolio UL equals the simple sum ONLY at perfect correlation, so "always strictly
less" is the trap answer, not the key.

### Wave 5 (R21-R25, 2026-07-26): the validator failures the dash purge uncovers

**These five files were already failing `validate-reading.mjs` before this run touched them,
and the dash purge is what makes that visible.** The dash count itself is a FAIL line, so it
masks everything under it; clear the dashes and four to five real structural failures surface
per file. Budget for this on every Book 2-5 wave: the dash purge is the cheap half.

**The failures were all one shape, and R36 already told us the fix:** a `concepts[].def`
carrying a 120-to-240-word enumeration that `breakdown` ALREADY holds, verbatim. Check
`breakdown`'s titles first (`grep 'title: "'` inside the breakdown block); in wave 5 every
single long def had its list sitting in breakdown under an obvious title ("Six factors
influencing sovereign default risk", "Five common criticisms of credit rating agencies",
"Merton's three 'cousin' models"). The def then gets rewritten as an actual DEFINITION, which
is what the field is for, and the enumeration keeps its one home. Before shipping the trim,
diff the dropped text against breakdown and re-add anything that lived ONLY in the def
(caught here: R24's "an analyst drafts, a committee of 5 to 10 votes").

**Mechanical warning on trimming a def by script:** find the closing quote by scanning for an
unescaped `"`, not by searching for the next `",\n`. The naive version deleted the fields
between `def` and `related` in R21 and dropped the trailing comma, producing a syntax error
the validator reports only as "import error: Unexpected identifier". The import sweep is what
catches this; run it before the validator, not after.

**Also fixed this wave:** R23 cited "Module Quiz 23.1, Q2 in the source" inside a `pitfall`
(the reader has no such quiz in front of them), and R25 had a `related` entry using the
`{r, why}` shape that `connections` uses instead of the `{r, label}` shape `concepts[].related`
requires. Both are worth grepping for corpus-wide: `grep -n "Module Quiz" src/data` and
`related: \[\{ r: [0-9]*, why:`.

### Wave 6 (R26-R30, 2026-07-26)

**R28's `eli5` is the app's exemplar (CLAUDE.md §1) and its dashes were rewritten BY HAND
before the mechanical pass ran.** Do the same for any passage the guide names as exemplary:
the apartment-ticket tranche explanation earns its punchline through rhythm (a claim, then
the turn, then the payoff), and a blind comma substitution flattens exactly that. The
hand-written versions use a full stop where the dash marked a beat and a comma only where the
clause is genuinely parenthetical. Everything else in that file went through the normal pass.

**The paired-dash rule's third failure mode: it eats an existing parenthesis.** R29 had
`Wrong-way risk (PD positively correlated with exposure — bad) and right-way risk (negatively
correlated — good) determine...`; the rule matched from the first dash to the second, ACROSS
the intervening `)` and `(`, producing `(PD positively correlated with exposure (bad) and
right-way risk (negatively correlated) good)`. Per-string paren counts stay balanced, so the
wave-5 audit does NOT catch it. The check that does: list `\([^()]{3,95}\)` spans present in
the new file and absent from the old, and read each one. Do this every bulk wave. Same
mechanism produced nested parens in R28 and R30.

**Verified correct, leave alone:** R26's Vasicek WCDR `terms[]` (the \(N^{-1}(X)=+3.09\) sign
trap that CLAUDE.md §8.4 was written about is explained correctly, including WHY the two
negatives cancel) and its credit VaR figures ($589.00 above 99.9%, $56.81 between 99.9% and
99.467%, matching Book 2 line 4215). R27's two-credit example (covariance
\(0.00015-0.002\times0.003=0.000144\), \(SD_1=\sqrt{0.002\times0.998}=0.04468\)) and its
credit-VaR-as-excess-over-EL convention ($60,000 loss minus $20,000 EL = $40,000 VaR), which
is consistent across every example in that file.

### Wave 7 (R31-R35, 2026-07-26)

**Two new validator failure shapes, both worth grepping for corpus-wide:**

1. **`concepts[].related` written with `connections`' `{r, why}` shape.** The two fields look
   alike and take different keys: `connections.from/to` wants `{r, why}`, `concepts[].related`
   wants `{r, label}`. Hit R33 twice and R35 once. Grep:
   `grep -n 'related: \[.*{ r: [0-9]*, why:' src/data`.
2. **A quiz `why` that names its parties A and B trips the option-letter check.** R33's
   walkaway question calls the counterparties A and B in the stem, so the `why`'s
   "only the non-defaulting party (B) benefits" reads to the validator exactly like a
   reference to option B. The validator is right to be strict here, and the fix is better
   prose anyway: "only the solvent, non-defaulting side benefits". **Never letter your
   counterparties in a quiz;** name them (Bank A/Bank B is fine in a stem, a bare "(B)" in a
   `why` is not).

**The OPEN Phase 5 items recorded for R31-R33 earlier in this file were deliberately NOT
actioned here** (monolines and CDPCs still lack their motive, R32 still lacks the zero-sum
framing, R33 is still repetitive). Those are Opus-B improvements, outside this phase's closed
mandate. They remain open, and the trims done here do not conflict with them: R32's CVA def
now states the price-versus-cap distinction the open item asks for, so that part is closed.

### Wave 8 (R37-R40, 2026-07-26): the def-trim has a content-loss failure mode

**A def trim is a rewrite, and a rewrite can invent.** Twice this wave the trim went wrong in
a way the validator cannot see, and both are now standing checks:

1. **R38's "four named pitfalls" was rewritten from memory of what such pitfalls usually are**
   (correlations assumed, collateral assumed available, wrong-way risk omitted, results
   aggregated) rather than from the four the file actually named (results not aggregated with
   loan/trading stress at all; current exposure used instead of EE/EPE when they are combined;
   current exposure unstable for at-the-money trades; delta linearization breaking down over
   large moves). Plausible, well-written, and entirely fabricated. **Never write a numbered
   list from the concept NAME. Read the old def, then compress it.**
2. **R22's trim silently dropped three of seven input categories** (market conditions,
   corporate governance, corporate news) and invented a "four buckets" framing. The old def
   listed seven; breakdown named them only in passing, so the detail (which ratios, which
   governance items) left the corpus entirely.

**The mechanical audit that catches both**, run after any trim: pull the pre-trim def from
git, take every content word of 4+ characters, and list the ones absent from the whole new
file. Prose filler dominates the output and is ignorable; what matters is proper nouns,
numbers, and category names. It is how the R22 loss, R23's dropped product list (HELOCs,
installment loans, small business loans), R24's dropped country examples and committee
factors, and R35's dropped auction incentive were all found and restored.

**When breakdown does NOT already carry the enumeration, ADD a breakdown block, do not
delete.** R40 needed two new blocks (the four risk types operational risk pulls in, and the
five jurisdictions' resilience guidance) before its defs could be trimmed. That is the honest
version of "move the enumeration to breakdown", which is what the validator message literally
asks for.

### Wave 9 (R41-R45, Book 3, 2026-07-26): dash density collapses, cross-reference errors appear

**Book 3's op-risk core is NOT uniformly dashed, and two of five files needed no dash work at all.**
R41/R42/R43 carried 76/95/101 dashes; R44 and R45 carried zero. A wave can therefore be
front-loaded: budget the hand-rewriting for the first files and spend the saved effort on the
clean ones' quiz and cross-reference audit, which is where their defects actually were.

**The new defect class this wave adds: a forward reference to the wrong reading number.** R43's
`why` said the standardized measurement approach "closes the book in R63" and its highYield said
"R62/R63", while its own `related` entries correctly pointed at R62. R63 is Book 4 (Liquidity
Risk); the SMA reading is R62. The cause is that Schweser's own text numbers that reading 63
(the LO strings in Book 3 read "LO 63.a"), so a content pass that reads the source will import
the source's numbering. **Rule: any reading number written into prose must be checked against
`src/lib/meta-data.js`, not against the LO numbers in the Schweser text, because Book 3's
internal reading numbers run ahead of the app's.**

**Second defect: a decimal place lost inside a correct chain.** R43's fault-tree derivation
printed \(0.99\times0.05\times0.10\times0.03\times0.01 = 0.0000001485 = 0.0001485\%\). The
percentage is right and matches the source's answer key; the decimal is off by 10x
(0.0001485% is 0.000001485, not 0.0000001485). The two forms sit in the same equation, so
this is only visible if you convert one to the other. **Whenever a file prints a value in both
decimal and percentage form, convert one into the other before shipping.**

**Third: a scaling illustration attached to the wrong base figure.** The same derivation scaled
the phishing example's 0.0001485% across 50,000 employees to get 7.4%. The arithmetic is right,
but Book 3 line 1995 scales the *generic* four-control figure (0.000625% x 50,000 = 31.25%),
and 31.25% is the number that makes the teaching point. The app now uses the source's own pair.
**When the source supplies a worked scaling, use its figures rather than re-deriving the same
lesson from a different example in the file.**

**The def-trim audit from wave 8 works and should now be routine.** R45 needed four defs trimmed
(186/328/298/150 words). Running the pre-trim-word-diff caught three real losses that the
validator cannot see: the ExCo's "elected board members", the zero objective's actual definition
(no overdue action plans, no overdue audit recommendations, tracked by "discipline indicators"),
and emerging-risk scanning's "particular attention to the regulatory and compliance environment".
As in R40, two of R45's four trims required ENRICHING an existing breakdown point first (the KRI
sources with their HR/audit/compliance examples, and the three qualitative-aggregation methods),
not just deleting from the def.

**`pdf.query` can be fixed for free while a file is open.** R41's query was authored prose
("R41 answers "who's in charge of operational risk?" at three levels"), one of the 21 files
CLAUDE.md §7.5 flags as relying on the title fallback. It is now "The Three Lines of Defense
Model", which appears verbatim as a heading in Book 3. Checking a candidate costs one grep
(`grep -n "<phrase>" "Book 3 (1).md"`, with `**` stripped), so do it whenever the current query
is obviously prose.

**Verified correct, leave alone:** R41's Pillar 1 chain (BI = ILDC + SC + FC, the 12/15/18%
bands, LC = 15 x average annual losses, ILM = ln(e - 1 + LC/BIC), and the SC worked example
giving EUR 185m + EUR 45m = EUR 230m), R43's LDA Poisson/lognormal pairing and 99.9th-percentile
capital reading, R44's whole human-error taxonomy and its RPO/RTO pair, R45's Pillar 3 numbers
(10 years of losses, 3 years for the business indicator) and the four notification triggers.

**Still open for Opus-B:** R44 has no `sources` array at all, and R45's second source is a
generic GARP program link that does not earn its place.
