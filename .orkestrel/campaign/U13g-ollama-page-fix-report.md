<!-- U13g — implementer (Opus 5, native), ollama: the attempt deadline bounds completion (fix round after A13d). Retained from the completion notification, 2026-09-15 (1339 s, 112 tool uses). -->

All carriers closed, every scoped gate green, no browser left behind.

## Corrected declaration table — `@orkestrel/browser` 0.0.16, BOTH entries

A13d 4 is confirmed and U13f's (b) ruling is corrected. The connection observes a signal; page commands do not.

| Entry | Line | Declaration | What it accepts |
| --- | --- | --- | --- |
| **server** `dist/src/server/index.d.ts` | `:431` | `BrowserOptions.signal?: AbortSignal` | `:413` documents it as "external AbortSignal for cancelling the connection attempt". `dist/src/server/index.js:1083` combines it with the instance's own controller through `AbortSignal.any`, and `#establish` races it at discovery (`:1046`), at the port-free check (`:1052`), before the launch (`:1053`), and at both `client.connect()` sites (`:1235`, `:1295`) |
| **server** | `:429` | `BrowserOptions.timeout` | connection, discovery, and launch timeout |
| **server** | `:789` | `WebSocketCDPTransportOptions.timeout` | ms before the connection attempt fails |
| **server** | `:747` | `waitForCDPReady(port, timeout, host?, signal?)` | a readiness helper, not a page-command option |
| **core** `dist/src/core/index.d.ts` | `:211` | `BrowserActionOptions.timeout` | one selector wait |
| **core** | `:1554` | `BrowserNavigationOptions.timeout` | the whole navigate call |
| **core** | `:1574` | `BrowserNavigationWaitOptions.timeout` | one URL/predicate wait |
| **core** | `:1859` | `BrowserPageOptions.timeout` | the initial URL's navigation only |
| **core** | `:2340` | `BrowserSendOptions.timeout` | one request |
| **core** | `:2968` | `CDPClientOptions.timeout` | client-wide default per pending request |
| **core** | `:3006` | `CDPSendOptions.timeout` | one request |
| **core** | `:2149` | `abort(reason?: string)` | request-interception abort, not a deadline |

`grep -n "AbortSignal\|signal" dist/src/core/index.d.ts` returns no signal member on any page-command interface. So the connection is cancelled through the supported signal, and the page commands after it are raced.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupServer.ts` | `PAGE_BOUNDS` (`:638`) gains `release` and drops `attempt` to `85_000`; its remarks state `attempt + release`. New `PageAttemptBounds` (`:994`). `createPageSession` hands the attempt signal to `createBrowser` as `BrowserOptions.signal` (`:1073`) and its remarks name the three places the signal reaches. New `describeFailure` (`:1154`) and `releasePageAttempt` (`:1177`). `boundPageAttempt` (`:1231`) takes `(bounds, acquire, observe)`, releases once through the bounded release on both paths, and reads the signal after the observation and after the release |
| `tests/setupServer.test.ts` | New `describeFailure` (`:752`), `releasePageAttempt` (`:767`), and `boundPageAttempt` (`:817`) proofs — one case per interleaving; `PAGE_BOUNDS` proof (`:933`) asserts the new membership and `attempt + release ≤ case`, `attempts × (attempt + release) ≤ budget ≤ retry` |
| `tests/service/page.test.ts` | Header states the two shares and the signal's route; every case acquires through `(signal) => createPageSession({ ...options, signal })`; `EXPIRED` gains `late` and `hold`; the attempt-bound describe carries three controls (`:560`, `:623`, `:670`) each asserting elapsed completion against `allowance + release` |
| `guides/ollama.md` | Contract 13 (`:124`), the `setupServer.test.ts` bullet (`:359`), and the `page.test.ts` bullet (`:368`) |

`git diff --stat HEAD` (chain-cumulative; the `setup.ts`/`setupService*` rows are U13c/U13e's and untouched here):

```
 guides/ollama.md           |  13 +-
 tests/setup.ts             |  26 ++
 tests/setupServer.test.ts  | 821 ++++++++++++++++++++++++++++++++++++-
 tests/setupServer.ts       | 997 +++++++++++++++++++++++++++++++++++++++++++--
 tests/setupService.test.ts |  96 +++++
 tests/setupService.ts      | 118 +++++-
 6 files changed, 2023 insertions(+), 48 deletions(-)
```

`tests/service/page.test.ts` moved from 559 to 716 lines. The three files this unit did not open are byte-identical to the U13f snapshot: I extracted their patch sections from `git diff HEAD` and from `.orkestrel/campaign/U13f-diff.patch.txt` and compared them after line-ending normalization — `tests/setup.ts` IDENTICAL (1700 bytes), `tests/setupService.test.ts` IDENTICAL (5990), `tests/setupService.ts` IDENTICAL (6128).

`git status --porcelain`:

```
 M guides/ollama.md
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
?? tests/service/page.test.ts
```

`git diff --check` exits 0. `tmp/` holds the Orchestrator's `codex` directory and this unit's `tmp/u13g/` logs; the byte copy of `tests/setupServer.ts` taken before each mutation was restored (`diff` clean, "RESTORED-IDENTICAL") and removed.

## Carrier closures

**1 — the connection is cancelled through the supported signal.** `createPageSession` passes `options.signal` as `BrowserOptions.signal`. Its remarks name the three places the signal reaches — the connection at the dependency, the readiness wait, and the already-aborted throw before anything is taken — and say that every page command after the connection takes a per-call `timeout` and no signal, so those are raced. `expirePageAttempt`'s remarks, the `PAGE_BOUNDS` remarks, the page proof's header, and the guide each carry the corrected ruling. The reading is visible in the live control: the launch-expiry half fell from 600+ ms to ~100 ms, because the attempt now ends at `connect()` instead of after a full launch.

**2 — completion is bounded on every path.** `PAGE_BOUNDS` gains `release`. `releasePageAttempt(acquisition, share)` races the acquisition's settlement plus `session.destroy()` against `AbortSignal.timeout(share)` and throws `the page attempt's release outlasted its <share> ms share, stranding the browser` rather than waiting. `boundPageAttempt` calls it on both paths: in the catch, where a strand is composed onto the attempt's own failure through `describeFailure` and the attempt failure stays the `cause`; and on the success path, where a release failure is the attempt's failure. The signal is read after the observation (a race can be won in the same dispatch the deadline fires in) and after the release — an attempt whose release crossed the allowance throws `the page attempt released its browser after its <attempt> ms allowance had expired`. The pre-fix body also released twice on a failed observation (`finally` plus catch); this one releases once, which the satisfied-path proof pins.

**3 — the proofs bind elapsed completion.** Hermetic and live, one case per interleaving, each recorded red under the pre-fix mechanism or a named mutation (readings following).

**4 — the prose states the measured guarantee.** Contract 13 states `attempt + release`, the connection's signal, the raced page commands, and that a release outlasting its share is reported rather than awaited. `:359` names the release share and the four interleavings the hermetic proof asserts. `:368` names the live controls and their elapsed assertion.

## Bounds set

Milliseconds. `command` 10 000, `ready` 5 000, `read` 5 000, `run` 30 000, `evaluate` 35 000 are shares spent inside the allowance. `attempt` 85 000 races the acquisition and the observation; `release` 10 000 races the release after it. `attempt + release` = 95 000 ≤ `case` 110 000. `attempts` 3 × 95 000 = 285 000 ≤ `budget` 290 000 ≤ `retry` 300 000. `command` ≤ `release`, because the release's own CDP requests take `command`.

## Red-first, verbatim

Hermetic command for every run: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts`.

Stage 1 — the new pins against a tree with `PAGE_BOUNDS.release`, `describeFailure`, `releasePageAttempt`, and the bounded release all reverted. `Tests 5 failed | 34 passed (39)`, exit 1: `describeFailure is not a function`, `releasePageAttempt is not a function`, the `PAGE_BOUNDS` membership missing `release`, and `boundPageAttempt > ends every attempt…` timing out at 5000 ms.

Stage 3 — the helpers and the bound restored, only `boundPageAttempt`'s body reverted to U13f's (the defect A13d 2 named), with the interleavings split into one pin each. `Tests 4 failed | 38 passed (42)`, exit 1:

```
 FAIL  |setup| tests/setupServer.test.ts > boundPageAttempt > returns what a satisfied attempt observed and releases the session it acquired
AssertionError: expected 2 to be 1 // Object.is equality
 ❯ tests/setupServer.test.ts:848:24
    848|   expect(failed.count).toBe(1)

 FAIL  |setup| tests/setupServer.test.ts > boundPageAttempt > reports its allowance and the browser it stranded when the acquisition never settles
Error: Test timed out in 5000ms.
 ❯ tests/setupServer.test.ts:851:2

 FAIL  |setup| tests/setupServer.test.ts > boundPageAttempt > reports a release that parks past its share instead of waiting on it
Error: Test timed out in 5000ms.
 ❯ tests/setupServer.test.ts:893:2

 FAIL  |setup| tests/setupServer.test.ts > boundPageAttempt > refuses an attempt whose release crossed its allowance
AssertionError: expected 'undefined' to be 'the page attempt released its browser…' // Object.is equality
Expected: "the page attempt released its browser after its 30 ms allowance had expired"
Received: "undefined"
 ❯ tests/setupServer.test.ts:924:36
```

The two timeouts are the hang A13d 2 described, reached under a 5 s cap. `boundPageAttempt > releases the acquisition its deadline outran when it settles inside the release share` passed under the pre-fix body — that pin is a regression guard, not a defect pin, and I say so rather than claiming it red.

After restoring the subject (`diff` clean), same command, exit 0, `Tests 42 passed (42)`.

Live controls. Command: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts -t "<case>"`, each exit 1.

Mutation 1 — the catch drops the losing acquisition's release (`Tests 1 failed | 7 skipped (8)`, 3.09 s):

```
 FAIL  |service| tests/service/page.test.ts > Agent tool loop in a real page (live) — the attempt bound > releases the acquisition its deadline outran instead of waiting on it
AssertionError: expected undefined to be an instance of Error
 ❯ tests/service/page.test.ts:665:20
    665|    expect(refused).toBeInstanceOf(Error)
```

The delayed acquisition's real browser answered `page.evaluate('1')` after the attempt had rejected.

Mutation 2 — the post-release signal read removed (`Tests 1 failed | 7 skipped (8)`, 4.72 s):

```
 FAIL  |service| tests/service/page.test.ts > Agent tool loop in a real page (live) — the attempt bound > refuses an attempt whose release crossed its allowance
AssertionError: expected 'undefined' to be 'the page attempt released its browser…' // Object.is equality
Expected: "the page attempt released its browser after its 2000 ms allowance had expired"
Received: "undefined"
 ❯ tests/service/page.test.ts:696:34
```

`tests/setupServer.ts` was restored from the byte copy before each green run and confirmed identical.

## Gate evidence, scoped to the owned files

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (66 files) |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root, `check:src`, `check:src:core` |
| `npm run test:setup` | 0 | 126 passed (126) |
| `npm run test:guides` | 0 | 34 passed (34) |
| `npx.cmd vitest run … --project policy` | 0 | 90 passed, 1 skipped (the pre-existing extractor-availability skip) |
| `npx.cmd vitest run … --project service tests/service/page.test.ts` | 0 | 8 passed, 17.71 s |

Per-case timings from the final page run (an observation; the authoritative whole-service run is the Orchestrator's):

```
 ✓ evaluates the published agent closure in a real page from an import map 622ms
 ✓ executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn 1556ms
 ✓ records a deliberate page request and a deliberate page fault outside the agent operation 588ms
 ✓ rejects a page relay credential before contacting Ollama 583ms
 ✓ drives the daemon directly from the page behind its origin gate 740ms
 ✓ ends an over-long attempt on its own allowance and leaves no browser behind 5223ms
 ✓ releases the acquisition its deadline outran instead of waiting on it 3616ms
 ✓ refuses an attempt whose release crossed its allowance 3653ms
```

The elapsed-time readings each control asserted, against its own `allowance + release` ceiling: the launch half ~100 ms against 10 050 ms (50 + 10 000), the observation half ~5 050 ms against 15 000 ms (5 000 + 10 000), the delayed acquisition ~3 610 ms against 12 000 ms (2 000 + 10 000), the crossed release ~3 650 ms against 12 000 ms. The three attempt-bound cases cost 12.5 s of the suite's 17.7 s, all of it deliberate parking. Hermetic elapsed ceilings: the parked acquisition and the parked release each assert under 1 000 ms against nominals of 150 ms and 2 050 ms respectively; both hung without the fix.

## Collision and residue readings

```
$ grep -rnE "export declare (function|const|class|interface|type|abstract class) (describeFailure|releasePageAttempt|boundPageAttempt|expirePageAttempt|acceptPageAttempt|PageAttemptBounds|PageSessionInterface|PageSessionOptions)\b" node_modules/@orkestrel/
  (no matches, exit 1)
$ grep -rl "describeFailure\|releasePageAttempt\|PageAttemptBounds" node_modules/@orkestrel/
  (no matches, exit 1)
$ Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -like '*--headless*' } | Select-Object ProcessId,CommandLine
  headless-edge: 0
```

The residue reading was taken before the live runs (0), after mutation 1's deliberate strand (0 — the worker's exit reaped it), and after the final green run (0).

Banned-term sweep over this unit's added prose (the `writing.md` substitution rows plus `now`, `new`, `latest`, `once`, `since`, `master`, `above`, `below`, `here`, case-insensitive, over `git diff -U0 HEAD` of `guides/ollama.md`, `tests/setupServer.ts`, `tests/setupServer.test.ts` and the whole of `tests/service/page.test.ts`): `now` 12 hits, every one `performance.now()`; `new` 62 hits, every one a constructor call; `here` 14 hits, every one the adverb inside a TSDoc `@remarks` naming this call site, never link text. Two `above` hits landed in prose this unit rewrote and were corrected: `the closure case above` became `the closure case earlier in this file`, and `the call above it` became `the call that contains it`. One `below` hit (`page.test.ts:350`, "every index below") predates this unit in a comment it did not open and is left for the capability that owns it. No other row matched.

## Shared-file patches

None. Every edit landed in an owned file.

## Deviation state

No deviation stopped the unit. Four ancillary decisions, recorded and carried:

- **`boundPageAttempt` takes an acquisition function, not session options.** The hermetic proof has no browser, so the interleavings A13d named — an acquisition that never settles, a release that parks — are unreachable through a helper that calls `createPageSession` itself. The brief's carrier 3 names that seam ("an acquire function that never resolves"). Each live case now reads `(signal) => createPageSession({ ...SESSION, signal })`, which also puts the signal's route to the acquisition at every call site rather than one level down.
- **The session is constrained as `Pick<PageSessionInterface, 'destroy'>`, not as the whole interface.** The bounding mechanism needs a release and nothing else, and constructing a whole `PageSessionInterface` in the hermetic proof would need a `RecordingServerInterface` and a `BrowserPageInterface` — reachable only through an assertion the non-negotiables ban. The constraint names the real interface as its source rather than restating a structural shape.
- **`describeFailure` is a new export rather than an inline coercion.** `boundPageAttempt` composes two `unknown` failures into one message, and `String(failure)` on an `Error` yields `Error: <message>`, which reads badly inside a composed sentence. It reuses `isError` from `@orkestrel/contract` and is proved in its own case, so it is not a hidden module helper.
- **`attempt` fell from 95 000 to 85 000.** `attempts × (attempt + release) ≤ budget` is the ruling's own inequality, and 3 × (95 000 + 10 000) exceeds the 290 000 budget. Lowering the allowance keeps `case`, `budget`, and `retry` where the chain set them, and the whole attempt still ends within 95 000 ms.

I ran `npx prettier --write` on `tests/service/page.test.ts` once by mistake — this workspace formats with `oxfmt`, and prettier rewrote the file to double quotes and semicolons. `npx oxfmt --config .oxfmtrc.json --write` restored the house style in the same turn, and `npm run format:check` exits 0. I mention it because the file is untracked, so no git baseline exists to compare against; the U13f snapshot at `.orkestrel/campaign/U13f-page.test.ts.txt` is available if you want the comparison independently.
