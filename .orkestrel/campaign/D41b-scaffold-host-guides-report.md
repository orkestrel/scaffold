<!-- D4-1b — sol (GPT-6 Astra, codex exec workspace-write -C scaffold), thread 01a0a46b-7951-7450-9029-6de4758fff5d; journal tmp/codex/D41b-scaffold-host-guides.jsonl; 2026-09-15 09:35–09:48Z. Retained from --output-last-message. -->

## Touched files

Implemented reference staging and regenerated the host inventory.

| File | Change |
|---|---|
| `src/core/constants.ts` | Added `REFERENCE_PATHS`; removed seed guides from `HOST_PATHS`; documented prefix separation. |
| `src/core/compilers.ts` | Preserved explicit, presence-owned seed-guide claims. |
| `src/core/helpers.ts` | Updated candidate-selection documentation. |
| `src/server/helpers.ts` | Staged references through existing safeguards; refused catalog packages without guides. |
| `tests/setupServer.ts` | Updated checkout and fleet fixtures, manifests, and planned-artifact totals. |
| `tests/setupServer.test.ts` | Updated fixture membership proofs. |
| `tests/src/core/helpers.test.ts` | Extended prefix separation and own-guide exclusion proofs. |
| `tests/src/core/compilers.test.ts` | Pinned seed-guide ownership and target-guide exclusion. |
| `tests/src/server/helpers.test.ts` | Added reference staging, missing-guide, and storage-collision proofs. |
| `tests/src/server/Materializer.test.ts` | Proved installed references remain unplanted unless claimed. |
| `guides/scaffold.md` | Added only the `REFERENCE_PATHS` Surface row. |
| `host.json` | Regenerated through the build. |

The temporary `tmp/codex/D41b-host-check.mjs` instrument verifies built-reader membership and guide bytes.

## Diff and status

`git diff --stat` includes the preserved Orchestrator edits:

```text
 .agents/templates/brief.md            |   9 +
 .claude/rules/tests.md                |  27 ++-
 guides/scaffold.md                    |   1 +
 host.json                             | 303 +++++++++++++++++++++++++++++++++-
 src/core/compilers.ts                 |  11 +-
 src/core/constants.ts                 |  27 ++-
 src/core/helpers.ts                   |   2 +-
 src/server/helpers.ts                 |  46 +++++-
 tests/setupServer.test.ts             |  16 +-
 tests/setupServer.ts                  |  88 ++++++----
 tests/src/core/compilers.test.ts      |  13 ++
 tests/src/core/helpers.test.ts        |  24 ++-
 tests/src/server/Materializer.test.ts |  36 ++++
 tests/src/server/helpers.test.ts      |  61 +++++++
 14 files changed, 602 insertions(+), 62 deletions(-)
```

`git status --porcelain` returned:

```text
 M .agents/templates/brief.md
 M .claude/rules/tests.md
 M guides/scaffold.md
 M host.json
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/server/helpers.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/helpers.test.ts
?? .orkestrel/
?? guides/supervisor.md
```

## Baseline readings

The baseline commands produced:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | Passed. |
| `npm.cmd run test:src:server` | 1 | 431 passed, 9 failed, 6 skipped. |

The baseline and final server runs failed the same `Ollama setup` tests:

- `reuses a reachable daemon and serializes the selected model as JSON data`
- `pulls an absent model before completing the warm request`
- `fails when the warm response does not report completion`
- `fails when the pull response does not report completion`
- `does not classify a numeric-prefix DNS hostname as loopback`
- `refuses an unready loopback endpoint rather than starting a host daemon`
- `refuses redirected version readiness without starting a local daemon`
- `refuses a redirected pull with a completed protocol body`
- `refuses a redirected warm response with a completed protocol body`

Diagnostics include `mkdir: cannot create directory ‘/c/Users/mikes’: Permission denied`. These remain sandbox observations under the successor brief.

## Behavioral evidence

The focused core command was:

```text
npm.cmd run test:src:core -- --testNamePattern 'shares no member|claims only the seed|drops the workspace'
```

It changed from **1 failed, 2 passed** to **3 passed**, covering:

- `shares no member with the vendored set, in either direction` — reference membership, prefix separation, and `isCanonPath('guides/router.md') === false`.
- `claims only the seed guide mirrors by presence and excludes the target guide`.
- `drops the workspace’s own guide and keeps every other candidate in order` — retained behavior; passed throughout.

The seed-claim test also ran independently, red before restoring explicit claims and green afterward:

```text
npm.cmd run test:src:core -- --testNamePattern 'claims only the seed'
```

Result: **1 failed → 1 passed**.

The focused server command was:

```text
npm.cmd run test:src:server -- --testNamePattern 'reference|refuses a catalog package'
```

Result: **4 failed → 4 passed**, covering:

- `stages every reference guide with verified bytes and installed floor membership`
- `refuses a catalog package without its staged guide and accepts the restored guide`
- `refuses reference storage collisions before publishing a manifest`
- `reads installed reference guides without planting unclaimed mirrors`

Existing containment and `listCanonPaths` tests passed in the server suite. Their implementation remains unchanged.

## Unknown’s reading

No manifest axis is needed. `Materializer.#hydrate` selects through `plan.artifacts`; manifest entries supply bytes. The installed-floor test confirms reference availability without planting unclaimed mirrors and preserves an authored target guide during repair.

No off-limits manifest reader required changes.

## Build and acceptance readings

The commands produced:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run build` | 0 | Staged 172 files and regenerated `host.json`. |
| `npm.cmd run lint:check` | 0 | Passed. |
| `npm.cmd run check` | 0 | Passed. |
| `npm.cmd run test:src:core` | 0 | 411 passed. |
| `npm.cmd run test:src:server` | 1 | 435 passed, 9 baseline failures, 6 skipped. |
| `npm.cmd run test:src:bin` | 0 | 253 passed. |
| `npm.cmd run test:setup -- tests/setupServer.test.ts` | 0 | 62 passed, 2 skipped. |
| `npm.cmd run test:guides` | 0 | 23 passed. |
| `npm.cmd run format:check` | 1 | Flags only `.claude/rules/tests.md`. |
| Scoped Oxfmt check over changed owned files | 0 | Passed. |
| `node tmp/codex/D41b-host-check.mjs` | 0 | Built reader matches inventory and every checkout guide byte. |
| `git diff --check` | 0 | Passed. |

## Deviation state

Implementation completed within ownership. No agents spawned, dependencies added, or version changed.

Full acceptance remains non-green because of the recorded sandbox failures and formatting in the off-limits, Orchestrator-owned `.claude/rules/tests.md` file. That file was left untouched. Probe MCP was unreachable as stated in the brief; evidence consists of executed command observations.