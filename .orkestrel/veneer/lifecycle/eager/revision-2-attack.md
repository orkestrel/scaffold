**Lane: objective.** I attacked the design for correctness under adverse orderings against `Pool.ts` 0.0.13 and the browser, mcp, and test code, and I checked the proofs, pins, and rules. Naming, layering, and D-reading questions go to the referral section.

## Verdicts

1. **REQUIRED: the `UNRESOLVED` answer depends on the loss arriving before the tool's failure, and the code delivers the failure first.** This affects § Operation lifecycle, failure-table rows 7 and 8, and U8 "Concurrent calls across a fault".
   - **Evidence.**
     - `CDPClient` rejects every pending request inside its transport `close` handler (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\CDPClient.ts:288-297`).
     - An owned `Browser` emits `disconnect` only from the process `exit` handler (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\Browser.ts:416-418`), or 50 ms after a socket loss (`Browser.ts:441`; `BROWSER_TRANSPORT_LOSS_DEFER_MS`, `C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\constants.ts:89`). The delay exists because `#alive()` cannot see a death before `exit` arrives (`Browser.ts:435-440`, `:1045-1050`).
   - **Breaking input.** Kill the leased Chromium during `navigate`.
     - When the socket close arrives before `exit`, the request rejects with `CDP connection closed` and the tool fails. `#forward` then finds `#lost.has(slot)` false and answers the plain CDP failure.
     - Row 8 (the socket drops while the process lives) always goes through the 50 ms delay, so it answers the plain failure every time.
   - **The proof cannot catch it.** The planned double `kill()` emits `disconnect` while its transport keeps answering, which is the reverse of the real order. So the `src:server` case passes a claim that real Chromium breaks. `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md:32` forbids a stub that "stands in for the integration being claimed". The service "Outcome unknown" case will fail or flake.
   - **Right.**
     - When a tool fails and its slot is not marked lost, `#forward` pings that slot's browser under the call's signal before it answers.
     - A closed client rejects at once (`CDPClient.ts:118-120`). A rejection that is not an abort goes through `#lose`, and the call answers `UNRESOLVED`. A ping that resolves keeps the plain failure as a known outcome.
     - The double gets a `drop()` that closes its fixture transport first and emits `disconnect` a macrotask later. Add a `src:server` case on `drop()` that fails when the post-failure ping is removed.

2. **REQUIRED: the loop can stop while lost records sit idle in Pool, and nothing ever disposes them.** This affects behavior 2 (when the loop stops) and W3.
   - **Mechanism.**
     - A loss released after a step's `clear()` snapshot (`C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:149`) waits for the next step's acquire or clear.
     - When that next step stops, because the bound is spent or because survivors make `k <= 0`, no further step runs.
     - Pool disposes an idle record only through `validate`, `clear`, or `destroy` (`Pool.ts:147-160`, `:170-189`, `:386-408`).
   - **Breaking input** (size 2, `RESTARTS = 1`):
     1. Kill the spare. The relaunch succeeds, and strikes stay at 1.
     2. In one turn, kill the lease and then the spare.
     3. `#lose(lease)` releases the lease and starts the loop. That loop's `clear()` snapshots only the lease.
     4. `#lose(spare)` counts strike 2 and releases the spare after the snapshot.
     5. The clear settles, the step reads the bound as spent, and the loop stops with the spare idle.
   - **Effect.** The spare's `#teardown` never runs before server `destroy()`. Its toolset, profile, and armed watch stay. After a socket drop with a live process, or after a hand-out ping timeout, a live or hung Chromium keeps running. This breaks D8 and V4.
   - **Right.** The loop never stops while `pool.idle > 0`. It repeats the clear without acquiring, because disposal is not a refill and spends none of the bound. Add a U8 case on this input that asserts the spare double is destroyed, its `disconnect` listener count is 0, and its profile is gone.

3. **REQUIRED: V5 ("a leased loss always gets at least one attempt") depends on the order of events.** This affects behavior 5 step 2, the behavior 6 table, and the V5 row.
   - **Mechanism.** The design lowers the count, `#strikes = Math.min(#strikes, RESTARTS)`, at the moment of the loss. Any strike counted after that, and before the next step issues its acquires, cancels the attempt.
   - **Input (a): the input of verdict 2.**
     - The lease loss lowers strikes to 1, the spare's loss raises them to 2, and the step reads the bound as spent.
     - Result: zero attempts and an unavailable server, even though every create succeeded.
     - If the spare's `disconnect` arrives first, the lease does get its attempt, so the outcome depends on which event wins.
   - **Input (b).**
     1. Lease A is lost with the bound spent, which lowers strikes to 1. Its successor B is in flight.
     2. A call leases spare S, and S is lost. The count stays at 1.
     3. B's create rejects, which counts strike 2.
     4. The next step reads the bound as spent, so S's loss gets no attempt.
   - **The proof cannot catch it.** U8's V5 case kills in the order spare, spare, lease, so it sees neither input.
   - **Right.**
     - Each leased loss owes one attempt that no later strike can cancel.
     - For example, `#lose` increments a count of owed attempts when the lease is lost. Each step issues `n >= min(k, owed)` even when the bound is spent, and consumes the count as it issues. This count records a real fact, not a second flag.
     - Add input (a) to U8 in both kill orders, each asserting exactly one launch.

4. **REQUIRED: the watch has no way to reach the pages it is supposed to watch.** This affects the `BrowserSlot` type sketch, behavior 4, behavior 9 step 1, and U8 "Watch signal".
   - **The slot carries no context.**
     - `#watch` subscribes "to the existing pages and to the context's `page` event". But `BrowserSlot` holds only `browser`, `profile`, and `toolset`.
     - `BrowserToolsetInterface` exposes no context (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\types.ts:2948-3017`).
   - **The browser's context list does not help.**
     - On a real browser, `browser.contexts()` can hold a synced default context beside the isolated one (`Browser.ts:828-837`, `:242`).
     - The double's `isolate()` does not keep the context it builds, and its `contexts()` returns `[]` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\setupServer.ts:1635-1643`). So U8's assertion on "its context's `count('page')`" has nothing to read.
   - **The destroy hook cannot find the watch.** `#teardown(browser, profile, toolset, cause)` receives no slot, yet its step 1 aborts a watch controller kept in a map keyed by slot.
   - **Right.**
     - Add `readonly context: BrowserContextInterface` to `BrowserSlot`, set from `isolate()` in `#warm`. Then `#watch`, and the later `watch(value, signal)`, read it from the value.
     - Key `#watches` by browser, or have the destroy hook pass the slot.
     - Make the double keep each context it isolates, so the V4 counts can be read.

5. **ADVISORY: one U8 assertion claims an order the loop does not keep.** U8 V5 case, step 4 says "only then is the spare's double launched". In fact, the next step issues the spare's acquire as soon as the held create settles. It does not wait for the call's ping or tool. Assert instead that the spare's launch starts after the held create settles, and that the total is exactly 2.

6. **ADVISORY: the forced kill needs a guard for a missing pid** (behavior 9 step 2, and `#warm`'s failure path).
   - `browser.pid` is `undefined` for the double (`tests\setupServer.ts:1568-1570`) and for a browser whose exit cleared it (`Browser.ts:397-398`).
   - `process.kill(undefined, 'SIGKILL')` throws `ERR_INVALID_ARG_TYPE`. U8's silent-spare case reaches this branch with a `CDPTimeoutError` cause.
   - Kill only a defined pid, ignore `ESRCH`, and put any other failure in `#faults`.
   - When the launcher throws, `#warm` has no browser. `#teardown` must accept an absent browser and still remove the profile.

7. **ADVISORY: `#refill` is cleared only on the stop path** (behavior 2). A throw inside `#restore`, such as `log.write` on an ended stream, leaves `#refill` defined forever. Then `#fill` never restarts the loop, `unavailable` never holds, and `#promote` waits on `#change` permanently. Clear `#refill` and wake `#change` in a `finally`.

8. **ADVISORY: two closing guards are untested** (behavior 8, U7 "One-turn close").
   - `#fill`'s `#closing` guard can never be reached: its only callers, `#setup` and `#lose`, check `#closing` first. So no case fails when it is removed, which breaks the design's own rule of one guard per fact, each with a case. Drop the guard or name the path that reaches it.
   - The one-turn case fails for a missing `#setup` guard only if its pre-created listing contains a folder the sweep would remove. State that fixture.

9. **ADVISORY: `destroy()` cannot set `#closing` as early as behavior 8 says.** Today's code is `this.#closing ??= this.#destroy()` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\BrowserMCPServer.ts:141-143`). It assigns only after the async body's synchronous prefix has run: listener removal, `transport.stop()`, and `#abort.abort()`. State that `destroy()` assigns the closing state before it runs the body.

10. **ADVISORY: losing the lease must also unsubscribe from its toolset.**
    - `#lose` must remove the server's three listeners from the lost toolset's manager (`#unmirror`, `BrowserMCPServer.ts:283-290`).
    - Otherwise that toolset's teardown withdraws its tools (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:2098`). The server's `#withdraw` then reads the next lease's manager (`BrowserMCPServer.ts:272-277`) and removes or re-adds a dispatcher it does not own.

11. **ADVISORY: two `UNAVAILABLE` texts promise detail they cannot carry.**
    - Row 14 says `UNAVAILABLE` names the pid, but the survivor's error carries the pid only in its context (`Browser.ts:1139-1141`). Render it from the context, or drop the claim.
    - When the bound is spent by losses alone (for example, two spares die before receipt at start), both `#failure` and the survivor cause are undefined. Fall back to the last loss cause.

12. **ADVISORY: row 2 mixes two different outcomes.**
    - A `.profiles` read failure stays inside the sweep, which never rejects, so `initialize` succeeds. Only a `mkdir` failure becomes `UNAVAILABLE`. Split the row.
    - No path reports the sweep's own failure. Write it to `log`.

13. **ADVISORY: the U7 service case "Killed server" can flake.** `destroy()` rechecks the kept folders once. That single check races the leftover Chromium's shutdown, because `Browser.close` waits for no process (`Browser.ts:940-946`). So "pid at ESRCH and its folder gone" can fail on a loaded host. Either bound the recheck with the library's drain, or assert only what one recheck can show.

14. **ADVISORY: `UNRESOLVED` also covers some calls whose outcome is known.**
    - One case: the toolset refused the call with `ENDED` before any handler ran, because the slot was lost between `#acquire`'s re-check and the run.
    - The other case: the call failed for its own reason before an unrelated loss.
    - Both answers are conservative. Name them in Tensions beside the read-only tool.

15. **ADVISORY: the A-30 explanation is wrong, though the outcome holds.** The toolset destroy runs between the `SIGKILL` and `browser.destroy()`. So `exit` can arrive before the browser is marked destroyed, and `#handleProcessExit` then runs (`Browser.ts:388-420`). The outcome is still correct because `#settle()` awaits `#exitCleanup` (`Browser.ts:908-919`). Fix the sentence.

16. **ADVISORY: U5 must merge main first.** The worktree's roadmap holds items 6 to 8 (`C:\Users\mikes\WebstormProjects\browser-wt-browse\ROADMAP.md:3-5`), while main's runs through 12 (`C:\Users\mikes\WebstormProjects\browser\ROADMAP.md:9`). Merge main before pasting item 13.

## Referred

**To the subjective lane:**
- `#teardown` against the fixed meaning of `destroy` (`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md:231`, `:234`). The existing `BrowserToolset.#teardown` (`BrowserToolset.ts:2090`) is evidence, not authority.
- `#restore` against `start`, which names.md defines as "Begin or restart" (`names.md:224`).
- `#acquire` reusing Pool's verb for a lease lookup.
- `MCPServerOptions.handshake`, which `MCPServer` stores but never reads. Only `MCPLegacy` reads it.
- A library class setting `process.exitCode`, against `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md:67` ("Mechanism, not product policy").
- `#end` is attached for input end and for both signals, so it writes one `TEARDOWN` line per invocation.

**To the user:**
- D12 lists "validation at hand-out" among the things Pool keeps doing. The design instead pings at hand-out in `#promote` and uses Pool's `validate` only to refuse lost records, for the reason at `Pool.ts:386-408`. Confirm this reading.
- Each leased loss lowers the strike count and so re-arms a spare that D10 retired (the last row of the behavior 6 table).
- W8 against D10's "waits for the first warm browser".
- The `CRASH` and `UNRESOLVED` codes travel in tool text. `reliability-assessment.md:259` asks for a machine-readable identity, which a `_meta` field could carry.

**NOT-EVIDENCED:**
- The MCP 2025-11-25 Streamable HTTP session text. This lane had no fetch tool either.
- Whether `Inspector.targetCrashed` arrives without `Inspector.enable`. U8 decides it.

## Attacked and held

- **No caller can cause a launch (V3).** No `acquire` call exists outside the owner's loop. U7's "stays 2 across five more calls" fails if `#grant` calls `#fill`.
- **`k` stays exact without a pending count.**
  - A step issues `n <= size − active − survivors` acquires, while Pool's records are exactly the active plus idle ones (`Pool.ts:263-277`). So every waiter is assigned when it is issued.
  - The step awaits every acquire, so none is outstanding when `k` is read.
  - U8's no-outstanding-waiter case fails under a parallel step.
- **The ceiling holds.**
  - Pool caps records plus reservations at `max` (`Pool.ts:272`), and a lost record counts until `:518`.
  - A survivor found on the validation path rejects its waiter with `cleanup` (`:391-402`). No unassigned waiter exists for Pool to create for.
- **The loop stops in one synchronous turn.** The stop decision and `#refill = undefined` share that turn, and losses arrive in later tasks.
- **The behavior 6 counts are right.** I traced sizes 1 to 3 for every row. The `#strikes === 0` branch is pinned by size 3 "exactly 3". The survivor cases at sizes 1 and 2 fail when `k` omits survivors, and the V2 pinned case fails at `RESTARTS` 0 or 2.
- **No pool re-pin is needed.**
  - The brand, `isInstance`, and `isError` are identical at `index.js:12`, `:933-936`, and `:981-983` in both `C:\Users\mikes\WebstormProjects\browser-wt-browse\node_modules\@orkestrel\contract\dist\src\core\index.js` and the copy nested under `emitter`.
  - `isPoolError` tests pool's own class (`C:\Users\mikes\WebstormProjects\pool\src\core\errors.ts:61-63`).
  - Nested 0.0.18 copies already sit under `emitter`, `websocket`, `router`, and other packages.
- **mcp.** An aborted request writes and emits nothing (`C:\Users\mikes\WebstormProjects\mcp\src\core\helpers.ts:1887-1901`). A rejection that reaches the binder unaborted emits `error` and writes nothing (`:1895-1897`). So `MCPLegacy` must answer `-32603` itself, which the design states.
- **The constraint citations check out.** I checked the endpoint sets and clears, `Browser.ts:840-872`, `:921-949`, and `:1139-1141`, `CDPClient.ts:113-154`, the test-fixture lines, `main.ts:31-32`, and `BrowserMCPServer.ts:131-167`.
- **The pins and release order hold.**
  - Pool pins contract `^0.0.18` and emitter `^0.0.11` (`C:\Users\mikes\WebstormProjects\pool\package.json:72-73`). Its emitter dedupes with the browser's root 0.0.11.
  - Probe pins contract `^0.0.18` (`C:\Users\mikes\WebstormProjects\probe\package.json:95`).
  - mcp publishes before the browser re-pins from `^0.0.35` (`package.json:109`).

VERDICT: FAIL — REQUIRED 1, 2, 3, 4