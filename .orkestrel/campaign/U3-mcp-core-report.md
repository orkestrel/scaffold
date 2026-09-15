## Result

U3c is complete. All acceptance gates and observations pass.

## Touched files

The final changes are:

| File | Summary |
|---|---|
| `src/core/types.ts` | Defines wire annotations and documents execution context, cancellation, and snapshot semantics. |
| `src/core/helpers.ts` | Separates caller identity from call envelopes and projects tool metadata. |
| `src/core/validators.ts` | Validates wire annotation fields without coercion. |
| `src/core/MCPServer.ts` | Forwards signal and caller through default and custom execution. |
| `src/core/MCPClient.ts` | Uses the bound handler, forwards cancellation, and preserves mapped metadata. |
| `tests/src/core/MCPServer.test.ts` | Covers cancellation, connection reuse, caller identity, and advertised metadata. |
| `tests/src/core/MCPClient.test.ts` | Covers wrapped cancellation, metadata, and explicit refresh. |
| `tests/src/core/helpers.test.ts` | Covers annotation projections and context-free call envelopes. |
| `tests/src/core/validators.test.ts` | Covers malformed annotations and guard totality. |
| `tests/setup.ts` | Supplies real cancellation and duplex refresh fixtures. |
| `tests/guides.test.ts` | Executes the refresh example and its outcomes. |
| `guides/mcp.md` | Documents cancellation, metadata loss, and explicit refresh; uses LF endings. |
| `guides/tool.md` | Matches the canonical tool guide byte for byte. |

## Baselines

The recorded readings are:

- Original red typecheck: exit **2**, **1 error**, solely `tests/src/core/MCPClient.test.ts(1204,29)` — `TS2554: Expected 2 arguments, but got 1`.
- U3c pre-edit typecheck: exit **0**, **0 errors**.
- U3c pre-edit core tests: exit **0**, **929 passed**.
- U3c pre-edit lint: exit **1**, **3 errors and 5 warnings**; all corrected without suppressions.

## Behavior proofs

The test titles are:

- `aborts default tool execution on a duplex cancellation and keeps the connection usable`
- `passes caller identity to a custom execution handler separately from the call envelope`
- `forwards caller context to real tool bodies in both eras and preserves absence`
- `advertises titles and mapped annotation hints on tools/list`
- `forwards a wrapped tool context signal to the server and preserves the connection after abort`
- `carries title and inverse-projected annotations while advertising the authored summary`
- `projects explicit annotation booleans and omits unmapped hints without defaults`
- `builds call envelopes without caller identity and preserves supplied arguments`
- `accepts optional wire hints and refuses malformed known fields without coercion`
- `refreshes a mixed registry by adding and replacing remote tools, refusing collisions, and retaining failed snapshots`

The executed guide additionally proves:

- `adds remote tools beside the local tool from an initial snapshot`
- `replaces remote tools on list_changed and removes obsolete remote names`
- `records a remote name collision and preserves the local tool`
- `records a failed tools fetch and keeps the last installed snapshot`

## Acceptance readings

Commands ran on Windows on 2026-09-15.

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run lint:check` | 0 | No errors or warnings |
| `npm.cmd run check` | 0 | No type errors |
| `npm.cmd run test:src:core` | 0 | 929 passed |
| `npm.cmd run test:src:server` | 0 | 374 passed |
| `npm.cmd run test:integration` | 0 | 4 passed |
| `npm.cmd run test:guides` | 0 | 167 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 86 passed |
| `npm.cmd run format:check` | 0 | 126 files checked |
| `npm.cmd run test:src:browser` | 0 | 60 passed |
| `npm.cmd test` | 0 | 1,929 passed, 2 skipped across the chain |
| `git diff --check` | 0 | Clean |

The existing skips concern the absent local policy-writing table and the unavailable-extractor branch when the extractor is installed. Conformance passed **47 tests** within `npm.cmd test`.

Every touched file contains **0 carriage-return bytes**. The tool guide and its canonical source share SHA-256:

```text
9B1DECAD64E102741191DD32AF9BAA5A2E435B6C8D13ECDF7ABC6411AFFBE332
```

## Unknown resolved

`tests/mirrors/ext-tasks-2026-07-28-schema.json` declares optional `Tool.title` and `Tool.annotations`. `ToolAnnotations` declares optional string `title` and optional booleans `readOnlyHint`, `destructiveHint`, `idempotentHint`, and `openWorldHint`.

Installed `ToolContext` occurrence counts match the brief: tool **8**, agent **1**.

## Git evidence

`git diff --stat` reports:

```text
 guides/mcp.md                     | 117 +++++++++++++++---
 guides/tool.md                    | 253 +++++++++++++++++++++++++++++---------
 src/core/MCPClient.ts             |  42 ++++---
 src/core/MCPServer.ts             |  13 +-
 src/core/helpers.ts               |  70 ++++++++---
 src/core/types.ts                 |  47 +++++--
 src/core/validators.ts            |  27 ++++
 tests/guides.test.ts              | 107 ++++++++++++++++
 tests/setup.ts                    |  88 +++++++++++++
 tests/src/core/MCPClient.test.ts  | 128 ++++++++++++++++++-
 tests/src/core/MCPServer.test.ts  | 106 +++++++++++++++-
 tests/src/core/helpers.test.ts    |  45 ++++++-
 tests/src/core/validators.test.ts |  32 +++++
 13 files changed, 944 insertions(+), 131 deletions(-)
```

`git status --porcelain` reports:

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

## Shared patches and deviations

Shared-file patches: **none**.

Deviation state: **none requiring escalation**. No off-limits files changed. No agents spawned, packages installed, versions changed, or Git mutations performed.