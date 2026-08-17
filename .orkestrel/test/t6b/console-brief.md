# T6b unit: console — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/console` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/console` onto test 0.0.5 + scaffold 0.0.38 and apply its two T6
sweep rows: delete the unused local `createGate`, and replace the `createErrorRecorder`
alias with `createRecorder` inline.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38; both were
  published minutes ago. Network is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a sweep
  row's symbol turns out to live in a vendored file, stop and report.
- Rows come from the T6 reconciliation matrix. Measure your own tree: grep for the symbols
  before editing; the counts below are expectations, not criteria.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — unused `createGate`: find the local `createGate` declaration in `tests/`
   (expected in a `setup*.ts`). Confirm it has zero call sites in this tree
   (`grep -rn "createGate" tests/ src/ app/ 2>/dev/null`). If unused, delete the
   declaration and its type/export rows. If call sites exist, migrate each to native
   `Promise.withResolvers<T>()` (read the local declaration first and map its members
   mechanically: the returned promise stays the promise; the open/resolve member becomes
   `resolve`), then delete the declaration. If the mapping is not mechanical at any site,
   stop and report that site.
4. Row B — `createErrorRecorder` alias: find its declaration in `tests/` and every call
   site. Replace each call with
   `createRecorder<readonly [error: unknown, event: string]>()` imported from
   `@orkestrel/test`, keeping each site's existing variable name and assertions unchanged.
   Delete the alias declaration. If a site's tuple shape differs, keep that site's actual
   shape and note it.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol that does not exist in this tree; a call-site mapping
that is not mechanical; a red gate you did not cause or cannot close by formatting your
own edits; repair output that reports errors. Ancillary choices (import line placement,
variable naming already present) are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with its exit code and summary counts, deviations or "none".
