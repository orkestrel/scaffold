# E-IDENTITY terrain — Cursor Grok distillate

Grok session `02301506-d94f-4a10-a891-7e4b27ae0dcf`, journal `tmp/cursor/e-identity-terrain.jsonl` (launch record), brief `e-identity-terrain-brief.md`, read at Veneer `main` `b1d314d` in `/home/user/veneer-read`.

## Table stripe

Bootstrap sets `$table-striped-bg-factor: .05` and `$table-striped-bg: rgba(var(--bs-emphasis-color-rgb), $table-striped-bg-factor)` (`node_modules/bootstrap/scss/_variables.scss:745-746`). The compiled `.table` value is `rgba(var(--bs-emphasis-color-rgb), 0.05)` (`node_modules/bootstrap/dist/css/bootstrap.css:1872`). Each role class compiles to a fixed color (`bootstrap.css:1946` and the role rules that follow).

Veneer sets `.table` `--bs-table-striped-bg` to `rgba(var(--bs-emphasis-color-rgb), var(--vn-state-stripe))` (`src/styles/components/_table.scss:15`). Each role class mixes `var(--bs-table-color)` at `var(--vn-state-stripe)` into `var(--bs-table-bg)` (`src/styles/components/_table.scss:117-121`). The light map and the dark map each store `'state-stripe': 5%` (`src/styles/_tokens.scss:26`, `src/styles/_tokens.scss:90`). `theme-tokens` writes `--vn-state-stripe` (`src/styles/_mixins.scss:405`) on `:root` (`src/styles/_tokens.scss:490`) and on `[data-bs-theme]` (`src/styles/_theme.scss:18-21`).

Elements sets `--set-table-row-striped-background-color` to `color-mix(in srgb, var(--set-table-border-color) 12%, transparent)` (`/home/user/elements/src/styles/elements/_table.scss:50-54`) and paints it from `table.striped` (`/home/user/elements/src/styles/elements/_table.scss:286-287`).

| Property | Bootstrap | Veneer | Elements | Citations |
| --- | --- | --- | --- | --- |
| Baseline stripe | `rgba(var(--bs-emphasis-color-rgb), 0.05)` | `rgba(var(--bs-emphasis-color-rgb), var(--vn-state-stripe))` with the token at `5%` | `color-mix(in srgb, var(--set-table-border-color) 12%, transparent)` | `bootstrap.css:1872`; `_table.scss:15`; `_tokens.scss:26`; elements `_table.scss:50-54` |
| Role stripe | Fixed hex, primary `#c5d7f2` | `color-mix(in srgb, var(--bs-table-color) var(--vn-state-stripe), var(--bs-table-bg))` | The same `12%` mix on `table.striped` | `guides/veneer.md:9388`; `_table.scss:117-121`; elements `_table.scss:286-287` |

Guide rows that state a stripe value: the token row `guides/veneer.md:7058` (`5%`), the baseline row `guides/veneer.md:9384`, and the role rows `guides/veneer.md:9388`, `guides/veneer.md:9397`, `guides/veneer.md:9406`, `guides/veneer.md:9415`, `guides/veneer.md:9424`, `guides/veneer.md:9433`, `guides/veneer.md:9442`, `guides/veneer.md:9451`.

Departure recorded: yes (`guides/veneer.md:7058`, `guides/veneer.md:9384`)
Pinned by: `tests/src/styles/components/table.test.ts:157` (`rgba(..., 0.05)`); the retune proof expects alpha `0.25` after setting the token to `25%` (`tests/src/styles/components/table.test.ts:207-215`)
Elements: `12%` mix of the table border color (`/home/user/elements/src/styles/elements/_table.scss:50-54`)

## `dl`, `dt`, `dd`

| Property | Bootstrap | Veneer | Elements | Citations |
| --- | --- | --- | --- | --- |
| `dl` margin | `margin-top: 0`; `margin-bottom: 1rem` on `ol, ul, dl` | `margin: 0` | No margin | `bootstrap.css:293-297`; `_dl.scss:3`; elements `_dl.scss:42-45` |
| `dl` layout | No grid | `display: grid`; `grid-template-columns: 1fr 2fr`; `gap: var(--vn-space-4) var(--vn-space-8)` | One column `minmax(0, 1fr)`; at `640px`, `minmax(0, 1fr) minmax(0, 2fr)`; row gap `0.5rem`, column gap `1rem` | `_dl.scss:4-6`; elements `_dl.scss:39-45`, `elements/_dl.scss:74-75` |
| `dt` weight | `700` | `var(--vn-weight-heading)` (`600` at `src/styles/_tokens.scss:404`) | `600` | `bootstrap.css:307-308`; `_dl.scss:8-9`; elements `_dt.scss:13-16` |
| `dd` margin | `margin-bottom: 0.5rem`; `margin-left: 0` | `margin: 0` | `margin-inline-start: 0` | `bootstrap.css:311-313`; `_dl.scss:11-12`; elements `_dd.scss:15` |
| `dd` color | None | `var(--vn-text-muted)` | `var(--color-text-muted, currentColor)` | `_dl.scss:13`; elements `_dd.scss:12-14` |

Elements also sets `min-width: 0` and `overflow-wrap: anywhere` on `dl > dt` and `dl > dd` (`/home/user/elements/src/styles/elements/_dl.scss:47-50`).

Departure recorded: yes (`guides/veneer.md:9259-9263`, `guides/veneer.md:9896-9901`)
Pinned by: `tests/src/styles/elements/dl.test.ts:20-32` via `TEXT_DL_CASES` (`tests/setupStyles.ts:1320-1325`): margin `0px`, grid, columns `168px 336px`, gap `8px 16px`, `dt` weight `600`, `dd` margin `0px`
Elements: grid gaps `0.5rem` / `1rem` and `dt` weight `600` (`/home/user/elements/src/styles/elements/_dl.scss:39-40`, `/home/user/elements/src/styles/elements/_dt.scss:13`)

## `blockquote`

`src/styles/elements/_blockquote.scss` styles the element. The `.blockquote` class lives in `src/styles/components/_quote.scss`.

| Property | Bootstrap | Veneer | Elements | Citations |
| --- | --- | --- | --- | --- |
| `blockquote` margin | `0 0 1rem` | `0 0 var(--vn-space-8)` | `margin-block-end: 1rem` | `bootstrap.css:316-317`; `_blockquote.scss:3`; elements `_blockquote.scss:20-24` |
| Bar and inset | None | `padding-left: var(--vn-space-8)`; `border-left: var(--vn-space-2) solid currentColor` | `padding-inline-start: 1rem`; `border-inline-start: 0.25rem solid` the variant color or `currentColor` | `_blockquote.scss:4-5`; elements `_blockquote.scss:17-23` |
| `font-style` | None on the element | `italic` | `italic` | `_blockquote.scss:6`; elements `_blockquote.scss:25` |
| `.blockquote` | `margin-bottom: 1rem`; `font-size: 1.25rem` | `margin-bottom: var(--vn-space-8)`; `font-size: var(--vn-size-5)` | None | `bootstrap.css:695-697`; `_quote.scss:2-4` |
| `.blockquote-footer` | `margin-top: -1rem`; `margin-bottom: 1rem`; `color: #6c757d`; `font-size: 0.875em` | `margin-top: calc(var(--vn-space-8) * -1)`; `margin-bottom: var(--vn-space-8)`; `color: var(--vn-gray-600)`; `font-size: 0.875em` | None | `bootstrap.css:703-707`; `_quote.scss:11-15` |

Departure recorded: yes (`guides/veneer.md:9264`, `guides/veneer.md:9902-9904`, `guides/veneer.md:7263-7267`)
Pinned by: `tests/src/styles/elements/blockquote.test.ts:20-24` via `TEXT_BLOCKQUOTE_CASES` (`tests/setupStyles.ts:1274-1278`): margin `0px 0px 16px`, padding-left `16px`, border-left `4px solid`, `italic`
Elements: italic, `1rem` end margin, `1rem` inline-start padding, `0.25rem` bar (`/home/user/elements/src/styles/elements/_blockquote.scss:18-25`)

## `code`, `pre`, `kbd`, `samp`

Bootstrap’s group rule sets `font-family: var(--bs-font-monospace)` and `font-size: 1em` (`bootstrap.css:364-369`). `--bs-font-monospace` is `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`bootstrap.css:75`). `pre`, `code`, and `kbd` then set `font-size: 0.875em`. `samp` keeps `1em`.

Veneer’s `code-text` mixin writes `font-family: ui-monospace, var(--vn-font-mono-base)`, `color: var(--vn-text-code)`, and a default size of `90%` with padding `0.125em 0.25em` (`src/styles/_mixins.scss:92-97`). `--vn-text-code` is `var(--vn-text-body-base)` (`src/styles/_mixins.scss:428`). `code-surface` writes `background-color: var(--vn-surface-code)` and `border-radius: var(--vn-radius-small)` (`src/styles/_mixins.scss:106-108`). `--vn-surface-code` is `color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)` (`src/styles/_tokens.scss:63`).

| Property | Bootstrap | Veneer | Elements | Citations |
| --- | --- | --- | --- | --- |
| `code` size, color, wrap | `0.875em`; `var(--bs-code-color)`; `word-wrap: break-word` | `90%`; `var(--vn-text-code)`; `overflow-wrap: break-word`; padding `0.125em 0.25em`; surface and radius from `code-surface` | `0.9em`; `currentColor`; padding `0.125em` / `0.25em`; background `color-mix(in oklab, currentColor 12%, transparent)`; radius `0.25em` | `bootstrap.css:385-388`; `_code.scss:5-7`; elements `_code.scss:28-43` |
| `pre` | `display: block`; `margin-top: 0`; `margin-bottom: 1rem`; `overflow: auto`; `font-size: 0.875em` | `display: block`; `margin: 0`; `overflow: auto`; size `87.5%`; padding `var(--vn-space-7) var(--vn-space-8)`; `line-height: var(--vn-line-code)`; raised surface; `1px` border; `var(--vn-radius-base)` | `0.875em`; `line-height: 1.6`; padding `0.875rem` / `1rem`; raised surface; `1px` border; `var(--radius-lg)`; `overflow-x: auto` | `bootstrap.css:372-377`; `_pre.scss:5-12`; elements `_pre.scss:18-35` |
| `kbd` | Padding `0.1875rem 0.375rem`; `0.875em`; color `var(--bs-body-bg)`; background `var(--bs-body-color)`; radius `0.25rem` | Size `87.5%`; padding `0.0625em 0.375em`; code color and code surface; border `var(--vn-border-width) solid color-mix(in oklab, var(--vn-text-code) 22%, transparent)` | `0.875em`; padding `0.0625em` / `0.375em`; `currentColor`; background mix `12%`; border `1px solid` mix `22%`; radius `0.25em` | `bootstrap.css:394-399`; `_kbd.scss:5-7`; elements `_kbd.scss:12-31` |
| `samp` | Group font only; size stays `1em` | `90%`; code font and color; padding `0.125em 0.25em`; `background-color: var(--vn-surface-raised)` | `0.9em`; `currentColor`; padding `0.125em` / `0.25em`; `var(--color-surface-raised)`; radius `0.25em` | `bootstrap.css:364-369`; `_samp.scss:5-6`; elements `_samp.scss:11-23` |

The guide excludes `pre code`, `a > code`, and `kbd kbd` (`guides/veneer.md:6623-6625`). Bootstrap still writes those rules (`node_modules/bootstrap/scss/_reboot.scss:291-295`, `304-306`, `316-320`). Veneer’s partials do not.

Departure recorded: yes (`guides/veneer.md:9274-9292`, `guides/veneer.md:9907-9921`)
Pinned by: `tests/src/styles/elements/code.test.ts:20-31`, `pre.test.ts:20-32`, `kbd.test.ts:20-32`, `samp.test.ts:20-30`, with the readings in `TEXT_CODE_CASES`, `TEXT_PRE_CASES`, `TEXT_KBD_CASES`, and `TEXT_SAMP_CASES` (`tests/setupStyles.ts:1290-1304`, `1442-1456`, `1368-1386`, `1466-1475`)
Elements: code `0.9em` and a `12%` `currentColor` chip (`/home/user/elements/src/styles/elements/_code.scss:32-39`); `pre` `0.875em` on the raised surface (`/home/user/elements/src/styles/elements/_pre.scss:19-34`); `kbd` `0.875em` with a `22%` border (`/home/user/elements/src/styles/elements/_kbd.scss:18-31`); `samp` `0.9em` on the raised surface (`/home/user/elements/src/styles/elements/_samp.scss:16-23`)

## `hr`

| Property | Bootstrap | Veneer | Elements | Citations |
| --- | --- | --- | --- | --- |
| `margin` | `1rem 0` | `0` from `box-reset` | None | `bootstrap.css:209-210`; `_hr.scss:5-6`; `_mixins.scss:76-79` |
| `color` | `inherit` | `inherit` | `--set-hr-color: var(--set-variant-background-color, currentColor)` | `bootstrap.css:211`; `_hr.scss:6`; elements `_hr.scss:18` |
| `border` | `0` | `0` | `0` | `bootstrap.css:212`; `_mixins.scss:79`; elements `_hr.scss:21` |
| Top edge | `var(--bs-border-width) solid` | `var(--vn-border-width) solid currentColor` (`--vn-border-width` is `1px`) | `border-block-start: 1px solid var(--set-hr-color)` | `bootstrap.css:213`; `_hr.scss:8`; `_tokens.scss:417`; elements `_hr.scss:22` |
| `opacity` | `0.25` | `0.2` | `0.2` | `bootstrap.css:214`; `_hr.scss:9`; elements `_hr.scss:19-23` |

Departure recorded: yes (`guides/veneer.md:9211-9213`)
Pinned by: `tests/src/styles/elements/hr.test.ts:18-23` via `TEXT_HR_CASES` (`tests/setupStyles.ts:1349-1356`): margin `0px`, top border `1px solid`, other sides `0px`, opacity `0.2`
Elements: opacity `0.2` and a `1px` block-start edge (`/home/user/elements/src/styles/elements/_hr.scss:19-23`)

## `.btn-check`

| Property | Bootstrap | Veneer | Elements | Citations |
| --- | --- | --- | --- | --- |
| `position` | `absolute` | `absolute` | None | `bootstrap.css:2490-2493`; `_button.scss:127-128` |
| Clip | `clip: rect(0, 0, 0, 0)` | `clip-path: inset(50%)` | None | `bootstrap.css:2492`; `_button.scss:131` |
| Size and overflow | None | `width: 1px`; `height: 1px`; `overflow: hidden`; `white-space: nowrap` | None | `_button.scss:129-133` |
| `pointer-events` | `none` | `none` | None | `bootstrap.css:2493`; `_button.scss:134` |

Elements’ `button` rule and its components barrel do not select `.btn-check` (`/home/user/elements/src/styles/elements/_button.scss:28`, `/home/user/elements/src/styles/components/index.scss:12-29`).

Departure recorded: yes (`guides/veneer.md:7280`, `guides/veneer.md:9998-10002`)
Pinned by: `tests/src/styles/components/button.test.ts:363` (`clip-path` `inset(50%)`)
Elements: none
