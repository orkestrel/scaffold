# Last changes: indexeddb

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `7783d6d`, merge base with `origin/main` `78cac21`, layer L1, declared version 0.0.9, registry version 0.0.9.

## Commits since origin/main

```text
e3270fa 2026-08-28 Update every dependency to the published latest
3397a65 2026-08-28 Adopt the catalog and guide mirrors for the wave
0b801bf 2026-09-01 Apply the verified src-audit fixes
5f40f60 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
80ee848 2026-09-01 Adopt the renamed guide helpers in the parity test
0e5cf50 2026-09-02 Apply the breaking rows in indexeddb
bf4730e 2026-09-02 Close the indexeddb audit's shape findings
10ebdb4 2026-09-02 Point the README at the guide the package ships
7783d6d 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                         |  17 ++--
 README.md                                           |   2 +-
 package.json                                        |   6 +-
 src/browser/IndexedDBCursor.ts                      |  20 ++---
 src/browser/IndexedDBDatabase.ts                    |  36 +++++----
 src/browser/IndexedDBIndex.ts                       |  19 ++---
 src/browser/IndexedDBStore.ts                       | 162 ++++++++++++++-----------------------
 src/browser/IndexedDBTransaction.ts                 |  11 ++-
 src/browser/IndexedDBTransactionStore.ts            |  17 ++--
 src/browser/constants.ts                            |   2 +-
 src/browser/errors.ts                               |  11 +--
 src/browser/factories.ts                            |   2 +-
 src/browser/helpers.ts                              |  76 ++++++------------
 src/browser/types.ts                                | 263 ++++++++++++++++++++++++++++++++----------------------------
 tests/guides.test.ts                                |  22 ++---
 tests/src/browser/IndexedDBCursor.test.ts           |  41 +++++++---
 tests/src/browser/IndexedDBDatabase.test.ts         |  38 ++++-----
 tests/src/browser/IndexedDBIndex.test.ts            |   9 ++-
 tests/src/browser/IndexedDBStore.test.ts            |  14 ++--
 tests/src/browser/IndexedDBTransactionStore.test.ts |   2 +-
 tests/src/browser/helpers.test.ts                   |  29 -------
 21 files changed, 368 insertions(+), 431 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/browser/constants.ts b/src/browser/constants.ts
index b1e986b..331b19c 100644
--- a/src/browser/constants.ts
+++ b/src/browser/constants.ts
@@ -1,7 +1,7 @@
 import type { IndexedDBErrorCode } from './types.js'
 
 /**
- * Native `DOMException.name` → our {@link IndexedDBErrorCode}.
+ * Maps native `DOMException.name` → our {@link IndexedDBErrorCode}.
  *
  * @remarks
  * The mapping the request boundary's `wrapError` reads to translate a raw
diff --git a/src/browser/errors.ts b/src/browser/errors.ts
index f4be4d0..fe038f2 100644
--- a/src/browser/errors.ts
+++ b/src/browser/errors.ts
@@ -9,20 +9,21 @@
 import type { IndexedDBErrorCode } from './types.js'
 
 /**
- * An error thrown by the IndexedDB wrapper.
+ * Represents an error thrown by the IndexedDB wrapper.
  *
  * @remarks
  * Carries an {@link IndexedDBErrorCode} and the originating native error as the
  * standard `cause`. Construct it directly for wrapper-lifecycle faults; the
  * internal `wrapError` maps a native `DOMException` to the right code at the
- * request boundary. Narrow a caught value with `instanceof IndexedDBError`.
+ * request boundary. Narrow a caught value with {@link isIndexedDBError}, this
+ * package's own guard.
  *
  * @example
  * ```ts
  * try {
  * 	await store.add(row)
  * } catch (error) {
- * 	if (error instanceof IndexedDBError && error.code === 'CONSTRAINT') await store.set(row)
+ * 	if (isIndexedDBError(error) && error.code === 'CONSTRAINT') await store.set(row)
  * }
  * ```
  */
@@ -37,10 +38,10 @@ export class IndexedDBError extends Error {
 }
 
 /**
- * Whether a value is an {@link IndexedDBError}.
+ * Checks whether a value is an {@link IndexedDBError}.
  *
  * @param value - The value to test
- * @returns `true` when `value` is an `IndexedDBError`
+ * @returns True if `value` is an `IndexedDBError`; false otherwise
  */
 export function isIndexedDBError(value: unknown): value is IndexedDBError {
 	return value instanceof IndexedDBError
diff --git a/src/browser/types.ts b/src/browser/types.ts
index e55fe55..0e78aa8 100644
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -13,7 +13,7 @@
 // === Row
 
 /**
- * A record stored in, and read from, an object store.
+ * Represents a record stored in, and read from, an object store.
  *
  * @remarks
  * The value shape every store / index / transaction-store CRUD method reads and
@@ -25,7 +25,7 @@ export type Row = Record<string, unknown>
 // === Errors
 
 /**
- * A machine-readable {@link IndexedDBError} code.
+ * Represents a machine-readable {@link IndexedDBError} code.
  *
  * @remarks
  * Each maps from a native `DOMException.name` or a wrapper-lifecycle fault:
@@ -64,7 +64,7 @@ export type IndexedDBErrorCode =
 // === Schema
 
 /**
- * A key path — one field, or several for a compound key.
+ * Represents a key path — one field, or several for a compound key.
  *
  * @remarks
  * A single string addresses one field; an array addresses a compound key over
@@ -73,7 +73,7 @@ export type IndexedDBErrorCode =
 export type KeyPath = string | readonly string[]
 
 /**
- * A secondary index on a store.
+ * Represents a secondary index on a store.
  *
  * @remarks
  * `name` identifies the index for `store.index(name)`; `path` is the field(s) it
@@ -88,7 +88,7 @@ export interface IndexDefinition {
 }
 
 /**
- * A store's schema.
+ * Represents a store's schema.
  *
  * @remarks
  * `path` is the in-line key path (omit it for an **out-of-line** store, where the
@@ -102,71 +102,84 @@ export interface StoreDefinition {
 	readonly indexes?: readonly IndexDefinition[]
 }
 
-/** A database's stores — a map of store name to its {@link StoreDefinition}. */
+/** Represents a database's stores — a map of store name to its {@link StoreDefinition}. */
 export type StoresShape = Readonly<Record<string, StoreDefinition>>
 
 /**
- * The escape hatch into a version-change upgrade, passed to
+ * Represents the store manager of a version-change upgrade.
+ *
+ * @remarks
+ * Reached as `context.stores` on {@link IndexedDBUpgradeContext}. `names` lists
+ * the stores the database holds at that moment, so it already reflects any store
+ * the built-in create-missing pass just created. `create` / `drop` add or remove
+ * a whole store; `open` reaches a transaction-bound store for data migration.
+ * Versionchange-only: every call must stay within the upgrade transaction — no
+ * non-IDB `await`, or it auto-commits and the upgrade fails.
+ *
+ * @example
+ * ```ts
+ * upgrade: async (context) => {
+ * 	context.stores.create('meta', { path: 'key' })
+ * 	context.stores.drop('legacy')
+ * 	await context.stores.open('users').set({ id: 'u1', migrated: true })
+ * }
+ * ```
+ */
+export interface IndexedDBUpgradeStoreManagerInterface {
+	readonly names: readonly string[]
+	create(name: string, definition: StoreDefinition): void
+	drop(name: string): void
+	open(name: string): IndexedDBTransactionStoreInterface
+}
+
+/**
+ * Represents the secondary-index manager of a version-change upgrade.
+ *
+ * @remarks
+ * Reached as `context.indexes` on {@link IndexedDBUpgradeContext}. `create` adds
+ * a secondary index to a store — mirroring the index translation the built-in
+ * schema pass applies to a store's declared `indexes` — and `drop` removes one
+ * by name. Versionchange-only, and the named store must already exist within the
+ * current upgrade transaction: declared in the schema, created earlier in the
+ * same upgrade, or already present from a prior version.
+ *
+ * @example
+ * ```ts
+ * upgrade(context) {
+ * 	context.indexes.create('books', { name: 'byAuthor', path: 'author' })
+ * 	context.indexes.drop('books', 'byTitle')
+ * }
+ * ```
+ */
+export interface IndexedDBUpgradeIndexManagerInterface {
+	create(store: string, definition: IndexDefinition): void
+	drop(store: string, name: string): void
+}
+
+/**
+ * Represents the escape hatch into a version-change upgrade, passed to
  * `IndexedDBDatabaseOptions.upgrade`.
  *
  * @remarks
  * Runs INSIDE `onupgradeneeded`, after the built-in create-missing-stores pass —
- * so `stores` already reflects any store just created from the declared schema.
- * `transaction` is the raw versionchange `IDBTransaction`, the escape hatch for
- * anything the raw API offers that this wrapper does not model directly; `old` /
+ * so `stores.names` already reflects any store just created from the declared
+ * schema. `transaction` is the raw versionchange `IDBTransaction`, the escape hatch
+ * for anything the raw API offers that this wrapper does not model directly; `old` /
  * `version` are the prior and target database versions (`old` is `0` on first
- * create); `create` / `drop` add or remove a whole store; `index` / `deindex` add
- * or remove a secondary index on a store; `store` reaches a transaction-bound
- * store for data migration. Everything invoked here must stay within the
- * versionchange transaction — no non-IDB `await`, or it auto-commits and the
- * upgrade fails.
+ * create); `stores` manages whole stores and `indexes` manages secondary indexes.
+ * Everything invoked here must stay within the versionchange transaction — no
+ * non-IDB `await`, or it auto-commits and the upgrade fails.
  */
 export interface IndexedDBUpgradeContext {
 	readonly transaction: IDBTransaction
 	readonly old: number
 	readonly version: number
-	readonly stores: readonly string[]
-	create(name: string, definition: StoreDefinition): void
-	drop(name: string): void
-	store(name: string): IndexedDBTransactionStoreInterface
-	/**
-	 * Create a secondary index on `store`.
-	 *
-	 * @param store - Name of an existing store, or one just created in this same upgrade via `create`.
-	 * @param definition - The index to add — {@link IndexDefinition}.
-	 * @remarks
-	 * Versionchange-only: `store` must already exist within the current upgrade
-	 * transaction (either declared in the schema, created earlier in the same
-	 * upgrade, or already present from a prior version). Mirrors the index
-	 * translation the built-in schema pass applies to a store's declared
-	 * `indexes`.
-	 * @example
-	 * ```ts
-	 * upgrade(context) {
-	 *   context.index('books', { name: 'byAuthor', path: 'author' })
-	 * }
-	 * ```
-	 */
-	index(store: string, definition: IndexDefinition): void
-	/**
-	 * Remove a named index from `store`.
-	 *
-	 * @param store - Name of an existing store within the current upgrade transaction.
-	 * @param name - The index name to remove.
-	 * @remarks
-	 * Versionchange-only, same constraint as `index`.
-	 * @example
-	 * ```ts
-	 * upgrade(context) {
-	 *   context.deindex('books', 'byAuthor')
-	 * }
-	 * ```
-	 */
-	deindex(store: string, name: string): void
+	readonly stores: IndexedDBUpgradeStoreManagerInterface
+	readonly indexes: IndexedDBUpgradeIndexManagerInterface
 }
 
 /**
- * Options for `createIndexedDBDatabase`.
+ * Represents the options for `createIndexedDBDatabase`.
  *
  * @remarks
  * `name` is passed to `indexedDB.open`. `version` is optional: give it to pin an
@@ -175,10 +188,11 @@ export interface IndexedDBUpgradeContext {
  * database opens at its current version and bumps once to create any declared store
  * the stored schema is missing — so adding a store never needs a manual version
  * bump. `upgrade` runs after the built-in create-missing-stores pass, inside the
- * same versionchange transaction — use it to drop a store, add or remove an index
- * on any store with `context.index` / `context.deindex`, or migrate data with
- * `context.store(name)`. It may return `void` or a `Promise<void>` — an async
- * `upgrade` may `await` the IDB requests it issues through `context.store(...)`
+ * same versionchange transaction — use it to drop a store with
+ * `context.stores.drop`, add or remove an index on any store with
+ * `context.indexes.create` / `context.indexes.drop`, or migrate data with
+ * `context.stores.open(name)`. It may return `void` or a `Promise<void>` — an async
+ * `upgrade` may `await` the IDB requests it issues through `context.stores.open(...)`
  * (see the auto-commit rule on {@link IndexedDBUpgradeContext}). The built-in
  * pass and custom callback share one failure boundary: a synchronous failure in
  * either phase, or a custom rejection captured while the versionchange
@@ -200,36 +214,40 @@ export interface IndexedDBDatabaseOptions<Stores extends StoresShape = StoresSha
 }
 
 /**
- * Options for opening a cursor.
+ * Represents the options for opening a cursor.
  *
  * @remarks
- * `query` restricts iteration to a key range (or a single key); `direction` sets
- * the traversal order (`next` / `prev` / their `unique` variants).
+ * `query` restricts iteration to a key range (or a single key), and omitting it
+ * iterates every record; `direction` sets the traversal order (`next` / `prev` /
+ * their `unique` variants).
  */
 export interface CursorOptions {
-	readonly query?: IDBKeyRange | IDBValidKey | null
+	readonly query?: IDBKeyRange | IDBValidKey
 	readonly direction?: IDBCursorDirection
 }
 
 // === Cursor
 
 /**
- * A promisified value cursor for streaming and in-place mutation.
+ * Represents a promisified value cursor for streaming and in-place mutation.
  *
  * @remarks
  * Wraps `IDBCursorWithValue`. `key` / `primary` / `value` snapshot the current
  * position (IndexedDB reuses the live cursor object on advance, so they are read
- * eagerly). `continue` / `seek` / `advance` resolve to the next cursor or `null`
- * at the end; `update` / `delete` mutate the record at the current position. The
- * owning transaction stays alive only while you drive the cursor promptly — do no
- * unrelated `await` between steps, or it auto-commits.
+ * eagerly). `value` is the record at that position narrowed with `isRecord`, and
+ * `undefined` when the stored value is not a record — the same absence
+ * `readRecord` reports for that boundary. `continue` / `seek` / `advance` resolve
+ * to the next cursor or `null` at the end; `update` / `delete` mutate the record
+ * at the current position. The owning transaction stays alive only while you
+ * drive the cursor promptly — do no unrelated `await` between steps, or it
+ * auto-commits.
  */
 export interface IndexedDBCursorInterface {
 	readonly cursor: IDBCursorWithValue
 	readonly source: IDBObjectStore | IDBIndex
 	readonly key: IDBValidKey
 	readonly primary: IDBValidKey
-	readonly value: Row
+	readonly value: Row | undefined
 	readonly direction: IDBCursorDirection
 	continue(key?: IDBValidKey): Promise<IndexedDBCursorInterface | null>
 	seek(key: IDBValidKey, primary: IDBValidKey): Promise<IndexedDBCursorInterface | null>
@@ -241,7 +259,7 @@ export interface IndexedDBCursorInterface {
 // === Index
 
 /**
- * A secondary index — read access by an indexed key path.
+ * Represents a secondary index — read access by an indexed key path.
  *
  * @remarks
  * Indexes are read-only views over a store. `get` / `resolve` fetch the first
@@ -260,45 +278,43 @@ export interface IndexedDBIndexInterface {
 	get(key: IDBValidKey): Promise<Row | undefined>
 	resolve(keys: readonly IDBValidKey[]): Promise<readonly Row[]>
 	resolve(key: IDBValidKey): Promise<Row>
-	records(query?: IDBKeyRange | IDBValidKey | null, count?: number): Promise<readonly Row[]>
-	keys(query?: IDBKeyRange | IDBValidKey | null, count?: number): Promise<readonly IDBValidKey[]>
+	records(query?: IDBKeyRange | IDBValidKey, count?: number): Promise<readonly Row[]>
+	keys(query?: IDBKeyRange | IDBValidKey, count?: number): Promise<readonly IDBValidKey[]>
 	primary(key: IDBValidKey): Promise<IDBValidKey | undefined>
 	has(keys: readonly IDBValidKey[]): Promise<readonly boolean[]>
 	has(key: IDBValidKey): Promise<boolean>
-	count(query?: IDBKeyRange | IDBValidKey | null): Promise<number>
+	count(query?: IDBKeyRange | IDBValidKey): Promise<number>
 	cursor(options?: CursorOptions): Promise<IndexedDBCursorInterface | null>
 }
 
-// === Store
+// === Record store
 
 /**
- * An object store — the full keyed CRUD surface, plus index, count, and cursor
- * access.
+ * Represents the keyed record surface of an object store, in or out of an explicit
+ * transaction.
  *
  * @remarks
- * Each call runs in its own implicit transaction; for atomic multi-operation work
- * use the database's `read` / `write`. `get` / `resolve` read by key (`resolve`
- * throws `NOT_FOUND`); `records` / `keys` read many over an optional key range;
- * `set` upserts and `add` inserts (throwing `CONSTRAINT` on a duplicate);
- * `remove` deletes; `clear` empties the store. The keyed verbs batch by their
- * array overload — listed first, since an array is itself a valid record and a
- * compound `IDBValidKey`, so the array signature must win (AGENTS §9.2). To act on
- * a single **compound** key, pass `rangeExactKey([…])` to `records` / `count`.
+ * The member set {@link IndexedDBStoreInterface} and
+ * {@link IndexedDBTransactionStoreInterface} share, declared once so neither can
+ * drift from the other. `get` / `resolve` read by key (`resolve` throws
+ * `NOT_FOUND`); `records` / `keys` read many over an optional key range; `has` /
+ * `count` test presence; `set` upserts and `add` inserts (throwing `CONSTRAINT`
+ * on a duplicate); `remove` deletes; `clear` empties the store; `cursor` streams.
+ * The keyed verbs batch by their array overload — listed first, because an array is
+ * itself a valid record and a compound `IDBValidKey`, so the array signature must
+ * win (AGENTS §9.2). To act on a single **compound** key, pass
+ * `IDBKeyRange.only([…])` to `records` / `count`.
  */
-export interface IndexedDBStoreInterface {
-	readonly name: string
-	readonly path: KeyPath | null
-	readonly indexes: readonly string[]
-	readonly increment: boolean
+export interface IndexedDBRecordStoreInterface {
 	get(keys: readonly IDBValidKey[]): Promise<ReadonlyArray<Row | undefined>>
 	get(key: IDBValidKey): Promise<Row | undefined>
 	resolve(keys: readonly IDBValidKey[]): Promise<readonly Row[]>
 	resolve(key: IDBValidKey): Promise<Row>
-	records(query?: IDBKeyRange | IDBValidKey | null, count?: number): Promise<readonly Row[]>
-	keys(query?: IDBKeyRange | IDBValidKey | null, count?: number): Promise<readonly IDBValidKey[]>
+	records(query?: IDBKeyRange | IDBValidKey, count?: number): Promise<readonly Row[]>
+	keys(query?: IDBKeyRange | IDBValidKey, count?: number): Promise<readonly IDBValidKey[]>
 	has(keys: readonly IDBValidKey[]): Promise<readonly boolean[]>
 	has(key: IDBValidKey): Promise<boolean>
-	count(query?: IDBKeyRange | IDBValidKey | null): Promise<number>
+	count(query?: IDBKeyRange | IDBValidKey): Promise<number>
 	set(values: readonly Row[]): Promise<readonly IDBValidKey[]>
 	set(value: Row, key?: IDBValidKey): Promise<IDBValidKey>
 	add(values: readonly Row[]): Promise<readonly IDBValidKey[]>
@@ -306,53 +322,58 @@ export interface IndexedDBStoreInterface {
 	remove(keys: readonly IDBValidKey[]): Promise<void>
 	remove(key: IDBValidKey): Promise<void>
 	clear(): Promise<void>
-	index(name: string): IndexedDBIndexInterface
 	cursor(options?: CursorOptions): Promise<IndexedDBCursorInterface | null>
 }
 
+// === Store
+
+/**
+ * Represents an object store — the keyed record surface plus the store's own schema
+ * metadata and `index` accessor.
+ *
+ * @remarks
+ * {@link IndexedDBRecordStoreInterface} plus the store's own schema metadata and
+ * `index` accessor. Each call runs in its own implicit transaction; for atomic
+ * multi-operation work use the database's `read` / `write`. `path` is the in-line
+ * key path, and `undefined` for an out-of-line store, exactly as
+ * {@link StoreDefinition} declares it.
+ */
+export interface IndexedDBStoreInterface extends IndexedDBRecordStoreInterface {
+	readonly name: string
+	readonly path: KeyPath | undefined
+	readonly indexes: readonly string[]
+	readonly increment: boolean
+	index(name: string): IndexedDBIndexInterface
+}
+
 // === Transaction store
 
 /**
- * An object store bound to an explicit transaction.
+ * Represents an object store bound to an explicit transaction.
  *
  * @remarks
- * The same CRUD surface as {@link IndexedDBStoreInterface}, but every call runs in
- * the owning transaction (opened by the database's `read` / `write`) rather than
- * its own — so a sequence of reads and writes is atomic. It drops `index` and the
- * standalone implicit-transaction conveniences; reach the live `store` for those.
+ * The same {@link IndexedDBRecordStoreInterface} surface as
+ * {@link IndexedDBStoreInterface}, but every call runs in the owning transaction
+ * (opened by the database's `read` / `write`) rather than its own — so a sequence
+ * of reads and writes is atomic. It drops `index` and the standalone
+ * implicit-transaction conveniences; reach the live `store` for those.
  */
-export interface IndexedDBTransactionStoreInterface {
+export interface IndexedDBTransactionStoreInterface extends IndexedDBRecordStoreInterface {
 	readonly store: IDBObjectStore
-	get(keys: readonly IDBValidKey[]): Promise<ReadonlyArray<Row | undefined>>
-	get(key: IDBValidKey): Promise<Row | undefined>
-	resolve(keys: readonly IDBValidKey[]): Promise<readonly Row[]>
-	resolve(key: IDBValidKey): Promise<Row>
-	records(query?: IDBKeyRange | IDBValidKey | null, count?: number): Promise<readonly Row[]>
-	keys(query?: IDBKeyRange | IDBValidKey | null, count?: number): Promise<readonly IDBValidKey[]>
-	has(keys: readonly IDBValidKey[]): Promise<readonly boolean[]>
-	has(key: IDBValidKey): Promise<boolean>
-	count(query?: IDBKeyRange | IDBValidKey | null): Promise<number>
-	set(values: readonly Row[]): Promise<readonly IDBValidKey[]>
-	set(value: Row, key?: IDBValidKey): Promise<IDBValidKey>
-	add(values: readonly Row[]): Promise<readonly IDBValidKey[]>
-	add(value: Row, key?: IDBValidKey): Promise<IDBValidKey>
-	remove(keys: readonly IDBValidKey[]): Promise<void>
-	remove(key: IDBValidKey): Promise<void>
-	clear(): Promise<void>
-	cursor(options?: CursorOptions): Promise<IndexedDBCursorInterface | null>
 }
 
 // === Transaction
 
 /**
- * An explicit transaction over one or more stores.
+ * Represents an explicit transaction over one or more stores.
  *
  * @remarks
  * Obtained through the `scope` callback of the database's `read` / `write`. `store`
  * reaches a typed, transaction-bound store; the transaction commits automatically
  * when the scope resolves, or rolls back if it throws or `abort` is called.
- * `active` is true while it still accepts operations; `finished` is true after
- * commit or abort.
+ * `active` and `finished` are complements over one settled fact, not two
+ * independent ones: `active` is true while the transaction still accepts
+ * operations, and `finished` is true after commit or abort.
  */
 export interface IndexedDBTransactionInterface<Stores extends StoresShape = StoresShape> {
 	readonly transaction: IDBTransaction
@@ -369,7 +390,7 @@ export interface IndexedDBTransactionInterface<Stores extends StoresShape = Stor
 // === Database
 
 /**
- * A browser-native IndexedDB database.
+ * Represents a browser-native IndexedDB database.
  *
  * @remarks
  * A typed, Promise-based handle over `IDBDatabase`. It connects lazily on first
@@ -393,11 +414,11 @@ export interface IndexedDBDatabaseInterface<Stores extends StoresShape = StoresS
 	store<K extends keyof Stores & string>(name: K): IndexedDBStoreInterface
 	read(
 		stores: (keyof Stores & string) | ReadonlyArray<keyof Stores & string>,
-		scope: (tx: IndexedDBTransactionInterface<Stores>) => void | Promise<void>,
+		scope: (transaction: IndexedDBTransactionInterface<Stores>) => void | Promise<void>,
 	): Promise<void>
 	write(
 		stores: (keyof Stores & string) | ReadonlyArray<keyof Stores & string>,
-		scope: (tx: IndexedDBTransactionInterface<Stores>) => void | Promise<void>,
+		scope: (transaction: IndexedDBTransactionInterface<Stores>) => void | Promise<void>,
 	): Promise<void>
 	close(): void
 	drop(): Promise<void>
```
