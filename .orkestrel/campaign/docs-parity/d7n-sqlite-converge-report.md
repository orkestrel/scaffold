# Report — `d7n-sqlite-converge`

Wall clock: 2026-09-07T15:36:57Z to 2026-09-07T15:46:20Z.

Owned files only; `git status --short` lists `README.md`, `guides/sqlite.md`,
`src/server/{SQLiteDatabase,SQLiteStatement,constants,errors,factories,helpers,types}.ts`,
`tests/guides.test.ts`. Diffstat: 10 files changed, 223 insertions(+), 120 deletions(-).

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` — `Tests 3 failed | 33 passed (36)`.

The pin, `pairs at least one example title across the guide and the source`:

```
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/sqlite.md pairs: guide [\"Surface\",\"Connect, execute, and round-trip a row\",\"Positional and named parameters\",\"Reading: get, all, iterate\",\"Atomic transactions\",\"Long-lived transactions with begin / commit / rollback\",\"Branching on a typed fault\",\"Pragmas\",\"Closing a connection\",\"Production options: readonly, timeout, foreignKeys\",\"Disposing with using\",\"Retrying on BUSY\",\"The boundary helpers directly\"] source []",
```

The README case, `opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:110:20
    110|  expect(pitch).not.toBeUndefined()
```

The equality case, `SQLite > keeps every compared summary and example equal to its source`:

```
AssertionError: expected [ …(31) ] to deeply equal []
+   "guides/sqlite.md function createSQLiteDatabase: guide \"A synchronous SQLite database over `node:sqlite` (defaults `:memory:`).\" source \"Creates a synchronous SQLite database over `node:sqlite`.\"",
+   "guides/sqlite.md class SQLiteDatabase: guide \"The database — `connect` / `close` / …\" source \"Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync`.\"",
+   … 29 further lines, then:
+   "guides/sqlite.md SQLiteStatementInterface.iterate: guide absent source absent",
```

The three cases sit in `tests/guides.test.ts` in the pilot's shapes: `GUIDE_SPEC = 'guides/sqlite.md'`
and `own` at file scope, `README.md` added to `ROOT_FILES`, `findDrift` imported beside the existing
readers, the equality case inside the manifest loop's `describe(entry.concept)` block, the pin in the
inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate), and the
README case with `not.toBeUndefined()` on each side before `toBe`.

## Criterion 2 — the headers and the class rows

Every table now heads `Summary` beside only `Kind` or `Returns`
(`guides/sqlite.md` lines 33, 39, 46, 53, 62, 86, 100). Two header cells moved, both `Behavior` to
`Summary`, at baseline lines 77 and 91 (`#### \`SQLiteDatabaseInterface\`` and
`#### \`SQLiteStatementInterface\``). No `Shape`, `Signature`, or `Value` column exists in this
guide, so no row's literal had to stay in `Shape` and the `Shape` convention sentence is inert here.

`### Entities` became `### Classes` (baseline line 28, now line 37): every row's `Kind` is `class`.
`### Helpers and errors` keeps its heading — its rows are `function`, `function`, `class`, `function`,
a mixed table. No class in this package is documented under its own H3, so no `### Classes` table had
to be added and the table already carries `SQLiteDatabase` and `SQLiteStatement`.

Non-`Summary` cell comparison against `git show HEAD:guides/sqlite.md`, split on a pipe not preceded
by a backslash:

```
rows baseline 38, rows now 38, non-Summary cells mismatched: 0
final-column header changes: [('Behavior', 'Summary'), ('Behavior', 'Summary')]
```

The `pragma` row's `` `SQLiteValue \| undefined` `` cell survives intact.

## Criterion 3 — the doc blocks and the propagation

Rewritten by hand, each verb-first, each because the cell carried information the block lacked or
because Ruling 7 splits reference material out of the description:

- `createSQLiteDatabase` (`factories.ts`) — the description gained the `:memory:` default the cell carried.
- `SQLITE_CONSTRAINT`, `SQLITE_BUSY` (`constants.ts`) — each description gained the low-byte value the cell carried (`19`, `5`); the masking stays in `@remarks`.
- `wrapError` (`helpers.ts`) — gained "at the wrapper's one boundary"; the `@remarks` sentence the description now repeats ("The single boundary mapping for the wrapper.") was pruned.
- `bindParameters` (`helpers.ts`) — gained "a positional spread, or a single named record".
- `SQLiteError` (`errors.ts`) — gained the code union; the `@remarks` opener was reworded so it no longer repeats the carried `code`.
- `SQLiteDatabase` (`SQLiteDatabase.ts`) — description replaced with the pilot's class shape, `Implements \`SQLiteDatabaseInterface\` over a lazily opened \`DatabaseSync\` the instance owns, …`, so it is distinct from `SQLiteDatabaseInterface`'s row; the repeated lazy-connect, gate, and boundary-mapping sentences were pruned from `@remarks`.
- `SQLiteStatement.ts` — the same treatment against `SQLiteStatementInterface`; the repeated liveness-gate sentence was pruned.
- `SQLiteValue`, `SQLiteBinding`, `SQLiteExecuteResult`, `SQLiteDatabaseOptions` (`types.ts`) — each description gained the members or literals its cell carried. `SQLiteExecuteResult` gained an `@remarks` block for the 2^53 truncation caveat the cell had been carrying.
- `SQLiteStatementInterface`, `SQLiteDatabaseInterface` (`types.ts`) — Ruling 7 split: the no-query-DSL parenthetical, the lean-layer sentence, and the driver-adaptation sentence moved into `@remarks`, every sentence kept.
- Every `SQLiteDatabaseInterface` and `SQLiteStatementInterface` member gained a description paragraph (`connect`, `close`, `execute`, `prepare`, `transact`, `pragma`; `execute`, `get`, `all`, `iterate`), each the guide cell's clause turned third-person. `begin` kept its sentences with the "Branch on `transacting` first" reference moved to `@remarks`. Distinct paragraphs were written where the statement rows would otherwise have repeated one sentence (`get` / `all` / `iterate` each name what they return).

Then `npm run docs -- --to guide`:

```
wrote guides/sqlite.md
guides/sqlite.md pitch: readme absent tagline "A lean, typed, synchronous wrapper over Node's built-in `node:sqlite` — one runtime dependency, …"; the README pitch is authored by hand
rows read: 1, disagreements found: 32, written: 31, reported: 1
```

followed by `npx oxfmt --config .oxfmtrc.json --write guides/sqlite.md` (exit 0), leaving
`npm run docs` at `rows read: 1, disagreements found: 1` — the pitch alone.

## Criterion 4 — the titled pair

The pair is the `@example` block of `createSQLiteDatabase` in `src/server/factories.ts` — the first
`create*` export, named by its content rather than a line number — titled
`Connect, execute, and round-trip a row`.

Heading uniqueness, heading-scoped: `grep -n '^#\+ Connect, execute, and round-trip a row'
guides/sqlite.md` returns one line. The fence body read before titling carries no three-backtick run
and no doc-comment terminator: its only backtick runs are the opening ```` ```ts ```` and the closing
```` ``` ```` of the fence itself.

Ancillary decision recorded: two headings' first fences demonstrate `createSQLiteDatabase` — `## Surface`
and `### Connect, execute, and round-trip a row`. The Patterns heading takes the title: it names an
example rather than a document section, and its fence body is a self-contained round trip, where the
Surface fence carries guide-context comments about `readonly` / `timeout` / `[Symbol.dispose]` that
read as section prose inside a doc block.

After titling, `npm run docs` (the summaries already at zero):

```
guides/sqlite.md Connect, execute, and round-trip a row: guide "ts\nimport { createSQLiteDatabase } from '@orkestrel/sqlite'\n\nconst db = createSQLiteDatabase() // path defaults to ':memory:'\n…" source "ts\nimport { createSQLiteDatabase } from '@orkestrel/sqlite'\n\nconst db = createSQLiteDatabase({ path: ':memory:' })\n…"
rows read: 1, disagreements found: 1
```

Then `npm run docs -- --to source`, run last:

```
wrote src/server/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

Every other `@example` block stays untitled; the only other one in the package is `SQLiteError`'s in
`src/server/errors.ts`.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and the
README carries the same text under its H1 with the same line breaks:

```
> A lean, typed, synchronous wrapper over Node's built-in `node:sqlite` — a thin skin on
> `DatabaseSync` / `StatementSync` that exposes prepared statements, transactions, and pragmas,
> with one runtime dependency, `@orkestrel/contract`, for boundary narrowing.
```

The guide's opening prose after the blockquote carries the displaced sentences and restates none of
the tagline's clauses:

> The wrapper is the raw native handle rather than an ORM: it carries no query, filter, sort, or
> aggregate builder, so a caller reaching for typed querying builds that layer on top.
> `@orkestrel/database`'s SQLite driver is that layer, adapting these synchronous calls to its own
> asynchronous driver contract. Source: [`src/server`](../src/server). Surfaced through the
> `@src/server` barrel. Requires Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`,
> `isTransaction`, and `readBigInts` options and `StatementSync.iterate`).

The README's opening paragraph had restated the tagline whole; it was replaced with the onboarding the
README alone carries:

> Create a database with the `createSQLiteDatabase` function, call `connect()` to open the handle,
> and run SQL through `execute` for a result-less statement or `prepare` for anything that binds
> parameters or returns rows. Wrap a set of writes in `transact(scope)` to commit them together,
> and branch a caught fault on `error.code` rather than on its message. Part of the `@orkestrel`
> line.

The README's `node:sqlite` experimental-warning paragraph, `## Install`, `## Requirements`,
`## Status`, `## Package`, and `## License` sections are unchanged.

The guide's `## Tests` gained the equality gate named descriptively, with no SQ/MQ/EQ/RQ identifier:
every `Summary` cell against its declaration's description paragraph, the titled
`Connect, execute, and round-trip a row` fence against the `@example` block of that title, and the
README pitch against the guide's tagline.

## Criterion 6 — the seed

```
$ npm run docs                     exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide       rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source      rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```
$ npx oxfmt --config .oxfmtrc.json --check guides/sqlite.md README.md src/server tests/guides.test.ts
All matched files use the correct format.  Finished in 1247ms on 11 files.        exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/sqlite.md README.md src/server tests/guides.test.ts
(no output)                                                                        exit 0
$ npm run check                                                                    exit 0
$ npm run test:guides      Test Files 1 passed (1);  Tests 36 passed (36)           exit 0
$ npm run test:policy      Test Files 1 passed (1);  Tests 90 passed | 1 skipped    exit 0
```

Observations, not criteria:

```
$ npm run test:src:server  Test Files 4 passed (4);  Tests 53 passed (53)           exit 0
$ npm run test:config      Test Files 1 passed (1);  Tests 172 passed | 1 skipped   exit 0
```

`test:config` is green on this tree. The prep unit's report recorded it red on
`ENOENT: configs/src/tsconfig.core.json`; `git diff --stat tests/config.test.ts` is empty, so this
unit did not touch that file and the change came from outside it. Take the authoritative reading
yourself after this unit exits.

## Criterion 8 — scope

`git status --short` lists the ten owned files named at the head of this report and nothing else. No
vendored file, `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`, or
`tests/src/**` file was written. No lint control was planted.

## Reader and seed defects

None met. `replaceCell` wrote all 31 located cells across the two- and three-column tables including
the method rows the header rename exposed, disturbed no non-`Summary` cell, and left the escaped pipe
in `` `SQLiteValue \| undefined` `` intact; `replaceExample` carried the titled fence body in on the
first attempt; the only `reported` line in either write direction was the pitch, which the seed
correctly declines to author.

## Deviation state

No deviation. Ancillary matters decided and recorded: the titled fence's heading (§ Criterion 4); the
`### Helpers and errors` heading kept for its mixed rows (§ Criterion 2); the guide's `## Methods`
prose paragraphs on `transacting` and `[Symbol.dispose]` left as the baseline wrote them, being guide
prose the gate does not read and outside this brief's named sites.

---

**Orchestrator annotation (audit, 2026-09-07):** the audit read counts in this report's prose (lines 47, 105, 206). The tree is authoritative; the report stands annotated.
