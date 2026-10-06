# Unit completion-a7: full-suite reading on the landed tree

Route: verifier (read-only; edits no source). Subject: veneer `main` at `3f8a870` in the checkout `/home/user/veneer` (built `dist/`, `node_modules` installed; npm 11 at `/home/user/.wave/npm11/node_modules/.bin` goes first on `PATH`). The Orchestrator is the only writer in that checkout; you write only under `/home/user/veneer/tmp/units/completion/a7/`.

Closes: flip FV-X2, flip FV-O1 (rest), flip FV-D12 (Vue half), flip FV-D10 (packed half), units npm-test-whole, units packed-scss-distribution (run half), lanes TW-10 (rest) of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md` § A7 (lines 154-166).

## Host queue

Every command that launches Chromium or loads the CPU runs through the host queue, one at a time, with a distinct folder per run:

```text
PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH flock -x /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/a7-NAME --kind command --cwd /home/user/veneer -- COMMAND
```

`run.ts` refuses a reused folder (exit 65). It records `stdout.log`, `stderr.log`, the argv, timestamps, and the child's exit in the folder. Read the child's exit from the folder's manifest, not from the wrapper alone.

## The readings, in this order

1. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core` (folder `a7-src-core`).
2. The same with `--project app:core` (folder `a7-app-core`).
3. `npm run test:src:styles` (folder `a7-src-styles`).
4. `npm run test:src:vue` (folder `a7-src-vue`).
5. `npm run test:app:vue` (folder `a7-app-vue`).
6. `npm run test:journey:vue` (folder `a7-journey-vue`).
7. `npm run test:config` (folder `a7-config`).
8. `npm run test:distribution` (folder `a7-distribution`). Read its verbose titles too: run `./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=verbose --project distribution` (folder `a7-distribution-verbose`) and record the titles of the two packed `./tailwindcss/scss` cases and their outcome (passed, or skipped with the entry condition the log names).

For every run record: the command, the folder, the child exit, the Vitest summary line (`Tests N passed | M failed | K skipped`), the duration line, and each failing title with its first cause line. A timeout of one case is a failure to record, with its budget and the measured time.

## Coverage proof

Run `git -C /home/user/veneer diff --stat 4d21de7 HEAD` and `git -C /home/user/veneer diff --name-only 4d21de7 HEAD`. For each changed path, state which Vitest project collects it, by reading the `include` globs and `setupFiles` of `vite.config.ts`, `configs/src/vite.styles.config.ts`, `configs/src/vite.vue.config.ts`, `configs/app/vite.vue.config.ts`, and `configs/app/vite.journey.config.ts` (the `vue` mode). A path a listed project collects, directly or through a setup file it imports, means that project's reading in `gates-4d21de7.txt` (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/tokens-landing/gates-4d21de7.txt:9-45`) is superseded by the reading you take here; a path no listed project collects keeps its earlier reading, and you name the unit whose gate last read it (the commit message of the last commit touching it).

## Acceptance

Every failure is a title in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Host-bound set, and the distribution cases ran (not skipped for a missing pack). A failure outside the set blocks stage B and is reported as such, with its cause line; do not re-run it more than once, and only when its cause is a budget timeout of an unchanged case (the one re-run rule of the journey unit).

## Return shape

Write `/home/user/veneer/tmp/units/completion/a7/report.md` with: the subject commit and date; one table of the eight readings (command, folder, exit, passed, failed, skipped, duration); the failing titles with causes and whether each is in § Host-bound set; the packed case titles and outcomes; the coverage table; and the gate-file lines in the shape of `gates-4d21de7.txt` as a fenced block the Orchestrator copies to `tailwind-flip/units/tokens-landing/gates-3f8a870-a7.txt`. Your final message is that report's first paragraph and the path.

## Forbidden

No edit outside `/home/user/veneer/tmp/units/completion/a7/`; no `git` write command; no install; no run outside the queue; no claim without its folder.
