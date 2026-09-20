# u7d-bounds audit — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Opus wrote the unit under audit, so you hold the
SUBJECTIVE lane (the doc blocks' truth and voice as a test author reads them, the case titles,
the refusal label's shape, the shipped-set rule as a guide reader expects it, the binding-table
decision's fit with the compatibility ledger), and Astra holds the objective lane on another
engine. Read the work as work you did not write. Perform the assignment directly and spawn
nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7d-bounds-audit-claims.md` — that file alone
fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane
needs: the diff over the Veneer checkout's `7da6bb1` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7d-bounds-diff.patch.txt` and the status at
`tmp/audit/u7d-bounds-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Read the installed reader's
declarations at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` under Veneer and the
Test guide's § Surface rows for `parseColor`, `parseCSSColor`, and `matchesColor` in
`C:/Users/mikes/WebstormProjects/test/guides/test.md`, so every doc-block sentence about the
wrappers is judged against what the reader does. The user has ruled that rounds focus on
implementation: a wording finding is a bound, never a round-forcer. Add extra findings no claim
names, numbered after the last claim, each with a site and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/u7d-bounds-brief.md`, `units/u7d-bounds-report.md`, `u7d-audit-verdict.md` (§ The
whole-chain red and § Bounds carried name what the unit closes), `units/lane-u7d-reviewer.md`
(findings 15 to 24). Law: scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`
(§ TSDoc), `names.md`, `writing.md`, `documentation.md`. Do not read the Veneer `tmp/` directory
beyond the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
