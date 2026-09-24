# Unit T5 round 5 — TEST-FRAME: park the pointer outside the page and remove the park-point avoidance

Successor to `t5-test-frame-brief-4.md`, which stays in force for every section this brief does not restate. What
changed: the park-point ruling (`t5-park-ruling-verdict.md`) replaces the geometric avoidance with a park outside the
viewport.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent. Perform the assignment directly in `/home/user/test-tf` and spawn
nothing.

## Objective

Implement the ruling's P1 to P5 in `@orkestrel/test`, with every gate green.

## Context

Read, under `/home/user/scaffold/.orkestrel/veneer/units/`: `t5-park-ruling-verdict.md`, both lane proposals it names
(`t5-park-ruling-planner-proposal.md` gives the exact TSDoc and guide sentences and the deletions by line;
`t5-park-ruling-analyst-proposal.md` gives the disposition table and the acceptance exercises), and
`t5-instruments-4/t5-park-probe.log.txt`. The round-4 tree is uncommitted in the checkout. Law, host, installed
primitives, and standing conditions are as in `t5-test-frame-brief.md`. Write every log and instrument under
`tmp/units/`.

## Unknowns

None; the ruling's T1 reading is in the probe log.

## Scope

Owned: `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts`, and `guides/test.md`.
Everything else is off-limits.

## Execution

Perform the assignment directly and spawn nothing. Order the work so each removal leaves the suite green.

1. `releasePointer` parks at (-1, -1); the hover-clears proof and the hold-refusal proofs stay green.
2. `computeOffset` reduced to the fit move; delete the nudge-only cases; re-expect the negative-top case; add a
   fractional-bottom case that reddens when `Math.ceil` is dropped.
3. `captureFrame` loses the ancestor walk and the inner scroll restore; it scrolls only when the box lies outside the
   pane and restores the scroll once, after `releasePane`, including a rejected release.
4. Delete the proofs whose property no longer exists (the ordering proof, the fixed-element and SVG unscrolled proofs).
   Rename the corner proofs to what they prove ("takes no `mouseover` from the parked pointer for …").
5. Add: a park proof for an element past both the window's right and bottom edges (offset up and left, 0 `mouseover`
   events, a frame of the element's size); a held-hover proof whose element sits at the tester's top-left corner, which
   reddens when the round-4 nudge is reinstated; an inside-window proof asserting 0 `scroll` events; the analyst lane's
   lifecycle exercises (an origin-touching and a window-filling element, a clamped scroll, a fixed-host shadow `svg`,
   and a fixed `svg` under a containing-block ancestor), each asserting 0 `mouseover` events from the parked pointer.
6. The docs and the guide carry P5's sentences; the Surface rows equal their TSDoc description paragraphs; the
   `captureFrame` coverage entry names every retained and new proof.
7. Retain each mutation as a file under `tmp/units/t5-5-mutations/` and run it on the final test file with a digest
   check before and after: `origin` (park at 0, 0) reddens every corner proof and the both-axes proof; `nomove` (no park
   move) reddens the hover-clears proof; `nudge` reddens the corner-hover proof; `noceil` reddens the fractional case;
   `nooffset`, `nocomposite`, `widened`, and `noscrollback` each still redden a named proof.

## Output

Write `tmp/units/t5-report-5.md` and return the same text: each change by symbol; each new proof's red and green runs;
the mutation table with its logs; the gate table with log paths; `tmp/units/t5-5.diff` (the whole change over
`80c419e`) and `tmp/units/t5-5-status.txt`.

## Deviation contract

As in `t5-test-frame-brief.md`. Stop and report if any exercise in step 5 takes a `mouseover` from the pointer parked at
(-1, -1).

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0.
3. `npm run test:src:browser` exits 0, as an observation with its own reading.
4. `src/browser/helpers.ts` contains no `offsetParent`, `SVGSVGElement`, or `ownerSVGElement` reference, and no doc
   names the park point outside `releasePointer`.
5. Every mutation in step 7 reddens its named proof, each run logged, and the digest log shows the test file unchanged.
6. `npm run test:guides` needs a built `dist/`; the Orchestrator runs it after you exit.

## Review evidence

The Orchestrator supplies `t5-5.diff`, `t5-5-status.txt`, the report, and the logs to the round-5 lanes.
