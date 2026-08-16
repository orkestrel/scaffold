**Coverage.** Slice B only: 21 trees, `tests/` only. All 21 have a `tests/` directory. Fleet-src base: `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-src/`. Trees: qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, template, terminal, timeout, tool, toolbox, websocket, worker, workflow, workspace, `/home/user/test`, `/home/user/scaffold`. Slice A unread. Private form/table repos unread. `node_modules/**`, `.git/**`, credentials unread.

**Vendored (once, not clustered).** `tests/setupPolicy.ts` and `tests/policy.test.ts` are present in every Slice B tree. Scaffold’s copies are larger (extra `skill` rule; `readdirSync`). Fleet-src copies share `inspectPolicyControl` at `setupPolicy.ts:727` (`mkdtempSync(join(tmpdir(), 'orkestrel-policy-'))`). Not treated as a duplication cluster below.

Paths below are `package/tests/...` under the fleet-src base, except `test` (`/home/user/test/tests/...`) and `scaffold` (`/home/user/scaffold/tests/...`).

---

## 1. Setup inventory

Per package: exported `tests/setup*.ts` symbols and other shared fixture/helper modules. `isBrowserVuePath` is listed once at the end (19 copies, no in-tree call sites).

**qualifier** — `setup.ts`: `buildCyclicRecord(): Record<string, unknown>` `:24` cyclic self-ref; `buildDeepRecord(depth)` `:31` nested records; `buildHostileRecord()` `:40` null-prototype + `__proto__`; domain builders `buildGatesDefinition` `:48`, `buildReferralDefinition` `:62`, `buildCapExcessGatesDefinition` `:76`, `buildScopedWindDefinition` `:101`, `buildConditionDefinition` `:116`, `buildEvidenceSnapshotDefinition` `:131`, `buildContinuingLogicalDefinition` `:152`; `createFailingEngine(): ReasonInterface` `:165` every pass fails.

**queue** — `setup.ts`: `createGate<T>(): TestGateInterface<T>` `:29` deferred; `requireElement<T>(values, index): T` `:48` throws on miss; `createErrorRecorder()` `:64` `createRecorder<[error, event]>`; `recordEmitterEvents` `:86` / `isTotal` `:120` wire recorders per event.

**rater** — `setup.ts`: `createTotalRecorder(sentinel)` `:43` records `TotalHandler` calls, returns sentinel; `invokeRaw<T>(thisArg, method, args)` `:64` `Reflect.apply`; `deepFreeze<T>(value)` `:70`; `EXTREME_NUMBERS` `:83`; domain `createSubject` `:95`, `createStaticRate` `:100`, `createLine` `:107`, `createQuoteRate` `:112`, `createLookupFailureLine` `:122`, `createCheckFailureLine` `:135`, `createEngine` `:148`, `createStubEngine` `:163`, `createWorksheet` `:182`, `createLineResult` `:198`.

**reason** — `setup.ts`: `afterEach(vi.restoreAllMocks)` `:25`; `createErrorRecorder` `:39`; `recordEmitterEvents` `:61` / `isTotal` `:95`; `expectQuantitative|Logical|Symbolic|Inferential` `:109–156` narrow `reason()` returns; `deepFreeze` `:180`; subjects `BASIC_SUBJECT` `:200`, `NESTED_SUBJECT` `:213`, `DRIVER_SUBJECT` `:223`, `INTEGER_KEY_SUBJECT` `:452`, `ADVERSARIAL_VALUE_SUBJECT` `:473`; `buildStaticDefinition` `:239`; `createThrowingReasoner` `:253`; `invokeRaw` `:283`; `runTwice` `:302`; `sequence` `:316`; `repeatValue` `:330`; `EXTREME_NUMBERS` `:341`; `TRICKY_KEYS` `:366`; `sparse` `:391`; `deepCompound` `:409`; `deepAddition` `:429`; `buildSubjects` `:490`.

**relation** — `setup.ts`: `recordEmitterEvents` `:31` / `isTotal` `:61`; `INTEGRATION_TABLES` `:74`; `INTEGRATION_RELATIONS` `:80`.

**router** — `setup.ts`: `afterEach(vi.restoreAllMocks)` `:14`; `createTestBody(chunk, count)` `:31` finite `ReadableStream` with pull counter. `setupBrowser.ts`: `drainNavigators` `:18`; `settleHash` `:27` / `setHash` `:39` (`waitForDelay`); `settleHistory` `:52`; `createAnchor` `:66`; `click` `:89`; `safeClick` `:129`; `createDeferred<T>()` `:166`. `setupServer.ts`: `WORKSPACE_ROOT` `:13`; `isAddressInfo` `:52`; `startServer(listener, options?)` `:79` `127.0.0.1:0`; `startPausedResponse` `:112`; `countResponseListeners` `:138`.

**sea** — `setup.ts`: `encodeContent(text): ArrayBuffer` `:18`. `setupServer.ts`: `WORKSPACE_ROOT` `:22`; `withTestDir(files, fn)` `:37` `createScratch` + destroy; `createSEAOptions` `:55`; `createInjectorOptions` `:69`; PE/ELF/Mach-O builders and parsers `buildPeFixture` `:159`, `parsePeResourceLeaves` `:344`, `buildElfFixture` `:451`, `parseElfProgramHeaders` `:518`, `findElfNotes` `:553`, `buildMachoFixture` `:638`, `buildFatMachoFixture` `:752`, `parseMachoLoadCommands` `:767`, `parseMachoSegments` `:797`, `findMachoSection` `:821`.

**server** — `setup.ts`: `afterEach(vi.restoreAllMocks)` `:14`. `setupServer.ts`: `WORKSPACE_ROOT` `:14`; `isAddressInfo` `:39`; `startServer(listener)` `:65` (no call sites in `*.test.ts`; TSDoc only); `rawRequest(port, raw)` `:130`; `openPausedResponse(port, path?)` `:171`; `probeConnectionDrop(port, ms?)` `:215`; `holdUpgrade(port, path?)` `:264`; `upgradeRequest(base, path?, headers?)` `:287`.

**sqlite** — `setup.ts`: Vue-path predicate only. `setupServer.ts`: `sqliteErrorCode(action): string` `:9` try/catch → SQLite `code` or `'NO_THROW'` / `'NOT_SQLITE_ERROR'`.

**sse** — `setup.ts`: `afterEach(vi.restoreAllMocks)` `:12`; `LF`/`CR`/`TAB` `:20–22`; `feedAll` `:30`; `chunkings` `:42`; `mulberry32` `:65`; `partition` `:81`; `buildRepeated` `:94`; `expectSSEError` `:103`; `expectDefined` `:113`.

**template** — `setup.ts`: Vue-path predicate only.

**terminal** — `setup.ts`: `requireElement` `:20`; `isTotal` `:32`; `recordEmitterEvents` `:40`; `createManualTimer()` `:62` flush-all injected timer; `createSSEResponse` `:84`; `createJSONResponse` `:104`; `feedReducer` `:112`; `RecordingTerminal` / `createRecordingTerminal` `:141`/`187`; `createFormSchema` `:192`; `createTwelveControlSchema` `:201`; `createPendingForm` `:238`; `createHostileText` `:253`; `createHostilePattern` `:258`; `createHostileSchema` `:266`; `createHostileWireSchema` `:354`; `TERMINAL_STORE_SCENARIOS` `:383`. `setupServer.ts`: `createStreamTarget` `:17`; `createFakeTTY` `:43`; `createScriptedTTY` `:92`; `createLineInput` `:149`; `rawOutput` `:157`. Extra: `integration.test.ts` local `startFixtureServer` `:61` (`listen(0, '127.0.0.1')` `:112`).

**timeout** — `setup.ts`: Vue-path predicate only.

**tool** — `setup.ts`: `createToolCall(name, args?, id?)` `:14`.

**toolbox** — `setup.ts`: `createTestDatabase()` `:27` memory driver; `createTestDefinition(id?)` `:43`; `createGate` `:78` (no `*.test.ts` call sites); `createTestTaskController` `:102`; `RecordingWorkflowStore` `:126`; `ScriptedProvider` `:210`; `MalformedAgent` `:267`. `setupServer.ts`: `createTestTimer()` `:16` fire-by-index; `readAvailable(response)` `:45` 20 ms race drain.

**websocket** — `setup.ts`: `createRandom(seed)` `:17` mulberry32; `buildText(rng, length)` `:35`; integration command constants `:48–51`; `connect(url)` `:65`; `nextMessage` `:79`; `nextClose` `:91`. `setupServer.ts`: `duplexPair()` `:39`; `flushSocket()` `:46`; `randomBuffer` `:58`; `frame` `:65`; `readClientFrames` `:81`. `setupGlobal.ts`: `setup({ provide })` `:29` real `node:http` + WS upgrade, `listen(0, '127.0.0.1')` `:71`, `provide('wsUrl')`.

**worker** — `setup.ts`: `createGate` `:32` (`Promise.withResolvers`); `TestQueueStore` `:53`; `createTeardown` `:100`; `PoolOptionsProbe` `:123`; `createErrorRecorder` `:180`; `recordEmitterEvents` `:202` / `isTotal` `:236`; `createResourceFactory` `:268`. `setupServer.ts`: `postRun` `:13`; `tempDatabasePath()` `:21` `createScratch`; `NodeWorkerOptionsProbe` `:30`; `ThreadReply` `:88`. Fixtures: 18 `tests/src/server/fixtures/*.ts` (`echo.ts:7` `serveWorker({...})` and siblings: abortable, crash, double, fail, slow, …).

**workflow** — `setup.ts`: `INVALID_TASK_ACTIVITIES` `:20`; `omitTaskActivity` `:40`; `requireTask` `:63`; `createTaskControllerFixture` `:74`; **local** `roundTripJSON<T>` `:103` (`JSON.parse(JSON.stringify)`); `createGate` `:123`; `WorkflowStoreBoundary` `:137`; `FaultBudget` `:183`; `createErrorRecorder` `:239`; `recordEmitterEvents` `:261` / `isTotal` `:295`; `instrumentSignal` `:323`; `RecordingScheduler` / `createRecordingScheduler` `:356`/`385`; `buildWorkflowDefinition` `:406`; `buildReleaseDefinition` `:449`; `RELEASE_FUNCTIONS` `:476`; `settleSnapshot` `:493`. `setupBrowser.ts` / `setupServer.ts`: comments only, no exports.

**workspace** — `setup.ts`: `createErrorRecorder` `:18`; `isTotal` `:31`; `recordEmitterEvents` `:47`; **local** `roundTripJSON<T>` `:71`; `createThrowingGetterRecord` `:76`; `createRevokedProxy` `:84`; `buildWorkspaceSnapshot` `:100`; `assertWorkspaceStoreContract` `:114` shared `describe` suite.

**test (`/home/user/test`)** — `setup.ts`: `createAsyncSource<T>(values)` `:13`; `createStreamSource<T>(values)` `:27`. Own tests import the 13-export surface from `@src/core` / `@src/server` (implementation under test), not as duplicated helpers.

**scaffold** — `setup.ts`: hostile/guard/parser tables `buildHostileCases` `:416`, `selectHostileCase` `:467`, `readKeyCount` `:486`, `buildGuardCases` `:495`, `buildParserCases` `:630`, `buildUnionCases` `:668`, `buildPurityCases` `:784`; domain builders `buildBlueprint` `:177` through `buildCompilerOptions` `:332`; constants `PATH_CASES` `:831`, `RANGE_CASES` `:855`, trap descriptors `:337–373`. `setupServer.ts`: `WORKSPACE_ROOT` `:238`; `detectCaseFolding` `:258` / `CASE_FOLDING` `:309`; `listExecutablePaths` `:284`; `createWorkspace()` `:332` scratch wrapper + junction `link`; `createUpstreamServer(replies)` `:1741` `listen(0, '127.0.0.1')`; `readErrorCode` `:843`; `readErrorMessage` `:859`; `readRejectionCode` `:1884`; `createSink` `:1126`; git `createRepository` `:1095` / `trackFiles` `:1332`; host/fleet builders (`createHostRoot` `:908`, `createFleet` `:1280`, …); tables `FILESYSTEM_PATH_CASES`, `DIGEST_CASES`, `COMMAND_CASES`, `USAGE_CASES`, `UPSTREAM_PATHS`, etc.

**`isBrowserVuePath(path)`** — identical export in all 19 fleet-src `setup.ts` files (qualifier `:198`, queue `:128`, rater `:209`, reason `:495`, relation `:85`, router `:49`, sea `:26`, server `:19`, sqlite `:9`, sse `:119`, template `:7`, terminal `:446`, timeout `:5`, tool `:28`, toolbox `:299`, websocket `:98`, worker `:285`, workflow `:500`, workspace `:170`). Zero call sites under those `tests/` trees. Absent from `/home/user/test` and `/home/user/scaffold` setups.

**Repeated non-setup files.** Every tree has `config.test.ts` with the same `mkdtempSync` trio at `:493`, `:515`, `:552` (and a fourth under the package root at `:606`). Not declared vendored.

---

## 2. Cluster table

| Cluster | Packages | Members (`file:line`) | Shape difference |
| --- | --- | --- | --- |
| Vue-path predicate | 19 fleet-src | `isBrowserVuePath` in each `setup.ts` (lines in §1) | Spelling identical. No Slice B call sites. test + scaffold omit it. |
| Emitter recorder bundle | 7: queue, reason, relation, terminal, worker, workflow, workspace | `recordEmitterEvents` queue `setup.ts:86`, reason `:61`, relation `:31`, terminal `:40`, worker `:202`, workflow `:261`, workspace `:47`; `isTotal` beside each; `createErrorRecorder` in queue `:64`, reason `:39`, worker `:180`, workflow `:239`, workspace `:18` (relation/terminal omit the error alias) | Same loop: `createRecorder` + `emitter.on` + total-guard. Error strings differ (`'recordEmitterEvents: a recorder was not wired…'` vs `'An event recorder was not installed'` vs `'missing event recorder'`). Thin alias over `createRecorder`, not a second recorder. |
| Deferred / gate | 5 defined; inline also in router/server/queue tests | `createGate` queue `setup.ts:29`, toolbox `:78`, worker `:32` (`Promise.withResolvers`), workflow `:123`; `createDeferred` router `setupBrowser.ts:166` | queue/toolbox/workflow: `{ promise, resolve, reject }` as readonly fields, manual `new Promise`. worker: `Promise.withResolvers`. router: methods `resolve`/`reject` (not readonly fields). toolbox `createGate` unused in `*.test.ts`. Inline `Promise.withResolvers` also in queue `Queue.test.ts:2452`, router helpers/setupServer, server `setupServer.ts:176`/`266` and `Server.test.ts:366+`, worker `ThreadReply` `:102`. |
| Indexed require | 2: queue, terminal | `requireElement` queue `setup.ts:48`, terminal `setup.ts:20` | Same throw-on-undefined. queue ~22 calls; terminal ~36. Near-`requireValue` but for `values[index]`, not a named lookup. |
| Deep freeze | 2: reason, rater | reason `setup.ts:180`; rater `setup.ts:70` | Both `isArray`/`isRecord` recurse + `Object.freeze`. reason freezes then returns; rater `return Object.freeze(value)`. |
| Reflect.apply bypass | 2: reason, rater | reason `setup.ts:283` `invokeRaw(target, method, args)`; rater `setup.ts:64` `invokeRaw(thisArg, method, args)` | reason types `method: (...args: never[]) => T`. rater types `method: unknown` and throws if not callable. |
| Extreme-number tables | 2: reason, rater | reason `EXTREME_NUMBERS` `setup.ts:341`; rater `:83` | Different populations. reason: signed zeros, safe-integer bounds, EPSILON, 0.1/0.2/0.3. rater: overflow-to-Infinity pair (`MAX_VALUE` twice, `MIN_VALUE`, `-MAX_VALUE`). |
| Loopback HTTP `listen(0,'127.0.0.1')` | 5: router, server, websocket, terminal, scaffold | router `startServer` `setupServer.ts:79` (~22 calls in `helpers.test.ts`); server `startServer` `setupServer.ts:65` (**0 test calls**); websocket `setupGlobal.ts:71`; terminal inline `startFixtureServer` `integration.test.ts:61`/`112`; scaffold `createUpstreamServer` `setupServer.ts:1741` (~44 calls) | router: generic `RequestListener`, optional `ServerOptions`, returns `{url,port,close}`. server: same bind, no options; unused. websocket: Vitest `setup()` + `provide('wsUrl')`, WS upgrade. terminal: SSE+POST broker, not shared. scaffold: path-scripted replies, `held`/`delay`/`gzip`/`peak`. |
| Paused HTTP consumer | 2: router, server | router `startPausedResponse` `setupServer.ts:112`; server `openPausedResponse` `setupServer.ts:171` | router: `http.get` then `response.pause()`. server: raw TCP, pause before write, SSE Accept, `resume`/`destroy`. |
| Scratch allocate/use/destroy | 3 wrap `createScratch`; 2 raw `mkdtemp` | sea `withTestDir` `setupServer.ts:37` (~60 calls); worker `tempDatabasePath` `setupServer.ts:21` (3 calls); scaffold `createWorkspace` `setupServer.ts:332` (~239 calls). sqlite `SQLiteDatabase.test.ts:270` `mkdtempSync`; test `helpers.test.ts:10` `mkdtempSync` | Wrappers adopt `createScratch`. sqlite/test allocate with `mkdtempSync` + `rmSync`. sea pre-writes `files`. scaffold adds `link` (junction), `read` via `requireValue`. |
| Config-proof temp dirs | 21 (every Slice B tree) | `config.test.ts:493`, `:515`, `:552`, `:606` `mkdtempSync` | Same line numbers/prefixes (`orkestrel-config-outside-`, `-package-`, `-assets-`). Not declared vendored. |
| Local `roundTripJSON` | 2: workflow, workspace | workflow `setup.ts:103`; workspace `setup.ts:71` | Byte-identical `JSON.parse(JSON.stringify(value))`. Both comments: published helper’s `JSONValue` bound rejects their snapshot interfaces. workflow 1 call (`MemoryWorkflowStore.test.ts:121`); workspace 2. Extra inline `JSON.parse(JSON.stringify)` in workflow tests and reason `Reason.test.ts:694`. |
| Seeded PRNG | 2: sse, websocket | sse `mulberry32` `setup.ts:65`; websocket `createRandom` `setup.ts:17` | Both mulberry32. sse: `>>> 0` unsigned add. websocket: `| 0` signed add. sse drives `partition`; websocket drives `buildText` / `randomBuffer`. |
| Injected timer | 2: terminal, toolbox | terminal `createManualTimer` `setup.ts:62`; toolbox `createTestTimer` `setupServer.ts:16` | terminal: `flush()` fires all pending. toolbox: `fire(index)` one entry; exposes `armed`/`cancelled`. |
| Scripted protocol peer | 3: terminal, toolbox, websocket | terminal `RecordingTerminal` `setup.ts:141`, `createFakeTTY`/`createScriptedTTY` `setupServer.ts:43`/`92`; toolbox `ScriptedProvider` `setup.ts:210`; websocket `duplexPair` `setupServer.ts:39` | Different protocols (form/TTY vs LLM provider vs WS frames). Shared idea: real interface, scripted I/O, recorder. |
| Hostile input builders | 4: qualifier, reason, workspace, scaffold | qualifier `buildCyclicRecord`/`buildDeepRecord`/`buildHostileRecord` `setup.ts:24/31/40`; reason `TRICKY_KEYS` `:366`, `ADVERSARIAL_VALUE_SUBJECT` `:473`; workspace `createThrowingGetterRecord` `:76`, `createRevokedProxy` `:84`; scaffold `buildHostileCases` `:416` | qualifier: cyclic/deep/null-proto. reason: key corpus + symbol/bigint/function subject. workspace: getter/proxy. scaffold: 10-case matrix (cyclic, revoked, traps, sparse, oversized). |
| Store contract table | 2: terminal, workspace | terminal `TERMINAL_STORE_SCENARIOS` `setup.ts:383`; workspace `assertWorkspaceStoreContract` `setup.ts:114` | terminal: data table of `{label, act, expected}`. workspace: registers a `describe` with `expect`. Same “one suite, two store impls” role. |
| Error-code extractor | 2: sqlite, scaffold | sqlite `sqliteErrorCode` `setupServer.ts:9`; scaffold `readErrorCode` `setupServer.ts:843` / `readRejectionCode` `:1884` | sqlite: sync, returns SQLite `code` or sentinels `'NO_THROW'`/`'NOT_SQLITE_ERROR'`. scaffold: returns `ScaffoldErrorCode \| undefined` (undefined on success or non-scaffold throw). |
| Definedness narrow | 1 in-cluster with `requireValue` | sse `expectDefined` `setup.ts:113` (1 call `SSEParser.test.ts:732`) | Same throw-if-undefined as `requireValue`. Message `'expected value to be defined'`. |
| `vi.restoreAllMocks` setup | 4: reason, router, server, sse | reason `setup.ts:25`; router `setup.ts:14`; server `setup.ts:14`; sse `setup.ts:12` | Identical `afterEach` side effect. Not a helper export. |

---

## 3. Duplication of the existing 13-export surface

Adoption is the default. Gaps (reimplement or bypass instead of import):

| Existing export | Gap | Evidence |
| --- | --- | --- |
| `roundTripJSON` | workflow, workspace local copies | workflow `setup.ts:90–104` comment: published `T extends JSONValue` rejects `WorkflowSnapshot`. workspace `setup.ts:62–72` same for `WorkspaceSnapshot`. Body is `JSON.parse(JSON.stringify(value))`. |
| `requireValue` | sse `expectDefined` | sse `setup.ts:113`. guides.test.ts in 19 fleet-src packages already import `requireValue`. |
| `captureError` | sqlite `sqliteErrorCode`; sqlite inline try/catch; sse `expectSSEError` | sqlite `setupServer.ts:9` returns a **code string**, not the thrown value. sqlite `helpers.test.ts:26–37` `nativeConstraintError` local try/catch despite importing `captureError` at `:13`. sse `expectSSEError` `setup.ts:103` narrows to `SSEError` (domain). |
| `createScratch` | sqlite file DB; test `resolveContained` tests; all `config.test.ts`; vendored policy | sqlite `SQLiteDatabase.test.ts:270` `mkdtempSync`. test `helpers.test.ts:10` `mkdtempSync`. `config.test.ts:493+` every tree. Policy `inspectPolicyControl` (vendored). Contrast: sea/worker/scaffold wrap `createScratch`. |
| `createRecorder` | rater `createTotalRecorder` | rater `setup.ts:43` — recorder **plus** fixed numeric return. Not a 1:1 clone. |
| `waitForDelay` | none found as a named reimplementation | toolbox `readAvailable` `setupServer.ts:50` uses `setTimeout(..., 20)` as a read-idle race, not a delay helper. websocket `flushSocket` `setupServer.ts:46` is `setImmediate`×2. |
| `collect` / `collectStream` | none in Slice B product tests | Only `/home/user/test/tests/src/core/helpers.test.ts:112–132` (package under test) plus `createAsyncSource`/`createStreamSource`. |
| `resolveRoot` | none as a helper clone | Used as SUT in test `guides.test.ts:12`. router/sea/server/scaffold `WORKSPACE_ROOT` is `fileURLToPath` of `tests/../`, not `resolveRoot`. |
| `resolveContained` / `matchesIdentity` / `isExcluded` / `readInventory` | no local clones | `readInventory` imported in every fleet-src `guides.test.ts`. The other three exercised only as SUT in `/home/user/test/tests/src/server/helpers.test.ts:5`. |

**Not gaps:** `createErrorRecorder` / `recordEmitterEvents` call `createRecorder`. `withTestDir` / `tempDatabasePath` / scaffold `createWorkspace` call `createScratch`. `createGate` is not in the 13.

---

## 4. Demand counts

Package count = distinct Slice B trees that contain a member. Call sites are in-tree uses excluding the definition (approximate where a file has many).

| Cluster | Packages | Call sites (order of magnitude) |
| --- | --- | --- |
| Vue-path predicate | 19 | 0 in `tests/` |
| Emitter recorder bundle | 7 | queue ~10; reason ~35; relation ~4; terminal ~10; worker ~8; workflow ~70; workspace ~6 |
| Deferred / gate | 5 (+ inline in 3 more) | queue `createGate` 8; worker ~26; workflow ~52; router `createDeferred` 4; toolbox 0. Extra inline `withResolvers` in queue/router/server tests |
| Indexed `requireElement` | 2 | queue ~22; terminal ~36 |
| Deep freeze | 2 | reason ~50 combined with `invokeRaw` in those files; rater ~7 combined |
| `invokeRaw` | 2 | included in reason/rater counts above |
| Loopback HTTP | 5 | router `startServer` ~22; server `startServer` 0; websocket global 1 (process lifetime); terminal fixture 1 helper, used by that file; scaffold `createUpstreamServer` ~44 |
| Scratch wrappers | 3 | sea `withTestDir` ~60; worker `tempDatabasePath` 3; scaffold `createWorkspace` ~239 |
| Raw `mkdtemp` (non-vendored) | sqlite, test, + 21× `config.test.ts` | sqlite 1 suite dir; test several in `helpers.test.ts`; config 4 per tree |
| Local `roundTripJSON` | 2 | workflow 1; workspace 2 (+ extra inline stringify in workflow/reason tests) |
| Seeded PRNG | 2 | sse: `mulberry32` 1, `chunkings`/`feedAll` several in `SSEParser.test.ts:1016+`; websocket `createRandom` ~10 |
| Injected timer | 2 | toolbox `createTestTimer` ~12 + `readAvailable` ~20; terminal `createManualTimer` used from Prompt/Manager tests |
| `waitForDelay` (adopted) | ≥10 | queue, router, timeout, tool, toolbox, websocket, worker, workflow, scaffold helpers; router `setupBrowser.ts:29` |
| `captureError` (adopted) | ≥8 | reason (many files), rater, sea, sqlite, template, workflow |
| `createRecorder` (adopted) | ≥12 | qualifier, queue, rater, reason, relation, router, template, timeout, tool, toolbox, websocket, worker, workflow, workspace, scaffold |
| `requireValue` + `readInventory` (adopted) | 19 fleet-src `guides.test.ts` + scaffold/test | typically 1–3 calls per `guides.test.ts` |
| `createScratch` (adopted) | 3 | sea, worker, scaffold (via wrappers) |
| `instrumentSignal` | 1 (workflow) | ~15 across Scheduler/Node/Frame/Idle/Browser + WorkflowRunner |
| `createTeardown` | 1 (worker) | 4 (`helpers`, `handlers`, `factories`, `Worker.test.ts`) |
| Hostile builders | 4 | qualifier validators ~15; scaffold matrix consumed by validators/cloners/parsers; workspace a few; reason constants used across reasoner tests |

---

## 5. Singles worth naming

General-purpose (not product policy), one package in this slice:

- **worker `createTeardown`** `setup.ts:100` — generic `afterEach` registrar, `Promise.allSettled`, `AggregateError`. Used for workers and scratch cleanup.
- **workflow `instrumentSignal`** `setup.ts:323` — wrap real `AbortSignal` add/remove, count `'abort'` listeners. Used on Node and browser schedulers.
- **sse `chunkings` / `partition` / `feedAll`** `setup.ts:30–91` — deterministic stream chunk-invariance. Parser-shaped, not SSE-specific.
- **sse `mulberry32`** `setup.ts:65` — seeded PRNG (pair with websocket `createRandom`, slightly different).
- **router `createTestBody`** `setup.ts:31` — finite `ReadableStream` with observed pull count.
- **router `safeClick` / `createAnchor` / `settleHash`** `setupBrowser.ts:27–144` — real DOM events without navigating the test iframe.
- **server `rawRequest` / `upgradeRequest` / `holdUpgrade` / `probeConnectionDrop`** `setupServer.ts:130–287` — protocol-faithful raw TCP/HTTP probes. `startServer` beside them is unused.
- **websocket `duplexPair` / `connect` / `nextMessage` / `nextClose`** `setupServer.ts:39`, `setup.ts:65–91` — in-memory Duplex pair and browser WS waiters.
- **websocket `setupGlobal.ts:29`** — process-level fixture server + Vitest `provide`.
- **test `createAsyncSource` / `createStreamSource`** `/home/user/test/tests/setup.ts:13`/`27` — inert async-iterable / `ReadableStream` sources for `collect` / `collectStream`.
- **scaffold `createUpstreamServer`** `setupServer.ts:1741` — scripted loopback HTTP with concurrency `peak`, `held` (no response), `delay`, gzip, 404 default.
- **scaffold `detectCaseFolding`** `setupServer.ts:258` — probe real temp FS rather than `process.platform`.
- **scaffold `readErrorCode` / `readRejectionCode`** `setupServer.ts:843`/`1884` — coded-refusal extractors (sync/async).
- **terminal `createManualTimer`** `setup.ts:62` — deterministic injected `TimerHandler` (flush-all).
- **toolbox `readAvailable`** `setupServer.ts:45` — drain a streaming `Response` until idle (20 ms race).
- **reason `runTwice` / `sequence` / `repeatValue` / `sparse`** `setup.ts:302–397` — determinism and numeric/array fixtures.

Domain-heavy singles (named only as evidence they exist; not general): qualifier definition builders; rater line/engine stubs; sea PE/ELF/Mach-O fixtures; terminal form/TTY recording; toolbox `ScriptedProvider`/`RecordingWorkflowStore`; worker 18 `serveWorker` scripts; workflow `buildReleaseDefinition`/`settleSnapshot`; workspace `assertWorkspaceStoreContract`; scaffold blueprint/plan/CLI tables.

---

**Unknowns:**

- Whether `isBrowserVuePath` is consumed outside `tests/` (vite/policy). No `tests/` call sites in this slice.
- Whether Slice A’s copies of `recordEmitterEvents` / `createGate` / `startServer` / `withTestDir` match these line-for-line (unread).
- Whether `config.test.ts` is intended as a third vendored pair with `setupPolicy`/`policy.test.ts` (same line numbers in all 21 trees; brief did not say so).
- Whether published `roundTripJSON`’s `JSONValue` bound is still the blocker workflow/workspace comments describe (types live outside `tests/`).
- server `startServer` (`setupServer.ts:65`): exported, documented, zero `*.test.ts` uses in this tree.
- toolbox `createGate` (`setup.ts:78`): exported, zero `*.test.ts` uses.
