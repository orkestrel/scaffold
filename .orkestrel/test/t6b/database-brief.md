# T6b unit: database — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/database` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/database` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep
rows: `collectRows` → published `collect`, `createCleanups` → published
`createTeardown`, `createErrorRecorder` alias → inline `createRecorder`, and the dead
`isBrowserVuePath` deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- `collect` from `@orkestrel/test` drains an async iterable to an array.
- The published `createTeardown` (core entry): `{ count, add(handler), destroy() }`;
  thunk handlers, destroy runs newest-first sequentially, every handler runs after a
  throw, one failure rethrows by identity, several arrive as `AggregateError` in run
  order, idempotent, registers no hook — the consumer keeps its own
  `afterEach(() => teardown.destroy())` line.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `collectRows` → `collect`: read the local declaration. If it is a plain
   async-iterable drain, replace call sites with `collect` from `@orkestrel/test` and
   delete it. If it projects or transforms rows beyond draining, stop and report the
   difference.
4. Row B — `createCleanups` → `createTeardown`: read the local declaration; the same
   two checks as every teardown migration — (a) no test asserts an execution order
   incompatible with newest-first; (b) failure semantics match (all-run, identity
   rethrow, AggregateError). Keep the consumer's `afterEach` line. Migrate registration
   → `add`, execution → `destroy`, update imports, delete the local declaration. A
   mismatch: stop and report.
5. Row C — `createErrorRecorder` alias → `createRecorder<readonly [error: unknown,
event: string]>()` from `@orkestrel/test`; keep variable names and assertions; delete
   the alias; a different tuple shape at a site keeps its shape, noted.
6. Row Z — dead `isBrowserVuePath` per the shared text.
7. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; the Row A projection
difference; the Row B semantics mismatch; a red gate you did not cause or cannot close
by formatting your own edits; repair errors. Ancillary choices are yours — decide,
record, continue.

## Output

Report: per-row sites found, edited, and retained-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
