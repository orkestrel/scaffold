# Absorb — fleet-alignment breakage map (`@orkestrel/supervisor`)

**Versions today (installed):** workflow `0.0.10`, mcp `0.0.12`, guide `0.0.8`, agent `0.0.13`, middleware `0.0.9`, contract `0.0.9`, server `0.0.10`, tool `0.0.9`, budget `0.0.5`, emitter `0.0.5`, sse `0.0.4`, terminal `0.0.5`, router `0.0.8`, sea `0.0.5`, ollama `0.0.8`, scaffold `0.0.21`, database `0.0.7`.

**Target trees present under fleet-target:** workflow `0.0.12`, mcp `0.0.15`, guide `0.0.11`, agent `0.0.15`, middleware `0.0.11`, contract `0.0.11`, server `0.0.12`, tool `0.0.10`, database `0.0.9`, test `0.0.3`.  
**Absent from fleet-target (no declaration diff possible):** budget, emitter, sse, terminal, router, sea, ollama, scaffold.

---

## workflow `0.0.10` → `0.0.12`

**Consumed (representative):** `failure`/`success`, `WorkflowSnapshot`/`PhaseSnapshot`/`TaskSnapshot`/`LifecycleStatus`, `createMemoryWorkflowStore`/`DatabaseWorkflowStore`/`definitionToSnapshot`/`createWorkflow`/`createWorkflowRunner`/`isWorkflowSnapshot`/`isLifecycleStatus`/`isTerminalStatus`/`WORKFLOW_STATUSES`/`isTaskActivityInput`/`isTaskFailure`/`WorkflowFunction`/`WorkflowDefinition`/`WorkflowStatus`/`WorkflowStoreInterface`/`WorkflowInterface` — many sites under `src/`, `app/`, `tests/` (e.g. `src/core/helpers.ts:9-32`, `app/server/SupervisorApplication.ts:29`, `tests/setup.ts:22-31`).

**Broken**
| Symbol | Sites | Target replacement |
|--------|-------|--------------------|
| `recoverWorkflow` | `tests/src/core/Run.test.ts:18,660,807`; `tests/src/server/integration.test.ts:18,234,511` | `createRecoveredWorkflow(snapshot, options?)` — `fleet-target/workflow/.../index.d.ts:333` |

Also removed from the public surface (not imported by supervisor code): `restoreWorkflow` → `createRestoredWorkflow` (`:367`); `assertSnapshot` gone. `recoverWorkflowSnapshot` remains (`:1732`).

**Severity:** compile (tests).

---

## mcp `0.0.12` → `0.0.15`

**Consumed:** `JSONRPCRequest`/`JSONRPCResponse`/`MCPDispatchOptions`/`MCPStream`/`buildJSONRPCResult`/`MCPServer`/`MCPServerInterface`/`createMCPRoutes`/`MCP_META_*`/`MCP_MODERN_VERSION`/`MCP_PROTOCOL_VERSION_HEADER`/`MCP_METHOD_HEADER`/`MCP_NAME_HEADER` — `app/server/MCPProjection.ts:14-15,39,68,156-209`; `app/server/helpers.ts:11,324-329`; `app/server/ApplicationRoutes.ts:2-4,123`; `app/server/factories.ts:20,46`; `tests/app/setup.ts:22-32,371-401`; `tests/app/server/MCPProjection.test.ts:24`.

**Exact JSON-RPC shape change (known break)**

Current (`mcp 0.0.12`):
```947:954:node_modules/@orkestrel/mcp/dist/src/core/index.d.ts
export declare interface JSONRPCRequest {
    readonly jsonrpc: '2.0';
    readonly method: string;
    readonly id?: string | number;
    readonly params?: Readonly<Record<string, unknown>>;
}
```
Notifications were id-less `JSONRPCRequest`s. `JSONRPCResponse` was one interface with optional `result`/`error` and `id: string | number | null`.

Target (`mcp 0.0.15`):
- `JSONRPCId = string | number` (no `null`)
- `JSONRPCRequest`: **`id: JSONRPCId` required**
- `JSONRPCNotification`: `id?: never` (notifications are a distinct type)
- `JSONRPCInvocation = JSONRPCRequest | JSONRPCNotification`
- `JSONRPCResponse = JSONRPCResultResponse | JSONRPCErrorResponse`
- `JSONRPCResultResponse`: `id: JSONRPCId`, `result: MCPResult | MCPLegacyResult`
- `JSONRPCErrorResponse`: `id?: JSONRPCId`, `error: JSONRPCError` (`JSONRPCErrorData` renamed to `JSONRPCError`)

**Broken / forced migrations**
| Break | Evidence | Replacement / fix shape |
|-------|----------|-------------------------|
| `liveFrameToMCPNotification` typed as `JSONRPCRequest` without `id` | `app/server/helpers.ts:324-329` | Return `JSONRPCNotification` |
| `MCPStream` yield was `JSONRPCRequest`; now `AsyncGenerator<JSONRPCNotification, JSONRPCResponse, unknown>` | `MCPProjection.ts:190` yields that helper; target `MCPStream` at `:3733` | Yield `JSONRPCNotification` |
| `buildJSONRPCResult(id, result)` — `id` was `string \| number \| null`; now `JSONRPCId` only; `result` must be `MCPResult \| MCPLegacyResult` | `MCPProjection.ts:196-208` uses `request.id ?? null` and `{ state: 'closed' \| 'refused', ... }` | Drop `null`; result must satisfy modern `resultType` or legacy open object |
| `MCPMethodHandler` options: `MCPDispatchOptions` (optional `signal`) → `MCPMethodOptions` (**required** `signal`) | `MCPProjection.ts:156-184` typed with `MCPDispatchOptions` | Use `MCPMethodOptions` for method handlers (`:2920`, `:3004-3008`) |
| `createMCPRoutes` arg: `MCPServerInterface` → `MCPDispatcherInterface` | `ApplicationRoutes.ts:123` | Still OK if projection is `MCPServer` (`MCPServerInterface extends MCPDispatcherInterface`), but type imports may need `MCPDispatcherInterface` |

`createModernMCPRequest` already supplies `id` (`tests/app/setup.ts:371-383`) — likely fine.

**Severity:** compile (app + tests).

---

## guide `0.0.8` → `0.0.11`

**Consumed:** `createGuide`, `createSource`, `fenceImports`, `findMissing`, `findUnexampled`, `isExternalLink`, `missingSymbols`, `resolveLink`, `symbolKey`, `parseManifest` — `tests/guides/src/parity.test.ts:5-15,69-92`; `tests/setupGuides.ts:4`.

**Broken**
| Symbol | Sites | Replacement |
|--------|-------|-------------|
| `GuideInterface.patterns(): readonly string[]` | `parity.test.ts:69,81,92` | `fences(): readonly GuideFence[]` (`GuideFence = { language?: string; code: string }`) at target `:472-521` |
| `extractPatterns` (module helper) | not imported by supervisor | Removed; use `extractFences` / `guide.fences()` |
| `moduleDirs` / `moduleKeys` | not imported | Renamed to `normalizeDirectories` / `selectModuleKeys` |

`findUnexampled(names, fences: readonly string[], …)` still wants **string** fence bodies (`:412`) — after migration, pass `guide.fences().map(f => f.code)` (or equivalent), not raw `GuideFence` objects. `fenceImports(fence: string)` likewise needs `.code`.

Other parity APIs used (`surface`, `methods`, `links`, `tests`, `createSource`, `parseManifest`) remain.

**Severity:** compile (guides tests).

---

## agent `0.0.13` → `0.0.15`

**Consumed:** `MessageInput`, `ProviderStreamOptions`, `ProviderAbortError`, `isProviderAbortError`, `ProviderInterface`, `MessageInterface`, `AgentChunk`, `createAgent`, `agentResultToJSON`, `AgentInterface`, `AgentStreamInterface`, `ProviderDelta`, `ProviderResult` — e.g. `app/core/parsers.ts:12`, `app/core/helpers.ts:3`, `app/server/AgentExecutor.ts:2`, `app/server/AgentExecution.ts:2`, `tests/app/setup.ts:6`.

**Declaration export names for those symbols:** present in both current and target index.d.ts lists.  
**no consumed symbol moved** (transitive deps bump: target agent wants `budget ^0.0.6`, `emitter ^0.0.6`, `contract ^0.0.11`, `database ^0.0.8`, `tool ^0.0.10`, `workflow ^0.0.11`).

**Severity:** none (symbols); peer/transitive raise pressure behavioral for install.

---

## middleware `0.0.9` → `0.0.11`

**Consumed:** `createBody`, `only`, `equalsConstantTime`, `createDatabaseSessionStore`, `isSession`, `sessionColumns`, `Session`, `createMemorySessionStore`, `SessionInterface`/`SessionStoreInterface`, `createStatic`, `createCSRF`, `createCookieTransport`/`createHeaderTransport`/`createSession`/`createBearer`/`createLimiter`/`createSecurity`/`createForwarded`/`createCompression`/`createBoundary`/`except`, `ClientInfo`, `SessionControlInterface` — e.g. `app/server/ApplicationServer.ts:7-16`, `app/server/ApplicationPersistence.ts:4`, `tests/app/server/middlewares.test.ts:32`.

**Core export names for those:** match between current and target. **no consumed symbol moved.**

**Published `peerDependencies` (middleware `0.0.11`):**
```json
"@orkestrel/database": "^0.0.8",
"@orkestrel/server": "^0.0.12"
```
`peerDependenciesMeta`: `@orkestrel/database` `{ "optional": true }`.

**Database peer conflict (precise):** supervisor today pins/installs `@orkestrel/database` `^0.0.7` / `0.0.7`. Middleware `0.0.11` requires `^0.0.8`. Fleet-target database is `0.0.9`. Keeping database at `0.0.7` while raising middleware fails the `^0.0.8` peer range (optional peer → warn/conflict at install, not a soft no-op). Server peer `^0.0.12` also forces the server raise in lockstep.

**Severity:** none for symbols; **compile/install** for peer resolution if database stays `<0.0.8`.

---

## contract `0.0.9` → `0.0.11`

**Consumed:** guards/shapes/`Result`/`Fault`/`JSONRecord`/`JSONValue`/`GUARD_DEPTH_LIMIT`/`holds`/`parseJSONAs`/`createContract`/`schemaToShape`/`attempt`/`cloneSchema`/etc. — widespread under `src/`, `app/`, `tests/`.

**Removed among consumed names:** none found (`parseJSONAs`, `schemaToShape`, `attempt`, `recordOf`, `literalOf`, `cloneSchema` all still exported).

**Shape change on consumed type:** `Result<T, E = Error>` → `Result<T, E = unknown>` (current `:3424` vs target `:5212`). Sites that rely on the default `E` may see type churn without an import rename.

**Severity:** none for removals; possible **compile** from default-type-param change (narrow).

---

## server `0.0.10` → `0.0.12`

**Consumed:** `createServer`, `ServerInterface`, `clearCookie`, `openStream`, `StreamInterface`, `writeSignedCookie`, `ConnectionInfo`, `ServerStatus`, `MiddlewareHandler` — e.g. `app/server/ApplicationHandlers.ts:36`, `app/server/ApplicationServer.ts:17`, `app/server/types.ts:38`.

**no consumed symbol moved** (export names align).

**Severity:** none.

---

## tool `0.0.9` → `0.0.10`

**Consumed:** `isToolCall` (`app/core/parsers.ts:34`), `createTool`/`createToolManager` (`app/server/MCPProjection.ts:16`), `ToolDefinition` (`app/server/providers/CLIProvider.ts:10`).

**no consumed symbol moved.**

**Severity:** none.

---

## budget `0.0.5` → latest

**Target tree:** absent from fleet-target.  
**Consumed:** `TokenUsage` — `app/server/types.ts:28`, `app/server/parsers.ts:7`, `app/server/providers/CLIProvider.ts:9`.  
**Evidence gap:** cannot confirm symbol stability. Target agent/middleware depend on `budget ^0.0.6`, so “latest” is at least `0.0.6`.

**Severity:** unknown (no target decls) — treat as **none observed** pending tree.

---

## emitter `0.0.5` → latest

**Target tree:** absent.  
**Consumed:** `Emitter`, `EmitterInterface`, `EmitterHooks`, `EmitterErrorHandler`, `EventMap` — `src/core/Supervisor.ts:1,14`, `src/core/types.ts:2`, `tests/setup.ts:21`, etc.  
Target agent depends on `emitter ^0.0.6`.

**Severity:** unknown / none observed pending tree.

---

## sse `0.0.4` → latest

**Target tree:** absent.  
**Consumed:** `createSSEParser` — `app/browser/services/LiveStream.ts:3`, `tests/app/browser/services/LiveStream.test.ts:3`, `tests/app/browser/integration/setup.ts:16`.

**Severity:** unknown / none observed pending tree.

---

## terminal `0.0.5` → latest

**Target tree:** absent.  
**Consumed:** `PendingPrompt`, `PromptType`, `PromptValue`, `createPrompt`, `isPromptType`, `isPendingPrompt`, `OutputStreamInterface` (`@orkestrel/terminal/server`) — `app/core/parsers.ts:24`, `app/server/HumanPrompt.ts:7-9`, `app/server/validators.ts:2,5`, etc.

**Severity:** unknown / none observed pending tree.

---

## router `0.0.8` → latest

**Target tree:** absent.  
**Consumed:** `createDispatcher`, `DispatcherInterface`, `RouteContext` — `app/server/ApplicationRoutes.ts:3`, `app/server/ApplicationHandlers.ts:8`, `app/server/ApplicationRosterHandlers.ts:7`, `app/server/ApplicationUnitHandlers.ts:2`, `app/server/helpers.ts:12`, `tests/app/server/MCPProjection.test.ts:25`.

**Severity:** unknown / none observed pending tree.

---

## sea `0.0.5` → latest

**Target tree:** absent.  
**Consumed:** `createSEA`, `isCompressible`, `walkDirectory`, `openBrowser` — `scripts/sea.ts:1`, `app/server/middlewares.ts:13`, `app/server/ApplicationServerRunner.ts:12`.  
(Note: `scripts/` is outside the brief’s `{src,app,tests,configs}` sweep, but it is live sea consumption.)

**Severity:** unknown / none observed pending tree.

---

## ollama `0.0.8` → latest

**Target tree:** absent.  
**Consumed:** `createOllama` — `app/server/ApplicationRuntime.ts:20`, `tests/service/ollama/AgentExecutor.test.ts:2`.

**Severity:** unknown / none observed pending tree.

---

## scaffold `0.0.21` → `0.0.37` (devDep)

**Target tree:** absent.  
**Consumed symbols in TS:** none — only CLI via `"scaffold": "scaffold"` in `package.json:50`. No import-surface break in `{src,app,tests,configs}`.

**Severity:** none (tooling/CLI only; unverified against 0.0.37).

---

## Adoption candidates — `@orkestrel/test` `0.0.3` (NEW)

| test helper | Target export | Supervisor hand-roll | Overlap |
|-------------|---------------|----------------------|---------|
| `createRecorder` | `test/.../core/index.d.ts:33` → `RecorderInterface` | `tests/setup.ts:54-85` (`TestRecorderInterface` + `createRecorder`) | **Yes** — same API shape (`calls`, `count`, `handler`, `clear`) |
| `waitForDelay` | `core/index.d.ts:126` | `tests/setup.ts:102-104` | **Yes** — identical `ms?: number` → `Promise<void>` |
| `createScratch` | `test/.../server/index.d.ts:11` → sync `ScratchInterface` | `tests/setupServer.ts:628-637` `createTemporaryDirectory` (async `mkdtemp`/`rm`, destroy-only) | **Partial** — same job (owned temp dir), different API (sync scratch + write/read/link vs async path+destroy) |

Also exported by `@orkestrel/test` but not hand-rolled under the same names: `captureError`, `collect`, `collectStream`, `requireValue`, `resolveRoot`, `roundTripJSON`, `readInventory`.

---

## Closing table

| package | break count | severity |
|---------|-------------|----------|
| workflow | 1 (`recoverWorkflow`) | compile |
| mcp | 4+ (JSONRPC split, notification type, `buildJSONRPCResult`, method options/`MCPStream`) | compile |
| guide | 1 (`patterns`→`fences`; + fence string adaptation) | compile |
| agent | 0 | none |
| middleware | 0 symbols; 1 peer conflict (`database ^0.0.8` vs installed `0.0.7`; also `server ^0.0.12`) | compile (install/peers) |
| contract | 0 removals; 1 default-param shift (`Result` `E`) | compile (possible) / none if always explicit `E` |
| server | 0 | none |
| tool | 0 | none |
| budget | 0 observed | none (target tree missing) |
| emitter | 0 observed | none (target tree missing) |
| sse | 0 observed | none (target tree missing) |
| terminal | 0 observed | none (target tree missing) |
| router | 0 observed | none (target tree missing) |
| sea | 0 observed | none (target tree missing) |
| ollama | 0 observed | none (target tree missing) |
| scaffold | 0 | none |
| test (new) | n/a | adoption only |
=== absorb exit 0 ===
