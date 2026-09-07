# Brief — P.1 `d7n-database-prep` (database's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/database` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b3012ea`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

database's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== database 2026-09-07T16:39:07Z tarball sha256 7c24b68bca15d128
== before
0.0.17
(status end)
== replaced range
101:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 3 packages in 777ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### database (b3012ea, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 38 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupServer.ts(26)
   tests/setup.ts(24)
   tests/setupBrowser.ts(2)
   tests/src/core/helpers.test.ts(1)
   tests/src/core/Database.test.ts(1)
   tests/setupServer.test.ts(1)
   src/core/types.ts(1)
   src/core/helpers.ts(1)
   src/core/drivers/MemoryDriver.ts(1)
   src/browser/drivers/IndexedDBDriver.ts(1)
-- docs
   guides/database.md StorageInterface.migrate: guide absent source absent
   guides/database.md StorageInterface.metadata: guide absent source absent
   guides/database.md StorageInterface.stamp: guide absent source absent
   guides/database.md DriverInterface.open: guide absent source absent
   guides/database.md DriverInterface.close: guide absent source absent
   guides/database.md DriverInterface.snapshot: guide absent source "Captures table rows and returns a repeatable thunk that restores those rows — the primitive transactions are built on."
   guides/database.md DriverInterface.read: guide absent source absent
   guides/database.md DriverInterface.write: guide absent source absent
   guides/database.md DriverInterface.insert: guide absent source absent
   guides/database.md DriverInterface.delete: guide absent source absent
   guides/database.md DriverInterface.keys: guide absent source absent
   guides/database.md DriverInterface.scan: guide absent source absent
   guides/database.md DriverInterface.clear: guide absent source absent
   guides/database.md DriverInterface.records: guide absent source absent
   guides/database.md DriverInterface.aggregate: guide absent source absent
   guides/database.md DriverInterface.stream: guide absent source absent
   guides/database.md DriverInterface.migrate: guide absent source absent
   guides/database.md DriverInterface.metadata: guide absent source absent
   guides/database.md DriverInterface.stamp: guide absent source absent
   guides/database.md DriverInterface.transaction: guide absent source "Opens a native transaction scope — an optional driver hook. The driver owns acquisition, commit or rollback, release, and invalidation of the scoped capability."
   guides/database.md DatabaseInterface.table: guide absent source absent
   guides/database.md DatabaseInterface.import: guide absent source absent
   guides/database.md DatabaseInterface.export: guide absent source absent
   guides/database.md DatabaseInterface.open: guide absent source absent
   guides/database.md DatabaseInterface.close: guide absent source absent
   guides/database.md DatabaseInterface.transaction: guide absent source absent
   guides/database.md DatabaseInterface.migrate: guide absent source "Diffs a caller-supplied deployed schema against this database's declared schema (its `tables`, as configured) through `planMigration`, applies the resulting plan through the driver's optional `migrate` hook, and returns the applied plan."
   guides/database.md DatabaseStorageInterface.table: guide absent source absent
   guides/database.md AdmissionInterface.track: guide absent source absent
   guides/database.md TableInterface.get: guide absent source absent
   guides/database.md TableInterface.resolve: guide absent source absent
   guides/database.md TableInterface.has: guide absent source absent
   guides/database.md TableInterface.keys: guide absent source absent
   guides/database.md TableInterface.records: guide absent source absent
   guides/database.md TableInterface.count: guide absent source "Counts contract-valid rows matching `input`'s conditions."
   guides/database.md TableInterface.aggregate: guide absent source "Computes an aggregate over `column` across rows matching `input`'s conditions."
   guides/database.md TableInterface.scan: guide absent source "Iterates the table's rows lazily with filtering."
   guides/database.md TableInterface.set: guide absent source "Upserts one or more rows."
   guides/database.md TableInterface.add: guide absent source "Inserts one or more rows, throwing `CONFLICT` on a duplicate key."
   guides/database.md TableInterface.update: guide absent source "Applies a partial change to one or more rows."
   guides/database.md TableInterface.remove: guide absent source "Deletes one or more rows."
   guides/database.md TableInterface.clear: guide absent source absent
   guides/database.md TableInterface.query: guide absent source absent
   guides/database.md TableInterface.cursor: guide absent source absent
   guides/database.md QueryInterface.condition: guide absent source absent
   guides/database.md QueryInterface.order: guide absent source absent
   guides/database.md QueryInterface.filter: guide absent source absent
   guides/database.md QueryInterface.limit: guide absent source absent
   guides/database.md QueryInterface.offset: guide absent source absent
   guides/database.md QueryInterface.collect: guide absent source absent
   guides/database.md QueryInterface.find: guide absent source absent
   guides/database.md QueryInterface.count: guide absent source absent
   guides/database.md QueryInterface.stream: guide absent source "Evaluates this query's conditions / filters / offset / limit lazily, row by row."
   guides/database.md QueryInterface.aggregate: guide absent source absent
   guides/database.md CursorInterface.next: guide absent source absent
   guides/database.md CursorInterface.update: guide absent source absent
   guides/database.md CursorInterface.remove: guide absent source absent
   guides/database.md CursorInterface.close: guide absent source absent
   guides/database.md pitch: readme absent tagline "One typed database API that runs unchanged on top of an in-memory map or a persistent JSON file — keyed rows, a fluent query builder, cursors, and whole-store transactions. The unifying idea is that a table is a contract: you declare a `tables` map of `ContractShape`s, and the row type, write-time coercion + validation, JSON-Schema introspection, and seed data all flow from that one declaration — no separate schema, no annotations, no `as`. The design stance is one engine, thin drivers. A backend implements only an irreducible storage primitive — keyed read/write/insert/delete, an ordered `scan`, key listing, and a `snapshot` — and inherits the entire WHERE / order / page / aggregate surface from a single pure query engine in the core. A backend that can go faster (SQL `WHERE`, an index range) implements optional native hooks the engine falls back from; it never re-derives query semantics. So this is deliberately not an ORM and not a query abstraction layer: there is no entity graph, no migration runner, and no raw-SQL escape hatch — only the smallest cross-environment core that earns its keep. Source: `src/core`. Published through `@orkestrel/database`; two persistent drivers ship alongside it — a trusted-mode SQLite driver in `src/server` (surfaced through `@orkestrel/database/server`) with native querying, paging, aggregation, transactions, and atomic migration, and a narrow-then-refine IndexedDB driver in `src/browser` (surfaced through `@orkestrel/database/browser`) that pushes a key-range candidate set down to the index and lets the core engine refine it to the exact result — plus the original I/O-free `MemoryDriver` and file-persisted `JSONDriver`."
   rows read: 1, disagreements found: 204
   exit 1
-- check
   tests/guides.test.ts(639,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(642,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(646,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(661,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(689,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 30 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  30 failed | 54 passed (84)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 59 | summary 52 | banned 7 | tests/setupServer.ts(26) tests/setup.ts(24) tests/setupBrowser.ts(2) tests/src/core/helpers.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for database (taken 2026-09-07T16:39Z by facts.sh)

- Checkout `/home/user/fleet/database`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b3012ea`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 59 | summary 52 | banned 7 | tests/setupServer.ts(26) tests/setup.ts(24) tests/setupBrowser.ts(2) tests/src/core/helpers.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept  | Spec                         | Source                                                                                    | Tests                                                                                                                         |
    9:| -------- | ---------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
    10:| Database | [`database.md`](database.md) | [`src/core`](../src/core), [`src/browser`](../src/browser), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/browser`](../tests/src/browser), [`tests/src/server`](../tests/src/server) |
    14:| Directory     | Guide                        |
    15:| ------------- | ---------------------------- |
    16:| `src/core`    | [`database.md`](database.md) |
    17:| `src/browser` | [`database.md`](database.md) |
    18:| `src/server`  | [`database.md`](database.md) |
- Guide `guides/database.md`: 2461 lines. Headings:
    1:# Database
    30:## Surface
    68:### Factories
    78:### Entities
    89:### Server
    104:### SQL compilation
    134:### Browser
    152:### Errors
    159:### Query engine
    183:### Abort
    189:### Migrations
    202:### Conformance
    210:### Helpers & guards
    231:### Constants
    241:### Types
    285:## Methods
    295:#### `StorageInterface`
    317:#### `DriverInterface`
    345:#### `DatabaseInterface`
    357:#### `DatabaseStorageInterface`
    363:#### `AdmissionInterface`
    372:#### `TableInterface`
    401:#### `QueryInterface`
    420:#### `CursorInterface`
    429:## Contract
    862:## Patterns
    864:### Declaring tables in options
    901:### Swapping the driver
    933:### Keyed CRUD
    970:### Filtered records, count, and aggregate
    992:### Streaming with early exit
    1032:### Abort
    1085:### Batch operations
    1123:### Coercion through the contract
    1150:### Fluent queries
    1300:### Nested fields
    1356:### Cursors
    1390:### Transactions
    1476:### Native transactions
    1514:### Migrations
    1585:### Versioned auto-migrate on open
    1643:### Owning driver metadata
    1747:### Driver conformance
    1760:### Auditing a custom driver
    1781:### Key factories
    1808:### Observing
    1876:### Importing and exporting schemas
    1912:### Introspection & seeding
    1929:### Connecting eagerly
    1962:### Driver primitives
    1995:### Query engine helpers
    2045:### Persistence with the JSON driver
    2102:### Compiling input to SQL
    2155:### Exact-or-refine vs. narrow-then-refine native reads
    2215:### Persistence with the SQLite driver
    2279:### Persistence with the IndexedDB driver
    2341:### IndexedDB pushdown planning
    2386:### IndexedDB error mapping
    2402:### Practices
    2428:## Tests
    2457:## See also
- Table headers in `guides/database.md` (a header row is the row before a `| ---` row):
    70: | API                     | Kind     | Summary                                                                                   |
    80: | Class             | Kind  | Role                                                                                                                                                                            |
    91: | API                          | Kind      | Summary                                                                                                                                                                                                                                                                                                                                                                                    |
    110: | API                       | Kind     | Summary                                                                                                                                  |
    140: | API                        | Kind      | Summary                                                                                                                                                       |
    154: | API               | Kind     | Summary                                                                                                                                  |
    164: | Helper                 | Kind     | Behavior                                                                                                     |
    185: | API          | Kind     | Behavior                                                                                                                                                                      |
    195: | API                      | Kind     | Behavior                                                                                                                                             |
    204: | API             | Kind     | Behavior                                                                                                                                                                    |
    214: | API                      | Kind     | Behavior                                                                                                                                                                                                                   |
    233: | Constant                   | Kind  | Value                                                                                                                                                   |
    243: | Type                       | Kind      | Shape                                                                                                                                                                                                                                                                                                                            |
    301: | Method      | Returns                                | Behavior                                                              |
    325: | Method        | Returns                                | Behavior                                                                                                                |
    347: | Method        | Returns                                     | Behavior                                                                                                                                                                                                                                         |
    359: | Method  | Returns                       | Behavior                                                                                      |
    368: | Method  | Returns      | Behavior                                                                                                           |
    383: | Method      | Returns                              | Behavior                                                                                                                                                           |
    407: | Method      | Returns                        | Behavior                                                                                                       |
    422: | Method   | Returns         | Behavior                                              |
    1282: | Operator  | SQL           |
    1840: | Entity     | Event map          | Events                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
    82:  `Database`        | class
    83:  `DriverIterator`  | class
    84:  `MemoryDriver`    | class
    85:  `JSONDriver`      | class
    86:  `SQLiteDriver`    | class
    87:  `IndexedDBDriver` | class
- H1 blockquote (`guides/database.md`):
    3: > One typed database API that runs unchanged on top of an in-memory map or a
    4: > persistent JSON file — keyed rows, a fluent query builder, cursors, and
    5: > whole-store transactions. The unifying idea is that **a table is a
    6: > contract**: you declare a `tables` map of [`ContractShape`](contract.md)s,
    7: > and the row type, write-time coercion + validation, JSON-Schema
    8: > introspection, and seed data all flow from that one declaration — no
    9: > separate schema, no annotations, no `as`.
    10: >
    11: > The design stance is **one engine, thin drivers**. A backend implements only
    12: > an irreducible storage primitive — keyed read/write/insert/delete, an ordered
    13: > `scan`, key listing, and a `snapshot` — and inherits the entire WHERE /
    14: > order / page / aggregate surface from a single pure query engine in the
    15: > core. A backend that _can_ go faster (SQL `WHERE`, an index range)
    16: > implements optional native hooks the engine falls back from; it never
    17: > re-derives query semantics. So this is deliberately **not** an ORM and not
    18: > a query abstraction layer: there is no entity graph, no migration runner,
    19: > and no raw-SQL escape hatch — only the smallest cross-environment core that
    20: > earns its keep. Source: [`src/core`](../src/core). Published through
    21: > `@orkestrel/database`; two persistent drivers ship alongside it — a trusted-mode
    22: > **SQLite** driver in [`src/server`](../src/server) (surfaced through
    23: > `@orkestrel/database/server`) with native querying, paging, aggregation, transactions, and
    24: > atomic migration, and a narrow-then-refine **IndexedDB** driver in
    25: > [`src/browser`](../src/browser) (surfaced through `@orkestrel/database/browser`) that
    26: > pushes a key-range candidate set down to the index and lets the core engine
    27: > refine it to the exact result — plus the original I/O-free `MemoryDriver`
    28: > and file-persisted `JSONDriver`.
- Opening prose after the blockquote (first two lines):
    30: ## Surface
    32: Declare a `tables` shape map (keys are table names) once, and reach each
- README (`README.md`) first lines:
    # @orkestrel/database
    
    A typed database abstraction for the `@orkestrel` line — one public
    `Database` over internal table/query engines and pluggable storage drivers at
    the seams. Consumers use `TableInterface` and `QueryInterface`. Built to sit beside
    `@orkestrel/contract` (validation) and `@orkestrel/emitter` (observable
    lifecycle), reusing both directly. `TableInterface.cursor()` exposes the
    `CursorInterface` contract for serial bulk mutation.
    
    ## Install
    
    ```sh
- `## Patterns` fences, each with its nearest preceding heading:
    35: fence under "## Surface"
    866: fence under "### Declaring tables in options"
    908: fence under "### Swapping the driver"
    935: fence under "### Keyed CRUD"
    976: fence under "### Filtered records, count, and aggregate"
    1000: fence under "### Streaming with early exit"
    1039: fence under "### Abort"
    1092: fence under "### Batch operations"
    1125: fence under "### Coercion through the contract"
    1152: fence under "### Fluent queries"
    1199: fence under "### Fluent queries"
    1308: fence under "### Nested fields"
    1365: fence under "### Cursors"
    1392: fence under "### Transactions"
    1465: fence under "### Transactions"
    1484: fence under "### Native transactions"
    1525: fence under "### Migrations"
    1563: fence under "### Migrations"
    1597: fence under "### Versioned auto-migrate on open"
    1651: fence under "### Owning driver metadata"
    1676: fence under "### Owning driver metadata"
    1753: fence under "### Driver conformance"
    1767: fence under "### Auditing a custom driver"
    1790: fence under "### Key factories"
    1822: fence under "### Observing"
    1883: fence under "### Importing and exporting schemas"
    1914: fence under "### Introspection & seeding"
    1934: fence under "### Connecting eagerly"
    1968: fence under "### Driver primitives"
    2000: fence under "### Query engine helpers"
    2047: fence under "### Persistence with the JSON driver"
    2109: fence under "### Compiling input to SQL"
    2173: fence under "### Exact-or-refine vs. narrow-then-refine native reads"
    2217: fence under "### Persistence with the SQLite driver"
    2281: fence under "### Persistence with the IndexedDB driver"
    2347: fence under "### IndexedDB pushdown planning"
    2392: fence under "### IndexedDB error mapping"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:36:export function createJSONDriver(path: string): DriverInterface {
    src/server/factories.ts:76:export function createSQLiteDriver(options?: SQLiteDriverOptions): DriverInterface {
    src/browser/factories.ts:32:export function createIndexedDBDriver(name: string): DriverInterface {
    src/core/factories.ts:36:export function createDatabase<const T extends TableMap>(
    src/core/factories.ts:51:export function createMemoryDriver(): DriverInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/drivers/JSONDriver.ts:71:export class JSONDriver implements DriverInterface {
    src/server/drivers/SQLiteDriver.ts:108:export class SQLiteDriver implements DriverInterface {
    src/browser/drivers/IndexedDBDriver.ts:102:export class IndexedDBDriver implements DriverInterface {
    src/core/ScopedIterator.ts:15:export class ScopedIterator<T> implements AsyncIterableIterator<T> {
    src/core/Cursor.ts:12:export class Cursor<T = Row> implements CursorInterface<T> {
    src/core/DriverIterator.ts:33:export class DriverIterator<T> implements AsyncIterableIterator<T> {
    src/core/Query.ts:21:export class Query<T = Row> implements QueryInterface<T> {
    src/core/Database.ts:37:export class Database<T extends TableMap = TableMap> implements DatabaseInterface<T> {
    src/core/drivers/MemoryDriver.ts:49:export class MemoryDriver implements DriverInterface {
    src/core/Table.ts:56:export class Table<T = Row> implements TableInterface<T> {
    src/core/TransactionScope.ts:14:export class TransactionScope implements AdmissionInterface {
    src/core/DatabaseContext.ts:29:export class DatabaseContext implements AdmissionInterface {
    src/core/DatabaseTransaction.ts:28:export class DatabaseTransaction<
    src/core/errors.ts:24:export class DatabaseError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/inferers.ts:1
    src/server/factories.ts:2
    src/server/helpers.ts:9
    src/server/compilers.ts:6
    src/browser/factories.ts:1
    src/browser/helpers.ts:2
    src/core/DriverIterator.ts:1
    src/core/factories.ts:1
    src/core/helpers.ts:14
    src/core/drivers/MemoryDriver.ts:1
    src/core/types.ts:1
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    6:import type { SurfaceSymbol } from '@orkestrel/guide'
    63:} from '@orkestrel/guide'
    99:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    106:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    631:		for (const group of guide.methods()) {
    632:			const members = source.methods(group.interface)
    639:					expect(findMissing(members, group.methods)).toEqual([])
    642:					expect(findMissing(group.methods, members)).toEqual([])
    646:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    661:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    677:		for (const group of guide.methods()) {
    687:							? source.examples(group.interface)
    688:							: source.examples(group.interface).concat(source.examples(entity))
    689:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    701:					expect(findMissing(names, exported)).toEqual([])
    715:			expect(source.methods('TableInterface')).toContain('count')
    716:			expect(source.methods('QueryInterface')).toContain('count')
- `## Tests` paragraph naming checks: 2428:## Tests — 8 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-database-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
