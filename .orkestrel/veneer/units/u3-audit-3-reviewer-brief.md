# U3 audit round 3 — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the SUBJECTIVE lane (shape, naming,
ergonomics, guide voice, design fit, the feel a consumer meets). Your engine wrote the unit under
audit, so read it as work you did not write: prefer the reading that would embarrass the writer.
Perform the assignment directly and spawn nothing. You edit nothing and run nothing that writes;
you have no write tools.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-3.md`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text), reading the live Veneer tree (`C:/Users/mikes/WebstormProjects/veneer`; `git diff` over
`b661142` and `git status --porcelain` are the diff evidence, plus the untracked files the reports
list) and the two reports, never the reports alone. Claims 4, 10, 11, 12, and 13 carry your lane's
weight: the guide's § Tokens as one maintainer's voice inside the one package guide, the names,
the placement, and the writing law. Add extra findings no claim names, numbered from 16, each
with a site and a one-line failure scenario; distinguish a finding that forces another round from
a bound; a wording preference that changes no behaviour and breaks no rule is neither.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`u3-audit-verdict.md`, `u3-audit-verdict-2.md`, `units/u3-brief.md`, `units/u3-brief-4.md`,
`units/u3-brief-5.md`, `units/u3-brief-6.md`, `units/u3-report.md`, `units/u3-report-2.md`, `units/u3-report-3.md`, `units/u3-report-4.md`,
`veneer-conformance-verdict.md` (the tree audit's first half, whose second half is claim 12).
Do not read the Veneer `tmp/` directory beyond the reports.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
