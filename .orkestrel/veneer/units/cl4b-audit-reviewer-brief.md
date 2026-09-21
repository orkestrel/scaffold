# CL4b audit — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. A `builder` on Sonnet wrote the unit, so neither lane
shares the writer's engine and the lanes take their default places: you hold the SUBJECTIVE lane
(fit and shape: whether each new assertion sits where a reader of that file would look for it,
whether the case table's new entries belong to that table's subject, whether the control's form
matches the control the file already carries, and whether the two changes leave each proof
readable as one coherent case), and the Astra analyst holds the objective lane. Read the work as
work you did not write. Perform the assignment directly and spawn nothing. You edit nothing and
run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4b-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL4 landing `bc580c1` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-diff.patch.txt` and the status at
`tmp/audit/cl4b-status.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`, including `tests/setupStyles.ts`,
`tests/src/styles/elements/hr.test.ts`, `src/styles/elements/_hr.scss`, `src/styles/_mixins.scss`,
`tests/app/browser/sections/ContentSection.test.ts`, `app/browser/constants.ts`, and the built
`dist/src/styles/index.css`. Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the brief `units/cl4b-brief.md`,
the report `units/cl4b-report.md`, and `cl4-audit-verdict.md` for the two findings this unit
carries. Read the law under the Veneer checkout (`AGENTS.md`, `.claude/rules/tests.md`,
`styles.md`, `architecture.md`, `names.md`). Rule on the diff and the live files, never on the
report's word alone; a report-only claim (a red-then-green run, a plant and its restoration) is
recorded as report-only.

**Where to push hardest.** The unit's whole value is that two proofs now fail on a mutation they
previously survived. Rule whether each new assertion actually guards what the claim says it
guards, and whether either one can pass for a weaker reason than intended: whether the case
table's new entries are read for every mode the table carries, and whether the literal name
sequence is a genuine control or reproduces the same table it checks. Then rule whether either
change makes an existing assertion redundant or harder to read in its case.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
