# Unit A5-design — execute the relay route and server start-up in the agent guide's transcription

One brief, sent identically to the subjective lane (`planner`, Opus 5, native Agent tool, read-only)
and the objective lane (`analyst`, GPT 6 Astra, `codex exec --sandbox read-only` rooted at
`C:/Users/mikes/WebstormProjects`). Each lane reads this brief and its evidence slice, and nothing
else of the campaign. Read `../scaffold/AGENTS.md`, `../scaffold/.agents/orchestration.md`, and the
rule files named under Law before acting (from the Astra root those paths are `scaffold/AGENTS.md`
and so on; from the agent checkout they are `../scaffold/...`).

## Role and engine

Subjective lane: `planner` on Opus 5, reached as a native Claude Code subagent (tools: Read, Grep,
Glob; no edit, no shell). Objective lane: `analyst` on GPT 6 Astra (`gpt-6-astra`, standing in for
Sol per the routing ledger), reached as `codex exec --sandbox read-only` rooted at the checkouts'
parent. You are the engine reading this brief: perform the design yourself and spawn nothing.
Propose; never accept. The Orchestrator reconciles the lanes.

## Objective

Design the change that makes the executed transcription of the guide pattern "Relaying a browser
provider through your own server" (`agent/guides/agent.md`, heading at line 1093) execute the
server half's `createDispatcher` route and its `createServer` start-up, and drive the browser half
over a real loopback HTTP hop, instead of calling the `RelayHandler` directly. The user asked for
exactly this on 2026-09-14: "Add router and server as agent devDependencies, i want the guide
transcription to execute the relay route and server start-up rather than drive the handler
directly." The dependencies are declared and installed (see Evidence). The design decides what the
transcription executes verbatim, what it substitutes and where the guide says so, what a real hop
lets the transcription assert that the direct call could not, and what the lifecycle in a test
looks like.

## Context

**What the campaign already settled (not on trial here).** `AgentProvider` is the host-independent
HTTP engine; `createRelay` returns a fetch-standard `(request: Request) => Promise<Response>`;
`createRelayProvider` is the browser end; the relay refuses with `401`/`413`/`400`/`502` and each
refusal reaches the browser as a `ProviderError` with code `'HTTP'`; `@orkestrel/agent` declares no
runtime dependency on a parser or a router, and the guide fences name `@orkestrel/ndjson`,
`@orkestrel/router`, and `@orkestrel/server` as the consumer's own installs. `@orkestrel/ndjson`
stays undeclared in agent: the transcription keeps substituting the test-infrastructure parser
(`createParser` in `agent/tests/setup.ts:198`). Do not propose adding ndjson or any other package.

**Evidence: the dependencies are declared (A5-install, Orchestrator tracked command, 2026-09-15T00:39Z).**

```text
$ npm install --save-dev --ignore-scripts --no-audit --no-fund "@orkestrel/router@^0.0.14" "@orkestrel/server@^0.0.19"   (in agent)
npm install exit: 0
router installed after: "version": "0.0.14"
server installed after: "version": "0.0.19"
agent status after: [ M package-lock.json  M package.json ]
```

```diff
--- a/package.json
+++ b/package.json
@@ -85,7 +85,9 @@
 		"@microsoft/api-extractor": "^7.59.1",
 		"@orkestrel/guide": "^0.0.18",
 		"@orkestrel/probe": "^0.0.14",
+		"@orkestrel/router": "^0.0.14",
 		"@orkestrel/scaffold": "^0.0.67",
+		"@orkestrel/server": "^0.0.19",
 		"@orkestrel/test": "^0.0.14",
```

The lockfile gained the same two root `devDependencies` lines and dropped `"peer": true` from the
existing `node_modules/@orkestrel/router` and `node_modules/@orkestrel/server` entries; both packages
were already installed at those versions as transitive development dependencies, so the installed
tree did not change. The catalog (`scaffold/.claude/agents/orkestrel.md`) lists router `0.0.14` (L2)
and server `0.0.19` (L3); both depend on `@orkestrel/contract ^0.0.17`, the range agent declares, so
no duplicate copy is installed. The agent tree is otherwise at commit `d84b1a2`, clean.

**Evidence: the installed server surface** (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts`).

- `createServer<TState>(options: ServerOptions<TState>): ServerInterface<TState>`; `ServerOptions`
  at line 1863: `{ dispatcher, state, middleware?, host?, port?, drain?, limit?, expose?, report?, timeouts?, sockets?, on?, error? }`.
- `host` — "The network interface `start()` binds to … Omitted ⇒ node's default (all interfaces)."
  (line 1818).
- `port` — "Omitted or `0` ⇒ an ephemeral, OS-assigned free port (the default); `start()` always
  resolves the actually-bound port." (line 1820).
- `drain` — the graceful-stop deadline, default `DEFAULT_DRAIN_MS` = `10_000` ms (line 1826; the
  constant in the scaffold mirror `scaffold/guides/server.md:73`).
- `limit` — "The default request-body byte cap the context's `body()` reads through. Defaults to
  `DEFAULT_BODY_LIMIT`." (line 1833). Whether that cap applies to a body a route handler reads
  itself through `request.body` / `request.text()` — as `createRelay` does through its own
  `readText` under its own `limit` — is an Unknown below.
- `ServerInterface` (line ~1730): `port: number | undefined`, `address: AddressInfo | undefined`,
  `start(signal?: AbortSignal): Promise<number>` resolving the bound port, `stop(): Promise<void>`
  (graceful drain then close), `destroy(): Promise<void>` (terminal, idempotent).
- `state: () => undefined` type-checks against `ConnectionStateFunction<undefined>` when
  `createDispatcher()` is called with its default `TState = undefined`
  (`agent/node_modules/@orkestrel/router/dist/src/core/index.d.ts:250`:
  `createDispatcher<TState = undefined>(options?: DispatcherOptions<TState>)`; `handle(request, state: TState)` at line 470).
- The router answers an unmatched path with a `404` `Response` and a matched path with an
  unregistered method with a `405` `Response` carrying an `Allow` header
  (`router/dist/src/core/index.d.ts:489-492`).

**Evidence: the ollama package already runs this composition as a test fixture** — reuse first.
`ollama/tests/setupServer.ts:123-152` (`createRelayServer`): `createRelay({ provider, authorize })`,
`createDispatcher<Record<string, never>>()`, `dispatcher.add({ method: 'POST', path: '/inference', handler })`
recording each request, `createServer({ dispatcher, state: () => ({}), host: '127.0.0.1' })`,
`const port = await server.start()`, returns `{ url: \`http://127.0.0.1:${port}\`, requests, stop() }`.
It binds `127.0.0.1` explicitly. Its consumer `ollama/tests/src/core/integration.test.ts` calls it in
several cases and stops the server in each.

**Evidence: the guide pattern as it stands** (`agent/guides/agent.md:1093-1150`). The prose at
line 1097 states the current substitutions: the parser, and "it calls the handler directly instead of
routing through the dispatcher, asserting the method and the path the route declares against the
request the handler receives. It never executes the `createServer` start-up that follows the
dispatcher, so that half is proven by the installed `@orkestrel/server` declaration the fence matches
rather than by an executed run here." The server-half fence (lines 1101-1125):

```ts
import type { ProviderInterface } from '@orkestrel/agent'
import { createRelay } from '@orkestrel/agent'
import { createDispatcher } from '@orkestrel/router'
import { createServer } from '@orkestrel/server'

declare const upstream: ProviderInterface // the server-side provider holding the credential
declare const bearer: string

const handler = createRelay({
	provider: upstream,
	authorize: (request) => request.headers.get('authorization') === `Bearer ${bearer}`,
})
const dispatcher = createDispatcher({
	routes: [{ method: 'POST', path: '/relay', handler }],
})

export function serve(request: Request): Promise<Response> {
	return dispatcher.handle(request, undefined)
}

const server = createServer({ dispatcher, state: () => undefined })
await server.start()
process.on('SIGTERM', () => server.stop()) // stop draining new requests on shutdown
```

The prose after it (line 1127) claims the adapter "abort[s] that request's signal when the client
disconnects, so a reader that goes away cancels the upstream turn instead of leaving it running", and
that `createServer` "binds the same `dispatcher` and starts listening, as the fence shows". The
browser-half fence (lines 1131-1148) constructs `createRelayProvider({ url: 'https://app.example/relay', parser: createNDJSONParser, headers: () => ({ authorization: \`Bearer ${bearer}\` }) })`
and calls `browser.generate(messages, abort.signal)`.

**Evidence: the transcription as it stands** (`agent/tests/guides.test.ts:445-582`). The cases:
"round trips both relay fence halves and carries the route the server half declares" (constructs
`createRelay` from the fence's lines, drives `createRelayProvider` with a `fetch` that calls the
handler directly and records the `Request`, asserts the result, `browser.name`, then the recorded
request's `POST` and `/relay`); "decodes a scripted relay body through the fence's browser half
alone"; "refuses the relay fence's hop when the bearer does not match" (401 through the direct call,
`upstream.started` 0); "refuses a relay body at its byte limit and admits one below it" (the
`limit` clause, direct call); "carries the relay fence lines the transcription copies" (substring
guards: `const handler = createRelay({`, the `authorize` line, `routes: [{ method: 'POST', path: '/relay', handler }],`,
`return dispatcher.handle(request, undefined)`, `const browser: ProviderInterface = createRelayProvider({`,
`url: 'https://app.example/relay',`, `parser: createNDJSONParser,`). The file runs under the
`guides` Vitest project (`agent/vite.config.ts:87-95`, `environment: 'node'`, setup file
`tests/setup.ts`), and `npm run test:guides` is `node --experimental-strip-types tests/guides.test.ts`,
which drives that project through `GuideCommand` with `runner: createVitest`
(`agent/tests/guides.test.ts:11-42`). The fixtures the cases use come from `agent/tests/setup.ts`:
`createScriptedProvider` (line 169; `record: true` populates `calls` with each call's `signal`;
`started` counts `stream` entries), `createParser` (line 198, throws `ProviderError('PROTOCOL', …)`
on a malformed line), `RecordedProvider` (line 385, `entries` counts `stream` entries).

**Evidence: the nearest sibling suite** — `agent/tests/src/core/integration.test.ts:27-247`
("in-process relay hop": 401/413/400 refusals without entering `stream`, a full round trip
deep-equal to the provider driven directly, browser cancellation propagated through the request and
upstream signals, a server abort reconstructed, a secret upstream failure translated). That suite
proves the hop in process. The transcription is the guide's executable twin, not a second copy of
that suite.

**Evidence: lint boundaries.** `agent/.oxlintrc.json` overrides govern `src/core/**` (no `node:`
imports, no `@orkestrel/*/server` subpaths) and `tests/**` separately (line 438 onward). A root
specifier `@orkestrel/server` is not a `/server` subpath, and the ollama test fixture imports it the
same way. The tests override's own restriction list is at `agent/.oxlintrc.json:438-480`; read it
before proposing a `node:` import in a test file.

**Law.** `scaffold/AGENTS.md` (types-first, single-word members, no `any`/`as`/`!`, no mocks,
centralized kind files, the writing rules including "NEVER state a count"), `scaffold/.claude/rules/tests.md`,
`scaffold/.claude/rules/documentation.md` (falsify a prose claim the way you falsify a code claim;
a titled `@example` equals the guide fence under that title; re-read the prose last against what
shipped), `scaffold/.claude/rules/writing.md`, `scaffold/.claude/rules/architecture.md`,
`scaffold/.claude/rules/patterns.md`, `scaffold/.claude/rules/quality.md`. Skill: none. Guides:
`agent/guides/agent.md` (the subject), `scaffold/guides/server.md` and `scaffold/guides/router.md`
(the scaffold's mirrors of the two dependencies' guides — read § Patterns "Quickstart",
"Graceful shutdown", and the router's "Basic server" and "Observing client disconnect").

**Host.** The Astra lane runs read-only in a PowerShell exec rooted at `C:/Users/mikes/WebstormProjects`
with the network denied; it can read every checkout and run nothing that writes. The Opus lane has
Read, Grep, and Glob only. Neither lane runs a test; the design names what a probe would show and the
Orchestrator runs it. Windows host: a listener bound to all interfaces can raise the Windows
Firewall prompt for `node.exe` on first bind, where a `127.0.0.1` bind does not.

**Measurements.** The install receipt above. Test counts at the current tip: the `guides` project
reports 43 tests green (`v1-verdict.md`, verifier at `d84b1a2`). No measurement of a loopback hop's
duration exists in agent; the ollama suite's relay cases run in well under a second each on this host.

**Control identifiers.** None; a test is named for what it proves.

**Standing conditions.** `package.json` and `package-lock.json` in agent are dirty with the diff
above; the Orchestrator commits them as the baseline before any writer launches. The installed
`@orkestrel/guide` is the packed tarball from guide `9863e77` (its key grammar admits
`export abstract class`); a clean `npm ci` would revert it — the writer must not run `npm ci` or
`npm install`. Git inside the Astra sandbox warns about `C:\Users\mikes/.config/git/ignore`; harmless.

## Unknowns

1. Whether the server's `limit` (`DEFAULT_BODY_LIMIT`) or its request timeouts intercept a body
   before a route handler that reads `request.body` itself, so a relay `413` proof over the hop
   could be answered by the server rather than by `createRelay`. Report what the installed
   declaration and the scaffold's server guide say, with `file:line`; where they do not settle it,
   name the probe that would.
2. Whether a client-side cancel over a real socket (the browser end aborting its `fetch` signal
   mid-stream) reaches the route handler's `request.signal` through `@orkestrel/server` and
   therefore the upstream provider's signal, and how deterministically a test can observe it
   (the ollama live suite's "caller drop proven" case did this against the daemon; cite
   `ollama/tests/service/relay.test.ts` if you read it). Report the evidence and name the probe.
3. Whether executing `process.on('SIGTERM', () => server.stop())` inside a Vitest worker is
   harmless (a listener that does not keep the event loop alive) or must be substituted. Report
   your reading and its source.

## Scope of the design (what the eventual unit may own)

Owned by the eventual writer: `agent/tests/guides.test.ts` (the relay cases and their substring
guards), `agent/tests/setup.ts` (a fixture, if the design places one there — a class with `#`
fields for stateful behaviour, a `create*` factory, exported and tested per `AGENTS.md`),
`agent/guides/agent.md` (the prose at line 1097 and line 1127 that states what the transcription
does; the `## Tests` bullet for `tests/guides.test.ts` at line 1473 if the design changes what it
runs; the fences only if the design rules a fence line must change), `agent/tests/setup.test.ts`
(a test for any fixture added to `tests/setup.ts`, following that file's existing shape). Off-limits:
everything under `agent/src/**` (no runtime change is in scope), `agent/package.json` and
`agent/package-lock.json` (the Orchestrator owns them; the install already happened), the vendored
scaffold files (`tests/policy.test.ts`, `tests/setupPolicy.ts`, `tests/config.test.ts`,
`.claude/**`, `configs/**`, `vite.config.ts`, `.oxlintrc.json`), and the ollama checkout entirely
(its mirror of the agent guide is refreshed by the Orchestrator afterwards by byte copy).

## Questions the design must answer

1. **Verbatim versus substituted.** Which lines of the server-half fence the transcription executes
   verbatim (the `createRelay` call with its `authorize`, the `createDispatcher({ routes })` call,
   `createServer({ dispatcher, state: () => undefined })`, `await server.start()`) and which it
   substitutes with a stated reason: the browser half's `url` (a loopback `http://127.0.0.1:<port>/relay`
   in place of `https://app.example/relay`), the `host` (the fence omits it, binding all interfaces;
   the ollama fixture binds `127.0.0.1`), the `process.on('SIGTERM', …)` line, and the parser
   (already substituted). Say whether the fence itself should change — for example whether the
   fence gains `host` or keeps binding all interfaces as a real server would — and how the prose at
   line 1097 reads afterwards, in the guide's voice and under `writing.md`.
2. **Where the composition lives.** Inline in the test case (the fence's lines copied, as the other
   flagship transcriptions do), or a fixture in `tests/setup.ts` shaped like ollama's
   `createRelayServer` (a started server with `url`, recorded requests, `stop`). Rule on the
   tension between "the transcription copies the fence's lines so the substring guards bind" and
   "reusable logic is exported and tested".
3. **What the executed hop binds now.** Rank these by value and by determinism, and say which the
   unit should assert: the round trip over the socket with the assembled result equal to the
   provider driven directly; the route's method and path proven by the dispatcher itself (a `GET`
   to `/relay` answering `405` with `Allow: POST`, a `POST` to another path answering `404`) rather
   than by inspecting the request the handler received; the `401` refusal over the socket with the
   upstream unentered; the `413` limit over the socket (see Unknown 1); the browser-side cancel
   propagating through the socket to the upstream provider's signal (see Unknown 2); the server's
   `stop()` completing after a cancelled stream (drain interplay).
4. **Lifecycle in a test.** `start()` before the assertions and `stop()` (or `destroy()`) in a
   `finally` or `afterAll`; one server per case or one per `describe`; the Vitest default 5 s case
   timeout against `DEFAULT_DRAIN_MS` = 10 s if a cancelled stream leaves an in-flight request at
   `stop()`; whether `destroy()` is the right teardown for a test.
5. **The substring guards.** Which fence lines the "carries the relay fence lines" case must add
   or keep so that the executed lines and the guide's lines stay bound (`const server = createServer({ dispatcher, state: () => undefined })`,
   `await server.start()`, the routes line).
6. **The guide's `## Tests` bullet and the contract clause 36.** Whether the `tests/guides.test.ts`
   bullet at line 1473 changes ("runs the flagship fences and asserts the values their comments
   claim" — does it need to name the executed hop?), and whether the "honest browser limit" text in
   clause 36 (line 1018) is affected (it names a Chrome 148 run; the loopback hop here is Node, not a
   browser — say so if the prose must not overclaim).

## Output

Return exactly the sections your role file names (`Design`, `Alternatives`, `Constraints`,
`Refusals`, `Measurements`, `Units`, `Tensions`, `Risks`), filling the ones your lane owns in full
and the others where you have evidence. First line: `Lane: subjective (planner, Opus 5)` or
`Lane: objective (analyst, GPT 6 Astra)`. Answer the six questions above explicitly under `Design`
(subjective) or `Constraints` (objective), numbered 1-6, and the three Unknowns under a `Unknowns`
subsection with `file:line` evidence. Under `Units`, name one writer unit with its role and engine,
owned files, and cheap-first acceptance criteria, and name the probes the Orchestrator must run on
the host before or after it. No process diary.

## Deviation contract

A lane that finds the objective unachievable under the law (a rule forecloses every option) stops
and says which rule, quoting it. Everything else is the lane's to decide and record.
