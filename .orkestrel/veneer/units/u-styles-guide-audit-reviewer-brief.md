# U-styles-guide audit — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. You hold the SUBJECTIVE lane (guide voice, structure,
the reader's path, design fit, what a consumer and a later generator learn). Your engine wrote
the unit under audit, so read it as work you did not write. Perform the assignment directly and
spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-guide-audit-claims.md` — that file
alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane
needs: the diff over `fbbda43` at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-guide-diff.patch.txt`
and the status at `tmp/audit/u-styles-guide-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Falsify the prose the way
`documentation.md` § Parity asks: every sentence about a file, a script, or a departure is checked
against that file, script, or configuration, not against the report. Add extra findings no claim
names, numbered after the last claim, each with a site and a one-line failure scenario;
distinguish a finding that forces another round from a bound; a wording preference that changes
no behaviour and breaks no rule is neither.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`styles-axis-design-verdict.md` (the section's design; its Q2 reason for assignment over the
merger is false and `u-styles-config-audit-verdict.md` records the true one),
`units/u-styles-config-report.md` and `-2.md`, `units/u-styles-guide-brief.md`,
`units/u-styles-guide-report.md`. Law: scaffold's `AGENTS.md` § Writing,
`.claude/rules/writing.md`, `documentation.md`, `workspace.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`. Do not read the Veneer `tmp/` directory beyond the
report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
