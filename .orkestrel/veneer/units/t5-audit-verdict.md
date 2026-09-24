# T5 TEST-FRAME audit, round 1 — the Orchestrator's reconciliation (2026-09-24)

Lanes that ran, blind to each other on `t5-audit-claims.md`: the objective lane, `analyst` on GPT-6 Astra (thread
`01a0d450-c48f-74e3-aabb-6df03adc9ff0`, `t5-audit-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5
(`t5-audit-subjective-verdict.md`); and `checker` on Sonnet for claims 1 and 8 (`t5-audit-checker-verdict.md`). The unit
was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

Orchestrator evidence: `t5-host-readings.log.txt` (green 15 passed; red on the base helpers 3 failed with the report's
three messages; the compositing, content-edge, and offset mutations each red on the proof the report names),
`t5-instruments/t5-guides-host.log.txt` (`npm run test:guides` after the host build, `Tests  51 passed (51)`, exit 0),
`t5-instruments/t5-r1-probe.log.txt` (the reviewer's R1 run through the changed `captureFrame`), and the unit's own logs
retained under `t5-instruments/`.

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope and gates | UNRESOLVED | UNRESOLVED | UNRESOLVED | CONFIRMED: the file set holds in every lane; the unit's gate logs and the Orchestrator's guide run are now retained |
| 2 Staging | CONFIRMED | CONFIRMED | — | CONFIRMED as a loop; the element-edge design is BROKEN outside the claims (R1) |
| 3 The offset | BROKEN | BROKEN | — | BROKEN: the rule matches every `iframe[data-vitest]`, and the runner keeps earlier testers in the page |
| 4 Hand-back | BROKEN | BROKEN | — | BROKEN: an element frame scrolls the tester to the top and never restores the scroll |
| 5 Sized refusal | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 Proofs | CONFIRMED | UNRESOLVED | — | CONFIRMED on the unit's logs and the Orchestrator's host readings; R2 carried |
| 7 Page frames | BROKEN as worded | CONFIRMED | — | BROKEN as worded: the compositing rule stays through the frame waits and the file verification |
| 8 Prose | BROKEN | BROKEN | BROKEN | BROKEN |

## Findings carried into round 2

- **R1 (reviewer referral, reproduced by the Orchestrator).** Staging an element frame to its own bottom edge moves the
  defect from fixed elements to in-flow ones. Under a 900-pixel spacer, a `50vh` element reads 900 rows where the
  declared pane gives 422, and a `30vh` element never settles and is refused (`1295 over a 1314 pane`); under a
  1000-pixel spacer the `30vh` element is refused too.
- **Claim 4.** Save the tester's scroll before an element frame moves it and restore it on every path.
- **Claim 3.** The offset moves only the calling frame, and restores any marker it uses.
- **Claim 7.** The offset and the compositing hint come off as soon as the screenshot settles.
- **R2 (reviewer).** The fixed-panel proof reddens on the offset and compositing mutations only while the runner's window
  is shorter than the panel's top (590 rows); the fixture reads the window like the below-pane fixture does.
- **F1 (reviewer).** "lift" names both the placement `stagePane` makes and the new offset; give the offset its own word.
- **F2 (reviewer).** The offset rule overrides the placement `stagePane` makes, by specificity, and depends on its fixed
  position; place it beside `stagePane` and `releasePane`, or state that dependence where it is written.
- **Claim 8.** The code tokens without a noun and the possessive (`guides/test.md` around lines 666 and 1144, the
  `helpers.ts` option token around line 3440, and the `t5.diff` lines the reviewer and checker name); the geometry
  sentence limited to what ships; the stale `@throws`; "What the capture borrows it gives back" made true.

VERDICT: FAIL 3, 4, 7, 8; outside the claims: R1, R2, F1, F2 — round 2 on `t5-test-frame-brief-2.md`.
