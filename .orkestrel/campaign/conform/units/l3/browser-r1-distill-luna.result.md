## Question

For each `conform-browser` row, compare the current tree, diff, report, proofs, and required sweeps.

## Evidence

### Per-row entries

- **browser-obj-1**
  - **Site now:** The helper no longer exists at `src/core/helpers.ts:1808`; the surrounding code is `readBrowserSnapshot` ending at `src/core/helpers.ts:1800`, followed by `isBrowserNodeQuery` at `src/core/helpers.ts:1802`. The replacement is direct access at `guides/browser.md:207`: `const id = node.attributes['id']`.
  - **Diff:** `conform-browser.diff:67` (`@@ -146,7 +146,6 @@`), `:75` (`@@ -176,7 +175,6 @@`), `:83` (`@@ -205,7 +203,7 @@`), `:1413` (`@@ -1798,17 +1799,6 @@`), and `:4794` (`@@ -411,8 +410,8 @@`). The operative direct property read is present at `conform-browser.diff:87`.
  - **Old-form sweep:** `\battributeOfBrowserNode\b` and case-insensitive `attributeofbrowsernodes?` over `src`, `tests`, `guides/browser.md`, `guides/README.md`, and `README.md`: no hits.
  - **Report:** `applied` at `conform-browser-report.md:11`: “`attributeOfBrowserNode` deleted from source, test, guide Surface row, guide import list, and guide fence.” The current tree matches.
  - **Proof:** `npm run test:guides`; `browser-obj-1-red.txt` records `2 failed | 66 passed` at `browser-obj-1-red.txt:52`. The retained guide run records `198 passed` at `browser-subj-5-green.txt:26`.

- **browser-obj-2**
  - **Site now:** `tests/src/server/helpers.test.ts:343` and `:358` use `performance.now()`, with assertions at `:345` and `:364`. The corresponding `Browser.test.ts` assertion is at `:354` and `:360`; the former real-launch site was moved to `tests/service/browser.test.ts:539-542`.
  - **Diff:** `conform-browser.diff:5496` (`@@ -340,9 +340,9 @@`), `:5508` (`@@ -355,13 +355,13 @@`), and `:4875` (`@@ -375,13 +351,13 @@`). The `+` lines contain `performance.now()`.
  - **Old-form sweep:** `Date\.now\(\)` over the requested paths has no test hits. Unrelated retained hits are `src/server/helpers.ts:365,367,369,388`, `src/core/parsers.ts:377`, `src/core/BrowserClock.ts:35`, `src/core/BrowserHARManager.ts:101,157,179,228`, `src/core/BrowserNetworkManager.ts:183,253`, and `guides/browser.md:693`.
  - **Report:** `applied` at `conform-browser-report.md:12`: “Every paired `Date.now()` elapsed reading replaced with `performance.now()`; no budget or assertion shape changed.” The changed assertions match.
  - **Proof:** No row-specific failing-first control file is named for this row.

- **browser-obj-3**
  - **Site now:** `tests/setupServer.ts:277` returns `http://127.0.0.1:${this.port}`; `:281` returns `ws://127.0.0.1:${this.port}/cdp`; `:296` still binds with `listen(0, '127.0.0.1', ...)`. The expectation is `tests/setupServer.test.ts:191`.
  - **Diff:** `conform-browser.diff:2450` (`@@ -274,11 +274,11 @@`) and `:2437` (`@@ -188,7 +188,7 @@`). Both operative `127.0.0.1` lines are present.
  - **Old-form sweep:** `localhost` over the requested paths finds only unrelated guide examples at `guides/browser.md:298` and `:393`.
  - **Report:** `applied` at `conform-browser-report.md:13`: “`CDPTestServer.url` and `.endpoint` now return `127.0.0.1`; the bind at the `listen(0, '127.0.0.1', …)` call is untouched.” The tree matches.
  - **Proof:** No row-specific failing-first control file is named for this row.

- **browser-obj-4**
  - **Site now:** `tests/src/core/BrowserMouse.test.ts` exists with module coverage beginning at line 1. Mirrors exist for `BrowserKeyboard`, `BrowserTouch`, `BrowserSelectorManager`, `BrowserPerformance`, `BrowserTracing`, `BrowserProfiler`, `BrowserCoverage`, `BrowserWorker`, `BrowserDialog`, `BrowserFileChooser`, `BrowserDownload`, `BrowserRoute`, `BrowserWebSocket`, and `BrowserPermissionManager`; the inventory is confirmed by the test glob.
  - **Diff:** Each new file has a `@@ -0,0 +1,... @@` hunk: `BrowserCoverage` `:2693`, `BrowserDialog` `:2920`, `BrowserDownload` `:3007`, `BrowserFileChooser` `:3190`, `BrowserKeyboard` `:3285`, `BrowserMouse` `:3519`, `BrowserPerformance` `:3716`, `BrowserPermissionManager` `:3789`, `BrowserProfiler` `:3891`, `BrowserRoute` `:4067`, `BrowserSelectorManager` `:4236`, `BrowserTouch` `:4324`, `BrowserTracing` `:4399`, `BrowserWebSocket` `:4572`, and `BrowserWorker` `:4652`.
  - **Old-form sweep:** Mirror inventory over `src/core/*.ts` and `tests/src/core/*.test.ts`: every behavioural module has a mirror; only `constants.ts`, `types.ts`, and `index.ts` lack one.
  - **Report:** `applied` at `conform-browser-report.md:14`: “A mirrored test file now exists for every `src/core` module the row named.” The current inventory matches.
  - **Proof:** `browser-obj-4-modules.txt` and `browser-obj-4-green.txt` exist, but their `Tests` summary was not read in the supplied report evidence.

- **browser-obj-5**
  - **Site now:** The old conditional block no longer exists in `tests/src/server/Browser.test.ts`; the file ends at line 1536. The moved suite begins at `tests/service/browser.test.ts:33` and imports `requireSystemBrowser` at `:28`. The `service` project is at `vite.config.ts:148-159`; `test:service` is at `package.json:82`; `prepublishOnly` includes it at `package.json:81`; readiness setup is `tests/setupService.ts:47-60`.
  - **Diff:** `conform-browser.diff:4891` (`@@ -1557,573 +1533,3 @@`), `:1717` (`@@ -0,0 +1,601 @@`), `:2478` (`@@ -0,0 +1,92 @@`), `:2576` (`@@ -0,0 +1,64 @@`), `:5610` (`@@ -142,6 +142,23 @@`), `:5634` (`@@ -177,6 +194,6 @@`), and `:1119` (`@@ -78,8 +78,9 @@`). The moved service suite and hard failure are present.
  - **Old-form sweep:** `describe\.runIf\(REAL_BROWSER_EXECUTABLE` has no hit. `REAL_BROWSER_EXECUTABLE` remains only in the service project.
  - **Report:** `applied` at `conform-browser-report.md:15`: “`service` project, `tests/setupService.ts`, `tests/service/browser.test.ts`, `test:service`, `prepublishOnly` step.” The tree matches, with the report’s recorded setup-file deviation.
  - **Proof:** `browser-obj-5-red.txt` records `1 failed | 50 passed` at `:28`; `browser-obj-5-setup.txt` records `3 passed` and `51 passed` at `:8`; `browser-obj-5-green.txt` records `1 passed` and `14 passed` at `:8`.

- **browser-obj-6**
  - **Site now:** `src/server/factories.ts:40-42` returns `new FileBrowserWriter()`. `src/server/writers/FileBrowserWriter.ts:22` defines the class and `:30-33` writes the bytes after creating parent directories. `src/server/index.ts:6` exports it. The guide has the Surface row at `guides/browser.md:291` and the method table at `:1306`.
  - **Diff:** `conform-browser.diff:1520` (`@@ -1,9 +1,8 @@`), `:1531` (`@@ -39,10 +38,5 @@`), `:1629` (`@@ -3,5 +3,6 @@`), `:1677` (`@@ -0,0 +1,34 @@`), and `:5529` (`@@ -0,0 +1,76 @@`). The operative class and factory lines are present.
  - **Old-form sweep:** No anonymous writer implementation remains in `factories.ts`; no stale `FileBrowserWriter` omission remains from the barrel or guide.
  - **Report:** `applied` at `conform-browser-report.md:16`: “`FileBrowserWriter` class, barrel row, guide Surface row and method table, mirrored test.” The tree matches.
  - **Proof:** `browser-obj-6-red.txt` records `1 failed | 4 passed` at `:18`; `browser-obj-6-green.txt` records `1 passed` and `5 passed` at `:8`.

- **browser-obj-7**
  - **Site now:** `tests/setupServer.ts:447` declares `export interface RegisteredFakeBrowser`; its existing TSDoc is at `:446`. The mutable registry remains unexported at `:452`.
  - **Diff:** `conform-browser.diff:2450` (`@@ -444,7 +444,7 @@`), with `+export interface RegisteredFakeBrowser`.
  - **Old-form sweep:** No unexported `interface RegisteredFakeBrowser` declaration remains.
  - **Report:** `applied` at `conform-browser-report.md:17`: “`export` added to `interface RegisteredFakeBrowser`; its existing TSDoc left alone, per the refuter's strike.” The tree matches.
  - **Proof:** No planted red control is required by the report’s structural-row classification.

- **browser-obj-8**
  - **Site now:** `src/core/helpers.ts:69-75` imports parsers; `src/core/parsers.ts:30-35` imports helper decoders. No implementation class is imported by either leaf file.
  - **Diff:** No diff hunk touches this row.
  - **Old-form sweep:** Not applicable; no symbol was removed or renamed.
  - **Report:** `noop` at `conform-browser-report.md:18`: “Ruled exception. `parsers.ts` imports no implementation class, so the leaf-pair cycle is the acceptable shape.” The current tree matches.
  - **Proof:** No behavioural control is required for the retained cycle.

- **browser-obj-9**
  - **Site now:** `src/server/helpers.ts:225-230` calls the resolver and passes its output through `readFirstLine`; `:251-257` splits and trims lines. `launchBrowserProcess` remains at `:339-343`.
  - **Diff:** No diff hunk touches this row.
  - **Old-form sweep:** Not applicable; no symbol was removed or renamed.
  - **Report:** `noop` at `conform-browser-report.md:19`: “Ruled exception. `@orkestrel/process` is undeclared; `readFirstLine` already performs the mandated split-and-trim.” The current tree matches.
  - **Proof:** No behavioural control is required for the retained exception.

- **browser-subj-1**
  - **Site now:** `guides/browser.md:681` calls `keyToBrowserInput('Enter')`; `:682` calls `extractBrowserChord('Control+Enter')`.
  - **Diff:** `conform-browser.diff:389` (`@@ -679,8 +678,8 @@`). The corrected `Enter` call is present.
  - **Old-form sweep:** `keyToBrowserInput\('Control\+Enter'\)` has no hit.
  - **Report:** `applied` at `conform-browser-report.md:20`: “Guide fence now calls `keyToBrowserInput('Enter')`, and the new keyboard suite executes that call.” The tree matches.
  - **Proof:** The keyboard suite exists at `tests/src/core/BrowserKeyboard.test.ts:26-42`; no separate control file is named.

- **browser-subj-2**
  - **Site now:** `guides/README.md:3` has no section citation; `:80` reads “the rules, including the documentation contract.”
  - **Diff:** `conform-browser.diff:5` (`@@ -1,6 +1,6 @@`) and `:38` (`@@ -63,7 +63,7 @@`). The replacement text is present.
  - **Old-form sweep:** `\bAGENTS\s*§|documentation-as-contracts` over the requested files: no hits.
  - **Report:** `applied` at `conform-browser-report.md:21`: “Both `AGENTS §22` citations removed from `guides/README.md`.” The tree matches.
  - **Proof:** No behavioural control is required.

- **browser-subj-3**
  - **Site now:** `guides/browser.md:435` includes `context: [context]`; `:437` includes `isolate`; `:260` lists `emitter / id / cookies / permissions / storage / emulation`; Contract clause 6 lists `context` at `:1890`.
  - **Diff:** `conform-browser.diff:101` (`@@ -259,11 +257,11 @@`), `:196` (`@@ -433,9 +432,9 @@`), and `:1014` (`@@ -1347,7 +1888,7 @@`). The operative additions are present.
  - **Old-form sweep:** No removed symbol or stale member phrase remains in the affected guide rows.
  - **Report:** `applied` at `conform-browser-report.md:22`: “`context` added to the `BrowserEventMap` shape cell and the Contract event list; `isolate` added; context members restated.” The tree matches.
  - **Proof:** `tests/guides.test.ts:91-120` supplies the parity checks; the guide run records `198 passed` at `browser-subj-5-green.txt:26`.

- **browser-subj-4**
  - **Site now:** Contract clause 10 lists `BrowserWebSocketInterface` and `BrowserDownloadInterface` at `guides/browser.md:1940-1950`, with `BrowserWebSocket` and `BrowserDownload` at `:1957-1959`.
  - **Diff:** `conform-browser.diff:420` (`@@ -915,7 +916,27 @@`) and `:1032` (`@@ -1396,19 +1937,43 @@`). The added interface and class names are present.
  - **Old-form sweep:** No stale exhaustive enumeration omitting the two tables remains.
  - **Report:** `applied` at `conform-browser-report.md:23`: “Contract clause 10 enumerates `BrowserWebSocketInterface`, `BrowserDownloadInterface`, and their classes.” The tree matches.
  - **Proof:** The guide parity run records `198 passed` at `browser-subj-5-green.txt:26`.

- **browser-subj-5**
  - **Site now:** Method tables exist from `guides/browser.md:1306` through the Extended surface, including `BrowserWriterInterface`, `BrowserNavigationManagerInterface`, `BrowserLocatorInterface`, `BrowserKeyboardInterface`, `BrowserMouseInterface`, `BrowserTouchInterface`, and `BrowserEmulationManagerInterface:1808`.
  - **Diff:** The main additions are `conform-browser.diff:472` (`@@ -1282,6 +1303,526 @@`) and `:1032` (`@@ -1396,19 +1937,43 @@`). The new method tables and fences are present.
  - **Old-form sweep:** No missing-table wording remains; `^#### \`` enumerates the extended interfaces.
  - **Report:** `applied` at `conform-browser-report.md:24`: “One `####` method table per behavioral interface the Extended surface introduces, each with a runnable fence.” The tree matches.
  - **Proof:** `browser-subj-5-first.txt` records the expected pre-fix missing `FileBrowserWriter` export at `:28`; `browser-subj-5-green.txt` records `198 passed` at `:26`.

- **browser-subj-6**
  - **Site now:** The listed banned vocabulary is absent from `guides/browser.md`; the corrected clauses include `because` at `:307` and `:1569`.
  - **Diff:** Guide vocabulary hunks include `conform-browser.diff:38`, `:49`, `:58`, `:123`, `:132`, `:141`, `:159`, `:177`, `:196`, `:389`, `:1082`, `:1095`, and `:1106`.
  - **Old-form sweep:** `\bvia\b|\be\.g\.\b|\bshould\b|\bsince\b` over `guides/browser.md`, `guides/README.md`, and `README.md`: no hits.
  - **Report:** `applied` at `conform-browser-report.md:25`: “Every banned substitution replaced in `guides/browser.md`, the two under-reported causal `since` uses included.” The tree matches.
  - **Proof:** No behavioural control is required.

- **browser-subj-7**
  - **Site now:** `src/server/types.ts:125` documents `context`; `:185-188` documents `isolate`; declarations are at `:137` and `:260`.
  - **Diff:** `conform-browser.diff:1644` (`@@ -122,7 +122,8 @@`), `:1654` (`@@ -182,7 +183,7 @@`), and `:1663` (`@@ -218,6 +219,8 @@`). The operative bullets are present.
  - **Old-form sweep:** No stale event or lifecycle enumeration remains in the affected TSDoc blocks.
  - **Report:** `applied` at `conform-browser-report.md:26`: “`context` and `isolate` bullets added to the `BrowserEventMap` and `BrowserInterface` `@remarks`.” The tree matches.
  - **Proof:** No behavioural control is required.

- **browser-subj-8**
  - **Site now:** The changed published comments use `through` in `src/core/types.ts:330,370`, `src/server/types.ts:125,185`, `src/core/CDPClient.ts:183`, `src/core/constants.ts:215`, and `src/server/helpers.ts:57`; `for example` is at `src/server/helpers.ts:328`; `because` is at `src/server/constants.ts:37`.
  - **Diff:** Relevant hunks are `conform-browser.diff:1451`, `:1460`, `:1371`, `:1384`, `:1507`, `:1547`, and `:1620`. The replacements are present.
  - **Old-form sweep:** `\bvia\b|\be\.g\.\b|\bshould\b|\bsince\b` over `src`: no hits.
  - **Report:** `applied` at `conform-browser-report.md:27`: “`via`, `e.g.`, and the causal `since` replaced across `src`.” The tree matches.
  - **Proof:** No behavioural control is required.

- **browser-subj-9**
  - **Site now:** `BrowserPageOptions` has `on` and `error` at `src/core/types.ts:195-196`; `BrowserContextOptions` has them at `:1421-1422`. `BrowserPage` initializes its emitter at `BrowserPage.ts:151-154`; `BrowserContext` does so at `BrowserContext.ts:75-78`; `BrowserContext.#attach` passes options at `:250`; `Browser.isolate` passes options at `Browser.ts:227`.
  - **Diff:** `conform-browser.diff:1339` (`@@ -14,6 +14,7 @@`), `:1347` (`@@ -138,6 +139,7 @@`), `:1355` (`@@ -146,7 +148,10 @@`), `:1134`, `:1150`, `:1158`, `:1204`, and `:1495`. The conditional-spread emitter initialization is present.
  - **Old-form sweep:** No bare `new Emitter()` remains in `BrowserPage` or `BrowserContext`.
  - **Report:** `applied` at `conform-browser-report.md:28`: “`on` and `error` added to `BrowserPageOptions` and `BrowserContextOptions`, threaded with the conditional-spread form.” The tree matches.
  - **Proof:** `browser-subj-9-red.txt` records `2 failed | 102 passed` at `:34`; `browser-subj-9-green.txt` records `2 passed` and `104 passed` at `:8`.

- **browser-subj-10**
  - **Site now:** `BrowserEmulationManager.ts:132` calls `page.network.offline`, `:135` calls `page.network.headers`, `:164` clears offline through the network manager, and `:167` clears headers through it.
  - **Diff:** `conform-browser.diff:1276` (`@@ -129,15 +129,10 @@`) and `:1294` (`@@ -165,15 +160,10 @@`). The four operative calls are present.
  - **Old-form sweep:** No inline `Network.emulateNetworkConditions` or `Network.setExtraHTTPHeaders` remains in `BrowserEmulationManager.ts`; those protocol methods remain in the network manager.
  - **Report:** `applied` at `conform-browser-report.md:29`: “`BrowserEmulationManager` routes offline and headers through `page.network`; the Network start is pinned by a new test.” The tree matches.
  - **Proof:** `browser-subj-10-red.txt` records `1 failed | 7 passed` at `:17`; `browser-subj-10-green.txt` records `1 passed` and `8 passed` at `:8`.

- **browser-subj-12**
  - **Site now:** `src/core/helpers.ts:1460` declares `extractBrowserChord`; `BrowserKeyboard.ts:9` imports it and `:69` calls it. The guide Surface row is `guides/browser.md:512`, the import is at `:597`, and the fence is at `:682`.
  - **Diff:** `conform-browser.diff:1397` (`@@ -1452,12 +1452,13 @@`), `:1316` (`@@ -5,8 +5,8 @@`), `:1326` (`@@ -66,7 +66,7 @@`), `:381` (`@@ -602,7 +602,6 @@`), and `:389` (`@@ -679,8 +678,8 @@`). The replacement name appears in all operative `+` lines.
  - **Old-form sweep:** `\bparseBrowserChord\b` and case-insensitive `parsebrowserchords?` over the requested paths: no hits.
  - **Report:** `applied` at `conform-browser-report.md:30`: “`parseBrowserChord` renamed to `extractBrowserChord` in place, with its call site, guide row, import, and fence.” The tree matches.
  - **Proof:** The new keyboard suite exercises `extractBrowserChord` at `tests/src/core/BrowserKeyboard.test.ts:26-42`; no separate control file is named.

- **browser-subj-14**
  - **Site now:** `src/server/helpers.ts:284` declares `findStorePaths`; its caller is at `:80`; guide rows and examples are at `guides/browser.md:364,387,415`; tests use the new name at `tests/src/server/helpers.test.ts:291`.
  - **Diff:** `conform-browser.diff:1611` (`@@ -281,7 +283,7 @@`), `:141`, `:159`, `:177`, `:407`, `:5469`, and `:5487`. The replacement name appears in source, guide, and test additions.
  - **Old-form sweep:** `\bfindInStore\b` and case-insensitive `findinstores?` over the requested paths: no hits.
  - **Report:** `applied` at `conform-browser-report.md:31`: “`findInStore` renamed to `findStorePaths`, with its call site, guide row, import, fence, and test.” The tree matches.
  - **Proof:** No separate control file is named.

- **browser-subj-15**
  - **Site now:** `BrowserDownloadInterface.update` remains at `src/core/types.ts:880`; `BrowserWebSocketInterface.receive`, `transmit`, `fail`, and `close` remain at `:1041-1047`. The corresponding guide tables are at `guides/browser.md:1254` and `:1282`.
  - **Diff:** No diff hunk touches this row.
  - **Old-form sweep:** Not applicable; no symbol was removed or renamed.
  - **Report:** `noop` at `conform-browser-report.md:32`: “Exempt as ruled. The drive methods stay on their published contracts; the split is the Orchestrator's decision.” The tree matches.
  - **Proof:** No behavioural control is required.

- **browser-subj-16**
  - **Site now:** `src/server/helpers.ts:188` declares `buildInstallPaths`, `:205` declares `buildWindowsRoots`, and `:260` declares `buildStoreBases`. Callers are at `:72`, `:78`, and `:194`; guide rows are at `guides/browser.md:358-364`.
  - **Diff:** `conform-browser.diff:1591` (`@@ -202,13 +202,13 @@`), `:1602` (`@@ -257,7 +257,7 @@`), `:1611` (`@@ -281,7 +283,7 @@`), guide hunks `:141`, `:159`, `:177`, `:407`, and test hunk `:5487`. The new names are present.
  - **Old-form sweep:** Exact old-name pattern over the requested paths: no hits. The inflected case-insensitive `windowsrootss?` pattern finds only the new `buildWindowsRoots` at `guides/browser.md:359,382,409`.
  - **Report:** `applied` at `conform-browser-report.md:33`: “`buildInstallPaths`, `buildWindowsRoots`, `buildStoreBases`, with every call site, guide row, import, fence, and test.” The tree matches.
  - **Proof:** No separate control file is named.

- **browser-subj-17**
  - **Site now:** `BrowserContext` has only `#shutdown` at `src/core/BrowserContext.ts:58`. Reads derive from it at `:120,137,185,213,217,435,453`; the `#closed` field and assignments are absent.
  - **Diff:** `conform-browser.diff:1142` (`@@ -55,7 +56,6 @@`), `:1188` (`@@ -139,7 +143,6 @@`), `:1196` (`@@ -149,7 +152,6 @@`), `:1170`, `:1179`, `:1204`, `:1223`, `:1254`, and `:1263`. The derived expression is present in the `+` lines.
  - **Old-form sweep:** `this\.#closed|#closed` has no hit in `BrowserContext.ts`; `BrowserPage.ts` legitimately retains its independent `#closed` at `:105,218,407,417,423,431,580,686,706,727,760`.
  - **Report:** `applied` at `conform-browser-report.md:34`: “`#closed` deleted from `BrowserContext`; every read derives from `this.#shutdown !== undefined`.” The scoped tree matches.
  - **Proof:** No planted red control is named.

- **browser-subj-18**
  - **Site now:** `guides/README.md:65-70` documents `test.md`; `:72-77` documents `probe.md`. Both describe byte-identical mirrors and state that they document the dependency package’s surface.
  - **Diff:** `conform-browser.diff:13` (`@@ -62,6 +62,19 @@`). Both paragraphs are present.
  - **Old-form sweep:** No stale dependency-reference omission remains for `test.md` or `probe.md`.
  - **Report:** `applied` at `conform-browser-report.md:35`: “`test.md` and `probe.md` paragraphs added to `## Dependency reference`.” The tree matches.
  - **Proof:** No behavioural control is required.

- **fleet-F1**
  - **Site now:** `isBrowserVuePath` is absent from `tests`, `src`, `guides`, `vite.config.ts`, and `package.json`.
  - **Diff:** No hunk touches this row.
  - **Old-form sweep:** `\bisBrowserVuePath\b`: no hits.
  - **Report:** `noop` at `conform-browser-report.md:36`: “`grep -rn "isBrowserVuePath" tests src guides vite.config.ts package.json` returns nothing: the helper is absent.” The tree matches.
  - **Proof:** Not applicable.

- **fleet-F2**
  - **Site now:** The listed implementation classes use private `#id` fields and prototype getters. The report’s class inventory covers `BrowserWorker`, `BrowserDownload`, `BrowserRoute`, `BrowserWebSocket`, `BrowserContext`, `BrowserPage`, `BrowserFrame`, `BrowserHandle`, `Browser`, `WebSocketCDPTransport`, and `FileBrowserWriter`.
  - **Diff:** No hunk touches this row.
  - **Old-form sweep:** `readonly id: string$` over the implementation class files: no hits.
  - **Report:** `noop` at `conform-browser-report.md:37-43`: “No implementation class declares a public `readonly id: string` field; each stores `readonly #id` and exposes `get id()`.” The current source matches the recorded inventory.
  - **Proof:** Not applicable.

### Across the unit

#### Scope

Every path in `conform-browser.status` is under the brief’s Owned scope:

- `owned`: `guides/README.md`, `guides/browser.md`, `package.json`, `src/core/BrowserContext.ts`, `src/core/BrowserEmulationManager.ts`, `src/core/BrowserKeyboard.ts`, `src/core/BrowserPage.ts`, `src/core/CDPClient.ts`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/server/Browser.ts`, `src/server/constants.ts`, `src/server/factories.ts`, `src/server/helpers.ts`, `src/server/index.ts`, `src/server/types.ts`, `src/server/writers/FileBrowserWriter.ts`, `tests/service/browser.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupService.test.ts`, `tests/setupService.ts`, `tests/src/core/BrowserContext.test.ts`, `tests/src/core/BrowserCoverage.test.ts`, `tests/src/core/BrowserDialog.test.ts`, `tests/src/core/BrowserDownload.test.ts`, `tests/src/core/BrowserEmulationManager.test.ts`, `tests/src/core/BrowserFileChooser.test.ts`, `tests/src/core/BrowserKeyboard.test.ts`, `tests/src/core/BrowserMouse.test.ts`, `tests/src/core/BrowserPage.test.ts`, `tests/src/core/BrowserPerformance.test.ts`, `tests/src/core/BrowserPermissionManager.test.ts`, `tests/src/core/BrowserProfiler.test.ts`, `tests/src/core/BrowserRoute.test.ts`, `tests/src/core/BrowserSelectorManager.test.ts`, `tests/src/core/BrowserTouch.test.ts`, `tests/src/core/BrowserTracing.test.ts`, `tests/src/core/BrowserWebSocket.test.ts`, `tests/src/core/BrowserWorker.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/server/Browser.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/writers/FileBrowserWriter.test.ts`, and `vite.config.ts`.
- `shared`: no paths.
- `off-limits`: no paths.

Non-Where diff files and hunks are still within Owned repair scope: `package.json` at `conform-browser.diff:1119`, `vite.config.ts` at `:5610` and `:5634`, setup infrastructure at `:2323`, `:2385`, and `:2478`, the moved service proof at `:1717`, and the mirrored test additions listed under browser-obj-4.

#### Residue

Diff `+`-line sweep over `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `.skip`: `conform-browser.diff:2567` — `expect(source).not.toContain('.skip(')`.
- `retry`: `conform-browser.diff:304` — guide text “Compile an auto-retrying page predicate.”
- `timeout`: `conform-browser.diff:97,128,304,368,499,683,1775,1814,1860,1888,1904,1920,1936,1945,1953,1973,2009,2050,2057,2093,2124,2176,2202,2211,2235,2250,2257,2285,5625,5626`.
- `debugger`: `conform-browser.diff:2107-2115`, through `webSocketDebuggerUrl` and the explicit missing-URL error.
- `TODO`, `FIXME`, `console.` and `.only(`: no diff `+` hits.

Tree sweep over `src` and `tests`, excluding the four vendored test files:

- `src/server/Browser.ts`: `444,512,520,530,560,569,570,649,650,732,902,996,999,1061,1063,1072,1075,1082,1085,1086`.
- `src/core/BrowserContext.ts`: `182,365`.
- `src/core/BrowserPage.ts`: `47,49,113,125,132,139,140,184,186,196,200,205,212,238,245,267,271,279,285,286,287,307,313,315,438,439,442,456,464,465,467,476,506,507,518,521,526,722,746,748,949,961,962,987`.
- `src/core/types.ts`: `61,72,82,86,115,192,199,207,212,230,237,250,256,322,915,916,1522,1525,1560,1579`.
- `src/server/helpers.ts`: `15,172,348,351,354,356,360,365,367,372,373,379,393,394,408,423,428,478`.
- `src/core/BrowserKeyboard.ts`: `74,88`.
- `src/core/constants.ts`: `83,84,197,201`.
- `src/core/CDPClient.ts`: `11,12,51,58,69,131,134,137,142,148,244,269,279,301`.
- `src/core/BrowserClock.ts`: `2,86,88,100`.
- `src/core/compilers.ts`: `19,22,25,27,40,446,449,480,483,514,517,553,556,631,637,658,660,663,673,679,700,702,705,715,721,747,749,752,762,768,794,796,799`.
- `src/core/BrowserTracing.ts`: `8,116,118,123`.
- `src/core/BrowserWorker.ts`: `44,54`.
- `src/core/BrowserFrame.ts`: `162,166,206,240,248,253,258,263`.
- `src/core/BrowserLocator.ts`: `21,268,269,271,274,279,282,287,293,296,437,467,527,530,532,534,536`.
- `src/core/BrowserNavigationManager.ts`: `7,9,20,37,41,44,49,60,62,66,68,75,83,89,90,91`.
- `tests/setupService.test.ts:89`.
- `tests/service/browser.test.ts`: `58,97,143,171,187,203,219,228,236,256,292,333,340,376,390-398,407,459,485,494,518,533,540,544,568`.
- `tests/src/server/Browser.test.ts`: `349,352,602,634,659,677,694,713,738,774,793,807,837,870,888,953,1120,1151,1185,1231,1332,1381,1386,1398,1419,1445,1470,1499`.
- `tests/setup.test.ts`: `240,322,340,343,385`.
- `tests/setupServer.ts`: `13,59,62,64,493,656,694,719,735`.
- `tests/setupServer.test.ts`: `24,184,212,411`.
- `tests/src/core/BrowserPage.test.ts`: `22,132,139,140,184,186,188,196,200,205,212,213,238,245,248,262,267,271,279,285,286,287,307,313,315,730,736`.
- `tests/src/core/BrowserFrame.test.ts`: `11,286,295,296,312,318,340,342,353,354`.
- `tests/src/core/CDPClient.test.ts`: `8,10,103,111,137,143,144,151,152,155,158,159,164,168,169`.
- `tests/src/core/errors.test.ts`: `7,13,23,36`.
- `tests/src/core/BrowserCodegen.test.ts`: `101,128`.
- `tests/src/core/BrowserNavigationManager.test.ts`: `166,174,194,198,201,202`.
- `tests/src/server/helpers.test.ts`: `330,336`.
- `tests/src/server/transports/WebSocketCDPTransport.test.ts:5`.

#### Parity

| Entity | Interface members in `types.ts` | Guide method rows |
|---|---|---|
| `CDPClient` | `emitter`, `connected`; `connect`, `reconnect`, `send`, `subscribe`, `unsubscribe`, `close` at `src/core/types.ts:121-133` | `guides/browser.md:958-989`: `connect`, `reconnect`, `send`, `subscribe`, `unsubscribe`, `close` |
| `BrowserContext` | `emitter`, `id`, `cookies`, `permissions`, `storage`, `emulation`; `page`, `pages`, `create`, `sync`, `destroy`, `close` at `src/core/types.ts:1793-1805` | `guides/browser.md:994-1010`: `page`, `pages`, `create`, `sync`, `destroy`, `close` |
| `BrowserPage` | inherited frame methods plus `navigate`, `reload`, `back`, `forward`, `screenshot`, `pdf`, `frame`, `frames`, `snapshot`, `codegen`, `destroy`, `close` at `src/core/types.ts:1752-1774` | `guides/browser.md:1063-1112`: all page-specific and inherited rows |
| `BrowserEmulationManager` | `apply`, `clear`, `attach` at `src/core/types.ts:1391-1394` | `guides/browser.md:1808-1822`: `apply`, `clear`, `attach` |
| `BrowserKeyboard` | `down`, `up`, `press`, `type`, `insert` at `src/core/types.ts:743-748` | `guides/browser.md:1576-1593`: `down`, `up`, `press`, `type`, `insert` |
| `BrowserWriter` | `write` at `src/core/types.ts:165-166` | `guides/browser.md:1306-1320`: `write` |
| `Browser` | `emitter`, `engine`, `status`, `connection`, `owned`, `pid`; `discover`, `connect`, `adopt`, `disconnect`, `context`, `contexts`, `isolate`, `create`, `destroy`, `close` at `src/server/types.ts:226-263` | `guides/browser.md:1218-1250`: matching method rows |
| `BrowserPageOptions` | readonly data properties `on`, `error`, `url`, `viewport`, `timeout` at `src/core/types.ts:194-199` | Surface row `guides/browser.md:229` |
| `BrowserContextOptions` | readonly data properties `on`, `error`, `proxy`, `origins`, `downloads`, `emulation` at `src/core/types.ts:1420-1428` | Surface row `guides/browser.md:782` |

The added guide API identifiers resolve through the published core or server barrels according to `tests/guides.test.ts:91-160`. Non-API backticks in the added guide material are dependency links, source aliases, or prose references rather than browser-barrel exports.

#### Gates

The report’s gate table at `conform-browser-report.md:127-140` records:

| Command | Exit | Reading |
|---|---:|---|
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | Root, `src:core`, and `src:server` typechecks clean |
| `npm run build` | 0 | `dist/src/core` and `dist/src/server` emitted with declarations |
| `npm test` | 0 | `45` source files and `610` source tests passed; policy, config, setup, and guides passed |
| `npm run test:service` | 0 | `14` real Chromium tests passed |
| `npx scaffold audit --offline` | 0 | `0 of 40` planned paths drifted |

The corresponding proof files contain the command output and exit-producing summaries: `gate-format-check.txt`, `gate-lint-check.txt`, `gate-check.txt`, `gate-build.txt`, `gate-test.txt`, `browser-obj-5-green.txt`, and `scaffold-audit.txt`.

#### Breaking

The report’s § Breaking at `conform-browser-report.md:145-160` names:

| Removed or renamed | Replacement | Consumer edit |
|---|---|---|
| `attributeOfBrowserNode` | direct property access | Replace `attributeOfBrowserNode(node, name)` with `node.attributes[name]` |
| `parseBrowserChord` | `extractBrowserChord` | Rename imports and calls |
| `findInStore` | `findStorePaths` | Rename imports and calls |
| `defaultInstallPaths` | `buildInstallPaths` | Rename imports and calls |
| `windowsRoots` | `buildWindowsRoots` | Rename imports and calls |
| `defaultStoreBases` | `buildStoreBases` | Rename imports and calls |

`FileBrowserWriter` is recorded as additive at `conform-browser-report.md:160`.

Word-boundary sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding the browser checkout and vendored guide mirrors: no hits for any old published name.

#### Writing sweep

Diff `+`-line sweep over the requested vocabulary finds these prose-file hits:

- `conform-browser.diff:463`: “a new recorder”
- `conform-browser.diff:533`: “new-document scripts”
- `conform-browser.diff:537`: “every new document”
- `conform-browser.diff:661`: “a new locator”
- `conform-browser.diff:774`: “currently pressed buttons”
- `conform-browser.diff:1649`: “a new page”

The growable-count pattern over the same diff additions finds no hits.

## Distillate

- `browser-obj-1: site removed; diff present yes; old form hits 0; report matches yes`
- `browser-obj-2: performance measurements at tests/src/server/helpers.test.ts:343,358 and tests/src/server/Browser.test.ts:354; diff present yes; old form hits 12 unrelated Date.now uses; report matches yes`
- `browser-obj-3: fixture URLs at tests/setupServer.ts:277,281; diff present yes; old form hits 2 unrelated localhost guide uses; report matches yes`
- `browser-obj-4: mirrored suites exist for all named modules; diff present yes; old form hits 0; report matches yes`
- `browser-obj-5: live suite moved to tests/service/browser.test.ts:33; diff present yes; old form hits 0; report matches yes`
- `browser-obj-6: FileBrowserWriter at src/server/writers/FileBrowserWriter.ts:22; diff present yes; old form hits 0; report matches yes`
- `browser-obj-7: exported RegisteredFakeBrowser at tests/setupServer.ts:447; diff present yes; old form hits 0; report matches yes`
- `browser-obj-8: retained helpers/parsers cycle; diff present no; old form hits 0; report matches yes`
- `browser-obj-9: retained split-and-trim path at src/server/helpers.ts:225-257; diff present no; old form hits 0; report matches yes`
- `browser-subj-1: corrected guide fence at guides/browser.md:681; diff present yes; old form hits 0; report matches yes`
- `browser-subj-2: corrected guide map at guides/README.md:3,80; diff present yes; old form hits 0; report matches yes`
- `browser-subj-3: guide parity additions at guides/browser.md:260,435,437,1890; diff present yes; old form hits 0; report matches yes`
- `browser-subj-4: Contract clause 10 at guides/browser.md:1940-1965; diff present yes; old form hits 0; report matches yes`
- `browser-subj-5: extended method tables at guides/browser.md:1306-1822; diff present yes; old form hits 0; report matches yes`
- `browser-subj-6: vocabulary sweep clean; diff present yes; old form hits 0; report matches yes`
- `browser-subj-7: TSDoc additions at src/server/types.ts:125,185; diff present yes; old form hits 0; report matches yes`
- `browser-subj-8: published TSDoc sweep clean; diff present yes; old form hits 0; report matches yes`
- `browser-subj-9: emitter options and threading at src/core/types.ts:194-199,1420-1428; diff present yes; old form hits 0; report matches yes`
- `browser-subj-10: network-manager delegation at src/core/BrowserEmulationManager.ts:132-167; diff present yes; old form hits 0; report matches yes`
- `browser-subj-12: `extractBrowserChord` at src/core/helpers.ts:1460; diff present yes; old form hits 0; report matches yes`
- `browser-subj-14: `findStorePaths` at src/server/helpers.ts:284; diff present yes; old form hits 0; report matches yes`
- `browser-subj-15: retained drive methods at src/core/types.ts:880,1041-1047; diff present no; old form hits 0; report matches yes`
- `browser-subj-16: build-prefixed helpers at src/server/helpers.ts:188,205,260; diff present yes; old form hits 0; report matches yes`
- `browser-subj-17: derived shutdown state at src/core/BrowserContext.ts:58,120,137,185,213,217,435,453; diff present yes; old form hits 10 in BrowserPage only; report matches yes`
- `browser-subj-18: dependency-map additions at guides/README.md:65-77; diff present yes; old form hits 0; report matches yes`
- `fleet-F1: helper absent; diff present no; old form hits 0; report matches yes`
- `fleet-F2: no public id field in inspected classes; diff present no; old form hits 0; report matches yes`

Scope tags: every status entry is `owned`; no `shared` or `off-limits` entry appears.

Residue: diff hits are the `skip` assertion, one `retry` prose hit, the listed timeout values, and debugger URL validation; no TODO, FIXME, console, or only additions.

Writing hits: `guides/browser.md:463,533,537,661,774,1649`; count-pattern hits: none.

Parity: the interface and guide method rows listed above match for every touched entity.

## Unknowns

- The complete contents of `conform-browser.diff` exceeded the single-file read limit; targeted searches and hunk reads covered its hunks and required patterns.
- `browser-obj-2` and `browser-obj-3` have no row-specific failing-first control files named in the report.
- `browser-obj-4-modules.txt` and `browser-obj-4-green.txt` were found but their `Tests` summary lines were not read.
- The live `git status --short` containment command was not obtained; the supplied status evidence was read and contains only Owned paths.

## Journal

Driver journal entry: ____________________

## Deviation

- No tree change outside the supplied status evidence was found.
- No requested source, test, guide, report, diff, status, rule, or proof file was inaccessible.
- The live status command could not be run because the read-only shell invocation was rejected; no mutation occurred.