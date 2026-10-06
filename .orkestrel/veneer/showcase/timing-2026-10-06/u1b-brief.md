# Unit task75-U1b — extend the duration instrument

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer of two paths: `/home/user/veneer/tmp/units/journey-cost/durations.ts` (unit U1's instrument; read it whole first) and the new fixture folder `/home/user/veneer/tmp/units/journey-cost/fixtures/durations/`. Write nothing else; commit nothing (the folder is git-ignored). No Chromium, no Vitest, no lock.

## Objective

Make the instrument executable under rule R as ruled: the band comes from the journey runs passed in (never a default), out-of-band runs are detected from their load, command runs without load are read, the `Settle probe` and `Statechart duration` entries that units U6 and U7 emit are parsed, and each title's slack against a supplied timeout table is printed. Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rule R and § Units U1b (read both before writing).

## Change

1. **Band from inputs.** Compute the band ratio from the journey runs passed in: first the wall ratio over every journey input; then mark out of band each run whose `outside.seconds` exceeds the largest `outside.seconds` of the other inputs times that ratio; then recompute the band ratio over the runs left. An out-of-band run stays in the header (marked) and contributes no reading.
2. **No default band.** Remove the `618.6/494.0` default. Keep `--band A/B` only for an invocation that passes no journey run; exit 64 when neither a journey run nor `--band` is given.
3. **`--omit FILE`** (repeatable): a JSON array of `{ "run": FOLDER_NAME, "title": TITLE }` objects; each omitted pair contributes no reading. The acceptance uses it to omit `completion-b4-journey` for the two titles that read B4's `TAILWIND_READINGS` rows (J4 `compares the three faces through the Stylesheets buttons` and the resolved-values title `reads resolved values, Tailwind readings, the census, and contrast under its declared variant`).
4. **Command runs.** A folder with `report.json` and `end.json` but no `measure.jsonl` file is a command run: its readings carry no load, take the larger of the band ratio and their own ratio as the margin, and take no R5 test.
5. **`Settle probe` entries.** Read lines `Settle probe {"variant":…,"family":…,"motion":…,"waits":[{"description":…,"milliseconds":…}]}` (motion optional) from `journey/*.txt` and from `stdout.log`. Per family, motion, and description print the reading count, minimum, maximum, ratio, the R3 figure (max × margin, rounded up to the next 100 ms), and the slowest run with its `seconds` and `outside.seconds` values.
6. **`Statechart duration` rows.** From the `rows` field (`[{ name, milliseconds }]`) print the minimum and maximum milliseconds per table and row name.
7. **`--timeouts FILE`**: a JSON object from title to timeout in milliseconds. Print each title's slack (timeout minus its maximum) and mark each `Settle probe` R3 figure that is not below the slack of its family and motion's table.
8. Keep `--ceiling MS`, the exit codes 0, 64, and 67, `node:` imports only, and Node 22 type stripping (no build).

## Acceptance criteria

1. Over `jb2-1`, `jb2-2`, `jb2b-1`, `jb2b-2`, `completion-b3-journey-after-4`, and `completion-b4-journey` (folders under `/home/user/veneer/tmp/units/journey-cost/runs/`), it prints the band ratio 1.163657 and the popover motion=true title from 60228.0 to 165767.6 ms with ratio 2.752334, marked R5.
2. With `completion-b3-journey-after-3b` added, it marks that run out of band (116.28 against 72.67) and every figure equals the six-run output.
3. A fixture folder under `fixtures/durations/` with planted `Settle probe` lines and `Statechart duration` entries, and a command-run fixture (`report.json` and `end.json`, no `measure.jsonl`), read as specified; a `--timeouts` fixture yields the slack column and the mark; the `--omit` fixture drops the two titles' `completion-b4-journey` readings.
4. A usage refusal (no journey run and no `--band`; a malformed `--omit` or `--timeouts` file) exits 64; an unreadable report exits 67.
5. `node --check`, `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check`, and `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings` (run from `/home/user/veneer`, absolute path) exit 0 on the instrument.

## Output

Final message: the usage line; per criterion the exact command and the figures or lines it printed; the fixture folder listing; the path of the regenerated table `--out /home/user/veneer/tmp/units/journey-cost/durations-2026-10-06b.md` over the seven runs with the two `--omit` pairs; every deviation (expected, found, evidence, done or not, one hypothesis). Stop and report when a run file's shape differs from the brief. No process diary.
