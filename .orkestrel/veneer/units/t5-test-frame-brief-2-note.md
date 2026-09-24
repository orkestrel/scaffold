# T5 round 2 — mid-round note (binds with `t5-test-frame-brief-2.md`)

Sent to the running unit at 17:0x UTC because it changes round 2's acceptance. Evidence:
`t5-instruments/t5-veneer-probe.log.txt` and `t5-instruments/t5-veneer-journey-light-390.log.txt`.

**Finding.** Veneer `82e1120`, run at `journey:light-390` against `@orkestrel/test` packed from the round-1 tree, fails
one case: `tests/app/browser/integration.test.ts` › "reads every resting cascade key the same on its lifted frame as in
the showcase, in light and dark", at the pointer guard `expect([...entered]).toStrictEqual([])` (around line 862). Every
lifted copy received a `mouseover` while its frame was shot. Veneer calls the installed `releasePointer` function before
its resting frames, which parks the pointer at the runner page's origin, and round 1's offset moves the tester until the
element sits at that same origin. Chromium updates hover when content moves under a still pointer, so a resting frame
can carry hover paint, and a frame shot while a case holds the pointer over its element can lose the hover it holds.

**Added requirement, `T5-POINTER`.** An element frame changes nothing the pointer rests on:
- Where the element already lies inside the runner's window, the capture moves neither the tester frame nor the
  tester's document.
- Where it must move something, it moves it only as far as brings the element inside the window, never to the point
  `releasePointer` parks at, and the TSDoc states what the move can do to hover.

**Added proofs.**
- With the pointer parked by `releasePointer`, an element inside the window receives no `mouseover` during its capture.
  The proof reddens when the element is moved to the window's origin.
- An element held under the pointer is shot with its hover paint on its bottom row.

The same applies to any scroll the round-2 mechanism takes. Scroll only as far as brings the element into the pane, and
leave an element that is already inside the pane where it is.
