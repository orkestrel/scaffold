# Brief — P.1 `d7n-browser-prep` (browser's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/browser` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `dc94600`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

browser's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== browser 2026-09-07T16:42:38Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
96:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### browser (dc94600, version 0.0.15, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 33 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(28)
   tests/setupServer.ts(25)
   tests/setupService.ts(3)
   tests/src/server/Browser.test.ts(2)
   src/server/types.ts(1)
   src/core/helpers.ts(1)
-- docs
   guides/browser.md BrowserLocatorInterface.screenshot: guide absent source absent
   guides/browser.md BrowserLocatorInterface.upload: guide absent source absent
   guides/browser.md BrowserLocatorInterface.drag: guide absent source absent
   guides/browser.md BrowserSelectorManagerInterface.css: guide absent source absent
   guides/browser.md BrowserSelectorManagerInterface.role: guide absent source absent
   guides/browser.md BrowserSelectorManagerInterface.text: guide absent source absent
   guides/browser.md BrowserSelectorManagerInterface.label: guide absent source absent
   guides/browser.md BrowserSelectorManagerInterface.placeholder: guide absent source absent
   guides/browser.md BrowserSelectorManagerInterface.testId: guide absent source absent
   guides/browser.md BrowserKeyboardInterface.down: guide absent source absent
   guides/browser.md BrowserKeyboardInterface.up: guide absent source absent
   guides/browser.md BrowserKeyboardInterface.press: guide absent source absent
   guides/browser.md BrowserKeyboardInterface.type: guide absent source absent
   guides/browser.md BrowserKeyboardInterface.insert: guide absent source absent
   guides/browser.md BrowserMouseInterface.move: guide absent source absent
   guides/browser.md BrowserMouseInterface.down: guide absent source absent
   guides/browser.md BrowserMouseInterface.up: guide absent source absent
   guides/browser.md BrowserMouseInterface.click: guide absent source absent
   guides/browser.md BrowserMouseInterface.drag: guide absent source absent
   guides/browser.md BrowserMouseInterface.wheel: guide absent source absent
   guides/browser.md BrowserTouchInterface.tap: guide absent source absent
   guides/browser.md BrowserDialogInterface.accept: guide absent source absent
   guides/browser.md BrowserDialogInterface.dismiss: guide absent source absent
   guides/browser.md BrowserFileChooserInterface.upload: guide absent source absent
   guides/browser.md BrowserFileChooserInterface.cancel: guide absent source absent
   guides/browser.md BrowserWorkerInterface.evaluate: guide absent source absent
   guides/browser.md BrowserWorkerInterface.send: guide absent source absent
   guides/browser.md BrowserWorkerInterface.detach: guide absent source absent
   guides/browser.md BrowserWorkerInterface.close: guide absent source absent
   guides/browser.md BrowserRouteInterface.abort: guide absent source absent
   guides/browser.md BrowserRouteInterface.continue: guide absent source absent
   guides/browser.md BrowserRouteInterface.fulfill: guide absent source absent
   guides/browser.md BrowserHARManagerInterface.start: guide absent source absent
   guides/browser.md BrowserHARManagerInterface.stop: guide absent source absent
   guides/browser.md BrowserHARManagerInterface.replay: guide absent source absent
   guides/browser.md BrowserHARManagerInterface.clear: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.start: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.body: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.text: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.json: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.route: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.unroute: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.headers: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.offline: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.credentials: guide absent source absent
   guides/browser.md BrowserNetworkManagerInterface.destroy: guide absent source absent
   guides/browser.md BrowserCookieManagerInterface.cookies: guide absent source absent
   guides/browser.md BrowserCookieManagerInterface.set: guide absent source absent
   guides/browser.md BrowserCookieManagerInterface.clear: guide absent source absent
   guides/browser.md BrowserPermissionManagerInterface.grant: guide absent source absent
   guides/browser.md BrowserPermissionManagerInterface.deny: guide absent source absent
   guides/browser.md BrowserPermissionManagerInterface.clear: guide absent source absent
   guides/browser.md BrowserStorageManagerInterface.state: guide absent source absent
   guides/browser.md BrowserStorageManagerInterface.restore: guide absent source absent
   guides/browser.md BrowserStorageManagerInterface.clear: guide absent source absent
   guides/browser.md BrowserEmulationManagerInterface.apply: guide absent source absent
   guides/browser.md BrowserEmulationManagerInterface.clear: guide absent source absent
   guides/browser.md BrowserEmulationManagerInterface.attach: guide absent source absent
   guides/browser.md pitch: readme absent tagline "A lightweight Chrome DevTools Protocol (CDP) automation layer, split into an environment-agnostic core and a Node server runtime. Core (`@orkestrel/browser`) is pure logic over an injected `CDPTransportInterface` — no `WebSocket`, no `node:*`, no filesystem — so it runs identically in Node or a browser: `CDPClient` frames JSON-RPC-shaped CDP messages over the transport, `BrowserContext` / `BrowserPage` model a CDP browser context and its pages, `BrowserSnapshot` turns a captured DOM snapshot into navigable serializable data, `BrowserCodegen` records page interactions for later script compilation. One capability reaches past the protocol: `article()` distills a captured document to its reader-facing prose through `@orkestrel/html` — content selection, not another whole-body text dump. Server (`@orkestrel/browser/server`) supplies the missing environment pieces: `WebSocketCDPTransport` (a Node `WebSocket`-backed CDP transport), `Browser` (discovery → connect → launch lifecycle, spawning a real Chromium-family process when nothing is already listening), and a filesystem-backed browser writer. Source: `src/core` (through `@src/core`) + `src/server` (through `@src/server`)."
   rows read: 1, disagreements found: 618
   exit 1
-- check
   tests/guides.test.ts(111,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(114,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(118,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(133,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(148,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 147 ⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  147 failed | 51 passed (198)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 109ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 60 | summary 53 | banned 7 | tests/setup.ts(28) tests/setupServer.ts(25) tests/setupService.ts(3) tests/src/server/Browser.test.ts(2) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+1228,	+     "message": "prose carries no banned term: currently (delete, or give the date)",	+     "path": "guides/browser.md"
+1604,	+     "message": "prose carries no banned term: currently (delete, or give the date)",	+     "path": "guides/browser.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for browser (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/browser`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `dc94600`, status: clean
- `package.json`: version `0.0.15`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 60 | summary 53 | banned 7 | tests/setup.ts(28) tests/setupServer.ts(25) tests/setupService.ts(3) tests/src/server/Browser.test.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                                                   | Tests                                                                            |
    8:| ------- | -------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
    9:| Browser | [`browser.md`](browser.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |
    13:| Directory    | Guide                      |
    14:| ------------ | -------------------------- |
    15:| `src/core`   | [`browser.md`](browser.md) |
    16:| `src/server` | [`browser.md`](browser.md) |
- Guide `guides/browser.md`: 2153 lines. Headings:
    1:# Browser
    22:## Surface
    49:### Core
    51:#### Factories
    58:#### Entities
    69:#### Constants
    88:#### Errors
    121:#### Helpers
    214:#### Types
    262:### Server
    277:#### Factories
    285:#### Entities
    293:#### Constants
    322:#### Errors
    346:#### Helpers
    423:#### Types
    440:### Extended Chromium automation surface
    447:#### Extended constants and entities
    481:#### Extended helpers
    766:#### Extended types
    905:## Methods
    941:#### `CDPTransportInterface`
    958:#### `CDPClientInterface`
    994:#### `BrowserContextInterface`
    1016:#### `BrowserFrameInterface`
    1063:#### `BrowserPageInterface`
    1118:#### `BrowserSnapshotInterface`
    1175:#### `BrowserCodegenInterface`
    1198:#### `BrowserTransitionInterface`
    1218:#### `BrowserInterface`
    1254:#### `BrowserWebSocketInterface`
    1282:#### `BrowserDownloadInterface`
    1306:#### `BrowserWriterInterface`
    1322:#### `BrowserNavigationManagerInterface`
    1339:#### `BrowserHandleInterface`
    1361:#### `BrowserScriptManagerInterface`
    1382:#### `BrowserAccessibilityInterface`
    1395:#### `BrowserTracingInterface`
    1411:#### `BrowserCoverageInterface`
    1427:#### `BrowserPerformanceInterface`
    1440:#### `BrowserProfilerInterface`
    1456:#### `BrowserDiagnosticsInterface`
    1469:#### `BrowserClockInterface`
    1489:#### `BrowserLocatorInterface`
    1553:#### `BrowserSelectorManagerInterface`
    1576:#### `BrowserKeyboardInterface`
    1597:#### `BrowserMouseInterface`
    1620:#### `BrowserTouchInterface`
    1632:#### `BrowserDialogInterface`
    1649:#### `BrowserFileChooserInterface`
    1665:#### `BrowserWorkerInterface`
    1686:#### `BrowserRouteInterface`
    1706:#### `BrowserHARManagerInterface`
    1725:#### `BrowserNetworkManagerInterface`
    1760:#### `BrowserCookieManagerInterface`
    1776:#### `BrowserPermissionManagerInterface`
    1792:#### `BrowserStorageManagerInterface`
    1808:#### `BrowserEmulationManagerInterface`
    1826:## Contract
    2042:## Patterns
    2044:### Automate a page end-to-end
    2061:### Record and replay interactions with codegen
    2075:### Reattach to a running session
    2123:### Gracefully shut down a reattached session
    2138:### Drive the core client directly over an injected transport
- Table headers in `guides/browser.md` (a header row is the row before a `| ---` row):
    53: | API                     | Kind     | Summary                                                                                 |
    60: | API               | Kind  | Summary                                                                                                                                   |
    71: | Constant                               | Kind  | Value                                                                                                                                                                                                                                             |
    90: | Error                     | Kind  | Extends        | Code                           | Summary                                                                                                                                                                         |
    99: | Guard                       | Kind     | Narrows to                |
    123: | API                                | Kind     | Summary                                                                                                                                                                                            |
    216: | Type                          | Kind      | Shape                                                                                                                                                                                                                                                                                    |
    279: | API                   | Kind     | Summary                                                                                             |
    287: | API                     | Kind  | Summary                                                                                                     |
    295: | Constant                          | Kind  | Value                                                                                                                                                                                                                  |
    324: | Error                      | Kind  | Extends        | Code                          | Summary                                                                       |
    330: | Guard                        | Kind     | Narrows to                 |
    348: | API                       | Kind     | Summary                                                                                                                                                                                                                                                                                                                                                        |
    425: | Type                           | Kind      | Shape                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
    449: | API                            | Kind  | Summary                                                            |
    483: | API                                      | Kind     | Summary                                                                                                                                                               |
    768: | API                                 | Kind      | Summary                                                                                          |
    945: | Method  | Returns         | Behavior                                                                                                                                                        |
    972: | Method        | Returns            | Behavior                                                                                                                                                                                            |
    999: | Method    | Returns                             | Behavior                                                                                                                                                                                                                                                                                                 |
    1023: | Method        | Returns                           | Behavior                                                                                                                                                                                                                           |
    1069: | Method        | Returns                                       | Behavior                                                                                                          |
    1129: | Method        | Returns                                 | Behavior                                                                                                                                                                     |
    1180: | Method    | Returns                                    | Behavior                                                                                                                                                                                                            |
    1206: | Method    | Returns      | Behavior                                                                                               |
    1224: | Method       | Returns                                | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
    1260: | Method     | Returns | Behavior                                                                                                           |
    1288: | Method   | Returns         | Behavior                                                                                                                                                      |
    1311: | Method  | Returns         | Behavior                                                            |
    1327: | Method  | Returns            | Behavior                                                                                            |
    1343: | Method       | Returns                                        | Behavior                                                               |
    1365: | Method    | Returns           | Behavior                                                                    |
    1386: | Method     | Returns                                 | Behavior                                                                |
    1399: | Method    | Returns                         | Behavior                                                                                    |
    1415: | Method    | Returns                          | Behavior                                                                                     |
    1431: | Method    | Returns                             | Behavior                                                    |
    1444: | Method    | Returns                   | Behavior                                                                             |
    1461: | Method    | Returns         | Behavior                                                       |
    1473: | Method      | Returns         | Behavior                                                                |
    1494: | Method       | Returns                                       | Behavior                                                                                   |
    1558: | Method        | Returns                   | Behavior                                                          |
    1581: | Method   | Returns         | Behavior                                                                                           |
    1602: | Method  | Returns         | Behavior                                                                                    |
    1624: | Method | Returns         | Behavior                                                                              |
    1637: | Method    | Returns         | Behavior                                                                                |
    1653: | Method   | Returns         | Behavior                                                                                           |
    1670: | Method     | Returns            | Behavior                                                                          |
    1691: | Method     | Returns         | Behavior                                                                               |
    1711: | Method   | Returns               | Behavior                                                                      |
    1731: | Method        | Returns               | Behavior                                                                       |
    1764: | Method    | Returns                             | Behavior                                                                   |
    1780: | Method  | Returns         | Behavior                                                                      |
    1796: | Method    | Returns                        | Behavior                                                               |
    1814: | Method   | Returns         | Behavior                                                                              |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/browser.md`):
    3: > A lightweight Chrome DevTools Protocol (CDP) automation layer, split into an
    4: > environment-agnostic **core** and a Node **server** runtime. **Core**
    5: > (`@orkestrel/browser`) is pure logic over an injected `CDPTransportInterface`
    6: > — no `WebSocket`, no `node:*`, no filesystem — so it runs identically in
    7: > Node or a browser: `CDPClient` frames JSON-RPC-shaped CDP messages over the
    8: > transport, `BrowserContext` / `BrowserPage` model a CDP browser context and
    9: > its pages, `BrowserSnapshot` turns a captured DOM snapshot into navigable
    10: > serializable data, `BrowserCodegen` records page interactions for later
    11: > script compilation. One capability reaches past the protocol: `article()`
    12: > distills a captured document to its reader-facing prose through
    13: > `@orkestrel/html` — content selection, not another whole-body text dump.
    14: > **Server** (`@orkestrel/browser/server`) supplies the missing
    15: > environment pieces: `WebSocketCDPTransport` (a Node `WebSocket`-backed CDP
    16: > transport), `Browser` (discovery → connect → launch lifecycle, spawning a
    17: > real Chromium-family process when nothing is already listening), and a
    18: > filesystem-backed browser writer. Source:
    19: > [`src/core`](../src/core) (through `@src/core`) +
    20: > [`src/server`](../src/server) (through `@src/server`).
- Opening prose after the blockquote (first two lines):
    22: ## Surface
    24: Server quickstart — connect to (or launch) a browser, open a page, drive it:
- README (`README.md`) first lines:
    # @orkestrel/browser
    
    A typed [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
    browser automation library for the `@orkestrel` line. The environment-agnostic
    core (`src/core` — `CDPClient` speaking the CDP wire protocol over an injected
    `CDPTransportInterface`, plus `BrowserContext`, `BrowserPage`, and
    `BrowserFrame`, semantic locators, trusted input, network/HAR controls,
    diagnostics, structured DOM snapshots, content distillation that selects a
    document's article rather than its whole body text, and `BrowserCodegen`)
    never touches `node:*` or the DOM; the Node runtime (`src/server`)
    adapts it with a `WebSocketCDPTransport`, browser process launch/discovery
    (`node:child_process` + `fetch`), a filesystem browser writer, and the
- `## Patterns` fences, each with its nearest preceding heading:
    26: fence under "## Surface"
    40: fence under "## Surface"
    108: fence under "#### Errors"
    153: fence under "#### Helpers"
    267: fence under "### Server"
    336: fence under "#### Errors"
    369: fence under "#### Helpers"
    568: fence under "#### Extended helpers"
    951: fence under "#### `CDPTransportInterface`"
    981: fence under "#### `CDPClientInterface`"
    1008: fence under "#### `BrowserContextInterface`"
    1041: fence under "#### `BrowserFrameInterface`"
    1099: fence under "#### `BrowserPageInterface`"
    1145: fence under "#### `BrowserSnapshotInterface`"
    1189: fence under "#### `BrowserCodegenInterface`"
    1210: fence under "#### `BrowserTransitionInterface`"
    1237: fence under "#### `BrowserInterface`"
    1267: fence under "#### `BrowserWebSocketInterface`"
    1293: fence under "#### `BrowserDownloadInterface`"
    1315: fence under "#### `BrowserWriterInterface`"
    1332: fence under "#### `BrowserNavigationManagerInterface`"
    1351: fence under "#### `BrowserHandleInterface`"
    1373: fence under "#### `BrowserScriptManagerInterface`"
    1390: fence under "#### `BrowserAccessibilityInterface`"
    1405: fence under "#### `BrowserTracingInterface`"
    1421: fence under "#### `BrowserCoverageInterface`"
    1435: fence under "#### `BrowserPerformanceInterface`"
    1450: fence under "#### `BrowserProfilerInterface`"
    1465: fence under "#### `BrowserDiagnosticsInterface`"
    1481: fence under "#### `BrowserClockInterface`"
    1526: fence under "#### `BrowserLocatorInterface`"
    1567: fence under "#### `BrowserSelectorManagerInterface`"
    1589: fence under "#### `BrowserKeyboardInterface`"
    1611: fence under "#### `BrowserMouseInterface`"
    1628: fence under "#### `BrowserTouchInterface`"
    1642: fence under "#### `BrowserDialogInterface`"
    1658: fence under "#### `BrowserFileChooserInterface`"
    1677: fence under "#### `BrowserWorkerInterface`"
    1697: fence under "#### `BrowserRouteInterface`"
    1718: fence under "#### `BrowserHARManagerInterface`"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:21:export function createBrowser(options?: BrowserOptions): BrowserInterface {
    src/server/factories.ts:31:export function createCDPTransport(options: WebSocketCDPTransportOptions): CDPTransportInterface {
    src/server/factories.ts:40:export function createBrowserWriter(): BrowserWriterInterface {
    src/server/helpers.ts:147:export async function createBrowserProfile(path?: string): Promise<BrowserProfileResult> {
    src/core/factories.ts:24:export function createCDPClient(options: CDPClientOptions): CDPClientInterface {
    src/core/factories.ts:42:export function createBrowserSnapshot(input: BrowserSnapshotInput): BrowserSnapshotInterface {
    src/core/helpers.ts:184:export function createBrowserHAREntry(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/writers/FileBrowserWriter.ts:22:export class FileBrowserWriter implements BrowserWriterInterface {
    src/server/Browser.ts:75:export class Browser implements BrowserInterface {
    src/server/transports/WebSocketCDPTransport.ts:42:export class WebSocketCDPTransport implements CDPTransportInterface {
    src/server/errors.ts:9:export class BrowserConnectionError extends BrowserError {
    src/server/errors.ts:19:export class BrowserNotConnectedError extends BrowserError {
    src/server/errors.ts:29:export class BrowserDestroyedError extends BrowserError {
    src/core/BrowserEmulationManager.ts:21:export class BrowserEmulationManager implements BrowserEmulationManagerInterface {
    src/core/BrowserSelectorManager.ts:22:export class BrowserSelectorManager implements BrowserSelectorManagerInterface {
    src/core/BrowserCookieManager.ts:24:export class BrowserCookieManager implements BrowserCookieManagerInterface {
    src/core/BrowserPerformance.ts:15:export class BrowserPerformance implements BrowserPerformanceInterface {
    src/core/BrowserTracing.ts:25:export class BrowserTracing implements BrowserTracingInterface {
    src/core/BrowserPage.ts:86:export class BrowserPage extends BrowserFrame implements BrowserPageInterface {
    src/core/BrowserTransition.ts:24:export class BrowserTransition<T = void> implements BrowserTransitionInterface<T> {
    src/core/BrowserFrame.ts:40:export class BrowserFrame implements BrowserFrameInterface {
    src/core/BrowserWorker.ts:10:export class BrowserWorker implements BrowserWorkerInterface {
    src/core/BrowserProfiler.ts:18:export class BrowserProfiler implements BrowserProfilerInterface {
    src/core/BrowserNetworkManager.ts:47:export class BrowserNetworkManager implements BrowserNetworkManagerInterface {
    src/core/BrowserScriptManager.ts:28:export class BrowserScriptManager implements BrowserScriptManagerInterface {
    src/core/BrowserDialog.ts:11:export class BrowserDialog implements BrowserDialogInterface {
    src/core/BrowserHandle.ts:9:export class BrowserHandle implements BrowserHandleInterface {
    src/core/CDPClient.ts:41:export class CDPClient implements CDPClientInterface {
    src/core/BrowserWebSocket.ts:20:export class BrowserWebSocket implements BrowserWebSocketInterface {
    src/core/BrowserCodegen.ts:32:export class BrowserCodegen implements BrowserCodegenInterface {
    src/core/BrowserNavigationManager.ts:24:export class BrowserNavigationManager implements BrowserNavigationManagerInterface {
    src/core/BrowserRoute.ts:15:export class BrowserRoute implements BrowserRouteInterface {
    src/core/BrowserFileChooser.ts:7:export class BrowserFileChooser implements BrowserFileChooserInterface {
    src/core/BrowserSnapshot.ts:26:export class BrowserSnapshot implements BrowserSnapshotInterface {
    src/core/BrowserDownload.ts:14:export class BrowserDownload implements BrowserDownloadInterface {
    src/core/BrowserHARManager.ts:37:export class BrowserHARManager implements BrowserHARManagerInterface {
    src/core/BrowserKeyboard.ts:25:export class BrowserKeyboard implements BrowserKeyboardInterface {
    src/core/BrowserPermissionManager.ts:15:export class BrowserPermissionManager implements BrowserPermissionManagerInterface {
    src/core/BrowserClock.ts:20:export class BrowserClock implements BrowserClockInterface {
    src/core/BrowserCoverage.ts:26:export class BrowserCoverage implements BrowserCoverageInterface {
    src/core/BrowserLocator.ts:55:export class BrowserLocator implements BrowserLocatorInterface {
    src/core/BrowserDiagnostics.ts:27:export class BrowserDiagnostics implements BrowserDiagnosticsInterface {
    src/core/BrowserTouch.ts:15:export class BrowserTouch implements BrowserTouchInterface {
    src/core/BrowserMouse.ts:27:export class BrowserMouse implements BrowserMouseInterface {
    src/core/BrowserContext.ts:44:export class BrowserContext implements BrowserContextInterface {
    src/core/BrowserStorageManager.ts:31:export class BrowserStorageManager implements BrowserStorageManagerInterface {
    src/core/BrowserAccessibility.ts:20:export class BrowserAccessibility implements BrowserAccessibilityInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/writers/FileBrowserWriter.ts:1
    src/server/Browser.ts:1
    src/server/transports/WebSocketCDPTransport.ts:1
    src/server/factories.ts:1
    src/server/helpers.ts:2
    src/core/BrowserEmulationManager.ts:1
    src/core/BrowserSelectorManager.ts:1
    src/core/BrowserCookieManager.ts:1
    src/core/BrowserPerformance.ts:1
    src/core/BrowserTracing.ts:1
    src/core/BrowserPage.ts:1
    src/core/BrowserTransition.ts:1
    src/core/BrowserFrame.ts:2
    src/core/BrowserProfiler.ts:1
    src/core/BrowserNetworkManager.ts:1
    src/core/BrowserScriptManager.ts:1
    src/core/factories.ts:2
    src/core/helpers.ts:3
    src/core/CDPClient.ts:1
    src/core/BrowserWebSocket.ts:1
    src/core/BrowserCodegen.ts:1
    src/core/BrowserNavigationManager.ts:1
    src/core/BrowserSnapshot.ts:1
    src/core/BrowserHARManager.ts:1
    src/core/BrowserKeyboard.ts:1
    src/core/BrowserPermissionManager.ts:1
    src/core/BrowserClock.ts:1
    src/core/BrowserCoverage.ts:1
    src/core/BrowserLocator.ts:1
    src/core/BrowserDiagnostics.ts:1
    src/core/BrowserTouch.ts:1
    src/core/BrowserMouse.ts:1
    src/core/BrowserContext.ts:1
    src/core/BrowserStorageManager.ts:1
    src/core/BrowserAccessibility.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    52:const ROOT_FILES: readonly string[] = Object.freeze([])
    58:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    103:		for (const group of guide.methods()) {
    104:			const members = source.methods(group.interface)
    111:					expect(findMissing(members, group.methods)).toEqual([])
    114:					expect(findMissing(group.methods, members)).toEqual([])
    118:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    133:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    136:		for (const group of guide.methods()) {
    146:							? source.examples(group.interface)
    147:							: source.examples(group.interface).concat(source.examples(entity))
    148:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    160:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.15"` → `"version": "0.0.16"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-browser-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
