## Result

F5–F11 are closed. Required gates pass. U1b/U1c’s uncommitted edits remain intact.

## Touched files

U1d changed these files:

- [errors.ts](C:/Users/mikes/WebstormProjects/tool/src/core/errors.ts) — receives `isToolError` and its documentation.
- [validators.ts](C:/Users/mikes/WebstormProjects/tool/src/core/validators.ts) — removes the error guard and its imports.
- [types.ts](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts) — states the execution-context parameter in present tense.
- [helpers.ts](C:/Users/mikes/WebstormProjects/tool/src/core/helpers.ts) — names `parameters` and `annotations` as carried by reference.
- [Tool.ts](C:/Users/mikes/WebstormProjects/tool/src/core/tools/Tool.ts) — adds variant/match diagnostics and the plain parse-failure message.
- [errors.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/errors.test.ts) — receives guard tests and pins its module export.
- [validators.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/validators.test.ts) — retains call-envelope tests.
- [Tool.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/Tool.test.ts) — pins exact fault messages and absent parse-error context.
- [guides.test.ts](C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts) — reads and asserts the error-context Shape cell.
- [tool.md](C:/Users/mikes/WebstormProjects/tool/guides/tool.md) — corrects placement, diagnostics, migration version, summaries, test references, and wrapping.

Ignored scratch instruments reside under `tmp/codex/U1d-*.py`.

## Carrier proofs

Carriers 1 and 5 ran with this exact command:

```text
npm.cmd run test:src:core -- tests/src/core/errors.test.ts tests/src/core/tools/Tool.test.ts
```

The test titles are:

- `recognizes tool errors and rejects unrelated values`
- `contains hostile prototype access while narrowing errors`
- `reports missing, constraint, variant, and oneOf faults without inventing absent members`

Initial result: exit 1, 3 failed and 16 passed, including the parse-message regression. After the variant fix, the same command failed specifically on `: oneOf; matched 2`: 1 failed and 18 passed. Final result: exit 0, 19 passed.

Carrier 2 uses `documents the exported error context with its faults member`, with this exact command:

```text
npm.cmd run test:guides
```

Clearing only the Shape cell produced exit 1, 1 failed and 29 passed. Restoring it produced exit 0, 30 passed.

## Acceptance evidence

The final commands returned these results:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run format:check` | 0 | 43 files checked |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root and core type checks passed |
| `npm.cmd run test:src:core` | 0 | 74 passed across 6 files, including `errors.test.ts` |
| `npm.cmd run test:guides` | 0 | 30 passed; fence transcriptions byte-equal |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 2 passed |
| `git diff --check` | 0 | No whitespace errors |

Whole-suite observation: `npm.cmd run test` exited 0 with 368 passed and 2 skipped. Config tests emitted the API Extractor compiler-version advisory.

## Git evidence

`git diff --stat main` returned the cumulative tracked changes; untracked files are excluded:

```text
 guides/tool.md                           | 257 ++++++++++++++++++++------
 src/core/helpers.ts                      |  26 ++-
 src/core/index.ts                        |   3 +-
 src/core/tools/Tool.ts                   |  56 +++++-
 src/core/tools/ToolManager.ts            |  34 ++--
 src/core/types.ts                        |  89 ++++++---
 src/core/validators.ts                   |   3 +-
 tests/guides.test.ts                     | 227 ++++++++++++++++++++++-
 tests/src/core/factories.test.ts         |   2 +-
 tests/src/core/helpers.test.ts           |  26 +++
 tests/src/core/tools/Tool.test.ts        | 307 ++++++++++++++++++++++++++++---
 tests/src/core/tools/ToolManager.test.ts | 249 +++++++++++++++++++++----
 tests/src/core/validators.test.ts        |   4 +-
 13 files changed, 1090 insertions(+), 193 deletions(-)
```

`git status --porcelain` returned:

```text
 M guides/tool.md
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/tools/Tool.ts
 M src/core/tools/ToolManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/tools/Tool.test.ts
 M tests/src/core/tools/ToolManager.test.ts
 M tests/src/core/validators.test.ts
?? src/core/errors.ts
?? tests/src/core/errors.test.ts
```

Git emitted the brief’s anticipated global-ignore permission warning.

## Deviation state

None. No delegation, installs, git mutations, version bump, dependency changes, or edits to the scaffold repair set.