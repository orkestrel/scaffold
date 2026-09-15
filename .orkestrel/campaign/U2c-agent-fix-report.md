## Touched files

U2c changes:

- `src/core/Agent.ts` — guards before appending the assistant tool-call turn.
- `src/core/types.ts` — documents budget timing and cancellation behavior.
- `src/core/providers/RelayProvider.ts`, `src/core/shapers.ts` — correct execution-context comments.
- `guides/agent.md` — corrects cancellation wording, conversation shape, placement receipts, and handler signatures.
- `guides/tool.md` — refreshed by byte copy; verified byte-identical to the tool checkout.
- `tests/src/core/Agent.test.ts` — adds pre-dispatch and caller-identity coverage; strengthens signal assertions.
- `tests/src/core/integration.test.ts` — asserts tool-result content in the second provider request.
- `tests/guides.test.ts` — verifies the quoted placement test exists.
- `tests/setup.ts` — supplies authority cases and removes unused parameters.
- `tests/src/core/AgentContext.test.ts`, `tests/src/core/AgentRegistry.test.ts`, `tests/src/core/factories.test.ts` — removes unused handler parameters. The latter two finish unchanged against `main`.

Verification scripts are under `tmp/codex/U2c-*.mjs`. Existing U2b changes were preserved.

## Regression evidence

### Carrier 1

Test titles, each executed with authority `true` and `false`:

- `budget exhaustion before dispatch preserves only the prior conversation (authority: %s)`
- `external abort in a usage listener preserves only the prior conversation (authority: %s)`

Exact command:

```text
npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'budget exhaustion before dispatch|external abort in a usage listener'
```

Before the fix: exit **1**, **4 failed**. After the fix: exit **0**, **4 passed**.

### Carriers 5, 6, and 8

These mutation checks failed at the strengthened assertions. Every mutation was restored before the green run.

| Carrier | Test title | Red → green |
|---|---|---|
| 5 | `names placement proof locations and carries the cancellation fence lines` | Renamed receipt: 1 failed, 44 passed → 45 passed |
| 6 | `supplies no caller identity to a tool handler (authority: %s)` | Invented caller, authority true/false: 2 failed → 2 passed |
| 8 | `delivers the run deadline inside an authorized tool handler` | Substitute signal: 1 failed → 1 passed |
| 8 | `waits for a tool that ignores its signal before settling a cancelled run` | Omitted signal: 1 failed → 1 passed |
| 8 | `runs the agent tool loop in Node and feeds the result into the next provider turn` | Missing feedback: 1 failed → 1 passed |

The exact commands were:

```text
npm.cmd run test:guides
npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'supplies no caller identity'
npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'delivers the run deadline inside'
npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'waits for a tool that ignores'
npm.cmd run test:src:core -- tests/src/core/integration.test.ts -t 'runs the agent tool loop in Node'
```

Every red command exited **1**; its green rerun exited **0**.

## Acceptance

All required commands passed:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | No type errors |
| `npm.cmd run test:src:core` | 0 | 762 passed |
| `npm.cmd run test:guides` | 0 | 45 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 54 passed |
| `npm.cmd run format:check` | 0 | 87 files checked |
| `git diff --check` | 0 | No whitespace errors |
| `node tmp/codex/U2c-verify.mjs` | 0 | Mirror byte-identical; text-integrity check passed |

Whole-suite observation: `npm.cmd run test` exited **0**, with **1,123 passed and 2 skipped** across its projects. The skips are existing conditional policy/config cases.

## `git diff --stat main`

```text
 guides/agent.md                                |  72 ++++++-
 guides/tool.md                                 | 257 +++++++++++++++++++------
 src/core/Agent.ts                              |  16 +-
 src/core/providers/RelayProvider.ts            |   5 +-
 src/core/shapers.ts                            |  14 +-
 src/core/types.ts                              |   8 +
 tests/guides.test.ts                           |  63 ++++++
 tests/setup.test.ts                            |   4 +-
 tests/setup.ts                                 |   3 +
 tests/src/core/Agent.test.ts                   | 225 ++++++++++++++++++++++
 tests/src/core/AgentContext.test.ts            |   8 +-
 tests/src/core/integration.test.ts             |  10 +-
 tests/src/core/providers/RelayProvider.test.ts |  11 +-
 tests/src/core/shapers.test.ts                 |   7 +-
 14 files changed, 615 insertions(+), 88 deletions(-)
```

## `git status --porcelain`

```text
 M guides/agent.md
 M guides/tool.md
 M src/core/Agent.ts
 M src/core/providers/RelayProvider.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/Agent.test.ts
 M tests/src/core/AgentContext.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/providers/RelayProvider.test.ts
 M tests/src/core/shapers.test.ts
```

## Deviation state

None. Installed declarations matched the evidence. No off-limits files, dependencies, versions, or Git state were mutated.