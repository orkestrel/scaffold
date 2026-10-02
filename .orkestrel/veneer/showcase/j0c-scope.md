# J0c scope note: substantive cuts only

This note overrides `/home/user/.wave/codex/j0c-brief.md` wherever they differ. The owner's ruling (2026-10-02): make the journeys reasonably fast by removing what is superfluous — repeated readings, waits a claim does not need, redundant rows — and do not fine-tune for seconds.

## Starting point

Phase 1 of the brief is committed on `ccr-d15a48b1-yyyll6` as `4070c56` (the sections journey at reduced motion, the declared `motion` parameter, and the name lookup). Start from that commit. A stopped run may have left uncommitted edits: read `git status` and `git diff`, keep only edits that belong to an item this note keeps, and restore the rest with `git restore`.

## First: root-cause the phase-1 failures

The phase-1 checkpoint (`tmp/codex/j0c-phase1.json`) failed three statechart rows that every full gate at `f53c656` passed (66 of 66, three runs) and that passed again in a scoped rerun: `scrollspy-1280` (`Scrollspy Overlays through {Home}`), `offcanvas`, and `responsive-offcanvas-390` (`md drawer through 0:click`). Find the cause before any other item. Check first whether J3's reduced-motion stage outlives J3 in its project (a missing or unguarded `releaseMedia`, or a test that starts while `MEDIA_STAGE` is present), then whether a condition wait in those rows is bounded too tightly for four concurrent projects. Fix the cause in the owned files; never retry a row, raise a timeout without a measured reason, or add a fixed delay. Prove the fix with a full gate.

## Items to execute, in this order

- Item 6 (H1): the face table in one light and one dark variant; the theme and pair tables one time each.
- Item 9 (B2): J7, J8, and the frozen-specimen refusal in one theme per width, J8 keeping one default-motion reading.
- Item 10 (M3): declare reduced motion for the motion-independent journeys; this is the `motion` argument each test already passes.
- Item 11: the phase-2 checkpoint.
- Item 18 (C9): keep only the availability rows at 1280 for the navbar and the drawer, with the one added unchanged row per table.
- Item 20: the checkpoint after item 18.
- Item 21: one measured rebalance with the fewest moves.
- Item 23: the controls, for the kept changes only.
- The gates, the commit rules, and the output the brief names.

## Items not to execute

Items 7 (H2), 8 (H3), 12 (M4), 13 (C1), 14 (C2), 15 (C3), 16 (C4), 17 (C5), 19 (C6), and 22 (C7). Item 12 is out because the phase-1 checkpoint showed that removing idle waits barely moves the wall on this 4-core host (J3 fell 25 to 50 s per project; the gate read 341 s against a 328 s baseline): the gate is bound by the work it repeats, so the kept items remove repeated test runs. Add no helper, option, or row-ordering mechanism beyond what the kept items need.

## Target

The full journey gate near 250 s on this host, down from 355 s, and green in two consecutive full runs, because a row that fails only under the full run's load is a defect. When the kept items land near that, stop: report the measured wall time and do not chase the remaining seconds. When a kept item cannot keep its claim, leave it out and report it.
