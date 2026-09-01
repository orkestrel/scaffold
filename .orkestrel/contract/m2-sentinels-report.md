# Unit m2-sentinels — returned report

## Outcome

The release peers are class-scope frozen sentinels, `#emptyIndex` is gone, and `#index` carries absence as `undefined`. Release, refusal, and replay behavior is unchanged. No deviation stopped the unit; one report-only guide finding follows.

## Touched files

- `/home/user/contract/src/core/ContractCompiler.ts` — the nine paired empty peers become `static readonly #` sentinels frozen in a static block beside their declarations; `#emptyIndex` is deleted and `#release` drops `#index` to `undefined`; `#discover` and `#locate` narrow the index through a coded `ContractError` ahead of every `recall`/`retain` dispatch.
- `/home/user/contract/tests/src/core/ContractCompiler.test.ts` — two added cases, no existing assertion changed.

Diffstat:

```
 src/core/ContractCompiler.ts            | 131 ++++++++++++++++++++++----------
 tests/src/core/ContractCompiler.test.ts |  52 +++++++++++++
 2 files changed, 142 insertions(+), 41 deletions(-)
```

## Test counts

Pre-change, at contract commit `1cd4ac8`, tree clean:

```
npx vitest run tests/src/core/ContractCompiler.test.ts tests/src/core/compilers.test.ts tests/src/core/integration.test.ts --config vite.config.ts --no-cache
Test Files  3 passed (3)
     Tests  346 passed (346)
```

The two added cases were written and run against the **unedited** source first, and both passed there (`tests/src/core/ContractCompiler.test.ts` alone: `Tests 23 passed (23)`). They pin behavior the change had to preserve, so neither can pass only because of my source edit.

Post-change, same command:

```
Test Files  3 passed (3)
     Tests  348 passed (348)   exit=0
```

Added case names:

- `keeps two released compilers answering their own declaration and settles a later one alone`
- `replays one settling refusal by identity from all seven getters, whichever one settled it`

Gates and observations, all run 2026-09-01 on the host:

| Command | Result |
| --- | --- |
| `npm run lint:check` | exit 0 |
| `npm run check` | exit 0 |
| `npx oxfmt --config .oxfmtrc.json --check src/core/ContractCompiler.ts tests/src/core/ContractCompiler.test.ts` | exit 0 |
| `npm run test:src:core` | `Tests 1296 passed (1296)`, exit 0 |
| `npm run test:setup` | `Tests 61 passed (61)`, exit 0 |
| `npm run test:policy` | `Tests 111 passed (111)`, exit 0 |
| `npm run test:guides` | `Tests 59 passed (59)`, exit 0 |

The m1 `builds no tracking ledger while a compiled family is assembled` case stayed green: it opens its counter after both compilers are constructed, so dropping the constructor's second `WeakMap` moves no figure it reads.

## Where the freeze landed

In a dedicated `static { … }` block placed immediately beneath the sentinel declarations, not in the class-tail `pinMembers` block. The tail block's comment is about prototype pinning, and putting the freeze beside what it freezes keeps each block on one subject. Each sentinel is frozen in a statement of its own with the return discarded, so the declared element type stays mutable and the peers remain assignable to the working fields.

## Unknowns answered

No test reflects on `ContractCompiler` static members or field counts. Searches covered `tests/` for `getOwnPropertyNames`, `getOwnPropertyDescriptors`, `Reflect.ownKeys`, `ContractCompiler.`, and `static`, plus targeted `getOwnPropertyNames(ContractCompiler)` and `ownKeys(ContractCompiler)` patterns (no hits). The only reflection on this class reads `ContractCompiler.prototype` (`tests/src/core/ContractCompiler.test.ts:49-64`), which the change does not touch; a `#` static is invisible to `getOwnPropertyNames` in any case.

## Claims I flag as unproved by a run

- **The sentinels are frozen at runtime.** They are `#` statics no code outside the class can reach, so the freeze has no observable consequence through the public surface and no test can read it. Criterion 3's "frozen" half rests on reading the static block. The only settling instrument is a temporary edit inside the file under verification, which the permission floor's plant rule keeps out of this unit.
- **The two new coded refusals are unreachable.** Criterion 7 states this for `#locate` and it holds for `#discover` too: a released compiler holds all six roots, so every family returns its ready root before locating anything, and a failed one rethrows at `#enter`. Both refusals are proven by reading, and both comments say so.

## Report-only finding (off-limits file)

`/home/user/contract/guides/contract.md:491` now over-claims for one member. It reads that "the owned graph, the node index, the order and every family plan are released through preconstructed peers". The node index is no longer released through a peer; it is dropped. Guide parity stays green (`test:guides` exit 0), because the sentence names no API and sits under no fence. Exact replacement for that sentence:

> After all six roots exist, the owned graph, the order and every family plan are released through shared frozen empty peers the class owns rather than per-instance ones, the node index is dropped outright because freezing does not reach a `WeakMap`'s writes, and what stays is the six roots, the optional frozen bundle, and terminal state.

## Review evidence

`git status --porcelain`:

```
 M src/core/ContractCompiler.ts
 M tests/src/core/ContractCompiler.test.ts
```

`dist/` is untouched and stale by design; no rebuild ran.

Source diff:

```diff
diff --git a/src/core/ContractCompiler.ts b/src/core/ContractCompiler.ts
index 1c3b53d..e774f95 100644
--- a/src/core/ContractCompiler.ts
+++ b/src/core/ContractCompiler.ts
@@ -133,6 +133,46 @@ export class ContractCompiler<
 	// answer, and nothing that outlives the walk that set them.
 	static #visits = 0
 	static #scope = 0
+	// The released state, shared by every compiler this class ever builds.
+	// `#release` assigns these in place of the working collections, so an instance
+	// allocates one collection per family instead of two and construction carries
+	// no empty peer of its own. Sharing them is safe because nothing writes to a
+	// released collection: every writer runs behind `#prepare`, which refuses
+	// after `#release` clears `#source`. The static block beneath freezes them, so
+	// a write that did reach one fails loudly at its own line rather than leaking
+	// a node of one compiler's graph into every other compiler's release.
+	static readonly #emptyStack: Array<
+		| { readonly operation: 'enter'; readonly shape: ContractShape }
+		| { readonly operation: 'exit'; readonly index: number }
+	> = []
+	static readonly #emptyNodes: ContractShape[] = []
+	static readonly #emptyOrder: number[] = []
+	static readonly #emptySchemas: JSONSchema[] = []
+	static readonly #emptyGuards: Array<Guard<unknown>> = []
+	static readonly #emptyParsers: Array<Parser<unknown>> = []
+	static readonly #emptyAudits: Array<
+		(value: unknown, path: readonly string[]) => readonly AuditFault[]
+	> = []
+	static readonly #emptyReports: Array<
+		(value: unknown, path: readonly string[]) => readonly Fault[]
+	> = []
+	static readonly #emptySeeds: Array<(random: RandomFunction) => unknown> = []
+
+	static {
+		// Frozen in a statement of its own, and the result discarded: `Object.freeze`
+		// returns a readonly view, so binding it back would retype the peers and
+		// stop them satisfying the mutable working fields they are assigned to.
+		INTRINSICS.freeze(ContractCompiler.#emptyStack)
+		INTRINSICS.freeze(ContractCompiler.#emptyNodes)
+		INTRINSICS.freeze(ContractCompiler.#emptyOrder)
+		INTRINSICS.freeze(ContractCompiler.#emptySchemas)
+		INTRINSICS.freeze(ContractCompiler.#emptyGuards)
+		INTRINSICS.freeze(ContractCompiler.#emptyParsers)
+		INTRINSICS.freeze(ContractCompiler.#emptyAudits)
+		INTRINSICS.freeze(ContractCompiler.#emptyReports)
+		INTRINSICS.freeze(ContractCompiler.#emptySeeds)
+	}
+
 	#source: ContractShape | undefined
 	#state:
 		| { readonly phase: 'ready' }
@@ -143,36 +183,27 @@ export class ContractCompiler<
 		| { readonly operation: 'enter'; readonly shape: ContractShape }
 		| { readonly operation: 'exit'; readonly index: number }
 	>
-	readonly #emptyStack: Array<
-		| { readonly operation: 'enter'; readonly shape: ContractShape }
-		| { readonly operation: 'exit'; readonly index: number }
-	>
 	// The prepared index. `#nodes[0]` is the owned root by construction, `#index`
 	// answers "which node is this child" by identity, and `#order` lists every
 	// node with its children already listed before it — so a family solves any
-	// bottom-up fact by reading it forwards once.
+	// bottom-up fact by reading it forwards once. The index is the one working
+	// field with no shared peer: `Object.freeze` reaches an array's writes and not
+	// a `WeakMap`'s, so a shared empty map would be a class-lifetime cache that
+	// any write could fill with the caller's own shapes. Release drops the map
+	// instead, and absence is `undefined`.
 	#nodes: ContractShape[]
-	readonly #emptyNodes: ContractShape[]
-	#index: WeakMap<ContractShape, number>
-	readonly #emptyIndex: WeakMap<ContractShape, number>
+	#index: WeakMap<ContractShape, number> | undefined
 	#order: number[]
-	readonly #emptyOrder: number[]
 	// One plan per family, each indexed by the same node index. A plan entry is a
 	// self-contained artifact for that node: it closes over the CHILD entries it
 	// needs, resolved while the family is built, so nothing a compiled artifact
 	// does at call time reaches back into the index this class later releases.
 	#schemas: JSONSchema[]
-	readonly #emptySchemas: JSONSchema[]
 	#guards: Array<Guard<unknown>>
-	readonly #emptyGuards: Array<Guard<unknown>>
 	#parsers: Array<Parser<unknown>>
-	readonly #emptyParsers: Array<Parser<unknown>>
 	#audits: Array<(value: unknown, path: readonly string[]) => readonly AuditFault[]>
-	readonly #emptyAudits: Array<(value: unknown, path: readonly string[]) => readonly AuditFault[]>
 	#reports: Array<(value: unknown, path: readonly string[]) => readonly Fault[]>
-	readonly #emptyReports: Array<(value: unknown, path: readonly string[]) => readonly Fault[]>
 	#seeds: Array<(random: RandomFunction) => unknown>
-	readonly #emptySeeds: Array<(random: RandomFunction) => unknown>
 	#schema: JSONSchema | undefined
 	#guard: Guard<unknown> | undefined
 	#parser: Parser<unknown> | undefined
@@ -190,25 +221,15 @@ export class ContractCompiler<
 		this.#source = shape
 		this.#state = { phase: 'ready' }
 		this.#stack = []
-		this.#emptyStack = []
 		this.#nodes = []
-		this.#emptyNodes = []
 		this.#index = new ContractCompiler.#weakMap()
-		this.#emptyIndex = new ContractCompiler.#weakMap()
 		this.#order = []
-		this.#emptyOrder = []
 		this.#schemas = []
-		this.#emptySchemas = []
 		this.#guards = []
-		this.#emptyGuards = []
 		this.#parsers = []
-		this.#emptyParsers = []
 		this.#audits = []
-		this.#emptyAudits = []
 		this.#reports = []
-		this.#emptyReports = []
 		this.#seeds = []
-		this.#emptySeeds = []
 		this.#schema = undefined
 		this.#guard = undefined
 		this.#parser = undefined
@@ -351,21 +372,22 @@ export class ContractCompiler<
 		this.#release()
 	}
 
-	// Assignment of preconstructed peers only. Nothing here calls a caller-mutable
-	// cleanup member and nothing here constructs a collection after the source was
-	// observed, so release cannot be redirected into leaving state behind.
+	// Assignment only: every working collection takes the class's shared frozen
+	// empty peer and the index is dropped outright. Nothing here calls a
+	// caller-mutable cleanup member and nothing here constructs a collection at
+	// all, so release cannot be redirected into leaving state behind.
 	#release(): void {
 		this.#source = undefined
-		this.#stack = this.#emptyStack
-		this.#nodes = this.#emptyNodes
-		this.#index = this.#emptyIndex
-		this.#order = this.#emptyOrder
-		this.#schemas = this.#emptySchemas
-		this.#guards = this.#emptyGuards
-		this.#parsers = this.#emptyParsers
-		this.#audits = this.#emptyAudits
-		this.#reports = this.#emptyReports
-		this.#seeds = this.#emptySeeds
+		this.#stack = ContractCompiler.#emptyStack
+		this.#nodes = ContractCompiler.#emptyNodes
+		this.#index = undefined
+		this.#order = ContractCompiler.#emptyOrder
+		this.#schemas = ContractCompiler.#emptySchemas
+		this.#guards = ContractCompiler.#emptyGuards
+		this.#parsers = ContractCompiler.#emptyParsers
+		this.#audits = ContractCompiler.#emptyAudits
+		this.#reports = ContractCompiler.#emptyReports
+		this.#seeds = ContractCompiler.#emptySeeds
 	}
 
 	// === Preparation
@@ -394,6 +416,18 @@ export class ContractCompiler<
 	}
 
 	#discover(root: ContractShape): void {
+		// Narrowed once at the door, because both dispatches below take their
+		// receiver type from this value. `#prepare` is the only caller and it
+		// refuses while the declaration is gone, so the walk always finds the map
+		// the constructor built; this refusal is what keeps that a statement the
+		// types carry rather than one a comment makes.
+		const known = this.#index
+		if (known === undefined) {
+			throw new ContractError('ContractCompiler: the prepared index is unavailable', {
+				code: 'structure',
+				context: { path: [], shape: 'contract' },
+			})
+		}
 		this.#stack[this.#stack.length] = { operation: 'enter', shape: root }
 		while (this.#stack.length > 0) {
 			// Popped by index and truncated by `length`, never through
@@ -414,10 +448,10 @@ export class ContractCompiler<
 			// A node reached a second time is already indexed, and the graph is
 			// acyclic by validation, so it is already finished too — which is exactly
 			// what makes one entry per unique node correct rather than merely cheap.
-			if (INTRINSICS.apply(INTRINSICS.recall, this.#index, [shape]) !== undefined) continue
+			if (INTRINSICS.apply(INTRINSICS.recall, known, [shape]) !== undefined) continue
 			const index = this.#nodes.length
 			this.#nodes[index] = shape
-			INTRINSICS.apply(INTRINSICS.retain, this.#index, [shape, index])
+			INTRINSICS.apply(INTRINSICS.retain, known, [shape, index])
 			this.#stack[this.#stack.length] = { operation: 'exit', index }
 			this.#schedule(shape)
 		}
@@ -463,7 +497,22 @@ export class ContractCompiler<
 	}
 
 	#locate(shape: ContractShape): number {
-		const index = INTRINSICS.apply(INTRINSICS.recall, this.#index, [shape])
+		// The receiver is narrowed BEFORE the dispatch. `INTRINSICS.apply` takes its
+		// receiver type from this argument rather than from the target, so a dropped
+		// index would leave `WeakMap.prototype.get` throwing a host `TypeError`
+		// through a door whose whole contract is that it publishes this package's
+		// error class. Defense in depth, not a live path: a released compiler holds
+		// all six roots, so every family returns its ready root before locating
+		// anything, and a failed one rethrows at `#enter` — which is why no
+		// reachable vector settles here and the guard still belongs.
+		const known = this.#index
+		if (known === undefined) {
+			throw new ContractError('ContractCompiler: the prepared index is unavailable', {
+				code: 'structure',
+				context: { path: [], shape: 'contract' },
+			})
+		}
+		const index = INTRINSICS.apply(INTRINSICS.recall, known, [shape])
 		if (index === undefined) {
 			throw new ContractError('ContractCompiler: a structural child is not in the prepared index', {
 				code: 'structure',
```

Test diff:

```diff
diff --git a/tests/src/core/ContractCompiler.test.ts b/tests/src/core/ContractCompiler.test.ts
index ad5963d..e60c009 100644
--- a/tests/src/core/ContractCompiler.test.ts
+++ b/tests/src/core/ContractCompiler.test.ts
@@ -137,6 +137,38 @@ describe('ContractCompiler', () => {
 		expect(compiler.generator).toBe(generator)
 	})
 
+	it('keeps two released compilers answering their own declaration and settles a later one alone', () => {
+		// Release hands every working collection to a peer the class owns rather
+		// than to one the instance built, so the question sharing raises is whether
+		// one compiler's release can reach another's answers. Two compilers driven
+		// past release through `contract` keep answering for their own declaration,
+		// and a third built afterwards refuses its own malformed declaration with
+		// its own coded error while leaving those answers intact.
+		const names = new ContractCompiler(objectShape({ name: stringShape({ min: 1 }) }))
+		const counts = new ContractCompiler(objectShape({ count: integerShape({ min: 0 }) }))
+
+		const named = names.contract
+		const counted = counts.contract
+
+		expect([named.is({ name: 'Ada' }), named.is({ count: 1 })]).toEqual([true, false])
+		expect([counted.is({ count: 1 }), counted.is({ name: 'Ada' })]).toEqual([true, false])
+		expect(named.parse({ name: 'Ada' })).toEqual({ name: 'Ada' })
+		expect(counted.parse({ count: 1 })).toEqual({ count: 1 })
+		expect(named.audit({ name: 1 })).toHaveLength(1)
+		expect(counted.audit({ count: 'x' })).toHaveLength(1)
+		expect(names.schema).not.toEqual(counts.schema)
+
+		const malformed: ContractShape = JSON.parse('{"type":"string","min":5,"max":1}')
+		const later = new ContractCompiler(malformed)
+		const error = captureContractError(() => later.contract)
+
+		expect(error.code).toBe('range')
+		expect(captureContractError(() => later.guard)).toBe(error)
+		expect([named.is({ name: 'Ada' }), counted.is({ count: 1 })]).toEqual([true, true])
+		expect(names.contract).toBe(named)
+		expect(counts.contract).toBe(counted)
+	})
+
 	it('compiles one entry per unique node, so a shared child emits one shared subschema', () => {
 		const child = objectShape({ id: stringShape() })
 		const shape = objectShape({
@@ -229,6 +261,26 @@ describe('ContractCompiler', () => {
 		expect(captureContractError(() => compiler.contract)).toBe(error)
 	})
 
+	it('replays one settling refusal by identity from all seven getters, whichever one settled it', () => {
+		// Settlement belongs to the lifecycle rather than to the door that reached
+		// it. A refusal adopted at `reporter` is the refusal `schema` and every
+		// other getter rethrows — the settling getter included — and none of them
+		// retries preparation against a compiler whose working state is gone.
+		const malformed: ContractShape = JSON.parse('{"type":"number","min":5,"max":1}')
+		const compiler = new ContractCompiler(malformed)
+
+		const error = captureContractError(() => compiler.reporter)
+
+		expect(error.code).toBe('range')
+		expect(captureContractError(() => compiler.schema)).toBe(error)
+		expect(captureContractError(() => compiler.guard)).toBe(error)
+		expect(captureContractError(() => compiler.parser)).toBe(error)
+		expect(captureContractError(() => compiler.auditor)).toBe(error)
+		expect(captureContractError(() => compiler.reporter)).toBe(error)
+		expect(captureContractError(() => compiler.generator)).toBe(error)
+		expect(captureContractError(() => compiler.contract)).toBe(error)
+	})
+
 	it('keeps separate compilers of one declaration independent', () => {
 		const shape = objectShape({ id: stringShape() })
 		const first = new ContractCompiler(shape)
```
