<!-- Retained from cl1-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal cl1.jsonl, thread 01a0c31c-e231-73f0-b826-6859e44343f0, exit 0, 2026-09-21. The proof contract: the Excluded owner in the scanner, property-free keys, the root-scoped oracle drive, BREAKPOINT_CASES and visitBreakpoint; every gate exit 0 on Chromium and Edge. -->

CL1 is implemented in the working tree. Every gate requested by the brief has an exit-0 receipt. HEAD remains `060ce02`; no commit was made. Execution was direct, with no spawned agents, on Windows on 2026-09-21.

The scaffold coding and orchestration contracts, applicable rules, design verdict, and named lane-report sections governed the changes. The brief's real-run fallback supplied the red/green evidence; no `prove` receipt is claimed.

**Implementation and proof**

- **Exclusions:** `tests/setupConformance.ts:527` retains the `Name | Owner | Reason` reader and its incomplete-row refusal. At line 633, the scanner distinguishes the terminal `Excluded` owner, validates its name against the pinned inventory even before its component has a guide row, and rejects its presence across the parsed cascade. Ordinary deferrals retain their existing component-row bound. Exclusions are subtracted from shipped obligations. `tests/setupConformance.test.ts:562` proves the reader, nested cascade presence, inventory membership, and valid absence. Only the introducing sentence at `guides/veneer.md:173` changed.
- **Property-free keys:** `tests/setupConformance.ts:597` accepts a shipped selector row without a variable row only when the official property set is empty. It accepts an optional inventory argument and otherwise reads the pinned fixture. Existing checks still withhold Button when its variable row is missing or accepted. The scratch `reboot` row at `tests/setupConformance.test.ts:596` proves the property-free case. `tests/conformance.test.ts` is unchanged; `listed` remains `['btn']`.
- **Oracle root:** `tests/setupBrowser.ts:225` passes the supplied root into acting rows. `resolveOracleButton` at line 282 bounds the target and retains reachability refusal; `pressOracleKeys` at line 296 focuses that target before sending keys. `holdOraclePointer` at line 311 resolves the element first and uses the installed protocol and pointer marker because the installed hold verb accepts only document-wide names. The installed release verb retains cleanup ownership. `driveOracle(root, prefix)` at line 386 keeps its signature. The duplicate-section proof at `tests/setupBrowser.test.ts:206` checks target activation, unchanged neighboring attributes and clicks, keyboard redirection from foreign focus, and held-pointer isolation. The browser setup export inventory includes the helpers.
- **Breakpoints:** `tests/setupStyles.ts:6` exports the frozen `BREAKPOINT_CASES` table for 375, 576, 768, 992, 1200, and 1400, each carrying boundary-minus-one, boundary, and boundary-plus-one readings. `visitBreakpoint` at line 26 dynamically imports `page`, preserves the starting height, and restores the starting width and height in `finally`. The Node proof at `tests/setupStyles.test.ts:110` checks the exact table and its frozen nested values, and updates the export inventory. The browser proof at `tests/setupBrowser.test.ts:51` checks actual viewport sizes, media conditions, successful returns, synchronous and asynchronous failures, nested visits, and a following case at the original size. Scaffold's `tests.md` places browser setup-helper assertions in that root browser proof; no permanent styles proof file was added.

The red/green runs used these exact commands and measured results. Logs are under ``.

| Subject | Command | Red | Green | Logs |
| --- | --- | --- | --- | --- |
| Exclusion contract and property-free key | `npm.cmd run test:setup -- tests/setupConformance.test.ts -t "excluded names\|property-free"` | Exit 1; 2 failed, 36 skipped | Exit 0; 2 passed, 36 skipped | `cl1-contract-red.log`, `cl1-contract-green.log` |
| Present and unknown exclusion plants | `npm.cmd run test:setup -- tests/setupConformance.test.ts` | Exit 1; 2 failed, 38 passed | Exit 0; 38 passed | `cl1-exclusion-plants-red.log`, `cl1-exclusion-plants-green.log` |
| Duplicate-name root isolation | `npm.cmd run test:setup:browser -- -t "isolates the oracle"` | Exit 1; 1 failed, 27 skipped | Exit 0; 1 passed, 27 skipped | `cl1-oracle-red.log`, `cl1-oracle-green.log` |
| Viewport restoration | `npm.cmd run test:setup:browser -- -t "breakpoint viewport restoration"` | Exit 1; 3 failed, 28 skipped | Exit 0; 3 passed, 28 skipped | `cl1-breakpoint-red.log`, `cl1-breakpoint-green.log` |

The initial contract red rejected the valid exclusion because its inventory key had no guide row and returned no shipped property-free key. The explicit plants subsequently produced `Excluded name .btn is present in the built cascade` and `Excluded name .cl1-outside is outside the official inventory`. The oracle red recorded no target click. The restoration red left the following case at width 576 instead of 414.

**Viewport leakage reading**

`npm.cmd run test:src:styles -- cl1-viewport` exited 0 with 2 passed tests. The ordered readings in `cl1-viewport-probe.log` were:

```text
CL1 viewport setter starting 414 896
CL1 viewport setter ending 1400 800
CL1 viewport reader 414 896
```

This run showed no viewport leakage into the following styles file. Restoration remains necessary within a file, as the failing following-case proof demonstrated.

**Gates**

The initial gate pass followed the brief's order, retrying the corrected gate before continuing. The final rerun used `tmp/cl1-gates.cmd`, which sets `PLAYWRIGHT_CHANNEL=msedge` for the requested Edge gates. That batch left no Node setup receipt, so Node setup was rerun directly after the batch completed. The following receipts are the last verified runs, not a claim that the final batch covered every gate uninterrupted.

Corrections during verification were confined to owned files:

- `check` first exited 2 on untyped action-root parameters and the removed `clickAccessible` import still needed by `applyTheme`. Explicit `ParentNode` annotations and restoring that import cleared it.
- The extended browser proof first reported 1 failed and 30 passed because it assumed a fixed state after pointer release. Reading the target's starting state before the added keyboard action corrected the assertion; the next full run passed.
- The initial duplicate fixture check expected `aria-pressed="false"`, but the unchanged cloned host had no such attribute. The proof compares with its captured starting attribute.

The requested Edge scope was browser setup and styles. The other browser receipts use managed Chromium; Node-only gates have no browser axis. Each listed command exited 0. The retained logs carry these final lines:

`npm.cmd run format:check` — Node, exit 0; `cl1-final-format.log.txt`.

```text
All matched files use the correct format.
Finished in 782ms on 96 files using 16 threads.
```

`npm.cmd run lint:check` — Node, exit 0; `cl1-final-lint.log.txt`.

```text
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

`npm.cmd run check` — Node, exit 0; `cl1-final-check.log.txt`.

```text
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

`npm.cmd run test:setup` — Node, exit 0; `cl1-final-setup.log.txt`.

```text
 Test Files  3 passed (3)
      Tests  124 passed (124)
   Start at  04:52:58
   Duration  6.55s (transform 250ms, setup 113ms, import 1.44s, tests 5.88s, environment 0ms)
```

`npm.cmd run test:setup:browser` — managed Chromium, exit 0; `cl1-final-setup-browser.log.txt`.

```text
 Test Files  1 passed (1)
      Tests  31 passed (31)
   Start at  04:51:07
   Duration  4.02s (transform 0ms, setup 73ms, import 51ms, tests 2.96s, environment 0ms)
```

`npm.cmd run test:conformance` — Node / managed Chromium oracle, exit 0; `cl1-final-conformance.log.txt`.

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  04:51:12
   Duration  3.81s (transform 86ms, setup 43ms, import 650ms, tests 2.97s, environment 0ms)
```

`npm.cmd run test:src:styles` — managed Chromium, exit 0; `cl1-final-styles.log.txt`.

```text
 Test Files  9 passed (9)
      Tests  104 passed (104)
   Start at  04:51:18
   Duration  19.20s (transform 0ms, setup 448ms, import 313ms, tests 16.90s, environment 0ms)
```

`npm.cmd run test:guides` — Node, exit 0; `cl1-final-guides.log.txt`.

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  04:51:38
   Duration  616ms (transform 80ms, setup 43ms, import 380ms, tests 6ms, environment 0ms)
```

`npm.cmd run test:app:browser` — managed Chromium, exit 0; `cl1-final-app-browser.log.txt`.

```text
 Test Files  3 passed (3)
      Tests  11 passed (11)
   Start at  04:51:40
   Duration  2.01s (transform 0ms, setup 166ms, import 59ms, tests 712ms, environment 0ms)
```

`npm.cmd run test:journey` — managed Chromium, exit 0; `cl1-final-journey.log.txt`.

```text
 Test Files  4 passed (4)
      Tests  84 passed | 4 skipped (88)
   Start at  04:51:43
   Duration  20.99s (transform 0ms, setup 1.80s, import 356ms, tests 71.65s, environment 0ms)
```

`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` — Edge, exit 0; `cl1-final-edge-setup-browser.log.txt`.

```text
 Test Files  1 passed (1)
      Tests  31 passed (31)
   Start at  04:52:05
   Duration  10.39s (transform 0ms, setup 76ms, import 55ms, tests 3.08s, environment 0ms)
```

`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` — Edge, exit 0; `cl1-final-edge-styles.log.txt`.

```text
 Test Files  9 passed (9)
      Tests  104 passed (104)
   Start at  04:52:18
   Duration  26.48s (transform 0ms, setup 460ms, import 310ms, tests 17.85s, environment 0ms)
```

The journey's skips are the existing `it.runIf(CAPTURE)` filename case at `tests/app/browser/integration.test.ts:678`, once per variant. No test skip was added. Browser logs contain PostCSS dependency externalization warnings; the reported suites completed successfully.

**Plant removal and scope**

The temporary `CL1 exclusion presence plant` and `CL1 exclusion membership plant` test cases were deleted before their green run. The scratch exclusion guide and property-free guide are removed by `scratch.destroy()` on every path. The duplicate control and its section are removed in cleanup, with pointer release protected by `finally`. The helper's deliberately missing restoration was replaced by the final `try/finally` implementation. The viewport probe files `tests/src/styles/cl1-viewport-set.test.ts` and `tests/src/styles/cl1-viewport-read.test.ts` were deleted after measurement. Regression fixtures remain as test inputs; no planted application or guide row remains.

No SCSS, source, application, fixture, configuration, package, vendored file, or journey file changed. The setup conformance export population did not change. The browser and styles export populations were updated with their implementation. `git diff --check` exited 0.

The actual `git diff --stat` output is:

```text
 guides/veneer.md               |   2 +-
 tests/setupBrowser.test.ts     | 105 ++++++++++++++++++++++++++++++++++
 tests/setupBrowser.ts          | 127 ++++++++++++++++++++++++++++++++++++-----
 tests/setupConformance.test.ts |  53 +++++++++++++++++
 tests/setupConformance.ts      |  31 +++++++---
 tests/setupStyles.test.ts      |  19 ++++++
 tests/setupStyles.ts           |  32 +++++++++++
 7 files changed, 346 insertions(+), 23 deletions(-)
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

Git also warned that the user-level `C:\Users\mikes/.config/git/ignore` file was inaccessible; the status command exited 0. The repository ignores `tmp/`, so this report, run logs, and command scripts do not appear in porcelain status. The report is written at `cl1-report.md`.