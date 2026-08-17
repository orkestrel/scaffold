# T6b unit: indexeddb — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/indexeddb` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/indexeddb` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep
rows: `createCleanups` → published `createTeardown`, and the dead `isBrowserVuePath`
deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- This package's tests run in real Chromium (Playwright). The browser is pre-installed:
  PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers is already set; do NOT run
  `playwright install`.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- The published `createTeardown` (core entry, host-independent — safe in a browser
  project): `{ count, add(handler), destroy() }`; thunk handlers, destroy runs
  newest-first sequentially, every handler runs after a throw, one failure rethrows by
  identity, several arrive as `AggregateError` in run order, idempotent, registers no
  hook — the consumer keeps its own `afterEach(() => teardown.destroy())` line.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `createCleanups` → `createTeardown`: read the local declaration; check (a)
   no test asserts an execution order incompatible with newest-first and (b) failure
   semantics match (all-run, identity rethrow, AggregateError). Keep the consumer's
   `afterEach` line. Migrate registration → `add`, execution → `destroy`, update
   imports, delete the local declaration. A mismatch: stop and report.
4. Row Z — dead `isBrowserVuePath` per the shared text.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; the Row A semantics
mismatch; a red gate you did not cause or cannot close by formatting your own edits;
repair errors; a browser-launch failure (report it, do not install browsers). Ancillary
choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and retained-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
