# CL1 audit — objective lane brief (round 2: the fix round under brief 2; rule on the fix-round tree, with round 1's rendered diff `cl1-diff.patch.txt` beside round 2's so the fix round's own edits stand out)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so you hold the
OBJECTIVE lane (correctness under adverse orderings, what the readers and the installed helpers
actually permit, test sufficiency, mechanical conformance: the exclusion scanner's membership
validation and absence requirement, the property-free admission, the root-scoped oracle drive
under a duplicate-name control, the breakpoint helper's restore on every path), and Astra holds
the subjective lane on another engine. Read the work as work you did not write. Perform the
assignment directly and spawn nothing. You edit nothing and run nothing; you have no write
tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl1-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's U7f-fix landing `060ce02` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-diff-2.patch.txt` (tracked and untracked
files) and the status at `tmp/audit/cl1-status-2.txt`; read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer`. Read the installed helpers' declarations at
`C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
and `node_modules/@vitest/browser/context.d.ts` where a claim rests on them, and the pinned
inventory `tests/fixtures/oracle/inventory.json` where the scanner's membership check rests on
it. Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/cl1-brief-2.md` (the fix-round brief, carrying brief 1), `units/cl1-report-2.md` with `units/cl1-report.md` (the reports),
`content-layout-design-verdict.md` (the rulings the unit implements), and the law under that
checkout (`AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`, `architecture.md`,
`names.md`, `styles.md`). Rule on the diff and the live files, never on the report's word
alone; a report-only claim (a red-then-green run) is recorded as report-only.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No
process diary.
