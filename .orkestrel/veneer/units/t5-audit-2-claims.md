# T5 TEST-FRAME audit, round 2 — claims

Subject: the round-2 change in `/home/user/test-tf` (uncommitted over `80c419e`), briefed by `t5-test-frame-brief-2.md`
and its note `t5-test-frame-brief-2-note.md`, and reported in `t5-test-frame-report-2.md`. The diff is `t5-2.diff`, the
status `t5-2-status.txt`, and the logs `t5-instruments-2/`, all beside this file. Round 1's reconciliation is
`t5-audit-verdict.md`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists exactly `guides/test.md`, `src/browser/helpers.ts`, and
   `tests/src/browser/helpers.test.ts`. The gates in the report's table ran as logged under `t5-instruments-2/`.
2. **Declared geometry (`T5-FIT`).** An element frame whose element is no taller than the declared pane is shot with the
   pane at the declared height, in flow above or below the fold or fixed, so its viewport-relative lengths resolve
   against the declared height. An element taller than the declared pane grows the pane to its own height through the
   same bounded loop and refusal. A page frame's staging and shot are the base path's.
3. **Hand-back (`T5-BACK`).** `captureFrame` saves the tester's scroll before anything moves it and restores it on every
   path, a refusal and a screenshot rejection included. The offset and the compositing hint come off as soon as the
   screenshot settles, before the path and byte verification.
4. **Scope (`T5-SCOPE`).** The offset is written on the calling frame's own `style` attribute, which is saved and restored
   exactly on every path, and no other frame in the runner page moves. The scope proof's second frame carries
   `data-vitest="earlier"` because the provider's own locator refuses a second `data-vitest="true"` frame; that choice
   still reddens the proof under the widened-offset mutation.
5. **Pointer (`T5-POINTER`).** An element that already lies inside the runner's window is neither scrolled nor offset. A
   required scroll or offset moves only as far as brings the element inside the pane or the window. The report's stated
   limit (an element exactly as tall as the runner's window and flush with its left edge lands on the park point) is the
   only case in which the element lands on the point `releasePointer` parks at.
6. **The proofs.** The final tests ran red on the round-1 code (9 failed, 13 passed, 334 skipped) and green on the final
   tree (22 passed, 334 skipped). Each mutation in the report's table reddens the proofs it names, and each proof's
   assertions distinguish its mutation from the passing case. The fixed-panel, below-pane, and scope proofs force their
   move on any runner window size.
7. **The sized refusal.** `readFrame` is byte-identical to round 1.
8. **Prose.** Every changed TSDoc sentence and guide sentence states what ships, names the offset with a word distinct
   from the lift `stagePane` makes, follows each code token with its noun, possessivizes none, and states no count.
