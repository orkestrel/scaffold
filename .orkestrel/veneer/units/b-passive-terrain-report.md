I'll absorb the Veneer baseline and the named Bootstrap sources as evidence only, starting with a clean-tree check and the inventory entry shape.The inventory keys the components by name. Next I’ll read each B-PASSIVE entry’s selectors, custom properties, and `rtl` rows, plus the Bootstrap sources those entries come from.The porcelain command was rejected by the session, so it was not captured. This pass only read files. No file was written.

## A. Oracle surface per key

`tests/fixtures/oracle/inventory.json` is Bootstrap `5.3.8` (`inventory.json:2`). `components` is an object keyed by name (`inventory.json:6`). One entry, `progress` (`inventory.json:8`), has six fields: `selectors` (each with `selector`, `declarations`, `classes`, `elements`, `attributes`, `pseudoClasses`, `pseudoElements`, and sometimes `condition`), a flat `declarations` list (`inventory.json:279`), a `properties` map of `--bs-*` names to `{selector, value}` (`inventory.json:501`), `keyframes` (`inventory.json:583`), `media` (`inventory.json:599`), and `rtl` (`inventory.json:600`). `readOracleInventory` keeps only the selector strings and the property names (`tests/setupServer.ts:970`).

At-rules sit on `selectors[].condition`. Every B-PASSIVE `media` array is `[]`. `[data-bs-theme=dark]` for the close filter is on the `theme` key, not on `btn-close`. A selector is stored on every key whose class it contains: `.btn-toolbar` is inside `btn` (`inventory.json:33907`) and again on `btn-toolbar` (`inventory.json:49180`); `.btn-close` is inside `btn` (`inventory.json:34381`) and on `btn-close` (`inventory.json:68405`); `.card > .list-group` is on `card` (`inventory.json:60495`) and on `list-group` (`inventory.json:61867`). `_maps.scss` has no rules for these names.

`rtl` rows below are **excluded**.

### `btn-close` — `_close.scss`

Selectors (`inventory.json:68375`–`68649`): `.alert-dismissible .btn-close`, `.btn-close`, `.btn-close:hover`, `.btn-close:focus`, `.btn-close:disabled`, `.btn-close.disabled`, `.btn-close-white`, `.toast-header .btn-close`, `.modal-header .btn-close`, `.offcanvas-header .btn-close`.

Properties (`inventory.json:68937`): `--bs-btn-close-color`, `--bs-btn-close-bg`, `--bs-btn-close-opacity`, `--bs-btn-close-hover-opacity`, `--bs-btn-close-focus-shadow`, `--bs-btn-close-focus-opacity`, `--bs-btn-close-disabled-opacity`, `--bs-btn-close-filter`. The filter on `.btn-close-white` is `invert(1) grayscale(100%) brightness(200%)` (`inventory.json:68590`).

No keyframes. No `condition`. Theme, not this key, declares `--bs-btn-close-filter` on `:root` as a space (`inventory.json:2711`), on `[data-bs-theme=light]` as a space (`inventory.json:2725`), and on `[data-bs-theme=dark]` as the invert filter (`inventory.json:2739`). That comes from `@include color-mode(dark, true)` (`_close.scss:63`), and `$color-mode-type` is `data` (`_variables.scss:388`), so the mixin emits `[data-bs-theme]` (`mixins/_color-mode.scss:16`).

Sass: `$btn-close-color` through `$btn-close-disabled-opacity` and `$btn-close-bg` (`_variables.scss:1705`), `$btn-close-white-filter` (`_variables.scss:1717`), `$btn-close-filter-dark` (`_variables-dark.scss:102`). Mixins: `border-radius()` (`_close.scss:25`), `btn-close-white()` (`_close.scss:49`), `escape-svg` (`_functions.scss:131`). Gated by `$enable-dark-mode` (`_variables.scss:387`).

**Excluded `rtl`** (`inventory.json:68988`): `.toast-header .btn-close` `margin-right` and `margin-left`; `.modal-header .btn-close` `margin-right` and `margin-left`; `.offcanvas-header .btn-close` `margin-right` and `margin-left` (`inventory.json:69020`).

### `badge` — `_badge.scss`

Selectors (`inventory.json:67291`): `.badge`, `.badge:empty`, `.btn .badge`.

Properties (`inventory.json:67495`): `--bs-badge-padding-x` `0.65em` (`inventory.json:67294`), `--bs-badge-padding-y` `0.35em`, `--bs-badge-font-size` `0.75em`, `--bs-badge-font-weight` `700`, `--bs-badge-color` `#fff`, `--bs-badge-border-radius` `var(--bs-border-radius)`.

No keyframes, no `condition`, `rtl` `[]` (`inventory.json:67534`). `gradient-bg()` (`_badge.scss:26`) emits no image because `$enable-gradients` is `false` (`_variables.scss:373`).

Sass: `$badge-font-size` through `$badge-border-radius` (`_variables.scss:1489`). Mixins: `rfs` (`_badge.scss:10`), `font-size` (`_badge.scss:18`), `border-radius` (`_badge.scss:25`), `gradient-bg`.

### `breadcrumb` — `_breadcrumb.scss`

Selectors (`inventory.json:66038`): `.breadcrumb`, `.breadcrumb-item + .breadcrumb-item`, `.breadcrumb-item + .breadcrumb-item::before`, `.breadcrumb-item.active`.

Properties (`inventory.json:66279`): `--bs-breadcrumb-padding-x`, `--bs-breadcrumb-padding-y`, `--bs-breadcrumb-margin-bottom`, `--bs-breadcrumb-bg`, `--bs-breadcrumb-border-radius`, `--bs-breadcrumb-divider-color`, `--bs-breadcrumb-item-padding-x`, `--bs-breadcrumb-item-active-color`. `--bs-breadcrumb-font-size` is not in that map; `$breadcrumb-font-size` is `null` (`_variables.scss:1634`) and `rfs` skips null (`vendor/_rfs.scss:282`). The divider is only the `content` fallback (`_breadcrumb.scss:33`).

No keyframes, no `condition`.

Sass: `$breadcrumb-padding-y` through `$breadcrumb-divider-flipped` (`_variables.scss:1634`). Mixins: `rfs`, `font-size`, `border-radius`, `escape-svg`.

**Excluded `rtl`** (`inventory.json:66330`): `.breadcrumb-item + .breadcrumb-item::before` `float` (`left` / `right`) and `content` (`inventory.json:66338`).

### `btn-group` — `_button-group.scss`

Selectors (`inventory.json:47784`–`48420`): `.btn-group-lg > .btn`, `.btn-group-sm > .btn`, `.btn-group`, `.btn-group-vertical`, `.btn-group > .btn`, `.btn-group-vertical > .btn`, then the z-index set `.btn-group > .btn-check:checked + .btn`, `:focus + .btn`, `> .btn:hover`, `:focus`, `:active`, `.active` and the same six under `.btn-group-vertical`, then `.btn-group` again, `.btn-group > :not(.btn-check:first-child) + .btn`, `> .btn-group:not(:first-child)`, `> .btn:not(:last-child):not(.dropdown-toggle)`, `> .btn.dropdown-toggle-split:first-child`, `> .btn-group:not(:last-child) > .btn`, `> .btn:nth-child(n+3)`, `> :not(.btn-check) + .btn`, `> .btn-group:not(:first-child) > .btn`, `.btn-group-sm > .btn + .dropdown-toggle-split`, `.btn-group-lg > .btn + .dropdown-toggle-split`, then the vertical stack `.btn-group-vertical`, `> .btn`, `> .btn-group`, `> .btn:not(:first-child)`, `> .btn-group:not(:first-child)`, `> .btn:not(:last-child):not(.dropdown-toggle)`, `> .btn-group:not(:last-child) > .btn`, `> .btn:nth-child(n+3)`, `> :not(.btn-check) + .btn`, `> .btn-group:not(:first-child) > .btn`.

Properties are the extended button sizes, not a `btn-group` token (`inventory.json:48771`): `--bs-btn-padding-y`, `--bs-btn-padding-x`, `--bs-btn-font-size`, `--bs-btn-border-radius` on `.btn-group-lg > .btn` and `.btn-group-sm > .btn`.

No keyframes, no `condition`, `rtl` `[]` (`inventory.json:48814`).

`.dropdown-toggle-split`, `.dropup .dropdown-toggle-split::after`, `.dropend .dropdown-toggle-split::after`, `.dropstart .dropdown-toggle-split::before`, `.btn-sm + .dropdown-toggle-split`, and `.btn-lg + .dropdown-toggle-split` are on the `dropdown` key (`inventory.json:43153`, `43185`, `43227`). `.btn-group.show .dropdown-toggle` is absent: `box-shadow` emits nothing when `$enable-shadows` is `false` (`_variables.scss:372`, `mixins/_box-shadow.scss:3`).

Sass: `$btn-border-radius`, `$btn-border-width`, `$btn-padding-x`, `$btn-padding-x-sm`, `$btn-padding-x-lg`, `$btn-active-box-shadow` (`_variables.scss:819`). Mixins: `border-radius`, `border-end-radius`, `border-start-radius`, `border-bottom-radius`, `border-top-radius`, `box-shadow`. `@extend .btn-sm` and `@extend .btn-lg` (`_button-group.scss:67`).

### `btn-toolbar` — same file

Selectors (`inventory.json:49180`): `.btn-toolbar`, `.btn-toolbar .input-group`. Properties `{}` (`inventory.json:49241`). No keyframes, no `condition`, `rtl` `[]` (`inventory.json:49244`). No component Sass variables. No mixin.

### `card` — `_card.scss`

Selectors (`inventory.json:60347`–`61187`): `.card`, `.card > hr`, `.card > .list-group`, `:first-child`, `:last-child`, `.card > .card-header + .list-group`, `.card > .list-group + .card-footer`, `.card-body`, `.card-title`, `.card-subtitle`, `.card-text:last-child`, `.card-link + .card-link`, `.card-header`, `.card-header:first-child`, `.card-footer`, `.card-footer:last-child`, `.card-header-tabs`, `.card-header-tabs .nav-link.active`, `.card-header-pills`, `.card-img-overlay`, `.card-img`, `.card-img-top`, `.card-img-bottom` (the image rules repeat for top radius and bottom radius), `.card-group > .card`, then under `@media (min-width: 576px)` (`inventory.json:60998`): `.card-group`, `.card-group > .card`, `> .card + .card`, `> .card:not(:last-child)` and its `> .card-img-top`, `> .card-header`, `> .card-img-bottom`, `> .card-footer`, `> .card:not(:first-child)` and the same four children. `.card-link:hover` is absent; `$link-hover-decoration` is `null` (`_variables.scss:457`). `.card` has `border-radius` (`inventory.json:60466`) and no `box-shadow` property.

Properties (`inventory.json:61745`): `--bs-card-spacer-y`, `--bs-card-spacer-x`, `--bs-card-title-spacer-y`, `--bs-card-title-color`, `--bs-card-subtitle-color`, `--bs-card-border-width`, `--bs-card-border-color`, `--bs-card-border-radius`, `--bs-card-box-shadow`, `--bs-card-inner-border-radius`, `--bs-card-cap-padding-y`, `--bs-card-cap-padding-x`, `--bs-card-cap-bg`, `--bs-card-cap-color` (value a space, `inventory.json:61820`), `--bs-card-height`, `--bs-card-color`, `--bs-card-bg`, `--bs-card-img-overlay-padding`, `--bs-card-group-margin`. The color on `.card` reads `var(--bs-body-color)` (`inventory.json:60446`).

No keyframes. `rtl` `[]` (`inventory.json:61862`).

Sass: `$card-spacer-y` through `$card-group-margin` (`_variables.scss:1342`); `$card-inner-border-radius` uses `subtract` (`_functions.scss:238`). Mixins: `border-radius`, `box-shadow`, `border-top-radius`, `border-bottom-radius`, `media-breakpoint-up` (`_card.scss:190`), `border-end-radius`, `border-start-radius`. The `sm` query is `min-width: 576px` because `xs` is `0` (`_variables.scss:485`, `mixins/_breakpoints.scss:63`).

### `list-group` — `_list-group.scss`

Selectors start with the card combinators (`.card > .list-group` and the four siblings, `inventory.json:61867`), then `.list-group` (`inventory.json:61957`), `.list-group-numbered`, `.list-group-numbered > .list-group-item::before`, `.list-group-item`, `:first-child`, `:last-child`, `.disabled`, `:disabled`, `.active`, `.list-group-item + .list-group-item`, that plus `.active`, `.list-group-item-action`, `:not(.active):hover`, `:focus`, `:active`. Then `.list-group-horizontal` and five children with no query (`inventory.json:62359`). Then the same six selectors for `-sm` at `@media (min-width: 576px)` (`inventory.json:62466`), `-md` at `768px` (`inventory.json:62572`), `-lg` at `992px` (`inventory.json:62678`), `-xl` at `1200px` (`inventory.json:62784`), `-xxl` at `1400px` (`inventory.json:62890`). Then `.list-group-flush`, `> .list-group-item`, `:last-child`, and `.list-group-item-primary`, `-secondary`, `-success`, `-info`, `-warning`, `-danger`, `-light`, `-dark` (`inventory.json:63031`).

Properties, declared on `.list-group` (`inventory.json:61960`): `--bs-list-group-color`, `--bs-list-group-bg`, `--bs-list-group-border-color`, `--bs-list-group-border-width`, `--bs-list-group-border-radius`, `--bs-list-group-item-padding-x`, `--bs-list-group-item-padding-y`, `--bs-list-group-action-color`, `--bs-list-group-action-hover-color`, `--bs-list-group-action-hover-bg`, `--bs-list-group-action-active-color`, `--bs-list-group-action-active-bg`, `--bs-list-group-disabled-color`, `--bs-list-group-disabled-bg`, `--bs-list-group-active-color`, `--bs-list-group-active-bg`, `--bs-list-group-active-border-color`. Each `.list-group-item-*` restates the color, background, border, action-hover, action-active, and active trio (`_list-group.scss:186`).

No keyframes. `rtl` `[]` (`inventory.json:64939`).

Sass: `$list-group-color` through `$list-group-action-active-bg` (`_variables.scss:1582`), `$theme-colors` (`_variables.scss:312`), `$grid-breakpoints` (`_variables.scss:484`). Mixins: `border-radius`, `border-top-radius`, `border-bottom-radius`, `media-breakpoint-up`, `border-bottom-start-radius`, `border-top-end-radius`. `list-group-item-variant()` is deprecated and not called (`mixins/_list-group.scss:1`).

### `pagination` — `_pagination.scss`

Selectors (`inventory.json:66348`): `.pagination`, `.page-link`, `.page-link` again with `condition` `@media (prefers-reduced-motion: reduce)` and `transition: none` (`inventory.json:66503`), `.page-link:hover`, `.page-link:focus`, `.page-link.active`, `.active > .page-link` (`inventory.json:66593`), `.page-link.disabled`, `.disabled > .page-link` (`inventory.json:66645`), `.page-item:not(:first-child) .page-link`, `.page-item:first-child .page-link`, `.page-item:last-child .page-link`, `.pagination-lg`, `.pagination-sm`.

Properties (`inventory.json:66351`): `--bs-pagination-padding-x`, `--bs-pagination-padding-y`, `--bs-pagination-font-size`, `--bs-pagination-color`, `--bs-pagination-bg`, `--bs-pagination-border-width`, `--bs-pagination-border-color`, `--bs-pagination-border-radius`, `--bs-pagination-hover-color`, `--bs-pagination-hover-bg`, `--bs-pagination-hover-border-color`, `--bs-pagination-focus-color`, `--bs-pagination-focus-bg`, `--bs-pagination-focus-box-shadow`, `--bs-pagination-active-color`, `--bs-pagination-active-bg`, `--bs-pagination-active-border-color`, `--bs-pagination-disabled-color`, `--bs-pagination-disabled-bg`, `--bs-pagination-disabled-border-color`.

No keyframes. `rtl` `[]` (`inventory.json:67286`).

Sass: `$pagination-padding-y` through `$pagination-border-radius-lg` (`_variables.scss:1292`). Mixins: `rfs`, `list-unstyled` (`mixins/_lists.scss:4`), `font-size`, `transition` (writes the reduced-motion pair, `mixins/_transition.scss:20`), `gradient-bg`, `border-start-radius`, `border-end-radius`, `pagination-size` (`mixins/_pagination.scss:4`).

### `placeholder` — `_placeholders.scss`

Selectors (`inventory.json:1155`): `.placeholder`, `.placeholder.btn::before`, `.placeholder-xs`, `.placeholder-sm`, `.placeholder-lg`, `.placeholder-glow .placeholder`, `.placeholder-wave`.

Properties `{}` (`inventory.json:1380`).

Keyframes: `placeholder-glow` at `50%` sets `opacity` `0.2` (`inventory.json:1383`); `placeholder-wave` at `100%` sets `-webkit-mask-position` and `mask-position` to `-200% 0%` (`inventory.json:1397`). The Sass keyframe sets only `mask-position` (`_placeholders.scss:49`).

No `condition`. `rtl` `[]` (`inventory.json:1416`).

Sass: `$placeholder-opacity-max` `.5`, `$placeholder-opacity-min` `.2` (`_variables.scss:1335`), `$black`. No mixin.

### `progress` — `_progress.scss`

Selectors (`inventory.json:11`): `.progress`, `.progress-stacked`, `.progress-bar`, `.progress-bar` with `@media (prefers-reduced-motion: reduce)` and `transition: none` (`inventory.json:196`), `.progress-bar-striped`, `.progress-stacked > .progress`, `.progress-stacked > .progress > .progress-bar`, `.progress-bar-animated`, `.progress-bar-animated` with the same reduced-motion query and `animation: none` (`inventory.json:271`).

Properties (`inventory.json:502`): `--bs-progress-height` `1rem`, `--bs-progress-font-size` `0.75rem`, `--bs-progress-bg` `var(--bs-secondary-bg)`, `--bs-progress-border-radius` `var(--bs-border-radius)`, `--bs-progress-box-shadow` `var(--bs-box-shadow-inset)`, `--bs-progress-bar-color` `#fff`, `--bs-progress-bar-bg` `#0d6efd`, `--bs-progress-bar-transition` `width 0.6s ease`.

Keyframe `progress-bar-stripes`: `0%` sets `background-position-x` to `var(--bs-progress-height)` (`inventory.json:585`). Component `media` is `[]` (`inventory.json:599`).

Sass: `$progress-height` through `$progress-bar-transition` (`_variables.scss:1567`). Mixins: `rfs`, `font-size`, `border-radius`, `box-shadow`, `transition`, `gradient-striped` (`mixins/_gradients.scss:44`). Gated by `$enable-transitions` (`_variables.scss:374`) and `$enable-reduced-motion` (`_variables.scss:375`).

**Excluded `rtl`** (`inventory.json:600`): `.progress-bar-striped` `background-image`, `45deg` versus `-45deg` (`inventory.json:605`).

### `spinner` — `_spinners.scss`

Selectors (`inventory.json:612`): `.spinner-grow`, `.spinner-border`, `.spinner-border` (the border rule), `.spinner-border-sm`, `.spinner-grow` (the grow rule), `.spinner-grow-sm`, `.spinner-border` with `@media (prefers-reduced-motion: reduce)` setting `--bs-spinner-animation-speed` to `1.5s` (`inventory.json:815`), `.spinner-grow` with the same query (`inventory.json:830`).

Properties (`inventory.json:1021`): `--bs-spinner-width`, `--bs-spinner-height`, `--bs-spinner-vertical-align`, `--bs-spinner-border-width`, `--bs-spinner-animation-speed`, `--bs-spinner-animation-name`.

Keyframes: `spinner-border` step `to` is `transform: rotate(360deg) ` (`inventory.json:1108`); `spinner-grow` is `0%` `scale(0)` and `50%` `opacity: 1` plus `transform: none` (`inventory.json:1122`). `rtl` `[]` (`inventory.json:1150`). The Sass keyframe carries `/* rtl:ignore */` (`_spinners.scss:19`); that comment is not an `rtl` row.

Sass: `$spinner-width` through `$spinner-border-width-sm` (`_variables.scss:1690`). No mixin. Reduced motion is `$enable-reduced-motion` (`_spinners.scss:79`).

## B. How a shipped key is wired

Layer order is declared once: `@layer theme, reset, base, elements, components, utilities` (`src/styles/_tokens.scss:4`). A component partial opens `@layer components` (`src/styles/components/_button.scss:4`, `_table.scss:4`) after `@use '../tokens'` and `@use '../mixins'`. The cascade entry loads them with an alias: `@use 'components/button' as button-component` (`src/styles/index.scss:43`) and `@use 'components/table' as table-component` (`src/styles/index.scss:51`). The bare tag stays in the elements layer: `src/styles/elements/_button.scss:3`, `src/styles/elements/_table.scss`.

The proof is `describe('button classes')` in `tests/src/styles/components/button.test.ts:32`, and `table geometry`, `contextual table colors`, and `responsive table wrappers` in `tests/src/styles/components/table.test.ts:26`.

The showcase section is `ButtonSection` (`app/browser/sections/ButtonSection.ts:22`), fed by `BUTTON_COPY`, `BUTTON_GRID`, and `BUTTON_SPECIMENS` (`app/browser/constants.ts:13`). `TableSection` extends `SpecimenSection` (`app/browser/sections/TableSection.ts:12`) and takes `TABLE_COPY` and `TABLE_SPECIMENS` (`app/browser/constants.ts:580`). `app/browser/index.ts:4` and `:11` re-export them. `Showcase` constructs `new ButtonSection(this.#main)` (`app/browser/Showcase.ts:74`) and `new TableSection(this.#main)` (`app/browser/Showcase.ts:80`).

The guide files table names `src/styles/components/_button.scss` (`guides/veneer.md:139`) and `src/styles/components/_table.scss` (`guides/veneer.md:146`). The family prose is `### Table classes` (`guides/veneer.md:249`). Departures for this pair are the `table`, `caption` row (`guides/veneer.md:847`), the `td`, `th` row (`guides/veneer.md:848`), and the `button` row (`guides/veneer.md:852`). Compatibility rows use the inventory key in the Component column (`guides/veneer.md:919`): `btn` selector and variable rows are `shipped` (`guides/veneer.md:978`, `988`); `table` selector rows start at `guides/veneer.md:989`. Withheld names live in `### Deferred selectors` (`guides/veneer.md:325`), read by `readDeferrals` (`guides/veneer.md:329`).

`collectShippedComponents` (`tests/setupServer.ts:802`) requires a shipped selector row and, when `properties` is nonempty, a shipped variable row. `readOracleInventory` (`tests/setupServer.ts:946`) is the vocabulary. `scanCompatibilityPresence` (`tests/setupServer.ts:838`) fails if a shipped name is missing or a deferred name is present. The conformance list that must equal that set includes `'btn'` and `'table'` (`tests/conformance.test.ts:85`, `113`).

Names already withheld for this family, owner `Passive` unless noted: the `.btn-group*` radius and z-index selectors (`guides/veneer.md:350`), `.btn-toolbar` (`guides/veneer.md:366`), `.btn-toolbar .input-group` owner `Forms` (`guides/veneer.md:367`), the split-toggle selectors owner `Disclosure` (`guides/veneer.md:371`), `.btn .badge` (`guides/veneer.md:388`), `.btn-close` and its states (`guides/veneer.md:390`), the alert, toast, modal, and offcanvas close combinators owner `Overlays` (`guides/veneer.md:389`), `.placeholder.btn::before` (`guides/veneer.md:399`), and `--bs-btn-close-*` except the filter (`guides/veneer.md:400`).

## C. What already ships

| Key | Status | Evidence |
| --- | --- | --- |
| `btn-close` | partial | Class absent from `src/styles`. `--bs-btn-close-filter` is written by `theme-tokens` (`src/styles/_mixins.scss:307`) from `close-filter` (`src/styles/_tokens.scss:52`, `:99`). `dist/src/styles/index.css` contains that property and no `.btn-close{`. |
| `badge` | absent | No `.badge` in `src/styles` or `dist/src/styles/index.css`. |
| `breadcrumb` | absent | No match in `src/styles` or that CSS. |
| `btn-group` | partial | Only the size twins `.btn-group-sm > .btn` and `.btn-group-lg > .btn` (`src/styles/components/_button.scss:197`, `:205`). `dist/src/styles/index.css` has `btn-group-sm` and `btn-group-lg` and no `.btn-group{`. Those two names are not in the deferred table. |
| `btn-toolbar` | absent | No match in `src/styles` or that CSS. |
| `card` | absent | No `.card` in `src/styles` or that CSS. |
| `list-group` | absent | No match in `src/styles` or that CSS. |
| `pagination` | absent | No match in `src/styles` or that CSS. |
| `placeholder` | absent | No `.placeholder` in `src/styles` or that CSS. |
| `progress` | absent as a class | The element rule is `progress { vertical-align: baseline; }` (`src/styles/elements/_progress.scss:2`). `dist/src/styles/index.css` matches `progress{` and not `.progress`. No `--bs-progress-*` in `src/styles`. |
| `spinner` | absent | No match in `src/styles` or that CSS. |

`dist/src/styles/index.rtl.css` is present beside `index.css`.

## D. Elements and Mailbox

Elements does not use the Bootstrap class names. Mailbox styles those classes and adds container, flush, and motion behavior the inventory does not have.

- `elements/src/styles/components/_badge.scss:30` — `.badge` uses `--set-badge-*`, a subtle fill, `.filled`, `.pill`, and hides `:empty`.
- `elements/src/styles/components/_badge.scss:83` — `button .badge` nudges with `position: relative`, not `.btn .badge`.
- `elements/tests/src/styles/components/_badge.test.ts:21` — an empty `.badge` is hidden, recorded as mailbox parity.
- `elements/src/styles/components/_avatar.scss:16` — `.avatar` is a circular identity chip on the same token pattern as `.badge`.
- `elements/src/styles/components/_dot.scss:14` — `.dot.pulse` animates a halo and removes it under `prefers-reduced-motion`.
- `elements/src/styles/components/_spinner.scss:22` — one `.spinner` ring, keyframe `spinner-rotate`, slowed rather than removed under reduced motion.
- `elements/tests/src/styles/components/_spinner.test.ts:38` — a spinner inside a `.loading` button shrinks to `1em` and paints `currentColor`.
- `elements/src/styles/surfaces/_placeholder.scss:10` — `::placeholder` on form controls, not the `.placeholder` ghost.
- `elements/src/styles/elements/_progress.scss:6` — native `<progress>` with `appearance: none` and vendor fill pseudos.
- `elements/src/styles/components/_role-group.scss:4` — `[role="group"]` and `[role="toolbar"]` stand in for `.btn-group` and `.btn-toolbar`.
- `elements/src/styles/components/_nav.scss:433` — breadcrumb is `nav[aria-label='Breadcrumb'] > ol > li` with a mask chevron.
- `elements/src/styles/components/_nav.scss:92` — pagination tokens sit on bare `<nav aria-label="Pagination">`.
- `elements/src/styles/elements/_ul.scss:12` — `<ul class="group">` is the list-group chrome; the class is not `.list-group`.
- `elements/src/styles/components/_article.scss:279` — the card image is the first or last `img` of `<article>`, which Mailbox names `.card-img-top`.
- `mailbox/src/styles/_badge.scss:10` — `.badge` declares `--bs-badge-*` and paints `--bs-secondary` with `--bs-secondary-foreground`.
- `mailbox/tests/src/styles/_badge.test.ts:81` — `.btn .badge` is `position: relative` and `top: -1px`.
- `mailbox/src/styles/_card.scss:7` — `.card` is an `inline-size` container named `card`.
- `mailbox/tests/src/styles/_card.test.ts:327` — `.card-flush` and `.card-frame` are extra selectors beyond the inventory.
- `mailbox/src/styles/_list-group.scss:7` — `.list-group` is an `inline-size` container named `list-group`.
- `mailbox/tests/src/styles/_list-group.test.ts:111` — adjacent items collapse the shared top border.
- `mailbox/src/styles/_breadcrumb.scss:13` — `--bs-breadcrumb-font-size` is declared empty, where the inventory omits it.
- `mailbox/tests/src/styles/_breadcrumb.test.ts:93` — the `::before` divider rule is asserted.
- `mailbox/src/styles/_pagination.scss:11` — `.pagination` declares the `--bs-pagination-*` set for `.page-item > .page-link`.
- `mailbox/src/styles/_progress.scss:10` — `progress-bar-stripes` moves by `0.625rem`, not `var(--bs-progress-height)`.
- `mailbox/tests/src/styles/_progress.test.ts:74` — the same partial resets native `<progress>` with `appearance: none`.
- `mailbox/src/styles/_spinner.scss:10` — `spinner-border` keeps `/* rtl:ignore */` on `rotate(360deg)`.
- `mailbox/src/styles/_placeholder.scss:12` — `.placeholder` and `.skeleton` both pause under `prefers-reduced-motion`; the inventory placeholder entry has no such query.
- `mailbox/src/styles/_close.scss:10` — `.btn-close` adds `--bs-btn-close-white-filter` beside the inventory tokens.
- `mailbox/tests/src/styles/_close.test.ts:82` — dark theme applies that white filter, and `.btn-close-white` forces it in either theme.
- `mailbox/src/styles/_button-group.scss:11` — only `.btn-toolbar` is an `inline-size` container; `.btn-group` stays `inline-flex`.
- `mailbox/tests/src/styles/_button-group.test.ts:100` — `.active` children lift to `z-index: 2`, and the group test also covers `.dropdown-toggle-split`.

## E. Sizing from `counts`

These are the `counts` object values (`inventory.json:114181`).

- `progress` (`inventory.json:114182`): selectors 9, declarations 44, properties 8, keyframes 1, media 0.
- `spinner` (`inventory.json:114189`): selectors 8, declarations 36, properties 6, keyframes 2, media 0.
- `placeholder` (`inventory.json:114196`): selectors 7, declarations 17, properties 0, keyframes 2, media 0.
- `btn-group` (`inventory.json:114497`): selectors 39, declarations 66, properties 4, keyframes 0, media 0.
- `btn-toolbar` (`inventory.json:114525`): selectors 2, declarations 4, properties 0, keyframes 0, media 0.
- `card` (`inventory.json:114553`): selectors 41, declarations 108, properties 19, keyframes 0, media 0.
- `list-group` (`inventory.json:114560`): selectors 67, declarations 216, properties 17, keyframes 0, media 0.
- `breadcrumb` (`inventory.json:114574`): selectors 4, declarations 22, properties 8, keyframes 0, media 0.
- `pagination` (`inventory.json:114581`): selectors 14, declarations 71, properties 20, keyframes 0, media 0.
- `badge` (`inventory.json:114588`): selectors 3, declarations 19, properties 6, keyframes 0, media 0.
- `btn-close` (`inventory.json:114602`): selectors 10, declarations 51, properties 8, keyframes 0, media 0.