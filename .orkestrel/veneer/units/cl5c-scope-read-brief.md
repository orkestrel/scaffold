# CL5c scope read — check the brief against the tree before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every row below with `holds`, `amend`, or `unclear`, each with `file:line` evidence, so
CL5c's brief is corrected before a writer opens it. A row you rule `amend` names the correct
fact; a row you rule `unclear` names what you could not settle and why.

## The brief under review

`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5c-brief.md`, with the Orchestrator's
calibration reading at `.orkestrel/veneer/units/cl5-twin-measurement.md`. The subject checkout is
`C:/Users/mikes/WebstormProjects/veneer`, whose HEAD is the CL5 landing `ea82419` and whose
working tree carries CL5b's completed change, pending its landing. CL5c will start from exactly
that content, so read the working tree as it stands. Read-only audit lanes are examining the same
tree; they write nothing and do not affect your reading.

## Rows

1. **The three sections really do share one body.** Read
   `app/browser/sections/ContentSection.ts`, `TypeSection.ts`, and `MediaSection.ts` in full.
   Name every line that differs between them beyond the copy object and specimen table each
   reads. If any pair differs in behaviour rather than in data, say exactly how, because the
   brief's first obligation assumes they do not.
2. **What a shared shape must keep.** Name every assertion across
   `tests/app/browser/sections/*.test.ts`, `tests/app/browser/Showcase.test.ts`, and
   `tests/app/browser/index.test.ts` that would go false if the three classes became one
   implementation, distinguishing an assertion about behaviour from one about a class name or a
   barrel export. Name what `app/browser/index.ts` exports today and what a consumer could reach.
3. **The button section's shape.** Read `app/browser/sections/ButtonSection.ts`. Say whether it
   implements the same contract, what it carries beyond the specimen sections, and whether a
   shared shape covering the three could cover it without changing its behaviour.
4. **The mark pair as shipped.** Quote `src/styles/elements/_mark.scss` and the mark rules in
   `src/styles/components/_type.scss`. Name every assertion in
   `tests/src/styles/elements/mark.test.ts` and `tests/src/styles/components/type.test.ts` that
   reads either, and say which would go false if the class took the tag's treatment. Name the
   case table rows behind each.
5. **The system colours are usable here.** The Orchestrator's ruling has the class declare the
   CSS system colours the record measured. Confirm nothing in the styles rules or the conformance
   predicates refuses a system colour keyword as a declaration value, and name any predicate that
   inspects colour values at all.
6. **The caption and figure pairs.** Quote the caption rules on both sides and the figure rules
   on both sides, name what each reads, and name every assertion that reads either. Say whether
   the two caption values resolve alike today, from the tokens rather than from a browser run.
7. **The retune tables and the colour case.** Name the two retune tables in
   `tests/setupStyles.ts`, the default tables whose sizes they must stay disjoint from, and the
   case in `tests/setupStyles.test.ts` that freezes them. Name the case in
   `tests/src/styles/components/type.test.ts` that now mounts two hosts, and quote the assertions
   that would move if the painted host took a case of its own.
8. **The owned set.** Read the brief's Owned and Off-limits lists line by line against the tree.
   Name any path that does not exist where the brief says it does, any file the change will make
   false that appears in neither list, and any Owned entry the change does not need. Note that
   CL5b has just landed changes in `tests/setupStyles.ts`, `tests/setupConformance.ts`, and both
   image proofs; say whether any of them affects what this brief grants.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/architecture.md`, `browser.md`, `application.md`,
`tests.md`, `styles.md`, `names.md`. Implementation only: report no wording or prose finding, and
rule on no guide row.

## Output

The row table (`Row | Ruling | Evidence`), then the amendments the brief needs, each as the exact
sentence that replaces the one it corrects. No process diary.
