<!-- planner on Claude Opus 5, native subagent, clean context; returned 2026-09-14 19:31Z after 836 s; immutable blind report, copied verbatim from the subagent's returned text (the harness wrote no transcript file) -->

Lane: subjective

## Answers

**1. Base shape.** An **abstract class `AgentProvider` a concrete provider `extends`**, not a composed engine. The rules decide it, not deference to the ask. `.claude/rules/documentation.md` § Parity requires "Each implementing class exposes exactly its interface methods—no missing or extra public behavior", and `.claude/rules/architecture.md:162,174` bans a public method that "exists only to forward 1:1 to a helper". A composed engine leaves two outcomes: delete `OllamaProvider` (a documented public class, `ollama/guides/ollama.md:67`) and return an engine instance from `createOllama`, or keep `OllamaProvider` as a 1:1 forwarder of `generate`/`stream` — the banned wrapper. Inheritance has neither cost, and `AGENTS.md` bans `public`/`protected`/`private` and parameter properties but not `abstract`, not inheritance.

Because there is no `protected`, every base↔subclass seam is public. I minimise that surface with one rule: **a seam whose value is fixed per class is a constructor input passed to `super`; a seam that must see per-call arguments is an abstract member.**

Subclass-filled seams:

| Seam | Form | Ollama's value |
| --- | --- | --- |
| `url` | `AgentProviderInput` | `options.url ?? DEFAULT_OLLAMA_URL` |
| `path` | `AgentProviderInput` (optional) | `OLLAMA_CHAT_PATH` (`'/api/chat'`) |
| `frame` | `AgentProviderInput` — a per-stream parser factory | `createNDJSONParser` |
| `name` | abstract readonly data member | `'ollama'` |
| `body` | abstract method | the `WireChatRequest` JSON |
| `read` | abstract method — one wire record → `ProviderIncrement` | `extractContent`/`extractThinking`/`extractTools`/`extractUsage` |

Base-owned mechanics: `id` (`crypto.randomUUID()`, `ollama/src/server/OllamaProvider.ts:97,133`), `format` passthrough (`:154`), the `Timeout` + `AbortSignal.any([timeout.signal, signal])` deadline (`:354-356`), the `fetch`/`headers` transport seam with `Content-Type` seeded first (`:402-408`), POST and non-OK → bounded-body error (`:358-383`), `response.body` reader + `TextDecoder({stream:true})` + parser fold + unterminated-tail flush (`:232-275`), the per-call `ThinkSplitter` and delta yielding (`:247,327-335`), partial-on-abort `ProviderAbortError` (`:283-290`), result assembly (`:306`), reader cancel and `timeout.clear()` (`:293-305`), and `generate` by draining `stream`.

The `types.ts` contract is under `Design`.

**2. Layers.** **One base.** A transport-agnostic layer above the HTTP engine would own exactly one concrete thing — `generate` implemented by draining `stream` — and its only prospective consumer is supervisor's process-shaped `CLIProvider` (`supervisor/app/server/CLIProvider.ts:94-105`), which the brief puts off-limits and out of scope. `AGENTS.md` § Design laws: "Add or substantively expand a capability with its first real consumer; do not speculate." The split stays available later at zero break: the public members do not move when a `ProviderBase` is extracted above `AgentProvider`, so the future refactor is additive. Recorded under `Risks`.

**3. `generate`.** The base implements `generate` by draining its own `stream`, and a concrete provider overrides it **only** for a genuine native non-stream mode. This mirrors the runtime one layer up: `Agent.generate()` drains `stream()` (`agent/src/core/Agent.ts:166-171`) and `agent/guides/agent.md:815` clause 11 states the invariant that makes them un-divergeable.

`OllamaProvider` takes the override, because `stream: false` is a real daemon mode with a different request body and a single-JSON response (`ollama/src/server/OllamaProvider.ts:182-197`), it is documented (`ollama/guides/ollama.md:31`), and its request shape is pinned by the hermetic suite. The override is small because the base exposes `request` publicly: `this.request(messages, false, signal, tools, options)` → `parseBody` → `read` → `buildResult`. `provider.generate` stays load-bearing in the contract regardless — the summarizer seam calls it (`agent/guides/agent.md:218-235`, `agent/src/core/factories.ts:86`) and the loop never does.

**4. Framing seam.** A structural parser interface in agent `types.ts`, supplied by the subclass as the `frame` input, with **one type parameter**:

```ts
export interface ProviderParserInterface<TRecord = Readonly<Record<string, unknown>>> {
	parse(chunk: string): readonly TRecord[]
	clear(): void
}
```

The parameter is not speculation — it is required for the interface to be true. Measured: `NDJSONParserInterface.parse(chunk: string): ReadonlyArray<Record<string, unknown>>` plus `clear()` (`ollama/node_modules/@orkestrel/ndjson/dist/src/core/index.d.ts:71,78`), while `SSEParserInterface.parse(chunk: string): readonly SSEEvent[]` plus `flush()`/`clear()` (`.../sse/dist/src/core/index.d.ts:237,250`). The element types differ, so a non-generic interface cannot admit both. With the parameter, NDJSON satisfies `ProviderParserInterface<Record<string, unknown>>` and SSE satisfies `ProviderParserInterface<SSEEvent>` today, structurally, with no agent dependency on either package.

**5. Environment.** `AgentProvider`, `RelayProvider`, `RelayStream`, and `createRelay` all live in `@orkestrel/agent` `src/core` — agent publishes core only (`agent/package.json:29-40`) and uses nothing outside `lib: ["ESNext","WebWorker"]`. **`@orkestrel/ollama` moves from a server face to a core face.** It is already host-independent: `grep -n "node:|process\.|Buffer" ollama/src` returns no matches, and every package it imports publishes a core face. A second face would be two publications of one class with nothing server-specific in either — a superfluous split.

What the move touches: `src/server/**` → `src/core/**` (8 files); `tsconfig.json:24` alias `@src/server` → `@src/core`; `package.json` `main`/`module`/`types`/`exports` (`:26-38`) and the `check:src:*`, `build:src:*`, `test:src:*` scripts (`:51-58,66-67`); `configs/src/tsconfig.server.json` → `tsconfig.core.json` with `lib: ["ESNext","WebWorker"]`, `types: []`; `configs/src/vite.server.config.ts` → `vite.core.config.ts`; `vite.config.ts:32-64` `srcServer` → `srcCore` (label, include glob, `outputBoundary('dist/src/core')`, `environmentBoundary('src/core')`, drop `platform: 'node'`); `tests/src/server/**` → `tests/src/core/**` (5 files); and the `@src/server` import in 16 authored test files. `tests/config.test.ts` also matches the grep but is vendored and uses `'@src/server'` only as a literal argument to the vendored `environmentSourceError` helper (`:2087,2144`) — it is unaffected.

The published specifier `@orkestrel/ollama` does not change, so **no consumer import changes**; only the internal `dist` path moves.

The fixture servers keep running: `createRecordingProxy` (`ollama/tests/setupServer.ts:191-238`) is test infrastructure, not source, and Vitest runs the `src:core` project in Node. The one open question is whether `src:core` may name `setupServer.ts` in its `setupFiles` — `.claude/rules/workspace.md` § Test project matrix lists `setup.ts` alone for `src:core`. Named under `Tensions`.

**6. Relay protocol.** **Both (c), because they are different layers, not rivals.**

(a) The transparent wire proxy already works with zero new code and is proven end to end against a live daemon (`ollama/tests/service/transport.test.ts:22-107`, `ollama/guides/ollama.md:169-187`). It stays, documented. What it cannot do: hide the vendor from the browser, relay a provider whose wire the browser must not learn, or let one endpoint serve several vendors.

(b) The **agent-level relay** is the new mechanism and the answer to C4. Its wire is `ProviderInterface` itself, serialized:

- Request body: `RelayRequest` = `{ messages, tools?, options? }`. It carries `Message` verbatim (ids included), not `MessageInput`, so nothing is minted or lost mid-hop — supervisor had to stamp positional ids because it chose the narrower type (`supervisor/app/server/helpers.ts:383-388`). It carries no `stream` flag: the relay always streams, and `generate` is the drain, which deletes supervisor's unary branch (`supervisor/app/server/ApplicationHandlers.ts:238-241`).
- Response: NDJSON, one `RelayFrame` per line, discriminated on the **same** axis a delta already uses:

```ts
export type RelayFrame =
	| ProviderDelta
	| { readonly channel: 'settle'; readonly result: ProviderResult }
	| { readonly channel: 'abort'; readonly partial: ProviderResult }
	| { readonly channel: 'error'; readonly code: string; readonly message: string }
```

A content or thinking delta rides the wire as itself — no projection on either side. Supervisor's hand-rolled vocabulary re-wrapped each delta in `{ event: 'delta', delta }` (`supervisor/app/core/types.ts:51-59`); this removes that layer and keeps one discriminant name (`channel`) for one concept, as `AGENTS.md` § Design laws requires.

- Abort crossing the hop: the browser's `AbortSignal` bounds its `fetch`; the server handler links `request.signal` to the upstream provider's signal and calls `iterator.return()` on body cancel, exactly the shape `supervisor/app/server/InferenceStream.ts:31-32,68-79,91-93` proved. A **server-initiated** abort (server deadline or budget) while the browser is still reading writes an `abort` frame; `RelayProvider.read` throws `ProviderAbortError(partial)` on it, and the base's existing `catch` rethrows because its own `combined` signal is not aborted (`ollama/src/server/OllamaProvider.ts:283-292`). The partial therefore reaches the caller through the contract's own error, with no second mechanism.
- `usage` and `thinking` survive because they ride on `settle.result`. This is load-bearing: reasoning separated from in-content `<think>` spans has **no** delta channel (`agent/src/core/types.ts:97-99` admits only `content` and `thinking`; `ollama/src/server/OllamaProvider.ts:330-333` states the same), so a relay that reassembled content from deltas alone would silently drop the model's reasoning for every in-content thinking model. The `settle` frame is the only honest carrier.
- Policy stays in the application on both sides: the browser uses the base's existing `headers` hook to attach whatever token it holds (`ollama/src/server/types.ts:123-134`), and the server takes a required `authorize(request): boolean | Promise<boolean>`. Minting, validating, identity, and rate limiting are the app's, composed in front as ordinary `@orkestrel/middleware`.

What (b) cannot do: serve a browser that wants the vendor's own wire, or pass vendor-specific request fields the contract has no member for (Ollama `keep_alive`, sampling `options`) — those are the server-side provider's construction, which is correct.

**7. Server-side placement.** A host-independent `RelayHandler = (request: Request) => Promise<Response>` in agent **core**. It needs only `Request`, `Response`, `ReadableStream`, and `TextEncoder`, all inside `lib.webworker`. `@orkestrel/router` mounts it unchanged: `RouteHandler<Path, TState> = (request: Request, context: RouteContext<Path, TState>) => Response | Promise<Response>` (`ollama/node_modules/@orkestrel/router/dist/src/core/index.d.ts:948`) — a one-parameter function is assignable — and `DispatcherInterface.handle(request: Request, state: TState): Promise<Response>` (`:470`) is what `@orkestrel/server` drives. The exact composition is already exercised in this fleet: `createDispatcher` + `createServer` returning `new Response(body, …)` (`ollama/tests/setupServer.ts:196-227`). **No Node face.**

**8. Naming.** `AgentProvider` is both the user's name and the rule-correct one, for a reason worth stating: this package's convention is class = interface minus `Interface` (`Agent`/`AgentInterface`, `ThinkSplitter`/`ThinkSplitterInterface`, `Conversation`, `Scope`, `Authority`, `AgentRegistry`). The base's public surface is strictly larger than `ProviderInterface` (it adds `request`, `body`, `read`), so it needs its own interface — and `ProviderInterface` is taken by the contract. A bare `Provider` would therefore be a class whose same-named interface means something else. `AgentProvider` + `AgentProviderInterface` + `AgentProviderOptions` + `AgentProviderInput` is the only consistent set.

| Symbol | Form | Why |
| --- | --- | --- |
| `AgentProvider` | abstract class, `src/core/providers/` | entity + sibling implementation ⇒ plural folder (`.claude/rules/architecture.md:215`) |
| `AgentProviderInterface` | `{Entity}Interface` | the base's full surface |
| `AgentProviderOptions` | `{Entity}Options` | what a caller may set: `timeout`, `fetch`, `headers`, `format` |
| `AgentProviderInput` | `{Entity}Input` | what a subclass hands `super`: `url`, `path?`, `frame` |
| `ProviderParserInterface` | `{Entity}Interface` | generalizes `NDJSONParserInterface`, same word |
| `ProviderIncrement` | `{Entity}{Noun}` | `increment` is already this codebase's word for it (`ollama/src/server/OllamaProvider.ts:260`) |
| `ProviderResponse` | `{Entity}{Noun}` | `OllamaResponse` (`ollama/src/server/types.ts:18`) promoted to its owner |
| `ProviderHTTPError` / `isProviderHTTPError` | error + guard | acronym case per `.claude/rules/names.md:130` |
| `RelayProvider` / `RelayProviderOptions` | class + options | the browser half |
| `Relay` seam: `createRelay` / `RelayOptions` / `RelayHandler` | factory + options + function type | the server half |
| `RelayStream` / `RelayStreamOptions` | class + options | one request's pull-driven body |
| `RelayRequest` / `RelayFrame` | `{Entity}{Noun}` | the wire bodies |

Seam members `body`, `read`, `request`, `frame`, `path`, `url`, `name`, `format`, `authorize`, `provider` are each one word and each survives the compound test in `.claude/rules/names.md:36-49`.

**9. Ecosystem reuse.** Rulings against the installed line:

- `Timeout` — **reuse** `@orkestrel/timeout` (already `agent/package.json:79`). No wrapper.
- Deadline + cancel fold — **reuse** the platform `AbortSignal.any`. `@orkestrel/abort` (`agent/package.json:73`) supplies `createAbort`/`linkSignal` for owning a controller; the base owns none, so no import.
- Wire narrowing in `RelayProvider.read` and `parseRelay` — **reuse** `@orkestrel/contract` `isRecord`/`isString`/`parseJSONAs` (`agent/package.json:75`, already used at `agent/src/core/validators.ts`). No local guards.
- Relayed `calls` narrowing — **reuse** `isToolCall` from `@orkestrel/tool`.
- `ProviderParserInterface` — **new declaration, no implementation.** `@orkestrel/ndjson` and `@orkestrel/sse` keep supplying the parsers; agent declares only the contract, so this is not a rename wrapper.
- NDJSON **encoding** — none published (ecosystem distillate, § 4: "NDJSON encode: none published"). `JSON.stringify(frame) + '\n'` inline; no package, no helper.
- `ProviderHTTPError` — **new.** The line's only HTTP error narrower is `isHTTPError` from `@orkestrel/server` (server-only), which agent core may not import.
- `buildResult` — **moved, not new**: `ollama/src/server/helpers.ts:65-81` is provider-generic and builds a type agent owns. It goes to `agent/src/core/helpers.ts`.
- `joinThinking` — **a real collision to fix at the owner.** Agent exports `joinThinking(running: string | undefined, next: string)` (`agent/src/core/helpers.ts:377-379`); ollama exports a different `joinThinking(splitter, wired)` (`ollama/src/server/helpers.ts:136-140`). They disagree on empty input: agent's returns `'\n\nx'` for `('', 'x')`, ollama's returns `'x'`. Widen agent's to treat `''` like `undefined` on both sides, then delete ollama's and call `joinThinking(splitter.thinking, wired)`. Agent's own callers (`Agent.ts:481,509`) never pass `''` today, because `buildResult` omits empty `thinking`, so the widening is behaviour-preserving there.
- `RelayStream` vs `Channel` (`agent/src/core/Channel.ts`) — **not reuse.** `ChannelInterface` is push-driven (`push`/`close`/`fail`/`drain`); draining a provider stream into it and piping to a `ReadableStream` discards backpressure, so the provider races ahead of the socket. `ReadableStream`'s `pull` is the backpressure mechanism, and supervisor chose it for the same reason (`supervisor/app/server/InferenceStream.ts:35`). Different contract, real difference, named.
- `createRelay` vs `@orkestrel/mcp` — **overlap acknowledged, not reuse.** MCP does relay one contract over several transports (`createMCPServer`/`createMCPClient` + HTTP/WS/stdio/browser), but it relays JSON-RPC tool calls and has no inference-delta primitive, and depending on it from agent core would add a runtime dependency plus `@orkestrel/tool`, `emitter`, `codec`, `server`, `websocket` behind it. Refused with the reason recorded.
- Bearer, session, CSRF, limiter — **reuse `@orkestrel/middleware` in the application**, never in agent. `createRelay` exposes `authorize` and nothing more; `AGENTS.md` § Design laws "Mechanism, not product policy".
- `openStream`/`createStream` from `@orkestrel/server` — refused: agent stays core, and a `Response` carrying a `ReadableStream` needs neither (`ollama/tests/setupServer.ts:220-223`).

**10. Tests and proofs.**

- **Base, deterministic, agent `src:core`.** `tests/src/core/providers/AgentProvider.test.ts` drives a real minimal subclass declared in `tests/setup.ts` over a canned byte stream, using the `createStreamingTransport` pattern (`ollama/tests/setupServer.ts:154-168` — host-independent, so it is promoted into agent's `tests/setup.ts`). Cases: delta fold across chunk-split records, splitter separation and the implicit-open reclassification, tool accumulation, usage on the settling record, unterminated final line recovered, mid-stream abort → `ProviderAbortError` with the partial, deadline cleared on success and on failure (asserted through `createRefusingTransport`'s recorded signals), non-OK → `ProviderHTTPError` with the body bounded at `MAX_ERROR_BODY_LENGTH`, `headers` hook merged over `Content-Type`, and `generate` deep-equalling a drained `stream` on the same input.
- **Relay handler, agent `src:core`, no server.** `createRelay({ provider: createScriptedProvider(...), authorize })` invoked with a real `new Request(...)`; read the response body and assert the frame sequence, `settle.result` carrying `thinking`/`tools`/`usage`, and a `401` when `authorize` returns false.
- **The hop, agent `src:core`, in process.** `RelayProvider` constructed with a `fetch` that calls the relay handler directly. This is a protocol-faithful round trip — real `Request`, real `Response`, real `ReadableStream`, real NDJSON — with no socket and no mock, and it is where abort-across-the-hop is proven in both directions: browser cancel → upstream signal aborts → scripted provider throws → partial recovered; server-side abort frame → `ProviderAbortError` at the browser.
- **Real HTTP round trip, ollama.** `tests/src/core/integration.test.ts` mounts `createRelay` on a real `createDispatcher` + `createServer`, fronted by `RelayProvider` and backed by `OllamaProvider` over a canned transport — hermetic, no daemon. `tests/service/relay.test.ts` repeats it against the live daemon, following `tests/service/transport.test.ts:22-107`. This is the highest layer that can compose it for real, per `orkestrel-align-packages/references/integration.md` § Design round-trip tests.
- **Ollama suites that must stay green unchanged in substance:** `tests/src/core/OllamaProvider.test.ts` (request body, framing, transport seam, abort, deadline, unreachable, the canned NDJSON fold), `helpers.test.ts`, `parsers.test.ts`, `factories.test.ts`, `integration.test.ts`, `conformance.test.ts` (the `WireChatRequest` ↔ official `ollama` types gate), and every `tests/service/**`.
- **The browser claim without a browser project.** The `src:core` scoped typecheck is the mechanical proof and it is exactly what `.claude/rules/workspace.md` § Typechecking says it proves: `lib: ["ESNext","WebWorker"]`, `types: []`, no Node globals reachable. Beside it, one runtime assertion that a provider constructed with no `fetch` option invokes `globalThis.fetch` with `globalThis` as its receiver — the defect the code comments name (`ollama/src/server/OllamaProvider.ts:108-115`, `Illegal invocation`). **A browser Vitest project is not warranted in this campaign**: it costs Playwright, `configs/browsers.ts`, and a `src:browser` face that publishes nothing, and it proves nothing the scoped core config does not. The limit is documented in the guide rather than hidden. Recorded under `Risks` with the evidence that would settle it.

**11. Guide and parity.** `agent/guides/agent.md:806` clause 2 currently ends "This module defines only the contract — a concrete implementation is a host application's responsibility." That sentence goes false and is rewritten: the module defines the contract **and** the host-independent mechanics every HTTP provider repeats; a vendor's wire stays the concrete provider's. The same claim at `:10`, `:18`, and `:590` changes with it. Clause 3 (`:807`) gains the division of labour between `read` (raw wire) and the base (splitter, yielding, assembly). New clauses: the provider base and its seams; the relay protocol and its frames; `ProviderHTTPError` as the shared non-OK boundary. Surface tables gain the symbols listed under `Design`; `## Methods` gains `AgentProviderInterface` (`generate`, `stream`, `request`, `body`, `read`) and `RelayStream`. Patterns gain "Writing a provider for a new wire" and "Relaying a browser provider through your own server". `@orkestrel/timeout` joins the `See also` list.

`ollama/guides/ollama.md` **loses** `OllamaResponse`, `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`, `buildResult`, `joinThinking` (Surface rows `:68,74-77,79,83`), the `### Narrowing HTTP errors with isOllamaHTTPError` pattern (`:211`) which becomes a pointer, and the deadline half of clause 10 (`:118`). It **gains** `OLLAMA_CHAT_PATH`, the `AgentProviderInterface` shape cell on the class row, Methods rows for `request`/`body`/`read`, a "Running in the browser" pattern, and a "Relaying through your own server" pattern beside the existing obfuscated-token one. The `Source: src/server` link (`:12`) becomes `src/core`, and the `process.stdout.write` / `process.stderr.write` fences (`:46-47`) are rewritten host-neutrally now that the package publishes core. Both README pitches must still equal their guide taglines.

**12. Publish and blast radius.** `@orkestrel/agent` publishes first: new runtime exports, no removals, so `0.0.21` → `0.0.22`. `@orkestrel/ollama` re-pins `@orkestrel/agent` to `^0.0.22`, re-runs its gates, and publishes `0.0.15` → `0.0.16` carrying three changes a consumer sees: the `dist` path move (invisible through the `exports` map), the removed error and helper exports, and the `AgentProviderInterface` widening. `@orkestrel/toolbox` is the only other runtime consumer of `@orkestrel/agent` in the catalog; `grep -rn "ProviderInterface\|ProviderResult\|ProviderDelta\|createOllama\|OllamaProvider" toolbox/src toolbox/app` returned no hits, so its re-pin is mechanical — but a runtime `dependencies` bump obliges it to re-pin, re-run its gates, bump, and republish in layer order regardless (`.agents/orchestration.md` § What a bump obliges), and its one TSDoc provider example is checked for drift while it is there. `@orkestrel/supervisor` declares both as devDependencies only and is out of scope. During the campaign, `@orkestrel/agent` reaches `ollama` as a packed tarball installed into the consumer, with the replaced range recorded and the registry copy restored before any gate that proves the published artifact.

## Design

### `agent/src/core/types.ts` — additions

```ts
import type { TimeoutInterface } from '@orkestrel/timeout'

/** Represents the stateful framing contract a provider's wire parser satisfies … */
export interface ProviderParserInterface<TRecord = Readonly<Record<string, unknown>>> {
	/** Appends `chunk` and returns every complete record it completed, in arrival order. */
	parse(chunk: string): readonly TRecord[]
	/** Drops any buffered partial, leaving the parser ready for a fresh stream. */
	clear(): void
}

/**
 * Holds what one wire record adds to the turn — the raw (pre-splitter) answer text, the
 * wire's own separated reasoning, any tool calls it carried, the usage it reported when it
 * reported one, and the authoritative assembled result when the wire settles the turn itself.
 */
export interface ProviderIncrement {
	/** Carries this record's RAW answer text — the base routes it through the splitter. */
	readonly content: string
	/** Carries this record's native separated reasoning; `''` when it carried none. */
	readonly thinking: string
	/** Carries the tool calls this record requested; empty when it requested none. */
	readonly tools: readonly ToolCall[]
	/** Carries the token usage when this record reported it; omitted otherwise. */
	readonly usage?: TokenUsage
	/**
	 * Carries the authoritative assembled result when the wire settles the turn itself —
	 * the relay's `settle` frame. Omitted for a wire that only reports deltas, in which case
	 * the base assembles from the splitter's accumulation.
	 */
	readonly result?: ProviderResult
}

/** Represents an open provider response together with the deadline and combined signal bounding it. */
export interface ProviderResponse {
	readonly response: Response
	readonly timeout: TimeoutInterface
	readonly combined: AbortSignal
}

/** Represents the options a caller may set on any {@link AgentProviderInterface}. */
export interface AgentProviderOptions {
	/** Sets the per-call deadline in milliseconds. Default: `DEFAULT_PROVIDER_TIMEOUT`. */
	readonly timeout?: number
	/** Sets a custom transport. Default: `globalThis.fetch`, bound to its receiver. */
	readonly fetch?: typeof globalThis.fetch
	/** Sets a per-request, possibly async header injector merged over the base `Content-Type`. */
	readonly headers?: () =>
		| Readonly<Record<string, string>>
		| Promise<Readonly<Record<string, string>>>
	/** Sets the provider's context-framing default — the provider level of the build cascade. */
	readonly format?: ContextFormat
}

/** Represents the construction input a concrete provider hands {@link AgentProvider}. */
export interface AgentProviderInput<TRecord = Readonly<Record<string, unknown>>>
	extends AgentProviderOptions {
	/** Names the backend's base URL. */
	readonly url: string
	/** Names the endpoint appended to `url`; omitted ⇒ the request goes to `url` itself. */
	readonly path?: string
	/** Mints one framing parser per stream. */
	readonly frame: () => ProviderParserInterface<TRecord>
}

/** Defines the mechanics {@link AgentProvider} owns and the seams a concrete provider fills. */
export interface AgentProviderInterface<TRecord = Readonly<Record<string, unknown>>>
	extends ProviderInterface {
	/**
	 * Arms the deadline, POSTs the built body, and hands back the open response with the
	 * handles bounding it. A non-OK status throws a `ProviderHTTPError` carrying the bounded body.
	 */
	request(
		messages: readonly Message[],
		stream: boolean,
		signal: AbortSignal,
		tools?: readonly ToolDefinition[],
		options?: ProviderStreamOptions,
	): Promise<ProviderResponse>
	/** Builds the wire request body for one turn. */
	body(
		messages: readonly Message[],
		stream: boolean,
		tools?: readonly ToolDefinition[],
		options?: ProviderStreamOptions,
	): BodyInit
	/**
	 * Reads one wire record into the contract's vocabulary. Throws to settle the turn as a
	 * failure — a `ProviderAbortError` carrying the partial for a wire that reports a remote cancel.
	 */
	read(record: TRecord): ProviderIncrement
}

/** Represents the options a thrown {@link ProviderHTTPError} accepts beside its message and status. */
export interface ProviderHTTPErrorOptions {
	readonly cause?: unknown
}

/** Represents one inference turn a browser-side provider sends across the relay hop. */
export interface RelayRequest {
	readonly messages: readonly Message[]
	readonly tools?: readonly ToolDefinition[]
	readonly options?: ProviderStreamOptions
}

/** Represents one NDJSON line the relay's server half writes back. */
export type RelayFrame =
	| ProviderDelta
	| { readonly channel: 'settle'; readonly result: ProviderResult }
	| { readonly channel: 'abort'; readonly partial: ProviderResult }
	| { readonly channel: 'error'; readonly code: string; readonly message: string }

/** Represents the host-independent request handler {@link createRelay} returns. */
export type RelayHandler = (request: Request) => Promise<Response>

/** Represents the options {@link createRelay} accepts for the relay's server half. */
export interface RelayOptions {
	/** Holds the real provider this relay drives, constructed with the real credential. */
	readonly provider: ProviderInterface
	/**
	 * Decides whether one request may drive the provider. Required — a relay with no
	 * authorization is an open proxy in front of a real credential. True admits the request;
	 * false answers `401`. Token minting, validation, and identity stay in the application.
	 */
	readonly authorize: (request: Request) => boolean | Promise<boolean>
}

/** Represents the options one {@link RelayStream} binds for a single request. */
export interface RelayStreamOptions {
	readonly provider: ProviderInterface
	readonly request: RelayRequest
	readonly signal: AbortSignal
}

/** Represents the options {@link RelayProvider} accepts for the relay's browser half. */
export interface RelayProviderOptions extends AgentProviderOptions {
	/** Names the developer's own relay endpoint. */
	readonly url: string
	/** Mints one NDJSON parser per stream — for example `createNDJSONParser`. */
	readonly frame: () => ProviderParserInterface
}
```

### `agent/src/core/errors.ts` — addition

```ts
export class ProviderHTTPError extends Error {
	readonly code = 'HTTP' as const
	readonly status: number
	constructor(message: string, status: number, options?: ProviderHTTPErrorOptions) { … }
}
export function isProviderHTTPError(value: unknown): value is ProviderHTTPError { … }
```

### New agent core files

`src/core/providers/AgentProvider.ts` (abstract), `src/core/providers/RelayProvider.ts`, `src/core/RelayStream.ts`, plus `createRelay` and `createRelayProvider` in `factories.ts`, `buildResult` in `helpers.ts`, `MAX_ERROR_BODY_LENGTH` and `DEFAULT_PROVIDER_TIMEOUT` in `constants.ts`. The plural `providers/` folder is the entity-family nesting rule; the contract stays in module-root `types.ts`.

### `ollama/src/core/types.ts` — the changed shape

```ts
export interface OllamaOptions extends AgentProviderOptions {
	readonly model: string
	readonly url?: string
	readonly keepAlive?: string | number
	readonly options?: Readonly<Record<string, unknown>>
	readonly think?: boolean
}
```

Every option a caller sets today — `model`, `url`, `keepAlive`, `timeout`, `options`, `think`, `fetch`, `headers`, `format` — is still there, with the same defaults and the same TSDoc, four of them now inherited. `WireChatRequest` is unchanged, so the conformance gate against the official `ollama` types is untouched. `OllamaResponse` is deleted in favour of `ProviderResponse`.

### The class after the rebuild

```ts
export class OllamaProvider extends AgentProvider implements AgentProviderInterface {
	readonly name = 'ollama'
	readonly #model: string
	readonly #keepAlive: string | number
	readonly #think: boolean
	readonly #options: Readonly<Record<string, unknown>> | undefined

	constructor(options: OllamaOptions) { super({ url: options.url ?? DEFAULT_OLLAMA_URL, path: OLLAMA_CHAT_PATH, frame: createNDJSONParser, … }); … }

	async generate(messages, signal, tools?, options?): Promise<ProviderResult> { /* the native stream:false fast path */ }
	body(messages, stream, tools?, options?): BodyInit { /* JSON.stringify(WireChatRequest) */ }
	read(record): ProviderIncrement { /* extractContent / extractThinking / extractTools / extractUsage */ }
}
```

`stream`, `#fetch`, `#requestHeaders`, and `#deltas` disappear from the file. The wire leaves stay exported and unit-tested — they are the package's highest-risk code and the reason its guide gives them a paragraph (`ollama/guides/ollama.md:88`).

### The developer experience

A browser app talking straight to a daemon, or through the developer's server carrying the vendor's own wire, writes exactly what it writes today — nothing changes. A browser app that must not learn the vendor writes:

```ts
const provider = createRelayProvider({
	url: '/inference',
	frame: createNDJSONParser,
	headers: async () => ({ authorization: `Bearer ${await mintToken()}` }),
})
const agent = createAgent(provider)
```

and the server writes:

```ts
dispatcher.add({
	method: 'POST',
	path: '/inference',
	handler: createRelay({ provider: createOllama({ model }), authorize: matchesSessionToken }),
})
```

Two lines each side, one shared vocabulary, and the credential never leaves the server. Writing a provider for a new vendor means filling `url`, `path`, `frame`, `name`, `body`, and `read` — and nothing else.

## Alternatives

**A. One shared engine class taking a wire object by composition** (`new AgentProvider({ wire: new OllamaWire(options) })`). It keeps `OllamaProvider`'s public surface at `id`/`name`/`format`/`generate`/`stream` instead of growing it by three methods, and it composes rather than inherits. It loses on two rules and one fact. `.claude/rules/architecture.md:162,174` forbids the 1:1 forwarder that keeping `OllamaProvider` as a class would require, so the design must delete a documented public class (`ollama/guides/ollama.md:67`) and return an engine from `createOllama` — a larger breaking change than the one the winning design makes, for no consumer benefit. And the seams do not actually become private: `ProviderWireInterface` is a published type whose members are as public as abstract methods would be. The surface saving is cosmetic; the breakage is real.

**B. The transparent wire proxy alone (C4 option (a)), with no agent-level relay.** It is free — it already works and is already proven against a live daemon (`ollama/tests/service/transport.test.ts`). It loses because it cannot meet the stated ask: the browser must construct the vendor's provider, so it holds the vendor's URL shape, its wire body, and its model name, and a server that wants to switch vendors or hide which one it uses cannot. It also forces the browser to install the vendor package. The winning design keeps (a) as the documented zero-code path and adds (b) for the case (a) cannot reach, which is why the answer to question 6 is "both" rather than a choice.

## Constraints

*(objective lane)*

## Refusals

*(objective lane)*

## Measurements

*(objective lane)*

## Units

Exit criterion: C1–C5 closed and nothing wider. Writers are serialized per checkout; `agent` and `ollama` are disjoint checkouts, but the dependency order serializes them anyway.

**U1 — Agent contract (types first).** Role `implementer`, engine **Opus 5**. Checkout `agent`.
Owned: `src/core/types.ts`, `src/core/errors.ts`, `src/core/constants.ts`.
Shared (report-only): `src/core/index.ts`.
Depends on: nothing.
Acceptance, cheap-first: `npm run lint:check` clean on owned files; `npm run check:src:core` green; every added declaration is exported from its kind file; no `any`, no `as`, no `!`, no `public`/`protected`/`private`, no parameter property; every optional member absent rather than `'none'`/`''`/`-1`; `ProviderHTTPError` carries `code`/`status` and ships `isProviderHTTPError`; `NDJSONParserInterface` is assignable to `ProviderParserInterface<Record<string, unknown>>` and `SSEParserInterface` to `ProviderParserInterface<SSEEvent>`, proved by a type probe deleted before return.
Audit: `analyst` (Sol) for contract correctness; `reviewer` (Opus 5) for naming and shape.

**U2 — Agent implementation and its proofs.** Role `sol`, engine **GPT 6 Astra**. Checkout `agent`.
Owned: `src/core/providers/AgentProvider.ts`, `src/core/providers/RelayProvider.ts`, `src/core/RelayStream.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/index.ts`, `tests/setup.ts`, `tests/src/core/providers/*.test.ts`, `tests/src/core/RelayStream.test.ts`, `tests/setup.test.ts`.
Off-limits: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/helpers.ts`, `configs/policy.ts`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`.
Depends on: U1.
Acceptance: `check:src:core` green; `test:src:core` and `test:setup` green with every new file collected by the `src:core` and `setup` projects; the widened `joinThinking` returns `next` for `('', next)` and `running` for `(running, '')`; `generate` deep-equals a drained `stream` on the same scripted input; a mid-stream abort throws `ProviderAbortError` whose `partial.content` equals the joined yielded deltas; a non-OK response throws `ProviderHTTPError` with the body sliced at `MAX_ERROR_BODY_LENGTH`; the in-process relay hop recovers a partial in both abort directions; `createRelay` answers `401` when `authorize` returns false. Report `test:guides` as an observation only — U3 owns it.
Audit: `reviewer` (Opus 5, did not write it) plus `checker` for file placement and barrel membership.

**U3 — Agent guide and README parity.** Role `implementer`, engine **Opus 5**. Checkout `agent`.
Owned: `guides/agent.md`, `README.md`, `tests/guides.test.ts`.
Depends on: U2.
Acceptance: `test:guides` green; clause 2's "defines only the contract" sentence and the same claim at `:10`, `:18`, `:590` are rewritten; every new export has a Surface row and every Surface row resolves; `AgentProviderInterface` and `RelayStream` have Methods tables matching their call-signature members exactly; each new flagship fence is transcribed and asserted; the README pitch equals the tagline.
Audit: `analyst` (Sol) for claim truth against the code; `checker` for parity rows.

**U4 — Agent tarball into ollama.** Role `builder`, engine **Sonnet**; the mutating run is the Orchestrator's tracked command. Checkout `agent` (script authorship) and `ollama` (install target).
Owned: the swap script under `tmp/`.
Depends on: U3.
Acceptance: the script builds, packs, and **installs** (never links) the tarball; the replaced `@orkestrel/agent` range is recorded in the same step; `ollama`'s `npm run check` resolves the new agent types.

**U5 — Ollama environment move.** Role `builder`, engine **Sonnet** (fully specified, taste-free). Checkout `ollama`.
Owned: `src/server/**` → `src/core/**`, `tsconfig.json`, `package.json`, `vite.config.ts`, `configs/src/tsconfig.server.json` → `tsconfig.core.json`, `configs/src/vite.server.config.ts` → `vite.core.config.ts`, `tests/src/server/**` → `tests/src/core/**`, and the `@src/server` import in the 15 authored test files plus `tests/setupService.ts`.
Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `configs/helpers.ts`, `configs/policy.ts` — all restored by `scaffold repair`; the `'@src/server'` literals in `tests/config.test.ts:2087,2144` are vendored assertions and are not this unit's.
Depends on: U4.
Acceptance: `format:check`, `lint:check`, `check:src:core`, `test:src:core`, `test:config`, `test:policy` green; no file under `src/` references a `node:` module or `process`; `package.json` `exports.` resolves to `dist/src/core`; `build` emits `dist/src/core/index.{js,cjs,d.ts,d.cts}`. If `test:config` reddens on the `src:core` `setupFiles` list, stop and report per the deviation contract.
Audit: `checker` for the path and configuration rows; `analyst` (Sol) for isolation.

**U6 — Ollama rebuilt on the base.** Role `sol`, engine **GPT 6 Astra**. Checkout `ollama`.
Owned: `src/core/OllamaProvider.ts`, `src/core/types.ts`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/factories.ts`, `src/core/index.ts`, `tests/src/core/**`, `tests/setup.ts`, `tests/setupServer.ts`.
Depends on: U5.
Acceptance: `check:src:core` green; `test:src:core`, `test:setup`, `test:conformance` green; `OllamaOptions` accepts every key it accepts today with the same defaults, proved by the existing factory-defaults suite; the recorded `/api/chat` request body is byte-identical to the pre-change recording for the same input, including `stream: false` on `generate`; no mechanic the base owns appears in this package.
Audit: `reviewer` (Opus 5) for design fit and API shape; `analyst` (Sol) is the writer's engine, so the deciding lane is Opus.

**U7 — Relay round trips in ollama.** Role `sol`, engine **GPT 6 Astra**. Checkout `ollama`.
Owned: `tests/src/core/integration.test.ts`, `tests/service/relay.test.ts`, `tests/setupServer.ts`, `tests/setupService.ts`.
Depends on: U6.
Acceptance: the hermetic integration proof mounts `createRelay` on a real `createDispatcher` + `createServer` and drives `RelayProvider` → HTTP → `OllamaProvider` → canned transport, asserting content, `thinking`, `tools`, and `usage` all arrive; abort from the browser side reaches the canned transport's recorded signal; `test:src:core` green. Report `test:service` as an observation with its reading; the deciding run is the Orchestrator's.
Audit: `reviewer` (Opus 5); `checker` for project membership and discovery.

**U8 — Ollama guide and README parity.** Role `implementer`, engine **Opus 5**. Checkout `ollama`.
Owned: `guides/ollama.md`, `README.md`, `tests/guides.test.ts`.
Depends on: U7.
Acceptance: `test:guides` green; removed exports have no Surface rows and no `@example`; the `Source` link names `src/core`; the `process.stdout` fences are host-neutral; the Tests section lists every project and file that now exists; the browser limit is stated in prose rather than implied.
Audit: `analyst` (Sol) for claim truth; `checker` for parity rows.

**U9 — Gates.** Role `verifier`, engine **Sonnet**. Both checkouts, `agent` first.
Depends on: U3 (agent), U8 (ollama).
Acceptance: `format:check` → `lint:check` → `check` → `build` → `test` run in order in each checkout, output read, exit codes reported; `test:service` run in `ollama` with the daemon warm. The verifier fixes nothing.

## Tensions

1. **Removing `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, and `MAX_ERROR_BODY_LENGTH` from `@orkestrel/ollama`** in favour of a shared `ProviderHTTPError` in agent core. This is a public-export removal and a documented pattern deleted (`ollama/guides/ollama.md:211,242`), so it is the user's call. I recommend it: nothing in that error is vendor-specific beyond the word "Ollama" in its message, and one narrower serving every provider is worth more to a consumer than three per-vendor ones. The fallback if the user refuses is a sixth seam, `fault(status, detail): Error`, which I would rather not add.
2. **`@orkestrel/ndjson` as a runtime dependency of `@orkestrel/agent`.** The design avoids it: `RelayProviderOptions.frame` is required, so a browser app installs `@orkestrel/ndjson` and passes `createNDJSONParser` in one line. I recommend keeping it that way — it holds agent core dependency-free and makes the framing choice visible — but the user may prefer the one-word alternative of adding the dependency and defaulting `frame`, which removes the option from the browser's call site.
3. **Moving `@orkestrel/ollama` from a server face to a core face**, rather than adding a second face. Recommended, and the published specifier does not change, so no consumer import moves. The user decision is that `@orkestrel/ollama` stops declaring itself a server package.
4. **`OllamaProvider` keeps its `generate` override** and therefore keeps `stream: false` on the wire, which is why `request` is a public member of the base. Dropping the override would shrink the surface by one method and remove a wire mode the daemon really has. I kept the behaviour; the objective lane should challenge whether the surface cost is worth it.
5. **`ProviderIncrement.result`** is a second way to settle a turn beside the base's own assembly. I judged it a real domain difference — some wires settle authoritatively, some only stream — rather than a drifting duplicate flag, because without it a relay silently drops in-content reasoning. Challengeable.
6. **`usage` no longer gated on a `done` flag.** The base folds whatever `read` reports, and `extractUsage` already returns `undefined` unless both counts are numbers, so Ollama's observable behaviour is unchanged. If the objective lane finds a daemon frame carrying counts before `done`, the ruling flips.
7. **No browser Vitest project.** I bounded the browser claim with the `src:core` scoped typecheck plus a bound-receiver runtime assertion, and stated the limit in the guide. The objective lane may hold that `.agents/orchestration.md` § Acceptance laws — "Evidence a claim about a rendered or externally driven surface with its capture or a real foreign client driving it" — binds here and forces the project.
8. **Reading the brief did not supply:** whether `ollama/tests/config.test.ts` (vendored, restored by `scaffold repair`) asserts each Vitest project's `setupFiles` list. If it does, `src:core` cannot name `setupServer.ts` and the proxy-driven hermetic suites must move instead. U5's deviation contract covers it, but the reading would be cheaper taken before dispatch: run `npm run test:config` in `ollama` after a trial rename.
9. **A separate `@orkestrel/relay` package** was refused under the minimal-API law, since one relay shape has one consumer today. If the user wants the relay published independently of the conversation runtime, that is a rescope, not a re-baseline.

## Risks

- **The public surface of `AgentProviderInterface` is large for an inheritance base** — `request`, `body`, and `read` become documented API on every provider, and `ollama.md`'s Methods table grows from two rows to five. Settled by: the objective lane ruling whether any of the three can become a constructor input instead, and by reading the guide's Methods table after U8 as a consumer would.
- **Generic assignability of `ProviderParserInterface`.** `NDJSONParserInterface.parse` returns `ReadonlyArray<Record<string, unknown>>` while the seam declares `readonly TRecord[]`; under `exactOptionalPropertyTypes` and `strict` this should hold, but it is a compiler fact, not an argument. Settled by: the U1 type probe, and by a `prove` call naming the project, the case, and the control.
- **`environmentBoundary('src/core')` and the core worker-global fence** applied to ollama for the first time. `readonly name = 'ollama'` is a class property, and `agent/src/core/types.ts:142` already declares `readonly name: string` under the same scoped config, so the fence should not reach it. Settled by: `npm run check:src:core` and `npm run lint:check` in U5.
- **`exactOptionalPropertyTypes` and the `super` call.** Forwarding four optional options into `AgentProviderInput` requires conditional spreads rather than direct assignment. Settled by: U6's scoped typecheck.
- **Backpressure across the relay.** `RelayStream` is pull-driven so the provider cannot outrun the socket, but a slow browser plus a fast daemon has never been measured in this fleet. Settled by: a service-project proof that a reader pausing mid-stream does not grow unbounded memory, or an honest statement of the limit in the guide.
- **The relay's browser splitter re-processing already-split content.** The server strips `<think>` spans, so the browser splitter is normally a no-op; a model answer containing a literal `<think>` could transiently mis-yield a live delta, though `settle.result` keeps the final content right. Settled by: a deterministic case in U2 feeding a literal `<think>` through the relay and asserting the settled content.
- **Future two-layer split.** When a process-shaped provider lands, the drain-based `generate` extracts upward. The risk is that `AgentProvider` accretes HTTP assumptions into members a non-HTTP provider would inherit. Settled by: keeping `request`, `body`, and `frame` the only HTTP-shaped members, so the extraction line is visible in the interface today.
- **Two lanes, one `ollama` checkout.** U5, U6, U7, and U8 all write it serially. A slipped serialization clobbers the environment move. Settled by: a committed checkpoint before each dispatch, and `git status --short` read between units.
