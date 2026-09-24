# Unit AP-COLOR round 5 — one title rule across the color proof

Successor to `ap-color-brief-4.md`; `ap-color-brief-3.md` stays in force for every section this brief does not
restate. What changed: the round-4 audit (`apc-audit-4-verdict.md`) found the K1 title claims a property no assertion
reads, and a sibling case reads an element its title omits. Round 4 had forbidden new assertions; this round adds them.
The verdict's § The seam ruling is binding here.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, resumed with its context in `/home/user/veneer-apc`.

## Objective

Every case in `tests/src/styles/utilities/color.test.ts` satisfies the seam ruling's invariant, and every assertion
this round adds has been shown red under a named mutation.

## Context

Read `/home/user/scaffold/.orkestrel/veneer/units/apc-audit-4-verdict.md` and its subjective and objective lane
verdicts beside it. Host as round 3: Linux, bash; put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; format only with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. The round-3 mutation runner is
`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-mutate-2.py`.

## Unknowns

Whether the sweep finds a case beyond M1 and M2 that breaks the invariant. Record each case's reading in the report;
a case you cannot rule stops you with a deviation report.

## Scope

**Owned.** `tests/src/styles/utilities/color.test.ts`, and new files under `tmp/units/`. A mutation may edit a
`src/styles/**` file only inside the runner, which restores it and records a byte-identical comparison. Everything
else is off-limits. No git command that writes, no install, no `npm run build`, no `npm run format`.

## Execution

Perform the assignment directly and spawn nothing.

1. **M1.** In the fill-and-body case, assert after the body-text retune that the emphasis class matches the role's
   retuned twin, as the fill half does. Show it red under a mutation that keeps the emphasis tier on the fill but
   mixes it with the mode's resting body color instead of the live body-text token.
2. **M2.** In the density-and-channel case, assert under the channel retune that the emphasis class keeps its resting
   color, and retitle the case "leaves a role color and its emphasis class on their tier when the role channels or
   the density factor are retuned, in %s mode". Show the new assertion red under a mutation that makes the emphasis
   tier read the role's channel.
3. **Sweep.** Read every other case against the invariant. Where a case breaks it, add the assertion red first, or
   narrow the title where the property is false.
4. **M3.** Write `tmp/units/apc-mutate-5.py`, the successor runner: its selectors match the current titles, and it
   fails a mutation whose selection ran no test.
5. Run the scoped color proof, then the gates.

## Output

Write `tmp/units/apc-report-5.md` and return the same text: each change; a table with one row per case (its title,
the elements and conditions its assertions read, and "holds" or the edit made); the mutation table (mutation, the
assertion it reddened, the reading, the log, the byte-identical restore); the gate table with log paths;
`tmp/units/apc-5.diff` (`git diff 712ae72 -- tests/src/styles/utilities/color.test.ts`); and
`tmp/units/apc-5-status.txt`. State no count in prose.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. You settle an assertion's placement and a
title's wording inside the invariant yourself.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. The scoped color proof and `npm run test:src:styles` exit 0, logged.
3. Each added assertion has a mutation log showing it red and a byte-identical restore.
4. The status equals round 4's, and no file outside the owned set changed.

## Review evidence

The Orchestrator supplies `apc-5.diff`, `apc-5-status.txt`, the report, the runner, and the logs to the round-5
lanes.
