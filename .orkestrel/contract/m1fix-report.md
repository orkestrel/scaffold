# Unit m1fix — returned report

Complete. All work landed in the four owned files; the source file changed comment lines only.

## Touched files

- `/home/user/contract/src/core/ContractCompiler.ts` — FIX-A: the lazy-ledger rationale moved into the `=== Call-scoped value ledger` section comment (now ending at line 522), covering both tracking methods; the `#trackGuard` body comment removed.
- `/home/user/contract/tests/setup.ts` — FIX-C: `buildCountedSlots(shared)` exported beside `buildCountedGraph`, returning `CountedGraphInterface`.
- `/home/user/contract/tests/setup.test.ts` — FIX-C: the factory's proof, beside the `buildCountedGraph` proof.
- `/home/user/contract/tests/src/core/ContractCompiler.test.ts` — FIX-C: the within-call case reduced to construction, call, and assertions; FIX-B: the build-time-allocation regression case.

Diffstat: `4 files changed, 167 insertions(+), 42 deletions(-)`.

## Unknown answered (FIX-C interface choice)

`CountedGraphInterface` fits with no change and no sibling interface. `buildCountedSlots` returns `{ shape, value, count }` exactly as `buildCountedGraph` does; the shared interface is what keeps the two instruments one vocabulary instead of two.

## Mutation probe for FIX-B

Plant, on the `#trackGuard` `memo` declaration only:

```
let memo: WeakMap<object, boolean> | undefined = new ContractCompiler.#weakMap()
```

`npx vitest run tests/src/core/ContractCompiler.test.ts --config vite.config.ts --no-cache`

- Planted: `Tests 1 failed | 20 passed (21)` — `builds no tracking ledger while a compiled family is assembled`, `AssertionError: expected 4 to be +0`. The delta is 4, the tracked-node difference between the two declarations, as predicted. No other case reddened.
- Reverted (`Edit` restoring the exact line; no `git` restore command used): `Tests 21 passed (21)`, and `git diff --stat -- src/core/ContractCompiler.ts` reports the file identical to `b3852d9` at that moment.

## Scoped runs, pre-change and post-change

| Command | Pre-change | Post-change |
| --- | --- | --- |
| `npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts tests/src/core/integration.test.ts --config vite.config.ts --no-cache` | `Tests 345 passed (345)` | `Tests 346 passed (346)`, exit 0 |
| `npx vitest run --config vite.config.ts --no-cache --project setup` | `Tests 60 passed (60)` | `Tests 61 passed (61)`, exit 0 |

The trio rises by the FIX-B case; the FIX-C reduction replaced a case rather than adding one. The `setup` project rises by the factory's proof.

Gates, all run after the last edit:

- `npm run format:check` — exit 0, "All matched files use the correct format", 62 files.
- `npm run lint:check` — exit 0. First run reported `typescript(array-type)` on my two `readonly T[]` annotations over non-simple types; both changed to `ReadonlyArray<...>`, which is what the configured rule requires.
- `npm run check` — exit 0 (`tsc --noEmit --project tsconfig.json` then `configs/src/tsconfig.core.json`).

Observations, not criteria: `--project src:core` reports `Tests 1294 passed (1294)` and `--project policy` reports `Tests 111 passed (111)`, both exit 0. The `src:core` run is the evidence that the FIX-B case's intrinsic replacement and `vi.resetModules()` leave its sibling files alone.

## Failing-first test name

`ContractCompiler > builds no tracking ledger while a compiled family is assembled` — red under the planted initializer, green with it reverted.

## Claim I verified rather than inherited

The comment states that `INTRINSICS.apply` takes its receiver type from the argument, so the `memo === undefined` operand is what proves the receiver. I did not narrow the live condition to re-measure it, because every non-comment line of the source file is off-limits and criterion 4 authorized one plant only. I corroborated the mechanism outside the subject tree with the repository's own `tsc`:

```ts
declare const memo: WeakMap<object, boolean> | undefined
declare const value: object
export const recalled = Reflect.apply(WeakMap.prototype.get, memo, [value])
```

`node_modules/.bin/tsc --noEmit --strict --target es2022 --lib es2022 receiver.ts` exits 0, so a possibly-`undefined` receiver reaches `WeakMap.prototype.get` with no diagnostic. The instrument is at `/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad/recv/receiver.ts`.

## Decisions I recorded and carried on from

- The `#trackGuard` body comment is deleted rather than reduced to a pointer. The criterion permits "at most a pointer", and the section comment sits within the same contiguous section as both methods, so a pointer would be a second home for one rule.
- The reduced within-call case compiles one guard per instance instead of reusing a single compiled guard across both values. The factory owns its own declaration, and separate compilation removes any cross-call interaction from a case whose subject is within-call reuse.
- The counting `WeakMap` subclass lives in the test body, not in `tests/setup.ts`. The brief scopes `tests/setup.ts` to "the added factory and its type", so a second export there would exceed the granted ownership.

## Claim I flag as unproved

The reduced within-call case was not re-measured under a memo-removing edit. Its control is unchanged in shape — distinct records force the second read, so a walk that reuses nothing equalizes the pair at `[2, 2]` against the asserted `[1, 2]` — but the only source mutation I ran was the one criterion 4 names.

## Review evidence

`git status --porcelain`:

```
 M src/core/ContractCompiler.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/ContractCompiler.test.ts
```

`git diff`:

```diff
diff --git a/src/core/ContractCompiler.ts b/src/core/ContractCompiler.ts
index b233e9f..1c3b53d 100644
--- a/src/core/ContractCompiler.ts
+++ b/src/core/ContractCompiler.ts
@@ -508,6 +508,18 @@ export class ContractCompiler<
 	// value the caller changes between two calls must be read again. It is the
 	// per-call identity memo `valueToSchema` and `schemaToShape` already carry,
 	// and it publishes nothing.
+	//
+	// A tracked node builds its ledger on the first call that hands it an
+	// object. `filled` starts below every scope the clock hands out — `#visits`
+	// rises before it names a scope, so no scope is 0 — and the first call
+	// therefore always refreshes. The `memo === undefined` half of the refresh
+	// condition is unreachable at runtime, because a refresh assigns the map and
+	// the scope together; it stays because `INTRINSICS.apply` takes its receiver
+	// type from the argument rather than from the target, so that half is what
+	// proves the receiver at the `recall` and `retain` dispatches. Narrow the
+	// condition to the scope alone and `undefined` reaches
+	// `WeakMap.prototype.get` as far as the types know, with `check` still
+	// exiting 0.
 
 	// Only a node that descends into a child artifact can be reached twice through
 	// one value; a leaf answers about the value in front of it, so tracking one
@@ -520,12 +532,6 @@ export class ContractCompiler<
 	}
 
 	#trackGuard(plan: Guard<unknown>): Guard<unknown> {
-		// The map belongs to the first call that needs one, never to the build:
-		// `filled` starts before the first scope the clock hands out, so every
-		// call path replaces a build-time map before reading it, and one built
-		// here would ride unread inside every artifact this compiles — forever,
-		// in an artifact that only ever receives primitives. `#trackFaults`
-		// reads the same way.
 		let filled = 0
 		let memo: WeakMap<object, boolean> | undefined
 		return (value: unknown): value is unknown => {
diff --git a/tests/setup.test.ts b/tests/setup.test.ts
index 30ef5f9..f3ee3a2 100644
--- a/tests/setup.test.ts
+++ b/tests/setup.test.ts
@@ -26,6 +26,7 @@ import {
 	ArrayRootSchema,
 	BlankBrandDeclaration,
 	buildCountedGraph,
+	buildCountedSlots,
 	buildCyclicArray,
 	buildCyclicRecord,
 	buildDeepNest,
@@ -963,6 +964,35 @@ describe('shape factories', () => {
 		expect(separate[0]).not.toBe(separate[1])
 	})
 
+	it('binds one child node into both slots and tallies a read per slot it fills', () => {
+		const shared = buildCountedSlots(true)
+		expect(shared.count()).toBe(0)
+		const root: unknown = shared.value
+		if (typeof root !== 'object' || root === null)
+			throw new Error('buildCountedSlots: the value root must be a record')
+		expect(captured.get(root, 'left')).toBe(captured.get(root, 'right'))
+		const declaration: ContractShape = shared.shape
+		if (declaration.type !== 'object')
+			throw new Error('buildCountedSlots: the root must be an object shape')
+		expect(captured.get(declaration.properties, 'left')).toBe(
+			captured.get(declaration.properties, 'right'),
+		)
+
+		const slot: unknown = captured.get(root, 'left')
+		if (typeof slot !== 'object' || slot === null)
+			throw new Error('buildCountedSlots: a slot must hold a record')
+		captured.get(slot, 'inner')
+		expect(shared.count()).toBe(1)
+		captured.get(slot, 'inner')
+		expect(shared.count()).toBe(2)
+
+		const distinct = buildCountedSlots(false)
+		const separate: unknown = distinct.value
+		if (typeof separate !== 'object' || separate === null)
+			throw new Error('buildCountedSlots: the value root must be a record')
+		expect(captured.get(separate, 'left')).not.toBe(captured.get(separate, 'right'))
+	})
+
 	it('combines every shape kind and wraps the previous level per depth', () => {
 		const flat = compositeShape(1)
 		if (flat.type !== 'object')
diff --git a/tests/setup.ts b/tests/setup.ts
index e8f44dc..0b72823 100644
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -2756,6 +2756,52 @@ export function buildCountedGraph(levels: number, shared: boolean): CountedGraph
 	})
 }
 
+/**
+ * Build a two-slot object graph over one authored child node and the tally of
+ * record reads the walk performs.
+ *
+ * @remarks
+ * The within-call companion to {@link buildCountedGraph}, which measures the
+ * same ledger down a chain of array levels. Here the declaration is one object
+ * node bound into BOTH slots of its parent, so a walk enters one compiled node
+ * twice in one call, and the value's record carries the same tallying accessor.
+ * `shared` chooses whether the two slots hold ONE record or two distinct ones,
+ * which is the control drawn from outside the population: two distinct records
+ * are two reads of real work no memo may skip, so a walk that reuses nothing
+ * reads the shared value twice as well and equalizes the pair.
+ *
+ * @param shared - Whether both slots hold the same record
+ * @returns The declaration, the value, and its read tally
+ *
+ * @example
+ * ```ts
+ * const slots = buildCountedSlots(true)
+ * compileGuard(slots.shape)(slots.value) // true
+ * slots.count() // 1 once a walk reads the one shared record once
+ * ```
+ */
+export function buildCountedSlots(shared: boolean): CountedGraphInterface {
+	let reads = 0
+	const left: Record<string, unknown> = {}
+	const right: Record<string, unknown> = shared ? left : {}
+	const records: ReadonlyArray<Record<string, unknown>> = shared ? [left] : [left, right]
+	for (const record of records) {
+		Object.defineProperty(record, 'inner', {
+			get: () => {
+				reads += 1
+				return 'leaf'
+			},
+			enumerable: true,
+		})
+	}
+	const child = objectShape({ inner: stringShape() })
+	return Object.freeze({
+		shape: objectShape({ left: child, right: child }),
+		value: { left, right },
+		count: (): number => reads,
+	})
+}
+
 /**
  * Create a plain record with one non-enumerable own property.
  *
diff --git a/tests/src/core/ContractCompiler.test.ts b/tests/src/core/ContractCompiler.test.ts
index 3f1985d..ad5963d 100644
--- a/tests/src/core/ContractCompiler.test.ts
+++ b/tests/src/core/ContractCompiler.test.ts
@@ -29,14 +29,16 @@ import {
 } from '@src/core'
 import {
 	buildCountedGraph,
+	buildCountedSlots,
 	buildDeepShape,
 	buildSharedDagShape,
 	buildStaircaseShape,
+	captured,
 	captureContractError,
 	ObservedShape,
 	ReentrantShape,
 } from '../../setup.js'
-import { describe, expect, it } from 'vitest'
+import { describe, expect, it, vi } from 'vitest'
 
 describe('ContractCompiler', () => {
 	it('exposes exactly the seven ruled getters and pins them', () => {
@@ -325,43 +327,15 @@ describe('ContractCompiler', () => {
 	})
 
 	it('reads a shared object once per call where two slots of one node reach it', () => {
-		// One authored child node fills both slots, so a value holding ONE object
-		// in both must have that object's member read once. The control is the
-		// same declaration over two distinct objects, whose second read is real
-		// work no memo may skip — a walk carrying no memo reads both values
-		// twice and makes the two counts equal.
-		const child = objectShape({ inner: stringShape() })
-		const guard = compileGuard(objectShape({ left: child, right: child }))
-		let sharedReads = 0
-		let distinctReads = 0
-		const reused: Record<string, unknown> = {}
-		const first: Record<string, unknown> = {}
-		const second: Record<string, unknown> = {}
-		Object.defineProperty(reused, 'inner', {
-			enumerable: true,
-			get: () => {
-				sharedReads += 1
-				return 'leaf'
-			},
-		})
-		Object.defineProperty(first, 'inner', {
-			enumerable: true,
-			get: () => {
-				distinctReads += 1
-				return 'leaf'
-			},
-		})
-		Object.defineProperty(second, 'inner', {
-			enumerable: true,
-			get: () => {
-				distinctReads += 1
-				return 'leaf'
-			},
-		})
-		const answers = [guard({ left: reused, right: reused }), guard({ left: first, right: second })]
+		const shared = buildCountedSlots(true)
+		const distinct = buildCountedSlots(false)
+		const answers = [
+			compileGuard(shared.shape)(shared.value),
+			compileGuard(distinct.shape)(distinct.value),
+		]
 
 		expect(answers).toEqual([true, true])
-		expect([sharedReads, distinctReads]).toEqual([1, 2])
+		expect([shared.count(), distinct.count()]).toEqual([1, 2])
 	})
 
 	it('answers thirty levels of shared references against a thirty-node chain in bounded time', () => {
@@ -413,6 +387,75 @@ describe('ContractCompiler', () => {
 		expect(guard(record)).toBe(false)
 	})
 
+	it('builds no tracking ledger while a compiled family is assembled', async () => {
+		// A ledger built with the artifact would cost one map per tracked node, so
+		// the count taken across the getter read would rise with the tracked-node
+		// count. These two declarations differ only there. The build allocates
+		// working maps of its own, so the DELTA between the two reads is the
+		// discriminating figure and neither total is asserted. The call counts are
+		// the control: they prove this counter registers a map the closure builds,
+		// and they rise with the tracked-node count as a per-node cost must.
+		const original = captured.descriptor(globalThis, 'WeakMap')
+		if (original === undefined) throw new Error('the WeakMap descriptor is absent')
+		let constructions = 0
+		class CountingWeakMap extends WeakMap<object, unknown> {
+			constructor(entries?: ReadonlyArray<readonly [object, unknown]> | null) {
+				super(entries)
+				constructions += 1
+			}
+		}
+		let buildDelta = 0
+		let calledFew = 0
+		let calledMany = 0
+		let answers: readonly unknown[] = []
+		try {
+			captured.define(globalThis, 'WeakMap', { ...original, value: CountingWeakMap })
+			vi.resetModules()
+			const loaded = await import('../../../src/core/index.js')
+			const few = loaded.objectShape({
+				items: loaded.arrayShape(loaded.objectShape({ name: loaded.stringShape() })),
+			})
+			const many = loaded.objectShape({
+				items: loaded.arrayShape(loaded.objectShape({ name: loaded.stringShape() })),
+				first: loaded.objectShape({ tag: loaded.stringShape() }),
+				second: loaded.objectShape({ tag: loaded.stringShape() }),
+				third: loaded.objectShape({ tag: loaded.stringShape() }),
+				fourth: loaded.objectShape({ tag: loaded.stringShape() }),
+			})
+			const compilerFew = new loaded.ContractCompiler(few)
+			const compilerMany = new loaded.ContractCompiler(many)
+
+			let opened = constructions
+			const guardFew = compilerFew.guard
+			const builtFew = constructions - opened
+			opened = constructions
+			const guardMany = compilerMany.guard
+			buildDelta = constructions - opened - builtFew
+
+			opened = constructions
+			const answeredFew = guardFew({ items: [{ name: 'leaf' }] })
+			calledFew = constructions - opened
+			opened = constructions
+			const answeredMany = guardMany({
+				items: [{ name: 'leaf' }],
+				first: { tag: 'a' },
+				second: { tag: 'b' },
+				third: { tag: 'c' },
+				fourth: { tag: 'd' },
+			})
+			calledMany = constructions - opened
+			answers = [answeredFew, answeredMany]
+		} finally {
+			captured.define(globalThis, 'WeakMap', original)
+			vi.resetModules()
+		}
+
+		expect(answers).toEqual([true, true])
+		expect(buildDelta).toBe(0)
+		expect(calledFew).toBeGreaterThan(0)
+		expect(calledMany).toBeGreaterThan(calledFew)
+	})
+
 	it('reports a shared faulted node at every path the walk reached it through', () => {
 		const shape = arrayShape(objectShape({ inner: stringShape() }))
 		const record = { inner: 1 }
```

Deviation state: none. No executable source line moved, no existing assertion changed, and the regression case held across every run I made of it.
