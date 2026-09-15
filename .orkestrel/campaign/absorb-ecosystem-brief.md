# Unit absorb-ecosystem — transport, streaming, and auth mechanisms already published in the `@orkestrel` line

## Role and engine

`grok` on Cursor Grok 4.6 (`cursor-grok-4.6-high`), reached through the Cursor CLI in print mode.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly and
spawn nothing.

## Objective

Return a distillate of which published `@orkestrel/*` packages already supply the mechanisms a
browser↔server provider bridge would need, and exactly what their public surfaces are, so a designer
reuses them instead of reimplementing them.

## Question

Which `@orkestrel/*` packages already provide: an HTTP request path usable from host-independent
core or the browser; server-side route and body handling; SSE, NDJSON, or WebSocket streaming in
each direction; request authentication, session, or token middleware; abort, timeout, and budget
propagation across a request; tool definition and tool call shapes; guards and parsers for wire
bodies — and what are their exact exported names and environments?

## Context

**Guide mirrors (absolute paths, read-only).** `C:/Users/mikes/WebstormProjects/scaffold/guides/`
holds one byte-identical guide mirror per published package. Read these:
`server.md`, `router.md`, `middleware.md`, `sse.md`, `ndjson.md`, `websocket.md`, `browser.md`,
`contract.md`, `tool.md`, `abort.md`, `timeout.md`, `budget.md`, `emitter.md`, `codec.md`, `msg.md`,
`mcp.md`, `process.md`, `console.md`, `workspace.md`, `queue.md`, `workflow.md`, and `README.md`.

**Installed declarations for the two subject packages.** Where a guide is ambiguous about an export's
environment, confirm from the installed declaration under
`C:/Users/mikes/WebstormProjects/ollama/node_modules/@orkestrel/<name>/dist/src/<env>/index.d.ts`
or the same path under `C:/Users/mikes/WebstormProjects/agent/node_modules/`, and point at it.

**Host.** Windows 11, Cursor CLI print mode, working directory `C:/Users/mikes/WebstormProjects`.
Read files only. Run no shell command, install nothing, edit nothing.

## Evidence sought

Report every item with `file:line` pointers into the guide (or the declaration file). Quote at most
three lines per pointer. Never paste a whole section.

1. **Per-package card.** For each guide named in Context: the tagline (the blockquote under the H1),
   the environments it publishes (bare `@orkestrel/<name>` core, `/browser`, `/server`) with the
   guide line that states them, its runtime `@orkestrel/*` dependencies, and its layer if the guide
   states one.
2. **HTTP client from core or browser.** Any exported class, factory, or helper that issues an HTTP
   request with a streamed or chunked body from host-independent code or from the browser (`fetch`
   wrappers, request builders, response readers, retry, backoff). Name the export, its guide line,
   and its environment.
3. **Server routes and bodies.** In `server.md`, `router.md`, and `middleware.md`: how a route is
   declared, how a handler reads a JSON or streamed request body, how it writes a streamed response,
   the context object a handler receives, and how a middleware chain is composed — export names and
   guide lines.
4. **Streaming both directions.** In `sse.md`, `ndjson.md`, `websocket.md`, `codec.md`, and
   `msg.md`: every exported encoder, decoder, parser, stream transformer, client, and server-side
   writer, with environment and guide line. State which of them run in core, which need the browser,
   and which need Node.
5. **Authentication and sessions.** In `middleware.md`, `server.md`, and `browser.md`: every export
   that verifies a bearer token, signs or reads a cookie, manages a session, computes an HMAC, or
   applies CSRF or CORS, with guide lines. State plainly which of these is a mechanism (reusable) and
   which the guide calls product policy.
6. **Abort, timeout, budget.** In `abort.md`, `timeout.md`, and `budget.md`: the exported primitives
   and how each is meant to cross a request boundary (a signal passed to `fetch`, a deadline header,
   a token budget consumed from a stream), with guide lines.
7. **Tool shapes.** In `tool.md`: the tool definition type, the tool call and tool result shapes,
   the registry or manager, and how a definition is serialized to JSON Schema, with guide lines.
8. **Contract primitives for wire bodies.** In `contract.md`: the guards, combinators, parsers,
   `Result`/`attempt`, and shape DSL exports a package uses to validate an incoming JSON body and to
   compile a schema, with guide lines — names only, not semantics beyond one line each.
9. **Prior art for a relay.** Search every guide in the directory for the words `relay`, `proxy`,
   `bridge`, `remote`, `forward`, `upstream`, `gateway`, and `provider`. Report each hit with
   `file:line` and one line on what the passage describes.
10. **MCP as a comparison.** In `mcp.md`: how the package splits a client face from a server face,
    which transports it supports, and how it carries a tool call across a transport, with guide
    lines — because it is the line's existing example of one contract driven over several transports.

## Output

Return only this shape, as your final message:

- `Question`: one line.
- `Evidence`: items 1–10, each as concise facts with `file:line` pointers.
- `Distillate`: at most forty lines — for each need in the Question, the export that meets it and
  the environment it runs in, or `none published` where nothing does.
- `Unknowns`: every guide, export, or environment you could not settle, with the path you tried.
- `Journal`: leave this line as `Journal: supplied by the launcher`.
- `Deviation`: `none`, or what stopped you.

Bound the whole return at 500 lines. Give evidence, never a design, a recommendation, or a verdict.

## Deviation contract

Stop and report under `Deviation` if a named file does not exist or is unreadable. Decide for
yourself how to order sub-items inside a numbered item.
