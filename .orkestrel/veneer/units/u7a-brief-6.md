# Unit U7a — successor brief 6: the case matrices move to the setup file

## What changed and why

This brief supersedes `u7a-brief-5.md`; that brief stands (with briefs 4, 3, 2, and 1
it carries) except for the grant below, and `u7a-report-5.md` is the baseline: the
cascade, the proofs, the partition, the guide, the controls, and every gate are complete and
green in the working tree, and the unit stopped on one placement rule it found in its own
contract review — `.claude/rules/tests.md` § Shared test infrastructure: data tables and case
matrices belong in a setup file at any size — because the setup-file grant covered one helper
alone. The grant was the Orchestrator's error.

## Role, engine, law, context, host, controls, unknowns, output

As in `u7a-brief-5.md`, verbatim, with the standing clause on enumerating assertions.
`HEAD` is `2bc922d`. The working tree carries the whole brief-5 result, uncommitted and reviewed
in `u7a-report-5.md`. Continue from it; do not restore or reset anything.

## Scope

As in brief 5, with `tests/setupStyles.ts` granted for the exported case matrices the two Button
test files need (the bare-button matrix, the filled-role matrix, the mode matrix, the
outline-role matrix, and the size matrix, each a frozen `as const` table with a doc block, named
per `.claude/rules/names.md` and `architecture.md` for a shared test constant) and for the
export-inventory entry each adds; `tests/src/styles/elements/button.test.ts` and
`tests/src/styles/components/button.test.ts` for the imports that replace the inline tables.
Everything else stands.

## Execution

1. Move each inline matrix out of `tests/src/styles/elements/button.test.ts:24` and
   `tests/src/styles/components/button.test.ts:25`, `:219`, `:221`, and `:254` into an exported,
   frozen, typed table in `tests/setupStyles.ts` with a doc block naming what the table drives;
   import each table where its cases read it; add every new export to the export-inventory
   case in `tests/setupStyles.test.ts` (the standing clause). Test registration (the `it` and
   `describe` calls, the `for` loops over the tables) stays in the test files.
2. Re-run, in this order, and record each command's final lines: `npm.cmd run format:check`,
   `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run test:setup -- tests/setupStyles.test.ts`,
   `npm.cmd run test:src:styles`, `npm.cmd run test:conformance`, `npm.cmd run test:guides`,
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`. Record the cascade's SHA-256 after the
   final build; it is expected to equal the brief-5 digest
   `d544aae8cd656efcbf4e843427633a87c362e385fcfdbb3794134c328f0a6f7a` (the move touches no
   source partial); report it either way.

## Output

Write `u7a-report-6.md` and return its content: the moved tables (name, file, the
cases that read each); the export-inventory names added; each gate's final lines; the digest
comparison; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`. The
brief-5 report remains the record of the implementation, the controls, and the calibrated
readings; do not repeat them.

## Deviation contract

As in brief 5. The table names, their doc-block wording, and their grouping are ancillary.

## Acceptance criteria

1. No `it` block in the two Button test files declares an inline case matrix; every matrix is an
   export of `tests/setupStyles.ts` listed in the export-inventory case.
2. Every gate in item 2 exits 0 on managed Chromium and Edge.
3. `git status --porcelain --untracked-files=all` shows only the owned files (brief 5's set) and
   the report.

## Review evidence

The actual `git diff` and `git status` at return; this report and the brief-5 report together.
