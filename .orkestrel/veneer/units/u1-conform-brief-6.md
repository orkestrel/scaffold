# Unit U1-conform — successor brief 6: one doc-block line rewrapped

## What changed and why

This brief supersedes `u1-conform-brief-5.md` for the remainder of the unit; briefs 1 to
5 stand except where this one says otherwise, and `u1-conform-report-5.md` is the
baseline. The fourth audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-verdict-4.md`)
confirmed brief 5 and found one line past the 100-column width the unit holds TSDoc to: the
second line of the `@returns` tag in the doc block of `extractSpecifiers`
(`tests/setupConformance.ts:121`, 101 columns).

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. Sole writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing;
no `scaffold repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git add`.

## Scope

**Owned.** `tests/setupConformance.ts` (the `@returns` tag of `extractSpecifiers` alone), the
report. **Off-limits.** Everything else.

## Execution

Perform the assignment directly and spawn nothing.

1. Rewrap the `@returns` tag of `extractSpecifiers` (lines 120 to 121 of
   `tests/setupConformance.ts`) so no line exceeds 100 columns and the words are unchanged: the
   tag reads "The module specifiers in source order, including type imports, and the literal
   argument of a dynamic import and of a `require(...)` call, each read through
   {@link extractStringArgument}." across as many lines as that needs. Change no other line.
2. Run `awk 'length > 100' tests/setupConformance.ts` and record that it prints nothing; run
   `npm run format:check`, `npm run lint:check`, and `npm run test:setup`; record each command's
   final lines.

## Output

Write `u1-conform-report-6.md` and return its content: the diff; the `awk` reading;
each command's final lines; `git status --porcelain` (tracked rows only); deviations in the usual
shape.

## Deviation contract

Stop and report on: a gate red; a need to edit any other line. Nothing is left to decide.

## Acceptance criteria

1. No line of `tests/setupConformance.ts` exceeds 100 columns; the `@returns` words are unchanged.
2. `format:check`, `lint:check`, and `test:setup` exit 0.
3. `git status --porcelain` lists report 5's tracked rows exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
