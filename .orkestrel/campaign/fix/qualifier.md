# Fix dossier: qualifier

Verified fix-producing findings for the `qualifier` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s16-27 — DRIFT-RESHAPE

27. package=qualifier file=src/core/types.ts:114; src/core/validators.ts:162 rule=.claude/rules/architecture.md § Barrel exports ("Never re-export a symbol originating in another package"); § Wrapper test verdict=CONFIRMED
    wrong: `export type QualificationValidationResult = ReasonValidationResult` and `export const isQualificationValidationResult: Guard<QualificationValidationResult> = isReasonValidationResult` republish `@orkestrel/reason`'s type and guard under new names through this package's barrel, adding nothing. The `@remarks` at `validators.ts:153-157` and `guides/qualifier.md:147` argue for delegation, which is an argument for importing reason's symbol at the call site rather than for aliasing it here.
    repair: delete both aliases; type `QualifierInterface.validate` as `ReasonValidationResult` imported from `@orkestrel/reason`, and point the guide's validator row and the fences at lines 163 and 192 at `isReasonValidationResult` from its own package.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes agree the aliases are a rename-only republication the barrel rule bans outright, and the deliberate-reason hunt returns only a `@remarks` arguing for delegation rather than for aliasing — undercut by the same interface passing reason's `Subject` and `ReasonInterface` through unaliased. Th

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: delete both aliases and type `QualifierInterface.validate` as `ReasonValidationResult` imported from `@orkestrel/reason`. DELETE the `isQualificationValidationResult` row from the guide's validator table rather than repointing it at a foreign guard (keep the fences at guides/qualifier.md:163,192 only if they import from `@orkestrel/reason` like the existing line 154 import), and remove `tests/src/core/validators.test.ts:459-499` in the same change.

## s16-29 — DRIFT

29. package=qualifier file=src/core/helpers.ts:489,510,536-537,815 rule=AGENTS.md § Non-negotiable rules (public return collections readonly); .claude/rules/typescript.md § Types verdict=CONFIRMED
    wrong: `deriveFindingEligibility(findings: Finding[])`, `deriveScopeEligibilities(findings: Finding[])`, `combineEligibilities(eligibilities: Eligibility[])`, and `qualificationDefinition(passes: QualificationPass[])` take mutable arrays, so the package's own readonly result types cannot be fed back into its own public helpers: `QualificationResult.findings` is `readonly Finding[]` (`types.ts:106`) and `QualificationDefinition.passes` is `readonly QualificationPass[]` (`types.ts:95`), and neither is assignable.
    repair: widen all four parameters to `readonly Finding[]`, `readonly Eligibility[]`, and `readonly QualificationPass[]`; the bodies only read and spread, so no other change is needed.

## s16-30 — DRIFT-RESHAPE

30. package=qualifier file=src/core/helpers.ts:575,719,755 rule=.claude/rules/names.md § Standalone helpers ("A helper prefix has one project-wide meaning") verdict=CONFIRMED
    wrong: `findMissingReferences`, `findEmptyLogicalPasses`, and `findUnreadDerivations` return `readonly string[]` of formatted human messages, not the references, passes, or derivations their names promise, while `findRule` (line 285) in the same file returns the located `Rule`. The prefix carries two meanings in one module, and the message-producing three are consumed by pushing their return straight into `errors` / `warnings` (`Qualifier.ts:116,118,119`).
    repair: rename the three to the file's existing prose-producing prefix — `describeMissingReferences`, `describeEmptyLogicalPasses`, `describeUnreadDerivations` — leaving `find*` to mean locate; update `Qualifier.ts:22-26,116-119` and the guide's helper table.

### Verification

**Judge (DRIFT-RESHAPE/high):** The subjective lane's EXCEPTION rests on a premise I checked and falsified: it reads the siblings' return TYPE (`readonly string[]`) as the same shape, but none of them returns formatted prose. `findMissingScopes` returns `[...missing]` scope ids, `findUnmetRules` returns rule names, `findUngrantedA

**Lane DRIFT-RESHAPE/high:** amend: keep the prefix's single meaning by making these three return what they locate, the offending pass and ruling ids, and let `Qualifier.validate` compose the message, which is exactly the shape of `findMissingScopes` in program and `findUnmetRules` in brief. If the multi-kind message payload must survive on the helper, rename to a prefix that is neither `find*` nor the file's `describe*` rendering family, and state that prefix's one meaning where it is introduced.

**Lane EXCEPTION/medium:** drop

## s16-32 — DRIFT-RESHAPE

32. package=qualifier file=src/core/errors.ts:15,17 rule=.claude/rules/typescript.md § Errors and outcomes ("Error classes expose a machine-readable `code` and optional `context`") verdict=CONFIRMED
    wrong: `QualifierError.context` is published as `unknown` and is not optional, so a consumer cannot read it without narrowing that the package could have done once — yet every construction site passes the same shape, `{ pass, cause }` (`helpers.ts:673,681,684,690`), and the sibling package declares `QueueErrorContext` for exactly this.
    repair: declare `QualifierErrorContext { readonly pass?: string; readonly cause?: unknown }` in `types.ts`, type the field `QualifierErrorContext | undefined`, and take the same type in the constructor.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: declare `readonly context?: Readonly<Record<string, unknown>>` and take the same type in the constructor, matching reason, rater, brief, and workflow. In the same change fix `Qualifier.ts:88-92` to pass `{ definition: definition.id }` instead of the bare string. Do not introduce a bespoke `QualifierErrorContext`, and do not copy queue's options-object error shape.

**Lane DRIFT-RESHAPE/high:** amend: declare `QualifierErrorContext` in `types.ts` covering every real payload - `readonly pass?: string`, `readonly definition?: string`, `readonly cause?: unknown` - change `Qualifier.ts:91` to pass `{ definition: definition.id }`, declare the field as `QualifierErrorContext | undefined`, take the same type in the constructor, and freeze a copy as `queue/src/core/errors.ts:26` does.

## s16-33 — DRIFT

33. package=qualifier file=src/core/Qualifier.ts:79,83,98,123; src/core/validators.ts:33,36,166,171,186; src/core/errors.ts:26 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the `Qualifier` class's entire public surface — `get emitter`, `qualify`, `validate`, `destroy` — carries no TSDoc at all, and `QualifierInterface`'s members (`types.ts:138-141`) carry none either, so `qualify`'s throw behaviour (`QualifierError('DEFINITION')` at line 88) is documented nowhere in source. Five public guards and `isQualifierError` carry a description with no `@param` or `@returns`, while `isPremise` and its siblings in the same file carry both.
    repair: add full TSDoc — description, `@param`, `@returns`, `@throws`, `@example` — to the four `Qualifier` members and to `QualifierInterface`'s members, and add `@param` / `@returns` to `isEligibility`, `isQualificationEffect`, `isQualificationPass`, `isRuling`, `isQualificationDefinition`, and `isQualifierError`.

## s16-34 — DRIFT-RESHAPE

34. package=qualifier file=src/core/helpers.ts:38,72,110,144,178,213,267,290,342,368,387,411,470,498,518,553,603,620,646,696,730,792,829; src/core/validators.ts:32,35,38,57,81,107,127,151,165,170,185; src/core/errors.ts:25; src/core/factories.ts:5 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of every public export is imperative ("Interpolate…", "Describe…", "Build…", "Derive…", "Determine whether…", "Narrow a caught value…", "Create one qualifier…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Interpolates…", "Describes…", "Builds…", "Derives…", "Determines whether…", "Narrows…", "Creates…") and mirror it into the guide tables.

### Verification

**Judge (DRIFT-RESHAPE/high):** Every cited location resolves and every one is imperative, and both lanes correctly refuse an EXCEPTION for fleet-wide uniformity. The dispute is the repair's second half, and the subjective lane is right for a reason I confirmed at the rule level rather than the convention level: the cited rule liv

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: rewrite the TSDoc first sentences in third person across `helpers.ts`, `validators.ts`, `errors.ts:25`, and `factories.ts:5`. Drop the 'mirror it into the guide tables' half - guide table voice is not governed by the TSDoc rule, and changing qualifier's alone breaks the fleet-wide table convention.

