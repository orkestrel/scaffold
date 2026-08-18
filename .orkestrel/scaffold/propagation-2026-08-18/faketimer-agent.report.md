# Unit report: `agent` — replace fake timers with real short timers

Done. `tests/src/core/Agent.test.ts` and `tests/setup.ts` are the only files changed. `src/` is
untouched (`git status --porcelain src/` is empty).

## Touched files

| File                                     | Change                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `/workspace/agent/tests/src/core/Agent.test.ts` | 4 fake-timer sites rewritten to real 25 ms deadlines; 3 `getTimerCount` sites replaced with observable assertions; 4 vestigial `afterEach` timer-restore blocks and the `vi` / `afterEach` imports removed |
| `/workspace/agent/tests/setup.ts`               | `ScriptedCall` gains `readonly signal: AbortSignal` — the bound each recorded provider call was handed  |

Diffstat: `tests/setup.ts | 20 ++++++--`, `tests/src/core/Agent.test.ts | 112 ++++++++++---------`,
2 files changed, 66 insertions(+), 66 deletions(-).

## Re-measured site counts

`grep -rho ... tests/` over the whole `tests/` tree:

| Token                  | Brief's table (`agent`) | Measured | Note                                                                           |
| ---------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------ |
| `useFakeTimers`        | 4                       | 5        | 4 in the owned file; the 5th is the `tests/config.test.ts` fixture string      |
| `advanceTimersByTime`  | 2                       | 2        | both are `advanceTimersByTimeAsync`                                            |
| `getTimerCount`        | 3                       | 3        | agrees                                                                         |
| `useRealTimers`        | not listed              | 4        | four `afterEach` restore blocks, one of them (the emitter describe) vestigial  |

Scoped to `tests/src/`, the counts are exactly the table's 4 / 2 / 3. No disagreement.

## Configurable period

Yes. `AgentOptions.timeout` (milliseconds) is the per-turn deadline, and `AgentRunOptions.timeout`
overrides it per run. Every timeout test now arms `const DEADLINE = 25`, a module constant in the
test file. The one exception is the early-break test, which uses `5_000` for the reason given in the
next section.

## Each `getTimerCount` site

All three were leak guards after stop. The property under test is that the pump's `finally` calls
`timeout?.clear()`, so the per-run `Timeout` never stays armed.

| Site | What it proved | Replacement |
| ---- | -------------- | ----------- |
| `clears the per-turn timeout on a successful generate` | a natural completion clears the deadline | Arm a 25 ms deadline, `generate()`, then `waitForDelay(75)`. Assert the run signal the provider recorded is still unaborted. An uncleared deadline expires during that wait and aborts exactly that signal. |
| `leaks no host timer when result is awaited without draining events` | the `clear()` lives in the pump's `finally`, not the never-pulled events `finally` | Same shape: 25 ms deadline, `await stream.result` with `events` untouched, `waitForDelay(75)`, assert the recorded run signal is unaborted. |
| `breaking out of events early ... leaks no timer` | an early `break` still clears the deadline | Read `process.getActiveResourcesInfo()` filtered to `'Timeout'` before and after, and require no net gain. |

The first two use the agent's own public behaviour: an armed deadline, on expiry, aborts the
composed run signal, and that signal is what `provider.stream(messages, signal, …)` receives. Adding
`signal` to `ScriptedCall` is what makes it readable from a test, and it is reusable — any test
asserting which bound tripped can now read it.

The third case cannot use that observable. The early break calls `abort.abort()` in the events
generator's `finally` **by design**, so the run signal is already aborted when the test looks, and a
later deadline expiry changes nothing on it. The remaining observable is the host's own live
resource list, which is precisely the leak the test names (a pending `Timeout` on the event loop).
`process.getActiveResourcesInfo()` is a public Node API reading the real host, not a framework
scheduler internal, so the rule `.claude/rules/tests.md` states — never assert framework scheduler
internals, never replace the host clock — is satisfied rather than worked around. Its deadline is
`5_000` rather than `25` so a leaked timer is guaranteed still pending at the second reading; the
test itself finishes in about a millisecond.

## The `advanceTimersByTime` site

`a deadline firing DURING tool execution commits partial` now runs on real timers: a 25 ms deadline
against a tool handler that awaits `waitForDelay(150)`. The two clock advances are gone; the test
awaits the drain. It costs about 150 ms.

## Assertion strength: fail-first evidence

Every replacement was proved to redden for the defect it names.

**The three leak sites.** With `timeout?.clear()` temporarily removed from `src/core/Agent.ts:271`
and then restored:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Agent.test.ts
```

- before restoring the line: `Tests  3 failed | 113 passed (116)` — and the 3 are exactly the three
  rewritten leak tests, nothing else;
- after restoring: `Tests  116 passed (116)`.

`git status --porcelain src/` is empty and `src/core/Agent.ts:271` still reads `timeout?.clear()`.

**The deadline-during-tool-execution site.** Raising only the test's own `timeout` to `DEADLINE * 100`
(no source change) reddens it — `Tests  1 failed | 115 skipped (116)`, `AssertionError: expected
false to be true` on `result.partial` — so the assertion still binds to the deadline actually firing
rather than to the clock being driven. Reverted immediately.

No assertion is weaker than the one it replaced.

## Test counts and runtime

Exact command:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Agent.test.ts
```

| | Tests | Vitest `tests` phase | Wall clock |
| --- | --- | --- | --- |
| Before | 116 passed (116) | 256 ms | 1.70 s |
| After | 116 passed (116) | 558 ms | 3.31 s |

Count is unchanged at 116. Five consecutive runs after the change were all green at 116, with the
`tests` phase between 552 ms and 585 ms and wall clock between 2.38 s and 5.16 s — no flake, and
well inside the 10 second budget.

## Exit status of each acceptance command

| # | Command | Exit |
| - | ------- | ---- |
| 1 | `grep -rn "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/src/` | 1 (no match) |
| 2 | `npm run lint:check` | 0 |
| 3 | file test run, 116 tests, equal to the pre-change 116 | 0 |
| 4 | file wall clock 3.31 s, under 10 s | — |
| 5 | `npm run check` | 0 |
| 6 | `npx prettier --check tests/src/core/Agent.test.ts tests/setup.ts` | **1 — see the deviation below** |

Additional read-only validation, all scoped or non-mutating:

| Command | Exit | Result |
| ------- | ---- | ------ |
| `npm run format:check` (oxfmt, the repository's formatter) | 0 | 155 files correct |
| `npx oxfmt --config .oxfmtrc.json --check` on the two owned files | 0 | correct |
| `npm run test:src` (whole `src:core` project — `tests/setup.ts` is shared) | 0 | 563 passed (563) |
| `npm run test:policy` | 0 | 85 passed (85) |
| `npm run test:config` | 0 | 28 passed (28) |

## Deviation: acceptance criterion 6 is unreachable and always was

**Expected.** `npx prettier --check` on the owned file passes.

**Found.** It fails, and it fails identically on the untouched committed baseline.

**Evidence.** With `tests/setup.ts` and `tests/src/core/Agent.test.ts` stashed back to `HEAD`:

```
$ git stash push -q tests/setup.ts && npx prettier --check tests/setup.ts
Checking formatting...
[warn] tests/setup.ts
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
baseline in-repo exit=1
```

Same result for `tests/src/core/Agent.test.ts` at `HEAD`. The same bytes copied outside the
repository pass, so the difference is config resolution inside the tree: this repository ships no
Prettier configuration at all, only `.prettierignore`, and Prettier falls back to `.editorconfig`
(`indent_style = tab`, `indent_size = 4`) plus its own default `printWidth` of 80. The repository's
actual formatter is oxfmt, wired as `format` and `format:check` in `package.json`, and the AGENTS.md
gate chain names `npm run format:check`, not Prettier.

**Done or not done.** Done, against the repository's real formatter. `npm run format:check` exits 0
tree-wide, and the scoped `oxfmt --check` on both owned files exits 0. I did not chase Prettier's
output, because converging on it would reformat the file away from the formatter the gate enforces
and turn `format:check` red.

**Hypothesis.** The criterion was written from the `console` repository, which may carry a Prettier
configuration this one does not.

## Unknowns the brief named

- **Configurable period:** yes, `AgentOptions.timeout`. Answered earlier.
- **A fake-timer use outside both categories** (a date, a deadline, an expiry): none. All four sites
  were the per-turn `timeout` deadline. Three were category 2 leak guards, one was category 1 clock
  advancement.

## Incidental cleanup inside scope

The `Agent — emitter (push observation surface)` describe carried an `afterEach(() =>
vi.useRealTimers())` with no fake-timer use anywhere in it. Removed along with the other three,
which were genuine restores that real timers make unnecessary. `afterEach` and `vi` are no longer
imported by the file.
