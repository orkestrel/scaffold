# T5 TEST-FRAME park-point ruling — the Orchestrator's reconciliation (2026-09-24)

Brief: `t5-park-ruling-brief.md`. Lanes that ran, blind to each other: the subjective lane, `planner` on Opus 5.5
(`t5-park-ruling-planner-proposal.md`, a native subagent in a clean context), and the objective lane, `analyst` on GPT-6
Astra (`t5-park-ruling-analyst-proposal.md`, thread `01a0d4af-d9d0-75d3-bbd4-691c08152d5f`). Both adopt candidate A.

Orchestrator evidence: `t5-instruments-4/t5-park-probe.log.txt`. A pointer parked at (-1, -1) takes no `mouseover` and no
`:hover` when content scrolls across the origin, or when the calling frame is offset to (-200, -300) so that it covers
(-1, -1); parked at (0, 0), it takes both. The second reading is the planner lane's T1, which conditioned its adoption.

## Rulings

- **P1 — The invariant.** The `releasePointer` function parks the pointer at (-1, -1) in the runner page's coordinates,
  outside that page's viewport, after releasing any recorded hold. No staging, scroll, offset, or restore then puts
  content under the parked pointer, so no element takes a `mouseover` event or hover paint from it until the next
  pointer verb. The `captureFrame` function reads no pointer position and sends no pointer input.
- **P2 — The constraint.** The capture never takes the pointer, and it moves nothing for an element already inside both
  the pane and the runner window. A case that holds a hover stages the pane at the frame's size first, then hovers, then
  captures; the hover holds in the frame when the capture moves nothing. No hover is promised after the pane is released.
- **P3 — The mechanism removed.** The nudge in `computeOffset`, the scroll decision's ancestor walk (the `offsetParent`,
  `SVGSVGElement`, and shadow rules and the `scrolls` flag), and the inner scroll restore beside the style restore. An
  element whose box lies outside the pane is scrolled into it by the nearest distance, then read again; a fixed element
  past the pane may take a scroll that cannot move it, which is handed back.
- **P4 — The mechanism kept.** `computeOffset` reduced to the window-fit move (zero or negative on each axis),
  `FrameOffset` with its member docs rewritten, the offset on the calling frame's own `style` attribute and its exact
  restore, the compositing hint, the element-height staging with its bound and refusal, and the one scroll restore after
  `releasePane`, including a rejected release.
- **P5 — The boundary.** The `releasePointer` Summary says it releases a held pointer and parks it outside the page;
  the guide states the value and the promise of P1. The `captureFrame` docs state P2 and name neither the park point nor
  `releasePointer`. The `computeOffset` Summary says how far an element frame moves the tester frame so the element is
  shot inside the runner's window. The park coordinate stays an inline literal.
- **P6 — The consumers.** Veneer keeps every `releasePointer` call and its `entered` recorders, which become the
  consumer-side proof of P1. Its comments that place the parked pointer at the page's origin or on the wrapper's padding
  are rewritten, and an unpadded, origin-touching resting case is added. Each `unhover` call that precedes a frame
  without a later `releasePointer` (the planner lane's R2) is swept before that unit is briefed.

## Units

| Unit | Role and engine | Depends on |
| --- | --- | --- |
| T5 round 5 (the ruling) | `opus` on Opus 5.5, native in `/home/user/test-tf` (browser proofs need the host's Chromium) | this verdict |
| Its audit | `analyst` on GPT-6 Astra, `reviewer` on Opus 5.5, `checker`; the Orchestrator supplies the executed browser readings | round 5 |
| Test release 0.0.24 | the Orchestrator's release chain; the user's login approval and one-time code | the audit |
| Veneer re-pin | `builder` on Sonnet for the comment rewrites and the unpadded case, after the `unhover` sweep; the Orchestrator's install and journeys | the release |

## Carried findings retired by the ruling

The round-4 findings on the shadow-root SVG, the clamped scroll, the containing-block `svg` rule, and the ordering proof
are retired: their mechanism is removed. The round-4 width finding (claim 5) and the prose findings are carried into
round 5 where the prose survives.
