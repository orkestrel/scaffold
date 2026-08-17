# T6b unit: router — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/router` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/router` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
`createDeferred` → native `Promise.withResolvers`, `startServer` → `createLoopback`,
delete the local `isAddressInfo` once nothing needs it, and the dead `isBrowserVuePath`
deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for the createLoopback contract, the
  startServer mapping, and Row Z — those texts are part of this brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- Node >=22.12 / TS 6.0.3: `Promise.withResolvers<T>()` is native. It has NO default
  type parameter — a bare local `createDeferred()` call becomes an explicit
  `Promise.withResolvers<void>()` (bare native infers `unknown`, which breaks
  `.resolve()` with no argument).
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `createDeferred` → native: read the local declaration's returned shape, then
   migrate each call site (promise stays promise; the resolve member becomes `resolve`;
   reject becomes `reject`; bare calls gain explicit `<void>`). Delete the declaration
   and its type last. Non-mechanical site: stop, report.
4. Row B — `startServer` → `createLoopback` per the shared mapping.
5. Row C — local `isAddressInfo`: after Row B, if zero call sites remain, delete it. A
   remaining call site keeps it, noted.
6. Row Z — dead `isBrowserVuePath` per the shared text.
7. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; an inseparable Row B
spine; a red gate you did not cause or cannot close by formatting your own edits; repair
errors. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and retained-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
