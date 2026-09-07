# Report — `d7n-tool-prep`

Wall clock: 2026-09-07T15:19:05Z (first command) to 2026-09-07T15:21:17Z (last command).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})

 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
@@
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change to the suite. The `group.methods.length` assertion and the import-walk
`findMissing` calls (`statement.names` against `face.surface().map((symbol) => symbol.name)`,
`names` against `surface`) were already string-typed and stayed untouched.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named one diagnostic:

```text
tests/setup.ts:6:1: error policy(no-malformed-summary): Open this description with a
third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

Fix (`tests/setup.ts`):

```diff
 /**
- * Create a tool call for runtime tests.
+ * Creates a tool call for runtime tests.
  *
  * @param name - The tool name
  * @param args - The model-supplied arguments record
```

A re-run of `npx oxlint --config .oxlintrc.json --deny-warnings .` after the fix printed nothing
(exit 0). `npm run test:policy`'s `prose` rule named no line in `guides/**` or `README.md`
(90 passed | 1 skipped, unchanged from before and after the fix), so no substitution-table edit
applied there.

`npm run format` was run once after these edits to converge before `format:check`; it rewrote no
line beyond the two edits already made (`Finished in 4371ms on 42 files using 4 threads`).

## Item 4 — the bump

```diff
 	"name": "@orkestrel/tool",
-	"version": "0.0.13",
+	"version": "0.0.14",
```

`package-lock.json` was not touched.

## Acceptance criteria

### 1. `git status --short`

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3, the
`no-malformed-summary` diagnostic at `tests/setup.ts:6:1`), and nothing else.

### 2. Gates

```text
$ npm run format:check
All matched files use the correct format.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT 0
```

### 3. Tests

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  27 passed (27)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

### 4. `npm run docs` — expected non-zero `rows read`, exit 1

```text
guides/tool.md interface ToolDefinition: guide absent source "Describes a tool as advertised to a caller."
guides/tool.md interface ToolCall: guide absent source "Describes a call issued by a caller."
guides/tool.md interface ToolSuccess: guide absent source "Reports the successful outcome of executing a `ToolCall`."
guides/tool.md interface ToolFailure: guide absent source "Reports the failed outcome of executing a `ToolCall`."
guides/tool.md interface ToolOptions: guide absent source "Configures an executable tool."
guides/tool.md interface ToolInterface: guide absent source "Represents an executable tool: its advertised definition plus its local handler."
guides/tool.md interface ToolManagerInterface: guide absent source "Represents a registry of executable tools with per-call error isolation."
guides/tool.md type ToolResult: guide absent source "Represents the outcome of executing a `ToolCall`."
guides/tool.md function isToolCall: guide absent source "Determines whether an unknown value is structurally a `ToolCall`."
guides/tool.md function toolToDefinition: guide absent source "Projects a tool onto the plain definition advertised to a caller."
guides/tool.md function createTool: guide absent source "Creates an executable tool."
guides/tool.md function createToolManager: guide absent source "Creates an empty tool registry."
guides/tool.md class Tool: guide absent source "Binds an executable tool definition to a handler."
guides/tool.md class ToolManager: guide absent source "Represents an insertion-ordered tool registry with per-call error isolation."
guides/tool.md ToolInterface.execute: guide absent source "Runs the tool's handler."
guides/tool.md ToolManagerInterface.add: guide absent source "Registers one tool."
guides/tool.md ToolManagerInterface.tool: guide absent source "Finds one registered tool by name."
guides/tool.md ToolManagerInterface.tools: guide absent source "Lists the registered tools in insertion order."
guides/tool.md ToolManagerInterface.definitions: guide absent source "Lists the definitions advertised to a caller. The projected `description` is the tool's `summary` when one was authored, advertised in place of the full description. The full text stays on the tool for direct lookup."
guides/tool.md ToolManagerInterface.execute: guide absent source "Executes one call with error isolation."
guides/tool.md ToolManagerInterface.remove: guide absent source "Removes one registered tool."
guides/tool.md ToolManagerInterface.clear: guide absent source "Removes every registered tool."
guides/tool.md pitch: readme absent tagline "The tool runtime for the `@orkestrel` line. A tool is a callable function described by a JSON Schema — a `name`, an optional description, an optional parameter schema, and the handler that runs it. That is the whole idea: a tool is an API call whose shape is data, so whoever calls it can discover it, present it, and invoke it without knowing anything about the code behind it. `Tool` binds the advertised definition to its handler; `ToolManager` keeps tools by name in insertion order, advertises their definitions, and executes calls with per-call error isolation; `ToolCall` and `ToolResult` are the correlated pair that travels between a caller and the registry. Source: `src/core`. Published through `@orkestrel/tool`. Anyone can call a tool. Nothing here is model-specific — `tools.execute(call)` is an ordinary async call returning an ordinary result, and plain application code may drive it directly. The shape exists because callers that work from descriptions need the description and the handler to travel together: an agent loop choosing which function to invoke, an MCP bridge exposing local capability to a remote client, a backend dispatching a named operation. `@orkestrel/agent` and `@orkestrel/mcp` are two such callers; ready-made tools ship in `@orkestrel/toolbox`. Mechanism only. This runtime advertises, dispatches, and contains failure. It transports nothing, validates no arguments against a tool's schema, authorizes no call, and ships no concrete tools. Optional caller context is consumer-asserted and forwarded without verification. Each trust decision belongs to the invoking consumer, to a policy layer, or to the tool itself. Progress reporting belongs there too: it is a property of the invoking consumer's execution context, one layer up — the @orkestrel/mcp package's execution context carries a progress reporter — never of the tool contract itself."
rows read: 1, disagreements found: 23
EXIT 1
```

This matches the P21 worklist exactly and is the converge unit's exit criterion, not this unit's.

## Deviations

None. `repair` wrote exactly the P21 list, every before-text in item 2 was found verbatim, the one
voice diagnostic named `tests/setup.ts` (in scope, not off-limits), `test:policy` stayed green
throughout with no `prose` finding in `guides/**` or `README.md`, and every gate other than `docs`
reads green.
