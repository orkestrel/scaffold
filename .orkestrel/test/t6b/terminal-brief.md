# T6b unit: terminal — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/terminal` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/terminal` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep
rows: `requireElement` → `requireValue`, the inline fixture server → `createLoopback`,
and the dead `isBrowserVuePath` deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for the createLoopback contract, the
  bind-spine mapping, and Row Z — those texts are part of this brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `requireElement` → `requireValue`: a `requireElement(collection, index)` site
   becomes `requireValue(collection[index])` imported from `@orkestrel/test`. Replace
   each site, update imports, delete the local declaration. A site whose semantics
   differ from that mapping: stop and report it.
4. Row B — inline fixture server → `createLoopback` per the shared bind-spine mapping:
   the caller keeps building its own server and handler; only bind and release migrate.
   Inseparable spine at a site: stop and report.
5. Row Z — dead `isBrowserVuePath` per the shared text.
6. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
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
