# Audit claims — FOCUS-FRAME (`ff`), round 2

Subject: FOCUS-FRAME round 2 — `ff-2.diff` and `ff-2-status.txt` (the worktree `/home/user/veneer-ff` against
`e4a6d7c`, both rounds), the shared patch `ff-shared-2.patch` (superseding `ff-shared.patch` whole), the report
`b-focus-frame-report-2.md`, and the round-2 records under `ff-instruments/` — against the successor brief
`b-focus-frame-brief-2.md` and the round-1 verdict `ff-audit-verdict.md`. The unit was written by `opus` on Opus 5.5.
Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish that mutation
from the passing case.

Orchestrator ruling the lanes take as given, and rule wrong where the evidence says so: the shared focus-frame helper
and the dropdown and carousel focus drives belong to FRAME-HELPERS, not to this unit.

1. **Scope.** `ff-2-status.txt` lists only `tests/app/browser/integration.test.ts`, `tests/setup.ts`, and
   `tests/setup.test.ts`; `ff-shared-2.patch` touches `guides/veneer.md` alone.
2. **The outline guard.** The skip-link and list-group focus cases read the `auto` outline from pixels in the strip
   `computeRingBand` returns, assert the painted strip varies and the suppressed strip does not, and redden at
   `dark-1280` on each drive mutation the report names (a scripted focus alone, a scripted focus with a key press) and
   on the removed control; the suppressed frame is a real negative control, because its removal reddens the case.
3. **The helper logic.** `RING_SHADOW_CASES`, `RING_OUTLINE_CASES`, and `RING_WORN_CASES` are frozen exported setup
   constants the proofs iterate; `computeRingReach` keeps only logic a proof row decides (the layer split, the inset
   test, the offsets, the outline), and each named helper mutation reddens the case the report names; the removed
   parenthesis-aware split and color stripping decided no row, and no computed shadow the journey reads carries a
   length inside a color function.
4. **The pointer watcher.** Deleting the release in the grouped-alignment case reads nothing, because the parked
   pointer rests in the wrapper's padding; the watcher sits in the accordion focus case, whose release deletion reddens
   it at `dark-1280`.
5. **The drive readings.** The retained drive probe reads Veneer and the release alike on every drive row, and a
   scripted focus after a pointer press leaves `:focus-visible` unmatched while a key press matches it and paints no
   outline; the Tab drive paints it.
6. **Law.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a suppression, a nested function,
   or a mock, spy, or fake clock; the moved tables live in `tests/setup.ts` with TSDoc.
