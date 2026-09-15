<!-- journal: tmp/cursor/absorb-provider.jsonl -->
<!-- session_id: 93cf347e-0929-42f4-9f9e-b9efebca03c3 -->
<!-- model: Cursor Grok 4.6 High; duration_ms: 228282; is_error: false; events: 777 -->
I'll read the brief first and follow its instructions exactly.I'll gather the named files and types across both packages, then assemble the return shape from those pointers.Next I’ll pull the remaining contract types, Ollama support files, configs, and the test suites that pin the seam.Question: What is the provider contract in `@orkestrel/agent`, how does the runtime drive it, and where in `OllamaProvider` does provider-generic work end and Ollama-specific wire work begin?

Evidence:

1. **The provider contract** (`agent/src/core/types.ts`)

Named `Provider*`:

- `ProviderResult` `72-80`. Members: `content: string`; `thinking?: string`; `tools?: readonly ToolCall[]`; `usage?: TokenUsage`. First sentence: “Holds a single inference turn's structured outcome — the assembled assistant content, any reasoning the provider separated from it, any tool calls the model requested, and the token usage it reported.”
- `ProviderDelta` `97-99`. Union `{ channel: 'content'; text: string } | { channel: 'thinking'; text: string }`. First sentence: “Represents one streamed delta a `ProviderInterface`'s `stream` yields — a unit tagged by the channel it belongs to…”
- `ProviderStreamOptions` `117-122`. Members: `think?: boolean`; `schema?: Readonly<Record<string, unknown>>`. First sentence: “Carries the per-call options threaded into a `ProviderInterface`'s `generate` / `stream`…”
- `ProviderInterface` `140-188`. Members: `id: string`; `name: string`; `format?: ContextFormat | undefined`; `generate(messages, signal, tools?, options?): Promise<ProviderResult>`; `stream(messages, signal, tools?, options?): AsyncGenerator<ProviderDelta, ProviderResult>`. First sentence: “Defines the pluggable LLM inference boundary — the one contract every agent chunk depends on.”

Transitive types a provider author must produce or consume:

- `MessageRole` `15` — `'system' | 'user' | 'assistant' | 'tool'`. First sentence: “Names the role a `Message` plays in a conversation turn.”
- `Message` `27-39`. Members: `id: string`; `role: MessageRole`; `content: string`; `calls?: readonly ToolCall[]`; `images?: readonly string[]`. First sentence: “Represents one conversation turn fed to a `ProviderInterface` — a stored, identified message.”
- `ContextSectionFormat<T>` `439-453`. Members: `open?: string`; `render?: (item: T) => string`; `close?: string`. First sentence: unit of a provider's `ContextFormat` / manager override.
- `ContextFormat` `500-503`. Member: `instructions?: ContextSectionFormat<InstructionInterface>`. First sentence: “Holds a provider's optional context-framing default, keyed by section kind…”
- `InstructionInterface` `289-303` (via `ContextFormat.instructions`). Members: `id`, `name`, `content: string`; `priority: number`; `override?: string`.
- `ToolDefinition` `tool/src/core/types.ts:9-16` (imported `types.ts:4-10`). Members: `name: string`; `description?: string`; `parameters?: Readonly<Record<string, unknown>>`. First sentence: “Describes a tool as advertised to a caller.”
- `ToolCall` `tool/src/core/types.ts:27-36`. Members: `id: string`; `name: string`; `arguments: Readonly<Record<string, unknown>>`; `caller?: unknown`. First sentence: “Describes one request to run a named tool.”
- `TokenUsage` `budget/src/core/types.ts:120-124`. Members: `prompt: number`; `completion: number`; `total: number`. First sentence: “Represents the canonical LLM cost unit: the finite nonnegative token counts reported for one provider call…”

Not in the `Provider*` graph: no capability-descriptor type; no provider event map (`AgentEventMap` `928-965` is the agent loop, not the provider). `ToolResult` (`tool/src/core/types.ts:76`) is produced by tool execute after the provider returns `ToolCall[]`, not by the provider. `ThinkSplitterInterface` `223-239` is a helper a provider may use; the contract does not require it. `AbortSignal` is the bound on both methods (`160-165`, `182-187`).

Error code the contract names in remarks (`131-135`): mid-stream abort → `ProviderAbortError` with `code: 'ABORT'` (`agent/src/core/errors.ts:19-21`).

2. **How the runtime drives a provider**

Sites that read or call a `ProviderInterface` member:

| Site | Member | Passed | Consumed | Runtime wrapping |
|---|---|---|---|---|
| `Agent.ts:122-124` | constructor stores `#provider` | `ProviderInterface` | held | none |
| `Agent.ts:362` | `format` | none | `context.build(this.#provider.format)` | conversation persistence / window `#trim` before first request (`395-402`) |
| `Agent.ts:657` | `format` | none | rebuild after compact | compaction (window), not the provider |
| `Agent.ts:434-438` | (definitions for stream) | scoped `tools.definitions()` | advertised tools | scope filter; not a provider member |
| `Agent.ts:454-468` `#provide` | `stream` via `729-734` | `messages`, run `AbortSignal`, `definitions`, `{think,schema}?` or `undefined` | `ProviderDelta`s + returned `ProviderResult` | abort, timeout, budget folded into that signal (`753-765`); mid-stream budget estimate on **content** deltas only (`460-467`); think-splitting **not** applied here |
| `Agent.ts:736-746` | stream iterator | — | `'content'` → `onDelta` + `token` chunk; `'thinking'` → `think` chunk; `next.value` = result | tool execution after return (`535-570`); usage sanitize/charge (`511-533`); no retry |
| `Agent.ts:479-500` | (error from stream) | — | `ProviderAbortError.partial.thinking` / `.usage` | abort/budget reconcile; cancel commits partial, does not reject |
| `AgentRegistry.ts:62-63,70-71,87-88` | pool + `provider(name)` + `new Agent(provider,…)` | job name | live instance | registry miss → `AgentError('REGISTRY')` `136-138`; job `signal` threaded `116` |
| `factories.ts:423-424` | `createAgent(provider)` | instance | `new Agent` | none |
| `factories.ts:555-556` | `createAgentRegistry` | `options.providers` | stored | none |

`Agent.ts:166-171` `generate()` awaits `stream().result` — **never** calls `provider.generate`. `AgentContext.ts:173` takes `format?: ContextFormat` as an argument; it does not hold a provider. `Channel.ts`, `validators.ts`, `constants.ts`, `ThinkSplitter.ts`: no `ProviderInterface` member reads (`ThinkSplitter.ts:7-8` is comment-only). `helpers.ts:524-591` parameters named `provider` are `ContextSectionFormat`, not `ProviderInterface`. `helpers.ts:349` `sanitizeUsage` is applied by `Agent` to provider-reported usage. `errors.ts:19-48` defines `ProviderAbortError` / `isProviderAbortError` (`Agent.ts:31,479`). `factories.ts:86` TSDoc example calls `provider.generate` for the summarizer seam; the loop does not.

Responsibility split:

| Concern | Runtime | Provider contract |
|---|---|---|
| abort | folds external + per-run + timeout + budget into one `AbortSignal`; cancel → partial `AgentResult` | honour signal; `stream` abort → throw `ProviderAbortError` with `partial` |
| timeout | `createTimeout` on the run (`193-195`, `761`) | Ollama also arms its own per-call `Timeout` (see item 4); contract only sees the signal |
| budget | mid-stream `estimateTokens` on content; post-turn / abort `sanitizeUsage` + residual charge | report `usage` when known; do not charge a budget |
| think-splitting | remaps `'thinking'` deltas to `think` chunks; joins `result.thinking` | yield clean `'content'` vs `'thinking'`; optional `ThinkSplitter` is the provider's job |
| tool execution | `#authorize` + `tools.execute`; append assistant/`tool` messages | advertise `ToolDefinition[]`; return `ToolCall[]` |
| retry | **none** around `stream`; queue retries whole jobs via `AgentJobError` (`errors.ts:75`, `factories.ts:574-577`) | none |
| conversation persistence | caller `open`/`save`; auto `#trim` compact before/between turns using `format` again | none; summarizer may call `generate` outside the loop |

3. **The guide's promise** (`agent/guides/agent.md`)

Headings that document providers:

- `# Agent` `1`; lead `3-5`, `10`, `18-20`
- `## Surface` `16`
- `### Conversations & compaction` `213` (summarizer via `provider.generate`)
- `### Customizing the format (the cascade)` `340`; provider-default level `346`
- `### Factories` `378` (`createAgent`, `createAgentRegistry` rows)
- `## Methods` / `#### ProviderInterface` `588-599`
- `## Contract` clause 2 `806`
- `## Patterns` / `### Bounding any provider call` `846`; `### Dispatching the model's tool calls` `868`; `### Running the loop…` `887`

Fences — create / register / swap:

- Drive `generate`/`stream` by hand `22-42`
- `createAgent(provider, …)` `97-122`, `126`
- Summarizer built from `provider.generate` `218-235`
- Bound any provider `850-865`
- Hand-dispatch tools `872-884`
- Loop instead of hand-drive `891-904`
- Register + swap by name `1020-1027` `createAgentRegistry({ providers: { main: provider } })`

Documented extension seam: `ProviderInterface` is a contract, not an implementation; host supplies the concrete class (`10`, `18`, `590`, `806`). Optional `format` is the provider-default cascade level (`346`, `376` in Surface). Durable swap is a named registry key (`822`, `1027`).

Portability sentences: “any backend that satisfies it drops in unchanged and the host application decides which one” `10`; “This works for any provider; constructing the concrete one is a host application's job” `848`. **No sentence names browser / server / worker as provider-portability hosts.** Closest host mention: “a server JSON / SQLite store” for queues `1024`, not the provider.

4. **`OllamaProvider` anatomy** (`ollama/src/server/OllamaProvider.ts`)

Public: `name = 'ollama'` `82`; `get id(): string` `133-135`; `get format(): ContextFormat | undefined` `154-156`; `generate` `176-198`; `stream` `219-307`. Implements `ProviderInterface` `81`.

`#` fields `83-94`: `#id`, `#model`, `#url`, `#keepAlive`, `#timeout`, `#think`, `#options`, `#transport`, `#headers`, `#format`.

Constructor `96-124` (`OllamaOptions`): mint `#id`; copy `model` / `url` / `keepAlive` / `timeout` / `think` / `options` / `fetch` / `headers` / `format`. `#format` is expose-only, never sent as Ollama's wire `format` (`117-123`).

| Method | Ollama-wire | Provider-generic |
|---|---|---|
| `generate` `176-198` | `182` `#fetch` `stream:false`; `184` `parseBody`; `191-194` `extractContent` / `extractThinking` / `extractTools` / `extractUsage` | `190-192` `createThinkSplitter` split/flush; `193` `joinThinking`; `194` `buildResult`; `196` `timeout.clear()` |
| `stream` `219-307` | `225-231` `#fetch` `stream:true`; `232-239` `response.body` / NDJSON `createNDJSONParser` / `TextDecoder`; `259-275` parse NDJSON records; `235` `OllamaHTTPError` null body | `247` splitter; `260-263` fold `#deltas`; `278-279` flush content delta; `283-290` `ProviderAbortError(buildResult(…))`; `293-304` reader cancel + `timeout.clear`; `306` `buildResult` |
| `#deltas` `315-343` | `327` `extractContent`; `334` `extractThinking`; `340-341` `extractTools`; `done` → `extractUsage` | `327-328` splitter.split + yield `{channel:'content'}`; `335` yield `{channel:'thinking'}` |
| `#fetch` `347-392` | `358` `` `${this.#url}/api/chat` `` POST; `361` `#body`; `364-382` non-OK → `OllamaHTTPError` truncated body | `354-356` `Timeout` + `AbortSignal.any([timeout.signal, signal])`; `385-390` clear timeout on failure |
| `#requestHeaders` `402-408` | JSON `Content-Type`; merge `#headers` hook | transport-seam header injector (any host) |
| `#body` `416-443` | `model`, `keep_alive`, `think`, sampling `options`, wire `format` from `schema`, `tools[].type='function'` | `mapMessages(messages)`; project `ToolDefinition` → function tools; per-call `options.think` over `#think` |

5. **Ollama support files**

`types.ts`: `OllamaResponse` `18-22` wire (open `/api/chat` `Response` + timeout + combined). `WireChatRequest` `37-69` wire (`model`, `messages`, `stream`, `keep_alive`, `think`, `options`, function `tools`, `format`). `OllamaOptions` `88-147` mixed — `model`/`url`/`keepAlive`/`think`/`options` wire; `timeout` generic deadline; `fetch`/`headers` generic transport seam; `format` generic `ContextFormat`. `OllamaHTTPErrorOptions` `158-160` wire (HTTP `cause`).

`helpers.ts`: `mapMessages` `28-45` wire (`tool_calls` / `images`). `buildResult` `65-81` generic. `extractContent` `94-99` wire. `extractThinking` `116-121` wire (`message.thinking`). `joinThinking` `136-140` generic. `extractUsage` `158-163` wire (`prompt_eval_count`/`eval_count`). `extractTools` `182-202` wire. `extractArguments` `219-223` wire.

`parsers.ts`: `parseBody` `24-28` wire.

`factories.ts`: `createOllama` `79-81` generic factory returning `ProviderInterface`.

`errors.ts`: `OllamaHTTPError` `31-44` (`code: 'HTTP'`, `status`) wire; `isOllamaHTTPError` `56-58` wire.

`constants.ts`: `DEFAULT_OLLAMA_URL` `7` wire; `DEFAULT_KEEP_ALIVE` `18` wire; `DEFAULT_PROVIDER_TIMEOUT` `24` generic; `MAX_ERROR_BODY_LENGTH` `36` wire.

`index.ts` `1-7`: re-exports only.

6. **What the tests pin** (`ollama/tests`)

How suites reach Ollama:

- Real daemon: `createLiveOllama` `setupService.ts:28-35`; gate `isOllamaReady` `101`; warmup `warmOllama` `126`. Used by `tests/service/*.test.ts` (`vite.config.ts:131-136` setupFiles `setupService.ts`).
- Fixture / recording proxy: `createRecordingProxy` `setupServer.ts:191` (default upstream `http://127.0.0.1:1` hermetic; live tests pass `OLLAMA_CONFIG.host`). Used by `tests/src/server/*.test.ts` (`vite.config.ts:60` setupFiles `setupServer.ts`) and several service suites.
- Recorded / canned stream: `createStreamingTransport` `setupServer.ts:154`; refusing: `createRefusingTransport` `131`.
- Conformance: official `ollama` package **types only**, no socket (`conformance.test.ts:1-8`, `15`).

Grouped by seam (suite → names):

- **transport:** `src/server/OllamaProvider.test.ts` request-body / headers / custom fetch / unreachable / deadline cleanup; `service/transport.test.ts` “browser → own server (obfuscated token) → live LLM”; `service/OllamaProvider.test.ts` “recording proxy — transport seam custom fetch”; `src/server/factories.test.ts` “createOllama (unreachable)”.
- **streaming:** `OllamaProvider (streaming fold over a canned NDJSON daemon)` (`src/server/OllamaProvider.test.ts:715`); live `OllamaProvider (live — stream)`; `lifecycle.test.ts` streamed chunk taxonomy / think channel.
- **tools:** `helpers.test.ts` `extractTools`/`mapMessages`; live `service/tools.test.ts` dispatch, feedback, thrown tool, authority denial, limit exhaustion, multiple calls.
- **abort:** `OllamaProvider (pre-aborted)`; live `OllamaProvider (live — abort)`; `lifecycle.test.ts` `abort()` mid-stream / timeouts.
- **budget:** `service/budget.test.ts` usage coherence, exhausted budget, mid-generation trip, multi-turn accumulate.
- **lifecycle:** `service/lifecycle.test.ts` (chunks, status, emitter, think, abort, timeout, limit).
- **schema:** `service/schema.test.ts`; live `OllamaProvider (recording proxy — structured-output schema)`.
- **conversation:** `service/conversation.test.ts`; `src/server/integration.test.ts` recap prefix / `reference` / only active conversation on the wire.
- **authority:** `service/authority.test.ts` allow / fail-closed throw / default allow.
- **compaction:** `service/compaction.test.ts` auto-fold, live `compact()`, repeated folds.
- **scopes:** `service/scopes.test.ts`; hermetic `integration.test.ts` tools/instructions/files allow-lists.
- **conformance:** `conformance.test.ts` `WireChatRequest` subset vs official `ChatRequest`/`Message`/`Tool`.

`src/server` also: `parsers.test.ts` `parseBody`; `errors.test.ts` `OllamaHTTPError`; `helpers.test.ts` all extractors; `factories.test.ts` `createOllama` shape/defaults.

7. **Agent tests on the provider seam**

Supply path: shared scripted provider `createScriptedProvider` / `ScriptedProvider` `agent/tests/setup.ts:155-171` — a real `ProviderInterface` that honours `signal` and throws `ProviderAbortError` (`setup.ts:25-33`, `219-232`). `Agent.test.ts:35,47-56` imports it with `record: true`, `exhaust: 'throw'`. Some abort/error/concurrency cases use a local `ProviderInterface` object (`Agent.test.ts:167`, `896`, `1714+`; `factories.test.ts:299-311`).

Provider-facing names:

- `Agent.test.ts`: format into `build` (`219`,`246`); think option (`194`); thinking deltas (`166`,`132`); advertised tools (`202`,`262-317`); abort without calling provider (`880`); genuine provider error (`923`,`1717`,`1792`,`2206`,`2530`); `ProviderAbortError` (`2301-2326`); per-run `schema`/`think`/omit options (`3580-3598`); abort usage sanitize (`3765`,`3819`); `limit: 0` no provider call (`3329`); pre-first-turn compact before first provider call (`2980`).
- `integration.test.ts`: full loop via fake (`31`,`44`,`64`,`111`); drop-in swap of two named providers (`140`); format vs agnostic (`158`); `createScriptedProvider` itself conforming (`192`).
- `factories.test.ts`: `createAgent` one turn (`93`); registry round-trip (`211`); queue abort reaches provider signal (`293`); missing provider name (`708`,`764`).

8. **Ecosystem imports on the provider path**

`agent/src/core/types.ts`: `@orkestrel/budget` `BudgetInterface`,`TokenUsage` (usage/budget fields); `@orkestrel/emitter` emitter types on agent options (not provider); `@orkestrel/queue` `QueueStoreInterface` (jobs); `@orkestrel/tool` `ToolCall`,`ToolDefinition`,`ToolResult`,… (provider in/out + loop); `@orkestrel/workflow` `SchedulerInterface`; `@orkestrel/workspace` `WorkspaceManagerInterface`.

`Agent.ts`: `@orkestrel/abort` `createAbort` (run cancel); `@orkestrel/timeout` `createTimeout` (run deadline); `@orkestrel/budget` charge `TokenUsage`; `@orkestrel/emitter` `Emitter`; `@orkestrel/tool` execute `ToolCall`/`ToolResult`; `@orkestrel/workflow` `errorToMessage` (authority fail-closed).

`AgentContext.ts`: `@orkestrel/tool` `ToolManager`; `@orkestrel/workspace` `isText`,`WorkspaceManager` (prompt assembly, not provider I/O).

`AgentRegistry.ts`: `@orkestrel/budget` `createTokenBudget`; `@orkestrel/tool` `ToolManager`; `@orkestrel/workflow` `SchedulerInterface`.

`factories.ts`: `@orkestrel/database`,`queue`,`workflow`,`contract` for stores/jobs; `ProviderInterface` is a parameter type only.

`helpers.ts`: `@orkestrel/budget` `TokenUsage` sanitize/sum; `@orkestrel/contract` JSON projection; `@orkestrel/tool` `ToolCall`/`ToolResult`; `@orkestrel/workspace` image attach.

`validators.ts`: `@orkestrel/contract` guards; `@orkestrel/tool` `isToolCall` (snapshots, not live provider).

`errors.ts`, `Channel.ts`, `ThinkSplitter.ts`, `constants.ts`: no `@orkestrel/*` imports.

`OllamaProvider.ts`: `@orkestrel/agent` contract types + `createThinkSplitter`,`ProviderAbortError`; `@orkestrel/budget` `TokenUsage`; `@orkestrel/tool` `ToolCall`,`ToolDefinition`; `@orkestrel/ndjson` `createNDJSONParser`; `@orkestrel/timeout` `Timeout`.

`ollama/.../types.ts`: `@orkestrel/agent` `ContextFormat`; `@orkestrel/timeout` `TimeoutInterface`.

`ollama/.../helpers.ts`: `@orkestrel/agent` `Message`,`ProviderResult`,`ThinkSplitterInterface`; `@orkestrel/budget` `TokenUsage`; `@orkestrel/tool` `ToolCall`; `@orkestrel/contract` `isNumber`,`isRecord`,`isString`,`parseJSONAs`.

`parsers.ts`: `@orkestrel/contract` `isRecord`,`parseJSONAs`.

`factories.ts`: `@orkestrel/agent` `ProviderInterface`.

`errors.ts`,`constants.ts`,`index.ts`: no `@orkestrel/*` imports (`errors.ts` local types only).

9. **Environment facts**

`@orkestrel/agent` `0.0.21` (`agent/package.json:2-3`): core-only. Scripts `check:src:core` / `build:src:core` / `test:src:core` (`51-57`). `exports` `"."` import/require → `dist/src/core/index.{js,cjs,d.ts,d.cts}` (`29-40`). Vite test project `srcCore` `environment: 'node'` (`agent/vite.config.ts:32-47`). `configs/src/tsconfig.core.json`: `lib: ["ESNext","WebWorker"]`, `types: []`.

`@orkestrel/ollama` `0.0.15` (`ollama/package.json:2-3`): server-only; depends `@orkestrel/agent ^0.0.21` (`75`). Scripts `check:src:server` / `build:src:server` / `test:src:server` / `test:conformance` / `test:service` (`52-60`). `exports` `"."` → `dist/src/server/index.{js,cjs,d.ts,d.cts}` (`29-40`). Vite `srcServer` `target: 'node22'`, `platform: 'node'` (`ollama/vite.config.ts:32-63`); `conformance` node; `service` node + `setupService.ts`. `configs/src/tsconfig.server.json`: `lib: ["ESNext"]`, `types: ["node"]`.

No other `configs/src/*.json` in either package. Neither package builds a `browser` face.

Distillate:
- Contract is `ProviderInterface`: `id`, `name`, optional `format`, `generate`, `stream`. Input is `Message[]` + optional `ToolDefinition[]` + `AbortSignal` + optional `{think, schema}`. Output is `ProviderResult` / `ProviderDelta`s. Mid-stream cancel throws `ProviderAbortError` (`code:'ABORT'`) with `partial`. No events, no capabilities, no retry API.
- Runtime `Agent` stores one provider and calls **only** `format` and `stream`. `generate()` on the agent drains that stream. `provider.generate` exists for hand-drive and the summarizer seam (`ConversationSummaryHandler`), not the loop.
- Around `stream` the runtime (not the provider) folds abort/timeout/budget into the signal; estimates content tokens mid-stream; sanitizes and charges usage; executes tools; persists/compacts conversation; remaps `'content'`/`'thinking'` to `token`/`think` chunks. It does not split `<think>` tags and does not retry `stream`.
- A host-independent base is: honour the signal; yield channel-tagged deltas; return `{content, thinking?, tools?, usage?}`; throw `ProviderAbortError` on abort; optionally expose `ContextFormat`; optionally route raw content through `createThinkSplitter`. Message projection, tool-definition projection, result assembly, abort partials, and usage folding are that base.
- `OllamaProvider` repeats that base (`buildResult`, splitter, `ProviderAbortError`, timeout+`AbortSignal.any`, expose-only `format`, `createOllama`). Wire-specific subclass work is `POST ${url}/api/chat`, NDJSON, `keep_alive`, model name, Ollama `think` flag, `message.thinking` / `tool_calls` / `prompt_eval_count`, function-tool framing, `OllamaHTTPError`, and `fetch`/`headers` as the daemon/proxy transport.
- Tests pin the split: agent core uses `createScriptedProvider` (no daemon); ollama `src/server` uses a recording proxy or canned NDJSON; `service` uses a real daemon via `createLiveOllama`.

Unknowns:
- `agent/guides/agent.md` has no sentence promising provider portability across browser / server / worker hosts (item 3 last clause). Tried that file throughout.
- Installed `@orkestrel/tool` / `@orkestrel/budget` declarations were not under `agent/node_modules/@orkestrel/` (empty). Transitive `ToolCall` / `ToolDefinition` / `TokenUsage` read from sibling checkouts `C:/Users/mikes/WebstormProjects/tool/src/core/types.ts` and `C:/Users/mikes/WebstormProjects/budget/src/core/types.ts`.
- `Channel.ts`, `validators.ts`, `constants.ts`, `ThinkSplitter.ts` contain no `ProviderInterface` member reads (item 2 sites: none).

Journal: supplied by the launcher

Deviation: none
