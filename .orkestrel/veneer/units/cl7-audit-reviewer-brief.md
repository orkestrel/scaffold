# CL7 audit — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit, so you hold the OBJECTIVE lane
(correctness under the shipped cascade and the pinned inventory, rule compliance, test
sufficiency, scope honesty) and the Astra analyst holds the subjective lane on another engine.
Read the work as work you did not write. Perform the assignment directly and spawn nothing. You
edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl7-audit-claims.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text),
add any extra finding that is an implementation defect (numbered after the last claim, with a
site and a one-line failure scenario, distinguishing one that forces a fix round from one that
does not), and end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the
claims that force it.

## Evidence

The Orchestrator rendered the diff over the CL6 landing `c8f53f8` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl7-diff.patch` (tracked changes plus a
no-index rendering of every new file) and the status at `tmp/audit/cl7-status.txt`. Read those
and the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`, including
`src/styles/components/_link.scss`, `src/styles/elements/_a.scss`, `src/styles/_tokens.scss`,
`src/styles/_mixins.scss`, `src/styles/index.scss`, `tests/setupStyles.ts` and its proof, the
link and anchor and button proofs, `tests/conformance.test.ts`,
`tests/setupConformance.ts` and its proof, the link section and its proof, `guides/veneer.md`,
the built `dist/src/styles/index.css`, and the pinned `tests/fixtures/oracle/inventory.json`.
Read the retained records under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the effective briefs
`units/cl7-brief.md`, `units/cl7-brief-2.md`, and `units/cl7-rulings.md`; both reports
`units/cl7-report.md` and `units/cl7-scope-read-report.md`; the terrain map `units/cl7-scout-report.md`;
the scope read `units/cl7-scope-read-report.md`; the measurement
`units/cl6-hover-mechanism.md` with its instrument `units/cl6-hover-probe.mjs`; and
`research/calibration-content.md` for the record's anchor rows. Read the law under the Veneer
checkout (`AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`). Rule on the diff and the live files, never on a report's word
alone; a report-only claim is recorded as report-only.

**Where to push hardest.** Four places. First, **completeness**: the user has ruled that this
family is the baseline, so every selector the inventory records under this key must end shipped,
excluded with a reason, or recorded as a departure. Compare the pinned inventory's selector list
for the key against the built cascade yourself and name anything unaccounted for, in either
direction. This key has three groups and twenty of its selectors are breakpoint-scoped, with the
same class repeating at several boundaries, so the comparison must account for a class appearing
once per boundary rather than once.

Second, **the loop**: the caps are emitted from a loop over the ramp that accumulates the named
variants rather than from written-out rules. Rule whether that loop emits exactly the
boundary-to-class mapping the inventory records, including that each named variant starts capping
at its own boundary and then takes the larger caps, and that the fluid variant never receives
one. A loop that emits a superset or a subset would still pass a presence scan that only checks
membership.

Third, **the width readings**: rule whether the proof reads resolved values from the browser at
each boundary rather than asserting the token, and whether its below-at-above triplets actually
straddle the boundaries the ramp declares.

Fourth, **the gutter's independence**: the container's inline padding computes from a gutter
token that shares a value with a density-scaled space member by coincidence. Rule whether the two
are genuinely independent now, and whether anything still couples them such that retuning the
density factor would move a container.

## Scope of judgment

Implementation only. Report no wording or prose finding. **The guide's compatibility rows are the
one exception and are in scope as a contract**, because the conformance run reads them: judge
them on whether they are the rows the deciding function requires and whether their facts are true
of the code, never on their wording.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
