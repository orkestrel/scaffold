## Coverage

**contract** (`/home/user/fleet/contract`) — every file under `src/core/` opened; nothing in `src/` skipped.

- Read in full: `index.ts`, `types.ts`, `constants.ts`, `errors.ts`, `helpers.ts`, `validators.ts`, `parsers.ts`, `combinators.ts`, `shapers.ts`, `cloners.ts`, `compilers.ts`.
- Read in part, plus a full structural read (every exported symbol, every class member, every `static` block) by grep: `inferers.ts` (prose read through line 620 of 1450), `ContractCompiler.ts` (through line 400 of 2020), `ShapeValidator.ts` (through line 60 of 1560).
- Structural read only (member list, static blocks, imports; bodies not read line by line): `ShapeCloner.ts`, `JSONCloner.ts`, `SchemaCloner.ts`. Findings inside those three bodies are therefore not claimed either way.
- Also read as evidence about `src/`: `guides/contract.md`, and `tests/src/core/compilers.test.ts:154`.
- Rules read: `AGENTS.md`, `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `documentation.md`, `writing.md`.

## Findings

1. package=contract file=`/home/user/fleet/contract/src/core/shapers.ts:1159`, `:984`, `:855`; `/home/user/fleet/contract/src/core/inferers.ts:99`, `:701`, `:780`, `:897`, `:1089`, `:1216`; `/home/user/fleet/contract/src/core/helpers.ts:1452` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test, item 3) and § Barrel exports verdict=CONFIRMED
   wrong: Each of these is a recursive traversal spine written as a module function, so its `visited` / `memo` / `ancestors` / `depth` state became public parameters, and each one's own TSDoc then has to tell the caller that the values its signature accepts are "not supported usage".
   repair: Give each traversal an owning class with `#` private recursion and `#` traversal state, exactly as `ShapeCloner`, `ShapeValidator`, and `ContractCompiler` already do; keep `schemaToShape`, `valueToSchema`, `samplesToSchema`, `canonicalStringify`, and `isJSONValue` as the doors, and drop the state parameters from the published signatures. The guide's justification for exporting them (`guides/contract.md:423`, citing the export law) answers why a module function is exported, not why the spine is a module function.

2. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:787-802` rule=`AGENTS.md` § Design laws ("Centralize by kind") and `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: `readValue` re-declares the `ContractCode` vocabulary as an inline chain of equality tests, and that copy has already drifted from the union in `types.ts:49-75` and from the second copy in `errors.ts:89-103` — it omits `'expansion'`.
   repair: Export `CONTRACT_CODES` as a frozen array in `constants.ts` beside `JSON_SCHEMA_TYPES`, and have `readValue` and `isContractError` both ask it through `collectMembers` / `matchesMember`. **Referral to the objective lane:** whether the omission changes the `code` a published refusal carries (`readValue(cb, r, { code: 'expansion' })` resolving to `'structure'`) is a behaviour question I did not run.

3. package=contract file=`/home/user/fleet/contract/src/core/combinators.ts:1023-1027` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties … readonly") and `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `stringOf` declares its options as an inline object type with mutable `min` / `max` / `pattern` members, duplicating `StringShapeOptions` (`types.ts:797-802`), which already declares the same members as `readonly`.
   repair: Declare the type in `types.ts` (`StringGuardOptions`, `readonly` members) and reference it from the signature, or accept `Omit<StringShapeOptions, 'description'>` directly.

4. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:1086-1091`, `:452`; `/home/user/fleet/contract/src/core/shapers.ts:758`, `:793` rule=`.claude/rules/typescript.md` § Types and `.claude/rules/architecture.md` § Centralized-file pattern verdict=CONFIRMED
   wrong: `readGuardShape`, `collectEntries`, `deriveLengthBounds`, and `deriveRangeBounds` declare their public return types inline in the signature, while the package's own precedent puts exactly this kind of return type in `types.ts` (`ArrayRead` for `readArrayEntries`, `RandomFunction` / `AuditorFunction` / `SeederFunction` for the compiled families).
   repair: Add named `readonly` interfaces to `types.ts` — a `GuardShapeRead`, a `ShapeBounds`, and an `EntryCollector` function type — and reference them from the signatures.

5. package=contract file=`/home/user/fleet/contract/src/core/types.ts:319-349` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The TSDoc block describing the shape-cloner ("Stateful owner of one contract-shape snapshot operation", lines 319-329) is immediately followed by the `ShapeProperty` block, so `ShapeProperty` takes the nearer comment and `ShapeClonerInterface` at line 349 is left with no TSDoc at all — the sibling `JSONClonerInterface` and `SchemaClonerInterface` both have one.
   repair: Move the orphaned block back to sit directly above `export interface ShapeClonerInterface`.

6. package=contract file=`/home/user/fleet/contract/src/core/types.ts:431-437` rule=`.claude/rules/names.md` § Entity-scoped names and `.claude/rules/patterns.md` § Options verdict=CONFIRMED
   wrong: `ValueToSchemaOptions` uses the compound keys `maxDepth` and `maxProperties` where every other option surface in the package uses single words (`min`, `max`, `integer`, `pattern`, `description`, `closed`, `format`, `enum`).
   repair: Rename to `depth` and `breadth` — the package's own words for these budgets (`types.ts:449`, `INFER_BREADTH_LIMIT`) — and update `sanitizeDepth` / `sanitizeBudget` call sites, `inferers.ts`, `constants.ts` TSDoc, and the guide rows.

7. package=contract file=`/home/user/fleet/contract/src/core/inferers.ts:393` rule=`.claude/rules/names.md` § Fixed derivation/construction forms and `.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `isValidISOInstant` takes the reserved `is*` form, which this project fixes to a total `Guard<T>`, for a plain `boolean` predicate — while the package's own predicate prefix is `matches*` (`matchesPattern`, `matchesMember`, `matchesRecordBrand`, `matchesJSONDepth`) — and it sits in the value-inferer file although it infers nothing.
   repair: Move it to `helpers.ts` and rename it `matchesISOInstant`; update `classifyFormat` and the guide row.

8. package=contract file=`/home/user/fleet/contract/src/core/inferers.ts:99`, `:214`, `:264`, `:491` rule=`.claude/rules/architecture.md` § Kind purity ("Each centralized file contains only its named kind") verdict=CONFIRMED
   wrong: `canonicalizeValue`, `encodeLeaf`, `canonicalStringify`, and `classifyFormat` are pure encoding and classification leaves, not value inferers; `encodeLeaf` is `JSON.stringify` behind a bigint check, the same family as `preview` in `helpers.ts`.
   repair: Move all four to `helpers.ts`. The barrel star-exports both files, so the published surface is unchanged. (`canonicalizeValue` is also the spine named in finding 1; land finding 1 first, then this move applies to what remains.)

9. package=contract file=`/home/user/fleet/contract/src/core/shapers.ts:755`, `:790` rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `deriveLengthBounds` and `deriveRangeBounds` build no shape — they reduce a pair of unknown keyword values to a numeric `{ min, max }` pair — so they are pure helpers sitting in the shape-value file.
   repair: Move both to `helpers.ts`; `derive*` is already a sanctioned helper prefix there.

10. package=contract file=`/home/user/fleet/contract/src/core/compilers.ts:75` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
    wrong: `validateShapeDepth` names one of the properties it gates; its own TSDoc calls it "the SOLE eager well-formedness pass" covering structure, bound domains, vocabularies, cycles, depth, and emitted-node expansion.
    repair: Rename to `validateShape` and update the guide rows and the `refuseExpansion` remark. The reuse of the name as a diagnostic prefix from other doors is separately documented (`helpers.ts:2133-2140`, `guides/contract.md:421`) and is not part of this finding; the rename carries those message prefixes with it.

11. package=contract file=`/home/user/fleet/contract/src/core/compilers.ts:367` rule=`.claude/rules/architecture.md` § Kind purity and `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `createContract` is the lone `create*` door in a file whose every other export is `compile*`, all taking one `ContractShape` and returning a compiled artifact from the same `ContractCompiler` getter — so one act carries two verbs in one file, and the `create*` form is reserved for an entity/value factory, which belongs in `factories.ts`.
    repair: Decide what it is, then apply the matching repair from § Kind purity. It compiles a shape into artifacts like its siblings, so rename it `compileContract` in place and update the guide, examples, and consumers; renaming a flagship name is the cost § Kind purity states is the correct one to pay. Moving it to a new `factories.ts` is the alternative and drags the compiler-class import into that file.

12. package=contract file=`/home/user/fleet/contract/src/core/errors.ts:37-50` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `ContractError`'s static block reimplements `pinMembers` (`helpers.ts:666`) inline and diverges from it: it uses `INTRINSICS.define` rather than `INTRINSICS.declare`, and it has no accessor branch, so on an accessor member it would do exactly what `pinMembers` documents as the failure that helper exists to prevent. Nothing in `pinMembers` records that `errors.ts` is exempt, so the next reader finds an unexplained second copy.
    repair: State the exception in `pinMembers`'s `@remarks` — `errors.ts` cannot import `helpers.ts` without inverting the dependency, the same reason `isContractError` carries its own `try`/`catch` — and align the inline block with the accessor branch and the answering `declare`.

13. package=contract file=`/home/user/fleet/contract/src/core/types.ts:970-976` rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels") verdict=CONFIRMED
    wrong: `ShapeValidatorInterface.expansion` is documented to return `0` to mean "no successful pass has run", which is a sentinel standing in for absence.
    repair: Type it `number | undefined` and return `undefined` before the first successful pass and after a failed one; update `refuseExpansion`'s call sites in `compilers.ts:79` and `ContractCompiler.ts:391`.

14. package=contract file=`/home/user/fleet/contract/src/core/ShapeValidator.ts:48-50` rule=`.claude/rules/names.md` § General vocabulary ("One term per concept") verdict=CONFIRMED
    wrong: The field is `#phase` and its own discriminant is also `phase`, so every read stutters as `this.#phase.phase`, and the sibling engine names the same concept `#state` with a `phase` discriminant (`ContractCompiler.ts:137`).
    repair: Rename the field to `#state`.

15. package=contract file=`/home/user/fleet/contract/src/core/ShapeValidator.ts:1557` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: The comment names "`validateShape` and `validateShapeDepth`" as the doors reaching this prototype, but no `validateShape` export exists — `tests/src/core/compilers.test.ts:154` asserts its absence — and the only symbol of that name is `ShapeCloner`'s `#validateShape` private method.
    repair: Write `ShapeCloner`'s `#validateShape` and `validateShapeDepth`. If finding 10 lands first, this line resolves to one door and reads correctly.

16. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:1615-1622` rule=`.claude/rules/typescript.md` § Types ("Optional state is `T | undefined`") and `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: `schemaToParameters` declares `Readonly<Record<string, unknown>> | undefined`, and its own `@remarks` says the `undefined` branch is unreachable ("a compiled contract schema is always a record … the `undefined` fallback only satisfies the type's optionality"), so every consumer handles a failure the door cannot produce.
    repair: Return `Readonly<Record<string, unknown>>` and refuse a non-record through the `contain` boundary the function already carries, with the `structure` code.

17. package=contract file=`/home/user/fleet/contract/src/core/parsers.ts:2-3` rule=`.claude/rules/typescript.md` § Syntax and imports ("Place `import type` declarations before value imports") verdict=CONFIRMED
    wrong: `import type { FieldPath } from './types.js'` sits after the value import of `./constants.js`, and it is a second type import from the module already imported on line 1.
    repair: Fold `FieldPath` into the line-1 `import type` from `./types.js` and delete line 3.

18. package=contract file=`/home/user/fleet/contract/src/core/combinators.ts:367-375`, `:457-465` rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: `recordOf` and `objectOf` put their overload signatures above the TSDoc block, so the documentation attaches to the implementation signature — which a consumer never resolves to — and every callable overload is undocumented; every other overloaded export in the file (`arrayOf`, `literalOf`, `setOf`, `mapOf`, `unionOf`, `intersectionOf`, `whereOf`, `transformOf`) documents its first overload.
    repair: Move each TSDoc block above the first overload signature and keep the overload group contiguous with its implementation.

19. package=contract file=`/home/user/fleet/contract/src/core/combinators.ts:388-389`, `:259` rule=`.claude/rules/writing.md` § Sentence and paragraph order; `AGENTS.md` § Writing verdict=CONFIRMED
    wrong: The `recordOf` TSDoc reads "returns `false` rather than throwing. The / The exactness check inspects every own string key" — a duplicated word across the line break in published documentation; and the `enumOf` block at line 259 has a comment line with no leading `*`, which breaks the block's rendering.
    repair: Delete the stray `The` at the end of line 388 and add the missing `*` prefix on line 259.

20. package=contract file=`/home/user/fleet/contract/src/core/validators.ts:47` through `:1131`; `/home/user/fleet/contract/src/core/combinators.ts:74`, `:101`, `:243`, `:299`, `:335`, `:684`, `:707`, `:737`, `:756`, `:781`, `:807`, `:853`, `:884`, `:920`, `:1067`, `:1083`; `/home/user/fleet/contract/src/core/cloners.ts:180` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param`, `@returns`") verdict=CONFIRMED
    wrong: These public exports carry a description and an `@example` but no `@param` or `@returns`, while their neighbours in the same files do carry both (`isNonNegativeNumber`, `isInstance`, `literalOf`, `matchOf`, `stringOf`); `ownShape` additionally has no `@throws` despite four throw statements in its body.
    repair: Add `@param` and `@returns` to each named export, and `@throws {ContractError}` to `ownShape`.

21. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts`, `validators.ts`, `parsers.ts`, `combinators.ts`, `shapers.ts`, `cloners.ts`, `inferers.ts`, `compilers.ts`, `types.ts`, `constants.ts`, `errors.ts:25`, `ContractCompiler.ts`, `ShapeValidator.ts`, `ShapeCloner.ts`, `JSONCloner.ts`, `SchemaCloner.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Public TSDoc first sentences are imperative throughout — `Build`, `Determine`, `Parse`, `Read`, `Clone`, `Encode`, `Snapshot`, `Collect`, `Compile`, `Derive`, `Convert`, `Order`, `Render`, `Select`, `Project`, `Refuse`, `Negate`, `Combine`, `Extend`, `Defer`, `Invoke`, `Draw`, `Resolve`, `Sanitize`, `Unify`, `Classify`, `Gate`, `Audit`, `Pin`, `Append`, `Take`, `Create` — rather than third-person. `isContractError` (`errors.ts:54`, "Checks whether") and `ShapeValidatorInterface` (`types.ts:963`, "Validates") are the conforming exceptions, so the two forms also disagree with each other across the same package.
    repair: Convert the imperative first sentences to the third-person `-s` form fleet-wide in one pass, per the convention lane's ruling; nothing else in these files is in scope for that edit.

22. package=contract file=`/home/user/fleet/contract/src/core/constants.ts:98-99`, `:100-101`, `:102-103`, `:116-117`, `:120-121` rule=`.claude/rules/names.md` § General vocabulary ("One term per concept … Describe what a thing is") verdict=CONFIRMED
    wrong: `INTRINSICS` is a public export whose keys a consumer must be able to predict, and it gives one concept two arbitrary synonyms wherever `Object` and `Reflect` both supply the operation: `describe` / `reveal` for the descriptor read, `define` / `declare` for property placement, `prototype` / `parent` for the prototype read. Nothing in the key name says which namespace it came from, so the only way to pick one is to read the table.
    repair: Group by the axis that varies — `INTRINSICS.object.describe` / `INTRINSICS.reflect.describe`, and likewise for `define` and `prototype` — leaving each leaf a single predictable word, and update the call sites.

23. package=contract file=`/home/user/fleet/contract/src/core/helpers.ts:1852`, `:1921`, `:1990` rule=`.claude/rules/names.md` § Fixed derivation/construction forms and `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `createStringFaults`, `createNumberFaults`, and `createArrayFaults` take the `create*` form, which names.md fixes to "a factory constructing an entity/value", for pure fault-list projections, while the same act elsewhere in the package uses `build*` (`buildSampleMemo` at `helpers.ts:394`, `buildObjectShape` and `buildShapeFromNode` in `shapers.ts`) — and their own TSDoc first sentences say "Build".
    repair: Rename to `buildStringFaults`, `buildNumberFaults`, `buildArrayFaults`; update `ContractCompiler.ts` imports and the guide rows.

24. package=contract file=`/home/user/fleet/contract/src/core/ContractCompiler.ts:146-175`, `:193-211`, `:357-369` rule=`AGENTS.md` § Design laws ("the design earns each concept and wrapper") verdict=CONFIRMED
    wrong: A parallel `#empty*` field exists for every mutable collection field, doubling the class's field surface and its constructor, purely so `#release` can assign a preconstructed peer rather than write an array literal.
    repair: Assign `[]` and `new ContractCompiler.#weakMap()` directly in `#release` and delete the `#empty*` family, or state in the `#release` comment what an array literal reaches that a preconstructed peer does not. **Referral to the objective lane:** whether an array literal is caller-redirectable at all is the premise this design rests on, and I did not run it.

25. package=contract file=`/home/user/fleet/contract/src/core/ShapeValidator.ts:301`, `:388`, `:362`, `:692`, `:1386`, `:1545` rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One class carries `#observe`, `#scan`, `#recognize`, and `#inspect` for inspection acts, and `#witness` beside `#refuse` for its two refusal exits, so a reader cannot tell from any of those names what the method does or which of a pair to expect.
    repair: Use one verb per concept — one refusal verb (`#refuse`), and name each inspector for its subject (`#observeNode`, `#scanFields`) rather than by a different verb.

26. package=contract file=`/home/user/fleet/contract/src/core/cloners.ts:180` rule=`.claude/rules/architecture.md` § Wrapper test verdict=EXEMPT
    wrong: `ownShape` returns exactly what `cloneShape` returns on success and differs only in which error it selects on failure, so a consumer reading the barrel sees two doors producing one result.
    repair: None required. `guides/contract.md:349` states the distinction precisely — the frozen-source failure-precedence rule is the contract the second door carries — and `cloners.ts:160-169` states why a frozen root gets no identity exception. Recorded so a later pass does not re-open it.

## Clean

None. Every file under `src/core/` carries at least one finding above, or is named in the coverage limits.

## Deviation

None.