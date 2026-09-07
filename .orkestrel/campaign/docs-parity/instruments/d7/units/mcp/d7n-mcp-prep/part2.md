
The shape matches the pilot at `/home/user/fleet/abort/tests/guides.test.ts:146-228` byte for byte
outside this package's constants: `members` and `documented` bound once per `describe` in the methods
loop, the mapped `examples` and `documented` bound once at the examples loop's own scope above the
`describe`. The `group.methods.length` assertion stays. The import walk's `findMissing(statement.names, …)`
and the `names`-against-`surface` call are already string-argument calls and stay. No other change to the
suite; this package's suite carries no `findDrift` case, and none was added.

## Item 3 — the voice sites

Every file `npx oxlint --config .oxlintrc.json --deny-warnings .` named after item 1, and the
diagnostic that sent it there:

| File | Diagnostic that sent it there |
| ---- | ----------------------------- |
| `src/browser/factories.ts` | `policy/no-malformed-summary` |
| `src/browser/transports/WebSocketClientTransport.ts` | `policy/no-malformed-summary` |
| `src/core/MCPClient.ts` | `policy/no-banned-term` |
| `src/core/MCPServer.ts` | `policy/no-banned-term` |
| `src/core/MCPTextStreamController.ts` | `policy/no-banned-term` |
| `src/core/types.ts` | `policy/no-banned-term` |
| `src/server/HTTPDisconnect.ts` | `policy/no-banned-term` |
| `src/server/handlers.ts` | `policy/no-banned-term` |
| `tests/conformance.test.ts` | `policy/no-banned-term` |
| `tests/conformanceClient.ts` | `policy/no-banned-term` |
| `tests/fixtures/browserServer.ts` | `policy/no-malformed-summary` |
| `tests/guides.test.ts` | `policy/no-banned-term` |
| `tests/setup.ts` | `policy/no-banned-term`, `policy/no-malformed-summary` |
| `tests/setupBrowser.ts` | `policy/no-malformed-summary` |
| `tests/setupConformance.ts` | `policy/no-banned-term`, `policy/no-malformed-summary` |
| `tests/setupGlobal.ts` | `policy/no-malformed-summary` |
| `tests/setupServer.ts` | `policy/no-banned-term`, `policy/no-malformed-summary` |
| `tests/src/core/MCPClient.test.ts` | `policy/no-banned-term` |
| `tests/src/core/MCPServer.test.ts` | `policy/no-banned-term` |
| `tests/src/core/parsers.test.ts` | `policy/no-banned-term` |
| `tests/src/server/factories.test.ts` | `policy/no-banned-term` |
| `tests/src/server/integration.test.ts` | `policy/no-banned-term` |
| `tests/src/server/middlewares.test.ts` | `policy/no-banned-term` |

Every `src/**` diagnostic sits in a doc block or a comment, so none reached code and none named an
off-limits file. Two rulings I decided and record:

- An RFC 2119 keyword (`SHOULD`, `MAY`) is the external protocol's term quoted as itself, and
  replacing it with `must` would falsify the conformance claim the sentence makes. Each is wrapped in
  a code span instead, which `stripPolicyCode` in `configs/policy.ts` blanks before matching and which
  `.claude/rules/writing.md` § Code tokens fixes as the form for a quoted token.
- `tests/setupConformance.ts` line 819 carried a temporal `once` in the sentence a summary rewrite
  already touched; it reads `after` in the rewritten sentence.

Before and after per diagnostic, grouped by file:

#### src/browser/factories.ts

```text
[no-malformed-summary]
- * that drives a REMOTE MCP server over the native `WebSocket` global, the browser
- * sibling of the Node face's `createWebSocketClientTransport` (`@orkestrel/mcp/server`).
+ * that drives a REMOTE MCP server over the native `WebSocket` global. This factory is the
+ * browser sibling of the Node face's `createWebSocketClientTransport` (`@orkestrel/mcp/server`).
```

#### src/browser/transports/WebSocketClientTransport.ts

```text
[no-malformed-summary]
- * Drives a REMOTE MCP server over the native `WebSocket` global from the browser face — a
- * CLIENT {@link MCPMessageTransportInterface}, the browser sibling of the Node face's
- * {@link import('@orkestrel/mcp/server').WebSocketClientTransport}.
+ * Drives a REMOTE MCP server over the native `WebSocket` global from the browser face, as a
+ * CLIENT {@link MCPMessageTransportInterface}. This class is the browser sibling of the Node
+ * face's {@link import('@orkestrel/mcp/server').WebSocketClientTransport}.
```

#### src/core/MCPClient.ts

```text
[no-banned-term]
- `success: false` result just like a local throw)
+ `success: false` result exactly like a local throw)
[no-banned-term]
- which cannot know what was just set.
+ which cannot know what the preceding statement set.
[no-banned-term]
- it lives on the entry that was just dropped.
+ it lives on the entry this call already dropped.
```

#### src/core/MCPServer.ts

```text
[no-banned-term]
- both windows: the one just minted, and the one this round is
+ both windows: the one minted here, and the one this round is
```

#### src/core/MCPTextStreamController.ts

```text
[no-banned-term]
- disposing the exchange, never just this adapter.
+ disposing the exchange, never this adapter alone.
```

#### src/core/types.ts

```text
[no-banned-term]
- instead simply omits it.
+ instead omits it.
[no-banned-term]
- because a task that has just been created has no
+ because a task at creation has no
[no-banned-term]
- one consequence that is easy
+ one consequence a reader can
[no-banned-term]
- a consumer that simply walks away releases none of them
+ a consumer that walks away releases none of them
[no-banned-term]
- a caller that cannot abort simply never
+ a caller that cannot abort never
[no-banned-term]
- caller simply stops waiting.
+ caller stops waiting.
[no-banned-term]
- `success: false` result just like a
+ `success: false` result exactly like a
```

#### src/server/HTTPDisconnect.ts

```text
[no-banned-term]
- the body simply closes,
+ the body closes,
```

#### src/server/handlers.ts

```text
[no-banned-term]
- the revision it just answered `_meta` for.
+ the revision it answered `_meta` for.
```

#### tests/conformance.test.ts

```text
[no-banned-term]
- // A SHOULD-level check is neither:
+ // A `SHOULD`-level check is neither:
[no-banned-term]
- the scenario's own check is a SHOULD, so a retry
+ the scenario's own check is a `SHOULD`, so a retry
[no-banned-term]
- // Passes at 1/0 for the same SHOULD reason as
+ // Passes at 1/0 for the same `SHOULD` reason as
[no-banned-term]
- A check the runner reports at SHOULD level tallies
+ A check the runner reports at `SHOULD` level tallies
```

#### tests/conformanceClient.ts

```text
[no-banned-term]
- schema it just sent under that same name
+ schema it sent under that same name
```

#### tests/fixtures/browserServer.ts

```text
[no-malformed-summary]
- /** The running Node fixture exposed to the browser project's global setup. */
+ /** Describes the running Node fixture exposed to the browser project's global setup. */
[no-malformed-summary]
- /** Create the intentionally malformed JSON response used by the HTTP error-path test. */
+ /** Creates the intentionally malformed JSON response used by the HTTP error-path test. */
[no-malformed-summary]
- /** Let the real browser page reach the external HTTP fixture, including session requests. */
+ /** Lets the real browser page reach the external HTTP fixture, including session requests. */
[no-malformed-summary]
- * Record one raw frame a fixture peer received.
+ * Records one raw frame a fixture peer received.
[no-malformed-summary]
- * Answer with every recorded frame and clear the log.
+ * Answers with every recorded frame and clears the log.
[no-malformed-summary]
- * Answer a POST with the MCP headers it actually carried across the wire.
+ * Answers a POST with the MCP headers it actually carried across the wire.
[no-malformed-summary]
- * Record every JSON-RPC body POSTed to the fixture before the route handles it.
+ * Records every JSON-RPC body POSTed to the fixture before the route handles it.
[no-malformed-summary]
- * Create the recording WebSocket peer — the REAL server
+ * Creates the recording WebSocket peer — the REAL server
[no-malformed-summary]
- /** Create raw WebSocket endpoints for peer-close and malformed-frame browser tests. */
+ /** Creates raw WebSocket endpoints for peer-close and malformed-frame browser tests. */
[no-malformed-summary]
- * Start the real MCP HTTP/session/WebSocket fixture on an ephemeral loopback port.
+ * Starts the real MCP HTTP/session/WebSocket fixture on an ephemeral loopback port.
```

#### tests/guides.test.ts

```text
[no-banned-term]
- the whole statement is lost, not just the binding.
+ the whole statement is lost, not the binding alone.
```

#### tests/setup.ts

```text
[no-banned-term]
- names the constructs in order to forbid them.
+ names the constructs to forbid them.
[no-banned-term]
- so a consumer can react (e.g. abort the `fetch`) mid-stream.
+ so a consumer can react (for example abort the `fetch`) mid-stream.
[no-malformed-summary]
- * Narrow an untyped value to an
+ * Narrows an untyped value to an
[no-malformed-summary]
- * Await one promise within a bounded
+ * Awaits one promise within a bounded
[no-malformed-summary]
- * Build a well-formed {@link JSONRPCRequest}
+ * Builds a well-formed {@link JSONRPCRequest}
[no-malformed-summary]
- * Build a JSON-RPC notification whose
+ * Builds a JSON-RPC notification whose
[no-malformed-summary]
- * Build one adversarial corpus every
+ * Builds one adversarial corpus every
[no-malformed-summary]
- /** Every key name the published guards read off an untrusted value by name. */
+ /** Lists every key name the published guards read off an untrusted value by name. */
[no-malformed-summary]
- /** The accessor body every throwing-key row installs. */
+ /** Throws as the accessor body every throwing-key row installs. */
[no-malformed-summary]
- * Build one record per key, each defining
+ * Builds one record per key, each defining
[no-malformed-summary]
- * Build the canonical calculator {@link MCPServerInterface}
+ * Builds the canonical calculator {@link MCPServerInterface}
[no-malformed-summary]
- * Build an {@link MCPServerInterface} whose every
+ * Builds an {@link MCPServerInterface} whose every
[no-malformed-summary]
- /** The reserved `_meta` a modern request carries — the protocol version plus empty capabilities. */
+ /** Supplies the reserved `_meta` a modern request carries — the protocol version plus empty capabilities. */
[no-malformed-summary]
- /** One row of the protocol-version projection both HTTP client transports must answer alike. */
+ /** Describes one row of the protocol-version projection both HTTP client transports must answer alike. */
[no-malformed-summary]
- /** The shared modern-context table both HTTP client transports are driven over. */
+ /** Supplies the shared modern-context table both HTTP client transports are driven over. */
[no-malformed-summary]
- * Build one `tools/list` request for the header-projection table.
+ * Builds one `tools/list` request for the header-projection table.
[no-malformed-summary]
- * Build a modern request carrying the shared
+ * Builds a modern request carrying the shared
[no-malformed-summary]
- /** In-memory resource manager shared by server and legacy dispatch tests. */
+ /** Serves resources from memory for the server and legacy dispatch tests. */
[no-malformed-summary]
- /** A peerable in-memory transport with outbound recording. */
+ /** Describes a peerable in-memory transport with outbound recording. */
[no-malformed-summary]
- * Create a peerable in-memory MCP transport.
+ * Creates a peerable in-memory MCP transport.
[no-malformed-summary]
- /** A minimal protocol peer that exchanges serialized JSON-RPC over the real duplex port. */
+ /** Describes a minimal protocol peer that exchanges serialized JSON-RPC over the real duplex port. */
[no-malformed-summary]
- * Bind an MCP server to a minimal serialized-message peer.
+ * Binds an MCP server to a minimal serialized-message peer.
[no-malformed-summary]
- * Build one modern `subscriptions/listen` request
+ * Builds one modern `subscriptions/listen` request
[no-malformed-summary]
- /** What one consumer did with the controlled exchange it was handed. */
+ /** Reports what one consumer did with the controlled exchange it was handed. */
[no-malformed-summary]
- * Hand one controlled exchange to a consumer and report whether that consumer ENDED it.
+ * Hands one controlled exchange to a consumer and reports whether that consumer ENDED it.
[no-malformed-summary]
- /** The owner-of-last-resort spellings a controlled exchange must never grow. */
+ /** Lists the owner-of-last-resort spellings a controlled exchange must never grow. */
[no-malformed-summary]
- * Report every owner-of-last-resort construct a source declares.
+ * Reports every owner-of-last-resort construct a source declares.
[no-malformed-summary]
- * Drive one client-initiated notification through a live carrier and report what the peer got.
+ * Drives one client-initiated notification through a live carrier and reports what the peer got.
[no-malformed-summary]
- * Read the `method` of every invocation among
+ * Reads the `method` of every invocation among
[no-malformed-summary]
- * Create an in-process {@link MCPMessageTransportInterface} that dispatches directly against a
+ * Dispatches directly against a given {@link MCPServerInterface} from an in-process
[no-malformed-summary]
- * POST a JSON value to a real HTTP fixture endpoint.
+ * Posts a JSON value to a real HTTP fixture endpoint.
[no-malformed-summary]
- * Drain a `fetch` Response's SSE body to completion
+ * Drains a `fetch` Response's SSE body to completion
[no-malformed-summary]
- * Stream a `fetch` Response's SSE body as decoded
+ * Streams a `fetch` Response's SSE body as decoded
[no-malformed-summary]
- /** A manually-driven epoch-ms clock plus the control to advance it explicitly. */
+ /** Describes a manually-driven epoch-ms clock plus the control to advance it explicitly. */
[no-malformed-summary]
- * Create a {@link ManualClockInterface} — a manual-time
+ * Creates a {@link ManualClockInterface} — a manual-time
[no-malformed-summary]
- /** One outbound frame, with the real instant it left the client. */
+ /** Describes one outbound frame, with the real instant it left the client. */
[no-malformed-summary]
- /** An {@link MCPMessageTransportInterface} that records every outbound frame and when it left. */
+ /** Records every outbound frame and when it left, as an {@link MCPMessageTransportInterface}. */
[no-malformed-summary]
- * Create an in-process {@link TestTransportInterface} over a real
+ * Creates an in-process {@link TestTransportInterface} over a real
[no-malformed-summary]
- * Create a real {@link MCPServerInterface} with the stable Tasks
+ * Creates a real {@link MCPServerInterface} with the stable Tasks
[no-malformed-summary]
- /** The client capabilities that declare the stable Tasks extension — the whole declaration. */
+ /** Declares the stable Tasks extension in the client capabilities — the whole declaration. */
[no-malformed-summary]
- /** How one {@link TestTaskManager} runs a task's work. */
+ /** Decides how one {@link TestTaskManager} runs a task's work. */
[no-malformed-summary]
- * A real in-memory {@link MCPTaskManagerInterface} — a durable store, a worker per task,
+ * Runs durable tasks in memory as a real {@link MCPTaskManagerInterface} — a durable store, a worker per task,
```

#### tests/setupBrowser.ts

```text
[no-malformed-summary]
- * Tap a live `MessagePort` and return a drain over the JSON-RPC frames it has received.
+ * Taps a live `MessagePort` and returns a drain over the JSON-RPC frames it has received.
[no-malformed-summary]
- /** A wired pair of real `createScopeTransport` halves, plus what the SERVER half received. */
+ /** Wires a pair of real `createScopeTransport` halves, plus what the SERVER half received. */
[no-malformed-summary]
- * Wire real {@link createScopeTransport} halves into one in-page duplex carrier.
+ * Wires real {@link createScopeTransport} halves into one in-page duplex carrier.
[no-malformed-summary]
- * Read (and clear) every frame the Node fixture's recording peers received.
+ * Reads (and clears) every frame the Node fixture's recording peers received.
```

#### tests/setupConformance.ts

```text
[no-banned-term]
- SHOULD-level check that reported WARNING is invisible
+ `SHOULD`-level check that reported WARNING is invisible
[no-banned-term]
- /** Checks the scenario reported at SHOULD level. */
+ /** Checks the scenario reported at `SHOULD` level. */
[no-malformed-summary]
- /** The conformance runner package, pinned as a development dependency and resolved from disk. */
+ /** Names the conformance runner package, pinned as a development dependency and resolved from disk. */
[no-malformed-summary]
- /** The runner's entry module inside its installed package. */
+ /** Names the runner's entry module inside its installed package. */
[no-malformed-summary]
- /** The dated protocol revision the runner drives the server at. */
+ /** Names the dated protocol revision the runner drives the server at. */
[no-malformed-summary]
- /** The identity the fixture server answers `initialize` with. */
+ /** Supplies the identity the fixture server answers `initialize` with. */
[no-malformed-summary]
- /** One `✓ <scenario>: N passed, M failed` line in the runner's summary block. */
+ /** Matches one `✓ <scenario>: N passed, M failed` line in the runner's summary block. */
[no-malformed-summary]
- /** The runner's closing `Total: N passed, M failed` line. */
+ /** Matches the runner's closing `Total: N passed, M failed` line. */
[no-malformed-summary]
- /** The scenario-name prefix marking the runner's OAuth family. */
+ /** Names the scenario-name prefix marking the runner's OAuth family. */
[no-malformed-summary]
- /** The `list` heading that opens the runner's client-scenario section. */
+ /** Matches the `list` heading that opens the runner's client-scenario section. */
[no-malformed-summary]
- /** One `  - <scenario> [<revisions>]` entry inside a `list` section. */
+ /** Matches one `  - <scenario> [<revisions>]` entry inside a `list` section. */
[no-malformed-summary]
- * Every client scenario the runner's own `list` reports as applicable at
+ * Lists every client scenario the runner's own `list` reports as applicable at
[no-malformed-summary]
- /** The runner's per-scenario `Passed: N/D, M failed, W warnings` result line in client mode. */
+ /** Matches the runner's per-scenario `Passed: N/D, M failed, W warnings` result line in client mode. */
[no-malformed-summary]
- /** One conformance scenario's tally, exactly as the runner's summary reports it. */
+ /** Describes one conformance scenario's tally, exactly as the runner's summary reports it. */
[no-malformed-summary]
- * One client scenario's outcome, exactly as the runner's per-scenario result block reports it.
+ * Describes one client scenario's outcome, exactly as the runner's per-scenario result block reports it.
[no-malformed-summary]
- /** The parsed outcome of one whole conformance run. */
+ /** Describes the parsed outcome of one whole conformance run. */
[no-malformed-summary]
- /** The JSON Schema spelling of an integer millisecond value in the Tasks extension. */
+ /** Supplies the JSON Schema spelling of an integer millisecond value in the Tasks extension. */
[no-malformed-summary]
- /** The properties every task variant shares. */
+ /** Lists the properties every task variant shares. */
[no-malformed-summary]
- /** The properties every task owes. */
+ /** Lists the properties every task owes. */
[no-malformed-summary]
- * The rich content the content-block scenarios ask for VERBATIM.
+ * Supplies the rich content the content-block scenarios ask for VERBATIM.
[no-malformed-summary]
- * The JSON Schema 2020-12 document `json-schema-2020-12` reads back out of `tools/list`.
+ * Supplies the JSON Schema 2020-12 document `json-schema-2020-12` reads back out of `tools/list`.
[no-malformed-summary]
- * The text each input-driven tool answers with once its rounds are answered.
+ * Supplies the text each input-driven tool answers with after its rounds are answered.
[no-malformed-summary]
- * Build the live tool registry the conformance scenarios call.
+ * Builds the live tool registry the conformance scenarios call.
[no-malformed-summary]
- /** The signing secret the fixture's continuation port protects its request state with. */
+ /** Supplies the signing secret the fixture's continuation port protects its request state with. */
[no-malformed-summary]
- /** The principal the fixture binds into protected state; this host authenticates nobody. */
+ /** Names the principal the fixture binds into protected state; this host authenticates nobody. */
[no-malformed-summary]
- /** How long one protected continuation round stays valid, in milliseconds. */
+ /** Bounds how long one protected continuation round stays valid, in milliseconds. */
[no-malformed-summary]
- /** The integrity-protected continuation port both the tool and prompt rounds seal state with. */
+ /** Supplies the integrity-protected continuation port both the tool and prompt rounds seal state with. */
[no-malformed-summary]
- * The rounds each input-driven tool asks for, in the order the scenario drives them.
+ * Lists the rounds each input-driven tool asks for, in the order the scenario drives them.
[no-malformed-summary]
- * Decide whether the call in hand still owes this host an answer.
+ * Decides whether the call in hand still owes this host an answer.
[no-malformed-summary]
- * Project the accepted string answers a verified retry carried.
+ * Projects the accepted string answers a verified retry carried.
[no-malformed-summary]
- /** The static resources the fixture advertises over `resources/list`. */
+ /** Lists the static resources the fixture advertises over `resources/list`. */
[no-malformed-summary]
- /** The contents each static resource URI resolves to. */
+ /** Maps each static resource URI to the contents it resolves to. */
[no-malformed-summary]
- * The already-substituted form of the fixture's one resource template.
+ * Matches the already-substituted form of the fixture's one resource template.
[no-malformed-summary]
- /** The descriptor form of {@link CONFORMANCE_TEMPLATE}, as `resources/templates/list` advertises it. */
+ /** Supplies the descriptor form of {@link CONFORMANCE_TEMPLATE}, as `resources/templates/list` advertises it. */
[no-malformed-summary]
- * Resolve one already-substituted template URI to its JSON document.
+ * Resolves one already-substituted template URI to its JSON document.
[no-malformed-summary]
- /** The prompts the fixture advertises over `prompts/list`. */
+ /** Lists the prompts the fixture advertises over `prompts/list`. */
[no-malformed-summary]
- * The input request the multi-round prompt asks for before it can be filled.
+ * Supplies the input request the multi-round prompt asks for before it can be filled.
[no-malformed-summary]
- /** The canonical state the multi-round prompt seals into its opaque `requestState`. */
+ /** Supplies the canonical state the multi-round prompt seals into its opaque `requestState`. */
[no-malformed-summary]
- * Issue the multi-round prompt's round, or let a verified retry through.
+ * Issues the multi-round prompt's round, or lets a verified retry through.
[no-malformed-summary]
- * Fill one named prompt with the caller's arguments.
+ * Fills one named prompt with the caller's arguments.
[no-malformed-summary]
- /** The candidate values each prompt argument completes to. */
+ /** Lists the candidate values each prompt argument completes to. */
[no-malformed-summary]
- /** The candidate identifiers the fixture's resource template completes to. */
+ /** Lists the candidate identifiers the fixture's resource template completes to. */
[no-malformed-summary]
- * Project one candidate list onto the fragment the client has typed so far.
+ * Projects one candidate list onto the fragment the client has typed so far.
[no-malformed-summary]
- * Build the whole conformance host — every port `MCPServerOptions` publishes, backed by
+ * Builds the whole conformance host — every port `MCPServerOptions` publishes, backed by
[no-malformed-summary]
- * Start the conformance fixture on an ephemeral loopback port.
+ * Starts the conformance fixture on an ephemeral loopback port.
[no-malformed-summary]
- * Read the runner build the package manifest pins.
+ * Reads the runner build the package manifest pins.
[no-malformed-summary]
- * Resolve the installed runner's entry module.
+ * Resolves the installed runner's entry module.
[no-malformed-summary]
- * Invoke the installed conformance runner and collect everything it wrote.
+ * Invokes the installed conformance runner and collects everything it wrote.
[no-malformed-summary]
- * Parse the runner's `=== SUMMARY ===` block.
+ * Parses the runner's `=== SUMMARY ===` block.
[no-malformed-summary]
- * Drive the pinned runner's whole `server` scenario set at {@link CONFORMANCE_SPEC} against
+ * Drives the pinned runner's whole `server` scenario set at {@link CONFORMANCE_SPEC} against
[no-malformed-summary]
- * Compose the command the runner spawns as the client under test.
+ * Composes the command the runner spawns as the client under test.
[no-malformed-summary]
- * Read every client scenario name out of the runner's own `list` output.
+ * Reads every client scenario name out of the runner's own `list` output.
[no-malformed-summary]
- * Parse the runner's per-scenario result block from one client-mode run.
+ * Parses the runner's per-scenario result block from one client-mode run.
[no-malformed-summary]
- * Drive this package's own client through every scenario in
+ * Drives this package's own client through every scenario in
```

#### tests/setupGlobal.ts

```text
[no-malformed-summary]
- /** The runnable export loaded into the fixture's isolated Node-side Vite graph. */
+ /** Describes the runnable export loaded into the fixture's isolated Node-side Vite graph. */
[no-malformed-summary]
- /** Narrow the isolated fixture module before invoking its setup export. */
+ /** Narrows the isolated fixture module before invoking its setup export. */
[no-malformed-summary]
- * Start the external Node fixture before Chromium receives the browser test graph.
+ * Starts the external Node fixture before Chromium receives the browser test graph.
```

#### tests/setupServer.ts

```text
[no-banned-term]
- bound base URL (e.g. `http://127.0.0.1:<port>`)
+ bound base URL (for example `http://127.0.0.1:<port>`)
[no-banned-term]
- The endpoint path to upgrade (e.g. `/mcp`)
+ The endpoint path to upgrade (for example `/mcp`)
[no-banned-term]
- // nothing — just free the client end and report the claim.
+ // nothing — free the client end and report the claim.
[no-malformed-summary]
- * Find the imports Guide surfaces from a projected fence
+ * Finds the imports Guide surfaces from a projected fence
[no-malformed-summary]
- * A structural guard narrowing an `unknown` stub to {@link
+ * Narrows an `unknown` stub structurally to {@link
[no-malformed-summary]
- * Build a minimal `node:http`-shaped request stub
+ * Builds a minimal `node:http`-shaped request stub
[no-malformed-summary]
- /** Which fault a {@link createStreamStub} stream raises, if any. */
+ /** Selects which fault a {@link createStreamStub} stream raises, if any. */
[no-malformed-summary]
- /** A real {@link StreamInterface} that also reports what was written and whether it ended. */
+ /** Reports what was written to a real {@link StreamInterface} and whether it ended. */
[no-malformed-summary]
- * Build a real SSE {@link StreamInterface} whose
+ * Builds a real SSE {@link StreamInterface} whose
[no-malformed-summary]
- * Create a cross-wired in-memory `node:stream` Duplex PAIR
+ * Creates a cross-wired in-memory `node:stream` Duplex PAIR
[no-malformed-summary]
- * Resolve on the socket pair's next tick or two
+ * Resolves on the socket pair's next tick or two
[no-malformed-summary]
- * Collect a {@link duplexPair} client end's incoming frames
+ * Collects a {@link duplexPair} client end's incoming frames
[no-malformed-summary]
- /** A raw client socket held open against a real server's WebSocket endpoint. */
+ /** Holds a raw client socket open against a real server's WebSocket endpoint. */
[no-malformed-summary]
- * Open a raw RFC 6455 client socket against a real server and decode what it sends back —
+ * Opens a raw RFC 6455 client socket against a real server and decodes what it sends back —
[no-malformed-summary]
- /** A started test server — its bound `base` URL plus the `ServerInterface`. */
+ /** Pairs a started test server's bound `base` URL with its `ServerInterface`. */
[no-malformed-summary]
- * Start a `ServerInterface` on an ephemeral port and resolve its bound base URL — the
+ * Starts a `ServerInterface` on an ephemeral port and resolves its bound base URL — the
[no-malformed-summary]
- * A test resource released through {@link closeResource}:
+ * Names a test resource released through {@link closeResource}:
[no-malformed-summary]
- * Release one {@link TestResource} from a suite
+ * Releases one {@link TestResource} from a suite
[no-malformed-summary]
- /** The outcome of an {@link upgradeRequest} — whether the server claimed the upgrade. */
+ /** Reports the outcome of an {@link upgradeRequest} — whether the server claimed the upgrade. */
[no-malformed-summary]
- * Create a middleware that advances a manual clock
+ * Creates a middleware that advances a manual clock
[no-malformed-summary]
- * Create a middleware that holds every request open
+ * Creates a middleware that holds every request open
[no-malformed-summary]
- /** A raw upgrade peer — how many sockets it accepted, and how many are still open. */
+ /** Counts a raw upgrade peer's sockets — how many it accepted, and how many are still open. */
[no-malformed-summary]
- /** How a {@link startUpgradeServer} peer answers each upgrade. */
+ /** Decides how a {@link startUpgradeServer} peer answers each upgrade. */
[no-malformed-summary]
- * Start a raw `node:http` peer that completes real
+ * Starts a raw `node:http` peer that completes real
```

#### tests/src/core/MCPClient.test.ts

```text
[no-banned-term]
- // the peer is currently parking — a `close.hold`-suspended `close()`
+ // the peer is parking — a `close.hold`-suspended `close()`
[no-banned-term]
- // it currently has OPEN.
+ // it has OPEN.
[no-banned-term]
- the claim it restores is owed just the same.
+ the claim it restores is owed equally.
[no-banned-term]
- every receiver obligation is SHOULD/MAY and the spec says
+ every receiver obligation is `SHOULD`/`MAY` and the spec says
```

#### tests/src/core/MCPServer.test.ts

```text
[no-banned-term]
- // SHOULD send the empty `subscriptions/listen` RESULT
+ // `SHOULD` send the empty `subscriptions/listen` RESULT
[no-banned-term]
- the port simply cannot recover
+ the port cannot recover
[no-banned-term]
- ABSENT passes just as loudly when
+ ABSENT passes as loudly when
[no-banned-term]
- read the code would pass just as well with
+ read the code would pass as well with
[no-banned-term]
- `taskId` this server just handed out
+ `taskId` this server handed out
```

#### tests/src/core/parsers.test.ts

```text
[no-banned-term]
- A row that simply omitted several would pass
+ A row that omitted several would pass
```

#### tests/src/server/factories.test.ts

```text
[no-banned-term]
- (decoded with the core SSEParser via
+ (decoded with the core SSEParser through
[no-banned-term]
- policy composes ahead of it, via the spine's OWN `use`, no
+ policy composes ahead of it, through the spine's OWN `use`, no
[no-banned-term]
- dependency) — just enough to prove the transport composes auth IN FRONT rather than
+ dependency) — enough to prove the transport composes auth IN FRONT rather than
```

#### tests/src/server/integration.test.ts

```text
[no-banned-term]
- (`streaming: true`, decoded via the core SSEParser inside the transport)
+ (`streaming: true`, decoded through the core SSEParser inside the transport)
[no-banned-term]
- pointed at it via the HTTP client transport.
+ pointed at it through the HTTP client transport.
[no-banned-term]
- dependency) — just enough to prove the transport composes auth IN FRONT rather than
+ dependency) — enough to prove the transport composes auth IN FRONT rather than
[no-banned-term]
- the transport decodes it via the core SSEParser.
+ the transport decodes it through the core SSEParser.
```

#### tests/src/server/middlewares.test.ts

```text
[no-banned-term]
- // Composed via `server.use(createMCPSession())` IN FRONT of a session-AGNOSTIC
+ // Composed through `server.use(createMCPSession())` IN FRONT of a session-AGNOSTIC
[no-banned-term]
- + a REAL `MCPServer` via
+ + a REAL `MCPServer` through
[no-banned-term]
- (a server-side push ARRIVES decoded via
+ (a server-side push ARRIVES decoded through
[no-banned-term]
- on the open stream decoded via the core `SSEParser`
+ on the open stream decoded through the core `SSEParser`
[no-banned-term]
- request for the id the server just advertised is swept
+ request for the id the server advertised is swept
[no-banned-term]
- Gone from the STORE, not just refused by resolution:
+ Gone from the STORE, not merely refused by resolution:
```

