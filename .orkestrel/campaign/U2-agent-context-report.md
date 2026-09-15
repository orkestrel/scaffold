## Result

Implemented U2b. Tool dispatch passes `abort.signal` through the authority and no-authority branches. All acceptance commands pass.

## Touched files

The changes are:

| File | Summary |
|---|---|
| `src/core/Agent.ts` | Passes the run signal into each tool execution. |
| `src/core/types.ts` | Documents cooperative cancellation and absent caller identity. |
| `src/core/providers/RelayProvider.ts` | Corrects the execution-context comment; preserves wire projection. |
| `tests/setup.ts` | Updates canonical tool handler signatures. |
| `tests/setup.test.ts` | Supplies context to direct tool executions. |
| `tests/src/core/Agent.test.ts` | Adds cancellation regressions and migrates handlers. |
| `tests/src/core/AgentContext.test.ts` | Migrates tool handler signatures. |
| `tests/src/core/AgentRegistry.test.ts` | Migrates tool handler signatures. |
| `tests/src/core/factories.test.ts` | Migrates tool handler signatures. |
| `tests/src/core/integration.test.ts` | Removes call-envelope caller and names the Node placement proof. |
| `tests/src/core/providers/RelayProvider.test.ts` | Tests projection of extra execution context. |
| `tests/src/core/shapers.test.ts` | Pins separate call/context types and wire exclusion. |
| `tests/guides.test.ts` | Executes the cancellation fence and checks placement references. |
| `guides/agent.md` | Documents placements, receipt locations, and handler cancellation. |
| `guides/tool.md` | Copies the landed upstream guide byte-for-byte. |

## Baseline and behavioural proofs

Baseline `npm.cmd run check` exited **2**, reporting **5 errors**:

- `tests/setup.test.ts`: 2 errors.
- `tests/src/core/integration.test.ts`: 1 error.
- `tests/src/core/providers/RelayProvider.test.ts`: 2 errors.

Baseline `npm.cmd run test:src:core` exited **0**: **753 passed across 23 files**.

The added behaviour is proved by these titles:

- `delivers agent abort inside the tool handler without authority`
- `delivers the run deadline inside an authorized tool handler`
- `waits for a tool that ignores its signal before settling a cancelled run`
- `observes cancellation inside the handler as the tool cancellation fence claims`

The regression command was:

```text
npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'delivers agent abort inside|delivers the run deadline inside|waits for a tool that ignores'
```

Before the fix: exit **1**, **2 failed, 1 passed**. After the fix: exit **0**, **3 passed**. Each run deselected 121 tests.

## Acceptance evidence

The final readings are:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run format:check` | 0 | 87 files checked |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root and core typechecks pass |
| `npm.cmd run test:src:core` | 0 | 756 passed; 23 files |
| `npm.cmd run test:guides` | 0 | 45 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 54 passed |
| `cmp guides/tool.md ../tool/guides/tool.md` | 0 | Byte-identical |
| `git diff --check` | 0 | Clean |

Whole-suite observation, `npm.cmd run test`: exit **0**, **1,117 passed, 2 skipped across 27 files**. Configuration retains the API Extractor TypeScript-version warning.

## Resolved unknown and deviation state

The resolved signal is the per-run abort handle’s signal. [Agent.ts:542](/C:/Users/mikes/WebstormProjects/agent/src/core/Agent.ts:542) contains:

```ts
const results = await this.#authorize(tools, result.tools, abort.signal)
```

No stopping deviation occurred. No off-limits files, dependencies, versions, or git state were mutated.

The guide explicitly marks the U5 Chromium proof titles as planned; it claims no passing Chromium receipt. The stale `ToolCall.caller` comment in `src/core/shapers.ts:20` remains outside Owned. Independent acceptance remains with the Orchestrator.

## `git diff --stat`

The final diff statistics are:

```text
 guides/agent.md                                |  84 ++++++--
 guides/tool.md                                 | 253 +++++++++++++++++++------
 src/core/Agent.ts                              |  11 +-
 src/core/providers/RelayProvider.ts            |   3 +-
 src/core/types.ts                              |   3 +
 tests/guides.test.ts                           |  58 +++++-
 tests/setup.test.ts                            |   4 +-
 tests/setup.ts                                 |   4 +-
 tests/src/core/Agent.test.ts                   | 186 +++++++++++++++---
 tests/src/core/AgentContext.test.ts            |  12 +-
 tests/src/core/AgentRegistry.test.ts           |   4 +-
 tests/src/core/factories.test.ts               |   6 +-
 tests/src/core/integration.test.ts             |   6 +-
 tests/src/core/providers/RelayProvider.test.ts |  11 +-
 tests/src/core/shapers.test.ts                 |   7 +-
 15 files changed, 525 insertions(+), 127 deletions(-)
```

## `git status --porcelain`

The final status is:

```text
 M guides/agent.md
 M guides/tool.md
 M src/core/Agent.ts
 M src/core/providers/RelayProvider.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/Agent.test.ts
 M tests/src/core/AgentContext.test.ts
 M tests/src/core/AgentRegistry.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/providers/RelayProvider.test.ts
 M tests/src/core/shapers.test.ts
```