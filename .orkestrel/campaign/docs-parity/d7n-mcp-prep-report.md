# Report — P.1 `d7n-mcp-prep`

Every item landed and every criterion reads as the brief expected. No deviation.

Checkout `/home/user/fleet/mcp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip
`9096437` (clean at start). Wall clock, first command to last: 2026-09-07T16:44:53Z to
2026-09-07T16:59:23Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 40 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

The vendored set is byte-identical to the tip's `dist/host` copies after this unit's `npm run format`
(`cmp` over `configs/policy.ts`, `configs/helpers.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`: same). `package.json` carries the `docs` script row; `tsconfig.json` carries
the own-specifier `paths` entries.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 618f4bb..dc8150c 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -358,7 +358,7 @@ describe('public package faces', () => {
 			extractFenceImports("import { createMCPRoutes /* server face */ } from '@orkestrel/mcp'"),
 		).toEqual([{ specifier: '@orkestrel/mcp', names: [] }])
 		// Inside the brace, carrying its own `}`, and outside it in positions the raw
-		// reading admits only as whitespace: the whole statement is lost, not just the binding.
+		// reading admits only as whitespace: the whole statement is lost, not the binding alone.
 		for (const fence of [
 			"import { createMCPRoutes /* } */ } from '@orkestrel/mcp'",
 			"import /* server face */ { createMCPRoutes } from '@orkestrel/mcp'",
@@ -620,21 +620,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -649,22 +655,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

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
off-limits file. Rulings I decided and record:

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

### The prose sweep's hits in `guides/**`

`npm run test:policy` after item 1 reported the brief's list exactly, every `prose` row in
`guides/mcp.md` at lines 605, 1132, 1293, 4452, 4457, 4469, 4470, 4474, 4481, 4508, 4509, 4593, and
5447, and no row in `README.md`. Each was fixed at its own line and nothing else in that file changed
(`git diff --stat -- guides/mcp.md` reads `26 +++++++++++++-------------`). Before and after:

```text
- SHOULD still accept from an older peer.
+ `SHOULD` still accept from an older peer.
- revision says a server SHOULD carry its identity in a result's `_meta`
+ revision says a server `SHOULD` carry its identity in a result's `_meta`
- they check the CALENDAR, not just the shape:
+ they check the CALENDAR, not the shape alone:
- a `Mcp-Param-*` `HeaderMismatch` — a declared SHOULD
+ a `Mcp-Param-*` `HeaderMismatch` — a declared `SHOULD`
- says a client receiving `HeaderMismatch` SHOULD re-list and retry
+ says a client receiving `HeaderMismatch` `SHOULD` re-list and retry
- is refused, not re-requested — a declared SHOULD departure.**
+ is refused, not re-requested — a declared `SHOULD` departure.**
- finds requested information missing on a retry SHOULD answer a
+ finds requested information missing on a retry `SHOULD` answer a
- carrier it just declined to trust,
+ carrier it declined to trust,
- scenarios check a SHOULD, so a refusal reports WARNING
+ scenarios check a `SHOULD`, so a refusal reports WARNING
- signal-first, not stdin-first — a declared SHOULD
+ signal-first, not stdin-first — a declared `SHOULD`
- The stdio page says a client SHOULD close the child's
+ The stdio page says a client `SHOULD` close the child's
- server SHOULD send the EMPTY `subscriptions/listen` result
+ server `SHOULD` send the EMPTY `subscriptions/listen` result
- the pre-`2026-07-28` spelling a client SHOULD
+ the pre-`2026-07-28` spelling a client `SHOULD`
```

## Item 4 — the bump

```diff
diff --git a/package.json b/package.json
index 105699d..e57fddd 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
 	"name": "@orkestrel/mcp",
-	"version": "0.0.28",
+	"version": "0.0.29",
 	"description": "A typed Model Context Protocol client/server with pluggable HTTP, WebSocket, and stdio transports. Part of the @orkestrel line.",
 	"keywords": [
 		"json-rpc",
@@ -92,7 +92,8 @@
 		"prepack": "npm run build",
 		"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release",
 		"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe",
-		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"
+		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
+		"docs": "node --experimental-strip-types scripts/docs.ts"
 	},
 	"dependencies": {
 		"@orkestrel/codec": "^0.0.2",
```

`package-lock.json` is untouched.

## Criteria

**1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3
edited, and nothing else.**

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/mcp.md
 M package.json
 M src/browser/factories.ts
 M src/browser/transports/WebSocketClientTransport.ts
 M src/core/MCPClient.ts
 M src/core/MCPServer.ts
 M src/core/MCPTextStreamController.ts
 M src/core/types.ts
 M src/server/HTTPDisconnect.ts
 M src/server/handlers.ts
 M tests/config.test.ts
 M tests/conformance.test.ts
 M tests/conformanceClient.ts
 M tests/fixtures/browserServer.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.ts
 M tests/setupGlobal.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/integration.test.ts
 M tests/src/server/middlewares.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

Accounting: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, and the
untracked `scripts/docs.ts` are item 1's; `tests/guides.test.ts` is item 2's (and carries one
`no-banned-term` fix); `guides/mcp.md` plus every file in item 3's table are item 3's; `package.json`
also carries item 4's bump. Nothing else appears.

**2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check`
exit 0.**

```text
$ npm run format:check
All matched files use the correct format.
Finished in 4546ms on 127 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core && npm run check:src:browser && npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.browser.json
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT 0
```

**3. `npm run test:guides`, `npm run test:policy`, and `npm run test:config` exit 0.**

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  160 passed (160)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

P21's `test:guides` failures were the record shapes alone: after item 2 the whole file passes, and its
`Tests` line reads `160 passed (160)` against P21's `65 failed | 95 passed (160)`.

**4. `npm run docs` reads a non-zero `rows read` and exits 1.**

Its closing line, and the exit code:

```text
rows read: 1, disagreements found: 458
EXIT 1
```

The worklist follows verbatim, every line it printed.

## The `docs` worklist, verbatim

```text

> @orkestrel/mcp@0.0.29 docs
> node --experimental-strip-types scripts/docs.ts

guides/mcp.md class MCPServer: guide absent source "Dispatches JSON-RPC 2.0 requests over a live `ToolManagerInterface`, with NO transport coupling."
guides/mcp.md function createMCPServer: guide "Create an `MCPServerInterface` exposing tools plus optional signed MRTR input and event-driven subscription mechanisms over JSON-RPC 2.0." source "Creates a transport-agnostic Model Context Protocol server — exposes a live `ToolManagerInterface` and an optional `MCPResourceManagerInterface`, `MCPPromptManagerInterface`, and `MCPCompletionInterface` over JSON-RPC 2.0."
guides/mcp.md function createMCPLegacy: guide "Decorate one `MCPServerInterface` with the legacy method translation — the ONE call that adds `2025-11-25` / `2025-06-18` support, and the one deleting it removes." source "Decorates one MCP server with the fixed legacy method translation."
guides/mcp.md function createMCPClient: guide "Create an `MCPClientInterface` that drives a REMOTE server over an injected transport and exposes its tools as local `ToolInterface`s." source "Creates a transport-agnostic Model Context Protocol CLIENT — connects to a REMOTE MCP server over an injected `MCPMessageTransportInterface`, negotiates the modern revision through `server/discover`, and exposes the server's tools as local `ToolInterface`s an agent can run."
guides/mcp.md function createMCPLegacyClientTransport: guide "Decorate one `MCPMessageTransportInterface` with the legacy handshake and era translation while retaining a modern client surface." source "Decorates one client transport with explicit legacy handshake and era translation."
guides/mcp.md function createDuplexClientTransport: guide "Adapt an `MCPTransportInterface` into a `MCPMessageTransportInterface` — the bridge letting `createMCPClient` run over the environment-agnostic duplex port; pair with `bindClient`." source "Adapts an `MCPTransportInterface` (the environment-agnostic duplex message channel) into a `MCPMessageTransportInterface` — the additive bridge that lets `createMCPClient` run over the new port without any change to `MCPClient`'s existing shape."
guides/mcp.md class MCPLegacy: guide "The removable legacy decorator over ONE `MCPDispatcherInterface` — translates the dated revisions onto the modern engine and owns none." source "Translates the fixed legacy method set onto one modern dispatcher."
guides/mcp.md class MCPLegacyClientTransport: guide "The explicit legacy decorator over ONE `MCPMessageTransportInterface` — handshakes with the peer and presents modern discovery and results to `MCPClient`." source "Adapts a legacy MCP peer to the modern client transport boundary."
guides/mcp.md class MCPMethodManager: guide "The modern method registry `MCPServer` registers its built-ins on and resolves every modern method from — `add` + `method`." source "Holds the modern methods an `MCPServerInterface` dispatches through — a name-keyed store of `MCPMethodHandler`s that owns its map rather than exposing one."
guides/mcp.md class MCPProgressReporter: guide "One request-scoped, single-slot progress handoff with backpressure between one producer and one serial consumer." source "Hands bounded, request-scoped progress from one producer to one serial consumer. The reporter holds at most one owned progress item. `report` applies backpressure until `take` consumes that slot. It has no replay, queue, concurrent-consumer coordination, task state, or durable-work semantics; stopping or aborting the request discards the slot and rejects pending work."
guides/mcp.md class MCPStreamController: guide "The one cancellation engine every held-open answer leaves `dispatch` through — one pending source read, prompt closure, contained late promises." source "Provides the one cancellation engine every modern held-open result leaves `MCPServer` through."
guides/mcp.md class MCPTextStreamController: guide "The serialized mirror of a controlled stream — translation only, delegating every lifecycle decision into the typed exchange beneath it." source "Mirrors a controlled held-open result at the string boundary — the same exchange, already serialized."
guides/mcp.md class MCPClient: guide "The transport-agnostic modern JSON-RPC client over a `MCPMessageTransportInterface` — discover once, then `discover` / `tools` / `call`." source "Connects to a REMOTE MCP server over any injected `MCPMessageTransportInterface`, negotiates the modern revision, and exposes the server's tools as local `ToolInterface`s an agent can run."
guides/mcp.md class MCPTaskClient: guide "The stable Tasks extension's client half over one correlated-request door — `task` / `update` / `abort`, no plural accessor and no schedule." source "Issues the `tasks/*` methods over one correlated-request door — the CLIENT half of the stable Tasks extension, exposed as an `MCPClientInterface`'s `tasks`."
guides/mcp.md class HTTPClientTransport: guide "The host-independent HTTP `MCPMessageTransportInterface` over an injectable `fetch` — POSTs each message, decodes the JSON or SSE reply onto the `message` event, and rejects a non-success reply carrying no message. Both environment faces' `createHTTPClientTransport` return it." source "Drives a REMOTE Streamable-HTTP MCP server over `fetch` — a CLIENT `MCPMessageTransportInterface` for the Model Context Protocol, the egress mirror of the server's `createMCPRoutes`."
guides/mcp.md class MCPError: guide "A Model Context Protocol error preserving its numeric `code` and optional `context` — a remote JSON-RPC `error.data`, or the locally detected incompatibility's own detail." source "Preserves a Model Context Protocol error's machine-readable numeric code and optional structured context."
guides/mcp.md const MCP_HANDSHAKE_VERSION: guide absent source "Names the revision offered and defaulted to in the legacy `initialize` handshake."
guides/mcp.md const MCP_FALLBACK_VERSION: guide absent source "Names the older legacy revision the optional legacy decorator accepts and an adapter can pin."
guides/mcp.md const MCP_MODERN_VERSION: guide absent source "Names the modern revision offered by an unpinned client during discovery."
guides/mcp.md const SUPPORTED_MODERN_PROTOCOL_VERSIONS: guide absent source "Lists the modern MCP protocol revisions a bare server accepts and advertises."
guides/mcp.md const SUPPORTED_LEGACY_PROTOCOL_VERSIONS: guide absent source "Lists the protocol revisions accepted by the optional legacy decorator."
guides/mcp.md const SUPPORTED_MCP_VERSIONS: guide absent source "Lists the protocol revisions the `isMCPVersion` guard admits, spanning the modern and legacy eras."
guides/mcp.md const MCP_META_VERSION: guide absent source "Names the reserved modern `_meta` key carrying the request's protocol revision."
guides/mcp.md const MCP_META_CAPABILITIES: guide absent source "Names the reserved modern `_meta` key carrying the client's open capability record."
guides/mcp.md const MCP_META_CLIENT: guide absent source "Names the reserved modern `_meta` key carrying the optional client identity."
guides/mcp.md const MCP_META_SERVER: guide absent source "Names the reserved modern `_meta` key carrying the server identity on results."
guides/mcp.md const MCP_META_SUBSCRIPTION: guide absent source "Names the reserved modern `_meta` key carrying a `subscriptions/listen` request id."
guides/mcp.md const MCP_EXTENSION_TASKS: guide absent source "Names the reserved extension key identifying the stable Tasks extension."
guides/mcp.md const MCP_SENTINEL_PREFIX: guide absent source "Names the opening marker of the Base64 sentinel a standard MCP header value travels in."
guides/mcp.md const MCP_SENTINEL_SUFFIX: guide absent source "Names the closing marker of the Base64 sentinel a standard MCP header value travels in."
guides/mcp.md const MCP_PARAM_PREFIX: guide absent source "Names the request-header prefix an `x-mcp-header` annotation projects a tool argument onto."
guides/mcp.md const MCP_HEADER_ANNOTATION: guide absent source "Identifies the tool-schema annotation key naming the header one parameter projects into."
guides/mcp.md const MCP_LOOKUP_PAGES: guide absent source "Bounds the `tools/list` pages one modern `tools/call` walks to reach its own annotations."
guides/mcp.md const MCP_HEADER_MISMATCH: guide absent source "Names the MCP reserved error for required HTTP metadata that does not match the request body."
guides/mcp.md const MCP_MISSING_CAPABILITY: guide absent source "Names the MCP reserved error for an operation needing a client capability that was not declared."
guides/mcp.md const MCP_UNSUPPORTED_VERSION: guide absent source "Names the MCP reserved error for a request naming an unsupported protocol revision."
guides/mcp.md const DEFAULT_MCP_CACHE_TTL: guide absent source "Sets the default modern result freshness lifetime in milliseconds."
guides/mcp.md const DEFAULT_MCP_LIMITS: guide absent source "Sets the secure server bounds used when the matching `limit` option leaf is absent or malformed."
guides/mcp.md const EMPTY_MCP_ARGUMENTS: guide absent source "Holds the one empty argument record every argument-less modern `tools/call` runs with."
guides/mcp.md const JSONRPC_PARSE_ERROR: guide absent source "Names the JSON-RPC 2.0 reserved error for invalid JSON received (the message did not parse)."
guides/mcp.md const JSONRPC_INVALID_REQUEST: guide absent source "Names the JSON-RPC 2.0 reserved error for a payload that was not a valid Request object."
guides/mcp.md const JSONRPC_METHOD_NOT_FOUND: guide absent source "Names the JSON-RPC 2.0 reserved error for a requested method that does not exist."
guides/mcp.md const JSONRPC_INVALID_PARAMS: guide absent source "Names the JSON-RPC 2.0 reserved error for a method's invalid parameters."
guides/mcp.md const JSONRPC_INTERNAL_ERROR: guide absent source "Names the JSON-RPC 2.0 reserved error for a server that failed while handling an otherwise valid request."
guides/mcp.md const JSONRPC_SERVER_ERROR: guide absent source "Names the JSON-RPC 2.0 implementation-defined server error (the `-32000` to `-32099` range)."
guides/mcp.md const DEFAULT_MCP_CLIENT_NAME: guide absent source "Supplies the default client name reported in the MCP `initialize` handshake (`clientInfo.name`)."
guides/mcp.md const DEFAULT_MCP_CLIENT_VERSION: guide absent source "Supplies the default client version reported in the MCP `initialize` handshake (`clientInfo.version`)."
guides/mcp.md const DEFAULT_MCP_REQUEST_TIMEOUT: guide absent source "Sets the default per-request deadline (ms) an `MCPClient` applies when `options.timeout` is unset — a request the remote server does not answer within it rejects."
guides/mcp.md const DEFAULT_MCP_SUBSCRIPTION_CAPACITY: guide absent source "Sets the default number of subscription frames retained while no client read is parked."
guides/mcp.md const MCP_SESSION_HEADER: guide absent source "Names the Streamable-HTTP transport header that carries the MCP session id."
guides/mcp.md const MCP_PROTOCOL_VERSION_HEADER: guide absent source "Names the Streamable-HTTP transport header carrying the MCP protocol version."
guides/mcp.md const MCP_METHOD_HEADER: guide absent source "Names the modern Streamable-HTTP request header carrying the JSON-RPC method."
guides/mcp.md const MCP_NAME_HEADER: guide absent source "Names the modern Streamable-HTTP request header carrying a named target."
guides/mcp.md const MCP_WEBSOCKET_SUBPROTOCOL: guide absent source "Names the WebSocket subprotocol `createWebSocketClientTransport` requests by default — `'mcp'`, which `createWebSocketServer` selects when the client offers it. Per RFC 6455 §4.1 a client MUST fail the connection if the server returns a subprotocol it did not request; Node ≥ 22 (undici) enforces this strictly, so the default bakes the correct value in. Override `WebSocketClientTransportOptions.protocols` only when connecting to a foreign server that speaks a different subprotocol (or `[]` for no subprotocol negotiation at all)."
guides/mcp.md function isJSONRPCId: guide "Total guard: a JSON-RPC correlation id — a string or a finite integer; `undefined` and `null` are both refused." source "Determines whether a value is a valid JSON-RPC correlation id — a string or a finite integer."
guides/mcp.md function isBoundedString: guide "Total guard for a string within a UTF-8 byte bound." source "Determines whether a value is a string within a UTF-8 byte bound."
guides/mcp.md function isBoundedJSON: guide "Total iterative exact-JSON guard within byte/key/depth bounds; hostile-looking own keys remain data." source "Determines whether a value is bounded, cycle-free exact JSON."
guides/mcp.md function isJSONObject: guide "Total guard for an exact finite JSON object." source "Determines whether a value is an exact finite JSON object."
guides/mcp.md function isMCPMetaKey: guide "Total guard for the dated optional-prefix MCP metadata-key grammar." source "Determines whether a string follows the dated MCP `_meta` key grammar."
guides/mcp.md function isMCPMetaObject: guide "Total guard for exact finite MCP metadata with valid keys." source "Determines whether a value is exact finite MCP metadata with valid keys."
guides/mcp.md function isMCPResultMetaObject: guide "Total result-metadata guard enforcing the reserved server identity while retaining open valid keys." source "Determines whether a value is exact result metadata with a valid reserved server identity."
guides/mcp.md function isMCPNotificationMetaObject: guide "Total notification-metadata guard: exact metadata whose reserved `io.modelcontextprotocol/subscriptionId`, when present, is a valid `JSONRPCId`; an unstamped frame carries none and passes." source "Determines whether a value is exact notification metadata with a valid reserved subscription id."
guides/mcp.md function isMCPLoggingLevel: guide "Total guard for the dated logging-level literals." source "Determines whether a value is one dated MCP logging level."
guides/mcp.md function isMCPIdentity: guide "Total guard for a complete dated implementation identity." source "Determines whether a value is one complete dated MCP implementation identity."
guides/mcp.md function isMCPClientCapabilities: guide "Total guard for exact open dated client capabilities and prefixed extensions." source "Determines whether a value is one exact open dated client-capability declaration."
guides/mcp.md function isMCPServerCapabilities: guide "Total guard for exact open dated server capabilities and prefixed extensions." source "Determines whether a value is one exact open dated server-capability declaration."
guides/mcp.md function isMCPAnnotations: guide "Total guard for dated-schema audience, priority, and last-modified content annotations." source "Determines whether a value carries valid dated-schema MCP content annotations."
guides/mcp.md function isMCPIcon: guide "Total guard for one dated-schema sized and themed icon." source "Determines whether a value is one exact dated-schema MCP icon."
guides/mcp.md function isMCPTextResource: guide "Total guard for embedded textual resource contents." source "Determines whether a value is embedded textual MCP resource contents."
guides/mcp.md function isMCPBlobResource: guide "Total guard for embedded base64 blob resource contents." source "Determines whether a value is embedded blob MCP resource contents."
guides/mcp.md function isMCPContent: guide "Total guard for the complete dated-schema rich-content union." source "Determines whether a value is one exact dated-schema MCP tool content block."
guides/mcp.md function isMCPPaginationParams: guide "Total guard for the shared cursor parameters: a present `cursor` is a string." source "Determines whether a value carries the shared optional pagination cursor."
guides/mcp.md function isMCPResource: guide "Total guard for one `resources/list` descriptor, `uri` checked as an absolute URI." source "Determines whether a value is one `resources/list` descriptor."
guides/mcp.md function isMCPResourceTemplate: guide "Total guard for one resource-template descriptor. It validates the descriptor SHAPE only — the `uriTemplate` is never parsed, and no RFC 6570 level is implied." source "Determines whether a value is one resource-template descriptor."
guides/mcp.md function isMCPResourceContents: guide "Total guard for structurally discriminated read contents: exactly one of `text` and `blob`, never both and never neither." source "Determines whether a value is structurally discriminated resource contents."
guides/mcp.md function isMCPResourcePage: guide "Total guard for one consumer-owned resource page and its optional cursor." source "Determines whether a value is one consumer-owned resource page."
guides/mcp.md function isMCPResourceTemplatePage: guide "Total guard for one consumer-owned resource-template page and its optional cursor." source "Determines whether a value is one consumer-owned resource-template page."
guides/mcp.md function isMCPStringArguments: guide "Total guard: every own value of an argument record is a string, which is what the prompt and completion wire shapes require." source "Determines whether a value is a string-valued MCP argument record."
guides/mcp.md function isMCPPromptArgument: guide "Total guard for one prompt-argument descriptor." source "Determines whether a value is one prompt argument descriptor."
guides/mcp.md function isMCPPrompt: guide "Total guard for one `prompts/list` descriptor and its declared arguments." source "Determines whether a value is one `prompts/list` descriptor."
guides/mcp.md function isMCPPromptMessage: guide "Total guard for one prompt message — a `user` / `assistant` role over the existing rich-content union." source "Determines whether a value is one prompt message with existing rich content."
guides/mcp.md function isMCPPromptPage: guide "Total guard for one consumer-owned prompt page and its optional cursor." source "Determines whether a value is one consumer-owned prompt page."
guides/mcp.md function isMCPPromptGetResult: guide "Total guard for a complete `prompts/get` result and every message in it." source "Determines whether a value is one complete `prompts/get` result."
guides/mcp.md function isMCPCompletionReference: guide "Total guard for the completion reference, discriminated by the wire's `type`." source "Determines whether a value is a prompt or resource-template completion reference."
guides/mcp.md function isMCPCompletionParams: guide "Total guard for one `completion/complete` parameter object, including its optional string-valued context." source "Determines whether a value is one `completion/complete` parameter object."
guides/mcp.md function isMCPCompletion: guide "Total guard for one host-produced candidate set — string values, a nonnegative integer `total`, a boolean `hasMore`." source "Determines whether a value is one host-produced completion candidate set."
guides/mcp.md function isMCPCompletionResult: guide "Total guard for the stamped completion result, ENFORCING the 100-value cap, so it recognizes only a result this server would produce." source "Determines whether a value is one complete, capped `completion/complete` result."
guides/mcp.md function isMCPCallResult: guide "Total guard for a required complete modern tool result and exact JSON structured content." source "Determines whether a value is a complete modern MCP tool result."
guides/mcp.md function isMCPProgress: guide "Total guard for the finite dated-schema progress payload." source "Determines whether a value is one exact finite MCP progress payload."
guides/mcp.md function isStandardBase64: guide "Total guard for standard padded JSON Schema `byte` values." source "Determines whether a value is standard padded base64 as required by JSON Schema `byte` format."
guides/mcp.md function isAbsoluteURI: guide "Total host-neutral RFC 3986 URI syntax guard; it does not normalize, resolve, fetch, or decode." source "Determines whether a value is one absolute URI under RFC 3986 syntax."
guides/mcp.md function isRFC3339Date: guide "Total guard for an RFC 3339 `full-date` naming a day that exists, month lengths and the Gregorian leap rule included." source "Determines whether a value is one RFC 3339 `full-date` naming a real calendar day."
guides/mcp.md function isRFC3339DateTime: guide "Total guard for an RFC 3339 `date-time` — the same calendar check, the `T` separator, and a mandatory `Z` or `±HH:MM` offset." source "Determines whether a value is one RFC 3339 `date-time` naming a real calendar day."
guides/mcp.md function isJSONRPCRequest: guide "Total guard: `jsonrpc: '2.0'` + a string `method` + an `id` — an id-less call is a notification, not a request." source "Determines whether a parsed value is a `JSONRPCRequest`."
guides/mcp.md function isJSONRPCNotification: guide "Total guard: the same call owning NO `id` member; mutually exclusive with `isJSONRPCRequest` on every input." source "Determines whether a parsed value is a `JSONRPCNotification`."
guides/mcp.md function isJSONRPCInvocation: guide "Total guard — the union of `isJSONRPCRequest` and `isJSONRPCNotification`, so a positive answer names one arm." source "Determines whether a parsed value is a `JSONRPCInvocation` — a request or a notification."
guides/mcp.md function isJSONRPCResultResponse: guide "Total guard: the success arm — a required `id`, an OBJECT `result`, and no `error` member." source "Determines whether a parsed value is a `JSONRPCResultResponse` — the success arm of a response."
guides/mcp.md function isJSONRPCError: guide "Total structural guard for the `error` MEMBER — an integer `code` and a string `message`; `data` stays `unknown`." source "Determines whether a value is one JSON-RPC `error` member."
guides/mcp.md function isJSONRPCErrorResponse: guide "Total guard: the failure arm — an OPTIONAL `id` (absent, never `null`), an `error` with integer `code` and string `message`, and no `result`." source "Determines whether a parsed value is a `JSONRPCErrorResponse` — the failure arm of a response."
guides/mcp.md function isJSONRPCResponse: guide "Total guard — the union of the mutually exclusive response arms." source "Determines whether a parsed value is a `JSONRPCResponse`."
guides/mcp.md function isJSONRPCMessage: guide "Total guard — the union of `isJSONRPCInvocation` and `isJSONRPCResponse`." source "Determines whether a parsed value is a `JSONRPCMessage` — an invocation or a response."
guides/mcp.md function isMCPResult: guide "Total guard for the open modern result contract: a record with a string `resultType` and, when present, exact result metadata." source "Determines whether a value is one modern MCP result."
guides/mcp.md function isMCPLegacyResult: guide "Total guard for the legacy arm: a record with NO `resultType`; mutually exclusive with `isMCPResult`." source "Determines whether a value is one legacy-era MCP result."
guides/mcp.md function isInitializeRequest: guide "Total guard — a `JSONRPCInvocation` whose `method` is `'initialize'`." source "Determines whether a parsed value is an MCP `initialize` invocation."
guides/mcp.md function isMCPVersion: guide "Total guard — narrows a string to a supported `MCPVersion`." source "Determines whether a value is a supported `MCPVersion`."
guides/mcp.md function isMCPSubscriptionFilter: guide "Total guard — validates the recognized wire fields of an open modern subscription filter." source "Determines whether a value is an MCP `MCPSubscriptionFilter`."
guides/mcp.md function isMCPSubscriptionResult: guide "Total guard — a complete result carrying a valid reserved subscription id; the graceful terminal `listen` returns." source "Determines whether a value is a graceful `subscriptions/listen` result."
guides/mcp.md function supportsFormElicitation: guide "Determines whether client capabilities authorize form elicitation; an empty `elicitation` object means form-only." source "Determines whether a client capability record declares form-mode elicitation."
guides/mcp.md function isMCPElicitFieldSchema: guide "Total guard for one restricted single-field form-elicitation schema." source "Determines whether a value is one restricted primitive form-elicitation schema."
guides/mcp.md function isMCPElicitSchema: guide "Total guard for the restricted issued object schema, open to unrecognized annotations." source "Determines whether a value is the restricted top-level object schema a form elicitation issues."
guides/mcp.md function isMCPElicitForm: guide "Total guard for restricted form-mode elicitation parameters." source "Determines whether a value is a form-mode elicitation parameter object."
guides/mcp.md function isMCPElicitURL: guide "Total guard for URL-mode elicitation parameters." source "Determines whether a value is a URL-mode elicitation parameter object."
guides/mcp.md function isMCPElicitRequest: guide "Total guard for an embedded `elicitation/create` request." source "Determines whether a value is an embedded `elicitation/create` request."
guides/mcp.md function isMCPInputRequest: guide "Total guard for one legal embedded elicitation, sampling, or roots request; the sampling and roots arms keep open parameter records because the dated schema leaves those bodies to the caller." source "Determines whether a value is one legal embedded multi-round-trip request."
guides/mcp.md function isMCPInputRequestMap: guide "Total guard for the consumer-keyed input-request map." source "Determines whether a value is a consumer-keyed map of embedded input requests."
guides/mcp.md function isMCPRoot: guide "Total guard for one filesystem root a client exposes; `uri` carries the schema’s `format: uri`, so a relative reference is refused." source "Determines whether a value is one filesystem root a client exposes."
guides/mcp.md function isMCPRootResult: guide "Total guard for the client answer to an embedded `roots/list` request." source "Determines whether a value is one client answer to an embedded `roots/list` request."
guides/mcp.md function isMCPSampleContent: guide "Total guard for one sampling content block — text, image, audio, `tool_use`, or `tool_result`; the resource arms of `isMCPContent` are outside the union." source "Determines whether a value is one block a sampling completion may carry."
guides/mcp.md function isMCPSampleResult: guide "Total guard for the client answer to an embedded `sampling/createMessage` request — one `isMCPSampleContent` block or an array of them, plus its model." source "Determines whether a value is one client answer to an embedded sampling request."
guides/mcp.md function isMCPElicitResult: guide "Total guard for an elicitation action and its optional primitive form content." source "Determines whether a value is one elicitation response."
guides/mcp.md function isElicitContent: guide "Total guard checking accepted content against the EXACT issued schema; undeclared properties stay valid, an unenforceable schema admits nothing." source "Determines whether accepted elicitation content satisfies the exact schema that was issued."
guides/mcp.md function isMCPInputResponse: guide "Total guard checking one client answer against the EXACT request that was issued under its key; an unrecognized request admits nothing." source "Determines whether a response answers the exact embedded request that was issued."
guides/mcp.md function isMCPInputResult: guide "Total guard for `input_required`, including the runtime at-least-one-of rule." source "Determines whether a value is an MCP input-required result."
guides/mcp.md function computeMissingCapabilities: guide "Compute the `requiredCapabilities` record naming what a round needs and the client did not declare, or `undefined` when it declared every kind." source "Computes the capabilities one round of input requests needs and the client did not declare."
guides/mcp.md function supportsTask: guide "Determines whether client capabilities declare the stable Tasks extension; the extension id under `extensions` must carry the schema's exactly-empty object." source "Determines whether a client capability record declares the stable Tasks extension."
guides/mcp.md function isMCPTaskStatus: guide "Total guard for the extension's task lifecycle states." source "Determines whether a value is one of the extension's task lifecycle states."
guides/mcp.md function isMCPTaskResult: guide "Total guard for the flat `resultType: 'task'` creation answer, `ttlMs: null` included." source "Determines whether a value is a modern MCP task-creation result."
guides/mcp.md function isMCPTaskDetail: guide "Total guard for one task snapshot, enforcing the payload its `status` owes; unrecognized members stay valid." source "Determines whether a value is one durable task's full snapshot."
guides/mcp.md function isMCPTaskDetailResult: guide "Total guard for a `tasks/get` REPLY — one snapshot under the required `resultType: 'complete'`; an unstamped payload and the creation answer's `resultType: 'task'` are both refused." source "Determines whether a value is the wire answer to `tasks/get`."
guides/mcp.md function isMCPTaskNotification: guide "Total admission guard for a `notifications/tasks` frame — the method literal plus flat params holding together as an `MCPTaskDetail`; `_meta` is checked for shape only when present." source "Determines whether a value is a `notifications/tasks` frame carrying a task snapshot."
guides/mcp.md function isModernRequest: guide "Total guard — modern iff `params._meta` carries the reserved protocol-version key." source "Determines whether a JSON-RPC invocation uses the modern per-request MCP wire shape."
guides/mcp.md function isMCPModernVersion: guide "Total guard for a revision the bare modern server accepts and advertises." source "Determines whether a value is a modern protocol revision accepted by a bare server."
guides/mcp.md function isMCPLegacyVersion: guide "Total guard for a revision the optional legacy decorator accepts during initialize." source "Determines whether a value is a revision accepted by the optional legacy decorator."
guides/mcp.md function isMCPError: guide "Total guard — `true` only for a real `MCPError`." source "Determines whether an unknown value is an `MCPError`."
guides/mcp.md function parseJSONRPCMessage: guide "Return a bounded frozen owned `JSONRPCMessage`, or `undefined`; optional limits override the content-byte/default-depth boundary." source "Narrows an already-parsed value to a `JSONRPCMessage`, or `undefined` when it is not one."
guides/mcp.md function parseRequestContext: guide "Return a frozen owned modern request projection, or `undefined` for malformed required metadata." source "Parses the reserved modern request metadata into an `MCPRequestContext`."
guides/mcp.md function parseMCPInputState: guide "Parse opened request state into its principal/expiry/original-id/version/method/tool/digest/requests/application bindings." source "Parses the opened value carried by an opaque `requestState` continuation."
guides/mcp.md function inferEra: guide "Map a supported revision to `modern` or `legacy`; unsupported revisions return `undefined`." source "Infers the wire era for an MCP protocol revision."
guides/mcp.md function inferVersion: guide "Select the supported modern revision present in a peer's discovery or retry offer; a legacy-only offer returns `undefined`." source "Infers the newest supported modern protocol revision present in a peer's offer."
guides/mcp.md function inferRequestEra: guide "Read the wire era one invocation's own structure selects — the structural read `MCPServer`'s `request` event reports and the HTTP ingress routes on, distinct from `inferEra`'s read of a revision string." source "Infers the wire era one invocation's own structure selects."
guides/mcp.md function inferRequestVersion: guide "Project the protocol version a modern request announces itself with — the ONE derivation the HTTP client transports stamp `mcp-protocol-version` from, and the same read the server's own header expectation performs." source "Infers the protocol version an outbound message announces itself with — the ONE projection every HTTP client transport stamps `mcp-protocol-version` from."
guides/mcp.md function buildJSONRPCResult: guide "Build a success `JSONRPCResultResponse` — the required `id` echoed, the value as `result`." source "Builds a JSON-RPC success `JSONRPCResultResponse` — the `id` echoed, the method's value as `result`."
guides/mcp.md function buildJSONRPCError: guide "Build a `JSONRPCErrorResponse` — a reserved `code` / `message`, optional `data`, and the `id` OMITTED entirely when none could be read." source "Builds a JSON-RPC error `JSONRPCErrorResponse` — the `id` echoed, the failure as an `error` object."
guides/mcp.md function buildMethodOptions: guide "Resolve caller-facing dispatch options into the method options every handler receives, composing the caller's signal with the request lifetime." source "Resolves the caller-facing dispatch options into the options a dispatched method receives."
guides/mcp.md function buildToolDescriptors: guide "Map a `ToolManagerInterface`'s definitions to `tools/list` descriptors, renaming `parameters` → `inputSchema`." source "Maps a `ToolManagerInterface`'s definitions to MCP `tools/list` descriptors — renaming `parameters` to the wire's `inputSchema`."
guides/mcp.md function buildToolCall: guide "Build the canonical `ToolCall` supplied to the default manager or explicit executor." source "Builds the canonical Tool call for one validated MCP `tools/call` request."
guides/mcp.md function buildProgressNotification: guide "Build the official `notifications/progress` message with its original opaque token." source "Builds one official progress notification for the original request stream."
guides/mcp.md function buildCancelledNotification: guide "Build the official `notifications/cancelled` message naming one already-sent request; fire-and-forget, and only for a carrier declaring `duplex`." source "Builds one official cancellation notification for a request already sent."
guides/mcp.md function buildCallOutcome: guide "Narrow one `tools/call` answer to the arm the peer chose, preferring `structuredContent` by presence and throwing a remote `isError: true`." source "Narrows one `tools/call` answer to the arm the peer chose."
guides/mcp.md function extractContentText: guide "Concatenate a result's text content blocks into one string; TOTAL, so an off-shape result contributes nothing rather than throwing." source "Concatenates an MCP tool-call result's text content blocks into one string."
guides/mcp.md function matchesResultType: guide "Tests whether one method may legally answer with a given modern `resultType`; only `tools/call` may answer `task` or `input_required`." source "Determines whether one method may answer with a given modern `resultType`."
guides/mcp.md function snapshotJSON: guide "Own one bounded exact JSON value as a deeply frozen graph paired with its canonical wire text." source "Snapshots one bounded exact JSON value together with its canonical wire serialization. The returned value is an owned, deeply frozen graph reconstructed from the canonical text; the frozen tuple shares no mutable structure with the input. Invalid exact-JSON shapes, hostile reflection, serialization failures, and values outside the byte, key, or depth limits return `undefined`."
guides/mcp.md function snapshotToolResult: guide "Own one exact Tool result, bounding and serializing only a defined successful value." source "Snapshots one exact Tool result and the canonical wire text of a defined success value. A success must have exactly the own enumerable data properties `id`, `name`, `success: true`, and `value`. A failure must instead have exactly `id`, `name`, `success: false`, and a string `error`. The returned result and tuple are frozen. Only a defined success value crosses the bounded JSON ownership seam; it becomes an owned deeply frozen value and receives canonical text. Value-less successes and failures pair with `undefined` text. Non-records, symbol keys, accessors, hidden or extra properties, malformed discriminants or fields, hostile reflection, and unbounded defined success values return `undefined`."
guides/mcp.md function serializeJSON: guide "Canonically serialize exact JSON within explicit byte/key/depth bounds." source "Serializes one exact JSON value deterministically within explicit bounds."
guides/mcp.md function digestJSON: guide "Compute the lowercase host-neutral SHA-256 digest of bounded canonical JSON." source "Computes a lowercase host-neutral SHA-256 digest of one bounded canonical JSON value."
guides/mcp.md function buildDiscoverResult: guide "Build the required modern `server/discover` result with supported revisions and cache stamps." source "Builds the mandatory modern `server/discover` result."
guides/mcp.md function buildModernResult: guide "Stamp a modern result with `resultType`, server metadata, and cache fields only when a TTL is supplied." source "Stamps a result with the modern complete-result discriminator and server metadata, plus cache fields when the result is cacheable."
guides/mcp.md function modernResultToLegacy: guide "Project one complete modern result onto the legacy wire shape; return `undefined` for an arm the dated revision cannot represent." source "Projects one complete modern result onto the legacy wire shape."
guides/mcp.md function legacyResultToModern: guide "Restore one legacy result to the modern complete-result shape, including the server identity and the cache fields required by `tools/list`." source "Restores one legacy result to the modern complete-result shape."
guides/mcp.md function legacyInvocationToModern: guide "Stamp one legacy request with the modern protocol revision and an empty client capability set before modern dispatch." source "Stamps one legacy request for the modern dispatcher."
guides/mcp.md function modernInvocationToLegacy: guide "Remove the reserved modern request metadata before an invocation reaches a legacy peer while preserving other metadata." source "Removes modern request metadata before an invocation reaches a legacy peer."
guides/mcp.md function buildSubscriptionFilter: guide "Intersect requested notification families and resource URIs with the server's declared support; `enabled` set to `true` carries the requested task identifiers through unresolved and unnormalized." source "Intersects a requested subscription filter with the notification families a server supports."
guides/mcp.md function matchesSubscriptionNotification: guide "Test whether a produced notification belongs to an acknowledged subscription filter; a `notifications/tasks` frame must also pass `isMCPTaskNotification` and name an agreed identifier." source "Determines whether a produced notification belongs to an honoured subscription filter."
guides/mcp.md function stampSubscriptionNotification: guide "Stamp a delivered notification with its reserved subscription id while preserving other params and metadata." source "Stamps a subscription notification with the request id reserved for its held-open stream."
guides/mcp.md function buildSubscriptionAcknowledgement: guide "Build the first id-carrying acknowledgement with the exact honoured notification subset." source "Builds the first notification carrying a subscription id for a listen request."
guides/mcp.md function buildSubscriptionResult: guide "Build the graceful complete result carrying the request id as subscription identity." source "Builds the terminating response for a subscription source that closes gracefully."
guides/mcp.md function buildInitializeResult: guide "Build the `initialize` result — the negotiated `protocolVersion`, `capabilities`, and `serverInfo`." source "Builds the MCP `initialize` result — the negotiated protocol version, the advertised capabilities, and the server identity."
guides/mcp.md function decodeBoundedMessage: guide "Decode one raw inbound message within an explicit bound, measuring the string BEFORE parsing it; total." source "Decodes one raw inbound message within an explicit bound — the decode a binder performs before it hands the string on."
guides/mcp.md function deliverMessage: guide "Decode one inbound frame and deliver it onto a transport emitter — `message` for a well-formed `JSONRPCMessage`, `error` carrying the caught parse error for unparsable text, and `error` naming the caller's `fault` for well-formed non-JSON-RPC; the one inbound fold every transport in this package shares. Total." source "Decodes one inbound frame and delivers it onto a transport emitter as `message` or `error`."
guides/mcp.md function readCancelledId: guide "Read the request id an inbound `notifications/cancelled` names — the inverse of `buildCancelledNotification`; total." source "Reads the request id an inbound `notifications/cancelled` names — the inverse of `buildCancelledNotification`."
guides/mcp.md function decodeSentinel: guide "Read the value a standard MCP request header carries, decoding `=?base64?{Base64OfUTF8}?=` and refusing an invalid payload rather than reading it as a literal; total." source "Reads the value one standard MCP request header carries, decoding the Base64 sentinel."
guides/mcp.md function encodeSentinel: guide "Build the wire form a standard MCP request header value must travel as — literal when plain printable ASCII survives the round trip, the Base64 sentinel otherwise." source "Builds the wire form one standard MCP request header value must travel as."
guides/mcp.md function isFieldToken: guide "Total guard for one RFC 9110 field token — the whole constraint an `x-mcp-header` annotation value must satisfy." source "Determines whether a value is one RFC 9110 field token."
guides/mcp.md function isMCPHeaderPrimitive: guide "Total guard for the schema types an `x-mcp-header` annotation may sit on: `string`, `integer`, `boolean`; `number` is refused." source "Determines whether a value is a JSON Schema type an `x-mcp-header` annotation may sit on."
guides/mcp.md function countHeaderAnnotations: guide "Count every `x-mcp-header` key a value carries at any position; iterative and ancestor-tracked, so a cyclic value terminates. Total." source "Counts every `MCP_HEADER_ANNOTATION` key one JSON value carries, at any position."
guides/mcp.md function extractHeaderAnnotations: guide "Read the annotations a `properties` chain reaches from a schema node, or `undefined` when a reachable one violates its own constraints." source "Reads every `x-mcp-header` annotation reachable from a schema node through `properties`."
guides/mcp.md function buildHeaderParameters: guide "Build the `x-mcp-header` projections one tool `inputSchema` declares, or `undefined` when the definition is invalid — the one decision both sides of SEP-2243 make. Total." source "Builds the `x-mcp-header` projections one tool's `inputSchema` declares."
guides/mcp.md function renderHeaderValue: guide "Render one projected argument as its header text: a string as itself, an integer in decimal, a boolean lowercase; `undefined` when the value contradicts the declared type." source "Renders one projected argument as the text its `Mcp-Param-*` header carries."
guides/mcp.md function buildHeaderProjection: guide "Build the `Mcp-Param-*` headers one `tools/call` carries, reading each value at its own property path, omitting an absent or `null` one, and encoding through `encodeSentinel`." source "Builds the `Mcp-Param-*` request headers one `tools/call` carries."
guides/mcp.md function extractToolSchema: guide "Read one named tool's advertised `inputSchema` out of a `tools/list` answer; an error envelope and a missing tool array both read as no schema. Total." source "Reads one named tool's advertised `inputSchema` out of a `tools/list` answer."
guides/mcp.md function sendStream: guide "Pump a controlled serialized exchange onto an `MCPTransportInterface` — every notification, the terminal last, and the exchange ENDED on every exit." source "Pumps a controlled serialized exchange onto a transport — every notification in order, then the terminating response — and END the exchange however the pump leaves."
guides/mcp.md function bindServer: guide "Pipe an `MCPTransportInterface` into an `MCPDispatcherInterface` — inbound decoded within the server's own bound and `handle`d under a per-request signal, a defined reply `send`, a held-open one pumped; returns an unbind." source "Pipes an `MCPTransportInterface` into an `MCPDispatcherInterface` — every inbound message runs through `server.handle`, and a defined reply is written back through `transport.send`."
guides/mcp.md function bindClient: guide "Pipe an `MCPTransportInterface` into an `MCPClientInterface` (built over `createDuplexClientTransport`) — completes the inbound wiring; returns an unbind." source "Pipes an `MCPTransportInterface` into an `MCPClientInterface` — every inbound message is decoded and delivered onto the client's OWN transport (`client.transport.emitter`'s `message` / `close` events), resolving/rejecting the client's correlated pending requests exactly as a direct reply would."
guides/mcp.md function decodeEvent: guide "Decode one SSE event's `data` string into a `JSONRPCMessage`, or `undefined` (total)." source "Decodes one SSE event's `data` string into a `JSONRPCMessage`, or `undefined` when it is not one — the per-event step `readEventStream` folds over."
guides/mcp.md function readEventStream: guide "Decode a `fetch` Response's SSE body into the `JSONRPCMessage`s it carried, reassembling across chunk boundaries through the same `SSEParser` a server serializes against (the egress inverse; total)." source "Decodes a `fetch` Response's Server-Sent-Events body into the JSON-RPC messages it carried — the CLIENT-side inverse of a server's Streamable-HTTP SSE response."
guides/mcp.md function buildResponseError: guide "Build the error for a non-success HTTP response that carried no JSON-RPC message, naming its status and body shape." source "Builds the error for a non-success HTTP response that carried no JSON-RPC message."
guides/mcp.md type JSONRPCId: guide absent source "Represents a JSON-RPC 2.0 correlation id — the value a request and its response share."
guides/mcp.md interface JSONRPCRequest: guide absent source "Represents a JSON-RPC 2.0 request — a `method` call with optional `params`, correlated to its response by the `id` it REQUIRES."
guides/mcp.md interface JSONRPCNotification: guide absent source "Represents a JSON-RPC 2.0 notification — a fire-and-forget `method` call that is answered by nothing (for example, `notifications/initialized`)."
guides/mcp.md type JSONRPCInvocation: guide absent source "Represents one inbound JSON-RPC call — the common dispatch input."
guides/mcp.md interface JSONRPCError: guide absent source "Represents a JSON-RPC 2.0 error object — the `error` member of a `JSONRPCErrorResponse`."
guides/mcp.md interface JSONRPCResultResponse: guide absent source "Represents the success arm of a JSON-RPC 2.0 response — the request's `id` echoed with the method's `result`."
guides/mcp.md interface JSONRPCErrorResponse: guide absent source "Represents the failure arm of a JSON-RPC 2.0 response — the request's `id` echoed with the `JSONRPCError` that ended it."
guides/mcp.md type JSONRPCResponse: guide absent source "Represents a JSON-RPC 2.0 response — the answer to one `JSONRPCRequest`."
guides/mcp.md type JSONRPCMessage: guide absent source "Represents a JSON-RPC 2.0 message on the wire — a `JSONRPCInvocation` or a `JSONRPCResponse`."
guides/mcp.md interface MCPResult: guide absent source "Represents one modern MCP result — the open contract every dated-revision result satisfies."
guides/mcp.md interface MCPLegacyResult: guide absent source "Represents one legacy-era result — the payload of an answer produced by the fixed legacy method switch."
guides/mcp.md type MCPVersion: guide absent source "Names a protocol revision supported by an MCP package surface."
guides/mcp.md type MCPModernVersion: guide absent source "Names a modern protocol revision supported by the bare MCP server."
guides/mcp.md type MCPLegacyVersion: guide absent source "Names a legacy protocol revision supported by the optional legacy decorators."
guides/mcp.md type MCPMetaObject: guide absent source "Represents the exact finite JSON metadata carried by MCP `_meta` envelopes."
guides/mcp.md type MCPResultMetaObject: guide absent source "Carries open result metadata with the dated reserved server identity field."
guides/mcp.md type MCPNotificationMetaObject: guide absent source "Carries open notification metadata with the dated reserved subscription field."
guides/mcp.md type MCPLoggingLevel: guide absent source "Names the dated logging levels accepted by MCP request metadata."
guides/mcp.md type MCPClientCapabilities: guide absent source "Represents the open dated client-capability declaration carried by modern requests."
guides/mcp.md type MCPServerCapabilities: guide absent source "Represents the open dated server-capability declaration returned by discovery."
guides/mcp.md type MCPEra: guide absent source "Names the wire era selected by an MCP request's structure."
guides/mcp.md type MCPRole: guide absent source "Names the intended recipient of annotated MCP content."
guides/mcp.md interface MCPAnnotations: guide absent source "Represents the optional audience, importance, and modification hints on MCP content."
guides/mcp.md type MCPIcon: guide absent source "Represents one sized, themed icon associated with an MCP resource link."
guides/mcp.md interface MCPTextContent: guide absent source "Represents a textual MCP content block."
guides/mcp.md interface MCPImageContent: guide absent source "Represents a base64-encoded image MCP content block."
guides/mcp.md interface MCPAudioContent: guide absent source "Represents a base64-encoded audio MCP content block."
guides/mcp.md interface MCPResourceLink: guide absent source "Represents a link to an MCP resource, including its exact dated-schema metadata."
guides/mcp.md interface MCPTextResource: guide absent source "Represents embedded textual resource contents."
guides/mcp.md interface MCPBlobResource: guide absent source "Represents embedded base64-encoded resource contents."
guides/mcp.md interface MCPEmbeddedResource: guide absent source "Represents an MCP content block carrying embedded text or blob resource contents."
guides/mcp.md type MCPContent: guide absent source "Represents one exact dated-schema tool content block."
guides/mcp.md type MCPUnstampedCallResult: guide absent source "Represents a `tools/call` result BEFORE the modern stamp — the executed tool's output as `content` blocks, with `isError` flagging a tool failure."
guides/mcp.md type MCPCallResult: guide absent source "Represents a required complete modern `tools/call` result."
guides/mcp.md interface MCPPaginationParams: guide absent source "Represents the cursor parameters shared by every paginated modern list method."
guides/mcp.md interface MCPPaginationResult: guide absent source "Represents the cursor result fields shared by every paginated modern list method."
guides/mcp.md interface MCPResource: guide absent source "Represents one resource descriptor advertised by `resources/list`."
guides/mcp.md interface MCPResourceTemplate: guide absent source "Represents one RFC 6570 resource-template descriptor advertised by `resources/templates/list`."
guides/mcp.md type MCPResourceContents: guide absent source "Represents the resource contents returned by `resources/read`."
guides/mcp.md interface MCPResourcePage: guide absent source "Represents one consumer-owned page projected by `resources/list`."
guides/mcp.md interface MCPResourceTemplatePage: guide absent source "Represents one consumer-owned page projected by `resources/templates/list`."
guides/mcp.md interface MCPResourceReadParams: guide absent source "Parameters accepted by `resources/read`."
guides/mcp.md type MCPResourceListResult: guide absent source "Represents the complete cacheable `resources/list` result."
guides/mcp.md type MCPResourceReadResult: guide absent source "Represents the complete cacheable `resources/read` result."
guides/mcp.md type MCPResourceTemplateListResult: guide absent source "Represents the complete cacheable `resources/templates/list` result."
guides/mcp.md interface MCPResourceManagerInterface: guide absent source "Represents the consumer-supplied resource registry port."
guides/mcp.md interface MCPPromptArgument: guide absent source "Represents one argument descriptor advertised with an MCP prompt."
guides/mcp.md interface MCPPrompt: guide absent source "Represents one prompt descriptor advertised by `prompts/list`."
guides/mcp.md interface MCPPromptMessage: guide absent source "Represents one user or assistant message returned by `prompts/get`."
guides/mcp.md interface MCPPromptPage: guide absent source "Represents one consumer-owned page projected by `prompts/list`."
guides/mcp.md interface MCPPromptGetParams: guide absent source "Parameters accepted by `prompts/get`."
guides/mcp.md type MCPPromptListResult: guide absent source "Represents the complete cacheable `prompts/list` result."
guides/mcp.md interface MCPPromptGetResult: guide absent source "Represents the complete, non-cacheable `prompts/get` result."
guides/mcp.md interface MCPPromptManagerInterface: guide absent source "Represents the consumer-supplied prompt registry port."
guides/mcp.md interface MCPPromptReference: guide absent source "Represents a completion reference to one named prompt."
guides/mcp.md interface MCPResourceTemplateReference: guide absent source "Represents a completion reference to one resource-template URI descriptor."
guides/mcp.md type MCPCompletionReference: guide absent source "Represents the prompt or resource-template reference accepted by `completion/complete`."
guides/mcp.md interface MCPCompletionArgument: guide absent source "Represents the argument fragment being completed."
guides/mcp.md interface MCPCompletionContext: guide absent source "Holds previously resolved string arguments supplied as completion context."
guides/mcp.md interface MCPCompletionParams: guide absent source "Parameters accepted by `completion/complete`."
guides/mcp.md interface MCPCompletion: guide absent source "Represents one completion candidate set before the protocol's 100-value projection cap."
guides/mcp.md interface MCPCompletionResult: guide absent source "Represents the complete `completion/complete` result."
guides/mcp.md interface MCPCompletionInterface: guide absent source "Represents the consumer-supplied completion port for prompt and resource-template arguments."
guides/mcp.md type MCPElicitValue: guide absent source "Names the primitive value shapes accepted in an MCP form elicitation response."
guides/mcp.md interface MCPElicitChoice: guide absent source "Represents one titled value in a form elicitation's single- or multi-select schema."
guides/mcp.md type MCPElicitFieldSchema: guide absent source "Represents one restricted single-field schema accepted by MCP form-mode elicitation."
guides/mcp.md interface MCPElicitSchema: guide absent source "Represents the restricted top-level object schema in a form-mode elicitation request."
guides/mcp.md interface MCPElicitForm: guide absent source "Represents the parameters of a form-mode `elicitation/create` request."
guides/mcp.md interface MCPElicitURL: guide absent source "Represents the parameters of a URL-mode `elicitation/create` request."
guides/mcp.md type MCPElicitParams: guide absent source "Represents the mode-discriminated parameters of an `elicitation/create` request."
guides/mcp.md interface MCPElicitRequest: guide absent source "Represents an embedded MCP request asking the client to elicit input from its operator."
guides/mcp.md interface MCPElicitResult: guide absent source "Represents the result supplied by a client for one embedded `MCPElicitRequest`."
guides/mcp.md type MCPInputRequest: guide absent source "Represents one embedded multi-round-trip request."
guides/mcp.md type MCPInputRequestMap: guide absent source "Represents a consumer-keyed map of embedded requests the client must fulfil."
guides/mcp.md interface MCPRoot: guide absent source "Represents one filesystem root a client exposes to a server."
guides/mcp.md interface MCPRootResult: guide absent source "Represents the client's answer to one embedded `roots/list` request."
guides/mcp.md interface MCPToolUseContent: guide absent source "Represents a model's request to call one tool, carried inside a sampling completion."
guides/mcp.md interface MCPToolResultContent: guide absent source "Represents one tool's outcome returned to the model, carried in a sampling completion."
guides/mcp.md type MCPSampleContent: guide absent source "Represents one block a sampling completion may carry."
guides/mcp.md interface MCPSampleResult: guide absent source "Represents the client's answer to one embedded `sampling/createMessage` request."
guides/mcp.md type MCPInputResponse: guide absent source "Represents one client answer to one embedded input request."
guides/mcp.md type MCPInputResponseMap: guide absent source "Represents a consumer-keyed map of the client's answers to one issued round."
guides/mcp.md type MCPInputResult: guide absent source "Represents an incomplete modern result carrying input requests, protected request state, or both."
guides/mcp.md interface MCPInputState: guide absent source "Represents the integrity-protected payload carried inside an opaque `requestState` token."
guides/mcp.md interface MCPInputContext: guide absent source "Represents the call-in-hand context supplied to an `MCPInputHandler`."
guides/mcp.md interface MCPInputRound: guide absent source "Represents one consumer-composed round of embedded requests, before MCP seals its continuation state."
guides/mcp.md type MCPInputHandler: guide absent source "Decides whether the current `tools/call` still needs input from the client."
guides/mcp.md type MCPPrincipalHandler: guide absent source "Derives the deployment-authenticated principal bound into signed request state."
guides/mcp.md interface MCPContinuationInterface: guide absent source "Represents the host-neutral integrity and storage port for opaque MRTR continuation state."
guides/mcp.md interface MCPInputOptions: guide absent source "Configures the consumer policy for the server's multi-round-trip input mechanism."
guides/mcp.md type MCPTaskStatus: guide absent source "Names the lifecycle state of one durable task."
guides/mcp.md type MCPTask: guide absent source "Represents one durable task's wire snapshot — the payload a deferred `tools/call` answers with."
guides/mcp.md type MCPTaskDetail: guide absent source "Represents one task snapshot together with whatever its status carries — the shape `tasks/get` and a task notification report."
guides/mcp.md type MCPTaskDetailResult: guide absent source "Represents the wire answer to `tasks/get` — one snapshot under the completed-result stamp."
guides/mcp.md type MCPTaskNotificationParams: guide absent source "Represents the parameters of a `notifications/tasks` frame — one snapshot, flat, optionally stamped with the subscription that delivered it."
guides/mcp.md type MCPTaskNotification: guide absent source "Represents one well-formed `notifications/tasks` frame — the notification `isMCPTaskNotification` admits."
guides/mcp.md type MCPTaskResult: guide absent source "Represents the modern `tools/call` result announcing that the call became a durable task."
guides/mcp.md interface MCPTaskContext: guide absent source "Represents the call-in-hand context supplied to an `MCPTaskHandler` and to `MCPTaskManagerInterface.start`."
guides/mcp.md interface MCPTaskManagerInterface: guide absent source "Represents the consumer-owned durable store behind the Tasks extension — the port this package creates tasks through and reads them back from."
guides/mcp.md type MCPTaskHandler: guide absent source "Decides whether the `tools/call` in hand becomes a durable task."
guides/mcp.md interface MCPTaskOptions: guide absent source "Configures the consumer policy for the server's stable Tasks extension."
guides/mcp.md interface MCPProgress: guide absent source "Represents one official request-scoped progress payload."
guides/mcp.md interface MCPProgressInterface: guide absent source "Reports request-scoped progress under backpressure — the reporter supplied to an explicit executor."
guides/mcp.md interface MCPProgressOwnerInterface: guide absent source "Represents the OWNING half of one progress slot — `MCPProgressInterface` plus the consuming and stopping the slot's owner performs."
guides/mcp.md interface MCPExecutionContext: guide absent source "Represents the explicit, host-neutral context for one modern tool execution."
guides/mcp.md type MCPExecutionHandler: guide absent source "Executes one canonical tool call or returns a fully formed complete MCP result."
guides/mcp.md type MCPListResult: guide absent source "Represents the MCP `tools/list` result — tool descriptors plus optional modern result stamps."
guides/mcp.md interface MCPToolDescriptor: guide absent source "Represents one entry of the MCP `tools/list` result — a tool's `name`, optional `description`, and its JSON-Schema `inputSchema`."
guides/mcp.md type MCPHeaderPrimitive: guide absent source "Names the JSON Schema types an `x-mcp-header` annotation may sit on."
guides/mcp.md interface MCPHeaderParameter: guide absent source "Represents one `x-mcp-header` projection a tool's `inputSchema` declares."
guides/mcp.md type MCPIdentity: guide absent source "Represents the complete dated identity of an MCP server or client."
guides/mcp.md interface MCPRequestContext: guide absent source "Represents the validated per-request context projected from a modern request's reserved `_meta` keys."
guides/mcp.md type MCPDiscoverResult: guide absent source "Represents the mandatory modern `server/discover` result."
guides/mcp.md interface MCPSubscriptionFilter: guide absent source "Names the notification families a client may opt in to on a `subscriptions/listen` stream."
guides/mcp.md type MCPSubscriptionResultMetaObject: guide absent source "Represents the required metadata on a graceful `subscriptions/listen` result."
guides/mcp.md type MCPSubscriptionResult: guide absent source "Represents the terminating result returned when a `subscriptions/listen` stream closes gracefully."
guides/mcp.md type MCPSubscriptionStream: guide absent source "Represents a client subscription's owned notifications and graceful terminal result."
guides/mcp.md interface MCPListenOptions: guide absent source "Configures the per-subscription cancellation and bounded buffering policy."
guides/mcp.md interface MCPDispatchOptions: guide absent source "Represents the per-request execution options every dispatched handler receives."
guides/mcp.md interface MCPMethodOptions: guide absent source "Represents the RESOLVED per-request options one dispatched method receives."
guides/mcp.md type MCPSubscriptionHandler: guide absent source "Produces notifications for one honoured `subscriptions/listen` filter."
guides/mcp.md interface MCPSubscriptionOptions: guide absent source "Configures the server's built-in `subscriptions/listen` method."
guides/mcp.md type MCPStream: guide absent source "Represents a held-open modern result: each `yield` is a `JSONRPCNotification`; the `return` value is the terminating response."
guides/mcp.md type MCPTextStream: guide absent source "Mirrors `MCPStream` at the string boundary — the same sequence, already serialized."
guides/mcp.md interface MCPStreamControllerInterface: guide absent source "Represents a held-open modern result whose cancellation ONE owner arbitrates — the arm every stream leaving `MCPServer.dispatch` takes."
guides/mcp.md interface MCPTextStreamControllerInterface: guide absent source "Mirrors `MCPStreamControllerInterface` at the string boundary — the same exchange, already serialized."
guides/mcp.md type MCPMethodHandler: guide absent source "Represents one modern method, registered on the seam that dispatches it."
guides/mcp.md interface MCPMethodManagerInterface: guide absent source "Represents the modern method registry an `MCPServerInterface` dispatches through — the ONE seam carrying both the built-in methods and any method a consumer adds."
guides/mcp.md type MCPServerEventMap: guide absent source "Represents the push observation surface of an `MCPServerInterface` — the dispatch moments a fire-and-forget observer (logging, tracing) subscribes to through `server.emitter.on`."
guides/mcp.md interface MCPLimitOptions: guide absent source "Configures the hostile-input and live-resource bounds for an MCP server."
guides/mcp.md interface MCPJSONLimitOptions: guide absent source "Limits applied by `isBoundedJSON` to one JSON value."
guides/mcp.md interface MCPServerOptions: guide absent source "Options for `createMCPServer` — the server `MCPIdentity`, the live `ToolManagerInterface` it exposes, optional `instructions`, and the reserved `on` hooks."
guides/mcp.md interface MCPDispatcherInterface: guide absent source "Represents the minimal transport-facing MCP dispatch surface."
guides/mcp.md interface MCPServerInterface: guide absent source "Dispatches JSON-RPC 2.0 modern requests over a live `ToolManagerInterface`, with NO transport coupling (a transport layer pumps strings through `handle`)."
guides/mcp.md interface MCPLegacyOptions: guide absent source "Represents the construction options for the removable legacy protocol decorator."
guides/mcp.md interface MCPTransportInterface: guide absent source "Represents a duplex message channel an environment face provides to the pure engine — the one port `bindServer` and `bindClient` (`./helpers.js`) pipe an `MCPServerInterface` / `MCPClientInterface` over."
guides/mcp.md type MCPMessageTransportEventMap: guide absent source "Lists the observable events of a `MCPMessageTransportInterface` — the moments the `MCPClientInterface` (and any tracer) subscribes to through `transport.emitter.on`."
guides/mcp.md interface MCPMessageTransportInterface: guide absent source "Pumps JSON-RPC messages to a peer and surfaces received messages on its `emitter`'s `message` event, with no knowledge of the protocol role on either side — a transport-agnostic MCP message carrier."
guides/mcp.md interface HTTPClientTransportOptions: guide absent source "Options for `createHTTPClientTransport` — the remote MCP server's URL and any extra request headers."
guides/mcp.md interface MCPLegacyClientTransportOptions: guide absent source "Options for the explicit legacy client transport adapter."
guides/mcp.md type MCPClientEventMap: guide absent source "Represents the push observation surface of an `MCPClientInterface` — the moments a fire-and-forget observer (logging, tracing) subscribes to through `client.emitter.on`."
guides/mcp.md interface MCPClientOptions: guide absent source "Options for `createMCPClient` — the `MCPMessageTransportInterface` to drive, the optional client `MCPIdentity`, the per-request `timeout`, and the reserved `on` hooks."
guides/mcp.md type MCPProgressHandler: guide absent source "Receives one progress report a peer published for a request this client issued."
guides/mcp.md interface MCPCallOptions: guide absent source "Configures per-call policy and continuation data for one remote `tools/call`."
guides/mcp.md type MCPCallOutcome: guide absent source "Represents what one remote `tools/call` answered — the arms the dated protocol permits."
guides/mcp.md type MCPRequestFunction: guide absent source "Issues one correlated JSON-RPC request and awaits the peer's result."
guides/mcp.md interface MCPTaskClientOptions: guide absent source "Represents the construction options for an `MCPTaskClientInterface`."
guides/mcp.md interface MCPTaskClientInterface: guide absent source "Reads, answers, and stops a durable task the peer created — the CLIENT half of the stable Tasks extension."
guides/mcp.md interface MCPClientInterface: guide absent source "Connects to a REMOTE MCP server over any injected `MCPMessageTransportInterface`, negotiates the modern wire revision, and exposes the server's tools as local `ToolInterface`s an agent can run."
guides/mcp.md function createMCPContinuation: guide "Adapt installed signed-token primitives and secret rotation to the host-neutral core continuation port." source "Adapts the installed server token primitives to the host-neutral MCP continuation port."
guides/mcp.md function createMCPRoutes: guide "Mount an `MCPDispatcherInterface` on the router spine — returns the `RouteInput[]` for `router.add(...)`, passing the named transport options through to its single stateless POST handler." source "Creates the MCP Streamable-HTTP transport routes — mounts a transport-agnostic `MCPDispatcherInterface` (the `@orkestrel/mcp` dispatch boundary) on the fetch-standard router spine, pumping each `POST` body through `mcp.dispatch`. Returns the `RouteInput`s to hand to `router.add(...)`."
guides/mcp.md function createMCPPostHandler: guide "Create the stateless Streamable-HTTP POST handler directly, optionally extracting asserted caller context after validation." source "Creates the Streamable-HTTP POST handler used by `createMCPRoutes`."
guides/mcp.md function createHTTPClientTransport: guide "Return the core `HTTPClientTransport` over the native `fetch` that drives a REMOTE Streamable-HTTP MCP server — the same class the browser face's factory returns." source "Creates the HTTP CLIENT transport for an `MCPClientInterface` — a `MCPMessageTransportInterface` that drives a REMOTE Streamable-HTTP MCP server over `fetch`. The egress mirror of `createMCPRoutes`."
guides/mcp.md function createMCPSession: guide "Create the opt-in native session `MiddlewareHandler` — closure store + mint-on-`initialize` + require-404 + the resumable `GET` SSE stream; mount in front of `createMCPRoutes`." source "Creates the native MCP session `MiddlewareHandler` — the plug-and-play stateful layer that fronts a session-agnostic `createMCPRoutes`. Compose it with `router.use(createMCPSession())` (or the equivalent middleware seam), mirroring any other closure-scoped stateful middleware. Has NO dependency on `@orkestrel/middleware` — the session store, mint-on-`initialize`, and resumable stream are all native to this package."
guides/mcp.md function createDuplexServerTransport: guide "Adapt a message-channel `MCPMessageTransportInterface` (the stdio / WebSocket SERVER transports) onto the core `MCPTransportInterface` port — what `createStdioServer` and `createWebSocketServer` pipe through `bindServer`." source "Creates the server-side mirror of `createDuplexClientTransport`: the adapter that bridges a message-channel `MCPMessageTransportInterface` (the shape the stdio and WebSocket SERVER transports already implement) onto the environment-agnostic `MCPTransportInterface` port — what `createStdioServer` and `createWebSocketServer` pipe through `bindServer`, so the request/reply/error pump those factories used to hand-roll identically now lives ONCE in the core binder. `createDuplexClientTransport` adapts the same two contracts the other way."
guides/mcp.md class HTTPDisconnect: guide "The one-response HTTP lifecycle bridge that composes request abort with response cancellation, forwards SSE bytes, and owns keepalive cleanup." source "Composes one incoming HTTP request lifetime with one MCP-owned SSE response lifetime."
guides/mcp.md class MCPSession: guide "One MCP transport session — its `id` + attached SSE streams + the FOLDED bounded replay log (`Map` + capacity + lazy TTL); `push`/`attach`/`detach`/`replay` drive the resumable server→client channel." source "Represents one MCP transport session — the per-session entity a `createMCPSession` middleware owns, keyed by its `id`, carrying the resumable server→client push channel with its bounded replay log FOLDED IN."
guides/mcp.md const SSE_BUFFERING_HEADER: guide absent source "Names the reverse-proxy response header controlling buffering of an SSE response."
guides/mcp.md const SSE_BUFFERING_DISABLED: guide absent source "Names the `X-Accel-Buffering` value that disables reverse-proxy buffering."
guides/mcp.md const DEFAULT_MCP_PATH: guide absent source "Names the default request path `createMCPRoutes` mounts the transport's `POST` route at."
guides/mcp.md const DEFAULT_MCP_KEEPALIVE_INTERVAL: guide absent source "Sets the default interval in milliseconds between SSE keepalive comments on held-open MCP responses."
guides/mcp.md const SSE_KEEPALIVE_COMMENT: guide absent source "Names the comment text written by the held-open MCP response keepalive."
guides/mcp.md const DEFAULT_MCP_SESSION_CAPACITY: guide absent source "Sets the default capacity of a session's FOLDED resumable event log (the per-`MCPSession` replay log) — the maximum number of pushed server→client messages retained for replay before the OLDEST is evicted."
guides/mcp.md const DEFAULT_MCP_SESSION_TTL: guide absent source "Sets the default per-event idle lifetime (ms) of a session's folded resumable event log — an entry older than this is lazily evicted on the next access (no background timer), bounding how far back a reconnecting client may replay."
guides/mcp.md function acceptsEventStream: guide "Whether the request's `Accept` header contains `text/event-stream`." source "Checks whether the request's `Accept` header opts into a Server-Sent-Events response."
guides/mcp.md function allowsOrigin: guide "Allow an absent or canonical loopback-literal Origin; require every other present serialized Origin in the explicit list unless validation is delegated upstream." source "Checks whether an HTTP request satisfies the endpoint's origin gate."
guides/mcp.md function inferHeaderIssue: guide "Derive the first missing or mismatched header issue a request BODY fixes — modern or stateless-legacy — decoding a sentinel-encoded `Mcp-Name` before comparing it; `undefined` when the applicable fields agree." source "Infers the first required MCP HTTP header a request's own body contradicts."
guides/mcp.md function inferSessionHeaderIssue: guide "Derive the protocol-header issue an active legacy SESSION's pinned revision fixes; `undefined` when the header names that revision." source "Infers the protocol header issue an active legacy session's pinned revision diagnoses."
guides/mcp.md function inferHeaderTarget: guide "Read the target a modern request's `Mcp-Name` must carry — `params.name` for `tools/call` and `prompts/get`, `params.uri` for `resources/read`; `undefined` for every other method." source "Infers the target one modern request's `Mcp-Name` header must carry."
guides/mcp.md function inferParameterRefusal: guide "Derive the refusal one `tools/call` earns for a `Mcp-Param-*` header the body contradicts — absent, invalidly encoded, mismatched, or asserting a value the body omits; `undefined` when the recognized fields agree." source "Infers the refusal one `tools/call` earns for a `Mcp-Param-*` header the body contradicts."
guides/mcp.md function inferLegacyVersion: guide "Pin a supported requested legacy revision, otherwise select the newest supported legacy revision." source "Infers the legacy revision an `initialize` request negotiates."
guides/mcp.md function inferStatus: guide "Map a dispatch outcome to its era-aware HTTP status while preserving legacy in-band `200` errors." source "Infers the HTTP status for one MCP dispatch outcome without changing its JSON-RPC body."
guides/mcp.md function readSessionHeader: guide "Read the request's `mcp-session-id` header for the stateful transport, or `undefined`." source "Reads the request's `mcp-session-id` header — the session id a stateful transport validates, or `undefined` when absent."
guides/mcp.md function readLastEventId: guide "Read the request's `Last-Event-ID` header — the resumable GET-SSE replay cursor, or `undefined`." source "Reads the request's `Last-Event-ID` header — the SSE resume cursor a client sends when it reconnects to the resumable `GET {path}` stream, or `undefined` when absent."
guides/mcp.md function rejectUnknownSession: guide "Build the stateful transport's unknown-session reply — a `404` + a JSON-RPC `-32600` \"Session not found\" body." source "Builds the stateful transport's \"unknown session\" rejection — an HTTP `404` carrying a JSON-RPC error body."
guides/mcp.md function sendEventStream: guide "Pump a controlled held-open exchange onto an open SSE stream, ending the exchange and the body on every exit; total." source "Pumps a controlled held-open exchange onto an open SSE stream — one `data:` event per notification in order, then the terminating response — and END the exchange however the pump leaves."
guides/mcp.md function upgradeRequestPath: guide "Read a raw `node:http` upgrade request's path (no query) for the `createWebSocketServer` upgrade-path match." source "Reads the path (without the query string) of a raw `node:http` protocol-upgrade request — the `createWebSocketServer` upgrade-path match."
guides/mcp.md function extractLines: guide "Fold one more chunk of raw stdio bytes into a newline-framed buffer — complete `lines` + the trailing `remainder`." source "Folds one more chunk of raw stdio bytes into a newline-framed buffer — the shared line-framing step both stdio transports (client and server) read their inbound newline-delimited JSON-RPC messages through."
guides/mcp.md function writeLine: guide "Write one line to a Node writable and settle from its completion callback; a callback error or synchronous throw rejects." source "Writes one line to a Node writable stream and waits for its completion callback."
guides/mcp.md function dispatchLines: guide "Decode and deliver each complete newline-framed line onto a `MCPMessageTransportEventMap` emitter (`message` / `error`)." source "Decodes and delivers each complete newline-framed line onto a `MCPMessageTransportEventMap` emitter — the shared per-chunk dispatch step both stdio transports run their framed lines through: the server transport frames with `extractLines`, the client transport takes its lines from the process supervisor."
guides/mcp.md interface MCPHeaderIssue: guide absent source "Reports one required MCP HTTP header that is absent or disagrees with its server-derived value."
guides/mcp.md interface MCPOriginOptions: guide absent source "Configures the protocol-required HTTP `Origin` validation shared by the route and session enforcement sites."
guides/mcp.md interface MCPKeepaliveOptions: guide absent source "Configures the shared SSE keepalive for held-open HTTP responses."
guides/mcp.md type MCPCallerHandler: guide absent source "Extracts consumer-asserted caller context synchronously from an HTTP request after the transport has validated it for dispatch."
guides/mcp.md interface HTTPHandlerOptions: guide absent source "Options shared by the MCP Streamable-HTTP POST handler and route factory."
guides/mcp.md interface HTTPTransportOptions: guide absent source "Options for `createMCPRoutes` — the mount path plus the shared POST-handler options. `createMCPRoutes` is STATELESS; sessions are a separate middleware (`createMCPSession`), composed with `server.use`."
guides/mcp.md interface MCPSessionOptions: guide absent source "Options for the `MCPSession` entity — its folded replay log's capacity and per-event lifetime."
guides/mcp.md interface MCPSessionMiddlewareOptions: guide absent source "Options for `createMCPSession` — the path the session middleware owns, the session idle time-to-live, and the per-session resumable event-log bound."
guides/mcp.md interface MCPSessionInterface: guide absent source "Represents one MCP transport session — the per-session entity a `createMCPSession` middleware owns (the `MCPSession` entity), carrying the resumable server→client push channel with its bounded replay log FOLDED IN."
guides/mcp.md interface MCPSessionState: guide absent source "Declares the `context.state` slice a `createMCPSession` middleware sets on a validated / minted request — a consumer's `TState` extends this so the downstream route handler can read `context.state.session` to `push` a server-initiated message onto the session's resumable stream."
guides/mcp.md interface MCPSessionEvent: guide absent source "Represents one entry of an `MCPSessionInterface`'s folded replay log — a single pushed `JSONRPCMessage` tagged with the monotone event `id` the session assigned and the `timestamp` it was appended at (for the lazy-TTL replay window)."
guides/mcp.md interface MCPSessionEntry: guide absent source "Represents the closure store entry a `createMCPSession` middleware keeps per minted session — the live `MCPSession` entity plus the epoch-ms instant it was last touched (the lazy-TTL sweep's idle clock, independent of the session's own replay-log TTL)."
guides/mcp.md function createWebSocketServer: guide "Mount an `MCPDispatcherInterface` over WebSocket — returns an `UpgradeHandler` for `server.upgrade(...)` (claims an MCP WS upgrade, pipes it through `bindServer`, and closes its sockets on the spine's `stop`)." source "Creates the MCP WebSocket transport INGRESS — an `UpgradeHandler` that exposes a transport-agnostic `MCPDispatcherInterface` over a WebSocket, the WebSocket mirror of `createMCPRoutes`. Register it on the spine's upgrade seam."
guides/mcp.md function createWebSocketClientTransport: guide "Create a `MCPMessageTransportInterface` that drives a REMOTE MCP server over a WebSocket (the WS egress mirror)." source "Creates the WebSocket CLIENT transport for an `MCPClientInterface` — a `MCPMessageTransportInterface` that drives a REMOTE MCP server over a WebSocket. The egress mirror of `createWebSocketServer` and the WebSocket sibling of `createHTTPClientTransport`."
guides/mcp.md class WebSocketServerTransport: guide "The per-connection JSON-RPC-over-WebSocket SERVER bridge over a `NodeWebSocketInterface` — a `MCPMessageTransportInterface` the ingress pumps." source "Wraps a `NodeWebSocketInterface` (the RFC 6455 wire wrapper) as a `MCPMessageTransportInterface` — the per-connection JSON-RPC-over-WebSocket SERVER bridge, the bidirectional JSON-RPC message channel `createWebSocketServer` pumps `mcp.dispatch` over and the egress mirror's `WebSocketClientTransport` reuses."
guides/mcp.md class WebSocketClientTransport: guide "The WebSocket `MCPMessageTransportInterface` — handshakes, then bridges the upgraded socket's frames as the client's message channel." source "Drives a REMOTE MCP server over a WebSocket — a CLIENT `MCPMessageTransportInterface` for the Model Context Protocol, the egress mirror of `createWebSocketServer` and the WebSocket sibling of `HTTPClientTransport`."
guides/mcp.md interface WebSocketServerOptions: guide absent source "Options for `createWebSocketServer` — the spine lifecycle the ingress follows, plus where the WebSocket upgrade is accepted and the subprotocol negotiated."
guides/mcp.md interface WebSocketClientTransportOptions: guide absent source "Options for `createWebSocketClientTransport` — the remote MCP WebSocket endpoint and any extra handshake headers."
guides/mcp.md function createStdioClientTransport: guide "Create a `StdioClientTransportInterface` that spawns a CHILD PROCESS MCP server, drives it over its piped stdio, and reports that child's bounded stderr tail as `evidence`." source "Creates the stdio CLIENT transport for an `MCPClientInterface` — a `StdioClientTransportInterface` that spawns and drives a CHILD PROCESS MCP server over newline-delimited JSON-RPC on `stdin`/`stdout`, the stdio sibling of `createHTTPClientTransport` and `createWebSocketClientTransport`."
guides/mcp.md function createStdioServer: guide "Pipes an `MCPDispatcherInterface` (through `bindServer`) over newline-delimited JSON-RPC on `stdin`/`stdout` (or injected streams), returning a `StdioServerInterface`; `stop()` unbinds the pump, drops every listener the transport put on `input`, and releases `input` so the process can exit." source "Creates the MCP stdio transport INGRESS — pumps a transport-agnostic `MCPDispatcherInterface` over newline-delimited JSON-RPC on `stdin`/`stdout` (or an injected stream pair), the stdio mirror of `createWebSocketServer`."
guides/mcp.md class StdioClientTransport: guide "The `StdioClientTransportInterface` that spawns and drives a child process's stdio as a newline-delimited JSON-RPC channel." source "Drives a CHILD PROCESS MCP server over newline-delimited JSON-RPC on `stdin`/`stdout` — a `StdioClientTransportInterface`, the stdio sibling of `HTTPClientTransport` and `WebSocketClientTransport`."
guides/mcp.md class StdioServerTransport: guide "The `MCPMessageTransportInterface` wrapping a readable/writable stream pair (default `process.stdin` / `process.stdout`)." source "Wraps an injectable readable/writable stream pair (`process.stdin`/`process.stdout` in production, a test double in tests) as a `MCPMessageTransportInterface` — the newline-delimited JSON-RPC channel `createStdioServer` pumps `mcp.dispatch` over, the stdio mirror of `WebSocketServerTransport`."
guides/mcp.md const DEFAULT_MCP_DELIVERY: guide absent source "Sets the default bound in milliseconds on one unconfirmed write to a stdio client transport's child `stdin` — the `delivery` a `createStdioClientTransport` caller who supplies none gets."
guides/mcp.md interface StdioClientTransportInterface: guide absent source "Declares the contract `createStdioClientTransport` returns — a `MCPMessageTransportInterface` that also reports the supervised child's stderr tail, the diagnostic a child that dies at startup leaves behind."
guides/mcp.md interface StdioClientTransportOptions: guide absent source "Options for `createStdioClientTransport` — the child process to spawn as a stdio-framed MCP server (newline-delimited JSON-RPC over `stdin`/`stdout`)."
guides/mcp.md interface StdioServerInterface: guide absent source "Arms and tears down the newline-delimited JSON-RPC pump over the `StdioServerOptions` stream pair — the stdio INGRESS handle `createStdioServer` returns."
guides/mcp.md interface StdioServerOptions: guide absent source "Options for `createStdioServer` — the injectable stdin/stdout streams the server transport reads newline-delimited JSON-RPC requests from and writes responses to."
guides/mcp.md interface LineExtraction: guide absent source "Represents the result of folding one more chunk of raw stdio bytes into a newline-framed buffer — every COMPLETE line extracted (newline-terminated in the wire bytes) plus the trailing partial line carried forward as the new `remainder`."
guides/mcp.md function createMessagePortTransport: guide "Create an `MCPTransportInterface` over a native `MessagePort` — SYMMETRIC, works as either a server or a client carrier depending on the binder it is handed to." source "Creates the browser-face `MessagePort` transport — a `MCPTransportInterface` over a native `MessagePort`, the SYMMETRIC carrier that works as either a server or a client transport depending on which binder (`bindServer` or `bindClient`) it is handed to."
guides/mcp.md function createScopeServer: guide "Boot an `MCPServer` inside a hostable scope (default `globalThis`) and wire its message events to it — returns a `ScopeServerInterface` whose `stop` ends every binding this call owns. Modern-only: a legacy `initialize` falls off as `-32601`." source "Creates an `MCPServer` hosted inside a worker scope and wires that scope's message events to it — the browser face's bootstrap, and the twin of the Node face's `createStdioServer`."
guides/mcp.md function createScopeTransport: guide "Adapt a `ScopeInterface` (`self`) into a `ScopeTransportInterface` — the implicit, portless channel `createScopeServer` binds." source "Adapts a hostable `ScopeInterface` (`self` in a dedicated Web Worker, or any structurally matching double) into a `ScopeTransportInterface` — the implicit, portless message channel `createScopeServer` binds for the dedicated-worker shape."
guides/mcp.md function createScopeMessageListener: guide "Build `createScopeServer`'s unified `message`-event listener — a port-bearing event is gated by `accept`, deduped against the caller's `Map<MessagePort, () => void>` of teardowns, then spawns a per-port binding recorded under that port; a portless string-data event delivers onto the implicit scope channel." source "Builds `createScopeServer`'s `message`-event listener — the unified dispatcher that routes EVERY inbound event on a hostable scope, portless or port-bearing, to the right binding."
guides/mcp.md class MessagePortTransport: guide "The SYMMETRIC `MCPTransportInterface` over a native `MessagePort` — `start()`s at construction, string payloads only, `close()` idempotent." source "Carries the Model Context Protocol over a native `MessagePort` from the browser face — a `MCPTransportInterface`, the genuinely new capability this face adds: MCP over `postMessage`."
guides/mcp.md const DEFAULT_MCP_SERVER_NAME: guide absent source "Supplies the default server name `createScopeServer` reports (`initialize`'s `serverInfo.name`) when `options.name` is omitted."
guides/mcp.md const DEFAULT_MCP_SERVER_VERSION: guide absent source "Supplies the default server version `createScopeServer` reports (`initialize`'s `serverInfo.version`) when `options.version` is omitted."
guides/mcp.md interface MessagePortTransportOptions: guide absent source "Options for `createMessagePortTransport` — the native `MessagePort` a `MessagePortTransport` sends and listens on."
guides/mcp.md interface ScopeInterface: guide absent source "Describes the structural shape `createScopeServer` needs from a hostable scope — `self` in a dedicated Web Worker or a Service Worker (or any double matching this shape)."
guides/mcp.md interface ScopeTransportInterface: guide absent source "Adapts a message-event-bearing SCOPE (`self` in a dedicated Web Worker, or any object shaped the same way) as a duplex `MCPTransportInterface` — the internal carrier `createScopeServer` binds to route the implicit (portless) message channel, plus the `deliver` entry point the scope's own `message` listener pushes an inbound string through (the scope itself never registers `listen`'s handler for the caller — the scope server's dispatcher does, through this `deliver`)."
guides/mcp.md interface ScopeServerInterface: guide absent source "Represents one MCP server hosted inside a worker scope — what `createScopeServer` returns."
guides/mcp.md interface ScopeServerOptions: guide absent source "Options for `createScopeServer` — the live `ToolManagerInterface` to expose plus the optional server identity, mirroring `createMCPServer`'s `MCPServerOptions` (`@orkestrel/mcp`) but with `name`/`version` OPTIONAL (defaulting to `DEFAULT_MCP_SERVER_NAME` / `DEFAULT_MCP_SERVER_VERSION`)."
guides/mcp.md MCPDispatcherInterface.dispatch: guide absent source "Dispatches a parsed JSON-RPC request."
guides/mcp.md MCPDispatcherInterface.handle: guide absent source "Handles a raw JSON-RPC string."
guides/mcp.md MCPServerInterface.dispatch: guide absent source "Dispatches an already-parsed request — runs its method and resolves its answer."
guides/mcp.md MCPServerInterface.handle: guide absent source "Handles a raw message string — parses it, dispatches it, and serializes the answer."
guides/mcp.md MCPProgressInterface.report: guide absent source "Reports one finite, strictly increasing progress value and awaits its consumption."
guides/mcp.md MCPProgressOwnerInterface.report: guide absent source "Reports one finite, strictly increasing progress value and awaits its consumption."
guides/mcp.md MCPProgressOwnerInterface.take: guide absent source "Takes the next progress notification, waiting for the single producer slot when empty."
guides/mcp.md MCPProgressOwnerInterface.stop: guide absent source "Stops the reporter permanently, rejects pending work, and detaches its abort listener."
guides/mcp.md MCPProgressReporter.report: guide absent source "Publishes one bounded, strictly increasing progress value and awaits its consumption."
guides/mcp.md MCPProgressReporter.take: guide absent source "Takes the next progress notification, waiting for the single producer slot when empty."
guides/mcp.md MCPProgressReporter.stop: guide absent source "Stops the reporter permanently, rejects pending work, and detaches its abort listener. Repeated calls are idempotent. No queued or replayable progress survives the first call."
guides/mcp.md MCPStreamControllerInterface.next: guide absent source "Reads the next notification, or the terminating response that ends the exchange."
guides/mcp.md MCPStreamControllerInterface.return: guide absent source "Ends the exchange because the consumer already has its answer."
guides/mcp.md MCPStreamControllerInterface.throw: guide absent source "Ends the exchange with a failure the consumer is raising."
guides/mcp.md MCPStreamControllerInterface.stop: guide absent source "Ends the exchange permanently, with no terminal response."
guides/mcp.md MCPTextStreamControllerInterface.next: guide absent source "Reads the next serialized message, or the serialized terminating response."
guides/mcp.md MCPTextStreamControllerInterface.return: guide absent source "Ends the exchange because the consumer already has its answer."
guides/mcp.md MCPTextStreamControllerInterface.throw: guide absent source "Ends the exchange with a failure the consumer is raising."
guides/mcp.md MCPTextStreamControllerInterface.stop: guide absent source "Ends the exchange permanently, with no terminal response, through the typed stream."
guides/mcp.md MCPMethodManagerInterface.add: guide absent source "Registers one modern method — replacing any handler already under that name."
guides/mcp.md MCPMethodManagerInterface.method: guide absent source "Finds the handler registered for one method name."
guides/mcp.md MCPTaskManagerInterface.start: guide absent source "Creates — or returns the existing — durable task for one stable operation key."
guides/mcp.md MCPTaskManagerInterface.task: guide absent source "Reads one task's current snapshot."
guides/mcp.md MCPTaskManagerInterface.update: guide absent source "Answers the input requests an `input_required` task is waiting on."
guides/mcp.md MCPTaskManagerInterface.abort: guide absent source "Asks one task to stop."
guides/mcp.md MCPResourceManagerInterface.resources: guide absent source "Reads one resource page."
guides/mcp.md MCPResourceManagerInterface.resource: guide absent source "Reads one concrete resource URI."
guides/mcp.md MCPResourceManagerInterface.templates: guide absent source "Reads one resource-template page."
guides/mcp.md MCPPromptManagerInterface.prompts: guide absent source "Reads one prompt page."
guides/mcp.md MCPPromptManagerInterface.prompt: guide absent source "Resolves one named prompt."
guides/mcp.md MCPCompletionInterface.complete: guide absent source "Completes one argument against its host-owned reference."
guides/mcp.md MCPClientInterface.connect: guide absent source "Connects to the remote server — opens a connection on the transport and negotiates the modern wire revision."
guides/mcp.md MCPClientInterface.discover: guide absent source "Discovers a modern server's supported revisions and capabilities."
guides/mcp.md MCPClientInterface.disconnect: guide absent source "Disconnects from the remote server — rejects every pending request and closes the connection this client opened on its transport."
guides/mcp.md MCPClientInterface.tools: guide absent source "Lists the remote server's tools, each wrapped as a local `ToolInterface` whose `execute` runs the remote `tools/call` through `call`."
guides/mcp.md MCPClientInterface.listen: guide absent source "Listens for the remote server's matching subscription notifications."
guides/mcp.md MCPClientInterface.call: guide absent source "Calls a remote tool by name — runs `tools/call` and reports which permitted arm the peer answered with."
guides/mcp.md MCPTaskClientInterface.task: guide absent source "Reads one durable task's current snapshot."
guides/mcp.md MCPTaskClientInterface.update: guide absent source "Answers the input requests an `input_required` task is waiting on."
guides/mcp.md MCPTaskClientInterface.abort: guide absent source "Asks one durable task to stop."
guides/mcp.md MCPMessageTransportInterface.start: guide absent source "Opens the transport — establishes the connection and arms any reply reader."
guides/mcp.md MCPMessageTransportInterface.send: guide absent source "Sends one JSON-RPC message to the remote server."
guides/mcp.md MCPMessageTransportInterface.close: guide absent source "Closes the transport — ends the connection and releases resources."
guides/mcp.md HTTPDisconnect.bridge: guide absent source "Bridges one open SSE response through cancellation-aware byte forwarding and keepalives. Consumer cancellation, a read failure while forwarding, and a keepalive tick that finds the SSE stream already closed each abort `signal`; consumer cancellation also cancels the upstream reader. Upstream completion closes the returned body without inventing an abort. Every terminal path clears the keepalive timer and detaches the bridge-owned abort listener."
guides/mcp.md MCPSessionInterface.attach: guide absent source absent
guides/mcp.md MCPSessionInterface.detach: guide absent source absent
guides/mcp.md MCPSessionInterface.push: guide absent source absent
guides/mcp.md MCPSessionInterface.replay: guide absent source absent
guides/mcp.md StdioServerInterface.start: guide absent source absent
guides/mcp.md StdioServerInterface.stop: guide absent source absent
guides/mcp.md ScopeServerInterface.stop: guide absent source "Ends every binding this scope server owns — idempotent, and permanent for this handle."
guides/mcp.md pitch: readme absent tagline "The Model Context Protocol layer — a typed JSON-RPC 2.0 client/server pair with pluggable HTTP, WebSocket, stdio, and browser transports. Ingress: `createMCPServer` wraps a live `ToolManagerInterface` (`@orkestrel/tool`) as an MCP server any MCP client can drive, and projects further host-owned registries — `resources` and `prompts` — plus a `completion` provider, each over a port this package defines and does not implement. Egress: `createMCPClient` drives a remote MCP server and surfaces its tools as local `ToolInterface`s an agent can call as if they were its own. Requests are dispatched by structural wire era — a modern request resolves from a registrable method seam carrying the built-in `server/discover`, `tools/list`, `tools/call`, and `subscriptions/listen`, plus `resources/*`, `prompts/*`, and `completion/complete` for each port a consumer configured. The dated revisions are an OPTIONAL decorator over that one engine — `createMCPLegacy(mcp)` translates a fixed `initialize` / `ping` / `tools/list` / `tools/call` set onto it and the server itself holds no era branch. See Protocol, Compose or remove the legacy protocol layer, and Project a host-owned resource, prompt, and completion registry. The dispatch core is transport-agnostic and provider-agnostic. `MCPServer` and `MCPClient` live in `src/core` and import only siblings — JSON-RPC types, `@orkestrel/tool`'s tool registry, `@orkestrel/emitter`'s observable surface, `@orkestrel/contract`'s guards, `@orkestrel/codec`'s Base64 coding. No HTTP, no WebSocket, no stdio, and no `as`: every value off the wire is narrowed by a total guard. The server's entry points are `dispatch` and `handle` — `dispatch` runs an already-parsed `JSONRPCInvocation`, resolving a `JSONRPCResponse` for a `JSONRPCRequest` and `undefined` for a `JSONRPCNotification` (its overloads say exactly that, so neither caller handles the other's answer), and `handle(message)` is the string boundary that wraps it with `JSON.parse` / `JSON.stringify` plus the parse (`-32700`) and invalid-request (`-32600`) mapping, each of whose envelopes OMITS the `id` it could not read. The client mirrors it: `connect` negotiates the modern revision, `tools()` exposes the remote tools as local `ToolInterface`s, and `call` runs one — a remote failure throws locally, so an agent's `ToolManager` isolates it exactly like a local throw. A remote JSON-RPC error rejects with `MCPError`, preserving its numeric `code` and optional `error.data` as `context`. The wire lives ONE layer out. `src/server` carries the Node transports and `src/browser` the browser face. Each is a matched ingress/egress pair speaking the same `MCPServerInterface` / `MCPMessageTransportInterface`; only the framing differs: Every transport is mechanism, not policy. Auth, invocation rate limiting, and body-size guards compose IN FRONT as ordinary `@orkestrel/server` middleware. HTTP ingress supplies only the protocol-required origin gate, on by default: a request without `Origin` passes; a canonical `localhost`, `[::1]`, or `127.0.0.0/8` literal origin passes; every other present origin must occur in the shared `origin.origins` list; and a deployment that validates upstream delegates with `origin.enabled: false`. What this package deliberately does not build is listed under Declared non-goals; the obligations it does not meet are under Declared conformance gaps. Observable. The `MCPServer` owns an `emitter` firing `request` per dispatch; the `MCPClient` owns one firing `connect` / `disconnect` / `notification` / `error`; every transport owns one firing `message` / `close` / `error`."
rows read: 1, disagreements found: 458
```

## Deviation state

None. `repair` wrote the P21 list and nothing else, every before-text was found verbatim, no voice
diagnostic named an off-limits file, `test:policy` reddened only on `guides/mcp.md` lines this unit
owns, and every gate other than `docs` reads green. `docs` reads red as the brief expects; that
worklist is the converge unit's.

Instruments are under `/home/user/fleet/mcp/tmp/d7n-mcp-prep/` (`adapt.py`, `terms.py`, `voice.py`,
`guide.py`, and the gate logs). Nothing was committed, installed, or discarded.
