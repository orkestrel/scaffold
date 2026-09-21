# Unit U7b — fix round brief 5: the assertion alias, and the gates to completion

## What changed and why

This brief supersedes `u7b-brief-4.md`; that brief stands (with briefs 3 to 1 it
carries), and `u7b-report-4.md` is the baseline: the prune key landed as root
membership, the two cases reddened on the old key and are green on the new one, and the round
stopped on one lint diagnostic in an owned file. The two new ownership assertions in
`tests/src/browser/Delegate.test.ts` (lines 47 and 53) use the `toThrowError` alias, which
`vitest(no-alias-methods)` refuses; the canonical name is `toThrow`, as line 33 of the same file
already uses. The build gate, the final ordered Chromium run, and the Edge run did not run. The
stop was correct under the carried deviation contract; the correction is the one the diagnostic
names.

## Findings carried

1. (report 4, `lint:check` exit 1) Replace `toThrowError(` with `toThrow(` at the two sites.
   Nothing else in the assertion changes.

## Role, engine, law, context, host, controls, unknowns, output, deviation contract

As in `u7b-brief-3.md`, verbatim. `HEAD` is `91e5906`; the working tree carries the
complete brief-4 result, uncommitted (some additions staged). Continue from it; do not restore
or reset anything. Make no wording, comment, or guide-prose change. Make no code change beyond
the two-token alias replacement.

## Scope

`tests/src/browser/Delegate.test.ts` only. `src/browser/Delegate.ts` is read-only this round.

## Execution

1. Replace the alias at the two sites.
2. Run and record, in this order, each to completion: `npm.cmd run format:check`,
   `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run build:src:browser`,
   `npm.cmd run test:src:browser`, `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser`.
   Set `PLAYWRIGHT_CHANNEL` for the Edge run the way report 3 did.

## Output

Write `u7b-report-5.md` and return its content: the replacement as landed (the two
lines after the edit), each gate's exit code and its final lines on both engines, the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`. Do not repeat reports 1
to 4.

## Acceptance criteria

1. `grep -c toThrowError tests/src/browser/Delegate.test.ts` reads 0.
2. Every gate in item 2 exits 0 on managed Chromium and Edge; the two brief-4 cases and every
   other `Delegate` case are green in both runs.
3. `git status --porcelain --untracked-files=all` shows only brief 3's owned set and the
   reports.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 1 to 4.
