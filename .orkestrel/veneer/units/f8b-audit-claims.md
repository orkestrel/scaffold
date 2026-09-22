# F8b SHARED-PREFLIGHT — audit claims

Subject: the F8b unit's uncommitted writes in `/home/user/veneer-f8b` over `0783b2b`, written by
`opus` from `/home/user/veneer-f8b/tmp/units/f8b-brief.md` under the design
`/home/user/veneer-f8b/tmp/units/f8-design-verdict.md` (rulings 4, 5, 9, 10, 11, and the amendment
D16 the Orchestrator took on the unit's D1). Evidence: `/home/user/scaffold/tmp/audit/f8b.diff` (the
whole diff, untracked files as additions), `f8b-status.txt`, the report `f8b-report.md`. Every lane
rules each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is
ruled on the mutation named and whether the assertions distinguish it.

1. **The executed recipe.** `tests/fixtures/tailwind/consumer.css` is the guide's `tailwind` fence
   with `@source './markup.html';` in place of `@source './src';` and no other difference, with the
   cascade `@import` ahead of the `@source` rules (D16); `tests/fixtures/tailwind/markup.html` is one
   root element carrying an element per derived shared name and a `button.btn.px-8`; the consumer
   proof holds the fixture's lines equal to the fence's minus the `@source` line, and removing the
   cascade import from the fence reddens it (recorded `1 failed | 6 passed (7)`).
2. **The resolved import.** The consumer sheet carries the Veneer signature (`TOKEN_PREFIX` inside
   `theme`) and a `utilities` block with `.px-8`, and its layer order reads
   `['properties', …the document's order]` (D3: Tailwind prepends the generated `properties` layer;
   the expectation is derived from the document's order rather than written down); the alias entry
   in `configs/src/vite.tailwind.config.ts` is written ahead of the inherited table and is the only
   change there; the unit's Vite reading (`@import statements must precede all other statements`)
   reproduces for the trailing form.
3. **Bootstrap wins.** `collectSharedNames(cascade, instrument)` derives `col-1` to `col-12`,
   `col-auto`, `container`, `table`, `caption-bottom`, `caption-top` with a floor; every element
   carrying a shared name keeps its non-custom computed snapshot unchanged under the consumer sheet;
   `.btn.px-8`'s inline padding reads `32px` from the generated rule's own declaration against the
   `.btn` declaration's `12px`; the negative control asserts the unexcluded instrument moves
   `.col-1`'s `grid-column-start` from `auto` to `1`; the importance branch runs over a planted
   `@layer components { .col-1 { grid-column-start: 5 !important } }` and reads the important
   declaration winning with the exclusion dropped (D5), while the shipped half asserts the exclusion
   line equals the shared names Veneer declares without `!important`.
4. **The preflight proof.** The overlap derives as the compiled `base` layer's type selectors
   intersected with `ELEMENT_TAGS` (the measured 31 plus `html`, read from `document.documentElement`);
   the property set is the union of the non-custom properties the `base` layer declares; per tag,
   every property Veneer's `elements` layer declares keeps its standalone value (`rebootViolations 0`);
   every moved pair equals a row of the guide's departure table read through
   `readPreflightDepartures`, and the table's rows equal the moved pairs; the plants (a removed row
   `expected [ …(199) ] to deeply equal [ …(198) ]`, an edited value `25px`) are recorded red and the
   live controls (minus a row, plus a fabricated row) sit in the case; the values are byte-stable
   across two runs (25661-byte JSON readings identical).
5. **The shared readers.** `selectSubsectionTables`, `selectTableColumns`, `readTableCells`, and
   `describeIncompleteRow` moved unchanged from `tests/setupServer.ts` to `tests/setupStyles.ts`
   with their cases, imported back, the unused `@orkestrel/markdown` and `@orkestrel/guide` names
   dropped from `setupServer.ts`; `collectFencedBlocks`, `collectTypeSelectors` (D4: in
   `setupStyles.ts` beside the selector readers rather than `setupBrowser.ts`), and
   `readPreflightDepartures` are exported and tested there; `collectSharedNames`,
   `collectDeclaredProperties`, `readComputedSnapshot` are exported and tested in
   `tests/setupBrowser.ts`; `profiles.test.ts` reroutes through `collectFencedBlocks` and
   `collectSharedNames` and adds `consumer.css` to the copy-equality population; every inventory is
   updated; no helper duplicates an `@orkestrel/test` export by job; module helpers use
   `{verb}{Noun}`; no nested functions.
6. **The guide.** § Tailwind carries the import-placement sentence and its reason, the cascade import
   moved ahead of the `@source` rules in both fences, the executed-recipe paragraph replacing `No
   proof compiles either recipe…`, `consumer.css` in the copy-equality sentence, the shared-set
   paragraph, the preflight ruling, the sentence naming the columns, and the departure table (one row
   per moved pair as Chromium 141 reads them); § Files rows for `tests/setupStyles.ts`,
   `tests/setupServer.ts` (reworded at equal width, D7), `tests/fixtures/tailwind/`, `tests/tailwind/`;
   § Tests links the consumer and preflight pairings; the prose follows `writing.md`; rule (subjective
   lane) whether the bundler sentence generalizes beyond the one inliner measured, and whether a
   199-row table belongs in the guide or in a fixture beside the proof, given ruling 9's wording.
7. **Scope is honest.** The status lists owned files only; `src/**`, `tests/setup.css`,
   `preflight.css`, `unexcluded.css`, `tests/src/**`, `tests/app/**`, `package.json`, `vite.config.ts`,
   the `attributeSelector` region of `setupServer.ts`, and the vendored files are untouched;
   `tmp/probe/` is gone.
8. **Gates.** `format:check`, `lint:check`, `check`, `test:src:tailwind` (17), `test:setup:browser`
   (68), `test:guides`, `test:policy`, `test:src:styles` (417) green per the report; `test:setup`
   and `test:conformance` each red on one case needing `dist/src/core/index.js`, which the
   worktree's scope-barred `build:src:core` never produced (D6) — the Orchestrator's own run
   (`npm run build:src:core && npm run test:setup && npm run test:conformance`) settles them; `npm test`
   stopped at that leg with every earlier leg green (journey 100 passed).
