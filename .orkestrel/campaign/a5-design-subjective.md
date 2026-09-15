<!-- planner on Claude Opus 5, native Agent tool, clean context, read-only; the subjective lane of the A5 design round on a5-design-brief.md; returned 2026-09-15 after 505 s; retained verbatim from the returned message -->

Lane: subjective (planner, Opus 5)

## Design

Execute the server half as written, over a real loopback socket, and keep every substitution named in the prose. The transcription stops calling `handler` directly for the round trip, the route facts, the authorization refusal, and the client-disconnect cancel; it keeps calling `handler` directly only for the byte-limit refusal, where a socket adds nothing and the relay's own cap is the subject.

The composition stays inline in `tests/guides.test.ts`, because the transcription's value is that the lines a reader copies are the lines that run. Nothing new lands in `tests/setup.ts`: `@orkestrel/test` already exports `waitForCondition`, `waitForAbort`, and `createTeardown` (`agent/node_modules/@orkestrel/test/dist/src/core/index.d.ts:741`, `:727`, `:171`), and `tests/setup.ts` already exports the two providers the cases need (`createScriptedProvider` at `agent/tests/setup.ts:169`, `RecordedProvider` at `agent/tests/setup.ts:385`).

### 1. Verbatim versus substituted

Executed verbatim, in the fence's own order and wording: the `createRelay({ provider, authorize })` call with its bearer comparison; `createDispatcher({ routes: [{ method: 'POST', path: '/relay', handler }] })`; `createServer({ dispatcher, state: () => undefined })`; `await server.start()`; `dispatcher.handle(request, undefined)` as the body of the `serve` entry; `server.stop()`.

Substituted, each named in the prose at line 1097:

| Fence text | Transcription | Reason |
| --- | --- | --- |
| `parser: createNDJSONParser` | `parser: createParser` | Already substituted. `agent/tests/setup.ts:198` throws on a malformed line where the published parser skips it. |
| `createServer({ dispatcher, state })` | adds `host: '127.0.0.1'` | `.claude/rules/tests.md:31` fixes a fixture listener to `127.0.0.1` on an ephemeral port. The brief's Host note records that an all-interfaces bind raises the Windows Firewall prompt for `node.exe`. |
| `url: 'https://app.example/relay'` | `` url: `http://127.0.0.1:${port}/relay` `` from the port `start()` resolved | A test cannot reach a fictional origin. |
| `process.on('SIGTERM', () => server.stop())` | `await server.stop()` in each case's `finally` | A Vitest process outlives the case, so the listener would accumulate across cases and retain each stopped server. The executed `stop()` is the same call the fence's listener makes. |
| the fence's static `import` lines | dynamic `await import(...)` inside the `GuideCommand.execute` callback | The file already does this for `@src/core` and `./setup.js` (`agent/tests/guides.test.ts:49`, `:65`), because the callback runs in the Vitest worker while the file's top level runs in the driver. |

The fence changes in exactly one place, and the change is a correction rather than an accommodation. `agent/guides/agent.md:1124` reads `// stop draining new requests on shutdown`, which parses as "stop draining" and states the opposite of what `stop()` does. `scaffold/guides/server.md:276-296` fixes the behaviour: `stop()` refuses new connections, fires the stop signal, drains in-flight requests and claimed upgraded sockets to the `drain` deadline, then closes. Replace the comment with `// refuse new connections, drain in-flight requests, then close`. A fence comment is a claim, and `.claude/rules/documentation.md` treats a false one as a defect of the same kind as a wrong return value.

The fence does **not** gain `host`. The fence is production guidance, and a server in a container or behind a load balancer must bind every interface; teaching `127.0.0.1` in the published guide would break the reader's deployment to suit this repository's test host. Substitute in the transcription and say so.

The fence does **not** lose `process.on('SIGTERM', …)` and does not gain a platform gate. `.claude/rules/portability.md` § Processes and executables binds this repository's published source, not a reader's server, and adding `process.platform !== 'win32' &&` to a flagship fence costs more clarity than it buys.

Prose for line 1097, in the guide's voice:

> `@orkestrel/agent` declares no dependency on a newline-delimited JSON parser and none on a router, so the browser application supplies the parser — `createNDJSONParser` from `@orkestrel/ndjson` here — and the server application supplies the router. The executed transcription of these fences in [`tests/guides.test.ts`](../tests/guides.test.ts) mounts the relay on the dispatcher's route, starts the server, and drives the browser half against it over a real loopback HTTP hop: the round trip, the `405` a `GET` to `/relay` answers with its `Allow` header, the `404` a `POST` to another path answers, the `401` a wrong bearer answers, and the upstream turn a disconnected reader cancels each cross a socket. It substitutes what a test process cannot take from the fence. It frames the relay response with a parser from this repository's own test infrastructure, which throws on a malformed line where the published parser skips it. It passes `host: '127.0.0.1'`, so the listener stays on the loopback interface rather than on every interface a deployed server binds. It points the browser half at the port `start()` resolved instead of at `https://app.example/relay`. It calls `await server.stop()` in each case instead of registering the `SIGTERM` listener, which a test process outlives. The byte-limit refusal stays a direct call to the handler, because `limit` caps the body `createRelay` reads and `@orkestrel/server`'s own `limit` caps a different read — the `body()` a middleware or a route handler takes from the request context.

Line 1127 stays unchanged. Its claim about the adapter aborting the request's signal on client disconnect is now executed, and the paragraph at line 1097 names where.

### 2. Where the composition lives

Inline, in each case. Ruling, with the tension resolved rather than split: `.claude/rules/tests.md:70-72` states "Transcribe each flagship fence and assert the values its comments claim", and a fixture that owns `createRelay`, `createDispatcher`, `createServer`, and `start()` leaves the transcription asserting against the fixture instead of the fence. The substring guards would then be the only thing binding the fence's text to executed code, and `.claude/rules/documentation.md` rules that a substring check guards presence and nothing about behaviour.

"Export and test reusable logic" is satisfied without a fixture, because the reusable parts already exist and are already tested upstream: `waitForCondition` for the bounded named wait, `createTeardown` for newest-first teardown, `RecordedProvider` and `createScriptedProvider` for the upstream ends. `AGENTS.md` § Non-negotiable rules requires inspecting installed `@orkestrel/*` capabilities before implementing overlapping logic, and this is that case. Adding a `createRelayServer` to `agent/tests/setup.ts` would be a wrapper that renames `createServer`.

The repeated lines across cases are the fence's lines. Repeating them is the transcription, not duplication.

### 3. What the executed hop binds now

Ranked by what a real hop proves that the direct call could not, with determinism noted. Assert the first four and the teardown reading; refuse the last.

1. **The round trip over the socket.** Assert. Highest value: real chunking, the `RELAY_CONTENT_TYPE` and `cache-control` headers, and the NDJSON framing all survive a live response and the browser half's undici-backed global `fetch` decodes them — and the `POST /relay` route matched inside a running server rather than in a call the test made itself. Fully deterministic. Compare the assembled result against the same script driven directly through a second provider instance, not against a literal the relay could also produce; `.claude/rules/tests.md:35` forbids asserting an implementation against itself.
2. **The client cancel reaching the upstream turn.** Assert. This is the claim the change exists to close: `agent/guides/agent.md:1127` claims the adapter aborts the request's signal when the client disconnects, and nothing executes that today. The in-process suite (`agent/tests/src/core/integration.test.ts`) proves cancellation through a `Request` signal the test aborts itself, which skips exactly the adapter wiring under test. Made deterministic by the gate, not by a delay: construct `new RecordedProvider([{ content: 'relayed answer' }], gate.promise)` so the upstream turn parks on the first pull and cannot finish on its own; wait until `upstream.steps` reaches one; abort the browser's controller; assert the local `ProviderAbortError`; then `waitForCondition` on `upstream.returns === 1` and assert `upstream.cancelled === true`, which reads the relay's upstream signal at return time (`agent/tests/setup.ts:480-488`). Resolve the gate in the `finally` before `stop()`.
3. **The route facts answered by the dispatcher.** Assert, over the socket. A `GET` to `/relay` answers `405` with `Allow: POST` and a `POST` to another path answers `404`, both from the router's own defaults (`agent/node_modules/@orkestrel/router/dist/src/core/index.d.ts:488-492`). This replaces the current assertion at `agent/tests/guides.test.ts:477-479`, which inspects the request the handler received and therefore proves what the browser sent rather than what the route declares. Fully deterministic, no provider needed, cheapest case in the group.
4. **The `401` refusal over the socket, upstream unentered.** Assert. Adds over the direct call that a refusal carrying no body survives the adapter and reaches the browser as `ProviderError` with code `'HTTP'` and status `401`. Fully deterministic.
5. **`stop()` completing.** Assert as a teardown reading in each case rather than as its own case: after `await server.stop()`, `server.status` is `'stopped'` and `server.address` is `undefined` (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1731`, `:1738`). Free, and it guards the suite against a hung drain reporting as an unrelated timeout.
6. **The `413` limit over the socket.** Refuse. Unknown 1 settles that `@orkestrel/server`'s `limit` never intercepts a body the route handler reads itself, so the hop adds no coverage — and it adds a flake vector, because a server that answers `413` before draining the request body can reset the connection under some clients. Keep `agent/tests/guides.test.ts:545-569` unchanged as a direct call, and say why in the prose.

### 4. Lifecycle in a test

One server per case, started inside the case, stopped in a `finally` in the same case. Reason: each case scripts its own upstream, and `createServer` binds one dispatcher to one handler to one provider, so a shared server would need a mutable provider swap — state that drifts between cases and breaks the determinism `.claude/rules/tests.md:25` requires. An ephemeral loopback bind costs a fraction of a millisecond.

`finally`, not `afterAll`. `.claude/rules/tests.md:309` requires cleanup after a setup or assertion failure, and a per-case server has no module-scope variable an `afterAll` could reach. Use `createTeardown()` where a case registers more than the server.

`stop()`, not `destroy()`. `stop()` is the call the fence ends on, so executing it is transcription; `destroy()` would substitute away exactly the graceful behaviour the fence's comment names. Take `destroy()` only if probe P2 shows `stop()` cannot settle inside the case budget.

Timeout. The `guides` project sets no `testTimeout` (`agent/vite.config.ts:87-97`), so Vitest's 5 s default applies, against `DEFAULT_DRAIN_MS` of 10 s. Two mitigations, in order. First, the cancel case resolves the gate and waits for the return before `stop()`, so nothing drainable remains. Second, only if P2 still shows a park, pass `drain: 250` in that case's `createServer` call and name it in the prose as one more substitution. Do not raise `testTimeout`; `.claude/rules/tests.md:270` admits a timeout setting only for a verified need, and raising it hides the park instead of removing it.

### 5. The substring guards

The "carries the relay fence lines the transcription copies" case keeps every string it asserts today and adds these, so every executed line and every deliberately unexecuted line stays bound to the fence's text:

- `const server = createServer({ dispatcher, state: () => undefined })`
- `await server.start()`
- `process.on('SIGTERM', () => server.stop()) // refuse new connections, drain in-flight requests, then close`
- `const dispatcher = createDispatcher({`

`url: 'https://app.example/relay',` and `parser: createNDJSONParser,` stay, and they carry a second job now: they are what proves a substitution is a substitution rather than drift. The guards remain presence guards beside the executed cases, per `.claude/rules/documentation.md`.

### 6. The `## Tests` bullet and clause 36

The bullet at `agent/guides/agent.md:1473` changes. Its closing sentence, "It also runs the flagship fences and asserts the values their comments claim", stays true but no longer describes what the file proves. Extend that sentence to name the executed hop: `... and asserts the values their comments claim, including the relay fence's halves driven over a started @orkestrel/server listener on loopback — the declared route's own 405 and 404, the 401 refusal, and the upstream turn a disconnected reader cancels.`

Clause 36's "honest browser limit" text at `agent/guides/agent.md:1018` does not change, and the writer must refuse any edit that folds the loopback hop into it. That clause's evidence is a recorded Chrome 148 run; this hop runs `createRelayProvider` under Node against a Node listener, which is evidence about the wire and not about a browser. The sentence "It is not proven by a browser test project, because this package has none" stays exactly as written.

### Unknowns

**Unknown 1 — does the server's `limit` or a timeout intercept a body before the route handler reads it?** No. `ServerOptions.limit` is documented as "The default request-body byte cap the context's `body()` reads through" (`agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts:1833-1835`), and `scaffold/guides/server.md:331-340` confirms the cap lives in `readBody` behind the lazy, cached `MiddlewareContext.body()`. `createRelay` reads `request.body` through its own `readText` under its own `limit`, and the transcription registers no middleware, so `body()` is never called and `DEFAULT_BODY_LIMIT` (`1_048_576` bytes, `scaffold/guides/server.md:74`) never sees these bytes. `timeouts.request` maps to node's `requestTimeout` (`scaffold/guides/server.md:377-381`) and is omitted here, so node's default applies — far beyond a sub-second case. The declaration settles this; no probe is needed for the reading. The reason to keep the `413` case a direct call is the connection-reset risk in Design answer 3, not the cap's owner.

**Unknown 2 — does a client-side cancel over a real socket reach the route handler's `request.signal`?** The declared path exists end to end. `scaffold/guides/router.md:343-352`: `buildRequest` mints an `@orkestrel/abort` handle and aborts it when the paired `RequestOptions.response` closes before the response finished (`!response.writableEnded`), so "a handler observes both an incomplete request body and the ordinary post-request client disconnect through `request.signal`". `scaffold/guides/server.md:371-376` (clause 13) confirms `@orkestrel/server` builds its `Request` through that same `buildRequest` and links the signal to the server's stop signal. `agent/guides/agent.md:1018` (clause 36) states the relay's half: an inbound abort aborts the upstream controller and returns the generator. What no declaration settles is whether undici destroys the connection promptly enough on this Windows host for the chain to fire inside a case budget. That is probe P1. I did not read `ollama/tests/service/relay.test.ts`; it is a live-daemon proof and not evidence about this hop.

**Unknown 3 — is `process.on('SIGTERM', () => server.stop())` harmless inside a Vitest worker?** Reading, labelled as a reading rather than a measurement: registering a signal listener does not hold the event loop open, because Node unrefs the signal handle it creates; and Node documents `SIGTERM` as not supported on Windows, where it can be listened for but never fires. The guides project names no `pool` (`agent/vite.config.ts:87-97`), so it takes Vitest's default, and I did not verify from a run which pool that is on this host — a worker-thread pool would make the registration throw outright rather than merely accumulate. Either way the design substitutes, and the reason it states in the prose is the one that holds under every pool: a per-case listener accumulates across the file's cases and retains each stopped server, and the process outlives every case. Probe P4 settles the throw-or-warn question; it changes the prose's wording, not the substitution.

## Alternatives

**A `createRelayServer` fixture in `tests/setup.ts`, mirroring `ollama/tests/setupServer.ts:139-164`.** Cost: it moves `createRelay`, `createDispatcher`, `createServer`, and `start()` out of the transcription, so the transcription asserts against a helper and the fence's text is bound only by substring guards — which `.claude/rules/documentation.md` rules is not a behavioural proof. It also duplicates a fixture ollama owns for a different route (`/inference`, and an `authorize` over a different credential), and `AGENTS.md` § Authority and loading forbids importing logic from another repository. Recommendation: refuse. The design wins because the repetition across cases is the transcription itself, and the reusable parts that are genuinely reusable already exist in `@orkestrel/test`.

**Leave the transcription calling the handler directly and add the socket hop to `agent/tests/src/core/integration.test.ts`.** Cost: the user asked for the guide transcription to execute the route and the start-up, and this leaves the fence unexecuted; and `.claude/rules/tests.md:73-80` scopes a nested `integration.test.ts` to features composed within one environment with no part of the system under test replaced, so mounting `@orkestrel/server` there imports a server package into a core-scoped suite. Recommendation: refuse. The design wins because the guide's executable twin is where a fence's claims are falsified, and the in-process suite already proves the relay protocol without a socket.

## Constraints

Filled only where this lane read the evidence first-hand; the objective lane owns this section.

- `agent/node_modules/@orkestrel/server/package.json:29-34` — `@orkestrel/server`'s root `.` export resolves to `dist/src/server/index.d.ts`, so the fence's `import { createServer } from '@orkestrel/server'` is a root specifier and not a `/server` subpath.
- `agent/.oxlintrc.json:437-457` — the `tests/**` override restricts only `^typescript(?:[/?#]|$)`, so `@orkestrel/router` and `@orkestrel/server` imports in `tests/guides.test.ts` are permitted.
- `agent/node_modules/@orkestrel/router/dist/src/core/index.d.ts:498-505` — `DispatcherOptions.routes` exists, so the fence's `createDispatcher({ routes })` call is executable as written; `unmatched` defaults to a `404` response and `unmethoded` to a `405` with an `Allow` header (`:488-492`).
- `agent/src/core/types.ts:2178-2185`, `:2270-2274` — `ProviderOptions.fetch` is optional, so omitting it in the browser half makes `createRelayProvider` use the global transport and the hop real.
- `agent/package.json:88`, `:90` — `@orkestrel/router@^0.0.14` and `@orkestrel/server@^0.0.19` are declared development dependencies.

## Refusals

- `AGENTS.md` § Non-negotiable rules: "**NEVER** add an npm package unless the user explicitly requests it" — forecloses declaring `@orkestrel/ndjson` to drop the parser substitution.
- `AGENTS.md` § Design laws: "**No superfluous wrappers.** A wrapper must add a boundary, invariant, composition, translation, lifecycle, or materially narrower contract." — forecloses a `tests/setup.ts` waiter or teardown helper over `waitForCondition` and `createTeardown`.
- `.claude/rules/tests.md:31`: "Bind a test fixture server to `127.0.0.1` on an ephemeral port (`listen(0)`), never to `::1` and never to a fixed port" — forecloses transcribing the fence's omitted `host` verbatim.
- `.claude/rules/documentation.md` § Parity: "Never suppress a parity failure. Correct the drift." — forecloses softening clause 36's browser-limit sentence to absorb a Node hop.

## Measurements

The objective lane owns this section. The dispatch supplied: the A5-install receipt (`npm install --save-dev --ignore-scripts --no-audit --no-fund "@orkestrel/router@^0.0.14" "@orkestrel/server@^0.0.19"`, exit 0, 2026-09-15T00:39Z) and the `guides` project at 43 tests green from the `v1-verdict.md` verifier run at `d84b1a2`. Readings the design needs and the dispatch did not supply are named under Tensions.

## Units

**Unit A5-write — execute the relay route and server start-up in the transcription.**

- Role and engine: `implementer` on Opus 5, native Claude Code subagent, in the `agent` checkout. The unit's judgment load is documentation voice and substitution boundaries, which orchestration.md § The engines routes to Opus.
- Owned files: `agent/tests/guides.test.ts`, `agent/guides/agent.md`.
- Off-limits, named rather than merely unlisted: `agent/tests/setup.ts` and `agent/tests/setup.test.ts` (the design adds no fixture; naming them off-limits forecloses the wrapper the rejected alternative would create), everything under `agent/src/**`, `agent/package.json`, `agent/package-lock.json`, the vendored scaffold set, and the ollama checkout.
- Dependencies: the Orchestrator commits the dirty `package.json` and `package-lock.json` as the baseline first. No other unit runs concurrently in this checkout.
- Deviation contract: a conflict with executing the fence's `createServer` start-up stops the unit. Where a paragraph sits and which case name a proof takes are the unit's to decide and record.

Acceptance criteria, cheap-first:

1. `agent/guides/agent.md:1124` reads `process.on('SIGTERM', () => server.stop()) // refuse new connections, drain in-flight requests, then close`.
2. The "carries the relay fence lines the transcription copies" case asserts that exact SIGTERM line, `const server = createServer({ dispatcher, state: () => undefined })`, `await server.start()`, and `const dispatcher = createDispatcher({`, and still asserts every string it asserts at `agent/tests/guides.test.ts:571-582`.
3. `agent/guides/agent.md` line 1097's paragraph names each substitution the transcription makes — the parser, `host: '127.0.0.1'`, the loopback `url`, `await server.stop()` in place of the `SIGTERM` listener, and the byte-limit case staying a direct call — and `agent/guides/agent.md:1018` is byte-identical to its current text.
4. `agent/guides/agent.md:1473` names the executed hop.
5. `npx oxlint agent/tests/guides.test.ts` and the repository's `lint:check` over the owned files report no error.
6. `npm run check` exits 0.
7. `npm run test:guides` exits 0, every case in the relay group passes, and the run reports no skipped and no todo case.
8. `agent/tests/guides.test.ts` imports `createDispatcher` and `createServer` by root specifier through dynamic imports inside the `GuideCommand.execute` callback, and imports no `node:` module.
9. Each case that calls `createServer` calls `await server.stop()` in a `finally` and asserts `server.status` is `'stopped'` afterwards.

Probes the Orchestrator runs on the host, since neither lane can execute:

- **P1, before the unit.** Does aborting an undici `fetch` mid-response abort the route handler's `request.signal` through `@orkestrel/server` on this Windows host? Run the drafted cancel case alone in `tmp/probe/` and read `upstream.returns` and `upstream.cancelled`. If the chain does not fire, the cancel case drops from the unit's scope and the prose at line 1097 does not claim it.
- **P2, after the unit.** Does `await server.stop()` settle inside the 5 s case budget after the cancel case? Measure with `performance.now()`. A park toward `DEFAULT_DRAIN_MS` triggers the `drain: 250` substitution and a prose line naming it.
- **P3, before the unit.** Confirm a `127.0.0.1` bind under `npm run test:guides` raises no Windows Firewall prompt for `node.exe`.
- **P4, before the unit.** Register `process.on('SIGTERM', () => {})` inside a guides-project case and read whether Node throws, warns, or accepts. Decides the prose's wording for the SIGTERM substitution, not the substitution.
- **P5, after the unit.** The instrument-can-fail control that `.claude/rules/quality.md` § Instruments requires: in a scratch copy, change the fence's route to `/relayed` and confirm the route-facts case and the round-trip case redden, then discard the copy. Run it outside the checkout while no unit is live.

## Tensions

Named for the objective lane to challenge.

- **Correcting the fence comment.** I ruled `// stop draining new requests on shutdown` false and required the fence to change, which moves a substring guard and the ollama mirror. The objective lane may read the comment as merely terse rather than false, in which case the fence stays untouched and the diff shrinks.
- **Refusing the `413` over the socket.** I ruled the hop adds no coverage because the server's `limit` does not own that read, and I named a connection-reset flake risk I did not measure. The objective lane may hold that a `413` crossing the adapter is worth one more case.
- **Per-case server rather than per-`describe`.** I chose isolation over start-up cost without measuring either. The objective lane may find the ephemeral binds material to the suite's wall clock.
- **`stop()` rather than `destroy()`.** I chose the fence's own call and accepted a drain risk that P2 settles. The objective lane may hold that a test's teardown is `destroy()` by default and that transcription fidelity does not reach teardown.
- **The route facts replacing the received-request assertion.** I struck the current assertion at `agent/tests/guides.test.ts:477-479` as proving what the browser sent rather than what the route declares. The objective lane may hold that both readings are worth keeping.
- **No fixture in `tests/setup.ts`.** I ruled the ollama-shaped `createRelayServer` a wrapper. The objective lane may weigh "export and test reusable logic" more heavily than transcription fidelity.

## Risks

- **The cancel chain does not fire on this host.** Evidence that settles it: P1. If it does not fire, the guide's claim at line 1127 stays unproven and the paragraph at line 1097 must not claim the cancel — and that gap becomes a recorded limit rather than a silent omission.
- **`stop()` parks past the case budget after a cancelled stream.** Evidence: P2, with `performance.now()` around the `stop()` call.
- **A pooled Vitest worker rejects the SIGTERM registration outright.** Evidence: P4. It changes the prose's stated reason, not the design.
- **The substring guards drift from the fence when the SIGTERM comment changes.** Evidence: criterion 2 plus the `test:guides` run; the guard asserts the corrected line verbatim, so a half-applied edit reddens.
- **The ollama mirror of the agent guide goes stale.** The brief assigns the byte copy to the Orchestrator after this unit; a mirror refreshed before the unit lands carries the old comment.
- **The new cases pass for a reason other than the hop.** Evidence: P5. Without the negative control, a case that silently fell back to a direct call would read exactly like a case that crossed a socket.
