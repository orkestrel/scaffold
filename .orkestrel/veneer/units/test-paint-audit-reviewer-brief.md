# Test-paint audit — objective lane brief (lane swap)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so the lanes are
swapped: you hold the OBJECTIVE lane (correctness: the colour conversions against CSS Color 4,
the readers' contracts, the tests' sufficiency), and Astra holds the subjective lane. Perform
the assignment directly and spawn nothing. You edit nothing and run nothing; you have no write
tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/test-paint-audit-claims.md` — that file
alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane
needs: the diff over the Test checkout's `ed9b102` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/test-paint-diff.patch.txt` and the status at
`tmp/audit/test-paint-status.txt`; read those and the live Test tree
(`C:/Users/mikes/WebstormProjects/test`), never the report alone. Re-derive each conversion
matrix and transfer function the unit wrote against the CSS Color 4 specification's values as you
know them (OKLab to linear sRGB, XYZ D65 to linear sRGB, the Bradford D50 to D65 adaptation, the
sRGB transfer function, the display-p3, a98-rgb, prophoto-rgb, and rec2020 matrices), and
compute in your head or on paper at least one worked example per space against the browser
control the report records. The user has ruled that rounds focus on implementation: a wording
finding is a bound, never a round-forcer. Add extra findings no claim names, numbered after the
last claim, each with a site and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/test-paint-brief-2.md` (the effective brief; it carries `units/test-paint-brief.md` except item 3), `units/test-paint-report-2.md` (the report; `units/test-paint-report.md` is the superseded stop), and the U7 design lanes that named
the gap (`units/u7-design-analyst-report.md`). Law: scaffold's `AGENTS.md`,
`.claude/rules/tests.md`, `architecture.md`, `names.md`, `typescript.md`, `documentation.md`.
Do not read the Test `tmp/` directory beyond the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
