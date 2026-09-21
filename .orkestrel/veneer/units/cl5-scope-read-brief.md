# CL5 scope read — check the brief against the tree before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every row below with `holds`, `amend`, or `unclear`, each with `file:line` evidence, so
the CL5 brief is corrected before a writer opens it. A row you rule `amend` names the correct
fact. A row you rule `unclear` names what you could not settle and why.

## The brief under review

`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-brief.md`. Its terrain map is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-scout-report.md`; read it
for context but rule against the tree, not against it. The subject checkout is
`C:/Users/mikes/WebstormProjects/veneer`. Another unit may be writing two test files there while
you read; ignore any change under `tests/setupStyles.ts` or
`tests/app/browser/sections/ContentSection.test.ts` and rule on everything else.

## Rows

1. **The component mirror.** `src/styles/components/_button.scss` exists and is the shape a new
   component partial mirrors. Name its proof's exact path and the case table that proof reads.
   Name the folder a new component proof belongs in, as the tree actually spells it.
2. **The barrel load.** `src/styles/index.scss` loads the component partial at the line the map
   names, and a new partial is added the same way. Name the exact statement form.
3. **The showcase barrel.** `app/browser/index.ts` exports the section classes and the specimen
   tables. Name what it exports and the form, so the brief's export row is right.
4. **The showcase proof.** Name every proof that asserts on the set of sections the shell
   constructs, and the exact assertion each makes, so the brief grants every file that adding two
   sections makes false. Name any assertion about section count, order, or region labels.
5. **The `listed` expectation.** Name the file and line asserting `listed`, its current value,
   and what `deriveListed` requires of a component for it to join: read
   `tests/setupConformance.ts` and state the condition in terms of the ledger rows and the
   inventory's projected `properties`. State whether a CL5 key with an empty properties list
   needs a variable row.
6. **The ledger-derived cases.** Name every case in `tests/setupConformance.test.ts` whose
   population changes when this unit's keys become shipped, and say for each whether it scopes
   its rows to one component or controls its own population.
7. **The tokens.** Confirm `--vn-display-1` through `--vn-display-6` exist in
   `src/styles/_tokens.scss`, with their values, and name the size token each heading tag reads
   in `src/styles/elements/_heading.scss`. State whether the display tokens carry any media
   condition.
8. **The guard.** Name every predicate in `tests/setupStyles.ts` or `tests/setupConformance.ts`
   that could refuse a selector this unit ships: a compound selector, a descendant or child
   combinator, a pseudo-class, a pseudo-element, or a physical-axis longhand. Quote each
   predicate's rule and say for each of `.blockquote > :last-child`,
   `.list-inline-item:not(:last-child)`, and `.blockquote-footer::before` whether it passes.
9. **The physical-axis rule.** Name the rule that decides whether `.img-fluid` ships `max-width`
   and `height` or their logical twins, and name the predicate that enforces it, if one does.
10. **The calibration record.** State which of this unit's keys
    `.orkestrel/veneer/research/calibration-content.md` measures, so the brief's binding sentence
    is true. Name the section and row for each.
11. **The mixins.** State whether closing any criterion in the brief needs a mixin
    `src/styles/_mixins.scss` does not already export, given that the brief puts that file
    off-limits. Name the mixin and the criterion if so.
12. **The owned set.** Read the brief's Owned list line by line against the tree. Name any path
    that does not exist where the brief says it does, any file the change will make false that
    appears in neither the Owned nor the Off-limits list, and any Owned entry the change does not
    need.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`, `documentation.md`. The user has ruled that this campaign covers
implementation only: report no wording or prose finding.

## Output

The row table (`Row | Ruling | Evidence`), then a short list of the amendments the brief needs,
each as the exact sentence that replaces the one it corrects. No process diary.
