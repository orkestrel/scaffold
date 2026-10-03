**Lane: objective.** I checked correctness under adverse orderings, what the code and contracts allow, dependency facts, whether each proof can fail, and the letter of the rules. Subjective calls are referred at the end.

## Findings

1. **REQUIRED: calling `start()` after `destroy()` leaks listeners and profile folders.**
   - Where: § U6 Spec makes `start()` equal to `#starting ??= #setup()`, and setup step 1 attaches listeners. That drops today's refusal at `C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\BrowserMCPServer.ts:132`.
   - Sequence: `destroy()` runs first and finds no setup to wait for. Then `start()` attaches the input `end`, `SIGINT`, and `SIGTERM` listeners. The transport does not restart (`C:\Users\mikes\WebstormProjects\mcp\src\server\transports\StdioServerTransport.ts:87`). `#warm` still creates the `PID-UUID` folders. The aborted builds reject, `#fault` returns early because the server is closing, and nothing releases them.
   - Effect: three listeners and `size` profile folders stay behind. The `SIGINT` listener turns off Node's default exit, and `#end` only gets back the already-settled `#closing`, so Ctrl-C no longer ends the process.
   - Fix: `start()` rejects with `#ended()` once destroy has begun. U6 adds a destroy-then-start case that checks listener counts and the `.profiles` listing are back to baseline.

2. **REQUIRED: setup failures that are not browser errors escape the coded refusal, and the bin crashes before answering.**
   - Where: § U6 setup step 3 creates `ROOT/.profiles` and step 5 awaits the sweep. The handshake maps only a `BrowserError`.
   - Input: `BROWSE_ROOT` sits under a regular file (ENOTDIR) or is unwritable, or the sweep's directory read fails. Setup then rejects with a plain `Error`.
   - Effect: `initialize` gets the detail-free `-32603`. Also, `C:\Users\mikes\WebstormProjects\browser-wt-browse\src\bin\main.ts:31` rethrows any non-`BrowserError` from top-level await, so Node exits at once. That can happen before the answer is written, which is the "exit before answering" outcome Q1 rejects.
   - Fix: setup converts every rejection that is not a close into a `BrowserError` with code `BROWSER_SERVER_UNAVAILABLE` and the cause. The sweep never rejects; it keeps each entry's failure. Add a `src:server` case with the root under a file that expects `-32000`, `data.code`, and a `start()` rejection carrying that code.

3. **REQUIRED: the handshake waits for the sweep.**
   - Where: setup step 5 awaits the sweep, and the handshake awaits setup. This contradicts Q1, which says `initialize` waits only for the first lease.
   - Input: a leftover browser that hangs, which is a likely reason its server was killed. The attach waits for the connect deadline (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\server\Browser.ts:565-571`, 30000 ms by default). Even a healthy leftover browser re-attaches each of its pages (`Browser.ts:798-838`) before it closes.
   - Effect: all of this runs before `initialize` answers, against Codex's 10 s default.
   - Fix: setup settles on the first lease or on full retirement. The sweep's promise is kept separately and awaited by `#destroy`. Each attach gets a bounded timeout. M2 measures onset with a leftover browser present.

4. **REQUIRED: the sweep checks once, right after `close()`, whether the leftover browser has exited, and that check races the exit.**
   - Where: § State machine, sweep steps 2–3.
   - Cause: for an attached browser, `close()` sends `Browser.close` and does not wait for any process, because `#process` is undefined (`Browser.ts:874-906`, `921-949`). Chromium is still shutting down when `probeProcess(record.pid)` runs. On POSIX the orphan also stays a zombie until init reaps it, and `kill(pid, 0)` succeeds on a zombie.
   - Effect: the folder is usually kept until a later start. D8's "leaves nothing behind" fails for that start, and U6's service case ("removes the directory", "that pid at ESRCH") fails or flakes.
   - Fix: confirm the exit within a bound before removing the folder, for example with the library's bounded drain (`Browser.ts:1095-1111`) moved into a helper, or re-check kept folders in `#destroy`. U6 then asserts whichever outcome is chosen. Add a Risks row: a hung leftover browser whose attach fails is never reclaimed.

5. **REQUIRED: failure-table row 14 says the caller sees nothing, but a stored release failure becomes an unhandled rejection at exit.**
   - Where: `#release` failures go to `#faults`, and `destroy()` rejects with an `AggregateError`. Input end and the signals reach it through `#end`, which is `void this.destroy()` (`BrowserMCPServer.ts:181-183`).
   - Effect: a profile folder that Windows keeps locked past the retries turns a clean exit into an unhandled rejection. Node prints a stack and exits 1, so U8's "exit 0" fails.
   - Fix: `#end` handles the rejection, writes one stderr line, and sets `process.exitCode = 1`. Rows 13 and 14 state that outcome. A `survivors: 1` case ends the input and asserts the run reports no unhandled rejection.

6. **REQUIRED: U7's spare-kill count contradicts the state machine.**
   - Where: § U7 Accept expects "exactly two failed relaunches".
   - Per the state machine, killing the idle spare is strike 1. The one relaunch fails as strike 2, and the slot retires. That is one failed relaunch, not two.
   - Fix: assert one relaunch for the spare kill. The lease-kill branch does record two, because a leased fault does not strike. Either the test or the strike rule must change before U7.

7. **REQUIRED: the silent-ping test cannot finish in time.**
   - Where: the double's `ping` honors only the call's own `timeout`, and the server pings with none.
   - Cause: the double's fixture client uses the 30000 ms default (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\setup.ts:1515-1519`). The `src:server` project sets no `testTimeout` in `C:\Users\mikes\WebstormProjects\browser-wt-browse\vite.config.ts`, so Vitest's 5 s default applies.
   - Effect: the `silent: 1` case times out before the hand-out ping rejects.
   - Fix: the double uses `options.timeout ?? this.options.timeout`, as `Browser` does (`Browser.ts:509-511`). Add `BrowserLauncherOptions.timeout`, which the launcher writes into each double's options.

8. **REQUIRED: the stale-reference test cannot fail for the bug it targets.**
   - Where: § U7 Accept.
   - Cause: after recovery the page is at `about:blank`, where no `eN` exists even with per-context counters (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserContext.ts:71`, `348-350`). Removing the shared `reference` allocator leaves the test green.
   - Fix: after recovery, `navigate` to the same fixture and `look`, then `click` the `eN` from before the kill. Assert the refusal and a counter of 0. The control run without `reference` must increment the counter.

9. **REQUIRED: U3's spec reads the wrong options object.**
   - Where: § U3 says lines 293 and 332 pass `options?.reference`.
   - Cause: at `BrowserContext.ts:283-295`, `options` is `#attach`'s `BrowserPageOptions`. `#reattach` (`309-334`) has no options. The constructor reads `BrowserContextOptions` only for `on` and `error` (`80-91`) and keeps nothing.
   - Effect: a builder following the spec literally adds `reference` to `BrowserPageOptions` or fails the typecheck.
   - Fix: the constructor stores the option in a private field, choosing a name that does not clash with the counter `#reference` at `:71`. Both `#attach` and `#reattach` pass that field or the bound counter.

10. **REQUIRED: U1 breaks a typed test stub it does not own.** Adding a required `MCPServerInterface.handshake` fails `npm run check` at `C:\Users\mikes\WebstormProjects\mcp\tests\src\core\helpers.test.ts:1464-1481`, an object literal typed as that interface. Fix: add that file to U1's owned files, or make the member optional, and add `npm run check` to U1's run list.

11. **REQUIRED: U5's acceptance check cannot pass.** The dev dependency `@orkestrel/probe` pins `@orkestrel/mcp ^0.0.33` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\node_modules\@orkestrel\probe\package.json:98`). It installs a nested copy at `...\node_modules\@orkestrel\probe\node_modules\@orkestrel\mcp`, so `npm ls` shows two copies. Fix: accept on `npm ls @orkestrel/mcp --omit=dev` showing one copy at 0.0.36.

12. **REQUIRED: with the hook, a refused `initialize` over HTTP creates a session.**
    - Cause: the hook reaches the HTTP routes through `createMCPLegacy`. Legacy errors answer HTTP 200 (`C:\Users\mikes\WebstormProjects\mcp\src\server\inferers.ts:298-300`). The session middleware stores a new session and sets `Mcp-Session-Id` whenever the response is OK (`C:\Users\mikes\WebstormProjects\mcp\src\server\middlewares.ts:177-189`, `215-230`).
    - Effect: every refused handshake leaves a live session until it expires. The design's conformance argument covers stdio only, and clients.md records no HTTP transport text.
    - Fix: U1 owns `middlewares.ts` and creates a session only when the `initialize` answer is a result, with a test. Cite the HTTP session text, as D9 requires.

13. **REQUIRED: the gate on `server/discover` cites no specification text (D9).** `server/discover` belongs to the 2026-07-28 revision (`C:\Users\mikes\WebstormProjects\scaffold\guides\mcp.md:2001`), and clients.md records nothing for that revision. Fix: cite the 2026-07-28 text that permits a `-32000` answer there. Otherwise drop that gate, since `#forward` already gates modern `tools/call`, and state how D4's onset reaches modern clients.

14. **REQUIRED: the planned edit to the `JSONRPC_SERVER_ERROR` remark states a false rule.** It says "a consumer MCPError keeps its own code on either branch". A consumer method or execution handler that throws an `MCPError` is still answered `-32603` (`C:\Users\mikes\WebstormProjects\mcp\src\core\MCPServer.ts:316-317`, `1775-1777`). Fix: limit the sentence to the handshake hook.

15. **REQUIRED: the loss text for an in-flight call relies on one shared note that another call can consume.**
    - Where: U7 keeps a single `#lost: string | undefined`.
    - Sequence: call X (a `wait`) runs on lease A. A exits, and `#fault` sets `#lost`. Call Y leases B, returns a string, prefixes the note, and clears it. X then ends with the toolset's "ended" text (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:2081`) and never carries `BROWSER_SERVER_CRASH`, so row 6 fails.
    - Fix: keep a loss text for each lost browser, read by the calls that ran on it. Use the shared note only for the next-call prefix. Add a case with two concurrent calls across a fault, triggered by emitting `disconnect` on a double's emitter.

16. **REQUIRED: U2 binds a fixed port.** The service case binds a fixture on 127.0.0.1:9222, and `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md:33` forbids fixed ports. Fix: prove the port probe with `cdp.port` set to a free port the fixture picks. Prove the no-port branch without binding 9222, or under an exception the Orchestrator records.

17. **ADVISORY: renderer-crash detection is NOT-EVIDENCED.** Nothing in `src` sends `Inspector.enable`, yet the page subscribes to `Inspector.targetCrashed` (`C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserPage.ts:368`). Row 8 depends on that event arriving. U7's `Page.crash` case decides it. If it fails, the enable belongs in `#enableSession` (`BrowserContext.ts:494-497`).

18. **ADVISORY: "keeps answering every request with that refusal" is false.** After a failed setup, `ping` answers `{}` (`C:\Users\mikes\WebstormProjects\mcp\src\core\MCPLegacy.ts:151-152`), `tools/list` returns the vocabulary, and `tools/call` returns an `isError` result rather than a refusal. State the behavior per method.

19. **ADVISORY: the code token prints twice.** `main.ts:32` prints `browse: ${code}: ${message}`. If the message itself starts with the code token for the tool text, stderr shows the token twice. Keep only the cause in the message, and add the `CODE: ` prefix in `#forward` and in the handshake.

20. **ADVISORY: the record write needs a rule.** The double's `pid` is undefined (`C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\setupServer.ts:1568-1570`), and U2 makes its `endpoint` undefined. Write the record only when both are defined. Write it to a temporary name and rename it, so a kill mid-write leaves no partial record. Otherwise the sweep would treat the folder as having no record and remove it while the orphan still runs.

21. **ADVISORY: `#releasing` cannot show which browser is releasing.** A `Set<Promise<void>>` cannot derive the per-browser "releasing" state the state machine names. Key it by browser.

22. **ADVISORY: a half-built toolset is never released.** Release step 3 only reaches a toolset whose build succeeded. A toolset whose `start()` rejected is lost along with the rejection. Store the toolset in the slot as soon as it is created.

23. **ADVISORY: the note-plus-unavailable case is unspecified.** U7 expects "the note followed by `BROWSER_SERVER_UNAVAILABLE`", but the U7 spec only prefixes the note to string results. State that a refusal carries the pending note and clears it.

24. **ADVISORY: the `SIGSTOP` case needs a named starting point.** "Within one command deadline of the fault" is ambiguous: measured from the `SIGSTOP`, the relaunch comes after the ping deadline plus the kill and destroy. Measure from the ping's rejection.

25. **ADVISORY: the `endpoint` doc omits some clears.** The TSDoc misses the clears at `Browser.ts:350` (detaching an attachment), `589` (failed attach), and `672` (failed launch).

26. **ADVISORY: release should remove the server's own listeners.** `#release` relies on `Browser` destroying its emitter (`Browser.ts:1157`) to drop the server's `disconnect`, page, and crash listeners. The double never destroys its emitter (`setupServer.ts:1650-1653`). Remove those listeners explicitly in `#release`.

27. **ADVISORY: the sweep lacks a negative case.** Add a `src:server` case where the record's pid is a running child and its endpoint refuses: the folder must be kept. The control, with the re-check removed, must delete it.

28. **ADVISORY: U1 case (f) should also require that nothing is emitted.** A hook rejection after the request was aborted must emit no `error` event. `bindServer` treats cancellation as no fault (`C:\Users\mikes\WebstormProjects\mcp\src\core\helpers.ts:1892-1901`).

29. **ADVISORY: row 19 is NOT-EVIDENCED.** Its claim that a client closes the input when its startup timeout passes has no source in clients.md. U11 can check it.

30. **ADVISORY: the forced-kill explanation is wrong, but the outcome holds.** `destroy()` is called right after the `SIGKILL`, so the exit handler returns early at `Browser.ts:389` and destroy's own path does the cleanup.

31. **ADVISORY: the panel scores and the judges' graft attributions are UNRESOLVED.** No judge verdict is on disk under the eager folder; the only evidence is the writer's report.

## Referred to the subjective lane or the user

- Decision 3: what the onset waits for.
- D6: whether balancing means failover only.
- D7: whether "at all times" requires watching an idle spare. The decision table already claims D7 is met while Decision 2 is still open.
- Strikes from an idle spare dying twice, possibly hours apart.
- D8: whether the sweep counts as a second teardown place.

## Attacked and held

- **Pool ruling.** `Pool.ts:272-276` creates on demand under its ceiling. `#clean` frees capacity even when destroy fails (`518-520`). `pool.md:7` confirms there is no warm floor.
- **`ping` during a parked `initialize`.** The transport calls its listener without awaiting it (`C:\Users\mikes\WebstormProjects\mcp\src\server\factories.ts:115-118`).
- **Input ending during setup.** Input close aborts live requests (`helpers.ts:1908-1912`), aborted answers are dropped (`1888`), and the launch honors the external signal (`Browser.ts:364-386`, `728-730`).
- **Overlapping crash events and a crash during teardown.** The `#slots` and abort guards hold, an exit after destroy is ignored (`Browser.ts:389`), and a socket loss defers to the process exit (`430-432`, `447-449`).
- **Pool ceiling and retries.** Removing the "successor only after release" rule fails U7's connect-after-destroy assertion. Unbounded retries fail U6's "2 × size" launch count. An ungated `initialize` fails U1 cases (a) and (g).
- **Port 9222 fix.** The branch is at `Browser.ts:320-322`, and the spawn binds port 0 (`helpers.ts:363`).
- **Names.**
  - `endpoint`, `ping`, `reference`, `handshake`, and `pool.size` are each one word.
  - The `parse*` and `{Entity}Handler` forms match `names.md`.
  - No other guide claims these names.
  - `parseInteger` exists in the installed contract package.
- **Exclusions and release order.** The supervisor exclusion is respected. The 2025-11-25 lifecycle allows pings before the `initialize` answer and allows an error answer, which holds for stdio. A caret range on 0.0.x pins the patch, so publishing mcp before the browser re-pins is correct.

VERDICT: FAIL — REQUIRED 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16