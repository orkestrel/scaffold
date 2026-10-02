# J0c scope note: substantive cuts only

This note overrides `/home/user/.wave/codex/j0c-brief.md` wherever they differ. The owner's ruling (2026-10-02): make the journeys reasonably fast by removing what is superfluous — repeated readings, waits a claim does not need, redundant rows — and do not fine-tune for seconds.

## Starting point

Phase 1 of the brief is committed on `ccr-d15a48b1-yyyll6` as `4070c56` (the sections journey at reduced motion, the declared `motion` parameter, and the name lookup). Start from that commit. A stopped run may have left uncommitted edits: read `git status` and `git diff`, keep only edits that belong to an item this note keeps, and restore the rest with `git restore`.

## First: the ruled fix for the phase-1 failures

The second run (report `/home/user/.wave/codex/j0c2-last.md`) could not reproduce the three failures in two full gates (66 of 66 each), found no reduced-motion stage outliving J3, and measured the slowest scroll-settle condition at 774.5 ms against its bound. Every condition wait in the component statechart helpers uses `waitForCondition`'s default budget of 1,000 ms (`node_modules/@orkestrel/test/dist/src/core/index.d.ts:770-781`). The failing checkpoint was the most loaded run (`responsive-offcanvas-390` took 25.7 s against 19.5 s), so the rows failed when four concurrent projects pushed a settle past that default. The Orchestrator rules:

- Declare one wait budget for the component statechart waits in the showcase section of `tests/setupBrowser.ts`, as a `WaitOptions` constant passed to each of those `waitForCondition` calls, with a one-line comment giving the reason: the slowest settle measured 774.5 ms of the 1,000 ms default in a passing four-project run. Take the bound from the test layer's own retry default when it exports one, otherwise 5,000 ms. A condition wait returns at the first read that holds, so a passing row pays nothing for the wider bound.
- Make a failing statechart row report its cause: the harness assertion names each failing row together with the error the row raised, read from what the harness records, so a full-run failure is diagnosable from the JSON report alone. Prove it with a deliberately broken row whose report carries the row name and its error message.

The uncommitted placement edits in `tests/app/browser/integration.test.ts` and `tests/setupBrowser.ts` belong to items 6 and 9: validate them as part of those items, or restore and redo them.

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
