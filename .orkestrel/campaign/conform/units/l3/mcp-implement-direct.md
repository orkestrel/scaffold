# Unit conform-mcp — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in order.

## Consumer edits taken

The addendum's edits ran before any row.

| Incoming change | Disposition | Evidence |
| --- | --- | --- |
| guide's `symbol.kind` → `symbol.keyword` | `applied` | `tests/guides.test.ts:641` now reads `.filter((symbol) => symbol.keyword === 'function')`. Red before: `npm run check` exit 2, `tests/guides.test.ts(641,32): error TS2339: Property 'kind' does not exist on type 'SurfaceSymbol'.` Green after: exit 0. |
| router's `route` → `defineRoute` and the rest | `noop` | `grep -rn "\broute(" src tests` returned nothing. The package imports only `RouteContext`, `RouteInput` (type-only) and `createDispatcher` from `@orkestrel/router`. |

Proof files: `/home/user/work/evidence/mcp-proofs/addendum-guide-keyword-red.txt`, `/home/user/work/evidence/mcp-proofs/addendum-guide-keyword-green.txt`.

Vendored mirrors (`guides/guide.md`, `guides/contract.md`, `guides/emitter.md`, `guides/websocket.md`) were not touched.

## Rows

| Row | Disposition | What landed |
| --- | --- | --- |
| mcp-obj-1 | `applied` | `MCP_WEBSOCKET_SUBPROTOCOL` moved to `src/core/constants.ts`; both face copies deleted; every importer, doc link, test, fixture, and guide row retargeted |
| mcp-obj-2 | `applied` | `prepublishOnly` now runs `check` before `build` |
| mcp-obj-3 | `applied` | `MCPServer.#dispatch` moved after `handle`, before `#register` |
| mcp-obj-4 | `applied` | `HTTPClientTransport.#stamp` and `#exchange` moved after `close`, before `#buildHeaders` |
| mcp-obj-5 | `applied` | `tests/src/browser/transports/MessagePortTransport.test.ts` created; the seven class-behaviour cases moved into it and driven through the class directly |
| mcp-subj-1 | `applied` | `MCPSessionMiddlewareOptions.capacity` replaced by `session?: MCPSessionOptions`; the middleware forwards the whole group |
| mcp-subj-2 | `applied` | `MCPSessionOptions.clock` added; `push`/`replay` lost their `now` parameter; the middleware's clock reaches the minted session's log sweep |
| mcp-subj-4 | `applied` | `isFormElicitationSupported` → `supportsFormElicitation`, `isTaskSupported` → `supportsTask` |
| mcp-subj-5 | `applied` | The loopback fence binds `outcome` and states the real outcome shape; the fence is transcribed and executed in `tests/guides.test.ts` |
| mcp-subj-6 | `applied` | Both first sentences read in the third person throughout |
| mcp-subj-7 | `applied` | `MCPCompletionManagerInterface` → `MCPCompletionInterface`, with the disambiguating TSDoc sentence the row required |
| mcp-subj-8 | `applied` | `MCPTaskOptions.defer` → `deferral`, `MCPSubscriptionOptions.listen` → `producer` |
| mcp-subj-9 | `applied` | Both banned-sense `should` occurrences the row names are gone |
| fleet-F1 | `noop` | See § Fleet rows |
| fleet-F2 | `noop` | See § Fleet rows |

### mcp-obj-1 — the duplicated WebSocket subprotocol

The declaration and the browser face's TSDoc block now sit in `src/core/constants.ts` after `MCP_HEADER_ANNOTATION`, under a comment stating why a wire value lives in core. `src/browser/constants.ts:17-32` and `src/server/constants.ts:30-41` are deleted, and each file's header comment now points at core for that value.

Importers retargeted to `@src/core`: `src/browser/transports/WebSocketClientTransport.ts`, `src/server/transports/WebSocketClientTransport.ts`, `src/server/factories.ts` (dropped from the `./constants.js` row, added to the existing `@src/core` value import). The two `{@link import('./constants.js').MCP_WEBSOCKET_SUBPROTOCOL}` doc references at `src/browser/types.ts:30` and `src/server/types.ts:316` now read `{@link import('@orkestrel/mcp').MCP_WEBSOCKET_SUBPROTOCOL}`, matching the cross-face link form already used in `src/server/constants.ts`.

Guide: one row added to the core Constants table carrying the browser row's RFC 6455 prose; the browser Constants row deleted; the WebSocket transport's Constants table replaced by the italic pointer note the sibling Helpers sections already use, because deleting its only row would have left an empty table.

Failing-first proof — the test-side imports moved to `@src/core` before the declaration did:

- red: `npm run check` exit 2, 2 errors, both `Module '"@src/core"' has no exported member 'MCP_WEBSOCKET_SUBPROTOCOL'` (`mcp-obj-1-control-red.txt`)
- green: `npm run check` exit 0 (`mcp-obj-1-green-check.txt`); `test:guides` 159 passed; `test:src:browser` 60 passed; `test:src:server` 370 passed, 1 skipped

### mcp-obj-2 — the inverted publish gate

`package.json:93` now reads `npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release`. This row is a manifest ordering correction with no behavioural assertion to redden: `tests/config.test.ts:494` reads `prepublishOnly` for the distribution script alone, never for the order. The change is the whole evidence, and the `package.json` diff is one line.

### mcp-obj-3 and mcp-obj-4 — split public interfaces

Both are pure moves. `git diff --stat` reports 30 insertions / 30 deletions for `src/core/MCPServer.ts` and 13 / 13 for `src/core/transports/HTTPClientTransport.ts`, and reading the diffs confirms no line's text changed — git renders each as the shorter block moving. Resulting orders:

- `MCPServer`: fields → constructor → getters → `dispatch` → `handle` → `#dispatch` → `#register` → the remaining private methods
- `HTTPClientTransport`: fields → constructor → getters → `start` → `send` → `close` → `#stamp` → `#exchange` → `#buildHeaders` → `#deliver` → `#capture` → `#select`

Green: `npm run check` exit 0 (`mcp-obj-3-4-green-check.txt`); `test:src:core` 907 passed (`mcp-obj-3-4-green-core.txt`).

### mcp-obj-5 — the missing mirrored test

`tests/src/browser/transports/MessagePortTransport.test.ts` holds the seven class-behaviour cases, each driving `new MessagePortTransport({ port })` over a real `MessageChannel` and importing the class from `@src/browser`. The two end-to-end round trips stay in `tests/src/browser/factories.test.ts` under their existing describe title, which names the factory.

`close()` returns `void` on the class, so the moved cases call it without `await` — the factory returns the wider `MCPTransportInterface`, and awaiting a synchronous close there was an artefact of that widening.

Failing-first proof — the class body planted wrong (`close` reduced to setting its own flag, and `#receive` coercing instead of guarding), the new file run alone:

- red: `npx vitest run --project src:browser tests/src/browser/transports/MessagePortTransport.test.ts` exit 1, 4 failed / 3 passed of 7 (`mcp-obj-5-control-red.txt`). The named failures are the non-string-payload case, both `close` cases, and the fire-once case.
- plant removed by editing the two methods back; `git diff --stat src/browser/transports/MessagePortTransport.ts` reports no change against `HEAD`
- green: `npm run test:src:browser` 3 files, 60 passed (`mcp-obj-5-green-browser.txt`) — the same case total as before the move, redistributed across one more file

### mcp-subj-1 and mcp-subj-2 — the session knobs and the unreachable clock

Landed together, because subj-2's forwarding rule sits inside subj-1's new group.

Types first. `MCPSessionOptions` gains `readonly clock?: () => number` with the remark the row fixes. `MCPSessionMiddlewareOptions.capacity` is replaced by `readonly session?: MCPSessionOptions`, and the `capacity` bullet is rewritten as the `session` bullet; the "construct an `MCPSession` directly to set it" sentence is gone, because the group now reaches every leaf.

`MCPSession` carries `readonly #clock`, initialised `options?.clock ?? Date.now`. `push(message)` and `replay(afterId)` match the declared interface exactly. `#append` reads the clock once per append so the sweep's cutoff and the entry's timestamp cannot disagree, and `replay` passes `this.#clock()` into `#evict`.

`createMCPSession` binds `const sessionOptions = options?.session ?? {}` and mints with `{ ...sessionOptions, clock: sessionOptions.clock ?? clock }`, so one injected clock governs the store sweep and the log sweep unless a caller names a different one under `session`.

Failing-first proof for the defect subj-2 names — a new middleware test freezes the injected clock and sets a one-millisecond log lifetime, so a session left on `Date.now` sweeps the pushed events between the push and the reconnect and replays nothing:

- red: the forwarding reverted to `new MCPSession(crypto.randomUUID(), { ...sessionOptions })`, `npx vitest run --project src:server tests/src/server/middlewares.test.ts` exit 1, 1 failed / 33 passed of 34, the failure named `forwards its own clock to the session it mints, so the replay log sweeps on that clock` (`mcp-subj-2-control-red.txt`)
- green: forwarding restored, `npm run test:src:server` 372 passed, 1 skipped (`mcp-subj-1-2-green-server.txt`)

The signature change reddened its consumers first: `npm run check` exit 2, 15 errors, all `tests/src/server/MCPSession.test.ts … Expected 1 arguments, but got 2` (`mcp-subj-1-2-control-red.txt`). Those cases now construct with `createManualClock` and advance it explicitly. One case was added there for the default the removal exposes: an unset `clock` must leave the sweep on the host clock rather than on an instant frozen at construction.

`tests/src/server/middlewares.test.ts:113` forwarded `capacity` through a spread, which TypeScript's excess-property check does not reach — the option would have been silently ignored rather than reported. It now forwards `session: { capacity }`, and the helper takes a `session` bag for the new test.

### mcp-subj-4 — the guard prefix on capability predicates

Renamed in `src/core/helpers.ts` (declarations, `@example` blocks, the internal call site, the `{@link}`), `src/core/MCPServer.ts`, `tests/src/core/validators.test.ts`, and `guides/mcp.md`.

The rename reddened a parity assertion the row did not anticipate, and that reading is the row's failing-first proof: `tests/src/core/validators.test.ts:2315` derives the guard population as `Object.keys(core).filter((name) => name.startsWith('is'))`, so a renamed predicate leaves that population while still sitting in `PUBLISHED_GUARDS`.

- red: `npm run test:src:core` exit 1, 1 failed / 906 passed, the failure named `covers every guard the barrel publishes` (`mcp-subj-4-control-red.txt`)
- green: `npm run test:src:core` 909 passed (`mcp-subj-4-green-core.txt`)

Both predicates left `PUBLISHED_GUARDS` and entered a new `PUBLISHED_PREDICATES` record with its own membership assertion over `startsWith('supports')` and its own hostile-battery case. Dropping them from the guard record without that would have silently deleted the adversarial coverage they had.

Old-name sweeps, both empty:

- `grep -rn "isFormElicitationSupported\|isTaskSupported" src tests guides README.md package.json`
- `grep -rniE "\bisFormElicitationSupported|\bisTaskSupported|FormElicitationSupport|TaskSupport" …` over the same paths

### mcp-subj-5 — the false fence comment

`guides/mcp.md` now reads `const outcome = await client.call('add', { x: 2, y: 5 })` with `// outcome → { resultType: 'complete', value: 7 }`. The three no-comment bindings renamed to `outcome` under one-concept-one-term: `guides/mcp.md` (the HTTP client fence), `README.md:60`, `src/core/factories.ts:106`.

The fence is now executed. `tests/guides.test.ts` gains `createGuideLoopback` (the fence's own duplex channel, typed by a local `GuideLoopbackInterface`), `readGuideBoundCall` driving `bindServer`/`bindClient` exactly as the fence does, and a describe asserting the documented outcome.

Failing-first proof — the assertion set to the value the guide used to claim:

- red: `expect(await readGuideBoundCall()).toEqual(7)`, `npm run test:guides` exit 1, 1 failed / 159 passed of 160 (`mcp-subj-5-control-red.txt`)
- green: assertion restored to `{ resultType: 'complete', value: 7 }`, 160 passed (`mcp-subj-5-green.txt`)

### mcp-subj-6 — third person mid-clause

`src/core/types.ts:850` reads "Executes one canonical tool call or returns a fully formed complete MCP result." `MCPTaskManagerInterface.start` reads "Creates — or returns the existing — durable task for one stable operation key." The guide's Behavior cell was left alone, as the row directs.

### mcp-subj-7 — the manager suffix over a single-operation port

`MCPCompletionManagerInterface` → `MCPCompletionInterface` in `src/core/types.ts`, `src/core/MCPServer.ts`, `src/core/factories.ts`, `tests/src/core/MCPServer.test.ts`, `tests/setupConformance.ts`, and `guides/mcp.md` (the ports table, the Types row, the Methods heading, and every backticked mention). The option key `completion` is unchanged.

The collision note the row required is in the interface's TSDoc: "This is the PORT that produces a `MCPCompletion`, not the behavioural face of one: the candidate set is the data type, and this contract is the single method a host answers it from."

`MCPServerOptions`' prose at `src/core/types.ts:2057-2058` names no type, so it needed no edit — recorded rather than changed.

One consequence the row does not name: the test fixture implementing the port was called `MemoryCompletionManager`, which reintroduces at the fixture the vocabulary the row removes from the contract. It is now `MemoryCompletion`.

Old-name sweep, empty: `grep -rn "MCPCompletionManagerInterface" src tests guides README.md`.

### mcp-subj-8 — verb-named handler keys

`MCPTaskOptions.defer` → `deferral` and `MCPSubscriptionOptions.listen` → `producer` in `src/core/types.ts`, with each doc comment kept.

`MCPServer.#defer` already held a local `const context` for the parsed request context, so the local `MCPTaskContext` binding could not take the `context` name the option rename frees up. It is now `deferred`, which leaves `configured.deferral(deferred, options)` and `configured.tasks.start(key, deferred, options)` reading as one deferral. No signature moved.

The call sites were enumerated by typecheck rather than by pattern, because `MCPClientInterface.listen` and `MCPTransportInterface.listen` share the word:

- red: `npm run check` exit 2, 34 errors — 15 naming `'listen' does not exist in type 'MCPSubscriptionOptions'` across `tests/setup.ts`, `tests/src/core/MCPServer.test.ts` and `tests/src/server/handlers.test.ts`, plus their inferred-parameter follow-ons (`mcp-subj-7-8-control-red.txt`)
- green: `npm run check` exit 0 (`mcp-subj-7-8-green-check.txt`); `npm run test:src:core` 909 passed (`mcp-subj-7-8-green-core.txt`)

`createSubscriptionServer`'s first parameter is renamed `producer` with it, so the shorthand it forwards keeps naming the option it fills.

Guide updates: the Types rows for both option types, the subscription section prose and its fence, the Tasks section prose and its fence, the `MCPTaskContext` row, the tasks obligation table, and the contract clauses.

Old-key sweep: `grep -rn "\bdefer\b" src tests guides README.md` returns the private method `#defer`, the verb in prose, a test's `'defer-1'` request id, and the `#defer-a-call-to-a-durable-task` anchor. Every remaining `listen:` is `MCPTransportInterface.listen` or a local binding.

### mcp-subj-9 — `should` in the banned sense

`tests/setupConformance.ts:746` reads "exactly as its contract states". `src/core/helpers.ts:1619` reads "to know what the request must carry".

Sweep, `grep -rni "should" src tests`, every hit ruled:

| Site | Sense | Ruling |
| --- | --- | --- |
| `src/core/helpers.ts:486` | RFC 2119 `SHOULD`, quoted uppercase | permitted |
| `src/core/MCPClient.ts:1018` | RFC 2119 `SHOULD`, quoted uppercase | permitted |
| `tests/src/core/MCPServer.test.ts:719` | RFC 2119 `SHOULD`, quoted uppercase | permitted |
| `tests/src/core/MCPClient.test.ts:2945` | RFC 2119 `SHOULD`, quoted uppercase | permitted |
| `tests/conformance.test.ts:48,108,117,135,358` | RFC 2119 `SHOULD`, the runner's check level | permitted |
| `tests/setupConformance.ts:129,141` | RFC 2119 `SHOULD`, the runner's check level | permitted |
| `tests/setupConformance.ts:1317` | a fixture's elicitation prompt string | payload data, not prose |
| `tests/setup.ts:1217` | banned expectation sense | outside the row — reported |
| `tests/src/core/MCPServer.test.ts:5239` | banned expectation sense | outside the row — reported |

The last two sit outside this row's ruled sites and outside the campaign's enumerated scope, so they are recorded under § Findings outside scope rather than edited.

## Fleet rows

**fleet-F1** — `noop`. Both `noop` conditions hold. `grep -rn "isBrowserVuePath" tests vite.config.ts` returns nothing, so the helper is absent; and the workspace has a browser environment (`src/browser/`, `tests/src/browser/`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`). `tests/setup.ts` carries many other exports, so the export-free-proof branch does not reach this package either. No edit.

**fleet-F2** — `noop`. `grep -rn -A 6 "^export class" src` reads the head of every implementation class: `WebSocketServerTransport`, `WebSocketClientTransport` (server and browser), `StdioClientTransport`, `StdioServerTransport`, `HTTPDisconnect`, `MCPSession`, `MessagePortTransport`, `MCPTaskClient`, `HTTPClientTransport`, `MCPProgressReporter`, `MCPMethodManager`, `MCPLegacyClientTransport`, `MCPClient`, `MCPLegacy`, `MCPTextStreamController`, `MCPStreamController`, `MCPServer`, `MCPError`. None declares a public `readonly id: string` data field ahead of its `#` fields. `MCPSession` already holds `readonly #id` first and exposes `get id()`. `MCPError` declares public `code` and `context`, which is neither the `id` field nor an implementation class outside `errors.ts`. No edit.

## Files touched

| File | Change |
| --- | --- |
| `src/core/constants.ts` | `MCP_WEBSOCKET_SUBPROTOCOL` declared here; header comment now names the wire tokens core owns |
| `src/browser/constants.ts` | the face copy of the subprotocol deleted; header comment points at core |
| `src/server/constants.ts` | the face copy of the subprotocol deleted; header comment points at core |
| `src/browser/transports/WebSocketClientTransport.ts` | imports the subprotocol from `@src/core` |
| `src/server/transports/WebSocketClientTransport.ts` | imports the subprotocol from `@src/core` |
| `src/server/factories.ts` | imports the subprotocol from `@src/core` |
| `src/browser/types.ts` | the subprotocol doc link retargeted to `@orkestrel/mcp` |
| `src/server/types.ts` | the subprotocol doc link retargeted; `MCPSessionOptions.clock` added; `MCPSessionMiddlewareOptions.session` replaces `capacity` |
| `src/core/MCPServer.ts` | `#dispatch` moved below `handle`; `supportsTask` and `MCPCompletionInterface` renames; `deferral` / `producer` reads |
| `src/core/transports/HTTPClientTransport.ts` | `#stamp` and `#exchange` moved below `close` |
| `src/core/helpers.ts` | `supportsFormElicitation` / `supportsTask` renames; one banned `should` replaced |
| `src/core/types.ts` | `MCPCompletionInterface` rename with its disambiguating sentence; `deferral` / `producer` keys; two third-person fixes |
| `src/core/factories.ts` | `MCPCompletionInterface` doc link; the client `@example` binds `outcome` |
| `src/server/MCPSession.ts` | `#clock` field; `push` / `replay` match the declared interface; class TSDoc bullet rewritten |
| `src/server/middlewares.ts` | forwards the `session` group and its own clock into each minted session; `@param` rewritten |
| `package.json` | `prepublishOnly` runs `check` before `build` |
| `guides/mcp.md` | every row above, plus the corrected loopback fence |
| `README.md` | the client example binds `outcome` |
| `tests/guides.test.ts` | `symbol.keyword`; the bind fence transcribed and executed |
| `tests/setup.ts` | `deferral` / `producer` keys; `createSubscriptionServer`'s parameter renamed; the manual-clock TSDoc names both seams |
| `tests/setupConformance.ts` | `MCPCompletionInterface`; one banned `should` replaced |
| `tests/fixtures/browserServer.ts` | the subprotocol imported from `@src/core` |
| `tests/src/browser/factories.test.ts` | the subprotocol import moved; the seven class-behaviour cases removed |
| `tests/src/browser/transports/MessagePortTransport.test.ts` | new — the mirrored proof for the class |
| `tests/src/core/validators.test.ts` | the renamed predicates; `PUBLISHED_PREDICATES` and its two cases |
| `tests/src/core/MCPServer.test.ts` | `deferral` / `producer` keys; `MCPCompletionInterface`; `MemoryCompletion` |
| `tests/src/core/MCPLegacy.test.ts` | `deferral` key |
| `tests/src/core/helpers.test.ts` | `deferral` key |
| `tests/src/server/MCPSession.test.ts` | constructs with an injected clock; adds the host-clock default case |
| `tests/src/server/middlewares.test.ts` | `session` group forwarding; the clock-forwarding proof |
| `tests/src/server/handlers.test.ts` | `producer` key |

Diffstat: 30 files changed, 568 insertions, 512 deletions, plus the new untracked test file.

## Gates

Run in order, each read bare.

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | "All matched files use the correct format." over 126 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | no output |
| `npm run build` | 0 | no output |
| `npm test` | 0 | src 32 files / 1341 passed, 1 skipped; policy 111; config 46; setup 5 files / 86; guides 160; conformance 47; integration 4 |

Files: `/home/user/work/evidence/mcp-proofs/gate-1-format-check.txt` through `gate-5-test.txt`.

`format:check` failed once mid-unit on `guides/mcp.md` and `tests/src/core/validators.test.ts`; oxfmt formats Markdown tables, and the changed rows moved each table's widest cell. Fixed by running `npx oxfmt --config .oxfmtrc.json --write` on those two owned files only, never tree-wide. `git diff -w` over the guide confirms every substantive line is one of this unit's own edits; the rest is table re-padding.

The `npm test` reading is this unit's own, taken inside its exec. Take the deciding run after this unit exits.

`git status --short` lists 30 modified files and one untracked file, every one inside Owned.

## Breaking

Four rows move a published symbol. `@orkestrel/probe` is the only fleet dependent (`package.json:98`), and `/home/user/fleet/probe/src/server/ProbeServer.ts:2,7,8` imports `MCPCallResult`, `MCPExecutionContext`, `createMCPLegacy`, `createMCPServer`, `isBoundedJSON`, and `createStdioServer` — none of them renamed or moved here.

| Break | Consumer edit `@orkestrel/probe` needs |
| --- | --- |
| `MCP_WEBSOCKET_SUBPROTOCOL` moves from both faces to the core barrel | none |
| `isFormElicitationSupported` → `supportsFormElicitation`, `isTaskSupported` → `supportsTask` | none |
| `MCPCompletionManagerInterface` → `MCPCompletionInterface` | none |
| `MCPTaskOptions.defer` → `deferral`, `MCPSubscriptionOptions.listen` → `producer`, `MCPSessionMiddlewareOptions.capacity` → `session`, `MCPSessionInterface.push` / `replay` lose their `now` parameter | none |

`@orkestrel/probe` needs a re-pin and a gate re-run at its own landing, and its vendored `guides/mcp.md` mirror refreshes at the wave.

An outside-fleet consumer importing `MCP_WEBSOCKET_SUBPROTOCOL` from `@orkestrel/mcp/browser` or `@orkestrel/mcp/server` moves that import to `@orkestrel/mcp`. One importing either renamed predicate, the renamed interface, or either renamed option key renames it. One calling `session.push(message, now)` or `session.replay(afterId, now)` supplies `clock` in `MCPSessionOptions` instead. One passing `capacity` to `createMCPSession` passes `session: { capacity }`.

## Shared-file patches

None. No file outside Owned needed an edit to keep this package's gates green.

## Decisions recorded (ancillary)

- **mcp-obj-1, the merged TSDoc.** The row directs moving the browser face's block. The single declaration now serves both faces, so the server block's distinguishing statement — the client sends it in `Sec-WebSocket-Protocol`, the server echoes it in the `101` handshake, and the upgrade is selected by the `Upgrade` header rather than a separate path — is kept as a second paragraph. Dropping it would have left the server transport's use of the constant undocumented.
- **mcp-obj-1, the emptied guide table.** Deleting the WebSocket transport's only Constants row would leave an empty table. It is replaced by an italic pointer note, the form the sibling Helpers sections already use for a face that declares none.
- **mcp-obj-5, the section comment.** The row directs carrying the comment at `tests/src/browser/factories.test.ts:459-462` with the moved block. Carried verbatim it would be false in the new file, because it describes the `bindServer`/`bindClient` composition that stays behind. The new file's header states what that file drives and points at the factories test for the composition; the factories test keeps its describe title, which names the factory.
- **mcp-subj-8, the local binding.** `deferral` was already the name of the local `MCPTaskContext` in `MCPServer.#defer`, and `context` was taken by the parsed request context. The local is now `deferred`.
- **mcp-subj-4, the predicate battery.** Removing the renamed predicates from `PUBLISHED_GUARDS` was forced by the `startsWith('is')` derivation. Their hostile-input coverage is preserved under `PUBLISHED_PREDICATES` rather than dropped.
- **mcp-subj-5, helper placement.** `createGuideLoopback` and `readGuideBoundCall` are module-scope helpers in `tests/guides.test.ts`, matching the `readGuide*` fence-transcription helpers already there, rather than exports of `tests/setup.ts`.

## Findings outside scope

Recorded for a successor round, not edited.

- `tests/setup.ts:1217` reads "A manager's SUGGESTION about how often a client should ask again" — the banned expectation sense of `should`, outside mcp-subj-9's ruled sites. The next line carries `simply`, a separate banned substitution.
- `tests/src/core/MCPServer.test.ts:5239` reads "the paragraph should be deleted" — the same banned sense, also outside the row.
- `supportsFormElicitation` and `supportsTask` are declared in `src/core/helpers.ts` but proved in `tests/src/core/validators.test.ts`. The refuter noted this while amending mcp-subj-4 and did not rule it. The mirror rule would place those cases in `tests/src/core/helpers.test.ts`.

## Deviations

None. No row stopped, no repair collided with an existing name, and no row needed a file outside Owned.
