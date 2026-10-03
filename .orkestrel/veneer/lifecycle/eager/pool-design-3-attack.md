**Lane: objective.** I checked correctness under adverse orderings, what the pool, mcp, and browser code permit, the pins, the letter of the rules, and whether each proof can fail for its defect. Shape and naming questions go to the subjective lane.

The dispatch says the pool is at `aea3bda`, but the pool checkout's `main` points at `9e316a1` (`C:\Users\mikes\WebstormProjects\pool\.git\refs\heads\main:1`). Its history runs `aea3bda`, then `445a4ba`, then `9e316a1` (`C:\Users\mikes\WebstormProjects\pool\.git\logs\HEAD:11-13`). The design and this verdict both read the files on disk at `9e316a1`.

## Verdicts

1. **REQUIRED: the U7 service case "Missing executable after start" cannot pass at its block's default size.**
   - **What is wrong.** The block is headed "size 2 unless stated", and this case states no size. It expects a lease kill to give "the note, then `UNAVAILABLE` naming `ENOENT`".
     - At size 2, the next call's acquire takes the idle spare (`C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:344`), validates it, and commits it (`:669-672`). The call succeeds with the note.
     - The design says the same thing in two places: the per-size table row "The lease is lost, and every later create fails" gives size 2 as "the session takes the spare", and failure-table row 6 says "the next call runs on the spare".
     - `UNAVAILABLE` appears only after the spare is also lost. At size 1 it follows the owed attempt, a strike, the retry, and the `create` refusal (`:408-409`, `:436-438`, `:368-379`).
   - **What right looks like.** Mark the case "Size 1", or at size 2 kill the lease and then the spare, and assert on the call after that. Name how the executable goes missing after start (for example, a symlink removed on POSIX), and mark the other hosts NOT-EVIDENCED.

2. **ADVISORY: `#hold` accepts a slot that browse already recorded as lost, which can leave the session stuck for good.**
   - **The ordering.**
     - `#report` runs while the slot is validating, so `#lease` is undefined.
     - Browse's `#lose` takes the non-lease branch: it only records `#losses`. `resolve(cause)` then queues the pool's watch reaction (`Pool.ts:455-456`).
     - If the continuation of `#validateResource` is already queued, it runs first and commits the record (`:604-605`, `:635-640`, `:672`).
     - The watch reaction then disposes the now-leased record (`:476`), and `#hold` sets `#lease` to that dead slot.
     - From then on, `#lose` returns early because `#losses.has(slot)` is true. `#grant` returns `#lease`, and `#serve` step 5 passes. Every call fails with the plain failure text, and the server never recovers (against D2).
   - **Why it does not happen today.**
     - `crash` is emitted synchronously while a frame is parsed (`C:\Users\mikes\WebstormProjects\browser-wt-browse\node_modules\@orkestrel\websocket\dist\src\server\index.js:756`; `C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\CDPClient.ts:314-357`).
     - `disconnect` comes from the child's `exit` event or from the 50 ms timer (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\Browser.ts:416-419`, `:441`).
     - So `#report` runs before that drain's microtasks, and the watch reaction is always queued ahead of the commit. The design states this invariant nowhere.
     - This lane did not establish that the transport's `close` is emitted at macrotask time. The Edge serving-pid branch (`Browser.ts:430-431`, `:1046-1049`) runs `#handleProcessExit` from that `close` handler.
     - The U7 double's `kill()` emits `disconnect` synchronously, so a proof that kills from inside a promise continuation can reach the stuck state.
   - **What right looks like.** In `#hold`, when `#losses.has(token.value)`, call `token.destroy()`, leave `#lease` unset, and refuse. Add a U7 case that kills the double from inside a `version` handler's continuation.

3. **ADVISORY: two losses in a row overwrite a pending note.**
   - **The interleaving.**
     - Lease A, at URL X, is lost between calls, so `#notice = A`.
     - The next call runs on B, and B is lost mid-call. `#lose(B)` overwrites `#notice` with B, and that call answers `UNRESOLVED` about B.
     - The rule "a call that ran on a slot other than `#notice`" now excludes that call from A's note.
     - The following call carries a `CRASH` note about B. The agent never learns that its page at X was lost before the second call ran.
   - **What right looks like.** `#lose` keeps a pending `#notice`, or the note carries every pending loss. Add a U7 case.

4. **ADVISORY: failure-table row 14 promises "`UNAVAILABLE` naming the pid", and the stated mapping does not produce it.**
   - **What is wrong.** `#serve` step 4 and setup step 6 use `error.cause ?? #failure` "as its message". The pid sits in the error's `context`, not in its message (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\errors.ts:204-208`; `Browser.ts:1141-1143`). U7 asserts only "naming unconfirmed termination".
   - **What right looks like.** Render `UNAVAILABLE` through `describeBrowserServerLoss`, which U4 already asserts renders `4242`, or drop the pid from row 14.

5. **ADVISORY: failure-table row 15 contradicts `#destroySlot` step 4.**
   - **What is wrong.** Step 4 sends every `rm` failure to `#faults`, and `#destroy()` step 6 throws `#faults`.
     - So a transient `rm` failure that the shutdown recheck later clears still makes `destroy()` reject. `#end` then writes a `TEARDOWN` line and sets exit code 1.
     - Row 15 says "`destroy()` reports a failure that persists".
     - A directory that stays busy after Chromium exits is expected (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\BrowserMCPServer.ts:164`).
   - **What right looks like.** Keep a hook-time `rm` failure out of `#faults` while its folder stays in `#folders`, and report only the recheck's failure. Otherwise, restate row 15.

6. **ADVISORY: the sweep's folder rule leaves out its most common input.**
   - **What is wrong.** § The sweep rules on a record with a live pid, an `ENOENT` read, another read failure or a refused record, and a failed removal. It never rules on a parsed record whose pid is gone. A killed server whose browser also died leaves exactly that.
   - **What right looks like.** Add "a record whose pid `probeProcess` reports gone: remove the folder", with a U6 case.

7. **ADVISORY: U7 "Owed attempt (V5)" can only pass if the launch count is read before `release()`.**
   - **What is wrong.** After `release()`, the successor's grant resets the strikes (`Pool.ts:671`). `#completeOperation` then calls `#fill`, which refills the missing slot (`:408-418`), so a second launch follows.
   - **What right looks like.** Read the count before `release()`, and assert the later refill as the observable effect of T2.

8. **ADVISORY: `#write` catches throws only.**
   - **What is wrong.**
     - Node reports a failed write to a destroyed stream, or one that hits `EPIPE`, through an asynchronous `'error'` event and the write callback, not a throw. This lane did not run that on the target host.
     - With no `'error'` listener, the failure is an uncaught exception that ends the server mid-session and leaves its browsers behind, as in row 18.
     - The measurement plan probes only the throw.
   - **What right looks like.** Write with a callback that adds its error to `#faults`, and rule whether browse may listen on a stream the host supplies. Widen the U6 log case to a destroyed stream.

9. **ADVISORY: `#warm` step 4 does not say what a failed `browse.json` write or rename does.** Rule it one of two ways:
   - fail the warm, which tears the slot down and strikes; or
   - continue without a record and accept that a later `ENOENT` read deletes the folder.

10. **ADVISORY: T4's stated reason is not true.**
    - **What is wrong.** T4 says "The pool exposes no signal for it". Every failed refill runs browse's own `#warm`: the pool calls `create` at `Pool.ts:435` and only strikes at `:436-438`. Only the spent state lacks a signal. D10 says a spare that fails "retires and is reported".
    - **Referred** to the user, who owns T4, with this correction.

11. **ADVISORY: the U15 probe sentence drops the deadline that probe puts around stage teardown.**
    - **What is wrong.** Probe races `stage.destroy()` against a deadline because "Teardown of a hung stage can reject or outlive its own deadline" (`C:\Users\mikes\WebstormProjects\probe\src\server\Probe.ts:541-552`). The pool requires bounded hooks: a destroy hook that never settles blocks every replacement (`C:\Users\mikes\WebstormProjects\pool\guides\pool.md:118-120`). "The leased token's `destroy()` in place of the deadline recycle" invites an unbounded hook.
    - **What right looks like.** State that probe's `destroy` hook carries the stage deadline.

12. **ADVISORY: two smaller gaps.**
    - `#serve` step 4 does not classify an abort of the call's own signal. Say that it rethrows the call's reason.
    - § Setup and the handshake cites `C:\Users\mikes\WebstormProjects\mcp\src\core\MCPLegacy.ts:92-93` for modern requests. Stdio goes through `handle` instead (`:117-119`; `C:\Users\mikes\WebstormProjects\mcp\src\core\helpers.ts:1883`).

## Findings outside the claims

- **Pool assumptions a review change could break**, beyond the ones the design lists:
  - `#fill` spends an owed credit on any refill, not only once the bound is spent (`Pool.ts:409`). The per-size counts for a leased loss rest on this.
  - `start()` resolves only when no refill is running (`:402` runs before `:404-407`).
  - A watch that fulfils after its abort is ignored by `#lose`'s guards, not by an abort check (`:456` against `:458`).
  - `#refill` inserts the record and arms its watch even after `#ending` is set, and relies on `#recycle` to dispose it (`:441-442`, `:709-711`).
  - A failed validation strikes only a record that was never leased (`:591` calls `#strike`, which checks at `:488`).
- **Referred to the subjective lane.** `#race(promise, signal)` touches no instance state and duplicates `Browser.#raceAbort` (`Browser.ts:371-386`). See the leaf test in `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\architecture.md:184-188`.
- **NOT-EVIDENCED or UNRESOLVED:**
  - whether the pool working tree matches commit `9e316a1` (no git command was run);
  - the pool gate counts, which rest only on the writer's report (UNRESOLVED);
  - whether `Inspector.targetCrashed` arrives without `Inspector.enable`;
  - what each client does with an `initialize` error and at its startup timeout;
  - whether Chromium outlives the server's `TerminateProcess` on Windows.

## Attacked and held

- **Every row of the pool table** matches `Pool.ts` at `9e316a1` line for line, including `:82-120`, `:150-160`, `:352-380`, `:396-443`, `:448-492`, `:564-627`, `:649-675`, `:718-770`, and `:818-836`. The cited test lines `:322`, `:359`, and `:403` exist.
- **The ceiling.** Refills run one at a time (`:402`, `:410`). Disposing and retained records stay counted (`:754-758`). A stranded launch blocks every later launch.
- **The size 1 survivor ordering.** The pump in `#lose`'s catch runs while the destroy is still pending; the pump after `:767` then refuses with `cleanup`.
- **Launch counts traced:** the start-failure, per-size, and stranded cases (2, 2, and 1), V3 (stays at 3), F-5 with the grant first (3), F-5 with the refusals first (5), and the X-4 bound.
- **The V4 cases can fail.**
  - The double's emitter is never destroyed (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\setupServer.ts:1669-1672`), and the server passes no `release` to the toolset (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:2106`). So the `disconnect` count still tells the cases apart.
  - The late-page case can fail for the same reason.
- **A failed per-call ping racing a watch loss.** Disposal aborts the signal synchronously (`Pool.ts:730`) and removes the listeners. `#losses.has` and the pool's guard (`:469-475`) keep it to one loss.
- **The one-turn close.** An abort that pumps cannot launch, because `#refill` checks `#ending` (`:432`) and `#warm` checks `#closing`. A `#hold` after closing leaves its record to the barrier (`:249-251`).
- **Setup and the handshake.**
  - `#starting` is assigned before any request is dispatched, because requests arrive only on data events (`C:\Users\mikes\WebstormProjects\mcp\src\core\helpers.ts:1868-1883`).
  - A `BrowserError` mapped to `MCPError` reaches the client as `data` (`MCPLegacy.ts:150-158`), and an aborted request writes nothing (`helpers.ts:1888`, `:1895`).
  - `tools/list_changed` is sent only on modern subscriptions (`C:\Users\mikes\WebstormProjects\mcp\src\core\MCPServer.ts:1536-1546`), so nothing is sent before `initialize` is answered.
- **Port 9222.** Launches use port 0 (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\helpers.ts:363`).
- **Cause classification and the forced kill.** The `disconnect` cause follows `Browser.ts:396-398` and `:452-464`. `Browser.destroy()` waits for a pending exit to settle (`:843`, `:909-913`).
- **Pins.** Pool, mcp 0.0.36, and browser all pin contract `^0.0.19`, and emitter is `^0.0.11` in both pool and browser.
- **Rule letters.** The hook arrow is allowed (`architecture.md:175`), and every cited `AGENTS.md` line matches.

VERDICT: FAIL (1)