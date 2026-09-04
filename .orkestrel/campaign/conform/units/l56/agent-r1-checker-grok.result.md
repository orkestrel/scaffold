I'll start by reading the brief in full, then follow its instructions exactly in read-only mode.I'll load the audit brief, unit brief, writer report, and evidence files next so I can check claims 1, 3, 5, 7, and 9 against the tree.I'll verify each held claim against the tree: row dispositions, old-name sweeps, guide parity, owned-file scope, and hidden residue.A leftover `InstructionInput.format` showed up; I’ll sweep renamed symbols, `§` citations, and the other held-claim surfaces next.## 1
CONFIRMED. Every row has tree evidence of applied, stopped, or noop; none is absent. obj-1 AgentRegistry.ts:137 `new AgentError('REGISTRY', …)`; obj-2 Agent.ts:111 `#settled` / :157 getter; obj-3 tests/guides.test.ts:180; obj-4 tests/src/core/validators.test.ts:1; obj-5 tests/setup.ts:171 `ScriptedProvider`; obj-6 tests/setup.ts:119 `export function turnParts`; obj-7 tests/setup.ts:628 `createSeededToolManager` (`makeTools` empty); obj-8 Agent.ts:688 `errorToMessage`; obj-9 STOPPED errors.ts:21 `readonly code = 'ABORT' as const`; obj-10 ScopeManager.ts:46 `constructor(options?: ScopeManagerOptions)`; subj-1 InstructionManager.ts:117 (and the other three) `let removed = true`; subj-3 factories.ts:281–282 `instructions` / `tools` / `files`; subj-4 `\bcurrently\b` empty in src/; subj-5 `§` empty in src/, tests/, guides/agent.md, guides/README.md, README.md; subj-6 `\bclause [0-9]+` empty; subj-7 `Create a fresh` empty; subj-12 `e.g.|i.e.|\bvia\b` empty in src/ and guides/agent.md; subj-13 `\bF[1-9]\b` empty in src/; subj-14 types.ts:283 `readonly override?: string`; F1 `isBrowserVuePath` empty; F2 Agent.ts:83 `#id` / :145 `get id()`.

## 2
not held

## 3
REFUTED. Renamed per-item member still appears as `InstructionInput.format` at src/core/instructions/InstructionManager.ts:31 (`{@link InstructionInput.format}`). Pattern `InstructionInput\.format` over src/, tests/, guides/agent.md, guides/README.md, README.md — that one hit. Clean: `#status` empty; `symbol.kind` empty; `\bQueueExecution\b` empty on those paths (only guides/queue.md, outside the bound); `item\.format|itemFormat|I\.format|InstructionInterface\.format` empty. Inflections `\bformats\b|\bformatted\b|\bformatting\b` hit English prose (types.ts:408, :751), not the member. Writer Sweeps table names src/, tests/, guides/agent.md, guides/README.md, README.md.

## 4
not held

## 5
CONFIRMED. `override` is on Types Surface guides/agent.md:531–532, matching types.ts:283,302. Method tables match call-signatures: InstructionManagerInterface guides/agent.md:621–626 vs types.ts:375–384; MessageManagerInterface :609–613 vs :250–256; ScopeManagerInterface :541 vs :579–585. Fences import `@orkestrel/agent` (guides/agent.md:21, :170); `@src/` empty in guides/agent.md. Transcriptions tests/guides.test.ts:180–260. `AGENTS §` empty in src/, tests/, guides/agent.md, guides/README.md. guides/README.md:3 dual-axis index; :105 authority pointer.

## 6
not held

## 7
CONFIRMED. conform-agent.diff `diff --git` headers and conform-agent.status list the same 40 paths, all under Owned (`src/**`, `tests/**` except the three vendored files, `guides/agent.md`, `guides/README.md`). No `package-lock.json`, `node_modules`, `package.json`, or other off-limits path. `export { … as … }` empty in src/. Instruction.ts:31 is `readonly override?: string` only — no `format` alias. factories.ts:322 `return new ScopeManager(options)` is the row’s pass-through, not a shim.

## 8
not held

## 9
CONFIRMED. `TODO` empty in src/, guides/agent.md, guides/README.md, and tests/ except untouched off-limits tests/setupPolicy.ts (not in the diff). `debugger` / `console.log` empty in src/. Diff adds no `.skip` / `.only` / `.todo` and no `PLANTED CONTROL`. Report disposition matches the tree: agent-obj-9 stopped at errors.ts:21 `as const`; fleet-F1 noop (`isBrowserVuePath` empty); remaining rows applied as in claim 1; 40 files match status.

## Findings outside the claims
none

## Referrals
1. Orchestrator: claim 3’s word-boundary `\bformat\b` still hits the manager/provider/options member (InstructionManager.ts:58 `#format`, :81 `get format()`). The rename was the per-item member. Does the empty-sweep requirement reach those homonyms, or only the qualified per-item forms?
2. Orchestrator: tests/setup.ts:442 still writes `summarize: async (messages) => …` as a property of the object passed to `createConversation` — the same nested-arrow-property form agent-obj-5 rewrote at tests/setup.ts:379. In-scope residue of that row, or a new row?

VERDICT: FAIL 3

## Journal
(leave for the driver)

## Deviation
none. Read-only; named evidence files opened; proof-file bodies unread (claim 4 not held).