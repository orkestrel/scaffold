## Touched files

Implemented the assignment in:

- `src/core/constants.ts`, `src/core/compilers.ts`
- `src/bin/types.ts`, `src/bin/CLI.ts`
- `src/server/Materializer.ts`
- `tests/setupServer.ts`
- `tests/src/core/constants.test.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/server/Materializer.test.ts`
- `guides/scaffold.md`
- `guides/README.md` — seed sentence only

## Git diff --stat

The scoped reading includes inherited changes:

```text
 guides/README.md                      |  16 ++-
 guides/scaffold.md                    | 199 ++++++++++++++++++++++-----
 src/bin/CLI.ts                        | 158 ++++++++++++++--------
 src/bin/types.ts                      |  30 +++--
 src/core/compilers.ts                 |   9 +-
 src/core/constants.ts                 |  39 ++++--
 src/server/Materializer.ts            |  94 +++++++++++--
 tests/setupServer.ts                  | 199 ++++++++++++++++++++-------
 tests/src/bin/CLI.test.ts             | 246 ++++++++++++++++++++++++++++++++--
 tests/src/core/constants.test.ts      |   8 ++
 tests/src/server/Materializer.test.ts | 235 +++++++++++++++++++++++++-------
 11 files changed, 997 insertions(+), 236 deletions(-)
```

## Status

Implementation is complete. Full acceptance awaits the Orchestrator’s inventory regeneration and host verification.

The tracked-file hash comparison reported `unowned: []`.

## Baseline readings

Before implementation, `npm.cmd run test:src:bin` exited **1**: **252 passed; 5 failed**. Default host-floor scenarios encountered the stale inventory:

```text
ScaffoldError: The vendored host cannot read the declared file at .claude/agents/orkestrel.md
```

After the type change, `npm.cmd run check` identified affected producers and consumers in `CLI.ts` and its tests.

## Red-then-green evidence

These commands failed at their changed pins, then passed:

| Command | Red → green |
|---|---|
| `npm.cmd run test:src:bin -- --testNamePattern 'regenerates the package table\|widens the fetch\|persists the offline half\|keeps guide difference questions'` | 4 failed → 4 passed |
| `npm.cmd run test:src:server -- --testNamePattern 'reports differing foreign mirrors'` | 1 failed → 1 passed |
| `npm.cmd run test:src:bin -- --testNamePattern 'keeps the floor ranges'` | 1 failed → 1 passed |

## Acceptance readings

The final commands produced these results:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:src:core` | 0 | 412 passed |
| `npm.cmd run test:src:bin` | 1 | 252 passed; 5 baseline failures |
| `npm.cmd run test:src:server` | 1 | 454 passed; 10 documented failures; 6 skipped |
| `npm.cmd run test:guides` | 0 | 23 passed |
| `git diff --check` | 0 | Passed |

Controls excluding the named baseline failures exited **0**: bin reported **252 passed**, and server reported **451 passed**.

## Rulings recorded

- `SEED_GUIDE_PATHS` owns the frozen seed membership; compiler, fixture, and documentation reference it.
- `CatalogResult.membership` groups the completed catalog evidence. Catalog exit status tests its presence.
- `overwrite.releases` retains its separate version evidence.
- Mirror questions use `field: 'guides'` and name the path in their message.

## Deviation state

Spawned nothing. Added no dependencies. Wrote no off-limits files. Build and inventory regeneration were not run.

Probe returned `MCP tool call requires approval, but approval policy is never`; no receipt was issued. PowerShell blocked the gate script, so acceptance commands ran directly without changing execution policy.

Exact commands, controls, and log paths are retained in the [D46 report](/C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/D46-scaffold-shape-fixes-report.md).
<!-- Orchestrator: sol route, GPT-6 Astra, workspace-write codex exec rooted at scaffold; journal tmp/codex/D46-scaffold-shape-fixes.jsonl, thread 01a0a50a-9315-7d90-9ed3-d84dad04a959, 2026-09-15T12:28:48Z to 12:41:04Z (736 s), exit 0. The unit's longer report with exact commands is retained as D46-scaffold-shape-fixes-report-long.md. -->
