# Plan — provider base, `OllamaProvider` on it, browser↔server relay

Status: design reconciled 2026-09-14 (see `design-reconciliation.md`); implementation units
dispatching. `registry.md` holds the routing ledger and bench state. This file is rewritten at each
re-baseline.

## Enumerated scope (fixed 2026-09-14 at campaign start)

| Capability | Closes when                                                                                                                                                                                                                       | State |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| C1         | `@orkestrel/agent` core exports a host-independent provider base that owns every provider mechanic up to the wire-specific seams, typed in `types.ts`, barrelled, tested in `src:core`, and documented in `agent.md`             | open  |
| C2         | `OllamaProvider` is rebuilt on that base with no duplicated mechanic; ollama's unit, conformance, and service suites are green                                                                                                     | open  |
| C3         | A browser runtime can import and run the provider: host-independence proven under the core scope with no Node types, a bound-`fetch` runtime assertion, and a Chromium receipt driving the built exports                          | open  |
| C4         | A browser-side provider relays to a server-side provider through the developer's server: custom token in, real credential server-side only, deltas streamed back, abort crossing the hop, policy hooks left to the application | open  |
| C5         | Guides, parity, tests, and the gate chain green in agent and ollama; publish order agent then ollama prepared                                                                                                                      | open  |

## Exit criterion

Every row above ends implemented, repaired, retained, or intentionally excluded on evidence, and
`npm run format:check`, `lint:check`, `check`, `build`, and `test` are green in agent and ollama
as run by an independent `verifier`, with ollama's `test:service` green against the warm daemon.
Publishing is the user's decision and outside the criterion.

## The ruled contract

Additions to `agent/src/core/types.ts` (TSDoc omitted here; the unit writes it):

```ts
export interface ProviderParserInterface<TRecord = Readonly<Record<string, unknown>>> {
	parse(chunk: string): readonly TRecord[]
	clear(): void
}

export interface ProviderRequest {
	readonly messages: readonly Message[]
	readonly tools?: readonly ToolDefinition[]
	readonly options?: ProviderStreamOptions
}

export interface ProviderIncrement {
	readonly content: string
	readonly thinking: string
	readonly tools: readonly ToolCall[]
	readonly usage?: TokenUsage
	readonly result?: ProviderResult
}

export interface ProviderOptions {
	readonly timeout?: number
	readonly fetch?: typeof globalThis.fetch
	readonly headers?: (signal: AbortSignal) =>
		| Readonly<Record<string, string>>
		| Promise<Readonly<Record<string, string>>>
	readonly format?: ContextFormat
}

export interface AgentProviderInput extends ProviderOptions {
	readonly url: string
	readonly path?: string
	readonly split?: boolean
	readonly strict?: boolean
}

export interface AgentProviderInterface<TRecord = Readonly<Record<string, unknown>>>
	extends ProviderInterface {
	frame(): ProviderParserInterface<TRecord>
	body(request: ProviderRequest): object
	read(record: TRecord): ProviderIncrement
	finish(parser: ProviderParserInterface<TRecord>): readonly TRecord[]
}

export type ProviderErrorCode = 'HTTP' | 'PROTOCOL' | 'PROVIDER'

export interface ProviderErrorOptions {
	readonly status?: number
	readonly cause?: unknown
}

export type RelayFrame =
	| ProviderDelta
	| { readonly channel: 'result'; readonly result: ProviderResult }
	| { readonly channel: 'abort'; readonly partial: ProviderResult }
	| { readonly channel: 'error'; readonly message: string }

export type RelayHandler = (request: Request) => Promise<Response>

export interface RelayOptions {
	readonly provider: ProviderInterface
	readonly authorize: (request: Request) => boolean | Promise<boolean>
	readonly limit?: number
}

export interface RelayStreamOptions {
	readonly provider: ProviderInterface
	readonly request: ProviderRequest
	readonly signal: AbortSignal
}

export interface RelayProviderOptions extends ProviderOptions {
	readonly url: string
	readonly parser: () => ProviderParserInterface
}
```

Semantics the base owns: a fresh `crypto.randomUUID()` `id`; `format` exposed as given; per-call
`Timeout` plus `AbortSignal.any([timeout.signal, signal])`; the bound default `fetch` and the
awaited `headers` hook raced against the combined signal, merged over `Content-Type: application/json`;
one POST of `JSON.stringify(body(request))` to `url + (path ?? '')`; a non-OK status read to at
most `MAX_ERROR_BODY_LENGTH` then cancelled and thrown as `ProviderError('HTTP', message, { status })`;
a `null` body thrown as `ProviderError('PROTOCOL')`; the response body decoded through `readChunks`
and framed by one `frame()` parser per call; each record through `read`; when `split` (default
`true`) raw `content` goes through one `createThinkSplitter()` per call and clean content is yielded
as `{ channel: 'content' }`; native `thinking` yielded as `{ channel: 'thinking' }`; `tools`
appended; a present `usage` replaces the running one; a present `result` becomes the authoritative
settled result; at end of input `finish(parser)` is fed through `read` too, the splitter is flushed,
and when `strict` and no `result` arrived a `ProviderError('PROTOCOL')` is thrown; a cancel of the
combined signal throws `ProviderAbortError` carrying the partial assembled so far; any other error
(a `ProviderAbortError` thrown by `read` for a remote abort included) propagates unchanged; the
reader is cancelled, the parser cleared, and the timeout cleared in `finally`; `generate` drains
`stream` with explicit `next()` calls and returns the terminal value. Both lanes' evidence for each
of these is in `absorb-provider-report.md` item 4 and the two design reports.

Errors in `agent/src/core/errors.ts`: `ProviderError` (`code: ProviderErrorCode`,
`status: number | undefined`, `cause` through `ErrorOptions`) and `isProviderError`.

Constants in `agent/src/core/constants.ts`: `DEFAULT_PROVIDER_TIMEOUT = 120_000`,
`MAX_ERROR_BODY_LENGTH = 2048`, `DEFAULT_RELAY_LIMIT = 1_048_576`, and the relay content type.

Helpers in `agent/src/core/helpers.ts`: `buildProviderResult(content, thinking, tools, usage)`
(from ollama's `buildResult`), `joinThinking` widened so an empty string on either side is treated
as absent, `readText(body, limit?, signal?)` returning `TextRead { text, complete }` (amended by A2 F9), `readChunks(body, signal?)`, `providerRequestToJSON(request)`.

Validators in `agent/src/core/validators.ts`: `isMessage` repaired to the `MessageRole` union and
string image elements; `isProviderRequest`; `isRelayFrame`.

Factories in `agent/src/core/factories.ts`: `createRelay(options): RelayHandler`,
`createRelayProvider(options): RelayProvider`.

Classes: `agent/src/core/AgentProvider.ts` (abstract), `agent/src/core/providers/RelayProvider.ts`
(`name = 'relay'`, `split: false`, `strict: true`, `body` through `providerRequestToJSON`, `read`
narrows a record with `isRelayFrame`, maps deltas to increments, `result` to the settled result,
`abort` to a thrown `ProviderAbortError(partial)`, `error` to a thrown `ProviderError('PROVIDER')`,
and a bad frame to `ProviderError('PROTOCOL')`; `finish` returns `parser.parse('\n')`),
`agent/src/core/RelayStream.ts` (a pull-driven `Response` over one `provider.stream` call: one
awaited `next()` per pull, frames as `JSON.stringify(frame) + '\n'`, a `result` frame on completion,
an `abort` frame for a `ProviderAbortError`, an `error` frame with a fixed message for any other
throw, the upstream signal aborted then `iterator.return()` on body cancel, listeners released).

`createRelay` flow: `authorize(request)` false → `401`; `readText(request.body, limit)` over the
limit → `413`; JSON parse plus `isProviderRequest` failure → `400`; otherwise
`new RelayStream({ provider, request, signal: request.signal }).response` with
`content-type: application/x-ndjson; charset=utf-8` and `cache-control: no-store`.

Ollama after the rebuild: `OllamaProvider extends AgentProvider` with `name = 'ollama'`,
`super({ url: options.url ?? DEFAULT_OLLAMA_URL, path: OLLAMA_CHAT_PATH, ...options })`,
`frame()` returning `createNDJSONParser()`, `body(request)` returning the `WireChatRequest` with
`stream: true`, `read(record)` through `extractContent` / `extractThinking` / `extractTools` /
`extractUsage`, `finish(parser)` returning `parser.parse('\n')`. `OllamaOptions extends ProviderOptions`
keeps `model`, `url?`, `keepAlive?`, `options?`, `think?`. Removed from ollama: `OllamaResponse`,
`OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`,
`DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, `parseBody`; `errors.ts` and
`parsers.ts` are deleted when empty. Added: `OLLAMA_CHAT_PATH`.

## Units and routing ledger

Writers are serialized per checkout. `agent` and `ollama` are disjoint checkouts, so A-units and
O1 run in parallel; O2 onward waits for the agent artifact.

| Unit | Subject                                                                  | Role · engine                | Checkout | Depends on | Audit lanes                                        |
| ---- | ------------------------------------------------------------------------ | ---------------------------- | -------- | ---------- | -------------------------------------------------- |
| A1   | Agent contract, `AgentProvider`, errors, constants, helpers, `isMessage` repair, core tests | `sol` · GPT 6 Astra  | agent    | —          | reviewer (Opus 5) decides; analyst (Astra) objective; checker |
| A2   | Relay: `RelayProvider`, `RelayStream`, `createRelay`, guards, projection, tests | `sol` · GPT 6 Astra     | agent    | A1         | reviewer (Opus 5) decides; analyst (Astra); checker |
| A3   | Agent guide, README, `guides/README.md`, parity test                     | `implementer` · Opus 5       | agent    | A2         | analyst (Astra) decides; checker                   |
| A4   | Pack the accepted agent tree; install the tarball into ollama, recording the replaced range | Orchestrator tracked command | agent → ollama | A3   | verifier reads resolution                          |
| O1   | Ollama environment move, server face → core face, no behaviour change   | `builder` · Sonnet           | ollama   | —          | checker; verifier                                  |
| O2   | `OllamaProvider` rebuilt on the base; removals; tests                    | `sol` · GPT 6 Astra          | ollama   | A4, O1     | reviewer (Opus 5) decides; analyst (Astra); checker |
| O3   | Relay round trips: hermetic integration and live service proof           | `sol` · GPT 6 Astra          | ollama   | O2         | reviewer (Opus 5) decides; checker                 |
| O4   | Ollama guide, README, `guides/README.md`, parity test                    | `implementer` · Opus 5       | ollama   | O3         | analyst (Astra) decides; checker                   |
| V1   | Authoritative gates, agent                                               | `verifier` · Sonnet          | agent    | A3         | —                                                  |
| V2   | Authoritative gates plus `test:service` with the daemon warm, ollama     | `verifier` · Sonnet          | ollama   | O4         | —                                                  |
| B1   | Chromium receipt: built exports driven in the harness browser, direct and relayed | Orchestrator          | ollama   | O3         | retained as C3 acceptance evidence                 |

Every `sol` and `analyst` exec passes `--model gpt-6-astra`, as the registry records. A unit whose
writer is Astra takes its deciding audit from the Opus lane; a unit whose writer is Opus takes it
from the Astra lane.

## Standing conditions for every unit

- Baselines are green and committed: agent `337390c`, ollama `8248c49`.
- No Ollama daemon runs by default; `ollama serve` is started by the Orchestrator for O3's
  observation and V2.
- The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
  `configs/helpers.ts`, `configs/policy.ts`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`) is off-limits
  in both checkouts.
- Runtime probes live under `tmp/probe/` and are deleted before a unit returns.
