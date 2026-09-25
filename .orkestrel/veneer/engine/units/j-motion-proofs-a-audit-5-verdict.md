# J-MOTION-PROOFS-A round 5 — verdict (2026-09-25)

**Subject.** The case `opens the modal from its trigger, locks the page, and closes from its button and from Escape` in `tests/app/browser/sections/EngineSection.test.ts`. The landing chain's `test:app` read it red, and it read red again when run alone (`tools/w2-land-rest-motion-proofs-a.log.txt`).

**Lanes.** Not run. The change replaces a wait on an element's animations with a wait on the engine's completion event, which is the reading E32 requires of a proof. It adds no assertion and removes none. The Orchestrator reproduced the red alone before the change. The landing chain re-runs `test:app` and every other project on the merged tree, which settles whether the change holds.

**Rulings.**
- The red was the case's, not the engine's. It read focus right after `waitForAnimations(dialog)`, and `Modal` now completes after both its host and its dialog settle.
- The fix waits for `shown.vn.modal` and `hidden.vn.modal` (`units/j-motion-proofs-a-report-5.md`).
- The writer's sweep of `tests/app/` found no other case reading an engine's completion state after an animation wait.
- The landing procedure gains the rule that a unit changing an engine's completion timing names `npm run test:app` in its acceptance (plan § Landing procedure).

VERDICT: PASS
