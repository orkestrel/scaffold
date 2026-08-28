# Fix dossier: program

Verified fix-producing findings for the `program` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s15-22 — DRIFT-RESHAPE

22. package=program file=`/home/user/fleet/program/src/core/helpers.ts:999,1034,1056` rule=`.claude/rules/architecture.md` § Centralized-file pattern / § Kind purity verdict=CONFIRMED
    wrong: `programDefinition`, `noticeDefinition`, and `aggregateDefinition` construct fresh `ProgramDefinition`, `Notice`, and `AggregateDefinition` values, copying every collection — value factories by the kind table's own definition — but they sit in `helpers.ts` under noun-phrase names. The rule requires value factories in `factories.ts`, and every exported function there to be named `create*`. `guides/program.md:303-305` describes all three as "Build a fresh …" and records no exception.
    repair: move all three to `/home/user/fleet/program/src/core/factories.ts` and rename to `createProgramDefinition`, `createNotice`, and `createAggregateDefinition`; update `guides/program.md:37,75,130-131,303-305,333-362,379-381,750-906` and the `NoticeInput`/`AggregateInput` doc text at `types.ts:32,43`. The same reasoning reaches `emptySums` (`helpers.ts:844`) and `emptyTallies` (`helpers.ts:889`), which build fresh zero records; move and rename those too, or rule them as internal leaves and keep them in `helpers.ts` under `{verb}{Noun}` names.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The subjective lane is right that half survives. The placement half fails: architecture.md's `createWriteDirectory` case says placement follows what the function is, and the leaf-pair rule characterizes factories.ts as the layer that constructs or drives a class — program's factories.ts imports `Pro

**Lane INVALID/medium:** drop

**Lane DRIFT-RESHAPE/medium:** amend: rename in place inside `helpers.ts` to `buildProgramDefinition`, `buildNotice`, and `buildAggregateDefinition`, matching the file's existing `buildAggregateProjection`/`buildAggregateRecord` and the guide's own verb; apply the same `{verb}{Noun}` rename to `emptySums` and `emptyTallies` (`buildEmptySums`, `buildEmptyTallies`); update guides/program.md:37,75,130-131,303-305,333-362,379-381,750-906 and the `NoticeInput`/`AggregateInput` doc text at types.ts:32,43. Do not create factories.ts entries and do not use the `create*` prefix. Because the same form is published by qualifier, rater, and brief, schedule the rename as one cross-package unit so the composed authoring surface stays consistent.

## s15-23 — DRIFT

23. package=program file=`/home/user/fleet/program/src/core/helpers.ts:69` rule=`.claude/rules/architecture.md` § Wrapper test + `AGENTS.md` § Non-negotiable rules ("prefer native APIs") verdict=CONFIRMED
    wrong: `copyJSONValue` hand-rolls a recursive deep copy of a JSON tree, while the same package deep-copies with the platform's `structuredClone` at `programs/Program.ts:93` for the same purpose. `JSONValue` admits nothing `structuredClone` cannot copy, so the two are semantically identical over this domain — one concept with two implementations, one of which the TSDoc has to warn about stack exhaustion.
    repair: delete `copyJSONValue` and call `structuredClone` at its single source use (`helpers.ts:1015`), removing the guide row at `guides/program.md:278,333,350`. If the function is retained for a reason the guide should state, it is an ownership snapshot and belongs in `src/core/cloners.ts`, not `helpers.ts`.

### Verification

**Judge (DRIFT/high):** I reproduced the subjective lane's probe and it holds exactly; the objective lane's decisive claim fails at the actual call site. `structuredClone` preserves an own `__proto__` key without touching the prototype, so the TSDoc's only stated rationale names no property it lacks; it also clones cycles

**Lane DRIFT-RESHAPE/medium:** amend: keep one owned snapshot function, place it in the new `/home/user/fleet/program/src/core/cloners.ts` per the 'Owned snapshots' row, implement it over `structuredClone` (which also handles the cycles the current recursion stack-overflows on) with the total contract preserved, route both `Program.ts:93` and `helpers.ts:1015` through it, add the `cloners.js` barrel row, and update the guide row at guides/program.md:278.

**Lane DRIFT/medium:** stands

## s15-24 — DRIFT

24. package=program file=`/home/user/fleet/program/src/core/errors.ts:19` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
    wrong: `ProgramError`'s constructor is `(code, message, context?)` and cannot carry a `cause`, so `programs/Program.ts:96` and `programs/Program.ts:111` each reach around it with `Object.defineProperty(error, 'cause', …)`. The same workaround twice is the pattern the rule centralizes, and `/home/user/fleet/lsp/src/core/errors.ts:16-18` shows the correct shape in the same fleet — `super(message, cause === undefined ? undefined : { cause })`.
    repair: give `ProgramError` a `cause` parameter (or an options object matching `LSPErrorOptions`) and pass it through `super`; replace both `Object.defineProperty` blocks in `Program.ts` with a plain `throw new ProgramError('DEFINITION', …, context, cause)`.

## s15-25 — DRIFT-RESHAPE

25. package=program file=`/home/user/fleet/program/src/core/types.ts:17`, `constants.ts:8-14`, `validators.ts:65-71`, `helpers.ts:867-873` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: the five `Status` literals are written out four times — the union, `STATUS_PRECEDENCE`, `isStatus`'s `literalOf` arguments, and `completeTallies`'s object literal. Adding a sixth status compiles everywhere except `completeTallies`, which silently drops it from every tally record.
    repair: make the frozen list the single source — `export const STATUSES = ['ineligible','referral','conditional','unrated','eligible'] as const` in `constants.ts`, `export type Status = (typeof STATUSES)[number]` in `types.ts`, `isStatus = literalOf(...STATUSES)`, and build `completeTallies` by folding `STATUSES`. `STATUS_PRECEDENCE` then becomes `STATUSES` itself or an explicitly reordered projection of it.

### Verification

**Judge (DRIFT-RESHAPE/high):** The objective lane wins the decisive point and loses a sub-point. I typechecked both fold forms under program's own tsc: a `Partial` accumulator fails TS2322 and `Object.fromEntries` fails TS2739, so the finding's clause 'build `completeTallies` by folding `STATUSES`' cannot be implemented without t

**Lane DRIFT-RESHAPE/high:** amend: declare one frozen `STATUSES` tuple in `constants.ts`, derive `export type Status = (typeof STATUSES)[number]` in `types.ts`, and define `isStatus = literalOf(STATUSES)` (the `@orkestrel/contract` array overload at node_modules/@orkestrel/contract/dist/src/core/index.d.ts:3749 accepts a readonly array). Keep `STATUS_PRECEDENCE` a separate declared ranking over `Status`, and leave `completeTallies`'s explicit exhaustive literal exactly as it is — it is the compile-time gate, not the drift.

**Lane DRIFT/high:** stands

## s15-26 — DRIFT

26. package=program file=`/home/user/fleet/program/src/core/errors.ts:27-30` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `isProgramError` carries a single imperative line ("Narrow a caught value to a `ProgramError`.") with no `@param`, no `@returns`, and no `@example`, while every guard in the sibling `validators.ts` carries all three (for example `validators.ts:37-49`). `ProgramError` itself (line 3-14) has no `@example` and documents no constructor `@param`.
    repair: rewrite as "Checks whether a caught value is a `ProgramError`." plus `@param value`, `@returns True if …; false otherwise`, and an `@example`; add an `@example` and constructor `@param` rows to the class.

## s15-27 — DRIFT

27. package=program file=`/home/user/fleet/program/src/core/helpers.ts:51,85,109,133,164,208,226,260,311,341,410,453,485,534,643,667,702,731,770,804,832,851,877,896,924,979,1020,1043`; `factories.ts:12,41`; `validators.ts:38,52,74,89,106,126,160,185,214,236,254,277,313,346`; `errors.ts:27` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: every exported symbol's TSDoc opens with a bare imperative ("Return", "Determine", "Assert", "Select", "Derive", "Map", "Resolve", "Convert", "Build", "Add", "Validate", "Coerce", "Fold", "Sum", "Partition", "Complete", "Assemble", "Create", "Narrow") instead of the required third-person `-s` form.
    repair: rewrite each first sentence — "Determines whether a value is a `Decision` literal.", "Builds a `ProgramDefinition`.", "Creates one compiled program over a qualifier and rater."

