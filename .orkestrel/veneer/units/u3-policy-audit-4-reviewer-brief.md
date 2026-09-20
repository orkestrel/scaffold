# U3-policy audit round 9 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane (correctness, constraints,
portability across fleet targets, what the code and contracts permit). Perform the assignment
directly and spawn nothing. You edit nothing; you have no write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-policy-audit-claims-4.md`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text), reading the cumulative diff `u3-policy-diff-10.patch.txt` and the live files, never
the reports alone. Trace each link form round 8 listed through the live pattern by hand. Claim 9
is the subjective lane's; rule on it briefly. Add extra findings no claim names, numbered from
11, each with a site and a one-line failure scenario; distinguish a finding that forces another
round from a bound; a wording preference that changes no behaviour and breaks no rule is neither.

## Context

Round 8's verdict and lane reports sit at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-policy-audit-verdict-3.md`,
`units/u3-policy-audit-3-reviewer-report.md`, `units/u3-policy-audit-3-analyst-report.md`; the
tenth brief and report at `units/u3-policy-brief-10.md`, `units/u3-policy-report-10.md`. The
report's § Deviations records the `directories` additions to the control rows and the scratch
cases that the directory-existence gate required.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
