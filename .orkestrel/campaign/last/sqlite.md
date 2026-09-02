# Last changes: sqlite

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `1ede0ae`, merge base with `origin/main` `f9b501a`, layer L1, declared version 0.0.9, registry version 0.0.9.

## Commits since origin/main

```text
182273c 2026-08-28 Update every dependency to the published latest
9910937 2026-08-28 Adopt the catalog and guide mirrors for the wave
e1c3294 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
6ef37f7 2026-09-01 Apply the verified src-audit fixes
a397f6c 2026-09-01 Adopt the renamed guide helpers in the parity test
02cabef 2026-09-02 Apply the breaking rows in sqlite
90d3527 2026-09-02 State the declared engine floor in the README
5a9340b 2026-09-02 Name the execute member in the DDL round-trip test title
1ede0ae 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md              | 17 +++++++++--------
 README.md                                |  4 ++--
 package.json                             |  6 +++---
 src/server/SQLiteDatabase.ts             | 16 ++++++++--------
 src/server/SQLiteStatement.ts            |  2 +-
 src/server/constants.ts                  |  4 ++--
 src/server/errors.ts                     |  6 +++---
 src/server/factories.ts                  |  4 ++--
 src/server/helpers.ts                    | 14 +++++---------
 src/server/types.ts                      | 60 ++++++++++++++++++++++++++++++++++++++----------------------
 tests/guides.test.ts                     | 22 +++++++++++-----------
 tests/src/server/SQLiteDatabase.test.ts  | 72 ++++++++++++++++++++++++++++++++++++++----------------------------------
 tests/src/server/SQLiteStatement.test.ts |  4 ++--
 tests/src/server/factories.test.ts       |  6 +++---
 tests/src/server/helpers.test.ts         |  2 +-
 15 files changed, 128 insertions(+), 111 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 40954d5..07f8821 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,7 +1,7 @@
 // The wrapper's numeric SQLite result codes (AGENTS §5 constants file).
 
 /**
- * SQLite result code for a constraint violation (`SQLITE_CONSTRAINT`).
+ * Names the SQLite result code for a constraint violation.
  *
  * @remarks
  * A native `errcode` packs the primary result in its low byte, with extended codes
@@ -11,7 +11,7 @@
 export const SQLITE_CONSTRAINT = 19
 
 /**
- * SQLite result code for a locked-database fault (`SQLITE_BUSY`).
+ * Names the SQLite result code for a locked-database fault.
  *
  * @remarks
  * A native `errcode` packs the primary result in its low byte, with extended codes
diff --git a/src/server/errors.ts b/src/server/errors.ts
index 0823719..fd5b9ae 100644
--- a/src/server/errors.ts
+++ b/src/server/errors.ts
@@ -9,7 +9,7 @@ import type { SQLiteErrorCode } from './types.js'
 // wrapper-lifecycle fault, and everything else is `UNKNOWN` (AGENTS §12).
 
 /**
- * An error thrown by the SQLite wrapper.
+ * Represents an error thrown by the SQLite wrapper.
  *
  * @remarks
  * Carries a {@link SQLiteErrorCode} and an optional `context` record (e.g. the
@@ -42,10 +42,10 @@ export class SQLiteError extends Error {
 }
 
 /**
- * Whether a value is a {@link SQLiteError}.
+ * Checks whether a value is a {@link SQLiteError}.
  *
  * @param value - The value to test
- * @returns `true` when `value` is a `SQLiteError`
+ * @returns True if `value` is a `SQLiteError`; false otherwise
  */
 export function isSQLiteError(value: unknown): value is SQLiteError {
 	return value instanceof SQLiteError
diff --git a/src/server/types.ts b/src/server/types.ts
index d941094..5251004 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -11,7 +11,7 @@
 // driver) through a contract, never re-narrowed here (AGENTS §14).
 
 /**
- * A value SQLite stores and returns natively — the SQL ↔ JS bridge.
+ * Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge.
  *
  * @remarks
  * `node:sqlite` maps `NULL` / `INTEGER` / `REAL` / `TEXT` / `BLOB` to exactly
@@ -19,23 +19,38 @@
  */
 export type SQLiteValue = null | number | bigint | string | Uint8Array
 
-/** A result row — a record of column name to {@link SQLiteValue}. */
+/** Represents a result row — a record of column name to {@link SQLiteValue}. */
 export type SQLiteRow = Record<string, SQLiteValue>
 
 /**
- * Bind parameters for a prepared statement — positional (an array, bound to `?`)
+ * Represents the bind parameters for a prepared statement — positional (an array, bound to `?`)
  * or named (a record, bound to bare `:name` placeholders).
  */
 export type SQLiteParameters = readonly SQLiteValue[] | Readonly<Record<string, SQLiteValue>>
 
-/** The outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL). */
+/**
+ * Represents the normalized binding shape a native `StatementSync` call expects — what
+ * {@link SQLiteParameters} become on the way into `node:sqlite`.
+ *
+ * @remarks
+ * `positional` carries an array spread into the native call against `?`
+ * placeholders; `named` carries a record passed as a single leading object bound
+ * to bare `:name` placeholders. The discriminant is the present member, so a
+ * consumer branches with `'named' in binding` and stays typed against the native
+ * overloads without an assertion.
+ */
+export type SQLiteBinding =
+	| { readonly positional: readonly SQLiteValue[] }
+	| { readonly named: Readonly<Record<string, SQLiteValue>> }
+
+/** Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL). */
 export interface SQLiteRunResult {
 	readonly changes: number
 	readonly rowid: number
 }
 
 /**
- * A machine-readable {@link SQLiteError} code.
+ * Represents a machine-readable {@link SQLiteError} code.
  *
  * @remarks
  * `'BUSY'` is retryable — it means a locked database was still held by another
@@ -45,7 +60,7 @@ export interface SQLiteRunResult {
 export type SQLiteErrorCode = 'CLOSED' | 'CONSTRAINT' | 'BUSY' | 'UNKNOWN'
 
 /**
- * Options for `createSQLiteDatabase`.
+ * Represents the options for `createSQLiteDatabase`.
  *
  * @remarks
  * `path` is the database file path, or the special name `':memory:'` for an
@@ -55,13 +70,14 @@ export type SQLiteErrorCode = 'CLOSED' | 'CONSTRAINT' | 'BUSY' | 'UNKNOWN'
  * (native `timeout`) — how long SQLite retries a locked database before
  * failing with a `BUSY` {@link SQLiteError}; defaults to `0` (fail
  * immediately) when omitted. `foreignKeys` enables foreign-key constraint
- * enforcement (native `enableForeignKeyConstraints`); `node:sqlite` defaults
- * this to `true` when omitted. `bigints` reads `INTEGER` columns back as
- * `bigint` (native `readBigInts`) — writes already accept `bigint` regardless
- * of this option, so a stored integer beyond `Number.MAX_SAFE_INTEGER` throws
- * on read unless `bigints` is enabled; enabling it returns EVERY integer
- * column as `bigint`, not just out-of-range ones, closing that read/write
- * asymmetry at the cost of `bigint` values for ordinary small integers too.
+ * enforcement (native `enableForeignKeyConstraints`) and mirrors SQLite's
+ * `PRAGMA foreign_keys` statement; `node:sqlite` defaults this to `true` when
+ * omitted. `bigints` reads `INTEGER` columns back as `bigint` (native
+ * `readBigInts`) — writes already accept `bigint` regardless of this option,
+ * so a stored integer beyond `Number.MAX_SAFE_INTEGER` throws on read unless
+ * `bigints` is enabled; enabling it returns EVERY integer column as `bigint`,
+ * not just out-of-range ones, closing that read/write asymmetry at the cost of
+ * `bigint` values for ordinary small integers too.
  */
 export interface SQLiteDatabaseOptions {
 	readonly path?: string
@@ -72,7 +88,7 @@ export interface SQLiteDatabaseOptions {
 }
 
 /**
- * A prepared statement — the only way the wrapper runs SQL (no query DSL; the
+ * Represents a prepared statement — the only way the wrapper runs SQL (no query DSL; the
  * core database layer owns querying, exactly as the IndexedDB wrapper does).
  *
  * @remarks
@@ -90,7 +106,7 @@ export interface SQLiteStatementInterface {
 }
 
 /**
- * A synchronous SQLite database over `node:sqlite`'s `DatabaseSync` — a lean,
+ * Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync` — a lean,
  * typed, zero-dependency layer exposing prepared statements, transactions, and
  * pragmas. Synchronous because `node:sqlite` is; the SQLite *driver* (Chunk 3)
  * adapts it to the async `DriverInterface`.
@@ -98,8 +114,8 @@ export interface SQLiteStatementInterface {
  * @remarks
  * Connects lazily — `connect` opens the underlying `DatabaseSync` (idempotent),
  * and every operation requires an open connection, throwing a `CLOSED`
- * {@link SQLiteError} before `connect` or after `close`. `exec` runs SQL with no
- * results (DDL, pragmas); `prepare` compiles a {@link SQLiteStatementInterface};
+ * {@link SQLiteError} before `connect` or after `close`. `execute` runs SQL with
+ * no results (DDL, pragmas); `prepare` compiles a {@link SQLiteStatementInterface};
  * `transaction` runs a scope between `BEGIN` and `COMMIT`, rolling back on a
  * throw; `pragma` reads (or sets then reads) a single PRAGMA value — `name` is
  * trusted internal use only, never untrusted input, since pragma names cannot
@@ -120,20 +136,20 @@ export interface SQLiteDatabaseInterface {
 	readonly transacting: boolean
 	connect(): void
 	close(): void
-	exec(sql: string): void
+	execute(sql: string): void
 	prepare(sql: string): SQLiteStatementInterface
 	transaction<R>(scope: () => R): R
 	/**
-	 * Open a transaction (`BEGIN`). Throws the native fault — including a
+	 * Opens a transaction (`BEGIN`). Throws the native fault — including a
 	 * nested `BEGIN` while one is already open — as a {@link SQLiteError}; a
 	 * caller composing its own transaction alongside others should branch on
 	 * {@link SQLiteDatabaseInterface.transacting} first rather than catch this
-	 * (see the Practices section in `guides/src/sqlite.md`).
+	 * (see the Practices section in `guides/sqlite.md`).
 	 */
 	begin(): void
-	/** Commit the currently open transaction (`COMMIT`); throws the native fault as a {@link SQLiteError} when none is open. */
+	/** Commits the currently open transaction (`COMMIT`); throws the native fault as a {@link SQLiteError} when none is open. */
 	commit(): void
-	/** Roll back the currently open transaction (`ROLLBACK`); throws the native fault as a {@link SQLiteError} when none is open. */
+	/** Rolls back the currently open transaction (`ROLLBACK`); throws the native fault as a {@link SQLiteError} when none is open. */
 	rollback(): void
 	pragma(name: string, value?: string | number): SQLiteValue | undefined
 	[Symbol.dispose](): void
```
