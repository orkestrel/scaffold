## Touched files

**Stopped under the deviation contract. Implementation remains incomplete.**

This unit changed these owned files:

| File | Partial change |
|---|---|
| `src/server/types.ts` | Adds the collision contract and inventory option. |
| `src/server/constants.ts` | Adds `INVENTORY_NAME`. |
| `src/server/helpers.ts` | Reads the inventory baseline and includes `surface` in manifests and digests. |
| `src/server/validators.ts` | Adds surface validation and host digest checking; type errors remain. |
| `tests/setupServer.ts` | Updates manifest fixtures and removes installed-host guide fixtures. |
| `tests/src/server/helpers.test.ts` | Replaces baseline tests and adds manifest proofs. |

## Git diff --stat

This output includes inherited changes.

```text
 .agents/templates/brief.md                |   9 +
 .claude/rules/tests.md                    |  40 ++-
 guides/scaffold.md                        |  58 ++++-
 host.json                                 | 307 ++++++++++++++++++++++-
 src/bin/CLI.ts                            | 141 +++++++----
 src/bin/helpers.ts                        |  13 +-
 src/bin/types.ts                          |  16 +-
 src/core/compilers.ts                     |  11 +-
 src/core/constants.ts                     |  27 +-
 src/core/helpers.ts                       |   2 +-
 src/server/Materializer.ts                |  92 ++++++-
 src/server/constants.ts                   |   3 +
 src/server/helpers.ts                     | 196 +++++++++++++--
 src/server/types.ts                       |  28 ++-
 src/server/validators.ts                  |  21 +-
 tests/policy.test.ts                      | 279 ++++++++++++++++++++-
 tests/setupPolicy.test.ts                 | 166 ++++++++++++-
 tests/setupPolicy.ts                      | 319 +++++++++++++++++++++++-
 tests/setupServer.test.ts                 |  24 +-
 tests/setupServer.ts                      | 130 ++++++----
 tests/src/bin/CLI.test.ts                 | 218 ++++++++++++++++-
 tests/src/core/compilers.test.ts          |  13 +
 tests/src/core/helpers.test.ts            |  24 +-
 tests/src/server/Materializer.test.ts     | 209 ++++++++++++----
 tests/src/server/Upstream.test.ts         |  16 +-
 tests/src/server/WriteTransaction.test.ts |  60 +++--
 tests/src/server/helpers.test.ts          | 393 ++++++++++++++++++++++++++----
 27 files changed, 2498 insertions(+), 317 deletions(-)
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
 M src/server/constants.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M src/server/validators.ts
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

After the type-only change, the commands reported:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run test:src:server` | 1 | 446 passed; 9 documented Ollama failures; 6 skipped. |
| `npm.cmd run test:setup` | 0 | 96 passed; 2 skipped. |
| `npm.cmd run check` | 1 | Missing `surface` declarations identified implementation and fixture updates. |

## Red-then-green evidence

The required tests ran red before implementation. This command reported **8 failed**:

```text
npm.cmd run test:src:server -- --testNamePattern 'collision the inventory|collision set matches|no inventory exists|inventory without a recorded surface|inventory whose surface is malformed|records the staged collision|surface moved without its digest'
```

No matching green run occurred before the mandatory stop.

## Unknown’s reading

`stageInventory` returns `HostManifest`; it doesn't use a separate inventory type.

The digest change also reaches off-limits consumers. They verify manifests with the earlier digest arguments.

## Build and acceptance readings

The final executed commands reported:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 1 | Off-limits digest callers, unfinished fixture updates, and validator typing errors. |
| `npm.cmd run test:src:server` | 1 | 39 failed; 419 passed; 6 skipped. |
| `npm.cmd run test:setup` | 1 | 4 failed; 92 passed; 2 skipped. |

Lint, formatting, guide acceptance, and build were **not run**.

## Seed reading

The seed script was **not created or run**. This unit left `host.json` unchanged from launch. No seed collision reading or replacement digest is available.

## Deviation state

The required digest signature cannot be adopted fully within ownership. The typecheck reports:

```text
src/server/Materializer.ts(560,32): error TS2554: Expected 3 arguments, but got 2.
src/server/Upstream.ts(568,27): error TS2554: Expected 3 arguments, but got 2.
```

These callers must include the manifest’s `surface`. Making that argument optional would leave their digest verification incorrect for recorded collisions. `tests/src/server/Upstream.test.ts` also contains affected calls outside Owned.

The brief requires stopping when the inventory change requires a consumer-facing change outside Owned. Partial edits remain for the Orchestrator’s review; guide updates, fixture convergence, acceptance, and seeding remain unfinished.

This unit wrote no off-limits paths and spawned no agents. The hash comparison detected changes under `.orkestrel/campaign/` that this unit did not write, so the checkout-wide scope condition cannot be certified.

Probe MCP rejected execution because approval policy is `never`; no probe receipt was issued.
<!-- Orchestrator: sol route, GPT-6 Astra, workspace-write codex exec rooted at scaffold; journal tmp/codex/D41d-scaffold-inventory-baseline.jsonl, thread 01a0a4b8-a57c-7c10-9d75-e077764386ba, 2026-09-15T10:59:19Z to 11:07:16Z (477 s), exit 0; stopped under the deviation contract. -->
