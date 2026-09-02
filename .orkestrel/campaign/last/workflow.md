# Last changes: workflow

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `6f99184`, merge base with `origin/main` `d4df9ff`, layer L4, declared version 0.0.16, registry version 0.0.16.

## Commits since origin/main

```text
091bf42 2026-08-28 Update every dependency to the published latest
716a5e8 2026-08-28 Adopt the catalog and guide mirrors for the wave
5de2646 2026-08-28 Apply the verified src-audit fixes
4aba558 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
0e9babf 2026-09-01 Adopt the renamed guide helpers in the parity test
bcf8ab4 2026-09-02 Settle the workflow runner through Result, intern the entity classes, and name the task behavior
9f00455 2026-09-02 Scan the snapshot context, intern the run holder, and state the stored-snapshot break
df98381 2026-09-02 Point the README at the guide the package ships
6f99184 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                         |  17 +-
 README.md                                           |   2 +-
 package.json                                        |   6 +-
 src/browser/BrowserScheduler.ts                     |  33 +--
 src/browser/FrameScheduler.ts                       |  33 +--
 src/browser/IdleScheduler.ts                        |  43 ++-
 src/browser/constants.ts                            |   2 +-
 src/browser/factories.ts                            |  14 +-
 src/browser/types.ts                                |   4 +-
 src/core/Collection.ts                              | 146 ++++++++++
 src/core/Controller.ts                              |   4 +-
 src/core/RunHolder.ts                               |  44 ++++
 src/core/Runner.ts                                  | 113 ++++----
 src/core/Scheduler.ts                               |  33 +--
 src/core/Workflow.ts                                |  44 ++--
 src/core/WorkflowManager.ts                         |  42 ++-
 src/core/WorkflowPersistence.ts                     |  72 ++---
 src/core/WorkflowRunner.ts                          | 301 ++++++++-------------
 src/core/cloners.ts                                 | 110 ++++----
 src/core/constants.ts                               | 104 +++++---
 src/core/errors.ts                                  |  17 +-
 src/core/factories.ts                               | 118 ++++++---
 src/core/helpers.ts                                 | 355 ++++++++++++++++++++-----
 src/core/index.ts                                   |   5 +-
 src/core/phases/Phase.ts                            |  67 +++--
 src/core/phases/PhaseManager.ts                     | 103 +++-----
 src/core/shapers.ts                                 |  18 +-
 src/core/stores/DatabaseWorkflowStore.ts            |  20 +-
 src/core/stores/MemoryWorkflowStore.ts              |   2 +-
 src/core/tasks/Task.ts                              |  72 ++---
 src/core/tasks/TaskController.ts                    |   2 +-
 src/core/tasks/TaskManager.ts                       | 105 +++-----
 src/core/types.ts                                   | 864 +++++++++++++++++++++++++++++++++++++-----------------------
 src/core/validators.ts                              | 261 ++++++++++++------
 src/server/NodeScheduler.ts                         |  27 +-
 src/server/factories.ts                             |   8 +-
 tests/guides.test.ts                                |  30 ++-
 tests/setup.test.ts                                 |   8 +-
 tests/setup.ts                                      |  17 +-
 tests/src/browser/IdleScheduler.test.ts             |   2 +-
 tests/src/core/Controller.test.ts                   |   2 +-
 tests/src/core/RunHolder.test.ts                    |  64 +++++
 tests/src/core/Workflow.test.ts                     |  37 ++-
 tests/src/core/WorkflowPersistence.test.ts          |   4 +-
 tests/src/core/WorkflowRunner.test.ts               |  66 ++---
 tests/src/core/factories.test.ts                    | 110 ++++++--
 tests/src/core/helpers.test.ts                      |  66 ++---
 tests/src/core/phases/Phase.test.ts                 |  60 +++--
 tests/src/core/phases/PhaseManager.test.ts          |  10 +-
 tests/src/core/shapers.test.ts                      |  37 +--
 tests/src/core/stores/DatabaseWorkflowStore.test.ts |  10 +-
 tests/src/core/stores/MemoryWorkflowStore.test.ts   |  18 +-
 tests/src/core/tasks/Task.test.ts                   |  69 +++--
 tests/src/core/tasks/TaskController.test.ts         |   2 +-
 tests/src/core/tasks/TaskManager.test.ts            |  18 +-
 tests/src/core/validators.test.ts                   |  22 +-
 56 files changed, 2316 insertions(+), 1547 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

The surface diff is 122459 bytes, past the 60000-byte cap; read it with `git -C /home/user/fleet/workflow diff d4df9ff..6f99184 -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'`. Per-file stat:

```text
 src/browser/constants.ts |   2 +-
 src/browser/types.ts     |   4 +-
 src/core/constants.ts    | 104 +++++++----
 src/core/errors.ts       |  17 +-
 src/core/index.ts        |   5 +-
 src/core/types.ts        | 864 +++++++++++++++++++++++++++++++++++++++++++++++++++++----------------------------------
 6 files changed, 615 insertions(+), 381 deletions(-)
```
