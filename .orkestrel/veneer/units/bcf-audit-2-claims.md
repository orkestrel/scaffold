# Audit claims — BCF (`bcf`), rounds 2 and 3

Subject: BCF's rounds 2 and 3 — `bcf-3.diff` and `bcf-3-status.txt` (the worktree `/home/user/veneer-bcf`
against `f4e5693`, both rounds together), `bcf-2.diff` (round 2 alone), the shared patch `bcf-shared-2.patch`
(against `f4e5693`, superseding `bcf-shared.patch` whole; round 3 changed no guide sentence), the reports
`b-collapse-bcf-report-2.md` and `b-collapse-bcf-report-3.md`, and the round-2 and round-3 records under
`bcf-instruments/` — against the successor briefs `b-collapse-bcf-brief-2.md` (B-a to B-f) and
`b-collapse-bcf-brief-3.md` (R5 and R6), and round 1's brief and verdict for everything they do not change.
The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with
`file:line` evidence, and before confirming a claim about a proof names the mutation that would make the proof
fail and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: `f4e5693` is round 1's
commit `ea14400` merged with the session head `ec98064` (PAGE-FRAME), with two conflicts resolved by the
Orchestrator as the round-2 brief states; the Orchestrator's apply check of `bcf-shared-2.patch` runs before
landing.

1. **Scope.** `bcf-3-status.txt` lists only files the round-2 and round-3 briefs own; in `tests/setupBrowser.ts`
   the diff adds the `readMenuContainment` function and the `MenuContainment` interface and changes nothing
   else, the `FrameManager` class and every existing export among the untouched; `bcf-shared-2.patch` touches
   `guides/veneer.md` alone and leaves every line of PAGE-FRAME's "first pixel" sentence as the merged head
   carries it.
2. **B-a: derived populations.** No section proof the unit owns iterates a literal list of specimen names or
   breakpoint steps: the accordion panel-corner case derives its ordinary groups from `ACCORDION_SPECIMENS`,
   the dropdown selector case iterates `BREAKPOINT_INFIXES`, and the dropdown fit and containment cases derive
   the ramp rows from `DROPDOWN_SPECIMENS`; each converted case reddens on its added-row mutation, as
   `bcf-mutations-2.log.txt` and the per-mutation logs show, and the infix mutation's use-site form (the
   `tests/setupStyles.ts` file is not owned) still distinguishes the case.
3. **B-c: one containment helper.** The `readMenuContainment` function replaces the copied loop in the
   dropdown, nav, and navbar section proofs, each of which asserts both the `measured` list and the `escaped`
   list; the helper visits its width through the `visitBreakpoint` function, restores the viewport, and throws
   (never asserts) on an unreachable width; its case reddens on the spilled menu and on the empty population
   alone.
4. **B-d: the hanging-menu name.** `Navbar hanging menu` and `navbar-hanging-menu` replace the old label and
   stem at every site (the table, the `CaptureSubject` union, the `CASCADE_KEYS` row, the section proof, the
   accessible name), no registered stem is a proper prefix of the new one, and no occurrence of the old label
   or stem remains in the owned files or the patch.
5. **B-f: the ring check bound to the shot.** The `nav-underline-focus` case reads its containment from the
   region the `FrameManager` class recorded for that placement and from the element the placement shot, so
   placing the frame on the specimen reddens it (the `underline-focus-on-specimen` run under `CAPTURE=1`),
   the unmutated run passes, and the structural guard precedes the pointer-held placement.
6. **R5 and R6.** Every shown menu in `NAVBAR_SPECIMENS` carries `data-bs-popper="static"`, as the release's
   dropdown script writes in its navbar branch; a case reads the attribute over a derived, non-empty
   population and reddens when it is dropped; a case reads every shown menu in a bar without an expansion
   class as `position: static` over a derived, non-empty population and reddens on the absolute mutation;
   the cascade reading in `bcf-3-cascade.log.txt` (the 2-pixel spacer gap) is what the release's
   `.dropdown-menu[data-bs-popper]` rule produces for a static menu.
7. **Prose.** The `NAV_SPECIMENS` sentence, the `NAVBAR_SPECIMENS` remarks, the rewritten section-proof
   comments, and the patch's rewritten sentences (a) to (d) read true against the code and the release, and
   no sentence in the owned files or the patch still names the menu containment as three copies or the old
   specimen label.
8. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a suppression, a
   nested function, or a mock, spy, or fake clock; the setup helper throws and never asserts; the reports quote
   each gate's result line from its log. For the record, the lane lists every count and temporal word the
   reports state and every code token they leave without a noun.
