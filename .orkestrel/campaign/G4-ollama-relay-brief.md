# Unit G4 — absorb `@orkestrel/ollama` and the agent's relay seam (provider, channel, placement)

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. Edit nothing, create nothing, run no command that writes.

## Objective

Return the distilled evidence the Orchestrator needs to answer one question:

> Under the contracts published today, how does `@orkestrel/ollama` implement the agent's provider
> seam; does it run from a browser page (a `fetch` to a local Ollama) as well as from Node; how do
> `RelayProvider`, `Channel`, `RelayStream`, and `Authority` carry an agent across a browser–server
> boundary; and where does a tool execute when the agent and the model sit on different sides?

## Context

- Checkouts (absolute paths):
  - `C:/Users/mikes/WebstormProjects/ollama` — `@orkestrel/ollama` 0.0.16. Core only. Deps: agent ^0.0.22, budget, contract, ndjson, tool. Dev deps include `@orkestrel/router`, `@orkestrel/server`, `@orkestrel/abort`, `@orkestrel/timeout`, `@orkestrel/workspace`.
  - `C:/Users/mikes/WebstormProjects/agent` — `@orkestrel/agent` 0.0.22. Core only.
- The host's Ollama daemon answers on `http://localhost:11434` (fact supplied by the Orchestrator; do not probe it).
- Law you may cite: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.

## Scope (read these, in this order)

1. `ollama/src/core/types.ts`, `ollama/src/core/index.ts`, `ollama/src/core/OllamaProvider.ts`, `ollama/src/core/factories.ts`, `ollama/src/core/helpers.ts`, `ollama/src/core/constants.ts`, `ollama/guides/ollama.md`, `ollama/package.json`, `ollama/vite.config.ts`.
2. `ollama/tests/src/core/OllamaProvider.test.ts`, `ollama/tests/src/core/integration.test.ts`, `ollama/tests/service/tools.test.ts`, `ollama/tests/service/relay.test.ts`, `ollama/tests/service/transport.test.ts`, `ollama/tests/setupService.ts`, `ollama/tests/setupServer.ts`, `ollama/tests/conformance.test.ts` (only the headers and test titles).
3. `agent/src/core/types.ts` (the relay, channel, stream, and authority types only), `agent/src/core/providers/RelayProvider.ts`, `agent/src/core/Channel.ts`, `agent/src/core/RelayStream.ts`, `agent/src/core/Authority.ts`, `agent/src/core/ThinkSplitter.ts`.
4. `agent/tests/src/core/providers/RelayProvider.test.ts`, `agent/tests/src/core/Channel.test.ts`, `agent/tests/src/core/RelayStream.test.ts`, `agent/tests/src/core/Authority.test.ts` — to locate scenarios.
5. `agent/guides/agent.md`: every section whose heading names a provider, a relay, a channel, an authority, a stream, a browser, a server, or placement.

## Evidence sought (number your answers to match)

1. **OllamaProvider.** Its class shape: constructor options verbatim from `types.ts`, every public member, which `AgentProvider` members it implements and how each maps to an Ollama endpoint (`/api/chat`, `/api/generate`, `/api/embed`, …) with `file:line`. How streaming is decoded (`@orkestrel/ndjson` symbol and site). How agent tools become the Ollama `tools` field and how `tool_calls` in a response are mapped back (`file:line`). How thinking/reasoning content, `keep_alive`, budget, and abort are handled.
2. **Host independence.** Every import in `ollama/src/core/*.ts` by specifier. Confirm or refute: no `node:*`, no DOM, the transport is the global `fetch`. Quote every `ollama/guides/ollama.md` passage on running from a browser page, CORS, or `OLLAMA_ORIGINS` (say `none found` if none).
3. **Relay mechanism.** One paragraph each, with `file:line`, on what `RelayProvider`, `Channel`, `RelayStream`, and `Authority` are: which side of a boundary each lives on, the wire format the channel carries (frame types, how a stream chunk, a tool call, a tool result, an abort, and an error are framed), and how `ThinkSplitter` fits.
4. **Relay end to end.** What `ollama/tests/service/relay.test.ts` and `agent/tests/src/core/providers/RelayProvider.test.ts` build: which side hosts the `Agent`, which side hosts the model provider, what transport joins them (a loopback HTTP server built with `@orkestrel/server` and `@orkestrel/router`? a pair of in-memory channels?), and the exact symbols used to build each side. `file:line`.
5. **Where a tool executes across a relay.** When the `Agent` runs on side A and the model provider on side B, is the tool executed on side A by the agent's `ToolManager`, or does the provider on side B execute it? Cite the `file:line` where a tool call frame is produced and where it is consumed. State whether a tool defined on side A can be invoked by a model on side B without a second network hop beyond the relay itself.
6. **Placement claims.** Quote (at most three lines each, with heading) every `agent/guides/agent.md` and `ollama/guides/ollama.md` passage stating where the agent, the provider, and the tools run — browser, server, worker, either side of a relay.
7. **Tests.** Test titles in `ollama/tests/service/tools.test.ts` and `ollama/tests/src/core/integration.test.ts`; what `setupService.ts` requires for readiness; whether any test runs under a Playwright browser project (from `vite.config.ts`).
8. **Naming facts a designer needs.** The exact factory names in `ollama/src/core/factories.ts` and `agent/src/core/factories.ts` that build a provider, a relay, a channel, and an authority, with signatures.

## Output

Return only, in this order:

- `Question`: one line.
- `Evidence`: the eight numbered items, each a compact list of facts with `file:line` pointers. Quote signatures verbatim; never paste a whole file. Keep the whole section under about 500 lines.
- `Distillate`: at most 25 lines: the smallest set of facts a designer needs to decide whether a browser-hosted agent with browser-hosted tools can use a server-hosted (or local Ollama) model through what exists.
- `Unknowns`: facts the scope did not settle, one per line, naming the evidence item.
- `Journal`: write `journal: (driver fills)`.
- `Deviation`: `none`, or the exact failure.

No decisions, no design, no recommendations, no process diary.
