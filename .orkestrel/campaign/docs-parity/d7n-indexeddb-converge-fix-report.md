# Report — `d7n-indexeddb-converge-fix`

`implementer` on Claude Opus 5, in `/home/user/fleet/indexeddb` from `b157a60`. Every item landed; no
deviation. Wall clock 2026-09-07T16:43:19Z → 2026-09-07T16:53:13Z (9m54s).

## Touched files

| File | Change |
| --- | --- |
| `guides/indexeddb.md` | The `Shape` column under Ruling 15's convention sentence, the prose member lists deleted, the opening prose recast, the factory fence grown, the all-caps emphasis dropped |
| `src/browser/errors.ts` | The `IndexedDBError` remark opener no longer restates the description |
| `src/browser/IndexedDBTransaction.ts` | The `IndexedDBTransaction` remark opener no longer restates the description |
| `src/browser/factories.ts` | The `@example` body carried from the grown guide fence by `npm run docs -- --to source` |

```text
 guides/indexeddb.md                 | 89 +++++++++++++++++++------------------
 src/browser/IndexedDBTransaction.ts | 10 ++---
 src/browser/errors.ts               | 10 ++---
 src/browser/factories.ts            | 13 ++++--
 4 files changed, 66 insertions(+), 56 deletions(-)
```

## Per item

### I1 — the `Shape` column (Ruling 15)

`guides/indexeddb.md:85-110`. `### Types` now heads `API | Kind | Shape | Summary` under Ruling 15's
fleet-wide convention sentence at `:87`, and each cell is read from `src/browser/types.ts`.

```diff
 ### Types
 
-| API                                     | Kind      | Summary  |
-| --------------------------------------- | --------- | -------- |
-| `Row`                                   | type      | Represents a record stored in, and read from, an object store. |
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+
+| API                                     | Kind      | Shape                     | Summary  |
+| --------------------------------------- | --------- | ------------------------- | -------- |
+| `Row`                                   | type      | `Record<string, unknown>` | Represents a record stored in, and read from, an object store. |
```

Every `Shape` cell as it now stands:

| API | Shape |
| --- | --- |
| `Row` | `Record<string, unknown>` |
| `KeyPath` | `string \| readonly string[]` |
| `IndexDefinition` | `{ name, path, unique?, multiple? }` |
| `StoreDefinition` | `{ path?, increment?, indexes? }` |
| `IndexedDBSchema` | `Readonly<Record<string, StoreDefinition>>` |
| `IndexedDBUpgradeContext` | `{ transaction, old, version, stores, indexes }` |
| `IndexedDBUpgradeStoreManagerInterface` | `{ names } plus create, drop, store` |
| `IndexedDBUpgradeIndexManagerInterface` | `{} plus create, drop` |
| `IndexedDBDatabaseOptions` | `{ name, version?, stores, upgrade? }` |
| `IndexedDBCursorOptions` | `{ query?, direction? }` |
| `IndexedDBErrorCode` | `'NOT_OPEN' \| 'CLOSED' \| 'NOT_FOUND' \| 'CONSTRAINT' \| 'QUOTA' \| 'ABORTED' \| 'DATA' \| 'OPEN' \| 'UPGRADE' \| 'INACTIVE' \| 'READONLY' \| 'INVALID' \| 'UNKNOWN'` |
| `IndexedDBDatabaseInterface` | `{ database, name, version, stores, open } plus connect, store, read, write, close, drop` |
| `IndexedDBRecordStoreInterface` | `{} plus get, resolve, records, keys, has, count, set, add, remove, clear, cursor` |
| `IndexedDBStoreInterface` | `{ name, path, indexes, increment } plus get, resolve, records, keys, has, count, set, add, remove, clear, index, cursor` |
| `IndexedDBIndexInterface` | `{ name, path, unique, multiple } plus get, resolve, records, keys, primary, has, count, cursor` |
| `IndexedDBCursorInterface` | `{ cursor, source, key, primary, value, direction } plus continue, seek, advance, update, remove` |
| `IndexedDBTransactionInterface` | `{ transaction, mode, stores, active, finished, error } plus store, abort, commit` |
| `IndexedDBTransactionStoreInterface` | `{ store } plus get, resolve, records, keys, has, count, set, add, remove, clear, cursor` |

The deletions this item required:

```diff
-The data-only shapes carry these members: `IndexDefinition` — `name` / `path` / `unique` / `multiple`; `StoreDefinition` — `path` / `increment` / `indexes`; `IndexedDBDatabaseOptions` — `name` / `version?` / `stores` / `upgrade?`; `IndexedDBCursorOptions` — a `query` key range and a `direction`.
```

```diff
-The public methods … Each interface's `readonly` data members are named in the paragraph under its own heading in this section. Each class …
+The public methods … Each interface's `readonly` data members are named in the `Shape` column of the [Types](#types) table, earlier. Each class …
```

```diff
-`IndexedDBUpgradeContext` carries only readonly data — `transaction` / `old` / `version` / `stores` / `indexes` — so no Methods table follows for it. Its managers carry …
+`IndexedDBUpgradeContext` carries only readonly data, so no Methods table follows for it. Its managers carry …
```

The `####` paragraphs that only listed members are gone; each one that also carried behaviour keeps
the behaviour:

| Heading | Before | After |
| --- | --- | --- |
| `IndexedDBDatabaseInterface` (`:122`) | "Its readonly data members are `database`, `name`, `version`, `stores`, and `open`." | deleted |
| `IndexedDBRecordStoreInterface` (`:135`) | "… It declares no readonly data member of its own." | that sentence deleted |
| `IndexedDBStoreInterface` (`:153`) | "`IndexedDBRecordStoreInterface` plus `index`, over the readonly data members `name`, `path`, `indexes`, and `increment`. Each call runs …" | "`IndexedDBRecordStoreInterface` plus `index`. Each call runs …" |
| `IndexedDBIndexInterface` (`:170`) | "Its readonly data members are `name`, `path`, `unique`, and `multiple`." | deleted |
| `IndexedDBCursorInterface` (`:185`) | "Its readonly data members are `cursor`, `source`, `key`, `primary`, `value`, and `direction` — each a snapshot …" | "Each readonly data member is a snapshot of the position the cursor stopped on, because IndexedDB reuses the live cursor object on every move." |
| `IndexedDBTransactionInterface` (`:195`) | "Its readonly data members are `transaction`, `mode`, `stores`, `active`, `finished`, and `error`." | deleted |
| `IndexedDBTransactionStoreInterface` (`:205`) | "… It adds the raw `store` as its readonly data member." | "… Its `store` is the raw `IDBObjectStore` the owning transaction binds." |
| `IndexedDBUpgradeStoreManagerInterface` (`:223`) | "Its readonly data member is `names`, the store names the database holds at that point in the upgrade." | "`names` lists the store names the database holds at that point in the upgrade." |
| `IndexedDBUpgradeIndexManagerInterface` (`:233`) | "It declares no readonly data member." | "Reached as `context.indexes`; the store a call names must already exist within the current upgrade transaction." |

### I2 — remarks restating the description

`src/browser/IndexedDBTransaction.ts:15` and `src/browser/errors.ts:16`.

```diff
  * @remarks
- * Wraps `IDBTransaction` with state tracking and typed, scope-bound store access.
- * Constructed by the database's `read` / `write`, which await its completion (or
- * roll it back on a throw). `store` reaches a store within the transaction's scope;
- * `abort` rolls back; `commit` flushes early (the scope's completion commits
- * otherwise). `active` is true until commit or abort; `finished` is its complement.
+ * Wraps `IDBTransaction` with state tracking. Constructed by the database's
+ * `read` / `write`, which await its completion (or roll it back on a throw).
+ * `store` reaches a store within the transaction's scope; `abort` rolls back;
+ * `commit` flushes early (the scope's completion commits otherwise). `active` is
+ * true until commit or abort; `finished` is its complement.
```

```diff
  * @remarks
- * Carries an {@link IndexedDBErrorCode} and the originating native error as the
- * standard `cause`. Construct it directly for wrapper-lifecycle faults; the
- * internal `wrapError` maps a native `DOMException` to the right code at the
- * request boundary. Narrow a caught value with {@link isIndexedDBError}, this
- * package's own guard.
+ * The `code` is an {@link IndexedDBErrorCode}, and the originating native error
+ * rides as the standard `cause`. Construct it directly for wrapper-lifecycle
+ * faults; the internal `wrapError` maps a native `DOMException` to the right code
+ * at the request boundary. Narrow a caught value with {@link isIndexedDBError},
+ * this package's own guard.
```

Both paragraphs were rewrapped to the block's own width after the wording changed. No description
paragraph moved, so no `Summary` cell moved: `npm run docs` stayed at `disagreements found: 0`
through this item.

### I3 — the opening prose

`guides/indexeddb.md:8`.

```diff
-Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into one you can `await` — and nothing more. It exposes exactly what raw IndexedDB offers natively and deliberately nothing else: …
+Its job is to type IndexedDB's event-driven, callback-shaped, structurally-untyped surface. It exposes exactly what raw IndexedDB offers natively and deliberately nothing else: …
```

The characterization stays; the `await` proposition the tagline already closes on is gone, and so is
the "and nothing more" the next sentence repeats as "deliberately nothing else".

### I4 — the fuller demonstration (Ruling 14)

`guides/indexeddb.md:258-274` and `src/browser/factories.ts:21-37`. The heading stays; the fence is
the union of the converged fence and the pre-converge `@example` body at `585a405^`, so no line was
deleted from either side.

```diff
 ```ts
-import { createIndexedDBDatabase, supportsIndexedDB } from '@orkestrel/indexeddb'
+import { createIndexedDBDatabase, rangeFromKey, supportsIndexedDB } from '@orkestrel/indexeddb'
 
 if (supportsIndexedDB()) {
-	const db = createIndexedDBDatabase({ name: 'app', version: 1, stores: { users: { path: 'id' } } })
-	await db.store('users').set({ id: 'u1', name: 'Ada' })
+	const db = createIndexedDBDatabase({
+		name: 'app',
+		version: 1,
+		stores: {
+			users: { path: 'id', indexes: [{ name: 'byAge', path: 'age' }] },
+		},
+	})
+	await db.store('users').set({ id: 'u1', name: 'Ada', age: 36 })
+	await db.store('users').index('byAge').records(rangeFromKey(18)) // adults, index-backed
 }
 ```
```

The failing-first reading for this item, on the same comparison `tests/guides.test.ts` runs, taken
after the fence grew and before `--to source` carried it:

```text
$ npm run docs
guides/indexeddb.md Feature-detecting before opening a database: guide "ts\nimport { createIndexedDBDatabase, rangeFromKey, supportsIndexedDB } …" source "ts\nimport { createIndexedDBDatabase, supportsIndexedDB } …"
rows read: 1, disagreements found: 1
```

```text
$ npm run docs -- --to source
wrote src/browser/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npm run docs
rows read: 1, disagreements found: 0
```

No `tests/guides.test.ts` transcription case asserts this fence, and
`tests/src/browser/integration.test.ts` carries no `Feature-detecting` transcription for it to guard
— `grep -n "supportsIndexedDB()" tests/guides.test.ts tests/src/browser/integration.test.ts` prints
nothing. The equality gate already binds this fence to the `@example` block of the same title, so no
assertion was added and none was deleted.

### I5 — all-caps

The brief names `:327` and `:348`; the criterion's own pattern ` AND \| NEW ` also matched Contract
item 7, so all three landed.

```diff
-await db.drop() // close AND delete the whole database
+await db.drop() // closes and deletes the whole database
```

```diff
-	// Every move returns the cursor at the NEW position and leaves the old wrapper
+	// Every move returns the cursor at its new position and leaves the old wrapper
```

```diff
-… (a miss AND a non-record value both read as `undefined` from `get`) …
+… (a miss and a non-record value both read as `undefined` from `get`) …
```

### Ruling 16 — the heading stays

`### Stores, indexes, cursors, transactions` is still at `guides/indexeddb.md:44`, untouched by every
hunk in this unit.

### Propagation

`npx oxfmt --config .oxfmtrc.json --write` ran over each owned path after each edit round; oxfmt
realigns a Markdown table, so the `Shape` column's padding is the formatter's. `--to source` ran once
for the grown fence, `--to guide` ran and wrote nothing.

## Criteria

### 1. `git status --short` lists owned files only

```text
 M guides/indexeddb.md
 M src/browser/IndexedDBTransaction.ts
 M src/browser/errors.ts
 M src/browser/factories.ts
```

Every instrument sits in the git-ignored `tmp/d7n-indexeddb-converge-fix/`.

### 2. `oxfmt --check`, `oxlint --deny-warnings`, `npm run check` exit 0

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/indexeddb.md src/browser/errors.ts src/browser/factories.ts src/browser/IndexedDBTransaction.ts
All matched files use the correct format.
Finished in 799ms on 4 files using 4 threads.
```

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings src/browser/errors.ts src/browser/factories.ts src/browser/IndexedDBTransaction.ts
oxlint exit=0
```

oxlint prints nothing on a clean run, so the instrument was proved able to fail against a control
outside the owned set — `tmp/d7n-indexeddb-converge-fix/control.ts` holding `export const bad: any = 1`:

```text
tmp/d7n-indexeddb-converge-fix/control.ts:1:19: error typescript(no-explicit-any): Unexpected `any`. …
control exit=1
```

The control file was removed after the reading and never entered the tracked tree.

```text
$ npm run check
> tsc --noEmit -p configs/src/tsconfig.browser.json
check exit=0
```

### 3. `npm run docs` at zero, both directions `written: 0`

```text
$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

### 4. The guide's text-shaped conditions

```text
$ grep -c 'A `Shape` cell holds' guides/indexeddb.md
1
$ grep -n 'A `Shape` cell holds' guides/indexeddb.md
87:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.

$ awk -F'|' '/^\| `/ && $3 ~ /interface/ {if ($4 ~ /:/) print NR": "$4}' guides/indexeddb.md
(no output)

$ grep -n 'readonly data members are\|data-only shapes carry' guides/indexeddb.md
(no output)

$ grep -n ' AND \| NEW ' guides/indexeddb.md
(no output)
```

The colon sweep was read back with its verdict per row to prove it admitted the population it
claims; it printed one row per `interface` row of the Types table, `colon=no` on each.

### 5. The suites

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  71 passed (71)
   Duration  1.41s
```

```text
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  792ms
```

Observation, the Orchestrator takes the deciding run:

```text
$ npm run test:src:browser
 Test Files  9 passed (9)
      Tests  129 passed (129)
   Duration  18.69s
```

## Shared-file patches

None. Every edit landed inside the owned set.

## Ancillary decisions

- **An extending interface's cell carries its inherited members.** `IndexedDBStoreInterface` and
  `IndexedDBTransactionStoreInterface` list the `IndexedDBRecordStoreInterface` verbs, matching the
  `## Methods` tables that already repeat those rows for the same reason and matching
  `tool/guides/tool.md:55` ("`ToolInterface` and `ToolManagerInterface` list every member they
  declare or inherit"). One sentence at `guides/indexeddb.md:110` states it, so a reader can tell a
  cell is complete rather than additive.
- **`{} plus …` for an interface with no data member.** Read from the sibling row at
  `sqlite/guides/sqlite.md:74`, the fleet's existing idiom.
- **A `####` heading whose only paragraph listed members now carries no paragraph.**
  `IndexedDBDatabaseInterface`, `IndexedDBIndexInterface`, and `IndexedDBTransactionInterface` sit
  directly over their tables. Replacing the deleted list with fresh prose would duplicate each
  declaration's own `@remarks`, which the reader reaches through the row.
- **`IndexedDBUpgradeIndexManagerInterface` kept a paragraph.** Its former line said only that it
  declares no data member; the replacement states the versionchange precondition its own remark
  carries, so the heading reads like its store-manager sibling.
- **The remark paragraphs were rewrapped.** The wording change left ragged lines against the block's
  own width. No code token moved.

## Deviation state

None. No gate outside the owned files went red, every `Shape` cell was expressible in Ruling 12's
idiom, and the grown fence needed no code change.

## Findings outside this unit's scope

Recorded against the capability that owns them, not reopened here:

- `guides/indexeddb.md` still carries all-caps emphasis the brief's `I5` did not name and the
  criterion's pattern does not match: `BEFORE` (`:249`), `SAME` and `WITHOUT` (`:333`), and `SAME`,
  `ABNORMAL`, and `NOT` (`:463`). The `BOTH` in `tests/src/browser/IndexedDBDatabase.test.ts` was already
  carried to the pass that owns that file (subjective F4).
- The `Feature-detecting before opening a database` fence has no executed transcription in
  `tests/src/browser/integration.test.ts`, so its index-backed read is asserted by no behavioural
  proof. Every other flagship fence has one. `tests/src/browser/**` is off-limits to this unit.

---

**Orchestrator annotation (closure, 2026-09-07):** the closure `checker` read a count in this report's prose (lines 197-198). The tree is authoritative; the report stands annotated.
