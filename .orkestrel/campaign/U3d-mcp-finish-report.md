# U3d report

All carriers are closed. Acceptance gates and observations passed.

## Touched files

Changes build on the inherited U3/U3c edits.

| File | U3d change |
|---|---|
| [guides/mcp.md](C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md) | Corrected caller context, refresh ownership/outcome, executed-fence lists, schema default, and Surface ordering. |
| [guides/tool.md](C:/Users/mikes/WebstormProjects/mcp/guides/tool.md) | Byte-copied the accepted tool guide. |
| [src/core/MCPClient.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPClient.ts) | Omits empty inverse-projected annotations. |
| [src/core/MCPServer.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/MCPServer.ts) | Passes `MCPMethodOptions` into `#execute`. |
| [src/core/helpers.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/helpers.ts) | Omits empty wire annotations. |
| [src/core/types.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/types.ts) | Names `options.caller` in the task-handler remark. |
| [src/core/validators.ts](C:/Users/mikes/WebstormProjects/mcp/src/core/validators.ts) | Validates only consumed annotation hints. |
| [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/guides.test.ts) | Consumes refresh outcomes and proves initial collision refusal. |
| [tests/setup.ts](C:/Users/mikes/WebstormProjects/mcp/tests/setup.ts) | Declares fixture interfaces, annotates factories/snapshot, and transcribes the refresh outcome. |
| [tests/src/core/MCPClient.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/src/core/MCPClient.test.ts) | Adds annotation regressions and removes duplicate refresh coverage. |
| [tests/src/core/MCPServer.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/src/core/MCPServer.test.ts) | Proves caller omission when delegating and empty wire-annotation omission. |
| [tests/src/core/helpers.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/src/core/helpers.test.ts) | Separates projection coverage and pins call-builder arity. |
| [tests/src/core/validators.test.ts](C:/Users/mikes/WebstormProjects/mcp/tests/src/core/validators.test.ts) | Proves consumed-field validation and corrects import/guard ordering. |

## Red-then-green evidence

### Carrier 5

Test: **passes caller identity to a custom execution handler separately from the call envelope**.

Negative control emitted an absent caller as an explicit property. Result: **1 failed, exit 1 → 1 passed, exit 0**.

```powershell
npm.cmd run test:src:core -- -t 'passes caller identity to a custom execution handler separately from the call envelope'
```

### Carriers 6 and 7

The following tests failed against the preceding implementation and passed after repair:

| Carrier | Test title |
|---|---|
| 6 | omits annotations on tools/list when a tool only declares untrusted |
| 6 | omits wrapped annotations when the wire descriptor has empty annotations |
| 7 | validates consumed annotation booleans and ignores unconsumed wire fields |
| 7 | maps readOnlyHint while ignoring an unconsumed malformed openWorldHint |

Combined result: **4 failed, exit 1 → 4 passed, exit 0**.

```powershell
npm.cmd run test:src:core -- -t 'omits annotations on tools/list|omits wrapped annotations|validates consumed annotation|maps readOnlyHint while'
```

### Carrier 13

Test: **builds call envelopes without caller identity and preserves supplied arguments**.

Restoring a third parameter failed the arity assertion. Result: **1 failed, exit 1 → 1 passed, exit 0**.

```powershell
npm.cmd run test:src:core -- -t 'builds call envelopes without caller identity and preserves supplied arguments'
```

Test: **refuses an initial remote name collision while adding noncolliding tools beside the local tool**.

Removing the collision branch failed the outcome assertion. Result: **1 failed, exit 1 → 1 passed, exit 0**.

```powershell
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project guides -t 'refuses an initial remote name collision while adding noncolliding tools beside the local tool'
```

## Acceptance results

The U3d baseline `npm.cmd run test:src:core` passed **929 tests**, exit **0**.

Final gate readings follow.

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | No type errors |
| `npm.cmd run test:src:core` | 0 | 931 passed |
| `npm.cmd run test:src:server` | 0 | 374 passed |
| `npm.cmd run test:integration` | 0 | 4 passed |
| `npm.cmd run test:guides` | 0 | 168 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 86 passed |
| `npm.cmd run format:check` | 0 | 126 files checked |
| `git diff --check` | 0 | No whitespace errors |
| `cmp.exe guides/tool.md ../tool/guides/tool.md` | 0 | Byte-identical |
| `node tmp/codex/U3d-verify.mjs` | 0 | All 13 touched files LF-only and valid UTF-8; refresh function and result interface byte-identical to the fence |

The requested observations also passed.

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run test:src:browser` | 0 | 60 passed |
| `npm.cmd test` | 0 | 1,932 passed, 2 skipped across the chained projects |

## `git diff --stat main`

The cumulative diff includes the inherited edits.

```text
 guides/mcp.md                     | 139 +++++++++++++++++----
 guides/tool.md                    | 257 +++++++++++++++++++++++++++++---------
 src/core/MCPClient.ts             |  41 +++---
 src/core/MCPServer.ts             |  15 ++-
 src/core/helpers.ts               |  62 +++++++--
 src/core/types.ts                 |  49 ++++++--
 src/core/validators.ts            |  27 ++++
 tests/guides.test.ts              | 121 ++++++++++++++++++
 tests/setup.ts                    | 114 ++++++++++++++++-
 tests/src/core/MCPClient.test.ts   | 130 ++++++++++++++++++-
 tests/src/core/MCPServer.test.ts   | 140 ++++++++++++++++++++-
 tests/src/core/helpers.test.ts    |  50 +++++++-
 tests/src/core/validators.test.ts |  32 +++++
 13 files changed, 1041 insertions(+), 136 deletions(-)
```

## `git status --porcelain`

The final working-tree status is:

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

## Deviation state

No scope or implementation deviations. No shared-file patches are required. The prescribed proof fallback used Vitest regressions, mutation controls, and typechecking; no `prove` receipt is claimed.