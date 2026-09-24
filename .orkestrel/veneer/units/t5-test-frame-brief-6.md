# Unit T5 round 6 — TEST-FRAME: bound the window-fit move, and correct the park's stated mechanism

Successor to `t5-test-frame-brief-5.md`, which stays in force for every section this brief does not restate. What
changed: the round-5 audit (`t5-audit-5-verdict.md`) broke claim 5 and raised F1 and F2. This round carries exactly
those findings and nothing else.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-5 context. Perform the assignment directly in
`/home/user/test-tf` and spawn nothing.

## Objective

`computeOffset` never moves a fitting box past the window's start edge, the park's documented mechanism is true, and
the hover proof is named for what it proves, with every gate green.

## Context

Read `/home/user/scaffold/.orkestrel/veneer/units/t5-audit-5-verdict.md`, `t5-audit-5-objective-verdict.md` (claim 5),
and `t5-audit-5-subjective-verdict.md` (F1, F2). The Orchestrator's probe `t5-instruments-5/t5-offset-probe.mjs` and
its log run the round-5 arithmetic and the bounded arithmetic of item 1 over the counterexamples and a sweep of 10854
fractional boxes: the bounded arithmetic leaves no fitting box outside and keeps the retained fractional-bottom result
of -332. Host, law, and standing conditions are as in round 5. Keep every log you write, intermediate ones included,
under `tmp/units/`.

## Unknowns

None.

## Scope

Owned: `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, and `guides/test.md`. `src/browser/types.ts` is
off-limits unless the `FrameOffset` docs name the unbounded rounding; report it if they do. Everything else is
off-limits.

## Execution

Perform the assignment directly and spawn nothing.

1. **C5.** Bound each axis of `computeOffset`: where the element fits, an axis whose far edge already lies inside the
   window does not move, and an overflowing axis moves by `Math.max(extent - Math.ceil(edge), -start)`, so the move
   never takes the near edge past zero. Keep it inline in the one function, with no new helper. Add deterministic cases
   for `(0, 0.5, 100, 513)` in 800 by 513 (top -0.5), `(0.5, 0, 800, 100)` in 800 by 513 (left -0.5), and
   `(0, 0, 800, 512.5)` in 800 by 512.5 (no move), each asserting the final box lies inside the window. Keep the
   fractional-bottom case at -332. Retain an `unbounded` mutation (the round-5 arithmetic) that reddens the new cases.
   Where the TSDoc describes the rounding, state the bound in the same paragraph; keep the Summary as it is.
2. **F1.** Rewrite the second remarks paragraph of `releasePointer` and the matching sentences of the guide's
   `releasePointer` bullet to: the park point is (-1, -1) in the runner page's coordinates, one pixel above and to the
   left of that page's viewport, where the browser hit-tests nothing, so no element takes a `mouseover` event or hover
   paint from the parked pointer until the next pointer verb, even where a staging, scroll, or offset lays content over
   that point. Keep every other sentence.
3. **F2.** Rename the proof "keeps the hover a held pointer paints on the element it shoots" to "keeps the hover a
   resting pointer paints on the element it shoots", its `.held` class to `.hovered`, its "Held" name to "Hovered", and
   the guide's `captureFrame` coverage entry "A held hover" to a sentence naming a hover placed after staging on an
   element at the tester's top-left corner.
4. Run the whole mutation series again on the final test file with the digest check before and after: every round-5
   mutation plus `unbounded`, each reddening its named proof.

## Output

Write `tmp/units/t5-report-6.md` and return the same text: each change by symbol; the new cases' red (`unbounded`) and
green runs; the mutation table with its logs; the gate table with log paths; `tmp/units/t5-6.diff` (the whole change
over `80c419e`) and `tmp/units/t5-6-status.txt`.

## Deviation contract

As in `t5-test-frame-brief.md`. You settle the case titles, their place in the `computeOffset` block, and the guide
sentence wording inside item 3. Stop and report if any round-5 proof reddens under the bounded arithmetic.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0.
3. `npm run test:src:browser` exits 0, as an observation with its own reading.
4. The `unbounded` mutation reddens each new case, and every round-5 mutation still reddens its named proof, each run
   logged, with the digest log showing the test file unchanged across the series.
5. `grep -n "puts content under" src/browser/helpers.ts guides/test.md` returns nothing, and
   `grep -n -E "\.held|A held hover|held pointer paints|hoverAccessible\('button', 'Held'\)" tests/src/browser/helpers.test.ts guides/test.md`
   returns nothing. The `holdAccessible('Held')` cases around line 1003 hold a real button and keep their name.
6. The Orchestrator runs `npm run build`, `npm run test:guides`, and the Veneer journeys after you exit.

## Review evidence

The Orchestrator supplies `t5-6.diff`, `t5-6-status.txt`, the report, and the logs to the round-6 lanes.
