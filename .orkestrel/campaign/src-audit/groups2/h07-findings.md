# Findings for group h07 (verification round 2)

Packages: reason. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it. Note: scaffold lives at /home/user/scaffold, every other package at /home/user/fleet/<name>.

## s07-01

1. package=reason file=`src/core/builders/managers/GroupManager.ts:26`, `RuleManager.ts:25`, `EquationManager.ts:25`, `FactManager.ts:25`, `InferenceManager.ts:25` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice"; "implement shared … in one engine over those primitives") verdict=CONFIRMED
   wrong: Five manager classes are the same ~90-line implementation with only the element type and the collection noun changed — identical `#items` / `#emitter` / `#destroyed` fields, identical `emitter` getter, identical `set collection`, identical `append`/`prepend`/`replace`/`remove` bodies delegating to `appendById`/`prependById`/`replaceById`/`removeById`, identical `destroy`, identical `#ensureAlive`.
   repair: Add one generic `CollectionManager<T extends { readonly id: string }, TMap>` under `src/core/builders/managers/`, holding the `#` state, the `collection` setter, the four write verbs, `destroy`, and `#ensureAlive` plus a generic `item(id)`/`items()` pair. Have each of the five extend it and declare only its domain accessor pair (`rule`/`rules`, `fact`/`facts`, …) that its interface names. `FactorManager` stays separate — it holds no collection state.

## s07-02

2. package=reason file=`src/core/reasoners/LogicalReasoner.ts:304`, `:370`, `:400` rule=`AGENTS.md` § Design laws ("If one word is insufficient, change the shape: group options, extract a sub-entity or manager"); `.claude/rules/architecture.md` § Functions and orchestration verdict=CONFIRMED
   wrong: `#proveRule`, `#establish`, and `#proveExpression` each take nine or ten positional parameters and thread `(rules, depth, visited, derived, subject, trace, ruleResults, maxDepth)` through roughly ten call sites. `#establish` takes both `currentSubject` and `subject`, two adjacent same-typed parameters the compiler cannot tell apart if transposed. The backward engine's whole state is passed by hand instead of being owned.
   repair: Extract the backward pass into its own class in `src/core/reasoners/` that holds `rules`, `derived`, `trace`, `ruleResults`, `subject`, and `maxDepth` as `#` fields, exposing `prove(rule)`, `establish(expression, depth, visited)`, and `run()`. `LogicalReasoner.#backward` then constructs it and reads its result. No signature past three parameters survives.

## s07-03

3. package=reason file=`src/core/types.ts:527`, `:559`, `:544`, `:627` rule=`AGENTS.md` § Design laws ("Derive state. Compute facts from existing fields. Do not store a second flag or label that can drift.") verdict=CONFIRMED
   wrong: Four published result members store a fact already carried by a sibling field. `QuantitativeResult.count` (`:527`) is `groups.filter(g => g.applied).length`. `LogicalResult.count` (`:559`) is computed exactly that way at `LogicalReasoner.ts:149`. `RuleResult.conclusion` (`:544`) is documented at `types.ts:539` as "always equal" to `applied`. `ReasonValidationResult.valid` (`:627`) is documented at `types.ts:615` as "`true` exactly when `errors` is empty". `SymbolicResult` and `InferentialResult` carry no `count`, which shows the tally is not load-bearing on the union.
   repair: Delete `count` from `QuantitativeResult` and `LogicalResult`, delete `conclusion` from `RuleResult`, delete `valid` from `ReasonValidationResult`. Update the two reasoners, `Reason.validate`, the guide's Surface rows, and the guide's method tables in the same change.

## s07-04

4. package=reason file=`src/core/validators.ts:255` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … rename-only helpers/getters … and wrappers around semantically identical platform or declared-dependency primitives"; "Do not re-export a dependency's symbol from this package") verdict=CONFIRMED
   wrong: `export const isSubject: Guard<Readonly<Record<string, unknown>>> = isRecord` is `@orkestrel/contract`'s `isRecord` published under a second name and nothing else. `guides/reason.md:217` states the alias openly ("`isRecord` typed to the subject alias"), so it is an acknowledged rename rather than a documented exception. The annotation also spells the alias out instead of using the package's own `Subject` type, which `validators.ts` does not import.
   repair: Delete `isSubject`, and have every consumer import `isRecord` from `@orkestrel/contract`. Remove its Surface row and its mention at `guides/reason.md:993`.

## s07-05

5. package=reason file=`src/core/helpers.ts:2696` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Coercers → `*/parsers.ts`) and § Kind purity ("Wrong file, right name → move it") verdict=CONFIRMED
   wrong: `parseDefinition(json: string): Definition | undefined` is a coercer by both name and behaviour — `parseJSONAs` composed with `isDefinition`, returning `T | undefined` — and it sits in `helpers.ts`, the pure-helper file. `src/core/` has no `parsers.ts`.
   repair: Create `src/core/parsers.ts`, move `parseDefinition` there unchanged, add `export * from './parsers.js'` to `src/core/index.ts`. The barrel star-exports both files, so the published surface is unchanged.

## s07-06

6. package=reason file=`src/core/helpers.ts:81`, `:100`, `:119`, `:143`, `:174`, `:197`, `:219`, `:236`, `:261`, `:292`, `:325`, `:354`, `:378`, `:395`, `:413`, `:436`, `:462`, `:485`, `:509`, `:534`, `:563`, `:594`, `:625`, `:656`, `:688` rule=`.claude/rules/names.md` § Standalone helpers ("Module helpers … default to `{verb}{Noun}`"; "A one-word helper is valid only when its meaning and arguments are unmistakable") and § Value-level identifiers (Helper `{verb}{Noun}`, Factory `create{Entity}`) verdict=CONFIRMED
   wrong: A family of twenty-five exported value constructors is named with bare domain nouns — `check`, `atom`, `compound`, `rule`, `transform`, `bounds`, `variable`, `constant`, `operation`, `equation`, `fact`, `inference`, `staticSource`, `fieldSource`, `lookupSource`, `rangeSource`, `staticFactor`, `fieldFactor`, `lookupFactor`, `rangeFactor`, `factorGroup`, `quantitativeDefinition`, `logicalDefinition`, `symbolicDefinition`, `inferentialDefinition`. Several read as the wrong verb at the call site (`check(...)` builds a `Check`, it does not check), and the collision cost is already paid inside the package: `appendRule` at `:1985` had to name its `Rule` parameter `source` because `rule` is taken, and `buildErrorResult` at `:1527` — the same class of function — is correctly verb-named, in the same file.
   repair: These are value factories. Move all twenty-five to `src/core/factories.ts` and rename `create{Entity}` (`createCheck`, `createAtom`, `createRule`, `createStaticFactor`, `createQuantitativeDefinition`, …), which satisfies both the kind table and the `create*` name form that file already enforces. Update every internal call site, the guide's Surface rows, and every guide example. If the move is refused, the minimum is the rename to `{verb}{Noun}` in place.

## s07-07

7. package=reason file=`src/core/helpers.ts:1568`, `:1583`, `:1726`, `:1771`, `:1961`, `:2058`, `:2208`, `:2415`, `:2428`, `:2572`, `:2671`, `:2700`, `:2704` rule=`.claude/rules/documentation.md` § Parity ("A parity failure identifies drift; never suppress or weaken"); `AGENTS.md` § Instruction files ("State the finding as the rule. Never record how it was found") verdict=CONFIRMED
   wrong: Twelve section comments cite `PROPOSAL.md §6` through `§12` as the authority for the id-keyed primitives, the per-kind change helpers, the merge model, the clear helpers, the subject engine, and store-ability. No `PROPOSAL.md` exists anywhere in the checkout (`Glob` over `/home/user/fleet/reason/**/PROPOSAL*` returns nothing; the only other matches are four `tests/` files). Every design ruling in this file points at a document a reader cannot open.
   repair: Delete each `(PROPOSAL.md §N)` citation. Where the citation carried a ruling the code depends on — the additive-merge model at `:2415`, the dedup-on-insert contract at `:1583` — restate that ruling in the TSDoc of the function that owns it, then delete the pointer.

## s07-08

8. package=reason file=`src/core/types.ts:12`, `:806`, `:867`, `src/core/constants.ts:3`, `src/core/errors.ts:3`, `src/core/helpers.ts:39`, `:809`, `:1067`, `:1572`, `src/core/validators.ts:63`, `src/core/Reason.ts:33`, `:58`, `src/core/builders/DefinitionBuilder.ts:41`, `src/core/builders/SubjectBuilder.ts:16`, `:23`, `:52` rule=`.claude/rules/documentation.md` § Authority and workflow ("`AGENTS.md` and its linked rules are the sole convention source"); `.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
   wrong: Source comments and public TSDoc cite `AGENTS §2`, `§4.2.2`, `§4.2.4`, `§4.4`, `§4.5`, `§4.6.1`, `§5`, `§8`, `§9`, `§9.1`, `§9.2`, `§11`, `§12`, `§13`, `§14`, `§22`. `AGENTS.md` carries no numbered sections, so none of these resolves. `types.ts:806`, `:867`, and the manager remarks push `AGENTS §13` into the *published* TSDoc, where a consumer reading the declaration file meets a pointer into a document they do not have.
   repair: Delete every `AGENTS §N` citation from published TSDoc. In internal `//` comments, replace with the section's title (`AGENTS.md § Design laws`, `.claude/rules/patterns.md § Stateful emitters`) or delete the citation and keep the rule the comment states.

## s07-09

9. package=reason file=`src/core/helpers.ts:2704` rule=`.claude/rules/quality.md` § Probes before arguments ("Verify a belief before stating it"); `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The comment justifies naming the helper `assignField` by claiming "the core layer already exports a `FieldPath`-deep, in-place `setField` (`src/core/helpers.ts:139`, returns `void`)" and that reusing the token "would collide in the `@src/core` barrel". No `setField` exists anywhere in reason — a `Grep` for `setField` across the whole checkout returns only these two comment lines — and `src/core/helpers.ts:139` is inside the `rule` builder. The stated collision is not real, so the name it defends rests on a false premise, and a reader will not find the symbol it names.
   repair: Delete lines 2704-2708. If `assignField` is still the wanted name, state the reason that is true (it returns a fresh `Subject` rather than mutating); otherwise rename it to `setField`.

## s07-10

10. package=reason file=`src/core/helpers.ts:1985`, `:2010`, `:2034`, `:2081`, `:2106`, `:2130`, `:2232`, `:2257`, `:2281`, `:2332`, `:2360`, `:2385` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param` …"); `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
   wrong: Twelve public helpers declare their element parameter as `source` while their description and `@returns` name a parameter that does not exist. `appendRule` at `:1985` reads "Insert `rule` into a {@link LogicalDefinition}'s `rules`" and "@returns A fresh definition with `rule` inserted", but the parameter is `source`. The same mismatch runs through `prependRule`, `replaceRule`, `appendEquation`, `prependEquation`, `replaceEquation`, `appendFact`, `prependFact`, `replaceFact`, `appendInference`, `prependInference`, `replaceInference`. `appendGroup`/`appendFactor` do not have it — they name their parameters `group` and `factor` — so the API is inconsistent as well as mis-documented.
   repair: Rename the parameter to its domain noun (`rule`, `equation`, `fact`, `inference`) in all twelve, matching `appendGroup`/`appendFactor`. This becomes possible without shadowing once finding 6's rename lands; sequence it after that unit.

## s07-11

11. package=reason file=`src/core/types.ts:786`, `src/core/errors.ts:10` rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped"); `.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
   wrong: The `ReasonErrorCode` TSDoc and the `ReasonError` "Thrown for:" list read as exhaustive and are not. `DESTROYED` is described as "the orchestrator was used after `destroy()`", but every manager (`GroupManager.ts:91`, `RuleManager.ts:86`, `EquationManager.ts:86`, `FactManager.ts:86`, `InferenceManager.ts:86`, `VariableManager.ts:76`, `FactorManager.ts:85`) and both builders (`DefinitionBuilder.ts:255`, `SubjectBuilder.ts:142`) throw it too. `MISMATCH` is described only as a reasoner handed the wrong reasoning, but it is also thrown for a non-clearable `clear` key (`DefinitionBuilder.ts:157`) and for writing or removing `id` on a `SubjectBuilder` (`SubjectBuilder.ts:150`) — the id case appears in neither doc. `TARGET` is described as an optional `target` id, but `FactorManager.ts:94` throws it for a required `groupId` locator.
   repair: Rewrite both blocks against the actual throw sites: `DESTROYED` — any use of a destroyed orchestrator, builder, or manager; `MISMATCH` — a cross-reasoning definition, a non-clearable `clear` key, or a write to a `SubjectBuilder`'s immutable `id`; `TARGET` — any locator id (optional `target` or required `groupId`) naming no existing element.

## s07-12

12. package=reason file=`src/core/helpers.ts:1268`, `:1306`, `:1364` rule=`.claude/rules/typescript.md` § Errors and outcomes ("Error classes expose a machine-readable `code`"; "Every public error class ships with a guard such as `isAppError` for safe `catch` narrowing") and § Comments ("Write … a thrown error as 'Thrown when …'") verdict=CONFIRMED
   wrong: `invertLeft`, `invertRight`, and `applyOperation` are barrelled public exports that throw bare `new Error(...)`, so a consumer's `catch` cannot narrow with `isReasonError` and cannot branch on a `code` — the contract the package documents at `errors.ts:6`. None of the three carries a `@throws` tag either, while the neighbouring `appendById`/`prependById` do.
   repair: Throw `new ReasonError('MISMATCH', …, { operator })` from all three (the operator is not one the definition vocabulary admits), and add the matching `@throws {@link ReasonError}` line to each TSDoc block.

## s07-13

13. package=reason file=`src/core/builders/DefinitionBuilder.ts:62` rule=`.claude/rules/architecture.md` § Class order ("Store child managers in `#` fields and expose readonly getters typed as their interfaces") verdict=CONFIRMED
   wrong: The seven child managers are public `readonly` instance fields (`groups`, `factors`, `rules`, `equations`, `variables`, `facts`, `inferences`), not `#` fields behind getters. Every other class in the package follows the rule — `Reason.ts:41`/`:54`, `QuantitativeReasoner.ts:49`, every manager's `#emitter`/`emitter` pair.
   repair: Rename to `#groups`…`#inferences`, assign them in the constructor, and add seven `get groups(): GroupManagerInterface` style getters. `#compose`, `#seat`, and `destroy` read through the getters unchanged.

## s07-14

14. package=reason file=`src/core/builders/DefinitionBuilder.ts:232`, `:259`, `:263`, `:267`, `:271`; `src/core/reasoners/QuantitativeReasoner.ts:297`; `src/core/operators/Aggregator.ts:79`; `src/core/operators/Evaluator.ts:75`; `src/core/reasoners/InferentialReasoner.ts:431` rule=`.claude/rules/architecture.md` § Functions and orchestration, leaf test ("Pure self-contained computation (key, format, compare, convert, lookup, projection, one unification) → exported helper"); `AGENTS.md` § Design laws ("Export and test reusable logic") verdict=CONFIRMED
   wrong: Nine private methods touch no `#` state and call no sibling method, so they are pure leaves held inside classes where no test can reach them. `#strip` is a projection (the leaf test names "projection"); the four `#is*ClearKey` are key membership tests (it names "key"); `#resolveSource` is a lookup; `#empty` is a lookup; `#isBetween` is a compare; `#calculatePremiseConfidence` is a pure computation over its arguments. The package proves it knows the distinction — `SymbolicReasoner.#solve`/`#isolate` and `InferentialReasoner.#findAllBindings` are correctly kept as methods under leaf-test rule 3, and `applyOperation` (the exact analogue of `Evaluator.#compare`) is already an exported helper.
   repair: Move `#strip` to `helpers.ts` as `definitionToEnvelope(definition): DefinitionEnvelope` (the `{noun}To{Noun}` projection form). Move the four `#is*ClearKey` to `validators.ts` as exported guards over the named types from finding 15. Move `#resolveSource`, `#empty`, `#isBetween`, and `#calculatePremiseConfidence` to `helpers.ts` as `resolveSource`, `emptyAggregate`, `isWithinBounds`, and `computePremiseConfidence`. Barrel and unit-test each.

## s07-15

15. package=reason file=`src/core/helpers.ts:2596`, `:2619`, `:2642`, `:2665`; `src/core/builders/DefinitionBuilder.ts:259`, `:263`, `:267`, `:271` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`"); `AGENTS.md` § Design laws ("Types first") verdict=CONFIRMED
   wrong: The clearable-key unions are written inline in four published signatures and then written again as four private type predicates in `DefinitionBuilder`. `'description' | 'base' | 'bounds' | 'precision'` appears at `helpers.ts:2596` and `DefinitionBuilder.ts:259`; `'description' | 'depth'` appears three more times. A public parameter type of a barrelled function is a public type and has no name.
   repair: Declare `QuantitativeClearKey`, `LogicalClearKey`, `SymbolicClearKey`, and `InferentialClearKey` in `types.ts`, use them in the four `clear*Definition` signatures and in the extracted guards from finding 14, and add their Surface rows to `guides/reason.md`.

## s07-16

16. package=reason file=`src/core/reasoners/LogicalReasoner.ts:163`, `:242`; `src/core/reasoners/InferentialReasoner.ts:188`, `:292` rule=`.claude/rules/typescript.md` § Types ("Put every reusable … type alias in the nearest authoritative `*/types.ts`") verdict=CONFIRMED
   wrong: `#forward` and `#backward` in each reasoner declare the same anonymous return shape twice — `{ conclusion: boolean; rules: RuleResult[] }` in `LogicalReasoner`, `{ derived: Fact[]; proof?: ProofNode }` in `InferentialReasoner`. Each type is reusable by the rule's own test (two declarations), and neither is in `types.ts`.
   repair: Declare the two shapes in `types.ts` and reference them from all four signatures. They stay off the barrel's documented surface only if they are genuinely internal; if they are, name them for what they are (`ChainingOutcome`-style) rather than repeating the literal.

## s07-17

17. package=reason file=`src/core/types.ts:894`, `:996`, `:1044`, `:1088`, `:1136`, `:1181` rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms"); `.claude/rules/patterns.md` § Managers verdict=CONFIRMED
   wrong: Each manager names the same concept twice. The collection is `groups` in the accessor (`groups()`), `groups` in the options key (`GroupManagerOptions.groups`), and `collection` in the write-only setter. The same split repeats across `rules`, `equations`, `facts`, `inferences`, and `variables`. A write-only property accessor is also the only member of its shape in the package, and it exists solely so `DefinitionBuilder.#seat` can bypass the events — a channel the interface publishes to every consumer.
   repair: Replace `set collection(value)` with a one-word method that names the operation and keeps the domain noun out of the way — `seat(items: readonly T[]): void` on each manager interface, documented as the silent bulk re-seat. That removes the second term for the collection and makes the write-only accessor an ordinary method the guide's method table can carry.

## s07-18

18. package=reason file=`src/core/types.ts:84` and `:102`; `:44` and `:67` rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
   wrong: One literal carries two meanings inside the same expression tree. `'not'` is a `Comparison` meaning `!==` (`types.ts:84`) and a `LogicalOperator` meaning negation (`:102`), so `atom('x', 'not', 1)` and `compound('not', [...])` sit in one `Expression` and mean different operations. `'minimum'`, `'maximum'`, and `'average'` are `MathOperation` members with binary pairwise semantics (`:44`) and `Aggregation` members with n-ary reduce semantics (`:67`); `Transformer.apply` and `Aggregator.aggregate` therefore give the same word different arity.
   repair: Rename the `Comparison` member `'not'` to `'differs'` — single-word, an assertion, and unambiguous against the connective. For the arity collision, the cheapest correct fix is a cross-reference `@remarks` on both `MathOperation` and `Aggregation` naming the other union and the arity difference; renaming the `Aggregation` members to `'least'`/`'greatest'`/`'mean'` is the fuller fix if a version bump is acceptable.

## s07-19

19. package=reason file=`src/core/reasoners/LogicalReasoner.ts:250` rule=`.claude/rules/architecture.md` § Functions and orchestration; `AGENTS.md` § Design laws ("Functional core, imperative shell") verdict=CONFIRMED
   wrong: The `filter` predicate passed to `definition.rules.filter(...)` pushes onto the `errors` accumulator while deciding membership. A predicate that reports and selects at once means the error list depends on how many times the array is walked, and a reader cannot tell from the call site that `filter` writes.
   repair: Split into two passes — one loop that records the premise-less and conclusion-less rules into `errors` and a `Set` of excluded ids, then a pure `filter` reading that set. This mirrors the pre-pass `LogicalReasoner.#forward` already uses at `:173`.

## s07-20

20. package=reason file=`src/core/reasoners/InferentialReasoner.ts:431` rule=`.claude/rules/names.md` § Standalone helpers ("A helper prefix has one project-wide meaning: … `compute*` calculates deterministically") verdict=CONFIRMED
   wrong: `#calculatePremiseConfidence` uses `calculate*` where the rule fixes `compute*` for a deterministic calculation. No `compute*` exists in the package, so this is the one occupant of a prefix the rules do not sanction.
   repair: Rename to `computePremiseConfidence` when finding 14 extracts it to `helpers.ts`.

## s07-21

21. package=reason file=`src/core/helpers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `src/core/errors.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
   wrong: Every exported function in these four files opens its TSDoc with an imperative verb — `Format`, `Build`, `Clamp`, `Round`, `Determine`, `Sort`, `Collect`, `Derive`, `Bucket`, `Substitute`, `Project`, `Apply`, `Return`, `Flatten`, `Invert`, `Insert`, `Swap`, `Filter`, `Reconcile`, `Upsert`, `Remove`, `Delete`, `Parse`, `Produce`, `Create`, `Narrow` — rather than the third-person `-s` form the rule fixes. The classes in `Reason.ts`, the three operators, and the four reasoners already use third person (`Evaluates`, `Applies`, `Reduces`), so the package is internally split. This matches the fleet-wide convention the dedicated lane confirmed (139 imperative, 0 third-person in reason); it is recorded here as one finding and needs a fleet ruling, not a per-package fix.
   repair: Fleet decision — either convert these four files to the third-person `-s` form, or amend `.claude/rules/typescript.md` § Comments to fix the imperative as the convention. Do not fix reason alone.

## s07-22

22. package=reason file=`src/core/helpers.ts:1141`, `:1447` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does … and never repeats the symbol's name") verdict=CONFIRMED
   wrong: Two public helpers open with a noun phrase describing the return value rather than a sentence about what the function does, in neither the third-person nor the imperative form. `findUnboundVariables` opens "The `'?'`-prefixed variables an inference's conclusion introduces that no premise binds." `findOverlayMismatches` opens "The `formatField`-flattened overlay keys an array-path conclusion atom writes ANYWHERE among `rules` that an array-path premise atom also reads ANYWHERE among `rules`." This is a separate defect from finding 21 and is not covered by the fleet convention ruling.
   repair: Recast both as a verb-first sentence — "Collects the `'?'`-prefixed conclusion variables no premise binds." and "Collects the flattened overlay keys written through an array path and also read through an array path." — moving the current text into `@remarks`.

## s07-23

23. package=reason file=`src/core/helpers.ts:1795`–`:2413` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") and § Wrapper test verdict=CONFIRMED
   wrong: Twenty-four exported helpers — `appendGroup`/`prependGroup`/`replaceGroup`/`removeGroup`, then the same quartet for factors, rules, equations, facts, and inferences — are each a one-line spread over the corresponding `*ById` primitive (`{ ...definition, groups: appendById(definition.groups, group, target) }`). Six copies of one four-verb pattern, differing only in the container field name. They add a container projection, so they are not pure pass-throughs, but the pattern is repeated six times without being centralized.
   repair: Lower priority than finding 1 — resolve it in the same pass. Replace the twenty-four with four generic helpers keyed by the collection field (`appendIn(container, field, item, target)` and siblings), or keep the per-kind names as the published ergonomic surface and generate their bodies from one shared implementation. Do not leave six hand-written copies.

## s07-24

24. package=reason file=`src/core/operators/Aggregator.ts:29`, `src/core/operators/Transformer.ts:28`, `src/core/operators/Evaluator.ts:30` rule=`.claude/rules/names.md` § Split behavioral variants ("Do not hide multiple algorithms behind a discriminator parameter") verdict=EXEMPT
   wrong: `aggregate(values, aggregation, weights)`, `apply(value, transform)`, and `evaluate(check, subject)` each select a different algorithm from a literal carried in the argument — the shape the rule normally forbids.
   repair: None. The exception is documented at `src/core/types.ts:5`, which states the package's design as an interpreter over declarative JSON-serializable definitions: the operator literal arrives inside caller data (`FactorGroup.aggregation`, `Transform.operation`, `Check.operator`), so it cannot be resolved to a distinct function at the call site. The rule's own carve-out for "uniformly applied value enums" covers it. Recorded so it is not re-raised.