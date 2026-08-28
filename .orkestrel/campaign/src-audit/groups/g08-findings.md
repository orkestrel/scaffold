# Findings for group g08

Packages: router, program. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s15-01

1. package=router file=`/home/user/fleet/router/src/core/helpers.ts:363` rule=`.claude/rules/architecture.md` § Centralized-file pattern / § Kind purity verdict=CONFIRMED
   wrong: `parseMethod(value: string): Method | undefined` is a coercer — the exact `parse*` form the rules define as "coercion producing `T | undefined`" — but it sits in `helpers.ts`, and the kind table places coercers in `*/parsers.ts`.
   repair: create `/home/user/fleet/router/src/core/parsers.ts`, move `parseMethod` there unchanged, add `export * from './parsers.js'` to `src/core/index.ts`, and update the import at `Dispatcher.ts:19`. This is the "wrong file, right name → move it" repair; the barrel star-export keeps the published surface identical.

## s15-02

2. package=router file=`/home/user/fleet/router/src/core/helpers.ts:364-374` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: `parseMethod` re-lists the seven registrable HTTP methods as a chain of `===` comparisons, duplicating `METHODS` at `constants.ts:24`; adding a method to `METHODS` silently leaves `parseMethod` unable to narrow it, and `Dispatcher.handle` then reports a registrable verb as `miss`.
   repair: declare `export const METHODS: ReadonlySet<Method>` in `constants.ts:24` (the widened `ReadonlySet<string>` is what forced the duplicate), then implement `parseMethod` by consulting `METHODS` so the method set has one home.

## s15-03

3. package=router file=`/home/user/fleet/router/src/server/helpers.ts:32` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
   wrong: `isEncryptedSocket(socket: unknown): socket is { readonly encrypted: true }` is a total type guard — not the `isVacant`-style bare predicate the rule exempts — but it lives in `helpers.ts`.
   repair: create `/home/user/fleet/router/src/server/validators.ts`, move the function there, add `export * from './validators.js'` to `src/server/index.ts`, and import it at `helpers.ts:81`.

## s15-04

4. package=router file=`/home/user/fleet/router/src/server/helpers.ts:218,271` rule=`.claude/rules/architecture.md` § Centralized-file pattern / § Kind purity verdict=CONFIRMED
   wrong: `src/server/helpers.ts` mixes four kinds in one file — a guard (line 32), two conversion leaves (78, 157), a request handler `handleListenerRequest` (218), and a value factory `createListener` (271) that returns a `ListenerFunction` closure over a dispatcher. `handlers.ts` owns request handlers and `factories.ts` owns value factories.
   repair: move `handleListenerRequest` to `/home/user/fleet/router/src/server/handlers.ts` and `createListener` to `/home/user/fleet/router/src/server/factories.ts`, leave `buildRequest` and `sendResponse` in `helpers.ts`, and add both barrel rows to `src/server/index.ts`.

## s15-05

5. package=router file=`/home/user/fleet/router/src/core/Dispatcher.ts:61` rule=`.claude/rules/architecture.md` § Class order verdict=CONFIRMED
   wrong: the child `Router` is held as a public assignable field `readonly router: RouterInterface<...>`, while the sibling child `#emitter` (line 62) correctly uses a `#` field plus a getter (line 83). The rule is "Store child managers in `#` fields and expose readonly getters typed as their interfaces", and `Navigator` already does it that way at `browser/Navigator.ts:59,109`.
   repair: rename the field to `#router`, assign it in the constructor, and add `get router(): RouterInterface<RouteRecord<TState>> { return this.#router }` after the `emitter` getter; update the four internal uses at lines 70, 99, 102, 152, 166.

## s15-06

6. package=router file=`/home/user/fleet/router/src/core/helpers.ts:13,37,65,85,166,195,233,268,303,342,378`; `core/factories.ts:11,38`; `browser/helpers.ts:11,31,60,103`; `browser/factories.ts:5`; `server/helpers.ts:16,37,126,195,239` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: every exported function's TSDoc opens with a bare imperative ("Escape", "Canonicalize", "Compute", "Compile", "Create", "Determine", "Build", "Write", "Handle", "Join", "Narrow", "Classify", "Compare", "Extract", "Resolve", "Find"). The rule requires the first sentence to state what the symbol does in the third person with an `-s` verb. `/home/user/fleet/lsp/src/core/helpers.ts:8,46,74,108,136,274,318` is the compliant form in the same fleet, and `/home/user/fleet/router/guides/router.md:72,79` already writes the guide cells the other way.
   repair: rewrite each first sentence in `-s` form — "Escapes every regex metacharacter…", "Creates a `RouterInterface`…", "Narrows a raw `request.method` string…".

## s15-07

7. package=router file=`/home/user/fleet/router/src/core/Group.ts:17`, `src/core/DispatchGroup.ts:20`, `src/core/factories.ts:26,54`, `src/browser/factories.ts:23`, `src/server/helpers.ts:29,69,149,262` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
   wrong: public `@example` blocks import through the in-repository aliases `@src/core`, `@src/browser`, and `@src/server`. Those aliases ship into `dist/src/**/*.d.ts` and resolve to nothing for a consumer, so a copied example fails. The rule reserves `@src/*` for source and tests and fixes the published specifier for consumer-facing examples; `/home/user/fleet/guide/src/core/factories.ts:28` and `/home/user/fleet/program/src/core/factories.ts:26` already use `@orkestrel/<name>`.
   repair: replace each with `@orkestrel/router`, `@orkestrel/router/browser`, or `@orkestrel/router/server`. (The rule's own wording names guide fences; I am reading it as governing the published example surface, which is the same artifact a consumer copies.)

## s15-08

8. package=router file=`/home/user/fleet/router/src/browser/Navigator.ts:58` rule=`.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
   wrong: the browser barrel publishes a class named `Navigator`, which is the name of a DOM global interface. Inside `Navigator.ts` the class shadows `lib.dom`'s `Navigator`, and a consumer writing `import { Navigator } from '@orkestrel/router/browser'` shadows it in their own module. The name also does not say what the entity is — it resolves routes and tracks `active`; it navigates only as one of its operations.
   repair: rename the class and its interface to a name the package owns — `Route`/`RouteInterface` reads wrong here, so `Navigation`/`NavigationInterface` is the smallest change that keeps the domain word and clears the global; update `browser/types.ts:118`, `browser/factories.ts`, the barrel, and `guides/router.md`. This one is judgment rather than a mechanical rule hit; rule it deliberately rather than by default.

## s15-09

9. package=router file=`/home/user/fleet/router/src/core/helpers.ts:448` rule=`.claude/rules/architecture.md` § Wrapper test verdict=EXEMPT
   wrong: `route()` returns its input unchanged — a pass-through the wrapper test names for deletion.
   repair: none. `/home/user/fleet/router/guides/router.md:419-442` documents it as a `const Path extends string` inference pin that a bare object literal through an intermediate binding cannot get, and states the ceiling it does not raise. Recorded so it is not re-raised. The remaining question is the name: `route` is a bare noun where `.claude/rules/names.md` § Standalone helpers defaults module helpers to `{verb}{Noun}`, and the guide does not address that.

## s15-10

10. package=router file=`/home/user/fleet/router/src/browser/types.ts:71-73` rule=`.claude/rules/patterns.md` § Stateful emitters / § Listener isolation verdict=EXEMPT
    wrong: `NavigatorOptions.error` is the emitter's listener-error handler by contract, but `Navigator.#surface` (`Navigator.ts:242-250`) also routes a thrown `guard` — a domain failure, not a listener throw — into it, and passes the literal `'navigate'` as the event name.
    repair: none required. The `@remarks` at `browser/types.ts:71-73` states the doubling explicitly ("ALSO the handler a thrown `guard` routes to … surfaced through the same channel"). Recorded because a consumer distinguishing listener faults from guard faults cannot, and a future round may choose to split the channel.

## s15-22

22. package=program file=`/home/user/fleet/program/src/core/helpers.ts:999,1034,1056` rule=`.claude/rules/architecture.md` § Centralized-file pattern / § Kind purity verdict=CONFIRMED
    wrong: `programDefinition`, `noticeDefinition`, and `aggregateDefinition` construct fresh `ProgramDefinition`, `Notice`, and `AggregateDefinition` values, copying every collection — value factories by the kind table's own definition — but they sit in `helpers.ts` under noun-phrase names. The rule requires value factories in `factories.ts`, and every exported function there to be named `create*`. `guides/program.md:303-305` describes all three as "Build a fresh …" and records no exception.
    repair: move all three to `/home/user/fleet/program/src/core/factories.ts` and rename to `createProgramDefinition`, `createNotice`, and `createAggregateDefinition`; update `guides/program.md:37,75,130-131,303-305,333-362,379-381,750-906` and the `NoticeInput`/`AggregateInput` doc text at `types.ts:32,43`. The same reasoning reaches `emptySums` (`helpers.ts:844`) and `emptyTallies` (`helpers.ts:889`), which build fresh zero records; move and rename those too, or rule them as internal leaves and keep them in `helpers.ts` under `{verb}{Noun}` names.

## s15-23

23. package=program file=`/home/user/fleet/program/src/core/helpers.ts:69` rule=`.claude/rules/architecture.md` § Wrapper test + `AGENTS.md` § Non-negotiable rules ("prefer native APIs") verdict=CONFIRMED
    wrong: `copyJSONValue` hand-rolls a recursive deep copy of a JSON tree, while the same package deep-copies with the platform's `structuredClone` at `programs/Program.ts:93` for the same purpose. `JSONValue` admits nothing `structuredClone` cannot copy, so the two are semantically identical over this domain — one concept with two implementations, one of which the TSDoc has to warn about stack exhaustion.
    repair: delete `copyJSONValue` and call `structuredClone` at its single source use (`helpers.ts:1015`), removing the guide row at `guides/program.md:278,333,350`. If the function is retained for a reason the guide should state, it is an ownership snapshot and belongs in `src/core/cloners.ts`, not `helpers.ts`.

## s15-24

24. package=program file=`/home/user/fleet/program/src/core/errors.ts:19` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
    wrong: `ProgramError`'s constructor is `(code, message, context?)` and cannot carry a `cause`, so `programs/Program.ts:96` and `programs/Program.ts:111` each reach around it with `Object.defineProperty(error, 'cause', …)`. The same workaround twice is the pattern the rule centralizes, and `/home/user/fleet/lsp/src/core/errors.ts:16-18` shows the correct shape in the same fleet — `super(message, cause === undefined ? undefined : { cause })`.
    repair: give `ProgramError` a `cause` parameter (or an options object matching `LSPErrorOptions`) and pass it through `super`; replace both `Object.defineProperty` blocks in `Program.ts` with a plain `throw new ProgramError('DEFINITION', …, context, cause)`.

## s15-25

25. package=program file=`/home/user/fleet/program/src/core/types.ts:17`, `constants.ts:8-14`, `validators.ts:65-71`, `helpers.ts:867-873` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: the five `Status` literals are written out four times — the union, `STATUS_PRECEDENCE`, `isStatus`'s `literalOf` arguments, and `completeTallies`'s object literal. Adding a sixth status compiles everywhere except `completeTallies`, which silently drops it from every tally record.
    repair: make the frozen list the single source — `export const STATUSES = ['ineligible','referral','conditional','unrated','eligible'] as const` in `constants.ts`, `export type Status = (typeof STATUSES)[number]` in `types.ts`, `isStatus = literalOf(...STATUSES)`, and build `completeTallies` by folding `STATUSES`. `STATUS_PRECEDENCE` then becomes `STATUSES` itself or an explicitly reordered projection of it.

## s15-26

26. package=program file=`/home/user/fleet/program/src/core/errors.ts:27-30` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `isProgramError` carries a single imperative line ("Narrow a caught value to a `ProgramError`.") with no `@param`, no `@returns`, and no `@example`, while every guard in the sibling `validators.ts` carries all three (for example `validators.ts:37-49`). `ProgramError` itself (line 3-14) has no `@example` and documents no constructor `@param`.
    repair: rewrite as "Checks whether a caught value is a `ProgramError`." plus `@param value`, `@returns True if …; false otherwise`, and an `@example`; add an `@example` and constructor `@param` rows to the class.

## s15-27

27. package=program file=`/home/user/fleet/program/src/core/helpers.ts:51,85,109,133,164,208,226,260,311,341,410,453,485,534,643,667,702,731,770,804,832,851,877,896,924,979,1020,1043`; `factories.ts:12,41`; `validators.ts:38,52,74,89,106,126,160,185,214,236,254,277,313,346`; `errors.ts:27` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: every exported symbol's TSDoc opens with a bare imperative ("Return", "Determine", "Assert", "Select", "Derive", "Map", "Resolve", "Convert", "Build", "Add", "Validate", "Coerce", "Fold", "Sum", "Partition", "Complete", "Assemble", "Create", "Narrow") instead of the required third-person `-s` form.
    repair: rewrite each first sentence — "Determines whether a value is a `Decision` literal.", "Builds a `ProgramDefinition`.", "Creates one compiled program over a qualifier and rater."

## s15-28

28. package=program file=`/home/user/fleet/program/src/core/types.ts:184-188` rule=`AGENTS.md` § Design laws (Derive state) verdict=EXEMPT
    wrong: `ProgramValidationResult.valid` is exactly `errors.length === 0` — `helpers.ts:562,639` construct it that way and nothing else can — so it is a stored fact derivable from a sibling field.
    repair: none. The shape matches the declared `@orkestrel/reason` `ReasonValidationResult` (`node_modules/@orkestrel/reason/dist/src/core/index.d.ts:2916` shows `{ valid, errors, warnings }`), and `validators.ts:348-352` documents the deliberate decision to declare this package's own interface with the same members so the contracts may evolve independently. Reusing the ecosystem's result shape is coherence, not drift. Recorded so the derivation is not re-raised.