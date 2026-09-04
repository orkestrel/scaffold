# Unit conform-agent — report

Resumed from the interrupted first Opus unit. Every row is `applied` or `noop` except **agent-obj-9**, which is `stopped`: the repair the row prescribes is refused by the package's own `lint:check` gate. § Deviations carries the evidence.

Gate chain green: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0.

## Consumer edits taken

| # | Edit | Disposition | The line now |
| - | ---- | ----------- | ------------ |
| 1 | queue's `QueueExecution` → `QueueContext` | `applied` (carried by the interrupted tree, verified and extended) | `src/core/helpers.ts:14` reads `import type { QueueContext } from '@orkestrel/queue'`; `handleAgentQueueJob`'s parameter reads `context: QueueContext` and its body `registry.build(input, context.signal)`; the `@param` renamed to `context`. I extended it to the prose the interrupted tree missed: `src/core/factories.ts` (the `createAgentQueue` remark now reads "passes `context.signal` into `registry.build`") and `guides/agent.md`'s clauses 20 and 21 (`(input, context) =>` and `context.signal`). |
| 2 | guide's `symbol.kind` → `symbol.keyword` | `applied` (carried by the interrupted tree, verified) | `tests/guides.test.ts:120` reads `.filter((symbol) => symbol.keyword === 'function')`. `grep -rn 'symbol\.kind' tests/` exits 1. |
| 3 | workflow's landed renames | `noop` | `grep -rn 'WorkflowHooks\|PhaseHooks\|TaskHooks\|PHASE_STATUSES\|WORKFLOW_STATUSES\|TASK_STATUSES\|TERMINAL_TASK_STATUSES\|TaskStatus\|PhaseStatus\|WorkflowStatus\|WorkflowFunctions\|RunnerValue\|RunnerFailure'` over `/home/user/fleet/agent` excluding `node_modules` returns hits only in `guides/workflow.md`, the vendored dependency mirror refreshed at the wave. No `src/` or `tests/` consumer exists. The landed workflow report's § Shared-file patches names `@orkestrel/toolbox` alone. |

## Rows

`carried` marks a row the interrupted tree already held when I resumed; `completed` marks one this resumption finished or performed.

| Row | Disposition | State on resumption | Evidence |
| --- | ----------- | ------------------- | -------- |
| agent-obj-1 | `applied` | carried, complete | `src/core/errors.ts` widens `AgentError.code` to `'CONCURRENCY' \| 'REGISTRY'` on the field and the constructor parameter, with the `@remarks` and member TSDoc naming `'REGISTRY'`; `src/core/AgentRegistry.ts:130` imports `AgentError` from `'./errors.js'` and `#resolve` throws `new AgentError('REGISTRY', \`unknown ${category}: ${name}\`)`; message byte-identical (the pinned `AgentRegistry.test.ts` and `factories.test.ts` cases stay green). `src/core/types.ts` and `guides/agent.md`'s registry clause say the accessors throw an `AgentError` carrying `code: 'REGISTRY'`. I extended it to `src/core/factories.ts`'s `createAgentRegistry` remark, which still cited the bare `Error`. Controls: `agent-obj-1-control.txt` (1 failed \| 34 passed), `agent-obj-1-green.txt` (35 passed). |
| agent-obj-2 | `applied` | carried, BROKEN — `#status` renamed to `#settled` with no getter change and the three write sites untouched; the tree did not typecheck | Completed: `Agent.ts` `get status()` reads `this.#runs.size > 0 ? 'running' : this.#settled`; the `'running'` write at `stream()` deleted; the `finally` branches set `#settled`. Two regression cases added to `tests/src/core/Agent.test.ts` — overlapping runs on an agent with neither `window` nor `budget`, and a live run outranking a settled label. Controls below. |
| agent-obj-3 | `applied` | not started | `describe('flagship fences', …)` appended to `tests/guides.test.ts`, modelled on `/home/user/fleet/contract/tests/guides.test.ts:285-334`: the instructions fence (`instructions.open`, `instructions.render(safety)`), the tool-dispatch fence (`toEqual` on both `ToolResult`s), the helper fence (`sanitizeToken(12.7) === 12`), and the snapshot fence (`Object.keys(thread.snapshot())`), each with a `toContain` presence guard per claim-carrying line. Controls below. |
| agent-obj-4 | `applied` | not started | `tests/src/core/validators.test.ts` created, importing `isMessage` / `isSection` / `isConversationSnapshot` from `@src/core`. The `isConversationSnapshot` describe block moved out of `MemoryConversationStore.test.ts` (the `§14` struck from its title), plus direct `isMessage` / `isSection` cases for the happy shape, a missing required field, a non-record, `null`, `undefined`, a non-array `calls` / `messages`, a malformed `calls` element, and a non-array `images`. `MemoryConversationStore.test.ts` keeps only store behaviour and the `isToolCall` element guard its `calls` deepening rests on. Controls below. |
| agent-obj-5 | `applied` | not started | `tests/setup.ts` declares `export class ScriptedProvider implements ScriptedProviderInterface` with `#turns` / `#deltasOf` / `#exhaust` / `#record` / `#delay` / `#name` / `#format` / `#calls` / `#index` / `#inFlight` / `#maxInFlight` / `#started`; readonly getters for `id`, `name`, `format`, `maxInFlight`, `started`, `calls`; `stream` / `generate` as methods; `next`'s body as `#next()`. `createScriptedProvider(turns, options)` returns `new ScriptedProvider(turns, options)`, so no consuming test changed. The `??` fallback is the module-scope `export function chunkWholeDelta`. `createStubSummarizer`'s `summarize:` arrow is now object-literal method syntax. `turnParts` stays a module-scope exported leaf. Controls below. |
| agent-obj-6 | `applied` | not started | `export` added to `turnParts` at `tests/setup.ts:110` with a TSDoc block, and a `describe('turnParts', …)` in `tests/setup.test.ts` driving both union arms — a bare `ProviderResult` (asserting `deltas` and `thoughts` come back `undefined`) and a `{ result, deltas, thoughts }` turn. Controls below. |
| agent-obj-7 | `applied` | not started | Promoted to `tests/setup.ts` as exported module-scope factories, each local copy deleted: `createSeededToolManager(tools?)` replacing all four `makeTools` copies (`Agent.test.ts:715`, `:745`, `:782`, `:2616`; the loop-tool variant passes `[loopTool()]` explicitly); `seedWorkspaceContext()` replacing `seed` at `AgentContext.test.ts:585` and `seedImages` at `:654`; `seedInstructionContext()` replacing `seed` at `:765`; `resolveSectionOpen` / `resolveSectionRender` replacing `openFor` / `renderFor`; `seedConversation(manager, id)` replacing the local one at `ConversationManager.test.ts:320`. A `tests/setup.test.ts` case per promoted factory. Two shaping decisions recorded under § Deviations. Controls below. |
| agent-obj-8 | `applied` | not started | `src/core/Agent.ts` imports `errorToMessage` from `@orkestrel/workflow` (a value import beside the existing value imports; `@orkestrel/workflow` is a runtime `dependencies` entry at `package.json:81`) and `#authorize`'s fail-closed branch reads `const reason = errorToMessage(error)`. Two cases added: an `AuthorityInterface.evaluate` throwing `new Error('')`, and one throwing a null-prototype object whose stringification itself throws. The row's `[object Object]` claim is false of the installed primitive — see § Deviations. Controls below. |
| agent-obj-10 | `applied` | not started | `src/core/scopes/ScopeManager.ts` imports `ScopeManagerOptions` from `'../types.js'`, drops the now-unused `EmitterHooks` / `EmitterErrorHandler` type imports, and the constructor reads `constructor(options?: ScopeManagerOptions)` building the emitter exactly as `InstructionManager.ts:61-64` does. `src/core/factories.ts:319` reads `return new ScopeManager(options)`. The class `@example` constructs with no arguments, so it stands. The three positional constructions in `tests/src/core/scopes/ScopeManager.test.ts` now read `new ScopeManager({ on: { create: create.handler } })` and `new ScopeManager({ error: … })`. BREAKING — see § Breaking. Controls below. |
| agent-subj-1 | `applied` | not started | All four array branches seed `true` and clear on a failed delete: `InstructionManager.ts:117`, `scopes/ScopeManager.ts:84`, `conversations/Conversation.ts:162`, `conversations/ConversationManager.ts:155`. Per-item emits unchanged. Prose corrected at `guides/agent.md`'s `MessageManagerInterface` / `InstructionManagerInterface` / `ScopeManagerInterface` / `ConversationInterface` / `ConversationManagerInterface` method rows and their intros, the message-store contract clause, the conversation-layer clause, and the Tests rows; the TSDoc at `types.ts` (the `MessageManagerInterface` remark, the `remove` `@returns`, `ConversationInterface`, `ConversationManagerInterface`); the class remarks on `InstructionManager` and `ScopeManager`; and `factories.ts`'s three manager remarks. Tests updated at `ScopeManager.test.ts`, `InstructionManager.test.ts`, `Conversation.test.ts`, `ConversationManager.test.ts` — a mixed batch now expects `false`, and each case adds an all-present batch expecting `true`. BREAKING behaviour — see § Breaking. Controls below. |
| agent-subj-3 | `applied` | not started | `factories.ts` `createScope`: the summary reads "from its `name` and its per-category allow-lists" and the `@param` names `instructions` / `tools` / `files` (the phantom `messages` gone). Counts dropped and members named at `types.ts` `ScopeFilter` (":an optional `readonly string[]` for `instructions`, for `tools`, and for `files`"), `ScopeInterface`, `ScopeManagerInterface`, `ContextSectionFormat` (":`open`, `render`, and `close` are OPTIONAL"), and at `guides/agent.md:314`, `:406`, `:536`, `:538`, `:638`, `:650`, `:768` (both), `:1118`. Sweeps below. |
| agent-subj-4 | `applied` | not started | `types.ts` `AuthorityInterface` reads "`evaluate` is synchronous and returns the verdict directly"; the same cut at `factories.ts:479` and `Authority.ts:29`. `AuthorityContext` ends after "what is being called and with what." `types.ts` `ConversationInterface` and `Conversation.ts:46` and `:251` read "the caller decides whether to re-add them; `rehydrate` never reinserts". `currently` dropped and the key named at `types.ts` `ContextFormat` and `AgentContextInterface.build`. `Agent.ts:627` ends at "NOT separately bound to this run's abort signal." Mirrored in `guides/agent.md` at `:343`, `:555`, `:736`, `:775`, `:781`. |
| agent-subj-5 | `applied` | partially started in the touched files (`errors.ts`, `AgentRegistry.ts`, `types.ts`) | Every `§` token is gone from the package's own files. `guides/agent.md:1139` and `guides/README.md:105` now read "the repository's authority pointer; the coding rules it resolves to live in `@orkestrel/scaffold`"; `guides/README.md:3` reads "by concept, and by directory." The three sites copying a repository coding rule into a consumer-facing guide (`:54`, `:485`, `:1103`) state the behaviour without the citation. Sweep below. |
| agent-subj-6 | `applied` | not started | Every `clause N` reference replaced by the item's own subject: `clause 8` → the richer-turn-context clause, `13` → the bounded-paced-capped clause, `22` → the conversation-layer clause, `23` → the active-conversation clause, `24` → the automatic-compaction clause, `25` → the active-workspace clause, `26` → the durable-store clause, `29` → the `strict` clause. `Agent.ts:376` and `:564` name the futile-compaction guard with no cross-reference; `types.ts:685` ends at "for CONCURRENT threads use separate agents." The numbered list keeps its numbering. Sweep below. |
| agent-subj-7 | `applied` | not started | Every imperative row of the Factories table (`guides/agent.md:379-394`) and the Helpers table (`:433-456`) rewritten as a noun phrase, plus the four `is*` rows in the Errors table (`:507`, `:509`, `:511`, `:513`) as "The narrowing guard for a caught `X` …". The Validators table and the Errors class rows were already noun/participial phrases and stand, per the refuter's two corrections. The `## Methods` tables' Behavior column untouched. `test:guides` stays green (the parity assertions read names, never descriptions). |
| agent-subj-12 | `applied` | not started | Sweep and dispositions below. Bound as the row names it: `src/**`, `guides/agent.md`, `guides/README.md`, `README.md`. |
| agent-subj-13 | `applied` | partially started (`errors.ts:121`'s `§F2` struck) | `errors.ts` carries no control identifier. `Agent.ts` reads "When true, a summarizer failure during AUTOMATIC compaction rethrows" (`:99`), "Concurrency guard: a run already in flight PLUS" (`:172`), "a per-run override wins" (`:187`) and "(composed with, never replacing, the construction `signal`)" (`:746`), "Limit-exhaustion tracking" (`:365`), "Bounded mid-stream budget enforcement" (`:438`), the bare sentence at `:488` / `:510` / `:566`, "the single-level limit" (`:611`), "byte-identical to the no-authority path" (`:659`), and "the automatic-compaction check" at `:92` / `:557` / `:593`. Extended beyond the row's named sites — see § Deviations. |
| agent-subj-14 | `applied` | not started | Per-item member renamed `format` → `override`: `types.ts` `InstructionInterface` and `InstructionInput`; `helpers.ts:570` `resolveItem<T extends { readonly override?: string }>` and `:576` `item.override ??`; `instructions/Instruction.ts` field, constructor, and TSDoc; the cascade formula at `types.ts` `AgentContextInterface.build`; `factories.ts:252`; `AgentContext.ts:69`. Guide updated at the cascade prose (`:341`, `:346`), the Types rows (`:531`, `:532`), and the Tests row (`:1117`). Tests updated at `Instruction.test.ts`, `InstructionManager.test.ts`, `AgentContext.test.ts` (including the promoted `resolveSectionRender`'s `itemOverride` option), and `helpers.test.ts`. `override` collides with no existing member of `Instruction` (`id` / `name` / `content` / `priority`). BREAKING — see § Breaking. Controls below. |
| agent-obj-9 | **`stopped`** | carried (`readonly code: 'ABORT' = 'ABORT'` / `readonly code: 'PARTIAL' = 'PARTIAL'`) | The repair is refused by `npm run lint:check`, acceptance criterion 2. Reverted to the baseline `as const` form so the gate chain closes. Full evidence under § Deviations. |
| fleet-F1 | `noop` | — | `grep -rn 'isBrowserVuePath' /home/user/fleet/agent` excluding `node_modules` returns no match. The helper is absent from `tests/setup.ts`, and the workspace has no browser environment (`src/` holds only `core`; there is no `app/`, no `tests/setupBrowser.ts`). |
| fleet-F2 | `applied` | carried, BROKEN — `readonly #id: string` declared and assigned with no `id` getter, so `Agent` did not implement `AgentInterface` | Completed: `get id(): string { return this.#id }` added as the FIRST getter of the public interface, with `readonly #id: string` as the first `#` field and its assignment first in the constructor. The interface's `readonly id: string` in `types.ts` is unchanged. Pre-check per the ruling: `grep -rn 'JSON\.stringify'` over the package returns no serialization of an `Agent` instance, so the getter loses nothing. `Scope` and `Instruction` also declare a public `readonly id: string`, but neither has any `#` private field, so the trigger ("ahead of its `#` private fields") does not fire on them; `Agent` was the only class with the shape. |

## Files touched

`src/core/Agent.ts` — derived `status`, `#id` + `id` getter, `errorToMessage`, control identifiers and substitutions.
`src/core/AgentContext.ts` — substitutions, `override` cascade prose, total-guard wording.
`src/core/AgentRegistry.ts` — `AgentError('REGISTRY', …)` throw and its remarks (carried).
`src/core/Authority.ts` — the speculative-handshake sentence cut.
`src/core/Channel.ts`, `src/core/ThinkSplitter.ts`, `src/core/constants.ts`, `src/core/scopes/Scope.ts` — substitutions and the per-category count.
`src/core/conversations/Conversation.ts` — all-succeed batch `remove`, `rehydrate` wording, control identifiers.
`src/core/conversations/ConversationManager.ts` — all-succeed batch `remove`, id-keyed wording.
`src/core/conversations/stores/{Database,Memory}ConversationStore.ts` — total-guard wording, section tokens.
`src/core/errors.ts` — `AgentError.code` widened (carried); `as const` restored (agent-obj-9 stopped).
`src/core/factories.ts` — `new ScopeManager(options)`, `createScope` TSDoc, the registry-throw remark, substitutions.
`src/core/helpers.ts` — `QueueContext`, `resolveItem`'s `override` constraint, substitutions.
`src/core/instructions/Instruction.ts` — `override` field.
`src/core/instructions/InstructionManager.ts` — all-succeed batch `remove`, remarks.
`src/core/scopes/ScopeManager.ts` — options-object constructor, all-succeed batch `remove`, remarks.
`src/core/types.ts` — `override` member, `AuthorityInterface` / `AuthorityContext` / `ConversationInterface` prose, batch-`remove` contracts, counts, substitutions.
`src/core/validators.ts` — total-guard wording.
`guides/agent.md` — every row's documentation half.
`guides/README.md` — the index tagline and the `AGENTS.md` pointer.
`tests/setup.ts` — `ScriptedProvider` class, `chunkWholeDelta`, exported `turnParts`, the promoted scenario builders.
`tests/setup.test.ts` — a case per new export.
`tests/guides.test.ts` — `symbol.keyword` (carried) and the `flagship fences` block.
`tests/src/core/validators.test.ts` — new, the guards' own mirror.
`tests/src/core/Agent.test.ts` — status derivation, `errorToMessage`, `createSeededToolManager`, control identifiers.
`tests/src/core/AgentContext.test.ts` — the promoted builders and resolvers, `override`.
`tests/src/core/AgentRegistry.test.ts` — the `AgentError` case (carried).
`tests/src/core/conversations/{Conversation,ConversationManager}.test.ts` — all-succeed batches, `seedConversation`.
`tests/src/core/conversations/stores/{Database,Memory}ConversationStore.test.ts` — the guard block moved out, tokens.
`tests/src/core/{factories,helpers,integration}.test.ts`, `tests/src/core/instructions/{Instruction,InstructionManager}.test.ts`, `tests/src/core/scopes/{Scope,ScopeManager}.test.ts` — `override`, all-succeed batches, options constructor, tokens.

## Diffstat

`git diff HEAD --stat`: 40 files changed, 1499 insertions(+), 875 deletions(-).

## Failing-first controls

Each control planted the pre-repair behaviour (or a wrong body), ran the named command, and was removed before the green run. `grep -rn "PLANTED CONTROL" src/ tests/` exits 1.

| Row | Command | Red | Green |
| --- | ------- | --- | ----- |
| agent-obj-1 | `npx vitest run … --project src:core tests/src/core/AgentRegistry.test.ts` | 1 failed \| 34 passed — `agent-obj-1-control.txt` (captured by the interrupted unit) | 35 passed — `agent-obj-1-green.txt` |
| agent-obj-2 | `npx vitest run … --project src:core tests/src/core/Agent.test.ts` | 4 failed \| 116 passed — `agent-obj-2-control.txt` (`get status()` planted back to `return this.#settled`) | 120 passed — `agent-obj-2-green.txt` |
| agent-obj-3 | `npm run test:guides` | 1 failed \| 90 passed — `agent-obj-3-control.txt` (`InstructionManager.open` planted to `'## Directives'`) | 91 passed — `agent-obj-3-green.txt` |
| agent-obj-4 | `npx vitest run … --project src:core tests/src/core/validators.test.ts` | 3 failed \| 8 passed — `agent-obj-4-control.txt` (`isMessage` planted to skip the `content` check) | 11 passed — `agent-obj-4-green.txt` |
| agent-obj-5 | `npm run test:setup` | 1 failed \| 43 passed — `agent-obj-5-control.txt` (`ScriptedProvider.stream` planted to skip its `#started` / `#inFlight` advance) | 44 passed — `agent-obj-5-green.txt` |
| agent-obj-6 | `npm run test:setup` | 7 failed \| 37 passed — `agent-obj-6-control.txt` (`turnParts` planted to drop the pair arm's optionals, `chunkWholeDelta` planted to split per character) | 44 passed — `agent-obj-6-green.txt` |
| agent-obj-7 | `npm run test:setup` | 6 failed \| 38 passed — `agent-obj-7-control.txt` (each promoted factory planted wrong) | 44 passed — `agent-obj-7-green.txt` |
| agent-obj-8 | `npx vitest run … --project src:core tests/src/core/Agent.test.ts` | 2 failed \| 118 passed — `agent-obj-8-control.txt` (the raw `error instanceof Error ? error.message : String(error)` restored: an empty `Error` yields `''`, and the hostile throw escapes the gate with `TypeError: Cannot convert object to primitive value`) | 120 passed — `agent-obj-8-green.txt` |
| agent-obj-10 | `npx vitest run … --project src:core tests/src/core/scopes/ScopeManager.test.ts tests/src/core/factories.test.ts` | 3 failed \| 58 passed — `agent-obj-10-control.txt` (the constructor planted to ignore its options object) | 61 passed — `agent-obj-10-green.txt` |
| agent-subj-1 | `npx vitest run … --project src:core` over the four manager suites | 4 failed \| 123 passed — `agent-subj-1-control.txt` (all four accumulators planted back to any-semantics) | 127 passed — `agent-subj-1-green.txt` |
| agent-subj-14 | `npx vitest run … --project src:core tests/src/core/helpers.test.ts tests/src/core/AgentContext.test.ts tests/src/core/instructions/InstructionManager.test.ts` | 4 failed \| 211 passed — `agent-subj-14-control.txt` (`resolveItem` planted to never read the item's own level) | 215 passed — `agent-subj-14-green.txt` |

Every file sits in `/home/user/work/evidence/agent-proofs/`.

`agent-subj-3`, `agent-subj-4`, `agent-subj-5`, `agent-subj-6`, `agent-subj-7`, and `agent-subj-12` are documentation and naming rows with no behavioural claim; their proof is the sweep beside the gate, per the method's placement/naming/documentation clause.

## Sweeps

Every sweep ran over the package's own files, excluding the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, and every `guides/<dependency>.md` mirror.

| Sweep | Pattern | Paths | Result |
| ----- | ------- | ----- | ------ |
| agent-subj-5 section tokens | `§` | `src/`, `tests/`, `guides/agent.md`, `guides/README.md`, `README.md` | empty (exit 1) |
| agent-subj-6 positional references | `\bclause [0-9]+` | same | empty (exit 1) |
| agent-subj-13 control identifiers | `\bF[1-9]\b\|Ch[0-9]\|\bv1\b\|ASI0[0-9]\|§` | same | two hits, both permitted: `InstructionManager.test.ts:67` and `:236` use `content: 'v1'` as fictional instruction data, not a control identifier |
| agent-subj-12 substitutions | `e\.g\.\|i\.e\.\|\bvia\b\|\betc\.\|\bsimply\b\|\bjust\b\|in order to\|and/or\|\bcurrently\b`, case-insensitive | `src/**`, `guides/agent.md`, `guides/README.md`, `README.md` (the bound the row names) | one hit, permitted: `guides/agent.md:81` is the fence data literal `content: 'Reply with just the number.'` — fictional model prompt data inside a `ts` fence, not authored prose about the API. `tests/**` sits outside this row's bound and still carries hits. |
| agent-subj-3 count words | `\b(one\|two\|…\|ten) (allow-list\|allow-lists\|categor(y\|ies)\|list\|lists\|section\|sections\|member\|members\|export\|exports\|option\|options\|rule\|rules\|guard\|guards\|error\|errors\|helper\|helpers\|factory\|factories\|entit(y\|ies)\|level\|levels\|surface\|surfaces)\b`, case-insensitive | `src/`, `guides/agent.md`, `guides/README.md`, `README.md` | 18 hits, each ruled permitted: `one section` / `one list` / `one level` / `one member` / `ONE options` state a quantity of the operation, not a tally of a growable set; `two surfaces` (`guides/agent.md:998`, `:1109`) names its members in the same sentence, which `AGENTS.md` § Writing permits |
| agent-subj-3 count numerals | `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories\|guards\|errors\|levels\|surfaces)\b` | same | empty (exit 1) |
| agent-subj-14 old name | `item\.format\|itemFormat\|I\.format\|instruction\.format\|readonly format?: string\|per-item \`format\`\|\`InstructionInput.format\`\|\`InstructionInterface.format\`` | `src/`, `tests/`, `guides/agent.md`, `guides/README.md`, `README.md` | empty (exit 1). `format` survives only at the manager / provider / options levels, where it names a `ContextSectionFormat` |
| addendum 1 old name | `QueueExecution` | `src/`, `tests/`, `guides/agent.md` | empty (exit 1) |
| addendum 2 old name | `symbol\.kind` | `tests/` | empty (exit 1) |
| agent-obj-10 old form | `new ScopeManager\(.*,` | `src/`, `tests/` | empty; every construction passes one options object |

## Gates

Run in order after the last edit, each from `/home/user/fleet/agent`.

| Gate | Exit | Reading |
| ---- | ---- | ------- |
| `npm run format:check` | 0 | "All matched files use the correct format." over 77 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | `tsc --noEmit --project tsconfig.json` and `tsc --noEmit -p configs/src/tsconfig.core.json` both silent |
| `npm run build` | 0 | 22 modules transformed; `dist/src/core/index.cjs` 138.41 kB; `index.d.ts` copied to `index.d.cts` |
| `npm test` | 0 | `src:core` 18 files / 618 tests; `policy` 1 / 111; `config` 1 / 46; `setup` 1 / 44; `guides` 1 / 91 |

`git status --short` lists 40 paths, every one under Owned: `src/**`, `tests/**` (none of the vendored three), `guides/agent.md`, `guides/README.md`. `tests/src/core/validators.test.ts` is the single untracked addition.

The evidence files `/home/user/work/evidence/conform-agent.diff` (5136 lines) and `/home/user/work/evidence/conform-agent.status` (40 entries) were produced with `node /home/user/scaffold/tmp/work/evidence.mjs agent`.

## Observations, not criteria

The `npm test` reading above ran inside this unit's own exec with its harness resident. Take the deciding run after this unit exits. No timing-sensitive case failed under that load.

## Breaking

Three rows move published behaviour or a published name. No fleet code consumer exists for any of them; each break reaches an external consumer only.

| Row | Moved | Fleet consumers |
| --- | ----- | --------------- |
| agent-obj-10 | `ScopeManager`'s constructor: `(on?, error?)` → `(options?: ScopeManagerOptions)` | none. `grep -rn 'ScopeManager' /home/user/fleet/*/src /home/user/fleet/*/app` outside `/home/user/fleet/agent/src` returns no hit; the class is reached only through `createScopeManager`, whose signature is unchanged. `toolbox/guides/agent.md` and `ollama/guides/agent.md` are vendored mirrors of this file and refresh at the wave. |
| agent-subj-14 | `InstructionInterface.format` and `InstructionInput.format` → `override` | none. `grep -rn 'InstructionInput\|createInstruction\|instructions.add' /home/user/fleet` excluding `node_modules` and `/home/user/fleet/agent` returns nothing; no fleet package sets the per-item member. |
| agent-subj-1 | `remove(ids[])` on `MessageManagerInterface`, `InstructionManagerInterface`, `ScopeManagerInterface`, `ConversationInterface`, and `ConversationManagerInterface` returns `false` where it returned `true` for a batch containing an absent key. The signature is unchanged, so a consumer reads the difference only at the return value. | none. The same grep finds no fleet caller of any of those batch overloads outside `/home/user/fleet/agent`. This row obliges a release note and no consumer patch. |

Consumer edits obliged: none. `@orkestrel/toolbox` and `@orkestrel/ollama` need no change from this unit.

## Shared-file patches

None. No row required an edit to a file outside Owned. The vendored `guides/agent.md` mirrors at `/home/user/fleet/toolbox/guides/agent.md` and `/home/user/fleet/ollama/guides/agent.md` refresh from this file at the wave; I did not touch them.

## Deviations

### 1. agent-obj-9 — `stopped`. The ruled repair is refused by the package's own lint gate.

**Expected.** `src/core/errors.ts:21` reads `readonly code: 'ABORT' = 'ABORT'` and `:76` reads `readonly code: 'PARTIAL' = 'PARTIAL'`, per the row's operative repair, with `npm run lint:check` exiting 0 (acceptance criterion 2).

**Found.** The two demands are incompatible. With the ruled form in place:

```
$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

src/core/errors.ts:21:17: error typescript(prefer-as-const): Expected a `const` assertion instead of a literal type annotation. help: You should use `as const` instead of type annotation.
src/core/errors.ts:76:17: error typescript(prefer-as-const): Expected a `const` assertion instead of a literal type annotation. help: You should use `as const` instead of type annotation.
EXIT=1
```

`npm run lint` (the mutating variant the work process runs to converge) rewrites both lines back to `readonly code = 'ABORT' as const` / `readonly code = 'PARTIAL' as const` on its own. That is how I found it: the interrupted tree had the repair applied and unlinted, and the first `npm run lint` of this resumption silently reverted it.

**Done or not done.** Not done, and reverted to the baseline `as const` form so the gate chain closes. `lint:check` then exits 0. Every other row is applied and every gate is green with the revert in place.

**Hypothesis.** The refuter read `.claude/rules/typescript.md` § Types' clause "Do not write it on a value whose contract is already declared; annotate the declaration instead" as reaching a class field whose type is fixed by a single literal, but `AgentJobError.code` and `ProviderAbortError.code` declare no separate contract for that member (neither class implements an interface that declares `code`), so the clause's trigger may not fire — and the repository's own instrument reads it the other way. The fleet-wide `readonly code` unanimity the refuter cites is consistent with this: every other package's `code` is a union of two or more literals, where `prefer-as-const` does not fire, so no sibling ever had to choose.

**What the Orchestrator has to decide.** Either the rule sentence needs the exemption stated (a single-literal class field keeps `as const`, because `prefer-as-const` demands it), or `.oxlintrc.json` needs `typescript/prefer-as-const` disabled — which is off-limits for this unit and would change every package. I made neither change.

### 2. agent-obj-8 — one of the row's two added assertions is false of the installed primitive.

The row instructs: "Add two cases … asserting the emitted `deny` reason and the tool message are non-empty and carry no `[object Object]`." I ran the primitive rather than reasoning about it. `node_modules/@orkestrel/workflow/dist/src/core/index.js:807`:

```js
function errorToMessage(error) {
	try {
		const message = error instanceof Error ? error.message : String(error);
		return typeof message === "string" && message.length > 0 ? message : "unknown failure";
	} catch {
		return "unknown failure";
	}
}
```

So `errorToMessage({ code: 'X' })` returns `'[object Object]'`, exactly as the raw extraction does. The primitive fixes the empty-message case and the throwing-stringification case; it does not fix `[object Object]`.

The row's primary objective — reuse the declared primitive instead of reimplementing it — is fully applied. I wrote the two cases to the guarantees the primitive actually carries: an `Error` with an empty `message` now yields `'denied: unknown failure'` instead of `'denied: '`, and a null-prototype throw whose `String()` itself throws now yields `'denied: unknown failure'` instead of escaping the gate with a `TypeError` that rejects the whole run. The failing-first control (`agent-obj-8-control.txt`) shows both of those defects red against the raw extraction, so the cases bind to the row.

Decided and carried on from rather than stopped: none of the deviation contract's four triggers fires — the repair contradicts no rule, collides with no name, needs no file outside Owned, and needs no consumer edit.

### 3. agent-obj-7 — two shaping decisions, taken and recorded.

The refuter's operative form names `export function seedWorkspaceContext(options?: { images?: boolean }): AgentContext` as replacing `AgentContext.test.ts:585`, `:654`, AND `:765`. Those three fixtures build materially different contexts: `:585` seeds a system prompt, two text files, two image files, and one user turn; `:654` seeds two image files and nothing else; `:765` seeds a system prompt, two named instructions, two user turns, and no workspace at all. One options-parameterized form cannot serve `:765`, which has no workspace.

I implemented the row's objective — promote each local fixture factory to an exported module-scope factory in `tests/setup.ts` and import it — with two forms named for what they build: `seedWorkspaceContext()` (serving `:585` and `:654`; `:654`'s single consumer now asserts on the shared fixture's `['KEEPIMG', 'DROPIMG']`) and `seedInstructionContext()` (serving `:765`). I dropped the named `{ images?: boolean }` option because nothing consumes it, and `AGENTS.md` § Design laws forbids adding a capability without its first real consumer.

Second: `withCalls` moved out of its `it` body to module scope in the new `tests/src/core/validators.test.ts` rather than travelling "unchanged", because planting a nested function in a file I author would violate `AGENTS.md` § Design laws' no-nested-functions law. A module-scope arrow assignment in a test file is the established shape here (`MemoryConversationStore.test.ts:16` `makeStore`).

### 4. agent-subj-13 — sweep bound extended beyond the row's named sites.

The row names sites in `src/core/errors.ts` and `src/core/Agent.ts`. agent-subj-5's `§` sweep, which the refuter said would surface the same lines, reached `tests/**` as well and turned up the same class of unresolvable control identifier there: `F1` / `F2` / `F3` / `F4` / `F5` / `F6` describe titles and comments in `tests/src/core/Agent.test.ts`, `Ch5` / `Ch7` in `Agent.test.ts` and `factories.test.ts`, `ASI06` in `src/core/validators.ts` and two test files, `F2` / `F4` in `Conversation.test.ts`, and `v1` in `Conversation.test.ts`. Leaving them would have left the sweep dirty and the package inconsistent, so I cleared them under the same rule. Each was replaced by the behaviour it names — for example `describe('Agent - F1 limit exhaustion')` → `describe('Agent — limit exhaustion')`, `Ch5 behavior` → `the no-authority path`.

### Ancillary questions decided and carried on from

- New test case names, and where the two `status`-derivation cases sit (inside the existing `Agent — status transitions and getters` block rather than a new one).
- Where the `flagship fences` block sits in `tests/guides.test.ts` (after the per-manifest loop, as `contract`'s model does).
- The `## Workspace` text-section wording, and which noun-phrase form each Helpers row takes.
- Keeping the `isToolCall` block in `MemoryConversationStore.test.ts` rather than moving it to `validators.test.ts`: it proves a `@orkestrel/tool` export, not a `src/core/validators.ts` one, and agent-obj-4's repair names only the `isConversationSnapshot` block.

### Orchestrator ruling on fix round 1's deviation (11:03 UTC)

Fix round 1's acceptance criterion 2 swept the whole of `tests/src/core/Agent.test.ts` where its Sites named four lines; the criterion was wider than the scope, and the scope is the ruling: the four unit-authored sites are cleared, and the seven pre-existing property-arrow sites the builder listed (`:549`, `:664`, `:744`, `:1902`, `:2506`, `:3046`, `:3726`) belong to the fleet-wide next-matrix row recorded in the campaign's follow-ons ledger, not to this unit. The `guides/agent.md` line delta the builder reported is the Errors table realigned by the formatter after the `because` edit widened a cell, plus the two rows O-1 prescribed; the Orchestrator's diff-of-diffs against the round-1 evidence shows no other guide line added or removed.
