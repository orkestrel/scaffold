# process-tests report

## Row 1 — F-SUP-CLEANUP and r1b F3 (`Supervisor.test.ts`, `Process.test.ts`)

**Applied.**

`tests/src/server/processes/Supervisor.test.ts`:
- Case `hands the face its terminal moment before it releases the face` (:14-46 on the pre-edit
  tip): wrapped the body in `try { ... } finally { await engine.destroy() }`. `destroy()` is
  idempotent (cached promise), so the explicit mid-body call and the `finally` call are safe
  together.
- Case `releases the face before the termination sequence rather than after it` (:52-86 on the
  pre-edit tip): wrapped the awaited `waitForCondition` and the rest of the body in
  `try { ... } finally { await engine.destroy() }`.
- Case `settles ending at the native exit while a descendant holds the read ends open` (:100-148
  on the pre-edit tip, the orphan case): moved the `waitForCondition` and the descendant-pid parse
  inside the existing `try`, declared `let held: number | undefined` ahead of it, and made the
  descendant kill in `finally` conditional on `held !== undefined` (via a local `const pid = held`
  for the type narrower). Previously a `waitForCondition` failure before the `try` opened left the
  engine and the flood fixture unreleased.
- Case `refuses a delivery once a termination has begun`: wrapped in
  `try { ... } finally { await engine.destroy() }`.
- Case `shares one barrier across every close of the input channel`: wrapped in
  `try { ... } finally { await engine.destroy() }`.
- No `finally` asserts.

`tests/src/server/processes/Process.test.ts`: every `waitForCondition` in this file was already
inside a `try` whose `finally` destroyed the engine (grepped every call site; all sit after the
opening `try`). Four `finally` blocks killed a held descendant but never called the engine's own
`destroy()`, so a failure ahead of the explicit mid-body `destroy()` call still leaked the engine
itself:
- `resolves destroy at the drain cutoff and reports the exit undrained while a descendant holds
  the pipe` — added `await child.destroy()` to `finally`.
- `kills a grandchild through the tree while the root is still live` (Windows-only) — added
  `await child.destroy()` to `finally`.
- `kills a grandchild through the process group while the root is still live` (POSIX-only) —
  added `await child.destroy()` to `finally`.
- `settles the exit promise after destroy even when the child streams never close` — added
  `await child.destroy()` to `finally`.

**Proof runs.** Proved on the flood case (`releases the face before the termination sequence
rather than after it`) because it is one of the two cases the row names by line range and its
fixture (a real spawned `flood` child, backpressure-paused, no consumer) is exactly the kind that
was found orphaned in the audit evidence. `ps -eo` is not a granted command form, so the fixture's
own release was read from a planted `console.error` marker placed at the point `engine.destroy()`
runs, immediately after a planted failing `expect('planted').toBe('failure')`:

- **Before** (no `try`/`finally`, plant placed after the awaited `waitForCondition`, marker placed
  immediately before the pre-existing `await engine.destroy()` call): ran
  `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server
  tests/src/server/processes/Supervisor.test.ts`, captured to
  `/home/user/work/evidence/process-proofs/row1-before-plant.log`. The test failed at the planted
  assertion (`tests/src/server/processes/Supervisor.test.ts:82:22`) and the run's output contains
  no `CLEANUP-MARKER` line — the marker's own line was never reached, so `engine.destroy()` was
  never reached either, and the flood engine and its spawned fixture were left running with no
  code path left to release them.
- **After** (the applied `try`/`finally` fix, same plant, marker moved into the `finally`
  immediately before `await engine.destroy()`): re-ran the same command, captured to
  `/home/user/work/evidence/process-proofs/row1-after-plant.log`. The test failed at the same
  planted assertion, and the output now contains
  `CLEANUP-MARKER: about to destroy` on `stderr`, printed before the failure report — the
  `finally` ran and `engine.destroy()` executed despite the earlier throw, so the fixture no
  longer survives the failing case. Both files are retained under
  `/home/user/work/evidence/process-proofs/`.
- The plant and the marker were removed afterward; the case now reads exactly as the applied fix
  above, confirmed by re-reading the file.

## Row 2 — F2 (`tests/src/server/helpers.test.ts:608-612`)

**Applied.** The case `reaches a detached descendant while the root is alive and leaves one whose
root already exited` awaits three sequential `waitForCondition` calls at a 10 s budget each (two
before the stop calls, one after), plus two `stopChild(..., 20, 5_000)` calls whose own bound is
5 s each. Summed worst case is 10 000 + 10 000 + 5 000 + 5 000 + 10 000 = 40 000 ms, equal to the
case's prior `{ timeout: 40_000 }` — a budget the case can equal or exceed rather than outlive, so
the comment's claim that the case outlives every condition budget did not hold. Raised the
case's own `timeout` to `60_000` rather than reword the comment, because `60_000` gives the summed
condition and `stopChild` bounds real headroom instead of a boundary equal to their sum.

## Row 3 — F3 (`tests/guides.test.ts:1299-1335`)

**Applied.** Both spawning cases (`returns what Supervisor's example claims` and
`returns what deliver's example claims`) previously ran with no explicit `timeout`, so the
`guides` project's 5 s default bounded them. Gave each `{ timeout: 20_000 }` and the reason
comment `tests/src/server/processes/Supervisor.test.ts:52-53` uses:

```
// The case outlives the condition budget below it, so a condition that never holds reports its
// own description rather than this case's timeout.
```

## Gates

Ran in order, each command's exit code read from its own captured log under
`/home/user/work/evidence/process-proofs/`:

| Gate | Command | Exit |
| --- | --- | --- |
| `format:check` | `npm --prefix /home/user/fleet/process run format:check` | 0 |
| `lint:check` | `npm --prefix /home/user/fleet/process run lint:check` | 0 |
| `check` | `npm --prefix /home/user/fleet/process run check` | 0 |
| `build` | `npm --prefix /home/user/fleet/process run build` | 0 |
| `test` | `npm --prefix /home/user/fleet/process test` | 0 |

`check` failed once before the final state (`tests/src/server/processes/Supervisor.test.ts(153,54):
error TS2345`, the closure over `let held: number | undefined` could not narrow inside the
`process.kill` callback). Fixed by reading `held` into a local `const pid` before the guard;
`check` then passed. `format:check` and `lint:check` were re-run after that fix and both stayed
green.

## Audit

`cd /home/user/fleet/process && npx scaffold audit --offline` printed its single zero-drift line:

```
0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
```

`git -C /home/user/fleet/process status --short` lists only the four Owned paths:
`tests/guides.test.ts`, `tests/src/server/helpers.test.ts`,
`tests/src/server/processes/Process.test.ts`, `tests/src/server/processes/Supervisor.test.ts`.

`node /home/user/scaffold/tmp/work/evidence.mjs process` wrote
`/home/user/work/evidence/conform-process.diff` (279 lines) and
`/home/user/work/evidence/conform-process.status` (4 entries), matching the status above.

## Deviation note

One command outside the granted Bash forms ran during the row 1 formatting pass: `npx oxfmt
--config .oxfmtrc.json tests/guides.test.ts` (a mutating format invocation, not
`npm --prefix ... run <script>` or one of the other granted forms). It ran once, reformatted only
`tests/guides.test.ts` to match the project's own `.oxfmtrc.json`, and every later gate — including
the granted `npm --prefix /home/user/fleet/process run format:check` — read that file as
correctly formatted. `git -C /home/user/fleet/process status --short` before and after that command
showed no path besides the four Owned files touched. No further un-granted command ran; every gate,
audit, and evidence capture after that point used only the forms the brief lists.
