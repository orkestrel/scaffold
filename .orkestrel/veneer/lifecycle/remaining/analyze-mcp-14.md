# analyze:mcp-14

```json
{
  "findings": "FACTS\nF1. The recorded failure (C:\\Users\\mikes\\WebstormProjects\\mcp\\tmp\\codex\\handshake-fix.jsonl:107) shows `expect(probe.selections).toHaveLength(2)` received 1 at tests/src/core/MCPServer.test.ts:5252. The error-code assertion at :5251 passed. The case and line numbers are identical at 4a83e55 and HEAD 50afe56. Run: 1 failed, 1528 passed, 44.09 s. The isolated rerun passed (jsonl:110).\nF2. This means round 2 got INVALID_PARAMS before the selector ran. In `#retry` (src/core/MCPServer.ts:1115-1196), the refusals before the selector are: a missing carrier (:1127), bad metadata (:1138), an unrecoverable state (:1146), an out-of-bound payload (:1153, :1160), the binding check (:1163-1169), a bad answer (:1181) and the principal check (:1189). For this input every one is fixed except the clock read `state.expiry <= Date.now()` at :1164. The ids 'expiry-1' and 'expiry-2' differ, the principal is always 'operator-1' (test :4547-4550), and the answer and schema are fixed (:4530, :5246). So by elimination, the refusal came from the entry expiry check.\nF3. The expiry is set at :1312 (`Date.now() + ttl`), with ttl 20 (test :5238). The window it races runs from :1312 in round 1 to :1164 in round 2. That window holds no test stall. It holds the seal await (:1347), the post-seal check (:1360), the response return, the test's `roundOf` (:4576), the round-2 dispatch, `await digestJSON` (MCPServer.ts:1011 → helpers.ts:451 `crypto.subtle.digest`), and `await continuation.open` (:1145).\nF4. The selector stall of 60 ms (test :4553) runs in round 1 before the expiry is set (:1026 comes before :1043/:1312). In round 2 it runs between :1164 and :1210. The post-selector half is therefore safe by about 40 ms. Only the entry half races.\nF5. The entry refusal (:1171-1175), the post-selector refusal (:1211-1215) and the reseal refusals (:1306-1310, :1360-1367) all return the same text, 'request state could not be verified for this retry'. The response alone cannot say which check refused.\nF6. Each case builds a fresh server, port and recorders (test :4525-4563). The port keeps its state in instance fields (:125-129). `MCPServer.ts` contains no setTimeout, setImmediate or queueMicrotask.\nF7. Rules: tests.md:28 says timers must separate the asserted orderings on a loaded host. tests.md:300 says never replace the host clock. tests.md:318 says to treat a hard-coded clock as a missing injection point. tests.md:40 says to measure intervals with performance.now.\n\nCAUSES, RANKED (opinion)\n1. Best fit: the gap from issue to the retry's entry check went past the 20 ms ttl under full-suite load. OS preemption across the 35 parallel files, a GC pause, or a delay in the worker thread pool behind `crypto.subtle.digest` can each stretch the gap; that `subtle.digest` runs on the libuv thread pool and returns through an event-loop turn is Node behavior I did not verify in this checkout. This cause matches every fact: the right error code, selections at 1, a pass when run alone.\n2. A forward step of the wall clock of 20 ms or more during the gap. `Date.now` is not monotonic, and this gives the same symptom. It is rare.\n3. A clock read before an await: the expiry is set before the seal await, by design. This only matters through cause 1, and the code is not a defect: an absolute wall-clock expiry is right for a payload that crosses processes.\n4. Shared state across cases is ruled out by F6. Selector timer lateness only adds margin (F4), so it is ruled out too.\n\nThere is no product defect. The case pins a race between a fixed ttl and a gap that has no upper bound. With a real clock, no fixture can guarantee that the state is still live at the entry check. Only a clock the test controls can.",
  "proposals": [
    {
      "id": "P1",
      "target": "tests/src/core/MCPServer.test.ts:124-163 (MemoryContinuation) and :5251-5252",
      "classification": "diagnostic (recorder, no behavior change)",
      "change": "Make the port's `open` record the time it was called (`Date.now()` and `performance.now()`), and make `seal` record the same. In the case, read `one = sealedState(probe, 0)` and pass a message to the selections assertion: expect(probe.selections, `entry margin ${one.expiry - openedAt} ms; wall-vs-monotonic skew ${...}`).toHaveLength(2). A margin of 0 or less names cause 1. A positive margin with selections at 1 rules out cause 1. Skew above 1 ms between the two clocks names cause 2.",
      "proof": "Red first: in a scratch copy, add `await waitForDelay(30)` between `roundOf(first)` and the second dispatch (a deliberate breaking edit). The failure must print selections 1 and a negative margin. Green: remove the edit; the case passes with a positive margin."
    },
    {
      "id": "P2",
      "target": "tests/src/core/MCPServer.test.ts:5237-5254, :4551-4553",
      "classification": "fix of the post-selector half (derive the wait, not a constant)",
      "change": "Replace the fixed `stall: 60` with a round-2 selector that waits until the expiry it can read from `probe.continuation.sealed[0]` has passed (`one.expiry - Date.now() + 1`). The lapse is then set by the state itself, and the claim no longer depends on ttl. On its own this does not close cause 1.",
      "proof": "After P1, the margin message plus 0 failures under the instrument in P4."
    },
    {
      "id": "P3",
      "target": "src/core/types.ts:788-791 (MCPInputOptions), MCPServer.ts:1164/1210/1305/1312/1360",
      "classification": "design decision for the user (medium: public contract)",
      "change": "The only deterministic fix for cause 1 is a clock seam, for example an input `clock` read at the five `Date.now()` sites. tests.md:318 favors this seam. AGENTS.md (no fake clocks) and tests.md:300 forbid a test that drives it. I recommend against this until the user rules on the conflict. Without the seam, keep P2 and size ttl from the contended gap distribution that P4 measures, with that reasoning stated in a comment.",
      "proof": "With the seam: a clock that advances only inside the selector makes :5252 green under the CPU burn on every repetition, and a breaking stage that removes the :1210 check turns it red."
    },
    {
      "id": "P4",
      "target": "instrument: tmp/ TypeScript launcher",
      "classification": "reproduction instrument and control",
      "change": "A Node TypeScript script starts more busy-loop worker threads than the machine has logical cores. It then runs `npx vitest run --config vite.config.ts --project src:core tests/src/core/MCPServer.test.ts -t 'rechecks expiry after the selector'` a fixed number of times and records each P1 margin and exit code. Control: the same loop with no burn. The second reproduction is the natural load of `npm run test:src` itself.",
      "proof": "Expected: failures with negative margins under the burn, 0 without. A burn run with no failure does not clear the case; it reports the smallest margin observed."
    },
    {
      "id": "P5",
      "target": "tests/src/core/MCPServer.test.ts:5259-5276 and :5297-5315",
      "classification": "weak pin (false green, same race)",
      "change": "With ttl 25, a gap over 25 ms makes the entry check at :1164 refuse with the same wording (F5). These cases then pass without ever reaching the reseal recheck. Add `expect(probe.continuation.sealed).toHaveLength(2)` to pin that the second seal ran. This shares P3's dependency.",
      "proof": "Breaking edit: delete :1305-1311 and :1360's `previous` arm. Today the cases can stay green when the gap passes 25 ms. With the added pin they must go red."
    }
  ],
  "risks": "These parts are opinion: that `crypto.subtle.digest` runs on the libuv thread pool with an event-loop hop, and the ranking of the causes. The failure log shows only selections=1, so I proved the entry-check cause by elimination, not by observing it. P2 without P3 still leaves cause 1 possible, made rarer by a ttl sized from measurement. Under the item's 'never the budget' rule, that sizing needs the user's ruling. P3 is a public contract change and conflicts with the no-fake-clock law. P5's added pin would flake for the same reason until P3 or a sized ttl lands. Nothing was edited or run except read-only git and grep."
}
```
