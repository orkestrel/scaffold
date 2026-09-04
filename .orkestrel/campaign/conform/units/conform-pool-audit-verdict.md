# Audit verdict: unit conform-pool

Subject: the uncommitted unit in `/home/user/fleet/pool` (brief `briefs/conform-pool-brief.md`, audit brief `briefs/conform-pool-audit-brief.md`, fix brief `briefs/conform-pool-fix1-brief.md`, report `reports/conform-pool-report.md`, evidence `units/conform-pool.diff.txt` and `units/conform-pool.status.txt`), implemented by a direct Opus `implementer` (`units/l2a/pool-implement-direct.md`) from the Luna-reconciled rulings (`units/l2a/pool-reconcile-luna.md`, no mark to apply), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2a/pool-r1-distillate-luna.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2a/pool-r1-checker-luna.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2a/pool-objective-r1.md`) | PASS; F1 to F6 outside the claims; R1 to R3 |
| 2 | checker | `checker` on GPT-5.6 Luna, a third concurrent bench lane (`units/l2a/pool-r2-checker-luna.md`), after fix round 1 | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung, because Grok 4.6 exhausts within minutes of a real lane today (session ledger).

Fix round 1, a `builder` on Claude Sonnet (`units/l2a/pool-fix1-result.md`): a sentence before each of the guide's two method tables (F1), the rewrapped `Pool.test.ts` bullet (F6), the mirror inventory in `guides/README.md` naming `probe.md` and `test.md` (R1), a second planted control reddening the destroy-path detach assertion (`pool-proofs/pool-obj-3-control-detach-destroy-red.txt`, F3), and the report's corrected revert proof, sweep table, class names, and citation (F2, F4, F5).

## Rulings on the referrals

- R1 (the mirror inventory): applied in the fix round; one paragraph in an owned file, in the form markdown's landing set.
- R2 (the native-signal guard assertion kept in `Pool.test.ts:105-106`): stands as the writer recorded; the refuter named only the moved assertions.
- R3 (the throwing-`Proxy` input duplicated in `Pool.test.ts` and `validators.test.ts`): stands as an inert input stub; no rule compels extraction.
- The round-2 checker's R1 (whether the landing gates exit 0): the deciding run at landing.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/pool`, recorded in `units/land-conform.log` and `units/conform-pool.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker and objective; round 2 checker after fix round 1), the deciding run at landing read every gate exit 0 (landed as pool `724208d`).
