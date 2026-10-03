**Lane: objective.** I checked the design against pool `9e316a1`, mcp `94e2e09` and browser `d6937be`, the contracts and the letter of the rules, and whether each proof can fail.

## Findings

1. **REQUIRED: the design reads a pool commit that has moved on, and P-2 is already repaired.**
   - **Where:** § "Pool 0.0.14 as read" (every `Pool.ts` citation), the P-2 block, § Floor unit "P-2 repair", failure row 33, Tensions "P-2 repair shape", Risks "Without P-2", Release order step 1, Measurements (86 and 398 tests).
   - **What is wrong:**
     - Pool `main` is `9e316a1` (`C:\Users\mikes\WebstormProjects\pool\.git\refs\heads\main:1`), the floor-fix-2 commit on top of `445a4ba` (`C:\Users\mikes\WebstormProjects\pool\tmp\codex\floor-fix-2-report.md:1`, `:5`).
     - It landed the shape the design ranked second. `#lose` only marks the record as owing (`C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:476`). `#clean` adds the credit in the step that removes the record (`:758-759`). A failed disposal adds no credit.
     - The withdrawal at ":482-483" no longer exists; `:480-483` is now a pump and a rethrow.
     - The test U-floor must keep green, `withdraws owed credit when leased cleanup fails`, is gone. The file has `:322`, `:359` and `:403` in its place (`C:\Users\mikes\WebstormProjects\pool\tests\src\core\Pool.test.ts`).
     - Every line citation is off. For example, the grant reset is `:671`, the floor branch is `:351-381`, and the spent check is `:396-398`.
     - I traced the P-2 breaking sequence at `9e316a1`. A's hook rejects, so A is kept and no credit is added. The pump at `:768` then sees `destroying.size === 0`, a spent bound and `#owed === 0`, and rejects with `create` (`:368-379`).
     - Row 33's premise ("the refill it paid for runs") cannot happen.
     - Fix-2 reports 89 core tests and 401 in total (`floor-fix-2-report.md:31`, `:37`). No confirming review of `9e316a1` exists; `review-floor\confirm.md` reviews `445a4ba`.
   - **What right looks like:**
     - Re-cite every row at `9e316a1`.
     - Replace the P-2 sub-unit with a confirming objective review of `445a4ba..9e316a1`.
     - Delete the P-2 tension, the P-2 risk and row 33's "Without P-2" clause.
     - Restate row 33 by outcome. With a kept record, `size >= min` and nothing refilling, the acquire rejects with `cleanup`. With a spent bound, it rejects with `create`. Otherwise it waits.
     - List these as assumptions a review change could break: credit at removal (`:759`), the fail-fast `cleanup` rejection even with live leases (`:352-367`), and the cause taken from the kept record (`:362`).

2. **REQUIRED: the shutdown recheck checks the wrong folders, and a failed listing rejects `destroy()`.**
   - **Where:** § Closing step 5; rows 2a and 25; U6 cases "`destroy()`, then `start()`" and "Unusable root".
   - **What is wrong (a):**
     - Step 5 lists `.profiles` every time, sends a failure to `#faults`, and step 6 throws it.
     - A server that never started in a fresh root gets `ENOENT`, and an unusable root (row 2a) gets `ENOTDIR`. Either way `destroy()` rejects, and `#end` writes a false `TEARDOWN` line with exit code 1.
     - The kept case `refuses to start again after destroy` awaits `destroy()` on a default-root server that never started (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\server\BrowserMCPServer.test.ts:582-588`). Its result depends on whether `tmp/browsers/.profiles` exists in the checkout.
   - **What is wrong (b):**
     - "Each `<process.pid>-` folder" picks up every server in the same process and root.
     - The kept case at `:179-225` runs two servers in one process and one root. Doubles have no pid (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\setupServer.ts:1587-1589`), so no `browse.json` is ever written.
     - Server 1's `destroy()` therefore deletes server 2's live profile. The case still passes, because it asserts only after both destroys (`:219-221`).
     - With real Chromium, the same deletion hits a sibling server whose launch is between `mkdir` and the record rename.
   - **What right looks like:**
     - Recheck only the profiles this instance created and has not removed (add in `#warm`, delete after step 4's `rm` resolves), plus the folders its sweep kept.
     - Treat `ENOENT` as nothing to check, and skip step 5 when setup never ran.
     - Add a case with two servers in one root: destroy the first, then the second's profile still exists and its next call succeeds.
     - Assert that `destroy()` resolves in the never-started case and the unusable-root case.

3. **REQUIRED: U6 cannot pass its own acceptance without U7's `#lose`.**
   - **Where:** § U6 Spec and the U6 cases "No launch on demand (V3)" and "Concurrency … after a lease loss"; § U7 Spec, which owns `#lose`.
   - **What is wrong:** U6's `#serve` step 3 calls `#lose`. The V3 case needs a lost lease to produce launches 2 and 3 (`token.destroy()`, then the owed refill, then two refused refills). The concurrency case needs a lease loss. U6 builds no `#lose` and no watch, so neither case can reach the counts it asserts.
   - **What right looks like:** Move the lease branch of `#lose` (unmirror, remove the extra dispatchers, clear `#lease`, call `token.destroy()` and drop its rejection) and `#losses`/`#failure` into U6, or move both cases into U7.

4. **REQUIRED: two "fails without" claims cannot fail.**
   - **F-7 case (U6 "Destroy during a hand-out ping"):**
     - Mutation: `pool.destroy()` runs after `await #starting`.
     - The setup acquire carries `#abort.signal`, so the abort rejects that waiter (`Pool.ts:190-196`). The failed validation then strikes and disposes double 0 (`:591-601`), and `#fill` starts a refill (`:408-418`).
     - `#warm` step 1 refuses on `#closing` before any `mkdir` or launch.
     - The launch count and the folders are unchanged, so the case passes under the mutation.
   - **V4 claim (U7 "All four V4 cases fail when the watch ignores its signal"):** the pool arms `watch` only after `create` resolves (`Pool.ts:435-441`). The failed-warm case never reaches `#watch`, so it passes under that mutation too.
   - **What right looks like:** Mark the F-7 case as hygiene, or name the joint mutation it guards (removing both the same-turn barrier and `#warm`'s `#closing` refusal). Change the V4 claim to cover three cases.

5. **ADVISORY: a refused setup can leave a browser running that never serves.**
   - At size 2, double 0's hand-out ping fails and its teardown rejects. The acquire rejects with `cleanup` (`Pool.ts:611-619`) and `start()` rejects.
   - The refill for the second slot (`:408`) already launched beside that ping. It succeeds and stays idle until `destroy()`, while every call is refused at `#serve` step 2.
   - **Right:** call `pool.destroy()` on a refused setup and keep its barrier for `destroy()`, or add this case to the failure table.

6. **ADVISORY: `#serve` step 3 does not say what happens when the ping resolves but `#lease` has changed.** State that it falls through to step 4.

7. **ADVISORY: the sweep sends `Browser.close` to whatever endpoint `browse.json` names, and `parseBrowserProfileRecord` accepts any `ws://` host.** Accept only `ws://127.0.0.1:<port>/devtools/browser/…`, the form U2 asserts.

8. **ADVISORY: the pool requires bounded hooks, and the design does not state the bounds.**
   - `C:\Users\mikes\WebstormProjects\pool\guides\pool.md:118-120` says a hook that never settles blocks every later refill, including the owed attempt.
   - Name the bound of each step of `#warm` (the fs steps and `toolset.start()`) and of `#destroySlot` (`toolset.destroy()` ahead of the kill grace).

9. **ADVISORY: row 32 overstates two things.**
   - At size 1 the record is kept, so the next acquire rejects with `cleanup` at once (`Pool.ts:352-367`); "acquires again" never gets a browser.
   - "The note" exists only after an earlier lease loss.

## Referred

- **Subjective lane:**
  - `BrowserSlotWatch.loss` is a `PromiseWithResolvers<unknown>`, which exposes mutable `resolve` and `reject` in a public type (T14).
  - `BrowserSlotWatch.abort` reuses the fixed lifecycle verb (`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md:229`) as a property holding a `Disposable`.
- **Orchestrator:** T2 credits the grant reset to the user through `eager\pool-floor-brief.md:24`. That line is in the Orchestrator's brief. The rule comes from the judge's V5 (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\resource\ruling.md:132`).

## NOT-EVIDENCED

- The gate counts for `9e316a1` rest only on the writer's report (`floor-fix-2-report.md:24-40`).
- Whether a renderer `crash` arrives without `Inspector.enable`.
- Whether a client closes stdin when its startup timeout passes.

## Attacked and held

- **The ceiling:**
  - Creates run only while `resources.size < min`, one refill at a time (`Pool.ts:402`, `:408-411`).
  - A record being disposed stays counted until `:758`, and a kept record stays counted for good (`:755`, `:719`).
  - `#warm`'s failure path finishes its teardown inside the refill, so the next launch starts only after the failed one is down or stranded.
- **Counts:**
  - Both F-5 orderings hold at 3 and 5 launches with one `EXHAUSTED` line (`:422-427`, `:671`).
  - V3 holds at 3, V5's owed attempt holds, and the stranded case holds at 1.
  - The kept-record (survivor) cases at sizes 1 and 2 hold (`:352-367`, cause at `:362`).
  - The P-2 sequence rejects with `create` at `9e316a1`.
- **The watch:**
  - It is armed before `#recycle` (`:441-442`), and the signal aborts before the destroy hook runs (`:730`, `:733`).
  - Late settlements are ignored (`:458`, `:469-475`), and a lost record is never committed (`:649-659`).
  - A failed per-call ping racing a watch loss ends in one browse `#lose` and one pool disposal (`:303`, `:469-475`), in either order.
- **Closing:**
  - Aborting and calling `pool.destroy()` in one turn rejects both `start()` and the waiter (`:238-244`).
  - A record still being validated is disposed with no strike (`:584-590`).
  - A grant that lands before the barrier is disposed as a leased record (`:249-251`).
- **The mcp hook:**
  - Only the legacy `initialize` waits on it (`C:\Users\mikes\WebstormProjects\mcp\src\core\MCPLegacy.ts:142-165`), and modern requests skip it (`:92-93`).
  - An aborted request writes nothing (`:149`; `C:\Users\mikes\WebstormProjects\mcp\src\core\helpers.ts:1895`).
  - Stopping the transport, or the input ending, aborts live requests (`helpers.ts:1908-1916`).
  - An `MCPError` keeps its code and data (`MCPLegacy.ts:150-158`), and `JSONRPC_SERVER_ERROR` is -32000 (`constants.ts:307`).
  - X-1 mints from `context.state.initialization` (`C:\Users\mikes\WebstormProjects\mcp\src\server\middlewares.ts:221`).
- **Loss cause:**
  - A process exit clears the pid before `disconnect` is emitted (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\Browser.ts:396-398`, `:416-418`).
  - A transport loss keeps the pid (`:444-475`).
  - The post-failure ping is refused at once (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\CDPClient.ts:118-120`).
- **View identity:** the factory passes the page as `options.page` (`src\core\factories.ts:159`), and `view` returns `#page ?? #view` (`src\core\BrowserToolset.ts:539-541`).
- **Port:** an unset port launches with `--remote-debugging-port=0` (`src\server\helpers.ts:363`), so browsers at sizes 2 and 3 never collide on 9222.
- **Pins:** browser pins contract `^0.0.19`, emitter `^0.0.11` and mcp `^0.0.35` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\package.json:105-109`). Pool and mcp 0.0.36 pin the same contract and emitter. Contract exports `parseInteger`. Probe pins contract `^0.0.18` (`C:\Users\mikes\WebstormProjects\probe\package.json:95`).

VERDICT: FAIL (1, 2, 3, 4)