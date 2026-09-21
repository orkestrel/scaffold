<!-- CL4 scout, grok route (Cursor Grok 4.6, read-only), brief units/cl4-scout-brief.md over the Veneer tree at 9f5ffda, journal tmp/cursor/cl4-scout.jsonl (swept at acceptance), session de23266f-f8fd-4044-8fa6-b31213439d06, 2026-09-21. Distillate returned untouched by the driver. -->

## 1. Reboot inventory selectors

| Selector | Family | Owner | Guard verdict | Official properties | `_reboot.scss` line |
| --- | --- | --- | --- | --- | --- |
| `*` | universal | unclear | bare tag | box-sizing | 16 |
| `*::before` | universal | unclear | bare tag | box-sizing | 17 |
| `*::after` | universal | unclear | bare tag | box-sizing | 18 |
| `body` | body | CL3 | bare tag | margin, font-family, font-size, font-weight, line-height, color, text-align, background-color, -webkit-text-size-adjust, -webkit-tap-highlight-color | 49 |
| `hr` | hr | CL3 | bare tag | margin, color, border, border-top, opacity | 68 |
| `h6` | heading | CL3 | bare tag | margin-top, margin-bottom, font-weight, line-height, color | 118 |
| `h5` | heading | CL3 | bare tag | margin-top, margin-bottom, font-weight, line-height, color | 113 |
| `h4` | heading | CL3 | bare tag | margin-top, margin-bottom, font-weight, line-height, color | 108 |
| `h3` | heading | CL3 | bare tag | margin-top, margin-bottom, font-weight, line-height, color | 103 |
| `h2` | heading | CL3 | bare tag | margin-top, margin-bottom, font-weight, line-height, color | 98 |
| `h1` | heading | CL3 | bare tag | margin-top, margin-bottom, font-weight, line-height, color; font-size | 93 |
| `p` | p | CL3 | bare tag | margin-top, margin-bottom | 129 |
| `abbr[title]` | abbr | CL3 | bare tag | -webkit-text-decoration, text-decoration, cursor, -webkit-text-decoration-skip-ink, text-decoration-skip-ink | 141 |
| `address` | address | CL3 | bare tag | margin-bottom, font-style, line-height | 150 |
| `ol` | ol | CL3 | bare tag | padding-left; margin-top, margin-bottom | 159, 164 |
| `ul` | ul | CL3 | bare tag | padding-left; margin-top, margin-bottom | 160, 165 |
| `dl` | dl | CL3 | bare tag | margin-top, margin-bottom | 166 |
| `ol ol` | ol | exclusion candidate | refused | margin-bottom | 171 |
| `ul ul` | ul | exclusion candidate | refused | margin-bottom | 172 |
| `ol ul` | ol | exclusion candidate | refused | margin-bottom | 173 |
| `ul ol` | ul | exclusion candidate | refused | margin-bottom | 174 |
| `dt` | dl | CL3 | bare tag | font-weight | 178 |
| `dd` | dl | CL3 | bare tag | margin-bottom, margin-left | 184 |
| `blockquote` | blockquote | CL3 | bare tag | margin | 192 |
| `b` | strong | CL3 (see unclear) | bare tag | font-weight | 201 |
| `strong` | strong | CL3 | bare tag | font-weight | 202 |
| `small` | small | CL3 | bare tag | font-size | 211 |
| `mark` | mark | CL3 | bare tag | padding, color, background-color | 217 |
| `sub` | sub | CL3 | bare tag | position, font-size, line-height, vertical-align, bottom | 230, 238 |
| `sup` | sup | CL3 | bare tag | position, font-size, line-height, vertical-align, top | 231, 239 |
| `a`, `a:hover`, `a:not([href]):not([class])`, `a:not([href]):not([class]):hover` | a | CL3 | bare tag | color, text-decoration, --bs-link-color-rgb | 244, 248, 259, 261 |
| `pre` | pre | CL3 | bare tag | font-family, font-size; display, margin-top, margin-bottom, overflow | 270, 282 |
| `pre code` | pre | exclusion candidate | refused | font-size, color, word-break | 291 |
| `code` | code | CL3 | bare tag | font-family, font-size; font-size, color, word-wrap | 271, 298 |
| `a > code` | code | exclusion candidate | refused | color | 304 |
| `kbd` | kbd | CL3 | bare tag | font-family, font-size; padding, color, background-color, border-radius | 272, 309 |
| `kbd kbd` | kbd | exclusion candidate | refused | padding, font-size | 316 |
| `samp` | samp | CL3 | bare tag | font-family, font-size | 273 |
| `figure` | figure | CL4 | bare tag | margin | 328 |
| `img` | img | CL4 | bare tag | vertical-align | 335 |
| `svg` | svg | CL4 | bare tag | vertical-align | 336 |
| `table`, `caption`, `thead`, `tbody`, `tfoot` | table | CL4 | bare tag | caption-side, border-collapse; padding-top/bottom, color, text-align; border-color/style/width | 345, 350, 367-369 |
| `th`, `tr`, `td` | tr | CL4 | bare tag | text-align; border-color/style/width | 361, 370-372 |
| `label` | label | CL4 | bare tag | display | 383 |
| `button` (and `:focus:not(:focus-visible)`, `-webkit-appearance`, `:not(:disabled)`), `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]` (and `:not(:disabled)` twins) | button | CL4 | bare tag | border-radius, outline, margin/font, text-transform, cursor, -webkit-appearance | 390-459 |
| `input`, `[list]:not(...)::-webkit-calendar-picker-indicator`, `::-webkit-datetime-edit-*` set, `::-webkit-inner-spin-button`, `[type=search]`, `[type=search]::-webkit-search-cancel-button`, `::-webkit-search-decoration`, `::-webkit-color-swatch-wrapper`, `::-webkit-file-upload-button`/`::file-selector-button` | input | CL4 | bare tag | margin/font; display; padding; height; -webkit-appearance/outline-offset; cursor/filter; padding; font/-webkit-appearance | 406-575 |
| `select`, `select:disabled` | select | CL4 | bare tag | margin/font, text-transform, word-wrap, opacity | 408-435 |
| `optgroup` | optgroup | CL4 | bare tag | margin/font | 409 |
| `textarea` | textarea | CL4 | bare tag | margin/font; resize | 410, 474 |
| `fieldset` | fieldset | CL4 | bare tag | min-width, padding, margin, border | 485 |
| `legend`, `legend + *` | fieldset | CL4 (legend); exclusion candidate (`legend + *`) | bare tag (both) | float/width/padding/margin-bottom/line-height/font-size; clear | 497, 504, 506 |
| `::-moz-focus-inner` | button | exclusion candidate | bare tag | padding, border-style | 467 |
| `output` | output | CL4 | bare tag | display | 582 |
| `iframe` | iframe | CL4 | bare tag | border | 588 |
| `summary` | details | CL4 | bare tag | display, cursor | 596 |
| `progress` | progress | CL4 | bare tag | vertical-align | 606 |
| `[hidden]` | hidden | unclear | bare tag | display | 615 |

No `reboot` inventory selector is a mandated-pair selector — the fixture never writes `table caption`, `fieldset legend`, `details summary`, `tr td`, or `tr th` as combinator strings.

## 2. CL4 families and implied `src/styles/elements/` partials

- **figure** → `_figure.scss` (`figcaption` folds in by `figure/figcaption`, no fixture selector for it): `figure`
- **img** → `_img.scss`: `img`
- **svg** → `_svg.scss`: `svg`
- **table** → `_table.scss` (`caption`, `thead`, `tbody`, `tfoot` fold in; `colgroup` mandated with no fixture selector): `table`, `caption`, `thead`, `tbody`, `tfoot`
- **tr** → `_tr.scss` (`td`, `th` fold in by `tr/td`, `tr/th`): `th`, `tr`, `td`
- **label** → `_label.scss`: `label`
- **button** → `_button.scss`: `button`, `button:focus:not(:focus-visible)`, `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]`, the `:not(:disabled)` twins
- **input** → `_input.scss`: `input`, the calendar/datetime-edit/spin/search/color/file pseudo-elements and their attribute selectors
- **select** → `_select.scss` (`option` folds in by `select/option`, no fixture selector): `select`, `select:disabled`
- **optgroup** → `_optgroup.scss` (`option` also folds in by `optgroup/option`): `optgroup`
- **textarea** → `_textarea.scss`: `textarea`
- **fieldset** → `_fieldset.scss` (`legend` folds in by `fieldset/legend`): `fieldset`, `legend`
- **output** → `_output.scss`: `output`
- **iframe** → `_iframe.scss`: `iframe`
- **details** → `_details.scss` (`summary` folds in by `details/summary`, no fixture selector for `details` itself): `summary`
- **progress** → `_progress.scss`: `progress`

## 3. Exclusion candidates and unclear ownership

**Exclusion candidates:** `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd` (each already excluded by the planner report `:101` and refused by `matchesLooseTagPair` — descendant/child tag pairs not in `MANDATED_TAG_PAIRS`); `legend + *` (excluded by planner `:101`; the guard admits it because `extractSelectorCompounds` drops the bare `*`, leaving only `legend`); `::-moz-focus-inner` (excluded by planner `:102`, Gecko-only vendor pseudo-element; the guard admits it since it names no tag pair).

**Unclear ownership:**
- `*`, `*::before`, `*::after` — not a CL3 text tag, not a CL4 tag family, not refused; Grok's read places these with `_reset.scss` per CL3's scope, not an `elements/` partial.
- `[hidden]` — same shape, also placed with `_reset.scss` per CL3's scope.
- `b` — grouped with `strong` at `_reboot.scss:201-204`, but CL3's named tag list (per `cl3-brief-2.md`) does not list `b`, only `_strong.scss`.
- The attribute-only/vendor-pseudo selectors under button and input name no bare tag, so the brief's "one bare tag per file" rule does not directly assign them a file; Grok folded them into `button`/`input` by family.
- `optgroup` vs `select` both mandate `option` (`optgroup/option` and `select/option`); the fixture has no `option` selector, so which parent later owns an `option` row is unset.

## 4. Journal

- Path: `tmp/cursor/cl4-scout.jsonl` (`.err` at `tmp/cursor/cl4-scout.err`, empty)
- Session id: `de23266f-f8fd-4044-8fa6-b31213439d06`
