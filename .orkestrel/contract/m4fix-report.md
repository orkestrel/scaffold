# Unit m4fix — returned report

Unit m4fix complete. All four findings carried; every transcription holds against the live code, so no deviation.

## Touched files

- `/home/user/contract/src/core/compilers.ts` — `createContract` TSDoc: the attribution sentence now says the failure carries the authoring door's diagnosis adopted by identity, and the retention sentence states what a kept contract holds.
- `/home/user/contract/src/core/types.ts` — `ContractCompilerInterface` TSDoc: the false universal deleted, the pronoun named.
- `/home/user/contract/guides/contract.md` — the closing sentence of § Compiling a contract no longer denies the diagnostics' node retention.
- `/home/user/contract/tests/guides.test.ts` — `flagship fences` block: presence guard extended to the value-claiming lines; the `createContract` fence and the direct-compiler fence transcribed and guarded.

## Diff (m4fix alone, against the m4 tree)

```diff
--- a/src/core/compilers.ts
+++ b/src/core/compilers.ts
@@ -356,9 +356,14 @@
  * lazily compiled member would compile on either, which spends the laziness
  * rather than saving it. A malformed declaration refuses at this call rather
  * than at the first read of whichever member a caller happens to touch, so the
- * refusal stays inside this function's own error attribution. Every member is
- * self-contained, so the compiler this call builds releases its working set
- * before the call returns and nothing the caller keeps holds the owned graph.
+ * failure arrives at the call the caller made — carrying the authoring door's
+ * own diagnosis, which this door adopts rather than rewraps. Every member is
+ * self-contained, and the compiler this call builds releases its working set
+ * before the call returns. The contract keeps part of the declaration even so:
+ * the auditor and reporter plans close over the owned leaf and array nodes they
+ * read their bounds from, so a kept contract retains those nodes and, through
+ * an array node's `items` field, the subgraph beneath them. Nothing the caller
+ * keeps reaches back into the compiler.
  *
  * @param shape - The shape to compile
  * @returns A contract bundling `schema` / `is` / `parse` / `audit` / `explain` / `generate`
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1075,13 +1075,12 @@
  * error.
  *
  * After every family exists, the compiler releases its working set — the owned
- * graph, the node index, the order, and every family plan. Nothing is released
- * before then, so a compiler read for one artifact and then kept holds that
- * whole set for as long as you keep it. A compiled artifact is the opposite:
- * each one closes over the child entries its family needed while that family
- * was built, so it answers on its own and outlives the compiler that produced
- * it. When one artifact is what you want, keep the artifact and let the
- * compiler go.
+ * graph, the node index, the order, and every family plan. A compiler read for
+ * one artifact and then kept holds that whole set for as long as you keep the
+ * compiler. A compiled artifact is the opposite: each one closes over the child
+ * entries its family needed while that family was built, so it answers on its
+ * own and outlives the compiler that produced it. When one artifact is what you
+ * want, keep the artifact and let the compiler go.
  *
  * @example
  * ```ts
--- a/guides/contract.md
+++ b/guides/contract.md
@@ -968,7 +968,7 @@
 isTicket({ id: '' }) // false — an empty id fails the min:1 refinement
 ```
 
-`createContract` is written the same way, which is why a contract it returns holds nothing but its own six values.
+`createContract` is written the same way, so a contract it returns holds its own six values and no route back to the compiler that built them. Part of the declaration travels with those values: the `audit` and `explain` functions close over the owned leaf and array nodes whose bounds they report, and an array node carries the subgraph under its `items` field.
 
 ### From an existing API/DB to an MCP tool
 
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -20,6 +20,7 @@
 import { readFileSync } from 'node:fs'
 import { requireValue } from '@orkestrel/test'
 import { readInventory } from '@orkestrel/test/server'
+import type { ContractCompilerInterface } from '@src/core'
 import * as barrel from '@src/core'
 import {
 	ContractCompiler,
@@ -28,6 +29,7 @@
 	SchemaCloner,
 	ShapeCloner,
 	ShapeValidator,
+	createContract,
 	objectShape,
 	stringShape,
 } from '@src/core'
@@ -279,8 +281,9 @@
 // The EXECUTED half. Every preceding check reads a name — from source text or
 // from a prototype — and a name that resolves proves nothing about a sentence
 // beside it, so a fence whose comment claims a value the code contradicts
-// passes all of them. The cases here run a flagship fence and assert the values
-// its comments claim. Change a fence, change the transcription beside it.
+// passes all of them. The cases here run the flagship fences and assert the
+// values their comments claim. Change a fence, change the transcription beside
+// it.
 describe('flagship fences', () => {
 	const guideText = requireValue(files[CORE_GUIDE], `Missing file: ${CORE_GUIDE}`)
 
@@ -295,11 +298,59 @@
 		expect(isTicket({ id: '' })).toBe(false)
 	})
 
-	it('transcribes a fence the guide still carries', () => {
+	it('carries the guard fence lines the transcription copies', () => {
 		// The presence guard beside the transcription: it proves the transcribed
-		// line is still the documented one, and nothing whatever about behavior.
+		// lines are still the documented ones, and nothing whatever about behavior.
+		// Binding the construction line alone leaves a comment free to claim the
+		// opposite value and stay green, so every line carrying a claim is bound.
 		expect(guideText).toContain(
 			'const isTicket = new ContractCompiler(objectShape({ id: stringShape({ min: 1 }) })).guard',
 		)
+		expect(guideText).toContain("isTicket({ id: 'T-1' }) // true")
+		expect(guideText).toContain("isTicket({ id: '' }) // false")
+	})
+
+	it('answers from a contract whose members disagree about one undeclared key', () => {
+		// The compiling-a-contract fence: one undeclared key, read by every member
+		// that can see it. Derived together is not the same as equal, and each
+		// expectation here is that fence's own comment, executed.
+		const contract = createContract(objectShape({ id: stringShape() }))
+		const value = { id: 'a', debug: true }
+
+		expect(contract.is(value)).toBe(false)
+		expect(contract.parse(value)).toEqual({ id: 'a' })
+		expect(contract.audit(value)).toEqual([{ reason: 'extra', path: ['debug'] }])
+		expect(contract.explain(value)).toEqual([])
+	})
+
+	it('carries the contract fence lines the transcription copies', () => {
+		expect(guideText).toContain(
+			'const contract = createContract(objectShape({ id: stringShape() }))',
+		)
+		expect(guideText).toContain('contract.is(value) // false')
+		expect(guideText).toContain("contract.parse(value) // { id: 'a' }")
+		expect(guideText).toContain("contract.audit(value) // [{ reason: 'extra', path: ['debug'] }]")
+		expect(guideText).toContain('contract.explain(value) // []')
+	})
+
+	it('replays one artifact per getter and hands the bundle those exact values', () => {
+		// The direct-compiler fence. The identity claims are the load-bearing part:
+		// a getter that recompiled on each read would satisfy every value assertion
+		// in this file and still break the contract this fence documents.
+		const shape = objectShape({ id: stringShape({ min: 1 }) })
+		const compiler: ContractCompilerInterface<typeof shape> = new ContractCompiler(shape)
+
+		expect(compiler.guard({ id: 'a' })).toBe(true)
+		expect(compiler.guard).toBe(compiler.guard)
+		expect(compiler.contract.is).toBe(compiler.guard)
+	})
+
+	it('carries the compiler fence lines the transcription copies', () => {
+		expect(guideText).toContain(
+			'const compiler: ContractCompilerInterface<typeof shape> = new ContractCompiler(shape)',
+		)
+		expect(guideText).toContain("compiler.guard({ id: 'a' }) // true")
+		expect(guideText).toContain('compiler.guard === compiler.guard // true')
+		expect(guideText).toContain('compiler.contract.is === compiler.guard // true')
 	})
 })
```

The m4fix-only view was produced by reverse-applying these exact edits into `/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad/base` and running `diff -u`; the rebuild script is at `/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad/baseline.mjs` and each replacement asserts uniqueness. Diffstat against `fcdd4d0` (m4 plus m4fix, which commit together): `guides/contract.md | 17 +-`, `src/core/compilers.ts | 14 +`, `src/core/types.ts | 8 +`, `tests/guides.test.ts | 81 +`.

`git status --porcelain`:

```text
 M guides/contract.md
 M src/core/compilers.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

## Gate evidence (2026-09-01, `/home/user/contract`)

| Command | Result |
| ------- | ------ |
| `npm run format:check` | exit 0, "All matched files use the correct format" |
| `npm run lint:check` | exit 0 |
| `npm run check` | exit 0 |
| `npx vitest run tests/guides.test.ts --config vite.config.ts --no-cache` | pre-change `Tests 61 passed (61)`; post-change `Tests 65 passed (65)` |

## Mutation probe

Both flips were made in the guide and restored with the exact inverse edit; the tree is unflipped and the fence lines read `contract.is(value) // false` and `isTicket({ id: '' }) // false — an empty id fails the min:1 refinement`. Command for every run: `npx vitest run tests/guides.test.ts --config vite.config.ts --no-cache`.

- Guard fence, `isTicket({ id: '' }) // false` → `// true`: `Tests 1 failed | 64 passed (65)`, failing at `tests/guides.test.ts:310` in `flagship fences > carries the guard fence lines the transcription copies`. Restored: `Tests 65 passed (65)`.
- `createContract` fence, `contract.is(value) // false` → `// true`: `Tests 1 failed | 64 passed (65)`, failing at `tests/guides.test.ts:330` in `flagship fences > carries the contract fence lines the transcription copies`. Restored: `Tests 65 passed (65)`.

## Decisions inside the stated bounds

- Assertion grouping follows the block's established split: one executing case per fence, one presence case per fence. The pre-existing presence case was renamed from `transcribes a fence the guide still carries` to `carries the guard fence lines the transcription copies`, because it no longer guards the only fence.
- The compiler transcription keeps the fence's `ContractCompilerInterface<typeof shape>` annotation, which adds the type-only import; the annotation is part of the documented declaration line the presence guard binds.
- The presence guards bind each claim line up to and including its value token, not the trailing prose, so an editorial rewording of a comment's explanation does not redden while a flipped value does. The `contract.parse` and `contract.audit` guards carry their whole documented value.
- The guide sentence names `audit` and `explain` (the published members a reader holds) where the TSDoc names the auditor and reporter plans (the internal families), matching each surface's own vocabulary.

## Claims I flag as unproved

- The `ContractCompilerInterface` sentence "A compiler read for one artifact and then kept holds that whole set for as long as you keep the compiler" is proved only for a read that returned an artifact. A read that refuses settles through `#fail`, which calls `#release`, so the released-early path exists and the deleted universal was what claimed otherwise; the surviving sentence does not restate the bound. Verified by reading `/home/user/contract/src/core/ContractCompiler.ts:365-397`, not by a test.
- The retention claim itself (auditor and reporter plans closing over owned leaf and array nodes) is verified by source reading at `ContractCompiler.ts:1318-1364` and `ContractCompiler.ts:1579-1647`, where the leaf cases bind `const node` into the returned closure and the array cases bind an `ArrayShape` carrying `items`. No test in this unit measures retention; the prose rests on that reading.
