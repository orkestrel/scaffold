## U2d report

Implemented the authority ordering fix and corrected the lede.

### Touched files

This unit changed:

- `src/core/Agent.ts` — evaluates authority and emits denials before the abort guard; passes computed authorization into dispatch.
- `tests/src/core/Agent.test.ts` — adds the denial-listener cancellation regression.
- `guides/agent.md` — restores budget signal composition and distinguishes provider bounds from handler cancellation.

### Red-then-green evidence

Test: **abort in a deny listener preserves only the prior conversation**

Exact command:

```text
npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t "abort in a deny listener preserves only the prior conversation"
```

- Red: exit **1**; **1 failed, 130 filtered/skipped**.
- Green: exit **0**; **1 passed, 130 filtered/skipped**.

The test asserts no tool chunk, no assistant-with-calls message, no tool message, `partial: true`, no handler entry, and exactly one denial event.

**waits for a tool that ignores its signal before settling a cancelled run** remains unchanged and passed in the core suite.

### Acceptance results

The executed checks returned:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run check` — initial | 0 | No diagnostics |
| `npm.cmd run format:check` | 0 | 87 files checked |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` — final | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 0 | 763 passed; 23 files |
| `npm.cmd run test:guides` | 0 | 45 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 54 passed |
| `git diff --check` | 0 | Clean |

The byte comparison returned `true`, exit **0**:

```text
node -e "const fs=require('node:fs');const equal=fs.readFileSync('guides/tool.md').equals(fs.readFileSync('../tool/guides/tool.md'));console.log('byte-identical:',equal);process.exitCode=equal?0:1"
```

### Diff and status

`git diff --stat main` includes inherited U2b/U2c edits:

```text
 guides/agent.md                                |  72 ++++++-
 guides/tool.md                                 | 257 ++++++++++++++++++------
 src/core/Agent.ts                              |  48 +++--
 src/core/providers/RelayProvider.ts            |   5 +-
 src/core/shapers.ts                            |  14 +-
 src/core/types.ts                              |   8 +
 tests/guides.test.ts                           |  63 ++++++
 tests/setup.test.ts                            |   4 +-
 tests/setup.ts                                 |   3 +
 tests/src/core/Agent.test.ts                   | 265 +++++++++++++++++++++++++
 tests/src/core/AgentContext.test.ts            |   8 +-
 tests/src/core/integration.test.ts             |  10 +-
 tests/src/core/providers/RelayProvider.test.ts |  11 +-
 tests/src/core/shapers.test.ts                 |   7 +-
 14 files changed, 675 insertions(+), 100 deletions(-)
```

`git status --porcelain` returned:

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

### Deviation state

The tool mirror matches the sibling checkout’s **working file** byte-for-byte. That upstream file is uncommitted and differs from committed `HEAD`; literal committed-tip parity is therefore unmet. The accepted working-file mirror was preserved. No other deviations.