I'll start by reading the brief and the repository's agent contract so I follow the right process.The brief is a read-only terrain reading. I'll capture git status, then gather the evidence it names.Git status was empty before and after this reading. HEAD is `7b66db2`. Bootstrap is `5.3.8` (`package.json:107`). `$display-values` is not declared anywhere under `node_modules/bootstrap/scss/`.

## A. Bootstrap's utility API

`$utilities` is 97 entries (`node_modules/bootstrap/scss/_utilities.scss`, map starting at the `"align"` entry). `class` is omitted when the class is the first `property`. Flags below are only those the entry sets. Infix count is 1 when `responsive` is absent and 6 when it is set (`""`, `-sm`, `-md`, `-lg`, `-xl`, `-xxl`). `print` adds one `-print` pass. `state` adds a second selector per value (`.{class}-{key}-{state}:{state}`).

| Entry | Property | Class | Values | Flags | Selectors |
| --- | --- | --- | --- | --- | --- |
| align | vertical-align | align | list of 6 | — | 6 |
| float | float | float | map of 3 | responsive | 18 |
| object-fit | object-fit | object-fit | map of 5 | responsive | 30 |
| opacity | opacity | opacity | map of 5 | — | 5 |
| overflow | overflow | overflow | list of 4 | — | 4 |
| overflow-x | overflow-x | overflow-x | list of 4 | — | 4 |
| overflow-y | overflow-y | overflow-y | list of 4 | — | 4 |
| display | display | d | list of 11 | responsive, print | 66 + 11 print |
| shadow | box-shadow | shadow | map of 4 (`null`, sm, lg, none) | — | 4 |
| focus-ring | (custom prop) | focus-ring | `map-loop($theme-colors-rgb, …)` = 8 | css-var, css-variable-name `focus-ring-color` | 8 |
| position | position | position | list of 5 | — | 5 |
| top | top | top | `$position-values` (3) | — | 3 |
| bottom | bottom | bottom | `$position-values` | — | 3 |
| start | left | start | `$position-values` | — | 3 |
| end | right | end | `$position-values` | — | 3 |
| translate-middle | transform | translate-middle | map of 3 (`null`, x, y) | — | 3 |
| border | border | border | map of 2 (`null`, 0) | — | 2 |
| border-top | border-top | border-top | map of 2 | — | 2 |
| border-end | border-right | border-end | map of 2 | — | 2 |
| border-bottom | border-bottom | border-bottom | map of 2 | — | 2 |
| border-start | border-left | border-start | map of 2 | — | 2 |
| border-color | border-color | border | `$utilities-border-colors` (10) | local-vars `border-opacity: 1` | 10 |
| subtle-border-color | border-color | border | `$utilities-border-subtle` (8) | — | 8 |
| border-width | border-width | border | `$border-widths` (5) | — | 5 |
| border-opacity | (custom prop) | border-opacity | map of 5 | css-var | 5 |
| width | width | w | map of 5 | — | 5 |
| max-width | max-width | mw | map of 1 | — | 1 |
| viewport-width | width | vw | map of 1 | — | 1 |
| min-viewport-width | min-width | min-vw | map of 1 | — | 1 |
| height | height | h | map of 5 | — | 5 |
| max-height | max-height | mh | map of 1 | — | 1 |
| viewport-height | height | vh | map of 1 | — | 1 |
| min-viewport-height | min-height | min-vh | map of 1 | — | 1 |
| flex | flex | flex | map of 1 (`fill`) | responsive | 6 |
| flex-direction | flex-direction | flex | list of 4 | responsive | 24 |
| flex-grow | flex-grow | flex | map of 2 | responsive | 12 |
| flex-shrink | flex-shrink | flex | map of 2 | responsive | 12 |
| flex-wrap | flex-wrap | flex | list of 3 | responsive | 18 |
| justify-content | justify-content | justify-content | map of 6 | responsive | 36 |
| align-items | align-items | align-items | map of 5 | responsive | 30 |
| align-content | align-content | align-content | map of 6 | responsive | 36 |
| align-self | align-self | align-self | map of 6 | responsive | 36 |
| order | order | order | map of 8 | responsive | 48 |
| margin, margin-x, margin-y, margin-top, margin-end, margin-bottom, margin-start | margin or the two sides; end/start are `margin-right` / `margin-left` | m, mx, my, mt, me, mb, ms | `map-merge($spacers, (auto: auto))` = 7 | responsive | 42 each |
| negative-margin and its six axis twins | same properties, classes m/mx/my/mt/me/mb/ms | same | `$negative-spacers` | responsive | see below |
| padding and its seven axis twins | padding or the two sides; end/start are `padding-right` / `padding-left` | p, px, py, pt, pe, pb, ps | `$spacers` (6) | responsive | 36 each |
| gap, row-gap, column-gap | the same-named property | the same name | `$spacers` (6) | responsive | 36 each |
| font-family | font-family | font | map of 1 | — | 1 |
| font-size | font-size | fs | `$font-sizes` (6) | rfs | 6, plus one RFS pass |
| font-style | font-style | fst | list of 2 | — | 2 |
| font-weight | font-weight | fw | map of 7 scalars | — | 7 |
| line-height | line-height | lh | map of 4 | — | 4 |
| text-align | text-align | text | map of 3 | responsive | 18 |
| text-decoration | text-decoration | text-decoration | list of 3 | — | 3 |
| text-transform | text-transform | text | list of 3 | — | 3 |
| white-space | white-space | text | map of 2 | — | 2 |
| word-wrap | word-wrap and word-break | text | map of 1 | rtl: false | 1 |
| color | color | text | `map-merge($utilities-text-colors, …)` = 18 | local-vars `text-opacity: 1` | 18 |
| text-opacity | (custom prop) | text-opacity | map of 4 | css-var | 4 |
| text-color | color | text | `$utilities-text-emphasis-colors` (8) | — | 8 |
| link-opacity | (custom prop) | link-opacity | map of 5 | css-var, state `hover` | 5 + 5 hover |
| link-offset | text-underline-offset | link-offset | map of 3 | state `hover` | 3 + 3 hover |
| link-underline | text-decoration-color | link-underline | `map-merge($utilities-links-underline, (null: …))` = 9 | local-vars `link-underline-opacity: 1` | 9 |
| link-underline-opacity | (custom prop) | link-underline-opacity | map of 6 | css-var, state `hover` | 6 + 6 hover |
| background-color | background-color | bg | `map-merge($utilities-bg-colors, …)` = 14 | local-vars `bg-opacity: 1` | 14 |
| bg-opacity | (custom prop) | bg-opacity | map of 5 | css-var | 5 |
| subtle-background-color | background-color | bg | `$utilities-bg-subtle` (8) | — | 8 |
| gradient | background-image | bg | map of 1 | — | 1 |
| user-select | user-select | user-select | list of 3 | — | 3 |
| pointer-events | pointer-events | pe | list of 2 | — | 2 |
| rounded, rounded-top, rounded-end, rounded-bottom, rounded-start | radius longhands | the same class name | map of 9 | — | 9 each |
| visibility | visibility | `null` (so `.visible` / `.invisible`) | map of 2 | — | 2 |
| z-index | z-index | z | `$zindex-levels` (6) | — | 6 |

`generate-utility` (`mixins/_utilities.scss`) builds `.{class}{infix}-{key}`, drops the dash when `class` is null, and drops the modifier when the key is null. A property list becomes one declaration per property. `$enable-important-utilities` is `true` (`_variables.scss` near the negative-margin flag) and appends `!important` on property declarations only. The `css-var` branch writes `--{prefix}{css-variable-name}` with no `!important`. `rfs` swaps in `rfs-fluid-value`, then on the RFS pass `rfs-value`, and emits nothing when those two are equal. `state` repeats the rule as a pseudo-class. `local-vars` writes custom properties inside the rule before the property. `rtl: false` wraps the rule in `/* rtl:begin:remove */` … `/* rtl:end:remove */`. No entry sets `rtl: true`.

`utilities/_api.scss` loops `map-keys($grid-breakpoints)` through `media-breakpoint-up` and `breakpoint-infix`. Names and infixes (`mixins/_breakpoints.scss`, `breakpoint-infix`): `xs` `""` (no query; width 0), `sm` `-sm` at 576px, `md` `-md` at 768px, `lg` `-lg` at 992px, `xl` `-xl` at 1200px, `xxl` `-xxl` at 1400px. A non-responsive utility is emitted only for the empty infix. The RFS loop is `@media (min-width: $rfs-mq-value)` and runs only where the breakpoint width is below `$rfs-breakpoint` (`vendor/_rfs.scss`: `1200px`, so xs–lg). The print loop is one `@media print` pass with infix `-print` for entries whose `print` is true. Only `display` sets `print`.

Maps the `$utilities` map reads, with literals:

- `$spacers` (`_variables.scss` spacer map): `0: 0`, `1: $spacer * .25`, `2: $spacer * .5`, `3: $spacer`, `4: $spacer * 1.5`, `5: $spacer * 3`, and `$spacer` is `1rem`.
- `$negative-spacers` (`_maps.scss`): `negativify-map($spacers)` when `$enable-negative-margins` is true, otherwise `null`. The flag defaults to `false`. `negativify-map` (`_functions.scss`) drops key `0` and prefixes the rest with `n`. The generator does not return before `nth($values, 1)` when `values` is null, so the default selector count for the seven negative entries is not settled by these files. With the flag on, each entry is 5 × 6 = 30 selectors.
- `$position-values`: `0: 0`, `50: 50%`, `100: 100%`.
- `$grid-breakpoints`: `xs: 0`, `sm: 576px`, `md: 768px`, `lg: 992px`, `xl: 1200px`, `xxl: 1400px`.
- `$border-widths`: `1`–`5` as `1px`–`5px`.
- `$font-sizes`: `1`–`6` bound to `$h1-font-size` … `$h6-font-size`, which are `$font-size-base` (`1rem`) times 2.5, 2, 1.75, 1.5, 1.25, and 1.
- `$zindex-levels`: `n1: -1`, `0: 0`, `1: 1`, `2: 2`, `3: 3`. The component ladder (`$zindex-dropdown` 1000 through `$zindex-toast` 1090) is a separate map and is not what `z-index` reads.
- `$theme-colors` (8): primary, secondary, success, info, warning, danger, light, dark. `$theme-colors-rgb` is `map-loop` of that map through `to-rgb`, not a literal.
- `$utilities-text`, `$utilities-bg`, and `$utilities-border` (`_maps.scss`) are `map-merge` of `$utilities-colors` (`$theme-colors-rgb`) with black/white/body or black/white. The `$utilities` map reads the derived `*-colors` maps (`map-loop` through `rgba-css-var`), plus the literal subtle and emphasis maps of eight `var(--{prefix}…)` entries each.
- Font-weight and line-height values are scalars: lighter/`lighter`, light/`300`, normal/`400`, medium/`500`, semibold/`600`, bold/`700`, bolder/`bolder`; line heights `1`, `$line-height-sm` `1.25`, `$line-height-base` `1.5`, `$line-height-lg` `2`.

Queue key to entries:

- Spacing `m mx my mt mb ms me` → the eight positive margin entries and the seven negative-margin entries (same classes). `p px py pt pb ps pe` → the eight padding entries. `pe` is also `pointer-events`.
- Display and flex `d` → `display`. `flex` → `flex`, `flex-direction`, `flex-grow`, `flex-shrink`, `flex-wrap`. `align` → `align` (vertical-align). `align-items`, `align-content`, `align-self`, `justify-content`, `order` → those entries.
- Sizing `w h mw mh vw vh` → `width`, `height`, `max-width`, `max-height`, `viewport-width`, `viewport-height`. `min` → `min-viewport-width` and `min-viewport-height` (classes `min-vw`, `min-vh`).
- Type `fs fst fw lh font` → `font-size`, `font-style`, `font-weight`, `line-height`, `font-family`. `text` → `text-align`, `text-transform`, `white-space`, `word-wrap`, `color`, `text-color`. `text-truncate` is the helper, not a map entry.
- Paint `bg` → `background-color`, `subtle-background-color`, `gradient`. `border` → the five side entries, `border-color`, `subtle-border-color`, `border-width`. `rounded` → the five rounded entries. `shadow` → `shadow`. `opacity` → `opacity`.
- Position `position top bottom start end translate-middle z` → those entries. `fixed` and `sticky` are values of `position` and also helper classes. `visible` / `invisible` → `visibility`.
- Gap `gap`, `column-gap`, `row-gap` → those three entries.
- `object-fit`, `overflow`, `user-select`, `float`, `focus-ring` → those entries. `focus-ring` is also a helper rule.

Entries the queue does not list: `overflow-x`, `overflow-y`, `text-decoration`, `text-opacity`, `link-opacity`, `link-offset`, `link-underline`, `link-underline-opacity`, `bg-opacity`, `border-opacity`, `pointer-events`. Negative-margin entries are the spacing classes, not extra keys.

## B. The helpers

`_helpers.scss` imports, in order: clearfix, color-bg, colored-links, focus-ring, icon-link, ratio, position, stacks, visually-hidden, stretched-link, text-truncation, vr.

| Helper | Selectors and declarations | Queue |
| --- | --- | --- |
| stacks | `.hstack`: flex, row, center, stretch. `.vstack`: flex, `1 1 auto`, column, stretch. | `hstack`, `vstack` |
| position | `.fixed-top` / `.fixed-bottom`: fixed, edges 0, `$zindex-fixed`. `.sticky{infix}-top` / `-bottom` for every breakpoint: sticky, edge 0, `$zindex-sticky`. | `fixed`, `sticky` (also the `position` utility values `.fixed` and `.sticky`) |
| stretched-link | `.stretched-link::{$stretched-link-pseudo-element}`: absolute, inset 0, `$stretched-link-z-index`, empty content. | `stretched-link` |
| visually-hidden | `.visually-hidden` and `.visually-hidden-focusable:not(:focus):not(:focus-within)` include the mixin: 1px box, zero padding, `-1px` margin, hidden overflow, `clip: rect(0,0,0,0)`, nowrap, zero border, absolute except on `caption`, hidden overflow on children, all `!important`. | `visually-hidden`. The focusable selector is in the same file and is not a queue key. |
| text-truncation | `.text-truncate` includes the mixin: `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`. | `text-truncate` |
| clearfix | `.clearfix::after`: block, `clear: both`, empty content. | `clearfix` |
| focus-ring | `.focus-ring:focus`: `outline: 0` and a `box-shadow` of the `--{prefix}focus-ring-*` variables. Separate from the map entry that sets `--{prefix}focus-ring-color`. | `focus-ring` |
| color-bg | `.text-bg-{color}` for each `$theme-colors` key: `color-contrast` and an `RGBA` background, each `!important` when the flag is on. | Not listed. No authored Veneer file, guide heading, or deferral row contains `text-bg`. |
| colored-links | `.link-{color}` and `.link-body-emphasis`, with hover and focus, `!important` when the flag is on. | Not listed. The guide places these under the shipped `link` key: `### Files` names `src/styles/components/_link.scss` as the link color, opacity, offset, and underline classes, and `#### link` records `.link-primary`. That partial already loops roles, opacities, offsets, and underlines (`_link.scss`). |

`icon-link`, `ratio`, and `vr` are not in the B-UTILITIES list. The guide's `### Helper classes` says they ship in the components layer. `translate-middle` is a utility-map entry, not a helper file.

## C. The shipped utility pattern

`src/styles/utilities/` contains `_gap.scss` only. The partial is `@layer utilities`, uses `breakpoint-each` (infixes `""`, `-sm`, `-md`, `-lg`, `-xl`, `-xxl` from `breakpoints()` in `_mixins.scss`), and loops steps `0`–`5`. It writes literal grouped selectors, not the Bootstrap utility API. `.g-*` and `.gx-*` set `--bs-gutter-x`; `.g-*` and `.gy-*` set `--bs-gutter-y`; `.row-gap-*` sets `row-gap: var(--vn-gap-{step}) !important`. The gutter custom properties are not important. Bootstrap's own `.g` / `.gx` / `.gy` rules live in `make-grid-columns` (`mixins/_grid.scss`, the gutter loop) and also omit `!important`. They are not the `gap` / `column-gap` map entries.

`src/styles/index.scss` `@use` order: tokens, theme, reset, then elements html, body, heading, p, hr, a, ul, ol, dl, blockquote, address, abbr, strong, small, mark, sub, sup, code, kbd, pre, samp, var, b, figure, img, svg, table, tr, label, input, select, optgroup, textarea, fieldset, output, iframe, details, progress, button; then components button (as `button-component`), type, list, quote, image, link, container, grid, table (as `table-component`), icon-link, ratio, vr, form-label, form-control, form-select, form-check, form-range, form-floating, input-group, validation, pagination, button-group, progress (as `progress-component`), spinner, placeholder, card, list-group, breadcrumb, badge, close; then `utilities/gap`.

`tests/src/styles/utilities/gap.test.ts` mounts `.row` hosts with classes `g`, `gx`, `gy`, and `row-gap` at each `GAP_STEP_CASES` step and each `GRID_BREAKPOINT_CASES` infix, and reads the token, horizontal margins and padding, vertical margins, and `row-gap`. A second case retunes density and `--vn-gap-4`. A third loads an unlayered `.row { row-gap: 7px }` and expects `.row-gap-4` to stay 24px.

The ledger tables sit under `### Departures` in `guides/veneer.md`. There is no `#### gap` or `#### column-gap` heading. Beside `#### row-gap` are `#### g`, `#### gx`, `#### gy`, and `#### row`. Headers and one row:

`#### g` — `Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure`, then `` `g` | `.g-0` | `--bs-gutter-x` | — | `0` | `var(--vn-gap-0)` | tokenized ``.

`#### gx` — same header, `` `gx` | `.gx-0` | `--bs-gutter-x` | — | `0` | `var(--vn-gap-0)` | tokenized ``.

`#### gy` — same header, `` `gy` | `.gy-0` | `--bs-gutter-y` | — | `0` | `var(--vn-gap-0)` | tokenized ``.

`#### row-gap` — same header, `` `row-gap` | `.row-gap-0` | `row-gap` | — | `0` | `var(--vn-gap-0)` | tokenized ``.

`### Additions` has no row whose component is `gap`, `column-gap`, `row-gap`, `g`, `gx`, or `gy`. The `## Compatibility` table later marks `g`, `gx`, `gy`, and `row-gap` shipped and points at `gap.test.ts`.

`ORACLE_BINDINGS` (`tests/setupServer.ts`) is engine-step predicates, starting at `btn`. It has no gap entry. `LAYER_COMPONENTS` maps only `elements` and `reset` to `reboot`. Grep of `gap` and `utilities` in that file hits two remarks: `matchShippedKey` says `.row-gap-3` answers to `row-gap` rather than `row`, and `collectValueGaps` says `.row-gap-0` sits under both `row` and `row-gap`.

`LayoutSection` (`app/browser/sections/LayoutSection.ts`) mounts `LAYOUT_SPECIMENS` from `app/browser/constants.ts`. Those include `Independent gutters` (`.gx-5.gy-2`) and `Responsive gutters and row gap` (`.g-0.g-md-3.gx-lg-5.gy-xl-2.row-gap-1.row-gap-md-4`). `tests/setup.ts` grep for `gap` is empty. Registered layout subjects there include `Capped container` and `Numbered columns`, not those two gutter specimens.

The § Carriers row, quoted: `Helper key with no subject region and no showcase home` → `F7 CAPTURE establishes the subject contract; B-UTILITIES supplies each remaining real consumer`.

## D. Tailwind

`git -C /home/user/scaffold show dddc59a~1:.orkestrel/veneer/units/f8-tailwind-intersection.json` was not run: this session's shell accepted `git status` and rejected `git show`. The file is not in the scaffold working tree. `inventoryClasses`, `tailwindProducedSelectors`, and the shared-name groups are unread.

`### Tailwind` in `guides/veneer.md`:

> Under the composable imports, Tailwind fills a layer only for the utilities it generates from the markup your `@source` rule names: the `utilities` layer carries those rules and the `theme` layer carries the variables those rules read.

> A shared name leaves the exclusion line only where Veneer declares with `!important` every longhand that Tailwind's rule for that name declares; a name Veneer declares important on some other longhand stays on the line.

> No shipped shared name is important, so that branch is driven by planted `!important` declarations on the `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule declares.

`SHARED_LONGHANDS` (`tests/setupServer.ts`) is a planted map: `col-1` → `grid-column-start`, `grid-column-end`; `table` → `border-top-width`; `caption-top` → empty. `collectSharedNames` returns names present in both input lists, once, in the first list's order. `collectImportantNames` reports a name only when every longhand in the supplied map is in the important set of some rule whose selector names that class. An empty longhand list is not reported.

Proofs under `tests/service/tailwind/`:

- `profiles.test.ts` (`stylesheet profiles`): one order line, preflight-only reset, theme and utilities imports, properties-layer placement, exclusion withholding, exclusion copies equal, named Tailwind parts, no Veneer tokens in the preflight theme block.
- `consumer.test.ts` (`the consumer pairing`): the guide recipe matches the fixture apart from the source line; cascade import and document order; shared names mounted; shared names resolve to the cascade; an important shared declaration survives; partial importance keeps the name on the line; dropping the line moves a shared name; a Tailwind-only utility overrides a component declaration.
- `preflight.test.ts` (`the preflight pairing`): overlapping tags and reset properties; element-layer properties kept and moved properties recorded.

The sentence a utility partial has to meet for a shared name is the exclusion-line sentence quoted above.

## E. Tokens

`src/styles/_tokens.scss` declares:

- `--vn-space-1` through `--vn-space-8`, `--vn-space-12`, `--vn-space-24`: `calc(0.125rem * var(--vn-factor-density))` stepping by `0.125rem` through `1rem`, then `1.5rem` and `3rem`, each times density.
- `--vn-size-1` through `--vn-size-8`: `0.75rem`, `0.875rem`, `1rem`, `1.125rem`, `1.25rem`, `1.5rem`, `1.875rem`, `2.25rem`.
- `--vn-weight-body` `400`, `--vn-weight-heading` `600`.
- `--vn-line-body` `1.5`, `--vn-line-heading` `1.2`, `--vn-line-code` `1.6`.
- `--vn-radius-small` through `--vn-radius-xxlarge`: `0.25rem`, `0.375rem`, `0.5rem`, `1rem`, `2rem`, each times `--vn-factor-radius`; `--vn-radius-pill` `50rem`.
- `--vn-border-width` `1px`, `--vn-border-style` `solid`.
- `--vn-shadow-1`, `-2`, `-3`, `-inset`: the elevation pairs scaled by `--vn-factor-elevation`.
- No `--vn-opacity-*` scale. `--vn-focus-opacity` is `0.45`; `--vn-button-opacity` is `0.65`.
- `--vn-stack-dropdown` 1000, `-sticky` 1020, `-fixed` 1030, `-drawer-backdrop` 1040, `-drawer-base` 1045, `-dialog-backdrop` 1050, `-dialog-base` 1055, `-popover` 1070, `-hint` 1080, `-toast` 1090.
- `--vn-breakpoint-{xs,sm,md,lg,xl,xxl}` emitted from `breakpoints()`: `0`, `576px`, `768px`, `992px`, `1200px`, `1400px`.
- Also `--vn-gap-0` through `--vn-gap-5`: `0`, `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `3rem`, with no density factor.

`#### Space, border, radius, and elevation` repeats those space, border, radius, and shadow rows and adds `--vn-border-color` and `--vn-border-translucent`. The gutter and gap prose says the gutter and row-gap utilities read `--vn-gap-*`, and that `gap` and `column-gap` remain assigned to the utilities family. `#### Motion, focus, validation, breakpoints, and stacking` rows a utility would bind: `--vn-focus-width` / `--vn-focus-opacity` / `--vn-focus-color` (aliases `--bs-focus-ring-*`), the breakpoint ladder (aliases `--bs-breakpoint-*`), and the stack ladder (no `--bs-*` alias).

`_pagination.scss` binds `--bs-pagination-padding-x: var(--vn-space-6)` inside `.pagination`. The ledger row under `#### pagination` (inside `### Departures`, not under `### Pagination classes`) is `` `pagination` | `.pagination` | `--bs-pagination-padding-x` | — | `0.75rem` | `var(--vn-space-6)` | tokenized ``.

## F. The rulings that bind the family

§ Tenets names utilities once, in the Tailwind product tenet: consumers keep control of resets, utilities, component classes, and tokens. § Rulings:

> Veneer is first a Bootstrap baseline: pin what Bootstrap has, track every addition, change, and removal, and account for every token, element, component, and utility in `src` and `tests`.

> Every `!important` in the cascade has a Bootstrap twin … so the important-utility contract is Bootstrap's: state the escape in the guide, a consumer's own `!important`.

> Make Bootstrap and Tailwind compatible, Bootstrap favoured on conflict: every Bootstrap utility ships with its `!important` as Bootstrap writes it, a consumer overrides one with its own `!important`, and where a class name exists in both libraries Bootstrap's declaration wins (D2, D6).

No paragraph in § Tenets or § Rulings names `rfs`, print, or a breakpoint. Print is named later, under B-CROSS in § The family queue. The guide's important-utility contract (`## Styles`) is two overlapping paragraphs: lines 152–159 end at "§ Tailwind states how a paired build keeps that true." Line 160 resumes mid-sentence with "layer, the calendar-picker indicator rule…" and adds the color swatch rules in the `components` layer. The escape that follows says an important declaration inside the utility's layer beats an unlayered `!important`, shown with `.row-gap-1 { row-gap: 2rem !important; }`.

§ Exit criterion items 2, 3, 5, and 6:

> 2. Accounting closure: every emitted selector, declaration, custom property, and keyframe maps to a recorded Bootstrap value, a departure row, or an addition row; every recorded name ships or holds a deferral row with an owner; each gate reddens on its planted mutation.

> 3. Baseline coverage: every key the pinned record carries ends `shipped`, deferred with an owner, or excluded with a reason the user has seen, engine obligations included, under the same gates.

> 5. Semantic independence and class control: proved by rendered runs, with the important-utility contract documented.

> 6. Tokens: every documented token's declared value is read from the built cascade, and overriding each token group moves a resolved consumer property.

§ The family queue, B-UTILITIES, lists the sets in the question and ends "Size each unit by mechanism, never by key." The phases row says `` `opus` on Opus 5.5, one unit per mechanism ``.

§ Carriers rows that name the family, a gap key, a helper, a utility, or `!important` (no row names print):

- `CL8b gap keys `gap` and `column-gap`, with `row-gap`` → `B-UTILITIES`.
- The noun-rule row on a CSS `!important` token → P1 SCAFFOLD-PROPAGATE.
- `Helper key with no subject region and no showcase home` → F7 CAPTURE, then B-UTILITIES supplies each remaining real consumer.
- `A later unit that ships a shared class name whose Veneer declarations are all normal` → carrier not yet known; re-checked at every forms and utilities dispatch; the F8c consumer proof reddens when such a name ships.
- Audit claim 8 on `[hidden]` and the calendar-picker `!important` → F6 FOUNDATION (D6).
- The `collectImportantNames` row → closed at `19a3d6f`.
- The `readCascadeBlocks` priority row (D39) → closed at `6e23bc8`.

`decisions-round-2.md`: D2 approves Tailwind tooling and "Bootstrap and Tailwind compatible, Bootstrap favoured on conflict." D6: "Keep every Bootstrap utility with its `!important`, exactly as Bootstrap ships it," document the consumer's own `!important`, and where a class exists in both, Bootstrap wins; examples include `.border`, `.rounded`, `.shadow`, `.visible`, `.invisible`, `.text-center`. D19 moves the Tailwind proofs to a service proof. D24 treats those files as driving the Tailwind compiler. D25, D25a, and D25b state the `@import` placement rule ahead of everything but `@charset`, comments, empty `@layer`, and other `@import`s. D27 reads document layer order as first placement across the linked cascade then the profile. D39 puts `!important` into the compared value text.

Standing conditions a writer of this family hits: npm `10.9.7` on the host against a manifest pin of npm `>=11.6.0`; Chromium 141 named in receipts; `scaffold repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`; the prose sweep reads every authored Markdown file for banned terms; Bootstrap is pinned by `BOOTSTRAP_VERSION`; the mirror law requires every `tests/{app,src}/**/*.test.ts` other than `integration.test.ts` to resolve to a module at the same relative path.

## G. Sizing

Breakpoint multiplier is 6 where `responsive` is set, otherwise 1. Print adds the value count once, and only `display` has it.

| Set | Entries | Value counts | Selectors by the API formula |
| --- | --- | --- | --- |
| Spacing, positive margin | 8 | 7 each | 336 |
| Spacing, negative margin | 7 | null at the default flag; 5 if enabled | unresolved at the default; 210 if enabled |
| Spacing, padding | 8 | 6 each | 288 |
| Display and flex | 12 (`display`, five `flex*` entries, `align`, three align-* , `justify-content`, `order`) | 11, 1, 4, 2, 2, 3, 6, 5, 6, 6, 6, 8 | 341, of which 11 are `.d-print-*` |
| Sizing | 8 | 5, 1, 1, 1, 5, 1, 1, 1 | 16 |
| Type, map entries for the queue's classes | 11 | 6, 2, 7, 4, 1, 3, 3, 2, 1, 18, 8 | 70, plus one extra `generate-utility` call for `font-size` inside the RFS query at the empty infix. Whether that call emits rules is the fluid-equals-static check. `text-truncate` is one helper selector. |
| Paint, queue classes | 14 property entries plus 5 rounded | background 14, subtle bg 8, gradient 1, five borders at 2, border-color 10, subtle border 8, border-width 5, rounded 9 × 5, shadow 4, opacity 5 | 155 |
| Position utilities | 7 | 5, 3, 3, 3, 3, 3, 6 | 26. Helper position adds `.fixed-top`, `.fixed-bottom`, and 12 sticky selectors. |
| Gap keys | 3 | 6 each | 108 |
| Stacks | helpers, not map entries | 2 selectors | 2 |
| object-fit, overflow, user-select, visibility, float, focus-ring map | 6 | 5, 4, 3, 2, 3, 8 | 30 + 4 + 3 + 2 + 18 + 8 = 65. `overflow-x` and `overflow-y` add 4 each and are not the queue key. The focus-ring helper is one more selector. |

Comparables: `_gap.scss` is 22 lines, `gap.test.ts` is 92 lines, `_pagination.scss` is 129 lines.

## H. Files the family makes false

Grep of `_gap` and `'gap'` under `tests/` hits only `expect(readStyle(figure, 'gap'))` in `tests/src/styles/elements/figure.test.ts` and `tests/src/styles/components/image.test.ts`. It does not hit the utility partial.

Enumerating sites:

- `src/styles/index.scss` ends with `@use 'utilities/gap'`. `tests/conformance.test.ts`, `loads every forms partial in the release order, validation last`, reads every `@use 'components/…'` line and asserts the forms subsequence. A new utilities `@use` is outside that filter.
- `guides/veneer.md` `### Files` has one utilities row: `src/styles/utilities/_gap.scss`, "The gutter and row-gap step utilities in the utilities layer."
- `tests/conformance.test.ts`, `carries every shipped component selector and custom property in the built cascade`, freezes a `listed` array that includes `'g'`, `'gx'`, `'gy'`, `'row-gap'`, `'link'`, `'icon-link'`, `'ratio'`, and `'vr'`, and expects `collectShippedComponents(rows)` to equal it. It does not list `'gap'` or `'column-gap'`.
- `tests/setupStyles.test.ts`, `repeats no partial's written declaration block…`, requires `scanStyleBlocks` to see at least one file whose directory is `utilities`, and expects `findDuplication` to be empty. `ELEMENT_TAGS` is asserted equal to the `elements` directory only. A `collectGridVocabulary` fixture includes `.row-gap-0`.
- `app/browser/Showcase.ts` constructs `LayoutSection`. `tests/app/browser/Showcase.test.ts` expects specimen names in `LAYOUT_SPECIMENS` order. `tests/app/browser/sections/LayoutSection.test.ts` expects the names `Independent gutters` and `Responsive gutters and row gap` and those selectors.

`tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits (`ROADMAP.md` § Standing conditions). `setupPolicy.ts` reads `tests/{app,src}/**/*.test.ts` through `testToPolicyStem` and `stemToPolicyCandidates`: a proof stem must exist as a module (extensions include `scss`) or as `_{name}.scss`. `gap.test.ts` mirrors `_gap.scss` that way. A new `tests/src/styles/utilities/{name}.test.ts` with no `src/styles/utilities/_{name}.scss` is a mirror violation. `inspectPolicyProse` reads every authored `.md` outside `.git`, `.orkestrel`, `dist`, `node_modules`, and `tmp`, after stripping fences, inline code, links, and URLs, and matches banned substitution terms. A new guide section trips that sweep. `policy.test.ts` exercises those functions on fixtures, including `accepts a Sass partial module mirror`.

## Contradictions

- The queue and the CL8b carrier assign `gap` and `column-gap`, with `row-gap`, to B-UTILITIES. The shipped partial and the departure tables emit and record `g`, `gx`, `gy`, and `row-gap`. The tokens prose says `gap` and `column-gap` remain assigned to the utilities family. Bootstrap's API entries for `gap` and `column-gap` set those properties from `$spacers` and are not what `_gap.scss` emits.
- The guide's important-utility paragraph is duplicated and broken at the sentence boundary that introduces the color swatch rules.
- `focus-ring`, `fixed`, and `sticky` each name both a utility-API product and a helper rule. `pe` is both padding-end and pointer-events.
- D6 says keep every Bootstrap utility. The queue does not list `overflow-x`, `overflow-y`, `text-decoration`, `text-opacity`, the four `link-*` entries, `bg-opacity`, `border-opacity`, or `pointer-events`. The `link-*` classes already ship from `_link.scss`. `.text-bg-*` ships from neither the queue, the guide, nor `src/`.

## Unresolved inputs

- The Tailwind intersection JSON at `dddc59a~1` was not readable here.
- `$display-values` does not exist in this Bootstrap tree. Display values are the inline list on the `display` entry.
- Selector count for the seven negative-margin entries while `$negative-spacers` is `null`.
- Whether the `font-size` RFS pass emits any declaration after the fluid-equals-static check.
- Whether the pinned inventory records `.text-bg-*` or the unlisted utility entries. That fixture was not part of this reading.
