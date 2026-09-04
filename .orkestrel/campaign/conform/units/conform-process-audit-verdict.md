# Audit verdict: unit conform-process

Subject: the uncommitted unit in `/home/user/fleet/process` (brief `briefs/conform-process-brief.md`, audit brief `briefs/conform-process-audit-brief.md`, fix briefs `briefs/conform-process-fix-obj1-brief.md` and `briefs/conform-process-fix1-brief.md`, report `reports/conform-process-report.md`, evidence `units/conform-process.diff.txt` and `units/conform-process.status.txt`), workflow `wf_4b849c0d-459` (L2a) through its round-1 and round-2 lanes, then the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, two readings (`units/l2a/process-objective-r1a.md`, `process-objective-r1b.md`) | FAIL on the stopped move (process-obj-1) with the findings fix round 1 carried as rows P1 to P10 |
| 1 | checker | `checker` on Claude Sonnet, the workflow's node, two runs (`units/l2a/09-process-checker-r1-*.json`, `15-process-checker-r1-*.json`) | PASS, PASS |
| 2 | checker | `checker` on Claude Sonnet, the workflow's node before its stop (`units/l2a/12-process-checker-r2-*.json`) | PASS |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l2a/process-r2-distillate-luna.md`) | distillate |
| 2 | objective | `reviewer` on Claude Opus 5, reading the distillate (`units/l2a/process-objective-r2.md`) | PASS; F2, F3 outside the claims |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l2a/process-r2-checker-luna.md`) | FAIL none; F-SUP-CLEANUP outside the claims; the `stdout` referral |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Round 2's absorption and checker ran on GPT-5.6 Luna, the tedious-work ladder's second rung, after Grok 4.6's quota spent (session ledger).

Fix rounds: the move round (`briefs/conform-process-fix-obj1-brief.md`) landed process-obj-1 under the `git mv` grant after the implement round stopped for want of a file-move tool; fix round 1 (`briefs/conform-process-fix1-brief.md`, Opus `implementer`, `units/l2a/process-fix1-result.md`) carried rows P1 to P10, the union of both round-1 objective readings.

## Rulings on the second round's findings and referrals

- F2 (`tests/src/server/helpers.test.ts:608-612`, the comment's claim against its timeout) and F3 (the two spawning cases in `tests/guides.test.ts:1299-1335` under the `guides` project's 5 s default): `briefs/followon/process-tests-brief.md`, a `builder` unit after landing.
- F-SUP-CLEANUP (`Supervisor.test.ts:52-86` and `:100-148` await condition budgets outside `try/finally`): the same follow-on; the leak is evidenced by the two `child.mjs late` fixtures the Orchestrator found orphaned for 92 minutes at 16:20 UTC.
- The raw `Supervisor.stdout` stream as a published surface: intended and documented — `guides/process.md:226-233` names it as the stream a composing face attaches its consumer to, because the engine frames no output — so no change.

## Structural claims

Claim 4's counts are read from the capture files under `/home/user/work/evidence/process-proofs/`; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/process`, recorded in `units/land-conform.log` and `units/conform-process.audit.txt`, and the landing commit named in the state table. The first deciding run (16:33 UTC) read every gate green and the audit clean, then failed at the commit on a relative message path; the second run repeats the chain from the same tree.

## Terminal

PASS (round 2, objective and checker), the deciding run at landing read every gate exit 0 (landed as process `7fe522e`).
