# T6b unit: agent — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/agent` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/agent` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
local `roundTripJSON` + inline stringify sites → published `roundTripJSON` (where
sound), `createGate` → native `Promise.withResolvers`, `createErrorRecorder` alias →
inline `createRecorder`, and the dead `isBrowserVuePath` deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- The published `roundTripJSON` copies any `JSONSafe`-accepted value (interface types
  included; function-membered class instances are refused by the bound) and THROWS on
  non-finite numbers rather than coercing to `null`.
- Node >=22.12 / TS 6.0.3: `Promise.withResolvers<T>()` is native, with NO default type
  parameter — bare `createGate()` calls become explicit `Promise.withResolvers<void>()`.
- Measure your own tree: grep for each symbol/pattern before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — local `roundTripJSON` and inline `JSON.parse(JSON.stringify(` sites: adopt
   the published `roundTripJSON` where the value's type satisfies the bound and no
   assertion depends on non-finite-to-null coercion or undefined-key dropping. Delete
   the local declaration once its sites are migrated. Skip-and-report any site where
   the mapping changes behavior — a skipped site with its reason is a valid outcome.
4. Row B — `createGate` → native: read the local declaration's shape, migrate each site
   (promise stays promise; open/resolve → `resolve`; reject → `reject`; bare calls gain
   `<void>`), delete the declaration last. Non-mechanical site: stop, report.
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

Stop and report on: a row symbol missing; a non-mechanical mapping; a red gate you did
not cause or cannot close by formatting your own edits; repair errors. Row A skips are
recorded, not deviations. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and skipped-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
