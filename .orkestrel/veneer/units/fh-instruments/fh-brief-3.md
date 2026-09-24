# Unit FRAME-HELPERS round 3 — the helper proofs' names and two sentences

Successor to `b-frame-helpers-brief-2.md`, which stays in force for every section this brief does not restate. What
changed: the round-2 audit (`fh-audit-2-verdict.md`) confirmed P1, F1, C1, and the gates, and carried N3 and W3.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent. Perform the assignment directly in `/home/user/veneer-fh` and spawn
nothing.

## Objective

Close N3 and W3, as `fh-audit-2-verdict.md` states them, with the gates green.

## Context

`fh-audit-2-objective-verdict.md` names each site by line. Law, host, and standing conditions are as in
`b-frame-helpers-brief.md`.

## Unknowns

None.

## Scope

Owned: `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, and `tests/app/browser/integration.test.ts`. Everything
else is off-limits.

## Execution

Perform the assignment directly and spawn nothing. Rename, rewrite the two sentences, then run the gates.

## Output

Write `tmp/units/fh-report-3.md` and return the same text: each change by symbol; the gate table with log paths;
`tmp/units/fh-3.diff` (the whole change over `5afa37b`) and `tmp/units/fh-3-status.txt`.

## Deviation contract

As in `b-frame-helpers-brief.md`.

## Acceptance criteria

1. The formatter check over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup:browser` exits 0.
3. `npm run test:guides` exits 0.

## Review evidence

The Orchestrator supplies `fh-3.diff`, `fh-3-status.txt`, and the report to the round-3 checker.
