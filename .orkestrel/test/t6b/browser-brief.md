# T6b unit: browser — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/browser` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/browser` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep
rows: delete `reservePort` (keeping the `readServerPort` child-report mechanism),
`destroyTempDirectories` → published `createTeardown`, inline stringify → published
`roundTripJSON` where sound, and the dead `isBrowserVuePath` deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted.
- This package's tests include real-Chromium projects. The browser is pre-installed:
  PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; do NOT run `playwright install`.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- The T6 design round ruled reserve-then-release port helpers OUT (TOCTOU): a child that
  needs a port binds 0 itself and reports it, which is what `readServerPort` already
  does. `reservePort` deletes only if its remaining call sites can each move to the
  child-binds-0 pattern mechanically or are already dead; otherwise stop and report.
- The published `createTeardown` (core entry): `{ count, add(handler), destroy() }`;
  thunk handlers, destroy runs newest-first sequentially, every handler runs after a
  throw, one failure rethrows by identity, several arrive as `AggregateError` in run
  order, idempotent, registers no hook — the consumer keeps its own
  `afterEach(() => teardown.destroy())` line.
- The published `roundTripJSON` refuses function-membered values via its `JSONSafe`
  bound and throws on non-finite numbers.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `reservePort` per the context note above. Keep `readServerPort` untouched.
4. Row B — `destroyTempDirectories` → `createTeardown`: read the local declaration; the
   usual two checks — (a) no test asserts an order incompatible with newest-first; (b)
   failure semantics match (all-run, identity rethrow, AggregateError). Keep the
   consumer's `afterEach` line. A mismatch: stop and report.
5. Row C — inline `JSON.parse(JSON.stringify(` sites → `roundTripJSON` where the bound
   accepts the value and no assertion depends on the coercion differences.
   Skip-and-report any behavior-changing site.
6. Row Z — dead `isBrowserVuePath` per the shared text. NOTE: this package genuinely
   has browser tests; if the predicate has real call sites here, KEEP it and report
   them — deletion applies only at zero consumers.
7. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; the Row B semantics
mismatch; a Row A site that cannot move to child-binds-0 mechanically; a red gate you
did not cause or cannot close by formatting your own edits; repair errors; a
browser-launch failure (report, do not install browsers). Row C skips are recorded, not
deviations. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, retained, and skipped-with-reason (file:line), the
exact `git diff --stat`, each gate command with exit code and summary counts, deviations
or "none".
