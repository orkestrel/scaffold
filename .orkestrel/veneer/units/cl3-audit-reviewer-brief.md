# CL3 audit — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so you hold the
OBJECTIVE lane (correctness under the shipped cascade: each partial's resolved values against
the calibration record or the retained Bootstrap value, the `reset` layer's rules and their
placement, the elements-layer and physical-axis guards over the new partials, the `[hidden]`
and no-`href` and body-variable and scroll-behaviour proofs, the section's lifecycle against
`SectionInterface`, test sufficiency, mechanical conformance), and Astra holds the subjective
lane on another engine. Read the work as work you did not write. Perform the assignment directly
and spawn nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's CL2 landing `9f5ffda` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-diff.patch.txt` (tracked changes plus a
no-index rendering of every new file) and the status at `tmp/audit/cl3-status.txt`; read those
and the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, including
`dist/src/styles/index.css` (the built cascade) and `node_modules/bootstrap/scss/_reboot.scss`.
Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/cl3-brief-3.md` (the effective brief, succeeding `units/cl3-brief-2.md` after the deviation stop recorded in `units/cl3-report.md`; `units/cl3-brief.md` is superseded and
`units/cl3-scope-read-report.md` records why), `units/cl3-report-2.md` (the unit's report),
`content-layout-design-verdict.md` (the rulings), `units/content-layout-design-planner-report.md`
§ 2, § 3, § 7 and the CL3 criteria, `units/content-layout-design-analyst-report.md` units 2 and
3, `research/calibration-content.md` (the values the partials bind to), and the law under that
checkout (`AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`, `documentation.md`). Rule on the diff and the live files, never
on the report's word alone; a report-only claim (a red-then-green run, a probe reading) is
recorded as report-only.

## Scope of judgment

The user has ruled that audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding; a
guide row is judged only on its facts being true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No
process diary.
