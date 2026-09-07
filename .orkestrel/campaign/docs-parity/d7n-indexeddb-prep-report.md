# Report — `d7n-indexeddb-prep`

Wall clock: 2026-09-07T15:14:53Z (first command) to 2026-09-07T15:20:22Z (last command), about 5 minutes 29 seconds.

## Deviation

`npm run test:config` reads red after the items, on a file the P21 reading and the brief's standing
conditions never named as failing: `tests/config.test.ts` (a path `repair --offline` wrote, matching
the P21 list exactly). This is a gate other than `docs` reading red after the items, which the
deviation contract requires stopping and reporting rather than fixing.

- **Expected.** The brief's acceptance criterion 3 states `npm run test:config` exits `0`.
- **Found.**

```text
 FAIL  |config| tests/config.test.ts > configuration helpers > reads the compiler scope and fixed extractor override a declaration roll-up requires
Error: ENOENT: no such file or directory, open '/home/user/fleet/indexeddb/configs/src/tsconfig.core.json'
 ❯ tests/config.test.ts:2142:40
   2140|   const compiler = createRequire(import.meta.url).resolve('typescript/…
   2141|   const project = resolve(root, 'configs/src/tsconfig.core.json')
   2142|   const declared: unknown = JSON.parse(readFileSync(project, 'utf8'))

 Test Files  1 failed (1)
      Tests  1 failed | 171 passed | 1 skipped (173)
```

- **Evidence.** `configs/src/tsconfig.core.json` never existed in this checkout: `git show
  a3f4221:configs/src/tsconfig.core.json` reports `fatal: path 'configs/src/tsconfig.core.json' does
  not exist in 'a3f4221'`. `indexeddb` carries only `src/browser` (confirmed by `ls src/`), rebranded
  to a single-surface browser package in commit `e7ac59e` ("Rebrand to `@orkestrel/indexeddb` as a
  single-surface browser package"). The failing case at `tests/config.test.ts:2137-2142` (vendored by
  `repair --offline`, unedited by this unit) hardcodes a read of a `core` project's `tsconfig.json`
  with no branch for a browser-only package.
- **Done / not done.** Items 1, 2, 3, and 4 are done, with every other acceptance criterion green
  (see following). This one case inside `test:config` is not done and is not this unit's file to
  fix: `tests/config.test.ts` is scaffold-vendored content `repair` writes, off-limits to author edits
  per `.agents/orchestration.md` § Publishing the fleet (`Never edit a vendored file inside a target.
  repair restores it`), and the brief's items name no change to this file.
- **Hypothesis.** The vendored `tests/config.test.ts` template assumes every repaired package
  declares a `core` project and has no browser-only branch.

## Items

### 1. `repair --offline`

```text
0 of 37 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 7.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 29 unchanged, 0 removed in ..
```

`git status --short` immediately after:

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

### 2. The drop-in's adaptation (`tests/guides.test.ts`)

Methods loop:

```diff
-		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
-			const entity = group.interface.replace(/Interface$/, '')
+		for (const group of guide.methods()) {
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
+			const entity = group.interface.replace(/Interface$/, '')
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
 		}
```

Examples case:

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
```

Examples loop:

```diff
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
```

No other change to the suite.

### 3. The voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named every diagnostic below;
each fix and its sending diagnostic:

- `tests/src/browser/IndexedDBDatabase.test.ts:1006:3` `policy(no-banned-term)` (`just`):

```diff
-		// forever — proving `onclose` cleared BOTH latches, not just `#database`.
+		// forever — proving `onclose` cleared BOTH latches, not only `#database`.
```

- `src/browser/IndexedDBDatabase.ts:192:4` `policy(no-banned-term)` (`just`):

```diff
-			// `settled` may still reject (the abort this catch just performed, or the
+			// `settled` may still reject (the abort this catch performed, or the
```

- `src/browser/IndexedDBDatabase.ts:326:2` `policy(no-banned-term)` (`just`):

```diff
-	// create-missing-stores pass so `stores.names` reflects any store just created.
+	// create-missing-stores pass so `stores.names` reflects any store already created.
```

- `src/browser/types.ts:28:1` `policy(no-banned-term)` (`e.g.` at line 42):

```diff
- * (native `ReadOnlyError` — a write attempted on a `readonly` transaction, e.g.
+ * (native `ReadOnlyError` — a write attempted on a `readonly` transaction, for example
```

- `src/browser/types.ts:110:1` `policy(no-banned-term)` (`just` at line 116):

```diff
- * the stores the database holds at that moment, so it already reflects any store
- * the built-in create-missing pass just created. `create` / `drop` add or remove
+ * the stores the database holds at that moment, so it reflects any store
+ * the built-in create-missing pass already created. `create` / `drop` add or remove
```

- `src/browser/types.ts:161:1` `policy(no-banned-term)` (`just` at line 167):

```diff
- * so `stores.names` already reflects any store just created from the declared
+ * so `stores.names` already reflects any store created from the declared
```

- `tests/setupBrowser.ts:182:1` `policy(no-banned-term)` (`via`) and `tests/setupBrowser.ts:185:1`
  `policy(no-banned-term)` (`just`):

```diff
 // reuse (`.claude/rules/tests.md` § Shared test infrastructure): each opens a
-// uniquely-named database via
+// uniquely-named database through
 // {@link createTestDatabase}, sets the rows, and adds its `cleanup` to the
 // caller's `createTeardown()` list (which the file destroys from an `afterEach`).
-// The seed returns just the connected `db`.
+// The seed returns the connected `db`.
```

- `tests/setupBrowser.ts:72:1` `policy(no-malformed-summary)`:

```diff
 /**
- * A process-unique IndexedDB database name — a monotonic counter under an
- * optional prefix, so concurrent tests never collide on a shared store.
+ * Builds a process-unique IndexedDB database name from a monotonic counter
+ * under an optional prefix, so concurrent tests never collide on a shared store.
```

- `tests/setupBrowser.ts:84:1` `policy(no-malformed-summary)`:

```diff
-/** A connected test database plus the boilerplate to identify and dispose it. */
+/** Represents a connected test database plus the boilerplate to identify and dispose it. */
```

- `tests/setupBrowser.ts:119:1` `policy(no-malformed-summary)`:

```diff
 /**
- * Open a fresh, connected IndexedDB database over a store schema, under a unique
+ * Opens a fresh, connected IndexedDB database over a store schema, under a unique
```

- `tests/setupBrowser.ts:145:1` `policy(no-malformed-summary)`:

```diff
 /**
- * Drive a cursor chain to its end, collecting every visited cursor — the
+ * Drives a cursor chain to its end, collecting every visited cursor — the
```

- `tests/setupBrowser.ts:166:1` `policy(no-malformed-summary)`:

```diff
 /**
- * The `code` of a caught value when it is an {@link IndexedDBError}, else
- * `undefined` — lets a test assert the machine-readable code without a
- * conditional `expect` around the `instanceof` narrowing.
+ * Returns the `code` of a caught value when it is an {@link IndexedDBError},
+ * else `undefined`, letting a test assert the machine-readable code without a
+ * conditional `expect` around the `instanceof` narrowing.
```

- `tests/setupBrowser.ts:187:1` `policy(no-malformed-summary)`:

```diff
-/** The store schema {@link seedUsers} opens — a `users` store with a non-unique
+/** Defines the store schema {@link seedUsers} opens — a `users` store with a non-unique
  *  `byAge` index and a unique `byEmail` index. */
```

- `tests/setupBrowser.ts:199:1` `policy(no-malformed-summary)`:

```diff
-/** The store schema {@link seedStore} opens — a plain `users` store keyed by `id`. */
+/** Defines the store schema {@link seedStore} opens — a plain `users` store keyed by `id`. */
```

- `tests/setupBrowser.ts:204:1` `policy(no-malformed-summary)`:

```diff
 /**
- * Seed a `users` store keyed by `id` with a non-unique `byAge` index and a unique
+ * Seeds a `users` store keyed by `id` with a non-unique `byAge` index and a unique
```

- `tests/setupBrowser.ts:225:1` `policy(no-malformed-summary)`:

```diff
 /**
- * Seed a plain `users` store keyed by `id` (no secondary index) with three numbered
+ * Seeds a plain `users` store keyed by `id` (no secondary index) with three numbered
```

`npm run test:policy` after these fixes named no line in `guides/**` or `README.md` (see criterion 3
below): no substitution-table edit applied there, per the brief's conditional instruction.

### 4. The bump

```diff
-	"version": "0.0.10",
+	"version": "0.0.11",
```

The `^0.0.17` `@orkestrel/guide` range and `package-lock.json` are untouched.

## Acceptance criteria

1. `git status --short`:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/browser/IndexedDBDatabase.ts
 M src/browser/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupBrowser.ts
 M tests/setupPolicy.ts
 M tests/src/browser/IndexedDBDatabase.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, `tests/guides.test.ts`, and the files item 3 edited (`src/browser/IndexedDBDatabase.ts`,
`src/browser/types.ts`, `tests/setupBrowser.ts`, `tests/src/browser/IndexedDBDatabase.test.ts`), and
nothing else. Each file item 3 edited and its sending diagnostic is named in item 3 above.

2. `npm run format:check`:

```text
Checking formatting...

All matched files use the correct format.
Finished in 3950ms on 54 files using 4 threads.
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` exits `0` with no output.

`npm run check`:

```text
> @orkestrel/indexeddb@0.0.11 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/indexeddb@0.0.11 check:src
> npm run check:src:browser

> @orkestrel/indexeddb@0.0.11 check:src:browser
> tsc --noEmit -p configs/src/tsconfig.browser.json
```

Exits `0` with no diagnostics.

3. `npm run test:guides`:

```text
 Test Files  1 passed (1)
      Tests  68 passed (68)
```

`npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

`npm run test:config` reds — see Deviation:

```text
 Test Files  1 failed (1)
      Tests  1 failed | 171 passed | 1 skipped (173)
```

4. `npm run docs` reads `rows read: 1, disagreements found: 104` and exits `1`, verbatim:

```text
guides/indexeddb.md type KeyPath: guide "A key path — one field, or several for a compound key." source "Represents a key path — one field, or several for a compound key."
guides/indexeddb.md interface IndexDefinition: guide "A secondary index's definition (`name` / `path` / `unique` / `multiple`)." source "Represents a secondary index on a store."
guides/indexeddb.md interface StoreDefinition: guide "A store's schema (`path` / `increment` / `indexes`)." source "Represents a store's schema."
guides/indexeddb.md type IndexedDBSchema: guide "A database's schema — a map of store name to its `StoreDefinition`." source "Represents a database's schema — a map of store name to its `StoreDefinition`."
guides/indexeddb.md interface IndexedDBUpgradeContext: guide "The versionchange upgrade escape hatch (`transaction` / `old` / `version` / `stores` / `indexes`)." source "Represents the escape hatch into a version-change upgrade, passed to `IndexedDBDatabaseOptions.upgrade`."
guides/indexeddb.md interface IndexedDBUpgradeStoreManagerInterface: guide "The upgrade's store manager (`names` / `create` / `drop` / `store`)." source "Represents the store manager of a version-change upgrade."
guides/indexeddb.md interface IndexedDBUpgradeIndexManagerInterface: guide "The upgrade's secondary-index manager (`create` / `drop`)." source "Represents the secondary-index manager of a version-change upgrade."
guides/indexeddb.md interface IndexedDBDatabaseOptions: guide "Options for `createIndexedDBDatabase` (`name` / `version?` / `stores` / `upgrade?`)." source "Represents the options for `createIndexedDBDatabase`."
guides/indexeddb.md interface IndexedDBCursorOptions: guide "Options for opening a cursor (`query` key range, `direction`)." source "Represents the options for opening a cursor."
guides/indexeddb.md type IndexedDBErrorCode: guide "The machine-readable `IndexedDBError` code union." source "Represents a machine-readable `IndexedDBError` code."
guides/indexeddb.md interface IndexedDBDatabaseInterface: guide "The database contract (`database` / `name` / `version` / `stores` / `open`)." source "Represents a browser-native IndexedDB database."
guides/indexeddb.md interface IndexedDBRecordStoreInterface: guide "The keyed record surface the store contracts share; it declares no readonly member." source "Represents the keyed record surface of an object store, in or out of an explicit transaction."
guides/indexeddb.md interface IndexedDBStoreInterface: guide "The object-store contract (`name` / `path` / `indexes` / `increment`) plus `index`." source "Represents an object store — the keyed record surface plus the store's own schema metadata and `index` accessor."
guides/indexeddb.md interface IndexedDBIndexInterface: guide "The secondary-index contract (`name` / `path` / `unique` / `multiple`)." source "Represents a secondary index — read access by an indexed key path."
guides/indexeddb.md interface IndexedDBCursorInterface: guide "The cursor contract (`cursor` / `source` / `key` / `primary` / `value` / `direction`)." source "Represents a promisified value cursor for streaming and in-place mutation."
guides/indexeddb.md interface IndexedDBTransactionInterface: guide "The explicit-transaction contract (`transaction` / `mode` / `stores` / `active` / `finished` / `error`)." source "Represents an explicit transaction over one or more stores."
guides/indexeddb.md interface IndexedDBTransactionStoreInterface: guide "The transaction-bound store contract — the record surface plus the raw `store`." source "Represents an object store bound to an explicit transaction."
guides/indexeddb.md IndexedDBDatabaseInterface.connect: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.store: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.read: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.write: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.close: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.drop: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.set: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.add: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.clear: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.set: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.add: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.clear: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.index: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.primary: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.continue: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.seek: guide absent source "Advances to a given index key and primary key."
guides/indexeddb.md IndexedDBCursorInterface.advance: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.update: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBTransactionInterface.store: guide absent source absent
guides/indexeddb.md IndexedDBTransactionInterface.abort: guide absent source absent
guides/indexeddb.md IndexedDBTransactionInterface.commit: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.set: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.add: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.clear: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeStoreManagerInterface.create: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeStoreManagerInterface.drop: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeStoreManagerInterface.store: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeIndexManagerInterface.create: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeIndexManagerInterface.drop: guide absent source absent
guides/indexeddb.md pitch: readme absent tagline "A lean, typed, Promise-based wrapper over the raw browser `IDBDatabase` / `IDBObjectStore` / `IDBIndex` / `IDBTransaction` API. Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into one you can `await` — and nothing more. It exposes exactly what raw IndexedDB offers natively — object stores, secondary indexes, native key ranges, promisified cursors, and native multi-store transactions — and deliberately nothing else: there is no `where` / `filter` / `order` / aggregate query builder here; that would duplicate a general-purpose query engine this package does not ship. Source: `src/browser`. Surfaced through the `@src/browser` barrel (published as `@orkestrel/indexeddb`)."
rows read: 1, disagreements found: 104
```
