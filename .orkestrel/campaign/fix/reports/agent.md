# Fix report: agent

## Dispositions

- **s08-12** deferred_breaking (src/core/types.ts): Renaming `ProviderDelta.type` to `channel` and `AgentChunk.type` to `category` renames published union discriminants every consumer switches on, so the rename is deferred whole. The finding's separable non-breaking half landed: the false-compliance clause `(AGENTS §4.4 — never \`kind\`)` is deleted from the `ProviderDelta` TSDoc, so no comment now claims conformance the rule text does not grant.
- **s08-13** deferred_breaking: `compactError` is a published `AgentEventMap` event name a consumer subscribes to by string; renaming it to `strain` breaks every `emitter.on('compactError', ...)` call. Nothing applied.
- **s08-14** deferred_breaking: `allowPartial` is a published option key on `AgentQueueOptions` and `AgentRunnerOptions`; renaming it to `partial` breaks every caller's options object. Nothing applied.
- **s08-15** applied (src/core/types.ts, guides/agent.md): Moved the agent-loop block from `AgentRunOptions` onto `AgentInterface` (adding one bullet naming the per-run override bag) and wrote `AgentRunOptions` its own description: a per-run override bag whose members each override the matching `AgentOptions` value for one run, with `signal` composing rather than replacing. Corrected the stale `AgentRunOptions` guide row, which still listed `{ think?: boolean }` alone.
- **s08-17** applied (src/core/validators.ts, src/core/helpers.ts, src/core/index.ts, src/core/conversations/stores/DatabaseConversationStore.ts, src/core/factories.ts, src/core/types.ts, guides/agent.md): Created `src/core/validators.ts`, moved `isMessage` / `isSection` / `isConversationSnapshot` there verbatim with their TSDoc, added `export * from './validators.js'` to the barrel, repointed the `DatabaseConversationStore` import and every `{@link import('./helpers.js')...}` reference, and added a `### Validators` guide section carrying the three rows out of `### Helpers`. The guard tests already live in `tests/src/core/conversations/stores/MemoryConversationStore.test.ts` and were left there rather than split into a new file.
- **s08-19** deferred_breaking: `fencedFile` is exported from `helpers.ts` through the `src/core` barrel, so it is a published symbol and renaming it to `renderFencedFile` breaks any consumer importing it. Nothing applied; the call site now reaches it from an inline callback rather than `AgentContext.#fenced` (see s08-21).
- **s08-20** applied (src/core/factories.ts, src/core/helpers.ts, src/core/conversations/stores/MemoryConversationStore.ts, src/core/conversations/stores/DatabaseConversationStore.ts, src/core/types.ts): Replaced every `from '@src/core'` in a TSDoc `@example` with `from '@orkestrel/agent'` (18 in factories.ts, one each in helpers.ts and the two stores), and the same prose reference in the `ContextFormatInterface` remarks. Four of those fences imported a sibling package's factory (`createMemoryDriver`, `createTokenBudget`, `createMemoryQueueStore`); those were split onto their real specifiers rather than being made unresolvable under the published one.
- **s08-21** applied (src/core/helpers.ts, src/core/types.ts, src/core/Agent.ts, src/core/AgentContext.ts, src/core/conversations/Conversation.ts, src/core/scopes/Scope.ts, tests/src/core/helpers.test.ts, guides/agent.md): Extracted the leaves both lane corrections name, as exported, TSDoc'd, unit-tested helpers: `joinThinking`, `sumUsage`, `assembleResult`, `denyCall`, `renderSection` (returning its joined string per the first lane's correction, not pushing into a caller array), `resolveOpen` / `resolveClose` / `resolveItem`, `attachImages`, `collectImageData`, `buildSummaryMessage`, `buildRecapMessage`, `intersectKeys`; added `ContextSectionSourceInterface<T>` to `types.ts` for the manager parameter the three cascade resolvers take, per the second lane's correction. `#fenced` folded into its caller as an inline callback and no `fencedFileOf` added (what both lanes share); `#reason` folded into `#authorize`. Names follow `.claude/rules/names.md` § Standalone helpers `{verb}{Noun}`, so the dossier's value-shaped `resultOf` / `withImages` / `imageDataOf` / `summaryMessageOf` / `recapMessageOf` became `assembleResult` / `attachImages` / `collectImageData` / `buildSummaryMessage` / `buildRecapMessage`. The keep-list is honoured.
- **s08-22** deferred_breaking: Both lane corrections require `CompactionState` to stop existing, and it is an exported type in the published `.d.ts` with a guide row, so removing it is breaking. The two corrections then conflict head-on on the replacement (hold the run state in `#run` and change `#trim`'s signature, versus name holders in `types.ts` and keep `#trim` unchanged), leaving no shared non-breaking remainder to apply. Nothing applied.
- **s08-23** deferred_breaking: Renaming `InstructionManagerInterface.description` to `open`, `format(instruction)` to `render(instruction)`, and `framing` to `format` or `override` renames published interface members that `AgentContext`, the guide fences, and any consumer manager implementation depend on. The lanes also disagree on the third rename. The private half of the repair is satisfied differently by s08-21: the cascade now resolves through `resolveOpen` / `resolveItem` / `resolveClose`, so `#header` / `#footer` / `#render` no longer exist under the old vocabulary.
- **s08-24** applied (src/core/types.ts, src/core/conversations/Conversation.ts, src/core/conversations/ConversationManager.ts, src/core/factories.ts, src/core/conversations/stores/MemoryConversationStore.ts, src/core/conversations/stores/DatabaseConversationStore.ts, tests/src/core/conversations/Conversation.test.ts, guides/agent.md): Added `readonly snapshot?: ConversationSnapshot` to `ConversationOptions`, had the constructor read it, moved `ConversationManager.add` onto the one options object, and replaced `seed` with the `snapshot` option throughout the TSDoc and guide prose; `createConversation(options)` can now hydrate, proven by two new tests. Collapsing the constructor to `constructor(options?)` removes a published positional parameter, so the positional `seed` stays and wins when both are supplied — that removal is deferred as breaking.
- **s08-26** applied (src/core/types.ts, src/core/Channel.ts, src/core/factories.ts, tests/src/core/factories.test.ts, guides/agent.md): Took the additive branch: declared `ChannelInterface<T>` (`push` / `close` / `fail` / `drain`) in `types.ts`, had `Channel<T>` implement it, added `createChannel<T>(): ChannelInterface<T>` to `factories.ts` with two tests, and documented both in the guide with a `#### ChannelInterface` methods table and a worked fence covering all four methods. The interning branch would have removed a barrelled export.
- **s08-27** applied (src/core/errors.ts, guides/agent.md): Added `readonly code: 'ABORT'` to `ProviderAbortError` and `readonly code: 'PARTIAL'` to `AgentJobError` with their TSDoc and guide rows, closing the rule's machine-readable-code gap additively. The other half is deferred: widening `AgentError.code` and having `AgentRegistry.#resolve` throw `AgentError('UNKNOWN', ...)` changes an observable runtime behaviour that the guide rows and the `@throws` tags currently pin as a bare `Error`.
- **s08-28** deferred_breaking: `ScopeConfiguration` is an exported type that `ScopeInput`, `ScopeInterface`, and `ScopeInterface.narrow`'s published signature all name; renaming it to `ScopeFilter` breaks any consumer that annotates with it. Nothing applied.
- **s08-29** deferred_breaking: `ConversationSummarizer` is an exported function type consumers annotate their summarizer with; renaming it to `ConversationSummaryHandler` breaks those imports. Nothing applied.
- **s08-30** deferred_wave: First-sentence TSDoc voice is the fleet's later dedicated wave, so no existing sentence was converted. Every sentence written or rewritten here for another reason uses the third-person form, and the three moved guard blocks were carried verbatim so the wave still finds them.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2903ms on 76 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no findings, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no diagnostics)
- npm run build: pass — vite build --config configs/src/vite.core.config.ts -> built in 2.89s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 603 passed (17 files); policy 111 passed; config 46 passed; setup 34 passed; guides 83 passed

## Diffstat

```text
 guides/agent.md                                    | 232 ++++++----
 src/core/Agent.ts                                  |  83 +---
 src/core/AgentContext.ts                           | 161 ++-----
 src/core/Channel.ts                                |   4 +-
 src/core/conversations/Conversation.ts             |  47 +-
 src/core/conversations/ConversationManager.ts      |  26 +-
 .../stores/DatabaseConversationStore.ts            |   9 +-
 .../stores/MemoryConversationStore.ts              |   4 +-
 src/core/errors.ts                                 |  11 +-
 src/core/factories.ts                              |  75 ++-
 src/core/helpers.ts                                | 502 ++++++++++++++++-----
 src/core/index.ts                                  |   1 +
 src/core/scopes/Scope.ts                           |  21 +-
 src/core/types.ts                                  | 149 ++++--
 tests/src/core/conversations/Conversation.test.ts  |  39 ++
 tests/src/core/factories.test.ts                   |  27 +-
 tests/src/core/helpers.test.ts                     | 291 +++++++++++-
 17 files changed, 1176 insertions(+), 506 deletions(-)

Untracked (not counted by `git diff --stat`): src/core/validators.ts, 110 lines added.
```

- dist moves: true

## Deviations

1) s08-21, genuinely conflicting lane detail, reported rather than silently resolved: the first lane extracts `#thought` and `#reason` as exported leaves, the second folds them into their callers. I applied what each lane's own criterion agrees on — `#thought` has two call sites, so it is duplicated and extracts as `joinThinking` under both readings; `#reason` has one call site and is a trivial one-liner, so it folded into `#authorize`. The first lane's "fold `#fenced` into `fencedFile` itself" is unreachable here because it changes a published signature, so `#fenced` folded into its caller instead — which is what both lanes share (no `fencedFileOf` added).

2) s08-21, ancillary naming decision recorded: the dossier's `resultOf`, `withImages`, `imageDataOf`, `summaryMessageOf`, `recapMessageOf`, and `appendSection` read as values or no longer describe the reshaped action, so they became `assembleResult`, `attachImages`, `collectImageData`, `buildSummaryMessage`, `buildRecapMessage`, and `renderSection` under `.claude/rules/names.md` § Standalone helpers (`{verb}{Noun}`), which outranks the dossier's suggested spelling.

3) s08-22, two lane corrections in direct conflict with no shared applicable remainder, plus a breaking prerequisite (deleting the exported `CompactionState`). Deferred whole; the finding needs a successor ruling on which shape wins before it can land.

4) Observation for a successor unit, outside this unit's scope: extracting `#withImages` leaves `AgentContext.#attach` reading no `#` field and calling no sibling, so the dossier's stated reason for keeping it as a method no longer holds. It is kept because the finding's keep-list names it; the leaf question about it is now open.

5) Coverage limit recorded, not a defect: `collectImageData`'s non-image branch cannot be exercised, because `@orkestrel/workspace`'s `BinaryMIME` union admits only image types. The test covers the text-file skip and the empty list.
