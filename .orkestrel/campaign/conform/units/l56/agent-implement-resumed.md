Unit complete. Report written to `/home/user/scaffold/tmp/units/conform/conform-agent-report.md`; returned below.

# Unit conform-agent — report

Resumed from the interrupted first Opus unit. Every row is `applied` or `noop` except **agent-obj-9**, which is `stopped`: the repair the row prescribes is refused by the package's own `lint:check` gate. § Deviations carries the evidence.

Gate chain green: `format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0.

## Consumer edits taken

| # | Edit | Disposition | The line now |
| - | ---- | ----------- | ------------ |
| 1 | queue's `QueueExecution` → `QueueContext` | `applied` (carried by the interrupted tree, verified and extended) | `/home/user/fleet/agent/src/core/helpers.ts:14` reads `import type { QueueContext } from '@orkestrel/queue'`; `handleAgentQueueJob`'s parameter reads `context: QueueContext` and its body `registry.build(input, context.signal)`; the `@param` renamed to `context`. I extended it to the prose the interrupted tree missed: `src/core/factories.ts` (the `createAgentQueue` remark now reads "passes `context.signal` into `registry.build`") and `guides/agent.md`'s clauses 20 and 21 (`(input, context) =>` and `context.signal`). |
| 2 | guide's `symbol.kind` → `symbol.keyword` | `applied` (carried, verified) | `/home/user/fleet/agent/tests/guides.test.ts:120` reads `.filter((symbol) => symbol.keyword === 'function')`. `grep -rn 'symbol\.kind' tests/` exits 1. |
| 3 | workflow's landed renames | `noop` | The rename grep over `/home/user/fleet/agent` excluding `node_modules` returns hits only in `guides/workflow.md`, the vendored mirror refreshed at the wave. No `src/` or `tests/` consumer. The landed workflow report's § Shared-file patches names `@orkestrel/toolbox` alone. |

## Rows

`carried` marks a row the interrupted tree already held; `completed` marks one this resumption finished.

| Row | Disposition | State on resumption | Evidence |
| --- | ----------- | ------------------- | -------- |
| agent-obj-1 | `applied` | carried, complete | `errors.ts` widens `AgentError.code` to `'CONCURRENCY' \| 'REGISTRY'` on the field and the constructor parameter; `AgentRegistry.ts:130` imports `AgentError` from `'./errors.js'` and `#resolve` throws `new AgentError('REGISTRY', …)` with the message byte-identical. `types.ts` and the guide's registry clause say the accessors throw an `AgentError` carrying `code: 'REGISTRY'`. I extended it to `factories.ts`'s `createAgentRegistry` remark, which still cited the bare `Error`. |
| agent-obj-2 | `applied` | carried, **BROKEN** — `#status` renamed to `#settled` with no getter change and the three write sites untouched; the tree did not typecheck | Completed: `get status()` reads `this.#runs.size > 0 ? 'running' : this.#settled`; the `'running'` write deleted; both `finally` branches set `#settled`. Two regression cases added. |
| agent-obj-3 | `applied` | not started | `describe('flagship fences', …)` appended to `tests/guides.test.ts`, modelled on `/home/user/fleet/contract/tests/guides.test.ts:285-334`: the instructions fence, the tool-dispatch fence (`toEqual` on both `ToolResult`s), `sanitizeToken(12.7) === 12`, and `Object.keys(thread.snapshot())`, each with a `toContain` presence guard per claim-carrying line. |
| agent-obj-4 | `applied` | not started | `tests/src/core/validators.test.ts` created; the `isConversationSnapshot` block moved out of `MemoryConversationStore.test.ts` (the `§14` struck) plus direct `isMessage` / `isSection` cases. `MemoryConversationStore.test.ts` keeps only store behaviour and the `isToolCall` element guard. |
| agent-obj-5 | `applied` | not started | `export class ScriptedProvider implements ScriptedProviderInterface` in `tests/setup.ts` with the named `#` fields, readonly getters, `stream` / `generate` methods, and `#next()`. `createScriptedProvider` returns `new ScriptedProvider(…)`, so no consuming test changed. The `??` fallback is the module-scope `export function chunkWholeDelta`. `createStubSummarizer`'s `summarize:` arrow is now method syntax. |
| agent-obj-6 | `applied` | not started | `export` added to `turnParts` with TSDoc, and a `describe('turnParts', …)` driving both union arms. |
| agent-obj-7 | `applied` | not started | `createSeededToolManager`, `seedWorkspaceContext`, `seedInstructionContext`, `resolveSectionOpen`, `resolveSectionRender`, `seedConversation` promoted to `tests/setup.ts`; every local copy deleted; a `tests/setup.test.ts` case per factory. Two shaping decisions recorded under § Deviations. |
| agent-obj-8 | `applied` | not started | `Agent.ts` imports `errorToMessage` from `@orkestrel/workflow` and `#authorize` reads `const reason = errorToMessage(error)`. Two cases added. The row's `[object Object]` claim is false of the installed primitive — see § Deviations. |
| agent-obj-10 | `applied` | not started | `ScopeManager`'s constructor is `constructor(options?: ScopeManagerOptions)`, building the emitter as `InstructionManager.ts:61-64` does; `factories.ts:322` reads `return new ScopeManager(options)`; the three positional constructions in the test updated. BREAKING. |
| agent-subj-1 | `applied` | not started | All four array branches seed `true` and clear on a failed delete. Prose corrected across the guide's method rows and intros, the `types.ts` contracts, both class remarks, and the three `factories.ts` manager remarks; tests updated so a mixed batch expects `false` and each case adds an all-present batch expecting `true`. BREAKING behaviour. |
| agent-subj-3 | `applied` | not started | `createScope`'s TSDoc names `instructions` / `tools` / `files` (the phantom `messages` gone) and drops the count; counts dropped and members named at `ScopeFilter`, `ScopeInterface`, `ScopeManagerInterface`, `ContextSectionFormat`, and nine guide sites. |
| agent-subj-4 | `applied` | not started | The speculative-handshake, "seam for richer policy inputs later", `v1 never auto-reinserts`, `currently`, and "a future tier can thread it" clauses cut at every named site in `types.ts`, `factories.ts`, `Authority.ts`, `Agent.ts`, `Conversation.ts` (including `:251`, the refuter's addition), and mirrored in the guide. |
| agent-subj-5 | `applied` | partially started | Every `§` token gone from the package's own files. `guides/agent.md:1139` and `guides/README.md:105` rewritten to name what the reader can reach; `guides/README.md:3` corrected; the three sites copying a repository coding rule into a consumer-facing guide state the behaviour instead. |
| agent-subj-6 | `applied` | not started | Every `clause N` reference replaced by the item's own subject; `Agent.ts:376` / `:564` name the futile-compaction guard with no cross-reference; `types.ts:685` ends at "for CONCURRENT threads use separate agents." The list keeps its numbering. |
| agent-subj-7 | `applied` | not started | Every imperative row of the Factories and Helpers tables rewritten as a noun phrase, plus the four `is*` rows in the Errors table. The Validators rows and the Errors class rows stand, per the refuter's two corrections. |
| agent-subj-12 | `applied` | not started | Sweep below, over the bound the row names. |
| agent-subj-13 | `applied` | partially started | `errors.ts` carries no control identifier; every `F<n>` / `§F<n>` / `§ auto-compact` / `Ch5` / `v1` token in `Agent.ts` replaced by the behaviour it names. Bound extended — see § Deviations. |
| agent-subj-14 | `applied` | not started | Per-item member renamed `format` → `override` across `types.ts`, `helpers.ts` (`resolveItem<T extends { readonly override?: string }>`, `item.override ??`), `Instruction.ts`, `factories.ts`, `AgentContext.ts`, the guide's cascade prose and Types rows, and four test files. `override` collides with no existing member. BREAKING. |
| **agent-obj-9** | **`stopped`** | carried | Refused by `npm run lint:check`. Reverted to the baseline `as const` so the chain closes. § Deviations. |
| fleet-F1 | `noop` | — | `grep -rn 'isBrowserVuePath' /home/user/fleet/agent` excluding `node_modules` returns no match; the workspace has no browser environment (`src/` holds only `core`, no `app/`, no `tests/setupBrowser.ts`). |
| fleet-F2 | `applied` | carried, **BROKEN** — `readonly #id: string` declared and assigned with no `id` getter, so `Agent` did not implement `AgentInterface` | Completed: `get id(): string { return this.#id }` as the first getter, `readonly #id: string` as the first `#` field. Pre-check per the ruling: no `JSON.stringify` of an `Agent` instance exists in the package. `Scope` and `Instruction` also carry a public `readonly id: string` but have no `#` fields at all, so the trigger does not fire on them. |

## Diffstat

`git diff HEAD --stat`: **40 files changed, 1499 insertions(+), 875 deletions(-)**.

## Failing-first controls

Each planted the pre-repair behaviour, ran the command, and was removed before the green run. `grep -rn "PLANTED CONTROL" src/ tests/` exits 1. Files in `/home/user/work/evidence/agent-proofs/`.

| Row | Command | Red | Green |
| --- | ------- | --- | ----- |
| agent-obj-1 | `vitest … --project src:core tests/src/core/AgentRegistry.test.ts` | 1 failed \| 34 passed | 35 passed |
| agent-obj-2 | `vitest … tests/src/core/Agent.test.ts` | 4 failed \| 116 passed | 120 passed |
| agent-obj-3 | `npm run test:guides` | 1 failed \| 90 passed | 91 passed |
| agent-obj-4 | `vitest … tests/src/core/validators.test.ts` | 3 failed \| 8 passed | 11 passed |
| agent-obj-5 | `npm run test:setup` | 1 failed \| 43 passed | 44 passed |
| agent-obj-6 | `npm run test:setup` | 7 failed \| 37 passed | 44 passed |
| agent-obj-7 | `npm run test:setup` | 6 failed \| 38 passed | 44 passed |
| agent-obj-8 | `vitest … tests/src/core/Agent.test.ts` | 2 failed \| 118 passed | 120 passed |
| agent-obj-10 | `vitest … ScopeManager.test.ts factories.test.ts` | 3 failed \| 58 passed | 61 passed |
| agent-subj-1 | `vitest …` over the four manager suites | 4 failed \| 123 passed | 127 passed |
| agent-subj-14 | `vitest … helpers.test.ts AgentContext.test.ts InstructionManager.test.ts` | 4 failed \| 211 passed | 215 passed |

## Sweeps

Every sweep excluded the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, and every `guides/<dependency>.md` mirror.

| Sweep | Pattern | Paths | Result |
| ----- | ------- | ----- | ------ |
| agent-subj-5 | `§` | `src/`, `tests/`, `guides/agent.md`, `guides/README.md`, `README.md` | empty (exit 1) |
| agent-subj-6 | `\bclause [0-9]+` | same | empty (exit 1) |
| agent-subj-13 | `\bF[1-9]\b\|Ch[0-9]\|\bv1\b\|ASI0[0-9]\|§` | same | two hits, both permitted: `InstructionManager.test.ts:67` and `:236` use `content: 'v1'` as fictional instruction data |
| agent-subj-12 | `e\.g\.\|i\.e\.\|\bvia\b\|\betc\.\|\bsimply\b\|\bjust\b\|in order to\|and/or\|\bcurrently\b`, case-insensitive | `src/**`, `guides/agent.md`, `guides/README.md`, `README.md` (the bound the row names) | one hit, permitted: `guides/agent.md:81` is the fence data literal `content: 'Reply with just the number.'`. `tests/**` sits outside this row's bound and still carries hits |
| agent-subj-3 words | number word + set noun, case-insensitive | `src/`, guide docs | 18 hits, each ruled permitted — `one section` / `one list` / `one level` / `one member` state a quantity of the operation; `two surfaces` names its members in the same sentence |
| agent-subj-3 numerals | `\b[0-9]+ (elements\|members\|…\|categories)\b` | same | empty (exit 1) |
| agent-subj-14 old name | `item\.format\|itemFormat\|I\.format\|instruction\.format\|readonly format?: string\|per-item \`format\`` | `src/`, `tests/`, guide docs | empty (exit 1). `format` survives only where it names a `ContextSectionFormat` |
| addendum 1 | `QueueExecution` | `src/`, `tests/`, `guides/agent.md` | empty (exit 1) |
| addendum 2 | `symbol\.kind` | `tests/` | empty (exit 1) |

## Gates

| Gate | Exit | Reading |
| ---- | ---- | ------- |
| `npm run format:check` | 0 | "All matched files use the correct format." over 77 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | both `tsc --noEmit` invocations silent |
| `npm run build` | 0 | 22 modules transformed; `dist/src/core/index.cjs` 138.41 kB; `index.d.ts` copied to `index.d.cts` |
| `npm test` | 0 | `src:core` 18 files / 618; `policy` 1 / 111; `config` 1 / 46; `setup` 1 / 44; `guides` 1 / 91 |

`git status --short` lists 40 paths, every one under Owned. Evidence files produced with `node /home/user/scaffold/tmp/work/evidence.mjs agent`: `/home/user/work/evidence/conform-agent.diff` (5136 lines), `/home/user/work/evidence/conform-agent.status` (40 entries).

**Observation, not a criterion.** The `npm test` reading ran inside this unit's own exec with its harness resident. Take the deciding run after the unit exits.

## Breaking

No fleet code consumer exists for any of the three; each break reaches an external consumer only. No consumer edits obliged.

| Row | Moved | Fleet consumers |
| --- | ----- | --------------- |
| agent-obj-10 | `ScopeManager`'s constructor `(on?, error?)` → `(options?: ScopeManagerOptions)` | none; the class is reached only through `createScopeManager`, whose signature is unchanged |
| agent-subj-14 | `InstructionInterface.format` / `InstructionInput.format` → `override` | none; no fleet package sets the per-item member |
| agent-subj-1 | `remove(ids[])` returns `false` where it returned `true` for a batch containing an absent key, on `MessageManagerInterface`, `InstructionManagerInterface`, `ScopeManagerInterface`, `ConversationInterface`, `ConversationManagerInterface` | none; obliges a release note and no consumer patch |

## Shared-file patches

None.

## Deviations

### 1. agent-obj-9 — `stopped`. The ruled repair is refused by the package's own lint gate.

**Expected.** `src/core/errors.ts:21` reads `readonly code: 'ABORT' = 'ABORT'` and `:76` reads `readonly code: 'PARTIAL' = 'PARTIAL'`, with `npm run lint:check` exiting 0 (acceptance criterion 2).

**Found.** Incompatible. With the ruled form in place:

```
$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

src/core/errors.ts:21:17: error typescript(prefer-as-const): Expected a `const` assertion instead of a literal type annotation. help: You should use `as const` instead of type annotation.
src/core/errors.ts:76:17: error typescript(prefer-as-const): Expected a `const` assertion instead of a literal type annotation. help: You should use `as const` instead of type annotation.
EXIT=1
```

`npm run lint` (the mutating converge step) rewrites both lines back to `as const` on its own. That is how I found it — the interrupted tree had the repair applied and unlinted, and this resumption's first `npm run lint` silently reverted it.

**Done or not done.** Not done, reverted to the baseline `as const`; `lint:check` then exits 0. Every other row is applied and every gate green with the revert in place.

**Hypothesis.** The refuter read `.claude/rules/typescript.md` § Types' "Do not write it on a value whose contract is already declared" as reaching a single-literal class field, but neither `ProviderAbortError` nor `AgentJobError` implements an interface declaring `code`, so the clause's trigger may not fire — and the repository's own instrument reads it the other way. The fleet-wide `readonly code` unanimity the refuter cites is consistent: every sibling's `code` is a union of two or more literals, where `prefer-as-const` does not fire, so no sibling ever had to choose.

**The Orchestrator's decision.** Either the rule sentence needs the exemption stated, or `.oxlintrc.json` needs `typescript/prefer-as-const` disabled — off-limits for this unit and fleet-wide in effect. I made neither change.

### 2. agent-obj-8 — one of the row's added assertions is false of the installed primitive.

I ran the primitive rather than reasoning about it. `node_modules/@orkestrel/workflow/dist/src/core/index.js:807`:

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

`errorToMessage({ code: 'X' })` returns `'[object Object]'`, exactly as the raw extraction does. The primitive fixes the empty-message case and the throwing-stringification case; it does not fix `[object Object]`. The row's primary objective is fully applied; I wrote the two cases to the guarantees the primitive actually carries, and the control (`agent-obj-8-control.txt`) shows both defects red against the raw form — an empty `Error` yielding `'denied: '`, and a null-prototype throw escaping the fail-closed gate with `TypeError: Cannot convert object to primitive value` that rejects the whole run. Carried on rather than stopped: none of the four deviation triggers fires.

### 3. agent-obj-7 — two shaping decisions.

The operative form names one `seedWorkspaceContext(options?: { images?: boolean })` replacing `AgentContext.test.ts:585`, `:654`, and `:765`. Those fixtures build materially different contexts, and `:765` has no workspace at all, so one form cannot serve it. I promoted `seedWorkspaceContext()` (serving `:585` and `:654`) and `seedInstructionContext()` (serving `:765`), and dropped the named `{ images?: boolean }` option because nothing consumes it, which `AGENTS.md` § Design laws forbids.

Second: `withCalls` moved to module scope in the new `validators.test.ts` rather than travelling "unchanged", because planting a nested function in a file I author violates the no-nested-functions law. A module-scope arrow assignment in a test file is the established shape (`MemoryConversationStore.test.ts:16`).

### 4. agent-subj-13 — sweep bound extended.

agent-subj-5's `§` sweep reached `tests/**` and surfaced the same class of unresolvable control identifier there (`F1`–`F6` describe titles, `Ch5` / `Ch7`, `ASI06`, `v1`). Leaving them would have left the sweep dirty, so I cleared them under the same rule — for example `describe('Agent - F1 limit exhaustion')` → `describe('Agent — limit exhaustion')`.

### Ancillary questions decided and carried on from

New test case names; where the two `status`-derivation cases sit; where the `flagship fences` block sits; which noun-phrase form each Helpers row takes; and keeping the `isToolCall` block in `MemoryConversationStore.test.ts` (it proves a `@orkestrel/tool` export, not a `validators.ts` one).
