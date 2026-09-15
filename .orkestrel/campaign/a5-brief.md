# Unit A5 — execute the relay route and server start-up in the agent guide's transcription

## Role and engine

`implementer` on Opus 5, reached as a native Claude Code subagent (tools: Read, Grep, Glob, Edit,
Write, Bash), working in the checkout `C:/Users/mikes/WebstormProjects/agent` as its sole writer.
You are the engine reading this brief: perform the assignment directly and spawn nothing.

Read, in this order, before editing: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`;
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`, `documentation.md`,
`writing.md`, `typescript.md`, `architecture.md`, `patterns.md`, `names.md`, and `quality.md` in
that same directory (the agent checkout carries vendored copies under its own `.claude/rules/`;
the scaffold copies are canonical); then `guides/agent.md` in the agent checkout (the subject:
§ "Relaying a browser provider through your own server" at line 1093, the `## Tests` bullet at
line 1473, clause 36 at line 1018), and the scaffold's mirrors
`C:/Users/mikes/WebstormProjects/scaffold/guides/server.md` (§ Patterns "Quickstart" and
"Graceful shutdown", § Methods) and `.../scaffold/guides/router.md` (§ Patterns "Basic server",
"Observing client disconnect"). Skill: none.

## Objective

Make the executed transcription of the guide's relay pattern in `tests/guides.test.ts` mount the
server half's `createDispatcher` route, start `@orkestrel/server` with `createServer`, and drive
the browser half against that listener over a real loopback HTTP hop, instead of calling the
`RelayHandler` directly; state every substitution the transcription makes in the guide's prose;
and correct the fence's stop comment in both of its twins. The user asked for this on 2026-09-14:
"Add router and server as agent devDependencies, i want the guide transcription to execute the
relay route and server start-up rather than drive the handler directly."

## Context

**Design ruling (the Orchestrator's, after a blind adversarial design round; not on trial here).**

- The composition stays inline in the test cases. No fixture lands in `tests/setup.ts` (that file
  is host-independent by `tests.md` § Shared test infrastructure) and no `tests/setupServer.ts`
  is created. Reusable waits come from `@orkestrel/test`: `waitForCondition(description, condition, options?)`
  (default budget 1000 ms, interval 10 ms), `waitForAbort(signal)`, `createTeardown()`, and
  `requireValue` — all declared in `node_modules/@orkestrel/test/dist/src/core/index.d.ts`
  (lines 741, 727, 171, 465).
- The fences keep their shape. Their titled twins are the `@example Mounting the relay on your server`
  block at `src/core/factories.ts:80-105` and `@example Reaching the relay from the browser` at
  `:146-163`; the guides test asserts each titled fence equals its `@example` block. Exactly one
  fence line changes, in both twins: the stop comment (criterion 1).
- The transcription substitutes, and the prose says so: the parser (already substituted:
  `createParser` from `tests/setup.ts:198`, which throws `ProviderError('PROTOCOL', …)` on a
  malformed line where `createNDJSONParser` skips it); `host: '127.0.0.1'` added to the
  `createServer` call (`tests.md` line 31: "Bind a test fixture server to `127.0.0.1` on an
  ephemeral port"; the fence omits `host` because a deployed server binds every interface); the
  browser half's `url` as `http://127.0.0.1:${port}/relay` where `port` is what `await server.start()`
  resolved; and `await server.stop()` in each case's `finally` in place of
  `process.on('SIGTERM', () => server.stop())`, which a test process outlives. The fence's static
  `import` lines become dynamic `await import(...)` calls inside the `GuideCommand.execute`
  callback, as the file already does for `@src/core` and `./setup.js` (`tests/guides.test.ts:49-66`),
  because the callback runs in the Vitest worker.
- The route is proven by the dispatcher itself over the socket, the `401` crosses the socket, the
  round trip crosses the socket, and the browser-side cancel crosses the socket to the upstream
  provider's signal. The byte-limit (`413`) case stays a direct call to the handler: the server's
  `limit` caps the `body()` read of its middleware context (`node_modules/@orkestrel/server/dist/src/server/index.js:2044-2049`),
  which nothing here calls, and the relay caps the body it reads itself.
- One server per case that needs one. Teardown is `await server.stop()` (the fence's own call) in
  `finally`, then `server.status` is `'stopped'` and `server.address` is `undefined`.

**Evidence — the tree.** `git -C C:/Users/mikes/WebstormProjects/agent log --oneline -1` →
`0102259 chore: declare router and server as development dependencies`; `git status --porcelain`
→ empty. `package.json` `devDependencies` carry `"@orkestrel/router": "^0.0.14"` and
`"@orkestrel/server": "^0.0.19"`; `node_modules/@orkestrel/router/package.json` and
`.../server/package.json` report `0.0.14` and `0.0.19`.

**Evidence — the installed surfaces** (`node_modules/@orkestrel/server/dist/src/server/index.d.ts`,
`node_modules/@orkestrel/router/dist/src/core/index.d.ts`).

- `createServer<TState>(options: ServerOptions<TState>): ServerInterface<TState>`;
  `ServerOptions` (line 1863) = `{ dispatcher, state, middleware?, host?, port?, drain?, limit?, expose?, report?, timeouts?, sockets?, on?, error? }`;
  `host` omitted ⇒ node's default, all interfaces (line 1818); `port` omitted ⇒ an ephemeral port,
  and `start()` resolves the bound port (line 1820); `drain` defaults to `DEFAULT_DRAIN_MS` = `10_000`.
- `ServerInterface`: `port: number | undefined`, `address: AddressInfo | undefined`, `status`
  (`'idle' | 'starting' | 'listening' | 'stopping' | 'stopped'`), `start(signal?): Promise<number>`,
  `stop(): Promise<void>`, `destroy(): Promise<void>`.
- `createDispatcher<TState = undefined>(options?: DispatcherOptions<TState>)` (line 250);
  `DispatcherOptions.routes?: ReadonlyArray<RouteInput<string, TState>>` (line 499);
  `handle(request, state: TState)` (line 470); an unmatched path answers a `404` `Response`, a
  matched path with an unregistered method answers `405` with an `Allow` header (lines 488-492).
  The fence's `createDispatcher({ routes: [{ method: 'POST', path: '/relay', handler }] })` and
  `createServer({ dispatcher, state: () => undefined })` type-check against these as written.
- `@orkestrel/server`'s root export resolves to `dist/src/server/index.d.ts`, so
  `import { createServer } from '@orkestrel/server'` is a root specifier, and the `tests/**` lint
  override (`.oxlintrc.json:438-457`) restricts only `^typescript(?:[/?#]|$)`; `@orkestrel/router`
  and `@orkestrel/server` imports are permitted in test files.

**Evidence — the test fixtures you use** (`tests/setup.ts`).

- `createScriptedProvider(turns, { record: true })` (line 169): a real `ProviderInterface`;
  `started` counts `stream` entries; a turn `{ result, deltas }` streams those deltas.
- `RecordedProvider(turns = [{ content: 'queued' }], gate = Promise.resolve(), failure?)` (line 385):
  `entries` counts `stream` entries; every `next()` awaits `gate` before pulling the inner
  generator (`#next`, line 465-478), and `steps` increments at the entry of each `next()` before the
  gate; `#return` (line 480-488) increments `returns` and records `cancelled = signal.aborted` at
  return time. With a pending gate the first pull parks, so the upstream turn cannot finish on its
  own; resolve the gate to release it.
- `createParser()` (line 198).

**Evidence — the current transcription** (`tests/guides.test.ts:445-582`): the flagship case
"round trips both relay fence halves and carries the route the server half declares" drives the
handler directly through a `fetch` override and asserts the received request's method and path;
"decodes a scripted relay body through the fence's browser half alone"; "refuses the relay fence's
hop when the bearer does not match" (direct); "refuses a relay body at its byte limit and admits
one below it" (direct); "carries the relay fence lines the transcription copies" (substring
guards). The `guides` Vitest project (`vite.config.ts:87-97`) sets no `testTimeout`, so Vitest's
5 s default applies; `npm run test:guides` is `node --experimental-strip-types tests/guides.test.ts`,
which runs the file through `GuideCommand` with `runner: createVitest`; the verifier's last reading
of that project is 43 tests green at `d84b1a2`.

**Evidence — the search bounds for what the change makes false.**

```text
$ grep -rn "stop draining" src tests guides README.md
src/core/factories.ts:104: * process.on('SIGTERM', () => server.stop()) // stop draining new requests on shutdown
guides/agent.md:1124:process.on('SIGTERM', () => server.stop()) // stop draining new requests on shutdown
$ grep -rn -E "handler directly|never executes|calls the handler" guides tests src README.md   (agent-owned hits)
guides/agent.md:1097: … it calls the handler directly instead of routing through the dispatcher … It never executes the `createServer` start-up …
$ grep -rn -E "declares no dependency|no dependency on" guides README.md src
guides/agent.md:1097: `@orkestrel/agent` declares no dependency on a newline-delimited JSON parser and none on a router …
guides/agent.md:1497: … `@orkestrel/ndjson` … This package declares no dependency on it …   (still true; leave it)
```

**Law.** `AGENTS.md` (types-first; single-word members; no `any`, `as`, or `!`; no mocks; no
nested function declarations; the writing rules including "NEVER state a count" and the
substitution table), `.claude/rules/tests.md`, `documentation.md`, `writing.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `names.md`, `quality.md`; skill: none; guide: `guides/agent.md`.

**Host.** Windows 11; your Bash tool runs Git Bash, so `npm run <script>` works as written; the
agent checkout is a git repository at `0102259`; loopback listeners on `127.0.0.1` bind without a
firewall prompt (the Orchestrator's probes bound them repeatedly, unattended). Network beyond
loopback is not needed. Node ≥ 22.12 with the global `fetch` (undici) is the transport the browser
half takes when no `fetch` option is passed.

**Measurements (the Orchestrator's host probes, Node against the built `dist` and the installed
router and server; retained as `a5-probe-*.mjs.txt` with logs in the campaign folder).**

- The fence's composition over loopback: the round trip returns `{ content: 'relayed answer' }`
  with the upstream entered once; `GET /relay` answers `405` with `allow: POST` and the body
  `Method Not Allowed`; `POST /other` answers `404`; a wrong bearer answers `401` and reaches the
  browser as `ProviderError` with `code: 'HTTP'`, `status: 401`, `message: 'provider error: 401'`
  with the upstream unentered; a relay `limit` of 8 bytes answers `413` the same way.
- A browser-side abort mid-stream reaches the upstream provider's signal in 1–13 ms across every
  run; the local call rejects with `ProviderAbortError` (`code: 'ABORT'`) carrying the partial.
- `await server.stop()` settles in ≤ 4 ms after a completed round trip, after a cancel alone, and
  after the `405`/`404`/`401`/`413` refusals. It takes ~3 s (`a5-probe-stop-3.log.txt`,
  `a5-probe-stop-4.log.txt`) when a completed call and a cancel share one server: the client's
  aborted, previously reused keep-alive socket is not idle, so `closeIdleConnections` leaves it
  and `server.close()` waits. Keep the cancel case on its own server. `destroy()` settled in ≤ 5 ms
  in every order and is the fallback named under Deviation contract.
- `process.on('SIGTERM', () => server.stop())` registers one listener in a plain Node process and
  keeps nothing alive; it is substituted regardless.

**Control identifiers.** None. Name each test for what it proves, never for a control.

**Standing conditions.** The installed `@orkestrel/guide` is a packed tarball from the guide
repository at `9863e77` installed `--no-save` (its key grammar admits `export abstract class`,
which the agent guide's `AgentProvider` row needs). Never run `npm install`, `npm ci`, or
`npm update`: each reverts it. `npm run build` and `npm run check` print a non-failing API
Extractor notice about TypeScript 6.0.3; ignore it. `npm test` does not include the `distribution`
project. `tmp/` is ignored by git; `tmp/probe/` is your probe home (the `probe` Vitest project
collects `tmp/probe/**/*.test.ts`; run it with `npm run test:probe`); delete every probe before you
return.

## Unknowns

None that block the unit. The exact wording of the prose is yours, under `writing.md` and the
guide's existing voice. Your own reading of `stop()`'s duration in the cancel case is an
observation you report (see Acceptance criteria).

## Scope

**Owned.**

- `tests/guides.test.ts` — the relay group of "flagship fences" (lines 445-582 today), the dynamic
  imports the group needs inside the `GuideCommand.execute` callback, and the substring-guard case.
- `guides/agent.md` — the fence line at 1124 (criterion 1); the paragraph at 1097; the paragraph at
  1127 only if you tighten it (optional; it is not false); the `## Tests` bullet for
  `tests/guides.test.ts` at 1473; nothing else.
- `src/core/factories.ts` — the single TSDoc line at 104 inside the `@example Mounting the relay on
  your server` block, so the titled twin stays equal to the fence. No other change in that file.

**Shared (report-only).** None.

**Off-limits.** `tests/setup.ts`, `tests/setup.test.ts` (no fixture; the design forecloses a
wrapper over `createServer`); every other line of `src/**`; `package.json`, `package-lock.json`;
the vendored scaffold set (`tests/policy.test.ts`, `tests/setupPolicy.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`, `.claude/**`, `configs/**`, `vite.config.ts`, `tsconfig*.json`,
`.oxlintrc.json`, `.oxfmtrc.json`); `README.md`; `dist/**`; the fences' other lines (their shape
is fixed by the titled twins); clause 36 of `guides/agent.md` (line 1018) stays byte-identical;
the ollama checkout entirely.

**What asserts the state this change ends.** The guides test's titled-example equality (the fence
against `factories.ts`'s `@example`; both twins are Owned); the substring-guard case in
`tests/guides.test.ts` (Owned); the search bounds above name every other site, and none lies
outside Owned.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. You may run `npm run format` and
`npm run lint` to converge (you are the sole writer), then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:guides`, and `npm run test:probe` for a probe
under `tmp/probe/`. Do not run `npm install`, `npm ci`, `npm run build`, `npm run scaffold`, or
any `git` command that changes the tree (`commit`, `push`, `stash`, `checkout`, `restore`,
`reset`, `clean`); `git status`, `git diff`, and `git log` are fine. Undo your own edit by
editing, never by a git command.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## The change, stated

1. **The fence comment, both twins.** `guides/agent.md:1124` and `src/core/factories.ts:104` end
   in `// refuse new connections, drain, then close` in place of
   `// stop draining new requests on shutdown` (the server's `stop()` refuses new connections,
   drains in-flight work up to the `drain` deadline, then closes; the old comment states the
   opposite). The rest of each line is unchanged.
2. **The flagship case** (rename it for what it now proves) starts one server from the fence's
   lines — `createRelay({ provider: upstream, authorize: … })` with the fence's bearer comparison,
   `createDispatcher({ routes: [{ method: 'POST', path: '/relay', handler }] })`,
   `createServer({ dispatcher, state: () => undefined, host: '127.0.0.1' })`,
   `const port = await server.start()` — and, on that server, in this order inside a `try`:
   - the route facts through the global `fetch`: `GET /relay` with the valid bearer answers
     `405` with `Allow: POST`; `POST /other` with the valid bearer and a valid relay body answers
     `404`; consume each response body;
   - the wrong bearer through a `createRelayProvider` constructed without a `fetch` option and
     with `headers: () => ({ authorization: 'Bearer wrong' })`: `generate` rejects with
     `ProviderError`, `code: 'HTTP'`, `status: 401`, `message: 'provider error: 401'`, and the
     upstream's `started` is still `0`;
   - the round trip through the fence's browser half — `createRelayProvider({ url: \`http://127.0.0.1:${port}/relay\`, parser: createParser, headers: () => ({ authorization: \`Bearer ${bearer}\` }) })`,
     no `fetch` option — with a typed `messages` binding (declare it as `readonly Message[]`
     rather than copying the fence's `as const`): the result deep-equals the literal
     `{ content: 'relayed answer' }` and deep-equals the same script driven directly through a
     second `createScriptedProvider` instance; `browser.name` is `'relay'`; the upstream's
     `started` is `1`;
   - in `finally`: `await server.stop()`, then `server.status` is `'stopped'` and
     `server.address` is `undefined`.
3. **The cancel case**, on its own server started the same way, with
   `new RecordedProvider([{ content: 'relayed answer' }], gate.promise)` where
   `gate = Promise.withResolvers<void>()`: start `browser.stream(messages, abort.signal)` through the
   socket, take its first `next()` as a pending promise, `waitForCondition` until
   `upstream.steps === 1` (the server has entered the pull and parked on the gate), then
   `abort.abort()`; the pending `next()` rejects with `ProviderAbortError` (`code: 'ABORT'`);
   `waitForCondition` until `upstream.returns === 1`; `upstream.cancelled` is `true` (the relay
   aborted the upstream signal when the client went away); in `finally`, resolve the gate, then
   `await server.stop()` and assert `status === 'stopped'`. Measure the `stop()` call with
   `performance.now()` and report the reading.
4. **Unchanged cases**: "decodes a scripted relay body through the fence's browser half alone" and
   the byte-limit case stay as they are (direct calls). Delete the separate direct `401` case only
   if its assertions are carried by the flagship case above; otherwise keep it.
5. **The substring guards** keep every string they assert today and add
   `const dispatcher = createDispatcher({`,
   `const server = createServer({ dispatcher, state: () => undefined })`, `await server.start()`,
   and the corrected line `process.on('SIGTERM', () => server.stop()) // refuse new connections, drain, then close`.
6. **The prose at line 1097**, rewritten in the guide's voice: the package declares no *runtime*
   dependency on a newline-delimited JSON parser, a router, or a server adapter, so the browser
   application supplies the parser and the server application supplies the router and adapter
   (the development dependencies declared here serve the transcription); the transcription
   mounts the relay on the dispatcher's route, starts `@orkestrel/server`, and drives the browser
   half against it over a loopback HTTP hop in Node — the round trip, the `405` with its `Allow`
   header a `GET` to `/relay` answers, the `404` another path answers, the `401` a wrong bearer
   answers, and the upstream turn a disconnected reader cancels; then each substitution with its
   reason (the parser; `host: '127.0.0.1'`; the `url` at the resolved port; `await server.stop()`
   in place of the `SIGTERM` listener; the byte-limit case staying a direct call because `limit`
   caps the body `createRelay` reads while the server's `limit` caps the `body()` a middleware
   reads). No count, no `should`, no `now`, no `new`, present tense, `must`/`can`/`might`.
7. **The `## Tests` bullet at 1473**: extend its last sentence to name the executed hop (the relay
   halves driven over a started `@orkestrel/server` listener on loopback: the declared route's own
   `405` and `404`, the `401` refusal, the round trip, and the upstream turn a disconnected reader
   cancels).
8. **Clause 36** at line 1018 stays byte-identical: the loopback hop is Node evidence about the
   wire, not browser evidence.

## Output

Write the report to `tmp/units/a5-report.md` in the agent checkout and return the same text as
your final message:

1. Per owned file, what changed (the case names, the lines, the prose), and every substitution
   the transcription makes as a list.
2. The commands you ran with their exit codes, and the `guides` project's test count before and
   after (the "before" is 43 unless your first run reads otherwise).
3. Observations: the `stop()` duration you measured in the cancel case; the whole `npm test`
   reading if you ran it.
4. `git status --porcelain` and `git diff --stat` output.
5. Claims of your own you flag as unverified, if any.

No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the listener cannot bind, when the cancel chain does not reach `upstream.cancelled === true`
within `waitForCondition`'s budget, when `await server.stop()` exceeds 1 s in a case (then report
the `destroy()` reading beside it and stop rather than switching), or when a titled-example
equality or a lint rule forecloses the change as stated. Decide, record, and carry on from: the
case names, where a paragraph sits, the exact wording of the prose, and whether the separate
direct `401` case is folded into the flagship case.

## Acceptance criteria

1. `grep -n "stop draining" src/core/factories.ts guides/agent.md` finds nothing, and
   `grep -n "refuse new connections, drain, then close" src/core/factories.ts guides/agent.md`
   finds exactly the two twins (line 104 and line 1124).
2. `git diff --stat` names only `tests/guides.test.ts`, `guides/agent.md`, and
   `src/core/factories.ts`, and `git diff src/core/factories.ts` shows one changed line.
3. The substring-guard case asserts the strings in "The change, stated" item 5.
4. `tests/guides.test.ts` imports `createDispatcher` from `'@orkestrel/router'` and `createServer`
   from `'@orkestrel/server'` through dynamic imports inside the `GuideCommand.execute` callback,
   and imports no `node:` module; every `createServer` call in the file passes `host: '127.0.0.1'`
   and is followed by `await server.stop()` in a `finally`.
5. `guides/agent.md` line 1018 is byte-identical to its state at `0102259`
   (`git diff -U0 guides/agent.md` shows no hunk touching it); the paragraph at 1097 carries the
   content of item 6; the bullet at 1473 carries item 7.
6. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
7. `npm run test:guides` exits 0 with no skipped and no todo case, and its output shows the relay
   cases green.

**Observations, not criteria.** The measured `stop()` duration in the cancel case; the whole
`npm test` chain if you run it (the Orchestrator takes the authoritative run after you exit).

## Review evidence

The Orchestrator supplies the auditors the actual diff and status output after you return.
