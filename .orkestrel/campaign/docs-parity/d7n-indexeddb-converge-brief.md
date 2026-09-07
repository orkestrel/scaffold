# Brief — P.2 `d7n-indexeddb-converge` (indexeddb under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/indexeddb` from the committed baseline `585a405` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.11`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/indexeddb.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/indexeddb/guides/indexeddb.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-indexeddb-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/indexeddb.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/indexeddb.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/indexeddb.md type KeyPath: guide "A key path — one field, or several for a compound key." source "Represents a key path — one field, or several for a compound key."
guides/indexeddb.md interface IndexDefinition: guide "A secondary index's definition (`name` / `path` / `unique` / `multiple`)." source "Represents a secondary index on a store."
guides/indexeddb.md interface StoreDefinition: guide "A store's schema (`path` / `increment` / `indexes`)." source "Represents a store's schema."
guides/indexeddb.md type IndexedDBSchema: guide "A database's schema — a map of store name to its `StoreDefinition`." source "Represents a database's schema — a map of store name to its `StoreDefinition`."
guides/indexeddb.md interface IndexedDBUpgradeContext: guide "The versionchange upgrade escape hatch (`transaction` / `old` / `version` / `stores` / `indexes`)." source "Represents the escape hatch into a version-change upgrade, passed to `IndexedDBDatabaseOptions.upgrade`."
guides/indexeddb.md interface IndexedDBUpgradeStoreManagerInterface: guide "The upgrade's store manager (`names` / `create` / `drop` / `store`)." source "Represents the store manager of a version-change upgrade."
guides/indexeddb.md interface IndexedDBUpgradeIndexManagerInterface: guide "The upgrade's secondary-index manager (`create` / `drop`)." source "Represents the secondary-index manager of a version-change upgrade."
guides/indexeddb.md interface IndexedDBDatabaseOptions: guide "Options for `createIndexedDBDatabase` (`name` / `version?` / `stores` / `upgrade?`)." source "Represents the options for `createIndexedDBDatabase`."
guides/indexeddb.md interface IndexedDBCursorOptions: guide "Options for opening a cursor (`query` key range, `direction`)." source "Represents the options for opening a cursor."
guides/indexeddb.md type IndexedDBErrorCode: guide "The machine-readable `IndexedDBError` code union." source "Represents a machine-readable `IndexedDBError` code."
guides/indexeddb.md interface IndexedDBDatabaseInterface: guide "The database contract (`database` / `name` / `version` / `stores` / `open`)." source "Represents a browser-native IndexedDB database."
guides/indexeddb.md interface IndexedDBRecordStoreInterface: guide "The keyed record surface the store contracts share; it declares no readonly member." source "Represents the keyed record surface of an object store, in or out of an explicit transaction."
guides/indexeddb.md interface IndexedDBStoreInterface: guide "The object-store contract (`name` / `path` / `indexes` / `increment`) plus `index`." source "Represents an object store — the keyed record surface plus the store's own schema metadata and `index` accessor."
guides/indexeddb.md interface IndexedDBIndexInterface: guide "The secondary-index contract (`name` / `path` / `unique` / `multiple`)." source "Represents a secondary index — read access by an indexed key path."
guides/indexeddb.md interface IndexedDBCursorInterface: guide "The cursor contract (`cursor` / `source` / `key` / `primary` / `value` / `direction`)." source "Represents a promisified value cursor for streaming and in-place mutation."
guides/indexeddb.md interface IndexedDBTransactionInterface: guide "The explicit-transaction contract (`transaction` / `mode` / `stores` / `active` / `finished` / `error`)." source "Represents an explicit transaction over one or more stores."
guides/indexeddb.md interface IndexedDBTransactionStoreInterface: guide "The transaction-bound store contract — the record surface plus the raw `store`." source "Represents an object store bound to an explicit transaction."
guides/indexeddb.md IndexedDBDatabaseInterface.connect: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.store: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.read: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.write: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.close: guide absent source absent
guides/indexeddb.md IndexedDBDatabaseInterface.drop: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.set: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.add: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.clear: guide absent source absent
guides/indexeddb.md IndexedDBRecordStoreInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.set: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.add: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.clear: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.index: guide absent source absent
guides/indexeddb.md IndexedDBStoreInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.primary: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBIndexInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.continue: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.seek: guide absent source "Advances to a given index key and primary key."
guides/indexeddb.md IndexedDBCursorInterface.advance: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.update: guide absent source absent
guides/indexeddb.md IndexedDBCursorInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBTransactionInterface.store: guide absent source absent
guides/indexeddb.md IndexedDBTransactionInterface.abort: guide absent source absent
guides/indexeddb.md IndexedDBTransactionInterface.commit: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.get: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.resolve: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.records: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.keys: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.has: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.count: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.set: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.add: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.remove: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.clear: guide absent source absent
guides/indexeddb.md IndexedDBTransactionStoreInterface.cursor: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeStoreManagerInterface.create: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeStoreManagerInterface.drop: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeStoreManagerInterface.store: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeIndexManagerInterface.create: guide absent source absent
guides/indexeddb.md IndexedDBUpgradeIndexManagerInterface.drop: guide absent source absent
guides/indexeddb.md pitch: readme absent tagline "A lean, typed, Promise-based wrapper over the raw browser `IDBDatabase` / `IDBObjectStore` / `IDBIndex` / `IDBTransaction` API. Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into one you can `await` — and nothing more. It exposes exactly what raw IndexedDB offers natively — object stores, secondary indexes, native key ranges, promisified cursors, and native multi-store transactions — and deliberately nothing else: there is no `where` / `filter` / `order` / aggregate query builder here; that would duplicate a general-purpose query engine this package does not ship. Source: `src/browser`. Surfaced through the `@src/browser` barrel (published as `@orkestrel/indexeddb`)."
rows read: 1, disagreements found: 104
exit 1
```

## Facts for indexeddb (taken 2026-09-07T15:36Z by facts.sh)

- Checkout `/home/user/fleet/indexeddb`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `585a405`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 17 | summary 9 | banned 8 | tests/setupBrowser.ts(11) src/browser/types.ts(3) src/browser/IndexedDBDatabase.ts(2) tests/src/browser/IndexedDBDatabase.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept   | Spec                           | Source                          | Tests                                       |
    9:| --------- | ------------------------------ | ------------------------------- | ------------------------------------------- |
    10:| IndexedDB | [`indexeddb.md`](indexeddb.md) | [`src/browser`](../src/browser) | [`tests/src/browser`](../tests/src/browser) |
    14:| Directory     | Guide                          |
    15:| ------------- | ------------------------------ |
    16:| `src/browser` | [`indexeddb.md`](indexeddb.md) |
- Guide `guides/indexeddb.md`: 457 lines. Headings:
    1:# IndexedDB
    5:## Surface
    32:### Database and factory
    39:### Stores, indexes, cursors, transactions
    49:### Helpers and errors
    70:### Constants
    76:### Types
    103:## Methods
    109:#### `IndexedDBDatabaseInterface`
    120:#### `IndexedDBRecordStoreInterface`
    138:#### `IndexedDBStoreInterface`
    157:#### `IndexedDBIndexInterface`
    170:#### `IndexedDBCursorInterface`
    180:#### `IndexedDBTransactionInterface`
    188:#### `IndexedDBTransactionStoreInterface`
    206:#### `IndexedDBUpgradeStoreManagerInterface`
    214:#### `IndexedDBUpgradeIndexManagerInterface`
    221:## Contract
    237:## Patterns
    239:### Feature-detecting before opening a database
    250:### Index-backed reads with key ranges
    274:### Cursor streaming and in-place mutation
    286:### Seeking an index cursor to one primary key
    298:### Connection lifecycle: connect, close, drop
    311:### Reading, testing, and clearing a store
    321:### Explicit transaction control and cursor movement
    335:### The request-boundary helpers directly
    364:### Branching on a typed fault
    381:### Narrowing a caught value with `isIndexedDBError`
    395:### Versioned upgrades: dropping a store, indexing an existing store, migrating data
    431:### Practices
    441:## Tests
    454:## See also
- Table headers in `guides/indexeddb.md` (a header row is the row before a `| ---` row):
    34: | API                       | Kind     | Summary                                                                   |
    41: | API                         | Kind  | Summary                                                                    |
    51: | API                    | Kind     | Summary                                                                                             |
    72: | API           | Kind  | Summary                                                                          |
    78: | API                                     | Kind      | Summary                                                                                                  |
    111: | Method    | Returns                   | Behavior                                                                 |
    124: | Method    | Returns                                     | Behavior                                              |
    142: | Method    | Returns                                     | Behavior                                              |
    159: | Method    | Returns                                     | Behavior                                             |
    172: | Method     | Returns                                     | Behavior                                                          |
    182: | Method   | Returns                              | Behavior                                                            |
    192: | Method    | Returns                                     | Behavior                                            |
    208: | Method   | Returns                              | Behavior                                                 |
    216: | Method   | Returns | Behavior                                                  |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/indexeddb.md`):
    3: > A lean, typed, Promise-based wrapper over the raw browser `IDBDatabase` / `IDBObjectStore` / `IDBIndex` / `IDBTransaction` API. Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into one you can `await` — and nothing more. It exposes exactly what raw IndexedDB offers natively — object stores, secondary indexes, native key ranges, promisified cursors, and native multi-store transactions — and deliberately nothing else: there is no `where` / `filter` / `order` / aggregate query builder here; that would duplicate a general-purpose query engine this package does not ship. Source: [`src/browser`](../src/browser). Surfaced through the `@src/browser` barrel (published as `@orkestrel/indexeddb`).
- Opening prose after the blockquote (first two lines):
    5: ## Surface
    7: ```ts
- README (`README.md`) first lines:
    # @orkestrel/indexeddb
    
    A typed, Promise-based wrapper over browser IndexedDB — object stores,
    secondary indexes, native key ranges, promisified cursors, and versioned
    schema upgrades, over `await` instead of raw `IDBRequest` events. Part of the
    `@orkestrel` line.
    
    ## Install
    
    ```sh
    npm install @orkestrel/indexeddb
    ```
- `## Patterns` fences, each with its nearest preceding heading:
    7: fence under "## Surface"
    241: fence under "### Feature-detecting before opening a database"
    252: fence under "### Index-backed reads with key ranges"
    276: fence under "### Cursor streaming and in-place mutation"
    288: fence under "### Seeking an index cursor to one primary key"
    300: fence under "### Connection lifecycle: connect, close, drop"
    313: fence under "### Reading, testing, and clearing a store"
    323: fence under "### Explicit transaction control and cursor movement"
    337: fence under "### The request-boundary helpers directly"
    366: fence under "### Branching on a typed fault"
    383: fence under "### Narrowing a caught value with `isIndexedDBError`"
    401: fence under "### Versioned upgrades: dropping a store, indexing an existing store, migrating data"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/browser/IndexedDBIndex.ts:37:export class IndexedDBIndex implements IndexedDBIndexInterface {
    src/browser/factories.ts:36:export function createIndexedDBDatabase<const Stores extends IndexedDBSchema>(
    src/browser/helpers.ts:192:export function createIndex(store: IDBObjectStore, definition: IndexDefinition): void {
    src/browser/IndexedDBCursor.ts:31:export class IndexedDBCursor implements IndexedDBCursorInterface {
    src/browser/IndexedDBTransaction.ts:33:export class IndexedDBTransaction<
    src/browser/IndexedDBStore.ts:44:export class IndexedDBStore implements IndexedDBStoreInterface {
    src/browser/IndexedDBDatabase.ts:48:export class IndexedDBDatabase<
    src/browser/IndexedDBTransactionStore.ts:35:export class IndexedDBTransactionStore implements IndexedDBTransactionStoreInterface {
    src/browser/errors.ts:36:export class IndexedDBError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/browser/IndexedDBIndex.ts:1
    src/browser/factories.ts:1
    src/browser/IndexedDBCursor.ts:1
    src/browser/IndexedDBTransaction.ts:1
    src/browser/IndexedDBStore.ts:1
    src/browser/IndexedDBDatabase.ts:1
    src/browser/IndexedDBTransactionStore.ts:1
    src/browser/types.ts:2
    src/browser/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    44:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    53:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    98:		for (const group of guide.methods()) {
    99:			const members = source.methods(group.interface).map((method) => method.name)
    107:					expect(findMissing(members, documented)).toEqual([])
    110:					expect(findMissing(documented, members)).toEqual([])
    116:							: findMissing(
    117:									source.methods(entity).map((method) => method.name),
    135:				findUnexampled(
    138:					source.examples().map((example) => example.name),
    143:		for (const group of guide.methods()) {
    148:					? source.examples(group.interface).map((example) => example.name)
    152:							.concat(source.examples(entity).map((example) => example.name))
    159:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    171:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 441:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/indexeddb.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/indexeddb.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-indexeddb-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
