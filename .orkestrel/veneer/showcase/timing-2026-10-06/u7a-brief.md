# Unit task75-U7a — the popover probe (lands nothing; the first half of U7)

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI, in the probe worktree `/home/user/.wave/veneer-u7` (a detached veneer worktree at `bec0a38`, which carries unit U3; `node_modules` installed, `dist` built). You are its sole writer. The edits are probes and land nowhere: edit only `tests/setupBrowser.ts` and `tests/app/browser/integration.test.ts` in that worktree; commit nothing; touch no other file.

## Objective

Measure every settle wait the showcase suites take, and name the steps behind the popover motion=true table's spread (60228.0 to 165767.6 ms over the six eligible runs, ratio 2.75, held by rule R5 because its slow readings do not follow load). On 2026-10-06 the table also hit its 230 s timeout once (`runs/task75-u4-journey-1`, 230,296 ms, `outside.seconds` 68.28, wall 692.1 s), the slowest reading so far, so that unit U8 can derive the `COMPONENT_WAIT` budget by rule R3 and unit U9 can size the table timeouts. Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 4 and 5, § Rule R, and § Units U7 (read them first; line numbers there were read at veneer `90b96bb`; re-locate by text in `/home/user/.wave/veneer-u7`).

## Context

- The instrument that reads the probe output is `/home/user/veneer/tmp/units/journey-cost/durations.ts` after unit U1b: it parses `Settle probe {"variant":…,"family":…,"motion":…,"waits":[{"description":…,"milliseconds":…}]}` lines and `Statechart duration` entries, and takes `--timeouts FILE` (a JSON object from title to timeout in milliseconds). Read its usage line before you write the entries.
- `waitForCondition`, `waitForAnimations`, and `waitForEvent` come from `@orkestrel/test/browser` (and `@orkestrel/test` core) through imports in the three files; a local shadow with the same signature that records the elapsed milliseconds per wait description and then delegates to the library function keeps every predicate unchanged.
- The popover path: `arrangePopoverVisibility`, `actOnTipControl`, `assertTipVisibility`, and `observeShowcaseStability` in `tests/setupBrowser.ts` (locate by name).
- The header settle wait of `tests/app/browser/Showcase.test.ts` (the `the header buttons finish their color transitions` condition) runs only in the `app:browser` project (`vite.config.ts`), not in the journeys.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-NAME --kind KIND --cwd /home/user/.wave/veneer-u7 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; the probe's full journeys take `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-NAME/report.json` (this kind leaves `measure.jsonl` and the `journey/*.txt` artifacts; no compare is needed); the `app:browser` file runs take `--kind command` with `./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u7-NAME/report.json --project app:browser tests/app/browser/Showcase.test.ts`; never `cd`; no bash, PowerShell, or Python scripts; another lane may hold the lock for minutes.

## Scope

- **Change (the probe).**
  1. In both files, shadow the imports of `waitForCondition`, `waitForAnimations`, and `waitForEvent` with local functions of the same signatures that record the elapsed milliseconds per wait description (for `waitForAnimations`, a description from the element's tag and first class; for `waitForEvent`, the event name) and delegate.
  2. Print `console.info('Settle probe', JSON.stringify({ variant, family, motion, waits: [{ description, milliseconds }] }))` once per statechart table and per header test (omit `motion` for header tables), and once per other test that took a wait, with `family` set to the test's short name.
  3. For the popover table, time each await in `arrangePopoverVisibility`, `actOnTipControl`, `assertTipVisibility`, and `observeShowcaseStability`, and print `console.info('Popover probe', JSON.stringify({ variant, motion, step, milliseconds }))` entries.
- **Runs.** Full journeys with `--kind journey` until the popover motion=true readings span at least the band ratio (1.1637) or three runs are done. The header settle of `Showcase.test.ts` and the `--timeouts` reading are the second half of U7 and are not in this unit.
- **Off-limits.** Every landing checkout; commits; every file outside the three copies.

## Acceptance criteria

1. Over the probe runs, `durations.ts` (with `--run` for each probe folder) names the slowest settle for each wait description with its run folder, `seconds`, and `outside.seconds`; read its usage line first and report if that table needs `--timeouts`.
2. The report names the popover steps that account for the motion=true excess, run by run, and states whether the probe runs reproduced the 2.75 range.
3. For the held titles the instrument lists over the six eligible runs (read `durations-2026-10-06b.md`: the popover and offcanvas tables, the `pair` header family, the modal motion=false table), the report names the waits that account for each excess in the probe runs, or states that none was found.
4. The report states, per finding, whether the cause is a test wait (the Orchestrator opens a test unit) or engine code (stage B gets a row with the `file:line`).

## Output

Final message: the run table (folder, kind, `seconds`, `outside.seconds`, pass and fail counts); the slowest-settle table per description; the popover step table per run; the held-title findings; the instrument commands you ran; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
