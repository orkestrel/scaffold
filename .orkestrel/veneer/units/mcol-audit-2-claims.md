# E-ID-MOTION-COLLAPSE audit round 2 — claims

Subject: E-ID-MOTION-COLLAPSE round 2 in `/home/user/veneer-mcol` (branch `unit/mcol`, committed as `6c6a0ce` over round
1's `9e1fe4e`), briefed by `e-id-motion-collapse-brief-3.md` on the findings of `mcol-audit-verdict.md`. Written by `opus`
on Opus 5.5 and reported in `e-id-motion-collapse-report-2.md`. Evidence: `mcol-instruments-2/` (`mcol-2.diff`,
`git diff 9e1fe4e`; `mcol-2-status.txt`; `mcol-2-shared.diff`; the plant and gate drivers; every log). Round 1's evidence
stays in `mcol-instruments/`. All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The round reads with
`git -C /home/user/veneer-mcol diff 9e1fe4e 6c6a0ce`. The design verdict that binds is
`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` (its Collapse panel and Accordion chevron rows and
§ Proof). A mutation counts as a kill only when the failing case's log names an `AssertionError`. Rule every claim.

1. **The reader.** `sampleTransition(element, property, pseudo?)` in `tests/setupBrowser.ts` reads the transition whose
   keyframe effect targets `element` with the named pseudo-element (or none), from the subtree list when one is named,
   and reads its frames from that pseudo-element's computed style; a transition carrying no keyframe effect reads as
   `undefined`; its doc block states exactly what it returns and throws. The new and renamed `setup:browser` cases failed
   on the round-1 reader and pass after, and the `reader-pseudo` and `reader-target` plants each fail the new case with an
   `AssertionError`.
2. **The chevron proof.** In each direction (a button taking the `collapsed` class and a button losing it), the case reads
   the running `::after` transform: duration and easing equal the resolved `--vn-motion-feedback` and `--vn-ease-standard`,
   the start frame is the frame it leaves, the midpoint frame differs from both ends, and the settled frame is
   `matrix(-1, 0, 0, -1, 0, 0)` expanded and `none` collapsed; the doubled factor reads as a ratio, and the zero factor and
   the reduced-motion preference read no transition. The `chevron-frozen` plant fails the midpoint reading. For each case
   the report lists, name the mutation that would make it fail, and say whether its assertions distinguish it.
3. **The guide.** § Accordion classes states both directions of the chevron's turn and its timing, and the proof paragraph
   names the readings the case takes; § Collapse classes names the difference a consumer sees from the release's `ease`
   (the curves' control points read true). Each sentence reads true and once.
4. **The comments.** The `_accordion.scss` header and chevron comments, the `_collapse.scss` comment, and the `fade.test.ts`
   assertion and its comment state what the code and the case do (round 1's F1 to F3).
5. **The shared hunks.** `mcol-2-shared.diff` changes only `sampleTransition`, its doc block, and the
   `describe('sampleTransition')` cases, and every other caller of `sampleTransition` in the worktree reads as before.
6. **No regression.** The partials' rules equal `9e1fe4e`'s; round 1's confirmed claims (the panel motion, the chevron's
   rendered timing, the rows, the engine and showcase readings) hold.
7. **Scope and gates.** The status names only files the briefs own. The oxfmt check, `npm run check`,
   `npm run lint:check`, `npm run test:setup`, the `setup:browser` file, `npm run build:src`,
   `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, the `Collapse` engine proof, and
   `npm run test:app` exit 0 in `mcol-instruments-2/`.
