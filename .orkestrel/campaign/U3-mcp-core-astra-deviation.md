## Deviation state: stopped, incomplete

The required arrow handler at `src/core/MCPClient.ts:793` fails `policy/no-nested-functions`. Scaffold’s [architecture rule](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md) states:

> “Never declare or assign a function inside another function or method.”

The brief requires that exact handler form, requires lint exit 0, and makes the enforcing policy files off-limits. Work stopped under the deviation contract. No policy files were edited.

The checkout also names the execution type `MCPExecutionContext`, not `MCPExecutionInput`; `caller?` was added to the existing type.

## Touched files

| File | Summary |
|---|---|
| `src/core/types.ts` | Added caller context and wire metadata contracts; revised cancellation documentation. |
| `src/core/helpers.ts` | Removed caller from call envelopes; added annotation projections and descriptor metadata. |
| `src/core/validators.ts` | Added tool-annotation validation. |
| `src/core/MCPServer.ts` | Forwarded signal and caller through default and custom execution. |
| `src/core/MCPClient.ts` | Forwarded wrapped-tool signals and metadata. |
| `tests/setup.ts` | Added real cancellation and refresh fixtures and shared refresh transcription. |
| `tests/src/core/MCPServer.test.ts` | Added cancellation, custom-caller, and descriptor tests; adopted separate context. |
| `tests/src/core/MCPClient.test.ts` | Added wrapped cancellation, metadata, and refresh tests. |
| `tests/src/core/helpers.test.ts` | Tested annotation projections and caller-free envelopes. |
| `tests/src/core/validators.test.ts` | Tested annotation validation and registered its totality coverage. |
| `tests/guides.test.ts` | Executed refresh outcomes against a real duplex server pair. |
| `guides/mcp.md` | Documented refresh, metadata loss, and cancellation; retained protocol non-goals. |
| `guides/tool.md` | Copied the canonical tool guide byte-for-byte. |

## Test titles by behavior

- Default cancellation: `aborts default tool execution on a duplex cancellation and keeps the connection usable`
- Custom caller: `passes caller identity to a custom execution handler separately from the call envelope`
- Wire metadata: `advertises titles and mapped annotation hints on tools/list`
- Wrapped cancellation: `forwards a wrapped tool context signal to the server and preserves the connection after abort`
- Wrapped metadata: `carries title and inverse-projected annotations while advertising the authored summary`
- Annotation projection: `projects explicit annotation booleans and omits unmapped hints without defaults`
- Call envelope: `builds call envelopes without caller identity and preserves supplied arguments`
- Annotation validation: `accepts optional wire hints and refuses malformed known fields without coercion`
- Core refresh: `refreshes a mixed registry by adding and replacing remote tools, refusing collisions, and retaining failed snapshots`
- Guide addition: `adds remote tools beside the local tool from an initial snapshot`
- Guide replacement: `replaces remote tools on list_changed and removes obsolete remote names`
- Guide collision: `records a remote name collision and preserves the local tool`
- Guide failure: `records a failed tools fetch and keeps the last installed snapshot`

## Command evidence

The baseline typecheck reported **1 error**, in `tests/src/core/MCPClient.test.ts:1204`: TS2554, expected 2 arguments but received 1.

| Command | Exit | Result |
|---|---:|---|
| Baseline `npm.cmd run check` | 2 | 1 error |
| Baseline `npm.cmd run test:src:core` | 1 | 919 passed, 1 failed |
| Regression `npm.cmd run test:src:core` | 1 | 919 passed, 6 failed |
| Latest `npm.cmd run check` | 0 | No diagnostics |
| Latest `npm.cmd run test:src:core` | 0 | 929 passed; 17 files |
| `npm.cmd run test:guides` | 1 | 166 passed, 1 failed |
| `npm.cmd run lint:check` | 1 | 3 errors, 5 warnings |
| Scoped `npx.cmd oxfmt … --write <owned files>` | 0 | 12 files processed |

The guide failure was a stale descriptor summary. That summary was corrected, but the gate was not rerun before stopping. Remaining lint findings include unawaited-assertion diagnostics and shadowed test bindings.

The following commands were **not run** after the deviation: `test:src:server`, `test:integration`, `test:policy`, `test:config`, `test:setup`, `format:check`, `test:src:browser`, and `npm.cmd test`.

The tool-guide SHA-256 comparison confirmed byte identity.

## Unknown resolved

`tests/mirrors/ext-tasks-2026-07-28-schema.json` declares:

- `Tool.title`: optional string.
- `Tool.annotations`: optional reference to `ToolAnnotations`.
- Annotation fields: optional `title`, `readOnlyHint`, `destructiveHint`, `idempotentHint`, and `openWorldHint`.

The implementation maps only the prescribed domain hints and supplies no defaults.

## Shared-file patches

None. Shared files were not edited.

## `git diff --stat`

```text
 guides/mcp.md                     | 117 +++++++++++++++---
 guides/tool.md                    | 253 +++++++++++++++++++++++++++++---------
 src/core/MCPClient.ts             |  44 ++++---
 src/core/MCPServer.ts             |  13 +-
 src/core/helpers.ts               |  70 ++++++++---
 src/core/types.ts                 |  47 +++++--
 src/core/validators.ts            |  27 ++++
 tests/guides.test.ts              | 107 ++++++++++++++++
 tests/setup.ts                    |  88 +++++++++++++
 tests/src/core/MCPClient.test.ts  | 128 ++++++++++++++++++-
 tests/src/core/MCPServer.test.ts  | 103 +++++++++++++++-
 tests/src/core/helpers.test.ts    |  45 ++++++-
 tests/src/core/validators.test.ts |  32 +++++
 13 files changed, 942 insertions(+), 132 deletions(-)
```

## `git status --porcelain`

```text
 M guides/mcp.md
 M guides/tool.md
 M src/core/MCPClient.ts
 M src/core/MCPServer.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/core/MCPClient.test.ts
 M tests/src/core/MCPServer.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
```