# Unit U7b — fix round brief 6: the formatter on the owned file, and the gates to completion

## What changed and why

This brief supersedes `u7b-brief-5.md`; that brief stands (with briefs 4 to 1 it
carries), and `u7b-report-5.md` is the baseline: the `toThrow` replacement landed at
both sites, and `npm.cmd run format:check` exits 1 naming `tests/src/browser/Delegate.test.ts`
because the shortened calls fit the formatter's line width and the multi-line shape brief 4
wrote no longer matches. Brief 5 forbade any change beyond the alias, so the stop was correct;
the prohibition was the Orchestrator's error. The remaining gates did not run.

## Findings carried

1. (report 5, `format:check` exit 1) Reformat the owned file with the formatter itself, scoped
   to that file. Brief 1's bar on a tree-wide `format` stands; the scoped run on the owned file
   is the permitted form. The Orchestrator probed the path form read-only on the host:
   `npx.cmd oxfmt --config .oxfmtrc.json --check tests/src/browser/Delegate.test.ts` exits 1
   naming the file and reports `Finished in 2ms on 1 files`, and the same command on
   `tests/src/browser/Button.test.ts` exits 0.

## Role, engine, law, context, host, controls, unknowns, output, deviation contract

As in `u7b-brief-3.md`, verbatim. `HEAD` is `91e5906`; the working tree carries the
complete brief-5 result, uncommitted (some additions staged). Continue from it; do not restore
or reset anything. Make no wording, comment, or guide-prose change. Make no code change by
hand: the formatter's rewrite of the owned file is the only edit this round.

## Scope

`tests/src/browser/Delegate.test.ts` only, written by the formatter. `src/browser/Delegate.ts`
is read-only this round.

## Execution

1. Run `npx.cmd oxfmt --config .oxfmtrc.json --write tests/src/browser/Delegate.test.ts` from
   the checkout root. Read the file's diff against the index (`git diff -- tests/src/browser/Delegate.test.ts`)
   and confirm the formatter touched only the two `toThrow` calls; a wider rewrite is a stop
   under the deviation contract, reported with that diff.
2. Run and record, in this order, each to completion: `npm.cmd run format:check`,
   `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run build:src:browser`,
   `npm.cmd run test:src:browser`, then the Edge run through the launcher report 3 records
   (`cmd /c tmp\u7b\edge.cmd test:src:browser`, which sets `PLAYWRIGHT_CHANNEL=msedge`).

## Output

Write `u7b-report-6.md` and return its content: the two calls as the formatter left
them, each gate's exit code and its final lines on both engines (the Delegate file's case
counts included), the actual `git diff --stat` and `git status --porcelain --untracked-files=all`.
Do not repeat reports 1 to 5.

## Acceptance criteria

1. `npm.cmd run format:check` exits 0 and the formatter's rewrite reached only the two
   `toThrow` calls.
2. Every gate in item 2 exits 0 on managed Chromium and Edge; the two brief-4 cases and every
   other `Delegate` case are green in both runs.
3. `git status --porcelain --untracked-files=all` shows only brief 3's owned set and the
   reports.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 1 to 5.
