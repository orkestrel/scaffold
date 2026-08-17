# T6b unit: toolbox — re-pin, repair, sweep row

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/toolbox` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/toolbox` onto test 0.0.5 + scaffold 0.0.38 and apply its one T6 sweep
row: delete the unused local `createGate`.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If the
  row's symbol turns out to live in a vendored file, stop and report.
- Measure your own tree: grep for the symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row — unused `createGate`: find the local `createGate` declaration in `tests/`
   (expected in a `setup*.ts`). Confirm zero call sites
   (`grep -rn "createGate" tests/ src/ app/ 2>/dev/null`). Delete the declaration and its
   type/export rows. If call sites exist, migrate each to native
   `Promise.withResolvers<T>()` (read the local declaration first; the returned promise
   stays the promise, the open/resolve member becomes `resolve`), then delete the
   declaration. If a mapping is not mechanical, stop and report that site.
4. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: the symbol missing from this tree; a non-mechanical mapping; a red
gate you did not cause or cannot close by formatting your own edits; repair errors.
Ancillary choices are yours — decide, record, continue.

## Output

Report: sites found and edited (file:line), the exact `git diff --stat`, each gate
command with its exit code and summary counts, deviations or "none".
