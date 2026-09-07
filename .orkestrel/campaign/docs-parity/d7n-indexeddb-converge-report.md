# Report — `d7n-indexeddb-converge`

Wall clock: 2026-09-07T15:36:58Z (first command) to 2026-09-07T15:53:49Z (last command), about
17 minutes. Baseline `585a405`, clean. Deviation state: none — no condition in the deviation
contract fired. Every citation below re-read against the tree left behind.

## Acceptance criteria

### 1. Red-first, on the unconverged tree

`npm run test:guides` after adding the cases and before any convergence:

```text
 Test Files  1 failed (1)
      Tests  3 failed | 68 passed (71)
```

Each failing case's first lines, verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/indexeddb.md pairs: guide [\"Surface\",\"Feature-detecting before opening a database\",\"Index-backed reads with key ranges\",\"Cursor streaming and in-place mutation\",\"Seeking an index cursor to one primary key\",\"Connection lifecycle: connect, close, drop\",\"Reading, testing, and clearing a store\",\"Explicit transaction control and cursor movement\",\"The request-boundary helpers directly\",\"Branching on a typed fault\",\"Narrowing a caught value with isIndexedDBError\",\"Versioned upgrades: dropping a store, indexing an existing store, migrating data\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:109:20
    109|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > IndexedDB > keeps every compared summary and example equal to its source
AssertionError: expected [ …(103) ] to deeply equal []
+   "guides/indexeddb.md function createIndexedDBDatabase: guide \"Create a typed, lazily-connecting IndexedDB database over a store schema.\" source \"Creates a browser-native IndexedDB database over a store schema.\"",
+   "guides/indexeddb.md class IndexedDBDatabase: guide \"The database — `connect` / `store` / `read` / `write` / `close` / `drop`.\" source \"Represents a browser-native IndexedDB database — a typed, Promise-based handle.\"",
+   "guides/indexeddb.md IndexedDBDatabaseInterface.connect: guide absent source absent",
```

`GUIDE_SPEC` replaced the file's existing `PACKAGE_GUIDE` constant rather than sitting beside it —
same value, one home. `README.md` joined `ROOT_FILES`; `own` binds the manifest row; the pin is
scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`), no local predicate.

### 2. Table headers and class rows

Every header row in `guides/indexeddb.md`, read after the change:

```text
39:| API    | Kind    | Summary |     124:| Method | Returns | Summary |     201:| Method | Returns | Summary |
46:| API    | Kind    | Summary |     137:| Method | Returns | Summary |     211:| Method | Returns | Summary |
56:| API    | Kind    | Summary |     155:| Method | Returns | Summary |     229:| Method | Returns | Summary |
79:| API    | Kind    | Summary |     174:| Method | Returns | Summary |     239:| Method | Returns | Summary |
87:| API    | Kind    | Summary |     189:| Method | Returns | Summary |
```

`Behavior` was renamed to `Summary` in the header rows at baseline lines 111, 124, 142, 159, 172,
182, 192, 208, and 216. No other header text moved; the first column keeps the guide's own `API`
and `Method`.

No `Shape` column exists in this guide (`grep -c '| Shape'` reads 0), so the `Shape` idiom
sentence and the "literal stays in `Shape`" clause are inert here — no row's literal moved.

Class rows: `grep -c '^### Entities'` reads 0 and `grep -c '^### `'` reads 0, so there is no
`### Entities` table to rename and no class documented under its own H3. Every class already
carries a `## Surface` row (`IndexedDBDatabase` under `### Database and factory`, the store,
index, cursor, and transaction classes under `### Stores, indexes, cursors, transactions`,
`IndexedDBError` under `### Helpers and errors`). Renaming any one of those descriptive headings
to `### Classes` would be false of the other two, so none was renamed. Recorded as the decision.

### 3. Doc blocks rewritten, then propagated

Description paragraphs rewritten because the cell carried information the block lacked:

| Declaration | What the cell carried that the block did not |
| --- | --- |
| `createIndexedDBDatabase` (`src/browser/factories.ts`) | typed, lazily-connecting |
| `readRecords` (`src/browser/helpers.ts`) | the `Row` narrowing at the read boundary |
| `rangeFromKey`, `rangeToKey` (`src/browser/helpers.ts`) | the inclusive boundary that separates each from its strict sibling |
| `IndexedDBError` (`src/browser/errors.ts`) | the machine-readable `code` and optional `context` beside the native cause |
| `IndexedDBTransaction` (`src/browser/IndexedDBTransaction.ts`) | scoped store access |
| `IndexedDBTransactionStore` (`src/browser/IndexedDBTransactionStore.ts`) | no implicit per-call commit |

Description paragraphs rewritten for distinctness, per the pilot's Ruling 7 correction:

- `IndexDefinition` and `StoreDefinition` (`src/browser/types.ts`) now describe a declaration
  rather than the thing declared. `IndexDefinition` read "Represents a secondary index on a
  store.", the same sentence as the `IndexedDBIndex` class.
- `IndexedDBDatabaseInterface`, `IndexedDBRecordStoreInterface`, `IndexedDBStoreInterface`,
  `IndexedDBIndexInterface`, `IndexedDBCursorInterface`, `IndexedDBTransactionInterface`, and
  `IndexedDBTransactionStoreInterface` adopt the guide's own contract vocabulary
  ("Represents the contract of …"), which its cells already used ("The database contract",
  "The object-store contract", "The secondary-index contract"). `IndexedDBTransactionInterface`
  and `IndexedDBTransactionStoreInterface` each carried a sentence identical to their class twin's.

Member blocks added by hand in `src/browser/types.ts`: every call-signature member of the nine
documented interfaces that declares its own signature, except `IndexedDBCursorInterface.seek`,
which already carried one. Each opens on a third-person verb and leaves the member unnamed in its
first sentence, per `.claude/rules/documentation.md` § Parity extending the TSDoc voice to a cell.

Propagation:

```text
$ npm run docs -- --to guide     rows read: 1, disagreements found: 104, written: 103, reported: 1
$ npx oxfmt --write guides/indexeddb.md
$ npm run docs                   rows read: 1, disagreements found: 1
```

The single reported row is the pitch, which the seed prints as "the README pitch is authored by
hand". Non-`Summary` cells compared against `git show HEAD:guides/indexeddb.md` after the write and
the format:

```text
rows before: 117 rows after: 117
non-final cells mismatched: 0
```

The comparison splits on a pipe not preceded by a backslash, so the `Promise<Row \| undefined>`
and `Promise<IndexedDBCursorInterface \| null>` cells stay whole.

### 4. The titled pair

`src/browser/factories.ts:21` — the `@example` block of `createIndexedDBDatabase`, the primary
factory and the first `create*` the facts block lists — carries the title
`Feature-detecting before opening a database`, the flattened text of `guides/indexeddb.md:262`.

Heading uniqueness, heading-scoped: `^#+ Feature-detecting before opening a database` matches one
line, 262. The fence body read before titling:

```ts
import { createIndexedDBDatabase, supportsIndexedDB } from '@orkestrel/indexeddb'

if (supportsIndexedDB()) {
	const db = createIndexedDBDatabase({ name: 'app', version: 1, stores: { users: { path: 'id' } } })
	await db.store('users').set({ id: 'u1', name: 'Ada' })
}
```

It carries no three-backtick run and no doc-comment terminator, so it is eligible and the next
fence was not needed.

The runs, in order — the title first, then `--to source` last, after the summaries already agreed:

```text
$ npm run docs                   (after titling)   rows read: 1, disagreements found: 1
$ npm run docs -- --to source                      rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/browser/factories.ts
$ npm run docs                                     rows read: 1, disagreements found: 0
```

`written: 1` is the titled example alone. No other block was touched by the write, and every other
`@example` in the package stays untitled.

Between the alternatives, `## Surface` also carries a fence demonstrating the factory. The Patterns
heading was taken instead: it names a scenario a doc-block reader can act on, and it follows the
abort pilot, whose pair is `createAbort` titled `Create and abort`, its first Patterns heading.

### 5. The blockquote, the pitch, and the displaced prose

The blockquote is one noun phrase in plain text and code spans, with no link and no bold, and is
byte-identical at `guides/indexeddb.md:3-6` and `README.md:3-6`:

```text
> A lean, typed, Promise-based wrapper over the raw browser `IDBDatabase` /
> `IDBObjectStore` / `IDBIndex` / `IDBTransaction` API — object stores, secondary
> indexes, native key ranges, promisified cursors, multi-store transactions, and
> versioned schema upgrades, over `await` instead of raw `IDBRequest` events.
```

The guide's opening prose after it carries the displaced sentences, with the native-surface list
dropped because the tagline now states it:

> Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into
> one you can `await` — and nothing more. It exposes exactly what raw IndexedDB offers natively
> and deliberately nothing else: there is no `where` / `filter` / `order` / aggregate query builder
> here; that would duplicate a general-purpose query engine this package does not ship. Source:
> [`src/browser`](../src/browser). Surfaced through the `@src/browser` barrel (published as
> `@orkestrel/indexeddb`).

The README's opening paragraph became onboarding it alone carries, restating no tagline clause:

> Declare your stores with the `createIndexedDBDatabase` function, reach one of them with
> `db.store(name)`, and `await` the keyed reads and writes. Feature-detect with `supportsIndexedDB`
> first where storage may be absent. Part of the `@orkestrel` line.

Prose the cells shed, folded into the guide rather than dropped:

- `### Helpers and errors` gains a paragraph carrying the `globalThis.indexedDB` probe, `hasKey`
  as a native `count` greater than 0, `createIndex` as the shared index-DDL leaf, and `wrapError`
  as the request boundary.
- `### Constants` gains the sentence naming `wrapError` as the frozen map's reader and `UNKNOWN`
  as its fallback.
- `### Types` gains the members of the data-only shapes (`IndexDefinition`, `StoreDefinition`,
  `IndexedDBDatabaseOptions`, `IndexedDBCursorOptions`).
- Each `#### <Interface>` section under `## Methods` gains its `readonly` data members, and the
  section's intro sentence now points there instead of at the Surface row, which no longer lists
  them.
- The `IndexedDBUpgradeContext` paragraph lost the clause claiming its Surface row lists its
  members; the sentence already names them itself. The `context.stores.names` clause under
  Versioned upgrades was dropped so that member has one home, under its own heading.
- `## Tests` names the equality gate descriptively, with no SQ/MQ/EQ/RQ identifier:
  `guides/indexeddb.md:466`.

### 6. The seed

```text
$ npm run docs                    rows read: 1, disagreements found: 0                    exit 0
$ npm run docs -- --to guide      rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source     rows read: 1, disagreements found: 0, written: 0, reported: 0
```

### 7. Gates

```text
$ npx oxfmt --check guides/indexeddb.md README.md src/browser/ tests/guides.test.ts        exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <same paths>                          exit 0 (no output)
$ npm run check                                                                            exit 0
$ npm run test:guides       Test Files  1 passed (1)   Tests  71 passed (71)
$ npm run test:policy       Test Files  1 passed (1)   Tests  90 passed | 1 skipped (91)
```

Observation, the narrowest unit script (this package carries no `core` face):

```text
$ npm run test:src:browser  Test Files  9 passed (9)   Tests  129 passed (129)   Duration 21.28s
```

That run includes `tests/src/browser/integration.test.ts`, whose executed transcriptions copy the
flagship fences; no fence body changed, and the presence guards in `tests/guides.test.ts` stay green.

### 8. Working tree

```text
 M README.md
 M guides/indexeddb.md
 M src/browser/IndexedDBTransaction.ts
 M src/browser/IndexedDBTransactionStore.ts
 M src/browser/errors.ts
 M src/browser/factories.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/guides.test.ts
```

Owned files only. Diffstat:

```text
 README.md                                |  11 +-
 guides/indexeddb.md                      | 307 +++++++++++++++++--------------
 src/browser/IndexedDBTransaction.ts      |   3 +-
 src/browser/IndexedDBTransactionStore.ts |   3 +-
 src/browser/errors.ts                    |   3 +-
 src/browser/factories.ts                 |  19 +-
 src/browser/helpers.ts                   |   7 +-
 src/browser/types.ts                     |  64 +++++--
 tests/guides.test.ts                     |  80 +++++++-
 9 files changed, 316 insertions(+), 181 deletions(-)
```

## Reader and seed observations

**R1 — an inherited member's summary resolves to the base declaration's block.** Probed before
authoring any cell:

```text
=== IndexedDBRecordStoreInterface [{"name":"get","summary":"PLANTED record-store get."}]
=== IndexedDBStoreInterface       [{"name":"get","summary":"PLANTED record-store get."}]
=== IndexedDBTransactionStoreInterface [{"name":"get","summary":"PLANTED record-store get."}]
```

`IndexedDBStoreInterface` and `IndexedDBTransactionStoreInterface` extend
`IndexedDBRecordStoreInterface` and redeclare none of the shared verbs, so `source.methods` returns
the base block's text for all three. The equality gate therefore requires those three tables to
carry one identical `Summary` per shared verb, where the guide previously varied them (its
transaction-store `get` read "Read by key within the transaction (array → array)"). The per-table
nuance moved into each `####` paragraph. This is the reader behaving as the brief describes — one
cell, one declaration, one description — so it is recorded as a decision rather than a deviation.
The guide's own line already said the extending tables repeat these rows.

**R2 — the brief's worklist block is a tail.** `npm run docs` on `585a405` opens at
`function createIndexedDBDatabase`, not at `type KeyPath`. The brief's block and the prep report's
block both omit the leading Surface rows the command prints:

```text
guides/indexeddb.md function createIndexedDBDatabase: guide "Create a typed, lazily-connecting IndexedDB database over a store schema." source "Creates a browser-native IndexedDB database over a store schema."
guides/indexeddb.md class IndexedDBDatabase: guide "The database — `connect` / `store` / `read` / `write` / `close` / `drop`." source "Represents a browser-native IndexedDB database — a typed, Promise-based handle."
...
guides/indexeddb.md const ERROR_CODES: guide "Native `DOMException.name` → `IndexedDBErrorCode`, read by `wrapError` (frozen)." source "Maps native `DOMException.name` → the wrapper's `IndexedDBErrorCode`."
guides/indexeddb.md type Row: guide "A record stored in, and read from, an object store." source "Represents a record stored in, and read from, an object store."
```

The totals still agree: `disagreements found: 104`.

**R3 — the seed's total and the equality case's list differ by the pitch row.** The seed reported
`104` where the equality case collected `103`; `findDrift` does not return the pitch, which the seed
compares itself. Not a defect — a reader of either output needs the difference named.

**R4 — the prep unit's `test:config` deviation does not reproduce on `585a405`.**

```text
$ npm run test:config       Test Files  1 passed (1)   Tests  172 passed | 1 skipped (173)
```

`tests/config.test.ts:2140-2146` as committed walks `['core', 'browser', 'server']` and takes the
first face the workspace carries, so this browser-only package resolves
`configs/src/tsconfig.browser.json`. `git status --short configs/ tests/config.test.ts` is empty, so
the walking branch is committed content, not an edit of mine.

**E1 — a session scratchpad file was replaced by another package's content.** A baseline copy of
`guides/indexeddb.md` written under
`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/` held the
terminal package's guide (`Color`, `Reporter`, `Spinner` rows) when read back later in this unit.
The cell comparison was re-derived from `git show HEAD:guides/indexeddb.md` into a
process-id-suffixed path and re-run, reading `rows before: 117 rows after: 117, non-final cells
mismatched: 0`. Both the earlier and the re-derived readings agree; flagging it because the
scratchpad is documented as session-isolated.

## Decisions recorded

- `GUIDE_SPEC` replaces the file's existing `PACKAGE_GUIDE` constant rather than duplicating its
  value.
- No `### Classes` table and no heading rename: the guide carries no `### Entities` heading, no
  class under its own H3, and class rows spread across three descriptive Surface groupings.
- The titled fence is the first Patterns heading whose fence demonstrates the primary factory,
  matching the pilot, rather than `## Surface`.
- The shared record-store verbs carry one identical summary across their three tables, with the
  per-table nuance in each section's paragraph (forced by R1).
- The array-overload batching rule keeps its existing homes — the
  `#### IndexedDBRecordStoreInterface` paragraph and `## Contract` invariant 5 — rather than
  repeating inside every cell.
