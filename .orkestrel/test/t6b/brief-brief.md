# T6b unit: brief — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/brief` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/brief` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
local `readInventory` → published, and the dead `isBrowserVuePath` deletion.

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
- The published `readInventory` (from `@orkestrel/test/server`) reads a checkout into a
  map of root-relative path to file text; it refuses symlink escapes and can reach
  root-level files. Read the installed declaration for the exact signature (root,
  targets, exclusions) before mapping the local one's call sites.
- Measure your own tree: grep for `readInventory` before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — local `readInventory`: compare its behavior with the installed published
   declaration. If semantics match at every call site, import from
   `@orkestrel/test/server`, adjust call-site arguments to the published signature
   mechanically, delete the local declaration. A semantic difference (different
   exclusion rule, different return shape a test asserts on): stop and report.
4. Row Z — dead `isBrowserVuePath` per the shared text.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a Row A semantic difference; a red gate you
did not cause or cannot close by formatting your own edits; repair errors. Ancillary
choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with exit code and summary counts, deviations or "none".
