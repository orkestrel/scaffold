## Touched files

Implemented collision-growth refusal within the owned scope.

| File | Change |
|---|---|
| `src/server/helpers.ts` | Compares copied Surface collisions against the installed host; reports baseline absence; exports the shared reader. |
| `src/server/types.ts` | Adds `HostStageOptions.report`. |
| `tests/setupServer.ts` | Adds inert guide fixtures. |
| `tests/src/server/helpers.test.ts` | Adds refusal, acceptance, baseline, and reader proofs. |
| `guides/scaffold.md` | Documents the baseline rule and added exports. |

## Git diff --stat

This output includes inherited changes.

```text
 .agents/templates/brief.md                |   9 +
 .claude/rules/tests.md                    |  40 +++-
 guides/scaffold.md                        |  58 ++++-
 host.json                                 | 307 +++++++++++++++++++++++++-
 src/bin/CLI.ts                            | 141 +++++++-----
 src/bin/helpers.ts                        |  13 +-
 src/bin/types.ts                          |  16 +-
 src/core/compilers.ts                     |  11 +-
 src/core/constants.ts                     |  27 ++-
 src/core/helpers.ts                       |   2 +-
 src/server/Materializer.ts                |  92 ++++++--
 src/server/helpers.ts                     | 153 +++++++++++--
 src/server/types.ts                       |  14 ++
 tests/policy.test.ts                      | 279 +++++++++++++++++++++++-
 tests/setupPolicy.test.ts                 | 166 ++++++++++++++-
 tests/setupPolicy.ts                      | 319 ++++++++++++++++++++++++++-
 tests/setupServer.test.ts                 |  24 ++-
 tests/setupServer.ts                      | 114 ++++++----
 tests/src/bin/CLI.test.ts                 | 218 ++++++++++++++++++-
 tests/src/core/compilers.test.ts          |  13 ++
 tests/src/core/helpers.test.ts            |  24 ++-
 tests/src/server/Materializer.test.ts     | 209 ++++++++++++++----
 tests/src/server/Upstream.test.ts         |  16 +-
 tests/src/server/WriteTransaction.test.ts |  60 +++---
 tests/src/server/helpers.test.ts          | 343 +++++++++++++++++++++++++-----
 25 files changed, 2371 insertions(+), 297 deletions(-)
```

## Git status --porcelain

The inherited paths remain present.

```text
 M .agents/templates/brief.md
 M .claude/rules/tests.md
 M guides/scaffold.md
 M host.json
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/server/Materializer.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/policy.test.ts
 M tests/setupPolicy.test.ts
 M tests/setupPolicy.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
 M tests/src/server/WriteTransaction.test.ts
 M tests/src/server/helpers.test.ts
?? .orkestrel/
?? guides/supervisor.md
```

## Baseline readings

The commands produced these readings before editing.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:src:server` | 1 | 437 passed, 9 documented Ollama failures, 6 skipped |

## Red-then-green evidence

The required-control command changed from **4 failed** to **4 passed**:

```text
npm.cmd run test:src:server -- --testNamePattern 'collision the published|collision set is unchanged|absent baseline'
```

Each required test ran red and then green.

| Test title | Red → green |
|---|---|
| refuses a stage whose guides add a collision the published host lacks | 1 failed → 1 passed |
| stages when the collision set is unchanged | 1 failed → 1 passed |
| stages when a collision the published host carried is gone | 1 failed → 1 passed |
| proceeds and records an absent baseline when no published host resolves | 1 failed → 1 passed |

The additional boundary command passed **5 tests**:

```text
npm.cmd run test:src:server -- --testNamePattern 'readSurfaceCollisions|collision-free guide set|exact owner sets|host guides are missing'
```

It covers distinct owners, name-column reading, excluded files, empty directories, introduced collisions, replaced or reduced owner sets, and missing installed guides.

## Unknown’s reading

No manifest change is needed. `HostStageOptions.report` records the baseline location or absence, defaulting to stderr.

This checkout has no installed `node_modules/@orkestrel/scaffold`. Real filesystem fixtures prove the published-host comparison. Guide loads only when the collision reader executes.

## Build and acceptance readings

The commands produced these final readings.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:guides` | 0 | 23 passed |
| Required-control command | 0 | 4 passed |
| Boundary command | 0 | 5 passed |
| `npm.cmd run test:src:server` | 1 | 445 passed, 10 failed, 6 skipped |
| `git diff --check` | 0 | Passed |
| `node tmp/codex/D41c-scope.mjs` | 0 | `unowned: []` |

`npm.cmd run build` was **not run**: D4-1c reserves `host.json` regeneration for the Orchestrator after this unit exits.

## Deviation state

Implementation is complete within ownership; full server acceptance remains non-green. Alongside the documented Ollama sandbox failures, the server suite reports:

```text
readHostFloor > reads the default host floor and hydrates as the default materializer does
ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md
```

The edited guide requires the Orchestrator’s reserved inventory regeneration and subsequent server run.

No off-limits files changed, agents spawned, dependencies added, or version changed. Probe MCP was unavailable as stated in the brief; the evidence consists of executed command observations.
<!-- Orchestrator: sol route, GPT-6 Astra, workspace-write codex exec rooted at scaffold; journal tmp/codex/D41c-scaffold-growth-refusal.jsonl, thread 01a0a4a7-d436-7042-8278-0af6bc018069, 2026-09-15T10:40:56Z to 10:51:05Z (609 s), exit 0. -->
