## Coverage

**csv** (`/home/user/fleet/csv`) — read every `src/**/*.ts` file: `src/core/types.ts`, `CSV.ts`, `constants.ts`, `helpers.ts`, `parsers.ts`, `validators.ts`, `shapers.ts`, `factories.ts`, `errors.ts`, `index.ts`. Also read `guides/csv.md` in full and grepped `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` for `Result`, `parse*`, `recordOf`, `arrayOf`, `literalOf`, `isRecord`. Did not read `tests/`, `configs/`, root files (out of scope).

**indexeddb** (`/home/user/fleet/indexeddb`) — read every `src/**/*.ts` file: `src/browser/types.ts`, `helpers.ts`, `constants.ts`, `errors.ts`, `factories.ts`, `index.ts`, `IndexedDBDatabase.ts`, `IndexedDBStore.ts`, `IndexedDBTransactionStore.ts`, `IndexedDBIndex.ts`, `IndexedDBTransaction.ts`, `IndexedDBCursor.ts`. Read `guides/indexeddb.md` by targeted grep only (`isIndexedDBError`, `finished`, `guardSync`, `range*`, `deindex`, `null`), not end to end. Did not read `tests/`, `configs/`, root files.

**queue** (`/home/user/fleet/queue`) — read every `src/**/*.ts` file: `src/core/types.ts`, `Queue.ts`, `errors.ts`, `validators.ts`, `factories.ts`, `index.ts`, `stores/MemoryQueueStore.ts`, `stores/DatabaseQueueStore.ts`. Grepped `package.json` for the declared `@orkestrel/*` dependency set. Did not read `guides/queue.md` or `tests/`.

**qualifier** (`/home/user/fleet/qualifier`) — read every `src/**/*.ts` file: `src/core/types.ts`, `Qualifier.ts`, `helpers.ts`, `validators.ts`, `constants.ts`, `errors.ts`, `factories.ts`, `index.ts`. Grepped `package.json` and `guides/qualifier.md` (`display-neutral`, `en-US`, `QualificationValidationResult`), not read end to end.

Ruled out deliberately, not reported: the `create{Entity}` pass-through factories (`createCSV`, `createIndexedDBDatabase`, `createQueue`, `createQualifier`) — each returns the interface rather than the class and is the composition seam `.claude/rules/names.md` § Value-level identifiers and `.claude/rules/architecture.md` § Stores presuppose; `DatabaseQueueStore` — its methods rename a foreign `TableInterface` into this package's store vocabulary, which is the translation the wrapper test permits.

## Findings

1. package=csv file=src/core/helpers.ts:1026,1103,1130,1155 rule=.claude/rules/architecture.md § Kind purity; .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: `coerceInferred`, `coerceInteger`, `coerceReal`, and `coerceBoolean` are flat coercers returning `T | undefined` — the exact kind `parsers.ts` owns — and they sit in `helpers.ts` with an `@remarks` (lines 1090-1093, 1113-1117, 1139-1143) stating they were named `coerce*` to avoid confusion with `@orkestrel/contract`'s `parseInteger` / `parseBoolean`, which is the name choosing the file that § Kind purity forbids ("Never let the name choose").
   repair: move the four into `src/core/parsers.ts` and rename them `parseInferred` / `parseInteger` / `parseReal` / `parseBoolean`, update the three importers (`helpers.ts` internal calls, `parsers.ts`, the guide's Parsers table), and delete the naming `@remarks` — the barrel star-exports both files, so only the names move. Correct `coerceReal`'s remark while editing it: it says "same-named `parseReal`" and `@orkestrel/contract` exports no `parseReal` (its coercer is `parseNumber`).

2. package=csv file=src/core/helpers.ts:512 rule=.claude/rules/architecture.md § Centralized-file pattern (Shape values → `*/shapers.ts`); § Kind purity verdict=CONFIRMED
   wrong: `deriveShapes` produces `ContractShape` values (a `Columns` map) and lives in `helpers.ts`, which forces the leaf file to import `columnTypeShape` from `shapers.ts` at line 34 — an edge from the leaf pair up into a kind file § Kind purity says is never consumed by it.
   repair: move `deriveShapes` into `src/core/shapers.ts` beside `columnTypeShape`, and update `CSV.ts:12` to import it from `./shapers.js`. `helpers.ts` then imports nothing from `shapers.ts`.

3. package=csv file=src/core/helpers.ts:489 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
   wrong: `renderTSV` is a one-line delegate that only overrides one data value (`delimiter: '\t'`), adding no boundary, invariant, or narrower contract; `guides/csv.md:232-234` states outright that `renderCSV` with `delimiter: '\t'` is the same operation, and `.claude/rules/names.md` § Split behavioral variants classifies a value selecting a datum for the same operation as data, not a separate function. It also silently discards a caller-supplied `delimiter`.
   repair: delete `renderTSV`, delete its guide row (line 128) and the "Rendering to TSV" pattern fence (lines 440-446), and replace the fence with `renderCSV(table, { delimiter: '\t' })`.

4. package=csv file=src/core/validators.ts:52 rule=.claude/rules/patterns.md § Validation and contracts; .claude/rules/architecture.md § Kind purity verdict=CONFIRMED
   wrong: `isRowList` is typed `(source: CSVTable | readonly Row[]) => source is readonly Row[]`, so it is a union narrower rather than the total `(unknown) => value is T` guard `validators.ts` is defined to hold; a consumer cannot call it on an `unknown`, which the file's own header comment and `guides/csv.md:170-171` both promise of everything in it.
   repair: move `isRowList` to `src/core/helpers.ts` — the file § Kind purity assigns to a predicate that is not a `Guard<T>` — keeping the name, and update `helpers.ts:35` to a local reference and the guide's Validators table row (line 176) to a Helpers row.

5. package=csv file=src/core/types.ts:204 rule=AGENTS.md § Design laws (Absence is `undefined`) verdict=CONFIRMED
   wrong: `comment?: string | false` uses the literal `false` as the "comment handling disabled" sentinel while `undefined` already carries that meaning; `constants.ts:18` defaults it to `false`, so `{ comment: undefined }` and `{ comment: false }` are the same state expressed two ways.
   repair: declare `comment?: string`, drop `comment` from `DEFAULT_PARSE_OPTIONS`, and replace `Required<ParseOptions>` with a `ResolvedParseOptions` alias shaped like the existing `ResolvedRenderOptions` (`types.ts:249`) that keeps `comment` optional; `scanComment` (`helpers.ts:617`) then tests `options.comment === undefined`.

6. package=csv file=src/core/shapers.ts:62 rule=.claude/rules/documentation.md § Parity (falsify a prose claim); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: the TSDoc calls `csvTableShape` "The `ContractShape` of a `CSVTable`", but `CSVTable.rows` is `readonly Row[]` where `Row = Record<string, unknown>` (`types.ts:11,21`) and the shape requires `recordShape(jsonShape())`, so the shape rejects values the declared type admits and disagrees with `isCSVTable` (`validators.ts:36`) on the same input. The divergence itself is deliberate and tested — `guides/csv.md:489-491` names the "leniency-lock cases against `csvTableShape`" — but the sentence claiming shape-of-`CSVTable` is not true of the shipped value.
   repair: reword the first sentence to state what the value is — the JSON-serializable projection of a `CSVTable`, narrower than the declared `CSVTable` type — and say in `@remarks` that `isCSVTable` is the guard for the declared type.

7. package=csv file=src/core/helpers.ts:47,75,100,123,166,192,218,242,271,315,377,408,433,493,546,572,596,628,668,763,782,896,956,1014,1041,1083,1109,1135; src/core/validators.ts:13,42,57; src/core/factories.ts:7,35 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
   wrong: the TSDoc first sentence of nearly every public function is imperative ("Validate a delimiter…", "Merge `options`…", "Scan one quoted field…", "Create a working…"), not the required third person with an `-s` verb; `parseCSV` ("Parses", `parsers.ts:12`) and `readRecords` ("Splits", `helpers.ts:827`) show the intended form, so the file is internally inconsistent as well.
   repair: rewrite each first sentence in third person ("Validates…", "Merges…", "Scans…", "Creates…"), and mirror the change into the matching guide table cells, which already use the third person.

8. package=indexeddb file=src/browser/IndexedDBTransactionStore.ts:36-140 (against src/browser/IndexedDBStore.ts:64-200) rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"; one shared engine over the primitives) verdict=CONFIRMED
   wrong: `get`, `resolve`, `records`, `keys`, `has`, `count`, `set`, `add`, `remove`, `clear`, `cursor`, and `#resolve` are implemented twice with the same bodies, differing only in how the `IDBObjectStore` is obtained (`await this.#store(mode)` versus `this.#store`) and whether `promisifyTransaction` is awaited; `types.ts:288-343` duplicates the member list the same way.
   repair: make `IndexedDBStore` compose the transaction-bound engine instead of restating it — each method opens its store with `#store(mode)`, delegates to `new IndexedDBTransactionStore(store)`, and awaits `promisifyTransaction(store.transaction)` for the write verbs. In `types.ts`, declare the shared member set once and have `IndexedDBStoreInterface` extend it with `name` / `path` / `indexes` / `increment` / `index`.

9. package=indexeddb file=src/browser/IndexedDBTransaction.ts:25-26,52-58 (interface at src/browser/types.ts:361-362) rule=AGENTS.md § Design laws (Derive state) verdict=CONFIRMED
   wrong: `#active` and `#finished` are two stored booleans that are always exact complements — `#settle` (line 100), `abort` (89-90), and the initial values set them together and nothing sets one alone — and the class TSDoc at line 18 admits it ("`finished` is its complement"). `types.ts:361-362` documents them as two independent facts ("`active` is true while it still accepts operations; `finished` is true after commit or abort"), so the shipped class no longer matches the contract's description.
   repair: keep `#finished` only and return `!this.#finished` from `get active()`; then either drop `active` from `IndexedDBTransactionInterface` as derivable by the consumer, or keep it and correct the `types.ts` remark to say the two are complements.

10. package=indexeddb file=src/browser/types.ts:210,263,264,268,290,297,298,301,330,331,334,342 rule=AGENTS.md § Design laws (Absence is `undefined`; `null` only when an external format distinguishes it) verdict=CONFIRMED
    wrong: every `query` parameter is `IDBKeyRange | IDBValidKey | null` on top of being optional, and the implementation proves the package does not distinguish the two absences — `helpers.ts:136` and `IndexedDBStore.ts:96,113` collapse it with `query ?? undefined`. Separately, `IndexedDBStoreInterface.path: KeyPath | null` (line 290) is produced by `IndexedDBStore.ts:53` as `this.#definition.path ?? null`, inventing `null` from a `StoreDefinition.path?` (line 100) that already expresses the same absence by omission.
    repair: drop `| null` from every `query` declaration and delete the `?? undefined` coalesces that exist only to serve it; declare `path: KeyPath | undefined` and return `this.#definition.path` unchanged.

11. package=indexeddb file=src/browser/types.ts:396,400; src/browser/IndexedDBDatabase.ts:119,126,155,160 rule=.claude/rules/names.md § Rejected naming (abbreviations) verdict=CONFIRMED
    wrong: the `read` / `write` scope callback's parameter is named `tx`, an abbreviation of `transaction`, and it appears in the published interface signature where a consumer's IDE shows it.
    repair: rename the parameter to `transaction` in both interface signatures and in `IndexedDBDatabase`'s `read`, `write`, and `#run`, and rename the local at `IndexedDBDatabase.ts:160` (`native` is already the raw handle, so use `wrapper` or reorder).

12. package=indexeddb file=src/browser/helpers.ts:187,240 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
    wrong: `rangeExactKey(value)` is `IDBKeyRange.only(value)` and `rangeBetweenKeys(lower, upper, lowerOpen, upperOpen)` is `IDBKeyRange.bound` with the same parameters and the same defaults — rename-only wrappers around a semantically identical platform primitive. (`rangePrefix` at line 255 earns its place with the U+FFFF cap; the four single-boundary builders at 197-228 at least fix an otherwise-unreadable boolean.)
    repair: delete `rangeExactKey` and `rangeBetweenKeys`, update the guide rows (`guides/indexeddb.md:60,65`), the fences at lines 229-241, and the batching note at line 202 to call `IDBKeyRange.only` / `IDBKeyRange.bound` directly.

13. package=indexeddb file=src/browser/helpers.ts:85 rule=AGENTS.md § Design laws (One concept, one term); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
    wrong: `guardSync` uses "guard", the term this contract reserves for a total `is*` predicate, for a try/catch translation boundary, and encodes the call's synchrony in the name rather than in its description.
    repair: rename it for what it does — `wrapSyncFault`, paired with the existing `wrapError` — and update its call sites in `IndexedDBDatabase.ts`, `IndexedDBStore.ts`, `IndexedDBIndex.ts`, `IndexedDBTransaction.ts`, `IndexedDBTransactionStore.ts`, `IndexedDBCursor.ts`, plus `guides/indexeddb.md:59,302,313`.

14. package=indexeddb file=src/browser/errors.ts:18,25 rule=.claude/rules/documentation.md § Parity; .claude/rules/typescript.md § Errors and outcomes verdict=CONFIRMED
    wrong: the `IndexedDBError` remark instructs "Narrow a caught value with `instanceof IndexedDBError`" and its `@example` does exactly that, while the package ships `isIndexedDBError` (line 45) for that purpose and `guides/indexeddb.md:342-350` teaches the guard. The TSDoc points consumers away from the package's own supported mechanism.
    repair: change the remark to name `isIndexedDBError` and rewrite the `@example` to `if (isIndexedDBError(error) && error.code === 'CONSTRAINT')`.

15. package=indexeddb file=src/browser/IndexedDBCursor.ts:30 rule=AGENTS.md § Design laws (Absence is `undefined`; One concept, one term) verdict=CONFIRMED
    wrong: a cursor position whose stored value is not a record becomes `{}` — an invented empty-value sentinel that a consumer cannot tell from a genuinely empty record — while `readRecord` (`helpers.ts:113`) reports the same boundary condition as `undefined`. One narrowing boundary, two different absences.
    repair: declare `readonly value: Row | undefined` on `IndexedDBCursorInterface` (`types.ts:232`), store `isRecord(cursor.value) ? cursor.value : undefined`, and state the non-record case in the interface remark.

16. package=indexeddb file=src/browser/IndexedDBCursor.ts:71,87 rule=AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: the public `advance(count)` skips forward `count` records while the private `#advance()` awaits the shared request and wraps the next position; the same word names two different operations inside one class, and `continue` and `seek` both call `#advance` rather than advancing.
    repair: rename `#advance` to `#next`, matching what it returns.

17. package=indexeddb file=src/browser/types.ts:129-165 rule=.claude/rules/names.md § Split instead of compounding (extract sub-entities); AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: `IndexedDBUpgradeContext` carries two verb pairs for one add/remove concept — `create` / `drop` for a store and `index` / `deindex` for an index — and `deindex` is a coined term; `index` is also used as a noun everywhere else in the package (`store.index(name)`, `StoreDefinition.indexes`).
    repair: extract the two families into sub-entity nouns with one verb pair each: `context.stores.create(name, definition)` / `context.stores.drop(name)` and `context.indexes.create(store, definition)` / `context.indexes.drop(store, name)`; update `IndexedDBDatabase.#context` (lines 312-328) and the guide's context rows (`guides/indexeddb.md:86,191,377`).

18. package=indexeddb file=src/browser/helpers.ts:31,49,69,95,117,141,161,181,191,201,211,221,231,249,261; src/browser/factories.ts:5 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of the public helpers is imperative ("Resolve an `IDBRequest`…", "Run a synchronous native…", "Build a key range…", "Create a browser-native…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Resolves…", "Runs…", "Builds…", "Creates…") and mirror it into the guide's helper table.

19. package=queue file=src/core/Queue.ts:141-205 and 76-99 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"); § Functions and orchestration (extract pure leaves) verdict=CONFIRMED
    wrong: `enqueue` repeats one 16-line block four times — read the option inside a try/catch, throw a coded `QueueError` on a throwing getter, then run a guard and throw a second coded error — for `id`, `retries`, `timeout`, and `signal`; the constructor repeats a three-line default-then-guard-then-throw block three times for `concurrency`, `retries`, and `timeout`.
    repair: add `src/core/helpers.ts` (barrelled from `index.ts`) with two exported leaves — one that reads a named option from a foreign options object and throws the coded read failure, and one that applies a guard and throws the coded invalid-value failure — and call them from both sites.

20. package=queue file=src/core/Queue.ts:61-62,66-67,330-331,371-372 rule=AGENTS.md § Design laws (Derive state) verdict=CONFIRMED
    wrong: `#aborted` duplicates `#abortPromise !== undefined` and `#destroyed` duplicates `#destroyPromise !== undefined` — each pair is assigned on adjacent lines in the only method that sets it (`abort` at 330-331, `destroy` at 371-372) and nowhere else, so both are second flags that can drift from the latch they mirror. (`#stopped` is genuinely independent: `abort` sets it without a `#stopPromise`.)
    repair: delete the `#aborted` and `#destroyed` fields and read `this.#abortPromise !== undefined` / `this.#destroyPromise !== undefined` at their nineteen read sites, or keep the flags and delete the latches — one fact, one field.

21. package=queue file=src/core/Queue.ts:510 rule=AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: `#drain(error)` rejects pending work and returns cleanup promises, while the `drain` event (`types.ts:92`) means the queue reached no reserved live ids and is served by `#latchDrain` / `#emitDrain` (690, 696). The same word names a rejection sweep and an idle transition in one class.
    repair: rename `#drain` to `#rejectPending` at its declaration and its three call sites (299, 340, 358), leaving `drain`, `#latchDrain`, and `#emitDrain` to the idle concept alone.

22. package=queue file=src/core/types.ts:207-211; src/core/Queue.ts:113-131 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the five public data members `emitter`, `count`, `active`, `paused`, and `stopped` carry no TSDoc on the interface and none on the class, while every call-signature member beside them does (`types.ts:212-229`); a consumer reading the type learns nothing about what `count` tallies versus `active`, which is exactly the distinction `.claude/rules/names.md` § Tallies makes this pair carry.
    repair: add a one-line TSDoc to each of the five interface members stating the fact each reports (`count` = reserved live entries, `active` = claimed in flight, `stopped` = stopped or aborted), and add `@returns` to `restore`, `stop`, `abort`, `clear`, and `destroy` on the class.

23. package=queue file=src/core/Queue.ts:251; src/core/stores/MemoryQueueStore.ts:42 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
    wrong: the stored-entry validity test `!isString(id) || !isQueueRetries(attempts)` is written out in two files against the same `StoredEntry` contract, so a change to what a valid stored entry is has two homes; `validators.ts` holds no guard for the package's own `StoredEntry` type even though it is the type crossing the store boundary.
    repair: add `isStoredEntry` to `src/core/validators.ts` as a total guard over `StoredEntry<unknown>` and route both sites through it.

24. package=queue file=src/core/Queue.ts:77,85,93; src/core/validators.ts:48 rule=.claude/rules/architecture.md § Centralized-file pattern (Constants/data → `*/constants.ts`); § Kind purity verdict=CONFIRMED
    wrong: the queue's published defaults (`concurrency` 1, `retries` 0, `timeout` 0) and the native timer ceiling `2_147_483_647` are bare literals in a class body and a guard, and are restated in prose at `types.ts:139-141` and `164-168`, so the documented default and the enforced default are two independent facts.
    repair: add `src/core/constants.ts` (barrelled) with `DEFAULT_CONCURRENCY`, `DEFAULT_RETRIES`, `DEFAULT_TIMEOUT`, and `MAX_TIMEOUT`, and read them from the constructor and `isQueueTimeout`.

25. package=queue file=src/core/types.ts:247 rule=.claude/rules/names.md § Type-level identifiers verdict=CONFIRMED
    wrong: `StoredEntry` is the only public type in the module that does not name its entity — every sibling is `Queue*` (`QueueCode`, `QueueEntryOptions`, `QueueEventMap`, `QueueStoreInterface`) — so the package's most-passed data type reads as unowned in a consumer's import list.
    repair: rename it `QueueEntry` and update `types.ts`, `Queue.ts`, `factories.ts`, `stores/MemoryQueueStore.ts`, `stores/DatabaseQueueStore.ts`, and the guide rows.

26. package=queue file=src/core/validators.ts:4,20,36,52; src/core/errors.ts:31; src/core/Queue.ts:71,134,239,280,288,308,314,321,348,367; src/core/stores/MemoryQueueStore.ts:28,36,61,67,89; src/core/stores/DatabaseQueueStore.ts:37,46,51,56,61 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of the public guards, methods, and constructors is imperative ("Determine whether…", "Create a queue.", "Reserve and submit one FIFO entry.", "Upsert a validated…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Determines whether…", "Creates a queue.", "Reserves and submits…", "Upserts…").

27. package=qualifier file=src/core/types.ts:114; src/core/validators.ts:162 rule=.claude/rules/architecture.md § Barrel exports ("Never re-export a symbol originating in another package"); § Wrapper test verdict=CONFIRMED
    wrong: `export type QualificationValidationResult = ReasonValidationResult` and `export const isQualificationValidationResult: Guard<QualificationValidationResult> = isReasonValidationResult` republish `@orkestrel/reason`'s type and guard under new names through this package's barrel, adding nothing. The `@remarks` at `validators.ts:153-157` and `guides/qualifier.md:147` argue for delegation, which is an argument for importing reason's symbol at the call site rather than for aliasing it here.
    repair: delete both aliases; type `QualifierInterface.validate` as `ReasonValidationResult` imported from `@orkestrel/reason`, and point the guide's validator row and the fences at lines 163 and 192 at `isReasonValidationResult` from its own package.

28. package=qualifier file=src/core/helpers.ts:812,845 rule=.claude/rules/architecture.md § Centralized-file pattern (Entity/value factories → `*/factories.ts`); § Kind purity verdict=CONFIRMED
    wrong: `qualificationDefinition` and `rulingDefinition` construct and return `QualificationDefinition` and `Ruling` values from their parts — value factories — but live in `helpers.ts` and carry neither the `create*` form § Kind purity fixes for `factories.ts` nor the `*Of` builder form.
    repair: move both into `src/core/factories.ts` beside `createQualifier` and rename them `createQualification` and `createRuling`; update `helpers.ts`'s own `@example` fences (lines 561, 708, 744, 807, 840) and the guide's helper table.

29. package=qualifier file=src/core/helpers.ts:489,510,536-537,815 rule=AGENTS.md § Non-negotiable rules (public return collections readonly); .claude/rules/typescript.md § Types verdict=CONFIRMED
    wrong: `deriveFindingEligibility(findings: Finding[])`, `deriveScopeEligibilities(findings: Finding[])`, `combineEligibilities(eligibilities: Eligibility[])`, and `qualificationDefinition(passes: QualificationPass[])` take mutable arrays, so the package's own readonly result types cannot be fed back into its own public helpers: `QualificationResult.findings` is `readonly Finding[]` (`types.ts:106`) and `QualificationDefinition.passes` is `readonly QualificationPass[]` (`types.ts:95`), and neither is assignable.
    repair: widen all four parameters to `readonly Finding[]`, `readonly Eligibility[]`, and `readonly QualificationPass[]`; the bodies only read and spread, so no other change is needed.

30. package=qualifier file=src/core/helpers.ts:575,719,755 rule=.claude/rules/names.md § Standalone helpers ("A helper prefix has one project-wide meaning") verdict=CONFIRMED
    wrong: `findMissingReferences`, `findEmptyLogicalPasses`, and `findUnreadDerivations` return `readonly string[]` of formatted human messages, not the references, passes, or derivations their names promise, while `findRule` (line 285) in the same file returns the located `Rule`. The prefix carries two meanings in one module, and the message-producing three are consumed by pushing their return straight into `errors` / `warnings` (`Qualifier.ts:116,118,119`).
    repair: rename the three to the file's existing prose-producing prefix — `describeMissingReferences`, `describeEmptyLogicalPasses`, `describeUnreadDerivations` — leaving `find*` to mean locate; update `Qualifier.ts:22-26,116-119` and the guide's helper table.

31. package=qualifier file=src/core/helpers.ts:66,84-107; claim restated at src/core/types.ts:51 and src/core/helpers.ts:72,110,144 rule=AGENTS.md § Design laws (Mechanism, not product policy); .claude/rules/writing.md § Claims and time verdict=CONFIRMED
    wrong: the rendering helpers are documented as producing "display-neutral" output, but `describeComparison` returns hard-coded English phrases (`'is more than'`, `'is none of'`) and `interpolateMessage` formats every finite number with a hard-coded `'en-US'` grouping; a consumer rendering in another language or locale has no seam — `QualifierOptions.labels` overrides field names only. The shipped artifact does not match the sentence describing it.
    repair: either state the limit honestly — replace "display-neutral" with "English, `en-US`-formatted" in `types.ts:51`, `helpers.ts:72,110,144`, and `guides/qualifier.md:76,206` — or make it true by moving the phrase table into `constants.ts` and adding a `phrases` and `locale` option beside `labels` on `QualifierOptions`. Take the first unless a consumer needs the second.

32. package=qualifier file=src/core/errors.ts:15,17 rule=.claude/rules/typescript.md § Errors and outcomes ("Error classes expose a machine-readable `code` and optional `context`") verdict=CONFIRMED
    wrong: `QualifierError.context` is published as `unknown` and is not optional, so a consumer cannot read it without narrowing that the package could have done once — yet every construction site passes the same shape, `{ pass, cause }` (`helpers.ts:673,681,684,690`), and the sibling package declares `QueueErrorContext` for exactly this.
    repair: declare `QualifierErrorContext { readonly pass?: string; readonly cause?: unknown }` in `types.ts`, type the field `QualifierErrorContext | undefined`, and take the same type in the constructor.

33. package=qualifier file=src/core/Qualifier.ts:79,83,98,123; src/core/validators.ts:33,36,166,171,186; src/core/errors.ts:26 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the `Qualifier` class's entire public surface — `get emitter`, `qualify`, `validate`, `destroy` — carries no TSDoc at all, and `QualifierInterface`'s members (`types.ts:138-141`) carry none either, so `qualify`'s throw behaviour (`QualifierError('DEFINITION')` at line 88) is documented nowhere in source. Five public guards and `isQualifierError` carry a description with no `@param` or `@returns`, while `isPremise` and its siblings in the same file carry both.
    repair: add full TSDoc — description, `@param`, `@returns`, `@throws`, `@example` — to the four `Qualifier` members and to `QualifierInterface`'s members, and add `@param` / `@returns` to `isEligibility`, `isQualificationEffect`, `isQualificationPass`, `isRuling`, `isQualificationDefinition`, and `isQualifierError`.

34. package=qualifier file=src/core/helpers.ts:38,72,110,144,178,213,267,290,342,368,387,411,470,498,518,553,603,620,646,696,730,792,829; src/core/validators.ts:32,35,38,57,81,107,127,151,165,170,185; src/core/errors.ts:25; src/core/factories.ts:5 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of every public export is imperative ("Interpolate…", "Describe…", "Build…", "Derive…", "Determine whether…", "Narrow a caught value…", "Create one qualifier…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Interpolates…", "Describes…", "Builds…", "Derives…", "Determines whether…", "Narrows…", "Creates…") and mirror it into the guide tables.

## Clean

None. Every package under audit carries at least one confirmed finding.

## Deviation

None.