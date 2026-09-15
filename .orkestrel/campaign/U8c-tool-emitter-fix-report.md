<!-- U8c — sol (GPT-6 Astra, codex exec workspace-write -C tool), thread 01a0a456-c8e0-7532-8985-c5a860e891d3; journal tmp/codex/U8c-tool-emitter-fix.jsonl; 2026-09-15 09:12–09:21Z. Retained from --output-last-message. -->

## Result and touched files

U8c is implemented. All acceptance commands exited 0.

- [ToolManager.ts](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts) — forwards options directly, checks replacement identity before publication, and empties the map after emitter destruction.
- [types.ts](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts) — documents replacement state, synchronous re-entry, teardown, and sibling delivery.
- [ToolManager.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts) — promotes P8 cases and strengthens ordering and identity assertions.
- [factories.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/factories.test.ts) — records shared publication order across initial hooks.
- [tool.md](C:/Users/mikes/WebstormProjects/tool/guides/tool.md) — mirrors the corrected contracts; observation fence unchanged.
- `tmp/probe/ToolManager.test.ts` — deleted after promotion.
- `tmp/codex/U8c-*.log.txt` — retains targeted readings, compiler observations, gates, and final state.

Inherited U8a/U8b changes remain. This round did not edit their manifest, lockfile, factory implementation, or guide-test transcription.

## Carrier closures

| Carrier | Closing location |
|---|---|
| 1 — Constructor | [ToolManager.ts:51](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts:51) — direct options forwarding compiles. |
| 2 — Replacement re-entry | [ToolManager.ts:72](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts:72), [test:299](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:299), [guide:432](C:/Users/mikes/WebstormProjects/tool/guides/tool.md:432). |
| 3 — Destroy repopulation | [ToolManager.ts:123](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts:123), [test:337](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:337). |
| 4 — Mid-emission destruction | [types.ts:307](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts:307), [test:357](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:357), [guide:472](C:/Users/mikes/WebstormProjects/tool/guides/tool.md:472). |
| 5 — Destroy summary | [types.ts:301](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts:301), [guide:165](C:/Users/mikes/WebstormProjects/tool/guides/tool.md:165); parity passed. |
| 6 — Replacement removal state | [types.ts:191](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts:191), [replacement test:173](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:173), [standalone test:212](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:212). |
| 7 — Stronger tests | [manager tests:132](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:132), [hooks test:8](C:/Users/mikes/WebstormProjects/tool/tests/src/core/factories.test.ts:8). |
| 8 — Captured evidence | [red log:1](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-red.log.txt:1), [green log:1](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-green.log.txt:1). |
| 9 — Probe cleanup | [final-state log:22](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-final-state.log.txt:22) — `tmp/probe/` contains no files. |
| 10 — Recorder inference | [inference log:1](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-inference.log.txt:1) — omitting explicit arguments produces TS2345; arguments retained. |

## Baseline readings

These commands ran before editing:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 0 | 86 passed |

## Red and green evidence

The [red log](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-red.log.txt) and [green log](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-green.log.txt) contain every title below. Each ran with:

```text
npm.cmd run test:src:core -- -t "<title>" --reporter=verbose
```

For each title, red recorded **1 failed, 0 passed, exit 1**; green recorded **0 failed, 1 passed, exit 0**. Each filtered run skipped the other 88 tests.

| Test title | Red condition |
|---|---|
| `replacement reentry preserves publication consistency` | U8b’s unconditional replacement publication |
| `destroy finishes with an empty registry` | U8b retains the tool re-added during teardown |
| `a listener destroying the registry mid-emit does not stop its siblings` | P8’s no-delivery expectation; inverted to expect `[[true]]` for green |
| `emits add with the exact tool after registration` | Publication moved before registration |
| `emits add for each batch tool in array order and nothing for an empty batch` | Publication moved before registration |
| `emits remove before add for replacements while preserving registration position` | Removal published before installing the replacement |
| `emits remove after deleting the exact tool and stays silent for a missing name` | Publication moved before deletion |
| `emits batch removals in requested order and reports missing or repeated names` | Publication moved before deletion |
| `emits one clear snapshot in registration order after emptying the registry` | Snapshot taken after emptying |
| `emits one empty clear event for every clear of an empty registry` | Snapshot taken after emptying |
| `forwards initial registry hooks for add, remove, and clear` | Replacement publication order swapped |
| `destroys the emitter after clearing the registry and publishing the removed tools` | Emitter teardown omitted |
| `publishes nothing for a later add after destroy while updating the registry` | Emitter teardown omitted |
| `forwards listener errors without preventing sibling listeners` | Initial hooks and error handler omitted |
| `executes single and batch calls without publishing registry events` | Execution publishes an addition |

All temporary implementation mutations were removed. The mid-emission reading establishes the documented emitter behavior; it required an expectation inversion, not an emitter change.

## Constructor and after-destroy readings

`new Emitter<ToolManagerEventMap>(options)` passed `npm.cmd run check`, exit 0. See the [constructor log](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-constructor.log.txt).

After `destroy()`, later additions update the map and publish nothing. Destruction returns with an empty registry even when a clear listener re-adds a tool. An emission already underway still reaches its snapshotted siblings.

## Acceptance readings

The [gate log](C:/Users/mikes/WebstormProjects/tool/tmp/codex/U8c-gates.log.txt) records these results:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Formatting passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 0 | 89 passed |
| `npm.cmd run test:guides` | 0 | 31 passed |
| `npm.cmd run test:setup` | 0 | 2 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run build` — observation | 0 | ESM, CommonJS, and declarations emitted |

The existing skips concern the absent local writing-rule table and the unavailable-extractor branch when the extractor is installed. Build reported API Extractor’s bundled TypeScript 5.9.3 versus project TypeScript 6.0.3.

## Diff and status

`git diff 8f2ad5d --stat` returned:

```text
 guides/tool.md                           | 119 ++++++++---
 package-lock.json                        |   4 +-
 package.json                             |   3 +-
 src/core/factories.ts                    |  12 +-
 src/core/tools/ToolManager.ts            |  38 +++-
 src/core/types.ts                        |  51 +++++
 tests/guides.test.ts                     |  35 ++++
 tests/src/core/factories.test.ts         |  64 ++++++
 tests/src/core/tools/ToolManager.test.ts | 338 ++++++++++++++++++++++++++++++-
 9 files changed, 619 insertions(+), 45 deletions(-)
```

`git status --porcelain` returned:

```text
 M guides/tool.md
 M package-lock.json
 M package.json
 M src/core/factories.ts
 M src/core/tools/ToolManager.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/tools/ToolManager.test.ts
```

## Deviation state

No stop-condition deviation. Explicit recorder arguments remain under carrier 10’s permitted fallback. The unavailable `prove` MCP path is reported through command observations, as briefed. No agents spawned; no version bump, dependency edit, or scaffold-owned file edit. Authoritative host build and independent acceptance remain with the Orchestrator.