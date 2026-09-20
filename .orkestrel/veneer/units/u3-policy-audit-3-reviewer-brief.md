# U3-policy audit round 8 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the OBJECTIVE lane (correctness, constraints,
portability across fleet targets, what the code and contracts permit). Perform the assignment
directly and spawn nothing. You edit nothing; you have no write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-policy-audit-claims-3.md`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text), reading the cumulative diff `u3-policy-diff-9.patch.txt` and the live files, never the
reports alone. Trace each form claim 4 names through the live pattern by hand and say what it
captures or why it fails. Claim 9 is the subjective lane's; rule on it briefly. Add extra findings
no claim names, numbered from 11, each with a site and a one-line failure scenario; distinguish a
finding that forces another round from a bound.

## Context

Round 7's verdict and both lane reports sit at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-policy-audit-verdict-2.md`,
`units/u3-policy-audit-2-reviewer-report.md`, `units/u3-policy-audit-2-analyst-report.md`; the
ninth brief and report at `units/u3-policy-brief-9.md`, `units/u3-policy-report-9.md`.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
