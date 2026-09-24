# Audit claims — CLOSE-OUT (`xo`), round 1

Subject: CLOSE-OUT's record — `xo.diff` and `xo-status.txt` (the worktree `/home/user/veneer-xo` against
`ec98064`), the shared patch `xo-shared.patch` and the report-only `xo-unscoped.patch` (both against `ec98064`),
the report `b-close-out-report.md`, and the records under `xo-instruments/` — against the brief
`b-close-out-brief.md`. The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules
CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof names the mutation that
would make it fail and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the brief did not scope
`tests/src/styles/components/close.test.ts`, which imports the retired constant, so the unit returned its fix as
`xo-unscoped.patch` and the Orchestrator integrates it at landing; item 5's premise was false, because the two
ledger rows the carrier row called copies name different proof steps (`button.click.toggle` and
`button.pressed.click`), so the unit deleted no row and asserts whole-row uniqueness instead.

1. **Scope.** `xo-status.txt` lists only files the brief owns, plus the mixins fixture the unit read as part of
   the mixins proof; `xo-shared.patch` touches `guides/veneer.md` alone; `xo-unscoped.patch` touches
   `tests/src/styles/components/close.test.ts` alone; every off-limits file is untouched.
2. **The close deferral.** `CLOSE_DEFERRED` and every reader of it are gone; the close binding case compares
   `CLOSE_SELECTORS` with the recorded `btn-close` selectors and asserts that no deferral row names the
   `Overlays` owner; the dropped-selector and planted-row mutations each redden it, as the logs show.
3. **The heading size mapping.** One `heading-size` function in `src/styles/_mixins.scss` returns the size
   token for a heading level, the three sites call it, the built `dist/src` is byte-equal to the base build
   (`xo-byte-equality.log.txt`), and the function's case reddens on the `8 - $level` mutation.
4. **The derived carousel populations.** Every population in `CarouselSection.test.ts` derives from
   `CAROUSEL_SPECIMENS` and must be non-empty, and a row added to the table alone reaches the derived cases.
5. **The frozen case tables.** `NAV_MODE_CASES` and `INPUT_GROUP_MODE_CASES` in `tests/setupStyles.ts` are
   documented and frozen, bound in the freeze cases and to their source tables, replace the inline pairs, and
   redden on each named mutation.
6. **The ledger uniqueness assertion.** The guide proof reads `readCompatibility` rows without a circular
   import and asserts each row unique; a planted verbatim copy reddens it; the two rows the carrier named are
   distinct proof steps, so deleting either would drop a proof the setup proofs read.
7. **The utility region order.** One stated rule (the load order of `src/styles/index.scss`) orders the
   utility regions, their guide sections, and their § Tests links; `Showcase.ts` and `index.ts` follow it; the
   showcase proof reddens before the move.
8. **Prose and law.** The departure tables follow the sorted run § Departures states; every field token the
   brief names takes its noun; the Alert and Carousel class sections' tokens take their nouns; the
   `TYPE_SPECIMENS` remark names the 390 and 1280 widths; no changed line adds an `any`, an `as` beyond a const
   assertion, a `!`, a suppression, or a nested function; the report quotes each gate's result line from its
   log. For the record, list every count and temporal word the report states.
