# Audit claims — PAGE-FRAME (`pf`), round 1

Subject: PAGE-FRAME's record — `pf.diff` and `pf-status.txt` (the worktree `/home/user/veneer-pf` against
`dc92a09`), the shared patch `pf-shared.patch` (one unified diff against `dc92a09`), the report
`b-cross-pf-report.md`, the records under `pf-instruments/` (the mutation log `pf-mutations.log.txt` and
its instruments, the red and green `test:setup:browser` logs, the gate log, the capture logs per variant,
`pf-frames.log.txt`, and the section-height readings), and the frames the capture wrote under
`/home/user/veneer-pf/tmp/capture/states/` — against the brief `b-cross-pf-brief.md` and the design verdict
`pf-design-verdict.md` (R1 to R6 and R8). The unit was written by `opus` on Opus 5.5. Each claim is
falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim
about a proof names the mutation that would make the proof fail and whether its assertions distinguish
that mutation from the passing case. For a claim about a rendered surface, the frames are the evidence
and source is corroboration.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the
Orchestrator's apply check (`pf-shared.patch` on a fresh `dc92a09` extract, exit 0) settles the apply
clause; the unit's run stopped on an API rate limit and resumed after a container restart, and it reran
every gate whose log predated its last edit.

1. **Scope.** `pf-status.txt` lists `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
   `tests/setup.ts`, `tests/setup.test.ts`, and `tests/app/browser/integration.test.ts` and nothing else;
   `pf-shared.patch` touches `guides/veneer.md` alone; no off-limits file changes.
2. **R1: the bounded document.** Before every shot, element or page, the `FrameManager` class sets
   `hidden` on each child of the showcase's `main` that holds neither the subject nor the frame and was
   not hidden already, and removes it from exactly those children in a `finally` block; the proofs that
   hold this redden on no bounding, the subject's own child hidden, element frames left unbounded,
   restoration outside `finally`, and a restoration that clears every `hidden`, as the log shows.
3. **R2: the region at the shot's geometry.** The class stages the pane at the taller of the viewport
   and the bounded content height, requires one agreeing re-read, refuses a document that never settles,
   and reads the region there; the proofs redden on the region read at the viewport pane under a taller
   document, on the region read before bounding, and on the dropped settle refusal.
4. **R3: the area guard.** `FRAME_AREA` in `tests/setup.ts` is `1280 * 41954`, exported, and named in the
   export-list case; a frame one device-pixel row over it is refused with a message naming the scenario
   and its size, one at it is placed, and a refused placement records no scenario and no region; the
   off-by-one, dropped-refusal, and unexported mutations redden the cases the log names.
5. **R4 to R6: the placements.** `showcase` stays a page frame showing the header and the Showcase region
   alone; `page-strip-hover` and `page-strip-focus` are element frames of the padded stage; every
   pointer-held placement is on a specimen lifted to the document's start, `primary-hover` and
   `primary-active` among them, and each case reads its state after the shot.
6. **The captures.** At `light-390`, `dark-390`, `light-1280`, and `dark-1280` the portfolio case passes;
   `showcase--light-1280.png` is 1280 × 800; `bottom-offcanvas--light-390.png` shows the panel 253 pixels
   tall from row 131 of its 392-pixel frame, 30vh of the 844-pixel viewport, with its region there; each
   frame the report names for review shows what the report says it shows.
7. **Prose (R8).** The TSDoc of the `FrameManager` class and its methods, the `SHOWCASE_KEYS` TSDoc, the
   `CASCADE_KEYS` remarks, the integration file's rewritten comments, and the guide sentences the patch
   changes (the `showcase` stem row, the paragraph on what a frame's document holds, and the stale "first
   pixel" sentence) read true against the code, and no sentence left in the owned files or the patch
   states that a frame covers the whole document.
8. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the added `recordPlacements` recorder is a recorder under
   `.claude/rules/tests.md` and simulates no project-owned behavior; the report quotes each gate's result
   line from its log, states no temporal word, and follows every code token with its noun; the lane lists
   every count the report states, for the record.
