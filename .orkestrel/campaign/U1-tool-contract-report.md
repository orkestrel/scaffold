## Result

Implemented U1b. All acceptance gates pass. The final `npm.cmd test` observation exits 0.

## Touched files

| File | Change |
|---|---|
| `src/core/types.ts` | Adds context, annotations, error codes, contract options, and execution signatures; removes call-envelope caller. |
| `src/core/errors.ts` | Adds `ToolError` with readonly code and optional context. |
| `src/core/tools/Tool.ts` | Derives parameters, validates arguments, forwards context, and exposes advertising fields. |
| `src/core/tools/ToolManager.ts` | Creates or forwards context, shares it across batches, and refuses pre-aborted calls. |
| `src/core/helpers.ts` | Projects title and annotations while preserving summary substitution. |
| `src/core/validators.ts` | Adds total `isToolError`; documents ignored extra call fields. |
| `src/core/index.ts` | Exports errors in the prescribed barrel order. |
| `tests/src/core/tools/Tool.test.ts` | Pins execution types, contract behavior, diagnostics, and context identity. |
| `tests/src/core/tools/ToolManager.test.ts` | Pins cancellation, context creation and sharing, and contained validation failures. |
| `tests/src/core/helpers.test.ts` | Pins advertising fields and omission of execution context. |
| `tests/src/core/validators.test.ts` | Pins error narrowing and hostile-prototype containment. |
| `tests/src/core/factories.test.ts` | Supplies context for direct execution. |
| `tests/guides.test.ts` | Executes the context, validation, and advertising examples. |
| `guides/tool.md` | Documents the complete contract and runnable examples. |

## Behavioral proofs

| Behavior | Exact test title |
|---|---|
| Required context; call keys | `requires execution context and excludes caller from the call envelope` |
| Direct context forwarding | `forwards the exact context and always supplies the handler context argument` |
| Derived parameters | `derives advertised parameters from the supplied contract at construction` |
| Conflicting schema options | `rejects simultaneous contract and parameters with a guarded SCHEMA error` |
| Validation before handler; full faults | `refuses invalid arguments before the handler and preserves the full fault report` |
| Fault-union message handling | `reports missing, constraint, variant, and oneOf faults without inventing absent members` |
| Parse semantics; original arguments | `uses explain coercion semantics while forwarding the original arguments` |
| Descriptive parameters alone | `does not validate an advertised schema without a contract` |
| Default signal | `mints a non-aborted signal when execution context is omitted` |
| Supplied context identity | `forwards a supplied context and caller identity unchanged` |
| Mid-execution abort | `delivers an abort to a handler during execution` |
| Pre-aborted refusal | `refuses an already-aborted signal without entering the handler` |
| Contained contract error | `contains contract refusal as a failure naming the argument path and reason` |
| Batch context and isolation | `shares one context across a batch and preserves order beside a thrown handler` |
| Per-call abort check | `checks the signal again before entering each batch handler` |
| Advertising projection | `forwards title and annotations while substituting summary for description` |
| Caller field remains unread | `ignores extra caller fields without reading them` |
| Error guard | `recognizes tool errors and rejects unrelated values` |
| Guard containment | `contains hostile prototype access while narrowing errors` |

The guide transcriptions pass under:

- `propagates context and refuses an abort exactly as the execution context fence claims`
- `validates and narrows errors exactly as the contract fence claims`
- `projects metadata exactly as the advertising fence claims`

## Acceptance evidence

These are the final readings.

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run format:check` | 0 | 42 files checked |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root and core type checks pass |
| `npm.cmd run test:src:core` | 0 | 69 passed across 5 files |
| `npm.cmd run test:guides` | 0 | 28 passed |
| `npm.cmd run test:policy` | 0 | 90 passed, 1 skipped |
| `npm.cmd run test:config` | 0 | 172 passed, 1 skipped |
| `npm.cmd run test:setup` | 0 | 2 passed |
| `npm.cmd test` | 0 | 361 passed, 2 skipped across 9 files |
| `git diff --check` | 0 | Clean |

Before implementation, `npm.cmd run test:src:core` exited 1 with 14 failed and 55 passed. After the type change, guide parity exited 1 with 2 failed and 23 passed. Final runs pass.

An earlier full-suite observation exited 1 because an exact-error assertion also compared the fault context. The corrected message assertion passes. An intermediate lint run found a shadowed example variable; the final run passes.

Configuration reports the existing API Extractor bundled TypeScript 5.9.3 versus project TypeScript 6.0.3 warning. The skips are existing conditional policy/configuration cases.

## `git diff --stat`

```text
 guides/tool.md                           | 224 +++++++++++++++++++++++--------
 src/core/helpers.ts                      |  22 ++-
 src/core/index.ts                        |   3 +-
 src/core/tools/Tool.ts                   |  46 +++++--
 src/core/tools/ToolManager.ts            |  34 +++--
 src/core/types.ts                        |  72 +++++++---
 src/core/validators.ts                   |  24 +++-
 tests/guides.test.ts                     |  89 +++++++++++-
 tests/src/core/factories.test.ts         |   2 +-
 tests/src/core/helpers.test.ts           |  26 ++++
 tests/src/core/tools/Tool.test.ts        | 185 ++++++++++++++++++++-----
 tests/src/core/tools/ToolManager.test.ts | 182 +++++++++++++++++++------
 tests/src/core/validators.test.ts        |  40 +++++-
 13 files changed, 756 insertions(+), 193 deletions(-)
```

The untracked `src/core/errors.ts` file is excluded from this stat.

## `git status --porcelain`

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

## Deviation state

No stopping deviation. No off-limits files changed, dependencies added, version bumped, build run, or git mutations performed.

Declaration decisions:

- `FieldPath` permits strings and readonly string arrays: strings remain unchanged; arrays join with `.`.
- `explain` uses parse/coercion semantics. Coercible arguments remain accepted and reach handlers unchanged.
- Messages include `expected` and `received` only when present on the fault arm. An empty root path produces a message beginning `: `.
- The `oneOf` proof uses the installed `oneOfShape` primitive.
- Type proofs use `expectTypeOf` checked by `npm.cmd run check`, as instructed.

Independent audit and authoritative acceptance remain with the Orchestrator.