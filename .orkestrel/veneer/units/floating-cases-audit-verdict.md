# FLOATING-CASES audit — verdict

The Orchestrator's ruling on FLOATING-CASES (`floating-cases-brief.md`), a one-line Item the Orchestrator wrote from the
landing chain's red (`eid-landing/logs/eid-chain-12-run1.log.txt`) and `builder` on Sonnet applied. One lane ran:
`checker` on Sonnet (`floating-cases-audit-checker-lane.md`), because the Item copies the value the failing assertion
received and its acceptance is mechanical; no judgment in the change is left for an objective or subjective lane.

**Verdict: PASS.** The delta adds exactly the Item's line, its value equals the received `transition` reads in order,
the red log fails the one case with an `AssertionError`, and every gate log exits 0. FLOATING-CASES lands with MODAL
and FACTOR as `057d720`.

**Process finding, the Orchestrator's.** E-ID-MOTION-FACTOR's briefs named no `npm run test:setup` gate, so a case
table in `tests/setupStyles.ts` that binds each floating-label declaration to its token reads stayed unscoped. A brief
that changes a declaration's token reads names `npm run test:setup` among its gates, per `.agents/orchestration.md`
§ Check the brief before you send it ("Derive that set by running the suite").
