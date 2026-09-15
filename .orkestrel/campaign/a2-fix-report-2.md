# Unit A2-fix report — second run

## Touched files

Implemented F10–F19 within the amended ownership boundary. The `git diff --stat` command reports:

```text
 src/core/AgentProvider.ts                      |   8 +-
 src/core/RelayStream.ts                        |  16 ++--
 src/core/constants.ts                          |   3 +
 src/core/factories.ts                          |  70 +++++++++++++--
 src/core/helpers.ts                            |  13 ++-
 src/core/providers/RelayProvider.ts            | 116 ++++++++++++++++---------
 src/core/shapers.ts                            |   1 -
 src/core/types.ts                              |  20 ++++-
 tests/setup.ts                                 |  68 ++++++++++++++-
 tests/src/core/AgentProvider.test.ts           |  36 +++++++-
 tests/src/core/RelayStream.test.ts             |  22 ++++-
 tests/src/core/factories.test.ts               |  85 +++++++++++++++++-
 tests/src/core/helpers.test.ts                 |  33 ++++---
 tests/src/core/integration.test.ts             |  58 +++++++++++++
 tests/src/core/providers/RelayProvider.test.ts |  65 +++++++++++++-
 15 files changed, 523 insertions(+), 91 deletions(-)
```

The `git status --porcelain` command reports:

```text
 M src/core/AgentProvider.ts
 M src/core/RelayStream.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/providers/RelayProvider.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M tests/setup.ts
 M tests/src/core/AgentProvider.test.ts
 M tests/src/core/RelayStream.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/providers/RelayProvider.test.ts
```

## Red then green

These measurements come from executed Vitest runs on Windows on 2026-09-14. Each row uses the same command before and after repair. Filtered-out tests are excluded from the measurements.

| Finding | Exact command | Red: failed / passed | Green: failed / passed |
| --- | --- | --- | --- |
| F10 | `npm.cmd run test:src:core -- tests/src/core/helpers.test.ts tests/src/core/AgentProvider.test.ts tests/src/core/factories.test.ts -t "readText\|bounds the error-body\|exact-bound stalled\|default limit"` | 8 / 12 | 0 / 20 |
| F11 | `npm.cmd run test:src:core -- tests/src/core/providers/RelayProvider.test.ts -t "synthetic\|request snapshot"` | 3 / 0 | 0 / 3 |
| F12 | `npm.cmd run test:src:core -- tests/src/core/factories.test.ts -t "answers 400\|answers 502\|keeps a body-read\|keeps an inbound"` | 4 / 1 | 0 / 5 |
| F13 | `npm.cmd run test:src:core -- tests/src/core/RelayStream.test.ts -t "queued unread frame"` | 1 / 0 | 0 / 1 |
| F14 | `npm.cmd run test:src:core -- tests/src/core/integration.test.ts -t "refusal through the browser"` | 3 / 0 | 0 / 3 |
| F15 | `npm.cmd run test:probe -- tmp/probe/a2-examples.test.ts` | 1 / 0 | 0 / 1 |
| F16 | `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t "empty error excerpt"` | 1 / 0 | 0 / 1 |
| F18 | `npm.cmd run test:src:core -- tests/src/core/providers/RelayProvider.test.ts -t "decorative code"` | 1 / 0 | 0 / 1 |

F10 proves EOF below the limit, refusal at the limit, an unread empty chunk after the limit, bounded overshoot, and prompt rejection of the stalled error body. The stalled case returns the bounded HTTP error before its 80 ms provider deadline within its 400 ms test budget.

F11 uses the installed `@orkestrel/contract` package at version `0.0.17`. Its `cloneJSONValue` function creates a deeply frozen snapshot without retaining caller objects. An executed probe showed that cloning alone strips the synthetic serializer. The repair therefore rejects callable serializers on parameters and schema before cloning, validates the snapshot, and returns that snapshot. The hostile inputs produce the `PROTOCOL` code without fetching; the valid request retains its original JSON values after caller mutation.

F12 proves empty responses for body-read failure and synchronous provider-call failure, listener cleanup, and the retained `413` status for aborted reads, including a caught read failure. The `UPSTREAM_RELAY_STATUS` constant supplies the `502` status.

F13 proves iterator return, generator cleanup, upstream abortion, and listener release while a frame remains unread. F14 explicitly checks the error class, the `HTTP` code, each refusal status, its message, and no entry into the upstream `stream` method. Its red failures came from the separator repaired by F16.

F15 used a source-text probe for published imports, parser naming, bearer hooks, and dispatcher composition. It did not execute the documentation fences. Their transcription and execution remain assigned to A3 by the brief. Disposable probes were removed after measurement.

F18 proves that the compiled contract refuses the decorative member and accepts the error frame containing only its channel and message. An `expectTypeOf` assertion also pins the error arm.

## Prose

The changed doc blocks address F17 and F19:

- In `src/core/types.ts`, the `RelayOptions.authorize` member states the body-consumption obligation and the origin/CSRF obligation. The `RelayOptions.limit` member states refusal at or above the limit. The `TextRead.complete` member states the observed-EOF rule.
- In `src/core/factories.ts`, the `createRelay` function documents the refusal statuses. Its example and the `createRelayProvider` example define their inputs and compose published imports, custom bearer headers, authorization, and a router dispatcher.
- In `src/core/providers/RelayProvider.ts`, the `RelayProvider` class documents browser-visible HTTP refusals and uses backticked code tokens with nouns. Its example supplies the parser and complete composition. The method error tags use TSDoc syntax.
- In `src/core/RelayStream.ts`, the `RelayStream` example imports its symbols and defines its inputs.
- In `src/core/helpers.ts`, the `readText` function loses the extra-read description and imports its symbol in the example.

## Scoped validation

The required commands passed:

| Command | Result |
| --- | --- |
| `npm.cmd run lint:check` | Exit 0 |
| `npm.cmd run check:src:core` | Exit 0 |
| `npm.cmd run check` | Exit 0 |
| `npm.cmd run test:src:core` | Exit 0; 23 files, 751 tests passed; no skipped tests |
| `npm.cmd run test:setup` | Exit 0; 1 file, 54 tests passed; no skipped tests |
| `git diff --check` | Exit 0 |

The `rg -n lookahead src/core/helpers.ts` and `rg -n createParser src/core` searches returned no matches. Diff review found no added prohibited assertions, suppressions, access modifiers, parameter properties, or nested function declarations. Changed files decode as UTF-8; the replacement-character literal in the existing decoder test is intentional and unchanged.

## Observations

The starting commit was `0fa4090`. Git emitted the documented harmless ignore-file permission warning.

The amended byte-count assertion in `AgentProvider.test.ts` returns to `MAX_ERROR_BODY_LENGTH`; its bounded-excerpt, cancellation, and lock assertions remain intact. F10 also replaces the helper's extra-read and zero-budget expectations, uses an actual overshoot chunk, changes exact-limit relay acceptance to refusal, and moves the BOM fixture's budget to 19 bytes so its accepted body stays below the limit.

The provider recorder additions track call construction separately from generator execution and record generator cleanup. No alternate relay implementation or dependency was added.

The blocked probe-tool standing condition was handled with executed tests and the type assertion. The guide gate, build, and whole test chain were not run, as directed. No install, commit, credential read, mutating lint/format command, or delegation occurred.

## Deviation

No ownership or ruled-behavior deviation. The successor brief resolved the earlier byte-count conflict. The explicit serializer check supplements the prescribed snapshot because the installed clone strips that trap instead of refusing it; this implements F11's required rejection.

## Status

Complete. F10–F19 are addressed, the required gates are green, and the changes are ready for the designated Orchestrator review and mutation probes. This report is written to `tmp/units/a2-fix-report-2.md`.

