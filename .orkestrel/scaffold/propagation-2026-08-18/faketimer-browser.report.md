# Unit report: replace fake timers with real short timers — `browser`

Repository: `/workspace/browser`. Owned files: `tests/src/core/BrowserPage.test.ts`,
`tests/src/core/CDPClient.test.ts`. No other file was written. No `src/**` change was needed.

## Re-measured site counts

Measured with `grep -oh` per file over `tests/`, before the change. Both files match the dispatch
correction exactly; no disagreement.

| File                                | `useFakeTimers` | `advanceTimersByTime` | `getTimerCount` | `useRealTimers` |
| ----------------------------------- | --------------- | --------------------- | --------------- | --------------- |
| `tests/src/core/BrowserPage.test.ts` | 7               | 7                     | 1               | 8               |
| `tests/src/core/CDPClient.test.ts`   | 4               | 4                     | 0               | 5               |

`tests/config.test.ts:523` holds `code: 'vi.useFakeTimers()'` as lint-rule fixture text. Vendored,
untouched.

## Configurable period

`CDPClientOptions.timeout` and the per-call `CDPClientInterface.send(method, params, sessionId,
timeout)` override both exist, confirmed at `src/core/CDPClient.ts:51` and `src/core/CDPClient.ts:87`
through `src/core/CDPClient.ts:119`. `BrowserPage.navigate` and `BrowserPage.reload` take
`options.timeout` and pass it to both the load wait and the CDP send. Every rewrite therefore
configured a real short timeout of 20 ms and waited real time. No source seam was missing.

One period is not configurable: `BROWSER_STOP_LOADING_TIMEOUT_MS = 1_000`
(`src/core/constants.ts:182`) caps the best-effort `Page.stopLoading` through
`Math.min(timeout, BROWSER_STOP_LOADING_TIMEOUT_MS)`. The test that proves that cap now waits the
real 1 s. Reducing it needs a `src/**` change, which is out of scope.

## `getTimerCount` site

One site, `BrowserPage.test.ts` — `leaves no dangling timer and no unhandled rejection when
Page.navigate fails`.

- **What it proved.** After `navigate()` fails on `errorText`, the 20 ms load-wait timer armed by
  `#waitForLoadEvent` is cancelled rather than left armed.
- **Observable replacement.** The test now runs a second navigation on the same page and proves the
  stale timer cannot reach it. `#waitForLoadEvent` (`src/core/BrowserPage.ts:935`) overwrites
  `#loadReject` and `#loadTimer` without clearing a previous timer, so a timer left armed by the
  failed navigate rejects the *next* load wait with `Navigation timeout after 20ms`. The test issues
  `page.reload({ timeout: 1_000 })`, waits 60 ms real time, asserts by `performance.now()` that more
  than 20 ms has elapsed since the failed navigate began (so the stale timer's firing moment is
  inside the reload's wait window and the assertion is not vacuous), then emits
  `Page.loadEventFired` and asserts the reload resolves. The unhandled-rejection recorder is kept
  and asserted after a further real wait.
- **Strength.** Stronger than `getTimerCount() === 0`: it proves the consequence the cancelled timer
  exists to prevent, not the scheduler's count.

## Instrument control

The replacement's sensitivity was proved with a throwaway runtime probe in `tmp/probe/`, run through
the `probe` project and deleted. The probe was the same test with `Page.loadEventFired` withheld. It
reddened on exactly the reload assertion:

```text
AssertionError: promise rejected "BrowserError: Navigation timeout after 10… { …(2) }" instead of resolving
Caused by: BrowserError: Navigation timeout after 1000ms
 ❯ Timeout.<anonymous> src/core/BrowserPage.ts:948:21
```

That confirms the reload genuinely blocks on a live load wait, so a stale 20 ms timer would surface
at the same assertion as `Navigation timeout after 20ms`.

## Per-site repairs

`CDPClient.test.ts`, all category 1:

1. `rejects immediately without leaking a pending timer when params are not serializable` — client
   built with `timeout: 20`, `waitForDelay(50)` past the window, then the rejection reason is
   asserted. Added `expect(transport.sent).toHaveLength(0)`, proving serialization failed before the
   frame reached the transport.
2. `times out a pending request` — real 20 ms client timeout, no wait helper needed.
3. `rejects a timed-out request with a coded CDPTimeoutError carrying method/timeout` — same.
4. `uses a per-call timeout that overrides the client-wide default` — real per-call 20 ms against a
   10 s client default, plus a `performance.now()` elapsed bound under 1 s. The elapsed bound
   replaces what the virtual 25 ms advance used to prove.

`BrowserPage.test.ts`, all category 1:

5. `rejects with a timeout error when the load event never fires` — real 20 ms load-wait timeout.
6. `bounds the Page.navigate send itself with the per-call timeout, not the client default` — real
   20 ms per-call send timeout against a 10 s client default, plus a `performance.now()` elapsed
   bound under 1 s.
7. `sends a best-effort Page.stopLoading after a load-wait timeout, and a subsequent evaluate() still
   works` — real 20 ms.
8. `sends a best-effort Page.stopLoading when the Page.navigate send itself times out` — real 20 ms.
9. `bounds the best-effort Page.stopLoading to a short cap instead of the full per-call timeout` —
   real 1 s cap, with the elapsed interval asserted at or above `BROWSER_STOP_LOADING_TIMEOUT_MS - 50`
   and below `BROWSER_STOP_LOADING_TIMEOUT_MS * 3`. Test budget raised to 10 s.
10. `leaves no dangling timer and no unhandled rejection when Page.navigate fails` — see the
    `getTimerCount` section.
11. `throws BrowserSelectorError when the selector never appears` — the fake timers were dead
    ceremony. The retry loop compiled by `compileFunctionWaitExpression`
    (`src/core/helpers.ts:722`) runs in the page, and the fixture replies `false` synchronously, so
    no host timer was ever armed. The advance of 150 ms virtual time drove nothing. Removed.

Both files' trailing `afterEach(() => vi.useRealTimers())` blocks were removed, and `vi` and
`afterEach` dropped from the imports they no longer need.

## Assertion strength

No assertion is weaker than before. One is unchanged rather than strengthened, and is called out
here because its guard was already thin: site 1 above settles on the serialization failure before
any timer can fire, in the old virtual-clock form and the new real-clock form alike, so neither form
can observe a leaked pending entry through the promise. The added `transport.sent` length assertion
is new coverage on that path.

Site 11 lost its virtual advance, which proved nothing, as recorded earlier.

## Counts, runtime, exit status

Command: `npx vitest run --project src:core tests/src/core/BrowserPage.test.ts
tests/src/core/CDPClient.test.ts`

| Measure                 | Before | After |
| ----------------------- | ------ | ----- |
| `BrowserPage.test.ts`   | 76     | 76    |
| `CDPClient.test.ts`     | 32     | 32    |
| Total                   | 108    | 108   |

Runtime over three consecutive runs: 3.12 s, 2.32 s, 2.43 s wall; test time 1.48 s, 1.47 s, 1.47 s.
Under the 10 s criterion with margin, and stable across runs.

Acceptance commands, each run in `/workspace/browser`:

| # | Command                                                                                  | Exit |
| - | ---------------------------------------------------------------------------------------- | ---- |
| 1 | `grep -rn "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/src/` | 1 (no matches) |
| 2 | `npm run lint:check`                                                                     | 0    |
| 3 | `npx vitest run --project src:core <owned files>` — 108 passed                            | 0    |
| 4 | Runtime under 10 s — 2.32 s to 3.12 s                                                     | met  |
| 5 | `npm run check`                                                                          | 0    |
| 6 | `npx oxfmt --config .oxfmtrc.json --check <owned files>`                                  | 0    |

Before the change, `npm run lint:check` failed with exactly 11 `policy(no-mocking)` errors and
nothing else, matching the dispatch. Criterion 6 used `oxfmt` per the dispatch correction; the
prettier criterion was ignored.

Informational, outside the owned scope: `npx vitest run --project src:core` passes whole —
21 files, 339 tests.

## Sibling change preserved

The four matchers inside `describe('navigate()')` changed by the sibling unit to
`expression.includes('location.href')` are intact at lines 99, 115, 152, and 172. The six exact
`expression === 'location.href'` matchers in the `content()` describes are untouched. The reload
test added by this unit uses a fifth `.includes('location.href')` matcher at line 301, because
`#completeNavigation` reads the URL through the same guarded evaluate.

## Diffstat

```text
 tests/src/core/BrowserPage.test.ts | 219 +++++++++++++++++--------------------
 tests/src/core/CDPClient.test.ts   | 107 +++++++-----------
 2 files changed, 140 insertions(+), 186 deletions(-)
```

## Deviation state

None. No `src/**` seam was needed, no test count dropped, and no fake-timer use fell outside the
two categories. The one judgment call within the dispatch's discretion: site 9 waits a real 1 s
because the cap it proves is a source constant, so the file's 10 s budget absorbs it rather than the
period being reduced.
