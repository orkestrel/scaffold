# Unit T5 round 3 — TEST-FRAME: no move onto the park point, host-independent proofs

Successor to `t5-test-frame-brief-2.md` and its note `t5-test-frame-brief-2-note.md`, which stay in force for every
section this brief does not restate. What changed: the round-2 audit (`t5-audit-2-verdict.md`) confirmed the declared
geometry, the scope, and the sized refusal, and broke the pointer rule, one hand-back path, the proofs' host
independence, and the prose.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent. Perform the assignment directly in `/home/user/test-tf` and spawn
nothing.

## Objective

Close the round-2 findings P5, RA, H6, RB, RC, RD, and W8 in the unit's owned files, with every gate green.

## Context

Read, under `/home/user/scaffold/.orkestrel/veneer/units/`: `t5-audit-2-verdict.md` and the three lane verdicts it
names, which give each counterexample's geometry and each site by line. The round-2 build passes Veneer's
`journey:light-390` (62 of 62) in `t5-instruments-2/t5-veneer-probe-2.log.txt`; keep it passing. Law, host, installed
primitives, and standing conditions are as in `t5-test-frame-brief.md`. Write every log and instrument under
`/home/user/test-tf/tmp/units/`.

**Control identifiers.** P5, RA, H6, RB, RC, RD, W8, as the verdict names them. Keep them inside this brief; name tests
for what they prove.

## Unknowns

None.

## Scope

As in `t5-test-frame-brief.md`.

## Execution

Perform the assignment directly and spawn nothing.

1. P5, red-first: add the scrolled flush-left proof and the horizontal-offset proof with the pointer parked, show each
   red on the round-2 code, then change the mechanism so the element's final box never contains the park point where the
   pane and the window leave room, and skip the document scroll for an element the scroll does not move.
2. RA: restore the scroll on a rejected `releasePane`.
3. H6: rework the below-pane, scope, and fixed-panel fixtures so each forces its move on any runner window and expects
   whole rows.
4. RD: prove the no-attribute restore branch, or state in a comment why the installed runner never reaches it.
5. W8: the prose fixes, one plain sentence each.
6. RB, RC: write each mutation's exact text into `tmp/units/t5-3-mutations/`, one file per mutation, and run the red run
   and every mutation on the final test file with a script that reads those files. Log each run.

## Output

Write `tmp/units/t5-report-3.md` and return the same text: each finding with its change by symbol; each new proof's red
and green run; the mutation table with its logs; the gate table with log paths; `tmp/units/t5-3.diff` (the whole change
over `80c419e`) and `tmp/units/t5-3-status.txt`.

## Deviation contract

As in `t5-test-frame-brief.md`. Settle the nudge's direction and the residual case's wording yourself. Stop and report if
avoiding the park point needs a change outside the owned files.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0.
3. `npm run test:src:browser` exits 0, as an observation with its own reading.
4. Each new proof ran red on the round-2 code, and every mutation ran on the final test file, each run logged.

## Review evidence

The Orchestrator supplies `t5-3.diff`, `t5-3-status.txt`, the report, and the logs to the round-3 lanes.
