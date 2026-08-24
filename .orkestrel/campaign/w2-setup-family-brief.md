# Unit W2 — probe: process-helper family, setup project, wait conversions

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.
Read `/home/user/orkestrel/probe/AGENTS.md` and `.claude/rules/tests.md` +
`.claude/rules/workspace.md` (vendored in that repo) before editing.

## Objective

In `/home/user/orkestrel/probe` (baseline: the head commit when you start), land the remaining
halves of ruling 11 from `/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` (read
it first), with the site map in `/home/user/scaffold/.orkestrel/campaign/g-probe-tests.md`
(§ Wait-loop map and the process-helper section; line numbers date from the sweep — re-locate
by fragment):

1. **The process-ending family moves.** `readFixtureServer`, `waitForFixtureServer`,
   `killFixtureServer`, `isProcessLive`, and `readSignalEnding` move from their current homes
   (`tests/src/server/stages/LintStage.test.ts`, `tests/src/bin/main.test.ts`) to
   `tests/setupServer.ts` as exported, directly tested helpers. `readHostEnding` and
   `readInputRefusal` STAY local (scenario-bound, per the ruling).
2. **The setup project registers.** Create `tests/setup.test.ts` (covering `WORKSPACE_ROOT` —
   landed by the prior unit) and `tests/setupServer.test.ts` (covering the moved family:
   `isProcessLive` against a live and a dead pid, `readSignalEnding` against a real short-lived
   child, and the fixture-server pair against the existing fixture idiom). Register the `setup`
   project and the `test:setup` script exactly as the vendored config proof
   (`tests/config.test.ts`) demands — read that proof FIRST and let it arbitrate the
   `vite.config.ts` and `package.json` shapes; prove with `npm run test:config`. `vite.config.ts`
   is content-owned by scaffold's repair: match the shape the workspace rules prescribe (the
   `setup` project defined only because root `tests/setup*.test.ts` files exist, `test:setup`
   joining `test`), and record in your report that the release wave re-checks this region.
3. **Wait conversions.** Convert the class (a) attempt-counted and deadline polls in the map to
   `waitForCondition(description, condition, options)` from `@orkestrel/test` (read its installed
   declaration first). Class (b) fixed settling waits STAY (the ruling folds them out of scope).
   The "matches neither" list STAYS. Name every converted site and every retained site in the
   report.

## TTTDD

The moved helpers get direct tests (the new `tests/setupServer.test.ts`). Red-first where a
behavior pin is new: record the command and failing count, then green. Pure moves are proven by
the consuming suites staying green (scoped runs).

## Environment and limits

The sandbox denies network, git index writes, loopback listeners, and child spawns —
`readSignalEnding` and the fixture-server tests SPAWN, so their runs are host observations:
write the tests, run the non-spawning scoped suites, and record the exact spawning commands for
the Orchestrator's host run with both expected readings. `npm run test:config` spawns Vitest; if
denied, record it the same way.

## Scope

- Owned: `tests/setupServer.ts`, `tests/setup.test.ts` (new), `tests/setupServer.test.ts`
  (new), `tests/src/server/stages/LintStage.test.ts`, `tests/src/bin/main.test.ts`,
  `tests/src/server/Probe.test.ts`, `tests/src/server/stages/RuntimeStage.test.ts`,
  `vite.config.ts` (the setup-project region only), `package.json` (the `test:setup` script and
  the `test` chain row only).
- Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `src/**`,
  guides. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on touched files.
2. `npm run check` scopes that compile the touched tests green (name the narrowest).
3. Converted-site and retained-site lists complete against the map; spawning suites recorded as
   host observations with commands.
4. `npm run test:config` green, or recorded as a spawn-denied host observation.

## Deviation contract

Stop and report on: the config proof demanding a shape the workspace rules contradict, a helper
whose move breaks an importer you do not own, or a conversion the published `waitForCondition`
cannot express. Ancillary naming and placement are yours.

## Output

Final message = report: moved-helper list with new signatures, converted and retained wait
sites, the config-proof shapes adopted, host-observation commands, gate tails,
`git diff --stat`, `git status --porcelain`, deviations or none.
