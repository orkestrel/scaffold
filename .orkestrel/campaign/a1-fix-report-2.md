**Touched files**

Stopped on F8's explicit observation limit before editing production or mirrored tests. The first run's work and `tmp/units/a1-fix-report.md` remain untouched.

This run wrote `tmp/units/a1-fix-report-2.md`. The executed reachability instrument is retained as `tmp/probe/a1-fix-f8.test.ts.txt`; its temporary collected test was deleted after measurement.

`git diff --stat` reports the inherited first-run changes, unchanged by this run:

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

First-run records below are carried from `tmp/units/a1-fix-report.md`, not newly measured:

- **F1/F2:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'normalizes a transport|replaces a caller|preserves a remote abort identity|cancels a stalled 503'`. Before: exit 1, 3 failed, 1 passed. After: exit 0, 4 passed. The remote-abort control passed throughout.
- **F3:** `npm.cmd run test:src:core -- tests/src/core/validators.test.ts -t 'hostile own every|throwing proxy'`. Before: exit 1, 2 failed, 1 passed. After: exit 0, 3 passed.
- **F4:** `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'omits empty thinking from an abort partial'`. Before the gate change, using the corrected fixture: exit 1, 1 failed. After: exit 0, 1 passed.
- **F5/F6d:** `npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts tests/src/core/helpers.test.ts -t 'after a non-OK|after a decoder failure|abort listeners after|poison record|distinct interleaved|source cancellation rejects|single-chunk overshoot'`. Before and after the first run's production fixes: exit 1, 1 failed, 10 passed. No green result.

Second-run measurements on Windows, 2026-09-14:

- **F7:** `npm.cmd run test:src:core` reproduced the interleaved-body failure at `tests/src/core/AgentProvider.test.ts:720`: `expect(left.cancelled).toBe(true)` received `false`. Exit 1, 1 failed, 694 passed. No repair or reader tests were added after the F8 stop condition was established; no green result.
- **F8:** `npm.cmd run test:probe -- tmp/probe/a1-fix-f8.test.ts`. Negative control expecting a transport request after hook rejection or cancellation: exit 1, 3 failed, 1 passed. Observational version expecting no request on those exits: exit 0, 4 passed. Hook success recorded a request in each run. This proves transport reachability, not listener cleanup or a completed F8 repair.

**Scoped validation**

Measured on the unchanged implementation after establishing the deviation:

| Command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check:src:core` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | No diagnostics |
| `npm.cmd run test:src:core` | 1 | 21 files; 694 passed, 1 failed |
| `npm.cmd run test:setup` | 0 | 1 file; 54 passed |

**Observations**

- Worker execution succeeded.
- The required MCP `prove` call returned: `MCP tool call requires approval, but approval policy is never`. No receipt or closing `no receipt` line was returned. The local Vitest instrument supplies the executed reachability evidence.
- The probe drives the real `AgentProvider` through `ScriptedWire` and `RecordedTransport`, without patching globals. Its successful-hook control proves the recorder sees an invoked transport. It does not measure the inaccessible combined signal's listeners or timer.
- F6a's remaining error documentation, F6c's subclass example, F7, and F8 remain unfinished.
- No build, install, commit, mutating gate, guide test, or delegation was run.

**Deviation**

Expected: replace `RecordedSignals` with transport observation while preserving the required hook-exit listener and deadline assertions.

Found: the transport never receives the combined signal when the headers hook rejects, the caller cancels during that hook, or the deadline expires during that hook.

Exact evidence: `src/core/AgentProvider.ts:224` awaits `this.#requestHeaders(signal)`; the transport invocation follows at `:226`. The current tests at `tests/src/core/AgentProvider.test.ts:608`, `:626`, and `:650` require observations on those pre-transport exits. Each executed probe recorded `transport.requests === []`; the successful-hook control recorded a request. The negative control failed with:

```text
expected [] to have a length of 1 but got +0
```

The successor brief's F8 instruction applies directly: “If some case cannot be observed that way, stop and report it rather than restoring the patch.”

Done: verified the observation limit with a failing control and passing reachability probe, preserved the existing tree, and ran the scoped gates.

Not done: removal of `RecordedSignals`, F7's implementation and reader tests, or the remaining F6 documentation. No assertions were weakened and no global patch was added or restored.

Hypothesis: the successor's observation plan assumes every hook exit reaches the transport. Reconciling F8 requires an authorized way to observe the combined signal before transport, or a revised proof obligation.

**Status**

Stopped for F8 scope reconciliation; not ready for acceptance. The required fully green core suite was not achieved.

`git status --porcelain`:

```text
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

