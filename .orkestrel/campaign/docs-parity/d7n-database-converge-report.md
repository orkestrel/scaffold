# Report — P.2 `d7n-database-converge`

`guides/database.md` passes the equality gate. `npm run docs` exits 0 at `rows read: 1,
disagreements found: 0`; `--to guide` and `--to source` each read `written: 0`. Wall clock from the
first command to the last: 2026-09-07T20:25:26Z to 2026-09-07T20:54:26Z, 29 minutes.

## Acceptance criteria

### 1. Red-first, on the unconverged tree

`npm run test:guides` after the gate cases landed and before any convergence — `Test Files 1
failed (1) | Tests 3 failed | 84 passed (87)`, exit 1. Each failing case's first lines, verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/database.md pairs: guide [\"Surface\",\"Declaring tables in options\",\"Swapping the driver\",…] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:181:20
    181|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Database > keeps every compared summary and example equal to its source
AssertionError: expected [ …(203) ] to deeply equal []
+   "guides/database.md function createDatabase: guide \"Create a `DatabaseInterface` over a driver and a `tables` shape map.\" source \"Creates a database over a driver and a declared `tables` schema.\"",
+   "guides/database.md function createMemoryDriver: guide \"Create the in-memory reference `DriverInterface` (nested maps, no I/O).\" source \"Creates the in-memory reference `DriverInterface`.\"",
+   "guides/database.md class Database: guide absent source \"Exposes a typed view over one shared internal lifecycle and storage context.\"",
```

The full log is retained at `/home/user/fleet/database/tmp/d7n-database-converge/redfirst.log.txt`.

No lint control was planted. The gate cases read red against the tree as committed at `6dd2ebe`,
so nothing needed reversal.

### 2. Table headers and the class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, or `Returns`.

- `Behavior` renamed to `Summary` in the `### Query engine`, `### Abort`, `### Migrations`,
  `### Conformance`, and `### Helpers & guards` tables and in every `## Methods` table.
- `### Entities` became `### Classes` (its every row's `Kind` is `class`) and its `Role` header
  became `Summary`. The `## Methods` intro sentence naming `## Entities` now names `### Classes`.
- `### Errors` keeps its heading: it mixes a class row and a function row.
- `### Constants` gained a `Shape` column holding each constant's declared type (`'id'`, `1024`,
  `TableSchema`, `TableSchema`, `readonly TableSchema[]`) and a `Summary` column; its convention
  sentence is `A `Shape` cell holds the constant's declared type.`, the wording router, table, and
  test already carry.
- `### Types` gained `Summary` as its last column, and its convention sentence is Ruling 15's
  fleet-wide wording.
- The first column's header text is untouched everywhere (`API`, `Class`, `Helper`, `Constant`,
  `Type`, `Method`).

Every class the guide documents carries a row in `### Classes`; the guide documents no class under
its own H3.

Non-`Summary` cells against `git show HEAD:guides/database.md`, through
`tmp/d7n-database-converge/cells.mjs` (splits on a pipe not preceded by a backslash):

```text
rows compared: 190, non-final cells mismatched: 0, rows missing after: 0, rows after: 190
```

The comparison reads every cell but each row's last, so it covers `API`/`Class`/`Type`/`Method`,
`Kind`, and `Returns`. The `Shape` column is the column this unit rewrote and is reported next.

### 3. Doc blocks rewritten, then propagated

`npm run docs -- --to guide` → `rows read: 1, disagreements found: 158, written: 157, reported: 1`
(the pitch is the reported row: the seed prints `the README pitch is authored by hand`). A second
`--to guide` pass after the all-caps corrections → `written: 3`. `npx oxfmt --write` ran after each
write.

**`Shape` cells.** No Types row kept its baseline cell verbatim: each carried a prose clause after
an em dash, a member list, or pure prose.

- The declaration's literal stayed and only the trailing clause moved out: `Key`, `KeyFunction`,
  `Row`, `ConditionConnector`, `Condition`, `OrderDirection`, `Order`, `QueryInput`,
  `OperationOptions`, `AggregateOperation`, `DatabaseStatus`, `DatabaseErrorCode`,
  `ConformanceFinding`, `ColumnMap`, `TableMap`, `PrimaryMap`, `IndexMap`, `ColumnStorage`,
  `ColumnSchema`, `TableSchema`, `Migration`, `MigrationInput`, `DriverMetadata`, `DatabaseOptions`,
  `CompiledSQL`, `TableDefinition`.
- The cell carried prose, a member list, or a name rather than the declaration's literal, so the
  cell was written from the declaration: `ConditionOperator`, `AdmissionInterface` (`{ accepting,
  track }` → `{ accepting } plus track`), `DatabaseEventMap`, `TableEventMap`, `RowOf` (`RowOf<C>` →
  `Infer<{ category: 'object'; properties: C }>`), `MigrationStep`, `StorageInterface`,
  `DriverInterface`, `DatabaseStorageInterface`, `DatabaseInterface`, `TableInterface`,
  `QueryInterface`, `CursorInterface`.

**Rows moved between tables.** `SQLiteDriverOptions` left `### Server` and `QueryPlan` left
`### Browser` for `### Types`, beside `CompiledSQL`, the server type the Types table already
carried. Ruling 15 heads a `## Surface` table `Shape` where it carries an interface or type-alias
row; after the move those two tables carry none, so neither needs a `Shape` column whose cell would
be empty for every function and constant row. Recorded as an ancillary decision.

**Description paragraphs rewritten by hand** (the compared text changed):

| Declaration | Why |
| --- | --- |
| `createJSONDriver` | The cell's `for a given path` is the summary a table scanner needs; the block read `for the core database layer`. |
| `createSQLiteDriver` | Same, plus the cell's `server-native` and its `:memory:` default. |
| `createIndexedDBDriver` | Same, for `a browser database name`. |
| `projectMigrationSchema` | Ruling 7: the reference sentence about the `MIGRATION` rejection moved to `@remarks`. |
| `matchesConditionExactly` | `PROVABLY` → `provably`. |
| `inferValueStorage` | `from its RUNTIME value — NOT `json`` → `from its runtime value, never as `json``. |
| `matchesWildcardPattern` | `LINEAR` → `linear`, `ReDoS-SAFE` → `ReDoS-safe`. |

**`@remarks` extended so a cell's fact survived propagation** (Ruling 7, every sentence kept):
`Database` (the class), `OperationOptions`, `ConformanceFinding`, `CONFORMANCE_SCHEMA`,
`conformDriver`, `cloneDriverMetadata`, `cloneDriverSchema`, `cloneMigrationInput`, `isColumnSchema`,
`isTableSchema`, `isDriverSchema`, `isMigrationStep`, `isMigration`, `isMigrationInput`,
`isDriverMetadata`, `matchesOrderExactly`, `matchesQueryExactly`, `compileFieldSQL`,
`schemaToIndexes`, `stepToSQL`, `schemaToStore`.

**Member doc blocks written where neither side carried one** — the seed's first worklist read
`guide absent source absent` for each: `StorageInterface.{read,write,insert,delete,keys,scan,clear,
records,aggregate,stream,migrate,metadata,stamp}`, `DriverInterface.{open,close}`,
`DatabaseInterface.{table,import,export,open,close,transaction}`,
`DatabaseStorageInterface.table`, `AdmissionInterface.track`,
`TableInterface.{get,resolve,has,keys,records,clear,query,cursor}`,
`QueryInterface.{condition,order,filter,limit,offset,collect,find,count,aggregate}`,
`CursorInterface.{next,update,remove,close}`.

**Facts landed in the guide's prose beside their table**, because no compared block can hold them:

| Site | Fact |
| --- | --- |
| `#### StorageInterface` intro | Every method runs inside the scope, and each shares one description with its `DriverInterface` twin. |
| `#### DriverInterface` intro | `open` builds real tables and indexes on a native backend and reads `name` alone on a scan-only one; `snapshot` with no `tables` captures the whole store; an omitted optional hook falls back to the core engine over `scan`, and a driver without `transaction` runs on the snapshot floor (linking § Native transactions). |
| `#### DatabaseInterface` intro (new) | `transaction` and `migrate` each take an optional `OperationOptions`, checked once at entry. |
| `#### DatabaseStorageInterface` intro (new) | The scoped view and its tables throw `CONFLICT` after the transaction settles. |
| `#### TableInterface` intro | Which members take an optional `OperationOptions`, and the aborted-batch semantics. |
| `#### QueryInterface` intro | `stream` takes an optional `OperationOptions` and ignores `order`. |

**Voice sweep over the owned prose.** All-caps emphasis corrected in `guides/database.md` at the
native-read paragraphs (`ONLY`, `ONE`), the emitter paragraphs (`NOT`, `AFTER`, `NEVER`, `OWN`),
the optional-hook paragraph (`EVERY`), and the nested-field fence comment (`NOT a path`). SQL
keywords (`CREATE TABLE IF NOT EXISTS`, `IS NOT NULL`) are data and stay. Counts in prose
corrected: `the two tables` names its members, `Both drivers implement `migrate?`` names
`SQLiteDriver` and `IndexedDBDriver`, `both implementors are internal` became `every implementor is
internal`, and `one of two ways` became `by proving exactness or by narrowing then refining`. `both`
kept where the sentence names its members (`both directions` of a bijection, `both coerces and
enforces`, the two index derivers named in the same parenthesis).

### 4. The titled pair

- **Guide side:** the fence under `## Surface`, given the heading `### Create a database` directly
  above it per Ruling 9. `grep -n '^#\+ Create a database' guides/database.md` matched nothing
  before the edit, so the heading text is unique heading-scoped. The fence body carries no
  three-backtick run and no doc-comment terminator: `sed -n '36,60p' guides/database.md | grep
  '```\|\*/'` matched only the fence's own opening and closing lines.
- **Source side:** the `@example` on `createDatabase` in `src/core/factories.ts`, titled
  `@example Create a database`.
- **Which declaration.** The primary factory is `createDatabase`: it is the package's entry point
  and the declaration the flagship `## Surface` fence demonstrates. The facts block lists
  `createJSONDriver` first only because it walks `src/server` before `src/core`. Recorded as an
  ancillary decision.
- **Ruling 14.** The fence demonstrated more than the block — it held the row handle, the `get`
  read, and the fluent `query()` chain the block lacked — so the block was extended to the fence.
  No line was deleted from either side.
- **Runs.** Titling the block first, `npm run docs` → `rows read: 1, disagreements found: 1`, the
  pair naming both bodies. Then `npm run docs -- --to source` → `wrote src/core/factories.ts` /
  `rows read: 1, disagreements found: 1, written: 1, reported: 0`. `--to source` ran last, after the
  summaries already read zero.

Every other `@example` stays untitled.

### 5. The tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text, with no link and no bold:

```text
> One typed database API for keyed rows, fluent queries, cursors, and
> whole-store transactions, running unchanged over an in-memory map, a JSON
> file, SQLite, or IndexedDB.
```

`README.md` carries that blockquote verbatim under its H1, with the same line breaks.

The displaced sentences fold into the guide's opening prose after the blockquote, in paragraphs the
tagline's clauses do not restate: a table is a contract and what flows from that one declaration;
the one-engine, thin-drivers stance with the irreducible primitive, the optional native hooks, and
the not-an-ORM boundary; and the source and publication paragraph naming `src/core`,
`@orkestrel/database`, the SQLite driver in `src/server`, the IndexedDB driver in `src/browser`, and
the `MemoryDriver` and `JSONDriver` beside them. The blockquote's `two persistent drivers` is gone —
the sentence now reads `The persistent drivers ship alongside it`.

**The README's onboarding was rewritten rather than kept.** The original opened `A typed database
abstraction for the `@orkestrel` line`, which restates the tagline's clauses, and named `Database`
as its product noun — a class `tests/guides.test.ts` lists in `INTERNAL` because the barrel does not
export it. The replacement names only public exports:

```text
Declare your tables with the `createDatabase` function, hold each
`TableInterface` it hands back, and reach rows by key or through the fluent
`query()` builder. `TableInterface.cursor()` opens the `CursorInterface`
contract for serial bulk mutation. Built on `@orkestrel/contract` for
validation and `@orkestrel/emitter` for the observation surface, reusing both
directly. Part of the `@orkestrel` line.
```

Recorded as an ancillary decision. Every other README section is untouched.

### 6. The seed readings

```text
$ npm run docs
rows read: 1, disagreements found: 0
exit 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

### 7. Gates

```text
$ npx oxfmt --check guides/database.md README.md src tests/guides.test.ts     exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src tests/guides.test.ts exit 0
$ npm run check                                                              exit 0
$ npm run test:guides    Test Files 1 passed (1) | Tests 87 passed (87)       exit 0
$ npm run test:policy    Test Files 1 passed (1) | Tests 90 passed | 1 skipped (91)  exit 0
```

Observation, the narrowest unit script:

```text
$ npm run test:src:core  Test Files 14 passed (14) | Tests 371 passed (371)   exit 0
```

The three gate cases are green inside that `test:guides` run: `pairs at least one example title
across the guide and the source`, `opens the README with the guide tagline`, and `Database > keeps
every compared summary and example equal to its source`.

### 8. `git status --short`

```text
 M README.md
 M guides/database.md
 M src/browser/factories.ts
 M src/browser/helpers.ts
 M src/core/Database.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/compilers.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/inferers.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`, and
`tests/src/**` are untouched. The instruments live under `tmp/d7n-database-converge/`, which git
ignores.

Every `src/**` change is comment-only; no code token moved:

```text
$ git diff -- src/ | grep -E '^[-+]' | grep -v '^[-+][-+]' | grep -vE '^[-+][[:space:]]*(\*|//|/\*\*)'
(no output)
```

## The gate cases

In `tests/guides.test.ts`, in this file's own header and helpers:

- `findDrift` imported beside the existing `@orkestrel/guide` readers.
- `GUIDE_SPEC` at file scope holds `guides/database.md`; the pin and the README case both read it.
- `own` binds the manifest row for `GUIDE_SPEC` through `requireValue`.
- `ROOT_FILES` gained `README.md`, and its comment now reads `Root-level files these checks read.`
- The pin, `pairs at least one example title across the guide and the source`, at file scope in the
  pilot's form: the guard-and-continue loop with no local type predicate, and the both-sides failure
  line `${GUIDE_SPEC} pairs: guide [...] source [...]`.
- The README case, `opens the README with the guide tagline`, with `not.toBeUndefined()` on each
  side before `toBe`.
- The equality case, `keeps every compared summary and example equal to its source`, inside the
  manifest loop's `describe(entry.concept)` block, directly after the methods loop and before
  `documents an example for every Surface function`, collecting
  `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent` for an undefined side.

Ruling 13's two corrections landed: the header line reads `The constants that follow are this
package's own.`, and the `INTERNAL` doc block reads `the assertion that follows it fails when a name
here stops being stranded`.

## § Tests

The `tests/guides.test.ts` row in `## Tests` gained the equality gate, named descriptively with no
SQ/MQ/EQ/RQ identifier: every `Summary` cell against its declaration's description paragraph, the
titled `Create a database` fence against the `@example` block of that title (pinned so the titled
pair cannot be retired silently), and the README pitch against the guide's tagline. It also names
the fence compilation and the flagship-fence assertions the file already runs.

## Reader and seed observations

No reader or seed defect. Two readings the fleet's next unit needs:

1. **`source.methods` resolves an inherited member to the parent's doc block.** `DriverInterface
   extends StorageInterface`, and a description written on `StorageInterface.read` is the source
   side of `DriverInterface.read` too, so both `## Methods` tables must carry identical `Summary`
   text for every shared member. Measured directly, with only `StorageInterface.read` documented:

   ```text
   guides/database.md StorageInterface.read: guide "Read one row by key inside the transaction." source "Reads one row by key inside the transaction."
   guides/database.md DriverInterface.read: guide "Read one row by key." source "Reads one row by key inside the transaction."
   ```

   Every shared description is therefore scope-neutral here, and the scoping moved into the two
   sections' intro prose.

2. **`--to guide` reports the pitch rather than writing it**, with the reason inline:

   ```text
   guides/database.md pitch: readme absent tagline "One typed database API that runs unchanged …"; the README pitch is authored by hand
   ```

   Expected: the pitch is the unit's to write, and it converged by hand.

## Deviation state

None. No stop condition fired: every cell the seed located after the header change, the titled body
fits its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, no
reader returned an undescribed shape, and no residual disagreement survived a doc-block rewrite.

## Ancillary decisions

- `SQLiteDriverOptions` and `QueryPlan` moved into `### Types`, beside `CompiledSQL`.
- `createDatabase` carries the title, not `createJSONDriver`.
- `### Create a database` sits directly above the fence; the sentence introducing the fence sits
  above the heading and now ends with a period rather than a colon.
- The Constants convention sentence is the constants sentence alone.
- The README onboarding was rewritten.
- The all-caps sweep covered each description paragraph this unit rewrote and both Markdown files;
  `@remarks` bodies of blocks whose description did not change were left as written.
