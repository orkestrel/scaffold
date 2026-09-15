# Unit G2 — absorb `@orkestrel/mcp` (core, browser, server; transports; in-page server feasibility)

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. Edit nothing, create nothing, run no command that writes.

## Objective

Return the distilled evidence the Orchestrator needs to answer one question:

> Under the contracts published today, what does `@orkestrel/mcp` publish for its core, browser,
> and server environments; which transports exist in each; and can an `MCPServer` and an
> `MCPClient` both live in one browser page (or a page and its worker) and exchange calls with no
> network hop?

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/mcp` — `@orkestrel/mcp` 0.0.30. Exports: `.`, `./browser`, `./server`. Runtime deps: codec, contract, emitter, process, sse, tool, websocket. Peer deps: `@orkestrel/router`, `@orkestrel/server`.
- `@orkestrel/tool` 0.0.14 is the tool contract; its guide is mirrored at `mcp/guides/tool.md`.
- Law you may cite: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.

## Scope (read these, in this order)

1. `mcp/src/core/types.ts` (first), `mcp/src/core/index.ts`, `mcp/src/core/constants.ts`, `mcp/src/core/MCPServer.ts`, `mcp/src/core/MCPClient.ts`, `mcp/src/core/MCPMethodManager.ts`, `mcp/src/core/MCPTaskClient.ts`, `mcp/src/core/MCPStreamController.ts`, `mcp/src/core/MCPTextStreamController.ts`, `mcp/src/core/MCPProgressReporter.ts`, `mcp/src/core/MCPLegacy.ts`, `mcp/src/core/MCPLegacyClientTransport.ts`, `mcp/src/core/transports/HTTPClientTransport.ts`, `mcp/src/core/factories.ts`.
2. `mcp/src/browser/**` (all files).
3. `mcp/src/server/types.ts`, `mcp/src/server/index.ts`, `mcp/src/server/MCPSession.ts`, `mcp/src/server/handlers.ts`, `mcp/src/server/middlewares.ts`, `mcp/src/server/factories.ts`, `mcp/src/server/transports/*.ts`, `mcp/src/server/HTTPDisconnect.ts`.
4. `mcp/tests/fixtures/browserServer.ts`, `mcp/tests/src/browser/**`, `mcp/tests/src/core/MCPServer.test.ts`, `mcp/tests/src/core/MCPClient.test.ts`, `mcp/tests/integration.test.ts`, `mcp/tests/src/core/integration.test.ts`, `mcp/tests/src/server/integration.test.ts` — to locate the scenarios Evidence items 2 and 8 need.
5. `mcp/guides/mcp.md` (5554 lines): read the full heading tree; read in full the sections on transports, the browser environment, the server environment, tools, tasks, elicitation, sampling, and any section whose heading names a page, a worker, a `MessagePort`, or `postMessage`.
6. `mcp/package.json`, `mcp/vite.config.ts`, `mcp/tests/mirrors/ext-tasks-2026-07-28-schema.json` (only its header and version fields).

## Evidence sought (number your answers to match)

1. **Transport contracts.** Every transport interface in `mcp/src/core/types.ts` (client side, server side, session side): members with signatures, the message value type they carry, lifecycle verbs, events. `file:line`.
2. **Concrete transports.** For every class under `src/*/transports/` and `MCPLegacyClientTransport`: environment, which end it implements (client, server, both), what host object it wraps (`MessagePort`, `WebSocket`, `fetch`, stdio, SSE), constructor input, `file:line`. For `MessagePortTransport`: can a pair be built from one `MessageChannel` so that a server and a client in one page talk through it; name the factory that builds it; name the test scenario in `tests/src/browser/transports/MessagePortTransport.test.ts` and what `tests/fixtures/browserServer.ts` builds (what runs on which side, in which runtime — page, worker, Node).
3. **MCPServer.** Constructor options verbatim from `types.ts`; how tools are registered (does it take `@orkestrel/tool` `Tool`/`ToolManager` instances, its own registry, or both — `file:line`); how a `tools/call` is dispatched to the tool's execution (`file:line`); which MCP capabilities it implements, each with `file:line` of the method registration: tools, resources, resource templates, prompts, logging, completion, elicitation, sampling (server→client), roots, tasks, progress, cancellation, streaming, `ping`; and every module the core `MCPServer` imports (confirm or refute that core imports nothing from `@orkestrel/router`, `@orkestrel/server`, `@orkestrel/process`, `node:*`, or the DOM).
4. **MCPClient.** Constructor input, how it connects and initializes, how it lists and calls tools, how it handles server→client requests (sampling, elicitation, roots, progress), what it needs from the consumer besides a transport. `file:line`.
5. **Browser barrel.** Every row of `src/browser/index.ts`; every factory in `src/browser/factories.ts` with its signature and what it builds; the constants in `src/browser/constants.ts`.
6. **Server barrel.** Every row of `src/server/index.ts`; the session class's public surface; the handlers and middlewares (which HTTP framework they target — `@orkestrel/server`/`@orkestrel/router` — and the exact route paths and methods they register); the stdio transports' constructor inputs.
7. **Protocol.** The protocol version identifiers in `src/core/constants.ts` (the value and every version the server negotiates), the JSON-RPC framing helpers, and the tasks-extension mirror's declared version/date.
8. **Guide.** The full heading tree of `mcp/guides/mcp.md` to two levels. Then, for the browser section and the server section, at most ten lines each on what they document about running a server or a client inside a browser page or a worker. Quote every sentence that mentions `WebMCP`, `navigator.modelContext`, an extension, a content script, `postMessage`, or an in-page server (say `none found` if none).
9. **Packaging.** `exports`, `files`, `sideEffects`, `browser`, `peerDependencies`, and `peerDependenciesMeta` from `mcp/package.json` verbatim; the Vitest projects in `mcp/vite.config.ts` (names, environments; which run under Playwright).
10. **Naming facts a designer needs.** The one-word member names on `MCPServer` and `MCPClient` (managers and methods), and the name of every `create*` factory in core.

## Output

Return only, in this order:

- `Question`: one line.
- `Evidence`: the ten numbered items, each a compact list of facts with `file:line` pointers. Quote signatures verbatim; never paste a whole file. Keep the whole section under about 600 lines.
- `Distillate`: at most 25 lines: the smallest set of facts a designer needs to decide whether an in-page MCP server with an in-page client works today and what stands in its way.
- `Unknowns`: facts the scope did not settle, one per line, naming the evidence item.
- `Journal`: write `journal: (driver fills)`.
- `Deviation`: `none`, or the exact failure.

No decisions, no design, no recommendations, no process diary.
