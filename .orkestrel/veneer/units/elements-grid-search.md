# Search: does Elements carry a grid or layout specimen? (2026-09-22)

Pattern `grid-template|display:\s*grid|\.row\b|\.col-|inline-size:\s*min\(|--set-container|--set-width|max-inline-size` over
`/home/user/elements/src/styles/**/*.scss`, and `grid-template|display:\s*grid` for the file list; `grep -rl -i 'grid|layout'` over
`/home/user/elements/app/browser/pages`.

Files declaring a grid: `src/styles/_mixins.scss`, `src/styles/components/_body.scss` (the `body:has(main)` page grid), `src/styles/components/_div.scss`,
`src/styles/elements/_dl.scss` and `_dt.scss` (the description-list two-column grid), `src/styles/elements/_fieldset.scss` (a comment), `src/styles/modifiers/_local.scss`.
No `.row`, `.col-*`, container-width, or gutter class exists; `.row` appears only as a form-layout modifier comment in `src/styles/elements/_form.scss:7`. Spacing rests on
`--spacing` and `--set-gap` (`src/styles/_tokens.scss:209`). Pages mentioning grid or layout: `SectioningPage.vue`, `NavPage.vue`, `AsidePage.vue`, `TablesPage.vue`,
`ListsPage.vue`, and the `Use*` pages, none a column grid.

Reading: Elements has no Bootstrap-style grid specimen; the grid keys are judged against Bootstrap's own page, and the appearance packet records that with this pattern.
Elements owes layout its spacing scale, dialog widths, and motion tokens, which are measurable.
