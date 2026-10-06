# Unit task75-U9 — measured test timeouts

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-containment` (a detached veneer worktree at `ee10c3c`, which carries units U3 to U8; `node_modules` installed, `dist` built). Owned files: `tests/setupBrowser.ts`, `tests/app/browser/integration.test.ts`, `tests/integration.test.ts`. Commit nothing; the Orchestrator lands.

## Objective

Replace the three unmeasured test timeouts with figures rule R4 derives from runs on this tree: each component table's shared `10_000 + max(scenarios) × 2500` expression and the header tables' 120_000 give way to per-table and per-family entries in two maps; the preservation case's 300_000 is re-derived; the synchronous witness-longhand case of the integration project (`reads equal witness longhands in both raw composition orders and rejects a planted difference`, 14.1 s of Vitest's 15 s default under load on 2026-10-05) gets an explicit measured timeout. Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 1 and 4, § Rule R, and § Units U9 (read them first; line numbers there were read at veneer `90b96bb`; re-locate by text in `/home/user/.wave/veneer-containment`). The Orchestrator's ruling on unit U7's diagnosis: the popover motion=true spread was the arrangement opening the next specimen's popover without dismissing the previous one, whose panel covered the next trigger, so Playwright retried the click under smooth scrolling; unit U7c dismisses the other popover first and the table reads 19.8 s (`runs/task75-u7c-journey-1`) against 60.2 to 230.3 s before; stage B gets no row; the table is measured again in this unit's runs and takes its figure by R4 if the instrument no longer holds it. Held titles, which land no figure: whatever the instrument holds over this unit's runs plus the eligible runs after U7c (`task75-u7c-journey-1` and later; earlier runs carry the popover obstruction and the pre-U3 count race, so pass them only where the title's code is unchanged, and omit the popover table's pre-U7c readings through `--omit`); a title held there lands no figure, and the report lists it with its ratio and the inversion pair.

## Context

- `COMPONENT_WAIT` is 1,600 ms after U8 (rule R3 under the 2026-10-06 amendment: per-run slowest `Settle probe` readings per pool, a 150 ms counting floor, the shared margin 1.6915 over the 888.3 ms scroll settle); pass `--ceiling 1600` to the instrument. The instrument's § Settle probes table reads per-run slowest readings and ends with a shared-budget block; the title table that R4 reads is unchanged.
- Rule R4: a test timeout is the slowest eligible reading times the margin (the larger of the band ratio and the title's own ratio), rounded up to the next whole second, plus the largest inner ceiling the test uses (`COMPONENT_WAIT` after U8; nothing for a test with no inner wait). Rule R7: a constant with a comment naming the runs, the slowest reading, and the margin. The instrument `/home/user/veneer/tmp/units/journey-cost/durations.ts` computes R4 with `--ceiling MS`; run it over at least two full journey runs on this tree that pass every title (make them through the queue first; name them in the R7 comments), plus unit U8's acceptance run.
- Vitest takes one timeout per `it.each` call, and its title template formats `$family` and `$motion` from the row, so registering each table through `it.each([row])` under the unchanged template keeps every title byte-identical.
- Names ruled: `COMPONENT_TABLE_BUDGETS` (keyed by family and motion) and `HEADER_TABLE_BUDGETS` (keyed by family) in `tests/setupBrowser.ts`; the rows of `COMPONENT_TABLES` describe scenarios and carry no host measurement. A table or family the map lacks keeps its present figure (the expression, or 120_000); a held title has no map entry.
- The witness case's figure comes from two queued `--kind command` runs of the integration project with the JSON reporter (`./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --reporter=json --outputFile=… --project integration`), using the case's own ratio against the band ratio, no inner ceiling, and no R5 test.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u9-NAME --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; file, filtered, and project runs take `--kind command` with an absolute `--outputFile`; a full journey takes `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-NAME/report.json`; never `cd`; no bash, PowerShell, or Python scripts; one re-run for a Vite optimizer import failure before any test body; the journey host-bound set is empty.

## Scope

- **Change.**
  1. Take the measurement runs (two full journeys passing every title; two integration-project command runs); run the instrument with `--ceiling` set to the `COMPONENT_WAIT` budget and with `--omit` for the two B4 readings titles on `completion-b4-journey`, over the measurement runs and the eligible runs the verdict names.
  2. Add `COMPONENT_TABLE_BUDGETS` and `HEADER_TABLE_BUDGETS` with the unheld tables' and families' R4 figures and R7 comments; register each component table through `it.each([row])` with its map entry or the present expression as the timeout, and each header family with its map entry or 120_000; delete the shared expression and the bare 120_000 where a map entry replaces them.
  3. Re-derive the preservation case's timeout from its own durations on this tree, with an R7 comment.
  4. Give the witness case an explicit timeout by R4 with an R7 comment.
  5. Pass `COMPONENT_WAIT` as the third argument of every `waitForCondition` call in `tests/app/browser/integration.test.ts` that passes two arguments (fifteen calls on the U8 tree: `focus lands on the main region`, the alert, notice, archive dialog, upload toast, end panel, and refusal fixture waits), keeping every predicate and description; these waits read up to 397.8 ms (`the dismissible alert leaves the Alerts section`, `task75-u7-probe-2`) on the library's unmeasured 1,000 ms default. The `Oracle frame resize` wait in `tests/setupBrowser.ts` belongs to the oracle harness and stays.
- **Off-limits (must not change).** Scenario lists or their order, the harness, inner budgets, `compare.ts`, every file under `src/`, any row or Journal entry, any title.

## Acceptance criteria

1. Format and lint on the owned files exit 0; `tsc --noEmit --project tsconfig.json` through the queue exits 0.
2. Every journey title is byte-identical to its title in `/home/user/veneer/tmp/units/journey-cost/runs/jb2b-1/report.json`; the witness title is byte-identical to its title in the integration command runs.
3. A queued full journey run passes 94 of 94; the Orchestrator compares it against U3's baseline pair (expected: exit 0, no `Host-bound title absent` line).
4. The instrument reproduces each landed figure and lists each held title; neither map has an entry for a held title.
5. The integration project passes through the queue with the new timeout.
6. `git status --porcelain` lists only the three owned files.
7. A balanced-parenthesis scan of `tests/app/browser/integration.test.ts` finds no `waitForCondition(` call with two arguments.

## Output

Final message: the figure table (title, runs, slowest reading, margin, ceiling, figure); the diff; `git status --porcelain`; each gate's command, folder, exit, and bare result line; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
