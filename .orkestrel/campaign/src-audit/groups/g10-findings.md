# Findings for group g10

Packages: csv, indexeddb. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s16-01

1. package=csv file=src/core/helpers.ts:1026,1103,1130,1155 rule=.claude/rules/architecture.md § Kind purity; .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: `coerceInferred`, `coerceInteger`, `coerceReal`, and `coerceBoolean` are flat coercers returning `T | undefined` — the exact kind `parsers.ts` owns — and they sit in `helpers.ts` with an `@remarks` (lines 1090-1093, 1113-1117, 1139-1143) stating they were named `coerce*` to avoid confusion with `@orkestrel/contract`'s `parseInteger` / `parseBoolean`, which is the name choosing the file that § Kind purity forbids ("Never let the name choose").
   repair: move the four into `src/core/parsers.ts` and rename them `parseInferred` / `parseInteger` / `parseReal` / `parseBoolean`, update the three importers (`helpers.ts` internal calls, `parsers.ts`, the guide's Parsers table), and delete the naming `@remarks` — the barrel star-exports both files, so only the names move. Correct `coerceReal`'s remark while editing it: it says "same-named `parseReal`" and `@orkestrel/contract` exports no `parseReal` (its coercer is `parseNumber`).

## s16-02

2. package=csv file=src/core/helpers.ts:512 rule=.claude/rules/architecture.md § Centralized-file pattern (Shape values → `*/shapers.ts`); § Kind purity verdict=CONFIRMED
   wrong: `deriveShapes` produces `ContractShape` values (a `Columns` map) and lives in `helpers.ts`, which forces the leaf file to import `columnTypeShape` from `shapers.ts` at line 34 — an edge from the leaf pair up into a kind file § Kind purity says is never consumed by it.
   repair: move `deriveShapes` into `src/core/shapers.ts` beside `columnTypeShape`, and update `CSV.ts:12` to import it from `./shapers.js`. `helpers.ts` then imports nothing from `shapers.ts`.

## s16-03

3. package=csv file=src/core/helpers.ts:489 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
   wrong: `renderTSV` is a one-line delegate that only overrides one data value (`delimiter: '\t'`), adding no boundary, invariant, or narrower contract; `guides/csv.md:232-234` states outright that `renderCSV` with `delimiter: '\t'` is the same operation, and `.claude/rules/names.md` § Split behavioral variants classifies a value selecting a datum for the same operation as data, not a separate function. It also silently discards a caller-supplied `delimiter`.
   repair: delete `renderTSV`, delete its guide row (line 128) and the "Rendering to TSV" pattern fence (lines 440-446), and replace the fence with `renderCSV(table, { delimiter: '\t' })`.

## s16-04

4. package=csv file=src/core/validators.ts:52 rule=.claude/rules/patterns.md § Validation and contracts; .claude/rules/architecture.md § Kind purity verdict=CONFIRMED
   wrong: `isRowList` is typed `(source: CSVTable | readonly Row[]) => source is readonly Row[]`, so it is a union narrower rather than the total `(unknown) => value is T` guard `validators.ts` is defined to hold; a consumer cannot call it on an `unknown`, which the file's own header comment and `guides/csv.md:170-171` both promise of everything in it.
   repair: move `isRowList` to `src/core/helpers.ts` — the file § Kind purity assigns to a predicate that is not a `Guard<T>` — keeping the name, and update `helpers.ts:35` to a local reference and the guide's Validators table row (line 176) to a Helpers row.

## s16-05

5. package=csv file=src/core/types.ts:204 rule=AGENTS.md § Design laws (Absence is `undefined`) verdict=CONFIRMED
   wrong: `comment?: string | false` uses the literal `false` as the "comment handling disabled" sentinel while `undefined` already carries that meaning; `constants.ts:18` defaults it to `false`, so `{ comment: undefined }` and `{ comment: false }` are the same state expressed two ways.
   repair: declare `comment?: string`, drop `comment` from `DEFAULT_PARSE_OPTIONS`, and replace `Required<ParseOptions>` with a `ResolvedParseOptions` alias shaped like the existing `ResolvedRenderOptions` (`types.ts:249`) that keeps `comment` optional; `scanComment` (`helpers.ts:617`) then tests `options.comment === undefined`.

## s16-06

6. package=csv file=src/core/shapers.ts:62 rule=.claude/rules/documentation.md § Parity (falsify a prose claim); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: the TSDoc calls `csvTableShape` "The `ContractShape` of a `CSVTable`", but `CSVTable.rows` is `readonly Row[]` where `Row = Record<string, unknown>` (`types.ts:11,21`) and the shape requires `recordShape(jsonShape())`, so the shape rejects values the declared type admits and disagrees with `isCSVTable` (`validators.ts:36`) on the same input. The divergence itself is deliberate and tested — `guides/csv.md:489-491` names the "leniency-lock cases against `csvTableShape`" — but the sentence claiming shape-of-`CSVTable` is not true of the shipped value.
   repair: reword the first sentence to state what the value is — the JSON-serializable projection of a `CSVTable`, narrower than the declared `CSVTable` type — and say in `@remarks` that `isCSVTable` is the guard for the declared type.

## s16-07

7. package=csv file=src/core/helpers.ts:47,75,100,123,166,192,218,242,271,315,377,408,433,493,546,572,596,628,668,763,782,896,956,1014,1041,1083,1109,1135; src/core/validators.ts:13,42,57; src/core/factories.ts:7,35 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
   wrong: the TSDoc first sentence of nearly every public function is imperative ("Validate a delimiter…", "Merge `options`…", "Scan one quoted field…", "Create a working…"), not the required third person with an `-s` verb; `parseCSV` ("Parses", `parsers.ts:12`) and `readRecords` ("Splits", `helpers.ts:827`) show the intended form, so the file is internally inconsistent as well.
   repair: rewrite each first sentence in third person ("Validates…", "Merges…", "Scans…", "Creates…"), and mirror the change into the matching guide table cells, which already use the third person.

## s16-08

8. package=indexeddb file=src/browser/IndexedDBTransactionStore.ts:36-140 (against src/browser/IndexedDBStore.ts:64-200) rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"; one shared engine over the primitives) verdict=CONFIRMED
   wrong: `get`, `resolve`, `records`, `keys`, `has`, `count`, `set`, `add`, `remove`, `clear`, `cursor`, and `#resolve` are implemented twice with the same bodies, differing only in how the `IDBObjectStore` is obtained (`await this.#store(mode)` versus `this.#store`) and whether `promisifyTransaction` is awaited; `types.ts:288-343` duplicates the member list the same way.
   repair: make `IndexedDBStore` compose the transaction-bound engine instead of restating it — each method opens its store with `#store(mode)`, delegates to `new IndexedDBTransactionStore(store)`, and awaits `promisifyTransaction(store.transaction)` for the write verbs. In `types.ts`, declare the shared member set once and have `IndexedDBStoreInterface` extend it with `name` / `path` / `indexes` / `increment` / `index`.

## s16-09

9. package=indexeddb file=src/browser/IndexedDBTransaction.ts:25-26,52-58 (interface at src/browser/types.ts:361-362) rule=AGENTS.md § Design laws (Derive state) verdict=CONFIRMED
   wrong: `#active` and `#finished` are two stored booleans that are always exact complements — `#settle` (line 100), `abort` (89-90), and the initial values set them together and nothing sets one alone — and the class TSDoc at line 18 admits it ("`finished` is its complement"). `types.ts:361-362` documents them as two independent facts ("`active` is true while it still accepts operations; `finished` is true after commit or abort"), so the shipped class no longer matches the contract's description.
   repair: keep `#finished` only and return `!this.#finished` from `get active()`; then either drop `active` from `IndexedDBTransactionInterface` as derivable by the consumer, or keep it and correct the `types.ts` remark to say the two are complements.

## s16-10

10. package=indexeddb file=src/browser/types.ts:210,263,264,268,290,297,298,301,330,331,334,342 rule=AGENTS.md § Design laws (Absence is `undefined`; `null` only when an external format distinguishes it) verdict=CONFIRMED
    wrong: every `query` parameter is `IDBKeyRange | IDBValidKey | null` on top of being optional, and the implementation proves the package does not distinguish the two absences — `helpers.ts:136` and `IndexedDBStore.ts:96,113` collapse it with `query ?? undefined`. Separately, `IndexedDBStoreInterface.path: KeyPath | null` (line 290) is produced by `IndexedDBStore.ts:53` as `this.#definition.path ?? null`, inventing `null` from a `StoreDefinition.path?` (line 100) that already expresses the same absence by omission.
    repair: drop `| null` from every `query` declaration and delete the `?? undefined` coalesces that exist only to serve it; declare `path: KeyPath | undefined` and return `this.#definition.path` unchanged.

## s16-11

11. package=indexeddb file=src/browser/types.ts:396,400; src/browser/IndexedDBDatabase.ts:119,126,155,160 rule=.claude/rules/names.md § Rejected naming (abbreviations) verdict=CONFIRMED
    wrong: the `read` / `write` scope callback's parameter is named `tx`, an abbreviation of `transaction`, and it appears in the published interface signature where a consumer's IDE shows it.
    repair: rename the parameter to `transaction` in both interface signatures and in `IndexedDBDatabase`'s `read`, `write`, and `#run`, and rename the local at `IndexedDBDatabase.ts:160` (`native` is already the raw handle, so use `wrapper` or reorder).

## s16-12

12. package=indexeddb file=src/browser/helpers.ts:187,240 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
    wrong: `rangeExactKey(value)` is `IDBKeyRange.only(value)` and `rangeBetweenKeys(lower, upper, lowerOpen, upperOpen)` is `IDBKeyRange.bound` with the same parameters and the same defaults — rename-only wrappers around a semantically identical platform primitive. (`rangePrefix` at line 255 earns its place with the U+FFFF cap; the four single-boundary builders at 197-228 at least fix an otherwise-unreadable boolean.)
    repair: delete `rangeExactKey` and `rangeBetweenKeys`, update the guide rows (`guides/indexeddb.md:60,65`), the fences at lines 229-241, and the batching note at line 202 to call `IDBKeyRange.only` / `IDBKeyRange.bound` directly.

## s16-13

13. package=indexeddb file=src/browser/helpers.ts:85 rule=AGENTS.md § Design laws (One concept, one term); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
    wrong: `guardSync` uses "guard", the term this contract reserves for a total `is*` predicate, for a try/catch translation boundary, and encodes the call's synchrony in the name rather than in its description.
    repair: rename it for what it does — `wrapSyncFault`, paired with the existing `wrapError` — and update its call sites in `IndexedDBDatabase.ts`, `IndexedDBStore.ts`, `IndexedDBIndex.ts`, `IndexedDBTransaction.ts`, `IndexedDBTransactionStore.ts`, `IndexedDBCursor.ts`, plus `guides/indexeddb.md:59,302,313`.

## s16-14

14. package=indexeddb file=src/browser/errors.ts:18,25 rule=.claude/rules/documentation.md § Parity; .claude/rules/typescript.md § Errors and outcomes verdict=CONFIRMED
    wrong: the `IndexedDBError` remark instructs "Narrow a caught value with `instanceof IndexedDBError`" and its `@example` does exactly that, while the package ships `isIndexedDBError` (line 45) for that purpose and `guides/indexeddb.md:342-350` teaches the guard. The TSDoc points consumers away from the package's own supported mechanism.
    repair: change the remark to name `isIndexedDBError` and rewrite the `@example` to `if (isIndexedDBError(error) && error.code === 'CONSTRAINT')`.

## s16-15

15. package=indexeddb file=src/browser/IndexedDBCursor.ts:30 rule=AGENTS.md § Design laws (Absence is `undefined`; One concept, one term) verdict=CONFIRMED
    wrong: a cursor position whose stored value is not a record becomes `{}` — an invented empty-value sentinel that a consumer cannot tell from a genuinely empty record — while `readRecord` (`helpers.ts:113`) reports the same boundary condition as `undefined`. One narrowing boundary, two different absences.
    repair: declare `readonly value: Row | undefined` on `IndexedDBCursorInterface` (`types.ts:232`), store `isRecord(cursor.value) ? cursor.value : undefined`, and state the non-record case in the interface remark.

## s16-16

16. package=indexeddb file=src/browser/IndexedDBCursor.ts:71,87 rule=AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: the public `advance(count)` skips forward `count` records while the private `#advance()` awaits the shared request and wraps the next position; the same word names two different operations inside one class, and `continue` and `seek` both call `#advance` rather than advancing.
    repair: rename `#advance` to `#next`, matching what it returns.

## s16-17

17. package=indexeddb file=src/browser/types.ts:129-165 rule=.claude/rules/names.md § Split instead of compounding (extract sub-entities); AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: `IndexedDBUpgradeContext` carries two verb pairs for one add/remove concept — `create` / `drop` for a store and `index` / `deindex` for an index — and `deindex` is a coined term; `index` is also used as a noun everywhere else in the package (`store.index(name)`, `StoreDefinition.indexes`).
    repair: extract the two families into sub-entity nouns with one verb pair each: `context.stores.create(name, definition)` / `context.stores.drop(name)` and `context.indexes.create(store, definition)` / `context.indexes.drop(store, name)`; update `IndexedDBDatabase.#context` (lines 312-328) and the guide's context rows (`guides/indexeddb.md:86,191,377`).

## s16-18

18. package=indexeddb file=src/browser/helpers.ts:31,49,69,95,117,141,161,181,191,201,211,221,231,249,261; src/browser/factories.ts:5 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of the public helpers is imperative ("Resolve an `IDBRequest`…", "Run a synchronous native…", "Build a key range…", "Create a browser-native…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Resolves…", "Runs…", "Builds…", "Creates…") and mirror it into the guide's helper table.