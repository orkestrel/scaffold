# U6 audit round 5 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane of the FIFTH audit round
on unit U6 of the Veneer campaign (a hygiene round a native `builder` wrote on round 4's five
findings). Perform the assignment directly and spawn nothing. You edit nothing; you have no
write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-claims-5.md` with
`CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact quoted
text), against the cumulative diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-diff.patch.txt`
and the live files in `C:/Users/mikes/WebstormProjects/test` (`src/browser/helpers.ts`,
`src/browser/constants.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`), the report
`u6-report-6.md`, and round 4's record
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-4.md`,
`units/u6-audit-4-reviewer-report.md`). Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`,
`.claude/rules/tests.md`, `typescript.md`, `writing.md`.

For claim 6, compare the current diff against what round 4 confirmed (the round-4 reviewer report
cites the sites) and report any hunk outside the five items. Add extra findings no claim names,
numbered from 8, each with a site and a one-line failure scenario; distinguish one that forces a
round from a bound.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
