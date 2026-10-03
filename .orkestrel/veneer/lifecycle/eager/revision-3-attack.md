**Lane: objective.** I checked correctness under adverse orderings, what the contracts and installed declarations permit, the pins, the letter of the rules, and whether each proof can fail for its defect.

## Findings

1. **REQUIRED: the U1 HTTP session mint breaks every client that accepts SSE.** Design § `@orkestrel/mcp` 0.0.36 "HTTP sessions (A-12)" and U1 case h.
   - **What is wrong.** The design says the middleware "mints only when the `initialize` body, read from `response.clone()`, is a JSON-RPC result". `createMCPPostHandler` defaults `streaming` to true (`C:\Users\mikes\WebstormProjects\mcp\src\server\handlers.ts:74`). For a 200 answer to a request whose Accept header lists `text/event-stream`, it writes the JSON-RPC response as one SSE `data:` frame (`handlers.ts:209-214`, `C:\Users\mikes\WebstormProjects\mcp\src\server\helpers.ts:96-100`). A legacy `initialize` always answers 200 (`C:\Users\mikes\WebstormProjects\mcp\src\server\inferers.ts:298-300`).
   - **Breaking input.** A client posts `initialize` with `Accept: application/json, text/event-stream` and no hook is set. The body is `data: {...}`, so reading it as JSON finds no result. Nothing is minted at `C:\Users\mikes\WebstormProjects\mcp\src\server\middlewares.ts:215-222`, and the client's next request is refused as an unknown session (`middlewares.ts:191`). This contradicts "without a hook, every byte of every answer is identical to 0.0.35" and breaks D9.
   - **What right looks like.** Decide the mint from the dispatch outcome, not from how the body is framed. For example, the post handler records the `initialize` outcome in `context.state` beside `session` (`middlewares.ts:194`). Add twins of case h with an SSE-accepting client, one with a hook and one without. They fail under the body-as-JSON reading.

2. **REQUIRED: the V4 acceptance is not met on the `clear()` and validation paths.** Design § "V1 to V5" (V4 row) and U8 "Watch signal".
   - **What is wrong.** The ruling accepts V4 by "checking the abort on each of the three disposal paths" (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\resource\ruling.md:129-131`). U8 loses the records on the `clear()` path and the validation path with `kill()`. A kill settles the watch, and a settled watch removes its own listeners (behavior 4). So on those two paths the counts reach 0 without any abort.
   - **Mutation that survives.** Abort the watches only in the server's `destroy()` instead of in `#destroySlot` step 1. All three U8 paths still pass, while a record lost by a ping and drained by `clear()` keeps its listeners until shutdown.
   - **What right looks like.** On those two paths, lose the record through a ping so its watch is still armed when disposal begins:
     - for the `clear()` path, use a `silent` spare whose hand-out ping times out;
     - for the validation path, use a lease whose per-call ping a `version` handler rejects after the snapshot, under double 1's `defer()`.

     Assert the three listener counts there.

3. **REQUIRED: the U8 "Unmirror at loss (R3-10)" case cannot fail.** The design claims it "fails without `#unmirror` in `#lose`", and that is false.
   - **Why.** Without the step, the lost toolset's teardown withdraws its tool (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:2098`). The server's `#withdraw` then reads `#mirrored` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\BrowserMCPServer.ts:272-277`).
     - Before the next grant, `#mirrored` is still the lost manager. The read finds nothing, and the server removes a dispatcher that `#lose` already removed.
     - After the next grant, the read finds the next lease's tool of the same name and calls `#mirror`. `ToolManager.add` replaces by name (`C:\Users\mikes\WebstormProjects\browser-wt-browse\node_modules\@orkestrel\tool\dist\src\core\index.js:215-224`).
     - Either way the dispatcher exists at the end, so the assertion passes with or without the step.
   - **What right looks like.** Drop the "fails without" claim from U8 and from the R3-10 row. Record `#unmirror` in `#lose` as listener hygiene that no case observes.

4. **ADVISORY: one call can drive unbounded launches.** Design § behaviors 3 and 6, "Repeated leased losses are paced by calls".
   - **Interleaving.** Within one call, `#serve` pings the lease. A rejection calls `#lose`, which adds to `#owed` and counts no strike. `#grant` hands out the successor after its hand-out ping succeeds, and `#serve` repeats on the same call. A successor that answers the hand-out ping and then fails the per-call ping right after it costs one launch per iteration, with no strike and no bound inside that call.
   - **What right looks like.** After a second leased loss inside one `#serve`, answer the call with the note and a refusal instead of looping. Then correct the "paced by calls" sentence.

5. **ADVISORY: `#mirrored` duplicates `#lease`.**
   - **What is wrong.** After this change, `#mirrored` always equals `#lease?.value.toolset.tools`. Today it exists only because `#session` is a promise (`BrowserMCPServer.ts:84-85`, `:244-248`). A stored copy that can drift breaks `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md:58`.
   - **What right looks like.** Derive it from `#lease`, and have `#lose` run `#unmirror` before it clears `#lease`.

6. **ADVISORY: two `log` writes sit outside any catch.**
   - **What is wrong.** R3-7 contains a throwing `log.write` in `#fill` only.
     - `#end`'s rejection handler writes the TEARDOWN line; a throw there becomes an unhandled rejection.
     - The sweep writes its SWEEP line inside its own catch; a throw there rejects the detached `#sweeping` before `destroy()` awaits it, which contradicts "the sweep never rejects".
     - A `browse.json` read that fails with anything but ENOENT is unclassified. Treating it as "no record" deletes a live orphan's folder.
   - **What right looks like.** Route every `log` write through one private method that catches into `#faults`. Have the sweep keep a folder whose record read fails with anything but ENOENT.

7. **ADVISORY: the watch promise has no rejection path.**
   - **What is wrong.** `void this.#watch(slot, signal).then(this.#lose.bind(this, slot))` has no rejection handler. A throw inside `#watch` becomes an unhandled rejection.
   - **What right looks like.** State that `#watch` never rejects and enforce it, or attach a rejection handler that adds the error to `#faults`.

8. **ADVISORY: the U7 "Unreadable `.profiles`" case (R3-12) never reaches the SWEEP branch.**
   - **What is wrong.** Node's `recursive` option tolerates an existing directory, not a regular file. So `mkdir(ROOT/.profiles)` rejects, the case reduces to row 2a, and the "when it does not reject" branch never runs. The sweep's read-failure path has no case that can fail.
   - **What right looks like.** On POSIX when not running as root, make `.profiles` a directory with mode `0o300`. `mkdir` accepts it, `readdir` fails with EACCES, and `#warm` can still create entries. Probe the result at runtime (`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md:38`). Mark the branch NOT-EVIDENCED on hosts where no such fixture exists.

9. **ADVISORY: the U7 "One teardown line" case cannot fail as built.**
   - **What is wrong.** Because of the R3-9 deferral, the destroy body removes the SIGTERM listener one microtask after `#end` runs. A SIGTERM emitted after the input's `end` event has been handled reaches no browse listener. The case then passes even with `#end`'s closing guard removed.
   - **What right looks like.** Emit SIGTERM from an `end` listener registered after the server's, so it lands in the same turn.

10. **ADVISORY: the U7 service "Killed server" case has no control.**
    - **What is wrong.** Nothing shows that the orphan outlived its killed parent. Where Chromium exits with its parent (Windows is unmeasured, M6), `waitForProcessExit` resolves without the sweep, and the case passes with the sweep's close removed.
    - **What right looks like.** Assert `probeProcess(pid)` is true after the child is killed and before the second `start()`.

11. **ADVISORY: the U8 "Silent spare" case passes without the pid guard.**
    - **What is wrong.** Without the guard, `process.kill(undefined, 'SIGKILL')` throws a TypeError, step 2 adds it to `#faults`, and teardown continues. The double is still destroyed, so the case passes.
    - **What right looks like.** Also assert that the server's `destroy()` resolves.

12. **ADVISORY: U7 "Unusable root … naming `ENOTDIR`" depends on the host.**
    - **What is wrong.** The error code `mkdir` reports under a regular file varies by host (`tests.md:38`).
    - **What right looks like.** Probe the code on the host first and assert that one.

## Referred outside this lane

- **Subjective lane or the user: D12's "so moving them into `@orkestrel/pool` is a move".**
  - The hand-out path (`#promote`, `#spares`, `#change`) and the owner-acquire loop map to none of D12's five members.
  - Item 15 deletes them and moves the session's hand-out onto `pool.acquire()` with `validate` as the ping, which is a rewrite rather than a move.
- **Subjective lane: `formatBrowserServerLoss`.** The package names text builders `render*`, for example `renderBrowserJourneyFault` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:2821`); see `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md:103-104`.
- **Subjective lane: naming of the bound.** `restarts` and `BROWSER_SERVER_RESTARTS` sit beside the design's own refusal of `restart` (`names.md:224`, `:234`).
- **Subjective lane: the watch's listener map.** The design uses an inline type, while the package's own precedent is a named type in `types.ts`, `BrowserToolsetWatch` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\types.ts:3031-3037`).
- **Orchestrator: a concurrent writer.** The item 12 writer edits this worktree. U2 and U4 write `guides\browser.md` before U5's merge of main, and that merge runs into a working tree another writer has changed.

## NOT-EVIDENCED

- The MCP 2025-11-25 Streamable HTTP session text that U1 cites. This lane cannot fetch it either.
- Whether a renderer `crash` arrives without `Inspector.enable` (A-17).
- Whether a client closes stdin when its startup timeout passes.

## Attacked and held

- **The ceiling.** Every ordering I tried holds:
  - records plus reservations stay at or below `max` (`C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:272`);
  - at issue time, capacity covers all `n` owner waiters, so no waiter is left unassigned;
  - a cleanup failure on the validation path rejects the waiter without a create (`:391-402`);
  - survivors are subtracted from `k`.
- **`k` is exact without a pending count.** Each `#receive` reaction runs before `allSettled` resolves.
- **The idle drain terminates.** `#dispose` removes a snapshot record from `#available` whatever the hook does (`:492-493`).
- **Counts.** I traced each of these and they hold: R3-3 (a) in both orders, R3-3 (b), the restated V5, A-6, R2-3, V2 pinned, the per-size table, the idle drain, the create in flight when the bound is spent, and the validation-path ordering.
- **Wake-ups.** `#promote` cannot miss one: its checks and the read of `#change.promise` happen in one synchronous turn.
- **Closing.** A one-turn `start()`/`destroy()` holds, and `pool.destroy()` disposes leased records too (`:184-186`).
- **R3-1 ordering.**
  - `CDPClient` subscribes to the transport's `close` at connect, before `Browser` binds its handler, so it sets `#connected` false and rejects pending requests first (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\CDPClient.ts:202`, `:288-297`).
  - `Browser` stays `connected` through its 50 ms defer (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\Browser.ts:441`), so the post-failure ping's `send` rejects at once (`CDPClient.ts:118-120`).
- **The forced kill.** The pid is cleared on an observed exit (`Browser.ts:398`).
- **The re-pin ruling.** `isInstance`, `isError`, and the error brand are identical in contract 0.0.18 and 0.0.19 (`index.js:12`, `:933-936`, `:981-983` in both copies). The installed pool 0.0.13 build matches the source the design read (`C:\Users\mikes\WebstormProjects\worker\node_modules\@orkestrel\pool\dist\src\core\index.js:226-235`, `:563`).
- **MCP over stdio.** Messages are dispatched without awaiting the previous one (`C:\Users\mikes\WebstormProjects\mcp\src\server\factories.ts:115-118`), so a `ping` answers while `initialize` waits. The only implementers of `MCPServerInterface` are `MCPServer` and the A-10 test stub.
- **A missing executable fails fast.** The spawn error rejects `once(process, 'exit')`, so the launch does not wait for its deadline (`Browser.ts:735-751`).
- **The watch's view identity.** `toolset.view` is the context's page object (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\factories.ts:155-160`), and the toolset subscribes to neither the context's `page` event nor any page's `crash`.
- **The hook arrow.** `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\architecture.md:175` admits it.

VERDICT: FAIL (1, 2, 3)