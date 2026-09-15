**Touched files**

A1-fix is incomplete. F1–F4 have passing targeted tests; F5 exposed an additional cancellation failure.

- `src/core/AgentProvider.ts`: local cancellation takes precedence; non-OK bodies are bound to the signal.
- `src/core/validators.ts`: validates arrays through the installed `arrayOf` combinator.
- `src/core/Agent.ts`: changes only the empty-thinking gate.
- `src/core/types.ts`: removes `'LIMIT'`, documents error arms and the 413 limit response, and renames the relay option to `parser`.
- `tests/setup.ts`: adds signal and decoder recording, hostile inputs, and rejecting-cancellation fixtures.
- Mirrored tests: adds regression and adequacy cases, pins 2048 and the single-chunk overshoot, and reorganizes helper/provider blocks.

`git diff --stat` returned:

```text
 src/core/Agent.ts                    |   2 +-
 src/core/AgentProvider.ts            |   7 +-
 src/core/types.ts                    |  12 +-
 src/core/validators.ts               |   6 +-
 tests/setup.ts                       |  58 ++++++-
 tests/src/core/Agent.test.ts         |  22 +++
 tests/src/core/AgentProvider.test.ts | 286 ++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts       |  51 +++++--
 tests/src/core/validators.test.ts    |  23 ++-
 9 files changed, 440 insertions(+), 27 deletions(-)
```

**Red then green**

Measurements on Windows, 2026-09-14:

- **F1 and F2:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'normalizes a transport|replaces a caller|preserves a remote abort identity|cancels a stalled 503'`
  Before: exit 1, 3 failed, 1 passed. F1 contributed 2 failures; F2 timed out at 400 ms. After: exit 0, 4 passed. The remote-abort preservation control passed before and after; it was not artificially made red.
- **F3:** `npm.cmd run test:src:core -- tests/src/core/validators.test.ts -t 'hostile own every|throwing proxy'`
  Before: exit 1, 2 failed, 1 passed. After: exit 0, 3 passed.
- **F4:** `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'omits empty thinking from an abort partial'`
  Before the gate change: exit 1, 1 failed because the result contained `thinking: ''`. After: exit 0, 1 passed. An earlier fixture attempt failed by propagating the error; the corrected fixture aborts the caller before throwing and produced the relevant assertion failure.
- **F5, including F6d:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts tests/src/core/helpers.test.ts -t 'after a non-OK|after a decoder failure|abort listeners after|poison record|distinct interleaved|source cancellation rejects|single-chunk overshoot'`
  Before and after the production fixes: exit 1, 1 failed, 10 passed. No green result. An earlier fixture revision returned a resolved promise from every cancellation and produced an additional lock-release failure; restoring its existing synchronous cancellation behavior removed that fixture-induced failure.

**Scoped validation**

| Command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check:src:core` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 1 | 21 files; 694 passed, 1 failed |
| `npm.cmd run test:setup` | 0 | 1 file; 54 passed |

**Observations**

- Worker execution succeeded in this sandbox.
- The F2 test proves deadline rejection, source cancellation, lock release, and parser clearing. Its expired combined signal remains aborted; that observation alone does not independently prove `Timeout.clear()`.
- F6a is partial: `ProviderError` remarks and member documentation remain unwritten. F6b, F6d, and the test reorganization are present. F6c's subclass example remains unwritten. Final formatting and completion review were not performed.
- The subjective audit was read from `../scaffold/.orkestrel/campaign/a1-audit-subjective.md`; the brief's initial `tmp/units/a1-audit-subjective.md` path does not exist.
- The required MCP proof attempt was blocked with: `MCP tool call requires approval, but approval policy is never`. No proof receipt was returned. The behavioral evidence here comes from the recorded Vitest runs.
- No build, install, commit, mutating gate, or guide test was run.

**Deviation**

Expected: F5's distinct interleaved calls preserve independent results and cancel the aborted body's source.

Found: the exact per-call delta and result assertions pass, but the aborted source's cancellation assertion fails, including after yielding through `waitForDelay()`.

Evidence: `tests/src/core/AgentProvider.test.ts:720`, test `isolates distinct interleaved bodies while one splitter holds a cancelled prefix`:

```text
expect(left.cancelled).toBe(true)
AssertionError: expected false to be true
```

The left body contains `left` followed by `c:never` and stays open. Its decoded increment holds `alpha<thi` plus native thinking, tools, and usage. The other call completes independently.

Done: retained the failing test and ran the specified gates. Not done: an additional success-path cancellation repair or completion of F6.

I treated this failure as a scope deviation because F5 assigns adequacy tests and the brief says “Do not repair anything else.” The scaffold orchestration deviation protocol requires the writer to stop when reality diverges from the dispatch.

Hypothesis: aborting while the transform pipe holds an unread write leaves upstream cancellation unfinished.

**Status**

Stopped for scope reconciliation; not ready for acceptance.

`git status --porcelain` returned:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M src/core/Agent.ts
 M src/core/AgentProvider.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/setup.ts
 M tests/src/core/Agent.test.ts
 M tests/src/core/AgentProvider.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
```

