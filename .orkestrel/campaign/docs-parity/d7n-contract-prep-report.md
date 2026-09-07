# Report — P.1 `d7n-contract-prep`

Every item landed. Every acceptance criterion reads green in `/home/user/fleet/contract`, and `npm run docs` reads the expected red with its worklist. Wall clock 2026-09-07T14:59:44Z to 2026-09-07T15:19:48Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`, exit 0.

```text
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` directly after, matching the P21 list exactly:

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

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 44ed9b9..cdb5ebd 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -108,21 +108,27 @@ for (const entry of manifest) {
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
@@ -137,22 +143,32 @@ for (const entry of manifest) {
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
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
@@ -230,7 +246,11 @@ describe('runtime parity', () => {
 	const guideText = requireValue(files[CORE_GUIDE], `Missing file: ${CORE_GUIDE}`)
 	const contractGuide = createGuide(guideText)
 	const documented = new Map<string, readonly string[]>()
-	for (const group of contractGuide.methods()) documented.set(group.interface, group.methods)
+	for (const group of contractGuide.methods())
+		documented.set(
+			group.interface,
+			group.methods.map((method) => method.name),
+		)
 
 	it('enumerates every class the barrel publishes', () => {
 		// The per-class checks below are worth exactly as much as this list is
```

The `runtime parity` site at the committed tree's line 233 is the fourth `check` error the brief's P21 reading names (`tests/guides.test.ts(233,79)`). It sits outside item 2's site list, so it is recorded here as a decided ancillary matter: the file is owned, criterion 2 requires `npm run check` to exit 0, and the edit is the same record-to-name mapping as the rest. It changes no assertion's value — `documented.get('ShapeValidatorInterface')` still equals `['validate']` at the control assertion.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` reported before the fixes, matching P20's reading:

| File                                     | `policy/no-malformed-summary` | `policy/no-banned-term` |
| ---------------------------------------- | ----------------------------- | ----------------------- |
| `tests/setup.ts`                         | 108                           | 6                       |
| `tests/setupServer.ts`                   | 4                             | -                       |
| `src/core/helpers.ts`                    | 1                             | -                       |
| `tests/src/core/compilers.test.ts`       | -                             | 5                       |
| `tests/src/core/shapers.test.ts`         | -                             | 2                       |
| `tests/src/core/ContractCompiler.test.ts`| -                             | 1                       |
| `tests/src/core/ShapeValidator.test.ts`  | -                             | 1                       |
| `tests/src/core/inferers.test.ts`        | -                             | 1                       |
| `tests/src/core/integration.test.ts`     | -                             | 1                       |

`src/core/helpers.ts` carried the `name` variant of the summary rule (`State what the symbol does without naming preview in the first sentence.`); `tests/setup.ts:568` and `tests/setup.ts:3377` carried it too, for `captured` and `Equal`. Every other summary diagnostic was the `voice` variant. No diagnostic named an off-limits file.

Every site as a before/after pair:

```diff
diff --git a/src/core/helpers.ts b/src/core/helpers.ts
index 6693a0d..7cac168 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -2157 +2157 @@ export function sanitizeDepth(value: number | undefined): number {
- * Renders a short, safe, TOTAL preview of an unknown value for a {@link Fault}'s
+ * Renders an unknown value as a short, safe, TOTAL string for a {@link Fault}'s
diff --git a/tests/setup.ts b/tests/setup.ts
index 4300755..a3cff64 100644
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -146 +146 @@ afterEach(() => {
- * Run an operation expected to throw a {@link ContractError} and return that
+ * Runs an operation expected to throw a {@link ContractError} and returns that
@@ -181 +181 @@ export function captureContractError(operation: () => unknown): ContractError {
- * One caller-reachable property a terminal path must never depend on.
+ * Names one caller-reachable property a terminal path must never depend on.
@@ -208,2 +208,2 @@ export interface TerminalIntrinsic {
- * Replace one data-valued intrinsic member for a synchronous operation and
- * restore its exact own descriptor afterward.
+ * Replaces one data-valued intrinsic member for a synchronous operation and
+ * restores its exact own descriptor afterward.
@@ -256 +256 @@ export function replaceIntrinsic<T>(
- * Build a thrower that raises one exact caller value.
+ * Builds a thrower that raises one exact caller value.
@@ -285 +285 @@ export function throwSentinel(sentinel: unknown): () => never {
- * A caller-installed protocol hook that refuses every value.
+ * Refuses every value, as a caller-installed protocol hook.
@@ -308,2 +308,2 @@ export function denyRecognition(): boolean {
- * The outcome an instrument's UNARMED pass reports so the armed pass alone
- * decides the sweep's verdict.
+ * Returns the outcome an instrument's UNARMED pass reports, so the armed pass
+ * alone decides the sweep's verdict.
@@ -335,2 +335,2 @@ export function createInertOutcome<T>(value: T): Result<T> {
- * The replaceable global constructors a terminal path may not build its own
- * working state through.
+ * Lists the replaceable global constructors a terminal path may not build its
+ * own working state through.
@@ -344 +344 @@ export function createInertOutcome<T>(value: T): Result<T> {
- * same rule and were simply undrawn.
+ * same rule and were undrawn.
@@ -374,2 +374,2 @@ export const TERMINAL_CONSTRUCTORS: readonly TerminalIntrinsic[] = Object.freeze
- * The symbol-keyed protocol hooks a terminal path may not dispatch through
- * unguarded.
+ * Lists the symbol-keyed protocol hooks a terminal path may not dispatch
+ * through unguarded.
@@ -421,2 +421,2 @@ export const TERMINAL_HOOKS: readonly TerminalIntrinsic[] = Object.freeze([
- * Install an accessor for a property a prototype does not own, for one
- * synchronous operation, and remove it afterward.
+ * Installs an accessor for a property a prototype does not own, for one
+ * synchronous operation, and removes it afterward.
@@ -468,2 +468,2 @@ export function pollutePrototype<T>(
- * A prototype pollution a caller-supplied source arms from inside its own
- * reflective trap, once the operation walking it has already begun.
+ * Arms a prototype pollution from inside a caller-supplied source's own
+ * reflective trap, after the operation walking it has already begun.
@@ -533 +533 @@ export class ReentrantPollution {
- * Redirect one {@link TerminalIntrinsic} to a throwing sentinel for the
+ * Redirects one {@link TerminalIntrinsic} to a throwing sentinel for the
@@ -569 +569 @@ export function redirectIntrinsic<T>(
- * The reflective operations every redirection instrument performs, captured
+ * Holds the reflective operations every redirection instrument performs, taken
@@ -598,2 +598,2 @@ export const captured = Object.freeze({
- * Replaceable string-keyed members of the host intrinsics, drawn as one
- * population rather than sampled by kind.
+ * Lists the replaceable string-keyed members of the host intrinsics, drawn as
+ * one population rather than sampled by kind.
@@ -754,2 +754,2 @@ export const TERMINAL_MEMBERS: readonly TerminalIntrinsic[] = Object.freeze(
- * Caller-writable members on the PROTOTYPES of the classes this package
- * exports, derived by reflection rather than listed.
+ * Collects the caller-writable members on the PROTOTYPES of the classes this
+ * package exports, derived by reflection rather than listed.
@@ -816,2 +816,2 @@ export const OWNED_MEMBERS: readonly TerminalIntrinsic[] = Object.freeze(
- * Replace the getter of an EXISTING accessor member for one synchronous
- * operation and restore its exact descriptor afterward.
+ * Replaces the getter of an EXISTING accessor member for one synchronous
+ * operation and restores its exact descriptor afterward.
@@ -860 +860 @@ export function replaceAccessor<T>(
-/** A lying membership answer that refuses once a fixed amount of work has happened. */
+/** Represents a lying membership answer that refuses after a fixed amount of work. */
@@ -869 +869 @@ export interface WorkBoundInterface {
- * Build a work-bounded lying membership answer.
+ * Builds a work-bounded lying membership answer.
@@ -877 +877 @@ export interface WorkBoundInterface {
- * all of them, and a suite that arms one simply hangs. This makes
+ * all of them, and a suite that arms one hangs. This makes
@@ -905 +905 @@ export function createWorkBound(limit: number, overflow: unknown): WorkBoundInte
- * One redirect that answers plausibly instead of throwing.
+ * Represents one redirect that answers plausibly instead of throwing.
@@ -1267,2 +1267,2 @@ export const TERMINAL_LIES: readonly TerminalLie[] = Object.freeze([
- * Install one {@link TerminalLie} for the duration of a synchronous operation
- * and restore the exact own descriptor afterward.
+ * Installs one {@link TerminalLie} for the duration of a synchronous operation
+ * and restores the exact own descriptor afterward.
@@ -1301 +1301 @@ export function lieIntrinsic<T>(lie: TerminalLie, operation: (armed: boolean) =>
- * Name every row whose control answers `true` while that row is NOT armed.
+ * Names every row whose control answers `true` while that row is NOT armed.
@@ -1346 +1346 @@ export function findVacuousControls(lies: readonly TerminalLie[]): readonly stri
- * Name every row whose control reports a lie while the member behaves honestly.
+ * Names every row whose control reports a lie while the member behaves honestly.
@@ -1402 +1402 @@ export function findInstallationControls(lies: readonly TerminalLie[]): readonly
- * Fingerprint a published value's ownership facts through captured reflection.
+ * Fingerprints a published value's ownership facts through captured reflection.
@@ -1444,2 +1444,2 @@ export function fingerprintOwnership(value: unknown, ancestors: readonly object[
- * One public entry of the core barrel, paired with what its contract permits it
- * to publish when its path fails.
+ * Represents one public entry of the core barrel, paired with what its contract
+ * permits it to publish when its path fails.
@@ -1462 +1462 @@ export interface PublicDoor {
- * Build the public-door registry every redirection sweep drives.
+ * Builds the public-door registry every redirection sweep drives.
@@ -1671,2 +1671,2 @@ export function publicDoors(): readonly PublicDoor[] {
- * An object declaration whose property map rewrites the graph the SECOND time
- * it is enumerated.
+ * Provides an object declaration whose property map rewrites the graph the
+ * SECOND time it is enumerated.
@@ -1724,3 +1724,4 @@ export class LateMutation {
- * The own members ECMA-262 20.1.3 requires on every realm's `Object.prototype`
- * — the exact anchor `matchesRecordBrand` identifies a foreign realm by, and
- * therefore the exact set a prototype forgery has to carry.
+ * Lists the own members ECMA-262 20.1.3 requires on every realm's
+ * `Object.prototype` — the exact anchor `matchesRecordBrand` identifies a
+ * foreign realm by, and therefore the exact set a prototype forgery has to
+ * carry.
@@ -1739,2 +1740,2 @@ export const RECORD_BRAND_MEMBERS: readonly string[] = Object.freeze([
- * Stamp a prototype with this realm's REAL value for every mandated member it
- * does not already own, and reparent it to `null`, so it satisfies the record
+ * Stamps a prototype with this realm's REAL value for every mandated member it
+ * does not already own, and reparents it to `null`, so it satisfies the record
@@ -1781,2 +1782,2 @@ export function forgeRecordBrand(prototype: object): object {
- * Stamp a prototype with `undefined`-valued mandated members and reparent it to
- * `null` — the cheapest forgery, retained as a named control.
+ * Stamps a prototype with `undefined`-valued mandated members and reparents it
+ * to `null` — the cheapest forgery, retained as a named control.
@@ -1814 +1815 @@ export function forgeBlankBrand(prototype: object): object {
-/** A structurally valid string declaration with a non-record class brand. */
+/** Represents a structurally valid string declaration with a non-record class brand. */
@@ -1821,2 +1822,3 @@ export class StringDeclaration implements StringShape {
- * A structurally valid string declaration whose class prototype is reparented
- * to `null`, so its instances satisfy the retired two-link brand test.
+ * Represents a structurally valid string declaration whose class prototype is
+ * reparented to `null`, so its instances satisfy the retired two-link brand
+ * test.
@@ -1836,2 +1838,3 @@ Object.setPrototypeOf(NullBaseDeclaration.prototype, null)
- * A string declaration whose class prototype is reparented AND stamped with the
- * mandated realm members, while a live prototype method survives on it.
+ * Represents a string declaration whose class prototype is reparented AND
+ * stamped with the mandated realm members, while a live prototype method
+ * survives on it.
@@ -1872,2 +1875,3 @@ forgeRecordBrand(ForgedBrandDeclaration.prototype)
- * A string declaration whose forged prototype owns EXACTLY the mandated realm
- * members, with its live behavior carried on the instance instead.
+ * Represents a string declaration whose forged prototype owns EXACTLY the
+ * mandated realm members, with its live behavior carried on the instance
+ * instead.
@@ -1894,2 +1898,2 @@ forgeRecordBrand(StrippedBrandDeclaration.prototype)
- * A string declaration whose forged prototype carries the mandated names with
- * NO values — the control the function-value rule must refuse.
+ * Represents a string declaration whose forged prototype carries the mandated
+ * names with NO values — the control the function-value rule must refuse.
@@ -1917,2 +1921,3 @@ forgeBlankBrand(BlankBrandDeclaration.prototype)
- * A string declaration whose class prototype is left exactly as JavaScript
- * built it — the untouched control for {@link createProxiedBrandDeclaration}.
+ * Represents a string declaration whose class prototype is left exactly as
+ * JavaScript built it — the untouched control for
+ * {@link createProxiedBrandDeclaration}.
@@ -1931 +1936 @@ export class ProxiedBrandDeclaration implements StringShape {
- * Create a string declaration whose prototype is a `Proxy` over an UNTOUCHED
+ * Creates a string declaration whose prototype is a `Proxy` over an UNTOUCHED
@@ -1980 +1985 @@ export function createProxiedBrandDeclaration(): StringShape {
-/** Mutable scalar carrier used to detect forbidden RegExp coercion and retention. */
+/** Carries a mutable scalar that detects forbidden RegExp coercion and retention. */
@@ -2016 +2021 @@ export class PatternCarrier {
-/** A type-correct string shape carrying one hostile RegExp scalar population. */
+/** Carries one hostile RegExp scalar population on a type-correct string shape. */
@@ -2050,2 +2055,2 @@ export class PatternFixture {
- * A type-correct string shape whose genuine frozen `RegExp` scalars answer one
- * `source` observation each and refuse every later one.
+ * Represents a type-correct string shape whose genuine frozen `RegExp` scalars
+ * answer one `source` observation each and refuse every later one.
@@ -2099 +2104 @@ export class SingleReadPattern {
-/** Factory callback that gives a fixture source access to its live population. */
+/** Represents a factory callback giving a fixture source access to its live population. */
@@ -2104 +2109 @@ export type RetentionFactory<TSource, TPopulation extends object> = (
-/** Stateful caller-owned population whose retained target can be released. */
+/** Holds a stateful caller-owned population whose retained target can be released. */
@@ -2135 +2140 @@ export class RetentionFixture<TSource, TPopulation extends object> {
- * Create a shape population for terminal working-state retention proofs.
+ * Creates a shape population for terminal working-state retention proofs.
@@ -2175 +2180 @@ export function createShapeRetention(
- * Create a union population for terminal working-state retention proofs.
+ * Creates a union population for terminal working-state retention proofs.
@@ -2220 +2225 @@ export function createVariantRetention(
-/** Schema retention fixture with its exact genuine traversal failure. */
+/** Pairs a schema retention fixture with its exact genuine traversal failure. */
@@ -2227 +2232 @@ export interface SchemaRetentionFixture {
- * Create a schema population for terminal working-state retention proofs.
+ * Creates a schema population for terminal working-state retention proofs.
@@ -2257 +2262 @@ export function createSchemaRetention(label: string, invalid: boolean): SchemaRe
- * Execute one synchronous operation with a replacement string-iterator getter.
+ * Executes one synchronous operation with a replacement string-iterator getter.
@@ -2286 +2291 @@ export function replaceStringIterator<T>(replacement: () => unknown, operation:
- * Execute one synchronous operation with a replacement string-slice getter.
+ * Executes one synchronous operation with a replacement string-slice getter.
@@ -2315 +2320 @@ export function replaceStringSlice<T>(replacement: () => unknown, operation: ()
- * Create a schema with one present-but-undefined structural keyword.
+ * Creates a schema with one present-but-undefined structural keyword.
@@ -2327 +2332 @@ export function createUndefinedSchema(keyword: 'items' | 'additionalProperties')
- * A genuine `Array` exotic object that is also a `JSONSchema`.
+ * Represents a genuine `Array` exotic object that is also a `JSONSchema`.
@@ -2350 +2355 @@ export class ArrayRootSchema extends Array<JSONSchema> implements JSONSchema {
- * A `SampleMemo` carried by a class instance rather than by the plain record
+ * Carries a `SampleMemo` on a class instance rather than on the plain record
@@ -2365 +2370 @@ export class ClassSampleMemo implements SampleMemo {
-/** A generic readonly tree used by cross-module integration fixtures. */
+/** Represents a generic readonly tree used by cross-module integration fixtures. */
@@ -2374 +2379 @@ export interface Tree<T> {
- * Build a complete two-child tree from a value callback.
+ * Builds a complete two-child tree from a value callback.
@@ -2388 +2393 @@ export function buildTree<T>(value: () => T, depth: number): Tree<T> {
- * Throw from a deliberately hostile fixture operation.
+ * Throws from a deliberately hostile fixture operation.
@@ -2402 +2407 @@ export function throwHostileAccess(): never {
- * Advance an infinite numeric iterator by one entry.
+ * Advances an infinite numeric iterator by one entry.
@@ -2416 +2421 @@ export function advanceInfiniteIterable(): IteratorResult<number> {
- * Return an infinite iterator from its iterable protocol method.
+ * Returns an infinite iterator from its iterable protocol method.
@@ -2431 +2436 @@ export function iterateInfiniteIterable(this: IterableIterator<number>): Iterabl
- * Create an object Proxy whose access has been permanently revoked.
+ * Creates an object Proxy whose access has been permanently revoked.
@@ -2448 +2453 @@ export function createRevokedProxy(): object {
- * Create an array Proxy whose access has been permanently revoked.
+ * Creates an array Proxy whose access has been permanently revoked.
@@ -2467 +2472 @@ export function createRevokedArrayProxy<T = unknown>(): readonly T[] {
- * Create a record with an own getter that throws whenever read.
+ * Creates a record with an own getter that throws whenever read.
@@ -2493 +2498 @@ export function createThrowingGetter(key = 'value'): Readonly<Record<string, unk
- * Create a JSON-readable object whose prototype inspection throws.
+ * Creates a JSON-readable object whose prototype inspection throws.
@@ -2517 +2522 @@ export function createThrowingPrototype(reason: unknown): object {
- * Create a record whose own getter returns a different value on every read.
+ * Creates a record whose own getter returns a different value on every read.
@@ -2549 +2554 @@ export function createStatefulGetter(): Readonly<Record<string, unknown>> {
- * Create an array whose own `slice` reports elements it does not hold.
+ * Creates an array whose own `slice` reports elements it does not hold.
@@ -2573 +2578 @@ export function createUnstableArray(): readonly unknown[] {
- * Create an object whose own-key reflection traps always throw.
+ * Creates an object whose own-key reflection traps always throw.
@@ -2594 +2599 @@ export function createHostileKeys(): object {
- * Build an alternating array-and-record nest around a string leaf.
+ * Builds an alternating array-and-record nest around a string leaf.
@@ -2613 +2618 @@ export function buildDeepNest(depth: number): unknown {
- * Build a machine-scale literal vocabulary — larger than the engine's
+ * Builds a machine-scale literal vocabulary — larger than the engine's
@@ -2639 +2644 @@ export function buildWideVocabulary(count = 200_000): readonly string[] {
- * Build a finite array-shape nest at an exact depth.
+ * Builds a finite array-shape nest at an exact depth.
@@ -2658 +2663 @@ export function buildDeepShape(depth: number): ContractShape {
- * Build a shared-child shape DAG whose compiled expansion doubles per level.
+ * Builds a shared-child shape DAG whose compiled expansion doubles per level.
@@ -2683 +2688 @@ export function buildSharedDagShape(levels: number): ContractShape {
-/** A declaration, a value graph walking it, and the tally of nodes the walk read. */
+/** Pairs a declaration, a value graph walking it, and the tally of nodes the walk read. */
@@ -2694 +2699 @@ export interface CountedGraphInterface {
- * Build a counted array/record value graph and the declaration that walks it.
+ * Builds a counted array/record value graph and the declaration that walks it.
@@ -2756 +2761 @@ export function buildCountedGraph(levels: number, shared: boolean): CountedGraph
- * Build a two-slot object graph over one authored child node and the tally of
+ * Builds a two-slot object graph over one authored child node and the tally of
@@ -2802 +2807 @@ export function buildCountedSlots(shared: boolean): CountedGraphInterface {
- * Create a plain record with one non-enumerable own property.
+ * Creates a plain record with one non-enumerable own property.
@@ -2828 +2833 @@ export function createNonEnumerableRecord(
- * Build a record whose `self` property points back to the record.
+ * Builds a record whose `self` property points back to the record.
@@ -2845 +2850 @@ export function buildCyclicRecord(): Readonly<Record<string, unknown>> {
- * Build an array whose only entry points back to the array.
+ * Builds an array whose only entry points back to the array.
@@ -2862 +2867 @@ export function buildCyclicArray(): readonly unknown[] {
- * Build a three-slot sparse array with only its middle entry populated.
+ * Builds a three-slot sparse array with only its middle entry populated.
@@ -2879 +2884 @@ export function buildSparseArray(): readonly unknown[] {
-/** Hostile native-maximum sparse-array fixture with its indexed source probes. */
+/** Pairs a hostile native-maximum sparse-array fixture with its indexed source probes. */
@@ -2888 +2893 @@ export interface NativeMaximumSparseArrayFixture<T> {
- * Create an array-branded hostile source that advertises the native maximum
+ * Creates an array-branded hostile source that advertises the native maximum
@@ -2946 +2951 @@ export function createNativeMaximumSparseArray<T>(): NativeMaximumSparseArrayFix
- * Create a record whose prototype is `null` — a plain record that no realm's
+ * Creates a record whose prototype is `null` — a plain record that no realm's
@@ -2964 +2969 @@ export function createNullPrototypeRecord(): Readonly<Record<string, unknown>> {
- * Create an instance of a user-defined class — an exotic, non-plain object no
+ * Creates an instance of a user-defined class — an exotic, non-plain object no
@@ -2982 +2987 @@ export function createClassInstance(): object {
- * Create a self-iterating iterator that can be consumed only once.
+ * Creates a self-iterating iterator that can be consumed only once.
@@ -2998 +3003 @@ export function createOneShotIterable(): IterableIterator<number> {
- * Create an iterator that yields zero forever.
+ * Creates an iterator that yields zero forever.
@@ -3016,2 +3021,2 @@ export function createInfiniteIterable(): IterableIterator<number> {
- * A broad, frozen spread of values for exercising the package's whole-value
- * invariants exhaustively — parse↔guard soundness (see
+ * Holds a broad, frozen spread of values for exercising the package's
+ * whole-value invariants exhaustively — parse↔guard soundness (see
@@ -3102 +3107 @@ export const SOUNDNESS_SAMPLE: readonly unknown[] = Object.freeze([
- * Return the parse↔guard soundness violations of a (guard, parser) pair over
+ * Returns the parse↔guard soundness violations of a (guard, parser) pair over
@@ -3128 +3133 @@ export function soundnessViolations<T>(
-/** Deferred declaration defect used by the validator precedence corpus. */
+/** Names a deferred declaration defect used by the validator precedence corpus. */
@@ -3132 +3137 @@ export type ShapeValidationDefect = 'domain' | 'cycle' | 'structure'
- * Build a fresh object-shape graph carrying the requested deferred defects.
+ * Builds a fresh object-shape graph carrying the requested deferred defects.
@@ -3159 +3164 @@ export function createShapeValidationCase(order: readonly ShapeValidationDefect[
-/** One shape kind's declared separation between its compiled parser's domain and its compiled guard's. */
+/** Declares one shape kind's separation between its compiled parser's domain and its compiled guard's. */
@@ -3168 +3173,2 @@ export interface ShapeSeparation {
- * Exhaustive test-only evidence for every contract-shape kind's parse-versus-guard separation.
+ * Records exhaustive test-only evidence for every contract-shape kind's
+ * parse-versus-guard separation.
@@ -3198 +3204 @@ export const SHAPE_SEPARATIONS: Readonly<Record<ContractShape['category'], Shape
-/** Every `stringShape` variation: plain, min-only, max-only, min+max, described. */
+/** Lists every `stringShape` variation: plain, min-only, max-only, min+max, described. */
@@ -3210,2 +3216,3 @@ export function stringShapeVariations(): ReadonlyArray<readonly [string, Contrac
- * Every `numberShape` / `integerShape` variation: plain, bounded, integer,
- * bounded integer, and an integer with fractional (but non-empty) bounds.
+ * Lists every `numberShape` / `integerShape` variation: plain, bounded,
+ * integer, bounded integer, and an integer with fractional (but non-empty)
+ * bounds.
@@ -3223 +3230 @@ export function numberShapeVariations(): ReadonlyArray<readonly [string, Contrac
-/** The single `booleanShape` variation. */
+/** Lists the single `booleanShape` variation. */
@@ -3228 +3235 @@ export function booleanShapeVariations(): ReadonlyArray<readonly [string, Contra
-/** The single `nullShape` variation. */
+/** Lists the single `nullShape` variation. */
@@ -3233 +3240 @@ export function nullShapeVariations(): ReadonlyArray<readonly [string, ContractS
-/** Every `literalShape` variation: single/multi string, number, boolean, mixed, described. */
+/** Lists every `literalShape` variation: single/multi string, number, boolean, mixed, described. */
@@ -3245 +3252 @@ export function literalShapeVariations(): ReadonlyArray<readonly [string, Contra
-/** The single `jsonShape` variation. */
+/** Lists the single `jsonShape` variation. */
@@ -3251 +3258 @@ export function jsonShapeVariations(): ReadonlyArray<readonly [string, ContractS
- * Every leaf-kind × variation pair, flattened — string, number, boolean,
+ * Lists every leaf-kind × variation pair, flattened — string, number, boolean,
@@ -3266 +3273 @@ export function leafShapeVariations(): ReadonlyArray<readonly [string, ContractS
- * Build a nested, all-kinds composite shape — an object combining every
+ * Builds a nested, all-kinds composite shape — an object combining every
@@ -3312 +3319,4 @@ export function compositeShape(depth = 2): ContractShape {
-/** A small curated set of values that satisfy an unconstrained shape of the given leaf kind. */
+/**
+ * Returns a small curated set of values that satisfy an unconstrained shape of
+ * the given leaf kind.
+ */
@@ -3332 +3342,4 @@ export function validSamplesFor(shape: ContractShape): readonly unknown[] {
-/** A small curated set of values that violate an unconstrained shape of the given leaf kind. */
+/**
+ * Returns a small curated set of values that violate an unconstrained shape of
+ * the given leaf kind.
+ */
@@ -3355 +3368 @@ export function invalidSamplesFor(shape: ContractShape): readonly unknown[] {
- * Compile a widened `ContractShape` into a contract without letting
+ * Compiles a widened `ContractShape` into a contract without letting
@@ -3357,2 +3370,2 @@ export function invalidSamplesFor(shape: ContractShape): readonly unknown[] {
- * `ContractShape` union — a caller holding only the widened type (e.g. from
- * {@link compositeShape}) would otherwise trigger an excessively-deep type
+ * `ContractShape` union — a caller holding only the widened type (for example
+ * from {@link compositeShape}) would otherwise trigger an excessively-deep type
@@ -3375 +3388 @@ export function compileWidenedContract<S extends ContractShape>(
-// expected type (e.g. a deep structural snapshot lock).
+// expected type (for example a deep structural snapshot lock).
@@ -3378,3 +3391,3 @@ export function compileWidenedContract<S extends ContractShape>(
- * Strict type-level equality — `true` only when `X` and `Y` are identical types
- * (mutual assignability is NOT enough; e.g. `{ a: string }` and `{ a: string; b?: never }`
- * are mutually assignable but not `Equal`).
+ * Compares two types for strict identity — `true` only when `X` and `Y` are the
+ * same type (mutual assignability is NOT enough; for example `{ a: string }`
+ * and `{ a: string; b?: never }` are mutually assignable but not identical).
@@ -3389 +3402 @@ export type Equal<X, Y> =
-/** Compile-time assertion — fails to typecheck unless `T` is exactly `true`. */
+/** Asserts at compile time — fails to typecheck unless `T` is exactly `true`. */
@@ -3394 +3407 @@ export type Expect<T extends true> = T
-/** The generate → is → parse readings a caller asserts the lockstep from. */
+/** Holds the generate → is → parse readings a caller asserts the lockstep from. */
@@ -3432 +3445 @@ export function buildLockstep<S extends ContractShape>(shape: S, seed: number):
-/** The JSON roundtrip readings a caller asserts byte-for-byte fidelity from. */
+/** Holds the JSON roundtrip readings a caller asserts byte-for-byte fidelity from. */
@@ -3471 +3484 @@ export function buildJSONRoundtrip<S extends ContractShape>(
- * Build one inert `'type'` fault for a report fixture.
+ * Builds one inert `'type'` fault for a report fixture.
@@ -3487 +3500 @@ export function buildTypeFault(expected: FaultKind): Fault {
- * Project a fault report to the refinement each entry violated.
+ * Projects a fault report to the refinement each entry violated.
@@ -3512 +3525 @@ export function faultsToConstraints(
- * A valid string shape node that counts how often a walk observes it.
+ * Counts how often a walk observes a valid string shape node.
@@ -3552 +3565 @@ export class ObservedShape {
- * Build an object shape that reaches one child through `levels` incoming edges,
+ * Builds an object shape that reaches one child through `levels` incoming edges,
@@ -3577 +3590,2 @@ export function buildStaircaseShape(child: ContractShape, levels: number): Contr
- * A valid string shape node whose one legal accessor re-enters the package.
+ * Provides a valid string shape node whose one legal accessor re-enters the
+ * package.
@@ -3582,5 +3596,5 @@ export function buildStaircaseShape(child: ContractShape, levels: number): Contr
- * accessor refusal — so a getter that calls back into the compiler that is
- * currently owning this declaration is the ONE reachable way to reach a
- * cross-getter reentry, and it is therefore the only honest instrument for the
- * reentry contract. The callback is supplied rather than captured so a test can
- * point it at a compiler that does not exist yet.
+ * accessor refusal — so a getter that calls back into the compiler owning this
+ * declaration is the ONE reachable way to reach a cross-getter reentry, and it
+ * is therefore the only honest instrument for the reentry contract. The callback
+ * is supplied rather than captured so a test can point it at a compiler that
+ * does not exist yet.
@@ -3628 +3642,2 @@ export class ReentrantShape {
- * The symbol key {@link SmuggledMember} hides its only prototype member behind.
+ * Names the symbol key {@link SmuggledMember} hides its only prototype member
+ * behind.
@@ -3633,3 +3648,2 @@ export const SMUGGLED_KEY: unique symbol = Symbol('SmuggledMember')
- * A class whose prototype carries one documentable method beside an
- * undocumented one — the controlled opposite for the runtime `## Methods`
- * comparison.
+ * Carries one documentable method beside an undocumented one on a class
+ * prototype — the controlled opposite for the runtime `## Methods` comparison.
@@ -3659 +3673 @@ export class DriftedMethods {
- * A class whose only prototype member is symbol-keyed — the control drawn from
+ * Hides its only prototype member behind a symbol key — the control drawn from
diff --git a/tests/setupServer.ts b/tests/setupServer.ts
index e7acddc..41c3a8c 100644
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@ -22 +22 @@ import { setFlagsFromString } from 'node:v8'
- * Request collection of weakly referenced objects from the real V8 collector.
+ * Requests collection of weakly referenced objects from the real V8 collector.
@@ -55 +55 @@ export function createForeignRegExp(source: string, flags = ''): unknown {
- * Create a minimal string declaration in a genuine foreign JavaScript realm.
+ * Creates a minimal string declaration in a genuine foreign JavaScript realm.
@@ -64 +64 @@ export function createForeignStringShape(): unknown {
- * Create a fresh foreign JavaScript realm's own `Object.prototype`.
+ * Creates a fresh foreign JavaScript realm's own `Object.prototype`.
@@ -88 +88 @@ export function createForeignPrototype(): object {
- * Create an ordinary record in a genuine foreign JavaScript realm.
+ * Creates an ordinary record in a genuine foreign JavaScript realm.
diff --git a/tests/src/core/ContractCompiler.test.ts b/tests/src/core/ContractCompiler.test.ts
index b93bab7..b422f9a 100644
--- a/tests/src/core/ContractCompiler.test.ts
+++ b/tests/src/core/ContractCompiler.test.ts
@@ -221 +221 @@ describe('ContractCompiler', () => {
-		// a getter of the compiler currently owning the same declaration.
+		// a getter of the compiler owning the same declaration.
diff --git a/tests/src/core/ShapeValidator.test.ts b/tests/src/core/ShapeValidator.test.ts
index 2ba9ae4..f407232 100644
--- a/tests/src/core/ShapeValidator.test.ts
+++ b/tests/src/core/ShapeValidator.test.ts
@@ -764 +764 @@ describe('ShapeValidator', () => {
-		// caller-writable hook — so a caller who simply answers `false` makes the
+		// caller-writable hook — so a caller who answers `false` makes the
diff --git a/tests/src/core/compilers.test.ts b/tests/src/core/compilers.test.ts
index 150009c..5c0ac98 100644
--- a/tests/src/core/compilers.test.ts
+++ b/tests/src/core/compilers.test.ts
@@ -3172 +3172 @@ describe('compileGuard', () => {
-		// 'constructor' is likewise just another own key — its value ('x') fails
+		// 'constructor' is likewise another own key — its value ('x') fails
@@ -3627,2 +3627,2 @@ describe('compileParser', () => {
-		expect(parse(37)).toBe(37) // guard-valid via integer variant — not coerced to '37'
-		expect(parse('37')).toBe('37') // already guard-valid via string variant — unchanged
+		expect(parse(37)).toBe(37) // guard-valid through the integer variant — not coerced to '37'
+		expect(parse('37')).toBe('37') // already guard-valid through the string variant — unchanged
@@ -3849 +3849 @@ describe('compileReporter — array faults', () => {
-		// (a boolean) fault — index 1 ('1' via coercion) stays clean.
+		// (a boolean) fault — index 1 ('1' through coercion) stays clean.
@@ -5456 +5456 @@ describe('R3 — the canonical door matrix', () => {
-		// bundle is asked here, not just schema/is/parse: one ownership population
+		// bundle is asked here, not schema/is/parse alone: one ownership population
diff --git a/tests/src/core/inferers.test.ts b/tests/src/core/inferers.test.ts
index af155ce..4eb587e 100644
--- a/tests/src/core/inferers.test.ts
+++ b/tests/src/core/inferers.test.ts
@@ -2126,2 +2126,2 @@ describe('samplesToSchema — bounded work on shared references (H9, H10-B)', ()
-		// Control: a valid budget is used verbatim, so sanitization did not simply
-		// discard the caller's number.
+		// Control: a valid budget is used verbatim, so sanitization did not discard
+		// the caller's number.
diff --git a/tests/src/core/integration.test.ts b/tests/src/core/integration.test.ts
index c28b81b..06aab8b 100644
--- a/tests/src/core/integration.test.ts
+++ b/tests/src/core/integration.test.ts
@@ -674 +674 @@ describe('the redirection instruments can report a failure', () => {
-		// that second expectation this test passes just as well when the sweep is
+		// that second expectation this test passes equally well when the sweep is
diff --git a/tests/src/core/shapers.test.ts b/tests/src/core/shapers.test.ts
index e82d3db..3d11f2e 100644
--- a/tests/src/core/shapers.test.ts
+++ b/tests/src/core/shapers.test.ts
@@ -1565,3 +1565,4 @@ describe('schemaToShape — keyword semantics', () => {
-		// A key past the INFER_BREADTH_LIMIT sampling cap (e.g. the last one) is
-		// dropped from `properties`, so it can only pass if additionalProperties
-		// was forced open rather than inheriting the schema's `false`.
+		// A key past the INFER_BREADTH_LIMIT sampling cap (for example the last
+		// one) is dropped from `properties`, so it can only pass if
+		// additionalProperties was forced open rather than inheriting the schema's
+		// `false`.
@@ -1790,2 +1791,3 @@ describe('schemaToShape — createContract never throws (malformed schema sweep)
-	// Each entry is built via JSON.parse (untyped) then pinned to JSONSchema on
-	// assignment — deliberately malformed keyword values with no type assertion.
+	// Each entry is built through JSON.parse (untyped) then pinned to JSONSchema
+	// on assignment — deliberately malformed keyword values with no type
+	// assertion.
```

`npm run test:policy` then named its `prose` hits in `guides/contract.md` alone, matching the brief's list exactly. Each fixed by applying the substitution-table row at that line and nothing else:

```text
guides/contract.md:131  prose: banned term `via`
  - optional keys via a readable key list or `true`
  + optional keys through a readable key list or `true`
guides/contract.md:132  prose: banned term `via`
  - optional keys via a readable key list or `true`
  + optional keys through a readable key list or `true`
guides/contract.md:174  prose: banned term `via`
  - a **deep** gate via the same `matchesJSONValue` walk
  + a **deep** gate through the same `matchesJSONValue` walk
guides/contract.md:470  prose: banned term `via`
  - folds via `InferIndex` and stays precisely typed
  + folds through `InferIndex` and stays precisely typed
guides/contract.md:470  prose: banned term `via`
  - folds via `InferOpenIndex`
  + folds through `InferOpenIndex`
guides/contract.md:494  prose: banned term `via`
  - refines leaves via `stringOf` / `boundsOf`
  + refines leaves through `stringOf` / `boundsOf`
guides/contract.md:511  prose: banned term `should`
  - is not on this list and never should have been reachable
  + is not on this list and was never meant to be reachable
guides/contract.md:567  prose: banned term `via`
  - Lowerable per call via `limits.depth`
  + Lowerable per call through `limits.depth`
guides/contract.md:1045  prose: banned term `just`
  - The inferred schema is not just an advertised `inputSchema`
  + The inferred schema is not only an advertised `inputSchema`
```

`npm run format` re-padded the three tables whose column widths those cells changed. `git diff --ignore-all-space guides/contract.md` shows no content change beyond the nine fragments above.

Ancillary wording decisions, all recorded rather than escalated:

- A noun-phrase opener took the verb its declaration's job names: `Represents` for an interface, a type, or a fixture class; `Lists`, `Holds`, `Collects`, `Pairs`, or `Records` for a corpus constant; `Carries`, `Provides`, `Counts`, `Hides`, or `Arms` for a behavioral fixture class.
- An imperative opener took its third-person form, and a coordinated verb later in the same sentence followed it (`Replace ... and restore` became `Replaces ... and restores`).
- `tests/setup.ts:568` dropped `captured` for `taken`, and `tests/setup.ts:3377` restated its first sentence as `Compares two types for strict identity`, ending in `not identical`, so neither names its own symbol.
- `src/core/helpers.ts` now opens `Renders an unknown value as a short, safe, TOTAL string for a {@link Fault}'s received field.`, which drops the symbol name and keeps every fact. That description paragraph is one side of a `docs` worklist row the converge unit owns.
- `tests/setup.ts:467` and `tests/setup.ts:860` took `after` for a temporal `once` while their sentences were being rewritten anyway.

## Item 4 — the bump

`package.json` line 3: `"version": "0.0.16"` became `"version": "0.0.17"`. `package-lock.json` untouched.

## Diffstat

```text
 .oxlintrc.json                          |   4 +-
 configs/helpers.ts                      |  15 +-
 configs/policy.ts                       | 534 ++++++++++++++++++++++++-----
 guides/contract.md                      | 126 +++----
 package.json                            |   5 +-
 src/core/helpers.ts                     |   2 +-
 tests/config.test.ts                    | 404 ++++++++++++++++++++++
 tests/guides.test.ts                    |  42 ++-
 tests/policy.test.ts                    | 128 ++++++-
 tests/setup.ts                          | 304 +++++++++--------
 tests/setupPolicy.ts                    | 572 +++++++++++++++++++++++++++-----
 tests/setupServer.ts                    |   8 +-
 tests/src/core/ContractCompiler.test.ts |   2 +-
 tests/src/core/ShapeValidator.test.ts   |   2 +-
 tests/src/core/compilers.test.ts        |  10 +-
 tests/src/core/inferers.test.ts         |   4 +-
 tests/src/core/integration.test.ts      |   2 +-
 tests/src/core/shapers.test.ts          |  12 +-
 tsconfig.json                           |   3 +-
 19 files changed, 1771 insertions(+), 408 deletions(-)
```

`scripts/docs.ts` is untracked and carries no diffstat row.

## Acceptance criteria

### 1 — `git status --short`

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/contract.md
 M package.json
 M src/core/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/core/ContractCompiler.test.ts
 M tests/src/core/ShapeValidator.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/inferers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/shapers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, plus `tests/guides.test.ts`, plus the files item 3 edited (`guides/contract.md`, `src/core/helpers.ts`, `tests/setup.ts`, `tests/setupServer.ts`, and the six `tests/src/core/*.test.ts` files), and nothing else.

### 2 — `format:check`, `oxlint`, `check`

```text
$ npm run format:check
All matched files use the correct format.
Finished in 2910ms on 71 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
EXIT 0

$ npm run check
> @orkestrel/contract@0.0.17 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT 0
```

### 3 — `test:guides`, `test:policy`, `test:config`

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  65 passed (65)
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

P21's 25 `test:guides` failures are gone; the suite's `Tests` line reads `65 passed (65)`.

### 4 — `npm run docs`

Exit 1, `rows read: 1, disagreements found: 322`. Verbatim, every line it prints:

```text

> @orkestrel/contract@0.0.17 docs
> node --experimental-strip-types scripts/docs.ts

guides/contract.md function isNull: guide absent source "Determines whether a value is `null`."
guides/contract.md function isUndefined: guide absent source "Determines whether a value is `undefined`."
guides/contract.md function isDefined: guide absent source "Determines whether a value is defined (neither `null` nor `undefined`)."
guides/contract.md function isString: guide absent source "Determines whether a value is a string."
guides/contract.md function isNumber: guide absent source "Determines whether a value is a number."
guides/contract.md function isFiniteNumber: guide absent source "Determines whether a value is a finite number (excludes `NaN` and `±Infinity`)."
guides/contract.md function isInteger: guide absent source "Determines whether a value is a finite integer (excludes `NaN`, `±Infinity`, and fractional numbers)."
guides/contract.md function isNonNegativeNumber: guide absent source "Determines whether a value is a finite primitive number at or above positive zero."
guides/contract.md function isNonNegativeInteger: guide absent source "Determines whether a value is a non-negative finite primitive integer."
guides/contract.md function isBoolean: guide absent source "Determines whether a value is a boolean."
guides/contract.md function isLiteralValue: guide absent source "Determines whether a value belongs to the string, number, or boolean literal domain."
guides/contract.md function isTrue: guide absent source "Determines whether a value is exactly `true`."
guides/contract.md function isFalse: guide absent source "Determines whether a value is exactly `false`."
guides/contract.md function isBigInt: guide absent source "Determines whether a value is a bigint."
guides/contract.md function isSymbol: guide absent source "Determines whether a value is a symbol."
guides/contract.md function isNullableString: guide absent source "Determines whether a value is a string or `null`."
guides/contract.md function isNullableNumber: guide absent source "Determines whether a value is a number or `null` (the number may be `NaN` / `±Infinity`)."
guides/contract.md function isNullableBoolean: guide absent source "Determines whether a value is a boolean or `null`."
guides/contract.md function isObject: guide absent source "Determines whether a value is a non-null object."
guides/contract.md function isRecord: guide absent source "Determines whether a value is a plain record (object literal or null-prototype), not an array or class instance."
guides/contract.md function isMap: guide absent source "Determines whether a value is a `Map`."
guides/contract.md function isSet: guide absent source "Determines whether a value is a `Set`."
guides/contract.md function isWeakMap: guide absent source "Determines whether a value is a `WeakMap`."
guides/contract.md function isWeakSet: guide absent source "Determines whether a value is a `WeakSet`."
guides/contract.md function isDate: guide absent source "Determines whether a value is a `Date`."
guides/contract.md function isRegExp: guide absent source "Determines whether a value is a `RegExp`."
guides/contract.md function isError: guide absent source "Determines whether a value is an `Error`."
guides/contract.md function isPromise: guide absent source "Determines whether a value is a native `Promise` (use `isPromiseLike` for any thenable)."
guides/contract.md function isPromiseLike: guide absent source "Determines whether a value is promise-like — an object exposing callable `then`, `catch`, and `finally` methods."
guides/contract.md function isIterable: guide absent source "Determines whether a value implements the iterable protocol (`Symbol.iterator`)."
guides/contract.md function isAsyncIterable: guide absent source "Determines whether a value implements the async iterable protocol (`Symbol.asyncIterator`)."
guides/contract.md function isArrayBuffer: guide absent source "Determines whether a value is an `ArrayBuffer`."
guides/contract.md function isSharedArrayBuffer: guide absent source "Determines whether a value is a `SharedArrayBuffer`."
guides/contract.md function isArray: guide absent source "Determines whether a value is an array."
guides/contract.md function isDataView: guide absent source "Determines whether a value is a `DataView`."
guides/contract.md function isArrayBufferView: guide absent source "Determines whether a value is an `ArrayBufferView` (any typed array or `DataView`)."
guides/contract.md function isInt8Array: guide absent source "Determines whether a value is an `Int8Array`."
guides/contract.md function isUint8Array: guide absent source "Determines whether a value is a `Uint8Array`."
guides/contract.md function isUint8ClampedArray: guide absent source "Determines whether a value is a `Uint8ClampedArray`."
guides/contract.md function isInt16Array: guide absent source "Determines whether a value is an `Int16Array`."
guides/contract.md function isUint16Array: guide absent source "Determines whether a value is a `Uint16Array`."
guides/contract.md function isInt32Array: guide absent source "Determines whether a value is an `Int32Array`."
guides/contract.md function isUint32Array: guide absent source "Determines whether a value is a `Uint32Array`."
guides/contract.md function isFloat32Array: guide absent source "Determines whether a value is a `Float32Array`."
guides/contract.md function isFloat64Array: guide absent source "Determines whether a value is a `Float64Array`."
guides/contract.md function isBigInt64Array: guide absent source "Determines whether a value is a `BigInt64Array`."
guides/contract.md function isBigUint64Array: guide absent source "Determines whether a value is a `BigUint64Array`."
guides/contract.md function isEmptyString: guide absent source "Determines whether a value is the empty string `''`."
guides/contract.md function isEmptyArray: guide absent source "Determines whether a value is an empty array."
guides/contract.md function isEmptyObject: guide absent source "Determines whether a value is an empty plain object — no OWN keys at all, of any kind: string or symbol, enumerable or not."
guides/contract.md function isEmptyMap: guide absent source "Determines whether a value is an empty `Map`."
guides/contract.md function isEmptySet: guide absent source "Determines whether a value is an empty `Set`."
guides/contract.md function isNonEmptyString: guide absent source "Determines whether a value is a non-empty string (at least one character)."
guides/contract.md function isNonEmptyArray: guide absent source "Determines whether a value is a non-empty array (at least one element)."
guides/contract.md function isNonEmptyObject: guide absent source "Determines whether a value is a non-empty plain object — at least one own key of any kind: string or symbol, enumerable or not."
guides/contract.md function isNonEmptyMap: guide absent source "Determines whether a value is a non-empty `Map` (at least one entry)."
guides/contract.md function isNonEmptySet: guide absent source "Determines whether a value is a non-empty `Set` (at least one element)."
guides/contract.md function isFunction: guide absent source "Determines whether a value is callable."
guides/contract.md function isZeroArg: guide absent source "Determines whether a value is a function that declares zero parameters (`Function.length === 0`)."
guides/contract.md function isAsyncFunction: guide absent source "Determines whether a value is a native `async function`."
guides/contract.md function isGeneratorFunction: guide absent source "Determines whether a value is a generator function (`function*`)."
guides/contract.md function isAsyncGeneratorFunction: guide absent source "Determines whether a value is an async generator function (`async function*`)."
guides/contract.md function isZeroArgAsync: guide absent source "Determines whether a value is a zero-argument async function."
guides/contract.md function isZeroArgGenerator: guide absent source "Determines whether a value is a zero-argument generator function."
guides/contract.md function isZeroArgAsyncGenerator: guide absent source "Determines whether a value is a zero-argument async generator function."
guides/contract.md function isConstructor: guide absent source "Determines whether a value can be used as a `new`-target constructor."
guides/contract.md function isInstance: guide absent source "Determines whether a value is an instance of a constructor, contained against a throwing `instanceof` check."
guides/contract.md function arrayOf: guide absent source "Builds a guard that accepts DENSE arrays whose every element satisfies `elementGuard`."
guides/contract.md function tupleOf: guide absent source "Builds a guard that accepts fixed-arity DENSE tuples, testing each index with the corresponding guard."
guides/contract.md function setOf: guide absent source "Builds a guard that accepts `Set` instances whose every element satisfies `elementGuard`."
guides/contract.md function mapOf: guide absent source "Builds a guard that accepts `Map` instances where every key satisfies `keyGuard` and every value satisfies `valueGuard`."
guides/contract.md function recordOf: guide absent source "Builds a guard that accepts plain records matching a guard shape."
guides/contract.md function objectOf: guide absent source "Builds a guard that accepts non-array objects matching an open guard shape."
guides/contract.md function literalOf: guide absent source "Builds a guard that accepts a provided literal primitive using SameValueZero comparison."
guides/contract.md function instanceOf: guide absent source "Builds a guard that accepts instances of the provided constructor."
guides/contract.md function enumOf: guide absent source "Builds a guard from a native `enum` or any object whose values are strings or numbers."
guides/contract.md function keyOf: guide absent source "Builds a guard that accepts values that are own keys of the provided object."
guides/contract.md function pickOf: guide absent source "Builds a new guard shape by keeping only the listed keys — the structural equivalent of `Pick<T, K>`. Produces a shape for `recordOf`, not a guard."
guides/contract.md function omitOf: guide absent source "Builds a new guard shape by removing the listed keys — the structural equivalent of `Omit<T, K>`. Produces a shape for `recordOf`, not a guard."
guides/contract.md function andOf: guide absent source "Combines `left` and `right` with logical AND — passes only when both pass."
guides/contract.md function orOf: guide absent source "Combines `left` and `right` with logical OR — passes when at least one passes. Prefer `unionOf` for a wider set of variants."
guides/contract.md function notOf: guide absent source "Negates a guard or predicate — passes when `guard` returns `false`."
guides/contract.md function complementOf: guide absent source "Builds a guard for `Exclude<TBase, TExcluded>` — accepts values that pass `base` but not `excluded`."
guides/contract.md function unionOf: guide absent source "Builds a guard that accepts values matching at least one of the provided guards — the variadic form of `orOf`."
guides/contract.md function intersectionOf: guide absent source "Builds a guard that accepts values matching ALL of the provided guards — the variadic form of `andOf`."
guides/contract.md function whereOf: guide absent source "Refines a base guard with an additional predicate that runs only when the base passes."
guides/contract.md function lazyOf: guide absent source "Defers guard creation until first use by calling `thunk()` on every invocation."
guides/contract.md function transformOf: guide absent source "Builds a guard that passes when the base passes AND the projection of the value satisfies the target guard. Still narrows to `T` (the base type) — the target check is a validity constraint on a derived view, not a type transformation."
guides/contract.md function nullableOf: guide absent source "Extends a guard to also allow `null`."
guides/contract.md function optionalOf: guide absent source "Extends a guard to also allow `undefined` — the optional counterpart of `nullableOf`."
guides/contract.md function boundsOf: guide absent source "Builds a guard that accepts finite numbers within an inclusive `[min, max]` range."
guides/contract.md function matchOf: guide absent source "Builds a guard that accepts strings matching a regular expression."
guides/contract.md function stringOf: guide absent source "Builds a guard that accepts strings satisfying optional length and pattern refinements — `min` / `max` length and a `pattern`."
guides/contract.md const GUARD_DEPTH_LIMIT: guide absent source "Caps the active recursion or JSON container depth for runtime guards, frozen."
guides/contract.md function parseString: guide absent source "Parses an unknown value to a string."
guides/contract.md function parseNumber: guide absent source "Parses an unknown value to a finite number."
guides/contract.md function parseInteger: guide absent source "Parses an unknown value to a finite integer."
guides/contract.md function parseBoolean: guide absent source "Parses an unknown value to a boolean."
guides/contract.md function parseRecord: guide absent source "Parses an unknown value to a plain record — the input reference, never cloned."
guides/contract.md function parseArray: guide absent source "Parses an unknown value to an array — the input reference, never cloned — optionally guarding every element."
guides/contract.md function parseEnum: guide absent source "Parses an unknown value as one of the allowed literal primitives."
guides/contract.md function parseNull: guide absent source "Parses an unknown value to `null`."
guides/contract.md function parseJSONValue: guide absent source "Parses an unknown value to a cycle-safe JSON value — the input reference, never cloned."
guides/contract.md function parseStringField: guide absent source "Reads and parses a string field from a record by key or nested key path."
guides/contract.md function parseNumberField: guide absent source "Reads and parses a finite-number field from a record by key or nested key path."
guides/contract.md function parseIntegerField: guide absent source "Reads and parses a finite-integer field from a record by key or nested key path."
guides/contract.md function parseBooleanField: guide absent source "Reads and parses a boolean field from a record by key or nested key path."
guides/contract.md function parseRecordField: guide absent source "Reads and parses a nested record field from a record by key or nested key path."
guides/contract.md function parseArrayField: guide absent source "Reads and parses an array field from a record by key or nested key path, optionally guarding elements."
guides/contract.md function parseEnumField: guide absent source "Reads and parses an enum field from a record by key or nested key path."
guides/contract.md function parseNullField: guide absent source "Reads and parses a `null` field from a record by key or nested key path."
guides/contract.md function parseJSONValueField: guide absent source "Reads and parses a JSON-value field from a record by key or nested key path."
guides/contract.md function isJSONPrimitive: guide "Guard: `null`, a string, a finite number, or a boolean — real JSON has no `NaN` / `±Infinity`." source "Determines whether a value is a primitive JSON value."
guides/contract.md function isJSONValue: guide "Guard: a cycle-free JSON tree; rejects functions, Dates, class instances, `NaN`, and `±Infinity`." source "Determines whether a value is a cycle-safe JSON value."
guides/contract.md function isBoundedJSONValue: guide "Guard: `matchesJSONDepth(value) && isJSONValue(value)`; depth is checked first, then JSON validity is observed separately." source "Determines whether a value is JSON-valid within the fixed container-depth limit."
guides/contract.md function isBoundedJSONRecord: guide "Guard: a plain-record-rooted bounded JSON value; arrays may satisfy the value guard but always fail this record guard." source "Determines whether a value is a depth-bounded JSON record."
guides/contract.md function parseJSON: guide "`JSON.parse` that returns `undefined` instead of throwing; the result is `unknown` — narrow it." source "Parses a JSON string, returning `undefined` instead of throwing."
guides/contract.md function parseJSONAs: guide "Parse a JSON string, then validate the result with a guard you bring → `T | undefined`." source "Parses a JSON string and validates the result against a guard."
guides/contract.md const JSON_SCHEMA_TYPES: guide "The seven JSON Schema `type` names, frozen — compose with `literalOf(...)` / `parseEnum(...)`." source "Lists the seven standard JSON Schema `type` names, frozen."
guides/contract.md type JSONPrimitive: guide "`string | number | boolean | null` — a flat JSON leaf." source "Represents a primitive JSON value — the flat leaf of any JSON document."
guides/contract.md type JSONRecord: guide "readonly string-keyed record whose values are `JSONValue`; the record-root contract for owned metadata and persistence payloads." source "Represents a readonly string-keyed JSON object record."
guides/contract.md type JSONValue: guide "recursive JSON data: a primitive, readonly array, or readonly string-keyed record." source "Represents a recursive JSON value — primitives, arrays, and object records."
guides/contract.md type JSONSchemaType: guide "one of the seven JSON Schema `type` names." source "Lists the seven standard JSON Schema `type` names."
guides/contract.md interface JSONSchema: guide "a lean JSON Schema fragment — the keywords `compileSchema` emits and `rawShape` embeds, plus `format` (emitted only by the inferers)." source "Represents a JSON Schema fragment — the supported keyword vocabulary the contract compiler emits and `RawShape` validates before embedding."
guides/contract.md type SchemaFormat: guide "`'date-time' | 'date' | 'time' | 'uuid' | 'email' | 'uri'` — the closed format vocabulary `stringToFormat` / `samplesToFormat` recognize." source "Lists the closed set of string formats `stringToFormat` recognizes."
guides/contract.md const CONTRACT_ERROR_BRAND: guide absent source "Holds the registry-global key used to recognize `ContractError` values across package copies."
guides/contract.md function attempt: guide absent source "Invokes a callback once and synchronously captures its exact outcome as a `Result`."
guides/contract.md const INTRINSICS: guide absent source "Captures every host operation this package dispatches through, while this module evaluates."
guides/contract.md function contain: guide absent source "Runs a public door's whole body and publishes only this package's error class."
guides/contract.md function appendEntries: guide absent source "Appends every element of one array onto another, by index."
guides/contract.md function limitEntries: guide absent source "Takes at most `limit` leading elements of an array, by index."
guides/contract.md function compareValues: guide absent source "Orders two primitive keys or indices ascending."
guides/contract.md function sortValues: guide absent source "Orders primitive keys or indices deterministically, on an owned copy, through the captured sort."
guides/contract.md function pathOf: guide absent source "Builds a diagnostic path from an existing path and further segments, without dispatching through array iteration."
guides/contract.md function readValue: guide absent source "Reads a value through the shared containment boundary or refuses it with the contract module's uniform read diagnostic."
guides/contract.md function readArrayEntries: guide absent source "Snapshots an array through its reflected own-index population."
guides/contract.md function readGuardShape: guide absent source "Snapshots a guard shape and its optional-key mode for a shape combinator."
guides/contract.md function holds: guide absent source "Invokes a predicate through the sanctioned never-throw boundary."
guides/contract.md function enumerableKeys: guide absent source "Snapshots an object's own enumerable string keys through a total boundary."
guides/contract.md function readOptions: guide absent source "Validates and snapshots a shape-builder options record through every reflective operation the builder relies on."
guides/contract.md function drawRandom: guide absent source "Draws and validates one generator random sample."
guides/contract.md function enumerableSymbolCount: guide absent source "Counts the enumerable own-symbol keys on a value."
guides/contract.md function matchesJSONValue: guide absent source "Matches an unknown value against the recursive JSON value structure."
guides/contract.md function matchesRecordBrand: guide absent source "Determines whether a value carries the plain-record brand, raising a hostile prototype observation instead of answering it."
guides/contract.md function matchesJSONDepth: guide absent source "Determines whether a readable value stays within the fixed JSON container-depth limit."
guides/contract.md function resolveField: guide absent source "Resolves a (possibly nested) field value from a record by a key or key path."
guides/contract.md function seededRandom: guide absent source "Builds a deterministic pseudo-random source seeded from a single number."
guides/contract.md function schemaToParameters: guide absent source "Narrows a compiled `JSONSchema` down to the open `Readonly<Record<string, unknown>>` shape tool definitions advertise as `parameters` — through the `isRecord` boundary guard, never an assertion, as `.claude/rules/patterns.md` § Validation and contracts requires."
guides/contract.md function schemaToObject: guide absent source "Wraps a non-object `JSONSchema` root in a single-property object schema, so an inferred primitive/array/union schema can flow into `schemaToParameters` as an MCP-compatible `inputSchema`."
guides/contract.md function collectMembers: guide absent source "Collects an array's entries into a membership collection this package owns."
guides/contract.md function matchesMember: guide absent source "Determines whether a value is a member of a collected vocabulary, by SameValueZero."
guides/contract.md function admitMember: guide absent source "Collects one more member into a vocabulary that grows as a walk proceeds."
guides/contract.md function matchesVisited: guide absent source "Determines whether an object is already on a traversal's active path."
guides/contract.md function admitVisited: guide absent source "Records an object as entered on a traversal's active path."
guides/contract.md function omitVisited: guide absent source "Records an object as exited from a traversal's active path."
guides/contract.md function retainDepth: guide absent source "Records one node's answer at one remaining-depth allowance in a shared memo."
guides/contract.md function collectEntries: guide absent source "Builds the collector a captured `forEach` sweep appends through."
guides/contract.md function readSetEntries: guide absent source "Snapshots the genuine contents of a caller's `Set` without running an iterator."
guides/contract.md function readMapEntries: guide absent source "Snapshots the genuine entries of a caller's `Map` without running an iterator."
guides/contract.md function matchesPattern: guide absent source "Determines whether a string is in the language of a pattern this package owns."
guides/contract.md function readPatternSource: guide absent source "Reads a regular expression's source text through the captured accessor."
guides/contract.md function readPatternFlags: guide absent source "Reads a regular expression's flag text through the captured accessor."
guides/contract.md function readPattern: guide absent source "Rebuilds a caller's regular expression as a stateless pattern this package owns."
guides/contract.md function ownPattern: guide absent source "Rebuilds a declaration's regular expression as a stateless pattern this package owns, and refuses an unreadable one under the reader's own name."
guides/contract.md function pinMembers: guide absent source "Pins every own member of a class prototype as a non-configurable member — non-writable too when it is a data property — and verify the pin took."
guides/contract.md function refuseExpansion: guide absent source "Refuses a validated declaration whose compiled expansion exceeds `COMPILE_NODE_LIMIT`."
guides/contract.md interface Failure: guide absent source "Represents the discriminated failure branch of a `Result`."
guides/contract.md interface ArrayRead: guide absent source "Represents the owned result of reading one array through its reflected own-index lens."
guides/contract.md interface GuardShapeRead: guide absent source "Represents the owned result of reading one guard shape and its optional-key mode."
guides/contract.md interface BoundsRead: guide absent source "Represents a derived numeric bounds pair, either member absent."
guides/contract.md type EntryCollectorFunction: guide absent source "Represents the collector a captured `forEach` sweep invokes per entry."
guides/contract.md interface StringGuardOptions: guide absent source "Groups the options for the `stringOf` guard builder."
guides/contract.md type FieldPath: guide absent source "Addresses one field in a record: a single key, or an ordered list of keys to descend through nested objects."
guides/contract.md type Guard: guide absent source "Represents a runtime type guard: returns `true` when `value` satisfies `T` and narrows it."
guides/contract.md type GuardType: guide absent source "Extracts the guarded type `T` from a `Guard<T>`."
guides/contract.md type GuardsShape: guide absent source "Represents a mapping of string keys to guards."
guides/contract.md type FromGuards: guide absent source "Resolves a `GuardsShape` to a readonly object type of its guarded property types."
guides/contract.md type OptionalFromGuards: guide absent source "Mirrors `FromGuards`, but every key listed in `K` becomes a true optional member (`?`) rather than a required key widened with `| undefined`."
guides/contract.md type TupleFromGuards: guide absent source "Maps a tuple of element guards to a readonly tuple of their guarded types."
guides/contract.md type UnionToIntersection: guide absent source "Converts a union type to an intersection type."
guides/contract.md type IntersectionFromGuards: guide absent source "Intersects the types guarded by a tuple of guards — backs `intersectionOf`."
guides/contract.md type Parser: guide absent source "Coerces an unknown value to `T`, or returns `undefined`."
guides/contract.md type LiteralValue: guide absent source "Represents a string, number, or boolean literal."
guides/contract.md type Result: guide absent source "Represents a discriminated union for operations that can succeed or fail without throwing."
guides/contract.md interface ReadValueOptions: guide absent source "Represents optional diagnostic metadata for a required read."
guides/contract.md interface ContainOptions: guide absent source "Represents optional diagnostic metadata for a public door's containment boundary."
guides/contract.md interface ShapeProperty: guide absent source "Represents one captured property of an object shape, held as an ordered entry rather than as a `Map` pair."
guides/contract.md interface Success: guide absent source "Represents the discriminated success branch of a `Result`."
guides/contract.md type AnyConstructor: guide absent source "Represents a constructor signature that produces instances of `T`."
guides/contract.md type AnyFunction: guide absent source "Represents a function accepting any arguments and returning `unknown`."
guides/contract.md type AnyAsyncFunction: guide absent source "Represents an async function accepting any arguments and returning a `Promise`."
guides/contract.md type ZeroArgFunction: guide absent source "Represents a function accepting zero arguments and returning `unknown`."
guides/contract.md type ZeroArgAsyncFunction: guide absent source "Represents an async function accepting zero arguments and returning a `Promise`."
guides/contract.md class ContractError: guide absent source "Carries a machine-readable contract category, optional context, and an exact optional cause. Omitting `cause` omits the own property; explicitly supplying `cause: undefined` retains an own property with that value. Both optional options are read as OWN properties, so a construction never consults the caller-writable prototype chain of the container it was handed."
guides/contract.md function isContractError: guide absent source "Checks whether an unknown value is a `ContractError`."
guides/contract.md type ContractCode: guide absent source "Names the machine-readable category carried by a `ContractError`."
guides/contract.md const CONTRACT_CODES: guide absent source "Lists every declared `ContractCode` refusal category, frozen."
guides/contract.md interface ContractErrorContext: guide absent source "Represents the optional structured details carried by a `ContractError`."
guides/contract.md interface ContractErrorOptions: guide absent source "Represents the construction options for a `ContractError`."
guides/contract.md class JSONCloner: guide absent source "Owns the state of one exact JSON snapshot operation."
guides/contract.md interface JSONClonerInterface: guide absent source "Owns the state of one exact JSON snapshot operation."
guides/contract.md class SchemaCloner: guide absent source "Owns the state of one JSON Schema snapshot operation."
guides/contract.md interface SchemaClonerInterface: guide absent source "Owns the state of one JSON Schema snapshot operation."
guides/contract.md class ShapeCloner: guide absent source "Owns the state of one contract-shape snapshot operation."
guides/contract.md interface ShapeClonerInterface: guide absent source "Owns the state of one contract-shape snapshot operation."
guides/contract.md function cloneJSONValue: guide absent source "Deep-clones exact JSON data into an owned frozen snapshot."
guides/contract.md function cloneJSONRecord: guide absent source "Deep-clones an exact JSON object record into an owned frozen snapshot."
guides/contract.md function cloneSchema: guide absent source "Deep-clones a JSON Schema graph into an owned frozen snapshot."
guides/contract.md function cloneShape: guide absent source "Deep-clones a contract shape graph into an owned frozen snapshot."
guides/contract.md const CLONE_NODE_LIMIT: guide absent source "Caps the number of nodes one JSON snapshot may produce, frozen."
guides/contract.md function ownShape: guide absent source "Takes ownership of a contract shape node as an independent `cloneShape` snapshot of its graph."
guides/contract.md function stringShape: guide absent source "Builds a string `StringShape`."
guides/contract.md function numberShape: guide absent source "Builds a numeric `NumberShape`."
guides/contract.md function integerShape: guide absent source "Builds an integer `NumberShape` — forces `integer: true`."
guides/contract.md function booleanShape: guide absent source "Builds a `BooleanShape`."
guides/contract.md function nullShape: guide absent source "Builds a `NullShape`."
guides/contract.md function literalShape: guide absent source "Builds a literal shape from a fixed set of primitive values."
guides/contract.md function arrayShape: guide absent source "Builds an `ArrayShape` from an element shape."
guides/contract.md function objectShape: guide absent source "Builds an `ObjectShape` from a property map."
guides/contract.md function recordShape: guide absent source "Builds an open `ObjectShape` with no fixed properties — a dictionary."
guides/contract.md function unionShape: guide absent source "Builds a `UnionShape` from a list of variant shapes (`anyOf` in JSON Schema)."
guides/contract.md function oneOfShape: guide absent source "Builds a `UnionShape` that emits `oneOf` (exactly one match) in JSON Schema."
guides/contract.md function optionalShape: guide absent source "Wraps a shape so it may be absent (`undefined`)."
guides/contract.md function nullableShape: guide absent source "Wraps a shape so it may be `null`."
guides/contract.md function jsonShape: guide absent source "Builds a `JSONShape`."
guides/contract.md function rawShape: guide absent source "Builds a `RawShape` from a supported JSON Schema fragment."
guides/contract.md function schemaToShape: guide absent source "Converts a runtime `JSONSchema` value into a validating `ContractShape` — the inverse of `compileSchema`. Unlike direct `rawShape` construction, which rejects malformed supported-vocabulary keywords, this conversion is total and widens an inexpressible input to a valid raw `{}`."
guides/contract.md function deriveLengthBounds: guide absent source "Derives `min`/`max` shape bounds from a pair of non-negative-integer JSON Schema length keywords (`minLength`/`maxLength`, `minItems`/`maxItems`)."
guides/contract.md function deriveRangeBounds: guide absent source "Derives `min`/`max` shape bounds from a pair of finite-number JSON Schema range keywords (`minimum`/`maximum`)."
guides/contract.md type ContractShape: guide absent source "Describes a value declaratively — a declaration the shape builders build and the compilers turn into a guard, a parser, a JSON Schema, and a generator."
guides/contract.md interface StringShape: guide absent source "Describes a string with optional length and pattern constraints."
guides/contract.md interface NumberShape: guide absent source "Describes a number with optional bounds; `integer` restricts to whole numbers."
guides/contract.md interface BooleanShape: guide absent source "Describes a boolean — accepts only `true` or `false`."
guides/contract.md interface NullShape: guide absent source "Describes a null value — accepts only `null`."
guides/contract.md interface LiteralShape: guide absent source "Describes a literal — accepts exactly one of a fixed set of primitive values."
guides/contract.md interface ArrayShape: guide absent source "Describes an array with an element shape and optional length bounds."
guides/contract.md interface ObjectShape: guide absent source "Describes an object — a map of property names to child shapes."
guides/contract.md interface UnionShape: guide absent source "Describes a union — accepts a value matching any one variant (first match wins)."
guides/contract.md interface OptionalShape: guide absent source "Wraps an inner shape that may be absent (`undefined`)."
guides/contract.md interface NullableShape: guide absent source "Wraps an inner shape that may be `null`."
guides/contract.md interface JSONShape: guide absent source "Describes a JSON passthrough — accepts any JSON value."
guides/contract.md interface RawShape: guide absent source "Describes a validated raw JSON Schema passthrough — embeds a supported schema fragment directly."
guides/contract.md type Infer: guide absent source "Resolves the static TypeScript type a `ContractShape` describes."
guides/contract.md type InferObject: guide absent source "Resolves `Infer` of an object shape's `properties` — the required keys, plus the `optional`-wrapped keys as optional members, plus the index-signature contribution of `additionalProperties` (see `InferIndex`)."
guides/contract.md type InferIndex: guide absent source "Computes the index-signature contribution of a pure record shape's `additionalProperties` — the `recordShape` case, where `properties` is empty."
guides/contract.md type InferOpenIndex: guide absent source "Computes the index-signature contribution of a MIXED object shape's `additionalProperties` — one with both fixed `properties` and an open tail."
guides/contract.md type InferMutable: guide absent source "Strips the TOP-LEVEL `readonly` modifiers from `Infer` (a shallow strip — nested object/array properties stay readonly) — for consumers writing the parsed value's own fields."
guides/contract.md type InferUnion: guide absent source "Resolves `Infer` of a union shape's `variants` — the union of each variant's inferred type."
guides/contract.md interface StringShapeOptions: guide absent source "Groups the options for `StringShape` (through `stringShape`)."
guides/contract.md interface NumberShapeOptions: guide absent source "Groups the options for `NumberShape` (through `numberShape` / `integerShape`)."
guides/contract.md interface BooleanShapeOptions: guide absent source "Groups the options for `BooleanShape` (through `booleanShape`)."
guides/contract.md interface NullShapeOptions: guide absent source "Groups the options for `NullShape` (through `nullShape`)."
guides/contract.md interface JSONShapeOptions: guide absent source "Groups the options for `JSONShape` (through `jsonShape`)."
guides/contract.md interface LiteralShapeOptions: guide absent source "Groups the options for `LiteralShape` (through `literalShape`)."
guides/contract.md interface ArrayShapeOptions: guide absent source "Groups the options for `ArrayShape` (through `arrayShape`)."
guides/contract.md interface ObjectShapeOptions: guide absent source "Groups the options for `ObjectShape` (through `objectShape`)."
guides/contract.md interface RecordShapeOptions: guide absent source "Groups the options for record shapes (through `recordShape`)."
guides/contract.md class ShapeValidator: guide "Retains one caller-owned `ContractShape` without observing it at construction and exposes the sole `validate()` behavior plus the readonly `expansion` count, which is `undefined` until a pass measures one. Every independent call is a fresh live pass; active reentry creates one cause-free `structure` poison at root, every nested/outer call in that pass shares its identity, cleanup returns the validator to idle, and a later call observes current source state." source "Validates one retained contract-shape source live on every call."
guides/contract.md interface ShapeValidatorInterface: guide "The behavioral contract implemented by `ShapeValidator`; its sole method is documented under Methods. Its one readonly data property is `expansion`: the number of nodes the last SUCCESSFUL `validate()` found the retained declaration expands into, one per node per incoming edge, and `undefined` both before the first successful pass and after a failed one, because neither measured one. `validateShape` reads it to apply `COMPILE_NODE_LIMIT`, and `refuseExpansion` refuses an absent measurement rather than reading it as a small count." source "Validates one retained contract-shape source on demand."
guides/contract.md function validateShape: guide "shape → `void` — the fresh eager function boundary over `new ShapeValidator(shape).validate()`, and like the class it never exposes a raw caller value: a failure it did not author becomes `validateShape: shape reflection failed` with the exact cause. It applies the shared total declaration gate: structural safety, scalar domains, vocabularies, bounds/ranges, integer-range satisfiability, optional placement, depth, cycles, and recursive raw-schema vocabulary validation. Its iterative shape walk requires an own recognized discriminant, stable observable node fields, valid scalar fields, non-negative safe integer length bounds, finite numeric bounds, `min <= max`, satisfiable integer intervals, operational `RegExp` patterns, non-empty union/literal vocabularies, finite string/number/boolean literal entries, legal optional placement, plain property maps, finite dense structural arrays, and a shape in every structural child slot. Raw schemas are recursively limited to the keywords declared by `JSONSchema`; their scalars, bounds, dense unique vocabularies, child records, and pattern syntax are checked before emission. EVERY standalone compiler (`compileSchema` / `compileGuard` / `compileParser` / `compileGenerator` / `compileReporter` / `compileAuditor`) runs this gate before recursion. Each unique node — and each unique raw-schema record — is OBSERVED once per call: descriptors, the two stable reads, the scalar evidence and the ordered outgoing edges are captured on first discovery, and every later incoming edge is answered from that capture. Every incoming edge is still inspected, because one rule is a property of the SLOT rather than of the node and has to be re-asked per edge: where an `optionalShape` is legal. It is not the only rule that depends on WHERE a node sits — depth is the other, for the shape's own nesting and for a `rawShape`'s embedded schema alike — but depth is answered by measurement rather than by re-inspection: depth and emitted expansion are computed over the captured nodes and edges, so a declaration used in many positions costs its size rather than its paths. Because the verdict comes from the DEEPEST position a node occupies, so does the diagnostic: a raw node shared between a slot that fits and a slot that does not is refused at the path of the slot that does not, whichever of the two was declared first. A declaration that turns out to be cyclic falls back to an ordered path walk over that same capture, never over the caller’s source again; that walk memoizes a node it fully cleared, but never one whose walk was cut short by the active path, since the branch back through the cycle was left unmeasured and a shallower arrival would reach it." source "Gates recursive compiler work on shape structure, depth, and cycles."
guides/contract.md function compileGuard: guide "shape → a `Guard<Infer<S>>` (generic in the shape; reuses `arrayOf` / `unionOf` / `literalOf` / `nullableOf` / `orOf` / `intersectionOf` / `whereOf`; refines leaves through `stringOf` / `boundsOf`). An object shape compiles to a walk over the `enumerableKeys` view rather than to `recordOf`, since a contract object also carries optional-key presence and an `additionalProperties` tail that exact-record matching cannot express. An OPEN object's undeclared key is READ and discarded even when `additionalProperties: true` constrains nothing: open means unconstrained, not unobserved, and the compiled parser copies every such key into its result — a guard that skipped the read certified a value its own parser then refused as unreadable." source "Compiles a `ContractShape` into a runtime type guard."
guides/contract.md function compileParser: guide "shape → a `Parser<Infer<S>>` (generic in the shape) that coerces (reuses `parseString` / `parseInteger` / …; the object branch gates on `isRecord` and performs only the per-key reads the shape needs, because `parseRecord`'s eager whole-record `Object.values` probe read keys a closed object DROPS and refused inputs on the basis of keys it would never look at) then re-applies each leaf's refinement (the same `stringOf` / `boundsOf`), so a non-`undefined` parse satisfies the guard. Readable invalid input returns `undefined`; failed required object, JSON, or dense-array index reads propagate a coded refusal. Arrays rebuild from the same own-index lens as `arrayOf`, ignoring caller-defined iteration. An `anyOf`-mode union (`unionShape`) first tries an identity pass before ordered per-variant coercion; a `oneOf`-mode union (`oneOfShape`) requires exactly one raw guard match." source "Compiles a `ContractShape` into an input parser."
guides/contract.md function compileSchema: guide "shape → a `JSONSchema` — emission over the finite shape; it never inspects a runtime value. The result is an OWNED, deeply frozen graph (a `rawShape`'s embedded fragment is re-cloned rather than re-exposed), and shared DECLARATION identity survives into it — two slots holding one authored node hold one emitted subschema, while two structurally equal but distinct nodes stay distinct objects — so a compiled schema cannot be edited apart from the guard and parser compiled beside it — lockstep meaning derived from that one snapshot rather than agreeing on which values to accept (the schema and the parser deliberately do NOT agree on which inputs they accept: `parse('36')` succeeds against an `integerShape` whose schema demands an integer)." source "Compiles a `ContractShape` into a JSON Schema document."
guides/contract.md function compileGenerator: guide "shape + a `RandomFunction` → `Infer<S>` (generic in the shape). An empty literal/union now fails the shared declaration gate with code `empty`; generator-owned failures use `generate` and name the shape category plus the failed pattern or attempt budget: a pattern-constrained `stringShape` it cannot satisfy, a `rawShape` (its embedded schema is arbitrary), and an exhausted union budget. A failing SAMPLE SOURCE is a separate category — code `random`, raised by `drawRandom` at whatever depth the draw happened and rethrown through union rotation rather than retried. A number draws by weighted interpolation between its effective bounds (`lo * (1 - sample) + hi * sample`), which stays finite and in range even across `±Number.MAX_VALUE`, where computing the span first would overflow to `Infinity`; an integer floors the same interpolation. Defaults fill in a missing bound: no bounds at all draws from `[-100, 100]`, a lone `min` draws from `[min, min + 100]`, and a lone `max` draws from `[max - 100, max]` — always a real range around the bound you gave, never a window that ignores it. An array's `max: 0` and a `numberShape`'s fractional integer bounds are honored exactly. A union starts at a seeded variant and rotates through the rest, so an ungeneratable first variant cannot starve satisfiable siblings; every candidate must satisfy the union's own compiled guard." source "Compiles a `ContractShape` into a deterministic seed value."
guides/contract.md function createContract: guide "shape → a typed `ContractInterface<Infer<S>>` bundling `schema` / `is` / `parse` / `audit` / `explain` / `generate`. It creates ONE `ContractCompiler` and returns that compiler's exact `contract`, so ONE ownership population governs the whole contract: the declaration is owned once, that owned graph is validated once, and every artifact is compiled from it. There is no discarded pre-ownership walk of the caller's live source — ownership already REFUSES a malformed structural slot, scalar field, or bound rather than normalizing it, so the second walk only added a population the artifacts never used and a second refusal vocabulary for one rule." source "Compiles a `ContractShape` into a `ContractInterface` — the lockstep outputs from one declaration, lockstep meaning derived from one owned snapshot rather than accepting the same values."
guides/contract.md interface ContractInterface: guide "the compiled-contract bundle — `{ schema, is, parse, audit, explain, generate }`." source "Represents a compiled contract — the lockstep outputs derived from one shape."
guides/contract.md class ContractCompiler: guide "The lazy engine every `compile*` function and `createContract` now runs on. Construction observes NOTHING — no read, no validation, no clone, no graph-sized allocation, no clock reading, no draw. The first getter read owns the declaration once through `ownShape`, validates that owned graph once, and indexes each unique node and structural edge once into children-before-parent order; each artifact family is then ONE postorder pass keyed by node identity, so a shared child compiles once however many parents point at it. That is the whole reason the class exists: the recursive compilers it replaces re-owned and re-gated the SUBGRAPH at every node they descended into, which made one linear declaration quadratic — a 30-alias depth-100 shape cost 640 ms for one guard and 1.87 s for one contract, and costs 3 ms and 4 ms here. Seven readonly lazy getters in one fixed order (`schema`, `guard`, `parser`, `auditor`, `reporter`, `generator`, `contract`), each REPLAYING its exact artifact by identity; the runtime prototype carries exactly those seven plus `constructor`, every one pinned non-configurable. A getter builds its own family and no other, except that `parser` / `reporter` / `generator` also build the guard plan when the graph holds a union, because a union's membership question IS a guard question in all three. One terminal lifecycle covers preparation and every family. Preparation is the only fallible phase: a cloner or validator `ContractError` is adopted by identity rather than rewrapped, an unexpected host failure would be wrapped once as `ContractCompiler: contract compilation failed` carrying the exact cause, and a settled compiler replays that exact error at every later getter while an artifact already handed out keeps working, because each compiled artifact is self-contained. Reentry — reachable only through the `pattern` accessor ownership is documented to invoke — poisons the nested read, the interrupted read, and every later read with one shared cause-free `ContractCompiler: contract compilation may not be reentered` (`structure`, root contract context). After all six roots exist, the owned graph, the order and every family plan are released to empty peers the class owns instead of to per-instance ones, and the node index is dropped outright: a shared empty `WeakMap` would be a class-lifetime cache any later write could fill with a caller's own shapes. What stays is the six roots, the optional frozen bundle, and terminal state." source "Owns one contract shape's artifacts and their bundle, compiled lazily."
guides/contract.md interface ContractCompilerInterface: guide "The behavioral contract implemented by `ContractCompiler`. It declares no call-signature members, so it has no Methods table: its whole surface is seven readonly data properties — `schema` (`JSONSchema`), `guard` (`Guard<Infer<S>>`), `parser` (`Parser<Infer<S>>`), `auditor` (`AuditorFunction`), `reporter` (`ReporterFunction`), `generator` (`SeederFunction<Infer<S>>`) and `contract` (`ContractInterface<Infer<S>>`). `contract` is the frozen SIX-member bundle whose own enumerable keys are `schema`, `is`, `parse`, `audit`, `explain`, `generate` in that order, each holding the exact value the corresponding getter publishes — `contract.is` IS `compiler.guard`, by identity, not a copy of it." source "Owns one contract shape's compiled artifacts plus their bundle, lazily."
guides/contract.md type RandomFunction: guide "`() => number` in `[0, 1)` — the seed source for `generate`; a source that throws or returns outside that range fails as a `random` `ContractError` (see `drawRandom`), never as a silently skewed value." source "Represents a deterministic random source returning a value in `[0, 1)`."
guides/contract.md type AuditorFunction: guide "`(value, path?) => readonly AuditFault[]` — the strict-domain diagnostic `compileAuditor` produces when it is bound to one shape. The optional `path` is the prefix every fault of that call is rooted at; `ContractInterface.audit` takes only the value, and a function of this type is assignable to it, so one compiled function serves both surfaces." source "Represents a compiled strict-domain diagnostic — the shape of `compileAuditor` bound to one shape."
guides/contract.md type ReporterFunction: guide "`(value, path?) => readonly Fault[]` — the coercive-domain counterpart of `AuditorFunction`, with the same optional root-path prefix and the same assignability to `ContractInterface.explain`." source "Represents a compiled coercive-domain diagnostic — the shape of `compileReporter` bound to one shape."
guides/contract.md type SeederFunction: guide "`(random?) => T` — the seed-data source `compileGenerator` produces when it is bound to one shape, and the type of `ContractCompiler`'s `generator`. An absent `random` selects the invocation's own wall-clock-seeded source, so a generator retains no randomness between calls. Named for the seed data rather than for the getter it serves, breaking the symmetry with `AuditorFunction` / `ReporterFunction` deliberately: `GeneratorFunction` is a realm global AND the exact string `isGeneratorFunction` compares against, so a type of that name beside that guard would give one word two contradictory meanings in one barrel — `isGeneratorFunction(contract.generate)` answers `false`." source "Represents a compiled seed-data source — the shape of `compileGenerator` bound to one shape."
guides/contract.md const GENERATION_ATTEMPT_LIMIT: guide "`32` — the base candidate-generation budget `compileGenerator` allows a constrained value before throwing a coded `ContractError`, frozen. A union's effective budget is `max(32, variantCount)`, so every variant is reachable even in a union wider than the base limit." source "Caps the number of candidate-generation attempts for a constrained generated value, frozen."
guides/contract.md const COMPILE_DEPTH_LIMIT: guide "`512` — the maximum supported nesting depth of a compiled shape, frozen. `validateShape` rejects the next level with a `depth` `ContractError` at every compiler entry, before recursive artifact compilation begins." source "Caps the supported nesting depth of a compiled contract shape, frozen."
guides/contract.md const COMPILE_NODE_LIMIT: guide "`16384` — the maximum number of nodes a declaration may EXPAND into, frozen. A shape graph is a DAG and every compiled artifact is a tree, so `objectShape({ left: node, right: node })` nested thirty times is thirty-one authored nodes and more than a billion emitted ones. `validateShape` counts that expansion — one per node per incoming edge — and refuses past this cap with an `expansion` `ContractError` at every compiler entry, so a shared-child declaration gets a bounded answer instead of no answer. `cloneShape` / `ownShape` are deliberately NOT bounded by it: they preserve shared-child identity, so ownership stays proportional to authored nodes and keeps working above the cap. What the cap bounds MOVED when the compilers stopped expanding a DAG. A family is now one entry per unique node, so compiling that thirty-one-node declaration costs thirty-one nodes and the cap is no longer what keeps compilation finite. What still expands is everything a consumer materializes FROM the artifacts: the value `generate` produces, and the document a compiled schema serializes to, are trees of exactly this size. So the cap survives as a bound on what a caller can be handed, not on what the compiler pays — a declaration expanding past it is refused instead of producing a value or a document nobody asked for the size of." source "Caps the number of nodes a compiled artifact may expand a shape into, frozen."
guides/contract.md const PRESENCE_MASK_LIMIT: guide "`31` — the maximum number of object keys one compiled presence mask carries, frozen. A compiled object plan's declared keys are fixed when the plan is built, so each takes a bit position once and a call ORs one bit per own key it finds and compares the result against the full mask — no per-call key collection, and one integer compare in place of one membership dispatch per declared key. The bound is the width a JavaScript bitwise operand has: `1 << position` evaluates on a 32-bit signed integer, so positions run `0` through `30` and a mask stays positive. A declaration with more keys than this is answered rather than refused: `ContractCompiler` builds no position record for it, and its compiled guard, parser, auditor, and reporter decide presence from a collected key vocabulary instead. Both branches answer identically; only the cost differs." source "Caps the number of object keys one compiled presence mask carries, frozen."
guides/contract.md function valueToSchema: guide "value + optional `ValueToSchemaOptions` → `JSONSchema`. Cycle/depth/breadth-bounded (a per-call `WeakMap` memo, keyed by object identity + remaining depth, guards a shared-reference DAG against exponential re-inference). A failed value read throws `valueToSchema: value could not be read`; a failed options read throws `valueToSchema: options could not be read`; both use code `structure`, and neither returns `{}` for unreadability. Leaf order for readable input: `null`, boolean, integer (`Number.isInteger` semantics — `-0` counts), finite non-integer number, string (gains `format` when enabled), array, plain record, then `Date`. Readable JSON-inexpressible values — a non-finite number, function, symbol, bigint, `undefined`, `Map`, `Set`, and other unsupported hosts — still honestly infer the empty accept-anything schema `{}`. Nested objects close by default; truncation or a readable `undefined` property opens them. Budgets are sanitized and output ordering is deterministic." source "Infers a `JSONSchema` for one unknown value — the reverse direction of `compileSchema`."
guides/contract.md function samplesToSchema: guide "samples (`readonly unknown[]`) + optional `ValueToSchemaOptions` → `JSONSchema` — multi-example inference. An empty readable array infers `{}`. Record properties are unioned and a key is required only when present and non-`undefined` in every row; truncation and readable `undefined` properties retain the established open-schema behavior. A key present as `undefined` in some row OPENS the schema and keeps its column, inferred from the rows that do carry it — the column used to be discarded entirely. A hostile getter or failed key walk throws `ContractError { code: 'structure' }` with `samplesToSchema: samples could not be read`; hostile options use the distinct noun `options`. Neither failure drops the key or widens the slot. A SPARSE `samples` array is refused separately and honestly, as `samplesToSchema: samples must be a dense array`: a hole is readable — `valueToSchema` infers `{}` for it — so reporting unreadability was a true refusal with a false reason. Non-record samples unify one value at a time; unanimous formats and low-cardinality repeated enums retain their existing precedence and deterministic ordering. Budgets are sanitized as in `valueToSchema`." source "Infers a `JSONSchema` from a set of example values — the multi-example counterpart of `valueToSchema` (for example inferring one schema from several database rows)."
guides/contract.md function unifySchemas: guide "`readonly JSONSchema[]` → `JSONSchema` — requires every dense runtime member to be a realm-agnostic plain record, de-duplicates by canonical key, collapses bare integer plus number to number, and returns one schema directly or a sorted `anyOf`. An empty readable list returns `{}`. One `undefined`, primitive, `null`, callable, array, or exotic object rejects the whole list as `unifySchemas: schemas could not be read`; ordinary, null-prototype, and genuine cross-realm plain records remain valid. A readable record whose contents are JSON-inexpressible has no key, so it is kept after sorted keyed members." source "Unifies a list of inferred `JSONSchema` fragments into one schema."
guides/contract.md function canonicalStringify: guide "`unknown` → `string | undefined` — deterministic key-sorted JSON encoding. Arrays use the shared dense own-index lens; a non-native advertised length is unreadable rather than an empty array. A readable JSON-inexpressible value (`undefined`, function, symbol, bigint, hole, or cycle) returns `undefined`, which is the honest “no canonical key” answer. A throwing getter, hostile `ownKeys`, or revoked `Proxy` instead throws `ContractError { code: 'structure' }` with `canonicalStringify: value could not be read`, so callers can distinguish invalidity from unreadability. The iterative walk behind it is interned, so the door's name is the only one a refusal ever carries and the caller reaches the host failure through one `cause`." source "Renders a value as a deterministic, key-sorted JSON string — or `undefined` when it has no faithful JSON encoding."
guides/contract.md function encodeLeaf: guide "`unknown` → `string | undefined` — the leaf half of `canonicalStringify`. It encodes one non-container value exactly as the captured `JSON.stringify` does, so a `Date` or any other non-record object keeps the ordinary meaning of its `toJSON` member, and it answers `undefined` for the values JSON cannot encode at all (`undefined` itself, a function, a symbol). A bigint is refused BEFORE the call rather than through it, because `JSON.stringify` throws on one. Reach for it when you want JSON's own verdict on a single leaf rather than on a whole graph." source "Encodes one non-container value the way JSON encodes it, or `undefined` when JSON cannot encode it at all."
guides/contract.md function buildSampleMemo: guide "`() => SampleMemo` — build the empty memo one multi-sample walk owns, from the CAPTURED `WeakMap` and `Map` so a replaced global cannot decide what a published schema is served from. The walk behind `samplesToSchema` builds its own and grows a fresh node per row prefix inside it, so no caller supplies a memo and one memo never spans two walks." source "Builds one empty `SampleMemo` node."
guides/contract.md function readSampleMemo: guide "memo + the reader's name → the same `SampleMemo` — the memo argument's own gate. The walk behind `samplesToSchema` asks it of every node it reads back out of its own prefix chain, before it stores a schema there. The memo reaches a `WeakMap` and a `Map` the walk stored a node in, and both are reachable untyped from JavaScript, so a wrong value there fails inside the traversal and publishes `samples could not be read` — a true refusal naming the wrong argument. It refuses under the memo's own name and path instead, with code `structure` and `limit: 'SampleMemo'`." source "Checks that a value really is a `SampleMemo` before a walk stores a published schema in it."
guides/contract.md function inferPrimitiveEnum: guide "slot values + a cardinality limit → `{ enum: [...] } | undefined` — fires only for a single-primitive-kind (all string or all number), repeated (distinct count < value count), low-cardinality (distinct count ≤ limit) slot; emits `enum` with NO `type` key, byte-matching `compileSchema`'s `literalShape` emission. Members sorted by canonical key (lexicographic, so a numeric enum is not necessarily ascending). A member with no canonical key makes the whole slot enum-INELIGIBLE (`undefined`), widening to the caller's bare `type`. Every `undefined` above is a verdict about values it READ: the slot list is a required read and must be DENSE, so a hole, or a `length`/index read that throws, refuses with `inferPrimitiveEnum: values could not be read` (`structure`, exact `cause`) rather than reporting ineligibility it never established." source "Infers an `{ enum: [...] }` fragment for a low-cardinality, repeated primitive slot — the multi-sample-only counterpart to `stringToFormat` (`valueToSchema` never emits `enum`)."
guides/contract.md function stringToFormat: guide "`string` → `SchemaFormat | undefined` — a runtime non-string returns `undefined` before any property read or coercion. Fixed precedence `uuid` > `date-time` > `date` > `time` > `email` > `uri`, first match wins. A value longer than `FORMAT_MAX_LENGTH` returns `undefined` immediately (no pattern match runs). `date-time` / `date` / `time` require both an ISO-8601 shape match and a real `matchesISOInstant` Gregorian calendar/clock check before final Date validity; normalized overflow such as non-leap February 29, April 31, February 30, and hour 24 is rejected. `time` is RFC 3339 full-time and REQUIRES a `Z`/numeric offset — `'10:30:00'` (no offset) infers `undefined`, not `time` (a deliberate default-output change; use `'10:30:00Z'` / `'10:30:00+02:00'`). The `uri` matcher deliberately requires a `scheme://` prefix, so it under-detects `mailto:` / `urn:` values on purpose. Total, pure, deterministic." source "Classifies a string against the `SchemaFormat` vocabulary."
guides/contract.md function classifyFormat: guide "The pure pattern-dispatch leaf behind `stringToFormat`: it performs the `RegExp` tests and calendar checks, and the door decides what a failed dispatch answers. Called directly it throws whatever a redirected pattern dispatch threw; `stringToFormat` contains that and answers `undefined`, which is the contract it documents." source "Classifies an already-bounded string against the pattern-only and calendar-checked `SchemaFormat` vocabulary."
guides/contract.md function samplesToFormat: guide "`readonly unknown[]` → `SchemaFormat | undefined` — a format fires only when every value is a string AND all map to the SAME `stringToFormat` result; a disagreeing value, a non-string, or an empty list all yield `undefined`. Those three are statements about values it READ. The list itself is a required read and must be DENSE, so a hole, or a `length`/index read that throws, refuses with `samplesToFormat: values could not be read` (`structure`, exact `cause`) and never `undefined` — an unread sample cannot agree or disagree about a format." source "Classifies a list of sample values against the `SchemaFormat` vocabulary, requiring unanimity."
guides/contract.md function matchesISOInstant: guide "`string` → `boolean` — accepts only exact `YYYY-MM-DD`, or exact `YYYY-MM-DDTHH:MM:SS` with optional fractional seconds and required `Z`/numeric offset. Its attempt-guarded component validation enforces real month lengths with century leap-year rules and hour 0–23 plus minute/second 0–59 before the final Date/offset check; backs `stringToFormat`'s `date-time` / `date` / `time` branches." source "Checks whether a supported ISO-8601 date or date-time names a real instant."
guides/contract.md interface ValueToSchemaOptions: guide "`{ limits?, closed?, format?, enum? }` — `limits` groups the two walk budgets under the entity noun they configure (see `ValueToSchemaLimits`); `closed` defaults to `true`; `format` and `enum` default to `false`." source "Groups the options for `valueToSchema` / `samplesToSchema`."
guides/contract.md interface ValueToSchemaLimits: guide "`{ depth?, properties? }` — the per-walk budgets `ValueToSchemaOptions` groups under `limits`. `depth` is held at `INFER_DEPTH_LIMIT` through `sanitizeDepth` and NARROWS the walk only; `properties` defaults to `INFER_BREADTH_LIMIT` through `sanitizeBudget` — a non-finite-non-negative-integer input falls back to the default rather than flowing through." source "Holds the per-walk budgets `ValueToSchemaOptions` groups under `limits`."
guides/contract.md interface SampleMemo: guide "`{ rows: WeakMap<object, SampleMemo>, schemas: Map<string, JSONSchema> }` — the per-walk memo the walk behind `samplesToSchema` builds for itself through `buildSampleMemo` and gates through `readSampleMemo`, never one a caller hands in. `rows` is one step of a prefix chain keyed by the ORDERED identities of the rows a slot collected, so two slots collecting the same rows in the same order share one entry and two slots collecting different rows never do; `schemas` holds that row list's already-inferred results, keyed by every budget and flag the emitted schema depends on, so the memo can only ever return the schema a fresh call would have produced. It is traversal state, not a cache to keep: nothing is invalidated when a sample row is later mutated." source "Holds the per-walk memo the multi-sample walk behind `samplesToSchema` owns, keyed by the ORDERED identities of the rows a slot collected."
guides/contract.md function sanitizeDepth: guide "candidate `number | undefined` → a finite non-negative integer no greater than `INFER_DEPTH_LIMIT` — the depth axis's ceiling, applied at every door that accepts a caller-supplied depth (`valueToSchema`, `samplesToSchema`). `sanitizeBudget` decides a budget's SHAPE and lets any finite non-negative integer through, because it must never read a hostile fallback; that left depth — the recursing axis — unbounded from above, so a valid-but-huge `limits.depth` descended until the call STACK failed at a depth that varied between runs, surfacing as an unreadable value rather than as exhaustion. `limits.depth` therefore NARROWS the walk and cannot widen it. Breadth needs no ceiling; its loop is already bounded by the entries present." source "Resolves a caller's depth budget to one the traversal can actually survive."
guides/contract.md function sanitizeBudget: guide "candidate `number | undefined` + a fallback → a finite non-negative integer — `valueToSchema` / `samplesToSchema`'s option-hygiene boundary: a valid candidate returns immediately without inspecting the fallback; otherwise a valid fallback is selected. `NaN` (which defeats a bare `depth <= 0` guard), `Infinity`, negative, and fractional candidates therefore fall back instead of corrupting the depth guard or a `slice(0, n)` bound. If the selected fallback is not itself a finite non-negative integer, the helper throws a cause-free `ContractError` with code `bound` rather than returning an invalid budget." source "Sanitizes a user-supplied inference budget (`limits.depth` / `limits.properties`) to a finite non-negative integer, selecting a valid fallback for anything else."
guides/contract.md const INFER_DEPTH_LIMIT: guide "`32` — the maximum object/array nesting depth inference walks, frozen. Lowerable per call through `limits.depth`; a higher value is held here, because the walk recurses and the call stack it would spend is not a fixed quantity across hosts or across calls." source "Caps the object/array nesting depth `valueToSchema` walks, frozen."
guides/contract.md const INFER_BREADTH_LIMIT: guide "`256` — the default maximum number of object properties / array elements sampled per container, frozen." source "Caps by default the number of object properties / array elements `valueToSchema` samples per container, frozen."
guides/contract.md const INFER_ENUM_LIMIT: guide "`12` — the default maximum distinct-value count a multi-sample slot may hold before enum inference gives up, frozen." source "Caps by default the number of distinct values a multi-sample slot may hold before enum inference gives up and falls back to a bare `type`, frozen."
guides/contract.md const FORMAT_MAX_LENGTH: guide "`128` — the maximum string length `stringToFormat` attempts to classify, frozen; a longer value returns `undefined` immediately, bounding per-string format-detection work against a pathologically long candidate." source "Caps the string length `stringToFormat` attempts to classify, frozen."
guides/contract.md const FORMAT_PATTERNS: guide "`{ uuid, email, uri }` — the frozen pure-regex matchers backing `stringToFormat`'s pattern-only formats (the ISO date/time formats additionally need `matchesISOInstant`, so their pattern lives inline)." source "Holds the pure-regex matchers backing `stringToFormat`'s pattern-only formats (`uuid` / `email` / `uri`), frozen as data."
guides/contract.md function compileAuditor: guide "shape + value (+ optional path) → `readonly AuditFault[]`, self-recursive — the diagnostic for the domain `is` and `schema` describe. It mirrors the strict guard rather than `parse`'s coercion: `audit(v).length === 0` if and only if `is(v)` for a readable, stably-read value (see Domains), so a coercible leaf faults here and not in `explain`. A closed object's extras report `'extra'` without reading their value; a constraining tail recurses. Every report is capped at `FAULT_LIMIT`. A failed container reflection or value read throws the shared coded refusal carrying the current `{ path, shape }`, so unreadability is never reported as a type mismatch. See \"How a union is audited and reported\" after this table." source "Audits a value against the strict acceptance domain of a `ContractShape`."
guides/contract.md function compileReporter: guide "shape + value (+ optional path) → `readonly Fault[]`, self-recursive. A leaf that fails to coerce reports one `'type'` fault; a coercible leaf that violates a refinement reports one `'constraint'` fault per violated refinement. An absent required object key reports `'missing'`; a present key recurses. A closed object's extras never fault, because `parse` drops them; a constraining `additionalProperties` shape recurses extras against it. Faults are collected in stable pre-order and capped at `FAULT_LIMIT`; a hostile getter or `Proxy` failure remains one top-level type fault. See \"How a union is audited and reported\" after this table." source "Compiles a `ContractShape` into a structured fault report for a value — the diagnostic counterpart of `compileGuard` / `compileParser`."
guides/contract.md function buildStringFaults: guide "string shape + string + path (+ optional pre-captured pattern) → `readonly Fault[]` — the single source of the string refinement report, consumed by `compileReporter` and `compileAuditor`. The two doors differ only in how they obtain the string — the reporter coerces through `parseString`, the auditor demands a primitive — and share every constraint afterwards through this one helper, so a constraint cannot drift between them. Faults come out in declaration order: `min`, then `max`, then `pattern`. The declaration's pattern is applied through an owned stateless rebuild, so the shape's own pattern never moves a caller's `lastIndex`. An unreadable declaration is refused as `buildStringFaults: shape could not be read`. See \"Supplying a rebuilt pattern\" after this table." source "Builds the refinement faults a string value has against a `StringShape`."
guides/contract.md function buildNumberFaults: guide "number shape + number + path → `readonly Fault[]` — the numeric sibling of `buildStringFaults`, shared by the same two doors. `expected` is the DECLARATION's kind (`'integer'` when `integer: true`, else `'number'`), never the value's, and order is `integer`, then `min`, then `max`. An unreadable shape is refused as `buildNumberFaults: shape could not be read`, through the same boundary and for the same reason." source "Builds the refinement faults a number value has against a `NumberShape`."
guides/contract.md function buildArrayFaults: guide "array shape + length + path → `readonly Fault[]` — the length half of the array report, taking the LENGTH rather than the array because both doors have already read their entries through `readArrayEntries` and must report the count that read observed rather than re-asking the caller's value. Order is `min`, then `max`. An unreadable shape is refused as `buildArrayFaults: shape could not be read`, through the same boundary and for the same reason." source "Builds the length faults an array has against an `ArrayShape`."
guides/contract.md function selectClosestFaults: guide "reports → the closest one — the union summary both doors append their closest variant's faults to. \"Closest\" is the SHORTEST report and an earlier variant wins a tie, so a union's diagnostic follows declaration order rather than whichever variant a later comparison happened to visit. The winner is returned BY IDENTITY, never copied, so the summary carries the exact fault objects the variant produced; no report at all yields a frozen empty collection rather than `undefined`." source "Selects the report of the variant that came closest to matching."
guides/contract.md function shapeToKind: guide "shape → `FaultKind` — projects a `ContractShape` to the kind it describes (`numberShape` → `'integer'` when `integer: true`, else `'number'`; `optionalShape` / `nullableShape` project through their inner shape; `rawShape` → `'json'`). A hand-authored node carrying an unrecognized discriminant is REFUSED as `shapeToKind: shape could not be read`, so the declared non-optional return type stays true at a public export. The discriminant is only half of it — this is a REQUIRED reader over the whole node, so a `category` that cannot be read at all raises the identical refusal, and an `optional` / `nullable` whose inner projection refuses surfaces under the OUTER name with the inner failure as `cause`. The reader that owns the projection is the one that names it, at whatever depth the projection actually failed." source "Projects a `ContractShape` to the `FaultKind` it describes."
guides/contract.md function preview: guide "value → `string` — a short, TOTAL preview for a `Fault`'s `received` field. String and narrowed-symbol text is printable JSON-escaped content: strings retain outer quotes, symbols use intrinsic `String(value)` without retrieving mutable `Symbol.prototype.toString` and omit only the escaping quotes. A string takes its answer from one whole-string encode when the string is within `PREVIEW_LIMIT` code units and that encode fits the same limit; every other string and every symbol renders through one bounded indexed encoder that appends complete escaped code-point tokens within `PREVIEW_LIMIT`. Neither path retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping. Arrays render as `array`; every other host renders as its bare `typeof` tag. It never traverses or stringifies a container and does not promise grapheme-cluster preservation." source "Renders an unknown value as a short, safe, TOTAL string for a `Fault`'s `received` field."
guides/contract.md const FAULT_LIMIT: guide "`64` — the maximum entries a single `explain` OR `audit` report ever returns, frozen. It bounds both reporting surfaces: `compileReporter` and `compileAuditor` each slice every recursive call to it, so the cap holds at every nesting level, and a diagnostic surface sized off this constant is right about `audit` too." source "Caps the number of `Fault` / `AuditFault` entries a single `explain` or `audit` report ever returns, frozen."
guides/contract.md const PREVIEW_LIMIT: guide "`64` — the maximum code-unit budget for complete encoded tokens in a `preview`; a clipped result adds one trailing `…`, frozen." source "Caps the character length of a `preview`-rendered string, frozen."
guides/contract.md type Fault: guide "discriminated union on `reason`: `'type'` (`{ path, expected, received }`), `'missing'` (`{ path, expected }`), `'constraint'` (`{ path, expected, constraint, limit?, received }`), `'variant'` (`{ path, variants }`), `'oneOf'` (`{ path, matched }`)." source "Represents a single structured parse-failure diagnostic — one entry of an `ContractInterface.explain` report."
guides/contract.md interface ExtraFault: guide "`{ readonly reason: 'extra'; readonly path: FieldPath }` — a key present on a value that its closed object shape does not declare; the final path segment is the offending key, and no value is read or carried." source "Represents a key present on a value that its closed object shape does not declare."
guides/contract.md type AuditFault: guide "`Fault | ExtraFault` — every fault a strict audit reports: the existing structured faults plus undeclared-key faults." source "Covers every fault an audit reports — the parse faults plus undeclared keys."
guides/contract.md type FaultKind: guide "`'string' | 'number' | 'integer' | 'boolean' | 'null' | 'literal' | 'array' | 'object' | 'union' | 'json'` — the kind a fault expected." source "Names the kind of value a `Fault` expected — the shape-projected counterpart of a `ContractShape`'s `category`."
guides/contract.md type FaultConstraint: guide "`'min' | 'max' | 'pattern' | 'integer'` — the refinement a `'constraint'` fault violates." source "Names the refinement a `Fault` of reason `'constraint'` violates."
guides/contract.md JSONClonerInterface.clone: guide absent source "Clones the retained source into exact, deeply frozen JSON data."
guides/contract.md SchemaClonerInterface.clone: guide absent source "Clones the retained schema into a deeply frozen identity-preserving graph."
guides/contract.md ShapeClonerInterface.clone: guide absent source "Clones the retained shape into a deeply frozen identity-preserving graph."
guides/contract.md ShapeValidatorInterface.validate: guide absent source "Validates the retained shape declaration."
guides/contract.md ContractInterface.parse: guide absent source absent
guides/contract.md ContractInterface.audit: guide absent source "Reports every strict fault a value has against this contract."
guides/contract.md ContractInterface.explain: guide absent source "Reports every structured parse fault a value has against this contract."
guides/contract.md ContractInterface.generate: guide absent source absent
guides/contract.md pitch: readme absent tagline "The contract & validation surface — runtime type guards, guard combinators, flat parsers, and a shape DSL. Narrow `unknown` safely, compose guards, coerce-and-extract a field, or declare a value's shape once and compile it into `schema`, `is`, `parse`, `audit`, `explain` and `generate` — every one of them derived from a single owned snapshot of that declaration. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 322
```

## Observations, not criteria

- `npm run test:src:core` reads `Test Files 19 passed (19)`, `Tests 1350 passed (1350)`, exit 0.
- `npm run test:setup` reads `Test Files 2 passed (2)`, `Tests 61 passed (61)`, exit 0.
- `npm ls @orkestrel/guide` reads `@orkestrel/guide@0.0.18 invalid: "^0.0.17" from the root project`, exit 1, as the standing conditions state. `package.json` keeps that range and `npm install` was never run.

## Deviation state

No deviation. `repair` wrote the P21 list exactly, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reddened only on `guides/contract.md` lines the brief scopes in, and every gate other than `docs` reads green.
