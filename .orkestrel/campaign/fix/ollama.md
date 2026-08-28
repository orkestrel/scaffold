# Fix dossier: ollama

Verified fix-producing findings for the `ollama` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-07 — DRIFT-RESHAPE

7. package=ollama file=`src/server/OllamaProvider.ts:341,416,437,457,467,476,484,494,518` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test), `AGENTS.md` § Design laws ("Export and test reusable logic") verdict=CONFIRMED
   wrong: Nine methods reach no `#` state and no instance context — `#parseBody` (341), `#plain` (416), `#result` (437), `#content` (457), `#thinking` (467), `#thought` (476), `#usage` (484), `#tools` (494), `#arguments` (518). Each is a pure projection or conversion, which the leaf test routes to an exported helper. The package has no `helpers.ts` at all, so this wire-narrowing logic — the package's highest-risk code — is untestable except through a live daemon. The comment at `OllamaProvider.ts:262-265` shows the leaf test was applied to `#deltas` (correctly kept a method, since it calls siblings and mutates the accumulator) and not to these.
   repair: Create `src/server/helpers.ts` and move the nine as `{verb}{Noun}` exports — `readBody`, `plainMessages`, `assembleResult`, `wireContent`, `wireThinking`, `joinThinking`, `wireUsage`, `wireTools`, `wireArguments`. Add `export * from './helpers.js'` to `src/server/index.ts:1`, keep `#body`, `#requestHeaders`, `#fetch`, and `#deltas` as methods (they read `#` fields or call siblings), and add unit tests for each helper.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: extract the eight parameter-only leaves (`#parseBody`, `#plain`, `#result`, `#content`, `#thinking`, `#thought`, `#usage`, `#arguments`) to a new `src/server/helpers.ts`, and move `#tools` with them as one unit because it calls `#arguments`. Name them `{verb}{Noun}`: `readBody`, `mapMessages`, `assembleResult`, `readContent`, `readThinking`, `joinThinking`, `readUsage`, `readTools`, `readArguments`. Add `export * from './helpers.js'` to `src/server/index.ts`, unit-test each, and add the nine Surface rows to `guides/ollama.md` so the guides bijection stays green. Correct the finding's testability claim: only the response-narrowing half lacks hermetic coverage.

**Lane DRIFT-RESHAPE/high:** amend: extract the pure projections — `#plain`, `#result`, `#content`, `#thinking`, `#thought`, `#usage`, `#tools`, `#arguments` — into a new `src/server/helpers.ts`, keep `#body`, `#fetch`, `#requestHeaders`, and `#deltas` as methods, and place `#parseBody` in `src/server/parsers.ts` as `parseBody` (it awaits `response.text()` and is not a pure leaf). Name the helpers in `{verb}{Noun}` form using an already-defined prefix — `messagesToWire` (or `extractMessages`), `assembleResult`, `extractContent`, `extractThinking`, `joinThinking`, `extractUsage`, `extractTools`, `extractArguments` — not `plainMessages` or a new `wire*` prefix. Add `export * from './helpers.js'` (and `'./parsers.js'`) to `src/server/index.ts` before the `factories.js` row, add the Surface rows to `guides/ollama.md`, and add `tests/src/server/helpers.test.ts` covering each. `#result`'s inline object type moves with it, which intersects finding s18-23.

## s18-09 — DRIFT-RESHAPE

9. package=ollama file=`src/server/types.ts:91` rule=`.claude/rules/names.md` § Entity-scoped names, `.claude/rules/patterns.md` § Options verdict=CONFIRMED
   wrong: `keepAlive` is a two-word ungrouped option key; the rule fixes ungrouped option keys at one word. The wire's `keep_alive` is external and stays, but this package's own option key is its own API.
   repair: Rename the option to `residency` at `types.ts:91`, and update `OllamaProvider.ts:76`, `:87`, `constants.ts:7` (`DEFAULT_KEEP_ALIVE` → `DEFAULT_RESIDENCY`), `factories.ts:11`, `factories.ts:32`, and `guides/ollama.md`. The wire field `WireChatRequest.keep_alive` at `types.ts:49` is unchanged.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The key is two words and no quoted exemption reaches it, so the violation against the rule text is real. The repair is not. `residency` is a coined word the rule's own predictability purpose argues against, it severs the documented 1:1 tie to the wire's `keep_alive`, and it orphans `DEFAULT_KEEP_ALI

**Lane DRIFT-RESHAPE/medium:** amend: decide the external-spec-mirror question once for the fleet rather than in this package alone. Either keep `keepAlive` and record the external-spec mirror as the intentional exception `@orkestrel/server`'s `CookieOptions` already sets, or pick a one-word key that still names the wire concept it sets. If a rename is chosen, add `guides/ollama.md:62` to the site list, which the finding omits.

**Lane EXCEPTION/medium:** drop

## s18-23 — DRIFT-RESHAPE

23. package=ollama file=`src/server/OllamaProvider.ts:190-195` and `:266-273` rule=`.claude/rules/typescript.md` § Types, `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The per-stream accumulator's shape is written out as an anonymous inline object type in two places, character for character. It is reusable by demonstration and has no home in `types.ts`. A third inline duplication sits at `OllamaProvider.ts:393-400`, restating `WireChatRequest['tools'][number]`.
    repair: Declare `export interface OllamaStream { readonly splitter: ThinkSplitterInterface; wired: string; readonly calls: ToolCall[]; usage: TokenUsage | undefined }` in `types.ts` and reference it at both sites; at `OllamaProvider.ts:393-400` annotate the map callback with `WireChatRequest['tools'] extends readonly (infer E)[] ? E : never`, or extract the tool entry to its own named type in `types.ts` and index `WireChatRequest.tools` off it.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: for the accumulator, remove the duplicated shape rather than naming it — have `#deltas` yield its deltas and return the per-record increments that `stream()` folds into local variables, so no type is written twice and no mutable interface reaches the barrel. For the tool entry, use `NonNullable<WireChatRequest['tools']>[number]`, not `WireChatRequest['tools'] extends readonly (infer E)[] ? E : never`, which compiles to `never`.

**Lane DRIFT-RESHAPE/high:** amend: remove the duplication without publishing a mutable interface. Either have `#deltas` return its increments so the shape is written once at the single `stream` site, or promote the accumulator to a small class in `src/server/OllamaStream.ts` whose interface in `types.ts` exposes readonly accessors over `#` fields. At OllamaProvider.ts:393-400 annotate the callback with `WireChatRequest['tools'] extends readonly (infer E)[] ? E : never` (or index a named tool-entry type), matching the `WireChatRequest['messages'][number]` idiom already used in tests/conformance.test.ts:31. Do not declare a public interface carrying `wired: string` or `usage: TokenUsage | undefined` as mutable members.

## s18-24 — DRIFT

24. package=ollama file=`src/server/types.ts:122` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") verdict=CONFIRMED
    wrong: The `headers` hook is typed `() => Record<string, string> | Promise<Record<string, string>>`, a mutable record, while every other record in the same interface is `Readonly<Record<…>>` (`types.ts:95`, `:43`, `:51`, `:57`, `:66`).
    repair: Change to `readonly headers?: () => Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>` at `types.ts:122`. `OllamaProvider.#requestHeaders` at `:363` reads it through `Object.entries` and needs no change.

### Verification

**Judge (DRIFT/medium):** The property modifier is present, but the declared return of a public interface member is a public return collection and the rule reaches it. The hunt for a deliberate reason comes back empty: no TSDoc, test, guide passage, or commit explains the exception, every sibling record in the file carries `

**Lane INVALID/low:** drop — or, if applied for consistency rather than as a rule fix, add `guides/ollama.md:62`, which documents the mutable `Record<string, string>` return, to the site list.

**Lane DRIFT/medium:** amend: apply the `Readonly<Record<string, string>>` change at types.ts:122 and also at OllamaProvider.ts:81, where `#headers` restates the same function type, and at guides/ollama.md:62, where the Surface row reproduces it.

## s18-27 — DRIFT-RESHAPE

27. package=ollama file=`src/server/factories.ts:38` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The published `@example` tells a consumer `import { createOllama } from '@src/server'`. `package.json:29-32` publishes this surface at the root specifier, so the working import is `@orkestrel/ollama`. The alias resolves for nobody outside the repository, and the sibling example line `factories.ts:37` correctly uses `@orkestrel/abort`.
    repair: Change `@src/server` to `@orkestrel/ollama` at `factories.ts:38`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The code is exactly as cited and the underlying defect is real — ollama is the only package publishing an unresolvable in-repository alias in its examples — but the finding aims the rule at the one site the rule reserves while leaving every site the rule actually bans untouched. A repair that change

**Lane DRIFT/high:** stands

**Lane INVALID/medium:** amend: drop the change to factories.ts:38. If the alias is to go, raise it as a package-wide unit covering guides/ollama.md:15, :31, :115, :134, :154, :173, :196 and the `MODULES` map at tests/guides.test.ts:29, since only the guide fences are what the quoted rule actually bans.

## s18-32 — DRIFT-RESHAPE

32. package=ollama file=`src/server/OllamaProvider.ts:61` rule=`.claude/rules/writing.md` § Claims and time, `AGENTS.md` § Design laws ("No compatibility shims. This is greenfield") verdict=CONFIRMED
    wrong: Shipped prose narrates a migration instead of describing what exists: `OllamaProvider.ts:61` "Both omitted ⇒ today's behaviour", `:99` "so today's behaviour is byte-identical", `:371` "byte-for-byte the prior behaviour", `factories.ts:21` "Both omitted ⇒ today's behaviour". Two further passages justify a default by backward compatibility — `OllamaProvider.ts:90-91` and `types.ts:101-102` "so a general-purpose provider is backward-compatible" — a rationale a greenfield package does not have. `types.ts:131` writes "which this provider does not currently send"; `currently` is on the substitution table.
    repair: Replace each with the present-tense fact — "Both omitted ⇒ the global `fetch` and only a JSON content type", "The default is `false` so a non-thinking model needs no configuration", "which this provider does not send".

### Verification

**Judge (DRIFT-RESHAPE/high):** Every flagged sentence is verbatim as reported, the substitution row and the greenfield law both apply, and the hunt finds no deliberate reason — these are migration notes the guide then reproduced. The repair is wrong at one site and short at three more. Its replacement for types.ts:131 preserves a

**Lane DRIFT-RESHAPE/high:** amend: at `types.ts:131` write 'which this provider sends only when a call supplies a `schema`', not 'which this provider does not send' — the latter is false and contradicts `OllamaProvider.ts:387`, `OllamaProvider.ts:108`, and `guides/ollama.md:102`. Keep the other replacements and add `guides/ollama.md:101` and `:150` to the site list.

**Lane DRIFT/high:** amend: apply the proposed present-tense replacements at OllamaProvider.ts:61, :90-91, :99, :371, factories.ts:21, and types.ts:101-102 and :131, and extend the same change to guides/ollama.md:101, :102, and :150, which carry the identical "today's behaviour" and "backward-compatible" phrasing.

## s18-33 — DRIFT

33. package=ollama file=`src/server/factories.ts:24` rule=`.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: The `@remarks` contains `(see [agents.md]; beaten by …)`, a Markdown reference link with no definition. It renders literally as `[agents.md]` in a consumer's editor and points at nothing.
    repair: Replace with a resolvable phrase introduced by `see`, or delete the parenthetical — the clause after it already states the cascade order.

## s18-34 — DRIFT

34. package=ollama file=`src/server/errors.ts:30` rule=`.claude/rules/typescript.md` § Types, `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: The `OllamaHTTPError` constructor declares `options?: { readonly cause?: unknown }` inline. That is the built-in `ErrorOptions` type restated, and it types a public constructor parameter with an anonymous shape a consumer cannot name.
    repair: Change the parameter to `options?: ErrorOptions` at `errors.ts:30`. `super(message, options)` at `:31` is unchanged.

