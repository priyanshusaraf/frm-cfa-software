# Hard-concept sequencing, and CVA as the pilot

**Status:** SPEC ONLY, not built. Owner-requested 2026-07-26, mid-session, during Phase 4.
**Owner reference material:** `~/Downloads/FRM2_R37_CVA_and_MPoR.md` (a compiled CVA study
note the owner supplied as a structural model; see "How to use the reference file" below).

---

## 1. The problem the owner reported

Verbatim, because the diagnosis is the valuable part:

> "cva is one such concept which is notoriously difficult, even i'm facing issues with it,
> and even right now with the updated material that we have upto that point i'm unable to
> properly grasp what this model is doing, **that's because i wasn't taught in a sequence
> that fully focuses on cva explanation.**"

Note what this is NOT. It is not a coverage gap: the Track B audit of r37 (wave 5) found
its CVA material essentially complete, and r36, r25, r29, r32, r35 and r38 all carry their
own pieces correctly. It is not a density problem either: r37 passed the Track A pass.

**The failure is SEQUENCING.** CVA is not a reading, it is a thread that runs through seven
readings, and the app presents it in curriculum order, which is not learning order. A
student meets:

- the default-probability input (hazard rates) in **R25**, twelve readings before it is used;
- a compressed trailer of CVA/DVA and wrong-way risk in **R29**, before the formula exists;
- the conceptual placement (CVA as a price vs. a limit, the xVA family) in **R32**;
- the entire input factory (EE, EPE, ENE, PFE, netting factor, MPoR) in **R36**;
- the formula and its six extensions in **R37**;
- the survival-probability term R37 deliberately omits, in **R38**;
- the CCP version of MPoR in **R35**;
- and the Basel III CVA capital framework, a separate mental bucket entirely, in **R62**.

Each reading is locally correct and locally complete. Nowhere does anything assemble them
in the order a person would need to actually understand the model. **That assembly is the
missing artifact, and it is exactly what a Core Concept page is for** (react-site/CLAUDE.md
section 6: "one authoritative, deeper-than-the-book explanation instead of getting thinly
re-explained every time it comes up").

## 2. The general mechanism this establishes

Generalize past CVA, because CVA is not the only concept with this shape.

**A concept qualifies for a sequenced Core Concept page when all three hold:**

1. **It spans 3 or more readings**, with the inputs taught separately from the model.
2. **Curriculum order is not learning order** for it: something it depends on arrives
   long before or after the thing that needs it.
3. **A student who has read every constituent reading still cannot say what the model
   does.** This is the diagnostic that matters, and it is the one the owner applied.

Criterion 3 distinguishes this from the existing auto-detected core concepts
(`scripts/build-core-concepts.mjs`, any name appearing in `formulas[]`/`concepts[]` across
2+ readings). Auto-detection answers "is this reused?" It cannot answer "is this reused in
a broken order?" **So the sequenced pages are AUTHORED, in `src/data/authoredConcepts.js`,
with `layer: "core"`** - the same mechanism the securitization flagship uses, no new page
type. Do not extend the auto-detector for this; it would produce hundreds of pages and none
of them sequenced.

**Candidate list, in the owner's priority order until told otherwise.** CVA first, as the
reported case. The others are recorded here so the next session does not re-derive them;
each still needs the criterion-3 test applied before it is built:

| Concept | Spans | Why the order breaks |
|---|---|---|
| **CVA** (pilot) | R25, R29, R32, R35, R36, R37, R38, R62 | Inputs 12 readings upstream; trailer before the formula; the omitted survival term downstream |
| Exposure metrics (EE / EPE / ENE / PFE / effective EE) | R36, R37, R38, R59 | Six look-alike abbreviations introduced together in R36's `teaches`, then used across three readings. Already the subject of an owner complaint (CLAUDE.md section 1, the EPE-vs-PFE incident) |
| Vasicek / WCDR / the one-factor Gaussian copula | R21, R26, R27, R29, R59, R62 | Defined in R21, then referenced by name in five later readings. Already has a Phase-2 pilot page that predates the section 1a doctrine and needs a pass against it |
| Basel capital stack | R59, R60, R61, R62 | Four readings that each assume the previous one's vocabulary; the student meets Basel I, II, 2.5, III and the output floor as separate facts rather than one evolving object |
| Liquidity: transactions vs funding vs the spiral | R63, R64, R68, R71, R73 | The two kinds of liquidity risk feed each other, and the feedback loop is the examinable object, but it is split across five readings |

## 3. The CVA page: structure

Follow the **problem-first doctrine (react-site/CLAUDE.md section 1a) literally**, because
this is precisely the case it was written for: do not open with a definition, build the
idea, and name it last. The owner's reference note is organized as a study aid (formula
first, then extensions), which is the right REFERENCE order and the wrong TEACHING order.
Use its content and its completeness checklist; do not copy its sequence.

Proposed `sections[]`, each an entry in the `authoredConcepts` shape:

1. **"You have made a bet, and the other side might not be there to pay."**
   Open on a person and an incentive, not a formula. A swap between two banks. The value
   moves daily and can flip sign. Establish the ONE fact everything else hangs off: the
   fair price of the bet assumes the other side pays.
2. **"Why the loan answer does not work here."**
   The obvious first move (section 1a stage 2): with a loan you know what you are owed, so
   PD x LGD x amount, done. Show concretely why a derivative breaks that: the amount owed
   is not a number, it is a distribution at every future date, and it can be negative.
   The student should want the summation before it appears.
3. **"Only the part where they owe YOU can hurt you."**
   The asymmetry, alone, before any notation. If you are the one underwater, their default
   costs you nothing: you pay their estate as normal. This is why the input is expected
   exposure and not expected mark-to-market, and it is the single most-tested conceptual
   point in the chain. **This is where the R36 material gets pulled forward** rather than
   left twelve readings upstream.
4. **"Four questions about one future moment."**
   Now the base formula, derived as four questions rather than presented as an equation:
   how much am I owed if they default now (EE), how likely is default in this window (q),
   how much do I lose if it happens (1 - RR), what is that worth today (DF). Then the
   summation, then the sign convention. Piecewise `formulas[].terms[]` per symbol, per
   section 6's "every symbol needs its own explained row".
5. **"The same formula wearing six costumes."**
   The extensions, each framed as "which ONE of the four inputs does this move?" - which is
   the organizing insight of the whole reading and is currently nowhere in the app:
   - running spread (collapses the sum; the spread already IS PD x LGD per year, which is
     why `EPE x spread` is not a different formula);
   - spread level, curve shape and recovery (moves q and LGD; carries the two genuinely
     counterintuitive results, that an upward-sloping curve LOWERS CVA and a higher
     recovery rate lowers it too);
   - netting and collateral (moves EE only, and NEITHER touches q; this one fact kills two
     or three answer choices on sight);
   - incremental vs marginal (substitutes a different EE; ex-ante pricing vs ex-post
     attribution);
   - bilateral CVA and DVA (adds the mirror term; the only way the number can be positive);
   - wrong-way risk (breaks the independence the base formula assumed between EE and q -
     which is WHY it lives in this reading and not somewhere else).
6. **"The window where collateral has not arrived yet."**
   MPoR, sequenced AFTER collateral rather than before it, because it only means anything
   once the student knows collateral reduces EE. Five steps, the sqrt-t scaling, the
   40-day-is-about-half anchor, and the CCP's three-period version from R35.
7. **"What R37 leaves out on purpose."**
   The survival probability term, and that R38 adds it under stress testing. Naming the
   deliberate omission is what stops a student thinking they have misunderstood.
8. **"Directions, not formulas."**
   The consolidated direction table LAST, as revision, per the section-order rule
   (explanation before consolidation). Shrinks exposure so shrinks CVA; creates an
   uncollateralised gap so grows CVA; raises default risk so grows CVA; and the one that
   flips intuition (higher recovery, lower CVA).
9. **Traps, and the three questions to ask any CVA problem.**
   Which of the four inputs is moving? Unilateral or bilateral? Is independence still
   assumed? That third question is the WWR detector and is worth more than any single fact.

**Explicitly OUT of this page:** the Basel III CVA risk framework (R62). It is regulatory
capital, a different question with a different answer, and folding it in is what makes CVA
feel unbounded. Cross-link it and say plainly that it is a separate bucket.

## 4. How to use the reference file

`~/Downloads/FRM2_R37_CVA_and_MPoR.md` is well made and its LO mapping looks right, but it
is **outside the repository and outside the source-of-truth rule**. Treat it as a
completeness checklist and a structural model, never as a citation:

- **Every fact that lands on the page must be verified against `Book 2 (1).md` at the repo
  root** (and Book 3 for anything R62-adjacent). The content rule in the root CLAUDE.md is
  not relaxed for a supplied file.
- Three of its figures are worth verifying specifically because they are the kind that
  propagate: the 40-day MPoR / half-of-uncollateralised anchor, the netting-factor
  reference values (71% at rho=0 n=2, 50% at n=4), and the settled-vs-actual recovery
  worked case.
- Its "known traps" table and its self-test are the best parts to mine, because they encode
  the failure modes rather than the facts.
- Its numbered-costume framing ("one formula, six costumes") is a genuinely good teaching
  device and should survive into the page, restated in prose without the numerals per the
  Phase-4 enumerated-prose lesson.

## 5. Build steps, when this is scheduled

1. Read the R37 chapter in `Book 2 (1).md` end to end, plus the R36 exposure section and
   R25's hazard-rate section. Do not start from the reference file.
2. Author the entry in `src/data/authoredConcepts.js`: `slug: "cva"`, `layer: "core"`,
   `homeReading: 37`, `refs: [25, 29, 32, 35, 36, 37, 38]`, `linkPhrases` covering
   "CVA", "credit value adjustment", "credit valuation adjustment" (the documented synonym),
   "DVA", "BCVA", "bilateral CVA". Check `linkPhrases` against `conceptLinks.js`'s guards so
   the inline linker does not wrap the term inside r37 itself.
3. Piecewise `formulas[].terms[]` for the base CVA formula and for BCVA as a spread.
4. Re-run `node scripts/build-core-concepts.mjs` so `conceptLinkTable.js` picks the page up,
   then `node scripts/preview-concept-links.mjs` over the seven contributing readings and
   judge every match.
5. Trim, do not duplicate: where a contributing reading now explains something the page
   explains better, the reading should keep its own specific material and link out. That is
   the section-1a rule ("the reading is where the curriculum-specific material lives").
   **This is a real risk on r37 specifically**, whose concepts are already thorough; the
   page must not become a second copy of them.
6. Gates: validator on every touched data file, `ai-tells.mjs`, `prose-density.mjs` on any
   prose field the work touches, `npm test`, `npm run build`, and a render-check of
   `#/concept/cva` plus the seven readings that link to it, asserting real content and not
   just the absence of markers.

## 6. Why this is worth building

The owner's own words about the product, recorded in CLAUDE.md section 1: "the entire point
of the software is to help out where other people go fast." Schweser goes fast on CVA by
splitting it across seven readings and never assembling it. **This page is the assembly.**
It is also the strongest available test of whether the Core Concept architecture earns its
place: if a sequenced page can fix a concept the owner could not grasp from the readings
themselves, the remaining candidates in section 2 are worth the same treatment.
