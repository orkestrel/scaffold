# U6 audit round 6 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane of the SIXTH audit round
on unit U6 of the Veneer campaign (a prose-and-one-assertion round a native `builder` wrote on
round 5's findings). Perform the assignment directly and spawn nothing. You edit nothing; you
have no write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-claims-6.md` with
`CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact quoted
text), against the cumulative diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-diff.patch.txt`,
the live files in `C:/Users/mikes/WebstormProjects/test` (`src/browser/helpers.ts`,
`tests/src/browser/helpers.test.ts`, `guides/test.md`), the reports `u6-report-7.md` and `u6-report-8.md`, and
round 5's record (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-5.md`,
`units/u6-audit-5-reviewer-report.md`, `units/u6-audit-5-analyst-report.md`). Law:
`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`,
`writing.md`.

For claim 5, compare the current diff hunk by hunk against the round-5 tree (the round-5 reviewer
report cites the hunk sizes) and report any hunk outside the four items. Add extra findings no
claim names, numbered from 7, each with a site and a one-line failure scenario; distinguish one
that forces a round from a bound.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
