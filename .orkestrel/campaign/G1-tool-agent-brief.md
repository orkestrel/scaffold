# Unit G1 — absorb `@orkestrel/tool` and `@orkestrel/agent` (tool contract, tool loop, host independence)

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. Edit nothing, create nothing, run no command that writes.

## Objective

Return the distilled evidence the Orchestrator needs to answer one question:

> Under the contracts published today, can a browser page construct an `Agent` and a `Tool` in the
> same JavaScript context and have the tool executed in-process when the model calls it — with no
> server hop — and what exactly do `@orkestrel/tool` and `@orkestrel/agent` publish?

## Context

- Checkouts (read by absolute path):
  - `C:/Users/mikes/WebstormProjects/tool` — `@orkestrel/tool` 0.0.14, core only, deps: `@orkestrel/contract`.
  - `C:/Users/mikes/WebstormProjects/agent` — `@orkestrel/agent` 0.0.22, core only, deps: abort, budget, contract, database, emitter, queue, timeout, tool, workflow, workspace.
- Law you do not need to apply but may cite: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- Every package's guide is `guides/<name>.md` in its own checkout; the dependency guides are mirrored beside it.

## Scope (read these, in this order)

1. `tool/src/core/types.ts`, `tool/src/core/index.ts`, `tool/src/core/tools/Tool.ts`, `tool/src/core/tools/ToolManager.ts`, `tool/src/core/factories.ts`, `tool/src/core/helpers.ts`, `tool/src/core/validators.ts`, `tool/guides/tool.md`, `tool/package.json`.
2. `agent/src/core/types.ts` (first), then `agent/src/core/index.ts`, `Agent.ts`, `AgentContext.ts`, `AgentProvider.ts`, `AgentRegistry.ts`, `contracts.ts`, `factories.ts`, `helpers.ts`, `shapers.ts`, `validators.ts`, `constants.ts`, `errors.ts`, `conversations/**`, `instructions/**`, `scopes/**`.
3. `agent/guides/agent.md` (1509 lines): read the heading tree fully; read in full the sections on tools, providers, context, and environment placement.
4. `agent/package.json`, `agent/tsconfig.json`, `agent/vite.config.ts`, `agent/configs/src/tsconfig.core.json`.
5. `agent/tests/src/core/Agent.test.ts`, `agent/tests/src/core/integration.test.ts`, `agent/tests/src/core/AgentProvider.test.ts` — only to locate the assertions named in Evidence item 7.
6. `agent/guides/database.md`, `agent/guides/queue.md`, `agent/guides/workflow.md`, `agent/guides/workspace.md` — only the sections Evidence item 5 needs.

Do NOT read `Channel.ts`, `RelayStream.ts`, `providers/RelayProvider.ts`, or `Authority.ts` at depth; another lane owns them. Name them in one line each from `index.ts` and `types.ts` only.

## Evidence sought (number your answers to match)

1. **Tool contract.** Every exported type and interface in `tool/src/core/types.ts` with a one-line meaning and `file:line`. The `Tool` class: constructor input, every public member with its signature. `ToolManager`: every public member with its signature. State how a tool's execution is invoked (method name, arguments it receives, sync or async, whether an `AbortSignal` or a context object reaches it, the return shape). State how the input schema is declared (a `@orkestrel/contract` shape? plain JSON Schema? both?) and whether a JSON Schema is derivable from it, with `file:line`.
2. **Tool host independence.** List every import in `tool/src/core/*.ts` by specifier. Confirm or refute: no `node:*` import, no DOM global, no `@orkestrel/*` subpath import. Cite `file:line` for each import.
3. **Agent contract.** `AgentInterface`, `AgentOptions`, `AgentContextInterface` and each manager it exposes (name, interface, one line), `AgentProviderInterface` or the abstract `AgentProvider` (every member a concrete provider must implement, what each receives — messages, tools, schema, signal — and what each returns), the `AgentRegistry` surface, and every exported factory in `agent/src/core/factories.ts` with its signature.
4. **The tool loop.** With `file:line`: where a model's tool call is received, where it is executed against the `ToolManager`, whether execution happens in the same process as the `Agent` instance, how a tool failure is reported (event, thrown error, result member), whether the loop is bounded (iteration cap, budget), whether the agent's abort signal reaches the tool's execution, and which events the agent emits around a tool call (event map members).
5. **Agent host independence.** Every `@orkestrel/*` import in `agent/src/core/**` with the file and the symbols imported (root specifier or subpath). For `@orkestrel/database`, `@orkestrel/queue`, `@orkestrel/workflow`, and `@orkestrel/workspace`: state which symbols the agent uses, and — from each package's mirrored guide in `agent/guides/` — whether constructing those symbols in a browser page requires a browser driver or a Node driver (for example, does `DatabaseConversationStore` need a `Database` whose driver is supplied by the consumer, and does the agent construct a database itself anywhere?). Cite the guide section heading and the source `file:line`.
6. **Exports and packaging.** Every row of `agent/src/core/index.ts`; the `exports`, `files`, `sideEffects`, `browser`, and `engines` fields of `agent/package.json` verbatim; the Vitest projects declared in `agent/vite.config.ts` (names and environments — is any project a Playwright browser project?).
7. **Tests.** The `file:line` of the assertion(s) proving a tool call executes through the agent, and of the assertion(s) proving what happens when a tool throws or is aborted. Name the test titles.
8. **Guide placement claims.** Quote (at most three lines each) every passage in `agent/guides/agent.md` that states where the agent runs — browser, server, worker, both — or that names a host constraint. Give the section heading with each quote.
9. **Naming and shape facts a designer needs.** The one-word member names the agent uses for its managers (for example `context.tools`), and the exact name of the method a consumer calls to add a tool to an agent, with `file:line`.

## Output

Return only, in this order:

- `Question`: one line.
- `Evidence`: the nine numbered items, each a compact list of facts with `file:line` pointers. Quote a signature verbatim; never paste a whole file. Keep the whole section under about 500 lines.
- `Distillate`: at most 25 lines: the smallest set of facts a designer needs to decide whether an in-page agent-with-tools works today and what stands in its way.
- `Unknowns`: facts the scope did not settle, one per line, naming the evidence item.
- `Journal`: leave this line for the driver — write `journal: (driver fills)`.
- `Deviation`: `none`, or the exact failure (a path you could not read, a tool you lacked).

No decisions, no design, no recommendations, no process diary.
