# CL2 audit round 2 — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Opus wrote unit CL2 and its fix, so you hold the
SUBJECTIVE lane (design fit and shape of the four fixes: the folded regex in `parseMediaWidth`,
the reader case's two-width gates and the ungated-selector assertion, the stripe placement
assertion on the dark scope), and Astra holds the objective lane on another engine. Read the
work as work you did not write. Perform the assignment directly and spawn nothing. You edit
nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl2-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL1 landing `00a5bdc` (the whole
CL2 change, round 1 plus the fix) at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-diff-2.patch.txt`
and the status at `tmp/audit/cl2-status-2.txt`; round 1's diff is at `cl2-diff.patch.txt`
for a diff-to-diff reading. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`. Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: `cl2-audit-verdict.md` (round 1,
the four findings and the ruling on the referral), `units/cl2-brief-3.md` (the fix brief),
`units/cl2-brief-2.md` (the effective brief it succeeds), `units/cl2-report-2.md` (the fix
report), `units/cl2-report.md`, and the law under that checkout (`AGENTS.md`,
`.claude/rules/tests.md`, `typescript.md`, `names.md`, `styles.md`). Rule on the diff and the
live files, never on the report's word alone; a report-only claim (a red-then-green run) is
recorded as report-only.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No
process diary.
