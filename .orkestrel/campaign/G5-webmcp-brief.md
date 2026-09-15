# Unit G5 — research WebMCP and browser-native agent tooling (primary sources, September 2026)

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY and needs the web. If you hold no tool that can search or fetch a
URL, return only the `Deviation` line `no web access` and stop.

## Objective

Return the distilled evidence the Orchestrator needs to answer one question:

> What is WebMCP as of 2026-09-15 — its venue, specification status, exact API surface, security
> model, and the agents that consume its tools — and which adjacent browser-native mechanisms for
> agent tools and page reading exist that an in-page MCP server, an in-page tool registry, and an
> in-page agent must interoperate with or be measured against?

## Context

- The Orchestrator's own packages (`@orkestrel/mcp`, `@orkestrel/tool`, `@orkestrel/agent`, `@orkestrel/browser`) are NOT in scope. Do not read the local checkouts.
- Prefer primary sources: the proposal repository, the specification draft, the browser vendors' developer documentation, the MCP specification, and the standards bodies' minutes. Cite a URL and the date shown on the page for every fact. Mark anything not directly stated in a source as `inference`.

## Sources to reach (start here; follow links they name)

1. `https://github.com/webmachinelearning/webmcp` — README, explainer, `docs/`, open issues (titles of the ten most-discussed).
2. `https://webmachinelearning.github.io/webmcp/` — the specification draft if published.
3. `https://developer.chrome.com/` and `https://developer.chrome.com/blog/` — pages on WebMCP, "Web Model Context", `navigator.modelContext`, the early preview program; `https://chromestatus.com/` feature entry for WebMCP.
4. `https://github.com/MicrosoftEdge/MSEdgeExplainers` — the WebMCP or Web Model Context explainer.
5. `https://modelcontextprotocol.io/specification/` — the current specification revision id, the transports section, tools/resources/prompts, elicitation, tasks, and any "MCP Apps" or UI extension; `https://github.com/modelcontextprotocol/modelcontextprotocol` for SEPs that mention browsers or web pages.
6. `https://mcp-b.ai/` and `https://github.com/MiguelsPizza/WebMCP` — the earlier MCP-B project and its transports.
7. W3C Web Machine Learning Community Group minutes and any W3C TAG review mentioning WebMCP.
8. `https://developer.chrome.com/docs/ai/` — the built-in Prompt API (`LanguageModel`) and whether it calls WebMCP tools.

## Evidence sought (number your answers to match)

1. **Status.** Proposers, venue, maturity (explainer, CG draft, WICG, WG), browser shipping status per vendor with version or flag and date, and the dates of the latest changes.
2. **Imperative API.** The exact global (`navigator.modelContext`?), every method with its parameter shape (tool name, description, `inputSchema` format, `execute` callback signature, return shape — content blocks or plain values, annotations), unregistration, and lifecycle (per document, per navigation, bfcache). Quote the IDL or the explainer's code sample.
3. **Declarative API.** The HTML attributes or elements (forms, `toolname`, `tooldescription`, `toolparamdescription`, or whatever the source names), how a form submission becomes a tool call, and how results return.
4. **Callers.** Who calls a page's tools: the browser's built-in agent, an extension API (name it), an external agent through a browser bridge, or a script in the same page. State whether a page can call its own tools or another origin's tools, and what transport carries the call (an internal browser channel, not exposed, or a documented one).
5. **Security model.** User activation requirements, consent prompts, origin scoping, iframes and cross-origin, tool annotations (read-only, destructive, idempotent), prompt-injection guidance, rate limiting, and any threat-model document.
6. **Relationship to MCP.** How a WebMCP tool maps to MCP `tools/list` and `tools/call` (schema and result shape); whether resources, prompts, sampling, elicitation, or tasks have any WebMCP counterpart; whether a page can expose an MCP server through WebMCP or a WebMCP tool set through an MCP server (any documented bridge or extension).
7. **Adjacent mechanisms.** One line and a URL each: MCP-B's transports (tab, extension, `postMessage`); Chrome DevTools MCP; Playwright MCP; the Chrome built-in Prompt API tool calling; any accessibility-tree snapshot format agents consume (Playwright `ariaSnapshot`, Chrome DevTools MCP's snapshot); any Markdown-projection-of-pages tool agents use; the `chrome.ai`/`LanguageModel` tool-use API if documented.
8. **Open problems.** From the sources' own open issues and explainer sections only: what WebMCP does not cover (state, sessions, streaming results, auth, multi-page, offline, non-Chromium engines). Cite each.

## Output

Return only, in this order:

- `Question`: one line.
- `Evidence`: the eight numbered items, each a compact list of facts, every fact with a URL and the page date; `inference` marked where not stated. Keep the whole section under about 400 lines.
- `Distillate`: at most 25 lines: what a designer building an in-page MCP server, an in-page tool registry, and an in-page agent must match, must avoid, and can exceed, stated as facts from the sources.
- `Unknowns`: facts the sources did not settle, one per line, naming the evidence item.
- `Journal`: write `journal: (driver fills)`.
- `Deviation`: `none`, `no web access`, or the exact failure.

No decisions, no design, no recommendations, no process diary.
