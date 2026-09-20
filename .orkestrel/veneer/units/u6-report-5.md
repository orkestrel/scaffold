Implemented successor brief 5 over `f49bc7f`. Every final gate exits 0. The managed Chromium browser runs agree: `349 passed | 2 expected fail (351)`. No agent was spawned.

The changes for this brief are:

- `src/browser/constants.ts`: adds `MEDIA_STAGE` alphabetically and documents its value; corrects the pointer marker's removal timing.
- `src/browser/helpers.ts`: records the first stage's media readings; reads each option once; restores recorded readings with per-axis waits; starts unstaged stability sampling after the reset; guards refusal-path restoration; records a pointer hold only after the press resolves; preserves release and park failures together.
- `tests/src/browser/helpers.test.ts`: replaces clearing expectations with provider-override preservation, retains the all-axis immediate-read proof, adds unstaged stability and pointer marker-ordering evidence, and removes the accessor fixture.
- `guides/test.md`: adds the marker's Surface row and updates the release Summary, Bounds, and media pattern explanation. Documents explicit emulation, post-reset stability, frame-budget limits, restoration coverage, refusal budgets, and pointer error handling. Table spacing changed under the required formatter.

`MEDIA_STAGE` names `data-media-stage`. Its value is a bit string ordered as `print`, `(prefers-reduced-motion: reduce)`, `(prefers-color-scheme: dark)`, and `(forced-colors: active)`. Each bit is `1` for a matching query and `0` otherwise; `0100` means only reduced motion matches. Later stages retain the first marker. Successful release restores its readings as explicit emulation and removes it. Searching the hosted guide roots in Veneer's installed scaffold and this checkout's installed scaffold found no existing `MEDIA_STAGE` claim.

The changed cases establish these properties:

| Case | Evidence |
| --- | --- |
| `records the hold after press delivery and leaves a rejected protocol press unmarked` | A real malformed `mousePressed` command rejects with `Invalid parameters`, leaving no marker or active control. A subsequent real hold records no marker during pointer-down delivery and a marker after completion. This does not drive a rejected press through `holdAccessible`. |
| `pins the base, stages motion and print, and restores the host medium` | Adds assertions for the initial marker value and its removal; the repeated stages still restore the initial readings and paint. |
| `preserves a provider color scheme inverse through stage and release` | The immediate reading after release retains the provider-staged inverse. |
| `preserves a provider forced colors inverse through stage and release` | The immediate reading after release retains the provider-staged inverse. |
| `restores every media axis before the next line reads it` | Records the baseline before externally staging every inverse, then restores the initial readings immediately after release. |
| `restores provider inverses on every axis after changing print and motion` | Records provider inverses, changes print and motion, and reads the provider inverses immediately after release. Also checks marker encoding and removal. |
| `reads a stable value after a release with nothing staged` | Starts without a marker and compares the returned readings against a later frame. Establishes stability, not the engine's own baseline. |
| Removed accessor fixture | Removes the exhaustion case whose result depended on reading `options.print` repeatedly. |

The controls ran against the real browser:

- `npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t Media`: before implementation, exit 1 with `3 failed | 6 passed | 287 skipped (296)`; after implementation, exit 0 with `9 passed | 287 skipped (296)`. The old release returned `[false, false, false, false]` where the provider-inverse case required `[true, true, true, true]`. Logs: `u6-5-media-red.log.txt` and `u6-5-media-green.log.txt`.
- `npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t holdAccessible`: moving the marker before the press produced exit 1 with `1 failed | 7 passed | 289 skipped (297)`, reading `[[true]]` instead of `[[false]]`. Restoring the implementation produced exit 0 with `8 passed | 289 skipped (297)`. The mutation is removed. Logs: `u6-5-pointer-red.log.txt` and `u6-5-pointer-green.log.txt`.

Source review confirms that `options.print` and `options.motion` each appear only in their initial local assignment. The refusal restoration's send and wait sit inside their own `try`/`catch`. A restoration failure becomes the cause of `Media emulation did not reach the tester: <query>`; successful restoration leaves the read-back failure as its cause. The read-back exhaustion path cannot be driven from inert input against a conforming engine. Its restoration is covered by review and by the shared payload code rather than by a case. No inert trigger was found. The clear-exhaustion voice remains `Media emulation did not clear from the tester`.

The final gates ran in the required order. The table gives their exit codes and terminal output excerpts; complete output is retained in the numbered logs under ``.

| Command | Exit | Final lines |
| --- | --- | --- |
| `npx.cmd oxfmt --config .oxfmtrc.json --write src/browser/helpers.ts src/browser/constants.ts tests/src/browser/helpers.test.ts guides/test.md` | 0 | `Finished in 937ms on 4 files using 16 threads.` |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.`<br>`Finished in 1203ms on 60 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run @orkestrel/test@0.0.18 check:src:server`<br>`npm notice run tsc --noEmit -p configs/src/tsconfig.server.json` |
| `npm.cmd run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| `npm.cmd run test:src` | 0 | `Test Files 7 passed (7)`<br>`Tests 612 passed \| 2 expected fail \| 9 skipped (623)`<br>`Start at 07:20:41`<br>`Duration 30.98s (transform 647ms, setup 896ms, import 785ms, tests 30.08s, environment 0ms)` |
| `npm.cmd run test:policy` | 0 | `Test Files 1 passed (1)`<br>`Tests 101 passed \| 1 skipped (102)`<br>`Start at 07:21:13`<br>`Duration 2.01s (transform 107ms, setup 49ms, import 283ms, tests 1.51s, environment 0ms)` |
| `npm.cmd run test:config` | 0 | `Test Files 1 passed (1)`<br>`Tests 173 passed \| 1 skipped (174)`<br>`Start at 07:21:16`<br>`Duration 3.42s (transform 203ms, setup 43ms, import 810ms, tests 2.41s, environment 0ms)` |
| `npm.cmd run test:setup` | 0 | `Test Files 3 passed (3)`<br>`Tests 24 passed (24)`<br>`Start at 07:21:20`<br>`Duration 399ms (transform 148ms, setup 109ms, import 263ms, tests 27ms, environment 0ms)` |
| `npm.cmd run test:guides` | 0 | `Test Files 1 passed (1)`<br>`Tests 50 passed \| 1 skipped (51)`<br>`Start at 07:21:21`<br>`Duration 1.18s (transform 112ms, setup 43ms, import 616ms, tests 372ms, environment 0ms)` |
| `npm.cmd run test:src:browser` — run 1 | 0 | `Test Files 2 passed (2)`<br>`Tests 349 passed \| 2 expected fail (351)`<br>`Start at 07:21:23`<br>`Duration 26.98s (transform 0ms, setup 154ms, import 129ms, tests 25.56s, environment 0ms)` |
| `npm.cmd run test:src:browser` — run 2 | 0 | `Test Files 2 passed (2)`<br>`Tests 349 passed \| 2 expected fail (351)`<br>`Start at 07:21:51`<br>`Duration 26.77s (transform 0ms, setup 160ms, import 136ms, tests 25.34s, environment 0ms)` |

The gate runner is `u6-5-gates.mjs`; its result record is `u6-5-gates.json`. The browser logs are [run 1](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-5-gate-10.log.txt) and [run 2](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-5-gate-11.log.txt). Browser evidence is bounded to managed Chromium on Windows on 2026-09-20; Edge was not run in this unit.

The deviations and permitted decisions are recorded as follows:

- **Rejected press coverage.** Expected: malformed coordinates through a reachable hold. Found: no inert route to malformed centre coordinates; the helper sends the same computed coordinates in `mouseMoved` before `mousePressed`, so malformed coordinates would reject the move first. Evidence: the real protocol rejection and marker-ordering case, plus the send ordering in `holdAccessible`. Done: moved marker creation after the awaited press and ran the boundary and ordering controls. Not done: a runtime rejection of `holdAccessible` specifically at its press send. The rejection invariant is established by source review; this is the brief's permitted fallback.
- **Restoration exhaustion coverage.** Expected: inert exhaustion evidence if reachable, otherwise review and documentation. Found: no inert input drives the path against the conforming engine. Evidence: each query and payload uses the same captured option, and the restore uses the captured pre-call payload. Done: removed the accessor fixture, guarded restoration, and documented the limit. The restoration-failure refusal voice is proved by review of the nested `try`/`catch` shape, not an executed failure case.
- **Pointer cleanup errors.** Expected: surface the park failure with the release rejection attached. Found: the prior `finally` would overwrite the release failure. Done: an `AggregateError` carries the park's message and cause, with the release rejection in `errors`. The dual-rejection branch is reviewed, not runtime-driven. The initial implementation failed lint with `preserve-caught-error` and `no-unsafe-finally`; after the owned-file fix, lint exits 0. Initial failure evidence: `u6-5-lint-initial.log.txt`.
- **Marker and wording.** Expected: choose and document a compact value. Done: chose the ordered bit string, retained existing case groups, and matched the release Summary to its TSDoc description. No recorded axis refused re-emulation.
- **Probe tooling.** Expected: use the host conditions in the governing brief. Found: the original brief declares `prove` blocked. Done: used direct browser regression controls; no probe receipt is claimed.
- **Command quoting.** Expected: select the media cases. Found: the initial `-t 'stageMedia|releaseMedia'` invocation exited 255 because the Windows command wrapper interpreted the pipe. Done: used `-t Media`; the reported red and green runs collected and executed the intended cases.

The actual cumulative [git diff](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-5-diff.patch) and [git status](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-5-status.txt) are retained. `git diff --check` exits 0. The build exposes `MEDIA_STAGE` in `dist/src/browser/index.d.ts`. The off-limits `src/browser/types.ts` and `tests/setup.ts` hashes match their pre-edit readings.

The final `git status --porcelain` output is:

```text
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```
