<!-- U13f — implementer (Opus 5, native), ollama fix round after A13c. Retained from the completion notification, 2026-09-15 (1109 s, 104 tool uses). -->

All carriers closed, every scoped gate green, no orphaned browser left behind.

## The (a)/(b) ruling

**(b).** The installed `@orkestrel/browser` 0.0.16 surface accepts a per-call `timeout` number and **no signal**. Declarations read at `node_modules/@orkestrel/browser/dist/src/core/index.d.ts`:

| Line | Declaration | `timeout` means |
| --- | --- | --- |
| `:211` | `BrowserActionOptions` | one selector wait |
| `:1554` | `BrowserNavigationOptions` | "bounds the whole navigate call (the `Page.navigate` send itself plus the load-event wait)" |
| `:1574` | `BrowserNavigationWaitOptions` | one URL/predicate wait |
| `:1859` | `BrowserPageOptions` | "navigation timeout for the initial URL" only — **not** the CDP commands `create()` issues |
| `:2340` | `BrowserSendOptions` | "ms before this one request fails" |
| `:2968` | `CDPClientOptions` | client-wide default per pending request |
| `:3006` | `CDPSendOptions` | "ms before this one request fails" |

A `signal` member exists nowhere: `grep -n "AbortSignal\|abort"` over that declaration returns one hit, `:2149 abort(reason?: string)`, which is request-interception abort, not a deadline. So (a) is unavailable, and the fix races the whole attempt against one `AbortSignal.timeout(allowance)` and releases the session on expiry, with the per-call values left as inner shares.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupServer.ts` | `PAGE_BOUNDS` (`:627`) drops `commands` and `reads`; its remarks state the one allowance and why no sum bounds it. `PageSessionOptions.signal` (`:977`); `createPageSession` throws an already-aborted reason (`:1028`) and hands the signal to the readiness wait. New `expirePageAttempt` (`:1110`) and `boundPageAttempt` (`:1145`). `acceptPageAttempt` (`:1342`) refuses an absent result and a partial one before reading tool selection |
| `tests/setupServer.test.ts` | `acceptPageAttempt` proof (`:555`) carries completed results, adds the interrupted-run cases and the neither-reading case; new `expirePageAttempt` proof (`:704`); `PAGE_BOUNDS` proof (`:743`) asserts key membership and every containment instead of a sum |
| `tests/service/page.test.ts` | Header states the attempt bound and the interrupted-run rule; `SESSION` (`:74`) and `EXPIRED` (`:115`); every case runs through `boundPageAttempt` (`:131`, `:204`, `:382`, `:448`, `:477`); the fault wait takes the attempt's signal (`:390`); new attempt-bound control (`:520`) |
| `guides/ollama.md` | Contract 13's retry rule and attempt deadline (`:124`); the `setupServer.test.ts` bullet (`:359`); the `page.test.ts` bullet names the control (`:368`) |

Chain-cumulative diffstat (`git diff --stat HEAD`, unchanged rows are U13c/U13e's, untouched here):

```
 guides/ollama.md           |  13 +-
 tests/setup.ts             |  26 ++
 tests/setupServer.test.ts  | 624 ++++++++++++++++++++++++++++++-
 tests/setupServer.ts       | 892 +++++++++++++++++++++++++++++++++++++++++++--
 tests/setupService.test.ts |  96 +++++
 tests/setupService.ts      | 118 +++++-
 6 files changed, 1721 insertions(+), 48 deletions(-)
```

This unit's own deltas: `tests/setupServer.ts` +104 lines, `tests/setupServer.test.ts` +92, `tests/service/page.test.ts` 501 → 558, `guides/ollama.md` prose only. `tests/setup.ts` (26), `tests/setupService.ts` (118), and `tests/setupService.test.ts` (96) are byte-unchanged from the baseline — this unit did not open them.

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

`git diff --check` exits 0. `tmp/` holds only the Orchestrator's `codex` directory; the byte copy this unit took of `tests/setupServer.ts` was restored and removed.

## Carrier closures

**1 — a partial run never retries.** `acceptPageAttempt` (`setupServer.ts:1342`) now reads, in order: `fault`, absent outcome, serialized `failure`, absent result, `result.partial`, and only then tool selection. The interrupted case throws `the page run was interrupted before it settled: <content>`. The analyst's vector — `{turns:[0],tools:[],result:{content:"starting",partial:true}}` — escapes the retry, and a partial run that *did* dispatch the tool escapes on the same reading, because the interruption is what the attempt reports rather than the sample.

**2 — one attempt deadline governs the lifecycle.** `boundPageAttempt(allowance, options, observe)` arms `AbortSignal.timeout(allowance)`, races the acquisition and the observation against `expirePageAttempt`, releases through `session.destroy()` in a `finally`, and — when the deadline outran an acquisition still in flight — settles that acquisition and releases what it returned before rethrowing. The signal reaches `createPageSession`, which throws an already-aborted reason before taking anything and hands the signal to the readiness `waitForCondition`. `command`, `ready`, `read`, and `evaluate` are now shares spent inside the allowance; `commands` and `reads` are gone, so the table states no arithmetic the dependency does not run. All five existing live cases and the new control run through it.

**3 — the prose is true.** Contract 13 (`:124`) states the one deadline and that only a run that completed an answer without dispatching the tool spends another launch, with an interrupted run named as ending the retry. The `setupServer.test.ts` bullet (`:359`) states membership and containment rather than "every allowance" summed. The `page.test.ts` bullet (`:368`) names the control.

## Bounds set

In milliseconds, shares inside the allowance: `command` 10 000, `ready` 5 000, `read` 5 000, `evaluate` 35 000, with `run` 30 000 inside `evaluate`. `attempt` 95 000 is the one allowance; `attempt + command` = 105 000 ≤ `case` 110 000, leaving the release after an expiry in the remainder. `attempts` 3 × `attempt` = 285 000 ≤ `budget` 290 000 ≤ `retry` 300 000.

## Red-first, verbatim

Command for every hermetic run: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupServer.test.ts`.

Stage 1 — carriers 1 and 2 against the pre-fix tree, `Tests 2 failed | 32 passed (34)`, exit 1:

```
 FAIL  |setup| tests/setupServer.test.ts > acceptPageAttempt > retries only a sampling miss and escapes every failure another launch cannot clear
AssertionError: expected undefined to deeply equal Error: the page run was interrupted befor…
- Expected:
Error {
  "message": "the page run was interrupted before it settled: starting",
}
+ Received:
undefined
 ❯ tests/setupServer.test.ts:599:5

 FAIL  |setup| tests/setupServer.test.ts > PAGE_BOUNDS > declares one attempt allowance and the shares inside it, never a schedule of operations
AssertionError: expected [ 'command', 'commands', …(10) ] to deeply equal [ 'command', 'ready', 'read', …(7) ]
- Expected
+ Received
@@ -1,9 +1,11 @@
  [
    "command",
+   "commands",
    "ready",
    "read",
+   "reads",
    "run",
 ❯ tests/setupServer.test.ts:710:36
```

Stage 2 — the attempt deadline's own translation, added next, `Tests 3 failed | 32 passed (35)`, exit 1:

```
 × |setup| tests/setupServer.test.ts > expirePageAttempt > rejects with the attempt-wide deadline error and parks forever while the allowance holds 1ms
   → expirePageAttempt is not a function
TypeError: expirePageAttempt is not a function
    710|   const expired = expirePageAttempt(AbortSignal.timeout(20), 20)
```

After the fix, same command, exit 0, `Tests 35 passed (35)`:

```
 ✓ |setup| tests/setupServer.test.ts > acceptPageAttempt > retries only a sampling miss and escapes every failure another launch cannot clear 1ms
 ✓ |setup| tests/setupServer.test.ts > expirePageAttempt > rejects with the attempt-wide deadline error and parks forever while the allowance holds 31ms
 ✓ |setup| tests/setupServer.test.ts > PAGE_BOUNDS > declares one attempt allowance and the shares inside it, never a schedule of operations 2ms
```

The live control, recorded red twice by mutating the subject. Command: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts -t "ends an over-long attempt"`, each exit 1.

Mutation A — the acquisition and observation awaited instead of raced (`Tests 1 failed | 5 skipped (6)`, 621 ms):

```
AssertionError: expected [Function] to throw error including 'the page attempt exceeded its 50 ms a…' but got 'the page driver never parked its oper…'
Expected: "the page attempt exceeded its 50 ms allowance"
Received: "the page driver never parked its operations; page errors [], console []"
 ❯ tests/service/page.test.ts:530:5
```

That is exactly the reading the analyst named: without the race, an over-long attempt reports an inner acquisition failure, not the bound it broke.

Mutation B — the race restored, the release on expiry removed (`if (!signal.aborted) await session.destroy()`), `Tests 1 failed | 5 skipped (6)`, 5615 ms:

```
AssertionError: expected undefined to be an instance of Error
 ❯ tests/service/page.test.ts:554:20
    554|    expect(refused).toBeInstanceOf(Error)
```

The stranded browser answered `page.evaluate('1')` after the attempt had already rejected. `tests/setupServer.ts` was restored from a byte copy taken before each mutation and confirmed identical (`diff` clean) before the green run.

## Gate evidence, scoped to the owned files

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (66 files) |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root, `check:src`, `check:src:core` |
| `npm run test:setup` | 0 | 119 passed, 828 ms |
| `npm run test:guides` | 0 | 34 passed, 696 ms |
| `npx.cmd vitest run … --project policy` | 0 | 90 passed, 1 skipped (the pre-existing extractor-availability skip) |
| `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts` | 0 | 6 passed, 10.84 s |

Per-case timings from the final page run (observation; the authoritative whole-service run is the Orchestrator's):

```
 ✓ evaluates the published agent closure in a real page from an import map 609ms
 ✓ executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn 1542ms
 ✓ records a deliberate page request and a deliberate page fault outside the agent operation 582ms
 ✓ rejects a page relay credential before contacting Ollama 595ms
 ✓ drives the daemon directly from the page behind its origin gate 747ms
 ✓ ends an over-long attempt on its own allowance and leaves no browser behind 5726ms
```

The control's cost is its `EXPIRED.observe` allowance: 5 000 ms of deliberate parking, plus the 50 ms launch half and the acquisitions either side. Daemon `http://localhost:11434` reported `{"version":"0.32.15"}`; model `qwen3.5:2b-q4_K_M`; browser resolved by `requirePageBrowser`.

## Collision and residue readings

```
$ grep -rnE "export declare (function|const|class|interface|type) (expirePageAttempt|boundPageAttempt)\b" node_modules/@orkestrel/
  (no matches, exit 1)
$ grep -rn "boundPageAttempt\|expirePageAttempt" node_modules/@orkestrel/
  (no matches)
$ powershell Get-CimInstance Win32_Process Name='msedge.exe' where CommandLine like '*--headless*' | Measure-Object
  0
```

Banned-term sweep over this unit's added prose (patterns: the `writing.md` substitution rows plus `now`, `new`, `latest`, `once`, `since`, `master`, case-insensitive, over `git diff -U0` of `guides/ollama.md`, `tests/setupServer.ts`, `tests/setupServer.test.ts` and the whole of `tests/service/page.test.ts`): 49 hits on `new`, every one a constructor call (`new Error`, `new URL`, `new AbortController`, `new Promise`, `new Response`), which is data rather than prose. No other row matched.

## Shared-file patches

None. Every edit landed in an owned file.

## Deviation state

No deviation stopped the unit. Three ancillary decisions, recorded and carried:

- **`AbortSignal.timeout` rather than `createTimeout`.** `@orkestrel/timeout` is a declared development dependency and `createTimeout` (`node_modules/@orkestrel/timeout/dist/src/core/index.d.ts:36,108,129`) is a *controllable* deadline — `start`, `clear`, re-arm, parent signal. This attempt needs a one-shot deadline with no control surface, the brief's own ruling (a) names `AbortSignal.timeout(PAGE_BOUNDS.attempt)`, and importing `@orkestrel/timeout` into the test tree would have made contract 2's sentence at `guides/ollama.md:113` — which explains why the manifest declares it — incomplete, outside this round's carriers.
- **`boundPageAttempt` takes the allowance as its first parameter** rather than reading `PAGE_BOUNDS.attempt` internally, so the live control can drive a real attempt to expiry at a named point instead of asserting the bound only as arithmetic.
- **The control's part-B observation parks on a signal of its own**, not the attempt's. A wait on the attempt's signal resolves in the same abort dispatch that rejects the race and registers its listener first, so the observation would win and the bound would have nothing in flight to cut.

One count was deleted from prose this unit wrote: `tests/setupServer.ts:1129` said `browser.create()` awaits "nine" separately bounded CDP commands; the sentence now says "a run of" and the member names stay listed at `:614`. Counts that predate this unit in the owned files (`setupServer.ts:352,587,727,1009`, `page.test.ts:341,405,456`) each name their members in the same sentence and were left for the capability that owns them.
