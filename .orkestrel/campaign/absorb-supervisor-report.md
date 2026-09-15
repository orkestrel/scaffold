<!-- journal: tmp/cursor/absorb-supervisor.jsonl -->
<!-- session_id: 8c7000d1-326a-45a6-94c1-5fb4ab7eae51 -->
<!-- model: Cursor Grok 4.6 High; duration_ms: 276186; is_error: false; events: 971 -->
I'll read the brief first and follow it exactly.I'll gather the named files and contracts first, then trace the relay, auth, and import graph.Next I’ll read the provider classes, executors, backends, and the agent contract they sit on.I’ll trace the browser-to-server run path and the auth/token hops next.Checking a few remaining hop shapes so the relay table can cite exact request/response types.Question: In supervisor, what do the provider classes share in shape and lifecycle, what is the exact browser → server → backend call path for a run, where do authentication and tokens enter that path, and which parts of that machinery are generic relay mechanics versus supervisor product policy?

Evidence:

1. Published provider contract

`supervisor/src/server/types.ts` (provider author implements `ProviderInterface`; runtime owns execution/executor options and the live handle):

- `ProviderInput` `42:48` — members `unit`, `token`, `payload`, `workspace`. First sentence: "The durable unit input translated into one provider command."
- `ProviderMessage` `51:56` — `command`, `text`, `request?`. First sentence: "A provider live-channel command."
- `ProviderExecutionInput` `59:67` — `workspace`, `grace`, `token`, `writable`, `signal?`, `transcript?`, `release`. First sentence: "Construction input for one executor-owned provider process."
- `ProviderExecutionInterface` `70:100` extends `ExecutionInterface` with `send`, `stop`, `destroy`. First sentence: "A live provider process with framed execution channels and bounded local control." Runtime implements this (`ProviderExecution`).
- `ProviderOptions` `103:108` — `model?`, `client?`. First sentence: "Optional immutable configuration shared by the shipped provider adapters."
- `ProviderInterface` `111:178` — `name`, `launch`, `attach?`, `probe?`, `answer?`, `observe`, `settle`, `encode?`. First sentence: "Stateless command and frame translation for one external provider protocol." Provider author implements this.
- `ProviderExecutorOptions` `189:195` — `name?`, `workspace`, `grace?`, `timeout?`, `transcript?`. First sentence: "Options for a provider-backed process executor." Runtime consumes this.

`supervisor/src/core/types.ts` (runtime-owned; a provider author does not implement these):

- `RunningUnit` `78:80` — "A launched unit with no durable terminal external outcome."
- `RunSnapshot` `107:110` — `lease`, `units`. "The complete durable record for one workflow id."
- `RunRecord` `120:129` — `id`, `created`, `updated`, `released?`. "One catalog entry for a supervised run."
- `RunCursor` `141:145` — `until`, `updated`, `id`. "The continuation boundary for one run-catalog traversal."
- `RunListOptions` `156:162` — `cursor?`, `limit?`, `prefix?`, `runs?`, `released?`. "Optional filters and continuation state for a run-catalog page."
- `RunPage` `175:178` — `runs`, `cursor?`. "One owned immutable run-catalog page."
- `ExecutionInterface` `285:298` — `identity`, `events`, `result`, `destroy`. "A read handle for a live external effect an executor launched or reattached to."
- `ExecutionResult` `301` — `Result<JSONValue, TaskFailure>`. "A workflow-compatible, JSON-safe external execution outcome."
- `ExecutionInput` `304:309` — `unit`, `token`, `payload`, `signal`. "The durable, fenced input supplied to an executor launch."
- `ExecutionContext` `318:321` — `token`, `identity?`. "The token and optional native identity used to address one external unit."
- `ExecutorInterface` `324:380` — `name`, `launch`, `attach?`, `probe?`, `stop?`, `steer?`, `reply?`. "One capability-detected way of causing external work."
- `ExecutorManagerInterface` `483:512` — `count`, `add`, `remove`, `executor`, `executors`. "The registry of executors keyed by their own names."
- `RunManagerInterface` `515:530` — `count`, `run`, `runs`. "Read access to the runs held by a supervisor."
- `RunInterface` `541:572` — `id`, `lease`, `units`, `launch`, `reconcile`, `inspect`, `destroy`. "One supervised workflow id under a held lease."
- `ExecutorOptions` `843:845` — `name?`. "Function executor options."
- `ExecutionOptions` `853:855` — `signal?`. "Execution attachment options."
- `ExecutionFunction` `863` — `(input: ExecutionInput) => Promise<JSONValue> | JSONValue`. "A plain in-process execution function."

No type/interface in those two files has `Backend` or `Lane` in its name. `Lane` is a class at `src/core/Lane.ts:20`. App-layer `CLIBackend*` lives in `app/server/types.ts:59:94`, not the published src types.

2. Provider classes

ClaudeProvider (`src/server/providers/ClaudeProvider.ts`) implements published `ProviderInterface`. Public: `constructor` `30:32`, `name` `34:36`, `launch` `44:56`, `attach` `64:82`, `probe` `90:96`, `answer` `110:124`, `observe` `132:155`, `settle` `163:174`. `#` fields: `#model` `23`. Private `#activity` `176:205`. Options: `ProviderOptions` (`model?`). Backend-specific: CLI file/flags (`claude`, `-p`, `--model`, `--output-format stream-json`, `--verbose`, `--resume`, `agents --json --all`); journal frames `system/init.session_id`, `assistant`, `result`, `error`/`warning`. Generic: `Object.freeze` command objects, `formatProviderNote`/`validateProviderModel`, `success`/`failure` assembly. No `encode`.

CodexProvider (`CodexProvider.ts`) same published contract. Public: `constructor` `33:42`, `name` `44:46`, `launch` `54:67`, `attach` `75:92`, `probe` `100:119`, `answer` `133:148`, `observe` `156:192`, `settle` `204:225`. `#` fields: `#model` `25`, `#client` `26`. Private `#activity` `227:257`. Options: `ProviderOptions` (`model?`, `client?`). Backend-specific: `codex exec --json --skip-git-repo-check -C`, `--model`, `exec resume`, `app-server` JSON-RPC `initialize`/`thread/read`; frames `thread.started`, `item.started|completed`, `turn.completed|failed`, `error`. Generic: same freeze/note/result pattern. No `encode`.

CursorProvider (`CursorProvider.ts`) published contract, fail-closed (no `attach`/`probe`/`answer`/`encode`). Public: `constructor` `25:27`, `name` `29:31`, `launch` `44:56`, `observe` `64:88`, `settle` `96:116`. `#` fields: `#model` `18`. Private `#activity` `118:134`, `#tool` `136:151`. Backend-specific: file `agent`, `-p`, `--model`, `--output-format stream-json`, `--trust` (never `--force`); frames `system.session_id`, `assistant`, `tool`, `result`, `error`/`warning`. Generic: freeze/note/JSON-bounds settlement.

CLIProvider (`app/server/providers/CLIProvider.ts`) implements **agent** `ProviderInterface`, not the published supervisor one. Public: `id` `42`, `name` `43`, `constructor` `56:83`, `generate` `94:105`, `stream` `122:286`. `#` fields: `#backend` `44`, `#model` `45`, `#directory` `46`, `#timeout` `47`, `#grace` `48`, `#environment` `49`. Options: `CLIProviderOptions` (`backend` required; `model?`, `directory?`, `timeout?`, `grace?`, `environment?`). Private `#validate` `288:300`, `#unsupported` `302:307`, `#result` `309:311`. Backend-specific: `this.#backend.build`/`parse` `159:215`, `file` `162`, stdin prompt `165`. Generic: `mkdtemp`/`rm`, `new Process`, `child.lines` loop, abort listener `191:198`, `setTimeout` `187:190`, `ProviderAbortError`, `InferenceError` mapping, result assembly. Product refusals: tools/schema/tool-role/calls/images `#validate` `293:299`.

| Members | Who |
| --- | --- |
| `name`, `#model`, constructor options with optional `model` | all four |
| published `launch`/`observe`/`settle` | Claude, Codex, Cursor |
| `attach`/`probe`/`answer` | Claude, Codex only |
| `#client` / App Server probe identity | Codex only |
| `#tool` | Cursor only |
| `encode` | none of the four |
| agent `id`/`generate`/`stream`, `#backend`/`#timeout`/`#grace`/`#environment`/`#directory` | CLIProvider only |

3. Backends and executors

CLI backends (`app/server/backends/`): each implements `CLIBackendInterface` (`app/server/types.ts:77:94`) with `file`, `name`, `build`, `parse`. Chosen by `ApplicationRuntime` `99:118`: default `[ClaudeCLIBackend, CodexCLIBackend, CursorCLIBackend]`, then `policy.inference` vendors keyed into `CLIProvider`. Claude `build` `30:39` (`-p`, `--tools ''`); Codex `28:37` (`exec --json -s read-only -`); Cursor `29:38` (`-p --trust --mode ask`, no `--force`).

`ProviderExecutor` `src/server/executors/ProviderExecutor.ts:33`: wraps one published `ProviderInterface`; `launch` `117:143` translates then `#spawn` `145:166`. Capability-mirrors `attach`/`probe`/`steer`/`reply` only if the adapter has `attach` / `probe+answer` / `encode` `97:104`.

`ProviderExecution` `ProviderExecution.ts:18`: owns `Process`, JSON Lines framing `#frame` `165:187`, `observe`+`settle` per frame `177:183`.

`WorkspaceProviderExecutor` `app/server/WorkspaceProviderExecutor.ts:22`: per-workflow workspace; construction seam `#executor` `135:149` calls `createProviderExecutor(this.#options.provider(), { workspace, transcript })`.

`AgentExecutor` `app/server/AgentExecutor.ts:16`: `createAgent(this.#provider)` `43`; `AgentExecution` `app/server/AgentExecution.ts:6` projects agent stream → `Observation`.

Executor → run: `SupervisorApplication.start` `122:165` maps each executor through `createWorkflowFunction` `src/core/factories.ts:98:158`. That function `run.launch` `120:130`, then `for await (const observation of execution.events) { unit.observe(observation) }` `142:144`. Journal seam: `Unit.#observe` `src/core/Unit.ts:232:248` → `journal.append` `239` → emitter `observe` `248`. LiveBroker `app/server/LiveBroker.ts:111:116` listens and `#record` `135:147` `publish(buildObserveFrame(...))`. Transcript seam: `WorkflowTranscript.write` `app/server/WorkflowTranscript.ts:11:14` → broker `source: 'transcript'`.

Provider construction at runtime: `ApplicationRuntime` `169:186` `new WorkspaceProviderExecutor({ provider: createClaudeProvider|createCodexProvider|createCursorProvider, transcript })`; factories `src/server/factories.ts:20:24`, `38:39`.

4. The relay path

Shared declared contracts (browser does not import `app/server`): `@app/core` types/constants (`ApplicationWorkflowInput` `144:147`, `ApplicationSnapshot` `136:141`, `ApplicationTail` `289:294`, `LiveFrame` `360`, `ApplicationSession` `219:227`, `ApplicationSessionInput` `230:233`, `ApplicationCommandStatus` `150`, `InferenceRequest` `44:48`, `InferenceFrame` `51:59`, paths `app/core/constants.ts:80:140`, `APP_CSRF_HEADER` `161`); `@orkestrel/workflow` `WorkflowSnapshot`; browser re-guards in `app/browser/validators.ts`.

`handlers.ts` is not a request hop: `startApplicationServer` `app/server/handlers.ts:19:24`.

Hop table (workflow run + live + optional inference):

| Hop | Route/method | Request / response (`app/core/types.ts` unless noted) | Transport | Abort |
| --- | --- | --- | --- | --- |
| `Client.start` `114:117` | `POST` `APP_WORKFLOW_PATH` `/workflows` `113` | body `ApplicationWorkflowInput` `144:147` → `WorkflowSnapshot` | `fetch` `Client.ts:211:217` `credentials: 'same-origin'` + CSRF `192:193` | none on start |
| `Operator` `63:345` | uses decorated `client`; after start, `open` inspect/tail/watch | `ApplicationSnapshot` `136`; `ApplicationTail` `289`; `LiveFrame` `360` | fetch JSON; watch via `LiveStream` | `#invalidate` aborts `#controller` `637:644` |
| `Client.watch` `143:150` | `GET` `/workflows/:workflow/live` `128` | `AsyncIterable<LiveFrame>` | fetch SSE `accept: text/event-stream` `LiveStream.ts:32:48`; parse `createSSEParser` `@orkestrel/sse` `86` | `signal` on fetch `48`; abort returns `119:125` |
| `ClientUnitManager` `20:49` | `POST` unit stop/steer/reply paths `133:140` | `{ message }` / `PromptAnswer` `423` → `{ status }` | fetch JSON | none |
| `ApplicationServer.#create` `181:245` | `createServer` `@orkestrel/server` + `createDispatcher` `@orkestrel/router` | `ApplicationState` `app/server/types.ts:190:202` | HTTP | `server.start(signal)` `136` |
| middleware `232:239` | assets → session (`createSession` `@orkestrel/middleware`) → `createApplicationAccess` → limiter → CSRF (`createCSRF` `@orkestrel/middleware`) → `createBody` | cookie `APP_SESSION_COOKIE` `app/server/constants.ts:60`; CSRF cookie `62` | — | — |
| `ApplicationRoutes` `102:155` | binds handlers | — | — | — |
| `ApplicationHandlers.start` `247:260` | `POST /workflows` | body → `parseApplicationWorkflow`; 202 `WorkflowSnapshot` | JSON | — |
| `SupervisorApplication.start` `122:165` | in-process | `ApplicationWorkflowInput` → `createWorkflow`/`createWorkflowRunner` `@orkestrel/workflow` | none | `controller.signal` into `run.launch` `factories.ts:129` |
| `ApplicationHandlers.live` `331:343` | `GET .../live` | `openStream` `@orkestrel/server` SSE; `#pump` writes `packet.text` `393:413` | SSE | `request.signal` → `viewer.destroy` `399:411` |
| `LiveBroker.watch` `75:84` → `LiveViewer` → `Relay` | in-process | `Packet<LiveFrame>` `382:389` | parked async iterable, not a wire | `Relay.destroy` `72:77` |
| `ApplicationHandlers.inference` `223:244` | `POST` `APP_INFERENCE_PATH` `/inference/:vendor` `51` | `InferenceRequest` `44:48`; unary JSON `ProviderResult` or `InferenceStream` NDJSON `InferenceFrame` `51:59` | fetch JSON or rolled NDJSON (`content-type: application/x-ndjson` `InferenceStream.ts:41`; **no** `@orkestrel/ndjson` import under `src/`/`app/`) | `request.signal` → `#controller.abort` `91:93` → CLI `child.stop` |
| backend | `CLIProvider.stream` or `ProviderExecutor.launch` → vendor CLI | `Process` `@orkestrel/process/server` | child stdout JSON Lines | process-tree `stop` |

No `@orkestrel/websocket` hop on this path.

5. Authentication and tokens

- `createApplicationAccess` `middlewares.ts:115:163`: refuses bearer+session together `123:127`; bearer via `authenticateApplicationState` `131:136`; session matches `user`+verifier stamp `143:161`. Secret compared is stored verifier, not plaintext.
- `authenticateApplicationState` `helpers.ts:853:863` + `parseBearerToken` `app/core/parsers.ts:666:669`: `Authorization: Bearer …` mapped to `Principal.token` `app/core/types.ts:62:65`. Stored in `APP_PRINCIPALS` policy / `ApplicationSetup.#principals`.
- Login `ApplicationHandlers.login` `126:160`: `ApplicationSessionInput` `{ name, secret }` `230:233`; scrypt `matchesApplicationSecret`; writes session `APP_SESSION_USER_KEY`/`APP_SESSION_STAMP_KEY` `152:154`; 204 empty body. Failed login `control.destroy` `147`.
- GET session `115:124` / `#session` `434:448`: returns `ApplicationSession` `{ user, workflows, csrf, provisional?, confined? }` — no password, no bearer, no provider key.
- CSRF `createApplicationCSRF` `177:203`: session-only; MCP session POSTs refused (`MCP requires bearer authentication` `190`).
- `ApplicationUserHandlers` `26:127`: manager session + wildcard; generated password returned once as `ApplicationSecret` `130:133`.
- `ApplicationLease` `35:88`: workspace SQLite exclusive lock + `lease.json` owner/pid — not a login credential.
- `ApplicationSetup` `47:118`: `.supervisor.local` / `APP_USERS` / `APP_SETUP`; compiles plaintext to verifier `createApplicationVerifier` `factories.ts:55:71`; mints bearer `createApplicationToken` `345:350`.
- `LoginPanel.vue` `6:79`: Vue refs `name`/`secret`; submits `operator.login({ name, secret })`; does not persist the password.
- Browser stores `MemoryOperatorStore.ts` / `StorageOperatorStore.ts`: workflow view `{ id, selection, collapsed }` only.
- `ClientUsers.ts`: roster CRUD; directory type `ApplicationLogin` has no secret field `91:96`.
- `Client.#csrf` `57` from GET `/session`; cookie `supervisor-session` is `httpOnly` `ApplicationServer.ts:206`.
- Grep hits under `app/` also include correlation `token` (unit JSON address, `ExecutionInput.token`, transcript `token`) and vendor `input_tokens` — not credentials.
- Browser never holds a backend CLI/API credential. Server maps browser identity (session user → `Principal` workflows, or bearer `Principal.token`) onto workflow authorization only. CLI children inherit process env when `setup.environment` (`ApplicationRuntime.ts:114:117`); README/guide state the app does not read provider API keys. Mapping browser login → Claude/Codex/Cursor account: it does not.

6. Relation to agent and ollama

`src/**`: no `@orkestrel/agent` or `@orkestrel/ollama` imports.

`app/**` agent symbols: `ProviderInterface` (aliased `AgentProviderInterface`), `ProviderDelta`, `ProviderResult`, `ProviderStreamOptions`, `MessageInput`, `MessageInterface` (imported at `CLIProvider.ts:1:7`, `helpers.ts:11`), `ProviderAbortError`, `isProviderAbortError`, `createAgent`, `agentResultToJSON`, `AgentInterface`, `AgentStreamInterface`, `AgentChunk`. Files: `app/core/types.ts:2:7`, `parsers.ts:16`, `helpers.ts:9`; `app/server/types.ts:32`, `validators.ts:1`, `CLIProvider.ts:1:11`, `helpers.ts:11:17`, `factories.ts:21`, `InferenceStream.ts:2`, `ApplicationRuntime.ts:9`, `ApplicationHandlers.ts:8`, `AgentExecutor.ts:2`, `AgentExecution.ts:2`.

`app/**` ollama: `createOllama` `ApplicationRuntime.ts:21,189`.

Published supervisor `ProviderInterface` (`src/server/types.ts:111:178`: `launch`/`observe`/`settle`/optional attach-probe-encode) is a **separate contract** from agent `ProviderInterface` (`agent/src/core/types.ts:140:187`: `id`, `name`, `format?`, `generate`, `stream`). Differing members: supervisor has no `generate`/`stream`/`id`/`format`; agent has no `launch`/`attach`/`probe`/`answer`/`observe`/`settle`/`encode`. Agent `ProviderDelta` discriminates `channel` `97:99`; CLIProvider yields `{ type: 'content', text }` `CLIProvider.ts:235`. Agent messages are `Message` `agent/src/core/types.ts:27`; supervisor CLI code names `MessageInterface`. `CLIProvider` implements the agent seam; Claude/Codex/Cursor implement the supervisor process seam. Default agent executor provider is `createOllama` `ApplicationRuntime.ts:186:194`.

7. Ecosystem transport imports (`src/` + `app/` only)

Present:

- `@orkestrel/process`: `ProcessCommand`, `ProcessInterface`, `ProcessExit`; `Process` from `@orkestrel/process/server` — spawn/own CLI children (`ProviderExecutor.ts:2,19`, `ProviderExecution.ts:1,12`, `CLIProvider.ts:12`, provider files `ProcessCommand`).
- `@orkestrel/server`: `createServer`, `ServerInterface`, `openStream`, `clearCookie`, `MiddlewareHandler`, `collectRequestBody`, `computeBodyETag`, `matchesETag`, `negotiateEncoding`, `isHTTPError`, `ConnectionInfo`, `ServerStatus`, `StreamInterface` — HTTP server, SSE write, cookies, ETag assets.
- `@orkestrel/router`: `createDispatcher`, `DispatcherInterface`, `RouteContext` — route table.
- `@orkestrel/sse`: `createSSEParser` — browser SSE parse only (`LiveStream.ts:3`).
- `@orkestrel/middleware`: `createCSRF`, `createSession`, `createCookieTransport`, `createLimiter`, `createBody`, `except`, `only`, `createMemorySessionStore`, `createDatabaseSessionStore`, `isSession`, `sessionColumns`, `SessionInterface`, `SessionStoreInterface`, `SessionControlInterface`, `ClientInfo`; `@orkestrel/middleware/server` `createStatic`, `isDotfilePath`, `lookupContentType` — session/CSRF/limit/static.
- `@orkestrel/mcp`: `MCPServerInterface`, `createMCPLegacy`, `MCPMethodOptions`, `MCPStream`, `JSONRPCRequest`, `JSONRPCResponse`, `JSONRPCNotification`, `buildJSONRPCResult`, `buildModernResult`, `MCPServer`; `@orkestrel/mcp/server` `createMCPRoutes` — `/mcp` projection, not the workflow run.
- `@orkestrel/budget`: `TokenUsage` type only (`app/server/types.ts:33`, `CLIProvider.ts:8`, `parsers.ts:7`).

Absent under `src/` and `app/`: `@orkestrel/websocket`, `@orkestrel/ndjson`, `@orkestrel/abort`, `@orkestrel/timeout`, `@orkestrel/browser`.

8. Documented shape

`guides/README.md`: index only; Supervisor row `10` points at `guides/src/supervisor.md`. No provider/relay/login sections in the README itself.

`guides/src/*.md` present: `agent.md`, `budget.md`, `contract.md`, `database.md`, `emitter.md`, `guide.md`, `mcp.md`, `middleware.md`, `ollama.md`, `router.md`, `scaffold.md`, `sea.md`, `server.md`, `sse.md`, `supervisor.md`, `terminal.md`, `tool.md`, `workflow.md`.

`guides/src/supervisor.md`: providers `653:754` (split adapter vs executor; shipped Claude/Codex/Cursor table `674:693`; recovery `734:754`); live viewing `756:775`; login/credentials `778:943` (two credentials `822:829`; session idle vs live stream `935:943`); CLI inference relay `975:1009`.

`supervisor/README.md`: first-run login `45:91`; browser vs bearer `148`; inference vs workflow executors `381:462`; HTTP table `495:513`; SSE live `545:561`; inference relay `563:575`.

9. Workarounds

- Two `ProviderInterface`s: supervisor `src/server/types.ts:111` vs agent `agent/src/core/types.ts:140`; app aliases `AgentProviderInterface` / `ProcessProviderInterface` `app/server/types.ts:32,57`.
- `CLIProvider` implements agent `generate`/`stream` while published adapters implement process `launch`/`observe`/`settle`.
- `CLIProvider.ts:235` yields `{ type: 'content' }`; agent `ProviderDelta` uses `channel` `97:99`.
- `CLIProvider.ts:1:7` imports `MessageInterface`; `agent/src/core/types.ts` exports `Message` `27`, not `MessageInterface`.
- `identifyInferenceMessages` `helpers.ts:383:388` stamps positional `id` onto `MessageInput`.
- `agentChunkToObservation` `helpers.ts:885:897` projects `AgentChunk` onto supervisor `Observation`.
- `inferenceFailureFrame` `app/core/helpers.ts:188:193` projects `ProviderAbortError` onto `InferenceFrame`.
- `parseTokenUsage` `app/server/parsers.ts:61:72` projects vendor counters onto `@orkestrel/budget` `TokenUsage`.
- Duplicate vendor JSONL parsers: `ClaudeProvider.observe` `132:155` vs `ClaudeCLIBackend.parse` `48:65`; Cursor pair `CursorProvider.ts:64:88` / `CursorCLIBackend.ts:47:63`. Comments `ClaudeCLIBackend.ts:68:69`, `CursorCLIBackend.ts:67:68` keep parsers vendor-local.
- `LaneSessionStore`/`LaneWorkflowStore` wrap `@orkestrel/middleware` session store and `@orkestrel/workflow` snapshot store with core `Lane` (`app/server/stores/`, `ApplicationPersistence.ts:20:37`).
- InferenceStream rolls NDJSON by hand `InferenceStream.ts:41,82` instead of `@orkestrel/ndjson`.
- Cursor published adapter omits attach/probe `CursorProvider.ts:37:39` despite CLI resume; inference backend still launches.

Distillate:
Relay pattern: a stateless protocol adapter builds a command and translates frames; a generic process owner spawns, streams JSON Lines, aborts, times out, and assembles results; an executor registry turns that handle into a fenced unit; a workflow function drains `execution.events` into `unit.observe` → journal; a broker fans journal (and optional live transcript) to single-consumer viewers; HTTP is session-or-bearer JSON plus SSE (`openStream` / `createSSEParser`) and an optional NDJSON inference face.
Adapter = vendor flags + journal/inference frame vocabulary.
Executor/execution = spawn, stdin send, probe timeout, process-tree stop, observation sequencing, missing-terminal failure.
Browser client = same-origin `fetch` + CSRF header from GET `/session`; live = abortable fetch-SSE; no server implementation import, only `@app/core` contracts.
Server spine = `@orkestrel/server` + router dispatcher + middleware (session, access, limiter, CSRF, body) → handlers → `SupervisorApplication` / `CLIProvider`.
Auth = human verifier in setup/env, opaque session cookie, CSRF cookie/header, separate bearer `Principal.token`; correlation `token` is the unit address, not a credential.
Product policy that stays in supervisor: lease/fence/journal; intent-before-effect launch; fail-closed Cursor recovery; no live `encode` on shipped CLIs; principal workflow grants; session-vs-bearer exclusivity; MCP bearer-only; scrypt verifiers and `.supervisor.local`; workspace `ApplicationLease`; per-workflow directories; `APP_INFERENCE` mount list; CLI tool/schema/image refusals; `--tools ''` / Codex read-only / Cursor `--mode ask` without `--force`; unredacted live transcript as host security decision; rate limiter; provisional loopback+memory; human ledger/prompts; Vue operator generation/restore; not reading provider API keys.

Unknowns:
- Item 1 `Lane`/`Backend` types in the two named files: none found; `Lane` class is `src/core/Lane.ts`, `CLIBackend*` is `app/server/types.ts`.
- Item 6 `MessageInterface`: imported from `@orkestrel/agent` in `app/` but not declared in `agent/src/core/types.ts` (only `Message` / `MessageInput`). Did not read `agent` package index or `node_modules` (out of scope).
- Item 7 `@orkestrel/websocket`, `@orkestrel/ndjson`, `@orkestrel/abort`, `@orkestrel/timeout`, `@orkestrel/browser`: no imports under `supervisor/src` or `supervisor/app` (guides/tests only, excluded).
- Item 4 `handlers.ts`: exists but is process lifecycle (`startApplicationServer`), not a run-route hop.
- Item 5 greps under `app/` also hit unit correlation tokens and usage counters; those are not credentials. Did not read `demo/` or `node_modules/`.

Journal: supplied by the launcher

Deviation: none
