# Unit report — console: real short timers replace fake timers

Repository: `/workspace/console`. Owned file: `/workspace/console/tests/src/core/Spinner.test.ts`.
Only that file changed. `tests/setup*.ts` was not touched.

## Re-measured site counts

`grep -rho "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/`,
split per file:

| File                            | `useFakeTimers` | `advanceTimersByTime` | `getTimerCount` | `useRealTimers` |
| ------------------------------- | --------------- | --------------------- | --------------- | --------------- |
| `tests/src/core/Spinner.test.ts` | 15              | 3                     | 18              | 6               |
| `tests/config.test.ts`           | 1               | 0                     | 0               | 0               |

The brief's table matches exactly for the owned file. Two additions to it: the file also carried 6
`useRealTimers` calls, which the table does not list, and 1 of the 18 `getTimerCount` occurrences is
the header comment on old line 20, so there were 17 `getTimerCount` assertion sites. The single
`tests/config.test.ts` occurrence is the vendored lint-rule fixture the brief names; it is untouched.

## Configurable period

`SpinnerOptions.interval` exists (`src/core/types.ts:1013`), defaulting to
`DEFAULT_SPINNER_INTERVAL = 80` (`src/core/constants.ts:469`). Every timer-arming test now passes
`interval: PERIOD` with `PERIOD = 10` (canon band 10–50 ms). Two further file constants carry the
waits: `SETTLE = PERIOD * 4` is the leak-guard window, and `FRAME_DEADLINE = 2000` bounds the
wait-for-frames helper. No source seam was needed and `src/` is unchanged.

Waits use `waitForDelay` from `@orkestrel/test`. One local module helper was added beside the
existing `frames` helper:

```ts
async function waitForFrames(sink: RecordingSinkInterface, count: number): Promise<void> {
	const deadline = performance.now() + FRAME_DEADLINE
	while (sink.calls.length < count && performance.now() < deadline) await waitForDelay(PERIOD)
}
```

It stays local rather than moving to `tests/setup.ts` because it is coupled to this file's
recording-sink frame shape, which is where `frames` already sits.

## Every `getTimerCount` site and its replacement

| Old line | Test                                                | Was proving                | Observable replacement                                                                     |
| -------- | --------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| 125      | `update` re-renders when active                     | Leak guard after stop      | `await waitForDelay(SETTLE)`, then `frames(sink)` still `['x a', 'y b']`                    |
| 153      | inactive until start, active between                | Leak guard after stop      | Sink call count unchanged across `SETTLE`                                                  |
| 175      | first frame on start, then one per interval         | Leak guard after stop      | Sink call count unchanged across `SETTLE`                                                  |
| 188      | `stop()` clears the timer                           | Leak guard                 | Sink call count unchanged across `SETTLE`, after `waitForFrames(sink, 2)` proved it firing |
| 198      | `start()` idempotent — `toBe(1)`                    | The entity is running      | `spinner.active === true`, plus the guard on line 201 below                                |
| 201      | `start()` idempotent — after stop                   | Leak guard                 | One `stop()` silences the sink across `SETTLE`; a second armed interval would keep painting |
| 225      | `success()` stops the timer                         | Leak guard                 | Count unchanged and last call still `['\r✔ done\n', undefined]` across `SETTLE`            |
| 241      | `failure()` stops the timer                         | Leak guard                 | Count unchanged and last call still `['\r✖ broke\n', 'error']` across `SETTLE`             |
| 259      | `success()` on a never-started spinner              | No timer was ever armed    | `frames(sink)` still `['✔ ok']` across `SETTLE`                                            |
| 340      | emits start / stop around the lifecycle             | Leak guard                 | `events.frame.count` unchanged across `SETTLE`                                             |
| 355      | success emits stop exactly once                     | Leak guard                 | Recorded frame lines still `['a', '✔ ok']` across `SETTLE`                                 |
| 399      | `tick()` after `stop()` — after stop                | Leak guard                 | Count unchanged across `SETTLE`                                                            |
| 403      | `tick()` after `stop()` — after the manual tick     | The tick never arms a timer | Count stays `stopped + 1` across `SETTLE`                                                  |
| 429      | a second `success()` after stop                     | Leak guard                 | Count stays `afterFirst + 1` across `SETTLE`                                               |
| 440      | `failure()` after `success()`                       | Leak guard                 | Count unchanged across `SETTLE`                                                            |
| 456      | `destroy()` stops the timer                         | Leak guard                 | Sink count unchanged across `SETTLE` (emitter destroyed, so the sink is the observable)    |
| 466      | `destroy()` is idempotent                           | Leak guard                 | Sink count unchanged across `SETTLE`                                                       |

The `advanceTimersByTime` sites (old lines 170, 171, 186) became real waits: the two 80 ms advances
became `waitForFrames(sink, 3)` on a 10 ms period, and the `50 * 5` advance became
`waitForDelay(SETTLE)`.

## Instrument proof

The leak guard is only as good as its window, so the window was measured before being trusted. A
throwaway runtime probe at `tmp/probe/leakguard.test.ts` ran a `Spinner` at `interval: 10` and read
the sink across a 40 ms `SETTLE` window, paired with a stopped-spinner control:

```text
npx vitest run --config vite.config.ts --no-cache --project probe
✓ |probe| tmp/probe/leakguard.test.ts (2 tests) 92ms
```

A still-armed interval added at least 2 sink writes inside the window; the stopped control added 0.
Every `SETTLE` guard therefore reddens for the leak it names. The probe was deleted.

## Test counts and runtime

Exact command, unchanged before and after:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=default --project src:core tests/src/core/Spinner.test.ts
```

| State  | Tests       | File runtime |
| ------ | ----------- | ------------ |
| Before | 37 passed   | 31 ms        |
| After  | 37 passed   | 723 ms       |

No test was deleted, skipped, or converted to `.todo`. Three consecutive runs gave 37 passed at
723 ms, 731 ms, and 723 ms, so the real-clock waits are not flaking. Runtime is far under the 10 s
budget.

## Weakened assertions

None. One assertion changed shape rather than strength: `paints the first frame immediately on
start, then one per interval` previously pinned exactly `['a m', 'b m', 'c m']` after two fixed
80 ms advances. The real clock decides how many frames land in a window, so it now pins the property
that must hold at every length — at least 3 frames, and every frame is the next glyph in the declared
cycle:

```ts
const painted = frames(sink)
expect(painted.length).toBeGreaterThanOrEqual(3)
const cycle = ['a m', 'b m', 'c m']
expect(painted).toEqual(painted.map((_line, index) => cycle[index % cycle.length]))
```

Against the defects the old test bound — a timer that does not repeat, or a tick that does not
advance the cycle — this is equally binding.

Two assertions became stronger. `stop() clears the timer` and `start() is idempotent` now call
`waitForFrames` before stopping, so the interval is proven to be firing before the test proves it
stops. The old fake-timer versions stopped a timer that had never fired.

## Acceptance commands and exit status

| # | Command                                                                                                   | Exit | Note                                       |
| - | --------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------ |
| 1 | `grep -rn "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/src/`      | 1    | No matches                                 |
| 2 | `npm run lint:check`                                                                                       | 0    | 15 `policy(no-mocking)` errors before, 0 now |
| 3 | The Vitest command above                                                                                   | 0    | 37 tests, equal to the pre-change count    |
| 4 | Same command, runtime                                                                                      | —    | 723 ms, under the 10 s budget              |
| 5 | `npm run check`                                                                                            | 0    |                                            |
| 6 | `npx prettier --check tests/src/core/Spinner.test.ts`                                                      | 1    | Deviation, see below                       |

Two extra read-only gates were run on the owned scope: `npx oxfmt --config .oxfmtrc.json --check
tests/src/core/Spinner.test.ts` exits 0, and `npm run test:policy` passes 85 tests, so the new module
helper satisfies the placement law.

## Deviation — acceptance criterion 6 is unreachable in this repository

**Expected.** `npx prettier --check` on the owned file exits 0.

**Found.** It exits 1, and it exits 1 on the committed original too, so the criterion did not close
before this change either.

**Evidence.** Checking the version at `HEAD`:

```text
$ git show HEAD:tests/src/core/Spinner.test.ts | npx prettier --check --parser typescript
ORIG_PRETTIER_EXIT=1
```

The diff prettier wants is whole-file style, not anything this unit wrote: it converts tabs to
spaces, single quotes to double quotes, and adds semicolons. This repository formats with `oxfmt`
(`format` and `format:check` both invoke `oxfmt --config .oxfmtrc.json`), and the owned file passes
that formatter.

**Done or not done.** Done. Criteria 1 through 5 all close. Criterion 6 names a formatter the
repository does not use, and no edit to the owned file can satisfy both it and `npm run format:check`.

**Hypothesis.** The criterion was written from a fleet template where `prettier` is the formatter;
`console` formats with `oxfmt`.
