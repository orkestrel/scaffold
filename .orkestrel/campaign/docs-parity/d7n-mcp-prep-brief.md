# Brief — P.1 `d7n-mcp-prep` (mcp's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/mcp` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9096437`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

mcp's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== mcp 2026-09-07T16:43:46Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
109:		"@orkestrel/guide": "^0.0.17",
== install

removed 28 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### mcp (9096437, version 0.0.28, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 40 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupConformance.ts(54)
   tests/setup.ts(42)
   tests/setupServer.ts(25)
   tests/fixtures/browserServer.ts(10)
   src/core/types.ts(7)
   tests/src/server/middlewares.test.ts(6)
   tests/src/core/MCPServer.test.ts(5)
   tests/src/server/integration.test.ts(4)
   tests/src/core/MCPClient.test.ts(4)
   tests/setupBrowser.ts(4)
   tests/conformance.test.ts(4)
   tests/src/server/factories.test.ts(3)
   tests/setupGlobal.ts(3)
   src/core/MCPClient.ts(3)
   tests/src/core/parsers.test.ts(1)
   tests/guides.test.ts(1)
   tests/conformanceClient.ts(1)
   src/server/handlers.ts(1)
   src/server/HTTPDisconnect.ts(1)
   src/core/MCPTextStreamController.ts(1)
   src/core/MCPServer.ts(1)
   src/browser/transports/WebSocketClientTransport.ts(1)
   src/browser/factories.ts(1)
-- docs
   guides/mcp.md const DEFAULT_MCP_SERVER_NAME: guide absent source "Supplies the default server name `createScopeServer` reports (`initialize`'s `serverInfo.name`) when `options.name` is omitted."
   guides/mcp.md const DEFAULT_MCP_SERVER_VERSION: guide absent source "Supplies the default server version `createScopeServer` reports (`initialize`'s `serverInfo.version`) when `options.version` is omitted."
   guides/mcp.md interface MessagePortTransportOptions: guide absent source "Options for `createMessagePortTransport` — the native `MessagePort` a `MessagePortTransport` sends and listens on."
   guides/mcp.md interface ScopeInterface: guide absent source "Describes the structural shape `import('./factories.js').createScopeServer` needs from a hostable scope — `self` in a dedicated Web Worker or a Service Worker (or any double matching this shape)."
   guides/mcp.md interface ScopeTransportInterface: guide absent source "Adapts a message-event-bearing SCOPE (`self` in a dedicated Web Worker, or any object shaped the same way) as a duplex `MCPTransportInterface` — the internal carrier `createScopeServer` binds to route the implicit (portless) message channel, plus the `deliver` entry point the scope's own `message` listener pushes an inbound string through (the scope itself never registers `listen`'s handler for the caller — the scope server's dispatcher does, through this `deliver`)."
   guides/mcp.md interface ScopeServerInterface: guide absent source "Represents one MCP server hosted inside a worker scope — what `import('./factories.js').createScopeServer` returns."
   guides/mcp.md interface ScopeServerOptions: guide absent source "Options for `import('./factories.js').createScopeServer` — the live `ToolManagerInterface` to expose plus the optional server identity, mirroring `createMCPServer`'s `MCPServerOptions` (`@orkestrel/mcp`) but with `name`/`version` OPTIONAL (defaulting to `import('./constants.js').DEFAULT_MCP_SERVER_NAME` / `import('./constants.js').DEFAULT_MCP_SERVER_VERSION`)."
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
   exit 1
-- check
   tests/guides.test.ts(630,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(633,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(637,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(652,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(667,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 65 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  65 failed | 95 passed (160)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 262ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(12) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(12) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 183 | summary 132 | banned 51 | tests/setupConformance.ts(54) tests/setup.ts(42) tests/setupServer.ts(25) tests/fixtures/browserServer.ts(10) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+605,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+1132,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+1293,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/mcp.md"
+4452,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4457,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4469,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4470,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4474,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/mcp.md"
+4481,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4508,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4509,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+4593,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
+5447,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/mcp.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for mcp (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/mcp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9096437`, status: clean
- `package.json`: version `0.0.28`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 183 | summary 132 | banned 51 | tests/setupConformance.ts(54) tests/setup.ts(42) tests/setupServer.ts(25) tests/fixtures/browserServer.ts(10) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec               | Source                                                                                    | Tests                                                                                                                         |
    8:| ------- | ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
    9:| MCP     | [`mcp.md`](mcp.md) | [`src/core`](../src/core), [`src/server`](../src/server), [`src/browser`](../src/browser) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server), [`tests/src/browser`](../tests/src/browser) |
    13:| Directory     | Guide              |
    14:| ------------- | ------------------ |
    15:| `src/core`    | [`mcp.md`](mcp.md) |
    16:| `src/server`  | [`mcp.md`](mcp.md) |
    17:| `src/browser` | [`mcp.md`](mcp.md) |
- Guide `guides/mcp.md`: 5452 lines. Headings:
    1:# MCP
    78:## Protocol
    281:## Surface
    331:### Narrow a message to its JSON-RPC arm
    399:### Register a modern method on the seam
    559:### Project a host-owned resource, prompt, and completion registry
    773:### Adapt an existing registry behind a port
    889:### Configure modern subscriptions
    1032:### Consume a subscription from a client
    1118:### Execute rich results and request-scoped progress
    1311:### Ask the client for input during the call in hand
    1588:### Defer a call to a durable task
    1800:### Bound hostile input and live resources
    1858:### Bind an `MCPServer` / `MCPClient` to any duplex transport
    1926:### Compose or remove the legacy protocol layer
    2057:### Adapt a legacy peer at the client transport boundary
    2122:### Factories
    2132:### Entities
    2148:### Constants
    2191:### Helpers
    2328:### Types
    2492:### HTTP transport
    2525:#### Carry asserted caller context from HTTP middleware
    2665:#### Factories
    2676:#### Entities
    2686:#### Constants
    2698:#### Helpers
    2723:#### Types
    2743:### WebSocket transport
    2809:#### Factories
    2816:#### Entities
    2823:#### Constants
    2829:#### Helpers
    2833:#### Types
    2840:### stdio transport
    2980:#### Factories
    2987:#### Entities
    2994:#### Constants
    3000:#### Helpers
    3004:#### Types
    3014:### Browser transport
    3121:#### Factories
    3132:#### Entities
    3139:#### Constants
    3146:#### Helpers
    3151:#### Types
    3165:## Methods
    3189:#### `MCPDispatcherInterface`
    3206:#### `MCPServerInterface`
    3270:#### `MCPProgressInterface`
    3276:#### `MCPProgressOwnerInterface`
    3291:#### `MCPProgressReporter`
    3304:#### `MCPStreamControllerInterface`
    3333:#### `MCPTextStreamControllerInterface`
    3351:#### `MCPMethodManagerInterface`
    3381:#### `MCPTaskManagerInterface`
    3402:#### `MCPResourceManagerInterface`
    3417:#### `MCPPromptManagerInterface`
    3433:#### `MCPCompletionInterface`
    3442:#### `MCPClientInterface`
    3491:#### `MCPTaskClientInterface`
    3553:#### `MCPMessageTransportInterface`
    3640:#### `HTTPDisconnect`
    3669:#### `MCPSessionInterface`
    3698:#### `StdioServerInterface`
    3726:#### `ScopeServerInterface`
    3747:## Patterns
    3749:### Expose a tool registry over MCP
    3776:### Drive the typed core directly
    3800:### Mount the HTTP transport with sessions
    3822:### Drive a remote server over HTTP, WebSocket, or stdio
    3851:### Build response envelopes and validate wire messages directly
    3884:### Route a request by era and build a modern result
    3978:### Read HTTP request headers and decode SSE bodies directly
    4052:### Frame newline-delimited JSON-RPC over stdio directly
    4066:### Serve MCP from a Web Worker
    4159:### Own bounded execution values and one streamed HTTP response
    4200:## Tests
    4222:## Declared non-goals
    4292:## Declared conformance gaps
    4658:## Declared packaging limits
    4716:## Contract
- Table headers in `guides/mcp.md` (a header row is the row before a `| ---` row):
    84: | Revision     | Era    | How a request announces it                                                                |
    566: | Option       | Port                          | Methods it registers                                           | Capability advertised |
    1697: | Method         | Params                       | Answers                                                                                                |
    1757: |                       | MRTR `resultType: 'input_required'`                           | `MCPTaskStatus` `'input_required'`                  |
    1781: | Obligation                               | The consequence of violating it                                                                                                                                                                                                                                                         |
    2015: | Survivor                | What consumes it after the layer is deleted                                                                                                                                                   |
    2042: | A legacy `tools/call` whose …      | Answered before                                     | Answers now                                            |
    2124: | API                              | Kind     | Summary                                                                                                                                                                              |
    2134: | API                        | Kind  | Summary                                                                                                                                                                                                                                                                               |
    2150: | Constant                             | Kind  | Value                                                                                                                                                                                                                                                                                                  |
    2193: | API                                | Kind     | Summary                                                                                                                                                                                                                                                                                                                 |
    2330: | Type                               | Kind      | Shape                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
    2667: | API                           | Kind     | Summary                                                                                                                                                                                                                       |
    2678: | API              | Kind  | Summary                                                                                                                                                                                                 |
    2688: | Constant                         | Kind  | Value                                                                                                                         |
    2700: | API                       | Kind     | Summary                                                                                                                                                                                                               |
    2725: | Type                          | Kind      | Shape                                                                                                                                                                                                                            |
    2811: | API                              | Kind     | Summary                                                                                                                                                                                                           |
    2818: | API                        | Kind  | Summary                                                                                                                                        |
    2835: | Type                              | Kind      | Shape                                                                                                                                                                                                                                             |
    2982: | API                          | Kind     | Summary                                                                                                                                                                                                                                                                                             |
    2989: | API                    | Kind  | Summary                                                                                                                     |
    2996: | Constant               | Kind  | Value                                                                                                                                                                   |
    3006: | Type                            | Kind      | Shape                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
    3123: | API                              | Kind     | Summary                                                                                                                                                                                                                                                                                                             |
    3134: | API                        | Kind  | Summary                                                                                                                                                                          |
    3141: | Constant                     | Kind  | Value                                                                                                |
    3153: | Type                              | Kind      | Shape                                                                                                                                                                                                                                                         |
    3201: | Method     | Returns                                                                 | Behavior                                                                                                                                                                                                       |
    3220: | Method     | Returns                                                                 | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
    3272: | Method   | Returns         | Behavior                                                                  |
    3285: | Method   | Returns                        | Behavior                                                                                          |
    3298: | Method   | Returns                        | Behavior                                                                                          |
    3317: | Method   | Returns                                                         | Behavior                                                                                                                                                                                                                                                        |
    3344: | Method   | Returns                                   | Behavior                                                                                                                                      |
    3361: | Method   | Returns                         | Behavior                                                                                                                            |
    3395: | Method   | Returns                               | Behavior                                                                                                                                                                                                                        |
    3411: | Method      | Returns                                                                        | Behavior                                                                                                                                                                                                                                                                                                  |
    3428: | Method    | Returns                                                            | Behavior                                                                                                                                                                                                                                              |
    3438: | Method     | Returns                                     | Behavior                                                                                                                                                                                                                                                                                                                                  |
    3453: | Method       | Returns                             | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
    3500: | Method   | Returns                  | Behavior                                                                                                                                                                                                                                                                |
    3559: | Method  | Returns         | Behavior                                                                                                                                                                                                                                                                                                                                               |
    3656: | Method   | Returns    | Behavior                                                                                                                                                                                                                                                                                                                                                                             |
    3677: | Method   | Returns                      | Behavior                                                                                                                                       |
    3706: | Method  | Returns | Behavior                                                                                                                                                                                                                            |
    3734: | Method | Returns | Behavior                                                                                                                                                                                                                           |
    4230: | Not built                                                               | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
- Rows of any `### Entities` table (the Kind cell):
    2136:  `MCPServer`                | class
    2137:  `MCPLegacy`                | class
    2138:  `MCPLegacyClientTransport` | class
    2139:  `MCPMethodManager`         | class
    2140:  `MCPProgressReporter`      | class
    2141:  `MCPStreamController`      | class
    2142:  `MCPTextStreamController`  | class
    2143:  `MCPClient`                | class
    2144:  `MCPTaskClient`            | class
    2145:  `HTTPClientTransport`      | class
    2146:  `MCPError`                 | class
- H1 blockquote (`guides/mcp.md`):
    3: > The [Model Context Protocol](https://modelcontextprotocol.io) layer — a typed
    4: > JSON-RPC 2.0 client/server pair with pluggable HTTP, WebSocket, stdio, and
    5: > browser transports.
    6: >
    7: > **Ingress:** `createMCPServer` wraps a live `ToolManagerInterface`
    8: > (`@orkestrel/tool`) as an MCP server any MCP client can drive, and projects
    9: > further host-owned registries — `resources` and `prompts` — plus a `completion`
    10: > provider, each over a port this package defines and does not implement. **Egress:**
    11: > `createMCPClient` drives a _remote_ MCP server and surfaces its tools as local
    12: > `ToolInterface`s an agent can call as if they were its own. Requests are
    13: > dispatched by structural wire era — a modern request resolves from a registrable
    14: > method seam carrying the built-in `server/discover`, `tools/list`, `tools/call`,
    15: > and `subscriptions/listen`, plus `resources/*`, `prompts/*`, and
    16: > `completion/complete` for each port a consumer configured. The dated revisions
    17: > are an OPTIONAL decorator over that one engine — `createMCPLegacy(mcp)` translates a
    18: > fixed `initialize` / `ping` / `tools/list` / `tools/call` set onto it and the server
    19: > itself holds no era branch. See [Protocol](#protocol),
    20: > [Compose or remove the legacy protocol layer](#compose-or-remove-the-legacy-protocol-layer), and
    21: > [Project a host-owned resource, prompt, and completion registry](#project-a-host-owned-resource-prompt-and-completion-registry).
    22: >
    23: > **The dispatch core is transport-agnostic and provider-agnostic.** `MCPServer`
    24: > and `MCPClient` live in [`src/core`](../src/core) and import only siblings —
    25: > JSON-RPC types, `@orkestrel/tool`'s tool registry, `@orkestrel/emitter`'s
    26: > observable surface, `@orkestrel/contract`'s guards, `@orkestrel/codec`'s Base64
    27: > coding. No HTTP, no WebSocket, no stdio, and no `as`: every value off the wire is
    28: > narrowed by a total guard. The
    29: > server's entry points are `dispatch` and `handle` — `dispatch` runs an already-parsed
    30: > `JSONRPCInvocation`, resolving a `JSONRPCResponse` for a `JSONRPCRequest` and
    31: > `undefined` for a `JSONRPCNotification` (its overloads say exactly that, so
    32: > neither caller handles the other's answer), and `handle(message)` is the string
    33: > boundary that wraps it with `JSON.parse` / `JSON.stringify` plus the parse
    34: > (`-32700`) and invalid-request (`-32600`) mapping, each of whose envelopes OMITS
    35: > the `id` it could not read. The client mirrors it: `connect` negotiates the modern revision, `tools()`
    36: > exposes the remote tools as local `ToolInterface`s, and `call` runs one — a
    37: > remote failure throws locally, so an agent's `ToolManager` isolates it exactly
    38: > like a local throw. A remote JSON-RPC error rejects with `MCPError`, preserving
    39: > its numeric `code` and optional `error.data` as `context`.
    40: >
    41: > **The wire lives ONE layer out.** [`src/server`](../src/server) carries the
    42: > Node transports and [`src/browser`](../src/browser) the browser face.
    43: > Each is a matched ingress/egress pair speaking the same `MCPServerInterface` /
    44: > `MCPMessageTransportInterface`; only the framing differs:
    45: >
    46: > - **Streamable HTTP** — `createMCPRoutes` mounts a server as `POST {path}` (JSON
    47: >   or SSE per the client's `Accept`, using `@orkestrel/server`'s `createStream`); the
    48: >   opt-in `createMCPSession` middleware adds native stateful sessions and a
    49: >   resumable server→client SSE channel. `createHTTPClientTransport` is the
    50: >   injectable-`fetch` egress.
    51: > - **WebSocket** — `createWebSocketServer` claims an upgrade on
    52: >   `@orkestrel/server`'s upgrade seam, composing `@orkestrel/websocket`'s RFC 6455
    53: >   wrapper for full duplex over one persistent connection, and closes every socket
    54: >   it claimed when that spine stops. `createWebSocketClientTransport` is the
    55: >   `node:http(s)`-upgrade egress.
    56: > - **stdio** — `createStdioServer` pumps newline-delimited JSON-RPC over a
    57: >   process's `stdin`/`stdout` (or injected streams); `createStdioClientTransport`
    58: >   spawns a child process and drives the same protocol over its piped stdio.
    59: > - **browser** — the page / Web Worker / Service Worker face: its own
    60: >   `WebSocket` client transport over the native global, the SAME core HTTP client
    61: >   transport the Node face returns, plus the symmetric
    62: >   `MessagePort` carrier and the `createScopeServer` worker bootstrap.
    63: >
    64: > **Every transport is mechanism, not policy.** Auth, invocation rate limiting, and
    65: > body-size guards compose IN FRONT as ordinary `@orkestrel/server` middleware.
    66: > HTTP ingress supplies only the protocol-required origin gate, on by default: a
    67: > request without `Origin` passes; a canonical `localhost`, `[::1]`, or `127.0.0.0/8`
    68: > literal origin passes; every other present origin must occur in the shared
    69: > `origin.origins` list; and a deployment that validates upstream delegates with
    70: > `origin.enabled: false`. What this package deliberately does not build is listed
    71: > under [Declared non-goals](#declared-non-goals); the obligations it does not meet
    72: > are under [Declared conformance gaps](#declared-conformance-gaps).
    73: >
    74: > **Observable.** The `MCPServer` owns an `emitter` firing `request` per dispatch;
    75: > the `MCPClient` owns one firing `connect` / `disconnect` / `notification` /
    76: > `error`; every transport owns one firing `message` / `close` / `error`.
- Opening prose after the blockquote (first two lines):
    78: ## Protocol
    80: The layer speaks its dated revisions across the modern and legacy wire **eras**, on one
- README (`README.md`) first lines:
    # @orkestrel/mcp
    
    A typed [Model Context Protocol](https://modelcontextprotocol.io) client/server
    for the `@orkestrel` line, bridging the `@orkestrel/tool` registry to MCP with
    pluggable HTTP, WebSocket, and stdio transports. `createMCPServer` exposes a
    live `ToolManagerInterface`; `createMCPClient` drives a remote MCP server and
    surfaces its tools as local `ToolInterface`s. No agent runtime is required.
    The dispatch core is transport- and provider-agnostic
    (`src/core` — JSON-RPC 2.0, no HTTP, no `as`); every transport (Streamable
    HTTP over `@orkestrel/router` / `@orkestrel/server`, WebSocket over
    `@orkestrel/websocket`, and stdio over `@orkestrel/process`) lives one layer
    out (`src/server`), each mechanism, not policy. Part of the `@orkestrel` line.
- `## Patterns` fences, each with its nearest preceding heading:
    163: fence under "## Protocol"
    174: fence under "## Protocol"
    286: fence under "## Surface"
    348: fence under "### Narrow a message to its JSON-RPC arm"
    408: fence under "### Register a modern method on the seam"
    449: fence under "### Register a modern method on the seam"
    499: fence under "### Register a modern method on the seam"
    648: fence under "### Project a host-owned resource, prompt, and completion registry"
    727: fence under "### Project a host-owned resource, prompt, and completion registry"
    811: fence under "### Adapt an existing registry behind a port"
    917: fence under "### Configure modern subscriptions"
    997: fence under "### Configure modern subscriptions"
    1078: fence under "### Consume a subscription from a client"
    1177: fence under "### Execute rich results and request-scoped progress"
    1223: fence under "### Execute rich results and request-scoped progress"
    1349: fence under "### Ask the client for input during the call in hand"
    1517: fence under "### Ask the client for input during the call in hand"
    1622: fence under "### Defer a call to a durable task"
    1824: fence under "### Bound hostile input and live resources"
    1867: fence under "### Bind an `MCPServer` / `MCPClient` to any duplex transport"
    1955: fence under "### Compose or remove the legacy protocol layer"
    2073: fence under "### Adapt a legacy peer at the client transport boundary"
    2089: fence under "### Adapt a legacy peer at the client transport boundary"
    2512: fence under "### HTTP transport"
    2532: fence under "#### Carry asserted caller context from HTTP middleware"
    2790: fence under "### WebSocket transport"
    2955: fence under "### stdio transport"
    3103: fence under "### Browser transport"
    3236: fence under "#### `MCPServerInterface`"
    3324: fence under "#### `MCPStreamControllerInterface`"
    3366: fence under "#### `MCPMethodManagerInterface`"
    3475: fence under "#### `MCPClientInterface`"
    3506: fence under "#### `MCPTaskClientInterface`"
    3620: fence under "#### `MCPMessageTransportInterface`"
    3660: fence under "#### `HTTPDisconnect`"
    3684: fence under "#### `MCPSessionInterface`"
    3711: fence under "#### `StdioServerInterface`"
    3738: fence under "#### `ScopeServerInterface`"
    3754: fence under "### Expose a tool registry over MCP"
    3781: fence under "### Drive the typed core directly"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/handlers.ts:70:export function createMCPPostHandler<TState = unknown>(
    src/server/factories.ts:45:export function createMCPContinuation(secret: TokenSecret): MCPContinuationInterface {
    src/server/factories.ts:110:export function createDuplexServerTransport(
    src/server/factories.ts:195:export function createMCPRoutes<TState = unknown>(
    src/server/factories.ts:249:export function createHTTPClientTransport(
    src/server/factories.ts:309:export function createWebSocketServer(
    src/server/factories.ts:402:export function createWebSocketClientTransport(
    src/server/factories.ts:445:export function createStdioClientTransport(
    src/server/factories.ts:484:export function createStdioServer(
    src/server/middlewares.ts:93:export function createMCPSession<TState extends MCPSessionState>(
    src/browser/factories.ts:52:export function createWebSocketClientTransport(
    src/browser/factories.ts:102:export function createHTTPClientTransport(
    src/browser/factories.ts:135:export function createMessagePortTransport(
    src/browser/factories.ts:174:export function createScopeServer(
    src/browser/factories.ts:247:export function createScopeMessageListener(
    src/browser/factories.ts:300:export function createScopeTransport(scope: ScopeInterface): ScopeTransportInterface {
    src/core/factories.ts:59:export function createMCPServer(options: MCPServerOptions): MCPServerInterface {
    src/core/factories.ts:69:export function createMCPLegacy(server: MCPServerInterface): MCPDispatcherInterface {
    src/core/factories.ts:109:export function createMCPClient(options: MCPClientOptions): MCPClientInterface {
    src/core/factories.ts:128:export function createMCPLegacyClientTransport(
    src/core/factories.ts:169:export function createDuplexClientTransport(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/transports/WebSocketServerTransport.ts:49:export class WebSocketServerTransport implements MCPMessageTransportInterface {
    src/server/transports/WebSocketClientTransport.ts:76:export class WebSocketClientTransport implements MCPMessageTransportInterface {
    src/server/transports/StdioClientTransport.ts:68:export class StdioClientTransport implements StdioClientTransportInterface {
    src/server/transports/StdioServerTransport.ts:49:export class StdioServerTransport implements MCPMessageTransportInterface {
    src/server/HTTPDisconnect.ts:41:export class HTTPDisconnect {
    src/server/MCPSession.ts:62:export class MCPSession implements MCPSessionInterface {
    src/browser/transports/WebSocketClientTransport.ts:58:export class WebSocketClientTransport implements MCPMessageTransportInterface {
    src/browser/transports/MessagePortTransport.ts:68:export class MessagePortTransport implements MCPTransportInterface {
    src/core/MCPTaskClient.ts:47:export class MCPTaskClient implements MCPTaskClientInterface {
    src/core/transports/HTTPClientTransport.ts:89:export class HTTPClientTransport implements MCPMessageTransportInterface {
    src/core/MCPProgressReporter.ts:34:export class MCPProgressReporter implements MCPProgressOwnerInterface {
    src/core/MCPMethodManager.ts:26:export class MCPMethodManager implements MCPMethodManagerInterface {
    src/core/MCPLegacyClientTransport.ts:52:export class MCPLegacyClientTransport implements MCPMessageTransportInterface {
    src/core/MCPClient.ts:129:export class MCPClient implements MCPClientInterface {
    src/core/MCPLegacy.ts:47:export class MCPLegacy implements MCPDispatcherInterface {
    src/core/MCPTextStreamController.ts:43:export class MCPTextStreamController implements MCPTextStreamControllerInterface {
    src/core/MCPStreamController.ts:47:export class MCPStreamController implements MCPStreamControllerInterface {
    src/core/MCPServer.ts:157:export class MCPServer implements MCPServerInterface {
    src/core/errors.ts:24:export class MCPError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/handlers.ts:1
    src/server/inferers.ts:4
    src/server/transports/WebSocketClientTransport.ts:1
    src/server/transports/StdioClientTransport.ts:1
    src/server/factories.ts:7
    src/server/HTTPDisconnect.ts:1
    src/server/helpers.ts:2
    src/server/MCPSession.ts:1
    src/server/middlewares.ts:1
    src/browser/transports/WebSocketClientTransport.ts:1
    src/browser/transports/MessagePortTransport.ts:1
    src/browser/factories.ts:6
    src/core/MCPTaskClient.ts:1
    src/core/inferers.ts:2
    src/core/cloners.ts:2
    src/core/transports/HTTPClientTransport.ts:1
    src/core/validators.ts:36
    src/core/factories.ts:4
    src/core/helpers.ts:25
    src/core/MCPProgressReporter.ts:1
    src/core/MCPMethodManager.ts:1
    src/core/MCPClient.ts:1
    src/core/MCPTextStreamController.ts:1
    src/core/MCPStreamController.ts:1
    src/core/MCPServer.ts:1
    src/core/parsers.ts:2
    src/core/types.ts:4
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    48:} from '@orkestrel/guide'
    80:const ROOT_FILES = Object.freeze(['AGENTS.md', 'README.md'])
    113:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    622:		for (const group of guide.methods()) {
    623:			const members = source.methods(group.interface)
    630:					expect(findMissing(members, group.methods)).toEqual([])
    633:					expect(findMissing(group.methods, members)).toEqual([])
    637:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    652:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    655:		for (const group of guide.methods()) {
    665:							? source.examples(group.interface)
    666:							: source.examples(group.interface).concat(source.examples(entity))
    667:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
- `## Tests` paragraph naming checks: 4200:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.28"` → `"version": "0.0.29"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-mcp-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
