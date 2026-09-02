# Unit breaking-agent — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **referral s18 ProviderDelta** — applied: Closed as satisfied by s08-12, the sole carrier of ProviderDelta.type -> channel.
- **s08-12** — applied: ProviderDelta.type -> channel and AgentChunk.type -> category at src/core/types.ts:97-99 and :790-794 with the discriminant TSDoc rewritten; Agent.#provide / #run yields and reads; the factories.ts @example; every guide fence and Types row; the README fence; 82 test-side sites.
- **s08-13** — applied: AgentEventMap.compactError -> fault carrying [error: unknown]; TSDoc states the run still settles through finish (lenient) or error (strict). Stop condition checked: AgentEventMap carried no fault member.
- **s08-14** — applied: allowPartial -> partial on AgentQueueOptions and AgentRunnerOptions and on the settleAgentJob / handleAgentQueueJob / handleAgentRunnerJob parameter; @throws and @param reworded so the policy reads apart from result.partial.
- **s08-19** — applied: fencedFile -> renderFencedFile in helpers.ts, its @example, both AgentContext.build call sites, the guide Helpers row and cascade sentence, the helpers test.
- **s08-22** — applied: CompactionState deleted; #run holds content/thinking/usage/partial/exhausted/futile as locals and returns the settled RunOutcome; #pump drives the generator by hand and reads the return; #trim(messages, latch) returns whether to latch futile; the { outcome } box in stream() is gone; RunOutcome TSDoc describes a returned value.
- **s08-23** — applied: description -> open, format(item) -> render(item), then framing -> format on InstructionManagerInterface, ContextSectionSourceInterface, the InstructionManager class, resolveOpen / resolveClose / resolveItem, both guide Methods tables, the Types rows, the cascade prose, the instructions fence.
- **s08-28** — applied: ScopeConfiguration -> ScopeFilter on the type and at ScopeInput, ScopeInterface, ScopeInterface.narrow, Scope.narrow, the guide row.
- **s08-29** — applied: ConversationSummarizer -> ConversationSummaryHandler across types.ts, Conversation, ConversationManager, errors.ts, factories.ts, tests/setup.ts, the guide; the summarize option key stands.
- **s08-16 (audit carrier)** — applied: MessageInterface -> Message, ContextFormatInterface -> ContextFormat, AuthorityContextInterface -> AuthorityContext, SectionInterface -> Section; InstructionInterface stays (Instruction is the class); no collision (each target had zero declarations and is no lib global under ESNext + WebWorker).
- **s08-24 (audit carrier)** — applied: Conversation's constructor is constructor(options?: ConversationOptions); the positional seed, the seed ?? options?.snapshot precedence line, and its TSDoc paragraph deleted; ConversationManager.add already passed snapshot in the options object.
- **s08-21 (audit carrier)** — applied: AgentContext.#attach fails the leaf test after the fix-round extraction, so it left the class as the exported helper attachUserImages(conversation, data) in helpers.ts beside attachImages, with TSDoc, a guide row, and five unit tests.
- **report amendment (relabel s08-12)** — applied: Applied by the Orchestrator to .orkestrel/campaign/fix/reports/agent.md from the returned patch.
- **carry: workflow, workspace, budget** — applied: createDeferred and DeferredInterface gone: Agent.stream uses Promise.withResolvers<AgentResult>() and #pump takes PromiseWithResolvers<AgentResult>; FileContent binary arm: collectImageData reads file.content.base64 and the prose names the base64 payload; BudgetOptions.consume is consumer in the context-window fixture, two guide fences, and four prose sentences (the consume METHOD references stand).

## Symbols moved

- ProviderDelta.type -> channel
- AgentChunk.type -> category
- AgentEventMap.compactError -> fault
- AgentQueueOptions.allowPartial -> partial
- AgentRunnerOptions.allowPartial -> partial
- settleAgentJob / handleAgentQueueJob / handleAgentRunnerJob parameter allowPartial -> partial
- fencedFile -> renderFencedFile
- CompactionState -> removed
- InstructionManagerInterface.description -> open; .framing -> format; .format(instruction) -> render(instruction) (and the class)
- ContextSectionSourceInterface.description -> open; .framing -> format; .format(item) -> render(item)
- ScopeConfiguration -> ScopeFilter
- ConversationSummarizer -> ConversationSummaryHandler
- MessageInterface -> Message
- ContextFormatInterface -> ContextFormat
- AuthorityContextInterface -> AuthorityContext
- SectionInterface -> Section
- Conversation constructor (options?, seed?) -> (options?)
- attachUserImages -> added (helpers)
- Agent.#run returns RunOutcome; Agent.#trim(messages, latch) returns boolean
- upstream adoption: workflow createDeferred -> Promise.withResolvers; workspace FileContent.data -> base64; budget BudgetOptions.consume -> consumer

## Files touched

- src/core/types.ts
- src/core/Agent.ts
- src/core/AgentContext.ts
- src/core/helpers.ts
- src/core/instructions/InstructionManager.ts
- src/core/conversations/Conversation.ts
- src/core/conversations/ConversationManager.ts
- src/core/factories.ts
- src/core/scopes/Scope.ts
- src/core/{validators,errors,constants,Authority,AgentRegistry}.ts
- guides/agent.md
- README.md
- tests/setup.ts
- tests/setup.test.ts
- tests/src/core/{Agent,AgentContext,Authority,factories,helpers,integration}.test.ts
- tests/src/core/instructions/InstructionManager.test.ts
- tests/src/core/conversations/Conversation.test.ts

## Tests changed

- added: helpers.test.ts describe attachUserImages (five cases)
- changed: InstructionManager, AgentContext, helpers, Agent, setup, factories, integration, Conversation tests onto the renamed surface; the hydrate describe onto { snapshot }
- removed: two positional-seed hydrate tests duplicating the options-seam tests; the unique round-trip assertion folded into the survivor
- counts: src:core 603 -> 606
- failing-first: attachUserImages mutation probe — npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts: 1 failed | 96 passed with the loop walking forward (helpers.test.ts:770), 97 passed restored

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 3184ms on 76 files using 4 threads.
- `npm run lint:check` → exit 0 — no findings
- `npm run check` → exit 0 — no diagnostics
- `npm run build` → exit 0 — Declaration files built in 2700ms; built in 3.25s
- `npm test` → exit 0 — src:core 606 passed (17 files); policy 111; config 46; setup 34; guides 83

## Diff stat

```text
26 files changed, 764 insertions(+), 765 deletions(-)
```

Status at return (writer's reading): `26 modified files; nothing off-limits; git diff --check exit 0`
Built `dist/` moves: yes

## Observations

- the AgentEventMap Types row omitted exhaust (pre-existing); added in place while the row was rewritten for fault
- README.md links guides/src/agent.md, guides/src/tool.md, guides/src/workspace.md (the readme-links sweep)
- test:distribution not run per the brief
- no timing-suspect failure (about 9 s wall clock)
- InstructionManagerInterface.format (the raw override) sits beside InstructionManagerOptions.format (the option) and InstructionInterface.format (the per-item string) on different entities with different types, as ruled

## Deviations

- attachUserImages named under {verb}{Noun}; composes rather than delegates
- #trim parameter latch rather than latchFutile since the method returns the latch
- two duplicated hydrate tests deleted with their unique assertion folded in
- #pump seeds a local RunOutcome with the empty run value so the settle path stays total

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/agent.diff`,
`tmp/units/breaking/agent.status`.
