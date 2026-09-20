# U-styles-config audit — objective lane brief (lane swap)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so the lanes are
swapped: you hold the OBJECTIVE lane (correctness, constraints, what the configuration, the rules,
and the installed declarations permit), and Astra holds the subjective lane. Perform the
assignment directly and spawn nothing. You edit nothing and run nothing; you have no write tools
and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-config-audit-claims.md` — that file
alone fixes the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding
evidence (`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane
needs: the diff over `a05e9ff` including every untracked file at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u-styles-config-diff.patch.txt` and the status at
`tmp/audit/u-styles-config-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Read the root `vite.config.ts`
and `srcBrowser()` for what the wrapper's spread carries and what its replaced fields drop; read
the installed `vitest` and `vite` declarations under `node_modules` where a claim rests on a
field's meaning (`setupFiles` with a stylesheet path, `test.name` as an object, `exclude: []`).
Add extra findings no claim names, numbered after the last claim, each with a site and a
one-line failure scenario; distinguish a finding that forces another round from a bound.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`styles-axis-design-verdict.md` (the design the unit implements), `units/styles-axis-probe.md`,
`units/u-styles-config-brief.md`, `units/u-styles-config-report.md`. Law: scaffold's `AGENTS.md`,
`.claude/rules/workspace.md`, `tests.md`, `typescript.md`, `writing.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`. Do not read the Veneer `tmp/` directory beyond the
report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
