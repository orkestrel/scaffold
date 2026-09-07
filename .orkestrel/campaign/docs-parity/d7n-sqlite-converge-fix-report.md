# Report — `d7n-sqlite-converge-fix`

Every item landed and every acceptance criterion is green. Owned files only: `guides/sqlite.md`,
`src/server/types.ts`, `src/server/SQLiteDatabase.ts`, `src/server/SQLiteStatement.ts`,
`tests/guides.test.ts`. Baseline `3b211a0`, nothing committed, no install, no discard-class git
command. Wall clock: first edit written 2026-09-07 16:34:16Z, final gate read 16:39:26Z, on the
reading pass that preceded it from 16:26Z.

## S1 — the `examples` binding

`tests/guides.test.ts` binds the mapped `examples` at the examples loop's own scope, above its
`describe`, matching the pilot at `/home/user/fleet/abort/tests/guides.test.ts:209-228`.

```diff
@@ -212,19 +212,19 @@ for (const entry of manifest) {
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
 			const documented = group.methods.map((method) => method.name)
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
-							? source.examples(group.interface).map((example) => example.name)
-							: source
-									.examples(group.interface)
-									.map((example) => example.name)
-									.concat(source.examples(entity).map((example) => example.name))
 					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
```

## S2 — the `Shape` column

`### Types` heads `API | Kind | Shape | Summary` under Ruling 15's convention sentence, verbatim.
`Summary` stays last, and the first column header stays the guide's own `API` (Ruling 10).

```diff
 ### Types
 
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+
+| API                        | Kind      | Shape                                                                | Summary … |
+| `SQLiteValue`              | type      | `null \| number \| bigint \| string \| Uint8Array`                   | … |
+| `SQLiteRow`                | type      | `Record<string, SQLiteValue>`                                        | … |
+| `SQLiteParameters`         | type      | `readonly SQLiteValue[] \| Readonly<Record<string, SQLiteValue>>`    | … |
+| `SQLiteBinding`            | type      | `{ positional } \| { named }`                                        | … |
+| `SQLiteExecuteResult`      | interface | `{ changes, rowid }`                                                 | … |
+| `SQLiteErrorCode`          | type      | `'CLOSED' \| 'CONSTRAINT' \| 'BUSY' \| 'INVALID' \| 'UNKNOWN'`       | … |
+| `SQLiteDatabaseOptions`    | interface | `{ path?, readonly?, timeout?, foreignKeys?, bigints? }`             | … |
+| `SQLiteStatementInterface` | interface | `{} plus execute, get, all, iterate`                                 | … |
+| `SQLiteDatabaseInterface`  | interface | `{ path, connected, transacting } plus connect, close, execute, prepare, transact, begin, commit, rollback, pragma, [Symbol.dispose]` | … |
+
+The `path`, `connected`, and `transacting` members of `SQLiteDatabaseInterface` are `readonly` data members (the preceding Surface row) — its call-signature methods are documented under [Methods](#methods).
 
 Row values arrive as the native `SQLiteValue` types and are handed back as-is — …
```

The elided `Summary` column is unchanged except where a description moved; the whole table sits at
`guides/sqlite.md:65-75`. `SQLiteDatabaseInterface`'s call-signature list is `src/server/types.ts`
declaration order, `[Symbol.dispose]` written as such. This closes the audit's objective F3: `path`
and `connected` are named in the cell, and the pointer paragraph says where each kind is documented.

Descriptions whose trailing clause only listed members were rewritten in `src/server/types.ts` and
carried with `--to guide`; a description naming members inside a sentence about the type stayed
(`SQLiteRow`, `SQLiteParameters`, `SQLiteDatabaseInterface`).

```diff
-/** Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge over `null`,
- * `number`, `bigint`, `string`, and `Uint8Array`.
+/** Represents a value SQLite stores and returns natively — the bridge between SQLite's storage
+ * classes and their JS types.
   *
   * @remarks
- * `node:sqlite` maps `NULL` / `INTEGER` / `REAL` / `TEXT` / `BLOB` to exactly
- * these JS types (integers arrive as `number`, or `bigint` only past 2^53).
+ * `node:sqlite` maps `NULL` / `INTEGER` / `REAL` / `TEXT` / `BLOB` to exactly the
+ * JS types this union names (integers arrive as `number`, or `bigint` only past 2^53).

- * Represents the normalized binding shape a native `StatementSync` call expects —
- * `{ positional }` or `{ named }`, what {@link SQLiteParameters} become on the way into
- * `node:sqlite`.
+ * Represents the normalized binding shape a native `StatementSync` call expects — what
+ * {@link SQLiteParameters} become on the way into `node:sqlite`.

- * Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL) — its
- * `changes` and `rowid`.
+ * Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL).

- * Represents the options for `createSQLiteDatabase` — `path`, `readonly`, `timeout`,
- * `foreignKeys`, and `bigints`.
+ * Represents the options for opening a SQLite connection, accepted by the
+ * `createSQLiteDatabase` function and the `SQLiteDatabase` constructor.
```

The `## Methods` paragraph keeps its behavioural sentences about `transacting` and drops the spelled
declaration the cell now holds; its owner is named so the paragraph opens on a resolvable subject.

```diff
-`SQLiteDatabaseInterface` also exposes `readonly transacting: boolean` — whether a transaction is open on this connection (node:sqlite's `isTransaction`, wrapping `sqlite3_get_autocommit()`), `false` when not connected. `transact(scope)` sets it …
+The `transacting` member of `SQLiteDatabaseInterface` reports whether a transaction is open on this connection (node:sqlite's `isTransaction`, wrapping `sqlite3_get_autocommit()`), and reads `false` when not connected. `transact(scope)` sets it …
```

The `[Symbol.dispose]` paragraph that follows stays whole: it carries why the member takes prose
rather than a `Methods` row, which no cell holds.

## S3 — the upstream reference

```diff
-`@src/server` barrel. Requires Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`,
+`@src/server` barrel. Requires Node.js ^22.18 || >=24.4 for
+[`node:sqlite`](https://nodejs.org/api/sqlite.html) (the releases carrying the `timeout`,
 `isTransaction`, and `readBigInts` options and `StatementSync.iterate`).
```

## S4 — cross-references as links

```diff
- * Implements `SQLiteDatabaseInterface` over a lazily opened `DatabaseSync` the instance
+ * Implements {@link SQLiteDatabaseInterface} over a lazily opened `DatabaseSync` the instance
   * owns, gating every operation on that connection and mapping each native fault to a
- * `SQLiteError`.
+ * {@link SQLiteError}.

- * Implements `SQLiteStatementInterface` over one compiled `StatementSync`, gating each call
- * on its owning connection still being open and mapping every native fault, a mid-stream one
- * included, to a `SQLiteError`.
+ * Implements {@link SQLiteStatementInterface} over one compiled `StatementSync`, gating each
+ * call on its owning connection still being open and mapping every native fault, a mid-stream
+ * one included, to a {@link SQLiteError}.
```

The compared form renders a tag as its target's code token, and `npm run docs` reported no
disagreement from these edits alone before the description edits landed.

## S5 — all-caps

```diff
-a statement prepared on the OLD connection stays `CLOSED` permanently
+a statement prepared on the earlier connection stays `CLOSED` permanently

-// throws on read unless `bigints` is enabled — enabling it returns EVERY integer
-// column as bigint, not just the out-of-range ones:
+// throws on read unless `bigints` is enabled — enabling it returns every integer
+// column as bigint, not the out-of-range ones alone:
```

## Ancillary decisions

- **The `INTERNAL` doc block** in `tests/guides.test.ts` read "the second assertion below fails",
  which Ruling 13 fixes to "the assertion that follows it fails when a name here stops being
  stranded" and which names a list item by its position and points with `below`. The drop-in's
  canonical text is the pilot's, so the line takes the pilot's wording. The block is now byte for
  byte the pilot's `:34-41`.
- **The `EVERY` in the `SQLiteDatabaseOptions` remark** (`src/server/types.ts`) is the same defect
  as the guide's, in a doc block this unit owns, and `@remarks` is uncompared, so it reads "every
  integer column" and `docs` is unmoved.
- **`SQLiteError` in the two class descriptions** took `{@link}` beside the interface names the
  brief listed: the finding is that a cross-reference in those files is written as a tag, and the
  same sentence carried the other half of it. The compared form is unchanged.
- **`SQLiteStatementInterface`'s cell** reads `{} plus execute, get, all, iterate`. The interface
  declares no data member, and the empty braces say so against its sibling row's
  `{ path, connected, transacting }`, rather than leaving a bare list a reader could read as data
  members that lost their braces. No fleet precedent under Ruling 15 covers a call-signature-only
  interface.
- **The `plus` list is bare**, as `budget` and `emitter` write it, not braced as `html` writes it.
- **`{ positional } \| { named }`** spells `SQLiteBinding`'s arms without their member types, per
  Ruling 12's "a member's type never appears in the cell", rather than the raw declaration.

## Observation, outside this unit's scope

`src/server/SQLiteDatabase.ts:91-93` carries `NEW` and `OLD` as all-caps emphasis in a body comment
inside `prepare`. That is not a doc block, so this unit left it, the way the audit left the `BOTH`
in indexeddb's test file for the pass that owns it. `src/server/errors.ts:50` and
`src/server/helpers.ts:26,29` write `SQLiteError` as a plain code span in `@returns` and `@remarks`
where the description beside them uses `{@link}`; those tags predate this round's finding.

## Acceptance criteria

1. `git status --short`

```
 M guides/sqlite.md
 M src/server/SQLiteDatabase.ts
 M src/server/SQLiteStatement.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

Instruments are under `tmp/d7n-sqlite-converge-fix/` inside the checkout, which git ignores;
`git status --short --untracked-files=all` prints the same rows.

2. `npx oxfmt --config .oxfmtrc.json --check guides/sqlite.md src/server/types.ts src/server/SQLiteDatabase.ts src/server/SQLiteStatement.ts tests/guides.test.ts`

```
All matched files use the correct format.
Finished in 612ms on 5 files using 4 threads.
```

exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings src/server/types.ts src/server/SQLiteDatabase.ts src/server/SQLiteStatement.ts tests/guides.test.ts` printed nothing, exit 0.

`npm run check`

```
> tsc --noEmit -p configs/src/tsconfig.server.json
```

exit 0.

3. `npm run docs`

```
rows read: 1, disagreements found: 0
```

`npm run docs -- --to guide`

```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`npm run docs -- --to source`

```
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

4. `grep -c 'A `Shape` cell holds' guides/sqlite.md` → `1`, and
   `grep -n 'A `Shape` cell holds\|^### Types' guides/sqlite.md`:

```
61:### Types
63:A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
```

Every `interface` row's `Shape` cell was read with
`awk -F'|' '/^\| `SQLite/ && $3 ~ /interface/ {print ($4 ~ /:/) ? "COLON: " $2 : "ok " $2}' guides/sqlite.md`:

```
ok  `SQLiteExecuteResult`
ok  `SQLiteDatabaseOptions`
ok  `SQLiteStatementInterface`
ok  `SQLiteDatabaseInterface`
```

`grep -n 'OLD\|EVERY' guides/sqlite.md` printed nothing, exit 1.

5. `diff <(sed -n '209,228p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '212,231p' tests/guides.test.ts)` printed nothing, exit 0. The same diff over the `INTERNAL` doc block
   (`sed -n '34,41p'` against `sed -n '37,44p'`) also printed nothing.

6. `npm run test:guides`

```
 Test Files  1 passed (1)
      Tests  36 passed (36)
   Duration  932ms
```

exit 0.

`npm run test:policy`

```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  849ms
```

exit 0. The skip is the suite's own, unchanged from the baseline reading.

Beyond the criteria, `npm run test:src` reports `Test Files 4 passed (4)` and `Tests 53 passed (53)`,
exit 0, so no code token moved under the doc-block edits.

## Prose sweeps

Pattern `\b(should|simply|easy|easier|just|currently|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy|blacklist|whitelist|sanity check)\b`,
case-insensitive, over `guides/sqlite.md`, `src/server/*.ts`, and `tests/guides.test.ts`: no hit. The
control line `this is just a control line` in `tmp/d7n-sqlite-converge-fix/control.txt` matched in the
same run, so the pattern fires.

Pattern `\b[A-Z]{3,}\b` over the same paths: every remaining hit is a SQL keyword, a `SQLiteErrorCode`
value, a native storage class, or a file or acronym token (`README`, `AGENTS`, `API`, `JSON`, `URL`,
`SQL`, `DDL`, `DSL`, `ORM`, `WAL`), apart from the `NEW` and `OLD` recorded in the observation.

## Deviation state

None. No gate outside the owned files was run, none of the owned gates went red, and every `Shape`
cell is expressible in Ruling 12's idiom.

## Instruments

`tmp/d7n-sqlite-converge-fix/` inside the checkout: `edit-tests.py`, `edit-types.py`,
`edit-classes.py`, `edit-guide.py`, `edit-methods-intro.py`, `control.txt`. Each edit script asserts
its match is unique before writing.
