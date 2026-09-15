**Touched files**

A1-fix implementation is complete under the third brief. The earlier reports remain untouched.

- `src/core/AgentProvider.ts`: passes the combined signal to headers hooks and readers, removes the transform pipes, checks cancellation before `finish` and after the error-body read, and documents a concrete subclass.
- `src/core/helpers.ts`: adds optional reader signals, cancels pending reads with the abort reason, removes listeners on exit, and preserves cancellation-failure handling and the decoded-byte bound.
- `src/core/types.ts` and `src/core/errors.ts`: documents the hook argument and completes the provider error documentation.
- `tests/setup.ts`: replaces `RecordedSignals` with a hook recorder, records transport signals directly, and records pending reads and cancellation reasons.
- Mirrored provider and helper tests prove cancellation, listener cleanup, signal identity, and refusal to fold buffered records after cancellation. The landed F1–F4 and F6b/F6d/F6e work remains present.

The cumulative `git diff --stat`, including the first run's work, returned:

```text
 src/core/Agent.ts                    |   2 +-
 src/core/AgentProvider.ts            |  54 +++++--
 src/core/errors.ts                   |  12 +-
 src/core/helpers.ts                  |  49 +++++-
 src/core/types.ts                    |  20 ++-
 src/core/validators.ts               |   6 +-
 tests/setup.ts                       |  91 ++++++++++-
 tests/src/core/Agent.test.ts         |  22 +++
 tests/src/core/AgentProvider.test.ts | 289 ++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts       | 138 ++++++++++++++---
 tests/src/core/validators.test.ts    |  23 ++-
 11 files changed, 654 insertions(+), 52 deletions(-)
```

**Red then green**

The following historical readings come from `tmp/units/a1-fix-report.md`; they were not remeasured as red in this run:

- **F1/F2:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'normalizes a transport|replaces a caller|preserves a remote abort identity|cancels a stalled 503'`. Before: exit 1, 3 failed, 1 passed. After: exit 0, 4 passed. The remote-abort control passed throughout; the stalled 503 exceeded its 400 ms budget before repair.
- **F3:** `npm.cmd run test:src:core -- tests/src/core/validators.test.ts -t 'hostile own every|throwing proxy'`. Before: exit 1, 2 failed, 1 passed. After: exit 0, 3 passed.
- **F4:** `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'omits empty thinking from an abort partial'`. With the corrected caller-abort fixture, before: exit 1, 1 failed. After: exit 0, 1 passed.
- **F5/F6d:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts tests/src/core/helpers.test.ts -t 'after a non-OK|after a decoder failure|abort listeners after|poison record|distinct interleaved|source cancellation rejects|single-chunk overshoot'`. First run: exit 1, 1 failed, 10 passed before and after its fixes. Third run: exit 0, 12 passed. The selector also collects the added decoder-tail cancellation test.

The following readings were measured on Windows on 2026-09-14:

- **F7/F8:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts tests/src/core/helpers.test.ts -t 'distinct interleaved|cancels a pending|already-aborted|abort listeners after'`. Before implementation: exit 1, 9 failed, 1 passed. F7 failed on interleaved source cancellation, pending text/chunk cancellation, and already-aborted text/chunk reads. F8 failed because the hook received no signal. After: exit 0, 10 passed. The initial red run also exposed an unhandled rejection during failed-test cleanup; the fixture cleanup was corrected before the isolated F8 control.
- **F7, before `finish`:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'refuses buffered finish records'`. Removing the post-loop cancellation check produced exit 1, 1 failed: the abort partial contained `unfolded` instead of empty content. Restoring the check produced exit 0, 1 passed.
- **F8, isolated control:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'abort listeners after'`. Restoring the old hook invocation without its signal produced exit 1, 4 failed, with no unhandled error. Restoring the signal argument produced exit 0, 4 passed.

F6a and F6c documentation is complete. F6b's `parser` option, F6d's 2048 pin and overshoot test, and F6e's subject-based organization remain present.

**Scoped validation**

The required gates returned these results:

| Command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check:src:core` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core -- --reporter=json --outputFile=tmp/units/a1-fix-3-core.json` | 0 | 21 files; 701 passed; no skipped or todo tests |
| `npm.cmd run test:setup` | 0 | 1 file; 54 passed |

**Observations**

- Worker execution succeeded. `python tmp/units/verify-a1-fix-3.py` matched the JSON report's collected files against `rg --files tests/src/core -g '*.test.ts'`: no missing, unexpected, failed, or unpassed entries. Its `--control` run deliberately required the excluded `tests/setup.test.ts` file and exited 1; the ordinary run exited 0.
- The scoped text searches found no `pipeThrough` in `src/core/AgentProvider.ts`, no `RecordedSignals` or `AbortSignal.any =` assignment under `tests`, no `node:` in `tests/setup.ts`, no `'LIMIT'` under `src` or `tests`, and no `frame:` in `src/core/types.ts`. The `joinThinking` search returned its single subject block. `git diff --check` exited 0, and changed files decoded as UTF-8.
- Constructing a recorded `Request` with the combined signal added a platform-owned abort listener. The fixture records the original signal separately and constructs the request snapshot without that signal. Existing deadline assertions read the original signal; the successful-hook test proves hook/transport identity and listener absence on that object.
- Hook success and rejection prove deadline clearing by remaining unaborted beyond the deadline. Caller-cancel and deadline-expiry vectors already have an aborted combined signal, so that signal cannot independently prove the timer was cleared. Their tests prove listener removal; the stalled-503 test also proves bounded rejection, source cancellation, lock release, and parser clearing.
- The required MCP `prove` call returned `MCP tool call requires approval, but approval policy is never`. It returned no receipt or closing `no receipt` line. The behavioral evidence is the executed Vitest tests and controls.
- PowerShell refused the control `.ps1` file because script execution is disabled. The controls ran through direct edits and the recorded npm commands; each production edit was restored.
- No build, install, commit, mutating gate, guide test, whole test chain, or delegation ran. Guide work remains assigned to A3 by the brief.

**Deviation**

None requiring a stop under the third brief. No repair required an unowned source file or changed a ruled behavior. The observation limits are recorded above; every implementation item continued to completion.

**Status**

Complete and ready for the Orchestrator's independent audit and acceptance. This report is written to `tmp/units/a1-fix-report-3.md`.

`git status --porcelain` returned the following changes, with a permission warning for the user-level Git ignore file:

```text
 M src/core/Agent.ts
 M src/core/AgentProvider.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/setup.ts
 M tests/src/core/Agent.test.ts
 M tests/src/core/AgentProvider.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
```
