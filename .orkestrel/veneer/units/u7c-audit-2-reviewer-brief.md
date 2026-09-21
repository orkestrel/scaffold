# U7c audit — subjective lane brief (round 2: the fix round under brief 2; rule on the fix-round tree, with round 1's rendered diff `u7c-diff.patch.txt` beside round 2's so the fix round's own edits stand out)

## Role and engine

`reviewer` on native Opus 5, clean context. Opus wrote the unit under audit, so you hold the
SUBJECTIVE lane (design fit and shape: the `sections/` family and `SectionInterface`, the
specimen table, the entry constructing the `Delegate`, the projection helper's shape in
`tests/setup.ts`, the journeys' organisation on the journey axis, the capture state names, the
consumer case's fit inside the existing stage), and Astra holds the objective lane on another
engine. Read the work as work you did not write. Perform the assignment directly and spawn
nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7c-audit-claims-2.md` — that file alone fixes
the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane needs: the
diff over the Veneer checkout's U7b landing (the base named in the claims file) at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7c-diff-2.patch.txt` and the status at
`tmp/audit/u7c-status-2.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. The user has ruled that
audits cover implementation only: report no wording, comment, doc-block, or guide-prose
finding. Add extra findings only for an implementation defect, numbered after the last claim,
each with a site and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/u7c-brief-2.md` (the fix-round brief, carrying brief 1), `units/u7c-report-2.md` with `units/u7c-report.md`, `u7-design-verdict.md` (questions 6 and 7, § The
chain, § The user's correction), `units/u7-design-planner-report.md` § 6 (the shell shape and the
mounting constructor kept). Law: scaffold's `AGENTS.md`, `.claude/rules/application.md`,
`browser.md`, `tests.md`, `architecture.md`, `names.md`. The user's rulings: surfaces are core,
browser, server, styles only; a family opens in a lowercase plural folder. Do not read the
Veneer `tmp/` directory beyond the report and the capture paths it names.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
