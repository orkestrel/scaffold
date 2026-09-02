# Last changes: tool

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `04c0395`, merge base with `origin/main` `043d6d4`, layer L1, declared version 0.0.12, registry version 0.0.12.

## Commits since origin/main

```text
fe76d29 2026-08-28 Update every dependency to the published latest
4b868f0 2026-08-28 Adopt the catalog and guide mirrors for the wave
404bd27 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
c266d02 2026-09-01 Apply the verified src-audit fixes
1ba9528 2026-09-01 Adopt the renamed guide helpers in the parity test
04c0395 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md              | 17 ++++++++--------
 package.json                             |  6 +++---
 src/core/factories.ts                    |  4 ++--
 src/core/helpers.ts                      | 37 ++++++++++++++++++++++++++++++++++
 src/core/index.ts                        |  1 +
 src/core/tools/Tool.ts                   |  2 +-
 src/core/tools/ToolManager.ts            | 23 +++++----------------
 src/core/types.ts                        | 78 ++++++++++++++++++++++++++++++++++++------------------------------------
 src/core/validators.ts                   |  4 ++--
 tests/guides.test.ts                     | 22 ++++++++++-----------
 tests/src/core/helpers.test.ts           | 59 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 tests/src/core/tools/ToolManager.test.ts | 12 ++++++-----
 12 files changed, 176 insertions(+), 89 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/index.ts b/src/core/index.ts
index 7994657..d0f3e07 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,4 +1,5 @@
 export * from './types.js'
+export * from './helpers.js'
 export * from './validators.js'
 export * from './factories.js'
 export * from './tools/Tool.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index a2c2bb7..0291967 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,22 +1,22 @@
 import type { Failure, Success } from '@orkestrel/contract'
 
 /**
- * A tool definition advertised to a caller.
+ * Describes a tool as advertised to a caller.
  *
  * @remarks
  * `parameters` is an open JSON Schema record describing the arguments the tool accepts.
  */
 export interface ToolDefinition {
-	/** The name a caller uses to select the tool. */
+	/** Identifies the tool a caller selects. */
 	readonly name: string
-	/** A description of the tool's behavior. */
+	/** Describes the tool's behavior. */
 	readonly description?: string
-	/** The JSON Schema for the tool's arguments. */
+	/** Holds the JSON Schema for the tool's arguments. */
 	readonly parameters?: Readonly<Record<string, unknown>>
 }
 
 /**
- * A tool call issued by a caller.
+ * Describes a call issued by a caller.
  *
  * @remarks
  * `id` correlates the call with its later {@link ToolResult}. `arguments` is the
@@ -25,32 +25,32 @@ export interface ToolDefinition {
  * every trust decision.
  */
 export interface ToolCall {
-	/** The identifier that correlates this call with its result. */
+	/** Correlates this call with its result. */
 	readonly id: string
-	/** The name of the tool to execute. */
+	/** Selects the tool to execute. */
 	readonly name: string
-	/** The caller-supplied arguments record. */
+	/** Carries the record the caller supplied. */
 	readonly arguments: Readonly<Record<string, unknown>>
-	/** Consumer-asserted caller context, forwarded without verification. */
+	/** Carries consumer-asserted context, forwarded without verification. */
 	readonly caller?: unknown
 }
 
 /**
- * The successful outcome of executing a {@link ToolCall}.
+ * Reports the successful outcome of executing a {@link ToolCall}.
  *
  * @remarks
  * `value` is whatever the handler returned — including `undefined`, `null`, `0`,
  * `''`, or `false`. A present value never implies a meaningful one.
  */
 export interface ToolSuccess extends Success<unknown> {
-	/** The identifier of the corresponding call. */
+	/** Identifies the corresponding call. */
 	readonly id: string
-	/** The name of the called tool. */
+	/** Identifies the called tool. */
 	readonly name: string
 }
 
 /**
- * The failed outcome of executing a {@link ToolCall}.
+ * Reports the failed outcome of executing a {@link ToolCall}.
  *
  * @remarks
  * `error` is the failure message: an unknown tool name, an `Error`'s message, or
@@ -59,14 +59,14 @@ export interface ToolSuccess extends Success<unknown> {
  * `tool.execute(args)` in its own `try`/`catch`.
  */
 export interface ToolFailure extends Failure<string> {
-	/** The identifier of the corresponding call. */
+	/** Identifies the corresponding call. */
 	readonly id: string
-	/** The name of the called tool. */
+	/** Identifies the called tool. */
 	readonly name: string
 }
 
 /**
- * The outcome of executing a {@link ToolCall}.
+ * Represents the outcome of executing a {@link ToolCall}.
  *
  * @remarks
  * Always a result and never a throw. Narrow on `success`.
@@ -74,17 +74,17 @@ export interface ToolFailure extends Failure<string> {
 export type ToolResult = ToolSuccess | ToolFailure
 
 /**
- * An executable tool: its advertised definition plus its local handler.
+ * Represents an executable tool: its advertised definition plus its local handler.
  *
  * @remarks
  * `summary`, when present, is advertised in place of the full `description` by a
  * {@link ToolManagerInterface}. The full description remains available on the tool.
  */
 export interface ToolInterface extends ToolDefinition {
-	/** A concise description to advertise in place of the full description. */
+	/** Holds a concise description to advertise in place of the full description. */
 	readonly summary?: string
 	/**
-	 * Execute the tool.
+	 * Runs the tool's handler.
 	 *
 	 * @param args - The caller-supplied arguments record
 	 * @param caller - Optional consumer-asserted caller context, forwarded without verification
@@ -94,7 +94,7 @@ export interface ToolInterface extends ToolDefinition {
 }
 
 /**
- * Options for creating an executable tool.
+ * Configures an executable tool.
  *
  * @remarks
  * `name` identifies the tool, `description` and `parameters` define what is advertised
@@ -103,15 +103,15 @@ export interface ToolInterface extends ToolDefinition {
  * context. This package forwards that context without verification.
  */
 export interface ToolOptions {
-	/** The name a caller uses to select the tool. */
+	/** Identifies the tool a caller selects. */
 	readonly name: string
-	/** The full description of the tool's behavior. */
+	/** Describes the tool's behavior in full. */
 	readonly description?: string
-	/** A concise description to advertise in place of the full description. */
+	/** Holds a concise description to advertise in place of the full description. */
 	readonly summary?: string
-	/** The JSON Schema for the tool's arguments. */
+	/** Holds the JSON Schema for the tool's arguments. */
 	readonly parameters?: Readonly<Record<string, unknown>>
-	/** The handler that receives arguments and optional unverified caller context. */
+	/** Handles the arguments and optional unverified caller context. */
 	readonly execute: (
 		args: Readonly<Record<string, unknown>>,
 		caller?: unknown,
@@ -119,7 +119,7 @@ export interface ToolOptions {
 }
 
 /**
- * A registry of executable tools with per-call error isolation.
+ * Represents a registry of executable tools with per-call error isolation.
  *
  * @remarks
  * Tools are keyed by name in insertion order. Adding an existing name overwrites its
@@ -128,37 +128,37 @@ export interface ToolOptions {
  * input order and isolates each call.
  */
 export interface ToolManagerInterface {
-	/** The number of registered tools. */
+	/** Reports how many tools are registered. */
 	readonly count: number
 	/**
-	 * Register one tool.
+	 * Registers one tool.
 	 *
 	 * @param tool - The tool to register
 	 * @returns Nothing
 	 */
 	add(tool: ToolInterface): void
 	/**
-	 * Register a batch of tools.
+	 * Registers a batch of tools.
 	 *
 	 * @param tools - The tools to register
 	 * @returns Nothing
 	 */
 	add(tools: readonly ToolInterface[]): void
 	/**
-	 * Find one registered tool by name.
+	 * Finds one registered tool by name.
 	 *
 	 * @param name - The registered tool name
 	 * @returns The tool when found, otherwise `undefined`
 	 */
 	tool(name: string): ToolInterface | undefined
 	/**
-	 * List the registered tools in insertion order.
+	 * Lists the registered tools in insertion order.
 	 *
 	 * @returns A new readonly array of registered tools
 	 */
 	tools(): readonly ToolInterface[]
 	/**
-	 * List the definitions advertised to a caller.
+	 * Lists the definitions advertised to a caller.
 	 *
 	 * The projected `description` is the tool's `summary` when one was authored,
 	 * advertised in place of the full description. The full text stays on the tool
@@ -168,35 +168,35 @@ export interface ToolManagerInterface {
 	 */
 	definitions(): readonly ToolDefinition[]
 	/**
-	 * Execute one call with error isolation.
+	 * Executes one call with error isolation.
 	 *
 	 * @param call - The tool call to execute, including optional caller context
 	 * @returns The correlated result
 	 */
 	execute(call: ToolCall): Promise<ToolResult>
 	/**
-	 * Execute a batch of calls with per-call error isolation.
+	 * Executes a batch of calls with per-call error isolation.
 	 *
 	 * @param calls - The tool calls to execute, including optional caller context
 	 * @returns The correlated results in input order
 	 */
 	execute(calls: readonly ToolCall[]): Promise<readonly ToolResult[]>
 	/**
-	 * Remove one registered tool.
+	 * Removes one registered tool.
 	 *
 	 * @param name - The tool name to remove
-	 * @returns Whether the tool was present
+	 * @returns True if the tool was present; false otherwise
 	 */
 	remove(name: string): boolean
 	/**
-	 * Remove a batch of registered tools.
+	 * Removes a batch of registered tools.
 	 *
 	 * @param names - The tool names to remove
-	 * @returns Whether any named tool was present
+	 * @returns True if every named tool was present; false otherwise
 	 */
 	remove(names: readonly string[]): boolean
 	/**
-	 * Remove every registered tool.
+	 * Removes every registered tool.
 	 *
 	 * @returns Nothing
 	 */
```
