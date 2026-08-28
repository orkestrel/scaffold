# Findings for group g15

Packages: all, ndjson, sse, tool, pool, budget, abort, emitter, timeout. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s18-01

1. package=all ten file=(list follows) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: TSDoc first sentences are written in the imperative rather than the required third-person `-s` verb form, systematically across all ten packages; a second variant states no verb at all. Representative lines: `abort/src/core/helpers.ts:6` ("Validate and normalize…"), `abort/src/core/helpers.ts:83` ("Link an own…"), `abort/src/core/validators.ts:2` ("Determine whether…"), `abort/src/core/factories.ts:5`, `abort/src/core/Abort.ts:36`; `emitter/src/core/helpers.ts:2`, `emitter/src/core/factories.ts:5`; `ndjson/src/core/types.ts:8`, `ndjson/src/core/types.ts:13`, `ndjson/src/core/factories.ts:5`; `timeout/src/core/helpers.ts:7`, `timeout/src/core/validators.ts:5`, `timeout/src/core/validators.ts:21`, `timeout/src/core/factories.ts:5`, `timeout/src/core/types.ts:44`, `timeout/src/core/types.ts:50`; `budget/src/core/helpers.ts:6`, `budget/src/core/helpers.ts:103`, `budget/src/core/validators.ts:5`, `budget/src/core/validators.ts:21`, `budget/src/core/validators.ts:43`, `budget/src/core/validators.ts:59`, `budget/src/core/factories.ts:14`, `budget/src/core/factories.ts:34`, `budget/src/core/factories.ts:99`, `budget/src/core/types.ts:52`, `budget/src/core/types.ts:58`, `budget/src/core/types.ts:65`; `pool/src/core/validators.ts:5`, `pool/src/core/validators.ts:20`, `pool/src/core/errors.ts:25`, `pool/src/core/errors.ts:50`, `pool/src/core/factories.ts:5`, `pool/src/core/types.ts:73`, `pool/src/core/types.ts:80`, `pool/src/core/types.ts:87`; `tool/src/core/validators.ts:5`, `tool/src/core/factories.ts:6`, `tool/src/core/factories.ts:27`, `tool/src/core/types.ts:87`, `tool/src/core/types.ts:135`, `tool/src/core/types.ts:142`, `tool/src/core/types.ts:149`, `tool/src/core/types.ts:156`, `tool/src/core/types.ts:162`, `tool/src/core/types.ts:172`, `tool/src/core/types.ts:179`, `tool/src/core/types.ts:186`, `tool/src/core/types.ts:193`, `tool/src/core/types.ts:200`; `sse/src/core/types.ts:61`, `sse/src/core/types.ts:70`, `sse/src/core/errors.ts:34`, `sse/src/core/factories.ts:5`; `sqlite/src/server/helpers.ts:14`, `sqlite/src/server/helpers.ts:47`, `sqlite/src/server/errors.ts:45`, `sqlite/src/server/factories.ts:5`, `sqlite/src/server/types.ts:127`, `sqlite/src/server/types.ts:134`, `sqlite/src/server/types.ts:136`; `ollama/src/server/errors.ts:38`, `ollama/src/server/factories.ts:6`.
   repair: Rewrite each listed first sentence in the third person — `Validates and normalizes`, `Links`, `Determines whether`, `Creates`, `Extracts`, `Registers`, `Executes`, `Removes`, `Converts`, `Normalizes`, `Checks whether`. This is one finding rather than ten because the repair is one uniform sweep; the per-package line lists make it individually dispatchable.

## s18-02

2. package=all ten except ndjson and abort's guards file=(list follows) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: A boolean `@returns` is written as "Whether the value is …" rather than the required "True if …; false otherwise" form: `pool/src/core/validators.ts:5`, `pool/src/core/validators.ts:21`, `pool/src/core/errors.ts:53`, `sqlite/src/server/errors.ts:48`, `ollama/src/server/errors.ts:41`, `tool/src/core/types.ts:188`, `tool/src/core/types.ts:196`.
   repair: Rewrite each as `True if …; false otherwise`.

## s18-03

3. package=ndjson file=`src/core/types.ts:14` (and `src/core/NDJSONParser.ts:46`) rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `reset()` drops the buffered partial line without destroying the entity, which is exactly the fixed meaning of `clear`; the rule names `reset` as a banned synonym.
   repair: Rename the method to `clear()` in `types.ts:14` and `NDJSONParser.ts:46`, and update the four `reset()` mentions in `guides/ndjson.md` (lines 15, 38, 45, 92) and the tests that call it.

## s18-04

4. package=sse file=`src/core/types.ts:89` (and `src/core/SSEParser.ts:147`) rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: Same banned synonym — `reset()` resets parser state without destroying the entity, which is `clear`.
   repair: Rename the public method to `clear()` at `types.ts:89` and `SSEParser.ts:147`; the private `#clear()` at `SSEParser.ts:250` then collides, so rename it `#drop()` (it discards the in-progress accumulator) and update its two call sites at `SSEParser.ts:152` and `SSEParser.ts:246`. Update `guides/sse.md` lines 12, 34, 119, 128, 145, 146, 156, 157, 170.

## s18-05

5. package=sse file=`src/core/types.ts:79` (and `src/core/SSEParser.ts:135`) rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly"), `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `flush(): SSEEvent[]` returns a mutable array from a public interface, while the sibling `parse` on the same interface correctly returns `readonly SSEEvent[]` (`types.ts:68`). A caller can mutate the returned array.
   repair: Change the return type to `readonly SSEEvent[]` at `types.ts:79` and `SSEParser.ts:135`; the local `events` accumulator inside `flush` stays `SSEEvent[]` and widens on return. Update the `flush` row in `guides/sse.md`.

## s18-06

6. package=tool file=`src/core/types.ts:196` (and `src/core/tools/ToolManager.ts:71-80`) rule=`.claude/rules/patterns.md` § Batch operations verdict=CONFIRMED
   wrong: `remove(names)` returns `true` when any named tool was present. The batch-operation contract states "An id list applies to those items and returns true only when all succeed." The implementation sets `removed = true` on the first success and never falsifies it.
   repair: In `ToolManager.ts:73-77` initialise `let removed = true` and set `removed = false` when `this.#tools.delete(name)` returns false. Change the `types.ts:196` `@returns` to "True if every named tool was present; false otherwise", and correct `guides/tool.md:107` and the `guides/tool.md:171` example comment ("any one removal counts").

## s18-16

16. package=tool file=`src/core/tools/ToolManager.ts:115-127` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test, case 2) verdict=CONFIRMED
    wrong: `#definition(tool)` reaches no `#` state and no sibling method. It is a pure whole-to-view projection, which the leaf test routes to an exported, tested helper. It is hidden and untestable where it sits.
    repair: Create `src/core/helpers.ts` with `export function toolToDefinition(tool: ToolInterface): ToolDefinition` (the `{noun}To{Noun}` projection form), call it from `ToolManager.ts:59`, add `export * from './helpers.js'` to `index.ts`, and add a unit test.

## s18-17

17. package=pool file=`src/core/types.ts:4` rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One concept — tearing down a pooled resource — carries two terms. The public option is `destroy` (`types.ts:57`), the event is `destroy` (`types.ts:33`), but the error code is `'cleanup'` (`types.ts:4`), the private field is `#cleanup` (`Pool.ts:29`), the error builder is `#cleanupError` (`Pool.ts:549`), and the prose alternates freely (`types.ts:10` "cleanup failures", `types.ts:32` "cleanup hook", `factories.ts:9` "every in-flight hook and cleanup").
    repair: Pick the fixed lifecycle verb. Rename the `PoolCode` member `'cleanup'` to `'teardown'` at `types.ts:4` (`'destroy'` would read too near the existing `'destroyed'` state code), rename `#cleanup` to `#destroy` at `Pool.ts:29`, `:70`, `:489`, rename `#cleanupError` to `#teardownError` at `Pool.ts:549`, `:522`, `:568`, and reword `types.ts:10`, `:32` to say "destroy".

## s18-18

18. package=pool file=`src/core/types.ts:73-78` (and `src/core/Pool.ts:57-61`) rule=`.claude/rules/typescript.md` § Comments and API documentation ("State a prerequisite and the failure behavior wherever the symbol has either") verdict=CONFIRMED
    wrong: `acquire` throws `PoolError` **synchronously** for a non-native signal (`Pool.ts:106-108`) while returning a `Promise` on every other path — a caller wrapping it in `.catch()` alone misses it — and no `@throws` documents that. The `Pool` constructor throws `PoolError({ code: 'invalid' })` for a bad `max` (`Pool.ts:64-66`) and its TSDoc at `Pool.ts:57-61` names no `@throws` either.
    repair: Add `@throws {@link PoolError}` with `code: 'invalid'` and the synchronous-throw note to `types.ts:73-78`, and add `@throws {@link PoolError}` for a non-positive-safe-integer `max` to `Pool.ts:57-61`.

## s18-19

19. package=budget file=`src/core/types.ts:21` rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs"), § Value-level identifiers verdict=CONFIRMED
    wrong: `BudgetOptions.consume` is a property named with a verb, and its verb names an action it does not perform — its own TSDoc at `types.ts:20` says it "Extract[s] the finite nonnegative charge". The identical term on the interface, `BudgetInterface.consume(value)` at `types.ts:63`, is the method that actually consumes. `budget.consume(v)` calling `options.consume(v)` and then adding the result makes the two meanings collide at the call site, and the class field concedes it by being named `#consumer` (`Budget.ts:33`).
    repair: Rename the option key to `charge` at `types.ts:21` (a noun for the value it extracts), and update `Budget.ts:33`, `:43`, `:76`, `helpers.ts:36`, `:41`, `:75-84`, `:96-99`, `factories.ts:25`, `:47`, `:124`, and `guides/budget.md`. `BudgetInterface.consume(value)` is unchanged.

## s18-20

20. package=budget file=`src/core/helpers.ts:121,141,153,163,173,183` rule=`.claude/rules/writing.md` § Claims and time ("Claim only what the reader can check") verdict=CONFIRMED
    wrong: `validateTokenBudgetOptions` is a barrelled public export, but every `ContractError` message it throws names a different function — `'createTokenBudget: options must be a plain record'` and five more. A consumer calling the exported validator directly gets an error attributing the failure to a function they did not call. Its sibling `validateBudgetOptions` in the same file correctly uses the entity prefix `'Budget: …'`.
    repair: Change the six message prefixes to `'TokenBudget: '` at `helpers.ts:121`, `:141`, `:153`, `:163`, `:173`, `:183`.

## s18-21

21. package=pool, timeout, budget file=`pool/src/core/validators.ts:29`, `timeout/src/core/validators.ts:37`, `budget/src/core/validators.ts:32` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is, not its implementation") verdict=CONFIRMED
    wrong: `isPoolSignal`, `isTimeoutSignal`, and `isBudgetSignal` each name a domain type that does not exist. Each guard's own `@returns` says it tests a native `AbortSignal` (`value is AbortSignal`), and there is no `PoolSignal`, `TimeoutSignal`, or `BudgetSignal` type anywhere in the three packages. `abort/src/core/validators.ts:21` names the identical guard honestly as `isAbortSignal`.
    repair: Rename each to `isAbortSignal` at its declaration and its call sites (`pool/src/core/Pool.ts:5`, `:106`; `timeout/src/core/helpers.ts:4`, `:75`; `budget/src/core/helpers.ts:3`, `:85`, `:182`), and update the surface tables in each guide. Note: this is **not** an ecosystem-reuse finding — I read `@orkestrel/contract`'s installed declaration and it exports no `AbortSignal` guard, and none of the three packages declares `@orkestrel/abort` as a runtime dependency, so reusing `abort`'s copy would require an unauthorized dependency.

## s18-22

22. package=ndjson file=`src/core/NDJSONParser.ts:50-52` rule=`.claude/rules/architecture.md` § Wrapper test, `.claude/rules/names.md` § Value-level identifiers verdict=CONFIRMED
    wrong: `#line(line)` is a one-line delegate whose entire body is `return parseJSONAs(line, isRecord)`. It adds no boundary, invariant, composition, or translation, and it is named with a noun where the rule fixes methods as verbs.
    repair: Delete `#line` and inline `parseJSONAs(line, isRecord)` at the single call site `NDJSONParser.ts:38`.

## s18-28

28. package=abort file=`src/core/factories.ts:24` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The `createAbort` `@example` imports from `@src/core` while the same package's `helpers.ts:101` and `validators.ts:15` examples import from `@orkestrel/abort`. One package publishes two contradictory import conventions in its own declarations.
    repair: Change `@src/core` to `@orkestrel/abort` at `factories.ts:24`. (The `@src/*` examples in `emitter/src/core/helpers.ts:16`, `emitter/src/core/factories.ts:19`, and `sse/src/core/errors.ts:41`, `sse/src/core/factories.ts:27` are recorded as EXEMPT in finding 40 — those packages are internally consistent and the rule reserves the alias "for source/tests".)

## s18-29

29. package=emitter, sqlite, sse, ollama file=(list follows) rule=`AGENTS.md` § Writing ("NEVER name a list item by its position. Write the item's name, never its ordinal or its number"), `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: Published TSDoc and source comments cite numbered sections of an internal instructions document that has no numbered sections, plus roadmap and design-note identifiers a consumer cannot resolve — `AGENTS §2`, `§5`, `§8`, `§12`, `§13`, `§14`, `§21`, `H4`, `Chunk 3`, `deployment scenario S2`. Exact sites: `emitter/src/core/types.ts:8`, `:21`, `:32`, `:41`; `emitter/src/core/Emitter.ts:14`, `:55`, `:59`, `:170`, `:187`; `emitter/src/core/factories.ts:5`, `:9`; `sqlite/src/server/types.ts:8`, `:11`, `:6-7` ("Chunk 3"), `:95` ("Chunk 3"); `sqlite/src/server/SQLiteStatement.ts:30`; `sqlite/src/server/errors.ts:9`; `sqlite/src/server/constants.ts:1`; `sqlite/src/server/helpers.ts:9`; `sse/src/core/errors.ts:3`; `ollama/src/server/errors.ts:4`; `ollama/src/server/constants.ts:1`, `:25`; `ollama/src/server/OllamaProvider.ts:35`, `:44`, `:95`, `:179`, `:206`, `:339`, `:358`, `:493`; `ollama/src/server/factories.ts:46`.
    repair: Delete each citation. Where the sentence needs the rule it cites, state the rule itself — "a listener throw is routed to the `error` handler, never rethrown", "every wire value arrives as `unknown` and is narrowed through guards" — which is what the surrounding prose already says in every one of these cases.

## s18-35

35. package=sse file=`src/core/errors.ts:21` rule=`.claude/rules/architecture.md` § Barrel exports ("A row obliges a documented, runnable example"), `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `SSEError` is barrelled (`index.ts:3`) and is thrown at a consumer, but its class TSDoc carries no `@example` and its constructor at `errors.ts:25` carries no `@param` for `code`, `message`, or `context`. `pool/src/core/errors.ts:6` and `sqlite/src/server/errors.ts:21` both do carry one, so this is drift rather than a package convention.
    repair: Add an `@example` showing a `catch` narrowed with `isSSEError` on `error.code === 'OVERFLOW'`, and add the three `@param` tags at `errors.ts:25`.

## s18-36

36. package=abort file=`src/core/types.ts:22-27` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `AbortInterface`'s members carry no TSDoc: `id` (23), `signal` (24), `aborted` (25), and `abort(reason?)` (26) have no descriptions and `abort` has no `@param` documenting that a defined reason is kept verbatim while `undefined` defaults to an `AbortError`. `AbortOptions` documents its members (`types.ts:11`) and `timeout` and `budget` document every interface member, so this is drift within the same fleet convention.
    repair: Add a one-line description to each member and a `@param reason` to `abort` at `types.ts:26`, stating the defined-reason and `undefined`-default behavior the class TSDoc at `Abort.ts:10-13` already describes.

## s18-37

37. package=emitter file=`src/core/types.ts:44-53` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `EmitterInterface`'s members carry no TSDoc at all — `destroyed`, `on`, `once`, `off`, `emit`, `count`, `clear`, `destroy` — so no `@param` documents that `count(event?)` and `clear(event?)` apply to all events when the argument is omitted, and nothing documents that `on`/`once`/`emit` become no-ops after `destroy()`. That behavior exists only in the class `@remarks` at `Emitter.ts:30-32`.
    repair: Document each member on the interface, giving `count` and `clear` an explicit `@param event - The event to read or clear. Omit to apply to every event.`

## s18-38

38. package=ndjson file=`src/core/types.ts:12` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `parse(chunk)` is the package's entire public behavior and its TSDoc carries no `@param` and no `@returns`; `reset()` at `types.ts:14` carries neither a `@returns` nor a note that it never throws. The class's `parse` at `NDJSONParser.ts:31` has no TSDoc at all.
    repair: Add `@param chunk` and `@returns` to `types.ts:8-11`, and a `@returns Nothing` to `types.ts:13`, matching the form `timeout/src/core/types.ts:43-54` uses.

## Exempt

## s18-39

39. package=timeout file=`src/core/types.ts:19` rule=`.claude/rules/names.md` § Rejected naming (abbreviations) verdict=EXEMPT
    `ms` is an abbreviation, but `.claude/rules/patterns.md` § Options explicitly permits a short option key explained in TSDoc `@remarks` rather than through a longer name, and `types.ts:5-8` supplies that explanation. `TimeoutInterface.ms` at `types.ts:38` mirrors the option key and inherits the exemption.

## s18-40

40. package=emitter, sse file=`emitter/src/core/helpers.ts:16`, `emitter/src/core/factories.ts:19`, `sse/src/core/errors.ts:41`, `sse/src/core/factories.ts:27` rule=`.claude/rules/documentation.md` § Guide examples verdict=EXEMPT
    These `@example` fences import from `@src/core`. The rule bans the alias in *guide* examples and reserves it "for source/tests"; a TSDoc example lives in source, and both packages use the alias consistently across every file. Recorded rather than dropped because the alias does not resolve for a consumer reading the published `.d.ts`. Contrast finding 28, where `abort` mixes both conventions inside one package, and finding 27, where `ollama` names a specifier that is wrong under either reading.