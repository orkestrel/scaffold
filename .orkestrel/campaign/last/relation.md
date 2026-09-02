# Last changes: relation

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `795a34d`, merge base with `origin/main` `702d3bf`, layer L3, declared version 0.0.10, registry version 0.0.10.

## Commits since origin/main

```text
cf5223e 2026-08-28 Update every dependency to the published latest
490ea2b 2026-08-28 Adopt the catalog and guide mirrors for the wave
51fee23 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
736516a 2026-09-01 Apply the verified src-audit fixes
e7c8c80 2026-09-01 Adopt the renamed guide helpers in the parity test
e675bd0 2026-09-02 Name the relation manager's names and split the resolved relation union
795a34d 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md            |  17 ++++----
 package.json                           |   6 +--
 src/core/Model.ts                      | 108 +++++++++++++++++++++----------------------------
 src/core/RelationManager.ts            |  12 ++----
 src/core/errors.ts                     |   6 +--
 src/core/factories.ts                  |   2 +-
 src/core/helpers.ts                    |  86 ++++++++++++++++++++++++++++-----------
 src/core/index.ts                      |   1 +
 src/core/types.ts                      | 161 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----------------
 src/core/validators.ts                 |  14 +++++++
 tests/guides.test.ts                   |  22 +++++-----
 tests/src/core/RelationManager.test.ts |   6 +--
 tests/src/core/helpers.test.ts         |  46 ++++++++++++++++-----
 tests/src/core/validators.test.ts      |  11 +++++
 14 files changed, 329 insertions(+), 169 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 9bebf12..bc85ae3 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -4,7 +4,7 @@ import type { RelationErrorCode } from './types.js'
 // carrying a machine-readable `code`, so a `catch` branches on `error.code`.
 
 /**
- * An error thrown by the relations layer.
+ * Represents an error thrown by the relations layer.
  *
  * @remarks
  * Thrown for: a relation value whose relationship cannot be inferred (`INVALID`), a
@@ -30,10 +30,10 @@ export class RelationError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to a {@link RelationError}.
+ * Narrows an unknown caught value to a {@link RelationError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is a {@link RelationError}
+ * @returns True if `value` is a {@link RelationError}; false otherwise
  */
 export function isRelationError(value: unknown): value is RelationError {
 	return value instanceof RelationError
diff --git a/src/core/index.ts b/src/core/index.ts
index bafdf15..9edc655 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,5 +1,6 @@
 export * from './types.js'
 export * from './errors.js'
+export * from './validators.js'
 export * from './helpers.js'
 export * from './factories.js'
 export * from './RelationManager.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 70a3e2f..8ba6214 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -20,7 +20,7 @@ import type { EmitterInterface } from '@orkestrel/emitter'
 // === Relation kinds & descriptors
 
 /**
- * The five relation shapes.
+ * Enumerates the five relation shapes.
  *
  * @remarks
  * `belongs` — a foreign key on THIS table points at the related row (single).
@@ -32,7 +32,7 @@ import type { EmitterInterface } from '@orkestrel/emitter'
 export type Relationship = 'belongs' | 'many' | 'one' | 'through' | 'morph'
 
 /**
- * The object form of a relation.
+ * Represents the object form of a relation.
  *
  * @remarks
  * The builder helpers (`belongsTo` / `hasMany` / `hasOne` / `hasThrough` /
@@ -56,7 +56,7 @@ export interface RelationDescriptor {
 }
 
 /**
- * A single relation definition.
+ * Represents a single relation definition.
  *
  * @remarks
  * A `string` is a `belongs` (the FK column on this table); a `readonly string[]`
@@ -65,14 +65,14 @@ export interface RelationDescriptor {
  */
 export type Relation = string | readonly string[] | RelationDescriptor
 
-/** A model's relations, keyed by relation name. */
+/** Holds a model's relations, keyed by relation name. */
 export type RelationMap = Readonly<Record<string, Relation>>
 
-/** A machine-readable {@link RelationError} code. */
+/** Names a machine-readable {@link RelationError} code. */
 export type RelationErrorCode = 'INVALID' | 'UNKNOWN_RELATION' | 'NOT_THROUGH'
 
 /**
- * Per-table relation maps — the declarative input to `createRelationManager`.
+ * Holds per-table relation maps — the declarative input to `createRelationManager`.
  *
  * @remarks
  * Keys are constrained to the database's declared table names, so relations can
@@ -83,29 +83,105 @@ export type RelationsShape<T extends TableMap = TableMap> = {
 }
 
 /**
- * A relation resolved at define-time into a flat, ready-to-load form.
+ * Represents a `belongs` relation resolved at define-time — the foreign key sits on THIS table.
  *
  * @remarks
- * The relationship and every column needed to load, link, and unlink are
- * precomputed from the raw {@link Relation}, so no inference runs at query time.
+ * `column` is that foreign key; the related row is the one whose primary key it holds.
+ * `name` is the relation's key in its {@link RelationMap} and `model` the target table.
  */
-export interface ResolvedRelation {
-	readonly relationship: Relationship
+export interface ResolvedBelongs {
+	readonly relationship: 'belongs'
 	readonly name: string
 	readonly model: string
-	readonly column?: string
-	readonly key?: string
-	readonly through?: string
-	readonly source?: string
-	readonly target?: string
-	readonly tag?: string
-	readonly label?: string
+	readonly column: string
+}
+
+/**
+ * Represents a `many` relation resolved at define-time — the foreign key sits on the RELATED
+ * table.
+ *
+ * @remarks
+ * `key` is that foreign key. Every related row holding this record's primary-key value
+ * in it is attached, so the loaded property is an array.
+ */
+export interface ResolvedMany {
+	readonly relationship: 'many'
+	readonly name: string
+	readonly model: string
+	readonly key: string
+}
+
+/**
+ * Represents a `one` relation resolved at define-time — {@link ResolvedMany}'s foreign key, one
+ * row.
+ *
+ * @remarks
+ * `key` is the foreign key on the related table. The first matching row is attached and
+ * a miss reads as `undefined`.
+ */
+export interface ResolvedOne {
+	readonly relationship: 'one'
+	readonly name: string
+	readonly model: string
+	readonly key: string
+}
+
+/**
+ * Represents a `through` relation resolved at define-time — a junction table links the two
+ * sides.
+ *
+ * @remarks
+ * `through` is the junction table, `source` its foreign-key column pointing at THIS
+ * model, and `target` its foreign-key column pointing at the related model. These are
+ * the columns `link` / `unlink` / `links` write and read.
+ */
+export interface ResolvedThrough {
+	readonly relationship: 'through'
+	readonly name: string
+	readonly model: string
+	readonly through: string
+	readonly source: string
+	readonly target: string
 }
 
+/**
+ * Represents a `morph` relation resolved at define-time — a polymorphic foreign key and its
+ * discriminator.
+ *
+ * @remarks
+ * `key` is the foreign key on the related table, `tag` the discriminator column beside
+ * it, and `label` the discriminator value identifying THIS model.
+ */
+export interface ResolvedMorph {
+	readonly relationship: 'morph'
+	readonly name: string
+	readonly model: string
+	readonly key: string
+	readonly tag: string
+	readonly label: string
+}
+
+/**
+ * Represents a relation resolved at define-time into a flat, ready-to-load form.
+ *
+ * @remarks
+ * A union over the arms {@link Relationship} names, discriminated on `relationship`:
+ * each arm declares exactly the columns that arm needs to load, link, and unlink, and
+ * declares them required. `resolveRelation` precomputes and validates them from the raw
+ * {@link Relation}, so no inference and no absence check runs at query time. Narrow on
+ * `relationship` before reading an arm's own columns.
+ */
+export type ResolvedRelation =
+	| ResolvedBelongs
+	| ResolvedMany
+	| ResolvedOne
+	| ResolvedThrough
+	| ResolvedMorph
+
 // === Loading
 
 /**
- * Which relations to populate when loading — and, recursively, their own.
+ * Selects which relations to populate when loading — and, recursively, their own.
  *
  * @remarks
  * `true` loads the relation flat; a nested {@link Include} loads it and its
@@ -121,9 +197,9 @@ export interface Include {
 }
 
 /**
- * The relation properties attached to a {@link Loaded} row — each relation name
- * mapped to its loaded related row(s), or `undefined` when a `belongs` / `one`
- * relation misses.
+ * Holds the relation properties attached to a {@link Loaded} row — each relation
+ * name mapped to its loaded related row(s), or `undefined` when a `belongs` /
+ * `one` relation misses.
  *
  * @remarks
  * The broad value type (`Row | readonly Row[] | undefined`) is narrowed at the use
@@ -133,7 +209,7 @@ export interface Include {
 export type RelationProps = Record<string, Row | readonly Row[] | undefined>
 
 /**
- * A row with its loaded relation properties attached.
+ * Represents a row with its loaded relation properties attached.
  *
  * @remarks
  * The base row is fully typed (the table's row type); the relation properties
@@ -144,7 +220,7 @@ export type RelationProps = Record<string, Row | readonly Row[] | undefined>
 export type Loaded<T> = T & Readonly<RelationProps>
 
 /**
- * A related model's resolved relations and primary-key column, for nested loading.
+ * Holds a related model's resolved relations and primary-key column, for nested loading.
  *
  * @remarks
  * The lookup result the relation registry hands a {@link ModelInterface} so it can
@@ -157,21 +233,21 @@ export interface RelationContext {
 	readonly primary: string
 }
 
-/** Pagination, ordering, and cancellation for `find`. */
+/** Configures pagination, ordering, and cancellation for `find`. */
 export interface FindOptions extends OperationOptions {
 	readonly limit?: number
 	readonly offset?: number
 	readonly sort?: string
-	/** The sort direction; defaults to `ascending` when {@link sort} is present. */
+	/** Holds the sort direction; defaults to `ascending` when {@link sort} is present. */
 	readonly direction?: OrderDirection
 }
 
 // === Model
 
 /**
- * The push observation surface of a {@link ModelInterface} (AGENTS §13) — the eager-load
- * + junction-management moments a fire-and-forget observer (logging, metrics, a sync
- * layer) subscribes to.
+ * Declares the push observation surface of a {@link ModelInterface} (AGENTS §13) — the
+ * eager-load + junction-management moments a fire-and-forget observer (logging, metrics,
+ * a sync layer) subscribes to.
  *
  * @typeParam TKey - The model's primary-key type (a {@link Key}); `link` / `unlink` carry
  *   the owning key so the map is `ModelEventMap<TKey>`.
@@ -192,16 +268,25 @@ export interface FindOptions extends OperationOptions {
  * `EventMap` is a `type` kind).
  */
 export type ModelEventMap<TKey extends Key = Key> = {
-	/** A relation eager-loaded — the relation name + the count of related rows attached. */
+	/**
+	 * Fires when a relation is eager-loaded — the relation name + the count of related rows
+	 * attached.
+	 */
 	readonly load: readonly [name: string, count: number]
-	/** A junction row was inserted for a `through` relation — the owning key + relation name. */
+	/**
+	 * Fires after a junction row is inserted for a `through` relation — the owning key +
+	 * relation name.
+	 */
 	readonly link: readonly [key: TKey, relation: string]
-	/** A junction row was removed for a `through` relation — the owning key + relation name. */
+	/**
+	 * Fires after a junction row is removed for a `through` relation — the owning key +
+	 * relation name.
+	 */
 	readonly unlink: readonly [key: TKey, relation: string]
 }
 
 /**
- * A model — a typed table paired with relation-aware loading and junction
+ * Represents a typed table paired with relation-aware loading and junction
  * management.
  *
  * @remarks
@@ -237,10 +322,10 @@ export interface ModelInterface<T = Row> {
 
 // === Manager
 
-/** Options for `createRelationManager`. */
+/** Configures `createRelationManager`. */
 export interface RelationManagerOptions<T extends TableMap = TableMap> {
 	/**
-	 * The database to build the registry over.
+	 * Holds the database to build the registry over.
 	 *
 	 * @remarks
 	 * Intersected with the broad `DatabaseInterface` so the manager gets both the
@@ -252,16 +337,16 @@ export interface RelationManagerOptions<T extends TableMap = TableMap> {
 }
 
 /**
- * The relation registry — vends a typed {@link ModelInterface} per table.
+ * Vends a typed {@link ModelInterface} per table.
  *
  * @remarks
  * Built from a database and a {@link RelationsShape}; relations are resolved once
  * at construction. `model(name)` returns the model for a declared table, typed by
- * that table's row. Follows the manager accessor pattern (`model` / `models`).
+ * that table's row.
  */
 export interface RelationManagerInterface<T extends TableMap = TableMap> {
 	readonly count: number
 	model<K extends keyof T & string>(name: K): ModelInterface<RowOf<T[K]>>
-	models(): readonly string[]
+	names(): readonly string[]
 	has(name: string): boolean
 }
```
