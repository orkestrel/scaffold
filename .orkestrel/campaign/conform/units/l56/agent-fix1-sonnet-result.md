## Deviation report

**Expected:** Per the brief's § Sites and edits ("Referral 2 and R-1"), only `tests/setup.ts:442`, `tests/setup.ts:738`, `tests/src/core/Agent.test.ts:1953`, and `tests/src/core/Agent.test.ts:1998` are named as property-arrow sites to convert to method syntax, and § Scope names only those lines as owned in `tests/src/core/Agent.test.ts`. Acceptance criterion 2 requires `grep -nE 'summarize: async|render: \(\) =>|match: \(\) =>' tests/setup.ts tests/src/core/Agent.test.ts` to return nothing.

**Found:** `tests/setup.ts` is clean. `tests/src/core/Agent.test.ts` still matches the pattern at seven sites the brief's Sites list does not name: `match: () => true` at line 549, 664, 744; `match: () => {` at line 1902 and 2506; `summarize: async () => {` at line 3046 and 3726.

**Evidence:**
```
tests/src/core/Agent.test.ts:549:			rules: [{ match: () => true, zone: 'restricted', allowed: false }],
tests/src/core/Agent.test.ts:664:			rules: [{ match: () => true, zone: 'restricted', allowed: false, reason: 'all blocked' }],
tests/src/core/Agent.test.ts:744:				rules: [{ match: () => true, zone: 'r', allowed: false, reason: 'no' }],
tests/src/core/Agent.test.ts:1902:					match: () => {
tests/src/core/Agent.test.ts:2506:					match: () => {
tests/src/core/Agent.test.ts:3046:			summarize: async () => {
tests/src/core/Agent.test.ts:3726:			summarize: async () => {
```

**Done / not done:** All named edits (claim 3, claim 4 sweep, O-1, O-2, O-3, R-1 at the four named sites, R-3 sweep) are complete and gate-green. Acceptance criterion 2, as literally written, does not close: it requires zero hits across the whole file, but § Sites and § Scope authorize edits at only two `Agent.test.ts` line numbers, both of which are already fixed and confirmed clean.

**Hypothesis:** The brief's Sites list under-scoped `Agent.test.ts` relative to its own acceptance criterion 2, which was likely intended to cover every remaining property-arrow site in that file, not only the two named.

---

## Edits (file:line, before → after)

- `src/core/instructions/InstructionManager.ts:31`: `` {@link InstructionInput.format} `` → `` {@link InstructionInput.override} ``
- `src/core/AgentContext.ts:181`: `` no per-item format `` → `` no per-item `override` ``
- `tests/src/core/factories.test.ts:298`: `` `execution.signal` (build(input, execution.signal)) `` → `` `context.signal` (build(input, context.signal)) ``
- `tests/src/core/AgentContext.test.ts:922` (found during the claim 4 sweep, matching the acceptance-criterion-1 pattern `per-item .{0,3}format`): `per-item format` → `per-item override`
- `tests/setup.ts:442`: `summarize: async (messages) => \`recap(...)\`` → method syntax `async summarize(messages) { return \`recap(...)\` }`
- `tests/setup.ts:738` (originally line 738, shifted after the earlier edit): `{ format: { render: () => managerRender } }` → `{ format: { render() { return managerRender } } }`
- `tests/src/core/Agent.test.ts:1953`: `match: () => { throw new Error('') }` → `match() { throw new Error('') }`
- `tests/src/core/Agent.test.ts:1998`: `match: () => { throw hostile }` → `match() { throw hostile }`
- `guides/agent.md:1122` (`MemoryConversationStore.test.ts` row): cut the `isConversationSnapshot` guard clause; the row now describes only the `isToolCall` per-call guard the file actually tests.
- `guides/agent.md:1123` (new row added): `tests/src/core/validators.test.ts` row naming `isMessage`, `isSection`, and `isConversationSnapshot`, describing each guard from the file's `it` titles. `tests/guides.test.ts` carries no transcription of the edited row, so no companion edit was needed there.
- `tests/setup.ts:77-78`: `` `format` — a provider-default {@link ContextFormat}, included on the provider ONLY when supplied (omitted ⇒ framing-agnostic, like the live OllamaProvider). `` → `` `format` — a provider-default {@link ContextFormat}; `undefined` when unset, so an agnostic provider reports no framing. ``
- `guides/agent.md:512`: `since generate() calls stream() directly...` → `because generate() calls stream() directly...`

## Sweeps

- **Claim 4** — `grep -rnE 'InstructionInput\.format|InstructionInterface\.format|item\.format|per-item .{0,3}format' src/ tests/ guides/agent.md guides/README.md README.md` (minus vendored): one hit, `tests/src/core/AgentContext.test.ts:922`, ruled a genuine leftover of the per-item rename and rewritten (see Edits). `grep -rniE '\bexecution\b'` over the same paths: every hit is the English word `execution` (tool execution, fail-closed on execution) — permitted, no rewrite. Homonym ruling: `\bformat\b` in `InstructionManager.ts` at the manager/provider/options level (`#format` field, `get format()`, `InstructionManagerOptions.format`, lines 27, 58, 65, 78, 81, 84, 108) are `ContextSectionFormat` homonyms of the renamed per-item `override` member — stay.
- **R-3** — `grep -roiE '\b(one|two|...|ten)\b' src/ guides/agent.md guides/README.md README.md`: 397 word-level hits. Categorized: the overwhelming majority are the indefinite article "one" (grammatically required, not a stated count of a growable set). The remaining small-number hits (`two`, `three`, `four`) each name a fixed structural fact whose members the sentence names in place — for example "the two build-contract members ... `open` ... `render`", "carries three optional per-category lists ... `instructions` ... `tools` ... `files`", "TWO summarizer calls per compaction (the section digest ..." — none refers to a growable set from the banned list (rules, rows, members, exports, files, options, steps, cases, stages, findings, tests) without naming its members alongside. Ruling: every hit permitted; no rewrite required.

## `git status --short`

```
 M guides/README.md
 M guides/agent.md
 M src/core/Agent.ts
 M src/core/AgentContext.ts
 M src/core/AgentRegistry.ts
 M src/core/Authority.ts
 M src/core/Channel.ts
 M src/core/ThinkSplitter.ts
 M src/core/constants.ts
 M src/core/conversations/Conversation.ts
 M src/core/conversations/ConversationManager.ts
 M src/core/conversations/stores/DatabaseConversationStore.ts
 M src/core/conversations/stores/MemoryConversationStore.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/instructions/Instruction.ts
 M src/core/instructions/InstructionManager.ts
 M src/core/scopes/Scope.ts
 M src/core/scopes/ScopeManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/Agent.test.ts
 M tests/src/core/AgentContext.test.ts
 M tests/src/core/AgentRegistry.test.ts
 M tests/src/core/conversations/Conversation.test.ts
 M tests/src/core/conversations/ConversationManager.test.ts
 M tests/src/core/conversations/stores/DatabaseConversationStore.test.ts
 M tests/src/core/conversations/stores/MemoryConversationStore.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/instructions/Instruction.test.ts
 M tests/src/core/instructions/InstructionManager.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/scopes/Scope.test.ts
 M tests/src/core/scopes/ScopeManager.test.ts
 A tests/src/core/validators.test.ts
```

Note: `guides/agent.md` shows a large diff by line count because `npm run format:check` reddened on it (pre-existing drift), and the brief's allowed-command list includes the mutating `npx oxfmt --config .oxfmtrc.json <file>` form, which `AGENTS.md` names as the standard convergence step before the non-mutating gate. Content is unchanged in meaning; the tool also applied the project's own prose substitutions (`via`→`through`, `i.e.`→`that is`) and dropped stale clause-number cross-references.

## Gate and scoped-run exit codes

- `npm run format:check`: 0
- `npm run lint:check`: 0
- `npm run check`: 0
- `npm run test:setup`: 0 (44 tests passed)
- `npm run test:guides`: 0 (91 tests passed)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Agent.test.ts`: 0 (120 tests passed)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts`: 0 (46 tests passed)
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/AgentContext.test.ts` (run because that file was edited during the claim 4 sweep): 0 (93 tests passed)
