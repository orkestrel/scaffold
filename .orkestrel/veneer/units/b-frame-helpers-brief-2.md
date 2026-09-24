# Unit FRAME-HELPERS round 2 — one name per concept, pinned outline proofs, the shared outline factory

Successor to `b-frame-helpers-brief.md`, which stays in force for every section this brief does not restate. What
changed: the round-1 audit (`fh-audit-verdict.md`) broke claims 2 and 8 and found the local outline factory.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent. Perform the assignment directly in `/home/user/veneer-fh` and spawn
nothing.

## Objective

Close the round-1 findings N1, N2, P1, F1, C1, and W1 in the unit's owned files, with every gate green.

## Context

Read, under `/home/user/scaffold/.orkestrel/veneer/units/`: `fh-audit-verdict.md` (the findings and their rulings) and
the three lane verdicts it names, which cite each site by line. Law, host, installed primitives, and standing conditions
are as in `b-frame-helpers-brief.md`.

**Control identifiers.** N1, N2, P1, F1, C1, W1, as the verdict names them. Keep them inside this brief; name tests for
what they prove.

## Unknowns

None.

## Scope

Owned: the six files round 1 owned (`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/app/browser/integration.test.ts`, and `guides/veneer.md` § Tests). `fh-shared.patch` stands
unchanged; return a revised patch only if a change here makes it false. Everything else is off-limits, and the resting
cascade case's own copy lift and pointer watcher stay as they are.

## Execution

Perform the assignment directly and spawn nothing.

1. P1 first, red-first: make each outline-painting focus case require a defined outline reading greater than 0, and show
   the pixel-check mutation reddening the container and link cases it left green in round 1. Log the run.
2. F1: one exported factory in `tests/setupBrowser.ts` builds the painted and suppressed outline portfolios, with a
   proof; the helper proof and the journey both use it.
3. N1, N2, C1: the renames and the consolidations. Rename `FocusOptions.ring` to `worn` at every site.
4. W1: the prose fixes, one plain sentence each.
5. Run the gates: the formatter check over the owned files, `npm run lint:check`, `npm run check`,
   `npm run test:setup`, `npm run test:setup:browser`, `npm run test:guides`, and one `CAPTURE=1` journey at
   `journey:dark-1280`. Report `journey:light-390` as an observation if you run it.

## Output

Write `tmp/units/fh-report-2.md` and return the same text: each finding with its change by symbol; the P1 red and green
runs with log paths; the gate table with log paths; `tmp/units/fh-2.diff` (the whole change over `5afa37b`) and
`tmp/units/fh-2-status.txt`.

## Deviation contract

As in `b-frame-helpers-brief.md`. Settle the binding name for a focus reading and the factory's name yourself.

## Acceptance criteria

1. The formatter check, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup`, `npm run test:setup:browser`, and `npm run test:guides` exit 0.
3. `CAPTURE=1` `journey:dark-1280` passes 62 of 62.
4. The P1 mutation reddens the container and link cases, with the run logged.

## Review evidence

The Orchestrator supplies `fh-2.diff`, `fh-2-status.txt`, the report, and the logs to the round-2 lanes.
