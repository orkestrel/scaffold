# Unit handshake-fix — repair the handshake review

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in `C:\Users\mikes\WebstormProjects\mcp` on `main` at the tip you find (`369d765` plus the timer-lead commit). Make one commit; never push, publish, or install. Perform the assignment yourself and spawn nothing.

## The review

Opus, objective plus API, over `61fbe94..369d765` (2026-10-03), saved at `tmp/codex/handshake-review.md`: FAIL 1, 4, 5, 6. Repair every REQUIRED change and take every ADVISORY, as follows.

## Required

1. Case b: `tests/src/server/factories.test.ts:123`, `:145`, and `tests/src/server/middlewares.test.ts:76`, `:92` use `-32000`, which is `JSONRPC_SERVER_ERROR`, so a mapping that ignores `error.code` passes. Use a code no legacy path emits (for example `-32042`) and assert it, and show the hard-coded-constant mutation red.
2. `guides/mcp.md:1990-1992`: scope "`ping`, forwarded legacy methods, and modern `server/discover` remain available while the hook waits" to the binder carriers (stdio, WebSocket, `MessagePort`), and scope "omitting the hook preserves the response bytes from 0.0.35" to the dispatcher's answers, pointing to the HTTP transport section for the session-header change (a refused `initialize` no longer carries `Mcp-Session-Id`, which the specification requires).
3. `src/server/middlewares.ts:52-54` and `guides/mcp.md:2605-2607`: say that an `initialize` that would mint a session stores none and advertises none when it is refused, and that a live session's header is returned unchanged.

## Advisory, taken

1. A case e twin that calls `handle.stop()` while the hook is pending, and one that closes the transport.
2. Add `handshake` to the `MCPServerInterface` data-member list at `guides/mcp.md:2591`.
3. `src/server/types.ts:263`: the `session` remark names the refused candidate that is never stored.
4. Describe `handshake` in the `MCPServerOptions` remarks (`src/core/types.ts:2157-2178`).
5. When an `MCPError` context cannot be serialized, answer the code and message without `data` instead of emitting an error and writing nothing; add the case.
6. Document that `createMCPPostHandler` records `initialization` in consumer state only when `'session' in context.state` (`handlers.ts:207-216`, its TSDoc at `:29-50`, and `guides/mcp.md:2603`).

## Recorded, not repaired here

The HTTP transport refuses a headerless legacy `ping` sent before the `InitializeResult` (400 at `src/server/inferers.ts:96-102`, 404 behind `createMCPSession` at `middlewares.ts:182-195`), though the lifecycle allows pings before the `initialize` response. It predates this change; the Orchestrator records it for a later unit. Change nothing there.

## Gates

After the commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src`, `npm run test:guides`, `npm run test:policy`, `npm run test:config`, `npm run build`, `npm test`; then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/handshake-fix-report.md` and return it as your final message: per item the repair and its red and green evidence, the gate table, the commit hash, and any deviation. No process diary.
