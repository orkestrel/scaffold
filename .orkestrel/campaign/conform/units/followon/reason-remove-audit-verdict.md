# Audit verdict: unit reason-remove

Subject: the uncommitted follow-on in `/home/user/fleet/reason` (brief `briefs/followon/reason-remove-brief.md`, audit brief `briefs/followon/reason-remove-audit-brief.md`, report `units/followon/reason-remove-report.md`, result `units/followon/reason-remove-sol-result.md`, evidence `/home/user/work/evidence/reason-remove.diff` and `.status`, captures under `/home/user/work/evidence/reason-remove-proofs/`), the R-1 referral from `units/conform-reason-audit-verdict.md`: `SubjectBuilderInterface` carries the whole `remove` batch family. Written by GPT-5.6 Sol through the Cursor bench (`instruments/sol5.sh`).

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/reason-remove-checker-luna.result.md`) | PASS |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/followon/reason-remove-objective-sol.md`) | FAIL 6, R-1 |

Subjective lane: not run, by the round's design; the unit's rows are objective (an overload, its proof, its guide rows). No distillate ran: the diff is 164 lines and each lane read it whole. The checker on Luna is the engine that did not write it.

## Rulings

- Claims 1 to 5 and 7: confirmed by both lanes on the tree; the overload order, the per-key emission through `#removeOne`, the destroyed refusal, the proof's red (`1 failed, 20 passed`) and green (`21 passed`) under one command, and the three guide rows.
- Claim 6, refuted by the objective lane on `guides/reason.md:566` "clones as plain payloads": rejected. The claim names the TypeScript type assertion `as` on an added code line; the hit is the English preposition in a pre-existing guide cell the table re-padding carried into the diff, and no rule bans the word. The claim's wording in the audit brief admitted the reading; a later brief names the assertion as a code token. The tree conjuncts of claim 6 hold on the lane's own sweeps.
- R-1: the gate reading settles on the Orchestrator's deciding run at landing.

## Structural claims

Claim 6's gate reading is NOT-EVIDENCED by every read-only lane and settles on the deciding run: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/reason`, recorded in `units/followon/land-reason-remove.log.txt`, and the landing commit named in the state table.

## Terminal

PASS (the one refutation rejected on the record), pending the deciding run at landing.
