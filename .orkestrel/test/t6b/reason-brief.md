# T6b unit: reason — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/reason` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/reason` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
delete the local `invokeRaw` for the native call, inline stringify → published
`roundTripJSON` where sound, `createErrorRecorder` alias → inline `createRecorder`, and
the dead `isBrowserVuePath` deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them.
- `invokeRaw` replacement: the native call (`Reflect.apply(fn, undefined, args)` or a
  plain call) typed `unknown`, narrowed with the guard the test already uses. A site
  with no guard whose assertions depend on the unchecked generic return: stop and
  report.
- The published `roundTripJSON` refuses function-membered values and `T | undefined`
  members via its `JSONSafe` bound and throws on non-finite numbers. Skip-and-report
  behavior-changing sites; a skip with its reason is a valid outcome.
- Measure your own tree: grep for each symbol/pattern before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `invokeRaw` per the context note; delete the declaration last.
4. Row B — inline `JSON.parse(JSON.stringify(` sites → `roundTripJSON` where sound.
5. Row C — `createErrorRecorder` alias → `createRecorder<readonly [error: unknown,
event: string]>()` from `@orkestrel/test`; keep variable names and assertions; delete
   the alias; a differing tuple shape keeps its shape, noted.
6. Row Z — dead `isBrowserVuePath` per the shared text.
7. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a guardless invokeRaw site; a red gate you
did not cause or cannot close by formatting your own edits; repair errors. Row B skips
are recorded, not deviations. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and skipped-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
