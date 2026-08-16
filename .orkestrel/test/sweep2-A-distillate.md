**Coverage.** Read 21 Slice A trees under `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-src/{abort,agent,brief,browser,budget,console,contract,csv,database,emitter,guide,html,indexeddb,interpret,markdown,mcp,msg,ndjson,ollama,pool,program}/tests/`. All 21 have a `tests/` directory. Slice B, `/home/user/test`, `/home/user/scaffold`, and the private form/table repos were not read.

**Vendored (once).** `tests/setupPolicy.ts` and `tests/policy.test.ts` are present in every Slice A tree. 19 copies match the stock export set (first export `PolicyRule` at line 7; `POLICY_CONTROLS` at 741). Two copies diverge and are not treated as that vendored identity: **brief** adds skill-family policy (`SKILL_FAMILY_ROOT` `brief/tests/setupPolicy.ts:51`, `inspectSkill` `:867`); **ollama** is a shorter older variant (`testToPolicySource` `ollama/tests/setupPolicy.ts:523`, no `DATA_EXEMPT_FILES` / `stemToPolicyCandidates`).

---

## 1. Setup inventory

Shared across all 21: `isBrowserVuePath(path: string): boolean` — true when a repo-relative path starts with `app/browser/` (example: `abort/tests/setup.ts:5`). Consumed by that package’s `config.test.ts`.

| Package | Setup files besides vendored policy | Exported test-support (domain corpora collapsed) |
|---|---|---|
| **abort** | `setup.ts` | `isBrowserVuePath` only (`:5`). |
| **agent** | `setup.ts` | `roundTripJSON<T>(value): T` `:36`; `createGate<T>()` `:56`; `createScriptedProvider(turns, options?)` `:172`; `createToolCall` `:280`; `createTokenUsage` `:291`; `addTool`/`loopTool` `:304`/`:315`; `createAgentJob` `:329`; `createStubSummarizer` `:343`; `createErrorRecorder()` `:369`; `recordEmitterEvents` `:395`; `isTotal` `:429`; `createRecordingScheduler()` `:451`; `buildConversationSnapshot` `:489`; `assertConversationStoreContract` `:519`. |
| **brief** | `setup.ts` | Domain builders: `buildTask` `:23`, `buildBrief` `:41`, `buildReadyInput` `:51`, `buildInterpret`/`buildFailingInterpret`/`buildForeignInterpret` `:68`/`:107`/`:143`, `buildAdversarialValues` `:185`, `readErrorCode` `:218`, reason/evaluator stubs `:231`–`:349`. No shared helper module. `guides.test.ts:66` holds a **local** `readInventory()`. |
| **browser** | `setup.ts`, `setupServer.ts` | Core: `ignoreCall`/`ignoreAsyncCall`/`throwListenerError` `:14`–`:24`; `waitForCondition(condition, timeout?, interval?)` `:36`; in-memory CDP transport `createCDPTransport` `:103`, `createConnectedCDPClient` `:177`, codegen/DOM snapshot fixtures `:303`–`:488`. Server: `reservePort()` `:22`; `readServerPort` `:33`; `isProcessAlive` `:49`; `waitForProcessExit` `:65`; `createTempDirectory` `:72` (wraps `createScratch`); `createStallServer` `:92`; `createTCPProxy` `:146`; `createCDPTestServer` `:248`; `createFakeBrowserProcess` `:544`. |
| **budget** | `setup.ts` | `captureContractError(operation): ContractError` `:17` (wraps `captureError`); `selectCharge` `:34`. |
| **console** | `setup.ts`, `setupBrowser.ts`, `setupServer.ts` | `createGate` `:26`; `createErrorRecorder` `:46`; `createRecordingSink()` `:70`; `recordEmitterEvents` `:100`; `isTotal` `:134`. Browser: `captureConsole()` `:27`. Server: `WORKSPACE_ROOT` `:14`; `readText`/`fileExists` `:17`/`:22`; `createStreamTarget` `:40`; `createWriteProbe` `:69`. |
| **contract** | `setup.ts` (~3.6k lines), `setupServer.ts` | General: `captureContractError` `:170` (uses `attempt`, not `captureError`); `createRevokedProxy` `:2464`; `createThrowingGetter` `:2507`; `createWorkBound` `:913`; `requestWeakReferenceCollection` `setupServer.ts:27`; `createForeignRegExp`/`createForeignRecord` `:50`/`:97`. Remainder is contract-soundness corpora (intrinsics, lies, shapes, graphs). |
| **csv** | `setup.ts` | `TEST_SEED = 42` `:10`; `assertAndNarrow(guard, value): T` `:29`; CSV string builders `:52`–`:100`. Inline `collectStream` in `CSV.test.ts:13` (not exported). |
| **database** | `setup.ts`, `setupBrowser.ts`, `setupServer.ts` | `collectRows<T>(iterable): Promise<T[]>` `:42`; user/cursor seed fixtures `:75`–`:236`; `createRecordingDriver` `:400`; `createErrorRecorder`/`recordEmitterEvents`/`isTotal` `:461`–`:517`; `conformDriver` `:540`. Browser: `deleteDatabase` `:13`; `uniqueName` `:31`; `createCleanups` `:87`; `createIntegrationDatabase` `:119`. Server: TS-compiler fence helpers `:33`–`:275`; `tempTypeScriptProject` `:341`; `tempDatabasePath()` `:407` (wraps `createScratch`); `createForeignKeyFixture` `:443`. |
| **emitter** | `setup.ts` | `createErrorRecorder` `:23`. File also registers `afterEach(() => vi.restoreAllMocks())` `:11`. |
| **guide** | `setup.ts`, `setupServer.ts` | `TEST_SEED` `:10`; `requireTable(markdown)` `:23`; `requireText(files, relative)` `setupServer.ts:14` (wraps `requireValue`). `tests/fixtures/**` are sample packages under scan, not test helpers. |
| **html** | `setup.ts` | `TEST_SEED` `:11`; HTML page/sanitizer/URL corpora `:23`–`:516`; `buildRevokedHTMLNode` `:738`; `throwHostileHTMLAccess` `:133`. |
| **indexeddb** | `setup.ts`, `setupBrowser.ts` | Browser: `deleteDatabase` `:29`; `uniqueName` `:47`; `createTestDatabase` `:72`; `drainCursor` `:99`; `errorCode` `:119`; `createCleanups` `:156`; `seedUsers`/`seedStore` `:193`/`:214`. |
| **interpret** | `setup.ts` | `recordEmitterEvents`/`isTotal` `:59`/`:93`; `invokeRaw` `:115`; `expectSymbolic` `:131`; `EXTREME_NUMBERS`/`TRICKY_KEYS` `:148`/`:173`; template builders `:197`–`:405`. |
| **markdown** | `setup.ts` | `TEST_SEED` `:48`; `firstBlock`/`assert*Node` `:60`–`:120`; projection corpora `:142`–`:175`; hostile/deep node builders `:225`–`:292`. |
| **mcp** | `setup.ts`, `setupServer.ts`, `setupBrowser.ts`, `setupGlobal.ts`, `setupConformance.ts`; helper module `fixtures/browserServer.ts` | Signal: `createSignalRecorder` `:97`; emitter bundle `:138`–`:179`; `waitForAbort` `:234`; `waitForSettlement` `:251`; JSON-RPC factories `:284`; `collectSSE` `:1093`; `readSSEStream` `:1112`; `createManualClock` `:1149`; memory/recording transports `:718`/`:1198`. Server: `duplexPair` `:316`; `openClientSocket` `:398`; `createTeardown` `:459`; `startServer` `:502`; `closeResource` `:543`; `startUpgradeServer` `:720`. Global: Vite `setup(project)` `:31` starting `fixtures/browserServer.ts` `start()` `:204`. Conformance runner `:491`–`:613`. |
| **msg** | `setup.ts` | `asciiBytes` `:15`; `patchBytes` `:27`; `buildEml` `:41`; `buildNestedMultipart` `:56`. |
| **ndjson** | `setup.ts` | `LF`/`CR`/… `:21`; `feedAll` `:34`; `chunkings` `:49`; `partition` `:73`. Also `vi.restoreAllMocks` afterEach `:13`. |
| **ollama** | `setup.ts`, `setupServer.ts`, `setupService.ts` (`setup.test.ts` is a test of those helpers, not a helper module) | `createUserMessage`/`buildTurns` `:25`/`:48`; `createThrowingSummarizer` `:79`; `fillWorkspace` `:122`. Server: `createRecordingProxy` `:130`; `waitForRequest` `:180` (raw `setTimeout(10)`, not `waitForDelay`); `drive` `:197`; `driveAgent` `:239`; scripted agent/tool fixtures `:261`–`:323`. Service: `createLiveOllama` `:28`; `isOllamaReady` `:78`; `warmOllama` `:103`; `retryUntil` `:164`. |
| **pool** | `setup.ts` | `createGate` `:29`; `createErrorRecorder` `:49`; `recordEmitterEvents`/`isTotal` `:71`/`:105`; `createResourceFactory` `:137`. |
| **program** | `setup.ts` | `createRecordingRater` `:39`; `createRecordingEngine` `:77`; `recordEvents` `:132`; program-definition fixtures `:158`–`:592`. |

---

## 2. Cluster table

Same-shape helpers across Slice A. Semantic differences named. Not clustered: vendored policy; package-owned domain corpora (brief/html/markdown/msg/program/contract soundness).

### C1. Vue-path predicate — 21 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| abort (same in every other Slice A `setup.ts`) | `abort/tests/setup.ts:5` | `isBrowserVuePath(path: string): boolean` | `path.replaceAll('\\','/').startsWith('app/browser/')`. |

No semantic split inside Slice A.

### C2. Emitter recorder bundle — 6 packages

`createErrorRecorder(): RecorderInterface<[error, event]>` is a typed alias over `createRecorder`. `recordEmitterEvents(emitter, events)` wires one recorder per event name; `isTotal` is the narrowing guard.

| Package | file:line | Signature | Context |
|---|---|---|---|
| agent | `agent/tests/setup.ts:369` | `createErrorRecorder()` | Plus `recordEmitterEvents` `:395`. |
| console | `console/tests/setup.ts:46` | same | Plus `recordEmitterEvents` `:100`. |
| database | `database/tests/setup.ts:461` | same | Plus `recordEmitterEvents` `:483`. |
| emitter | `emitter/tests/setup.ts:23` | `createErrorRecorder()` | Tuple typed `[unknown, string]`; **no** `recordEmitterEvents`. |
| mcp | `mcp/tests/setup.ts:138` | same as agent | Plus `recordEmitterEvents` `:179`. |
| interpret | `interpret/tests/setup.ts:59` | `recordEmitterEvents` only | **No** `createErrorRecorder`. |
| pool | `pool/tests/setup.ts:49` | both | Same agent/console shape. |

Difference: emitter’s tuple omits `error:`/`event:` labels; interpret has the bundle without the error-channel alias.

### C3. Deferred promise gate — 3 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| agent | `agent/tests/setup.ts:56` | `createGate<T = void>(): {promise, resolve, reject}` | ~16 call sites (`Agent.test.ts`, `factories.test.ts`). |
| console | `console/tests/setup.ts:26` | identical | **Exported, zero test call sites.** |
| pool | `pool/tests/setup.ts:29` | identical | ~40 call sites in `Pool.test.ts`. |

No semantic split; demand is uneven.

### C4. ContractError capture — 2 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| budget | `budget/tests/setup.ts:17` | `captureContractError(operation): ContractError` | Wraps `@orkestrel/test` `captureError`, then `isContractError`. ~21 sites. |
| contract | `contract/tests/setup.ts:170` | same name/return | Uses local `attempt()`; does **not** import `captureError`. Distinguishes “returned” vs “non-ContractError”. ~500+ sites. |

### C5. Poll-until / deadline loops — 3 packages (4 shapes)

| Package | file:line | Signature | Context |
|---|---|---|---|
| browser | `browser/tests/setup.ts:36` | `waitForCondition(fn, timeout=1000, interval=10)` | Time-bounded poll; uses `waitForDelay`. Also `waitForProcessExit` `setupServer.ts:65`. |
| ollama | `ollama/tests/setupService.ts:164` | `retryUntil(produce, satisfied, description, attempts=6)` | Attempt-bounded, not wall-clock. |
| ollama | `ollama/tests/setupServer.ts:180` | `waitForRequest(proxy, count=1, timeoutMs=10000)` | Time-bounded poll of recorded HTTP; **raw `setTimeout(10)`**, not `waitForDelay`. |
| mcp | `mcp/tests/setup.ts:251` | `waitForSettlement(promise, timeout=250)` | `Promise.race` vs watchdog; not a poll. |

### C6. Collect async sequences — 4 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| database | `database/tests/setup.ts:42` | `collectRows<T>(AsyncIterable<T>): Promise<T[]>` | `for await` drain. ~80+ sites. |
| indexeddb | `indexeddb/tests/setupBrowser.ts:99` | `drainCursor(first): Promise<cursor[]>` | Follows `continue()`, returns cursor objects not row values. |
| mcp | `mcp/tests/setup.ts:1093` | `collectSSE(response): Promise<SSEEvent[]>` | Drains SSE via `readSSEStream`. |
| csv | `csv/tests/src/core/CSV.test.ts:13` | local `collectStream<T>(ReadableStream<T>)` | `getReader()` loop; **not imported** from `@orkestrel/test`. html/markdown **do** import `collectStream`. |

### C7. Scratch / temp paths wrapping `createScratch` — 3 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| browser | `browser/tests/setupServer.ts:72` | `createTempDirectory(prefix?): ScratchInterface` | Registers scratches for `destroyTempDirectories` `:79`. |
| database | `database/tests/setupServer.ts:407` | `tempDatabasePath(): {path, cleanup}` | `createScratch` then `join(scratch.path, 'database.json')`. |
| brief | `brief/tests/distribution.test.ts:10` | `createScratch({ prefix })` | Direct import; no wrapper. |

### C8. Loopback ephemeral HTTP/WS — 2 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| browser | `browser/tests/setupServer.ts:22` | `reservePort(): Promise<number>` | Bind `127.0.0.1:0`, close, return port. Also inline `listen(0)` in `Browser.test.ts` (~6 sites). Fixture servers: Stall/TCP/CDP `:92`/`:146`/`:248`. |
| mcp | `mcp/tests/setupServer.ts:502` | `startServer(server): Promise<{base,port,stop}>` | Real `@orkestrel/server` on ephemeral port. Fixture `start()` `fixtures/browserServer.ts:204`. Inline `listen(0)` in WS tests. |

Difference: browser **reserves then uses** a port; mcp **starts the real server** and reads the bound port.

### C9. IndexedDB unique name + delete + cleanup registrar — 2 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| indexeddb | `indexeddb/tests/setupBrowser.ts:29` | `deleteDatabase` / `uniqueName` (`terrain-idb`) / `createCleanups` `:156` | ~100 combined sites. |
| database | `database/tests/setupBrowser.ts:13` | same trio; prefix default `taverna-idb` `:31` | ~50 combined sites. |

Difference: default name prefix only.

### C10. Teardown registrar — 3 packages (related, not identical)

| Package | file:line | Signature | Context |
|---|---|---|---|
| mcp | `mcp/tests/setupServer.ts:459` | `createTeardown(dispose).track(item)` | Own `afterEach`; reverse-order async dispose. |
| indexeddb / database | `…/setupBrowser.ts:156` / `:87` | `createCleanups()` | Caller registers thunks; not a typed resource union. |
| browser | `browser/tests/setupServer.ts:79` | `destroyTempDirectories()` | Scratch-only, not general. |

### C11. Abort/signal harness — 1 package in this cluster’s general form (mcp)

| Package | file:line | Signature | Context |
|---|---|---|---|
| mcp | `mcp/tests/setup.ts:97` | `createSignalRecorder()` | AbortController + live listener count. |
| mcp | `mcp/tests/setup.ts:234` | `waitForAbort(signal): Promise<void>` | Parks on abort event. |

(Listed here because the brief names abort harnesses; no second Slice A package copies this pair.)

### C12. `TEST_SEED = 42` — 4 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| csv | `csv/tests/setup.ts:10` | `export const TEST_SEED = 42` | House seed for generated input. |
| guide | `guide/tests/setup.ts:10` | same | same |
| html | `html/tests/setup.ts:11` | same | same |
| markdown | `markdown/tests/setup.ts:48` | same | same |

### C13. Require / narrow present value — 2 packages (plus csv)

| Package | file:line | Signature | Context |
|---|---|---|---|
| csv | `csv/tests/setup.ts:29` | `assertAndNarrow(guard, value): T` | Guard-based; throws with JSON dump. ~12 sites. |
| guide | `guide/tests/setup.ts:23` | `requireTable(markdown)` | Domain node assert. |
| guide | `guide/tests/setupServer.ts:14` | `requireText(files, relative)` | Wraps `requireValue(files[relative], …)`. ~50 sites combined. |

### C14. Child-process spawn / liveness — 1 package

| Package | file:line | Signature | Context |
|---|---|---|---|
| browser | `browser/tests/setupServer.ts:49` | `isProcessAlive` / `waitForProcessExit` / `createFakeBrowserProcess` `:544` | Real `child_process.spawn` of a fake browser binary. |

### C15. Hostile / revoked objects — 2 packages

| Package | file:line | Signature | Context |
|---|---|---|---|
| contract | `contract/tests/setup.ts:2464` | `createRevokedProxy(): object` | `Proxy.revocable` then `revoke()`. |
| html | `html/tests/setup.ts:738` | `buildRevokedHTMLNode(): unknown` | HTML-node-shaped revoked proxy. |

---

## 3. Duplication of the existing 13-export surface

Adoption is the common case for `createRecorder`, `requireValue`, `readInventory` (guides), `waitForDelay`, `captureError`, `createScratch`. Gaps / reimplementations in Slice A:

| Existing export | Package | file:line | What is there |
|---|---|---|---|
| **roundTripJSON** | agent | `agent/tests/setup.ts:36` | Local unconstrained `JSON.parse(JSON.stringify(value))`; comment says published helper rejects interface types. Used `MemoryConversationStore.test.ts` (2). Inline same expression also at `agent/…/factories.test.ts:335`, `Conversation.test.ts:621`, `InstructionManager.test.ts:161`; `browser/…/BrowserSnapshot.test.ts:204`; `csv/…/CSV.test.ts:168`; `markdown/…/helpers.test.ts:1621`. **No Slice A import of published `roundTripJSON`.** |
| **collectStream** | csv | `csv/tests/src/core/CSV.test.ts:13` | Local `ReadableStream` reader loop (~4 calls). html `HTML.test.ts:29` and markdown `Markdown.test.ts:10` **import** the published helper. |
| **collect** | database | `database/tests/setup.ts:42` | `collectRows` is `for await` into an array (same drain as `collect`). agent `integration.test.ts:6` / `Channel.test.ts:3` and ollama `compaction.test.ts:12` **import** `collect`. |
| **readInventory** | brief | `brief/tests/guides.test.ts:66` | Local `globSync` + `readFileSync` inventory; **does not import** `@orkestrel/test/server`. Other Slice A `guides.test.ts` files import `readInventory`. |
| **captureError** | contract | `contract/tests/setup.ts:170` | Reimplemented via `attempt()` + `isContractError`. budget **wraps** `captureError` (`budget/tests/setup.ts:18`). contract `guides.test.ts` is the only `@orkestrel/test` import in that tree (`requireValue`/`readInventory`). |
| **requireValue** | csv | `csv/tests/setup.ts:29` | `assertAndNarrow` is the same “throw if missing/wrong, return narrowed” shape, guard-parameterized. guide `requireText` **wraps** `requireValue`. |
| **createScratch** | — | — | No reimplementation. Wrappers in browser/database **call** it. |
| **waitForDelay** | ollama | `ollama/tests/setupServer.ts:192` | `waitForRequest` sleeps with `setTimeout`, not `waitForDelay`. mcp/browser/agent **import** `waitForDelay`. |
| **resolveRoot**, **resolveContained**, **matchesIdentity**, **isExcluded** | Slice A | — | **No imports and no local reimplementations found.** |
| **collectStream** (published unused) | csv only as gap | above | — |

`createRecorder` is imported, not reimplemented. `createErrorRecorder` / `recordEmitterEvents` compose it.

---

## 4. Demand counts

Package count = distinct Slice A trees containing a member. Call sites are in-tree uses excluding the definition line, rough.

| Cluster | Packages | Call sites (rough) |
|---|---|---|
| C1 `isBrowserVuePath` | **21** | 1 definition + `config.test.ts` consumption per tree |
| C2 emitter recorder bundle | **7** (6 with `createErrorRecorder`, interpret without) | emitter ~5; console/agent/database/mcp/pool/interpret: tens each via `recordEmitterEvents` / `createErrorRecorder` |
| C3 `createGate` | **3** (console export-only) | agent ~16; pool ~40; console 0 |
| C4 `captureContractError` | **2** | budget ~21; contract ~500+ |
| C5 poll/deadline | **3** | browser `waitForCondition` family ~70 combined with `Browser.test.ts` listen/wait; ollama `retryUntil`/`waitForRequest` tens across `service/` + `src/server`; mcp `waitForSettlement` few |
| C6 collect/drain | **4** | database `collectRows` ~80; indexeddb `drainCursor` handful; mcp `collectSSE` few; csv local `collectStream` 4 |
| C7 scratch wrappers | **3** | browser temp dirs used from server tests; database `tempDatabasePath` ~2 def+uses in setupServer plus driver tests; brief 1 |
| C8 loopback servers | **2** | browser `Browser.test.ts` 111 hits on the combined listen/CDP/port pattern; mcp `startServer`/`createTeardown` ~30 across HTTP/WS files |
| C9 IndexedDB name/delete/cleanup | **2** | indexeddb ~100; database browser ~50 |
| C10 teardown registrar | **3** | mcp `createTeardown` used from HTTP/WS suites; IDB `createCleanups` as C9; browser scratch destroy few |
| C12 `TEST_SEED` | **4** | low (constant + a few corpus builders) |
| C13 require/narrow | **2** (+csv) | guide ~50; csv ~12 |
| C15 revoked proxy | **2** | contract many (hostile corpus); html few |

`createRecorder` (published) is imported in 14/21 Slice A trees (not csv, contract, ndjson, msg, markdown, abort-only-via-tests, indexeddb, guide). `requireValue`+`readInventory` appear in every Slice A `guides.test.ts` **except brief** (local inventory) and **guide** (uses `readInventory` throughout, `requireValue` via `requireText`).

---

## 5. Singles worth naming

Helpers with **one Slice A package** whose semantics are host/test-general (not product policy). Evidence only.

| Package | file:line | Signature | Why it reads as general |
|---|---|---|---|
| browser | `browser/tests/setup.ts:36` | `waitForCondition(fn, timeout, interval)` | Time-bounded predicate poll on `waitForDelay`. |
| browser | `browser/tests/setupServer.ts:22` | `reservePort()` | Ephemeral loopback port probe. |
| browser | `browser/tests/setupServer.ts:49` | `isProcessAlive` / `waitForProcessExit` / `createFakeBrowserProcess` | Real child-process liveness + spawn. |
| console | `console/tests/setupBrowser.ts:27` | `captureConsole()` | Swap/restore `console.log|warn|error` onto `createRecorder`. |
| console | `console/tests/setup.ts:70` | `createRecordingSink()` | Real `SinkInterface` over `createRecorder`. |
| mcp | `mcp/tests/setupServer.ts:459` | `createTeardown(dispose)` | Tracked-resource `afterEach` disposer. |
| mcp | `mcp/tests/setup.ts:97` | `createSignalRecorder()` | AbortSignal with live-listener count. |
| mcp | `mcp/tests/setup.ts:234` | `waitForAbort(signal)` | Event-parked abort wait. |
| mcp | `mcp/tests/setup.ts:1149` | `createManualClock(start?)` | Deterministic clock fixture. |
| mcp | `mcp/tests/setupServer.ts:316` | `duplexPair()` / `openClientSocket` `:398` | Real socket pair / WS client. |
| ollama | `ollama/tests/setupService.ts:164` | `retryUntil(produce, satisfied, attempts)` | Bounded retry until a predicate. |
| ollama | `ollama/tests/setupServer.ts:130` | `createRecordingProxy` | Recording reverse-proxy of a live HTTP upstream. |
| database | `database/tests/setupServer.ts:341` | `tempTypeScriptProject(files)` | Scratch TS program for compiler-fence proofs. |
| interpret | `interpret/tests/setup.ts:115` | `invokeRaw(target, method, args)` | `Reflect.apply` bypass of typed parameters. |
| agent | `agent/tests/setup.ts:172` | `createScriptedProvider(turns, options?)` | Protocol-faithful scripted stream provider (agent-shaped, but the delay/abort/exhaust machinery is generic). |
| pool | `pool/tests/setup.ts:137` | `createResourceFactory()` | Monotonic resource `create`/`destroy` recorders. |
| csv | `csv/tests/setup.ts:29` | `assertAndNarrow(guard, value)` | Guard-then-return without `as`. |
| ndjson | `ndjson/tests/setup.ts:34` | `feedAll` / `chunkings` / `partition` | Chunk-boundary streaming feed. |

Not listed as general: brief/html/markdown/msg/program/contract corpora, mcp conformance runner, ollama live `isOllamaReady`/`warmOllama`, guide `tests/fixtures/**` sample packages, emitter/ndjson `vi.restoreAllMocks` in setup.

---

**Unknowns:**

- Slice B unread; fleet-wide demand for C2/C3/C5/C8 cannot be closed from this slice.
- `config.test.ts` is line-aligned across Slice A (same `mkdtempSync` sites at 493/515/552/606) but is not named as vendored in the standing facts; byte-identity not hashed.
- Stock `setupPolicy.ts` identity among the 19 non-divergent copies was matched by export line numbers, not a digest.
- Whether published `collect` is the same `for await` drain as `collectRows` was not re-read from `@orkestrel/test` 0.0.3 sources in this slice.
- `console` `createGate` has no call sites; whether that export is dead or reserved is unread outside `tests/`.
- `emitter`/`ndjson` `vi.restoreAllMocks()` in `setup.ts` — what those tests mock is unread in full.
