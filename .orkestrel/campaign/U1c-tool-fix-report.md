# U1c report

Carriers 1–10 are implemented. All acceptance gates pass. U1b’s uncommitted edits remain intact.

## Touched files

This round changed these files:

- `src/core/types.ts` — adds `ToolErrorContext`; documents parsing, caller migration, and direct abort behavior.
- `src/core/errors.ts` — types `context` and declares the literal error name.
- `src/core/tools/Tool.ts` — forwards parsed arguments, reports constraint bounds, and refuses failed parsing.
- `tests/src/core/tools/Tool.test.ts` — strengthens context, projection, fault, coercion, migration, and direct-abort proofs.
- `tests/src/core/tools/ToolManager.test.ts` — distinguishes synchronous and asynchronous batch aborts.
- `tests/guides.test.ts` — executes registry lookup/projection, checks error-context parity, and compares every complete fence.
- `guides/tool.md` — corrects execution semantics, migration guidance, error documentation, examples, wrapping, and the requested Tests rows.

## Diff and status

`git diff --stat main` returned:

```text
 guides/tool.md                           | 253 +++++++++++++++++++------
 src/core/helpers.ts                      |  22 +--
 src/core/index.ts                        |   3 +-
 src/core/tools/Tool.ts                   |  54 +++++-
 src/core/tools/ToolManager.ts            |  34 ++--
 src/core/types.ts                        |  91 ++++++---
 src/core/validators.ts                   |  24 ++-
 tests/guides.test.ts                     | 223 +++++++++++++++++++++-
 tests/src/core/factories.test.ts         |   2 +-
 tests/src/core/helpers.test.ts           |  26 +++
 tests/src/core/tools/Tool.test.ts        | 306 ++++++++++++++++++++++++++++---
 tests/src/core/tools/ToolManager.test.ts | 249 +++++++++++++++++++++----
 tests/src/core/validators.test.ts        |  40 +++-
 13 files changed, 1133 insertions(+), 194 deletions(-)
```

The stat includes U1b’s edits and excludes the untracked `src/core/errors.ts`.

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
```

## Carrier proofs

The quoted arguments below are the exact core test titles. Guide-only proofs run through `test:guides`; the core project does not collect them.

### 1 — Batch abort semantics

```powershell
npm.cmd run test:src:core -- -t 'refuses later batch handlers after a synchronous abort inside dispatch'
npm.cmd run test:src:core -- -t 'enters and succeeds in a later sibling when an earlier handler aborts asynchronously'
npm.cmd run test:src:core -- -t 'lets a sibling observe the signal after an asynchronous batch abort'
```

### 2 — Weak assertions

```powershell
npm.cmd run test:src:core -- -t 'requires execution context and excludes caller from the call envelope'
npm.cmd run test:src:core -- -t 'derives advertised parameters from the supplied contract at construction'
npm.cmd run test:src:core -- -t 'validates with explain and forwards parsed arguments with coercion and dropped keys'
npm.cmd run test:src:core -- -t 'reports missing, constraint, variant, and oneOf faults without inventing absent members'
```

### 3 — Registry transcription

The guide proof is `counts, orders, and removes exactly as the registry fence claims`, executed by `npm.cmd run test:guides`. It asserts registered-instance identity and ordered projected fields.

Supporting core proofs are:

```powershell
npm.cmd run test:src:core -- -t 'adds one tool and returns the exact registered instance'
npm.cmd run test:src:core -- -t 'projects plain definitions and omits absent optional keys'
```

### 4 — Caller migration

```powershell
npm.cmd run test:src:core -- -t 'delivers context to an unknown-annotated parameter and caller through context'
```

### 5 — Constraint diagnostics

```powershell
npm.cmd run test:src:core -- -t 'reports missing, constraint, variant, and oneOf faults without inventing absent members'
```

The pinned message is `amount: constraint; expected number; received 0; constraint min; limit 1`.

### 6 — Guide Tests rows

The corrected rows name these existing proofs:

```powershell
npm.cmd run test:src:core -- -t 'recognizes tool errors and rejects unrelated values'
npm.cmd run test:src:core -- -t 'contains hostile prototype access while narrowing errors'
npm.cmd run test:src:core -- -t 'forwards title and annotations while substituting summary for description'
```

### 7 — Typed error context

```powershell
npm.cmd run test:src:core -- -t 'refuses invalid arguments before the handler and preserves the full fault report'
npm.cmd run test:src:core -- -t 'recognizes tool errors and rejects unrelated values'
```

`npm.cmd run check` validates the `ToolErrorContext`, readonly `Fault[]`, and literal-name type assertions. `npm.cmd run test:guides` runs `documents the exported error context with its faults member`.

### 8 — Guide transcript

`npm.cmd run test:guides` runs `keeps every fence byte-equal to its transcription` and the executed fence proofs. The guide declares the following sections independent examples; the Anatomy, registry, and calls fences were preserved. No core test can establish this documentation-only property.

### 9 — Parsed argument forwarding

```powershell
npm.cmd run test:src:core -- -t 'validates with explain and forwards parsed arguments with coercion and dropped keys'
npm.cmd run test:src:core -- -t 'refuses a parse that becomes undefined after a clean explanation'
npm.cmd run test:src:core -- -t 'forwards the exact arguments object'
```

### 10 — Direct aborted execution

```powershell
npm.cmd run test:src:core -- -t 'enters a direct handler with an already-aborted signal'
```

## Verification

The acceptance commands produced these results:

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root and core typechecks pass |
| `npm.cmd run test:src:core` | 0 | 74 passed |
| `npm.cmd run test:guides` | 0 | 30 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 existing conditional skip |
| `npm.cmd run test:config` | 0 | 172 passed, 1 existing conditional skip |
| `npm.cmd run test:setup` | 0 | 2 passed |
| `npm.cmd run format:check` | 0 | 42 files checked |
| `git diff --check` | 0 | No whitespace errors |

Whole-suite observation: `npm.cmd run test` exited 0, with 368 passed and 2 conditional skips across its projects.

The constraint, coercion, and changing-read regressions first ran together with exit 1 and 3 failures; the identical command subsequently exited 0 with 3 passes. Removing `explain`, removing parsed forwarding, and leaving parameters unassigned each produced one targeted failure. After restoration, the corresponding targeted commands passed.

## Deviation state

No implementation or scope deviation. No installs, git mutations, version bump, off-limits edits, or agent delegation.

The undefined-parse fallback is reachable through a changing argument getter: `explain` accepts its first value, then `parse` rejects its later value. The installed contract’s equivalence requires stable reads. That case is tested and returns `ToolError('ARGUMENTS', ': parse')`.

Reporting adjustment: documentation-only proofs use `npm.cmd run test:guides`, because `test:src:core` cannot execute their titles.