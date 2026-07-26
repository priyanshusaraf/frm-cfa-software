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

9. **The FRM exam is ENTIRELY multiple choice. Never describe a question format
   that does not exist.** Owner-reported 2026-07-26 against R35, which told the
   student to expect "sequencing questions, 'put these loss-waterfall stages in
   order'". There is no ordering task, no matching grid, no fill-in. Everything
   is a stem plus four options. An ordered list is still testable, but only in
   MCQ form: "which resource is drawn on FIRST", "which stage does this activity
   belong to", "which of these is NOT one of the four". Swept corpus-wide the same
   day: "matching-style questions", "matching-question material", "good for
   sequencing/matching questions" all rewritten into the question shape that
   actually appears. Grep before shipping:
   `grep -rn "sequencing\|matching[- ]style\|matching question\|put these\|in the correct order" src/data`.
10. **An `eli5` has to EARN its punchline, not narrate the answer in one breath.**
   Owner-reported 2026-07-26 against R35 ("very mediocre, not up to the mark"),
   whose ELI5 was a single 200-word sentence that introduced the lunchroom, the
   monitor, the deposit, the shared jar and the waterfall all at once, then
   asserted "this is exactly how a CCP works". The rewrite follows the R28
   exemplar's shape (CLAUDE.md section 1): start in the SIMPLER system the reader
   already understands (kids swapping food directly, and the question "is this kid
   good for it?"), change exactly ONE thing (a monitor steps into the middle),
   then let the consequences fall out one at a time, in separate paragraphs, each
   earning the next: the question you wake up asking changes, so promises can be
   netted, so the monitor is now short when someone defaults, so the money has to
   be queued in advance, and the order of that queue is what makes the defaulter
   pay first. It closes on what the reader has actually BOUGHT (you stopped
   worrying about Ravi and started worrying about the monitor), which is the
   concentration tradeoff, reached through the frame rather than asserted.
   **Diagnostic: if the ELI5 is one paragraph and one sentence, it is almost
   certainly asserting rather than teaching.**
11. **Never append a bare count to a title or heading in brackets.** Owner-reported
   2026-07-26 against R35's "The CCP loss waterfall (six stages, in strict order)":
   the bracketed enumeration is a clear AI tell, and the count is redundant because
   the list underneath it is right there and countable. A parenthetical is fine when
   it carries information the title cannot ("(order is always strictly maintained)",
   "(2021 report)", "(1996 amendment)", "(38 banks, 9 countries)", "(both conditions
   must hold)"), and a formula-name disambiguator is fine ("Risk contribution
   (2-asset)"). What is banned is "(three reasons)", "(five types)", "(4 frequencies)",
   "(6 items)", "(3)". Nineteen files were swept the same day. Grep:
   `grep -rno '"[^"]*(\(two\|three\|four\|five\|six\|seven\|[0-9]\+\)[^")]*)"' src/data`
   and keep only the parentheticals that say something a count does not. Titles and
   concept NAMES are link targets, so rerun `node scripts/build-core-concepts.mjs`
   after any rename.

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

### Wave 10 (R46-R50, Book 3, 2026-07-26): the colon artifact, and two more wrong cross-references

**The new defect class: a previous dash purge left colons doing work a colon cannot do.** R49
was already dash-free and validator-clean, and read badly anyway: "USAA Federal Savings Bank:
the banking arm of USAA, a Texas-based group founded in 1922: was fined $140 million", "for
politically exposed persons (PEPs): especially foreign PEPs: because their public profile...",
"placement, layering, integration: with the actual techniques". A mechanical dash-to-colon pass
produces sentences with two or three colons and no main clause. **A dash-clean file is not a
purged file. Grep any Book 3-5 file for a line with two colons inside one string
(`grep -n '": [^"]*: [^"]*: ' file`) before marking it done**, and rewrite those to
parentheses, commas, or a full stop, which is what the original dash was doing.

**Wrong cross-references keep appearing, one per wave now.** Wave 9 found R43 pointing at R63
for the SMA (it is R62). This wave: R46's stress-testing concept carried
`{ r: 56, label: "R56: stress testing at banks" }`, but R56 is Risk Capital Attribution and
RAPM; the stress-testing reading is R55, which the same array already cited. **Check the LABEL
text against `src/lib/meta-data.js`, not just the number: a label that describes a different
reading than the number points to is invisible to every automated check we run.**

**`pdf.query` can be the app's own tagline, which is worse than prose.** R48's query was
"Pairs a framework overview with the 2017 Equifax breach", a sentence that exists only in this
codebase, so the source jump could never hit. It is now "Equifax experienced a major cyber
breach in March 2017" (Book 3 line 3925). When a query reads like marketing copy rather than
textbook prose, it was written by an agent, not lifted from the source.

**Quiz repair: "None of these" options are a live defect, not a style nit.** R50 had
"None of these, all three are standard contract provisions" as an option. `Quiz.jsx` shuffles
options every round, so a none-of-the-above option lands in a random position and reads as
nonsense next to its neighbours. It was replaced with a determinate question (which named
provision is NOT in the Fed's list; exclusivity is not, and demanding it would worsen
concentration risk). **Grep for `None of\|All of the above\|Both of the above` when opening any
quiz.**

**Where a whole reading is a checklist, the AI-isms cluster in `thinkLike`.** R47 and R50 are
both pure taxonomy readings, and in both the substantive content was fine while nearly every
"the exam tests X" sentence sat in `thinkLike` and the quiz `why`s. The fix that preserves the
value: keep the strategic point (which question shapes recur, which distractor tempts) and drop
the framing that attributes it to an examiner. "Two question shapes dominate here" carries the
same information as "GARP tends to test this reading in two ways" without the AI tell.

**Verified correct, leave alone:** R46's Basel pillar structure and the AAA/0.01% to 99.99%
confidence-level mapping, R47's jurisdiction facts (only Brazil, Japan and Saudi Arabia mandate
bank-to-bank sharing; only China mandates regulator-to-bank; the MAS/CSA voluntary split),
R48's Equifax chronology including the counterintuitive detail that the attack came days AFTER
Equifax applied an Apache Struts patch and exploited a flaw in that patch (Book 3 line 3925,
which differs from popular accounts and is what the source says), R49's USAA facts ($140m,
FinCEN and OCC, 2016-2021, ~90,000 unreviewed alerts), R50's six risks and 17 contract clauses.

### Wave 11 (R51-R55, Book 3, 2026-07-26) plus two owner interventions

**Owner intervention 1 (R35, ELI5 quality):** see durable style rule 10 above. The
R35 ELI5 was rewritten from one 200-word sentence into five paragraphs that build the
CCP from the bilateral case. Nothing else in R35 changed, and the reading stays wave-7
`done`; the ledger row records the rework.

**Owner intervention 2 (non-existent question formats):** see durable style rule 9. R35
claimed the exam asks you to "put these loss-waterfall stages in order". It does not:
the FRM is entirely MCQ. Fixed in R35 and swept across ten other files that used
"matching-style"/"matching-question"/"sequencing" framings.

**The wave itself was light on substance and heavy on framing.** R51-R55 are
case-study and guidance readings whose facts held up under checking (Capital One's $80m
and Morgan Stanley's $60m OCC fines, the UBS/JPMorgan/Deutsche Bank trio and their
regulators, SR 11-7's model definition, the two-condition backtest rule, SCAP's
non-monotonic disclosure path, the Nevada 12.9% versus North Dakota 3.3% spread). The
defects were all in how the material was framed:

1. **A recall answer that refuses to answer.** R55 asked why disclosure moved from SCAP
   to CCAR and back, and answered "the reading doesn't specify the exact motivations".
   That is a meta-reference AND a wasted card. The same file already contains the real
   answer (disclosure restores trust in a crisis but invites window dressing and crowds
   out private information production in calm times), so the card now gives it.
   **If a recall answer says the source is silent, either the answer is elsewhere in the
   file, or the question should not exist.**
2. **"None of the above" keeps appearing.** R54 had "None of the three, all are
   implementation errors" (wave 10 found the same shape in R50). Both are now concrete
   questions. Add this to the standing quiz grep alongside the option-letter check.
3. **Second-person exam-coaching is where the AI tells cluster.** In these five files
   nearly every "GARP loves testing", "the examiner tests this by", "on the exam this
   reading is tested" sat in `thinkLike` or a quiz `why`. Keep the strategic content,
   drop the attribution: "Two question shapes recur here" says the same thing.

**Widget fix shipped alongside (owner-reported):** `waterfall-flow` painted its header
box in amber with an amber border, which reads as an interactive or selected element in
a widget that has no interaction at all. The header is now neutral (`--bg-raised` on
`--border-strong`) and colour instead carries one honest meaning: a 3px left edge on each
layer ramping accent → cyan → amber → red with depth, because reaching a lower layer is
strictly worse news. **Rule: in a static widget, never spend a saturated accent colour on
something that is not conveying data. A reader reasonably reads colour as either meaning
or affordance.**

### Wave 12 (R56-R60, Book 3, 2026-07-26): the bulk pass, its two failure modes, and a corpus-wide title sweep

**554 dashes across five files, so this wave used the pattern-assisted pass again** (the
wave-4 method), with one improvement worth keeping: **write the rules so they physically
cannot match across a string boundary.** The regexes use an inner class of
`[^"`\n—–]`, which makes the wave-4 defect (a paired-dash rule joining two adjacent
`related` entries) impossible by construction. Script kept at `/tmp/dashpass.py` in that
session; reproduce it rather than hand-rolling a looser version.

**Failure mode 1, still live: the paired rule eats existing parentheses.** R57's
`concepts[4].def` came out as "(the board should understand gross (standalone) vs. net
(diversified) enterprise-wide risk; (2) senior management commitment) must actively
support", because the numbered list `(1) ... (2) ...` gave the rule brackets to swallow.
Per-string paren counts stay balanced, so the wave-5 audit does not catch it. **A def
containing an enumerated `(1) (2) (3)` list must be excluded from the pattern pass and
rewritten by hand.** All three of R57's failing defs were rewritten from scratch, which
was needed anyway because the validator was rejecting them for length.

**Failure mode 2: the fallback comma turns explanatory clauses into comma splices.**
Fixed by a second scripted pass promoting a known set of splice openers (", this ",
", they ", ", it's ", ", don't ", ", hence ") to a full stop, then grepping for
`\. [a-z]` to catch fragments the promotion created. Two real fragments surfaced that way
("Especially where Basel III is conservative."), so run that grep every time, filtering
the legitimate abbreviations (vs., e.g., i.e., econ.).

**Owner intervention (third this session): counts do not belong in headings.** "people
can count man", against "Advantages of central clearing (six)". This is durable style
rule 11 extended: not just bracketed counts but any leading enumeration in a heading.
**253 titles across 91 files** were rewritten ("Five areas of cyber governance" becomes
"Areas of cyber governance"). Two carve-outs, both deliberate: rhetorical hook titles
keep their counts, because "Three capital concepts, three jobs" and "Four kinds of 'oops'"
are voice rather than enumeration (hooks are detectable by their one-line
`{ title: "...", text: "..." }` shape), and a number stays when it is part of the term
itself. The same sweep removed 28 `(LO 36.d)` source-guide references that had leaked into
titles and breakdown points.

**Method note for that sweep:** restoring the hook lines from `git show HEAD:<file>` also
restored their em-dashes, because HEAD predated this wave's purge. Any bulk restore has to
be followed by re-running the dash pass on the touched files. Caught by the per-file dash
count, which is why that check runs after every step and not only at the end.

### Wave 13 (R61-R65, 2026-07-26): no entry was written

The wave-13 gate updated the ledger rows but never wrote its section here, so its
learnings exist only as the one-line notes in `content-run-ledger.md`. Recorded as a
gap rather than reconstructed, because inventing what a gate "probably" learned is
worse than admitting it was skipped. **The gate is not done until this file has a
section for the wave** (protocol section 2b item 5).

### Wave 14 (R66-R70, Book 4, 2026-07-26): a broken audit tool, and what a dash pass does to a list

**The coverage audit had been matching the wrong source chapter, and the gate could
not have seen it.** `coverage-audit.mjs` picks a source section by title similarity
normalized by the SHORTER of the two titles. That number saturates at 1 whenever one
title's content words are a subset of the other's, so the source's "LIQUIDITY RISK"
tied with the real "INTRADAY LIQUIDITY RISK MANAGEMENT" for r68 and, sitting earlier
in the book, won the `>` comparison. r68 was audited against r63's chapter and
reported seventeen missing terms (Northern Rock, Metallgesellschaft, liquidity black
holes) that belong to a different reading entirely. Five readings were affected;
three of them, r3, r23 and r31, were cleared in earlier waves under a bogus audit.

The tell was in the output all along and is worth learning to read: the audit prints
the learning objectives it matched, and r68's said **LO 64.x** when every neighbour
printed LO 67.x, 68.x, 69.x. **If the LO numbers in an audit do not sit in a run with
the readings around them, the tool has matched the wrong chapter. Check before
acting on a single line of its output.** Exact titles now short-circuit the scorer,
and ties break on overlap normalized by the LONGER title.

**All 15 coverage candidates across the five readings were false positives.** The
tool's own documented false-positive rate held: r66's "money market investments"
and "capital market investments" are literally breakdown block titles; r67's "market
signals/discipline approach" is one of the four approaches it teaches at length;
r70's two flagged topics both have their own breakdown block. Nothing was added.

**The pattern-assisted dash pass has a THIRD failure mode, and it hits lists
hardest.** Wave 12 documented the paired rule eating parentheses and the fallback
comma creating splices. Both recurred (r68's governance breakdown came out as
"the three lines of defense (treasury, corporate risk management) emphasized here,
internal audit)"). The new one: **a `breakdown[].points` entry is almost always
"Term, then its definition", and the dash separating them is the only thing marking
where the term ends.** Turned into a comma it reads as apposition and the term
dissolves into the sentence ("Commercial paper, unsecured discount paper from large
corporations, typically 90 days or less"). Turned into a full stop it reads as a
fragment ("Cash balances. Held at the central bank"). **The correct replacement in a
list item is a COLON, and the script cannot know that**, because the same dash in
prose usually wants a full stop. Practical rule for future waves: run the script
over the prose fields, then walk `breakdown[]` and every `concepts[].def` by hand and
convert term-separator dashes to colons. Grep for the artifact afterwards:
`grep -oE '"[A-Z][^":]{5,60}(, |\. )[a-z]' src/data/bookN/rNN.js` lists every list
item whose leading term now runs into its definition.

**The validator's option-letter check false-positives on credit ratings.** r66's quiz
why said "BB to B and B to CCC are both already below the investment-grade line",
which matches the `[A-D] and [A-D]` rule written to catch "B and C are both wrong".
Rewriting the sentence to name the ratings by description rather than by pair was
cheaper than loosening a rule that exists for a real reason. Expect this on any
reading that discusses rating migration.

**Owner-caught style, still live: never say the material is testable.** Several whys
in this wave asserted their own examinability ("a specific, testable directional
fact", "explicitly flagged as a frequently tested distinction", "GARP likes to test
this"). Rule 1 bans meta-references to the source; this is the same tell pointed at
the exam. Say what the trap IS, not that a trap exists: "the wrong option is simply
the correct fact reversed" teaches; "this is testable" does not.

### Wave 15 (R71-R75, Book 4, 2026-07-26): the first REAL coverage gap the audit has caught

**R74 was missing the four CD innovations entirely, and the source module-quizzes two
of them.** Bump-up CDs (the depositor may switch to a higher rate if rates rise),
step-up CDs (the rate adjusts upward on a schedule), liquid CDs (some funds
withdrawable without penalty) and index CDs (return linked to an index such as the
S&P 500) are each bolded in the source and answer key `2. C` turns on separating
bump-up from step-up. The reading taught negotiable/jumbo CDs and stopped. Also
absent: **relationship pricing** (pricing deposit services against the customer's
whole relationship, not the account) and **implicit interest** (below-cost service
pricing under Regulation Q, the toasters-and-teddy-bears era). All three were added
from the source, at source depth. This is the MPoR case repeating in a different
book, and it is exactly what protocol 2a-0 exists to catch: **the prose that WAS
there read perfectly well.** Nothing about R74 looked deficient from inside the file.

Note the shape of the miss. R74 covered the pricing METHODS thoroughly (cost-plus,
marginal, conditional, with worked numbers) and the deposit TYPES thoroughly, then
dropped the sub-list hanging off one type. **Enumerations nested one level below a
covered heading are where gaps hide**, because a reviewer checking "does it cover
deposit types?" ticks yes.

**The list-separator repair from wave 14 can be automated safely, and should be.**
Rather than hand-fixing every `breakdown[].points` entry the dash pass flattened,
diff against `HEAD`: for each points string, find where the dash sat in the original,
then replace the comma or full stop the script substituted with a colon. 89
separators across five files were restored this way in one pass, with no judgment
calls. The script lives in the wave-15 session transcript; reproduce it rather than
hand-editing, and **still read the result**, because the rule cannot tell a
term-separator dash from a genuine mid-sentence one.

**Two tells to check for AFTER hand-rewriting, not just before.** The r72 rewrite of
its exam paragraph introduced "Two other things are worth holding precisely", a
textbook structure-announcement (CLAUDE.md AI-VOICE TELLS item 1) that
`ai-tells.mjs` caught on the post-edit run. **Run `ai-tells.mjs` again after your own
prose edits, not only on the file as you found it.** The same run caught a sentence
the dash pass had left ungrammatical in r71's `teaches` ("...integration with other
models. That separate a stress test that..."), which the dash count and the
validator both pass cleanly. A broken sentence is invisible to every mechanical gate
in the pipeline except reading it.

### Wave 16 (R76-R80, Book 4, 2026-07-26): Book 4 finished; two mechanical lessons

**R76 was missing open repos**, a bolded source term, while covering overnight and
term repo thoroughly. Same shape as R74's CD innovations in the previous wave: the
reading covered the CATEGORY (repo tenor, deposit types) and dropped one named member
of it. Added with its mechanism, that an open repo renews daily until cancelled and
so buys the lender a daily exit without re-papering the trade. R77, R78, R79 and R80
flagged 19 candidates between them and every one was a false positive; R80's
per-market illiquidity detail in particular (7% of investment-grade and 22% of junk
bond yield variation, the on-the-run/off-the-run spread) is all present, just not
under the source's heading names.

**The dash pass needs a SECOND pass for strings holding a `(1) (2)` list.** Wave 12
established that such strings must be skipped, because the paired rule eats their
existing parentheses. What nobody wrote down is that skipping them leaves the dashes
in place, so the file still fails the gate. R78 and R80 had 23 and 29 dashes left
after the first pass for exactly this reason. The fix is a second run over only the
skipped strings with the PAIRED RULE DISABLED, leaving just the full-stop and comma
rules, which cannot touch a parenthesis. Two passes, not one, and the skip list from
pass one is the input to pass two.

**Extend the separator repair to `title:` and `name:` fields, not just points.** The
wave-15 script only walked `points[]`, so "Lehman and Bear Stearns. The 2008 case
studies" and "Covered interest parity. The baseline condition" survived as concept
names. Concept names are LINK TARGETS (the conceptLinkTable is built from them), so a
mangled one is worse than a mangled sentence: rerun `build-core-concepts.mjs` after
fixing any of them.

**Book 4 (R63-R80) is now fully cleared.** Remaining: Book 5, R81-R101, waves 17-20.

### Wave 17 (R81-R85, Book 5, 2026-07-26): the first Book 5 wave

**R82 was missing the whole "other macroeconomic factors" subsection.** It taught the
three headline macro factors (economic growth, inflation, volatility) in detail and
stopped, dropping productivity shocks (with the ~50% correlation to stock returns and
the Smets and Wouters seven-shock DSGE benchmark), demographic risk (the OLG model,
the baby-boomer liquidation prediction, rising risk aversion with age) and political
or sovereign risk. Added at source depth. **This is now the third wave running where
the gap had the same shape: the category is covered, a named member of it is not.**
That pattern is worth checking for deliberately rather than waiting for the audit,
because the audit only catches it when the source happens to bold the member.

**Book 5's readings are the most heavily parenthesized in the corpus**, so the
two-pass dash method is not optional here: every one of the five had strings the
paired rule had to skip. Run pass one, then pass two with the paired rule disabled,
then the separator repair over `points[]`, `title:` and `name:`.

**Watch the audit's worked-example headings in quantitative readings.** R85 flagged
"computing component VaR (example 1)", "computing portfolio VaR (part 1)" and four
more of the same shape. Those are Schweser's own worked-example headings, not
concepts; the reading reproduces every one of them inside `formulas[].derivation`.
Expect a burst of these on any calculation-heavy reading and do not treat the count
as signal.

### Wave 18 (R86-R90, Book 5, 2026-07-26): two more gaps, and a synonym rule applied

**R86 was missing the global custodian entirely** (a bolded source term) and **R88 was
missing universe comparison**, the style-bucket ranking method the source introduces
immediately BEFORE the risk-adjusted measures precisely so the reader can see what
those measures fix. Both added. R88's omission is instructive: the reading taught
Sharpe, Treynor, Jensen and the information ratio thoroughly, so it looked complete,
but it had dropped the naive baseline those ratios are defined against. **A reading
that teaches the sophisticated tool and drops the naive one it replaces has lost the
motivation, which is the thing this app exists to supply.**

**The appraisal ratio was a synonym, not a gap, and synonyms have their own rule.**
The source writes "known as the information ratio or appraisal ratio" for one
quantity. Protocol 2a-0 item 3 says ignore a term taught under another name, but
CLAUDE.md's abbreviation rule 2 says to pick the dominant name AND state once that
the other means the same, so the student is not thrown when the exam prints it.
Both apply: do not add a second concept, DO add the synonym note. Check for this
whenever an audit line names something the reading clearly already teaches.

**Separator repair volume is climbing through Book 5** (10, 14, 11, 19, 31 across
this wave against 9 to 20 in Book 4), because these readings lean harder on
"Term, then definition" list items. The repair is mechanical and safe; budget for it.

### Wave 19 (R91-R95, Book 5, 2026-07-26): a second audit bug, and where an over-long def should go

**The coverage audit had a second wrong-chapter bug, and it hit the reading the
back-audit called the worst in the corpus.** Three sections in the source title
themselves with a bare `**TITLE**` line and no `#` marks. The extractor required the
marks, dropped those sections, and their readings fell through: r92 was audited
against the artificial-intelligence reading, r6 matched nothing (which the ledger had
recorded as "r6 has no Schweser section at all", a false statement now corrected),
and **r99's 40-plus reported candidates were against the wrong chapter and drop to
four.** Between this and the wave-14 subset-saturation bug, **the audit has now been
wrong about eight readings.** The lesson generalizes past this tool: a report that
scores its own matches should always print WHAT it matched, and a reviewer should read
that column first. Both bugs were visible in the output before they were visible in
the code.

**An over-long `def` is not always an enumeration to move; sometimes it is teaching in
the wrong field.** R95's XAI def ran 137 words, but only the first third was
definitional. The rest was a genuinely good explanation of SHAP as a cooperative game
(each input variable is a player, its Shapley value is its fair share of credit for
moving the output off the average prediction, averaged over every ordering). That
belongs in `intuition`, where the chapter renders it as teaching, not in `def`, where
it reads as a definition that will not end. **Before trimming, ask which field the
overflow actually wants to live in.** Deleting it would have cost the reading its one
piece of real insight into a term most readings only name.

### Wave 20 (R96-R101, Book 5, 2026-07-26): the phase closes

Six readings, not five, since Book 5 ends at R101. No real coverage gaps: R99's flags
are the source's own principle-cluster headings (all 12 bank and 6 supervisor
principles are taught), and R101's are the book's statistical appendix (z-table,
t-distribution, worked hypothesis tests), which is not reading content at all. Expect
appendix bleed on the LAST reading of any book, because the section extractor runs a
final section to end-of-file.

**R98's TITLE contained an em dash**, "Climate-Related Financial Risks — Measurement
Methodologies", while `meta-data.js` already carried the colon form. Titles are
rendered from BOTH files depending on surface, so the two had been disagreeing.
**Add `title:` to the fields checked for dashes; it is the one field a reader sees on
every surface** (chapter header, search results, planner, mind map).

**Phase state at close: 0 em/en-dashes across all 101 readings in `src/data`.** The
count was 7,614 when the workstream was scoped on 2026-07-21. The corpus-wide
`grep -rn '—\|–' src/data` returning nothing is now a standing invariant, so any
future content edit that reintroduces one is a regression, not a leftover.

**What this phase learned that the NEXT one should not relearn.** The five-item closed
mandate held: almost every reading needed only the dash purge, the exam-voice cleanup
and a def trim. The genuine content defects were rarer and of exactly one shape, found
in R35, R74, R76, R82, R86 and R88: **the reading covers a category thoroughly and
silently drops one named member of it.** Opus-B should look there first rather than
re-reading prose that is already fine.

### POST-PHASE REPAIR (2026-07-26): the gate itself was broken, and what it hid

**Waves 15 to 20 ran their validator check as `node scripts/validate-reading.mjs ... | tail -1`.
The validator prints FAIL lines BEFORE warn lines, so any reading with a trailing
`warn` reported as clean.** Twelve readings were marked `done` and `pass` while
carrying real validator failures. A full sweep after the phase closed found 89 of
them. **Never pipe the validator through `tail`. Grep it: `... 2>&1 | grep '^FAIL'`,
and treat any output as a gate failure.** This is the single most expensive process
mistake of the run, because it defeated the one check that was supposed to be
mechanical and certain.

What the sweep found, all of it PRE-EXISTING content debt rather than damage from the
dash pass (verified against commit 21c338e):

- **22 MODULE QUIZ source leaks** across r98, r99, r100, r101, each citing a module
  quiz number AND its answer letter ("MODULE QUIZ 102.2 Q1's correct answer is A").
  These violate two rules at once: no meta-references to the source, and never name
  an option letter, since `Quiz.jsx` shuffles. Rewritten to state the fact plainly and
  keep the trap ("The three properties are security, decentralization and scalability,
  and no others. Expect plausible substitutes offered in their place.").
- **14 prose fields stored as plain strings with no HTML** (r98, r99, r100, r101's
  `teaches`/`why`/`intuition`/`summary`), which render as one undifferentiated wall.
  Wrapped into `<p>` paragraphs.
- **19 null/empty concept keys**, which render as blank labelled sections.
- **18 over-long `def`s**, several over 300 words, all of them enumerations the
  breakdown already carried.
- Two malformed cross-references and one option-letter quiz `why`.

**Book 5's last four readings (r98 to r101) carried almost all of this.** They read
as the least-finished files in the corpus, which is worth knowing for Opus-B: they
were likely generated late in an earlier enrichment run and never reviewed. Start
there.

**A corollary worth keeping: the full-corpus sweep is cheap and should end every
phase.** It takes about a minute and it is the only thing that catches a per-wave
gate that was subtly wrong. `for f in src/data/book*/r*.js; do ... grep '^FAIL'; done`.

## PHASE 4 (content-opus-improvement), opened 2026-07-26

### The exam-voice sweep: what a truncated grep had been hiding

Phase 3 recorded a corpus-wide sweep of durable rule 9 (the FRM has no matching or
sequencing questions) as complete. It was not. **Eleven instances survived**, in r2,
r22, r40, r44 (x2), r65, r93, r98, r99 (x2) and r100. Two reasons, both worth
learning:

1. **The scans were truncated.** Wave checks piped grep output through `cut -c1-150`,
   and several violations sat past column 150 of a long prose line. r98's `why` said
   "expect matching questions" 380 characters in. **Never truncate a grep you are using
   as a gate. Print the match with `grep -o` and a window around it, not the line
   prefix.**
2. **The pattern was too tight.** `matching question` (space) missed
   `matching-question` (hyphen), and `matching-style` missed `scenario-matching`. Use
   `matching[- ]\w+` and read the hits.

Rewrites keep the teaching and change the format claim: "tested as a matching
exercise" becomes "a stem describes X and asks which of the four it is", which is both
true of the real exam and more useful, because it tells the student what the question
LOOKS like rather than naming a genre.

### GARP-as-examiner: 28 more, and the one that must stay

Rule 1 bans "GARP tests this". A corpus sweep found **28 live instances** in forms the
earlier passes had not matched: "GARP likes to test", "GARP loves testing", "GARP
explicitly flags", "GARP's favorite governance framework", "a GARP practice question".
All rewritten to say what the question does instead of who writes it.

**One GARP mention must survive, and a future sweep must not remove it**:
r32's "Beyond Schweser, and flagged so you do not mistake it for something GARP will
test: ..." is the labelling convention CLAUDE.md section 1 REQUIRES whenever content
goes beyond exam scope. It names GARP deliberately, to mark a boundary for the
student. Grep for `GARP` should therefore return exactly one prose hit plus the
`sources[]` entries.

### The general lesson from both sweeps

**A prior session recording a sweep as "done corpus-wide" is not evidence it is.**
Three times this run, a completed-and-documented sweep turned out to have survivors
(dashes in a generated file, rule 9 in eleven readings, GARP in twenty-eight). Re-run
the grep yourself, with a pattern you widened, before trusting the record. It costs
seconds and it caught real defects every time.

### The ELI5 measurement, and the worklist it produces (2026-07-26)

Durable rule 10 came from the owner calling R35's ELI5 "very mediocre". It was fixed
for R35 and, it turns out, for essentially nothing else. Measuring the whole corpus:

**96 of 101 ELI5s are a single `<p>`.** The five that are not are r17, r18, r35 (the
owner-driven rewrite, 5 paragraphs) r36 (the pilot) and r58.

**But paragraph count is the WRONG measure, and using it alone would have produced a
bad worklist.** R28's ELI5 is single-paragraph and CLAUDE.md names it the best writing
in the app. Rule 10's actual diagnostic is "one paragraph AND one sentence", meaning
the failure is a sentence that never ends, not a block that is not split. Measured
properly, on sentence length:

- Corpus average: **36 words per sentence.**
- The real offenders, at 50 to 76 words per sentence: **r64 (76), r95 (73), r65 (65),
  r87 (64), r74 (56), r46 (53), r90 (52), r80 (51).**

Three were rewritten here as the bar: **r64, r87, r95**, each now 5 to 6 paragraphs at
15 to 17 words per sentence, following the R35 shape (open in the simpler system the
reader already understands, change exactly ONE thing, let the consequences fall out
one per paragraph, close on what the reader has actually bought). r64's boat analogy is
the clearest demonstration of why the shape matters: the original ran the bought-boat
case and the shorted-boat case through one 76-word sentence each, so the punchline
(short leverage is structural, you never chose it) arrived before the reader had
finished assembling the balance sheet.

**Remaining worklist for this phase: r65, r74, r46, r90, r80**, then anything above
roughly 45 words per sentence. The measurement script is three lines of regex over the
`eli5` field; re-derive it rather than eyeballing, because paragraph count will mislead
you.

**And the lesson that keeps repeating: run `ai-tells.mjs` on YOUR OWN prose.** The r87
rewrite introduced a fresh not-x-but-y ("the resource being allocated is not money, it
is RISK") within minutes of the guidelines warning about exactly that.

### The ELI5 pass, completed 2026-07-26

All 14 offenders above ~45 words per sentence are rewritten: **r31, r46, r58, r64,
r65, r74, r77, r80, r87, r88, r90, r93, r95, r100**. Corpus average moved from 36.2 to
31.2 words per sentence, and nothing now sits above 45. Each rewrite runs 5 to 7
paragraphs at 13 to 17 words per sentence.

**The measurement trap, recorded because it nearly produced the wrong worklist twice.**
Paragraph count says 96 of 101 ELI5s are "broken", which is false: R28's is one
paragraph and is the best-written thing in the app. Sentence LENGTH is the signal, and
even that needs care, because a naive slice from `eli5:` to `thinkLike:` over-reads on
any file where `summary` sits between them (r58 measured 51 after being rewritten to
13). Slice to the NEXT key, whatever it is, not to an assumed one.

**What the rewrites actually changed, beyond length.** In every case the original had
compressed a causal chain into one sentence, so the conclusion arrived before the
reader had assembled the premises. Splitting them out is not cosmetic; it is what lets
the reader reach the punchline themselves:

- **r64** ran the bought-boat and shorted-boat balance sheets through a 76-word
  sentence each, so "short leverage is structural, you never chose it" landed before
  the reader had the second balance sheet.
- **r31** buried the direction of counterparty risk mid-sentence. The rewrite gives it
  its own paragraph: you do not fear the bet going against you, you fear it going in
  your favour and the other side not paying. That is durable style rule 3, which this
  reading was the original violator of.
- **r93** asserted that Credit Suisse investors "thought of themselves as senior". The
  rewrite gives the surprise a paragraph of its own and adds the fact that made it
  bite: the AT1 bonds went to zero while shareholders still received something.
- **r100** now runs as a chain (nobody trusts the shopkeeper, so copy the notebook, so
  who arbitrates, so pay a crew, so a backlog forms, so a rival notebook appears),
  which is the same shape R28 uses and the reason the fragmentation punchline lands.

**Do not rewrite an ELI5 that is already short-sentenced.** Nine of the readings I
checked on the way to these fourteen were fine, and per protocol section 3 that is the
expected outcome. The measurement exists so the pass touches only what is broken.

### The thinkLike / intuition pass (opened 2026-07-26, IN PROGRESS)

Same measurement applied to the next two prose fields. Both are worse than `eli5` was:

| field | corpus avg w/s | above 45 (at open) |
|-------|----------------|--------------------|
| `eli5` (now done) | 31.2 | 0 |
| `thinkLike` | 41.7 | 28 |
| `intuition` | 34.1 | 13 |

**Six rewritten so far, the extremes**: r100 `intuition` (151 words per sentence, a
single sentence carrying five ideas), r86 `thinkLike` (112), r69 `thinkLike` (98),
r70 (82), r20 (76), r32 (71). Corpus averages moved to 38.3 and 32.8.

**REMAINING WORKLIST, worst first.** `thinkLike`: r65 (70), r33 (63), r25 (60), r60
(60), r62 (59), r64 (58), r78 (58), r74 (55), r15 (54), r21 (54), r22 (54), r40 (53),
r26 (52), r27 (52), then the rest above 45. `intuition`: r52 (72), r50 (62), r47 (57),
r101 (57), r24 (55), r89 (51), r86 (50), r19 (49), r23 (49), r31 (47), r92 (46), r96
(46). Twenty-three and twelve respectively.

**What these rewrites are actually for, so the next session does not treat it as a
word-count exercise.** `thinkLike` fails in a specific way: it opens with a genuinely
good reframing ("she does not ask X, she asks Y"), then packs the entire consequence
chain plus all three exam shapes into one or two enormous sentences. The reframing is
the valuable part and it gets buried by what follows it. Splitting gives the reframing
its own paragraph and lets each consequence land, and it usually surfaces a point the
original had subordinated into a clause. In r20, the fact that adding loans stops
helping once you reach the systematic residual was inside a parenthetical; it is now
its own sentence, because it is the actual reason capital allocation exists.

Re-derive the measurement before continuing (it is a regex over the field, sliced to
the NEXT key rather than an assumed one) rather than trusting this table, which goes
stale as soon as the next reading is rewritten.

### The measurement is now a script, and the old table was wrong (wave 1, 2026-07-26)

**`node scripts/prose-density.mjs <field> [floor] [rn...]`** replaces the hand-rolled
regex. It IMPORTS each reading module and reads the field off the default export, which
removes the slice-to-the-next-key failure mode entirely rather than working around it.

Re-deriving with it immediately showed the stored worklist above was **materially
wrong**, and not because of intervening rewrites. Six readings the table lists as
offenders are not: `thinkLike` r33, r64, r15, r21, r22, r26 all measure in the 30s.
The old regex was over-reading, almost certainly by swallowing a neighbouring field.
Two readings the table omits, `thinkLike` r61 (51.8) and r77 (50.5), are genuine. Corpus
averages on the honest measurement at wave-1 open: `thinkLike` 35.1, `intuition` 31.3,
with 12 and 10 readings above 45 rather than 23 and 12.

**The real worklist, worst first, measured wave 1.** `thinkLike`: r65 68.7, r25 59.0,
r60 59.0, r62 58.3, r78 57.0, r74 54.8, r21 53.4, r40 52.0, r61 51.8, r27 51.8, r77
50.5, r8 47.8. `intuition`: r52 71.0, r50 61.0, r47 56.0, r101 55.5, r24 54.4, r86 49.0,
r19 48.5, r23 48.2, r92 46.1, r31 46.0. Wave 1 cleared the top five across both fields.

### Wave 1: r52, r65, r50, r25, r60 (2026-07-26)

All five landed between 13.7 and 19.9 w/s. What the splits surfaced, which is the part
worth keeping:

- **r52 `intuition`** had the best idea in the wave (a fine equal to the gain makes
  violating a free option) compressed into a clause, with the expected-value inequality
  arriving before the reader had the option framing. The rewrite runs the coin metaphor
  to its end, states the inequality alone, then plugs in a sub-100% catch probability so
  the reader derives "the fine must be a MULTIPLE of the gain" instead of being told it.
- **r65 `thinkLike`** was a five-stage pipeline written as one arrow chain with nested
  parentheses (`→` three levels deep). Each stage is now its own paragraph. **Arrow
  chains in prose are a density tell in their own right**: they let an author append
  unbounded material to one sentence without it looking like a run-on.
- **r50 `intuition`** already had two paragraphs and still measured 61, which is the
  reminder that paragraph count is not the signal. Its three-link chain (before / at /
  after signing) is now three paragraphs, and the miss-a-link consequences read as three
  separate sentences, which is where they belong.
- **r25 `thinkLike`** and **r60 `thinkLike`** both carried the "three exam shapes" pileup
  the section above describes. Splitting them also fixed two comma splices in r25 and one
  in r60, plus a meta-reference in each: r60 said the buffer distinction "is explicitly
  flagged as a favorite trap" (flagged by whom?) and that "the source itself says not to
  memorize every haircut table". Both now state the fact directly. **A density rewrite is
  the natural moment to catch these, because you are re-reading every clause anyway.**
- r60's "Basel 2.5's stressed VaR/IRC/CR charge" was an unexpanded abbreviation pile.
  Checked against the reading's own prose and written out as stressed VaR, incremental
  risk charge and comprehensive risk charge.

`ai-tells.mjs` on all five after rewriting: 0 tells. Run it on your own prose every wave;
this is the third time the guidelines have said so and it has paid off every time.
