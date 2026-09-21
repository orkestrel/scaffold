# CL6 scope read — check the brief against the tree before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every row below with `holds`, `amend`, or `unclear`, each with `file:line` evidence, so
CL6's brief is corrected before a writer opens it. A row you rule `amend` names the correct fact;
a row you rule `unclear` names what you could not settle and why.

## The brief under review

`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl6-brief.md`, with its terrain map at
`.orkestrel/veneer/units/cl6-scout-report.md` and the Orchestrator's ruling at
`units/cl6-retune-measurement.md`. Read both for context and rule against the tree, not against
them.

The subject checkout is `C:/Users/mikes/WebstormProjects/veneer`, whose HEAD is `4f817db` and
whose working tree carries unit CL5c's completed change, pending its landing. **CL5c changed
`src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/core/constants.ts`, and the showcase
section files**, all of which CL6's brief depends on, so read the working tree as it stands.
Read-only audit lanes are examining the same tree; they write nothing.

## Rows

1. **The `link` key's shape.** Confirm the terrain map's reading of
   `tests/fixtures/oracle/inventory.json`: the selector families it lists, the custom properties
   the entry's `properties` object carries, and that the role classes' hover and focus states use
   literal channel triplets rather than a variable. Name any family the map missed.
2. **What the key needs to be listed.** The key carries custom properties, so unlike CL5's keys it
   is not admitted by the empty-properties branch of `collectShippedComponents`. Read that
   function and state exactly what rows this key needs, by category and status, for it to join
   the shipped set. Quote the branch that decides it.
3. **The ledger-derived cases.** Name every case in `tests/setupConformance.test.ts` and
   `tests/conformance.test.ts` whose population or expectation this key's rows would move, and
   say for each whether it scopes to one component or reads the whole table.
4. **The anchor as it stands.** Quote `src/styles/elements/_a.scss` in full, name the case table
   `tests/src/styles/elements/a.test.ts` reads and every value in it, and name every assertion in
   that proof. Confirm the opacity variable is read with a fallback and declared nowhere in
   `src/styles/`.
5. **The link tokens and their consumers.** Name every token whose name contains `link`, where
   each is defined and emitted after CL5c's change, and every Bootstrap custom property aliased
   to one. Then name every file under `src/styles/` and `tests/` that reads any of them. This is
   the blast-radius population the brief tells the unit to measure; your job is to name it, not
   to measure it.
6. **The token and mixin files after CL5c.** State what `src/styles/_tokens.scss` and
   `src/styles/_mixins.scss` now hold that the brief's author may not have known: the mark tokens
   and the mark mixin CL5c added, and whether either affects what CL6 is granted in those files.
7. **The showcase section shape.** CL5c replaced three near-identical sections with a shared base.
   Name the base, its file, what a new section must do to use it, and what its copy type requires,
   so CL6's section is written against what landed rather than against a copied file.
8. **The owned set.** Read the brief's Owned and Off-limits lists line by line against the tree.
   Name any path that does not exist where the brief says it does, any file the change will make
   false that appears in neither list, and any Owned entry the change does not need. Rule
   specifically on whether the brief's grant of `src/styles/_tokens.scss` and
   `src/styles/_mixins.scss` "for the link tokens and their emission alone" is wide enough for
   what row 2 and row 5 imply.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`. Implementation only: report no wording or prose finding, and rule
on no guide row except where row 2 requires naming the rows the listed function reads.

## Output

The row table (`Row | Ruling | Evidence`), then the amendments the brief needs, each as the exact
sentence that replaces the one it corrects. No process diary.
