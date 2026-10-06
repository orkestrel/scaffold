# Unit task75-U9b — measured bounds land by the adequacy ruling

## Role and engine

`builder` unit (Opus) under `/home/user/scaffold/.claude/agents/builder.md`. You are the sole writer in `/home/user/.wave/veneer-containment`, a detached veneer worktree at `ee10c3c` that carries the U9 lane's uncommitted diff in three files (`tests/setupBrowser.ts`, `tests/app/browser/integration.test.ts`, `tests/integration.test.ts`). Owned files: those three and `tests/setupBrowser.test.ts`. Every other path in the worktree, every tracked path under `/home/user/veneer`, and `/home/user/scaffold` are off-limits. Nothing is committed.

## Objective

Land the Orchestrator's adequacy ruling of 2026-10-06 (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rule R clause 4, the amendment paragraph): the band for any figure is never below 1.1637; a measured figure lands only where it raises the bound it replaces or where that bound fails the adequacy check (bound ≥ slowest eligible reading × margin, rounded as the clause requires, plus the inner ceiling); a bound that passes keeps its figure and gains the rule R7 comment. The U9 lane's seven table figures (margins 1.04 to 1.08 over a two-run band) and its 8,000 ms witness figure do not land; its fifteen `COMPONENT_WAIT` budgets do.

## Change

Work from the committed `ee10c3c` text of each file (`git -C WT show HEAD:PATH` prints it; writing that text over the file is permitted, `git checkout`, `git restore`, `git stash`, and `git reset` are not) and apply only the following.

1. `tests/setupBrowser.ts`: the file equals `HEAD` except the `COMPONENT_WAIT` block, which becomes exactly:

   ```ts
   /** Budgets component statechart conditions under concurrent journey load. */
   // Rule R3 reads 1,600 ms over task75-u7-probe-1, -2, task75-u7b-header-1, and
   // -2: the slowest settle is the showcase scroll settle, 888.3 ms (scrollspy-390,
   // motion true, task75-u7-probe-2), times the 1.6915 shared margin. The budget
   // keeps 5,000 ms, 5.6 times that settle, under the adequacy ruling: a measured
   // figure raises a bound and never lowers one that passes, because the suites
   // also run on hosts this session cannot measure.
   export const COMPONENT_WAIT: WaitOptions = Object.freeze({ budget: 5_000 })
   ```

   The lane's `COMPONENT_TABLE_BUDGETS`, `HEADER_TABLE_BUDGETS`, and `WITNESS_LONGHAND_BUDGET` additions are gone (they are not in `HEAD`).
2. `tests/setupBrowser.test.ts`: the two control comments `// 1,100 ms exceeds the library's 1,000 ms default and fits the 1,600 ms measured budget.` become `// 1,100 ms exceeds the library's 1,000 ms default and fits the 5,000 ms budget.`; both controls keep `duration: 1_100`.
3. `tests/app/browser/integration.test.ts`: the file equals `HEAD` plus (a) the lane's fifteen budget additions, each a `COMPONENT_WAIT` third argument on a `waitForCondition` call that `HEAD` passes two arguments to (the lane's diff against `HEAD` shows them; descriptions and predicates stay byte for byte; `COMPONENT_WAIT` is already imported in `HEAD`), and (b) three rule R7 adequacy comments, each one or two `//` lines directly above the bound it describes, with figures you read from the instrument tables named in § Evidence:
   - above the component tables' shared timeout expression (`10_000 + Math.max(...COMPONENT_TABLES.map(({ scenarios }) => scenarios.length)) * 2500`): the expression yields 230,000 ms at 88 scenarios; the slowest table reading over the post-U7c runs is SLOWEST_TABLE ms (TABLE_TITLE, RUN); times 1.1637, rounded up to a whole second, plus 1,600 is FIGURE ms, below the bound;
   - above the header families' `120_000` at the header registration: slowest SLOWEST_HEADER ms (FAMILY, RUN); the same arithmetic; below the bound;
   - above the preservation case's `300_000`: slowest SLOWEST_PRESERVATION ms (WIDTH px, RUN); the same arithmetic; below the bound.
   The registration code stays as in `HEAD` (no `it.each([registration])`, no map lookups).
4. `tests/integration.test.ts`: the file equals `HEAD` plus an explicit third argument `15_000` on the witness case `reads equal witness longhands in both raw composition orders and rejects a planted difference`, preceded by a one- or two-line `//` comment: slowest 6,833.6 ms (task75-u9-integration-2) times 1.1637, rounded up to a whole second, is 8,000 ms with no inner ceiling; the 15,000 ms Vitest default passes and stays, made explicit.

## Evidence for the comments

- Component and preservation readings: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-journey-final/durations-post-u7c.md` (the title table's `Max ms` column and its `Slowest run` cell). Expected: the slowest table is `scrollspy-390` motion=true near 73,352.0 ms; the slowest header family is `face` near 37,215.6 ms; the preservation 1280 px title near 100,081.4 ms. Cite the figures the table prints.
- Witness reading: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-integration-2/durations-witness.md` (expected 6,833.6 ms in `task75-u9-integration-2`).
- Arithmetic: FIGURE = ceil(SLOWEST × 1.1637 / 1000) × 1000 + 1,600 for journey titles; the witness adds no ceiling.

## Gates, in this order

`WT` stands for `/home/user/.wave/veneer-containment` and `RUNS` for `/home/user/veneer/tmp/units/journey-cost/runs`; write both out in full. Direct (no browser): 1. `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check` on the four owned files exits 0; 2. `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings` on the four files exits 0; 3. `git -C WT diff --check` exits 0 and `git -C WT status --porcelain` lists exactly the four owned files; 4. `rg -n 'COMPONENT_TABLE_BUDGETS|HEADER_TABLE_BUDGETS|WITNESS_LONGHAND_BUDGET|1_600|1,600 ms measured' WT/tests` exits 1 (the R3 comment names "1,600 ms" without "measured budget", so it is not a match); 5. a balanced-parenthesis scan (a Node one-liner or a small `node file.ts` you delete afterwards) finds no two-argument `waitForCondition(` call in `WT/tests/app/browser/integration.test.ts` and seventeen calls in total; 6. `git -C WT diff HEAD --stat` shows the four files and the `tests/app/browser/integration.test.ts` diff adds lines only (no `-` line other than the fifteen reformatted call sites' originals).

Through the host queue, one at a time, a fresh folder each (`flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder RUNS/NAME --kind KIND --cwd WT -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`; a reused folder exits 65; `--kind journey` only for the full journey, which also takes `--outputFile=RUNS/NAME/report.json`):

7. `task75-u9b-typecheck-1`, command: `WT/node_modules/.bin/tsc --noEmit --project WT/tsconfig.json` exits 0.
8. `task75-u9b-setup-1`, command: `WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=RUNS/task75-u9b-setup-1/report.json --project setup:browser WT/tests/setupBrowser.test.ts` exits 0 with every test passed (147 expected).
9. `task75-u9b-showcase-1`, command: the same vitest invocation with `--outputFile=RUNS/task75-u9b-showcase-1/report.json --project app:browser WT/tests/app/browser/Showcase.test.ts`; every test passed (22 expected).
10. `task75-u9b-integration-1`, command: `WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=RUNS/task75-u9b-integration-1/report.json --project integration`; every test passed (60 expected).
11. `task75-u9b-journey-1`, `--kind journey`, command: `CAPTURE=0 WT/node_modules/.bin/vitest run --config WT/configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=RUNS/task75-u9b-journey-1/report.json`; 94 passed; then confirm every `fullName` in that `report.json` appears in `RUNS/jb2b-1/report.json` (a Node one-liner; expected 94 of 94). The Orchestrator runs `compare.ts`.

A run that dies before any test body on a Vite optimizer import failure gets one re-run in a fresh `-2` folder. Any other failure stops the unit: report the failing title, the bare error line, and the folder, and change nothing further.

## Off-limits

Any predicate, description, or title; the registration code; the library default; `guides/`; `compare.ts`; running vitest or tsc outside the queue; `cd`; `git stash`, `git checkout`, `git restore`, `git reset`, `git commit`.

## Output

Final message: `git -C WT diff HEAD --stat`; the `COMPONENT_WAIT` block, the four adequacy comments with their bounds as they stand in the files, and the witness call's closing lines (as `git diff -U1` hunks); `git status --porcelain`; each gate's command, folder, exit, and bare result (the `numPassedTests`/`numTotalTests` of each `report.json`, the wall seconds from `end.json`); every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
