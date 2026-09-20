# U3 audit round 2 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after briefs 4 and 5
(`.orkestrel/veneer/units/u3-brief-4.md`, `u3-brief-5.md`; reports `units/u3-report-2.md`,
`units/u3-report-3.md`), on top of the U1 landing `b661142` and the Orchestrator's integrated D3,
D4, and D6 patches. Native Opus 5 wrote the unit, so the `analyst` on Astra holds the OBJECTIVE
lane and the `reviewer` on Opus holds the SUBJECTIVE lane and is told its engine wrote the work.
Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). Read the diff and the live files, never the reports alone; run the
narrowest read-only reading where a claim names one. Law: scaffold's `AGENTS.md`,
`.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`, `typescript.md`,
`writing.md`, `documentation.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **One guide.** `guides/tokens.md` is absent; `guides/veneer.md` § Tokens carries the reference
   map, the retained Bootstrap variables, the customization recipe, the departures from
   Bootstrap, and the deferred names, with every moved relative link resolving from its new home;
   `guides/README.md`'s `src/styles` row and stylesheet paragraph and `README.md`'s token sentence
   name `guides/veneer.md` § Tokens and no `tokens.md`.
2. **Value sources.** In § Reference map, `--vn-space-1` is `derived` with the scale expression;
   each `--vn-stack-*` rung is `bootstrap` retained naming its `$zindex-*` Sass variable;
   `--vn-link-decoration` carries its retained reason; every `derived` cell names the expression
   or the reading it targets.
3. **Cascade values.** In `src/styles/_tokens.scss` the shadow tokens' colours are
   `rgba(var(--vn-palette-black-rgb), α)` and their geometry is authored in `rem` at Elements'
   values under the `--vn-factor-elevation` multiplier; `--vn-focus-width` is `0.1875rem`; every
   guide row publishing those values carries the authored value (report 2's re-read table holds
   the pairs); the departures table has a `--vn-font-sans` row naming the families Veneer drops,
   read from the oracle's `--bs-font-sans-serif`.
4. **Guide truth.** § Tokens opens with the specifiers sentence and the sentence stating where
   names and values live; states the member-shape rule; writes the alpha example as
   `rgba(var(--vn-color-primary-rgb), 0.5)`; its customization fence declares the triplet beside
   the base and carries the dark-island line; the sentence that the tiers and the `--bs-*`
   aliases follow the base while the triplet is literal is proved by
   `tests/src/styles/integration.test.ts` reading the emphasis and border tiers, the triplet, and
   the dark island; the agreement rows sit in a sentence after the departures table; the deferred
   row names the hint surface and the component-scoped tokens; no count phrase survives in the
   guide or in `src/styles/_theme.scss`'s comment; the `interpolate-size` bound is recorded.
5. **The Bootstrap oracle.** `tests/setupStyles.ts` exports `extractBootstrapVariables(cascade,
   scope)` walking every rule of supplied text with the anchored predicates (`/^:root(,|$| )/`,
   `/^\[data-bs-theme=dark\]/`), trimming values; `tests/setupStyles.test.ts` pins
   `BOOTSTRAP_ROOT_VARIABLES` and `BOOTSTRAP_DARK_VARIABLES` `toStrictEqual` the reading over the
   installed stylesheet (no hard-coded lengths), keeps the digest and version assertions, and
   pins every row of `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` to the root reading;
   `tests/src/styles/tokens.test.ts` compares each retained token's resolved value in the browser
   against the same table (colours through `matchesPaintedColor`, lengths as numbers) and makes
   the dark partition an equality over the dark list plus `THEME_DARK_ADDITIONS`; the exclusions
   from the tables are named in TSDoc with their reason. `PLANT-MEMBER`, `PLANT-ADDITION`, and
   `PLANT-VALUE` reddened the assertions report 2 names and every plant is removed.
6. **Proofs.** The invalid-factor case sets the invalid value on the document element and reads
   the registered initial value's result (`6px`); shadow assertions compare through parsed parts;
   the forced-colors case compares parsed colours; one case per remaining factor rescales through
   a consuming property and restores; the tier mixin is proved through paint with the
   declaration-text assertion as a presence guard. `PLANT-REGISTER`, `PLANT-SCROLL`,
   `PLANT-COMBINATOR`, and `PLANT-TIER` reddened the named assertions and are removed.
7. **Shared infrastructure.** No proof file under `tests/src/styles/` or `tests/src/core/`
   declares a module-scope helper; `tests/setup.ts` exports `collectTokenNodes` with its
   behavioural cases in `tests/setup.test.ts`, which `npm run test:setup` runs; the DOM-dependent
   cascade readers (`readCascadeSheet`, `collectNestedRules`, `collectScopeProperties`,
   `collectLayer`) live in `tests/setupBrowser.ts` with a case each in
   `tests/setupBrowser.test.ts`; `tests/setupStyles.ts` imports nothing from `vitest/browser` or
   `@orkestrel/test/browser`, references no `document`, and every export it keeps has a case in
   `tests/setupStyles.test.ts`; `tests/src/styles/fixtures/colors.ts` is gone.
8. **The installed surface.** `tests/setupBrowser.ts` exports no name the installed
   `@orkestrel/test/browser` `0.0.18` (U6 tarball) declares and imports no `CDPSession`; every
   surviving local helper (`mountSpecimen`, `loadStylesheet`, `clearSpecimens`,
   `readPaintedColor`, `matchesPaintedColor`, or whichever the report keeps) names in its TSDoc's
   first paragraph the installed export it overlaps (`render`, `build`, `extractStyles`,
   `readContrast`, `matchesColor`, `parseCSSColor`, `blendColor`) and the one thing it does that
   the export cannot, and has a case in `tests/setupBrowser.test.ts` that reddens when the
   installed export is substituted (the lanes substitute and read); reduced motion is driven
   through the installed `stageMedia({ motion: false })` and `releaseMedia()`; forced colours
   through `sendProtocol('Emulation.setEmulatedMedia', …)` with a reset in the same case's
   cleanup; any pseudo-element read uses the installed `readStyle` or `readPixels` with its
   `pseudo` argument.
9. **Scanner reach.** The physical-longhand list carries `scroll-margin-left`,
   `scroll-margin-right`, `scroll-padding-left`, `scroll-padding-right`, and the side-keyword list
   carries `text-align-last`, each with a case; `matchesLooseTagPair` counts a pair only across a
   descendant, child, or sibling combinator, treats a tag inside `:is()` or `:where()` as a tag,
   and treats `h1, p` as a list, with the three named cases.
10. **Names.** The two `tests/setupStyles.test.ts` cases once named for "the objective lane edge
    forms" are named for the forms they cover; the mixin is `role-each` at its declaration, its
    include, and the fixture, and `palette-each` appears nowhere under `src/`, `tests/`, or
    `guides/`; the specimen cleanup is `clearSpecimens`, and no `reset*`, `run*`, or other banned
    lifecycle synonym is exported; every helper prefix follows `.claude/rules/names.md` § Helper
    prefixes (`read*` for a live host read alone; `extract*`, `collect*`, `scan*`, `compute*`,
    `normalize*`, `matches*` by their meanings).
11. **Transcription.** No byte-for-byte claim survives in the integration proof's TSDoc or the
    guide; each says the proof executes the recipe the guide shows.
12. **Placement (the tree audit's second half).** Every file U3 owns sits where
    `.claude/rules/architecture.md` § Centralized-file pattern, `tests.md`, `names.md` § Files
    and folders, and `styles.md` place it: `src/core/types.ts` and `constants.ts` hold their kinds
    alone and are exported through `src/core/index.ts`; `src/styles/_tokens.scss`, `_theme.scss`,
    `_mixins.scss`, `index.scss`, and `elements/_html.scss`, `elements/_body.scss` follow the
    styles partial rules (layers, `@use`, logical properties, no literal colour outside
    `_tokens.scss`); every test under `tests/src/styles/` is named for the partial it proves and
    mirrors its path (`elements/html.test.ts`, `elements/body.test.ts`); `tests/src/styles/fixtures/`
    holds data files alone (`mixins.scss`) and no TypeScript; no lone class nests in a folder; no
    file the kind table does not place exists.
13. **Law over the diff.** No `any`, non-null assertion, type assertion, `@ts-` directive,
    `eslint-disable`, default export outside a config file, nested function, or module-scope
    declaration in a proof file; interface properties and returned collections are readonly;
    TSDoc and the guide follow `writing.md` (no count over a growable set, no banned term, no
    time word, `both` only where the sentence names the members) and `documentation.md` parity
    (every backticked API in the guide resolves; every core export is documented; `Summary` cells
    equal their doc paragraphs).
14. **Unknowns answered by readings.** Report 2 records the raw `rem`-shadow readings on both
    engines, the tier readings on both engines, and the `test:guides` section-set answer; report 3
    records the overlap decisions with their substitution readings and the placement table.
15. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
    0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
    `test:distribution` resolves `./styles` from the packed tarball; `scaffold audit` reports no
    drift.
