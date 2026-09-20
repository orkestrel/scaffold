# U3-policy audit round 6 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane (correctness, constraints,
what the code and contracts permit, portability across fleet targets). Perform the assignment
directly and spawn nothing. You edit nothing; you have no write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u3-policy-audit-claims.md`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact text),
reading the cumulative diff `tmp/audit/u3-policy-diff-6.patch` and the live files, never the
reports alone. Claim 7 is the subjective lane's; rule on it briefly. Add extra findings no claim
names, numbered from 9, each with a site and a one-line failure scenario; distinguish a finding
that forces another round from one worth recording as a bound; a wording preference that changes
no behaviour and breaks no rule is neither.

## Context

The prior rounds' reports and briefs sit under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-policy-*`. Read
`u3-policy-review-report-5.md` for the findings this round must show closed.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
