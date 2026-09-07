# Report — `d7n-pool-prep`

Wall clock: 2026-09-07T15:44:44Z to 2026-09-07T15:46:51Z.

## Item 1 — `repair --offline`

Summary line:

```
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` immediately after:

```
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

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 4e42d1d..6e0b85f 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -92,21 +92,27 @@ for (const entry of manifest) {
 		})
 
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
@@ -121,11 +127,18 @@ for (const entry of manifest) {
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
@@ -134,9 +147,12 @@ for (const entry of manifest) {
 						.map((fence) => fence.code)
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

No other change to the suite. The two already-strings `findMissing` calls (the import walk's
`statement.names` against `face.surface().map((symbol) => symbol.name)`, and the `names` against
`surface`) were left unchanged, per the brief.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed:

```
tests/setup.ts:12:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:15:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

Both diagnostics sit in `tests/setup.ts`, inside scope (a doc block under `tests/**`). Fix:

```diff
diff --git a/tests/setup.ts b/tests/setup.ts
index 89d9e46..04b1c8b 100644
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -9,10 +9,10 @@ import type { PoolEventMap } from '@src/core'
 // is this package's own event vocabulary, which names the second type argument
 // `createRecorders` cannot infer from an emitter.
 
-/** One observable lifecycle event name of a {@link PoolEventMap}. */
+/** Names one observable lifecycle event of a {@link PoolEventMap}. */
 export type PoolEvent = keyof PoolEventMap
 
-/** Every Pool lifecycle event, so a recorder bundle covers the whole event map. */
+/** Lists every Pool lifecycle event, so a recorder bundle covers the whole event map. */
 export const POOL_EVENTS: readonly PoolEvent[] = Object.freeze([
 	'create',
 	'acquire',
```

- `tests/setup.ts:12` (`policy/no-malformed-summary`): `One observable lifecycle event name of a
  {@link PoolEventMap}.` → `Names one observable lifecycle event of a {@link PoolEventMap}.`
- `tests/setup.ts:15` (`policy/no-malformed-summary`): `Every Pool lifecycle event, so a recorder
  bundle covers the whole event map.` → `Lists every Pool lifecycle event, so a recorder bundle
  covers the whole event map.`

Re-run of `npx oxlint --config .oxlintrc.json --deny-warnings .` after the fix printed no output
(exit 0). No `policy/no-banned-term` diagnostic appeared. `npm run test:policy` passed with no
`prose` failure naming a line in `guides/**` or `README.md`, so no substitution-table edit was
needed in those files.

## Item 4 — the bump

```diff
diff --git a/package.json b/package.json
index 93095a2..e0f1bc4 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
 	"name": "@orkestrel/pool",
-	"version": "0.0.10",
+	"version": "0.0.11",
```

(`package.json`'s other change — the `docs` script row — came from `repair --offline` in item 1,
not from this item.) `package-lock.json` was not edited.

## Acceptance criteria

### Criterion 1

`git status --short` after every item:

```
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

This is the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3's
diagnostic file), and nothing else.

### Criterion 2

`npm run format:check`:

```
Checking formatting...

All matched files use the correct format.
Finished in 5098ms on 39 files using 4 threads.
```

exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0.

`npm run check`:

```
> @orkestrel/pool@0.0.11 check
> tsc --noEmit --project tsconfig.json && npm run check:src


> @orkestrel/pool@0.0.11 check:src
> npm run check:src:core


> @orkestrel/pool@0.0.11 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

exit 0.

### Criterion 3

`npm run test:guides`:

```
 Test Files  1 passed (1)
      Tests  25 passed (25)
```

exit 0. (P21's five `TS2345` failures and seven test failures are gone; the record-shape adaptation
in item 2 resolved them.)

`npm run test:policy`:

```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

exit 0.

`npm run test:config`:

```
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```

exit 0.

### Criterion 4

`npm run docs`, verbatim:

```
guides/pool.md function createPool: guide "Construct a distinct `PoolInterface` from resource lifecycle hooks." source "Creates a resource pool with optional bounded capacity, unique ownership, and FIFO settlement."
guides/pool.md class Pool: guide "The unique-record FIFO lifecycle engine." source "Represents a capacity-aware resource pool whose opaque ownership records preserve FIFO settlement, cancellation, exact lease release, and deterministic teardown under concurrent hooks."
guides/pool.md class PoolError: guide "A coded failure retaining a hostile-safe cause and structured context." source "Represents a stable, machine-readable pool failure with the original cause and structured context."
guides/pool.md function isPoolError: guide "Total guard for `PoolError`, including hostile proxy inputs." source "Tests whether an unknown value is a `PoolError`, returning `false` for hostile proxies."
guides/pool.md function isPoolMax: guide "Accept only positive safe integers as explicit pool maxima." source "Tests whether a value is a valid finite pool maximum."
guides/pool.md function isPoolSignal: guide "Total native `AbortSignal` guard for the acquire boundary." source "Tests whether a value is a native `AbortSignal`, returning `false` for hostile proxies."
guides/pool.md type PoolCode: guide "`invalid`, `destroyed`, `create`, or `cleanup`." source "Names the machine-readable failure codes produced by `PoolError`."
guides/pool.md interface PoolContext: guide "Rejected input or distinct aggregate destroy-hook failures." source "Represents the structured context attached to a `PoolError`."
guides/pool.md interface PoolErrorOptions: guide "Code, optional cause, and optional context for `PoolError`." source "Represents the construction options for `PoolError`."
guides/pool.md type PoolEventMap: guide "`create`, `acquire`, `release`, and `destroy` lifecycle signals." source "Represents the observable resource lifecycle events emitted by a `PoolInterface`."
guides/pool.md interface PoolToken: guide "A unique lease with readonly `value` and idempotent `release()`." source "Represents a unique lease over one pool-owned resource record."
guides/pool.md interface PoolOptions: guide "Create, destroy, validation, capacity, and emitter options." source "Represents the resource lifecycle options for `Pool` and `createPool`."
guides/pool.md interface PoolInterface: guide "Count/emitter properties plus `acquire`, `clear`, and `destroy`." source "Represents a FIFO resource pool with optional bounded capacity and deterministic teardown."
guides/pool.md PoolInterface.acquire: guide absent source "Queues and leases one resource in FIFO settlement order."
guides/pool.md PoolInterface.clear: guide absent source "Destroys the records that are idle at this call's synchronous snapshot."
guides/pool.md PoolInterface.destroy: guide absent source "Tears down the pool permanently and returns its stable completion barrier."
guides/pool.md PoolToken.release: guide absent source "Gives this exact lease back once; subsequent calls are no-ops."
guides/pool.md pitch: readme absent tagline "A typed resource pool with optional bounded capacity, unique ownership, FIFO settlement, validated reuse, caller-owned cancellation, explicit cleanup failures, and a stable event-driven teardown barrier. It has no warm floor, eviction timer, acquire timeout, or polling loop."
rows read: 1, disagreements found: 18
```

exit 1 (expected; this worklist is the converge unit's).

## Ancillary decisions

- `tests/setup.ts` rewrites kept every fact the original sentences carried, changing only the
  opening verb form, per the brief's instruction for a voice-rule fix.
- No `policy/no-banned-term` diagnostic and no `guides/**` or `README.md` prose-sweep hit occurred,
  so no substitution-table edit landed in those files; they remain the converge unit's.
