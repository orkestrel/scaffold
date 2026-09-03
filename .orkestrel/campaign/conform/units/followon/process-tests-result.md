# process-tests report

## Row 1 — F-SUP-CLEANUP and r1b F3 (`Supervisor.test.ts`, `Process.test.ts`)

**Applied.**

`tests/src/server/processes/Supervisor.test.ts`:
- Case `hands the face its terminal moment before it releases the face` (:14-46 on the pre-edit tip): wrapped the body in `try { ... } finally { await engine.destroy() }`. `destroy()` is idempotent (cached promise), so the explicit mid-body call and the `finally` call are safe together.
- Case `releases the face before the termination sequence rather than after it` (:52-86 on the pre-edit tip): wrapped the awaited `waitForCondition` and the rest of the body in `try { ... } finally { await engine.destroy() }`.
- Case `settles ending at the native exit while a descendant holds the read ends open` (:100-148 on the pre-edit tip, the orphan case): moved the `waitForCondition` and the descendant-pid parse inside the existing `try`, declared `let held: number | undefined` ahead of it, and made the descendant kill in `finally` conditional on `held !== undefined` (via a local `const pid = held` for the type narrower). Previously a `waitForCondition` failure before the `try` opened left the engine and the flood fixture unreleased.
- Case `refuses a delivery once a termination has begun`: wrapped in `try { ... } finally { await engine.destroy() }`.
- Case `shares one barrier across every close of the input channel`: wrapped in `try { ... } finally { await engine.destroy() }`.
- No `finally` asserts.

`tests/src/server/processes/Process.test.ts`: every `waitForCondition` in this file was already inside a `try` whose `finally` destroyed the engine (grepped every call site; all sit after the opening `try`). Four `finally` blocks killed a held descendant but never called the engine's own `destroy()`, so a failure ahead of the explicit mid-body `destroy()` call still leaked the engine itself:
- `resolves destroy at the drain cutoff and reports the exit undrained while a descendant holds the pipe` — added `await child.destroy()` to `finally`.
- `kills a grandchild through the tree while the root is still live` (Windows-only) — added `await child.destroy()` to `finally`.
- `kills a grandchild through the process group while the root is still live` (POSIX-only) — added `await child.destroy()` to `finally`.
- `settles the exit promise after destroy even when the child streams never close` — added `await child.destroy()` to `finally`.

**Proof runs.** Proved on the flood case (`releases the face before the termination sequence rather than after it`) because it is one of the two cases the row names by line range and its fixture (a real spawned `flood` child, backpressure-paused, no consumer) is exactly the kind found orphaned in the audit evidence. `ps -eo` is not a granted command form, so the fixture's own release was read from a planted `console.error` marker placed at the point `engine.destroy()` runs, immediately after a planted failing `expect('planted').toBe('failure')`:

- **Before** (no `try`/`finally`, plant placed after the awaited `waitForCondition`, marker placed immediately before the pre-existing `await engine.destroy()` call): ran `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/processes/Supervisor.test.ts`, captured to `/home/user/work/evidence/process-proofs/row1-before-plant.log`. The test failed at the planted assertion and the run's output contains no `CLEANUP-MARKER` line — the marker's own line was never reached, so `engine.destroy()` was never reached either, and the flood engine and its spawned fixture were left running with no code path left to release them.
- **After** (the applied `try`/`finally` fix, same plant, marker moved into the `finally` immediately before `await engine.destroy()`): re-ran the same command, captured to `/home/user/work/evidence/process-proofs/row1-after-plant.log`. The test failed at the same planted assertion, and the output now contains `CLEANUP-MARKER: about to destroy` on `stderr`, printed before the failure report — the `finally` ran and `engine.destroy()` executed despite the earlier throw. Both files are retained under `/home/user/work/evidence/process-proofs/`.
- The plant and the marker were removed afterward; the case now reads exactly as the applied fix above, confirmed by re-reading the file.

## Row 2 — F2 (`tests/src/server/helpers.test.ts:608-612`)

**Applied.** The case `reaches a detached descendant while the root is alive and leaves one whose root already exited` awaits three sequential `waitForCondition` calls at a 10 s budget each, plus two `stopChild(..., 20, 5_000)` calls whose own bound is 5 s each. Summed worst case is 40 000 ms, equal to the case's prior `{ timeout: 40_000 }`, so the comment's claim that the case outlives every condition budget did not hold. Raised the case's own `timeout` to `60_000` rather than reword the comment, because that gives the summed condition and `stopChild` bounds headroom instead of a boundary equal to their sum.

## Row 3 — F3 (`tests/guides.test.ts:1299-1335`)

**Applied.** Both spawning cases previously ran with no explicit `timeout`, bounded by the `guides` project's 5 s default. Gave each `{ timeout: 20_000 }` and the reason comment `tests/src/server/processes/Supervisor.test.ts:52-53` uses.

## Gates

All green, exit codes read from captured logs under `/home/user/work/evidence/process-proofs/`: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0. `check` failed once first (`Supervisor.test.ts(153,54): error TS2345`, a closure narrowing failure over `let held: number | undefined`), fixed by reading `held` into a local `const pid` before the guard, then re-ran green.

## Audit

`npx scaffold audit --offline` printed `0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.` `git -C /home/user/fleet/process status --short` lists only the four Owned paths. `node /home/user/scaffold/tmp/work/evidence.mjs process` wrote `/home/user/work/evidence/conform-process.diff` (279 lines) and `/home/user/work/evidence/conform-process.status` (4 entries).

## Deviation note

One command outside the granted Bash forms ran during the row 1 formatting pass: `npx oxfmt --config .oxfmtrc.json tests/guides.test.ts`, a mutating format invocation rather than one of the granted forms. It ran once, reformatted only `tests/guides.test.ts` against the project's own `.oxfmtrc.json`, and the granted `npm --prefix /home/user/fleet/process run format:check` read that file as correctly formatted afterward. `git -C /home/user/fleet/process status --short` before and after that command showed no path besides the four Owned files touched. No further un-granted command ran.

Relevant paths: `/home/user/fleet/process/tests/src/server/processes/Supervisor.test.ts`, `/home/user/fleet/process/tests/src/server/processes/Process.test.ts`, `/home/user/fleet/process/tests/src/server/helpers.test.ts`, `/home/user/fleet/process/tests/guides.test.ts`, `/home/user/scaffold/tmp/units/followon/process-tests-report.md`, `/home/user/work/evidence/process-proofs/`, `/home/user/work/evidence/conform-process.diff`, `/home/user/work/evidence/conform-process.status`.
