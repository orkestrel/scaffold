**Coverage:** 19 trees read, `tests/` only. Live checkouts `/workspace/supervisor` and `/workspace/middleware` have `tests/`. The 17 fleet-target clones under `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-target/{agent,budget,contract,database,emitter,guide,mcp,middleware,ollama,router,sea,server,sse,terminal,test,tool,workflow}` are published snapshots (`package.json`, `LICENSE`, `README.md`, `dist/`) with **no `tests/` directory**. `@orkestrel/test` 0.0.3 surface confirmed from that clone’s published `.d.ts` (tests absent). Remaining fleet packages unread.

---

## 1. Setup inventory

### `/workspace/supervisor` (live)

**`tests/setup.ts`**

| Symbol | Loc | Sketch | Semantics |
|---|---|---|---|
| `APPLICATION_USER_NAME` / `APPLICATION_USER_SECRET` | 36–39 | `string` constants | Shared session principal |
| `createApplicationUsers` | 42 | `(principal?: string) => string` | Serializes `APP_USERS` JSON |
| `waitForEvent` | 49 | `(emitter, event) => Promise<tuple>` | `once` then return args |
| `isBrowserVuePath` | 57 | `(path: string) => boolean` | `app/browser/` Vue path |
| `waitForRecorder` | 63 | `(recorder) => Promise<void>` | Polls `count === 0` up to 40×5ms via `waitForDelay` |
| `waitForAbort` | 72 | `(signal: AbortSignal) => Promise<void>` | Resolves on abort, including already-aborted |
| `createLease` / `createUnitContext` / `createUnitSnapshot` / `createExecutionInput` | 80–125 | `Partial<T> => frozen T` | Inert supervisor-domain rows |
| `createWorkflowDefinition` / `createWorkflowSnapshot` | 137, 186 | task list / overrides → frozen defs | One-phase workflow fixtures |
| `createSupervisorFixture` | 162 | `(executor, options?) => {supervisor, run}` | Open memory supervisor |
| `InertObservations` / `InertExecution` / `InertExecutor` | 220–263 | seeded async iterable / handle / launcher | Deterministic executor seam |
| `ProbeExecutor` / `AttachExecutor` / `CapableExecutor` | 296–411 | seeded probe/attach/stop/steer/reply | Optional-capability executors |
| `GatedStore` / `RecordingStore` / `RefusingStore` | 347–404 | `MemorySupervisorStore` subclasses | Gate, record, or fence writes |
| `RecordingJournal` | 433 | counts `append` | Journal call counter |

**`tests/setupApplicationServer.ts`**

| Symbol | Loc | Sketch | Semantics |
|---|---|---|---|
| `ApplicationCookieJar` | 11 | `header` / `get` / `capture(Response)` | Replay `Set-Cookie` |
| `stopNodeServer` | 57 | `(Server) => Promise<void>` | Close + wait |
| `reserveLoopbackPort` | 65 | `() => Promise<number>` | Bind `127.0.0.1:0`, close, return port |
| `startApplicationProcess` | 79 | `(port, env?, cwd?) => ApplicationProcessInterface` | Spawn `dist/app/server/main.cjs` |
| `waitForApplicationStderr` | 125 | `(app, fragment) => Promise<string>` | 10s poll for stderr text |
| `waitForApplicationProcess` | 142 | `(app) => Promise<{code, signal}>` | Wait `close` or already-exited |
| `stopApplicationProcess` | 158 | `(app) => Promise<void>` | SIGTERM then SIGKILL |
| `waitForApplicationResponse` | 174 | `(app, port, path?) => Promise<Response>` | 10s poll `fetch` until success |

**`tests/setupServer.ts`**

| Symbol | Loc | Sketch | Semantics |
|---|---|---|---|
| `verifyCrashRecovery` / `verifyIdentityBound` | 73, 134 | evidence → `Result<void, string>` | Crash/identity invariants |
| `RecordingSupervisorStore` | 179 | delegates + records `list`/`intent` | Store call log |
| `warmSupervisorStore` | 226 | `(store) => Promise<void>` | Prime lazy SQLite |
| `GatedExecutor` / `SelectiveRecoveryExecutor` | 231, 307 | accept-gated / reattach-only | Recovery fixtures |
| `resolveProviderFixture` / `runProviderFixture` / `startProviderFixture` | 367–412 | path / spawn+wait / long-lived spawn | Protocol CLI stand-ins |
| `parseProviderFrames` | 403 | NDJSON string → `unknown[]` | JSON Lines decode |
| `hasProcess` | 420 | `(pid) => boolean` | `kill(0)` + Linux zombie check |
| `collectProviderObservations` | 437 | `for await` drain `execution.events` | Async-iterable collect |
| `ProtocolFixtureProvider` / `ClaudeFixtureProvider` / `CodexFixtureProvider` / `CursorFixtureProvider` | 446–604 | `ProviderInterface` / adapter overrides | Route native CLIs through fixtures |
| `createTemporaryDirectory` | 628 | `(prefix?) => {path, destroy}` | `mkdtemp` + recursive `rm` |
| `waitForSocketClose` | 641 | `(Socket) => Promise<void>` | Close event; ignore reset |

**`tests/setupService.ts`:** `SERVICE_INFERENCE_PROMPT` (8); `collectServiceInference` (22) drains provider stream; `expectServiceInference` (44) asserts `OK`; `resolveServiceModel` / `reportServiceModel` / `prepareServiceProvider` (67–105) live-CLI readiness; `isOllamaServiceReady` / `warmOllamaService` / `prepareOllamaService` (149–191) Ollama tags+warmup; `retryUntil` (206) bounded retry; `SERVICE_MODEL` (223) module-load side effect.

**`tests/setupBrowserServer.ts`:** `APPLICATION_BROWSER_TOKEN`/`TTL` (18–21); `createBrowserServer` (56) reserve port + spawn + wait health; `destroyBrowserServer` (42); Vitest `setup` (108) boots two servers and `provide`s a Playwright seam.

**`tests/setupGuides.ts`:** `GUIDE_ROOT` via `fileURLToPath(new URL('../', import.meta.url))` (7); `walkGuideDirectory` / `readGuideWorkspace` (49–67) recursive text map; `GUIDE_FILES` / `GUIDE_MANIFEST` / `readGuideText` (78–88); specifier export cache `exportsFor` (37).

**`tests/setupPolicy.ts`:** coding-law instrument — registers (`CENTRAL_SOURCE_FILES` 7, `FUNCTION_SOURCE_FILES` 31, `DATA_SOURCE_FILES` 51, `FUNCTION_DOMAIN_FOLDERS` 64, `WORKER_SCOPE_VALUE_GLOBALS` 67); Vue extractor types (119–125); path/syntax predicates (`normalizePolicyPath` 130 … `isSelfContained` 276); TypeScript program bind (`createPolicyProgram` 372); inspectors (`inspectVueCodingLaw` 451, `inspectCodingSource` 475, `inspectCodingNode` 491, `inspectFunctionModule` 571, `inspectCodingLaw` 593, `inspectCodingWorkspace` 741). Typechecker-backed, Vue-aware; returns `string[]` diagnostics.

**`tests/setupBrowser.ts`:** Vue/jsdom harness — `waitForBrowserState` (116) Vue `watch` until predicate; pane capture (`stagePane` 157, `captureFrame` 236); a11y tree (`describeTree` 535, `describeSurface` 609); `Journal` (648); contrast (`readContrast` 882); mount/drive (`mountComponent` 1000, `mountShell` 1031, `pressControl` 1136, `fillField` 1155); snapshot builders (`createApplicationSnapshot` 1308 … `createGapFrame` 1468); `RecordingOperatorStore` / `RejectingOperatorStore` / `ScriptedRoster` / `ScriptedHistory` / `ScriptedClient` (1473–1785).

**Helper modules (not `tests/setup*.ts` at root):**

- `tests/app/setup.ts`: fixture CLI backends (`ClaudeFixtureCLIBackend` 38 … `MissingCLIBackend` 65); `InertAgentProvider` / `RejectingAgentProvider` (77–108); gated stores (134–190); `createApplicationEnvironment` (228) / `createInferenceEnvironment` (246); `NDJSONReader` (260) / `SSEReader` (312) / `readSSEMessage` (352) / `readSSEUntil` (438); MCP request helpers (368–420); `RecordingOutput` (453).
- `tests/app/browser/integration/setup.ts`: Playwright journey — `launchApplicationBrowser` (193), target resolution, `captureJourneyFrame` (353), login/drive, workflow POST helpers, session/cookie/storage, `waitForApplicationExpiry` (745).
- `tests/app/browser/portfolio.ts`: capture matrix (`PORTFOLIO_VARIANTS` 44, `SHELL_STATES` 61, `buildFrame` 123).

**Repeated inline patterns in `*.test.ts`:** `ApplicationRuntime.test.ts:58` keeps a `node:http` tarpit on `:0` and polls snapshots (`:114`); `ApplicationHandlers.test.ts:80` and `MCPProjection.test.ts` / `middlewares.test.ts:592` use `@orkestrel/server` `createServer({ port: 0 })`; component files define local `render()` wrappers; `stores/integration.test.ts:21` pairs `createTemporaryDirectory` with `createSQLiteDriver`.

### `/workspace/middleware` (live)

**`tests/setup.ts`:** `TEST_BODY_LIMIT` (14); `buildRequest` (29); `createTestContext` (49); `ECHO_MARKER` (67); `createEchoTerminal` (82); `createRecordingTerminal` (113); `createRecordingNext` (152); `runChain` (186); `createManualClock` (217); `isBrowserVuePath` (231) — **defined, no call site in this tree**.

**`tests/setupServer.ts`:** `PNG_MAGIC`/`JPEG_MAGIC` (19–22); `buildStaticFixture` (58) / `buildSymlinkFixture` (120) / `buildDirectoryIndexFixture` (172) via `createScratch`; `buildCancelTrackingMultipartRequest` (217); `buildMultipartBody` (280); `buildMultipartRequest` (330); `isAddressInfo` (363); `startServer` (387) — `node:http` on `127.0.0.1:0`.

**`tests/setupPolicy.ts`:** placement/mirror instrument — `inspectPolicySource` (518), `inspectPolicyWorkspace` (716), `inspectPolicyControl` (726) writes files into `mkdtempSync(join(tmpdir(), 'orkestrel-policy-'))`; `POLICY_CONTROLS` (741); `GENERIC_POLICY_SOURCES` (967). Syntax-only (no typechecker, no Vue). Different module from supervisor’s `setupPolicy.ts`.

**Inline:** `DatabaseSessionStore.test.ts:19` `buildStore()` over `createMemoryDriver`; `config.test.ts:493+` raw `mkdtempSync` workspaces; `guides.test.ts:48` `new URL('../', import.meta.url)` + `readInventory`.

### Fleet-target 17 clones

No `tests/` files. No setup symbols. Live middleware is `0.0.12`; fleet-target/middleware clone is `0.0.11`.

### `@orkestrel/test` 0.0.3 (fleet-target/test, surface only)

Core: `captureError`, `collect`, `collectStream`, `createRecorder`, `requireValue`, `resolveRoot`, `roundTripJSON`, `waitForDelay`. Server: `createScratch`, `readInventory`, `resolveContained`, `matchesIdentity`, `isExcluded`. Matches the standing list.

---

## 2. Cluster table

### Loopback port reservation

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setupApplicationServer.ts:65` | `reserveLoopbackPort(): Promise<number>` | Bind `:0`, close, return port for a later child bind |
| supervisor | `tests/app/server/ApplicationRuntime.test.ts:70` | `tarpit.listen(0, '127.0.0.1')` | Keeps the socket; not the reserve-and-release helper |
| middleware | `tests/setupServer.ts:387` | `startServer(listener)` → `{url, port, close}` | Bind `:0` and **keep** listening |

**Differs:** supervisor reservation is bind-release (TOCTOU window); middleware (and the tarpit) keep the server. Same OS primitive.

### Fixture HTTP servers

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| middleware | `tests/setupServer.ts:387` | `http.createServer(listener).listen(0, '127.0.0.1')` | Raw Node listener |
| supervisor | `tests/app/server/ApplicationHandlers.test.ts:80` | `createServer({ dispatcher, host: '127.0.0.1', port: 0 })` | `@orkestrel/server` |
| supervisor | `tests/app/server/MCPProjection.test.ts:190` | `createServer({…})` | Same framework server |
| supervisor | `tests/app/server/middlewares.test.ts:592` | `createServer({…})` | Same |
| supervisor | `tests/app/server/ApplicationRuntime.test.ts:58` | `createServer((request) => {…})` | Raw Node tarpit |

**Differs:** framework dispatcher vs raw `node:http`; keep-alive vs reserve-and-release.

### Child-process spawn / wait-ready / stop

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setupApplicationServer.ts:79` | `startApplicationProcess(port, env?)` | Spawn built app |
| supervisor | `tests/setupApplicationServer.ts:174` | `waitForApplicationResponse(app, port, path?)` | Poll `fetch` 10s |
| supervisor | `tests/setupApplicationServer.ts:158` | `stopApplicationProcess` SIGTERM→SIGKILL | Teardown |
| supervisor | `tests/setupServer.ts:372` | `runProviderFixture(command, fixture)` | Spawn fixture, wait `close` |
| supervisor | `tests/setupServer.ts:412` | `startProviderFixture(...args)` | Long-lived fixture PID |
| supervisor | `tests/setupService.ts:123` | `spawnSync(file, args, { timeout: 30_000 })` | Auth/readiness probe |

**Differs:** app-entry vs protocol-fixture vs sync readiness. Middleware has no child-process harness.

### Environment-object builders

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/app/setup.ts:228` | `createApplicationEnvironment(principals?)` | Frozen `APP_*` map |
| supervisor | `tests/app/setup.ts:246` | `createInferenceEnvironment(root, mode?)` | Extends the above with inference knobs |
| supervisor | `tests/setup.ts:42` | `createApplicationUsers(principal?)` | `APP_USERS` JSON only |
| supervisor | `tests/setupApplicationServer.ts:87` | inline `env: { APP_HOST, APP_PORT, …}` | Spawn env merge |

Middleware: none.

### Poll-until / deadline loops

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setup.ts:66` | `for (… attempt < 40 && recorder.count === 0; …) await waitForDelay(5)` | Recorder wait |
| supervisor | `tests/setupApplicationServer.ts:130` | `while (Date.now() < deadline)` + `waitForDelay(25)` | Stderr / HTTP ready |
| supervisor | `tests/setupService.ts:193` | `for (attempt < 6)` + `waitForDelay(1_000)` | Ollama tags |
| supervisor | `tests/setupService.ts:206` | `retryUntil(produce, satisfied, description, attempts=6)` | No delay between attempts |
| supervisor | `tests/setupBrowser.ts:116` | `waitForBrowserState(predicate)` | Vue `watch`, not a timer loop |
| supervisor | `tests/app/server/ApplicationRuntime.test.ts:114` | inline 5s snapshot poll | Same shape as wait-ready |
| middleware | `tests/setup.ts:217` | `createManualClock(start=0)` `{clock, advance, set}` | Avoids waiting; injectable `now` |

**Differs:** wall-clock poll vs Vue watch vs attempt-count vs fake clock.

### Stream and event capture

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setup.ts:49` | `waitForEvent(emitter, event)` | Typed `once` |
| supervisor | `tests/setupServer.ts:437` | `collectProviderObservations` `for await` | Drain observations |
| supervisor | `tests/setupService.ts:22` | `collectServiceInference` drain + keep `result` | Drain + terminal value |
| supervisor | `tests/app/setup.ts:260` | `NDJSONReader.read()` | Line-framed JSON |
| supervisor | `tests/app/setup.ts:312` | `SSEReader.read()` / `readSSEUntil` | SSE blocks / fragment |
| middleware | `tests/setup.ts:113` | `createRecordingTerminal` `{calls, count, handler}` | Terminal invocation log |
| middleware | `tests/setup.ts:152` | `createRecordingNext` | Isolated `next()` log |

**Differs:** event-once vs async-iterable collect vs byte-protocol parsers vs HTTP recorder. Recorder **shape** (`calls`/`count`/`handler`) matches `createRecorder`; collect **shape** matches `collect`/`collectStream`.

### Fixture CLI backends

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setupServer.ts:446` | `ProtocolFixtureProvider` | Generic process protocol |
| supervisor | `tests/setupServer.ts:567` | `ClaudeFixtureProvider.attach` rewrites `file` to fixture | Native adapter + fixture argv |
| supervisor | `tests/app/setup.ts:38` | `ClaudeFixtureCLIBackend` `file = process.execPath` | App-layer CLI backend |

Middleware: none.

### Temp resources beyond `createScratch`

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setupServer.ts:628` | `createTemporaryDirectory(prefix?)` `mkdtemp`+`rm` | Path-only; no contained write API |
| middleware | `tests/setupServer.ts:59` | `createScratch({ prefix, files })` | Adopted server helper |
| middleware | `tests/setupPolicy.ts:727` | `mkdtempSync(join(tmpdir(), 'orkestrel-policy-'))` | Policy control workspace |
| middleware | `tests/config.test.ts:493` | `mkdtempSync(join(tmpdir(), 'orkestrel-config-outside-'))` | Config isolation |

**Differs:** owned scratch (write/read/link/destroy) vs bare directory vs sync `mkdtemp` without `createScratch`.

### Database fixtures

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/src/server/stores/integration.test.ts:21` | `createTemporaryDirectory` + `createSQLiteDriver({ path: join(…, 'store.sqlite') })` | Real SQLite file |
| middleware | `tests/src/core/stores/DatabaseSessionStore.test.ts:19` | `buildStore()` → `createMemoryDriver()` + table | In-memory driver, no files |

**Differs:** file-backed SQLite vs memory driver. No shared DB fixture helper.

### Abort / signal harnesses

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setup.ts:72` | `waitForAbort(signal)` | Park on `abort` |
| supervisor | `tests/setupServer.ts:641` | `waitForSocketClose(socket)` | Socket `close` |
| supervisor | `tests/app/server/ApplicationHandlers.test.ts:86` | records `request.signal` listener count | Abort listener proof |
| middleware | `tests/setupServer.ts:217` | `buildCancelTrackingMultipartRequest` `{cancelled}` | Stream `cancel()` flag |

**Differs:** AbortSignal vs socket vs ReadableStream cancel.

### Request / middleware chain harness

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| middleware | `tests/setup.ts:29` | `buildRequest(path, init?)` | `http://test.local/` Request |
| middleware | `tests/setup.ts:49` | `createTestContext(request, state)` | `readBody`-backed context |
| middleware | `tests/setup.ts:186` | `runChain(middleware, terminal, request, context)` | `compose` wrapper |

Supervisor: no equivalent (uses full `@orkestrel/server` `createServer`).

### Placement-policy instrument

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setupPolicy.ts:741` | `inspectCodingWorkspace(root, vueScripts?)` | Typechecker + Vue + coding law |
| middleware | `tests/setupPolicy.ts:716` | `inspectPolicyWorkspace(root)` | Syntax placement + test-mirror only |

**Differs:** supervisor returns `string[]` and binds a TS program; middleware returns `PolicyViolation[]`, has `POLICY_CONTROLS` / `inspectPolicyControl`, no Vue/typechecker. Same filename, not the same module.

### Guide-parity corpus walker

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setupGuides.ts:67` | `readGuideWorkspace(root, directories)` | Hand-rolled recursive walk |
| middleware | `tests/guides.test.ts:50` | `readInventory(root, ['src','guides','tests'], { extensions: ['.ts','.md'] })` | Adopted `@orkestrel/test/server` |

**Differs:** supervisor reimplements the walk; middleware imports it. Supervisor also skips selected `main.ts` paths (54).

### Vue-path classifier

| Package | Loc | Quote / signature | Context |
|---|---|---|---|
| supervisor | `tests/setup.ts:57` | `isBrowserVuePath(path)` | Used in `policy.test.ts:18` |
| middleware | `tests/setup.ts:231` | identical body | Exported, unused in this tree |

Same semantics.

---

## 3. Duplication of the existing surface

Existing 13: `waitForDelay`, `captureError`, `requireValue`, `collect`, `collectStream`, `roundTripJSON`, `resolveRoot`, `createRecorder`, `resolveContained`, `matchesIdentity`, `isExcluded`, `readInventory`, `createScratch`.

### supervisor (`/workspace/supervisor/tests`)

**Adopts:** `waitForDelay` (~220 occurrences / ~36 files); `createRecorder` (~15 files, ~50 handler allocations). Does **not** import the other 11.

| Gap | Loc | What it does instead |
|---|---|---|
| `createScratch` | `setupServer.ts:628` `createTemporaryDirectory` | `mkdtemp`+`rm`; path only; ~19 files / ~70 uses |
| `readInventory` | `setupGuides.ts:49–74` `walkGuideDirectory` / `readGuideWorkspace` | Recursive `readdirSync`+`readFileSync` map |
| `resolveRoot` | `setupGuides.ts:7` `GUIDE_ROOT = fileURLToPath(new URL('../', import.meta.url))` | Same parent-of-`tests/` URL |
| `requireValue` | `setupGuides.ts:81` `readGuideText` throws `'Missing file: …'` | Presence-or-throw |
| `collect` | `setupServer.ts:437` `collectProviderObservations`; `setupService.ts:22` `collectServiceInference` | Drain async iterable (service variant also keeps terminal `result`) |
| `collectStream` | `app/setup.ts:260` `NDJSONReader`; `:312` `SSEReader`; `:438` `readSSEUntil` | Drain `ReadableStream` with protocol framing |
| `createRecorder` (partial) | `setup.ts:375` `RecordingStore`; `app/setup.ts:453` `RecordingOutput`; `setupBrowser.ts:1473` `RecordingOperatorStore` | Domain recorders, not the generic callback helper |
| `captureError` / `roundTripJSON` / `resolveContained` / `matchesIdentity` / `isExcluded` | — | No local reimplementation found |

### middleware (`/workspace/middleware/tests`)

**Adopts:** `createScratch` (`setupServer.ts:7` + ~30 test sites); `requireValue` (`guides.test.ts:21`, 2 uses); `readInventory` (`guides.test.ts:22`, 1 use). Does **not** import the other 10.

| Gap | Loc | What it does instead |
|---|---|---|
| `createScratch` (partial) | `setupPolicy.ts:727`; `config.test.ts:493+` | Raw `mkdtempSync` instead of scratch |
| `resolveRoot` | `guides.test.ts:48` `new URL('../', import.meta.url)` | Same root URL passed to `readInventory` |
| `createRecorder` | `setup.ts:113` `createRecordingTerminal`; `:152` `createRecordingNext` | `{calls, count, handler}` without importing |
| `waitForDelay` | `setup.ts:217` `createManualClock` | Advances `now` instead of sleeping |
| `captureError` / `collect` / `collectStream` / `roundTripJSON` / `resolveContained` / `matchesIdentity` / `isExcluded` | — | No local reimplementation found |

### fleet-target 17 clones

No `tests/`. No adoption-gap rows.

---

## 4. Demand counts

Counts are **distinct packages among the 19 trees that have `tests/`** (only supervisor + middleware). Call sites are approximate in-tree uses including helper definitions.

| Cluster | Packages | Call sites (rough) |
|---|---|---|
| Loopback port reservation | 2 (supervisor, middleware) | supervisor `reserveLoopbackPort` 4 files / ~9 refs; 1 inline tarpit; middleware `startServer` 1 test file + definition |
| Fixture HTTP servers | 2 | supervisor 3 `@orkestrel/server` files + 1 raw tarpit; middleware `startServer` ~1 live call besides setup |
| Child-process spawn/wait/stop | 1 (supervisor) | `startApplicationProcess` ~8 refs / 4 files; `runProviderFixture` / `startProviderFixture` ~20 refs in provider tests; `spawnSync` readiness 1 |
| Environment builders | 1 (supervisor) | `createApplicationEnvironment` ~55 refs / 8 files |
| Poll-until / deadline | 2 | supervisor: `waitForApplicationResponse` 4 files; `waitForRecorder` 1; `retryUntil` 1; several inline loops; middleware: `createManualClock` ~12 in `middlewares.test.ts` |
| Stream / event capture | 2 | supervisor: `waitForEvent` 7 in one file; `collectProviderObservations` 5; SSE/NDJSON ~16 refs; middleware: `createRecordingTerminal`/`Next` ~11 + `runChain` ~136 |
| Fixture CLI backends | 1 (supervisor) | ~40 refs across provider/CLI tests |
| Temp resources | 2 | supervisor `createTemporaryDirectory` ~70 across 19 files; middleware `createScratch` ~35; extra `mkdtempSync` ~5 |
| Database fixtures | 2 | supervisor SQLite integration 1 large file (many temp dirs); middleware `buildStore` ~10 in one file |
| Abort/signal | 2 | supervisor `waitForAbort` ~11; `waitForSocketClose` ~3; middleware cancel-tracking multipart ~1–few |
| Request/chain harness | 1 (middleware) | `buildRequest` ~260; `createTestContext` ~190; `runChain` ~136; `createEchoTerminal` ~95 |
| Placement-policy | 2 | each `policy.test.ts` ~17–21 inspector refs |
| Guide corpus walker | 2 | supervisor `setupGuides` consumed by `guides/src/parity.test.ts`; middleware 1 `readInventory` call |
| Vue-path classifier | 2 | supervisor 1 assertion; middleware 0 uses |
| `waitForDelay` (existing) | 1 (supervisor) | ~220 |
| `createRecorder` (existing) | 1 (supervisor) | ~50 |

Fleet-target clones: 0 members in every cluster.

---

## 5. Singles worth naming

Helpers in **one** of the two `tests/`-bearing trees whose behavior is host/test mechanism, not product policy:

| Helper | Tree | Loc | Evidence |
|---|---|---|---|
| `reserveLoopbackPort` | supervisor | `setupApplicationServer.ts:65` | OS ephemeral TCP probe; no supervisor types |
| `waitForAbort` | supervisor | `setup.ts:72` | Generic `AbortSignal` park |
| `waitForEvent` | supervisor | `setup.ts:49` | Generic emitter `once` (typed over `@orkestrel/emitter`) |
| `waitForSocketClose` | supervisor | `setupServer.ts:641` | Generic `net.Socket` close |
| `retryUntil` | supervisor | `setupService.ts:206` | Bounded produce/predicate loop |
| `hasProcess` | supervisor | `setupServer.ts:420` | PID liveness (`kill(0)` + `/proc`) |
| `createTemporaryDirectory` | supervisor | `setupServer.ts:628` | Generic temp dir (overlaps `createScratch`) |
| `startServer` | middleware | `setupServer.ts:387` | Generic loopback HTTP fixture |
| `createManualClock` | middleware | `setup.ts:217` | Injectable `() => number` clock |
| `buildRequest` / `createTestContext` / `runChain` | middleware | `setup.ts:29–186` | Generic Request + `compose` driver |
| `createRecordingTerminal` / `createRecordingNext` | middleware | `setup.ts:113, 152` | Generic call recorder for HTTP `next`/terminal |
| `buildMultipartBody` / `buildCancelTrackingMultipartRequest` | middleware | `setupServer.ts:217, 280` | Wire-format multipart + cancel observation |
| `ApplicationCookieJar` | supervisor | `setupApplicationServer.ts:11` | Generic `Set-Cookie` jar |
| `NDJSONReader` / `SSEReader` | supervisor | `app/setup.ts:260, 312` | Generic framed-stream readers (SSE is protocol, still not supervisor policy) |

Product-bound (not listed as general): `createLease` / `InertExecutor` / `ScriptedClient` / `createApplicationEnvironment` / `ProtocolFixtureProvider` / live Ollama/CLI readiness / Playwright journey / portfolio capture / `inspectCoding*` coding-law details.

---

**Unknowns:**

- The 17 fleet-target clones have no `tests/`; any helpers in their unpublished source are unreadable from these trees. Live middleware is one version ahead of its clone (`0.0.12` vs `0.0.11`).
- Remaining fleet packages (outside these 19 trees) unread, including this scaffold checkout.
- `captureError`, `roundTripJSON`, `collect`, `collectStream`, `resolveContained`, `matchesIdentity`, `isExcluded` have no in-tree uses in either live `tests/` (so “no reimplementation” is also “no adoption”).
- `isBrowserVuePath` in middleware is exported and unused; whether other packages’ unpublished tests still share it is unknown.
- Call-site totals include imports and definitions where the identifier appears; they are order-of-magnitude, not exact unique invocations.
- Confirming `@orkestrel/test` 0.0.3 used published `dist/*.d.ts` because that clone has no `tests/`.
