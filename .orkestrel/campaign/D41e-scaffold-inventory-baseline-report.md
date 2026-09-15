## Touched files

Completed the inventory baseline implementation from D4-1d’s partial state.

| File | Change |
|---|---|
| `src/server/validators.ts` | Uses installed `whereOf` guards to validate sorted collisions and manifest digests. |
| `src/server/helpers.ts` | Formats the inherited inventory reader, staging, and digest implementation. |
| `src/server/Materializer.ts` | Passes the manifest’s `surface` to digest verification. |
| `src/server/Upstream.ts` | Passes the manifest’s `surface` to digest verification. |
| `tests/setupServer.ts` | Completes manifest fixtures and corrects fixture documentation. |
| `tests/setupServer.test.ts` | Updates digest expectations and supplies a freshly staged host fixture. |
| `tests/src/server/helpers.test.ts` | Updates digest calls and proves inventory reading and path selection. |
| `tests/src/server/validators.test.ts` | Covers missing, modified, unsorted, repeated, and incomplete collisions. |
| `tests/src/server/Materializer.test.ts` | Updates manifest fixtures and the strict guard refusal expectation. |
| `tests/src/server/Upstream.test.ts` | Updates inventory fixtures and digest calls. |
| `tests/distribution.test.ts` | Updates only the authorized declaration expectation. |
| `guides/scaffold.md` | Documents the inventory baseline and public contracts. |
| `host.json` | Seeds `surface` and its digest; preserves entries and roots. |
| `tmp/codex/D41d-seed-inventory.mjs` | Retains the executable seed and read-back verification. |

The inherited types and constant remain intact. Existing barrel exports already expose them.

## Git diff --stat

This output includes inherited changes.

```text
 .agents/templates/brief.md                |   9 +
 .claude/rules/tests.md                    |  40 +-
 guides/scaffold.md                        |  71 ++-
 host.json                                 | 817 +++++++++++++++++++++++++++++-
 src/bin/CLI.ts                            | 141 ++++--
 src/bin/helpers.ts                        |  13 +-
 src/bin/types.ts                          |  16 +-
 src/core/compilers.ts                     |  11 +-
 src/core/constants.ts                     |  27 +-
 src/core/helpers.ts                       |   2 +-
 src/server/Materializer.ts                |  94 +++-
 src/server/Upstream.ts                    |   4 +-
 src/server/constants.ts                   |   3 +
 src/server/helpers.ts                     | 199 +++++++-
 src/server/types.ts                       |  28 +-
 src/server/validators.ts                  |  42 +-
 tests/distribution.test.ts                |   2 +-
 tests/policy.test.ts                      | 279 +++++++++-
 tests/setupPolicy.test.ts                 | 166 +++++-
 tests/setupPolicy.ts                      | 319 +++++++++++-
 tests/setupServer.test.ts                 |  81 +--
 tests/setupServer.ts                      | 160 ++++--
 tests/src/bin/CLI.test.ts                 | 218 +++++++-
 tests/src/core/compilers.test.ts          |  13 +
 tests/src/core/helpers.test.ts            |  24 +-
 tests/src/server/Materializer.test.ts     | 223 ++++++--
 tests/src/server/Upstream.test.ts         |  29 +-
 tests/src/server/WriteTransaction.test.ts |  60 ++-
 tests/src/server/helpers.test.ts          | 525 ++++++++++++++++---
 tests/src/server/validators.test.ts       |  62 +++
 30 files changed, 3302 insertions(+), 376 deletions(-)
```

## Git status --porcelain

The final status includes inherited paths.

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
 M src/server/Upstream.ts
 M src/server/constants.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M src/server/validators.ts
 M tests/distribution.test.ts
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
 M tests/src/server/validators.test.ts
?? .orkestrel/
?? guides/supervisor.md
```

## Baseline readings

The pre-edit commands produced these results.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 1 | Missing digest arguments, validator narrowing errors, and missing fixture surfaces. |
| `npm.cmd run test:src:server` | 1 | 39 failed; 419 passed; 6 skipped. |
| `npm.cmd run test:setup` | 1 | 4 failed; 92 passed; 2 skipped. |

## Red-then-green evidence

D4-1d recorded **8 failed** under the following command. This unit ran the same command and recorded **8 passed**, exit **0**.

```text
npm.cmd run test:src:server -- --testNamePattern 'collision the inventory|collision set matches|no inventory exists|inventory without a recorded surface|inventory whose surface is malformed|records the staged collision|surface moved without its digest'
```

The recorded controls have these outcomes.

| Test title | Result |
|---|---|
| refuses a stage whose guides add a collision the inventory lacks | Red → green |
| stages when the collision set matches the inventory | Red → green |
| stages when a collision the inventory carried is gone | Red → green |
| establishes the baseline when no inventory exists | Red → green |
| refuses an inventory without a recorded surface | Red → green |
| refuses an inventory whose surface is malformed | Red → green |
| records the staged collision set in the manifest | Red → green |
| refuses a manifest whose surface moved without its digest | Red → green |

## Unknown’s reading

`stageInventory` returns `HostManifest`. No separate inventory type is needed.

The seed measured **127 collisions**, differing from the historical measurement cited by the brief.

## Build and acceptance readings

The final commands produced these results.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed. |
| `npm.cmd run lint:check` | 0 | Passed. |
| `npm.cmd run check` | 0 | Passed, including environment checks. |
| `npm.cmd run test:src:server` | 1 | 452 passed; 10 failed; 6 skipped. Only documented Ollama failures and stale `readHostFloor` digest. |
| `npm.cmd run test:setup` | 0 | 96 passed; 2 skipped. |
| `npm.cmd run test:guides` | 0 | 23 passed. |
| `npm.cmd run test:distribution` | 1 | 2 failed; 2 passed; 2 skipped. Details follow. |
| `git diff --check` | 0 | Passed. |

`npm.cmd run build` was **not run**, as instructed.

Distribution failures remain outside the permitted edit:

- `stages exactly the declared vendored host inventory`: the assertion omits `REFERENCE_PATHS`.
- `answers every example its shipped declarations print exactly as printed`: the built digest example is stale, and the expectation omits the existing `readSurfaceCollisions` example.

## Seed reading

`node tmp/codex/D41d-seed-inventory.mjs` exited **0** and reported:

```json
{"collisions":127,"digest":"062dd1bb4a98fb60fa4b83c9bb1320ffb9b7d1d8fe9b95a03f01f5a586a0033d","verified":true}
```

`readSurfaceBaseline` returned the seeded set. The script verified that entries and roots remained unchanged.

`git diff --stat -- host.json` reported:

```text
 host.json | 817 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 1 file changed, 811 insertions(+), 6 deletions(-)
```

## Deviation state

The assigned implementation is complete. Full acceptance remains with the Orchestrator because distribution reports failures beyond stale declarations.

The starting/final tracked-file hash comparison found changes only in owned files. `.orkestrel/` was excluded as instructed. This unit spawned no agents and wrote no off-limits files.

Probe MCP returned: `MCP tool call requires approval, but approval policy is never`. No receipt was issued; the evidence consists of executed command observations.
<!-- Orchestrator: sol route, GPT-6 Astra, workspace-write codex exec rooted at scaffold; journal tmp/codex/D41e-scaffold-inventory-baseline.jsonl, thread 01a0a4c1-acd7-7f73-8611-89d62532509b, 2026-09-15T11:09:11Z to 11:21:37Z (746 s), exit 0. -->
