# Attack on the first contexts synthesis — Opus 5.5 reviewer, 2026-10-05

Objective lane plus reconciliation fidelity, against pool 0.0.15 and browser `main`. Terminal: **FAIL**. The revised `contexts-synthesis.md` carries every repair.

- Ruling 1's loop under the planner's shape: CONFIRMED (`Pool.ts:478`, `:489-492`, `:410-411`, `:678`): a browser held by browse for the server's life relaunches with no caller.
- Ruling 1's claim that `capacity` bounds it: REFUTED. The same loop exists in 0.0.24, paced by calls: a leased loss never strikes and the next call's grant resets the budget (`BrowserMCPServer.ts:652-653`); 0.0.24 counts an active renderer crash as a browser loss (`:739-743`), so a page that crashes its renderer relaunches the browser per call. `capacity` removes only the caller-free variant, and only if no lease is held without a holder. Owed: the call-paced loop as a recorded limit or a user question on the grant rule; a P1 case for a holderless lease reopening the budget; one lease's `destroy()` disposing co-holders' record; validation on a shared record; `idle` and `active` under sharing.
- Ruling 2 (prepared context): CONFIRMED for D4; owed: no lease before assignment, and D4 covers the first context at size 1.
- Ruling 3 (uncertain disposal): UNVERIFIED and incomplete. `close()` rejects on a failed page close even after disposal (`BrowserContext.ts:371-383`); no seam distinguishes the outcomes (the analyst's context-ownership unit was dropped); a retirement through a live lease never strikes; "isolation hazard" overclaims; the failed-folder capacity rule was dropped.
- Ruling 4 (single-flight recovery): CONFIRMED; inherits the call-paced loop.
- Ruling 5 (folder per generation): CONFIRMED; the folder sits under the per-launch profile (`:787`), not a process folder.
- Ruling 6 (visibility measured): CONFIRMED; owed: a unit for any remedy M1 demands.
- Q1: REFUTED as fairly put: it bundled per-browser against total with whether the shared holder counts; option (a) hid that displaced holders wait for the refill when survivors are full; "without a second meaning" was false; (a)'s strongest argument, `contexts=1` reproducing 0.0.24 exactly, was missing.
- Dropped: the clean-slate definition, a pingable browser that fails context creation, the hung-renderer limit; C1 lacked the `Browser.ts` and `BrowserContext.ts` seam, per-holder last URLs, environment validation, teardown during construction, and red-without-mechanism; the idle-loss change reaches `@orkestrel/worker` at its re-pin.
