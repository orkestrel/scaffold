# J-RELEASE-RECORD round 2 — close verdict (2026-09-25)

**Subject.** Veneer `d3a3969` on `unit/release-record` over `a1041bd`. The brief is `units/j-release-record-brief-2.md`, the report is `units/j-release-record-report-2.md`, and the diff is `units/j-release-record-2.diff`.

**How it closes.** Round 1's verdict (`units/j-release-record-audit-verdict.md`) set three obligations and how each closes.
- **Obligations 1 and 2** adopt the lanes' prescriptions verbatim. Obligation 1 is the subjective lane's D1 and its OR2. Obligation 2 is its OR1. So the Orchestrator's mutation replay closes them.
- **Obligation 3** closes with the replay and one objective-lane check of its cases.

Both ran. No subjective lane ran this round, for that reason.

**The replay** (`units/j-release-record-replay-2.log.txt`, instrument `../tools/replay-release-record-2.sh`):
- **Each door deleted** (`units/j-release-record-2-r2-doors.sh`, which prints the deleted lines): exactly the `#holds` guard and its return, in turn for Collapse show and hide, Toast show and hide, Tab's pane, and Carousel incoming and outgoing. Each deletion fails its door case by an `AssertionError`.
- **Tab's take-time read restored** (`units/j-release-record-2-mutant-tab-take.diff`): fails the replacement case and the blur-listener destroy witness, both by assertion.
- **`recordHostWrite` through `writeHostValue`** (`units/j-release-record-2-mutant-helpers.diff`): fails the Tab destroy witness among the Tab cases, and obligation 2's priority case among the helpers cases, all by assertion.
- **Whole files:** Collapse, Toast, Tab, Carousel, Dropdown, and helpers pass whole, and so does `test:setup:browser`. The tree is clean after the replay.

**The objective check** (`units/j-release-record-audit-2-objective-verdict.md`; `analyst` on GPT-6 Astra, session `01a0d80d-bb82-7540-b2f8-cb5e319166b7`) ruled every claim in `units/j-release-record-audit-claims-2.md` CONFIRMED:
- each door case binds exactly its door;
- the records assertion reaches a write after the destruction;
- the removed Carousel door is unreachable, because the guard before it already requires the outgoing item to lack the order token, and nothing runs between that guard and the removal;
- the scope is exact.

The check's own terminal line reads PASS.

**The measurement the brief got wrong.** The brief expected the destroy witness's new after-show assertion to read green at `a1041bd`. It read red, because the take-time read never wrote the wrapper. The unit recorded that. It strengthens the witness, which now binds Bootstrap's order as well as the restoration.

**The unit closes.** J-RELEASE-RECORD lands next. `main` is already merged into `unit/release-record` with no conflict (`tools/w2-merge-main-release-record.log.txt`).

VERDICT: PASS
