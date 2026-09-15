<!-- U13h — implementer (Opus 5, native), ollama: the A13e findings. Retained from the completion notification, 2026-09-15 (957 s, 115 tool uses). The unit's instruments sit in ollama/tmp/u13h/ (timer probe, byte copy, the rebuilt U13g baseline, unit.patch, gate logs) — swept at acceptance. -->

All carriers closed, every scoped gate green, no browser left behind.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupServer.ts` | The cancellation ruling narrowed at `PAGE_BOUNDS` remarks, `createPageSession` remarks (count sentence deleted, unbounded steps named), `expirePageAttempt` remarks, and `boundPageAttempt` remarks; the timer ruling recorded in `boundPageAttempt`; `PAGE_BOUNDS.attempts` renamed `launches`; new exported `PAGE_INTERVALS` (`:684`) carrying the matrix moved out of the page proof |
| `tests/setupServer.test.ts` | New `SCHEDULE_SLACK` (`:270`) with the property it proves; the parked-acquisition and parked-release cases assert `nominal ≤ elapsed < nominal + SCHEDULE_SLACK`; cause assertions on the composed failure and the crossed release; `PAGE_BOUNDS` proof takes `launches`; new `PAGE_INTERVALS` proof; the `PAGE_TOOL` block removed |
| `tests/setup.test.ts` | The `describe('PAGE_TOOL')` block lands beside its sibling module's other subjects; `isRecord` and `PAGE_TOOL` imported; header names the moved subject |
| `tests/service/page.test.ts` | Header states the narrowed ruling; `EXPIRED` replaced by the imported `PAGE_INTERVALS`; `PAGE_BOUNDS.launches` |
| `guides/ollama.md` | Contract 13 (`:124`) reduced to the guarantee plus the exact cancellation ruling; `:358` names `PAGE_TOOL`; `:359` drops it and states the intervals, the slack, and the causes |

This unit's own diff, against the U13g baseline rebuilt from `U13g-diff.patch.txt` and `U13g-page.test.ts.txt`:

```
 tests/setupServer.ts       +76  -29
 tests/setupServer.test.ts  +74  -25
 tests/setup.test.ts        +21   -6
 guides/ollama.md            +3   -1
 tests/service/page.test.ts +37  -42
```

`git diff --stat HEAD` (chain-cumulative) and `git status --porcelain`:

```
 guides/ollama.md           |   15 +-        M guides/ollama.md
 tests/setup.test.ts        |   28 +-        M tests/setup.test.ts
 tests/setup.ts             |   26 ++        M tests/setup.ts
 tests/setupServer.test.ts  |  871 +++-      M tests/setupServer.test.ts
 tests/setupServer.ts       | 1045 +++--     M tests/setupServer.ts
 tests/setupService.test.ts |   96 ++        M tests/setupService.test.ts
 tests/setupService.ts      |  118 ++-       M tests/setupService.ts
 7 files changed, 2144 insertions(+), 55 deletions(-)   ?? tests/service/page.test.ts
```

`git diff --check` exits 0. The three files this unit did not open are byte-identical to U13g: their `git diff HEAD` sections compare IDENTICAL against the retained `U13g-diff.patch.txt` after line-ending normalization (`tests/setup.ts`, `tests/setupService.ts`, `tests/setupService.test.ts`).

## Carrier closures

**1 — the cancellation ruling is exact.** Read at the dependency before writing: `#establish` races the signal at discovery (`node_modules/@orkestrel/browser/dist/src/server/index.js:1046`), at the port-free check (`:1052`), before the launch (`:1053`), and at each `client.connect()` (`:1235`, `:1295`), and `#syncContexts` then sends `Target.getTargets` with no `#raceAbort` (`:1398`), reached from the connect path (`:1242`) and the launch path (`:1305`). Every site now says exactly that: the signal races discovery, the port-free check, the launch, and `client.connect()`; the target listing that connection ends with takes the client's per-request `timeout`, and it plus every page command after it are bounded by the attempt race. No site claims the signal ends the whole connection.

**2 — the ceilings state their slack.** `SCHEDULE_SLACK = 500` names the worker's scheduling allowance and says the property proved is timer-bounded completion, not the nominal sum. The parked-acquisition case asserts `150 ≤ elapsed < 650` (its allowance then its release share), the parked-release case `50 ≤ elapsed < 550` (only the release share elapses; the 2 000 ms allowance is never spent). The live controls keep their `allowance + release` ceilings untouched.

**3 — the count sentence is gone.** "It reaches three places." deleted; the sentences naming `createBrowser`, the readiness wait, and the entry carry it.

**4 — `PAGE_TOOL` is attributed to its module.** Struck from the `tests/setupServer.test.ts` bullet, named in the `tests/setup.test.ts` bullet, and the `describe('PAGE_TOOL')` block moved to `tests/setup.test.ts` beside the other `tests/setup.ts` subjects.

**5 — the completeness claim is honest.** `createPageSession`'s remarks now open with the CDP steps that spend a share and then name the fixture start and the port reservation as taking no share and observing no signal, with `boundPageAttempt`'s race as their only bound.

**6 — contract 13 states the invariant once.** `:124` keeps the guarantee and the exact cancellation ruling and points at `tests/service/page.test.ts` and `PAGE_BOUNDS`; the mechanism stays in the TSDoc and the `:368` bullet.

**7 — the cause chain is asserted.** The composed failure is an `Error` whose `cause` is the attempt's own expiry error; the crossed release's `cause` is the deadline's `TimeoutError`.

**8 — the timer ruling is recorded.** `boundPageAttempt`'s remarks state that `AbortSignal.timeout` arms an unref'd timer, so nothing is cleared, citing the measurement on Node 24. The unit's own probe reproduced P15 twice over: a probe with no other pending work exited before a 5 ms signal ever fired (`Warning: Detected unsettled top-level await`), and with a keepalive the reason reads `{"isError":true,"name":"TimeoutError","ctor":"DOMException"}` on `v24.20.0`.

**9 — the carry-forwards.** `PAGE_BOUNDS.launches` replaces `attempts` at every reader (the remarks, the membership proof, the containment proof, and `retryUntil`'s `attempts:` argument in the live proof). `EXPIRED` became the exported `PAGE_INTERVALS` beside `PAGE_BOUNDS`, named for the spans it holds rather than for expiry, and proved for the containments its readings depend on: `launch < late < observe`, `late < hold`, `hold < PAGE_BOUNDS.release`, and each allowance plus the release share inside `PAGE_BOUNDS.case`.

## Red-first, verbatim

Command for every hermetic run: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts`. A byte copy of `tests/setupServer.ts` was taken before each mutation and restored after (`diff` clean, `RESTORED-IDENTICAL`, md5 `a20d04a782fb0d006a099689d26e24df` both sides).

**Carrier 2.** Mutation: `releasePageAttempt`'s race loses its wait — `waitForAbort(AbortSignal.timeout(share)).then(() => false)` becomes `Promise.resolve(false)`, so the helper reports a strand without ever spending the share. `Tests 6 failed | 36 passed (42)`. The two failures the new lower bounds own:

```
 FAIL  boundPageAttempt > reports its allowance and the browser it stranded when the acquisition never settles
AssertionError: expected 55.54480000000001 to be greater than or equal to 150
 ❯ tests/setupServer.test.ts:882:19

 FAIL  boundPageAttempt > reports a release that parks past its share instead of waiting on it
AssertionError: expected 0.1675999999999931 to be greater than or equal to 50
```

The same mutation reddened four cases collaterally — `releasePageAttempt`'s own proof, the satisfied path, and the two message assertions that read a release outcome.

**Carrier 7.** Mutation: `{ cause: failure }` dropped from the composed throw and `{ cause: signal.reason }` from the crossed-release throw. `Tests 2 failed | 40 passed (42)`, and nothing else moved:

```
 FAIL  boundPageAttempt > reports its allowance and the browser it stranded when the acquisition never settles
AssertionError: expected undefined to be an instance of Error
 ❯ tests/setupServer.test.ts:877:27

 FAIL  boundPageAttempt > refuses an attempt whose release crossed its allowance
Error: the attempt reported no abort reason
 ❯ tests/setupServer.test.ts:951:31
```

After restoring the subject, the same command exits 0 with `Tests 42 passed (42)`.

## Gate evidence, scoped to the owned files

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (66 files) |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root, `check:src`, `check:src:core` |
| `npm run test:setup` | 0 | 127 passed (127), 3 files |
| `npm run test:guides` | 0 | 34 passed (34) |
| `npm run test:policy` | 0 | 90 passed, 1 skipped — this is what clears `PAGE_INTERVALS` against the fleet name rule |
| `npx.cmd vitest run … --project service tests/service/page.test.ts` | 0 | 8 passed, 17.79 s |

Per-case timings from the final live run (an observation; the authoritative whole-service run is the Orchestrator's):

```
 ✓ evaluates the published agent closure in a real page from an import map 606ms
 ✓ executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn 1567ms
 ✓ records a deliberate page request and a deliberate page fault outside the agent operation 575ms
 ✓ rejects a page relay credential before contacting Ollama 591ms
 ✓ drives the daemon directly from the page behind its origin gate 738ms
 ✓ ends an over-long attempt on its own allowance and leaves no browser behind 5208ms
 ✓ releases the acquisition its deadline outran instead of waiting on it 3693ms
 ✓ refuses an attempt whose release crossed its allowance 3689ms
```

Hermetic elapsed readings under the new interval assertions: the parked acquisition 170 ms against `150 ≤ elapsed < 650`, the parked release 63 ms against `50 ≤ elapsed < 550`. The analyst's independent readings for the first (164.0, 172.2, 170.5 ms) sit in the same band.

## Residue readings

`Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -like '*--headless*' }` reported `headless-edge: 0` before the live runs and after each of them, the final one included.

## Shared-file patches

None.

## Deviation state

No deviation stopped the unit. Three ancillary decisions, recorded and carried:

- **The moved matrix is named `PAGE_INTERVALS`.** `launch`, `observe`, and `late` are allowances and `hold` is a delay; all four are spans of time the controls spend.
- **`tests/setup.test.ts`'s header changed beyond the moved block.** Its old text handed the wire tables wholesale to `tests/setupServer.test.ts`, which the move makes false for `PAGE_TOOL`.
- **`SCHEDULE_SLACK` is 500 ms.** Sized from the measured overhead (13–22 ms on this host, 14–22 ms on the analyst's) with a wide margin for a contended worker, and far below the 5 000 ms case timeout the unbounded-await defect ends at.

One observation outside this unit's carriers: the `PAGE_BOUNDS` case name "declares the two shares one attempt spends and the shares inside them…" states a count. It predates this unit.
