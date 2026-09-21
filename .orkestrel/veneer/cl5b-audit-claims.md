# CL5b audit — claims

Subject: unit CL5b in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the
base `ea82419` (the CL5 landing), written by `sol` on Astra under
`.orkestrel/veneer/units/cl5b-brief.md` with `units/cl5b-brief-2.md` above it. Report:
`units/cl5b-report.md`. Scope read: `units/cl5b-scope-read-report.md`. The unit's scope was
measured before it was briefed: `units/sweep-styles-authored.log.txt` and
`units/sweep-styles-source-2.log.txt`.

Evidence: the rendered diff `units/cl5b-diff.patch.txt` and status `tmp/audit/cl5b-status.txt`,
the live tree, and the built `dist/src/styles/index.css`.

**Scope of this audit.** Implementation only: correctness, rule compliance, test sufficiency,
scope honesty. Rule on no guide row and report no prose finding of any kind; the guide is outside
this audit entirely and this unit did not touch it.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. The two duplicated blocks are now mixins. `src/styles/_mixins.scss` gains one mixin emitting
   the four heading declarations and one emitting the two image sizing declarations, each named
   for what it emits in the file's existing style. The heading mixin is included by
   `src/styles/elements/_heading.scss` and `src/styles/components/_type.scss`; the image mixin by
   `src/styles/elements/_img.scss` and `src/styles/components/_image.scss`. Each consumer keeps
   its own selector, its layer, and its distinct declarations, and each heading partial keeps its
   own per-level size loop. `_mixins.scss` still emits no top-level CSS.

2. The extraction changed nothing the cascade ships. The built stylesheet is byte-identical
   before and after, by size and by digest (report-only readings from the unit's own comparison,
   which also reports that its changed-byte control is not identical, so the comparison can
   distinguish a difference). The four proofs that read those declarations from the built cascade
   pass with no expectation edited; two are untouched files and two changed only in how they
   obtain the image fixture.

3. The shared-block sweep ships as a covered function. `tests/setupConformance.ts` exports it
   with its result types. That module already owns the Node-side style reads and is the only
   setup module a browser-run project does not load. No existing export of that module changed,
   and no consumer's behaviour changed. The function reads written SCSS, groups declarations by
   brace block, and reports each cross-file block intersection holding two or more identical
   declarations. It uses only Node's own filesystem and path members.

4. The sweep's population is wider than the brief required, and honestly reported. The brief
   named the two style folders; the unit swept every partial recursively under `src/styles/`,
   including the root partials, and recorded `population=48; pairs=1128; hits=0` against the
   supplied measurement's 44 partials and 946 pairs. Widening cannot hide a hit and covers
   future subfolders.

5. The sweep has its own cases and a tree-is-clean case. Its cases live in
   `tests/setupConformance.test.ts` and cover recursive discovery, excluded non-partials and
   directories, block separation, duplicate declarations, include exclusion, line endings,
   comments, interpolation, quoting, the empty and single-member populations, and a missing
   directory. The tree-is-clean case lives in `tests/setupStyles.test.ts`, which already reads
   the built cascade under Node, and it also asserts population membership so an empty discovery
   cannot pass as clean.

6. The tree-is-clean case is proved to fail. A duplicated declaration block planted in two
   partials the extractions never touched reddened exactly that case and no other, with a
   diagnostic naming both files and the planted declarations; removing it returned the suite
   green and restored both files byte for byte (report-only red-then-green). Neither planted file
   appears in the diff.

7. The image fixture has one home. It is exported once from `tests/setupStyles.ts` and imported
   by both image proofs, neither of which declares or inlines its own copy, and the setup
   module's export-name assertion carries the new name.

8. No dependency was added. `package.json` is absent from the diff, the shipped function imports
   no package, and the undeclared source-map library is not imported anywhere the unit changed.
   The browser runs emit pre-existing warnings naming that library, which come from a tool the
   unit did not touch.

9. `[mechanical]` Scope, law, and gates. `tmp/audit/cl5b-status.txt` lists only files the two
   briefs own. `guides/veneer.md`, `src/styles/_tokens.scss`, `_reset.scss`, `tests/fixtures/**`,
   `package.json`, `configs/**`, the vendored files, and every partial outside the four the
   extractions touch are absent from the diff. The added lines carry no `any`, no type assertion
   outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
   no case named for a control; no plant residue remains. Every gate exits 0 on managed Chromium
   and Edge, and the independent verifier's chain is green with the status identical before and
   after.
