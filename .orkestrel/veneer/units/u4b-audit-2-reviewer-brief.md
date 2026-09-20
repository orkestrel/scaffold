# U4b audit round 2 — objective lane brief (lane swap)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote brief 2, so the lanes are swapped: you
hold the OBJECTIVE lane (correctness, constraints, what the code, the tests, the installed
declarations, and the rules permit), and Astra holds the subjective lane. Perform the assignment
directly and spawn nothing. You edit nothing and run nothing; you have no write tools and no
shell.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u4b-audit-claims-2.md`
— that file alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the
deciding evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only
lane needs: the diff over `ef1a563` including every untracked file at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4b-diff-2.patch.txt` and the status at
`tmp/audit/u4b-status-2.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Round 1
(`.orkestrel/veneer/u4b-audit-verdict.md`) confirmed everything brief 2 does not touch; re-read
other sites only where a claim names them. Trace the binding table from each row to the steps it
accepts and to the predicate; re-derive the recorder's asset paths; read the exclusion skip and
its case; read the re-recorded fixture for the `click` event. The user has ruled that rounds
focus on implementation: record a wording finding as a bound, never as a round-forcer. Add extra
findings no claim names, numbered after the last claim, each with a site and a one-line failure
scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`u4b-audit-verdict.md` and the round-1 lane reports under `units/u4b-audit-*`,
`units/u4b-brief.md`, `units/u4b-brief-2.md`, `units/u4b-report.md`, `units/u4b-report-2.md`.
Law: scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`, `typescript.md`. Do not
read the Veneer `tmp/` directory beyond the reports.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
