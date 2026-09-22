# CL8b audit round 1 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit, so you hold the OBJECTIVE lane
(correctness under the shipped cascade and the pinned inventory, rule compliance, test sufficiency,
scope honesty) and the Astra analyst holds the subjective lane. Read the work as work you did not
write. Perform the assignment directly and spawn nothing. You edit nothing and run nothing; you have
no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl8b-audit-claims.md` with
CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text), add any
extra finding that is an implementation defect (numbered after the last claim, with a site and a
one-line failure scenario, distinguishing one that forces a fix round from one that does not), and
end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Evidence

The Orchestrator rendered the diff over the CL8 landing `d2c5bb3` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl8b-diff.patch.txt` and the status at
`tmp/audit/cl8b-status.txt`.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
which are this round's subject:

- `src/styles/utilities/_gap.scss` (the new partial) and `src/styles/index.scss` (its load)
- `src/styles/_tokens.scss` and `src/core/constants.ts` (the step scale and its registry leaves)
- `tests/src/styles/utilities/gap.test.ts` (the browser proof)
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the step and infix bindings, the collector's
  prefix, and the recorded key tuple the correction changed)
- `tests/conformance.test.ts` and `tests/setupConformance.test.ts` (the listing and the enumerating
  assertion)
- `guides/veneer.md` (the compatibility rows added and the deferral rows deleted)
- `app/browser/constants.ts` and `tests/app/browser/sections/LayoutSection.test.ts` (the specimens)
- the built `dist/src/styles/index.css`, `tests/fixtures/oracle/inventory.json` as the record, and
  `node_modules/bootstrap/dist/css/bootstrap.css` as the distribution the grouping and the important
  priority are ruled against

Read `tests/setupConformance.ts` as the machinery the accounting must satisfy — `readDeferrals`,
`scanCompatibilityPresence`, `collectShippedComponents`, `scanStyleBlocks`, `normalizeComplexSelector`
— never as a file the unit could change. Read `src/styles/components/_grid.scss` and
`tests/src/styles/components/grid.test.ts` as the pattern the unit was told to follow.

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
effective brief `units/cl8b-brief-2.md` with `units/cl8b-brief.md` beneath it; the rulings
`units/cl8b-rulings.md`; the scope read `units/cl8b-scope-read-report.md`; both reports
`units/cl8b-report.md` and `units/cl8b-report-2.md`; and `cl8-audit-verdict.md`, whose emitted-
vocabulary proof this unit extends.

**The law lives in the scaffold checkout**, not in the subject: `AGENTS.md` at the Veneer checkout
root redirects there, and the rule files are under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `styles.md`, `tests.md`,
`architecture.md`, and `names.md` in particular.

Rule on the diff and the live files, never on a report's word alone; a report-only claim is recorded
as report-only.

## Where to push hardest

**The tuple correction, which is the round's centre.** Claim 5 asserts the recorded tuple must name
the three gutter keys and not `row-gap`, because the `row` key already carries those selectors. **Rule
that against the record yourself**, in both directions: that `row` does carry them, that no other
candidate member overlaps, and that the tuple as written now makes the recorded multiset equal the
cascade's. A wrong answer here is invisible — the assertion would pass while comparing the wrong
population, or fail for a reason nobody could diagnose.

**The grouping and the important priority.** Claims 1 and 4 rest on what Bootstrap's own distribution
emits, not on what the report says. Read that file and rule whether the unit's shape matches it,
including the asymmetry that the row-gap rules carry the priority and the gutter custom-property
rules do not.

**Whether the density independence is actually read.** Claim 7 says retuning the density factor leaves
these readings unchanged. Rule whether the proof drives that retune and reads the result, or whether
it asserts the independence from the token's text — the second would be an assertion that cannot fail,
which the previous unit's audit already found once in this file.

## Scope of judgment

Implementation only. Report no wording or prose finding. The guide's compatibility and deferral rows
stay in scope as a contract, judged on whether their facts are true of the code.

The unit's stop was caused by a false fact in its brief and is recorded in the claims file. It is not
the unit's defect; do not rule on it as one.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
