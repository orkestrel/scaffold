# U7d audit — objective lane brief (lane swap)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so the lanes are
swapped: you hold the OBJECTIVE lane (correctness: the readers' contracts, the presence check's
logic against the inventory and the built cascade, the deferral reader's refusals, the binding
table's selection order, the fixture scanner's non-serializable path, the manifest-rooted
cascade path, the tests' sufficiency), and Astra holds the subjective lane. Perform the
assignment directly and spawn nothing. You edit nothing and run nothing; you have no write tools
and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7d-audit-claims.md` — that file alone fixes
the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane needs: the
diff over the Veneer checkout's `1b80ccb` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7d-diff.patch.txt` and the status at
`tmp/audit/u7d-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Trace each reader over the
real inputs: the inventory copy at `tests/fixtures/oracle/inventory.json`, the compatibility
tables in `guides/veneer.md` § Compatibility and § Styles `### Deferred selectors`, and the
built cascade under `dist/src/styles/` where it exists. The user has ruled that rounds focus on
implementation: a wording finding is a bound, never a round-forcer. Add extra findings no claim
names, numbered after the last claim, each with a site and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/u7d-brief.md` (the brief), `units/u7d-report.md` (the report), `u4b-audit-verdict-2.md`
§ Findings carried (the bounds items 6 and 7 of the brief close), `u7-design-verdict.md`
(question 5's ruling on rows, deferrals, and the exhaustive partition). Law: scaffold's
`AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`, `names.md`, `typescript.md`,
`documentation.md`, `styles.md`. Do not read the Veneer `tmp/` directory beyond the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
