# Unit AP-COLOR round 6 — the case-1 title

Successor to `ap-color-brief-5.md`, which stays in force for every section this brief does not restate. What changed:
the round-5 audit (`apc-audit-5-verdict.md`) found the case-1 title false for the tier roles.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its context in `/home/user/veneer-apc`.

## Objective

The case-1 title in `tests/src/styles/utilities/color.test.ts` reads, verbatim: "resolves each role outside the neutral
roles to its on-canvas tier rather than the value the release records, and every other text color to that value, in
%s mode".

## Scope

**Owned.** That title line, and new files under `tmp/units/`. Everything else is off-limits. Change no assertion.

## Execution

Perform the assignment directly and spawn nothing. Replace the title, format the file with oxfmt, then run the scoped
color proof and `npm run format:check`, `npm run lint:check`, and `npm run check`, each logged as
`tmp/units/apc-6-<gate>.log.txt`.

## Output

Write `tmp/units/apc-report-6.md` and return the same text: the before and after title line, the gate table with log
paths, and `tmp/units/apc-6.diff` (`git diff 712ae72 -- tests/src/styles/utilities/color.test.ts`). State no count.

## Acceptance criteria

1. The title reads the objective's text exactly, and no other line of the file changed from round 5.
2. The scoped color proof, `format:check`, `lint:check`, and `check` exit 0.
