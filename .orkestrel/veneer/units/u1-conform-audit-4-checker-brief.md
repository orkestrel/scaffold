# U1-conform audit round 4 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check brief 5 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-brief-5.md`)
against the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`) and the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-4.patch.txt` (over `d8b0e65`,
every untracked file included), never the report alone. Report each check as `PASS` or `FAIL` with
the exact site:

- **The parse-option sentence.** In `tests/setupConformance.ts`, the doc block of
  `extractSpecifiers` carries "Parses with the `preserveParens` option disabled, so a parenthesized
  argument or callee reaches the visitor as the expression it wraps." in its description paragraph
  (before the first `@param`), and the `@returns` tag no longer carries a `preserveParens`
  sentence; no line exceeds 100 columns.
- **The thrown text.** In `tests/setupBrowser.ts`, `collectLayer` throws
  `The sheets carry no Veneer cascade`; the `@throws` line reads "An `Error` when `sheets` carries
  no Veneer cascade, so an empty reading is never mistaken for an empty layer."; the string
  `named sheets` appears in neither `tests/setupBrowser.ts` nor `tests/setupBrowser.test.ts`
  except in prose describing a caller naming its sheets; `tests/setupBrowser.test.ts` carries one
  `toThrow('The sheets carry no Veneer cascade')`.
- **The case title.** `tests/setupConformance.test.ts` has an `it` titled `extracts imports and
  re-exports, parenthesized or not, while rejecting comments and strings as module edges` and none
  titled `extracts imports and re-exports while rejecting comments and strings as module edges`.
- **The diff's population.** Compare every `index <old>..<new>` blob line of the round-4 patch
  against `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-3.patch.txt`
  (round 3; the untracked files carry `index 0000000..<hash>` lines too): the pairs that differ
  are exactly `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/setupBrowser.ts`,
  and `tests/setupBrowser.test.ts`. Confirm `tmp/audit/u1-conform-status-4.txt` equals the
  round-3 status (`units/u1-conform-status-3.txt`) row for row. In the four files' hunks that
  differ, confirm every changed line is one of the texts brief 5 names.

## Output

A table `Check | PASS/FAIL | Site`, one row per check; then one line naming any file whose blob
pair differs from round 3 outside the four. No verdict line, no process diary.
