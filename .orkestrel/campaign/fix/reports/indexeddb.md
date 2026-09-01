# Fix report: indexeddb

## Dispositions

- **s16-08** applied (src/browser/IndexedDBStore.ts): Applied the implementation half: IndexedDBStore now opens its implicit transaction through a private `#engine(mode)` that returns a transaction-bound `IndexedDBTransactionStore`, and every CRUD verb delegates to that shared engine, awaiting `promisifyTransaction(engine.store.transaction)` for the write verbs. Deleted the duplicated `#resolve` (the engine's carries the identical message, because `store.name` equals the constructor's `name`) and the now-unused `readRecord` / `readRecords` / `hasKey` / `promisifyRequest` / `IndexedDBCursor` imports; the file lost 68 net lines. The types.ts half is blocked by the guide-parity tooling — see deviations.
- **s16-09** applied (src/browser/IndexedDBTransaction.ts, src/browser/types.ts): Removed the stored `#active`; `get active()` now returns `!this.#finished`, and `store`'s guard reads `this.#finished` directly. `abort` and `#settle` each set one field. Took the repair's second branch (keep `active` on the interface, correct the remark) because dropping it from `IndexedDBTransactionInterface` removes a published member. The types.ts remark now states the two are complements over one settled fact.
- **s16-10** deferred_breaking: Re-verified present: `| null` still sits on every `query` declaration, `IndexedDBStoreInterface.path` is still `KeyPath | null`, and `IndexedDBStore.path` still returns `?? null`. Dropping `| null` from a published parameter narrows what a consumer may pass, and changing `path` to `KeyPath | undefined` changes both a published return type and an observable runtime value. Neither is readonly tightening, so the finding defers whole.
- **s16-11** applied (src/browser/types.ts, src/browser/IndexedDBDatabase.ts): Renamed the `read` / `write` scope callback's parameter from `tx` to `transaction` in both `IndexedDBDatabaseInterface` signatures and in `IndexedDBDatabase`'s `read`, `write`, and `#run`. A callback parameter name carries no type identity, so no consumer signature changes. Renamed the local at `#run` to `wrapper`, keeping `native` for the raw handle, and updated its three uses.
- **s16-12** deferred_breaking: Re-verified present: `rangeExactKey` (helpers.ts:187) and `rangeBetweenKeys` (helpers.ts:240) are still exported rename-only wrappers over `IDBKeyRange.only` / `IDBKeyRange.bound`. Deleting them removes two exported symbols from the published barrel.
- **s16-14** applied (src/browser/errors.ts): The `IndexedDBError` remark now names `{@link isIndexedDBError}` as this package's own guard, and the `@example` branches on `isIndexedDBError(error) && error.code === 'CONSTRAINT'`. TSDoc content only.
- **s16-15** deferred_breaking: Re-verified present: IndexedDBCursor.ts:30 still masks a non-record value to `{}`. Deferred because the current behavior is pinned as intended, not merely unstated — guides/indexeddb.md contract item 7 says "A cursor's `value` cannot be `undefined` (`Row` is non-optional there), so it masks a non-record value to `{}`", and the cursor pattern at :257 repeats it. Widening `IndexedDBCursorInterface.value` to `Row | undefined` also changes a published property type.
- **s16-16** applied (src/browser/IndexedDBCursor.ts): Renamed the private `#advance` to `#next` at its declaration and its three call sites in `continue`, `seek`, and `advance`, so the public `advance(count)` no longer shares a name with the shared-request await. `#` private, invisible to consumers.
- **s16-17** deferred_breaking: Re-verified present: `IndexedDBUpgradeContext` still carries `create` / `drop` / `index` / `deindex` / `store` (types.ts:129-165), bound in `IndexedDBDatabase.#context`. Both lane corrections agree the reshape earns a version bump, and it removes five published interface members. Deferred whole; no part stands on its own. The lanes' shared correction for the work order: extract `stores.create` / `stores.drop` and `indexes.create` / `indexes.drop`, resolve the collision with the existing `stores` name list first, and carry the guide edits to the Surface row at :86, the Methods rows at :188-192, the auto-commit paragraph at :358 (which names each old member), and the `context.create('meta', …)` call at :373 — beyond the :86 / :191 / :377 the finding names.
- **s16-18** deferred_wave: Re-verified present: the public helper TSDoc first sentences in helpers.ts and factories.ts:5 are still imperative ("Resolve an `IDBRequest`…", "Run a synchronous native…", "Build a key range…", "Create a browser-native…"). The repair is first-sentence voice only, so the fleet's dedicated voice wave owns it. Every TSDoc sentence I wrote for another reason in this unit is third person.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1754ms on 52 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics emitted
- npm run check: pass — tsc --noEmit --project tsconfig.json and tsc --noEmit -p configs/src/tsconfig.browser.json both clean
- npm run build: pass — 13 modules transformed; dist/src/browser/index.js 33.06 kB; built in 2.50s
- npm test: pass — src:browser 112 passed (8 files); policy 111 passed; config 46 passed; setup 11 passed; guides 48 passed

## Diffstat

```text
 src/browser/IndexedDBCursor.ts      |   8 +--
 src/browser/IndexedDBDatabase.ts    |  14 ++--
 src/browser/IndexedDBStore.ts       | 137 ++++++++++++------------------------
 src/browser/IndexedDBTransaction.ts |   9 ++-
 src/browser/errors.ts               |   5 +-
 src/browser/types.ts                |   9 +--
 6 files changed, 69 insertions(+), 113 deletions(-)
```

- dist moves: true

## Deviations

s16-08, types.ts half not applied — reported rather than resolved. The finding's repair has two halves. The implementation half (compose the transaction-bound engine) is applied. The types.ts half ("declare the shared member set once and have `IndexedDBStoreInterface` extend it") cannot be applied without breaking `npm run test:guides`, which this package owns.

Evidence, run against the installed `@orkestrel/guide@0.0.15` in /home/user/fleet/indexeddb/node_modules:

  StoreInterface methods: [ 'index' ]
  SharedInterface methods: [ 'clear', 'get' ]

for a synthetic `export interface StoreInterface extends SharedInterface { index(name: string): void }`. `Source.methods(name)` resolves to `declarationBody(source, 'interface', name)` and reads only that declaration's own body lines, never following `extends`. So under an `extends` split, tests/guides.test.ts fails in both directions and neither is escapable:
  - keep the guide's `#### IndexedDBStoreInterface` methods table as it is → "documents no phantom method" fails, because `get` / `resolve` / `records` / `keys` / `has` / `count` / `set` / `add` / `remove` / `clear` are no longer members of the interface body;
  - trim that table to the members left in the body → "IndexedDBStore exposes no undocumented method" fails, because `source.methods('IndexedDBStore')` still reports every verb the class declares.

The duplicated member list in types.ts:288-343 is therefore held in place by the parity tooling, not by the package's own design. Closing it needs either a guide-parity tool that follows `extends`, or a different factoring of the two interfaces. Carry it to the work order.

s16-14, ancillary decision recorded: the repair names src/browser/errors.ts only, and that is all I changed. The guide's "Branching on a typed fault" fence (guides/indexeddb.md:328-338) still demonstrates `instanceof IndexedDBError` beside the `isIndexedDBError` fence at :342-353. That pairing reads as deliberate contrast, and the repair does not name it, so I left it.
