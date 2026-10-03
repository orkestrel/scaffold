# Unit browser-lifecycle-browse — how `@orkestrel/browser` and the `browse` server start, reuse, and close browsers

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only: create, edit, move, and delete nothing. Report what the code does, with `path:line`; do not design. Another writer is editing `src/core/BrowserToolset.ts`, `src/core/constants.ts`, `src/core/helpers.ts`, and `src/core/BrowserReading.ts` in this checkout; read lifecycle code as it stands and note any line that looks mid-edit.

## The user's question

When an agent uses the `browse` MCP server, and when this package's own tests run, does each call or test start a browser cold, or is a browser kept running and reused with proper cleanup? Are several browsers or contexts kept alive to run work in parallel? The user compares this with `@orkestrel/probe`, whose MCP server starts its workers when the MCP server starts, so later calls skip the startup cost.

## Map

1. In this checkout (`C:\Users\mikes\WebstormProjects\browser-wt-browse`): how the library launches or connects to a browser (launcher, executable discovery, CDP connection, browser contexts, pages, frames), what each public entry creates, and what `destroy`/close releases. Cite `path:line`.
2. The `browse` MCP server (`src/bin/`, `src/server/`, the toolset): when the browser starts (server start, first tool call, each call), whether it is reused across tool calls and sessions, how tabs and contexts map to sessions, what a journey `replay` starts, idle shutdown, crash recovery, and what happens on server exit.
3. This package's tests: `tests/setupService.ts`, `tests/service/**`, `tests/setupServer.ts`, and the Vitest projects in `vite.config.ts`: whether each test, file, or project launches its own browser, how many launches a full `npm run test:service` causes, and how they are cleaned up.
4. The comparison: `C:\Users\mikes\WebstormProjects\probe` (its MCP server under `src/bin/` and `src/server/`): what it starts at server start and keeps warm, how it reuses that across calls, and how it shuts down. Cite `probe:path:line`.

## Output

One Markdown document with sections 1 to 4, a table of browser launches per entry point and per test script, and `## Unknowns`. No recommendations.
