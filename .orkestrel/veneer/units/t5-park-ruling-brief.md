# T5 TEST-FRAME park-point ruling — design brief

A ruling, not a repair: `.claude/rules/quality.md` § Rounds and verdicts sets three rounds at one seam as the budget, and
T5 has spent four on the seam where an element frame moves content under the pointer `releasePointer` parks. Rule on the
invariant, the mechanism, and the boundary.

## The recurrence

Each round closed one route by which a capture moves an element under the parked pointer at the runner page's origin
(0, 0), and the next round's audit found another:

- round 1: the offset put every element at the window's origin (a Veneer consumer probe failed its pointer guard);
- round 2: a document scroll or a horizontal offset put a short element there;
- round 3: fractional clearance and SVG elements escaped the nudge and the scroll decision;
- round 4: a shadow root breaks the scroll decision's ancestor walk, a staged viewport that clamps the saved scroll
  returns the element to the origin before the release, and every containing-block ancestor other than a transform
  escapes the fixed-`svg` rule.

Records: `t5-audit-verdict.md` to `t5-audit-3-verdict.md`, `t5-audit-4-objective-verdict.md`,
`t5-audit-4-subjective-verdict.md`, `t5-audit-4-checker-verdict.md`, and `t5-test-frame-report-4.md`, all under
`/home/user/scaffold/.orkestrel/veneer/units/`. The round-4 source is uncommitted in `/home/user/test-tf` over
`80c419e`: `captureFrame`, `computeOffset`, `releasePointer`, `stagePane`, and `releasePane` in
`src/browser/helpers.ts`.

## Evidence the Orchestrator took

`t5-instruments-4/t5-park-probe.log.txt`: with the pointer parked at (-1, -1) through the same protocol call
`releasePointer` makes, scrolling a target across (0, 0) delivers no `mouseover` and leaves it without `:hover`; parked
at (0, 0), the same scroll delivers one `mouseover` and `:hover`. The protocol accepted the negative position.

## The candidate and its alternatives

- **A (candidate).** `releasePointer` parks outside the runner page's viewport. Then no move a capture makes can put
  content under a parked pointer, and the nudge, the scroll decision's ancestor walk (the `offsetParent`, SVG, and shadow
  rules), and the clamp ordering stop being needed: a capture scrolls an element outside the pane into it and offsets an
  element outside the window into it, and restores both. A pointer a case holds on an element keeps its hover only when
  the capture moves nothing, which holds for an element already inside the window.
- **B.** Keep the park at (0, 0) and keep repairing the geometric avoidance, stating each residual.
- **C.** Anything else the evidence supports.

## Rule on

1. The invariant the capture obeys toward the pointer, stated as the code will obey it.
2. The mechanism: which of the round-4 machinery stays (`computeOffset`, the offset on the calling frame's `style`
   attribute, the scroll restore, the compositing hint, the element-height staging) and which goes.
3. The boundary: what `releasePointer` promises (its park point, and what a consumer that parked for a resting frame
   meets), what the capture promises a case that holds the pointer on its element, and what the guide states.
4. The consumers: Veneer calls `releasePointer` before its resting frames and inside the frame manager's `focus`
   method (`/home/user/veneer/tests/setupBrowser.ts`, `/home/user/veneer/tests/app/browser/integration.test.ts`).
   Rule on what changes for them.
5. The units that implement the ruling, in order, with acceptance criteria.

## Lanes

The subjective lane is `planner` on Opus 5.5 and the objective lane is `analyst` on GPT-6 Astra, blind to each other.
Read the records and the source; the objective lane may run read-only commands. Return a proposal: the rulings above,
each with its evidence, the risks, and the units. Law: `/home/user/scaffold/AGENTS.md`,
`/home/user/scaffold/.claude/rules/{quality,tests,browser,names,architecture}.md`.
