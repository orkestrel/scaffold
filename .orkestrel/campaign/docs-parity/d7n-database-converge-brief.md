# Brief — P.2 `d7n-database-converge` (database under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/database` from the committed baseline `6dd2ebe` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/database.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/database/guides/database.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-database-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/database.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/database.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/database.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/database.md function createDatabase: guide "Create a `DatabaseInterface` over a driver and a `tables` shape map." source "Creates a database over a driver and a declared `tables` schema."
guides/database.md function createMemoryDriver: guide "Create the in-memory reference `DriverInterface` (nested maps, no I/O)." source "Creates the in-memory reference `DriverInterface`."
guides/database.md function createJSONDriver: guide "Create a persistent JSON-file `DriverInterface` for a given path." source "Creates a persistent JSON-file `DriverInterface` for the core database layer."
guides/database.md function createSQLiteDriver: guide "Create a trusted-mode, server-native SQLite `DriverInterface` for a path (or `:memory:`)." source "Creates a trusted-mode SQLite `DriverInterface` for the core database layer."
guides/database.md function createIndexedDBDriver: guide "Create a persistent IndexedDB `DriverInterface` for a browser database name." source "Creates a persistent IndexedDB `DriverInterface` for the core database layer."
guides/database.md class Database: guide absent source "Exposes a typed view over one shared internal lifecycle and storage context."
guides/database.md class DriverIterator: guide absent source "Forms the internal continuation boundary for a root driver async iterator."
guides/database.md class MemoryDriver: guide absent source "Implements the reference `DriverInterface` — nested maps, no I/O."
guides/database.md class JSONDriver: guide absent source "Implements a persistent `DriverInterface` backed by a single JSON file — the reference `MemoryDriver` plus file load / flush."
guides/database.md class SQLiteDriver: guide absent source "Implements the `DriverInterface` over SQLite — the server-native, trusted-mode backend built on the published `@orkestrel/sqlite` synchronous wrapper."
guides/database.md class IndexedDBDriver: guide absent source "Implements the `DriverInterface` over IndexedDB — the persistent browser backend, built on the published `@orkestrel/indexeddb` wrapper."
guides/database.md const METADATA_TABLE: guide "The reserved single-row table name (`_metadata`) `SQLiteDriver` stamps its `DriverMetadata` into — a user table named `_metadata` collides with it." source "Names the reserved metadata table the `SQLiteDriver` creates on `open` to persist its stamped `DriverMetadata` (`version` + declared schema JSON) — the SQLite realization of the `metadata` / `stamp` driver hooks."
guides/database.md function matchesConditionExactly: guide "Whether one `Condition` is provably SQL-vs-engine identical. `absent`/`present` refine only when a column is both optional and nullable; every scalar condition refines when it is optional or nullable. Otherwise equality and `starts`/`ends` are exact over supported scalar storage, while ranges exclude `text` because SQLite code-point order differs from JavaScript UTF-16 order." source "Reports whether one `Condition` compiles to SQL that is PROVABLY identical to the core engine's `matchesCondition` for every value its column's declared type can store."
guides/database.md function matchesOrderExactly: guide "Whether one `Order` term is provably exact — only a required, non-null, flat `integer`/`real`/`boolean` column qualifies; optional, nullable, text, and nested terms refine." source "Reports whether one `Order` term's column compiles to an `ORDER BY` that matches the engine's `sortRows` exactly."
guides/database.md function matchesQueryExactly: guide "Whether every condition and order term in a `QueryInput` is exact — the gate `SQLiteDriver` checks before trusting a native SQL path over a full-scan refine." source "Reports whether a whole `QueryInput` is exact — every condition and every order term is exact. `limit` / `offset` never affect exactness (SQL `LIMIT` / `OFFSET` are always engine-identical)."
guides/database.md function matchesDeclaredStorage: guide "Whether an operand's runtime type matches a column's declared exact type (text↔string, integer/real↔finite number, boolean↔boolean) — backs `matchesConditionExactly`." source "Reports whether a value's runtime type matches a column's declared exact type — the operand side of the declared-type-trust proof."
guides/database.md const EXACT_COLUMN_STORAGE: guide "The declared `ColumnStorage`s whose SQL EQUALITY / `starts`/`ends` comparisons are provably engine-exact under declared-type trust (`text` / `integer` / `real` / `boolean`)." source "Lists the declared `ColumnStorage`s whose SQL EQUALITY comparisons (`equals` / `not` / `any` / `none`) and `starts` / `ends` compiles are provably engine-exact under declared-type trust — `text` / `integer` / `real` / `boolean`; a `json` or `blob` column always refines instead."
guides/database.md const EXACT_RANGE_COLUMN_STORAGE: guide "The declared `ColumnStorage`s whose SQL RANGE comparisons and `ORDER BY` are provably engine-exact (`integer` / `real` / `boolean` — `text` is excluded; see `matchesConditionExactly`)." source "Lists the declared `ColumnStorage`s whose SQL RANGE comparisons (`above` / `below` / `from` / `to` / `between`) and `ORDER BY` compiles are provably engine-exact — `integer` / `real` / `boolean` only. `text` is excluded: see `EXACT_COLUMN_STORAGE`'s remarks for the BINARY-collation (code-point) vs. JS `<` (code-unit) divergence on supplementary-plane characters."
guides/database.md function extractValues: guide "Extract a `SQLiteRow`'s values in declared positional binding order; throws a typed `DRIVER` error when a requested column is missing." source "Extracts a stored row's values in a declared positional order."
guides/database.md function deriveSQLiteIndexName: guide "Derive a collision-free, length-prefixed SQL index name from a table and its column list (`idx_<len>_<table>_<len>_<col>…`) — used by `schemaToIndexes` and `stepToSQL`." source "Builds a collision-free SQL index name for a table + column-group index — shared by the compiler module's `schemaToIndexes` and `stepToSQL`, so a plan-built index name always matches one `open` would have created."
guides/database.md interface SQLiteDriverOptions: guide "`{ path?, readonly?, timeout?, references?, pragmas? }` — the options bag `createSQLiteDriver` accepts; `references` toggles foreign-key enforcement." source "Options for `createSQLiteDriver`."
guides/database.md function inferValueStorage: guide "The `ColumnStorage` a nested (`json_extract`) operand encodes as, derived from its runtime value." source "Reads the storage type a nested (`json_extract`) operand encodes as from its RUNTIME value — NOT `json`."
guides/database.md function compileJSONTypeSQL: guide "Compile a nested `FieldPath` to its `json_type(<col>, <path>)` SQL expression — disambiguates a present JSON `null` from an absent path." source "Compiles a NESTED `FieldPath` to the `json_type(<col>, <path>)` SQL expression — the `compileFieldSQL` `json_extract` sibling used to tell a PRESENT JSON `null` apart from an ABSENT path (both read back as SQL `NULL` through `json_extract`, but `json_type` reports `'null'` for the former and SQL `NULL` for the latter)."
guides/database.md function compileConditionSQL: guide "Compile one `Condition` to its parameterized SQL fragment plus bound values." source "Compiles one condition to its `<column> <operator>` SQL fragment and the parameters it binds — engine-exact under SQL's three-valued NULL logic."
guides/database.md function compileWhereSQL: guide "Fold conditions into one `WHERE …` clause, parenthesized left-to-right to match the engine's fold." source "Folds the conditions into one WHERE clause, parenthesizing progressively left-to-right so the grouping matches the engine's `matchesQuery` fold."
guides/database.md function compileOrderSQL: guide "Compile the `ORDER BY …` clause, always ending with the primary key as tie-breaker." source "Compiles the ORDER BY clause from the order terms, always ending with the primary key as the final determinant."
guides/database.md function compilePageSQL: guide "Compile the `LIMIT` / `OFFSET` clause." source "Compiles the LIMIT / OFFSET clause."
guides/database.md function compileQuerySQL: guide "Compile a `QueryInput` into the full SQL clause (`WHERE` + `ORDER BY` + `LIMIT`) plus bound parameters." source "Compiles a `QueryInput` into the SQL clause that follows a table name, with its bound parameters in clause order."
guides/database.md function quoteIdentifier: guide "Quote a SQL identifier (table / column name), doubling an embedded quote." source "Quotes a SQL identifier (a table or column name) so any characters are literal."
guides/database.md function compileFieldSQL: guide "Compile a `FieldPath` to the SQL expression that reads it (a column, or a `json_extract` path)." source "Compiles a `FieldPath` to the SQL expression that reads it."
guides/database.md function compileColumnSQL: guide "Map a portable `ColumnStorage` to its SQLite column type keyword." source "Maps a portable `ColumnStorage` to its SQLite column type."
guides/database.md function compileAggregateSQL: guide "Compile an `AggregateOperation` over a `FieldPath` to its SQL aggregate expression." source "Compiles an `AggregateOperation` over a `FieldPath`."
guides/database.md function matchesAggregateExactly: guide "Test whether SQLite can execute one aggregate with the core engine's exact semantics." source "Reports whether SQLite can execute an aggregate exactly like the core engine."
guides/database.md function matchesSQLiteAffinity: guide "Test a native declared SQLite type against one portable `ColumnStorage` affinity." source "Checks a declared SQLite type against a portable storage affinity."
guides/database.md function matchesAbsentPath: guide "Whether a caught filesystem error reports that nothing is there to read." source "Reports whether a caught filesystem error says that nothing is there to read."
guides/database.md function encodeValue: guide "Encode a JS value to its stored `SQLiteValue` for a column's type — total, never throws." source "Encodes a JS value to its stored `SQLiteValue` for a declared column."
guides/database.md function decodeValue: guide "Decode a stored `SQLiteValue` back to its JS value — the exact inverse of `encodeValue`." source "Decodes a stored `SQLiteValue` back to its JS value for a declared column — the exact inverse of `encodeValue`."
guides/database.md function encodeRow: guide "Encode a whole `Row` to a `SQLiteRow` by its table's schema." source "Encodes a whole `Row` to a `SQLiteRow` by its table's schema."
guides/database.md function decodeRow: guide "Decode a stored `SQLiteRow` back to a `Row` by its table's schema (absent columns omitted)." source "Decodes a stored `SQLiteRow` back to a `Row` by its table's schema."
guides/database.md function schemaToTable: guide "Project a `TableSchema` to its `CREATE TABLE IF NOT EXISTS` statement." source "Projects a `TableSchema` to its `CREATE TABLE IF NOT EXISTS` statement."
guides/database.md function schemaToIndexes: guide "Project a `TableSchema` to its `CREATE INDEX IF NOT EXISTS` statements." source "Projects a `TableSchema` to its declared SQLite indexes."
guides/database.md function stepToSQL: guide "Project one `MigrationStep` to the DDL statement(s) `SQLiteDriver.migrate` executes for it." source "Projects one `MigrationStep` to SQLite DDL."
guides/database.md function selectPlan: guide "Plan an IndexedDB read for a `QueryInput` — pick the index (or primary store) and `IDBKeyRange` to narrow by, falling back to a full scan." source "Plans an IndexedDB read for a `QueryInput` — picks the index (or the primary store) and `IDBKeyRange` to narrow by, falling back to a full scan."
guides/database.md function conditionToRange: guide "The `IDBKeyRange` one `Condition` maps to when its operator is an exact key comparison over a scalar operand, else `undefined`." source "Translates one `Condition` to the `IDBKeyRange` it maps to, when its operator is one of the exact key comparisons over scalar operands; otherwise returns `undefined`."
guides/database.md const INDEXABLE_STORAGE: guide "The declared `ColumnStorage`s that are valid, orderable IndexedDB keys (`text` / `integer` / `real`), as a frozen array." source "Lists the declared `ColumnStorage`s that are valid, orderable IndexedDB keys."
guides/database.md const METADATA_STORE: guide "The reserved out-of-line store name (`__metadata__`) `IndexedDBDriver` stamps its `DriverMetadata` into — a user table named `__metadata__` collides with it." source "Names the reserved out-of-line store the `IndexedDBDriver` stamps its `DriverMetadata` into."
guides/database.md interface QueryPlan: guide "`{ index?, range? }` — the optional index and `IDBKeyRange`; an empty object selects a full store scan." source "Represents a pushdown plan — an optional index and optional `IDBKeyRange` used to narrow a read. An omitted `index` selects the primary store; an omitted `range` performs a full scan. The plan is always a superset of the matching rows; the core engine refines it to the exact result. An empty plan (`{}`) is a primary-store full scan."
guides/database.md function mapIndexedDBError: guide "Map a backend `IndexedDBError` fault to its `DatabaseError` equivalent — no raw wrapper error crosses `IndexedDBDriver`'s `DriverInterface` surface." source "Maps a backend `IndexedDBError` to the portable `DatabaseError` taxonomy — the default mapping used everywhere except inside `migrate()`."
guides/database.md function mapMigrationError: guide "Map a backend `IndexedDBError` fault from `migrate`'s versionchange path to its `DatabaseError` equivalent (remaps `UPGRADE` to `MIGRATION`)." source "Maps a backend `IndexedDBError` to the portable `DatabaseError` taxonomy for use INSIDE `migrate()` — the one context where `UPGRADE` means the migration itself failed, not a generic driver fault."
guides/database.md function deriveIndexedDBIndexName: guide "Derive an IndexedDB index name from a column list — a single column is the bare name, a compound list is length-prefixed (`'2#1:a1:b'`-style)." source "Derives an IndexedDB index name for a declared column group — a bare column name for a single-column index, a deterministic collision-free encoding for a compound one."
guides/database.md function schemaToStore: guide "Project a `TableSchema` to the IndexedDB store definition used by an ordered versionchange migration." source "Projects a table schema into the IndexedDB wrapper's store definition."
guides/database.md class DatabaseError: guide "Carries a `DatabaseErrorCode` (`CLOSED` / `NOT_FOUND` / `CONFLICT` / `VALIDATION` / `ABORTED` / `MIGRATION` / `CONFORMANCE` / `DRIVER`)." source "Represents an error thrown by the database layer."
guides/database.md function isDatabaseError: guide "Narrow an unknown caught value to a `DatabaseError`." source "Narrows an unknown caught value to a `DatabaseError`."
guides/database.md function compareValues: guide absent source "Compares two arbitrary values under one total order — the comparator behind sorting and the range operators."
guides/database.md function matchesCondition: guide absent source "Evaluates one `Condition` against a row — the per-operator predicate."
guides/database.md function matchesQuery: guide absent source "Folds a row through a list of conditions, joining each by its connector."
guides/database.md function sortRows: guide absent source "Sorts rows by an ordering specification, leaving the input untouched."
guides/database.md function applyQuery: guide absent source "Applies a `QueryInput` to rows — filter, then sort, then page."
guides/database.md function validatePage: guide absent source "Validates the paging fields of a portable query."
guides/database.md function computeAggregate: guide absent source "Computes an aggregate over a column across rows."
guides/database.md function extractKey: guide absent source "Reads a row's primary key from a column, when it is a usable `Key`."
guides/database.md function bindRowKey: guide absent source "Returns a fresh row whose primary column is authoritatively bound to its storage key."
guides/database.md function shapeToColumnSchema: guide absent source "Projects one contract shape into a portable column schema."
guides/database.md function findColumn: guide absent source "Reads one flat column's declaration out of a table schema."
guides/database.md function resolvePrimary: guide absent source "Resolves the primary-key column one table keys its rows by."
guides/database.md function requireColumns: guide absent source "Requires one declared table's columns out of a table map."
guides/database.md function shapeToColumnStorage: guide absent source "Maps a column's `ContractShape` to its portable `ColumnStorage` — the value a `TableSchema` carries so a native backend can declare a real column."
guides/database.md function filterRows: guide absent source "Filters rows by a list of conditions — the shared basis for a table's count and aggregate paths (no sort/page, unlike `applyQuery`)."
guides/database.md function equalsValue: guide absent source "Compares two values structurally by SameValueZero leaves — the comparator behind conformance checks and any test/fixture that needs \"same data\", not \"same reference\"."
guides/database.md function checkAbort: guide absent source "Throws when an `AbortSignal` has fired — the shared abort gate checked at operation boundaries and between streamed rows."
guides/database.md function planMigration: guide absent source "Diffs a deployed and a declared table set structurally into a `Migration` plan."
guides/database.md function migrateRows: guide absent source "Applies one table's `MigrationStep`s to its rows — a pure row transform."
guides/database.md function projectMigrationSchema: guide absent source "Projects migration steps sequentially over a canonical validated owned schema. Adding a required non-null column to an existing table rejects with `MIGRATION`; optional-only and nullable-only additions remain portable."
guides/database.md function normalizeDriverSchema: guide absent source "Canonicalizes an unknown driver schema into a distinct deeply frozen snapshot."
guides/database.md function conformDriver: guide absent source "Runs the driver-conformance battery, throwing on the first violated invariant — the fail-fast entry point most callers (test setup, CI smoke checks) want."
guides/database.md function scanDriver: guide absent source "Walks the driver-conformance battery against a fresh `DriverInterface` per phase, yielding one `ConformanceFinding` per violated invariant — the shared invariant suite every backend (in-memory, SQLite, IndexedDB) must uphold to be a drop-in `DriverInterface`."
guides/database.md function auditDriver: guide absent source "Runs the FULL driver-conformance battery and collects every violation — the audit entry point for a driver author who wants a complete report rather than a single fail-fast throw."
guides/database.md function cloneDriverMetadata: guide absent source "Clones unknown driver metadata into a distinct deeply frozen snapshot."
guides/database.md function matchesWildcardPattern: guide absent source "Matches a value against a wildcard pattern in LINEAR time — the shared, ReDoS-SAFE engine behind `matchesLikePattern` and `matchesGlobPattern`."
guides/database.md function matchesLikePattern: guide absent source "Matches a value against a SQL `LIKE` pattern, folding case."
guides/database.md function matchesGlobPattern: guide absent source "Matches a value against a `GLOB` pattern, preserving case."
guides/database.md function isDriverMetadata: guide absent source "Checks whether a value is persisted driver metadata."
guides/database.md function isDriverSchema: guide absent source "Checks whether a value is a complete portable driver schema."
guides/database.md function isColumnSchema: guide absent source "Checks whether a value is a portable column schema."
guides/database.md function isTableSchema: guide absent source "Checks whether a value is a portable table schema."
guides/database.md function isMigrationStep: guide absent source "Checks whether a value is one ordered migration step."
guides/database.md function isMigration: guide absent source "Checks whether a value is an ordered migration plan."
guides/database.md function isMigrationInput: guide absent source "Checks whether a value is one atomic migration request."
guides/database.md function isKey: guide absent source "Checks whether a value is a usable database key."
guides/database.md function cloneDriverSchema: guide absent source "Clones unknown driver schema into a distinct deeply frozen snapshot."
guides/database.md function cloneMigrationInput: guide absent source "Clones unknown migration input into a distinct deeply frozen snapshot."
guides/database.md const DEFAULT_PRIMARY: guide absent source "Supplies the primary-key column assumed when `PrimaryMap` does not name one."
guides/database.md const MAX_PATTERN_LENGTH: guide absent source "Sets the longest `LIKE` / `GLOB` pattern the wildcard matcher accepts before rejecting it."
guides/database.md const CONFORMANCE_USERS_SCHEMA: guide absent source "Describes the `users` table the driver-conformance battery opens — keyed by the default `id` primary column."
guides/database.md const CONFORMANCE_POSTS_SCHEMA: guide absent source "Describes the `posts` table the driver-conformance battery opens — keyed by a non-`id` `slug` primary column."
guides/database.md const CONFORMANCE_SCHEMA: guide absent source "Holds the fixed two-table schema every driver-conformance phase opens."
guides/database.md type Key: guide absent source "Represents a primary key — the value identifying a row within its table."
guides/database.md type KeyFunction: guide absent source "Represents a key-generating function."
guides/database.md type Row: guide absent source "Represents a table row — a plain record of column values keyed by column name."
guides/database.md type ConditionOperator: guide absent source "Represents a WHERE operator — the comparison a single `Condition` applies."
guides/database.md type ConditionConnector: guide absent source "Names how a `Condition` joins to the running result of the conditions before it."
guides/database.md interface Condition: guide absent source "Represents one compiled WHERE condition."
guides/database.md type OrderDirection: guide absent source "Names a sort direction."
guides/database.md interface Order: guide absent source "Represents one ordering term — a column (`FieldPath`, flat or nested) and its direction."
guides/database.md interface QueryInput: guide absent source "Represents a serializable read specification — everything a backend needs to compile one read, free of JS callbacks so any backend can honor it."
guides/database.md type AggregateOperation: guide absent source "Names an aggregate computed over a numeric column."
guides/database.md interface OperationOptions: guide absent source "Options for an abortable operation."
guides/database.md type DatabaseStatus: guide absent source "Names the lifecycle state of a `DatabaseInterface`."
guides/database.md interface AdmissionInterface: guide absent source "Represents the admission boundary a scoped operation enters before it runs."
guides/database.md type DatabaseErrorCode: guide absent source "Names a machine-readable `DatabaseError` code."
guides/database.md interface ConformanceFinding: guide absent source "Represents one violated invariant from the driver-conformance battery."
guides/database.md type DatabaseEventMap: guide absent source "Describes the push observation surface of a `DatabaseInterface` — the connection + transaction lifecycle a fire-and-forget observer (logging, metrics, tracing, cache invalidation) subscribes to."
guides/database.md type TableEventMap: guide absent source "Describes the push observation surface of a `TableInterface` — the per-row mutation moments a fire-and-forget observer (cache invalidation, sync, an audit log) subscribes to, ALONGSIDE the database-level `DatabaseEventMap`."
guides/database.md type ColumnMap: guide absent source "Represents one table's columns — a map of column name to its value `ContractShape`."
guides/database.md type TableMap: guide absent source "Represents a database's table schema — a map of table name to its `ColumnMap`."
guides/database.md type RowOf: guide absent source "Represents the row type a table's `ColumnMap` describe — `Infer` of the `objectShape` the database wraps them in."
guides/database.md type PrimaryMap: guide absent source "Holds per-table primary-key column overrides — `{ [table]: column }`."
guides/database.md type IndexMap: guide absent source "Holds per-table secondary indexes — `{ [table]: groups }`, each group one (possibly compound) index of column names."
guides/database.md type ColumnStorage: guide absent source "Names a portable storage type for a column — the backend maps it to its native type (SQLite affinity, an IndexedDB value). Derived from a column's `ContractShape` by `shapeToColumnStorage`; `json` covers object/array/union/raw values a backend stores as JSON text and can `json_extract` for nested-field queries."
guides/database.md interface ColumnSchema: guide absent source "Represents one column of a `TableSchema` — its name, portable `ColumnStorage`, and whether it independently accepts absence (`optional`) and explicit `null` (`nullable`)."
guides/database.md interface TableSchema: guide absent source "Represents a backend-agnostic description of one table — what `open` hands each driver so a native backend can create real tables and indexes."
guides/database.md type MigrationStep: guide absent source "Represents one step of a `Migration` plan — a single schema change applied to one table."
guides/database.md interface Migration: guide absent source "Represents a schema migration plan — an ordered set of `MigrationStep`s moving a database from one schema version to another."
guides/database.md interface MigrationInput: guide absent source "Represents one atomic migration request."
guides/database.md interface StorageInterface: guide absent source "Declares the storage operations available only inside a driver's transaction scope."
guides/database.md interface DriverMetadata: guide absent source "Represents persisted schema metadata a versioning driver owns as an immutable snapshot."
guides/database.md interface DriverInterface: guide absent source "Declares the storage primitive every backend implements — the whole of the bridge."
guides/database.md interface DatabaseOptions: guide absent source "Options for `createDatabase`."
guides/database.md interface CompiledSQL: guide absent source "Represents a parameterized SQL fragment or statement plus its bind values."
guides/database.md interface TableDefinition: guide absent source "Represents one table's portable definition, produced by `export` — the unit of schema / migration exchange across environments."
guides/database.md interface DatabaseStorageInterface: guide absent source "Represents a database view valid only inside one `DatabaseInterface.transaction` scope."
guides/database.md interface DatabaseInterface: guide absent source "Represents a database — the ergonomic entry point that owns the driver and its tables."
guides/database.md interface TableInterface: guide absent source "Exposes typed keyed CRUD plus fluent query and cursor access."
guides/database.md interface QueryInterface: guide absent source "Builds a read through a fluent chain."
guides/database.md interface CursorInterface: guide absent source "Walks a table's rows forward for bulk in-place mutation."
guides/database.md StorageInterface.read: guide absent source absent
guides/database.md StorageInterface.write: guide absent source absent
guides/database.md StorageInterface.insert: guide absent source absent
guides/database.md StorageInterface.delete: guide absent source absent
guides/database.md StorageInterface.keys: guide absent source absent
guides/database.md StorageInterface.scan: guide absent source absent
guides/database.md StorageInterface.clear: guide absent source absent
guides/database.md StorageInterface.records: guide absent source absent
guides/database.md StorageInterface.aggregate: guide absent source absent
guides/database.md StorageInterface.stream: guide absent source absent
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
```

## Facts for database (taken 2026-09-07T17:00Z by facts.sh)

- Checkout `/home/user/fleet/database`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `6dd2ebe`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    632:			const members = source.methods(group.interface).map((method) => method.name)
    640:					expect(findMissing(members, documented)).toEqual([])
    643:					expect(findMissing(documented, members)).toEqual([])
    649:							: findMissing(
    650:									source.methods(entity).map((method) => method.name),
    668:				findUnexampled(
    671:					source.examples().map((example) => example.name),
    689:		for (const group of guide.methods()) {
    694:					? source.examples(group.interface).map((example) => example.name)
    698:							.concat(source.examples(entity).map((example) => example.name))
    705:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    717:					expect(findMissing(names, exported)).toEqual([])
    731:			expect(source.methods('TableInterface').map((method) => method.name)).toContain('count')
    732:			expect(source.methods('QueryInterface').map((method) => method.name)).toContain('count')
- `## Tests` paragraph naming checks: 2428:## Tests — 8 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-database-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/database.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/database.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-database-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
