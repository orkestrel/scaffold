# CL4 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit and its fix, so you hold the
OBJECTIVE lane (correctness under the shipped cascade and the pinned inventory, rule compliance,
test sufficiency, scope honesty), and Astra holds the subjective lane on another engine. Read
the work as work you did not write. Perform the assignment directly and spawn nothing. You edit
nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL3b landing `d822d59` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-diff-2.patch.txt` (tracked changes plus a
no-index rendering of every new file) and the status at `tmp/audit/cl4-status-2.txt`; round 1's
diff is at `cl4-diff.patch.txt` for a diff-to-diff reading. Read those and the live Veneer
tree at `C:/Users/mikes/WebstormProjects/veneer`, including the built `dist/src/styles/index.css`
and the pinned `tests/fixtures/oracle/inventory.json`. Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: `cl4-audit-verdict.md` (round 1,
whose rulings carry unchanged and are not reopened), the fix brief `units/cl4-brief-7.md` over
`units/cl4-brief.md`, `units/cl4-brief-2.md`, and the rulings `units/cl4-brief-3.md` to
`units/cl4-brief-6.md`, the fix report `units/cl4-report-6.md` with `units/cl4-report-5.md`
beside it, `research/calibration-content.md`, and the law under that checkout (`AGENTS.md`,
`.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`, `documentation.md`). Rule
on the diff and the live files, never on a report's word alone; a report-only claim (a
measurement the unit took, a red-then-green run) is recorded as report-only.

**Where to push hardest.** This round extracted five shared blocks into mixins, three of them
reaching into partials CL3 landed, and three of the five take caller content in the middle of
their emission. Rule whether every consumer's emitted declarations and their order are genuinely
unchanged, reading the built cascade rather than the report's table. Then rule whether the
sweep's source-map machinery can miss a shared block rather than invent one, because a sweep
that under-reports leaves the rule unmet while claiming it closed. Then rule whether the new
focus case genuinely reaches the state the shipped rule selects: a case that reads the wrong
state is exactly the defect round 1 raised, and repeating it with a different mechanism would be
worse than leaving it open.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding; a
guide row is judged only on its facts being true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No
process diary.
