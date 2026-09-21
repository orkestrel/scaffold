<!-- Retained from cl1-2-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal cl1-2.jsonl, thread 01a0c338-4fec-7da2-a975-9fcdeb0795eb, exit 0, 2026-09-21. The fix round: readOracleButton, visitBreakpoint moved to the browser module, the hold cleanup keeping the original error (real-run red then green), the two test data renamed; every gate exit 0 on Chromium and Edge. -->

CL1 brief 2 is implemented in the working tree. Every requested gate exited 0. HEAD remains `060ce02`; the uncommitted brief-1 result is preserved. Execution was direct as the assigned `sol` role on Astra, without spawned agents, on Windows on 2026-09-21. No commit, restore, or reset was performed.

The changes were applied in the brief's order: item 1, item 4, item 3, then item 2. This report records the fix round only.

The landed changes and their sites are:

- **Item 1 — reader naming.** `tests/setupBrowser.ts:303` exports `readOracleButton`. Its callers are updated in the action rows at lines 255, 260, 275, 287, and 292, the key helper at line 318, and the pointer helper at line 335. The example at line 159 and the helper's summary at line 297 follow the rename. In `tests/setupBrowser.test.ts`, the import at line 43, export inventory at line 123, and refusal cases at lines 405 and 408 use the renamed reader; the cleanup regression also uses it at line 255. The search for `resolveOracleButton` returned 0 matches in each browser setup file.
- **Item 4 — fixture naming.** `tests/setupBrowser.test.ts:75` uses `Breakpoint viewport reading failure`. `tests/setupConformance.test.ts:587` uses `.unreachable-selector`, and its expected diagnostic at line 590 matches. A search for `CL1|cl1` over every owned TypeScript file returned no matches.
- **Item 3 — cleanup error.** `tests/setupBrowser.ts:359` wraps pointer release in its own `try/catch`. If release succeeds, it rethrows the original error. If release rejects, it throws an error retaining the original message and carrying the release rejection as `cause`, matching the installed verb's error shape. The regression at `tests/setupBrowser.test.ts:253` removes the real pressed target and supplies an invalid pointer marker through a real mutation observer, provoking a real protocol rejection. It asserts the pressed-state message and the protocol cause. Its `finally` restores the recorded coordinates, releases the pointer, and destroys the mount.
- **Item 2 — environment placement.** `tests/setupBrowser.ts:38` owns `visitBreakpoint`, using `page` from the static import at line 22. Its body retains the existing viewport operation and restoration. `tests/setupStyles.ts:6` retains `BREAKPOINT_CASES`; that file contains no `vitest/browser` import, window read, or breakpoint helper. The browser proof imports the table from `./setupStyles.js` at line 21 and the helper from `./setupBrowser.js` at line 45. Its existing behavior cases remain at lines 53–98. The browser export inventory adds the helper at line 125; the styles inventory at `tests/setupStyles.test.ts:54` removes it.

Only the owned TypeScript files and this report were edited this round. Comment changes are limited to the renamed reader's summary and example and the moved helper's existing documentation.

The cleanup regression has this real-run red/green pair; the brief's fallback applies, and no `prove` receipt is claimed:

```text
npm.cmd run test:setup:browser -- -t "preserves the pressed-state failure"

Red — exit 1, start 05:10:19:
 Test Files  1 failed (1)
      Tests  1 failed | 31 skipped (32)
Received: cdpSession.send: Protocol error (Input.dispatchMouseEvent): Invalid parameters
Expected: Interactive target "Toggle" did not enter the pressed state, with the release cause

Green — exit 0, start 05:10:33:
 Test Files  1 passed (1)
      Tests  1 passed | 31 skipped (32)
```

During development, an assertion expecting the protocol rejection to be an `Error` instance failed because the provider serializes that rejection as an object. The assertion reads its message instead. The final assertion ran red against the original cleanup and green against the fix, as recorded earlier. The temporary reversion was removed; the regression fixture cleans up after each run.

The requested gates ran in order. Node-only gates have no browser axis. The Edge commands used the PowerShell equivalent, setting `$env:PLAYWRIGHT_CHANNEL = 'msedge'` before invoking the named npm command. These are the exit codes and final output lines from this round:

`npm.cmd run format:check` — Node, exit 0.

```text
All matched files use the correct format.
Finished in 757ms on 96 files using 16 threads.
```

`npm.cmd run lint:check` — Node, exit 0.

```text
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

`npm.cmd run check` — Node, exit 0.

```text
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

`npm.cmd run test:setup` — Node, exit 0.

```text
 Test Files  3 passed (3)
      Tests  124 passed (124)
   Start at  05:11:35
   Duration  6.56s (transform 183ms, setup 105ms, import 1.41s, tests 5.89s, environment 0ms)
```

`npm.cmd run test:setup:browser` — managed Chromium, exit 0.

```text
 Test Files  1 passed (1)
      Tests  32 passed (32)
   Start at  05:11:49
   Duration  4.10s (transform 0ms, setup 74ms, import 35ms, tests 3.07s, environment 0ms)
```

`npm.cmd run test:conformance` — Node / managed Chromium oracle, exit 0.

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  05:11:58
   Duration  3.83s (transform 89ms, setup 42ms, import 677ms, tests 2.97s, environment 0ms)
```

`npm.cmd run test:src:styles` — managed Chromium, exit 0.

```text
 Test Files  9 passed (9)
      Tests  104 passed (104)
   Start at  05:12:08
   Duration  19.13s (transform 0ms, setup 418ms, import 313ms, tests 16.93s, environment 0ms)
```

`npm.cmd run test:app:browser` — managed Chromium, exit 0.

```text
 Test Files  3 passed (3)
      Tests  11 passed (11)
   Start at  05:12:35
   Duration  2.02s (transform 0ms, setup 174ms, import 59ms, tests 684ms, environment 0ms)
```

`npm.cmd run test:journey` — managed Chromium, exit 0.

```text
 Test Files  4 passed (4)
      Tests  84 passed | 4 skipped (88)
   Start at  05:12:44
   Duration  20.61s (transform 0ms, setup 2.46s, import 332ms, tests 70.93s, environment 0ms)
```

`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` — Edge, exit 0.

```text
 Test Files  1 passed (1)
      Tests  32 passed (32)
   Start at  05:13:19
   Duration  10.52s (transform 0ms, setup 77ms, import 36ms, tests 3.24s, environment 0ms)
```

`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` — Edge, exit 0.

```text
 Test Files  9 passed (9)
      Tests  104 passed (104)
   Start at  05:13:43
   Duration  26.33s (transform 0ms, setup 467ms, import 295ms, tests 17.73s, environment 0ms)
```

Browser setup and styles emitted Vite dependency-externalization warnings; their final results are recorded earlier. The journey run retained its existing skipped cases. No gate required a code correction.

The recorded bounds remain: the root-bounded reader does not reject duplicate matches inside the same root, and the duplicate-section control does not establish that property. The earlier `resolveButton(root, name)` helper retains its name; its journey and Button section consumers are outside this round's scope, and its rename remains assigned to CL11.

The final `git diff --check` exited 0. The actual `git diff --stat` output, including the preserved brief-1 changes, is:

```text
 guides/veneer.md               |   2 +-
 tests/setupBrowser.test.ts     | 142 ++++++++++++++++++++++++++++++++++++++
 tests/setupBrowser.ts          | 152 +++++++++++++++++++++++++++++++++++++----
 tests/setupConformance.test.ts |  53 ++++++++++++++
 tests/setupConformance.ts      |  31 ++++++---
 tests/setupStyles.test.ts      |  18 +++++
 tests/setupStyles.ts           |  10 +++
 7 files changed, 385 insertions(+), 23 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` stdout is:

```text
 M guides/veneer.md
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Git exited 0 and also warned that `C:\Users\mikes/.config/git/ignore` was inaccessible. The repository's `.gitignore:11` ignores `tmp`, so porcelain omits `cl1-report.md` and `cl1-report-2.md`. The reports exist at their required paths; making them appear in ordinary status would require changing the ignore or index state outside this assignment. No such change was made.