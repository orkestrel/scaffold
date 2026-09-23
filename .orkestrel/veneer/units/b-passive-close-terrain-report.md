# B-PASSIVE-CLOSE terrain — Cursor Grok distillate

Route `grok` on Cursor Grok (`grok-4.7-high`), read-only, rooted at `/home/user/veneer` at `a4654a8` (the tree moved to `7398772` during the reading; the lane wrote nothing). Journal: `tmp/cursor/b-passive-close-terrain.jsonl` (swept at acceptance); brief `units/b-passive-close-terrain-brief.md`; launcher `units/b-passive-close-terrain.sh`. The distillate follows.

I'll read the brief and the scaffold contracts it depends on before doing anything else.The brief is a read-only terrain pass. I'll load the scaffold contracts it points at, record git status, and then read each named site.The contracts are loaded and the tree is clean at `a4654a8`. Next I’ll read each B-PASSIVE-CLOSE site the brief names.`git status --porcelain` was empty before the reading, at `a4654a8`, and empty after, at `7398772`. Two commits landed during the reading (`9ef5184`, `7398772`); this session wrote nothing. Lines below are approximate.

## 1. Showcase paragraph

Under `## Showcase` in `guides/veneer.md`, three stretches name regions. The opening paragraph (`guides/veneer.md:3865`) says the shell renders the Veneer heading, the Dark mode button, a Showcase region, and a Buttons region, a Content region, a Type region, a Media region, a Links region, a Layout region, and a Table region. A later paragraph (`guides/veneer.md:3881`) adds a Breadcrumb region, a Badge region, and a Close region. A third (`guides/veneer.md:3904`) adds a Placeholder region, a Progress region, and a Spinner region after the Table region.

`Showcase` mounts, after the Showcase region, this order (`app/browser/Showcase.ts:92`, pinned by `tests/app/browser/Showcase.test.ts:87`): Buttons, Content, Type, Media, Links, Layout, Table, Validation, Pagination, Button group, Placeholder, Progress, Spinner, Form check, Form control, Form floating, Form label, Form range, Form select, Card, List group, Badge, Breadcrumb, Close, Input group.

None of the three guide stretches names Validation, Pagination, Button group, Form check, Form control, Form floating, Form label, Form range, Form select, Card, List group, or Input group. The prose also orders Breadcrumb, Badge, and Close ahead of Placeholder, Progress, and Spinner; the constructor mounts Placeholder, Progress, and Spinner before the form regions, and Badge, Breadcrumb, Close in that order, with Input group last.

## 2. Customization retune claim

`### Customization` (`guides/veneer.md:2156`) says: override a canonical token in an unlayered rule; Veneer declares its tokens inside `@layer theme`, so an unlayered rule wins, and every derived tier and every `--bs-*` alias follows the override because each one is an expression over the token you changed. The next paragraph (`guides/veneer.md:2177`) says that recipe repaints `--bs-primary` and carries the color through `--bs-primary-bg-subtle`, `--bs-primary-text-emphasis`, and `--bs-primary-border-subtle`.

`theme-tokens` (`src/styles/_mixins.scss:254`) does write those subtle, emphasis, and border aliases from each role fill. It is included on `:root` (`src/styles/_tokens.scss:369`), on `[data-bs-theme='light']` (`src/styles/_theme.scss:10`), and on `[data-bs-theme='dark']` (`src/styles/_theme.scss:15`).

These component rules read a palette entry on the fill or the focus border. The guide already says a `--vn-color-primary-base` override leaves them:

| Selector | File | What it reads |
| --- | --- | --- |
| `.pagination` | `src/styles/components/_pagination.scss:16` | focus shadow mixes `--vn-palette-blue`; active color, background, and border are `--vn-palette-white-base` and `--vn-palette-blue` (`:31`) |
| `.list-group` | `src/styles/components/_list-group.scss:5` | active color, background, and border are white-base and blue (`:20`) |
| `.form-range::-webkit-slider-thumb` and `.form-range::-moz-range-thumb` | `src/styles/components/_form-range.scss:50` | thumb background is `--vn-palette-blue`; `:active` mixes blue at 30% over white-base (`:72`) |
| `.form-check-input:focus` | `src/styles/components/_form-check.scss:76` | border mixes blue at 50% over white-base |
| `.form-check-input:checked` | `src/styles/components/_form-check.scss:86` | background and border are `--vn-palette-blue` |
| `.form-check-input[type='checkbox']:indeterminate` | `src/styles/components/_form-check.scss:97` | same blue fill and border |
| `.form-select:focus` | `src/styles/components/_form-select.scss:55` | same half-blue border mix |
| `.form-control:focus` | `src/styles/components/_form-control.scss:56` | same half-blue border mix |
| `.progress`, `.progress-stacked` | `src/styles/components/_progress.scss:16` | bar color is white-base and bar background is blue (`:23`) |

The matching guide sentences are `### Pagination classes` (`guides/veneer.md:830`), `### List group classes` (`guides/veneer.md:1562`), `### Form check classes` (`guides/veneer.md:1055` and `:1060`), `### Form range classes` (`guides/veneer.md:1281`), and `### Progress classes` (`guides/veneer.md:950`).

Other palette reads, where the fill itself is a role or the palette entry is a recorded black or white byte:

- `.btn-<role>` from the `$roles` loop (`src/styles/components/_button.scss:135`): foreground is white-base, except `light`, which is black-base; the background is `--vn-color-<role>-base`.
- `.table-<role>` from `$aliased` (`src/styles/components/_table.scss:100`): text is white-base for `dark` and black-base otherwise; light and dark backgrounds are the role fill, and the others mix the role fill at 20% over white-base.
- `.valid-tooltip` and `.invalid-tooltip` (`src/styles/components/_validation.scss:21`): text is white-base; the background is the state role.
- `.badge` (`src/styles/components/_badge.scss:12`): `--bs-badge-color` is white-base.
- `.btn-close` (`src/styles/components/_close.scss:14`): `--bs-btn-close-color` is black-base. The focus shadow on the same rule is the literal `rgba(13, 110, 253, 0.25)`, so the palette grep does not see it.
- `.placeholder-wave` (`src/styles/components/_placeholder.scss:47`): the mask gradient is black-base and black-rgb.
- `.progress-bar-striped` (`src/styles/components/_progress.scss:49`): the stripe mixes white-rgb.

In `src/styles/_tokens.scss`, `:root` (`:194`) declares the palette entries, and a second `:root` (`:372`) aliases `--bs-blue` and the other Bootstrap palette names to them. `:root` also reads white-base for `--vn-surface-gradient` (`:249`) and black-rgb for `--vn-shadow-1`, `--vn-shadow-2`, `--vn-shadow-3`, and `--vn-shadow-inset` (`:306`). The `$light` and `$dark` maps (`:17` and `:61`) feed `theme-tokens`, so those palette reads land on `:root`, `[data-bs-theme='light']`, and `[data-bs-theme='dark']`: emphasis, canvas, highlight, translucent, and the carousel surface and caption, plus the dark `state-mixer`.

## 3. Barrel-neighbour sentences

`src/styles/index.scss` `@use` order is: `tokens`, `theme`, `reset`, the `elements/*` partials through `button`, then `components/button`, `type`, `list`, `quote`, `image`, `link`, `container`, `grid`, `table`, `icon-link`, `ratio`, `vr`, `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `validation`, `pagination`, `button-group`, `progress`, `spinner`, `placeholder`, `card`, `list-group`, `breadcrumb`, `badge`, `close`, then `utilities/gap`. There is no `form-label` partial.

`node_modules/bootstrap/scss/bootstrap.scss` imports, after the functions and maps: `root`, `reboot`, `type`, `images`, `containers`, `grid`, `tables`, `forms`, `buttons`, `transitions`, `dropdown`, `button-group`, `nav`, `navbar`, `card`, `accordion`, `breadcrumb`, `pagination`, `badge`, `alert`, `progress`, `list-group`, `close`, `toasts`, `modal`, `tooltip`, `popover`, `carousel`, `spinners`, `offcanvas`, `placeholders`, `helpers`, `utilities/api`. `scss/_forms.scss` imports `labels`, `form-text`, `form-control`, `form-select`, `form-check`, `form-range`, `floating-labels`, `input-group`, `validation`. `scss/_helpers.scss` ends with `vr`, after `icon-link` and `ratio`.

The phrase "after the card" does not occur. Card and list group say "at the barrel's Bootstrap order."

| Guide sentence | Veneer barrel | Bootstrap |
| --- | --- | --- |
| `### Table classes` (`:698`): the partial loads after the grid | `grid` then `table` | `grid` then `tables` |
| `### Helper classes` (`:727`): icon link, ratio, and vertical rule, each after the table | those three follow `table`, and the forms follow `vr` | helpers are the last component import, after placeholders |
| `### Validation classes` (`:779`): after the forms partials | `validation` follows `input-group` | `validation` is last inside `_forms.scss` |
| `### Pagination classes` (`:823`), `### Button group classes` (`:871`), `### Progress classes` (`:929`), `### Form range classes` (`:1265`), `### Breadcrumb classes` (`:1578`): after the vertical rule | each of those partials is later than `vr` | `vr` is inside helpers, which loads after pagination, button-group, progress, forms, and breadcrumb |
| `### Form check classes` (`:1028`): before the range partial | `form-check` then `form-range` | same inside `_forms.scss` |
| `### Form select classes` (`:1099`): after the validation partial and before the range partial | `form-select` is before both `form-range` and `validation` | `form-select` is before both `form-range` and `validation` |
| `### Form control classes` (`:1180`): before the range partial | `form-control` is before `form-range`, with select and check between | same |
| `### Input group classes` (`:1328`): directly before validation, called the release's order | `input-group` then `validation` | same |
| `### Form floating classes` (`:1405`): after the range partial and before validation, called the release's order | `form-floating` is after `form-range` and before `validation`, with `input-group` between | same |
| `### Card classes` (`:1480`) and `### List group classes` (`:1533`): at the barrel's Bootstrap order | `placeholder`, `card`, `list-group`, `breadcrumb`, `badge`, `close` | card sits after navbar and before accordion; list-group sits after progress and before close; breadcrumb, pagination, and badge sit between card and list-group |
| `### Badge classes` (`:1605`): after the breadcrumb | `breadcrumb` then `badge` | breadcrumb, then pagination, then badge |
| `### Close classes` (`:1629`): after the badge | `badge` then `close` | badge, then alert, progress, and list-group, then close |

`guides/veneer.md:179` ("loads after the shipped cascade") is the utility-escape sheet in the token proof, not a component neighbour. Spinner and placeholder have no `partial loads` sentence.

## 4. Driven-key lists

D20 (`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md:180`) says each family's `<FAMILY>_KEYS` list costs a rewrite of the `CAPTURE_KEYS` spread and its assertion per landing; family ruling 10 stands for the units in flight; the spread and assertion rewrites are mechanical integration edits at each landing; B-PASSIVE-CLOSE consolidates the lists into one driven table appended the way `CASCADE_KEYS` is.

`CaptureKey` (`tests/setup.ts:286`) is `scenario` plus `subject`. `CascadeKey` (`tests/setup.ts:302`) adds `selector` and `property`. `CASCADE_KEYS` (`tests/setup.ts:404`) is `readonly CascadeKey[]`, one `Object.freeze` array of frozen rows. Its doc block (`tests/setup.ts:345`) says a family appends its resting rows here as it lands, and a scenario that drives a state sits in that family's own list. The list refuses a repeated subject (`tests/setup.test.ts:160`).

Separate `readonly CaptureKey[]` lists, each a frozen array, and the scenarios they hold:

- `SHOWCASE_KEYS` (`:318`): `showcase`
- `BUTTON_KEYS` (`:338`): `primary-focus`, `primary-hover`, `primary-active`, `toggle-pressed`
- `VALIDATION_KEYS` (`:1103`): `valid-control-focus`, `invalid-control-focus`
- `PAGINATION_KEYS` (`:1122`): `page-strip-hover`, `page-strip-focus`
- `BUTTON_GROUP_KEYS` (`:1149`): `check-group-checked`, `check-group-focus`
- `FORM_RANGE_KEYS` (`:1164`): `range-focus`
- `LIST_GROUP_KEYS` (`:1191`): `list-group-actions-hover`, `list-group-actions-focus`, `list-group-actions-active`
- `CLOSE_KEYS` (`:1211`): `close-control-hover`, `close-control-focus`
- `FORM_CHECK_KEYS` (`:1231`): `form-check-box-focus`, `form-check-box-indeterminate`
- `INPUT_GROUP_KEYS` (`:1252`): `input-group-button-focus`
- `FORM_FLOATING_KEYS` (`:1271`): `form-floating-empty-focus`
- `FORM_SELECT_KEYS` (`:1286`): `form-select-base-focus`
- `FORM_CONTROL_KEYS` (`:1302`): `form-control-text-focus`

`CAPTURE_KEYS` (`tests/setup.ts:1314`) spreads, in order: `SHOWCASE_KEYS`, `BUTTON_KEYS`, `CASCADE_KEYS`, `VALIDATION_KEYS`, `PAGINATION_KEYS`, `BUTTON_GROUP_KEYS`, `FORM_RANGE_KEYS`, `LIST_GROUP_KEYS`, `CLOSE_KEYS`, `FORM_CHECK_KEYS`, `INPUT_GROUP_KEYS`, `FORM_FLOATING_KEYS`, `FORM_SELECT_KEYS`, `FORM_CONTROL_KEYS`. There is no `FORM_LABEL_KEYS`; the five form-label scenarios are rows inside `CASCADE_KEYS`. Resting card, badge, breadcrumb, placeholder, progress, and spinner rows are inside `CASCADE_KEYS` as well.

`tests/setup.test.ts:59` asserts the export key list includes every one of those `*_KEYS` names. `tests/setup.test.ts:93` asserts `CAPTURE_KEYS` strict-equals that same spread, and `CAPTURE_SCENARIOS` equals the scenario column. Later cases pin `LIST_GROUP_KEYS` (`:135`) and `FORM_CHECK_KEYS` (`:289`) to subjects already in `CASCADE_KEYS`.

## 5. Tests stem table

Under `## Tests`, the paragraph at `guides/veneer.md:3941` introduces the table: the stem sorts this portfolio against a counterpart by subject, the rule comes from the Bootstrap 5.3.8 portfolio, and nothing here pairs the two directories. The table (`guides/veneer.md:3947`) has no heading of its own. Its 23 rows are `capped-container`, `numbered-columns`, `base`, `role-links`, `showcase`, `primary-focus`, `primary-hover`, `primary-active`, `toggle-pressed`, `breadcrumb-trail`, `badge-counter`, `close-control`, `close-inverted`, `progress-base`, `striped-progress`, `animated-progress`, `stacked-progress`, `border-spinner`, `small-border-spinner`, `placeholder-ramp`, `glowing-placeholder`, `waving-placeholder`, `button-placeholder`.

`tests/setup.ts` registers 137 `scenario:` rows. Every table row is one of them. The other 114 registered scenarios are absent from the table:

- Validation: `valid-control`, `invalid-control`, `valid-select`, `invalid-select`, `valid-check`, `invalid-check`, `valid-feedback`, `invalid-feedback`, `validated-form`, `valid-control-focus`, `invalid-control-focus`
- Pagination: `page-strip`, `active-page`, `disabled-page`, `small-pagination`, `large-pagination`, `page-strip-hover`, `page-strip-focus`
- Button group: `horizontal-group`, `vertical-group`, `nested-groups`, `small-group`, `large-group`, `wrapping-toolbar`, `check-group-checked`, `check-group-focus`
- Range: `range`, `range-disabled`, `range-focus`
- Cards: `card-base`, `card-rule`, `card-images`, `card-overlay`, `card-list`, `card-list-corners`, `card-tabs`, `card-pills`, `card-group`
- List group: `list-group-base`, `list-group-active`, `list-group-disabled`, `list-group-actions`, `list-group-numbered`, `list-group-flush`, `list-group-horizontal`, `list-group-horizontal-sm`, `list-group-horizontal-md`, `list-group-horizontal-lg`, `list-group-horizontal-xl`, `list-group-horizontal-xxl`, `list-group-roles`, `list-group-actions-hover`, `list-group-actions-focus`, `list-group-actions-active`
- Close and badge and breadcrumb extras: `close-refused-by-attribute`, `close-refused-by-class`, `close-control-hover`, `close-control-focus`, `badge-word`, `badge-at-heading-scale`, `badge-collapsed`, `badge-on-a-button`, `breadcrumb-single-step`
- Form check: the ten resting `form-check-*` scenarios plus `form-check-box-focus` and `form-check-box-indeterminate`
- Input group: the eight resting `input-group-*` scenarios plus `input-group-button-focus`
- Form floating: the six resting scenarios plus `form-floating-empty-focus`
- Form select: the six resting scenarios plus `form-select-base-focus`
- Form control: the ten resting scenarios plus `form-control-text-focus`
- Form label: `form-label-stacked`, `form-label-horizontal`, `form-label-horizontal-large`, `form-label-horizontal-small`, `form-label-legend`

`tests/guides/` does not exist. `tests/guides.test.ts` runs `@orkestrel/guide` against `guides/veneer.md` for fences, export parity, examples, and relative links (`tests/guides.test.ts:27`). It has no stem-table check.

## 6. Reduced-motion literal

`tests/setupStyles.ts` and `tests/setupBrowser.ts` export no shared constant for this query. `setupBrowser.ts` has no occurrence. `setupStyles.ts:58` mentions the query in a comment. The same file stores the string `@media (prefers-reduced-motion: reduce)` as expected conditions at `:3702`, `:3727`, `:4988`, `:5087`, and `:5143`.

Module `MOTION` constants, each equal to `'(prefers-reduced-motion: reduce)'`, and how the proof uses them:

- `tests/src/styles/components/form-range.test.ts:18`: media-condition equality, `CSSMediaRule.conditionText`, and `matchMedia`
- `tests/src/styles/components/form-floating.test.ts:25`: media-condition equality on `.form-floating > label`, and `matchMedia`
- `tests/src/styles/components/form-select.test.ts:27`: media-condition equality on `.form-select`, and `matchMedia`
- `tests/src/styles/components/form-control.test.ts:30`: case names, media-condition equality on `.form-control` and its file button, and `matchMedia`
- `tests/src/styles/components/form-check.test.ts:28`: media-condition equality and `matchMedia`

Inline copies of the same literal, with no constant:

- `tests/src/styles/components/pagination.test.ts:378`: `collectMediaConditions` on `.page-link`, and `conditionText` equality
- `tests/src/styles/components/progress.test.ts:192` and `:215`: `collectMediaConditions` on `.progress-bar` and `.progress-bar-animated`; `:252` asserts the family's condition set
- `tests/src/styles/components/spinner.test.ts:271`: the spinner rules' condition set
- `tests/src/styles/components/icon-link.test.ts:157`: `collectMediaConditions` on `.icon-link > .bi`, and `conditionText` equality

`tests/setupStyles.test.ts`, `tests/setupServer.ts`, and `tests/setupServer.test.ts` use the string as parser and reader fixtures. `tests/fixtures/oracle/inventory.json` records it as inventory data, including `no-preference` and width-and-reduce combinations.

## 7. Token-noun sweep and the bare `id`

The pattern is a backticked token followed by a comma or by a space and a lowercase verb (`is`, `are`, `reads`, `writes`, `carries`, `names`, `sits`, `holds`, `follows`, `loads`, `ships`, `keeps`, `takes`, `returns`, `emits`, `paints`, `binds`, `drives`, `records`, `refuses`, `omits`, `moves`, `leaves`, `stays`, `becomes`, `means`, `covers`, `lists`, `adds`, `declares`, `compiles`, `resolves`, `matches`, `includes`, `uses`, `sets`, `has`, `have`, `does`, `can`, `may`, `will`, `reaches`, `answers`, `renders`, `mounts`). It matches 265 lines in `guides/veneer.md`, including `### Validation classes` and `### Form range classes`. The first forty outside those two sections:

| Line | Section | Token |
| --- | --- | --- |
| 65 | `## Surface` | `Delegate` |
| 66 | `## Surface` | `emitEvent` |
| 149 | `## Styles` | `theme, reset, base, elements, components, utilities` |
| 271 | `### Files` | `_mixins.scss` |
| 278 | `### Files` | `tests/setupStyles.ts` |
| 280 | `### Files` | `tests/setupBrowser.ts` |
| 283 | `### Files` | `:is()` |
| 290 | `### Files` | `tests/setupStyles.ts` |
| 293 | `### Files` | `tests/setup.ts` |
| 297 | `### Files` | `integration.test.ts` |
| 299 | `### Files` | `tests/src/styles/integration.test.ts` |
| 315 | `### Tailwind` | `theme` |
| 343 | `### Tailwind` | `@charset` |
| 363 | `### Tailwind` | `elements` |
| 390 | `### Tailwind` | `1` |
| 407 | `### Tailwind` | `tests/fixtures/tailwind/preflight.css` |
| 413 | `### Tailwind` | `caption-bottom` |
| 443 | `### Tailwind` | `npm run build:src:styles` |
| 446 | `### Tailwind` | `elements` |
| 462 | `### Tailwind` | `Tag` |
| 687 | `### Scripts` | `tests/src/styles/fixtures/mixins.scss` |
| 691 | `### Scripts` | `npm run build:src:styles` |
| 692 | `### Scripts` | `npm run build` |
| 701 | `### Table classes` | `.caption-bottom` |
| 704 | `### Table classes` | `bottom` |
| 735 | `### Helper classes` | `--bs-icon-link-transform` |
| 737 | `### Helper classes` | `.bi` |
| 753 | `### Helper classes` | `--vn-border-width` |
| 757 | `### Helper classes` | `tests/src/styles/components/icon-link.test.ts` |
| 770 | `### Helper classes` | `--vn-ease-standard` |
| 771 | `### Helper classes` | `.btn` |
| 773 | `### Helper classes` | `translate3d(0.25em, 0, 0)` |
| 832 | `### Pagination classes` | `--vn-palette-white-base` |
| 836 | `### Pagination classes` | `--bs-pagination-active-bg` |
| 837 | `### Pagination classes` | `--bs-pagination-focus-box-shadow` |
| 848 | `### Pagination classes` | `2` |
| 849 | `### Pagination classes` | `3` |
| 863 | `### Pagination classes` | `tests/src/styles/components/pagination.test.ts` |
| 874 | `### Button group classes` | `--bs-border-width` |
| 875 | `### Button group classes` | `--vn-border-width` |

The file has 66 markdown links. These are not introduced by `see`:

- `guides/veneer.md:178` `[token parity and values]`, under `## Styles`
- `:313` `[layer order and position independence]`, `:314` `[stylesheet profiles]` and `[the consumer pairing]`, `:315` `[stylesheet profiles]` and `[the preflight pairing]`, `:329` `[stylesheet profiles]`, `:345` `[§ Importing Style Sheets]`, `:346` `[§ Declaring Without Styles]`, `:411` `[The consumer pairing]`, `:450` `[The preflight pairing]`, all under `### Tailwind`
- `:1082` `[The check classes]` and `:1089` `[the styles setup proof]`, under `### Form check classes`
- `:1156` `[The select classes]` and `:1170` `[the styles setup proof]`, under `### Form select classes`
- `:1307` `[The range classes]`, under `### Form range classes`
- `:1375` `[The input group classes]`, under `### Input group classes`
- `:1455` `[The floating label classes]`, under `### Form floating classes`
- `:3909` `[cascade spinner classes]`, under `## Showcase`
- `:3937` `[showcase journeys]`, under `## Tests`

The long proof lists under `## Tests` (`:3915`, `:4004`, `:4038`, `:4046`, `:4048`) are introduced by `see`.

`FORM_CHECK_SPECIMENS` (`app/browser/constants.ts:1049`) says: each `id` is unique to the showcase so a label names one control. `FORM_LABEL_SPECIMENS` (`app/browser/constants.ts:1665`) says: each `id` attribute is unique to the showcase so a label names one control.

## 8. Proofs that read these sites

`tests/app/browser/Showcase.test.ts:87` pins the constructed `aria-label` list, which already includes every region the guide omits. Rewriting the guide paragraph leaves that assertion as it is. The proof goes red if the constructor order or the region set changes.

`tests/setup.test.ts:59` and `:93` pin the export names and the `CAPTURE_KEYS` spread. Consolidating the driven lists under new names, or changing that spread, turns those two assertions red. The `LIST_GROUP_KEYS` and `FORM_CHECK_KEYS` cases (`:135`, `:289`) name those constants directly.

`tests/guides.test.ts` checks fence languages, barrel-export parity, examples, and that relative links resolve. It does not read the stem table, the load-order sentences, or the token-noun rule. `tests/guides/` is absent.

`tests/setupPolicy.ts` and `tests/policy.test.ts` are the vendored policy surface. `inspectPolicyProse` (`tests/setupPolicy.ts:2033`) reads authored Markdown through `readPolicyProse`, strips fenced code with `stripPolicyCode`, and matches banned substitution terms from `.claude/rules/writing.md` (`POLICY_TERM_FILE`, `tests/setupPolicy.ts:373`) via `textToPolicyHits`. `tests/policy.test.ts:649` drives that prose rule through planted controls and checks the prose population. That sweep reads banned terms. It does not read the noun-after-a-token rule or whether a link is introduced by `see`.

The reduced-motion proofs compare their own local literal or local `MOTION`. Adding an unused shared export leaves them green. They go red when their call sites are pointed at a constant they do not yet import.

## Unresolved inputs

- Porcelain stayed empty. HEAD moved from `a4654a8` to `7398772` during the reading: `9ef5184` adds a `Caption at bottom` specimen in `TABLE_SPECIMENS` (`app/browser/constants.ts`, one line before the form-check and form-label blocks), and `7398772` folds that landing into `ROADMAP.md`. The B-PASSIVE-CLOSE carrier rows were not in that fold. `Caption at bottom` is not a `CaptureSubject` and not a stem-table row.
- The carrier row says the token sweep leaves alone sections of units still unlanded at dispatch, and that those sections are named at dispatch. This brief names only that B-FORMS-LABEL-CASCADE has not landed. The guide has no `### Form label classes` heading, and `src/styles/index.scss` has no form-label `@use`, while the showcase already mounts Form label and `CASCADE_KEYS` already holds the five form-label scenarios.
- The carrier row quotes "after the card". The guide's card and list-group sentences say "at the barrel's Bootstrap order" instead.
- `### Customization` states the claim for every derived tier of the token you changed, and the following paragraph names the three `--bs-primary-*` tiers. It does not itself name the pagination, list-group, range, check, or progress paints.