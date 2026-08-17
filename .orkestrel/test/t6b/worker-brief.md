# T6b unit: worker — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/worker` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/worker` onto test 0.0.5 + scaffold 0.0.38 and apply its three T6 sweep
rows: migrate `createGate` to native `Promise.withResolvers`, migrate the local
`createTeardown` to the published one, and replace the `createErrorRecorder` alias with
`createRecorder` inline.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- The published `createTeardown` (new in test 0.0.5, core entry) returns
  `{ count, add(handler), destroy() }`: handlers are thunks (sync or async), destroy runs
  them NEWEST-FIRST sequentially, every handler runs even after one throws, one failure
  rethrows by identity, several arrive as an `AggregateError` in run order, destroy is
  idempotent, and it registers no afterEach hook of its own — the consumer keeps its own
  `afterEach(() => teardown.destroy())` line.
- Node >=22.12 / TS 6.0.3: `Promise.withResolvers<T>()` is native.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `createGate` → native: read the local declaration's returned shape, migrate
   each call site to `Promise.withResolvers<T>()` (promise stays promise; open/resolve
   → `resolve`; reject → `reject`), delete the declaration and type last.
   Non-mechanical site: stop, report.
4. Row B — local `createTeardown` → published: read the local declaration first and map
   its members to the published shape (registration member → `add`, execution member →
   `destroy`). Keep the consumer's existing `afterEach` registration line. TWO CHECKS
   before migrating: (a) if any test asserts teardown execution ORDER and the local
   implementation runs oldest-first, the published newest-first order changes behavior —
   stop and report; (b) if the local failure semantics differ (swallows errors, stops at
   first failure), stop and report. If both match or no test observes them, migrate,
   update imports to `@orkestrel/test`, delete the local declaration.
5. Row C — `createErrorRecorder` alias: replace each call with
   `createRecorder<readonly [error: unknown, event: string]>()` from `@orkestrel/test`,
   keep variable names and assertions, delete the alias. A different tuple shape at a
   site keeps its actual shape; note it.
6. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; the Row B order or
failure-semantics mismatch; a red gate you did not cause or cannot close by formatting
your own edits; repair errors. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with exit code and summary counts, deviations or "none".
