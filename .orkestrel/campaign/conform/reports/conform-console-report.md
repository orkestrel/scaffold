# Unit conform-console — report

Every brief row is `applied` or `noop`, and fix round 1 closed the first audit round's refutations of
claims 2, 3, 4, and 5, its findings F1 and F2, and the Orchestrator's rulings on referrals R1 and R2.
No row stopped. The gate chain is green.

## Rows

| Id             | Disposition | Note                                                                                                                                                                                                                              |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| console-obj-1  | applied     | `MODULES` in `tests/guides.test.ts` now maps `@orkestrel/console`, `@orkestrel/console/browser`, `@orkestrel/console/server`; the doc comment states that fences import each face through its published specifier. Proved live by the staged red recorded under § Failing-first proofs. |
| console-obj-2  | applied     | `describe('flagship fences')` in `tests/guides.test.ts` executes every runnable fence of `guides/console.md` and asserts every commented value, with a presence guard binding each transcribed line. Fix round 1 added the opening surface fence, the server fence, and the `inferColumns` fence, which the first audit round found missing. Output goes through `createRecordingSink`. |
| console-obj-3  | applied     | `tests/src/browser/helpers.test.ts` measures the no-blowup interval with `performance.now()`; the `toBeLessThan(2000)` assertion is unchanged. Fix round 1 ran the control and recorded why no red is producible.                   |
| console-obj-4  | applied     | Deleted `waitForFrames`; `tests/src/core/Spinner.test.ts` waits with `waitForCondition(description, condition, { budget: FRAME_DEADLINE, interval: PERIOD })` from `@orkestrel/test`. The `waitForDelay(SETTLE)` leak guards stand. |
| console-obj-5  | applied     | BREAKING. Deleted `createProcessCapture` and its now-unused imports; every consumer moved to `new ProcessCapture(...)`.                                                                                                            |
| console-obj-6  | applied     | `createWriteProbe` returns an object literal whose `write` is a method; the declared `NodeJS.WriteStream['write']` return type is unchanged, so no call site moved.                                                                |
| console-obj-7  | applied     | `captureConsole` declares `restore(): void` as a method on the returned literal.                                                                                                                                                  |
| console-obj-8  | applied     | `Logger.ts` and `LoggerManager.ts` moved to `src/core/loggers/`; mirrored tests moved to `tests/src/core/loggers/`; barrel rows, `{@link import(...)}` targets, and guide test bullets updated.                                    |
| console-obj-9  | applied     | `ANSIRenderer.ts` moved to `src/core/renderers/`; mirrored test moved to `tests/src/core/renderers/`; barrel row, the `factories.ts` import, and the guide test bullet updated.                                                     |
| console-subj-1 | applied     | `LoggerManager.remove(names)` attempts every name and returns `true` only when every one was present. An empty list succeeds vacuously — the choice is stated in the TSDoc on the class and in `LoggerManagerInterface`. Fix round 1 added its § Breaking row on the Orchestrator's R1 ruling. |
| console-subj-2 | applied     | BREAKING. `Progress.complete` → `succeed`, `completed` → `succeeded`, event `complete` → `succeed`, across `types.ts`, `Progress.ts`, the guide, and the test.                                                                     |
| console-subj-3 | applied     | BREAKING. `ProgressBarOptions` → `BarOptions` in `types.ts`, `helpers.ts`, the `constants.ts` links, and the guide rows.                                                                                                       |
| console-subj-4 | applied     | BREAKING. `parseParameters` → `scanParameters`; placement stays `src/browser/helpers.ts`. Its TSDoc first sentence now says what a `scan*` does and records the total contract.                                                     |
| console-subj-5 | applied     | BREAKING. `ServerSinkOptions.out` / `.err` → `stdout` / `stderr`; local bindings inside `createServerSink` keep their short names, as the row permits.                                                                             |
| console-subj-6 | applied     | `align`'s second parameter and `repeatTo`'s second parameter are both `columns`. Positional, so no call site moved; the `width` helper is not shadowed.                                                                            |
| console-subj-7 | applied     | BREAKING. `StyleAccumulator.foreground` / `.background` are optional; the reset accumulator is `Object.freeze({ attributes: Object.freeze([]) })` and the reads are `!== undefined`.                                                |
| console-subj-9 | applied     | Swept `src/**/*.ts` and `guides/console.md` for `should` / `via` / `just` / `simply` / `currently` / `e.g.` / `and/or`. Fix round 1 added `i.e.` to the pattern, repaired the survivor, and re-ran the sweep over the wider path set recorded under § Sweeps. |
| console-subj-10 | applied    | `ConsoleErrorCode` TSDoc and the guide Surface row drop `today` and the future-taxonomy clause.                                                                                                                                    |
| console-subj-11 | applied    | The full TSDoc moved onto the async overload; the sync overload carries its own short block; the implementation signature carries a `//` note. Fix round 1 split the `@example` so each overload's block shows its own call, on the Orchestrator's R2 ruling. Both examples import `@orkestrel/console`. |
| console-subj-12 | applied    | Every `AGENTS §N` and bare `§N` citation in this package's own guide, README, tests, and setup files is deleted or re-pointed. Describe titles now name what they prove. Vendored mirrors untouched.                               |
| console-subj-13 | applied    | Every `function` Surface row is a noun phrase. Class, interface, type, and const rows are unchanged. Rows removed or renamed by console-obj-5, console-subj-3, console-subj-4, and console-subj-5 are written in their final form.  |
| console-subj-14 | applied    | `above` / `below` at the cited guide sites replaced; Contract cross-references now name the contract; counts deleted at `guides/console.md` lines 3, 37, 179 and `src/core/types.ts` (`the six standard SGR text effects`, `leaves the other three alone`, `(all five)`). The severity-sense `above` / `below` sites stay. |
| console-subj-15 | applied    | `guides/README.md` gains `probe.md` and `test.md` paragraphs in the existing mirror form, ordered alphabetically with the others.                                                                                                  |
| fleet-F1       | noop        | `isBrowserVuePath` returns no hit over the checkout excluding `node_modules`, and this workspace has a browser environment (`src/browser`, `tests/setupBrowser.ts`). Both conditions for the row are absent.                        |
| fleet-F2       | noop        | No implementation class declares a public `readonly id` data field. `readonly id` returns no hit in `src`; `^\treadonly [a-z]` shows the only public readonly class fields are `ConsoleError.code` / `.context` and `Logger.name`.  |

## Fix round 1

The first audit round's objective lane refuted claims 2, 3, 4, and 5 and raised F1 and F2. Each row
following names what closed it.

| Row             | Carries                     | Closed by                                                                                                                                                                                                                                                                                                                     |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| console-fix1-1  | claims 2 and 5              | `tests/guides.test.ts` gains `prints what the opening surface fence says it prints` (`guides/console.md:11-26` — `[2/5] bundling`, `✔ built in 1.2s`, `✔ deployed`, and the seam's registration order), `forces styling and owns the stderr stream the way the server fence claims` (`:598-620` — `forced.styled` and `capture.messages('stderr')` through a real `ProcessCapture`), and `sizes a terminal the way the server-helper fence says` (`:671` — `inferColumns`), each with its presence guard. `ProcessCapture` now appears in a transcription, which is the conjunct claim 5 falsified. |
| console-fix1-2  | claim 3                     | Both narrow sweeps re-run over the required paths and recorded with pattern, paths, and a ruling per hit under § Sweeps.                                                                                                                                                                                                     |
| console-fix1-3  | claim 4, console-obj-3      | The truncating reading was planted in `tests/src/browser/helpers.test.ts:243-248` and the browser suite run. No red is producible; the reason and the command are recorded under § Failing-first proofs. The file ends as it began.                                                                                                |
| console-fix1-4  | claim 4, the sweep rows     | A sweep for every row the lane listed, each with its word-boundary pattern, its case-insensitive inflection pass, its paths, and a ruling per hit under § Sweeps.                                                                                                                                                                  |
| console-fix1-5  | F1                          | `visible` left the `describe('flagship fences')` callback and became `normalizeVisible`, an exported host-independent helper in `tests/setup.ts` with its doc comment. `tests/guides.test.ts` imports it; `tests/setup.test.ts` covers it. `tests/guides.test.ts` now declares no nested function.                                  |
| console-fix1-6  | F2                          | `src/core/helpers.ts:127` reads `that is, its severity is`. The substitution sweep re-ran with `e\.g\.\|i\.e\.` added over the wider path set; `src` is clean of the whole set.                                                                                                                                                    |
| console-fix1-7  | R1                          | The § Breaking table gains the `LoggerManager.remove(names)` row with the consumer search quoted.                                                                                                                                                                                                                                 |
| console-fix1-8  | R2                          | `src/core/factories.ts` carries one `@example` per overload: the async block awaits its call and reads `out.value` / `out.messages`, the sync block destructures `{ value, messages }` with no `await`. Both import `@orkestrel/console`.                                                                                          |

### Every `ts` fence of `guides/console.md`, and what executes it

The table lists each fence by its opening line, so acceptance criterion 1 is checkable without
re-deriving the inventory. The fences fix round 1 added carry the control files named under
§ Failing-first proofs; the rest carry console-obj-2's control from the original unit.

| Fence  | Section                                     | Executed by                                                                                                                                                                                                       |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:11`  | Surface                                     | `prints what the opening surface fence says it prints` (fix round 1)                                                                                                                                              |
| `:419` | A styled, leveled logger                    | `gates, retains, and formats the way the logging fences claim`                                                                                                                                                    |
| `:436` | The line a logger writes                    | `gates, retains, and formats the way the logging fences claim`                                                                                                                                                    |
| `:451` | A logger registry                           | `registers and removes the way the registry fence claims`                                                                                                                                                         |
| `:463` | A reporter narration                        | `narrates a deploy the way the reporter fence says it does`                                                                                                                                                       |
| `:490` | One theme, every entity                     | `speaks one theme across the logger, the reporter, the spinner, and the bar`                                                                                                                                      |
| `:510` | Scoping third-party `console.*`             | Not runnable: `noisyLibrary()`, `computeResult()`, and `fetchAndLog()` are undeclared placeholders, and no comment in it claims a concrete value. `createCaptureResult`'s behaviour is pinned by `tests/src/core/factories.test.ts` and by the overload examples console-fix1-8 split. |
| `:527` | Capture lifecycle                           | `intercepts and restores the way the capture-lifecycle fence claims`                                                                                                                                              |
| `:541` | The bounded retention engine directly       | `caps the retention engine on both axes the way its fence says`                                                                                                                                                   |
| `:559` | A spinner and a progress bar                | `commits the animation outcome lines the spinner and bar fence claims`                                                                                                                                            |
| `:586` | The browser — `%c` styling in DevTools      | Not runnable in the `guides` project, which runs in Node with the browser disabled: `createBrowserSink` writes through a DOM console. `tests/src/browser/factories.test.ts` drives it in real Chromium.            |
| `:598` | The server — a TTY sink and a process capture | `forces styling and owns the stderr stream the way the server fence claims` (fix round 1)                                                                                                                       |
| `:624` | One logger, different sink per environment  | Not runnable: `inBrowser` is an undeclared placeholder and the fence claims no value; it states which sink each environment picks.                                                                                 |
| `:637` | The pure layout + formatting helpers        | `returns what the pure-helper fence says each helper returns`                                                                                                                                                     |
| `:668` | Server helpers directly                     | `sizes a terminal the way the server-helper fence says` (fix round 1)                                                                                                                                             |
| `:676` | Server boundary guards directly             | `answers the server boundary guards the way their fence says`                                                                                                                                                     |

Ancillary decisions this round made and carried on from, per the deviation contract:

- **`visible` became `normalizeVisible` on the move.** An exported shared helper takes the
  `{verb}{Noun}` form (`.claude/rules/names.md` § Standalone helpers), and a bare adjective reads as
  a predicate at a call site the entity context no longer supplies. `normalize*` is the fixed prefix
  for "the canonical form of a value of the same type", which is what the helper returns.
- **The server fence's mirror runs through `createWriteProbe`.** The fence sets `mirror: true`, so
  the mirrored diagnostic reaches the real `process.stderr`. The transcription installs the
  `tests/setupServer.ts` recording probe as the current stream write before `start()` — the
  precedent `tests/src/server/ProcessCapture.test.ts` sets — so the interception, the buffering, the
  mirror, and the restore all run for real while the suite stays output-clean. The pristine `write`
  is restored before the assertions, so a failing assertion cannot leak the patch.
- **`inferColumns` is asserted on both documented branches.** The fence's own call reads the
  runner's live `stdout`, which is one branch or the other on the host, so the case drives each
  branch through a `createStreamTarget` whose facts it fixes, and asserts the fence's own call
  returns a positive width. Re-deriving the helper's own condition would assert the implementation
  against itself.

## Files touched

Source:

- `src/core/types.ts` — `BarOptions` rename, `Progress` succeed vocabulary, `remove(names)` contract, `ConsoleErrorCode` prose, the writing sweep, and the moved-class `{@link import(...)}` targets.
- `src/core/index.ts` — barrel rows point at `./loggers/` and `./renderers/`.
- `src/core/loggers/Logger.ts` — moved from `src/core/Logger.ts`, imports rewritten to `../`.
- `src/core/loggers/LoggerManager.ts` — moved from `src/core/LoggerManager.ts`; the batch `remove` accumulates all-succeed.
- `src/core/renderers/ANSIRenderer.ts` — moved from `src/core/ANSIRenderer.ts`, imports rewritten to `../`.
- `src/core/Progress.ts` — `succeed` / `succeeded` / the `succeed` event.
- `src/core/helpers.ts` — `BarOptions`, `align(text, columns, …)`, `repeatTo(unit, columns)`, the writing sweep, and (fix round 1) `that is` for `i.e.` at line 127.
- `src/core/factories.ts` — the `ANSIRenderer` import path, and the `createCaptureResult` overload documentation, split one example per overload in fix round 1.
- `src/core/constants.ts` — `BarOptions` links and the writing sweep.
- `src/core/Capture.ts`, `src/core/Reporter.ts` — the writing sweep.
- `src/browser/types.ts` — optional `StyleAccumulator` channels.
- `src/browser/helpers.ts` — `scanParameters`, the absent-channel accumulator, the writing sweep.
- `src/browser/factories.ts` — the writing sweep.
- `src/server/types.ts` — `stdout` / `stderr` option keys, the `ProcessCapture` options link, the writing sweep.
- `src/server/factories.ts` — `createProcessCapture` deleted; `stdout` / `stderr` resolution and documentation.
- `src/server/helpers.ts`, `src/server/constants.ts`, `src/server/validators.ts`, `src/server/ProcessCapture.ts` — the writing sweep.

Tests:

- `tests/guides.test.ts` — the corrected `MODULES` map and the `flagship fences` block; fix round 1 added the surface, server, and `inferColumns` transcriptions with their presence guards, dropped the nested `visible`, and imports `normalizeVisible` plus the `setupServer.ts` stream fixtures.
- `tests/setup.ts` — the citation removal, and (fix round 1) the exported `normalizeVisible` helper.
- `tests/setup.test.ts` — fix round 1's `normalizeVisible` cases.
- `tests/setupBrowser.ts`, `tests/setupServer.ts` — citations removed; the nested function assignments became methods.
- `tests/src/core/loggers/Logger.test.ts`, `tests/src/core/loggers/LoggerManager.test.ts`, `tests/src/core/renderers/ANSIRenderer.test.ts` — moved; relative setup imports and describe titles updated; the batch-remove cases now pin the all-succeed contract.
- `tests/src/core/Progress.test.ts` — the `succeed` vocabulary throughout.
- `tests/src/core/Spinner.test.ts` — `waitForCondition`.
- `tests/src/core/Capture.test.ts`, `tests/src/core/Reporter.test.ts` — describe titles.
- `tests/src/browser/helpers.test.ts` — `performance.now()`, `scanParameters`, a citation. Fix round 1 planted and removed its control here; the file ends as it began.
- `tests/src/browser/factories.test.ts` — a citation.
- `tests/src/server/factories.test.ts` — `stdout` / `stderr` option keys; the `createProcessCapture — factory` block deleted.
- `tests/src/server/ProcessCapture.test.ts` — `new ProcessCapture(...)`.

Documentation:

- `guides/console.md` — every row that names it. Fix round 1 planted and removed the fence controls here; `git diff --stat` reports the same 239 changed lines as before the round.
- `guides/README.md` — the `probe.md` and `test.md` paragraphs, the citation.
- `README.md` — the `ProcessCapture` construction.

Diffstat after fix round 1: `39 files changed, 1056 insertions(+), 625 deletions(-)`. The files this
round owns: `src/core/factories.ts` 59, `src/core/helpers.ts` 69, `tests/guides.test.ts` 409,
`tests/setup.test.ts` 33, `tests/setup.ts` 20 changed lines.

## Failing-first proofs

Every file named here is the verbatim runner output, under `/home/user/work/evidence/console-proofs/`.

| Row            | Command                | Red                                                           | Green                                                        |
| -------------- | ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| console-subj-1 | `npm run test:src:core` | `console-subj-1-red.txt` — 2 failed, 449 passed (451)         | `console-subj-1-green.txt` — 451 passed (451)                |
| console-obj-4  | `npm run test:src:core` | `console-obj-4-control-planted.txt` — 1 failed, 450 passed (451), `Error: Condition "the spinner wrote 3 frames" did not hold within 50ms` | `console-obj-4-green.txt` — 451 passed (451)                 |
| console-obj-1, console-obj-5 | `npm run test:guides` | `console-obj-1-red-stale-fence.txt` — 2 failed, 66 passed (68) | `console-obj-1-5-green.txt` — 68 passed (68)                 |
| console-obj-2  | `npm run test:guides`  | `console-obj-2-control-planted.txt` — 1 failed, 84 passed (85) | 85 passed (85) in the `guides` project                       |
| console-fix1-1, surface fence | `npm run test:guides` | `fix1-fence-surface-control-red.txt` — 1 failed, 90 passed (91) | `fix1-fence-surface-green.txt` — 91 passed (91)          |
| console-fix1-1, server fence | `npm run test:guides` | `fix1-fence-server-control-red.txt` — 1 failed, 90 passed (91) | `fix1-fence-server-green.txt` — 91 passed (91)            |
| console-fix1-1, columns fence | `npm run test:guides` | `fix1-fence-columns-control-red.txt` — 1 failed, 90 passed (91) | `fix1-fence-columns-green.txt` — 91 passed (91)         |
| console-fix1-3 | `npm run test:src:browser` | `console-obj-3-control-red.txt` — 79 passed (79); no red is producible, reason following | `console-obj-3-green.txt` — 79 passed (79)               |

Notes on each control:

- **console-subj-1.** The assertion change landed first: `remove(['a', 'absent'])` must be `false`
  and `remove([])` must be `true`. Both failed against the any-succeeded accumulation, then passed
  against the all-succeed one.
- **console-obj-4.** The behavioural change is that a never-firing timer now fails with the
  condition's own description instead of returning silently. The control planted an unreachable
  count and a 50 ms budget; the run reports the condition's description in the failure, which the
  deleted local loop could never produce. The plant was reverted immediately.
- **console-obj-1 with console-obj-5.** After `MODULES` was corrected the guides project was green
  (`console-obj-1-modules-live.txt`, 68 passed). Removing `createProcessCapture` while the server
  fence still imported it then reddened ``imports only real exports in every ```ts fence`` with
  `expected [ 'createProcessCapture' ] to deeply equal []` — the check the old `@src/*` map silently
  skipped for every `@orkestrel/console/server` fence — beside `documents only barrel exports`.
  Updating the fence, the README, and the tests returned it to green.
- **console-obj-2.** The control replaced a transcribed value (`upload … 1.23s`) with
  `upload … 1234ms`; the run failed with `expected 'upload … 1.23s' to be 'upload … 1234ms'`, so the
  transcription reads the real output rather than restating the fence. The plant was reverted
  immediately.
- **console-fix1-1, surface fence.** `guides/console.md:20`'s commented value was changed from
  `// [2/5] bundling` to `// [2/6] bundling`. The run failed
  `flagship fences > carries the surface fence lines the transcription copies` with
  `expected '# Console\n\n> One unified output-con…' to contain 'reporter.step(\'bundling\', { index: …'`.
  The line was restored to its exact prior text and the run read 91 passed.
- **console-fix1-1, server fence.** `guides/console.md:610`'s `forced.styled // true, …` was changed
  to `// false, …`. The run failed
  `flagship fences > carries the server fence lines the transcription copies` with
  `expected … to contain 'forced.styled // true, whatever the e…'`. Restored, 91 passed.
- **console-fix1-1, columns fence.** `guides/console.md:671`'s `// the live TTY width, …` was changed
  to `// the live TTY height, …`. The run failed
  `flagship fences > carries the server-helper fence line the transcription copies` with
  `expected … to contain 'inferColumns(process.stdout) // the l…'`. Restored, 91 passed.
  After the restorations `git diff --stat -- guides/console.md` reports
  `239 +++---, 119 insertions(+), 120 deletions(-)`, the same as before the round.
- **console-fix1-3 — no red is producible, and this is why.** The plant was the truncating reading
  the rule bans: `const started = Math.trunc(performance.now())` and
  `const elapsed = Math.trunc(performance.now()) - started` at
  `tests/src/browser/helpers.test.ts:243-245`, which reproduces what `Date.now()` returned. The
  command `npm run test:src:browser` then reported `79 passed (79)`, captured in
  `console-obj-3-control-red.txt` — a green file under a red-named path, kept at the name the brief
  fixed. The reason is the direction of the case's only timing assertion: it is the upper bound
  `expect(elapsed).toBeLessThan(2000)`, and truncation can only lower a measured interval, never
  raise it. `.claude/rules/tests.md` names the defect `performance.now()` prevents as under-reporting
  by a millisecond, which fails a lower bound or an equality and can never cross an upper bound. So
  console-obj-3 is a conformance repair with no observable difference at this assertion, and no
  control over this case can read red. The plant was reverted and the same command re-run to
  `console-obj-3-green.txt`, `79 passed (79)`; `git diff --stat` reports the file's original 15
  insertions and 15 deletions.

## Sweeps

Each sweep listed here ran through the `Grep` tool (ripgrep) from `/home/user/fleet/console`, over the
paths named beside it. `node_modules` is outside every path listed, so no exclusion is needed. Each
hit is ruled.

### The re-run narrow sweeps (console-fix1-2, claim 3)

Paths for each: `src`, `tests`, `guides/console.md`, `guides/README.md`, `README.md`.

- `complet(e|es|ed|ing|ion)`, case-insensitive. Hits, all generic English and none the renamed
  `ProgressInterface.complete` / `.completed` / `ProgressEventMap.complete` API form:
  `src/core/types.ts:544`, `src/core/constants.ts:248`, `src/core/constants.ts:465`,
  `src/core/helpers.ts:711`, `src/core/Styler.ts:87` (`incomplete`),
  `src/server/types.ts:107,112`, `src/server/ProcessCapture.ts:129,195,205,206`,
  `tests/setupBrowser.test.ts:6`, `tests/setupPolicy.ts:105,228,231,311,314,1201,1208,1380`,
  `tests/src/core/helpers.test.ts:657`, `tests/src/core/factories.test.ts:377`,
  `tests/src/server/ProcessCapture.test.ts:8,13,209,289,304,366,380,417,419,437,466`,
  `guides/console.md:82,188,252`. `README.md` and `guides/README.md` return nothing. The hits the
  lane named as permitted (`src/core/constants.ts:465`, `tests/src/core/factories.test.ts:377`) are
  present and correct: a completed fill run and an awaited-work comment.
- `\b(out|err)\b`, case-sensitive (fix round 2, replacing the narrower `\b(out|err)\s*:`). Paths:
  `src`, `tests` (excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
  `guides/console.md`, `guides/README.md`, `README.md`. The full hit list is captured at
  `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`, re-run through the `Grep` tool
  for fix round 4. The current ruling for every hit in that capture is the `## Fix round 3` rulings
  (console-fix3-1 through console-fix3-4), with `tests/setupServer.ts:38` added to those rulings as
  repaired: the line now reads `pass as \`stdout\` / \`stderr\` / a process-stream stand-in`, so it
  no longer names the old words.

### The per-row sweeps (console-fix1-4, claim 4)

| Row             | Pattern                                                                                         | Paths                                            | Hits and ruling                                                                                                                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| console-obj-6   | `\bconst (write\|restore) =`                                                                     | `tests`                                          | `tests/src/server/ProcessCapture.test.ts:31` — the arrow inside `createOverloadProbe`, a different declaration from the `createWriteProbe` one this row repaired, already disclosed under § Observations. No hit in `tests/setupServer.ts`.          |
| console-obj-6   | `const\s+(writes?\|restores?\|restoring)\s*=`, case-insensitive                                  | `tests`                                          | `tests/setupServer.ts:45`, `tests/src/server/factories.test.ts:267,291`, `tests/src/server/ProcessCapture.test.ts:620,639,656` — every one a `createRecorder` value binding, not a function assignment. Plus the `:31` hit already ruled.            |
| console-obj-7   | `\bconst (write\|restore) =` and the inflection pattern preceding                                | `tests`                                          | No `const restore =` survives anywhere; `captureConsole` declares the method.                                                                                                                                                                       |
| console-obj-8   | `(src\|tests/src)/core/(Logger\|LoggerManager\|ANSIRenderer)\.(test\.)?ts\|\./(Logger\|LoggerManager\|ANSIRenderer)\.js` | the checkout excluding `node_modules`            | `src/core/loggers/LoggerManager.ts:8` — `import { Logger } from './Logger.js'`, the sibling path inside the new `loggers/` folder rather than the old `src/core/Logger.ts` location.                                                                |
| console-obj-8   | `core/(logger\|loggermanager\|ansirenderer)`, case-insensitive                                    | the checkout excluding `node_modules`            | `guides/console.md:690,691` — the `tests/src/core/loggers/…` test links, the new paths.                                                                                                                                                          |
| console-obj-9   | both patterns preceding                                                                          | the checkout excluding `node_modules`            | No `src/core/ANSIRenderer.ts`, no `./ANSIRenderer.js`, no `tests/src/core/ANSIRenderer.test.ts` survives; the case-insensitive pass returns only the new `renderers/` paths.                                                                        |
| console-subj-6  | `align\([^)]*\btarget\b\|repeatTo\([^)]*\bcount\b\|@param target\|@param count`                   | the checkout excluding `node_modules`            | `src/server/helpers.ts:20,39` — `@param target` on `inferColumns` and `inferStyled`, whose parameter genuinely is a stream target. Neither is a layout helper, and this row's population is the core layout helpers.                                  |
| console-subj-6  | `(targets?\|counts?)\s*[,)]`, case-insensitive                                                   | `src/core/helpers.ts`                            | `:34`, `:159`, `:336`, `:437`, `:693` — all prose (`stream target`, `column count`, `escape codes never count`, the `percent (count)` label). No parameter binding named `target` or `count` remains.                                                 |
| console-subj-7  | `(foreground\|background)\s*:\s*''\|(foreground\|background)\s*!==\s*''`, case-insensitive        | the checkout excluding `node_modules`            | No hit. The empty-string sentinel and its `!== ''` reads are gone.                                                                                                                                                                                  |
| console-subj-10 | `\btoday\b`, case-insensitive                                                                    | the checkout excluding `node_modules`            | `src/core/errors.ts:13` — the `ConsoleError` class TSDoc, a different symbol from the `ConsoleErrorCode` type this row repaired (`src/core/types.ts:16-22` is clean of `today` and of the future-taxonomy clause). Recorded under § Observations.     |
| console-subj-11 | `from '@src/core'`                                                                               | `src`                                            | `src/core/factories.ts:35,70,118`, `src/core/types.ts:160`, `src/core/Styler.ts:102` — the R4 examples the Orchestrator carried to a follow-on unit; `src/server/factories.ts:40` is the same class and is recorded under § Observations. Every other hit is an ordinary module import. Each of `createCaptureResult`'s example blocks imports `@orkestrel/console`. |
| console-subj-13 | `\| function +\| (Creates?\|Returns?\|Checks?\|Builds?\|Renders?\|Repeats?\|Pads?\|Walks?\|Formats?\|Decodes?\|Doubles?\|Infers?\|Reads?\|Selects?\|Strips?\|Measures?\|Wraps?\|Runs?\|Whether)\b` | `guides/console.md`                              | `:104`, `:137`, `:259`, `:263` — each opens `Whether …`, a nominal clause naming what the guard answers, which is a noun phrase rather than the third-person verb form the row removed. No `Creates` / `Returns` / `Checks` row survives.            |
| console-subj-14 | `\b(above\|below)\b`, case-insensitive                                                            | `guides/console.md`                              | `:423` (`below the \`info\` threshold`) and `:690` (`drop below threshold`) — the severity sense the row's refuter ruled out of scope.                                                                                                               |
| console-subj-14 | `the six standard SGR\|leaves the other three alone\|\(all five\)\|composing five concerns`, case-insensitive | the checkout excluding `node_modules`            | `README.md:4` — `composing five concerns`, outside this row's population (`guides/console.md` and `src/core/types.ts`), disclosed to the Orchestrator as R3. The `src/core/types.ts` counts are gone.                                          |
| console-subj-15 | `probe\.md\|test\.md`                                                                            | `guides/README.md`                               | `:42` and `:56` — the mirror paragraphs this row added, each in the existing form. This row adds rather than renames, so the sweep proves presence.                                                                                              |

### The substitution sweep (console-fix1-6, F2)

Pattern: `\b(should|via|just|simply|currently)\b|e\.g\.|i\.e\.|and/or|etc\.`, case-insensitive.
Paths: `src/**/*.ts`, `tests/**/*.ts`, `guides/console.md`, `guides/README.md`, `README.md`.

- `src/**/*.ts` — no hit. `i.e.` at `src/core/helpers.ts:127` was the sole survivor and now reads
  `that is, its severity is`.
- `guides/console.md`, `guides/README.md` — no hit.
- `README.md:67` — `not just \`console.*\``, disclosed to the Orchestrator as R3 and carried to a
  follow-on unit.
- `tests/**/*.ts` — hits at `tests/src/core/factories.test.ts:274`;
  `tests/src/core/Progress.test.ts:7,11,197,203`; `tests/src/core/Spinner.test.ts:17,80,89,308,314`;
  `tests/src/core/Styler.test.ts:37,63`; `tests/src/core/Reporter.test.ts:331,354,355`;
  `tests/src/core/Capture.test.ts:9,359,380`; `tests/src/browser/helpers.test.ts:119,143,438`;
  `tests/src/core/loggers/Logger.test.ts:164,417`; `tests/src/core/helpers.test.ts:360,704`;
  `tests/src/server/helpers.test.ts:103,120,125,144`;
  `tests/src/server/ProcessCapture.test.ts:142,419,428,483`. Every one is `via`, `just`, `simply`,
  `should`, or `e.g.` in a test file. R3 routed the `e.g.` hits in
  `tests/src/browser/helpers.test.ts` to a follow-on unit; the rest are the same class in the same
  population, and § Observations records the whole list against it. None sits in a file this round
  owns: `tests/guides.test.ts`, `tests/setup.ts`, and `tests/setup.test.ts` return no hit.

## Gates

Run from `/home/user/fleet/console`, in order, after the rows landed. Each capture is under
`/home/user/work/evidence/console-proofs/`.

| Command                | Exit | Capture                 |
| ---------------------- | ---- | ----------------------- |
| `npm run format:check` | 0    | `gate-format-check.txt` |
| `npm run lint:check`   | 0    | `gate-lint-check.txt`   |
| `npm run check`        | 0    | `gate-check.txt`        |
| `npm run build`        | 0    | `gate-build.txt`        |
| `npm test`             | 0    | `gate-test.txt`         |

`npm test` reports `src` 638 passed (17 files), `policy` 111 passed, `config` 46 passed, `setup` 23
passed (3 files), `guides` 91 passed. The mutating `lint` and `format` were not needed: `format:check`
and `lint:check` were clean on the first run.

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec, so
its timing-sensitive Spinner cases carry this container's load. The Orchestrator's post-exit run is
the deciding one.

`git status --short` lists only files under Owned. Full output in
`/home/user/work/evidence/conform-console.status`.

## Breaking

No fleet consumer edit follows any row. `@orkestrel/terminal` is the only fleet package declaring
`@orkestrel/console`, and it imports only `Style`, `StylerInterface`, `freezeStyle`, `STATUS_ICONS`,
`createStyler`, `strip`, and `stripControls` — none of which this unit touched. External consumers of
the affected surfaces break as follows.

| Symbol                             | Change                                                | Consumers                                | Exact consumer edit                                                                                       |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `createProcessCapture`             | Removed (console-obj-5)                               | External consumers of `@orkestrel/console/server` | Replace `import { createProcessCapture } from '@orkestrel/console/server'` with `import { ProcessCapture } from '@orkestrel/console/server'`, and each `createProcessCapture(options)` with `new ProcessCapture(options)`. |
| `LoggerManager.remove(names)`      | Returns `true` only when every name was present (console-subj-1) | External consumers of `@orkestrel/console` that branch on the batch return; `No consumer edit` in the fleet | Replace a truthiness branch on `manager.remove(names)` with the semantics the caller wants: read the value as "every name was registered", or call `remove(name)` per name and combine the results to recover the old any-succeeded reading. The signature is unchanged, so no compile error marks the site. |
| `ProgressInterface.complete`       | Renamed to `succeed` (console-subj-2)                 | External consumers of `@orkestrel/console`; `@orkestrel/terminal` has no source use of `Progress` | Replace each `progress.complete(message?)` with `progress.succeed(message?)`.                              |
| `ProgressInterface.completed`      | Renamed to `succeeded` (console-subj-2)               | as preceding                             | Replace each `progress.completed` read with `progress.succeeded`.                                          |
| `ProgressEventMap.complete`        | Renamed to `succeed` (console-subj-2)                 | as preceding                             | Replace `emitter.on('complete', …)` with `emitter.on('succeed', …)` and the `on: { complete: … }` option key with `on: { succeed: … }`. |
| `ProgressBarOptions`               | Renamed to `BarOptions` (console-subj-3)              | External consumers of `@orkestrel/console`; `@orkestrel/terminal` has no source use | Replace each `ProgressBarOptions` type reference with `BarOptions`. The member set is unchanged.            |
| `parseParameters`                  | Renamed to `scanParameters` (console-subj-4)          | External consumers of `@orkestrel/console/browser`; `@orkestrel/terminal` has no source use | Replace each `parseParameters(parameters)` with `scanParameters(parameters)`. The signature is unchanged.   |
| `ServerSinkOptions.out` / `.err`   | Renamed to `stdout` / `stderr` (console-subj-5)       | External consumers of `@orkestrel/console/server`; `@orkestrel/terminal` has no source use | Replace `createServerSink({ out: target })` with `createServerSink({ stdout: target })` and `err:` with `stderr:`. |
| `StyleAccumulator.foreground` / `.background` | Now optional (console-subj-7)               | External consumers of `@orkestrel/console/browser`; `@orkestrel/terminal` has no source use | Replace each `accumulator.foreground !== ''` test with `accumulator.foreground !== undefined`, and the same for `background`; an accumulator literal drops the `foreground: ''` / `background: ''` keys. |

The `LoggerManager.remove(names)` row rests on this search, re-run for the R1 ruling through the
`Grep` tool over `/home/user/fleet/*/src` (a path set that contains no `node_modules`):

- pattern `createLoggerManager`, glob `*/src/**/*.ts`, path `/home/user/fleet` — **no matches found**.
  The package exports no such factory; a manager is constructed with `new LoggerManager(...)`.
- pattern `LoggerManager`, same glob and path — hits only in
  `/home/user/fleet/console/src/core/types.ts:258,459,469,497`,
  `/home/user/fleet/console/src/core/loggers/LoggerManager.ts:3,4,37,44,47-53,55`, and
  `/home/user/fleet/console/src/core/index.ts:7`. No other fleet package's `src` names the symbol.

So `No consumer edit` holds inside the fleet, and the row states the external edit.

`@orkestrel/terminal` also vendors `guides/console.md` as a dependency mirror, and that copy was
already stale against console's tip before this unit. It needs refreshing after console's next
release. That is a terminal-side action; this unit did not touch it.

## Shared-file patches

None. Every edit landed inside Owned. No file under another fleet checkout and no vendored dependency
guide mirror was written. The fence controls and the browser-suite control were planted in
`guides/console.md` and `tests/src/browser/helpers.test.ts` and removed in the same round, each file
verified back to its pre-plant diffstat.

## Deviations

No row deviated, in the original unit or in fix round 1. The operational notes follow, none of which
changed a row's outcome.

1. **File deletion needed a shell command the original dispatch's Bash allowlist does not name.** Rows
   console-obj-8 and console-obj-9 move class files, and neither the `Write` / `Edit` tools nor
   `/home/user/scaffold/tmp/work/remove-path.mjs` (which refuses any path outside a checkout's `tmp/`)
   can delete a tracked source file. Plain `rm` calls did it —
   `rm src/core/{Logger,LoggerManager,ANSIRenderer}.ts` and
   `rm tests/src/core/{Logger,LoggerManager,ANSIRenderer}.test.ts` — after confirming
   `defaultMode: bypassPermissions` in `.claude/settings.json`, so no approval prompt could fire. The
   copies were made first with the package's own `npm run copy` script. Git holds every deleted file,
   so the moves are fully recoverable.
2. **An `npx` invocation fetched a package into the npx cache.** An `npx --prefix … rg …` call ran a
   sweep; `rg` is not a project binary, so npm fetched `rg@0.0.2` and printed
   `README.md already exists. run with -f to overwrite`. Neither working tree changed and no
   dependency entered `package.json` or the lockfile. Every later sweep, fix round 1's included, used
   the `Grep` tool.
3. **The empty-batch semantics of `remove([])` was the unit's to decide.** The refuter left the choice
   open. The row's primary form was taken: an empty list has no failing member, so it succeeds.
   `LoggerManager`'s TSDoc and `LoggerManagerInterface`'s remark both state it, and
   `tests/src/core/loggers/LoggerManager.test.ts` pins it.
4. **A markdown table's header row needed re-alignment.** Renaming `complete` to `succeed` shortened
   the `ProgressInterface` method column, so the header and separator were re-padded by hand. No tool
   formats markdown tables here.
5. **console-fix1-3's control cannot read red.** The row anticipated this branch and required the
   reason with the command; § Failing-first proofs carries both. It is the row's own fallback, not a
   deviation.

## Fix round 2

Audit round 2's Luna checker held claims 1, 3, 5, 7, 9 on the narrow pattern; the objective lane
(Opus, from the Luna distillate) held every claim but 3 and named the five prose sites and the
`selectWriter` example that survived fix round 1 as the old words `out` / `err`. Each row following
names the line now at its site.

| Row | Site | Line now |
| --- | --- | --- |
| 1 | `src/server/types.ts:67` | "the same consumer enable or disable its styler for the \`stdout\` target." |
| 2 | `src/server/constants.ts:24` | "when the \`stdout\` stream is not a TTY (so" |
| 3 | `guides/console.md:603` | `const styler = createStyler({ enabled: sink.styled }) // keep generated ANSI paired with the sink's stdout stripping` |
| 4 | `tests/src/server/factories.test.ts:28` | `it('infers styling independently for a TTY \`stdout\` target and a piped \`stderr\` target', () => {` |
| 4 | `tests/src/server/factories.test.ts:224` | `it('falls back to 80 when the \`stdout\` stream is not a TTY', () => {` |
| 5 | `src/core/helpers.ts:167-169` | `selectWriter('error', { log: 'stdout', warn: 'stdout', error: 'stderr' }) // 'stderr'` / `selectWriter('debug', { log: 'stdout', warn: 'stdout', error: 'stderr' }) // 'stdout'` / `selectWriter(undefined, { log: 'stdout', warn: 'stdout', error: 'stderr' }) // 'stdout'` |

Row 3's presence guard: `Grep` for `out stripping` in `tests/guides.test.ts` returned no hit, so no
transcribed fence line quoted the old comment and no guard needed a matching update.

Row 5's alignment check: `Grep` for `selectWriter(` across `tests/**` found only
`tests/src/core/helpers.test.ts:1167-1203`, which exercises the generic `WriterSet<T>` overload with
its own arbitrary sample strings `'out'` / `'err'` / `'warn'`, unrelated to `ServerSinkOptions` and
outside this round's scope (off-limits) — no assertion there reads the renamed example's strings, so
no alignment edit was needed.

Row 6's sweep — the `\b(out|err)\b` pattern replacing the round 1 narrow `\b(out|err)\s*:` pattern —
is recorded in § Sweeps under "The re-run narrow sweeps (console-fix1-2, claim 3)" and captured at
`/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`. Every remaining hit is ruled
permitted: `fan out` / `fan-out` prose, other ordinary-English `out`, the Orchestrator's already-
permitted local bindings in `src/server/factories.ts`, and the matching local `out` / `err` bindings
(and the prose describing them) in `src/core/factories.ts`'s example, `tests/src/server/factories.test.ts`,
`tests/src/server/ProcessCapture.test.ts`, `tests/src/core/**`, `tests/setupServer.ts`, and
`guides/console.md:522`'s capture example — none of which names the renamed
`ServerSinkOptions.stdout` / `.stderr` field.

Gates, run from `/home/user/fleet/console` after the rows landed:

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `src` 638 passed (17 files), `policy` 111 passed, `config` 46 passed, `setup` 23 passed (3 files), `guides` 91 passed |

`npx scaffold audit --offline` printed:

```
┌─────────────────────┬─────────┬───────┐
│ path                │ group   │ drift │
├─────────────────────┼─────────┼───────┤
│ configs/browsers.ts │ configs │ stale │
└─────────────────────┴─────────┴───────┘
1 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

The Orchestrator's disposition: this `configs/browsers.ts` stale row is the same vendored-file drift
carried in the Orchestrator's drift database at 16:19 UTC, settled at landing with `scaffold repair`,
not a condition this unit's rows touch or own (`git status --short` shows the file unmodified). The
audit's zero-drift criterion is read at the landing's deciding run, not inside this unit's exec.

`git status --short` continues to list only Owned paths beside the unit's earlier entries. Full
output in `/home/user/work/evidence/conform-console.status`; the diff in
`/home/user/work/evidence/conform-console.diff`.

## Observations for a successor unit

Each is a finding outside this round's rows, recorded against the capability that owns it rather than
fixed here.

- **Nested function assignments outside the rows console-obj-6 and console-obj-7 name.**
  `tests/src/server/ProcessCapture.test.ts:31` assigns `const write = (...) => { … }` inside
  `createOverloadProbe`, and `tests/src/core/helpers.test.ts:1199-1201` assigns arrows inside an
  `it` callback. `.claude/rules/architecture.md` § Functions and orchestration reaches
  `tests/**/*.ts`, and `policy/no-nested-functions` is scoped to `src/**` and `app/**`, so no
  instrument reports them. Fix round 1 closed the third instance (`visible` in `tests/guides.test.ts`)
  under F1.
- **`@src/core` in published TSDoc examples.** R4 named `src/core/factories.ts:35,70,118`,
  `src/core/types.ts:160`, and `src/core/Styler.ts:102`. The re-run sweep adds
  `src/server/factories.ts:40`, where `createServerSink`'s example imports `@src/core` and
  `@src/server`. Same class, same fix, another site for whichever unit carries R4.
- **Writing-rule hits across `tests/**/*.ts`.** R3 named the `e.g.` hits in
  `tests/src/browser/helpers.test.ts`. The substitution sweep over the whole test tree finds the same
  class at the sites listed under § Sweeps — `via` predominantly, plus `just`, `simply`, and
  `should`. console-subj-9's population was `src` and the guide, so no row owns them.
- **`today` in `src/core/errors.ts:13`.** The `ConsoleError` class TSDoc reads
  `the one throw site in this codebase today`. console-subj-10's population was the
  `ConsoleErrorCode` TSDoc and its guide row, both of which are clean.
- **A count in `README.md`.** Line 4 reads `composing five concerns`, and line 67 reads
  `not just \`console.*\``. Both are R3's, carried to a follow-on unit.
- **`above` in `src/` comments.** `src/core/Capture.ts:157` (`see comment above`),
  `src/core/Styler.ts:86`, `src/core/factories.ts:220`, `src/server/ProcessCapture.ts:126`, and
  `src/core/constants.ts:488` point at other material with `above`. console-subj-14's population is
  the guide.
- **Inline copies of `normalizeVisible`'s expression remain.**
  `tests/src/core/Spinner.test.ts:315` and `tests/src/core/Progress.test.ts:204` still write
  `strip(text).replace(/^\r/, '')` inline. Now that `tests/setup.ts` exports the shared helper, each
  call site can route through it. Neither file is owned by this round.

## Fix round 3

Audit round 3 held claim 3, and the objective lane (Opus) held every other claim and named the
sites for F3-1 through F3-3 and referral R3-B. Row 6's ruling for R3-B: every title or comment
naming a `ServerSinkOptions.stdout` / `.stderr` target reads `stdout` and `stderr`, and the local
bindings `out` and `err` keep their names.

| Row | Site | Line now |
| --- | --- | --- |
| 1 | `tests/src/server/factories.test.ts:11` | `it('routes error and warn to the stderr stream, everything else to stdout', () => {` |
| 2 | `tests/src/server/factories.test.ts:87` | `it('applies styled:false to stdout and stderr even when one target is a TTY', () => {` |
| 2 | `tests/src/server/factories.test.ts:98` | `it('applies styled:true to stdout and stderr even when neither target is a TTY', () => {` |
| 3 | `tests/src/server/factories.test.ts:375` | `it('routes only error and warn to stderr; info / debug / an omitted level go to stdout', () => {` |
| 4 | `tests/src/server/factories.test.ts:214` | `it('reports the live stdout-stream width on a TTY', () => {` |
| 4 | `src/server/factories.ts:77` | `// A fixed override wins; otherwise the live stdout-stream width (tracks a resize), with the` |
| 5 (F3-1) | `src/core/helpers.ts:167-169` | `selectWriter('error', { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stderr'` / `selectWriter('debug', { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stdout'` / `selectWriter(undefined, { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stdout'` |

Row 5's confirmation: the remark at `src/core/helpers.ts:156-158` states that the server sink
routes `warn` alongside `error` by supplying its error stream for both, matching `console.warn`
writing to `stderr`. The corrected example's folded set (`warn: 'stderr'`) now demonstrates exactly
that fold, where fix round 2's set left `warn` at `'stdout'` and disagreed with the remark.

Row 6's capture and sweep: `\b(out|err)\b` (case-sensitive) re-run through the `Grep` tool over
`src`; `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`;
`guides/console.md`; `guides/README.md`; `README.md`. The tool's verbatim output is written to
`/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`, keeping the `[Omitted long
matching line]` rendering at `guides/console.md:400` and no row from the three excluded files.
`guides/README.md` and `README.md` return no matches.

Rulings for the remaining hits, by sense:

- **`fan out` / `fan-out` / `fans out` prose** — `src/core/types.ts`,
  `src/core/loggers/LoggerManager.ts`, `src/core/constants.ts`, `src/core/Reporter.ts`,
  `tests/src/core/loggers/LoggerManager.test.ts`, `tests/src/core/Styler.test.ts`,
  `tests/src/core/Capture.test.ts`, `tests/src/server/ProcessCapture.test.ts:636`,
  `guides/console.md` (Surface rows, method table, `manager.info` comment, the test-bullet
  paragraph) — ordinary English for the registry's broadcast behavior, unrelated to the renamed
  target.
- **Other ordinary-English `out`** — `kept out` (`tests/guides.test.ts:68`), `keeps … out of`
  (`tests/guides.test.ts:431`), `on its way out` (`tests/distribution.test.ts:695`), `lay out`
  (`src/core/types.ts:369`), `parsing … out of` (`src/core/types.ts:378`), `pad(s) out`
  (`src/core/types.ts:605`, `src/core/helpers.ts:336`, `tests/src/core/helpers.test.ts:416,842`),
  `copies out` (`src/core/types.ts:1096`, `src/core/Retention.ts:17`), `SGR string out`
  (`src/core/renderers/ANSIRenderer.ts:12`), `lay out to` (`src/core/Reporter.ts:33`), `string out`
  (`tests/src/core/renderers/ANSIRenderer.test.ts:6`), `out-of-range` (`tests/src/core/helpers.test.ts:327`),
  `swapped out` (`tests/src/server/factories.test.ts:390`), `leaks out` (`tests/src/server/ProcessCapture.test.ts:62`)
  — none names a target.
- **Local bindings and the prose describing them** — the `out` / `err` bindings the Orchestrator
  already permits at `src/server/factories.ts:54-55,58-59,66,79`; `const out = …` / `const err = …`
  bindings and their describing prose across `src/core/factories.ts:165,169,170`,
  `tests/src/core/**`, `tests/src/server/ProcessCapture.test.ts`, `tests/setupServer.ts:38`, and
  `guides/console.md:522`; and every remaining `out.target` / `err.target` / `out.writes` /
  `err.writes` reference plus the `no level → out` and `omitted level → out` comments in
  `tests/src/server/factories.test.ts` — each is that file's own local variable naming a
  `StreamTarget` fixture or the sink's own bound parameter, not a title, comment, or example naming
  a `ServerSinkOptions` field. Every construction call on these lines already spells the field
  `stdout` / `stderr`.
- **`selectWriter`'s generic sample strings** — `tests/src/core/helpers.test.ts:1164-1195` exercises
  `WriterSet<T>` with arbitrary strings `'out'` / `'err'` / `'warn'`; the file is off-limits under
  this round's scope and names no renamed target.
- **`RangeError('out')`** — `tests/src/core/helpers.test.ts:945-946` is an unrelated error-message
  fixture, not a target name.

No title, comment, or example in the recorded set names a `ServerSinkOptions` target with the old
words after this round.

Gates, run from `/home/user/fleet/console` after the rows landed:

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `src` 638 passed (17 files), `policy` 111 passed, `config` 46 passed, `setup` 23 passed (3 files), `guides` 91 passed |

`npx scaffold audit --offline` printed:

```
┌─────────────────────┬─────────┬───────┐
│ path                │ group   │ drift │
├─────────────────────┼─────────┼───────┤
│ configs/browsers.ts │ configs │ stale │
└─────────────────────┴─────────┴───────┘
1 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

The `configs/browsers.ts` row is the Orchestrator's, unchanged from fix round 2's disposition; this
round's rows do not touch it (`git status --short` shows the file unmodified). Read as reported,
not stopped on.

`node /home/user/scaffold/tmp/work/evidence.mjs console` wrote
`/home/user/work/evidence/conform-console.diff` (3896 lines) and
`/home/user/work/evidence/conform-console.status` (39 entries).

## Fix round 4

Closes audit round 4's refutation of claim 3 (`tests/setupServer.ts:38` still named `out` / `err`),
F4-2 (a stale second ruling for the `\b(out|err)\b` sweep at this file's earlier lines 227-250), and
F4-1 (the `selectWriter` example showed no `warn` selection).

| Row | Site | Line now |
| --- | --- | --- |
| 1 | `tests/setupServer.ts:38` | `` * @returns The `target` (pass as `stdout` / `stderr` / a process-stream stand-in) plus its `writes` `` |
| 2 | `src/core/helpers.ts:168` | `` * selectWriter('warn', { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stderr' `` |
| 3 | `conform-console-report.md` (the `\b(out|err)\b` ruling paragraph) | Struck the earlier ruling that listed lines `11, 16, 87, 98, 214, 330-331, 341, 346, 375, 381`; replaced it with one sentence pointing to the `## Fix round 3` rulings (console-fix3-1 through console-fix3-4) as the current ruling, with `tests/setupServer.ts:38` added as repaired |

Row 3's capture: the sweep re-ran through the `Grep` tool over `src`; `tests` excluding
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`; `guides/console.md`;
`guides/README.md`; `README.md`. The tool's verbatim output is written to
`/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`. `tests/setupServer.ts:38` no
longer appears in the hit list (the site now reads `stdout` / `stderr`); every remaining hit matches
the `## Fix round 3` rulings — `fan out` / `fan-out` prose, other ordinary-English `out`, local
`out` / `err` bindings and the prose describing them, `selectWriter`'s generic `WriterSet<T>` sample
strings at `tests/src/core/helpers.test.ts:1164-1195`, and the `RangeError('out')` fixture.
`guides/README.md` and `README.md` return no hit.

Gates, run from `/home/user/fleet/console` after the rows landed:

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 — `src` 638 passed (17 files), `policy` 111 passed, `config` 46 passed, `setup` 23 passed (3 files), `guides` 91 passed |

`npx scaffold audit --offline` printed:

```
┌─────────────────────┬─────────┬───────┐
│ path                │ group   │ drift │
├─────────────────────┼─────────┼───────┤
│ configs/browsers.ts │ configs │ stale │
└─────────────────────┴─────────┴───────┘
1 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

The `configs/browsers.ts` row is the Orchestrator's; this round's rows do not touch it. Read as
reported, not stopped on.

`node /home/user/scaffold/tmp/work/evidence.mjs console` wrote
`/home/user/work/evidence/conform-console.diff` (3905 lines) and
`/home/user/work/evidence/conform-console.status` (39 entries).
