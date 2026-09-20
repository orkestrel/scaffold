# U3 audit round 5 — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the SUBJECTIVE lane (shape, naming,
ergonomics, guide voice, design fit, the feel a consumer meets). Your engine wrote the unit under
audit, so read it as work you did not write. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-5.md`
— that file alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the
deciding evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only
lane needs: the diff over `b661142` including every untracked file at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-diff-5.patch.txt` and the status at
`tmp/audit/u3-status-5.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the reports alone. Where a claim names a reading,
execute the live function in memory. The claims about the guide's voice and structure, the names,
and the placement carry your lane's weight. Add extra findings no claim names, numbered after the
last claim, each with a site and a one-line failure scenario; distinguish a finding that forces
another round from a bound; a wording preference that changes no behaviour and breaks no rule is
neither.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`u3-audit-verdict-4.md` and the earlier verdicts, `units/u3-brief-8.md` and the earlier briefs,
`units/u3-report-6.md` and the earlier reports. Do not read the Veneer `tmp/` directory beyond
the reports.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
