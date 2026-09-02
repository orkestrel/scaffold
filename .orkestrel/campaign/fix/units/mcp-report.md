# Unit breaking-mcp — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s01-01** — applied: HTTPClientTransport moved to src/core/transports/HTTPClientTransport.ts, exported from the core barrel and dropped from both face barrels; each face keeps only its create* factory returning the core class. The non-ok fork is unified on the rejecting behaviour: the browser face changed from swallowing to rejecting (mutation probe: removing the throw reddened the non-success reply proof, 1 failed | 1 passed, restored 2 passed; the old browser 'surfaces on the error event' assertion went red and was rewritten to rejects.toThrow).
- **s01-02** — applied: decodeEvent and readEventStream moved to src/core/helpers.ts with buildResponseError; both face copies deleted, no re-export.
- **s01-03** — applied: createScopeMessageListener, serveMCPScope, and serveMCP moved out of src/browser/helpers.ts into src/browser/factories.ts; serveMCPScope and serveMCP merged into one createScopeServer(options, scope?) returning the declared ScopeServerInterface { stop(): void }, scope defaulting to globalThis; src/browser/helpers.ts deleted with its barrel row. ServeMCPOptions is ScopeServerOptions, ServeMCPScopeInterface is ScopeInterface. Two default-scope proofs added over the real globalThis and a real MessageChannel.
- **s01-04** — applied: DEFAULT_MCP_CLIENT_NAME and DEFAULT_MCP_SERVER_NAME are '@orkestrel/mcp'; no taverna remains in src, tests, or guides.
- **s01-06** — applied: Both cache-stamp comments in src/core/MCPServer.ts (#list and #resources) name ttlMs and cacheScope instead of counting them.
- **s01-07** — applied: The middleware type is MCPSessionMiddlewareOptions; MCPSessionOptions is rebound to the entity's { capacity?, ttl? }.
- **s01-09** — applied: createReadableStream deleted with its guide row and fence; HTTPDisconnect constructs new ReadableStream<Uint8Array>({ pull: this.#pull, cancel: this.#cancel }) with #pull/#cancel as bound arrow fields delegating to #pump/#discard and holds #reader as a field.
- **s01-10** — applied: MCPClientTransportInterface is MCPMessageTransportInterface and MCPClientTransportEventMap is MCPMessageTransportEventMap across src, tests, and the guide including the Methods bijection list; the guide's deferral paragraph is deleted.
- **s01-11** — applied: bridgeMessageTransport is createMessageTransportBridge, moved to src/server/factories.ts; it returns MCPTransportInterface and keeps the brief's name rather than the strict createMCPTransport because its mirror createDuplexClientTransport(transport: MCPTransportInterface): MCPMessageTransportInterface is outside the row and would read asymmetric.
- **s01-18** — applied: EventStoreEntry is MCPSessionEvent; the EventStore history sentences in MCPSession.ts and its test are gone.
- **s01-19** — applied: inferHeaderIssue(request, invocation: JSONRPCInvocation) and inferSessionHeaderIssue(request, version: MCPVersion); handlers.ts takes the first, middlewares.ts the second; coverage split with the missing arm.
- **W-DEV carrier** — applied: MCPProgressOwnerInterface's Methods table lists the inherited report beside take and stop; the prose names the members (test:guides went 1 failed | 153 passed to 154 passed).
- **upstream adoption** — applied: openStream is createStream (@orkestrel/server) across src, tests, and guides/mcp.md; npm run check went from three TS2305 diagnostics to clean. The local test helper openStream in tests/src/server/middlewares.test.ts is openSessionStream.
- **carries** — applied: WebSocketError: no catch site in any WebSocket path (WebSocketClientTransport.ts:117 is try/finally), nothing to adopt. ProcessChildInterface: unused (StdioClientTransport imports Process, ProcessExit, PROCESS_GRACE only). sse clear(): unused (no .reset( anywhere).

## Symbols moved

- HTTPClientTransport, HTTPClientTransportOptions, decodeEvent, readEventStream, MCP_SESSION_HEADER, MCP_PROTOCOL_VERSION_HEADER, MCP_METHOD_HEADER, MCP_NAME_HEADER left @orkestrel/mcp/browser for @orkestrel/mcp
- HTTPClientTransport, HTTPClientTransportOptions, decodeEvent, readEventStream, buildResponseError, and the four wire headers left @orkestrel/mcp/server for @orkestrel/mcp
- serveMCPScope + serveMCP → createScopeServer (browser factories)
- ServeMCPOptions → ScopeServerOptions; ServeMCPScopeInterface → ScopeInterface; added ScopeServerInterface (browser types)
- createReadableStream → removed (server)
- bridgeMessageTransport → createMessageTransportBridge (server factories)
- EventStoreEntry → MCPSessionEvent (server types)
- MCPSessionOptions → MCPSessionMiddlewareOptions; new entity-scoped MCPSessionOptions { capacity?, ttl? } (server types)
- inferHeaderIssue(request, invocation) signature; added inferSessionHeaderIssue(request, version) (server inferers)
- MCPClientTransportInterface → MCPMessageTransportInterface; MCPClientTransportEventMap → MCPMessageTransportEventMap (core types)
- DEFAULT_MCP_CLIENT_NAME and DEFAULT_MCP_SERVER_NAME → '@orkestrel/mcp'
- upstream adoption: openStream → createStream (@orkestrel/server)

## Files touched

- src/core/transports/HTTPClientTransport.ts (new)
- src/core/{index,constants,types,helpers,factories,MCPServer,MCPClient,MCPLegacyClientTransport}.ts
- src/browser/{index,constants,types,factories}.ts
- src/browser/transports/{MessagePortTransport,WebSocketClientTransport}.ts
- src/server/{index,constants,types,helpers,factories,handlers,inferers,middlewares,HTTPDisconnect,MCPSession}.ts
- src/server/transports/{StdioClientTransport,StdioServerTransport,WebSocketClientTransport,WebSocketServerTransport}.ts
- deleted: src/browser/helpers.ts, src/browser/transports/HTTPClientTransport.ts
- guides/mcp.md
- guides/README.md

## Tests changed

- tests/src/browser/transports/HTTPClientTransport.test.ts → tests/src/core/transports/HTTPClientTransport.test.ts
- tests/src/server/transports/HTTPClientTransport.test.ts → tests/src/server/integration.test.ts (real node:http listener; new untracked file)
- tests/src/browser/helpers.test.ts merged into tests/src/browser/factories.test.ts
- decodeEvent/buildResponseError/readEventStream describes moved from tests/src/server/helpers.test.ts to tests/src/core/helpers.test.ts
- inferHeaderIssue split; inferSessionHeaderIssue coverage with the missing arm
- unified non-ok proofs; two default-scope proofs
- tests/guides.test.ts: LEGACY_OWNER_PATTERN admits MCPSessionMiddlewareOptions and MCPSessionEvent; control identifiers name createScopeServer
- tests/src/server/middlewares.test.ts local helper openStream → openSessionStream

## Gates

- `npm run check` → exit 0 — before: 3 × error TS2305 has no exported member 'openStream'; after: no diagnostics
- `npm run lint:check` → exit 0 — no diagnostics
- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 3162ms on 125 files using 4 threads.
- `npm run build` → exit 0 — Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- `npm test` → exit 0 — src 31 files 1337 passed | 1 skipped; policy 111; config 46; setup 86; guides 159; conformance 47; integration 4

## Diff stat

```text
56 files changed, 1901 insertions(+), 2171 deletions(-)
```

Status at return (writer's reading): `two git mv renames staged; three deletions; one untracked addition tests/src/server/integration.test.ts`
Built `dist/` moves: yes — every barrel's declarations changed; dist/src/browser/index.d.ts carries no HTTPClientTransport; dist/src/core/index.d.ts carries HTTPClientTransport, HTTPClientTransportOptions, decodeEvent, readEventStream, buildResponseError, and the four headers

## Observations

- git mv staged the two renames; git add -N on the new test file was undone with git update-index --force-remove; no commit
- guides/README.md:58 still spells openStream because it describes the byte-identical vendored guides/server.md mirror, which is off-limits and still documents openStream; belongs to the mirror-refresh unit
- npm run test:conformance needs a current dist/ (2 failed | 45 passed against a stale dist; 47 passed after build); tests/setupConformance.ts states the requirement
- HTTPDisconnect.#pump guards #reader === undefined, unreachable through the public API; the comment records where a reader meets it
- timing: core 4.3 s, browser 17.3 s, server 26.0 s, conformance 8.9 s; the one skip is the pre-existing host-conditional StdioClientTransport SIGTERM case

## Deviations

- serveMCP and serveMCPScope merged into createScopeServer(options, scope?): the ruling requires each moved factory to be create{Entity} of its declared return type and both returned the same type; architecture.md § Wrapper test condemns serveMCP as a one-line default-argument delegate; breaking-radius.json records no external consumer for s01-03
- createMessageTransportBridge kept the brief's name rather than the strict createMCPTransport, for symmetry with createDuplexClientTransport outside the row

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/mcp.diff`,
`tmp/units/breaking/mcp.status`.
