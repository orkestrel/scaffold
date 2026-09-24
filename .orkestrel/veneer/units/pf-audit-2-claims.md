# Audit claims — PAGE-FRAME (`pf`), round 2

Subject: PAGE-FRAME's round-2 record — `pf-2.diff` and `pf-2-status.txt` (the worktree `/home/user/veneer-pf`
against `dc92a09`), the shared patch `pf-shared-2.patch` (one unified diff against `dc92a09`, superseding
`pf-shared.patch` whole), the report `b-cross-pf-report-2.md`, and the round-2 records under
`pf-instruments/` (the files whose names carry `-2`) — against the successor brief `b-cross-pf-brief-2.md`,
which carries P-a to P-d from the round-1 verdict `pf-audit-verdict.md`, and the round-1 brief
`b-cross-pf-brief.md` and design verdict `pf-design-verdict.md` for everything round 2 does not change. The
unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with
`file:line` evidence, and before confirming a claim about a proof names the mutation that would make the
proof fail and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the Orchestrator's
apply check (`pf-shared-2.patch` on a fresh `dc92a09` extract, exit 0) settles the apply clause; the owned
files' last modification is 11:12:46, the checksum restore after the mutation run, and every gate log and
the capture log postdate it.

1. **Scope and delta.** `pf-2-status.txt` lists the same five owned files round 1 listed and nothing else;
   `pf-shared-2.patch` touches `guides/veneer.md` alone; every hunk in `pf-2.diff` that differs from
   `pf.diff` serves P-a, P-b, P-c, or P-d, and no round-1 ruling the round-1 verdict confirmed (R1's
   bounding and restoration, R3's area guard, R4 to R6's placements) is weakened.
2. **P-a: the settle re-read.** The `#settle` method of the `FrameManager` class in `tests/setupBrowser.ts`
   stages the pane at the viewport, reads the content height, stages the pane again at the taller of that
   reading and the viewport on every path, the viewport-sized one included, reads a second time, and
   throws naming both readings when they disagree; the region is read only after that. The added case
   (`re-reads a document that fits the viewport after staging the pane again, and refuses one whose
   height changed`) reddens on the viewport-branch mutation alone and, with the changed case, on the
   dropped refusal, as `pf-mutations-2.log.txt` and the per-mutation logs show; its `MutationObserver`
   seam observes the installed `CAPTURE_PANE` marker the installed `stagePane` function writes, so it
   drives the real staging and simulates no project-owned behavior.
3. **P-b: the pointer guard.** In `tests/app/browser/integration.test.ts`, an unconditional
   `expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)` precedes every placement
   that follows a pointer move or hold (every site the `hoverAccessible` function, a `.hover()` call, or
   the `driveHold` function reaches before a placement), and no pointer-held placement lacks one. The
   un-lift mutation reddens `repaints a host under the pointer while it is hovered and while it is held`
   at `light-1280` on that guard; the unguarded un-lift passes while its frame paints (8, 65, 234)
   against the hovered reading (7, 58, 208), so the guard is what distinguishes the in-place host.
4. **P-b: the rewritten re-read comments.** Each comment the report lists under § P-b reads true against
   the code: after the placement the class has restored the sections and staged the pane where the
   comment says; nothing above a lifted specimen was taken out of the layout, so the specimen sits where
   it sat at the shot; and the form check box comment's claim that the box moves but keeps its focus and
   ring holds for a page frame in place. No comment in the owned files still says a re-read runs "in the
   layout the shot was taken in" or at "the geometry the shot used".
5. **P-c: one "opening".** Across the owned files and `pf-shared-2.patch`, "opening" means the heading and
   the Dark mode control and nothing else; the arrival frame is the opening and the Showcase region; the
   `check-group-focus` comment names the section that holds the label; the range focus comment states the
   blank element-frame measurement in the past, before a placement bounded the document; every
   `{@link FRAME_AREA}` reference carries its noun; the class remarks and the method comment state the
   staging order P-a's code performs.
6. **P-d: derived state.** The `#scenarios` field is gone; the `scenarios` getter derives from the
   `#placements` list; every placement the class admits is recorded in `#placements` before or at the
   shot, written or not, and a refused placement records nothing, so every reader of the `scenarios`
   getter (the refusal cases' empty-list assertions among them) reads what it read under round 1.
7. **The capture.** The unmutated `light-1280` run after the last source edit passes 45 of 45; the
   `showcase` frame is 1280 × 800, the `bottom-offcanvas` frame 1280 × 392 with its region at `y` 144 and
   height 240 (30vh of the 800-pixel viewport), and `navbar-collapsed-focus` is the tallest page frame at
   1280 × 1648, as `pf-2-frames-light-1280.log.txt` records; the column readings in
   `pf-2-unlifted-primary-hover-column.txt` and `pf-2-lifted-primary-hover-column.txt` are the values
   claim 3 states.
8. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, a nested function, or a mock, spy, or fake clock; the report quotes each gate's result
   line from its log. For the record, the lane lists every count and temporal word the report states and
   every code token it leaves without a noun.
