# Review of the C1 follow-up (browser `main` at `50e6017`, uncommitted, units `contexts-c1svc` and `contexts-c1svc2`), Opus 5.5 reviewer, 2026-10-05

Objective lane on correctness, concurrency, test sufficiency, and the honesty of the rewritten expectations. Terminal: **FAIL**.

- **Claims 1 and 2 (the downloads and capacity rewrite, and the filesystem-refusal fixture):** CONFIRMED.
  - The rulings made the old expectations obsolete; Q1 and Q4 put admission at 6 for size 3.
  - Each claim that remains true is kept, and the dropped claims are exactly those ruling 10 made false.
  - The C2 cases cover each replacement.
  - The `ENOENT` came from a warming browser whose profile folder exists before its record is written. Teardown across several browsers at contexts 2 stays pinned.
- **Claim 3 (the forced kill before the cleanup waits):** CONFIRMED. No race is introduced. The control removed the kill outright, and the `50e6017` baseline is the old-placement red case.
- **Claim 4 (the shutdown guard):** CONFIRMED during shutdown. See F1.
- **Claim 5 (`Target.closeTarget` before `#release()`):**
  - Release still completes, and every send after the target is gone is caught. Core: 1250 passed.
  - UNVERIFIED: two behaviors are unpinned (F2, F3a).
- **Claim 6 (no weakened assertion beyond the rewrites):** CONFIRMED. Every changed expectation is listed in the review.

Findings:
- **F1:** construction cleanup records a teardown fault when a browser is lost mid-build (`BrowserMCPServer.ts:951-954`). Shutdown then exits 1 with `BROWSER_SERVER_TEARDOWN` although nothing leaked.
- **F2:** with the new close order, a frame detach arriving during `Target.closeTarget` can make a closed page emit `detach`.
- **F3a:** with the reply arriving before the detach, `WebMCP.disable` can wait out its 30,000 ms default. Only the real-Chromium case covers that ordering.
- **F3b:** the server project never ran after the core change.

Repair unit `contexts-c1svc3` (browser `tmp/codex/contexts-c1svc3-brief.md`) carries all four. The Orchestrator runs the project gates after the probe unit finishes.
