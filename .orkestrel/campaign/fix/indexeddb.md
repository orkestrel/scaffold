# Fix dossier: indexeddb

Verified fix-producing findings for the `indexeddb` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s16-08 — DRIFT

8. package=indexeddb file=src/browser/IndexedDBTransactionStore.ts:36-140 (against src/browser/IndexedDBStore.ts:64-200) rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"; one shared engine over the primitives) verdict=CONFIRMED
   wrong: `get`, `resolve`, `records`, `keys`, `has`, `count`, `set`, `add`, `remove`, `clear`, `cursor`, and `#resolve` are implemented twice with the same bodies, differing only in how the `IDBObjectStore` is obtained (`await this.#store(mode)` versus `this.#store`) and whether `promisifyTransaction` is awaited; `types.ts:288-343` duplicates the member list the same way.
   repair: make `IndexedDBStore` compose the transaction-bound engine instead of restating it — each method opens its store with `#store(mode)`, delegates to `new IndexedDBTransactionStore(store)`, and awaits `promisifyTransaction(store.transaction)` for the write verbs. In `types.ts`, declare the shared member set once and have `IndexedDBStoreInterface` extend it with `name` / `path` / `indexes` / `increment` / `index`.

## s16-09 — DRIFT

9. package=indexeddb file=src/browser/IndexedDBTransaction.ts:25-26,52-58 (interface at src/browser/types.ts:361-362) rule=AGENTS.md § Design laws (Derive state) verdict=CONFIRMED
   wrong: `#active` and `#finished` are two stored booleans that are always exact complements — `#settle` (line 100), `abort` (89-90), and the initial values set them together and nothing sets one alone — and the class TSDoc at line 18 admits it ("`finished` is its complement"). `types.ts:361-362` documents them as two independent facts ("`active` is true while it still accepts operations; `finished` is true after commit or abort"), so the shipped class no longer matches the contract's description.
   repair: keep `#finished` only and return `!this.#finished` from `get active()`; then either drop `active` from `IndexedDBTransactionInterface` as derivable by the consumer, or keep it and correct the `types.ts` remark to say the two are complements.

## s16-10 — DRIFT

10. package=indexeddb file=src/browser/types.ts:210,263,264,268,290,297,298,301,330,331,334,342 rule=AGENTS.md § Design laws (Absence is `undefined`; `null` only when an external format distinguishes it) verdict=CONFIRMED
    wrong: every `query` parameter is `IDBKeyRange | IDBValidKey | null` on top of being optional, and the implementation proves the package does not distinguish the two absences — `helpers.ts:136` and `IndexedDBStore.ts:96,113` collapse it with `query ?? undefined`. Separately, `IndexedDBStoreInterface.path: KeyPath | null` (line 290) is produced by `IndexedDBStore.ts:53` as `this.#definition.path ?? null`, inventing `null` from a `StoreDefinition.path?` (line 100) that already expresses the same absence by omission.
    repair: drop `| null` from every `query` declaration and delete the `?? undefined` coalesces that exist only to serve it; declare `path: KeyPath | undefined` and return `this.#definition.path` unchanged.

## s16-11 — DRIFT

11. package=indexeddb file=src/browser/types.ts:396,400; src/browser/IndexedDBDatabase.ts:119,126,155,160 rule=.claude/rules/names.md § Rejected naming (abbreviations) verdict=CONFIRMED
    wrong: the `read` / `write` scope callback's parameter is named `tx`, an abbreviation of `transaction`, and it appears in the published interface signature where a consumer's IDE shows it.
    repair: rename the parameter to `transaction` in both interface signatures and in `IndexedDBDatabase`'s `read`, `write`, and `#run`, and rename the local at `IndexedDBDatabase.ts:160` (`native` is already the raw handle, so use `wrapper` or reorder).

## s16-12 — DRIFT

12. package=indexeddb file=src/browser/helpers.ts:187,240 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
    wrong: `rangeExactKey(value)` is `IDBKeyRange.only(value)` and `rangeBetweenKeys(lower, upper, lowerOpen, upperOpen)` is `IDBKeyRange.bound` with the same parameters and the same defaults — rename-only wrappers around a semantically identical platform primitive. (`rangePrefix` at line 255 earns its place with the U+FFFF cap; the four single-boundary builders at 197-228 at least fix an otherwise-unreadable boolean.)
    repair: delete `rangeExactKey` and `rangeBetweenKeys`, update the guide rows (`guides/indexeddb.md:60,65`), the fences at lines 229-241, and the batching note at line 202 to call `IDBKeyRange.only` / `IDBKeyRange.bound` directly.

## s16-14 — DRIFT

14. package=indexeddb file=src/browser/errors.ts:18,25 rule=.claude/rules/documentation.md § Parity; .claude/rules/typescript.md § Errors and outcomes verdict=CONFIRMED
    wrong: the `IndexedDBError` remark instructs "Narrow a caught value with `instanceof IndexedDBError`" and its `@example` does exactly that, while the package ships `isIndexedDBError` (line 45) for that purpose and `guides/indexeddb.md:342-350` teaches the guard. The TSDoc points consumers away from the package's own supported mechanism.
    repair: change the remark to name `isIndexedDBError` and rewrite the `@example` to `if (isIndexedDBError(error) && error.code === 'CONSTRAINT')`.

## s16-15 — DRIFT

15. package=indexeddb file=src/browser/IndexedDBCursor.ts:30 rule=AGENTS.md § Design laws (Absence is `undefined`; One concept, one term) verdict=CONFIRMED
    wrong: a cursor position whose stored value is not a record becomes `{}` — an invented empty-value sentinel that a consumer cannot tell from a genuinely empty record — while `readRecord` (`helpers.ts:113`) reports the same boundary condition as `undefined`. One narrowing boundary, two different absences.
    repair: declare `readonly value: Row | undefined` on `IndexedDBCursorInterface` (`types.ts:232`), store `isRecord(cursor.value) ? cursor.value : undefined`, and state the non-record case in the interface remark.

## s16-16 — DRIFT

16. package=indexeddb file=src/browser/IndexedDBCursor.ts:71,87 rule=AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: the public `advance(count)` skips forward `count` records while the private `#advance()` awaits the shared request and wraps the next position; the same word names two different operations inside one class, and `continue` and `seek` both call `#advance` rather than advancing.
    repair: rename `#advance` to `#next`, matching what it returns.

## s16-17 — DRIFT-RESHAPE

17. package=indexeddb file=src/browser/types.ts:129-165 rule=.claude/rules/names.md § Split instead of compounding (extract sub-entities); AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: `IndexedDBUpgradeContext` carries two verb pairs for one add/remove concept — `create` / `drop` for a store and `index` / `deindex` for an index — and `deindex` is a coined term; `index` is also used as a noun everywhere else in the package (`store.index(name)`, `StoreDefinition.indexes`).
    repair: extract the two families into sub-entity nouns with one verb pair each: `context.stores.create(name, definition)` / `context.stores.drop(name)` and `context.indexes.create(store, definition)` / `context.indexes.drop(store, name)`; update `IndexedDBDatabase.#context` (lines 312-328) and the guide's context rows (`guides/indexeddb.md:86,191,377`).

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real: one interface carries `create`/`drop` for a store and `index`/`deindex` for an index — two verb pairs for one add/remove concept — while `drop` is already the package's single deletion term (IndexedDBDatabaseInterface.drop deletes the database), `index` is a bare-noun accessor

**Lane DRIFT-RESHAPE/high:** amend: extract the sub-entities as proposed, but resolve the `stores` collision first. Either move the existing name list onto the manager as a bare-noun accessor (`context.stores.names`, keeping `.create` / `.drop` beside it) or give the manager a distinct entity noun and leave `stores` as the list. Then update `IndexedDBDatabase.#context` (312-328) and its five bound private methods, the guide's context rows (`guides/indexeddb.md:86,191,377`), the Surface row at guide line 86 listing the old member names, and the auto-commit paragraph at guide line 358, which names `context.create` / `context.drop` / `context.store` / `context.index` / `context.deindex` individually. This reshapes a published interface and earns a version bump.

**Lane DRIFT/medium:** amend: extract `context.stores.create` / `context.stores.drop` and `context.indexes.create` / `context.indexes.drop` as proposed, rebinding `IndexedDBDatabase.#context` (:312-328) and taking the version bump. Extend the guide list beyond the cited :86 and :377 to the four Methods rows at guides/indexeddb.md:188-192 and the `context.create('meta', …)` call at :373, which the repair does not name.

## s16-18 — DRIFT

18. package=indexeddb file=src/browser/helpers.ts:31,49,69,95,117,141,161,181,191,201,211,221,231,249,261; src/browser/factories.ts:5 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of the public helpers is imperative ("Resolve an `IDBRequest`…", "Run a synchronous native…", "Build a key range…", "Create a browser-native…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Resolves…", "Runs…", "Builds…", "Creates…") and mirror it into the guide's helper table.

