# T6b unit: sea — re-pin, repair, sweep row

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/sea` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/sea` onto test 0.0.5 + scaffold 0.0.38 and apply its one T6 sweep row:
adopt `resolveRoot` in place of the local `WORKSPACE_ROOT` constant.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If the
  row's symbol lives in a vendored file, stop and report.
- `resolveRoot(import.meta)` from `@orkestrel/test` returns the directory ABOVE the
  calling module's directory. Read the local `WORKSPACE_ROOT` declaration first: map its
  resolution to a `resolveRoot(import.meta)` call at the declaring module, adjusting for
  where that module sits relative to the root it names (a setup file at `tests/` depth
  needs exactly the one-level-up resolveRoot gives it; any other depth: compute and
  verify with a probe before committing to the mapping).
- Measure your own tree: grep for `WORKSPACE_ROOT` before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row — `WORKSPACE_ROOT` → `resolveRoot`: find the declaration and every consumer in
   non-vendored `tests/` files. If the declaration reduces to what
   `resolveRoot(import.meta)` returns at its module, replace the declaration's
   initializer with `resolveRoot(import.meta)` imported from `@orkestrel/test` — or,
   where the constant is a one-line re-export of that call used in only one file, inline
   it and delete the constant. Verify the resolved path is IDENTICAL before/after with a
   quick probe (log both, compare, delete the probe). If a vendored file also declares
   or consumes `WORKSPACE_ROOT`, leave every vendored occurrence alone and scope the row
   to non-vendored files only; if that makes the row unclosable, stop and report.
4. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: the symbol missing; a resolution mismatch the probe reveals; the row
unclosable without touching a vendored file; a red gate you did not cause or cannot
close by formatting your own edits; repair errors. Ancillary choices are yours — decide,
record, continue.

## Output

Report: sites found and edited (file:line), the probe's before/after paths, the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
