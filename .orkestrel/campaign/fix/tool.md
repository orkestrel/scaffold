# Fix dossier: tool

Verified fix-producing findings for the `tool` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-06 — DRIFT

6. package=tool file=`src/core/types.ts:196` (and `src/core/tools/ToolManager.ts:71-80`) rule=`.claude/rules/patterns.md` § Batch operations verdict=CONFIRMED
   wrong: `remove(names)` returns `true` when any named tool was present. The batch-operation contract states "An id list applies to those items and returns true only when all succeed." The implementation sets `removed = true` on the first success and never falsifies it.
   repair: In `ToolManager.ts:73-77` initialise `let removed = true` and set `removed = false` when `this.#tools.delete(name)` returns false. Change the `types.ts:196` `@returns` to "True if every named tool was present; false otherwise", and correct `guides/tool.md:107` and the `guides/tool.md:171` example comment ("any one removal counts").

### Verification

**Judge (DRIFT/high):** The violation is real and both lanes agree on the code: ToolManager.ts:73 seeds `let removed = false` and :75 sets it true on the first success, which is any-succeeds, while the rule requires all-succeed. The dispute is whether `let removed = true` is a harmful mechanic because it makes `remove([])`

**Lane DRIFT-RESHAPE/high:** amend: keep `remove(names)` returning true only when every named tool was present, but handle the empty batch explicitly (return `false` for `[]`, preserving ToolManager.test.ts:633) and iterate with `if (!this.#tools.delete(name)) removed = false` over a `removed` seeded from a non-empty check. Scope the unit to also update ToolManager.test.ts:631-633, types.ts:196, guides/tool.md:107, and guides/tool.md:171.

**Lane DRIFT/high:** amend: the fix stands (initialise `let removed = true` at ToolManager.ts:72, set false on a failed delete, correct the `@returns` at types.ts:195, and correct guides/tool.md:107 and :171), but scope the test file with it — tests/src/core/tools/ToolManager.test.ts:631 flips to false and :633 (`remove([])`) flips to true under all-succeed semantics. Correct the implementation span to :70-79.

## s18-16 — DRIFT

16. package=tool file=`src/core/tools/ToolManager.ts:115-127` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test, case 2) verdict=CONFIRMED
    wrong: `#definition(tool)` reaches no `#` state and no sibling method. It is a pure whole-to-view projection, which the leaf test routes to an exported, tested helper. It is hidden and untestable where it sits.
    repair: Create `src/core/helpers.ts` with `export function toolToDefinition(tool: ToolInterface): ToolDefinition` (the `{noun}To{Noun}` projection form), call it from `ToolManager.ts:59`, add `export * from './helpers.js'` to `index.ts`, and add a unit test.

