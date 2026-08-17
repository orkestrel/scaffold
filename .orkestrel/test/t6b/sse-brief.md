# T6b unit: sse — re-pin, repair, sweep rows, authorized contract adoption

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/sse` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/sse` onto test 0.0.5 + scaffold 0.0.38, apply its T6 sweep rows —
`expectDefined` → `requireValue` and the dead `isBrowserVuePath` deletion — and adopt
`seededRandom` from `@orkestrel/contract` in place of the local seeded PRNG. The
`@orkestrel/contract` devDependency addition is USER-AUTHORIZED for this unit.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5, `@orkestrel/scaffold` 0.0.38, and
  `@orkestrel/contract` 0.0.11. Network is available; installs are permitted.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- The design round recorded that the fleet's local seeded-PRNG variants and contract's
  `seededRandom` produce the same 32-bit sequence. VERIFY at this tree before migrating:
  read the installed `seededRandom` declaration in `node_modules/@orkestrel/contract`,
  compare with the local declaration, and run a five-value sequence probe (same seed
  through both, compare outputs, delete the probe). A sequence mismatch: stop and report
  with both value lists.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"`,
   `"@orkestrel/scaffold": "^0.0.38"`, and ADD `"@orkestrel/contract": "^0.0.11"`. Run
   `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `expectDefined` → `requireValue`: read the local `expectDefined` declaration;
   if it narrows `T | undefined` by throwing on absence, replace each call site with
   `requireValue(...)` from `@orkestrel/test`, update imports, delete the local
   declaration. A semantic difference: stop and report.
4. Row B — local seeded PRNG → `seededRandom` from `@orkestrel/contract`: after the
   sequence probe passes, replace call sites, update imports, delete the local
   declaration. Keep every test's seed values unchanged.
5. Row Z — dead `isBrowserVuePath` per the shared text.
6. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a semantic or sequence mismatch; a red gate
you did not cause or cannot close by formatting your own edits; repair errors. Ancillary
choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and retained-with-reason (file:line), the probe's
two value lists, the exact `git diff --stat`, each gate command with exit code and
summary counts, deviations or "none".
