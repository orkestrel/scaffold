# Veneer tests: browser lifecycle map

Grok 4.7 mapping lane `browser-lifecycle-tests`, 2026-10-03, over veneer `main` at `c6d831c`. Read-only; no live run.

## 1. Vitest projects

Every browser project uses the Playwright provider from `playwright(browserOptions)` in `vite.config.ts:23` and `vite.config.ts:155`. `browserOptions` is `resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)` (`configs/browsers.ts:289-314`). The scripts set none of `PLAYWRIGHT_EXECUTABLE_PATH`, `PLAYWRIGHT_WS_ENDPOINT`, or `PLAYWRIGHT_CHANNEL`. When the pinned Playwright Chromium executable is present, the return value is `{}` (`configs/browsers.ts:307-309`), so launch uses Playwright's own executable. Otherwise the same function returns `launchOptions.executablePath`, `connectOptions.wsEndpoint`, or `launchOptions.channel`. No project sets `persistentContext`, `contextOptions`, `trace`, `ui`, `maxWorkers`, or `pool`.

Each project sets one instance, `{ browser: 'chromium', headless: true }`. Vitest names that instance `<project> (chromium)` (`node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:10355-10356`), drops the parent project, and keeps one cloned project per instance (`cli-api.CnMVyzaz.js:11256-11300`). The clone gets its own `PlaywrightBrowserProvider`. The parent starts one Vite server with `vite.listen()` (`node_modules/@vitest/browser/dist/index.js:7899-7958`); `spawn` shares that server (`@vitest/browser/dist/index.js:2700-2706`).

`openBrowser` launches once per provider and then reuses that browser (`node_modules/@vitest/browser-playwright/dist/index.js:868-877`, launch at `941`). `headless` on the launch is the instance value `true` (`index.js:881-884`). `createContext` calls `browser.newContext` once per session (`index.js:1071-1093`). `openBrowserPage` calls `context.newPage` once per session (`index.js:1139-1151`). `close` closes pages, contexts, and `browser.close()` (`index.js:1188-1206`). A session is one orchestrator page at `/__vitest_test__/?sessionId=` (`cli-api.CnMVyzaz.js:11029-11040`). `vitest run` sets `watch` false (`cli-api.CnMVyzaz.js:14651`), runs files once (`cli-api.CnMVyzaz.js:13543-13546`), and `exit` calls `close` (`cli-api.CnMVyzaz.js:14032-14046`, `13998-14012`). `shouldKeepServer()` is false when watch is false (`cli-api.CnMVyzaz.js:14064-14066`).

Worker count is `getThreadsCount` (`cli-api.CnMVyzaz.js:2479-2483`): `1` when headless is false, `browser.fileParallelism` is false, or the provider lacks `supportsParallelism`. Playwright sets `supportsParallelism = true` (`browser-playwright/dist/index.js:832`). Otherwise the count is `min(12, availableParallelism - 1)`, at least `1`, for a non-watch run (`cli-api.CnMVyzaz.js:2401-2405`). Pages opened are `min(that count, file count)` (`cli-api.CnMVyzaz.js:2556-2566`). `fileParallelism: false` also forces project `maxWorkers` to `1` (`node_modules/vitest/dist/chunks/coverage.DM_a_rWm.js:223-225`). Defaults when unset: `isolate` true (`coverage.DM_a_rWm.js:492` with `defaults.9aQKnqFk.js:47`), `browser.fileParallelism` true in test mode (`coverage.DM_a_rWm.js:493`), `sequence.groupOrder` `0` (`coverage.DM_a_rWm.js:478`). Groups run one after another (`cli-api.CnMVyzaz.js:3762-3780`). Inside a group, providers that support parallelism run together (`cli-api.CnMVyzaz.js:2464-2477`).

With `browser.isolate` true, each file gets a new tester iframe in the existing page; the iframe is prepared, the file runs, then `cleanup` runs (`node_modules/@vitest/browser/dist/client/__vitest_browser__/orchestrator-jtzFEKPy.js:64-87`, `135-159`). With `browser.isolate` false, one iframe id `__vitest_all__` is reused for every file on that page (`orchestrator-jtzFEKPy.js:111-133`); `cleanupTesters` runs when that page's queue is empty (`cli-api.CnMVyzaz.js:2598-2608`, `orchestrator-jtzFEKPy.js:90-109`). `startTests` imports setup files at the start of each file (`node_modules/@vitest/runner/dist/chunk-artifact.js:3255-3281`, `2447-2450`). A new iframe evaluates them again. The shared iframe keeps the module graph already evaluated. No test file calls `it.concurrent` or `describe.concurrent`. The iframe viewport comes from `browser.viewport`, default `414×896` (`coverage.DM_a_rWm.js:500-502`, `orchestrator-jtzFEKPy.js:385-408`).

| Project | Where | `isolate` | `fileParallelism` | `groupOrder` | `maxWorkers` / pool | Browser and pages |
|---|---|---|---|---|---|---|
| `sheetProject` (`src:bootstrap`, `src:tailwindcss`, `src:styles`, `src:themes`, `integration`) | `vite.config.ts:143-162` | `false` | `false` | `1` | forced `1`; browser pool | 1 `chromium.launch`, 1 context, 1 page, 1 tester iframe for every file in that project |
| `src:browser` | `vite.config.ts:212-225` | default `true` | `false` | `1` | forced `1` | 1 launch, 1 page; a new tester iframe per file. 26 files under `tests/src/browser/` |
| `src:vue` | `vite.config.ts:252-263` | `true` | `false` | `1` | forced `1` | 1 launch, 1 page, 1 file (`tests/src/vue/index.test.ts`) |
| `app:browser` | `vite.config.ts:301-315` | `true` | `false` | `1` | forced `1` | 1 launch, 1 page. Include is `tests/app/browser/**/*.test.ts` excluding `tests/app/browser/integration.test.ts` (`vite.config.ts:305-306`): 8 files, 8 iframes in sequence |
| `app:vue` | `vite.config.ts:424-429` spreads `appBrowser` | `true` | `false` | `1` | forced `1` | 1 launch, 1 page, 1 file (`tests/app/vue/index.test.ts`; integration is excluded) |
| `journey:<variant>` | `vite.config.ts:384-405`, `configs/app/vite.journey.config.ts:5-26` | `true` | `false` | `Math.floor(index / 4) + 1` | forced `1` per project | 4 variants, all `groupOrder` `1`. Four projects, four Vite servers, four `chromium.launch` calls, four pages, together. Each project has one file and one iframe. Viewport is the variant (`vite.config.ts:399-402`) |
| `setup:browser` | `vite.config.ts:483-498` | `true` | default `true` | default `0` | browser workers `max(1, min(12, availableParallelism - 1))` | 1 launch, 1 Vite server. Two files (`tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`). Pages opened: `min(2, that worker count)`, each page one context and one file iframe |

`src:core`, `app:core`, `policy`, `config`, `setup`, `guides`, and `conformance` set `browser.enabled: false` (`vite.config.ts:175-181`, `273-279`, `434-442`, `448-462`, `466-479`, `502-513`, `519-531`). `distribution` and `probe` set no browser block (`vite.config.ts:535-549`, `566-580`), so `browser.enabled` stays false (`coverage.DM_a_rWm.js:489`).

`configs/src/vite.browser.config.ts` and `configs/src/vite.vue.config.ts` wrap `srcBrowser` and `srcVue`. `configs/src/vite.bootstrap.config.ts`, `vite.tailwindcss.config.ts`, `vite.styles.config.ts`, and `vite.themes.config.ts` call `sheetProject`. The styles include `tests/src/styles/**/*.test.ts` matches `tests/src/styles/index.test.ts` and `tests/src/styles/themes/index.test.ts`, so those two files share the styles project's page and iframe. `configs/src/vite.core.config.ts` is `srcCore`. `configs/app/vite.vue.config.ts` is `appVue`. `configs/app/vite.browser.config.ts` is `appBrowser`. `configs/app/vite.showcase.config.ts` builds through `appShowcase` (`vite.config.ts:350-379`), which keeps the application test block, and the showcase scripts call `vite` or `vite build`.

## 2. Harness on top of that page

`tests/setupBrowser.ts` and `tests/setupStyles.ts` are setup files. They run in the tester iframe, once per file when `isolate` is true and on the shared iframe when `isolate` is false. They do not launch a browser. `tests/setup.ts` is also a setup file and does not start a browser.

`createOracle` (`tests/setupBrowser.ts:3757-3837`) appends one same-origin `srcdoc` iframe to the tester document on each call, with its own `window` after the Bootstrap bundle loads. `destroy` removes that frame (`tests/setupBrowser.ts:3808-3809`). A thrown wait removes it too (`tests/setupBrowser.ts:3834-3836`). No setup hook removes a frame the caller left behind.

`buildShowcase` (`tests/setupBrowser.ts:445-451`) drops the previous module-level `mounted` showcase and constructs another. `buildJourney` (`tests/setupBrowser.ts:464-471`) calls `page.viewport` for the variant, then `buildShowcase`, then `applyTheme`. `destroyShowcase` (`tests/setupBrowser.ts:546-551`) destroys `journeyVeneer` and `mounted` and clears `componentRegions`. `buildComponent` (`tests/setupBrowser.ts:1304-1316`) reuses `mounted` across rows in that iframe until a later `buildJourney` or `destroyShowcase`. The journey file registers `afterEach` to call `destroyShowcase` (`tests/app/browser/integration.test.ts:133-137`). `tests/setupBrowser.test.ts:199-203` does the same. `startJourneyVeneer` (`tests/setupBrowser.ts:1286-1295`) replaces the previous engine in that module.

`mount` and `render` (`node_modules/@orkestrel/test/dist/src/browser/index.js:1430-1442`) append into the tester `document.body` on each call and record nothing to remove. `build` (`index.js:1396-1401`) creates an element and leaves it unmounted. `stagePane` (`index.js:2731-2755`) calls `page.viewport` and writes a style into the orchestrator document. `releasePane` (`index.js:2784-2792`) removes that style and restores the viewport. `captureFrame` calls `stagePane` and `releasePane` on the same page (`index.js:3074-3151`). `createHarness` (`index.js:3802-3896`) mounts a div; `destroy` removes it. `createJournal` swaps console methods until `stop` (`index.js:3610-3654`); the journey file starts it in `beforeAll` and stops it in `afterAll` (`tests/app/browser/integration.test.ts:130-131`). `createTeardown` (`node_modules/@orkestrel/test/dist/src/core/index.js:907-928`) is an in-memory handler list; `afterEach` runs it in `tests/setupBrowser.test.ts:199-202`, `tests/setupStyles.test.ts:25`, and `tests/integration.test.ts:26-27`. `adoptSheet` (`tests/setupStyles.ts:235-246`) adds a `CSSStyleSheet` to the tester document; `release` removes that sheet.

`readTouchListeners` calls `cdp()` (`tests/setupBrowser.ts:3683`). The provider's `getCDPSession` calls `page.context().newCDPSession(page)` (`browser-playwright/dist/index.js:1177-1186`). The browser server caches one handler per tester websocket (`@vitest/browser/dist/index.js:2722-2752`) and deletes the map entry when that socket closes (`@vitest/browser/dist/index.js:3045-3049`). A new tester iframe is a new websocket.

## 3. What `npm test` starts

`package.json:86` chains every script with `&&`, so one script process finishes before the next starts. Each `vitest run` is one process. `vitest run` is not watch mode. Inside one process, `groupOrder` still sequences projects, and projects that share a `groupOrder` and use this provider open their browsers together.

`test:src` (`package.json:88-94`) is five Vitest processes, in order: `src:core` then `src:browser` in one process (`groupOrder` 0, then 1); then bootstrap; tailwindcss; styles; vue. The first process launches one browser, for `src:browser`, after `src:core`. Each later process launches one browser. `test:src:styles` runs `vite build` for styles and for themes before its Vitest process (`package.json:93`, `116`). Those builds do not call `chromium.launch`. The themes Vitest config is not a separate `vitest run` in this chain; its test file runs inside the styles project.

`test:app` (`package.json:95-98`) is two processes: `app:core` then `app:browser` in one process, then `app:vue`. Two launches, one after the other.

`test:journey` is one process and four simultaneous launches. `test:journey:vue` is the same config with `--mode vue` (`package.json:102`), which selects `tests/app/vue/integration.test.ts` (`configs/helpers.ts:70-77`, `vite.config.ts:396`). Another four simultaneous launches, after the browser-mode journey process has exited.

`test:policy`, `test:config`, `test:setup`, and `test:conformance` are four Vitest processes with `browser.enabled: false`. `test:setup:browser` is one process, one launch, and up to two pages. `test:integration` is one process, one launch, one page, one iframe, for `tests/integration.test.ts`. `test:guides` is `node`, not Vitest (`package.json:87`).

A full `npm test` is 15 Vitest processes plus the guides Node process. It calls `chromium.launch` 17 times: five in `test:src`, two in `test:app`, four in `test:journey`, four in `test:journey:vue`, one in `test:setup:browser`, one in `test:integration`. The peak number alive at once is four, during each journey command. Each launch has a matching `vite.listen()` for that project's parent, closed in the same `vitest run` exit.

| Script | Vitest processes | `chromium.launch` | Pages alive at once |
|---|---|---|---|
| `test` | 15, then `test:guides` under Node | 17, scripts one after another | 4 during each journey command |
| `test:src` | 5 | 5, one process at a time | 1 |
| `test:src:core` | 1 | 0 | 0 |
| `test:src:browser` | 1 | 1 | 1, then 26 tester iframes |
| `test:src:bootstrap` | 1 after `vite build` | 1 | 1 |
| `test:src:tailwindcss` | 1 after `vite build` | 1 | 1 |
| `test:src:styles` | 1 after two `vite build`s | 1 | 1, both style files on that iframe |
| `test:src:vue` | 1 after two `vite build`s | 1 | 1 |
| `test:app` | 2 | 2, one process at a time | 1 |
| `test:app:core` | 1 | 0 | 0 |
| `test:app:browser` | 1 | 1 | 1, then 8 tester iframes |
| `test:app:vue` | 1 | 1 | 1 |
| `test:journey` | 1 | 4 at once | 4 |
| `test:journey:vue` | 1 | 4 at once | 4 |
| `test:setup:browser` | 1 | 1 | `min(2, max(1, min(12, availableParallelism - 1)))` |
| `test:conformance` | 1 | 0 | 0 |
| `test:integration` | 1 | 1 | 1 |

## 4. Across runs

`vitest run` exits through `close`: provider `close` closes the browser, and project `close` closes the Vite server (`cli-api.CnMVyzaz.js:10970-10974`, `13998-14012`). The next `&&` script starts a new process, evaluates `resolveBrowser` again, and calls `vite.listen()` and `chromium.launch` again. No project sets `globalSetup` (`coverage.DM_a_rWm.js:341` only normalizes an empty list). No config sets `persistentContext` or a standing browser server. `--no-cache` is on every Vitest script (`package.json:88-109`) and turns off Vitest's result cache (`node_modules/vitest/dist/chunks/cac.uFydS1Z4.js:1127-1136`, `coverage.DM_a_rWm.js:465-468`). The `connect` branch in `openBrowser` (`browser-playwright/dist/index.js:910-925`) runs when `resolveBrowser` returns `connectOptions`, which is the `PLAYWRIGHT_WS_ENDPOINT` branch (`configs/browsers.ts:299-301`). The package scripts do not set that variable.

## Unknowns

The page count for `setup:browser` depends on the host's `availableParallelism`; this checkout does not set `maxWorkers`. Child processes that Chromium starts under one `chromium.launch` are not counted in Vitest's or Playwright-provider's launch code. Whether a shell has `PLAYWRIGHT_EXECUTABLE_PATH`, `PLAYWRIGHT_WS_ENDPOINT`, or `PLAYWRIGHT_CHANNEL` set is outside these scripts. This reading did not attach to a live run, so the counts are the launches those sources perform.