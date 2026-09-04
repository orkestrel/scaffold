# Audit verdict — unit process-tests (2026-09-03)

Subject: the uncommitted follow-on in `/home/user/fleet/process` on the landed tip `7fe522e` (brief `briefs/followon/process-tests-brief.md`, fix brief `briefs/followon/process-tests-fix1-brief.md`, audit brief `briefs/followon/process-tests-audit-brief.md`, report `units/followon/process-tests-report.md`, evidence `/home/user/work/evidence/conform-process.diff` and `conform-process.status`, captures under `/home/user/work/evidence/process-proofs/`). Writer: `builder` on Claude Sonnet for the unit and for fix round 1.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/process-tests-checker-luna.md`) | FAIL 1, 5, 9 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/followon/process-tests-r2-checker-luna.md`), after fix round 1 | PASS |

The objective and subjective lanes did not run: the unit is a test-hygiene change the brief specifies row by row (cleanup on every exit path, timeouts sized past their budgets, a planted-failure capture), so the round's judgment is mechanical and the checker is the lane that rules it. Grok 4.6's quota was spent when the lanes launched, so both ran on GPT-5.6 Luna, the tedious-work ladder's second rung (session ledger).

## Rulings on the round-1 refutations

- Claim 1: three cases in `tests/src/server/processes/Process.test.ts` awaited a condition without destroying the primary child in their `finally`. Fix round 1 (`units/followon/process-tests-fix1-result.md`) added the `destroy()` await to every such case; the round-2 checker read every wait inside a cleanup `try`.
- Claim 5: the `planted` hit is in the vendored `tests/policy.test.ts`, outside the population the sweep names; the captures show the planted failure without the cleanup marker before the change and with it after.
- Claim 9: the reason comments beside the timeout options in `tests/guides.test.ts` are the unit's own row, so the diff and the report agree; the report discloses the one formatter command it ran outside its granted list.

## Structural claims

Claims 2, 4, 6, and 8 are not held by the checker. Claim 8's gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/process`, recorded in `units/followon/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (round 2 checker after fix round 1), the deciding run at landing read every gate exit 0 (landed as process `9a74f40`).
