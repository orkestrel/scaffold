# Unit VISIT-mcp — report

Setup proofs landed, `test:guides` and the `test` chain adopted, `scaffold repair` run clean, and
every gate in the brief's list green. Nothing committed.

## The advisory as taken

`npx --no-install scaffold audit`, run at `/home/user/orkestrel/mcp` before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts, tests/setupConformance.ts, tests/setupGlobal.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts, tests/setupConformance.test.ts, tests/setupGlobal.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 139 planned paths drifted from the plan. Audit compared bytes at 106, existence at 19, and nothing at 14. The plan does not own 7 further paths beneath its groups.
```

The `dependencies` advisory is the fleet-wide one the brief scopes out. The drift table listed the
`orchestration` group plus the foreign paths under the retired `orkestrel-human-journey` name,
`.claude/agents/codex.md`, and `.codex/agents/claude.toml`; those foreign paths are untouched.

## Proof files

Every file sits in the `setup` project (Node, browser disabled) and derives what it expects by a
route the module under proof cannot share.

### `/home/user/orkestrel/mcp/tests/setup.test.ts`

Proves the host-independent infrastructure every project loads.

- `waitForSettlement` returns the caller's value, rejects with the caller's message (and with the
  default) at the deadline, and surfaces a caller rejection rather than the deadline.
- The envelope factories build what the shipped `parseJSONRPCMessage` accepts after a real JSON
  round trip; a notification carries no `id` and no absent `params`.
- `MODERN_METADATA`, `modernRequest`, and `createSubscriptionRequest` produce requests the real
  `parseRequestContext` calls modern, and the same request without the stamp is not modern.
- `HEADER_PROJECTION_CONTEXTS`: every row's `parsed` column is checked against what
  `parseRequestContext` actually answers, its `version` against the version read off the metadata,
  and the table is shown to carry rows on both sides of the divergence it exists for.
- `createHostileCorpus` rows are all refused by the real parser without throwing, a naive clone of
  the corpus raises, and no object row is shared between two calls (the single-use rows are rebuilt).
- `createThrowingKeys` throws only at the named key, `throwOnRead` throws, the whole
  `GUARD_KEY_NAMES` battery leaves the parser total, and the table is frozen, unique, sorted, and
  carries the envelope names.
- `buildNestedRecord` nests exactly the depth asked for, walked down to the leaf.
- `isMCPMethodHandler` admits any callable and refuses the rest.
- `createCalculatorServer` registers `add` and `boom` and answers the value and the error path.
- `createHostilePeer` carries a malformed wire frame to a real bound server and reports the error
  it answered; `clear` empties it; after `close` nothing answers (asserted with a bounded wait).
- `createMemoryTransport` records, delivers to its peer, fails on demand without recording, and
  counts each `close`.
- `createLoopbackTransport` emits the dispatched reply, answers a notification with nothing, and
  declares `duplex` with no session; `createRecordingTransport` stamps each outbound invocation
  between two real `performance.now()` readings and still delivers the reply.
- `probeOwnership` reports a walk-away consumer as holding the exchange, a consumer that stops it as
  releasing it, and a consumer that fails mid-exchange as both failing and leaking.
- `inspectOwnerOfLastResort` reports each forbidden spelling a source declares, in the table's order.
- `probeDuplex` drives a real client-initiated cancellation over a real memory carrier and returns
  every frame the peer received; `readMethods` reads one method per invocation and nothing from a
  response.
- `collectSSE` and `readSSEStream` decode a real body whose event and multi-byte character are split
  across chunk boundaries, yield each event as its blank line arrives, and yield nothing for a
  bodyless response.
- `createManualClock` moves only when advanced, across a real delay.
- `MemoryResourceManager` pages its records, answers the input-required read, and records every call;
  driven again through a real `createMCPServer` so the recorded options are the server's own.
- `TestTaskManager` deduplicates by key, settles to `completed` with deterministic stamps, cancels on
  `abort` and on the bound request signal (and does not cancel when unbound), purges only tasks that
  can expire, answers a foreign caller with the same `undefined` as a missing task, and holds an
  asking task until the named response arrives.
- `createTaskServer` turns a declaring client's call into a durable task; `TASK_CAPABILITIES`
  declares the extension and nothing else; the calculator server is the outside-the-population
  control that answers `tasks/*` with `-32601`.
- `postJSON` posts the serialized value to the default `/mcp` endpoint of the real fixture and merges
  caller headers over the JSON content type on a given path.

### `/home/user/orkestrel/mcp/tests/setupBrowser.test.ts`

The Node-assertable split the dispatch names. Everything asserted is host-independent, and the file
states in its header comment which side is not: `buildElement` appends to a live `document` no Node
project has.

- `createScopeCarrier` carries a frame each way through real `createScopeTransport` halves, drains
  only what the SERVER half received, clears on read, and drops a payload that is not JSON-RPC while
  still delivering it.
- `recordPort` taps a live `MessagePort` beside a real `createMessagePortTransport` already
  listening on it: the transport's own handler still fires, the decode enters the drain, the drain
  clears, and a non-decodable payload is dropped rather than drained.
- `drainRecorded` reads the peer-recorded frames back over a real socket from the real Node fixture
  and clears them, dropping the POST body the decode refuses.

### `/home/user/orkestrel/mcp/tests/setupServer.test.ts`

- `findMissingNamedImports` against a real `@orkestrel/guide` source view: reports only what the
  mapped face does not publish, skips an unmapped foreign specifier, is exempt from a commented
  import, and refuses an unmapped self specifier and a repository alias.
- `createRequestStub` carries what the real `upgradeRequestPath` reads and defaults the rest;
  `isIncomingMessage` narrows on `headers` and refuses a shape without them.
- `createStreamStub` records events and comments, reports `ended`/`closed`, raises the injected write
  fault and the injected body fault on their own faces, and parks a reader on a `pending` body.
- `duplexPair` carries bytes both ways across two real Node streams; `readClientFrames` strips the
  `101` handshake and decodes each frame off the running buffer, holding a split frame until it is
  complete; `flushSocket` is the settle point.
- `startUpgradeServer` and `openClientSocket` complete a real RFC 6455 handshake on a loopback port,
  re-emit the trailing frame, count the socket open and then closed, and hold the handshake open for
  the delay they were given.
- `upgradeRequest` reports a claimed upgrade (`101`, merged key header), a keyless refusal, and a
  real `@orkestrel/server` declining, without ever rejecting.
- `startServer` binds an ephemeral loopback port a real `fetch` reaches; `closeResource` releases a
  started server idempotently, and releases a client through `disconnect` and a bare transport
  through `close`.
- `createClockMiddleware` advances the manual clock inside every request it handles;
  `createDelayMiddleware` holds each request open for real measured time.

### `/home/user/orkestrel/mcp/tests/setupConformance.test.ts`

- The pinned runner resolves on disk and reports the release the manifest pins (`--version` output
  compared against `readConformanceRelease()`).
- `executeConformance` parses a real run of that runner against an endpoint nothing serves, and the
  scenario tallies sum to the totals line the parse read separately.
- `executeConformance` throws with everything the runner wrote when the run printed no summary
  (a rejected `--url` on the real runner).
- `parseConformance` reads each tally and the closing total out of a summary block, ignores what
  follows the total, and answers `undefined` when there is no total.
- `buildConformanceTools` registers every `test_*` tool the scenarios call, covers every name the
  verbatim content table keys, returns the simple-text fixture, and fails on the error tool.
- `readConformanceTemplate` resolves a substituted URI and refuses a sibling, an empty identifier,
  and a static resource; the descriptor substitutes into a URI the matcher accepts.
- Every advertised prompt fills, an unowned name answers `undefined`, and the caller's arguments
  reach the message text.
- `buildConformanceCompletion` projects onto the typed fragment and reports the unprojected total;
  every argument a prompt declares has a candidate list.
- `buildConformanceOptions` answers `resources/list`, `resources/read`, `prompts/get`, and
  `completion/complete` from the plain objects backing them, stamps `CONFORMANCE_IDENTITY`, and
  answers a content-block call with the verbatim content.
- `startConformance` serves the whole spine on a real loopback socket, answering a real POST.

### `/home/user/orkestrel/mcp/tests/setupGlobal.test.ts`

- `isBrowserFixtureModule` admits the real fixture module (reached by a direct import rather than the
  runner's `ssrLoadModule`), and what it admits starts a live fixture that answers a real request.
- It refuses a real sibling module namespace whose exports are prefix lookalikes (`startServer`,
  `startUpgradeServer`), a non-callable `start`, an array, a function, and the absent values.

`setup(project)` takes the live `TestProject` the runner owns. Constructing that argument here would
need a type assertion, which this repository forbids, so the file records in its header comment that
the runner-driven half is proven where it runs: `vite.config.ts` declares this module as the
`globalSetup` of the `src:browser` and `integration` projects, and every run of either drives
`setup`, its `provide`, and the teardown it returns.

## Mutation controls

One per proof file: a copy of the assertion's input or expectation was broken, the case was watched
to fail, and the file was restored byte-for-byte (`diff -q` against the pre-mutation copy, clean for
all five). Each line below is the line the run reported, in the final file.

| Proof file                     | Mutation (in the test, never in the module)                            | Failing line                                                                         |
| ------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `tests/setup.test.ts`          | metadata copy with `MCP_META_CAPABILITIES` set to `'broken'`           | `tests/setup.test.ts:159` — `expect(answered).toEqual(`                              |
| `tests/setupBrowser.test.ts`   | sent a copy of the request with `id: 8`                                | `tests/setupBrowser.test.ts:39` — `expect(inbound.calls).toEqual([[JSON.stringify(request)]])` |
| `tests/setupConformance.test.ts` | summary text copy reading `Total: 5 passed, 2 failed`                | `tests/setupConformance.test.ts:92` — `expect(parseConformance(output)).toEqual({`   |
| `tests/setupGlobal.test.ts`    | module copy with `start: 'start'`                                      | `tests/setupGlobal.test.ts:25` — `expect(isBrowserFixtureModule(loaded)).toBe(true)` |
| `tests/setupServer.test.ts`    | frame encoded as `'first-mutated'`                                     | `tests/setupServer.test.ts:201` — `expect(reader.frames.map((decoded) => decoded.payload.toString())).toEqual(['first'])` |

Each mutated run reported `Tests 1 failed | N passed`; each restored run reported the file fully
passing, and the whole project reports `Test Files 5 passed (5) / Tests 75 passed (75)`.

## The visit

1. Proofs written and green under a temporary local `setup` project entry matching the planned text.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. `npx --no-install scaffold repair` blocked, exactly as the brief predicted:

   ```text
   TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
   ```

   The message says `test:setup is already declared`, and at that moment the manifest declared no
   such script. Recorded, not acted on.

4. `npx --no-install scaffold repair --groups manifest` → `1 written, 1 unchanged, 0 removed in ..`,
   which wrote `test:setup`.
5. `npm pkg set 'scripts.test=... test:config && npm run test:setup && npm run test:guides ...'`,
   the planned order.
6. `npx --no-install scaffold repair` → `48 written, 92 unchanged, 0 removed in ..`. A second
   `repair` afterwards reports `0 written, 140 unchanged, 0 removed in ..`, so it is settled.
7. `npm run format`, then the gates.

`repair` regenerated `vite.config.ts` to exactly the `setup` project text already in place (label
`setup`, `include: ['tests/setup*.test.ts']`, `setupFiles: ['./tests/setup.ts']`, Node, browser
disabled), registered between `config` and `guides`.

## Retained differing values

`repair` named no retained differing value. The audit's only script advisory was `test:guides`, which
the brief authorized and which is adopted; the `test` chain change is the one the blocked `configs`
group forced. Nothing else in the manifest was adopted.

## Gates

Each read bare, at `/home/user/orkestrel/mcp`, after the final restore.

| Gate                  | Closing line                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 3886ms on 221 files using 4 threads.` |
| `npm run lint:check`  | no output, exit 0                                                                             |
| `npm run check`       | `> tsc --noEmit -p configs/src/tsconfig.server.json` with no diagnostics, exit 0              |
| `npm run build`       | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`, exit 0                   |
| `npm test`            | last project `integration`: `Test Files 1 passed (1)` / `Tests 4 passed (4)`, exit 0          |

`npm test` per project: `test:src` 1087 passed | 1 skipped (1088) across 30 files; `test:policy` 93;
`test:config` 46; `test:setup` 75 across 5 files; `test:guides` 138; `test:conformance` 4;
`test:integration` 4.

## Acceptance criteria

1. `npx --no-install scaffold audit` at exit reports no `setup:` advisory and no `scripts:`
   advisory. What remains is the fleet-wide `dependencies: typescript declares major 6` line and the
   seven foreign orchestration paths the brief leaves to the Orchestrator, with
   `0 of 139 planned paths drifted from the plan`.
2. Every gate closed green, each read bare — see the preceding table.
3. One mutation-control failing line per proof file, all restored — see the controls table.

## Touched files

| File                                        | Change                                                              |
| ------------------------------------------- | ------------------------------------------------------------------- |
| `tests/setup.test.ts`                       | new, 830 lines — proof of `tests/setup.ts`                          |
| `tests/setupBrowser.test.ts`                | new, 119 lines — proof of `tests/setupBrowser.ts`                   |
| `tests/setupConformance.test.ts`            | new, 344 lines — proof of `tests/setupConformance.ts`               |
| `tests/setupGlobal.test.ts`                 | new, 53 lines — proof of `tests/setupGlobal.ts`                     |
| `tests/setupServer.test.ts`                 | new, 383 lines — proof of `tests/setupServer.ts`                    |
| `vite.config.ts`                            | `setup` project added and registered (`+12`)                        |
| `package.json`                              | `test:setup` written, `test` chain and `test:guides` adopted, scaffold `^0.0.52` (`+5/-4`) |
| `package-lock.json`                         | arrived dirty from the re-pin, kept                                 |
| repair-owned orchestration and docs paths   | regenerated by `scaffold repair` (`.agents/**`, `.claude/**`, `.codex/**`, `CLAUDE.md`) |

`git diff --stat` over the tracked files: `38 files changed, 564 insertions(+), 604 deletions(-)`;
the five proof files are untracked additions.

## Deviation state

No deviation stopped the unit. Two facts the Orchestrator needs before it commits.

1. **`npm run format` rewrote an off-limits file.** The brief's visit order mandates the tree-wide
   `npm run format`, and `oxfmt` re-padded one markdown table in `guides/mcp.md`
   (`4 insertions, 4 deletions`). Under `--ignore-all-space` the only remaining difference is the
   separator row's dash count, so no prose changed. I did not revert it: reverting reddens
   `format:check`, which is an acceptance criterion, and the permission floor forbids me the
   restoring git commands. Accept it or hand it to a unit that owns `guides/**`.

2. **`buildElement` in `tests/setupBrowser.ts` has no consumer.** `grep` over `tests/` finds it
   imported nowhere, so no suite proves it and the Node `setup` project cannot (it appends to
   `document`). The module is off-limits to me, so the proof file records the gap in its header
   comment rather than closing it. Closing it needs either a `src:browser` proof or the export's
   removal, both in a unit that owns `tests/setupBrowser.ts`.

Two smaller observations, neither blocking:

- The blocked-`configs` message claims `test:setup is already declared` when the manifest declared no
  such script; the brief's remedy worked regardless.
- `tests/src/browser/factories.test.ts` already drives `createScopeCarrier`, `recordPort`,
  `drainRecorded`, `probeDuplex`, and `readMethods` inside Chromium. The overlap is deliberate: the
  browser suite proves what they carry for a real page, and these proofs pin what they promise as
  instruments — what enters a drain, what a drain clears, what a decode drops.
