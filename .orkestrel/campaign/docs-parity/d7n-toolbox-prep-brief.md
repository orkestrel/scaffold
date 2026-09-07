# Brief — P.1 `d7n-toolbox-prep` (toolbox's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/toolbox` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e5ff05d`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

toolbox's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== toolbox 2026-09-07T16:43:55Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
99:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 775ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### toolbox (e5ff05d, version 0.0.12, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 32 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(9)
   tests/setupServer.ts(1)
   src/core/types.ts(1)
-- docs
   guides/toolbox.md const DATABASE_TOOL_MUTATIONS: guide absent source "Lists the runtime-frozen database-tool mutation names disabled by `DatabaseToolOptions.readonly`."
   guides/toolbox.md const RELATION_TOOL_NAME: guide absent source "Holds the name `createRelationTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
   guides/toolbox.md const RELATION_TOOL_SUMMARY: guide absent source "Holds the lean `import('@orkestrel/tool').ToolInterface.summary` the relation tool advertises in place of `RELATION_TOOL_DESCRIPTION`."
   guides/toolbox.md const RELATION_TOOL_DESCRIPTION: guide absent source "Holds the DESCRIPTION the relation tool advertises — a multi-line guide that teaches a small model the operation list and the flat dot-path `include` syntax."
   guides/toolbox.md const RELATION_TOOL_LIMIT: guide absent source "Holds the default cap on rows a `find` / `links` call returns when the caller omits `limit` — the relation tool's default row ceiling."
   guides/toolbox.md const RELATION_TOOL_DEPTH: guide absent source "Holds the default cap on how many `include` path segments deep a `load` / `find` call may traverse — the relation tool's default include-depth ceiling."
   guides/toolbox.md const INFER_TOOL_NAME: guide absent source "Holds the name `import('./factories.js').createInferTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
   guides/toolbox.md const INFER_TOOL_SUMMARY: guide absent source "Holds the lean `import('@orkestrel/tool').ToolInterface.summary` `import('./factories.js').createInferTool` advertises in place of `INFER_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `import('./factories.js').createDescribeTool`."
   guides/toolbox.md const INFER_TOOL_DESCRIPTION: guide absent source "Holds the schema-inference protocol `import('./factories.js').createInferTool` advertises."
   guides/toolbox.md interface TaskDraft: guide absent source "Represents a draft task — a `TaskDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name`."
   guides/toolbox.md interface PhaseDraft: guide absent source "Represents a draft phase — a `PhaseDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name` and `TaskDraft` tasks."
   guides/toolbox.md interface WorkflowDraft: guide absent source "Represents a draft workflow — a `WorkflowDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name` at all three levels (workflow / phase / task)."
   guides/toolbox.md interface WorkflowStep: guide absent source "Represents one flat step — `{ name }` — the building block of a `WorkflowSteps` blob."
   guides/toolbox.md interface WorkflowSteps: guide absent source "Represents the FLAT authoring blob `import('./factories.js').createWorkflowTool` advertises — `{ name?, steps }` — the simplest surface a small model can fill."
   guides/toolbox.md interface WorkflowToolResult: guide absent source "Represents the JSON-safe run summary returned by `import('./factories.js').createWorkflowTool`."
   guides/toolbox.md type WorkflowLineage: guide absent source "Represents one immutable workflow/agent call chain, beginning with a workflow tag."
   guides/toolbox.md type WorkflowAgents: guide absent source "Represents raw live agents keyed by the workflow function names that invoke them."
   guides/toolbox.md type AgentFunction: guide absent source "Represents a contextual agent adapter carrying immutable metadata for Toolbox composition."
   guides/toolbox.md interface AgentFunctionOptions: guide absent source "Represents the options for `import('./factories.js').createAgentFunction` — the OPT-IN adapter that wraps a live `AgentInterface` (`@orkestrel/agent`) as an `AgentFunction` with immutable lineage metadata and optional nested-workflow composition."
   guides/toolbox.md interface WorkflowToolOptions: guide absent source "Represents the options for `import('./factories.js').createWorkflowTool` and `import('./factories.js').createWorkflowFunctions` — lineage-aware composition of opaque leaves, raw agents, and native workflow persistence."
   guides/toolbox.md interface WorkspaceToolOptions: guide absent source "Represents the options for `import('./factories.js').createWorkspaceTool` — EITHER a caller-built `WorkspaceManagerInterface` to drive directly, OR a `WorkspaceStoreInterface` the tool constructs a fresh manager over; neither given constructs a manager over `@orkestrel/workspace`'s in-memory store."
   guides/toolbox.md type WorkspaceOperation: guide absent source "Represents one operation an agent invokes through `import('./factories.js').createWorkspaceTool` — a FLAT, descriptive tagged union over the workspace edit, read, and navigation actions, discriminated by the `operation` literal (a discriminant is named for its axis — the action being performed — NEVER `kind`)."
   guides/toolbox.md interface AgentToolOptions: guide absent source "Represents the options for `import('./factories.js').createAgentTool` — the sub-agent delegation defaults, the nesting-depth / cycle guard bookkeeping, and the advertised tool overrides."
   guides/toolbox.md interface AgentToolArguments: guide absent source "Represents the FLAT args `import('./factories.js').createAgentTool` accepts — a delegated `task` plus the minimal optional `AgentJobInput` (`@orkestrel/agent`) fields a caller may override per-call."
   guides/toolbox.md type ToolboxErrorCode: guide absent source "Represents the machine-readable code a thrown `import('./errors.js').ToolboxError` carries — a thrown, typed, code-bearing error, never a `{ error }` return."
   guides/toolbox.md interface DescribeToolArguments: guide absent source "Represents the FLAT args `import('./factories.js').createDescribeTool` accepts — the registered tool `name` whose full `description` a model wants back."
   guides/toolbox.md interface PromptToolOptions: guide absent source "Represents the options for `import('./factories.js').createPromptTool` — the live `TerminalManagerInterface` (`@orkestrel/terminal`) to `ask` through, the terminal name `from`, and the advertised tool overrides."
   guides/toolbox.md interface AnswerToolOptions: guide absent source "Represents the options for `import('./factories.js').createAnswerTool` — the live `TerminalManagerInterface` (`@orkestrel/terminal`) to list / answer prompts through, the terminal name `to`, and the advertised tool overrides."
   guides/toolbox.md type ColumnPrimitive: guide absent source "Represents one column's declared primitive — a shorthand, or `integer` for a whole-number `number`."
   guides/toolbox.md type ColumnSpec: guide absent source "Represents one table column's spec — either a bare `ColumnPrimitive` shorthand, or `{ primitive, optional }` when the column may be absent from a row."
   guides/toolbox.md type TableSpec: guide absent source "Represents a database's table layout — one entry per table, each a flat map of column name to `ColumnSpec`. The small-model-facing DSL `import('./compilers.js').expandTables` compiles into an `@orkestrel/database` `TableMap`."
   guides/toolbox.md interface DatabaseDefinition: guide absent source "Represents one database's CONFIG-ONLY definition — `id` + `driver` + `TableSpec`, with optional `primary`, `indexes`, and `version` schema configuration."
   guides/toolbox.md interface DatabaseDefinitionRow: guide absent source "Represents one opaque persisted row — the shape a `TableInterface<DatabaseDefinitionRow>`-backed store reads/writes; `definition` is narrowed with `import('./validators.js').isDatabaseDefinition` on read."
   guides/toolbox.md interface DefinitionStoreInterface: guide absent source "Represents the point-access persistence seam for `DatabaseDefinition` configs — the twin of `@orkestrel/terminal`'s `TerminalStoreInterface`, storing a database's CONFIG-ONLY blueprint (never a live handle). Every primitive is async; `delete` of an absent id is a no-op."
   guides/toolbox.md interface DatabaseQueryInput: guide absent source "Represents the SERIALIZED wire query a database-tool call carries — the parsed form of `import('./shapers.js').queryShape`, which `import('./helpers.js').normalizeQuery` normalizes into a live `@orkestrel/database` `QueryInput`."
   guides/toolbox.md interface ClampedQuery: guide absent source "Represents the PROBE query and effective row limit `import('./helpers.js').clampQuery` returns."
   guides/toolbox.md interface DatabaseToolOptions: guide absent source "Represents the options for `import('./factories.js').createDatabaseTool` — the live handles, definition store, driver registry, key generator, row cap, timeout, and readonly gate the tool composes."
   guides/toolbox.md interface RelationToolOptions: guide absent source "Represents the options for `import('./factories.js').createRelationTool`."
   guides/toolbox.md interface InferToolOptions: guide absent source "Represents the options for `import('./factories.js').createInferTool` — advertised name/description overrides only; `format` / `enum` are RUNTIME call arguments (see `import('./shapers.js').inferToolShape`), not construction-time options, since a model chooses them per call."
   guides/toolbox.md type EndpointHandler: guide absent source "Represents the handler `import('./types.js').EndpointDefinition.execute` implements — mirrors `@orkestrel/tool`'s `ToolOptions.execute` signature EXACTLY (same `Readonly<Record<string, unknown>>` argument, same `Promise<unknown> | unknown` return) so `execute: (args) => definition.execute(args)` typechecks with zero assertions in `import('./factories.js').createEndpointTool`."
   guides/toolbox.md interface EndpointDefinition: guide absent source "Represents one concrete endpoint `import('./factories.js').createEndpointTool` wraps as an LLM-callable `ToolInterface` — the advertised identity, a non-empty set of example values its `parameters` are inferred from, and the local handler that runs a call."
   guides/toolbox.md interface EndpointToolOptions: guide absent source "Represents the construction-time tuning for `import('./factories.js').createEndpointTool` — the inferred `parameters` schema's `format` / `enum` constraints, and whether that same schema is ENFORCED at `execute` time."
   guides/toolbox.md function createTerminalRoutes: guide "Build the two `TerminalRoute` records (GET SSE form stream, POST `{ id, values }` answer) bridging a `TerminalManagerInterface`'s endpoints onto the wire, byte-compatible with `PromptClient`." source "Builds the GET SSE stream and POST answer routes that bridge a terminal manager onto the wire."
   guides/toolbox.md type TerminalRouteMethod: guide "The HTTP method literal a `TerminalRoute` declares — the same union `@orkestrel/router`'s `Method` type accepts." source "Represents the HTTP method literal a `TerminalRoute` declares — the same union `@orkestrel/router`'s `Method` type accepts."
   guides/toolbox.md interface TerminalRouteContext: guide "`{ params }` — the minimal route-dispatch context a `TerminalRoute` handler reads (the frozen, URL-decoded `:name` path param)." source "Represents the minimal route-dispatch context a `TerminalRoute` handler reads — exactly the frozen, URL-decoded `:name` path param slice a router hands a matched handler."
   guides/toolbox.md interface TerminalRoute: guide "`{ method, path, handler }` — one structural route record `createTerminalRoutes` returns." source "Represents one structural route record `import('./factories.js').createTerminalRoutes` returns — a plain `{ method, path, handler }` shape carrying NO dependency on `@orkestrel/router`'s own `Route` type, so a consumer mounts it against any router that accepts a two-arg `(request, context) => Response | Promise<Response>` handler keyed by `method` + `path`."
   guides/toolbox.md interface TerminalRoutesOptions: guide "`{ path?, token?, keepalive?, timer?, limit? }` — the shared mount path, optional `TerminalToken` gate, SSE keepalive interval, injected `TimerHandler`, and POST body byte cap (defaults to `@orkestrel/server`'s `DEFAULT_BODY_LIMIT`, 1 MiB; a non-finite limit also defaults, a negative limit clamps to zero, and over-limit input is `413`, ignoring any `Content-Length` header)." source "Represents the options `import('./factories.js').createTerminalRoutes` takes — the shared route, authorization, keepalive, timer, and body-limit configuration both routes read."
   guides/toolbox.md type TerminalToken: guide "`string | ((value: string | undefined) => boolean)` — the `token` gate: a string is compared for equality against the `x-orkestrel-token` header; a function is a consumer-controlled validator (JWT `exp` checks, revocation lookups, anything time-varying), letting a token expire or rotate mid-stream. Validated at GET connect, on every POST, and RE-VALIDATED on every SSE keepalive tick — a stream whose presented token stops validating is torn down through the same abort/self-heal teardown path (no `shutdown` frame; the client reconnects and re-authenticates). Because re-validation only happens on the keepalive tick, the revocation window equals the keepalive interval — a rejected/expired token keeps streaming until the next tick — and a throwing validator is treated as rejection (fail-closed) at every call site." source "Represents the `token` gate `TerminalRoutesOptions` may configure — a plain string compared for equality against the `x-orkestrel-token` header, OR a validator function the consumer fully controls, enabling expiry/rotation (a JWT `exp` check, a revocation-list lookup, anything time-varying) that a fixed string cannot express. `undefined` disables the auth check entirely."
   guides/toolbox.md const TERMINAL_ROUTES_PATH: guide "The default `:name`-templated path (`/terminals/:name`) `createTerminalRoutes` mounts its routes under." source "Holds the default `:name`-templated path `import('./factories.js').createTerminalRoutes` mounts its GET (SSE) + POST (answer) routes under."
   guides/toolbox.md const TERMINAL_KEEPALIVE_MS: guide "The default SSE keepalive interval in milliseconds (`15_000`) `createTerminalRoutes` arms per open connection." source "Holds the default SSE keepalive interval (in milliseconds) `import('./factories.js').createTerminalRoutes` arms per open connection — a `:` comment ping a conforming SSE parser ignores, keeping intermediary proxies from timing out an otherwise-idle stream."
   guides/toolbox.md DefinitionStoreInterface.get: guide absent source absent
   guides/toolbox.md DefinitionStoreInterface.set: guide absent source absent
   guides/toolbox.md DefinitionStoreInterface.delete: guide absent source absent
   guides/toolbox.md DatabaseResolver.has: guide absent source "Determines whether a live database is cached by id."
   guides/toolbox.md DatabaseResolver.get: guide absent source "Reads a cached database without consulting the definition store."
   guides/toolbox.md DatabaseResolver.set: guide absent source "Caches a live database by id."
   guides/toolbox.md DatabaseResolver.delete: guide absent source "Removes a cached live database by id."
   guides/toolbox.md DatabaseResolver.resolve: guide absent source "Resolves a cached or stored database by id."
   guides/toolbox.md pitch: readme absent tagline "Concrete, LLM-callable tools for the `@orkestrel` line — workflow authoring, workspace editing, sub-agent delegation, terminal-mediated prompting, database and relation access, and schema inference / endpoint wrapping — over the `@orkestrel/tool` runtime, with pluggable stores. The runtime supplies `ToolInterface`, registry execution, and result isolation; see `tool.md`. This package supplies the concrete behavior through one factory per tool."
   rows read: 1, disagreements found: 159
   exit 1
-- check
   tests/guides.test.ts(123,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(126,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(130,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(145,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(160,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 7 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  7 failed | 21 passed (28)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 11 | summary 11 | banned 0 | tests/setup.ts(9) tests/setupServer.ts(1) src/core/types.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for toolbox (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/toolbox`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e5ff05d`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 11 | summary 11 | banned 0 | tests/setup.ts(9) tests/setupServer.ts(1) src/core/types.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                                                   | Tests                                                                            |
    8:| ------- | -------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
    9:| Toolbox | [`toolbox.md`](toolbox.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |
    13:| Directory    | Guide                      |
    14:| ------------ | -------------------------- |
    15:| `src/core`   | [`toolbox.md`](toolbox.md) |
    16:| `src/server` | [`toolbox.md`](toolbox.md) |
- Guide `guides/toolbox.md`: 972 lines. Headings:
    1:# Toolbox
    13:## Surface
    15:### Factories
    36:### Stores
    45:### Lifecycle entities
    54:### Errors
    61:### Validators
    73:### Helpers
    99:### Compilers
    109:### Shapes
    141:### Constants
    182:### Types
    220:### Server routes
    241:## Methods
    245:#### `DefinitionStoreInterface`
    253:#### `DatabaseResolver`
    263:### Composing lifecycle entities directly
    282:## Contract
    336:## Patterns
    340:### Authoring + running a workflow through the tool, by using a real `ToolManager`
    369:### Plugging a `WorkflowStoreInterface` and retrieving the persisted snapshot
    396:### Driving the workspace tool with a plugged store
    422:### Delegating to a sub-agent through the agent tool
    443:### Persisting a delegation's conversation through the agent tool's own `store` slot
    467:### Lean advertisement + on-demand expansion through `createDescribeTool`
    492:### Composing opaque leaves and raw agents into a workflow registry
    526:### The lenient-authoring helpers, standalone
    567:### Recovering a typed `ToolboxError`
    579:### Asking + answering through the terminal seam
    638:### The terminal error-classification helper, standalone
    650:### Bridging a `TerminalManagerInterface` onto the wire
    665:### Driving the database tool: create with metadata, add a row, query with a serialized condition
    723:### Persisting database definitions through `DefinitionStoreInterface`
    759:### Wiring the relation tool over a live `RelationManagerInterface` and loading nested includes
    805:### The database / relation helpers, standalone
    848:### Inferring a JSON Schema from example values, through a real `ToolManager`
    911:### Bridging an existing API endpoint into an LLM-callable tool
    943:## Tests
    959:## See also
- Table headers in `guides/toolbox.md` (a header row is the row before a `| ---` row):
    17: | API                             | Kind     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                        |
    40: | API                       | Kind  | Summary                                                                                                                                                                |
    50: | API                | Kind  | Summary                                                                                                                        |
    56: | API              | Kind     | Summary                                                                                                                                                                                                               |
    65: | API                    | Kind     | Behavior                                                                                                                                    |
    77: | API                      | Kind     | Behavior                                                                                                                                                                                                                               |
    103: | API                      | Kind     | Behavior                                                                                                                                                                          |
    113: | API                    | Kind  | Summary                                                                                                                                                                                   |
    143: | Constant                       | Kind  | Value                                                                                                                                                                                    |
    184: | Type                       | Kind      | Shape                                                                                                                                                                                                                                                                                                                       |
    226: | API                     | Kind      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
    247: | Method   | Returns                                    | Behavior                                                                     |
    255: | Method    | Returns                          | Behavior                                                                |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/toolbox.md`):
    3: > Concrete, LLM-callable **tools** for the `@orkestrel` line — workflow authoring, workspace editing, sub-agent delegation, terminal-mediated prompting, database and relation access, and schema inference / endpoint wrapping — over the [`@orkestrel/tool`](tool.md) runtime, with pluggable stores. The runtime supplies `ToolInterface`, registry execution, and result isolation; see [`tool.md`](tool.md). This package supplies the concrete behavior through one factory per tool.
- Opening prose after the blockquote (first two lines):
    5: `createWorkflowTool` and `createWorkspaceTool` own their full handler logic (the workflow authoring surface and the workspace editing surface respectively). The workflow tool composes opaque host `functions` plus raw live `agents` through `createWorkflowFunctions`, then forwards that frozen target registry and the optional `store` to `@orkestrel/workflow`, whose runner owns named-run drivability, checkpoint persistence, and `durable` / `fault`; the workspace tool retains its distinct manager/store composition. `createAgentTool` (sub-agent delegation over an `AgentRegistryInterface`) has its own `ConversationStoreInterface` persistence slot. The workflow, workspace, and agent tools additionally advertise a lean `summary` (`@orkestrel/tool`'s `ToolInterface.summary` / `ToolManagerInterface.definitions()` projection) in place of their full teaching `description`; `createDescribeTool` is the on-demand expansion seam. `createToolFunction` adapts an ordinary registered runtime tool, while `createAgentFunction` returns a frozen metadata-bearing adapter and uses Agent-owned `agentResultToJSON` for the exact result projection. The authoring umbrella (`WorkflowSteps` / `WorkflowDraft` shapes, `createWorkflowDraftContract`, lineage helpers, `expandSteps` / `completeDraft`, `summarizeWorkflow`, `MAX_WORKFLOW_CHAIN`) lets a small model author a whole recursion-safe tree in one call.
    7: `createPromptTool` / `createAnswerTool` are the ASK / ANSWER halves of a terminal-mediated human-in-the-loop seam over a live `TerminalManagerInterface` (`@orkestrel/terminal`). One call asks a whole multi-field FORM, not a single question. `createPromptTool` takes `{ to, schema }` per call, parses the model-supplied `schema` with `@orkestrel/form`'s `parseForm`, constructs the live form with `createForm`, and BLOCKS the calling agent turn until the addressed terminal answers (`from` FIXED at construction) — resolving with one `FormValues` record keyed by field name, re-surfacing a prompt cycle as `DEADLOCK` and an unanswered expiry as `EXPIRE`. `createAnswerTool` lists the forms addressed to a FIXED `to` terminal as `{ id, from, schema }` records and answers one by `{ id, values }`, narrowing the model-supplied `values` with `@orkestrel/form`'s `isFormValues` before applying it, re-surfacing a failed apply as `ANSWER`. `createTerminalRoutes` ([`src/server`](../src/server), the `@src/server` barrel) is the wire bridge for the SAME manager — two structural `{ method, path, handler }` route records (GET SSE stream + POST answer, one shared `:name`-templated path), carrying NO dependency on `@orkestrel/router`'s own `Route` type so a consumer mounts them against any router accepting that two-arg handler shape, and byte-compatible with `@orkestrel/terminal`'s own `PromptClient` (same GET url streams, same POST url answers, same `{ id, values }` body, same JSON answer `Result` body, same `x-orkestrel-token` header).
- README (`README.md`) first lines:
    # @orkestrel/toolbox
    
    Concrete, LLM-callable tools for the `@orkestrel` line. Toolbox supplies workflow
    authoring, workspace editing, sub-agent delegation, terminal prompts, database and
    relation operations, and schema inference over the
    [`@orkestrel/tool`](https://github.com/orkestrel/tool) runtime.
    
    The runtime envelope and registry (`ToolInterface`, `ToolCall`, `ToolResult`,
    `createTool`, and `createToolManager`) live in `@orkestrel/tool`. This package supplies
    the concrete handlers that plug into that runtime, including workspace operations over
    `@orkestrel/workspace` and agent delegation over `@orkestrel/agent`.
    
- `## Patterns` fences, each with its nearest preceding heading:
    265: fence under "### Composing lifecycle entities directly"
    342: fence under "### Authoring + running a workflow through the tool, by using a real `ToolManager`"
    371: fence under "### Plugging a `WorkflowStoreInterface` and retrieving the persisted snapshot"
    398: fence under "### Driving the workspace tool with a plugged store"
    424: fence under "### Delegating to a sub-agent through the agent tool"
    445: fence under "### Persisting a delegation's conversation through the agent tool's own `store` slot"
    469: fence under "### Lean advertisement + on-demand expansion through `createDescribeTool`"
    494: fence under "### Composing opaque leaves and raw agents into a workflow registry"
    528: fence under "### The lenient-authoring helpers, standalone"
    569: fence under "### Recovering a typed `ToolboxError`"
    581: fence under "### Asking + answering through the terminal seam"
    640: fence under "### The terminal error-classification helper, standalone"
    652: fence under "### Bridging a `TerminalManagerInterface` onto the wire"
    667: fence under "### Driving the database tool: create with metadata, add a row, query with a serialized condition"
    725: fence under "### Persisting database definitions through `DefinitionStoreInterface`"
    761: fence under "### Wiring the relation tool over a live `RelationManagerInterface` and loading nested includes"
    807: fence under "### The database / relation helpers, standalone"
    850: fence under "### Inferring a JSON Schema from example values, through a real `ToolManager`"
    913: fence under "### Bridging an existing API endpoint into an LLM-callable tool"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:27:export function createTerminalRoutes(
    src/core/factories.ts:161:export function createToolFunction(tools: ToolManagerInterface, name: string): WorkflowFunction {
    src/core/factories.ts:216:export function createAgentFunction(
    src/core/factories.ts:318:export function createWorkflowFunctions(
    src/core/factories.ts:368:export function createWorkflowDraftContract(): ContractInterface<WorkflowDraft> {
    src/core/factories.ts:427:export function createWorkflowTool(
    src/core/factories.ts:562:export function createWorkspaceTool(options?: WorkspaceToolOptions): ToolInterface {
    src/core/factories.ts:703:export function createAgentTool(
    src/core/factories.ts:793:export function createDescribeTool(tools: ToolManagerInterface): ToolInterface {
    src/core/factories.ts:849:export function createPromptTool(options: PromptToolOptions): ToolInterface {
    src/core/factories.ts:948:export function createAnswerTool(options: AnswerToolOptions): ToolInterface {
    src/core/factories.ts:1011:export function createMemoryDefinitionStore(): DefinitionStoreInterface {
    src/core/factories.ts:1030:export function createDatabaseDefinitionStore(
    src/core/factories.ts:1103:export function createDatabaseTool(options: DatabaseToolOptions = {}): ToolInterface {
    src/core/factories.ts:1341:export function createRelationTool(options: RelationToolOptions): ToolInterface {
    src/core/factories.ts:1501:export function createInferTool(options?: InferToolOptions): ToolInterface {
    src/core/factories.ts:1604:export function createEndpointTool(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/terminals/TerminalConnection.ts:17:export class TerminalConnection {
    src/server/terminals/TerminalBridge.ts:27:export class TerminalBridge {
    src/core/stores/MemoryDefinitionStore.ts:39:export class MemoryDefinitionStore implements DefinitionStoreInterface {
    src/core/stores/DatabaseDefinitionStore.ts:50:export class DatabaseDefinitionStore implements DefinitionStoreInterface {
    src/core/databases/DatabaseResolver.ts:18:export class DatabaseResolver {
    src/core/errors.ts:37:export class ToolboxError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/factories.ts:1
    src/core/stores/MemoryDefinitionStore.ts:1
    src/core/stores/DatabaseDefinitionStore.ts:1
    src/core/factories.ts:15
    src/core/helpers.ts:3
    src/core/databases/DatabaseResolver.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    64:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    70:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    115:		for (const group of guide.methods()) {
    116:			const members = source.methods(group.interface)
    123:					expect(findMissing(members, group.methods)).toEqual([])
    126:					expect(findMissing(group.methods, members)).toEqual([])
    130:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    145:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    148:		for (const group of guide.methods()) {
    158:							? source.examples(group.interface)
    159:							: source.examples(group.interface).concat(source.examples(entity))
    160:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    172:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 943:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.12"` → `"version": "0.0.13"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-toolbox-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
