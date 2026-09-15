# Unit A2 — the relay: `RelayProvider`, `RelayStream`, `createRelay` in `@orkestrel/agent` core

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/agent`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit. Unit A1 has landed
and its audit findings were repaired: read `tmp/units/a1-report-2.md`, `tmp/units/a1-fix-report-3.md`,
and `git log --oneline -3` first, and build on the tree as it is — never restate or redo A1's work.

## Objective

Implement the agent-level relay on the contract A1 landed: the browser half (`RelayProvider`, a
concrete `AgentProvider` whose wire is `ProviderInterface` serialized), the server half
(`createRelay`, a host-independent `(request: Request) => Promise<Response>` handler over
`RelayStream`, a pull-driven NDJSON `Response` around one `provider.stream` call), the factories,
and the deterministic in-process proofs that drive a real `Request` through the handler and a real
`Response` back through the provider with no socket and no mock.

## Context

**Design record.** `../scaffold/.orkestrel/campaign/design-reconciliation.md` rows 6–9, 12, 14 and
`../scaffold/.orkestrel/campaign/plan.md` § "The ruled contract" (the `createRelay` flow, the
`RelayProvider` and `RelayStream` semantics). Those paragraphs are restated under § Semantics below
and that restatement is what you implement; where they disagree, stop and report.

**Evidence.**

- A1's landed contract: `src/core/types.ts` (`ProviderRequest`, `ProviderIncrement`,
  `RelayFrame`, `RelayHandler`, `RelayOptions`, `RelayStreamOptions`, `RelayProviderOptions`),
  `src/core/AgentProvider.ts` (the engine you extend), `src/core/shapers.ts` and
  `src/core/contracts.ts` (the compiled contracts for `ProviderRequest` and `RelayFrame` you
  validate with), `src/core/errors.ts` (`ProviderError`), `src/core/helpers.ts` (`readText`,
  `buildProviderResult`), `src/core/constants.ts` (`DEFAULT_RELAY_LIMIT`, `RELAY_CONTENT_TYPE`),
  `tests/setup.ts` (`createScriptedProvider`, `createStreamingTransport`, `ScriptedWire`).
- Prior art for the pull-driven response, evidence not authority:
  `../supervisor/app/server/InferenceStream.ts` (one awaited `next()` per pull, `cancel` aborts
  upstream then `return()`s the iterator, a settled flag guards late writes) and
  `../supervisor/app/server/ApplicationHandlers.ts:223-244` (authorize, parse, stream). Note what
  it omitted: `tools` never crossed, `MessageInput` replaced identified `Message`, deltas were
  re-wrapped in an `event` envelope. The ruled design carries `tools`, identified `Message`, and
  `ProviderDelta` verbatim.
- The runtime's abort handling that bounds what a remote abort means:
  `src/core/Agent.ts:478-500` treats a `ProviderAbortError` as a cancel only when its own bound
  signal is aborted; otherwise it rethrows. A remote abort therefore surfaces to an agent run as an
  error, not a partial. Document that on `RelayProvider`.
- `@orkestrel/router`'s handler shape the server half must satisfy:
  `../ollama/node_modules/@orkestrel/router/dist/src/core/index.d.ts:470` (`handle(request, state)`)
  and `:948` (`RouteHandler = (request, context) => Response | Promise<Response>`); a
  one-parameter function is assignable.

**Law.** As A1's brief: `../scaffold/AGENTS.md`; `../scaffold/.claude/rules/names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `documentation.md`
(TSDoc voice), `portability.md`, `quality.md`, `writing.md`. Skill:
`../scaffold/.agents/skills/orkestrel-harden-package/SKILL.md` with `references/contract.md`,
`references/centralization.md`, and `references/hardening.md` (§ Audit security and destructive
paths — a relay is an authentication boundary in front of a real credential). `@orkestrel/contract`:
`../scaffold/guides/contract.md` §§ JSON, Compilers, Patterns "Parsing JSON safely" and
"Compiling a contract". The user's standing instruction: every wire boundary strictly typed and
round-tripped through the compiled contracts.

**Host.** As A1's brief: Windows 11, PowerShell through the Codex CLI, network denied, `.git`
read-only (only `git status`, `git diff`, `git log`), writes only under this checkout, probes under
`tmp/probe/`.

**Measurements (Orchestrator).** A1's report carries the tree's state at your start; the
Orchestrator re-verified `npm run check:src:core` exit 0 on the host before dispatching you and
records the reading in `tmp/units/a2-baseline.txt`.

**Control identifiers.** None. Name every test for what it proves.

**Standing conditions.** As A1's brief: Vitest worker forks may fail to spawn in the sandbox
(record verbatim, do not diagnose); `test:guides` is red until A3; the API Extractor notice is
not a defect.

## Semantics

**`RelayProvider`** (`src/core/providers/RelayProvider.ts`, `extends AgentProvider`,
`name = 'relay'`): constructed from `RelayProviderOptions`; passes `super({ url, split: false, strict: true, ...options })`
(only `url`, `timeout`, `fetch`, `headers`, `format` reach the base; `path` is absent — the
endpoint is `url` itself); `frame()` returns `this.#parser()`; `body(request)` projects the request
through the compiled `ProviderRequest` contract — build the wire object from declared fields only
(`messages` with `id`, `role`, `content`, optional `calls` as `{ id, name, arguments }`, optional
`images`; `tools` with `name`, optional `description`, optional `parameters`; `options` with
optional `think`, optional `schema`), then require `contract.is(projected)`, throwing
`ProviderError('PROTOCOL', 'relay request is not JSON')` when it fails; `ToolCall.caller` never
crosses the hop, stated in TSDoc; `read(record)` narrows the record with the compiled `RelayFrame`
contract's guard, throwing `ProviderError('PROTOCOL', …)` on a bad frame, and maps: a `content`
delta → `{ content: text, thinking: '', tools: [] }`; a `thinking` delta → `{ content: '', thinking: text, tools: [] }`;
`result` → `{ content: '', thinking: '', tools: [], result }`; `abort` → throw
`ProviderAbortError(partial)`; `error` → throw `ProviderError('PROVIDER', message)`; `finish(parser)`
returns `parser.parse('\n')` so an unterminated final line is recovered.

**`RelayStream`** (`src/core/RelayStream.ts`): constructed from `RelayStreamOptions`; owns an
`AbortController` for the upstream call; starts `provider.stream(request.messages, upstream.signal, request.tools, request.options)`
once; exposes `get response(): Response` whose body is a `ReadableStream<Uint8Array>` with a
`pull` that awaits exactly one `next()` and enqueues one frame line (`JSON.stringify(frame) + '\n'`
through one `TextEncoder`), a `result` frame followed by `close()` when the iterator is done, an
`abort` frame carrying `error.partial` then `close()` when the iterator throws `ProviderAbortError`,
an `error` frame `{ channel: 'error', code: 'PROVIDER', message: RELAY_PROVIDER_MESSAGE }` (a fixed
message — never the thrown error's text, headers, stack, or cause; add the constant) then `close()`
for any other throw, and a `cancel` that aborts the upstream controller first, then calls
`iterator.return()`, then releases listeners. `options.signal` (the inbound request's signal) is
linked to the upstream controller with a `once` listener that is removed on settle. Response
headers: `content-type: RELAY_CONTENT_TYPE`, `cache-control: no-store`. A frame is validated with
the compiled `RelayFrame` contract before it is written (the round trip is proved from both ends).

**`createRelay`** (`src/core/factories.ts`): returns a `RelayHandler`. Flow, in order: if
`await authorize(request)` is not `true` → `new Response(undefined, { status: 401 })`; if the
request has no body → `400`; `readText(request.body, limit ?? DEFAULT_RELAY_LIMIT)` — when the
read reached the limit without ending → `413`; `parseJSONAs(text, contract.is)` for
`ProviderRequest` returning `undefined` → `400`; otherwise
`new RelayStream({ provider, request: parsed, signal: request.signal }).response`. An authorization
throw fails closed as `401`. No provider iterator exists before authorization and validation both
pass. Status literals live in `constants.ts` under names you choose in `{QUALIFIER}_{NOUN}` form.
`createRelayProvider(options)` returns a `RelayProvider`.

**Barrel**: add `providers/RelayProvider.js` and `RelayStream.js` rows in kind order.

## Unknowns

- Whether `ReadableStream` `pull` re-entrancy needs a guard in this runtime (a second `pull` while
  the first awaits `next()`). The WHATWG spec serializes pulls; prove it with a test that never
  observes two concurrent `next()` calls, and record the reading.

## Scope

**Owned.** `src/core/providers/RelayProvider.ts` (new), `src/core/RelayStream.ts` (new),
`src/core/factories.ts`, `src/core/constants.ts` (additions only), `src/core/index.ts`,
`src/core/types.ts` (only a TSDoc sentence A1 left for A2, if any — no member changes),
`tests/setup.ts` (additions only), `tests/src/core/providers/RelayProvider.test.ts` (new),
`tests/src/core/RelayStream.test.ts` (new), `tests/src/core/factories.test.ts`,
`tests/src/core/integration.test.ts` (the in-process hop).

**Shared (report-only).** None — you are the sole writer.

**Off-limits.** Everything A1 owned that this unit does not list (`AgentProvider.ts`, `errors.ts`,
`helpers.ts`, `validators.ts`, `shapers.ts`, `contracts.ts` — a needed change there is a stop-and-report,
not an edit), `guides/**`, `README.md`, `tests/guides.test.ts` (A3), `package.json`,
`package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`, the vendored set
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `tests/distribution.test.ts`,
`AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`, `node_modules/**`.

**What asserts the state this change ends.** Nothing in this checkout asserts the relay's absence;
`guides/agent.md` and `tests/guides.test.ts` assert the surface and are A3's.

**Tools and limits.** As A1's brief: read-only scripts (`lint:check`, `check:src:core`, `check`,
`test:src:core`, `test:setup`, `test:guides` as an observation, `test:probe`); never `lint`,
`format`, `build`, or the whole `test` chain; never install, commit, or read a credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write the report to `tmp/units/a2-report.md` and return the same text as your final message.
Shape as A1's: `Touched files` with `git diff --stat`; `Red then green` for each defect-shaped
test (the fail-closed authorization throw, the limit, the fixed error message, the abort frame
reconstruction); `Scoped validation`; `Observations`; `Deviation`; `Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
A1's landed contract cannot express a semantic above, when a file outside Owned must change, or
when a rule forbids an instruction here. Decide, record, and carry on from test naming, file
ordering, TSDoc wording, and the names of the status constants.

## Acceptance criteria

1. `npm run lint:check` exits 0.
2. `npm run check:src:core` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` and `npm run test:setup` exit 0 with every new file collected, or the
   worker-spawn standing condition is recorded verbatim.
4. The in-process hop: `createRelayProvider({ url: 'http://relay.test/', frame, fetch: (input, init) => handler(new Request(input, init)) })`
   in front of `createRelay({ provider: createScriptedProvider(...), authorize: () => true })`
   yields the scripted deltas in order and returns a result deep-equal to the scripted provider's
   own result, `thinking`, `tools`, and `usage` included; `generate` deep-equals the drained
   `stream`.
5. Authorization: `authorize` returning `false` → `401` and the scripted provider records no call;
   `authorize` throwing → `401`; a body over `limit` → `413` with no call; a body the contract
   rejects → `400` with no call.
6. Abort, both directions: cancelling the browser side's signal mid-stream aborts the request's
   signal, which aborts the scripted provider's signal, and the browser side throws
   `ProviderAbortError` whose `partial.content` equals the joined yielded deltas; a scripted
   provider that throws `ProviderAbortError` server-side produces an `abort` frame and the browser
   side rethrows `ProviderAbortError` with that partial while its own signal stays unaborted.
7. A scripted provider that throws a plain `Error('sk-secret')` server-side produces an `error`
   frame whose `message` is the fixed constant and contains no fragment of the thrown text; the
   browser side throws `ProviderError` with code `PROVIDER`.
8. `split: false` holds: a scripted content delta containing a literal `<think>` string reaches
   the browser side verbatim in both the yielded delta and the settled content.
9. Every frame written by `RelayStream` and every frame read by `RelayProvider` passes the same
   compiled `RelayFrame` contract; every request body sent and parsed passes the same compiled
   `ProviderRequest` contract; a request carrying a non-JSON `arguments` value throws
   `ProviderError('PROTOCOL')` before any fetch.
10. No `any`, assertion, non-null assertion, suppression, access modifier, or parameter property in
    the diff; no module-scope declaration beside a class in an implementation file; no nested
    function declaration; `RelayStream` exposes exactly `response`.

**Observations, not criteria.** `npm run test:guides`; the whole `npm test` chain and `build`.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator
takes the full diff from the tree.
