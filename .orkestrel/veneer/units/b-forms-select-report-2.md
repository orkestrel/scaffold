# Unit B-FORMS-SELECT, round 2 — report

Successor to `tmp/units/b-forms-select-report.md` (unedited). Brief: `tmp/units/b-forms-select-brief-2.md`.
Engine: `opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-bfs` (detached at
`2c10329`, round-1 writes uncommitted). Deviation state: none; no stop condition fired.

## Carried findings and the sites they changed

1. **Claim 3, the select's text color.** `tests/setupStyles.ts` › `FORM_SELECT_CASES` gains a
   `.form-select` `color` row (`var(--bs-body-color)`) and a `background-color` row
   (`var(--bs-body-bg)`), both in the release's declaration order. The browser proof gains the case
   `paints the text in the body color in both modes, over a color its wrapper sets` (light and dark
   islands; each wrapper sets `color: rgb(1, 2, 3)`; `readToken` and `matchesColor` against
   `--bs-body-color`; the two modes' body colors are also held apart). The `FORM_SELECT_CASES` TSDoc
   is bounded to the rows it carries and names the cases that read the `background-image`
   declaration, the transition, the focused border and ring, and the `outline` value. The binding
   `tests/setupStyles.test.ts` › `binds every select case row and the focus treatment to the official
   inventory` gains an executed assertion for that bound: the `.form-select` rule's recorded
   declarations that carry no row are exactly `-moz-appearance`, `-webkit-appearance`,
   `background-image`, and `transition`. The guide's evidence paragraph in § Form select classes is
   bounded to the table's rows and names the cases that read the image, the transition, and the
   focused border, ring, and outline.
2. **D30, one `@each` for the size pair.** `src/styles/components/_form-select.scss` declares a
   module-level `$sizes` map (`sm`, then `lg`, the release's order), each entry a map of `block`,
   `inline`, and `font`; one `@each $size, $geometry in $sizes` emits `.form-select-#{$size}` with
   every declaration, the corner reading `var(--bs-border-radius-#{$size})`. Compile comparison in
   § Compile comparison.
3. **Claim 6, bare code tokens.** § Form select classes: every code token carries its noun (the
   `src/styles/components/_validation.scss` partial, the `src/styles/_tokens.scss` file, the
   `--bs-form-select-bg-img` property, the `.form-select` class, the `--vn-space-*` tokens, the
   `--vn-factor-density` token, the `.btn` class, the `#86b7fe` literal, the `-webkit-appearance` and
   `-moz-appearance` aliases, the `.form-select.is-valid:focus` and `.form-select.is-invalid:focus`
   selectors, the `--bs-*` variables, the `.form-select:focus` rule, and so on). The caret sentence
   no longer makes the partial the subject of "reads": the caret "comes from the maps in the
   `src/styles/_tokens.scss` file at compile time", and the property and the dark rule "take" their
   entries. Sweep after editing: every backticked span in the section is followed by a noun or
   closes a list ending in a plural noun; the case-insensitive word sweep for `should`, `simply`,
   `easy`, `just`, `currently`, `now`, `new`, `latest`, `utilize`, `leverage`, `via`, `etc`,
   `performant`, `robust`, `once`, `since`, `above`, `below`, `please`, `ensure`, and `guarantee`
   over the section returned no hit.
4. **Claim 7, the D26 carrier list.** No code changed. The ROADMAP patch's "Theme-scope select caret
   and switch knob" row names B-FORMS-ASSETS per D26 and lists every site, by symbol.
5. **F1, the focus comment.** The `.form-select:focus` comment in the partial ends "so a retune of the
   focus tokens moves this ring together with the button's".
6. **F2, the density claim.** The partial's `.form-select` comment and the guide's spacing departure
   bullet are bounded to a select with no validation state and state that a validation state keeps the
   release's literal icon geometry (the guide points at § Validation classes). No proof added. The
   ROADMAP patch adds the B-FORMS-CLOSE row.
7. **F3, the case titles.** `resolves each recorded declaration…` keeps only the row readings; its
   other assertions moved, none deleted, to `finds no Gecko focus-ring rule in the Chromium cascade`,
   `keeps the caret on a single-row select the sized rule excludes`, and `leaves a select without the
   class to the user agent's appearance and ring` (which also takes the bare select's ring readings
   from the focus case). `rings the select under keyboard focus…` keeps the ring, tint, outline, and
   button-binding readings; the focus-width retune moved to `widens the focused ring when the focus
   width is retuned` and the disabled refusal to `refuses keyboard traversal to the disabled select`.
   Case order: the row readings, the Gecko absence, the single-row caret, the bare select, the globals,
   the body color, the dark caret, the retunes, the spacing, the focus ring, the focus-width retune,
   the disabled refusal, the transition.
8. **F4, the term pair.** The dark-caret case's `bright` and `dim` bindings are `light` and `dark`. A
   word-boundary grep for `bright`, `dim`, and `every ring` over `tests/` and `src/` finds none in the
   owned files; `tests/src/styles/components/form-range.test.ts` keeps "moving every ring this package
   paints" in a comment (outside scope, see § Flagged).
9. **R3 and R5, carrier rows.** The ROADMAP patch adds both B-PASSIVE-CLOSE rows.

Ancillary choices recorded: the map is `$sizes` with keys `block`, `inline`, `font`; the split-case
order is the one in finding 7; the token nouns are the ones in finding 3.

## Plants

Every browser plant ran `npm run build:src:styles` before the proof, because the styles project loads
`dist/src/styles/index.css` as a setup file. Browser command:
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts`.
Setup command: `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts`.

| Plant | Mutation | Reddened (count) | Exact revert | After revert |
| ----- | -------- | ---------------- | ------------ | ------------ |
| Colour, browser (finding 1) | delete `color: var(--bs-body-color);` from `.form-select` | `paints the text in the body color in both modes, over a color its wrapper sets`; `resolves each recorded declaration…` with drift `.form-select { color: rgb(0, 0, 0) } against oklch(0.208 0.042 265.755)` (2 failed, 11 passed) | re-insert the line after `line-height: var(--vn-line-body);`; compile `cmp` against the pre-change compile exits 0 | 13 passed |
| Colour, setup (finding 1) | delete the `.form-select` `color` row from `FORM_SELECT_CASES` | `binds every select case row and the focus treatment to the official inventory`, received list gains `color` (1 failed, 86 passed) | re-insert the row after the `line-height` row; `cmp` against the pre-plant copy exits 0 | 87 passed |
| Single-row caret (finding 7) | `.form-select[size]:not([size='1'])` to `.form-select[size]` | `keeps the caret on a single-row select the sized rule excludes` (1 failed, 12 passed) | the reverse `sed` substitution | see the next row's revert reading |
| Focus width (finding 7) | `0 0 0 var(--vn-focus-width) var(--vn-focus-color)` to `0 0 0 0.25rem var(--vn-focus-color)` | `rings the select under keyboard focus…`; `widens the focused ring when the focus width is retuned` (2 failed, 11 passed) | the reverse `sed` substitution; compile `cmp` against the pre-change compile exits 0 | 13 passed |

Negative control: the colour plant first ran without the styles rebuild and stayed 13 passed, which is
the reading that showed the proof loads `dist/`. Every plant after that rebuilt first.

## Compile comparison

- Before: `npx --no-install sass --no-source-map src/styles/components/_form-select.scss tmp/probe/form-select-before.css`, exit 0.
- After the `@each`: the same command to `tmp/probe/form-select-after.css`, exit 0.
- `cmp tmp/probe/form-select-before.css tmp/probe/form-select-after.css`: exit 0.
- Control: a copy with `16px 12px` changed to `16px 13px` gives `cmp` exit 1 ("differ: char 19507, line 493").
- `tmp/probe/` removed at the end.

## Shipped-list key

`tests/setupServer.test.ts` (report-only) must gain `form-select` in the shipped-key Set literal, after
`form-range`. `git apply --check` passes against the tree:

```diff
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1322,6 +1322,7 @@
 				'engine',
 				'figure',
 				'form-range',
+				'form-select',
 				'g',
 				'gx',
 				'gy',
```

## ROADMAP patch

Findings 4, 6, and 9 applied; the B-FORMS row records this round. Built against the tree's
`ROADMAP.md`; `git apply --check` passes.

```diff
--- a/ROADMAP.md
+++ b/ROADMAP.md
@@ -275,7 +275,7 @@
 | T3 TEST-PUBLISH          | user, one-time code; `verifier` on Sonnet reads the release gates first                                                                                                                                                                                                                                                                                                                                                                                                     | Test                                         | T1, T2                | the registry serves the release carrying T1 and T2                                                                                                                                                                                                                                                                                                                                                               |
 | F9 VENEER-REPIN          | `builder` on Sonnet; Orchestrator runs `npm ci`; `verifier` on Sonnet                                                                                                                                                                                                                                                                                                                                                                                                       | Veneer                                       | T3                    | the pin to that release; `holdOraclePointer` and the `focus()` call in `pressOracleKeys` deleted for the installed scoped hold and traversal, with the recording side moved to Tab traversal and the fixture re-recorded; the Compatibility section's forced-colours reading closed; the receipt naming the build                                                                                                |
 | B-PASSIVE                | units A to E on `opus` on Opus 5 in parallel worktrees from `3a9202a`, per `/home/user/scaffold/.orkestrel/veneer/b-passive-design-verdict.md` and the baseline addendum; landed: D as `bcf938c`, B as `7b922b6`, E as `70a7487`, C as `6cce83f`, and A as `62ff1a6` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its fix rounds by `analyst`); B-SWEEP landed as `71b7388` under D15; B-PASSIVE-CLOSE carries the family's cross-cutting rows | Veneer                                       | F7                    | the passive family as a Bootstrap baseline under the accounting gates                                                                                                                                                                                                                                                                                                                                            |
-| B-FORMS                  | eight units by key closure per `/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md` (VALIDATION, RANGE, GROUP, CHECK, FLOATING, CONTROL, SELECT, CLOSE) on `opus` on Opus 5; VALIDATION landed as `d4f78e5` and RANGE as `376255a` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst`); GROUP is next                                                                                                   | Veneer                                       | B-PASSIVE             | the forms family                                                                                                                                                                                                                                                                                                                                                                                                 |
+| B-FORMS                  | eight units by key closure per `/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md` (VALIDATION, RANGE, GROUP, CHECK, FLOATING, CONTROL, SELECT, CLOSE) on `opus` on Opus 5; VALIDATION landed as `d4f78e5` and RANGE as `376255a` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst`); SELECT ran in `/home/user/veneer-bfs` on Opus 5.5, its audit (`analyst` on Astra, `reviewer` on Opus 5.5, and `checker`) failed claims 3, 6, 7, and 10, and its fix round ran there on Opus 5.5 and awaits its fix audit; GROUP is next | Veneer                                       | B-PASSIVE             | the forms family                                                                                                                                                                                                                                                                                                                                                                                                 |
 | B-COLLAPSE … B-SCROLLSPY | `opus` on Opus 5.5, one unit per component                                                                                                                                                                                                                                                                                                                                                                                                                                  | Veneer                                       | B-FORMS               | the disclosure and navigation family; the cancelable event, the entity-neutral binder, and the generalized delegation land with Collapse                                                                                                                                                                                                                                                                         |
 | B-MODAL … B-CAROUSEL     | `opus` on Opus 5.5, one unit per component                                                                                                                                                                                                                                                                                                                                                                                                                                  | Veneer                                       | B-SCROLLSPY           | the overlays and feedback family; the focus primitive lands with Modal                                                                                                                                                                                                                                                                                                                                           |
 | B-UTILITIES              | `opus` on Opus 5.5, one unit per mechanism                                                                                                                                                                                                                                                                                                                                                                                                                                  | Veneer                                       | B-CAROUSEL            | every remaining helper and utility root, the gap keys included                                                                                                                                                                                                                                                                                                                                                   |
@@ -372,15 +372,18 @@
 | Frame grammar; unaligned filename stems; one-sided palette gap; accessibility artifacts not comparable; the link key's single-anchor frame; the pixel guard running only under the capture flag; the sampler's origin pixel | F7 CAPTURE                                                                                                                                                                                                                                                                    |
 | Portfolio finding 5 (differing context) and finding 7 (ineffective link crop)                                                                                                                                               | F7 CAPTURE proves comparable context and includes the link's actual background                                                                                                                                                                                                |
 | Caption opt-out                                                                                                                                                                                                             | F6 FOUNDATION landed the consumer class and the guide's recorded consequence; F7b CAPTION-SPECIMEN supplies the specimen and its scenarios                                                                                                                                    |
-| Theme-scope select caret and switch knob                                                                                                                                                                                    | B-FORMS-SELECT removes `select-indicator` and B-FORMS-CHECK removes `switch-knob` from `$assets`, each with the `tokens.test.ts`, `theme.test.ts`, and guide patch the VALIDATION report carries, in the change that ships the component rule declaring the dark value        |
+| Theme-scope select caret and switch knob                                                                                                                                                                                    | B-FORMS-ASSETS (`builder` on Sonnet, per D26) removes `select-indicator` and `switch-knob` from `$assets` after B-FORMS-CHECK and B-FORMS-SELECT land their component-level dark rules, and amends every site the `select-indicator` removal makes false: the `tokens.test.ts` case `re-declares every theme-dependent name inside each mode scope` (its dark `--bs-*` comparison against `BOOTSTRAP_DARK_VARIABLES`); the `theme.test.ts` case `carries the dark-only component assets in the dark scope alone`; the `$assets` doc comment in `_tokens.scss`; the § Form select classes sentence "Both declarations sit on the element, so each outranks the value the dark theme scope also declares for that variable"; the § Bootstrap variables Veneer retains paragraph's sentence "The dark scope declares `--bs-form-select-bg-img` the same way"; and in `form-select.test.ts` the case title `paints the dark caret on the element inside a dark scope, over the one the theme scope declares` and its comment opening "The dark scope declares the caret variable on itself as well"; B-FORMS-CHECK's report names the `switch-knob` sites |
 | Validation tooltip specimens                                                                                                                                                                                                | B-FORMS-GROUP adds `Valid tooltip` and `Invalid tooltip` inside the positioned `.input-group` ancestor and registers their scenarios                                                                                                                                          |
 | Cascade-key prose (the `CASCADE_KEYS` doc block and the journey's rest case title enumerate the keys)                                                                                                                       | B-FORMS-CLOSE rewrites both once for the family                                                                                                                                                                                                                               |
+| The validated select stops following density: its `padding-right` and caret inset in `_validation.scss` read literals (`4.125rem`, `right 0.75rem center`) while the select's own read `--vn-space-*`                       | B-FORMS-CLOSE (the SELECT audit's R2) rules on the validated select's end padding and caret inset against the select's own space tokens, and restates the § Form select classes density sentence to match                                                             |
 | The guide's § Showcase region paragraph enumerates the regions and stops before the passive families' regions                                                                                                               | B-PASSIVE-CLOSE rewrites it once for the family                                                                                                                                                                                                                               |
 | § Customization's claim that every derived tier follows a `--vn-color-primary-base` retune (the pagination and list-group active fills and the range thumb read the palette entry)                                          | B-PASSIVE-CLOSE bounds the sentence once for the family                                                                                                                                                                                                                       |
 | A cross-reference `below` in a `tests/setupServer.test.ts` comment (around the row-category case)                                                                                                                           | B-PASSIVE-CLOSE rewrites it with the shipped-key literal consolidation                                                                                                                                                                                                        |
 | The component-section sentences naming a barrel neighbour ("loads after the vertical rule", "after the card") go false as siblings land                                                                                     | B-PASSIVE-CLOSE rewrites each to the barrel's Bootstrap order                                                                                                                                                                                                                 |
 | The per-family driven-key lists (`BUTTON_KEYS`, `PAGINATION_KEYS`, `VALIDATION_KEYS`, and the siblings) each rewrite the `CAPTURE_KEYS` spread and its assertion (D20)                                                      | B-PASSIVE-CLOSE consolidates them into one driven table appended the way `CASCADE_KEYS` is                                                                                                                                                                                    |
 | The guide's § Tests stem table omits the scenarios the VALIDATION, D, B, RANGE, A, and C units registered (only E added its rows)                                                                                           | B-PASSIVE-CLOSE adds every registered stem once, or derives the table from the registry under a parity check in `tests/guides/`                                                                                                                                               |
+| The `MOTION` literal `(prefers-reduced-motion: reduce)` repeated across the range, select, pagination, progress, icon-link, and spinner proofs                                                                              | B-PASSIVE-CLOSE replaces it with one setup constant in `tests/setupStyles.ts` and routes every proof through it                                                                                                                                                               |
+| The guide-wide token-noun sweep: code tokens without a following noun beyond the sections the forms units own                                                                                                               | B-PASSIVE-CLOSE sweeps the guide once against the writing rule's § Code tokens, references, and links, giving every code token its noun                                                                                                                                                                 |
 | The `.btn-close` departure rows filed under `btn` while `attributeSelector` now answers `btn-close` (D22)                                                                                                                   | the Orchestrator regroups them under `#### btn-close` at B-PASSIVE-A's landing, proved by the conformance gate                                                                                                                                                                |
 | Helper key with no subject region and no showcase home                                                                                                                                                                      | F7 CAPTURE establishes the subject contract; B-UTILITIES supplies each remaining real consumer                                                                                                                                                                                |
 | Normalizer regression case's local inventory literal; the token-table completeness gate and its named trap                                                                                                                  | F5 ACCOUNTING                                                                                                                                                                                                                                                                 |
```

## Gates

| Gate | Command | Exit | Reading |
| ---- | ------- | ---- | ------- |
| Format, owned files | `npx oxfmt --config .oxfmtrc.json --check` over the five owned files | 0 | 5 files |
| Lint, owned TypeScript | `npx oxlint --config .oxlintrc.json --deny-warnings` over the three owned `.ts` files | 0 | — |
| Typecheck | `npm run check` | 0 | the first run exited 2 on TS2345 in the new binding assertion; typing the set `Set<string>` closed it |
| Build | `npm run build:src` | 0 | — |
| Setup | `npm run test:setup` | 1 | 1 failed, 185 passed; the failure is `skips engine and CSS obligations whose Proof cell is a dash`, the Set literal missing `form-select` |
| Select proof | the browser command in § Plants | 0 | 13 passed |
| Conformance | `npm run test:conformance` | 1 | 1 failed, 16 passed; "Shipped component form-select is missing selector .form-floating > .form-select", the sibling-absent presence reading |
| Guides | `npm run test:guides` | 0 | 18 passed |

Observations, not criteria: `npm run test:src:styles` exit 0 (71 files, 647 tests); `npm run
test:policy` exit 0 (109 passed, 1 skipped). `npm run test:journey` and the capture runs were not
taken. A single-file rerun of `tests/setupServer.test.ts` timed out once in `records and reads official
control state and rejects contradicted or absent obligation steps` (10100 ms); the same case passed in
the `npm run test:setup` project run. The proof's last run followed a comment-only edit that `npm run
check` did not re-read.

## Flagged as unverified

- The guide's statement that a validated select keeps the release's end padding and caret inset at any
  density rests on reading the validated-select rule in `_validation.scss`; the brief bars a proof here.
- The ROADMAP row's claim that the `tokens.test.ts` case goes false through its comparison against
  `BOOTSTRAP_DARK_VARIABLES` is read, not run. The `tests/setupStyles.test.ts` case `refuses an asset
  key the dark map does not declare…` configures its own `$assets`, so I read it as staying true after
  the removal; not run.
- The colour case's comment says a select without the declaration paints the user agent's field text;
  that was read in Chromium only (`rgb(0, 0, 0)` in the light island).
- `tests/src/styles/components/form-range.test.ts` carries the same package-wide ring overclaim F1
  closed here ("moving every ring this package paints"); it is outside this unit's files and has no
  carrier yet.
