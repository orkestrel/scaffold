# Unit U7a — successor brief 2: the conformance list is owned

## What changed and why

This brief supersedes `u7a-brief.md`; that brief stands except for the scope line
this one corrects, and `u7a-report.md` (the stop) is the baseline. The unit stopped
before editing because flipping Button's `selector` and `variable` rows to `shipped` makes
`collectShippedComponents(readCompatibility())` return `['btn']`, and
`tests/conformance.test.ts:55` declares the explicit list `const listed: readonly string[] = []`
that the case compares against in both directions — a file the first brief made off-limits. The
scope was the Orchestrator's error: U7d's design keeps the list explicit so that shipping a
component is a deliberate two-sided act (the rows and the list), and the unit that flips the rows
owns the list entry.

## Role, engine, law, context, host, controls, unknowns

As in `u7a-brief.md`, verbatim. `HEAD` is `2bc922d` (the u7d-bounds landing); the
tracked tree is clean.

## Scope

As in the previous brief, with one grant: `tests/conformance.test.ts` is owned for the `listed`
array alone (`const listed: readonly string[] = ['btn']`) and nothing else in that file. Every
other line of the previous Off-limits row stands (`tests/setup*.ts`,
`tests/setupConformance*.ts`, the oracle fixtures, `src/browser/**`, `app/**`, `package.json`).

## Execution

As in the previous brief, with item 5 read as: fill the deferral table, flip the two rows to
`shipped`, and set `listed` to `['btn']` in the same step; run `npm.cmd run test:conformance` red
on the flip before the partials carry every selector (the report records that red), then green
once they do.

## Output, deviation contract, acceptance criteria, review evidence

As in the previous brief, with acceptance criterion 4 (the status reading) admitting
`tests/conformance.test.ts` among the owned files. Write the report to
`u7a-report-2.md`.
