# U4b audit — objective lane brief (lane swap)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so the lanes are
swapped: you hold the OBJECTIVE lane (correctness, constraints, what the code, the tests, the
installed declarations, and the rules permit), and Astra holds the subjective lane. Perform the
assignment directly and spawn nothing. You edit nothing and run nothing; you have no write tools
and no shell.

## Objective

Rule on every claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u4b-audit-claims.md`
— that file alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the
deciding evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only
lane needs: the diff over `ef1a563` including every untracked file at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4b-diff.patch.txt` and the status at
`tmp/audit/u4b-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Read the recorder against the
installed `playwright` declarations under `node_modules` for what each call does, the
compatibility reader against `node_modules/@orkestrel/guide/dist/src/core/index.d.ts`, the
presence check against `tests/fixtures/oracle/inventory.json` and the built cascade's rules, and
the cross-check against `tests/fixtures/oracle/button.json` and the `## Compatibility` rows; trace
every path from a planted control to the assertion that reds. The user has ruled that rounds
focus on implementation: rule on behaviour, contracts, and tests; record a prose or wording
finding as a bound, never as a round-forcer. Add extra findings no claim names, numbered after the
last claim, each with a site and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`plan.md` § U4b, `units/u4b-brief.md`, `units/u4b-report.md`, and the U4a research the brief
names (`research/ledger.md`, `research/obligations.md`, `research/inventory.json`). Law:
scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`, `names.md`, `typescript.md`,
`documentation.md`, `portability.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`. Do
not read the Veneer `tmp/` directory beyond the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
