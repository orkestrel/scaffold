# J-RELEASE-RECORD round 2 — audit claims for obligation 3 (2026-09-25)

**Subject.** Veneer `d3a3969` on `unit/release-record` over `a1041bd`. Read files at `d3a3969` with `git -C C:/Users/mikes/WebstormProjects/veneer show d3a3969:<path>`.

**Why this check runs.**
- Round 1's verdict (`units/j-release-record-audit-verdict.md`) gave the unit three obligations.
- Obligations 1 and 2 adopt the lanes' prescriptions verbatim, so the Orchestrator's mutation replay closes them.
- Obligation 3 adds door cases no lane prescribed case by case. It also removed one Carousel door as unreachable, a code change no lane prescribed. So one objective check runs on those alone.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The verdict `j-release-record-audit-verdict.md` and the brief `j-release-record-brief-2.md`.
- The report `j-release-record-report-2.md`, the diff `j-release-record-2.diff`, and the status `j-release-record-2-status.txt`.
- The door instrument `j-release-record-2-r2-doors.sh`: it deletes each door's lines and prints them.
- The door logs `j-release-record-2-r2-door-*.log.txt`.
- The Orchestrator's replay `j-release-record-replay-2.log.txt` (instrument `../tools/replay-release-record-2.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md`.
- `../decisions.md` § E24 and § E35.

## Claims

1. **Each door case binds its door.** For each of these pairs:
   - Collapse's host and `shown` tokens, in show and in hide;
   - Toast's `shown` and transition tokens, in show and in hide;
   - Tab's previous-pane `active` and `shown`;
   - Carousel's incoming direction and order;
   - Carousel's outgoing active and order.

   A case has a reaction to the pair's first write destroy the engine. It then asserts that no mutation record lands after the destruction, and it asserts the class state the destruction restored. Deleting the door after that first write reddens the case by an assertion in the replay. For each case, name the deleted lines, say whether they are exactly the door, and say whether the case's assertions tell that deletion apart from the passing case.
2. **The records assertion can fail.** The unit first read `observer.takeRecords()` after an `await`. It reports that form could not fail, because the observer's microtask delivery empties the queue first. The cases now record every delivery and assert on the delivered records plus `takeRecords`. Rule that a write landing after the destruction reaches that assertion.
3. **The removed Carousel door was unreachable.** The report claims every door from the incoming order write onward requires the outgoing item to lack the order token. If so, the outgoing `order` removal never changes its target, runs no consumer code, and cannot be followed by a state change the door would stop.
   - Rule whether any input reaches the removed door: a reaction, a listener, or a timer that leaves the outgoing item holding the order token when that removal runs.
   - Name the smallest such input if one exists.
4. **Scope.** Round 2 changes only the paths the status lists. `Collapse.ts` and `Toast.ts` are unchanged. `Carousel`'s `marks` default changes no call's behaviour.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `d3a3969`. Then report any behaviour defect in these cases or the changed Carousel lines, with the smallest input that reaches it. Report no prose finding. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
