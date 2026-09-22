# B-FORMS terrain report (Cursor Grok 4.7, `grok-4.7-high`)

Session `35a6066e-5638-4681-8c63-e3974e90e433`, journal `tmp/cursor/b-forms-terrain.jsonl` (swept at acceptance). Brief: `.orkestrel/veneer/units/b-forms-terrain-brief.md`.

I'll absorb the B-FORMS terrain read-only and return cited evidence only. First I'll confirm the Veneer tree is clean, then read the oracle inventory shape and the shipped-component pattern.The shell tool was rejected on every attempt, so `git -C /home/user/veneer status --porcelain` was not captured. This pass used only read tools.

## A. Oracle surface

`tests/fixtures/oracle/inventory.json` is version `5.3.8` (`inventory.json:2`). `readOracleInventory` keeps each component's selector strings and the keys of its `properties` object (`tests/setupServer.ts:970`).

One component object has `selectors`, `declarations`, `properties`, `keyframes`, `media`, and `rtl` (`inventory.json:9`, `inventory.json:279`, `inventory.json:501`, `inventory.json:583`, `inventory.json:599`, `inventory.json:600`). A selector entry is `selector`, `declarations` of `property`/`value`, optional `condition`, plus `classes`, `elements`, `attributes`, `pseudoClasses`, `pseudoElements` (`inventory.json:11`, `inventory.json:19354`). A flat `declarations` row is `selector`, `property`, `value` (`inventory.json:23261`). A `properties` entry maps a `--bs-*` name to `{selector, value}` rows (`inventory.json:25822`). An `rtl` row is `selector`, `property`, `ltr`, `rtl` (`inventory.json:25901`). `counts` records selector, declaration, property, keyframe, and media figures per key (`inventory.json:114181`).

`_forms.scss` imports `labels`, `form-text`, `form-control`, `form-select`, `form-check`, `form-range`, `floating-labels`, `input-group`, `validation` (`node_modules/bootstrap/scss/_forms.scss:1`). `_maps.scss` has no `form-` match. Every B-FORMS key has `"keyframes": []` and `"media": []` (for example `inventory.json:25897`). At-rules on these keys are only `@media (prefers-reduced-motion: reduce)`, emitted by `@mixin transition` when `$enable-reduced-motion` is on (`mixins/_transition.scss:21`). `$color-mode-type: data` makes `@mixin color-mode` emit `[data-bs-theme="#{$mode}"]` (`_variables.scss:388`, `mixins/_color-mode.scss:16`). Those dark rules are stored on the `theme` key, not on the form keys: `[data-bs-theme=dark] .form-select` (`inventory.json:2648`) and `[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)` (`inventory.json:2662`).

**Custom properties the form keys declare**

| Key | `--bs-*` on that key |
| --- | --- |
| `form` | `--bs-form-select-bg-img`, `--bs-form-check-bg`, `--bs-form-check-bg-image`, `--bs-form-switch-bg`, `--bs-form-select-bg-icon` (`inventory.json:25822`) |
| `form-control` | none (`inventory.json:28794`) |
| `form-select` | `--bs-form-select-bg-img`, `--bs-form-select-bg-icon` (`inventory.json:30315`) |
| `form-check` | `--bs-form-check-bg`, `--bs-form-check-bg-image`, `--bs-form-switch-bg` (`inventory.json:31609`) |
| `form-range`, `form-floating`, `input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`, `invalid-tooltip` | none (`inventory.json:38920`, `inventory.json:40209`, `inventory.json:41588`, `inventory.json:45277`) |
| `was-validated`, `is-valid`, `is-invalid` | `--bs-form-select-bg-icon` only (`inventory.json:46719`, `inventory.json:47245`, `inventory.json:47740`) |

`--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, and `--bs-form-invalid-border-color` are on `:root` in the `theme` key (`inventory.json:1876`, `_root.scss:125`), with dark overrides at `_root.scss:181`.

**SVG data URIs and the variable each comes from.** `$enable-validation-icons: true` (`_variables.scss:382`). Compiled fill/stroke is baked into the URI.

| Icon | Variable | Compiled URI sits at |
| --- | --- | --- |
| Check | `$form-check-input-checked-bg-image` (`_variables.scss:959`), stroke `$form-check-input-checked-color` | `inventory.json:20587` |
| Radio | `$form-check-radio-checked-bg-image` (`_variables.scss:960`) | `inventory.json:20601` |
| Indeterminate | `$form-check-input-indeterminate-bg-image` (`_variables.scss:965`) | `inventory.json:20623` |
| Switch off | `$form-switch-bg-image` (`_variables.scss:978`), fill `$form-switch-color` | `inventory.json:20709` |
| Switch focus | `$form-switch-focus-bg-image` (`_variables.scss:983`) | `inventory.json:20762` |
| Switch on | `$form-switch-checked-bg-image` (`_variables.scss:986`) | `inventory.json:20780` |
| Select caret | `$form-select-indicator` (`_variables.scss:1015`), stroke `$form-select-indicator-color` | `inventory.json:20084` |
| Select caret, dark | `$form-select-indicator-dark` (`_variables-dark.scss:65`) | `inventory.json:2652` |
| Switch off, dark | `$form-switch-bg-image-dark` (`_variables-dark.scss:68`) | `inventory.json:2666` |
| Valid mark | `$form-feedback-icon-valid` (`_variables.scss:1094`) | `inventory.json:22179` |
| Invalid mark | `$form-feedback-icon-invalid` (`_variables.scss:1096`) | `inventory.json:22725` |

Source hooks: `.form-select` sets `--bs-form-select-bg-img` from `escape-svg($form-select-indicator)` (`forms/_form-select.scss:7`); dark retunes it inside `color-mode(dark)` (`forms/_form-select.scss:75`). Checks and the switch set `--bs-form-check-bg-image` and `--bs-form-switch-bg` the same way (`forms/_form-check.scss:74`, `forms/_form-check.scss:128`, `forms/_form-check.scss:185`). Validation icons enter through `@mixin form-validation-state` as `background-image: escape-svg($icon)` on `.form-control` and as `--bs-form-select-bg-icon` on `.form-select` (`mixins/_forms.scss:64`, `mixins/_forms.scss:99`).

**`rtl` rows. Excluded.** Each row's fields are `selector`, `property`, `ltr`, `rtl` (`inventory.json:25901`).

- `form` (`inventory.json:25899`): `.form-select` padding and `background-position`; `.form-check .form-check-input` `float`; `.form-check-reverse` padding and `text-align`; `.form-check-reverse .form-check-input` `float` and margins; `.form-switch .form-check-input` and `:checked` `background-position`; `.form-switch.form-check-reverse` padding; its input's margins; `.form-floating > label` `transform-origin`; five floating `~ label` `transform` rows; valid and invalid `background-position` on `.form-control`, `textarea.form-control`, and the two `.form-select` size forms (`inventory.json:25901` through `inventory.json:26117`).
- `form-control` (`inventory.json:28797`): the floating `transform` rows and the valid/invalid control `background-position` rows (`inventory.json:28802`).
- `form-select` (`inventory.json:30358`): padding, `background-position`, floating `transform`, and the valid/invalid select `background-position` rows (`inventory.json:30363`).
- `form-check` (`inventory.json:31646`): the check, reverse, and switch rows (`inventory.json:31648`).
- `form-floating` (`inventory.json:40212`): `transform-origin` and the five `transform` rows (`inventory.json:40217`).
- `was-validated`, `is-valid`, `is-invalid`: the valid or invalid `background-position` rows only (`inventory.json:46742`, `inventory.json:47264`, `inventory.json:47759`).
- `form-range`, `input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`, `invalid-tooltip`: `"rtl": []` (`inventory.json:38923`, `inventory.json:41591`, `inventory.json:45280`).

**At-rule conditions on selector entries**, all `@media (prefers-reduced-motion: reduce)`: `.form-control` (`inventory.json:19354`), both file-button rules (`inventory.json:19635`, `inventory.json:19650`), `.form-select` (`inventory.json:20173`), `.form-switch .form-check-input` (`inventory.json:20750`), both range thumbs (`inventory.json:20999`, `inventory.json:21116`), `.form-floating > label` (`inventory.json:21379`). The same conditions repeat on `form-control` (`inventory.json:26204`), `form-select` (`inventory.json:28968`), `form-check` (`inventory.json:30835`), `form-range` (`inventory.json:38434`), and `form-floating` (`inventory.json:39089`). No condition in `input-group` or the validation keys.

**Selectors.** The `form` key's `selectors` array is the compiled forms cascade from `.form-label` through the invalid input-group rules (`inventory.json:19241` to `inventory.json:23245`). Later keys repeat the subset whose `classes` include that key. Selectors below are that array; the owning key's array opens at the line in parentheses.

`form` (`inventory.json:19239`): `.form-label` (`19241`), `.form-text` (`19255`), `.form-control` (`19277`, reduced-motion twin `19347`), `.form-control[type=file]` (`19362`), `.form-control[type=file]:not(:disabled):not([readonly])` (`19376`), `.form-control:focus` (`19390`), `.form-control::-webkit-date-and-time-value` (`19420`), `.form-control::-webkit-datetime-edit` (`19442`), `.form-control::placeholder` (`19460`), `.form-control:disabled` (`19478`), `.form-control::-webkit-file-upload-button` (`19496`, reduced-motion twin `19624`), `.form-control::file-selector-button` (`19562`, reduced-motion twin `19643`), hover file-button pair (`19658`, `19672`), `.form-control-plaintext` (`19686`), `:focus` (`19732`), `.form-control-sm` and `.form-control-lg` pairings (`19746`, `19764`), `.form-control-sm` (`19782`) and its file buttons (`19808`, `19834`), `.form-control-lg` (`19860`) and its file buttons (`19886`, `19912`), `textarea.form-control` / `-sm` / `-lg` (`19938`, `19952`, `19966`), `.form-control-color` (`19980`), `:not(:disabled):not([readonly])` (`20002`), `::-moz-color-swatch` (`20016`), `::-webkit-color-swatch` (`20034`), size pair (`20052`, `20066`).

`.form-select` (`20080`, reduced-motion twin `20166`), `:focus` (`20181`), `[multiple]` (`20203`), `[size]:not([size="1"])` (`20221`), `:disabled` (`20239`), `:-moz-focusring` (`20253`), `.form-select-sm` (`20271`), `.form-select-lg` (`20301`). `form-select` key opens at `inventory.json:28876`.

`.form-check` (`20331`), `.form-check .form-check-input` (`20357`), `.form-check-reverse` (`20375`), its input (`20397`), `.form-check-input` (`20419`), `[type=checkbox]` (`20501`), `[type=radio]` (`20515`), `:active` (`20529`), `:focus` (`20543`), `:checked` (`20565`), checked checkbox (`20583`), checked radio (`20597`), `[type=checkbox]:indeterminate` (`20611`), `:disabled` (`20633`), `[disabled] ~ .form-check-label` (`20655`), `:disabled ~ .form-check-label` (`20673`), `.form-switch` (`20691`), its input (`20705`, reduced-motion twin `20743`), `:focus` (`20758`), `:checked` (`20772`), `.form-switch.form-check-reverse` (`20790`), its input (`20808`), `.form-check-inline` (`20826`). `form-check` key opens at `inventory.json:30430`. `.btn-check` is on the `btn` key (`inventory.json:31730`), not here.

`.form-range` (`20844`), `:focus` (`20882`), focus thumbs (`20896`, `20910`), `::-moz-focus-outer` (`20924`), `::-webkit-slider-thumb` (`20938`, reduced-motion twin `20988`), `:active` (`21007`), `::-webkit-slider-runnable-track` (`21021`), `::-moz-range-thumb` (`21059`, reduced-motion twin `21105`), `:active` (`21124`), `::-moz-range-track` (`21138`), `:disabled` (`21176`), disabled thumbs (`21190`, `21204`). `form-range` key opens at `inventory.json:38279`.

`.form-floating` (`21218`), `> .form-control` (`21232`), `> .form-control-plaintext` (`21254`), `> .form-select` (`21276`), `> label` (`21298`, reduced-motion twin `21372`), repeated control/plaintext (`21387`, `21401`), placeholders (`21415`, `21429`), `:focus` and `:not(:placeholder-shown)` (`21443`, `21461`, `21479`, `21497`), `:-webkit-autofill` (`21515`, `21533`), select padding (`21551`), `~ label` transforms (`21573`, `21587`, `21601`, `21615`, `21629`), `textarea ~ label::after` (`21643`, `21681`), disabled `::after` (`21719`), plaintext label border (`21733`), `:disabled ~ label` and `.form-control:disabled ~ label` (`21747`, `21761`). `form-floating` key opens at `inventory.json:38928`.

Input-group rules inside `form`: `> .form-control` (`21775`), `> .form-select` (`21801`), `> .form-floating` (`21827`), focus trio (`21853`, `21867`, `21881`), lg/sm control and select (`21895`, `21917`, `21939`, `21961`, `21983`, `21997`), end-radius rules (`22011`, `22035`, `22053`, `22071`, `22095`, `22113`), start-radius rules (`22131`, `22149`). The `input-group` key itself opens at `inventory.json:40254` with `.input-group`, and adds `.input-group .btn` (`40404`), `.input-group .btn:focus` (`40422`), `.input-group-text` (`40436`), `.input-group-lg > .input-group-text` (`40538`), `.input-group-lg > .btn` (`40560`), `.input-group-sm > .input-group-text` (`40626`), `.input-group-sm > .btn` (`40648`), `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` (`40722`), `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)` (`40800`), and `.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback)` (`40854`).

Validation rules inside `form`, valid then invalid: `.was-validated .form-control:valid` (`22167`), `.form-control.is-valid` (`22201`), focus pair (`22235`, `22253`), textarea pair (`22271`, `22289`), `.form-select:valid` / `.is-valid` (`22307`, `22321`), the four size-qualified select rules (`22335`, `22361`, `22387`, `22413`), select focus (`22439`, `22457`), color (`22475`, `22489`), check (`22503`, `22517`), checked (`22531`, `22545`), check focus (`22559`, `22573`), label (`22587`, `22601`), `.form-check-inline .form-check-input ~ .valid-feedback` (`22615`), input-group valid trio (`22629`, `22643`, `22657`, `22671`, `22685`, `22699`). Invalid mirrors run `22713` through `23245`.

Keys whose arrays add the feedback/tooltip display rules the `form` array does not carry:

- `valid-tooltip` (`inventory.json:45084`): the input-group `:not(:first-child)` rule, `.valid-tooltip` (`45113`), `.was-validated :valid ~ .valid-tooltip` (`45167`), `.is-valid ~ .valid-tooltip` (`45272`).
- `valid-feedback` (`inventory.json:45285`): the same input-group rule, plus `.valid-feedback`, `.was-validated :valid ~ .valid-feedback`, `.is-valid ~ .valid-feedback` (`45433`), and the inline feedback margin (`45438`).
- `invalid-tooltip` (`inventory.json:45451`) and `invalid-feedback` (`inventory.json:45652`) mirror those, with `:invalid` / `.is-invalid` (`45634`, `45639`).
- `was-validated` opens at `.was-validated :valid ~ .valid-feedback` (`inventory.json:45818`).
- `is-valid` opens at `.is-valid ~ .valid-feedback` (`inventory.json:46794`).
- `is-invalid` opens at `.is-invalid ~ .invalid-feedback` (`inventory.json:47289`).

`.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm` are on the `col` key (`inventory.json:11430`, `inventory.json:11460`, `inventory.json:11482`). The guide already assigns them to Forms (`guides/veneer.md:456`).

**Pseudos the release styles, by key**

- `form` / `form-control`: `:disabled`, `[readonly]` inside `:not([readonly])`, `:focus`, `::placeholder`, `::file-selector-button`, `::-webkit-file-upload-button`, `::-webkit-date-and-time-value`, `::-webkit-datetime-edit`, `:hover`, `::-moz-color-swatch`, `::-webkit-color-swatch` (`inventory.json:19376` through `inventory.json:20034`). Also `:valid`, `:invalid` on `.was-validated` controls.
- `form-select`: `:focus`, `:disabled`, `:-moz-focusring`, `[multiple]`, `[size]` (`inventory.json:20181`, `inventory.json:20253`).
- `form-check`: `:active`, `:focus`, `:checked`, `:indeterminate`, `:disabled`, `[disabled]` (`inventory.json:20529`, `inventory.json:20611`, `inventory.json:20655`).
- `form-range`: `:focus`, `:disabled`, `:active`, `::-webkit-slider-thumb`, `::-webkit-slider-runnable-track`, `::-moz-range-thumb`, `::-moz-range-track`, `::-moz-focus-outer` (`inventory.json:20896` through `inventory.json:21204`).
- `form-floating`: `::placeholder`, `:placeholder-shown`, `:-webkit-autofill`, `:focus`, `:disabled`, `::after` (`inventory.json:21415`, `inventory.json:21515`, `inventory.json:21643`).
- `input-group`: `:focus`, `:focus-within`, `:first-child`, `:last-child`, `:nth-last-child` (`inventory.json:21881`, `inventory.json:22011`).
- Validation keys: `:valid`, `:invalid`, `:focus`, `:checked`, `:not(:focus)`, `:not(:focus-within)` (`inventory.json:22167`, `inventory.json:22629`).

No `[readonly]` positive rule. Readonly appears only as `:not([readonly])` on the file control, the color control, and the file-button hover (`forms/_form-control.scss:28`, `forms/_form-control.scss:110`, `forms/_form-control.scss:198`).

**Sass the partials depend on.** Variables live in `_variables.scss:869` through `_variables.scss:1125` (`$form-text-*`, `$form-label-*`, `$input-*`, `$form-color-width`, `$form-check-*`, `$form-switch-*`, `$input-group-addon-*`, `$form-select-*`, `$form-range-*`, `$form-file-button-*`, `$form-floating-*`, `$form-feedback-*`, `$form-validation-states`) and `_variables-dark.scss:64` through `_variables-dark.scss:74`. Mixins: `font-size` (`vendor/_rfs.scss:306`), `transition` (`mixins/_transition.scss:2`), `border-radius`, `border-end-radius`, `border-start-radius` (`mixins/_border-radius.scss:18`), `box-shadow` (`mixins/_box-shadow.scss:1`), `gradient-bg` (`mixins/_gradients.scss:4`), `color-mode` (`mixins/_color-mode.scss:2`), `form-validation-state` and `form-validation-state-selector` (`mixins/_forms.scss:5`, `mixins/_forms.scss:18`). Validation is one `@each` over `$form-validation-states` (`forms/_validation.scss:9`).

## B. Shipped-component pattern

A key becomes these artifacts. The next unit copies the named symbol.

- **Partial.** `src/styles/components/_button.scss` and `_table.scss` each open with `@use '../tokens'`, `@use '../mixins' as *`, and `@layer components` (`components/_button.scss:1`, `components/_table.scss:4`).
- **Layer placement.** Order is declared once: `@layer theme, reset, base, elements, components, utilities` (`_tokens.scss:4`). The barrel loads the partial with an alias: `@use 'components/button' as button-component` and `@use 'components/table' as table-component` (`index.scss:43`, `index.scss:51`).
- **Proof.** `tests/src/styles/components/button.test.ts` describes `button classes` and drives `data-bs-theme` through `scene.mount` (`button.test.ts:32`, `button.test.ts:37`). `table.test.ts` describes `table geometry`, `contextual table colors`, and `responsive table wrappers` (`table.test.ts:26`, `table.test.ts:243`, `table.test.ts:313`).
- **Showcase.** `ButtonSection` (`app/browser/sections/ButtonSection.ts:22`) reads `BUTTON_COPY`, `BUTTON_GRID`, and `BUTTON_SPECIMENS` (`constants.ts:16`, `constants.ts:22`, `constants.ts:33`). `TableSection` extends `SpecimenSection` and passes `TABLE_COPY` and `TABLE_SPECIMENS` (`TableSection.ts:12`, `constants.ts:583`, `constants.ts:590`).
- **Guide rows.** Compatibility columns are Component, Kind, Obligation, Proof, Status (`guides/veneer.md:1027`). `btn` selector and variable rows are `shipped`; identity, attribute, method, initialization, and accessibility rows are `accepted` against `button.json` steps (`guides/veneer.md:1077`, `guides/veneer.md:1078`). `table` selector and variable rows are `shipped` (`guides/veneer.md:1088`, `guides/veneer.md:1106`). Bootstrap departures for `button` and `table`/`caption` are in the Departures from Bootstrap table (`guides/veneer.md:942`, `guides/veneer.md:947`).
- **Ledger rows, from `/home/user/veneer-f5b`.** `collectLedger` returns `{ departures, additions }` (`tests/setupServer.ts:1787`). `Departure` is `'tokenized' | 'aliased' | 'declared' | 'fallback' | 'dropped'` (`setupServer.ts:58`). `Addition` is `{ component, name, condition, category }` with category `'selector' | 'declaration' | 'property' | 'keyframes'` (`setupServer.ts:95`). `readDepartures` reads `guides/ledger/departures.md` under Cascade / Departures (`setupServer.ts:1115`). `readAdditions` reads `guides/ledger/additions.md` (`setupServer.ts:1190`). `scanLedgerDrift` returns `unrecorded` and `stale` (`setupServer.ts:1735`). One heading per shipped key: `#### \`btn\`` (`ledger/departures.md:42`) and `#### \`table\`` (`ledger/departures.md:959`). Departure columns are Component, Selector, Property, Condition, Bootstrap 5.3.8, Veneer, Departure (`ledger/departures.md:34`). Addition columns are Component, Name, Condition, Category, Reason (`ledger/additions.md:20`).
- **Conformance.** `collectShippedComponents` plus `scanCompatibilityPresence` (`tests/conformance.test.ts:80`, `tests/conformance.test.ts:117`). The shipped set must equal the `listed` array, which contains `'btn'` and `'table'` and contains no form key (`conformance.test.ts:85`, `conformance.test.ts:113`).

## C. What already ships

No B-FORMS class selector appears in `src/styles` or in `dist/src/styles/index.css`. A search for `.form-control`, `.form-select`, `.form-check`, `.form-range`, `.form-floating`, `.input-group`, `.was-validated`, `.valid-feedback`, `.invalid-feedback`, `.valid-tooltip`, `.invalid-tooltip`, `.is-valid`, and `.is-invalid` in the built stylesheet returned no match.

| Key | Status |
| --- | --- |
| `form`, `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `was-validated`, `valid-feedback`, `invalid-feedback`, `valid-tooltip`, `invalid-tooltip`, `is-valid`, `is-invalid` | Absent as classes |

Partial tokens already emitted, so a component partial must not redeclare them:

- `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color` alias `--vn-form-valid` and `--vn-form-invalid` inside the theme-token mixin (`_mixins.scss:263`, `_mixins.scss:300`).
- Dark `--bs-form-select-bg-img` and `--bs-form-switch-bg` are already written on `[data-bs-theme='dark']` from `tokens.$assets` (`_tokens.scss:123`, `_theme.scss:15`). The URIs are the dark caret and the dark switch knob (`_tokens.scss:103`, `_tokens.scss:105`).

Element rules the `elements` layer already carries, matching Reboot, so the component partial must not restate them:

- `label { display: inline-block }` (`elements/_label.scss:3`, Reboot `_reboot.scss:383`).
- `input`, `select`, `textarea`, and `optgroup` take `control-text`: `margin: 0`, inherited family, size, and line height (`_mixins.scss:33`, `elements/_input.scss:4`, `elements/_select.scss:5`, `elements/_textarea.scss:4`, `elements/_optgroup.scss:4`; Reboot `_reboot.scss:406`).
- `select` adds `text-transform: none`, `word-wrap: normal`, and `select:disabled { opacity: 1 }` (`elements/_select.scss:6`, `elements/_select.scss:9`; Reboot `_reboot.scss:429`).
- `textarea { resize: vertical }` (`elements/_textarea.scss:5`; Reboot `_reboot.scss:474`).
- `fieldset` resets min-width, padding, margin, and border; `legend` floats, spans, and sets margin and size (`elements/_fieldset.scss:4`, `elements/_fieldset.scss:9`; Reboot `_reboot.scss:485`, `_reboot.scss:497`). `legend + *` is Excluded (`guides/veneer.md:393`).
- `button` carries the Reboot appearance, cursor, and `button:focus:not(:focus-visible)` repairs (`elements/_button.scss:7`, `elements/_button.scss:56`; Reboot `_reboot.scss:390`, `_reboot.scss:400`).
- The calendar-picker rule, search decorations, spin button, datetime-edit padding, color-swatch wrapper, and `::file-selector-button` are in `elements/_input.scss:5` through `elements/_input.scss:41` (Reboot `_reboot.scss:443`, `_reboot.scss:514`, `_reboot.scss:524`, `_reboot.scss:534`, `_reboot.scss:561`, `_reboot.scss:567`, `_reboot.scss:575`).
- `::-webkit-file-upload-button` and `::-moz-focus-inner` are Excluded (`guides/veneer.md:394`, `guides/veneer.md:395`).
- No `[type=range]` rule exists under `src/styles`.

Bare controls already render in the Content region without form classes: Label, Input, Select, Option group, Textarea, Fieldset (`constants.ts:317`, `constants.ts:322`, `constants.ts:326`, `constants.ts:331`, `constants.ts:336`, `constants.ts:340`).

## D. Elements and Mailbox

**Elements** (`/home/user/elements`)

- `src/styles/elements/_input.scss:326` paints checkbox and radio boxes, checked SVG, and focus ring from `--set-check-checkbox-svg`, `--set-check-radio-svg`, and `--set-check-dash-svg`.
- `src/styles/elements/_input.scss:426` paints `input[type='checkbox'][role='switch']` from `--set-icon-switch-off` and `--set-icon-switch-on`.
- `src/styles/elements/_input.scss:454` paints range track and thumb on `::-webkit-*` and `::-moz-range-*`, with thumb color from `--set-range-thumb-background-color`.
- `src/styles/elements/_input.scss:155` paints `:user-invalid` and `:invalid:not(:placeholder-shown):not(:focus)`.
- `src/styles/elements/_select.scss:62` sets `--set-select-background-image` to a chevron data URI whose stroke is the literal `%2364748b`.
- `src/styles/components/_form.scss:96` uses `form[data-form-validated] :where(input, select, textarea):invalid` as its replacement for `.was-validated`.
- `src/styles/elements/_form.scss:9` leaves the element layer a no-op and puts chrome in the component partial.
- `src/styles/_tokens.scss:359` through `_tokens.scss:363` tokenize check, dash, radio, and switch glyphs as `--set-icon-*` data URIs. Check, dash, and radio bake `%23fff`. Switch-off bakes `%23aeb1b7`. The chevron token uses `stroke='currentColor'` (`_tokens.scss:342`), which a data URI does not retint; dark mode does not rewrite these URIs.

**Mailbox** (`/home/user/mailbox`)

- `src/styles/_forms.scss:40` ships the Bootstrap class surface in `@layer components`: `.form-control`, `.form-select`, `.form-check`, `.form-switch`, `.form-range`, `.form-floating`, `.input-group`, `.valid-feedback`, `.invalid-feedback`, `.was-validated`, `.is-valid`, `.is-invalid`.
- `src/styles/_forms.scss:893` also styles `:user-valid` and `:user-invalid` beside `.is-valid` and `.is-invalid`.
- `src/styles/_tokens.scss:86` through `_tokens.scss:97` keep light and dark copies of the check, dash, radio, and switch URIs (`--bs-checkbox-svg-light` / `-dark`, and the dash, radio, and switch pairs). Dark check stroke is `%23222`.
- `src/styles/themes/_modes.scss:47` retunes `--bs-switch-svg-unchecked` under the dark mode, and `_modes.scss:267` points the sable checkbox, dash, radio, and switch tokens at the light URIs.
- `src/styles/_select.scss:3` is a listbox/combobox on `.select`, separate from `.form-select`.
- `src/styles/_range-slider.scss:5` is a two-thumb widget beside `.form-range`, with thumb ring `--bs-range-slider-thumb-ring` retuned in `_modes.scss:219`.

## E. Sizing

`counts` (`inventory.json:114385`) records:

| Key | selectors | declarations | properties |
| --- | --- | --- | --- |
| `form` | 195 | 512 | 5 |
| `form-control` | 79 | 208 | 0 |
| `form-select` | 41 | 114 | 2 |
| `form-check` | 41 | 85 | 3 |
| `form-range` | 16 | 53 | 0 |
| `form-floating` | 42 | 94 | 0 |
| `input-group` | 44 | 97 | 0 |
| `valid-tooltip` | 4 | 16 | 0 |
| `valid-feedback` | 5 | 11 | 0 |
| `invalid-tooltip` | 4 | 16 | 0 |
| `invalid-feedback` | 5 | 11 | 0 |
| `was-validated` | 34 | 62 | 1 |
| `is-valid` | 17 | 31 | 1 |
| `is-invalid` | 17 | 31 | 1 |

The release file split, in import order (`_forms.scss:1`), is text controls (`_form-control.scss` plus `_labels.scss` and `_form-text.scss`), selects (`_form-select.scss`), checks and switches (`_form-check.scss`), range (`_form-range.scss`), floating labels (`_floating-labels.scss`), input groups (`_input-group.scss`), and validation (`_validation.scss` via `form-validation-state`). The `form` inventory key is the union of those compiled rules that carry a form class. `col-form-label*` stays on `col`. `.btn-check` stays on `btn`. Dark icon retunes stay on `theme`.
