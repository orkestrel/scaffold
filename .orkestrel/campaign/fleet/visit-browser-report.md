# Unit VISIT-browser — report

Setup proofs landed, `test:guides` and the `test` chain adopted, `scaffold repair` clean, every gate
green. Nothing committed.

## The advisory as taken

`npx --no-install scaffold audit` at the start of the unit, before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 131 planned paths drifted from the plan. Audit compared bytes at 103, existence at 19, and nothing at 9. The plan does not own 7 further paths beneath its groups.
```

The proof work list is `tests/setup.ts` and `tests/setupServer.ts`. Neither module drives a DOM, so
no contract is deferred to a browser suite — this package registers no browser project, and each
proof file states that in its header comment.

## Touched files

| File                        | Summary                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `tests/setup.test.ts`       | New. Proof for `tests/setup.ts` (576 lines).                                        |
| `tests/setupServer.test.ts` | New. Proof for `tests/setupServer.ts` (460 lines).                                  |
| `vite.config.ts`            | Registers the `setup` project between `config` and `guides`.                        |
| `package.json`              | `test:guides` planned value, generated `test:setup`, `test` chain reaching it.      |
| `package-lock.json`         | Arrived dirty from the `scaffold ^0.0.52` re-pin; untouched by this unit.           |
| Vendored orchestration set  | Rewritten by `scaffold repair` (`CLAUDE.md`, `.agents/**`, `.claude/**`, `.codex/**`). |

Diffstat over the tracked tree, with the new proofs and the repair-written files counted separately
because they are untracked:

```text
 37 files changed, 698 insertions(+), 748 deletions(-)
 tests/setup.test.ts        | 576 lines (new, untracked)
 tests/setupServer.test.ts  | 460 lines (new, untracked)
```

## What each proof asserts

Each case pins one behavioral contract a consuming suite depends on. Expected values are derived by a
route the module does not share: hand-written protocol literals, a parent-index walk over the raw
snapshot columns, `atob` over the base64 constants, a second socket reaching the port
`readServerPort` reports, the platform `WebSocket` client driving the CDP fixture, and the child's own
`spawn` handle carrying the identifier the fixture publishes.

### `tests/setup.test.ts`

- `createCDPTransport` decomposes a request frame into `id`, `method`, `params`, and `sessionId`, and
  records nothing for a frame carrying no request identifier, no method, or no object at all.
- `started` and `closed` track `start()` and `close()` across a restart.
- `onSend` invokes every handler registered for the sent method in registration order, and no handler
  registered for another method.
- The handler receives the decomposed message rather than the raw text.
- `reply` and `fail` emit frames correlated to the request identifier.
- `event` defaults `params` to `{}` and omits `sessionId` unless one is passed.
- `closeRemote` and `errorRemote` deliver to the transport emitter's `close` and `error` events.
- `createConnectedCDPClient` returns a started transport and a connected client whose sends reach the
  recorder.
- `replyOk` answers every send of its method with the scripted result, defaulting to `{}`, and leaves
  another method unanswered until the client's own timeout fires.
- `scriptCDPAttach` answers the attach handshake and the domain enables for the named session, builds
  the frame tree identifier from that session, and defaults the session to `session-1`.
- `readCDPExpression` reads a string expression and refuses a missing message, absent parameters, and
  a non-string expression.
- `scriptEvaluate` wraps the value as a remote object only when the predicate accepts the expression.
- `scriptSelectorPresent` resolves the presence poll for its own selector and refuses both a prefix
  lookalike (`#heroic` against `#hero`, kept apart by the JSON quoting) and an expression that is not
  a poll.
- `scriptTrustedSelector` answers the presence poll, the object handle for a `returnByValue: false`
  evaluate, the content quads, the function call, and the input dispatches, and leaves another
  selector's handle request unanswered.
- `scriptFrameTree` answers a three-level tree whose child frames name their parent and carry their
  own URL and name.
- `createStartedCodegen` returns a codegen already started over the scripted binding handshake, every
  frame carrying the requested session.
- `createCodegenBindingPayload` names the binding the started codegen registered — read back from the
  recorded `Runtime.addBinding` frame — and carries the record as JSON text.
- `createTarget` builds a page target and replaces only the overridden fields.
- `createDOMSnapshotResult` keeps every node and layout column parallel and resolves each name inside
  the string table; a parent-index walk from the `DIV` node yields `DIV`, `BODY`, `HTML`, `#document`;
  the iframe node links the child document whose URL it names as its source.
- `createScreenshotWriter` records the path and the exact byte array of every write in call order.
- `PNG_BASE64` and `JPEG_BASE64` decode to the PNG and JPEG signature bytes.
- `evaluateJavaScript` returns the value of an expression fixture and surfaces a thrown or unparsable
  one.
- `ignoreCall`, `ignoreAsyncCall`, and `throwListenerError` behave as their names say.

### `tests/setupServer.test.ts`

- `reservePort` reserves a loopback port that a server then binds, with `readServerPort` reading the
  same number back.
- `readServerPort` reports the port a second connection actually reaches, and throws
  `Test server did not bind a TCP port` for a server that never bound.
- `waitForProcessExit` resolves after a spawned process exits and refuses a live process within its
  budget, naming that process in the failure.
- `createTempDirectory` allocates a prefixed scratch directory, honours a caller prefix, and
  `destroyTempDirectories` removes every registered directory — read back with `existsSync`.
- `StallServer` refuses `endpoint` before it starts; a started one names a `ws://127.0.0.1:<port>/cdp`
  endpoint.
- The stall server accepts a connection, answers nothing to an upgrade request, and severs the client
  on `close()`.
- `createTCPProxy` forwards bytes to an upstream echo server, rejects a second `start()` with
  `TCP proxy is already started`, and severs its clients on `stop()`.
- `createCDPTestServer` serves the debugger URL on `/json/version`, the scripted targets on
  `/json/list`, and a 404 for an unknown path.
- `hang(true)` leaves `/json/version` unanswered until the request's own timeout aborts it, and
  `hang(false)` restores the answer.
- The server records every request frame and answers a scripted method with either a fixed value or a
  handler computed from the request parameters, driven by the platform `WebSocket` client.
- `Target.getTargets` is answered from the listed targets when no script overrides it.
- An unscripted request stays unanswered until `reply`, `fail`, or `event` pushes a frame.
- `sockets` counts the open sockets, and `close()` severs each one.
- `readFixtureProcessId` reads a published identifier and refuses a torn write and a file that never
  appears, naming the path in the failure.
- `createFakeBrowserProcess` publishes the identifier and the full argument vector of the process it
  is spawned as.
- With `serveCDP`, it serves discovery on the requested debugging port and `dropSocket()` severs the
  WebSocket while the process stays alive.
- With `descendant` and `ignoreSIGTERM`, the spawned tree outlives `SIGTERM` and
  `destroyFakeBrowsers()` kills every registered process.

## Mutation controls

One per proof file. Each mutation edited the expectation inside the proof, never the setup module.
Both are restored; the closing run of the `setup` project is green.

`tests/setup.test.ts` — expected ancestor walk changed from `['DIV', 'BODY', 'HTML', '#document']` to
`['DIV', 'BODY', 'HTML', 'HTML']`:

```text
FAIL  |setup| tests/setup.test.ts > createDOMSnapshotResult > walks the main document ancestors the snapshot suites resolve
AssertionError: expected [ 'DIV', 'BODY', 'HTML', '#document' ] to strictly equal [ 'DIV', 'BODY', 'HTML', 'HTML' ]
      Tests  1 failed | 24 passed (25)
```

`tests/setupServer.test.ts` — expected debugger URL host changed from `localhost` to `127.0.0.1`:

```text
FAIL  |setup| tests/setupServer.test.ts > createCDPTestServer > serves the debugger URL, the listed targets, and a 404 for an unknown path
AssertionError: expected 'ws://localhost:38039/cdp' to be 'ws://127.0.0.1:38039/cdp' // Object.is equality
      Tests  1 failed | 16 passed (17)
```

After restoring each expectation:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
 Test Files  2 passed (2)
      Tests  42 passed (42)
```

## The visit

The order ran as the brief fixed it.

1. Proofs written and green in a hand-registered `setup` project. The project body was written to the
   planned template exactly, so the later `repair` reported it unchanged rather than rewriting it.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. The first full `npx --no-install scaffold repair` blocked its `configs` group:

   ```text
   TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
   ```

   The clause "test:setup is already declared" was false at that moment — `npm pkg get 'scripts.test:setup'` returned nothing, and the script only appeared after the next step wrote it. The block itself was correct; only its explanation of which half was missing was wrong. Recorded as an observation against scaffold 0.0.52, not acted on.

4. `npx --no-install scaffold repair --groups manifest` wrote
   `"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"`,
   appended after `test:bench`, and left the `test` chain unchanged.
5. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`,
   the planned order read from the installed scaffold's compiler at
   `node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290`, which places `test:setup` between
   `test:config` and `test:guides`.
6. `npx --no-install scaffold repair` ran clean: `48 written, 84 unchanged, 0 removed`. A second run
   reported `0 written, 132 unchanged, 0 removed`.
7. `npm run format` rewrote the two proof files; nothing else moved.

## Manifest changes

```diff
-"test": "npm run test:src && npm run test:policy && npm run test:config && npm run test:guides",
+"test": "npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides",
-"test:guides": "vitest run --config vite.config.ts --reporter=dot --project guides",
+"test:guides": "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides",
-"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe"
+"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe",
+"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"
```

The `@orkestrel/scaffold` range moving to `^0.0.52` and the lockfile churn arrived with the dispatch's
re-pin and were kept, not reverted.

## Retained differing values repair named

None beyond `test:guides`. `repair` named that one differing script value in the opening audit; it was
adopted. The closing audit reports no `scripts:` advisory, so no differing value was retained.

## Gates

Each command was run bare from `/home/user/orkestrel/browser` and read from its own output.

| Gate                   | Exit | Closing line                                                                        |
| ---------------------- | ---- | ------------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (206 files, 3184ms)                     |
| `npm run lint:check`   | 0    | no diagnostics                                                                       |
| `npm run check`        | 0    | `tsc --noEmit -p configs/src/tsconfig.server.json` completed with no diagnostic      |
| `npm run build`        | 0    | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`                  |
| `npm test`             | 0    | every project passed — see the following breakdown                                   |

`npm test` per project:

```text
test:src      Test Files  26 passed (26)   Tests  486 passed (486)
test:policy   Test Files   1 passed (1)    Tests   93 passed (93)
test:config   Test Files   1 passed (1)    Tests   46 passed (46)
test:setup    Test Files   2 passed (2)    Tests   42 passed (42)
test:guides   Test Files   1 passed (1)    Tests   53 passed (53)
```

## Acceptance criteria

1. **Met.** The closing `npx --no-install scaffold audit` reports no `setup:` advisory and no
   `scripts:` advisory. What remains is the fleet-wide
   `dependencies: typescript declares major 6, while the registry serves major 7.` and the foreign
   paths under the retired `orkestrel-human-journey` name plus `.claude/agents/codex.md` and
   `.codex/agents/claude.toml`, all named out of scope by the brief and left alone. The plan itself
   reports `0 of 131 planned paths drifted from the plan.`
2. **Met.** Every gate closed green, each read bare.
3. **Met.** One mutation-control failing line per proof file, both restored, closing run green.

## Deviation state

None. The `configs` block in step 3 was the brief's own predicted path, not a deviation. Its
misleading clause is recorded as an observation.

## Untracked paths this unit created

`tests/setup.test.ts` and `tests/setupServer.test.ts`. Every other untracked path — the
`orkestrel-debrief` retention reference, the `orkestrel-prove-journey` and `orkestrel-publish` skill
trees, `.agents/templates/`, and `.agents/transports/` — was written by `scaffold repair` from the
0.0.52 plan.
