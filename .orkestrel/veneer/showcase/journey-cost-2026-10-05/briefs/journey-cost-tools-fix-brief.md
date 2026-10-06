# Unit journey-cost-tools-fix — Harden the journey run-cost instruments after the falsify round

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with `--sandbox danger-full-access`, working directory `/home/user/veneer` (the instruments live under its ignored `tmp/units/journey-cost/`). Executor: BENCH_ENGINE. You are the sole writer of the five instrument copies under `tmp/units/journey-cost/tools-2/` (byte-equal copies of the live instruments at launch); the live files beside them stay in use by other lanes and are off-limits; the Orchestrator swaps the hardened copies in after the queued runs end.

## Objective

The five instruments refuse the inputs the falsify round showed them accepting, each refusal proved by a planted control in your report, and every recorded reading the landing rests on re-reads unchanged through the hardened instruments.

## Context

- **Evidence.** The round's verdicts: `/home/user/veneer/tmp/units/journey-cost/falsify/verdict-2026-10-05.md` (rulings 1, 3, 4, O1/F4, F5), `tmp/units/journey-cost/falsify/analyst-verdict.md` claims 1, 3, 4 and O1, `tmp/units/journey-cost/falsify/reviewer-verdict.md` claims 3, 4 and findings F4, F5. Instruments: `run.ts` (`:273-318` containment), `measure.ts` (`:262-281` ancestor loop), `mutations.ts` (`:13-19` `Target`, `:52-100` `readSelection`, `:184-192` success), `credit.ts` (`:38`, `:63-90`), `price-evaluate.ts` (`:24-50`). The usage line and exit codes sit in each file's opening comment.
- **Defects to close.**
  1. `run.ts`: the realpath containment at `:305` compares against the instrument root, so `--folder runs/ALIAS/NAME` through a symlink `runs/ALIAS → ../OTHER` creates `OTHER/NAME`. Compare the destination's canonical parent against the canonical admitted root (`runs`, or `gates/COMMIT` for a command) and refuse with 64 otherwise; keep the reused-folder refusal (65) and the lexical check.
  2. `measure.ts`: the ancestor loop overwrites `root` on every matching ancestor; stop at the nearest chromium ancestor without `--type=`. Only `peaks.browsers` changes.
  3. `mutations.ts`: the text path checks no title; require `--reporter=json` with `--outputFile` in the child arguments and refuse (64) without them, deleting the text path. Add an optional `expected` string to `Target`; when present, the red run's selected case must carry it in a `failureMessages` entry, else the target fails as `Red run failed outside the targeted assertion`.
  4. `credit.ts` and `price-evaluate.ts`: a pair whose two sides differ in selected title set, or whose selection carries a non-passed status, is refused (`price-evaluate.ts` prints `refused: <reason>` in the row and exits 67 at the end; `credit.ts` refuses a candidate whose matched titles are not all passed or differ from the baseline's matched titles after folding, printing the titles). Keep host-bound failures visible in the whole-journey row rather than dropping them.
- **Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/typescript.md`; `/home/user/scaffold/.claude/rules/names.md`; the instruments are self-contained scripts with `node:` imports only (their opening comments say so), run unbuilt under Node's type stripping.
- **Host.** Linux; Node with type stripping; the queue lock `/home/user/.wave/journey.lock` is free when you start, and you run no Chromium command: every control here is a Node-level control (a scratch folder, a scratch report JSON, a fake process table) under `tmp/units/journey-cost/falsify/tools-controls/`.
- **Standing conditions.** The recorded run folders under `tmp/units/journey-cost/runs/` are read-only evidence; never write into one. `compare.ts` is not in scope.

## Unknowns

- Whether a `--folder` under `gates/COMMIT/NAME` ever used a symlink: none recorded; the fix treats it the same way.

## Scope

- **Owned.** `tmp/units/journey-cost/tools-2/run.ts`, `tools-2/measure.ts`, `tools-2/mutations.ts`, `tools-2/credit.ts`, `tools-2/price-evaluate.ts` (edit these copies; `run.ts` resolves its `runs` root from its own location, so your containment controls use a scratch `tools-2/runs/` folder); `tmp/units/journey-cost/falsify/tools-controls/**` (your scratch controls); `tmp/units/journey-cost/falsify/tools-report.md`.
- **Shared (report-only).** none.
- **Off-limits.** Every file outside `tmp/units/journey-cost/tools-2/` and `tmp/units/journey-cost/falsify/tools-controls/` and the report, in particular the live `tmp/units/journey-cost/run.ts`, `measure.ts`, `mutations.ts`, `credit.ts`, `price-evaluate.ts`, `compare.ts`, every run folder, and every lane folder.
- **Made false by this change.** none in the tree; the instruments have no suite.
- **Tools and limits.** Node only; no Chromium, no vitest, no commit.

## Execution

Perform the assignment yourself and spawn nothing.

## Output

`tmp/units/journey-cost/falsify/tools-report.md`: for each defect the diff hunk, the planted control (input, expected refusal, observed output and exit), and the re-read of the recorded readings: `node tools-2/price-evaluate.ts` over the pairs of `tmp/units/journey-cost/price-evaluation-lane3-pik.md`, `tmp/units/journey-cost/price-evaluation-lane2-quiet.md`, and `tmp/units/journey-cost/falsify/quiet-price-evaluation.md` (outputs byte-equal to the recorded tables except a refused row, which you name), `node tools-2/credit.ts` with the arguments recorded in `tmp/units/journey-cost/integrated-3/acceptance.txt` writing to `tmp/units/journey-cost/falsify/tools-controls/credit-reread.md` (equal to `tmp/units/journey-cost/integrated-3/credit.md`), and `node tools-2/measure.ts`'s summary logic over the recorded `tmp/units/journey-cost/runs/candidate3-journey-1/measure.jsonl` samples if the file exposes a replay path, else a fake process table showing nearest-ancestor grouping. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a hardened refusal fires on a recorded run the landing rests on, or when a recorded table re-reads differently. Settle message wording yourself.

## Acceptance criteria

1. `node --check` (type stripping) passes on the five files: `node --experimental-strip-types --check FILE` or an equivalent import in a Node one-liner.
2. Each planted control refuses as specified (five controls, one per defect; the `expected` substring control shows a crash red refused and an assertion red accepted).
3. The recorded tables and the credit table re-read unchanged, as the Output names.

**Observations, not criteria.** none.

**Measurement.** none (no cost claim).

## Review evidence

The diff of the five files and `git status --porcelain` (expected empty: the files are ignored), the controls' outputs, and the report.

## Appended ruling (2026-10-05, after the first pass stopped on the whole-journey credit row)

The stop is accepted and the status guard is bounded: `tools-2/credit.ts` refuses a non-passed candidate case only in an item row (a pattern-matched title). The `whole journey (every title)` row never refuses: it drops every title that failed on any side from both sums, prints the dropped titles with the side that failed them, and labels the row `excluding N failed titles`. A baseline failure is dropped the same way. The re-read of `integrated-3/credit.md` therefore differs in exactly that row, and the acceptance reads: every item row byte-equal, the whole-journey row carrying the dropped titles (J8 and the accordion motion=false table on the candidate runs; the collapse, accordion, and popover tables on the baselines as `jb0-1-vs-jb0-2.md` names) and a floor recomputed over the remaining titles. `falsify/quiet-price-evaluation.md` exists at `/home/user/veneer/tmp/units/journey-cost/falsify/quiet-price-evaluation.md` (12 runs, written 18:00 UTC); re-read it with `tools-2/price-evaluate.ts` and require byte equality or name the refused row. Append the second pass to `falsify/tools-report.md` under a dated heading; keep the first pass's text.
