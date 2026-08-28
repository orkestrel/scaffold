# Fix dossier: contract

Verified fix-producing findings for the `contract` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s03-01 — DRIFT-RESHAPE

1. package=contract file=`/home/user/fleet/contract/src/core/shapers.ts:1159`, `:984`, `:855`; `/home/user/fleet/contract/src/core/inferers.ts:99`, `:701`, `:780`, `:897`, `:1089`, `:1216`; `/home/user/fleet/contract/src/core/helpers.ts:1452` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test, item 3) and § Barrel exports verdict=CONFIRMED
   wrong: Each of these is a recursive traversal spine written as a module function, so its `visited` / `memo` / `ancestors` / `depth` state became public parameters, and each one's own TSDoc then has to tell the caller that the values its signature accepts are "not supported usage".
   repair: Give each traversal an owning class with `#` private recursion and `#` traversal state, exactly as `ShapeCloner`, `ShapeValidator`, and `ContractCompiler` already do; keep `schemaToShape`, `valueToSchema`, `samplesToSchema`, `canonicalStringify`, and `isJSONValue` as the doors, and drop the state parameters from the published signatures. The guide's justification for exporting them (`guides/contract.md:423`, citing the export law) answers why a module function is exported, not why the spine is a module function.

### Verification

**Judge (DRIFT-RESHAPE/medium):** Both lanes are partly right and each carries one factual error. The core violation is real: shapers.ts and inferers.ts hold mutually recursive spines whose cycle/memo state sits in published parameters, and three of those signatures document the parameter they accept as "not supported usage" — a sig

**Lane INVALID/medium:** drop — a narrower successor finding could be raised against the three `shapers.ts` signatures alone, on the ground that a public parameter documented as "not supported usage" is not a contract; that is a different claim from the one filed here

**Lane DRIFT-RESHAPE/high:** amend: apply the class-owned `#` recursion to the shapers and inferers spines only (`schemaNodeToShape`, `buildShapeFromNode`, `buildObjectShape`, `inferValue`, `inferArray`, `inferObject`, `inferSamples`, `inferRecordSamples`, `canonicalizeValue`); strike `helpers.ts:1452` from the unit — `matchesJSONValue` and `isJSONValue` sit in the leaf pair, which architecture.md § Kind purity forbids to import a class, so its `ancestors` parameter stays.

## s03-02 — DRIFT-RESHAPE

2. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:787-802` rule=`AGENTS.md` § Design laws ("Centralize by kind") and `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: `readValue` re-declares the `ContractCode` vocabulary as an inline chain of equality tests, and that copy has already drifted from the union in `types.ts:49-75` and from the second copy in `errors.ts:89-103` — it omits `'expansion'`.
   repair: Export `CONTRACT_CODES` as a frozen array in `constants.ts` beside `JSON_SCHEMA_TYPES`, and have `readValue` and `isContractError` both ask it through `collectMembers` / `matchesMember`. **Referral to the objective lane:** whether the omission changes the `code` a published refusal carries (`readValue(cb, r, { code: 'expansion' })` resolving to `'structure'`) is a behaviour question I did not run.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplicated vocabulary, its divergence, and the live published-surface consequence are all real and both lanes confirm them. The repair's destination is right and its mechanism is impossible: it tells `isContractError` to ask `collectMembers` / `matchesMember`, which live in helpers.ts, and error

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: export `CONTRACT_CODES` as a frozen array in `constants.ts` beside `JSON_SCHEMA_TYPES`; route `readValue` through `collectMembers` / `matchesMember` over it; have `isContractError` test membership over that same constant with its own indexed loop, because `errors.ts` cannot import `helpers.ts`.

## s03-03 — DRIFT

3. package=contract file=`/home/user/fleet/contract/src/core/combinators.ts:1023-1027` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties … readonly") and `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `stringOf` declares its options as an inline object type with mutable `min` / `max` / `pattern` members, duplicating `StringShapeOptions` (`types.ts:797-802`), which already declares the same members as `readonly`.
   repair: Declare the type in `types.ts` (`StringGuardOptions`, `readonly` members) and reference it from the signature, or accept `Omit<StringShapeOptions, 'description'>` directly.

## s03-04 — DRIFT-RESHAPE

4. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:1086-1091`, `:452`; `/home/user/fleet/contract/src/core/shapers.ts:758`, `:793` rule=`.claude/rules/typescript.md` § Types and `.claude/rules/architecture.md` § Centralized-file pattern verdict=CONFIRMED
   wrong: `readGuardShape`, `collectEntries`, `deriveLengthBounds`, and `deriveRangeBounds` declare their public return types inline in the signature, while the package's own precedent puts exactly this kind of return type in `types.ts` (`ArrayRead` for `readArrayEntries`, `RandomFunction` / `AuditorFunction` / `SeederFunction` for the compiled families).
   repair: Add named `readonly` interfaces to `types.ts` — a `GuardShapeRead`, a `ShapeBounds`, and an `EntryCollector` function type — and reference them from the signatures.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes confirm the drift and I confirmed every cited line: three inline object return types and one inline function return type, against the package's own named precedent in types.ts. The repair is wrong on one name. `EntryCollector` is a function type, and the Type-level identifiers table fixes

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: add the named `readonly` types to `types.ts` as the finding says, but name the function type `EntryCollectorFunction` per the Type-level identifiers table, and give the bounds type a singular name (`ShapeBound` or `BoundsRead`) rather than `ShapeBounds`.

## s03-05 — DRIFT

5. package=contract file=`/home/user/fleet/contract/src/core/types.ts:319-349` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The TSDoc block describing the shape-cloner ("Stateful owner of one contract-shape snapshot operation", lines 319-329) is immediately followed by the `ShapeProperty` block, so `ShapeProperty` takes the nearer comment and `ShapeClonerInterface` at line 349 is left with no TSDoc at all — the sibling `JSONClonerInterface` and `SchemaClonerInterface` both have one.
   repair: Move the orphaned block back to sit directly above `export interface ShapeClonerInterface`.

## s03-06 — DRIFT

6. package=contract file=`/home/user/fleet/contract/src/core/types.ts:431-437` rule=`.claude/rules/names.md` § Entity-scoped names and `.claude/rules/patterns.md` § Options verdict=CONFIRMED
   wrong: `ValueToSchemaOptions` uses the compound keys `maxDepth` and `maxProperties` where every other option surface in the package uses single words (`min`, `max`, `integer`, `pattern`, `description`, `closed`, `format`, `enum`).
   repair: Rename to `depth` and `breadth` — the package's own words for these budgets (`types.ts:449`, `INFER_BREADTH_LIMIT`) — and update `sanitizeDepth` / `sanitizeBudget` call sites, `inferers.ts`, `constants.ts` TSDoc, and the guide rows.

## s03-07 — DRIFT

7. package=contract file=`/home/user/fleet/contract/src/core/inferers.ts:393` rule=`.claude/rules/names.md` § Fixed derivation/construction forms and `.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `isValidISOInstant` takes the reserved `is*` form, which this project fixes to a total `Guard<T>`, for a plain `boolean` predicate — while the package's own predicate prefix is `matches*` (`matchesPattern`, `matchesMember`, `matchesRecordBrand`, `matchesJSONDepth`) — and it sits in the value-inferer file although it infers nothing.
   repair: Move it to `helpers.ts` and rename it `matchesISOInstant`; update `classifyFormat` and the guide row.

## s03-08 — DRIFT-RESHAPE

8. package=contract file=`/home/user/fleet/contract/src/core/inferers.ts:99`, `:214`, `:264`, `:491` rule=`.claude/rules/architecture.md` § Kind purity ("Each centralized file contains only its named kind") verdict=CONFIRMED
   wrong: `canonicalizeValue`, `encodeLeaf`, `canonicalStringify`, and `classifyFormat` are pure encoding and classification leaves, not value inferers; `encodeLeaf` is `JSON.stringify` behind a bigint check, the same family as `preview` in `helpers.ts`.
   repair: Move all four to `helpers.ts`. The barrel star-exports both files, so the published surface is unchanged. (`canonicalizeValue` is also the spine named in finding 1; land finding 1 first, then this move applies to what remains.)

### Verification

**Judge (DRIFT-RESHAPE/high):** The kind mismatch is real for all four symbols and neither lane disputes it: none produces a schema, and classifyFormat's own TSDoc calls itself the leaf behind stringToFormat's boundary. Applying the repair as written creates a fresh violation, because classifyFormat calls isValidISOInstant, which

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: move `encodeLeaf`, `canonicalStringify`, and `canonicalizeValue` as stated, and land s03-07's move of `isValidISOInstant` into helpers.ts in the same unit as `classifyFormat`, so helpers.ts never imports inferers.ts.

## s03-09 — DRIFT

9. package=contract file=`/home/user/fleet/contract/src/core/shapers.ts:755`, `:790` rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `deriveLengthBounds` and `deriveRangeBounds` build no shape — they reduce a pair of unknown keyword values to a numeric `{ min, max }` pair — so they are pure helpers sitting in the shape-value file.
   repair: Move both to `helpers.ts`; `derive*` is already a sanctioned helper prefix there.

## s03-10 — DRIFT

10. package=contract file=`/home/user/fleet/contract/src/core/compilers.ts:75` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
    wrong: `validateShapeDepth` names one of the properties it gates; its own TSDoc calls it "the SOLE eager well-formedness pass" covering structure, bound domains, vocabularies, cycles, depth, and emitted-node expansion.
    repair: Rename to `validateShape` and update the guide rows and the `refuseExpansion` remark. The reuse of the name as a diagnostic prefix from other doors is separately documented (`helpers.ts:2133-2140`, `guides/contract.md:421`) and is not part of this finding; the rename carries those message prefixes with it.

## s03-11 — DRIFT-RESHAPE

11. package=contract file=`/home/user/fleet/contract/src/core/compilers.ts:367` rule=`.claude/rules/architecture.md` § Kind purity and `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `createContract` is the lone `create*` door in a file whose every other export is `compile*`, all taking one `ContractShape` and returning a compiled artifact from the same `ContractCompiler` getter — so one act carries two verbs in one file, and the `create*` form is reserved for an entity/value factory, which belongs in `factories.ts`.
    repair: Decide what it is, then apply the matching repair from § Kind purity. It compiles a shape into artifacts like its siblings, so rename it `compileContract` in place and update the guide, examples, and consumers; renaming a flagship name is the cost § Kind purity states is the correct one to pay. Moving it to a new `factories.ts` is the alternative and drags the compiler-class import into that file.

### Verification

**Judge (DRIFT-RESHAPE/high):** The finding reads the placement rule backwards and picks the damaging half of its own alternative; the subjective lane then reads it backwards in the other direction. architecture.md says a name does not place a function — placement follows what the function IS. `createContract` returns `ContractInt

**Lane DRIFT-RESHAPE/medium:** amend: keep the name `createContract` and move it to a new `src/core/factories.ts`, matching `createEmitter` / `createPool` / `createQueue` across the fleet; the compiler-class import moving into `factories.ts` is permitted — the class-free floor in architecture.md:84-89 binds only `helpers.ts` and `validators.ts`

**Lane EXCEPTION/high:** drop

## s03-12 — DRIFT

12. package=contract file=`/home/user/fleet/contract/src/core/errors.ts:37-50` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `ContractError`'s static block reimplements `pinMembers` (`helpers.ts:666`) inline and diverges from it: it uses `INTRINSICS.define` rather than `INTRINSICS.declare`, and it has no accessor branch, so on an accessor member it would do exactly what `pinMembers` documents as the failure that helper exists to prevent. Nothing in `pinMembers` records that `errors.ts` is exempt, so the next reader finds an unexplained second copy.
    repair: State the exception in `pinMembers`'s `@remarks` — `errors.ts` cannot import `helpers.ts` without inverting the dependency, the same reason `isContractError` carries its own `try`/`catch` — and align the inline block with the accessor branch and the answering `declare`.

## s03-13 — DRIFT

13. package=contract file=`/home/user/fleet/contract/src/core/types.ts:970-976` rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels") verdict=CONFIRMED
    wrong: `ShapeValidatorInterface.expansion` is documented to return `0` to mean "no successful pass has run", which is a sentinel standing in for absence.
    repair: Type it `number | undefined` and return `undefined` before the first successful pass and after a failed one; update `refuseExpansion`'s call sites in `compilers.ts:79` and `ContractCompiler.ts:391`.

## s03-14 — DRIFT

14. package=contract file=`/home/user/fleet/contract/src/core/ShapeValidator.ts:48-50` rule=`.claude/rules/names.md` § General vocabulary ("One term per concept") verdict=CONFIRMED
    wrong: The field is `#phase` and its own discriminant is also `phase`, so every read stutters as `this.#phase.phase`, and the sibling engine names the same concept `#state` with a `phase` discriminant (`ContractCompiler.ts:137`).
    repair: Rename the field to `#state`.

## s03-15 — DRIFT

15. package=contract file=`/home/user/fleet/contract/src/core/ShapeValidator.ts:1557` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: The comment names "`validateShape` and `validateShapeDepth`" as the doors reaching this prototype, but no `validateShape` export exists — `tests/src/core/compilers.test.ts:154` asserts its absence — and the only symbol of that name is `ShapeCloner`'s `#validateShape` private method.
    repair: Write `ShapeCloner`'s `#validateShape` and `validateShapeDepth`. If finding 10 lands first, this line resolves to one door and reads correctly.

## s03-16 — DRIFT-RESHAPE

16. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:1615-1622` rule=`.claude/rules/typescript.md` § Types ("Optional state is `T | undefined`") and `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: `schemaToParameters` declares `Readonly<Record<string, unknown>> | undefined`, and its own `@remarks` says the `undefined` branch is unreachable ("a compiled contract schema is always a record … the `undefined` fallback only satisfies the type's optionality"), so every consumer handles a failure the door cannot produce.
    repair: Return `Readonly<Record<string, unknown>>` and refuse a non-record through the `contain` boundary the function already carries, with the `structure` code.

### Verification

**Judge (DRIFT-RESHAPE/high):** The finding's load-bearing premise is refuted and both lanes concede it: the `undefined` branch is reachable, pinned by a test, and stated in the guide, so the proposed repair would break published behavior and narrow a documented total door into a throwing one. But the finding also cites writing.md

**Lane INVALID/high:** drop

**Lane DRIFT-RESHAPE/high:** amend: leave the signature and behavior unchanged; rewrite the `@remarks` sentence so it stops calling the `undefined` fallback decorative and states what guide line 228 and helpers.test.ts:1817 already fix — a readable non-record returns `undefined`.

## s03-17 — DRIFT

17. package=contract file=`/home/user/fleet/contract/src/core/parsers.ts:2-3` rule=`.claude/rules/typescript.md` § Syntax and imports ("Place `import type` declarations before value imports") verdict=CONFIRMED
    wrong: `import type { FieldPath } from './types.js'` sits after the value import of `./constants.js`, and it is a second type import from the module already imported on line 1.
    repair: Fold `FieldPath` into the line-1 `import type` from `./types.js` and delete line 3.

## s03-18 — DRIFT

18. package=contract file=`/home/user/fleet/contract/src/core/combinators.ts:367-375`, `:457-465` rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: `recordOf` and `objectOf` put their overload signatures above the TSDoc block, so the documentation attaches to the implementation signature — which a consumer never resolves to — and every callable overload is undocumented; every other overloaded export in the file (`arrayOf`, `literalOf`, `setOf`, `mapOf`, `unionOf`, `intersectionOf`, `whereOf`, `transformOf`) documents its first overload.
    repair: Move each TSDoc block above the first overload signature and keep the overload group contiguous with its implementation.

## s03-19 — DRIFT

19. package=contract file=`/home/user/fleet/contract/src/core/combinators.ts:388-389`, `:259` rule=`.claude/rules/writing.md` § Sentence and paragraph order; `AGENTS.md` § Writing verdict=CONFIRMED
    wrong: The `recordOf` TSDoc reads "returns `false` rather than throwing. The / The exactness check inspects every own string key" — a duplicated word across the line break in published documentation; and the `enumOf` block at line 259 has a comment line with no leading `*`, which breaks the block's rendering.
    repair: Delete the stray `The` at the end of line 388 and add the missing `*` prefix on line 259.

## s03-20 — DRIFT-RESHAPE

20. package=contract file=`/home/user/fleet/contract/src/core/validators.ts:47` through `:1131`; `/home/user/fleet/contract/src/core/combinators.ts:74`, `:101`, `:243`, `:299`, `:335`, `:684`, `:707`, `:737`, `:756`, `:781`, `:807`, `:853`, `:884`, `:920`, `:1067`, `:1083`; `/home/user/fleet/contract/src/core/cloners.ts:180` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param`, `@returns`") verdict=CONFIRMED
    wrong: These public exports carry a description and an `@example` but no `@param` or `@returns`, while their neighbours in the same files do carry both (`isNonNegativeNumber`, `isInstance`, `literalOf`, `matchOf`, `stringOf`); `ownShape` additionally has no `@throws` despite four throw statements in its body.
    repair: Add `@param` and `@returns` to each named export, and `@throws {ContractError}` to `ownShape`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The omission is real, at scale, and settled against the terse form by the rule text and by fleet siblings. The repair is wrong twice. It lists cloners.ts:180 among the exports lacking `@param` and `@returns`, and `ownShape` carries both — its only gap is `@throws`, which both lanes verified. And it

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: add `@param` and `@returns` across every documented export in validators.ts and combinators.ts, not only the listed lines, and add `@throws {ContractError}` to `ownShape` — which needs no `@param` or `@returns` work.

## s03-21 — DRIFT

21. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts`, `validators.ts`, `parsers.ts`, `combinators.ts`, `shapers.ts`, `cloners.ts`, `inferers.ts`, `compilers.ts`, `types.ts`, `constants.ts`, `errors.ts:25`, `ContractCompiler.ts`, `ShapeValidator.ts`, `ShapeCloner.ts`, `JSONCloner.ts`, `SchemaCloner.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Public TSDoc first sentences are imperative throughout — `Build`, `Determine`, `Parse`, `Read`, `Clone`, `Encode`, `Snapshot`, `Collect`, `Compile`, `Derive`, `Convert`, `Order`, `Render`, `Select`, `Project`, `Refuse`, `Negate`, `Combine`, `Extend`, `Defer`, `Invoke`, `Draw`, `Resolve`, `Sanitize`, `Unify`, `Classify`, `Gate`, `Audit`, `Pin`, `Append`, `Take`, `Create` — rather than third-person. `isContractError` (`errors.ts:54`, "Checks whether") and `ShapeValidatorInterface` (`types.ts:963`, "Validates") are the conforming exceptions, so the two forms also disagree with each other across the same package.
    repair: Convert the imperative first sentences to the third-person `-s` form fleet-wide in one pass, per the convention lane's ruling; nothing else in these files is in scope for that edit.

## s03-22 — DRIFT-RESHAPE

22. package=contract file=`/home/user/fleet/contract/src/core/constants.ts:98-99`, `:100-101`, `:102-103`, `:116-117`, `:120-121` rule=`.claude/rules/names.md` § General vocabulary ("One term per concept … Describe what a thing is") verdict=CONFIRMED
    wrong: `INTRINSICS` is a public export whose keys a consumer must be able to predict, and it gives one concept two arbitrary synonyms wherever `Object` and `Reflect` both supply the operation: `describe` / `reveal` for the descriptor read, `define` / `declare` for property placement, `prototype` / `parent` for the prototype read. Nothing in the key name says which namespace it came from, so the only way to pick one is to read the table.
    repair: Group by the axis that varies — `INTRINSICS.object.describe` / `INTRINSICS.reflect.describe`, and likewise for `define` and `prototype` — leaving each leaf a single predictable word, and update the call sites.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: keep one flat namespace and rename each leaf for the behavior that distinguishes it rather than for its source namespace — the answering-versus-throwing placement pair and the coercing-versus-throwing prototype read — so the name predicts the semantics the package actually chose between; do not group by `object` / `reflect`

**Lane DRIFT-RESHAPE/medium:** amend: keep the table flat and name each key for the distinguishing behavior the way `define` and `declare` already do — so `describe`/`reveal` and `prototype`/`parent` read as two operations rather than two words for one — and state that difference in each key's TSDoc. Do not introduce `INTRINSICS.object.*` / `INTRINSICS.reflect.*` namespaces.

## s03-23 — DRIFT

23. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:1852`, `:1921`, `:1990` rule=`.claude/rules/names.md` § Fixed derivation/construction forms and `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `createStringFaults`, `createNumberFaults`, and `createArrayFaults` take the `create*` form, which names.md fixes to "a factory constructing an entity/value", for pure fault-list projections, while the same act elsewhere in the package uses `build*` (`buildSampleMemo` at `helpers.ts:394`, `buildObjectShape` and `buildShapeFromNode` in `shapers.ts`) — and their own TSDoc first sentences say "Build".
    repair: Rename to `buildStringFaults`, `buildNumberFaults`, `buildArrayFaults`; update `ContractCompiler.ts` imports and the guide rows.

## s03-24 — DRIFT-RESHAPE

24. package=contract file=`/home/user/fleet/contract/src/core/ContractCompiler.ts:146-175`, `:193-211`, `:357-369` rule=`AGENTS.md` § Design laws ("the design earns each concept and wrapper") verdict=CONFIRMED
    wrong: A parallel `#empty*` field exists for every mutable collection field, doubling the class's field surface and its constructor, purely so `#release` can assign a preconstructed peer rather than write an array literal.
    repair: Assign `[]` and `new ContractCompiler.#weakMap()` directly in `#release` and delete the `#empty*` family, or state in the `#release` comment what an array literal reaches that a preconstructed peer does not. **Referral to the objective lane:** whether an array literal is caller-redirectable at all is the premise this design rests on, and I did not run it.

### Verification

**Judge (DRIFT-RESHAPE/high):** The superfluity is real and my own run confirms it: an array literal reads no caller-reachable binding, so replacing the `Array` global and hijacking `Array.prototype[Symbol.iterator]` both leave `[]` producing a real empty array with the intrinsic prototype — the same prototype the preconstructed p

**Lane DRIFT-RESHAPE/medium:** amend: take the first branch only — delete the `#empty*` family and assign `[]` and `new ContractCompiler.#weakMap()` directly in `#release`. The second branch is unavailable: the `#release` comment at :354-356 already states a rationale, and the probe falsifies the premise that rationale rests on. Anchor the finding to AGENTS.md § Design laws "No superfluous wrappers" and architecture.md § System constraints "Prefer the smallest complete implementation that preserves architecture", not to the sentence quoted

**Lane DRIFT/high:** stands

