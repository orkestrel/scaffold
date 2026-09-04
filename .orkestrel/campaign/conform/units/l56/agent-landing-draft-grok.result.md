I'll read the brief first and follow it exactly, staying read-only.Next I’ll read the example message, the agent report, and the unit brief so the draft matches the required shape.The report has no Fix round section. I’ll check sibling landing messages and the Rows, Breaking, and Consumer edits sections so the draft matches that voice.## agent

```
Conform agent to the fleet rules: override, all-succeed remove, fences

`InstructionInterface.format` and `InstructionInput.format` leave for `override`, the `ScopeManager` constructor takes `options?: ScopeManagerOptions` in place of `(on?, error?)`, and batch `remove` on `MessageManagerInterface`, `InstructionManagerInterface`, `ScopeManagerInterface`, `ConversationInterface`, and `ConversationManagerInterface` returns `false` for a batch that contains an absent key (each breaking, no fleet consumer). The `AgentError.code` member is `'CONCURRENCY' | 'REGISTRY'` and the registry accessors throw an `AgentError` carrying the `'REGISTRY'` code; the `status` getter returns `'running'` while the `#runs` field holds a run, and `#settled` otherwise; the `handleAgentQueueJob` helper takes a `QueueContext` parameter and passes the `context.signal` property into the `registry.build` method; the guide parity filter reads the `symbol.keyword` property; the `Agent` class exposes an `id` getter over the `#id` field; the fail-closed `#authorize` branch reads a reason through the `errorToMessage` helper; the `ScriptedProvider` class, the `chunkWholeDelta` helper, the `turnParts` helper, the `createSeededToolManager` factory, the `seedWorkspaceContext` factory, the `seedInstructionContext` factory, the `resolveSectionOpen` helper, the `resolveSectionRender` helper, and the `seedConversation` factory live in the `tests/setup.ts` module; the `isMessage`, `isSection`, and `isConversationSnapshot` guards have their mirror in the `tests/src/core/validators.test.ts` file; the guide's instructions, tool-dispatch, helper, and snapshot fences execute from `tests/guides.test.ts`; the `createScope` factory names the `instructions`, `tools`, and `files` allow-lists; the `AuthorityInterface.evaluate` method is synchronous and returns the verdict directly; the `rehydrate` method never reinserts; the Factories table, the Helpers table, and the narrowing-guard rows in the Errors table are noun phrases; the `AGENTS §` citations, the `via` sites, the `currently` sites, the `e.g.` abbreviations, the counts, the control identifiers, and the positional pointers leave the package's prose.

AUDIT-PARAGRAPH

```

Sources: `conform-agent-report.md` 7-12, 15-41, 137-147

## Unknowns

None.