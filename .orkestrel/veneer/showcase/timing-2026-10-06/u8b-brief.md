# Unit task75-U8b — `COMPONENT_WAIT` takes the ruled figure and the gates re-read

## Role and engine

`builder` unit (Opus) under `/home/user/scaffold/.claude/agents/builder.md`. You are the sole writer in `/home/user/.wave/veneer-containment`, a detached veneer worktree at `d050da2` that carries unit U8's uncommitted diff in four files (`git status --porcelain` lists exactly them). Owned files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`. Every other path in the worktree, every path under `/home/user/veneer` other than the run folders this brief names, and `/home/user/scaffold` are off-limits. Nothing is committed.

## Objective

Land the Orchestrator's ruling of 2026-10-06 on rule R3's margin in the constant U8 derived: `COMPONENT_WAIT` is 2,600 ms, with the rule R7 comment naming the runs, the slowest reading, and the margin. Governing record: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rule R clause 3 (the amendment paragraph) and `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` (the entry "task 75 unit U8: the shared budget's margin ruled").

## Change

1. In `tests/setupBrowser.ts`, replace the four comment lines and the declaration that follow the TSDoc line `/** Budgets component statechart conditions under concurrent journey load. */` (the block that reads `R3 over task75-u7-probe-1/-2 …` and ends `export const COMPONENT_WAIT: WaitOptions = Object.freeze({ budget: 32_600 })`) with exactly:

   ```ts
   // Rule R3 over task75-u7-probe-1, -2, task75-u7b-header-1, and -2: the slowest
   // settle is the showcase scroll settle, 888.3 ms (scrollspy-390, motion true,
   // task75-u7-probe-2). The shared margin is the largest own ratio over per-run
   // slowest readings, 2.8911 (animations div.offcanvas, 71.7 ms over 24.8 ms),
   // above the 1.1637 band. ceil(888.3 * 2.8911 / 100) * 100 = 2,600.
   export const COMPONENT_WAIT: WaitOptions = Object.freeze({ budget: 2_600 })
   ```

   The TSDoc line stays.
2. In `tests/setupBrowser.test.ts`, the two comment lines `// 1,100 ms exceeds the library's 1,000 ms default and fits the 32,600 ms measured budget.` become `// 1,100 ms exceeds the library's 1,000 ms default and fits the 2,600 ms measured budget.` The two controls keep their 1,100 ms durations.
3. Nothing else changes. U8's other hunks (every `waitForAnimations` call and every budget-less Showcase `waitForCondition` call taking `COMPONENT_WAIT`, the `settleShowcaseScroll` literal replaced, the budgeted `waitForAnimations` control) stay byte for byte.

## Gates, in this order

Run the first five directly; they load no browser. `WT` stands for `/home/user/.wave/veneer-containment` and `RUNS` for `/home/user/veneer/tmp/units/journey-cost/runs`; write both out in full in every command.

1. Format: `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check WT/tests/setupBrowser.ts WT/tests/setupBrowser.test.ts WT/tests/app/browser/integration.test.ts WT/tests/app/browser/Showcase.test.ts` exits 0.
2. Lint: `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings` on the same four files exits 0.
3. Single-argument grep: `rg -n -U --pcre2 'waitForAnimations\((?:[^(),]|(?<nested>\((?:[^()]|(?&nested))*\)))*\)'` on the four files exits 1 (no match).
4. `git -C WT diff --check` exits 0; `git -C WT status --porcelain` lists exactly the four owned files; `rg -n '32_600|32,600' WT/tests` exits 1.
5. `rg -n 'budget: 2_600' WT/tests/setupBrowser.ts` finds exactly the declaration.

Every remaining gate runs through the host queue, one at a time, with a fresh folder each:
`flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder RUNS/NAME --kind KIND --cwd WT -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`
(a reused folder exits 65; `--kind journey` only for the full journey run, which also takes `--outputFile=RUNS/NAME/report.json`; the file runs take `--kind command`).

6. Typecheck, folder `task75-u8b-typecheck-1`, `--kind command`: `WT/node_modules/.bin/tsc --noEmit --project WT/tsconfig.json` exits 0.
7. Setup file run, folder `task75-u8b-setup-1`, `--kind command`: `WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=RUNS/task75-u8b-setup-1/report.json --project setup:browser WT/tests/setupBrowser.test.ts` exits 0 and every test passes (U8 read 147 passed).
8. Showcase file run, folder `task75-u8b-showcase-1`, `--kind command`: the same vitest invocation with `--outputFile=RUNS/task75-u8b-showcase-1/report.json --project app:browser WT/tests/app/browser/Showcase.test.ts`; exits 0, every test passes (U8 read 22 passed).
9. Full journey, folder `task75-u8b-journey-1`, `--kind journey`: `CAPTURE=0 WT/node_modules/.bin/vitest run --config WT/configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=RUNS/task75-u8b-journey-1/report.json` exits 0 with 94 passed (U8 read 94 of 94 in 602.11 s). The Orchestrator compares this run against U3's baseline pair afterwards; do not run `compare.ts` yourself.

A run that dies before any test body on a Vite optimizer import failure gets one re-run in a fresh folder (`-2`). Any other failure stops the unit: report it with the failing title, the bare error line, and the run folder, and change nothing further. A failure line of the form `did not settle within 2600ms` or `… within the 2600 ms budget` is a rule R6 reading: quote it verbatim with its title and variant.

## Off-limits

Any file outside the four owned files; any test timeout, predicate, or title; the library default; `/home/user/veneer`'s tracked files; `compare.ts`; `git stash`, `git commit`, `git checkout`, and `git reset`; running vitest or tsc outside the queue; `cd` in a shell command.

## Output

Final message: the two changed hunks (`git -C WT diff -U2 -- tests/setupBrowser.ts tests/setupBrowser.test.ts`, the `COMPONENT_WAIT` declaration hunk and the two comment hunks only); `git -C WT status --porcelain`; for each gate its command, folder, exit code, and bare result line (the `Tests` line for vitest runs, the wall seconds from the folder's `end.json`); every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
