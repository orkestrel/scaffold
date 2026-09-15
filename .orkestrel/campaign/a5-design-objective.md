Lane: objective (analyst, GPT 6 Astra)

## Design

Propose an inline loopback transcription that executes the installed dispatcher and server, proves routing and authorization through HTTP, and destroys its listener in `finally`. Keep the published fences unchanged.

This is a source and contract review. Runtime conclusions remain subject to the host probes named under `Units`.

## Alternatives

The alternatives have these consequences.

- **Server fixture in `tests/setup.ts`: reject.** That module is host-independent; Node fixtures belong in `tests/setupServer.ts`, which the brief does not grant. See `scaffold/.claude/rules/tests.md:193`. The root `@orkestrel/server` import passing lint does not make the package host-independent.
- **Inline composition: propose.** The constructor calls are the transcription’s subject. Merge the authorization refusal into the flagship scenario so that the copied server composition has a single lifecycle.
- **Changing the fence to bind loopback: reject within this scope.** The server fence has a matching titled example in `agent/src/core/factories.ts:80`. Required parity would demand an off-limits source edit.
- **Socket cancellation as an additional shipped assertion: exclude from this unit.** It needs a provider that remains open after delivering a delta. The existing finite script does not establish that condition over a socket.

## Constraints

The following answers address the brief’s questions.

### 1. Verbatim versus substituted

Execute the `createRelay` construction and its bearer authorization verbatim, followed by the exact `createDispatcher({ routes })` construction from `agent/guides/agent.md:1110`.

Execute `await server.start()` verbatim. Read and narrow `server.port` afterwards to construct the endpoint; the installed declaration permits `undefined` before startup and after teardown (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1733`).

The server construction requires a stated substitution:

```ts
const server = createServer({
	dispatcher,
	state: () => undefined,
	host: '127.0.0.1',
})
```

Its dispatcher and state factory match the fence. The complete constructor expression is **not verbatim**, because the test adds `host`. Leave `port` omitted: the installed contract specifies an ephemeral port (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1821`).

Substitute the following test inputs and lifecycle operations.

- Supply a scripted upstream provider and a fictional bearer for the fence’s declarations.
- Use `http://127.0.0.1:<bound-port>/relay` for the browser endpoint.
- Keep `createParser` as the disclosed parser substitution.
- Use the global fetch transport; remove the handler-calling fetch override from the flagship transcription.
- Replace process signal registration with awaited teardown in `finally`.
- Use a typed message binding instead of copying the fence’s `as const` assertion.

Keep the fences unchanged. Their matching examples are in `agent/src/core/factories.ts:80` and `agent/src/core/factories.ts:146`; `scaffold/.claude/rules/documentation.md:37` requires their equality.

Propose this replacement for the prose at line 1097:

> `@orkestrel/agent` has no runtime dependency on a newline-delimited JSON parser, router, or server adapter. Your browser application supplies the parser, and your server application supplies the router and adapter. The executed transcription in [`tests/guides.test.ts`](../tests/guides.test.ts) constructs the relay and dispatcher, starts `@orkestrel/server`, and drives the browser provider through a loopback HTTP connection in Node. The test binds `127.0.0.1` on an ephemeral port and uses that address instead of `https://app.example/relay`. It supplies a scripted upstream provider and uses the repository’s test parser, which throws on malformed lines where `createNDJSONParser` skips them. Awaited teardown replaces the process signal listener. Separate parser and byte-limit checks exercise their narrower boundaries.

Correct the adapter explanation at line 1127:

> The `serve` function exposes the dispatcher to a runtime that accepts a fetch-standard handler. `@orkestrel/server` accepts the dispatcher directly, converts incoming requests and outgoing responses, and starts listening when you call `server.start()`. Its adapter aborts the request signal when the client disconnects before the response completes; the relay propagates that abort to the upstream provider.

The distinction matters: the installed server calls its dispatcher directly, not the exported `serve` function (`agent/node_modules/@orkestrel/server/dist/src/server/index.js:1942`). Keep the `serve` substring guard as a presence guard, without claiming the socket executes that wrapper.

### 2. Composition placement

Keep the flagship composition inline in its test callback. Merge the wrong-bearer assertion into that scenario, before any successful provider call.

This avoids inventing reusable server infrastructure solely to hide the lines the transcription must exercise. It also avoids shared listener state across test cases.

Keep the browser-parser-only test separate. Keep the byte-limit test as an explicitly narrower, direct-handler proof; do not describe it as socket coverage. Its existing purpose is the relay’s byte-budget clause, whereas the flagship transcription proves the server composition.

Do not introduce a local server factory, a nested lifecycle helper, or a server import into `tests/setup.ts`. If later scope requires reusable server machinery, grant its proper Node setup module and its setup test together.

### 3. Assertions over the executed hop

Rank the candidate assertions by their contribution to this request and their determinism.

| Assertion | Value | Determinism | Proposed disposition |
|---|---|---|---|
| Assembled result equals the directly driven provider | Essential | High with a scripted provider | Assert over HTTP, alongside an explicit expected result |
| `GET /relay` returns `405` with `Allow: POST`; another path returns `404` | Essential | High | Assert over HTTP |
| Wrong bearer returns `ProviderError`, code `HTTP`, status `401`, without entering upstream | High | High | Assert before successful calls |
| Relay byte-limit refusal over HTTP | Useful additional boundary coverage | Requires attribution probe | Retain existing direct proof; exclude socket migration |
| Client cancellation reaches upstream through the socket | High for the adapter’s cancellation contract | Requires a held stream and event observation | Host probe; no finite-script assertion |
| Graceful stop completes after cancellation | Useful lifecycle evidence | Depends on cancellation and pending-work state | Host probe; not the teardown contract of this unit |

For routing refusals, supply valid authorization and, for the unmatched `POST`, a valid relay request body. Otherwise an authorization or body failure can obscure whether routing caused the refusal. Consume each raw response body.

The dispatcher contract explicitly supplies the default `404` and `405` responses and the `Allow` header (`agent/node_modules/@orkestrel/router/dist/src/core/index.d.ts:488`).

Compare upstream state before successful calls. A zero-entry assertion after the round trip cannot be correct. After the refusals, drive the provider directly and through the socket with equivalent inputs, then compare results. Retain the explicit expected content so equality cannot pass because the compared paths share a defect.

### 4. Lifecycle

Give the inline scenario its own server. Place startup inside the `try`, and execute `await server.destroy()` in `finally`.

Use `destroy()` for test disposal. Its contract force-closes the listener and sockets and destroys the emitter; it is terminal and idempotent (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1797`). The implementation does not enter the graceful drain wait (`agent/node_modules/@orkestrel/server/dist/src/server/index.js:1897`).

Do not place an unconditional `await server.stop()` before `destroy()` in failure cleanup. A stalled stop would prevent execution from reaching the fallback. The default drain deadline is `10_000` ms, exceeding the brief’s `5_000` ms case timeout.

Do not increase the test timeout or change server drain settings without a measured need. The scoped host run must confirm startup, requests, and disposal fit the existing budget.

A future cancellation test must observe upstream abort **before** calling either lifecycle method: server shutdown itself aborts the linked request signal.

### 5. Substring guards

Keep the existing handler, authorization, route, dispatcher forwarding, browser construction, URL, parser, and byte-limit guards.

Add guards for these fence expressions:

```ts
const dispatcher = createDispatcher({
const server = createServer({ dispatcher, state: () => undefined })
await server.start()
```

Keep the guide’s server constructor guard even though the executable test adds `host`; disclose that difference beside the transcription.

These checks bind documented spellings. The successful socket exchange and routing refusals bind behavior. A substring check alone cannot establish that startup or dispatch executed.

### 6. Tests bullet and clause 36

Extend the `tests/guides.test.ts` bullet at `agent/guides/agent.md:1473` with:

> The relay transcription starts a loopback server in Node and checks the round trip, dispatcher refusals, and bearer refusal over HTTP.

Leave clause 36’s Chrome evidence unchanged. A Node loopback connection establishes neither execution in Chrome nor browser origin, CORS, TLS, or bundle-loading behavior. It does not create a browser Vitest project.

### Unknowns

The unknowns have these source findings and settling probes.

**Unknown 1 — body limits and timeouts.**

The installed server declaration ties `limit` to the context’s `body()` reader (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1833`). The server guide describes that reader as lazy and cached (`scaffold/guides/server.md:331`).

The implementation supports the narrower interpretation: server request setup creates a body-reading closure, and only invocation of that closure calls `readBody` (`agent/node_modules/@orkestrel/server/dist/src/server/index.js:1940`, `:2044`). The relay instead reads `request.body` through its own `readText` call (`agent/src/core/factories.ts:120`). With the fence’s empty middleware chain, the inspected path does not apply the server’s body cap.

Timeouts remain separate. The server maps the configured request timeout to Node’s `requestTimeout` (`agent/node_modules/@orkestrel/server/dist/src/server/index.js:1869`; `scaffold/guides/server.md:377`). The declaration does not establish how every interrupted upload manifests at the relay.

**Settling probe:** use a small relay limit, a complete valid body at that limit, and the same body with a larger relay budget. Record authorization entry, handler response status, upstream entry, and client status. As a discriminating control, set a smaller server limit and compare direct body reading with middleware that actually invokes `context.body()`. This distinguishes server collection from relay collection. Do not attribute a client `413` from status alone.

**Unknown 2 — cancellation through a socket.**

The adapter builds a request with the outgoing response supplied, then links its signal to the server stop signal (`agent/node_modules/@orkestrel/server/dist/src/server/index.js:1919`, `:1928`). The router aborts on response close before `writableEnded` (`agent/node_modules/@orkestrel/router/dist/src/server/index.js:89`). The router guide describes this boundary at `scaffold/guides/router.md:631`.

The checked-in live Ollama case at `ollama/tests/service/relay.test.ts:76` asserts the local abort partial and recorded request fields. It does **not** explicitly await upstream signal abortion. That stronger assertion appears in `ollama/tests/src/core/integration.test.ts:159`, using a response that stays open.

**Settling probe:** deliver a delta, hold the provider open on an explicit gate, confirm its signal remains unaborted, abort the browser operation, and await the upstream abort before shutdown. Observe provider finalization separately. Then call `stop()` and inspect the drain event. A finite script can finish while its bytes remain buffered, so it is an inadequate cancellation instrument.

**Unknown 3 — process signal registration.**

The process object inherits `EventEmitter` (`agent/node_modules/@types/node/process.d.ts:738`). Its listener API appends registrations without deduplication, and listener removal requires the registered function (`agent/node_modules/@types/node/events.d.ts:193`, `:340`). Copying the anonymous signal callback into repeated tests therefore leaves process-owned registrations unless explicitly removed.

The inspected declarations do not settle whether a signal registration keeps this host’s worker alive. Do not promote that assumption into a fact.

**Settling probe:** in an isolated host process and the configured Vitest worker, register and remove the listener, observe registrations, and check natural exit after disposal. An intentionally open listener socket supplies the liveness control. Regardless of the result, substitute awaited test teardown: signal registration does not provide assertion-failure cleanup.

## Refusals

The proposal excludes these changes and claims.

- No dependency installation, package edits, runtime source edits, vendored-file edits, or Ollama edits.
- No fence edits that would require changing the off-limits titled examples.
- No all-interface test listener, fixed port, or IPv6-only binding.
- No claim that default-server-limit and default-relay-limit status alone identifies the refusing component; the defaults coincide at `1_048_576` bytes.
- No claim that shutdown-induced upstream abortion proves client cancellation.
- No claim that passing prose guards proves execution.
- No browser validation claim from the Node project.

The general no-network default does not foreclose the objective: the user expressly requests a loopback HTTP hop, and the test rules prescribe loopback fixture-server binding.

## Measurements

The brief supplies an installation receipt with exit code `0`, router version `0.0.14`, and server version `0.0.19`. It also supplies the preceding green guides-project receipt.

This lane ran no tests or behavioral probes. No agent loopback duration, cancellation latency, signal-listener liveness result, or teardown measurement was established.

## Units

Propose writer unit **A5-relay-transcription**, role **`sol`**, engine **GPT-5.6 Sol**. The Orchestrator must record any engine substitution before dispatch.

The unit owns `agent/tests/guides.test.ts` and `agent/guides/agent.md`. It adds no fixture, so the setup files need no edits.

Acceptance proceeds cheap-first.

- Confirm the Orchestrator committed the dependency baseline and retained the installed guide tarball.
- Review the diff for permitted paths, unchanged titled fences, disclosed substitutions, and removed direct transport from the flagship transcription.
- Run scoped formatting, lint, and TypeScript checks. Resolve diagnostics without assertions, suppressions, or configuration edits.
- Run the relay transcription through the `guides` project on the host. Require real startup, result equality, explicit expected content, routing refusals, authorization refusal, and disposal.
- Run mutation controls with a valid collection graph: change the route method, change its path, and bypass bearer refusal. Each must break its corresponding behavioral assertion.
- Run `npm run test:guides`, then reread the changed prose against the executed behavior.
- Have the independent verifier run the required gate chain after integration.

Before dispatch, the Orchestrator runs the body-limit attribution, held-stream cancellation/drain, and signal-listener probes described under `Unknowns`. Record their exact instruments and results; they determine which additional claims the evidence permits.

After implementation, probe cleanup on successful execution and an intentional assertion failure after startup. Confirm the listener closes and the host runner exits. Run socket-dependent verification outside this lane’s sandbox. Do not run `npm ci` or `npm install`.

## Tensions

The proposal resolves the relevant tensions as follows.

- **Verbatim transcription versus loopback binding:** preserve the published fence and disclose the test’s added host option.
- **Reuse versus executable examples:** keep the copied composition inline and consolidate the flagship authorization assertion into its lifecycle.
- **Scope permission versus environment placement:** an optional fixture path does not require creating a Node fixture in host-independent setup.
- **Cancellation value versus deterministic evidence:** require a held-stream probe before proposing a socket cancellation assertion.
- **Runtime dependencies versus development dependencies:** replace “no dependency on a router” with “no runtime dependency” because the installed development declaration makes the unqualified sentence false.

## Risks

The main false-positive risks are a direct-call transport left in the flagship case, refusal assertions reached through the wrong boundary, cancellation observed only after shutdown, and prose claiming broader execution than the tests provide.

The remaining runtime risk is host-specific listener and teardown behavior. The scoped host run and forced-failure cleanup probe must settle it before acceptance.