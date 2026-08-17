# T6b unit: server — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/server` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/server` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
`WORKSPACE_ROOT` → `resolveRoot`, delete the unused local `startServer`, and the dead
`isBrowserVuePath` deletion.

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
  `configs/helpers.ts` also declares a WORKSPACE_ROOT — that one is vendored and
  OFF-LIMITS; your row touches only the tests-tree declaration.
- `resolveRoot(import.meta)` from `@orkestrel/test` returns the directory ABOVE the
  calling module's directory (as a URL — wrap in `fileURLToPath` where a string path is
  needed, matching how the sea package landed the same row). Verify the resolved path
  is IDENTICAL before/after with a quick probe (log both, compare, delete the probe).
- Measure your own tree: grep for `WORKSPACE_ROOT` and `startServer` before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — the tests-tree `WORKSPACE_ROOT` declaration's initializer →
   `resolveRoot(import.meta)` (wrapped as needed), probe-verified identical. Consumers
   unchanged. If the declaration sits at a depth where the mapping needs an adjustment
   the probe contradicts: stop and report.
4. Row B — unused local `startServer`: confirm zero call sites
   (`grep -rn "startServer" tests/ src/ app/`), then delete the declaration and its
   type/import rows. Call sites found: stop and report them (this row was recorded as
   an unused copy).
5. Row Z — dead `isBrowserVuePath` per the shared text.
6. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, `configs/**`, vendored files,
`.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a probe mismatch; live startServer call
sites; a red gate you did not cause or cannot close by formatting your own edits;
repair errors. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the probe's before/after paths, the
exact `git diff --stat`, each gate command with exit code and summary counts, deviations
or "none".
