# U1-conform audit — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the SUBJECTIVE lane (shape, naming,
ergonomics, placement, guide voice, design fit, the feel a consumer meets). Your engine wrote the
unit under audit, so read it as work you did not write. Perform the assignment directly and spawn
nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-claims.md` — that file alone
fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane needs: the
diff over `d8b0e65` including every untracked file at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff.patch.txt` and the status at
`tmp/audit/u1-conform-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. The claims about placement,
names, the guide's voice, the shell's shape, and the writer's recorded decisions (the
`computeArtifactDigest` name, the `meta.load-css` entry, the `void new` discard, the
`setupListeners` module) carry your lane's weight: rule on each decision against the rule it cites.
Add extra findings no claim names, numbered after the last claim, each with a site and a one-line
failure scenario; distinguish a finding that forces another round from a bound; a wording
preference that changes no behaviour and breaks no rule is neither.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`veneer-conformance-verdict.md` and `units/veneer-conformance-reviewer-report.md` (the audit whose
findings this unit closes), `units/u1-conform-brief.md`, `units/u1-conform-report.md`. Do not read
the Veneer `tmp/` directory beyond the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
