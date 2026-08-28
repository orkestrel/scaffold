# Findings for group h05 (verification round 2)

Packages: database. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it. Note: scaffold lives at /home/user/scaffold, every other package at /home/user/fleet/<name>.

## s05-01

1. package=database file=`src/core/validators.ts:26` rule=`.claude/rules/patterns.md` § Validation and contracts; `.claude/rules/architecture.md` § Centralized-file pattern verdict=CONFIRMED
   wrong: `validatePage` is a throwing assertion (`throw new DatabaseError('VALIDATION', …)`) living in the guards file, which the rules reserve for total `is*` guards with no side effects.
   repair: Move `validatePage` to `src/core/helpers.ts` (which already imports `DatabaseError` and already imports this function), delete the import in `validators.ts`, and update `Table.ts:33`, `Query.ts:11`, `MemoryDriver.ts:25`, and `server/compilers.ts:13` to import it from the helper module.

## s05-02

2. package=database file=`src/core/DatabaseIterator.ts:12` and `src/core/TransactionIterator.ts:11` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice"; "one minimal interface and one shared engine") verdict=CONFIRMED
   wrong: The two classes are the same class twice. `[Symbol.asyncIterator]`, `next`, `return`, `throw`, `#return`, `#throw`, and `#cleanup` are byte-identical; the only differences are the `await this.#context.connect()` line in `DatabaseIterator.#next` and whether `#continue` reads `#context` or `#scope`. Both collaborators already expose the identical admission pair (`DatabaseContext.accepting`/`track` at `DatabaseContext.ts:68,133`; `TransactionScope.accepting`/`track` at `TransactionScope.ts:19,29`).
   repair: Declare one admission contract in `src/core/types.ts` (`readonly accepting: boolean` plus `track<R>(operation: () => Promise<R>): Promise<R>`), keep one class — `src/core/ScopedIterator.ts` — taking that admission plus a `ready: () => Promise<void>` thunk (the shape `Table` already uses), delete the other file, and update `Table.ts:257` and `TransactionScope.ts:58`.

## s05-03

3. package=database file=`src/server/drivers/SQLiteDriver.ts:922-1046` and `src/server/drivers/JSONDriver.ts:463-556` rule=`.claude/rules/architecture.md` § Wrapper test; `.claude/rules/names.md` § Extract sub-entities verdict=CONFIRMED
   wrong: Each driver assembles its scoped `StorageInterface` as an object literal of `.bind(this, token)` closures over a parallel prefixed private-method family (`#readTransaction` … `#stampTransaction`; `#readCandidate` … `#stampCandidate`). In `JSONDriver` every one of those members is a pure one-line delegate to `this.#requireCandidate(token).<same method>` — the wrapper test's named case. The prefixed family is exactly the shape `names.md` says means a separate entity is hiding inside the class.
   repair: Extract one class per driver — `src/server/drivers/TransactionStorage.ts` and `src/server/drivers/CandidateStorage.ts` — implementing `StorageInterface` over `(owner, token)`, delete the two method families and both `#capability` methods, and return `new …Storage(this, token)`. For `JSONDriver` the class body is a token check plus delegation to the `MemoryDriver` the candidate already is.

## s05-04

4. package=database file=`src/server/compilers.ts:122` (`escapeLike`), `src/server/compilers.ts:483` (`compileQuerySQL` remarks), `guides/database.md:111` rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped"); AGENTS.md § Design laws (Minimal public API) verdict=CONFIRMED
   wrong: `escapeLike` has no consumer anywhere in `src/`. The `starts`/`ends` compile it existed for was replaced by a `substr` compile (`compilers.ts:307-334`), yet `compileQuerySQL`'s remarks still claim "`starts` / `ends` using `LIKE … ESCAPE '\'`" and the guide's export table still describes `escapeLike` as the escaper for that clause. A published export and two prose claims describe a design the code no longer has.
   repair: Delete `escapeLike` and its guide row and test block; strike the `LIKE … ESCAPE '\'` clause from `compileQuerySQL`'s `@remarks` and replace it with the code-point `substr` compile the function actually emits.

## s05-05

5. package=database file=`src/server/compilers.ts:138` (`findColumnStorage`) rule=`.claude/rules/architecture.md` § Kind purity ("non-trivial or reusable → extract, export, unit-test, and route every duplicate through it") verdict=CONFIRMED
   wrong: `findColumnStorage` is exported and tested but called from nowhere in `src/`. The identical lookup is written inline three times: `compilers.ts:244`, `server/helpers.ts:134`, `server/helpers.ts:195`.
   repair: Move `findColumnStorage` to `src/server/helpers.ts` (finding 7 covers the file move) and route all three inline `schema.columns.find(…)` sites through it.

## s05-06

6. package=database file=`src/core/helpers.ts:194` (`matchesFuzzy`) rule=AGENTS.md § Design laws (Minimal public API — "Add or substantively expand a capability with its first real consumer; do not speculate") verdict=CONFIRMED
   wrong: A case-folded subsequence matcher with no consumer in `src/`. `ConditionOperator` (`core/types.ts:56-71`) has no fuzzy member, so nothing in the query engine can reach it. The guide documents it (`guides/database.md:215,1954,1966`), so the exposure is deliberate rather than accidental — but the capability itself was created without a consumer.
   repair: Either add a `fuzzy` member to `ConditionOperator` and wire it through `matchesCondition`, or delete `matchesFuzzy` with its guide rows and test block. Do not leave it as a documented orphan.

## s05-07

7. package=database file=`src/server/compilers.ts:122,138,163` rule=`.claude/rules/architecture.md` § Kind purity ("Each centralized file contains only its named kind"); § Centralized-file pattern (Value inferers → `*/inferers.ts`) verdict=CONFIRMED
   wrong: `compilers.ts` holds three non-compilers: `escapeLike` (a string escaper), `findColumnStorage` (a schema lookup), and `inferValueStorage` (a value inferer whose kind file the table names explicitly).
   repair: This is the rule's "wrong file, right name → move it" case, so the published surface is unchanged. Move `findColumnStorage` to `src/server/helpers.ts`; create `src/server/inferers.ts` for `inferValueStorage` and add `export * from './inferers.js'` to `src/server/index.ts`; delete `escapeLike` per finding 4.

## s05-08

8. package=database file=`src/core/Database.ts:151-177` versus `src/core/DatabaseTransaction.ts:62-88` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice"); § Functions and orchestration (leaf test, case 2) verdict=CONFIRMED
   wrong: `#key` and `#columns` are duplicated verbatim across the two classes, and `#build` differs only in its `ready` thunk and its trailing arguments. `#key` (`this.#primary[name] ?? DEFAULT_PRIMARY`) and `#columns` (map lookup plus a `NOT_FOUND` throw) are pure self-contained computations — the leaf test's "exported helper" case.
   repair: Export `resolvePrimary(primary: PrimaryMap, name: string): string` and `resolveColumns(tables: TableMap, name: string): ColumnMap` from `src/core/helpers.ts`, and call them from both classes.

## s05-09

9. package=database file=`src/core/factories.ts:51`, `src/server/factories.ts:35,75`, `src/browser/factories.ts:32` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates, pass-through factories") verdict=CONFIRMED
   wrong: All four driver factories are one-line `return new X(...)` with the same parameters as the constructor, and all four classes are already exported from their barrels (`core/index.ts:9`, `server/index.ts:6-7`, `browser/index.ts:4`) and documented as public classes in `guides/database.md:83-86`. The factory adds no boundary, invariant, composition, translation, lifecycle, or narrower contract — the return-type change from the class to `DriverInterface` is a widening, not a narrowing. `createDatabase` is exempt: its `const T` type parameter is a real capture `new Database(options)` does not give.
   repair: Keep the factories as the documented entry points and intern the four driver classes — remove `MemoryDriver`, `JSONDriver`, `SQLiteDriver`, and `IndexedDBDriver` from their barrels, name them in the package's parity `INTERNAL` list, and replace the guide's class rows with the factory rows. Their constructors take only values a consumer already holds, so the alternative (delete the factories) is also valid — but pick one; do not keep both surfaces.

## s05-10

10. package=database file=`src/core/factories.ts:51`, `src/server/factories.ts:35,75`, `src/browser/factories.ts:32` rule=`.claude/rules/patterns.md` § Options; AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: Four sibling factories in the same category present four call shapes: `createMemoryDriver()`, `createJSONDriver(path: string)`, `createSQLiteDriver(options?: SQLiteDriverOptions)`, `createIndexedDBDriver(name: string)`. The same first setting is a bare positional in two of them and an options key in the third, so a consumer cannot predict the shape from the category.
    repair: Declare `JSONDriverOptions { readonly path: string }` in `src/server/types.ts` and `IndexedDBDriverOptions { readonly name: string }` in `src/browser/types.ts`, and take an options bag in every driver factory and driver constructor.

## s05-11

11. package=database file=`src/core/helpers.ts:1041,1055,1064` rule=`.claude/rules/architecture.md` § Declaration placement ("Extract local declarations by kind. 'Only used here' and 'not exported' are not exemptions") verdict=CONFIRMED
    wrong: `driverFindings` declares `CONFORMANCE_USERS_SCHEMA`, `CONFORMANCE_POSTS_SCHEMA`, and `CONFORMANCE_SCHEMA` inside its function body in UPPER_SNAKE_CASE. This is fixed shipped data wearing a module-constant name, hidden inside a function and unfrozen.
    repair: Move all three to `src/core/constants.ts` as `Object.freeze`d exports with TSDoc, and import them in `helpers.ts`.

## s05-12

12. package=database file=`src/core/helpers.ts:1035` (`driverFindings`) rule=`.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
    wrong: A module helper named as a noun phrase rather than `{verb}{Noun}`, while its two siblings over the same battery are verb-first (`conformDriver`, `auditDriver`). The trio reads as if `driverFindings` were data.
    repair: Rename to `scanDriver` (or `inspectDriver`) in place, and update `conformDriver`, `auditDriver`, the guide rows at `guides/database.md:205,254,1722`, and `tests/src/core/helpers.test.ts`.

## s05-13

13. package=database file=`src/core/Database.ts:46-53,200-208` rule=`.claude/rules/architecture.md` § Class order ("Constructor: initialize context/options and instantiate child managers") verdict=CONFIRMED
    wrong: The constructor unconditionally builds a `DatabaseContext` and calls `register` on it; `#attach` then reassigns `#context` to a different context and registers again, discarding the one the constructor just built and populated. The constructor's stated job is therefore false on the `import` path, and `#context` cannot be `readonly` only because of it.
    repair: Give the shared context its own construction path — an optional `context` in the internal creation input, or a static `Database.#adopt(options, context)` that builds the instance with the shared context in place — so `#context` becomes `readonly` and `register` runs exactly once per view.

## s05-14

14. package=database file=`src/core/DatabaseContext.ts:129-131` rule=`.claude/rules/architecture.md` § Wrapper test ("A public class method composes real entity behavior; it never exists only to forward 1:1 to a helper") verdict=CONFIRMED
    wrong: `connect()` is `return this.#connect()` and nothing else.
    repair: Inline `#connect`'s body into `connect()` and delete `#connect`; update the two internal call sites (`open()` at line 114, `transaction()` at line 167).

## s05-15

15. package=database file=`src/core/Table.ts:71-81` and `src/core/Cursor.ts:23-29` rule=`.claude/rules/patterns.md` § Options; `.claude/rules/names.md` § Group options by entity verdict=CONFIRMED
    wrong: `Table` takes nine positional constructor parameters and `Cursor` takes five, four of them anonymous callbacks. `DatabaseTransaction.#build` (`DatabaseTransaction.ts:63-73`) must pass a bare `undefined` in the eighth position to skip `context`, which is the shape the grouping rule exists to prevent.
    repair: Declare internal input types in `src/core/types.ts` — one grouped object for `Table` (`ready`, `driver`, `name`, `key`, `contract`, `generate`, `error`, `context`, `scope`) and one for `Cursor` — and take a single options parameter in each constructor.

## s05-16

16. package=database file=`src/core/types.ts:346-364`, `src/core/types.ts:777,790`, `src/core/types.ts:224-226` rule=`.claude/rules/names.md` § General vocabulary ("One term per concept"; "Do not alternate") verdict=CONFIRMED
    wrong: Row deletion is `delete` on `StorageInterface`/`DriverInterface` and `remove` on `TableInterface`, `CursorInterface`, `TableEventMap`, and every `MigrationStep` operation (`table.remove`, `column.remove`, `index.remove`). One concept, two words, and the minority word sits on the layer with the fewest sites.
    repair: Rename `StorageInterface.delete` to `remove` in `src/core/types.ts` and in `MemoryDriver`, `JSONDriver`, `SQLiteDriver`, and `IndexedDBDriver`, aligning the package on the term the rest of the surface already uses.

## s05-17

17. package=database file=`src/core/constants.ts:16-17` and `src/core/helpers.ts:214` rule=`.claude/rules/writing.md` § Claims and time ("Claim only what the reader can check") verdict=CONFIRMED
    wrong: Published TSDoc carries campaign narrative from a different subject: "the SA1–SA4 migration lets a model supply `list` input over the wire" and "now that the authed server runs model-supplied `list` input over the wire". This package has no server, no `list` input, and no model. A reader installing `@orkestrel/database` cannot check either claim, and neither describes why the cap exists here.
    repair: Replace both clauses with the checkable reason: a `LIKE`/`GLOB` pattern can arrive from an untrusted caller, and the cap bounds the pattern factor of the linear two-pointer match. Delete the campaign reference.

## s05-18

18. package=database file=13 files under `src/` (35 occurrences) rule=`.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: Shipped TSDoc cites `AGENTS §1`, `§2`, `§4.4`, `§4.5`, `§5`, `§6.5`, `§9.2`, `§11`, `§12`, `§13`, `§14`, `§21`, `§22`. `AGENTS.md` uses named headings and has no section numbers, so every one of these pointers resolves to nothing — for a consumer of the published package, they resolve to a file they do not have at all. Files: `src/core/types.ts` (13), `src/core/Table.ts` (5), `src/core/constants.ts` (2), `src/core/helpers.ts` (2), `src/core/drivers/MemoryDriver.ts` (2), `src/core/errors.ts` (1), `src/browser/types.ts` (1), `src/browser/drivers/IndexedDBDriver.ts` (2), `src/server/types.ts` (1), `src/server/compilers.ts` (2), `src/server/helpers.ts` (1), `src/server/drivers/SQLiteDriver.ts` (2), `src/server/drivers/JSONDriver.ts` (1).
    repair: Delete every `AGENTS §N` citation. Where the sentence carries no content without it, restate the invariant the rule requires — for example, replace "(AGENTS §11)" with "the input row is never mutated".

## s05-19

19. package=database file=`src/server/helpers.ts:80,86-90` rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: `matchesDeclaredStorage`'s TSDoc documents `@param type` — a parameter that does not exist, the parameter is `storage` — and its `@example` calls `matchesDeclaredType(...)`, a symbol this package does not export. The doc was left behind by a rename.
    repair: Change `@param type - The column's declared portable type` to `@param storage - …` and rewrite both example calls as `matchesDeclaredStorage(…)`.

## s05-20

20. package=database file=`src/core/helpers.ts:284,289`; `src/browser/constants.ts:6,15` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc") verdict=CONFIRMED
    wrong: Four public exports carry only a `//` comment. `matchesLikePattern` and `matchesGlobPattern` are barrelled through `core/index.ts` with no description, `@param`, or `@returns`. `INDEXABLE_STORAGE` and `METADATA_STORE` are barrelled through `browser/index.ts` the same way, while their `src/server/constants.ts` counterparts carry full TSDoc.
    repair: Give each a description, `@param`/`@returns` where applicable, and an `@example` for the two matchers.

## s05-21

21. package=database file=`src/browser/constants.ts:6` rule=`.claude/rules/architecture.md` § Kind purity ("freeze object/array data with `Object.freeze`") verdict=CONFIRMED
    wrong: `INDEXABLE_STORAGE` is a live `Set` exported through the browser barrel. `ReadonlySet` is a compile-time annotation only, so a consumer holding it can call `add`/`delete` and change the driver's pushdown behavior. Its server counterparts `EXACT_COLUMN_STORAGE` and `EXACT_RANGE_COLUMN_STORAGE` are frozen arrays — the same fact in two shapes.
    repair: Declare it as `readonly ColumnStorage[]` wrapped in `Object.freeze`, matching the server constants, and change `browser/helpers.ts:173` from `.has(column.storage)` to `.some((storage) => storage === column.storage)`, which is the form `server/helpers.ts` already uses.

## s05-22

22. package=database file=`src/core/drivers/MemoryDriver.ts:141`, `src/browser/drivers/IndexedDBDriver.ts:266` rule=`.claude/rules/architecture.md` § Class order verdict=CONFIRMED
    wrong: In both drivers `#stream` sits between the public `stream` and the public `clear`/`snapshot`, so the private block starts in the middle of the public interface. `SQLiteDriver` and `JSONDriver` place theirs correctly, so the package disagrees with itself.
    repair: Move `#stream` into each class's private block after the last public method.

## s05-23

23. package=database file=`src/server/compilers.ts` (whole file) rule=AGENTS.md § Design laws (One concept, one term); `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
    wrong: One kind of function carries three naming conventions in one file: `compile{Noun}SQL` (`compileColumnSQL`, `compileFieldSQL`, `compileAggregateSQL`, `compileJSONTypeSQL`, `compileConditionSQL`, `compileQuerySQL`), `compile{Noun}` with the suffix dropped (`compileWhere`, `compileOrder`, `compilePage`), and `{noun}To{Noun}` (`schemaToTable`, `schemaToIndexes`, `stepToSQL`). All of them take a portable input and return SQL text.
    repair: Rename every SQL emitter to `compile{Noun}SQL` — `compileWhereSQL`, `compileOrderSQL`, `compilePageSQL`, `compileTableSQL`, `compileIndexesSQL`, `compileStepSQL` — and update the barrel consumers, the guide export table, and `tests/src/server/compilers.test.ts`.

## s05-24

24. package=database file=`src/core/Query.ts:21`, `src/core/Cursor.ts:12` rule=AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: Both classes spell their default type parameter `Record<string, unknown>` while the interfaces they implement spell the same type `Row` (`core/types.ts:44`, `QueryInterface<T = Row>`, `CursorInterface<T = Row>`). The package's own vocabulary word is bypassed at the only two sites that could use it.
    repair: Import `Row` and write `Query<T = Row>` and `Cursor<T = Row>`.

## s05-25

25. package=database file=`src/core/helpers.ts:38,86`; `src/server/compilers.ts:127,143`; `src/server/helpers.ts:75,99,177,205`; `src/browser/helpers.ts:25` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does … and never repeats the symbol's name") verdict=CONFIRMED
    wrong: Ten public exports open with a bare noun phrase and no verb at all — `compareValues` ("A total ordering over arbitrary values…"), `equalsValue` ("Structural equality by SameValueZero leaves…"), `findColumnStorage`, `inferValueStorage`, `matchesAbsentPath`, `matchesDeclaredStorage`, `matchesConditionExactly`, `matchesOrderExactly`, `matchesQueryExactly`, `conditionToRange` (each opening "Whether …" or "The …"). These are outside the fleet's confirmed convention, not an instance of it.
    repair: Rewrite each opening sentence to start with a verb in the package's established form — "Compare two arbitrary values…", "Report whether a caught filesystem error…", "Read the declared storage type of a flat column…".

## s05-26

26. package=database file=`src/core/helpers.ts`, `src/core/validators.ts`, `src/core/cloners.ts`, `src/core/factories.ts`, `src/core/errors.ts`, `src/core/constants.ts`, `src/core/Table.ts`, `src/core/Database.ts`, `src/core/DatabaseContext.ts`, `src/core/Query.ts`, `src/core/Cursor.ts`, `src/core/TransactionScope.ts`, `src/core/DatabaseTransaction.ts`, `src/core/DatabaseIterator.ts`, `src/core/TransactionIterator.ts`, `src/core/DriverIterator.ts`, `src/core/drivers/MemoryDriver.ts`, `src/browser/helpers.ts`, `src/browser/factories.ts`, `src/browser/types.ts`, `src/browser/drivers/IndexedDBDriver.ts`, `src/server/helpers.ts`, `src/server/compilers.ts`, `src/server/factories.ts`, `src/server/types.ts`, `src/server/constants.ts`, `src/server/drivers/SQLiteDriver.ts`, `src/server/drivers/JSONDriver.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=EXEMPT
    wrong: TSDoc first sentences use the imperative ("Create a database…", "Clone unknown driver metadata…", "Validate the paging fields…") rather than the third-person `-s` form the rule states.
    repair: None here. A dedicated fleet convention lane confirmed the imperative form fleet-wide, including in this package (66 imperative to 0 third-person). Recorded so the sweep is not re-run; the rule text is the artifact that needs reconciling, not this package. Finding 25 is disjoint from this one and does stand.

## s05-27

27. package=database file=`src/server/drivers/JSONDriver.ts:54-56`; `src/server/factories.ts:15-17` rule=`.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: Both places call `JSONDriver` "scan-only". It implements `stream` (`JSONDriver.ts:147`), an optional native read hook that `Table.#scan` prefers over `scan` (`Table.ts:359-362`). The enumeration beside the label is accurate; the label is not, and a reader chooses a driver from the label.
    repair: Replace "It is scan-only" with the accurate statement: it implements the native `stream` hook and none of `records` / `aggregate`, so the core engine answers every non-streaming query.

## s05-28

28. package=database file=`src/core/DriverIterator.ts:11` rule=`.claude/rules/architecture.md` § Environment/module placement ("Promote a declaration to the environment root only when at least two modules use it") verdict=CONFIRMED
    wrong: `DriverIterator` sits in `src/core/` with no core consumer and is not in `core/index.ts`. Its only consumers are `src/server/drivers/SQLiteDriver.ts` and `src/server/drivers/JSONDriver.ts`, which reach it by the relative path `../../core/DriverIterator.js`.
    repair: Move it to `src/server/DriverIterator.ts` and update the two imports. Move it back to core when a browser or core consumer appears.

## s05-29

29. package=database file=`src/browser/helpers.ts:251` (`mapMigrationError`) rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
    wrong: The sibling pair names two different axes. `mapIndexedDBError` names its input type; `mapMigrationError` names one output code. Both take an `IndexedDBError`, so the pair reads as though they accept different inputs.
    repair: Rename to `mapIndexedDBMigrationError`, keeping the input-named axis both functions share, and update `IndexedDBDriver.ts` and the guide row.