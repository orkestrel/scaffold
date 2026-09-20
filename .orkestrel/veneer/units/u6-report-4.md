U6 brief 4 is implemented. Every required gate exits 0, including the consecutive managed-Chromium browser runs. The working tree lists exactly the U6 files specified by the brief. No off-limits source file was edited.

The changes for this round are:

| Owned file | Diff summary |
| --- | --- |
| `src/browser/helpers.ts` | `releaseMedia` samples print, reduced motion, colour scheme, and forced colours before clearing, then waits for print to be false and consecutive unchanged readings. Exhaustion throws `Media emulation did not clear from the tester`. `stageMedia` uses a bounded wait per staged query and restores the carried pre-call medium and features on refusal, waiting for that restoration before throwing `Media emulation did not reach the tester: <query>`. Its remarks enumerate the carried axes and disclose that other emulated features are cleared. `releasePointer` removes the marker in `finally` only after a successful release send; cleanup still attempts the move to the origin. |
| `tests/src/browser/helpers.test.ts` | Adds immediate all-axis release readings, a real staged-query refusal with provider-override restoration, and a real protocol-rejection pointer retry. Colour-scheme and forced-colours cases stage the recorded host value's inverse and read restoration without an extra wait. The Patterns transcription clears emulation before recording the host preference. |
| `guides/test.md` | Aligns the release description and Summary, adds the release exhaustion voice, documents settle bounds and refusal restoration, narrows omitted-axis preservation, documents pointer retry behavior, and opens the media example's actions with `await releaseMedia()`. |

The settle readings came from `tmp/codex/u6-round4-polls.log`, recorded on 2026-09-20 at 06:53:05 on managed Chromium. Temporary counters and logging were removed before the gates. Readings below use the order `[print, reduce, dark, forced]`.

| Run observation | Readings and polls |
| --- | --- |
| All-axis release case | Before reset: `[true,true,true,true]`. Polls 1, 2, and 3: `[false,false,false,false]`. Every axis reached its recorded baseline on poll 1; release resolved on poll 3 after consecutive unchanged comparisons. |
| Refusal case's cleanup | Before reset: `[false,true,true,false]`. Poll 1: `[false,false,true,false]`. Polls 2, 3, and 4: `[false,false,false,false]`. Reduced motion cleared on poll 1; colour scheme cleared on poll 2. Print and forced colours stayed false. Release resolved on poll 4. |
| Idle release | Baseline and polls 1 and 2: `[false,false,false,false]`; release resolved on poll 2. |
| Successful stages in the instrumented run | `print`, `(prefers-reduced-motion: no-preference)`, and `(prefers-reduced-motion: reduce)` each matched on poll 1 after the retained frame wait. This run did not observe a delayed successful stage query. |

The implementation uses `waitForCondition` with its 1000 ms budget and 10 ms interval. Each release poll also awaits a frame. Stability requires 2 consecutive unchanged comparisons against the preceding reading; a changed reading resets that streak. This proves observed stability, not independent knowledge of the engine's un-emulated preferences.

The regression cases and controls establish the following:

| Case | Proof |
| --- | --- |
| `restores every media axis before the next line reads it` | Records host preferences, stages and verifies their inverses with print, calls `stageMedia`, then reads every axis immediately after `releaseMedia`, with no intervening wait. |
| `restores provider overrides when changing options leave a staged query unsatisfied` | A typed `print` accessor requests a print check and then sends screen, producing a real bounded refusal. Provider-staged inverse colour scheme and reduced motion remain readable immediately after rejection. No browser API or provider implementation is replaced. |
| `retains a rejected release marker so a corrected retry releases the held pointer` | A malformed coordinate marker produces a real CDP `Invalid parameters` rejection. The marker survives; restoring its recorded coordinates lets the next release clear the marker and `:active`. |
| Colour-scheme and forced-colours preservation cases | Each records the host reading, sends its inverse, asserts arrival, verifies preservation through a motion-only stage, and reads the recorded value directly after release. |
| Media Patterns transcription | Releases before capturing the host preference and verifies staged CSS values and immediate restoration. |

The focused red/green command was:

```text
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'retains a rejected release marker|restores every media axis|unnamed.*override'
```

Before the fix it exited 1: `2 failed | 2 passed | 290 skipped (294)`. The pointer marker was `null` instead of `invalidxinvalid`; the release reading was `[false,false,true,false]` instead of `[false,false,false,false]`. After the fix the same command exited 0: `4 passed | 290 skipped (294)`. Logs: `u6-round4-before.log` and `u6-round4-after.log` under `tmp/codex/`.

The refusal case's focused command was:

```text
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'changing options'
```

It exited 0 with `1 passed | 294 skipped (295)`. Replacing restoration with the old `await releaseMedia()` cleanup made it exit 1 with `1 failed | 294 skipped (295)` at the provider colour-scheme assertion: expected `true`, received `false`. The control edit was removed; the restored case passed in the instrumented run and every final browser-containing gate. Logs: `u6-round4-refusal.log`, `u6-round4-refusal-control.log`, and `u6-round4-polls.log` under `tmp/codex/`.

The final gate readings are recorded below. Log names are relative to `tmp/codex/`.

| Command | Exit | Final result lines | Log |
| --- | --- | --- | --- |
| `npx.cmd oxfmt --config .oxfmtrc.json --write src/browser/helpers.ts tests/src/browser/helpers.test.ts guides/test.md` | 0 | `Finished in 943ms on 3 files using 16 threads.` | `u6-round4-format.log` |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1110ms on 60 files using 16 threads.` | `u6-round4-format-check.log` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` | `u6-round4-lint-check-final.log` |
| `npm.cmd run check` | 0 | `npm notice run @orkestrel/test@0.0.18 check:src:server` / `npm notice run tsc --noEmit -p configs/src/tsconfig.server.json` | `u6-round4-check.log` |
| `npm.cmd run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` | `u6-round4-build.log` |
| `npm.cmd run test:src` | 0 | `Test Files 7 passed (7)` / `Tests 610 passed \| 2 expected fail \| 9 skipped (621)` / `Duration 38.05s` | `u6-round4-test-src.log` |
| `npm.cmd run test:policy` | 0 | `Test Files 1 passed (1)` / `Tests 101 passed \| 1 skipped (102)` / `Duration 1.80s` | `u6-round4-test-policy.log` |
| `npm.cmd run test:config` | 0 | `Test Files 1 passed (1)` / `Tests 173 passed \| 1 skipped (174)` / `Duration 3.29s` | `u6-round4-test-config.log` |
| `npm.cmd run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 24 passed (24)` / `Duration 389ms` | `u6-round4-test-setup.log` |
| `npm.cmd run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 50 passed \| 1 skipped (51)` / `Duration 1.12s` | `u6-round4-test-guides.log` |
| `npm.cmd run test:src:browser`, run 1, 06:55:45 | 0 | `Test Files 2 passed (2)` / `Tests 347 passed \| 2 expected fail (349)` / `Duration 33.64s` | `u6-round4-browser-1.log` |
| `npm.cmd run test:src:browser`, run 2, 06:56:37 | 0 | `Test Files 2 passed (2)` / `Tests 347 passed \| 2 expected fail (349)` / `Duration 33.19s` | `u6-round4-browser-2.log` |

The browser runs have identical outcome readings. No source changed between them. This round adds no skipped or expected-failure case.

The deviations and bounded decisions are:

| Expected | Found and exact evidence | Done or not done |
| --- | --- | --- |
| Consecutive stable release polls | The poll shape was discretionary. `u6-round4-polls.log` records colour scheme changing after motion had cleared. | Done: frame-separated polls and 2 consecutive unchanged comparisons; the guide states the stability bound. |
| A forced staged-query refusal | Ordinary stable boolean options address supported queries. The case's typed accessor changes from print to screen between reads and reaches `Media emulation did not reach the tester: print`. | Done: retained real-engine regression case and removed source control. Its trigger depends on repeated option reads; it does not model an ordinary stable options object. |
| A real release-send rejection | `invalidxinvalid` reaches CDP as invalid coordinates; the focused pointer case passes with the `Invalid parameters` assertion. | Done: rejection, marker retention, and corrected retry proven without replacing the sender. A transient transport outage with valid coordinates was not driven. |
| Green lint | Initial exit 1: `tests/src/browser/helpers.test.ts:1075:43: error vitest(require-to-throw-message): Require a message for "toThrow".` | Done: asserted `Invalid parameters`, verified the case, then reran formatting and lint successfully. Initial log: `u6-round4-lint-check.log`. |
| `prove` evidence | The inherited brief explicitly marks `prove` blocked in this sandbox. | Not run; no probe receipt claimed. Real Vitest red/green runs and the cleanup control supply the recorded evidence. |
| Gate diagnostics | Build/config report API Extractor's bundled TypeScript 5.9.3 against project 6.0.3. Browser logs include the existing journal fixture's deliberate `Refused` and `Ignored` diagnostics. | Gates exit 0; no unrelated changes made. |
| Unqualified status output | Git warns that `C:\Users\mikes/.config/git/ignore` is inaccessible, then reports the required paths successfully. | Done: status and diff captured; no Git writes or permission changes. |

No axis refused its requested emulated reading. No gate remained red after its owned-file fix. No hypothesis is required for these deviations. Edge was not run in this assignment.

The final review artifacts are `tmp/codex/u6-round4-final.diff`, `tmp/codex/u6-round4-final-status.txt`, this report, and the browser logs named above. `git diff --check` exits 0. The build leaves the updated browser implementation and declarations in `dist/src/browser/`.

The final `git status --porcelain` output is:

```text
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```
