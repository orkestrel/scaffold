# Report — `d7n-sqlite-prep`

Wall clock: 2026-09-07T15:15:53Z to 2026-09-07T15:19:08Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 28 unchanged, 0 removed in ..`

`git status --short` after: exactly the P21 list —

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

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Methods loop:

```diff
-		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+		for (const group of guide.methods()) {
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
```

Examples case (single):

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
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
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

The import-walk `findMissing(names, surface)` site was left unchanged (already string arguments), per the brief.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed:

```
src/server/SQLiteDatabase.ts:92:4: error policy(no-banned-term): Replace just in this comment: delete.
src/server/types.ts:65:1: error policy(no-banned-term): Replace just in this comment: delete.
```

Both are `no-banned-term` diagnostics for `just`; no `no-malformed-summary` diagnostic was reported.

`src/server/SQLiteDatabase.ts` (line 92, comment inside `prepare`):

```diff
-			// identity comparison (not just "is a connection open") keeps a statement
+			// identity comparison (not "is a connection open" alone) keeps a statement
```

`src/server/types.ts` (doc block starting line 65, `SQLiteDatabaseOptions`):

```diff
- * not just out-of-range ones, closing that read/write asymmetry at the cost of
+ * not out-of-range ones alone, closing that read/write asymmetry at the cost of
```

Re-run after the edits: `npx oxlint --config .oxlintrc.json --deny-warnings .` produced no output (exit 0).

`npm run test:policy` after item 1 and after these edits reported `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`; its `prose` rule named no line in `guides/**` or `README.md` to fix, so no further edit in those files was made.

## Item 4 — the bump

`package.json`: `"version": "0.0.10"` → `"version": "0.0.11"`. `package-lock.json` untouched.

## Criteria

1. `git status --short` (final):

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/server/SQLiteDatabase.ts
 M src/server/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list, plus `tests/guides.test.ts` (item 2), plus `src/server/SQLiteDatabase.ts` and `src/server/types.ts` (item 3, the two `no-banned-term` sites listed above), plus the version line already inside `package.json`. Nothing else.

2. `npm run format:check`:

```
All matched files use the correct format.
Finished in 7761ms on 44 files using 4 threads.
```
Exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings .`: no output. Exit 0.

`npm run check`:
```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
```
Exit 0.

3. `npm run test:guides`:
```
Test Files  1 passed (1)
     Tests  33 passed (33)
```
Exit 0.

`npm run test:policy`:
```
Test Files  1 passed (1)
     Tests  90 passed | 1 skipped (91)
```
Exit 0.

`npm run test:config`:
```
FAIL  |config| tests/config.test.ts > configuration helpers > reads the compiler scope and fixed extractor override a declaration roll-up requires
Error: ENOENT: no such file or directory, open '/home/user/fleet/sqlite/configs/src/tsconfig.core.json'
Test Files  1 failed (1)
     Tests  1 failed | 171 passed | 1 skipped (173)
```
Exit non-zero. **Deviation — see below.**

4. `npm run docs`: exit 1, worklist reads `rows read: 1, disagreements found: 32`, printed verbatim above under item's expected reading — reproduced here as the criterion evidence:

```
guides/sqlite.md function createSQLiteDatabase: guide "A synchronous SQLite database over `node:sqlite` (defaults `:memory:`)." source "Creates a synchronous SQLite database over `node:sqlite`."
guides/sqlite.md class SQLiteDatabase: guide "The database — `connect` / `close` / `execute` / `prepare` / `transact` / `begin` / `commit` / `rollback` / `pragma`; readonly `path`, `connected`, and `transacting`." source "Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync`."
guides/sqlite.md class SQLiteStatement: guide "A prepared statement — `execute` / `get` / `all` / `iterate`." source "Represents a prepared statement over `node:sqlite`'s `StatementSync` — the only way the wrapper runs SQL."
guides/sqlite.md const SQLITE_CONSTRAINT: guide "SQLite result code (low byte `19`) `wrapError` masks the `errcode` against to flag a constraint violation." source "Names the SQLite result code for a constraint violation."
guides/sqlite.md const SQLITE_BUSY: guide "SQLite result code (low byte `5`) `wrapError` masks the `errcode` against to flag a locked-database fault." source "Names the SQLite result code for a locked-database fault."
guides/sqlite.md function wrapError: guide "The boundary conversion from a thrown native `node:sqlite` error to a typed `SQLiteError`." source "Converts a thrown native `node:sqlite` error into a typed `SQLiteError`."
guides/sqlite.md function bindParameters: guide "The normalization of `SQLiteParameters` to a native call's positional-spread or named shape." source "Normalizes `SQLiteParameters` to the binding shape a native `StatementSync` call expects."
guides/sqlite.md class SQLiteError: guide "A wrapper error carrying a machine-readable `code` (`CLOSED` / `CONSTRAINT` / `BUSY` / `INVALID` / `UNKNOWN`)." source "Represents an error thrown by the SQLite wrapper."
guides/sqlite.md function isSQLiteError: guide "Whether a value is a `SQLiteError`." source "Checks whether a value is a `SQLiteError`."
guides/sqlite.md type SQLiteValue: guide "A value SQLite stores and returns natively (`null` / number / bigint / string / `Uint8Array`)." source "Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge."
guides/sqlite.md type SQLiteRow: guide "A result row — a record of column name to `SQLiteValue`." source "Represents a result row — a record of column name to `SQLiteValue`."
guides/sqlite.md type SQLiteParameters: guide "Bind parameters — positional (an array) or named (a record)." source "Represents the bind parameters for a prepared statement — positional (an array, bound to `?`) or named (a record, bound to bare `:name` placeholders)."
guides/sqlite.md type SQLiteBinding: guide "The normalized binding shape a native call expects — `{ positional }` or `{ named }`." source "Represents the normalized binding shape a native `StatementSync` call expects — what `SQLiteParameters` become on the way into `node:sqlite`."
guides/sqlite.md interface SQLiteExecuteResult: guide "The outcome of a non-query statement (`changes` / `rowid`) — `number` (a count / rowid past 2^53 truncates, acceptable for keys and changes)." source "Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL)."
guides/sqlite.md type SQLiteErrorCode: guide "The machine-readable `SQLiteError` code union." source "Represents a machine-readable `SQLiteError` code."
guides/sqlite.md interface SQLiteDatabaseOptions: guide "Options for `createSQLiteDatabase` (`path` / `readonly` / `timeout` / `foreignKeys` / `bigints`)." source "Represents the options for `createSQLiteDatabase`."
guides/sqlite.md interface SQLiteStatementInterface: guide "The prepared-statement contract." source "Represents a prepared statement — the only way the wrapper runs SQL (no query DSL; the core database layer owns querying, exactly as the IndexedDB wrapper does)."
guides/sqlite.md interface SQLiteDatabaseInterface: guide "The database contract." source "Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync` — a lean, typed layer whose one runtime dependency is `@orkestrel/contract`, exposing prepared statements, transactions, and pragmas. Synchronous because `node:sqlite` is; `@orkestrel/database`'s SQLite driver adapts it to that package's asynchronous driver contract."
guides/sqlite.md SQLiteDatabaseInterface.connect: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.close: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.execute: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.prepare: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.transact: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.begin: guide absent source "Opens a transaction (`BEGIN`). Throws the native fault — including a nested `BEGIN` while one is already open — as a `SQLiteError`. Branch on `SQLiteDatabaseInterface.transacting` first rather than catching this when composing a transaction alongside others (see the Practices section in `guides/sqlite.md`)."
guides/sqlite.md SQLiteDatabaseInterface.commit: guide absent source "Commits the open transaction (`COMMIT`); throws the native fault as a `SQLiteError` when none is open."
guides/sqlite.md SQLiteDatabaseInterface.rollback: guide absent source "Rolls back the open transaction (`ROLLBACK`); throws the native fault as a `SQLiteError` when none is open."
guides/sqlite.md SQLiteDatabaseInterface.pragma: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.execute: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.get: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.all: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.iterate: guide absent source absent
guides/sqlite.md pitch: readme absent tagline "A lean, typed, synchronous wrapper over Node's built-in `node:sqlite` — one runtime dependency, `@orkestrel/contract`, for boundary narrowing — a thin typed skin on `DatabaseSync` / `StatementSync`. It surfaces exactly SQLite's native power — prepared statements, transactions, and pragmas — and deliberately no query / filter / sort / aggregate builder: it is the raw native handle, not an ORM, so a caller reaching for typed querying builds that layer on top. Source: `src/server`. Surfaced through the `@src/server` barrel. Requires Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`, `isTransaction`, and `readBigInts` options and `StatementSync.iterate`)."
rows read: 1, disagreements found: 32
```

This exactly matches P21's expected `docs` worklist, confirming this reading is the converge unit's carried worklist rather than a regression from this unit's edits.

## Deviation report

**Expected:** acceptance criterion 3 states `npm run test:config` exits 0.

**Found:** `npm run test:config` fails one test — `configuration helpers > reads the compiler scope and fixed extractor override a declaration roll-up requires` — with `Error: ENOENT: no such file or directory, open '/home/user/fleet/sqlite/configs/src/tsconfig.core.json'`. `Test Files 1 failed (1)`, `Tests 1 failed | 171 passed | 1 skipped (173)`.

**Evidence:** `tests/config.test.ts` is vendored, unmodified since item 1's `repair --offline` (`git diff --stat tests/config.test.ts` shows only the 404-line insertion `repair` wrote, no further edit from this unit). The failing assertion at line 2141 hardcodes `resolve(root, 'configs/src/tsconfig.core.json')`. `sqlite`'s `configs/src/` directory contains only `tsconfig.server.json` and `vite.server.config.ts` — no `tsconfig.core.json` — because sqlite has no `core` module, only `server`. This is a structural fact of the package, not something items 2-4 touched (none of those items wrote to `configs/**` or `tests/config.test.ts`).

**Done / not done:** items 1 through 4 are done; criteria 1, 2, and 4 are met; criterion 3 is not fully met — `test:guides` and `test:policy` pass, `test:config` fails on the one test above, pre-existing immediately after `repair --offline` and unrelated to this unit's edits.

**Hypothesis:** the vendored `tests/config.test.ts` this repair version writes assumes every repaired package owns a `core` project and hardcodes `tsconfig.core.json`, which does not hold for a package with only a `server` environment.

Per the deviation contract ("or if a gate other than `docs` reads red after the items"), this unit stops here rather than editing the off-limits vendored test file to route around the missing `core` project.

---

**Successor note (the Orchestrator, 2026-09-07):** the `npm run test:config` deviation this report records (`ENOENT: configs/src/tsconfig.core.json`, the vendored test assuming a core face) was closed in scaffold by `f4494c1b` (the test walks the faces and reads the declared `rootDir`); the tip was re-packed and this checkout re-repaired before the P.1 landing, with `test:config` at `172 passed | 1 skipped` — see `instruments/d7/pass/f5b-repack-rerepair.log.txt` and `d7n-scaffold-config-face-2-report.md`. The deviation section stands as the unit's reading at its time; the committed tree carries the fix. The audit also read counts in this report's prose; the tree is authoritative.
