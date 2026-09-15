<!-- journal: tmp/cursor/G2-mcp.jsonl | session: c766787e-0d6b-4487-933b-17067bafdbf4 | subtype: success | duration_ms: 249575 | events: 858 -->

I'll read the brief and the required orchestration files, then execute it exactly as specified.I'll absorb the MCP checkout in the brief's order, starting with core types and barrels.Core types is large, so I’ll pull transport contracts and the MCPServer/MCPClient surfaces next.Next I’ll pull MCPServer/MCPClient method surfaces, transport constructors, and the browser in-page pairing evidence.Question: Under the contracts published today, what does `@orkestrel/mcp` publish for its core, browser, and server environments; which transports exist in each; and can an `MCPServer` and an `MCPClient` both live in one browser page (or a page and its worker) and exchange calls with no network hop?

Evidence:

1. Transport contracts (`mcp/src/core/types.ts`)
- No session-side transport in this file. Session is `MCPSessionInterface` in `mcp/src/server/types.ts:229`.
- Message value on the duplex port is a serialized JSON-RPC **string**. Message value on the client carrier is `JSONRPCMessage` (`JSONRPCRequest | JSONRPCNotification | JSONRPCResponse`, `types.ts:41–144`).
- `MCPTransportInterface` `types.ts:2392–2401` — environment-agnostic duplex port for `bindServer` / `bindClient`:
  - `readonly send: (message: string) => void | Promise<void>`
  - `readonly listen: (handler: (message: string) => void) => void`
  - `readonly closed: (handler: () => void) => void`
  - `readonly close: () => void | Promise<void>`
  - Lifecycle: no `start`. `listen`/`closed` are single-handler replace. Framing is the transport’s; parsing is core’s.
- `MCPMessageTransportEventMap` `types.ts:2429–2436`: `message: readonly [message: JSONRPCMessage]`, `close: readonly []`, `error: readonly [error: unknown]`.
- `MCPMessageTransportInterface` `types.ts:2453–2538` — client (and server WS/stdio) JSON-RPC carrier:
  - `readonly emitter: EmitterInterface<MCPMessageTransportEventMap>`
  - `readonly session: string | undefined`
  - `readonly duplex: boolean`
  - `start(): Promise<void>`
  - `send(message: JSONRPCMessage): Promise<void>`
  - `close(): Promise<void>`
- `HTTPClientTransportOptions` `types.ts:2562–2567`: `readonly url: string; readonly headers?: Readonly<Record<string, string>>; readonly fetch?: typeof fetch; readonly timeout?: number`
- `MCPLegacyClientTransportOptions` `types.ts:2585–2594`: `identity?`, `capabilities?`, `version?: MCPLegacyVersion`, `timeout?`

2. Concrete transports
- Core `HTTPClientTransport` `src/core/transports/HTTPClientTransport.ts:89` — core (host-independent). Client only (`MCPMessageTransportInterface`). Wraps `fetch`. `constructor(options: HTTPClientTransportOptions)` `:113`. `duplex` is `false` `:129–132`.
- Core `MCPLegacyClientTransport` `src/core/MCPLegacyClientTransport.ts:52` — core. Client adapter (`MCPMessageTransportInterface`) wrapping another `MCPMessageTransportInterface`. `constructor(transport: MCPMessageTransportInterface, options?: MCPLegacyClientTransportOptions)` `:71`. Factory `createMCPLegacyClientTransport` `src/core/factories.ts:147`.
- Browser `MessagePortTransport` `src/browser/transports/MessagePortTransport.ts:68` — browser. **Both** ends (`MCPTransportInterface`); role is which binder. Wraps `MessagePort`. `constructor(options: MessagePortTransportOptions)` `:75` (`{ port: MessagePort }`, `src/browser/types.ts:63`). Factory `createMessagePortTransport` `src/browser/factories.ts:135`.
  - A pair **can** be built from one `MessageChannel`: `port1` to `bindServer`, `port2` to `createDuplexClientTransport` + `bindClient` (class example `MessagePortTransport.ts:59–65`; factory example `factories.ts:130–132`).
  - Factory that builds it: `createMessagePortTransport`. Client adapter: `createDuplexClientTransport` `src/core/factories.ts:188`.
  - `tests/src/browser/transports/MessagePortTransport.test.ts:14` describe is `MessagePortTransport — the port contract over a real MessageChannel`. Its `it`s cover non-string drop, string delivery, close, listener replace, `messageerror` — **not** a full `MCPServer`+`MCPClient` pair.
  - In-page pair (Playwright page, real `MessageChannel`, no network): `tests/src/browser/factories.test.ts:459` `createMessagePortTransport — a symmetric MCPTransportInterface over a real MessageChannel`, scenario `connect → tools/list → tools/call(add): a value round-trips over port1/port2` `:460`.
  - `tests/fixtures/browserServer.ts:208` `start()`: **Node** `@orkestrel/server` on `127.0.0.1`, `createMCPRoutes` + `createMCPSession` + `createWebSocketServer` over a calculator `MCPServer`, plus `/broken`, `/headers`, `/recorded`, CORS. Browser tests are the **client**; this fixture is a **remote Node server** (network hop).
- Browser `WebSocketClientTransport` `src/browser/transports/WebSocketClientTransport.ts:58` — browser. Client only. Wraps native `WebSocket`. `constructor(options: WebSocketClientTransportOptions)` `:76` (`{ url, protocols? }`). `duplex` `true` `:101`. Factory `createWebSocketClientTransport` `src/browser/factories.ts:52`.
- Browser `createScopeTransport` `src/browser/factories.ts:300` — not a class under `transports/`. Implements `ScopeTransportInterface` (`MCPTransportInterface` + `deliver`). Wraps `ScopeInterface` (`postMessage` / `message` events). Used by `createScopeServer` for the implicit worker channel.
- Server `WebSocketServerTransport` `src/server/transports/WebSocketServerTransport.ts:49` — server. Server-side (`MCPMessageTransportInterface`, then `createDuplexServerTransport` → `bindServer`). Wraps `@orkestrel/websocket` `NodeWebSocketInterface`. `constructor(socket: NodeWebSocketInterface)` `:60`. `duplex` `true`.
- Server `WebSocketClientTransport` `src/server/transports/WebSocketClientTransport.ts:76` — server. Client. Wraps `node:http(s)` upgrade + `NodeWebSocket`. `constructor(options: WebSocketClientTransportOptions)` `:91` (`{ url, headers? }`). Factory `createWebSocketClientTransport` `src/server/factories.ts:402`.
- Server `StdioClientTransport` `src/server/transports/StdioClientTransport.ts:68` — server. Client (`StdioClientTransportInterface`). Wraps `@orkestrel/process` child (`stdin`/`stdout` JSON-RPC, `stderr` as `evidence`). `constructor(options: StdioClientTransportOptions)` `:78` (`command`, `args?`, `env?`, `delivery?`). Factory `createStdioClientTransport` `src/server/factories.ts:445`.
- Server `StdioServerTransport` `src/server/transports/StdioServerTransport.ts:49` — server. Server-side. Wraps `NodeJS.ReadableStream` / `WritableStream`. `constructor(input, output)` `:62`. Factory `createStdioServer` `src/server/factories.ts:484`.
- Server HTTP is not a class under `transports/`: `createMCPRoutes` `src/server/factories.ts:195` mounts `POST {path}` via `createMCPPostHandler`; sessions are `createMCPSession` middleware.

3. MCPServer
- Constructor options verbatim `MCPServerOptions` `types.ts:2124–2182`: `on?`, `error?`, `identity: MCPIdentity`, `tools: ToolManagerInterface`, `resources?`, `prompts?`, `completion?`, `execution?`, `instructions?`, `cache?`, `input?`, `subscription?`, `task?`, `limit?`.
- Tools: takes a live `@orkestrel/tool` **`ToolManagerInterface`**, not `Tool` instances and not a second registry. Example registers tools on `createToolManager()` then passes `tools` (`factories.ts:48–58`). `MCPServer` constructor stores `options` and `#register()` (`MCPServer.ts:164–183`).
- `tools/call` dispatch: `#register` `MCPServer.ts:327` → `#call` `:774` → `#execute` `:940`. Default: `await this.#options.tools.execute(call)` `:950`. Alternate: `options.execution` with `{ request, call, tools, signal, progress? }` `:951`. Result bounded then returned as JSON-RPC `:961–814`.
- Method registration (`#register` `MCPServer.ts:324–377`):
  - tools: `tools/list` `:326`, `tools/call` `:327` (always)
  - resources: `resources/list` `:333`, `resources/read` `:336` (if `resources`)
  - resource templates: `resources/templates/list` `:339` (if `resources`)
  - prompts: `prompts/list` `:345`, `prompts/get` `:348` (if `prompts`)
  - logging: **not registered** (no `logging/setLevel` in `src/`)
  - completion: `completion/complete` `:354` (if `completion`)
  - elicitation / sampling / roots: **not** JSON-RPC methods. Embedded in `tools/call` `resultType: 'input_required'` via `options.input` (`MCPInputOptions` `types.ts:785`; `#input` `MCPServer.ts:979`; request kinds `MCPInputRequest` `types.ts:619` `elicitation/create` | `sampling/createMessage` | `roots/list`). Advertised client capabilities gated by `computeMissingCapabilities` `helpers.ts:146`.
  - tasks: `tasks/get` `:371`, `tasks/update` `:372`, `tasks/cancel` `:375` (if `task`)
  - progress: not a method; `#progress` stream when `execution` is set and a `progressToken` is present (`MCPServer.ts:806–811`)
  - cancellation: not a method; `bindServer` aborts on inbound `notifications/cancelled` (`helpers.ts:1839–1842`)
  - streaming: `subscriptions/listen` `:328`; progress stream from `#progress`
  - `ping`: **not** on modern `MCPServer`. Legacy only: `MCPLegacy.ts:151` `case 'ping': return buildJSONRPCResult(id, {})`
  - `server/discover` `:325` always. Advertised capabilities `buildDiscoverResult` `helpers.ts:1103`: always `tools: {}`; `resources`/`prompts`/`completions`/`extensions.tasks` only when those options exist. Never `logging`.
- Core `MCPServer` imports (`MCPServer.ts:1–97`): `@orkestrel/emitter`, `@orkestrel/tool` (`ToolCall` type), `@orkestrel/contract`, sibling core modules. **Confirms**: no `@orkestrel/router`, `@orkestrel/server`, `@orkestrel/process`, `node:*`, or DOM.
- Public surface `MCPServerInterface` `types.ts:2276`: `identity`, `methods`, `limit`, `dispatch`, `handle` (plus inherited `emitter`).

4. MCPClient
- Constructor `MCPClient.ts:220` from `MCPClientOptions` `types.ts:2654`: `on?`, `error?`, `transport: MCPMessageTransportInterface` (required), `identity?`, `capabilities?` (default `{}` `:239`), `version?: MCPModernVersion`, `timeout?`.
- Connect: `connect()` `:273` → `#negotiate` → `transport.start()` then `server/discover` (`discover` `:327`). Bare client is modern-only; legacy needs `createMCPLegacyClientTransport`.
- List/call tools: `tools()` `:393` issues `tools/list`, wraps each as `@orkestrel/tool` `Tool` whose `execute` calls `call`. `call(name, args, options?)` `:416` issues `tools/call`.
- Server→client:
  - sampling / elicitation / roots: **not** inbound JSON-RPC request handlers. They arrive as `MCPCallOutcome` `input_required` (`types.ts:2726`, `MCPInputResult` `:688`). Consumer retries with `MCPCallOptions.input` `{ state?, responses }` `types.ts:2696`. Inbound invocations that are not progress/subscription are `emitter.emit('notification', owned)` `MCPClient.ts:724` — no reply is sent.
  - progress: `options.progress` on `call`; `#reportProgress` claims `notifications/progress` `:757`.
  - roots: same input-required path, not `roots/list` as a client method.
- Besides a transport, consumer supplies optional identity, capabilities (must declare `sampling` / `elicitation` / `roots` / `extensions.tasks` or the server refuses `-32021`), timeout, and for duplex cancellation `call`’s `signal`. For `input_required`, the consumer must come back with `responses`. `tasks` is always present (`types.ts:2949`). Public members `types.ts:2931–3079`: `emitter`, `connected`, `version`, `transport`, `tasks`, `connect`, `discover`, `disconnect`, `tools`, `listen`, `call`.

5. Browser barrel `src/browser/index.ts:1–5`
- `export * from './types.js'`
- `export * from './constants.js'`
- `export * from './transports/MessagePortTransport.js'`
- `export * from './transports/WebSocketClientTransport.js'`
- `export * from './factories.js'`
- Factories `src/browser/factories.ts`:
  - `createWebSocketClientTransport(options: WebSocketClientTransportOptions): MCPMessageTransportInterface` `:52` → `WebSocketClientTransport`
  - `createHTTPClientTransport(options: HTTPClientTransportOptions): MCPMessageTransportInterface` `:102` → core `HTTPClientTransport`
  - `createMessagePortTransport(options: MessagePortTransportOptions): MCPTransportInterface` `:135` → `MessagePortTransport`
  - `createScopeServer(options: ScopeServerOptions, scope: ScopeInterface = globalThis): ScopeServerInterface` `:174` → `createMCPServer` + `bindServer` on scope transport + port-bearing `MessagePortTransport`s
  - `createScopeMessageListener(...)` `:247`
  - `createScopeTransport(scope: ScopeInterface): ScopeTransportInterface` `:300`
- Constants `src/browser/constants.ts:12–15`: `DEFAULT_MCP_SERVER_NAME = '@orkestrel/mcp'`, `DEFAULT_MCP_SERVER_VERSION = '1.0.0'`

6. Server barrel `src/server/index.ts:1–13`
- `types`, `constants`, `helpers`, `inferers`, `handlers`, `HTTPDisconnect`, `MCPSession`, `WebSocketServerTransport`, `WebSocketClientTransport`, `StdioClientTransport`, `StdioServerTransport`, `factories`, `middlewares`
- `MCPSession` public: `id`, `attach(stream)`, `detach(stream)`, `push(message): string`, `replay(afterId)` (`MCPSession.ts:62–99`; `MCPSessionInterface` `server/types.ts:229`)
- Handlers/middlewares target `@orkestrel/router` + `@orkestrel/server`. Path default `DEFAULT_MCP_PATH = '/mcp'` `src/server/constants.ts:16`.
  - `createMCPRoutes` `src/server/factories.ts:195`: single `POST {path}` named `'mcp'`, handler `createMCPPostHandler` (`handlers.ts:70`)
  - `createMCPSession` `middlewares.ts:93`: same `path`; `DELETE {path}` ends session `:135`; `GET {path}` resumable SSE (`createStream`) `:151`; `POST` mints/validates `mcp-session-id`
- Stdio constructors: `StdioClientTransportOptions` `{ command, args?, env?, delivery? }` `server/types.ts:377`; `StdioServerOptions` `{ input?, output? }` `:482` (default `process.stdin` / `process.stdout`)
- Also: `createDuplexServerTransport`, `createWebSocketServer`, `createMCPContinuation` (`src/server/factories.ts`)

7. Protocol
- `MCP_HANDSHAKE_VERSION = '2025-11-25'` `constants.ts:17`
- `MCP_FALLBACK_VERSION = '2025-06-18'` `:23`
- `MCP_MODERN_VERSION = '2026-07-28'` `:26`
- `SUPPORTED_MODERN_PROTOCOL_VERSIONS = [MCP_MODERN_VERSION]` `:36` — bare server advertises/negotiates this only
- `SUPPORTED_LEGACY_PROTOCOL_VERSIONS = [MCP_HANDSHAKE_VERSION, MCP_FALLBACK_VERSION]` `:44` — `createMCPLegacy` only
- `SUPPORTED_MCP_VERSIONS` concatenates those `:53`
- JSON-RPC framing: `parseJSONRPCMessage(value, limits?): JSONRPCMessage | undefined` `parsers.ts:81`; `buildJSONRPCResult(id, result)` `helpers.ts:683`; `buildJSONRPCError(id, code, message, data?)` `:705`; `decodeBoundedMessage(message, limits)` `:1194`; `decodeEvent(data: string)` `:1265`; `readEventStream(response)` `:1293`; `deliverMessage` inbound fold
- Tasks mirror header `tests/mirrors/ext-tasks-2026-07-28-schema.json:1–5`: `"$id": "https://modelcontextprotocol.io/ext-tasks/2026-07-28/schema.json"`, `"title": "MCP Tasks Extension"`, identifier `io.modelcontextprotocol/tasks`, dated **2026-07-28**

8. Guide heading tree (`mcp/guides/mcp.md`, two levels)
- `# MCP`
- `## Protocol` — `### Connect through the HTTP client`, `### Inspect a raw modern tool call`
- `## Surface` — `### Narrow a message to its JSON-RPC arm`, `### Register a modern method on the seam`, `### Project a host-owned resource, prompt, and completion registry`, `### Adapt an existing registry behind a port`, `### Configure modern subscriptions`, `### Consume a subscription from a client`, `### Execute rich results and request-scoped progress`, `### Ask the client for input during the call in hand`, `### Defer a call to a durable task`, `### Bound hostile input and live resources`, `### Bind a server or a client to any duplex transport`, `### Compose or remove the legacy protocol layer`, `### Adapt a legacy peer at the client transport boundary`, `### Factories`, `### Classes`, `### Constants`, `### Helpers`, `### Types`, `### HTTP transport`, `### WebSocket transport`, `### stdio transport`, `### Browser transport`
- `## Methods`
- `## Patterns` — `### Expose a tool registry over MCP`, `### Drive the typed core directly`, `### Mount the HTTP transport with sessions`, `### Drive a remote server over HTTP, WebSocket, or stdio`, `### Build response envelopes and validate wire messages directly`, `### Route a request by era and build a modern result`, `### Read HTTP request headers and decode SSE bodies directly`, `### Frame newline-delimited JSON-RPC over stdio directly`, `### Serve MCP from a Web Worker`, `### Own bounded execution values and one streamed HTTP response`
- `## Tests`
- `## Declared non-goals`
- `## Declared conformance gaps`
- `## Declared packaging limits`
- `## Contract`
- Browser section (`### Browser transport` `:3080`): page / Web Worker / Service Worker face; client HTTP/WS drive a **remote** server; `createMessagePortTransport` is MCP over `postMessage`; same class binds as server or client; `createScopeServer` boots `MCPServer` in a worker scope; face is DOM-free (`lib` WebWorker) so it runs in a page, worker, or service worker.
- Server section (HTTP `:2540`, WebSocket `:2798`, stdio `:2899`): HTTP mounts `MCPServer` on `@orkestrel/router`/`@orkestrel/server` as `POST /mcp`; sessions are separate middleware (`GET`/`DELETE`); WebSocket is Node upgrade ingress; stdio is `stdin`/`stdout` or a spawned child. None of those three run an MCP server **inside** a browser page.
- Quotes (`postMessage`): “`createMessagePortTransport` is the genuinely new capability: MCP over `postMessage`.” (`:3154`). “A `MessagePort` is symmetric, so `MessagePortTransport` is the one class both a server and a client bind — it implements `@src/core`'s `MCPTransportInterface` directly (not `MCPMessageTransportInterface`), and whichever binder it is handed to (`bindServer` or `bindClient`) decides its role.” (`:3155`). Class row: “Carries the Model Context Protocol over a native `MessagePort` from the browser face — a `MCPTransportInterface`, the genuinely new capability this face adds: MCP over `postMessage`.” (`:3203`). Worker pattern: “boot an `MCPServer` over the worker's own implicit `postMessage` channel (a dedicated worker) or over each connecting client's `MessagePort` (a Service Worker)” (`:4169`). “any window, worker, or iframe can `controller.postMessage(msg, [port])` and receive a fully-bound server” (`:4192`). “A portless `controller.postMessage('<json-rpc>')` delivers its string to the implicit scope channel” (`:4207`).
- `WebMCP`, `navigator.modelContext`, content script, in-page server: **none found**.

9. Packaging (`mcp/package.json`)
- `exports`:
```
".": { "import": { "types": "./dist/src/core/index.d.ts", "default": "./dist/src/core/index.js" }, "require": { "types": "./dist/src/core/index.d.cts", "default": "./dist/src/core/index.cjs" } }
"./browser": { "import": { "types": "./dist/src/browser/index.d.ts", "default": "./dist/src/browser/index.js" } }
"./server": { "import": { "types": "./dist/src/server/index.d.ts", "default": "./dist/src/server/index.js" }, "require": { "types": "./dist/src/server/index.d.cts", "default": "./dist/src/server/index.cjs" } }
"./package.json": "./package.json"
```
- `files`: `["dist/src", "README.md"]`
- `sideEffects`: `false`
- `browser`: **absent**
- `peerDependencies`: `{ "@orkestrel/router": "^0.0.14", "@orkestrel/server": "^0.0.19" }`
- `peerDependenciesMeta`: **absent**
- Vitest `vite.config.ts` `test.projects`: `src:core` (node, browser disabled), `src:browser` (**Playwright** chromium headless), `src:server` (node), `policy` (node), `config` (node), `setup` (node), `guides` (node), `conformance` (node), `distribution` (node), `integration` (node), `probe` (node). Playwright: `src:browser` only (`vite.config.ts:84–88`).

10. Naming
- `MCPServer` members: `emitter`, `identity`, `methods`, `limit`, `dispatch`, `handle`. Manager: `methods` (`MCPMethodManagerInterface`: `add`, `method`).
- `MCPClient` members: `emitter`, `connected`, `version`, `transport`, `tasks`, `connect`, `discover`, `disconnect`, `tools`, `listen`, `call`. Manager: `tasks` (`task`, `update`, `abort`).
- Core `create*` factories (`src/core/factories.ts`): `createMCPServer`, `createMCPLegacy`, `createMCPClient`, `createMCPLegacyClientTransport`, `createDuplexClientTransport`. (Bind helpers `bindServer` / `bindClient` in `helpers.ts` are not `create*`.)

Distillate:
- Core publishes transport-agnostic `MCPServer` / `MCPClient` plus `HTTPClientTransport` and `MCPLegacyClientTransport`. Server/client talk through injected transports; core does not import router, server, process, `node:*`, or DOM.
- Browser publishes client HTTP/WS (remote) plus symmetric `MessagePortTransport` (`MCPTransportInterface`) and `createScopeServer` (worker-scope `MCPServer`).
- Server publishes Streamable HTTP (`POST /mcp` on `@orkestrel/router`/`@orkestrel/server`), session middleware (`GET`/`DELETE /mcp`), Node WebSocket, and stdio. Those are network or process hops, not in-page.
- In-page, no network: construct `new MessageChannel()`, `bindServer(mcp, createMessagePortTransport({ port: port1 }))`, `createMCPClient({ transport: createDuplexClientTransport(port2Transport) })` then `bindClient`. Proven in Playwright: `factories.test.ts` `connect → tools/list → tools/call(add)` on a real `MessageChannel` in the page. `createDuplexClientTransport` sets `duplex: true`; `start` is a no-op.
- Page + worker: `createScopeServer({ tools })` in the worker entry binds the implicit `postMessage` channel and transferred `MessagePort`s. Documented; tests use `ScopeInterface` doubles and page `globalThis`, not `new Worker()`. No `new Worker(` in the package.
- `MCPClient` does not answer inbound JSON-RPC requests (sampling/elicitation/roots as independent server→client calls). Those travel as `tools/call` `input_required`; the consumer retries with `call` `options.input`.
- Modern `MCPServer` has no `ping` or `logging/*`. `ping` is legacy-decorator only. HTTP client `duplex` is `false` (not the in-page path).

Unknowns:
- 2: a real `Worker` / `ServiceWorker` round-trip (`new Worker(...)` page↔worker) is not present in the scoped tests; only doubles and in-page `MessageChannel`.
- 4: whether a future client will dispatch inbound `sampling/createMessage` / `elicitation/create` / `roots/list` as JSON-RPC requests rather than `input_required` is not stated as a contract beyond today’s `#receive`.
- 8: WebMCP / `navigator.modelContext` / browser-extension / content-script hosting is absent from `mcp.md`; no planned-surface file in scope.

Journal: journal: (driver fills)

Deviation: none
