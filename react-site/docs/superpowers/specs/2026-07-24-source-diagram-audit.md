# Source-diagram fidelity audit (Workstream F.1)

Written 2026-07-24. This is the audit called for by
`2026-07-24-react-site-roadmap.md`'s Workstream F, item F.1: catalog every place the Schweser
source material draws or explicitly describes a visual structure (a diagram, a specific table,
a labeled figure) that the react-site app currently either has no widget for, or renders with a
widget that draws something conceptually different from what the source figure shows. This
audit produces the list; it does **not** build anything. No code or data files were touched.

## Method

- Grepped the five full Schweser texts (`Book N (1).md`) and the four condensed companions
  (`FRM2_*_CompleteBookN.md`) for visual-describing language: `bow-tie`/`bowtie`/`bow tie`,
  `concentric`, `three lines of defense`, `Tier 1`/`Tier 2`, `nested`, `layers of`, and the
  literal `**Figure N.N:**` caption pattern the Schweser books use for every image (all such
  images are physically `*[image omitted]*` in the markdown source, so a `Figure` caption is a
  reliable proxy for "the source drew something here").
- Read only the surrounding paragraphs (never whole chapters) around each hit.
- Cross-referenced every finding against `react-site/src/lib/meta-data.js` (reading titles,
  tags, session groupings) to assign a reading number, and against the actual
  `react-site/src/data/bookN/rNN.js` files and `react-site/src/widgets/*.js` registry to check
  **whether a widget already exists** for that reading and, if so, what it actually draws (so
  this audit doesn't re-flag something already fixed).
- **Numbering caveat:** the Schweser source's own internal reading/LO numbers do not always
  match the app's 1-101 GARP-aligned numbering (e.g. source "Figure 98.1"/"LO 98.b" content
  matches app Reading 96 by topic, not number; source "Reading 63" content on SMA operational
  capital matches app Reading 62). Every mapping below was made by **topic/title match**, not
  by assuming the source's printed figure number equals the app's reading number. Mappings are
  marked "uncertain" only where the topic match itself was ambiguous, not for this numbering
  offset (which is simply how the source is structured).
- This audit does not enumerate all ~900 `Figure N.N` captions across the five books (most are
  plain empirical-data charts, e.g. a bar chart of historical default rates, that are lower
  value to rebuild as bespoke widgets). It prioritizes figures that are genuinely **structural
  diagrams** (a process, a nested/layered structure, a flow of cash or risk between named
  parties) or **specific reusable tables** (matrices, factor tables, tier tables) that recur or
  are named directly in the roadmap, per the class definitions given in the task.

## What's already built (so findings below don't re-flag it)

A non-trivial visual-widget library already exists in `src/widgets/core.js` / `book3.js` and is
wired into readings. Confirmed already served, real widgets, not prose:

| Reading | Widget | Draws |
|---|---|---|
| R4 | `traffic` | Basel penalty zones (Figure 4.5: green/yellow/red exception-count zones) |
| R11, R13 | `tree` | Binomial / interest-rate tree (Figures 11.3-11.4, 13.1-13.9) |
| R15 | `smile` | Volatility smile curve (Figures 15.1-15.3) |
| R16 | `frtb` | VaR(99%) vs ES(97.5%) + liquidity-horizon scaling |
| R25 | `merton` | Merton structural default model |
| R26 | `creditvar` | Loss-distribution curve (EL/UL split) — **NOT** the rating transition matrix, Figure 26.1, see Tables section below |
| R28 | `tranche` | Loss-distribution-vs-tranche-band curve — **NOT** the literal cash-waterfall table, Figures 28.1-28.2, see Tables/Waterfall sections |
| R36, R37 | `exposure` | EE / PFE / EPE exposure-profile curves |
| R45 | `reportingcake` | Figure 45.1 "reporting cake" |
| R60, R61 | `capitalstack` | Tier 1/2 + buffers as a stacked bar (serves the "capital tiers" ask, though as a stack not literal concentric rings) |
| R69 | `lcr` | LCR ratio |
| R75 | `ladder` | Funding gap ladder |
| R79 | `gap` | ALM repricing/duration gap |

The findings below are for what's left: readings whose source-described visual has **no**
widget at all, or whose existing widget draws a different structure than the one the source
figure shows.

---

## 1. Bow-tie diagrams

Only one instance found in the full corpus (grepped all five books; `bow-tie`/`bowtie`/`bow tie`
returns zero hits outside Book 3).

| Book | Topic | Reading | Class | Source quote | One-line | Priority |
|---|---|---|---|---|---|---|
| 3 | Root-cause analysis / 5-whys, Module 43.2 | R43 (Risk Measurement and Assessment) | bow-tie | "An application of this approach can be seen in a **bow tie diagram**, like the one in Figure 43.1... The risk event to be analyzed is placed directly in the center of the diagram, with causes and preventive controls dealt with on the left side, while impacts and detective and corrective controls are dealt with on the right side." | Center risk event; left wing = causes + preventive controls; right wing = impacts + detective/corrective controls; used to estimate frequency (left) and severity (right) jointly. | high |

**Confirmed unrendered:** `react-site/src/data/book3/r43.js` sets `visual` to
`data-widget="lossdist"` (a frequency x severity loss-distribution curve, a different widget),
and the bow-tie itself is currently only prose: a `concepts[].def` paragraph and a `recall` Q&A
card spell out the same "causes/preventive on the left, impacts/detective-corrective on the
right, event in the center" structure in words. This is the single cleanest, highest-value case
in the whole audit: the source explicitly names and captions the diagram, the app already
proves it knows the content well enough to write good prose about it, and it just isn't drawn.

## 2. Concentric-circle / nested-layer diagrams

| Book | Topic | Reading | Class | Source quote | One-line | Priority |
|---|---|---|---|---|---|---|
| 3 | ORM framework overview, Module 43.1 | R43 (Risk Measurement and Assessment) | concentric | "The operational risk management (ORM) framework can be thought of in **four concentric circles**: (1) incident/loss database, (2) assessment through RCSAs, (3) monitoring through KRIs, and (4) takeaways from major loss events or high-risk exposures." | Four nested rings, innermost = raw loss data, each successive ring = a broader layer of processing/response built on the one inside it. | high |
| 5 | AI lifecycle stages, NIST framework | R96 (Artificial Intelligence Risk Management Framework) | concentric | "Figure 98.1 displays these categories in the **two inner circles** as well as the corresponding AI lifecycle stages in the **outer circle**... the risk management process begins at the Plan and Design lifecycle stage and proceeds **clockwise around the outer circle**." | A genuine multi-ring wheel: 5 lifecycle categories in two inner rings, lifecycle stages around an outer ring, meant to be read clockwise. | high |
| 3 | Three lines of defense, Module 41.2 | R41 (Risk Governance) | concentric (nested, not literally circular in source) | "Controls and risk management within a bank can be thought of in three interconnected lines" (Line 1 front office -> Line 2 CORF oversight -> Line 3 internal audit -> informally, external audit as a "fourth line"). | Three (or four) nested oversight layers, each layer reviewing the one inside it, escalation runs inward-to-outward. | high |
| 3 | Basel/ORX operational-risk taxonomy, Module 42.4 | R42 (Risk Identification) | concentric/nested (a tree, not circles, but the same "nested layers" family) | "Level 1 provides a broad description of seven events/risks. Level 2 goes into greater specificity than Level 1 and provides 20 specific categories of risk. Level 3 goes even deeper and provides specific examples." (Figures 42.2-42.5) | A 3-level drill-down taxonomy tree (7 Level-1 categories -> ~20 Level-2 subcategories -> Level-3 examples), same shape for both the Basel and ORX taxonomies. | med |
| 3 | Cause/impact/control action loop, Module 42.4 | R42 (Risk Identification) | other (a closed-loop / encircled diagram, adjacent to bow-tie but describes controls acting on causes vs. impacts in a cycle, not two wings) | "Figure 42.6 illustrates the overall relationship, with **the encircled portion** representing the action steps to be taken based on the causes of the risks and controls that are available." | A causes -> controls -> impacts loop diagram ("Actionable Operational Risk Management"), distinct from the bow-tie because it's framed as one circulating action cycle rather than a two-sided timeline. | med |

**Confirmed unrendered:** R41 has no `visual` field at all in `r41.js` (verified directly);
its `intuition` field currently carries the entire three-lines structure as an extended prose
analogy ("factory floor / quality inspector / external auditor"). R42's `visual` field is
literally the empty string `` `` `` (verified). R43's four-concentric-circles framing shares the
same reading as the bow-tie and is likewise all-prose. R96 has not been read in detail for its
current `visual` field in this audit but the NIST lifecycle wheel is not among the widgets
already confirmed built (`capitalstack` is the only "layered" widget in the registry and it's a
bank capital stack, unrelated to AI lifecycle).

## 3. Tables collapsed into paragraphs

| Book | Topic | Reading | Class | Source quote | One-line | Priority |
|---|---|---|---|---|---|---|
| 2 | Rating transition matrices | R26 (Credit Value at Risk) | table/matrix | "Figure 26.1 illustrates an actual one-year transition matrix published by S&P... the highest probabilities are associated with a company maintaining its rating by year-end, as evidenced by **the shaded boxes** in Figure 26.1." | An 8x8+ rating-migration matrix (AAA...D rows/cols) with the diagonal (stay-in-rating) cells shaded/highlighted; the exam explicitly tests reading specific cells (e.g. AA -> A migration probability) and matrix-power extension (3-year = 1-year matrix cubed). | high |
| 2 | CDO tranche cash-flow waterfall | R28 (Structured Credit Risk) | table (a stepped, annotated cash-allocation table, arguably also "waterfall" class, see section 4) | "The cash flows for the waterfall structure are detailed in **Figure 28.1**... Figure 28.2 [shows the same at a 4% default rate]." | A worked numeric table: pool cash inflow -> senior coupon -> junior coupon -> OC test -> equity residual -> trust account, compared side by side at 0% and 4% default rates. | high |
| 3 | Basel III liquidity: NSFR factor tables | R60/R61 (Solvency/Liquidity regulation, Basel III Reforms summary) | table | "See Figure 61.2 for the **available stable funding (ASF)** factors and types of funding available... See Figure 61.3 for the **required stable funding (RSF)** factors." | Two side-by-side factor tables (funding source/asset type -> % ASF or RSF weight) that the LCR/NSFR calculation examples plug numbers from directly. | high |
| 3 | Basel operational-risk capital: BI buckets | R62 (source calls this "Reading 63" internally; content matches app's SA op-risk capital reading) | table | "banks (based on their size for the BI component) are divided into three buckets as shown in **Figure 63.1**." | A 3-row table: BI size bucket -> marginal BIC coefficient, the direct input to the SMA capital formula the reading already teaches numerically. | med |
| 1 | Basel penalty zones | R4 (Backtesting VaR) | table (**already built**, see "already built" section) | n/a | n/a | n/a (served by `traffic` widget) |
| 2 | Joint default outcome tables | R27 (Portfolio Credit Risk) | table | Figures 27.2/27.3, "Event Outcomes for a Two-Credit Portfolio" | A 2x2 joint-default outcome table (both survive / A defaults only / B defaults only / both default) with associated probabilities, the building block for the single-factor portfolio model this reading teaches. | med |
| 3 | Basel II/III RWA and CCF tables | R60 (Solvency, Liquidity, and Other Regulation After the GFC) | table | Figures 60.1 ("Risk Weights for On-Balance Sheet Items"), 60.2 ("Credit Conversion Factors"), 60.5 ("Risk Weights Under Basel II's Standardized Approach") | Category -> risk-weight-percentage lookup tables (cash 0%, sovereign 0-150% by rating, corporate 20-150%, etc.) that RWA-calculation exam questions pull straight from. | med |
| 2 | CAP / accuracy ratio | R23 (Credit Scoring and Retail Credit Risk Management) | curve (an ROC-style plot, not a table, listed here because it's adjacent to the matrix/curve boundary) | "Figure 23.1... Lines plotted on the graph include the perfect model line, random model line, and observed cumulative default percentage line." | Three-line CAP plot (perfect / random / observed) with the AP and AR areas shaded between them, used to compute the accuracy ratio AR/AP. | med |
| 4 | Deposit/liquidity operational reporting tables | R72/R73 (Liquidity Risk Reporting, Contingency Funding Planning) | table | Figures 73.2-73.18: deposit tracker report, liquidity gap report, funding maturity mismatch, concentration report, stress-test report, etc. | A family of ~15 distinct operational liquidity-reporting table templates the source shows as worked examples. | low (many, and mostly one-off report formats rather than a recurring exam structure) |

**Confirmed unrendered:** R26's only widget (`creditvar`) is a continuous loss-distribution
curve, not a discrete matrix, so the rating transition matrix is genuinely un-rendered (checked
directly). R28's only widget (`tranche`) is also a continuous density curve with shaded tranche
bands, not the discrete cash-waterfall table; `r39.js` and `r35.js` (adjacent tranche/waterfall
readings) have no `visual` field at all. R60/R61 have only `capitalstack` (a Tier 1/2/buffer bar
stack), which does not cover the NSFR ASF/RSF factor tables. R62 has `lossdist` only (SMA capital
uses BI/BIC/ILM formulas already taught, but the bucket table is prose).

## 4. Other described visuals (waterfall, decision-tree, timeline, curve, other)

| Book | Topic | Reading | Class | Source quote | One-line | Priority |
|---|---|---|---|---|---|---|
| 2 | Securitization structure | R39 (An Introduction to Securitization) | other (process-flow diagram) | "Figure 39.1 illustrates how the SPV purchases assets from an originator... via issuing notes and selling them to investors." | Originator -> SPV -> tranched notes -> investors, with trustee/servicer/rating-agency roles labeled around the flow. | high |
| 2 | Securitization cash waterfall | R39 (An Introduction to Securitization) | waterfall | "Figure 39.2 illustrates how cash flows are allocated to the different tranches in the cash waterfall process... if a coverage test fails, then the principal of the notes will begin to be paid off starting with the most senior tranche." | Pool cash inflow -> coverage test -> senior/mezz/equity distribution branches, a decision-gated waterfall (distinct from R28's numeric worked table: this one is the generic conditional-branch structure). | high |
| 2 | Master trust SPV structure | R39 (An Introduction to Securitization) | other (structure diagram) | "Figure 39.3 illustrates the securitization process for credit card asset-backed securities (ABSs) using the SPV master trust structure... two distinct SPVs are created." | Originator -> master trust (SPV1) -> grantor trust (SPV2) -> multiple note series sharing one receivables pool and one excess-spread reserve. | med |
| 2 | Bilateral vs. CCP vs. multilateral-netting market structure | R35 (Central Clearing) | other (network/structure diagram) | "Figure 35.1 shows a traditional bilateral counterparty structure... Figure 35.2 shows how a CCP structure changes the traditional risk landscape... Figure 35.4 [shows] the liabilities between parties... total liabilities are 180... [netted through the CCP] to 30." | Three linked diagrams: bilateral web of exposures -> CCP-centered hub-and-spoke -> a worked multilateral-netting arithmetic example (180 gross -> 30 net through novation). | high |
| 2 | CCP loss waterfall | R35 (Central Clearing) | waterfall | "Figure 35.5: CCP Loss Waterfall" (the ordered sequence of loss-absorbing layers a CCP burns through on a member default: defaulter's margin -> defaulter's default-fund contribution -> CCP's own capital -> mutualized default fund -> ...). | An ordered stack of loss-absorption layers consumed in sequence, the CCP analog of the tranche waterfall. | high |
| 2 | CDS / CDO / TRS structures | R30 (Credit Derivatives) | other (party-flow diagram) | "Figure 30.1: Credit Default Swap Structure" / "Figure 30.7: Total Return Swap Structure" / "Figure 30.8: A CDO With N Underlying Securities" | Three related two/three-party payment-flow diagrams (protection buyer <-> seller <-> reference entity; TRS payer <-> receiver <-> underlying bond; pooled securities -> N tranches). | med |
| 2 | Credit scoring/rating development process | R22 (Credit Scoring and Rating) | other (process flow) | "Figure 22.1 provides an overview of the rating development process." | A sequential pipeline: data collection -> preprocessing -> attribute/model selection -> validation -> deployment, each stage elaborated in its own subsection right after. | med |
| 1 | Gaussian copula percentile mapping | R9 (Financial Correlation Modeling: Copulas) | other (mapping diagram, conceptually the single most-confused idea in the correlation material) | "Figure 9.1 illustrates that the variables of two unknown distributions X and Y have unique marginal distributions... mapped to the standard normal distribution on a percentile-to-percentile basis." / Figure 9.3 repeats this for a worked numeric example. | Two side-by-side marginal-distribution shapes, each with percentile arrows converging onto a shared standard-normal distribution in the middle: the picture that makes "copulas preserve marginals while defining correlation" click. | high |
| 4 | Repo trade mechanics | R76 (Repurchase Agreements and Financing) | timeline / process-flow | "Figure 77.1 and Figure 77.2 illustrate an example of a repo trade" (initiation and termination) and "Figure 77.3: Back-to-Back Repo Trades" (unwind with counterparty B, re-enter with counterparty C). | A two-date timeline (initiation -> termination) showing bond/cash flowing in opposite directions at each end, plus a three-party back-to-back variant. | med |
| 5 | Climate-risk transmission channels | R97 (Climate-Related Risk Drivers and Transmission Channels) | other (cause -> channel -> risk-type flow, bow-tie-adjacent) | "Climate risks impact credit, market, liquidity, and operational/reputational risks as shown in Figure 99.1... Two classifications are microeconomic channels... and macroeconomic channels." | Climate driver (physical/transition) -> transmission channel (micro/macro) -> traditional risk type (credit/market/liquidity/op), a fan-out diagram with a similar cause-to-consequence shape as the op-risk bow-tie. | med |
| 1 | Term-structure / short-rate decision trees | R12, R14 (Evolution of Short Rates; Term Structure Models: Volatility) | decision-tree (**partially served**: R11/R13 already have the `tree` widget for the same family) | Figures 12.1-12.7, 14.1-14.4: risk-neutral decision trees for short rates and zero-coupon bond values, varying by drift/volatility assumption. | Same binomial-tree shape as R11/R13's already-built `tree` widget, just parameterized differently (mean reversion, lognormal vol); likely a data-only extension of the existing widget rather than a new primitive. | low (primitive exists, just not wired to these two readings) |

---

## Recommended widget primitives

Five distinct reusable widgets would cover essentially every high/medium finding above. Named
per the `src/widgets/*` convention (imperative draw function, CSS-variable colors, `data-*`
JSON params):

1. **`bowtie`** — center risk event, causes + preventive controls fanned left, impacts +
   detective/corrective controls fanned right. Serves: R43 (bow-tie, the only instance) and,
   with a relabeled fan (driver -> channel -> risk type instead of cause -> control -> impact),
   R97's climate transmission-channel diagram and R42's Figure 42.6 cause/control/impact loop.
   This is the **Phase 0 pilot widget** (see below).

2. **`nested-rings`** (concentric/layer widget) — N labeled concentric rings or nested boxes,
   innermost to outermost, optionally with an angular "stage" subdivision on the outer ring for
   lifecycle-style diagrams. Serves: R43's four-concentric-circles ORM framework, R96's NIST
   AI-lifecycle wheel (2 inner rings + outer stage ring), R41's three(-plus-one) lines of
   defense (rendered as nested layers rather than true circles), and R42's Basel/ORX taxonomy
   drill-down (Level 1 -> 2 -> 3), which could reuse this as a radial tree variant.

3. **`annotated-table`** (data-driven table/matrix widget, the §9-D "matrix/correlation table"
   generalized) — renders a labeled row/column grid from a `data-*` JSON payload, with optional
   cell shading/highlighting (for the transition-matrix diagonal) and optional row/column
   totals. Serves: R26's rating transition matrix, R60/R61's RWA and NSFR ASF/RSF factor
   tables, R62's BI bucket table, R27's joint-default outcome table. This is also the primitive
   workstream E's financial-statement deep-dive explicitly depends on (per the roadmap), so
   building it here unblocks two workstreams at once.

4. **`waterfall-flow`** (cash/loss-waterfall widget) — an ordered vertical or left-to-right
   sequence of labeled stages, each stage optionally gated by a pass/fail test that branches
   the flow (for coverage-test logic), with per-stage dollar or percentage annotations. Serves:
   R28's numeric tranche cash-waterfall table (Figures 28.1-28.2), R39's generic securitization
   cash-waterfall (Figure 39.2), and R35's CCP loss waterfall (Figure 35.5). Distinct from the
   already-built `tranche` widget (a continuous loss-density curve): this one shows discrete,
   named cash amounts moving stage to stage.

5. **`party-flow`** (structure/network diagram widget) — boxes for named parties/entities with
   directional arrows for payments, claims, or exposures between them; supports a "before/after"
   two-panel mode (e.g. bilateral web -> CCP hub-and-spoke) and a worked-numbers overlay on the
   arrows (for the multilateral-netting 180 -> 30 example). Serves: R35's bilateral/CCP/netting
   diagrams, R39's SPV/master-trust structure, R30's CDS/TRS/CDO structures, R22's credit-scoring
   pipeline, R9's Gaussian-copula percentile-mapping diagram (as a converging-arrows variant),
   and R76's repo initiation/termination/back-to-back timeline (as a temporal variant with two
   or three party columns).

Lower priority / defer: extending the existing `tree` widget's data params to cover R12/R14
(no new primitive needed) and the ~15 one-off Book 4 liquidity-reporting table formats (R72/73),
which are numerous but low-recurrence and better served ad hoc from `annotated-table` once it
exists, not by a bespoke primitive.

## Suggested Phase 0 pilot

**Reading 43 (Book 3, "Risk Measurement and Assessment"), the bow-tie diagram.**

Reasons this is the single best pilot, ahead of every other candidate:

- It is the roadmap's own named example (Workstream F explicitly calls out "bow-tie diagrams
  (op-risk cause -> event -> consequence, Book 3)" as a known class), so building it first
  directly satisfies the workstream's own bar-setting intent.
- It is the cleanest, least ambiguous case in the entire audit: the source names the diagram,
  captions it as a numbered figure, and gives an unusually precise structural description in
  one sentence ("causes and preventive controls dealt with on the left side, while impacts and
  detective and corrective controls are dealt with on the right side") -- there is no
  interpretive gap between text and intended picture, unlike, say, the securitization structure
  diagrams which require synthesizing several paragraphs.
- The app's own content for R43 already proves out the exact structure in prose (a `concepts[]`
  definition and a `recall` card both walk through center-event / left-wing-causes /
  right-wing-impacts), so building the widget is a pure rendering upgrade with zero new content
  research needed, and an easy visual-vs-prose regression check (the widget's labels should
  match the existing prose almost verbatim).
- It is high-exam-relevance (R43 carries a 5-star `highYield` weight per meta.js) and the
  bow-tie is explicitly LO-tested material (LO 43.d/43.e), not a decorative aside.
- Building `bowtie` first also cheaply proves out the `nested-rings` widget's likely sibling
  ask, since R43 also contains the four-concentric-circles ORM framework in the very same
  module (43.1) -- a natural two-widget pilot on one reading if the owner wants to stretch
  Phase 0 slightly, but the bow-tie alone is sufficient to clear the bar.

**Source citation:** `Book 3 (1).md`, lines 2013-2033 (Swiss Cheese Model through the bow-tie
paragraph and Figure 43.1 caption), Module 43.2 "Root-Cause Analysis," LO 43.d/43.e.
Current app file: `react-site/src/data/book3/r43.js` (currently `visual:
<div class="widget" data-widget="lossdist"></div>`, no bow-tie widget).
