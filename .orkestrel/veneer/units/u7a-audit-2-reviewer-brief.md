# U7a audit round 2 — objective lane brief (the fix round's auditor)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the fix round under audit, so you are
the engine that did not write it and you hold the OBJECTIVE lane: did each carried finding
close, correctly and completely, and did the closure break nothing the round-1 lanes confirmed.
Perform the assignment directly and spawn nothing. You edit nothing and run nothing; you have
no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7a-audit-claims-2.md` — that file alone
fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane
needs: the round-2 diff over the Veneer checkout's `2bc922d` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-diff-2.patch.txt` (tracked and untracked
files), round 1's rendered diff over the same base at `u7a-diff.patch.txt` (compare the two so the
fix round's own edits stand out), and the status at
`tmp/audit/u7a-status-2.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Your own round-1 findings
are `units/lane-u7a-reviewer.md` items 16 to 26; the analyst's claim 9 is in
`units/u7a-audit-analyst-report.md`; the fix briefs are `units/u7a-brief-7.md`, `-8.md`, and `-9.md` (finding 9 reverted on
measurement; the contrast floor narrowed to the light role) with their reports `units/u7a-report-7.md`, `-8.md`, and `-9.md`. The user has ruled that audits cover implementation only: report no
wording, comment, doc-block, or guide-prose finding. Add extra findings only for an
implementation defect the fix round introduced, numbered after the last claim, each with a site
and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`u7a-audit-verdict.md` (round 1's reconciliation and the findings not carried),
`units/u7a-report-5.md` and `-6.md` (the implementation the fix round sits on), the design
records round 1 named. Law: scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`,
`names.md`, `architecture.md`. Do not read the Veneer `tmp/` directory beyond the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
