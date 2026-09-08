# Report — `d7n-tool-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

`guides/tool.md` § Contracts: replaced the off-canon convention sentence with Ruling 15's canonical
sentence plus Ruling 21's extended-interface clause, and rewrote every row that flattened a parent
interface's members or spelled a member's type. `ToolManagerInterface` moved its call-signature
members after `plus`.

```diff
--- a/guides/tool.md
+++ b/guides/tool.md
@@ -39,18 +39,20 @@ Source: [`src/core`](../src/core). Published through `@orkestrel/tool`.
 
 The data shapes, from [`types.ts`](../src/core/types.ts). Every property is readonly, and an
 optional field the caller did not supply is absent from the value. A `Shape` cell holds an
-interface's members in braces, and a type alias's value.
-
-| Name                   | Kind      | Shape                                                              | Summary                                                                          |
-| ---------------------- | --------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
-| `ToolDefinition`       | interface | `{ name, description?, parameters? }`                              | Describes a tool as advertised to a caller.                                      |
-| `ToolCall`             | interface | `{ id, name, arguments, caller? }`                                 | Describes one request to run a named tool.                                       |
-| `ToolSuccess`          | interface | `{ id, name, success: true, value }`                               | Reports the successful outcome of executing a `ToolCall`.                        |
-| `ToolFailure`          | interface | `{ id, name, success: false, error }`                              | Reports the failed outcome of executing a `ToolCall`.                            |
-| `ToolOptions`          | interface | `{ name, description?, summary?, parameters?, execute }`           | Configures an executable tool.                                                   |
-| `ToolInterface`        | interface | `{ name, description?, parameters?, summary?, execute }`           | Represents an executable tool: its advertised definition plus its local handler. |
-| `ToolManagerInterface` | interface | `{ count, add, tool, tools, definitions, execute, remove, clear }` | Represents a registry of executable tools with per-call error isolation.         |
-| `ToolResult`           | type      | `ToolSuccess \| ToolFailure`                                       | Represents the outcome of executing a `ToolCall`.                                |
+interface's data members as bare names in braces, `?` marking an optional member and `plus`
+introducing its call-signature members, and a type alias's own type literal with a union's arms
+escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
+
+| Name                   | Kind      | Shape                                                                  | Summary                                                                          |
+| ---------------------- | --------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
+| `ToolDefinition`       | interface | `{ name, description?, parameters? }`                                  | Describes a tool as advertised to a caller.                                      |
+| `ToolCall`             | interface | `{ id, name, arguments, caller? }`                                     | Describes one request to run a named tool.                                       |
+| `ToolSuccess`          | interface | `Success<unknown> plus { id, name }`                                   | Reports the successful outcome of executing a `ToolCall`.                        |
+| `ToolFailure`          | interface | `Failure<string> plus { id, name }`                                    | Reports the failed outcome of executing a `ToolCall`.                            |
+| `ToolOptions`          | interface | `{ name, description?, summary?, parameters?, execute }`               | Configures an executable tool.                                                   |
+| `ToolInterface`        | interface | `ToolDefinition plus { summary? } plus execute`                        | Represents an executable tool: its advertised definition plus its local handler. |
+| `ToolManagerInterface` | interface | `{ count } plus add, tool, tools, definitions, execute, remove, clear` | Represents a registry of executable tools with per-call error isolation.         |
+| `ToolResult`           | type      | `ToolSuccess \| ToolFailure`                                           | Represents the outcome of executing a `ToolCall`.                                |
```

`ToolDefinition`, `ToolCall`, and `ToolOptions` carry no call-signature member (each declared member
is a data property, `ToolOptions.execute` included), so their braces stay bare with no `plus`.
`ToolSuccess extends Success<unknown>` and `ToolFailure extends Failure<string>` (`src/core/types.ts:45,61`)
took the extended-interface form; `ToolInterface extends ToolDefinition` (`src/core/types.ts:85`) took
its parent name, its own added `summary?` in braces, then `plus execute` for its own call-signature
member. The prose sentence after the table ("`ToolInterface` and `ToolManagerInterface` list every
member …") states general behavior rather than listing members a cell now holds, so it stays.

## Item 2 — member references

No sites named in the brief; `npm run docs` reads `rows read: 1, disagreements found: 0` under the
installed head start, confirming no link-form disagreement exists to close.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

`tests/guides.test.ts` region from `const root = ` through the manifest loop's closing brace was
already byte-identical to the pilot outside the constants block and the package's own flagship-fences
section (confirmed with a whole-file diff against `/home/user/fleet/abort/tests/guides.test.ts`, which
showed only the constants, the header line, the `INTERNAL` sentence, and the package's own executed
section as differences). Two hunks landed:

```diff
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -1,6 +1,6 @@
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
 
 import { Tool, createTool, createToolManager, isToolCall } from '@src/core'
 import { describe, expect, it } from 'vitest'
@@ -36,7 +36,7 @@ const MODULES = Object.freeze({ '@orkestrel/tool': 'src/core', '@src/core': 'src
  *
  * A class that one-class-per-file evicted from its single consumer cannot become a
  * local, so it stays exported without being public. Naming it here is what makes that
- * intentional rather than forgotten — and the assertion that follows fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
  * here stops being stranded, so the list cannot rot.
  */
 const INTERNAL: readonly string[] = Object.freeze([])
```

Line 2 already read the pilot's line. The package's own file-scope constants (`GUIDE_SPEC`, `MODULES`)
and the whole `flagship fences` section stayed package-owned, per Ruling 20.

## Item 4 — fence lead-ins

No fences named in the brief as sitting directly under a heading; none to do.

## Item 5 — propagation

Ran `npx oxfmt --write guides/tool.md tests/guides.test.ts`, then `npm run docs`, then both write
directions.

## Acceptance criteria

1. `git status --short` — lists owned files only:
```
 M guides/tool.md
 M tests/guides.test.ts
```

2. `grep -n '| interface *| \`{[^\`]*:' guides/tool.md` — exit 1, no output. `grep -n '…' guides/tool.md`
   prints one line, `169:\`new Tool({ … })\` builds the same thing …` — pre-existing prose in "Anatomy
   of a tool", not a `Shape` cell; unrelated to this unit's owned rows and outside item 1's scope.

3. Item 3 region diff against the pilot: only the header line and the `INTERNAL` sentence differed,
   both now converged (shown above); line 2 already equalled the pilot's.

4. `npx oxfmt --check guides/tool.md tests/guides.test.ts`:
```
Checking formatting...

All matched files use the correct format.
Finished in 513ms on 2 files using 4 threads.
```
exit 0.
`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — no output, exit 0.

5. `npm run docs`:
```
rows read: 1, disagreements found: 0
```
exit 0. `node --experimental-strip-types scripts/docs.ts --to guide`:
```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```
`node --experimental-strip-types scripts/docs.ts --to source`:
```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

6. `npm run test:guides`:
```
 Test Files  1 passed (1)
      Tests  30 passed (30)
   Duration  729ms (transform 105ms, setup 24ms, import 256ms, tests 40ms, environment 0ms)
```
wall clock 4.058s (real), exit 0.
`npm run test:policy`:
```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  969ms (transform 400ms, setup 32ms, import 446ms, tests 288ms, environment 0ms)
```
wall clock 1.635s (real), exit 0.

## Deviation contract

No stop condition met. The `…` grep hit outside a `Shape` cell is noted under criterion 2 as
ancillary and left unchanged, since it is pre-existing prose the brief's scope does not reach.
