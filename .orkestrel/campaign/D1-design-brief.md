# Unit D1 — design: browser-native agent, tools, and MCP (phase one), with a bounded sketch of the browser reading arm (phase two)

## Role and engine

This one brief goes, unchanged, to two blind lanes:

- **Subjective lane:** `planner` on Opus 5, a native Claude subagent (read-only tools: Read, Grep,
  Glob). Fill `Design`, `Alternatives`, `Units`, `Tensions`, `Risks`.
- **Objective lane:** `analyst` on GPT-6 Astra (`gpt-6-astra`, the objective engine for this
  campaign; it stands in the Sol seat), reached as a read-only `codex exec` rooted at
  `C:/Users/mikes/WebstormProjects`. Fill `Constraints`, `Refusals`, `Measurements`, `Units`,
  `Tensions`, `Risks`.

Whichever lane you are: perform the assignment directly and spawn nothing. Do not see, guess at,
or reconcile the other lane's answer. Do not hedge toward an imagined consensus. State which lane
you hold in your first line.

## Objective

Return a design — API shape, vocabulary, placement, units, acceptance criteria — that makes the
following true with the smallest coherent change to `@orkestrel/tool`, `@orkestrel/mcp`, and
`@orkestrel/agent`, and a bounded sketch (not a design) for `@orkestrel/browser`:

1. `@orkestrel/agent` runs in a browser page alone, in a Node process alone, and across the two, and
   each placement is proven by a test that runs there.
2. A web page constructs an `Agent` and a `Tool` in the same JavaScript context, and when the model
   calls the tool, it executes in that page with no request leaving the browser.
3. A web page hosts an MCP server inside the page and an agent in the same page calls it with no
   request leaving the browser — matching what WebMCP offers and exceeding it where the packages
   already carry the parts.
4. (Sketch only.) `@orkestrel/browser` holds a parsed HTML tree for a page, keeps it manageable for
   a model, and can project it to Markdown through `@orkestrel/markdown`.

## What this round decides

This round fixes the units, their order, their ownership, and the campaign's exit criterion. What
you do not name is not built. What you name badly is built badly and audited against your naming.

## The user's instruction (verbatim, authoritative over every later item)

> I want you to take a look at the improvements made to the agent and ollama package where the
> agent is environment agnostic and the perfect native bridge between browser and server where it
> can even be used between them and even independently and solely in them. I want to make sure of
> that, especially with the tool package which the agent depends on, I want to be sure that a
> website or web application I make can have a browser native agent and tool that the agent can
> call on directly instead of it being a separate server call. I want that for my mcp package as
> well where the website/web application is a native browser mcp server that the agent can make a
> call to without ever sending the call to a server off the browser, this is in interest of the new
> WebMCP that purports to do the same but I wish to do better since we have all the parts to do it.
> I even have the browser package which is like a focused cdp only version of playwright that I
> want to improve for agents to use, i feel like it needs to be the right arm for an agent, it
> needs to hold the html ast, parsing it for use within itself and making it manageable for the
> agent, even going as far as bringing in the markdown package and making it optional to have the
> html filtered and converted to markdown to save on token and making it easier for the agent to
> read. I feel like the browser might be a separate idea, but I need to make sure of the tool and
> mcp package first and if we can ground those first and solidify what I am looking for them let's
> use our experience from that to improve browser as described.

The user has therefore authorized adding `@orkestrel/markdown` as a dependency of
`@orkestrel/browser` ("bringing in the markdown package"), and nothing else new.

## Context

**Evidence (read every file; each is a distillate with `file:line` pointers into the checkouts).**
All under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`:

- `goal.md` — the outcomes and the candidate exit criterion C1–C7.
- `G1-tool-agent-distillate.md` — tool and agent contracts, the tool loop, host independence.
- `G2-mcp-distillate.md` — mcp core/browser/server, transports, in-page pair, protocol versions.
- `G3-browser-html-markdown-distillate.md` — browser reading surface, html AST, markdown projections.
- `G4-ollama-relay-distillate.md` — ollama provider, relay/channel/authority, placement claims.
- `G5-webmcp-distillate.md` — WebMCP primary-source research (status, callers, security, MCP mapping, adjacent mechanisms).
- `G5c-webmcp-idl.md` — the WebMCP WebIDL verbatim, the imperative samples, the declarative attribute names, lifecycle sentences, and the chromestatus record (`Proposed`, no flag, no origin trial as of 2026-08-12). Use these exact names wherever the design names a WebMCP surface.
- `O1-orkestrel-report.md` — fleet map, consumers, publish order, re-pin obligations.
- `P1-closure-probe.md` — the agent's runtime closure has no Node-only root import.
- `P2-c3-probe.md` and `P2-c3-probe.mjs.txt` — an `Agent` consumed an in-process `MCPServer`'s tools over a `MessageChannel` with zero `fetch` calls, on the published packages, in Node.

Then read first-hand (the decision-bearing files; do not stop at the distillates):

- `C:/Users/mikes/WebstormProjects/tool/src/core/types.ts` (whole file, 200 lines or so).
- `C:/Users/mikes/WebstormProjects/agent/src/core/types.ts` lines 60–200 (`ProviderInterface`, `ProviderResult`), 690–820 (`AgentContextInterface`), 1080–1270 (`AgentOptions`, `AgentInterface`), and `agent/src/core/Agent.ts` lines 530–560 and 660–710 (the tool dispatch).
- `C:/Users/mikes/WebstormProjects/mcp/src/core/types.ts` lines 2120–2190 (`MCPServerOptions`), 2390–2540 (transport contracts), 2650–2760 (`MCPClientOptions`, call outcomes); `mcp/src/core/MCPClient.ts` lines 390–440 (`tools()` and `call()`); `mcp/src/browser/factories.ts` (whole file); `mcp/src/browser/transports/MessagePortTransport.ts` (whole file).
- `C:/Users/mikes/WebstormProjects/browser/src/core/types.ts` lines 380–420 and 1770–1810 (`BrowserContentResult`, frame read methods); `browser/src/core/BrowserFrame.ts` lines 105–145.
- The guides' relevant sections named in the distillates.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `documentation.md`, `browser.md`,
`quality.md`, `writing.md`; the skill `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-align-packages/SKILL.md`
and its `references/integration.md`; the skill
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden-package/SKILL.md`;
the guides `C:/Users/mikes/WebstormProjects/agent/guides/agent.md`,
`C:/Users/mikes/WebstormProjects/tool/guides/tool.md`,
`C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md`,
`C:/Users/mikes/WebstormProjects/browser/guides/browser.md`,
`C:/Users/mikes/WebstormProjects/scaffold/guides/html.md`,
`C:/Users/mikes/WebstormProjects/scaffold/guides/markdown.md`.
The `.agents/orchestration.md` vocabulary for `Units` (role names, engines).

**Host.** Windows 11. You are read-only. Every path above is absolute. The Ollama daemon on this
host answers on `http://localhost:11434` with CORS open to localhost origins (Orchestrator's
standing fact; do not probe it).

**Measurements (taken by the Orchestrator, 2026-09-15).**

- Registry: tool 0.0.14, mcp 0.0.30, agent 0.0.22, ollama 0.0.16, browser 0.0.16, html 0.0.9, markdown 0.0.14. Every checkout clean on `main`, even with origin.
- P1: zero `node:` imports and zero `process` reads in every root entry of the agent's runtime closure (control: `lsp`, `scaffold`, `database/server` show hits).
- P2: verbatim reading in the file; `fetchCalls: 0`, `executedInServer: 1`, missing tool → `ToolFailure` `tool not found: missing`.
- G1: `ToolCall` carries no `AbortSignal` and `Agent.#authorize` passes none to `tools.execute`; `ToolDefinition.parameters` is an open JSON-Schema record, not a contract shape; neither tool nor agent has a Playwright project; `MCPClient.tools()` returns `@orkestrel/tool` `Tool` instances.
- G2: `MessagePortTransport` is symmetric over `MCPTransportInterface`; the in-page pair is proven in mcp's Playwright project; `createScopeServer` boots a server in a worker scope; sampling, elicitation, and roots travel as `tools/call` `input_required` rather than as server→client JSON-RPC requests; the modern server registers no `ping` and no `logging/*`; modern protocol `2026-07-28`, legacy `2025-11-25` and `2025-06-18`.
- G3: `BrowserFrame.content()` returns `{ url, title, html, text }` strings; `page.snapshot()` is a `DOMSnapshot` tree of `BrowserNode` (not `HTMLNode`); `article()` is the only html use; `@orkestrel/markdown` exports `htmlToMarkdown(HTMLNode): MarkdownDocument`; browser has no `src/browser` environment and no Playwright project (service tests launch a real Chromium through `src/server`).

**Standing conditions.** The `.orkestrel/campaign/` folder is untracked in the scaffold checkout by
design. `G4` and `G5` may carry `Unknowns`; treat an unknown they name as an unknown, not as absent
capability.

## Unknowns

- Whether a Chromium page evaluates the agent's full runtime closure (P1 is static). A lane may
  name the unit that takes that receipt; do not assume the answer.
- Whether WebMCP's imperative API is reachable in the Chromium this host runs (G5 reports the
  shipping status; the design must feature-detect, never assume).

## The design questions (answer each by number; a lane leaves a question it does not own to the other lane only where its section names it)

1. **Tool contract.** Rule on: (a) an `AbortSignal` reaching a tool's execution (through
   `ToolCall`, through a second `execute` parameter, or through a context object — name the shape and
   the one-word members); (b) `parameters` accepting a `@orkestrel/contract` shape with the JSON
   Schema derived from it and arguments validated before execution, versus keeping the open record;
   (c) what `Tool`'s `execute` returns when the argument validation fails (a `ToolFailure`, a thrown
   `AppError`, or both by path); (d) the blast radius (tool's consumers: agent, mcp, ollama, probe,
   toolbox) and whether the change is worth the cascade now.
2. **Agent placement proofs.** Where does the real-Chromium proof of "agent + page tool" live, given
   the workspace rule that Vitest projects follow environments and agent has only `src/core`?
   Options to rule on, at least: a Playwright-run project over the core suite; a `distribution`
   proof that loads the packed tarball in Chromium; a proof in a higher package; a new `src/browser`
   environment in agent carrying a browser-only mechanism (name one that is not speculative, or
   refuse this option). Also rule on the Node-alone and relay proofs (G4).
3. **In-page MCP server.** What is missing for "the web page IS a native browser MCP server" beyond
   what G2 proves? Rule on each: (a) a same-context transport pair without a `MessageChannel`
   (or keep `MessageChannel` as the native pair); (b) a `window.postMessage` transport with origin
   checks for iframes and extension content scripts; (c) a bridge that registers the server's tools
   with WebMCP's registration API when the browser exposes it, feature-detected, so a browser agent
   and the in-page agent see the same tools; (d) server→client requests (sampling, elicitation,
   roots) as JSON-RPC requests per the MCP specification — in scope, or a recorded conformance gap
   the guide already declares; (e) `ping` and `logging` on the modern server. Name the one-word API
   for each you keep.
4. **Agent over MCP.** P2 shows `tools.add(await client.tools())` already works. Rule on: tool list
   refresh on `notifications/tools/list_changed`; forwarding `description`, `parameters`, and
   `summary` onto the wrapped `Tool`; abort propagation from the agent through the wrapped tool into
   the MCP `call`; and where each lives (mcp owns the wrapper; agent must not depend on mcp — say
   whether you agree and why).
5. **Browser reading arm (sketch only).** Propose the shape — for example a reading manager on
   `BrowserPage` with one-word members over `@orkestrel/html`'s `HTMLInterface` and
   `@orkestrel/markdown`'s projection, with bounding options for a model's token budget — and name
   what phase one must settle first. Do not design it in full.
6. **WebMCP parity.** From G5, produce the parity matrix rows: each WebMCP surface (imperative
   registration, declarative forms, tool annotations, consent, origin scoping, result shapes) against
   what the packages publish, ending implement / retain / exclude, with the source cited.
7. **Versions and order.** Which packages bump, in what order (O1), and which consumers re-pin.

## Output

Return only the sections the `planner` role file names, in this order — `Design`, `Alternatives`,
`Constraints`, `Refusals`, `Measurements`, `Units`, `Tensions`, `Risks` — filling the ones your
lane owns and leaving the others empty rather than renaming them. Under `Units`, every unit names
its role AND engine (`sol`/`analyst` units run on GPT-6 Astra; `implementer`/`planner`/`reviewer`
on Opus 5; `builder`/`verifier`/`checker` on Sonnet), its checkout, its owned files, its
dependencies, and independently checkable acceptance criteria. Number the units. Under `Tensions`,
name every choice you made on judgment for the other lane to challenge.

For the objective lane, deliver the report as your final message (the Orchestrator reads it from
the `--output-last-message` file). For the subjective lane, deliver it as your final text.

No process diary. No summary of what you read.

## Deviation contract

Stop and report — expected, found, exact evidence — when a distillate contradicts a file you read
first-hand on a point the design rests on. Decide, record under `Tensions`, and carry on for every
other conflict.

## Acceptance criteria for this unit

1. Every design question 1–7 is answered by number.
2. Every unit under `Units` names role, engine, checkout, owned files, dependencies, and acceptance criteria.
3. Every constraint or refusal cites a `file:line` or a rule file section.
4. The exit criterion is restated as the enumerated capabilities whose closure ends the campaign.
