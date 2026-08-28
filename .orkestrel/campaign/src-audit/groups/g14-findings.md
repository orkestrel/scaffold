# Findings for group g14

Packages: ollama, sqlite. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s18-07

7. package=ollama file=`src/server/OllamaProvider.ts:341,416,437,457,467,476,484,494,518` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test), `AGENTS.md` § Design laws ("Export and test reusable logic") verdict=CONFIRMED
   wrong: Nine methods reach no `#` state and no instance context — `#parseBody` (341), `#plain` (416), `#result` (437), `#content` (457), `#thinking` (467), `#thought` (476), `#usage` (484), `#tools` (494), `#arguments` (518). Each is a pure projection or conversion, which the leaf test routes to an exported helper. The package has no `helpers.ts` at all, so this wire-narrowing logic — the package's highest-risk code — is untestable except through a live daemon. The comment at `OllamaProvider.ts:262-265` shows the leaf test was applied to `#deltas` (correctly kept a method, since it calls siblings and mutates the accumulator) and not to these.
   repair: Create `src/server/helpers.ts` and move the nine as `{verb}{Noun}` exports — `readBody`, `plainMessages`, `assembleResult`, `wireContent`, `wireThinking`, `joinThinking`, `wireUsage`, `wireTools`, `wireArguments`. Add `export * from './helpers.js'` to `src/server/index.ts:1`, keep `#body`, `#requestHeaders`, `#fetch`, and `#deltas` as methods (they read `#` fields or call siblings), and add unit tests for each helper.

## s18-08

8. package=ollama file=`src/server/types.ts:134` rule=`AGENTS.md` § Design laws ("One concept, one term"), `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
   wrong: `OllamaOptions.format` (prompt-context framing) and `WireChatRequest.format` (the `/api/chat` structured-output schema) are two unrelated concepts under one term. The package spends four long disambiguation passages defending the collision — `types.ts:60-66`, `types.ts:126-133`, `OllamaProvider.ts:104-109`, `OllamaProvider.ts:122-126`, `OllamaProvider.ts:372-373`, `factories.ts:27-29` — which is the evidence the term is not earning its place. The wire field's name is fixed by Ollama; this package's own option key is not.
   repair: Rename `OllamaOptions.format` to `framing` at `types.ts:134`, and update `OllamaProvider.ts:82`, `:110`, `:130` (the getter satisfies `ProviderInterface.format`, so keep the public getter named `format` and read `#framing`), plus `factories.ts:23-32` and `guides/ollama.md`. Delete every "the two are unrelated despite the shared word" passage the rename makes unnecessary.

## s18-09

9. package=ollama file=`src/server/types.ts:91` rule=`.claude/rules/names.md` § Entity-scoped names, `.claude/rules/patterns.md` § Options verdict=CONFIRMED
   wrong: `keepAlive` is a two-word ungrouped option key; the rule fixes ungrouped option keys at one word. The wire's `keep_alive` is external and stays, but this package's own option key is its own API.
   repair: Rename the option to `residency` at `types.ts:91`, and update `OllamaProvider.ts:76`, `:87`, `constants.ts:7` (`DEFAULT_KEEP_ALIVE` → `DEFAULT_RESIDENCY`), `factories.ts:11`, `factories.ts:32`, and `guides/ollama.md`. The wire field `WireChatRequest.keep_alive` at `types.ts:49` is unchanged.

## s18-10

10. package=sqlite file=`src/server/types.ts:70` rule=`.claude/rules/names.md` § Entity-scoped names, `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `foreignKeys` is a two-word ungrouped option key. Its four siblings (`path`, `readonly`, `timeout`, `bigints`) are all one word, so the flat bag is the right shape and only this key breaks it.
    repair: Rename to `constraints` at `types.ts:70` (it is a boolean asserting foreign-key constraint enforcement) and update `SQLiteDatabase.ts:34`, `:42`, `:63`, the `types.ts:58-60` remark, `guides/sqlite.md:14`, `:60`, `:202`, `:212`, `:275`.

## s18-11

11. package=sqlite file=`src/server/types.ts:123` (and `src/server/SQLiteDatabase.ts:79`) rule=`.claude/rules/names.md` § Rejected naming (abbreviations), § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `exec` is an abbreviation of `execute`, and `execute` is a fixed lifecycle verb with the exact meaning this method has ("Run primary work to completion"). The rule bans abbreviations by name and fixes the full verb's meaning.
    repair: Rename to `execute(sql)` at `types.ts:123` and `SQLiteDatabase.ts:79`, update the internal call sites `SQLiteDatabase.ts:134`, `:138`, `:142`, `:148`, `:149`, the `factories.ts:22` example, and `guides/sqlite.md:12`, `:120`, `:226`, `:253`.

## s18-12

12. package=sqlite file=`src/server/types.ts:125` (and `src/server/SQLiteDatabase.ts:100`) rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs"), § Value-level identifiers verdict=CONFIRMED
    wrong: `transaction<R>(scope)` is a noun naming a method that runs work. It is not an accessor, so the manager-accessor noun form does not cover it.
    repair: Rename to `transact<R>(scope)` at `types.ts:125` and `SQLiteDatabase.ts:100`, and update `SQLiteDatabase.ts:126`, `types.ts:107-113`, `guides/sqlite.md:108`, `:109`, `:147`, `:157`, `:268`, `:269`.

## s18-13

13. package=sqlite file=`src/server/index.ts:7` rule=`.claude/rules/architecture.md` § Barrel exports verdict=CONFIRMED
    wrong: `SQLiteStatement` is barrelled but no consumer can construct it: its constructor requires a native `StatementSync` and a `closed` callback that only `SQLiteDatabase.prepare` produces (`SQLiteDatabase.ts:94`), and the class's own TSDoc at `SQLiteStatement.ts:16-17` says the second parameter "is not part of the documented surface". The rule interns exactly this case, and the class carries no `@example`, which a barrel row obliges.
    repair: Delete `export * from './SQLiteStatement.js'` from `index.ts:7`, add `SQLiteStatement` to the package's parity `INTERNAL` list, and remove its row from the surface table at `guides/sqlite.md:33`. `SQLiteStatementInterface` stays barrelled — it is named in `prepare`'s public signature.

## s18-14

14. package=sqlite file=`src/server/SQLiteDatabase.ts:124` (and `src/server/types.ts:45`) rule=`.claude/rules/typescript.md` § Errors and outcomes ("Error classes expose a machine-readable `code`") verdict=CONFIRMED
    wrong: Passing an async scope to `transaction` is a programmer error with a precise cause, but it throws `SQLiteError('UNKNOWN', …)`. `'UNKNOWN'` is the fallback for a native fault this package could not map, so a `catch` cannot tell the two apart and must fall back to parsing the message — the exact failure the code member exists to prevent. `guides/sqlite.md:109` and `:269` document the current code, so both carry the drift.
    repair: Add `'SCOPE'` to `SQLiteErrorCode` at `types.ts:45`, throw it at `SQLiteDatabase.ts:124`, and update the `types.ts:38-44` remark plus `guides/sqlite.md:109` and `:269`.

## s18-15

15. package=sqlite file=`src/server/helpers.ts:59-63` rule=`.claude/rules/architecture.md` § Centralized-file pattern, `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `bindParameters` is a barrelled public export whose return type is an anonymous union declared inline in the signature. A public function's return type is a public type and belongs in `types.ts`; a consumer cannot name it to hold the result.
    repair: Declare `export type SQLiteBinding = { readonly positional: readonly SQLiteValue[] } | { readonly named: Readonly<Record<string, SQLiteValue>> }` in `types.ts`, annotate `bindParameters` with it at `helpers.ts:61-63`, and add the row to the surface table in `guides/sqlite.md`.

## s18-23

23. package=ollama file=`src/server/OllamaProvider.ts:190-195` and `:266-273` rule=`.claude/rules/typescript.md` § Types, `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The per-stream accumulator's shape is written out as an anonymous inline object type in two places, character for character. It is reusable by demonstration and has no home in `types.ts`. A third inline duplication sits at `OllamaProvider.ts:393-400`, restating `WireChatRequest['tools'][number]`.
    repair: Declare `export interface OllamaStream { readonly splitter: ThinkSplitterInterface; wired: string; readonly calls: ToolCall[]; usage: TokenUsage | undefined }` in `types.ts` and reference it at both sites; at `OllamaProvider.ts:393-400` annotate the map callback with `WireChatRequest['tools'] extends readonly (infer E)[] ? E : never`, or extract the tool entry to its own named type in `types.ts` and index `WireChatRequest.tools` off it.

## s18-24

24. package=ollama file=`src/server/types.ts:122` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") verdict=CONFIRMED
    wrong: The `headers` hook is typed `() => Record<string, string> | Promise<Record<string, string>>`, a mutable record, while every other record in the same interface is `Readonly<Record<…>>` (`types.ts:95`, `:43`, `:51`, `:57`, `:66`).
    repair: Change to `readonly headers?: () => Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>` at `types.ts:122`. `OllamaProvider.#requestHeaders` at `:363` reads it through `Object.entries` and needs no change.

## s18-25

25. package=ollama file=`src/server/OllamaProvider.ts:134` and `:158` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `generate` and `stream` are the entire public behavior of a barrelled class and carry no TSDoc at all — no description, no `@param` for `messages`/`signal`/`tools`/`options`, no `@returns`, and no `@throws` for the `ProviderAbortError`-carrying-a-partial-result contract or `OllamaHTTPError`. That contract exists only as prose inside the class-level `@remarks`.
    repair: Add complete TSDoc to both methods, including `@throws {@link import('@orkestrel/agent').ProviderAbortError}` on `stream` naming the partial-result payload, and `@throws {@link OllamaHTTPError}` on both.

## s18-26

26. package=ollama file=`src/server/types.ts:18` (and `src/server/index.ts:1`) rule=`.claude/rules/names.md` § General vocabulary, `.claude/rules/architecture.md` § Barrel exports verdict=CONFIRMED
    wrong: Two problems at one site. `OllamaResponse` is named for one of its three members — it carries a `Response`, a `TimeoutInterface`, and an `AbortSignal`, so `response.response` reads as a stutter and the container's name claims to be the thing it holds. Separately, `types.ts:9` calls it "the internal wire-shape" and `types.ts:26` calls `WireChatRequest` "the internal typed wire contract", yet `index.ts:1` star-exports `types.ts`, so both are public. The rule permits no third state: a declaration is public or it is a true runtime-private detail.
    repair: Rename `OllamaResponse` to `OllamaCall` (the handles bounding one live call) at `types.ts:18` and `OllamaProvider.ts:12`, `:297`. Then delete the word "internal" from `types.ts:9` and `types.ts:26` and document both as the supported types they are, since neither can leave `types.ts` without breaking the type-placement rule.

## s18-27

27. package=ollama file=`src/server/factories.ts:38` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The published `@example` tells a consumer `import { createOllama } from '@src/server'`. `package.json:29-32` publishes this surface at the root specifier, so the working import is `@orkestrel/ollama`. The alias resolves for nobody outside the repository, and the sibling example line `factories.ts:37` correctly uses `@orkestrel/abort`.
    repair: Change `@src/server` to `@orkestrel/ollama` at `factories.ts:38`.

## s18-30

30. package=sqlite file=`src/server/types.ts:131` rule=`.claude/rules/documentation.md` § Parity, `.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: The `begin()` TSDoc points a consumer at `guides/src/sqlite.md`. The guide is at `guides/sqlite.md`; `guides/src/` does not exist in this checkout.
    repair: Correct the path to `guides/sqlite.md` at `types.ts:131`.

## s18-31

31. package=sqlite file=`src/server/errors.ts:6` rule=`.claude/rules/writing.md` § Claims and time ("Claim only what the reader can check") verdict=CONFIRMED
    wrong: Published declarations compare this package to "the IndexedDB wrapper" — `errors.ts:6` ("Mirrors the IndexedDB wrapper's `IndexedDBError`"), `types.ts:5-7` ("the same discipline as the IndexedDB wrapper"), `types.ts:76` ("exactly as the IndexedDB wrapper does"). `package.json` declares no such dependency and the consumer has no way to resolve the reference; the comparison also carries no instruction if they could.
    repair: Delete the three comparisons. Each sentence stands without it.

## s18-32

32. package=ollama file=`src/server/OllamaProvider.ts:61` rule=`.claude/rules/writing.md` § Claims and time, `AGENTS.md` § Design laws ("No compatibility shims. This is greenfield") verdict=CONFIRMED
    wrong: Shipped prose narrates a migration instead of describing what exists: `OllamaProvider.ts:61` "Both omitted ⇒ today's behaviour", `:99` "so today's behaviour is byte-identical", `:371` "byte-for-byte the prior behaviour", `factories.ts:21` "Both omitted ⇒ today's behaviour". Two further passages justify a default by backward compatibility — `OllamaProvider.ts:90-91` and `types.ts:101-102` "so a general-purpose provider is backward-compatible" — a rationale a greenfield package does not have. `types.ts:131` writes "which this provider does not currently send"; `currently` is on the substitution table.
    repair: Replace each with the present-tense fact — "Both omitted ⇒ the global `fetch` and only a JSON content type", "The default is `false` so a non-thinking model needs no configuration", "which this provider does not send".

## s18-33

33. package=ollama file=`src/server/factories.ts:24` rule=`.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: The `@remarks` contains `(see [agents.md]; beaten by …)`, a Markdown reference link with no definition. It renders literally as `[agents.md]` in a consumer's editor and points at nothing.
    repair: Replace with a resolvable phrase introduced by `see`, or delete the parenthetical — the clause after it already states the cascade order.

## s18-34

34. package=ollama file=`src/server/errors.ts:30` rule=`.claude/rules/typescript.md` § Types, `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: The `OllamaHTTPError` constructor declares `options?: { readonly cause?: unknown }` inline. That is the built-in `ErrorOptions` type restated, and it types a public constructor parameter with an anonymous shape a consumer cannot name.
    repair: Change the parameter to `options?: ErrorOptions` at `errors.ts:30`. `super(message, options)` at `:31` is unchanged.

## s18-41

41. package=sqlite file=`src/server/types.ts:87` rule=`.claude/rules/names.md` § General vocabulary ("Accessors use bare nouns, never `get*`/`set*`") verdict=EXEMPT
    `SQLiteStatementInterface.get(parameters?)` is the bare word `get`, not a `get*`-prefixed accessor, and `types.ts:78-83` documents `run` / `get` / `all` / `iterate` as the `node:sqlite` `StatementSync` surface this wrapper mirrors. Preserving an external API's method names is the documented intent of the package.

## s18-42

42. package=ollama file=`src/server/types.ts:49`, `:40`, `:53` rule=`.claude/rules/names.md` § Entity-scoped names verdict=EXEMPT
    `keep_alive`, `tool_calls`, and the `type: 'function'` discriminant are snake_case and `type`-named, both otherwise prohibited. `types.ts:28-33` documents `WireChatRequest` as the verbatim `/api/chat` wire contract asserted against the official client's `ChatRequest`, and the design law admits external-spec literals. Finding 9 covers `OllamaOptions.keepAlive`, which is this package's own key rather than the wire's.