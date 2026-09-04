# Audit verdict: unit conform-qualifier

Subject: the uncommitted unit in `/home/user/fleet/qualifier` (brief `briefs/conform-qualifier-brief.md`, audit brief `briefs/conform-qualifier-audit-brief.md`, fix brief `briefs/conform-qualifier-fix1-brief.md`, report `reports/conform-qualifier-report.md`, evidence `units/conform-qualifier.diff.txt` and `units/conform-qualifier.status.txt`), implemented by a direct Opus `implementer` (`units/l3/qualifier-implement-direct.md`) on the closure staged 18:36 UTC with reason's landed tip, from the Luna-reconciled rulings (`units/l3/qualifier-reconcile-luna.md`), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/qualifier-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/qualifier-r1-checker-luna.result.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/qualifier-objective-r1.md`) | FAIL 4, 6 on the record; F1 to F3; R1, R2 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l3/qualifier-r2-checker-luna.result.md`), after fix round 1 | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung. The round-2 objective lane did not run: fix round 1 changed the report alone and no file in the tree.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/qualifier-fix1-result.md`), report-only: the seven sweep rows the lane found missing (claim 4), program's own README and guide sites for the renamed symbols under § Shared-file patches (claim 6), and the qualifier-subj-14 citation (F3).

## Rulings

- The unit's recorded deviation — the staged `@orkestrel/reason` drops `RuleResult.conclusion`, so `conclusion: true` left four test literals and one `@example` line, with no assertion changed — is the reason breaking row's consumer carry, verified by the objective lane (`src/core/helpers.ts:327,330-332` read the authored rule's conclusions, never the member).
- F1 (the distribution drop-in's local `isRecord`) and F2 (the guide-test drop-in's stale header): scaffold host-inventory rows (`ledgers/followons.md`).
- R1 (a breaking row's consumer sweep bound): the reconcile template sweeps every guide a checkout carries from 19:30 UTC (`instruments/reconcile-template.md`).
- Program's consumer patches, source and prose, ride program's L4 unit brief.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/qualifier`, recorded in `units/land-conform.log` and `units/conform-qualifier.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker; round 1 objective's record refutations closed by fix round 1; round 2 checker), the deciding run at landing read every gate exit 0 (landed as qualifier `e8ebafa`).
