# Audit verdict: unit conform-queue

Subject: the uncommitted unit in `/home/user/fleet/queue` (brief `briefs/conform-queue-brief.md`, audit brief `briefs/conform-queue-audit-brief.md`, fix brief `briefs/conform-queue-fix1-brief.md`, report `reports/conform-queue-report.md`, evidence `units/conform-queue.diff.txt` and `units/conform-queue.status.txt`), implemented by a direct Opus `implementer` (`units/l3/queue-implement-direct.md`) dispatched fresh after the API spend-limit stop on the closure staged 18:37 UTC, from the Luna-reconciled rulings (`units/l3/queue-reconcile-luna.md`: queue-subj-13 breaking, `QueueExecution` → `QueueContext`, with worker, workflow, and agent as consumers), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/queue-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/queue-r1-checker-luna.result.md`) | PASS; F-1 to F-3 outside the claims |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/queue-objective-r1.md`) | PASS; F-1 to F-5, R-1, R-2 |

Subjective lane: not run in the audit round, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checker ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/queue-fix1-result.md`), report-only: the queue-obj-4 disposition reads `noop by composition`, the malformed sweep cell carries the pattern that ran, § Shared-file patches names `worker/guides/worker.md`'s sites, and the out-of-scope findings cite their lines. No round-2 lane ran: the fix round changed the report alone and no file in the tree, and both round-1 lanes passed every claim.

## Rulings

- The checker's F-1 to F-3 and the objective lane's F-4 (`src/core/types.ts:106` still calls the renamed type an execution handle) are the queue-prose follow-on (`briefs/followon/queue-prose-brief.md`), dispatched after landing.
- F-3: worker's guide sites ride worker's L4 unit brief from the amended § Shared-file patches.
- R-1: the vendored `guides/queue.md` mirrors in worker, workflow, agent, and probe refresh at the wave, never rewritten.
- R-2: whether the consumers' prose and local bindings follow `context` is ruled per consumer at its L4 or L5 reconcile.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/queue`, recorded in `units/land-conform.log` and `units/conform-queue.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker; round 1 objective; record findings closed by fix round 1), the deciding run at landing read every gate exit 0 (landed as queue `7c560b8`).
