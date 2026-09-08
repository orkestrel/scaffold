# Audit verdict — queue (P.1 and P.2)

Workflow `wf_ca997b77-72d` (the queue slice, resumed after the second session limit), 2026-09-08: the subjective lane (`reviewer`, Opus 5) `FAIL 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 12`, the checker (Sonnet) `FAIL 12`; lanes retained as `d7n-queue-audit-{subjective,objective,checker-queue}.md`. Every structural claim PASS on every lane; claim 11 rests on the writer's readings; claim 12 fails on the reports' counts (annotated).

## Findings carried into the fix round (`d7n-queue-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| Q1 | The `### Guards` table has no `Shape` column and no guard sentence (Ruling 20) | subjective F1, objective F1 |
| Q2 | `QueueErrorContext`'s displaced clause has no home in the block | subjective F2 (Ruling 7) |
| Q3 | One convention stated twice at `guides/queue.md:131` and `:135` | subjective F3 |
| Q4 | The README's onboarding echoes the tagline's verb | subjective F4 |
| Q5 | The drop-in's header lines 1 to 3 (Ruling 21) | subjective F5, objective F2 |
| Q6 | Fences directly under headings and tables (Ruling 21) | subjective F5, objective F3 |
| Q7 | `BROAD` in a code comment at `src/core/factories.ts:96` | objective F4 |
| Q8 | The reports' counts (annotated) | every lane's 12 |

## Rulings and carries

- A brief's "delete or recast" for a banned word (checker) is the table's `Delete` row: a recast that drops the word deletes it. No reconciliation owed.
- Gate evidence for every unit rests on the writer's report until the closure's `verifier` runs (objective F5); the closure runs it per package.

The fix round dispatches to the Opus `implementer` and carries the closing sweep's items; the closure re-installs the final guide tarball and runs `checker` over the fix and `verifier` over the whole chain.
