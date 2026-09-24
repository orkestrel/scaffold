# T5 TEST-FRAME audit, round 4 — claims

Subject: the round-4 change in `/home/user/test-tf` (uncommitted over `80c419e`), briefed by `t5-test-frame-brief-4.md`
and reported in `t5-test-frame-report-4.md`. The diff is `t5-4.diff`, the status `t5-4-status.txt`, and the logs,
instruments, and retained mutation files `t5-instruments-4/`, all beside this file. Round 3's reconciliation is
`t5-audit-3-verdict.md`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists exactly `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and
   `tests/src/browser/helpers.test.ts`, and each gate log under `t5-instruments-4/` ends with the exit status its run
   wrote, each 0.
2. **The leaf (F4, P2).** The exported `computeOffset` function is pure, takes a box and the runner window's size, and
   returns a `FrameOffset` whose arithmetic keeps the element's final box off the runner page's origin wherever the
   window leaves any room, fractional room included; the one residual is an element that fits the window and, from the
   origin, reaches both its bottom edge and its right edge. `captureFrame` calls it and keeps no copy of the arithmetic.
   The ten deterministic cases hold their stated results, and the right-nudge and fractional cases redden on their
   mutations.
3. **SVG elements (S2).** For an element that is not an `HTMLElement`, the scroll decision walks to the nearest
   `HTMLElement` ancestor's `offsetParent` chain and stops on an outermost fixed `svg` root; the SVG proof reddens on the
   round-3 decision and on the dropped fixed-root stop. The stated assumption about a fixed `svg` root inside a
   transformed ancestor is the only case the decision does not distinguish.
4. **The ordering fix.** The inner `finally` of `captureFrame` restores the tester's scroll in the same task, before it
   restores the frame's `style` attribute, so the element never returns to the park point after the shot; the proof
   records no covered-origin reading and reddens on `latescroll` and on the pre-fix source.
5. **Width-independent fixtures (W5).** The below-pane, scope, fixed-panel, and no-attribute fixtures declare a width no
   wider than the runner window and expect that width.
6. **The retained mutations.** Every mutation file under `t5-instruments-4/t5-4-mutations/` applies as written, runs on
   the final test file (whose digest the digest log checks before and after), and reddens the proofs the report's table
   names, with assertions that distinguish it from the passing case.
7. **Round-3 behavior holds.** The declared geometry, the offset's scope, the scroll restore after the release, and
   `readFrame` are unchanged from round 3 except where F4, P2, S2, and the ordering fix change them.
8. **Prose (W8) and parity.** Every changed TSDoc sentence and guide sentence states what ships, follows each code token
   with its noun, and states no count; the new `FrameOffset` and `computeOffset` Surface rows equal their TSDoc
   description paragraphs.
