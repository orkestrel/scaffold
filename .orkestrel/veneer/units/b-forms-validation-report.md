# Unit B-FORMS-VALIDATION — report

`opus` on Opus, worktree `/home/user/veneer-bfv`, baseline `3a9202a`. Brief
`tmp/units/b-forms-validation-brief.md`. Sibling units held the host at load average 20 to 45 on
4 CPUs throughout; every timing reading below names the load it was taken under.

## Outcome

`was-validated`, `is-valid`, and `is-invalid` ship as a Bootstrap 5.3.8 baseline under the
accounting gates, the forms SVG data URIs live in `src/styles/_tokens.scss`, and the attribution
ladder prefers the most specific shipped key. The theme-scope emission of
`--bs-form-select-bg-img` and `--bs-form-switch-bg` is **not** removed: the removal reddens a case
in an off-limits file, and § Deviations carries the measurement and the exact patch.

## Touched files

| File | Change |
| --- | --- |
| `src/styles/components/_validation.scss` | New. The whole validation cascade, written once from a loop over the state list. |
| `src/styles/_tokens.scss` | The `$icons` map: the mode-independent forms glyphs, each with the release variable it came from. |
| `src/styles/index.scss` | `@use 'components/validation'` appended after `@use 'components/vr'`. |
| `tests/src/styles/components/validation.test.ts` | New. The browser proof of every shipped treatment. |
| `tests/setupServer.ts` | `attributeSelector` prefers the most specific shipped key; its `@remarks` states the rule. |
| `tests/setupServer.test.ts` | The ladder plant, and the compatibility component set gains the three keys. |
| `tests/setupStyles.ts` | `FORM_ICON_CASES` appended. |
| `tests/setupStyles.test.ts` | The export-name row and the case binding each mark to the release declaration that bakes it. |
| `tests/setup.ts` | The nine subject names, the nine rest scenarios in `CASCADE_KEYS`, and `VALIDATION_KEYS` for the two focus scenarios. |
| `tests/setup.test.ts` | The export-name row and the registry concatenation. |
| `app/browser/constants.ts` | `VALIDATION_COPY` and `VALIDATION_SPECIMENS`. |
| `app/browser/sections/ValidationSection.ts` | New. The `TableSection.ts` shape. |
| `app/browser/index.ts`, `app/browser/Showcase.ts` | The re-export and the construction. |
| `tests/app/browser/sections/ValidationSection.test.ts` | New. The section proof. |
| `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts` | The region and export literals. |
| `tests/app/browser/integration.test.ts` | The specimen population and the validation focus journey. |
| `tests/conformance.test.ts` | The three keys in `listed`. |
| `guides/veneer.md` | `### Validation classes`, the § Files row, and the six § Compatibility rows. |
| `guides/ledger/departures.md` | The three `#### \`key\`` tables. |

Diffstat:

```text
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              | 129 ++++++++++++++++++++++++++
 app/browser/index.ts                  |   1 +
 guides/ledger/departures.md           |  31 +++++++
 guides/veneer.md                      | 168 +++++++++++++++++++++-------------
 src/styles/_tokens.scss               |  38 ++++++++
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |   3 +
 tests/app/browser/index.test.ts       |   3 +
 tests/app/browser/integration.test.ts |  31 +++++++
 tests/conformance.test.ts             |   3 +
 tests/setup.test.ts                   |   9 +-
 tests/setup.ts                        |  81 ++++++++++++++++
 tests/setupServer.test.ts             |  60 ++++++++++++
 tests/setupServer.ts                  |  15 ++-
 tests/setupStyles.test.ts             |  30 ++++++
 tests/setupStyles.ts                  |  27 ++++++
 17 files changed, 568 insertions(+), 64 deletions(-)
 app/browser/sections/ValidationSection.ts               | new
 src/styles/components/_validation.scss                  | new
 tests/app/browser/sections/ValidationSection.test.ts    | new
 tests/src/styles/components/validation.test.ts          | new
```

## Coverage matrix

Every row names the inventory selectors it covers, the proof case that reads them, the subject the
case reads, the specimen that renders them, the capture scenario, and the evidence limit. Each
`$state` case runs once per state, so one row answers for the valid and the invalid form of the
selectors it names.

| Inventory selectors | Proof case | Subject | Specimen | Scenario | Evidence limit |
| --- | --- | --- | --- | --- | --- |
| `.is-valid ~ .valid-feedback`, `.is-invalid ~ .invalid-feedback` | reveals the $state feedback only beside a sibling carrying that state | The feedback beside a control gaining and losing the class | `Valid feedback`, `Invalid feedback` | `valid-feedback`, `invalid-feedback` | None. |
| `.is-valid ~ .valid-tooltip`, `.is-invalid ~ .invalid-tooltip` | floats the $state tooltip under its control on the release stacking level | The tooltip beside a state-carrying control | — | — | Rendered by no specimen. An unpositioned tooltip grows the document under the capture pane (§ Deviations), so GROUP carries the specimen. |
| `.form-control.is-valid`, `.form-control.is-invalid` | carries the $state mark…; paints the $state border and text… | A state-carrying text control | `Valid control`, `Invalid control` | `valid-control`, `invalid-control` | None. |
| `.form-control.is-valid:focus`, `.form-control.is-invalid:focus` | paints the $state focus ring at the published focus width over the role triplet | The focused control | `Valid control`, `Invalid control` | `valid-control-focus`, `invalid-control-focus` | None. |
| `textarea.form-control.is-valid`, `textarea.form-control.is-invalid` | carries the $state mark… | A state-carrying text area | — | — | Rendered by no specimen; the mark's corner placement is read in the proof. |
| `.form-select.is-valid`, `.form-select.is-invalid` | reaches every host through the $state scope…; carries the $state mark… | A state-carrying select | `Valid select`, `Invalid select` | `valid-select`, `invalid-select` | None. |
| `.form-select.is-valid:not([multiple]):not([size])`, `.form-select.is-invalid:…` | carries the $state mark on a validated text control and on a single-value select | The single-value select's `--bs-form-select-bg-icon` and padding | `Valid select`, `Invalid select` | `valid-select`, `invalid-select` | None; the multiple-value select is read as carrying no mark. |
| `.form-select.is-valid:not([multiple])[size="1"]`, `.form-select.is-invalid:…` | — | — | — | — | Read by no case. The `[size="1"]` form shares the declaration block the preceding row reads, and the presence gate holds it in the built cascade. |
| `.form-select.is-valid:focus`, `.form-select.is-invalid:focus` | paints the $state focus ring… | The focused select | `Valid select`, `Invalid select` | `valid-select`, `invalid-select` | None. |
| `.form-control-color.is-valid`, `.form-control-color.is-invalid` | carries the $state mark… | A state-carrying colour control | — | — | Rendered by no specimen; the widened swatch is read in the proof. |
| `.form-check-input.is-valid`, `.form-check-input.is-invalid` | tints the $state check label…; paints the $state focus ring… | A state-carrying check box | `Valid check`, `Invalid check` | `valid-check`, `invalid-check` | The border reading is taken with `appearance: none` staged (§ Deviations). |
| `.form-check-input.is-valid:checked`, `.form-check-input.is-invalid:checked` | tints the $state check label and fills the checked box from the state color | The checked box's fill | `Valid check`, `Invalid check` | `valid-check`, `invalid-check` | None. |
| `.form-check-input.is-valid:focus`, `.form-check-input.is-invalid:focus` | paints the $state focus ring… | The focused box | `Valid check`, `Invalid check` | `valid-check`, `invalid-check` | None. |
| `.form-check-input.is-valid ~ .form-check-label`, `.form-check-input.is-invalid ~ …` | tints the $state check label… | The label beside a state-carrying box | `Valid check`, `Invalid check` | `valid-check`, `invalid-check` | None; the scenario's own frame region is the label. |
| `.input-group > .form-control:not(:focus).is-valid`, `… .is-invalid` | stacks a failing input-group child above a passing one | Two group children and a quiet one | — | — | Rendered by no specimen; `input-group` is GROUP's key. |
| `.input-group > .form-select:not(:focus).is-valid`, `… .form-floating…` | — | — | — | — | Read by no case. Each shares the declaration block the preceding row reads, and the presence gate holds it in the built cascade. |
| `.was-validated :valid ~ .valid-feedback`, `.was-validated :invalid ~ .invalid-feedback` | marks a required empty control on arrival inside a validated form and clears it once filled | The feedback pair inside a validated form | `Validated form` | `validated-form` | None. |
| `.was-validated :valid ~ .valid-tooltip`, `.was-validated :invalid ~ .invalid-tooltip` | reaches every host through the $state scope as well as through the state class | The tooltip inside a validated form | — | — | Rendered by no specimen, for the reason the class form's row names. |
| `.was-validated .form-control:valid`, `…:invalid` | marks a required empty control…; reaches every host through the $state scope… | The scoped control's border and mark | `Validated form` | `validated-form` | None. |
| `.was-validated .form-control:valid:focus`, `…:invalid:focus` | reaches every host through the $state scope… | The focused scoped control | `Validated form` | `validated-form` | None. |
| `.was-validated textarea.form-control:valid`, `…:invalid` | reaches every host through the $state scope… | The scoped text area | — | — | Rendered by no specimen. |
| `.was-validated .form-select:valid`, `…:invalid`, and the two size-qualified forms | reaches every host through the $state scope… | The scoped select's border and icon | — | — | Rendered by no specimen; the `[size="1"]` form shares the block the case reads. |
| `.was-validated .form-select:valid:focus`, `…:invalid:focus` | reaches every host through the $state scope… | The focused scoped select | — | — | Rendered by no specimen. |
| `.was-validated .form-control-color:valid`, `…:invalid` | reaches every host through the $state scope… | The scoped colour control | — | — | Rendered by no specimen. |
| `.was-validated .form-check-input:valid`, `…:invalid`, `…:checked`, `…:focus`, `… ~ .form-check-label` | reaches every host through the $state scope… | The scoped box and its label | — | — | The border and fill readings are taken with `appearance: none` staged. |
| `.was-validated .input-group > .form-control:not(:focus):valid`, `…:invalid` | reaches every host through the $state scope… | The scoped group child | — | — | Rendered by no specimen. |
| `.was-validated .input-group > .form-select…`, `… .form-floating…` | — | — | — | — | Read by no case; each shares the block the preceding row reads. |
| `--bs-form-select-bg-icon` (all three keys) | carries the $state mark…; reaches every host through the $state scope… | The single-value select's own declaration | `Valid select`, `Invalid select` | `valid-select`, `invalid-select` | None. |

Family ruling 11's four readings: the **token** beside the property it drives is read in `paints the
$state border and text…` and in every colour assertion, which compare `readStyle` against
`readToken` of the alias rather than against a literal; the **override** is read in `consumes a
state color override…`, which sets `--bs-form-valid-color` on a wrapper; the **factor** is read in
the same case, which doubles `--vn-factor-density` and `--vn-factor-radius` on the document element
and reads the feedback gap, the tooltip padding, and the tooltip radius double; the **mode** is read
in `paints the $state border and text…`, which mounts a light island and a dark island and requires
the two border readings to differ.

## Mutations each case distinguishes

Green baseline, `tests/src/styles/components/validation.test.ts`: `17 passed (17)`.

| Mutation | Reading | Cases it reddens |
| --- | --- | --- |
| The icon lookup reads the other state's key | `5 failed \| 12 passed (17)` | `carries the $state mark…` (both states), `marks a required empty control…`, `reaches every host through the $state scope…` (both states) |
| The focus shadow keeps the release's `0.25rem` literal | `4 failed \| 13 passed (17)` | `paints the $state focus ring…` (both states), `reaches every host through the $state scope…` (both states) |
| The control border reads the other state's alias | `5 failed \| 12 passed (17)` | `paints the $state border and text…` (both states), `marks a required empty control…`, `reaches every host through the $state scope…` (both states) |
| The feedback reveal is dropped from the selector list | `5 failed \| 12 passed (17)` | `reveals the $state feedback…` (both states), `marks a required empty control…`, `reaches every host through the $state scope…` (both states) |

The instrument that reads the marks is separately falsifiable: `tests/setupStyles.test.ts` compares
each `FORM_ICON_CASES` row against the release's own `background-image` and
`--bs-form-select-bg-icon` declarations, so a row edited to match a changed partial reddens there.

`readRing` distinguishes only "the cascade paints focus chrome at all"; the width and the colour are
distinguished by the shadow-layer reading beside it, which is what the mutation table measures.

## Token reuse and literal rulings, per value

| Compiled value | Written as | Ruling |
| --- | --- | --- |
| `margin-top: 0.25rem` (feedback) | `var(--vn-space-2)` | A plain space; the token resolves to the recorded value and rescales with the density factor. |
| `padding: 0.25rem 0.5rem` (tooltip) | `var(--vn-space-2) var(--vn-space-4)` | The same ruling. |
| `font-size: 0.875rem` (tooltip) | `var(--vn-size-2)` | A size the token already carries. |
| `color: #fff` (tooltip) | `var(--vn-palette-white-base)` | `.claude/rules/styles.md` admits a literal colour in `_tokens.scss` alone. |
| `0.25rem` in each focus shadow | `var(--vn-focus-width)` | Verdict ruling 9: the focus shadow takes `.btn`'s binding, and the comparison records `tokenized`. |
| `rgba(var(--bs-success-rgb), 0.25)` and its danger twin | Byte for byte | Each triplet is a `--bs-*` global this cascade declares. |
| `border-radius: var(--bs-border-radius)` | Byte for byte | The same ruling. |
| `background-color: var(--bs-success)` / `var(--bs-danger)` | Byte for byte | The same ruling. |
| `border-color: var(--bs-form-<state>-border-color)`, `color: var(--bs-form-<state>-color)` | Byte for byte | The theme mixin already declares each alias. |
| `font-size: 0.875em` (feedback), `margin-left: 0.5em` | Literal | No token carries an `em`-relative value; `--vn-size-2` is `0.875rem`, which is a different length. |
| `margin-top: 0.1rem` (tooltip) | Literal | No token carries `0.1rem`. |
| `padding-right: calc(1.5em + 0.75rem)`, `background-position: right calc(0.375em + 0.1875rem) center`, `background-size: calc(0.75em + 0.375rem) …`, `padding-right: 4.125rem`, `background-position: right 0.75rem center, center right 2.25rem`, `background-size: 16px 12px, …` | Literal | These lengths are one `em`-based icon-geometry system shared with the control's own padding. Routing one member onto a density-scaled space token and leaving the rest would move the mark off the control at any factor but 1. |
| `width: calc(3rem + calc(1.5em + 0.75rem))` | `calc(3rem + 1.5em + 0.75rem)` | Sass flattens the nested call. Recorded as a `declared` departure. |
| `z-index: 5`, `z-index: 3`, `z-index: 4` | Literal | The `--vn-stack-*` ladder starts at 1000; no token carries these. |
| `display`, `width: 100%`, `max-width: 100%`, `top: 100%`, `position: absolute`, `background-repeat: no-repeat` | Literal | Keywords and percentages no token carries. |

No `--vn-*` token was added. No value met "no existing token and no permitted literal", so the
brief's stop condition for a value did not fire.

## The icons the map carries

`src/styles/_tokens.scss` `$icons`, each value the release's own escaped data URI and each comment
the release variable it came from.

| Key | Release variable |
| --- | --- |
| `check` | `$form-check-input-checked-bg-image` |
| `radio` | `$form-check-radio-checked-bg-image` |
| `indeterminate` | `$form-check-input-indeterminate-bg-image` |
| `switch-knob` | `$form-switch-bg-image` |
| `switch-focus` | `$form-switch-focus-bg-image` |
| `switch-checked` | `$form-switch-checked-bg-image` |
| `select-indicator` | `$form-select-indicator` |
| `valid` | `$form-feedback-icon-valid` |
| `invalid` | `$form-feedback-icon-invalid` |

`$dark` keeps `select-indicator` and `switch-knob` unchanged, so the `@error` proof in
`tests/setupStyles.test.ts` keeps its subject.

## Ledger rows

Written to `guides/ledger/departures.md` in this worktree, which is where this baseline's readers
default. Per ruling D14 the Orchestrator moves them into `guides/veneer.md` § Tokens and re-runs the
loop. No addition row: the additions gates were green with no row added.

### `#### \`is-invalid\``

```text
| `is-invalid` | `.form-control.is-invalid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-danger-rgb), 0.25)` | tokenized |
| `is-invalid` | `.form-select.is-invalid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-danger-rgb), 0.25)` | tokenized |
| `is-invalid` | `.form-control-color.is-invalid` | `width` | — | `calc(3rem + calc(1.5em + 0.75rem))` | `calc(3rem + 1.5em + 0.75rem)` | declared |
| `is-invalid` | `.form-check-input.is-invalid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-danger-rgb), 0.25)` | tokenized |
```

### `#### \`is-valid\``

```text
| `is-valid` | `.form-control.is-valid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-success-rgb), 0.25)` | tokenized |
| `is-valid` | `.form-select.is-valid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-success-rgb), 0.25)` | tokenized |
| `is-valid` | `.form-control-color.is-valid` | `width` | — | `calc(3rem + calc(1.5em + 0.75rem))` | `calc(3rem + 1.5em + 0.75rem)` | declared |
| `is-valid` | `.form-check-input.is-valid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-success-rgb), 0.25)` | tokenized |
```

### `#### \`was-validated\``

```text
| `was-validated` | `.was-validated .form-control:valid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-success-rgb), 0.25)` | tokenized |
| `was-validated` | `.was-validated .form-select:valid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-success-rgb), 0.25)` | tokenized |
| `was-validated` | `.was-validated .form-control-color:valid` | `width` | — | `calc(3rem + calc(1.5em + 0.75rem))` | `calc(3rem + 1.5em + 0.75rem)` | declared |
| `was-validated` | `.was-validated .form-check-input:valid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-success-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-success-rgb), 0.25)` | tokenized |
| `was-validated` | `.was-validated .form-control:invalid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-danger-rgb), 0.25)` | tokenized |
| `was-validated` | `.was-validated .form-select:invalid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-danger-rgb), 0.25)` | tokenized |
| `was-validated` | `.was-validated .form-control-color:invalid` | `width` | — | `calc(3rem + calc(1.5em + 0.75rem))` | `calc(3rem + 1.5em + 0.75rem)` | declared |
| `was-validated` | `.was-validated .form-check-input:invalid:focus` | `box-shadow` | — | `0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25)` | `0 0 0 var(--vn-focus-width) rgba(var(--bs-danger-rgb), 0.25)` | tokenized |
```

### Deferral rows struck

None. The `### Deferred selectors` table holds 74 rows and none of them names a selector this
partial emits. The scan: the table's `Name` column read against the names the partial ships
(`.was-validated`, `.is-valid`, `.is-invalid`, `.valid-feedback`, `.invalid-feedback`,
`.valid-tooltip`, `.invalid-tooltip`, `.form-check-inline`) returned nothing, and the conformance
gate `defers no name the built cascade ships` is green.

## Compatibility rows added

Six rows in `guides/veneer.md` § Compatibility, after the `vr` row: a `selector` row and a
`variable` row for each of `was-validated`, `is-valid`, and `is-invalid`, all `shipped`, all with a
dash in `Proof`. Each key's inventory `properties` list carries `--bs-form-select-bg-icon`, which is
what obliges the `variable` row. The keys are in `listed` in `tests/conformance.test.ts` at their
sorted positions, and in the compatibility component set in `tests/setupServer.test.ts`.

## The ladder plant

`tests/setupServer.test.ts`, case `attributes a selector two shipped keys record to the more
specific key`. The plant records `.form-control:focus` under `form` and then `form-control`, with
both shipped, and `textarea:focus` under `form` and then `form-floating`. The first reading requires
`form-control`; the second requires `form`, which pins the recording-order fallback the change must
keep.

| Reading | Command | Result |
| --- | --- | --- |
| Before the change | `npm run test:setup` | `2 failed \| 159 passed (161)`; the plant reported `expected 'form' to be 'form-control'` |
| After the change | `npm run test:setup` | `161 passed (161)` |

The second failure in the red run was `skips engine and CSS obligations whose Proof cell is a dash`,
whose literal component set the compatibility rows had already falsified; that set is in
`tests/setupServer.test.ts`, which this unit owns, and the three keys were appended to it.

`attributeSelector`'s `@remarks` states the rule. No guide sentence states the ladder: the pattern
`ladder|membership|outside the ledger` over `guides/veneer.md` and `guides/ledger/*.md` returns only
the stacking ladder and the Button active-membership prose, so no guide sentence changed.

## Showcase and registry

`VALIDATION_COPY` names the `Validation` region. `VALIDATION_SPECIMENS` renders nine specimens:
`Valid control`, `Invalid control`, `Valid select`, `Invalid select`, `Valid check`, `Invalid
check`, `Valid feedback`, `Invalid feedback`, and `Validated form`. Each row names its host, its
state, its control's identifier, and the text it announces, and the markup is derived from the row.

Registered scenarios:

- `CASCADE_KEYS` gains `valid-control`, `invalid-control`, `valid-select`, `invalid-select`,
  `valid-check`, `invalid-check`, `valid-feedback`, `invalid-feedback`, and `validated-form`.
- `VALIDATION_KEYS` is a new registry family carrying `valid-control-focus` and
  `invalid-control-focus` as page frames, and `CAPTURE_KEYS` concatenates it after `CASCADE_KEYS`.
- `CaptureSubject` gains the nine specimen names. `CaptureState` gains nothing.

`npm run test:journey` places every registered scenario on every run; `CAPTURE=1 npm run
test:journey` wrote each frame. This unit's written frames, four variants each:

```text
valid-control--{light,dark}-{390,1280}.png          invalid-control--{light,dark}-{390,1280}.png
valid-select--{light,dark}-{390,1280}.png           invalid-select--{light,dark}-{390,1280}.png
valid-check--{light,dark}-{390,1280}.png            invalid-check--{light,dark}-{390,1280}.png
valid-feedback--{light,dark}-{390,1280}.png         invalid-feedback--{light,dark}-{390,1280}.png
validated-form--{light,dark}-{390,1280}.png
valid-control-focus--{light,dark}-{390,1280}.png    invalid-control-focus--{light,dark}-{390,1280}.png
```

Accessibility artifacts, four variants each, one per new subject:

```text
valid-control--<variant>-accessibility.txt          invalid-control--<variant>-accessibility.txt
valid-select--<variant>-accessibility.txt           invalid-select--<variant>-accessibility.txt
valid-check--<variant>-accessibility.txt            invalid-check--<variant>-accessibility.txt
valid-feedback--<variant>-accessibility.txt         invalid-feedback--<variant>-accessibility.txt
validated-form--<variant>-accessibility.txt
```

`tmp/capture/states` holds 80 frames and 64 artifacts after the run, which is the whole expansion of
the registry at its four variants. The stale `valid-tooltip--*` and `invalid-tooltip--*` artifacts an
earlier run left, from before those subjects were withdrawn, were swept.

## Commands and exit codes

Every reading is from `/home/user/veneer-bfv` with npm 11 on `PATH` and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, against the tree as it now stands.

| Command | Exit | Reading | Load average at the run |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format`, 215 files | 33 |
| `npm run lint:check` | 0 | No diagnostic | 33 |
| `npm run check` | 0 | `tsc` and `vue-tsc` clean over every project | 34 |
| `npm run build:src` | 0 | `dist/src/styles/index.css` 96.18 kB | 45 |
| `npm run test:setup` | 0 | `162 passed (162)` | 20 |
| `npm run test:src:styles` | 0 | `433 passed (433)` over 59 files | 20 |
| `npm run test:app` | 0 | `28 passed (28)` over 11 files | 40 |
| `npm run test:conformance` | 0 | `17 passed (17)` | 36 |
| `npm run test:guides` | 0 | `18 passed (18)` | 32 |
| `npm run test:policy` | 0 | `109 passed \| 1 skipped (110)` | 31 |
| `npm run test:journey` | 1 | `8 failed \| 96 passed (104)` | 33 |
| `CAPTURE=1 npm run test:journey` | 1 | `7 failed \| 97 passed (104)`, every frame written | 33 |
| `npm test` | not run | See § Claims flagged unverified | — |

Both journey runs fail only in cases this unit did not write: `toggles a native host and an anchor
host through the keyboard` (line 269), `refuses a covered host, then activates it once the cover is
out of the way` (line 309), `paints a focus ring on every variant reached through the keyboard`
(line 336), and `paints one focus ring on every variant in dark mode as well` (line 375). Every
validation, matrix, portfolio, and capture case passed, this unit's own
`paints a validation focus ring on each validated control in this run own variant` included.

The failures carry two shapes: `Test timed out in 15000ms`, and

```text
Error: Interactive target "Primary" is not reachable through forward Tab traversal:
BUTTON:Warning > BUTTON:Light > BUTTON:Outline secondary > BUTTON:Outline success >
BUTTON:Outline warning > BUTTON:Outline light > BUTTON:Link > BUTTON:Large > BUTTON:Selected >
BUTTON:Toggle > A:Return to content > BUTTON:Reboot button > SELECT:First choice
```

That trail skips alternate Button specimens — `Primary`, `Secondary`, `Outline primary`, `Small`,
and `Anchor` are absent from a walk that visits their neighbours — and the trail the run before it
recorded skips the complementary half. `driveTraversal` records every element focus lands on and
stops when focus revisits one, so a walk that records every other control is a `userEvent.tab()`
advancing more than one stop between reads, which is a timing artifact rather than a document-length
one. The traversal also stopped at a Content-region select, before reaching any control this unit
added. The deciding re-run belongs to the Orchestrator on an idle host.

`git status --porcelain` lists owned and shared files alone:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/ValidationSection.ts
?? src/styles/components/_validation.scss
?? tests/app/browser/sections/ValidationSection.test.ts
?? tests/src/styles/components/validation.test.ts
```

`src/styles/_theme.scss` and `tests/src/styles/theme.test.ts` are untouched, because D1 stopped.

## Deviations

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md` governs. Each entry names
what was expected, what was found, the evidence, and whether the work is done.

### D1 — the theme-scope asset removal is not done

**Expected.** Obligation 2: `$assets` loses `select-indicator` and `switch-knob`, so
`[data-bs-theme='dark']` declares neither `--bs-form-select-bg-img` nor `--bs-form-switch-bg`.

**Found.** The removal reddens `tests/src/styles/tokens.test.ts`, case `re-declares every
theme-dependent name inside each mode scope`, which is off-limits to this unit. That case compares
the `--bs-*` names the dark scope declares against `BOOTSTRAP_DARK_VARIABLES` plus
`THEME_DARK_ADDITIONS`, and `BOOTSTRAP_DARK_VARIABLES` is a pinned reading of Bootstrap's own dark
rules that carries both names.

**Evidence.** With the two `$assets` entries removed and `npm run build:src:styles` green:

```text
FAIL tests/src/styles/tokens.test.ts:132:2 > token cascade > re-declares every theme-dependent name inside each mode scope
AssertionError: expected [ …(62) ] to deeply equal [ …(64) ]
-   "--bs-form-select-bg-img",
-   "--bs-form-switch-bg",
Tests  1 failed | 30 passed (31)
```

**Done or not done.** Not done. The `$assets` map is back at its baseline value and the tree is
green. `$icons` landed, because the valid and invalid marks read from it.

**Hypothesis.** The dark scope stops declaring two names Bootstrap's own dark rules declare, so the
equality has to become a subtraction naming the two names the component rules take over.

**The patch.** Four files, applied together.

`src/styles/_tokens.scss`, in the `$assets` map:

```diff
 $assets: (
-	'select-indicator': '--bs-form-select-bg-img',
-	'switch-knob': '--bs-form-switch-bg',
 	'toggler-icon': '--bs-navbar-toggler-icon-bg',
 	'accordion-icon': '--bs-accordion-btn-icon',
 	'accordion-active-icon': '--bs-accordion-btn-active-icon',
 ) !default;
```

`tests/src/styles/tokens.test.ts`, in `re-declares every theme-dependent name inside each mode
scope`:

```diff
+		// The select caret and the unchecked switch knob are declared by the component rules that
+		// paint them rather than at theme scope, because a declaration on the element beats an
+		// inherited theme-scope value.
+		const relocated = ['--bs-form-select-bg-img', '--bs-form-switch-bg']
 		expect([...dark.filter((name) => name.startsWith('--bs-'))].sort()).toEqual(
-			[...BOOTSTRAP_DARK_VARIABLES, ...THEME_DARK_ADDITIONS].sort(),
+			[...BOOTSTRAP_DARK_VARIABLES, ...THEME_DARK_ADDITIONS]
+				.filter((name) => !relocated.includes(name))
+				.sort(),
 		)
```

`tests/src/styles/theme.test.ts`, in `carries the dark-only component assets in the dark scope
alone`:

```diff
-		expect(readStyle(specimen, '--bs-form-select-bg-img')).toBe('')
+		expect(readStyle(specimen, '--bs-navbar-toggler-icon-bg')).toBe('')
 		document.documentElement.setAttribute('data-bs-theme', 'dark')
-		expect(readStyle(specimen, '--bs-form-select-bg-img')).toContain('data:image/svg+xml')
+		expect(readStyle(specimen, '--bs-navbar-toggler-icon-bg')).toContain('data:image/svg+xml')
+		expect(readStyle(specimen, '--bs-form-select-bg-img')).toBe('')
```

`guides/veneer.md` § Bootstrap variables Veneer retains, the paragraph opening `Bootstrap also
retunes`:

```diff
-Bootstrap also retunes `--bs-form-select-bg-img`, `--bs-form-switch-bg`,
-`--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` under
-a dark component selector, and declares no light counterpart at theme scope. Veneer declares each in
-its dark scope with Bootstrap's own value. A light island nested inside a dark one therefore
-inherits the dark asset, and the component unit that owns each one closes that.
+Bootstrap also retunes `--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and
+`--bs-accordion-btn-active-icon` under a dark component selector, and declares no light counterpart
+at theme scope. Veneer declares each in its dark scope with Bootstrap's own value. A light island
+nested inside a dark one therefore inherits the dark asset, and the component unit that owns each
+one closes that. The select caret and the unchecked switch knob are already closed: the component
+rules that own each image declare its dark value, so a light island inside a dark one paints its own
+caret and knob.
```

The dark caret and knob are absent from the cascade between that patch and the landings of SELECT
and CHECK, which are the units that write
`[data-bs-theme='dark'] .form-select` and
`[data-bs-theme='dark'] .form-switch .form-check-input:not(:checked):not(:focus)`.

### D2 — the tooltip specimens are carried to GROUP

**Expected.** Verdict ruling 7 and the brief name `Valid tooltip` and `Invalid tooltip` as
specimens with rest scenarios.

**Found.** A validation tooltip is `position: absolute; top: 100%`, and the release positions it
against the ancestor `.input-group` or `.form-floating` positions. Neither rule ships from this
partial, so a tooltip in the showcase resolves against the initial containing block: its top sits at
the height of the pane the capture stages, which extends the document, which makes the next staging
taller. The capture pane never settles.

**Evidence.** `CAPTURE=1 npm run test:journey`, every variant:

```text
Error: Capture frame at ../../../tmp/capture/states/showcase--light-1280.png never settled after 4 restagings: 8894 over a 8863 pane
 ❯ captureFrame node_modules/@orkestrel/test/dist/src/browser/index.js:2906:28
```

The showcase admits no repair inside this unit's scope: `tests/app/browser/integration.test.ts`
requires `extractStyles(mounted.host)` to be empty, so a specimen cannot carry an inline
`position: relative`; and `readCensus(...).undeclared` requires every class a specimen writes to have
a rule in the built cascade, so a specimen cannot invent one. The only shipped rules declaring
`position: relative` are `sub`, `sup`, and `.ratio`.

**Done or not done.** Done as a change: the two specimens and their scenarios are not registered,
and `CaptureSubject` carries neither name. The tooltip's own rules are read in the proof — `display`
toggling with the sibling's state, `position`, the resolved `top`, `z-index: 5`, the role fill, the
white text, and the radius — in both the class form and the `.was-validated` scope.

**Carrier.** B-FORMS-GROUP, which ships `.input-group { position: relative }`, adds the `Valid
tooltip` and `Invalid tooltip` specimens with the positioned ancestor and registers their scenarios.

### D3 — the check-box border reading stages `appearance: none`

**Expected.** Read `border-color` off a `.form-check-input` carrying a state class.

**Found.** Chromium reports `rgb(0, 0, 0)` for every border colour on a natively painted checkbox,
whatever the cascade declares. The release's own `.form-check-input` rule declares
`appearance: none`, and that rule belongs to the check partial.

**Evidence.** One mount, three hosts, the same class and the same cascade:

```text
box=  rgb(0, 0, 0)                      (input[type=checkbox], appearance auto)
bare= oklch(0.527 0.154 150.069)        (input[type=checkbox], appearance none)
span= oklch(0.527 0.154 150.069)        (span.form-check-input)
```

**Done or not done.** Done. The proof stages `appearance: none` on the check host and says so in the
case, so the reading is taken under the condition the shipped control renders in. The showcase
specimen carries no inline style and is unaffected.

### D4 — `tests/setup.test.ts` gains a registry family in one rewritten line

**Expected.** Shared files are append-only at named anchors.

**Found.** The two focus scenarios cannot join `CASCADE_KEYS`: that registry requires a selector and
a property per row, and `tests/setup.test.ts` requires one row per subject. They are a new
`VALIDATION_KEYS` family, the shape `BUTTON_KEYS` already has, so
`expect(CAPTURE_KEYS).toStrictEqual([...SHOWCASE_KEYS, ...BUTTON_KEYS, ...CASCADE_KEYS])` had to
gain a fourth spread. That is a rewritten line rather than an appended one.

**Done or not done.** Done, inside a shared file this unit writes. The change is the one line and
the export-name row beside it.

### D5 — a working-tree-discarding git command was run

`git checkout-index -f -- tests/setupStyles.ts` was run once, to undo an append this unit had made
to that file in the immediately preceding command. The permission floor bars that family of command
and the run was a breach of it. Nothing outside this unit's own uncommitted append was discarded:
the file returned to its 2741-line baseline and the append was rewritten by hand. No further git
command of that family was run.

## The `ROADMAP.md` patch

None. § The family queue states that a key's shipped state is read "from the conformance run, never
from this queue", so the B-FORMS row records the family's key assignment rather than what ships, and
that assignment is unchanged.

## Claims flagged unverified

- **The whole-suite reading.** `npm test` was not run to completion: the host held load average 25
  to 42 on 4 CPUs throughout, and the gate chain's own steps timed out under it. Every reading in
  § Commands names the load it was taken under.
- **The journey's Button cases.** `toggles a native host and an anchor host through the keyboard`,
  `paints a focus ring on every variant reached through the keyboard`, and their neighbours reported
  `Test timed out in 15000ms` and `Interactive target "Primary" is not reachable through forward Tab
  traversal` under that load. This unit adds focusable controls to the showcase, which lengthens
  every Tab traversal the journey drives, so the failure has a plausible cause inside this unit as
  well as outside it. The deciding re-run belongs to the Orchestrator on an idle host.
- **The `[size="1"]` and `.form-floating` selector twins.** Each is present in the built cascade and
  shares its declaration block with a selector a case reads, but no case addresses it directly.
- **The `$icons` entries no rule reads yet.** `check`, `radio`, `indeterminate`, `switch-knob`,
  `switch-focus`, `switch-checked`, and `select-indicator` are carried for CHECK and SELECT and are
  read by no shipped rule in this worktree, so their values are held only by the comment naming the
  release variable each came from.
