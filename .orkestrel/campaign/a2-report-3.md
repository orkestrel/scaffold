**Touched files**

A2 implementation is complete under the third brief. The earlier reports remain untouched.

- Added `src/core/providers/RelayProvider.ts` and `src/core/RelayStream.ts`, with mirrored tests. The relay validates requests and frames through the compiled contracts, preserves authoritative results, propagates cancellation, and masks unexpected upstream failures.
- Added the relay factories, status constants, fixed error message, barrel exports, NDJSON test framing, iterator recorders, and in-process integration proofs.
- Added `TextRead`, widened only `readText`, updated the non-OK provider path to consume `.text`, and adapted the existing reader assertions.
- Wrote this report to `tmp/units/a2-report-3.md`. Retained the core discovery result and relay control logs under `tmp/units/`; removed the temporary control and discovery scripts.

The following is the verbatim `git diff --stat` output. It excludes the untracked implementation and test files listed in Status.

```text
 src/core/AgentProvider.ts            |   4 +-
 src/core/constants.ts                |  12 ++++
 src/core/factories.ts                |  60 ++++++++++++++++-
 src/core/helpers.ts                  |  25 +++++--
 src/core/index.ts                    |   2 +
 src/core/types.ts                    |   6 ++
 tests/setup.ts                       | 123 +++++++++++++++++++++++++++++++++++
 tests/src/core/AgentProvider.test.ts |   2 +-
 tests/src/core/factories.test.ts     |  67 ++++++++++++++++++-
 tests/src/core/helpers.test.ts       |  57 +++++++++++++---
 tests/src/core/integration.test.ts   |  83 ++++++++++++++++++++++-
 11 files changed, 416 insertions(+), 25 deletions(-)
```

**Red then green**

On Windows on 2026-09-14, F9 ran against the original string return and then the widened implementation with this exact command:

```text
npm.cmd run test:src:core -- tests/src/core/helpers.test.ts -t 'exactly the byte limit|limit plus one|BOM-prefixed completion'
```

Before: exit 1, 3 failed. After: exit 0, 3 passed. The cases prove EOF at the exact budget, a discarded overshoot chunk, and identical decoded JSON with different byte-completion outcomes.

The relay proofs used controlled mutations after initial implementation. Each command collected its named test, exited 1 with 1 failed under the mutation, and exited 0 with 1 passed after restoration:

| Exact command | Mutation and observed failure |
| --- | --- |
| `npm.cmd run test:src:core -- tests/src/core/factories.test.ts -t "fails closed when authorization throws"` | Rethrew the authorization error; the handler rejected with `secret` instead of returning 401. |
| `npm.cmd run test:src:core -- tests/src/core/factories.test.ts -t "rejects default limit plus one"` | Used decoded text length instead of completion; the 1,048,577-byte request returned 200 instead of 413. |
| `npm.cmd run test:src:core -- tests/src/core/factories.test.ts -t "accepts valid JSON at exactly the default limit"` | Reduced the default budget by one byte; valid 1,048,576-byte JSON returned 413 instead of 200. |
| `npm.cmd run test:src:core -- tests/src/core/RelayStream.test.ts -t "emits a fixed error message"` | Serialized the thrown message; the response exposed `sk-secret`. |
| `npm.cmd run test:src:core -- tests/src/core/providers/RelayProvider.test.ts -t "reconstructs an abort frame"` | Replaced the remote partial with empty content; the partial equality assertion failed. |

The relay control outputs reside in `tmp/units/a2-{authorization,limit,exact-limit,message,abort}-{red,green}-3.txt`. Every mutation was restored.

**Scoped validation**

The required gates produced these results on Windows on 2026-09-14:

| Exact command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check:src:core` | 0 | Core typecheck passed |
| `npm.cmd run check` | 0 | Root and core typechecks passed |
| `npm.cmd run test:src:core -- --reporter=json --outputFile=tmp/units/a2-core-results-3.json` | 0 | 731 passed across 23 files |
| `npm.cmd run test:setup` | 0 | 54 passed |
| `git diff --check` | 0 | No whitespace errors |

Discovery matched the JSON report against every `tests/src/core/**/*.test.ts` file: no missing, unexpected, or unpassed entries. Its negative control required the excluded `tests/setup.test.ts` file and exited 1; the ordinary comparison exited 0. The relay test files were collected. Existing helper and provider assertions passed in the complete core run.

**Observations**

- The in-process hop drives real Request and Response objects through the handler and provider. It preserves identified messages, tools, options, ordered deltas, thinking, tool calls, and usage; `generate` equals the drained stream. Literal thinking tags remain content. Non-JSON arguments fail before fetch, and caller context is omitted.
- The pull recorder measured a maximum of 1 active `next()` call. With pending consumer reads satisfied, the response retained one queued frame and stopped pulling. Cancellation aborted upstream before iterator return, suppressed a late pull, and released the inbound listener. No additional pull-reentrancy guard was needed.
- Local cancellation reaches the request and upstream signals. Remote abort reconstruction preserves the partial while the browser signal remains unaborted. RelayProvider TSDoc states the resulting Agent-run error behavior.
- F9's lookahead also affects error-body delivery: the existing 512-byte-chunk fixture delivers 2560 bytes while the error excerpt remains bounded to 2048 bytes. Its assertion was updated for the authorized one-chunk lookahead. Abort during lookahead, zero-byte limits, decoder tails, cancellation failures, and lock/listener cleanup pass.
- `rg -n 'readText\(' src/core/AgentProvider.ts` reports line 264: `: (await readText(response.body, MAX_ERROR_BODY_LENGTH, signal)).text`.
- `npm.cmd run test:guides` exited 1 with 3 failed and 27 passed. Failures concern undocumented exports, missing method tables, and the existing `isMessage` summary drift. These remain assigned to A3; no guide or parity test was changed.
- Vitest workers spawned successfully. Touched source and test files decode as UTF-8. No build, install, commit, mutating gate, whole test chain, or delegation ran. Browser and built-artifact proofs were not measured in this unit.
- Git emitted a permission warning for `C:\Users\mikes/.config/git/ignore` and CRLF-to-LF notices for `tests/setup.ts` and `tests/src/core/helpers.test.ts`; the Git commands exited 0.
- The MCP `prove` call returned `MCP tool call requires approval, but approval policy is never`. It supplied no receipt or closing `no receipt` line. The behavioral evidence reported here comes from the executed Vitest cases and controls.

**Deviation**

None requiring a stop. F9's widening and its reader-assertion adjustments stayed inside the authorized scope. The relay defect proofs used the explicitly recorded controlled mutations rather than a pre-implementation failing run. No ruled behavior or unowned file required a change.

**Status**

Complete and ready for the Orchestrator's independent audit and acceptance.

The following is the verbatim `git status --porcelain` stdout. The untracked provider directories contain `RelayProvider.ts` and `RelayProvider.test.ts`, respectively.

```text
 M src/core/AgentProvider.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/types.ts
 M tests/setup.ts
 M tests/src/core/AgentProvider.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
?? src/core/RelayStream.ts
?? src/core/providers/
?? tests/src/core/RelayStream.test.ts
?? tests/src/core/providers/
```
