# Unit browse-eager-map — facts for an eager, recovering `browse` server

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only: create, edit, move, and delete nothing. Report what the code and the primary sources say, with `path:line` or a URL; do not design. Another writer is editing `src/core/BrowserToolset.ts`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/BrowserReading.ts`, and several tests in this checkout; `src/server/` and `src/bin/` are stable. Note any line that looks mid-edit.

## Context

The user ruled on 2026-10-03: the `browse` MCP server launches Chromium at server start, the highest point upstream, never inside a tool call; it recovers a crashed browser; then a warm spare browser starts outside every tool call. A broken tool must show at the onset. The lifecycle map is `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\browser-browse-map.md`; do not repeat it.

## Map

1. The MCP stack under `BrowserMCPServer` (`src/server/BrowserMCPServer.ts`): which installed `@orkestrel/*` package provides the MCP server and stdio transport (cite `node_modules/@orkestrel/*/dist` declarations and source). How `initialize` is answered: can a server defer its `initialize` result until a promise settles, or answer it with an error; what hooks exist before and after it; how a tool error, a logging notification (`notifications/message`), and `notifications/tools/list_changed` are sent, if at all.
2. What a recovery must rebuild: everything `#launch` and `#open` create (`src/server/BrowserMCPServer.ts`), what the toolset and journey toolset hold (page registry, retained readings, turn queue, replay state, stores), whether the tools registered in the server constructor are bound to one toolset instance or resolve it per call, and whether a toolset can be pointed at another page or must be rebuilt.
3. Every signal `Browser`, `BrowserContext`, and `BrowserPage` emit for a dead or hung browser: owned-process exit, dropped socket, `Inspector.targetCrashed`, `Target.targetDestroyed`, a command that never answers. Give the event names, payloads, codes, and the state each leaves (`src/server/Browser.ts`, `src/core/*`).
4. Installed `@orkestrel/*` primitives a supervisor could reuse: queues, timeouts, abort helpers, emitters, process spawning or supervision, retry or backoff. Cite each declaration and say what it does.
5. Profiles and ports: `ROOT/.profiles/<uuid>` creation and removal, what a killed server leaves behind, and the port 9222 refusal (`discover: false`): what a user's own Chrome on 9222 does to a launch.
6. Primary sources on the web, cited by URL, or `UNREACHABLE` when you cannot fetch: the MCP specification's lifecycle (`initialize`, `initialized`, errors during initialization, logging); how Claude Code, the Codex CLI, and Cursor start a stdio MCP server, the startup timeout each applies (its default and how it is set), and how each shows a server that fails to initialize or exits.
7. Playwright's browser server: what `browserType.launchServer()` and `npx playwright run-server` each do per client connection (one shared browser, or a browser per connection), what `browser.close()` on a connected client releases, and whether a browser launched by `launchServer` can also expose a CDP endpoint (`--remote-debugging-port`). Cite the installed `playwright-core` source in `C:\Users\mikes\WebstormProjects\veneer\node_modules\playwright-core` and the Playwright docs.

## Output

One Markdown document with sections 1 to 7 and `## Unknowns`. No recommendations.
