## Coverage

Read every `src/**/*.ts` file in all ten packages — 60 files, no skips. Also read each package's `guides/<package>.md` and `package.json` dependency block as evidence about `src/`, and the installed `@orkestrel/contract` declaration (`/home/user/fleet/timeout/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`) to test the ecosystem-reuse question.

- **abort** (6): `types.ts`, `Abort.ts`, `helpers.ts`, `validators.ts`, `factories.ts`, `index.ts`
- **emitter** (5): `types.ts`, `Emitter.ts`, `helpers.ts`, `factories.ts`, `index.ts`
- **ndjson** (4): `types.ts`, `NDJSONParser.ts`, `factories.ts`, `index.ts`
- **timeout** (7): `types.ts`, `Timeout.ts`, `helpers.ts`, `validators.ts`, `constants.ts`, `factories.ts`, `index.ts`
- **budget** (6): `types.ts`, `Budget.ts`, `helpers.ts`, `validators.ts`, `factories.ts`, `index.ts`
- **pool** (6): `types.ts`, `Pool.ts`, `validators.ts`, `errors.ts`, `factories.ts`, `index.ts`
- **tool** (6): `types.ts`, `tools/Tool.ts`, `tools/ToolManager.ts`, `validators.ts`, `factories.ts`, `index.ts`
- **sse** (6): `types.ts`, `SSEParser.ts`, `constants.ts`, `errors.ts`, `factories.ts`, `index.ts`
- **sqlite** (8): `types.ts`, `SQLiteDatabase.ts`, `SQLiteStatement.ts`, `helpers.ts`, `constants.ts`, `errors.ts`, `factories.ts`, `index.ts`
- **ollama** (6): `types.ts`, `OllamaProvider.ts`, `constants.ts`, `errors.ts`, `factories.ts`, `index.ts`

Out of scope and not read as subjects: every `tests/`, `configs/`, root file.

## Findings

1. package=all ten file=(list follows) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: TSDoc first sentences are written in the imperative rather than the required third-person `-s` verb form, systematically across all ten packages; a second variant states no verb at all. Representative lines: `abort/src/core/helpers.ts:6` ("Validate and normalize…"), `abort/src/core/helpers.ts:83` ("Link an own…"), `abort/src/core/validators.ts:2` ("Determine whether…"), `abort/src/core/factories.ts:5`, `abort/src/core/Abort.ts:36`; `emitter/src/core/helpers.ts:2`, `emitter/src/core/factories.ts:5`; `ndjson/src/core/types.ts:8`, `ndjson/src/core/types.ts:13`, `ndjson/src/core/factories.ts:5`; `timeout/src/core/helpers.ts:7`, `timeout/src/core/validators.ts:5`, `timeout/src/core/validators.ts:21`, `timeout/src/core/factories.ts:5`, `timeout/src/core/types.ts:44`, `timeout/src/core/types.ts:50`; `budget/src/core/helpers.ts:6`, `budget/src/core/helpers.ts:103`, `budget/src/core/validators.ts:5`, `budget/src/core/validators.ts:21`, `budget/src/core/validators.ts:43`, `budget/src/core/validators.ts:59`, `budget/src/core/factories.ts:14`, `budget/src/core/factories.ts:34`, `budget/src/core/factories.ts:99`, `budget/src/core/types.ts:52`, `budget/src/core/types.ts:58`, `budget/src/core/types.ts:65`; `pool/src/core/validators.ts:5`, `pool/src/core/validators.ts:20`, `pool/src/core/errors.ts:25`, `pool/src/core/errors.ts:50`, `pool/src/core/factories.ts:5`, `pool/src/core/types.ts:73`, `pool/src/core/types.ts:80`, `pool/src/core/types.ts:87`; `tool/src/core/validators.ts:5`, `tool/src/core/factories.ts:6`, `tool/src/core/factories.ts:27`, `tool/src/core/types.ts:87`, `tool/src/core/types.ts:135`, `tool/src/core/types.ts:142`, `tool/src/core/types.ts:149`, `tool/src/core/types.ts:156`, `tool/src/core/types.ts:162`, `tool/src/core/types.ts:172`, `tool/src/core/types.ts:179`, `tool/src/core/types.ts:186`, `tool/src/core/types.ts:193`, `tool/src/core/types.ts:200`; `sse/src/core/types.ts:61`, `sse/src/core/types.ts:70`, `sse/src/core/errors.ts:34`, `sse/src/core/factories.ts:5`; `sqlite/src/server/helpers.ts:14`, `sqlite/src/server/helpers.ts:47`, `sqlite/src/server/errors.ts:45`, `sqlite/src/server/factories.ts:5`, `sqlite/src/server/types.ts:127`, `sqlite/src/server/types.ts:134`, `sqlite/src/server/types.ts:136`; `ollama/src/server/errors.ts:38`, `ollama/src/server/factories.ts:6`.
   repair: Rewrite each listed first sentence in the third person — `Validates and normalizes`, `Links`, `Determines whether`, `Creates`, `Extracts`, `Registers`, `Executes`, `Removes`, `Converts`, `Normalizes`, `Checks whether`. This is one finding rather than ten because the repair is one uniform sweep; the per-package line lists make it individually dispatchable.

2. package=all ten except ndjson and abort's guards file=(list follows) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: A boolean `@returns` is written as "Whether the value is …" rather than the required "True if …; false otherwise" form: `pool/src/core/validators.ts:5`, `pool/src/core/validators.ts:21`, `pool/src/core/errors.ts:53`, `sqlite/src/server/errors.ts:48`, `ollama/src/server/errors.ts:41`, `tool/src/core/types.ts:188`, `tool/src/core/types.ts:196`.
   repair: Rewrite each as `True if …; false otherwise`.

3. package=ndjson file=`src/core/types.ts:14` (and `src/core/NDJSONParser.ts:46`) rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `reset()` drops the buffered partial line without destroying the entity, which is exactly the fixed meaning of `clear`; the rule names `reset` as a banned synonym.
   repair: Rename the method to `clear()` in `types.ts:14` and `NDJSONParser.ts:46`, and update the four `reset()` mentions in `guides/ndjson.md` (lines 15, 38, 45, 92) and the tests that call it.

4. package=sse file=`src/core/types.ts:89` (and `src/core/SSEParser.ts:147`) rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: Same banned synonym — `reset()` resets parser state without destroying the entity, which is `clear`.
   repair: Rename the public method to `clear()` at `types.ts:89` and `SSEParser.ts:147`; the private `#clear()` at `SSEParser.ts:250` then collides, so rename it `#drop()` (it discards the in-progress accumulator) and update its two call sites at `SSEParser.ts:152` and `SSEParser.ts:246`. Update `guides/sse.md` lines 12, 34, 119, 128, 145, 146, 156, 157, 170.

5. package=sse file=`src/core/types.ts:79` (and `src/core/SSEParser.ts:135`) rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly"), `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `flush(): SSEEvent[]` returns a mutable array from a public interface, while the sibling `parse` on the same interface correctly returns `readonly SSEEvent[]` (`types.ts:68`). A caller can mutate the returned array.
   repair: Change the return type to `readonly SSEEvent[]` at `types.ts:79` and `SSEParser.ts:135`; the local `events` accumulator inside `flush` stays `SSEEvent[]` and widens on return. Update the `flush` row in `guides/sse.md`.

6. package=tool file=`src/core/types.ts:196` (and `src/core/tools/ToolManager.ts:71-80`) rule=`.claude/rules/patterns.md` § Batch operations verdict=CONFIRMED
   wrong: `remove(names)` returns `true` when any named tool was present. The batch-operation contract states "An id list applies to those items and returns true only when all succeed." The implementation sets `removed = true` on the first success and never falsifies it.
   repair: In `ToolManager.ts:73-77` initialise `let removed = true` and set `removed = false` when `this.#tools.delete(name)` returns false. Change the `types.ts:196` `@returns` to "True if every named tool was present; false otherwise", and correct `guides/tool.md:107` and the `guides/tool.md:171` example comment ("any one removal counts").

7. package=ollama file=`src/server/OllamaProvider.ts:341,416,437,457,467,476,484,494,518` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test), `AGENTS.md` § Design laws ("Export and test reusable logic") verdict=CONFIRMED
   wrong: Nine methods reach no `#` state and no instance context — `#parseBody` (341), `#plain` (416), `#result` (437), `#content` (457), `#thinking` (467), `#thought` (476), `#usage` (484), `#tools` (494), `#arguments` (518). Each is a pure projection or conversion, which the leaf test routes to an exported helper. The package has no `helpers.ts` at all, so this wire-narrowing logic — the package's highest-risk code — is untestable except through a live daemon. The comment at `OllamaProvider.ts:262-265` shows the leaf test was applied to `#deltas` (correctly kept a method, since it calls siblings and mutates the accumulator) and not to these.
   repair: Create `src/server/helpers.ts` and move the nine as `{verb}{Noun}` exports — `readBody`, `plainMessages`, `assembleResult`, `wireContent`, `wireThinking`, `joinThinking`, `wireUsage`, `wireTools`, `wireArguments`. Add `export * from './helpers.js'` to `src/server/index.ts:1`, keep `#body`, `#requestHeaders`, `#fetch`, and `#deltas` as methods (they read `#` fields or call siblings), and add unit tests for each helper.

8. package=ollama file=`src/server/types.ts:134` rule=`AGENTS.md` § Design laws ("One concept, one term"), `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
   wrong: `OllamaOptions.format` (prompt-context framing) and `WireChatRequest.format` (the `/api/chat` structured-output schema) are two unrelated concepts under one term. The package spends four long disambiguation passages defending the collision — `types.ts:60-66`, `types.ts:126-133`, `OllamaProvider.ts:104-109`, `OllamaProvider.ts:122-126`, `OllamaProvider.ts:372-373`, `factories.ts:27-29` — which is the evidence the term is not earning its place. The wire field's name is fixed by Ollama; this package's own option key is not.
   repair: Rename `OllamaOptions.format` to `framing` at `types.ts:134`, and update `OllamaProvider.ts:82`, `:110`, `:130` (the getter satisfies `ProviderInterface.format`, so keep the public getter named `format` and read `#framing`), plus `factories.ts:23-32` and `guides/ollama.md`. Delete every "the two are unrelated despite the shared word" passage the rename makes unnecessary.

9. package=ollama file=`src/server/types.ts:91` rule=`.claude/rules/names.md` § Entity-scoped names, `.claude/rules/patterns.md` § Options verdict=CONFIRMED
   wrong: `keepAlive` is a two-word ungrouped option key; the rule fixes ungrouped option keys at one word. The wire's `keep_alive` is external and stays, but this package's own option key is its own API.
   repair: Rename the option to `residency` at `types.ts:91`, and update `OllamaProvider.ts:76`, `:87`, `constants.ts:7` (`DEFAULT_KEEP_ALIVE` → `DEFAULT_RESIDENCY`), `factories.ts:11`, `factories.ts:32`, and `guides/ollama.md`. The wire field `WireChatRequest.keep_alive` at `types.ts:49` is unchanged.

10. package=sqlite file=`src/server/types.ts:70` rule=`.claude/rules/names.md` § Entity-scoped names, `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `foreignKeys` is a two-word ungrouped option key. Its four siblings (`path`, `readonly`, `timeout`, `bigints`) are all one word, so the flat bag is the right shape and only this key breaks it.
    repair: Rename to `constraints` at `types.ts:70` (it is a boolean asserting foreign-key constraint enforcement) and update `SQLiteDatabase.ts:34`, `:42`, `:63`, the `types.ts:58-60` remark, `guides/sqlite.md:14`, `:60`, `:202`, `:212`, `:275`.

11. package=sqlite file=`src/server/types.ts:123` (and `src/server/SQLiteDatabase.ts:79`) rule=`.claude/rules/names.md` § Rejected naming (abbreviations), § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `exec` is an abbreviation of `execute`, and `execute` is a fixed lifecycle verb with the exact meaning this method has ("Run primary work to completion"). The rule bans abbreviations by name and fixes the full verb's meaning.
    repair: Rename to `execute(sql)` at `types.ts:123` and `SQLiteDatabase.ts:79`, update the internal call sites `SQLiteDatabase.ts:134`, `:138`, `:142`, `:148`, `:149`, the `factories.ts:22` example, and `guides/sqlite.md:12`, `:120`, `:226`, `:253`.

12. package=sqlite file=`src/server/types.ts:125` (and `src/server/SQLiteDatabase.ts:100`) rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs"), § Value-level identifiers verdict=CONFIRMED
    wrong: `transaction<R>(scope)` is a noun naming a method that runs work. It is not an accessor, so the manager-accessor noun form does not cover it.
    repair: Rename to `transact<R>(scope)` at `types.ts:125` and `SQLiteDatabase.ts:100`, and update `SQLiteDatabase.ts:126`, `types.ts:107-113`, `guides/sqlite.md:108`, `:109`, `:147`, `:157`, `:268`, `:269`.

13. package=sqlite file=`src/server/index.ts:7` rule=`.claude/rules/architecture.md` § Barrel exports verdict=CONFIRMED
    wrong: `SQLiteStatement` is barrelled but no consumer can construct it: its constructor requires a native `StatementSync` and a `closed` callback that only `SQLiteDatabase.prepare` produces (`SQLiteDatabase.ts:94`), and the class's own TSDoc at `SQLiteStatement.ts:16-17` says the second parameter "is not part of the documented surface". The rule interns exactly this case, and the class carries no `@example`, which a barrel row obliges.
    repair: Delete `export * from './SQLiteStatement.js'` from `index.ts:7`, add `SQLiteStatement` to the package's parity `INTERNAL` list, and remove its row from the surface table at `guides/sqlite.md:33`. `SQLiteStatementInterface` stays barrelled — it is named in `prepare`'s public signature.

14. package=sqlite file=`src/server/SQLiteDatabase.ts:124` (and `src/server/types.ts:45`) rule=`.claude/rules/typescript.md` § Errors and outcomes ("Error classes expose a machine-readable `code`") verdict=CONFIRMED
    wrong: Passing an async scope to `transaction` is a programmer error with a precise cause, but it throws `SQLiteError('UNKNOWN', …)`. `'UNKNOWN'` is the fallback for a native fault this package could not map, so a `catch` cannot tell the two apart and must fall back to parsing the message — the exact failure the code member exists to prevent. `guides/sqlite.md:109` and `:269` document the current code, so both carry the drift.
    repair: Add `'SCOPE'` to `SQLiteErrorCode` at `types.ts:45`, throw it at `SQLiteDatabase.ts:124`, and update the `types.ts:38-44` remark plus `guides/sqlite.md:109` and `:269`.

15. package=sqlite file=`src/server/helpers.ts:59-63` rule=`.claude/rules/architecture.md` § Centralized-file pattern, `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `bindParameters` is a barrelled public export whose return type is an anonymous union declared inline in the signature. A public function's return type is a public type and belongs in `types.ts`; a consumer cannot name it to hold the result.
    repair: Declare `export type SQLiteBinding = { readonly positional: readonly SQLiteValue[] } | { readonly named: Readonly<Record<string, SQLiteValue>> }` in `types.ts`, annotate `bindParameters` with it at `helpers.ts:61-63`, and add the row to the surface table in `guides/sqlite.md`.

16. package=tool file=`src/core/tools/ToolManager.ts:115-127` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test, case 2) verdict=CONFIRMED
    wrong: `#definition(tool)` reaches no `#` state and no sibling method. It is a pure whole-to-view projection, which the leaf test routes to an exported, tested helper. It is hidden and untestable where it sits.
    repair: Create `src/core/helpers.ts` with `export function toolToDefinition(tool: ToolInterface): ToolDefinition` (the `{noun}To{Noun}` projection form), call it from `ToolManager.ts:59`, add `export * from './helpers.js'` to `index.ts`, and add a unit test.

17. package=pool file=`src/core/types.ts:4` rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One concept — tearing down a pooled resource — carries two terms. The public option is `destroy` (`types.ts:57`), the event is `destroy` (`types.ts:33`), but the error code is `'cleanup'` (`types.ts:4`), the private field is `#cleanup` (`Pool.ts:29`), the error builder is `#cleanupError` (`Pool.ts:549`), and the prose alternates freely (`types.ts:10` "cleanup failures", `types.ts:32` "cleanup hook", `factories.ts:9` "every in-flight hook and cleanup").
    repair: Pick the fixed lifecycle verb. Rename the `PoolCode` member `'cleanup'` to `'teardown'` at `types.ts:4` (`'destroy'` would read too near the existing `'destroyed'` state code), rename `#cleanup` to `#destroy` at `Pool.ts:29`, `:70`, `:489`, rename `#cleanupError` to `#teardownError` at `Pool.ts:549`, `:522`, `:568`, and reword `types.ts:10`, `:32` to say "destroy".

18. package=pool file=`src/core/types.ts:73-78` (and `src/core/Pool.ts:57-61`) rule=`.claude/rules/typescript.md` § Comments and API documentation ("State a prerequisite and the failure behavior wherever the symbol has either") verdict=CONFIRMED
    wrong: `acquire` throws `PoolError` **synchronously** for a non-native signal (`Pool.ts:106-108`) while returning a `Promise` on every other path — a caller wrapping it in `.catch()` alone misses it — and no `@throws` documents that. The `Pool` constructor throws `PoolError({ code: 'invalid' })` for a bad `max` (`Pool.ts:64-66`) and its TSDoc at `Pool.ts:57-61` names no `@throws` either.
    repair: Add `@throws {@link PoolError}` with `code: 'invalid'` and the synchronous-throw note to `types.ts:73-78`, and add `@throws {@link PoolError}` for a non-positive-safe-integer `max` to `Pool.ts:57-61`.

19. package=budget file=`src/core/types.ts:21` rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs"), § Value-level identifiers verdict=CONFIRMED
    wrong: `BudgetOptions.consume` is a property named with a verb, and its verb names an action it does not perform — its own TSDoc at `types.ts:20` says it "Extract[s] the finite nonnegative charge". The identical term on the interface, `BudgetInterface.consume(value)` at `types.ts:63`, is the method that actually consumes. `budget.consume(v)` calling `options.consume(v)` and then adding the result makes the two meanings collide at the call site, and the class field concedes it by being named `#consumer` (`Budget.ts:33`).
    repair: Rename the option key to `charge` at `types.ts:21` (a noun for the value it extracts), and update `Budget.ts:33`, `:43`, `:76`, `helpers.ts:36`, `:41`, `:75-84`, `:96-99`, `factories.ts:25`, `:47`, `:124`, and `guides/budget.md`. `BudgetInterface.consume(value)` is unchanged.

20. package=budget file=`src/core/helpers.ts:121,141,153,163,173,183` rule=`.claude/rules/writing.md` § Claims and time ("Claim only what the reader can check") verdict=CONFIRMED
    wrong: `validateTokenBudgetOptions` is a barrelled public export, but every `ContractError` message it throws names a different function — `'createTokenBudget: options must be a plain record'` and five more. A consumer calling the exported validator directly gets an error attributing the failure to a function they did not call. Its sibling `validateBudgetOptions` in the same file correctly uses the entity prefix `'Budget: …'`.
    repair: Change the six message prefixes to `'TokenBudget: '` at `helpers.ts:121`, `:141`, `:153`, `:163`, `:173`, `:183`.

21. package=pool, timeout, budget file=`pool/src/core/validators.ts:29`, `timeout/src/core/validators.ts:37`, `budget/src/core/validators.ts:32` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is, not its implementation") verdict=CONFIRMED
    wrong: `isPoolSignal`, `isTimeoutSignal`, and `isBudgetSignal` each name a domain type that does not exist. Each guard's own `@returns` says it tests a native `AbortSignal` (`value is AbortSignal`), and there is no `PoolSignal`, `TimeoutSignal`, or `BudgetSignal` type anywhere in the three packages. `abort/src/core/validators.ts:21` names the identical guard honestly as `isAbortSignal`.
    repair: Rename each to `isAbortSignal` at its declaration and its call sites (`pool/src/core/Pool.ts:5`, `:106`; `timeout/src/core/helpers.ts:4`, `:75`; `budget/src/core/helpers.ts:3`, `:85`, `:182`), and update the surface tables in each guide. Note: this is **not** an ecosystem-reuse finding — I read `@orkestrel/contract`'s installed declaration and it exports no `AbortSignal` guard, and none of the three packages declares `@orkestrel/abort` as a runtime dependency, so reusing `abort`'s copy would require an unauthorized dependency.

22. package=ndjson file=`src/core/NDJSONParser.ts:50-52` rule=`.claude/rules/architecture.md` § Wrapper test, `.claude/rules/names.md` § Value-level identifiers verdict=CONFIRMED
    wrong: `#line(line)` is a one-line delegate whose entire body is `return parseJSONAs(line, isRecord)`. It adds no boundary, invariant, composition, or translation, and it is named with a noun where the rule fixes methods as verbs.
    repair: Delete `#line` and inline `parseJSONAs(line, isRecord)` at the single call site `NDJSONParser.ts:38`.

23. package=ollama file=`src/server/OllamaProvider.ts:190-195` and `:266-273` rule=`.claude/rules/typescript.md` § Types, `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The per-stream accumulator's shape is written out as an anonymous inline object type in two places, character for character. It is reusable by demonstration and has no home in `types.ts`. A third inline duplication sits at `OllamaProvider.ts:393-400`, restating `WireChatRequest['tools'][number]`.
    repair: Declare `export interface OllamaStream { readonly splitter: ThinkSplitterInterface; wired: string; readonly calls: ToolCall[]; usage: TokenUsage | undefined }` in `types.ts` and reference it at both sites; at `OllamaProvider.ts:393-400` annotate the map callback with `WireChatRequest['tools'] extends readonly (infer E)[] ? E : never`, or extract the tool entry to its own named type in `types.ts` and index `WireChatRequest.tools` off it.

24. package=ollama file=`src/server/types.ts:122` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") verdict=CONFIRMED
    wrong: The `headers` hook is typed `() => Record<string, string> | Promise<Record<string, string>>`, a mutable record, while every other record in the same interface is `Readonly<Record<…>>` (`types.ts:95`, `:43`, `:51`, `:57`, `:66`).
    repair: Change to `readonly headers?: () => Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>` at `types.ts:122`. `OllamaProvider.#requestHeaders` at `:363` reads it through `Object.entries` and needs no change.

25. package=ollama file=`src/server/OllamaProvider.ts:134` and `:158` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `generate` and `stream` are the entire public behavior of a barrelled class and carry no TSDoc at all — no description, no `@param` for `messages`/`signal`/`tools`/`options`, no `@returns`, and no `@throws` for the `ProviderAbortError`-carrying-a-partial-result contract or `OllamaHTTPError`. That contract exists only as prose inside the class-level `@remarks`.
    repair: Add complete TSDoc to both methods, including `@throws {@link import('@orkestrel/agent').ProviderAbortError}` on `stream` naming the partial-result payload, and `@throws {@link OllamaHTTPError}` on both.

26. package=ollama file=`src/server/types.ts:18` (and `src/server/index.ts:1`) rule=`.claude/rules/names.md` § General vocabulary, `.claude/rules/architecture.md` § Barrel exports verdict=CONFIRMED
    wrong: Two problems at one site. `OllamaResponse` is named for one of its three members — it carries a `Response`, a `TimeoutInterface`, and an `AbortSignal`, so `response.response` reads as a stutter and the container's name claims to be the thing it holds. Separately, `types.ts:9` calls it "the internal wire-shape" and `types.ts:26` calls `WireChatRequest` "the internal typed wire contract", yet `index.ts:1` star-exports `types.ts`, so both are public. The rule permits no third state: a declaration is public or it is a true runtime-private detail.
    repair: Rename `OllamaResponse` to `OllamaCall` (the handles bounding one live call) at `types.ts:18` and `OllamaProvider.ts:12`, `:297`. Then delete the word "internal" from `types.ts:9` and `types.ts:26` and document both as the supported types they are, since neither can leave `types.ts` without breaking the type-placement rule.

27. package=ollama file=`src/server/factories.ts:38` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The published `@example` tells a consumer `import { createOllama } from '@src/server'`. `package.json:29-32` publishes this surface at the root specifier, so the working import is `@orkestrel/ollama`. The alias resolves for nobody outside the repository, and the sibling example line `factories.ts:37` correctly uses `@orkestrel/abort`.
    repair: Change `@src/server` to `@orkestrel/ollama` at `factories.ts:38`.

28. package=abort file=`src/core/factories.ts:24` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The `createAbort` `@example` imports from `@src/core` while the same package's `helpers.ts:101` and `validators.ts:15` examples import from `@orkestrel/abort`. One package publishes two contradictory import conventions in its own declarations.
    repair: Change `@src/core` to `@orkestrel/abort` at `factories.ts:24`. (The `@src/*` examples in `emitter/src/core/helpers.ts:16`, `emitter/src/core/factories.ts:19`, and `sse/src/core/errors.ts:41`, `sse/src/core/factories.ts:27` are recorded as EXEMPT in finding 40 — those packages are internally consistent and the rule reserves the alias "for source/tests".)

29. package=emitter, sqlite, sse, ollama file=(list follows) rule=`AGENTS.md` § Writing ("NEVER name a list item by its position. Write the item's name, never its ordinal or its number"), `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: Published TSDoc and source comments cite numbered sections of an internal instructions document that has no numbered sections, plus roadmap and design-note identifiers a consumer cannot resolve — `AGENTS §2`, `§5`, `§8`, `§12`, `§13`, `§14`, `§21`, `H4`, `Chunk 3`, `deployment scenario S2`. Exact sites: `emitter/src/core/types.ts:8`, `:21`, `:32`, `:41`; `emitter/src/core/Emitter.ts:14`, `:55`, `:59`, `:170`, `:187`; `emitter/src/core/factories.ts:5`, `:9`; `sqlite/src/server/types.ts:8`, `:11`, `:6-7` ("Chunk 3"), `:95` ("Chunk 3"); `sqlite/src/server/SQLiteStatement.ts:30`; `sqlite/src/server/errors.ts:9`; `sqlite/src/server/constants.ts:1`; `sqlite/src/server/helpers.ts:9`; `sse/src/core/errors.ts:3`; `ollama/src/server/errors.ts:4`; `ollama/src/server/constants.ts:1`, `:25`; `ollama/src/server/OllamaProvider.ts:35`, `:44`, `:95`, `:179`, `:206`, `:339`, `:358`, `:493`; `ollama/src/server/factories.ts:46`.
    repair: Delete each citation. Where the sentence needs the rule it cites, state the rule itself — "a listener throw is routed to the `error` handler, never rethrown", "every wire value arrives as `unknown` and is narrowed through guards" — which is what the surrounding prose already says in every one of these cases.

30. package=sqlite file=`src/server/types.ts:131` rule=`.claude/rules/documentation.md` § Parity, `.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: The `begin()` TSDoc points a consumer at `guides/src/sqlite.md`. The guide is at `guides/sqlite.md`; `guides/src/` does not exist in this checkout.
    repair: Correct the path to `guides/sqlite.md` at `types.ts:131`.

31. package=sqlite file=`src/server/errors.ts:6` rule=`.claude/rules/writing.md` § Claims and time ("Claim only what the reader can check") verdict=CONFIRMED
    wrong: Published declarations compare this package to "the IndexedDB wrapper" — `errors.ts:6` ("Mirrors the IndexedDB wrapper's `IndexedDBError`"), `types.ts:5-7` ("the same discipline as the IndexedDB wrapper"), `types.ts:76` ("exactly as the IndexedDB wrapper does"). `package.json` declares no such dependency and the consumer has no way to resolve the reference; the comparison also carries no instruction if they could.
    repair: Delete the three comparisons. Each sentence stands without it.

32. package=ollama file=`src/server/OllamaProvider.ts:61` rule=`.claude/rules/writing.md` § Claims and time, `AGENTS.md` § Design laws ("No compatibility shims. This is greenfield") verdict=CONFIRMED
    wrong: Shipped prose narrates a migration instead of describing what exists: `OllamaProvider.ts:61` "Both omitted ⇒ today's behaviour", `:99` "so today's behaviour is byte-identical", `:371` "byte-for-byte the prior behaviour", `factories.ts:21` "Both omitted ⇒ today's behaviour". Two further passages justify a default by backward compatibility — `OllamaProvider.ts:90-91` and `types.ts:101-102` "so a general-purpose provider is backward-compatible" — a rationale a greenfield package does not have. `types.ts:131` writes "which this provider does not currently send"; `currently` is on the substitution table.
    repair: Replace each with the present-tense fact — "Both omitted ⇒ the global `fetch` and only a JSON content type", "The default is `false` so a non-thinking model needs no configuration", "which this provider does not send".

33. package=ollama file=`src/server/factories.ts:24` rule=`.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: The `@remarks` contains `(see [agents.md]; beaten by …)`, a Markdown reference link with no definition. It renders literally as `[agents.md]` in a consumer's editor and points at nothing.
    repair: Replace with a resolvable phrase introduced by `see`, or delete the parenthetical — the clause after it already states the cascade order.

34. package=ollama file=`src/server/errors.ts:30` rule=`.claude/rules/typescript.md` § Types, `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: The `OllamaHTTPError` constructor declares `options?: { readonly cause?: unknown }` inline. That is the built-in `ErrorOptions` type restated, and it types a public constructor parameter with an anonymous shape a consumer cannot name.
    repair: Change the parameter to `options?: ErrorOptions` at `errors.ts:30`. `super(message, options)` at `:31` is unchanged.

35. package=sse file=`src/core/errors.ts:21` rule=`.claude/rules/architecture.md` § Barrel exports ("A row obliges a documented, runnable example"), `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `SSEError` is barrelled (`index.ts:3`) and is thrown at a consumer, but its class TSDoc carries no `@example` and its constructor at `errors.ts:25` carries no `@param` for `code`, `message`, or `context`. `pool/src/core/errors.ts:6` and `sqlite/src/server/errors.ts:21` both do carry one, so this is drift rather than a package convention.
    repair: Add an `@example` showing a `catch` narrowed with `isSSEError` on `error.code === 'OVERFLOW'`, and add the three `@param` tags at `errors.ts:25`.

36. package=abort file=`src/core/types.ts:22-27` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `AbortInterface`'s members carry no TSDoc: `id` (23), `signal` (24), `aborted` (25), and `abort(reason?)` (26) have no descriptions and `abort` has no `@param` documenting that a defined reason is kept verbatim while `undefined` defaults to an `AbortError`. `AbortOptions` documents its members (`types.ts:11`) and `timeout` and `budget` document every interface member, so this is drift within the same fleet convention.
    repair: Add a one-line description to each member and a `@param reason` to `abort` at `types.ts:26`, stating the defined-reason and `undefined`-default behavior the class TSDoc at `Abort.ts:10-13` already describes.

37. package=emitter file=`src/core/types.ts:44-53` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `EmitterInterface`'s members carry no TSDoc at all — `destroyed`, `on`, `once`, `off`, `emit`, `count`, `clear`, `destroy` — so no `@param` documents that `count(event?)` and `clear(event?)` apply to all events when the argument is omitted, and nothing documents that `on`/`once`/`emit` become no-ops after `destroy()`. That behavior exists only in the class `@remarks` at `Emitter.ts:30-32`.
    repair: Document each member on the interface, giving `count` and `clear` an explicit `@param event - The event to read or clear. Omit to apply to every event.`

38. package=ndjson file=`src/core/types.ts:12` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `parse(chunk)` is the package's entire public behavior and its TSDoc carries no `@param` and no `@returns`; `reset()` at `types.ts:14` carries neither a `@returns` nor a note that it never throws. The class's `parse` at `NDJSONParser.ts:31` has no TSDoc at all.
    repair: Add `@param chunk` and `@returns` to `types.ts:8-11`, and a `@returns Nothing` to `types.ts:13`, matching the form `timeout/src/core/types.ts:43-54` uses.

## Exempt

39. package=timeout file=`src/core/types.ts:19` rule=`.claude/rules/names.md` § Rejected naming (abbreviations) verdict=EXEMPT
    `ms` is an abbreviation, but `.claude/rules/patterns.md` § Options explicitly permits a short option key explained in TSDoc `@remarks` rather than through a longer name, and `types.ts:5-8` supplies that explanation. `TimeoutInterface.ms` at `types.ts:38` mirrors the option key and inherits the exemption.

40. package=emitter, sse file=`emitter/src/core/helpers.ts:16`, `emitter/src/core/factories.ts:19`, `sse/src/core/errors.ts:41`, `sse/src/core/factories.ts:27` rule=`.claude/rules/documentation.md` § Guide examples verdict=EXEMPT
    These `@example` fences import from `@src/core`. The rule bans the alias in *guide* examples and reserves it "for source/tests"; a TSDoc example lives in source, and both packages use the alias consistently across every file. Recorded rather than dropped because the alias does not resolve for a consumer reading the published `.d.ts`. Contrast finding 28, where `abort` mixes both conventions inside one package, and finding 27, where `ollama` names a specifier that is wrong under either reading.

41. package=sqlite file=`src/server/types.ts:87` rule=`.claude/rules/names.md` § General vocabulary ("Accessors use bare nouns, never `get*`/`set*`") verdict=EXEMPT
    `SQLiteStatementInterface.get(parameters?)` is the bare word `get`, not a `get*`-prefixed accessor, and `types.ts:78-83` documents `run` / `get` / `all` / `iterate` as the `node:sqlite` `StatementSync` surface this wrapper mirrors. Preserving an external API's method names is the documented intent of the package.

42. package=ollama file=`src/server/types.ts:49`, `:40`, `:53` rule=`.claude/rules/names.md` § Entity-scoped names verdict=EXEMPT
    `keep_alive`, `tool_calls`, and the `type: 'function'` discriminant are snake_case and `type`-named, both otherwise prohibited. `types.ts:28-33` documents `WireChatRequest` as the verbatim `/api/chat` wire contract asserted against the official client's `ChatRequest`, and the design law admits external-spec literals. Finding 9 covers `OllamaOptions.keepAlive`, which is this package's own key rather than the wire's.

## Clean

None. Every one of the ten packages carries at least one CONFIRMED finding. `emitter` and `abort` are the closest to clean — each carries only documentation-form and reference findings (1, 28, 29, 36, 37) and no structural, naming, or contract violation.

## Deviation

None. Two notes on scope and format:

- **Format.** Findings 1, 2, 21, 29, and 32 span several packages under one repair. Rather than split each into near-identical per-package entries, each names every affected package with its exact `file:line` list, so each remains individually dispatchable.
- **Referral, outside this slice.** `ollama/src/server/OllamaProvider.ts:276` and `:283` construct `{ type: 'content', … }` and `{ type: 'thinking', … }`. `type` as a discriminant is banned by `AGENTS.md` § Design laws ("Named discriminants … never `kind` or `type`"), but `ProviderDelta` is declared in `@orkestrel/agent`, which is not in my slice. `ollama` cannot repair it; the axis name is `channel`, and the fix belongs to whichever slice audits `@orkestrel/agent`. Recorded here so it is not lost.