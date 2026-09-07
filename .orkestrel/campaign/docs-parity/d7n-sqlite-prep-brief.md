# Brief — P.1 `d7n-sqlite-prep` (sqlite's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/sqlite` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `beb4158`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

sqlite's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== sqlite 2026-09-07T15:15:24Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
77:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 884ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### sqlite (beb4158, version 0.0.10, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 28 unchanged, 0 removed in ..
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
   src/server/types.ts(1)
   src/server/SQLiteDatabase.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(104,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(107,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(111,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(126,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(141,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  8 failed | 25 passed (33)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 2 | summary 0 | banned 2 | src/server/types.ts(1) src/server/SQLiteDatabase.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for sqlite (taken 2026-09-07T15:15Z by facts.sh)

- Checkout `/home/user/fleet/sqlite`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `beb4158`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    97:			const members = source.methods(group.interface)
    104:					expect(findMissing(members, group.methods)).toEqual([])
    107:					expect(findMissing(group.methods, members)).toEqual([])
    111:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    126:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    129:		for (const group of guide.methods()) {
    139:							? source.examples(group.interface)
    140:							: source.examples(group.interface).concat(source.examples(entity))
    141:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    153:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 277:## Tests — 4 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.10"` → `"version": "0.0.11"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-sqlite-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
