# Fix round 1 — unit conform-abort

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/abort`. Perform the assignment directly and spawn nothing.

## Subject

The unit brief is `/home/user/scaffold/tmp/units/conform/conform-abort-brief.md` (its Host paragraph's shell discipline binds this round too) and the writer's report is `/home/user/scaffold/tmp/units/conform/conform-abort-report.md`. The tree carries the unit's uncommitted changes on the baseline 7a55988, plus the partial edits of a fix-round agent that the Orchestrator stopped at 10:36 UTC on 2026-09-03 while it was parked on a permission prompt: after the report it touched `guides/abort.md` and `tests/guides.test.ts` (and `src/core/Abort.ts`, which `git status` reports unchanged). Read `git diff` before editing and keep what agrees with the rulings that follow.

## The round-1 verdicts

- Objective lane (Claude Opus 5, the recorded substitution for the dark Sol bench): `/home/user/work/l1r/08-abort-objective-r1-a1d6ce62bea0f5c83.json` — `FAIL 8` with no finding outside the claims and two referrals, R1 and R2.
- Checker (Claude Sonnet): `/home/user/work/l1r/09-abort-checker-r1-a6dea196b98b734ab.json` — `PASS`.

Read both in full.

## Orchestrator rulings

1. **Claim 8** is structural: no read-only lane can take the gate run, and the deciding run at landing settles it. Re-run the gate chain bare (`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`) and record each exit code in the report's § Gates.
2. **R1 (fleet-F1)** is ruled `noop` in this package. `isBrowserVuePath` is the sole export of `tests/setup.ts` and the sole case of `tests/setup.test.ts`, and the blueprint's `setup` axis (the `setup` project in `vite.config.ts` and the `test:setup` script) needs a case, so deleting the helper needs a blueprint change through scaffold; the Orchestrator carries that to a fleet follow-on outside this round. If the stopped agent deleted the helper or its test block, restore them by editing to the baseline text. Change fleet-F1's disposition in the report from `stopped` to `noop` with this ruling as its evidence.
3. **R2** is granted as the successor row **abort-obj-5b**: transcribe the quick-start fence of `guides/abort.md` (the fence whose comment reads that `abort.abort()` cancels the in-flight fetch through the native signal and `aborted` flips true) into `tests/guides.test.ts` with the `fetch` line dropped, the way the create-and-abort transcription drops `openStream`, and assert that `aborted` reads `true` after `abort()`. Record the failing-first proof (the exact command, its failing count, then its passing count). If the stopped agent's edits already carry this, finish and verify them rather than redoing them.

## Method and output

Adopt the rulings, re-run the gate chain, rewrite `/home/user/scaffold/tmp/units/conform/conform-abort-report.md` so it describes the whole unit as it now stands with a `## Fix round 1` section naming each ruling and what closed it, and refresh the evidence files `/home/user/work/evidence/conform-abort.diff` (`git diff HEAD` after `git add -N` on every created file) and `/home/user/work/evidence/conform-abort.status` (`git status --short`). Do not commit, stage beyond `git add -N`, push, install, or run any discarding git command. Return the structured output.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a ruling contradicts the tree in a way you cannot close inside Owned. Decide, record, and carry on from an ancillary question.
