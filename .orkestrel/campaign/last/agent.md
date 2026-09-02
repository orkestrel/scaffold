# Last changes: agent

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `a1e2d49`, merge base with `origin/main` `1ed2a86`, layer L5, declared version 0.0.19, registry version 0.0.19.

## Commits since origin/main

```text
04471ee 2026-08-28 Update every dependency to the published latest
92d46b2 2026-08-28 Adopt the catalog and guide mirrors for the wave
97791e0 2026-08-28 Apply the verified src-audit fixes
88d0fa0 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
9f9ada6 2026-09-01 Adopt the renamed guide helpers in the parity test
df12fab 2026-09-02 Name the agent's chunk and delta discriminants, settle the run through a returned outcome, and rename the instruction cascade
f0c4979 2026-09-02 Name the chunk category in the createAgent example and the consumer key in the budget prose
4df65d2 2026-09-02 Point the README at the guide the package ships
a1e2d49 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                                |  17 +-
 README.md                                                  |   8 +-
 package.json                                               |   6 +-
 src/core/Agent.ts                                          | 274 ++++++++----------
 src/core/AgentContext.ts                                   | 211 +++-----------
 src/core/AgentRegistry.ts                                  |   9 +-
 src/core/Authority.ts                                      |   8 +-
 src/core/Channel.ts                                        |   8 +-
 src/core/ThinkSplitter.ts                                  |   8 +-
 src/core/constants.ts                                      |  20 +-
 src/core/conversations/Conversation.ts                     | 103 +++----
 src/core/conversations/ConversationManager.ts              |  32 +--
 src/core/conversations/stores/DatabaseConversationStore.ts |  19 +-
 src/core/conversations/stores/MemoryConversationStore.ts   |   6 +-
 src/core/errors.ts                                         |  59 ++--
 src/core/factories.ts                                      | 133 +++++----
 src/core/helpers.ts                                        | 595 ++++++++++++++++++++++++++++++---------
 src/core/index.ts                                          |   1 +
 src/core/instructions/Instruction.ts                       |   6 +-
 src/core/instructions/InstructionManager.ts                |  22 +-
 src/core/scopes/Scope.ts                                   |  31 +--
 src/core/scopes/ScopeManager.ts                            |   4 +-
 src/core/types.ts                                          | 805 +++++++++++++++++++++++++++++------------------------
 src/core/validators.ts                                     | 108 +++++++
 tests/guides.test.ts                                       |  22 +-
 tests/setup.test.ts                                        |  22 +-
 tests/setup.ts                                             |  26 +-
 tests/src/core/Agent.test.ts                               | 169 +++++------
 tests/src/core/AgentContext.test.ts                        |  26 +-
 tests/src/core/Authority.test.ts                           |   7 +-
 tests/src/core/conversations/Conversation.test.ts          | 104 +++----
 tests/src/core/factories.test.ts                           |  55 +++-
 tests/src/core/helpers.test.ts                             | 366 +++++++++++++++++++++++-
 tests/src/core/instructions/InstructionManager.test.ts     |  28 +-
 tests/src/core/integration.test.ts                         |  12 +-
 35 files changed, 2018 insertions(+), 1312 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

The surface diff is 124900 bytes, past the 60000-byte cap; read it with `git -C /home/user/fleet/agent diff 1ed2a86..a1e2d49 -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'`. Per-file stat:

```text
 src/core/constants.ts |  20 +--
 src/core/errors.ts    |  59 ++++---
 src/core/index.ts     |   1 +
 src/core/types.ts     | 805 +++++++++++++++++++++++++++++++++++++++++++++++++-----------------------------------------
 4 files changed, 482 insertions(+), 403 deletions(-)
```
