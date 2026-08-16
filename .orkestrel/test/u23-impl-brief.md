# Unit U23 — implement createTeardown and createLoopback with their tests

Successor record: the design plan listed U2 and U3 as separate Sol units; they merge into
one writer session over disjoint file pairs — same intent, one serialized writer, two
bounded parts each with its own acceptance.

Role: `sol` (implementer route). Engine: GPT-5.6 Sol, journaled CLI, sandbox
workspace-write. Sole serial writer in `/home/user/test` from committed baseline
`0e47c0d` (clean tree; U1's types are already in `src/core/types.ts` and
`src/server/types.ts` — read them; they are authoritative and off-limits). Perform the
assignment directly and spawn nothing. Commit nothing.

## Authority

Read `/home/user/test/AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/architecture.md`, the guide's Contract section, and the existing
`factories.ts`/`index.ts`/`factories.test.ts` files in both environments — conform to
their exact style. Non-negotiables bind: no `any`, no assertions (`as`/`!`), no
`@ts-ignore`, `#` fields if a class appears, readonly returns.

## Standing conditions (do not stop-report these)

- This sandbox denies network AND loopback socket binds (`EPERM`), so you cannot execute
  the loopback tests you write. Validate part B by typecheck only; the Orchestrator runs
  the tests on return. Part A's tests are pure and you run them.
- `npm install` is forbidden and unnecessary; node_modules is present.
- `tests/guides.test.ts` will fail until the later guide unit lands — do not run it, do
  not fix it.

## Part A — createTeardown (core)

Owned: `src/core/factories.ts`, `src/core/index.ts`, `tests/src/core/factories.test.ts`.

`createTeardown(): TeardownInterface` implementing the contract U1 fixed in
`src/core/types.ts` exactly:

- `count` derived from the live list — never a second stored number.
- `destroy()`: snapshot the current list, empty it, run the snapshot newest-first,
  awaiting each handler; a handler added during the run lands in the fresh list for the
  next call; collect every thrown/rejected value in run order; after the loop, exactly
  one failure rethrows that value by identity, two or more throw
  `new AggregateError(failures)` in run order; a repeated call with an empty list
  resolves doing nothing.
- No Vitest import in source. Export through the core barrel in its existing ordering
  convention.

Tests (deterministic, real behavior, no fakes): reverse order observed via an order log;
a synchronous throw; an asynchronous rejection; both together aggregating in run order
with every handler having run; single-failure identity (`expect(caught).toBe(sentinel)`);
add-during-destroy runs on the NEXT destroy only; double destroy; empty destroy; `count`
tracking add and reset after destroy.

Validation for part A: `npm run check` and `npm run test:src:core` — both green, outputs
in your report.

## Part B — createLoopback (server)

Owned: `src/server/factories.ts`, `src/server/index.ts`,
`tests/src/server/factories.test.ts`.

`createLoopback(server: Server): Promise<LoopbackInterface>` — `Server` from `node:net`,
imported beside the file's existing `node:*` imports. Behavior:

- Bind the supplied unstarted server with `listen(0, '127.0.0.1')`; await the
  `listening` event; reject by passing through the `error` event if the bind fails.
- Read the bound address and narrow it without `as`/`!`: an object with a numeric `port`
  is required; anything else throws a plain `Error` naming what was found.
- `url` is `http://127.0.0.1:<port>` with no trailing slash; `port` the number.
- `destroy()`: idempotent (a settled flag or `server.listening` guard); when the server
  exposes a callable `closeAllConnections`, call it (narrow with an `in` check +
  `typeof`, no `as`) so keep-alive connections cannot hang the close; then `close()` and
  await its callback, resolving even when close reports an already-closed error on the
  second call.

Tests (you write, you do NOT run — sandbox denies binds): an `http.createServer` bound
via `createLoopback` answers a real `fetch` at `url` and the response proves the
listener ran; `url` has no trailing slash and `port` matches the URL; `destroy()` with a
live keep-alive connection open resolves and releases the port (a fresh bind of a new
server succeeds afterwards — ephemeral, so no fixed-port assertion); `destroy()` twice
resolves; ten parallel `createLoopback` instances yield ten distinct ports, all
destroyed; a plain `net.Server` (no closeAllConnections path assumptions) binds and
destroys cleanly.

Validation for part B: `npm run check` green (typecheck only), output in your report.

## Scope

Owned: the six files above. Off-limits: `src/core/types.ts`, `src/server/types.ts`,
`guides/**`, `tests/guides.test.ts`, `package.json`, everything else. No installs, no
commits, no pushes, no tree-wide mutating gates.

## Deviation contract

A contract you cannot implement as typed (a barrel ordering conflict, a types.ts defect)
stops the unit with expected/found/evidence. Test naming (for what each proves), helper
placement inside the test file, and assertion phrasing are yours.

## Output

Touched files with diffstat; the exact diff; part A's check and test outputs; part B's
check output; deviations or "none". Your final message is this report. No process diary.
