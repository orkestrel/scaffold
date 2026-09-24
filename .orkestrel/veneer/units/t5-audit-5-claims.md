# T5 TEST-FRAME audit, round 5 — claims

Subject: the round-5 change in `/home/user/test-tf` (uncommitted over `80c419e`), briefed by `t5-test-frame-brief-5.md`
and reported in `t5-test-frame-report-5.md`. The ruling it implements is `t5-park-ruling-verdict.md` (P1 to P5). The diff
is `t5-5.diff`, the status `t5-5-status.txt`, and the logs, instruments, and retained mutation files `t5-instruments-5/`,
all beside this file. The Orchestrator's host readings (build, guide gate, and the Veneer journeys against the packed
tarball) are `t5-instruments-5/t5-veneer-probe-5.log.txt` and the journey logs beside it. Each claim is falsifiable; rule
every one.

1. **Scope and gates.** The status lists exactly `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and
   `tests/src/browser/helpers.test.ts`, and each gate log under `t5-instruments-5/` ends with the exit status its run
   wrote, each 0.
2. **The park (P1).** The `releasePointer` function releases any recorded hold and then moves the pointer to (-1, -1) in
   the runner page's coordinates. The proof for an element past both the window's right and bottom edges records 0
   `mouseover` events and a frame of the element's size. The hover-clears proof and the hold-refusal proofs pass, and
   the `nomove` mutation reddens the hover-clears proof.
3. **The origin distinction.** The `origin` mutation (a park at 0, 0) reddens every corner proof and the both-axes proof,
   and each of those proofs asserts on a reading that differs between a park at (0, 0) and a park at (-1, -1).
4. **The removal (P3).** The `src/browser/helpers.ts` file contains no `offsetParent`, `SVGSVGElement`, or
   `ownerSVGElement` reference, `computeOffset` carries no nudge, and `captureFrame` has no scroll restore beside the
   style restore. `captureFrame` reads no pointer position and sends no pointer input.
5. **The kept mechanism (P4).** `computeOffset` is pure and returns the window-fit move, zero or negative on each axis;
   the fractional-bottom case reddens on `noceil`. The offset sits on the calling frame's own `style` attribute and is
   restored exactly; the compositing hint, the element-height staging with its bound and refusal, and the one scroll
   restore after `releasePane` (a rejected release included) remain, and `nooffset`, `nocomposite`, `widened`, and
   `noscrollback` each redden a named proof.
6. **The constraint (P2).** For an element already inside the pane and the runner window, the capture scrolls nothing:
   the inside-window proof asserts 0 `scroll` events. The held-hover proof, whose element sits at the tester's top-left
   corner, keeps its hover in the frame and reddens on the `nudge` mutation.
7. **The lifecycle exercises.** The origin-touching, window-filling, clamped-scroll, fixed-host shadow `svg`, and
   containing-block `svg` exercises each assert 0 `mouseover` events from the parked pointer, and each passes.
8. **The retained mutations.** Every mutation file under `t5-instruments-5/t5-5-mutations/` applies as written, runs on
   the final test file (whose digest the digest log checks before and after), and reddens the proofs the report's table
   names.
9. **The consumer.** The packed round-5 build passes the Test guide gate, and Veneer at `1ee0faf` with that tarball
   installed passes `journey:light-390` and `journey:dark-1280`, including the pointer guard that records `entered`
   elements.
10. **The boundary (P5) and parity.** The `releasePointer` Summary says it releases a held pointer and parks it outside
    the page; `captureFrame` docs state P2 and name neither the park point nor `releasePointer`; the `computeOffset`
    Summary states how far an element frame moves the tester frame; and the changed Surface rows equal their TSDoc
    description paragraphs.
