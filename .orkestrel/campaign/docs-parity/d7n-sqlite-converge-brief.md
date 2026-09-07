# Brief — P.2 `d7n-sqlite-converge` (sqlite under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/sqlite` from the committed baseline `555609c` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.11`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/sqlite.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/sqlite/guides/sqlite.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-sqlite-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/sqlite.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/sqlite.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/sqlite.md function createSQLiteDatabase: guide "A synchronous SQLite database over `node:sqlite` (defaults `:memory:`)." source "Creates a synchronous SQLite database over `node:sqlite`."
guides/sqlite.md class SQLiteDatabase: guide "The database — `connect` / `close` / `execute` / `prepare` / `transact` / `begin` / `commit` / `rollback` / `pragma`; readonly `path`, `connected`, and `transacting`." source "Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync`."
guides/sqlite.md class SQLiteStatement: guide "A prepared statement — `execute` / `get` / `all` / `iterate`." source "Represents a prepared statement over `node:sqlite`'s `StatementSync` — the only way the wrapper runs SQL."
guides/sqlite.md const SQLITE_CONSTRAINT: guide "SQLite result code (low byte `19`) `wrapError` masks the `errcode` against to flag a constraint violation." source "Names the SQLite result code for a constraint violation."
guides/sqlite.md const SQLITE_BUSY: guide "SQLite result code (low byte `5`) `wrapError` masks the `errcode` against to flag a locked-database fault." source "Names the SQLite result code for a locked-database fault."
guides/sqlite.md function wrapError: guide "The boundary conversion from a thrown native `node:sqlite` error to a typed `SQLiteError`." source "Converts a thrown native `node:sqlite` error into a typed `SQLiteError`."
guides/sqlite.md function bindParameters: guide "The normalization of `SQLiteParameters` to a native call's positional-spread or named shape." source "Normalizes `SQLiteParameters` to the binding shape a native `StatementSync` call expects."
guides/sqlite.md class SQLiteError: guide "A wrapper error carrying a machine-readable `code` (`CLOSED` / `CONSTRAINT` / `BUSY` / `INVALID` / `UNKNOWN`)." source "Represents an error thrown by the SQLite wrapper."
guides/sqlite.md function isSQLiteError: guide "Whether a value is a `SQLiteError`." source "Checks whether a value is a `SQLiteError`."
guides/sqlite.md type SQLiteValue: guide "A value SQLite stores and returns natively (`null` / number / bigint / string / `Uint8Array`)." source "Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge."
guides/sqlite.md type SQLiteRow: guide "A result row — a record of column name to `SQLiteValue`." source "Represents a result row — a record of column name to `SQLiteValue`."
guides/sqlite.md type SQLiteParameters: guide "Bind parameters — positional (an array) or named (a record)." source "Represents the bind parameters for a prepared statement — positional (an array, bound to `?`) or named (a record, bound to bare `:name` placeholders)."
guides/sqlite.md type SQLiteBinding: guide "The normalized binding shape a native call expects — `{ positional }` or `{ named }`." source "Represents the normalized binding shape a native `StatementSync` call expects — what `SQLiteParameters` become on the way into `node:sqlite`."
guides/sqlite.md interface SQLiteExecuteResult: guide "The outcome of a non-query statement (`changes` / `rowid`) — `number` (a count / rowid past 2^53 truncates, acceptable for keys and changes)." source "Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL)."
guides/sqlite.md type SQLiteErrorCode: guide "The machine-readable `SQLiteError` code union." source "Represents a machine-readable `SQLiteError` code."
guides/sqlite.md interface SQLiteDatabaseOptions: guide "Options for `createSQLiteDatabase` (`path` / `readonly` / `timeout` / `foreignKeys` / `bigints`)." source "Represents the options for `createSQLiteDatabase`."
guides/sqlite.md interface SQLiteStatementInterface: guide "The prepared-statement contract." source "Represents a prepared statement — the only way the wrapper runs SQL (no query DSL; the core database layer owns querying, exactly as the IndexedDB wrapper does)."
guides/sqlite.md interface SQLiteDatabaseInterface: guide "The database contract." source "Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync` — a lean, typed layer whose one runtime dependency is `@orkestrel/contract`, exposing prepared statements, transactions, and pragmas. Synchronous because `node:sqlite` is; `@orkestrel/database`'s SQLite driver adapts it to that package's asynchronous driver contract."
guides/sqlite.md SQLiteDatabaseInterface.connect: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.close: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.execute: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.prepare: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.transact: guide absent source absent
guides/sqlite.md SQLiteDatabaseInterface.begin: guide absent source "Opens a transaction (`BEGIN`). Throws the native fault — including a nested `BEGIN` while one is already open — as a `SQLiteError`. Branch on `SQLiteDatabaseInterface.transacting` first rather than catching this when composing a transaction alongside others (see the Practices section in `guides/sqlite.md`)."
guides/sqlite.md SQLiteDatabaseInterface.commit: guide absent source "Commits the open transaction (`COMMIT`); throws the native fault as a `SQLiteError` when none is open."
guides/sqlite.md SQLiteDatabaseInterface.rollback: guide absent source "Rolls back the open transaction (`ROLLBACK`); throws the native fault as a `SQLiteError` when none is open."
guides/sqlite.md SQLiteDatabaseInterface.pragma: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.execute: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.get: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.all: guide absent source absent
guides/sqlite.md SQLiteStatementInterface.iterate: guide absent source absent
guides/sqlite.md pitch: readme absent tagline "A lean, typed, synchronous wrapper over Node's built-in `node:sqlite` — one runtime dependency, `@orkestrel/contract`, for boundary narrowing — a thin typed skin on `DatabaseSync` / `StatementSync`. It surfaces exactly SQLite's native power — prepared statements, transactions, and pragmas — and deliberately no query / filter / sort / aggregate builder: it is the raw native handle, not an ORM, so a caller reaching for typed querying builds that layer on top. Source: `src/server`. Surfaced through the `@src/server` barrel. Requires Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`, `isTransaction`, and `readBigInts` options and `StatementSync.iterate`)."
rows read: 1, disagreements found: 32
exit 1
```

## Facts for sqlite (taken 2026-09-07T15:36Z by facts.sh)

- Checkout `/home/user/fleet/sqlite`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `555609c`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 0 | banned 2 | src/server/types.ts(1) src/server/SQLiteDatabase.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec                     | Source                        | Tests                                     |
    9:| ------- | ------------------------ | ----------------------------- | ----------------------------------------- |
    10:| SQLite  | [`sqlite.md`](sqlite.md) | [`src/server`](../src/server) | [`tests/src/server`](../tests/src/server) |
    14:| Directory    | Guide                    |
    15:| ------------ | ------------------------ |
    16:| `src/server` | [`sqlite.md`](sqlite.md) |
- Guide `guides/sqlite.md`: 288 lines. Headings:
    1:# SQLite
    5:## Surface
    22:### Factories
    28:### Entities
    35:### Constants
    42:### Helpers and errors
    51:### Types
    67:## Methods
    75:#### `SQLiteDatabaseInterface`
    89:#### `SQLiteStatementInterface`
    98:## Contract
    112:## Patterns
    114:### Connect, execute, and round-trip a row
    127:### Positional and named parameters
    141:### Reading: get, all, iterate
    149:### Atomic transactions
    158:### Long-lived transactions with begin / commit / rollback
    178:### Branching on a typed fault
    192:### Pragmas
    200:### Closing a connection
    207:### Production options: readonly, timeout, foreignKeys
    225:### Disposing with `using`
    235:### Retrying on BUSY
    249:### The boundary helpers directly
    264:### Practices
    277:## Tests
    285:## See also
- Table headers in `guides/sqlite.md` (a header row is the row before a `| ---` row):
    24: | API                    | Kind     | Summary                                                                 |
    30: | API               | Kind  | Summary                                                                                                                                                                |
    37: | API                 | Kind  | Summary                                                                                                    |
    44: | API              | Kind     | Summary                                                                                                        |
    53: | API                        | Kind      | Summary                                                                                                                                       |
    77: | Method     | Returns                    | Behavior                                                                                                   |
    91: | Method    | Returns                       | Behavior                                                                            |
- Rows of any `### Entities` table (the Kind cell):
    32:  `SQLiteDatabase`  | class
    33:  `SQLiteStatement` | class
- H1 blockquote (`guides/sqlite.md`):
    3: > A lean, typed, **synchronous** wrapper over Node's built-in [`node:sqlite`](https://nodejs.org/api/sqlite.html) — one runtime dependency, `@orkestrel/contract`, for boundary narrowing — a thin typed skin on `DatabaseSync` / `StatementSync`. It surfaces exactly SQLite's native power — prepared statements, transactions, and pragmas — and deliberately no query / filter / sort / aggregate builder: it is the raw native handle, not an ORM, so a caller reaching for typed querying builds that layer on top. Source: [`src/server`](../src/server). Surfaced through the `@src/server` barrel. Requires Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`, `isTransaction`, and `readBigInts` options and `StatementSync.iterate`).
- Opening prose after the blockquote (first two lines):
    5: ## Surface
    7: ```ts
- README (`README.md`) first lines:
    # @orkestrel/sqlite
    
    A typed, synchronous SQLite wrapper for the `@orkestrel` line — a thin skin
    over Node's built-in `node:sqlite` (`DatabaseSync` / `StatementSync`) giving
    prepared statements, transactions, and pragmas, with a single runtime
    dependency: `@orkestrel/contract`, used for its boundary narrowing.
    
    Node marks `node:sqlite` experimental. On Node 22.22.2, importing this package
    prints `ExperimentalWarning: SQLite is an experimental feature and might change
    at any time`.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    7: fence under "## Surface"
    116: fence under "### Connect, execute, and round-trip a row"
    129: fence under "### Positional and named parameters"
    143: fence under "### Reading: get, all, iterate"
    151: fence under "### Atomic transactions"
    160: fence under "### Long-lived transactions with begin / commit / rollback"
    180: fence under "### Branching on a typed fault"
    194: fence under "### Pragmas"
    202: fence under "### Closing a connection"
    209: fence under "### Production options: readonly, timeout, foreignKeys"
    227: fence under "### Disposing with `using`"
    237: fence under "### Retrying on BUSY"
    251: fence under "### The boundary helpers directly"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/server/factories.ts:26:export function createSQLiteDatabase(options?: SQLiteDatabaseOptions): SQLiteDatabaseInterface {
    src/server/SQLiteStatement.ts:32:export class SQLiteStatement implements SQLiteStatementInterface {
    src/server/SQLiteDatabase.ts:30:export class SQLiteDatabase implements SQLiteDatabaseInterface {
    src/server/errors.ts:33:export class SQLiteError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/factories.ts:1
    src/server/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    45:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    51:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    96:		for (const group of guide.methods()) {
    97:			const members = source.methods(group.interface).map((method) => method.name)
    105:					expect(findMissing(members, documented)).toEqual([])
    108:					expect(findMissing(documented, members)).toEqual([])
    114:							: findMissing(
    115:									source.methods(entity).map((method) => method.name),
    133:				findUnexampled(
    136:					source.examples().map((example) => example.name),
    141:		for (const group of guide.methods()) {
    152:							? source.examples(group.interface).map((example) => example.name)
    156:									.concat(source.examples(entity).map((example) => example.name))
    157:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    169:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 277:## Tests — 4 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/sqlite.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/sqlite.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-sqlite-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
