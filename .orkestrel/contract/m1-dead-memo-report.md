# Unit m1-dead-memo — returned report

Unit complete. Both acceptance gates and the scoped suite are green, and both added cases were proved able to fail.

## Touched files

- `/home/user/contract/src/core/ContractCompiler.ts` — `#trackGuard` and `#trackFaults` declare `memo` without an initializer and widen the refresh condition; a comment in `#trackGuard` records why the build allocates nothing.
- `/home/user/contract/tests/src/core/ContractCompiler.test.ts` — added the cross-call isolation case and the within-call reuse case.

Diffstat: `2 files changed, 64 insertions(+), 4 deletions(-)`.

## Exact diff

```diff
diff --git a/src/core/ContractCompiler.ts b/src/core/ContractCompiler.ts
index 4c275fb..b233e9f 100644
--- a/src/core/ContractCompiler.ts
+++ b/src/core/ContractCompiler.ts
@@ -520,8 +520,14 @@ export class ContractCompiler<
 	}
 
 	#trackGuard(plan: Guard<unknown>): Guard<unknown> {
+		// The map belongs to the first call that needs one, never to the build:
+		// `filled` starts before the first scope the clock hands out, so every
+		// call path replaces a build-time map before reading it, and one built
+		// here would ride unread inside every artifact this compiles — forever,
+		// in an artifact that only ever receives primitives. `#trackFaults`
+		// reads the same way.
 		let filled = 0
-		let memo: WeakMap<object, boolean> = new ContractCompiler.#weakMap()
+		let memo: WeakMap<object, boolean> | undefined
 		return (value: unknown): value is unknown => {
 			if (!isObject(value)) return plan(value)
 			const opened = ContractCompiler.#scope === 0
@@ -531,7 +537,7 @@ export class ContractCompiler<
 			}
 			try {
 				const scope = ContractCompiler.#scope
-				if (filled !== scope) {
+				if (memo === undefined || filled !== scope) {
 					memo = new ContractCompiler.#weakMap()
 					filled = scope
 				}
@@ -556,7 +562,7 @@ export class ContractCompiler<
 		plan: (value: unknown, path: readonly string[]) => readonly T[],
 	): (value: unknown, path: readonly string[]) => readonly T[] {
 		let filled = 0
-		let memo: WeakMap<object, readonly T[]> = new ContractCompiler.#weakMap()
+		let memo: WeakMap<object, readonly T[]> | undefined
 		return (value: unknown, path: readonly string[]): readonly T[] => {
 			if (!isObject(value)) return plan(value, path)
 			const opened = ContractCompiler.#scope === 0
@@ -566,7 +572,7 @@ export class ContractCompiler<
 			}
 			try {
 				const scope = ContractCompiler.#scope
-				if (filled !== scope) {
+				if (memo === undefined || filled !== scope) {
 					memo = new ContractCompiler.#weakMap()
 					filled = scope
 				}
diff --git a/tests/src/core/ContractCompiler.test.ts b/tests/src/core/ContractCompiler.test.ts
index 2b096df..3f1985d 100644
--- a/tests/src/core/ContractCompiler.test.ts
+++ b/tests/src/core/ContractCompiler.test.ts
@@ -324,6 +324,46 @@ describe('ContractCompiler', () => {
 		expect([guarded.count(), audited.count(), explained.count()]).toEqual([levels, levels, levels])
 	})
 
+	it('reads a shared object once per call where two slots of one node reach it', () => {
+		// One authored child node fills both slots, so a value holding ONE object
+		// in both must have that object's member read once. The control is the
+		// same declaration over two distinct objects, whose second read is real
+		// work no memo may skip — a walk carrying no memo reads both values
+		// twice and makes the two counts equal.
+		const child = objectShape({ inner: stringShape() })
+		const guard = compileGuard(objectShape({ left: child, right: child }))
+		let sharedReads = 0
+		let distinctReads = 0
+		const reused: Record<string, unknown> = {}
+		const first: Record<string, unknown> = {}
+		const second: Record<string, unknown> = {}
+		Object.defineProperty(reused, 'inner', {
+			enumerable: true,
+			get: () => {
+				sharedReads += 1
+				return 'leaf'
+			},
+		})
+		Object.defineProperty(first, 'inner', {
+			enumerable: true,
+			get: () => {
+				distinctReads += 1
+				return 'leaf'
+			},
+		})
+		Object.defineProperty(second, 'inner', {
+			enumerable: true,
+			get: () => {
+				distinctReads += 1
+				return 'leaf'
+			},
+		})
+		const answers = [guard({ left: reused, right: reused }), guard({ left: first, right: second })]
+
+		expect(answers).toEqual([true, true])
+		expect([sharedReads, distinctReads]).toEqual([1, 2])
+	})
+
 	it('answers thirty levels of shared references against a thirty-node chain in bounded time', () => {
 		// The reported vector, kept in its reported form: no aliases in the
 		// declaration, no accessors in the value, two references per level.
@@ -359,6 +399,20 @@ describe('ContractCompiler', () => {
 		expect([guard(value), auditor(shape, value).length]).toEqual([false, 2])
 	})
 
+	it('holds no answer about an object across two calls of one compiled guard', () => {
+		// The root node of an object declaration is tracked, so one retained
+		// guard is the shortest path to the memo's lifetime: the answer the first
+		// call kept about this record must not reach the second call, which sees
+		// a record the caller has since made invalid.
+		const guard = compileGuard(objectShape({ inner: stringShape() }))
+		const record: Record<string, unknown> = { inner: 'x' }
+		const accepted = guard(record)
+		record.inner = 1
+
+		expect(accepted).toBe(true)
+		expect(guard(record)).toBe(false)
+	})
+
 	it('reports a shared faulted node at every path the walk reached it through', () => {
 		const shape = arrayShape(objectShape({ inner: stringShape() }))
 		const record = { inner: 1 }
```

## Scoped test counts

Same command before and after, run at repository root:

`npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts tests/src/core/integration.test.ts --config vite.config.ts --no-cache`

- Pre-change, 2026-09-01 04:10 UTC: `Test Files 3 passed (3)`, `Tests 343 passed (343)`.
- Post-change, 2026-09-01 04:23 UTC: `Test Files 3 passed (3)`, `Tests 345 passed (345)`, exit 0. The rise is the two added cases.

Gates, cheap-first: `npm run lint:check` exit 0; `npm run check` exit 0; `npm run format:check` exit 0 (`All matched files use the correct format`, 62 files). No `as`, no `!`, no suppression directive, and no initializer on either `memo` declaration — scan of added lines returned nothing.

## Which narrowing form landed

The widened refresh condition `if (memo === undefined || filled !== scope)` landed in both methods. The `const active` fallback was not needed.

The Unknowns section asked whether the widened form narrows without an assertion. It does, and the measurement corrected the question's premise, so read this before accepting:

- The narrowing is real and load-bearing. With `const proof: WeakMap<object, boolean> = memo` planted after the refresh branch, `npm run check` exits 0 with the widened condition and fails with `src/core/ContractCompiler.ts(544,11): error TS2322: Type 'WeakMap<object, boolean> | undefined' is not assignable to type 'WeakMap<object, boolean>'` without it.
- The narrower form `if (filled !== scope)` also typechecks, exit 0, because `Reflect.apply` infers its receiver type parameter from the argument rather than forcing the target's `this` type. That form would let `undefined` reach `WeakMap.prototype.get` as the receiver with the compiler proving nothing. That is why the widened condition landed rather than the cheaper edit: it costs one operand and keeps the receiver a proven `WeakMap`.

Both temporary instruments were removed; `git status --porcelain` confirms the tree carries only the two intended edits.

## Failing-first evidence

No Vitest assertion can observe the build-time allocation, per the brief, so each added case was proved able to fail by a control planted in the owned source and then reverted by an exact reverse edit.

- Control, memo retained across calls (`filled !== filled`): `× holds no answer about an object across two calls of one compiled guard`, and the existing sibling `× answers a value the caller changed between two calls from the changed value`. `Tests 2 failed | 18 passed (20)`.
- Control, memo rebuilt on every entry (`|| scope === scope`): `× reads a shared object once per call where two slots of one node reach it`, `AssertionError: expected [ 2, 2 ] to deeply equal [ 1, 2 ]`. The shared object read twice, and the two counts equal, is the signature of a removed memo.

That second control also hung the full file for over 300 s on the pre-existing 18-level and 30-level shared-reference cases. I killed it by process id (7900, 7915, 7940) and confirmed the tree dead before continuing, then took the control reading with a `-t` filter under a 120 s timeout.

## Review evidence

`git status --porcelain`:

```
 M src/core/ContractCompiler.ts
 M tests/src/core/ContractCompiler.test.ts
```

## Claims I flag as unproved

- I did not re-run the brief's instrumented counting-`WeakMap` measurement. The ruling that the build-phase maps are never read is carried from the brief, corroborated by re-deriving the clock (`#visits` starts at 0 and every path leaves `#scope` at 1 or more, while `filled` starts at 0) and by the two controls, not independently re-measured.
- The comment's phrase "forever, in an artifact that only ever receives primitives" rests on reading the early return at `if (!isObject(value)) return plan(value)`. I did not measure retention with a heap instrument.
- The measurement that a shared child node reaching two object slots compiles to one node was taken on the guard family only (reads = 1 for `objectShape({ left: child, right: child })` and for `arrayShape(child)`). I did not measure the auditor or reporter families for that shape, so the added within-call case pins the guard alone; the existing shared-read case covers all three over the array chain.

## Deviation state

No deviation. No reader of the build-time memo was found that the brief's evidence missed, no existing test went red, and the `check` gate accepted the primary narrowing form.
