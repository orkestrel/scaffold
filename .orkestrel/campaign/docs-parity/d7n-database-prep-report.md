# Report — P.1 `d7n-database-prep`

## Outcome

The items all landed; two acceptance criteria stay red on a cause outside this unit's scope. The
checkout's `node_modules/@orkestrel/probe` is the registry `0.0.12`, which exports no `Diagnostic`,
`parseProjectConfig`, or `scanDiagnostics`, and `tests/setupServer.ts:8,19` imports all three. So
`npm run check` exits 2 on those imports alone and `npm run test:guides` dies at collection before
any test registers. Both readings predate every edit here, and the fix is a package install this
unit is barred from.

The adaptation itself is proved: the five `TS2345` record-shape errors P21 recorded are gone from
`check`, and the four remaining diagnostics are the probe imports.

- Repair wrote the P21 list exactly.
- The drop-in's three shared blocks now match `/home/user/fleet/abort/tests/guides.test.ts` byte for
  byte.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0: every `policy/no-malformed-summary`
  and `policy/no-banned-term` diagnostic is fixed.
- `npm run format:check`, `npm run test:policy`, and `npm run test:config` exit 0.
- `npm run docs` reads `rows read: 1, disagreements found: 204` and exits 1, as expected.
- `version` is `0.0.14`.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
0 of 46 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 12.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 38 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, matching the P21 list:

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

`package.json` took the `docs` script row; `tsconfig.json` took the own-specifier `paths` entries
(`@orkestrel/database`, `@orkestrel/database/browser`, `@orkestrel/database/server`);
`.oxlintrc.json` took `policy/no-malformed-summary` and `policy/no-banned-term`.

## Item 2 — the drop-in's adaptation

Failing first, immediately after item 1 and before this edit:

```text
$ npm run check
tests/guides.test.ts(639,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
tests/guides.test.ts(642,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
tests/guides.test.ts(646,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
tests/guides.test.ts(661,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
tests/guides.test.ts(689,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
```

After the edit those five are gone from `npm run check`.

The hunk (`git diff -- tests/guides.test.ts`):

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
 		}
@@
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
@@
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
@@
 			expect(names).toContain('QueryInterface')
-			expect(source.methods('TableInterface')).toContain('count')
-			expect(source.methods('QueryInterface')).toContain('count')
+			expect(source.methods('TableInterface').map((method) => method.name)).toContain('count')
+			expect(source.methods('QueryInterface').map((method) => method.name)).toContain('count')
 		})
```

The final pair is the package's own `keeps table, query, and transaction implementations internal`
case, which the brief's facts block lists as a drop-in site (`715`, `716`). It reads the same
`source.methods` record shape, so it takes the same `.map((method) => method.name)` adaptation and
keeps its asserted value `'count'` unchanged. Left alone it would red at runtime against a
`MethodEntry`.

The shared blocks now equal the pilot byte for byte, proved against the tree left behind:

```text
$ diff <(sed -n '631,655p' tests/guides.test.ts) <(sed -n '146,170p' /home/user/fleet/abort/tests/guides.test.ts) && echo IDENTICAL
IDENTICAL
$ diff <(sed -n '658,674p' tests/guides.test.ts) <(sed -n '191,207p' /home/user/fleet/abort/tests/guides.test.ts) && echo IDENTICAL
IDENTICAL
$ diff <(sed -n '688,706p' tests/guides.test.ts) <(sed -n '208,226p' /home/user/fleet/abort/tests/guides.test.ts) && echo IDENTICAL
IDENTICAL
```

The import walk's `findMissing(names, exported)` reads strings on both sides and stays as written.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named 59 sites: 52
`policy/no-malformed-summary` and 7 `policy/no-banned-term`, in the files the standing conditions
list. Every site is a doc block or a comment. No diagnostic named an off-limits file. Each line
below is the site's line in the tree left behind.

### `policy/no-banned-term`

| Site | Term | Before | After |
| ---- | ---- | ------ | ----- |
| `src/browser/drivers/IndexedDBDriver.ts:414` | `currently` | `declaring every currently-known store (plus {@link METADATA_STORE}) so nothing is lost,` | `declaring every store known at that point (plus {@link METADATA_STORE}) so nothing is lost,` |
| `src/core/drivers/MemoryDriver.ts:387` | `currently` | `// Resolve only a currently declared table.` | `// Resolve only a declared table.` |
| `src/core/helpers.ts:786` | `currently` | `@param deployed - The table schemas currently applied` | `@param deployed - The already-applied table schemas` |
| `src/core/types.ts:635` | `currently` | `@param deployed - The schema currently deployed, as {@link TableSchema}s` | `@param deployed - The deployed schema, as {@link TableSchema}s` |
| `tests/setupServer.test.ts:151` | `currently` | `/** List the scratch directories a prefix currently owns under a probed parent. */` | `/** List the scratch directories a prefix owns under a probed parent. */` |
| `tests/src/core/Database.test.ts:909` | `e.g.` | `(propagated driver errors, e.g. unknown-table, pass through as-is —` | `(propagated driver errors, for example unknown-table, pass through as-is —` |
| `tests/src/core/helpers.test.ts:350` | `robust` | `// A generous ceiling leaves no room for a blow-up while staying robust on a slow CI box.` | `// A generous ceiling leaves no room for a blow-up while still passing on a slow CI box.` |

The `IndexedDBDriver.ts` and `Database.test.ts` edits each lengthened their line past the 100-column
print width, so the paragraph's following line absorbed the overflow. `oxfmt` rewraps no comment, so
the rewrap is mine; recorded as an ancillary decision.

Neither the `helpers.ts` nor the `types.ts` edit touches a description paragraph, so no `Summary`
cell the guide compares moved.

### `policy/no-malformed-summary`

Each first sentence now opens on a third-person verb ending in `s` and names no documented symbol.
Every fact the paragraph carried is kept; no code token moved and no assertion changed.

| Site | Before (opener) | After (opener) |
| ---- | --------------- | -------------- |
| `tests/setup.ts:34` | `Collect sorted ids from the parity suite's optional-rank stream case.` | `Collects sorted ids from the parity suite's optional-rank stream case.` |
| `tests/setup.ts:53` | `A minimal {@link TableSchema}` | `Declares a minimal {@link TableSchema}` |
| `tests/setup.ts:70` | `Build one {@link Condition} for a input/compiler test` | `Builds one {@link Condition} for a input/compiler test` |
| `tests/setup.ts:90` | `The shared `users` shape map the fixture rows and the native-hook dispatch tests declare.` | `Holds the shared `users` shape map the fixture rows and the native-hook dispatch tests declare.` |
| `tests/setup.ts:95` | `A row of the canonical `users` table` | `Shapes a row of the canonical `users` table` |
| `tests/setup.ts:103` | `Build one canonical `users` row` | `Builds one canonical `users` row` |
| `tests/setup.ts:118` | `The recurring three-row `users` seed` | `Builds the recurring three-row `users` seed` |
| `tests/setup.ts:136` | `Stand up a LIVE, seeded `users`` | `Stands up a LIVE, seeded `users`` |
| `tests/setup.ts:163` | `Stand up a constrained `users`` | `Stands up a constrained `users`` |
| `tests/setup.ts:189` | `The exact columns used by the Cursor behavior and transaction-lifetime scenarios.` | `Declares the exact columns the Cursor behavior and transaction-lifetime scenarios read.` |
| `tests/setup.ts:197` | `One row in the shared Cursor scenario.` | `Shapes one row in the shared Cursor scenario.` |
| `tests/setup.ts:200` | `The canonical three-row seed used by Cursor ordering and mutation scenarios.` | `Holds the canonical three-row seed the Cursor ordering and mutation scenarios read.` |
| `tests/setup.ts:208` | `Create the shared Cursor database over a caller-selected driver.` | `Creates the shared Cursor database over a caller-selected driver.` |
| `tests/setup.ts:219` | `Create and seed the shared Cursor database.` | `Creates and seeds the shared Cursor database.` |
| `tests/setup.ts:231` | `Adapt a real Memory driver to only the required DriverInterface primitives.` | `Adapts a real Memory driver to only the required DriverInterface primitives.` |
| `tests/setup.ts:253` | `Optional metadata capabilities exposed by a reconciliation test driver.` | `Names the optional metadata capabilities a reconciliation test driver exposes.` |
| `tests/setup.ts:262` | `Create a real Memory-backed driver with an exact optional metadata-hook set.` | `Creates a real Memory-backed driver with an exact optional metadata-hook set.` |
| `tests/setup.ts:309` | `A reusable host-independent AsyncIterable over one supplied AsyncIterator.` | `Wraps one supplied AsyncIterator as a reusable host-independent AsyncIterable.` |
| `tests/setup.ts:322` | `An async iterator wrapper that records every delegated source cleanup.` | `Wraps an async iterator and records every delegated source cleanup.` |
| `tests/setup.ts:343` | `One recorded call to {@link createRecordingDriver}'s native `aggregate` hook.` | `Shapes one recorded call to {@link createRecordingDriver}'s native `aggregate` hook.` |
| `tests/setup.ts:351` | `A recording {@link DriverInterface} over the real Memory driver that ALSO implements the optional native `records` / `aggregate` hooks (see …).` | `Wraps the real Memory driver in a {@link DriverInterface} that ALSO implements the optional native `records` / `aggregate` hooks and records each call (see …).` |
| `tests/setup.ts:370` | `The sentinel row {@link createRecordingDriver}'s native `records` hook returns.` | `Holds the sentinel row {@link createRecordingDriver}'s native `records` hook returns.` |
| `tests/setup.ts:373` | `The sentinel value {@link createRecordingDriver}'s native `aggregate` hook returns.` | `Holds the sentinel value {@link createRecordingDriver}'s native `aggregate` hook returns.` |
| `tests/setup.ts:377` | `Create a {@link RecordingDriverInterface} plus` | `Creates a {@link RecordingDriverInterface} plus` |
| `tests/setupBrowser.ts:38` | `A process-unique IndexedDB database name —` | `Returns a process-unique IndexedDB database name —` |
| `tests/setupBrowser.ts:50` | `Persist an arbitrary value through a real native IndexedDB transaction.` | `Persists an arbitrary value through a real native IndexedDB transaction.` |
| `tests/setupServer.ts:36` | `One executable guide fence and its exact source location.` | `Carries one executable guide fence and its exact source location.` |
| `tests/setupServer.ts:46` | `One module the parser read:` | `Describes one module the parser read:` |
| `tests/setupServer.ts:56` | `Format compiler diagnostics for a fail-closed entry-surface error.` | `Formats compiler diagnostics for a fail-closed entry-surface error.` |
| `tests/setupServer.ts:66` | `Throw when a compiler phase produced diagnostics.` | `Throws when a compiler phase produced diagnostics.` |
| `tests/setupServer.ts:77` | `Read one module's top-level statements off the parser Vite re-exports.` | `Reads one module's top-level statements off the parser Vite re-exports.` |
| `tests/setupServer.ts:105` | `Read one module file's top-level statements.` | `Reads one module file's top-level statements.` |
| `tests/setupServer.ts:121` | `Resolve the source file one module specifier names.` | `Resolves the source file one module specifier names.` |
| `tests/setupServer.ts:149` | `Read the names one top-level declaration binds.` | `Reads the names one top-level declaration binds.` |
| `tests/setupServer.ts:179` | `Read the export name one module export specifier carries.` | `Reads the export name one module export specifier carries.` |
| `tests/setupServer.ts:189` | `Whether one re-export form is explicitly type-only.` | `Reports whether one re-export form is explicitly type-only.` |
| `tests/setupServer.ts:208` | `Classify one supported top-level declaration.` | `Classifies one supported top-level declaration.` |
| `tests/setupServer.ts:227` | `Resolve one exported name to the keywords its declarations carry.` | `Resolves one exported name to the keywords its declarations carry.` |
| `tests/setupServer.ts:299` | `Read the public Guide surface one module exports.` | `Reads the public Guide surface one module exports.` |
| `tests/setupServer.ts:387` | `Read the path aliases one TypeScript project resolves to, as absolute targets.` | `Reads the path aliases one TypeScript project resolves to, as absolute targets.` |
| `tests/setupServer.ts:433` | `Compile one file set against the caller's project and read what the compiler reported.` | `Compiles one file set against the caller's project and reads what the compiler reported.` |
| `tests/setupServer.ts:489` | `Fail closed on every diagnostic the entry graph's own sources carry.` | `Fails closed on every diagnostic the entry graph's own sources carry.` |
| `tests/setupServer.ts:531` | `Locate Guide-extracted fence bodies in their original document.` | `Locates Guide-extracted fence bodies in their original document.` |
| `tests/setupServer.ts:559` | `Attribute one compiler diagnostic to the fences it reads against.` | `Attributes one compiler diagnostic to the fences it reads against.` |
| `tests/setupServer.ts:585` | `Format one executable-fence compiler diagnostic with guide provenance.` | `Formats one executable-fence compiler diagnostic with guide provenance.` |
| `tests/setupServer.ts:609` | `Compile every Guide-extracted TypeScript fence as a standalone module.` | `Compiles every Guide-extracted TypeScript fence as a standalone module.` |
| `tests/setupServer.ts:665` | `Resolve the public Guide surface reachable from each TypeScript entry barrel.` | `Resolves the public Guide surface reachable from each TypeScript entry barrel.` |
| `tests/setupServer.ts:713` | `Create a real source-backed temporary TypeScript project.` | `Creates a real source-backed temporary TypeScript project.` |
| `tests/setupServer.ts:745` | `Wrap a real native-transaction driver and replace only a rejected native transaction's reason …` | `Wraps a real native-transaction driver and replaces only a rejected native transaction's reason …` |
| `tests/setupServer.ts:793` | `The portable declaration matching the real foreign-key fixture tables.` | `Declares the portable schema matching the real foreign-key fixture tables.` |
| `tests/setupServer.ts:814` | `Create and open a real SQLite driver over tables carrying a native foreign key.` | `Creates and opens a real SQLite driver over tables carrying a native foreign key.` |
| `tests/setupServer.ts:849` | `Build the shared driver-conformance schema` | `Builds the shared driver-conformance schema` |

Proof that the whole `src` and test-comment change set is comment-only:

```text
$ git diff -- src/ | grep -E '^[-+]' | grep -v '^[-+][-+]' | grep -vE '^[-+]\s*(\*|//)'
(no output)
$ git diff -- tests/setup.ts tests/setupServer.ts tests/setupBrowser.ts tests/setupServer.test.ts tests/src/ | grep -E '^[-+]' | grep -v '^[-+][-+]' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
(no output)
```

`npm run test:policy` exits 0, so its `prose` rule named no line in `guides/**` or `README.md`.
Neither file is touched.

## Item 4 — the bump

```diff
-	"version": "0.0.13",
+	"version": "0.0.14",
```

`package-lock.json` is untouched.

## Acceptance criteria

### 1. `git status --short`

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/browser/drivers/IndexedDBDriver.ts
 M src/core/drivers/MemoryDriver.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
 M tests/setupPolicy.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/Database.test.ts
 M tests/src/core/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, plus `tests/guides.test.ts` from item 2, plus the item-3 files named in the
preceding tables, and nothing else. PASS.

### 2. `format:check`, `oxlint`, `check`

```text
$ npm run format:check
Checking formatting...
All matched files use the correct format.
Finished in 4103ms on 100 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
EXIT 0

$ npm run check
tests/setupServer.test.ts(1,15): error TS2305: Module '"@orkestrel/probe/server"' has no exported member 'Diagnostic'.
tests/setupServer.ts(8,15): error TS2305: Module '"@orkestrel/probe/server"' has no exported member 'Diagnostic'.
tests/setupServer.ts(19,10): error TS2305: Module '"@orkestrel/probe/server"' has no exported member 'parseProjectConfig'.
tests/setupServer.ts(19,30): error TS2305: Module '"@orkestrel/probe/server"' has no exported member 'scanDiagnostics'.
EXIT 2
```

`format:check` and `oxlint` PASS. `check` FAILS on the probe imports alone — see § Deviation. The
five record-shape errors this unit owned are cleared.

### 3. `test:guides`, `test:policy`, `test:config`

```text
$ npm run test:guides
TypeError: scanDiagnostics is not a function
 ❯ readProjectDiagnostics tests/setupServer.ts:482:10
 ❯ checkEntryDiagnostics tests/setupServer.ts:509:27
 ❯ deriveEntrySurfaces tests/setupServer.ts:694:2
 ❯ tests/guides.test.ts:117:23
 Test Files  1 failed (1)
      Tests  no tests
EXIT 1

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

`test:policy` and `test:config` PASS. `test:guides` FAILS in the suite's file-level setup, before any
test registers, on the same probe import — see § Deviation. It reported no `Tests` summary of passes
and failures because it collected none.

### 4. `npm run docs`

```text
rows read: 1, disagreements found: 204
EXIT 1
```

Non-zero `rows read` and exit 1, as expected. The worklist follows verbatim.

## The `docs` worklist, verbatim

```text

guides/database.md function createDatabase: guide "Create a `DatabaseInterface` over a driver and a `tables` shape map." source "Creates a database over a driver and a declared `tables` schema."
guides/database.md function createMemoryDriver: guide "Create the in-memory reference `DriverInterface` (nested maps, no I/O)." source "Creates the in-memory reference `DriverInterface`."
guides/database.md function createJSONDriver: guide "Create a persistent JSON-file `DriverInterface` for a given path." source "Creates a persistent JSON-file `DriverInterface` for the core database layer."
guides/database.md function createSQLiteDriver: guide "Create a trusted-mode, server-native SQLite `DriverInterface` for a path (or `:memory:`)." source "Creates a trusted-mode SQLite `DriverInterface` for the core database layer."
guides/database.md function createIndexedDBDriver: guide "Create a persistent IndexedDB `DriverInterface` for a browser database name." source "Creates a persistent IndexedDB `DriverInterface` for the core database layer."
guides/database.md class Database: guide absent source "Exposes a typed view over one shared internal lifecycle and storage context."
guides/database.md class DriverIterator: guide absent source "Forms the internal continuation boundary for a root driver async iterator."
guides/database.md class MemoryDriver: guide absent source "Implements the reference `DriverInterface` — nested maps, no I/O."
guides/database.md class JSONDriver: guide absent source "Implements a persistent `DriverInterface` backed by a single JSON file — the reference `MemoryDriver` plus file load / flush."
guides/database.md class SQLiteDriver: guide absent source "Implements the `DriverInterface` over SQLite — the server-native, trusted-mode backend built on the published `@orkestrel/sqlite` synchronous wrapper."
guides/database.md class IndexedDBDriver: guide absent source "Implements the `DriverInterface` over IndexedDB — the persistent browser backend, built on the published `@orkestrel/indexeddb` wrapper."
guides/database.md const METADATA_TABLE: guide "The reserved single-row table name (`_metadata`) `SQLiteDriver` stamps its `DriverMetadata` into — a user table named `_metadata` collides with it." source "Names the reserved metadata table the `SQLiteDriver` creates on `open` to persist its stamped `DriverMetadata` (`version` + declared schema JSON) — the SQLite realization of the `metadata` / `stamp` driver hooks."
guides/database.md function matchesConditionExactly: guide "Whether one `Condition` is provably SQL-vs-engine identical. `absent`/`present` refine only when a column is both optional and nullable; every scalar condition refines when it is optional or nullable. Otherwise equality and `starts`/`ends` are exact over supported scalar storage, while ranges exclude `text` because SQLite code-point order differs from JavaScript UTF-16 order." source "Reports whether one `Condition` compiles to SQL that is PROVABLY identical to the core engine's `matchesCondition` for every value its column's declared type can store."
guides/database.md function matchesOrderExactly: guide "Whether one `Order` term is provably exact — only a required, non-null, flat `integer`/`real`/`boolean` column qualifies; optional, nullable, text, and nested terms refine." source "Reports whether one `Order` term's column compiles to an `ORDER BY` that matches the engine's `sortRows` exactly."
guides/database.md function matchesQueryExactly: guide "Whether every condition and order term in a `QueryInput` is exact — the gate `SQLiteDriver` checks before trusting a native SQL path over a full-scan refine." source "Reports whether a whole `QueryInput` is exact — every condition and every order term is exact. `limit` / `offset` never affect exactness (SQL `LIMIT` / `OFFSET` are always engine-identical)."
guides/database.md function matchesDeclaredStorage: guide "Whether an operand's runtime type matches a column's declared exact type (text↔string, integer/real↔finite number, boolean↔boolean) — backs `matchesConditionExactly`." source "Reports whether a value's runtime type matches a column's declared exact type — the operand side of the declared-type-trust proof."
guides/database.md const EXACT_COLUMN_STORAGE: guide "The declared `ColumnStorage`s whose SQL EQUALITY / `starts`/`ends` comparisons are provably engine-exact under declared-type trust (`text` / `integer` / `real` / `boolean`)." source "Lists the declared `ColumnStorage`s whose SQL EQUALITY comparisons (`equals` / `not` / `any` / `none`) and `starts` / `ends` compiles are provably engine-exact under declared-type trust — `text` / `integer` / `real` / `boolean`; a `json` or `blob` column always refines instead."
guides/database.md const EXACT_RANGE_COLUMN_STORAGE: guide "The declared `ColumnStorage`s whose SQL RANGE comparisons and `ORDER BY` are provably engine-exact (`integer` / `real` / `boolean` — `text` is excluded; see `matchesConditionExactly`)." source "Lists the declared `ColumnStorage`s whose SQL RANGE comparisons (`above` / `below` / `from` / `to` / `between`) and `ORDER BY` compiles are provably engine-exact — `integer` / `real` / `boolean` only. `text` is excluded: see `EXACT_COLUMN_STORAGE`'s remarks for the BINARY-collation (code-point) vs. JS `<` (code-unit) divergence on supplementary-plane characters."
guides/database.md function extractValues: guide "Extract a `SQLiteRow`'s values in declared positional binding order; throws a typed `DRIVER` error when a requested column is missing." source "Extracts a stored row's values in a declared positional order."
guides/database.md function deriveSQLiteIndexName: guide "Derive a collision-free, length-prefixed SQL index name from a table and its column list (`idx_<len>_<table>_<len>_<col>…`) — used by `schemaToIndexes` and `stepToSQL`." source "Builds a collision-free SQL index name for a table + column-group index — shared by the compiler module's `schemaToIndexes` and `stepToSQL`, so a plan-built index name always matches one `open` would have created."
guides/database.md interface SQLiteDriverOptions: guide "`{ path?, readonly?, timeout?, references?, pragmas? }` — the options bag `createSQLiteDriver` accepts; `references` toggles foreign-key enforcement." source "Options for `createSQLiteDriver`."
guides/database.md function inferValueStorage: guide "The `ColumnStorage` a nested (`json_extract`) operand encodes as, derived from its runtime value." source "Reads the storage type a nested (`json_extract`) operand encodes as from its RUNTIME value — NOT `json`."
guides/database.md function compileJSONTypeSQL: guide "Compile a nested `FieldPath` to its `json_type(<col>, <path>)` SQL expression — disambiguates a present JSON `null` from an absent path." source "Compiles a NESTED `FieldPath` to the `json_type(<col>, <path>)` SQL expression — the `compileFieldSQL` `json_extract` sibling used to tell a PRESENT JSON `null` apart from an ABSENT path (both read back as SQL `NULL` through `json_extract`, but `json_type` reports `'null'` for the former and SQL `NULL` for the latter)."
guides/database.md function compileConditionSQL: guide "Compile one `Condition` to its parameterized SQL fragment plus bound values." source "Compiles one condition to its `<column> <operator>` SQL fragment and the parameters it binds — engine-exact under SQL's three-valued NULL logic."
guides/database.md function compileWhereSQL: guide "Fold conditions into one `WHERE …` clause, parenthesized left-to-right to match the engine's fold." source "Folds the conditions into one WHERE clause, parenthesizing progressively left-to-right so the grouping matches the engine's `matchesQuery` fold."
guides/database.md function compileOrderSQL: guide "Compile the `ORDER BY …` clause, always ending with the primary key as tie-breaker." source "Compiles the ORDER BY clause from the order terms, always ending with the primary key as the final determinant."
guides/database.md function compilePageSQL: guide "Compile the `LIMIT` / `OFFSET` clause." source "Compiles the LIMIT / OFFSET clause."
guides/database.md function compileQuerySQL: guide "Compile a `QueryInput` into the full SQL clause (`WHERE` + `ORDER BY` + `LIMIT`) plus bound parameters." source "Compiles a `QueryInput` into the SQL clause that follows a table name, with its bound parameters in clause order."
guides/database.md function quoteIdentifier: guide "Quote a SQL identifier (table / column name), doubling an embedded quote." source "Quotes a SQL identifier (a table or column name) so any characters are literal."
guides/database.md function compileFieldSQL: guide "Compile a `FieldPath` to the SQL expression that reads it (a column, or a `json_extract` path)." source "Compiles a `FieldPath` to the SQL expression that reads it."
guides/database.md function compileColumnSQL: guide "Map a portable `ColumnStorage` to its SQLite column type keyword." source "Maps a portable `ColumnStorage` to its SQLite column type."
guides/database.md function compileAggregateSQL: guide "Compile an `AggregateOperation` over a `FieldPath` to its SQL aggregate expression." source "Compiles an `AggregateOperation` over a `FieldPath`."
guides/database.md function matchesAggregateExactly: guide "Test whether SQLite can execute one aggregate with the core engine's exact semantics." source "Reports whether SQLite can execute an aggregate exactly like the core engine."
guides/database.md function matchesSQLiteAffinity: guide "Test a native declared SQLite type against one portable `ColumnStorage` affinity." source "Checks a declared SQLite type against a portable storage affinity."
guides/database.md function matchesAbsentPath: guide "Whether a caught filesystem error reports that nothing is there to read." source "Reports whether a caught filesystem error says that nothing is there to read."
guides/database.md function encodeValue: guide "Encode a JS value to its stored `SQLiteValue` for a column's type — total, never throws." source "Encodes a JS value to its stored `SQLiteValue` for a declared column."
guides/database.md function decodeValue: guide "Decode a stored `SQLiteValue` back to its JS value — the exact inverse of `encodeValue`." source "Decodes a stored `SQLiteValue` back to its JS value for a declared column — the exact inverse of `encodeValue`."
guides/database.md function encodeRow: guide "Encode a whole `Row` to a `SQLiteRow` by its table's schema." source "Encodes a whole `Row` to a `SQLiteRow` by its table's schema."
guides/database.md function decodeRow: guide "Decode a stored `SQLiteRow` back to a `Row` by its table's schema (absent columns omitted)." source "Decodes a stored `SQLiteRow` back to a `Row` by its table's schema."
guides/database.md function schemaToTable: guide "Project a `TableSchema` to its `CREATE TABLE IF NOT EXISTS` statement." source "Projects a `TableSchema` to its `CREATE TABLE IF NOT EXISTS` statement."
guides/database.md function schemaToIndexes: guide "Project a `TableSchema` to its `CREATE INDEX IF NOT EXISTS` statements." source "Projects a `TableSchema` to its declared SQLite indexes."
guides/database.md function stepToSQL: guide "Project one `MigrationStep` to the DDL statement(s) `SQLiteDriver.migrate` executes for it." source "Projects one `MigrationStep` to SQLite DDL."
guides/database.md function selectPlan: guide "Plan an IndexedDB read for a `QueryInput` — pick the index (or primary store) and `IDBKeyRange` to narrow by, falling back to a full scan." source "Plans an IndexedDB read for a `QueryInput` — picks the index (or the primary store) and `IDBKeyRange` to narrow by, falling back to a full scan."
guides/database.md function conditionToRange: guide "The `IDBKeyRange` one `Condition` maps to when its operator is an exact key comparison over a scalar operand, else `undefined`." source "Translates one `Condition` to the `IDBKeyRange` it maps to, when its operator is one of the exact key comparisons over scalar operands; otherwise returns `undefined`."
guides/database.md const INDEXABLE_STORAGE: guide "The declared `ColumnStorage`s that are valid, orderable IndexedDB keys (`text` / `integer` / `real`), as a frozen array." source "Lists the declared `ColumnStorage`s that are valid, orderable IndexedDB keys."
guides/database.md const METADATA_STORE: guide "The reserved out-of-line store name (`__metadata__`) `IndexedDBDriver` stamps its `DriverMetadata` into — a user table named `__metadata__` collides with it." source "Names the reserved out-of-line store the `IndexedDBDriver` stamps its `DriverMetadata` into."
guides/database.md interface QueryPlan: guide "`{ index?, range? }` — the optional index and `IDBKeyRange`; an empty object selects a full store scan." source "Represents a pushdown plan — an optional index and optional `IDBKeyRange` used to narrow a read. An omitted `index` selects the primary store; an omitted `range` performs a full scan. The plan is always a superset of the matching rows; the core engine refines it to the exact result. An empty plan (`{}`) is a primary-store full scan."
guides/database.md function mapIndexedDBError: guide "Map a backend `IndexedDBError` fault to its `DatabaseError` equivalent — no raw wrapper error crosses `IndexedDBDriver`'s `DriverInterface` surface." source "Maps a backend `IndexedDBError` to the portable `DatabaseError` taxonomy — the default mapping used everywhere except inside `migrate()`."
guides/database.md function mapMigrationError: guide "Map a backend `IndexedDBError` fault from `migrate`'s versionchange path to its `DatabaseError` equivalent (remaps `UPGRADE` to `MIGRATION`)." source "Maps a backend `IndexedDBError` to the portable `DatabaseError` taxonomy for use INSIDE `migrate()` — the one context where `UPGRADE` means the migration itself failed, not a generic driver fault."
guides/database.md function deriveIndexedDBIndexName: guide "Derive an IndexedDB index name from a column list — a single column is the bare name, a compound list is length-prefixed (`'2#1:a1:b'`-style)." source "Derives an IndexedDB index name for a declared column group — a bare column name for a single-column index, a deterministic collision-free encoding for a compound one."
guides/database.md function schemaToStore: guide "Project a `TableSchema` to the IndexedDB store definition used by an ordered versionchange migration." source "Projects a table schema into the IndexedDB wrapper's store definition."
guides/database.md class DatabaseError: guide "Carries a `DatabaseErrorCode` (`CLOSED` / `NOT_FOUND` / `CONFLICT` / `VALIDATION` / `ABORTED` / `MIGRATION` / `CONFORMANCE` / `DRIVER`)." source "Represents an error thrown by the database layer."
guides/database.md function isDatabaseError: guide "Narrow an unknown caught value to a `DatabaseError`." source "Narrows an unknown caught value to a `DatabaseError`."
guides/database.md function compareValues: guide absent source "Compares two arbitrary values under one total order — the comparator behind sorting and the range operators."
guides/database.md function matchesCondition: guide absent source "Evaluates one `Condition` against a row — the per-operator predicate."
guides/database.md function matchesQuery: guide absent source "Folds a row through a list of conditions, joining each by its connector."
guides/database.md function sortRows: guide absent source "Sorts rows by an ordering specification, leaving the input untouched."
guides/database.md function applyQuery: guide absent source "Applies a `QueryInput` to rows — filter, then sort, then page."
guides/database.md function validatePage: guide absent source "Validates the paging fields of a portable query."
guides/database.md function computeAggregate: guide absent source "Computes an aggregate over a column across rows."
guides/database.md function extractKey: guide absent source "Reads a row's primary key from a column, when it is a usable `Key`."
guides/database.md function bindRowKey: guide absent source "Returns a fresh row whose primary column is authoritatively bound to its storage key."
guides/database.md function shapeToColumnSchema: guide absent source "Projects one contract shape into a portable column schema."
guides/database.md function findColumn: guide absent source "Reads one flat column's declaration out of a table schema."
guides/database.md function resolvePrimary: guide absent source "Resolves the primary-key column one table keys its rows by."
guides/database.md function requireColumns: guide absent source "Requires one declared table's columns out of a table map."
guides/database.md function shapeToColumnStorage: guide absent source "Maps a column's `ContractShape` to its portable `ColumnStorage` — the value a `TableSchema` carries so a native backend can declare a real column."
guides/database.md function filterRows: guide absent source "Filters rows by a list of conditions — the shared basis for a table's count and aggregate paths (no sort/page, unlike `applyQuery`)."
guides/database.md function equalsValue: guide absent source "Compares two values structurally by SameValueZero leaves — the comparator behind conformance checks and any test/fixture that needs \"same data\", not \"same reference\"."
guides/database.md function checkAbort: guide absent source "Throws when an `AbortSignal` has fired — the shared abort gate checked at operation boundaries and between streamed rows."
guides/database.md function planMigration: guide absent source "Diffs a deployed and a declared table set structurally into a `Migration` plan."
guides/database.md function migrateRows: guide absent source "Applies one table's `MigrationStep`s to its rows — a pure row transform."
guides/database.md function projectMigrationSchema: guide absent source "Projects migration steps sequentially over a canonical validated owned schema. Adding a required non-null column to an existing table rejects with `MIGRATION`; optional-only and nullable-only additions remain portable."
guides/database.md function normalizeDriverSchema: guide absent source "Canonicalizes an unknown driver schema into a distinct deeply frozen snapshot."
guides/database.md function conformDriver: guide absent source "Runs the driver-conformance battery, throwing on the first violated invariant — the fail-fast entry point most callers (test setup, CI smoke checks) want."
guides/database.md function scanDriver: guide absent source "Walks the driver-conformance battery against a fresh `DriverInterface` per phase, yielding one `ConformanceFinding` per violated invariant — the shared invariant suite every backend (in-memory, SQLite, IndexedDB) must uphold to be a drop-in `DriverInterface`."
guides/database.md function auditDriver: guide absent source "Runs the FULL driver-conformance battery and collects every violation — the audit entry point for a driver author who wants a complete report rather than a single fail-fast throw."
guides/database.md function cloneDriverMetadata: guide absent source "Clones unknown driver metadata into a distinct deeply frozen snapshot."
guides/database.md function matchesWildcardPattern: guide absent source "Matches a value against a wildcard pattern in LINEAR time — the shared, ReDoS-SAFE engine behind `matchesLikePattern` and `matchesGlobPattern`."
guides/database.md function matchesLikePattern: guide absent source "Matches a value against a SQL `LIKE` pattern, folding case."
guides/database.md function matchesGlobPattern: guide absent source "Matches a value against a `GLOB` pattern, preserving case."
guides/database.md function isDriverMetadata: guide absent source "Checks whether a value is persisted driver metadata."
guides/database.md function isDriverSchema: guide absent source "Checks whether a value is a complete portable driver schema."
guides/database.md function isColumnSchema: guide absent source "Checks whether a value is a portable column schema."
guides/database.md function isTableSchema: guide absent source "Checks whether a value is a portable table schema."
guides/database.md function isMigrationStep: guide absent source "Checks whether a value is one ordered migration step."
guides/database.md function isMigration: guide absent source "Checks whether a value is an ordered migration plan."
guides/database.md function isMigrationInput: guide absent source "Checks whether a value is one atomic migration request."
guides/database.md function isKey: guide absent source "Checks whether a value is a usable database key."
guides/database.md function cloneDriverSchema: guide absent source "Clones unknown driver schema into a distinct deeply frozen snapshot."
guides/database.md function cloneMigrationInput: guide absent source "Clones unknown migration input into a distinct deeply frozen snapshot."
guides/database.md const DEFAULT_PRIMARY: guide absent source "Supplies the primary-key column assumed when `PrimaryMap` does not name one."
guides/database.md const MAX_PATTERN_LENGTH: guide absent source "Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts before rejecting it."
guides/database.md const CONFORMANCE_USERS_SCHEMA: guide absent source "Describes the `users` table the driver-conformance battery opens — keyed by the default `id` primary column."
guides/database.md const CONFORMANCE_POSTS_SCHEMA: guide absent source "Describes the `posts` table the driver-conformance battery opens — keyed by a non-`id` `slug` primary column."
guides/database.md const CONFORMANCE_SCHEMA: guide absent source "Holds the fixed two-table schema every driver-conformance phase opens."
guides/database.md type Key: guide absent source "Represents a primary key — the value identifying a row within its table."
guides/database.md type KeyFunction: guide absent source "Represents a key-generating function."
guides/database.md type Row: guide absent source "Represents a table row — a plain record of column values keyed by column name."
guides/database.md type ConditionOperator: guide absent source "Represents a WHERE operator — the comparison a single `Condition` applies."
guides/database.md type ConditionConnector: guide absent source "Names how a `Condition` joins to the running result of the conditions before it."
guides/database.md interface Condition: guide absent source "Represents one compiled WHERE condition."
guides/database.md type OrderDirection: guide absent source "Names a sort direction."
guides/database.md interface Order: guide absent source "Represents one ordering term — a column (`FieldPath`, flat or nested) and its direction."
guides/database.md interface QueryInput: guide absent source "Represents a serializable read specification — everything a backend needs to compile one read, free of JS callbacks so any backend can honor it."
guides/database.md type AggregateOperation: guide absent source "Names an aggregate computed over a numeric column."
guides/database.md interface OperationOptions: guide absent source "Options for an abortable operation."
guides/database.md type DatabaseStatus: guide absent source "Names the lifecycle state of a `DatabaseInterface`."
guides/database.md interface AdmissionInterface: guide absent source "Represents the admission boundary a scoped operation enters before it runs."
guides/database.md type DatabaseErrorCode: guide absent source "Names a machine-readable `DatabaseError` code."
guides/database.md interface ConformanceFinding: guide absent source "Represents one violated invariant from the driver-conformance battery."
guides/database.md type DatabaseEventMap: guide absent source "Describes the push observation surface of a `DatabaseInterface` — the connection + transaction lifecycle a fire-and-forget observer (logging, metrics, tracing, cache invalidation) subscribes to."
guides/database.md type TableEventMap: guide absent source "Describes the push observation surface of a `TableInterface` — the per-row mutation moments a fire-and-forget observer (cache invalidation, sync, an audit log) subscribes to, ALONGSIDE the database-level `DatabaseEventMap`."
guides/database.md type ColumnMap: guide absent source "Represents one table's columns — a map of column name to its value `ContractShape`."
guides/database.md type TableMap: guide absent source "Represents a database's table schema — a map of table name to its `ColumnMap`."
guides/database.md type RowOf: guide absent source "Represents the row type a table's `ColumnMap` describe — `Infer` of the `objectShape` the database wraps them in."
guides/database.md type PrimaryMap: guide absent source "Holds per-table primary-key column overrides — `{ [table]: column }`."
guides/database.md type IndexMap: guide absent source "Holds per-table secondary indexes — `{ [table]: groups }`, each group one (possibly compound) index of column names."
guides/database.md type ColumnStorage: guide absent source "Names a portable storage type for a column — the backend maps it to its native type (SQLite affinity, an IndexedDB value). Derived from a column's `ContractShape` by `shapeToColumnStorage`; `json` covers object/array/union/raw values a backend stores as JSON text and can `json_extract` for nested-field queries."
guides/database.md interface ColumnSchema: guide absent source "Represents one column of a `TableSchema` — its name, portable `ColumnStorage`, and whether it independently accepts absence (`optional`) and explicit `null` (`nullable`)."
guides/database.md interface TableSchema: guide absent source "Represents a backend-agnostic description of one table — what `open` hands each driver so a native backend can create real tables and indexes."
guides/database.md type MigrationStep: guide absent source "Represents one step of a `Migration` plan — a single schema change applied to one table."
guides/database.md interface Migration: guide absent source "Represents a schema migration plan — an ordered set of `MigrationStep`s moving a database from one schema version to another."
guides/database.md interface MigrationInput: guide absent source "Represents one atomic migration request."
guides/database.md interface StorageInterface: guide absent source "Declares the storage operations available only inside a driver's transaction scope."
guides/database.md interface DriverMetadata: guide absent source "Represents persisted schema metadata a versioning driver owns as an immutable snapshot."
guides/database.md interface DriverInterface: guide absent source "Declares the storage primitive every backend implements — the whole of the bridge."
guides/database.md interface DatabaseOptions: guide absent source "Options for `createDatabase`."
guides/database.md interface CompiledSQL: guide absent source "Represents a parameterized SQL fragment or statement plus its bind values."
guides/database.md interface TableDefinition: guide absent source "Represents one table's portable definition, produced by `export` — the unit of schema / migration exchange across environments."
guides/database.md interface DatabaseStorageInterface: guide absent source "Represents a database view valid only inside one `DatabaseInterface.transaction` scope."
guides/database.md interface DatabaseInterface: guide absent source "Represents a database — the ergonomic entry point that owns the driver and its tables."
guides/database.md interface TableInterface: guide absent source "Exposes typed keyed CRUD plus fluent query and cursor access."
guides/database.md interface QueryInterface: guide absent source "Builds a read through a fluent chain."
guides/database.md interface CursorInterface: guide absent source "Walks a table's rows forward for bulk in-place mutation."
guides/database.md StorageInterface.read: guide absent source absent
guides/database.md StorageInterface.write: guide absent source absent
guides/database.md StorageInterface.insert: guide absent source absent
guides/database.md StorageInterface.delete: guide absent source absent
guides/database.md StorageInterface.keys: guide absent source absent
guides/database.md StorageInterface.scan: guide absent source absent
guides/database.md StorageInterface.clear: guide absent source absent
guides/database.md StorageInterface.records: guide absent source absent
guides/database.md StorageInterface.aggregate: guide absent source absent
guides/database.md StorageInterface.stream: guide absent source absent
guides/database.md StorageInterface.migrate: guide absent source absent
guides/database.md StorageInterface.metadata: guide absent source absent
guides/database.md StorageInterface.stamp: guide absent source absent
guides/database.md DriverInterface.open: guide absent source absent
guides/database.md DriverInterface.close: guide absent source absent
guides/database.md DriverInterface.snapshot: guide absent source "Captures table rows and returns a repeatable thunk that restores those rows — the primitive transactions are built on."
guides/database.md DriverInterface.read: guide absent source absent
guides/database.md DriverInterface.write: guide absent source absent
guides/database.md DriverInterface.insert: guide absent source absent
guides/database.md DriverInterface.delete: guide absent source absent
guides/database.md DriverInterface.keys: guide absent source absent
guides/database.md DriverInterface.scan: guide absent source absent
guides/database.md DriverInterface.clear: guide absent source absent
guides/database.md DriverInterface.records: guide absent source absent
guides/database.md DriverInterface.aggregate: guide absent source absent
guides/database.md DriverInterface.stream: guide absent source absent
guides/database.md DriverInterface.migrate: guide absent source absent
guides/database.md DriverInterface.metadata: guide absent source absent
guides/database.md DriverInterface.stamp: guide absent source absent
guides/database.md DriverInterface.transaction: guide absent source "Opens a native transaction scope — an optional driver hook. The driver owns acquisition, commit or rollback, release, and invalidation of the scoped capability."
guides/database.md DatabaseInterface.table: guide absent source absent
guides/database.md DatabaseInterface.import: guide absent source absent
guides/database.md DatabaseInterface.export: guide absent source absent
guides/database.md DatabaseInterface.open: guide absent source absent
guides/database.md DatabaseInterface.close: guide absent source absent
guides/database.md DatabaseInterface.transaction: guide absent source absent
guides/database.md DatabaseInterface.migrate: guide absent source "Diffs a caller-supplied deployed schema against this database's declared schema (its `tables`, as configured) through `planMigration`, applies the resulting plan through the driver's optional `migrate` hook, and returns the applied plan."
guides/database.md DatabaseStorageInterface.table: guide absent source absent
guides/database.md AdmissionInterface.track: guide absent source absent
guides/database.md TableInterface.get: guide absent source absent
guides/database.md TableInterface.resolve: guide absent source absent
guides/database.md TableInterface.has: guide absent source absent
guides/database.md TableInterface.keys: guide absent source absent
guides/database.md TableInterface.records: guide absent source absent
guides/database.md TableInterface.count: guide absent source "Counts contract-valid rows matching `input`'s conditions."
guides/database.md TableInterface.aggregate: guide absent source "Computes an aggregate over `column` across rows matching `input`'s conditions."
guides/database.md TableInterface.scan: guide absent source "Iterates the table's rows lazily with filtering."
guides/database.md TableInterface.set: guide absent source "Upserts one or more rows."
guides/database.md TableInterface.add: guide absent source "Inserts one or more rows, throwing `CONFLICT` on a duplicate key."
guides/database.md TableInterface.update: guide absent source "Applies a partial change to one or more rows."
guides/database.md TableInterface.remove: guide absent source "Deletes one or more rows."
guides/database.md TableInterface.clear: guide absent source absent
guides/database.md TableInterface.query: guide absent source absent
guides/database.md TableInterface.cursor: guide absent source absent
guides/database.md QueryInterface.condition: guide absent source absent
guides/database.md QueryInterface.order: guide absent source absent
guides/database.md QueryInterface.filter: guide absent source absent
guides/database.md QueryInterface.limit: guide absent source absent
guides/database.md QueryInterface.offset: guide absent source absent
guides/database.md QueryInterface.collect: guide absent source absent
guides/database.md QueryInterface.find: guide absent source absent
guides/database.md QueryInterface.count: guide absent source absent
guides/database.md QueryInterface.stream: guide absent source "Evaluates this query's conditions / filters / offset / limit lazily, row by row."
guides/database.md QueryInterface.aggregate: guide absent source absent
guides/database.md CursorInterface.next: guide absent source absent
guides/database.md CursorInterface.update: guide absent source absent
guides/database.md CursorInterface.remove: guide absent source absent
guides/database.md CursorInterface.close: guide absent source absent
guides/database.md pitch: readme absent tagline "One typed database API that runs unchanged on top of an in-memory map or a persistent JSON file — keyed rows, a fluent query builder, cursors, and whole-store transactions. The unifying idea is that a table is a contract: you declare a `tables` map of `ContractShape`s, and the row type, write-time coercion + validation, JSON-Schema introspection, and seed data all flow from that one declaration — no separate schema, no annotations, no `as`. The design stance is one engine, thin drivers. A backend implements only an irreducible storage primitive — keyed read/write/insert/delete, an ordered `scan`, key listing, and a `snapshot` — and inherits the entire WHERE / order / page / aggregate surface from a single pure query engine in the core. A backend that can go faster (SQL `WHERE`, an index range) implements optional native hooks the engine falls back from; it never re-derives query semantics. So this is deliberately not an ORM and not a query abstraction layer: there is no entity graph, no migration runner, and no raw-SQL escape hatch — only the smallest cross-environment core that earns its keep. Source: `src/core`. Published through `@orkestrel/database`; two persistent drivers ship alongside it — a trusted-mode SQLite driver in `src/server` (surfaced through `@orkestrel/database/server`) with native querying, paging, aggregation, transactions, and atomic migration, and a narrow-then-refine IndexedDB driver in `src/browser` (surfaced through `@orkestrel/database/browser`) that pushes a key-range candidate set down to the index and lets the core engine refine it to the exact result — plus the original I/O-free `MemoryDriver` and file-persisted `JSONDriver`."
rows read: 1, disagreements found: 204
```

## Deviation

Two criteria stay red on one cause, and it is not an edit this unit can make.

- **Expected:** `npm run check` exits 0 and `npm run test:guides` exits 0 after the items, with P21's
  `check` reading carrying only the five `tests/guides.test.ts` `TS2345` record-shape errors.
- **Found:** `check` exits 2 on four `TS2305` diagnostics against `@orkestrel/probe/server`, and
  `test:guides` exits 1 at file-level setup with `TypeError: scanDiagnostics is not a function`.
- **Evidence:**

  ```text
  $ npm ls @orkestrel/probe
  `-- @orkestrel/probe@0.0.12
  $ grep -c "scanDiagnostics\|parseProjectConfig\|Diagnostic" node_modules/@orkestrel/probe/dist/src/server/index.d.ts
  0
  $ cd /home/user/fleet/probe && grep -rn "scanDiagnostics\|parseProjectConfig" src/server/helpers.ts src/server/parsers.ts
  src/server/helpers.ts:383:export function scanDiagnostics(text: string): readonly Diagnostic[] {
  src/server/parsers.ts:25:export function parseProjectConfig(text: string): ProjectConfig | undefined {
  $ stat -c '%y %n' node_modules/@orkestrel/probe/package.json node_modules/@orkestrel/contract/package.json
  2026-09-07 16:39:08.368621736 +0000 node_modules/@orkestrel/probe/package.json
  2026-09-04 20:14:11.626187588 +0000 node_modules/@orkestrel/contract/package.json
  ```

  `tests/setupServer.ts:8` imports the `Diagnostic` type and `:19` imports `parseProjectConfig` and
  `scanDiagnostics` from `@orkestrel/probe/server`. The registry `0.0.12` exports none of them; the
  probe checkout's source tip exports all three. This reading was taken immediately after item 1 and
  before any edit, so it predates this unit's work.

- **Done:** items 1, 2, 3, and 4, complete. `format:check`, `oxlint`, `test:policy`, `test:config`,
  and `docs` all read as the criteria require.
- **Not done:** criterion 2's `check` and criterion 3's `test:guides` cannot go green here. The fix
  is a `@orkestrel/probe` head start install, which the permission floor and the standing conditions
  bar this unit from.
- **Hypothesis:** the `--no-save` `@orkestrel/guide@0.0.18` install reconciled `node_modules` against
  `package.json` and the lockfile (`removed 30 packages, and changed 3 packages`) and replaced a
  `@orkestrel/probe` head start with the registry `0.0.12`; the probe directory's modification time
  is the same second as that install, while sibling `@orkestrel` packages date to 2026-09-04.

Ancillary decisions, recorded and carried on from: the wording of each rewritten comment as tabled;
the rewrap of the two comment lines the banned-term replacements pushed past 100 columns; the
adaptation of the package's own `source.methods(...).toContain('count')` pair, which the facts block
lists as a drop-in site.

## Instruments and logs

Under `/home/user/fleet/database/tmp/d7n-database-prep/` (git-ignored, in this checkout):
`adapt.mjs`, `banned.mjs`, `reflow.mjs`, `voice.mjs`, `lines.mjs`, `dump.mjs`, `repair.log.txt`,
`oxlint-before.log.txt`, `oxlint-after.log.txt`, `docs.log.txt`, `docs-body.txt`, `voice-sites.txt`,
`blocks.txt`, `p21-docs.txt`.

## Wall clock

First command 2026-09-07T16:40:06Z, last command 2026-09-07T16:51:52Z: 11 minutes 46 seconds.

---

**Successor note (the Orchestrator, 2026-09-07):** the deviation this report records — `@orkestrel/probe/server` lacking `scanDiagnostics`, `parseProjectConfig`, and `Diagnostic` — was the Orchestrator's own doing: the guide head-start install (`npm install --no-save <guide tgz>`) reconciled `node_modules` to the lockfile and replaced probe's unpublished tip (installed `--no-save` by the ts6-api campaign, `scratchpad/ts6/pack/orkestrel-probe-0.0.12.tgz`, sha256 `6ec7c076…`) with the registry's `0.0.12`. `head-start.sh` now installs both tarballs in one command for database (`instruments/d7/pass/head-start-database-probe.log.txt`); with the tip restored the Orchestrator read `npm run check` exit 0 and `npm run test:guides` at `84 passed (84)`, the criteria this report leaves red. The closing sweep's reinstall carries the same pair.

---

Orchestrator's annotation (2026-09-07, from `d7n-database-audit-verdict.md`): this report states counts in prose; the tree is authoritative and every cited line matched it on the audit's re-read.
