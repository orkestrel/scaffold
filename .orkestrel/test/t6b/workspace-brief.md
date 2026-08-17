# T6b unit: workspace — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/workspace` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/workspace` onto test 0.0.5 + scaffold 0.0.38 and apply its two T6 sweep
rows: adopt the published `roundTripJSON` in place of the local copy, and replace the
`createErrorRecorder` alias with `createRecorder` inline.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- The published `roundTripJSON` copies any `JSONSafe`-accepted value, including
  interface-typed ones, and THROWS on non-finite numbers rather than coercing to `null`.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — local `roundTripJSON`: find the local declaration in `tests/` and its call
   sites. Compare behavior with the published one (read the installed declaration in
   `node_modules/@orkestrel/test`). If semantics match at every site (no site depends on
   non-finite-to-null coercion), import `roundTripJSON` from `@orkestrel/test`, delete
   the local declaration, keep call sites unchanged. A site that depends on the coercion
   difference: stop and report it.
4. Row B — `createErrorRecorder` alias: replace each call with
   `createRecorder<readonly [error: unknown, event: string]>()` from `@orkestrel/test`,
   keep variable names and assertions, delete the alias. A different tuple shape at a
   site keeps its actual shape; note it.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a Row A semantic dependence on the coercion
difference; a red gate you did not cause or cannot close by formatting your own edits;
repair errors. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with exit code and summary counts, deviations or "none".
