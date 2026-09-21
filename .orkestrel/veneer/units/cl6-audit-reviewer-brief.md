# CL6 audit — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit, so you hold the OBJECTIVE lane
(correctness under the shipped cascade and the pinned inventory, rule compliance, test
sufficiency, scope honesty) and the Astra analyst holds the subjective lane on another engine.
Read the work as work you did not write. Perform the assignment directly and spawn nothing. You
edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl6-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the CL5c landing `c1c81a4` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl6-diff.patch.txt` (tracked changes plus a
no-index rendering of every new file) and the status at `tmp/audit/cl6-status.txt`. Read those
and the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, including
`src/styles/components/_link.scss`, `src/styles/elements/_a.scss`, `src/styles/_tokens.scss`,
`src/styles/_mixins.scss`, `src/styles/index.scss`, `tests/setupStyles.ts` and its proof, the
link and anchor and button proofs, `tests/conformance.test.ts`,
`tests/setupConformance.ts` and its proof, the link section and its proof, `guides/veneer.md`,
the built `dist/src/styles/index.css`, and the pinned `tests/fixtures/oracle/inventory.json`.
Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the effective briefs
`units/cl6-brief.md`, `units/cl6-brief-2.md`, and `units/cl6-brief-3.md`; both reports
`units/cl6-report.md` and `units/cl6-report-2.md`; the terrain map `units/cl6-scout-report.md`;
the scope read `units/cl6-scope-read-report.md`; the measurement
`units/cl6-hover-mechanism.md` with its instrument `units/cl6-hover-probe.mjs`; and
`research/calibration-content.md` for the record's anchor rows. Read the law under the Veneer
checkout (`AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`). Rule on the diff and the live files, never on a report's word
alone; a report-only claim is recorded as report-only.

**Where to push hardest.** Four places. First, **completeness**: the user has ruled that this
family is the baseline, so every selector the inventory records under this key must end shipped,
excluded with a reason, or recorded as a departure. Compare the pinned inventory's selector list
for the key against the built cascade yourself and name anything unaccounted for, in either
direction. Second, the hover binding: rule whether the shipped expression actually produces the
record's values in both modes, reading the cascade rather than the report, and whether the dark
direction change reached every consumer that should have moved. Third, the blast radius: the
claim says nothing outside the owned set moved, so look for a consumer the unit did not
enumerate, particularly any rule reading a Bootstrap link alias rather than a Veneer token.
Fourth, the conformance setup proof: the scope read said only the listed value moves and the unit
found otherwise at its gate; rule which is right by reading the case, and say whether the edit
sits inside the grant.

## Scope of judgment

Implementation only. Report no wording or prose finding. **The guide's compatibility rows are the
one exception and are in scope as a contract**, because the conformance run reads them: judge
them on whether they are the rows the deciding function requires and whether their facts are true
of the code, never on their wording.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
