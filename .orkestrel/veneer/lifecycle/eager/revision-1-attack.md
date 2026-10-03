Lane: objective. I checked correctness under adverse orderings against `Pool.ts` and the browse code, what the contracts allow, dependency and range facts, whether each proof can fail, and the letter of the rules. Subjective and policy questions are referred at the end.

## Findings

1. **REQUIRED: the V5 "one refill attempt" rule issues `size` attempts, so two U8 cases fail against the design as written.**
   - Where: § Behavior 4, refill step 2 ("issues `k` owner acquires"), and § Behavior 5 (`#strikes = Math.min(#strikes, BROWSER_SERVER_RESTARTS)`).
   - Input: size 2, with the spare's bound already spent (strikes at 2). The lease is then killed.
     - `Math.min` sets strikes to 1, which is not exhausted.
     - `k = 2 − pool.active (0) − 0 = 2`, so two acquires launch at once.
   - The U8 V5 case expects "exactly one launch follows … the spare is refilled after the lease grant". It sees two concurrent launches.
   - The U8 finding-6 case expects "a lease kill records one more" failed launch. With failing launches it sees two.
   - When launches fail, a leased loss gets `size` attempts, not the one attempt V5 grants.
   - Right: while `#strikes > 0`, cap the acquires a step issues at `BROWSER_SERVER_RESTARTS + 1 − #strikes`. Start keeps issuing `size` acquires (D8). Then restate each U8 count from that rule.

2. **REQUIRED: the design contradicts itself on whether a caller's hand-out starts a refill (D7, `eager/design-brief.md:20`).**
   - § Behavior 2 says "With no spare, `#grant()` starts or joins `#replenish()`".
   - § Behavior 4's heading says "a caller's hand-out never refills (D12)", and § Behavior 1 claims "no caller causes a launch".
   - The U7 V3 case cannot tell these apart. Its five calls arrive after the bound is spent, so `#replenish` issues nothing whoever starts it. The mutation "`#grant` starts the refill" passes; the case only catches a direct `pool.acquire`.
   - Right: `#grant` joins a running refill and parks. Only setup step 5 and `#lose` start `#replenish`. State this in Behavior 2.

3. **REQUIRED: `k` leaves out pending owner acquires, and the loop's await rule is unstated.**
   - `pool.active` counts only `#leased` (`pool\src\core\Pool.ts:97-100`). It leaves out:
     - creates in flight, held in `#reservations` (`:272-275`);
     - tokens committed but not yet received, held in `#ready` (`:348-352`).
   - Nothing says a step awaits its acquires before the next step computes `k`. Behavior 1 handles each token as it arrives.
   - A step that runs while a create is in flight issues extra acquires. At capacity, Pool parks them unassigned (`:272`, `:278`).
   - After the refill stops on the bound, a later `#lose` calls `release()`. That reaches `#recycle` and `#pump` (`:480-481`, `:265-269`), which hands the lost record to the stale waiter:
     - `#check` refuses it;
     - Pool disposes it, then pumps again (`:407-408`);
     - Pool creates (`:272-276`). That is a launch no refill decided, and the bound never saw it (V2).
   - Right: keep a `#pending` count. Compute `k = #size − pool.active − #pending − #survivors.size`. State that a step awaits every acquire it issued before the next step runs. Add a case: after the bound is spent, a later loss records no launch.

4. **REQUIRED: the derived `unavailable` state ignores a create in flight.**
   - § State machine: "`unavailable` … the pool is exhausted, or `k <= 0` with `#refill` undefined."
   - Input: size 3, launcher `failures: 2`, and `hold(2)`.
     - Creates 1 and 2 fail and commit at the FIFO head (`Pool.ts:425-438`). Strikes reach 2, which exceeds 1.
     - Create 3 is still parked.
     - The state reads `unavailable`, so `start()` rejects with `BROWSER_SERVER_UNAVAILABLE`.
   - After `release()`, the third token reaches `#spares`. `#forward` awaits the rejected `#starting`, so every call answers `UNAVAILABLE` for the server's life. The warm browser idles until `destroy()`.
   - Right: `unavailable` requires that no owner acquire is pending. Add the case just described.

5. **REQUIRED: the V1 survivor proof cannot fail when either guard alone is removed.**
   - § Behavior 6 has two guards: `k` subtracts `#survivors.size`, and the create hook (`#warm`) refuses with `BROWSER_SERVER_CEILING`. The U8 case claims "Fails if the refill or `#warm` ignores survivors".
   - Remove the `k` subtraction alone (size 1):
     - `k` becomes 1 and an acquire is issued;
     - `#warm` reads `pool.size` 0 (the record was deleted at `:518`) plus 1 survivor, which is at least 1, so it refuses before any launch;
     - no launch is recorded, and the case passes.
   - Remove `CEILING` alone: `k` is 0, nothing is acquired, and the case passes.
   - The `CEILING` check is also not a ceiling. `pool.size` counts `#resources` only (`:88-90`), and a record enters at `:333-334` after its create resolves. Every create in flight, including the caller's own, is outside the count, so concurrent creates pass the check together.
   - Right: one guard per fact, each with a case that fails when it is removed. Recommended: keep the subtraction in `k` (the owner's decision) and delete the `CEILING` refusal and its code. Otherwise make `CEILING` count creates in flight and give it a case of its own.

6. **REQUIRED: the layer has no `#closing` guard, so calling `start()` and `destroy()` in one turn misbehaves.**
   - Sequence:
     - `#setup` runs synchronously to `await mkdir` (step 3).
     - `destroy()` then wakes `#change` with no waiter and awaits `#starting`.
     - Setup resumes. Step 5 calls `#replenish()`, which the design never says refuses after `#closing`.
     - Step 6's `#grant()` parks on a fresh `#change`.
   - If `#replenish` refuses, nothing wakes `#grant`. `#starting` and `destroy()` never settle, and the process hangs at input end (row 20).
   - If it does not refuse, `RESTARTS + 1` runs of `#warm` start after `destroy()` began. Each creates and removes a `PID-UUID` folder; `Browser.ts:297` refuses the connect.
   - The U7 "destroy() during a hold" case parks `#grant` before `destroy()`, so it misses this ordering.
   - Right:
     - `#grant` re-checks `#closing` before every park and after every wake.
     - `#replenish`, and each setup step after an await, return when `#closing` is defined.
     - Add a case that calls `start()` and `destroy()` in one turn and asserts both settle, no launch is recorded, and `.profiles` is unchanged.

7. **ADVISORY: what an aborted watch does is unspecified.**
   - `#teardown` step 1 aborts the watch, and the arming is `.then((cause) => this.#lose(slot, cause))`.
   - If `#warm` fails after arming (for example, the record write fails) and the watch settles on abort, `#lose` runs for a slot that is neither lost nor closing. That leaves a stale `#lost` entry and a spurious `#replenish()`.
   - Right: a watch settles only on a loss signal; an abort never reaches `#lose`.

8. **ADVISORY: the teardown order reverses today's without proof.**
   - Today the toolset is destroyed before the browser (`src\server\BrowserMCPServer.ts:53-54`, `:158-160`).
   - The toolset's teardown destroys its journeys first, so the replay "writes its run while the emitter and the manager still stand" (`src\core\BrowserToolset.ts:2091-2093`). It also awaits `page.unsubscribe` for each watched page (`:2083-2088`, `:2101`).
   - With the browser gone first, any rejection lands in `#faults`. `destroy()` then rejects, and `#end` sets exit code 1 on a clean input end. `Browser.ts:848-850` is not a reason to reorder.
   - Right: toolset, then browser, for a live slot. Otherwise add a case where a clean `destroy()` with an active replay resolves, `#faults` stays empty, and the run record equals today's.

9. **ADVISORY: `#forward` misclassifies two outcomes.**
   - A tool that resolved with success on a slot lost just after is reported as `UNRESOLVED`, which discards a known outcome (`reliability-assessment.md:207-215`).
   - A call whose per-call ping succeeds on a lease lost before its tool runs is also reported as `UNRESOLVED`, although it never ran.
   - Right: report `UNRESOLVED` only when the tool failed or ended. After the per-call ping, `#acquire` re-checks `#lease` and `#lost` the way `#grant` re-checks the head.

10. **ADVISORY: the hand-out ping has no signal.** `destroy()` awaits `#starting`, which awaits `#grant()`, before `pool.destroy()`. A hung spare's ping waits out the 30 s deadline (`src\core\constants.ts:96`), so row 20's exit is late. Right: ping with `#abort.signal`, and race setup's await against it.

11. **ADVISORY: the sweep's attach is bounded only while it connects.**
    - `#raceAbort` covers only `client.connect()` (`src\server\Browser.ts:571`).
    - `#syncContexts` (`:580`) reattaches every page with `Page.enable` and `Runtime.enable` (`src\core\BrowserContext.ts:319-321`, `:494-497`), each under the 30 s default. `close()` waits for that (`Browser.ts:909`).
    - A leftover whose renderer hangs can therefore hold `destroy()` for 30 s per page, which falsifies row 26's "destroy() aborts it".
    - Right: give the sweep's launch a `timeout`. Make the U7 fixture accept the WebSocket and leave one CDP command unanswered.

12. **ADVISORY: the test double ignores `options.signal`.** Its `connect()` awaits the gate and never reads the signal (`tests\setupServer.ts:1596-1599`). So `pool.destroy()` waits for the parked create (`Pool.ts:574-576`) until the test releases the hold, and the "destroy during hold" case cannot show row 20's "destroy() aborts launches". Right: a parked connect rejects when the signal aborts, and the case asserts `destroy()` resolves without `release()`.

13. **ADVISORY: two rejection codes on an owner acquire are unclassified:** `cleanup` (`Pool.ts:393-400`) and `destroyed` (`:175-179`). Right: `cleanup` adds no strike (the survivor lowers `k`), and `destroyed` stops the refill.

14. **ADVISORY: rows 1 and 3 hold only at size 1.**
    - Row 1: at size 2 or 3 with a missing executable, the concurrent creates spend the bound in one step, with no retry.
    - Row 3 and D10 ("reported"): `EXHAUSTED` is written only "while a lease exists", so a stop before the first lease grant is never reported. The grant's reset never restarts a stopped refill, so the floor stays short without notice until the next loss.
    - Right: state the counts per size, and report every stop that leaves the floor short.

15. **ADVISORY: one timing is not in the plan.** Row 11's recovery (a 30 s ping deadline, plus a launch at size 1, plus the call itself) is not read against Codex's 60 s `tool_timeout_sec` (`eager\clients.md:19`). Add it to M3 or M5.

## Referred

- **To the Orchestrator or the user: D10 versus the design.** D10 says "a spare that fails retires and is reported"; the design retries it once under the bound.
- **To the user: D4 for modern clients.** A 2026-07-28 client meets the onset only at its first `tools/call`.
- **To the user: `BROWSER_SERVER_RESTARTS = 1`** is a figure fixed in advance, against D5 and V2's "no default".
- **To the subjective lane: D12's "written as the members".** The layer's names `#replenish`, `#lose`, and `#check` differ from the later members `start`, `destroy`, and `validate`.
- **To the subjective lane: `BrowserSlot`** is public with no public signature that uses it.
- **To the subjective lane or the Orchestrator: the forced kill** sits outside `Browser`, a second termination site against D8's one teardown place.

## Attacked and held

- **Every cited Pool 0.0.13 behavior matches `Pool.ts`:**
  - creates run only in `#pump` (`:263-291`);
  - `release` recycles and pumps (`:470-483`);
  - `clear` disposes its snapshot (`:147-160`);
  - `#dispose` can be called twice (`:485-501`);
  - `:518` deletes the record before the cleanup settles;
  - the commit barrier is at `:425-444`, and the teardown barrier at `:170-189` and `:574-587`.
  - The installed 0.0.13 build (`worker\node_modules\@orkestrel\pool\dist\src\core\index.js:563-564`) matches the source on `#clean`.
- **No pool re-pin is needed.**
  - Both contract copies define `isInstance` as `instanceof` (`index.js:933-936`) and `isError` against the global `Error` (`:981-983`), and the brand is `Symbol.for` (`:12`).
  - `PoolError` extends `Error`, not a contract class (`pool\src\core\errors.ts:19`).
  - Pool's emitter range `^0.0.11` matches the browser's (`browser-wt-browse\package.json:106`), so only contract nests a copy.
  - Probe also pins contract `^0.0.18` (`probe\package.json:95`).
- **V3 holds against a session `acquire`:** callers never call `pool.acquire`, so the U7 count catches a direct acquire.
- **A successor never runs beside its predecessor:** the record is counted until `:518`, and capacity counts records (`:272`).
- **Draining a lost record through `validate` works:** a failed cleanup rejects that waiter and creates nothing (`:393-402`).
- **Only lost records ever sit idle.** No owner acquire carries a signal, so the paths at `:343-346` and `#abort` never recycle a live token.
- **The cause of a `disconnect` can be derived from `pid`:** `Browser.ts:396-398` clears the pid on process exit, and `:452-464` keeps it for an owned browser on a socket loss.
- **The `endpoint` set and clear lines are correct:** set at `:574` and `:653`; cleared at `:350`, `:406`, `:463`, `:589`, `:672`, and `:1150`.
- **The mcp claims hold:**
  - the binder drops an aborted answer and emits nothing (`mcp\src\core\helpers.ts:1887-1901`), and a closed input aborts live requests (`:1908-1911`);
  - the only object-literal stub is `tests\src\core\helpers.test.ts:1464`;
  - `JSONRPC_SERVER_ERROR` is `-32000` (`constants.ts:305`);
  - `list_changed` goes out only through a subscription stream (`MCPServer.ts:1522-1542`), so mirroring the lease sends nothing before `initialize`;
  - the middleware mints a session on any OK response (`middlewares.ts:216-230`).
- **The U7 `hold(1)` case agrees with FIFO commit order.**
- **UNRESOLVED:** the quoted MCP Streamable HTTP session text has only the design's word behind it, and U1 must fetch it.

VERDICT: FAIL — REQUIRED 1, 2, 3, 4, 5, 6