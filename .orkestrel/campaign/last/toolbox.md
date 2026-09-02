# Last changes: toolbox

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `0ec520f`, merge base with `origin/main` `5d79a3a`, layer L6, declared version 0.0.11, registry version 0.0.11.

## Commits since origin/main

```text
e5f831f 2026-08-28 Update every dependency to the published latest
3fb6cab 2026-08-28 Adopt the catalog and guide mirrors for the wave
b38282f 2026-08-28 Apply the verified src-audit fixes
9063af6 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
96f6e5d 2026-09-01 Adopt the renamed guide helpers in the parity test
e5b868a 2026-09-02 Rename the toolbox helpers and terminal bridge and adopt the staged closure
02e25a0 2026-09-02 Carry the upstream renames through the toolbox guide
c13a526 2026-09-02 Point the README at the guide the package ships
0ec520f 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                                          |   2 +-
 README.md                                                            |   6 +-
 package.json                                                         |   2 +-
 src/core/compilers.ts                                                |  52 ++++++++
 src/core/constants.ts                                                |  90 +++++++-------
 src/core/databases/DatabaseResolver.ts                               |  18 +--
 src/core/errors.ts                                                   |   6 +-
 src/core/factories.ts                                                | 141 +++++++++++-----------
 src/core/helpers.ts                                                  | 280 +++++++++----------------------------------
 src/core/index.ts                                                    |   2 +
 src/core/shapers.ts                                                  |  70 +++++------
 src/core/stores/DatabaseDefinitionStore.ts                           |  39 ++++--
 src/core/stores/MemoryDefinitionStore.ts                             |  33 +++--
 src/core/types.ts                                                    | 185 +++++++++++++++++-----------
 src/core/validators.ts                                               | 110 +++++++++++++++++
 src/server/constants.ts                                              |   6 +-
 src/server/factories.ts                                              |  10 +-
 src/server/index.ts                                                  |   2 +-
 src/server/{routes/TerminalRoutes.ts => terminals/TerminalBridge.ts} |  21 ++--
 src/server/{routes => terminals}/TerminalConnection.ts               |  13 +-
 src/server/types.ts                                                  |  19 +--
 tests/guides.test.ts                                                 |  22 ++--
 tests/setup.test.ts                                                  |  11 +-
 tests/setup.ts                                                       |  81 ++++++++-----
 tests/src/core/compilers.test.ts                                     | 103 ++++++++++++++++
 tests/src/core/factories.test.ts                                     | 141 ++++++++++++----------
 tests/src/core/helpers.test.ts                                       | 137 +++++++--------------
 tests/src/core/shapers.test.ts                                       |   8 +-
 tests/src/server/{routes => terminals}/TerminalConnection.test.ts    |  14 +--
 29 files changed, 896 insertions(+), 728 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index c0836f1..70a67b7 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,25 +1,25 @@
 import type { WorkflowDefinition } from '@orkestrel/workflow'
 import type { WorkflowSteps, WorkspaceOperation } from './types.js'
 
-// Toolbox constants — UPPER_SNAKE, `Object.freeze`d, every member exported (AGENTS §5).
+// Toolbox constants — UPPER_SNAKE, `Object.freeze`d, every member exported.
 // Toolbox owns the workflow tool's authoring text/examples/depth bound and the workspace tool's
 // name/description. The current workflow text describes Toolbox's authoring layer over
 // `@orkestrel/workflow`'s named-function and runner-owned persistence APIs; the workspace text
 // describes the editing surface Toolbox composes over `@orkestrel/workspace`.
 
 /**
- * The name {@link import('./factories.js').createAgentTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createAgentTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  */
 export const AGENT_TOOL_NAME = 'agent'
 
 /**
- * The maximum nesting depth a delegation chain (agent tool → sub-agent → agent tool → …) may
+ * Holds the maximum nesting depth a delegation chain (agent tool → sub-agent → agent tool → …) may
  * reach — the bound {@link import('./factories.js').createAgentTool}'s depth/cycle guard
  * enforces.
  *
  * @remarks
- * Deliberately a SEPARATE constant from {@link MAX_WORKFLOW_DEPTH} (rather than the two guards
+ * Deliberately a SEPARATE constant from {@link MAX_WORKFLOW_CHAIN} (rather than the two guards
  * sharing one reference): the two guards bound DIFFERENT chains (workflow nesting vs. agent
  * delegation) that happen to share a value today, and keeping this bound decoupled means a
  * future change to one never silently shifts the other. Same numeric value by convention, not
@@ -28,7 +28,7 @@ export const AGENT_TOOL_NAME = 'agent'
 export const AGENT_TOOL_DEPTH = 8
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createAgentTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createAgentTool}
  * advertises in place of {@link AGENT_TOOL_DESCRIPTION} — a `ToolManagerInterface.definitions()`
  * (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in
  * for the full teaching description; the full text stays retrievable via
@@ -38,14 +38,14 @@ export const AGENT_TOOL_SUMMARY =
 	"Delegate a task to a sub-agent and return its result; each call runs one sub-agent turn to completion. Call describe('agent') for the optional provider/tools/system overrides."
 
 /**
- * The description {@link import('./factories.js').createAgentTool} advertises — a short guide
+ * Holds the description {@link import('./factories.js').createAgentTool} advertises — a short guide
  * covering the required task and optional provider, tools, and system overrides.
  */
 export const AGENT_TOOL_DESCRIPTION = [
 	'Delegate a task to a sub-agent and return its result. Every call runs ONE sub-agent turn to completion.',
 	'',
 	'Required:',
-	'  task     - the instructions the sub-agent should carry out.',
+	'  task     - the instructions the sub-agent carries out.',
 	'Optional overrides (default to the values this tool was configured with):',
 	'  provider - the registry key of the model/provider the sub-agent runs against.',
 	'  tools    - registry keys of the tools loaded into the sub-agent (replaces the default list, not merged).',
@@ -57,7 +57,7 @@ export const AGENT_TOOL_DESCRIPTION = [
 ].join('\n')
 
 /**
- * The maximum nesting depth a workflow → agent → workflow chain may reach — the bound
+ * Holds the maximum nesting depth a workflow → agent → workflow chain may reach — the bound
  * {@link import('./factories.js').createAgentFunction} and
  * {@link import('./factories.js').createWorkflowTool}'s depth/cycle guards enforce.
  *
@@ -66,10 +66,10 @@ export const AGENT_TOOL_DESCRIPTION = [
  * workflows is allowed, while a ninth nested workflow is rejected with this package's typed
  * `DEPTH` `ToolboxError`.
  */
-export const MAX_WORKFLOW_DEPTH = 8
+export const MAX_WORKFLOW_CHAIN = 8
 
 /**
- * The name {@link import('./factories.js').createWorkflowTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createWorkflowTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under, and the name
  * {@link import('./factories.js').createAgentFunction} binds the depth/cycle-aware workflow tool
  * under onto a wrapped agent's `context.tools`.
@@ -78,18 +78,18 @@ export const MAX_WORKFLOW_DEPTH = 8
  * The propagation seam's well-known key: when
  * `createAgentFunction`'s `runner` option is supplied, it adds a `createWorkflowTool`-built tool
  * under this name to the agent's `context.tools`, so it can author + run a NESTED workflow
- * (bounded by {@link MAX_WORKFLOW_DEPTH}).
+ * (bounded by {@link MAX_WORKFLOW_CHAIN}).
  */
 export const WORKFLOW_TOOL_NAME = 'workflow'
 
 /**
- * A complete FLAT authoring example — the PRIMARY way a small model authors a workflow through
+ * Holds a complete FLAT authoring example — the PRIMARY way a small model authors a workflow through
  * {@link import('./factories.js').createWorkflowTool}: `{ name, steps: [{ name }] }`.
  *
  * @remarks
  * Each step becomes a one-task phase, in
  * order; a step's `name` is a REGISTERED behavior name (not a label) — the registry key its
- * task's `run` resolves against. The tool expands this
+ * task's `behavior` resolves against. The tool expands this
  * ({@link import('./helpers.js').expandSteps}) into a valid `WorkflowDefinition`
  * (`@orkestrel/workflow`). It is embedded VERBATIM in {@link WORKFLOW_TOOL_DESCRIPTION}.
  */
@@ -99,7 +99,7 @@ export const WORKFLOW_TOOL_FLAT_EXAMPLE: WorkflowSteps = Object.freeze({
 })
 
 /**
- * A minimal NESTED authoring example — the ADVANCED escape-hatch form a model may use instead of
+ * Holds a minimal NESTED authoring example — the ADVANCED escape-hatch form a model may use instead of
  * the flat shape: a full `WorkflowDefinition` (`@orkestrel/workflow`).
  *
  * @remarks
@@ -117,7 +117,7 @@ export const WORKFLOW_TOOL_NESTED_EXAMPLE: WorkflowDefinition = Object.freeze({
 				Object.freeze({
 					id: 'compile',
 					name: 'Compile',
-					run: 'compile',
+					behavior: 'compile',
 				}),
 			]),
 		}),
@@ -125,7 +125,7 @@ export const WORKFLOW_TOOL_NESTED_EXAMPLE: WorkflowDefinition = Object.freeze({
 })
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createWorkflowTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createWorkflowTool}
  * advertises in place of {@link WORKFLOW_TOOL_DESCRIPTION} — a `ToolManagerInterface.definitions()`
  * (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in
  * for the full teaching description; the full text stays retrievable via
@@ -135,7 +135,7 @@ export const WORKFLOW_TOOL_SUMMARY =
 	"Author and run a multi-phase workflow in one call — phases run in sequence, tasks within a phase run concurrently. Call describe('workflow') for the full authoring schema and examples."
 
 /**
- * The description {@link import('./factories.js').createWorkflowTool} advertises — the flat
+ * Holds the description {@link import('./factories.js').createWorkflowTool} advertises — the flat
  * authoring form, its worked example, and the advanced nested definition form.
  */
 export const WORKFLOW_TOOL_DESCRIPTION = [
@@ -149,19 +149,19 @@ export const WORKFLOW_TOOL_DESCRIPTION = [
 	'Example:',
 	JSON.stringify(WORKFLOW_TOOL_FLAT_EXAMPLE),
 	'',
-	'ADVANCED — the full nested form, for multi-task phases or explicit ids. A workflow has phases; a phase has tasks; a task may have a "run" (a registered behavior name); omitting it creates a JSON-null no-op:',
+	'ADVANCED — the full nested form, for multi-task phases or explicit ids. A workflow has phases; a phase has tasks; a task may have a "behavior" (a registered behavior name); omitting it creates a JSON-null no-op:',
 	JSON.stringify(WORKFLOW_TOOL_NESTED_EXAMPLE),
 	'In the nested form you may omit any "id"/"name" and they are filled in positionally; a provided one is kept.',
 ].join('\n')
 
 /**
- * The name {@link import('./factories.js').createWorkspaceTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createWorkspaceTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  */
 export const WORKSPACE_TOOL_NAME = 'workspace'
 
 /**
- * A valid {@link import('./types.js').WorkspaceOperation} object — the canonical example embedded
+ * Holds a valid {@link import('./types.js').WorkspaceOperation} object — the canonical example embedded
  * VERBATIM in {@link WORKSPACE_TOOL_DESCRIPTION}.
  *
  * @remarks
@@ -176,7 +176,7 @@ export const WORKSPACE_TOOL_EXAMPLE: WorkspaceOperation = Object.freeze({
 })
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createWorkspaceTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createWorkspaceTool}
  * advertises in place of {@link WORKSPACE_TOOL_DESCRIPTION} — a `ToolManagerInterface.definitions()`
  * (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in
  * for the full teaching description; the full text stays retrievable via
@@ -186,7 +186,7 @@ export const WORKSPACE_TOOL_SUMMARY =
 	"Read and edit files in a workspace — one operation per call (read, write, list, search, replace, splice, move, remove, plus workspace switching), chosen by the 'operation' field. Call describe('workspace') for the full operation list and fields."
 
 /**
- * The description {@link import('./factories.js').createWorkspaceTool} advertises — the
+ * Holds the description {@link import('./factories.js').createWorkspaceTool} advertises — the
  * operation-keyed workspace protocol, all supported operations, and worked examples.
  *
  * @remarks
@@ -219,7 +219,7 @@ export const WORKSPACE_TOOL_DESCRIPTION = [
 ].join('\n')
 
 /**
- * The name {@link import('./factories.js').createDescribeTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createDescribeTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  *
  * @remarks
@@ -231,14 +231,14 @@ export const WORKSPACE_TOOL_DESCRIPTION = [
 export const DESCRIBE_TOOL_NAME = 'describe'
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createDescribeTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createDescribeTool}
  * advertises — this tool needs no teaching of its own, so its summary and description are both
  * short.
  */
 export const DESCRIBE_TOOL_SUMMARY = 'Return the full description of a named registered tool.'
 
 /**
- * The DESCRIPTION {@link import('./factories.js').createDescribeTool} advertises.
+ * Holds the DESCRIPTION {@link import('./factories.js').createDescribeTool} advertises.
  *
  * @remarks
  * Deliberately short — unlike the workflow / workspace / agent tools, this one has no authoring
@@ -248,13 +248,13 @@ export const DESCRIBE_TOOL_DESCRIPTION =
 	'Return the full description of a registered tool by its name. Required: name - the registered tool name (see another tool listing for available names).'
 
 /**
- * The name {@link import('./factories.js').createPromptTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createPromptTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  */
 export const PROMPT_TOOL_NAME = 'ask'
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createPromptTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createPromptTool}
  * advertises in place of {@link PROMPT_TOOL_DESCRIPTION} — a `ToolManagerInterface.definitions()`
  * (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in
  * for the full teaching description; the full text stays retrievable via
@@ -263,7 +263,7 @@ export const PROMPT_TOOL_NAME = 'ask'
 export const PROMPT_TOOL_SUMMARY =
 	"Ask another terminal a multi-field form and BLOCK until it answers; the call resolves with the values record. Call describe('ask') for the schema."
 
-/** The full form protocol {@link import('./factories.js').createPromptTool} advertises. */
+/** Holds the full form protocol {@link import('./factories.js').createPromptTool} advertises. */
 export const PROMPT_TOOL_DESCRIPTION = [
 	'Ask another terminal a multi-field form and block until it answers. This call does not return until the addressed terminal answers, or the form expires.',
 	'',
@@ -285,13 +285,13 @@ export const PROMPT_TOOL_DESCRIPTION = [
 ].join('\n')
 
 /**
- * The name {@link import('./factories.js').createAnswerTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createAnswerTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  */
 export const ANSWER_TOOL_NAME = 'answer'
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createAnswerTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createAnswerTool}
  * advertises in place of {@link ANSWER_TOOL_DESCRIPTION} — a `ToolManagerInterface.definitions()`
  * (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in
  * for the full teaching description; the full text stays retrievable via
@@ -300,7 +300,7 @@ export const ANSWER_TOOL_NAME = 'answer'
 export const ANSWER_TOOL_SUMMARY =
 	"List forms addressed to this terminal, or answer one by id with a values record. Call describe('answer') for the required fields."
 
-/** The pending/answer protocol {@link import('./factories.js').createAnswerTool} advertises. */
+/** Holds the pending/answer protocol {@link import('./factories.js').createAnswerTool} advertises. */
 export const ANSWER_TOOL_DESCRIPTION = [
 	'List the forms currently addressed to this terminal, or answer one of them by id. Every call is ONE operation, chosen by the "operation" field.',
 	'',
@@ -314,25 +314,25 @@ export const ANSWER_TOOL_DESCRIPTION = [
 ].join('\n')
 
 /**
- * The name the upcoming `createDatabaseTool` factory will advertise by default — the key a model
+ * Holds the name the upcoming `createDatabaseTool` factory will advertise by default — the key a model
  * calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  *
  * @remarks
  * SRC-1 of a 3-unit spine: this unit lands the persistence + schema foundation
  * ({@link import('./types.js').DatabaseDefinition}, {@link import('./types.js').DefinitionStoreInterface},
- * {@link import('./helpers.js').expandTables}); `createDatabaseTool` itself is built in a later unit.
+ * {@link import('./compilers.js').expandTables}); `createDatabaseTool` itself is built in a later unit.
  */
 export const DATABASE_TOOL_NAME = 'database'
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} the upcoming database tool
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} the upcoming database tool
  * will advertise in place of {@link DATABASE_TOOL_DESCRIPTION}.
  */
 export const DATABASE_TOOL_SUMMARY =
 	"Create and query a database — one operation per call (create, tables, get, records, count, aggregate, add, set, update, remove, destroy), chosen by the 'operation' field. Call describe('database') for the full operation list, the query form, and the column DSL."
 
 /**
- * The DESCRIPTION the upcoming database tool will advertise — a multi-line guide that teaches a
+ * Holds the DESCRIPTION the upcoming database tool will advertise — a multi-line guide that teaches a
  * small model the operation list, the SERIALIZED query form, and the {@link import('./types.js').TableSpec}
  * column DSL.
  *
@@ -384,10 +384,10 @@ export const DATABASE_TOOL_DESCRIPTION = [
 	}),
 ].join('\n')
 
-/** The default cap on rows a `records` call returns when the caller omits `query.limit` — the upcoming database tool's default row ceiling. */
+/** Holds the default cap on rows a `records` call returns when the caller omits `query.limit` — the upcoming database tool's default row ceiling. */
 export const DATABASE_TOOL_LIMIT = 1000
 
-/** The runtime-frozen database-tool mutation names disabled by `DatabaseToolOptions.readonly`. */
+/** Lists the runtime-frozen database-tool mutation names disabled by `DatabaseToolOptions.readonly`. */
 export const DATABASE_TOOL_MUTATIONS: readonly string[] = Object.freeze([
 	'create',
 	'add',
@@ -398,20 +398,20 @@ export const DATABASE_TOOL_MUTATIONS: readonly string[] = Object.freeze([
 ])
 
 /**
- * The name `createRelationTool` advertises by default — the key a model calls and the
+ * Holds the name `createRelationTool` advertises by default — the key a model calls and the
  * `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  */
 export const RELATION_TOOL_NAME = 'relation'
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} the relation tool advertises
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} the relation tool advertises
  * in place of {@link RELATION_TOOL_DESCRIPTION}.
  */
 export const RELATION_TOOL_SUMMARY =
 	"Traverse and edit relationships between database rows — one operation per call (load, find, link, unlink, links), chosen by the 'operation' field. Call describe('relation') for the include-path syntax."
 
 /**
- * The DESCRIPTION the relation tool advertises — a multi-line guide that teaches a small model
+ * Holds the DESCRIPTION the relation tool advertises — a multi-line guide that teaches a small model
  * the operation list and the flat dot-path `include` syntax.
  *
  * @remarks
@@ -433,20 +433,20 @@ export const RELATION_TOOL_DESCRIPTION = [
 	JSON.stringify({ operation: 'load', model: 'orders', key: '1', include: ['contacts.account'] }),
 ].join('\n')
 
-/** The default cap on rows a `find` / `links` call returns when the caller omits `limit` — the relation tool's default row ceiling. */
+/** Holds the default cap on rows a `find` / `links` call returns when the caller omits `limit` — the relation tool's default row ceiling. */
 export const RELATION_TOOL_LIMIT = 1000
 
-/** The default cap on how many `include` path segments deep a `load` / `find` call may traverse — the relation tool's default include-depth ceiling. */
+/** Holds the default cap on how many `include` path segments deep a `load` / `find` call may traverse — the relation tool's default include-depth ceiling. */
 export const RELATION_TOOL_DEPTH = 3
 
 /**
- * The name {@link import('./factories.js').createInferTool} advertises by default — the key a
+ * Holds the name {@link import('./factories.js').createInferTool} advertises by default — the key a
  * model calls and the `ToolManagerInterface` (`@orkestrel/tool`) registers under.
  */
 export const INFER_TOOL_NAME = 'infer'
 
 /**
- * The lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createInferTool}
+ * Holds the lean {@link import('@orkestrel/tool').ToolInterface.summary} {@link import('./factories.js').createInferTool}
  * advertises in place of {@link INFER_TOOL_DESCRIPTION} — a `ToolManagerInterface.definitions()`
  * (`@orkestrel/tool`) advertises `summary ?? description`, so this one-sentence text stands in
  * for the full teaching description; the full text stays retrievable via
@@ -455,7 +455,7 @@ export const INFER_TOOL_NAME = 'infer'
 export const INFER_TOOL_SUMMARY =
 	"Infer a JSON Schema (as advertised tool parameters) from one or more example values. Call describe('infer') for the required fields."
 
-/** The schema-inference protocol {@link import('./factories.js').createInferTool} advertises. */
+/** Holds the schema-inference protocol {@link import('./factories.js').createInferTool} advertises. */
 export const INFER_TOOL_DESCRIPTION = [
 	'Infer a JSON Schema from example values, returned in the same shape a tool advertises its parameters.',
 	'',
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 48cfdc4..e8984a9 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -12,7 +12,7 @@ import type { ToolboxErrorCode } from './types.js'
 // shares it rather than minting one error class per tool.
 
 /**
- * A package-owned tool-call failure: malformed input or unresolved configuration (`TOOL`),
+ * Represents a package-owned tool-call failure: malformed input or unresolved configuration (`TOOL`),
  * delegation depth/cycle rejection (`DEPTH`), prompt failure (`DEADLOCK` / `EXPIRE` / `ANSWER`),
  * or a translated upstream database/relation failure (`DATABASE` / `RELATION`).
  *
@@ -51,10 +51,10 @@ export class ToolboxError extends Error {
 }
 
 /**
- * Type guard narrowing an unknown caught value to an {@link ToolboxError}.
+ * Narrows an unknown caught value to an {@link ToolboxError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is an {@link ToolboxError}
+ * @returns True if `value` is an {@link ToolboxError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index c84d116..67bf883 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,8 +1,10 @@
 export * from './types.js'
 export * from './constants.js'
 export * from './errors.js'
+export * from './validators.js'
 export * from './shapers.js'
 export * from './helpers.js'
+export * from './compilers.js'
 export * from './factories.js'
 export * from './databases/DatabaseResolver.js'
 export * from './stores/MemoryDefinitionStore.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 9b913ef..748314c 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -10,16 +10,20 @@ import type {
 	WorkflowStoreInterface,
 } from '@orkestrel/workflow'
 import type {
+	Condition,
+	ConditionConnector,
 	DatabaseInterface,
 	DriverInterface,
 	IndexMap,
 	KeyFunction,
+	OrderDirection,
 	PrimaryMap,
+	QueryInput,
 } from '@orkestrel/database'
 import type { RelationManagerInterface } from '@orkestrel/relation'
 
-// Toolbox types — one interface per `create*Tool` / `create*Function` factory (AGENTS §5:
-// types are the SOURCE OF TRUTH; implementation conforms to them, never the reverse). The
+// Toolbox types — one interface per `create*Tool` / `create*Function` factory; these types are
+// the SOURCE OF TRUTH and the implementation conforms to them, never the reverse. The
 // workflow-authoring family (WorkflowSteps/WorkflowStep/WorkflowDraft/PhaseDraft/TaskDraft),
 // WorkflowToolResult, and adapter options are OWNED here and consume the current
 // `@orkestrel/workflow` contracts. WorkspaceOperation remains Toolbox's model-facing operation
@@ -34,11 +38,11 @@ import type { RelationManagerInterface } from '@orkestrel/relation'
 // id/name still has `minLength: 1`, so an explicitly-empty `id: ''` is REJECTED, not "absent"),
 // and `completeDraft` synthesizes any MISSING id positionally + defaults a missing name to its
 // id, yielding a strict `WorkflowDefinition` that is THEN re-validated against the strict
-// contract before running (soundness preserved). `run` stays optional (a plain name string),
+// contract before running (soundness preserved). `behavior` stays optional (a plain name string),
 // mirroring the definition family.
 
 /**
- * A draft task — a `TaskDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name`.
+ * Represents a draft task — a `TaskDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name`.
  *
  * @remarks
  * The tool synthesizes a missing `id` positionally and defaults a missing `name` to its `id`
@@ -49,34 +53,34 @@ export interface TaskDraft {
 	readonly id?: string
 	readonly name?: string
 	readonly description?: string
-	/** The behavior reference — a registry key resolved against a workflow's functions registry at construction; omitted ⇒ a deliberate JSON `null` no-op. */
-	readonly run?: string
-	/** Extra attempts after the first on failure (a non-negative integer); persisted with the workflow. */
+	/** Holds the registry key resolved against a workflow's functions registry at construction; omitted ⇒ a deliberate JSON `null` no-op. */
+	readonly behavior?: string
+	/** Holds the extra attempts after the first on failure (a non-negative integer); persisted with the workflow. */
 	readonly retries?: number
-	/** The per-attempt deadline in milliseconds (`0..MAX_TIMER_MS`); persisted with the workflow. */
+	/** Holds the per-attempt deadline in milliseconds (`0..MAX_TIMER_MS`); persisted with the workflow. */
 	readonly timeout?: number
 }
 
-/** A draft phase — a `PhaseDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name` and {@link TaskDraft} tasks. */
+/** Represents a draft phase — a `PhaseDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name` and {@link TaskDraft} tasks. */
 export interface PhaseDraft {
 	readonly id?: string
 	readonly name?: string
 	readonly description?: string
 	readonly tasks: readonly TaskDraft[]
-	/** Max tasks in flight at once (a resource throttle); omitted ⇒ unbounded. */
+	/** Caps the tasks in flight at once (a resource throttle); omitted ⇒ unbounded. */
 	readonly concurrency?: number
-	/** The per-phase failure-policy OVERRIDE; omitted ⇒ inherits the workflow `bail`. */
+	/** Holds the per-phase failure-policy OVERRIDE; omitted ⇒ inherits the workflow `bail`. */
 	readonly bail?: boolean
 }
 
 /**
- * A draft workflow — a `WorkflowDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name`
+ * Represents a draft workflow — a `WorkflowDefinition` (`@orkestrel/workflow`) with OPTIONAL `id` / `name`
  * at all three levels (workflow / phase / task).
  *
  * @remarks
  * The lenient authoring form {@link import('./factories.js').createWorkflowDraftContract}
  * validates and {@link import('./helpers.js').completeDraft} completes into a strict
- * `WorkflowDefinition`. `run` stays optional (a plain name string); the `bail` policy carries
+ * `WorkflowDefinition`. `behavior` stays optional (a plain name string); the `bail` policy carries
  * over.
  */
 export interface WorkflowDraft {
@@ -84,26 +88,26 @@ export interface WorkflowDraft {
 	readonly name?: string
 	readonly description?: string
 	readonly phases: readonly PhaseDraft[]
-	/** Failure policy: `false` (default) continues gracefully, `true` halts on the first failure. */
+	/** Holds the failure policy: `false` (default) continues gracefully, `true` halts on the first failure. */
 	readonly bail?: boolean
 }
 
 // === Flat-steps family (the workflow tool's ADVERTISED authoring surface — the simplest form)
 
 /**
- * One flat step — `{ name }` — the building block of a {@link WorkflowSteps} blob.
+ * Represents one flat step — `{ name }` — the building block of a {@link WorkflowSteps} blob.
  *
  * @remarks
- * `name` is the REGISTERED behavior name the step runs (it becomes the task's `run`, NOT a
+ * `name` is the REGISTERED behavior name the step runs (it becomes the task's `behavior`, NOT a
  * human label) — resolved against a workflow-level functions registry at construction.
  */
 export interface WorkflowStep {
-	/** The registered behavior name this step runs (becomes the task's `run`). */
+	/** Names the registered behavior this step runs (becomes the task's `behavior`). */
 	readonly name: string
 }
 
 /**
- * The FLAT authoring blob {@link import('./factories.js').createWorkflowTool} advertises —
+ * Represents the FLAT authoring blob {@link import('./factories.js').createWorkflowTool} advertises —
  * `{ name?, steps }` — the simplest surface a small model can fill.
  *
  * @remarks
@@ -116,32 +120,32 @@ export interface WorkflowSteps {
 	readonly steps: readonly WorkflowStep[]
 }
 
-/** The JSON-safe run summary returned by {@link import('./factories.js').createWorkflowTool}. */
+/** Represents the JSON-safe run summary returned by {@link import('./factories.js').createWorkflowTool}. */
 export interface WorkflowToolResult {
-	/** The workflow's native terminal status. */
+	/** Holds the run's terminal {@link WorkflowStatus}. */
 	readonly status: WorkflowStatus
-	/** The number of settled task results. */
+	/** Holds the tally of settled task results. */
 	readonly count: number
-	/** Whether the native runner stored its final state; omitted when no store was supplied. */
+	/** Reports whether the native runner stored its final state; omitted when no store was supplied. */
 	readonly durable?: boolean
-	/** The native runner's first persistence failure; omitted when none occurred. */
+	/** Holds the native runner's first persistence failure; omitted when none occurred. */
 	readonly fault?: WorkflowFault
 }
 
-/** One immutable workflow/agent call chain, beginning with a workflow tag. */
+/** Represents one immutable workflow/agent call chain, beginning with a workflow tag. */
 export type WorkflowLineage = readonly string[]
 
-/** Raw live agents keyed by the workflow function names that invoke them. */
+/** Represents raw live agents keyed by the workflow function names that invoke them. */
 export type WorkflowAgents = Readonly<Record<string, AgentInterface>>
 
-/** A contextual agent adapter carrying immutable metadata for Toolbox composition. */
+/** Represents a contextual agent adapter carrying immutable metadata for Toolbox composition. */
 export type AgentFunction = WorkflowFunction & {
 	readonly category: 'agent'
 	readonly lineage: WorkflowLineage
 }
 
 /**
- * Options for {@link import('./factories.js').createAgentFunction} — the OPT-IN adapter that
+ * Represents the options for {@link import('./factories.js').createAgentFunction} — the OPT-IN adapter that
  * wraps a live `AgentInterface` (`@orkestrel/agent`) as an {@link AgentFunction} with immutable
  * lineage metadata and optional nested-workflow composition.
  *
@@ -166,7 +170,7 @@ export interface AgentFunctionOptions {
 }
 
 /**
- * Options for {@link import('./factories.js').createWorkflowTool} and
+ * Represents the options for {@link import('./factories.js').createWorkflowTool} and
  * {@link import('./factories.js').createWorkflowFunctions} — lineage-aware composition of opaque
  * leaves, raw agents, and native workflow persistence.
  *
@@ -185,7 +189,7 @@ export interface WorkflowToolOptions {
 }
 
 /**
- * Options for {@link import('./factories.js').createWorkspaceTool} — EITHER a caller-built
+ * Represents the options for {@link import('./factories.js').createWorkspaceTool} — EITHER a caller-built
  * {@link WorkspaceManagerInterface} to drive directly, OR a {@link WorkspaceStoreInterface} the
  * tool constructs a fresh manager over; neither given constructs a manager over
  * `@orkestrel/workspace`'s in-memory store.
@@ -211,10 +215,10 @@ export interface WorkspaceToolOptions {
 // === Workspace operation union
 
 /**
- * One operation an agent invokes through {@link import('./factories.js').createWorkspaceTool} — a
- * FLAT, descriptive tagged union over the 13 workspace edit / read / navigation actions,
- * discriminated by the `operation` literal (AGENTS §4.8: a discriminant is named for its axis —
- * the action being performed — NEVER `kind`).
+ * Represents one operation an agent invokes through {@link import('./factories.js').createWorkspaceTool} — a
+ * FLAT, descriptive tagged union over the workspace edit, read, and navigation actions,
+ * discriminated by the `operation` literal (a discriminant is named for its axis — the action
+ * being performed — NEVER `kind`).
  *
  * @remarks
  * This is the SOURCE OF TRUTH the tool contract is typed to
@@ -230,14 +234,14 @@ export interface WorkspaceToolOptions {
  * the edit / read arms target.
  */
 export type WorkspaceOperation =
-	/** Read a whole text file's text by `path` from the ACTIVE workspace (a binary / absent path — or no active workspace — yields no content). */
+	/** Reads a whole text file's text by `path` from the ACTIVE workspace (a binary / absent path — or no active workspace — yields no content). */
 	| { readonly operation: 'read'; readonly path: string }
-	/** List every file in the ACTIVE workspace (path / state / size / lines / kind summaries); `[]` when no workspace is active. */
+	/** Lists every file in the ACTIVE workspace (path / state / size / lines / kind summaries); `[]` when no workspace is active. */
 	| { readonly operation: 'list' }
-	/** Whether a file exists at `path` in the ACTIVE workspace (`false` when no workspace is active). */
+	/** Reports whether a file exists at `path` in the ACTIVE workspace (`false` when no workspace is active). */
 	| { readonly operation: 'has'; readonly path: string }
 	/**
-	 * Scan every text file for `query`, returning each hit (path + 1-based line / column + the line).
+	 * Scans every text file for `query`, returning each hit (path + 1-based line / column + the line).
 	 *
 	 * @remarks
 	 * `regex` treats `query` as a regular-expression source (default `false` — a literal substring);
@@ -251,7 +255,7 @@ export type WorkspaceOperation =
 			readonly limit?: number
 	  }
 	/**
-	 * Replace `query` with `replacement` across every text file, returning the tally.
+	 * Replaces `query` with `replacement` across every text file, returning the tally.
 	 *
 	 * @remarks
 	 * Same matching axes as `search`: `regex` (default `false`), `sensitive` (default `true`),
@@ -265,10 +269,10 @@ export type WorkspaceOperation =
 			readonly sensitive?: boolean
 			readonly limit?: number
 	  }
-	/** Write (create or overwrite) the whole file at `path` with `content`. */
+	/** Writes (creates or overwrites) the whole file at `path` with `content`. */
 	| { readonly operation: 'write'; readonly path: string; readonly content: string }
 	/**
-	 * Splice `content` into an existing text file, replacing the 1-based range
+	 * Splices `content` into an existing text file, replacing the 1-based range
 	 * `(fromLine, fromColumn)` (INCLUSIVE) → `(toLine, toColumn)` (EXCLUSIVE).
 	 *
 	 * @remarks
@@ -286,21 +290,21 @@ export type WorkspaceOperation =
 			readonly toLine: number
 			readonly toColumn: number
 	  }
-	/** Prepend `content` to the start of the file at `path` (creating it when absent). */
+	/** Prepends `content` to the start of the file at `path` (creating it when absent). */
 	| { readonly operation: 'prepend'; readonly path: string; readonly content: string }
-	/** Append `content` to the end of the file at `path` (creating it when absent). */
+	/** Appends `content` to the end of the file at `path` (creating it when absent). */
 	| { readonly operation: 'append'; readonly path: string; readonly content: string }
-	/** Re-key the file `from` → `to` (overwriting an occupied target). */
+	/** Re-keys the file `from` → `to` (overwriting an occupied target). */
 	| { readonly operation: 'move'; readonly from: string; readonly to: string }
-	/** Remove the file at `path` from the workspace. */
+	/** Removes the file at `path` from the workspace. */
 	| { readonly operation: 'remove'; readonly path: string }
-	/** List the workspaces the model can move between — each `{ id, files, active }` — so it can choose an `id` to `switch` to. */
+	/** Lists the workspaces the model can move between — each `{ id, files, active }` — so it can choose an `id` to `switch` to. */
 	| { readonly operation: 'workspaces' }
-	/** Re-point the manager's ACTIVE workspace to the one with `id` (an unknown `id` is a lenient no-op). The edit / read arms target the active workspace from then on. */
+	/** Re-points the manager's ACTIVE workspace to the one with `id` (an unknown `id` is a lenient no-op). The edit / read arms target the active workspace from then on. */
 	| { readonly operation: 'switch'; readonly id: string }
 
 /**
- * Options for {@link import('./factories.js').createAgentTool} — the sub-agent delegation
+ * Represents the options for {@link import('./factories.js').createAgentTool} — the sub-agent delegation
  * defaults, the nesting-depth / cycle guard bookkeeping, and the advertised tool overrides.
  *
  * @remarks
@@ -343,7 +347,7 @@ export interface AgentToolOptions {
 }
 
 /**
- * The FLAT args {@link import('./factories.js').createAgentTool} accepts — a delegated `task`
+ * Represents the FLAT args {@link import('./factories.js').createAgentTool} accepts — a delegated `task`
  * plus the minimal optional `AgentJobInput` (`@orkestrel/agent`) fields a caller may override
  * per-call.
  *
@@ -360,9 +364,8 @@ export interface AgentToolArguments {
 }
 
 /**
- * The seven-value machine-readable code a thrown
- * {@link import('./errors.js').ToolboxError} carries (AGENTS §14: a thrown, typed,
- * code-bearing error, never a `{ error }` return).
+ * Represents the machine-readable code a thrown {@link import('./errors.js').ToolboxError} carries — a
+ * thrown, typed, code-bearing error, never a `{ error }` return.
  *
  * @remarks
  * `TOOL` — malformed calls and package-owned resolution or configuration failures, including
@@ -392,7 +395,7 @@ export type ToolboxErrorCode =
 	| 'RELATION'
 
 /**
- * The FLAT args {@link import('./factories.js').createDescribeTool} accepts — the registered
+ * Represents the FLAT args {@link import('./factories.js').createDescribeTool} accepts — the registered
  * tool `name` whose full `description` a model wants back.
  *
  * @remarks
@@ -404,7 +407,7 @@ export interface DescribeToolArguments {
 }
 
 /**
- * Options for {@link import('./factories.js').createPromptTool} — the live
+ * Represents the options for {@link import('./factories.js').createPromptTool} — the live
  * {@link TerminalManagerInterface} (`@orkestrel/terminal`) to `ask` through, the terminal name
  * `from`, and the advertised tool overrides.
  *
@@ -426,7 +429,7 @@ export interface PromptToolOptions {
 }
 
 /**
- * Options for {@link import('./factories.js').createAnswerTool} — the live
+ * Represents the options for {@link import('./factories.js').createAnswerTool} — the live
  * {@link TerminalManagerInterface} (`@orkestrel/terminal`) to list / answer prompts through, the
  * terminal name `to`, and the advertised tool overrides.
  *
@@ -446,20 +449,20 @@ export interface AnswerToolOptions {
 	readonly description?: string
 }
 
-// === Database definition (config-only, for the upcoming database / relation tools)
+// === Database definition (config-only)
 
-/** One column's declared type — a primitive shorthand, or `integer` for a whole-number `number`. */
+/** Represents one column's declared type — a primitive shorthand, or `integer` for a whole-number `number`. */
 export type ColumnKind = 'string' | 'integer' | 'number' | 'boolean'
 
 /**
- * One table column's spec — either a bare {@link ColumnKind} shorthand, or `{ type, optional }`
+ * Represents one table column's spec — either a bare {@link ColumnKind} shorthand, or `{ type, optional }`
  * when the column may be absent from a row.
  */
 export type ColumnSpec = ColumnKind | Readonly<{ type: ColumnKind; optional?: boolean }>
 
 /**
- * A database's table layout — one entry per table, each a flat map of column name to
- * {@link ColumnSpec}. The small-model-facing DSL {@link import('./helpers.js').expandTables}
+ * Represents a database's table layout — one entry per table, each a flat map of column name to
+ * {@link ColumnSpec}. The small-model-facing DSL {@link import('./compilers.js').expandTables}
  * compiles into an `@orkestrel/database` `TableMap`.
  */
 export type TableSpec = Readonly<
@@ -467,13 +470,13 @@ export type TableSpec = Readonly<
 >
 
 /**
- * One database's CONFIG-ONLY definition — `id` + `driver` + {@link TableSpec}, with optional
+ * Represents one database's CONFIG-ONLY definition — `id` + `driver` + {@link TableSpec}, with optional
  * `primary`, `indexes`, and `version` schema configuration.
  *
  * @remarks
  * A `DatabaseDefinition` is NEVER a live handle — it is the durable, serializable config a
  * {@link DefinitionStoreInterface} persists and a tool factory turns into a real
- * `@orkestrel/database` `DatabaseInterface` (via `createDatabase` + {@link import('./helpers.js').expandTables})
+ * `@orkestrel/database` `DatabaseInterface` (via `createDatabase` + {@link import('./compilers.js').expandTables})
  * on demand. `primary` maps table names to primary-key columns; `indexes` maps table names to
  * index column groups; `version` opts a capable driver into open-time schema reconciliation.
  */
@@ -486,14 +489,14 @@ export interface DatabaseDefinition {
 	readonly version?: number
 }
 
-/** One opaque persisted row — the shape a `TableInterface<DatabaseDefinitionRow>`-backed store reads/writes; `definition` is narrowed with {@link import('./helpers.js').isDatabaseDefinition} on read. */
+/** Represents one opaque persisted row — the shape a `TableInterface<DatabaseDefinitionRow>`-backed store reads/writes; `definition` is narrowed with {@link import('./validators.js').isDatabaseDefinition} on read. */
 export interface DatabaseDefinitionRow {
 	readonly id: string
 	readonly definition: unknown
 }
 
 /**
- * The point-access persistence seam (AGENTS §5 — Stores) for {@link DatabaseDefinition} configs —
+ * Represents the point-access persistence seam for {@link DatabaseDefinition} configs —
  * the twin of `@orkestrel/terminal`'s `TerminalStoreInterface`, storing a database's CONFIG-ONLY
  * blueprint (never a live handle). Every primitive is async; `delete` of an absent id is a no-op.
  */
@@ -504,13 +507,50 @@ export interface DefinitionStoreInterface {
 }
 
 /**
- * Options for {@link import('./factories.js').createDatabaseTool} — SRC-2 of the 3-unit database
- * / relation spine, built over the SRC-1 foundation ({@link DatabaseDefinition},
- * {@link DefinitionStoreInterface}, {@link import('./helpers.js').expandTables}).
+ * Represents the SERIALIZED wire query a database-tool call carries — the parsed form of
+ * {@link import('./shapers.js').queryShape}, which
+ * {@link import('./helpers.js').normalizeQuery} normalizes into a live `@orkestrel/database`
+ * {@link QueryInput}.
+ *
+ * @remarks
+ * Every condition is FLAT and its `values` is ALWAYS an array, even for a single-value operator.
+ * `connector` is optional because the LAST condition joins nothing forward; `normalizeQuery` defaults an
+ * omitted one to `'and'`. `order` / `limit` / `offset` carry over to the live query unchanged.
+ */
+export interface DatabaseQueryInput {
+	readonly conditions?: ReadonlyArray<
+		Readonly<{
+			column: string
+			operator: Condition['operator']
+			values: readonly unknown[]
+			connector?: ConditionConnector
+		}>
+	>
+	readonly order?: ReadonlyArray<Readonly<{ column: string; direction: OrderDirection }>>
+	readonly limit?: number
+	readonly offset?: number
+}
+
+/**
+ * Represents the PROBE query and effective row limit {@link import('./helpers.js').clampQuery} returns.
+ *
+ * @remarks
+ * `limit` is the effective ceiling — `min(query?.limit ?? cap, cap)`, floored at `0`. `query`
+ * requests one row MORE than that, so a caller detects truncation from the returned row count
+ * without a separate `count` round trip.
+ */
+export interface ClampedQuery {
+	readonly query: QueryInput
+	readonly limit: number
+}
+
+/**
+ * Represents the options for {@link import('./factories.js').createDatabaseTool} — the live handles, definition
+ * store, driver registry, key generator, row cap, timeout, and readonly gate the tool composes.
  *
  * @remarks
  * - `databases` — live `DatabaseInterface` handles to seed the tool's cache with (e.g. a
- *   caller-constructed database it should manage alongside store-backed ones); keyed by the id a
+ *   caller-constructed database it manages alongside store-backed ones); keyed by the id a
  *   call's `id` field addresses.
  * - `store` — the {@link DefinitionStoreInterface} the `'create'` operation persists its
  *   {@link DatabaseDefinition} CONFIG through, and `'destroy'` deletes from; also the source
@@ -549,8 +589,7 @@ export interface DatabaseToolOptions {
 }
 
 /**
- * Options for {@link import('./factories.js').createRelationTool} — SRC-3 (the final unit) of
- * the 3-unit database / relation spine.
+ * Represents the options for {@link import('./factories.js').createRelationTool}.
  *
  * @remarks
  * - `managers` — the live `RelationManagerInterface` (`@orkestrel/relation`) registry a call's
@@ -589,7 +628,7 @@ export interface RelationToolOptions {
 // Contract invariant in `tool.md`.
 
 /**
- * Options for {@link import('./factories.js').createInferTool} — advertised name/description
+ * Represents the options for {@link import('./factories.js').createInferTool} — advertised name/description
  * overrides only; `format` / `enum` are RUNTIME call arguments (see
  * {@link import('./shapers.js').inferToolShape}), not construction-time options, since a model
  * chooses them per call.
@@ -600,7 +639,7 @@ export interface InferToolOptions {
 }
 
 /**
- * The handler {@link import('./types.js').EndpointDefinition.invoke} implements — mirrors
+ * Represents the handler {@link import('./types.js').EndpointDefinition.invoke} implements — mirrors
  * `@orkestrel/tool`'s `ToolOptions.execute` signature EXACTLY (same `Readonly<Record<string,
  * unknown>>` argument, same `Promise<unknown> | unknown` return) so
  * `execute: (args) => definition.invoke(args)` typechecks with zero assertions in
@@ -611,7 +650,7 @@ export type EndpointHandler = (
 ) => Promise<unknown> | unknown
 
 /**
- * One concrete endpoint {@link import('./factories.js').createEndpointTool} wraps as an
+ * Represents one concrete endpoint {@link import('./factories.js').createEndpointTool} wraps as an
  * LLM-callable `ToolInterface` — the advertised identity, a non-empty set of example values its
  * `parameters` are inferred from, and the local handler that runs a call.
  *
@@ -639,7 +678,7 @@ export interface EndpointDefinition {
 }
 
 /**
- * Construction-time tuning for {@link import('./factories.js').createEndpointTool} — the
+ * Represents the construction-time tuning for {@link import('./factories.js').createEndpointTool} — the
  * inferred `parameters` schema's `format` / `enum` constraints, and whether that same schema is
  * ENFORCED at `execute` time.
  *
diff --git a/src/server/constants.ts b/src/server/constants.ts
index bf7f12f..8bad347 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,14 +1,14 @@
 // Server-package constants — UPPER_SNAKE, `Object.freeze`d where structural, every member
-// exported (AGENTS §5).
+// exported.
 
 /**
- * The default `:name`-templated path {@link import('./factories.js').createTerminalRoutes}
+ * Holds the default `:name`-templated path {@link import('./factories.js').createTerminalRoutes}
  * mounts its GET (SSE) + POST (answer) routes under.
  */
 export const TERMINAL_ROUTES_PATH = '/terminals/:name'
 
 /**
- * The default SSE keepalive interval (in milliseconds)
+ * Holds the default SSE keepalive interval (in milliseconds)
  * {@link import('./factories.js').createTerminalRoutes} arms per open connection — a `: `
  * comment ping a conforming SSE parser ignores, keeping intermediary proxies from timing out an
  * otherwise-idle stream.
diff --git a/src/server/index.ts b/src/server/index.ts
index ba9ea54..716cb1f 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -1,4 +1,4 @@
 export * from './types.js'
 export * from './constants.js'
 export * from './factories.js'
-export * from './routes/TerminalRoutes.js'
+export * from './terminals/TerminalBridge.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index 8cd523b..9a14fbd 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -2,13 +2,13 @@ import type { TimerHandler } from '@orkestrel/terminal'
 
 // Server-package types — the structural route contract this barrel returns, kept LOCAL (never
 // imports `@orkestrel/router`) so a consumer mounts the two returned routes against ANY router
-// that accepts this shape (AGENTS §5: types are the source of truth).
+// that accepts this shape; these types are the source of truth.
 
-/** The HTTP method literal a {@link TerminalRoute} declares — the exact 7-literal union `@orkestrel/router`'s `Method` accepts. */
-export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
+/** Represents the HTTP method literal a {@link TerminalRoute} declares — the same union `@orkestrel/router`'s `Method` type accepts. */
+export type TerminalRouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
 
 /**
- * The minimal route-dispatch context a {@link TerminalRoute} handler reads — exactly the frozen,
+ * Represents the minimal route-dispatch context a {@link TerminalRoute} handler reads — exactly the frozen,
  * URL-decoded `:name` path param slice a router hands a matched handler.
  */
 export interface TerminalRouteContext {
@@ -16,13 +16,13 @@ export interface TerminalRouteContext {
 }
 
 /**
- * One structural route record {@link import('./factories.js').createTerminalRoutes} returns — a
+ * Represents one structural route record {@link import('./factories.js').createTerminalRoutes} returns — a
  * plain `{ method, path, handler }` shape carrying NO dependency on `@orkestrel/router`'s own
  * `Route` type, so a consumer mounts it against any router that accepts a two-arg
  * `(request, context) => Response | Promise<Response>` handler keyed by `method` + `path`.
  */
 export interface TerminalRoute {
-	readonly method: Method
+	readonly method: TerminalRouteMethod
 	readonly path: string
 	readonly handler: (
 		request: Request,
@@ -31,7 +31,7 @@ export interface TerminalRoute {
 }
 
 /**
- * The `token` gate a {@link TerminalRoutesOptions} may configure — a plain string compared for
+ * Represents the `token` gate {@link TerminalBridgeOptions} may configure — a plain string compared for
  * equality against the `x-orkestrel-token` header, OR a validator function the consumer fully
  * controls, enabling expiry/rotation (a JWT `exp` check, a revocation-list lookup, anything
  * time-varying) that a fixed string cannot express. `undefined` disables the auth check entirely.
@@ -39,7 +39,8 @@ export interface TerminalRoute {
 export type TerminalToken = string | ((value: string | undefined) => boolean)
 
 /**
- * Options for {@link import('./factories.js').createTerminalRoutes}.
+ * Represents the options for a {@link import('./terminals/TerminalBridge.js').TerminalBridge} and for the
+ * {@link import('./factories.js').createTerminalRoutes} factory that projects its routes.
  *
  * @remarks
  * - `path` — the shared `:name`-templated path both the GET (SSE) and POST (answer) routes
@@ -63,7 +64,7 @@ export type TerminalToken = string | ((value: string | undefined) => boolean)
  *   a body exceeding it is rejected `413` and `manager.answer` is never called. Defaults to
  *   `@orkestrel/server`'s own `DEFAULT_BODY_LIMIT` (1 MiB).
  */
-export interface TerminalRoutesOptions {
+export interface TerminalBridgeOptions {
 	readonly path?: string
 	readonly token?: TerminalToken
 	readonly keepalive?: number
```
