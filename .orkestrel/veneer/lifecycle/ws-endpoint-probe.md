# `PLAYWRIGHT_WS_ENDPOINT` probe

GPT-6 Astra probe unit `ws-endpoint-probe`, 2026-10-03, veneer `main` at `c6d831c`. Scripts and evidence: veneer `tmp/units/ws-endpoint/`. Brief: `ws-endpoint-probe-brief.md`.

`PLAYWRIGHT_WS_ENDPOINT` reuses a headless browser started by `chromium.launchServer`. Connected Vue and browser tests match their cold-run counts and release their contexts and pages. The shared-browser journey differs from its cold baseline: 59 passed and 1 failed, versus 60 passed. One server per project passes all 60. The timing measurements are preliminary.

Measured on Windows on 2026-10-03, in veneer `main` at `c6d831c`: Node 24.21.0, Playwright 1.63.0, Vitest/provider 4.1.11, Chromium headless shell 153.0.8010.12, and `@orkestrel/browser` 0.0.21. Authored artifacts are under `tmp/units/ws-endpoint/` and `tmp/codex/`. No installation, commit, push, publication, or delegation occurred.

## 1. Attach without a launch

**Commands:** `node tmp/units/ws-endpoint/suites.ts` invokes `npm run test:src:vue` first, then `npm run test:src:browser`. Cold children have `PLAYWRIGHT_WS_ENDPOINT` unset; connected children receive `server.wsEndpoint()`. `PLAYWRIGHT_EXECUTABLE_PATH` is removed because its precedence would bypass the endpoint. The launcher calls `chromium.launchServer({ headless: true, args: ['--remote-debugging-port=19471'] })`.

The comparison produced these outcomes; every browser sample in the three cold/connected pairs matched:

| Script | Cold | Connected |
|---|---|---|
| `test:src:vue` | 1 file, 1 passed, 0 failed | 1 file, 1 passed, 0 failed |
| `test:src:browser` | 26 files, 787 passed, 0 failed | 26 files, 787 passed, 0 failed |

**Process evidence:** The retained browser is PID `48116`, parent `38932` (`node tmp/units/ws-endpoint/suites.ts`). It appears before, during, and after the connected Vue and browser runs. Their logs contain WebSocket connection/disconnection events and no browser launch. The cold Vue control creates PID `37880`, parent `50100` (Vitest); the cold browser control creates PID `41084`, parent `41804` (Vitest). Those cold browsers disappear after their runs. The retained server's command line includes `--headless`, and CDP reports `HeadlessChrome/153.0.8010.12`.

The census uses `Get-CimInstance Win32_Process` and records executable, command line, PID, and parent PID. Evidence is in `vue-cold-2-*.census.json`, `vue-warm-1-*.census.json`, `browser-cold-1-*.census.json`, `browser-warm-1-*.census.json`, the corresponding `.log` files, and `events.jsonl`, all under `tmp/units/ws-endpoint/`. Browser subprocesses created beneath the retained server are distinct from a Vitest-owned browser launch. Other worktrees' browsers are identified by their parents' command lines.

**Answer:** Yes. The connected scripts use the retained headless browser without launching a browser of their own, with equal pass/fail counts in the measured runs.

## 2. Cleanup per run

**Commands:** The same `suites.ts` launcher runs `test:src:vue` twice consecutively on one server. It inspects that browser using CDP `Target.getBrowserContexts`, `Target.getTargets`, and HTTP `GET /json/list` before and after each run, and samples them during execution.

**Evidence:** Both consecutive Vue runs start with an empty context-ID list and no targets. Each passes its single test, exits 0, and leaves `browserContextIds: []`, `targetInfos: []`, and `/json/list: []`. The server PID remains `48116`. Connected browser runs also return to those empty lists. The CDP response continues to identify Chromium's default context; the empty list means no remaining non-default contexts, not that Chromium has no default context.

See the `*-before`, `*-during`, and `*-after` records in `tmp/units/ws-endpoint/events.jsonl`. Live contexts and page targets during runs provide the positive control for the empty post-run readings.

**Answer:** The measured normal exits close each run's contexts and pages while keeping the browser process warm. The consecutive Vue rerun starts clean and passes identically.

## 3. The launch-options header

**Commands:** Read the provider's `openBrowser` implementation and search installed `playwright-core/lib/coreBundle.js` for `x-playwright-launch-options`, `_initPreLaunchedBrowserMode`, `_initLaunchBrowserMode`, and `runServer`.

**Evidence:** `node_modules/@vitest/browser-playwright/dist/index.js:910` supplies the header before calling `connect`. In `node_modules/playwright-core/lib/coreBundle.js`, line `56878` parses the header; line `56927` selects prelaunched-browser mode for `launchServer`; line `57012` returns the existing browser without using those parsed launch options. Line `57207` constructs that server with `preLaunchedBrowser`.

Ordinary CLI `run-server` selects mode `default` at line `69965`. Its connection path calls `_initLaunchBrowserMode`; line `57047` launches a browser using the connection's filtered launch options, and its disposal callback closes that browser. The extension/reuse modes are separate branches, not ordinary `run-server` behavior. Per-connection context isolation and disconnect cleanup are implemented at lines `56224` and `56241`.

**Answer:** `launchServer` keeps one browser warm. Its launcher determines headless mode and launch flags; the provider's header does not reconfigure that browser. Ordinary `run-server` keeps a server process alive but creates a browser per connection.

## 4. Parallel projects

**Commands:** `node tmp/units/ws-endpoint/journeys.ts` runs `npm run test:journey -- --reporter=verbose --reporter=json --outputFile=PATH`, cold and connected. It retains the existing configuration's four concurrent projects. `node tmp/units/ws-endpoint/projects.ts` performs the separate-server fallback through `node node_modules/vitest/vitest.mjs run --config tmp/units/ws-endpoint/projects.config.ts --no-cache --reporter=verbose --reporter=json --outputFile=tmp/units/ws-endpoint/journey-separated-complete.json`. That temporary config uses the existing `appJourney` factory, the same variants/viewports and execution group, and a different server endpoint for each project in one Vitest invocation.

The completed comparisons produced these per-project test counts:

| Project | Cold browsers | One shared server | Server per project |
|---|---:|---:|---:|
| `journey:light-1280` | 13 passed, 0 failed | 13 passed, 0 failed | 13 passed, 0 failed |
| `journey:dark-1280` | 18 passed, 0 failed | 18 passed, 0 failed | 18 passed, 0 failed |
| `journey:light-390` | 16 passed, 0 failed | 15 passed, 1 failed | 16 passed, 0 failed |
| `journey:dark-390` | 13 passed, 0 failed | 13 passed, 0 failed | 13 passed, 0 failed |
| Total | 60 passed, 0 failed; exit 0 | 59 passed, 1 failed; exit 1 | 60 passed, 0 failed; exit 0 |

**Failure evidence:** The connected `light-390` project's J8 test fails with `Named region "Uploads" is not visible`. The stack reaches `tests/app/browser/integration.test.ts:465`, where the upload-toast wait reads that region. It is a test failure, not a connection failure. The shared browser, PID `29132`, simultaneously holds four non-default contexts and four page targets; all are gone after the run. Evidence is in `journey-cold-complete.json`, `journey-warm-complete.json`, their `.log` files, the matching census files, and `events.jsonl` under `tmp/units/ws-endpoint/`.

**Separate-server evidence:** `journey-separated-complete.json` and its `.log` record all four projects passing, including the failing J8 case. The recorded browser PIDs are `37688`, `29968`, `34572`, and `46084`, all owned by launcher PID `48564`. Before/during/after census files show those retained servers; the log shows four distinct WebSocket connections and no Vitest browser launch. `journey-separated-closed.census.json` records their removal after launcher cleanup.

**Input commands:** `node tmp/units/ws-endpoint/input.ts` compares four Playwright clients/contexts on one headless server with one headless server per client. It performs real clicks, keyboard input, and mouse movements, then reads focus, viewport, input value, pointer coordinates, and CSS hover state.

**Input evidence:** `tmp/units/ws-endpoint/input.json` records equal outcomes. Every page retains its focused input and receives only its own typed suffix. Viewports remain `1280×800`, `1280×800`, `390×844`, and `390×844`. Initial pointer coordinates are independently `30,85`, `31,85`, `32,85`, and `33,85`; moving the odd-indexed pointers to `200,200` clears only their hover states. The final hover vector is `[true, false, true, false]` in both topologies. This measures these headless interactions, not universal browser equivalence.

**Answer:** The focused input probe matches four separate browsers, but the complete shared-browser journey does not match its cold baseline in the measured run. One server per project passes the complete journey. This comparison does not establish whether browser sharing caused the visibility error.

## 5. Failure at the onset

**Command:** `node tmp/units/ws-endpoint/failures.ts` runs `test:src:browser` against a stopped server, then kills a different server's recorded browser after the first test file completes while the suite continues.

The failure outcomes are recorded in `commands.jsonl`, `failure-stopped.log`, and `failure-killed.log`:

| Condition | Observed result | Time |
|---|---|---|
| Server stopped before connection | `ECONNREFUSED`; exit 1; no tests; 1 unhandled error | 6 ms from WebSocket connect attempt to refusal; 2.247 s for the npm command |
| Browser PID `40980` killed during the suite | Browser connection closed / RPC closed; exit 1; 1 file and 153 tests passed before interruption; 1 unhandled error | Kill at 35.218 s; exit 0.643 s later |

The interrupted summary reports `153 passed (193)` among tests collected by that point, not a completed 787-test run. Neither failure reaches its probe timeout or falls back to launching Chromium.

**Answer:** The stopped endpoint fails at connection. Killing the browser fails the active run promptly. Neither measured case hangs.

## 6. One browser for both protocols

**Command:** `node tmp/units/ws-endpoint/protocols.ts` starts `launchServer` with CDP port `19472`, connects Playwright, and connects installed `@orkestrel/browser/server` with `createBrowser({ cdp: { endpoint } })`. Here `endpoint` is the `webSocketDebuggerUrl` from `/json/version`; passing the HTTP URL directly is rejected by this installed Orkestrel API.

**Evidence:** `tmp/units/ws-endpoint/protocols.json` records `status: connected`, `connection: cdp`, and `owned: false` while Playwright stays connected. The Orkestrel client discovers the existing Playwright page, but represents it under a local context without the actual CDP context ID. After Orkestrel creates an isolated context/page, raw CDP lists both clients' contexts and targets; Playwright's `browser.contexts()` still lists only its own context.

A later Playwright context/page appears in raw CDP but does not enter Orkestrel's context/page lists during a 5-second observation. The installed synchronization code at `node_modules/@orkestrel/browser/dist/src/server/index.js:2289` collects existing page targets into a local default-context wrapper; it does not preserve their `browserContextId` values. Destroying the attached Orkestrel client leaves Playwright connected and its page readable, and leaves the remote Orkestrel-created context/page intact until explicit cleanup.

**Answer:** Yes, both protocols attach to the same browser simultaneously. Their public context inventories are not interchangeable: raw CDP sees the full browser, Playwright exposes connection-owned contexts, and the measured Orkestrel attachment flattens initially discovered pages and does not automatically expose the later Playwright page.

## 7. Cost, preliminary

**Commands:** `node tmp/units/ws-endpoint/timing.ts` measures the exact `test:src:vue` npm script with eight cold and eight connected samples, alternating the order within successive pairs. The server remains alive across connected samples. `node tmp/units/ws-endpoint/analyse.ts` and `node tmp/units/ws-endpoint/metrics.ts` summarize the logs.

Observed noise justified retaining eight pairs instead of relying on one comparison. The timing runs omit the synchronous in-run process census and repeated CDP inspection used by the lifecycle probe. Playwright/Vitest debug logging remains enabled. All timing samples pass the same single Vue test. “Cold” means a freshly launched browser process; operating-system and Vite disk caches were not cleared. Each command still starts its own Vitest/Vite process.

| End-to-end npm duration | Cold | Connected |
|---|---:|---:|
| Samples | 8 | 8 |
| Median | 8.987 s | 8.622 s |
| Mean | 9.657 s | 8.770 s |
| Sample standard deviation | 1.727 s | 0.582 s |
| Range | 8.375–13.395 s | 8.160–9.796 s |

The median difference is 0.365 s. Overlapping ranges and concurrent load prevent attributing that whole difference to browser reuse. A separately timed headless server launch took 80.5 ms. Provider-initialization-to-context-ready times were 90–455 ms cold (median 99 ms) and 25–34 ms connected (median 26.5 ms). These intervals include context creation and are not pure launch timings. Vitest's reported durations were 1.52–3.47 s cold and 1.41–1.88 s connected; the rest of the npm wall time includes the Vue script's builds, declaration extraction, configuration, and process startup. The logs do not isolate Vite startup as a separate duration.

The separate browser-suite census batch also measured three cold npm runs at 176.666, 170.274, and 168.177 s, and three connected runs at 173.746, 169.388, and 171.822 s. Their median ordering reverses the Vue ordering: 170.274 s cold versus 171.822 s connected. Those instrumented measurements include census overhead and further illustrate why these observations do not establish an end-to-end speedup.

**Host load:** `Get-Process chrome,msedge,node,codex` records 0 Chrome, 87 Edge, 16 Node, and 6 Codex processes before timing; afterward it records 0, 87, 21, and 8 respectively. Aggregate working sets change from 1.876 to 1.903 GB for Edge, 1.763 to 2.512 GB for Node, and 0.465 to 0.613 GB for Codex. The census additionally records `chrome-headless-shell.exe`, which that exact `Get-Process` name list omits. Other worktrees' tests and this probe's browser-suite batch overlap these measurements. CPU fields in the saved load files are cumulative process CPU seconds, not utilization percentages.

**Evidence and answer:** [metrics.json](C:/Users/mikes/WebstormProjects/veneer/tmp/units/ws-endpoint/metrics.json), `timing-*.log`, `timing-*.load.json`, and `commands.jsonl` under `tmp/units/ws-endpoint/` contain the samples and boundaries. Browser reuse reduces the measured provider initialization interval, but this loaded-host sample does not establish a reliable end-to-end speedup. These figures are preliminary, not targets.

## Scripts

All authored scripts are kept under `tmp/units/ws-endpoint/`. Their usage is:

| File | Usage |
|---|---|
| `suites.ts` | `node tmp/units/ws-endpoint/suites.ts` — cold/connected suites, browser server, census, and cleanup readings |
| `journeys.ts` | `node tmp/units/ws-endpoint/journeys.ts` — cold/connected journey comparison with an extended cap and JSON results |
| `projects.ts` | `node tmp/units/ws-endpoint/projects.ts` — four concurrent journey projects with one server per project |
| `projects.config.ts` | Loaded by `projects.ts`'s Vitest invocation after it writes `project-endpoints.json` |
| `input.ts` | `node tmp/units/ws-endpoint/input.ts` — shared/separate browser input comparison |
| `protocols.ts` | `node tmp/units/ws-endpoint/protocols.ts` — simultaneous Playwright/Orkestrel CDP attachment |
| `failures.ts` | `node tmp/units/ws-endpoint/failures.ts` — stopped endpoint and browser termination |
| `timing.ts` | `node tmp/units/ws-endpoint/timing.ts` — alternating Vue timing samples |
| `analyse.ts` | `node tmp/units/ws-endpoint/analyse.ts` — aggregate recorded artifacts |
| `metrics.ts` | `node tmp/units/ws-endpoint/metrics.ts` — summarize `analysis.json` |
| `Probe.ts` | Imported by `suites.ts`; use that entry command |
| `Command.ts` | Imported by `failures.ts` and `timing.ts`; use those entry commands |
| `helpers.ts` | Imported by `analyse.ts` and `metrics.ts`; use those entry commands |

The long commands ran through `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal PATH --errors PATH --cap SECONDS -- node SCRIPT`. Journals and exit records are under `tmp/codex/ws-*.log` and `tmp/codex/ws-*.err`; the suite batch uses a 1,800-second cap, the extended journey batch 2,400 seconds, the separate-server fallback 1,200 seconds, timing 600 seconds, failures 360 seconds, and the input/protocol probes 180 seconds. The earlier `suites.ts` journey attempt exceeded its per-command 240-second cap while active; that truncated cold attempt and the interrupted connected attempt are excluded from journey outcomes. `journeys.ts` supplies the completed comparison. The authored TypeScript entries pass a standalone `tsc --noEmit --types node --target esnext --module nodenext --allowImportingTsExtensions --skipLibCheck` check with `--ignoreConfig`.

`git status --porcelain` is empty before and after the probes. The probe-owned browser servers are closed; the recorded main launcher/browser PIDs and the separate-server launcher's descendants are absent after cleanup. The requested scripts and evidence remain on disk.

## Unknowns

- Quiet-host performance and long-lived memory/resource accumulation are unmeasured.
- The cause and repeatability of the shared-browser journey's upload-region visibility failure are unresolved; the comparison alone cannot attribute it to shared focus, viewport, pointer state, or browser ownership.
- Headed operation, operating-system foreground focus, other browser engines, and broader interaction interleavings are outside these headless measurements.
- The dual-protocol probe establishes simultaneous attachment and the observed inventory behavior; it does not establish arbitrary simultaneous control of the same page or complete Orkestrel context synchronization.
- The logs do not yield a separate Vite-startup duration.