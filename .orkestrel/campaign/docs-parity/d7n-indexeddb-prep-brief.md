# Brief — P.1 `d7n-indexeddb-prep` (indexeddb's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/indexeddb` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a3f4221`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

indexeddb's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== indexeddb 2026-09-07T15:13:41Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
74:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### indexeddb (a3f4221, version 0.0.10, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 29 unchanged, 0 removed in ..
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
   tests/setupBrowser.ts(11)
   src/browser/types.ts(3)
   src/browser/IndexedDBDatabase.ts(2)
   tests/src/browser/IndexedDBDatabase.test.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(106,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(109,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(113,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(128,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(143,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 33 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  33 failed | 35 passed (68)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 17 | summary 9 | banned 8 | tests/setupBrowser.ts(11) src/browser/types.ts(3) src/browser/IndexedDBDatabase.ts(2) tests/src/browser/IndexedDBDatabase.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for indexeddb (taken 2026-09-07T15:14Z by facts.sh)

- Checkout `/home/user/fleet/indexeddb`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a3f4221`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    99:			const members = source.methods(group.interface)
    106:					expect(findMissing(members, group.methods)).toEqual([])
    109:					expect(findMissing(group.methods, members)).toEqual([])
    113:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    128:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    131:		for (const group of guide.methods()) {
    141:							? source.examples(group.interface)
    142:							: source.examples(group.interface).concat(source.examples(entity))
    143:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    155:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 441:## Tests — 0 lines naming a check or a code

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

`/home/user/scaffold/tmp/units/d7n-indexeddb-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
