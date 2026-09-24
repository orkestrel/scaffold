# Unit AP-COLOR round 4 — two titles

Successor to `ap-color-brief-3.md`, which stays in force for every section this brief does not restate. What changed:
the round-3 audit (`apc-audit-3-verdict.md`) held everything but two test titles.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its round-3 context in `/home/user/veneer-apc`.

## Objective

Two test titles in `tests/src/styles/utilities/color.test.ts` name every property their assertions prove.

## Context

Read `/home/user/scaffold/.orkestrel/veneer/units/apc-audit-3-verdict.md` and the subjective verdict beside it. Host as
round 3.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/utilities/color.test.ts`, the two titles only. Everything else is off-limits.

## Execution

Perform the assignment directly and spawn nothing. Change no assertion.

1. **K1.** The fill-and-body case's title becomes "moves a role color and its emphasis class to the tier of a fill or
   body text retuned at the scope declaring the %s theme".
2. **K2.** The emphasis-opacity case's title becomes "keeps each emphasis class outside the neutral roles opaque under
   an opacity step and fades its role class beside it, in %s mode".

## Output

Write `tmp/units/apc-report-4.md` and return the same text: the two changes, the gate table with log paths, and
`tmp/units/apc-4.diff` (`git diff 712ae72` over owned files) and `tmp/units/apc-4-status.txt`.

## Deviation contract

As round 3.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npm run test:src:styles` exits 0, logged.
3. `git diff` between the round-3 tree and this one changes those two title lines and nothing else.

## Review evidence

The Orchestrator supplies `apc-4.diff`, `apc-4-status.txt`, the report, and the logs to the round-4 lanes.
