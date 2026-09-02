# Last changes: database

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `42c0235`, merge base with `origin/main` `16647c7`, layer L2, declared version 0.0.12, registry version 0.0.12.

## Commits since origin/main

```text
6bc50c6 2026-08-28 Update every dependency to the published latest
fcaa904 2026-08-28 Adopt the catalog and guide mirrors for the wave
89e093f 2026-08-28 Apply the verified src-audit fixes
352fd91 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
dc5387c 2026-09-01 Adopt the renamed guide helpers in the parity test
c7baae0 2026-09-02 Rename the driver scan and SQL compilers, drop the fuzzy and LIKE helpers
2ded05a 2026-09-02 Fail the IndexedDB column.remove migration closed on a non-record value
4c8399a 2026-09-02 Point the README at the guide the package ships
42c0235 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                                            |  17 +-
 README.md                                                              |   2 +-
 package.json                                                           |   6 +-
 src/browser/constants.ts                                               |  29 +++-
 src/browser/drivers/IndexedDBDriver.ts                                 | 101 ++++++------
 src/browser/factories.ts                                               |   2 +-
 src/browser/helpers.ts                                                 |  37 ++---
 src/browser/types.ts                                                   |   9 +-
 src/core/Cursor.ts                                                     |   6 +-
 src/core/Database.ts                                                   |  36 ++---
 src/core/DatabaseContext.ts                                            |  55 +++----
 src/core/DatabaseTransaction.ts                                        |  28 +---
 src/core/DriverIterator.ts                                             |   2 +-
 src/core/Query.ts                                                      |  10 +-
 src/core/{DatabaseIterator.ts => ScopedIterator.ts}                    |  31 ++--
 src/core/Table.ts                                                      |  24 +--
 src/core/TransactionIterator.ts                                        |  78 ---------
 src/core/TransactionScope.ts                                           |   9 +-
 src/core/cloners.ts                                                    |   6 +-
 src/core/constants.ts                                                  |  66 +++++++-
 src/core/drivers/MemoryDriver.ts                                       |  67 ++++----
 src/core/errors.ts                                                     |   8 +-
 src/core/factories.ts                                                  |   4 +-
 src/core/helpers.ts                                                    | 358 ++++++++++++++++++++++++++---------------
 src/core/types.ts                                                      | 218 +++++++++++++------------
 src/core/validators.ts                                                 |  63 ++------
 src/server/compilers.ts                                                | 123 ++++----------
 src/server/constants.ts                                                |   6 +-
 src/server/drivers/JSONDriver.ts                                       |  24 +--
 src/server/drivers/SQLiteDriver.ts                                     | 125 +++++++-------
 src/server/factories.ts                                                |  11 +-
 src/server/helpers.ts                                                  | 109 +++++++------
 src/server/index.ts                                                    |   1 +
 src/server/inferers.ts                                                 |  33 ++++
 src/server/types.ts                                                    |  14 +-
 tests/guides.test.ts                                                   |  33 ++--
 tests/setupServer.ts                                                   |   4 +-
 tests/src/browser/drivers/IndexedDBDriver.test.ts                      |  53 +++++-
 tests/src/browser/helpers.test.ts                                      |   8 +
 tests/src/core/{TransactionIterator.test.ts => ScopedIterator.test.ts} |  76 +++++++--
 tests/src/core/helpers.test.ts                                         | 151 ++++++++++-------
 tests/src/core/validators.test.ts                                      |  39 -----
 tests/src/server/compilers.test.ts                                     | 101 +++---------
 tests/src/server/drivers/SQLiteDriver.test.ts                          |  48 +++---
 tests/src/server/helpers.test.ts                                       |  25 ++-
 tests/src/server/inferers.test.ts                                      |  34 ++++
 46 files changed, 1217 insertions(+), 1073 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/browser/constants.ts b/src/browser/constants.ts
index 6fc37ed..d45fd6f 100644
--- a/src/browser/constants.ts
+++ b/src/browser/constants.ts
@@ -1,15 +1,30 @@
 import type { ColumnStorage } from '@src/core'
 
-// The column types that are valid, orderable IndexedDB keys (string / number key
-// space). `boolean` / `json` / `blob` are not valid `IDBValidKey`s and would make
-// a range silently miss rows, so they are never pushed down.
-export const INDEXABLE_STORAGE: ReadonlySet<ColumnStorage> = new Set<ColumnStorage>([
+/**
+ * Lists the declared {@link ColumnStorage}s that are valid, orderable IndexedDB keys.
+ *
+ * @remarks
+ * `text` / `integer` / `real` occupy IndexedDB's string / number key space, so a
+ * column declared with one of them can back a store or index range read.
+ * `boolean` / `json` / `blob` are not valid `IDBValidKey`s and a range over one
+ * would silently miss rows, so `selectPlan` never pushes a condition down on
+ * them and the core engine answers the read instead. A frozen array, matching
+ * `EXACT_COLUMN_STORAGE` in `src/server`: a consumer holding it reads the
+ * membership with `includes` and cannot change the driver's pushdown behavior.
+ */
+export const INDEXABLE_STORAGE: readonly ColumnStorage[] = Object.freeze([
 	'text',
 	'integer',
 	'real',
 ])
 
-// The reserved out-of-line store the driver stamps its DriverMetadata into
-// (`metadata` / `stamp`). A user table declared with this exact name would
-// collide with the driver's own bookkeeping — callers must avoid it.
+/**
+ * Names the reserved out-of-line store the {@link IndexedDBDriver} stamps its
+ * {@link DriverMetadata} into.
+ *
+ * @remarks
+ * Backs the driver's `metadata` / `stamp` hooks. A user table declared with this
+ * exact name collides with the driver's own bookkeeping, so a caller must avoid
+ * it; the collision is caught at `open`.
+ */
 export const METADATA_STORE = '__metadata__'
diff --git a/src/browser/types.ts b/src/browser/types.ts
index 69b308e..40f5988 100644
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -1,9 +1,10 @@
-// The IndexedDB driver's own module types. Types are the source of truth
-// (AGENTS §2). The shared database vocabulary (`QueryInput`, `TableSchema`, `Row`,
-// …) lives in `@orkestrel/database`; only this driver's pushdown-planning shape is local.
+// The IndexedDB driver's own module types. Types are the source of truth:
+// implementation and tests conform to them. The shared database vocabulary
+// (`QueryInput`, `TableSchema`, `Row`, …) lives in `@orkestrel/database`; only
+// this driver's pushdown-planning shape is local.
 
 /**
- * A pushdown plan — an optional index and optional `IDBKeyRange` used to narrow
+ * Represents a pushdown plan — an optional index and optional `IDBKeyRange` used to narrow
  * a read. An omitted `index` selects the primary store; an omitted `range`
  * performs a full scan. The plan is always a superset of the matching rows;
  * the core engine refines it to the exact result. An empty plan (`{}`) is a
diff --git a/src/core/constants.ts b/src/core/constants.ts
index b4726ed..83968ea 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,7 +1,9 @@
-// Database constants — frozen plain data (AGENTS §5).
+import type { ColumnSchema, TableSchema } from './types.js'
+
+// Database constants — frozen plain data.
 
 /**
- * The primary-key column assumed when {@link PrimaryMap} does not name one.
+ * Supplies the primary-key column assumed when {@link PrimaryMap} does not name one.
  *
  * @remarks
  * `id` is the convention IndexedDB (`keyPath: 'id'`) and SQL (`id` / rowid) both
@@ -10,12 +12,12 @@
 export const DEFAULT_PRIMARY = 'id'
 
 /**
- * The longest `LIKE` / `GLOB` pattern the wildcard matcher accepts before rejecting it.
+ * Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts before rejecting it.
  *
  * @remarks
- * A ReDoS bound (AGENTS §6.5): the SA1–SA4 migration lets a model supply `list`
- * input over the wire, so `matchesLikePattern` / `matchesGlobPattern` run attacker-controlled
- * patterns. The matcher is the LINEAR greedy two-pointer wildcard match — never a
+ * A `LIKE` / `GLOB` pattern is a caller-supplied operand, so
+ * `matchesLikePattern` / `matchesGlobPattern` run patterns this package cannot
+ * trust. The matcher is the LINEAR greedy two-pointer wildcard match — never a
  * backtracking regex (`.*`-segments-separated-by-literals against a long input is the
  * catastrophic shape JS cannot bound without atomic groups), so it is O(value ×
  * pattern). Capping the pattern length bounds that pattern factor, leaving a match
@@ -23,3 +25,55 @@ export const DEFAULT_PRIMARY = 'id'
  * `VALIDATION` {@link DatabaseError}; the cap is generous for any legitimate search.
  */
 export const MAX_PATTERN_LENGTH = 1024
+
+/**
+ * Describes the `users` table the driver-conformance battery opens — keyed by the default
+ * `id` primary column.
+ *
+ * @remarks
+ * `age` is optional and `meta` is a declared `json` column, so the battery's
+ * nested-round-trip phase is fair to a typed-column backend: a SQL driver
+ * persists only declared columns, while a schemaless backend ignores the
+ * declarations entirely.
+ */
+export const CONFORMANCE_USERS_SCHEMA: TableSchema = Object.freeze({
+	name: 'users',
+	primary: 'id',
+	columns: Object.freeze<readonly ColumnSchema[]>([
+		{ name: 'id', storage: 'text', optional: false, nullable: false },
+		{ name: 'name', storage: 'text', optional: false, nullable: false },
+		{ name: 'age', storage: 'integer', optional: true, nullable: false },
+		{ name: 'meta', storage: 'json', optional: true, nullable: false },
+	]),
+	indexes: Object.freeze([]),
+})
+
+/**
+ * Describes the `posts` table the driver-conformance battery opens — keyed by a non-`id`
+ * `slug` primary column.
+ *
+ * @remarks
+ * Pairs with {@link CONFORMANCE_USERS_SCHEMA} so one battery exercises both
+ * primary-key shapes: the default `id` and an explicit override.
+ */
+export const CONFORMANCE_POSTS_SCHEMA: TableSchema = Object.freeze({
+	name: 'posts',
+	primary: 'slug',
+	columns: Object.freeze<readonly ColumnSchema[]>([
+		{ name: 'slug', storage: 'text', optional: false, nullable: false },
+		{ name: 'title', storage: 'text', optional: false, nullable: false },
+	]),
+	indexes: Object.freeze([]),
+})
+
+/**
+ * Holds the fixed two-table schema every driver-conformance phase opens.
+ *
+ * @remarks
+ * Each phase mints a fresh driver and opens this exact schema, so a finding
+ * names a violated invariant rather than a setup difference between phases.
+ */
+export const CONFORMANCE_SCHEMA: readonly TableSchema[] = Object.freeze([
+	CONFORMANCE_USERS_SCHEMA,
+	CONFORMANCE_POSTS_SCHEMA,
+])
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 2ee518e..9dd233d 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,12 +1,12 @@
 import type { DatabaseErrorCode } from './types.js'
 
-// AGENTS §12: invalid operations and programmer errors `throw`, always a
+// Invalid operations and programmer errors `throw`, always a
 // `DatabaseError` carrying a machine-readable `code` so a `catch` branches on
 // `error.code` instead of parsing the message. Lookups that may simply miss
 // (`get`, `has`, `remove`) return `undefined` / `false` — they never throw.
 
 /**
- * An error thrown by the database layer.
+ * Represents an error thrown by the database layer.
  *
  * @remarks
  * Carries a {@link DatabaseErrorCode} and an optional `context` bag naming the
@@ -38,10 +38,10 @@ export class DatabaseError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to a {@link DatabaseError}.
+ * Narrows an unknown caught value to a {@link DatabaseError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is a {@link DatabaseError}
+ * @returns True if `value` is a {@link DatabaseError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index 958f95d..2e491db 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -15,12 +15,12 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 // table is typed by `Infer` of its columns, with validation, coercion, JSON-Schema
 // introspection, and seed generation all flowing from that one declaration.
 // `import` / `export` move whole schemas between databases and environments.
-// Types are the source of truth (AGENTS §2).
+// Types are the source of truth: implementation and tests conform to this file.
 
 // === Primitives
 
 /**
- * A primary key — the value identifying a row within its table.
+ * Represents a primary key — the value identifying a row within its table.
  *
  * @remarks
  * `string | number` is the intersection of what IndexedDB key ranges and SQL
@@ -30,7 +30,7 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 export type Key = string | number
 
 /**
- * A key-generating function.
+ * Represents a key-generating function.
  *
  * @remarks
  * Supplied through {@link DatabaseOptions.generator} as an authoritative
@@ -40,13 +40,13 @@ export type Key = string | number
  */
 export type KeyFunction = () => Key
 
-/** A table row — a plain record of column values keyed by column name. */
+/** Represents a table row — a plain record of column values keyed by column name. */
 export type Row = Record<string, unknown>
 
 // === Query input
 
 /**
- * A WHERE operator — the comparison a single {@link Condition} applies.
+ * Represents a WHERE operator — the comparison a single {@link Condition} applies.
  *
  * @remarks
  * Each maps to a SQL operator and an IndexedDB read strategy (a key range where
@@ -70,11 +70,11 @@ export type ConditionOperator =
 	| 'absent'
 	| 'present'
 
-/** How a {@link Condition} joins to the running result of the conditions before it. */
+/** Names how a {@link Condition} joins to the running result of the conditions before it. */
 export type ConditionConnector = 'and' | 'or'
 
 /**
- * One compiled WHERE condition.
+ * Represents one compiled WHERE condition.
  *
  * @remarks
  * `values` carries the operands the operator needs — none for `absent` /
@@ -91,17 +91,17 @@ export interface Condition {
 	readonly connector: ConditionConnector
 }
 
-/** A sort direction. */
+/** Names a sort direction. */
 export type OrderDirection = 'ascending' | 'descending'
 
-/** One ordering term — a column ({@link FieldPath}, flat or nested) and its direction. */
+/** Represents one ordering term — a column ({@link FieldPath}, flat or nested) and its direction. */
 export interface Order {
 	readonly column: FieldPath
 	readonly direction: OrderDirection
 }
 
 /**
- * A serializable read specification — everything a backend needs to compile one
+ * Represents a serializable read specification — everything a backend needs to compile one
  * read, free of JS callbacks so any backend can honor it.
  *
  * @remarks
@@ -117,7 +117,7 @@ export interface QueryInput {
 	readonly offset?: number
 }
 
-/** An aggregate computed over a numeric column. */
+/** Names an aggregate computed over a numeric column. */
 export type AggregateOperation = 'count' | 'sum' | 'average' | 'minimum' | 'maximum'
 
 /**
@@ -135,10 +135,26 @@ export interface OperationOptions {
 
 // === Lifecycle
 
-/** The lifecycle state of a {@link DatabaseInterface}. */
+/** Names the lifecycle state of a {@link DatabaseInterface}. */
 export type DatabaseStatus = 'idle' | 'open' | 'closed'
 
-/** A machine-readable {@link DatabaseError} code. */
+/**
+ * Represents the admission boundary a scoped operation enters before it runs.
+ *
+ * @remarks
+ * The one contract the root database context and a transaction scope both
+ * expose: `accepting` reports whether the boundary still admits work, and
+ * `track` enters an operation into the boundary's ledger so whoever stops the
+ * boundary can contain everything already accepted. A streamed read enters each
+ * continuation independently through the same pair, so an idle iterator never
+ * pins the boundary open.
+ */
+export interface AdmissionInterface {
+	readonly accepting: boolean
+	track<R>(operation: () => Promise<R>): Promise<R>
+}
+
+/** Names a machine-readable {@link DatabaseError} code. */
 export type DatabaseErrorCode =
 	| 'CLOSED'
 	| 'NOT_FOUND'
@@ -150,7 +166,7 @@ export type DatabaseErrorCode =
 	| 'DRIVER'
 
 /**
- * One violated invariant from the driver-conformance battery.
+ * Represents one violated invariant from the driver-conformance battery.
  *
  * @remarks
  * Mirrors the payload shape of a `DatabaseError` `CONFORMANCE` `context` —
@@ -164,14 +180,14 @@ export interface ConformanceFinding {
 }
 
 /**
- * The push observation surface of a {@link DatabaseInterface} (AGENTS §13) — the
+ * Describes the push observation surface of a {@link DatabaseInterface} — the
  * connection + transaction lifecycle a fire-and-forget observer (logging, metrics,
  * tracing, cache invalidation) subscribes to.
  *
  * @remarks
  * Pure signals carrying no row data — these are the database-level (not per-row)
  * moments, so a non-generic map stays lean (per-row writes are {@link TableEventMap}).
- * Listener isolation is the emitter's (AGENTS §13): every event is emitted directly and a
+ * Listener isolation is the emitter's: every event is emitted directly and a
  * listener throw is routed to the emitter's OWN `error` handler (the `error` option), never
  * onto this domain map and never into the snapshot / commit / rollback flow — so a buggy
  * observer can never reorder, throw into, or corrupt a transaction. Every emit sits AFTER the
@@ -180,28 +196,28 @@ export interface ConformanceFinding {
  * still propagates). A rollback failure propagates instead and emits no misleading
  * `rollback` event. Subscribe via `database.emitter.on(...)`.
  *
- * Declared as a `type` alias (not `interface extends EventMap`, §4.5 — `EventMap` is a
+ * Declared as a `type` alias (not `interface extends EventMap` — `EventMap` is a
  * `type` kind): a type-literal satisfies the `EventMap` constraint
  * (`Record<string, readonly unknown[]>`) structurally, whereas an interface lacks the
  * required index signature.
  */
 export type DatabaseEventMap = {
-	/** The driver connected (`open`, or the lazy first-use connect completed). */
+	/** Signals that the driver connected (`open`, or the lazy first-use connect completed). */
 	readonly open: readonly []
-	/** The database was closed (the driver released). */
+	/** Signals that the database was closed (the driver released). */
 	readonly close: readonly []
-	/** A transaction scope began after its native boundary or fallback snapshot was acquired. */
+	/** Signals that a transaction scope began after its native boundary or fallback snapshot was acquired. */
 	readonly transaction: readonly []
-	/** A transaction scope completed successfully (no rollback). */
+	/** Signals that a transaction scope completed successfully (no rollback). */
 	readonly commit: readonly []
-	/** A transaction scope failed and rollback completed — the exact propagated scope error. */
+	/** Signals that a transaction scope failed and rollback completed — the exact propagated scope error. */
 	readonly rollback: readonly [error: unknown]
-	/** A {@link Migration} plan was applied via `migrate` — the applied plan. */
+	/** Signals that a {@link Migration} plan was applied via `migrate` — the applied plan. */
 	readonly migrate: readonly [migration: Migration]
 }
 
 /**
- * The push observation surface of a {@link TableInterface} (AGENTS §13) — the per-row
+ * Describes the push observation surface of a {@link TableInterface} — the per-row
  * mutation moments a fire-and-forget observer (cache invalidation, sync, an audit log)
  * subscribes to, ALONGSIDE the database-level {@link DatabaseEventMap}.
  *
@@ -211,26 +227,26 @@ export type DatabaseEventMap = {
  * value re-reads it by key. Any row put — `set`, `add`, or `update` — emits a single
  * `write` (the consumer re-reads if it needs to know what changed); a delete emits
  * `remove`; emptying the table emits `clear`. Reads / queries / counts are NOT emitted
- * (too hot, and a reader does not mutate). Listener isolation is the emitter's (AGENTS §13):
+ * (too hot, and a reader does not mutate). Listener isolation is the emitter's:
  * every event is emitted directly and a listener throw is routed to the emitter's `error`
  * handler (the `error` option), never onto this map, and sits AFTER the driver write / delete
  * / clear has completed — so a throwing observer can never corrupt a write or perturb a
- * transaction. Subscribe via `table.emitter.on(...)`. Declared as a `type` alias (§4.5 —
+ * transaction. Subscribe via `table.emitter.on(...)`. Declared as a `type` alias (
  * `EventMap` is a `type` kind).
  */
 export type TableEventMap = {
-	/** A row was written (set / added / updated) — the affected key (no value payload). */
+	/** Signals that a row was written (set / added / updated) — the affected key (no value payload). */
 	readonly write: readonly [key: Key]
-	/** A row was removed — the affected key. */
+	/** Signals that a row was removed — the affected key. */
 	readonly remove: readonly [key: Key]
-	/** The table was cleared (every row removed). */
+	/** Signals that the table was cleared (every row removed). */
 	readonly clear: readonly []
 }
 
 // === Driver contract
 
 /**
- * A portable storage type for a column — the backend maps it to its native type
+ * Names a portable storage type for a column — the backend maps it to its native type
  * (SQLite affinity, an IndexedDB value). Derived from a column's `ContractShape`
  * by `shapeToColumnStorage`; `json` covers object/array/union/raw values a backend stores
  * as JSON text and can `json_extract` for nested-field queries.
@@ -238,7 +254,7 @@ export type TableEventMap = {
 export type ColumnStorage = 'text' | 'integer' | 'real' | 'boolean' | 'json' | 'blob'
 
 /**
- * One column of a {@link TableSchema} — its name, portable {@link ColumnStorage}, and
+ * Represents one column of a {@link TableSchema} — its name, portable {@link ColumnStorage}, and
  * whether it independently accepts absence (`optional`) and explicit `null`
  * (`nullable`).
  */
@@ -250,7 +266,7 @@ export interface ColumnSchema {
 }
 
 /**
- * Persisted schema metadata a versioning driver owns as an immutable snapshot.
+ * Represents persisted schema metadata a versioning driver owns as an immutable snapshot.
  *
  * @remarks
  * A driver snapshots metadata when it enters through `stamp` or a
@@ -266,7 +282,7 @@ export interface DriverMetadata {
 }
 
 /**
- * A backend-agnostic description of one table — what `open` hands each driver so a
+ * Represents a backend-agnostic description of one table — what `open` hands each driver so a
  * native backend can create real tables and indexes.
  *
  * @remarks
@@ -283,11 +299,11 @@ export interface TableSchema {
 }
 
 /**
- * One step of a {@link Migration} plan — a single schema change applied to one
+ * Represents one step of a {@link Migration} plan — a single schema change applied to one
  * table.
  *
  * @remarks
- * `operation` names the axis it splits on (AGENTS §4.4): adding / removing a
+ * `operation` names the axis it splits on: adding / removing a
  * whole table, a column, or an index. A driver's optional `migrate` applies each
  * step natively; a step referencing an unknown table throws `DatabaseError`
  * `MIGRATION`.
@@ -305,7 +321,7 @@ export type MigrationStep =
 	  }
 
 /**
- * A schema migration plan — an ordered set of {@link MigrationStep}s moving a
+ * Represents a schema migration plan — an ordered set of {@link MigrationStep}s moving a
  * database from one schema version to another.
  *
  * @remarks
@@ -320,7 +336,7 @@ export interface Migration {
 }
 
 /**
- * One atomic migration request.
+ * Represents one atomic migration request.
  *
  * @remarks
  * `plan` carries the schema changes. `metadata`, when present, is the snapshot that
@@ -333,7 +349,7 @@ export interface MigrationInput {
 }
 
 /**
- * The storage operations available only inside a driver's transaction scope.
+ * Declares the storage operations available only inside a driver's transaction scope.
  *
  * @remarks
  * A driver owns acquisition, commit or rollback, release, and lifetime. This
@@ -364,25 +380,24 @@ export interface StorageInterface {
 }
 
 /**
- * The storage primitive every backend implements — the whole of the bridge.
+ * Declares the storage primitive every backend implements — the whole of the bridge.
  *
  * @remarks
  * The REQUIRED surface is deliberately minimal: keyed read / write / atomic
- * insert / delete, an ordered `scan`, a key listing, and a `snapshot` that backs
- * transactions — the irreducible primitive. There is **no** required query,
- * count, or aggregate
- * here: all of that is one query engine in the core (`helpers.ts`) running over
- * `scan`, so a new backend implements a handful of tiny methods rather than
- * re-deriving WHERE compilation. `open` now receives a derived
- * {@link TableSchema}`[]` (columns, types, primary, indexes) so a native backend
- * can build real tables and indexes; a scan-only backend reads only `name`. The
- * optional `records?` / `aggregate?` are native overrides the engine
- * falls back from (AGENTS §21). The API is async (Promises) because IndexedDB is; synchronous
- * backends resolve immediately. Lookups that may miss return `undefined` /
- * `false` rather than throwing (AGENTS §12). Metadata has the same ownership
+ * insert / delete, an ordered `scan`, a key listing, and a `snapshot` that
+ * backs transactions — the irreducible primitive. There is **no** required
+ * query, count, or aggregate here: all of that is one query engine in the core
+ * (`helpers.ts`) running over `scan`, so a new backend implements a handful of
+ * tiny methods rather than re-deriving WHERE compilation. `open` receives a
+ * derived {@link TableSchema}`[]` (columns, types, primary, indexes) so a
+ * native backend can build real tables and indexes; a scan-only backend reads
+ * only `name`. The optional `records?` / `aggregate?` are native overrides the
+ * engine falls back from. The API is async (Promises) because IndexedDB is;
+ * synchronous backends resolve immediately. Lookups that may miss return
+ * `undefined` / `false` rather than throwing. Metadata has the same ownership
  * boundary across every implementation: `stamp` and `migrate` snapshot
- * {@link DriverMetadata} at entry, while `metadata` returns a distinct deeply frozen
- * snapshot. A durable driver returns `undefined` only when it proves the
+ * {@link DriverMetadata} at entry, while `metadata` returns a distinct deeply
+ * frozen snapshot. A durable driver returns `undefined` only when it proves the
  * metadata record or durable store is absent. Existing unreadable or malformed
  * durable state fails `open` / `metadata` closed; it is never treated as fresh,
  * rewritten, or repaired automatically.
@@ -391,7 +406,7 @@ export interface DriverInterface extends StorageInterface {
 	open(schema: readonly TableSchema[]): Promise<void>
 	close(): Promise<void>
 	/**
-	 * Capture table rows and return a repeatable thunk that restores those rows —
+	 * Captures table rows and returns a repeatable thunk that restores those rows —
 	 * the primitive transactions are built on.
 	 *
 	 * @remarks
@@ -402,8 +417,8 @@ export interface DriverInterface extends StorageInterface {
 	 */
 	snapshot(tables?: readonly string[]): Promise<() => Promise<void>>
 	/**
-	 * Optional native transaction scope. The driver owns acquisition, commit or
-	 * rollback, release, and invalidation of the scoped capability.
+	 * Opens a native transaction scope — an optional driver hook. The driver owns acquisition,
+	 * commit or rollback, release, and invalidation of the scoped capability.
 	 */
 	transaction?<R>(scope: (storage: StorageInterface) => Promise<R>): Promise<R>
 }
@@ -411,7 +426,7 @@ export interface DriverInterface extends StorageInterface {
 // === Database
 
 /**
- * One table's columns — a map of column name to its value {@link ContractShape}.
+ * Represents one table's columns — a map of column name to its value {@link ContractShape}.
  *
  * @remarks
  * This is exactly the property map an `objectShape` takes. A table row is always
@@ -423,7 +438,7 @@ export interface DriverInterface extends StorageInterface {
 export type ColumnMap = Readonly<Record<string, ContractShape>>
 
 /**
- * A database's table schema — a map of table name to its {@link ColumnMap}.
+ * Represents a database's table schema — a map of table name to its {@link ColumnMap}.
  *
  * @remarks
  * Each table's row type is `Infer` of its columns (see {@link RowOf}); primary-key
@@ -432,7 +447,7 @@ export type ColumnMap = Readonly<Record<string, ContractShape>>
 export type TableMap = Readonly<Record<string, ColumnMap>>
 
 /**
- * The row type a table's {@link ColumnMap} describe — `Infer` of the `objectShape`
+ * Represents the row type a table's {@link ColumnMap} describe — `Infer` of the `objectShape`
  * the database wraps them in.
  *
  * @remarks
@@ -451,7 +466,7 @@ export type RowOf<C extends ColumnMap> = Infer<{
 }>
 
 /**
- * Per-table primary-key column overrides — `{ [table]: column }`.
+ * Holds per-table primary-key column overrides — `{ [table]: column }`.
  *
  * @remarks
  * A table absent from this map keys its rows by {@link DEFAULT_PRIMARY} (`id`).
@@ -460,7 +475,7 @@ export type RowOf<C extends ColumnMap> = Infer<{
 export type PrimaryMap = Readonly<Record<string, string>>
 
 /**
- * Per-table secondary indexes — `{ [table]: groups }`, each group one
+ * Holds per-table secondary indexes — `{ [table]: groups }`, each group one
  * (possibly compound) index of column names.
  *
  * @remarks
@@ -478,8 +493,8 @@ export type IndexMap = Readonly<Record<string, ReadonlyArray<readonly string[]>>
  * `primary` overrides the primary-key column per table ({@link DEFAULT_PRIMARY}
  * otherwise); `indexes` declares secondary indexes per table (contracts don't
  * express them) that flow into each derived {@link TableSchema}; `name` labels
- * the database; `on` wires initial {@link DatabaseEventMap} listeners (§8); `error`
- * is the emitter's listener-error handler (§13 — a listener throw routes here);
+ * the database; `on` wires initial {@link DatabaseEventMap} listeners; `error`
+ * is the emitter's listener-error handler (a listener throw routes here);
  * `generator` is the authoritative key-generation override a table uses when a
  * written row's primary is exactly `undefined`. When omitted, the table uses
  * global `crypto.randomUUID()`; numeric primary keys require a custom generator.
@@ -487,7 +502,7 @@ export type IndexMap = Readonly<Record<string, ReadonlyArray<readonly string[]>>
 export interface DatabaseOptions<T extends TableMap = TableMap> {
 	readonly on?: EmitterHooks<DatabaseEventMap>
 	/**
-	 * The listener-error handler shared by the database and every table emitter.
+	 * Holds the listener-error handler shared by the database and every table emitter.
 	 *
 	 * @remarks
 	 * Listener throws from root, imported, and transaction-scoped handles route
@@ -501,29 +516,29 @@ export interface DatabaseOptions<T extends TableMap = TableMap> {
 	readonly indexes?: IndexMap
 	readonly name?: string
 	/**
-	 * The authoritative key-generation override for a keyless write.
+	 * Holds the authoritative key-generation override for a keyless write.
 	 *
 	 * @remarks
 	 * Omit it to use global `crypto.randomUUID()`. A numeric primary requires a
 	 * custom generator. Explicit primary values never invoke this function. A
-	 * custom generator throw is `VALIDATION`; a host
-	 * `crypto.randomUUID()` failure is `DRIVER`. An invalid returned key is
-	 * `VALIDATION`; neither branch falls back or retries.
+	 * custom generator throw is `VALIDATION`; a host `crypto.randomUUID()` failure
+	 * is `DRIVER`. An invalid returned key is `VALIDATION`; neither branch falls
+	 * back or retries.
 	 */
 	readonly generator?: KeyFunction
 	/**
-	 * The declared schema version.
+	 * Holds the declared schema version.
 	 *
 	 * @remarks
 	 * Only meaningful when the driver implements BOTH {@link DriverInterface.metadata}
 	 * and {@link DriverInterface.stamp} (a versioning driver); unset, or a
 	 * non-versioning driver, leaves `open()` unchanged from today's behavior.
-	 * When set and the driver versions, `open()` reconciles against the
-	 * driver's persisted {@link DriverMetadata}:
+	 * When set and the driver versions, `open()` reconciles against the driver's
+	 * persisted {@link DriverMetadata}:
 	 * - **Fresh store** (`metadata()` returns `undefined` after the durable
 	 *   driver proves absence) — no migration is possible (there is nothing
-	 *   deployed to diff against), so `open()` simply `stamp`s
-	 *   `{ version, schema }` for next time.
+	 *   deployed to diff against), so `open()` stamps `{ version, schema }` for
+	 *   next time.
 	 * - **Stored version < `version`** — `planMigration(stored.schema, declared
 	 *   schema)` computes the upgrade plan, applied via the driver's optional
 	 *   `migrate` hook. If `migrate` is absent and the plan is non-empty,
@@ -544,7 +559,7 @@ export interface DatabaseOptions<T extends TableMap = TableMap> {
 }
 
 /**
- * One table's portable definition, produced by `export` — the unit of schema /
+ * Represents one table's portable definition, produced by `export` — the unit of schema /
  * migration exchange across environments.
  *
  * @remarks
@@ -559,7 +574,7 @@ export interface TableDefinition {
 }
 
 /**
- * A database view valid only inside one {@link DatabaseInterface.transaction}
+ * Represents a database view valid only inside one {@link DatabaseInterface.transaction}
  * scope.
  *
  * @remarks
@@ -573,7 +588,7 @@ export interface DatabaseStorageInterface<T extends TableMap = TableMap> {
 }
 
 /**
- * A database — the ergonomic entry point that owns the driver and its tables.
+ * Represents a database — the ergonomic entry point that owns the driver and its tables.
  *
  * @remarks
  * A database is a typed view over a set of tables on one driver. Tables are
@@ -601,9 +616,9 @@ export interface DatabaseInterface<T extends TableMap = TableMap> {
 		options?: OperationOptions,
 	): Promise<R>
 	/**
-	 * Diff a caller-supplied deployed schema against this database's declared
-	 * schema (its `tables`, as configured) via `planMigration`, apply the
-	 * resulting plan through the driver's optional `migrate` hook, and return
+	 * Diffs a caller-supplied deployed schema against this database's declared
+	 * schema (its `tables`, as configured) via `planMigration`, applies the
+	 * resulting plan through the driver's optional `migrate` hook, and returns
 	 * the applied plan.
 	 *
 	 * @param deployed - The schema currently deployed, as {@link TableSchema}s
@@ -633,7 +648,7 @@ export interface DatabaseInterface<T extends TableMap = TableMap> {
 // === Table
 
 /**
- * A table — typed keyed CRUD plus fluent query and cursor access.
+ * Exposes typed keyed CRUD plus fluent query and cursor access.
  *
  * @remarks
  * Writes are coerced through the table's contract: a string input to a numeric
@@ -643,7 +658,7 @@ export interface DatabaseInterface<T extends TableMap = TableMap> {
  * inserts and throws `CONFLICT` on a duplicate key. `contract` exposes the
  * compiled contract for introspection (`schema`) and fixtures (`generate`).
  *
- * The keyed methods batch by overload (AGENTS §9.2): pass one key/row for one
+ * The keyed methods batch by overload: pass one key/row for one
  * result, or an array for an array of results in the same order — a single verb,
  * never `getMany` / `setAll`. Batches run as independent sequential operations;
  * wrap them in `transaction` for atomicity.
@@ -662,7 +677,7 @@ export interface TableInterface<T = Row> {
 	keys(): Promise<readonly Key[]>
 	records(input?: QueryInput, options?: OperationOptions): Promise<readonly T[]>
 	/**
-	 * Count contract-valid rows matching `input`'s conditions.
+	 * Counts contract-valid rows matching `input`'s conditions.
 	 *
 	 * @remarks
 	 * Paging is ignored. Like `records()` / `scan()`, `count()` narrows every
@@ -671,7 +686,7 @@ export interface TableInterface<T = Row> {
 	 */
 	count(input?: QueryInput, options?: OperationOptions): Promise<number>
 	/**
-	 * Compute an aggregate over `column` across rows matching `input`'s
+	 * Computes an aggregate over `column` across rows matching `input`'s
 	 * conditions.
 	 *
 	 * @remarks
@@ -688,7 +703,7 @@ export interface TableInterface<T = Row> {
 		options?: OperationOptions,
 	): Promise<number | undefined>
 	/**
-	 * Lazy filtered iteration over the table's rows.
+	 * Iterates the table's rows lazily with filtering.
 	 *
 	 * @remarks
 	 * `input`'s `conditions` / `offset` / `limit` are honored lazily as rows
@@ -699,7 +714,7 @@ export interface TableInterface<T = Row> {
 	 */
 	scan(input?: QueryInput, options?: OperationOptions): AsyncIterable<T>
 	/**
-	 * Upsert one or more rows.
+	 * Upserts one or more rows.
 	 *
 	 * @param row - The row to upsert
 	 * @param options - Optional abort signal
@@ -707,7 +722,7 @@ export interface TableInterface<T = Row> {
 	 */
 	set(row: T, options?: OperationOptions): Promise<Key>
 	/**
-	 * Upsert one or more rows.
+	 * Upserts one or more rows.
 	 *
 	 * @param rows - The rows to upsert
 	 * @param options - Optional abort signal, checked at entry and between items
@@ -720,7 +735,7 @@ export interface TableInterface<T = Row> {
 	 */
 	set(rows: readonly T[], options?: OperationOptions): Promise<readonly Key[]>
 	/**
-	 * Insert one or more rows, throwing `CONFLICT` on a duplicate key.
+	 * Inserts one or more rows, throwing `CONFLICT` on a duplicate key.
 	 *
 	 * @param row - The row to insert
 	 * @param options - Optional abort signal
@@ -728,7 +743,7 @@ export interface TableInterface<T = Row> {
 	 */
 	add(row: T, options?: OperationOptions): Promise<Key>
 	/**
-	 * Insert one or more rows, throwing `CONFLICT` on a duplicate key.
+	 * Inserts one or more rows, throwing `CONFLICT` on a duplicate key.
 	 *
 	 * @param rows - The rows to insert
 	 * @param options - Optional abort signal, checked at entry and between items
@@ -741,16 +756,16 @@ export interface TableInterface<T = Row> {
 	 */
 	add(rows: readonly T[], options?: OperationOptions): Promise<readonly Key[]>
 	/**
-	 * Apply a partial change to one or more rows.
+	 * Applies a partial change to one or more rows.
 	 *
 	 * @param key - The key of the row to update
 	 * @param changes - The partial changes to apply
 	 * @param options - Optional abort signal
-	 * @returns `true` when the row existed and was updated
+	 * @returns True if the row existed and was updated; false otherwise
 	 */
 	update(key: Key, changes: Partial<T>, options?: OperationOptions): Promise<boolean>
 	/**
-	 * Apply a partial change to one or more rows.
+	 * Applies a partial change to one or more rows.
 	 *
 	 * @param keys - The keys of the rows to update
 	 * @param changes - The partial changes to apply to each row
@@ -768,15 +783,15 @@ export interface TableInterface<T = Row> {
 		options?: OperationOptions,
 	): Promise<readonly boolean[]>
 	/**
-	 * Delete one or more rows.
+	 * Deletes one or more rows.
 	 *
 	 * @param key - The key of the row to remove
 	 * @param options - Optional abort signal
-	 * @returns `true` when the row existed and was removed
+	 * @returns True if the row existed and was removed; false otherwise
 	 */
 	remove(key: Key, options?: OperationOptions): Promise<boolean>
 	/**
-	 * Delete one or more rows.
+	 * Deletes one or more rows.
 	 *
 	 * @param keys - The keys of the rows to remove
 	 * @param options - Optional abort signal, checked at entry and between items
@@ -796,16 +811,15 @@ export interface TableInterface<T = Row> {
 // === Query
 
 /**
- * A fluent query builder.
+ * Builds a read through a fluent chain.
  *
  * @remarks
  * `condition` appends one portable condition and `order` appends one portable
  * ordering term. `filter` adds a post-fetch JavaScript predicate (applied after
  * the backend read, before paging). The terminals (`collect` / `find` / `count`
- * / `aggregate`) execute against the table; each
- * call mutates and returns the same builder, so a chain reads as one statement.
- * Every `column` is a {@link FieldPath} — a string is one column, an array
- * descends a nested value.
+ * / `aggregate`) execute against the table; each call mutates and returns the
+ * same builder, so a chain reads as one statement. Every `column` is a
+ * {@link FieldPath} — a string is one column, an array descends a nested value.
  */
 export interface QueryInterface<T = Row> {
 	condition(input: Condition): QueryInterface<T>
@@ -817,8 +831,8 @@ export interface QueryInterface<T = Row> {
 	find(): Promise<T | undefined>
 	count(): Promise<number>
 	/**
-	 * Lazy per-row evaluation of this query's conditions / filters / offset /
-	 * limit.
+	 * Evaluates this query's conditions / filters / offset / limit lazily, row
+	 * by row.
 	 *
 	 * @remarks
 	 * `order` and its comparators are IGNORED (streaming yields unsorted, as
@@ -833,7 +847,7 @@ export interface QueryInterface<T = Row> {
 // === Cursor
 
 /**
- * A forward row cursor for bulk in-place mutation.
+ * Walks a table's rows forward for bulk in-place mutation.
  *
  * @remarks
  * Iterates a snapshot of the table's keys taken at creation; `update` and
diff --git a/src/server/constants.ts b/src/server/constants.ts
index aca7d4b..0976838 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -4,7 +4,7 @@ import type { ColumnStorage } from '@src/core'
 // the declared column groups that SQLite can query without engine refinement.
 
 /**
- * The declared {@link ColumnStorage}s whose SQL EQUALITY comparisons (`equals` /
+ * Lists the declared {@link ColumnStorage}s whose SQL EQUALITY comparisons (`equals` /
  * `not` / `any` / `none`) and `starts` / `ends` compiles are provably
  * engine-exact under declared-type trust — `text` / `integer` / `real` /
  * `boolean`; a `json` or `blob` column always refines instead.
@@ -30,7 +30,7 @@ export const EXACT_COLUMN_STORAGE: readonly ColumnStorage[] = Object.freeze([
 ])
 
 /**
- * The declared {@link ColumnStorage}s whose SQL RANGE comparisons
+ * Lists the declared {@link ColumnStorage}s whose SQL RANGE comparisons
  * (`above` / `below` / `from` / `to` / `between`) and `ORDER BY` compiles are
  * provably engine-exact — `integer` / `real` / `boolean` only. `text` is
  * excluded: see {@link EXACT_COLUMN_STORAGE}'s remarks for the BINARY-collation
@@ -44,7 +44,7 @@ export const EXACT_RANGE_COLUMN_STORAGE: readonly ColumnStorage[] = Object.freez
 ])
 
 /**
- * The reserved metadata table the {@link SQLiteDriver} creates on `open` to
+ * Names the reserved metadata table the {@link SQLiteDriver} creates on `open` to
  * persist its stamped `DriverMetadata` (`version` + declared schema JSON) — the
  * SQLite realization of the `metadata` / `stamp` driver hooks.
  *
diff --git a/src/server/index.ts b/src/server/index.ts
index 81d3b12..abf96e5 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -3,5 +3,6 @@ export * from './compilers.js'
 export * from './constants.js'
 export * from './factories.js'
 export * from './helpers.js'
+export * from './inferers.js'
 export * from './drivers/JSONDriver.js'
 export * from './drivers/SQLiteDriver.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index 4bdc810..a8c4ff1 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -3,10 +3,10 @@ import type { SQLiteValue } from '@orkestrel/sqlite'
 // The server surface's type domain — the compiled-SQL contract shared between
 // the pure `compilers.ts` (`QueryInput` → SQL) and `SQLiteDriver`. SQL is a
 // Node-backend concept, so it lives here rather than in `core`; core stays
-// host-independent and never speaks SQL (AGENTS §1, §5).
+// host-independent and never speaks SQL.
 
 /**
- * A parameterized SQL fragment or statement plus its bind values.
+ * Represents a parameterized SQL fragment or statement plus its bind values.
  *
  * @remarks
  * Produced by the pure SQL compilers (`compilers.ts`) that turn a core
@@ -30,11 +30,11 @@ export interface CompiledSQL {
  * {@link DatabaseError}); `timeout` is the busy-timeout in milliseconds before
  * a locked database fails `BUSY`; `references` enables or disables foreign-key
  * constraint enforcement, while omission retains the upstream default.
- * `pragmas` is an ordered record of PRAGMA name to
- * value, applied via the wrapper's `pragma()` right after `connect()`, in
- * insertion order (e.g. `{ journal_mode: 'WAL' }`). Core rows are
- * number-typed — this driver never surfaces a `bigint`, so a stored integer
- * beyond `Number.MAX_SAFE_INTEGER` reads back imprecisely (the wrapper's own
+ * `pragmas` is an ordered record of PRAGMA name to value, applied via the
+ * wrapper's `pragma()` right after `connect()`, in insertion order (for
+ * example `{ journal_mode: 'WAL' }`). Core rows are number-typed — this driver
+ * never surfaces a `bigint`, so a stored integer beyond
+ * `Number.MAX_SAFE_INTEGER` reads back imprecisely (the wrapper's own
  * `bigints` option is not exposed here).
  */
 export interface SQLiteDriverOptions {
```
