# T6b unit: csv — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/csv` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/csv` onto test 0.0.5 + scaffold 0.0.38 and apply its two T6 sweep rows:
adopt the published `collectStream` in place of the local copy, and adopt `roundTripJSON`
at inline `JSON.parse(JSON.stringify(...))` sites where the mapping is sound.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- `collectStream` from `@orkestrel/test` drains a `ReadableStream` to an array.
  `roundTripJSON` from `@orkestrel/test` copies any `JSONSafe`-accepted value (including
  interface-typed ones) and THROWS on non-finite numbers rather than coercing to `null`.
- Measure your own tree: grep for each symbol/pattern before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — local `collectStream`: find the local declaration in `tests/` and its call
   sites. Compare its behavior with the published one (read the installed declaration in
   `node_modules/@orkestrel/test`). If semantics match, import `collectStream` from
   `@orkestrel/test`, delete the local declaration, keep call sites unchanged. If the
   local one differs (different return shape, chunk handling), stop and report the
   difference.
4. Row B — inline stringify: find `JSON.parse(JSON.stringify(` sites in `tests/`
   (non-vendored files). Migrate each to `roundTripJSON(...)` ONLY when the value's type
   is accepted and no assertion depends on non-finite-to-null coercion or undefined-key
   dropping. Skip and report any site where the mapping changes behavior — a skipped
   site with its reason is a valid outcome for this row.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.
The package's own guard (`csv keeps its guard` per the matrix) is NOT in scope — touch
no validator.

## Deviation contract

Stop and report on: a row symbol missing; a semantic mismatch in Row A; a red gate you
did not cause or cannot close by formatting your own edits; repair errors. Row B skips
are recorded, not deviations. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and skipped-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
