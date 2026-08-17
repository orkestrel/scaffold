# T6b unit: scaffold — local sweep rows (dev-only, no bump)

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/home/user/scaffold` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Apply scaffold's own T6 sweep rows: the `createUpstreamServer` bind spine →
`createLoopback` (keeping the scripted-reply policy), the tests-tree `WORKSPACE_ROOT` →
`resolveRoot`, and the dead `isBrowserVuePath` deletion where zero consumers hold.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for the createLoopback contract, the
  bind-spine mapping, and Row Z — those texts are part of this brief.
- This tree is ALREADY at test ^0.0.5 / version 0.0.38 with node_modules current and
  prepublishOnly proven — do NOT re-pin, install, or run `scaffold repair` here.
- These are dev-only test changes: NO version bump, NO manifest edit. Scaffold's own
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are the
  published dist/host surface — OFF-LIMITS; editing one forces a bump this unit must
  not cause. If a row's symbol lives in one of them, stop and report.
- `.orkestrel/**` and `tmp/**` are campaign artifacts — off-limits.
- `resolveRoot(import.meta)` returns the directory above the calling module as a URL
  (wrap in `fileURLToPath` where a string is needed); probe-verify path identity before
  landing, delete the probe.
- Measure your own tree: grep for `createUpstreamServer`, `WORKSPACE_ROOT` (tests-tree
  declaration only — the `configs/helpers.ts` export is a distinct vendored symbol,
  off-limits), and `isBrowserVuePath` before editing.

## Steps

1. Row A — `createUpstreamServer` bind spine → `createLoopback` per the shared mapping:
   the scripted-reply policy, routes, and captures stay with the helper/caller; only
   listen/address/close migrate. Inseparable spine: stop and report.
2. Row B — the tests-tree `WORKSPACE_ROOT` initializer → `resolveRoot(import.meta)`
   (wrapped as needed), probe-verified identical, consumers unchanged.
3. Row Z — dead `isBrowserVuePath` per the shared text (keep it if any call site
   exists, noted).
4. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. Expected scale: ~293 tests in the main run. If format:check
   fails only on files you edited, run `npx oxfmt --config .oxfmtrc.json <those files>`
   then re-run format:check.

## Scope

Owned: `tests/**` EXCEPT `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`. Off-limits: those three files, `package.json`, `src/**`,
`configs/**`, `.orkestrel/**`, `tmp/**`, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a symbol living in an off-limits file; a
non-mechanical mapping; a red gate you did not cause or cannot close by formatting your
own edits. Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found, edited, and retained-with-reason (file:line), the probe's
before/after paths, the exact `git diff --stat`, each gate command with exit code and
summary counts, deviations or "none".
