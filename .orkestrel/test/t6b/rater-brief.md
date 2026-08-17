# T6b unit: rater — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/rater` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/rater` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
delete the local `invokeRaw` in favor of a native call at the untyped boundary, and the
dead `isBrowserVuePath` deletion.

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
- The T6 design round ruled `invokeRaw` OUT of the published surface: its unchecked
  generic return is a type-bypass. The replacement at each site is the native call —
  `Reflect.apply(fn, undefined, args)` or a plain call, whichever the site already
  shapes — typed `unknown`, then narrowed with the guard the test already uses (or an
  existing package guard). A site with no guard whose assertions depend on the
  unchecked generic return: stop and report it rather than inventing a guard.
- Measure your own tree: grep for `invokeRaw` before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `invokeRaw` per the context note: migrate each call site, delete the local
   declaration and its type last.
4. Row Z — dead `isBrowserVuePath` per the shared text.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a site that needs a guard that does not
exist; a red gate you did not cause or cannot close by formatting your own edits; repair
errors. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with exit code and summary counts, deviations or "none".
