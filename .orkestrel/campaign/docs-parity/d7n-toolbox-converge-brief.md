# Brief — P.2 `d7n-toolbox-converge` (toolbox under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/toolbox` from the committed baseline `50c9b49` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.13`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/toolbox.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/toolbox/guides/toolbox.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-toolbox-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/toolbox.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/toolbox.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/toolbox.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/toolbox.md function createToolFunction: guide "Wrap a registered runtime tool as a `WorkflowFunction`, preserving execution throws and deep-validating its unknown return as JSON." source "Wraps a registered tool as a `WorkflowFunction` (`@orkestrel/workflow`) — the OPT-IN adapter that lets a `function`-form task run a `@orkestrel/tool` tool BY NAME."
guides/toolbox.md function createAgentFunction: guide "Wrap a live `AgentInterface` as a frozen metadata-bearing `AgentFunction`, using Agent-owned result projection and optionally binding a nested workflow tool with propagated functions/agents/store." source "Wraps a live `AgentInterface` (`@orkestrel/agent`) as a `WorkflowFunction` (`@orkestrel/workflow`) — the opt-in adapter that runs the agent to a settled result and carries immutable lineage metadata for contextual Toolbox composition."
guides/toolbox.md function createWorkflowFunctions: guide "Snapshot opaque host leaves and contextually adapt raw agents into one frozen null-prototype recursion-safe `WorkflowRegistry`." source "Composes opaque host functions and raw agents into one immutable workflow registry."
guides/toolbox.md function createWorkflowDraftContract: guide "Compile the LENIENT DRAFT `ContractInterface` — like the strict `createWorkflowContract` but `id`/`name` optional at all three levels." source "Compiles the lenient workflow draft contract used by `createWorkflowTool`."
guides/toolbox.md function createWorkflowTool: guide "Wrap a `WorkflowDefinition` as an LLM-callable flat/draft/full authoring tool, forwarding optional named functions and a checkpoint store to the native runner." source "Wraps a `WorkflowDefinition` as an LLM-callable tool — it ADVERTISES the SIMPLE flat authoring shape (`{ name?, steps: [{ name }] }`) as its `parameters` so even a small model can author a complete tree, and its handler EXPANDS / COMPLETES the authored blob, validates it against the STRICT contract, and runs it through `runner`, forwarding the caller's optional named functions and native checkpoint store."
guides/toolbox.md function createWorkspaceTool: guide "Build the workspace-editing `ToolInterface`, driving a caller `WorkspaceManagerInterface` OR a manager built over a pluggable `WorkspaceStoreInterface`." source "Builds an LLM-callable workspace-editing tool — it ADVERTISES the `operation`-discriminated union (`workspaceToolShape`) as its `parameters`, and its handler PARSES the model-supplied args against that contract and DISPATCHES the matched operation against the manager's ACTIVE workspace (the registry ops drive the manager itself), returning the plain result. A malformed operation throws this package's `ToolboxError`; a genuine workspace-domain failure propagates `@orkestrel/workspace`'s typed `WorkspaceError`. EITHER drives a caller-supplied `WorkspaceToolOptions.manager` directly, OR constructs a fresh `WorkspaceManagerInterface` (`@orkestrel/workspace`) over `WorkspaceToolOptions.store` (through `@orkestrel/workspace`'s `createWorkspaceManager`); neither given constructs a manager backed by `@orkestrel/workspace`'s in-memory store default."
guides/toolbox.md function createAgentTool: guide "Build the sub-agent delegation `ToolInterface` — resolves + runs one seeded agent through an `AgentRegistryInterface`, depth/cycle guarded, with an optional pluggable `ConversationStoreInterface`." source "Builds an LLM-callable sub-agent delegation tool — resolves a live, seeded `AgentInterface` from `registry` and runs it to completion for ONE delegated `task`."
guides/toolbox.md function createDescribeTool: guide "Build the `ToolInterface` that returns another registered tool's full `description` by name — the expansion seam for the workflow, workspace, and agent tools' lean `summary`." source "Builds an LLM-callable tool that returns the FULL `description` of another registered tool by name — the counterpart to the lean `summary` the other tools in this package advertise (`AGENT_TOOL_SUMMARY` / `WORKFLOW_TOOL_SUMMARY` / `WORKSPACE_TOOL_SUMMARY`)."
guides/toolbox.md function createPromptTool: guide "Build the ASK-side `ToolInterface` over a live `TerminalManagerInterface` — asks a per-call `to` one whole `@orkestrel/form` schema and BLOCKS until it answers; `from` FIXED at construction. A schema `parseForm` refuses — an unknown control, a duplicate field name, a `'select'` / `'checkbox'` field without usable `choices` — throws a typed `TOOL` `ToolboxError` up front rather than parking an unanswerable form." source "Builds an LLM-callable form tool — the ASK side of the terminal seam. Asks a multi-field form and BLOCKS until it answers, returning the resolved values record."
guides/toolbox.md function createAnswerTool: guide "Build the ANSWER-side `ToolInterface` over a live `TerminalManagerInterface` — lists the forms addressed to a FIXED `to`, or answers one by id with a `values` record." source "Builds an LLM-callable answer tool — the ANSWER side of the terminal seam. Lists the forms addressed to `AnswerToolOptions.to`, or answers one of them by id."
guides/toolbox.md function createDatabaseTool: guide "Build the `operation`-discriminated `ToolInterface` (create/tables/get/records/count/aggregate/add/set/update/remove/destroy) driving `@orkestrel/database` databases, resolved lazily and cached, with an optional pluggable `DefinitionStoreInterface`." source "Builds an LLM-callable database tool — it creates, queries, and mutates `@orkestrel/database` databases through one `operation`-discriminated call (matching `createWorkspaceTool`'s single-tool-many-operations shape)."
guides/toolbox.md function createRelationTool: guide "Build the `operation`-discriminated `ToolInterface` (load/find/link/unlink/links) traversing/editing `@orkestrel/relation` relationships over a registry of live `RelationManagerInterface`s." source "Builds an LLM-callable relation tool — it traverses and edits `@orkestrel/relation` relationships through one `operation`-discriminated call (matching `createDatabaseTool`'s single-tool-many-operations shape)."
guides/toolbox.md function createMemoryDefinitionStore: guide "Create the in-memory `DefinitionStoreInterface` — a process-lifetime `Map` of `DatabaseDefinition` configs, the DEFAULT store `createDatabaseTool` persists through." source "Creates the in-memory `DefinitionStoreInterface` — a process-lifetime `Map` of database definitions, the DEFAULT store the database and relation tools persist their `DatabaseDefinition` configs through."
guides/toolbox.md function createDatabaseDefinitionStore: guide "Create a `DefinitionStoreInterface` backed by one `@orkestrel/database` table — the driver-pluggable twin of `createMemoryDefinitionStore`, storing each definition as one opaque JSON column." source "Creates a `DefinitionStoreInterface` backed by one table of the `@orkestrel/database` layer — the driver-pluggable twin of `createMemoryDefinitionStore`, storing each database's definition as one opaque JSON column."
guides/toolbox.md function createInferTool: guide "Build a standalone `ToolInterface` that infers a JSON Schema (as a `parameters`-shaped record) from one or more example `samples` — the utility half of the API/DB → MCP bridge. An optional `candidates` call arg checks values against the freshly inferred schema (strict `.is` guard, no coercion) and wraps the return as `{ parameters, checks }`." source "Builds a standalone LLM-callable tool that infers a JSON Schema from example values — the utility half of the \"existing API/DB → MCP tool\" bridge (the other half, `createEndpointTool`, wraps one CONCRETE endpoint)."
guides/toolbox.md function createEndpointTool: guide "Wrap one concrete `EndpointDefinition` as a `ToolInterface` — `parameters` inferred ONCE at construction from `samples`; by default the tool's `execute` ENFORCES that same schema against the call's args before the definition's `execute` runs, throwing a typed `TOOL` error with structured faults on rejection (`validate: false` is the raw-passthrough opt-out — see Contract invariant 23)." source "Wraps one CONCRETE endpoint (`EndpointDefinition`) as an LLM-callable `ToolInterface` — the endpoint half of the \"existing API/DB → MCP tool\" bridge (the other half, `createInferTool`, is a standalone inference utility)."
guides/toolbox.md class MemoryDefinitionStore: guide "The in-memory `DefinitionStoreInterface` — a process-lifetime `Map` of structured-cloned `DatabaseDefinition`s keyed by id; copy-in/copy-out, no idle-TTL or eviction." source "Represents the in-memory `DefinitionStoreInterface` — a process-lifetime `Map` of `DatabaseDefinition`s keyed by database id, the DEFAULT store `createMemoryDefinitionStore` builds. It implements the same `DefinitionStoreInterface` contract as `DatabaseDefinitionStore`: this store copies on write and on read; the table-backed store narrows an untrusted stored blob and reports `undefined` for a malformed one."
guides/toolbox.md class DatabaseDefinitionStore: guide "The `DefinitionStoreInterface` backed by one `@orkestrel/database` `TableInterface` — the definition stored as one opaque JSON column (`{ id, definition }`)." source "Represents a `DefinitionStoreInterface` backed by one table of the `@orkestrel/database` layer — a database's durable CONFIG state IS a row, so persistence reduces to keyed point-access (`get` / `set` / `delete`) over a `TableInterface`, the driver-pluggable twin of the plain-`Map` `MemoryDefinitionStore`."
guides/toolbox.md class DatabaseResolver: guide "Resolve and cache a database handle from the tool's live handles, stored definitions, driver registry, and optional generator." source "Resolves database definitions into cached live handles for database tools."
guides/toolbox.md class ToolboxError: guide "Carries a `ToolboxErrorCode` (`TOOL` / `DEPTH` / `DEADLOCK` / `EXPIRE` / `ANSWER` / `DATABASE` / `RELATION`) + optional `context` — Toolbox authoring, adapter, nesting, resolution, and mapped integration failures." source "Represents a package-owned tool-call failure: malformed input or unresolved configuration (`TOOL`), delegation depth/cycle rejection (`DEPTH`), prompt failure (`DEADLOCK` / `EXPIRE` / `ANSWER`), or a translated upstream database/relation failure (`DATABASE` / `RELATION`)."
guides/toolbox.md function isToolboxError: guide "Narrow an unknown caught value to a `ToolboxError`." source "Narrows an unknown caught value to an `ToolboxError`."
guides/toolbox.md function isWorkflowLineage: guide absent source "Narrows an unknown value to a valid alternating workflow lineage."
guides/toolbox.md function isAgentFunction: guide absent source "Narrows an unknown callable to Toolbox's frozen contextual agent adapter metadata."
guides/toolbox.md function isColumnPrimitive: guide absent source "Narrows an unknown value to a `ColumnPrimitive`."
guides/toolbox.md function isColumnSpec: guide absent source "Narrows an unknown value to a `ColumnSpec`."
guides/toolbox.md function isDatabaseDefinition: guide absent source "Narrows an unknown value to a `DatabaseDefinition` — a non-empty `id` + `driver`, a `tables` record whose every value is `{ columns: record of valid ColumnSpec }`, plus optional `primary`, `indexes`, and finite `version` schema configuration. The boundary guard a `DefinitionStoreInterface` applies to an untrusted persisted blob before trusting it as a definition (never an `as`)."
guides/toolbox.md function tagWorkflow: guide absent source "Returns the ancestry identifier of a workflow in a run chain — `workflow:<id>`."
guides/toolbox.md function tagAgent: guide absent source "Returns the ancestry identifier of an agent in a run chain — `agent:<name>`."
guides/toolbox.md function summarizeWorkflow: guide absent source "Builds the plain success summary `createWorkflowTool` returns on a completed run — the universal tool-handler contract: return a plain value on success, appearing identically over BOTH the agent loop and MCP."
guides/toolbox.md function extendLineage: guide absent source "Appends one tag to a workflow lineage and returns a frozen copy."
guides/toolbox.md function normalizeLineage: guide absent source "Returns the canonical workflow lineage — validated, copied, and frozen."
guides/toolbox.md function deriveWorkflowDepth: guide absent source "Derives the zero-based workflow nesting depth from a valid lineage."
guides/toolbox.md function completeDraft: guide absent source "Completes a `WorkflowDraft` into a strict `WorkflowDefinition` — synthesizes any MISSING `id` deterministically + positionally, and defaults any MISSING `name` to its (now-resolved) `id`."
guides/toolbox.md function completePhaseDraft: guide absent source "Completes one `PhaseDraft` into a strict phase definition — the per-phase step of `completeDraft` (phase `index` → `phase-<index>` when its id is omitted)."
guides/toolbox.md function completeTaskDraft: guide absent source "Completes one `TaskDraft` into a strict task definition — the per-task leaf step of `completeDraft` (task `index` of phase `<phaseId>` → `<phaseId>-task-<index>` when its id is omitted)."
guides/toolbox.md function expandSteps: guide absent source "Expands a flat `WorkflowSteps` blob into a strict `WorkflowDefinition` — each step becomes a one-task phase, IN ORDER."
guides/toolbox.md function inferTerminalCode: guide absent source "Maps a caught error to the `ToolboxErrorCode` the terminal-tool factory throws with — the pure classification step of that factory's error handling."
guides/toolbox.md function inferDatabaseCode: guide absent source "Maps a caught error to the granular `DatabaseErrorCode` (`@orkestrel/database`) the code `createDatabaseTool` throws with — the pure classification step of that factory's error handling, mirroring `inferTerminalCode`'s idiom for `@orkestrel/database`."
guides/toolbox.md function inferRelationCode: guide absent source "Maps a caught error to the granular `RelationErrorCode` (`@orkestrel/relation`) the code `createRelationTool` throws with — the pure classification step of that factory's error handling, mirroring `inferTerminalCode`'s idiom for `@orkestrel/relation`."
guides/toolbox.md function expandInclude: guide absent source "Expands the relation tool's FLAT dot-path `include` list into a live `@orkestrel/relation` `Include` tree — the pure leaf `createRelationTool` calls before a `'load'` / `'find'` call."
guides/toolbox.md function resolveRelationManager: guide absent source "Resolves which registered `RelationManagerInterface` a relation-tool call addresses — the pure manager-resolution leaf `createRelationTool` calls on every operation."
guides/toolbox.md function resolveRelationModel: guide absent source "Resolves a `model` name against a live `RelationManagerInterface` — the pure model-lookup leaf `createRelationTool` calls on every operation, mirroring `resolveRelationManager`'s guard shape."
guides/toolbox.md function clampQuery: guide absent source "Clamps a `'records'` call's query to a row cap, and builds the PROBE query the caller reads with — the pure leaf `createDatabaseTool`'s `'records'` operation uses to detect truncation without a separate `count` round trip."
guides/toolbox.md function resolveLimit: guide absent source "Picks the effective row limit a tool reads with — the requested count when it sits inside the cap, the cap when it exceeds it, and `0` when either falls below zero."
guides/toolbox.md function normalizeQuery: guide absent source "Returns the canonical live `@orkestrel/database` `QueryInput` for the database tool's parsed SERIALIZED query — each condition's OMITTED `connector` defaults to `'and'`."
guides/toolbox.md function expandTables: guide absent source "Compiles a `TableSpec` into the `@orkestrel/database` `TableMap` it configures — each `ColumnSpec` maps to the matching primitive shaper (`'string'` → `stringShape()`, `'integer'` → `integerShape()`, `'number'` → `numberShape()`, `'boolean'` → `booleanShape()`), wrapped in `optionalShape` when the column declares `optional: true`. Total, pure."
guides/toolbox.md function compileColumn: guide absent source "Compiles one `ColumnSpec` into its `@orkestrel/database` column shape — the per-column leaf `expandTables` maps over."
guides/toolbox.md function compileColumnPrimitive: guide absent source "Compiles one `ColumnPrimitive` into its primitive `@orkestrel/database` shape — the leaf `compileColumn` wraps."
guides/toolbox.md const agentToolShape: guide "The shape of `AgentToolArguments` — `createAgentTool`'s advertised `parameters` (`task` required, `provider`/`tools`/`system` optional overrides)." source "Describes the shape of `AgentToolArguments` — `createAgentTool`'s advertised `parameters`."
guides/toolbox.md const taskDraftShape: guide "The DRAFT task shape — like a strict task shape but `id`/`name` optional." source "Describes the shape of a `TaskDraft` — identical to a strict task shape EXCEPT `id` and `name` are OPTIONAL."
guides/toolbox.md const phaseDraftShape: guide "The DRAFT phase shape — `id`/`name` optional, holding `taskDraftShape` tasks." source "Describes the shape of a PHASE in a draft workflow — identical to a strict phase shape EXCEPT `id` and `name` are OPTIONAL, and its tasks are `taskDraftShape`s."
guides/toolbox.md const workflowDraftShape: guide "The DRAFT workflow shape `createWorkflowDraftContract` compiles — `id`/`name` optional at all three levels." source "Describes the shape of a DRAFT workflow — identical to a strict workflow shape EXCEPT `id` and `name` are OPTIONAL at all three levels (workflow / phase / task), so a small model can omit the six identity strings and let the tool synthesize them positionally."
guides/toolbox.md const stepShape: guide "The flat STEP shape — `{ name }`, the building block of `workflowStepsShape`." source "Describes the shape of ONE flat step — `{ name }` — the building block of `workflowStepsShape`."
guides/toolbox.md const workflowStepsShape: guide "The FLAT shape `createWorkflowTool` advertises as its `parameters` — `{ name?, steps: [{ name }] }`." source "Describes the FLAT authoring shape `createWorkflowTool` advertises as its `parameters` — the simplest surface a small model can fill: `{ name?, steps: [{ name }] }`."
guides/toolbox.md const workspaceToolShape: guide "The `operation`-discriminated union `createWorkspaceTool` advertises as its `parameters`." source "Describes the shape of a `WorkspaceOperation` — a descriptive tagged union over the workspace edit, read, and navigation operations, discriminated by the `operation` literal (never a bare `kind`). Each variant leads with its `operation` discriminant then its FLAT fields, every field through `stringShape` / `optionalShape` / `integerShape({ min: 1 })` / `booleanShape`, each carrying a strong field-level `description`."
guides/toolbox.md const describeToolShape: guide "The shape of `DescribeToolArguments` — `createDescribeTool`'s advertised `parameters` (`name` required)." source "Describes the shape of `DescribeToolArguments` — `createDescribeTool`'s advertised `parameters`."
guides/toolbox.md const promptToolShape: guide "The shape of `createPromptTool`'s call args — `to` names the terminal, `schema` carries the whole `@orkestrel/form` document as exact JSON." source "Describes the shape of `createPromptTool`'s call arguments — `to` names the terminal identity and `schema` carries the complete multi-field form document."
guides/toolbox.md const answerToolShape: guide "The `operation`-discriminated shape of `createAnswerTool`'s call args — `pending` (no fields) or `answer` (`id` + a `values` record as exact JSON)." source "Describes the shape of `createAnswerTool`'s call arguments — discriminated by `operation`: `'pending'` lists the forms addressed to this tool's terminal, while `'answer'` resolves one by `id` with a complete `values` record."
guides/toolbox.md const databaseToolShape: guide "The `operation`-discriminated union `createDatabaseTool` advertises as its `parameters` (create/tables/get/records/count/aggregate/add/set/update/remove/destroy)." source "Describes the shape of `createDatabaseTool`'s call arguments — discriminated by `operation` into the 11 database operations (`'create'` / `'tables'` / `'get'` / `'records'` / `'count'` / `'aggregate'` / `'add'` / `'set'` / `'update'` / `'remove'` / `'destroy'`)."
guides/toolbox.md const columnPrimitiveShape: guide "A `ColumnPrimitive` literal — the leaf `columnSpecShape` wraps." source "Describes a `ColumnPrimitive` literal — the leaf `columnSpecShape` wraps."
guides/toolbox.md const columnSpecShape: guide "A `ColumnSpec` — a bare `columnPrimitiveShape`, or `{ primitive, optional }`." source "Describes a `ColumnSpec` — a bare `columnPrimitiveShape`, or `{ primitive, optional }`."
guides/toolbox.md const tableSpecShape: guide "A `TableSpec` — table name to `{ columns }`, each column a `columnSpecShape`." source "Describes a `TableSpec` — table name to `{ columns }`, each column a `columnSpecShape`."
guides/toolbox.md const keyShape: guide "One row key value for the database and relation tools — a string or number; the array form (multiple keys, positional) resolves first per AGENTS' batch overload mold." source "Describes one key value for the database tool and the relation tool — a string or number; the array form (multiple keys, positional) resolves FIRST, so an array argument is read as many keys rather than one."
guides/toolbox.md const rowShape: guide "A loose database row — a flat object of column name to JSON value." source "Describes a loose row — a flat object of column name to JSON value; the array form (multiple rows) resolves FIRST, so an array argument is read as many rows rather than one."
guides/toolbox.md const rowsShape: guide "One or many loose database rows — the array form resolves first per AGENTS' batch overload mold." source "Describes one or many loose rows — the array form resolves FIRST, so an array argument is read as many rows rather than one."
guides/toolbox.md const conditionShape: guide "One SERIALIZED WHERE condition — `values` is always an array, even for a single-value operator." source "Describes one SERIALIZED WHERE condition — `values` is ALWAYS an array, even for a single-value operator."
guides/toolbox.md const orderShape: guide "One sort term — `{ column, direction }`." source "Describes one sort term."
guides/toolbox.md const queryShape: guide "The SERIALIZED query form — conditions, order, and pagination." source "Describes the SERIALIZED query form — conditions, order, and pagination."
guides/toolbox.md const relationToolShape: guide "The `operation`-discriminated union `createRelationTool` advertises as its `parameters` (load/find/link/unlink/links)." source "Describes the shape of `createRelationTool`'s call arguments — discriminated by `operation` into the 5 relation operations (`'load'` / `'find'` / `'link'` / `'unlink'` / `'links'`)."
guides/toolbox.md const singleKeyShape: guide "A single relation row key (not an array) — used by `'link'` / `'unlink'` / `'links'`, which address exactly one owning row." source "Describes a single row key (not an array) — used by `'link'` / `'unlink'` / `'links'`, which address exactly one owning row."
guides/toolbox.md const includeShape: guide "Flat dot-path relation include list, expanded through `expandInclude`." source "Describes the flat dot-path relation include list, expanded through `expandInclude`."
guides/toolbox.md const managerShape: guide "Which registered relation manager to address — omitted resolves to the sole registered manager." source "Describes which registered relation manager to address — omitted resolves to the sole registered manager."
guides/toolbox.md const inferToolShape: guide "The shape of `createInferTool`'s call args — `samples` (array, `min: 1`) plus optional `format` / `enum` toggles and an optional `candidates` array to check against the inferred schema." source "Describes the shape of `createInferTool`'s call arguments — one or more example `samples` to infer a JSON Schema from, plus per-call `format` / `enum` toggles and an optional `candidates` array to check against the inferred schema."
guides/toolbox.md const AGENT_TOOL_NAME: guide absent source "Holds the name `createAgentTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const AGENT_TOOL_DEPTH: guide absent source "Holds the maximum nesting depth a delegation chain (agent tool → sub-agent → agent tool → …) may reach — the bound `createAgentTool`'s depth/cycle guard enforces."
guides/toolbox.md const AGENT_TOOL_DESCRIPTION: guide absent source "Holds the description `createAgentTool` advertises — a short guide covering the required task and optional provider, tools, and system overrides."
guides/toolbox.md const AGENT_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createAgentTool` advertises in place of `AGENT_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `createDescribeTool`."
guides/toolbox.md const MAX_WORKFLOW_CHAIN: guide absent source "Holds the maximum nesting depth a workflow → agent → workflow chain may reach — the bound `createAgentFunction` and `createWorkflowTool`'s depth/cycle guards enforce."
guides/toolbox.md const WORKFLOW_TOOL_NAME: guide absent source "Holds the name `createWorkflowTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under, and the name `createAgentFunction` binds the depth/cycle-aware workflow tool under onto a wrapped agent's `context.tools`."
guides/toolbox.md const WORKFLOW_TOOL_FLAT_EXAMPLE: guide absent source "Holds a complete FLAT authoring example — the PRIMARY way a small model authors a workflow through `createWorkflowTool`: `{ name, steps: [{ name }] }`."
guides/toolbox.md const WORKFLOW_TOOL_NESTED_EXAMPLE: guide absent source "Holds a minimal NESTED authoring example — the ADVANCED escape-hatch form a model may use instead of the flat shape: a full `WorkflowDefinition` (`@orkestrel/workflow`)."
guides/toolbox.md const WORKFLOW_TOOL_DESCRIPTION: guide absent source "Holds the description `createWorkflowTool` advertises — the flat authoring form, its worked example, and the advanced nested definition form."
guides/toolbox.md const WORKFLOW_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createWorkflowTool` advertises in place of `WORKFLOW_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `createDescribeTool`."
guides/toolbox.md const WORKSPACE_TOOL_NAME: guide absent source "Holds the name `createWorkspaceTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const WORKSPACE_TOOL_EXAMPLE: guide absent source "Holds a valid `WorkspaceOperation` object — the canonical example embedded VERBATIM in `WORKSPACE_TOOL_DESCRIPTION`."
guides/toolbox.md const WORKSPACE_TOOL_DESCRIPTION: guide absent source "Holds the description `createWorkspaceTool` advertises — the operation-keyed workspace protocol, all supported operations, and worked examples."
guides/toolbox.md const WORKSPACE_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createWorkspaceTool` advertises in place of `WORKSPACE_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `createDescribeTool`."
guides/toolbox.md const DESCRIBE_TOOL_NAME: guide absent source "Holds the name `createDescribeTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const DESCRIBE_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createDescribeTool` advertises — this tool needs no teaching of its own, so its summary and description are both short."
guides/toolbox.md const DESCRIBE_TOOL_DESCRIPTION: guide absent source "Holds the DESCRIPTION `createDescribeTool` advertises."
guides/toolbox.md const PROMPT_TOOL_NAME: guide absent source "Holds the name `createPromptTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const PROMPT_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createPromptTool` advertises in place of `PROMPT_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `createDescribeTool`."
guides/toolbox.md const PROMPT_TOOL_DESCRIPTION: guide absent source "Holds the full form protocol `createPromptTool` advertises."
guides/toolbox.md const ANSWER_TOOL_NAME: guide absent source "Holds the name `createAnswerTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const ANSWER_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createAnswerTool` advertises in place of `ANSWER_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `createDescribeTool`."
guides/toolbox.md const ANSWER_TOOL_DESCRIPTION: guide absent source "Holds the pending/answer protocol `createAnswerTool` advertises."
guides/toolbox.md const DATABASE_TOOL_NAME: guide absent source "Holds the name `createDatabaseTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const DATABASE_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createDatabaseTool` advertises in place of `DATABASE_TOOL_DESCRIPTION`."
guides/toolbox.md const DATABASE_TOOL_DESCRIPTION: guide absent source "Holds the description `createDatabaseTool` advertises — a multi-line guide that teaches a small model the operation list, the SERIALIZED query form, and the `TableSpec` column DSL."
guides/toolbox.md const DATABASE_TOOL_LIMIT: guide absent source "Holds the default cap on rows a `records` call returns when the caller omits `query.limit` — the database tool's default row ceiling."
guides/toolbox.md const DATABASE_TOOL_MUTATIONS: guide absent source "Lists the runtime-frozen database-tool mutation names disabled by `DatabaseToolOptions.readonly`."
guides/toolbox.md const RELATION_TOOL_NAME: guide absent source "Holds the name `createRelationTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const RELATION_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` the relation tool advertises in place of `RELATION_TOOL_DESCRIPTION`."
guides/toolbox.md const RELATION_TOOL_DESCRIPTION: guide absent source "Holds the DESCRIPTION the relation tool advertises — a multi-line guide that teaches a small model the operation list and the flat dot-path `include` syntax."
guides/toolbox.md const RELATION_TOOL_LIMIT: guide absent source "Holds the default cap on rows a `find` / `links` call returns when the caller omits `limit` — the relation tool's default row ceiling."
guides/toolbox.md const RELATION_TOOL_DEPTH: guide absent source "Holds the default cap on how many `include` path segments deep a `load` / `find` call may traverse — the relation tool's default include-depth ceiling."
guides/toolbox.md const INFER_TOOL_NAME: guide absent source "Holds the name `createInferTool` advertises by default — the key a model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under."
guides/toolbox.md const INFER_TOOL_SUMMARY: guide absent source "Holds the lean `ToolInterface.summary` `createInferTool` advertises in place of `INFER_TOOL_DESCRIPTION` — a `ToolManagerInterface.definitions()` (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in for the full teaching description; the full text stays retrievable through `createDescribeTool`."
guides/toolbox.md const INFER_TOOL_DESCRIPTION: guide absent source "Holds the schema-inference protocol `createInferTool` advertises."
guides/toolbox.md interface TaskDraft: guide absent source "Represents a draft task — a `TaskDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name`."
guides/toolbox.md interface PhaseDraft: guide absent source "Represents a draft phase — a `PhaseDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name` and `TaskDraft` tasks."
guides/toolbox.md interface WorkflowDraft: guide absent source "Represents a draft workflow — a `WorkflowDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name` at all three levels (workflow / phase / task)."
guides/toolbox.md interface WorkflowStep: guide absent source "Represents one flat step — `{ name }` — the building block of a `WorkflowSteps` blob."
guides/toolbox.md interface WorkflowSteps: guide absent source "Represents the FLAT authoring blob `createWorkflowTool` advertises — `{ name?, steps }` — the simplest surface a small model can fill."
guides/toolbox.md interface WorkflowToolResult: guide absent source "Represents the JSON-safe run summary returned by `createWorkflowTool`."
guides/toolbox.md type WorkflowLineage: guide absent source "Represents one immutable workflow/agent call chain, beginning with a workflow tag."
guides/toolbox.md type WorkflowAgents: guide absent source "Represents raw live agents keyed by the workflow function names that invoke them."
guides/toolbox.md type AgentFunction: guide absent source "Represents a contextual agent adapter carrying immutable metadata for Toolbox composition."
guides/toolbox.md interface AgentFunctionOptions: guide absent source "Represents the options for `createAgentFunction` — the OPT-IN adapter that wraps a live `AgentInterface` (`@orkestrel/agent`) as an `AgentFunction` with immutable lineage metadata and optional nested-workflow composition."
guides/toolbox.md interface WorkflowToolOptions: guide absent source "Represents the options for `createWorkflowTool` and `createWorkflowFunctions` — lineage-aware composition of opaque leaves, raw agents, and native workflow persistence."
guides/toolbox.md interface WorkspaceToolOptions: guide absent source "Represents the options for `createWorkspaceTool` — EITHER a caller-built `WorkspaceManagerInterface` to drive directly, OR a `WorkspaceStoreInterface` the tool constructs a fresh manager over; neither given constructs a manager over `@orkestrel/workspace`'s in-memory store."
guides/toolbox.md type WorkspaceOperation: guide absent source "Represents one operation an agent invokes through `createWorkspaceTool` — a FLAT, descriptive tagged union over the workspace edit, read, and navigation actions, discriminated by the `operation` literal (a discriminant is named for its axis — the action being performed — NEVER `kind`)."
guides/toolbox.md interface AgentToolOptions: guide absent source "Represents the options for `createAgentTool` — the sub-agent delegation defaults, the nesting-depth / cycle guard bookkeeping, and the advertised tool overrides."
guides/toolbox.md interface AgentToolArguments: guide absent source "Represents the FLAT args `createAgentTool` accepts — a delegated `task` plus the minimal optional `AgentJobInput` (`@orkestrel/agent`) fields a caller may override per-call."
guides/toolbox.md type ToolboxErrorCode: guide absent source "Represents the machine-readable code a thrown `ToolboxError` carries — a thrown, typed, code-bearing error, never a `{ error }` return."
guides/toolbox.md interface DescribeToolArguments: guide absent source "Represents the FLAT args `createDescribeTool` accepts — the registered tool `name` whose full `description` a model wants back."
guides/toolbox.md interface PromptToolOptions: guide absent source "Represents the options for `createPromptTool` — the live `TerminalManagerInterface` (`@orkestrel/terminal`) to `ask` through, the terminal name `from`, and the advertised tool overrides."
guides/toolbox.md interface AnswerToolOptions: guide absent source "Represents the options for `createAnswerTool` — the live `TerminalManagerInterface` (`@orkestrel/terminal`) to list / answer prompts through, the terminal name `to`, and the advertised tool overrides."
guides/toolbox.md type ColumnPrimitive: guide absent source "Represents one column's declared primitive — a shorthand, or `integer` for a whole-number `number`."
guides/toolbox.md type ColumnSpec: guide absent source "Represents one table column's spec — either a bare `ColumnPrimitive` shorthand, or `{ primitive, optional }` when the column may be absent from a row."
guides/toolbox.md type TableSpec: guide absent source "Represents a database's table layout — one entry per table, each a flat map of column name to `ColumnSpec`. The small-model-facing DSL `expandTables` compiles into an `@orkestrel/database` `TableMap`."
guides/toolbox.md interface DatabaseDefinition: guide absent source "Represents one database's CONFIG-ONLY definition — `id` + `driver` + `TableSpec`, with optional `primary`, `indexes`, and `version` schema configuration."
guides/toolbox.md interface DatabaseDefinitionRow: guide absent source "Represents one opaque persisted row — the shape a definition-row-backed `TableInterface` store reads/writes; `definition` is narrowed with `isDatabaseDefinition` on read."
guides/toolbox.md interface DefinitionStoreInterface: guide absent source "Represents the point-access persistence seam for `DatabaseDefinition` configs — the twin of `@orkestrel/terminal`'s `TerminalStoreInterface`, storing a database's CONFIG-ONLY blueprint (never a live handle). Every primitive is async; `delete` of an absent id is a no-op."
guides/toolbox.md interface DatabaseQueryInput: guide absent source "Represents the SERIALIZED wire query a database-tool call carries — the parsed form of `queryShape`, which `normalizeQuery` normalizes into a live `@orkestrel/database` `QueryInput`."
guides/toolbox.md interface ClampedQuery: guide absent source "Represents the PROBE query and effective row limit `clampQuery` returns."
guides/toolbox.md interface DatabaseToolOptions: guide absent source "Represents the options for `createDatabaseTool` — the live handles, definition store, driver registry, key generator, row cap, timeout, and readonly gate the tool composes."
guides/toolbox.md interface RelationToolOptions: guide absent source "Represents the options for `createRelationTool`."
guides/toolbox.md interface InferToolOptions: guide absent source "Represents the options for `createInferTool` — advertised name/description overrides only; `format` / `enum` are RUNTIME call arguments (see `inferToolShape`), not construction-time options, since a model chooses them per call."
guides/toolbox.md type EndpointHandler: guide absent source "Represents the handler `EndpointDefinition.execute` implements — mirrors `@orkestrel/tool`'s `ToolOptions.execute` signature EXACTLY (same `Readonly<Record<string, unknown>>` argument, same `Promise<unknown> | unknown` return) so `execute: (args) => definition.execute(args)` typechecks with zero assertions in `createEndpointTool`."
guides/toolbox.md interface EndpointDefinition: guide absent source "Represents one concrete endpoint `createEndpointTool` wraps as an LLM-callable `ToolInterface` — the advertised identity, a non-empty set of example values its `parameters` are inferred from, and the local handler that runs a call."
guides/toolbox.md interface EndpointToolOptions: guide absent source "Represents the construction-time tuning for `createEndpointTool` — the inferred `parameters` schema's `format` / `enum` constraints, and whether that same schema is ENFORCED at `execute` time."
guides/toolbox.md function createTerminalRoutes: guide "Build the two `TerminalRoute` records (GET SSE form stream, POST `{ id, values }` answer) bridging a `TerminalManagerInterface`'s endpoints onto the wire, byte-compatible with `PromptClient`." source "Builds the GET SSE stream and POST answer routes that bridge a terminal manager onto the wire."
guides/toolbox.md type TerminalRouteMethod: guide "The HTTP method literal a `TerminalRoute` declares — the same union `@orkestrel/router`'s `Method` type accepts." source "Represents the HTTP method literal a `TerminalRoute` declares — the same union `@orkestrel/router`'s `Method` type accepts."
guides/toolbox.md interface TerminalRouteContext: guide "`{ params }` — the minimal route-dispatch context a `TerminalRoute` handler reads (the frozen, URL-decoded `:name` path param)." source "Represents the minimal route-dispatch context a `TerminalRoute` handler reads — exactly the frozen, URL-decoded `:name` path param slice a router hands a matched handler."
guides/toolbox.md interface TerminalRoute: guide "`{ method, path, handler }` — one structural route record `createTerminalRoutes` returns." source "Represents one structural route record `createTerminalRoutes` returns — a plain `{ method, path, handler }` shape carrying NO dependency on `@orkestrel/router`'s own `Route` type, so a consumer mounts it against any router that accepts a two-arg `(request, context) => Response | Promise<Response>` handler keyed by `method` + `path`."
guides/toolbox.md interface TerminalRoutesOptions: guide "`{ path?, token?, keepalive?, timer?, limit? }` — the shared mount path, optional `TerminalToken` gate, SSE keepalive interval, injected `TimerHandler`, and POST body byte cap (defaults to `@orkestrel/server`'s `DEFAULT_BODY_LIMIT`, 1 MiB; a non-finite limit also defaults, a negative limit clamps to zero, and over-limit input is `413`, ignoring any `Content-Length` header)." source "Represents the options `createTerminalRoutes` takes — the shared route, authorization, keepalive, timer, and body-limit configuration both routes read."
guides/toolbox.md type TerminalToken: guide "`string | ((value: string | undefined) => boolean)` — the `token` gate: a string is compared for equality against the `x-orkestrel-token` header; a function is a consumer-controlled validator (JWT `exp` checks, revocation lookups, anything time-varying), letting a token expire or rotate mid-stream. Validated at GET connect, on every POST, and RE-VALIDATED on every SSE keepalive tick — a stream whose presented token stops validating is torn down through the same abort/self-heal teardown path (no `shutdown` frame; the client reconnects and re-authenticates). Because re-validation only happens on the keepalive tick, the revocation window equals the keepalive interval — a rejected/expired token keeps streaming until the next tick — and a throwing validator is treated as rejection (fail-closed) at every call site." source "Represents the `token` gate `TerminalRoutesOptions` may configure — a plain string compared for equality against the `x-orkestrel-token` header, OR a validator function the consumer fully controls, enabling expiry/rotation (a JWT `exp` check, a revocation-list lookup, anything time-varying) that a fixed string cannot express. `undefined` disables the auth check entirely."
guides/toolbox.md const TERMINAL_ROUTES_PATH: guide "The default `:name`-templated path (`/terminals/:name`) `createTerminalRoutes` mounts its routes under." source "Holds the default `:name`-templated path `createTerminalRoutes` mounts its GET (SSE) + POST (answer) routes under."
guides/toolbox.md const TERMINAL_KEEPALIVE_MS: guide "The default SSE keepalive interval in milliseconds (`15_000`) `createTerminalRoutes` arms per open connection." source "Holds the default SSE keepalive interval (in milliseconds) `createTerminalRoutes` arms per open connection — a `:` comment ping a conforming SSE parser ignores, keeping intermediary proxies from timing out an otherwise-idle stream."
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
```

## Facts for toolbox (taken 2026-09-07T21:33Z by facts.sh)

- Checkout `/home/user/fleet/toolbox`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `50c9b49`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    116:			const members = source.methods(group.interface).map((method) => method.name)
    124:					expect(findMissing(members, documented)).toEqual([])
    127:					expect(findMissing(documented, members)).toEqual([])
    133:							: findMissing(
    134:									source.methods(entity).map((method) => method.name),
    152:				findUnexampled(
    155:					source.examples().map((example) => example.name),
    160:		for (const group of guide.methods()) {
    165:					? source.examples(group.interface).map((example) => example.name)
    169:							.concat(source.examples(entity).map((example) => example.name))
    176:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    188:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 943:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-toolbox-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/toolbox.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/toolbox.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-toolbox-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
