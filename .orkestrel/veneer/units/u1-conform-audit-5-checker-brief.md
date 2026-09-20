# U1-conform audit round 5 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check brief 6 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-brief-6.md`)
against the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-5.patch.txt` (over `d8b0e65`,
every untracked file included), never the report alone. Report each check as `PASS` or `FAIL` with
the exact site:

- **The rewrap.** No line of `tests/setupConformance.ts` exceeds 100 characters (count every line
  of the live file); the `@returns` tag of `extractSpecifiers` reads, with whitespace collapsed,
  "The module specifiers in source order, including type imports, and the literal argument of a
  dynamic import and of a `require(...)` call, each read through {@link extractStringArgument}."
- **The diff's population.** Compare every `index <old>..<new>` blob line of the round-5 patch
  against `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-4.patch.txt`
  (round 4): the only pair that differs is `tests/setupConformance.ts`, and in its hunks the only
  changed lines are the `@returns` tag's lines. Confirm `tmp/audit/u1-conform-status-5.txt`
  equals the round-4 status (`units/u1-conform-status-4.txt`) row for row.

## Output

A table `Check | PASS/FAIL | Site`, one row per check; then one line naming any file whose blob
pair differs from round 4 other than `tests/setupConformance.ts`. No verdict line, no process
diary.
