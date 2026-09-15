# Unit A1 — `AgentProvider`: the host-independent provider base in `@orkestrel/agent` core

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/agent`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit.

## Objective

Land the ruled provider contract in `src/core/types.ts`, the abstract `AgentProvider` engine that
owns every provider mechanic up to the wire-specific seams, its errors, constants, helpers, shapes,
compiled contracts, the `isMessage` repair, and the deterministic `src:core` proofs for all of it —
types first, then failing tests, then implementation, then green.

## Context

**Design record.** The Orchestrator reconciled two blind design lanes and ruled the contract. Read
`../scaffold/.orkestrel/campaign/design-reconciliation.md` and
`../scaffold/.orkestrel/campaign/plan.md` § "The ruled contract" first. The contract is restated in
full under § Contract below and that restatement is what you implement; where the two disagree,
stop and report.

**Evidence.**

- The distillate of the provider seam and the wire/generic split of the current `OllamaProvider`,
  method by method: `../scaffold/.orkestrel/campaign/absorb-provider-report.md` (items 1, 2, 4, 5, 7).
- The class being generalized, first-hand: `../ollama/src/server/OllamaProvider.ts` (444 lines).
  Its `generate` (`:176-198`), `stream` (`:219-307`), `#deltas` (`:315-343`), `#fetch` (`:347-392`),
  `#requestHeaders` (`:402-408`), and `#body` (`:416-443`) are the mechanics you move into the base;
  its `mapMessages`, `extract*`, `parseBody`, and `WireChatRequest` are the wire you leave behind.
  `../ollama/src/server/helpers.ts:65-81` is `buildResult`, which moves here as
  `buildProviderResult`; `:136-140` is ollama's `joinThinking`, which is deleted in favour of yours.
- The existing contract, first-hand: `src/core/types.ts:1-240`, `src/core/errors.ts:1-60`
  (`ProviderAbortError` — the pattern for `ProviderError`), `src/core/helpers.ts:40-110`
  (`agentResultToJSON` — the contract-gated JSON projection pattern), `src/core/helpers.ts:360-380`
  (`joinThinking`), `src/core/validators.ts` (whole file; `isMessage` at `:36-42`).
- The runtime's one call site, so you know what the engine must satisfy:
  `src/core/Agent.ts:434-500` and `:729-765` (it calls `provider.format` and `provider.stream`, folds
  abort, timeout, and budget into the signal it passes, and recovers `ProviderAbortError.partial`).
- The scripted provider fixture the runtime tests use: `tests/setup.ts:150-300`.
- Test fixtures to promote from ollama into `tests/setup.ts` (they are host-independent):
  `../ollama/tests/setupServer.ts:118-168` (`createRefusingTransport`, `createStreamingTransport`).
- The reconciliation table row 10 reproduces the `isMessage` defect: `src/core/validators.ts:38`
  accepts any `role` string and `:42` accepts any `images` array.

**Law.** `../scaffold/AGENTS.md` in full (this checkout's own `AGENTS.md` points there);
`../scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `workspace.md`, `documentation.md` (TSDoc voice and the Surface-cell rule only — the
guide itself is another unit's), `portability.md`, `quality.md`, `writing.md`. Skill:
`../scaffold/.agents/skills/orkestrel-harden-package/SKILL.md` with
`references/contract.md` and `references/centralization.md`. Governing guide:
`guides/agent.md` (read §§ Surface, Methods → `ProviderInterface`, Contract clauses 2–6; you do not
edit it). The `@orkestrel/contract` surface: `../scaffold/guides/contract.md` §§ Parsers, JSON,
Helper, Shape builders, Shape types, Compilers, and the Patterns "Parsing JSON safely",
"Declaring a shape", "Compiling a contract", "Accepting foreign interface implementations with
`objectOf`". The user's standing instruction for this campaign: make full use of
`@orkestrel/contract` so every wire boundary is strictly typed and round-trips through JSON with
one declaration.

**Host.** Windows 11. Your shell is PowerShell through the Codex CLI. Node 24 and npm 11 are
installed; `node_modules` is populated (76 packages, every `@orkestrel/*` dependency present).
The sandbox denies network — never run `npm install`, `npm ci`, or anything that fetches. `.git`
is mounted read-only — run only `git status`, `git diff`, and `git log`; never `git add`, `commit`,
`stash`, `checkout`, `restore`, `reset`, `clean`, or `mv`. Rename a file with the shell's move.
Write only under this checkout; `tmp/` is ignored by git and is where your probes and report live.

**Measurements (taken by the Orchestrator on 2026-09-14).**

- Baseline: HEAD `337390c`, `git status --porcelain` empty; the independent gate chain was GREEN:
  `format:check`, `lint:check`, `check`, `build`, `test` all exit 0; `src:core` 18 files / 618
  tests; `setup` 44; `guides` 30; `policy` 90 (+1 skipped); `config` 172 (+1 skipped).
- `configs/src/tsconfig.core.json`: `lib: ["ESNext","WebWorker"]`, `types: []`. Everything the
  engine needs — `fetch`, `Request`, `Response`, `ReadableStream`, `TextDecoder`, `TextEncoder`,
  `AbortSignal.any`, `crypto.randomUUID` — is inside that lib.
- Installed parsers the seam must admit structurally:
  `../ollama/node_modules/@orkestrel/ndjson/dist/src/core/index.d.ts:56-80`
  (`NDJSONParserInterface.parse(chunk: string): ReadonlyArray<Record<string, unknown>>` plus
  `clear()`) and `../ollama/node_modules/@orkestrel/sse/dist/src/core/index.d.ts:224-250`
  (`SSEParserInterface.parse(chunk: string): readonly SSEEvent[]`, `flush()`, `clear()`). Agent
  declares neither package; the seam is structural.
- `@orkestrel/timeout` (`Timeout`, `createTimeout`, `TimeoutInterface`) and `@orkestrel/contract`
  (`^0.0.17`) are declared runtime dependencies (`package.json:72-83`). `@orkestrel/tool` exports
  `isToolCall`; `ToolCall.caller?: unknown` is consumer-asserted opaque context
  (`node_modules/@orkestrel/tool/dist/src/core/index.d.ts:116-128`).
- The current error-body read is unbounded: `../ollama/src/server/OllamaProvider.ts:370` awaits
  `response.text()` before slicing to `MAX_ERROR_BODY_LENGTH`.

**Control identifiers.** None. Name every test for what it proves.

**Standing conditions.**

- Vitest 4 may fail to spawn its worker forks inside this sandbox (a grandchild process denied
  `EPERM`). If `npm run test:src:core` fails at worker spawn rather than at an assertion, record the
  exact error under Observations and do not diagnose it; the Orchestrator takes the authoritative
  run on the host after you exit. `npm run check:src:core` and `npm run lint:check` run in-process
  and are your hard criteria either way.
- `tests/guides.test.ts` will go red the moment you add an export without a guide row. That is
  expected: the guide is unit A3's. Report `npm run test:guides` as an observation only.
- API Extractor prints a non-failing "TypeScript 6.0.3 is newer than the bundled compiler engine"
  notice during `check` and `build`; it is not a defect.

## Contract

Add these to `src/core/types.ts`, each with complete TSDoc in the third-person `-s` voice
(`Represents …`, `Defines …`, `Holds …`), readonly members, and no `any`, assertion, or
non-null assertion anywhere in the unit:

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
	readonly headers?: () =>
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

export type ProviderErrorCode = 'HTTP' | 'PROTOCOL' | 'LIMIT' | 'PROVIDER'

export interface ProviderErrorOptions {
	readonly status?: number
	readonly cause?: unknown
}

export type RelayFrame =
	| ProviderDelta
	| { readonly channel: 'result'; readonly result: ProviderResult }
	| { readonly channel: 'abort'; readonly partial: ProviderResult }
	| { readonly channel: 'error'; readonly code: 'PROVIDER'; readonly message: string }

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
	readonly frame: () => ProviderParserInterface
}
```

The relay types are declared now so the contract is complete; unit A2 implements them. `body`
returns `object` because a wire body is an interface value (ollama's `WireChatRequest`) that an
index-signature type would refuse; the base owns `JSON.stringify` of it.

**Semantics the base owns** (each one is a test you write):

1. `id` is a fresh `crypto.randomUUID()` per instance; `format` is exposed exactly as given
   (`undefined` when omitted). `name` is an abstract readonly member the subclass declares.
2. Each call arms one `Timeout` for `timeout ?? DEFAULT_PROVIDER_TIMEOUT` and folds
   `AbortSignal.any([timeout.signal, signal])`; the timeout is cleared on every exit path —
   success, failure, and abort — never left armed. Prove it through a recorded transport's signal
   that stays unaborted after the deadline would have fired.
3. The default transport is `globalThis.fetch` bound to `globalThis` (a bare reference through a
   field throws `Illegal invocation` in a browser). Prove the receiver: a provider built with no
   `fetch` option invokes the global with `globalThis` as `this`.
4. The `headers` hook is awaited inside the bounded region and raced against the combined signal,
   so a hook that never resolves rejects when the deadline fires; its entries merge over
   `Content-Type: application/json` (it may override the content type only by returning one).
5. One `POST` of `JSON.stringify(this.body(request))` to `url + (path ?? '')` with the combined
   signal. A non-OK status reads at most `MAX_ERROR_BODY_LENGTH` characters of the body through
   `readText`, cancels the remainder, and throws `ProviderError('HTTP', message, { status })` with
   the message `provider error: <status> - <excerpt>`; a body-read failure throws the same code and
   status with `(error body unavailable)` and the `cause`. A `null` body throws
   `ProviderError('PROTOCOL', …)`.
6. The body is decoded through `readChunks` (a streaming `TextDecoder`, final flush, reader
   cancelled in `finally`) and framed by one `frame()` parser per call; each record goes through
   `read`. At end of input the records `finish(parser)` returns go through `read` too, then the
   splitter is flushed and any held tail is yielded as the final content delta. `parser.clear()`
   runs in `finally`.
7. When `split` is `true` (the default) every record's raw `content` routes through one
   `createThinkSplitter()` per call and only clean content is yielded as `{ channel: 'content' }`;
   the splitter's authoritative `content` is the assembled result's content (across the qwen3
   implicit-open reclassification the result stays clean while already-yielded deltas cannot be
   recalled — keep that documented behaviour). When `split` is `false` raw content is yielded and
   accumulated verbatim. Native `thinking` is yielded as `{ channel: 'thinking' }` and joined
   through `joinThinking` with the splitter's separated spans. `tools` append. A present `usage`
   replaces the running one; an absent one keeps it.
8. A present `result` on an increment is the authoritative settled result: `stream` returns it
   unchanged (no re-assembly, no double count). When `strict` is `true` and end of input arrives
   with no `result`, throw `ProviderError('PROTOCOL', …)`.
9. A cancel of the combined signal mid-stream throws `ProviderAbortError` carrying the partial
   assembled so far, with the splitter flushed first so held clean content is included. Any other
   throw — a `ProviderAbortError` thrown by `read` for a remotely reported abort included —
   propagates unchanged. An already-aborted signal rejects before any request is issued.
10. `generate` drains `stream` with explicit `next()` calls and returns the terminal value, so
    `generate` deep-equals a drained `stream` on the same input. No subclass overrides it.
11. Concurrent calls on one instance share nothing: parser, splitter, timeout, and accumulators
    are per call.

**Errors** (`src/core/errors.ts`): `ProviderError extends Error` with `readonly code: ProviderErrorCode`,
`readonly status: number | undefined`, `name = 'ProviderError'`, `cause` carried through
`ErrorOptions`, constructor `(code, message, options?)`; `isProviderError` narrows through
`instanceof`. Follow the `ProviderAbortError` block's TSDoc form.

**Constants** (`src/core/constants.ts`): `DEFAULT_PROVIDER_TIMEOUT = 120_000`,
`MAX_ERROR_BODY_LENGTH = 2048`, `DEFAULT_RELAY_LIMIT = 1_048_576`,
`RELAY_CONTENT_TYPE = 'application/x-ndjson; charset=utf-8'`.

**Helpers** (`src/core/helpers.ts`): `buildProviderResult(content, thinking, tools, usage)` (moved
from ollama, omitting empty `thinking`, empty `tools`, and absent `usage`); `joinThinking` widened
so `''` on either side is treated as absent (`joinThinking('', 'x')` → `'x'`,
`joinThinking('x', '')` → `'x'`), behaviour-preserving for its existing callers;
`readText(body: ReadableStream<Uint8Array>, limit?: number): Promise<string>` (decodes, stops at
`limit` bytes, cancels the remainder, returns what it read); `readChunks(body): AsyncGenerator<string>`.
Every helper is a pure leaf, exported, and tested.

**Shapes and contracts** (the user's instruction). Declare one `ContractShape` per wire body in
`src/core/shapers.ts` with the `*Shape` form the contract guide fixes — a shape for `Message`
(role as `literalShape` over the `MessageRole` union, optional `calls` as an array of tool-call
records with `id`, `name`, and `arguments: recordShape(jsonShape())`, optional `images` as an array
of strings), `ProviderRequest` (messages, optional `tools` as `ToolDefinition` records with `name`,
optional `description`, optional `parameters: recordShape(jsonShape())`, optional `options` with
optional `think` and optional `schema: recordShape(jsonShape())`), `ProviderResult`, and
`RelayFrame` (a `unionShape` over the four arms) — and compile each once with `createContract` in
`src/core/contracts.ts`. Prove with `expectTypeOf` that each shape's `Infer` equals the declared
type in `types.ts` (types stay authoritative; the shape mirrors them), and prove the round trip:
`contract.is(value)` on a valid value, `parseJSONAs(JSON.stringify(value), contract.is)` returning
a deep-equal value, and `contract.explain` naming the path of a malformed field. Repair `isMessage`
to be exactly the compiled message contract's guard or to agree with it on every fixture, with a
failing test first for the arbitrary-role and non-string-image cases. `ToolCall.caller` is not in
the shape and never crosses a wire; say so in the shape's TSDoc.

**Class** (`src/core/AgentProvider.ts`): `export abstract class AgentProvider<TRecord = …> implements AgentProviderInterface<TRecord>`,
`#` fields for id, url, path, timeout, transport, headers, format, split, strict; constructor
`(input: AgentProviderInput)`; public getters `id`, `format`; public `generate`, `stream`; abstract
`name`, `frame`, `body`, `read`, `finish`; `#` methods for the request, the header merge, and the
per-record fold. No module-scope declaration beside the class. No nested function declarations;
an anonymous callback passed directly as an argument is the only in-body function allowed.

**Barrel** (`src/core/index.ts`): star-export the new files in the kind order the existing barrel
uses. Every intentional export is reachable from the barrel.

**Tests.** Mirror: `tests/src/core/AgentProvider.test.ts`, additions to `tests/src/core/errors.test.ts`
only if that file exists (never create a test file for errors, constants, or types alone),
`tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/shapers.test.ts`,
`tests/src/core/contracts.test.ts`. In `tests/setup.ts` add the promoted `createStreamingTransport`
and `createRefusingTransport` fixtures (keep their exact semantics; the ollama copies are the
reference) and a `ScriptedWire` fixture — a concrete `AgentProvider` subclass whose parser treats
each chunk as one record (`parse(chunk) => [chunk]`, `clear()` a no-op) and whose `read` maps a
scripted string to an increment (for example `c:` content, `t:` thinking, `u:` usage,
`x:` a tool call, `r:` a settled result). That fixture proves the engine without reproducing an
NDJSON parser; real NDJSON composition is proved in ollama. Cover every numbered semantic above,
plus: UTF-8 split across byte chunks; a record split across chunks reassembled by the fixture's
`finish`; `usage` replacement; `tools` accumulation across records; the implicit-open
reclassification; `strict` end-of-input failure; `split: false` verbatim passthrough; early
`return()` on the generator releasing the reader; a hostile `read` that throws propagating
unchanged. Record each defect-shaped test's failing count before the fix and its passing count
after, with the exact command.

## Unknowns

- Whether Vitest's worker forks spawn inside this sandbox. Report the reading under Observations.
- The exact value-naming the vendored `policy` lint plugin expects in `contracts.ts` (UPPER_SNAKE
  constants versus camelCase values). Read `configs/policy.ts` and `.oxlintrc.json`, follow what
  they enforce, and record which form you used and why.

## Scope

**Owned.** `src/core/types.ts`, `src/core/errors.ts`, `src/core/constants.ts`,
`src/core/helpers.ts`, `src/core/validators.ts`, `src/core/shapers.ts` (new),
`src/core/contracts.ts` (new), `src/core/AgentProvider.ts` (new), `src/core/index.ts`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/src/core/AgentProvider.test.ts` (new),
`tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`,
`tests/src/core/shapers.test.ts` (new), `tests/src/core/contracts.test.ts` (new), and any other
`tests/src/core/*.test.ts` the repaired `isMessage` makes false (derive the set by running
`npm run test:src:core`).

**Shared (report-only).** None — you are the sole writer.

**Off-limits.** `guides/**`, `README.md`, `tests/guides.test.ts` (unit A3), `src/core/factories.ts`
and `src/core/providers/**` and `src/core/RelayStream.ts` (unit A2), `package.json`,
`package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `AGENTS.md`,
`CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`, `node_modules/**`. Never list `tmp/probe/`
off-limits: it is your probe home.

**What asserts the state this change ends.** The `isMessage` examples in `src/core/validators.ts`
TSDoc and every `tests/src/core/**` assertion that relies on a lenient role or image element
(derive by running the suite); the `joinThinking` example and tests for `('', 'x')`; nothing
else in this checkout asserts the old shape. `guides/agent.md` and `tests/guides.test.ts` assert
the old surface and are A3's.

**Tools and limits.** PowerShell through your CLI; `npm run` scripts that read only:
`lint:check`, `check:src:core`, `check`, `test:src:core`, `test:setup`, `test:guides` (observation),
`test:probe` for a probe under `tmp/probe/`. Never `lint`, `format`, `build`, or `test` (the whole
chain) — the Orchestrator runs those on the host. Never install, commit, or read a credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write the report to `tmp/units/a1-report.md` inside this checkout and return the same text as
your final message. Shape:

- `Touched files`: each with one line on what changed and why; `git diff --stat` output.
- `Contract`: the final `types.ts` additions verbatim.
- `Red then green`: for every defect-shaped test — the `isMessage` cases, the `joinThinking`
  widening, the bounded error read, the hook race — the exact command, its failing count before,
  and its passing count after.
- `Scoped validation`: the exact commands run (`npm run lint:check`, `npm run check:src:core`,
  `npm run test:src:core`, `npm run test:setup`) with their exit codes and counts.
- `Observations`: `npm run test:guides` reading; the worker-spawn reading; the `contracts.ts`
  naming ruling; anything you measured that the Orchestrator should know.
- `Deviation`: `none`, or the stop report.
- `Status`: `git status --porcelain` verbatim.

No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the ruled contract cannot compile under the scoped config as written, when an installed
`@orkestrel/*` declaration contradicts a fact in this brief, or when a rule in the Law section
forbids something this brief instructs. Decide, record, and carry on from any question of test
naming, file ordering, or TSDoc wording.

## Acceptance criteria

1. `npm run lint:check` exits 0.
2. `npm run check:src:core` exits 0; `npm run check` exits 0.
3. Every declaration in § Contract exists in `src/core/types.ts` with the stated members and is
   exported from the barrel; `AgentProvider`, `ProviderError`, `isProviderError`,
   `buildProviderResult`, `readText`, `readChunks`, the shapes, and the compiled contracts are
   exported from the barrel.
4. `npm run test:src:core` and `npm run test:setup` exit 0 with every new test file collected
   (name each file and its test count), or the worker-spawn standing condition is recorded verbatim
   and the suite result is left to the Orchestrator.
5. `isMessage` rejects `{ id: '1', role: 'other', content: '' }` and
   `{ id: '1', role: 'user', content: '', images: [1] }`; red-then-green recorded.
6. `joinThinking('', 'x')` returns `'x'`; red-then-green recorded.
7. A non-OK response whose body exceeds `MAX_ERROR_BODY_LENGTH` bytes is read to at most that many
   bytes before the stream is cancelled; red-then-green recorded through a recorded stream.
8. A `headers` hook that never resolves rejects with the deadline's abort and leaves no armed
   timer; red-then-green recorded.
9. No `any`, `as` (other than `as const` on a literal field), `!`, `@ts-ignore`,
   `@ts-expect-error`, `eslint-disable`, `oxlint-disable`, `public`, `protected`, `private`, or
   parameter property anywhere in the diff; no module-scope declaration in `AgentProvider.ts`
   beside the class; no nested function declaration.

**Observations, not criteria.** `npm run test:guides` (red is expected until A3); the full
`npm test` chain and `npm run build` (the Orchestrator's).

## Review evidence

A code change: the report carries `git diff --stat` and `git status --porcelain`; the Orchestrator
takes the full diff from the tree.
