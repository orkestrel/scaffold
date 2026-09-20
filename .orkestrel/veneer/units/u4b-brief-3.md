# Unit U4b — successor brief 3: the exclusion controls, the refresh, and the gates

## What changed and why

This brief supersedes `u4b-brief-2.md` for the remainder of the unit; briefs 1 and 2
stand except where this one says otherwise, and `u4b-report-2.md` is the baseline.
Brief 2 stopped at its own boundary with the binding table, the explicit pressed attribute, the
pinned cascade path, the exclusion skip, the native `click` listener, and the two keyboard rows'
removal all implemented, and `npm.cmd run test:setup` red on two cases
(`tests/setupConformance.test.ts` lines 260 and 293): the exclusion controls hand
`scanOracleFixture` in-memory fixture objects whose optional members are present as `undefined`,
while the comparator serializes the live side, which omits them, so the comparison fails at
`button.initial` before the excluded step is reached. The fixture was not refreshed, so it still
carries empty `events` arrays, and the remaining gates did not run.

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`. Law from
`C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`.

## Context

`HEAD` is `ef1a563`; the working tree carries U4b briefs 1 and 2 and the Orchestrator's
`@orkestrel/markdown` declaration, all uncommitted and all staying. Brief 2's evidence is under
`tmp/u4b/successor-2/` (`red-setup.log`, `green-setup.log` which is the failing
post-implementation run, `final.diff`, `successor.diff`). The host facts of the previous briefs
stand (PowerShell shell, `npm.cmd run <name>`, `prove` blocked, instruments under `tmp/u4b/`,
Chromium launches inside the sandbox).

## Scope

**Owned.** `tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/conformance.test.ts`, `tests/fixtures/oracle/button.json` (re-recorded), the report.
**Off-limits.** Everything else, including `guides/veneer.md` (brief 2's row removal stands),
`tests/fixtures/oracle/inventory.json`, `package.json`, and `package-lock.json`.

## Execution

Perform the assignment directly and spawn nothing.

1. **The comparison is over the JSON form.** `scanOracleFixture` compares the saved fixture and
   the live recording after passing each through the same JSON round-trip (serialize, parse), so
   a member that is `undefined` on one side and absent on the other compares equal, and the
   comparator's doc block states that the comparison is over the JSON form the fixture file
   carries. Keep the two controls at lines 260 and 293 as written unless the round-trip leaves a
   genuine difference, in which case name it and fix the control's input. `npm.cmd run test:setup`
   green: record the final lines.
2. **The refresh.** `ORACLE_REFRESH=1 npm.cmd run test:conformance` on managed Chromium
   re-records `tests/fixtures/oracle/button.json` (the readings now carry `click`); then two
   ordinary `npm.cmd run test:conformance` runs on Chromium and one with
   `PLAYWRIGHT_CHANNEL=msedge`; every ordinary run must match the refreshed fixture; record each
   run's final lines and the fixture's `events` for `button.click.toggle`.
3. **The rows stand.** In the ordinary run, every remaining `## Compatibility` row passes the
   bound scanner; if one does not, stop and report the row and the step.
4. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:setup`, `npm.cmd run test:conformance`, `npm.cmd run test:guides`,
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance`; record each command's final lines.

## Output

Write `u4b-report-3.md` and return its content: the diff per file since report 2; the
green setup run; the refresh and the three ordinary comparisons; each gate's final lines;
`git status --porcelain` (tracked rows only); deviations in the usual shape.

## Deviation contract

Stop and report on: an ordinary comparison that differs from the refreshed fixture on a step you
cannot name as excluded; a `## Compatibility` row the scanner refuses; a gate red after your own
fix inside owned files; a need to edit an off-limits file. Decide, record, and carry on from: the
doc-block wording, where the round-trip lives.

## Acceptance criteria

1. `npm.cmd run test:setup` green with brief 2's cases intact and the two exclusion controls
   passing.
2. The fixture is refreshed and matches on Chromium twice and Edge once; `button.click.toggle`
   carries `click` in its events.
3. Every gate in item 4 exits 0.
4. `git status --porcelain` lists report 2's tracked rows exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the fixture.
