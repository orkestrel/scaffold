# Report — unit mcp-fixup (builder, Sonnet)

Every finding closed, no deviation.

1. `createMessageTransportBridge` → `createDuplexServerTransport` at `src/server/factories.ts:103`
   and call sites `:352`, `:484`; guide rows `guides/mcp.md:2673,2820,2837`; consumers
   `tests/fixtures/browserServer.ts:22,177` (imports re-sorted),
   `tests/src/server/factories.test.ts:862`,
   `tests/src/server/transports/StdioServerTransport.test.ts:5,234`,
   `tests/src/server/transports/WebSocketServerTransport.test.ts:4,200,226,266`. The TSDoc at
   `src/server/factories.ts:50-58` names the server-side mirror of `createDuplexClientTransport`.
2. `guides/mcp.md:2671` server `createHTTPClientTransport` row reads as the browser row; italic
   notes added to the server Entities section (`HTTPClientTransport` ships from core), the server
   Helpers section (`decodeEvent`, `readEventStream`, `buildResponseError` ship from core), and
   both face Types sections (`HTTPClientTransportOptions` in the core Types table).
3. `tests/src/server/integration.test.ts:41-42`: the `MCPClient.test.ts` path corrected, the
   nonexistent `ollama` pointer deleted.
4. `tests/src/core/MCPClient.test.ts:56` points at `tests/src/server/integration.test.ts`; its
   dead `ollama` pointer removed.
5. `tests/guides.test.ts:515-517` presents `FIXTURE_FILES` as a synthetic negative control.
6. `tests/src/server/factories.test.ts:862`: `through createDuplexServerTransport`.
7. Probe (retained as `mcp-fixup-probe-legacy-owner.mjs`) over `LEGACY_OWNER_PATTERN` against
   `MCPSessionMiddlewareOptions`, `MCPSessionOptions`, `MCPSessionInterface`, `MCPSessionState`,
   `MCPSessionEvent`, `MCPSessionEntry`, the `MCPSession` class, and `createMCPSession`: every
   case PASS; pattern unchanged.

Sweep (`createMessageTransportBridge`, `MessageTransportBridge`, `via`, `tests/src/core/mcp/`,
`tests/src/ollama/`, `tests/src/server/mcp/`, case-insensitive, over `src`, `tests`,
`guides/mcp.md`, `README.md`): no hit for any pattern except `via` at
`tests/src/server/factories.test.ts:52,55` and `tests/src/server/integration.test.ts:39,75,145`,
pre-existing prose outside the named line, recorded for the voice wave.

Gates: lint 0 and format 0 to converge; format:check 0, lint:check 0, check 0, build 0, test 0
(src 1337 passed, 1 pre-existing skip; policy, config, setup, guides, conformance, integration
all passed). `git status --short`: the nine owned files.
