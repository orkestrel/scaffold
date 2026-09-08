# Report — `d7n-sqlite-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

`### Constants` had no `Shape` column. Added the constants convention sentence and the column, holding the widened type (`number`) rather than the literal type per Ruling 21, for both rows:

```diff
 ### Constants
 
-| API                 | Kind  | Summary                                                                          |
-| ------------------- | ----- | -------------------------------------------------------------------------------- |
-| `SQLITE_CONSTRAINT` | const | Names the SQLite result code whose low byte, `19`, flags a constraint violation. |
-| `SQLITE_BUSY`       | const | Names the SQLite result code whose low byte, `5`, flags a locked-database fault. |
+A `Shape` cell holds the constant's declared type.
+
+| API                 | Kind  | Shape    | Summary                                                                          |
+| ------------------- | ----- | -------- | -------------------------------------------------------------------------------- |
+| `SQLITE_CONSTRAINT` | const | `number` | Names the SQLite result code whose low byte, `19`, flags a constraint violation. |
+| `SQLITE_BUSY`       | const | `number` | Names the SQLite result code whose low byte, `5`, flags a locked-database fault. |
```

Read `src/server/types.ts` for `SQLiteExecuteResult` and `SQLiteDatabaseOptions`: neither declares a call-signature member — both are data-only interfaces — so their `Shape` cells (`{ changes, rowid }` and `{ path?, readonly?, timeout?, foreignKeys?, bigints? }`) already hold every member correctly and carry no `plus`, because there is nothing to move after it. No edit made to either row.

No table lacked `Shape` besides `### Constants`; no row spelled a member's type; no extended-interface row present.

## Item 2 — member references

Sites: none. `npm run docs` reads `disagreements found: 0`, so no `Owner#member` / `#member` drift exists.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

The equality-case region (`const root = …` through the manifest loop's closing brace) already equaled the pilot's byte for byte; confirmed programmatically after the header fix (`EQUAL`).

The header (lines 1 to 3) carried the package's own extra sentence and the "only part a sibling package changes" clause Ruling 21 struck. Replaced with the pilot's exact three lines:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest, and transcribes every flagship fence of
-// `guides/sqlite.md` against the real `@src/server` barrel. The constants that follow are
-// this package's own, and are the only part a sibling package changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

The `INTERNAL` doc block already carried the pilot's sentence verbatim; no change needed. `findDrift` is already called inside the `it` with no per-case budget.

## Item 4 — fence lead-ins (Ruling 21)

Added one sentence between each listed heading and its directly following fence, naming the demonstration:

- `## Surface` — "Creates the database, connects, creates a table, then inserts and queries a row:"
- `### Connect, execute, and round-trip a row` — "Connects, creates a table, inserts a row, and reads it back by id:"
- `### Positional and named parameters` — "Binds parameters positionally or by name:"
- `### Reading: get, all, iterate` — "Reads a single row, every row, or a lazy stream of rows:"
- `### Atomic transactions` — "Runs several statements inside one committed-or-rolled-back scope:"
- `### Long-lived transactions with begin / commit / rollback` — "Opens, holds across awaited caller code, then commits or rolls back a transaction with the primitives directly:"
- `### Branching on a typed fault` — "Catches a native fault and branches on its `code`:"
- `### Pragmas` — "Reads a PRAGMA, then sets and reads it:"
- `### Closing a connection` — "Closes the connection and reads `connected` afterward:"
- `### Production options: readonly, timeout, foreignKeys` — "Opens a connection with `readonly`, `timeout`, `foreignKeys`, and `bigints`:"
- `` ### Disposing with `using` `` — "Releases the connection automatically at the end of a `using` block:"
- `### Retrying on BUSY` — "Catches a `BUSY` fault from a locked database to retry:"
- `### The boundary helpers directly` — "Calls the boundary helpers directly to normalize parameters and wrap a native throw:"

## Item 5 — propagation

`npx oxfmt --write guides/sqlite.md tests/guides.test.ts` ran and reformatted the tables; `npm run docs` reports `rows read: 1, disagreements found: 0`; both `-- --to guide` and `-- --to source` report `written: 0`.

## Acceptance criteria

1. `git status --short`:
```
 M guides/sqlite.md
 M tests/guides.test.ts
```
Owned files only.

2. `grep -n '| interface *| \`{[^\`]*:' guides/sqlite.md` and `grep -n '…' guides/sqlite.md` — both print nothing. Every `Shape` table (`### Types`, `### Constants`) carries its convention sentence between heading and table.

3. The item 3 region diff against the pilot prints nothing (`EQUAL` from the byte-for-byte comparison script); the header lines equal the pilot's (`HEADER MATCH`).

4. `npx oxfmt --check guides/sqlite.md tests/guides.test.ts`:
```
Checking formatting...

All matched files use the correct format.
Finished in 461ms on 2 files using 4 threads.
```
Wall clock: 0.885s. Exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — no output, exit 0. Wall clock: 2.472s.

5. `npm run docs`:
```
rows read: 1, disagreements found: 0
```
Exit 0. `-- --to guide` and `-- --to source` each report `written: 0`.

6. `npm run test:guides`:
```
 Test Files  1 passed (1)
      Tests  36 passed (36)
   Duration  648ms (transform 210ms, setup 28ms, import 377ms, tests 78ms, environment 0ms)
```
Exit 0. Wall clock: 3.445s.

`npm run test:policy`:
```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  968ms (transform 338ms, setup 18ms, import 392ms, tests 301ms, environment 0ms)
```
Exit 0. Wall clock: 2.116s.

## Deviations

None. No `Shape` cell exceeded Ruling 12's expression, the equality case stayed green under the default budget, no gate outside the owned files went red, and `--to guide` closed every disagreement it found (none).
