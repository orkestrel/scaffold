# Unit breaking-indexeddb — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s16-10** — applied: Dropped `| null` from every published query parameter — `CursorOptions.query`, and `records` / `keys` / `count` on `IndexedDBIndexInterface`, `IndexedDBStoreInterface`, `IndexedDBTransactionStoreInterface` (now on the shared `IndexedDBRecordStoreInterface`), and `readRecords`. Deleted every `?? undefined` / `?? null` coalesce that existed only to serve it: `readRecords` calls `source.getAll(query, count)`, the index and transaction store call `getAllKeys(query, count)` / `count(query)` / `openCursor(options?.query, ...)` directly. `IndexedDBStoreInterface.path` and `IndexedDBStore.path` are `KeyPath | undefined`, returning `this.#definition.path` unchanged. Tests moved from `expect(events.path).toBeNull()` to `toBeUndefined()`.
- **s16-12** — applied: Deleted the exported `rangeExactKey` and `rangeBetweenKeys` wrappers from `src/browser/helpers.ts`. Callers use `IDBKeyRange.only` and `IDBKeyRange.bound`: the guide's key-range fence, contract item 5's batching note, the `IndexedDBStoreInterface` and `IndexedDBStore` TSDoc, and the store and index tests. Removed their two Surface rows and their two `helpers.test.ts` cases; added a guide paragraph ruling why the surviving builders stay (each fixes a native boolean argument; `rangePrefix` caps at U+FFFF), which is the s16-12 finding's own reasoning.
- **s16-15** — applied: `IndexedDBCursorInterface.value` is `Row | undefined`; `IndexedDBCursor` stores `isRecord(cursor.value) ? cursor.value : undefined` with no `{}` mask. Rewrote guide contract item 7 and the cursor pattern to the new behaviour, and the pattern fence to `cursor.value?.active`. The ruling's executed assertion is a new test in `tests/src/browser/IndexedDBCursor.test.ts` that stores a real non-record clone and asserts the cursor reads `undefined` for it, beside the `get` miss. Mutation probe: restoring the `{}` mask reddens exactly that test (`expected [ { id: 'record' }, {} ] to deeply equal [ { id: 'record' }, undefined ]`, 1 failed | 11 passed); restoring the line returns 12 passed.
- **s16-17** — applied: `IndexedDBUpgradeContext` now declares only `transaction` / `old` / `version` / `stores` / `indexes` — no `create`, `drop`, `store`, `index`, or `deindex`. `stores` is `IndexedDBUpgradeStoreManagerInterface` with `names` (the former `stores: readonly string[]` list), `create(name, definition)`, `drop(name)`, `open(name)`; `indexes` is `IndexedDBUpgradeIndexManagerInterface` with `create(store, definition)` and `drop(store, name)`. `IndexedDBDatabase.#context` builds both as object literals over the existing bound private methods; `#reachUpgradeStore` renamed `#openUpgradeStore`. Carried every guide edit the lanes named: the Surface row at the context, the Methods table (replaced by one table per manager), the auto-commit paragraph naming each old member, and the `context.create('meta', …)` fence.
- **s16-08 branches** — applied: Took the finding's second option — the branches cannot collapse, because `IndexedDBTransactionStore` declares an array signature and a single-key signature and neither accepts the unnarrowed union, so the two arms are identical text differing only in overload selection. Stated that reason as a `//` comment on `get` in `src/browser/IndexedDBStore.ts` and referred `resolve`, `has`, and `remove` back to it.
- **cross-package shared member set** — applied: The @orkestrel/guide half has landed in the staged closure — probed `Source.methods` directly and it follows `extends` (`StoreInterface extends SharedInterface` reports `clear, get, index`), with a no-extends interface and an absent interface as negative controls. Declared `IndexedDBRecordStoreInterface` once in `src/browser/types.ts` carrying `get` / `resolve` / `records` / `keys` / `has` / `count` / `set` / `add` / `remove` / `clear` / `cursor`; `IndexedDBStoreInterface extends` it with `name` / `path` / `indexes` / `increment` / `index`, and `IndexedDBTransactionStoreInterface extends` it with `store`. The duplicated member list at the old types.ts:288-343 is gone. Guide gained its Surface row and its Methods table; the extending tables keep every inherited row, which is what the landed tool now requires. The emitted `dist/src/browser/index.d.ts` carries the `extends`, so a consumer's structural member set is unchanged.

## Symbols moved

- rangeExactKey → removed (callers use IDBKeyRange.only)
- rangeBetweenKeys → removed (callers use IDBKeyRange.bound)
- IndexedDBUpgradeContext.stores: readonly string[] → IndexedDBUpgradeContext.stores.names
- IndexedDBUpgradeContext.create → IndexedDBUpgradeContext.stores.create
- IndexedDBUpgradeContext.drop → IndexedDBUpgradeContext.stores.drop
- IndexedDBUpgradeContext.store → IndexedDBUpgradeContext.stores.open
- IndexedDBUpgradeContext.index → IndexedDBUpgradeContext.indexes.create
- IndexedDBUpgradeContext.deindex → IndexedDBUpgradeContext.indexes.drop
- IndexedDBUpgradeStoreManagerInterface → added (names, create, drop, open)
- IndexedDBUpgradeIndexManagerInterface → added (create, drop)
- IndexedDBRecordStoreInterface → added (the shared keyed record member set)
- IndexedDBStoreInterface → now extends IndexedDBRecordStoreInterface
- IndexedDBTransactionStoreInterface → now extends IndexedDBRecordStoreInterface
- IndexedDBStoreInterface.path: KeyPath | null → KeyPath | undefined
- IndexedDBStore.path: KeyPath | null → KeyPath | undefined
- IndexedDBCursorInterface.value: Row → Row | undefined
- IndexedDBCursor.value: Row → Row | undefined
- CursorOptions.query: IDBKeyRange | IDBValidKey | null → IDBKeyRange | IDBValidKey
- records/keys/count query: IDBKeyRange | IDBValidKey | null → IDBKeyRange | IDBValidKey (index, store, transaction store, and the shared record store)
- readRecords query: IDBKeyRange | IDBValidKey | null → IDBKeyRange | IDBValidKey
- IndexedDBDatabase.#reachUpgradeStore → #openUpgradeStore (private)

## Files touched

- /home/user/fleet/indexeddb/src/browser/types.ts
- /home/user/fleet/indexeddb/src/browser/helpers.ts
- /home/user/fleet/indexeddb/src/browser/IndexedDBStore.ts
- /home/user/fleet/indexeddb/src/browser/IndexedDBIndex.ts
- /home/user/fleet/indexeddb/src/browser/IndexedDBTransactionStore.ts
- /home/user/fleet/indexeddb/src/browser/IndexedDBCursor.ts
- /home/user/fleet/indexeddb/src/browser/IndexedDBDatabase.ts
- /home/user/fleet/indexeddb/guides/indexeddb.md
- /home/user/fleet/indexeddb/tests/src/browser/IndexedDBCursor.test.ts
- /home/user/fleet/indexeddb/tests/src/browser/IndexedDBDatabase.test.ts
- /home/user/fleet/indexeddb/tests/src/browser/IndexedDBIndex.test.ts
- /home/user/fleet/indexeddb/tests/src/browser/IndexedDBStore.test.ts
- /home/user/fleet/indexeddb/tests/src/browser/IndexedDBTransactionStore.test.ts
- /home/user/fleet/indexeddb/tests/src/browser/helpers.test.ts

## Tests changed

- tests/src/browser/IndexedDBCursor.test.ts — added 'IndexedDBCursor — non-record values > reports a non-record stored value as undefined, the same absence readRecord reports' (the s16-15 executed assertion); moved every `cursor.value` dereference to `?.` or `requireValue`; header comment names the new boundary
- tests/src/browser/helpers.test.ts — deleted the `rangeExactKey` and `rangeBetweenKeys` cases and their imports with the removed exports
- tests/src/browser/IndexedDBStore.test.ts — `events.path` asserts `toBeUndefined`; the compound-key case drives `IDBKeyRange.only`; cursor projection uses `value?.id`
- tests/src/browser/IndexedDBIndex.test.ts — index range read drives `IDBKeyRange.bound`; cursor projection uses `value?.id`
- tests/src/browser/IndexedDBTransactionStore.test.ts — cursor projection uses `value?.id`
- tests/src/browser/IndexedDBDatabase.test.ts — every upgrade case drives `context.stores.create` / `context.stores.drop` / `context.stores.open` / `context.indexes.create` / `context.indexes.drop` and reads `context.stores.names`; case titles renamed to the new members

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 1900ms on 52 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics emitted
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json and tsc --noEmit -p configs/src/tsconfig.browser.json both clean
- `npm run build` → exit 0 — 13 modules transformed; dist/src/browser/index.js 32.52 kB (gzip 8.47 kB); declaration files built; built in 1.82s
- `npm test` → exit 0 — src:browser 111 passed (8 files); policy 111 passed; config 46 passed; setup 11 passed; guides 58 passed

## Diff stat

```text
14 files changed, 313 insertions(+), 307 deletions(-)
 guides/indexeddb.md                                | 136 ++++++++-----
 src/browser/IndexedDBCursor.ts                     |  10 +-
 src/browser/IndexedDBDatabase.ts                   |  20 +-
 src/browser/IndexedDBIndex.ts                      |  17 +-
 src/browser/IndexedDBStore.ts                      |  21 +-
 src/browser/IndexedDBTransactionStore.ts           |  15 +-
 src/browser/helpers.ts                             |  44 +---
 src/browser/types.ts                               | 226 +++++++++++----------
 tests/src/browser/IndexedDBCursor.test.ts          |  39 ++--
 tests/src/browser/IndexedDBDatabase.test.ts        |  38 ++--
 tests/src/browser/IndexedDBIndex.test.ts           |   9 +-
 tests/src/browser/IndexedDBStore.test.ts           |  14 +-
 tests/src/browser/IndexedDBTransactionStore.test.ts|   2 +-
 tests/src/browser/helpers.test.ts                  |  29 ---
```

Status at return (writer's reading): `All assigned rows applied; no row refused and no row stopped. The full gate chain runs green in order: format:check, lint:check, check, build, test all exit 0. Acceptance criterion 1 holds — a word-boundary search over src, tests, and guides returns no hit for rangeExactKey, rangeBetweenKeys, deindex, reachUpgradeStore, context.create, context.drop, context.store(, context.index(, `KeyPath | null`, or `IDBValidKey | null`. Criterion 5 holds — guides/indexeddb.md names IndexedDBRecordStoreInterface, IndexedDBUpgradeStoreManagerInterface, IndexedDBUpgradeIndexManagerInterface, and every new context member, and no removed one. No off-limits file was touched: package.json, package-lock.json, AGENTS.md, .claude, .agents, configs, tests/setupPolicy.ts, and tests/policy.test.ts are all unmodified. Nothing was committed, staged, installed, or fetched, and no discarding git command ran.`
Built `dist/` moves: true

## Observations

- Adoption list was empty. `npm run check` was already clean against the staged closure before any edit, so no renamed upstream symbol needed adopting beyond the guide helpers the branch tip commit had already taken. `node /home/user/work/verify-stage.mjs indexeddb` reports contract, guide, html, markdown, and test all OK against their register rows.
- Test count movement, reconciled: src:browser 112 → 111 (deleted the two key-range cases for the removed wrappers, added the one non-record cursor case). guides 48 → 58 (three Methods tables added — IndexedDBRecordStoreInterface and the two upgrade managers — one removed for IndexedDBUpgradeContext, which now declares no call-signature member; each table contributes five assertions).
- Instrument control for the s16-15 assertion: planting the reverted `{}` mask reddens exactly the one test that names the defect and nothing else (1 failed | 11 passed in that file); restoring the line returns 12 passed. The plant and the restore were both inside the file this unit owns and the restore is verified in the tree.
- Instrument control for the extends probe: the guide `Source.methods` reading was taken with a no-extends interface and an absent interface as controls drawn from outside the extends population, so the positive reading discriminates rather than matching everything.
- No timing-suspect failure. The whole suite ran well inside its budget on this host (src:browser 14.86s, everything else under 3s), and no test was retried, skipped, or marked todo. `grep` for `.skip` / `.todo` / `.only` over tests/src/browser returns only `IDBKeyRange.only` call sites.
- `npm run test:distribution` was not run: it is outside `npm test` and the brief rules it out as a criterion while a tarball is staged.
- The published declaration moved as expected. dist/src/browser/index.d.ts no longer carries rangeExactKey or rangeBetweenKeys, carries all three new interfaces, emits `IndexedDBStoreInterface extends IndexedDBRecordStoreInterface` with `readonly path: KeyPath | undefined`, `readonly value: Row | undefined` on the cursor, and the reshaped IndexedDBUpgradeContext. dist/ is gitignored, so it is absent from git status.
- Outside my rows, recorded against the row that owns it for the next matrix: the guide's 'Explicit transaction control and cursor movement' fence still names its scope callback parameter `tx`. s16-11's applied repair covered both interface signatures and IndexedDBDatabase's read / write / #run, not a fence's own local binding, and the fence parameter carries no type identity. I left it.
- Also outside my rows: the source and guide still carry `AGENTS §2` / `§9.2` / `§22` section pointers into an AGENTS.md that no longer numbers its sections. I carried them verbatim where I moved existing text rather than opening an unrelated sweep.

## Deviations

- Named the shared member set `IndexedDBRecordStoreInterface`. The brief assigns the cross-package half but names no type for it. Chosen because 'record' is already this package's word for a stored Row (Row's own TSDoc, readRecord, readRecords, the records verb), so it reads as 'an object store viewed purely as keyed record storage' — which is exactly the member set. Rejected `IndexedDBRecordsInterface` (type names are never pluralised) and `IndexedDBStoreBaseInterface` ('base' describes the structure rather than the thing).
- Named the upgrade managers `IndexedDBUpgradeStoreManagerInterface` and `IndexedDBUpgradeIndexManagerInterface`, following the `{Entity}ManagerInterface` row of the type-level identifier table and the package's IndexedDB prefix. The ruling fixed the members (names, create, drop, open; create, drop) but not the type names.
- Built both managers as object literals inside the existing `#context` private method rather than extracting a builder method per manager. Extraction would have added two private methods whose whole body is a literal over already-bound methods, and #context stays readable as one place. This is the placement decision the deviation contract leaves to the executor; recording it rather than stopping.
- Renamed the private `#reachUpgradeStore` to `#openUpgradeStore` so the private mirrors the public `open` verb the ruling fixed. `#` private, invisible to consumers, no interface change.
- Kept `rangeAboveKey`, `rangeFromKey`, `rangeBelowKey`, `rangeToKey`, and `rangePrefix`. s16-12's own finding text rules them in ('the four single-boundary builders at 197-228 at least fix an otherwise-unreadable boolean'; rangePrefix earns its place with the U+FFFF cap), and the ledger's edit list names only the two wrappers. Added the guide paragraph that states that rule where a reader meets it.
- Prose sweep corrections inside my own added lines, per AGENTS.md § Writing and .claude/rules/writing.md: replaced `via` with `through` in the five test titles I rewrote and in the guide's Tests bullet; removed the counts I had introduced ('Its two managers', 'the two managers', 'the two cannot drift apart', 'The two calls', '`IDBKeyRange.bound` for two'); changed a causal `since` to `because` in the TSDoc block I authored. Classified as permitted and left: 'just created' (temporal, and carried-over text), 'both extend' and 'both a record and a compound IDBValidKey' (the sentence names the members), 'several for a compound key' (unbounded, pre-existing). The three `masks` / `non-optional` hits outside this package sit in guides/test.md, guides/guide.md, and guides/contract.md — vendored dependency mirrors, off-limits and unrelated.
- Made two examples I authored honest rather than merely illustrative: the guide's upgrade fence comments `context.indexes.drop` as the inverse over an index a prior version left behind (matching the existing `context.stores.drop('legacy')` framing), and the IndexedDBUpgradeStoreManagerInterface @example awaits a real write through `stores.open` instead of binding an unused const.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/indexeddb.diff`,
`tmp/units/breaking/indexeddb.status`.
