# T5 TEST-FRAME audit, round 3 — the Orchestrator's reconciliation (2026-09-24)

Lanes that ran, blind to each other on `t5-audit-3-claims.md`: the objective lane, `analyst` on GPT-6 Astra (thread
`01a0d488-b576-7951-87e9-2658b0c9ad18`, `t5-audit-3-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5
(`t5-audit-3-subjective-verdict.md`); and `checker` on Sonnet for claims 1, 6, and 8 (`t5-audit-3-checker-verdict.md`).

Orchestrator evidence: `sha256sum /home/user/test-tf/tests/src/browser/helpers.test.ts` after the lanes returned reads
`f7c97f006617f1b1…`, the digest `t5-instruments-3/t5-3-test-final.sha256.txt` recorded before the mutation runs.

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The park point | BROKEN | BROKEN | — | BROKEN: the nudge needs a whole pixel of room, and the `offsetParent` walk stops on an SVG element |
| 3 Round-2 behavior | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Rejected release | CONFIRMED | CONFIRMED | — | CONFIRMED on the control flow, as the report states |
| 5 Host-independent proofs | BROKEN | CONFIRMED | — | BROKEN: the 390-wide fixtures stop forcing their move on a runner window narrower than 390 |
| 6 Retained mutations | CONFIRMED | UNRESOLVED | UNRESOLVED | CONFIRMED: the Orchestrator's digest reading settles the post-run check |
| 7 New proofs | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 Prose | BROKEN | BROKEN | CONFIRMED | BROKEN |

## Findings carried into round 4

- **P2 (claim 2, objective lane).** Nudge by the room the window leaves, fractional room included, so an element with
  less than a whole row or column of clearance still leaves the park point where any room exists.
- **S2 (claim 2, both lanes).** For an element that is not an `HTMLElement`, decide the scroll from its outermost `svg`
  root: a viewport-fixed root means the scroll does not move it; otherwise walk from the root's nearest `HTMLElement`
  ancestor. Prove the SVG case beside the fixed-element proof.
- **W5 (claim 5, objective lane).** Derive the below-pane, scope, and fixed-panel fixtures' width from the runner window
  as well as their height.
- **F4 (outside the claims, reviewer).** Declare the park-point result in `src/browser/types.ts` and export its
  arithmetic from `src/browser/helpers.ts` as a `{verb}{Noun}` pure leaf that `captureFrame` calls, with deterministic
  cases: the down nudge, the right nudge, the fractional nudge, the residual, the too-large element, and a negative top;
  add its guide Surface row. The right-nudge branch has no proof today.
- **W8 (claim 8).** Say an element inside the window is not offset up or left; say the nudge moves down to its first
  free row, or else right to its first free column; say that staging puts the tester at the origin under the parked
  pointer and that the element frame moves nothing further for an element off that point; name the viewport-fixed
  element, or anything inside one, as the element the scroll cannot move; align the residual wording with P2.

VERDICT: FAIL 2, 5, 8; outside the claims: F4 — round 4 on `t5-test-frame-brief-4.md`.
