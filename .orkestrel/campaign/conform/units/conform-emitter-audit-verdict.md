# Audit verdict: unit conform-emitter

Subject: the uncommitted unit in `/home/user/fleet/emitter` (brief `briefs/conform-emitter-brief.md`, audit brief `briefs/conform-emitter-audit-brief.md`, report `reports/conform-emitter-report.md`, evidence `units/conform-emitter.diff.txt` and `units/conform-emitter.status.txt`), workflow `wf_f5789004-34f` (L1b).

## Lanes

| Round | Lane | Role, engine | Terminal | Failing |
| --- | --- | --- | --- | --- |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench | FAIL | 4 (F1: the guide's § Tests rows described a suite the unit had removed) |
| 1 | checker | `checker` on Claude Sonnet | PASS | — |
| 2 | objective | `reviewer` on Claude Opus 5 | FAIL | none; F1 outside the claims (`tests/src/core/helpers.test.ts:22`, a comment giving a walk the faculty to see) |
| 2 | checker | `checker` on Claude Sonnet | PASS | — |
| 3 | objective | `reviewer` on Claude Opus 5 | PASS | — |
| 3 | checker | `checker` on Claude Sonnet | PASS | — |

Subjective lane: not run in the audit rounds, by the round's design (the objective lane and the checker are the audit lanes of this conformance round; the subjective argument was taken in the finder round that produced the rows). The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution.

Fix round 1 (Opus `implementer`) closed round 1's F1 by rewriting the guide's § Tests rows to the suites that exist. Fix round 2 closed round 2's F1 with the lane's exact prescription and regenerated the evidence diff byte-exact with `git diff HEAD --output=…`.

## Rulings on the third round's referrals

- R1 (the Surface fence at `guides/emitter.md:11-32` has no executed transcription): carried to the follow-on ledger as a successor row; emitter-obj-3 was scoped to the Manage-listeners fence and the unit conformed to its row.
- R2 (the `guides/emitter.md` mirrors in the sibling checkouts are stale against this tip): an Orchestrator-owned mirror refresh in each consumer's landing after emitter publishes; recorded in the follow-on ledger, not a row of this unit.
- R3 (`guides/emitter.md:196`, the `feed.clear('post')` claim line is neither executed nor guarded): carried to the follow-on ledger as a successor row beside R1; it widens the fence.
- R4 (the staged deletion of `tests/setup.test.ts`): settled at the landing, whose staging by path covers the same path.
- The lane's observation on the § Sweeps population wording: no change; the lane re-ran each sweep over the superset population and claim 3 rests on that run.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, and `test` in `/home/user/fleet/emitter`, recorded in `units/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (round 3, objective and checker), the deciding run at landing read every gate exit 0 (landed as emitter `67433a5`).
