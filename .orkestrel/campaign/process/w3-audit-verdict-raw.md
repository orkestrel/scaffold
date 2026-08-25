1. `BROKEN` — `tests/src/server/ProcessManager.test.ts:213` asserts only the recorder count. A failed native spawn still reaches `Process.ts:379-416`, emits `exit`, preserves the `protocol` refusal, and leaves the registry empty. Assert that the recorded terminal pair represents a spawned child: a non-negative `code` or a non-null `signal`, rejecting negative spawn-fault codes and `{ code: null, signal: null }`.

2. `BROKEN` — `tests/src/server/ProcessManager.test.ts:203` waits on the refused recorder before `registered.count` is asserted at line 212. A broken `on` hook and an absent refused child therefore fail at the same condition. Move the registered-child assertion immediately after `covered.destroy()` at line 198.

3. `BROKEN` — The fork, marker, and scratch plumbing left the case, but the parent’s Windows branch at lines 186–198 proved the published PID stopped running. The replacement at lines 203–213 proves only that a terminal event fired; `Process` can emit that event for a spawn fault or an unconfirmed cutoff. Add the terminal-pair assertion described for claim 1.

4. `CONFIRMED` — `guides/process.md:1229-1242` places spawn proofs in `src:server` and sizes their budgets from a contended run. The passage contains no banned substitution term or growable-set count. Its numbers are dated measurements. Its backticked names are real projects, a script, and a path, not nonexistent exports.

5. `CONFIRMED` — The cases at lines 154–215 and 263–321 use the same getter race, exit recorder, destroy barrier, registered-child control, and barrier snapshot. The sibling marker is only read for optional cleanup and is never asserted. A merged case can retain the refusal, empty-registry, eventual-exit, and barrier-order assertions without loss. `ADOPT`

6. `CONFIRMED` — The sibling case supplies a `10_000` ms condition budget at line 309 but no case timeout. The `src:server` configuration at `vite.config.ts:87-94` supplies none, and installed Vitest resolves the Node default to `5_000` ms. The outer timeout therefore fires before the condition budget can expire. `ADOPT`

AUDIT: FAIL