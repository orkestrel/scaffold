# Unit T5 round 4 — TEST-FRAME: the park-point leaf, SVG elements, fractional room, width-independent fixtures

Successor to `t5-test-frame-brief-3.md`, which stays in force for every section this brief does not restate. What
changed: the round-3 audit (`t5-audit-3-verdict.md`) confirmed the gates, the round-2 behavior, the rejected-release
structure, the retained mutations, and the new proofs, and carried P2, S2, W5, F4, and W8.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent. Perform the assignment directly in `/home/user/test-tf` and spawn
nothing.

## Objective

Close P2, S2, W5, F4, and W8 in the unit's owned files, with every gate green.

## Context

Read, under `/home/user/scaffold/.orkestrel/veneer/units/`: `t5-audit-3-verdict.md` and the three lane verdicts it
names, which give each counterexample's geometry. Law, host, installed primitives, and standing conditions are as in
`t5-test-frame-brief.md`. F4 adds a public export, so `src/browser/types.ts` is owned for its result type, and
`guides/test.md` takes its Surface row.

**Control identifiers.** P2, S2, W5, F4, W8. Keep them inside this brief; name tests for what they prove.

## Unknowns

None.

## Scope

Owned: `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts`, and `guides/test.md`, plus
the Test barrel file that exports browser helpers if the export needs a line there. Everything else is off-limits.

## Execution

Perform the assignment directly and spawn nothing.

1. F4 first: declare the park-point result type, extract the arithmetic into an exported pure leaf with a
   `{verb}{Noun}` name, make `captureFrame` call it, and pin it with deterministic cases (the down nudge, the right nudge,
   the fractional nudge, the residual, the too-large element, and a negative top). Show the right-nudge case red when
   the right-nudge branch is deleted.
2. P2 inside that leaf: nudge by the room the window leaves, fractional room included.
3. S2: the scroll decision for an element that is not an `HTMLElement`, with a browser proof beside the fixed-element
   proof, red on the round-3 code.
4. W5: fixture widths derived from the runner window.
5. W8: the prose fixes, one plain sentence each.
6. Retain each new mutation as a file under `tmp/units/t5-4-mutations/` and run it on the final test file, recording
   the test file's digest before and after in a log.

## Output

Write `tmp/units/t5-report-4.md` and return the same text: each finding with its change by symbol; each new proof's red
and green runs; the mutation table with its logs; the gate table with log paths; `tmp/units/t5-4.diff` (the whole change
over `80c419e`) and `tmp/units/t5-4-status.txt`.

## Deviation contract

As in `t5-test-frame-brief.md`. Settle the leaf's name and the result type's shape yourself under the naming rules.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0, and the leaf's cases run in the project that owns pure helpers if they
   live there.
3. `npm run test:src:browser` exits 0, as an observation with its own reading.
4. Each new proof ran red on the round-3 code or on its mutation, each run logged, and the digest log shows the test file
   unchanged across the mutation runs.
5. `npm run test:guides` needs a built `dist/`, which you may not build; the Orchestrator runs it after you exit.

## Review evidence

The Orchestrator supplies `t5-4.diff`, `t5-4-status.txt`, the report, and the logs to the round-4 lanes.
