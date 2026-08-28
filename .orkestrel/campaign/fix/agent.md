# Fix dossier: agent

Verified fix-producing findings for the `agent` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s08-12 — DRIFT

12. package=agent file=`/home/user/fleet/agent/src/core/types.ts:98`, `:99`, `:766`–`:769` rule=`AGENTS.md` § Design laws (Named discriminants) verdict=CONFIRMED
    wrong: `ProviderDelta` and `AgentChunk` both discriminate on a member literally named `type`. The law says "Name the axis that varies (`relationship`, `command`, `category`), never `kind` or `type`." The TSDoc at `types.ts:88` makes this worse than a miss — it asserts compliance ("The discriminant `type` names the CHANNEL axis (AGENTS §4.4 — never `kind`)") against a rule that bans `type` as well as `kind`, so the comment reads as a ruling that the current rule text does not support.
    repair: rename `ProviderDelta.type` to `channel` (the axis its own TSDoc names) and `AgentChunk.type` to `category`; update `Agent.#provide` (`Agent.ts:739`–`:743`), `Agent.#run` (`:507`, `:524`), the `factories.ts:389` fence, and every `chunk.type` / `delta.type` in `guides/agent.md`. Delete the "never `kind`" clause from `types.ts:88` rather than restating it.

## s08-13 — DRIFT

13. package=agent file=`/home/user/fleet/agent/src/core/types.ts:906` rule=`.claude/rules/patterns.md` § Event maps verdict=CONFIRMED
    wrong: `compactError` is a compound event name; the rule says "Event names are single present-tense verbs or nouns" and every sibling in `AgentEventMap` (`start`, `turn`, `tool`, `usage`, `deny`, `finish`, `error`, `abort`, `exhaust`) obeys that.
    repair: rename the event to `strain` or `degrade` — a single word for "a best-effort compaction failed and the run continues" — and update `Agent.#trim` (`Agent.ts:630`), the `AgentOptions.strict` TSDoc (`types.ts:1033`), and the `AgentEventMap` table in `guides/agent.md`.

## s08-14 — DRIFT

14. package=agent file=`/home/user/fleet/agent/src/core/types.ts:1383`, `:1405` rule=`.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `AgentQueueOptions.allowPartial` and `AgentRunnerOptions.allowPartial` are compound top-level option keys; the rule says "Top-level keys are single words," and the value is a plain binary policy switch.
    repair: rename both to `partial` (`readonly partial?: boolean` — "a partial result resolves as success"), and update `createAgentQueue` / `createAgentRunner` (`factories.ts:538`, `:587`), `settleAgentJob` / `handleAgentQueueJob` / `handleAgentRunnerJob` (`helpers.ts:225`, `:244`, `:267`), and `guides/agent.md:1039`.

## s08-15 — DRIFT

15. package=agent file=`/home/user/fleet/agent/src/core/types.ts:1041`–`:1063`, `:1102` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc block at `:1041` describes the agent loop — "One loop, two faces", "Bounded", `{@link emitter}`, `{@link AgentChunk}` stream — and is attached to `export interface AgentRunOptions`, which is a per-run options bag. `AgentInterface` at `:1102`, the package's central public contract, carries no TSDoc at all. The block is `AgentInterface`'s documentation on the wrong declaration.
    repair: move the `:1041`–`:1062` block onto `AgentInterface` at `:1102`, and write `AgentRunOptions` its own description: what a per-run override bag is and that each member overrides the matching `AgentOptions` value for one run.

## s08-16 — DRIFT

16. package=agent file=`/home/user/fleet/agent/src/core/types.ts:27`, `:445`, `:1158`, `:1439` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `MessageInterface`, `ContextFormatInterface`, `AuthorityContextInterface`, and `SectionInterface` are plain readonly data records with no call-signature member, but they carry the `{Entity}Interface` suffix the table reserves for a **behavioral** interface. The table's row for plain non-behavioral data is `{Entity}`. The package proves it knows the distinction — `AuthorityDecision`, `AuthorityRule`, `ProviderResult`, `AgentResult`, `ConversationSnapshot`, and `HTMLSpan`-style records all take the bare form.
    repair: rename to `Message`, `ContextFormat`, `AuthorityContext`, and `Section`; update every reference in `src/`, the `### Types` rows in `guides/agent.md`, and the fences that name them. Leave `InstructionInterface` alone in this unit — the bare `Instruction` is taken by the class at `instructions/Instruction.ts:24`, so it needs its own decision and belongs in a successor unit.

## s08-17 — DRIFT

17. package=agent file=`/home/user/fleet/agent/src/core/helpers.ts:305`, `:335`, `:372` rule=`.claude/rules/architecture.md` § Centralized-file pattern verdict=CONFIRMED
    wrong: `isMessage`, `isSection`, and `isConversationSnapshot` are total `Guard<T>` narrowers — `(value: unknown) => value is T`, never throwing, returning `false` off-shape, exactly as their own TSDoc says. The kind table's sole location for guards is `*/validators.ts`, and this package has no `validators.ts` at all, so three guards sit in the pure-helper file. `isProviderAbortError` / `isAgentJobError` / `isConversationError` / `isAgentError` are correctly in `errors.ts` (error guards have their own row), so this is specifically the data-shape guards.
    repair: create `src/core/validators.ts`, move the three there with their TSDoc, add `export * from './validators.js'` to `src/core/index.ts`, update `DatabaseConversationStore.ts:7` and any test import, and add a `### Validators` section to `guides/agent.md`.

## s08-19 — DRIFT

19. package=agent file=`/home/user/fleet/agent/src/core/helpers.ts:405` rule=`.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
    wrong: `fencedFile` is an adjective-plus-noun, so it reads as a value rather than an action; the rule says a module helper defaults to `{verb}{Noun}` because it has no owning entity at the call site, and the one-word escape applies only where "meaning and arguments are unmistakable", which a three-argument renderer is not.
    repair: rename to `renderFencedFile`, and update `AgentContext.#fenced` (`AgentContext.ts:354`, `:355`) and the guide row.

## s08-20 — DRIFT

20. package=agent file=`/home/user/fleet/agent/src/core/factories.ts` (18 occurrences), `types.ts`, `helpers.ts:399`, `conversations/stores/MemoryConversationStore.ts:31`, `conversations/stores/DatabaseConversationStore.ts:48` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: 22 TSDoc `@example` fences across five files import from the in-repository alias `@src/core`, which the rule reserves for source and tests and forbids in public examples. These fences ship in the published `.d.ts`, so a consumer who copies one gets an unresolvable specifier. The package is inconsistent with itself — `helpers.ts:46` and `Channel.ts:15` already use `@orkestrel/agent` — and the sibling package uses the published specifier throughout (`html/src/core/factories.ts:31`, `html/src/core/helpers.ts:96`).
    repair: change every `from '@src/core'` inside a TSDoc `@example` to `from '@orkestrel/agent'` across the five files.

## s08-21 — DRIFT-RESHAPE

21. package=agent file=`/home/user/fleet/agent/src/core/Agent.ts:695`, `:707`, `:771`, `:777`, `:788`; `AgentContext.ts:245`, `:265`, `:280`, `:293`, `:336`, `:353`, `:363`; `conversations/Conversation.ts:304`, `:313`; `scopes/Scope.ts:67` rule=`.claude/rules/architecture.md` § Functions and orchestration verdict=CONFIRMED
    wrong: fifteen `#` private methods are pure self-contained computations that read no `#` field and call no sibling method, so the leaf test's outcome for each is "exported helper", and `AGENTS.md` § Design laws adds "No hidden module helpers or declarations. Fold trivial one-use logic into its caller, or export it from the correct centralized module and test it." `Scope.#intersect` is a `static` private method, which additionally sits outside the class-order rule. The package's own placement proves the standard: `sanitizeUsage` is an exported helper while `Agent.#sum` — the same shape of pure `TokenUsage` arithmetic — is hidden.
    repair: move to `src/core/helpers.ts` as exported, unit-tested leaves: `joinThinking` (`#thought`), `sumUsage` (`#sum`), `resultOf` (`#result`), `denyCall` (`#denial`), `messageOf` (`#reason`), `appendSection` (`#section`), `resolveOpen` / `resolveClose` / `resolveItem` (`#header` / `#footer` / `#render`), `withImages`, `fencedFileOf` (`#fenced`), `imageDataOf` (`#workspaceImages`), `summaryMessageOf` / `recapMessageOf`, and `intersectKeys` (`Scope.#intersect`). Keep `Agent.#parents`, `Agent.#authorize`, `AgentContext.#attach`, `AgentContext.#ensure`, `Conversation.#create`, and every `ThinkSplitter` private method as methods — each reaches `#` state or a sibling.

### Verification

**Judge (DRIFT-RESHAPE/high):** The leaf-test claim is accurate — I read all fifteen and each reads only its parameters, touching no `#` field and no sibling — so the violation is real and the finding's keep-list is right. The repair as written is not, and the objective lane's 'stands plus two fixes' understates how much of it is

**Lane DRIFT/high:** amend: as stated, but have the extracted #section return its joined string instead of pushing into a caller-owned array, and pick a name for #fenced that does not shadow the existing fencedFile helper - fold its text/binary branch into fencedFile itself rather than adding fencedFileOf beside it.

**Lane DRIFT-RESHAPE/medium:** amend: rule each of the fifteen under the two-outcome dichotomy rather than exporting all of them. Extract and unit-test the non-trivial or duplicated leaves (`sumUsage`, `intersectKeys`, `resolveOpen`/`resolveClose`/`resolveItem`, `withImages`, `imageDataOf`, `resultOf`, `denyCall`, `summaryMessageOf`/`recapMessageOf`); fold the trivial single-use one-liners (`#reason`, `#thought`, `#fenced`) into their callers. Declare a named type in `types.ts` for the manager parameter the three cascade resolvers take, rather than exporting an inline structural shape.

## s08-22 — DRIFT-RESHAPE

22. package=agent file=`/home/user/fleet/agent/src/core/Agent.ts:193`, `:254`, `:329`, `:355`, `:606`; `types.ts:820`, `:840` rule=`.claude/rules/typescript.md` § Types and `AGENTS.md` § Design laws (No superfluous wrappers) verdict=CONFIRMED
    wrong: the run threads its state through two ad-hoc anonymous box types declared inline in method signatures — `state: { outcome: RunOutcome }` in `#pump` and `#run`, and `compaction: { state: CompactionState }` in `#trim` — purely to get mutable-by-replacement semantics across method boundaries. Both are reused across signatures, so the rule "Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`" reaches them. `CompactionState` compounds it: a declared interface wrapping one boolean, then wrapped again in a `{ state: … }` box, is two layers of machinery around `futile`.
    repair: replace both boxes with one named per-run holder in `types.ts` — a single `AgentRun` interface carrying the mutable run fields — or drop them and hold the run state in the `#run` generator, returning the settled `RunOutcome` from it. Delete `CompactionState` and carry `futile` as a plain local in `#run` passed to `#trim` by value, with `#trim` returning whether to latch.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: take the second branch only - hold the run state inside the #run generator and return the settled RunOutcome from it, delete CompactionState, and carry futile as a plain local passed to #trim by value with #trim returning whether to latch. Do not add a mutable-field interface to types.ts.

**Lane DRIFT-RESHAPE/medium:** amend: name the holders in `types.ts` — one `AgentRunState` carrying the mutable run fields, and collapse `{ state: CompactionState }` to a single named holder carrying `futile` directly. Keep the fresh-per-run holder lifecycle the TSDoc documents; do not move run state into `#run`'s locals or change `#trim`'s signature.

## s08-23 — DRIFT

23. package=agent file=`/home/user/fleet/agent/src/core/types.ts:367`, `:376`, `:383`, `:412`–`:425`; `AgentContext.ts:265`, `:280`, `:293` rule=`AGENTS.md` § Design laws (One concept, one term) verdict=CONFIRMED
    wrong: one concept — how a context section is framed — carries four vocabularies at once. `ContextSectionFormat` names its slots `open` / `render` / `close`; `InstructionManagerInterface` exposes the same three as `description` / `format(instruction)` / (none) plus the raw override as `framing`; `AgentContext` resolves them in `#header` / `#render` / `#footer`. A reader tracing "where does the section header come from" crosses `open`, `description`, `framing`, and `header` for one value.
    repair: fix one vocabulary — `ContextSectionFormat`'s `open` / `render` / `close` — and rename the manager surface to match: `description` → `open`, `format(instruction)` → `render(instruction)`, `framing` → `format` (the raw override, matching the option key that supplies it at `types.ts:346`). Rename `AgentContext.#header` / `#footer` to `#open` / `#close`. Update `guides/agent.md`'s `InstructionManagerInterface` method table and the build-cascade prose, which currently spells the cascade in all four vocabularies.

### Verification

**Judge (DRIFT/medium):** The alternation is real and the finding's repair direction survives challenge, so the objective lane's 'stands' holds. The decisive fact is why `framing` exists: its own TSDoc says it exposes the `InstructionManagerOptions.format` supplied at construction, and it had to take a different name only be

**Lane DRIFT/medium:** stands

**Lane DRIFT-RESHAPE/medium:** amend: unify on `open` / `render` / `close` without reusing `format` for a new meaning. Rename `InstructionManagerInterface.description` -> `open` and `format(instruction)` -> `render(instruction)`, leave the raw cascade override named `framing` (or rename it `override`), and rename the private `AgentContext.#header` / `#footer` -> `#open` / `#close`. No symbol then keeps its name while changing what it means.

## s08-24 — DRIFT

24. package=agent file=`/home/user/fleet/agent/src/core/conversations/Conversation.ts:86`; `conversations/ConversationManager.ts:102`; `types.ts:1493`, `:1869` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts` before implementation") verdict=CONFIRMED
    wrong: `Conversation`'s constructor takes a second positional parameter, `seed?: ConversationSnapshot`, that appears in no declared type. `ConversationOptions` (`types.ts:1493`) has no `snapshot` member, so the hydration seam of a barrelled, guide-documented class is reachable only by knowing the positional argument — `createConversation(options)` cannot hydrate at all, and `ConversationManager.add` reaches it at `ConversationManager.ts:102` by passing `input?.snapshot` positionally. The same value is also named twice: `snapshot` on `ConversationInput` and on `ConversationInterface.snapshot()`, and `seed` in the constructor and throughout the prose.
    repair: add `readonly snapshot?: ConversationSnapshot` to `ConversationOptions`, collapse the constructor to `constructor(options?: ConversationOptions)` reading `options?.snapshot`, update `ConversationManager.add` to spread it into the one options object, and replace `seed` with `snapshot` in the TSDoc at `Conversation.ts:86`–`:91`, `types.ts:1729`, `:1753`, `:1782`, and `guides/agent.md:683`.

## s08-26 — DRIFT

26. package=agent file=`/home/user/fleet/agent/src/core/Channel.ts:25` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts` before implementation") verdict=CONFIRMED
    wrong: `Channel<T>` is barrelled (`index.ts:7`) and documented as public (`guides/agent.md:411`), but it has no `ChannelInterface` in `types.ts` and no `createChannel` factory. Every other barrelled class in this package implements a declared interface and has a `create*` factory — `Agent`/`AgentInterface`, `AgentContext`, `Authority`, `Conversation`, `ConversationManager`, `Instruction`, `InstructionManager`, `Scope`, `ScopeManager`, `ThinkSplitter`, and both stores. `Channel` is the sole barrelled class whose contract exists only as its implementation.
    repair: pick one and finish it. Either declare `ChannelInterface<T>` in `types.ts` (`push` / `close` / `fail` / `drain`), have `Channel` implement it, and add `createChannel<T>(): ChannelInterface<T>` to `factories.ts`; or intern it — drop `export * from './Channel.js'` from `index.ts`, add `'Channel'` to the `INTERNAL` list in `tests/guides.test.ts:38`, and delete the `guides/agent.md:411` row.

## s08-27 — DRIFT

27. package=agent file=`/home/user/fleet/agent/src/core/AgentRegistry.ts:137`; `errors.ts:18`, `:69` rule=`.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
    wrong: two gaps in one taxonomy. `AgentRegistry.#resolve` throws a bare `new Error(\`unknown ${category}: ${name}\`)` for a programmer error, so a caller must parse the message string — while the package already ships `AgentError` with a machine-readable `code` and `isAgentError` for exactly this. Separately, `ProviderAbortError` and `AgentJobError` expose no `code` at all, though the rule says "Error classes expose a machine-readable `code`" and the package's own `ConversationError` and `AgentError` do.
    repair: widen `AgentError.code` to `'CONCURRENCY' | 'UNKNOWN'` and have `#resolve` throw `new AgentError('UNKNOWN', \`unknown ${category}: ${name}\`)`; add `readonly code: 'ABORT'` to `ProviderAbortError` and `readonly code: 'PARTIAL'` to `AgentJobError`. Update the `@throws` tags in `types.ts:1300`, `:1309`, `:1317`, `:1325`, `:1334` and the `guides/agent.md:645`, `:653` rows, which state the bare-`Error` behavior.

## s08-28 — DRIFT

28. package=agent file=`/home/user/fleet/agent/src/core/types.ts:464` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ScopeConfiguration` uses a `Configuration` suffix the form table does not carry. The table maps the options/config kind to `{Entity}Options` and plain non-behavioral data to `{Entity}`; this type is the latter — three optional readonly string lists that `ScopeInterface` extends and `narrow` accepts.
    repair: rename to `ScopeFilter` (the bare-`{Entity}` data form, naming what the value is), and update `ScopeInput`, `ScopeInterface.narrow`, `Scope.narrow` (`scopes/Scope.ts:49`), and the guide row.

## s08-29 — DRIFT

29. package=agent file=`/home/user/fleet/agent/src/core/types.ts:1427` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ConversationSummarizer` is a function type, and the table's required form for one is `{Entity}Handler` or `{Entity}Function`. The package follows the table elsewhere (`EmitterErrorHandler`, `HTMLRewriteHandler` in the sibling), so this is the one agent-noun exception.
    repair: rename to `ConversationSummaryHandler`, and update `ConversationOptions.summarize`, `ConversationInput.summarize`, `ConversationManagerOptions.summarize`, `Conversation.#summarize`, `ConversationManager.#summarize`, and the guide rows. The option key `summarize` stays as it is — it is already one word and correctly a verb.

## s08-30 — DRIFT

30. package=agent file=`/home/user/fleet/agent/src/core/helpers.ts`, `factories.ts`, `errors.ts`, `types.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: TSDoc first sentences use the imperative rather than the required third-person `-s` verb. Confirmed fleet-wide by the convention lane (agent: 30 imperative to 0 third-person). Affected files: `src/core/helpers.ts`, `src/core/factories.ts`, `src/core/errors.ts`, and the member TSDoc in `src/core/types.ts`. Two in `helpers.ts` open on a bare `Whether…` with no verb at all (`:276`, `:314`).
    repair: convert each first sentence to the third person — `Create a conversation…` → `Creates a conversation…`, `Narrow an unknown caught value…` → `Narrows an unknown caught value…`, `Whether an unknown is structurally a Message…` → `Checks whether a value is structurally a Message…`.

