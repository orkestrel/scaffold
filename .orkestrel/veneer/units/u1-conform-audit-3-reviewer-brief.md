# U1-conform audit round 3 — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the SUBJECTIVE lane (shape, naming, guide
voice, design fit). Native Sonnet (`builder`) wrote the unit under audit. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-claims-3.md` — that file
alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane
needs: the diff over `d8b0e65` including every untracked file at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u1-conform-diff-3.patch.txt` and the status at
`tmp/audit/u1-conform-status-3.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Rounds 1 and 2
(`.orkestrel/veneer/u1-conform-audit-verdict.md`, `-2.md`) confirmed everything outside the files
brief 4 owns; re-read other sites only where a claim names them. Add extra findings no claim
names, numbered after the last claim, each with a site and a one-line failure scenario;
distinguish a finding that forces another round from a bound; a wording preference that changes
no behaviour and breaks no rule is neither.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`u1-conform-audit-verdict-2.md` and the round-2 lane reports under `units/u1-conform-audit-2-*`,
`units/u1-conform-brief-4.md`, `units/u1-conform-report-4.md`, and the earlier pairs. Do not read
the Veneer `tmp/` directory beyond the reports.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
