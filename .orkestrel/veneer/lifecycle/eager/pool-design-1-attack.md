**Lane: objective.** I checked correctness against the pool, mcp, and browser code, what their contracts allow, the pins, whether each proof can fail, and the letter of the rules.

## Findings

1. **REQUIRED. The review repair the design waits on makes a new pool defect, and the design reads a pool commit that is no longer the tip.** Design sections: "Pool 0.0.14 as read", "Floor unit", "Release order".
   - **Where the pool is now.** Pool `main` is at `445a4ba` (`C:\Users\mikes\WebstormProjects\pool\.git\refs\heads\main:1`; `C:\Users\mikes\WebstormProjects\pool\tmp\codex\floor-fix-report.md:1`). The review ruled FAIL 3, 8 (`C:\Users\mikes\WebstormProjects\pool\tmp\codex\review-floor\objective.md:120`). The repair has landed:
     - the P-1 repair is at `C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:349-361`;
     - the watch-abort guard is at `:459`;
     - the owed credit is added when `#lose` starts (`:477-478`) and taken back in its catch (`:482-483`).
   - **What is wrong.** `#fill` spends a credit whenever a refill starts (`:402-403`), even while the leased record is still being disposed. If that disposal then fails, the catch subtracts again, so `#owed` goes to -1.
   - **Breaking input.** Use `min: 2, restarts: 1`. Creates 1 and 2 succeed, create 3 is held and then rejects, and create 4 throws. Record A's destroy hook is held and then rejects.
     1. Run `start()`, then `acquire()`, which leases A.
     2. B's watch settles: one strike, and refill 3 starts.
     3. Run `token.destroy()`: `#owed` is 1.
     4. Refill 3 rejects: 2 strikes, the bound is spent, and `#fill` spends the credit on create 4, which throws.
     5. A's hook rejects: `#owed` is -1.
     6. Call `acquire()`. The P-1 branch does not apply, because `resources.size` 1 is less than 2. The spent branch requires `#owed === 0` (`:362-367`), so the acquire breaks and parks until `destroy()`.
   - **The same sequence at `aea3bda`.** There the credit was added only after the disposal resolved (`C:\Users\mikes\WebstormProjects\pool\tmp\codex\review-floor\diff.patch:1035`), so this acquire rejects with `create`.
   - **Effect on browse.** At size 2, failure row 17 parks every later call. A later leased loss that happens while the bound is spent loses its owed attempt, which breaks V5. The test `withdraws owed credit when leased cleanup fails` throws synchronously, so it cannot catch this (`C:\Users\mikes\WebstormProjects\pool\tests\src\core\Pool.test.ts:539-558`).
   - **What right looks like.**
     - Hand this to the pool review as P-2. Two repairs work: give the credit in `#clean`'s success branch, next to `resources.delete`, for a record marked as leased when it was lost, so no withdrawal is ever needed; or never let a withdrawal take `#owed` below 0. Add the breaking sequence as a case, and expect `create`.
     - Re-cite the assumptions table at `445a4ba`. The old citations map as follows: `:390`→`:402`, `:425-445`→`:446-467`, `:710`/`:713`→`:733`/`:745`, `:734-737`→`:757-760`, `:651`→`:674`, `:463`→`:477-478`, `:571`→`:594`.
     - Publish pool only after P-2 is re-reviewed. The P-1 fallback in Tensions is moot.

2. **REQUIRED. A `tools/call` after a failed setup can wait forever instead of answering `BROWSER_SERVER_UNAVAILABLE`.** Design sections: ruling 1 ("`tools/call` answers `isError` … `BROWSER_SERVER_UNAVAILABLE:`"), failure row 2a ("as row 1"), and `#serve`.
   - **What is wrong.** When `mkdir` rejects, `#setup` throws before `pool.start()`. `#serve` steps 1 to 3 never look at `#starting`, so `#grant` calls `pool.acquire()` on a pool that was never started. The waiter breaks at `Pool.ts:374`, and `#fill` returns at `:395` because nothing started the pool. The call parks until the client cancels or the input ends.
   - **Who reaches it.** Modern requests skip the handshake (`C:\Users\mikes\WebstormProjects\mcp\src\core\MCPLegacy.ts:92-93`). So a modern client meets this hang at the onset, which breaks D4 and T8.
   - **What right looks like.** `#serve` awaits `#starting`, raced against the call's signal, before `#grant`. When setup has rejected, `#serve` refuses with that error. The U6 "Unusable root" case adds a modern `tools/call` whose text opens with `BROWSER_SERVER_UNAVAILABLE:`; without the change, it fails by timeout.

3. **REQUIRED. A public type breaks the readonly-collection rule.** Type sketch, `BrowserSlotWatch.crashes: Map<BrowserPageInterface, () => void>`.
   - **What is wrong.** `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\typescript.md:27` requires `ReadonlyMap` for a public collection property. T14 itself says the type is public. The design lists this under the subjective lane, but it breaks the letter of a rule.
   - **What right looks like.** Either type the member as `ReadonlyMap` and replace the `#watches` entry with a fresh map on each `page` event, or keep the per-page listeners in a private `WeakMap<BrowserPageInterface, () => void>` field so the public type has readonly members only.

4. **ADVISORY. The `version`-handler cases cannot be told apart from the hand-out ping.** Affected cases: U6 "No launch on demand", U7 "One call, one acquire (X-4)", and U7 "V4 on `token.destroy()`".
   - **What is wrong.** `validate` and the per-call ping both send `Browser.getVersion` (`scaffold\.orkestrel\veneer\lifecycle\eager\revision-3.md:904`, `:912`). A handler that fails every one also fails the hand-out ping. Then no grant happens, and the X-4 claim "at most one launch per call" still holds under the mutation "`#serve` pings again after acquiring".
   - **What right looks like.** The handler answers the first `Browser.getVersion` each double receives and fails every later one. U2's `version` option states this.

5. **ADVISORY. The U6 "Grant reset" count disagrees with the count table.**
   - **What is wrong.** U6 says "records 4 launches". The count table says "4 when the grant lands after the first pair". When both refusals settle before the grant, that is 1 success and 4 failures, so 5 launches (`Pool.ts:437-439`, `:674`, `:402-405`). It is 4 launches only when the grant lands while the second refusal is held.
   - **What right looks like.** Pin one of those interleavings in U6, and change the table to "2, 3, or 4 failed".

6. **ADVISORY. The closing paths have two gaps.**
   - **`#hold` while closing.** When closing, `#hold` returns no token. Then `#serve` step 4 compares `#lease !== token` with both undefined, so the comparison does not refuse the call. TypeScript forces a check here, but the design names no answer for it.
   - **`#handshake` while closing.** When destroy interrupts setup, `#setup` returns, so `#starting` resolves and `initialize` answers success to a server that is closing.
   - **What right looks like.** When closing, `#hold` throws `BROWSER_TOOLSET_ENDED`, so `#grant` rejects with it. `#handshake` throws the same error when `#closing` is defined after `#starting` settles.

7. **ADVISORY. The closing window does extra work.**
   - **What is wrong.** `#destroy` aborts at step 2 but calls `pool.destroy()` only after awaiting `#starting`. In that gap:
     - `#validate` returns false on the abort, so the pool strikes and disposes a healthy record (`Pool.ts:594-604`);
     - `#fill` starts refills (`:402-419`), and each `#warm` creates and then removes a profile folder. The launch itself is refused by the aborted signal (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\Browser.ts:297`, `:361`).
   - **What right looks like.** Call `pool.destroy()` in the same turn as the abort, then await `#starting` and the barrier. `#warm` refuses when `#closing` is defined, before its `mkdir`.

8. **ADVISORY. Shutdown leaves the profile folders of failed teardowns (D8).**
   - **What is wrong.** `#destroySlot` step 4 skips `rm` when step 3 rejected. `pool.destroy()` never retries a retained record (`Pool.ts:722`). `#destroy` step 5 rechecks only the folders the sweep kept. So a retained or stranded `<process.pid>-…` folder stays even when its Chromium has exited by shutdown.
   - **What right looks like.** After `pool.destroy()`, recheck each remaining `<process.pid>-` folder through its `browse.json` pid, and remove it when `probeProcess` is false.

9. **ADVISORY. One sentence of the `UNRESOLVED` text can be false.** The text always says that the next call runs on a fresh browser at `about:blank`. That is false when the bound is spent (`Pool.ts:362-373`) or when a retained record holds the floor (`:350-361`). State it only for those cases, or drop it.

10. **ADVISORY, referred to the user.** A hung or early-crashed view is never detected.
    - **What is wrong.** Both pings reach the browser target only.
      - A hung renderer on the view (row 13) is never classified, so every later call costs one full deadline.
      - A view that crashed during `#warm` is also missed: its `crash` event arrives before the pool arms the watch (`Pool.ts:436-449`), and the hand-out ping passes.
    - **What to rule.** Neither case ever recovers. The user decides whether a check on the view (an evaluate on the view's session after a `CDPTimeoutError`) joins D10's "before every call".

11. **ADVISORY. Some browser citations are wrong.** In `Browser.ts`:
    - U2 lists `:1150` as a place `endpoint` is cleared, but that line is in `#closeProcessPipe`; the clear is at `:1165`;
    - `#terminate` throws at `:1141-1143`, not `:1139-1141`;
    - `#finish` destroys the emitter at `:1171-1172`, not `:1156-1157`;
    - `#settle` is at `:909`, not `:908`.

12. **ADVISORY. U7 "Stranded … `start()` rejects naming the pid" cannot hold with the double.** The double's `pid` is undefined (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\setupServer.ts:1587-1589`). Either the `survivors` rejection carries a fixture pid in its context, or the case asserts only the code.

## UNRESOLVED and NOT-EVIDENCED

- **UNRESOLVED:** the pool's gate and test counts. "77 of 77" (`floor-last.md`) and "86 passed / 398 passed" (`floor-fix-report.md:46-52`) rest only on the writer's reports.
- **NOT-EVIDENCED:** I read `aea3bda`'s `Pool.ts` only through the review diff (`diff.patch:714-1190`), not as a file.

## Referred

- **Subjective lane.** `renderBrowserServerLoss` against `describe*` ("takes a finding", `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md:100`, `:104`), and the private names listed under Tensions.
- **Pool review or item 14.** The P-1 branch (`Pool.ts:350-355`) also rejects a waiter while another holder still has a live lease that could be released later. That is harmless with browse's one holder, but it matters for parallel holders.
- **User (already ruled, T2).** The grant reset re-arms spare launches at a caller's acquire, which sits against D7's "never by a caller's demand".

## Attacked and held

- **Hook positions.** The hooks are bound methods or an object-literal arrow, which `architecture.md:175` allows.
- **Watch and disposal order.** The watch signal aborts before the destroy hook (`Pool.ts:733`, `:745`). A late loss does nothing (`:470-476`). A lost record never crosses validation or the commit (`:577-585`, `:652-662`).
- **Races that reach one browser:**
  - a failed per-call ping and a watch loss on the same browser end in one loss, through the `#losses.has` guard and the token latch (`:299-301`);
  - concurrent calls share one acquire through `#granting`;
  - two crashes in a row end at the bound.
- **The ceiling.** Refills run one at a time (`:396`, `:404`). A record counts until its hook settles, and a retained record keeps counting (`:757-760`). A stranded launch refuses every later launch.
- **Counts.** At size 1 with every create failing, setup costs 2 launches (`:437-440`, `:362-373`, `:422-428`).
- **P-1 at `445a4ba`.** It covers failure row 14 at size 1 and row 32.
- **One-turn `start()` and `destroy()`.** `#closing` is checked after `mkdir`, and `#refill` checks `#ending` first (`:433`).
- **The mcp hook:**
  - the error mapping (`MCPLegacy.ts:142-165`, `errors.ts:41`, `constants.ts:307`);
  - the pass-through (`factories.ts:92`, `MCPServer.ts:210`);
  - the HTTP session mint from the dispatch outcome (`middlewares.ts:219-226`).
- **Loss classification.** Exit is told apart from transport loss through `pid` (`Browser.ts:138-140`, `:396-398`, `:444-475`).
- **V4 and the double.** The double's `destroy()` leaves its emitter alone (`setupServer.ts:1669-1672`), so the V4 counts can fail when the watch ignores its signal.
- **The in-call drop case (R3-1)** can fail without the post-failure ping.
- **Pins:**
  - mcp 0.0.36 pins contract `^0.0.19` and emitter `^0.0.11` (`mcp\package.json:100-101`);
  - pool pins contract `^0.0.19` (`pool\package.json:72-73`);
  - browser pins contract `^0.0.19` (`package.json:105`).
- **Probe sentence.** Its references hold: `Probe.ts:137-139`, `:536`, `:545`, and `LintStage.ts:156`.

VERDICT: FAIL 1, 2, 3