<!-- analyst route on GPT 6 Astra (gpt-6-astra), codex exec read-only rooted at C:/Users/mikes/WebstormProjects, thread 01a0a159-2bc5-78e0-98af-56186dcf52b1, launched 2026-09-14T19:16:10Z, exit 0 at 19:32:06Z; immutable blind report copied verbatim from tmp/codex/design-objective-last.md -->

Lane: objective

## Answers

1. **Base shape**

   Use an abstract `AgentProvider<T>` that concrete providers extend. Its constructor receives an immutable wire object and transport options. The base implements the mechanics; the wire object implements protocol translation. This satisfies the requested inheritance relationship without requiring `protected` members or exposing lifecycle internals.

   The public extension surface is the readonly `wire` property. Its contract names the endpoint, request projection, parser construction, record interpretation, end-of-input handling, optional native unary decoder, and HTTP-error translation. `OllamaProvider` supplies an `OllamaWire`; it does not override the transport or accumulation loops.

   This combines inheritance with composition, but introduces only one provider engine. The governing rules permit this: runtime privacy uses `#` fields, reusable interfaces precede implementation, and a shared engine can support a genuine native fast path (`scaffold/AGENTS.md:46`, `:50`, `:71`).

   The base owns:

   - Fresh per-instance identity, backend name, and expose-only context `format`.
   - The bound default `fetch`, dynamic headers, JSON POST, and endpoint construction.
   - Per-call timeout creation, `AbortSignal.any`, and cleanup on every exit.
   - Bounded non-OK body collection before wire-specific error construction.
   - Response-body reading, streaming UTF-8 decoding, and parser lifecycle.
   - Optional think splitting, content/thinking accumulation, complete tool-call collection, and usage replacement.
   - Terminal-result handling, partial-on-abort errors, and generation by draining the shared engine.
   - Reader cancellation and lock release, including early iterator return.

   These are extracted from `ollama/src/server/OllamaProvider.ts:96`, `:176`, `:219`, and `:347`. Request fields and vendor response interpretation remain wire-specific (`:416`; `ollama/src/server/helpers.ts:28`, `:94`, `:116`, `:158`, `:182`).

   Add the following contracts to `agent/src/core/types.ts`. Existing `Message`, `ProviderInterface`, `ProviderDelta`, `ProviderResult`, and `ProviderStreamOptions` retain their shapes.

   ```ts
   export interface ProviderOptions {
   	readonly timeout?: number
   	readonly fetch?: typeof globalThis.fetch
   	readonly headers?: () =>
   		| Readonly<Record<string, string>>
   		| Promise<Readonly<Record<string, string>>>
   	readonly format?: ContextFormat
   }

   export interface AgentProviderOptions extends ProviderOptions {
   	readonly url: string
   	readonly limit?: number
   }

   export interface ProviderRequest {
   	readonly messages: readonly Message[]
   	readonly tools?: readonly ToolDefinition[]
   	readonly options?: ProviderStreamOptions
   }

   export interface ProviderParserInterface<T> {
   	parse(chunk: string): readonly T[]
   	clear(): void
   }

   export type ProviderFrame =
   	| {
   			readonly event: 'delta'
   			readonly delta: ProviderDelta
   	  }
   	| {
   			readonly event: 'tools'
   			readonly tools: readonly ToolCall[]
   	  }
   	| {
   			readonly event: 'usage'
   			readonly usage: TokenUsage | undefined
   	  }
   	| {
   			readonly event: 'result'
   			readonly result: ProviderResult
   	  }
   	| {
   			readonly event: 'abort'
   			readonly partial: ProviderResult
   	  }

   export interface ProviderFailure {
   	readonly status?: number
   	readonly detail?: string
   	readonly cause?: unknown
   }

   export interface ProviderWireInterface<T> {
   	readonly name: string
   	readonly path?: string
   	readonly split: boolean
   	readonly strict: boolean
   	readonly unary?: (text: string) => readonly ProviderFrame[]

   	body(request: ProviderRequest, stream: boolean): object
   	parser(): ProviderParserInterface<T>
   	read(record: T): readonly ProviderFrame[]
   	finish(parser: ProviderParserInterface<T>): readonly T[]
   	error(failure: ProviderFailure): Error
   }

   export interface AgentProviderInterface<T> extends ProviderInterface {
   	readonly wire: ProviderWireInterface<T>
   }

   export interface ProviderReaderOptions {
   	readonly signal: AbortSignal
   	readonly limit?: number
   	readonly truncate?: boolean
   }

   export interface ProviderReaderInterface {
   	read(): Promise<string>
   	stream(): AsyncGenerator<string, void>
   }

   export type ProviderErrorCode =
   	| 'HTTP'
   	| 'BODY'
   	| 'LIMIT'
   	| 'PROTOCOL'
   	| 'PROVIDER'

   export interface ProviderErrorOptions {
   	readonly code: ProviderErrorCode
   	readonly status?: number
   	readonly cause?: unknown
   }
   ```

   The class constructor is `AgentProvider(wire, options)`. `ProviderReader(body, options)` is a shared, single-consumption body reader composed by the base and relay handler. It adds decoding, cancellation, and bounds to the native reader; it is not a renamed native method.

   Define wire semantics precisely:

   - `split: true` routes raw content through `ThinkSplitter`; `false` preserves already-separated deltas.
   - `strict: true` requires a terminal result or abort frame; `false` permits assembly at EOF.
   - A tools frame appends complete calls. Fragment reconstruction belongs to the vendor wire.
   - A usage frame replaces the prior report, including replacement with `undefined`; it never charges a budget.
   - A result frame supplies the authoritative result. Do not append its content to accumulated deltas.
   - An abort frame becomes `ProviderAbortError` even when the local caller signal is not aborted.
   - Parser instances and accumulators are fresh per call. Shared wire objects hold configuration only.

   Preserve the `120_000`ms default and `2048`-character error excerpt. The existing implementation reads the entire error body before truncating (`ollama/src/server/OllamaProvider.ts:370`); that does not satisfy C1’s bounded-body requirement. Stop reading after a bounded prefix, cancel the remainder, and preserve the existing excerpt and unavailable-body error forms.

2. **Layers**

   Implement one HTTP streaming provider base in this campaign. Host independence does not require transport independence.

   Ollama and the relay are real HTTP consumers. Supervisor’s published providers implement a different process contract, and its private `CLIProvider` is evidence of a possible later consumer, not an authorized implementation target (`scaffold/tmp/cursor/absorb-supervisor-report.md:6`; `supervisor/app/server/InferenceStream.ts:25`).

   A transport-independent superclass plus an HTTP subclass would add a public layer without a first consumer inside C1–C5. Refuse that expansion under `scaffold/AGENTS.md:71` and `scaffold/.claude/rules/architecture.md:294`.

   Keep `ProviderInterface` independent of `AgentProvider`. A process provider can still implement the interface directly. Document that `AgentProvider` supplies an HTTP implementation substrate, not every possible transport.

3. **`generate`**

   The default `generate` drains `this.stream()` and returns the iterator’s terminal value. It must use explicit `next()` calls because `for await` discards that value. This matches the existing scripted provider (`agent/tests/setup.ts:268`) and the runtime’s use of streaming (`agent/src/core/Agent.ts:729`).

   Retain Ollama’s native unary path. Its guide promises `stream: false`, and a request-shape test asserts that value (`ollama/guides/ollama.md:113`; `ollama/tests/src/server/OllamaProvider.test.ts:109`).

   `OllamaWire.unary` supplies only the single-body decoding and projection. The base selects the native path when that capability exists and shares timeout, headers, POST, body reading, splitting, assembly, and cleanup with streaming. `OllamaProvider` does not copy `generate`.

   Change `parseBody` to accept decoded text if retaining that named coercer. Its present `Response` consumption belongs to the extracted reader (`ollama/src/server/parsers.ts:24`). This is a public signature change and must be recorded, not hidden behind an overload retained solely for compatibility.

4. **Framing seam**

   `ProviderParserInterface<T>` requires only `parse` and `clear`. Do not require `T` to extend `Record<string, unknown>`: an SSE event is a different structural type.

   The installed NDJSON parser satisfies the interface for record values; the SSE parser satisfies it for `SSEEvent` (`ollama/node_modules/@orkestrel/ndjson/dist/src/core/index.d.ts:56`; `ollama/node_modules/@orkestrel/sse/dist/src/core/index.d.ts:237`).

   End-of-input behavior belongs to `wire.finish`:

   - Ollama feeds the decoder’s final text, then calls `parser.parse('\n')` to preserve unterminated-line recovery.
   - An SSE wire can use its concrete parser’s `flush` capability through an appropriately typed implementation.
   - The generic engine never inserts an NDJSON terminator into an arbitrary protocol.

   Agent gains no NDJSON or SSE dependency. Ollama supplies `createNDJSONParser` from its declared dependency (`ollama/package.json:78`).

   The relay provider requires an injected NDJSON parser factory. Its sequence-checking decorator adds relay validation; it does not implement newline framing. This has an ergonomic cost, but avoids an unauthorized dependency.

   Preserve the installed NDJSON parser’s actual behavior: it drops malformed/non-record lines and has no buffer limit (`ollama/node_modules/@orkestrel/ndjson/dist/src/core/index.d.ts:30`, `:65`). Do not claim that injecting it makes every malformed byte sequence fail immediately.

5. **Environment of the base and Ollama**

   Put the base, reader, relay provider, and relay response machinery in agent core. Core explicitly permits fetch, streams, encoders, crypto, and abort APIs (`scaffold/.claude/rules/workspace.md:202`; `agent/configs/src/tsconfig.core.json:4`).

   Move Ollama’s published implementation to core. Its present Node build and server declarations do not prove browser compatibility (`ollama/vite.config.ts:35`, `:46`, `:49`; `ollama/configs/src/tsconfig.server.json:4`). None of the provider’s named runtime imports requires its server placement.

   The migration inventory is:

   - `src/server/OllamaProvider.ts` → `src/core/providers/OllamaProvider.ts`.
   - Add `src/core/wires/OllamaWire.ts`.
   - Move `types.ts`, `constants.ts`, `helpers.ts`, `parsers.ts`, `errors.ts`, `factories.ts`, and `index.ts` from `src/server` to `src/core`; remove extracted declarations.
   - Replace the server target wrappers with `configs/src/tsconfig.core.json` and `configs/src/vite.core.config.ts`.
   - Update `vite.config.ts` entry, output, environment boundary, build platform/target, test project, and project registration.
   - Update `tsconfig.json` aliases and the package’s own specifier mapping.
   - Update `package.json` entry fields, exports, build/check/test scripts, version, and agent range.
   - Move mirrored provider tests under `tests/src/core/providers`; move the other source tests under `tests/src/core`.
   - Update actual source-barrel consumers in conformance, service, setup, and guide tests.
   - Update `guides/ollama.md`, `README.md`, and the guide inventory in `guides/README.md`.

   Keep `tests/setupServer.ts` for Node fixture servers. Core tests still execute under Node; a test’s runtime does not determine the published source environment (`scaffold/.claude/rules/workspace.md:119`). Source-mirrored tests can explicitly import their Node fixture helpers. Keep shared host-independent fixtures in `tests/setup.ts`; keep live readiness and warmup in `tests/setupService.ts`.

   Do not rewrite every `@src/server` text match. The vendored config test uses it as a negative environment-boundary input (`ollama/tests/config.test.ts:2087`, `:2144`).

   Do not propose `scaffold repair --src core`: the documented repair command does not accept `--src`. That selection belongs to workspace creation (`scaffold/guides/scaffold.md:519`, `:523`, `:551`). Use the existing core template as the migration reference and inspect a scoped scaffold audit afterward. No blanket repair may rewrite off-limits files.

   `guides/README.md` and lockfile changes require an explicit scope ruling; the brief’s allowed-change list omits them.

6. **Relay protocol**

   Retain the transparent proxy recipe for C3 and implement an agent-level relay for C4.

   A transparent proxy accepts Ollama’s `WireChatRequest`, forwards the vendor stream, and can validate a custom token and replace credentials. It cannot, without additional translation, drive an arbitrary server-side `ProviderInterface`. The existing proxy forwards bytes; it does not authenticate the token or replace credentials (`ollama/tests/setupServer.ts:200`, `:210`, `:212`). Its service test proves token carriage, not authentication (`ollama/tests/service/transport.test.ts:53`).

   The agent relay sends identified `Message` values, tool definitions, and per-call options. It always drives `provider.stream`; client `generate` drains the resulting relay stream. No unary relay mode is required.

   Add these contracts to agent types:

   ```ts
   export interface RelayRequest extends ProviderRequest {
   	readonly version: 1
   }

   export type RelayFrame = {
   	readonly sequence: number
   } & (
   	| {
   			readonly event: 'delta'
   			readonly delta: ProviderDelta
   	  }
   	| {
   			readonly event: 'result'
   			readonly result: ProviderResult
   	  }
   	| {
   			readonly event: 'abort'
   			readonly partial: ProviderResult
   	  }
   	| {
   			readonly event: 'error'
   			readonly code: 'PROTOCOL' | 'PROVIDER'
   			readonly message: string
   	  }
   )

   export interface RelayOptions extends AgentProviderOptions {
   	readonly parser: () =>
   		ProviderParserInterface<Readonly<Record<string, unknown>>>
   }

   export type RelayAuthorizationHandler = (
   	request: Request,
   ) => Response | undefined | Promise<Response | undefined>

   export type RelayHandler = (request: Request) => Promise<Response>

   export interface RelayHandlerOptions {
   	readonly provider: ProviderInterface
   	readonly authorize: RelayAuthorizationHandler
   	readonly limit?: number
   }

   export interface RelayStreamOptions {
   	readonly signal: AbortSignal
   }

   export interface RelayStreamInterface {
   	readonly response: Response
   }
   ```

   `createRelay(options): RelayHandler` is the handler factory. `authorize` is mandatory: `undefined` means no denial; a returned `Response` is the application’s denial. A thrown authorization error fails closed before provider invocation. The application owns token minting, validation, identity, and denial policy.

   The browser constructs `RelayProvider` with the server endpoint and a `headers` hook carrying its custom token. The server constructs the real provider with its own credential hook. Incoming client headers are never copied into that provider’s configuration. The request contains no upstream URL, credential, or provider-selection override.

   Successful replies use `application/x-ndjson; charset=utf-8` and `cache-control: no-store`. Frames carry an increasing `sequence`, starting at `0`. A terminal result, abort, or error follows the deltas. Sequence checks detect dropped relay records when a later record arrives; EOF without a terminal frame is a protocol error. Uninterpretable garbage that the injected NDJSON parser drops without dropping a numbered frame cannot be diagnosed by this seam.

   Preserve the complete terminal result, including thinking, tools, and usage. Set the relay wire’s `split` to `false`: the server provider already separated thinking, and splitting its clean output again would corrupt literal tag text. The final result remains authoritative across implicit-open think reclassification (`agent/src/core/types.ts:205`; `ollama/guides/ollama.md:114`).

   Abort has distinct observable cases:

   - **Client cancellation:** the client’s combined signal aborts fetch. The server request signal aborts the upstream provider. The client throws `ProviderAbortError` containing information it actually received.
   - **Upstream cancellation while the connection remains usable:** the handler serializes `ProviderAbortError.partial` as an abort frame. The client reconstructs that error with the supplied partial.
   - **Response-body cancellation:** abort the upstream signal first, then call `iterator.return(...)`; release listeners and prohibit subsequent writes.
   - **Unsignalled transport failure:** report a transport/protocol failure. Do not relabel every broken connection as a caller abort.

   A closed connection cannot deliver its final abort frame. `ProviderDelta` carries neither tools nor usage, so client-side cancellation cannot recover unseen values (`agent/src/core/types.ts:97`). Inline thinking revealed only in the terminal result can also be unavailable. Do not fabricate those fields or promise equality with the server’s final partial.

   The serialized contract is narrower than the in-process interface. `ToolCall.caller`, arguments, parameters, and schema admit values JSON cannot represent (`agent/node_modules/@orkestrel/tool/dist/src/core/index.d.ts:120`, `:137`; `agent/src/core/types.ts:117`). Project declared fields, preserve JSON-compatible values, and reject unrepresentable values before dispatch or terminal serialization. Do not silently discard a supplied `caller`. A transported caller value remains untrusted metadata.

   Supervisor’s private relay demonstrates pull-driven response construction and abort frames, but omits tools and uses `MessageInput` instead of the governing identified message shape (`supervisor/app/core/types.ts:44`; `supervisor/app/server/InferenceStream.ts:25`). Reuse the shape of the mechanism, not those limitations or its stale vocabulary.

7. **Server-side placement**

   The server half belongs in agent core as `RelayHandler`. It needs no Node import or Node face.

   A function accepting only `Request` can be mounted as a router handler that also supplies a context argument. The installed declarations support this composition:

   - `Dispatcher.handle(request, state): Promise<Response>` — `ollama/node_modules/@orkestrel/router/dist/src/core/index.d.ts:470`.
   - `RouteHandler = (request, context) => Response | Promise<Response>` — the same file at `:948`.
   - `ServerOptions.dispatcher` consumes that dispatcher — `ollama/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1864`.

   The installed server links request teardown and server shutdown to `Request.signal`, then sends the handler’s `Response` (`:1565`). Router’s Node adapter documents response-side disconnect tracking when the paired response is supplied (`ollama/node_modules/@orkestrel/router/dist/src/server/index.d.ts:23`). Its response writer respects backpressure (`:174`).

   Keep route mounting and server startup in the application or Ollama integration fixtures. Agent must not import `@orkestrel/server`, `@orkestrel/router/server`, or middleware merely to return a standard response.

8. **Naming**

   Keep `AgentProvider`: it is the requested name, fits the package’s `Agent` vocabulary, and is distinct from the governing `ProviderInterface`. Document its HTTP scope.

   Use `AgentProviderOptions`, `AgentProviderInterface<T>`, `ProviderWireInterface<T>`, `ProviderParserInterface<T>`, `ProviderReader`, `RelayProvider`, `RelayWire`, `RelayParser`, `RelayStream`, and `createRelay`.

   All entity members in the proposed contracts are single words. `keepAlive` remains because the naming rule explicitly permits that mirror of Ollama’s `keep_alive` field (`scaffold/.claude/rules/names.md:120`).

   Place classes as follows:

   - `agent/src/core/AgentProvider.ts` — the defining abstract base.
   - `agent/src/core/providers/RelayProvider.ts` — concrete provider extension.
   - `agent/src/core/wires/RelayWire.ts` — concrete wire extension.
   - `agent/src/core/RelayParser.ts`, `ProviderReader.ts`, and `RelayStream.ts` — composed primitives.
   - `ollama/src/core/providers/OllamaProvider.ts`.
   - `ollama/src/core/wires/OllamaWire.ts`.

   Keep types, factories, guards, coercers, errors, and pure projections in the corresponding core-root centralized files. Extension categories receive folders even with a single implementation; their contracts stay at the module root (`scaffold/.claude/rules/architecture.md:232`).

   Search of the existing source found no proposed-name collision in agent or Ollama types. There is an existing agent `joinThinking` with a different signature (`agent/src/core/helpers.ts:377`). Do not move Ollama’s same-named helper over it. Compose the existing helper with empty-carrier handling in the base.

   The resulting Ollama options contract preserves every existing option:

   ```ts
   import type { ProviderOptions } from '@orkestrel/agent'

   export interface OllamaOptions extends ProviderOptions {
   	readonly model: string
   	readonly url?: string
   	readonly keepAlive?: string | number
   	readonly options?: Readonly<Record<string, unknown>>
   	readonly think?: boolean
   }
   ```

   Retain `WireChatRequest` and `OllamaHTTPErrorOptions`. Retire `OllamaResponse`: response/timeout ownership moves into the base and no consumer needs that intermediate bundle (`ollama/src/server/types.ts:18`).

9. **Ecosystem reuse**

   The following rulings cover the proposed symbols and mechanisms.

   | Proposed mechanism or symbol | Ruling and evidence |
   |---|---|
   | `AgentProvider` and wire contracts | New composition of existing provider, timeout, fetch, parser, and splitter contracts. No installed general provider engine was identified. Existing runtime contract: `agent/src/core/types.ts:140`. |
   | `ProviderRequest`, `ProviderFrame`, `ProviderFailure`, option interfaces | New boundary declarations, composed from `Message`, `ToolDefinition`, `ToolCall`, `TokenUsage`, and native HTTP types. Do not redefine the imported domain shapes. |
   | Identity | Use native `crypto.randomUUID`, as Ollama already does at `OllamaProvider.ts:97`. No helper wrapper. |
   | Deadline | Reuse `createTimeout`/`Timeout`; installed declaration: `agent/node_modules/@orkestrel/timeout/dist/src/core/index.d.ts:36`. |
   | Signal composition | Use native `AbortSignal.any`; use the declared abort package when an owned handle is needed. `linkSignal` exists at `agent/node_modules/@orkestrel/abort/dist/src/core/index.d.ts:169`. |
   | Waiting for async headers under cancellation | Instance lifecycle logic in the base. The inspected abort/timeout declarations expose no equivalent abortable-promise runner. A race stops waiting; it cannot cancel an arbitrary hook’s own work. |
   | `ProviderReader` | New shared lifecycle boundary over native streams and `TextDecoder`, serving provider responses and relay requests. Server’s `readBody` overlaps body collection but is Node-face code and is not an agent dependency (`scaffold/guides/server.md:124`; `agent/package.json:72`). |
   | NDJSON and SSE framing | Inject installed parsers directly. No local newline parser, no renamed parser factory (`scaffold/guides/ndjson.md:63`; `scaffold/guides/sse.md:92`). |
   | `RelayParser` | New sequence/envelope validation composed around the injected parser. Its justification is validation and loss detection, not renaming. |
   | Think splitting | Reuse `ThinkSplitter`/`createThinkSplitter` and its authoritative accumulations (`agent/src/core/types.ts:223`). |
   | Result assembly | Move the real Ollama assembly logic into agent as `buildProviderResult`; remove the old implementation and update consumers (`ollama/src/server/helpers.ts:65`). |
   | Thinking join | Reuse agent’s `joinThinking`; handle empty carriers in the owning orchestration. No second same-named implementation (`agent/src/core/helpers.ts:377`). |
   | Vendor message/tool/usage projections | Retain Ollama’s `mapMessages` and `extract*` helpers. They translate vendor fields and therefore add semantics (`ollama/src/server/helpers.ts:28`, `:158`, `:182`). |
   | Relay guards and projections | Compose Contract guards, `attempt`, JSON validation, and cloning. `attempt` is synchronous and does not catch later promise rejection (`agent/node_modules/@orkestrel/contract/dist/src/core/index.d.ts:188`, `:205`, `:532`, `:563`). |
   | `providerRequestToJSON`, `providerResultToJSON`, `relayFrameToJSON` | New domain projections. Existing `agentResultToJSON` cannot substitute: it requires agent `partial` and does not carry provider tools (`agent/src/core/helpers.ts:61`). |
   | `isMessage` | Reuse after correcting its mismatch with `Message`: it currently accepts arbitrary role strings and unvalidated image elements (`agent/src/core/validators.ts:36`; `agent/src/core/types.ts:15`, `:38`). Do not publish a second competing message guard. |
   | Tool guards | Reuse `isToolCall`; layer JSON representability separately. Its `caller` is explicitly unverified context (`agent/node_modules/@orkestrel/tool/dist/src/core/index.d.ts:76`, `:115`). |
   | Budget | Reuse the `TokenUsage` shape. Charging stays in `Agent`; no provider-owned token budget (`agent/src/core/Agent.ts:511`). |
   | Abort errors | Reuse `ProviderAbortError` and `isProviderAbortError` (`agent/src/core/errors.ts:19`, `:47`). |
   | `ProviderError` and guard | New error for shared HTTP/body/limit/protocol failures. Existing `AgentError` belongs to runtime concerns; server HTTP errors cannot become an agent-core import. Preserve Ollama’s own error translation. |
   | `RelayProvider`, `RelayWire`, `RelayStream`, `createRelay` | New composition implementing the requested provider protocol. Native `Response`/`ReadableStream` supply transport; no equivalent installed agent relay was identified. |
   | Auth and CORS | Application can use `createBearer`, `createCors`, or `createDeadline`; those are not added to agent (`scaffold/guides/middleware.md:54`, `:55`, `:58`). Custom-token validation need not use the middleware’s signed-token scheme. |
   | Token minting | Application can use server `signToken`/`verifyToken`; no agent wrapper or token policy (`scaffold/guides/server.md:97`). |
   | Server response encoding | `JSON.stringify(frame) + '\n'` is the native encoding operation. `createStream` and `serializeEvent` encode SSE, not this NDJSON protocol (`scaffold/guides/server.md:65`, `:118`). |
   | Router/server integration | Compose the installed dispatcher and server in the application and tests. No agent dependency. |
   | WebSocket, browser automation, MCP | No production reuse: these solve different protocols or host tasks (`scaffold/guides/websocket.md:8`; `scaffold/guides/browser.md:8`; `scaffold/guides/mcp.md:6`). |

10. **Tests and proofs**

    The base proof uses a real `Response` and controlled byte chunks. Agent’s fixture wire can implement a minimal scripted protocol; it must not reproduce the production parser or provider engine. Actual NDJSON composition is proved in Ollama, where that dependency is declared. This follows the existing canned transport and scripted-provider patterns (`ollama/tests/setupServer.ts:145`; `agent/tests/setup.ts:219`).

    Required deterministic base coverage includes:

    - Concurrent calls with independent parser, splitter, timeout, and accumulators.
    - UTF-8 characters split across byte chunks.
    - Content, native thinking, inline thinking, implicit-open reclassification, tools, and usage.
    - Native unary selection and default stream draining.
    - Header rejection, delayed headers during abort, non-OK responses, unavailable error bodies, and bounded error reads.
    - Missing body, parser failure, reader failure, pre-abort, mid-stream abort, and early return.
    - Timeout clearing and reader cancellation/lock release after success and failure.
    - Terminal result replacement without double-counting.

    Preserve Ollama request/default/options assertions, tolerant malformed-field behavior, unterminated tail recovery, conformance, and live suites. Root TypeScript checking is the meaningful conformance gate; Vitest execution alone does not validate `expectTypeOf` assertions (`ollama/tests/conformance.test.ts:7`).

    Prove the relay in layers:

    - Agent: authorization refusal before provider invocation, request validation, frame/result projection, pull-driven iteration, cancellation races, and terminal-state rules.
    - Ollama deterministic integration: real `RelayProvider` → real router/server → real `OllamaProvider` → protocol-faithful daemon fixture.
    - Ollama service: the same composition against the warmed real daemon, following `tests/service/transport.test.ts`.
    - Credential separation: distinct fixture custom and upstream credentials; assert their respective HTTP hops. The existing test’s absence of a real credential cannot establish swapping.
    - Abort propagation: wait for an observed streamed delta, cancel, and observe the server provider’s signal and downstream connection closure. Separately prove an upstream abort frame while the response remains open.
    - Tool round trip: definitions, returned calls, and a subsequent tool-result message cross the relay without execution inside the handler.
    - Corruption: invalid envelopes, sequence gaps, missing terminal frames, unsupported version, and oversized bodies fail as documented.

    Core-scoped TypeScript checking and the bound fetch receiver are necessary portability evidence, not proof of browser execution. The existing “browser” service test runs under Node (`ollama/vite.config.ts:137`).

    Do not add an unused browser source face just to obtain a Vitest project. Use an actual Chromium consumer smoke through the available browser harness, loading built public exports and driving direct and relay requests. Record fetch binding, CORS requirements, deltas, and cancellation. A persistent browser test project or added automation dependency requires the scope/dependency decision listed under Tensions.

11. **Guide and parity impact**

    Revise agent’s contract-only claim in the introduction, Surface, Methods introduction, and contract clause 2 (`agent/guides/agent.md:18`, `:590`, `:806`).

    Update clauses 3–6 to distinguish raw-wire splitting, already-separated relay deltas, authoritative terminal results, base deadlines, and locally recoverable versus remotely reported abort partials (`:807`–`:810`). Keep the bounding pattern and add the shared base’s own deadline behavior (`:848`).

    Add Surface rows for every introduced type, class, error/guard, factory, and projection. Add Methods tables for `AgentProviderInterface`, `ProviderWireInterface`, `ProviderParserInterface`, and `ProviderReaderInterface`. `RelayStreamInterface.response` is a data property, not a method.

    Ollama gains:

    - Core import/build provenance.
    - Inheritance and wire ownership.
    - Direct browser and transparent-proxy examples.
    - A separate agent-relay example showing `RelayProvider` in the browser and `OllamaProvider` on the server.
    - Honest authentication, CORS, and abort limitations.

    Ollama loses ownership claims and Surface rows for extracted mechanics and `OllamaResponse`. Update the `parseBody` signature if retained. Preserve the vendor protocol and options documentation.

    Replace `process.stdout`/`process.stderr` in portable examples with host-independent observation, or label those examples as Node-specific (`ollama/guides/ollama.md:46`; `agent/guides/agent.md:37`).

    Update guide inventories and executable parity tests, including inherited method discovery. Do not suppress missing-method or stranded-export findings (`ollama/tests/guides.test.ts:19`, `:81`; `scaffold/.claude/rules/documentation.md:29`, `:58`).

12. **Publish and blast radius**

    Publish agent before Ollama. Local manifests are agent `0.0.21` and Ollama `0.0.15`; Ollama requires agent `^0.0.21` (`agent/package.json:3`; `ollama/package.json:3`, `:75`).

    Propose agent `0.0.22`, then Ollama `0.0.16` with agent `^0.0.22`, subject to checking registry availability and the release workflow. These are proposed versions, not reserved versions. Record the extracted/removed public exports and changed parser signature as release changes.

    A `^0.0.21` range does not admit `0.0.22`; the consumer range and resolution must change. The alignment skill explicitly requires checking `0.0.x` range behavior (`scaffold/.agents/skills/orkestrel-align-packages/references/fleet.md:17`).

    Before agent publishes, validate Ollama against an installed packed agent artifact in an isolated consumer. Do not substitute a source alias or symlink for package-consumption proof. After publication, restore registry resolution and rerun the dependent checks (`scaffold/.agents/orchestration.md:810`, `:827`).

    Toolbox’s later owning campaign must repin agent, run its gates, and apply the runtime-dependency release rule. Its manifest has a runtime edge even though the searched source contains no direct provider use (`toolbox/package.json:86`; `scaffold/.agents/orchestration.md:842`). Do not edit toolbox here.

    Supervisor’s lagging agent/Ollama development dependencies remain context only (`supervisor/package.json:115`, `:123`).

## Design

## Alternatives

## Constraints

- **The runtime contract stays usable independently of the base.** `Agent` consumes `ProviderInterface`, calls `stream`, and returns its terminal result. Requiring all providers to inherit from the HTTP engine would narrow an existing contract (`agent/src/core/types.ts:140`; `agent/src/core/Agent.ts:729`).

- **The relay cannot serialize the complete in-process value space.** Open records and `ToolCall.caller: unknown` admit non-JSON values. The transport must document and enforce a representable subset; it cannot promise transparent arbitrary-object transfer (`agent/src/core/types.ts:121`; `agent/node_modules/@orkestrel/tool/dist/src/core/index.d.ts:126`).

- **Context format stays local.** `ContextFormat` can contain render functions. It is configuration for prompt assembly, not a transferable response capability (`agent/src/core/types.ts:439`; `ollama/src/server/OllamaProvider.ts:117`).

- **Remote abort does not automatically mean an agent run resolves partially.** `Agent` handles an error as cancellation only when its own bound signal is aborted. Otherwise it rethrows, including a remote `ProviderAbortError` (`agent/src/core/Agent.ts:478`, `:506`). Preserve and document that distinction.

- **Final provider content can differ from live concatenation.** Think splitting permits implicit-open reclassification. Relay terminal results must survive unchanged; delta concatenation is not a universal integrity assertion (`agent/src/core/types.ts:205`; `ollama/guides/ollama.md:114`).

- **Core is the correct relay placement.** Its allowed web interoperability APIs cover the handler. Importing a Node server implementation would violate the environment boundary (`scaffold/.claude/rules/workspace.md:202`; `scaffold/AGENTS.md:30`).

- **Authorization precedes work.** The handler must finish authorization and request validation before creating/driving the real provider iterator. Credentials and provider selection remain server configuration, following the policy boundary at `scaffold/AGENTS.md:73`.

- **Backpressure must reach iterator advancement.** Use one awaited `next()` per response pull; do not collect the whole provider stream before responding. Existing prior art establishes this structure (`supervisor/app/server/InferenceStream.ts:47`).

- **Bounds must cover waiting and collection separately.** Passing a timeout signal to fetch does not interrupt an unrelated unresolved headers promise. Truncating `response.text()` afterward does not bound body collection (`ollama/src/server/OllamaProvider.ts:360`, `:370`).

- **Existing source is not authority where it disagrees with types.** The message guard’s broad role and image checks are insufficient for the relay boundary (`agent/src/core/validators.ts:38`, `:42`; `scaffold/AGENTS.md:9`).

- **No new runtime dependency is necessary.** Agent can own the structural parser seam and NDJSON encoder while callers supply the parser. This preserves the manifest constraint (`agent/package.json:72`; `scaffold/AGENTS.md:43`).

## Refusals

- Refuse protected-hook inheritance: “**NEVER** write `public`, `protected`, or `private` on a class member” (`scaffold/AGENTS.md:46`). Use constructor composition and `#` state.

- Refuse an automatic NDJSON/SSE dependency: “**NEVER** add an npm package unless the user explicitly requests it” (`scaffold/AGENTS.md:43`). Require parser injection unless that decision changes.

- Refuse a speculative process-provider hierarchy: “Add or substantively expand a capability with its first real consumer; do not speculate” (`scaffold/AGENTS.md:71`).

- Refuse copying supervisor application code into published source: “Published source never imports private app code” (`scaffold/AGENTS.md:33`). Its relay is evidence, not authority.

- Refuse compatibility barrels and rename-only wrappers: “No compatibility shims. This is greenfield. Update every consumer in the same change” (`scaffold/AGENTS.md:72`). Extracted symbols are imported from their owning package.

- Refuse a local replacement for the installed framing parsers: “Never reimplement or rename-wrap a declared package primitive” (`scaffold/.claude/rules/patterns.md:20`).

- Refuse mocks of the provider/server stack: “Use real implementations, recorders, temporary resources, protocol-faithful fixture servers, and inert customizable data stubs” (`scaffold/AGENTS.md:48`).

- Refuse weakened parity to hide migration drift: “A parity failure identifies drift; never suppress or weaken the test” (`scaffold/.claude/rules/documentation.md:34`).

- Refuse edits or executions in this design lane: “Perform the assignment directly and spawn nothing. Edit nothing” and “neither lane installs, edits, formats, builds, or runs a suite” (`scaffold/tmp/units/design-brief.md`, Role and Tools and limits). Only source inspection and the permitted scoped no-emit checks were performed.

## Measurements

The supplied readings and their limits are recorded here. Where the brief supplies no command, no command is attributed to the Orchestrator.

| Reading supplied by the brief | Supplied command or provenance | Design consequence |
|---|---|---|
| Agent publishes core; Ollama publishes server | Manifest/config inspection; command not supplied | Agent placement is ready; Ollama needs an environment migration. |
| `17` Ollama test files match `@src/server` | `grep -rl "@src/server" ollama/tests \| wc -l` | This is a text-match population, not an import count. Preserve vendored negative-control strings. |
| Named provider dependencies publish core faces | `grep -n '"\./' ollama/node_modules/@orkestrel/{timeout,ndjson,agent,budget,tool,contract}/package.json` | Their export locations permit core composition. |
| Timeout and NDJSON entry bundles contain no `node:` match | `grep -c "node:" .../dist/src/core/index.js` for each | Supports those inspected entries only; it is not a complete browser execution proof. |
| Router handler/dispatcher return standard responses | Installed declaration paths supplied; inspection command not supplied | Agent-core handler can be mounted without a Node adapter in agent. |
| NDJSON and SSE expose different parser result types | Installed declaration paths supplied; inspection command not supplied | Use a generic structural parser seam. |
| Agent calls provider stream rather than provider generate | Runtime source locations supplied; command not supplied | Preserve the interface and terminal iterator value. |
| Toolbox has no provider-use matches in the searched paths | `grep -rn "ProviderInterface\|ProviderResult\|ProviderDelta\|createOllama\|OllamaProvider" toolbox/src toolbox/app` | No provider-code migration is established; its runtime dependency still needs later adoption. |
| Checkouts were clean at session start | `git status --short` | Baseline only; later work must re-read state. |

This lane additionally ran the following checks:

| Command | Observed result and coverage |
|---|---|
| In `agent`: `node node_modules/typescript/bin/tsc --noEmit -p configs/src/tsconfig.core.json` | Exit `0`, no diagnostics. Proves the unchanged core source’s scoped typecheck. |
| In `ollama`: `node node_modules/typescript/bin/tsc --noEmit -p configs/src/tsconfig.server.json` | Exit `0`, no diagnostics. Does not prove the proposed core migration. |
| `rg -l '@src/server' ollama/tests` followed by source inspection | Confirms the match population includes config-test strings that are not imports. |
| Installed manifest reads under `ollama/node_modules/@orkestrel` | Agent `0.0.21`, Contract `0.0.17`, NDJSON `0.0.10`, Timeout `0.0.10`, Router `0.0.14`, Server `0.0.19`. |
| Per-checkout `git -c safe.directory=<exact checkout> -C <checkout> status --short` and `branch --show-current` | Branches reported `main`; agent, Ollama, and supervisor showed no changes. Scaffold showed untracked `.orkestrel/`. Git warned that the sandbox could not read the user ignore file. No Git configuration was written. |
| Provider-name search in `toolbox/src` | No matches. `toolbox/app` is absent in this tree; the broader supplied search cannot be treated as an inspected application population. |

The proposal itself has not been compiled, built, or behaviorally executed. These are source-review conclusions, not implementation audit verdicts.

## Units

The campaign exits when C1–C5 close: the shared base, Ollama adoption, browser use, authenticated streaming relay with cancellation, and aligned documentation/tests/releases. Nothing wider closes or extends this campaign.

Serialize writers in each checkout. Each implementation unit applies the named hardening skill. Audit lanes are `reviewer` on Opus 5 for design fit and `analyst` on GPT 6 Astra for correctness; add the mechanical checker for ownership, discovery, exports, and parity. A fix receives review from an engine that did not write it.

| Unit | Role and engine | Checkout; owned and shared files | Dependencies | Independently checkable acceptance |
|---|---|---|---|---|
| **Agent provider engine** | `sol` on GPT 6 Astra | `agent`; own `src/core/AgentProvider.ts`, `ProviderReader.ts`, mirrored tests. Shared: `types.ts`, `constants.ts`, `helpers.ts`, `errors.ts`, `index.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `guides/agent.md`, `tests/guides.test.ts`. | Orchestrator rules on the proposed contracts. | Types precede implementation; a fixture wire drives the real engine; unary/default generation, splitting, bounds, abort partials, concurrency, and cleanup pass targeted proofs. No framing dependency. Core scope passes. Audit: subjective, objective, mechanical. |
| **Agent relay** | `sol` on GPT 6 Astra | `agent`; own `providers/RelayProvider.ts`, `wires/RelayWire.ts`, `RelayParser.ts`, `RelayStream.ts`, mirrored tests. Shared: core types, factories, validators, helpers, errors, constants, barrel, setup, guide, parity tests. | Agent provider engine. | Authorization gates dispatch; complete tool-capable request and terminal-result projection; JSON refusal is explicit; sequence/EOF checks; remote abort and local cancellation differ correctly; pull/cancel races leave no owned iterator or listener active. Correct `isMessage` with red/green proofs. Core scope passes. Audit: subjective, objective, mechanical, with auth/serialization/cancellation attacks. |
| **Stage agent artifact** | `builder` on Sonnet | `agent`; generated build/pack outputs and an external staging script/receipt only; no production source ownership. | Agent implementation units accepted. | Pack the exact accepted source, record its identity, and supply an installable artifact for the isolated Ollama consumer. No source aliases or links. Audit: mechanical checker; verifier independently reads resolution evidence. |
| **Ollama core migration and adoption** | `sol` on GPT 6 Astra | `ollama`; own moved `src/core/**`, `providers/OllamaProvider.ts`, `wires/OllamaWire.ts`, moved source tests, target wrappers. Shared: `package.json`, `vite.config.ts`, `tsconfig.json`, source centralized files, setup files, conformance, guide, parity tests; guide inventory and lockfile only after the scope ruling. | Accepted agent artifact; environment/scope decisions. | Ollama extends the base and retains every option/default and native `stream: false` behavior. No duplicated timeout/fetch/decoder/splitter/result mechanics. Core check passes; hermetic and conformance proofs pass; test discovery follows moved paths. Vendored files remain untouched. Audit: subjective, objective, mechanical. |
| **Relay integration and browser proof** | `sol` on GPT 6 Astra | `ollama`; own relay integration tests and `tests/service/relay.test.ts`. Shared: `tests/setup.ts`, `setupServer.ts`, `setupService.ts`, setup proofs, provider/service transport tests, guide examples. | Ollama adoption. | Real server/provider round trip passes against a fixture and the live daemon. Custom/upstream credentials are observed on their proper hops. Client abort reaches the daemon-facing request. Tool, thinking, usage, and terminal values survive. Actual Chromium smoke executes the built public exports. Audit: subjective, objective, mechanical, with protocol/auth/abort attacks. |
| **Agent guide closure** | `implementer` on Opus 5 | `agent`; `guides/agent.md`, `README.md`, `tests/guides.test.ts`; TSDoc in introduced public declarations is shared with earlier units and edited serially. | Integration findings available; agent writers finished. | Contract-only prose removed; complete Surface/Methods parity; executable examples prove base/relay behavior and limits; no promise of unseen remote partial data. Audit: objective, subjective independent review, mechanical parity checker. |
| **Ollama guide closure** | `implementer` on Opus 5 | `ollama`; `guides/ollama.md`, `README.md`, `tests/guides.test.ts`, approved `guides/README.md`; serial TSDoc changes. | Ollama integration accepted. | Core provenance and migration links are correct; portable examples run; transparent proxy and provider relay are distinguished; authentication and browser claims match executed evidence. Audit: objective, subjective independent review, mechanical parity checker. |
| **Release preparation** | `builder` on Sonnet | Serialized `agent`, then `ollama`; own version/range edits in manifests and approved lockfiles; external pack/install scripts and receipts. | Documentation and implementation accepted; release versions checked. | Proposed bumps reconciled with registry availability; resolved graph names the intended agent artifact; public removals recorded; temporary overrides have a restoration path. No publish occurs in this design lane. Audit: mechanical checker and independent verifier. |
| **Agent gate chain** | `verifier` on Sonnet | `agent`; writes no source. Generated gate outputs only. | Final agent tree fixed. | Run `format:check` → `lint:check` → `check` → `build` → `test`, then release-mode distribution proof. Inspect built ESM/CJS exports and declarations. Report exact exits and failures without fixes. Audit: mechanical evidence review. |
| **Ollama gate chain and release order** | `verifier` on Sonnet | `ollama`; writes no source. Generated gate outputs only. | Agent gates; final Ollama tree; registry agent adoption after its authorized publication. | Run the same gate chain, conformance through the declared chain, release-mode distribution, and `test:service` with readiness required. Inspect core artifacts and browser receipt. Ollama publishes only after agent and final registry-resolution verification. Audit: mechanical evidence review and final cross-package subjective/objective review. |

The manifest gate contracts are at `agent/package.json:66` and `ollama/package.json:68`. Missing live-service readiness is a failed required proof, not a skip.

## Tensions

- **Hybrid inheritance/composition:** the objective ruling keeps the requested abstract superclass but supplies its wire by composition. Challenge whether the public readonly `wire` property is useful enough to expose; hiding the constructor-supplied object would reduce the interface while retaining extension through construction.

- **HTTP scope of `AgentProvider`:** the selected base is host-independent and HTTP-specific. The Orchestrator must settle whether that naming accurately expresses C1. A process hierarchy is not justified by a writable consumer in this campaign.

- **Parser injection:** no new agent dependency is required. Accepting a required parser factory on `RelayOptions` is the chosen cost. Adding `@orkestrel/ndjson` instead is a user dependency decision, not an implementation convenience.

- **Environment change:** approve the Ollama server-to-core migration as the route to C3. Its public root specifier remains unchanged, but published paths, scopes, scripts, and source locations change.

- **Change-list omissions:** the migration requires `ollama/guides/README.md`; release/range alignment requires the package lockfiles. These paths are absent from the brief’s may-change list. Expand those exact paths before dispatching their writers; do not disguise the edits as incidental generated output.

- **Public extraction changes:** no existing Ollama option is removed. `OllamaResponse`, exported generic assembly helpers/constants, and the `parseBody(Response)` signature need an explicit removal/move ruling. Compatibility shims are forbidden, but the release must still name the changes.

- **Resource limits:** retain Ollama’s successful-response behavior by default. Give relay request/response collection finite configurable limits; suggested defaults are `1_048_576` request bytes and `16_777_216` response bytes. These are design choices requiring review against image/tool-result workloads, not measured requirements.

- **JSON subset:** arbitrary `caller`, schema, or argument objects cannot cross this protocol. The selected behavior rejects unrepresentable values. Supporting a codec for a wider value space is not included.

- **Browser evidence:** core checking and fetch binding do not close a literal browser-runtime claim. The selected route uses an existing real-browser harness without adding a published browser face. A durable automated browser project may require a development dependency and configuration scope expansion.

- **Abort result strength:** a disconnected client receives only its locally available partial. A separate cancellation/acknowledgment protocol would be required to promise the server’s settled partial after client cancellation; that mechanism is outside the selected design.

- **Version availability and baseline artifact:** the brief supplies local versions, not registry availability or a comparison with the published tarballs. The release owner must measure these before assigning final versions.

- **Measurement provenance:** several supplied readings have file paths but no Orchestrator command. Preserve them as supplied inspections; request command receipts if the campaign requires reproducible baseline records.

- **Routing vocabulary:** the brief explicitly routes `sol` to GPT 6 Astra. The orchestration file still names GPT-5.6 Sol (`scaffold/.agents/orchestration.md:33`). Follow the dispatch-specific engine choice and record it in the routing ledger.

## Risks

- **Missing or duplicated final values:** a relay can accidentally discard generator return values or append the terminal result twice. Settle with independent fixtures containing different live and final content, tools, thinking, and usage.

- **Think reclassification at the runtime boundary:** preserving the provider’s authoritative result does not establish that every `AgentResult.content` path reconciles previously emitted content. The runtime accumulates deltas separately (`agent/src/core/Agent.ts:461`). Prove direct-versus-relayed parity and isolate any runtime defect against C2/C4 before changing the loop.

- **Abort while an iterator is suspended:** `return()` may wait behind a pending `next()`. Signal upstream before returning, and test disconnect during provider wait, response pull, and backpressure.

- **Non-cooperative custom hooks or transports:** a timeout can stop the base waiting but cannot forcibly terminate arbitrary user code. Document signal cooperation and test late transport resolution without retaining its response body.

- **NDJSON loss and growth:** malformed lines are silently skipped and unfinished lines can grow. Sequence checks and byte limits address lost numbered frames and resource growth; they do not turn the injected parser into a strict syntax validator.

- **Credential leakage through errors:** vendor errors can include sensitive response text. The relay must emit fixed public error messages rather than serialize arbitrary exceptions, headers, stacks, or causes. Test with credential-shaped fixture errors.

- **Foreign-value narrowing:** existing message validation is weaker than the type; exact JSON cloning is stricter than general structural TypeScript values. Prove those boundaries separately and state the transport restriction on the relay.

- **Migration proof accidentally targets stale code:** aliases, staged packages, or stale `dist` can make checks pass against the wrong implementation. Record resolved package identity and import every built public entry.

- **Browser overclaim:** a Node service test named “browser” is not browser evidence. Require the Chromium receipt before closing C3.

- **Scope drift through tooling:** blanket scaffold repair, catalog refresh, or dependency installation can touch excluded files. Use explicit ownership and compare the actual changed paths before accepting a unit.

- **Unproven proposal:** only existing scoped typechecks ran in this lane. Implementation, negative controls, live service, browser behavior, package distribution, and the release gate chain remain acceptance work for the routed units.