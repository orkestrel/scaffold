# Unit task75-U7b — the settle probe over the header suite and the slack table (lands nothing; the second half of U7)

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI, in the probe worktree `/home/user/.wave/veneer-u7b` (a detached veneer worktree at `6a976a0`, which carries units U3 to U6; `node_modules` installed, `dist` built). You are its sole writer. The edits are probes and land nowhere: edit only `tests/app/browser/Showcase.test.ts` and `tests/setupBrowser.ts` in that worktree; commit nothing; touch no other file.

## Objective

Give unit U8 the two readings unit U7a did not take: the header settle wait of `tests/app/browser/Showcase.test.ts` (`the header buttons finish their color transitions`), which runs only in the `app:browser` project, and the slack table of every journey title against its present timeout, so that U8 can derive the `COMPONENT_WAIT` budget by rule R3 and show it below every slack. Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 5, § Rule R, and § Units U7 (the `app:browser` paragraph and the `--timeouts` acceptance); U7a's report `/home/user/scaffold/tmp/codex/task75-u7a-last.md` and its settle table `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/u7a-settle-analysis.md` hold the journey half.

## Context

- The instrument `/home/user/veneer/tmp/units/journey-cost/durations.ts` (unit U1b) parses `Settle probe {"variant":…,"family":…,"motion":…,"waits":[{"description":…,"milliseconds":…}]}` lines from `stdout.log` and `journey/*.txt`, reads command runs (folders with `report.json` and `end.json` and no `measure.jsonl`) without load, and takes `--timeouts FILE` (a JSON object from title to timeout in milliseconds) to print each title's slack and mark each `Settle probe` R3 figure that is not below its table's slack. Read its usage line first.
- The eligible journey runs for the slack table: `jb2-1`, `jb2-2`, `jb2b-1`, `jb2b-2`, `completion-b3-journey-after-4`, `completion-b4-journey` (the verdict's band), plus the day's later landed-tree runs `task75-u3-journey-1`, `task75-u3-journey-2`, `task75-u4-journey-2`, `task75-u5-journey-1`, `task75-u6-journey-1` (same journey test code apart from the units' own changes; `task75-u6-journey-1` carries the `Statechart duration` entries). Pass `--omit` for the two B4 readings titles on runs before `completion-b4-journey` if the instrument needs it (read the U1b brief, `/home/user/scaffold/tmp/codex/task75-u1b-brief.md`).
- The present timeouts to put in the `--timeouts` JSON: each component table takes the value the shared expression in `tests/app/browser/integration.test.ts` (`10_000 + Math.max(...COMPONENT_TABLES.map(({ scenarios }) => scenarios.length)) * 2500`) yields on this tree (compute it from `COMPONENT_TABLES` in `tests/setupBrowser.ts` and state the number); each header family 120_000; the preservation case 300_000; the J cases and the other journey titles their explicit timeouts where the source gives one, else Vitest's browser-mode default (read `configs/app/vite.journey.config.ts` for a `testTimeout`). Name every source line in the report.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-NAME --kind command --cwd /home/user/.wave/veneer-u7b -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; the `app:browser` file runs: `./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-NAME/report.json --project app:browser tests/app/browser/Showcase.test.ts`; never `cd`; no bash, PowerShell, or Python scripts; another lane may hold the lock for minutes.

## Scope

- **Change (the probe).** In `Showcase.test.ts`, shadow the `waitForCondition` and `waitForAnimations` imports with local functions of the same signatures that record elapsed milliseconds per description and delegate; print `console.info('Settle probe', JSON.stringify({ variant, family, waits }))` once per test that took a wait, with `variant` the test's viewport name where it has one and `family` the test's short name. In `setupBrowser.ts`, shadow the same two imports the same way only if `Showcase.test.ts`'s waits run through helpers there (read the test first; add nothing otherwise).
- **Runs.** Two `app:browser` file runs of `Showcase.test.ts` as `--kind command` with the JSON reporter. The first verifies that the browser console reaches `stdout.log` in a command run (`run.ts` writes the child's stdout there); if it does not, report it, try `--reporter=verbose` once, and stop if the entries still do not land.
- **The slack table.** Write the `--timeouts` JSON to `/home/user/veneer/tmp/units/journey-cost/timeouts-6a976a0.json` and run the instrument over the eligible runs listed in Context plus the two header runs and the two U7a probe runs (`runs/task75-u7-probe-1`, `-2`), with `--out /home/user/veneer/tmp/units/journey-cost/durations-2026-10-06c.md`.
- **Off-limits.** Every landing checkout; commits; every file outside the two probe copies and the two output files named here.

## Acceptance criteria

1. Both header runs pass (report the `Tests` line) and leave `Settle probe` entries in `stdout.log`; the slowest reading of `the header buttons finish their color transitions` is named with its run and milliseconds, beside the slowest reading of every other wait in that file.
2. `durations-2026-10-06c.md` holds the slack column for every journey title and marks each `Settle probe` R3 figure that is not below its table's slack; the report lists the marks and the titles whose slack is under 10 s.
3. The report names the instrument commands run, and states which header waits a budgeted `waitForCondition` under `COMPONENT_WAIT` (unit U8's change) would need to cover.

## Output

Final message: the run table (folder, kind, `seconds`, pass and fail counts); the header settle table (description, min, max, runs); the `--timeouts` JSON with the source line of each figure; the slack marks; the instrument commands; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
