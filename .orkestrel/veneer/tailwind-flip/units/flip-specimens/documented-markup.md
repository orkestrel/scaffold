# Tailwind flip: documented-markup corpus

Bootstrap's documented markup breaks 12 component classes under the recipe that the curation at veneer `473edd6` does not repair, and the showcase hides 8 of them behind a masking companion or context: `alert-heading`, `card-subtitle`, `dropdown-header`, `display-6`, `figure`, `list-inline`, `placeholder-wave`, and `img-thumbnail`; the other 4, `card-header`, `row`, `col-sm-8`, and `col-sm-9`, have no specimen in their documented carrier at all. Of the 608 `CLASS_NAMES.bootstrap.components` names, 53 are covered by a curation row, 4 need a row, 8 are masked in the showcase, and 543 are not a break. The corpus adds 11 specimens: 10 in Bootstrap's documented shape for the 12 classes, and 1 for the `.navbar-text a` component element that § 3 rules a `scoped` row for. This document answers finding F1 of the falsify round, and its readings are cascade readings from source for probe-4 to measure, not measurements.

## Sources

The following sources back every row; a path without a root is relative to `/home/user/veneer` at `473edd6`:

- `reviewer-verdict.md`: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-falsify/reviewer-verdict.md`, findings F1 and F7.
- `design-verdict.md`: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`, R1, R5, § 4, and the § 12 entries on curation.
- The curation table: `guides/veneer.md` § Tailwind compatibility sheet, 46 rows (30 `reboot`, 10 `restore`, 6 `scoped`), equal to `$curation`, `$defaults`, and `$scoped` in `src/tailwindcss/_tokens.scss`.
- The class list: `CLASS_NAMES.bootstrap.components` in `src/core/constants.ts`, 608 distinct names read by a script over the frozen object's string values, grouped by the object's top-level keys.
- The reboot: `src/bootstrap/_reset.scss`. Preflight: `node_modules/tailwindcss/preflight.css` (Tailwind 4.3.3).
- Each class's own declarations: `dist/src/bootstrap/index.css` (Bootstrap 5.3.8, built 2026-10-04 14:42), read with PostCSS for every rule whose subject compound names the class.
- The showcase carriers: every element of `app/browser/sections/*.html` that carries a component class, read with an HTML parser; `tailwindcss.html` is read from the working tree, which differs from `473edd6` by 3 lines.
- The documented carriers: Bootstrap 5.3's documentation example markup as recalled; § 1 marks each carrier `docs` (the example markup, the plugin templates the docs print included) or `inferred` (no example markup, inferred from the Sass or the docs' prose).

## How a break is read

A break follows R5: an element that carries a component class reads a longhand under the recipe that differs from `./bootstrap` alone, and preflight's `base` layer is the cause. Preflight's `base` layer follows the `reset` layer that holds the reboot, so every longhand both resets declare on a tag reads preflight's value, whatever the specificity. The following table lists, per tag, the reboot longhands that preflight overrides and the longhands preflight alone moves from the user agent's value:

| Tag | Reboot longhand that preflight overrides | Preflight's value |
| --- | --- | --- |
| `h1` to `h6` | `font-size`, `font-weight`, `margin-bottom` (0.5rem) | `inherit`, `inherit`, `0` |
| `p`, `dl`, `blockquote`, `figure`, `address` | `margin-bottom` (1rem) | `0` from the universal rule |
| `ul`, `ol` | `margin-bottom` (1rem), `padding-left` (2rem) | `0`, `0` |
| `dd` | `margin-bottom` (0.5rem) | `0` |
| `hr` | `margin-top`, `margin-bottom` (1rem) | `0` (`opacity: 0.25` stays; preflight declares no opacity) |
| `pre` | `margin-bottom`, `font-size` (0.875em), `font-family` | `0`, `1em`, Tailwind's monospace stack |
| `code`, `kbd`, `samp` | `font-size` (0.875em), `font-family`, and the `kbd` padding | `1em`, Tailwind's monospace stack, `0` |
| `small` | `font-size` (0.875em) | `80%` |
| `mark` | `padding` (0.1875em) | `0` |
| `a` | `color` (the link color), `text-decoration-line` (`underline`) | `inherit`, `inherit` |
| `caption` | `padding-top`, `padding-bottom` (0.5rem) | `0` |
| `thead`, `tbody`, `tfoot`, `tr`, `th`, `td` | `border-color` (`inherit`) | `currentColor` from `border: 0 solid` |
| `legend` | `margin-bottom` (0.5rem) | `0` |
| `img`, `svg`, `iframe` | none; preflight alone sets `display` | `block` (the user agent's is `inline`) |
| `img` | none; preflight alone sets `max-width` | `100%` |
| `button`, `input`, `select`, `textarea` | none; preflight alone sets `color`, `background-color`, `padding`, `border` | `inherit`, `transparent`, `0`, `0 solid` |

The reboot's `sub`, `sup`, `abbr[title]`, `summary`, `progress`, `table` (`border-collapse`), `fieldset`, and `button` (`border-radius`, `margin`, the `font` longhands) declarations equal preflight's, and its `label`, `output`, `dt`, `caption` color and alignment, `table` `caption-side`, `pre` overflow, `code` color, `button` `text-transform`, and `hr` opacity declarations meet no preflight declaration, so none of them breaks. R5 excludes `list-style-*` off a `list-item` and the layout-resolved `height`, so the `list-style: none` and `height: auto` rules of preflight add no row.

A class repairs a break when its own rule, or the rule of a class its documented markup always pairs it with (`btn` beside `btn-primary`), redeclares the longhand: that rule sits in the `bootstrap` layer, which follows `base`. The `h1` to `h6`, `small`, and `mark` classes are reboot class members in the `bootstrap` layer (R4), so they redeclare their own longhands. A flex container blockifies its items, so an image that is a flex item reads `display: block` under every face; the `.card` carriers of `card-img`, `card-img-top`, and `card-img-bottom` are flex containers, and the showcase's `d-flex` card bodies are a masking context.

Verdicts take four values:

- `covered`: a curation row at `473edd6` repairs the break, on the class itself or through a documented companion or a `scoped` row.
- `needs a row`: the documented carrier breaks and no showcase specimen carries it, so the fixed point never read it.
- `masked in the showcase`: the showcase carries the class, but a companion class, a substitute tag, or the flex context hides the break; the class needs the row as well.
- `not a break`: no reboot longhand that preflight overrides sits on the documented carrier, or the class redeclares every such longhand; Tailwind owns the bare element by R1.

## 1. The carrier table

### The 12 breaking classes

The following table gives each break with its expected reading at 1280 px under `./bootstrap` alone and under the recipe, the row it needs, and the showcase's mask:

| Class | Documented carrier | Expected reading, Bootstrap only against the recipe | Row | Showcase carrier and mask |
| --- | --- | --- | --- | --- |
| `alert-heading` | `h4` | `font-size` 24px against 16px, `font-weight` 500 against 400, `margin-bottom` 8px against 0px | `reboot` | `h4.alert-heading.h5` at `alerts.html:142`; the `h5` class supplies size and weight |
| `card-subtitle` | `h6` with `mb-2 text-body-secondary` | `font-weight` 500 against 400; `font-size` 16px on both at the default scale | `reboot` | `h5.card-subtitle.h6` at `card.html:15`; the `h6` class supplies weight 500 |
| `dropdown-header` | `h6` | `font-weight` 500 against 400 | `reboot` | `span.dropdown-header` at `dropdowns.html:8`; the `span` carries no heading rule |
| `display-6` | `h1` | `margin-bottom` 8px against 0px | `reboot` | `p.display-6.mb-0` at `typography.html:60`; `mb-0` reads 0px under every face |
| `figure` | `figure` | `margin-bottom` 16px against 0px | `reboot` | `figure.figure.mb-0` at `figures.html:5` and `:25` |
| `list-inline` | `ul` | `margin-bottom` 16px against 0px | `reboot` | `ul.list-inline.mb-0` at `typography.html:114` |
| `placeholder-wave` | `p` | `margin-bottom` 16px against 0px | `reboot` | `p.placeholder-wave.mb-0` at `placeholders.html:56` |
| `img-thumbnail` | `img` | `display` `inline` against `block` | `restore` `img:where(.img-thumbnail)`: `display` | `img.img-thumbnail` at `images.html:26` and `:33`, a flex item of a `d-flex` card body |
| `card-header` | `h5` (and `div`) | `font-size` 20px against 16px, `font-weight` 500 against 400 | `reboot` | every carrier is a `div` (`card.html:142`, `:198`, `:212`) |
| `row` | `dl` (and `div`) | `margin-bottom` 16px against 0px | `reboot` | no `dl.row` in any section |
| `col-sm-9` | `dd` (and `div`) | `margin-bottom` 8px against 0px | `reboot` | no `dd` in any section |
| `col-sm-8` | `dd` (and `div`) | `margin-bottom` 8px against 0px | `reboot` | no `dd` in any section |

The first six rows are F1's six rows, with the documented carriers in place of the masked ones: F1 states the `display-6` margin on the showcase's `p` as 16px, and the documented `h1` reads the heading margin of 8px. Each `reboot` row copies the whole reboot for the class, so it repairs every longhand in the row together: `h4:where(.alert-heading)` brings the size, weight, and margin, and the class's own `color: inherit` at (0,1,0) still beats the copied heading color at (0,0,1). The `card-header`, `dropdown-header`, and `card-subtitle` copies bring `margin-bottom: 0.5rem` at (0,0,1), which each class's own `margin-bottom: 0` at (0,1,0) beats, so only the size and weight move.

The `row`, `col-sm-9`, and `col-sm-8` rows come from Bootstrap's description list alignment markup. The `dd` carriers are component elements twice over, through their column class and through the `.row > *` rule, which declares `margin-top` but no `margin-bottom`. Repair them with `reboot` rows on the documented column classes. Refuse a `scoped` row `:where(.row) dd`: its descendant selector reaches every `dd` under a page grid, and R1 gives a bare `dd` to Tailwind. A column class on another reboot-styled tag (a `p.col-md-6`) breaks the same way and stays outside this corpus, which holds documented carriers only.

The covered heading classes carry masking companions as well, without a missing row: `card-title` and `offcanvas-title` on `h4` with the `h5` class, `popover-header` on `h4` with the `h6` class, `modal-title` on `h4` with `fs-5`, `placeholder-glow` on `p.card-title.h5`, `accordion-header` on `h4`, and `display-1` to `display-5` on `p`. A `reboot` row copies every heading rule, so the documented `h5`, `h2`, `h3`, and `h1` carriers are repaired too; `tailwindcss.html` carries the documented `h5.card-title`, `h5.offcanvas-title`, and `h1.modal-title.fs-5`, the engine builds the documented `h3.popover-header`, and specimen S5 adds the documented `h1.display-1` to `h1.display-5`. The documented `h2.accordion-header` stays without a specimen.

### Every class

The following tables hold one row per `CLASS_NAMES.bootstrap.components` name, grouped by the constants object's top-level key in its order. The columns are:

- Documented carrier: each documented tag, with the classes its documented markup pairs it with, and the confidence mark.
- Reboot longhands preflight overrides: per carrier, from the earlier tag table; `preflight only` names a longhand the reboot never declares.
- Redeclared by the class or its companions: per carrier, `all`, `none`, or the redeclared longhands; `n/a` where the carrier has none.
- Curated at `473edd6`: `reboot`, `restore` with its selector, the companion or `scoped` row that repairs it, or `no`.
- Showcase carrier and companions: the first two distinct carriers with the first location of each, and the count of further distinct carriers.
- Mask: the companion or context that hides a break, or `none`.

### `accordion`

The following rows cover the 7 `accordion` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `accordion` | `div` (docs) | none | n/a | no | `div` with `w-100` (accordion.html:7); `div` with `accordion-flush w-100` (accordion.html:100) | none | not a break: no overridden reboot longhand on `div` |
| `accordion-body` | `div` (docs) | none | n/a | no | `div` (accordion.html:26) | none | not a break: no overridden reboot longhand on `div` |
| `accordion-button` | `button` with `accordion-button` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | restore `button:where(.accordion-button)` | `button` (accordion.html:10); `button` with `collapsed` (accordion.html:34) | none | covered |
| `accordion-collapse` | `div` (docs) | none | n/a | no | `div` with `collapse show` (accordion.html:21); `div` with `collapse` (accordion.html:45) | none | not a break: no overridden reboot longhand on `div` |
| `accordion-flush` | `div` (docs) | none | n/a | no | `div` with `accordion w-100` (accordion.html:100) | none | not a break: no overridden reboot longhand on `div` |
| `accordion-header` | `h2` (docs) | `h2`: font-size, font-weight, margin-bottom | `h2`: margin-bottom | reboot | `h4` (accordion.html:9) | `h4` replaces the documented `h2` | covered: the copy reaches the documented `h2`; the showcase reads `h4` only |
| `accordion-item` | `div` (docs) | none | n/a | no | `div` (accordion.html:8) | none | not a break: no overridden reboot longhand on `div` |

### `alert`

The following rows cover the 12 `alert` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `alert` | `div` (docs) | none | n/a | no | `div` with `alert-primary w-100 mb-0` (alerts.html:6); `div` with `alert-secondary w-100 mb-0` (alerts.html:11); 17 more | none | not a break: no overridden reboot longhand on `div` |
| `alert-danger` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:22); `div` with `alert d-flex align-items-center gap-2 w-100 mb-0` (alerts.html:111) | none | not a break: no overridden reboot longhand on `div` |
| `alert-dark` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:44) | none | not a break: no overridden reboot longhand on `div` |
| `alert-dismissible` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert alert-warning fade show w-100 mb-0` (alerts.html:162); `div` with `alert alert-info mb-0` (alerts.html:187); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `alert-heading` | `h4` (docs) | `h4`: font-size, font-weight, margin-bottom | `h4`: none | no | `h4` with `h5` (alerts.html:142) | `.h5` restores size and weight through its class rule | masked in the showcase: needs a reboot row: `font-size`, `font-weight`, `margin-bottom` (F1) |
| `alert-info` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:33); `div` with `alert alert-dismissible mb-0` (alerts.html:187); 4 more | none | not a break: no overridden reboot longhand on `div` |
| `alert-light` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:39) | none | not a break: no overridden reboot longhand on `div` |
| `alert-link` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (alerts.html:7) | none | covered |
| `alert-primary` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:6); `div` with `alert d-flex align-items-center gap-2 w-100 mb-0` (alerts.html:60) | none | not a break: no overridden reboot longhand on `div` |
| `alert-secondary` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:11); `div` with `alert mb-4` (tailwindcss.html:1) | none | not a break: no overridden reboot longhand on `div` |
| `alert-success` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:16); `div` with `alert d-flex align-items-center gap-2 w-100 mb-0` (alerts.html:77) | none | not a break: no overridden reboot longhand on `div` |
| `alert-warning` | `div` with `alert` (docs) | none | n/a | no | `div` with `alert w-100 mb-0` (alerts.html:28); `div` with `alert d-flex align-items-center gap-2 w-100 mb-0` (alerts.html:94); 1 more | none | not a break: no overridden reboot longhand on `div` |

### `badge`

The following row covers the `badge` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `badge` | `span` with `text-bg-secondary` (docs) | none | n/a | no | `span` with `text-bg-secondary` (badge.html:8); `span` with `text-bg-light` (badge.html:23); 20 more | none | not a break: no overridden reboot longhand on `span` |

### `bi`

The following row covers the `bi` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `bi` | `svg` (docs) | `svg`: preflight only: display | `svg`: none | restore `svg:where(.bi)` | `svg` with `bi-info-circle-fill flex-shrink-0` (alerts.html:61); `svg` with `bi-check-circle-fill flex-shrink-0` (alerts.html:78); 18 more | none | covered |

### `blockquote`

The following rows cover the 2 `blockquote` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `blockquote` | `blockquote` (docs) | `blockquote`: margin-bottom | `blockquote`: all | no | `blockquote` (typography.html:79) | none | not a break: the class redeclares |
| `blockquote-footer` | `figcaption` (docs); `footer` (docs) | none | n/a | no | `figcaption` with `text-body-secondary mb-0` (typography.html:82) | none | not a break: no overridden reboot longhand on `figcaption`, `footer` |

### `breadcrumb`

The following rows cover the 2 `breadcrumb` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `breadcrumb` | `ol` (docs) | `ol`: margin-bottom, padding-left | `ol`: all | no | `ol` (breadcrumb.html:9); `ol` with `mb-0` (breadcrumb.html:20) | none | not a break: the class redeclares |
| `breadcrumb-item` | `li` (docs) | none | n/a | no | `li` with `active` (breadcrumb.html:10); `li` (breadcrumb.html:15) | none | not a break: no overridden reboot longhand on `li` |

### `bs`

The following rows cover the 10 `bs` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `bs-popover-auto` | `div` with `popover` (docs) | none | n/a | no | `div` with `popover fade show position-relative` (popovers.html:155) | none | not a break: no overridden reboot longhand on `div` |
| `bs-popover-bottom` | `div` with `popover` (docs) | none | n/a | no | `div` with `popover fade show position-relative` (popovers.html:80) | none | not a break: no overridden reboot longhand on `div` |
| `bs-popover-end` | `div` with `popover` (docs) | none | n/a | no | `div` with `popover fade show position-relative` (popovers.html:105) | none | not a break: no overridden reboot longhand on `div` |
| `bs-popover-start` | `div` with `popover` (docs) | none | n/a | no | `div` with `popover fade show position-relative` (popovers.html:129) | none | not a break: no overridden reboot longhand on `div` |
| `bs-popover-top` | `div` with `popover` (docs) | none | n/a | no | `div` with `popover fade show position-relative` (popovers.html:52) | none | not a break: no overridden reboot longhand on `div` |
| `bs-tooltip-auto` | `div` with `tooltip` (docs) | none | n/a | no | `div` with `tooltip fade show position-relative` (tooltips.html:115) | none | not a break: no overridden reboot longhand on `div` |
| `bs-tooltip-bottom` | `div` with `tooltip` (docs) | none | n/a | no | `div` with `tooltip fade show position-relative` (tooltips.html:69) | none | not a break: no overridden reboot longhand on `div` |
| `bs-tooltip-end` | `div` with `tooltip` (docs) | none | n/a | no | `div` with `tooltip fade show position-relative` (tooltips.html:78) | none | not a break: no overridden reboot longhand on `div` |
| `bs-tooltip-start` | `div` with `tooltip` (docs) | none | n/a | no | `div` with `tooltip fade show position-relative` (tooltips.html:86) | none | not a break: no overridden reboot longhand on `div` |
| `bs-tooltip-top` | `div` with `tooltip` (docs) | none | n/a | no | `div` with `tooltip fade show position-relative` (tooltips.html:59) | none | not a break: no overridden reboot longhand on `div` |

### `btn`

The following rows cover the 28 `btn` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `btn` | `button` (docs); `a` (docs); `input` (docs) | `button`: preflight only: color, background-color, padding, border; `a`: color, text-decoration-line; `input`: preflight only: color, background-color, padding, border | `button`: all; `a`: all; `input`: all | no | `button` with `btn-primary` (badge.html:22); `button` with `btn-outline-secondary text-body-emphasis position-relative` (badge.html:25); 45 more | none | not a break: the class redeclares |
| `btn-check` | `input` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: none | restore `input:where(.btn-check)` | `input` (checks-radios.html:192) | none | covered: the restore row repairs `color`; the class clips the input, so the other longhands are invisible |
| `btn-close` | `button` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` (alerts.html:165); `button` with `disabled` (alerts.html:214); 2 more | none | not a break: the class redeclares |
| `btn-close-white` | `button` with `btn-close` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn-close` (close-button.html:22); `button` with `btn-close me-2 m-auto` (toasts.html:66) | none | not a break: the class redeclares |
| `btn-danger` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:8) | none | not a break: the class redeclares |
| `btn-dark` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:17) | none | not a break: the class redeclares |
| `btn-group` | `div` (docs) | none | n/a | no | `div` (button-group.html:7); `div` with `btn-group-lg` (button-group.html:30); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `btn-group-lg` | `div` with `btn-group` (docs) | none | n/a | no | `div` with `btn-group` (button-group.html:30) | none | not a break: no overridden reboot longhand on `div` |
| `btn-group-sm` | `div` with `btn-group` (docs) | none | n/a | no | `div` with `btn-group` (button-group.html:40) | none | not a break: no overridden reboot longhand on `div` |
| `btn-group-vertical` | `div` with `btn-group` (docs) | none | n/a | no | `div` (button-group.html:82) | none | not a break: no overridden reboot longhand on `div` |
| `btn-info` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:10) | none | not a break: the class redeclares |
| `btn-lg` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn btn-primary` (buttons.html:66) | none | not a break: the class redeclares |
| `btn-light` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:14) | none | not a break: the class redeclares |
| `btn-link` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:11) | none | not a break: the class redeclares |
| `btn-outline-danger` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:38) | none | not a break: the class redeclares |
| `btn-outline-dark` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:49) | none | not a break: the class redeclares |
| `btn-outline-info` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:42) | none | not a break: the class redeclares |
| `btn-outline-light` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:46) | none | not a break: the class redeclares |
| `btn-outline-primary` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (button-group.html:8); `button` with `btn active` (button-group.html:9); 1 more | none | not a break: the class redeclares |
| `btn-outline-secondary` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn text-body-emphasis position-relative` (badge.html:25); `button` with `btn` (button-group.html:31); 13 more | none | not a break: the class redeclares |
| `btn-outline-success` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:37) | none | not a break: the class redeclares |
| `btn-outline-warning` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:41) | none | not a break: the class redeclares |
| `btn-primary` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (badge.html:22); `button` with `btn btn-lg` (buttons.html:66); 8 more | none | not a break: the class redeclares |
| `btn-secondary` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:6); `button` with `btn dropdown-toggle` (dropdowns.html:66); 4 more | none | not a break: the class redeclares |
| `btn-sm` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn btn-primary` (buttons.html:68); `button` with `btn btn-outline-secondary text-body-emphasis d-sm-none mb-2` (offcanvas.html:343); 6 more | none | not a break: the class redeclares |
| `btn-success` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:7) | none | not a break: the class redeclares |
| `btn-toolbar` | `div` (docs) | none | n/a | no | `div` with `gap-2` (button-group.html:57) | none | not a break: no overridden reboot longhand on `div` |
| `btn-warning` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn` (buttons.html:9) | none | not a break: the class redeclares |

### `caption`

The following row covers the `caption-top` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `caption-top` | `table` with `table` (docs) | none | n/a | no | `table` with `table mb-0` (tables.html:5) | none | not a break: no overridden reboot longhand on `table` |

### `card`

The following rows cover the 15 `card` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `card` | `div` (docs) | none | n/a | no | `figure` with `flex-fill mb-0` (accordion.html:3); `div` with `w-100` (card.html:7); 7 more | none | not a break: no overridden reboot longhand on `div` |
| `card-body` | `div` (docs) | none | n/a | no | `div` with `d-flex flex-wrap align-content-start align-items-start row-gap-3 column-gap-3` (accordion.html:4); `div` with `row row-cols-1 row-cols-md-2 g-3 m-0` (alerts.html:4); 10 more | none | not a break: no overridden reboot longhand on `div` |
| `card-footer` | `div` (docs) | none | n/a | no | `figcaption` with `bg-transparent small` (accordion.html:80); `div` with `text-body-secondary` (card.html:102); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `card-group` | `div` (docs) | none | n/a | no | `div` with `w-100` (card.html:91) | none | not a break: no overridden reboot longhand on `div` |
| `card-header` | `div` (docs); `h5` (docs) | `h5`: font-size, font-weight, margin-bottom | `h5`: margin-bottom | no | `div` with `d-flex align-items-center gap-2` (card.html:142); `div` (card.html:198); 1 more | every showcase carrier is a `div`; the documented `h5` is absent | needs a row: reboot row: `font-size`, `font-weight` on the documented `h5` |
| `card-header-pills` | `ul` with `nav nav-pills` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav nav-pills` (card.html:213) | none | not a break: the class redeclares |
| `card-header-tabs` | `ul` with `nav nav-tabs` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav nav-tabs` (card.html:199) | none | not a break: the class redeclares |
| `card-img` | `img` (docs) | `img`: preflight only: display, max-width | `img`: none | restore `img:where(.card-img)` | `img` (card.html:55) | none | covered: `display` is blockified inside the flex `.card`; the restore row repairs `max-width` |
| `card-img-bottom` | `img` (docs) | `img`: preflight only: display, max-width | `img`: none | restore `img:where(.card-img-bottom)` | `img` (card.html:71) | none | covered: `display` is blockified inside the flex `.card`; the restore row repairs `max-width` |
| `card-img-overlay` | `div` (docs) | none | n/a | no | `div` (card.html:60) | none | not a break: no overridden reboot longhand on `div` |
| `card-img-top` | `img` (docs) | `img`: preflight only: display, max-width | `img`: none | restore `img:where(.card-img-top)` | `img` (card.html:8); `img` with `img-fluid w-auto` (stretched-link.html:10) | none | covered: `display` is blockified inside the flex `.card`; the restore row repairs `max-width` |
| `card-link` | `a` (docs) | `a`: color, text-decoration-line | `a`: none | reboot | `a` (card.html:19); `a` with `icon-link` (card.html:20) | none | covered |
| `card-subtitle` | `h6` with `mb-2 text-body-secondary` (docs) | `h6`: font-size, font-weight, margin-bottom | `h6`: margin-bottom | no | `h5` with `h6 mb-2 text-body-secondary` (card.html:15) | `h5` tag and `.h6` class (the class rule supplies weight 500) | masked in the showcase: needs a reboot row: `font-weight` (`font-size` reads 16px on both at the default scale) (F1) |
| `card-text` | `p` (docs) | `p`: margin-bottom | `p`: all | reboot | `p` (card.html:16); `p` with `placeholder-glow` (placeholders.html:10) | none | covered |
| `card-title` | `h5` (docs) | `h5`: font-size, font-weight, margin-bottom | `h5`: margin-bottom | reboot | `h4` with `h5` (card.html:14); `p` with `h5 placeholder-glow` (placeholders.html:9); 2 more | `h4.card-title.h5`: `.h5` and the `h4` tag mask the level; `tailwindcss.html` carries the documented `h5` | covered |

### `carousel`

The following rows cover the 15 `carousel` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `carousel` | `div` (docs) | none | n/a | no | `div` with `slide w-100` (carousel.html:7); `div` with `slide carousel-fade w-100` (carousel.html:105); 4 more | none | not a break: no overridden reboot longhand on `div` |
| `carousel-caption` | `div` (docs) | none | n/a | no | `div` with `d-none d-md-block` (carousel.html:37) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-control-next` | `button` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` (carousel.html:74) | none | not a break: the class redeclares |
| `carousel-control-next-icon` | `span` (docs) | none | n/a | no | `span` (carousel.html:80) | none | not a break: no overridden reboot longhand on `span` |
| `carousel-control-prev` | `button` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` (carousel.html:65) | none | not a break: the class redeclares |
| `carousel-control-prev-icon` | `span` (docs) | none | n/a | no | `span` (carousel.html:71) | none | not a break: no overridden reboot longhand on `span` |
| `carousel-dark` | `div` with `carousel slide` (docs) | none | n/a | no | `div` with `carousel slide w-100` (carousel.html:153) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-fade` | `div` with `carousel slide` (docs) | none | n/a | no | `div` with `carousel slide w-100` (carousel.html:105) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-indicators` | `div` (docs) | none | n/a | no | `div` (carousel.html:8) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-inner` | `div` (docs) | none | n/a | no | `div` with `rounded` (carousel.html:30); `div` with `rounded border` (carousel.html:170); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `carousel-item` | `div` (docs) | none | n/a | no | `div` with `active` (carousel.html:31); `div` (carousel.html:42); 6 more | none | not a break: no overridden reboot longhand on `div` |
| `carousel-item-end` | `div` with `carousel-item` (docs) | none | n/a | no | `div` with `carousel-item carousel-item-prev` (carousel.html:258); `div` with `carousel-item active` (carousel.html:265) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-item-next` | `div` with `carousel-item` (docs) | none | n/a | no | `div` with `carousel-item carousel-item-start` (carousel.html:232) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-item-prev` | `div` with `carousel-item` (docs) | none | n/a | no | `div` with `carousel-item carousel-item-end` (carousel.html:258) | none | not a break: no overridden reboot longhand on `div` |
| `carousel-item-start` | `div` with `carousel-item` (docs) | none | n/a | no | `div` with `carousel-item active` (carousel.html:225); `div` with `carousel-item carousel-item-next` (carousel.html:232) | none | not a break: no overridden reboot longhand on `div` |

### `clearfix`

The following row covers the `clearfix` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `clearfix` | `div` (docs) | none | n/a | no | `div` with `w-100 bg-body-tertiary border rounded p-2` (clearfix.html:9) | none | not a break: no overridden reboot longhand on `div` |

### Grid columns (`col`)

The following rows cover the 87 `col` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `col-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-10` | `div` (docs) | none | n/a | no | `span` with `placeholder` (engine-states.html:133) | none | not a break: no overridden reboot longhand on `div` |
| `col-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-12` | `div` (docs) | none | n/a | no | `span` with `placeholder placeholder-lg` (placeholders.html:35); `span` with `placeholder` (placeholders.html:36); 6 more | none | not a break: no overridden reboot longhand on `div` |
| `col-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-4` | `div` (docs) | none | n/a | no | `span` with `placeholder` (placeholders.html:12) | none | not a break: no overridden reboot longhand on `div` |
| `col-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-6` | `div` (docs) | none | n/a | no | `span` with `placeholder` (engine-states.html:133); `span` with `btn btn-primary disabled placeholder` (placeholders.html:17) | none | not a break: no overridden reboot longhand on `div` |
| `col-7` | `div` (docs) | none | n/a | no | `span` with `placeholder` (placeholders.html:11) | none | not a break: no overridden reboot longhand on `div` |
| `col-8` | `div` (docs) | none | n/a | no | `span` with `placeholder` (offcanvas.html:164) | none | not a break: no overridden reboot longhand on `div` |
| `col-9` | `div` (docs) | none | n/a | no | `div` with `text-truncate` (text-truncation.html:10) | none | not a break: no overridden reboot longhand on `div` |
| `col-auto` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col` | `div` (docs) | none | n/a | no | `div` with `d-flex` (accordion.html:2); `div` (alerts.html:5) | none | not a break: no overridden reboot longhand on `div` |
| `col-form-label` | `label` (docs); `legend` (docs) | `legend`: margin-bottom | `legend`: all | no | `label` with `col-sm-4` (form-layout.html:11); `legend` with `col-sm-4 pt-0` (form-layout.html:31); 2 more | none | not a break: the class redeclares |
| `col-form-label-lg` | `label` with `col-form-label` (docs) | none | n/a | no | `label` with `col-sm-4 col-form-label` (form-layout.html:100) | none | not a break: no overridden reboot longhand on `label` |
| `col-form-label-sm` | `label` with `col-form-label` (docs) | none | n/a | no | `label` with `col-sm-4 col-form-label` (form-layout.html:76) | none | not a break: no overridden reboot longhand on `label` |
| `col-lg-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-12` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg-auto` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-lg` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-12` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md-auto` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-md` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-12` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-2` | `div` (docs); `label` with `col-form-label` (docs); `legend` with `col-form-label` (docs) | `legend`: margin-bottom | `legend`: all | no | absent | none | not a break: the class redeclares |
| `col-sm-3` | `div` (docs); `dt` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div`, `dt` |
| `col-sm-4` | `div` (docs); `dt` (docs) | none | n/a | no | `label` with `col-form-label` (form-layout.html:11); `legend` with `col-form-label pt-0` (form-layout.html:31); 3 more | none | not a break: no overridden reboot longhand on `div`, `dt` |
| `col-sm-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm-8` | `div` (docs); `dd` (docs) | `dd`: margin-bottom | `dd`: none | no | `div` (form-layout.html:12); `div` with `offset-sm-4` (form-layout.html:55) | no `dd` in any section | needs a row: reboot row: `margin-bottom` on the documented `dd` |
| `col-sm-9` | `div` (docs); `dd` (docs) | `dd`: margin-bottom | `dd`: none | no | absent | no `dd` in any section | needs a row: reboot row: `margin-bottom` on the documented `dd` |
| `col-sm-auto` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-sm` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-12` | `div` (docs) | none | n/a | no | `div` with `d-flex` (alerts.html:2) | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl-auto` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xl` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-12` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl-auto` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `col-xxl` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |

### `collapse`

The following rows cover the 2 `collapse` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `collapse` | `div` (docs) | none | n/a | no | `div` with `accordion-collapse show` (accordion.html:21); `div` with `accordion-collapse` (accordion.html:45); 6 more | none | not a break: no overridden reboot longhand on `div` |
| `collapse-horizontal` | `div` (docs) | none | n/a | no | `div` with `collapse show` (collapse.html:81) | none | not a break: no overridden reboot longhand on `div` |

### `container`

The following rows cover the 7 `container` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `container` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:10); `div` (tailwindcss.html:373) | none | not a break: no overridden reboot longhand on `div` |
| `container-fluid` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:50); `div` (navbar.html:8) | none | not a break: no overridden reboot longhand on `div` |
| `container-lg` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:32) | none | not a break: no overridden reboot longhand on `div` |
| `container-md` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:26) | none | not a break: no overridden reboot longhand on `div` |
| `container-sm` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:18) | none | not a break: no overridden reboot longhand on `div` |
| `container-xl` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:38) | none | not a break: no overridden reboot longhand on `div` |
| `container-xxl` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border rounded py-2` (containers.html:44) | none | not a break: no overridden reboot longhand on `div` |

### `disabled`

The following row covers the `disabled` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `disabled` | `a` with `btn` (docs); `li` with `page-item` (docs); `a` with `nav-link` (docs); `a` with `dropdown-item` (docs) | `a`: color, text-decoration-line; `a`: color, text-decoration-line; `a`: color, text-decoration-line | `a`: all; `a`: all; `a`: all | no | `button` with `btn-close` (alerts.html:214); `a` with `btn btn-primary` (buttons.html:155); 11 more | none | not a break: the class redeclares |

### `display`

The following rows cover the 6 `display` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `display-1` | `h1` (docs) | `h1`: font-size, font-weight, margin-bottom | `h1`: font-size, font-weight | reboot | `p` (typography.html:55); `span` with `position-absolute top-50 start-50 translate-middle z-n1 fw-bold text-body-tertiary opacity-50` (z-index.html:41) | `p` replaces the documented `h1` | covered: the copy reaches the documented `h1`; the showcase reads `p` only |
| `display-2` | `h1` (docs) | `h1`: font-size, font-weight, margin-bottom | `h1`: font-size, font-weight | reboot | `p` (typography.html:56) | `p` replaces the documented `h1` | covered: the copy reaches the documented `h1`; the showcase reads `p` only |
| `display-3` | `h1` (docs) | `h1`: font-size, font-weight, margin-bottom | `h1`: font-size, font-weight | reboot | `p` (typography.html:57) | `p` replaces the documented `h1` | covered: the copy reaches the documented `h1`; the showcase reads `p` only |
| `display-4` | `h1` (docs) | `h1`: font-size, font-weight, margin-bottom | `h1`: font-size, font-weight | reboot | `p` (typography.html:58) | `p` replaces the documented `h1` | covered: the copy reaches the documented `h1`; the showcase reads `p` only |
| `display-5` | `h1` (docs) | `h1`: font-size, font-weight, margin-bottom | `h1`: font-size, font-weight | reboot | `p` (typography.html:59) | `p` replaces the documented `h1` | covered: the copy reaches the documented `h1`; the showcase reads `p` only |
| `display-6` | `h1` (docs) | `h1`: font-size, font-weight, margin-bottom | `h1`: font-size, font-weight | no | `p` with `mb-0` (typography.html:60) | `p` replaces the documented `h1`; `mb-0` zeroes the margin under every face | masked in the showcase: needs a reboot row: `margin-bottom` (8px on `h1`) (F1) |

### `dropdown`

The following rows cover the 22 `dropdown` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `dropdown` | `div` (docs) | none | n/a | no | `div` (dropdowns.html:65); `li` with `nav-item` (navbar.html:101) | none | not a break: no overridden reboot longhand on `div` |
| `dropdown-center` | `div` (docs) | none | n/a | no | `div` with `align-self-start mt-3` (dropdowns.html:227) | none | not a break: no overridden reboot longhand on `div` |
| `dropdown-divider` | `hr` (docs) | `hr`: margin-top, margin-bottom | `hr`: all | no | `hr` (dropdowns.html:12) | none | not a break: the class redeclares |
| `dropdown-header` | `h6` (docs) | `h6`: font-size, font-weight, margin-bottom | `h6`: font-size, margin-bottom | no | `span` (dropdowns.html:8) | `span` replaces the documented `h6` | masked in the showcase: needs a reboot row: `font-weight` (F1) |
| `dropdown-item` | `a` (docs); `button` (docs) | `a`: color, text-decoration-line; `button`: preflight only: color, background-color, padding, border | `a`: all; `button`: all | no | `a` with `active` (dropdowns.html:9); `a` (dropdowns.html:10); 2 more | none | not a break: the class redeclares |
| `dropdown-item-text` | `span` (docs) | none | n/a | no | `span` with `text-body-secondary` (dropdowns.html:13) | none | not a break: no overridden reboot longhand on `span` |
| `dropdown-menu` | `ul` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `show position-static` (dropdowns.html:7); `ul` with `dropdown-menu-dark show position-static` (dropdowns.html:35); 4 more | none | not a break: the class redeclares |
| `dropdown-menu-dark` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu show position-static` (dropdowns.html:35) | none | not a break: the class redeclares |
| `dropdown-menu-end` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu` (dropdowns.html:110); `ul` with `dropdown-menu dropdown-menu-sm-start dropdown-menu-md-end dropdown-menu-lg-start dropdown-menu-xl-end dropdown-menu-xxl-start` (dropdowns.html:301) | none | not a break: the class redeclares |
| `dropdown-menu-lg-end` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-start dropdown-menu-sm-end dropdown-menu-md-start dropdown-menu-xl-start dropdown-menu-xxl-end` (dropdowns.html:285) | none | not a break: the class redeclares |
| `dropdown-menu-lg-start` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-end dropdown-menu-sm-start dropdown-menu-md-end dropdown-menu-xl-end dropdown-menu-xxl-start` (dropdowns.html:301) | none | not a break: the class redeclares |
| `dropdown-menu-md-end` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-end dropdown-menu-sm-start dropdown-menu-lg-start dropdown-menu-xl-end dropdown-menu-xxl-start` (dropdowns.html:301) | none | not a break: the class redeclares |
| `dropdown-menu-md-start` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-start dropdown-menu-sm-end dropdown-menu-lg-end dropdown-menu-xl-start dropdown-menu-xxl-end` (dropdowns.html:285) | none | not a break: the class redeclares |
| `dropdown-menu-sm-end` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-start dropdown-menu-md-start dropdown-menu-lg-end dropdown-menu-xl-start dropdown-menu-xxl-end` (dropdowns.html:285) | none | not a break: the class redeclares |
| `dropdown-menu-sm-start` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-end dropdown-menu-md-end dropdown-menu-lg-start dropdown-menu-xl-end dropdown-menu-xxl-start` (dropdowns.html:301) | none | not a break: the class redeclares |
| `dropdown-menu-start` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-sm-end dropdown-menu-md-start dropdown-menu-lg-end dropdown-menu-xl-start dropdown-menu-xxl-end` (dropdowns.html:285) | none | not a break: the class redeclares |
| `dropdown-menu-xl-end` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-end dropdown-menu-sm-start dropdown-menu-md-end dropdown-menu-lg-start dropdown-menu-xxl-start` (dropdowns.html:301) | none | not a break: the class redeclares |
| `dropdown-menu-xl-start` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-start dropdown-menu-sm-end dropdown-menu-md-start dropdown-menu-lg-end dropdown-menu-xxl-end` (dropdowns.html:285) | none | not a break: the class redeclares |
| `dropdown-menu-xxl-end` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-start dropdown-menu-sm-end dropdown-menu-md-start dropdown-menu-lg-end dropdown-menu-xl-start` (dropdowns.html:285) | none | not a break: the class redeclares |
| `dropdown-menu-xxl-start` | `ul` with `dropdown-menu` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `dropdown-menu dropdown-menu-end dropdown-menu-sm-start dropdown-menu-md-end dropdown-menu-lg-start dropdown-menu-xl-end` (dropdowns.html:301) | none | not a break: the class redeclares |
| `dropdown-toggle` | `button` with `btn` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn btn-secondary` (dropdowns.html:66); `button` with `btn btn-primary dropdown-toggle-split` (dropdowns.html:102); 2 more | none | not a break: the class redeclares |
| `dropdown-toggle-split` | `button` with `btn dropdown-toggle` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` with `btn btn-primary dropdown-toggle` (dropdowns.html:102) | none | not a break: the class redeclares |

### `dropend`

The following row covers the `dropend` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `dropend` | `div` (docs) | none | n/a | no | `div` (dropdowns.html:165) | none | not a break: no overridden reboot longhand on `div` |

### `dropstart`

The following row covers the `dropstart` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `dropstart` | `div` (docs) | none | n/a | no | `div` (dropdowns.html:196) | none | not a break: no overridden reboot longhand on `div` |

### `dropup`

The following rows cover the 2 `dropup` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `dropup` | `div` (docs) | none | n/a | no | `div` (dropdowns.html:134); `div` with `dropup-center align-self-end mb-3` (dropdowns.html:241) | none | not a break: no overridden reboot longhand on `div` |
| `dropup-center` | `div` (docs) | none | n/a | no | `div` with `dropup align-self-end mb-3` (dropdowns.html:241) | none | not a break: no overridden reboot longhand on `div` |

### `figure`

The following rows cover the 3 `figure` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `figure` | `figure` (docs) | `figure`: margin-bottom | `figure`: none | no | `figure` with `mb-0` (figures.html:5) | `mb-0` zeroes the margin under every face | masked in the showcase: needs a reboot row: `margin-bottom` (F1) |
| `figure-caption` | `figcaption` (docs) | none | n/a | no | `figcaption` (figures.html:13); `figcaption` with `text-end` (figures.html:33) | none | not a break: no overridden reboot longhand on `figcaption` |
| `figure-img` | `img` with `img-fluid rounded` (docs) | `img`: preflight only: display, max-width | `img`: max-width | restore `img:where(.figure-img)` | `img` with `img-fluid rounded` (figures.html:6); `img` (tailwindcss.html:197) | none | covered |

### `fixed`

The following rows cover the 2 `fixed` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `fixed-bottom` | `nav` with `navbar` (docs) | none | n/a | no | `div` with `bg-body border-top px-3 py-2 small` (position-helpers.html:17) | none | not a break: no overridden reboot longhand on `nav` |
| `fixed-top` | `nav` with `navbar` (docs) | none | n/a | no | `div` with `bg-body border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:11) | none | not a break: no overridden reboot longhand on `nav` |

### `focus`

The following rows cover the 9 `focus` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `focus-ring` | `a` with `py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | reboot | `a` with `py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:9); `a` with `focus-ring-primary py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:29); 7 more | none | covered |
| `focus-ring-danger` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:44) | none | covered |
| `focus-ring-dark` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:64) | none | covered |
| `focus-ring-info` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:54) | none | covered |
| `focus-ring-light` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:59) | none | covered |
| `focus-ring-primary` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:29) | none | covered |
| `focus-ring-secondary` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:34) | none | covered |
| `focus-ring-success` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:39) | none | covered |
| `focus-ring-warning` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (docs) | `a`: color, text-decoration-line | `a`: none | through `focus-ring` | `a` with `focus-ring py-1 px-2 text-decoration-none border rounded-2` (focus-ring.html:49) | none | covered |

### `form`

The following rows cover the 18 `form` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `form-check` | `div` (docs) | none | n/a | no | `div` (checks-radios.html:10); `div` with `form-switch` (checks-radios.html:90); 3 more | none | not a break: no overridden reboot longhand on `div` |
| `form-check-inline` | `div` with `form-check` (docs) | none | n/a | no | `div` with `form-check` (checks-radios.html:137) | none | not a break: no overridden reboot longhand on `div` |
| `form-check-input` | `input` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: background-color, border | restore `input:where(.form-check-input)` | `input` (checks-radios.html:11) | none | covered: the fixed point read only `color` (guide curation table) |
| `form-check-label` | `label` (docs) | none | n/a | no | `label` (checks-radios.html:12) | none | not a break: no overridden reboot longhand on `label` |
| `form-check-reverse` | `div` with `form-check` (docs) | none | n/a | no | `div` with `form-check` (checks-radios.html:165); `div` with `form-check form-switch` (checks-radios.html:169) | none | not a break: no overridden reboot longhand on `div` |
| `form-control` | `input` (docs); `textarea` (docs) | `input`: preflight only: color, background-color, padding, border; `textarea`: preflight only: color, background-color, padding, border | `input`: all; `textarea`: all | no | `input` (floating-labels.html:11); `textarea` (floating-labels.html:83); 6 more | none | not a break: the class redeclares |
| `form-control-color` | `input` with `form-control` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: all | no | `input` with `form-control` (form-controls.html:140) | none | not a break: the class redeclares |
| `form-control-lg` | `input` with `form-control` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: all | no | `input` with `form-control` (form-controls.html:43) | none | not a break: the class redeclares |
| `form-control-plaintext` | `input` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: all | no | `input` (floating-labels.html:55) | none | not a break: the class redeclares |
| `form-control-sm` | `input` with `form-control` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: all | no | `input` with `form-control` (form-controls.html:55) | none | not a break: the class redeclares |
| `form-floating` | `div` (docs) | none | n/a | no | `div` with `mb-3` (floating-labels.html:10); `div` (floating-labels.html:19); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `form-label` | `label` (docs) | none | n/a | no | `label` (form-controls.html:11) | none | not a break: no overridden reboot longhand on `label` |
| `form-range` | `input` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: background-color, padding | restore `input:where(.form-range)` | `input` (range.html:7); `input` with `mb-3` (range.html:21) | none | covered: the fixed point read only `color` (guide curation table) |
| `form-select` | `select` (docs) | `select`: preflight only: color, background-color, padding, border | `select`: all | no | `select` (floating-labels.html:105); `select` with `form-select-lg` (select.html:24); 1 more | none | not a break: the class redeclares |
| `form-select-lg` | `select` with `form-select` (docs) | `select`: preflight only: color, background-color, padding, border | `select`: all | no | `select` with `form-select` (select.html:24) | none | not a break: the class redeclares |
| `form-select-sm` | `select` with `form-select` (docs) | `select`: preflight only: color, background-color, padding, border | `select`: all | no | `select` with `form-select` (select.html:32) | none | not a break: the class redeclares |
| `form-switch` | `div` with `form-check` (docs) | none | n/a | no | `div` with `form-check` (checks-radios.html:90); `div` with `form-check form-check-reverse` (checks-radios.html:169) | none | not a break: no overridden reboot longhand on `div` |
| `form-text` | `div` (docs); `span` (docs) | none | n/a | no | `div` (form-controls.html:19) | none | not a break: no overridden reboot longhand on `div`, `span` |

### `h1`

The following row covers the `h1` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h1` | `p` (docs) | `p`: margin-bottom | `p`: all | no | `p` (typography.html:10) | none | not a break: the class redeclares |

### `h2`

The following row covers the `h2` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h2` | `p` (docs) | `p`: margin-bottom | `p`: all | no | `p` (typography.html:11) | none | not a break: the class redeclares |

### `h3`

The following row covers the `h3` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h3` | `p` (docs) | `p`: margin-bottom | `p`: all | no | `p` (typography.html:12) | none | not a break: the class redeclares |

### `h4`

The following row covers the `h4` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h4` | `p` (docs) | `p`: margin-bottom | `p`: all | no | `p` (badge.html:8) | none | not a break: the class redeclares |

### `h5`

The following row covers the `h5` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h5` | `p` (docs) | `p`: margin-bottom | `p`: all | no | `h4` with `alert-heading` (alerts.html:142); `p` (badge.html:9); 5 more | none | not a break: the class redeclares |

### `h6`

The following row covers the `h6` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h6` | `p` (docs) | `p`: margin-bottom | `p`: all | no | `p` with `mb-0` (badge.html:10); `h5` with `card-subtitle mb-2 text-body-secondary` (card.html:15); 3 more | none | not a break: the class redeclares |

### `has`

The following row covers the `has-validation` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `has-validation` | `div` with `input-group` (docs) | none | n/a | no | `div` with `input-group` (validation.html:112) | none | not a break: no overridden reboot longhand on `div` |

### `hstack`

The following row covers the `hstack` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `hstack` | `div` (docs) | none | n/a | no | `div` with `gap-2 w-100` (stacks.html:28); `div` with `flex-wrap flex-sm-nowrap gap-2 w-100` (stacks.html:45); 1 more | none | not a break: no overridden reboot longhand on `div` |

### `icon`

The following rows cover the 2 `icon` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `icon-link` | `a` (docs) | `a`: color, text-decoration-line | `a`: none | reboot | `a` with `card-link` (card.html:20); `a` (icon-link.html:11); 2 more | none | covered |
| `icon-link-hover` | `a` with `icon-link` (docs) | `a`: color, text-decoration-line | `a`: none | through `icon-link` | `a` with `icon-link` (icon-link.html:65); `a` with `icon-link link-success link-underline-success link-underline-opacity-25` (icon-link.html:83) | none | covered |

### `img`

The following rows cover the 2 `img` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `img-fluid` | `img` (docs) | `img`: preflight only: display, max-width | `img`: max-width | restore `img:where(.img-fluid)` | `img` with `figure-img rounded` (figures.html:6); `img` with `rounded` (images.html:5); 1 more | none | covered |
| `img-thumbnail` | `img` (docs) | `img`: preflight only: display, max-width | `img`: max-width | no | `img` (images.html:26) | context: the `d-flex` card body blockifies the image, so `display` reads `block` under every face | masked in the showcase: needs a restore row `img:where(.img-thumbnail)`: `display` |

### `initialism`

The following row covers the `initialism` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `initialism` | `abbr` (docs) | none | n/a | no | `abbr` (typography.html:36) | none | not a break: no overridden reboot longhand on `abbr` |

### `input`

The following rows cover the 4 `input` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `input-group` | `div` (docs) | none | n/a | no | `div` (input-group.html:10); `div` with `input-group-sm` (input-group.html:156); 2 more | none | not a break: no overridden reboot longhand on `div` |
| `input-group-lg` | `div` with `input-group` (docs) | none | n/a | no | `div` with `input-group` (input-group.html:164) | none | not a break: no overridden reboot longhand on `div` |
| `input-group-sm` | `div` with `input-group` (docs) | none | n/a | no | `div` with `input-group` (input-group.html:156) | none | not a break: no overridden reboot longhand on `div` |
| `input-group-text` | `span` (docs) | none | n/a | no | `span` (input-group.html:11) | none | not a break: no overridden reboot longhand on `span` |

### `invalid`

The following rows cover the 2 `invalid` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `invalid-feedback` | `div` (docs) | none | n/a | no | `div` (validation.html:23) | none | not a break: no overridden reboot longhand on `div` |
| `invalid-tooltip` | `div` (docs) | none | n/a | no | `div` (validation.html:93) | none | not a break: no overridden reboot longhand on `div` |

### `is`

The following rows cover the 2 `is` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `is-invalid` | `input` with `form-control` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: all | no | `input` with `form-control` (validation.html:48) | none | not a break: the class redeclares |
| `is-valid` | `input` with `form-control` (docs) | `input`: preflight only: color, background-color, padding, border | `input`: all | no | `input` with `form-control` (validation.html:44) | none | not a break: the class redeclares |

### `lead`

The following row covers the `lead` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `lead` | `p` (docs) | `p`: margin-bottom | `p`: none | reboot | `p` (typography.html:32) | none | covered |

### `link`

The following rows cover the 9 `link` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `link-body-emphasis` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (breadcrumb.html:42); `a` with `fw-semibold text-decoration-none` (breadcrumb.html:60) | none | covered |
| `link-danger` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:13) | none | covered |
| `link-dark` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:15) | none | covered |
| `link-info` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:42) | none | covered |
| `link-light` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:44) | none | covered |
| `link-primary` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:10) | none | covered |
| `link-secondary` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:11) | none | covered |
| `link-success` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:12); `a` with `icon-link icon-link-hover link-underline-success link-underline-opacity-25` (icon-link.html:83) | none | covered |
| `link-warning` | `a` (docs) | `a`: color, text-decoration-line | `a`: color | reboot | `a` (colored-links.html:41) | none | covered |

### `list`

The following rows cover the 22 `list` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `list-group` | `ul` (docs); `ol` (docs); `div` (docs) | `ul`: margin-bottom, padding-left; `ol`: margin-bottom, padding-left | `ul`: all; `ol`: all | no | `ul` with `w-100` (list-group.html:7); `div` with `w-100` (list-group.html:90); 9 more | none | not a break: the class redeclares |
| `list-group-flush` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group w-100` (list-group.html:113) | none | not a break: the class redeclares |
| `list-group-horizontal` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group` (list-group.html:226) | none | not a break: the class redeclares |
| `list-group-horizontal-lg` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group` (list-group.html:250) | none | not a break: the class redeclares |
| `list-group-horizontal-md` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group` (list-group.html:242) | none | not a break: the class redeclares |
| `list-group-horizontal-sm` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group` (list-group.html:234) | none | not a break: the class redeclares |
| `list-group-horizontal-xl` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group` (list-group.html:258) | none | not a break: the class redeclares |
| `list-group-horizontal-xxl` | `ul` with `list-group` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `list-group` (list-group.html:266) | none | not a break: the class redeclares |
| `list-group-item-action` | `a` with `list-group-item` (docs); `button` with `list-group-item` (docs) | `a`: color, text-decoration-line; `button`: preflight only: color, background-color, padding, border | `a`: all; `button`: all | no | `a` with `list-group-item active` (list-group.html:91); `a` with `list-group-item` (list-group.html:94); 3 more | none | not a break: the class redeclares |
| `list-group-item` | `li` (docs); `a` (docs); `button` (docs); `label` (docs) | `a`: color, text-decoration-line; `button`: preflight only: color, background-color, padding, border | `a`: all; `button`: all | no | `li` with `d-flex align-items-center gap-2 active` (list-group.html:8); `li` with `d-flex align-items-center gap-2` (list-group.html:24); 16 more | none | not a break: the class redeclares |
| `list-group-item-danger` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:173) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-dark` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:177) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-info` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:175) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-light` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:176) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-primary` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:168) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-secondary` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:169) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-success` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:172) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-item-warning` | `li` with `list-group-item` (docs) | none | n/a | no | `li` with `list-group-item` (list-group.html:174) | none | not a break: no overridden reboot longhand on `li` |
| `list-group-numbered` | `ol` with `list-group` (docs) | `ol`: margin-bottom, padding-left | `ol`: all | no | `ol` with `list-group w-100` (list-group.html:131) | none | not a break: the class redeclares |
| `list-inline` | `ul` (docs) | `ul`: margin-bottom, padding-left | `ul`: padding-left | no | `ul` with `mb-0` (typography.html:114) | `mb-0` zeroes the margin under every face | masked in the showcase: needs a reboot row: `margin-bottom` (F1) |
| `list-inline-item` | `li` (docs) | none | n/a | no | `li` (typography.html:115) | none | not a break: no overridden reboot longhand on `li` |
| `list-unstyled` | `ul` (docs) | `ul`: margin-bottom, padding-left | `ul`: padding-left | reboot | `ul` with `mb-0` (offcanvas.html:68); `ul` with `px-3 py-2 mb-0 small` (position-helpers.html:47); 2 more | none | covered |

### `mark`

The following row covers the `mark` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `mark` | `span` (inferred) | none | n/a | no | `span` (typography.html:33) | none | not a break: no overridden reboot longhand on `span` |

### `modal`

The following rows cover the 20 `modal` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `modal-backdrop` | `div` with `fade show` (docs) | none | n/a | no | `div` with `fade show position-absolute w-100 h-100` (modal.html:201) | none | not a break: no overridden reboot longhand on `div` |
| `modal` | `div` (docs) | none | n/a | no | `div` (live-components.html:233); `div` with `fade` (modal.html:37); 4 more | none | not a break: no overridden reboot longhand on `div` |
| `modal-body` | `div` (docs) | none | n/a | no | `div` (live-components.html:251) | none | not a break: no overridden reboot longhand on `div` |
| `modal-content` | `div` (docs) | none | n/a | no | `div` (live-components.html:241) | none | not a break: no overridden reboot longhand on `div` |
| `modal-dialog` | `div` (docs) | none | n/a | no | `div` with `modal-dialog-centered modal-dialog-scrollable` (live-components.html:240); `div` (modal.html:44); 11 more | none | not a break: no overridden reboot longhand on `div` |
| `modal-dialog-centered` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog modal-dialog-scrollable` (live-components.html:240); `div` with `modal-dialog` (modal.html:117) | none | not a break: no overridden reboot longhand on `div` |
| `modal-dialog-scrollable` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog modal-dialog-centered` (live-components.html:240); `div` with `modal-dialog` (modal.html:144) | none | not a break: no overridden reboot longhand on `div` |
| `modal-footer` | `div` (docs) | none | n/a | no | `div` (live-components.html:281) | none | not a break: no overridden reboot longhand on `div` |
| `modal-fullscreen` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog mw-100 my-2` (modal.html:395) | none | not a break: no overridden reboot longhand on `div` |
| `modal-fullscreen-lg-down` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog mw-100 my-2` (modal.html:416) | none | not a break: no overridden reboot longhand on `div` |
| `modal-fullscreen-md-down` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog mw-100 my-2` (modal.html:409) | none | not a break: no overridden reboot longhand on `div` |
| `modal-fullscreen-sm-down` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog mw-100 my-2` (modal.html:402) | none | not a break: no overridden reboot longhand on `div` |
| `modal-fullscreen-xl-down` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog mw-100 my-2` (modal.html:423) | none | not a break: no overridden reboot longhand on `div` |
| `modal-fullscreen-xxl-down` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog mw-100 my-2` (modal.html:430) | none | not a break: no overridden reboot longhand on `div` |
| `modal-header` | `div` (docs) | none | n/a | no | `div` (live-components.html:242) | none | not a break: no overridden reboot longhand on `div` |
| `modal-lg` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog my-2` (modal.html:359) | none | not a break: no overridden reboot longhand on `div` |
| `modal-sm` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog my-2` (modal.html:352) | none | not a break: no overridden reboot longhand on `div` |
| `modal-static` | `div` with `modal` (docs) | none | n/a | no | `div` with `modal fade show d-block position-relative p-3` (modal.html:247) | none | not a break: no overridden reboot longhand on `div` |
| `modal-title` | `h1` with `fs-5` (docs); `h5` (docs) | `h1`: font-size, font-weight, margin-bottom; `h5`: font-size, font-weight, margin-bottom | `h1`: margin-bottom; `h5`: margin-bottom | reboot | `h4` with `fs-5` (live-components.html:243); `h4` with `fs-6` (modal.html:355); 1 more | `h4.modal-title.fs-5` in `modal.html`; `tailwindcss.html` carries the documented `h1.fs-5` | covered |
| `modal-xl` | `div` with `modal-dialog` (docs) | none | n/a | no | `div` with `modal-dialog my-2` (modal.html:366) | none | not a break: no overridden reboot longhand on `div` |

### `nav`

The following rows cover the 8 `nav` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `nav` | `ul` (docs); `nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav-tabs card-header-tabs` (card.html:199); `ul` with `nav-pills card-header-pills` (card.html:213); 11 more | none | not a break: the class redeclares |
| `nav-fill` | `ul` with `nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav nav-pills` (navs-tabs.html:154) | none | not a break: the class redeclares |
| `nav-item` | `li` (docs) | none | n/a | no | `li` (card.html:200); `li` with `dropdown` (navbar.html:101) | none | not a break: no overridden reboot longhand on `li` |
| `nav-justified` | `ul` with `nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav nav-pills` (navs-tabs.html:161) | none | not a break: the class redeclares |
| `nav-link` | `a` (docs); `button` (docs) | `a`: color, text-decoration-line; `button`: preflight only: color, background-color, padding, border | `a`: all; `button`: all | no | `a` with `active` (card.html:201); `a` (card.html:203); 8 more | none | not a break: the class redeclares |
| `nav-pills` | `ul` with `nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav card-header-pills` (card.html:213); `ul` with `nav` (engine-states.html:7); 5 more | none | not a break: the class redeclares |
| `nav-tabs` | `ul` with `nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav card-header-tabs` (card.html:199); `div` with `nav` (live-components.html:80); 2 more | none | not a break: the class redeclares |
| `nav-underline` | `ul` with `nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `nav` (navs-tabs.html:134) | none | not a break: the class redeclares |

### `navbar`

The following rows cover the 15 `navbar` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `navbar` | `nav` (docs) | none | n/a | no | `nav` with `navbar-expand-lg bg-body-tertiary rounded w-100` (navbar.html:7); `nav` with `bg-body-tertiary rounded w-100` (navbar.html:81); 8 more | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-brand` | `a` (docs); `span` with `mb-0 h1` (docs) | `a`: color, text-decoration-line | `a`: all | no | `a` with `d-flex align-items-center gap-2` (navbar.html:9); `a` (navbar.html:83); 1 more | none | not a break: the class redeclares |
| `navbar-collapse` | `div` (docs) | none | n/a | no | `div` with `collapse` (navbar.html:36); `div` with `collapse show` (navbar.html:95) | none | not a break: no overridden reboot longhand on `div` |
| `navbar-dark` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-dark rounded w-100` (navbar.html:140) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-expand` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-body-tertiary rounded` (navbar.html:190) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-expand-lg` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-body-tertiary rounded w-100` (navbar.html:7); `nav` with `navbar bg-body-tertiary rounded` (navbar.html:271) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-expand-md` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-body-tertiary rounded` (navbar.html:244) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-expand-sm` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-body-tertiary rounded` (navbar.html:217) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-expand-xl` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-body-tertiary rounded` (navbar.html:298) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-expand-xxl` | `nav` with `navbar` (docs) | none | n/a | no | `nav` with `navbar bg-body-tertiary rounded` (navbar.html:325) | none | not a break: no overridden reboot longhand on `nav` |
| `navbar-nav` | `ul` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `me-auto mb-2 mb-lg-0` (navbar.html:37); `ul` with `navbar-nav-scroll` (navbar.html:96); 1 more | none | not a break: the class redeclares |
| `navbar-nav-scroll` | `ul` with `navbar-nav` (docs) | `ul`: margin-bottom, padding-left | `ul`: all | no | `ul` with `navbar-nav` (navbar.html:96) | none | not a break: the class redeclares |
| `navbar-text` | `span` (docs) | none | n/a | no | `span` (navbar.html:116) | none | not a break: no overridden reboot longhand on `span` |
| `navbar-toggler` | `button` (docs) | `button`: preflight only: color, background-color, padding, border | `button`: all | no | `button` (navbar.html:25) | none | not a break: the class redeclares |
| `navbar-toggler-icon` | `span` (docs) | none | n/a | no | `span` (navbar.html:34) | none | not a break: no overridden reboot longhand on `span` |

### `offcanvas`

The following rows cover the 14 `offcanvas` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `offcanvas-backdrop` | `div` with `fade show` (docs) | none | n/a | no | `div` with `fade show position-absolute w-100 h-100` (offcanvas.html:166) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas` | `div` (docs) | none | n/a | no | `div` with `offcanvas-start showing position-absolute w-75` (engine-states.html:135); `div` with `offcanvas-start hiding position-absolute w-75` (engine-states.html:171); 8 more | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-body` | `div` (docs) | none | n/a | no | `div` with `small` (engine-states.html:142); `div` (live-components.html:302) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-bottom` | `div` with `offcanvas` (docs) | none | n/a | no | `div` with `offcanvas` (offcanvas.html:122); `div` with `offcanvas showing h-50 position-absolute` (offcanvas.html:302) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-end` | `div` with `offcanvas` (docs) | none | n/a | no | `div` with `offcanvas` (live-components.html:287); `div` with `offcanvas showing w-75 position-absolute` (offcanvas.html:216) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-header` | `div` (docs) | none | n/a | no | `div` (engine-states.html:139) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-lg` | `div` (docs) | none | n/a | no | `div` with `offcanvas-start` (offcanvas.html:436) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-md` | `div` (docs) | none | n/a | no | `div` with `offcanvas-start` (offcanvas.html:394) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-sm` | `div` (docs) | none | n/a | no | `div` with `offcanvas-start` (offcanvas.html:352) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-start` | `div` with `offcanvas` (docs) | none | n/a | no | `div` with `offcanvas showing position-absolute w-75` (engine-states.html:135); `div` with `offcanvas hiding position-absolute w-75` (engine-states.html:171); 7 more | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-title` | `h5` (docs) | `h5`: font-size, font-weight, margin-bottom | `h5`: margin-bottom | reboot | `h4` with `h5` (engine-states.html:140); `h5` (tailwindcss.html:225) | `h4.offcanvas-title.h5` masks the level; `tailwindcss.html` carries the documented `h5` | covered |
| `offcanvas-top` | `div` with `offcanvas` (docs) | none | n/a | no | `div` with `offcanvas` (offcanvas.html:103); `div` with `offcanvas showing h-50 position-absolute` (offcanvas.html:262) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-xl` | `div` (docs) | none | n/a | no | `div` with `offcanvas-start` (offcanvas.html:478) | none | not a break: no overridden reboot longhand on `div` |
| `offcanvas-xxl` | `div` (docs) | none | n/a | no | `div` with `offcanvas-start` (offcanvas.html:520) | none | not a break: no overridden reboot longhand on `div` |

### Grid offsets (`offset`)

The following rows cover the 71 `offset` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `offset-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-0` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-lg-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-0` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-md-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-0` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-4` | `div` (docs) | none | n/a | no | `div` with `col-sm-8` (form-layout.html:55) | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-sm-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-0` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xl-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-0` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-1` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-10` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-11` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-2` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-3` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-4` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-5` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-6` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-7` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-8` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `offset-xxl-9` | `div` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |

### `page`

The following rows cover the 2 `page` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `page-item` | `li` (docs) | none | n/a | no | `li` with `disabled` (pagination.html:9); `li` with `active` (pagination.html:12); 1 more | none | not a break: no overridden reboot longhand on `li` |
| `page-link` | `a` (docs) | `a`: color, text-decoration-line | `a`: all | no | `a` (pagination.html:10) | none | not a break: the class redeclares |

### `pagination`

The following rows cover the 3 `pagination` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `pagination` | `ul` (docs) | `ul`: margin-bottom, padding-left | `ul`: padding-left | reboot | `ul` with `mb-0` (pagination.html:8); `ul` with `pagination-lg mb-0` (pagination.html:68); 4 more | none | covered |
| `pagination-lg` | `ul` with `pagination` (docs) | `ul`: margin-bottom, padding-left | `ul`: padding-left | through `pagination` | `ul` with `pagination mb-0` (pagination.html:68) | none | covered |
| `pagination-sm` | `ul` with `pagination` (docs) | `ul`: margin-bottom, padding-left | `ul`: padding-left | through `pagination` | `ul` with `pagination mb-0` (pagination.html:77) | none | covered |

### `placeholder`

The following rows cover the 6 `placeholder` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `placeholder` | `span` with `col-6` (docs) | none | n/a | no | `span` with `col-6` (engine-states.html:133); `span` with `col-10` (engine-states.html:133); 12 more | none | not a break: no overridden reboot longhand on `span` |
| `placeholder-glow` | `p` (docs); `h5` with `card-title` (docs) | `p`: margin-bottom; `h5`: font-size, font-weight, margin-bottom | `p`: none; `h5`: margin-bottom | reboot | `p` with `card-title h5` (placeholders.html:9); `p` with `card-text` (placeholders.html:10); 1 more | `p.card-title.h5` replaces the documented `h5.card-title` | covered |
| `placeholder-lg` | `span` with `placeholder col-12` (docs) | none | n/a | no | `span` with `placeholder col-12` (placeholders.html:35) | none | not a break: no overridden reboot longhand on `span` |
| `placeholder-sm` | `span` with `placeholder col-12` (docs) | none | n/a | no | `span` with `placeholder col-12` (placeholders.html:37) | none | not a break: no overridden reboot longhand on `span` |
| `placeholder-wave` | `p` (docs) | `p`: margin-bottom | `p`: none | no | `p` with `mb-0` (placeholders.html:56) | `mb-0` zeroes the margin under every face | masked in the showcase: needs a reboot row: `margin-bottom` |
| `placeholder-xs` | `span` with `placeholder col-12` (docs) | none | n/a | no | `span` with `placeholder col-12` (placeholders.html:38) | none | not a break: no overridden reboot longhand on `span` |

### `popover`

The following rows cover the 4 `popover` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `popover-arrow` | `div` (docs) | none | n/a | no | `div` with `position-absolute start-50 translate-middle-x` (popovers.html:53); `div` with `position-absolute top-50 translate-middle-y` (popovers.html:106) | none | not a break: no overridden reboot longhand on `div` |
| `popover` | `div` (docs) | none | n/a | no | `div` with `fade show bs-popover-top position-relative` (popovers.html:52); `div` with `fade show bs-popover-bottom position-relative` (popovers.html:80); 3 more | none | not a break: no overridden reboot longhand on `div` |
| `popover-body` | `div` (docs) | none | n/a | no | `div` (popovers.html:55) | none | not a break: no overridden reboot longhand on `div` |
| `popover-header` | `h3` (docs) | `h3`: font-size, font-weight, margin-bottom | `h3`: font-size, margin-bottom | reboot | `h4` with `h6` (popovers.html:54) | `h4.popover-header.h6` in `popovers.html`; the engine-built `h3` is read in the open state | covered |

### `progress`

The following rows cover the 5 `progress` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `progress-bar-animated` | `div` with `progress-bar progress-bar-striped` (docs) | none | n/a | no | `div` with `progress-bar progress-bar-striped w-75` (progress.html:173) | none | not a break: no overridden reboot longhand on `div` |
| `progress-bar` | `div` (docs) | none | n/a | no | `div` with `w-25` (progress.html:16); `div` with `w-50` (progress.html:26); 13 more | none | not a break: no overridden reboot longhand on `div` |
| `progress-bar-striped` | `div` with `progress-bar` (docs) | none | n/a | no | `div` with `progress-bar w-25` (progress.html:129); `div` with `progress-bar bg-success w-50` (progress.html:139); 2 more | none | not a break: no overridden reboot longhand on `div` |
| `progress` | `div` (docs) | none | n/a | no | `div` (progress.html:8); `div` with `w-25` (progress.html:190) | none | not a break: no overridden reboot longhand on `div` |
| `progress-stacked` | `div` (docs) | none | n/a | no | `div` with `w-100` (progress.html:189) | none | not a break: no overridden reboot longhand on `div` |

### `ratio`

The following rows cover the 5 `ratio` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ratio-16x9` | `div` with `ratio` (docs) | none | n/a | no | `div` with `ratio bg-body-tertiary rounded w-100` (dropdowns.html:63); `div` with `ratio rounded border overflow-hidden w-100` (engine-states.html:130); 3 more | none | not a break: no overridden reboot longhand on `div` |
| `ratio-1x1` | `div` with `ratio` (docs) | none | n/a | no | `div` with `ratio bg-body-tertiary rounded w-100` (dropdowns.html:274); `div` with `ratio` (ratio.html:7) | none | not a break: no overridden reboot longhand on `div` |
| `ratio-21x9` | `div` with `ratio` (docs) | none | n/a | no | `div` with `ratio w-100 border rounded bg-body-tertiary` (position-utilities.html:9); `div` with `ratio border rounded bg-body-tertiary` (position-utilities.html:40); 4 more | none | not a break: no overridden reboot longhand on `div` |
| `ratio-4x3` | `div` with `ratio` (docs) | none | n/a | no | `div` with `ratio border rounded` (live-components.html:7); `div` with `ratio rounded border bg-body-tertiary overflow-hidden w-100` (modal.html:283); 2 more | none | not a break: no overridden reboot longhand on `div` |
| `ratio` | `div` (docs) | none | n/a | no | `div` with `ratio-16x9 bg-body-tertiary rounded w-100` (dropdowns.html:63); `div` with `ratio-1x1 bg-body-tertiary rounded w-100` (dropdowns.html:274); 15 more | none | not a break: no overridden reboot longhand on `div` |

### Grid rows (`row`)

The following rows cover the 79 `row` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `row` | `div` (docs); `dl` (docs) | `dl`: margin-bottom | `dl`: none | no | `div` with `row-cols-1 row-cols-xl-2 g-4` (accordion.html:1); `div` with `card-body row-cols-1 row-cols-md-2 g-3 m-0` (alerts.html:4); 11 more | no `dl.row` in any section | needs a row: reboot row: `margin-bottom` on the documented `dl` |
| `row-cols-1` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-xl-2 g-4` (accordion.html:1); `div` with `card-body row row-cols-md-2 g-3 m-0` (alerts.html:4); 3 more | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-2` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-sm-4 g-2 w-100` (color-background.html:9); `div` with `row row-cols-md-4 g-3 align-items-start w-100` (ratio.html:5); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-3` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-4` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-5` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-6` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-auto` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-1` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-2` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-3` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-1 row-cols-sm-2 g-3 w-100` (position-helpers.html:80) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-4` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-5` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-6` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-lg-auto` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-1` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-2` | `div` with `row` (docs) | none | n/a | no | `div` with `card-body row row-cols-1 g-3 m-0` (alerts.html:4) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-3` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-4` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-2 g-3 align-items-start w-100` (ratio.html:5) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-5` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-6` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-md-auto` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-1` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-2` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-1 row-cols-lg-3 g-3 w-100` (position-helpers.html:80) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-3` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-4` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-2 g-2 w-100` (color-background.html:9) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-5` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-6` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-sm-auto` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-1` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-1 g-4` (stretched-link.html:1) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-2` | `div` with `row` (docs) | none | n/a | no | `div` with `row row-cols-1 g-4` (accordion.html:1); `div` with `row row-cols-1 g-4 align-items-start` (collapse.html:1) | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-3` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-4` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-5` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-6` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xl-auto` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-1` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-2` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-3` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-4` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-5` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-6` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-cols-xxl-auto` | `div` with `row` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-0` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-1` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-2` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-3` | `div` with `d-grid` (docs) | none | n/a | no | `div` with `card-body d-flex flex-wrap align-content-start align-items-start column-gap-3` (accordion.html:4); `div` with `card-body d-flex flex-wrap align-content-start align-items-center column-gap-3` (button-group.html:27); 1 more | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-4` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-5` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-lg-0` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-lg-1` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-lg-2` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-lg-3` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-lg-4` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-lg-5` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-md-0` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-md-1` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-md-2` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-md-3` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-md-4` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-md-5` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-sm-0` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-sm-1` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-sm-2` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-sm-3` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-sm-4` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-sm-5` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xl-0` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xl-1` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xl-2` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xl-3` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xl-4` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xl-5` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xxl-0` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xxl-1` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xxl-2` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xxl-3` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xxl-4` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |
| `row-gap-xxl-5` | `div` with `d-grid` (docs) | none | n/a | no | absent | none | not a break: no overridden reboot longhand on `div` |

### `small`

The following row covers the `small` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `small` | `span` (inferred) | none | n/a | no | `figcaption` with `card-footer bg-transparent` (accordion.html:80); `div` with `text-bg-primary rounded p-2` (color-background.html:10); 39 more | none | not a break: no overridden reboot longhand on `span` |

### `spinner`

The following rows cover the 4 `spinner` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `spinner-border` | `div` (docs) | none | n/a | no | `div` with `text-primary` (spinners.html:7); `div` with `text-secondary` (spinners.html:10); 8 more | none | not a break: no overridden reboot longhand on `div` |
| `spinner-border-sm` | `span` with `spinner-border` (docs) | none | n/a | no | `div` with `spinner-border` (spinners.html:76); `span` with `spinner-border` (spinners.html:98) | none | not a break: no overridden reboot longhand on `span` |
| `spinner-grow` | `div` (docs) | none | n/a | no | `div` with `text-primary` (spinners.html:41); `div` with `text-secondary` (spinners.html:44); 8 more | none | not a break: no overridden reboot longhand on `div` |
| `spinner-grow-sm` | `span` with `spinner-grow` (docs) | none | n/a | no | `div` with `spinner-grow` (spinners.html:80); `span` with `spinner-grow` (spinners.html:106) | none | not a break: no overridden reboot longhand on `span` |

### `sticky`

The following rows cover the 12 `sticky` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sticky-bottom` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-top px-3 py-2 small` (position-helpers.html:56) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-lg-bottom` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-top px-3 py-2 small` (position-helpers.html:141) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-lg-top` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:128) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-md-bottom` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-top px-3 py-2 small` (position-helpers.html:119) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-md-top` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:106) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-sm-bottom` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-top px-3 py-2 small` (position-helpers.html:97) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-sm-top` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:84) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-top` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:44) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-xl-bottom` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-top px-3 py-2 small` (position-helpers.html:163) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-xl-top` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:150) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-xxl-bottom` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-top px-3 py-2 small` (position-helpers.html:185) | none | not a break: no overridden reboot longhand on `div` |
| `sticky-xxl-top` | `div` (docs) | none | n/a | no | `div` with `bg-body-tertiary border-bottom px-3 py-2 small fw-semibold` (position-helpers.html:172) | none | not a break: no overridden reboot longhand on `div` |

### `stretched`

The following row covers the `stretched-link` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `stretched-link` | `a` (docs) | `a`: color, text-decoration-line | `a`: none | reboot | `a` (stretched-link.html:20) | none | covered |

### `tab`

The following rows cover the 2 `tab` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `tab-content` | `div` (docs) | none | n/a | no | `div` (list-group.html:331); `div` with `mt-3` (list-group.html:408); 2 more | none | not a break: no overridden reboot longhand on `div` |
| `tab-pane` | `div` (docs) | none | n/a | no | `div` with `fade show active` (list-group.html:332); `div` with `fade` (list-group.html:341); 3 more | none | not a break: no overridden reboot longhand on `div` |

### `table`

The following rows cover the 23 `table` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `table-active` | `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: none; `td`: none | scoped `:where(.table) tr`, `td` | `tr` (tables.html:150) | none | covered |
| `table` | `table` (docs) | none | n/a | no | `table` with `caption-top mb-0` (tables.html:5); `table` with `table-striped table-hover table-sm mb-0` (tables.html:46); 5 more | none | not a break: no overridden reboot longhand on `table` |
| `table-bordered` | `table` with `table` (docs) | none | n/a | no | `table` with `table table-striped-columns mb-0` (tables.html:94); `table` with `table table-sm mb-0` (tables.html:239) | none | not a break: no overridden reboot longhand on `table` |
| `table-borderless` | `table` with `table` (docs) | none | n/a | no | `table` with `table mb-0` (tables.html:136) | none | not a break: no overridden reboot longhand on `table` |
| `table-danger` | `table` with `table` (docs); `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: all; `td`: all | no | `tr` (tables.html:198) | none | not a break: the class redeclares |
| `table-dark` | `table` with `table` (docs); `tr` (docs); `td` (docs); `thead` (docs) | `tr`: border-color; `td`: border-color; `thead`: border-color | `tr`: all; `td`: all; `thead`: all | no | `tr` (tables.html:214) | none | not a break: the class redeclares |
| `table-group-divider` | `tbody` (docs) | `tbody`: border-color | `tbody`: none | scoped `:where(.table) tbody` | `tbody` (tables.html:16) | none | covered |
| `table-hover` | `table` with `table` (docs) | none | n/a | no | `table` with `table table-striped table-sm mb-0` (tables.html:46) | none | not a break: no overridden reboot longhand on `table` |
| `table-info` | `table` with `table` (docs); `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: all; `td`: all | no | `tr` (tables.html:206) | none | not a break: the class redeclares |
| `table-light` | `table` with `table` (docs); `tr` (docs); `td` (docs); `thead` (docs) | `tr`: border-color; `td`: border-color; `thead`: border-color | `tr`: all; `td`: all; `thead`: all | no | `tr` (tables.html:210) | none | not a break: the class redeclares |
| `table-primary` | `table` with `table` (docs); `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: all; `td`: all | no | `tr` (tables.html:186) | none | not a break: the class redeclares |
| `table-responsive` | `div` (docs) | none | n/a | no | `div` (tables.html:325) | none | not a break: no overridden reboot longhand on `div` |
| `table-responsive-lg` | `div` (docs) | none | n/a | no | `div` (tables.html:258) | none | not a break: no overridden reboot longhand on `div` |
| `table-responsive-md` | `div` (docs) | none | n/a | no | `div` (tables.html:248) | none | not a break: no overridden reboot longhand on `div` |
| `table-responsive-sm` | `div` (docs) | none | n/a | no | `div` (tables.html:238) | none | not a break: no overridden reboot longhand on `div` |
| `table-responsive-xl` | `div` (docs) | none | n/a | no | `div` (tables.html:268) | none | not a break: no overridden reboot longhand on `div` |
| `table-responsive-xxl` | `div` (docs) | none | n/a | no | `div` (tables.html:278) | none | not a break: no overridden reboot longhand on `div` |
| `table-secondary` | `table` with `table` (docs); `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: all; `td`: all | no | `tr` (tables.html:190) | none | not a break: the class redeclares |
| `table-sm` | `table` with `table` (docs) | none | n/a | no | `table` with `table table-striped table-hover mb-0` (tables.html:46); `table` with `table table-bordered mb-0` (tables.html:239) | none | not a break: no overridden reboot longhand on `table` |
| `table-striped` | `table` with `table` (docs) | none | n/a | no | `table` with `table table-hover table-sm mb-0` (tables.html:46) | none | not a break: no overridden reboot longhand on `table` |
| `table-striped-columns` | `table` with `table` (docs) | none | n/a | no | `table` with `table table-bordered mb-0` (tables.html:94) | none | not a break: no overridden reboot longhand on `table` |
| `table-success` | `table` with `table` (docs); `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: all; `td`: all | no | `tr` (tables.html:194) | none | not a break: the class redeclares |
| `table-warning` | `table` with `table` (docs); `tr` (docs); `td` (docs) | `tr`: border-color; `td`: border-color | `tr`: all; `td`: all | no | `tr` (tables.html:202) | none | not a break: the class redeclares |

### `text`

The following rows cover the 9 `text` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `text-bg-danger` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `position-absolute top-0 start-100 translate-middle badge rounded-pill` (badge.html:30); `span` with `badge` (badge.html:50); 2 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-dark` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:58); `div` with `card w-100` (card.html:54); 1 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-info` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:52); `span` with `badge rounded-pill` (badge.html:76); 3 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-light` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:23); `div` with `border rounded p-2 small` (color-background.html:16); 1 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-primary` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:47); `div` with `rounded p-2 small` (color-background.html:10); 3 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-secondary` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:8); `span` with `badge rounded-pill` (badge.html:75); 3 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-success` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:49); `span` with `badge rounded-pill` (badge.html:72); 1 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-bg-warning` | `span` with `badge` (docs); `div` with `card` (docs) | none | n/a | no | `span` with `badge` (badge.html:51); `span` with `badge rounded-pill` (badge.html:73); 4 more | none | not a break: no overridden reboot longhand on `div`, `span` |
| `text-truncate` | `div` with `col-2` (docs); `span` with `d-inline-block` (docs) | none | n/a | no | `div` with `col-9` (text-truncation.html:10); `span` with `d-inline-block w-75` (text-truncation.html:31) | none | not a break: no overridden reboot longhand on `div`, `span` |

### `toast`

The following rows cover the 4 `toast` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `toast` | `div` (docs) | none | n/a | no | `div` with `mw-100` (live-components.html:49); `div` with `fade show` (toasts.html:7); 3 more | none | not a break: no overridden reboot longhand on `div` |
| `toast-body` | `div` (docs) | none | n/a | no | `div` (live-components.html:67); `div` with `d-flex align-items-center gap-2` (toasts.html:50) | none | not a break: no overridden reboot longhand on `div` |
| `toast-container` | `div` (docs) | none | n/a | no | `div` with `position-static` (toasts.html:90); `div` with `position-fixed bottom-0 end-0 p-3` (toasts.html:168) | none | not a break: no overridden reboot longhand on `div` |
| `toast-header` | `div` (docs) | none | n/a | no | `div` (live-components.html:58); `div` with `gap-2` (toasts.html:8) | none | not a break: no overridden reboot longhand on `div` |

### `tooltip`

The following rows cover the 3 `tooltip` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `tooltip-arrow` | `div` (docs) | none | n/a | no | `div` with `position-absolute start-50 translate-middle-x` (tooltips.html:60); `div` with `position-absolute top-50 translate-middle-y` (tooltips.html:79) | none | not a break: no overridden reboot longhand on `div` |
| `tooltip` | `div` (docs) | none | n/a | no | `div` with `bs-tooltip-top fade show position-relative` (tooltips.html:59); `div` with `bs-tooltip-bottom fade show position-relative` (tooltips.html:69); 3 more | none | not a break: no overridden reboot longhand on `div` |
| `tooltip-inner` | `div` (docs) | none | n/a | no | `div` (tooltips.html:61) | none | not a break: no overridden reboot longhand on `div` |

### `valid`

The following rows cover the 2 `valid` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `valid-feedback` | `div` (docs) | none | n/a | no | `div` (validation.html:19) | none | not a break: no overridden reboot longhand on `div` |
| `valid-tooltip` | `div` (docs) | none | n/a | no | `div` (validation.html:83) | none | not a break: no overridden reboot longhand on `div` |

### `visually`

The following rows cover the 2 `visually` names:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `visually-hidden` | `span` (docs); `h2` (docs) | `h2`: font-size, font-weight, margin-bottom | `h2`: margin-bottom | no | `span` (alerts.html:74) | none | not a break: on `h2` the class clips the element to a 1px box, so size and weight are invisible |
| `visually-hidden-focusable` | `a` (docs); `div` (docs) | `a`: color, text-decoration-line | `a`: none | reboot | `a` (visually-hidden.html:70) | none | covered |

### `vr`

The following row covers the `vr` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `vr` | `div` (docs) | none | n/a | no | `div` (stacks.html:53) | none | not a break: no overridden reboot longhand on `div` |

### `vstack`

The following row covers the `vstack` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `vstack` | `div` (docs) | none | n/a | no | `div` with `gap-3 w-100` (checks-radios.html:188); `div` with `gap-2 w-100` (colored-links.html:9); 3 more | none | not a break: no overridden reboot longhand on `div` |

### `was`

The following row covers the `was-validated` name:

| Class | Documented carrier | Reboot longhands preflight overrides | Redeclared by the class or its companions | Curated at `473edd6` | Showcase carrier and companions | Mask | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `was-validated` | `form` (docs) | none | n/a | no | `form` with `w-100` (validation.html:9) | none | not a break: no overridden reboot longhand on `form` |

## 2. The documented specimens to add

Each specimen is an added figure in the named section file, placed directly after the existing figure it complements, so it replaces no specimen and no title the tests pin. The section census in `tests/app/browser/sections/integration.test.ts` refuses a `style` attribute, so the specimens drop the docs' `style="width: 18rem;"` on cards, and it requires the class `card flex-fill mb-0` on a figure inside `.row > .col.d-flex`. Every specimen uses the following chrome, where `SPECIMEN_ID` is the figure's identifier, `CAPTION_TITLE` its caption title, `CAPTION_CLASSES` the class names its caption lists, and `DOCUMENTED_MARKUP` the fragment that the following subsections give:

```html
<div class="col d-flex">
	<figure id="SPECIMEN_ID" class="card flex-fill mb-0" aria-labelledby="SPECIMEN_ID-title">
		<div
			class="card-body d-flex flex-wrap align-content-start align-items-start row-gap-3 column-gap-3"
		>
			<div class="flex-fill">
				<!-- DOCUMENTED_MARKUP -->
			</div>
		</div>
		<figcaption class="card-footer bg-transparent small">
			<span id="SPECIMEN_ID-title" class="d-block fw-semibold">CAPTION_TITLE</span>
			<code class="text-body-secondary">CAPTION_CLASSES</code>
			<span class="d-block text-body-secondary mt-1"
				>Bootstrap's example markup, with no size class, margin class, or substitute tag.</span
			>
		</figcaption>
	</figure>
</div>
```

The `div.flex-fill` wrapper is the flex item, so the documented markup inside it lays out in normal flow: an image there reads the user agent's `inline` display under `./bootstrap` alone, which the `d-flex` card body otherwise blockifies. The `flex-fill` class is a Bootstrap-only name, so it reads `flex: 1 1 auto` under every face, as the wrapper at `tailwindcss.html:223` does. The caption titles follow the section files' noun-phrase titles and end in "in Bootstrap's markup", which keeps each title distinct from the existing figure beside it. The captions name no reading, so F7's unpinned-caption gap gains no entry and no `TAILWIND_READINGS` row is due.

### S1: alert heading

The specimen goes in `app/browser/sections/alerts.html` after the "Heading and additional content" figure (`alerts-content-title`), with `SPECIMEN_ID` `alerts-documented`, the title "Alert heading in Bootstrap's markup", and the caption classes `alert alert-success alert-heading`. It witnesses `alert-heading` (masked); its bare `p` and `hr` are Tailwind's (§ 3):

```html
<div class="alert alert-success" role="alert">
	<h4 class="alert-heading">Harbor survey filed</h4>
	<p>
		The dive team logged 38 corroded pilings along the east quay and sent the report to the port
		engineer for review.
	</p>
	<hr />
	<p class="mb-0">Repairs on the east quay start after the spring tides.</p>
</div>
```

### S2: card titles

The specimen goes in `app/browser/sections/card.html` after the figure titled by `card-image-title`, with `SPECIMEN_ID` `card-documented-titles`, the title "Card titles in Bootstrap's markup", and the caption classes `card card-body card-title card-subtitle card-text card-link`. It witnesses `card-subtitle` (masked) beside the covered `card-title`, `card-text`, and `card-link` classes; the `mb-2` and `text-body-secondary` classes are the docs' own companions and touch neither size nor weight:

```html
<div class="card">
	<div class="card-body">
		<h5 class="card-title">Lighthouse keeper's log</h5>
		<h6 class="card-subtitle mb-2 text-body-secondary">North point station</h6>
		<p class="card-text">
			The lamp ran for 11 hours on the night of the storm and burned 4 liters of oil.
		</p>
		<a href="#" class="card-link">Open the log</a>
		<a href="#" class="card-link">Print the log</a>
	</div>
</div>
```

### S3: card header heading

The specimen goes in `app/browser/sections/card.html` after the "Header and footer with icons" figure (`card-header-title`), with `SPECIMEN_ID` `card-documented-header`, the title "Card header heading in Bootstrap's markup", and the caption classes `card card-header card-body card-title card-text btn btn-primary`. It witnesses `card-header` on the documented `h5` (needs a row):

```html
<div class="card">
	<h5 class="card-header">Featured route</h5>
	<div class="card-body">
		<h5 class="card-title">Coastal ferry, Lisbon to Porto</h5>
		<p class="card-text">The morning crossing takes 5 hours and calls at 2 ports.</p>
		<a href="#" class="btn btn-primary">See the timetable</a>
	</div>
</div>
```

### S4: dropdown header

The specimen goes in `app/browser/sections/dropdowns.html` after the "Menu content" figure (`dropdowns-content-title`), with `SPECIMEN_ID` `dropdowns-documented-header`, the title "Dropdown header in Bootstrap's markup", and the caption classes `dropdown-menu show position-static dropdown-header dropdown-item`. It witnesses `dropdown-header` on the documented `h6` (masked). The `show` and `position-static` classes are the section's frozen-menu device from `dropdowns.html:7`, and neither declares a font longhand:

```html
<ul class="dropdown-menu show position-static">
	<li><h6 class="dropdown-header">Shipping options</h6></li>
	<li><a class="dropdown-item" href="#">Standard freight</a></li>
	<li><a class="dropdown-item" href="#">Express freight</a></li>
</ul>
```

### S5: display headings

The specimen goes in `app/browser/sections/typography.html` after the "Display headings" figure (`typography-display-title`), with `SPECIMEN_ID` `typography-documented-display`, the title "Display headings in Bootstrap's markup", and the caption classes `display-1 display-2 display-3 display-4 display-5 display-6`. It witnesses `display-6` (masked) and the documented `h1` carrier of the covered `display-1` to `display-5` classes. The six `h1` elements add level-1 headings to the page outline, as `tailwindcss.html:224` already does for `modal-title`; the documented level is the point of the specimen, so keep it:

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>
```

### S6: inline list

The specimen goes in `app/browser/sections/typography.html` after the "Unstyled and inline lists" figure (`typography-lists-title`), with `SPECIMEN_ID` `typography-documented-inline`, the title "Inline list in Bootstrap's markup", and the caption classes `list-inline list-inline-item`. It witnesses `list-inline` (masked):

```html
<ul class="list-inline">
	<li class="list-inline-item">Customs cleared.</li>
	<li class="list-inline-item">Pallets weighed.</li>
	<li class="list-inline-item">Crane booked for berth 3.</li>
</ul>
```

### S7: description list alignment

The specimen goes in `app/browser/sections/typography.html` after S6, with `SPECIMEN_ID` `typography-documented-description`, the title "Description list in Bootstrap's markup", and the caption classes `row col-sm-3 col-sm-9 col-sm-4 col-sm-8 text-truncate`. It witnesses `row` on `dl` and `col-sm-9` and `col-sm-8` on `dd` (needs a row); the `dt` carriers keep the reboot's weight 700, which preflight never declares, and the `p` elements inside a `dd` are Tailwind's:

```html
<dl class="row">
	<dt class="col-sm-3">Vessel</dt>
	<dd class="col-sm-9">A ship that the harbor office registers before it berths.</dd>

	<dt class="col-sm-3">Manifest</dt>
	<dd class="col-sm-9">
		<p>The list of every container on board, with its weight and destination.</p>
		<p>The harbor office keeps each manifest for 7 years.</p>
	</dd>

	<dt class="col-sm-3 text-truncate">Bill of lading for consolidated cargo</dt>
	<dd class="col-sm-9">The receipt a carrier issues for goods that several shippers send together.</dd>

	<dt class="col-sm-3">Berth</dt>
	<dd class="col-sm-9">
		<dl class="row">
			<dt class="col-sm-4">Deep-water berth</dt>
			<dd class="col-sm-8">A berth dredged for vessels that draw more than 12 meters.</dd>
		</dl>
	</dd>
</dl>
```

### S8: figure

The specimen goes in `app/browser/sections/figures.html` after the "Figure with a caption" figure (`figures-start-title`), with `SPECIMEN_ID` `figures-documented`, the title "Figure in Bootstrap's markup", and the caption classes `figure figure-img img-fluid rounded figure-caption`. It witnesses `figure` (masked) beside the covered `figure-img` and `img-fluid` classes:

```html
<figure class="figure">
	<img
		src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='280' viewBox='0 0 480 280'%3E%3Crect width='480' height='280' fill='%23e2e3e5'/%3E%3Crect y='200' width='480' height='80' fill='%230aa2c0'/%3E%3Crect x='60' y='160' width='110' height='40' fill='%23dc3545'/%3E%3Crect x='220' y='110' width='200' height='90' fill='%23495057'/%3E%3C/svg%3E"
		class="figure-img img-fluid rounded"
		alt="Illustration of a red tugboat beside a gray container ship"
	/>
	<figcaption class="figure-caption">Tug assist at berth 2, morning shift.</figcaption>
</figure>
```

### S9: placeholder animations

The specimen goes in `app/browser/sections/placeholders.html` after the "Glow and wave" figure (`placeholders-animation-title`), with `SPECIMEN_ID` `placeholders-documented-animation`, the title "Placeholder animations in Bootstrap's markup", the caption classes `placeholder placeholder-glow placeholder-wave col-12`, and `aria-hidden="true"` on the `div.flex-fill` wrapper, as the existing animation specimen carries it. It witnesses `placeholder-wave` (masked) beside the covered `placeholder-glow` class:

```html
<p class="placeholder-glow">
	<span class="placeholder col-12"></span>
</p>
<p class="placeholder-wave">
	<span class="placeholder col-12"></span>
</p>
```

### S10: image thumbnail

The specimen goes in `app/browser/sections/images.html` after the "Image thumbnails" figure (`images-thumbnail-title`), with `SPECIMEN_ID` `images-documented-thumbnail`, the title "Image thumbnail in Bootstrap's markup", and the caption classes `img-thumbnail`. It witnesses `img-thumbnail` in normal flow (masked); the documented markup carries no `width` or `height` attribute, so the SVG's own 200 px size applies:

```html
<img
	src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e9ecef'/%3E%3Ccircle cx='100' cy='82' r='38' fill='%236c757d'/%3E%3Cpath d='M32 200 C32 150 64 130 100 130 C136 130 168 150 168 200Z' fill='%236c757d'/%3E%3C/svg%3E"
	class="img-thumbnail"
	alt="Gray silhouette of a harbor pilot"
/>
```

### S11: navbar text with a link

The specimen goes in `app/browser/sections/navbar.html` after the figure titled by `navbar-open-title`, which holds the section's only `navbar-text` element (`navbar.html:116`), with `SPECIMEN_ID` `navbar-documented-text`, the title "Navbar text with a link", and the caption classes `navbar bg-body-tertiary container-fluid navbar-text`. It witnesses the `scoped` row that § 3 rules for `.navbar-text a`. The docs' navbar text example holds no link, so this markup is inferred from the Sass rule `.navbar-text a { color: var(--bs-navbar-active-color) }`:

```html
<nav class="navbar bg-body-tertiary">
	<div class="container-fluid">
		<span class="navbar-text">Signed in as <a href="#">Ines Duarte</a></span>
	</div>
</nav>
```

### Rows the fixed point is expected to derive

Rerunning the fixed point (probe-4) over S1 to S11 is expected to derive the following 13 rows, which take the curation table from 46 rows to 59; the fold (sheet-3) takes the rows probe-4 reads, not this list:

| Form | Class or selector | Longhands | Specimen |
| --- | --- | --- | --- |
| `reboot` | `alert-heading` | `font-size`, `font-weight`, `margin-bottom` | S1 |
| `reboot` | `card-subtitle` | `font-weight` | S2 |
| `reboot` | `card-header` | `font-size`, `font-weight` | S3 |
| `reboot` | `dropdown-header` | `font-weight` | S4 |
| `reboot` | `display-6` | `margin-bottom` | S5 |
| `reboot` | `list-inline` | `margin-bottom` | S6 |
| `reboot` | `row` | `margin-bottom` | S7 |
| `reboot` | `col-sm-9` | `margin-bottom` | S7 |
| `reboot` | `col-sm-8` | `margin-bottom` | S7 |
| `reboot` | `figure` | `margin-bottom` | S8 |
| `reboot` | `placeholder-wave` | `margin-bottom` | S9 |
| `restore` | `img:where(.img-thumbnail)` | `display` | S10 |
| `scoped` | `:where(.navbar-text) a` | `text-decoration-line`, `text-decoration-color` | S11 |

The `margin-bottom` rows also move `margin-block-end`, as the existing margin rows list both. The `scoped` row copies the reboot's `a` color as well, and the component's own `.navbar-text a` rule at (0,1,1) beats that copy at (0,0,1), so the link keeps the navbar's active color and regains only the underline.

## 3. The bare-descendant question

A `scoped` row is warranted only where the element is a component element by R5, because a lifted-sheet rule reaches it through a selector whose earlier compound names a component class, and the component's own rendering depends on the reboot declaration that preflight overrides, as the `.table` cells' borders depend on the reboot's `border-color: inherit`. Content spacing and content typography inside a component belong to the consumer's utilities, because R1 gives every other bare element to Tailwind. The following table rules each container whose documented markup holds bare elements; the readings are cascade readings at 1280 px, Bootstrap only against the recipe:

| Container | Bare elements in the documented markup | Departure under the recipe | Component element by R5 | Scoped row | Reason |
| --- | --- | --- | --- | --- | --- |
| `.card-body` | `p`; `small` inside `p.card-text` ("Last updated" lines); `p` inside `blockquote.blockquote.mb-0` | `p` `margin-bottom` 16px against 0px; `small` `font-size` 0.875em against 80% | No | Not warranted | `.card-body` declares padding and color and nothing on its content; the documented paragraph class `card-text` carries the curated margin. |
| `.alert` | `p` and `hr` in the additional-content example | `p` `margin-bottom` 16px against 0px; `hr` `margin-top` and `margin-bottom` 16px against 0px | No | Not warranted | `.alert` declares padding, border, and colors, and its heading and link rules; the `hr` keeps its 1px top border, inherited color, and 0.25 opacity under both faces, so only spacing moves, and the copy document's ruling 2.9 already spaces the Tailwind section's alert paragraphs with `mb-2`. |
| `.modal-body` | `p` | `margin-bottom` 16px against 0px | No | Not warranted | `.modal-body` declares padding and flex growth; paragraph spacing is content. |
| `.carousel-caption` | `h5` and `p` | `h5` 20px, 500, 8px against 16px, 400, 0px; `p` `margin-bottom` 16px against 0px | No | Not warranted | `.carousel-caption` declares position, padding, color, and alignment, all of which hold; the heading size is content typography, and the guide's path for a Bootstrap size on a bare heading is the `h5` class. |
| `.toast-header` | `img.rounded.me-2`, `strong.me-auto`, `small` | `small` `font-size` 12.25px against 11.2px in the 14px toast; the image is a flex item and reads `block` under both; `strong` reads `bolder` under both | No | Not warranted | `.toast-header` declares flex layout, padding, color, background, and border, and nothing on its children. |
| `.toast-body` | Text and utility-carrying `div` elements | None | No | Not warranted | No bare element with a reboot declaration. |
| `.accordion-body` | `strong` and `code` | `code` `font-size` 0.875em against 1em and the monospace stack against Tailwind's; its color holds | No | Not warranted | `.accordion-body` declares padding only; inline code is content typography. |
| `.popover-body` | Text set through the plugin's `content` option | None in the documented examples | No | Not warranted | No bare element in the documented content. |
| `.list-group-item` | `h5.mb-1`, `p.mb-1`, and `small` in the custom-content example | `h5` 20px, 500 against 16px, 400; `small` 0.875em against 80% | No | Not warranted | The item declares padding, border, and colors; the docs already space its content with utilities. |
| `.table` cells (`thead`, `tbody`, `tfoot`, `tr`, `th`, `td`) | Every row group, row, and cell | `border-color` `inherit` against `currentColor` from preflight's `border: 0 solid` | Yes, through `.table > :not(caption) > * > *` | Warranted; the 6 rows exist | The component's own `border-bottom-width` rule draws in the color that the reboot's `border-color: inherit` chain carries down from `.table`. |
| `.table` `caption` (`<table class="table caption-top"><caption>`) | `caption` | `padding-top` and `padding-bottom` 8px against 0px; color and alignment hold | No: `:not(caption)` excludes it | Not warranted | `.table` and `.caption-top` declare nothing on the caption but its side; the padding is spacing. |
| `.breadcrumb-item` | `a` | `color` link blue against the item's color, `text-decoration-line` `underline` against `none` | No: no lifted rule names a breadcrumb class before `a` | Not warranted | The breadcrumb draws its flex row, `::before` divider, and active color without styling the link; your path is a curated `link-*` class or Tailwind's color and underline utilities. |
| `.list-unstyled` | A nested `ul` | `list-style-type` `disc` against `none`, `padding-left` 32px against 0px | No | Not warranted | `.list-unstyled` styles only its own element; the docs state that nested lists keep their own style, which under R1 is preflight's. |
| `blockquote.blockquote` | The wrapping `figure` and the inner `p` | `figure` `margin-bottom` 16px against 0px; the last `p` reads 0px under both through `.blockquote > :last-child` | No for the `figure` | Not warranted | The wrapper is bare by the docs' own markup; spacing is content. |
| `.dropdown-menu` | `p` in the text-menu example | `margin-bottom` 16px against 0px | No | Not warranted | The menu declares padding and its item rules; the docs close the text with `mb-0`. |
| `.offcanvas-body` | `p` and `div` | `p` `margin-bottom` 16px against 0px | No | Not warranted | `.offcanvas-body` declares padding and overflow only. |
| A bare heading holding `.badge` | `h1` to `h6` around `span.badge` | The badge's `font-size: 0.75em` follows the bare `h1`: 30px against 12px | The badge is; its departure is `inherited` | Not warranted | R5 attributes the badge's size to the departing bare ancestor, which R1 gives to Tailwind. |
| `.navbar-text` | `a` (inferred from the Sass) | `text-decoration-line` `underline` against `none`, with its `text-decoration-color` | Yes, through `.navbar-text a` | Warranted: `:where(.navbar-text) a` | The component's own rule colors this link, so the link belongs to the component's rendering, and only the reboot's underline is lost; specimen S11. |
| `.card` | A direct-child `hr` (inferred from the Sass) | `margin-top` and `margin-bottom` 16px against 0px | Yes, through `.card > hr` | Not warranted; a residual | No documented markup carries it, and the `:where(.card) hr` form reaches every descendant `hr`, including a bare one in `.card-body` that R1 gives to Tailwind; the fixed point reads no specimen of it. |
| `.navbar-brand` | `img` in the image-only brand | `display` `inline` against `block` | No | Not warranted | The brand declares padding, size, and color, not its image; the documented image-and-text brand pairs the image with `d-inline-block`, a Bootstrap-only utility that holds under every face. |
| `.visually-hidden-focusable` | `a` inside the container example | On focus, `color` and `text-decoration-line` read the parent's and `none` | Only while unfocused, through `:not(:focus):not(:focus-within) *`, which declares `overflow` | Not warranted | In the visible, focused state no component rule reaches the link. |
| A bare `fieldset` | `legend` in the disabled-form example | `margin-bottom` 8px against 0px | No | Not warranted | The legend is bare; the documented horizontal form gives its `legend` the `col-form-label` class, which declares `margin-bottom: 0`. |

The brief's containers rule as follows: `.card-body p`, `.alert p`, `.modal-body p`, `.carousel-caption h5` and `p`, `.toast-body`, `.accordion-body p`, `.popover-body`, and `.list-group-item` text are not warranted; the `.table` cells are warranted and exist. One added row is warranted: `:where(.navbar-text) a`.

## 4. Counts

The following table counts the 608 `CLASS_NAMES.bootstrap.components` names by verdict, from the generated table of § 1:

| Verdict | Classes | Members |
| --- | --- | --- |
| `covered` | 53 | 40 by their own row (30 `reboot`, 10 `restore`); 13 through a companion or `scoped` row: the 8 `focus-ring-*` modifiers through `focus-ring`, `icon-link-hover` through `icon-link`, `pagination-lg` and `pagination-sm` through `pagination`, `table-active` through the `tr` and `td` scoped rows, `table-group-divider` through the `tbody` scoped row |
| `needs a row` | 4 | `card-header`, `row`, `col-sm-8`, `col-sm-9` |
| `masked in the showcase` | 8 | `alert-heading`, `card-subtitle`, `dropdown-header`, `display-6`, `figure`, `list-inline`, `placeholder-wave`, `img-thumbnail` |
| `not a break` | 543 | Every other name |

The corpus adds 11 specimens: S1 to S10 for the 12 `needs a row` and `masked` classes (S7 carries 3 of them), and S11 for the `scoped` row of § 3. Probe-4 is expected to derive 13 rows from them (11 `reboot`, 1 `restore`, 1 `scoped`).

## Orchestrator rulings on the corpus (2026-10-04)

- **`row` on `dl` and `col-sm-*` on `dd`: no row.** The grid's look does not depend on the `dd` margin; R1 gives the bare `dd` to Tailwind, and the consumer adds `mb-2`. The same holds for a column class on any other reboot-styled tag. The description-list specimen S7 stays in the corpus as a documented specimen that shows the departure, captioned as such.
- **`card-header` on `h5`, `placeholder-wave`, `img-thumbnail`, and F1's six: rows as the corpus expects**, confirmed by probe-4's measurement, not by this ruling.
- **`.navbar-text a`:** probe-4 decides from the measurement (the reboot's underline against preflight's `inherit`); a scoped row `:where(.navbar-text) a` is accepted if the fixed point derives it.
- **`display-6` on `h1`:** the documented carrier; S5's six `h1` elements stay, following the precedent at `tailwindcss.html:224`.
- **`.card > hr`:** left as a residual; no documented markup carries it.
- **`accordion-header` on `h2`:** gains a documented specimen beside the existing one.
