# UTIL-SPACER (`us`) round 3 report

## Outcome

`tmp/units/us-shared-3.patch` regenerated against `c3ac297`. `git -C tmp/probe/land apply --check` (rebuilt as `tmp/probe/land3` for the final check, both swept before this report) exits `0`. The gates in criterion 3 all pass on the validation copy. One hunk from `us-shared-2.patch` could not be carried and is recorded under Deviations.

## Hunk relocations (site at `c3ac297`, by heading and first line)

| File | Site (heading / first line) | Added lines equal round 2's |
| --- | --- | --- |
| `app/browser/constants.ts` | `LAYOUT_COPY.paragraph` string ending "…gutter and row-gap steps." | Yes |
| `app/browser/constants.ts` | `LAYOUT_SPECIMENS`, after the `Vertical rule` entry | Yes |
| `tests/setup.ts` | `JourneyState` union, after `'Waving placeholder'` | Yes |
| `tests/setup.ts` | `JOURNEY_SCENARIOS` (the array closed by `legend.col-form-label` / `margin-bottom`) | Yes |
| `tests/conformance.test.ts` | shipped-component `listed` array, `'col'` / `'container'` boundary | Yes |
| `tests/conformance.test.ts` | same array, `'g'` / `'gx'` boundary | Yes |
| `tests/conformance.test.ts` | merged into the existing `it('loads the passive block and the helpers in the release order, after every forms partial')` case (see Merged case, next) | No — the assertions are the round-2 case's, carried whole; see Deviations item 2 |
| `tests/setupServer.test.ts` | `'col'` / `'container'` boundary | Yes |
| `tests/setupServer.test.ts` | `'g'` / `'gx'` boundary | Yes |
| `tests/setupStyles.ts` | `GAP_STEP_CASES` doc comment | Yes |
| `guides/veneer.md` | § Styles, after "…§ Tailwind states how a paired build keeps that true." | No — text replaced per Deviations item 3 |
| `guides/veneer.md` | file table, `src/styles/utilities/_gap.scss` row | Yes |
| `guides/veneer.md` | § Tailwind, importance-branch paragraph | No — one clause replaced per Deviations item 4 |
| `guides/veneer.md` | § Tailwind, stylesheet-profiles paragraph | Yes |
| `guides/veneer.md` | new `### Gap utilities` section, between `### Helper classes` (ends "…whatever the document's writing direction.") and `### Deferred selectors` | Yes |
| `guides/veneer.md` | tokens paragraph, "The gutter and row-gap utilities read a separate scale." | Yes |
| `guides/veneer.md` | `#### column-gap` table, inserted between `#### col` and `#### container` | Yes |
| `guides/veneer.md` | `#### gap` table, inserted between `#### g` and `#### gx` | Yes |
| `guides/veneer.md` | compatibility table, `gap` and `column-gap` rows between the `row-gap` row and the `row` rows | Yes |
| `guides/veneer.md` | Showcase section, "…a Layout region carrying the container, grid, and gutter specimens…" | Not carried — see Deviations item 1 |
| `guides/veneer.md` | proof list, "the gutter utilities" link line | Yes |
| `ROADMAP.md` | CL8b row | Yes |

## Merged case (`tests/conformance.test.ts`)

Per the coordinator's mid-campaign decision 2, the round-2 patch's separate `it('loads the helpers and the utilities in the release order, each important helper ahead of the utilities')` case is merged into the existing `it('loads the passive block and the helpers in the release order, after every forms partial')` case rather than landing as a second case. The merged title is:

`loads the passive block and the helpers in the release order, after every forms partial, each important helper ahead of the utilities`

It now holds, in order: the passive-partial rename and order assertion (unchanged from before round 2); the round-2 `passiveHelpers` filter and its order assertion against `afterForms` (renamed from the pre-existing `helpers` local to `passiveHelpers` to avoid shadowing); the round-2 case's full unfiltered `helpers` list assertion; the `entries` (utility map) slice assertion for `gap`, `row-gap`, `column-gap`; the `helperPaths`/`entryPaths` path-mapping assertion; the `utilities/gap` containment assertion; the components-order assertion; and the utilities-order assertion (important helper ahead of every utility partial). No assertion is dropped and no assertion is duplicated. `oxfmt` reformatted the `passiveHelpers` block during validation (a multi-line call folded to two lines); the formatted shape is what the patch carries.

## Gates (`tmp/probe/land2`, rebuilt from `c3ac297` plus the owned round-2 files plus this patch, swept after this report was written)

```
$ git -C tmp/probe/land apply --check tmp/units/us-shared-3.patch
exit=0

$ npm run build:src
exit=0 (dist/src/browser, dist/src/styles built)

$ npm run build:app
exit=0 (dist/app/browser built)

$ npx oxfmt --check app/browser/constants.ts tests/setup.ts tests/conformance.test.ts tests/setupServer.test.ts tests/setupStyles.ts guides/veneer.md ROADMAP.md
All matched files use the correct format.
exit=0

$ npm run check
exit=0

$ npm run test:guides
Test Files  1 passed (1)
Tests  19 passed (19)

$ npm run test:policy
Test Files  1 passed (1)
Tests  109 passed | 1 skipped (110)

$ npm run test:conformance
Test Files  1 passed (1)
Tests  22 passed (22)
```

## Added/removed line comparison against `us-shared-2.patch`

Per-file, split on `+++ b/` markers, sorted, and diffed:

- `app/browser/constants.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `ROADMAP.md`: added and removed multisets equal round 2's exactly.
- `tests/conformance.test.ts`: added lines carry every assertion round 2's added case carried (see Merged case); the multiset differs from a literal line-for-line match because the assertions now sit inside the existing case rather than a second one, per the coordinator's decision.
- `guides/veneer.md`: differs from round 2's added/removed multisets for the reasons in Deviations items 1, 3, and 4, plus one unrelated base-drift wrap (see Deviations item 5).

## Deviations

1. **Showcase "Layout region" sentence — site not located, hunk not carried.** Expected: the sentence "…the icon links, and a Layout region carrying the container, grid, and gutter specimens and the vertical rule…" in the Showcase section, so round 2's added clause ", gap," could be inserted after "grid,". Found: at `c3ac297` the Showcase paragraph reads "The Content region carries the text specimens, lists, quotations, code, media, tables, form controls, and interactive tags. Each helper key sits in the region whose subject it belongs to rather than in a region of its own, which is how every other section is grouped: the icon links sit in Links, the aspect-ratio boxes share Media with the image classes and the figure classes, the vertical rule sits in Layout, and the list and quotation classes sit in Type." Neither `us-shared-2.patch`'s own hunk headings nor `b-utilities-us-report-2.md` § Changes by finding names this site (F3, F4, F5, F6, and F7 name the other sites; none names the Showcase region enumeration). Not done: this hunk is absent from `us-shared-3.patch`. Hypothesis: a prior guide unit (CLOSE-GUIDE or B-PASSIVE-ORDER-GUIDE) consolidated the per-region enumeration into one `Content` region paragraph that no longer states what each region carries in the "region carrying X, Y, Z" form the round-2 hunk edited, so there is no analogous site to carry the added clause into without inventing new sentence structure.

2. **Mid-campaign decision 1 (brief fault).** The brief's line naming "`b-utilities-us-report-2.md` § Guide text" pointed at a section the report does not have. Located every guide site from `us-shared-2.patch`'s own hunk headings and text and from the report's § Changes by finding table instead, as instructed.

3. **Mid-campaign decision 2 (merged conformance case).** Applied as described in § Merged case, above.

4. **Mid-campaign decision 3a, corrected.** The first version sent read: "Every utility partial writes its classes through the `utility` mixin in the `src/styles/_mixins.scss` file, and a utility that sets a `--bs-*` custom property writes it through the `utility-variable` mixin, so no partial writes an `!important` flag by hand." The coordinator's correction (the objective lane's finding that `src/styles/components/_link.scss` writes `css-var` utilities and a hand-written `!important` offset at this landing, so no universal claim holds) replaces that sentence and the following "so no partial writes…" clause with: "The `utility` mixin in the `src/styles/_mixins.scss` file writes a utility key's classes, and the `utility-variable` mixin writes a utility entry whose value is a `--bs-*` custom property alone, as a release `css-var` utility is. The `src/styles/utilities/_gap.scss` partial writes its gap keys through the `utility` mixin; its gutter classes are the release's grid classes rather than utility entries, and stay hand-written with normal declarations." Landed in `guides/veneer.md` § Styles as the corrected text; the round-2 wording never landed.

5. **Mid-campaign decision 3b.** Landed as sent: "writes every property with `!important` and every local variable it is given without it. The `utility-variable` mixin writes its custom property without it" replaced by "writes every property with `!important` and every local variable in `$locals` as a normal declaration. The `utility-variable` mixin writes its custom property as a normal declaration", with the remainder of that sentence unchanged.

6. **Mid-campaign decision 3d.** Before: "`grid-column-start` longhand alone of the two longhands Tailwind's `col-1` rule declares, and the equality still holds with the `col-1` class on the line." After: "`grid-column-start` longhand alone, leaving the `grid-column-end` longhand that Tailwind's `col-1` rule also declares normal, and the equality still holds with the `col-1` class on the line."

7. **Decision 3c.** No action taken: `src/styles/_mixins.scss` is off-limits to this unit; the header-comment wording is the Orchestrator's integration edit, not carried here.

8. **Base-drift wrap difference (hunk boundaries, decided and carried on).** The § Tailwind partial-importance paragraph's unchanged sentence "…the element resolves, for every property that rule declares…" wraps across lines differently at `c3ac297` than at `87ff1d0` ("for" / "every" in round 2's base; "for every" / "property" here). This is unrelated reflow of context text between the two commits, not a round-2 addition; the patch's removed lines for this paragraph reproduce `c3ac297`'s actual wrap so the patch applies, and the content is unchanged.

## Files

- `tmp/units/us-shared-3.patch` (owned)
- `tmp/units/us-report-3.md` (owned, this file)
