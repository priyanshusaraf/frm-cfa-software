# GOAL.md, the north star and how we build toward it

Written 2026-07-24. This is the standing statement of what we are building, why, and the
execution model every session follows. Read it alongside `CLAUDE.md` (the binding style guide)
and `PROGRESS.md` (where work stands). The phase-by-phase sequencing lives in
`react-site/docs/superpowers/specs/2026-07-24-react-site-roadmap.md`.

## The product

An interactive learning platform that teaches a professional exam better than rereading the
official books, because it builds intuition, prevents specific confusions, and converts
knowledge into exam-ready recall. Today it covers the FRM Part II curriculum (5 books, 101
readings). That is the beachhead, not the destination.

## The north star

Extend this from one exam into a platform that covers **all levels of CFA and FRM**. FRM Part II
is where we prove the model and, more importantly, where we learn to do the hard parts
repeatably: graphics and diagram creation, source-resource accumulation, content extraction and
tone, and the interactive teaching surfaces. Every level we add after this must be cheaper and
smoother than this one, not a fresh slog through the same bottlenecks.

The mechanism that makes expansion cheap is a **living `content-guidelines.md`** (see below):
we write down every mistake we made and how we fixed it, and every method that demonstrably
works for learners, so future models never rediscover the same lessons. Treat the FRM Part II
build as also producing a reusable playbook, not just a product.

## How we build: the execution model

**Subagent-driven, token-optimized, quality-gated.**

- **Concurrency cap: at most 5 subagents at once, always.** This is a hard token-control rule,
  never exceeded, in every phase.
- **Feature and infra phases run on Sonnet 5 workers.** One issue per subagent, taken one at a
  time, each a self-contained task with its own test/verify cycle. Opus reviews between tasks
  (two-stage review) before a task is accepted; failed review routes back to a fresh Sonnet
  worker, then re-review.
- **The final content-polish phase removes Sonnet entirely and runs on Opus 4.8 only**, one
  reading at a time, for professional results. Content is the sole retention driver, so it gets
  the strongest model and the most care; token cost is accepted there because quality is the
  product.
- **Orchestrator owns integration.** Subagents touch only their assigned files, never run builds,
  and never run `git stash`/`reset` or any repo-wide git state change (they share one working
  tree). The orchestrator builds, import-sweeps, render-checks, and commits after each wave.
- **Flag, do not fix, out of band.** Any phase before the final polish that notices improvable
  content appends it to `docs/superpowers/content-flags.md` rather than editing prose in place,
  so the Opus polish phase owns every prose change and nothing is polished twice.

## Sequencing in one line

Build everything first (infra, features, functional net-new prose), flag improvements as we go,
then do the content-quality and human-tone polish once at the very end on Opus. The paid-access
account/licensing layer and the pace dashboard come after the polish, near launch. Full order:
the roadmap spec.

## The standing priorities (in order)

1. **Content quality.** If the content is not excellent, nothing else matters. It is done last,
   comprehensively, on Opus, so it can polish every surface at once.
2. **Learning coherence.** The student must feel one connected story: the planner is a cohesive
   study spine, each block ends in a dynamic review, and concepts link across readings and prior
   course levels.
3. **A credible, calm interface.** No scroll-jank, no jarring redirects, honest empty states.
   Bugs that break the reading flow are fixed promptly, not deferred.
4. **A repeatable process for the next level.** Everything we learn is written into
   `content-guidelines.md` so CFA L1, FRM Part I, and beyond are faster than this was.
