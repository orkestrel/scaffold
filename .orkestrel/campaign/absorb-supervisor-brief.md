# Unit absorb-supervisor — providers and the browser↔server relay in `@orkestrel/supervisor`

## Role and engine

`grok` on Cursor Grok 4.6 (`cursor-grok-4.6-high`), reached through the Cursor CLI in print mode.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly and
spawn nothing.

## Objective

Return a distillate of how `@orkestrel/supervisor` shapes its providers (Claude, Codex, Cursor, and
the app-layer CLI provider) and how it relays agent work between its browser app and its server app,
so a designer can reuse its proven patterns and avoid its workarounds without reading the files.

## Question

In supervisor, what do the provider classes share in shape and lifecycle, what is the exact
browser → server → backend call path for a run, where do authentication and tokens enter that path,
and which parts of that machinery are generic relay mechanics versus supervisor product policy?

## Context

**Repository (absolute path, read-only).** `C:/Users/mikes/WebstormProjects/supervisor` —
`@orkestrel/supervisor` 0.0.2, publishes `src/core` and `src/server`, and carries a private
`app/core`, `app/browser` (Vue), and `app/server`.

**Related packages, for orientation only.** `@orkestrel/agent` publishes the agent runtime and its
provider contract at `C:/Users/mikes/WebstormProjects/agent/src/core/types.ts`; `@orkestrel/ollama`
publishes an `OllamaProvider` at `C:/Users/mikes/WebstormProjects/ollama/src/server/OllamaProvider.ts`.
Read those two files only where item 6 below needs them.

**Host.** Windows 11, Cursor CLI print mode, working directory `C:/Users/mikes/WebstormProjects`.
Read files only. Run no shell command, run no test, install nothing, edit nothing.

**Standing conditions.** `node_modules/`, `dist/`, and `demo/` are out of scope. Do not read
`demo/showcase.html`.

## Evidence sought

Report every item with `file:line` (or a line range). Quote at most three lines per pointer. Never
paste a whole file, class, or interface body.

1. **Published provider contract.** In `supervisor/src/server/types.ts` and
   `supervisor/src/core/types.ts`: every interface or type whose name contains `Provider`,
   `Executor`, `Execution`, `Backend`, `Lane`, or `Run`, with line range, members, and the TSDoc
   first sentence. State which of them a provider author implements and which the runtime owns.
2. **Provider classes.** For `supervisor/src/server/providers/ClaudeProvider.ts`,
   `CodexProvider.ts`, `CursorProvider.ts`, and `supervisor/app/server/providers/CLIProvider.ts`:
   public members, `#` fields, constructor options, each method with a line range, and for each
   method which lines are backend-specific (the CLI flags, the journal format it parses, the model
   id, the auth it reads) versus generic (spawning, streaming, abort, timeout, error mapping, result
   assembly). Then one table listing the members all of them share and the members only some have.
3. **Backends and executors.** `supervisor/app/server/backends/ClaudeCLIBackend.ts`,
   `CodexCLIBackend.ts`, `CursorCLIBackend.ts`, `supervisor/src/server/executors/ProviderExecutor.ts`,
   `ProviderExecution.ts`, `supervisor/app/server/AgentExecutor.ts`, `AgentExecution.ts`,
   `WorkspaceProviderExecutor.ts`: what each is responsible for, how a backend is chosen, and how
   the executor turns a provider into a run. Point at the seam where a provider is constructed and
   at the seam where its output enters the run's journal.
4. **The relay path.** Trace one run from the browser to the backend and back:
   `supervisor/app/browser/services/Client.ts`, `LiveStream.ts`, `ClientUnitManager.ts`,
   `supervisor/app/browser/controllers/Operator.ts`, then `supervisor/app/server/ApplicationRoutes.ts`,
   `handlers.ts`, `ApplicationHandlers.ts`, `ApplicationUnitHandlers.ts`, `middlewares.ts`,
   `Relay.ts`, `InferenceStream.ts`, `LiveBroker.ts`, `LiveViewer.ts`, `ApplicationRuntime.ts`,
   `SupervisorApplication.ts`, `ApplicationServer.ts`. For each hop: the route or method, the
   request and response shapes with their `file:line` in `supervisor/app/core/types.ts`, the
   transport used (fetch, SSE, NDJSON, WebSocket — name the `@orkestrel/*` symbol that carries it),
   and where abort propagates. Name every place the browser side and the server side share a
   declared contract rather than an implementation import.
5. **Authentication and tokens.** Every place a credential, token, session, or login enters:
   `supervisor/app/server/middlewares.ts`, `ApplicationUserHandlers.ts`, `ApplicationLease.ts`,
   `ApplicationSetup.ts`, `supervisor/app/browser/components/LoginPanel.vue`,
   `supervisor/app/browser/stores/*.ts`, `supervisor/app/browser/services/ClientUsers.ts`, and any
   file the grep `token|session|login|bearer|credential|authoriz` hits under `app/`. For each: what
   is checked, where the secret is stored, whether the browser ever holds a real backend credential,
   and how the server maps a browser-facing identity onto a backend credential (if it does).
6. **Relation to agent and ollama.** Every import of `@orkestrel/agent` or `@orkestrel/ollama` in
   `supervisor/src/**` and `supervisor/app/**`, with the symbols used. State whether supervisor's
   providers implement the agent package's provider interface (compare against
   `agent/src/core/types.ts`) or a separate contract, and name the members that differ.
7. **Ecosystem transport imports.** Every import of `@orkestrel/server`, `@orkestrel/router`,
   `@orkestrel/sse`, `@orkestrel/websocket`, `@orkestrel/ndjson`, `@orkestrel/middleware`,
   `@orkestrel/mcp`, `@orkestrel/process`, `@orkestrel/browser`, `@orkestrel/abort`,
   `@orkestrel/timeout`, and `@orkestrel/budget` under `src/` and `app/`, with the symbols used and
   one line on the job each does.
8. **Documented shape.** In `supervisor/guides/README.md`, `supervisor/guides/src/*.md` (list what
   is there), and `supervisor/README.md`: the sections describing providers, relay, live streaming,
   and login, with `file:line`.
9. **Workarounds.** Any comment, helper, or type in the files above that exists to bridge a gap in
   `@orkestrel/agent`, `@orkestrel/ollama`, or another `@orkestrel/*` package — a re-declared
   shape, a projection between two similar message types, a cast-like narrowing, a copied helper.
   Point at each with `file:line` and name the upstream symbol it duplicates or adapts, if any.

## Output

Return only this shape, as your final message:

- `Question`: one line.
- `Evidence`: items 1–9, each as concise facts with `file:line` pointers and the tables the items
  request.
- `Distillate`: at most forty lines — the relay pattern in the smallest form a designer can reuse,
  and the list of what is product policy that must stay in supervisor.
- `Unknowns`: every item or sub-item you could not reach, with the path you tried.
- `Journal`: leave this line as `Journal: supplied by the launcher`.
- `Deviation`: `none`, or what stopped you.

Bound the whole return at 500 lines. Give evidence, never a design, a recommendation, or a verdict.

## Deviation contract

Stop and report under `Deviation` if a named repository or file does not exist or is unreadable.
Decide for yourself how to order sub-items inside a numbered item.
