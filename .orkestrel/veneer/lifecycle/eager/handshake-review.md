# Review of `61fbe94..369d765` — the handshake hook

Lane: objective plus API shape, Opus 5.5, read-only, 2026-10-03. VERDICT: FAIL 1, 4, 5, 6. Claims 2 (error mapping, one `error` event, the remark scope), 3 (cancellation on the binder carriers), and 7 (API and rules) hold.

1. Stdio holds (only the `initialize` arm awaits the hook, `src/core/MCPLegacy.ts:142-158`; `ping` inline at `:169-170`; legacy `tools/list` forwards at `:171-172`; modern requests exit at `:92-93`, `:117-118`; `createDuplexServerTransport` does not serialize messages, `src/server/factories.ts:115-118`). Refuted over HTTP: without a hook, a refused `initialize` behind `createMCPSession` no longer carries `Mcp-Session-Id` (`src/server/middlewares.ts:220`), the intended correction but a byte change; and a headerless legacy `ping` before the `InitializeResult` is refused 400 `-32020` (`src/server/inferers.ts:96-102`) or 404 behind `createMCPSession` (`middlewares.ts:182-195`). `guides/mcp.md:1990-1992` states both without scope.
4. The mint reads only `context.state.initialization?.result` (`middlewares.ts:220`), recorded before framing (`src/server/handlers.ts:207-216`); the SSE twins fail under a body-as-JSON reading. Counterexample: an `initialize` POST carrying a live `Mcp-Session-Id` whose hook rejects resolves the entry at `middlewares.ts:146-151`, `created` stays undefined, and `:233` stamps the session header on the refused answer, so "a refused initialize returns no `Mcp-Session-Id`" is false there. No consumer outside this repository uses `createMCPSession`; the `369d765` fixture change restores the test's intent (the bare modern server answers a legacy `initialize` with `-32601`; coverage of a bare server over HTTP remains at `tests/src/server/factories.test.ts:317`).
5. Stdio conforms; HTTP refuses a pre-response `ping` (pre-existing, outside U1, referred).
6. Case b asserts `-32000` (`tests/src/server/factories.test.ts:123`, `:145`; `tests/src/server/middlewares.test.ts:76`, `:92`), which is `JSONRPC_SERVER_ERROR`; `return buildJSONRPCError(id, JSONRPC_SERVER_ERROR, error.message, error.context)` passes every assertion. Cases a, c, e, f, g, and h discriminate.

## Findings outside the claims

- HTTP disconnect while the hook waits: the abort rethrows out of `handlers.ts:197` and `@orkestrel/server` reports it through its own error path, as a forwarded call already does after an abort (referred).
- `handlers.ts:207-216` records `initialization` only when `'session' in context.state`; the guide (`guides/mcp.md:2603`) and the `createMCPPostHandler` TSDoc (`handlers.ts:29-50`) do not say so.

## Required

1. Case b: use a code no legacy path emits (for example `-32042`) and assert it.
2. `guides/mcp.md:1990-1992`: scope the availability sentence to the binder carriers (stdio, WebSocket, `MessagePort`) and the byte-identity sentence to the dispatcher's answers, pointing to the HTTP transport section for the session-header change.
3. `src/server/middlewares.ts:52-54`, `guides/mcp.md:2605-2607`: an `initialize` that would mint a session stores none and advertises none when refused; a live session's header is returned unchanged.

## Advisory

1. A case e twin for `handle.stop()` while the hook is pending (only input end is driven).
2. `guides/mcp.md:2591` lists the `MCPServerInterface` data members without `handshake`.
3. `src/server/types.ts:263`: the `session` remark misses the refused candidate that is never stored.
4. The `MCPServerOptions` remarks (`src/core/types.ts:2157-2178`) do not describe `handshake`.
5. An unserializable `MCPError` context (a `BigInt`, a cycle) makes `JSON.stringify` throw at `MCPLegacy.ts:124`; the binder emits `error` and writes nothing.
