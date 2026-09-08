# Report — `d7n-database-close`

Every item landed and every acceptance criterion is green. Wall clock from the first read to the
last gate: 2026-09-08T01:50:00Z to 2026-09-08T02:08:49Z.

Deviation state: none. No stop condition fired.

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

Every listed interface row (`Condition`, `Order`, `QueryInput`, `OperationOptions`,
`ConformanceFinding`, `ColumnSchema`, `TableSchema`, `Migration`, `MigrationInput`,
`DriverMetadata`, `DatabaseOptions`, `SQLiteDriverOptions`, `QueryPlan`, `TableDefinition`) was
checked against its declaration; none carries a call-signature member, so none takes `plus` and
none changed. `DriverInterface extends StorageInterface` is the one genuine extended interface
(Ruling 21) and its added members are all call-signature (`open`, `close`, `snapshot`,
`transaction?`), no own data:

```diff
-| `DriverInterface`          | interface | `{} plus open, close, snapshot, read, write, insert, delete, keys, scan, clear, records?, aggregate?, stream?, migrate?, metadata?, stamp?, transaction?` |
+| `DriverInterface`          | interface | `StorageInterface plus {} plus open, close, snapshot, transaction?` |
```

The Types table's convention sentence gained Ruling 21's addendum:

```diff
 A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an
 optional member and `plus` introducing its call-signature members, and a type alias's own type
-literal with a union's arms escaped as `\|`.
+literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`,
+with the members it adds after.
```

No other `## Surface` table in this guide carries an interface or type row without `Shape`, and
no row spells a member's type or elides with `…`.

## Item 2 — member references

Sites: none. No change.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

The header's lines 2 and 3 did not match the pilot's canon (Ruling 21's amended header):

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest — one row (Database) spanning the
-// core/browser/server faces as a multi-dir `GuideModule` (`.claude/rules/documentation.md`
-// § Parity — one guide per package). The constants that follow are this package's own.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

Line 2 now equals the pilot's byte for byte. The rest of the const-through-manifest-loop region
diffs against the pilot only in additive, positioned content: the `ROOT` binding and the
`entryDirectories` / `entrySurfaces` / `surfaceForDirectory` / `requireDirectorySurface` bindings
(used across multiple cases, so they stay top-level, not moved into one case), and the
`describe('compiler entry surfaces')`, `describe('executable guide fences')`, and
`describe('flagship fences: …')` blocks — each a file-scope package-specific case sitting after
the pilot's README-tagline case and before the manifest loop, per the rule's own wording. Inside
the manifest loop, `documents every published entry export` / `documents only real entry exports`
replace the pilot's `documents every barrel export` / `documents only barrel exports` /
`re-exports only direct declarations` because this guide's one row spans `src/core`, `src/browser`,
and `src/server` as a multi-dir `GuideModule` — a single `source.surface()` cannot answer barrel
membership across three directories, so the package computes it through the compiler-derived
`surface` instead. This structure predates this unit (the prior converge-fix round touched no line
of `tests/guides.test.ts`) and is unchanged here; only the header text was in scope for this item.

## Item 4 — fence lead-ins (Ruling 21)

Every listed fence sat directly under its heading with no lead-in sentence. Each now takes one
sentence between the heading and the fence, naming what the fence demonstrates: Create a database,
Declaring tables in options, Keyed CRUD, Coercion through the contract, Fluent queries,
Transactions, Introspection & seeding, Persistence with the JSON driver, Persistence with the
SQLite driver, and Persistence with the IndexedDB driver.

## Item 5 — all-caps emphasis

Lowered at every listed site across `IndexedDBDriver.ts`, `helpers.ts` (browser), `Table.ts`,
`constants.ts`, `MemoryDriver.ts`, `helpers.ts` (core), `types.ts`, `compilers.ts`,
`JSONDriver.ts`, and `SQLiteDriver.ts`, to the word each sentence carries, keeping the contrast
(`OWN` → `own`, `AFTER` → `after`, `BOTH` → `both`, `SUPERSET` → `superset`, `SECONDARY` →
`secondary`, `NESTED` → `nested`, `DECLARED` → `declared`, and so on). A few unlisted sites inside
the same sentence or paragraph as a listed site were carried along for readability (for example
`src/browser/helpers.ts:50`'s `KEY`, `src/core/Table.ts:50`'s `KEY`, `src/core/helpers.ts:134`'s
`COUNT`) — same defect, same sentence, no code token moved.

Closing sweep: pattern `\b[A-Z]{3,}\b` over `guides/database.md` and `src/**/*.ts` (globstar).
Every remaining hit is data: SQL keywords (`SQL`, `WHERE`, `ORDER`, `CREATE`, `TABLE`, `SELECT`,
`FROM`, `INDEX`, `EXISTS`, `LIMIT`, `OFFSET`, `BETWEEN`, `LIKE`, `GLOB`, `NULL`, `NOT`, `TEXT`,
`INTEGER`, `REAL`, `BLOB`, `NUMERIC`, `CHAR`, `CLOB`, `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`,
`RELEASE`, `INSERT`, `DELETE`, `ALTER`, `ADD`, `COLUMN`, `DROP`, `PRIMARY KEY`, `AND`, `OR`, `ASC`,
`DESC`, `SUM`, `AVG`, `MIN`, `MAX`, `COUNT(*)`); `BINARY` is the SQLite collation name and `WAL` a
`journal_mode` value; `CONFLICT`, `DRIVER`, `ABORTED`, `VALIDATION`, `MIGRATION`, `CLOSED`,
`CONFORMANCE`, `QUOTA`, `BUSY`, `CONSTRAINT`, `UNKNOWN` are `DatabaseError` codes and their raw
backend equivalents; `UPGRADE`, `READONLY`, `INVALID`, `DATA`, `OPEN`, `INACTIVE` are the
wrapper's `IndexedDBError` codes named in `mapIndexedDBError`'s `case` labels and its surrounding
prose; `ENOENT`, `ENOTDIR`, `EACCES` are Node error codes; `JSON`, `API`, `CRUD`, `IDB`, `ORM`,
`DSL`, `UTF`, `UUID`, `ASCII`, `POSIX` are acronyms; `README` and `AGENTS` are filenames; `PRAGMA`
is the SQLite statement keyword (`server/types.ts:35`). `src/server/compilers.ts:140-146`'s
`MATCH` cells and `:166`'s `MATCH-on-null-or-absent` are the truth table's own notation, unchanged
by this closing sweep and outside the listed sites. `src/core/types.ts:520`'s `OPEN` /
`:525`'s `CLOSED` name Contract's open/closed object-type distinction, a defined term rather than
decorative emphasis, and were left as found — neither is in the listed sites.

## Item 6 — `above` as a pointer

```diff
-`value` / `index` / `done`, stay in the Surface rows above — `emitter` is the
+`value` / `index` / `done`, stay in the preceding Surface rows — `emitter` is the
```

## Item 7 — propagation

```text
$ npx oxfmt --write guides/database.md tests/guides.test.ts
Finished in 1523ms on 2 files using 4 threads.

$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Acceptance criteria

### 1. `git status --short` lists owned files only

```text
 M guides/database.md
 M src/browser/drivers/IndexedDBDriver.ts
 M src/browser/helpers.ts
 M src/core/Table.ts
 M src/core/constants.ts
 M src/core/drivers/MemoryDriver.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/compilers.ts
 M src/server/drivers/JSONDriver.ts
 M src/server/drivers/SQLiteDriver.ts
 M tests/guides.test.ts
```

`README.md`, `package.json`, `package-lock.json`, every vendored file, and `src/**` code tokens are
untouched (`git diff -- src/ | grep -E '^[-+]' | grep -v '^[-+][-+]' | grep -vE '^[-+][[:space:]]*(\*|//|/\*\*)'`
prints nothing, exit 1).

### 2. `Shape` convention and no elision in a cell

```text
$ grep -n '| interface *| `{[^`]*:' guides/database.md
(no output, exit 1)

$ grep -n '…' guides/database.md
493, 1112, 2195 — none inside a Shape cell (a code comment and a helper's own JSDoc list)
```

### 3. Item 3 region diff

Line 2 equals the pilot's byte for byte (quoted under § Item 3). The remaining diff is the
pre-existing multi-dir accommodation quoted under § Item 3, not touched by this unit.

### 4. Format and lint

```text
$ npx oxfmt --check guides/database.md tests/guides.test.ts
All matched files use the correct format.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0

$ npx oxfmt --check <the 10 owned src/**/*.ts paths>
All matched files use the correct format.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings <the 10 owned src/**/*.ts paths>
exit 0

$ npm run check:src:core && npm run check:src:browser && npm run check:src:server
exit 0 (all three)
```

### 5. `npm run docs` at zero; both write directions at `written: 0`

Quoted under § Item 7.

### 6. The suites

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  87 passed (87)
   Duration  40.97s
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  970ms
exit 0
```

## Instruments

Under `tmp/d7n-database-close/` in this checkout: `oxfmt-write.log.txt`, `oxfmt-check.log.txt`,
`oxfmt-check-src.log.txt`, `oxlint.log.txt`, `oxlint-src.log.txt`, `docs.log.txt`,
`docs-to-guide.log.txt`, `docs-to-source.log.txt`, `guides.log.txt`, `policy.log.txt`,
`check-core.log.txt`, `check-browser.log.txt`, `check-server.log.txt`.
