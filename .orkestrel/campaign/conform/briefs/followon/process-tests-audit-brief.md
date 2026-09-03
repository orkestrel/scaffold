# Checker lane — unit process-tests (a follow-on in /home/user/fleet/process)

## Role and engine

`checker` on the Cursor bench, read-only, in `/home/user/fleet/process`. Perform the assignment directly and spawn nothing. Never edit, never run a command that changes the tree.

## Subject

The follow-on unit `process-tests` (brief `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/process-tests-brief.md`, report `/home/user/scaffold/tmp/units/followon/process-tests-report.md`, evidence `/home/user/work/evidence/conform-process.diff` and `conform-process.status`, proof captures under `/home/user/work/evidence/process-proofs/row1-before-plant.log` and `row1-after-plant.log`), on the landed tip `7fe522e`, uncommitted.

## Claims

1. Every spawning case in `tests/src/server/processes/Supervisor.test.ts` and `tests/src/server/processes/Process.test.ts` awaits its condition budgets inside a `try` whose `finally` awaits the engine's `destroy()` (and ends a held descendant conditionally), and no `finally` asserts; read every `waitForCondition` call site in both files and every `finally` block.
3. `tests/src/server/helpers.test.ts` gives the detached-descendant case a `timeout` that exceeds the sum of the condition budgets and `stopChild` bounds it awaits (read the case's conditions and its `timeout` value), and the two spawning cases in `tests/guides.test.ts` (around lines 1299-1335 on the tip) carry `{ timeout: 20_000 }` with the reason comment `Supervisor.test.ts` uses.
5. The report's proof for row 1 is real: `row1-before-plant.log` shows the planted assertion failing with no `CLEANUP-MARKER` line, and `row1-after-plant.log` shows the same failure with `CLEANUP-MARKER: about to destroy` printed; the plant and the marker are absent from the tree (grep `planted` and `CLEANUP-MARKER` over `tests/**` excluding the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`).
7. `/home/user/work/evidence/conform-process.status` lists only `tests/src/server/processes/Supervisor.test.ts`, `tests/src/server/processes/Process.test.ts`, `tests/src/server/helpers.test.ts`, and `tests/guides.test.ts`, and the diff carries no hunk outside them and no change under `src/**`.
9. No `TODO`, deferred row, skipped test, `.only`, or debug residue entered on an added line; the report's rows match the diff hunk for hunk; the report discloses the one command it ran outside its granted list (`npx oxfmt --config .oxfmtrc.json tests/guides.test.ts`) and the diff for that file shows formatting, the two timeout options, and the reason comments the brief's row 3 requires, and nothing else.

Claims 2, 4, 6, and 8 are not held by this lane; mark them `not held`.

## Output

Per-claim verdicts (`CONFIRMED`, `REFUTED`, or `UNRESOLVED` with `file:line` evidence), `Findings outside the claims`, `Referrals`, `Claims attacked and held`, exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <ids or none>`, then `Journal` (leave for the driver) and `Deviation` (any tree change observed, or none).

## Round 2

After fix round 1 (`briefs/followon/process-tests-fix1-brief.md`): the three cases at `Process.test.ts:873-909`, `:911-971`, and `:973-1020` now await the primary child's `destroy()` in their `finally`; re-read every `waitForCondition` site for claim 1. The `planted` hit in the vendored `tests/policy.test.ts` and the reason comments in `tests/guides.test.ts` are ruled permitted and required respectively.
