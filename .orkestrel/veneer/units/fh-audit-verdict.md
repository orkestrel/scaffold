# FRAME-HELPERS audit, round 1 — the Orchestrator's reconciliation (2026-09-24)

Lanes that ran, blind to each other on `fh-audit-claims.md`: the objective lane, `analyst` on GPT-6 Astra (thread
`01a0d45b-febe-77f2-bad9-24dd0e0a5e03`, `fh-audit-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5
(`fh-audit-subjective-verdict.md`); and `checker` on Sonnet (`fh-audit-checker-verdict.md`). The unit was written by
`opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope and gates | CONFIRMED | CONFIRMED | MET | CONFIRMED |
| 2 One helper, one name | BROKEN | BROKEN | MET | BROKEN on naming; the claim misplaced `readImageRegion` and `measureDifference`, which belong in `tests/setupBrowser.ts` where they are |
| 3 Tab drives | CONFIRMED | CONFIRMED | — | CONFIRMED; the carousel rule writes the `outline: 0` declaration as the release does |
| 4 Pointer watcher | CONFIRMED | CONFIRMED | — | CONFIRMED; the T5 consumer probe shows a `mouseover` watcher catching content moved under a still pointer |
| 5 Outline check | BROKEN as worded | BROKEN as worded | — | CONFIRMED as "greater than 0 where painted, 0 where suppressed"; the container and link cases do not require a reading (carried) |
| 6 The lift restores | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The frames | BROKEN (report) | NOT-EVIDENCED at dark-390 | — | Report defect accepted on the record: the `p-3` wrappers keep their width and grow in height, and two specimens rewrap at 390; dark-390 has no baseline, and its acceptance is the journey's 62 of 62 |
| 8 Prose | BROKEN | BROKEN | BROKEN (referred) | BROKEN |

## Findings carried into round 2

- **N1 (claim 2, reviewer).** Bind every `FocusReading` under one name at every call site; keep `focused` for the paint
  read under focus. Rename the `FocusOptions.ring` key to `worn`, the installed `readRing` function's word for the
  element that wears the ring.
- **N2 (claim 2, objective lane).** The lifted element carries one name across the lift call sites where it is the same
  concept.
- **P1 (claim 5, both lanes).** Every focus case whose element paints an outline asserts the outline reading is defined
  and greater than 0: the focusable container and the link specimens included, so dropping the pixel check reddens them.
- **F1 (outside the claims, objective and subjective lanes).** Move the `createOutlines` factory out of
  `tests/setupBrowser.test.ts` into `tests/setupBrowser.ts`, test it, and build the journey's painted and suppressed
  portfolio pair with it.
- **C1 (reviewer observation).** Route the press case's own PNG decode and centre-pixel read through the
  `readImageRegion` function, and replace the inline `instanceof HTMLElement` checks beside `readElement` with it.
- **W1 (claim 8).** Write the `outline: 0` declaration with its noun; replace "The last row carries every fault
  together" with a sentence naming the row; say the wrapper is padded unless `padded` is `false`; state what
  `padded: false` does without the claimed need; say `FocusReading.entered` records until the frame is shot; write each
  changed `@throws` in the "Thrown when" form; correct "the placement every pointer state takes"; re-wrap the § Tests
  paragraph.

The resting cascade case's own copy lift and pointer watcher stay as they are in this unit: that case is not a driven
case. Its carrier is the Veneer re-pin that takes T5 TEST-FRAME, which changes what an element frame moves under the
pointer.

VERDICT: FAIL 2, 8; outside the claims: F1 — round 2 on `b-frame-helpers-brief-2.md`.
