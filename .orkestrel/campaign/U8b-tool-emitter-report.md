<!-- U8b — sol (GPT-6 Astra, codex exec workspace-write -C tool), thread 01a0a43a... successor; journal tmp/codex/U8b-tool-emitter.jsonl; 2026-09-15 08:46–08:55Z. Retained from --output-last-message. -->

## Touched files

The implementation changes are:

- [src/core/types.ts](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts): Adds the event-map type alias, options, emitter member, and documented destruction contract.
- [src/core/tools/ToolManager.ts](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts): Composes the emitter, publishes registry changes, and destroys the emitter last.
- [src/core/factories.ts](C:/Users/mikes/WebstormProjects/tool/src/core/factories.ts): Passes optional hooks and error handling into the manager.
- [tests/src/core/tools/ToolManager.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts): Pins event payloads, ordering, destruction, and silent execution.
- [tests/src/core/factories.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/factories.test.ts): Pins initial hooks and listener-error isolation.
- [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts): Adds the byte-equal fence transcription and executed assertions.
- [guides/tool.md](C:/Users/mikes/WebstormProjects/tool/guides/tool.md): Documents the surface, lifecycle, observation pattern, and proofs.

## Git readings

`git diff --stat` returned:

```text
 guides/tool.md                           | 110 +++++++++-----
 package-lock.json                        |   4 +-
 package.json                             |   3 +-
 src/core/factories.ts                    |  12 +-
 src/core/tools/ToolManager.ts            |  39 ++++-
 src/core/types.ts                        |  34 +++++
 tests/guides.test.ts                     |  35 +++++
 tests/src/core/factories.test.ts         |  47 ++++++
 tests/src/core/tools/ToolManager.test.ts | 242 ++++++++++++++++++++++++++++++-
 9 files changed, 481 insertions(+), 45 deletions(-)
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

The manifest and lockfile changes are the pre-existing U8a changes. Only owned files changed during this assignment.

## Baseline readings

Before editing, the commands returned:

| Command | Exit | Reading |
| --- | ---: | --- |
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 0 | 74 passed |

## Red-then-green evidence

Every test named below ran under **`npm.cmd run test:src:core`**, before and after implementation. The red run recorded **12 failed, 74 passed; exit 1**. The green run recorded **86 passed, 0 failed; exit 0**. After emitter construction alone, the same command still recorded **12 failed, 74 passed**, confirming missing event behavior beyond the absent emitter member.

| Semantic requirement | Test titles |
| --- | --- |
| Single and batch additions | `emits add with the exact tool after registration`; `emits add for each batch tool in array order and nothing for an empty batch` |
| Replacement ordering and identity | `emits remove before add for replacements while preserving registration position` |
| Single, missing, and batch removals | `emits remove after deleting the exact tool and stays silent for a missing name`; `emits batch removals in requested order and reports missing or repeated names` |
| Populated and empty clearing | `emits one clear snapshot in registration order after emptying the registry`; `emits one empty clear event for every clear of an empty registry` |
| Initial hooks and listener isolation | `forwards initial registry hooks for add, remove, and clear`; `forwards listener errors without preventing sibling listeners` |
| Destruction and later additions | `destroys the emitter after clearing the registry and publishing the removed tools`; `publishes nothing for a later add after destroy while updating the registry` |
| Unchanged, silent execution | `executes single and batch calls without publishing registry events` |

Event capture uses the installed `createRecorders` and `createRecorder` primitives. No recorder helper was declared.

## Unknown reading

The [emitter guide](C:/Users/mikes/WebstormProjects/scaffold/guides/emitter.md) specifies that `emit()` does nothing after `destroy()`, matching the installed implementation.

`ToolManager.destroy()` empties the registry, publishes `clear`, then destroys the emitter. A later `add()` updates the map and reaches no listener. TSDoc and tests pin this behavior.

## Acceptance readings

The acceptance commands returned:

| Command | Exit | Reading |
| --- | ---: | --- |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 0 | 86 passed |
| `npm.cmd run test:guides` | 0 | 31 passed |
| `npm.cmd run test:setup` | 0 | 2 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run format:check` | 0 | 43 files checked |

The existing skips concern the absent local writing-rule table and the unavailable-extractor case when the extractor is installed. `git diff --check` reported no whitespace errors.

## Deviation state

No stopping deviation. No agents spawned.

Recorder calls require explicit type arguments; emitter construction omits absent optional fields to satisfy `exactOptionalPropertyTypes`. Both preserve the requested contract. The `prove` tool was unavailable as briefed; the readings above are exact-command observations for the Orchestrator’s independent verification.