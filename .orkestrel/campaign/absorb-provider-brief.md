# Unit absorb-provider — the provider seam in `@orkestrel/agent` and `@orkestrel/ollama`

## Role and engine

`grok` on Cursor Grok 4.6 (`cursor-grok-4.6-high`), reached through the Cursor CLI in print mode.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly and
spawn nothing.

## Objective

Return a distillate that lets a designer, without opening these files, know exactly what contract
`@orkestrel/agent` exposes for a provider, exactly what the agent runtime calls on it, and which
parts of `@orkestrel/ollama`'s `OllamaProvider` are Ollama-wire-specific versus generic provider
mechanics any provider would repeat.

## Question

What is the provider contract in `@orkestrel/agent`, how does the runtime drive it, and where in
`OllamaProvider` does provider-generic work end and Ollama-specific wire work begin?

## Context

**Repositories (absolute paths, read-only).**

- `C:/Users/mikes/WebstormProjects/agent` — `@orkestrel/agent` 0.0.21, core-only package (`src/core`).
- `C:/Users/mikes/WebstormProjects/ollama` — `@orkestrel/ollama` 0.0.15, server-only package
  (`src/server`), depends on `@orkestrel/agent ^0.0.21`.

**Law.** Read `C:/Users/mikes/WebstormProjects/agent/AGENTS.md` only to understand the vocabulary
(types-first, single-word entity APIs, centralized kind files). You apply no rule; you report.

**Host.** Windows 11, Cursor CLI print mode, working directory `C:/Users/mikes/WebstormProjects`.
Read files only. Run no shell command, run no test, install nothing, edit nothing. Containment is
measured outside this run by the Orchestrator.

**Standing conditions.** `tmp/` directories inside `agent` and `ollama` are ignored scratch; do not
read them. `node_modules/` is not in scope except where an item below names an installed declaration.

## Evidence sought

Report every item with `file:line` (or `file:startLine-endLine`) pointers. Quote at most three lines
per pointer. Never paste a whole file, function, or interface body.

1. **The provider contract.** In `agent/src/core/types.ts`, every interface, type alias, and union
   whose name contains `Provider`, and every type each of them references transitively that a
   provider author must produce or consume: message shapes, tool call and tool result shapes,
   usage or token accounting, stream chunk or delta shapes, options, event maps, capability
   descriptors, error codes. For each: name, line range, every member with its exact declared
   type, and the TSDoc first sentence.
2. **How the runtime drives a provider.** In `agent/src/core/Agent.ts`, `AgentContext.ts`,
   `AgentRegistry.ts`, `Channel.ts`, `ThinkSplitter.ts`, `factories.ts`, `helpers.ts`,
   `validators.ts`, `errors.ts`, and `constants.ts`: every site that reads or calls a provider
   member. For each site: the member called, what is passed, what is consumed from the result, and
   which of abort, timeout, budget, think-splitting, tool execution, retry, and conversation
   persistence is applied around that call by the runtime rather than by the provider. State in one
   short table which responsibility lives in the runtime and which the contract leaves to the
   provider.
3. **The guide's promise.** In `agent/guides/agent.md`: every section documenting providers — the
   headings, the fences showing how a provider is created, registered, or swapped, the documented
   extension seam, and any sentence promising provider portability across hosts (browser, server,
   worker). Point at each with `file:line`.
4. **`OllamaProvider` anatomy.** In `ollama/src/server/OllamaProvider.ts`: the class's public
   members, `#` fields, constructor options, and every method. For each method give a two-column
   split with line ranges: lines that are Ollama-wire-specific (URL and path, `fetch` call, request
   body fields, NDJSON framing, `/api/chat` message and tool-call format, `think`, `keep_alive`,
   model naming, Ollama error bodies) versus lines that are provider-generic (projecting the
   agent's conversation messages into a request, projecting tool definitions, assembling a streamed
   reply, usage accounting, abort wiring, timeout, budget, error mapping to agent error classes,
   capability reporting).
5. **Ollama support files.** In `ollama/src/server/types.ts`, `helpers.ts`, `parsers.ts`,
   `factories.ts`, `errors.ts`, `constants.ts`, and `index.ts`: every exported symbol with its line,
   marked wire-specific or provider-generic by the same rule as item 4.
6. **What the tests pin.** In `ollama/tests/src/server/*.test.ts`, `ollama/tests/service/*.test.ts`,
   `ollama/tests/setupServer.ts`, `ollama/tests/setupService.ts`, and `ollama/tests/conformance.test.ts`:
   the test names grouped by the seam they pin (transport, streaming, tools, abort, budget,
   lifecycle, schema, conversation, authority, compaction, scopes, conformance), and how each suite
   reaches Ollama — a real daemon, a fixture server, or a recorded stream — naming the helper that
   provides it with `file:line`.
7. **Agent tests on the provider seam.** In `agent/tests/src/core/Agent.test.ts`,
   `integration.test.ts`, `factories.test.ts`, and `agent/tests/setup.ts`: how the tests supply a
   provider to the runtime (a scripted provider? which helper?), with `file:line`, and the test names
   that pin provider-facing behaviour.
8. **Ecosystem imports on the provider path.** For both packages, every `import` from an
   `@orkestrel/*` package inside the files named in items 1, 2, 4, and 5, with the imported symbols
   and one line on what each symbol is used for.
9. **Environment facts.** From `agent/package.json`, `ollama/package.json`, `agent/vite.config.ts`,
   `ollama/vite.config.ts`, `agent/configs/src/*.json`, and `ollama/configs/src/*.json`: which
   environments each package builds and checks (core, browser, server), the `exports` map entries,
   and the `lib`/`types` each scoped tsconfig sets.

## Output

Return only this shape, as your final message:

- `Question`: one line.
- `Evidence`: the items above, numbered 1–9, each as concise facts with `file:line` pointers and
  the tables the items request.
- `Distillate`: at most forty lines — the smallest context a designer needs to draw the line
  between a host-independent provider base and a provider-specific subclass.
- `Unknowns`: every item or sub-item you could not reach, with the path you tried.
- `Journal`: leave this line as `Journal: supplied by the launcher`.
- `Deviation`: `none`, or what stopped you.

Bound the whole return at 500 lines. Give evidence, never a design, a recommendation, or a verdict.

## Deviation contract

Stop and report under `Deviation` if a named repository or file does not exist or is unreadable.
Decide for yourself how to order sub-items inside a numbered item.
