# U3 audit round 10 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-10.md` — that file alone fixes
the claim numbers — and report each check as `PASS` or `FAIL` with the exact site. The checks:

- **Claim 1, presence.** Grep `C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts`
  for each of the six assertions the claim names and report the line of each. In the source a CSS
  backslash is written `\\`, a tab `\t`, and a form feed `\f`.
- **Claim 3, the diff.** In `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-diff-10.patch.txt`
  compare every `index <old>..<new>` blob line against the same lines in
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-diff-9.patch.txt`: every
  file's blob pair is identical except `tests/setupStyles.test.ts`. Report any other file whose
  pair differs. Confirm `tmp/audit/u3-status-10.txt` equals
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-status-9.txt` row for row.
  In the `tests/setupStyles.test.ts` hunks of the round-10 patch that the round-9 patch lacks,
  confirm every added line is an `expect(` line: no `it(` title and no inventory entry changed.
- **Claim 4, law.** Over the added lines only: no `: any`, `as `, `!` assertion, `@ts-`,
  `eslint-disable`, nested `function`; no added line over 100 characters.

Read the live Veneer tree and the rendered diff, never the reports alone. Claims 2 and 5 are not
yours: claim 2 is the report's proof record the lanes read, claim 5 the Orchestrator rules from
the verifier.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; then one line naming any file
whose blob pair differs between the two patches other than `tests/setupStyles.test.ts`. No verdict
line, no process diary.
