# Findings for group g11

Packages: queue, qualifier. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s16-19

19. package=queue file=src/core/Queue.ts:141-205 and 76-99 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"); § Functions and orchestration (extract pure leaves) verdict=CONFIRMED
    wrong: `enqueue` repeats one 16-line block four times — read the option inside a try/catch, throw a coded `QueueError` on a throwing getter, then run a guard and throw a second coded error — for `id`, `retries`, `timeout`, and `signal`; the constructor repeats a three-line default-then-guard-then-throw block three times for `concurrency`, `retries`, and `timeout`.
    repair: add `src/core/helpers.ts` (barrelled from `index.ts`) with two exported leaves — one that reads a named option from a foreign options object and throws the coded read failure, and one that applies a guard and throws the coded invalid-value failure — and call them from both sites.

## s16-20

20. package=queue file=src/core/Queue.ts:61-62,66-67,330-331,371-372 rule=AGENTS.md § Design laws (Derive state) verdict=CONFIRMED
    wrong: `#aborted` duplicates `#abortPromise !== undefined` and `#destroyed` duplicates `#destroyPromise !== undefined` — each pair is assigned on adjacent lines in the only method that sets it (`abort` at 330-331, `destroy` at 371-372) and nowhere else, so both are second flags that can drift from the latch they mirror. (`#stopped` is genuinely independent: `abort` sets it without a `#stopPromise`.)
    repair: delete the `#aborted` and `#destroyed` fields and read `this.#abortPromise !== undefined` / `this.#destroyPromise !== undefined` at their nineteen read sites, or keep the flags and delete the latches — one fact, one field.

## s16-21

21. package=queue file=src/core/Queue.ts:510 rule=AGENTS.md § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: `#drain(error)` rejects pending work and returns cleanup promises, while the `drain` event (`types.ts:92`) means the queue reached no reserved live ids and is served by `#latchDrain` / `#emitDrain` (690, 696). The same word names a rejection sweep and an idle transition in one class.
    repair: rename `#drain` to `#rejectPending` at its declaration and its three call sites (299, 340, 358), leaving `drain`, `#latchDrain`, and `#emitDrain` to the idle concept alone.

## s16-22

22. package=queue file=src/core/types.ts:207-211; src/core/Queue.ts:113-131 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the five public data members `emitter`, `count`, `active`, `paused`, and `stopped` carry no TSDoc on the interface and none on the class, while every call-signature member beside them does (`types.ts:212-229`); a consumer reading the type learns nothing about what `count` tallies versus `active`, which is exactly the distinction `.claude/rules/names.md` § Tallies makes this pair carry.
    repair: add a one-line TSDoc to each of the five interface members stating the fact each reports (`count` = reserved live entries, `active` = claimed in flight, `stopped` = stopped or aborted), and add `@returns` to `restore`, `stop`, `abort`, `clear`, and `destroy` on the class.

## s16-23

23. package=queue file=src/core/Queue.ts:251; src/core/stores/MemoryQueueStore.ts:42 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
    wrong: the stored-entry validity test `!isString(id) || !isQueueRetries(attempts)` is written out in two files against the same `StoredEntry` contract, so a change to what a valid stored entry is has two homes; `validators.ts` holds no guard for the package's own `StoredEntry` type even though it is the type crossing the store boundary.
    repair: add `isStoredEntry` to `src/core/validators.ts` as a total guard over `StoredEntry<unknown>` and route both sites through it.

## s16-24

24. package=queue file=src/core/Queue.ts:77,85,93; src/core/validators.ts:48 rule=.claude/rules/architecture.md § Centralized-file pattern (Constants/data → `*/constants.ts`); § Kind purity verdict=CONFIRMED
    wrong: the queue's published defaults (`concurrency` 1, `retries` 0, `timeout` 0) and the native timer ceiling `2_147_483_647` are bare literals in a class body and a guard, and are restated in prose at `types.ts:139-141` and `164-168`, so the documented default and the enforced default are two independent facts.
    repair: add `src/core/constants.ts` (barrelled) with `DEFAULT_CONCURRENCY`, `DEFAULT_RETRIES`, `DEFAULT_TIMEOUT`, and `MAX_TIMEOUT`, and read them from the constructor and `isQueueTimeout`.

## s16-25

25. package=queue file=src/core/types.ts:247 rule=.claude/rules/names.md § Type-level identifiers verdict=CONFIRMED
    wrong: `StoredEntry` is the only public type in the module that does not name its entity — every sibling is `Queue*` (`QueueCode`, `QueueEntryOptions`, `QueueEventMap`, `QueueStoreInterface`) — so the package's most-passed data type reads as unowned in a consumer's import list.
    repair: rename it `QueueEntry` and update `types.ts`, `Queue.ts`, `factories.ts`, `stores/MemoryQueueStore.ts`, `stores/DatabaseQueueStore.ts`, and the guide rows.

## s16-26

26. package=queue file=src/core/validators.ts:4,20,36,52; src/core/errors.ts:31; src/core/Queue.ts:71,134,239,280,288,308,314,321,348,367; src/core/stores/MemoryQueueStore.ts:28,36,61,67,89; src/core/stores/DatabaseQueueStore.ts:37,46,51,56,61 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of the public guards, methods, and constructors is imperative ("Determine whether…", "Create a queue.", "Reserve and submit one FIFO entry.", "Upsert a validated…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Determines whether…", "Creates a queue.", "Reserves and submits…", "Upserts…").

## s16-27

27. package=qualifier file=src/core/types.ts:114; src/core/validators.ts:162 rule=.claude/rules/architecture.md § Barrel exports ("Never re-export a symbol originating in another package"); § Wrapper test verdict=CONFIRMED
    wrong: `export type QualificationValidationResult = ReasonValidationResult` and `export const isQualificationValidationResult: Guard<QualificationValidationResult> = isReasonValidationResult` republish `@orkestrel/reason`'s type and guard under new names through this package's barrel, adding nothing. The `@remarks` at `validators.ts:153-157` and `guides/qualifier.md:147` argue for delegation, which is an argument for importing reason's symbol at the call site rather than for aliasing it here.
    repair: delete both aliases; type `QualifierInterface.validate` as `ReasonValidationResult` imported from `@orkestrel/reason`, and point the guide's validator row and the fences at lines 163 and 192 at `isReasonValidationResult` from its own package.

## s16-28

28. package=qualifier file=src/core/helpers.ts:812,845 rule=.claude/rules/architecture.md § Centralized-file pattern (Entity/value factories → `*/factories.ts`); § Kind purity verdict=CONFIRMED
    wrong: `qualificationDefinition` and `rulingDefinition` construct and return `QualificationDefinition` and `Ruling` values from their parts — value factories — but live in `helpers.ts` and carry neither the `create*` form § Kind purity fixes for `factories.ts` nor the `*Of` builder form.
    repair: move both into `src/core/factories.ts` beside `createQualifier` and rename them `createQualification` and `createRuling`; update `helpers.ts`'s own `@example` fences (lines 561, 708, 744, 807, 840) and the guide's helper table.

## s16-29

29. package=qualifier file=src/core/helpers.ts:489,510,536-537,815 rule=AGENTS.md § Non-negotiable rules (public return collections readonly); .claude/rules/typescript.md § Types verdict=CONFIRMED
    wrong: `deriveFindingEligibility(findings: Finding[])`, `deriveScopeEligibilities(findings: Finding[])`, `combineEligibilities(eligibilities: Eligibility[])`, and `qualificationDefinition(passes: QualificationPass[])` take mutable arrays, so the package's own readonly result types cannot be fed back into its own public helpers: `QualificationResult.findings` is `readonly Finding[]` (`types.ts:106`) and `QualificationDefinition.passes` is `readonly QualificationPass[]` (`types.ts:95`), and neither is assignable.
    repair: widen all four parameters to `readonly Finding[]`, `readonly Eligibility[]`, and `readonly QualificationPass[]`; the bodies only read and spread, so no other change is needed.

## s16-30

30. package=qualifier file=src/core/helpers.ts:575,719,755 rule=.claude/rules/names.md § Standalone helpers ("A helper prefix has one project-wide meaning") verdict=CONFIRMED
    wrong: `findMissingReferences`, `findEmptyLogicalPasses`, and `findUnreadDerivations` return `readonly string[]` of formatted human messages, not the references, passes, or derivations their names promise, while `findRule` (line 285) in the same file returns the located `Rule`. The prefix carries two meanings in one module, and the message-producing three are consumed by pushing their return straight into `errors` / `warnings` (`Qualifier.ts:116,118,119`).
    repair: rename the three to the file's existing prose-producing prefix — `describeMissingReferences`, `describeEmptyLogicalPasses`, `describeUnreadDerivations` — leaving `find*` to mean locate; update `Qualifier.ts:22-26,116-119` and the guide's helper table.

## s16-31

31. package=qualifier file=src/core/helpers.ts:66,84-107; claim restated at src/core/types.ts:51 and src/core/helpers.ts:72,110,144 rule=AGENTS.md § Design laws (Mechanism, not product policy); .claude/rules/writing.md § Claims and time verdict=CONFIRMED
    wrong: the rendering helpers are documented as producing "display-neutral" output, but `describeComparison` returns hard-coded English phrases (`'is more than'`, `'is none of'`) and `interpolateMessage` formats every finite number with a hard-coded `'en-US'` grouping; a consumer rendering in another language or locale has no seam — `QualifierOptions.labels` overrides field names only. The shipped artifact does not match the sentence describing it.
    repair: either state the limit honestly — replace "display-neutral" with "English, `en-US`-formatted" in `types.ts:51`, `helpers.ts:72,110,144`, and `guides/qualifier.md:76,206` — or make it true by moving the phrase table into `constants.ts` and adding a `phrases` and `locale` option beside `labels` on `QualifierOptions`. Take the first unless a consumer needs the second.

## s16-32

32. package=qualifier file=src/core/errors.ts:15,17 rule=.claude/rules/typescript.md § Errors and outcomes ("Error classes expose a machine-readable `code` and optional `context`") verdict=CONFIRMED
    wrong: `QualifierError.context` is published as `unknown` and is not optional, so a consumer cannot read it without narrowing that the package could have done once — yet every construction site passes the same shape, `{ pass, cause }` (`helpers.ts:673,681,684,690`), and the sibling package declares `QueueErrorContext` for exactly this.
    repair: declare `QualifierErrorContext { readonly pass?: string; readonly cause?: unknown }` in `types.ts`, type the field `QualifierErrorContext | undefined`, and take the same type in the constructor.

## s16-33

33. package=qualifier file=src/core/Qualifier.ts:79,83,98,123; src/core/validators.ts:33,36,166,171,186; src/core/errors.ts:26 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the `Qualifier` class's entire public surface — `get emitter`, `qualify`, `validate`, `destroy` — carries no TSDoc at all, and `QualifierInterface`'s members (`types.ts:138-141`) carry none either, so `qualify`'s throw behaviour (`QualifierError('DEFINITION')` at line 88) is documented nowhere in source. Five public guards and `isQualifierError` carry a description with no `@param` or `@returns`, while `isPremise` and its siblings in the same file carry both.
    repair: add full TSDoc — description, `@param`, `@returns`, `@throws`, `@example` — to the four `Qualifier` members and to `QualifierInterface`'s members, and add `@param` / `@returns` to `isEligibility`, `isQualificationEffect`, `isQualificationPass`, `isRuling`, `isQualificationDefinition`, and `isQualifierError`.

## s16-34

34. package=qualifier file=src/core/helpers.ts:38,72,110,144,178,213,267,290,342,368,387,411,470,498,518,553,603,620,646,696,730,792,829; src/core/validators.ts:32,35,38,57,81,107,127,151,165,170,185; src/core/errors.ts:25; src/core/factories.ts:5 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of every public export is imperative ("Interpolate…", "Describe…", "Build…", "Derive…", "Determine whether…", "Narrow a caught value…", "Create one qualifier…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Interpolates…", "Describes…", "Builds…", "Derives…", "Determines whether…", "Narrows…", "Creates…") and mirror it into the guide tables.