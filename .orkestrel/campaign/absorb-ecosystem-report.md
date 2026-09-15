<!-- journal: tmp/cursor/absorb-ecosystem.jsonl -->
<!-- session_id: 037cee39-552b-41a6-aaa4-54094d5fbc85 -->
<!-- model: Cursor Grok 4.6 High; duration_ms: 294120; is_error: false; events: 950 -->
I'll read the brief and follow it exactly.I'll read the named guides and search them for the brief's keywords, then return only the specified shape.Guides exist. Next I’ll pull each package card and the HTTP, streaming, auth, and tool sections.Package cards are next; I’ll also pull environments, dependencies, and the HTTP/auth/tool/MCP surfaces.Question: Which published `@orkestrel/*` packages already supply HTTP client/server paths, bidirectional SSE/NDJSON/WebSocket streaming, auth/session/token middleware, abort/timeout/budget propagation, tool call shapes, and wire-body guards, and what are their exact exported names and environments?

Evidence:

1. Per-package cards

- README.md: no package tagline; index of vendored `@orkestrel/*` mirrors (`README.md:3–4`, `README.md:33–37`). Environments: none. Runtime `@orkestrel/*` deps: lists console, contract, emitter, markdown, process, template (`README.md:41–46`). Layer: none.

- server.md: tagline `server.md:3–7`. Environments: node face only, `@orkestrel/server` from `src/server` (`server.md:10–14`); no `/browser`. Deps: `@orkestrel/router` (`server.md:9–10`); abort, timeout, emitter, contract (`server.md:277`, `server.md:373`, `server.md:744–750`). Layer: none.

- router.md: tagline `router.md:3–6`. Environments: core `@orkestrel/router` (`src/core`); `/browser` Navigator; `/server` `node:http` adapter (`router.md:8–15`, `router.md:524`, `router.md:582`). Confirmed: `agent/node_modules/@orkestrel/router/dist/src/browser/index.d.ts:8–9` (`computeNavigationKey`); `…/server/index.d.ts:5–6` (`buildRequest`). Deps: `@orkestrel/abort` (`router.md:323`, `router.md:750`). Layer: none.

- middleware.md: tagline `middleware.md:3–9`. Environments: core `@orkestrel/middleware` (`src/core`); node `@orkestrel/middleware/server` (`middleware.md:11–19`, `middleware.md:66–73`). Installed `…/middleware/dist/src/{core,server}/index.d.ts` missing under ollama and agent. Deps: server, contract, budget, abort, timeout (`middleware.md:921–926`). Layer: none. Mechanism not product policy (`middleware.md:15–16`).

- sse.md: tagline `sse.md:3–5`. Environments: core `@orkestrel/sse` (`sse.md:17`). Confirmed `agent/node_modules/@orkestrel/sse/dist/src/core/index.d.ts:11–13` (`createSSEParser`). Deps: none stated. Layer: none.

- ndjson.md: tagline `ndjson.md:3–5`. Environments: core `@orkestrel/ndjson` (`ndjson.md:21`). Deps: none stated. Layer: none.

- websocket.md: tagline `websocket.md:3–6`. Environments: `@orkestrel/websocket` from `src/server` only (`websocket.md:8`). Confirmed `agent/node_modules/@orkestrel/websocket/dist/src/server/index.d.ts:20–21` (`createNodeWebSocket`). Deps: `@orkestrel/emitter` (`websocket.md:8`); abort/timeout signals (`websocket.md:144`). Layer: “message transport built one layer up” (`websocket.md:8`).

- browser.md: tagline `browser.md:3–6`. Environments: core `@orkestrel/browser`; Node `@orkestrel/browser/server` (`browser.md:17–19`). Deps: `@orkestrel/html` (`browser.md:13`). Layer: “CDP automation layer” (`browser.md:3`).

- contract.md: tagline `contract.md:3–6`. Environments: core `@orkestrel/contract` (`contract.md:8`). Deps: “zero-dependency” (`contract.md:3`). Layer: none.

- tool.md: tagline `tool.md:3–6`. Environments: core `@orkestrel/tool` (`tool.md:34`). Deps: `@orkestrel/contract` (`tool.md:310`). Layer: “policy layer” is consumer, not this package (`tool.md:28–32`).

- abort.md: tagline `abort.md:3–5`. Environments: core (`abort.md:14–15`). Deps: `@orkestrel/contract` (`abort.md:31`). Layer: queue names it L1 (`queue.md:10`).

- timeout.md: tagline `timeout.md:3–5`. Environments: core (`timeout.md:14`). Deps: `@orkestrel/contract` (`timeout.md:37`). Layer: L1 with abort (`queue.md:10`).

- budget.md: tagline `budget.md:3–4`. Environments: core (`budget.md:8`). Deps: none named. Layer: “third bounding signal” (`budget.md:8`).

- emitter.md: tagline `emitter.md:3–6`. Environments: core (`emitter.md:16`). Deps: none stated. Layer: “foundational observable primitive” (`emitter.md:3`).

- codec.md: tagline `codec.md:3–6`. Environments: core `@orkestrel/codec` (`codec.md:15–16`). Deps: none (`codec.md:12`). Layer: none.

- msg.md: tagline `msg.md:3–4`. Environments: core (`msg.md:9–10`). Deps: “zero-dependency” (`msg.md:3`). Layer: “encoding layer” (`msg.md:6`). Email parser, not a message transport.

- mcp.md: tagline `mcp.md:3–4`. Environments: core `@orkestrel/mcp`; Node `@orkestrel/mcp/server`; browser `@orkestrel/mcp/browser` (`mcp.md:22–26`, `mcp.md:40–61`). Confirmed: core `HTTPClientTransport` at `ollama/node_modules/@orkestrel/mcp/dist/src/core/index.d.ts:1016`; browser factory `…/browser/index.d.ts:11–17`. Deps: tool, emitter, contract, codec, server, websocket (`mcp.md:23–26`, `mcp.md:45–52`). Layer: “Model Context Protocol layer” (`mcp.md:3`).

- process.md: tagline `process.md:3–6`. Environments: contracts `@orkestrel/process`; Node `@orkestrel/process/server` (`process.md:17–20`). Deps: emitter, contract (`process.md:1615–1618`). Layer: “tiers” (`process.md:3`).

- console.md: tagline `console.md:3–6`. Environments: core `@orkestrel/console`; `/browser`; `/server` (`console.md:22–24`, `console.md:653–667`). Deps: emitter (`console.md:784`). Layer: none.

- workspace.md: tagline `workspace.md:3–5`. Environments: core `@orkestrel/workspace` (`workspace.md:13–14`). Deps: emitter, database, contract (`workspace.md:589–594`). Layer: none.

- queue.md: tagline `queue.md:3–5`. Environments: core (`queue.md:31`). Deps: abort, timeout, database, contract (`queue.md:365–368`). Layer: L1 abort/timeout (`queue.md:10`).

- workflow.md: tagline `workflow.md:3–5`. Environments: core `@orkestrel/workflow`; `/server` NodeScheduler; `/browser` Browser/Frame/Idle schedulers (`workflow.md:21`, `workflow.md:157–159`). Deps: contract, queue, database, abort, timeout, budget, emitter (`workflow.md:221`, `workflow.md:1502–1506`). Layer: definition/entity/engine/substrate (`workflow.md:9–14`); W-a–W-d (`workflow.md:717` in earlier read).

2. HTTP client from core or browser

- `HTTPClientTransport` class, core `@orkestrel/mcp`, `fetch` to a Streamable-HTTP MCP URL; options `{ url, headers?, fetch?, timeout? }` (`mcp.md:2186`, `mcp.md:2518`). Confirmed `…/mcp/dist/src/core/index.d.ts:1016`.
- `createHTTPClientTransport` factory, `@orkestrel/mcp/server` (`mcp.md:2720`) and `@orkestrel/mcp/browser` (`mcp.md:3191–3192`); browser factory returns the same core class (`mcp.md:3090–3091`; `…/browser/index.d.ts:16–17`).
- Injectable `fetch` on `HTTPClientTransportOptions` (`mcp.md:2518`).
- SSE decode of HTTP replies uses `@orkestrel/sse` (`…/browser/index.d.ts:25–26`).
- `buildRequest` `@orkestrel/router/server`: IncomingMessage → fetch `Request` with streamed body, not a client (`router.md:90`; `…/router/dist/src/server/index.d.ts:5–22`).
- Examples pass native `fetch` a signal (`abort.md:25`, `timeout.md:28`, `queue.md:41`); no generic retry/backoff HTTP client in these guides.

3. Server routes and bodies

- Route declare: `dispatcher.add({ method, path, handler })` / `createDispatcher({ routes })` (`router.md:31–39`, `router.md:147` `RouteInput`).
- Handler: `RouteHandler` `(request, context) => Response | Promise<Response>` (`router.md:145–146`).
- Context: `RouteContext` `{ params, pattern, url, state }` (`router.md:145`); middleware `state` is that `state` (`server.md:53–55`, `server.md:362–365`).
- JSON/collected body: `readBody` (`server.md:124`); `DEFAULT_BODY_LIMIT` (`server.md:74`); `createBody` stashes `BodyState.body` (`middleware.md:60`, `middleware.md:102`).
- Streamed request: `buildRequest` pumps non-GET/HEAD into `ReadableStream<Uint8Array>` (`…/router/dist/src/server/index.d.ts:18–22`); `createMultipart` / `parseMultipartRequest` node streamed multipart (`middleware.md:72`, `middleware.md:259`).
- Streamed response: `createStream` / `StreamInterface.write|drain|end`, return `stream.response` (`server.md:65`, `server.md:162`, `server.md:512–531`); `sendResponse` writes fetch `Response` to `ServerResponse` (`router.md:91`); `streamFile` node→web stream (`middleware.md:249`).
- Middleware: `compose` / `wrapMiddleware` (`server.md:86–87`); `createServer({ middleware })` (`server.md:43–47`); `server.use` (`server.md:239`); batteries return `MiddlewareHandler` (`middleware.md:23–24`).
- `createListener` `@orkestrel/router/server` (`router.md:112`); `createServer` `@orkestrel/server` (`server.md:64`).

4. Streaming both directions

- sse.md core: `createSSEParser`, `SSEParser`, `SSEParserInterface.parse|flush|clear`, `SSEEvent`, `SSEError` (`sse.md:90–92`, `sse.md:110–111`, `sse.md:40–42`). Parser only.
- server.md node: encoder/writer `serializeEvent` (`server.md:118`), `createStream`/`Stream`/`SSEMessage` (`server.md:65`, `server.md:140`, `server.md:160`).
- ndjson.md core: `createNDJSONParser`, `NDJSONParser`, `parse`/`clear` (`ndjson.md:61–63`, `ndjson.md:81–83`). Parser only; no encoder.
- websocket.md Node: `createNodeWebSocket`, `NodeWebSocket`, `encodeWebSocketFrame`, `parseWebSocketFrame`, `measureWebSocketFrame`, `parseUTF8`, handshake guards (`websocket.md:44–73`). Client mode = omit `key` (`websocket.md:46`, `websocket.md:140`). No `/browser` WebSocket package.
- mcp.md: HTTP SSE ingress `createMCPRoutes` + `createStream` (`mcp.md:45–46`); `HTTPDisconnect.bridge` SSE byte-forward (`mcp.md:3737`); `createWebSocketServer` / `createWebSocketClientTransport` Node (`mcp.md:50–54`, `mcp.md:2869`); browser native `WebSocket` client (`mcp.md:3087–3088`); stdio NDJSON lines (`mcp.md:55–57`).
- codec.md core: `encodeBase64`/`decodeBase64`/`isBase64`, `encodeBase64URL`/`decodeBase64URL`/`isBase64URL`, `encodeHex`/`decodeHex`/`isHex` (`codec.md:68–76`); `encodeUTF8`/`decodeUTF8`/`isUTF8`, `encodeLatin1`/`decodeLatin1`/`isLatin1` (`codec.md:111–116`). Stateless; not stream transformers.
- msg.md: Outlook/EML parser (`msg.md:3–4`); not a wire stream.

Core: SSE/NDJSON parsers, codec triples, `HTTPClientTransport`. Browser: MCP HTTP+WS client factories, native WebSocket. Node: server SSE writer, WebSocket wrapper, MCP HTTP/WS/stdio servers, multipart/`streamFile`.

5. Authentication and sessions

Mechanism (reusable):
- `createBearer` + `BearerState` (`middleware.md:58`, `middleware.md:94`); `verifyToken` (`middleware.md:58`).
- `signToken`/`verifyToken`/`decodeTokenPayload`/`normalizeSecret` HMAC-SHA256 (`server.md:97–100`); `writeSignedCookie`/`readSignedCookie`/`parseCookies`/`serializeCookie` (`server.md:88–95`).
- `createSession`, `createCookieTransport`, `createHeaderTransport`, `SessionInterface`, `SessionStoreInterface` (`middleware.md:61`, `middleware.md:279–280`, `middleware.md:99–104`).
- `createCSRF` double-submit (`middleware.md:62`); `equalsConstantTime` (`middleware.md:214`).
- `createCors` (`middleware.md:54`); `resolveOrigin` (`server.md:112`).
- `createForwarded` trusted-proxy IP (`middleware.md:56`).

Product policy:
- middleware “supplies mechanism rather than product policy” (`middleware.md:15–16`).
- mcp: “Every transport is mechanism, not policy. Auth, invocation rate limiting, and body-size guards compose in front as ordinary `@orkestrel/server` middleware” (`mcp.md:63–64`); origin gate is protocol-required (`mcp.md:65–68`); `createScopeServer` “mechanism, not policy” / embedder gates (`mcp.md:4189–4194`).
- browser.md: no bearer/cookie/session/HMAC/CSRF/CORS HTTP exports; CDP `BrowserProxy` is Chromium proxy settings (`browser.md:882`).

6. Abort, timeout, budget

- abort: `createAbort`/`Abort`/`linkSignal`; `signal` handed to `fetch` (`abort.md:22–26`, `abort.md:37`, `abort.md:44`). Server links `Request.signal` to stop via `linkSignal` (`server.md:371–376`).
- timeout: `createTimeout`; `start` then `fetch(url, { signal: timeout.signal })` (`timeout.md:21–30`, `timeout.md:155–160`). No deadline header.
- budget: `createBudget`/`createTokenBudget`/`createTokenConsumer`; `consume` charges; `start()` re-arms per-request `signal` without resetting `consumed` (`budget.md:32–34`, `budget.md:24`, `budget.md:149`). Fold with `AbortSignal.any([abort, timeout, budget])` (`budget.md:8`, `budget.md:139`). No stream-token reader; charge is caller `consume(TokenUsage)` (`budget.md:142–143`).
- middleware `createDeadline({ ms, status? })` application deadline, default 503 (`middleware.md:55`, `middleware.md:89`, `middleware.md:154`); uses abort/timeout (`middleware.md:925–926`). No deadline header named.
- websocket `signal` tears down socket (`websocket.md:144`).
- mcp `DEFAULT_MCP_REQUEST_TIMEOUT` / `MCPCallOptions.signal` (`mcp.md:2226`, `mcp.md:2523`).

7. Tool shapes (`tool.md`)

- Definition: `ToolDefinition` `{ name, description?, parameters? }` (`tool.md:48`).
- Call: `ToolCall` `{ id, name, arguments, caller? }` (`tool.md:49`); guard `isToolCall` (`tool.md:69`).
- Result: `ToolResult` = `ToolSuccess | ToolFailure` (`tool.md:55`); `ToolSuccess`/`ToolFailure` (`tool.md:50–51`).
- Registry: `ToolManager`/`createToolManager`/`ToolManagerInterface` (`tool.md:87`, `tool.md:54`); `createTool`/`Tool`/`ToolInterface` (`tool.md:86`, `tool.md:53`).
- Schema: `parameters` is descriptive JSON Schema forwarded by reference, never interpreted (`tool.md:77`, `tool.md:173–176`). Serialization to JSON Schema is not in this package; contract `compileSchema` + `schemaToParameters` (`contract.md:248`, `contract.md:547`).

8. Contract primitives (`contract.md`)

- Guards: `isNull`…`isConstructor` family (`contract.md:34–126`); `Guard` (`contract.md:15`, `contract.md:313`).
- Combinators: `arrayOf` `tupleOf` `setOf` `mapOf` `recordOf` `objectOf` `literalOf` `instanceOf` `enumOf` `keyOf` `pickOf` `omitOf` `andOf` `orOf` `notOf` `complementOf` `unionOf` `intersectionOf` `whereOf` `lazyOf` `transformOf` `nullableOf` `optionalOf` `boundsOf` `matchOf` `stringOf` (`contract.md:135–160`).
- Parsers: `parseString`…`parseJSONValueField` (`contract.md:175–192`); `parseJSON` `parseJSONAs` (`contract.md:209–210`).
- Result: `Result` `Success` `Failure` (`contract.md:323`, `contract.md:327`, `contract.md:306`); `attempt` (`contract.md:227`). No `isSuccess`/`isFailure` rows in this guide.
- Shape DSL: `stringShape` `numberShape` `integerShape` `booleanShape` `nullShape` `literalShape` `arrayShape` `objectShape` `recordShape` `unionShape` `oneOfShape` `optionalShape` `nullableShape` `jsonShape` `rawShape` `schemaToShape` (`contract.md:447–462`).
- Compile: `compileGuard` `compileParser` `compileSchema` `compileGenerator` `createContract` `compileAuditor` `compileReporter` `validateShape` (`contract.md:545–549`, `contract.md:671–672`).
- Wire helpers: `schemaToParameters` `schemaToObject` (`contract.md:248–249`).

9. Prior art (directory search). Named-guide hits:

- workspace.md:161 manager forwards listener defaults; 517 remote snapshot store would satisfy the store contract.
- workflow.md:15,82,124,683 engine has no provider registry; 19 Provider integrations outside package; 321,328 example `'provider failed'`; 717 Provider/Tool/MCP outside core; 1058 `'Provider rate limit'` constraint sample; 1066 no provider fields on activity; 1076 Provider-specific JSONL outside core; 1474–1475 hostile/revoked proxy tests.
- tool.md:22–23 MCP bridge to remote client; 28,105,173,258 forward schema/caller by reference; 289 MCP bridge maps definitions; 295 remote API as a tool.
- timeout.md:73,238 hostile/revoked proxy; 137,216 parent reason forward.
- sse.md:186 tests “bridge rules”.
- server.md:211,418 remote peer not proven by queue; 369,677 trusted-proxy / XFF.
- router.md:329 `sensitive` forwarded to engine.
- process.md:313,333,379 forward lifecycle/stderr.
- ndjson.md:20,98 untrusted upstream byte cap.
- middleware.md:6,56,90 trusted-proxy / `createForwarded`; 249 `streamFile` node↔web stream bridge.
- mcp.md:10,35–37,2169,2184 remote MCP client; 22,4954 provider-agnostic core; 9,325,1372,1534,1593,4967 execution/completion provider ports; 68,2690,4124,4390,5047,5291 upstream origin delegation; 219 gateway `Mcp-Param-*`; 45–61,2720,2869,3084,3191 HTTP/WS/stdio/browser transports; 2171,2722,2875,2906,3634 duplex/WS bridges; 2740–2741 reverse-proxy SSE buffering; 2693,5301 forward rebuilt `Request`; 3737 `HTTPDisconnect.bridge` SSE byte-forward; 801 adapter must bridge shapes; 3523–3537 `call` = remote `tools/call`; plus further forward/remote/upstream/bridge lines 566,657,660,683,1612–1613,1782,1821,1974,2016,2145–2148,2650,2657,3078,3260,3641,3681,3723–3747,3873,3917,4290–4301,4351,4703,4991,5036,5058,5071,5097,5157,5231,5244,5261,5412,5432,5488,5533,5541.
- codec.md:113,119,122 proxy is false on `isUTF8`/`isWindows1252`/`isUTF16LE`.
- budget.md:6,34,70,128 provider token usage; 149 spend carries forward.
- browser.md: CDP remote endpoint/objects (`99,565,847,1029–1030,1056,1105–1106,1114,1253,1259,1365,1373,1874,2112,2151,2165,2191`); Chromium `proxy` (`806,882,913,1256`); history `forward` (`268,859,1098,1127`); clock `advance` forward (`1502`); `WebSocketCDPTransport` thin bridge (`2001,2004`); `--remote-debugging-port` (`2041`); binding bridge script (`1394`).
- abort.md:90 `abort(reason)` forwards reason.
- contract.md:344 proxy brand; 602,645 `schemaToParameters` → MCP tool bridge; 1173,1188 proxy tests.
- console.md:15,35,445,455,475 remote transport on `entry`; 138–153,245,298–300,319,768,779 capture sink forward.
- README.md:51 upstream `main` of a mirror.
- emitter.md: no hits.
- msg.md: no hits.
- websocket.md: no hits.
- queue.md: no hits.

Other guides in the directory (match counts; distinctive relay/proxy/bridge/gateway/provider lines):

- agent.md (139): `ProviderInterface` host-supplied (`agent.md:8–10`, `20`, `26`); durable-job bridge (`18`); loop context→provider→tools (`5`, `94`, `391`); `schema`/`think` forwarded (`124`); vision images forwarded (`185`); provider-agnostic summarizer (`215`, `222`).
- ollama.md (41): local-LLM `ProviderInterface` over `POST /api/chat` (`3`, `8`, `66`); NDJSON stream vs proxy unterminated line (`113`); recording-proxy tests (`12`).
- toolbox.md (28): `createInferTool`/`createEndpointTool` API/DB→MCP bridge (`11`, `35–36`); `createTerminalRoutes` SSE/POST wire bridge (`13`, `232`, `240`); forwards registries/store (`7`, `25`, `328`); `provider?` on agent tool (`121`, `209–210`, `336`); upstream DB errors (`60`, `338`).
- terminal.md (26): SSE bridge / `PromptClient` (`4`, `11`, `229–241`); `isInsecureRemote` (`248`); “A relay receives an opaque frame” (`767`).
- scaffold.md (34): `Upstream` network reader, retries/timeout (`315–331`, `1556–1557`); remote session install (`1261`); CLAUDE.md harness bridge (`1285`).
- worker.md (5): queue events bridged (`177–178`); zero-`as` wire bridge (`263`, `277`); abort forwarded (`377`).
- probe.md (3): `normalizePath` forward-slash (`220`); `diagnosticProvider` (`941`, `945`); stdin/SIGINT forwarders (`1058`, `1069`).
- Remaining counts: reason 19, test 23, indexeddb 6, database 7, interpret 5, brief 4, lsp 3, table 2, qualifier 2, guide 2, html 2, markdown 2, sqlite 1. Full line-by-line listing of all 558 directory hits omitted under the 500-line bound (see Deviation).

10. MCP comparison

- Split: ingress `createMCPServer` wraps `ToolManagerInterface`; egress `createMCPClient` over injected `MCPMessageTransportInterface` (`mcp.md:6–11`, `mcp.md:2167–2169`). Core `dispatch`/`handle` transport-agnostic (`mcp.md:22–34`).
- Transports: Streamable HTTP `createMCPRoutes` / `createHTTPClientTransport`; WebSocket `createWebSocketServer` / `createWebSocketClientTransport`; stdio `createStdioServer` / `createStdioClientTransport`; browser MessagePort/`createScopeServer` plus HTTP+native WS (`mcp.md:40–61`).
- Tool call: JSON-RPC `tools/call` with `params.name`/`arguments` (`mcp.md:307–310`, `mcp.md:323`); client `tools()` wraps remote tools as `ToolInterface`; `call` runs remote `tools/call` (`mcp.md:35`, `mcp.md:3523–3537`). Thrown tool → `success: false` / `isError: true`, not a protocol error (`mcp.md:322–325`).

Distillate:
- HTTP from core/browser: `HTTPClientTransport` (`@orkestrel/mcp` core) + `createHTTPClientTransport` (`/server`, `/browser`); MCP Streamable-HTTP over `fetch`. Generic HTTP client with retry/backoff: none published.
- Server routes: `createDispatcher`/`Dispatcher.add`/`RouteHandler`/`RouteContext` (`@orkestrel/router` core); `createServer`/`createListener` Node.
- JSON body: `readBody` (`@orkestrel/server`); `createBody` (`@orkestrel/middleware` core).
- Streamed request: `buildRequest` (`router/server`); `createMultipart` (`middleware/server`).
- Streamed response: `createStream`/`Stream.write` (`server`); `sendResponse` (`router/server`); `streamFile` (`middleware/server`).
- Middleware chain: `compose`/`wrapMiddleware` (`server`); batteries `create*` (`middleware` core + `/server`).
- SSE parse: `createSSEParser` (sse core). SSE write: `serializeEvent`/`createStream` (server Node).
- NDJSON parse: `createNDJSONParser` (ndjson core). NDJSON encode: none published.
- WebSocket: `createNodeWebSocket`/`encodeWebSocketFrame`/`parseWebSocketFrame` (websocket Node). Browser WS: `createWebSocketClientTransport` (`mcp/browser`) over native `WebSocket`.
- Byte codecs: `encode*`/`decode*` (codec core).
- Bearer: `createBearer` (middleware core); HMAC tokens/cookies `signToken`/`verifyToken`/`writeSignedCookie`/`readSignedCookie` (server).
- Session: `createSession`/`createCookieTransport`/`createHeaderTransport` (middleware core).
- CSRF/CORS: `createCSRF`/`createCors` (middleware core).
- Abort across request: `createAbort.signal` to `fetch`; `linkSignal` on `Request.signal` (abort core, server).
- Timeout: `createTimeout.signal` to `fetch` (timeout core). Deadline header: none published. App deadline: `createDeadline` (middleware core).
- Budget: `createTokenBudget`/`consume`/`start` (budget core); not a stream consumer.
- Tools: `ToolDefinition`/`ToolCall`/`ToolResult`/`createTool`/`createToolManager`/`isToolCall` (tool core). Schema compile: `compileSchema`/`schemaToParameters` (contract core).
- Wire guards: contract `is*`/`*Of`/`parse*`/`attempt`/`Result`/`createContract`/`compile*`/`*Shape` (contract core).
- Relay of one contract over several transports: `createMCPServer`/`createMCPClient` + HTTP/WS/stdio/browser faces (mcp core+/server+/browser).

Unknowns:
- `@orkestrel/middleware` installed `dist/src/{core,server}/index.d.ts` not found at `C:/Users/mikes/WebstormProjects/ollama/node_modules/@orkestrel/middleware/…` or the agent tree equivalent; environments taken from `middleware.md:11–19`.
- `isSuccess`/`isFailure` not in `contract.md` Surface; `msg.md:28` imports `isSuccess` from `@orkestrel/msg`.
- Item 9: 558 hits across 38 guides; non-named-guide hits beyond distinctive lines not enumerated.

Journal: supplied by the launcher

Deviation: Item 9 condensed (558 keyword hits exceed the 500-line bound); named-guide hits listed; other guides reported as counts plus distinctive relay/proxy/bridge/gateway/provider lines.
