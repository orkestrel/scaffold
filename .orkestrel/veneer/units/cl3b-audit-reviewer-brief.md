# CL3b audit — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Opus wrote the unit under audit, so you hold the
SUBJECTIVE lane (design fit and shape: whether the dark anchor's separation from the raised
surface is the right shape and is recorded where a reader meets it, the `font.mono` group and the
`--vn-font-mono-base` rename against the naming rule and the registry's grouping, `--vn-line-code`
as the name for the code block's rhythm, `--vn-text-muted` beside the existing secondary and
tertiary text tokens, the case fields' names and placement, the guide rows' fit in their tables),
and Astra holds the objective lane on another engine. Read the work as work you did not write.
Perform the assignment directly and spawn nothing. You edit nothing and run nothing; you have no
write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3b-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL3 landing `9bb306e` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-diff.patch.txt` and the status at
`tmp/audit/cl3b-status.txt`; read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`, including `dist/src/styles/index.css`. Read the
retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/cl3b-brief-2.md` and `units/cl3b-brief.md` beneath it (together the effective brief),
`units/cl3b-scope-read-report.md`, `units/cl3b-report.md`, `cl3-audit-verdict.md` (the rounds
that carried these items), `research/calibration-content.md` (the values), and the law under that
checkout (`AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `typescript.md`, `names.md`,
`documentation.md`). Rule on the diff and the live files, never on the report's word alone; a
report-only claim (a red-then-green run, a measurement the unit took) is recorded as report-only.

Give claim 4 the hardest reading: the unit renamed a published token and turned its registry
entry into a group, on its own judgment rather than on the brief's instruction. Rule whether that
shape is right, whether a smaller change would have served, and whether the name it chose for the
sibling is the one this registry's vocabulary implies.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding; a
guide row is judged only on its facts being true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No
process diary.
