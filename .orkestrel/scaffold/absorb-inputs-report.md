## Question

Which input affordances do the listed apps actually render for each `form` `FieldControl`, and which Bootstrap recipe (and ladder rung) does each use?

## Evidence

| Control | Affordance | Site | Recipe | States handled | Rung | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| text | text | `taverna/app/browser/components/EntityField.vue:225` | `input.form-control` plus read-mode `bg-transparent border-secondary border-opacity-10 shadow-none` or `is-invalid`; `:type` is `text` when readonly else `field.control`; sibling `label.form-label.small.fw-medium.text-body-secondary.d-block` and `div.invalid-feedback.d-block` | readonly, locked, invalid, required (`span.text-danger.ms-1` `*`), empty (`—`) | 4 | utility combo stands in for missing `border-transparent`; `form-control-plaintext` is avoided |
| text | email | `taverna/app/browser/components/AuthView.vue:98` | `input.form-control[type=email]` under `label.form-label` | required, pending (submit `disabled`) | 1 | `form` maps email to `text` plus `{ email: true }` |
| text | search | `mailbox/app/browser/pages/FormPage.vue:67` | `input.form-control[type=search]` | placeholder | 1 | catalog-only; no `pattern` rule |
| text | combobox | `taverna/app/browser/components/CommandBar.vue:446` | `div.input-group` > `input.form-control[type=text][role=combobox]` + `ul#command-bar-listbox.dropdown-menu.d-block.w-100.mt-1.shadow[role=listbox]` | placeholder, empty | 2 | `d-block` instead of Bootstrap `show` |
| text | input-group | `taverna/app/browser/components/content/IdentityContent.vue:232` | `div.input-group.input-group-sm` > `input.form-control[type=text]` | disabled, pending | 1 | inline rename |
| text | floating | `mailbox/app/browser/pages/FormPage.vue:355` | `div.form-floating` > `input.form-control[type=email]` + `label` | placeholder | 1 | Bootstrap floating-label structure |
| text | plaintext | `mailbox/app/browser/pages/FormPage.vue:95` | `input.form-control-plaintext[type=text][readonly]` | readonly | 1 | the chrome EntityField refuses |
| text | flush | `mailbox/app/browser/pages/FormPage.vue:479` | `input.form-control.form-control-flush[type=text]` | readonly | 4 | custom `.form-control-flush` |
| text | fill | `mailbox/app/browser/pages/FormPage.vue:598` | `input.form-control.form-control-fill[type=text]` inside `div.card` with `style="border-radius: 12px; overflow: hidden; padding: 0"` | placeholder | 4 | custom `.form-control-fill` plus host `style` |
| text | disabled | `taverna/app/browser/components/EntityForm.vue:290` | `input.form-control[type=text][disabled]` | disabled, placeholder (`Select a type first`) | 1 | morph `_id` until `_type` is set |
| text | help | `mailbox/app/browser/pages/FormPage.vue:48` | `input.form-control[type=text]` + sibling `div.form-text` | help, placeholder | 1 | no `form-text` in taverna/terrain/lloyds components |
| editor | textarea | `taverna/app/browser/components/EntityField.vue:128` | `textarea.form-control` `rows="3"` plus the same readChrome / `is-invalid` as text | readonly, locked, invalid, required, empty | 4 | taverna's `FieldControl` names this `textarea`, not `editor` |
| editor | composer | `taverna/app/browser/components/content/ChatContent.vue:209` | `textarea.form-control` `rows="1"` | placeholder | 1 | send button disabled when empty |
| editor | floating | `mailbox/app/browser/pages/FormPage.vue:372` | `div.form-floating` > `textarea.form-control` `style="height: 6rem"` | placeholder | 4 | height via `style` |
| password | password | `taverna/app/browser/components/AuthView.vue:110` | `input.form-control[type=password]` | required, pending | 1 | also `mailbox/app/browser/pages/FormPage.vue:63`; no `mask`; none in terrain/lloyds |
| number | number | `taverna/app/browser/components/EntityField.vue:225` | same `input.form-control` as text with `:type` `number` | readonly, locked, invalid, required, empty | 4 | readChrome hack |
| number | inline-cell | `terrain/app/browser/components/BuildingTable.vue:542` | `input.form-control.form-control-sm.border-0.focus-ring.shadow-none.bg-transparent.font-monospace.px-0[type=number]` | placeholder (ZIP at `:569`) | 4 | utility combo as flush; lloyds twin adds `style="width: 3.25rem"` at `lloyds/app/browser/components/BuildingTable.vue:426` |
| number | input-group | `terrain/app/browser/components/BuildingTable.vue:873` | `div.input-group.input-group-sm` > `span.input-group-text` + `input.form-control.font-monospace.text-end[type=number]` + `is-invalid` | invalid, placeholder | 2 | insurance-limit dollars |
| number | range | `mailbox/app/browser/pages/FormPage.vue:270` | `input.form-range[type=range]` `min="0"` `max="100"` | none beyond native | 1 | `form` maps range to `number` + min/max/step; also `RangeSliderPage.vue:40` |
| number | range (dual) | `mailbox/app/browser/pages/RangeSliderPage.vue:79` | `div.range-slider` + `div.range-slider-track` + `div.range-slider-range` `:style left/right %` + `button.range-slider-thumb` plus paired `input.form-range` | disabled (`.range-slider-thumb.disabled` at `:186`) | 4 | custom thumbs; tint uses `--bs-range-slider-*` inline at `:145` |
| number | fill | `mailbox/app/browser/pages/FormPage.vue:625` | `input.form-control.form-control-fill[type=number]` in `td.table-cell-frame` | none | 4 | custom fill + `.table-cell-frame` |
| date | date | `taverna/app/browser/components/EntityField.vue:212` | `input.form-control[type=date]` plus readChrome / `is-invalid` | readonly, locked, invalid, required | 4 | epoch stored, `YYYY-MM-DD` displayed |
| date | picker | `mailbox/app/browser/pages/DatePickerPage.vue:59` | `div.date-picker` > `div.date-picker-header` + `div.date-picker-grid` > `button.date-cell` (`.today` `.active` `.in-range` `.range-start` `.range-end` `.muted` `.disabled`) | disabled | 4 | no native `type=date` on this page; week-numbers grid sets `style="--bs-date-picker-width: auto"` at `:229` |
| time | picker | `mailbox/app/browser/pages/TimePickerPage.vue:72` | `div.time-picker` > `input.form-control` `inputmode="numeric"` `maxlength="2"` + `span.time-picker-sep` (`:`); 12-hour adds `div.btn-group.btn-group-sm` `btn-outline-secondary` | none native | 4 | no `type="time"` in listed files; tokens `--bs-time-picker-*` |
| datetime | unrendered | search `datetime-local` and `type="datetime"` over `taverna/app/browser`, `terrain/app/browser`, `lloyds/app/browser`, and the nine mailbox pages named in Evidence | — | — | — | zero hits |
| color | color | `mailbox/app/browser/pages/FormPage.vue:289` | `input.form-control.form-control-color[type=color]` | none | 1 | no color control in taverna/terrain/lloyds |
| confirm | switch | `taverna/app/browser/components/EntityField.vue:195` | `div.form-check.form-switch` > `input.form-check-input[type=checkbox][role=switch]` + `is-invalid` | locked, disabled, invalid, required | 1 | taverna names this `checkbox` but it holds `'true'`/`'false'` (form `confirm`); also `FormPage.vue:206` |
| confirm | checkbox | `mailbox/app/browser/pages/FormPage.vue:180` | `div.form-check` > `input.form-check-input[type=checkbox]` + `label.form-check-label`; inline variant `form-check form-check-inline` | disabled | 1 | also `terrain/app/browser/components/QuickReference.vue:92`, `UseDialogPage.vue:265` |
| select | select | `taverna/app/browser/components/EntityField.vue:141` | `select.form-select` plus readChrome / `is-invalid`; `option[disabled]` | locked, disabled, pending, invalid, required | 4 | native select cannot be `readonly`, so locked uses `disabled` |
| select | segmented | `taverna/app/browser/components/EntityField.vue:168` | `div.btn-group.w-100[role=radiogroup]` > `input.btn-check[type=radio][autocomplete=off]` + `label.btn.btn-outline-secondary` | locked, disabled, pending, invalid, required | 2 | `w-100` forces the group onto its own row |
| select | radio | `mailbox/app/browser/pages/FormPage.vue:222` | `div.form-check` > `input.form-check-input[type=radio]` + `label.form-check-label` | none | 1 | form maps a radio group to `select` |
| select | datalist | `mailbox/app/browser/pages/FormPage.vue:301` | `input.form-control[list=dl-browsers]` + `datalist#dl-browsers` > `option` | placeholder | 1 | form maps this to `select` with `open` |
| select | combobox | `taverna/app/browser/components/EntityPicker.vue:182` | `div.input-group` > `input.form-control[type=text][role=combobox]` + `ul.dropdown-menu.show.w-100.shadow[role=listbox]` > `button.dropdown-item`; empty `dropdown-item-text.text-secondary.small` | invalid, placeholder, empty | 2 | APG combobox over `dropdown-menu show`; MemberPicker twin at `MemberPicker.vue:179`; wired from `EntityContentEdit.vue:38` / `EntityForm.vue:273` |
| select | flush | `mailbox/app/browser/pages/FormPage.vue:486` | `select.form-select.form-select-flush` | none | 4 | custom `.form-select-flush` |
| select | fill | `mailbox/app/browser/pages/FormPage.vue:628` | `select.form-select.form-select-fill` | none | 4 | custom `.form-select-fill` |
| select | floating | `mailbox/app/browser/pages/FormPage.vue:361` | `div.form-floating` > `select.form-select` + `label` | none | 1 | — |
| checkbox | unrendered | search `type="checkbox"` with a shared `name` or list-valued `v-model` over the Evidence files | — | — | — | hits are lone confirms, row-select chrome, or independent catalog boxes; no multi-choice group holding `readonly string[]` |
| file | file | `mailbox/app/browser/pages/FormPage.vue:285` | `input.form-control[type=file]` | none | 1 | visible Bootstrap file control |
| file | dropzone | `mailbox/app/browser/pages/UploadPage.vue:50` | `div.dropzone` > `input[type=file].hidden` + `label.upload-zone` (`.upload-zone-icon` `.upload-zone-text` `.upload-zone-link` `.upload-zone-hint`) | disabled (`:149`), invalid (`aria-invalid` + `div.invalid-feedback.block` at `:156`), help (hint) | 4 | Tailwind `.hidden` not `d-none`; error tints `--bs-dropzone-border-color` |
| file | hidden-picker | `terrain/app/browser/components/Toolbar.vue:118` | `input[type=file].d-none` `:accept="CSV_ACCEPT"` | none | 2 | also `CSVDropZone.vue:53` and lloyds `Toolbar.vue:55` / `CSVDropZone.vue:38`; drop surface is `section.card` with `border-primary bg-primary-subtle` when over |
| beyond-form | segmented (view) | `terrain/app/browser/components/CarrierResults.vue:549` | `div.btn-group.btn-group-sm` > `input.btn-check[type=radio]` + `label.btn.btn-outline-secondary` | none | 1 | cards/table preference, not a form field |
| beyond-form | checkbox (row-select) | `terrain/app/browser/components/BuildingTable.vue:505` | `label.d-inline-flex.p-2.m-0` > `input.form-check-input.fs-5.m-1[type=checkbox]` | none | 2 | lloyds paints it `form-check-input-danger` at `lloyds/app/browser/components/BuildingTable.vue:339` |
| beyond-form | rating | `mailbox/app/browser/pages/RatingPage.vue:148` | `div.rating.rating-interactive.rating-lg[role=slider]` > `i.rating-star.bi.bi-star-fill.active` | readonly (static `.rating` without `-interactive` at `:53`) | 4 | `--bs-rating-*` |
| beyond-form | tag | `mailbox/app/browser/pages/TagPage.vue:140` | `div.tag-group` > `button.tag.tag-interactive.border-0` (`tag-solid-primary` / `tag-secondary`); removable `span.tag.tag-success` > `button.tag-remove` at `:165` | empty (`All tags removed`) | 4 | `--bs-tag-*`; no text field to add tags |
| beyond-form | stepper | `mailbox/app/browser/pages/StepperPage.vue:55` | `ul.stepper` > `li.stepper-item` (`.active` `.completed`) > `div.stepper-dot` + `div.stepper-label` | disabled (Back/Next buttons) | 4 | `--bs-stepper-*`; indicator, not a field |
| beyond-form | output | `mailbox/app/browser/pages/FormPage.vue:131` | `input.form-control[type=number]` `style="inline-size: 5rem"` + `<output>` | none | 4 | width via `style`; copy documents `--bs-output-*` |

`form/` ships no `src/browser` (guide: binding belongs in a future `src/browser`; nothing renders there yet). Files named under Evidence that render no form control: `CreateDialog.vue` (hosts `EntityForm`), `ConfirmDialog.vue`, `EmptyState.vue`, `LifecycleStrip.vue`, `ContentStatus.vue`, `WorksheetPanel.vue`, `SchedulePanel.vue`, `AuditPanel.vue`, `ToastHost.vue`, and `guides/*.vue` in terrain and lloyds.

## Distillate

- Canonical edit recipe is top `label.form-label` plus `form-control` / `form-select` / `form-check`, with `is-invalid` and `invalid-feedback d-block`; required is a `text-danger` star, not `aria-required`.
- Combobox recipe is `input.form-control[role=combobox]` over `dropdown-menu` (`show` in Entity/MemberPicker, `d-block` in CommandBar).
- Segmented recipe is `btn-group` + `btn-check` + `btn-outline-secondary` (EntityField enums; CarrierResults view toggle).
- Recurring hack: keep edit box-model in read/inline cells via `bg-transparent border-0|border-opacity-10 shadow-none` instead of `form-control-plaintext` (EntityField `readChrome`; terrain/lloyds table cells).
- Recurring hack: hide `input[type=file]` (`d-none` or Tailwind `hidden`) and drive it from a button, card, or `.dropzone` / `.upload-zone`.
- mailbox extends the ladder with custom classes tokenized as `--bs-*`: `form-control-flush`/`fill`, `time-picker`, `date-picker`/`date-cell`, `dropzone`/`upload-zone`, `rating`, `tag`, `stepper`, `range-slider`.
- lloyds custom `.form-check-input-danger` in `lloyds/app/browser/styles/main.scss` (checked/indeterminate/focus via `--bs-danger` and `--bs-form-check-bg-image`).
- Nobody renders `datetime` (`datetime-local`). Nobody renders form `checkbox` as a multi-choice group. Nobody renders native `type="time"`; time exists only as mailbox `.time-picker` text segments. `color` and `password` exist only in mailbox FormPage plus taverna AuthView (password).
- Rung-four sweep `style="` over `taverna/app/browser`, `terrain/app/browser`, `lloyds/app/browser`: three hits, all `lloyds/app/browser/components/BuildingTable.vue` lines 431, 443, 457 (`width: 3.25rem` / `4.75rem`). Same sweep on taverna and terrain: no hits.
- Rung-four sweep `<style` over the same three trees: no hits (no SFC `<style>` blocks).
- `form/` has no browser renderer. EntityField does not render `help` / `placeholder` / a distinct `disabled` vs `locked` (locked is `readonly` or `disabled`; pending disables selects).

## Unknowns

- Whether mailbox FormPage’s independent `v-model` checkboxes (`checkA` / `checkB`) were meant to count as form `checkbox` (they are not one list-valued field).
- Whether mailbox Tailwind `hidden` / `grid` / `flex` classes sit on the Bootstrap ladder or beside it.
- Whether EntityPicker’s free-typed combobox should be typed as form `select`+`open` or as `text` (it stores one id, admits search, does not admit an off-list submit the way `SelectField.open` does).
- No native `type="time"` / `type="datetime-local"` / `type="color"` in taverna, terrain, or lloyds; color exists only in the mailbox catalog.

## Deviation

none
