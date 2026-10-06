# Unit task75-U1 — the duration table instrument

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer of one file: `/home/user/veneer/tmp/units/journey-cost/durations.ts`. Write nothing else; commit nothing (the folder is git-ignored). No Chromium, no Vitest, no lock: the instrument reads files that finished runs left.

## Objective

A Node TypeScript instrument, run with `node durations.ts` under Node 22 type stripping (no build; `node:` imports only, like the sibling `compare.ts` and `measure.ts`), that turns the files a journey run leaves into a duration table per test title, with the figures rule R of the task 75 design verdict needs (`/home/user/scaffold/tmp/claude/task75-design-verdict-draft.md`, § Rulings 1 and § Units U1; read both before writing).

## Context

- Run folders sit under `/home/user/veneer/tmp/units/journey-cost/runs/<NAME>/`. Each full journey run holds `report.json` (Vitest's JSON reporter: `testResults[].assertionResults[]` with `fullName`, `status`, `duration` in ms, and the file `name`), `end.json` (`seconds`), `measure.jsonl` (one JSON object per line; the last line is the summary with `outside.seconds`, read how `measure.ts:194-204` writes it), and `journey/<variant>.txt` (the per-variant log: rows, lines, and Journal entries; a `Statechart duration` timing entry appears only on trees that carry unit U6, so its absence is not an error).
- The six band runs: `jb2-1`, `jb2-2`, `jb2b-1`, `jb2b-2`, `completion-b3-journey-after-4`, `completion-b4-journey`. The out-of-band run: `completion-b3-journey-after-3b`. Read the real files; take no figure from this brief on trust.
- Rule R (verdict § Rulings 1): the margin is the larger of the band ratio 618.6/494.0 and the title's own slowest/fastest ratio over the eligible runs (two readings minimum); a wait budget (R3) is the slowest reading × margin rounded up to the next 100 ms; a test timeout (R4) is the slowest reading × margin rounded up to the next whole second, plus the largest inner ceiling (a caller-supplied figure, `--ceiling MS`, default 0); R5 marks a title whose own ratio exceeds the band ratio while its slow readings do not follow `outside.seconds` (state the test you apply and print the inputs).
- Eligibility (R1): a run counts for a title only when the title passed in that run; a failed run still contributes `outside.seconds` and `seconds` to the table's header.

## Scope

- **Usage.** `node durations.ts --run DIR [--run DIR ...] --out FILE [--ceiling MS] [--band A/B]`; `--run` repeats; `--band` defaults to `618.6/494.0`. Exit 0 when the file is written; 64 on a usage refusal (missing `--run`, `--out`, a malformed `--band`); 67 on an unreadable or malformed `report.json`, `end.json`, or `measure.jsonl` summary (name the file in the message).
- **Output.** Markdown at `--out`: a header table per run (folder, `seconds`, `outside.seconds`, passed/failed counts), then one row per title keyed by variant where the `journey/*.txt` timing entry or the test file name gives one (otherwise mark `unattributed` when the same title appears in several variants with no variant key): minimum, maximum, ratio, R3 figure, R4 figure, R5 mark, and the runs behind the min and max.
- **Off-limits.** Every other file; any run folder (read only); `compare.ts`, `run.ts`, `measure.ts`.

## Acceptance criteria

1. Over the six band runs the table reproduces, for `showcase statecharts > drives the 'popover' table through its controls with motion=true` (the light-1280 variant), durations 102631.9 ms (`jb2b-1`), 69602.4 ms (`jb2b-2`), and 165767.6 ms (`completion-b4-journey`), and marks the title R5 with its ratio printed.
2. It reproduces `outside.seconds` 58.14 for `jb2b-1` and 116.28 for `completion-b3-journey-after-3b` when that run is passed too, and `seconds` for each run from `end.json`.
3. `node --check` passes; `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check` and `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings` on the file exit 0 (run from `/home/user/veneer`, absolute path to the file).
4. A run with a missing `--out` exits 64; a run naming a folder without `report.json` exits 67.

## Output

Final message: the usage line, the exit-code table, the acceptance evidence (the exact command for criterion 1 and the three durations it printed, the two `outside.seconds` values, the format and lint results, the two refusal exits), and the path of the table written for the seven runs (`--out /home/user/veneer/tmp/units/journey-cost/durations-2026-10-06.md`). Stop and report (expected, found, evidence, done or not, one hypothesis) when a run file's shape differs from this brief.
