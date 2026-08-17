# T6b unit: supervisor — re-pin, repair, sweep rows, authorized ndjson adoption

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/supervisor` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/supervisor` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep
rows: `createTemporaryDirectory` → `createScratch` (~70 sites),
`collectProviderObservations` → `collect`, `readGuideWorkspace`/`walkGuideDirectory` →
`readInventory`, `GUIDE_ROOT` → `resolveRoot`, `readGuideText` → `requireValue`, the
tarpit bind spine → `createLoopback`, the dead `isBrowserVuePath` deletion, and — where
its sites live in the test tree — the USER-AUTHORIZED `@orkestrel/ndjson` adoption.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for the createLoopback contract, the
  bind-spine mapping, and Row Z — those texts are part of this brief.
- The registry serves `@orkestrel/test` 0.0.5, `@orkestrel/scaffold` 0.0.38, and
  `@orkestrel/ndjson` (read its version with `npm view @orkestrel/ndjson version` before
  pinning). Network is available; installs are permitted.
- This tree is at commit ee7b5bb, clean. It is `private: true`; nothing here publishes.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If
  repair REFUSES with a custom-Vitest-project error (the guard ollama hit), skip repair,
  record the exception, and continue — do not remove any project or script.
- Do NOT run the live-service project (`test:service:ollama`); `npm test` (the default
  projects) is the required gate. The Orchestrator re-proves the service suite before
  pushing.
- Published helper contracts: `createScratch(options?)` from `@orkestrel/test/server`
  ({ path, write, read, has, remove, destroy }); `collect` drains an async iterable;
  `readInventory(root, targets, options?)` returns file text keyed by root-relative
  path (files only, no directory keys — rewrite any directory-key assertion to a
  starts-with containment over file keys, preserving its proof); `resolveRoot(import.meta)`
  returns the directory above the calling module as a URL (wrap in `fileURLToPath`
  where a string is needed; probe-verify identity); `requireValue` narrows
  `T | undefined`/`null` by throwing on absence.
- Sol's earlier caution binds: supervisor's terminal-result collector and any scratch
  wrapper that ADDS value (seeding, policy, naming) stay — only 1:1 pass-throughs and
  hand-rolled copies migrate. Read each declaration before ruling it a copy.
- The ndjson row: adopt `@orkestrel/ndjson`'s parser ONLY at test-tree sites that
  hand-roll NDJSON line splitting/parsing. Read the installed declaration first. If the
  hand-rolled parser lives in `app/**` or `src/**` (production code), that is OUTSIDE
  this unit's scope — record the site and skip it. Add the devDependency only if a
  test-tree site actually migrates.
- Measure your own tree: grep for every symbol before editing. The ~70-site count is an
  expectation, not a criterion.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"` (plus `@orkestrel/ndjson` per the rule above).
   Run `npm install`.
2. Run `npx scaffold repair` (skip-and-record on the custom-project guard).
3. Apply the rows above, each with the discipline the earlier units used: read the
   local declaration first, migrate mechanically, keep value-adding wrappers, delete
   only zero-consumer or fully-migrated declarations, stop-and-report any
   non-mechanical mapping with file:line evidence.
4. Row Z — dead `isBrowserVuePath` per the shared text.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check. Expected
   main-suite scale: ~374 tests.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, `app/**`, vendored files, `.claude/**`,
secrets, the live ollama daemon.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; a value-adding
wrapper the row seems to name (report, do not migrate); a red gate you did not cause or
cannot close by formatting your own edits; repair errors other than the recorded
custom-project skip. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, retained-with-reason, and skipped-with-reason
(file:line), the ndjson decision (adopted where / skipped why, dep added or not), the
exact `git diff --stat`, each gate command with exit code and summary counts, deviations
or "none".
